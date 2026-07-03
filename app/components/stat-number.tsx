'use client'

import { useEffect, useRef, useState } from 'react'

interface StatNumberProps {
  value: number
  suffix?: string
  label: string
}

export default function StatNumber({ value, suffix = '', label }: StatNumberProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 1200

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(easeOut * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-display font-bold text-text">
        {displayValue}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-mono uppercase tracking-wider text-text-secondary">{label}</div>
    </div>
  )
}
