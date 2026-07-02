# Resume Page

## Design Goal

Resume 页面不是传统意义上的求职简历，而是一个展示个人工程能力、技术成长和设计理念的 Profile 页面。

整体视觉参考 Enerblock 的工业品牌官网，信息组织参考建筑事务所的介绍页面。

整个页面应该传递：

> This is an engineer's profile, not a recruiter's resume.

避免出现招聘网站模板、时间轴卡片或大量图标。

---

## Layout

采用 12 Column Grid。

```
-------------------------------------------------------
 Header
-------------------------------------------------------

 About (6)              Skills (6)

-------------------------------------------------------

 Experience (8)         Engineering Profile (4)

-------------------------------------------------------

 Open Source (6)        Community (6)

-------------------------------------------------------

 Philosophy

-------------------------------------------------------
```

页面保持统一 Grid，不使用阴影，不使用圆角卡片。

所有区域通过 Divider 和 Typography 建立层级。

---

## Hero

左侧展示个人信息。

包括：

- Name
- Title
- Short Description

例如：

```
HELLO,

I'M YOUR NAME.

Building modern software systems with engineering thinking.
```

右侧展示技能矩阵。

不要使用图标云。

不要使用雷达图。

不要使用圆形进度条。

---

## About

包含：

- Current Position
- Location
- Email
- Availability

保持类似建筑事务所简介。

不要写成长篇自我介绍。

---

## Experience

使用垂直 Timeline。

每段经历包含：

- Year
- Company
- Position
- Description

例如：

```
2025 — NOW

Senior Frontend Engineer

Focused on engineering systems,
developer tooling and architecture.
```

时间轴保持简洁，不添加复杂节点。

---

## Skills

按照领域分类。

推荐：

- Frontend
- Backend
- Infrastructure
- Graphics
- DevOps
- AI

每项技能采用简单水平 Bar。

例如：

```
TypeScript     ██████████ 95%

Rust           ████████░░ 80%
```

不要使用图标。

不要使用颜色渐变。

---

## Engineering Profile

用于展示个人工程能力。

推荐内容：

- Projects
- Years
- OSS Contributions
- Articles
- Talks

采用数字展示：

```
18

Projects

6

Years

200+

Articles
```

不要设计成 Dashboard。

---

## Philosophy

页面底部保留一段 Engineering Philosophy。

描述：

- 如何设计系统
- 如何维护代码
- 如何思考工程

而不是介绍兴趣爱好。

---

## Motion

允许：

- Fade
- Translate
- Timeline Reveal
- Number Counter

禁止：

- Bounce
- Scale
- Complex Rotation

所有动画都应该保持克制。

---

## AI Constraints

Agent 必须遵循以下约束：

- 不要生成招聘网站简历
- 不要生成 Dashboard
- 不要使用 Skill Card
- 不要使用图标云
- 保持 Enerblock 风格
- Typography 优先
- Divider 优先