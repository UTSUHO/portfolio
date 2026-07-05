# Debug and QA

## Purpose

This document defines debug tools and acceptance checks for the implementation.

## Debug Overlay

Add an optional debug overlay controlled by prop:

```ts
showDebug?: boolean
```

Recommended displayed fields:

```txt
loaded: true / false
frame index
Blender frame number
frame count
fps
speed
playing / paused
current role counts
cached frame count
current draw calls
```

## Debug Controls

Implement at least some of:

```txt
pause / play
next frame
previous frame
speed slider
fps slider
role visibility toggles
role opacity sliders
role line ratio sliders
show only one role
```

This can be implemented with plain HTML first. lil-gui is optional.

## Role Debug

When selecting a role, hide all other roles.

This helps verify that the Blender-side classification is working.

## Validation Errors

The loader should report:

1. missing frames;
2. invalid vertices;
3. invalid edge index;
4. edge role length mismatch;
5. edge material length mismatch;
6. missing material key;
7. empty frame.

Errors should be visible in console and optionally in overlay.

## Performance Checks

For each frame, avoid one draw call per edge.

Acceptable structure:

```txt
one LineSegments per role
```

Potentially acceptable:

```txt
one LineSegments per material
```

Not acceptable:

```txt
one Object3D per line segment
```

## Cleanup Checks

On component unmount:

1. no RAF loop should continue;
2. no resize listener should remain;
3. renderer should be disposed;
4. geometries should be disposed;
5. cached frame groups should be disposed;
6. scene root should not retain old frames.

## Visual Acceptance

The first accepted version should show:

1. dark background;
2. line sequence visible and centered;
3. animated changing line structure;
4. different roles using visibly distinct opacity or color;
5. stable loop playback;
6. no hard crash when data is missing optional classified fields.

## Integration Acceptance

The component should work in Next.js with:

```tsx
<LineSequenceScene dataUrl="/data/line_sequence_classified.json" autoPlay loop />
```

It must not require page scroll for playback.

It must not assume Vite-specific APIs such as `import.meta.env`.

It must not assume a fixed page route.
