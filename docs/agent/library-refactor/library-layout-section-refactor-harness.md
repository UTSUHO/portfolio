# LibraryLayout Section Dossier Refactor Harness

> 目标：在**保留现有 LibraryLayout 顶部项目 Panel 与图片轮播组件**的前提下，仅重构项目详情页的 `sections` 渲染区域，使不同信息密度的 Section 使用统一外壳、不同内部模板，并能够复用于其他 Library 项目。
>
> 本文是编码 Agent 的执行 Harness，不是概念提案。请先审查现有实现，再直接修改代码、运行检查并输出改动结果。

---

## 0. 最终目标

将现有 Section 等宽 Grid：

```text
[01 卡片] [02 卡片] [03 卡片] [04 长卡片]
[05 卡片] [06 卡片] [空白]    [空白]
```

改造成连续的技术档案结构：

```text
┌────────────────┬──────────────────────────────────────────────┐
│ SECTION RAIL   │ SECTION CONTENT                              │
├────────────────┼──────────────────────────────────────────────┤
│ SECTION RAIL   │ SECTION CONTENT                              │
├────────────────┼──────────────────────────────────────────────┤
│ SECTION RAIL   │ SECTION-SPECIFIC INTERNAL LAYOUT             │
└────────────────┴──────────────────────────────────────────────┘
```

核心原则：

1. **外层统一，内部按语义变化。**
2. **Section 高度由内容自然决定，不做等高。**
3. **Grid 只用于排列同构信息，不用于强制排列所有 Section。**
4. **架构解释 Pix 内部如何工作；项目价值解释 Pix 如何进入外部开发系统。**
5. **工程挑战与项目价值不使用含义模糊的装饰图标。**
6. **现有项目图片轮播是 Library 的必要能力，不得移除、弱化或替换。**

---

## 1. 不可破坏范围

以下区域视为冻结区域。本次改造不得改变其布局、行为、尺寸关系或数据接口：

- 全局 Header / Navigation。
- Library 页面主容器宽度与左右留白。
- Back to Library 导航。
- 左侧项目摘要 Panel：
  - 序号；
  - 标题；
  - 摘要；
  - Type / Role / Duration / Year / Status。
- 中央图片轮播 Panel：
  - 主图区域；
  - 上一张/下一张按钮；
  - 当前图片状态；
  - 底部缩略图或分类切换；
  - 图片加载、切换和键盘行为。
- 右侧 Tags Panel。
- 右侧 Table of Contents Panel。
- Related Archives。
- Previous / Next Archive。
- 页面底部系统状态栏。

### 1.1 严格限制

- 不得删除或隐藏 Carousel。
- 不得把 Carousel 改成静态封面。
- 不得因为 Pix 当前主要展示架构图，就假定其他 Library 项目不需要图片。
- 不得重做整个 LibraryLayout。
- 不得修改全局导航比例来给 Section 腾空间。
- 不得用 Masonry 替换现有 Section。
- 不得引入新的大型 UI 框架。
- 不得为了 Section 图表引入 Three.js、Canvas 或 WebGL。
- 除非现有代码无法编译，不得修改冻结区域的 DOM 结构；允许做最小的 import、prop 或 wrapper 调整。

本次允许改动的核心范围：

```text
LibraryLayout
└── Sections Area    ← 主要改造区域
```

---

## 2. 开始编码前的审查步骤

先完成以下审查，不要直接假定文件名、框架版本或样式方案。

### 2.1 定位代码

查找：

- `LibraryLayout` 或实际承担 Library 详情页布局的组件。
- Section 当前渲染循环。
- Section 类型定义或内容 schema。
- Carousel / Gallery Panel 组件。
- Tags 和 TOC 的锚点生成逻辑。
- 页面断点、颜色变量、边框变量、字号变量。
- Pix 对应的 Library metadata 文件。

建议搜索关键词：

```text
LibraryLayout
sections.map
Table of Contents
related archives
prev archive
next archive
carousel
gallery
visuals
```

### 2.2 建立改造前基线

在修改前记录：

- 顶部 Panel 的桌面截图。
- Carousel 切换行为。
- 当前 Section DOM。
- 现有 Library 项目的 Section 数据差异。
- 当前移动端是否存在横向溢出。

顶部 Panel 在改造前后应尽可能像素一致。允许的变化只应来自 Section 区域高度变化导致的页面纵向位移，不允许顶部 Panel 内部重新排版。

### 2.3 服从现有工程约定

- 如果项目使用 CSS Modules，继续使用 CSS Modules。
- 如果项目使用 Tailwind，继续使用既有 Tailwind 约定。
- 如果项目使用 styled-components 或其他方案，沿用现有方案。
- 不要同时引入第二套样式系统。
- 优先复用现有排版、颜色、边框和 spacing token。

---

## 3. 目标组件架构

建议结构：

```text
LibraryLayout
├── LibraryHeaderArea                 [保持现状]
│   ├── ProjectSummaryPanel           [保持现状]
│   ├── ProjectCarouselPanel          [保持现状]
│   └── LibraryAside                  [保持现状]
│       ├── TagsPanel
│       └── TableOfContents
│
├── LibrarySectionDossier             [新增或重构]
│   ├── LibrarySectionFrame
│   │   ├── LibrarySectionRail
│   │   └── SectionRenderer
│   │       ├── ProseSection
│   │       ├── PillarsSection
│   │       ├── ArchitectureSection
│   │       ├── ConstraintsSection
│   │       └── OutcomeSection
│   └── ...
│
├── RelatedArchives                   [保持现状]
└── ArchiveNavigation                 [保持现状]
```

不要为了匹配命名而强制拆分文件。如果现有项目倾向于少组件结构，可以保留在同一模块中，但必须保证：

- Frame 与内容模板职责分离。
- 不在 `LibraryLayout` 中堆积大量 `if (section.id === ...)`。
- 每种 Section 的布局可以独立维护。

---

## 4. Section 数据模型

### 4.1 兼容原则

现有数据字段：

```ts
{
  id: string;
  number: string;
  title: string;
  body?: string;
  bullets?: string[];
  diagram?: string;
}
```

必须继续可用。不要要求一次性迁移所有 Library 项目。

新增字段都应为可选字段。推荐增加语义类型：

```ts
type LibrarySectionVariant =
  | "prose"
  | "pillars"
  | "architecture"
  | "constraints"
  | "outcome";
```

推荐基础类型：

```ts
interface LibrarySectionBase {
  id: string;
  number: string;
  title: string;
  label?: string;
  variant?: LibrarySectionVariant;
  body?: string;
  bullets?: string[];
  diagram?: string;
}

interface LibrarySectionItem {
  id?: string;
  number?: string;
  code?: string;
  title: string;
  body?: string;
  meta?: string;
}
```

### 4.2 规范化层

增加一个轻量规范化函数：

```ts
normalizeLibrarySection(section): NormalizedLibrarySection
```

规则：

1. 有 `variant` 时优先使用。
2. 没有 `variant` 时，保持兼容：
   - 只有 `body`：按 `prose` 渲染；
   - `body + bullets`：按通用 list 渲染；
   - `diagram`：在正文后显示 legacy diagram；
   - 不得因未知字段导致页面报错。
3. Pix 可以迁移到新的结构化字段。
4. 其他项目暂时继续使用旧字段，也必须正常显示。

避免把所有项目的 `id` 固定映射为一种类型。允许 Pix 使用显式 `variant`，旧数据只做保守 fallback。

---

## 5. 通用 Section Frame

每个 Section 使用同一外层结构：

```html
<section id="..." class="library-section">
  <header class="library-section__rail">...</header>
  <div class="library-section__content">...</div>
</section>
```

### 5.1 Section Rail

包含：

```text
04 /
架构
SYSTEM
```

字段：

- `number`：红色，等宽字体。
- `title`：中文主标题。
- `label`：英文分类码，例如 `CONTEXT`、`PROBLEM`、`RESPONSE`、`SYSTEM`、`CONSTRAINTS`、`OUTCOME`。

不要在 Rail 中使用星形、警告三角、问号等语义不稳定的图标。Rail 依靠编号和分类码建立识别。

建议尺寸：

```css
.library-section {
  display: grid;
  grid-template-columns: clamp(138px, 16%, 176px) minmax(0, 1fr);
}
```

### 5.2 连续边框

所有 Section 组成一个连续档案块：

```css
.library-section-dossier {
  border: 1px solid var(--library-line);
}

.library-section + .library-section {
  border-top: 1px solid var(--library-line);
}

.library-section__rail {
  border-right: 1px solid var(--library-line);
}
```

不要让每个 Section 变成彼此分离的浮动 Card。

### 5.3 高度规则

- 不设置统一高度。
- 不设置统一 `min-height`。
- 不使用 `grid-auto-rows: 1fr`。
- 不让短 Section 为了和长 Section 对齐而产生空白。
- 高度完全由内容决定。

---

## 6. 各 Section 模板

## 6.1 `prose`：项目概述、设计动机

适用于：

- `01 / 项目概述`
- `02 / 设计动机`

布局：

```text
SECTION RAIL | 一段或两段正文
```

规则：

- 内容单列。
- 正文最大宽度约 `68–76ch`。
- 使用自然行高。
- 不添加图标或伪图表。
- 不为填满区域而扩充内容。

建议：

```css
.prose-section__body {
  max-width: 74ch;
  line-height: 1.7;
}
```

---

## 6.2 `pillars`：解决方案

适用于：

- `03 / 解决方案`

结构：

1. 上部：正文说明。
2. 下部：三个设计支柱。

Pix 的三个支柱：

```text
01 / HOST ENTRY
保留 Windows 下的低成本调用入口

02 / WSL WORKSPACE
将项目投影到 WSL ext4 高性能工作区

03 / POLICY ROUTING
按配置选择 Direct 或 Sandbox 执行策略
```

桌面布局：三列。

```css
.pillars-section__items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

视觉规则：

- 每项以编号和标题为主。
- 使用细分隔线。
- 不使用文件夹、立方体、分支等大型装饰图标。
- 三项属于同一个 Section，不做悬浮阴影。

---

## 6.3 `architecture`：架构

适用于：

- `04 / 架构`

该 Section 只解释 **Pix 内部结构与内部执行流程**。

内部两栏：

```text
MODULE REGISTRY | INTERNAL EXECUTION FLOW
```

推荐比例：

```css
.architecture-section__layout {
  display: grid;
  grid-template-columns: minmax(220px, 0.85fr) minmax(0, 1.55fr);
}
```

### 左侧：Module Registry

展示六个模块：

```text
01  Host Bridge
    Windows / WSL 环境检测、路径转换与进程重启

02  Workspace Controller
    NTFS 工作区识别、ext4 投影与 Mutagen 会话管理

03  Runtime Manager
    Direct 与 Sandbox 共享的 Canonical Pi Runtime

04  Execution Router
    根据 CLI、用户配置和 .pix.json 解析执行策略

05  Sandbox Adapter
    将工作区、Runtime、网络和权限转换为容器启动参数

06  Diagnostic Layer
    pix status / doctor / migrate 等跨环境诊断能力
```

每项用细线分隔，避免普通 bullet list 的松散感。

### 右侧：Internal Execution Flow

必须表现 Pix 自身流程：

```text
CLI ENTRY
    ↓
WSL BOOTSTRAP
    ↓
WORKSPACE PROJECTION
    ↓
POLICY RESOLUTION
    ├── DIRECT / WSL
    └── SANDBOX / DOCKER
    ↓
CONTROLLED EXECUTION
    ↓
SYNC CLEANUP
```

`Canonical Pi Runtime` 是共享的侧向节点，连接 Direct 与 Sandbox。

约束：

- 这条流程只能放在架构 Section。
- 不要在项目价值 Section 中再次展示 Detect / Prepare / Resolve / Inject / Execute / Cleanup。
- 优先使用 DOM + CSS 节点与连线。
- 如果项目已有 Mermaid/SVG 渲染能力，可复用；否则不要仅为此引入大型依赖。

---

## 6.4 `constraints`：工程挑战

适用于：

- `05 / 工程挑战`

桌面端使用四列工程证据矩阵；中等宽度为 `2 × 2`；移动端单列。

```css
.constraints-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
```

四个条目：

### 01 / FILESYSTEM BRIDGE

```text
C:\project
    ↓ PATH MAP
~/.pix/workspaces/project
    ↓ MOUNT
/workspace
```

说明 Windows、WSL2 与 Docker 文件系统语义和路径转换问题。

### 02 / RUNTIME CONTINUITY

```text
CANONICAL PI RUNTIME
       ├── WSL DIRECT
       └── DOCKER SANDBOX
```

说明容器销毁、运行模式切换时，配置、会话与 Runtime 状态仍可连续。

### 03 / SYNC FALLBACK

```text
MUTAGEN / PRIMARY
       ↓ unavailable
RSYNC / DEGRADED
       ↓ unavailable
CP / LAST RESORT
```

说明同步组件不可用时的降级链。

### 04 / CONFIG BOUNDARY

```text
.pix.json
    ↓ POLICY FILTER
API KEY / PROXY / NETWORK / MODE
    ↓
EXECUTION ENVIRONMENT
```

说明项目配置经过策略过滤后进入 WSL 或容器。

视觉规则：

- 不使用警告三角、盾牌、垃圾桶等泛化图标。
- 每一格以编号、技术标签、问题描述、微型结构图组成。
- 微型图使用统一矩形节点、细线、方向箭头和等宽标签。
- 红色仅用于编号、当前状态或降级状态。

---

## 6.5 `outcome`：项目价值

适用于：

- `06 / 项目价值`

项目价值不展示 Pix 自己的内部执行步骤。该 Section 回答四个问题：

1. Pix 的定位是什么？
2. 为什么要设计它？
3. 它为开发者提供什么？
4. 它如何嵌入已有开发系统？

桌面端可使用四列：

```text
SLOGAN | DESIGN INTENT | CAPABILITIES | INTEGRATION WORKFLOW
```

建议比例：

```css
.outcome-section__layout {
  display: grid;
  grid-template-columns:
    minmax(170px, 0.8fr)
    minmax(210px, 1fr)
    minmax(230px, 1.15fr)
    minmax(320px, 1.6fr);
}
```

### A. Slogan

```text
PIX IS NOT A CONTAINER LAUNCHER.
IT IS A LIGHTWEIGHT AGENT HARNESS.
```

或在空间较窄时：

```text
One Command.
One Environment.
Full Control.
```

优先使用第一组，因为它更准确地区分 Pix 与普通 Docker Launcher。

下方中文说明：

```text
为 Coding Agent 在 Windows、WSL2 与 Docker 之间建立统一、可控且连续的执行边界。
```

### B. Design Intent

使用三条文本原则，不使用图标：

```text
BOUNDARY
限制 Agent 可接触的宿主文件、进程与网络范围

PERFORMANCE
避免在 NTFS 直接挂载目录中进行高频小文件读写

CONTINUITY
在 Direct 与 Sandbox 模式之间保持 Runtime 连续
```

### C. Capabilities

使用编号能力清单：

```text
01  UNIFIED ENTRY
    当前目录执行 pix 即可启动

02  FAST WORKSPACE
    自动建立 WSL ext4 高性能工作区

03  SELECTABLE ISOLATION
    可选择 WSL Direct 或 Docker Sandbox

04  CONTINUOUS RUNTIME
    配置、状态和会话跨执行模式保持连续
```

### D. Development System Integration

必须展示 Pix 如何接入外部开发系统，而不是展示 Pix 内部流程：

```text
TERMINAL / IDE / CODING AGENT / NPM SCRIPT / CI
                         ↓
                  NPX PIX / PIX ENTRY
                         ↓
                     PIX HARNESS
              WORKSPACE · POLICY · RUNTIME
                    ↙             ↘
               WSL DIRECT     DOCKER SANDBOX
                    ↘             ↙
         FILE CHANGES · LOGS · EXIT STATUS
                         ↓
              EXISTING PROJECT WORKFLOW
```

语义边界：

- `04 / 架构`：Pix 内部如何执行。
- `06 / 项目价值`：Pix 在外部开发系统中处于什么位置。

禁止在 Integration Workflow 中使用以下错误流程：

```text
Detect → Prepare → Resolve → Inject → Execute → Cleanup
```

该流程属于内部架构，不属于项目价值。

---

## 7. Pix Metadata 迁移示例

以下结构只是建议字段名。根据现有类型系统调整，但必须保留语义边界和 legacy fallback。

```ts
sections: [
  {
    id: "overview",
    number: "01",
    title: "项目概述",
    label: "CONTEXT",
    variant: "prose",
    body: "..."
  },
  {
    id: "scenario",
    number: "02",
    title: "设计动机",
    label: "PROBLEM",
    variant: "prose",
    body: "..."
  },
  {
    id: "solution",
    number: "03",
    title: "解决方案",
    label: "RESPONSE",
    variant: "pillars",
    body: "...",
    items: [
      {
        number: "01",
        code: "HOST ENTRY",
        title: "宿主入口",
        body: "保留 Windows 下的低成本调用入口。"
      },
      {
        number: "02",
        code: "WSL WORKSPACE",
        title: "高性能工作区",
        body: "将项目投影到 WSL ext4 文件系统。"
      },
      {
        number: "03",
        code: "POLICY ROUTING",
        title: "执行策略路由",
        body: "根据配置选择 Direct 或 Sandbox。"
      }
    ]
  },
  {
    id: "architecture",
    number: "04",
    title: "架构",
    label: "SYSTEM",
    variant: "architecture",
    body: "Pix 由六个核心模块组成。",
    modules: [
      { number: "01", title: "Host Bridge", body: "..." },
      { number: "02", title: "Workspace Controller", body: "..." },
      { number: "03", title: "Runtime Manager", body: "..." },
      { number: "04", title: "Execution Router", body: "..." },
      { number: "05", title: "Sandbox Adapter", body: "..." },
      { number: "06", title: "Diagnostic Layer", body: "..." }
    ],
    flow: {
      nodes: [
        "CLI Entry",
        "WSL Bootstrap",
        "Workspace Projection",
        "Policy Resolution",
        "Controlled Execution",
        "Sync Cleanup"
      ],
      branches: ["Direct / WSL", "Sandbox / Docker"],
      sharedRuntime: "Canonical Pi Runtime"
    }
  },
  {
    id: "challenges",
    number: "05",
    title: "工程挑战",
    label: "CONSTRAINTS",
    variant: "constraints",
    items: [
      {
        number: "01",
        code: "FILESYSTEM BRIDGE",
        title: "跨文件系统语义",
        body: "桥接 Windows、WSL2 与 Docker 路径及权限语义。"
      },
      {
        number: "02",
        code: "RUNTIME CONTINUITY",
        title: "Runtime 连续性",
        body: "容器销毁和模式切换时保持配置、状态与会话连续。"
      },
      {
        number: "03",
        code: "SYNC FALLBACK",
        title: "同步降级策略",
        body: "Mutagen 不可用时依次降级到 rsync 与 cp。"
      },
      {
        number: "04",
        code: "CONFIG BOUNDARY",
        title: "配置安全注入",
        body: "通过项目级 .pix.json 注入 API Key、代理和网络策略。"
      }
    ]
  },
  {
    id: "outcome",
    number: "06",
    title: "项目价值",
    label: "OUTCOME",
    variant: "outcome",
    outcome: {
      slogan: [
        "PIX IS NOT A CONTAINER LAUNCHER.",
        "IT IS A LIGHTWEIGHT AGENT HARNESS."
      ],
      summary: "为 Coding Agent 建立统一、可控且连续的执行边界。",
      intent: [
        { code: "BOUNDARY", body: "限制 Agent 接触宿主资源的范围。" },
        { code: "PERFORMANCE", body: "避免 NTFS 高频小文件读写瓶颈。" },
        { code: "CONTINUITY", body: "保持 Direct 与 Sandbox Runtime 连续。" }
      ],
      capabilities: [
        { number: "01", code: "UNIFIED ENTRY", body: "当前目录执行 pix 即可启动。" },
        { number: "02", code: "FAST WORKSPACE", body: "自动建立 WSL ext4 工作区。" },
        { number: "03", code: "SELECTABLE ISOLATION", body: "选择 WSL 或 Docker 隔离。" },
        { number: "04", code: "CONTINUOUS RUNTIME", body: "配置和会话跨模式连续。" }
      ],
      integration: {
        sources: ["Terminal", "IDE", "Coding Agent", "npm script", "CI"],
        entry: "npx pix / pix",
        harness: ["Workspace", "Policy", "Runtime"],
        targets: ["WSL Direct", "Docker Sandbox"],
        outputs: ["File changes", "Logs", "Exit status"],
        destination: "Existing Project Workflow"
      }
    }
  }
]
```

如果现有 schema 不适合直接加入复杂对象，可以创建页面层 ViewModel，但不要把展示文案硬编码在组件内部。

---

## 8. 样式规则

### 8.1 颜色

沿用现有站点 token：

- 主背景：现有白色。
- 文本：现有主文字色。
- 辅助文本：现有灰色。
- 边框：现有细灰线。
- 强调色：现有 Library 红色。

红色只用于：

- Section number。
- 当前状态。
- 关键入口或分支。
- 小型状态标记。

不要给整个 Section 填充红色背景。

### 8.2 字体

沿用当前页面字体体系：

- 编号、英文 label、节点名称：等宽字体。
- 中文正文：当前正文字体。
- Slogan：等宽或当前标题字体，使用更高字号。

不要把正文压缩到难以阅读。以现有页面字号为基准，Section 正文不可低于当前正文尺寸。

### 8.3 间距

建议值应映射到现有 spacing token：

```text
Rail padding:        16–20px
Content padding:     18–24px
Section gap:         0
Internal group gap:  14–20px
Body line-height:    1.65–1.75
```

### 8.4 图形语言

Section 内的技术图形统一使用：

- 矩形节点。
- 细边框。
- 正交或单向连线。
- 箭头。
- 虚线表示共享状态或非主链路。
- 等宽标签。

不要使用：

- 大面积渐变。
- 3D 图标。
- 拟物图标。
- 警告、星形、问号、垃圾桶等泛化图标。
- 阴影浮层卡片。

Carousel 中的图片内容不受此限制；本规则只约束 Section 信息图。

---

## 9. 响应式规则

### Desktop：`>= 1200px`

- Section Rail + Content 两栏。
- Pillars 三列。
- Architecture 两栏。
- Constraints 四列。
- Outcome 四列。

### Medium：`768px – 1199px`

- 保持 Section Rail + Content，Rail 可以缩窄。
- Pillars 可保持三列或改为 `2 + 1`，以不压缩正文为准。
- Architecture 改为上下排列。
- Constraints 改为 `2 × 2`。
- Outcome 改为 `2 × 2`：
  - Slogan + Design Intent；
  - Capabilities + Integration。

### Mobile：`< 768px`

Section Frame 改为上下结构：

```css
.library-section {
  grid-template-columns: 1fr;
}

.library-section__rail {
  border-right: 0;
  border-bottom: 1px solid var(--library-line);
}
```

其他规则：

- Pillars 单列。
- Architecture 单列。
- Constraints 单列。
- Outcome 单列。
- Integration Workflow 允许纵向排列。
- 不能出现横向滚动。
- 不要缩小字体来强行保留桌面结构。

冻结区域的移动端行为保持现状；不要借本次改造重做 Carousel 的移动端交互。

---

## 10. TOC 与锚点

- 保持现有 Table of Contents 数据来源。
- 每个 Section 保留稳定的 `id`。
- 标题层级使用语义化 `h2`。
- 点击 TOC 后滚动到 Section 顶部。
- 如果页面有 sticky header，使用现有 `scroll-margin-top` 或补充合理值。
- 不要因新增 wrapper 导致 TOC 失效。

---

## 11. 可访问性

- Section 使用 `<section>`。
- Section 标题使用 `<h2>`。
- 技术流程使用有序 DOM 结构，不能只有背景图。
- 箭头和连线不是唯一的信息载体，节点文本必须可读。
- 红色不是唯一的状态区分方式，同时使用文字或线型。
- 保持键盘访问 Carousel 的现有能力。
- 新增布局不应改变 Carousel 的 focus 顺序。
- 尊重 `prefers-reduced-motion`；Section 不需要进入动画。

---

## 12. 实现顺序

严格按以下顺序执行。

### Phase A：建立保护边界

1. 找到顶部 Panel 与 Carousel 的实现。
2. 记录其 DOM 和样式依赖。
3. 确认本次修改不会移动或删除这些组件。
4. 截取基线截图。

### Phase B：数据兼容层

1. 扩展 Section 类型。
2. 增加 `variant` 和可选结构化字段。
3. 增加 legacy fallback。
4. 确保旧项目无需迁移即可渲染。

### Phase C：Section Frame

1. 创建连续 Dossier 容器。
2. 创建 Section Rail。
3. 删除 Section 统一等高 Grid。
4. 保持 TOC anchor。

### Phase D：模板实现

按顺序实现：

1. Prose。
2. Pillars。
3. Architecture。
4. Constraints。
5. Outcome。

每完成一个模板先验证响应式和内容溢出，再继续下一个。

### Phase E：迁移 Pix

1. 为 Pix Section 增加显式 `variant`。
2. 将解决方案拆成三个支柱。
3. 将架构拆成模块注册表和内部执行流。
4. 将工程挑战拆成四个工程证据块。
5. 将项目价值拆成 Slogan、Design Intent、Capabilities、Integration Workflow。
6. 确保 Integration Workflow 描述外部开发系统集成，而不是 Pix 内部流程。

### Phase F：回归检查

检查：

- Carousel 是否仍然存在。
- Carousel 图片是否仍能切换。
- 缩略图/Tab 是否仍能切换。
- 顶部 Panel 是否发生意外位移。
- Tags 和 TOC 是否正常。
- Related / Prev / Next 是否正常。
- 其他 Library 项目是否正常。
- 移动端是否横向溢出。

---

## 13. 验收标准

全部满足后才算完成。

### 13.1 冻结区域

- [ ] 项目摘要 Panel 保留。
- [ ] 图片轮播 Panel 保留。
- [ ] Carousel 上一张/下一张正常。
- [ ] Carousel 缩略图或分类切换正常。
- [ ] Tags 与 TOC 保留。
- [ ] Related Archives 保留。
- [ ] Previous / Next 保留。

### 13.2 Section 布局

- [ ] 所有 Section 使用连续外框。
- [ ] 每个 Section 使用统一 Rail。
- [ ] Section 不再统一等高。
- [ ] 不存在因 Grid 强制对齐产生的大面积空白。
- [ ] 01、02 为单列正文。
- [ ] 03 为正文 + 三个设计支柱。
- [ ] 04 为模块注册表 + Pix 内部执行流程。
- [ ] 05 为四个工程证据块。
- [ ] 06 为 Slogan + Design Intent + Capabilities + Integration Workflow。

### 13.3 语义

- [ ] 架构中的流程描述 Pix 自身内部流程。
- [ ] 项目价值中的流程描述 Pix 接入外部开发系统。
- [ ] 项目价值没有重复内部 Detect / Prepare / Execute 流程。
- [ ] 工程挑战没有使用语义模糊的大图标。
- [ ] 项目价值没有使用星形、播放、垃圾桶等装饰图标。

### 13.4 兼容性

- [ ] 旧 Section 数据仍可渲染。
- [ ] 未迁移的 Library 项目不会报错。
- [ ] TypeScript 无新增错误。
- [ ] 页面无新增 console error。
- [ ] 360px 宽度无横向溢出。
- [ ] TOC 锚点正常。

---

## 14. 禁止的实现方式

以下做法视为未完成：

- 删除 Carousel，以单张架构图取代。
- 把顶部 Panel 与 Section 合并成一个新布局。
- 所有 Section 继续放入统一四列 Grid。
- 使用 Masonry 隐藏高度差问题。
- 使用固定高度裁切正文。
- 把 `section.id` 判断全部写在 `LibraryLayout` 主组件中。
- 在组件中硬编码 Pix 的全部文案。
- 为了架构图新增重型绘图库。
- 在工程挑战中添加含义不明的通用图标。
- 在项目价值中重复 Pix 内部执行链。
- 只输出设计建议而不修改代码。

---

## 15. Agent 完成时的输出格式

完成后只输出以下内容：

```md
## Implementation Summary
- 实际完成的结构改造
- 是否保持 Carousel 与顶部 Panel 不变

## Files Changed
- 文件路径：改动说明

## Data Migration
- Pix metadata 的新增字段
- legacy fallback 的处理方式

## Verification
- 执行的 lint / typecheck / test / build
- Carousel 回归结果
- Desktop / Medium / Mobile 检查结果

## Remaining Issues
- 仍未解决的问题；没有则写 None
```

不要只返回伪代码或下一步建议。必须完成现有代码改造并验证。
