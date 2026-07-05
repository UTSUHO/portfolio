export type ProjectTag = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const PROJECT_TAG_MAP = [
  { index: 0 as ProjectTag, label: 'work', icon: 'briefcase' },
  { index: 1 as ProjectTag, label: 'interest', icon: 'heart' },
  { index: 2 as ProjectTag, label: 'ai', icon: 'bot' },
  { index: 3 as ProjectTag, label: 'gamedesign', icon: 'gamepad2' },
  { index: 4 as ProjectTag, label: 'frontend', icon: 'monitor' },
  { index: 5 as ProjectTag, label: 'fullstack', icon: 'layers' },
  { index: 6 as ProjectTag, label: 'design', icon: 'palette' },
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
    tags: [1],
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
    relatedIds: ['03', '11']
  },
  {
    id: '02',
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
    tags: [1],
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
    relatedIds: ['04', '07']
  },
  {
    id: '03',
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
    tags: [1],
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
    relatedIds: ['01', '04']
  },
  {
    id: '04',
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
    tags: [1, 3],
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
    relatedIds: ['03', '02']
  },
  {
    id: '05',
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
    tags: [1, 5],
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
    relatedIds: ['11', '03']
  },
  {
    id: '06',
    title: 'Isbahn 开发者平台',
    subtitle: 'Internal developer platform built in spare time to improve project delivery efficiency.',
    category: 'Dev Tool / Internal Platform',
    year: '2022',
    meta: {
      type: 'Developer Tool',
      role: '前端 RD',
      status: 'Delivered',
      date: '2022',
      duration: '3 Months',
      tech: 'Vue / Ant Design Vue / Vuetify'
    },
    visualType: 'wireframe',
    tags: [0, 4],
    overview: '与后端同事搭档，利用工作闲暇时间开发工具平台，独立负责前端架构设计、开发与用户体验设计，支持动态配置数据源并集成后端代码生成器与 Swagger 文档库。',
    problem: '多项目环境下配置、路由与文档分散，开发效率受限于后端参与度。',
    solution: '构建可动态配置数据源的前端平台，解耦动态路由表对后端的依赖，集成代码生成器与 Swagger 文档，提升开发效率。',
    architecture: {
      title: 'Platform Layers',
      blocks: [
        { label: 'Frontend', value: 'Vue + Ant Design Vue + Vuetify' },
        { label: 'Config', value: 'Dynamic data source and route configuration' },
        { label: 'Integration', value: 'Code generator + Swagger docs' },
        { label: 'Delivery', value: 'Internal deployment and iteration' }
      ],
      flow: ['Config', 'Route', 'Generate', 'Preview']
    },
    techStack: ['Vue 2', 'Ant Design Vue', 'Vuetify', 'Swagger'],
    challenges: [
      '平衡业余时间投入与平台可用性。',
      '动态路由与权限配置需要兼顾灵活性与安全性。',
      '多 UI 库混用需要统一视觉与交互规范。'
    ],
    outcome: '平台在南研院内部使用，提升了多项目环境下的配置与开发效率。',
    relatedIds: ['08']
  },
  {
    id: '07',
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
    tags: [1, 3],
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
    relatedIds: ['11', '04']
  },
  {
    id: '08',
    title: '小易云桌面（云桌面客户端）',
    subtitle: 'Cloud desktop client based on GTK3 for virtualization scenarios.',
    category: 'Desktop Client / Virtualization',
    year: '2023',
    meta: {
      type: 'Desktop Client',
      role: '客户端开发 / 工程实现',
      status: 'Delivered',
      date: '2023',
      duration: '6 Months',
      tech: 'GTK3 / Cross-compilation / CSS'
    },
    visualType: 'voxel',
    tags: [0, 5],
    overview: '参与小易云桌面客户端的工程实现，基于 GTK3 进行桌面客户端界面开发，完成核心交互界面与基础窗口管理功能，并在 OSX/Linux 环境下交叉编译 Windows 产物。',
    problem: '云桌面客户端需要跨平台运行，且在不同 Linux 发行版中存在兼容性问题，GTK3 界面开发经验稀缺。',
    solution: '基于 GTK3 实现核心 UI 组件与状态展示逻辑，建立交叉编译流程，处理不同发行版环境差异，配合整体系统方案评估功能边界。',
    architecture: {
      title: 'Client Architecture',
      blocks: [
        { label: 'UI', value: 'GTK3 widgets + custom CSS' },
        { label: 'Build', value: 'Cross-compilation for Windows from OSX/Linux' },
        { label: 'State', value: 'Session and connection status management' },
        { label: 'Integration', value: 'Virtual desktop protocol adapter' }
      ],
      flow: ['UI Implementation', 'Cross Compile', 'Compatibility Test', 'Release']
    },
    techStack: ['GTK3', 'C', 'CSS', 'Cross-compilation toolchain'],
    challenges: [
      'GTK3 在不同平台与发行版中的渲染差异。',
      '交叉编译 Windows 产物时的依赖与链接问题。',
      '桌面客户端交互逻辑与 Web 前端思维差异较大。'
    ],
    outcome: '完成客户端核心界面与交叉编译流程，支撑产品形态验证与交付。',
    relatedIds: ['10', '06']
  },
  {
    id: '09',
    title: '某国家级应急信息报送系统',
    subtitle: 'National emergency information reporting system stabilization and ongoing development.',
    category: 'Government / Emergency / Frontend',
    year: '2024',
    meta: {
      type: 'Web System',
      role: '项目稳定化工程师',
      status: 'Maintained',
      date: '2023 — 2024',
      duration: '12 Months',
      tech: 'Vue.js / SVG / Flask'
    },
    visualType: 'wireframe',
    tags: [0, 5],
    overview: '在原项目开发人员在岗期间以关键技术支援身份介入，负责展示与渲染等核心模块实现；在主要开发人员离职后整体接手项目，系统性修复历史缺陷与稳定性问题。',
    problem: '遗留系统代码质量参差、缺陷集中爆发，且团队交接窗口短，需要快速恢复系统稳定性。',
    solution: '先补位关键模块保障连续性，再逐步重构展示与渲染层，建立问题定位与规范开发流程，指导研究生完成调试与迭代。',
    architecture: {
      title: 'System Layers',
      blocks: [
        { label: 'Frontend', value: 'Vue.js + SVG-based visualization' },
        { label: 'Backend', value: 'Flask API services' },
        { label: 'Rendering', value: 'Canvas + SVG hybrid charts' },
        { label: 'Stabilization', value: 'Incremental refactor + regression testing' }
      ],
      flow: ['Incident', 'Patch', 'Refactor', 'Review', 'Release']
    },
    techStack: ['Vue.js', 'SVG', 'Flask', 'Canvas'],
    challenges: [
      '在人员交接期快速理解遗留代码并修复关键路径缺陷。',
      '可视化渲染层性能与兼容性需要兼顾。',
      '培养研究生形成规范的工程开发与排错流程。'
    ],
    outcome: '系统稳定性显著提升，代码可维护性改善，后续迭代节奏恢复正常。',
    relatedIds: ['13', '10']
  },
  {
    id: '10',
    title: 'AI 训推平台（某国家级研究院所 / 上海临港实验室）',
    subtitle: 'AI training and inference platform based on the open-source “Tianshu” framework.',
    category: 'AI Infra / Platform / Frontend',
    year: '2024',
    meta: {
      type: 'AI Platform',
      role: '前端开发负责人',
      status: 'Delivered',
      date: '2024-NOW',
      duration: '18 Months',
      tech: 'JavaScript / Vue.js / Node.js / Vite'
    },
    visualType: 'network',
    tags: [0, 2, 5],
    overview: '以前端负责人身份主导基于开源“天枢”框架的 AI Infra / 训推平台建设，重构数据集标注模块，使用 Vite 重构 Webpack 构建体系，并完成向上海临港实验室业务系统的集成。',
    problem: '开源框架构建体系陈旧、图标体系不可扩展，且需要在甲方现有系统中完成集成，工期压缩。',
    solution: '使用 Vite 重构构建体系，设计自用 icon font 方案，抽象化数据集标注模块，独立完成前端适配与统一认证对接，将平台能力裁剪集成至甲方系统。',
    architecture: {
      title: 'Platform Architecture',
      blocks: [
        { label: 'Framework', value: 'Open-source “Tianshu” base' },
        { label: 'Build', value: 'Vite replacing Webpack + Babel-JSX' },
        { label: 'Annotation', value: 'Dataset-type driven abstraction' },
        { label: 'Integration', value: 'Custom auth + runtime embedding' }
      ],
      flow: ['Build Refactor', 'Module Refactor', 'Icon System', 'Integration', 'Deployment']
    },
    techStack: ['JavaScript', 'Vue.js', 'Node.js', 'Vite', 'Webpack'],
    challenges: [
      'Webpack → Vite 迁移涉及大量配置与依赖兼容性问题。',
      '开源框架图标体系不可扩展，需要重新设计 icon font 打包方案。',
      '甲方系统集成需要独立对接认证与联调，沟通成本高。'
    ],
    outcome: '开发服务器启动时间从 3 分钟降至 20 秒，平台按期交付并集成至甲方业务系统。',
    relatedIds: ['09', '08']
  },
  {
    id: '11',
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
    tags: [1, 3],
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
    relatedIds: ['07', '05']
  },
  {
    id: '12',
    title: '工热所 CAD 特征识别项目',
    subtitle: 'CAD-related target recognition AI model project, leading technical roadmap and methodology review.',
    category: 'AI / CAD / Research',
    year: '2025',
    meta: {
      type: 'Research Engineering',
      role: '项目技术负责人',
      status: 'Ongoing',
      date: '2025',
      duration: 'Ongoing',
      tech: 'CAD / Three.js / OCCT / Paper Reproduction'
    },
    visualType: 'network',
    tags: [0, 2, 5],
    overview: '作为技术负责人主导 CAD 相关目标识别 AI 模型项目，主导技术路线制定、核心论文解读与方法论梳理，围绕 STEP 文件解析与 CAD 目标识别能力开展关键技术调研与可行性论证，并统筹研究生推进技术方案落地。',
    problem: 'CAD 目标识别涉及复杂的几何语义抽取与跨格式数据解析，需要结合深度学习与传统 CAD 几何引擎能力，甲方需求与技术边界不够清晰。',
    solution: '制定分阶段技术路线，围绕 STEP 解析与 OCCT 几何引擎开展关键技术调研，指导研究生完成实验方案设计与实现，协同项目经理评估交付口径。',
    architecture: {
      title: 'Project Layers',
      blocks: [
        { label: 'Input', value: 'STEP / CAD geometry files' },
        { label: 'Parsing', value: 'OCCT-based geometry extraction' },
        { label: 'Recognition', value: 'Deep-learning target detection over geometric features' },
        { label: 'Validation', value: 'Paper experiment reproduction and iterative evaluation' }
      ],
      flow: ['Requirement Analysis', 'Paper Review', 'Prototype', 'Experiment', 'Evaluation']
    },
    techStack: ['Python', 'Open CASCADE', 'Three.js', 'PyTorch'],
    challenges: [
      '跨学科知识整合：CAD 几何、深度学习与论文方法论的交叉。',
      '需求与交付边界的不确定性需要持续的技术可行性论证。',
      '团队以研究生为主，缺乏工程经验，需要稳定的指导机制。'
    ],
    outcome: '完成关键技术调研与实验方案设计，论文复现实验持续推进，阶段性结果支撑合同谈判与后续开发。',
    relatedIds: ['13']
  },
  {
    id: '13',
    title: '某科研院所 · 超算云运维管理平台',
    subtitle: 'Mid-scale supercomputing cloud O&M platform built on an open-source scaffold.',
    category: 'Platform / HPC / Frontend',
    year: '2025',
    meta: {
      type: 'Web Platform',
      role: '前端技术负责人',
      status: 'Delivered',
      date: '2025',
      duration: '6 Months',
      tech: 'Vue3 / Vite / Project Planning'
    },
    visualType: 'network',
    tags: [0, 5],
    overview: '主导基于开源脚手架的中型超算云平台项目建设，负责前端整体技术方案与架构设计，在交付周期高度压缩的条件下同步指导 5 名无工程经验研究生开展工程化开发。',
    problem: '项目周期压缩、团队工程经验不足，需要在前端架构稳定的前提下快速推进交付，并建立可持续的技术指导机制。',
    solution: '基于 Vue3 + Vite 搭建前端架构，拆解需求并分配任务，持续进行代码 review 与工程化指导，保障按期交付。',
    architecture: {
      title: 'Frontend Architecture',
      blocks: [
        { label: 'Framework', value: 'Vue3 Composition API' },
        { label: 'Build', value: 'Vite with module federation' },
        { label: 'Visualization', value: 'ECharts + custom SVG dashboards' },
        { label: 'Delivery', value: 'CI/CD + on-site/remote team coordination' }
      ],
      flow: ['Requirement', 'Architecture', 'Implementation', 'Review', 'Deployment']
    },
    techStack: ['Vue 3', 'Vite', 'TypeScript', 'ECharts', 'SVG'],
    challenges: [
      '多项目并行导致资源争夺，需要合理排期与任务拆分。',
      '研究生团队工程能力不足，需要兼顾交付速度与人才培养。',
      '可视化模块复杂度较高，需要保证性能与可维护性。'
    ],
    outcome: '平台按期交付并持续演进，沉淀了技术指导与交付机制，后续项目复用该模式。',
    relatedIds: ['12', '09']
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
    id: 'fullstack',
    label: 'FULLSTACK',
    items: [
      {
        year: '2022.09 — NOW',
        company: '中科南京信息高铁研究院',
        position: '前端负责人 / 项目技术负责人',
        description:
          '负责东数西算南京算力网、AI Infra、社会计算等中大型平台的前端架构与技术选型；主导构建体系由 Webpack 重构至 Vite，开发服务器启动时间从 3 分钟降至 20 秒；优化关键业务模块，将页面加载时间从 21 秒降至 5 秒；指导无工程经验研究生开展规范化开发。'
      },
      {
        year: '2024.12 — NOW',
        company: '南京师范大学',
        position: '研究生就业与职业发展指导顾问',
        description:
          '面向计算机相关专业及跨专业就业需求的研究生，提供技术路径规划、工程能力提升与求职能力辅导。'
      },
      {
        year: '2025 — NOW',
        company: '流浪地球 3 剧组',
        position: '外部工程技术支持 / 技术顾问',
        description:
          '参与面向长篇叙事文本的多智能体知识图谱构建系统设计与实验方案实施；负责论文相关数据集调研与实验复现；协助搭建研发环境与基础工程设施，引入开源项目支撑系统工程化推进。'
      }
    ],
    skills: [
      { name: 'Vue2/3', level: 90 },
      { name: 'React / Next.js', level: 80 },
      { name: 'TypeScript', level: 85 },
      { name: 'Vite / Webpack', level: 80 },
      { name: 'Three.js / WebGL', level: 75 },
      { name: 'Node.js', level: 70 }
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
