# Notes Index 页面蓝图

路径：

```txt
/notes
```

页面名称：

```txt
Thoughts and Records
```

## 页面目标

展示自由但有秩序的个人笔记索引。  
用户应感到这是一个“思考记录 / 技术日记 / 阅读札记”区域，而不是正式工程档案。

## 页面骨架

```txt
SiteShell(module="NOTES", breadcrumb="// NOTES")
  NotesHero
    IntroPanel
    AbstractVisualPanel

  Body
    FilterPanel
    NotesListPanel
      SortBar
      NotesList
      PaginationBar
```

## 顶部 NotesHero

### IntroPanel

内容：

```txt
// NOTES INDEX

THOUGHTS
AND RECORDS_

A space for reflections, technical notes, and ongoing
thoughts. Ideas in progress, observations, and the
small experiments that shape the work.

→ ABOUT THIS SECTION
```

要求：

- 与 Library title 共享大标题语言，但语气更轻。
- 文案不要太工程项目化。
- 标题下方留白比 Library 更多。

### AbstractVisualPanel

右侧大图使用：

- 黑白建筑照片
- 混凝土墙面
- 抽象几何空间
- 轻量点阵 / 网格 / 橙红小方块

不要使用 Library 那种密集系统轴测图。  
Notes 的 hero visual 应更安静、更像思考空间。

## 主体布局

Desktop：

```css
.notes-index-body {
  display: grid;
  grid-template-columns: 280px 1fr;
}
```

左侧 filter 与 Library 一致，但内容更轻。

## FilterPanel 内容

```txt
// FILTERS                         CLEAR ALL

CATEGORIES
■ ALL                         32
□ TECH                        18
□ LIFE                         8
□ THOUGHTS                     6
□ READING                     14
□ WEBGL                        7
□ SYSTEMS                      5
□ JOURNAL                      9

TAGS (POPULAR)
[Architecture] [WebGL] [Performance]
[Rust] [React] [Productivity]
[Design] [Systems] [Reflection]
```

要求：

- category 列表保持方块 indicator。
- tags 使用轻量 pill，不要像 Library 一样全大写密集标签。
- 点击 tag 可筛选，首版可只做 hover。

## SortBar

```txt
SORT BY:    DATE ↓    CATEGORY ↓    READING TIME ↓              VIEW: [grid] [list]
```

Notes 默认 view 应是 list。  
可以保留 grid icon，但 active 必须是 list 或列表视觉优先。

## NotesList

每行结构：

```txt
2025.05.28
8 MIN READ      |    ON CONSISTENCY IN DISTRIBUTED SYSTEMS
                     Some thoughts on eventual consistency, user mental models,
                     and the cost of coordination in large-scale systems.       TECH →
```

组件 Props：

```ts
type NoteListItemProps = {
  note: NoteEntry;
};
```

视觉：

- 每条 note 占一整行。
- 用横线分隔。
- 日期橙红。
- reading time 较小。
- 标题大写或首字母大写。
- excerpt 最多两行。
- 右侧显示 category + arrow。
- hover 时整行背景轻微变深，箭头右移 4px。

## 示例列表

至少 7 条：

1. On Consistency in Distributed Systems
2. Building with WebGL: What I Learned
3. Designing for Focus
4. A Quiet Week in Shanghai
5. Rust Patterns I Keep Reaching For
6. Reading Notes: The Design of Everyday Things
7. Year-End Review & Next Intentions

## 分页

```txt
← PREV                 01  02  03  04  ...  05                 NEXT →
```

当前页橙红。

## 与 Library Index 的关键差异

| 项目 | Library Index | Notes Index |
|---|---|---|
| 主体 | card grid | vertical list |
| 图片 | 每张卡都有技术缩略图 | 列表不强制图片 |
| 信息 | stack/status/type | date/category/read time |
| 语气 | 工程档案 | 个人思考 |
| hero visual | 轴测系统图 | 抽象建筑图 |

开发 agent 必须保留这些差异。

## 交互逻辑

### category filter

```ts
const filtered = selectedCategory === "all"
  ? notes
  : notes.filter(note => note.category.toLowerCase() === selectedCategory);
```

### search 可作为后续增强

首版不必实现搜索。  
如果实现，放在 SortBar 左侧或 filter panel 内。

## 响应式

### Tablet

- FilterPanel 折叠到上方。
- NotesList 保持单列。
- Hero 图高度缩短。

### Mobile

- 取消左右两列。
- 每条 note 改为：
  ```txt
  date / read time
  title
  excerpt
  category →
  ```
- 右侧 category 不要绝对定位。

## 验收标准

- 页面清楚表达 Notes 是自由笔记区。
- 不是卡片墙。
- 日期、标题、摘要、分类、阅读时间完整。
- 视觉仍属于同一个工业风站点。
- 与 Library Index 有明显结构差异。
