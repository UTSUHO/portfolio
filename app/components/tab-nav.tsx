'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: 'HOME' },
  { href: '/projects', label: 'WORKS' },
  { href: '/resume', label: 'RESUME' },
  { href: '/library', label: 'LIBRARY' },
  { href: '/notes', label: 'LOG' }
]

export default function TabNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center h-10 gap-0 border-b bg-bg border-border">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`
              flex items-center gap-2 px-4 h-full text-xs font-mono uppercase tracking-wider
              transition-colors duration-150 border-r border-border
              ${isActive ? 'text-accent bg-bg-primary' : 'text-text-secondary bg-transparent'}
            `}
          >
            <span
              className={`inline-block w-2 h-2 ${isActive ? 'bg-accent' : 'bg-transparent'}`}
            />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
