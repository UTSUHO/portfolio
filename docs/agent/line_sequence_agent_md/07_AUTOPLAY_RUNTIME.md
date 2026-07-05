# Autoplay Runtime

## Purpose

This document defines how the animation starts and runs after loading.

The animation should start automatically once the JSON, scene, material system, and first frame are ready.

## Required Flow

Inside the client component:

```txt
mount
  create renderer / scene
  fetch JSON
  normalize JSON
  create material system
  create player
  build first frame
  player.play()
  start RAF loop
unmount
  stop RAF loop
  dispose player
  dispose material system
  dispose scene runtime
```

## RAF Loop

Use one RAF loop.

Example structure:

```ts
let rafId = 0;
let lastTime = performance.now();

function tick(now: number) {
  const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  player.update(deltaSeconds);
  sceneRuntime.render();

  rafId = requestAnimationFrame(tick);
}

rafId = requestAnimationFrame(tick);
```

Clamp delta to avoid large jumps when the tab resumes.

## Autoplay Defaults

Recommended defaults:

```ts
autoPlay = true;
loop = true;
fps = 24;
speed = 1;
```

The exported `frame_step` is not the same as playback FPS. It only describes Blender sampling.

Runtime FPS controls how many exported frames are shown per second.

## Playback Modes

Implement these modes:

```txt
normal: loop through frames
pingpong: play forward then backward
hold: play once and stop on final frame
```

First version only needs `normal`, but structure should allow extension.

## Loading Overlay

Before data loads:

```txt
Loading geometry node line sequence...
```

After load:

```txt
show animation
```

On error:

```txt
Failed to load line sequence
```

Do not crash the page.

## GSAP / anime.js Usage

Allowed uses:

1. fade in canvas after load;
2. animate title overlay;
3. animate camera drift;
4. animate background grid opacity;
5. animate debug panel appearance.

Not allowed:

1. using ScrollTrigger to control frame index;
2. tying animation playback to scroll progress;
3. replacing the player timing logic with page scroll.

## Example Secondary GSAP Use

```ts
gsap.fromTo(
  container,
  { opacity: 0 },
  { opacity: 1, duration: 0.8, ease: "power2.out" }
);
```

## Example Secondary anime.js Use

```ts
anime({
  targets: overlayElement,
  opacity: [0, 1],
  duration: 800,
  easing: "easeOutQuad",
});
```

Do not require both GSAP and anime.js. Use one if needed.

## Pause on Tab Hidden

Optional but recommended:

```ts
document.addEventListener("visibilitychange", () => {
  if (document.hidden) player.pause();
  else player.play();
});
```

If this is implemented, remove the listener on unmount.

## Do Not

Do not create multiple RAF loops.

Do not use `setInterval` for playback.

Do not trigger React state update every frame unless it is a throttled debug display.

Do not block autoplay on scroll events.
