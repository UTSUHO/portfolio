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

export type LibraryHeroSlide =
  | { type: 'image'; src: string; thumbnail?: string; alt?: string; caption?: string }
  | { type: 'mermaid'; definition: string; thumbnail?: string; caption?: string }

export type LibrarySectionVariant =
  | 'prose'
  | 'pillars'
  | 'architecture'
  | 'constraints'
  | 'outcome'

export type LibrarySectionItem = {
  id?: string
  number?: string
  code?: string
  title: string
  body?: string
  meta?: string
  diagram?: string
}

export type LibrarySectionFlow = {
  nodes: string[]
  branches: string[]
  sharedRuntime: string
}

export type LibrarySectionOutcome = {
  slogan: string[]
  summary: string
  intent: { code: string; body: string }[]
  capabilities: { number: string; code: string; body: string }[]
  integration: {
    sources: string[]
    entry: string
    harness: string[]
    targets: string[]
    outputs: string[]
    destination: string
  }
}

export type LibrarySection = {
  id: string
  number: string
  title: string
  label?: string
  variant?: LibrarySectionVariant
  body?: string
  bullets?: string[]
  diagram?: string
  table?: { label: string; value: string }[]
  codeBlock?: string
  items?: LibrarySectionItem[]
  modules?: LibrarySectionItem[]
  flow?: LibrarySectionFlow
  outcome?: LibrarySectionOutcome
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
  link?: string
  type: LibraryType
  category: LibraryCategory
  status: LibraryStatus
  role?: string
  duration?: string
  stack: string[]
  tags: string[]
  thumbnail?: string
  heroVisual?: string
  heroSlides?: LibraryHeroSlide[]
  gallery?: string[]
  links?: { repository?: string; demo?: string; article?: string }
  keyFacts?: { label: string; value: string }[]
  sections: LibrarySection[]
  related: RelatedRef[]
}
