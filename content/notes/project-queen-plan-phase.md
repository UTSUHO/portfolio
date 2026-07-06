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
