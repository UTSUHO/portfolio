import { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  className?: string
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-5 lg:px-6 ${className}`}
      style={{
        paddingTop: 'calc(var(--height-status) + 1rem)',
        paddingLeft: 'var(--width-sidebar)'
      }}
    >
      {children}
    </div>
  )
}
