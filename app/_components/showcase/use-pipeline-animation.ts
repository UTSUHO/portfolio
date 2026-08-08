import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { animate, type JSAnimation } from 'animejs'

export interface PipelineNode {
  /** 节点元素，动画到达时会被触发 anime.js 脉冲效果 */
  element: SVGElement | null
  /** 0-1，节点在 motion path 上的相对位置 */
  progress: number
}

export interface UsePipelineAnimationOptions {
  /** 触发观察的容器 */
  containerRef: React.RefObject<HTMLElement | SVGElement | null>
  /** 运动路径（可设置为透明/虚线） */
  pathRef: React.RefObject<SVGPathElement | null>
  /** 沿路径移动的标记元素，需为 circle/g 等可设置 cx/cy 或 transform 的元素 */
  markerRef: React.RefObject<SVGGElement | SVGCircleElement | null>
  /** 沿途节点 */
  nodes?: PipelineNode[]
  /** 单次循环时长（秒） */
  duration?: number
  /** 是否循环 */
  loop?: boolean
  /** 循环间隔（秒） */
  repeatDelay?: number
  /** 首次进入视口前的延迟（秒） */
  startDelay?: number
}

/**
 * GSAP 驱动的 SVG pipeline 动画 hook。
 * marker 沿 path 移动，到达节点时调用 anime.js 产生脉冲反馈。
 */
export function usePipelineAnimation({
  containerRef,
  pathRef,
  markerRef,
  nodes = [],
  duration = 2.4,
  loop = true,
  repeatDelay = 0.6,
  startDelay = 0.3
}: UsePipelineAnimationOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasPlayedRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const path = pathRef.current
    const marker = markerRef.current
    if (!container || !path || !marker) return

    const pathLength = path.getTotalLength()
    const validNodes = nodes.filter(n => n.element && n.progress >= 0 && n.progress <= 1)

    // 初始隐藏 marker
    gsap.set(marker, { opacity: 0 })

    const proxy = { progress: 0 }

    const animations: JSAnimation[] = []

    const timeline = gsap.timeline({
      repeat: loop ? -1 : 0,
      repeatDelay,
      paused: true,
      onRepeat: () => {
        // 每轮重置节点样式
        validNodes.forEach(({ element }) => {
          if (!element) return
          gsap.set(element, { opacity: 1, scale: 1 })
        })
      }
    })

    // 入场：先淡入 marker
    timeline.to(marker, { opacity: 1, duration: 0.25 })

    // 主运动：progress 0 -> 1
    timeline.to(
      proxy,
      {
        progress: 1,
        duration,
        ease: 'none',
        onUpdate: () => {
          const point = path.getPointAtLength(proxy.progress * pathLength)
          if (marker instanceof SVGGElement) {
            marker.setAttribute('transform', `translate(${point.x}, ${point.y})`)
          } else {
            marker.setAttribute('cx', String(point.x))
            marker.setAttribute('cy', String(point.y))
          }
        }
      },
      0
    )

    // 节点激活标记：在对应进度处调用 anime.js
    validNodes.forEach(({ element, progress }) => {
      timeline.call(
        () => {
          if (!element) return
          const anim = animate(element, {
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.9],
            duration: 350,
            ease: 'out(3)'
          })
          animations.push(anim)
        },
        undefined,
        progress * duration
      )
    })

    // 结束淡出
    timeline.to(marker, { opacity: 0, duration: 0.15 })

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
      { threshold: 0.25 }
    )

    observer.observe(container)
    observerRef.current = observer

    return () => {
      observer.disconnect()
      timeline.kill()
      animations.forEach(anim => {
        try {
          anim.revert()
        } catch {
          // ignore
        }
      })
    }
  }, [containerRef, pathRef, markerRef, nodes, duration, loop, repeatDelay, startDelay])
}

export default usePipelineAnimation
