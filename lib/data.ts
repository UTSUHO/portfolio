export interface Project {
  id: string
  number: string
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

export interface NoteMeta {
  slug: string
  title: string
  date: string
  category: 'TECH' | 'SYSTEM' | 'LIFE' | 'GAME_DEV' | 'DESIGN'
  tags: string[]
  readTime: string
  coverImage?: string
}

export const projects: Project[] = [
  {
    id: '01',
    number: '01 / PROJECT',
    title: 'Mead-of-Poetry 诗之蜜酒',
    subtitle: 'A mythology-inspired mid-weight board game about poetry, gods, and transformation.',
    category: 'Board Game / Mythology',
    year: '2023',
    meta: {
      type: 'Board Game',
      role: 'Game Designer',
      status: 'Prototype Complete',
      date: '2023',
      duration: '18 Months',
      tech: 'Paper Prototype / PlaytestKit'
    },
    visualType: 'wireframe',
    overview: 'Mead-of-Poetry is a mid-weight strategy board game built around Norse and Chinese mythology. Players take on the role of poets seeking the mythical mead of poetry, trading verses, gathering divine favor, and navigating a world where language is power.',
    problem: 'Most mythology-themed board games rely on combat or area control. I wanted to explore knowledge and language as core mechanical resources, while keeping the ruleset approachable for players new to the genre.',
    solution: 'Designed a card-drafting system where each verse card carries both resource value and narrative text. Combinations of verses trigger "rhetorical devices" that produce asymmetric effects, encouraging players to read the cards literally and strategically at the same time.',
    architecture: {
      title: 'System Layers',
      blocks: [
        { label: 'Core Loop', value: 'Draft verse cards → Build meter → Invoke device' },
        { label: 'Resource Model', value: 'Inspiration, Memory, Favor as triangular economy' },
        { label: 'Win Condition', value: 'First to compose three completed stanzas' },
        { label: 'Player Count', value: '2–4, asymmetric poet roles' }
      ],
      flow: ['Setup', 'Draft Phase', 'Composition Phase', 'Invocation Phase', 'Scoring']
    },
    techStack: ['Paper Prototype', 'PlaytestKit', 'Adobe Illustrator', 'Figma'],
    challenges: [
      'Balancing narrative flavor against rule clarity.',
      'Creating asymmetric roles that feel distinct without overwhelming new players.',
      'Testing remotely with board-game communities across time zones.'
    ],
    outcome: 'Completed a fully playable prototype with over 120 unique verse cards, conducted 30+ playtests, and received consistent feedback that the language-as-resource mechanic felt fresh.',
    relatedIds: ['02', '05']
  },
  {
    id: '02',
    number: '02 / PROJECT',
    title: 'CODE:QUEEN 代号σ',
    subtitle: 'A fantasy SRPG built around mythology-inspired worldbuilding and tactical systems.',
    category: 'Game / SLG / Fantasy',
    year: '2025',
    meta: {
      type: 'Video Game',
      role: 'Indie Game Developer',
      status: 'In Development',
      date: '2025',
      duration: 'Ongoing',
      tech: 'Unity / C# / Figma'
    },
    visualType: 'network',
    overview: 'CODE:QUEEN is a single-player fantasy SRPG currently in development. The game combines grid-based tactical combat with a narrative system where player choices reshape the mythology of the world.',
    problem: 'Traditional SRPGs often separate story and combat into distinct modes. I wanted every tactical decision to also carry narrative weight, so the battlefield becomes a stage for character drama.',
    solution: 'Built a "Fate Weave" system that links unit abilities to story threads. Using certain skills advances corresponding narrative arcs, unlocking alternate map states, reinforcements, and endings.',
    architecture: {
      title: 'Engine Architecture',
      blocks: [
        { label: 'Core', value: 'Unity ECS-lite turn scheduler' },
        { label: 'Combat', value: 'Grid action pipeline with prediction' },
        { label: 'Narrative', value: 'Fate Weave state graph' },
        { label: 'Data', value: 'ScriptableObject-driven unit/ability database' }
      ],
      flow: ['Turn Input', 'Action Validation', 'Simulation', 'Resolution', 'State Update']
    },
    techStack: ['Unity', 'C#', 'Figma', 'Aseprite', 'Git'],
    challenges: [
      'Designing a combat-narrative coupling that feels emergent rather than scripted.',
      'Maintaining deterministic simulation for save/load and replay debugging.',
      'Solo development pipeline across design, code, and UI.'
    ],
    outcome: 'Core battle system and turn scheduler are functional; narrative state graph prototype is in active iteration. Targeting a vertical slice demo.',
    relatedIds: ['01', '03']
  },
  {
    id: '03',
    number: '03 / PROJECT',
    title: 'API-Disruptor',
    subtitle: 'A developer tool for stress-testing REST APIs with configurable disruption patterns.',
    category: 'Dev Tool / REST API',
    year: '2022',
    meta: {
      type: 'Developer Tool',
      role: 'Solo Engineer',
      status: 'Prototype',
      date: '2022',
      duration: '3 Months',
      tech: 'TypeScript / Node.js / React'
    },
    visualType: 'network',
    overview: 'API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure.',
    problem: 'Testing distributed failure modes locally usually requires heavy infrastructure. Small teams need a fast, configurable way to simulate bad network behavior without deploying a chaos platform.',
    solution: 'Created a local proxy server with a declarative rule engine. Rules define match conditions, disruption types, and probability curves. A small React dashboard visualizes live request outcomes.',
    architecture: {
      title: 'Tool Stack',
      blocks: [
        { label: 'Proxy', value: 'Node.js HTTP interceptor' },
        { label: 'Engine', value: 'Rule matcher + disruption scheduler' },
        { label: 'Dashboard', value: 'React + real-time event stream' },
        { label: 'Config', value: 'YAML/JSON rule files' }
      ],
      flow: ['Capture Request', 'Match Rules', 'Apply Disruption', 'Forward', 'Log Outcome']
    },
    techStack: ['TypeScript', 'Node.js', 'React', 'Express', 'WebSocket'],
    challenges: [
      'Keeping latency injection deterministic enough for reproducible tests.',
      'Designing a rule syntax that is expressive but not overwhelming.',
      'Avoiding side effects on non-target requests.'
    ],
    outcome: 'Functional prototype capable of injecting latency, HTTP errors, and timeout failures. Used internally to harden client retry logic.',
    relatedIds: ['02', '04']
  },
  {
    id: '04',
    number: '04 / PROJECT',
    title: 'Touhou-M1-comedy-series',
    subtitle: 'Subtitle translation and localization of a long-running comedy series.',
    category: 'Translation / Comedy',
    year: '2021',
    meta: {
      type: 'Translation',
      role: 'Translator / Editor',
      status: 'Released',
      date: '2021',
      duration: '12 Months',
      tech: 'Aegisub / Git'
    },
    visualType: 'voxel',
    overview: 'A multi-episode subtitle translation project for the Touhou M-1 Grand Prix comedy series, balancing faithful Japanese-to-Chinese translation with comedic timing.',
    problem: 'Comedy translation requires preserving punchlines across language boundaries. Literal translation often kills timing, while overly free adaptation loses character voice.',
    solution: 'Developed a translation workflow that separates dialogue translation, timing adjustment, and punchline review into distinct passes, allowing each to be optimized independently.',
    architecture: {
      title: 'Workflow',
      blocks: [
        { label: 'Translate', value: 'First-pass dialogue with notes' },
        { label: 'Time', value: 'Frame-accurate subtitle sync' },
        { label: 'Review', value: 'Punchline and cultural note pass' },
        { label: 'Release', value: 'Softsub distribution' }
      ],
      flow: ['Raw', 'Translation', 'Timing', 'QC', 'Release']
    },
    techStack: ['Aegisub', 'Git', 'ASS Subtitles', 'FFmpeg'],
    challenges: [
      'Maintaining comedic rhythm across sentence structures that differ between Japanese and Chinese.',
      'Managing a multi-episode release schedule with a small team.',
      'Handling cultural references that require translator notes without breaking immersion.'
    ],
    outcome: 'Released complete subtitles for the target series, with positive community feedback on timing accuracy and joke preservation.',
    relatedIds: ['07', '05']
  },
  {
    id: '05',
    number: '05 / PROJECT',
    title: 'Humankind 测评与分析',
    subtitle: 'A long-form essay analyzing the 4X strategy game Humankind.',
    category: 'Essay / Game Analysis',
    year: '2021',
    meta: {
      type: 'Essay',
      role: 'Writer',
      status: 'Published',
      date: '2021',
      duration: '2 Months',
      tech: 'PDF / Markdown'
    },
    visualType: 'shader',
    overview: 'A 30-page critical analysis of Humankind, examining how the game reframes civilization progression through cultural hybridity rather than linear tech trees.',
    problem: 'Most game reviews focus on mechanics in isolation. I wanted to analyze how Humankind\'s design expresses a specific philosophical idea about history and identity.',
    solution: 'Structured the essay around three lenses—mechanics, narrative systems, and historical representation—showing how they reinforce each other.',
    architecture: {
      title: 'Essay Structure',
      blocks: [
        { label: 'Lens 1', value: 'Mechanics: fame as victory vector' },
        { label: 'Lens 2', value: 'Narrative: emergent civ stories' },
        { label: 'Lens 3', value: 'Representation: hybridity vs. linearity' }
      ],
      flow: ['Introduction', 'Mechanics', 'Narrative', 'Representation', 'Conclusion']
    },
    techStack: ['Markdown', 'LaTeX', 'Adobe InDesign'],
    challenges: [
      'Avoiding shallow comparisons to Civilization.',
      'Balancing academic tone with accessibility for general readers.',
      'Producing a PDF layout that matched the analytical tone.'
    ],
    outcome: 'Published as a downloadable PDF. Used as a reference in several Chinese-language game analysis discussions.',
    relatedIds: ['04', '06']
  },
  {
    id: '06',
    number: '06 / PROJECT',
    title: '"1984" Dust Jacket Design',
    subtitle: 'A typographic dust jacket redesign for George Orwell\'s 1984.',
    category: 'Graphic Design',
    year: '2020',
    meta: {
      type: 'Graphic Design',
      role: 'Designer',
      status: 'Completed',
      date: '2020',
      duration: '1 Month',
      tech: 'Illustrator / InDesign'
    },
    visualType: 'wireframe',
    overview: 'A dust jacket redesign that treats surveillance and language control as visual systems rather than imagery. The final piece uses constrained typography and repeated structural units.',
    problem: 'Many 1984 covers rely on predictable eye or surveillance imagery. I wanted to communicate the book\'s themes through layout and typographic restraint.',
    solution: 'Created a modular grid system where each cover panel is composed of identical typographic cells. The spine interrupts the grid with a single red accent line, representing the fracture of language.',
    architecture: {
      title: 'Design System',
      blocks: [
        { label: 'Grid', value: '6×12 modular cell system' },
        { label: 'Type', value: 'Monospaced primary, grotesque secondary' },
        { label: 'Color', value: 'Black, white, single red accent' },
        { label: 'Materials', value: 'Matte stock with spot varnish' }
      ],
      flow: ['Concept', 'Grid Study', 'Type Lockup', 'Material Mockup']
    },
    techStack: ['Adobe Illustrator', 'Adobe InDesign', 'Laser Printer'],
    challenges: [
      'Conveying oppression without relying on dark imagery.',
      'Maintaining readability while using extreme typographic repetition.',
      'Producing a physical mockup with limited print resources.'
    ],
    outcome: 'Completed a printed mockup and digital spreads. Selected for a student exhibition on book design.',
    relatedIds: ['05', '01']
  },
  {
    id: '07',
    number: '07 / PROJECT',
    title: '东方斑樱汉化 Madarazakura',
    subtitle: 'Localization of a Touhou STG fan game, including UI, dialogue, and manual.',
    category: 'Translation / STG',
    year: '2019',
    meta: {
      type: 'Game Localization',
      role: 'Translator / Coordinator',
      status: 'Released',
      date: '2019',
      duration: '8 Months',
      tech: 'Aegisub / Git / Python'
    },
    visualType: 'voxel',
    overview: 'A fan localization project for a Touhou shooting-game title. Scope included in-game UI, story dialogue, spell card names, and the instruction manual.',
    problem: 'STG games combine fast-paced UI text with dense mythological references. Localization must be accurate under pressure and consistent across multiple file formats.',
    solution: 'Built a small Python pipeline to extract, diff, and re-inject text assets. Established a shared glossary for spell names and character terminology to keep translations consistent.',
    architecture: {
      title: 'Pipeline',
      blocks: [
        { label: 'Extract', value: 'Python script parses game assets' },
        { label: 'Translate', value: 'Shared glossary + translator notes' },
        { label: 'Inject', value: 'Script rebuilds game text files' },
        { label: 'Test', value: 'In-game screenshot diff' }
      ],
      flow: ['Asset Dump', 'Text Extraction', 'Translation', 'Injection', 'In-Game QC']
    },
    techStack: ['Python', 'Aegisub', 'Git', 'Touhou STG Engine'],
    challenges: [
      'Working with undocumented proprietary file formats.',
      'Keeping UI text concise enough to fit original layout bounds.',
      'Coordinating translators across different time zones.'
    ],
    outcome: 'Released a complete Chinese localization patch. The glossary and pipeline were reused for later fan translation projects.',
    relatedIds: ['04', '02']
  }
]

export const notes: NoteMeta[] = [
  {
    slug: 'portfolio-interface-v2',
    title: 'Portfolio Interface v2.0 Deployed',
    date: '2026.06.01',
    category: 'SYSTEM',
    tags: ['portfolio', 'nextjs', 'tailwindcss'],
    readTime: '5 MIN',
    coverImage: '/images/contents/airElement.png'
  },
  {
    slug: 'project-queen-plan-phase',
    title: 'Project Queen Enters Plan Phase',
    date: '2025.01.15',
    category: 'GAME_DEV',
    tags: ['gamedev', 'srpg', 'design'],
    readTime: '6 MIN',
    coverImage: '/images/contents/fireElement.png'
  },
  {
    slug: 'mead-of-poetry-prototype',
    title: 'Mead-of-Poetry Prototype Complete',
    date: '2023.08.20',
    category: 'DESIGN',
    tags: ['boardgame', 'mythology', 'prototype'],
    readTime: '7 MIN',
    coverImage: '/images/contents/earthElement.png'
  },
  {
    slug: 'distributed-systems-consistency',
    title: 'Distributed Systems Consistency',
    date: '2025.05.28',
    category: 'TECH',
    tags: ['distributed-systems', 'databases', 'consistency'],
    readTime: '8 MIN',
    coverImage: '/images/contents/aquaElement.png'
  },
  {
    slug: 'interface-as-architecture',
    title: 'Interface as Architecture',
    date: '2025.03.10',
    category: 'SYSTEM',
    tags: ['design', 'systems', 'ui'],
    readTime: '6 MIN',
    coverImage: '/images/contents/vegvisir.jpg'
  }
]

export interface ExperienceItem {
  year: string
  company: string
  position: string
  description: string
}

export const experience: ExperienceItem[] = [
  {
    year: '2025 — NOW',
    company: 'Project Queen',
    position: 'Indie Game Developer',
    description: 'Fantasy SRPG with mythology-inspired worldbuilding. Core battle system, narrative state graph, and UI direction.'
  },
  {
    year: '2022 — 2025',
    company: 'Indie Game Project',
    position: 'Game Designer',
    description: 'Game design, system architecture, narrative direction, and playtest coordination across multiple prototypes.'
  }
]

export const skills = [
  { name: 'Game Design', level: 75 },
  { name: 'Programming', level: 80 },
  { name: 'Translation', level: 60 },
  { name: 'UI/UX Design', level: 55 }
]

export interface ExperienceProfile {
  id: string
  label: string
  items: ExperienceItem[]
  skills: { name: string; level: number }[]
}

export const experienceProfiles: ExperienceProfile[] = [
  {
    id: 'game-dev',
    label: 'GAME DEV',
    items: experience,
    skills: [
      { name: 'Game Design', level: 75 },
      { name: 'Programming', level: 80 },
      { name: 'Translation', level: 60 },
      { name: 'UI/UX Design', level: 55 }
    ]
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    items: [
      {
        year: '2025 — NOW',
        company: 'Project Queen',
        position: 'Frontend Engineer',
        description: 'Built the project dashboard, design system, and real-time UI components with React and TypeScript.'
      },
      {
        year: '2022 — 2025',
        company: 'Indie Game Project',
        position: 'UI Engineer',
        description: 'Implemented component libraries, state management, and responsive interfaces for game tooling.'
      }
    ],
    skills: [
      { name: 'React / Next.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'UI Design', level: 70 },
      { name: 'Node.js', level: 65 }
    ]
  },
  {
    id: 'translation',
    label: 'TRANSLATION',
    items: [
      {
        year: '2021 — NOW',
        company: 'Touhou M-1 Series',
        position: 'Translator / Editor',
        description: 'Subtitle localization for comedy series, balancing faithful translation with comedic timing.'
      },
      {
        year: '2019 — 2021',
        company: 'Touhou Madarazakura',
        position: 'Localization Coordinator',
        description: 'Led UI, dialogue, and manual localization for STG fan game with shared glossary and tooling.'
      }
    ],
    skills: [
      { name: 'Japanese', level: 90 },
      { name: 'Chinese', level: 95 },
      { name: 'English', level: 80 },
      { name: 'CAT Tools', level: 60 }
    ]
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getNoteBySlug(slug: string): NoteMeta | undefined {
  return notes.find((n) => n.slug === slug)
}

export function getAdjacentNotes(slug: string): { prev: NoteMeta | null; next: NoteMeta | null } {
  const index = notes.findIndex((n) => n.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? notes[index - 1] : null,
    next: index < notes.length - 1 ? notes[index + 1] : null
  }
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export const categories = Array.from(new Set(notes.map((n) => n.category)))

export const years = Array.from(new Set(notes.map((n) => n.date.split('.')[0]))).sort()

export const tags = Array.from(new Set(notes.flatMap((n) => n.tags)))

export function getNotesByCategory(category: string): NoteMeta[] {
  return notes.filter((n) => n.category === category)
}

export function getNotesByYear(year: string): NoteMeta[] {
  return notes.filter((n) => n.date.startsWith(year))
}

export function getNotesByTag(tag: string): NoteMeta[] {
  return notes.filter((n) => n.tags.includes(tag))
}
