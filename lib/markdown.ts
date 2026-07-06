import { NoteEntry } from './data'

export interface Heading {
  text: string
  level: number
  id: string
}

export interface NoteFrontmatter {
  title?: string
  titleZh?: string
  excerpt?: string
  date?: string
  category?: string
  readingTime?: string
  tags?: string[]
  coverImage?: string
  language?: 'zh' | 'en' | 'mixed'
}

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-龥\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
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

export function parseFrontmatter(source: string): NoteFrontmatter {
  const frontmatter: NoteFrontmatter = {}

  if (!source.startsWith('---')) {
    return frontmatter
  }

  const end = source.indexOf('---', 3)
  if (end === -1) {
    return frontmatter
  }

  const block = source.slice(3, end).trim()
  const lines = block.split('\n')

  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (!match) continue

    const key = match[1].trim()
    let value: any = match[2].trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1)
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1)
    }

    if (key === 'tags') {
      frontmatter.tags = Array.isArray(value) ? value : [value]
    } else if (key === 'titleZh') {
      frontmatter.titleZh = value
    } else if (key === 'excerpt') {
      frontmatter.excerpt = value
    } else if (key === 'readingTime') {
      frontmatter.readingTime = value
    } else if (key === 'coverImage') {
      frontmatter.coverImage = value
    } else if (key === 'language') {
      frontmatter.language = value
    } else if (key === 'title') {
      frontmatter.title = value
    } else if (key === 'date') {
      frontmatter.date = value
    } else if (key === 'category') {
      frontmatter.category = value
    }
  }

  return frontmatter
}

// Manual mapping so @next/mdx can statically analyze the imports.
const noteModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'portfolio-interface-v2': () => import('@/content/notes/portfolio-interface-v2.mdx'),
  'project-queen-plan-phase': () => import('@/content/notes/project-queen-plan-phase.mdx'),
  'mead-of-poetry-prototype': () => import('@/content/notes/mead-of-poetry-prototype.mdx'),
  'distributed-systems-consistency': () => import('@/content/notes/distributed-systems-consistency.mdx'),
  'interface-as-architecture': () => import('@/content/notes/interface-as-architecture.mdx'),
  'building-with-webgl': () => import('@/content/notes/building-with-webgl.mdx'),
  'year-end-review': () => import('@/content/notes/year-end-review.mdx')
}

export async function getNoteModule(slug: string) {
  const loadModule = noteModules[slug]
  if (!loadModule) return null
  return loadModule()
}

export interface NoteContent {
  meta: NoteEntry
  frontmatter: NoteFrontmatter
  headings: Heading[]
  source: string
}

export async function getNoteContent(slug: string, meta: NoteEntry): Promise<NoteContent | null> {
  const module = await getNoteModule(slug)
  if (!module) return null

  // Read raw source for heading extraction and frontmatter parsing.
  // In production this is only used at build time.
  const { readFile } = await import('fs/promises')
  const { join } = await import('path')
  const filePath = join(process.cwd(), 'content', 'notes', `${slug}.mdx`)
  const source = await readFile(filePath, 'utf8')
  const frontmatter = parseFrontmatter(source)
  const bodySource = source.replace(/^---[\s\S]*?---\n*/, '')
  const headings = extractHeadings(bodySource)

  return { meta, frontmatter, source, headings }
}
