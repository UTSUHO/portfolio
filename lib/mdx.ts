import { NoteMeta } from './data'

export interface Heading {
  text: string
  level: number
  id: string
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = []
  const lines = source.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      headings.push({ level, text, id: slugifyHeading(text) })
    }
  }

  return headings
}

// Manual mapping so @next/mdx can statically analyze the imports.
const noteModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'portfolio-interface-v2': () => import('@/content/notes/portfolio-interface-v2.mdx'),
  'project-queen-plan-phase': () => import('@/content/notes/project-queen-plan-phase.mdx'),
  'mead-of-poetry-prototype': () => import('@/content/notes/mead-of-poetry-prototype.mdx'),
  'distributed-systems-consistency': () => import('@/content/notes/distributed-systems-consistency.mdx'),
  'interface-as-architecture': () => import('@/content/notes/interface-as-architecture.mdx')
}

export async function getNoteModule(slug: string) {
  const loadModule = noteModules[slug]
  if (!loadModule) return null
  return loadModule()
}

export interface NoteContent {
  meta: NoteMeta
  headings: Heading[]
  source: string
}

export async function getNoteContent(slug: string, meta: NoteMeta): Promise<NoteContent | null> {
  const module = await getNoteModule(slug)
  if (!module) return null

  // Read raw source for heading extraction.
  // In production this is only used at build time.
  const { readFile } = await import('fs/promises')
  const { join } = await import('path')
  const filePath = join(process.cwd(), 'content', 'notes', `${slug}.mdx`)
  const source = await readFile(filePath, 'utf8')
  const headings = extractHeadings(source)

  return { meta, source, headings }
}
