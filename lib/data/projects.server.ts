import 'server-only'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Project, ProjectTag } from './types'
import { normalizeRelated } from './related'

const PROJECTS_DIR = join(process.cwd(), 'content', 'projects')

const VALID_VISUAL_TYPES = ['wireframe', 'network', 'voxel', 'shader'] as const

function isValidVisualType(value: unknown): value is Project['visualType'] {
  return typeof value === 'string' && VALID_VISUAL_TYPES.includes(value as any)
}

function isProjectTag(value: unknown): value is ProjectTag {
  return typeof value === 'number' && value >= 0 && value <= 6
}

function normalizeFlow(value: unknown): Project['architecture']['flow'] {
  if (typeof value === 'string') {
    return value
  }

  return undefined
}

function normalizeTechStack(value: unknown): Project['techStack'] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item: unknown) => {
      if (typeof item === 'string') {
        return { header: '', content: item }
      }

      if (item !== null && typeof item === 'object') {
        const obj = item as Record<string, unknown>

        if ('header' in obj && 'content' in obj) {
          return {
            header: String(obj.header ?? ''),
            content: String(obj.content ?? '')
          }
        }

        const entries = Object.entries(obj)
        if (entries.length === 0) return null
        const [header, content] = entries[0]
        return {
          header: String(header ?? ''),
          content: String(content ?? '')
        }
      }

      return null
    })
    .filter((item): item is { header: string; content: string } => item !== null && (item.header !== '' || item.content !== ''))
}

function normalizeProject(data: Record<string, unknown>): Project {
  const meta = (data.meta || {}) as Record<string, unknown>
  const architecture = (data.architecture || {}) as Record<string, unknown>

  return {
    id: String(data.id),
    title: String(data.title ?? ''),
    subtitle: String(data.subtitle ?? ''),
    category: String(data.category ?? ''),
    year: String(data.year ?? ''),
    meta: {
      type: String(meta.type ?? ''),
      role: String(meta.role ?? ''),
      status: String(meta.status ?? ''),
      date: String(meta.date ?? ''),
      duration: String(meta.duration ?? ''),
      tech: String(meta.tech ?? '')
    },
    visualType: isValidVisualType(data.visualType)
      ? data.visualType
      : 'wireframe',
    tags: Array.isArray(data.tags)
      ? data.tags.filter(isProjectTag)
      : [],
    overview: String(data.overview ?? ''),
    problem: String(data.problem ?? ''),
    solution: String(data.solution ?? ''),
    architecture: {
      title: architecture.title ? String(architecture.title) : undefined,
      blocks: Array.isArray(architecture.blocks)
        ? architecture.blocks
            .map((block: unknown) => {
              const b = block as Record<string, unknown>
              return {
                label: String(b.label ?? ''),
                value: String(b.value ?? '')
              }
            })
            .filter((b) => b.label || b.value)
        : [],
      flow: normalizeFlow(architecture.flow)
    },
    techStack: normalizeTechStack(data.techStack),
    challenges: Array.isArray(data.challenges)
      ? data.challenges.map(String)
      : [],
    outcome: String(data.outcome ?? ''),
    related: normalizeRelated(data.related)
  }
}

function loadProjects(): Project[] {
  let files: string[]
  try {
    files = readdirSync(PROJECTS_DIR)
  } catch {
    return []
  }

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = join(PROJECTS_DIR, file)
      const source = readFileSync(filePath, 'utf8')
      const { data } = matter(source)
      return normalizeProject(data)
    })
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
}

export const projects: Project[] = loadProjects()

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
