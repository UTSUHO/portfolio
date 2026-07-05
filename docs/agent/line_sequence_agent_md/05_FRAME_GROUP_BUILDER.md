# Frame Group Builder

## Purpose

This module converts one normalized frame into a `THREE.Group` containing one or more line objects.

Each role or material should be rendered as its own child line object.

## Recommended Module

```txt
lib/webgl/buildFrameGroup.ts
```

## Main Function

```ts
function buildFrameGroup(
  frame: NormalizedLineFrame,
  materialSystem: MaterialSystem,
  options?: BuildFrameGroupOptions
): THREE.Group;
```

## Output

The output group should contain:

```txt
THREE.Group
  LineSegments for role A
  LineSegments for role B
  LineSegments for role C
  ...
```

Do not create one global LineSegments for all edges unless explicitly requested for debug.

## Building Edge Groups

Prefer:

```ts
frame.edgeGroups
```

Fallback:

```ts
buildEdgeGroupsFromRoles(frame.edgeRoles)
```

## Position Buffer Construction

For every selected edge:

```ts
const [a, b] = edge;
const va = vertices[a];
const vb = vertices[b];

positions.push(va[0], va[1], va[2]);
positions.push(vb[0], vb[1], vb[2]);
```

Use `Float32Array`.

## Required Safety Checks

Skip invalid edge if:

1. `edge` does not exist;
2. `a` or `b` is not a finite number;
3. `vertices[a]` or `vertices[b]` does not exist;
4. coordinates are not finite.

Record skipped edge count in `userData`.

## Per-Role Metadata

Every line object should have:

```ts
line.userData = {
  kind: "classified-line-segments",
  frame: frame.frame,
  role,
  materialKey,
  edgeCount,
  skippedEdgeCount,
};
```

## Group Metadata

The frame group should have:

```ts
group.userData = {
  kind: "line-sequence-frame-group",
  frame: frame.frame,
  roleCount,
  edgeCount,
};
```

## Runtime Density

Apply role line-ratio before building positions.

Example:

```ts
const controls = materialSystem.getRoleControls(role);
const sampledEdgeIndices = evenPick(
  edgeIndices,
  Math.floor(edgeIndices.length * controls.lineRatio)
);
```

## Draw Range Alternative

For reveal effects, you can use:

```ts
geometry.setDrawRange(0, visibleSegmentCount * 2);
```

Remember:

```txt
one line segment = two vertices in the position buffer
```

## Disposal

Frame groups must be disposable.

Implement:

```ts
function disposeFrameGroup(group: THREE.Group) {
  group.traverse((obj) => {
    const mesh = obj as THREE.LineSegments;
    if (mesh.geometry) mesh.geometry.dispose();
  });
}
```

Do not dispose shared materials here unless materials are owned only by this frame group.

Material disposal belongs to the material system.

## Do Not

Do not use React state for every frame update.

Do not rebuild the whole frame group inside React render.

Do not use `THREE.Geometry`; it is obsolete.

Do not create one object per edge. That would be too many draw calls.
