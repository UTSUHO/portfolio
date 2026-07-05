# Agent Implementation Checklist

Use this checklist before marking the implementation complete.

## Data

- [ ] JSON is loaded with `fetch(dataUrl)`.
- [ ] Missing optional fields are handled.
- [ ] Invalid edge indices are skipped or reported.
- [ ] `edge_groups` is used when present.
- [ ] `edge_roles` fallback works.
- [ ] `role_to_material` fallback works.

## Next.js

- [ ] WebGL component has `"use client"`.
- [ ] No browser APIs are used in Server Components.
- [ ] No Vite-specific assumptions.
- [ ] Component accepts a configurable `dataUrl`.
- [ ] Component cleans up on unmount.

## Three.js

- [ ] Renderer is created once per component mount.
- [ ] Scene is rendered with one RAF loop.
- [ ] Frame groups are attached to a root group.
- [ ] One `LineSegments` is created per role or material.
- [ ] No object is created per individual edge.
- [ ] Geometries are disposed.

## Playback

- [ ] Animation starts after data loading.
- [ ] Playback does not require scroll.
- [ ] Playback loops by default.
- [ ] Playback speed and FPS are configurable.
- [ ] Pause / resume works.
- [ ] Frame cache works or frame disposal works.

## Materials

- [ ] Materials are created once and reused.
- [ ] Role opacity works.
- [ ] Role visibility works.
- [ ] Role line-ratio works.
- [ ] Unknown roles use debug material.

## Debug

- [ ] Current frame can be inspected.
- [ ] Role counts can be inspected.
- [ ] Role isolation works or is easy to add.
- [ ] Loading and error states are visible.

## Forbidden

- [ ] No `GLTFLoader`.
- [ ] No morph targets.
- [ ] No skeletal animation.
- [ ] No vertex-index interpolation between frames.
- [ ] No ScrollTrigger-driven playback.
- [ ] No unmanaged RAF after unmount.
