# Notes Index Page

## Design Goal

Notes Index 是整个网站的知识档案入口，而不是博客首页。

整体应该更接近：

- Research Archive
- Knowledge Base
- Laboratory Records

而不是：

- Medium
- WordPress
- Notion Blog

---

## Layout

采用左右布局。

```
-------------------------------------------------------

 Sidebar (3)          Notes List (9)

-------------------------------------------------------
```

左侧固定。

右侧滚动。

整体保持大量留白。

---

## Sidebar

包含以下内容：

- Categories
- Years
- Tags
- Statistics
- Search

例如：

```
TECH

32

SYSTEM

18

LIFE

9
```

采用列表。

不要使用 Tag Cloud。

不要设计成 Dashboard。

---

## Notes List

每篇文章展示：

- Date
- Title
- Category
- Read Time
- Arrow

例如：

```
2025.05.28

Distributed Mesh Networking

TECH

8 MIN

→
```

每条之间使用 Divider。

不要使用 Card。

不要使用摘要卡片。

---

## Filter

支持：

- Category
- Year
- Tag

所有筛选保持列表形式。

不要使用彩色 Tabs。

不要使用 Pills。

---

## Search

搜索框保持极简。

仅使用 Border。

不要使用阴影。

不要使用圆角。

---

## Empty State

当没有数据时：

```
NO RECORD FOUND

Try another keyword.
```

保持工业风。

---

## Motion

允许：

- Divider Expand
- Fade
- Arrow Translate
- Background Color Change

Hover：

背景变为 Accent。

文字变白。

箭头向右移动。

禁止：

Scale

Bounce

Card Lift

---

## AI Constraints

Agent 必须遵循以下约束：

- 不要生成博客模板
- 不要生成 Masonry
- 不要生成 Pinterest 风格
- 不要生成 Card Grid
- 保持 Research Archive 风格
- 保持 Enerblock 的工业布局