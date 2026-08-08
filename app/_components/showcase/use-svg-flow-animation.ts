import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import type { EasingFunction } from 'animejs'

export interface FlowNode {
  /** 节点在 0-1 流程上的位置 */
  progress: number
  /** 节点所属路径，undefined 表示主线 */
  pathId?: string
  /** 节点激活时的回调，intensity 0-1 */
  onUpdate?: (intensity: number) => void
  /** 节点进入激活态（intensity > 0.5） */
  onEnter?: () => void
  /** 节点离开激活态（intensity <= 0.5） */
  onLeave?: () => void
}

export interface FlowWave {
  /** 驱动波浪的渐变元素 ref；hook 内部会在 useEffect 中读取 current */
  elementRef: React.RefObject<SVGGradientElement | null>
  /** 路径起点 x 坐标 */
  from: number
  /** 路径终点 x 坐标 */
  to: number
  /** 渐变在 SVG 用户坐标中的总宽度（决定可见波峰跨度，应小于 to - from） */
  width: number
  /** 渐变中峰值视觉中心的位置比例，默认 0.45；只影响峰值视觉位置，不影响节点时序 */
  peakRatio?: number
  /** 是否启用 */
  enabled?: boolean
}

export interface FlowBranch {
  /** 分支 ID，供 FlowNode.pathId 引用 */
  id: string
  /** 分支起点（同时也是 fork 点） */
  from: { x: number; y: number }
  /** 分支终点 */
  to: { x: number; y: number }
  /** 折线路径点；如果提供，会覆盖 from/to 的直线行为，形成连续折线动画 */
  pathPoints?: { x: number; y: number }[]
  /** 分支波浪配置 */
  wave: {
    elementRef: React.RefObject<SVGGradientElement | null>
    width: number
    enabled?: boolean
  }
  /** 在主 timeline 上从哪一进度点开始分叉（0-1） */
  forkAt: number
}

export interface UseSvgFlowAnimationOptions {
  /** 触发观察的容器 */
  containerRef: React.RefObject<HTMLElement | SVGElement | null>
  /** 流程节点 */
  nodes: FlowNode[]
  /** 主线波浪配置 */
  wave?: FlowWave
  /** 分支路径配置 */
  branches?: FlowBranch[]
  /** 正向脉冲时长（秒） */
  duration?: number
  /** 返回熄灭时长（秒）；默认等于 duration */
  fadeDuration?: number
  /** 单个节点激活保持时长（秒）；未启用 wave 时使用 */
  activeHold?: number
  /** 循环间隔（秒） */
  repeatDelay?: number
  /** 首次进入视口前的延迟（秒） */
  startDelay?: number
  /** 节点强度缓动函数 */
  ease?: EasingFunction
  /** 是否循环 */
  loop?: boolean
  /** 观察阈值 */
  threshold?: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

/**
 * 将差值归一化到 [-0.5, 0.5]，支持循环边界跨越。
 * 位于 progress=0 或 progress=1 的边界节点不会向对侧折叠，
 * 避免循环衔接时起始节点与结束节点同时点亮。
 */
function cyclicDelta(t: number, center: number, atStart = false, atEnd = false): number {
  let delta = t - center
  if (!atStart && delta > 0.5) delta -= 1
  if (!atEnd && delta < -0.5) delta += 1
  return delta
}

interface ResolvedPath {
  id?: string
  element: SVGGradientElement
  points: { x: number; y: number }[]
  pathLength: number
  waveWidth: number
  forkAt: number
}

/**
 * 可复用的 SVG pipeline 流动动画控制系统。
 *
 * 核心能力：
 * - 统一 timeline 驱动 progress 0 -> 1
 * - 可选 SVG gradient 波浪平移（支持多路径/分支旋转）
 * - 节点按 progress 窗口触发，支持循环跨越
 * - 暴露 intensity（0-1）给每个节点做自定义表现
 */
export function useSvgFlowAnimation({
  containerRef,
  nodes,
  wave,
  branches,
  duration = 2.2,
  fadeDuration,
  activeHold = 0.5,
  repeatDelay = 0.7,
  startDelay = 0.35,
  ease,
  loop = true,
  threshold = 0.25
}: UseSvgFlowAnimationOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasPlayedRef = useRef(false)
  const activeStatesRef = useRef<boolean[]>(nodes.map(() => false))
  const directionRef = useRef<1 | -1>(1)
  const waveRef = useRef(wave)
  const branchesRef = useRef(branches)
  waveRef.current = wave
  branchesRef.current = branches

  const resolvePaths = useCallback((): ResolvedPath[] => {
    const currentWave = waveRef.current
    const currentBranches = branchesRef.current
    const paths: ResolvedPath[] = []

    if (currentWave?.enabled && currentWave.elementRef.current) {
      const wavePoints = [
        { x: currentWave.from, y: 0 },
        { x: currentWave.to, y: 0 }
      ]
      paths.push({
        id: undefined,
        element: currentWave.elementRef.current,
        points: wavePoints,
        pathLength: currentWave.to - currentWave.from,
        waveWidth: currentWave.width,
        forkAt: 0
      })
    }

    currentBranches?.forEach(branch => {
      if (!branch.wave.enabled || !branch.wave.elementRef.current) return
      const points = branch.pathPoints ?? [branch.from, branch.to]
      const pathLength = points.reduce(
        (sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)),
        0
      )
      paths.push({
        id: branch.id,
        element: branch.wave.elementRef.current,
        points,
        pathLength,
        waveWidth: branch.wave.width,
        forkAt: branch.forkAt
      })
    })

    return paths
  }, [])

  const resetNodes = useCallback(() => {
    activeStatesRef.current = nodes.map(() => false)
    nodes.forEach(node => node.onUpdate?.(0))
  }, [nodes])

  const computePathProgress = (path: ResolvedPath, t: number): number => {
    if (path.forkAt <= 0) return t
    return clamp((t - path.forkAt) / (1 - path.forkAt), 0, 1)
  }

function getPointOnPolyline(
  points: { x: number; y: number }[],
  t: number
): { point: { x: number; y: number }; angle: number } {
  if (points.length < 2) return { point: points[0] ?? { x: 0, y: 0 }, angle: 0 }

  const totalLength = points.reduce(
    (sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)),
    0
  )
  if (totalLength === 0) return { point: points[0], angle: 0 }

  const target = clamp(t * totalLength, 0, totalLength)
  let accumulated = 0

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const segLength = Math.hypot(curr.x - prev.x, curr.y - prev.y)

    if (accumulated + segLength >= target || i === points.length - 1) {
      const segT = segLength === 0 ? 0 : (target - accumulated) / segLength
      return {
        point: {
          x: prev.x + (curr.x - prev.x) * segT,
          y: prev.y + (curr.y - prev.y) * segT
        },
        angle: Math.atan2(curr.y - prev.y, curr.x - prev.x)
      }
    }

    accumulated += segLength
  }

  const last = points[points.length - 1]
  const prev = points[points.length - 2] ?? last
  return { point: last, angle: Math.atan2(last.y - prev.y, last.x - prev.x) }
}

  const updatePaths = useCallback((paths: ResolvedPath[], t: number, direction: 1 | -1) => {
    paths.forEach(path => {
      if (direction === -1) {
        path.element.setAttribute('gradientTransform', `translate(-9999, 0)`)
        return
      }

      const pathT = computePathProgress(path, t)
      const localOffset = lerp(-path.waveWidth, 0, pathT)
      const { point, angle } = getPointOnPolyline(path.points, pathT)
      const degrees = angle * (180 / Math.PI)
      const transform = `translate(${point.x}, ${point.y}) rotate(${degrees}) translate(${localOffset}, 0)`
      path.element.setAttribute('gradientTransform', transform)
    })
  }, [])

  const updateNodes = useCallback((t: number) => {
    const direction = directionRef.current
    const paths = resolvePaths()

    updatePaths(paths, t, direction)

    if (direction === -1 || t < 0 || t > 1) {
      nodes.forEach((node, i) => {
        if (activeStatesRef.current[i]) {
          activeStatesRef.current[i] = false
          node.onLeave?.()
        }
        node.onUpdate?.(0)
      })
      return
    }

    nodes.forEach((node, i) => {
      const path = paths.find(p => p.id === node.pathId) ?? paths.find(p => p.id === undefined)
      if (!path) {
        node.onUpdate?.(0)
        return
      }

      const pathT = path.id === undefined ? t : computePathProgress(path, t)
      const hasWave = path.waveWidth > 0 && path.pathLength > 0
      const totalTravel = hasWave ? path.pathLength + path.waveWidth : 1
      const halfWindow = hasWave
        ? path.waveWidth / (2 * totalTravel)
        : activeHold / duration

      const atStart = node.progress <= 0
      const atEnd = node.progress >= 1
      const center = hasWave
        ? (node.progress * path.pathLength + path.waveWidth / 2) / totalTravel
        : node.progress

      const absDelta = Math.abs(cyclicDelta(pathT, center, atStart, atEnd))

      let intensity = 0
      if (absDelta <= halfWindow) {
        const localT = absDelta / halfWindow
        intensity = 1 - localT
        if (ease) intensity = ease(intensity)
      }

      const wasActive = activeStatesRef.current[i]
      const isActive = intensity > 0.5
      activeStatesRef.current[i] = isActive

      if (!wasActive && isActive) node.onEnter?.()
      if (wasActive && !isActive) node.onLeave?.()

      node.onUpdate?.(intensity)
    })
  }, [nodes, duration, activeHold, ease, resolvePaths, updatePaths])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const proxy = { progress: 0 }

    const timeline = gsap.timeline({
      repeat: loop ? -1 : 0,
      repeatDelay,
      paused: true,
      onStart: resetNodes,
      onRepeat: resetNodes
    })

    timeline.to(proxy, {
      progress: 1,
      duration,
      ease: 'none',
      onStart: () => { directionRef.current = 1 },
      onUpdate: () => updateNodes(proxy.progress)
    })

    if (loop) {
      timeline.to(proxy, {
        progress: 0,
        duration: fadeDuration ?? duration,
        ease: 'none',
        onStart: () => { directionRef.current = -1 },
        onUpdate: () => updateNodes(proxy.progress)
      })
    }

    timelineRef.current = timeline

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasPlayedRef.current) {
            hasPlayedRef.current = true
            gsap.delayedCall(startDelay, () => timeline.play())
          } else {
            timeline.resume()
          }
        } else {
          timeline.pause()
        }
      },
      { threshold }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      timeline.kill()
    }
  }, [containerRef, nodes, duration, fadeDuration, activeHold, repeatDelay, startDelay, ease, loop, threshold, resetNodes, updateNodes])

  return timelineRef
}

export default useSvgFlowAnimation
