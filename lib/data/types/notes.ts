export type NoteCategory =
  | 'Tech'
  | 'Life'
  | 'Thoughts'
  | 'Reading'
  | 'WebGL'
  | 'Systems'
  | 'Journal'

export interface NoteEntry {
  slug: string
  title: string
  titleZh: string
  excerpt: string
  date: string
  category: NoteCategory
  tags: string[]
  readingTime: string
  coverImage: string
  language?: 'zh' | 'en' | 'mixed'
}
