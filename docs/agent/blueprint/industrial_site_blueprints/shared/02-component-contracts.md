# 共享组件契约

本文定义 Library 与 Notes 都应复用的组件。开发 agent 应优先实现这些组件，再实现页面。

## 1. `SiteShell`

职责：统一页面外壳。

Props：

```ts
type SiteShellProps = {
  module: "LIBRARY" | "NOTES";
  breadcrumb: string; // e.g. "// LIBRARY", "// NOTES / DETAIL"
  children: React.ReactNode;
};
```

渲染结构：

```txt
SiteShell
  SideRail
  MainFrame
    TopBar
    children
    FooterStatus
```

验收标准：

- 所有页面左 rail、topbar、footer 高度一致。
- `module` 决定竖排文字。
- `breadcrumb` 不在页面内部重复硬编码。

## 2. `TopBar`

Props：

```ts
type TopBarProps = {
  breadcrumb: string;
};
```

内容：

```txt
SYSTEM    // LIBRARY              MENU [icon]
```

交互：

- `MENU` 可以先无功能。
- hamburger icon 用 CSS 或简单 SVG，不引入图标库也可以。

## 3. `SideRail`

Props：

```ts
type SideRailProps = {
  label: "LIBRARY" | "NOTES";
};
```

视觉要求：

- 背景橙红。
- 顶部黑色方块。
- 文字竖排。
- 文字不随页面滚动错位。

## 4. `FooterStatus`

Props：

```ts
type FooterStatusProps = {
  name?: string;
  status?: "ONLINE" | "OFFLINE";
};
```

默认：

```txt
© 2025 YOUR NAME    SYSTEM STATUS: ONLINE ●
```

## 5. `SectionLabel`

用于小型标题，例如：

```txt
// FILTERS
// TABLE OF CONTENTS
// KEY FACTS
01 / CONTEXT
```

Props：

```ts
type SectionLabelProps = {
  prefix?: string;     // "//" or "01 /"
  children: string;
  active?: boolean;
};
```

## 6. `FilterPanel`

用于 Library / Notes 索引页的左侧筛选栏。

Props：

```ts
type FilterOption = {
  label: string;
  value: string;
  count: number;
};

type FilterPanelProps = {
  title?: string;
  categories: FilterOption[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  extraGroups?: {
    title: string;
    options: FilterOption[];
    selectedValue?: string;
    onChange?: (value: string) => void;
  }[];
  tags?: string[];
};
```

视觉：

- 选中项为橙红实心小方块。
- 未选中为细线空心方块。
- count 右对齐。
- 不要使用圆形 radio。

## 7. `SortBar`

Props：

```ts
type SortItem = {
  label: string;
  value: string;
};

type SortBarProps = {
  items: SortItem[];
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
};
```

样式：

- `SORT BY:` 左侧。
- 每个字段后带向下箭头。
- 右侧 `VIEW:` + grid/list icon。
- active view icon 用橙红色。

## 8. `Tag`

Props：

```ts
type TagProps = {
  children: string;
  active?: boolean;
  dense?: boolean;
};
```

Library 的 tag 更像工程标签：`RUST / TOKIO / DOCKER`。  
Notes 的 tag 更像轻量 pill：`Design`, `Reflection`, `WebGL`。

## 9. `PaginationBar`

Props：

```ts
type PaginationBarProps = {
  current: number;
  total: number;
  prevLabel?: string;
  nextLabel?: string;
};
```

内容：

```txt
← PREV        01 02 03 04 ... 16        NEXT →
```

## 10. `TocPanel`

Props：

```ts
type TocItem = {
  id: string;
  number: string;
  label: string;
};

type TocPanelProps = {
  items: TocItem[];
  activeId?: string;
  title?: string;
};
```

使用场景：

- Library Detail：目录更短、更工程化。
- Notes Detail：目录更像文章章节，active 高亮更明显。

## 11. `TechnicalThumbnail`

用于 Library 的线框缩略图。

Props：

```ts
type TechnicalThumbnailProps = {
  src?: string;
  variant?: "axonometric" | "diagram" | "chart" | "interface" | "network";
  active?: boolean;
  label?: string;
};
```

第一版可用静态图片；若没有图片，用 SVG 生成伪线框图：

- 网格线
- 节点圆点
- 细线框
- 一个橙红小方块
- 少量技术标签

## 12. `MetaTable`

用于 Library Detail 的 metadata。

Props：

```ts
type MetaRow = {
  label: string;
  value: React.ReactNode;
};

type MetaTableProps = {
  rows: MetaRow[];
};
```

样式：

```txt
TYPE        Research & Prototype
ROLE        Fullstack Engineer
DURATION    2025.03 — 2025.05
STATUS      ■ ARCHIVED
```

## 13. `ArticleBody`

用于 Notes Detail。

要求：

- 支持中文段落。
- 标题格式为 `01 / 标题`。
- 段落行宽不要过长，建议 780–900px。
- 支持列表、引用、代码块。
- 代码块样式要仍然属于工业系统风格：浅底、细边框、mono。
