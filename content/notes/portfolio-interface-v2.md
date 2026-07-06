# 01 / 为什么重建

The previous version relied on component libraries that abstracted layout decisions away. This version rebuilds every surface from borders, grids, and type scale. The result is an interface that behaves more like a control panel than a marketing site.

> "A portfolio is a system for presenting systems."

---

# 02 / 语义颜色 Token

All components reference semantic variables. Primitive colors live only in the global theme. This keeps the door open for future themes without rewriting components.

```css
--color-bg: var(--color-primitive-white);
--color-text: var(--color-primitive-black);
--color-accent: var(--color-primitive-red);
```

---

# 03 / 网格布局

Every page uses a 12-column grid with zero gutters. Panels and borders create structure instead of margins or shadows. The left sidebar and top status bar are fixed, leaving the content area as a stable coordinate system.

---

# 04 / 接下来

The foundation is stable. Future work will focus on content depth: project detail pages, note articles, and richer interaction states.
