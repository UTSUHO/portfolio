'use client'

import FadeIn from './fade-in'

interface TimelineItem {
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
    <div className="relative">
      {items.map((item, index) => (
        <FadeIn key={index} delay={index * 100} direction="left">
          <div className="relative pl-8 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[3px] bg-accent" />
            <div className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-1">
              {item.year}
            </div>
            <div className="text-sm font-medium text-text mb-1" style={{ fontSize: '13px' }}>
              {item.position}
            </div>
            <div className="text-xs text-text-secondary mb-2">{item.company}</div>
            <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
