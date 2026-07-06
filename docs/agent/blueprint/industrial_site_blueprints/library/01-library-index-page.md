# Library Index 页面蓝图

路径：

```txt
/library
```

页面名称：

```txt
Engineering Library
```

## 页面目标

展示正式工程实践归档。  
用户进入页面后应立即理解：这里不是随笔区，而是系统化的工程档案库。

## 页面骨架

```txt
SiteShell(module="LIBRARY", breadcrumb="// LIBRARY")
  HeaderHero
    IntroPanel
    AxonometricVisualPanel
    ThumbnailStack
    LibraryOverviewPanel

  Body
    FilterPanel
    ContentPanel
      SortBar
      LibraryGrid
      PaginationBar
```

## 顶部 HeaderHero

### 1. IntroPanel

内容：

```txt
// LIBRARY INDEX

ENGINEERING
LIBRARY_

A curated archive of engineering practice, system
design, experiments, and implementation records.

→ ABOUT THIS LIBRARY
```

样式：

- 左侧占 hero 的约 32% 宽。
- 大标题 56–68px。
- 红色短横 `_` 跟在标题末尾。
- intro 文案使用 mono 或小号 sans。
- 保持大量留白。

### 2. AxonometricVisualPanel

位于 hero 中间。  
显示工程线框图 / 建筑式系统图 / 轴测图。

第一版实现方式：

- 可使用静态图片。
- 若无图片，用 SVG 画线框：网格、矩形体、节点点阵、红色连接线。
- 添加小标签如 `AXO_VIEW_01`、`SCALE 1:250`。

不要使用彩色 3D 渲染大图。

### 3. ThumbnailStack

在大图右侧竖向排列 3 个小缩略图。

要求：

- 当前 active 缩略图边框为橙红。
- 其他缩略图低透明度。
- 每个缩略图可以点击切换大图，首版可不实现真实切换，但 hover 要有状态。

### 4. LibraryOverviewPanel

右侧信息卡：

```txt
// LIBRARY OVERVIEW

TOTAL ITEMS        128
PROJECTS           56
EXPERIMENTS        24
DOCUMENTATION      31
TOOLS & ASSETS     17

LAST UPDATED       2025.05.30
CURATED BY         YOUR NAME
STATUS             ACTIVE
```

要求：

- 右对齐数字。
- 使用横线分组。
- 不要使用图表，这里是档案 metadata。

## 主体 Body

### 布局

```txt
┌───────────────┬─────────────────────────────┐
│ FilterPanel   │ SortBar                     │
│               ├────────┬────────┬──────────┤
│               │ Card   │ Card   │ Card ... │
└───────────────┴─────────────────────────────┘
```

建议 desktop：

```css
.library-index-body {
  display: grid;
  grid-template-columns: 280px 1fr;
}
```

### FilterPanel 内容

```txt
// FILTERS                         CLEAR ALL

CATEGORIES
■ ALL                       128
□ SYSTEMS                    24
□ WEBGL                      18
□ FRONTEND ENGINEERING       22
□ TOOLS                      17
□ INFRASTRUCTURE             12
□ RESEARCH NOTES             15
□ CASE STUDY                 20

STATUS
■ ALL STATUS                128
□ PUBLISHED                  96
□ IN PROGRESS                24
□ ARCHIVED                    8
```

交互：

- 点击分类后更新 query state。
- `CLEAR ALL` 重置所有筛选。
- 当前选中项红色实心方块。
- 可用 URL query 保存状态，例如 `/library?category=webgl&status=published`。

### SortBar 内容

```txt
SORT BY:    YEAR ↓    TOPIC ↓    TYPE ↓    STATUS ↓                VIEW: [grid] [list]
```

首版只需 UI 状态和本地排序函数：

- Year：date desc / asc
- Topic：category alphabetic
- Type：type alphabetic
- Status：status alphabetic

### LibraryGrid

默认 desktop 4 列 × 2 行。  
Tablet 2 列。Mobile 1 列。

每张卡片结构：

```txt
01 /                                      2025.05

[technical thumbnail]

REALTIME COLLABORATIVE
WHITEBOARD

Architecture and implementation of a
real-time whiteboard system.

WEBRTC / WEBSOCKET / YJS / REACT
```

Props 建议：

```ts
type LibraryCardProps = {
  entry: LibraryEntry;
  variant?: "grid" | "list";
};
```

卡片视觉：

- 细边框。
- 无圆角或极小圆角。
- 缩略图区域固定高度。
- 编号红色。
- title uppercase / bold。
- tags 使用斜杠分隔。
- hover 时边框加深，小红方块或箭头出现。

### Library 条目示例

首版可使用 8 条 mock：

1. Realtime Collaborative Whiteboard
2. Distributed Mesh Network System
3. WebGL Scene Optimization Handbook
4. Shader Study Archive
5. Design System Documentation
6. Performance Observability Platform
7. Internal Tools Catalog
8. System Architecture Patterns

## 底部 PaginationBar

```txt
← PREV                 01  02  03  04  05  ...  16                 NEXT →
```

当前页码橙红。

## 交互逻辑

### 筛选

```ts
const filtered = entries
  .filter(byCategory)
  .filter(byStatus)
  .filter(byType);
```

### 排序

```ts
const sorted = filtered.sort(compareBySelectedSort);
```

### 分页

首版可以固定 pageSize = 8。

## 验收标准

- 页面一眼看出是正式工程档案库。
- 至少渲染 8 个 Library 条目。
- 左侧 filter 与右侧 card grid 分区清晰。
- Library overview metadata 存在。
- 与 Notes Index 的列表型布局明显不同。
- 所有可点击项有 hover 状态。
- 响应式下不出现横向溢出。
