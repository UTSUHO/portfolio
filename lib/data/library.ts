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
    id: 'lib-01',
    slug: 'madarazakura',
    number: '01',
    title: '东方斑樱汉化 Madarazakura',
    subtitle:
      'Localization of a Touhou STG fan game, including UI, dialogue, and manual.',
    summary:
      'A fan localization project for a Touhou shooting-game title. Scope included in-game UI, story dialogue, spell card names, and the instruction manual.',
    date: '2019',
    year: 2019,
    type: 'library',
    category: 'Essays',
    status: 'published',
    role: 'Translator / Coordinator',
    duration: '8 Months',
    stack: ['Aegisub', 'Git', 'Python'],
    tags: ['INTEREST'],
    thumbnail: '/images/works/TH-ikaruga.jpeg',
    heroVisual: '/images/works/TH-ikaruga.jpeg',
    heroSlides: [
      {
        type: 'image',
        src: '/images/works/TH-ikaruga.jpeg',
        alt: 'Madarazakura title screen'
      }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'A fan localization project for a Touhou shooting-game title. Scope included in-game UI, story dialogue, spell card names, and the instruction manual.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: 'STG games combine fast-paced UI text with dense mythological references. Localization must be accurate under pressure and consistent across multiple file formats.'
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Built a small Python pipeline to extract, diff, and re-inject text assets. Established a shared glossary for spell names and character terminology to keep translations consistent.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The localization pipeline has four stages and a clear quality-control flow.',
        bullets: [
          'Extract: Python script parses game assets.',
          'Translate: Shared glossary + translator notes.',
          'Inject: Script rebuilds game text files.',
          'Test: In-game screenshot diff.'
        ],
        diagram:
          'Flow: Asset Dump → Text Extraction → Translation → Injection → In-Game QC'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three coordination and format challenges shaped the project.',
        bullets: [
          'Working with undocumented proprietary file formats.',
          'Keeping UI text concise enough to fit original layout bounds.',
          'Coordinating translators across different time zones.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Released a complete Chinese localization patch. The glossary and pipeline were reused for later fan translation projects.'
      }
    ],
    related: [
      { type: 'library', key: 'touhou-m1-comedy-series' },
      { type: 'library', key: 'codequeen' }
    ]
  },
  {
    id: 'lib-02',
    slug: '1984-dust-jacket-design',
    number: '02',
    title: '"1984" Dust Jacket Design',
    subtitle: "A typographic dust jacket redesign for George Orwell's 1984.",
    summary:
      'A dust jacket redesign that treats surveillance and language control as visual systems rather than imagery. The final piece uses constrained typography and repeated structural units.',
    date: '2020',
    year: 2020,
    type: 'library',
    category: 'Case Study',
    status: 'published',
    role: 'Designer',
    duration: '1 Month',
    stack: ['Illustrator', 'InDesign'],
    tags: ['INTEREST'],
    thumbnail: '/images/works/Fengyi-Chen-Dust-Jacket.png',
    heroVisual: '/images/works/Fengyi-Chen-Dust-Jacket.png',
    heroSlides: [
      {
        type: 'image',
        src: '/images/works/Fengyi-Chen-Dust-Jacket.png',
        alt: '1984 dust jacket design'
      }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'A dust jacket redesign that treats surveillance and language control as visual systems rather than imagery. The final piece uses constrained typography and repeated structural units.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: "Many 1984 covers rely on predictable eye or surveillance imagery. I wanted to communicate the book's themes through layout and typographic restraint."
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Created a modular grid system where each cover panel is composed of identical typographic cells. The spine interrupts the grid with a single red accent line, representing the fracture of language.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The dust jacket is built on a constrained design system with a single accent fracture.',
        bullets: [
          'Grid: 6×12 modular cell system.',
          'Type: Monospaced primary, grotesque secondary.',
          'Color: Black, white, single red accent.',
          'Materials: Matte stock with spot varnish.'
        ],
        diagram: 'Flow: Concept → Grid Study → Type Lockup → Material Mockup'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three constraints guided the visual direction.',
        bullets: [
          'Conveying oppression without relying on dark imagery.',
          'Maintaining readability while using extreme typographic repetition.',
          'Producing a physical mockup with limited print resources.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Completed a printed mockup and digital spreads. Selected for a student exhibition on book design.'
      }
    ],
    related: [
      { type: 'library', key: 'humankind' },
      { type: 'library', key: 'mead-of-poetry' }
    ]
  },
  {
    id: 'lib-03',
    slug: 'touhou-m1-comedy-series',
    number: '03',
    title: 'Touhou-M1-comedy-series',
    subtitle:
      'Subtitle translation and localization of a long-running comedy series.',
    summary:
      'A multi-episode subtitle translation project for the Touhou M-1 Grand Prix comedy series, balancing faithful Japanese-to-Chinese translation with comedic timing.',
    date: '2021',
    year: 2021,
    type: 'library',
    category: 'Essays',
    status: 'published',
    role: 'Translator / Editor',
    duration: '12 Months',
    stack: ['Aegisub', 'Git'],
    tags: ['INTEREST'],
    thumbnail: '/images/works/TH-M1.png',
    heroVisual: '/images/works/TH-M1.png',
    heroSlides: [
      {
        type: 'image',
        src: '/images/works/TH-M1.png',
        alt: 'Touhou M-1 comedy series'
      }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'A multi-episode subtitle translation project for the Touhou M-1 Grand Prix comedy series, balancing faithful Japanese-to-Chinese translation with comedic timing.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: 'Comedy translation requires preserving punchlines across language boundaries. Literal translation often kills timing, while overly free adaptation loses character voice.'
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Developed a translation workflow that separates dialogue translation, timing adjustment, and punchline review into distinct passes, allowing each to be optimized independently.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The subtitle workflow has four distinct passes before release.',
        bullets: [
          'Translate: First-pass dialogue with notes.',
          'Time: Frame-accurate subtitle sync.',
          'Review: Punchline and cultural note pass.',
          'Release: Softsub distribution.'
        ],
        diagram: 'Flow: Raw → Translation → Timing → QC → Release'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three translation-specific tensions had to be balanced.',
        bullets: [
          'Maintaining comedic rhythm across sentence structures that differ between Japanese and Chinese.',
          'Managing a multi-episode release schedule with a small team.',
          'Handling cultural references that require translator notes without breaking immersion.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Released complete subtitles for the target series, with positive community feedback on timing accuracy and joke preservation.'
      }
    ],
    related: [
      { type: 'library', key: 'madarazakura' },
      { type: 'library', key: 'humankind' }
    ]
  },
  {
    id: 'lib-04',
    slug: 'humankind',
    number: '04',
    title: 'Humankind 测评与分析',
    subtitle: 'A long-form essay analyzing the 4X strategy game Humankind.',
    summary:
      'A 30-page critical analysis of Humankind, examining how the game reframes civilization progression through cultural hybridity rather than linear tech trees.',
    date: '2021',
    year: 2021,
    type: 'library',
    category: 'Games',
    status: 'published',
    role: 'Writer',
    duration: '2 Months',
    stack: ['PDF', 'Markdown'],
    tags: ['INTEREST', 'GAMEDESIGN'],
    thumbnail: '/images/contents/humankind.jpg',
    heroVisual: '/images/contents/humankind.jpg',
    heroSlides: [
      {
        type: 'image',
        src: '/images/contents/humankind.jpg',
        alt: 'Humankind analysis'
      }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'A 30-page critical analysis of Humankind, examining how the game reframes civilization progression through cultural hybridity rather than linear tech trees.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: "Most game reviews focus on mechanics in isolation. I wanted to analyze how Humankind's design expresses a specific philosophical idea about history and identity."
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Structured the essay around three lenses—mechanics, narrative systems, and historical representation—showing how they reinforce each other.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The essay is structured around three analytical lenses that reinforce each other.',
        bullets: [
          'Lens 1: Mechanics: fame as victory vector.',
          'Lens 2: Narrative: emergent civ stories.',
          'Lens 3: Representation: hybridity vs. linearity.'
        ],
        diagram:
          'Flow: Introduction → Mechanics → Narrative → Representation → Conclusion'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three writing and production challenges shaped the final piece.',
        bullets: [
          'Avoiding shallow comparisons to Civilization.',
          'Balancing academic tone with accessibility for general readers.',
          'Producing a PDF layout that matched the analytical tone.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Published as a downloadable PDF. Used as a reference in several Chinese-language game analysis discussions.'
      }
    ],
    related: [
      { type: 'library', key: 'touhou-m1-comedy-series' },
      { type: 'library', key: '1984-dust-jacket-design' }
    ]
  },
  {
    id: 'lib-05',
    slug: 'api-disruptor',
    number: '05',
    title: 'API-Disruptor',
    subtitle:
      'A developer tool for stress-testing REST APIs with configurable disruption patterns.',
    summary:
      'API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure.',
    date: '2022',
    year: 2022,
    type: 'library',
    category: 'Research Notes',
    status: 'published',
    role: 'Solo Engineer',
    duration: '3 Months',
    stack: ['TypeScript', 'Node.js', 'React'],
    tags: ['INTEREST', 'FULLSTACK'],
    thumbnail: '/images/works/Api-Disruptor.png',
    heroVisual: '/images/works/Api-Disruptor.png',
    heroSlides: [
      {
        type: 'image',
        src: '/images/works/Api-Disruptor.png',
        alt: 'API-Disruptor tool'
      }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'API-Disruptor is a lightweight developer tool that lets engineers inject latency, errors, and jitter into local REST API calls to observe how clients behave under failure.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: 'Testing distributed failure modes locally usually requires heavy infrastructure. Small teams need a fast, configurable way to simulate bad network behavior without deploying a chaos platform.'
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Created a local proxy server with a declarative rule engine. Rules define match conditions, disruption types, and probability curves. A small React dashboard visualizes live request outcomes.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The tool is composed of a local proxy, rule engine, dashboard, and config layer.',
        bullets: [
          'Proxy: Node.js HTTP interceptor.',
          'Engine: Rule matcher + disruption scheduler.',
          'Dashboard: React + real-time event stream.',
          'Config: YAML/JSON rule files.'
        ],
        diagram:
          'Flow: Capture Request → Match Rules → Apply Disruption → Forward → Log Outcome'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three design constraints kept the tool usable and safe.',
        bullets: [
          'Keeping latency injection deterministic enough for reproducible tests.',
          'Designing a rule syntax that is expressive but not overwhelming.',
          'Avoiding side effects on non-target requests.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Functional prototype capable of injecting latency, HTTP errors, and timeout failures. Used internally to harden client retry logic.'
      }
    ],
    related: [
      { type: 'project', key: '11' },
      { type: 'library', key: 'codequeen' },
      { type: 'library', key: 'touhou-m1-comedy-series' }
    ]
  },
  {
    id: 'lib-07',
    slug: 'mead-of-poetry',
    number: '06',
    title: 'Mead-of-Poetry 诗之蜜酒',
    subtitle:
      'A mythology-inspired mid-weight board game about poetry, gods, and transformation.',
    summary:
      'Mead-of-Poetry is a mid-weight strategy board game built around Norse and Chinese mythology. Players take on the role of poets seeking the mythical mead of poetry, trading verses, gathering divine favor, and navigating a world where language is power.',
    date: '2023',
    year: 2023,
    type: 'library',
    category: 'Games',
    status: 'published',
    role: 'Game Designer',
    duration: '18 Months',
    stack: ['Paper Prototype', 'PlaytestKit'],
    tags: ['INTEREST', 'GAMEDESIGN'],
    thumbnail: '/images/contents/airElement.png',
    heroVisual: '/images/contents/airElement.png',
    heroSlides: [
      {
        type: 'image',
        src: '/images/contents/airElement.png',
        alt: 'Mead of Poetry board game'
      }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'Mead-of-Poetry is a mid-weight strategy board game built around Norse and Chinese mythology. Players take on the role of poets seeking the mythical mead of poetry, trading verses, gathering divine favor, and navigating a world where language is power.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: 'Most mythology-themed board games rely on combat or area control. I wanted to explore knowledge and language as core mechanical resources, while keeping the ruleset approachable for players new to the genre.'
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Designed a card-drafting system where each verse card carries both resource value and narrative text. Combinations of verses trigger "rhetorical devices" that produce asymmetric effects, encouraging players to read the cards literally and strategically at the same time.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The board game is built around a triangular resource economy and asymmetric poet roles.',
        bullets: [
          'Core Loop: Draft verse cards → Build meter → Invoke device.',
          'Resource Model: Inspiration, Memory, Favor as triangular economy.',
          'Win Condition: First to compose three completed stanzas.',
          'Player Count: 2–4, asymmetric poet roles.'
        ],
        diagram:
          'Flow: Setup → Draft Phase → Composition Phase → Invocation Phase → Scoring'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three design challenges kept the game approachable and flavorful.',
        bullets: [
          'Balancing narrative flavor against rule clarity.',
          'Creating asymmetric roles that feel distinct without overwhelming new players.',
          'Testing remotely with board-game communities across time zones.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Completed a fully playable prototype with over 120 unique verse cards, conducted 30+ playtests, and received consistent feedback that the language-as-resource mechanic felt fresh.'
      }
    ],
    related: [
      { type: 'library', key: 'codequeen' },
      { type: 'library', key: 'humankind' }
    ]
  },
  {
    id: 'lib-11',
    slug: 'codequeen',
    number: '07',
    title: 'CODE:QUEEN 代号σ',
    subtitle:
      'A fantasy SRPG built around mythology-inspired worldbuilding and tactical systems.',
    summary:
      'CODE:QUEEN is a single-player fantasy SRPG currently in development. The game combines grid-based tactical combat with a narrative system where player choices reshape the mythology of the world.',
    date: '2025',
    year: 2025,
    type: 'library',
    category: 'Games',
    status: 'published',
    role: 'Indie Game Developer',
    duration: 'Ongoing',
    stack: ['Unity', 'C#', 'Figma'],
    tags: ['INTEREST', 'GAMEDESIGN'],
    thumbnail: '/images/contents/vegvisir.jpg',
    heroVisual: '/images/contents/vegvisir.jpg',
    sections: [
      {
        id: 'overview',
        number: '01',
        title: 'Overview',
        body: 'CODE:QUEEN is a single-player fantasy SRPG currently in development. The game combines grid-based tactical combat with a narrative system where player choices reshape the mythology of the world.'
      },
      {
        id: 'scenario',
        number: '02',
        title: 'Scenario',
        body: 'Traditional SRPGs often separate story and combat into distinct modes. I wanted every tactical decision to also carry narrative weight, so the battlefield becomes a stage for character drama.'
      },
      {
        id: 'solution',
        number: '03',
        title: 'Solution',
        body: 'Built a "Fate Weave" system that links unit abilities to story threads. Using certain skills advances corresponding narrative arcs, unlocking alternate map states, reinforcements, and endings.'
      },
      {
        id: 'architecture',
        number: '04',
        title: 'Architecture',
        body: 'The game engine is layered into core scheduling, combat, narrative, and data systems.',
        bullets: [
          'Core: Unity ECS-lite turn scheduler.',
          'Combat: Grid action pipeline with prediction.',
          'Narrative: Fate Weave state graph.',
          'Data: ScriptableObject-driven unit/ability database.'
        ],
        diagram:
          'Flow: Turn Input → Action Validation → Simulation → Resolution → State Update'
      },
      {
        id: 'challenges',
        number: '05',
        title: 'Challenges',
        body: 'Three development tensions shaped the architecture.',
        bullets: [
          'Designing a combat-narrative coupling that feels emergent rather than scripted.',
          'Maintaining deterministic simulation for save/load and replay debugging.',
          'Solo development pipeline across design, code, and UI.'
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: 'Outcome',
        body: 'Core battle system and turn scheduler are functional; narrative state graph prototype is in active iteration. Targeting a vertical slice demo.'
      }
    ],
    related: [
      { type: 'library', key: 'mead-of-poetry' },
      { type: 'library', key: 'api-disruptor' }
    ]
  },
  {
    id: 'lib-12',
    slug: 'pix',
    number: '08',
    title: 'Pix',
    subtitle: '面向 Pi Coding Agent 的 WSL2 运行编排与容器沙箱工具',
    summary:
      'Pix 是一个通过 NPM 分发的 Windows CLI 工具，用于将 Pi Coding Agent 的运行环境从宿主系统中解耦，并统一编排 Windows、WSL2 与 Docker Desktop 之间的执行链路。',
    date: '2026',
    year: 2026,
    type: 'tool',
    category: 'Tools',
    status: 'in-progress',
    role: 'Solo Engineer',
    duration: 'Ongoing',
    link: 'https://github.com/UTSUHO/pix',
    stack: [
      'Node.js',
      'WSL2',
      'Docker Desktop',
      'Mutagen',
      'rsync',
      'Pi Coding Agent'
    ],
    tags: ['INTEREST', 'FULLSTACK', 'INFRA'],
    thumbnail: '/images/contents/airElement.png',
    heroVisual: '/images/contents/airElement.png',
    heroSlides: [
      // {
      //   type: 'mermaid',
      //   definition:
      //     'flowchart TB\n  CLI[Windows / WSL CLI Entry] --> BOOT[WSL Bootstrap]\n  BOOT --> PROJ[Workspace Projection]\n  PROJ --> POL[Policy Resolution]\n  POL --> RUN[Runtime Injection]\n  RUN --> EXEC[Controlled Execution]\n  EXEC --> SYNC[Sync Cleanup]',
      //   caption: 'Pix 执行流程'
      // },
      // {
      //   type: 'mermaid',
      //   definition:
      //     'flowchart TB\n  NTFS[Windows NTFS Source] <-->|Mutagen / rsync| EXT4[WSL ext4 Replica]',
      //   caption: '工作区同步'
      // },
      // {
      //   type: 'mermaid',
      //   definition:
      //     'flowchart TB\n  CLI[Host Bridge] --> WS[Workspace Controller]\n  WS --> RUN[Runtime Manager]\n  RUN --> ROUT[Execution Router]\n  ROUT --> SANDBOX[Sandbox Adapter]\n  ROUT --> DIAG[Diagnostic Layer]',
      //   caption: '模块架构'
      // }
    ],
    sections: [
      {
        id: 'overview',
        number: '01',
        title: '项目概述',
        label: 'CONTEXT',
        variant: 'prose',
        body: 'Pix 是一个面向 Pi Coding Agent 的 Windows CLI 工具，通过 NPM 分发。它将 Agent 的运行环境从 Windows 宿主系统中解耦，统一编排 Windows、WSL2 与 Docker Desktop 之间的执行链路。\n\n项目核心目标是为具备代码执行能力的 Agent 提供一条标准化执行路径：保留 Windows 下的低成本调用入口，将项目投影到 WSL ext4 高性能工作区，再根据项目策略选择 WSL Direct 或 Docker Sandbox 运行。整个流程通过统一的 Canonical Pi Runtime、Mutagen/rsync/cp 多级同步以及分层配置模型，使运行性能、环境一致性与隔离强度可以分别配置。'
      },
      {
        id: 'scenario',
        number: '02',
        title: '场景分析',
        label: 'SCENARIO',
        variant: 'prose',
        body: 'Pi Coding Agent 通常需要读取项目文件、执行命令、安装依赖并修改代码。直接在 Windows 宿主环境运行 Agent，会使 Agent 获得较大的本地文件与进程访问范围；直接将 NTFS 项目目录挂载进 Docker，则会引入明显的小文件读写延迟。此外，宿主 Pi、WSL Pi 与容器 Pi 的 Runtime 状态相互独立，导致执行环境切换时配置和会话不连续。'
      },
      {
        id: 'solution',
        number: '03',
        title: '解决方案',
        label: 'RESPONSE',
        variant: 'pillars',
        body: 'Pix 将执行过程拆分为三个相互独立的部分：保留 Windows 下的低成本调用体验作为宿主入口；将项目投影到 WSL ext4 文件系统以获得高性能工作区；根据项目策略选择 WSL 直接执行或 Docker 容器执行。通过统一的 Canonical Pi Runtime、Mutagen 持续同步、rsync/cp 降级同步以及分层配置模型，实现运行性能、环境一致性与隔离强度的分别配置。',
        items: [
          {
            number: '01',
            code: 'HOST ENTRY',
            title: '宿主入口',
            body: '保留 Windows 下的低成本调用入口。'
          },
          {
            number: '02',
            code: 'WSL WORKSPACE',
            title: '高性能工作区',
            body: '将项目投影到 WSL ext4 文件系统。'
          },
          {
            number: '03',
            code: 'POLICY ROUTING',
            title: '执行策略路由',
            body: '根据配置选择 Direct 或 Sandbox。'
          }
        ]
      },
      {
        id: 'architecture',
        number: '04',
        title: '架构',
        label: 'SYSTEM',
        variant: 'architecture',
        body: 'Pix 由六个核心模块组成，整体执行流程从 CLI Entry 贯穿到 Sync Cleanup。',
        modules: [
          {
            number: '01',
            title: 'Host Bridge',
            body: '负责 Windows 与 WSL2 之间的环境检测、路径转换和进程重启。'
          },
          {
            number: '02',
            title: 'Workspace Controller',
            body: '识别 NTFS 工作区，生成稳定的 ext4 投影路径，管理 Mutagen 同步会话。'
          },
          {
            number: '03',
            title: 'Runtime Manager',
            body: '维护 Direct 与 Sandbox 模式共享的 Canonical Pi Runtime。'
          },
          {
            number: '04',
            title: 'Execution Router',
            body: '根据 CLI 参数、用户配置和项目 `.pix.json` 选择执行策略。'
          },
          {
            number: '05',
            title: 'Sandbox Adapter',
            body: '将工作区、Runtime、网络、权限和环境变量转换为 Docker 启动参数。'
          },
          {
            number: '06',
            title: 'Diagnostic Layer',
            body: '提供 `pix status`、`pix doctor`、`pix migrate` 等跨环境诊断命令。'
          }
        ],
        flow: {
          nodes: [
            'CLI Entry',
            'WSL Bootstrap',
            'Workspace Projection',
            'Policy Resolution',
            'Controlled Execution',
            'Sync Cleanup'
          ],
          branches: ['Direct / WSL', 'Sandbox / Docker'],
          sharedRuntime: 'Canonical Pi Runtime'
        }
      },
      {
        id: 'challenges',
        number: '05',
        title: '工程挑战',
        label: 'CONSTRAINTS',
        variant: 'constraints',
        body: '跨平台运行环境带来了四类主要工程挑战。',
        items: [
          {
            number: '01',
            code: 'FILESYSTEM BRIDGE',
            title: '跨文件系统语义',
            body: '桥接 Windows、WSL2 与 Docker 路径及权限语义。',
            diagram:
              'C:\\project\n    ↓ PATH MAP\n~/.pix/workspaces/project\n    ↓ MOUNT\n/workspace'
          },
          {
            number: '02',
            code: 'RUNTIME CONTINUITY',
            title: 'Runtime 连续性',
            body: '容器销毁和模式切换时保持配置、状态与会话连续。',
            diagram:
              'CANONICAL PI RUNTIME\n       ├── WSL DIRECT\n       └── DOCKER SANDBOX'
          },
          {
            number: '03',
            code: 'SYNC FALLBACK',
            title: '同步降级策略',
            body: 'Mutagen 不可用时依次降级到 rsync 与 cp。',
            diagram:
              'MUTAGEN / PRIMARY\n       ↓ unavailable\nRSYNC / DEGRADED\n       ↓ unavailable\nCP / LAST RESORT'
          },
          {
            number: '04',
            code: 'CONFIG BOUNDARY',
            title: '配置安全注入',
            body: '通过项目级 `.pix.json` 注入 API Key、代理和网络策略。',
            diagram:
              '.pix.json\n    ↓ POLICY FILTER\nAPI KEY / PROXY / NETWORK / MODE\n    ↓\nEXECUTION ENVIRONMENT'
          }
        ]
      },
      {
        id: 'outcome',
        number: '06',
        title: '项目价值',
        label: 'OUTCOME',
        variant: 'outcome',
        outcome: {
          slogan: [
            'PIX IS NOT A CONTAINER LAUNCHER.',
            'IT IS A LIGHTWEIGHT AGENT HARNESS.'
          ],
          summary:
            '为 Coding Agent 在 Windows、WSL2 与 Docker 之间建立统一、可控且连续的执行边界。',
          intent: [
            {
              code: 'BOUNDARY',
              body: '限制 Agent 可接触的宿主文件、进程与网络范围。'
            },
            {
              code: 'PERFORMANCE',
              body: '避免在 NTFS 直接挂载目录中进行高频小文件读写。'
            },
            {
              code: 'CONTINUITY',
              body: '在 Direct 与 Sandbox 模式之间保持 Runtime 连续。'
            }
          ],
          capabilities: [
            {
              number: '01',
              code: 'UNIFIED ENTRY',
              body: '当前目录执行 pix 即可启动。'
            },
            {
              number: '02',
              code: 'FAST WORKSPACE',
              body: '自动建立 WSL ext4 高性能工作区。'
            },
            {
              number: '03',
              code: 'SELECTABLE ISOLATION',
              body: '可选择 WSL Direct 或 Docker Sandbox。'
            },
            {
              number: '04',
              code: 'CONTINUOUS RUNTIME',
              body: '配置、状态和会话跨执行模式保持连续。'
            }
          ],
          integration: {
            sources: ['Terminal', 'IDE', 'Coding Agent', 'npm script', 'CI'],
            entry: 'npx pix / pix',
            harness: ['Workspace', 'Policy', 'Runtime'],
            targets: ['WSL Direct', 'Docker Sandbox'],
            outputs: ['File changes', 'Logs', 'Exit status'],
            destination: 'Existing Project Workflow'
          }
        }
      }
    ],
    related: [{ type: 'library', key: 'api-disruptor' }]
  }
]

export function getLibraryEntryBySlug(slug: string): LibraryEntry | undefined {
  return libraryEntries.find(e => e.slug === slug)
}

export function getAdjacentLibraryEntries(slug: string): {
  prev: LibraryEntry | null
  next: LibraryEntry | null
} {
  const index = libraryEntries.findIndex(e => e.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? libraryEntries[index - 1] : null,
    next: index < libraryEntries.length - 1 ? libraryEntries[index + 1] : null
  }
}

export function getLibraryEntriesByCategory(
  category: LibraryCategory
): LibraryEntry[] {
  return libraryEntries.filter(e => e.category === category)
}

export function getLibraryEntriesByStatus(
  status: LibraryStatus
): LibraryEntry[] {
  return libraryEntries.filter(e => e.status === status)
}
