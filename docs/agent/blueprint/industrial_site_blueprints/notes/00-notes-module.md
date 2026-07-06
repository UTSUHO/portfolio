# Notes 模块蓝图

## 模块定位

Notes 是个人思考与记录区。  
它可以收纳还未形成正式工程归档的内容。

包括：

- 技术日记
- 阅读笔记
- 设计反思
- 工程中的零散观察
- WebGL 实验心得
- 生活 / 城市 / 工作节奏观察
- 阶段性复盘

## 与 Library 的区别

| 维度 | Library | Notes |
|---|---|---|
| 内容成熟度 | 较高，已归档 | 可在进行中 |
| 表达方式 | 结构化工程记录 | 文章、笔记、随想 |
| 视觉 | 卡片 / 档案 / 图纸 | 列表 / 阅读 / 留白 |
| 详情页 | 系统文档式 | 文章阅读式 |
| 图像 | 技术图 / 架构图 | 建筑照片 / 抽象图 / 少量技术图 |

## 视觉原则

Notes 的关键词：

```txt
reflective / open / editorial / lightweight / personal / exploratory
```

保留站点工业风，但做出以下差异：

- 内容区更像文章列表，不是网格卡片。
- 留白更多。
- 标题和日期更突出。
- 筛选栏更轻。
- 图像可使用黑白建筑摄影或抽象空间。
- 详情页主轴是阅读体验，而不是系统事实表。

## 页面

```txt
/notes            Notes Index
/notes/[slug]     Notes Detail
```

## 分类建议

```txt
All
Tech
Life
Thoughts
Reading
WebGL
Systems
Journal
```

Popular Tags：

```txt
Architecture
WebGL
Performance
Rust
React
Productivity
Design
Systems
Reflection
```

## 内容要求

每条 note 至少有：

- title
- date
- category
- readingTime
- excerpt
- slug

详情页额外有：

- 文章标题
- 文章摘要
- cover image
- TOC
- body sections
- next note / back to notes
- share links

## Agent 开发提示

开发 Notes 时要避免套用 Library 的卡片系统。  
Index 页优先使用纵向列表。  
Detail 页优先考虑可读性、段落节奏和右侧目录。
