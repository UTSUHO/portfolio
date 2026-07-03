'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function SidebarVisual() {
  const pathname = usePathname()
  const isNoteDetail = pathname?.startsWith('/notes/') ?? false
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!isNoteDetail) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, pct)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isNoteDetail])

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen z-50 hidden lg:flex flex-col"
        style={{
          width: 'var(--width-sidebar)',
          backgroundColor: 'transparent',
        }}
      >
        {/* Coordinate text */}
        {/* <div className="absolute bottom-2 left-2 text-[10px] font-mono text-text-secondary">
          <div>x:0</div>
          <div>y:0</div>
        </div> */}

        {/* Scroll progress module for note detail pages */}
        {isNoteDetail && (
          <div
            className="absolute left-0 flex flex-col items-center pt-4 pb-4"
            style={{
              top: 'var(--height-status)',
              width: 'var(--width-sidebar)',
              height: 'calc(100vh - var(--height-status))'
            }}
          >
            <div className="text-[10px] font-mono text-text-secondary tracking-wider mb-2">READ</div>
            <div className="relative w-[3px] flex-1 bg-border">
              <div
                className="absolute top-0 left-0 w-full bg-accent transition-all duration-150"
                style={{ height: `${scrollProgress}%` }}
              />
              {[0, 25, 50, 75, 100].map((pct) => (
                <div
                  key={pct}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-px bg-text-secondary"
                  style={{ top: `${pct}%` }}
                />
              ))}
            </div>
            <div className="text-[10px] font-mono text-text-secondary tracking-wider mt-2">
              {Math.round(scrollProgress)}%
            </div>
          </div>
        )}

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

      {/* Difference-mode border line — placed at root level so it blends with page content */}
      <div
        className="fixed top-0 hidden lg:block pointer-events-none"
        style={{
          left: 'var(--width-sidebar)',
          width: '1px',
          height: '100vh',
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          zIndex: 50,
        }}
      />
    </>
  )
}
