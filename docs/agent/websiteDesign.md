# 当前网站设计风格规范

> 本文档基于 `app/` 目录下实际实现抽取，用于指导后续页面/组件保持一致的工业系统风格。

---

## 1. 设计概述

**风格定位**：工业系统界面 / 个人作品集

**核心特征**：
- 类终端/系统监控面板的网格化布局
- 高对比度的黑白灰配色，辅以单一高饱和红色作为交互强调
- 等宽字体主导信息层级，搭配无衬线字体用于正文
- 大量使用边框、面板、标签栏、状态栏等系统 UI 元素
- 左右分栏：左侧固定视觉边栏，右侧内容区

**设计原则**：
- 颜色用于定义表面层级和信息优先级，而非装饰
- 通过面板、边框、网格构建视觉结构
- 保持克制：不使用渐变、阴影、发光效果

---

## 2. 色彩系统

### 2.1 原始色值（Primitive Colors）

定义于 `app/globals.css` 的 `@theme` 中，**不直接在组件中使用**：

```css
--color-primitive-cream:      #f5f5f3;   /* 奶油色，页面底层背景 */
--color-primitive-white:      #ffffff;   /* 纯白，内容面板背景 */
--color-primitive-black:      #0a0a0a;   /* 近黑，反转背景/文字 */
--color-primitive-dark:       #13181d;   /* 深灰蓝，展示区块背景 */
--color-primitive-gray:       #6b6b6b;   /* 中灰，次要文字 */
--color-primitive-border:     #dcdcdc;   /* 浅灰，主边框 */
--color-primitive-red:        #f84532;   /* 红色，强调色 */
--color-primitive-dark-grid:  #1a1a1a;   /* 暗色网格 */
--color-primitive-dark-line:  #333333;   /* 暗色分隔线 */
```

### 2.2 语义色值（Semantic Colors）

组件唯一引用的颜色层，便于统一换肤：

```css
/* Background */
--color-bg:            var(--color-primitive-white);   /* 页面主背景 */
--color-bg-primary:    var(--color-primitive-white);   /* 面板背景 */
--color-bg-invert:     var(--color-primitive-black);   /* 反转背景（底部状态栏） */
--color-bg-accent:     var(--color-primitive-red);     /* 强调背景（当前选中的 Tab） */

/* Text */
--color-text:          var(--color-primitive-black);   /* 主文字 */
--color-text-invert:   var(--color-primitive-white);   /* 反转文字 */
--color-text-secondary: var(--color-primitive-gray);   /* 次要/辅助文字 */

/* Accent */
--color-accent:        var(--color-primitive-red);     /* 强调色：红点、链接悬停、进度条 */

/* Border / Divider */
--color-border:        var(--color-primitive-border);  /* 主边框 */
--color-border-invert: var(--color-primitive-dark-line); /* 深色模式下的边框 */

/* Decorative */
--color-grid:          var(--color-primitive-dark-grid);  /* 装饰网格 */
--color-subtle:        var(--color-primitive-dark-line);  /* 弱化边框/深色面板分隔 */
```

### 2.3 当前页面中的实际用色分布

| 区域 | 背景 | 文字 | 说明 |
|------|------|------|------|
| 页面全局 | `--color-bg` (#ffffff) | `--color-text` (#0a0a0a) | 整体为白色调 |
| 顶部状态栏 | `--color-bg-primary` | `--color-text-secondary` | 带底部边框 |
| 底部状态栏 | `--color-bg-invert` (#0a0a0a) | `--color-text-secondary` | 系统信息条 |
| 内容面板 | `--color-bg-primary` | `--color-text` | Panel / SubSection 等 |
| 展示区块 | `#13181d` | 默认 | 首页 PROJECT_SHOWCASE 背景 |
| 强调元素 | `--color-accent` (#f84532) | 视情况 | 红点、选中态、进度条 |

---

## 3. 字体排版

### 3.1 字体栈

```css
--font-sans:    "Inter", system-ui, sans-serif;
--font-display: "Space Grotesk", system-ui, sans-serif;
```

`Space Grotesk` 用于大标题、Hero 姓名、WebGL  slot 索引等展示性文字。
`Inter` 用于正文、列表、描述等可读性文字。

### 3.2 字号规范

| 场景 | 字体 | 字号 | 样式 |
|------|------|------|------|
| Hero 姓名 | Space Grotesk | 96px | bold, leading-none |
| Tab 编号/标签 | Space Grotesk | 30px | 等宽感， uppercase |
| 面板标题 | Inter / system | 12px | font-mono, uppercase, tracking-wider |
| 正文/描述 | Inter | 13px | 常规 |
| 辅助信息 | Inter | 12px | text-text-secondary |
| 状态栏 | mono | 12px | uppercase, tracking-wider |
| WebGL slot 索引 | Space Grotesk | 10px | uppercase, letter-spacing 0.05em |

### 3.3 文本样式模式

- 标签/标题：`text-xs font-mono uppercase tracking-wider`
- 状态指示：大写 + 等宽 + 字间距加宽
- 次要说明：统一使用 `text-text-secondary`
- 悬停链接：`group-hover:text-accent transition-colors`

---

## 4. 布局结构

### 4.1 全局骨架

```
┌─────────────────────────────────────────────┐
│  左侧固定边栏 (64px)  │   顶部状态栏 (96px)   │
│                       ├───────────────────────┤
│                       │                       │
│   视觉边界线          │     主内容区          │
│   (mix-blend-mode:    │                       │
│    difference)        │                       │
│                       ├───────────────────────┤
│                       │   底部状态栏 (32px)   │
└─────────────────────────────────────────────┘
```

### 4.2 布局 Token

```css
--height-status:   96px;   /* 顶部状态栏高度 */
--height-navbar:  192px;   /* 首页 Tab 导航高度 */
--width-sidebar:   64px;   /* 左侧边栏宽度 */
```

### 4.3 内容区规则

- 主内容区通过 `padding-left: var(--width-sidebar)` 为左侧边栏留空
- 各页面内容包裹在 `max-w-7xl mx-auto` 内，保持居中
- 页面内边距统一为 `p-6`
- 面板与网格之间使用 `gap-0` + 边框实现无缝拼接

---

## 5. 核心组件规范

### 5.1 `Section`

全宽区块容器，用于首页垂直滚动切换。

```tsx
<Section
  id="dashboard"
  backgroundColor="#FFFFFF"
  className="snap-start h-screen flex flex-col"
  name="SECTION_NAME"      // 可选，显示左上角 //   SECTION_NAME 标记
>
```

- 必须设置 `id` 和 `backgroundColor`
- 支持 `name` 属性在左上角渲染混差模式标题
- 内部常使用 12 列网格 `lg:grid-cols-12`

### 5.2 `SubSection`

带标题栏的内容子区块。

```tsx
<SubSection
  title="LOG_OUTPUT"
  count="3 ENTRIES"
  backgroundColor="bg"      // 可选：bg / bg-primary / bg-invert / bg-accent
  textColor="text"
  borderColor="border"
>
```

- 标题栏高度固定 32px (`h-8`)
- 左侧有 8px 红色方块 `bg-accent`
- 标题与计数器分别左右对齐

### 5.3 `Panel`

通用面板容器。

```tsx
<Panel title="WORKS" count="7 ENTRIES" redSquare>
```

- 默认白色背景 + 浅灰边框
- 标题栏样式与 SubSection 一致
- `redSquare` 控制是否显示左侧红点

### 5.4 `DataRow`

数据列表行，用于作品、日志等条目。

```tsx
<DataRow
  index="01"
  title="作品标题"
  category="类型"
  year="2025"
  href="/works/01"
/>
```

- 高度 48px (`h-12`)
- 左侧索引为灰色
- 标题为主文字，字号 13px
- 右侧分类/年份为灰色
- 悬停时左侧内边距增加 (`hover:pl-6`)，箭头变红

### 5.5 `Button`

描边按钮，悬停反色。

```css
inline-block px-6 py-3 border border-text bg-transparent text-text
hover:bg-text hover:text-bg
text-body font-medium uppercase tracking-wider
```

### 5.6 `Divider`

水平分隔线，支持 `invert` 切换深色变体。

### 5.7 `Label`

小号灰色大写标签。

---

## 6. 页面结构

### 6.1 首页 (`/`)

三个全屏 Section，垂直 snap 滚动：

1. **Dashboard / Hero**
   - 12 列网格：左侧 4 列身份面板，右侧 8 列视觉区 + TabNav
   - 显示姓名、身份标签、当前项目、ETR 时间
   - HeroVisual 渲染 3D 模型（Three.js / GLTF）

2. **Showcase**
   - 深色背景 `#13181d`
   - 三等分 WebGLSlot 网格
   - 每个 slot 带索引 `[00]`、`[01]`、`[02]` 和 WEBGL 标签

3. **Terminal**
   - 白色背景
   - 左右两栏：LOG_OUTPUT + METRICS
   - 模拟终端输出样式

### 6.2 作品页 (`/projects`)

- 单个 `Panel` 包裹 `DataRow` 列表
- 7 条作品记录
- 与首页 Showcase 不同，此处为浅色面板风格

### 6.3 简历页 (`/resume`)

- 12 列网格：左侧 7 列 RESUME_LOG，右侧 5 列 SKILL_MATRIX / INTERESTS / LINKS
- 简历日志使用表格式布局：时间戳 + 事件 + 详情
- 技能使用红色进度条

### 6.4 库页 (`/library`)

- 游戏分类三栏网格
- 底部 ESSAYS 面板链接 PDF

### 6.5 日志页 (`/notes`)

- SYSTEM_LOG 面板
- 每条日志：日期 + `[CATEGORY]` 标签 + 标题 + 详情
- 移动端堆叠，桌面端两列

---

## 7. 交互与动效

### 7.1 悬停效果

- 链接/行：`transition-colors duration-150 hover:text-text` 或 `group-hover:text-accent`
- DataRow：`hover:pl-6` 产生轻微位移反馈
- 按钮：`hover:bg-text hover:text-bg` 反色填充

### 7.2 光标闪烁

Hero 姓名后的下划线使用 CSS 动画：

```css
.cursor-blink {
  animation: blink 1s step-end infinite;
}
```

### 7.3 3D 视觉

- 首页 HeroVisual 加载 `/portal2.glb` 模型
- 初始 120 帧内执行 `easeOutCirc` 旋转入场
- 之后启用 OrbitControls 自动旋转

### 7.4 左侧边栏动态

`SidebarVisual` 监听 `[data-section-id]` 元素的可见性，当前实现会收集各区块颜色（虽未在 UI 上直观变色，但保留了颜色映射机制）。

### 7.5 移动端

- TabNav 在桌面端显示为 6 列网格（5 个导航 + 1 个菜单按钮）
- 小屏下使用 Sheet 抽屉式底部菜单
- 网格布局在移动端折叠为单列

---

## 8. 设计原则与反模式

### 8.1 应该做的

- 使用语义颜色 Token，不直接写死色值
- 保持 12 列网格系统
- 面板标题栏统一使用 `h-8` + 红点 + uppercase mono
- 使用 `border-border` 构建面板边界
- 重要状态/交互使用 `accent` 红色
- 使用 `mix-blend-mode: difference` 处理跨背景文字

### 8.2 不应该做的

- 不要引入渐变、阴影、发光效果
- 不要使用圆角（当前系统基本无圆角）
- 不要使用多种强调色
- 不要破坏左侧 64px 边栏与顶部 96px 状态栏的固定结构
- 不要在大面积区域使用 `accent` 作为背景

---

## 9. Tailwind / CSS 速查

```css
/* 常用组合 */
bg-bg-primary text-text border-border
bg-bg-invert text-text-secondary
bg-accent text-text
font-mono text-xs uppercase tracking-wider
h-8 px-4 flex items-center gap-2
snap-start h-screen flex flex-col
grid grid-cols-1 lg:grid-cols-12 gap-0
```

---

## 10. 文件索引

- 全局样式：`app/globals.css`
- 根布局：`app/layout.tsx`
- 首页：`app/page.tsx`
- 组件目录：`app/components/`
- 字体加载：`app/layout.tsx` 通过 Google Fonts 引入 Inter + Space Grotesk
