export type ContentType = 'project' | 'library' | 'note'

export interface RelatedRef {
  type: ContentType
  key: string
}

const CONTENT_TYPES: ContentType[] = ['project', 'library', 'note']

function isContentType(value: unknown): value is ContentType {
  return typeof value === 'string' && CONTENT_TYPES.includes(value as ContentType)
}

function parseRelatedRef(item: unknown): RelatedRef | null {
  if (typeof item === 'string') {
    const separatorIndex = item.indexOf(':')
    if (separatorIndex === -1) return null

    const type = item.slice(0, separatorIndex)
    const key = item.slice(separatorIndex + 1)

    if (!isContentType(type) || key.length === 0) return null
    return { type, key }
  }

  if (item !== null && typeof item === 'object') {
    const obj = item as Record<string, unknown>
    if (isContentType(obj.type) && typeof obj.key === 'string' && obj.key.length > 0) {
      return { type: obj.type, key: obj.key }
    }
  }

  return null
}

export function normalizeRelated(value: unknown): RelatedRef[] {
  if (!Array.isArray(value)) return []

  return value
    .map(parseRelatedRef)
    .filter((ref): ref is RelatedRef => ref !== null)
}
