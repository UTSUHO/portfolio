'use client'

import { useEffect, useState } from 'react'
import { Heading } from '@/lib/mdx'

interface NoteTocProps {
  headings: Heading[]
}

export default function NoteToc({ headings }: NoteTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200
      let current: string | null = null

      for (const heading of headings) {
        const el = document.getElementById(heading.id)
        if (el && el.offsetTop <= scrollY) {
          current = heading.id
        }
      }

      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-[calc(var(--height-status)+24px)]">
      <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border border-border bg-bg mb-4">
        <span className="inline-block w-2 h-2 bg-accent" />
        <span className="text-text">CONTENTS</span>
      </div>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-left text-xs leading-relaxed transition-colors duration-150 hover:text-text ${
                activeId === heading.id ? 'text-accent' : 'text-text-secondary'
              } ${heading.level === 2 ? 'pl-3' : heading.level >= 3 ? 'pl-6' : ''}`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
