import { ExperienceItem, ExperienceProfile } from './types'

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

export const experienceProfiles: ExperienceProfile[] = [
  {
    id: 'fullstack',
    label: 'FULLSTACK',
    items: [
      {
        year: '2022.09 — NOW',
        company: '中科南京信息高铁研究院',
        position: '前端开发工程师',
        description: ''
      },
      {
        year: '2024.10 — NOW',
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
