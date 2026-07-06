# 工业风个人网站：Library / Notes 开发蓝图总入口

## 目标

把当前工业风个人网站中的 `Library` 与 `Notes` 两个模块落地为可开发页面。  
本蓝图面向开发 agent，要求 agent 按模块、页面、组件、数据结构逐步实现，而不是自由发挥视觉风格。

## 核心判断

`Library` 与 `Notes` 共享同一个站点设计系统，但语义不同：

| 模块 | 语义 | 视觉气质 | 内容形态 |
|---|---|---|---|
| Library | 正式工程实践归档 | 系统化、档案化、工程文档感 | 项目、系统、实验、工具、架构记录 |
| Notes | 自由笔记与思考 | 更轻、更开放、更像文章流 | 技术日记、阅读札记、设计反思、随笔 |

不要把 `Library` 做成普通博客，也不要把 `Notes` 做成工程项目卡片库。

## 设计基准

已有视觉稿包括：

1. Library Index：工程文献库 / 工程实践归档索引页
2. Library Detail：分布式网状网络系统详情页
3. Notes Index：个人笔记管理 / 思考记录索引页
4. Notes Detail：关于分布式系统一致性的文章详情页

开发时以这些稿件为高层视觉约束，不要求像素级复刻，但必须保留：

- 左侧高饱和橙红竖向模块栏
- 顶部 `SYSTEM // MODULE` 导航条
- 浅米白背景、黑色主字、细线网格、橙红强调
- 工业 / 建筑 / 蓝图 / 线框图形语言
- 大标题 + 小型系统状态 + 页面编号 + 表格式元信息
- 严格分区的页面骨架

## 推荐路由结构

如果项目使用 Next.js App Router，可使用：

```txt
app/
  library/
    page.tsx
    [slug]/
      page.tsx
  notes/
    page.tsx
    [slug]/
      page.tsx
```

如果项目不是 Next.js，也保持同等路由语义：

```txt
/library
/library/:slug
/notes
/notes/:slug
```

## 文件阅读顺序

开发 agent 应按以下顺序阅读蓝图：

```txt
00-agent-entry.md
shared/01-design-system.md
shared/02-component-contracts.md
shared/03-content-data-schema.md

library/00-library-module.md
library/01-library-index-page.md
library/02-library-detail-page.md

notes/00-notes-module.md
notes/01-notes-index-page.md
notes/02-notes-detail-page.md
```

## 实施顺序

1. 先实现共享页面外壳：`SiteShell`、`TopBar`、`SideRail`、`FooterStatus`
2. 实现设计 token：颜色、边框、字号、网格、间距
3. 建立 Library 与 Notes 的 mock 数据
4. 开发 Library Index
5. 开发 Library Detail
6. 开发 Notes Index
7. 开发 Notes Detail
8. 做响应式适配
9. 增加轻量动效与交互状态
10. 检查两个模块的视觉区分度

## 全局禁止项

- 不要使用圆角卡片堆叠成普通 SaaS Dashboard。
- 不要使用大面积渐变、玻璃拟态、霓虹风。
- 不要让 Library 和 Notes 使用完全一样的卡片样式。
- 不要让图形素材喧宾夺主；线框图、建筑照片、系统图都应服务于内容分区。
- 不要把所有页面都做成滚动长页；应保留工业界面式的分页和结构感。
- 不要依赖真实后端；第一版可用本地 mock data / markdown / mdx。
