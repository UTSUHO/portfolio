# Agent 开发检查清单

## 第一阶段：共享基础

- [ ] 创建 `SiteShell`
- [ ] 创建 `TopBar`
- [ ] 创建 `SideRail`
- [ ] 创建 `FooterStatus`
- [ ] 创建 CSS variables
- [ ] 创建基础 grid / border / typography 工具类
- [ ] 保证四个页面都能共用外壳

## 第二阶段：数据

- [ ] 创建 `libraryEntries` mock data
- [ ] 创建 `notes` mock data
- [ ] 为每条 Library entry 设置 slug
- [ ] 为每条 Note 设置 slug
- [ ] 实现 `getLibraryEntryBySlug`
- [ ] 实现 `getNoteBySlug`
- [ ] 实现 related / next / previous helper

## 第三阶段：Library Index

- [ ] 实现 Library hero
- [ ] 实现 Library overview panel
- [ ] 实现 FilterPanel
- [ ] 实现 SortBar
- [ ] 实现 LibraryCard
- [ ] 渲染 8 条卡片
- [ ] 实现筛选
- [ ] 实现分页 UI
- [ ] card 点击进入 detail

## 第四阶段：Library Detail

- [ ] 通过 slug 加载 entry
- [ ] 实现 metadata block
- [ ] 实现 technical hero visual
- [ ] 实现 gallery strip
- [ ] 实现 TOC / KeyFacts / Tags
- [ ] 实现 section grid
- [ ] 实现 related archives
- [ ] 实现 prev / next archive

## 第五阶段：Notes Index

- [ ] 实现 Notes hero
- [ ] 实现 notes category filter
- [ ] 实现 popular tags
- [ ] 实现 notes vertical list
- [ ] 实现 date / reading time / category / arrow
- [ ] note 点击进入 detail
- [ ] 与 Library Index 保持明显结构差异

## 第六阶段：Notes Detail

- [ ] 通过 slug 加载 note
- [ ] 实现 ArticleMeta
- [ ] 实现 ArticleTitle
- [ ] 实现 ArticleLead
- [ ] 实现 CoverImage
- [ ] 实现 ArticleBody
- [ ] 实现 right TOC
- [ ] 实现 SharePanel
- [ ] 实现 back / next note

## 第七阶段：响应式

- [ ] 1200px 以上完整桌面布局
- [ ] 768–1199px 两列或折叠侧栏
- [ ] 768px 以下单列
- [ ] SideRail 在移动端不造成内容挤压
- [ ] 所有卡片 / 列表无横向溢出
- [ ] 中文标题移动端不截断

## 第八阶段：交互与动效

- [ ] hover state
- [ ] active filter state
- [ ] active view toggle
- [ ] card/list item arrow animation
- [ ] TOC anchor scroll
- [ ] 页面进入轻微 fade/slide
- [ ] 尊重 `prefers-reduced-motion`

## 最终验收

- [ ] Library 看起来正式、工程化、档案化。
- [ ] Notes 看起来开放、文章化、个人化。
- [ ] 两个模块共享同一个工业风设计系统。
- [ ] 四个页面不是同一模板换字。
- [ ] 所有内容均由数据驱动，而不是硬编码在组件里。
- [ ] 首版不依赖后端服务。
- [ ] 页面在桌面和移动端都可读。
