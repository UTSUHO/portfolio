# 03 — Data Model and Configs

## TypeScript 类型

建议文件：

```text
src/components/webgl/types.ts
```

```ts
import * as THREE from 'three';

export type HeroLayerId =
  | 'home'
  | 'projects'
  | 'resume'
  | 'library'
  | 'notes';

export interface HeroLayerConfig {
  id: HeroLayerId;
  index: number;
  title: string;
  subtitle: string;
  position: [number, number, number];
  size: [number, number, number];
  colorRole: 'light' | 'mid' | 'dark';
  explodeOffset: [number, number, number];
  accent?: boolean;
}

export interface AnnotationConfig {
  id: string;
  label: string;
  sublabel?: string;
  targetLayer: HeroLayerId;
  localPosition: [number, number, number];
  side: 'left' | 'right' | 'top';
  active?: boolean;
}

export interface HeroArchitecture {
  root: THREE.Group;
  layers: Record<HeroLayerId, THREE.Group>;
  anchors: Record<string, THREE.Object3D>;
  activeNode: THREE.Mesh;
}
```

## Layer 配置

建议文件：

```text
src/webgl/hero/heroLayerConfig.ts
```

```ts
import type { HeroLayerConfig } from '@/components/webgl/types';

export const HERO_LAYERS: HeroLayerConfig[] = [
  {
    id: 'home',
    index: 1,
    title: '01 HOME',
    subtitle: 'IDENTITY CORE',
    position: [0, 0, 0],
    size: [5.8, 0.45, 3.4],
    colorRole: 'dark',
    explodeOffset: [0, -0.15, 0],
    accent: true,
  },
  {
    id: 'projects',
    index: 2,
    title: '02 PROJECTS',
    subtitle: 'PROJECT STACK',
    position: [-0.25, 0.55, 0.1],
    size: [4.8, 0.35, 2.8],
    colorRole: 'mid',
    explodeOffset: [-0.45, 0.35, 0.2],
  },
  {
    id: 'resume',
    index: 3,
    title: '03 RESUME',
    subtitle: 'EXPERIENCE ARCHIVE',
    position: [0.35, 1.05, -0.1],
    size: [4.0, 0.32, 2.4],
    colorRole: 'light',
    explodeOffset: [0.35, 0.65, -0.05],
  },
  {
    id: 'library',
    index: 4,
    title: '04 LIBRARY',
    subtitle: 'KNOWLEDGE GRID',
    position: [-0.1, 1.55, 0.2],
    size: [3.2, 0.28, 2.0],
    colorRole: 'light',
    explodeOffset: [-0.25, 0.95, 0.25],
  },
  {
    id: 'notes',
    index: 5,
    title: '05 NOTES',
    subtitle: 'NOTE TERMINAL',
    position: [0.15, 2.0, -0.15],
    size: [2.4, 0.22, 1.6],
    colorRole: 'mid',
    explodeOffset: [0.15, 1.25, -0.25],
  },
];
```

## Annotation 配置

建议文件：

```text
src/webgl/hero/heroAnnotationConfig.ts
```

```ts
import type { AnnotationConfig } from '@/components/webgl/types';

export const HERO_ANNOTATIONS: AnnotationConfig[] = [
  {
    id: 'a01',
    label: 'A01 ACTIVE NODE',
    sublabel: 'IDENTITY CORE',
    targetLayer: 'home',
    localPosition: [1.9, 0.35, 1.1],
    side: 'right',
    active: true,
  },
  {
    id: 'b02',
    label: 'B02 ANCHOR',
    sublabel: 'PROJECT STACK',
    targetLayer: 'projects',
    localPosition: [-1.7, 0.3, 1.0],
    side: 'left',
  },
  {
    id: 'c03',
    label: 'C03 FRAME EDGE',
    sublabel: 'EXPERIENCE ARCHIVE',
    targetLayer: 'resume',
    localPosition: [1.4, 0.25, -0.8],
    side: 'right',
  },
  {
    id: 'd04',
    label: 'D04 GRID NODE',
    sublabel: 'KNOWLEDGE GRID',
    targetLayer: 'library',
    localPosition: [-1.2, 0.25, -0.6],
    side: 'left',
  },
  {
    id: 'e05',
    label: 'E05 TERMINAL',
    sublabel: 'NOTE LAYER',
    targetLayer: 'notes',
    localPosition: [0.9, 0.2, 0.5],
    side: 'top',
  },
];
```

## 后续扩展字段

后续如果要和页面 section 联动，可以扩展：

```ts
export interface HeroLayerConfig {
  sectionId?: string;
  navIndex?: number;
  activeNodePosition?: [number, number, number];
  cameraFocus?: [number, number, number];
}
```
