import { ReactNode } from 'react'

interface SectionProps {
  id: string
  backgroundColor: string
  children: ReactNode
  className?: string
  name?: string
}

export default function Section({ id, backgroundColor, children, className = '', name }: SectionProps) {
  return (
    <section
      data-section-id={id}
      data-section-color={backgroundColor}
      className={`w-full box-border ${className}`}
      style={{ backgroundColor, paddingLeft: 'var(--width-sidebar)' }}
    >
      {name && (
        <div className="flex items-center gap-2 pt-4 pb-4 px-4 h-24">
          <span
            className="text-white text-xl ml-4"
            style={{ mixBlendMode: "difference" }}
          >
            //&nbsp;&nbsp;&nbsp;{name}
          </span>
        </div>
      )}
      {children}
    </section>
  )
}
