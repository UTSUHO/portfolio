import { NormalizedLibrarySection } from './normalize-section'

interface PillarsSectionProps {
  section: NormalizedLibrarySection
}

export function PillarsSection({ section }: PillarsSectionProps) {
  const items = section.items || []

  return (
    <div className="space-y-6">
      {section.body && (
        <p className="leading-[1.7] text-sm text-text-secondary">
          {section.body}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {items.map((item, idx) => (
          <div
            key={item.id || `pillar-${idx}`}
            className="py-4 md:px-4 md:first:pl-0 md:last:pr-0"
          >
            <div className="text-xs font-mono text-accent mb-2">
              {item.number || String(idx + 1).padStart(2, '0')} / {item.code}
            </div>
            <h3 className="text-sm font-medium text-text mb-2">{item.title}</h3>
            {item.body && (
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
