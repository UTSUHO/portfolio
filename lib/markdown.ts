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

export interface NoteContent {
  meta: NoteEntry
  frontmatter: NoteFrontmatter
  headings: Heading[]
  body: string
}

export async function getNoteContent(slug: string, meta: NoteEntry): Promise<NoteContent | null> {
  // Read raw source for heading extraction and frontmatter parsing.
  // In production this is only used at build time.
  const { readFile } = await import('fs/promises')
  const { join } = await import('path')
  const filePath = join(process.cwd(), 'content', 'notes', `${slug}.md`)
  const source = await readFile(filePath, 'utf8')
  const frontmatter = parseFrontmatter(source)
  const body = source.replace(/^---[\s\S]*?---\n*/, '')
  const headings = extractHeadings(body)

  return { meta, frontmatter, body, headings }
}
