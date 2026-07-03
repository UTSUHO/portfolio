'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'in' | 'left'
}

export default function FadeIn({ children, className = '', delay = 0, direction = 'up' }: FadeInProps) {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const directionClass = {
    up: 'fade-up',
    in: 'fade-in',
    left: 'fade-left'
  }[direction]

  return (
    <div
      ref={ref}
      className={`${directionClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
