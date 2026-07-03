'use client'

import FadeIn from './fade-in'

export interface TimelineItem {
  year: string
  company: string
  position: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-10 w-full">
      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border" />
      {items.map((item, index) => (
        <FadeIn key={index} delay={index * 100} direction="left">
          <div className="relative pb-12 last:pb-0 flex flex-col justify-center">
            <div className="absolute left-[-36px] top-1/2 -translate-y-1/2 w-3 h-3 bg-accent" />
            <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-1">
              {item.year}
            </div>
            <div className="font-medium text-text mb-1" style={{ fontSize: '20px' }}>
              {item.position}
            </div>
            <div className="text-sm text-text-secondary mb-2" style={{ fontSize: '14px' }}>
              {item.company}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed" style={{ fontSize: '14px' }}>
              {item.description}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
