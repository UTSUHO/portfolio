import { Project } from './types'
export type { Project, ProjectTag } from './types'

export { PROJECT_TAG_MAP } from './types'

export const projects: Project[] = [
  {
    id: '06',
    title: 'Isbahn 开发者平台',
    subtitle:
      'Internal developer platform built in spare time to improve project delivery efficiency.',
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
    overview:
      '与后端同事搭档，利用工作闲暇时间开发工具平台，独立负责前端架构设计、开发与用户体验设计，支持动态配置数据源并集成后端代码生成器与 Swagger 文档库。',
    problem: '多项目环境下配置、路由与文档分散，开发效率受限于后端参与度。',
    solution:
      '构建可动态配置数据源的前端平台，解耦动态路由表对后端的依赖，集成代码生成器与 Swagger 文档，提升开发效率。',
    architecture: {
      title: 'Platform Layers',
      blocks: [
        { label: 'Frontend', value: 'Vue + Ant Design Vue + Vuetify' },
        {
          label: 'Config',
          value: 'Dynamic data source and route configuration'
        },
        { label: 'Integration', value: 'Code generator + Swagger docs' },
        { label: 'Delivery', value: 'Internal deployment and iteration' }
      ],
      flow: undefined
    },
    techStack: [
      { header: '', content: 'Vue 2' },
      { header: '', content: 'Ant Design Vue' },
      { header: '', content: 'Vuetify' },
      { header: '', content: 'Swagger' }
    ],
    challenges: [
      '平衡业余时间投入与平台可用性。',
      '动态路由与权限配置需要兼顾灵活性与安全性。',
      '多 UI 库混用需要统一视觉与交互规范。'
    ],
    outcome: '平台在南研院内部使用，提升了多项目环境下的配置与开发效率。',
    related: [{ type: 'project', key: '08' }]
  },
  {
    id: '08',
    title: '小易云桌面（云桌面客户端）',
    subtitle:
      'Cloud desktop client based on GTK3 for virtualization scenarios.',
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
    overview:
      '参与小易云桌面客户端的工程实现，基于 GTK3 进行桌面客户端界面开发，完成核心交互界面与基础窗口管理功能，并在 OSX/Linux 环境下交叉编译 Windows 产物。',
    problem:
      '云桌面客户端需要跨平台运行，且在不同 Linux 发行版中存在兼容性问题，GTK3 界面开发经验稀缺。',
    solution:
      '基于 GTK3 实现核心 UI 组件与状态展示逻辑，建立交叉编译流程，处理不同发行版环境差异，配合整体系统方案评估功能边界。',
    architecture: {
      title: 'Client Architecture',
      blocks: [
        { label: 'UI', value: 'GTK3 widgets + custom CSS' },
        {
          label: 'Build',
          value: 'Cross-compilation for Windows from OSX/Linux'
        },
        { label: 'State', value: 'Session and connection status management' },
        { label: 'Integration', value: 'Virtual desktop protocol adapter' }
      ],
      flow: undefined
    },
    techStack: [
      { header: '', content: 'GTK3' },
      { header: '', content: 'C' },
      { header: '', content: 'CSS' },
      { header: '', content: 'Cross-compilation toolchain' }
    ],
    challenges: [
      'GTK3 在不同平台与发行版中的渲染差异。',
      '交叉编译 Windows 产物时的依赖与链接问题。',
      '桌面客户端交互逻辑与 Web 前端思维差异较大。'
    ],
    outcome: '完成客户端核心界面与交叉编译流程，支撑产品形态验证与交付。',
    related: [
      { type: 'project', key: '10' },
      { type: 'project', key: '06' }
    ]
  },
  {
    id: '09',
    title: '某国家级应急信息报送系统',
    subtitle:
      'National emergency information reporting system stabilization and ongoing development.',
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
    overview:
      '在原项目开发人员在岗期间以关键技术支援身份介入，负责展示与渲染等核心模块实现；在主要开发人员离职后整体接手项目，系统性修复历史缺陷与稳定性问题。',
    problem:
      '遗留系统代码质量参差、缺陷集中爆发，且团队交接窗口短，需要快速恢复系统稳定性。',
    solution:
      '先补位关键模块保障连续性，再逐步重构展示与渲染层，建立问题定位与规范开发流程，指导研究生完成调试与迭代。',
    architecture: {
      title: 'System Layers',
      blocks: [
        { label: 'Frontend', value: 'Vue.js + SVG-based visualization' },
        { label: 'Backend', value: 'Flask API services' },
        { label: 'Rendering', value: 'Canvas + SVG hybrid charts' },
        {
          label: 'Stabilization',
          value: 'Incremental refactor + regression testing'
        }
      ],
      flow: undefined
    },
    techStack: [
      { header: '', content: 'Vue.js' },
      { header: '', content: 'SVG' },
      { header: '', content: 'Flask' },
      { header: '', content: 'Canvas' }
    ],
    challenges: [
      '在人员交接期快速理解遗留代码并修复关键路径缺陷。',
      '可视化渲染层性能与兼容性需要兼顾。',
      '培养研究生形成规范的工程开发与排错流程。'
    ],
    outcome: '系统稳定性显著提升，代码可维护性改善，后续迭代节奏恢复正常。',
    related: [
      { type: 'project', key: '13' },
      { type: 'project', key: '10' }
    ]
  },
  {
    id: '10',
    title: 'AI 训推平台（某国家级研究院所 / 上海临港实验室）',
    subtitle:
      'AI training and inference platform based on the open-source “Tianshu” framework.',
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
    overview:
      '以前端负责人身份主导基于开源“天枢”框架的 AI Infra / 训推平台建设，重构数据集标注模块，使用 Vite 重构 Webpack 构建体系，并完成向上海临港实验室业务系统的集成。',
    problem:
      '开源框架构建体系陈旧、图标体系不可扩展，且需要在甲方现有系统中完成集成，工期压缩。',
    solution:
      '使用 Vite 重构构建体系，设计自用 icon font 方案，抽象化数据集标注模块，独立完成前端适配与统一认证对接，将平台能力裁剪集成至甲方系统。',
    architecture: {
      title: 'Platform Architecture',
      blocks: [
        { label: 'Framework', value: 'Open-source “Tianshu” base' },
        { label: 'Build', value: 'Vite replacing Webpack + Babel-JSX' },
        { label: 'Annotation', value: 'Dataset-type driven abstraction' },
        { label: 'Integration', value: 'Custom auth + runtime embedding' }
      ],
      flow: undefined
    },
    techStack: [
      { header: '', content: 'JavaScript' },
      { header: '', content: 'Vue.js' },
      { header: '', content: 'Node.js' },
      { header: '', content: 'Vite' },
      { header: '', content: 'Webpack' }
    ],
    challenges: [
      'Webpack → Vite 迁移涉及大量配置与依赖兼容性问题。',
      '开源框架图标体系不可扩展，需要重新设计 icon font 打包方案。',
      '甲方系统集成需要独立对接认证与联调，沟通成本高。'
    ],
    outcome:
      '开发服务器启动时间从 3 分钟降至 20 秒，平台按期交付并集成至甲方业务系统。',
    related: [
      { type: 'project', key: '09' },
      { type: 'project', key: '08' }
    ]
  },
  {
    id: '11',
    title: 'CAD 模型面片标注工具',
    subtitle: '工热所 CAD 特征识别项目的前端展示与面片标注子项目',
    category: 'AI / CAD / Frontend',
    year: '2025',
    meta: {
      type: 'Frontend Sub-project',
      role: 'Frontend Engineer',
      status: 'Completed',
      date: '2025',
      duration: '2 Months',
      tech: 'Vue 3 / TresJS / Three.js / TypeScript / Pinia / Tailwind CSS'
    },
    visualType: 'shader',
    tags: [0, 2, 4, 5],
    overview:
      '作为「工热所 CAD 特征识别项目」的前端展示子项目，独立开发了这款 CAD 模型在线标注工具。用户可在浏览器中加载由 STEP/STP 经后端转换得到的 GLB 模型，点选或拖拽面片/网格，将其归入可命名的特征组，最终导出结构化标注数据，为父项目的算法验证与数据集构建提供可视化交互能力。',
    problem:
      'CAD 特征识别项目需要反复验证几何语义抽取与目标识别效果，但算法侧缺少一个轻量、可交互的可视化前端；面片级标注依赖桌面软件或离线脚本，流程重、难以与 Web 化的数据采编流程集成。',
    solution:
      '为父项目构建基于 Vue 3 + TresJS + Three.js 的单页应用，作为其前端展示与数据采集入口。通过 GLTFLoader 加载标准化 GLB 网格，结合自定义 ShaderMaterial 实现风格化渲染与边缘高亮；使用 Pinia 分层管理模型资源、选择状态、标注分组、交互模式与渲染管线，支持轨道相机、面片拾取、分组命名、撤销重做与 JSON/JSONP 导出。',
    architecture: {
      title: 'Tool Architecture',
      blocks: [
        { label: 'Input', value: 'STEP/STP 文件上传 → 后端解析为 GLB' },
        { label: 'Viewer', value: 'TresJS + Three.js 轨道相机与着色器渲染' },
        { label: 'Annotator', value: '面片/网格拾取、分组、命名与撤销' },
        { label: 'Exporter', value: 'JSON/JSONP 结构化标注数据输出' }
      ],
      flow: 'flowchart TD\n  STEP["STEP/STP File"] --> Backend["Backend Parser"]\n  Backend --> GLB["GLB Model"]\n  GLB --> Loader["GLTFLoader"]\n  Loader --> Viewer["TresJS Viewer"]\n  Viewer --> Pick["Face / Mesh Picking"]\n  Pick --> Group["Feature Grouping"]\n  Group --> Export["JSON / JSONP Export"]\n'
    },
    techStack: [
      { header: 'Frontend Framework', content: 'Vue 3 + Vite + TypeScript' },
      {
        header: '3D Rendering',
        content: 'TresJS + Three.js + custom ShaderMaterial'
      },
      { header: 'State Management', content: 'Pinia 模块化状态管理' },
      { header: 'UI Styling', content: 'Tailwind CSS + shadcn-vue' },
      { header: 'File Pipeline', content: 'STEP/STP → GLB backend conversion' },
      { header: 'Export', content: 'JSON / JSONP annotation serializer' }
    ],
    challenges: [
      'CAD 模型面数高，需要兼顾拾取精度与渲染性能。',
      '交互模式（点选、拖拽、确认标注、直接标注）需要清晰的状态机与事件分发。',
      '标注分组的颜色、可见性、撤销重做状态需要与 Three.js 渲染管线保持同步。',
      '导出格式需同时满足人工校对与下游模型训练的数据要求。'
    ],
    outcome:
      '完成可独立运行的前端原型，支撑父项目的模型可视化、面片标注与数据集导出需求，验证了浏览器端 CAD 标注的可行性。',
    related: [
      { type: 'project', key: '12' },
      { type: 'library', key: 'api-disruptor' },
      { type: 'note', key: 'building-with-webgl' }
    ]
  },
  {
    id: '12',
    title: '工热所 CAD 特征识别项目',
    subtitle:
      'CAD-related target recognition AI model project, leading technical roadmap and methodology review.',
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
    overview:
      '作为技术负责人主导 CAD 相关目标识别 AI 模型项目，主导技术路线制定、核心论文解读与方法论梳理，围绕 STEP 文件解析与 CAD 目标识别能力开展关键技术调研与可行性论证，并统筹研究生推进技术方案落地。同时独立开发了浏览器端 CAD 面片标注工具（project:11）作为项目的前端展示与数据采集入口。',
    problem:
      'CAD 目标识别涉及复杂的几何语义抽取与跨格式数据解析，需要结合深度学习与传统 CAD 几何引擎能力；甲方需求与技术边界不够清晰，缺少可交互的可视化前端来验证标注流程与算法效果。',
    solution:
      '制定分阶段技术路线，围绕 STEP 解析与 OCCT 几何引擎开展关键技术调研，指导研究生完成实验方案设计与实现；同步构建基于 Vue 3 + TresJS + Three.js 的浏览器端标注工具，用于模型可视化、面片分组与数据集导出，协同项目经理评估交付口径。',
    architecture: {
      title: 'Project Layers',
      blocks: [
        { label: 'Input', value: 'STEP / CAD geometry files' },
        { label: 'Parsing', value: 'OCCT-based geometry extraction' },
        {
          label: 'Recognition',
          value: 'Deep-learning target detection over geometric features'
        },
        {
          label: 'Validation',
          value: 'Paper experiment reproduction and iterative evaluation'
        }
      ],
      flow: undefined
    },
    techStack: [
      { header: '', content: 'Python' },
      { header: '', content: 'Open CASCADE' },
      { header: '', content: 'Three.js' },
      { header: '', content: 'PyTorch' }
    ],
    challenges: [
      '跨学科知识整合：CAD 几何、深度学习与论文方法论的交叉。',
      '需求与交付边界的不确定性需要持续的技术可行性论证。',
      '团队以研究生为主，缺乏工程经验，需要稳定的指导机制。'
    ],
    outcome:
      '完成关键技术调研与实验方案设计，论文复现实验持续推进；浏览器端标注工具支撑了模型可视化与面片级数据采集，阶段性结果支撑合同谈判与后续开发。',
    related: [
      { type: 'project', key: '11' },
      { type: 'project', key: '13' }
    ]
  },
  {
    id: '13',
    title: '某科研院所 · 超算云运维管理平台',
    subtitle:
      'Mid-scale supercomputing cloud O&M platform built on an open-source scaffold.',
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
    overview:
      '主导基于开源脚手架的中型超算云平台项目建设，负责前端整体技术方案与架构设计，在交付周期高度压缩的条件下同步指导 5 名无工程经验研究生开展工程化开发。',
    problem:
      '项目周期压缩、团队工程经验不足，需要在前端架构稳定的前提下快速推进交付，并建立可持续的技术指导机制。',
    solution:
      '基于 Vue3 + Vite 搭建前端架构，拆解需求并分配任务，持续进行代码 review 与工程化指导，保障按期交付。',
    architecture: {
      title: 'Frontend Architecture',
      blocks: [
        { label: 'Framework', value: 'Vue3 Composition API' },
        { label: 'Build', value: 'Vite with module federation' },
        { label: 'Visualization', value: 'ECharts + custom SVG dashboards' },
        {
          label: 'Delivery',
          value: 'CI/CD + on-site/remote team coordination'
        }
      ],
      flow: undefined
    },
    techStack: [
      { header: '', content: 'Vue 3' },
      { header: '', content: 'Vite' },
      { header: '', content: 'TypeScript' },
      { header: '', content: 'ECharts' },
      { header: '', content: 'SVG' }
    ],
    challenges: [
      '多项目并行导致资源争夺，需要合理排期与任务拆分。',
      '研究生团队工程能力不足，需要兼顾交付速度与人才培养。',
      '可视化模块复杂度较高，需要保证性能与可维护性。'
    ],
    outcome:
      '平台按期交付并持续演进，沉淀了技术指导与交付机制，后续项目复用该模式。',
    related: [
      { type: 'project', key: '12' },
      { type: 'project', key: '09' }
    ]
  },
  {
    id: '14',
    title: '智能体开发平台',
    subtitle: '面向 Agent、Skill 与远程运行环境的一体化前端工作台',
    category: 'AI / Frontend',
    year: '2026',
    meta: {
      type: 'AI Agent Frontend Platform',
      role: 'Frontend Architect / Integration Developer',
      status: 'Archived',
      date: '2026-07',
      duration: 'Project Archive',
      tech: 'Vue 3 / Vite 8 / Pinia 3 / Tailwind CSS 4 / WebSocket / noVNC'
    },
    visualType: 'network',
    tags: [0, 2, 4, 6],
    overview:
      'agent-interface 是一个面向 AI 智能体与技能开发场景的 Web 前端平台。它将智能体会话、技能开发、技能市场、技能审核、模板管理、远程桌面与文件管理整合到统一的 SPA 工作台中，并通过 OAuth2 与 wujie ticket 兼容独立访问和微前端嵌入两种使用方式。',
    problem:
      '智能体平台需要同时覆盖会话交互、技能生命周期、远程桌面、文件系统与模板市场等多个复杂模块。前端不仅要处理普通业务接口，还要接入容器内部署的 Agent 运行环境、VNC、文件守护服务与实时流式消息。如果这些能力直接耦合到页面，会导致认证、状态、连接生命周期与渲染逻辑难以维护。',
    solution:
      '项目采用 Vue 3 + Vite 的单页应用架构，以 Views、Components、Stores、API、Utils 和 Lib 分层组织代码。前端通过 Pinia 管理用户、会话、VNC、主题与布局状态，通过 Axios 实例隔离主服务、Filestash 与文件守护服务，通过 GatewayBrowserClient 建立 WebSocket 长连接，并连接到 agent-middleware 聚合网关以统一接入不同 Agent 后端服务。',
    architecture: {
      title: 'ARCHITECTURE',
      blocks: [
        {
          label: 'SHELL',
          value:
            '平台外壳层负责整体 SPA 入口、MainLayout、Header、Sidebar、route guard、OAuth2 / wujie ticket 认证、主题系统与微前端嵌入兼容，保证平台在独立访问和嵌入访问下使用一致的导航、登录与布局能力'
        },
        {
          label: 'AGENT WORKSPACE',
          value:
            'Agent 工作区聚合 Sessions、Detail、Chat、实例状态轮询、GatewayBrowserClient、流式消息渲染、工具调用展示与安全审批弹窗，负责从实例启动到 WebSocket 会话交互的完整前端链路'
        },
        {
          label: 'SKILL WORKBENCH',
          value:
            'Skill 工作台聚合 SkillsLib、MySkills、SkillDev、SkillsAudit 与 Market，覆盖 Skill 浏览、开发、编辑、版本管理、上传校验、发布、审核、模板复用与市场分发等生命周期能力'
        },
        {
          label: 'RUNTIME INTEGRATION',
          value:
            '运行环境集成层聚合 VNC、xterm、file daemon、Filestash、多 Axios 实例与代理配置，将容器内远程桌面、终端、文件选择、上传下载和 Agent runtime 访问统一接入前端平台'
        }
      ],
      flow: 'flowchart TD\n  Frontend["agent-interface Frontend"]\n  K8s["K8s Business Backend<br/>实例 / 容器 / 调度管理"]\n  WSG["WebSocket Gateway<br/>统一长连接入口"]\n  Container["Target Docker Container<br/>由 K8s 业务层调度"]\n  Middleware["agent-middleware<br/>容器内部署的聚合网关"]\n  Router["Agent Framework Router<br/>按框架类型选择 Handler"]\n\n  WSHandler["WebSocket Proxy Handler<br/>OpenClaw / claw"]\n  SSEHandler["SSE Adapter Handler<br/>QwenPaw / paw"]\n  CustomHandler["Custom Agent Handler<br/>其他 Agent 框架"]\n\n  WSAgent["OpenClaw Agent Service"]\n  SSEAgent["QwenPaw SSE Agent Service"]\n  CustomAgent["Other Agent Service"]\n\n  Frontend -->|"HTTP API<br/>一对多访问业务层"| K8s\n  Frontend -->|"WebSocket<br/>建立前端长连接"| WSG\n\n  WSG -->|"会话 / 实例标识转发"| K8s\n  K8s -->|"定位目标容器"| Container\n  K8s -.->|"生命周期 / 资源调度"| Container\n\n  Container -->|"进入容器内部"| Middleware\n  Middleware -->|"识别容器封装的 Agent 框架类型"| Router\n\n  Router -->|"framework = claw"| WSHandler\n  Router -->|"framework = paw"| SSEHandler\n  Router -->|"framework = custom"| CustomHandler\n\n  WSHandler -->|"WebSocket 透明代理"| WSAgent\n  SSEHandler -->|"SSE 流式协议适配"| SSEAgent\n  CustomHandler -->|"自定义协议适配"| CustomAgent\n\n  WSAgent -->|"stream / event response"| Middleware\n  SSEAgent -->|"stream / event response"| Middleware\n  CustomAgent -->|"stream / event response"| Middleware\n\n  Middleware -->|"统一事件回传"| Container\n  Container -->|"经业务层与 WS 网关回传"| WSG\n  WSG -->|"增量消息 / 工具调用 / 状态事件"| Frontend\n'
    },
    techStack: [
      {
        header: 'Frontend Framework',
        content: 'Vue 3 + Vite 8 + Pinia 3 单页应用核心'
      },
      { header: 'Styling', content: 'Tailwind CSS 4 + shadcn-vue 风格组件' },
      {
        header: 'Router & State',
        content: 'Vue Router 5 + Pinia 模块化状态管理'
      },
      {
        header: 'Real-time',
        content: 'WebSocket + GatewayBrowserClient 长连接'
      },
      { header: 'Remote Desktop', content: 'noVNC + xterm 终端集成' },
      { header: 'Editor', content: 'Monaco Editor + marked / highlight.js' },
      { header: 'Auth', content: 'OAuth2 + wujie ticket 双认证模式' }
    ],
    challenges: [
      'OAuth2 与 wujie ticket 模式并存，路由守卫和请求拦截器需要避免循环跳转。',
      '聊天流式消息需要增量合并和会话快照，避免多会话切换时顺序错乱和渲染抖动。',
      '实例运行状态、botToken、vncToken、fileToken 解耦，必须在实例进入 running 状态后再建立 Gateway 连接。',
      '主服务、文件守护、Filestash、VNC/Gateway 等多源服务需要独立请求实例与代理隔离。',
      '主题系统需要支持浅色、深色与主色切换，避免组件级样式硬编码。'
    ],
    outcome:
      '项目沉淀为一个可独立部署、也可被微前端容器嵌入的 AI Agent 开发平台前端。它覆盖智能体会话、技能开发、技能市场、审核管理、VNC 与文件管理，并通过 agent-middleware 统一接入容器内部署的 Agent 服务。',
    related: [{ type: 'project', key: '15' }]
  },
  {
    id: '15',
    title: 'Agent 聚合网关',
    subtitle: '部署在容器内部的 Agent 连接适配层，为前端统一聚合不同后端服务',
    category: 'AI / Gateway',
    year: '2026',
    meta: {
      type: 'AI Agent Frontend Platform',
      role: 'Frontend Architect / Integration Developer',
      status: 'Archived',
      date: '2026-07',
      duration: 'Project Archive',
      tech: 'Vue 3 / Vite 8 / Pinia 3 / Tailwind CSS 4 / WebSocket / noVNC'
    },
    visualType: 'network',
    tags: [0, 2, 4, 6],
    overview:
      'agent-interface 是一个面向 AI Agent 与 Skill 开发场景的 Web 前端平台。它将 Agent 会话、Skill 开发、Skill 市场、审核管理、模板管理、VNC 远程桌面与文件管理整合到统一的 SPA 工作台中，并通过 OAuth2 与 wujie ticket 兼容独立访问和微前端嵌入两种使用方式。',
    problem:
      'Agent 平台需要同时覆盖会话交互、Skill 生命周期、远程桌面、文件系统与模板市场等多个复杂模块。前端不仅要处理普通业务接口，还要接入容器内部署的 Agent runtime、VNC、文件守护服务与实时流式消息。如果这些能力直接耦合到页面，会导致认证、状态、连接生命周期与渲染逻辑难以维护，也会让不同 Agent 框架的接入成本持续上升。',
    solution:
      '项目采用 Vue 3 + Vite 的 SPA 架构，以 Views、Components、Stores、API、Utils 和 Lib 分层组织代码。前端通过 Pinia 管理用户、会话、VNC、主题与布局状态，通过独立 Axios 实例隔离主业务服务、Filestash 与文件守护服务，通过 GatewayBrowserClient 建立 WebSocket 长连接，并通过 WebSocket Gateway 与容器内 agent-middleware 聚合网关统一接入不同 Agent 后端服务。',
    architecture: {
      title: 'ARCHITECTURE',
      blocks: [
        {
          label: 'POSITION',
          value:
            'agent-interface 是用户侧 AI Agent 开发平台前端，位于业务用户、K8s 业务层后端、WebSocket Gateway 与容器内 agent-middleware 之间，负责统一组织会话、Skill、Market、VNC 与文件管理入口'
        },
        {
          label: 'ENTRY',
          value:
            '通过 HTTP API 访问 K8s 业务层后端，通过 WebSocket 连接统一 WS Gateway，使前端长连接与后端容器调度逻辑解耦'
        },
        {
          label: 'WORKSPACE',
          value:
            '以 Detail、Sessions、SkillDev、SkillsLib、MySkills、SkillsAudit、Market 等 Views 组织 Agent 使用、Skill 开发、审核与模板市场工作流'
        },
        {
          label: 'INTEGRATION',
          value:
            '通过 Pinia、Axios API layer、GatewayBrowserClient、noVNC、Filestash 与文件守护服务，将业务状态、实时消息、远程桌面与文件能力整合到同一前端工作台'
        }
      ],
      flow: 'flowchart TD\n  Frontend["agent-interface Frontend"]\n  K8s["K8s Business Backend<br/>实例 / 容器 / 调度管理"]\n  WSG["WebSocket Gateway<br/>统一长连接入口"]\n  Container["Target Docker Container<br/>由 K8s 业务层调度"]\n  Middleware["agent-middleware<br/>容器内部署的聚合网关"]\n  Router["Agent Framework Router<br/>按框架类型选择 Handler"]\n\n  WSHandler["WebSocket Proxy Handler<br/>OpenClaw / claw"]\n  SSEHandler["SSE Adapter Handler<br/>QwenPaw / paw"]\n  CustomHandler["Custom Agent Handler<br/>其他 Agent 框架"]\n\n  WSAgent["OpenClaw Agent Service"]\n  SSEAgent["QwenPaw SSE Agent Service"]\n  CustomAgent["Other Agent Service"]\n\n  Frontend -->|"HTTP API<br/>一对多访问业务层"| K8s\n  Frontend -->|"WebSocket<br/>建立前端长连接"| WSG\n\n  WSG -->|"会话 / 实例标识转发"| K8s\n  K8s -->|"定位目标容器"| Container\n  K8s -.->|"生命周期 / 资源调度"| Container\n\n  Container -->|"进入容器内部"| Middleware\n  Middleware -->|"识别容器封装的 Agent 框架类型"| Router\n\n  Router -->|"framework = claw"| WSHandler\n  Router -->|"framework = paw"| SSEHandler\n  Router -->|"framework = custom"| CustomHandler\n\n  WSHandler -->|"WebSocket 透明代理"| WSAgent\n  SSEHandler -->|"SSE 流式协议适配"| SSEAgent\n  CustomHandler -->|"自定义协议适配"| CustomAgent\n\n  WSAgent -->|"stream / event response"| Middleware\n  SSEAgent -->|"stream / event response"| Middleware\n  CustomAgent -->|"stream / event response"| Middleware\n\n  Middleware -->|"统一事件回传"| Container\n  Container -->|"经业务层与 WS Gateway 回传"| WSG\n  WSG -->|"增量消息 / 工具调用 / 状态事件"| Frontend\n'
    },
    techStack: [
      {
        header: '',
        content:
          'Frontend Runtime：基于 Vue 3 Composition API、Vite 8 与 Vue Router 5 构建 SPA 前端应用，适合模块化页面组织与快速构建'
      },
      {
        header: '',
        content:
          'State Management：使用 Pinia 3 管理 chat、user、vnc、theme 与 layout 等全局状态，将业务状态与页面组件解耦'
      },
      {
        header: '',
        content:
          'Styling System：使用 Tailwind CSS 4、自定义 CSS variables 与 shadcn-vue 风格组件构建主题化 UI 体系，支持主色与暗色模式切换'
      },
      {
        header: '',
        content:
          'Component Ecosystem：基于 reka-ui、lucide-vue-next 与自定义 ui components 组织 Dialog、Sidebar、Header、Chat、Skill、Market 与 VNC 等业务组件'
      },
      {
        header: '',
        content:
          'Network Layer：使用 Axios、request interceptor 与多实例 API layer 隔离主业务服务、Filestash、file daemon 与 Gateway 相关请求'
      },
      {
        header: '',
        content:
          'Real-time Gateway：通过 GatewayBrowserClient 与 WebSocket 接入统一 WS Gateway，处理 Agent 流式消息、thinking、tool calls、tool results 与安全审批事件'
      },
      {
        header: '',
        content:
          'Remote Runtime Integration：通过 noVNC、xterm 与文件上传能力接入容器内远程桌面、终端与运行环境'
      },
      {
        header: '',
        content:
          'Editor & Content Rendering：使用 Monaco Editor、marked、highlight.js 与 DOMPurify 支持 Skill 开发、Markdown 渲染、代码高亮与内容安全处理'
      },
      {
        header: '',
        content:
          'Auth & Embedding：通过 OAuth2、wujie ticket、route guard 与 token management 同时支持独立访问和微前端嵌入场景'
      },
      {
        header: '',
        content:
          'Build & Operation：使用 Yarn 1、Vite proxy、Nginx 与 Dockerfile 支持本地开发、代理调试、静态部署与容器化交付'
      }
    ],
    challenges: [
      'OAuth2 与 wujie ticket 模式并存，route guard 和 request interceptor 需要避免循环跳转。',
      '聊天流式消息需要增量合并和会话快照，避免多会话切换时顺序错乱和渲染抖动。',
      '实例运行状态、botToken、vncToken、fileToken 解耦，必须在实例进入 running 状态后再建立 Gateway 连接。',
      '主服务、file daemon、Filestash、VNC / Gateway 等多源服务需要独立请求实例与代理隔离。',
      '主题系统需要支持浅色、深色与主色切换，避免组件级样式硬编码。'
    ],
    outcome:
      '项目沉淀为一个可独立部署、也可被微前端容器嵌入的 AI Agent 开发平台前端。它覆盖 Agent 会话、Skill 开发、Skill 市场、审核管理、VNC 与文件管理，并通过 WebSocket Gateway 与 agent-middleware 统一接入容器内部署的 Agent 服务。',
    related: [{ type: 'project', key: '14' }]
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getAdjacentProjects(id: string): {
  prev: Project | null
  next: Project | null
} {
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null
  }
}
