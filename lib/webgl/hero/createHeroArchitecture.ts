import * as THREE from 'three';
import { HERO_PARTS, HERO_GROUP_EXPLODE_OFFSETS } from './heroPartConfig';
import { HERO_ANNOTATIONS } from './heroAnnotationConfig';
import { createHeroMaterials } from './createMaterials';
import type {
  HeroArchitecture,
  HeroLayerId,
  HeroPartConfig,
  HeroPartGroup,
} from '@/app/components/webgl/types';

const LAYER_ORDER: HeroLayerId[] = ['home', 'projects', 'resume', 'library', 'notes'];

export function createHeroArchitecture(): HeroArchitecture {
  const materials = createHeroMaterials();

  const root = new THREE.Group();
  root.name = 'HeroArchitectureRoot';
  root.rotation.x = -0.34;
  root.rotation.y = 0.62;
  root.rotation.z = 0.03;

  const layers = {} as Record<HeroLayerId, THREE.Group>;
  const anchors: Record<string, THREE.Object3D> = {};

  // Shared group is added directly to root and does not explode
  const sharedGroup = new THREE.Group();
  sharedGroup.name = 'G_00_SHARED';
  root.add(sharedGroup);

  // Semantic layer groups
  for (const id of LAYER_ORDER) {
    const group = new THREE.Group();
    group.name = `G_${String(LAYER_ORDER.indexOf(id) + 1).padStart(2, '0')}_${id.toUpperCase()}`;
    group.userData.initialPosition = new THREE.Vector3();
    group.userData.explodeOffset = new THREE.Vector3(...HERO_GROUP_EXPLODE_OFFSETS[id]);
    layers[id] = group;
    root.add(group);
  }

  // Create parts from config
  for (const part of HERO_PARTS) {
    const targetGroup = getTargetGroup(part.group, sharedGroup, layers);
    createPart(targetGroup, part, materials);
  }

  // Active red node near projects/core intersection
  const activeNode = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    materials.redNode,
  );
  activeNode.name = 'A01_ACTIVE_NODE';
  activeNode.position.set(0.15, 0.55, 0.35);
  root.add(activeNode);

  // Annotation anchors
  for (const anno of HERO_ANNOTATIONS) {
    const anchor = new THREE.Object3D();
    anchor.name = `ANCHOR_${anno.id}`;
    anchor.position.set(...anno.localPosition);
    anchor.userData.annotationConfig = anno;
    anchor.userData.targetLayer = anno.targetLayer;
    layers[anno.targetLayer].add(anchor);
    anchors[anno.id] = anchor;
  }

  // Sparse guide and datum lines
  addVerticalGuideLines(root, materials.faintEdge);
  addSparseDatumLines(root, materials.faintEdge);

  root.position.set(0.0, -0.72, 0);
  root.scale.setScalar(1.08);

  return {
    root,
    layers,
    anchors,
    activeNode,
  };
}

function getTargetGroup(
  groupId: HeroPartGroup,
  sharedGroup: THREE.Group,
  layers: Record<HeroLayerId, THREE.Group>,
): THREE.Group {
  return groupId === 'shared' ? sharedGroup : layers[groupId];
}

function createPart(
  parent: THREE.Group,
  part: HeroPartConfig,
  materials: ReturnType<typeof createHeroMaterials>,
) {
  switch (part.kind) {
    case 'box':
    case 'darkInset': {
      const mat =
        part.colorRole === 'dark'
          ? materials.concreteDark
          : part.colorRole === 'mid'
            ? materials.concreteMid
            : materials.concreteLight;
      addBox(parent, part.position, part.size, mat, materials.edge, part.edge);
      break;
    }
    case 'wireBox':
      addWireBox(parent, part.position, part.size, materials.blueprintLine);
      break;
    case 'coreCage':
      addCoreCage(parent, part.position, part.size, materials.blueprintLine);
      break;
    case 'columnRow':
      addColumnRow(parent, part, materials);
      break;
    case 'detachedWall':
      addDetachedWallGrid(parent, part, materials);
      break;
  }
}

function addBox(
  parent: THREE.Group,
  position: [number, number, number],
  size: [number, number, number],
  material: THREE.Material,
  edgeMaterial: THREE.LineBasicMaterial,
  withEdge = true,
) {
  const geometry = new THREE.BoxGeometry(...size);

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(...position);
  parent.add(mesh);

  if (withEdge) {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      edgeMaterial,
    );
    edges.position.set(...position);
    parent.add(edges);
  }
}

function addWireBox(
  parent: THREE.Group,
  position: [number, number, number],
  size: [number, number, number],
  edgeMaterial: THREE.LineBasicMaterial,
) {
  const geometry = new THREE.BoxGeometry(...size);
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    edgeMaterial,
  );
  wire.position.set(...position);
  parent.add(wire);
}

function addCoreCage(
  parent: THREE.Group,
  position: [number, number, number],
  size: [number, number, number],
  edgeMaterial: THREE.LineBasicMaterial,
) {
  const geometry = new THREE.BoxGeometry(...size);
  const cage = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    edgeMaterial,
  );
  cage.name = 'CoreCage';
  cage.position.set(...position);
  parent.add(cage);

  // Inner cross bracing
  const [w, h, d] = size;
  const braceGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-w / 2, -h / 2, -d / 2),
    new THREE.Vector3(w / 2, h / 2, d / 2),
    new THREE.Vector3(w / 2, -h / 2, -d / 2),
    new THREE.Vector3(-w / 2, h / 2, d / 2),
  ]);
  const brace = new THREE.LineSegments(braceGeo, edgeMaterial);
  brace.position.set(...position);
  parent.add(brace);
}

function addColumnRow(
  parent: THREE.Group,
  part: HeroPartConfig,
  materials: ReturnType<typeof createHeroMaterials>,
) {
  const count = part.count ?? 3;
  const spacing = part.spacing ?? [0, 0, 0.5];

  for (let i = 0; i < count; i++) {
    const position: [number, number, number] = [
      part.position[0] + i * spacing[0],
      part.position[1] + i * spacing[1],
      part.position[2] + i * spacing[2],
    ];
    const mat =
      part.colorRole === 'dark'
        ? materials.concreteDark
        : part.colorRole === 'mid'
          ? materials.concreteMid
          : materials.concreteLight;
    addBox(parent, position, part.size, mat, materials.edge, part.edge);
  }
}

function addDetachedWallGrid(
  parent: THREE.Group,
  part: HeroPartConfig,
  materials: ReturnType<typeof createHeroMaterials>,
) {
  const mat =
    part.colorRole === 'dark'
      ? materials.concreteDark
      : part.colorRole === 'mid'
        ? materials.concreteMid
        : materials.concreteLight;

  addBox(parent, part.position, part.size, mat, materials.edge, part.edge);

  // Add faint horizontal datum lines on the wall
  const [x, y, z] = part.position;
  const [, h, d] = part.size;
  const linePositions: [number, number, number][] = [
    [x, y + h * 0.25, z],
    [x, y, z],
    [x, y - h * 0.25, z],
  ];

  for (const lp of linePositions) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(lp[0], lp[1], z - d / 2 - 0.02),
      new THREE.Vector3(lp[0], lp[1], z + d / 2 + 0.02),
    ]);
    const line = new THREE.Line(geo, materials.faintEdge);
    parent.add(line);
  }
}

function addVerticalGuideLines(root: THREE.Group, mat: THREE.LineBasicMaterial) {
  const pointsList = [
    [-2.2, -0.1, -1.4],
    [2.2, -0.1, 1.4],
    [1.6, -0.1, -1.2],
    [-1.6, -0.1, 1.2],
  ];

  for (const p of pointsList) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(p[0], p[1], p[2]),
      new THREE.Vector3(p[0], 3.3, p[2]),
    ]);

    const line = new THREE.Line(geo, mat);
    root.add(line);
  }
}

function addSparseDatumLines(root: THREE.Group, mat: THREE.LineBasicMaterial) {
  const lines = [
    // horizontal datum near base
    [
      new THREE.Vector3(-2.6, 0.18, 1.6),
      new THREE.Vector3(2.6, 0.18, 1.6),
    ],
    // horizontal datum near mid
    [
      new THREE.Vector3(-2.0, 1.4, -1.2),
      new THREE.Vector3(1.4, 1.4, -1.2),
    ],
    // vertical datum at rear
    [
      new THREE.Vector3(-1.6, -0.1, -1.0),
      new THREE.Vector3(-1.6, 2.6, -1.0),
    ],
  ];

  for (const pair of lines) {
    const geo = new THREE.BufferGeometry().setFromPoints(pair);
    const line = new THREE.Line(geo, mat);
    root.add(line);
  }
}
