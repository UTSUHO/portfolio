import { NormalizedLibrarySection } from './normalize-section'
import { ProseSection } from './prose-section'
import { PillarsSection } from './pillars-section'
import { ArchitectureSection } from './architecture-section'
import { ConstraintsSection } from './constraints-section'
import { OutcomeSection } from './outcome-section'

interface SectionRendererProps {
  section: NormalizedLibrarySection
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.variant) {
    case 'prose':
      return <ProseSection section={section} />
    case 'pillars':
      return <PillarsSection section={section} />
    case 'architecture':
      return <ArchitectureSection section={section} />
    case 'constraints':
      return <ConstraintsSection section={section} />
    case 'outcome':
      return <OutcomeSection section={section} />
    default:
      return <ProseSection section={section} />
  }
}
