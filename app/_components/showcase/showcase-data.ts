export interface ShowcaseProject {
  index: string
  title: string
  description: string
  tech: string[]
  category: string
  href: string
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    index: '01',
    title: 'AGENT DEVELOPMENT PLATFORM',
    description:
      '面向 Agent 与 Skill 开发的一体化前端工作台,通过 WebSocket 网关统一接入容器内异构 Agent 运行时。',
    tech: ['VUE 3', 'PINIA', 'WEBSOCKET', 'NOVNC'],
    category: 'AGENT',
    href: '/projects/14'
  },
  {
    index: '02',
    title: 'CAD ANNOTATION TOOL',
    description:
      '浏览器端 CAD 模型面片标注工具,加载 STEP 转换的 GLB 网格,支持面片拾取、特征分组与数据集导出。',
    tech: ['THREE.JS', 'TRESJS', 'TYPESCRIPT', 'GLB'],
    category: 'CAD',
    href: '/projects/11'
  },
  {
    index: '03',
    title: 'AI TRAINING PLATFORM',
    description:
      '基于开源框架的 AI 训推平台,Vite 重构构建体系并集成至甲方业务系统,启动时间 180s 降至 20s。',
    tech: ['VUE.JS', 'VITE', 'NODE.JS', 'AI INFRA'],
    category: 'AI INFRA',
    href: '/projects/10'
  }
]
