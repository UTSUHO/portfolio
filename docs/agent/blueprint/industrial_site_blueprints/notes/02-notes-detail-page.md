# Notes Detail 页面蓝图

路径：

```txt
/notes/[slug]
```

页面示例标题：

```txt
关于分布式系统中一致性的一些思考
```

## 页面目标

提供一篇 note / essay 的阅读页面。  
它应更像“工业风文章阅读界面”，不是工程项目详情页。

## 页面骨架

```txt
SiteShell(module="NOTES", breadcrumb="// NOTES / DETAIL")
  ArticleLayout
    ArticleMain
      ArticleMeta
      ArticleTitle
      ArticleLead
      CoverImage
      ArticleBody
    ArticleSide
      TocPanel
      SharePanel

  BottomNoteNav
```

Desktop：

```css
.notes-detail-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
}
```

## ArticleMeta

内容：

```txt
2025.05.28      TECH      •      8 MIN READ
```

规则：

- category 使用橙红。
- 日期使用 mono。
- reading time 小写或 uppercase 均可，但全站统一。

## ArticleTitle

中文示例：

```txt
关于分布式系统中一致性的一些思考_
```

英文示例：

```txt
ON CONSISTENCY IN DISTRIBUTED SYSTEMS_
```

要求：

- title 最大视觉权重。
- 中文标题不强制 uppercase。
- 标题末尾保留橙红短横。
- 行距紧凑但不可拥挤。

## ArticleLead

示例：

```txt
在设计分布式系统时，一致性是一个核心的命题。CAP 定理告诉我们，
在分区容错性（P）存在的情况下，一致性（C）和可用性（A）无法同时满足。
```

要求：

- 1–2 行。
- 作为摘要，不进入正文 section。
- 中文标点正常显示。

## CoverImage

内容类型：

- 黑白建筑照片
- 混凝土空间
- 抽象结构
- 单色 WebGL 线框图

样式：

- 宽幅横图。
- 高度约 230–320px desktop。
- 灰度 / 低饱和。
- 可叠加极轻微 grid line，不要加重。

## ArticleBody

正文 section 格式：

```txt
01 / 一致性模型

常见的一致性模型包括：强一致性、顺序一致性、因果一致性、最终一致性等。

— 强一致性：所有节点在同一时刻看到相同的数据。
— 顺序一致性：系统保证在任意时刻所有节点在同一序列上。
— 因果一致性：因果相关的操作顺序被所有节点一致地感知。
— 最终一致性：系统保证经过足够的时间后，最终所有节点会达到一致。

02 / 权衡与取舍
...
```

建议 section：

1. 一致性模型
2. 权衡与取舍
3. 实践经验
4. 结语

排版规则：

- 正文宽度不要超过 900px。
- 段落行距 1.75–1.9。
- section 之间使用细分割线。
- bullet 使用短横 `—` 或自定义列表，不使用默认大黑点。
- 中文正文不使用过窄的 mono 字体；mono 只用于日期、编号、小标签。

## ArticleSide

### TocPanel

内容：

```txt
// TABLE OF CONTENTS

01 / 一致性模型
02 / 权衡与取舍
03 / 实践经验
04 / 结语
```

要求：

- 当前 section 橙红。
- sticky top 可选。
- 点击后 anchor scroll。
- mobile 时移到正文上方。

### SharePanel

内容：

```txt
// SHARE

Twitter      →
GitHub       →
LinkedIn     →
```

首版可以链接到占位地址。  
如果不需要社交分享，可改为：

```txt
// RELATED

Previous Note →
Next Note →
```

## BottomNoteNav

```txt
← BACK TO NOTES                                      NEXT NOTE →
```

底部仍有 `FooterStatus`。

## 数据加载

Pseudo:

```ts
const note = notes.find((item) => item.slug === params.slug);

if (!note) notFound();

const nextNote = getNextNote(note.slug);
```

如果用 MDX：

```ts
const { frontmatter, content } = await loadNote(params.slug);
const toc = extractHeadings(content);
```

## MDX Frontmatter 建议

```md
---
title: "On Consistency in Distributed Systems"
titleZh: "关于分布式系统中一致性的一些思考"
date: "2025.05.28"
category: "Tech"
readingTime: "8 min read"
tags: ["Distributed Systems", "Architecture", "Consistency"]
coverImage: "/images/notes/concrete-geometry.jpg"
excerpt: "Some thoughts on eventual consistency, user mental models, and the cost of coordination."
---
```

## 与 Library Detail 的关键差异

| 项目 | Library Detail | Notes Detail |
|---|---|---|
| 主体 | metadata + hero diagram + section grid | article + cover image + text flow |
| 右侧栏 | TOC + key facts + tags | TOC + share |
| 内容 | 架构、实现、指标 | 观点、解释、经验 |
| 视觉 | 信息密集 | 阅读留白 |
| 图片 | 技术图 | 建筑 / 抽象 / 单图 |

## 响应式

### Desktop

- 主文 + 右侧 TOC。
- TOC 可 sticky。

### Tablet

- TOC 移到标题下方。
- CoverImage 保持横图。

### Mobile

- 单列。
- ArticleMeta 换行。
- 标题字号约 34–42px。
- TOC 折叠或放正文前。
- SharePanel 放到文章末尾。

## 验收标准

- 页面读起来像一篇文章，而不是项目卡片详情。
- 中文排版清晰，不拥挤。
- 有 meta、title、lead、cover、body、toc、share、bottom nav。
- 与 Notes Index 之间路由连通。
- 与 Library Detail 视觉共享，但结构明显不同。
