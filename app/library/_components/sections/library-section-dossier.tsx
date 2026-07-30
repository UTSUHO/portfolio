import { LibrarySection } from '@/lib/data/types/library'
import { normalizeLibrarySection } from './normalize-section'
import { LibrarySectionFrame } from './library-section-frame'

interface LibrarySectionDossierProps {
  sections: LibrarySection[]
}

export function LibrarySectionDossier({ sections }: LibrarySectionDossierProps) {
  return (
    <div className="border border-border bg-bg-primary divide-y divide-border">
      {sections.map((section) => (
        <LibrarySectionFrame
          key={section.id}
          section={normalizeLibrarySection(section)}
        />
      ))}
    </div>
  )
}
