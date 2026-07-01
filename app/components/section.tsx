import { ReactNode } from 'react'

interface SectionProps {
  id: string
  backgroundColor: string
  children: ReactNode
  className?: string
}

export default function Section({ id, backgroundColor, children, className = '' }: SectionProps) {
  return (
    <section
      data-section-id={id}
      data-section-color={backgroundColor}
      className={`w-full box-border ${className}`}
      style={{ backgroundColor, paddingLeft: 'var(--width-sidebar)' }}
    >
      {children}
    </section>
  )
}
