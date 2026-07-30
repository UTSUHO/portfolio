import { LibrarySection, LibrarySectionVariant } from '@/lib/data/types/library'

export type NormalizedLibrarySection = LibrarySection & {
  variant: LibrarySectionVariant
}

export function normalizeLibrarySection(
  section: LibrarySection
): NormalizedLibrarySection {
  if (section.variant) {
    return { ...section, variant: section.variant }
  }

  // Legacy fallback: any unknown layout defaults to prose so that old entries
  // continue to render without requiring a migration.
  return { ...section, variant: 'prose' }
}
