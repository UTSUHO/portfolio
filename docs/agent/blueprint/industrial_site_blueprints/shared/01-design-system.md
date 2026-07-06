# 共享设计系统蓝图

## 设计关键词

```txt
industrial / editorial / archive / system UI / blueprint / architectural / monochrome / precise grid
```

整体应像“工业系统控制台 + 建筑图纸 + 技术档案”的混合界面，而不是普通作品集模板。

## 色彩 Token

建议先定义 CSS variables：

```css
:root {
  --bg: #f4f1ea;
  --bg-soft: #eeeae1;
  --panel: #f8f6f0;
  --ink: #111418;
  --ink-muted: #5c5f63;
  --line: rgba(17, 20, 24, 0.22);
  --line-strong: rgba(17, 20, 24, 0.42);
  --accent: #ff3b22;
  --accent-deep: #e52b18;
  --dark: #10151a;
  --dark-line: rgba(255, 255, 255, 0.16);
  --white: #fffdf7;
}
```

使用原则：

- 背景以浅米白为主，不使用纯白大面积铺底。
- 主文字接近黑色。
- 次级说明用冷灰。
- 线条使用低透明度黑色。
- 橙红只用于当前状态、模块栏、编号、active、短横标记、小方块、进度线。
- 黑色暗区可用于首页或部分区块，但 Library / Notes 页面主体建议以浅色为主。

## 字体与排版

不强制具体字体，但需要形成以下层级：

```css
--font-sans: Inter, Arial, Helvetica, "PingFang SC", "Microsoft YaHei", sans-serif;
--font-mono: "IBM Plex Mono", "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

### 英文标题

- 大标题：48–72px，font-weight 800，letter-spacing 可略紧。
- 模块标签：11–13px，uppercase，mono。
- 卡片标题：18–24px，bold / uppercase。

### 中文标题

中文详情页标题不要硬拉字距。推荐：

```css
.article-title-zh {
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.02em;
}
```

正文中文：

```css
.article-body {
  font-size: 15px;
  line-height: 1.85;
}
```

## 页面外壳

所有页面共享：

```txt
┌─────────────────────────────────────────────┐
│ TopBar: SYSTEM // MODULE              MENU  │
├──────┬──────────────────────────────────────┤
│ Rail │ Page Content                         │
│      │                                      │
├──────┴──────────────────────────────────────┤
│ FooterStatus                                │
└─────────────────────────────────────────────┘
```

### `SideRail`

- 宽度：64–78px desktop。
- 背景：`--accent`。
- 顶部小黑方块：约 10–14px。
- 竖排模块名：`LIBRARY` 或 `NOTES`。
- 文本方向可用 `writing-mode: vertical-rl` 或 transform rotate。
- 移动端可压缩成顶部横向模块条。

### `TopBar`

内容：

```txt
SYSTEM      // LIBRARY                     MENU  [hamburger]
SYSTEM      // LIBRARY / DETAIL            MENU  [hamburger]
SYSTEM      // NOTES                       MENU  [hamburger]
SYSTEM      // NOTES / DETAIL              MENU  [hamburger]
```

样式：

- 高度 52–58px。
- 单像素底线。
- 左侧 `SYSTEM` 使用 mono bold。
- breadcrumb 使用 `//` 风格。
- 右侧 Menu 区保持可点击。

### `FooterStatus`

内容：

```txt
© 2025 YOUR NAME                         SYSTEM STATUS: ONLINE ●
```

要求：

- 与顶部一样使用细线隔开。
- 状态点使用黑色或橙红，保持极简。
- 不要加复杂社交链接，社交链接放详情页侧栏即可。

## 网格系统

建议：

```css
.page {
  display: grid;
  grid-template-columns: 72px 1fr;
  min-height: 100vh;
}

.main {
  display: grid;
  grid-template-rows: 56px 1fr auto;
}
```

内容区常用列：

```txt
Library Index:
[filter 280px] [content fluid]

Library Detail:
[intro 32%] [hero 44%] [side 24%]
下方为 4 列信息网格

Notes Index:
[filter 280px] [note list fluid]

Notes Detail:
[article fluid] [toc 280px]
```

## 图形语言

使用三类视觉素材：

1. 技术线框缩略图：适合 Library
2. 系统架构图 / 节点图 / 性能图：适合 Library detail
3. 建筑 / 混凝土 / 抽象结构照片：适合 Notes

素材可以先用占位图或 SVG 线框实现。不要使用彩色照片破坏整体风格。

## 动效建议

动效应轻量、克制：

- 页面进入：opacity + translateY(8px)，150–250ms。
- 卡片 hover：边框变强、橙红小方块移动或显现。
- filter active：橙红方块从 outline 变 fill。
- TOC active：文字橙红。
- 不使用复杂滚动触发作为首版依赖。

## 响应式规则

### Desktop ≥ 1200px

完整保留左 rail、右 sidebar、多列布局。

### Tablet 768–1199px

- Library Index：卡片从 4 列降到 2 列。
- Library Detail：右 TOC 可移动到标题下方或隐藏为 sticky dropdown。
- Notes Index：filter 可折叠。
- Notes Detail：TOC 移到文章上方。

### Mobile < 768px

- SideRail 改为顶部横向模块栏。
- 所有内容单列。
- hero 图缩短。
- FooterStatus 分两行。
- 过滤器折叠为 `Filter` 按钮。
