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
        <div className="flex items-center gap-2 px-4 pt-[66px] pb-[66px] h-[160px] box-border">
          <span
            className="text-white text-xl ml-4 leading-[28px]"
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
