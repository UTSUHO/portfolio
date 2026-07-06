---
title: "Project Queen Enters Plan Phase"
titleZh: "代号σ 进入企划阶段"
date: "2025.01.15"
category: "Journal"
readingTime: "6 min read"
tags: ["GameDev", "SRPG", "Design", "Mythology"]
coverImage: "/images/contents/fireElement.png"
excerpt: "一款以神话为灵感的奇幻 SRPG 开始从原型进入正式企划阶段。记录核心战斗系统、叙事状态图与 UI 方向的早期决策。"
language: "mixed"
---

# 01 / 当前重点

Project Queen is a fantasy SRPG built around mythology-inspired worldbuilding. After several months of pre-production, the project has moved into formal planning.

The planning phase has two parallel tracks: narrative systems and combat systems. Both need to be defined before production can begin in earnest.

---

# 02 / 叙事系统

The world is constructed as a collection of overlapping mythologies. Player choices do not branch a single story; they reshape which myths are considered true. This creates replay value without requiring massive branching dialogue trees.

> Myth is not backstory. Myth is mechanism.

---

# 03 / 战斗系统

Combat uses a grid-based turn system with a twist: every ability is also a narrative vote. Using a skill pushes the corresponding story thread forward. This means tactical decisions and story decisions are the same decision.

```ts
interface Ability {
  name: string
  range: number
  effect: Damage | Heal | Buff
  thread: FateThread
  weight: number
}
```

---

# 04 / 待解问题

- How granular should fate threads be?
- Should players see the exact weight of each choice?
- Can we make the UI communicate narrative momentum without clutter?

---

# 05 / 下一个里程碑

A vertical slice containing one complete battle, one story beat, and the fate-weave summary screen.
