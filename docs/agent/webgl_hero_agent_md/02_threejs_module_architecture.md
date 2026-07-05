# 02 — Three.js Module Architecture

## 模块结构图

```text
HeroCanvas
├── HeroSceneController
│   ├── createRenderer()
│   ├── createScene()
│   ├── createCamera()
│   ├── createLights()
│   ├── createHeroArchitecture()
│   ├── bindPointerParallax()
│   ├── bindScrollTimeline()
│   ├── updateAnnotations()
│   ├── resize()
│   └── dispose()
│
├── HeroArchitecture
│   ├── rootGroup
│   ├── layerGroups
│   │   ├── G_01_HOME
│   │   ├── G_02_PROJECTS
│   │   ├── G_03_RESUME
│   │   ├── G_04_LIBRARY
│   │   └── G_05_NOTES
│   │
│   ├── frameGroup
│   ├── edgeGroup
│   ├── activeNode
│   └── annotationAnchors
│
├── AnnotationOverlay
│   ├── project 3D anchor to 2D
│   ├── render DOM labels
│   └── draw leader lines
│
└── ScrollState
    ├── activeIndex
    ├── scrollProgress
    ├── explodedProgress
    └── nav sync
```

## 推荐目录结构

```text
src/
├── components/
│   ├── home/
│   │   ├── HomePage.tsx
│   │   ├── TopSystemBar.tsx
│   │   ├── LeftIdentityPanel.tsx
│   │   ├── BottomNavigation.tsx
│   │   └── RightHeroStage.tsx
│   │
│   └── webgl/
│       ├── HeroCanvas.tsx
│       ├── AnnotationOverlay.tsx
│       └── types.ts
│
├── webgl/
│   ├── hero/
│   │   ├── HeroSceneController.ts
│   │   ├── createHeroArchitecture.ts
│   │   ├── createLayer.ts
│   │   ├── createEdges.ts
│   │   ├── createMaterials.ts
│   │   ├── createAnnotations.ts
│   │   ├── heroLayerConfig.ts
│   │   ├── heroAnnotationConfig.ts
│   │   ├── bindPointerParallax.ts
│   │   ├── bindScrollTimeline.ts
│   │   └── projectToScreen.ts
│   │
│   └── utils/
│       ├── disposeObject.ts
│       └── resizeRenderer.ts
│
└── styles/
    ├── home.css
    └── hero-annotations.css
```

## 关键模块说明

### `HeroCanvas.tsx`

React 容器组件。

职责：

```text
- 创建 canvas 容器 div
- 初始化 HeroSceneController
- 在 unmount 时 dispose
```

### `HeroSceneController.ts`

Three.js 生命周期控制器。

职责：

```text
- renderer
- scene
- camera
- lights
- animation loop
- resize
- cleanup
- scroll / pointer binding
```

### `createHeroArchitecture.ts`

建筑体创建函数。

职责：

```text
- 创建 rootGroup
- 创建五个 layer group
- 添加 secondary details
- 添加 red active node
- 添加 wireframe canopy
- 添加 vertical guide lines
- 创建 annotation anchors
```

### `bindPointerParallax.ts`

鼠标视差。

职责：

```text
- 监听 pointermove
- 根据鼠标位置轻微调整 root rotation
```

### `bindScrollTimeline.ts`

滚动拆解。

职责：

```text
- 创建 GSAP timeline
- 注册 ScrollTrigger
- 根据滚动进度移动 layer
- 轻微调整 root rotation / activeNode
```

### `AnnotationOverlay.tsx`

DOM 标注层。

职责：

```text
- 读取 projected annotation positions
- 渲染 label
- 后续可加 SVG leader lines
```

## 设计原则

1. WebGL 不承载大段文字。
2. 文字标注优先使用 DOM。
3. 建筑体用原生几何搭建，不依赖 GLB。
4. 所有层级必须能独立移动。
5. 所有动画必须能 dispose。
