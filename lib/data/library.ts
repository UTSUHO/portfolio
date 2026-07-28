import {
  LibraryEntry,
  LibraryCategory,
  LibraryStatus,
  LibrarySection,
  LibraryHeroSlide
} from './types'
export type {
  LibraryEntry,
  LibraryCategory,
  LibraryStatus,
  LibrarySection,
  LibraryHeroSlide
} from './types'

export const libraryCategories: LibraryCategory[] = [
  'Systems',
  'WebGL',
  'Frontend Engineering',
  'Tools',
  'Infrastructure',
  'Research Notes',
  'Case Study',
  'Games',
  'Essays'
]

export const libraryStatuses: LibraryStatus[] = [
  'published',
  'in-progress',
  'archived'
]

export const libraryEntries: LibraryEntry[] = [
  {
    id: "lib-01",
    slug: "madarazakura",
    number: "01",
    title: "东方斑樱汉化 Madarazakura",
    subtitle: "Localization of a Touhou STG fan game, including UI, dialogue, and manual.",
    summary: "A fan localization project for a Touhou shooting-game title. Scope included in-game UI, story dialogue, spell card names, and the instruction manual.",
    date: "2019",
    year: 2019,
    type: "library",
    category: "Essays",
    status: "published",
    role: "Translator / Coordinator",
    duration: "8 Months",
    stack: ["Aegisub","Git","Python"],
    tags: ["INTEREST"],
    thumbnail: "/images/works/TH-ikaruga.jpeg",
    heroVisual: "/images/works/TH-ikaruga.jpeg",
    heroSlides: [
      { type: "image", src: "/images/works/TH-ikaruga.jpeg", alt: "Madarazakura title screen" }
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "A fan localization project for a Touhou shooting-game title. Scope included in-game UI, story dialogue, spell card names, and the instruction manual."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "STG games combine fast-paced UI text with dense mythological references. Localization must be accurate under pressure and consistent across multiple file formats."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Built a small Python pipeline to extract, diff, and re-inject text assets. Established a shared glossary for spell names and character terminology to keep translations consistent."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "Pipeline\\n\\nExtract: Python script parses game assets\\nTranslate: Shared glossary + translator notes\\nInject: Script rebuilds game text files\\nTest: In-game screenshot diff\\n\\nFlow: Asset Dump → Text Extraction → Translation → Injection → In-Game QC"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Working with undocumented proprietary file formats.\\n• Keeping UI text concise enough to fit original layout bounds.\\n• Coordinating translators across different time zones."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Released a complete Chinese localization patch. The glossary and pipeline were reused for later fan translation projects."
      }
    ],
    related: [
      { type: "library", key: "touhou-m1-comedy-series" },
      { type: "library", key: "codequeen" }
    ]
  },
  {
    id: "lib-02",
    slug: "1984-dust-jacket-design",
    number: "02",
    title: "\"1984\" Dust Jacket Design",
    subtitle: "A typographic dust jacket redesign for George Orwell's 1984.",
    summary: "A dust jacket redesign that treats surveillance and language control as visual systems rather than imagery. The final piece uses constrained typography and repeated structural units.",
    date: "2020",
    year: 2020,
    type: "library",
    category: "Case Study",
    status: "published",
    role: "Designer",
    duration: "1 Month",
    stack: ["Illustrator","InDesign"],
    tags: ["INTEREST"],
    thumbnail: "/images/works/Fengyi-Chen-Dust-Jacket.png",
    heroVisual: "/images/works/Fengyi-Chen-Dust-Jacket.png",
    heroSlides: [
      { type: "image", src: "/images/works/Fengyi-Chen-Dust-Jacket.png", alt: "1984 dust jacket design" }
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "A dust jacket redesign that treats surveillance and language control as visual systems rather than imagery. The final piece uses constrained typography and repeated structural units."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "Many 1984 covers rely on predictable eye or surveillance imagery. I wanted to communicate the book's themes through layout and typographic restraint."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Created a modular grid system where each cover panel is composed of identical typographic cells. The spine interrupts the grid with a single red accent line, representing the fracture of language."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "Design System\\n\\nGrid: 6×12 modular cell system\\nType: Monospaced primary, grotesque secondary\\nColor: Black, white, single red accent\\nMaterials: Matte stock with spot varnish\\n\\nFlow: Concept → Grid Study → Type Lockup → Material Mockup"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Conveying oppression without relying on dark imagery.\\n• Maintaining readability while using extreme typographic repetition.\\n• Producing a physical mockup with limited print resources."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Completed a printed mockup and digital spreads. Selected for a student exhibition on book design."
      }
    ],
    related: [
      { type: "library", key: "humankind" },
      { type: "library", key: "mead-of-poetry" }
    ]
  },
  {
    id: "lib-03",
    slug: "touhou-m1-comedy-series",
    number: "03",
    title: "Touhou-M1-comedy-series",
    subtitle: "Subtitle translation and localization of a long-running comedy series.",
    summary: "A multi-episode subtitle translation project for the Touhou M-1 Grand Prix comedy series, balancing faithful Japanese-to-Chinese translation with comedic timing.",
    date: "2021",
    year: 2021,
    type: "library",
    category: "Essays",
    status: "published",
    role: "Translator / Editor",
    duration: "12 Months",
    stack: ["Aegisub","Git"],
    tags: ["INTEREST"],
    thumbnail: "/images/works/TH-M1.png",
    heroVisual: "/images/works/TH-M1.png",
    heroSlides: [
      { type: "image", src: "/images/works/TH-M1.png", alt: "Touhou M-1 comedy series" }
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "A multi-episode subtitle translation project for the Touhou M-1 Grand Prix comedy series, balancing faithful Japanese-to-Chinese translation with comedic timing."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "Comedy translation requires preserving punchlines across language boundaries. Literal translation often kills timing, while overly free adaptation loses character voice."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Developed a translation workflow that separates dialogue translation, timing adjustment, and punchline review into distinct passes, allowing each to be optimized independently."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "Workflow\\n\\nTranslate: First-pass dialogue with notes\\nTime: Frame-accurate subtitle sync\\nReview: Punchline and cultural note pass\\nRelease: Softsub distribution\\n\\nFlow: Raw → Translation → Timing → QC → Release"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Maintaining comedic rhythm across sentence structures that differ between Japanese and Chinese.\\n• Managing a multi-episode release schedule with a small team.\\n• Handling cultural references that require translator notes without breaking immersion."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Released complete subtitles for the target series, with positive community feedback on timing accuracy and joke preservation."
      }
    ],
    related: [
      { type: "library", key: "madarazakura" },
      { type: "library", key: "humankind" }
    ]
  },
  {
    id: "lib-04",
    slug: "humankind",
    number: "04",
    title: "Humankind 测评与分析",
    subtitle: "A long-form essay analyzing the 4X strategy game Humankind.",
    summary: "A 30-page critical analysis of Humankind, examining how the game reframes civilization progression through cultural hybridity rather than linear tech trees.",
    date: "2021",
    year: 2021,
    type: "library",
    category: "Games",
    status: "published",
    role: "Writer",
    duration: "2 Months",
    stack: ["PDF","Markdown"],
    tags: ["INTEREST","GAMEDESIGN"],
    thumbnail: "/images/contents/humankind.jpg",
    heroVisual: "/images/contents/humankind.jpg",
    heroSlides: [
      { type: "image", src: "/images/contents/humankind.jpg", alt: "Humankind analysis" }
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "A 30-page critical analysis of Humankind, examining how the game reframes civilization progression through cultural hybridity rather than linear tech trees."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "Most game reviews focus on mechanics in isolation. I wanted to analyze how Humankind's design expresses a specific philosophical idea about history and identity."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Structured the essay around three lenses—mechanics, narrative systems, and historical representation—showing how they reinforce each other."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "Essay Structure\\n\\nLens 1: Mechanics: fame as victory vector\\nLens 2: Narrative: emergent civ stories\\nLens 3: Representation: hybridity vs. linearity\\n\\nFlow: Introduction → Mechanics → Narrative → Representation → Conclusion"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Avoiding shallow comparisons to Civilization.\\n• Balancing academic tone with accessibility for general readers.\\n• Producing a PDF layout that matched the analytical tone."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Published as a downloadable PDF. Used as a reference in several Chinese-language game analysis discussions."
      }
    ],
    related: [
      { type: "library", key: "touhou-m1-comedy-series" },
      { type: "library", key: "1984-dust-jacket-design" }
    ]
  },
  {
    id: "lib-05",
    slug: "api-disruptor",
    number: "05",
    title: "API-Disruptor",
    subtitle: "A developer tool for stress-testing REST APIs with configurable disruption patterns.",
    summary: "API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure.",
    date: "2022",
    year: 2022,
    type: "library",
    category: "Research Notes",
    status: "published",
    role: "Solo Engineer",
    duration: "3 Months",
    stack: ["TypeScript","Node.js","React"],
    tags: ["INTEREST","FULLSTACK"],
    thumbnail: "/images/works/Api-Disruptor.png",
    heroVisual: "/images/works/Api-Disruptor.png",
    heroSlides: [
      { type: "image", src: "/images/works/Api-Disruptor.png", alt: "API-Disruptor tool" }
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "Testing distributed failure modes locally usually requires heavy infrastructure. Small teams need a fast, configurable way to simulate bad network behavior without deploying a chaos platform."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Created a local proxy server with a declarative rule engine. Rules define match conditions, disruption types, and probability curves. A small React dashboard visualizes live request outcomes."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "Tool Stack\\n\\nProxy: Node.js HTTP interceptor\\nEngine: Rule matcher + disruption scheduler\\nDashboard: React + real-time event stream\\nConfig: YAML/JSON rule files\\n\\nFlow: Capture Request → Match Rules → Apply Disruption → Forward → Log Outcome"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Keeping latency injection deterministic enough for reproducible tests.\\n• Designing a rule syntax that is expressive but not overwhelming.\\n• Avoiding side effects on non-target requests."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Functional prototype capable of injecting latency, HTTP errors, and timeout failures. Used internally to harden client retry logic."
      }
    ],
    related: [
      { type: "library", key: "codequeen" },
      { type: "library", key: "touhou-m1-comedy-series" }
    ]
  },
  {
    id: "lib-07",
    slug: "mead-of-poetry",
    number: "06",
    title: "Mead-of-Poetry 诗之蜜酒",
    subtitle: "A mythology-inspired mid-weight board game about poetry, gods, and transformation.",
    summary: "Mead-of-Poetry is a mid-weight strategy board game built around Norse and Chinese mythology. Players take on the role of poets seeking the mythical mead of poetry, trading verses, gathering divine favor, and navigating a world where language is power.",
    date: "2023",
    year: 2023,
    type: "library",
    category: "Games",
    status: "published",
    role: "Game Designer",
    duration: "18 Months",
    stack: ["Paper Prototype","PlaytestKit"],
    tags: ["INTEREST","GAMEDESIGN"],
    thumbnail: "/images/contents/airElement.png",
    heroVisual: "/images/contents/airElement.png",
    heroSlides: [
      { type: "image", src: "/images/contents/airElement.png", alt: "Mead of Poetry board game" }
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "Mead-of-Poetry is a mid-weight strategy board game built around Norse and Chinese mythology. Players take on the role of poets seeking the mythical mead of poetry, trading verses, gathering divine favor, and navigating a world where language is power."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "Most mythology-themed board games rely on combat or area control. I wanted to explore knowledge and language as core mechanical resources, while keeping the ruleset approachable for players new to the genre."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Designed a card-drafting system where each verse card carries both resource value and narrative text. Combinations of verses trigger \"rhetorical devices\" that produce asymmetric effects, encouraging players to read the cards literally and strategically at the same time."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "System Layers\\n\\nCore Loop: Draft verse cards → Build meter → Invoke device\\nResource Model: Inspiration, Memory, Favor as triangular economy\\nWin Condition: First to compose three completed stanzas\\nPlayer Count: 2–4, asymmetric poet roles\\n\\nFlow: Setup → Draft Phase → Composition Phase → Invocation Phase → Scoring"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Balancing narrative flavor against rule clarity.\\n• Creating asymmetric roles that feel distinct without overwhelming new players.\\n• Testing remotely with board-game communities across time zones."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Completed a fully playable prototype with over 120 unique verse cards, conducted 30+ playtests, and received consistent feedback that the language-as-resource mechanic felt fresh."
      }
    ],
    related: [
      { type: "library", key: "codequeen" },
      { type: "library", key: "humankind" }
    ]
  },
  {
    id: "lib-11",
    slug: "codequeen",
    number: "07",
    title: "CODE:QUEEN 代号σ",
    subtitle: "A fantasy SRPG built around mythology-inspired worldbuilding and tactical systems.",
    summary: "CODE:QUEEN is a single-player fantasy SRPG currently in development. The game combines grid-based tactical combat with a narrative system where player choices reshape the mythology of the world.",
    date: "2025",
    year: 2025,
    type: "library",
    category: "Games",
    status: "published",
    role: "Indie Game Developer",
    duration: "Ongoing",
    stack: ["Unity","C#","Figma"],
    tags: ["INTEREST","GAMEDESIGN"],
    thumbnail: "/images/contents/vegvisir.jpg",
    heroVisual: "/images/contents/vegvisir.jpg",
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Overview",
        body: "CODE:QUEEN is a single-player fantasy SRPG currently in development. The game combines grid-based tactical combat with a narrative system where player choices reshape the mythology of the world."
      },
      {
        id: "problem",
        number: "02",
        title: "Problem",
        body: "Traditional SRPGs often separate story and combat into distinct modes. I wanted every tactical decision to also carry narrative weight, so the battlefield becomes a stage for character drama."
      },
      {
        id: "solution",
        number: "03",
        title: "Solution",
        body: "Built a \"Fate Weave\" system that links unit abilities to story threads. Using certain skills advances corresponding narrative arcs, unlocking alternate map states, reinforcements, and endings."
      },
      {
        id: "architecture",
        number: "04",
        title: "Architecture",
        body: "Engine Architecture\\n\\nCore: Unity ECS-lite turn scheduler\\nCombat: Grid action pipeline with prediction\\nNarrative: Fate Weave state graph\\nData: ScriptableObject-driven unit/ability database\\n\\nFlow: Turn Input → Action Validation → Simulation → Resolution → State Update"
      },
      {
        id: "challenges",
        number: "05",
        title: "Challenges",
        body: "• Designing a combat-narrative coupling that feels emergent rather than scripted.\\n• Maintaining deterministic simulation for save/load and replay debugging.\\n• Solo development pipeline across design, code, and UI."
      },
      {
        id: "outcome",
        number: "06",
        title: "Outcome",
        body: "Core battle system and turn scheduler are functional; narrative state graph prototype is in active iteration. Targeting a vertical slice demo."
      }
    ],
    related: [
      { type: "library", key: "mead-of-poetry" },
      { type: "library", key: "api-disruptor" }
    ]
  }
]

export function getLibraryEntryBySlug(slug: string): LibraryEntry | undefined {
  return libraryEntries.find((e) => e.slug === slug)
}

export function getAdjacentLibraryEntries(
  slug: string
): { prev: LibraryEntry | null; next: LibraryEntry | null } {
  const index = libraryEntries.findIndex((e) => e.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? libraryEntries[index - 1] : null,
    next: index < libraryEntries.length - 1 ? libraryEntries[index + 1] : null
  }
}

export function getLibraryEntriesByCategory(
  category: LibraryCategory
): LibraryEntry[] {
  return libraryEntries.filter((e) => e.category === category)
}

export function getLibraryEntriesByStatus(
  status: LibraryStatus
): LibraryEntry[] {
  return libraryEntries.filter((e) => e.status === status)
}
