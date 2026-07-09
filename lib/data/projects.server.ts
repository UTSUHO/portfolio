import 'server-only'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Project, ProjectTag } from './types'

const PROJECTS_DIR = join(process.cwd(), 'content', 'projects')

const VALID_VISUAL_TYPES = ['wireframe', 'network', 'voxel', 'shader'] as const

function isValidVisualType(value: unknown): value is Project['visualType'] {
  return typeof value === 'string' && VALID_VISUAL_TYPES.includes(value as any)
}

function isProjectTag(value: unknown): value is ProjectTag {
  return typeof value === 'number' && value >= 0 && value <= 6
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
      flow: Array.isArray(architecture.flow)
        ? architecture.flow.map(String)
        : undefined
    },
    techStack: Array.isArray(data.techStack)
      ? data.techStack.map(String)
      : [],
    challenges: Array.isArray(data.challenges)
      ? data.challenges.map(String)
      : [],
    outcome: String(data.outcome ?? ''),
    relatedIds: Array.isArray(data.relatedIds)
      ? data.relatedIds.map(String)
      : []
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
