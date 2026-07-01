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
        <div className="flex items-center gap-2 px-4 h-24">
          <span className="text-text-invert text-xl mt-8 ml-4">
            //&nbsp;&nbsp;&nbsp;{name}
          </span>
        </div>
      )}
      {children}
    </section>
  )
}
