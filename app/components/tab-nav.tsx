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
    <nav
      className="flex items-center px-6 h-10 gap-0 border-b"
      style={{ backgroundColor: '#F5F5F3', borderColor: '#DCDCDC' }}
    >
      {tabs.map((tab, i) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex items-center gap-2 px-4 h-full text-xs font-mono uppercase tracking-wider transition-colors duration-150 border-r"
            style={{
              borderColor: '#DCDCDC',
              color: isActive ? '#FF4D3A' : '#6B6B6B',
              backgroundColor: isActive ? '#FFFFFF' : 'transparent'
            }}
          >
            <span
              className="inline-block"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: isActive ? '#FF4D3A' : 'transparent'
              }}
            />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
