# 09 — Agent Task Plan

## 总任务

将当前首页右侧的散落彩色 GLB 展示替换为：

```text
Abstract Industrial Architecture Hero
```

技术栈：

```text
React / Next.js
Three.js
GSAP + ScrollTrigger
CSS / DOM overlay
```

## 实施顺序

### Step 1 — 移除旧 GLB 展示

执行：

```text
- 找到当前右侧 GLB / model loader 逻辑
- 暂时删除或注释
- 保留 canvas/stage 容器位置
```

验收：

```text
右侧不再出现彩色散落模型。
```

### Step 2 — 创建 HeroSceneController

执行：

```text
- renderer
- scene
- orthographic camera
- lights
- resize
- dispose
- render loop
```

验收：

```text
右侧 canvas 成功渲染空场景，不报错。
```

### Step 3 — 创建五层建筑体块

执行：

```text
- createMaterials
- createLayer
- createHeroArchitecture
- HERO_LAYERS config
```

验收：

```text
右侧出现 5 个黑白灰 slab layer。
```

### Step 4 — 添加线框边缘

执行：

```text
- 为每个 slab 添加 EdgesGeometry
- 添加 faint guide lines
- 添加 wireframe canopy
```

验收：

```text
建筑从普通盒子变为工程图纸感对象。
```

### Step 5 — 添加 red active node

执行：

```text
- 添加红色 cube
- emissive intensity 控制在 0.45 左右
- render loop 中做轻微 breathing
```

验收：

```text
画面中有一个明确但不过度发光的红色 active node。
```

### Step 6 — 添加 secondary details

执行：

```text
- dark recessed block
- vertical post
- small modular boxes
- transparent/wireframe frame
```

验收：

```text
建筑有基本细节，但不过度复杂。
```

### Step 7 — 添加 pointer parallax

执行：

```text
- bindPointerParallax
- root rotation 小幅变化
```

验收：

```text
鼠标移动时建筑有轻微空间响应。
```

### Step 8 — 添加 scroll explode

执行：

```text
- bindScrollTimeline
- GSAP ScrollTrigger
- layer 根据 explodeOffset 分离
```

验收：

```text
滚动时五层逐渐拆解，但仍保持整体结构。
```

### Step 9 — 添加 annotation overlay

执行：

```text
- HERO_ANNOTATIONS config
- Object3D anchors
- projectToScreen
- DOM labels
```

验收：

```text
建筑周围有少量工程标注。
```

### Step 10 — 最终调构图

执行：

```text
- 调整 camera position
- 调整 root position
- 调整 root scale
- 调整 layer size / position
```

验收：

```text
建筑位于右侧 Hero 区域中央偏右，尺寸足够大，顶部和左侧有呼吸感。
```

## 验收标准

必须满足：

```text
1. 首屏右侧不再出现彩色散落 GLB。
2. 右侧出现一个黑白灰抽象工业建筑体。
3. 建筑有明确的 5 层结构。
4. 有一个红色 active node。
5. 有线框边缘和少量工程标注。
6. 使用 OrthographicCamera 或近似正交构图。
7. 鼠标移动时有轻微 parallax。
8. 滚动页面时建筑层级会轻微拆解。
9. 整体风格符合 industrial / brutalist / architectural blueprint / system dashboard。
```

禁止出现：

```text
- neon cyberpunk
- glassmorphism
- colorful game asset
- rounded soft UI
- glossy sci-fi plastic
- excessive particles
- aggressive camera movement
```

## 可直接给 coding agent 的 Prompt

```text
You are implementing the homepage right-side WebGL hero module.

Replace the current scattered colorful GLB display with an abstract industrial architecture / WebGL information-building. The visual style should match a minimalist brutalist industrial portfolio: off-white background, black/gray concrete-like slabs, thin wireframe edges, sparse red accent node, orthographic architectural composition, and technical annotation overlay.

Implement the system in modular Three.js + GSAP.

Required modules:
1. HeroCanvas React component.
2. HeroSceneController class.
3. createHeroArchitecture().
4. createLayer().
5. createMaterials().
6. bindPointerParallax().
7. bindScrollTimeline().
8. projectToScreen().
9. DOM AnnotationOverlay.

The architecture should contain five layer groups:
- home: 01 HOME / IDENTITY CORE
- projects: 02 PROJECTS / PROJECT STACK
- resume: 03 RESUME / EXPERIENCE ARCHIVE
- library: 04 LIBRARY / KNOWLEDGE GRID
- notes: 05 NOTES / NOTE TERMINAL

Each layer should be a THREE.Group containing:
- one primary BoxGeometry slab
- EdgesGeometry outline
- optional secondary blocks or recesses

Add:
- red active cube node
- wireframe canopy
- vertical guide lines
- sparse annotation anchors

Use OrthographicCamera.
Use subtle pointer parallax.
Use GSAP ScrollTrigger to separate the layers on scroll.
Use DOM labels projected from 3D anchor points rather than TextGeometry.

Keep the animation restrained and architectural.
Do not add colorful models, neon effects, rounded UI, or excessive particles.
```

## 推荐 commit 拆分

```text
commit 1:
  scaffold HeroCanvas + HeroSceneController

commit 2:
  add abstract architecture layers

commit 3:
  add wireframe / active node / secondary details

commit 4:
  add pointer parallax + scroll explode

commit 5:
  add annotation overlay

commit 6:
  tune composition and responsive behavior
```
