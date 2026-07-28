import { RelatedRef } from '../related'

export type LibraryStatus = 'published' | 'in-progress' | 'archived'

export type LibraryType =
  | 'library'
  | 'project'
  | 'case-study'
  | 'experiment'
  | 'documentation'
  | 'tool'
  | 'research'
  | 'essay'
  | 'games'

export type LibraryCategory =
  | 'Systems'
  | 'WebGL'
  | 'Frontend Engineering'
  | 'Tools'
  | 'Infrastructure'
  | 'Research Notes'
  | 'Case Study'
  | 'Games'
  | 'Essays'

export type LibrarySection = {
  id: string
  number: string
  title: string
  body: string
  bullets?: string[]
  diagram?: string
  table?: { label: string; value: string }[]
  codeBlock?: string
}

export type LibraryEntry = {
  id: string
  slug: string
  number: string
  title: string
  subtitle: string
  summary: string
  date: string
  year: number
  type: LibraryType
  category: LibraryCategory
  status: LibraryStatus
  role?: string
  duration?: string
  stack: string[]
  tags: string[]
  thumbnail?: string
  heroVisual?: string
  gallery?: string[]
  links?: { repository?: string; demo?: string; article?: string }
  keyFacts?: { label: string; value: string }[]
  sections: LibrarySection[]
  related: RelatedRef[]
}
