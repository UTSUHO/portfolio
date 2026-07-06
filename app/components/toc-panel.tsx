'use client'

import { useEffect, useState } from 'react'
import Panel from './panel'

export interface TocItem {
  id: string
  number: string
  title: string
}

interface TocPanelProps {
  items: TocItem[]
  title?: string
}

export default function TocPanel({ items, title = 'CONTENTS' }: TocPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200
      let current: string | null = null

      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollY) {
          current = item.id
        }
      }

      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (items.length === 0) return null

  return (
    <nav className="sticky top-[calc(var(--height-status)+24px)]">
      <Panel title={title}>
        <ul className="p-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-left text-xs font-mono uppercase tracking-wider transition-colors duration-150 hover:text-text ${
                  activeId === item.id ? 'text-accent' : 'text-text-secondary'
                }`}
              >
                <span className="mr-2">{item.number} /</span>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </nav>
  )
}
