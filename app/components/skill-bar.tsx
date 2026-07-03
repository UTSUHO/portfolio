'use client'

import { useEffect, useRef, useState } from 'react'

interface SkillBarProps {
  name: string
  level: number
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
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
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono uppercase tracking-wider text-text" style={{ fontSize: '14px' }}>{name}</span>
        <span className="font-mono text-text-secondary" style={{ fontSize: '14px' }}>{level}%</span>
      </div>
      <div className="h-2 w-full bg-border overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}
