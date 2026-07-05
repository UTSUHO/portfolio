# Three.js Scene and Renderer Module

## Purpose

This module owns the Three.js renderer, scene, camera, root group, resize behavior, and render loop.

It should not know Blender-specific data details. It should receive already-normalized frame groups from the player.

## Recommended Module

```txt
lib/webgl/createLineScene.ts
```

## Required Output

Expose a factory:

```ts
type LineSceneRuntime = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  root: THREE.Group;
  render: () => void;
  resize: () => void;
  dispose: () => void;
};

function createLineScene(canvas: HTMLCanvasElement, container: HTMLElement): LineSceneRuntime;
```

## Camera

Preferred first version:

```txt
PerspectiveCamera
```

Suggested initial values:

```ts
camera.position.set(0, 0, 3.2);
camera.lookAt(0, 0, 0);
```

Because the current extracted data is mostly in the XY plane with z = 0, this gives a readable frontal technical-diagram view.

Optional stylized view:

```ts
camera.position.set(0.4, -0.65, 3.0);
camera.lookAt(0, 0, 0);
```

## Scene Root

Create a root group:

```ts
const root = new THREE.Group();
scene.add(root);
```

All frame groups should be attached under this root, not directly under the scene.

This allows global scale, rotation, and centering.

## Background

Use a dark background:

```ts
scene.background = new THREE.Color("#05080c");
```

Alternatively, set renderer alpha and handle background in CSS.

## Renderer

Recommended setup:

```ts
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(width, height, false);
```

## Resize Handling

Use `ResizeObserver` if available.

On resize:

1. measure container width / height;
2. update camera aspect or orthographic bounds;
3. update projection matrix;
4. update renderer size.

## Render Loop Ownership

The parent component should own one `requestAnimationFrame` loop and call:

```ts
player.update(deltaTime);
sceneRuntime.render();
```

There must be only one active RAF loop per component instance.

## Optional Visual Enhancements

Optional first-pass additions:

1. faint background grid;
2. camera drift;
3. slow root rotation;
4. slight parallax;
5. bloom postprocessing.

Do not add these before the base line animation works.

## Disposal

The scene runtime must expose `dispose()`.

Required disposal:

```ts
renderer.dispose();
```

If using render targets or postprocessing composer, dispose them too.

The player should dispose frame groups and geometries separately.

## Do Not

Do not load the JSON here.

Do not build line geometry here.

Do not control playback timing here.

Do not store React state here.
