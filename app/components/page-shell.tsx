import { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  className?: string
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div
      className={`min-h-screen ${className}`}
      style={{
        paddingTop: 'calc(var(--height-status) + var(--height-navbar))',
        paddingLeft: 'var(--width-sidebar)'
      }}
    >
      {children}
    </div>
  )
}
