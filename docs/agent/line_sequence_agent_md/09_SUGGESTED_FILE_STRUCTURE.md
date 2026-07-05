# Suggested File Structure

## Purpose

This document proposes a maintainable file structure for the Next.js implementation.

Adapt paths to the existing project. Do not force a rewrite.

## Recommended Structure

```txt
public/
  data/
    line_sequence_classified.json

components/
  webgl/
    LineSequenceScene.tsx
    LineSequenceDebugOverlay.tsx

lib/
  webgl/
    types.ts
    loadLineSequence.ts
    normalizeLineSequence.ts
    createLineScene.ts
    createMaterialSystem.ts
    buildFrameGroup.ts
    LineSequencePlayer.ts
    disposeFrameGroup.ts
    sampling.ts
```

## File Responsibilities

### `components/webgl/LineSequenceScene.tsx`

Client component.

Owns:

```txt
React refs
mount / unmount lifecycle
creating scene runtime
loading data
creating material system
creating player
RAF loop
debug overlay state
```

Does not contain low-level geometry-building logic.

### `components/webgl/LineSequenceDebugOverlay.tsx`

Optional debug UI.

Should receive throttled state updates.

Do not update it every frame unless necessary.

### `lib/webgl/types.ts`

All TypeScript types.

### `lib/webgl/loadLineSequence.ts`

Fetches JSON and handles HTTP / parse errors.

### `lib/webgl/normalizeLineSequence.ts`

Validates and normalizes data.

Fallbacks:

```txt
missing edge_groups
missing edge_roles
missing edge_materials
missing materials
```

### `lib/webgl/createLineScene.ts`

Creates renderer, scene, camera, root group, resize handling, and dispose function.

### `lib/webgl/createMaterialSystem.ts`

Creates and manages materials.

Handles role-to-material mapping and role controls.

### `lib/webgl/buildFrameGroup.ts`

Builds one `THREE.Group` from one normalized frame.

Creates one `LineSegments` per role or material.

### `lib/webgl/disposeFrameGroup.ts`

Disposes geometries in a frame group.

Does not dispose shared materials.

### `lib/webgl/LineSequencePlayer.ts`

Owns playback state, frame switching, cache, and loop logic.

### `lib/webgl/sampling.ts`

Utility functions:

```txt
evenPick
clamp
safeArray
validateEdge
```

## Optional Extra Files

```txt
lib/webgl/createWideLineGroup.ts
lib/webgl/createPostprocessing.ts
lib/webgl/createGridBackground.ts
lib/webgl/createCameraRig.ts
```

Add these only after the base implementation works.

## Implementation Order

1. Types.
2. Loader.
3. Normalizer.
4. Scene runtime.
5. Material system.
6. Frame builder.
7. Player.
8. Client component.
9. Debug overlay.
10. Optional visual polish.

## Do Not

Do not put all logic in one React component.

Do not put Blender data assumptions in the renderer module.

Do not put renderer lifecycle inside the player.

Do not make ScrollTrigger a dependency of the player.
