# WebGL Industrial Architecture Exploded Diagram — Agent Implementation Spec

## 0. Purpose

Build a scroll-controlled WebGL section that visualizes a software / research project architecture as an **industrial functional building diagram**.

The visual should resemble a clean architectural blueprint / technical line drawing:

- isometric or axonometric view;
- cream / off-white background;
- thin black and gray wireframe lines;
- red accent lines for data flow, active layer, key nodes;
- modular industrial structures: towers, platforms, tanks, bridges, pipes, control rooms;
- each software layer is mapped to one detachable 3D building layer;
- scrolling causes layers to separate from the assembled structure;
- synchronized text panels explain the currently active layer.

Primary stack:

```txt
Three.js + GSAP ScrollTrigger + HTML/CSS/SVG overlay
```

Recommended project assumption:

```txt
Vite + TypeScript
```

Do not use Blender or imported 3D assets for the MVP. Generate geometry procedurally with Three.js primitives.

---

## 1. Final Interaction Goal

The section behaves like this:

```txt
Stage 00 — Overview
The full industrial architecture is assembled.
Camera shows the whole system.
All layers are visible in muted gray linework.

Stage 01 — Infrastructure Layer
Foundation blocks, server room, GPU cluster, networking base detach downward-left.
Red nodes highlight runtime and deployment infrastructure.

Stage 02 — Data Layer
Data storage, vector database, document tanks, and retrieval warehouse detach left / front.
Red data-flow line starts from data intake.

Stage 03 — Core Engine Layer
Central tower rises upward.
Reasoning engine, model inference, optimization, and RAG pipeline are emphasized.

Stage 04 — Orchestration Layer
Bridge, scheduler tower, agent loop, tool-calling layer detach rightward.
Control-flow lines become visible.

Stage 05 — Product Layer
Dashboard / analytics / visualization control room lifts upward-right.
Product-facing layer is highlighted.

Stage 06 — External Services
External API blocks and data-source tanks detach outward.
Final exploded view remains visible with all labels.
```

---

## 2. Visual Language

### 2.1 Style Keywords

```txt
industrial architecture
technical blueprint
axonometric diagram
wireframe scaffold
machine tower
modular processing plant
thin line drawing
red annotation nodes
engineering callouts
white / cream background
minimal monochrome UI
```

### 2.2 Palette

```ts
export const palette = {
  background: 0xf7f5ef,
  surface: 0xf4f1ea,
  edgeDark: 0x222222,
  edgeMid: 0x666666,
  edgeLight: 0x999999,
  grid: 0xcfcac0,
  red: 0xff3b2f,
};
```

### 2.3 Material Rules

Use transparent meshes only as faint volume hints. The diagram should mainly be defined by lines.

```ts
const materials = {
  invisibleSurface: new THREE.MeshBasicMaterial({
    color: 0xf7f7f3,
    transparent: true,
    opacity: 0.035,
    depthWrite: false,
  }),

  softSurface: new THREE.MeshBasicMaterial({
    color: 0xf4f1ea,
    transparent: true,
    opacity: 0.10,
    depthWrite: false,
  }),

  edgeDark: new THREE.LineBasicMaterial({
    color: 0x222222,
    transparent: true,
    opacity: 0.55,
  }),

  edgeLight: new THREE.LineBasicMaterial({
    color: 0x999999,
    transparent: true,
    opacity: 0.22,
  }),

  accentRed: new THREE.LineBasicMaterial({
    color: 0xff3b2f,
    transparent: true,
    opacity: 0.95,
  }),
};
```

---

## 3. Information Mapping

Map software architecture into industrial architecture.

| Software Concept | Industrial Visual Metaphor |
|---|---|
| Infrastructure / runtime | foundation slab, server room, GPU block, networking base |
| Data layer | tanks, warehouse, vector database tower, document intake |
| Processing / embedding | conveyor bridge, pipe corridor, modular processing line |
| Core engine | central high tower, reactor, inference chamber |
| Orchestration | scheduler tower, bridge, control room, agent-loop pipes |
| Product layer | dashboard room, observation cabin, analytics terminal |
| External services | detached API blocks, external tanks, satellite modules |
| Data flow | red pipe / red polyline |
| Control flow | black dashed or thin gray line |
| Current active layer | stronger opacity + red nodes + visible label group |

---

## 4. Recommended Directory Structure

```txt
src/
  main.ts
  styles.css

  webgl/
    SceneRoot.ts
    CameraRig.ts
    RendererRoot.ts

    architecture/
      architectureData.ts
      types.ts
      ArchitectureLayer.ts
      LayerManager.ts

    factory/
      IndustrialBuildingFactory.ts
      PrimitiveFactory.ts
      TowerFactory.ts
      BridgeFactory.ts
      PipeFactory.ts
      GridFactory.ts

    style/
      IndustrialMaterials.ts
      LineStyles.ts

    animation/
      ScrollDirector.ts
      ExplodeTimeline.ts
      CameraTimeline.ts
      HighlightTimeline.ts

    labels/
      LabelManager.ts
      CalloutManager.ts
      ScreenProjector.ts

    interaction/
      RaycastPicker.ts
      HoverController.ts

    utils/
      dispose.ts
      math.ts
      easing.ts
```

MVP can start with fewer files:

```txt
src/
  main.ts
  styles.css
  webgl/
    data.ts
    materials.ts
    primitives.ts
    scene.ts
    scroll.ts
    labels.ts
```

---

## 5. Data Model

Create the architecture from config, not from hardcoded scene logic.

### 5.1 Types

```ts
export type Vec3Tuple = [number, number, number];

export type ModuleType =
  | "block"
  | "tower"
  | "mainTower"
  | "storage"
  | "bridge"
  | "pipe"
  | "platform"
  | "external";

export type ArchitectureModuleConfig = {
  id: string;
  type: ModuleType;
  label: string;
  position: Vec3Tuple;
  size: Vec3Tuple;
  rotation?: Vec3Tuple;
  accent?: boolean;
  anchor?: Vec3Tuple;
};

export type ArchitectureLayerConfig = {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  explode: Vec3Tuple;
  modules: ArchitectureModuleConfig[];
};
```

### 5.2 Architecture Data

```ts
export const architectureLayers: ArchitectureLayerConfig[] = [
  {
    id: "infrastructure",
    index: 1,
    title: "Infrastructure Layer",
    subtitle: "Runtime, deployment, GPU, storage",
    description:
      "The foundation layer supports execution, deployment, networking, storage, and compute resources.",
    bullets: ["Servers", "GPU Cluster", "Storage", "Networking"],
    explode: [-1.6, -0.45, 0.9],
    modules: [
      {
        id: "server-base",
        type: "block",
        label: "Server Base",
        position: [-3.3, 0.2, 0.2],
        size: [1.5, 0.45, 1.2],
        accent: true,
      },
      {
        id: "gpu-node",
        type: "tower",
        label: "GPU Node",
        position: [-2.0, 0.6, 0.0],
        size: [0.75, 1.1, 0.75],
      },
    ],
  },

  {
    id: "data",
    index: 2,
    title: "Data Layer",
    subtitle: "Documents, vectors, index, retrieval",
    description:
      "The data layer stores raw documents, chunked data, embeddings, indexes, and retrieval structures.",
    bullets: ["Data Storage", "Vector Database", "Index", "Retrieval"],
    explode: [-1.1, 0.05, 1.25],
    modules: [
      {
        id: "document-tank",
        type: "storage",
        label: "Document Tanks",
        position: [-1.5, 0.75, 0.0],
        size: [1.4, 1.5, 1.4],
        accent: true,
      },
      {
        id: "vector-db",
        type: "tower",
        label: "Vector DB",
        position: [-0.15, 0.9, 0.0],
        size: [0.85, 1.7, 0.85],
      },
    ],
  },

  {
    id: "core",
    index: 3,
    title: "Core Engine Layer",
    subtitle: "Reasoning, inference, optimization, RAG",
    description:
      "The core tower represents the project’s main reasoning, inference, optimization, and generation logic.",
    bullets: ["Reasoning Engine", "Model Inference", "Optimization", "RAG Pipeline"],
    explode: [0.0, 1.25, 0.0],
    modules: [
      {
        id: "core-engine-tower",
        type: "mainTower",
        label: "Core Engine",
        position: [0.4, 1.65, 0.0],
        size: [1.4, 3.3, 1.4],
        accent: true,
      },
    ],
  },

  {
    id: "orchestration",
    index: 4,
    title: "Orchestration Layer",
    subtitle: "Scheduler, agent loop, tools, state",
    description:
      "The orchestration layer coordinates tasks, agents, tool calls, memory, and state transitions.",
    bullets: ["Task Scheduler", "Agent Loop", "Tool Calling", "State Manager"],
    explode: [1.25, 0.25, -0.4],
    modules: [
      {
        id: "scheduler-bridge",
        type: "bridge",
        label: "Scheduler Bridge",
        position: [1.75, 0.95, 0.0],
        size: [2.0, 0.22, 0.35],
        accent: true,
      },
      {
        id: "control-tower",
        type: "tower",
        label: "Control Tower",
        position: [3.0, 1.25, 0.0],
        size: [0.85, 2.3, 0.85],
      },
    ],
  },

  {
    id: "product",
    index: 5,
    title: "Product Layer",
    subtitle: "Dashboard, analytics, UI",
    description:
      "The product layer exposes the system through dashboards, analytics, visualizations, and user interfaces.",
    bullets: ["Dashboard", "Analytics", "Visualization", "User Interface"],
    explode: [0.75, 0.9, -1.0],
    modules: [
      {
        id: "dashboard-room",
        type: "block",
        label: "Dashboard Room",
        position: [3.25, 2.7, 0.0],
        size: [1.0, 0.75, 1.0],
        accent: true,
      },
    ],
  },

  {
    id: "external",
    index: 6,
    title: "External Services",
    subtitle: "APIs, tools, data sources",
    description:
      "External services are shown as detached modules connected by red and gray flow lines.",
    bullets: ["Third-party APIs", "External Tools", "Data Sources"],
    explode: [1.5, -0.15, -1.2],
    modules: [
      {
        id: "api-block",
        type: "external",
        label: "External API",
        position: [4.6, 0.45, -0.3],
        size: [1.2, 0.55, 1.0],
        accent: true,
      },
      {
        id: "source-tanks",
        type: "storage",
        label: "Data Sources",
        position: [5.4, 0.7, 0.65],
        size: [1.0, 1.1, 1.0],
      },
    ],
  },
];
```

---

## 6. Three.js Scene Structure

Use a few stable root groups.

```txt
scene
  └─ sceneRoot
      ├─ buildingGroup
      │   ├─ layer_infrastructure
      │   ├─ layer_data
      │   ├─ layer_core
      │   ├─ layer_orchestration
      │   ├─ layer_product
      │   └─ layer_external
      │
      ├─ helperGridGroup
      │   ├─ ground grid
      │   ├─ vertical guide lines
      │   └─ bounding boxes
      │
      └─ flowGroup
          ├─ red data-flow lines
          └─ gray control-flow lines
```

Class shape:

```ts
export class ArchitectureLayer {
  id: string;
  index: number;
  group: THREE.Group;
  originalPosition: THREE.Vector3;
  explodedPosition: THREE.Vector3;
  modules: THREE.Object3D[];

  constructor(config: ArchitectureLayerConfig) {
    this.id = config.id;
    this.index = config.index;
    this.group = new THREE.Group();
    this.originalPosition = new THREE.Vector3(0, 0, 0);
    this.explodedPosition = new THREE.Vector3(...config.explode);
    this.modules = [];
  }
}
```

---

## 7. Primitive Factory

### 7.1 Wire Box

```ts
export function createWireBox(
  size: [number, number, number],
  surfaceMaterial: THREE.Material,
  edgeMaterial: THREE.Material,
): THREE.Group {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, surfaceMaterial);

  const edgeGeometry = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(edges);
  return group;
}
```

### 7.2 Tower

A tower is a vertical stack of wire boxes plus scaffold lines.

```ts
export function createWireTower(
  size: [number, number, number],
  levels = 4,
): THREE.Group {
  const group = new THREE.Group();
  const [w, h, d] = size;
  const levelHeight = h / levels;

  for (let i = 0; i < levels; i++) {
    const box = createWireBox([w, levelHeight * 0.86, d], materials.softSurface, materials.edgeDark);
    box.position.y = i * levelHeight + levelHeight / 2;
    group.add(box);
  }

  const topFrame = createWireBox([w * 1.12, 0.08, d * 1.12], materials.invisibleSurface, materials.accentRed);
  topFrame.position.y = h + 0.08;
  group.add(topFrame);

  return group;
}
```

### 7.3 Storage Tanks

Use cylinders with edge outlines.

```ts
export function createStorageCluster(): THREE.Group {
  const group = new THREE.Group();

  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      const geo = new THREE.CylinderGeometry(0.16, 0.16, 0.8, 16, 1);
      const mesh = new THREE.Mesh(geo, materials.invisibleSurface);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), materials.edgeDark);
      const tank = new THREE.Group();
      tank.add(mesh, edges);
      tank.position.set(x * 0.38, 0.4, z * 0.38);
      group.add(tank);
    }
  }

  return group;
}
```

### 7.4 Red Node

```ts
export function createRedNode(radius = 0.035): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xff3b2f }),
  );
}
```

### 7.5 Data Flow Polyline

```ts
export function createPolyline(
  points: THREE.Vector3[],
  material: THREE.LineBasicMaterial,
): THREE.Line {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
}
```

---

## 8. Camera

Use `OrthographicCamera` for blueprint-like axonometric output.

```ts
export function createCamera(aspect: number): THREE.OrthographicCamera {
  const frustumSize = 7.5;
  const camera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    100,
  );

  camera.position.set(6.5, 5.2, 6.5);
  camera.lookAt(0.8, 1.3, 0.0);
  return camera;
}
```

Camera should move subtly. Avoid dramatic rotation.

```txt
Overview:          position (6.5, 5.2, 6.5), lookAt (0.8, 1.3, 0.0)
Infrastructure:   slight lower lookAt
Data:             slight left shift
Core:             slight zoom in
Orchestration:    slight right shift
Product:          slight upward-right emphasis
External:         zoom out to full exploded view
```

---

## 9. GSAP ScrollTrigger

### 9.1 Pin Section

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createScrollTimeline(layers: ArchitectureLayer[], camera: THREE.OrthographicCamera) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".industrial-architecture-section",
      start: "top top",
      end: "+=5200",
      scrub: 1,
      pin: true,
    },
  });

  layers.forEach((layer, i) => {
    const t = i + 0.35;

    tl.to(
      layer.group.position,
      {
        x: layer.explodedPosition.x,
        y: layer.explodedPosition.y,
        z: layer.explodedPosition.z,
        duration: 0.85,
        ease: "power2.inOut",
      },
      t,
    );

    tl.to(
      layer.group.rotation,
      {
        y: layer.group.rotation.y + 0.025,
        duration: 0.85,
        ease: "power2.inOut",
      },
      t,
    );

    tl.to(
      `[data-panel="${layer.id}"]`,
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
      },
      t,
    );

    tl.to(
      `[data-panel="${layer.id}"]`,
      {
        opacity: 0,
        y: -18,
        duration: 0.25,
      },
      t + 0.65,
    );
  });

  tl.to(
    camera,
    {
      zoom: 1.05,
      duration: 1,
      onUpdate: () => camera.updateProjectionMatrix(),
    },
    2.0,
  );

  tl.to(
    camera,
    {
      zoom: 0.92,
      duration: 1,
      onUpdate: () => camera.updateProjectionMatrix(),
    },
    5.4,
  );

  return tl;
}
```

### 9.2 Stage Index

Update `01 / 06` text by ScrollTrigger progress.

```ts
function updateStageIndex(progress: number) {
  const stage = Math.min(6, Math.max(1, Math.floor(progress * 6) + 1));
  const el = document.querySelector(".stage-index");
  if (el) el.textContent = `${String(stage).padStart(2, "0")} / 06`;
}
```

Add this to ScrollTrigger `onUpdate`.

---

## 10. HTML / CSS Layout

### 10.1 HTML

```html
<section class="industrial-architecture-section">
  <canvas id="webgl-canvas" class="webgl-canvas"></canvas>

  <div class="diagram-title">
    <div class="title-main">PROJECT ARCHITECTURE</div>
    <div class="title-sub">INDUSTRIAL DIAGRAM</div>
    <div class="stage-index">01 / 06</div>
  </div>

  <div class="text-panels">
    <article class="stage-panel" data-panel="infrastructure">
      <div class="panel-number">01</div>
      <h3>Infrastructure Layer</h3>
      <p>Runtime, deployment, GPU cluster, storage, and networking.</p>
    </article>

    <article class="stage-panel" data-panel="data">
      <div class="panel-number">02</div>
      <h3>Data Layer</h3>
      <p>Documents, chunks, embeddings, vector database, and retrieval index.</p>
    </article>

    <article class="stage-panel" data-panel="core">
      <div class="panel-number">03</div>
      <h3>Core Engine Layer</h3>
      <p>Reasoning engine, model inference, optimization, and RAG pipeline.</p>
    </article>

    <article class="stage-panel" data-panel="orchestration">
      <div class="panel-number">04</div>
      <h3>Orchestration Layer</h3>
      <p>Task scheduler, agent loop, tool calling, and state manager.</p>
    </article>

    <article class="stage-panel" data-panel="product">
      <div class="panel-number">05</div>
      <h3>Product Layer</h3>
      <p>Dashboard, analytics, visualization, and user interface.</p>
    </article>

    <article class="stage-panel" data-panel="external">
      <div class="panel-number">06</div>
      <h3>External Services</h3>
      <p>Third-party APIs, external tools, and data sources.</p>
    </article>
  </div>

  <svg class="callout-layer"></svg>
</section>
```

### 10.2 CSS

```css
.industrial-architecture-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #f7f5ef;
}

.webgl-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.diagram-title {
  position: absolute;
  left: 4vw;
  top: 6vh;
  z-index: 10;
  font-family: "IBM Plex Mono", "Space Mono", monospace;
  color: #181818;
  pointer-events: none;
}

.title-main {
  font-size: 24px;
  letter-spacing: 0.18em;
}

.title-sub {
  margin-top: 8px;
  color: #d82922;
  font-size: 18px;
  letter-spacing: 0.24em;
}

.stage-index {
  display: inline-block;
  margin-top: 28px;
  padding: 6px 10px;
  border: 1px solid rgba(0, 0, 0, 0.45);
  font-size: 13px;
  letter-spacing: 0.08em;
}

.text-panels {
  position: absolute;
  right: 6vw;
  top: 18vh;
  width: 360px;
  z-index: 10;
  pointer-events: none;
}

.stage-panel {
  position: absolute;
  inset: 0 auto auto 0;
  opacity: 0;
  transform: translateY(20px);
  font-family: "IBM Plex Mono", "Space Mono", monospace;
  color: #222;
}

.panel-number {
  color: #d82922;
  font-size: 13px;
  margin-bottom: 6px;
}

.stage-panel h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stage-panel p {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  max-width: 310px;
}

.callout-layer {
  position: absolute;
  inset: 0;
  z-index: 8;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
```

---

## 11. Labels and Callouts

Do not use 3D text for the main labels. Use HTML/SVG overlay.

### 11.1 Screen Projection

```ts
export class ScreenProjector {
  constructor(
    private camera: THREE.Camera,
    private renderer: THREE.WebGLRenderer,
  ) {}

  project(worldPosition: THREE.Vector3) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const projected = worldPosition.clone().project(this.camera);

    return {
      x: (projected.x * 0.5 + 0.5) * rect.width,
      y: (-projected.y * 0.5 + 0.5) * rect.height,
    };
  }
}
```

### 11.2 Label Style

```css
.callout-label {
  position: absolute;
  font-family: "IBM Plex Mono", "Space Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #1f1f1f;
  text-transform: uppercase;
  pointer-events: none;
}

.callout-label::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  background: #ff3b2f;
}
```

### 11.3 Callout Behavior

For MVP:

- labels appear only for active stage;
- labels attach to pre-defined module anchors;
- SVG lines connect label to projected anchor;
- if label projection is outside viewport, hide it.

---

## 12. Build Order for Coding Agent

Follow this exact sequence.

### Step 1 — Basic Scene

Create:

```txt
renderer
scene
orthographic camera
ground grid
one wire box
animation loop
resize handler
```

Acceptance:

```txt
A cream background appears.
A static isometric wireframe box is visible.
No scroll behavior yet.
```

### Step 2 — Primitive Library

Create:

```txt
createWireBox
createWireTower
createStorageCluster
createRedNode
createPolyline
createGridPlane
```

Acceptance:

```txt
Several industrial primitives can be placed manually in the scene.
Edges are visible and surfaces are faint.
```

### Step 3 — Data-Driven Layer Generation

Create:

```txt
architectureData.ts
ArchitectureLayer
IndustrialBuildingFactory
LayerManager
```

Acceptance:

```txt
All six architecture layers render from config.
Each layer is a separate THREE.Group.
```

### Step 4 — ScrollTrigger Explode

Create:

```txt
ScrollDirector
createScrollTimeline
section pinning
stage panel fade in/out
```

Acceptance:

```txt
The section pins while scrolling.
Each layer detaches according to its explode vector.
Reverse scrolling reassembles the architecture.
```

### Step 5 — Red Flow Lines

Create:

```txt
red data flow polyline
gray control flow polyline
stage-based opacity control
red nodes at key endpoints
```

Acceptance:

```txt
A red path connects data layer → core engine → orchestration → product / external services.
Current stage has stronger red accents.
```

### Step 6 — Labels and Callouts

Create:

```txt
HTML labels
ScreenProjector
SVG leader lines
active-stage label visibility
```

Acceptance:

```txt
Current stage labels appear near the corresponding 3D modules.
Leader lines remain attached during scroll and resize.
```

### Step 7 — Polish

Add:

```txt
bounding boxes
dotted guide lines
vertical projection lines
small red coordinate nodes
system index box
bottom legend
subtle camera zoom
responsive layout
```

Acceptance:

```txt
The result resembles a clean industrial technical architecture diagram.
The style is closer to the reference image than to a game-like 3D scene.
```

---

## 13. Important Implementation Constraints

The coding agent must obey these constraints:

1. Use `THREE.OrthographicCamera`, not perspective camera, unless explicitly asked later.
2. Keep the diagram mostly wireframe. Avoid realistic lighting, shadows, PBR materials, or game-like shading.
3. Use red only for active elements, nodes, data flow, or section numbers.
4. Do not create heavy geometry. The scene should stay lightweight.
5. Keep each architecture layer as a separate `THREE.Group`.
6. All scroll animation should be controlled by GSAP timelines.
7. Text should be HTML/CSS, not 3D text.
8. Callout lines should be SVG overlay, not 3D geometry, unless there is a specific reason.
9. Reverse scroll must restore the assembled architecture.
10. MVP should prioritize layout, style, and animation over detailed industrial modeling.

---

## 14. Suggested Main Entry Skeleton

```ts
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { architectureLayers } from "./webgl/architecture/architectureData";
import { createCamera } from "./webgl/CameraRig";
import { createRenderer } from "./webgl/RendererRoot";
import { IndustrialBuildingFactory } from "./webgl/factory/IndustrialBuildingFactory";
import { createScrollTimeline } from "./webgl/animation/ScrollDirector";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector<HTMLCanvasElement>("#webgl-canvas")!;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7f5ef);

const renderer = createRenderer(canvas);
const camera = createCamera(window.innerWidth / window.innerHeight);

const sceneRoot = new THREE.Group();
scene.add(sceneRoot);

const factory = new IndustrialBuildingFactory();
const layers = factory.createLayers(architectureLayers);

for (const layer of layers) {
  sceneRoot.add(layer.group);
}

createScrollTimeline(layers, camera);

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);

  const aspect = width / height;
  const frustumSize = 7.5;
  camera.left = (frustumSize * aspect) / -2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = frustumSize / -2;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);
resize();

function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
```

---

## 15. MVP Acceptance Criteria

The first working version is acceptable if it satisfies all items below:

```txt
[ ] One pinned full-screen section exists.
[ ] WebGL canvas fills the section.
[ ] The camera is orthographic and axonometric.
[ ] The background is cream/off-white.
[ ] The architecture is assembled from six separate layer groups.
[ ] Each layer contains procedural wireframe industrial primitives.
[ ] Scroll causes each layer to detach from the assembled building.
[ ] Text panels fade in/out according to scroll stage.
[ ] At least one red data-flow path exists.
[ ] Red nodes mark important modules.
[ ] Reverse scroll reassembles the structure.
[ ] The visual is linework-first, not shaded or realistic.
```

---

## 16. Optional Enhancements After MVP

Add these only after the core section works.

```txt
- Dashed animated data-flow lines
- Hover interaction on modules
- Click to freeze a layer
- Mini-map / system index in the corner
- More detailed scaffold structures
- Dynamic architectureData loaded from JSON
- Export screenshot button
- Reduced-motion mode
- Mobile simplified layout
```

---

## 17. Copy-Paste Prompt for a Coding Agent

Use the following prompt when assigning this task to an implementation agent:

```txt
Implement a Vite + TypeScript WebGL section using Three.js and GSAP ScrollTrigger.

Goal:
Create a scroll-controlled industrial architecture exploded diagram. The diagram represents a project architecture as a procedural industrial building in axonometric wireframe style.

Use:
- Three.js for procedural geometry and rendering.
- OrthographicCamera for blueprint-like axonometric view.
- GSAP ScrollTrigger for pinned scroll and scrubbed timeline.
- HTML/CSS for text panels.
- SVG overlay for callout lines.

Visual style:
- cream/off-white background;
- thin black/gray wireframe lines;
- faint transparent surfaces;
- red accent nodes and data-flow lines;
- industrial towers, tanks, bridges, platforms, pipes;
- technical drawing / architectural diagram style;
- avoid realistic lighting, shadows, textures, or game-like materials.

Architecture layers:
1. Infrastructure Layer
2. Data Layer
3. Core Engine Layer
4. Orchestration Layer
5. Product Layer
6. External Services

Each layer must be a separate THREE.Group and generated from a config object. During scroll, each group moves to its exploded position and text panels fade in/out. Reverse scroll must reassemble the architecture.

Deliver the MVP in this order:
1. Basic Three.js scene with orthographic camera and wireframe box.
2. Primitive factories: wire box, tower, storage cluster, bridge, red node, polyline.
3. Data-driven layer generation.
4. GSAP ScrollTrigger pinned section and explode animation.
5. Red data-flow line and stage highlights.
6. HTML/SVG labels and callouts.
7. Polish with bounding boxes, guide lines, index, and legend.

Acceptance criteria:
The result should look like a clean industrial technical architecture diagram, not a realistic 3D scene. The layer separation should clearly support project architecture analysis.
```
