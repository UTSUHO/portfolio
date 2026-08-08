import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import type { EasingFunction } from 'animejs'

export interface FlowNode {
  /** 节点在 0-1 流程上的位置 */
  progress: number
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

export interface UseSvgFlowAnimationOptions {
  /** 触发观察的容器 */
  containerRef: React.RefObject<HTMLElement | SVGElement | null>
  /** 流程节点 */
  nodes: FlowNode[]
  /** 波浪配置 */
  wave?: FlowWave
  /** 单次循环时长（秒） */
  duration?: number
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

/**
 * 可复用的 SVG pipeline 流动动画控制系统。
 *
 * 核心能力：
 * - 统一 timeline 驱动 progress 0 -> 1
 * - 可选 SVG gradient 波浪平移
 * - 节点按 progress 窗口触发，支持循环跨越
 * - 暴露 intensity（0-1）给每个节点做自定义表现
 */
export function useSvgFlowAnimation({
  containerRef,
  nodes,
  wave,
  duration = 2.2,
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
  waveRef.current = wave

  const resetNodes = useCallback(() => {
    activeStatesRef.current = nodes.map(() => false)
    nodes.forEach(node => node.onUpdate?.(0))
  }, [nodes])

  const updateNodes = useCallback((t: number) => {
    const wave = waveRef.current
    const element = wave?.elementRef.current

    // 1. 波浪平移：返回阶段把渐变峰值移出可见区域，隐藏红色波峰
    if (wave?.enabled && element) {
      if (directionRef.current === -1) {
        element.setAttribute('gradientTransform', `translate(-9999, 0)`)
      } else {
        // 让波峰右边缘从 from 进入，左边缘从 to 离开
        const waveOffset = lerp(wave.from - wave.width, wave.to, t)
        element.setAttribute('gradientTransform', `translate(${waveOffset}, 0)`)
      }
    }

    // 2. 节点状态：只在正向 0->1 时激活，返回阶段 1->0 全部熄灭
    if (directionRef.current === -1 || t < 0 || t > 1) {
      nodes.forEach((node, i) => {
        if (activeStatesRef.current[i]) {
          activeStatesRef.current[i] = false
          node.onLeave?.()
        }
        node.onUpdate?.(0)
      })
      return
    }

    const waveEnabled = wave?.enabled && (wave.width ?? 0) > 0 && wave.to > wave.from
    const pathWidth = waveEnabled ? wave.to - wave.from : 1
    const totalTravel = waveEnabled ? pathWidth + wave.width : 1
    const halfWindow = waveEnabled ? wave.width / (2 * totalTravel) : activeHold / duration

    nodes.forEach((node, i) => {
      const atStart = node.progress <= 0
      const atEnd = node.progress >= 1
      // 右边缘抵达节点时开始激活，左边缘离开时结束激活
      const center = waveEnabled
        ? (node.progress * pathWidth + wave.width / 2) / totalTravel
        : node.progress

      const absDelta = Math.abs(cyclicDelta(t, center, atStart, atEnd))

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
  }, [nodes, duration, activeHold, ease])

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
        duration,
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
  }, [containerRef, nodes, duration, activeHold, repeatDelay, startDelay, ease, loop, threshold, resetNodes, updateNodes])

  return timelineRef
}

export default useSvgFlowAnimation
