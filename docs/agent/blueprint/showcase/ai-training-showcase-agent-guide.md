# AI Training Showcase — Agent Implementation Guide

> Target stack: **Next.js + React + TypeScript + GSAP + anime.js**  
> Target component: `app/_components/showcase/visuals/ai-training-visual.tsx`  
> Related animation utility: `app/_components/showcase/use-pipeline-animation.ts`  
> Visual target: tall technical showcase panel occupying roughly **33% viewport width** and **near-full viewport height** inside the Showcase section.

---

## 0. Implementation Intent

This task is a **redesign**, not a literal reconstruction of the previous 2×2 dashboard.

The new visual should present the project as a vertically organized engineering narrative:

```text
AI TRAINING PLATFORM
        ↓
JOB QUEUE → SCHEDULER → GPU CLUSTER
        ↓
TRAIN / INFERENCE + RAY → vLLM
        ↓
180s → 20s / DELIVERY OUTCOME
```

The component must still belong to the existing Showcase visual system:

- dark engineering background
- thin semantic border hierarchy
- low-opacity panel fills
- Space Grotesk uppercase labels
- restrained `#f84532` accent
- SVG line / path animation
- GSAP for timeline / path motion
- anime.js for local node feedback

The final result should feel like a **portfolio visual artifact**, not a production admin dashboard.

The visual hierarchy is more important than showing exhaustive operational information.

---

# 1. Core Design Principles

## 1.1 Narrative first

The user should understand the project in approximately this order:

1. This is an **AI training / inference platform**.
2. Tasks flow through a control plane.
3. GPU resources are scheduled and shared.
4. The serving architecture evolved from **Ray → vLLM**.
5. The implementation produced a measurable result: **180s → 20s**.

Do not allow small statistics, utilization bars, or decorative labels to compete with those five messages.

---

## 1.2 Tall composition instead of dashboard grid

The previous implementation was based on a compact 2×2 information grid.

Do **not** keep that layout.

The new component should be a tall vertical instrument panel made of four narrative bands:

```text
┌───────────────────────────────┐
│ 01  HEADER / PROJECT IDENTITY │
├───────────────────────────────┤
│ 02  CONTROL PLANE FLOW        │
├───────────────────────────────┤
│ 03  CLUSTER / SERVE EVOLUTION │
├───────────────────────────────┤
│ 04  PERFORMANCE OUTCOME       │
└───────────────────────────────┘
```

The layout should remain visually readable when the container is narrow.

---

## 1.3 Accent discipline

The accent color is not decorative.

Use red only for:

- active pipeline marker
- current job state
- current scheduler iteration
- selected GPU / utilization highlight
- vLLM node
- `20s`
- `-89%`
- final sparkline endpoint

Most lines, boxes, labels, and bars should remain grayscale / muted blue-gray.

A useful target is:

```text
85–90% neutral
10–15% accent
```

---

# 2. Recommended Component Architecture

Avoid putting all markup directly inside one giant SVG function.

Recommended structure:

```text
ai-training-visual.tsx
├─ AiTrainingVisual
├─ VisualFrame
├─ SectionRail
├─ HeaderBand
├─ ControlPlaneBand
│  ├─ JobQueuePanel
│  ├─ SchedulerPanel
│  └─ GpuClusterPanel
├─ ClusterEvolutionBand
│  ├─ UtilizationPanel
│  └─ ServeEvolutionPanel
└─ PerformanceBand
   ├─ MetricBlock
   └─ Sparkline
```

These subcomponents may remain in the same file initially.

Do not prematurely split them into many files unless the implementation becomes difficult to maintain.

---

## 2.1 Root component

Recommended API:

```tsx
type AiTrainingVisualProps = {
  className?: string
  active?: boolean
}

export function AiTrainingVisual({
  className,
  active = true,
}: AiTrainingVisualProps) {
  // ...
}
```

`active` should allow the parent card or intersection observer to enable / disable animations.

---

# 3. Rendering Strategy

Use a hybrid structure:

```text
HTML wrapper
└─ SVG main visual
   ├─ static geometry
   ├─ labels
   ├─ panels
   ├─ hidden motion path
   ├─ animated marker
   └─ node groups
```

Prefer SVG for the visual itself because:

- line hierarchy remains precise
- pipeline motion is easier
- scaling is deterministic
- path animation is straightforward
- the current design language already uses SVG

Do not rebuild the visual using arbitrary absolute-positioned HTML divs unless needed for accessibility or tooltips.

---

# 4. ViewBox and Spatial System

Use:

```tsx
viewBox="0 0 400 720"
```

or a close equivalent.

The previous `400 × 300` viewBox is no longer appropriate for the vertical design.

Recommended logical dimensions:

```text
width:  400
height: 700–760
```

Use one fixed SVG coordinate system and allow CSS to scale it responsively.

Recommended wrapper:

```css
.visual {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.visual svg {
  display: block;
  width: 100%;
  height: 100%;
}
```

The parent should typically use:

```css
aspect-ratio: 400 / 720;
```

or `height: 100%` if the existing Showcase card already constrains the height.

---

# 5. Vertical Band Allocation

Suggested allocation for a `400 × 720` viewBox:

```text
Outer padding: 16

HEADER
Y = 16 → 150
H ≈ 134

CONTROL PLANE
Y = 160 → 330
H ≈ 170

CLUSTER + SERVE EVOLUTION
Y = 340 → 520
H ≈ 180

PERFORMANCE OUTCOME
Y = 530 → 704
H ≈ 174
```

Maintain approximately 8–12px logical gap between major bands.

---

# 6. Outer Frame

Create one restrained technical frame around the entire visual.

Recommended structure:

```tsx
<rect
  x={8}
  y={8}
  width={384}
  height={704}
  rx={12}
  className={styles.frame}
/>
```

Optionally add small cut-corner paths at top-right / bottom-left.

Do not overuse ornamental geometry.

The outer frame should visually establish the component as one integrated artifact.

---

# 7. Section Rail

Add a thin vertical rail along the left side.

This is an important part of the redesign.

It provides a visual reading order for the tall section.

Structure:

```text
01 ●
   │
02 ●
   │
03 ●
   │
04 ●
```

Recommended placement:

```text
x = 22–30
```

Panel content begins around:

```text
x = 48–56
```

The rail itself uses `line-faint`.

Section numbers may use muted accent:

```text
01
02
03
04
```

Do not animate the rail continuously.

Optional entrance animation only.

---

# 8. Header Band

## 8.1 Purpose

Establish project identity immediately.

Do not fill the top with metrics.

Recommended content:

```text
INFRA // CONTROL PLANE
AI TRAINING
PLATFORM
Open-source AI training & serving platform
integrated into enterprise workflow

[VITE REBUILD] [SCHEDULING]
[GPU CLUSTER]  [RAY → VLLM]
```

---

## 8.2 Typography hierarchy

Suggested logical SVG font sizes:

```text
Eyebrow label: 7–8px
Main title:     25–32px
Subtitle:       8–9px
Tag text:       6.5–7px
```

The title should dominate the upper band.

Do not attempt to imitate the generated image's exact oversized typography if it causes wrapping problems in the actual Showcase layout.

---

## 8.3 Tags

Tags should look like compact system capabilities rather than web UI buttons.

Each tag can be:

```tsx
<g>
  <rect ... />
  <text ...>VITE REBUILD</text>
</g>
```

Use 2 rows if the width is insufficient.

Do not apply hover interaction individually to the tags.

---

# 9. Control Plane Band

This is the principal animated region.

Narrative:

```text
JOB QUEUE → SCHEDULER → GPU CLUSTER
```

The band should contain three nodes / mini-panels.

Recommended width relationship:

```text
JOB QUEUE       30%
SCHEDULER       30%
GPU CLUSTER     32%
inter-panel gap 4%
```

---

## 9.1 Job Queue panel

Keep only three rows:

```text
JOB_1142   RUNNING
JOB_1148   QUEUED
JOB_1156   RETRY
```

Do not create a scroll area.

Status semantics:

```text
RUNNING = accent
QUEUED  = muted warm gray / white
RETRY   = line-label gray
```

`JOB_1142` is the active node referenced by the animation.

Node group:

```tsx
<g ref={jobNodeRef}>
  ...
</g>
```

Avoid scaling the entire panel during pulse.

Pulse only:

- the active row
- its status dot
- optionally a small outer highlight rect

---

## 9.2 Scheduler panel

Display:

```text
FAIR SHARE
PRIORITY
RESOURCE LIMIT
```

Below those lines:

```text
ITER_1   ITER_2   ITER_3
```

Where:

```text
ITER_1 → line-faint
ITER_2 → line-faint
ITER_3 → accent
```

This represents multiple implementation iterations without adding excessive explanation.

The scheduler panel itself is the second animation target.

Use a subtle pulse on the scheduler icon or inner ring, not a dramatic panel zoom.

---

## 9.3 GPU Cluster mini-panel

Avoid trying to show a literal 32-node cluster.

Use a schematic tile matrix, for example:

```text
□ □ ■ □ □
□ ■ □ □ □
□ □ □ ■ □
```

The pattern is symbolic.

Small label:

```text
ACTIVE NODES
16 / 32
```

The exact node count can be changed if it is not factual project data.

If it is only decorative, prefer:

```text
ACTIVE POOL
```

instead of inventing numbers.

---

# 10. Pipeline Geometry

The pipeline should not be a straight horizontal line.

Use a restrained engineering path with one or two 90° corners.

Example:

```svg
<path
  d="M 132 245 H 155 V 222 H 190 M 250 222 H 304"
/>
```

A better implementation is one continuous path:

```tsx
<path
  ref={motionPathRef}
  d={pipelinePath}
  fill="none"
  stroke="transparent"
/>
```

and a visible path below it:

```tsx
<path
  d={pipelinePath}
  className={styles.pipelineBase}
/>
```

The hidden path is used for marker motion.

The visible path remains neutral.

The marker supplies the accent.

---

# 11. PipelineMarker

Continue using the existing `PipelineMarker` abstraction if it already works reliably.

Recommended appearance:

```text
small core dot
+ faint glow ring
+ optional 1px tail
```

Do not make the marker a large neon orb.

Suggested logical size:

```text
core radius: 2–2.5
ring radius: 5–6
```

---

# 12. Pipeline Animation Timeline

Use GSAP as the orchestrator.

Recommended sequence:

```text
0.00    marker enters Job Queue region
0.20    JOB_1142 pulse
0.70    marker reaches Scheduler
0.82    Scheduler pulse
1.55    marker exits Scheduler
2.20    marker reaches GPU Cluster
2.30    GPU-02 / cluster pulse
2.80    marker fade
3.40    repeat
```

Use a total active travel time around:

```text
3.0–3.6s
```

and repeat delay around:

```text
0.8–1.2s
```

This is intentionally slower than the previous implementation.

The animation should be legible, not energetic.

---

# 13. GSAP Responsibility

GSAP should handle:

- component entrance timeline
- path marker position
- path draw reveal
- staggered band introduction
- opacity / translation of major groups

GSAP should **not** be used for every micro animation.

Example responsibility split:

```text
GSAP
├─ section entrance
├─ panel sequencing
├─ pipeline marker motion
└─ sparkline reveal

anime.js
├─ node pulse
├─ status dot pulse
├─ temporary glow
└─ small icon feedback
```

---

# 14. anime.js Responsibility

anime.js should provide brief local feedback when the marker reaches a node.

Suggested animation:

```ts
anime({
  targets: node,
  opacity: [0.72, 1, 0.82],
  scale: [1, 1.025, 1],
  duration: 520,
  easing: 'easeOutQuad',
})
```

Prefer `1.015–1.03` scale.

Do not use large `1.08+` scaling inside the compact SVG.

For SVG groups, ensure `transform-box` and `transform-origin` behave consistently.

Recommended CSS:

```css
.nodePulseTarget {
  transform-box: fill-box;
  transform-origin: center;
}
```

---

# 15. Cluster / Serve Evolution Band

This band explains that the system is more than a queue visual.

Use two subregions:

```text
LEFT:  GPU TRAIN / INFERENCE UTILIZATION
RIGHT: SERVE EVOLUTION
```

At narrow widths these should still remain visually connected.

Use roughly:

```text
60% / 40%
```

---

## 15.1 GPU utilization region

Show at most four GPUs:

```text
GPU-01    TRAIN 63%     INFER 28%
GPU-02    TRAIN 84%     INFER 41%
GPU-03    TRAIN 37%     INFER 14%
GPU-04    TRAIN 22%     INFER 09%
```

The values are visual examples unless they correspond to actual project data.

If no real values exist, replace percentages with abstract normalized bars or use generic labels such as:

```text
HIGH
MED
LOW
```

Do not fabricate factual performance data in a portfolio visual.

Recommended visual distinction:

```text
TRAIN bars     = accent at low opacity
INFERENCE bars = cool gray
GPU-02         = selected row / active emphasis
```

---

## 15.2 Ray → vLLM evolution

This should be represented as architecture evolution, not merely an arrow in text.

Recommended structure:

```text
┌────────────┐
│ RAY SERVE  │
└─────┬──────┘
      │
      ↓
┌────────────┐
│ VLLM ENGINE│
└────────────┘
```

`RAY SERVE`:

- neutral border
- neutral text

`VLLM ENGINE`:

- accent border
- accent title
- slight persistent low-opacity pulse is acceptable

Optional small labels below:

```text
THROUGHPUT
LATENCY
EFFICIENCY
```

These should not imply specific quantified improvements unless supported by project evidence.

---

# 16. Performance Outcome Band

This is the strongest proof point.

It should visually terminate the narrative.

Do not treat it like another equal dashboard panel.

Make it slightly more spacious and visually decisive.

Recommended layout:

```text
LEFT
PERF // DEV SERVER START
180s → 20s
-89% BUILD TIME

RIGHT
small descending sparkline
```

---

## 16.1 Main metric

Hierarchy:

```text
180s      = text-strong
→         = line-strong
20s       = accent
-89%      = accent
BUILD TIME = text-label
```

The `20s` should be the strongest accent in the entire section.

---

## 16.2 Constraint labels

Only add constraints if they are factually correct.

Possible labels:

```text
TEAM: 2 FE
TIME: 6 WEEKS
```

If those values are placeholders, do not ship them.

Safer alternative:

```text
LIMITED DEV RESOURCE
MULTI-ITERATION DELIVERY
```

---

# 17. Sparkline

Use a very simple descending line.

Example points:

```ts
const sparkPoints = [
  [0, 180],
  [1, 120],
  [2, 78],
  [3, 42],
  [4, 20],
]
```

But do not imply those intermediate values were measured unless they actually were.

For a factual-safe version, the graph can be schematic with no numeric y-axis values.

Recommended rendering:

```text
faint grid
thin neutral baseline
accent line
4–5 nodes
final node glowing
```

Animate with stroke dash offset.

---

# 18. Entrance Animation

The component should not animate everything simultaneously.

Suggested entrance timeline:

```text
0.00  outer frame draws
0.10  rail fades in
0.20  header label + title fade / slide
0.45  control plane panel draws
0.70  cluster evolution band appears
0.90  performance band appears
1.20  pipeline loop begins
```

The user should be able to understand the full static composition even if animations are disabled.

---

# 19. Suggested `useLayoutEffect`

Use GSAP context for cleanup.

```tsx
useLayoutEffect(() => {
  if (!active || !svgRef.current) return

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      frameRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 },
    )
      .fromTo(
        '.ai-band',
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.12,
        },
        0.15,
      )
  }, svgRef)

  return () => ctx.revert()
}, [active])
```

Do not use global selectors outside the SVG container.

---

# 20. Pipeline Hook API

Recommended evolution of existing hook:

```ts
usePipelineAnimation({
  containerRef: svgRef,
  pathRef: motionPathRef,
  markerRef,
  nodes: [
    jobNodeRef,
    schedulerNodeRef,
    gpuNodeRef,
  ],
  duration: 3.4,
  loop: true,
  repeatDelay: 1.0,
  startDelay: 1.15,
  enabled: active,
})
```

If possible, allow per-node progress positions:

```ts
nodeStops: [0.12, 0.52, 0.91]
```

This is more robust than assuming equally spaced node timings.

---

# 21. Recommended Hook Behavior

Pseudo-code:

```ts
const tween = gsap.to(marker, {
  duration,
  repeat: loop ? -1 : 0,
  repeatDelay,
  ease: 'none',
  motionPath: {
    path,
    align: path,
    alignOrigin: [0.5, 0.5],
  },
  onUpdate() {
    const progress = tween.progress()

    checkNode(0, progress, 0.12)
    checkNode(1, progress, 0.52)
    checkNode(2, progress, 0.91)
  },
})
```

However, if the current project does not use `MotionPathPlugin`, do not add it simply for this card.

Reuse the current path position implementation.

Avoid introducing another animation dependency.

---

# 22. Reduced Motion

Support `prefers-reduced-motion`.

Required behavior:

```text
Reduced motion ON:
- no continuous marker movement
- no pulsing loop
- no repeated glow
- static final state remains visible
- short fade-in allowed
```

Example:

```ts
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches
```

Or reuse an existing project utility.

---

# 23. Hover Behavior

The parent `ProjectCard` likely already provides hover behavior.

Do not add unrelated per-panel hover interactions.

Recommended behavior on card hover:

```text
line-base   → line-strong on selected outer edges
accent glow → +10–15% opacity
pipeline    → continue normally
```

Do not increase animation speed on hover.

That would make the visual harder to read.

---

# 24. CSS Semantic Classes

Prefer semantic classes rather than inline literal colors.

Suggested additions if missing:

```css
.aiFrame {}
.aiBand {}
.aiPanel {}
.aiPanelMuted {}
.aiDivider {}
.aiLabel {}
.aiLabelStrong {}
.aiAccentText {}
.aiPipeline {}
.aiPipelineMarker {}
.aiNodeActive {}
.aiMetric {}
.aiSparkline {}
```

Keep color values inherited from the existing showcase design system.

Do not create an isolated second palette.

---

# 25. Suggested SVG Layer Order

Use this order:

```text
01 background grid
02 outer frame
03 band backgrounds
04 panel borders
05 static paths / separators
06 charts / GPU bars
07 labels / text
08 hidden motion path
09 visible marker
10 glow overlays
```

This helps avoid clipping and z-order issues.

---

# 26. Background Texture

The generated concept image contains a subtle engineering grid.

Implement this conservatively.

Recommended SVG pattern:

```tsx
<defs>
  <pattern
    id="ai-grid"
    width="12"
    height="12"
    patternUnits="userSpaceOnUse"
  >
    <path
      d="M 12 0 L 0 0 0 12"
      className={styles.gridLine}
      fill="none"
    />
  </pattern>
</defs>
```

Then:

```tsx
<rect
  x="8"
  y="8"
  width="384"
  height="704"
  fill="url(#ai-grid)"
  opacity="0.15"
/>
```

The grid must remain almost invisible.

Do not turn the entire visual into a cyberpunk HUD.

---

# 27. Avoid Visual Overload

The concept render contains many small labels.

The implementation should simplify them.

Target information density:

```text
Header:              5–7 textual items
Control plane:       10–12 textual items
Cluster evolution:  10–14 textual items
Performance:         5–7 textual items
```

Do not reproduce every tiny icon and every statistic from the generated reference.

The actual website should be calmer than the concept art.

---

# 28. Icons

Prefer simple custom SVG geometry over importing a large icon set.

Examples:

```text
Queue      = 3 horizontal bars
Scheduler  = ring / target
GPU        = cube / square grid
Ray        = network nodes
vLLM       = stylized V or text-only node
Performance = line chart
```

Each icon should remain approximately 8–12 SVG units.

---

# 29. Text Content — Recommended Final Copy

Use short labels.

Recommended text:

```text
INFRA // CONTROL PLANE

AI TRAINING
PLATFORM

OPEN-SOURCE TRAINING & SERVING PLATFORM
INTEGRATED INTO ENTERPRISE WORKFLOW

VITE REBUILD
SCHEDULING
GPU CLUSTER
RAY → VLLM
```

Control plane:

```text
CONTROL PLANE // JOB TO GPU

JOB QUEUE
JOB_1142  RUNNING
JOB_1148  QUEUED
JOB_1156  RETRY

SCHEDULER
FAIR SHARE
PRIORITY
RESOURCE LIMIT
ITER_1  ITER_2  ITER_3

GPU CLUSTER
ACTIVE POOL
```

Cluster band:

```text
GPU CLUSTER // TRAIN + INFERENCE
TRAIN
INFERENCE
GPU-01
GPU-02
GPU-03
GPU-04

SERVE EVOLUTION
RAY SERVE
VLLM ENGINE
```

Performance:

```text
PERFORMANCE OUTCOME
PERF // DEV SERVER START
180s → 20s
-89% BUILD TIME
```

---

# 30. Data Truthfulness Requirement

The existing confirmed metric is:

```text
180s → 20s
```

Do not introduce unverified factual claims such as:

```text
16 / 32 GPU nodes
TEAM: 2 FE
TIME: 6 WEEKS
GPU-02 = 84%
specific intermediate build times
specific vLLM throughput increase
```

unless they are supported by actual project data.

For decorative values, either:

1. use abstract bars without numbers, or
2. clearly define them as schematic / illustrative data in code comments.

Portfolio visuals should not accidentally present invented telemetry as factual project results.

---

# 31. Responsive Behavior

This visual is designed for a Showcase column around 1/3 viewport width.

Primary breakpoint assumption:

```text
Desktop visual width ≈ 320–480px
```

On smaller screens:

```text
width: 100%
max-width: 480px
margin-inline: auto
```

Do not try to dynamically reflow internal SVG nodes using JS.

Keep the SVG coordinate system fixed.

Allow the whole composition to scale.

---

# 32. Text Legibility Guardrails

Because the SVG may display at approximately 330–400px wide:

- avoid font sizes below equivalent 6px in viewBox coordinates
- avoid long sentences
- keep status text uppercase
- use `vector-effect="non-scaling-stroke"` selectively if stroke scaling becomes too heavy

Do not use it blindly on every element; scaled strokes can sometimes look too thin on mobile.

---

# 33. Performance Constraints

The component should remain lightweight.

Requirements:

- no canvas
- no WebGL
- no particle system
- no per-frame React state updates
- animation should mutate refs / SVG attributes directly
- no animation-triggered React rerender loop
- only one continuous pipeline loop

GSAP / anime.js should work outside React state.

---

# 34. Cleanup Requirements

All continuous animations must be cleaned up when:

- component unmounts
- `active` becomes false
- card leaves the viewport if existing showcase infrastructure pauses animations

For GSAP:

```ts
ctx.revert()
```

For anime.js:

```ts
anime.remove(target)
```

or equivalent cleanup based on current library version.

Do not leave orphaned RAF loops.

---

# 35. Accessibility

This visual is primarily decorative because the adjacent project metadata contains the semantic project description.

Recommended:

```tsx
<svg
  aria-hidden="true"
  focusable="false"
  ...
>
```

If the SVG itself needs semantic description, use:

```tsx
<title>AI training platform control plane visualization</title>
<desc>
  Jobs move from queue through scheduler to GPU resources,
  with Ray-to-vLLM serving evolution and build time reduced
  from 180 seconds to 20 seconds.
</desc>
```

Do not create keyboard-interactive regions inside the SVG unless there is an actual interaction requirement.

---

# 36. Recommended Implementation Order

Agent should implement in this order:

## Phase 1 — Static composition

- [ ] Change viewBox to tall layout
- [ ] Add outer frame
- [ ] Add left section rail
- [ ] Implement four bands
- [ ] Add typography
- [ ] Implement control plane panels
- [ ] Implement cluster evolution band
- [ ] Implement performance band
- [ ] Verify layout at real card size

Do not add animation before this phase is visually correct.

## Phase 2 — Motion path

- [ ] Add hidden motion path
- [ ] Reuse `PipelineMarker`
- [ ] Connect Job Queue → Scheduler → GPU Cluster
- [ ] Verify marker follows geometry correctly

## Phase 3 — Node feedback

- [ ] Add refs for active job row
- [ ] Add scheduler pulse target
- [ ] Add GPU / cluster pulse target
- [ ] Trigger anime.js on path stop events

## Phase 4 — Entrance animation

- [ ] Add frame draw
- [ ] Add band stagger
- [ ] Add label fade
- [ ] Add sparkline draw

## Phase 5 — Production polish

- [ ] reduced motion
- [ ] cleanup
- [ ] hover integration
- [ ] responsive validation
- [ ] check no fake telemetry is presented as fact

---

# 37. Animation Timing Recommendation

Use roughly this timing table:

| Motion | Duration |
|---|---:|
| Outer frame reveal | 300–450ms |
| Band fade/slide | 350–500ms |
| Band stagger | 80–140ms |
| Label fade | 250–400ms |
| Node pulse | 450–600ms |
| Pipeline traversal | 3.2–3.6s |
| Loop delay | 0.8–1.2s |
| Sparkline draw | 700–1000ms |

The whole visual should feel deliberate, not fast.

---

# 38. Example Root Skeleton

```tsx
'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import anime from 'animejs'

import styles from '../showcase.module.css'
import { PipelineMarker } from '../pipeline-marker'
import { usePipelineAnimation } from '../use-pipeline-animation'

export function AiTrainingVisual() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const motionPathRef = useRef<SVGPathElement | null>(null)
  const markerRef = useRef<SVGGElement | null>(null)

  const jobNodeRef = useRef<SVGGElement | null>(null)
  const schedulerNodeRef = useRef<SVGGElement | null>(null)
  const gpuNodeRef = useRef<SVGGElement | null>(null)

  const nodes = useMemo(
    () => [jobNodeRef, schedulerNodeRef, gpuNodeRef],
    [],
  )

  usePipelineAnimation({
    containerRef: svgRef,
    pathRef: motionPathRef,
    markerRef,
    nodes,
    duration: 3.4,
    loop: true,
    repeatDelay: 1.0,
    startDelay: 1.1,
  })

  useLayoutEffect(() => {
    if (!svgRef.current) return

    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo(
          '[data-ai-frame]',
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
        )
        .fromTo(
          '[data-ai-band]',
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.1,
          },
          0.12,
        )
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 720"
      aria-hidden="true"
      focusable="false"
      className={styles.aiTrainingVisual}
    >
      {/* defs */}
      {/* background + frame */}
      {/* section rail */}
      {/* header */}
      {/* control plane */}
      {/* cluster evolution */}
      {/* performance */}

      <path
        ref={motionPathRef}
        d="M ..."
        fill="none"
        stroke="transparent"
      />

      <PipelineMarker ref={markerRef} />
    </svg>
  )
}
```

This is structural guidance, not mandatory literal code.

The Agent should adapt names and imports to the existing repository conventions.

---

# 39. Acceptance Criteria

The redesign is complete only when all conditions below are true.

## Layout

- [ ] The visual is clearly designed for a tall 1/3-width Showcase section.
- [ ] It no longer reads as a generic 2×2 dashboard.
- [ ] Four vertical narrative bands are visually distinguishable.
- [ ] The left section rail establishes a clear top-to-bottom reading order.
- [ ] No text overlaps at the actual production card size.

## Visual language

- [ ] Uses existing Showcase semantic colors.
- [ ] Accent red remains restrained.
- [ ] Panel fills stay subtle.
- [ ] Typography remains engineering-oriented and consistent.
- [ ] Grid texture is barely visible.
- [ ] Decorative geometry does not dominate content.

## Narrative

- [ ] User can identify `AI TRAINING PLATFORM` first.
- [ ] User can identify `JOB QUEUE → SCHEDULER → GPU CLUSTER` second.
- [ ] `RAY → VLLM` evolution is visible.
- [ ] `180s → 20s` is the strongest result.
- [ ] No unverified telemetry is presented as factual.

## Motion

- [ ] Pipeline loop is slow enough to follow visually.
- [ ] Marker follows the intended control plane path.
- [ ] Each major node has a restrained local pulse.
- [ ] GSAP manages sequencing and path-level motion.
- [ ] anime.js handles local node feedback.
- [ ] Animations clean up correctly.
- [ ] Reduced-motion mode remains visually complete.

## Performance

- [ ] No React state updates occur every frame.
- [ ] No unnecessary dependency is added.
- [ ] No WebGL / canvas is introduced.
- [ ] Component remains smooth inside the Showcase carousel / card environment.

---

# 40. What NOT to Do

Do not:

- rebuild the design as a literal admin dashboard
- create dozens of small cards
- animate every line continuously
- use red for every active-looking element
- add glowing neon borders everywhere
- introduce WebGL
- introduce another icon library only for this visual
- add a new animation library
- use React state for timeline progress
- fabricate GPU utilization / team / time values
- make the pipeline faster than the user can visually follow
- animate full-panel scale aggressively
- recreate every decorative detail from the concept image

---

# 41. Final Visual Character

The completed component should feel like:

```text
technical system diagram
+ product storytelling
+ portfolio editorial composition
```

and not like:

```text
monitoring dashboard
+ cyberpunk HUD
+ dense DevOps console
```

The visual must communicate **engineering structure, architecture evolution, and measurable outcome** with minimal visual noise.

The central sequence should remain legible even when viewed for only a few seconds:

```text
AI TRAINING PLATFORM
      ↓
QUEUE → SCHEDULER → GPU
      ↓
RAY → VLLM
      ↓
180s → 20s
```

That is the core success criterion for the redesign.
