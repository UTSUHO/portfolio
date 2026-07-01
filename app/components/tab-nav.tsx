'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const tabs = [
  { href: '/', label: 'HOME', anchor: 'dashboard' },
  { href: '/projects', label: 'WORKS', anchor: 'showcase' },
  { href: '/resume', label: 'RESUME' },
  { href: '/library', label: 'LIBRARY' },
  { href: '/notes', label: 'LOG' },
]

function scrollToAnchor(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const tabClassName =
  'flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary border-r border-b border-border hover:text-text transition-colors duration-150 cursor-pointer'

export default function TabNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className="grid grid-cols-6 w-full box-border" style={{ height: 'var(--height-status)' }}>
      {tabs.map((tab) =>
        isHome && tab.anchor ? (
          <button
            key={tab.href}
            type="button"
            onClick={() => scrollToAnchor(tab.anchor)}
            className={tabClassName}
          >
            <span className="inline-block w-2 h-2 bg-transparent" />
            {tab.label}
          </button>
        ) : (
          <Link
            key={tab.href}
            href={tab.href}
            className={tabClassName}
          >
            <span className="inline-block w-2 h-2 bg-transparent" />
            {tab.label}
          </Link>
        )
      )}

      {/* Default block - opens sheet menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button
              type="button"
              className={tabClassName}
            >
              <span className="inline-block w-2 h-2 bg-transparent" />
              MORE
            </button>
          }
        />
        <SheetContent side="bottom" className="bg-bg-primary border-t border-border">
          <SheetHeader>
            <SheetTitle className="text-xs font-mono uppercase tracking-wider text-text-secondary">
              NAVIGATION_MENU
            </SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-0 p-4">
            {tabs.map((tab) =>
              isHome && tab.anchor ? (
                <button
                  key={tab.href}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    scrollToAnchor(tab.anchor)
                  }}
                  className="flex items-center gap-2 px-4 h-12 text-xs font-mono uppercase tracking-wider text-text-secondary border-b border-border hover:text-text hover:bg-bg transition-colors text-left"
                >
                  <span className="inline-block w-2 h-2 bg-accent" />
                  {tab.label}
                </button>
              ) : (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 h-12 text-xs font-mono uppercase tracking-wider text-text-secondary border-b border-border hover:text-text hover:bg-bg transition-colors"
                >
                  <span className="inline-block w-2 h-2 bg-accent" />
                  {tab.label}
                </Link>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
