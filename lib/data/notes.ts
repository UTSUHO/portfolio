import { NoteEntry, NoteCategory } from './types'
export type { NoteEntry, NoteCategory } from './types'

export const notes: NoteEntry[] = [
  {
    slug: 'portfolio-interface-v2',
    title: 'Portfolio Interface v2.0 Deployed',
    titleZh: '作品集界面 v2.0 上线',
    excerpt:
      '将作品集从 Chakra UI + Pages Router 迁移到 TailwindCSS + App Router。目标不只是技术更新，而是让站点的视觉语言与我思考系统的方式更紧密地咬合。',
    date: '2026.06.01',
    category: 'Systems',
    tags: ['Portfolio', 'Next.js', 'TailwindCSS', 'System'],
    readingTime: '5 min read',
    coverImage: '/images/contents/airElement.png',
    related: [],
    language: 'mixed'
  },
  {
    slug: 'project-queen-plan-phase',
    title: 'Project Queen Enters Plan Phase',
    titleZh: '代号σ 进入企划阶段',
    excerpt:
      '一款以神话为灵感的奇幻 SRPG 开始从原型进入正式企划阶段。记录核心战斗系统、叙事状态图与 UI 方向的早期决策。',
    date: '2025.01.15',
    category: 'Journal',
    tags: ['GameDev', 'SRPG', 'Design', 'Mythology'],
    readingTime: '6 min read',
    coverImage: '/images/contents/fireElement.png',
    related: [],
    language: 'mixed'
  },
  {
    slug: 'mead-of-poetry-prototype',
    title: 'Mead-of-Poetry Prototype Complete',
    titleZh: '诗之蜜酒原型完成',
    excerpt:
      '一款以中外神话为底本的桌面游戏原型完成。核心机制围绕“语言作为资源”展开，记录设计迭代与 30 余次测试的反馈。',
    date: '2023.08.20',
    category: 'Thoughts',
    tags: ['Boardgame', 'Mythology', 'Prototype', 'Mechanics'],
    readingTime: '7 min read',
    coverImage: '/images/contents/earthElement.png',
    related: [],
    language: 'mixed'
  },
  {
    slug: 'distributed-systems-consistency',
    title: 'On Consistency in Distributed Systems',
    titleZh: '关于分布式系统中一致性的一些思考',
    excerpt:
      '一致性不是二元的。它是一组保证的连续谱，每种保证都有不同的成本与故障模式。这里记录对 CAP、一致性模型与工程权衡的理解。',
    date: '2025.05.28',
    category: 'Tech',
    tags: ['Distributed Systems', 'Architecture', 'Consistency'],
    readingTime: '8 min read',
    coverImage: '/images/contents/aquaElement.png',
    related: [],
    language: 'mixed'
  },
  {
    slug: 'interface-as-architecture',
    title: 'Interface as Architecture',
    titleZh: '界面即架构',
    excerpt:
      '界面不只是皮肤的堆叠，它是系统结构的显影剂。从状态栏、面板到字体排印，每一处表面都在陈述系统如何组织信息。',
    date: '2025.03.10',
    category: 'Systems',
    tags: ['Design', 'Systems', 'UI', 'Architecture'],
    readingTime: '6 min read',
    coverImage: '/images/contents/vegvisir.jpg',
    related: [],
    language: 'mixed'
  },
  {
    slug: 'building-with-webgl',
    title: 'Building with WebGL: What I Learned',
    titleZh: 'WebGL 实践笔记',
    excerpt:
      '从 Three.js 到原始 WebGL：记录最近在图形管线、着色器与性能调试上的几个脚印，以及那些让我重新理解“像素即状态”的时刻。',
    date: '2025.04.12',
    category: 'WebGL',
    tags: ['WebGL', 'Three.js', 'Shaders', 'Performance'],
    readingTime: '7 min read',
    coverImage: '/images/contents/airElement.png',
    related: [
      { type: 'project', key: '11' }
    ],
    language: 'mixed'
  },
  {
    slug: 'year-end-review',
    title: 'Year-End Review & Next Intentions',
    titleZh: '年终回顾与下一年意图',
    excerpt:
      '一年将尽时，把做过的事、没做完的事和想开始的事摊在桌上。这不是绩效总结，而是一次对注意力的清点。',
    date: '2024.12.31',
    category: 'Journal',
    tags: ['Reflection', 'Planning', 'Life'],
    readingTime: '5 min read',
    coverImage: '/images/contents/vegvisir.jpg',
    related: [],
    language: 'mixed'
  }
]

export const noteCategories: NoteCategory[] = [
  'Tech',
  'Life',
  'Thoughts',
  'Reading',
  'WebGL',
  'Systems',
  'Journal'
]

export const years = Array.from(
  new Set(notes.map((n) => n.date.split('.')[0]))
).sort()

export const noteTags = Array.from(new Set(notes.flatMap((n) => n.tags)))

export function getNoteBySlug(slug: string): NoteEntry | undefined {
  return notes.find((n) => n.slug === slug)
}

export function getAdjacentNotes(
  slug: string
): { prev: NoteEntry | null; next: NoteEntry | null } {
  const index = notes.findIndex((n) => n.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? notes[index - 1] : null,
    next: index < notes.length - 1 ? notes[index + 1] : null
  }
}

export function getNotesByCategory(category: NoteCategory): NoteEntry[] {
  return notes.filter((n) => n.category === category)
}

export function getNotesByYear(year: string): NoteEntry[] {
  return notes.filter((n) => n.date.startsWith(year))
}

export function getNotesByTag(tag: string): NoteEntry[] {
  return notes.filter((n) => n.tags.includes(tag))
}
