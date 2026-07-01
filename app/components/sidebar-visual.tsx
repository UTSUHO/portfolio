'use client'

import { useEffect, useRef, useState } from 'react'

export default function SidebarVisual() {
  const [activeColor, setActiveColor] = useState('#FFFFFF')
  const colorMapRef = useRef<Map<string, string>>(new Map())

  useEffect(() => {
    const updateColorMap = () => {
      const map = new Map<string, string>()
      document.querySelectorAll('[data-section-id]').forEach((el) => {
        const id = el.getAttribute('data-section-id')
        const color = el.getAttribute('data-section-color')
        if (id && color) {
          map.set(id, color)
        }
      })
      colorMapRef.current = map
    }

    updateColorMap()

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let bestId: string | null = null

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            bestId = entry.target.getAttribute('data-section-id')
          }
        })

        if (bestId) {
          const color = colorMapRef.current.get(bestId)
          if (color) {
            setActiveColor(color)
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    document.querySelectorAll('[data-section-id]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-screen z-50 bg-bg-primary border-r border-border hidden lg:flex flex-col transition-colors duration-300"
      style={{ width: 'var(--width-sidebar)', backgroundColor: activeColor }}
    >
      {/* Coordinate text */}
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-text-secondary">
        <div>x:0</div>
        <div>y:0</div>
      </div>

      {/* Vertical label */}
      <div
        className="absolute right-3 top-1/2 text-[10px] font-mono text-text-secondary tracking-wider"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        REI_UTSUHO_SYS // VISUAL_MODULE
      </div>
    </div>
  )
}
