export * from './types/projects'
export * from './types/notes'
export * from './types/library'
export * from './types/resume'

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}
