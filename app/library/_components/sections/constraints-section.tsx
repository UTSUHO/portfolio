import { NormalizedLibrarySection } from './normalize-section'

interface ConstraintsSectionProps {
  section: NormalizedLibrarySection
}

export function ConstraintsSection({ section }: ConstraintsSectionProps) {
  const items = section.items || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
      {items.map((item, idx) => (
        <div
          key={item.id || `constraint-${idx}`}
          className="py-4 md:px-4 md:first:pl-0 md:last:pr-0"
        >
          <div className="text-xs font-mono text-accent mb-2">
            {item.number || String(idx + 1).padStart(2, '0')} / {item.code}
          </div>
          <h3 className="text-sm font-medium text-text mb-1">
            {item.title}
          </h3>
          {item.body && (
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              {item.body}
            </p>
          )}
          {item.diagram && (
            <pre className="text-[10px] font-mono text-text-secondary bg-bg p-3 border border-border whitespace-pre-wrap leading-relaxed">
              {item.diagram}
            </pre>
          )}
        </div>
      ))}
    </div>
  )
}
