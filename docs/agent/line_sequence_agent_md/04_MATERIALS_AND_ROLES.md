# Material and Role System

## Purpose

This module converts the classified line sequence material config into Three.js materials and role-level render controls.

The classification data is important. Do not flatten all edges into one material unless debug mode requests it.

## Recommended Module

```txt
lib/webgl/createMaterialSystem.ts
```

## Inputs

From the sequence:

```ts
sequence.materials
sequence.role_to_material
```

From runtime options:

```ts
roleVisibility
roleOpacity
roleLineRatio
materialOverrides
```

## Material System Output

Recommended shape:

```ts
type MaterialSystem = {
  getMaterial(materialKey: string): THREE.Material;
  getMaterialForRole(role: string): THREE.Material;
  getMaterialKeyForRole(role: string): string;
  setRoleOpacity(role: string, opacity: number): void;
  setRoleVisible(role: string, visible: boolean): void;
  setRoleLineRatio(role: string, ratio: number): void;
  getRoleControls(role: string): RoleControls;
  dispose(): void;
};
```

## Default Materials

If JSON materials are missing, provide defaults:

```ts
const DEFAULT_MATERIALS = {
  primary_ring: { color: "#B8E8FF", opacity: 0.92, lineWidth: 1, glow: 0.45 },
  secondary_ring: { color: "#6EAAC4", opacity: 0.45, lineWidth: 1, glow: 0.18 },
  connection_line: { color: "#4A7E99", opacity: 0.38, lineWidth: 1, glow: 0.1 },
  long_connection: { color: "#9FE8FF", opacity: 0.78, lineWidth: 1, glow: 0.42 },
  hub_line: { color: "#FFFFFF", opacity: 0.82, lineWidth: 1, glow: 0.55 },
  debug_unknown: { color: "#FF4D4D", opacity: 0.85, lineWidth: 1, glow: 0.3 },
};
```

## Three.js Material Creation

First version may use:

```ts
new THREE.LineBasicMaterial({
  color,
  transparent: true,
  opacity,
  depthWrite: false,
});
```

## Line Width Warning

Do not rely on `LineBasicMaterial.linewidth` for visible width differences in most browser environments.

For wide lines, implement a separate optional path using:

```txt
three/examples/jsm/lines/Line2
three/examples/jsm/lines/LineGeometry
three/examples/jsm/lines/LineMaterial
```

First implementation can stay with `LineSegments`.

## Role Controls

Use role-level controls to control visual density and hierarchy.

Recommended defaults:

```ts
const DEFAULT_ROLE_CONTROLS = {
  outer_large_node_ring: { visible: true, opacity: 1.0, lineRatio: 1.0 },
  outer_small_node_ring: { visible: true, opacity: 0.7, lineRatio: 1.0 },
  inner_large_node_ring: { visible: true, opacity: 0.85, lineRatio: 1.0 },
  inner_small_node_ring: { visible: true, opacity: 0.7, lineRatio: 1.0 },
  hub_spokes: { visible: true, opacity: 1.0, lineRatio: 1.0 },
  long_connections: { visible: true, opacity: 0.9, lineRatio: 0.9 },
  connection_network: { visible: true, opacity: 0.55, lineRatio: 0.45 },
  short_connections: { visible: true, opacity: 0.45, lineRatio: 0.6 },
  closed_loops: { visible: true, opacity: 0.5, lineRatio: 1.0 },
  uncategorized: { visible: true, opacity: 0.8, lineRatio: 1.0 },
};
```

## Runtime Line Count Control

The line count must be controlled at runtime, not by mutating JSON.

When building a role group:

```ts
const visibleCount = Math.floor(edgeIndices.length * roleControls.lineRatio);
const selectedEdgeIndices = edgeIndices.slice(0, visibleCount);
```

For better distribution, use even sampling:

```ts
function evenPick<T>(items: T[], count: number): T[] {
  if (count >= items.length) return items;
  if (count <= 0) return [];
  const result = [];
  for (let i = 0; i < count; i++) {
    const index = Math.round((i * (items.length - 1)) / (count - 1));
    result.push(items[index]);
  }
  return result;
}
```

## Role-Based Visibility

Apply `visible` at object level:

```ts
lineSegments.visible = roleControls.visible;
```

Apply opacity by cloning material or using per-role material instances.

Do not mutate one shared material's opacity if that material is used by multiple roles with different opacity settings.

## Recommended Strategy

Create material instances per role, not only per material key.

This allows different roles sharing the same base material key to still have different runtime opacity.

## Do Not

Do not treat `materials.glow` as mandatory postprocessing.

Do not block implementation on bloom.

Do not flatten roles unless `debugFlattenRoles = true`.

Do not create new materials every frame; create them once per role/material combination and reuse.
