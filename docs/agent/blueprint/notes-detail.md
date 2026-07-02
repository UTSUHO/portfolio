# Note Detail Page

## Design Goal

Note Detail 页面用于阅读技术文章。

整体阅读体验参考建筑杂志、设计刊物和技术白皮书，而不是传统博客。

页面重点是 Typography、节奏和留白。

---

## Layout

采用左右双栏。

```
-------------------------------------------------------

 Content (8)         Table of Contents (4)

-------------------------------------------------------
```

目录固定。

正文滚动。

正文宽度建议控制在 680~760px。

不要铺满屏幕。

---

## Hero

顶部展示：

- Date
- Category
- Read Time
- Title
- Cover Image

例如：

```
2025.05.28

TECH

8 MIN READ

Distributed Systems Consistency
```

标题保持较大字号。

---

## Cover

封面推荐：

- Architecture
- Blueprint
- Concrete
- Industrial
- Wireframe
- Black & White Photography

不要使用：

插画

动漫

风景

人物摄影

---

## Content

正文保持建筑杂志排版。

一级标题：

48px

二级标题：

32px

正文：

16px

Line Height：

1.8

引用：

左侧 Divider。

代码：

黑色背景。

等宽字体。

不要阴影。

---

## Table of Contents

目录固定。

当前章节：

Accent Red。

点击：

平滑滚动。

不要复杂动画。

---

## Bottom Navigation

页面底部包含：

- Previous Note
- Next Note
- Share

布局保持与 Header 一致。

不要设计成 Footer 卡片。

---

## Motion

允许：

- Scroll Progress
- TOC Highlight
- Fade
- Image Reveal
- Code Highlight

禁止：

Bounce

Scale

Large Rotation

复杂滚动特效。

---

## AI Constraints

Agent 必须遵循以下约束：

- 不要生成博客模板
- 不要生成 Medium Clone
- 不要生成 Notion 风格
- 不要生成大面积卡片
- 保持建筑杂志式排版
- 保持 Enerblock 风格
- Typography 是第一优先级