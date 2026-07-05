# Next.js Integration

## Purpose

This document explains how to integrate the line sequence WebGL animation inside a Next.js project.

## Key Rule

Three.js must run only on the client.

Use a Client Component:

```tsx
"use client";
```

Do not initialize `THREE.WebGLRenderer`, access `window`, or access `document` from a Server Component.

## Recommended Component Boundary

Create a dedicated client component:

```txt
components/webgl/LineSequenceScene.tsx
```

The page or section can import this component normally.

Example:

```tsx
import LineSequenceScene from "@/components/webgl/LineSequenceScene";

export default function Page() {
  return (
    <main>
      <section className="h-screen">
        <LineSequenceScene dataUrl="/data/line_sequence_classified.json" />
      </section>
    </main>
  );
}
```

## Component Props

Recommended props:

```ts
type LineSequenceSceneProps = {
  dataUrl?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  playbackFps?: number;
  playbackSpeed?: number;
  showDebug?: boolean;
};
```

Defaults:

```txt
dataUrl = "/data/line_sequence_classified.json"
autoPlay = true
loop = true
playbackFps = 24
playbackSpeed = 1
showDebug = false
```

## DOM Structure

The component should render:

```tsx
<div ref={containerRef} className={className}>
  <canvas ref={canvasRef} />
  {showDebug && <DebugOverlay />}
</div>
```

The canvas must fill the container.

Recommended CSS:

```css
.webglRoot {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.webglCanvas {
  width: 100%;
  height: 100%;
  display: block;
}
```

## React Lifecycle

Use `useEffect` or `useLayoutEffect` for client-side setup.

Required cleanup on unmount:

1. cancel `requestAnimationFrame`;
2. remove resize observer or resize listener;
3. dispose geometries;
4. dispose materials if they are not shared elsewhere;
5. dispose renderer;
6. remove canvas references if manually appended.

## Avoid SSR Problems

Do not import modules that immediately access `window` at top level if they are not SSR-safe.

Three.js imports are generally acceptable in a Client Component, but all runtime construction must happen inside the client lifecycle.

If needed, use dynamic import:

```tsx
const LineSequenceScene = dynamic(
  () => import("@/components/webgl/LineSequenceScene"),
  { ssr: false }
);
```

Only use this if the project structure requires it.

## Data Location

Put the JSON under:

```txt
/public/data/line_sequence_classified.json
```

Then fetch it with:

```txt
/data/line_sequence_classified.json
```

Do not import a very large JSON directly into the bundle unless the file is small and intentionally bundled.

Use `fetch()` to keep it as a runtime asset.

## Loading Behavior

When the component mounts:

1. create scene / renderer;
2. load JSON;
3. normalize JSON;
4. build material system;
5. create player;
6. start autoplay after the first frame is ready.

If loading fails, show a small overlay message rather than crashing the page.

## Do Not

Do not use ScrollTrigger to drive frame playback.

Do not bind frame index to scroll position.

Do not create global singleton scene state unless the project architecture requires it.

Do not re-create the entire Three.js scene every React state update.
