# Industrial System Color Specification (Layered Palette)

## 0. Overview

This document defines a **layered color system** for an industrial-style personal portfolio.

Goal:

> Avoid flat “white page” UI
> Build **visual hierarchy through surfaces**

---

## 1. Core Concept

Color is NOT decoration.

Color is used to define:

```text
Surface hierarchy
Information priority
System segmentation
```

---

## 2. Color Tokens

### Base Layer

```css
--bg: #F5F5F3;          /* global background */
```

---

### Surface Layers (CRITICAL)

```css
--surface-light: #FFFFFF;   /* content panels */
--surface-dark: #0A0A0A;    /* system / core sections */
```

Rules:

* Always alternate surfaces across sections
* Never use a single background for entire page

---

### Text

```css
--text: #0A0A0A;
--text-invert: #FFFFFF;
--muted: #6B6B6B;
```

---

### Structure

```css
--line: #DCDCDC;
```

Used for:

* dividers
* grid lines
* section boundaries

---

### Accent

```css
--accent: #FF4D3A;
```

Rules:

* Only for interaction / highlight
* Never used as primary background
* Avoid large blocks (unless intentional emphasis section)

---

## 3. Surface Usage Model (IMPORTANT)

### Page must be composed of multiple layers:

```text
Layer 1 → Background (bg)

Layer 2 → Content panels (surface-light)

Layer 3 → System sections (surface-dark)

Layer 4 → Accent highlights (accent)
```

---

## 4. Layout Color Distribution

### Recommended Structure

```text
[ HERO ]
bg + light surface

[ PROJECTS ]
dark surface (primary visual focus)

[ RESUME ]
light surface

[ NOTES ]
optional accent or light

[ FOOTER ]
dark surface
```

---

## 5. Section Mapping

### Hero

* Background: `--bg`
* Text: `--text`
* Visual area: optional dark surface

---

### Projects (PRIMARY SECTION)

* Background: `--surface-dark`
* Text: `--text-invert`

This section is the **visual core of the page**

---

### Resume / Library

* Background: `--surface-light`
* Text: `--text`

---

### Notes

Two options:

#### Option A (safe)

* `--surface-light`

#### Option B (highlight)

* `--accent`
* Text: black

---

### Footer

* `--surface-dark`
* minimal content
* system-like status

---

## 6. Tailwind Mapping

```js
extend: {
  colors: {
    bg: "#F5F5F3",
    surface: {
      light: "#FFFFFF",
      dark: "#0A0A0A",
    },
    text: "#0A0A0A",
    "text-invert": "#FFFFFF",
    muted: "#6B6B6B",
    line: "#DCDCDC",
    accent: "#FF4D3A",
  },
}
```

---

## 7. Component Usage Examples

### Section

```tsx
<section className="bg-surface-dark text-text-invert py-24">
```

---

### Light Section

```tsx
<section className="bg-bg text-text py-24">
```

---

### Accent Section (rare)

```tsx
<section className="bg-accent text-black py-24">
```

---

### Divider

```tsx
<div className="h-px bg-line w-full" />
```

---

## 8. Visual Balance Rules

1. At least one **dark section above the fold**
2. No more than **2 accent sections per page**
3. Dark sections must contain **high-value content**
4. Light sections must dominate reading areas

---

## 9. Anti-Patterns

DO NOT:

* Use only white background everywhere
* Use accent as primary background
* Mix too many colors
* Add gradients or glow effects

---

## 10. Final Principle

```text
Industrial UI = Contrast between surfaces

NOT color richness
NOT visual effects
```

> Structure defines style
