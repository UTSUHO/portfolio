# Library Detail 页面蓝图

路径：

```txt
/library/[slug]
```

页面示例标题：

```txt
Distributed Mesh Network System
```

## 页面目标

展示一个正式工程归档的完整记录。  
它应像“系统设计文档 + 项目复盘 + 技术档案”，而不是普通博客文章。

## 页面骨架

```txt
SiteShell(module="LIBRARY", breadcrumb="// LIBRARY / DETAIL")
  DetailHero
    IntroAndMetadata
    TechnicalHeroVisual
    SideInfoPanel

  SectionGrid
    Context
    Architecture
    KeyDecisions
    Implementation
    Stack
    Outcomes
    RelatedArchives

  BottomArchiveNav
```

## 顶部 DetailHero

Desktop 建议三列：

```css
.library-detail-hero {
  display: grid;
  grid-template-columns: 32% 44% 24%;
}
```

### 1. IntroAndMetadata

内容结构：

```txt
← BACK TO LIBRARY

03 / 24

DISTRIBUTED MESH
NETWORK SYSTEM_

Design and prototyping of a distributed mesh network
system for real-time collaborative environments.

TYPE          Research & Prototype
ROLE          Fullstack Engineer
DURATION      2025.03 — 2025.05
YEAR          2025
STATUS        ■ ARCHIVED
LINK          yourname.dev/meshnet ↗     <- 可选，entry.link 存在时渲染
REPOSITORY    github.com/yourname/meshnet ↗
DEMO          meshnet.yourname.dev ↗
```

要求：

- `BACK TO LIBRARY` 是返回链接。
- `03 / 24` 中当前编号橙红。
- metadata 用 `MetaTable`，不要写成普通段落。
- `LINK` 字段为可选；若 entry 包含 `link`（字符串），则在 `LibraryMetaTable` 中渲染为一行可点击外链，点击在新标签页打开。
- 外链末尾使用小箭头或 external icon。

### 2. TechnicalHeroVisual

主视觉是系统架构线框图或轴测图。

元素：

- 节点块：`NODE_01`, `NODE_02`, `NODE_03`
- 层级标签：`SYNC_LAYER`, `CONTROL_PLANE`, `DATA_CHANNEL`
- 网格线和虚线连接
- 橙红节点点 / 连接线
- 右下角 `SCALE 1:200`

下面加 Gallery strip：

```txt
[active diagram] [network topology] [node graph] [metrics] [ring diagram]
```

首版实现：

- 使用静态占位图或 SVG。
- gallery 可只改变 active border，不必切换大图。
- 如果使用 canvas/WebGL，只作为后续增强，不作为首版必要条件。

### 3. SideInfoPanel

包含 TOC、Key Facts、Tags。

```txt
// TABLE OF CONTENTS

01  CONTEXT
02  ARCHITECTURE
03  KEY DECISIONS
04  IMPLEMENTATION
05  STACK
06  OUTCOMES
07  RELATED ARCHIVES

// KEY FACTS

Nodes             128+
Max Peers         1,024
Avg Latency       28ms
Throughput        2.4k msg/s
Consistency       Eventual
Uptime (test)     99.6%

// TAGS

[DISTRIBUTED SYSTEMS] [WEBRTC] [RUST] [TOKIO] [TAILSCALE] [DOCKER]
```

交互：

- 点击 TOC 滚动到对应 section。
- 当前 section 高亮橙红。
- 首版可通过 hash link 实现。

## SectionGrid

下方信息网格建议：

```txt
┌────────────┬────────────┬────────────┬────────────┐
│ Context    │ Architecture│ Decisions  │ Implement. │
├────────────┴────────────┬────────────┬────────────┤
│ Stack                   │ Outcomes   │ Related    │
└─────────────────────────┴────────────┴────────────┘
```

### 01 / Context

用途：说明问题背景。

内容示例：

```txt
Real-time collaboration tools require low-latency synchronization across peers.
Traditional client-server models introduce bottlenecks and single points of failure.
This project explores a peer-to-peer mesh architecture with a lightweight control plane.
```

可加小型网络节点图。

### 02 / Architecture

用途：说明系统结构。

建议图：

```txt
CONTROL PLANE
[DISCOVERY] [ROUTING] [MEMBERSHIP]

MESH LAYER
[NODE] --- [NODE] --- [NODE]

TRANSPORT LAYER
[WebRTC] [QUIC] [Noise Protocol]
```

不要只写文字，Library Detail 必须有结构图或架构示意。

### 03 / Key Decisions

用橙红小方块 bullet：

```txt
■ Used WebRTC DataChannels for NAT traversal and low-latency transport.
■ Adopted CRDT-based state sync for conflict-free replication.
■ gRPC over QUIC for control plane communication.
■ Tailscale for secure mesh connectivity in private networks.
```

### 04 / Implementation

包含实现摘要和文件结构：

```txt
meshnet/
├─ control-plane/
│  ├─ src/
│  └─ Cargo.toml
├─ node/
│  ├─ src/
│  └─ Cargo.toml
├─ proto/
│  └─ meshnet.proto
└─ docker-compose.yml
```

代码块样式：

- 浅底。
- 细线边框。
- mono 字体。
- 不使用深色大代码块，避免破坏页面气质。

### 05 / Stack

表格：

```txt
LANGUAGE        Rust, TypeScript
RUNTIME         Tokio
TRANSPORT       WebRTC, QUIC
NETWORKING      Tailscale
CONTAINERS      Docker
OBSERVABILITY   Prometheus, Grafana
```

### 06 / Outcomes

结果要像工程记录，不要像营销文案。

```txt
- Stable mesh with 128+ nodes in simulated environment.
- Average latency reduced by 42% compared to baseline.
- Successfully handled dynamic joins/leaves without state divergence.
- Open-sourced core libraries and published benchmarks.
```

旁边可加 metrics table：

```txt
METRIC          RESULT
P50 LATENCY     18ms
P95 LATENCY     45ms
THROUGHPUT      2.4k msg/s
PACKET LOSS     0.3%
```

### 07 / Related Archives

展示 3 个相关 Library 卡片：

```txt
Realtime Collaborative Whiteboard
WebGL Scene Optimization Handbook
Internal Tools Catalog
```

使用小型横向卡片，不要复用完整大卡片。

## BottomArchiveNav

```txt
← PREV ARCHIVE     02 / REALTIME COLLABORATIVE WHITEBOARD
04 / WEBGL SCENE OPTIMIZATION HANDBOOK     NEXT ARCHIVE →
```

## 数据加载

Pseudo:

```ts
const entry = libraryEntries.find(item => item.slug === params.slug)

if (!entry) notFound()

const related = libraryEntries.filter(item =>
  entry.relatedSlugs?.includes(item.slug)
)
```

## Entry 数据结构示例

```ts
interface LibraryEntry {
  // ...其他字段
  link?: string // 可选：项目主页 / 文档 / 演示链接
  links?: {
    repository?: string
    demo?: string
    article?: string
  }
  // ...
}
```

- `link` 为可选字符串，若存在则在 `LibraryMetaTable` 中渲染为 `LINK` 行。
- 渲染时会自动补全 `https://` 协议前缀。
- 点击 `LINK` 行将在新标签页打开对应地址。

## 响应式

### Desktop

三列 hero + 多列 section grid。

### Tablet

hero 改为：

```txt
Intro
HeroVisual
SideInfoPanel
SectionGrid 2 columns
```

### Mobile

- TOC 折叠。
- SectionGrid 单列。
- gallery 横向滚动。
- metadata 保持表格式但缩小字号。

## 验收标准

- 详情页明显比 Library Index 信息更深入。
- 有 metadata、hero diagram、TOC、key facts、sections、related archives。
- 至少 6 个结构化 section。
- 技术栈和结果不是普通正文，而是表格 / bullet / metrics 形式。
- 与 Notes Detail 的文章阅读形态明显不同。
