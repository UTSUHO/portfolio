# 04 — Three.js Core Implementation

## createMaterials

建议文件：

```text
src/webgl/hero/createMaterials.ts
```

```ts
import * as THREE from 'three';

export function createHeroMaterials() {
  return {
    concreteLight: new THREE.MeshStandardMaterial({
      color: 0xe8e6df,
      roughness: 0.82,
      metalness: 0.05,
    }),

    concreteMid: new THREE.MeshStandardMaterial({
      color: 0xb8b6ad,
      roughness: 0.86,
      metalness: 0.04,
    }),

    concreteDark: new THREE.MeshStandardMaterial({
      color: 0x11161a,
      roughness: 0.7,
      metalness: 0.1,
    }),

    redNode: new THREE.MeshStandardMaterial({
      color: 0xff3b2f,
      emissive: 0xff1208,
      emissiveIntensity: 0.45,
      roughness: 0.45,
    }),

    edge: new THREE.LineBasicMaterial({
      color: 0x1b1f22,
      transparent: true,
      opacity: 0.42,
    }),

    faintEdge: new THREE.LineBasicMaterial({
      color: 0x1b1f22,
      transparent: true,
      opacity: 0.18,
    }),
  };
}
```

## createLayer

建议文件：

```text
src/webgl/hero/createLayer.ts
```

```ts
import * as THREE from 'three';
import type { HeroLayerConfig } from '@/components/webgl/types';

export function createLayer(
  config: HeroLayerConfig,
  material: THREE.Material,
  edgeMaterial: THREE.LineBasicMaterial,
) {
  const group = new THREE.Group();
  group.name = `G_${String(config.index).padStart(2, '0')}_${config.id.toUpperCase()}`;

  const geometry = new THREE.BoxGeometry(
    config.size[0],
    config.size[1],
    config.size[2],
  );

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    edgeMaterial,
  );
  group.add(edges);

  group.position.set(...config.position);

  return group;
}
```

## createHeroArchitecture

建议文件：

```text
src/webgl/hero/createHeroArchitecture.ts
```

```ts
import * as THREE from 'three';
import { HERO_LAYERS } from './heroLayerConfig';
import { HERO_ANNOTATIONS } from './heroAnnotationConfig';
import { createHeroMaterials } from './createMaterials';
import { createLayer } from './createLayer';
import type { HeroArchitecture, HeroLayerId } from '@/components/webgl/types';

export function createHeroArchitecture(): HeroArchitecture {
  const materials = createHeroMaterials();

  const root = new THREE.Group();
  root.name = 'HeroArchitectureRoot';
  root.rotation.x = -0.28;
  root.rotation.y = 0.58;
  root.rotation.z = 0.02;

  const layers = {} as Record<HeroLayerId, THREE.Group>;
  const anchors: Record<string, THREE.Object3D> = {};

  for (const config of HERO_LAYERS) {
    const mat =
      config.colorRole === 'dark'
        ? materials.concreteDark
        : config.colorRole === 'mid'
          ? materials.concreteMid
          : materials.concreteLight;

    const layer = createLayer(config, mat, materials.edge);
    layer.userData.initialPosition = layer.position.clone();
    layer.userData.explodeOffset = new THREE.Vector3(...config.explodeOffset);

    layers[config.id] = layer;
    root.add(layer);

    addSecondaryDetails(layer, config.id, materials);
  }

  const activeNode = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    materials.redNode,
  );
  activeNode.name = 'A01_ACTIVE_NODE';
  activeNode.position.set(1.7, 0.95, 0.95);
  root.add(activeNode);

  for (const anno of HERO_ANNOTATIONS) {
    const anchor = new THREE.Object3D();
    anchor.name = `ANCHOR_${anno.id}`;
    anchor.position.set(...anno.localPosition);
    layers[anno.targetLayer].add(anchor);
    anchors[anno.id] = anchor;
  }

  addWireframeCanopy(root, materials.faintEdge);
  addVerticalGuideLines(root, materials.faintEdge);

  root.position.set(0.3, -0.3, 0);
  root.scale.setScalar(0.85);

  return {
    root,
    layers,
    anchors,
    activeNode,
  };
}

function addSecondaryDetails(
  layer: THREE.Group,
  layerId: string,
  materials: ReturnType<typeof createHeroMaterials>,
) {
  const darkMat = materials.concreteDark;
  const lightMat = materials.concreteLight;

  if (layerId === 'projects') {
    const recess = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.08, 0.75),
      darkMat,
    );
    recess.position.set(-0.8, 0.22, 0.55);
    layer.add(recess);
  }

  if (layerId === 'resume') {
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.75, 0.45),
      lightMat,
    );
    block.position.set(1.1, 0.55, -0.65);
    layer.add(block);
  }

  if (layerId === 'library') {
    for (let i = 0; i < 6; i++) {
      const small = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.18, 0.18),
        lightMat,
      );
      small.position.set(-0.8 + i * 0.28, 0.28, 0.65);
      layer.add(small);
    }
  }
}

function addWireframeCanopy(root: THREE.Group, mat: THREE.LineBasicMaterial) {
  const box = new THREE.BoxGeometry(2.2, 1.0, 1.4);
  const wire = new THREE.LineSegments(new THREE.EdgesGeometry(box), mat);
  wire.position.set(0.1, 2.9, -0.1);
  root.add(wire);
}

function addVerticalGuideLines(root: THREE.Group, mat: THREE.LineBasicMaterial) {
  const pointsList = [
    [-2.2, -0.1, -1.4],
    [2.2, -0.1, 1.4],
    [1.6, -0.1, -1.2],
  ];

  for (const p of pointsList) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(p[0], p[1], p[2]),
      new THREE.Vector3(p[0], 3.1, p[2]),
    ]);

    const line = new THREE.Line(geo, mat);
    root.add(line);
  }
}
```

## 实现注意

1. 第一版不要从 GLB 加载。
2. 所有层级必须是独立 `THREE.Group`。
3. `initialPosition` 和 `explodeOffset` 必须写入 `userData`，方便 GSAP 使用。
4. `activeNode` 可以先固定在建筑中心附近，之后再根据 section 切换。
5. `EdgesGeometry` 是风格关键，不要省略。
