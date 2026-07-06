export type ProjectTag = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const PROJECT_TAG_MAP = [
  { index: 0 as ProjectTag, label: 'work', icon: 'briefcase' },
  { index: 1 as ProjectTag, label: 'interest', icon: 'heart' },
  { index: 2 as ProjectTag, label: 'ai', icon: 'bot' },
  { index: 3 as ProjectTag, label: 'gamedesign', icon: 'gamepad2' },
  { index: 4 as ProjectTag, label: 'frontend', icon: 'monitor' },
  { index: 5 as ProjectTag, label: 'fullstack', icon: 'layers' },
  { index: 6 as ProjectTag, label: 'design', icon: 'palette' }
] as const

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  year: string
  meta: {
    type: string
    role: string
    status: string
    date: string
    duration: string
    tech: string
  }
  visualType: 'wireframe' | 'network' | 'voxel' | 'shader'
  tags: ProjectTag[]
  overview: string
  problem: string
  solution: string
  architecture: {
    title?: string
    blocks: { label: string; value: string }[]
    flow?: string[]
  }
  techStack: string[]
  challenges: string[]
  outcome: string
  relatedIds: string[]
}
