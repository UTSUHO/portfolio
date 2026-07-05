# Master Agent Prompt: Next.js Line Sequence WebGL Animation

## Role

You are a coding agent working inside an existing **Next.js** project.

Your task is to implement a WebGL line-sequence animation system from a Blender Geometry Nodes export.

## Input Data

The main runtime input is expected to be:

```txt
/public/data/line_sequence_classified.json
```

The data is a **classified line sequence**, not a mesh, not a GLB, and not a morph target animation.

It contains frame-wise `vertices` and `edges`, plus classification metadata such as `edge_roles`, `edge_materials`, `edge_groups`, `materials`, and `role_to_material`.

## Core Requirement

After the JSON is loaded, the animation must **play automatically**.

Do **not** use scroll position to drive animation playback.

ScrollTrigger is not required for playback. GSAP or anime.js may be used only for secondary visual effects, such as opacity fades, camera drift, title motion, or UI transitions.

## Allowed Libraries

You may use:

```txt
three.js
gsap
anime.js
```

Do not assume Vite, Vue, Svelte, plain HTML, or a non-Next.js frontend framework.

Do not rewrite the project architecture unless necessary.

## Hard Constraints

1. Do not use `GLTFLoader`.
2. Do not load `.glb`, `.fbx`, `.obj`, or mesh assets for this animation.
3. Do not use morph targets.
4. Do not use skeletal animation.
5. Do not assume every frame has the same number of vertices or edges.
6. Do not interpolate vertex positions between frames by index.
7. Do not use scroll progress as the primary animation clock.
8. Do not create Three.js objects during React render.
9. Do not access `window`, `document`, `WebGLRenderer`, or canvas APIs in a Server Component.
10. Do not create unmanaged render loops that survive component unmount.

## Implementation Goal

Create a client-side Next.js WebGL component that:

1. Loads `line_sequence_classified.json`.
2. Validates and normalizes the data.
3. Builds line geometry per frame.
4. Splits line rendering by role or material.
5. Plays automatically after loading.
6. Loops cleanly.
7. Supports runtime controls for playback speed, pause/resume, role visibility, role opacity, role line count ratio, and debug info.
8. Disposes geometries, renderers, event listeners, and animation frames on unmount.

## Read These Files

Follow the module documents in this order:

```txt
01_DATA_CONTRACT.md
02_NEXTJS_INTEGRATION.md
03_THREE_SCENE_RENDERER.md
04_MATERIALS_AND_ROLES.md
05_FRAME_GROUP_BUILDER.md
06_LINE_SEQUENCE_PLAYER.md
07_AUTOPLAY_RUNTIME.md
08_DEBUG_AND_QA.md
09_SUGGESTED_FILE_STRUCTURE.md
10_AGENT_IMPLEMENTATION_CHECKLIST.md
```

## Deliverable

Implement the feature inside the existing Next.js project.

The final result should be a reusable component, not a one-off page hack.

Prefer a component name such as:

```txt
LineSequenceScene
GeometryNodeLineAnimation
ClassifiedLineSequencePlayer
```

## Acceptance Criteria

The feature is accepted only if:

1. The scene renders without SSR errors.
2. The JSON loads from `/public` or a configurable URL.
3. The animation starts automatically after data loading.
4. The animation loops.
5. The frame sequence is rendered as `THREE.LineSegments` or a compatible wide-line alternative.
6. Different roles can use different materials.
7. The component cleans up on unmount.
8. No scroll-driven playback is required.
