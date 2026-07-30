import { NormalizedLibrarySection } from './normalize-section'
import { SectionRenderer } from './section-renderer'

interface LibrarySectionFrameProps {
  section: NormalizedLibrarySection
}

export function LibrarySectionFrame({ section }: LibrarySectionFrameProps) {
  return (
    <section
      id={section.id}
      className="grid grid-cols-1 lg:grid-cols-[clamp(138px,16%,176px)_minmax(0,1fr)]"
    >
      <header className="p-4 lg:border-r border-border border-b lg:border-b-0">
        <div className="text-xs font-mono text-accent mb-2">
          {section.number} /
        </div>
        <h2 className="text-base font-medium text-text mb-1">
          {section.title}
        </h2>
        {section.label && (
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
            {section.label}
          </div>
        )}
      </header>
      <div className="p-4 lg:p-6 min-w-0">
        <SectionRenderer section={section} />
      </div>
    </section>
  )
}
