import 'server-only'
import { getProjectById } from './projects'
import { getLibraryEntryBySlug } from './library'
import { getNoteBySlug } from './notes'
import { ContentType, RelatedRef } from './related'

export type RelatedItem =
  | { type: 'project'; data: NonNullable<ReturnType<typeof getProjectById>> }
  | {
      type: 'library'
      data: NonNullable<ReturnType<typeof getLibraryEntryBySlug>>
    }
  | { type: 'note'; data: NonNullable<ReturnType<typeof getNoteBySlug>> }

export function resolveRelated(refs: RelatedRef[]): RelatedItem[] {
  return refs
    .map((ref): RelatedItem | null => {
      switch (ref.type) {
        case 'project': {
          const data = getProjectById(ref.key)
          return data ? { type: 'project', data } : null
        }
        case 'library': {
          const data = getLibraryEntryBySlug(ref.key)
          return data ? { type: 'library', data } : null
        }
        case 'note': {
          const data = getNoteBySlug(ref.key)
          return data ? { type: 'note', data } : null
        }
        default: {
          const _exhaustive: never = ref.type
          return null
        }
      }
    })
    .filter((item): item is RelatedItem => item !== null)
}

export function getRelatedLabel(type: ContentType): string {
  switch (type) {
    case 'project':
      return 'PROJECT'
    case 'library':
      return 'ARCHIVE'
    case 'note':
      return 'NOTE'
  }
}
