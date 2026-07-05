# Line Sequence Player

## Purpose

This module owns playback timing, frame switching, caching, loop behavior, and pause/resume state.

It does not own React lifecycle and does not create the renderer.

## Recommended Module

```txt
lib/webgl/LineSequencePlayer.ts
```

## Class Interface

```ts
class LineSequencePlayer {
  constructor(params: {
    sequence: NormalizedLineSequence;
    root: THREE.Group;
    materialSystem: MaterialSystem;
    fps?: number;
    speed?: number;
    loop?: boolean;
    cacheSize?: number;
  });

  play(): void;
  pause(): void;
  toggle(): void;
  stop(): void;

  update(deltaSeconds: number): void;

  setFrameIndex(index: number): void;
  setProgress(progress: number): void;

  setFps(fps: number): void;
  setSpeed(speed: number): void;
  setLoop(loop: boolean): void;

  getState(): PlayerState;

  dispose(): void;
}
```

## Player State

```ts
type PlayerState = {
  isPlaying: boolean;
  frameIndex: number;
  frameCount: number;
  blenderFrame: number;
  elapsed: number;
  fps: number;
  speed: number;
  loop: boolean;
};
```

## Playback Logic

The animation should advance by time after loading.

Use accumulated time:

```ts
accumulator += deltaSeconds * speed;
const frameDuration = 1 / fps;

while (accumulator >= frameDuration) {
  accumulator -= frameDuration;
  advanceFrame();
}
```

## Looping

If `loop = true`:

```ts
nextIndex = (currentIndex + 1) % frameCount;
```

If `loop = false`, stop at the final frame.

## No Scroll-Driven Playback

Do not bind `frameIndex` to scroll progress.

`setProgress(progress)` can exist for manual debugging or future use, but it must not be wired to ScrollTrigger as the main behavior.

## Frame Switching

When switching frames:

1. get frame group from cache or build it;
2. remove current frame group from root;
3. add next frame group to root;
4. update state.

## Frame Cache

Recommended cache:

```ts
Map<number, THREE.Group>
```

Use a maximum size:

```txt
cacheSize = 8
```

When exceeding cache size:

1. remove least recently used frame;
2. dispose its geometry;
3. delete from cache.

Do not cache all frames unless the JSON is known to be small enough.

## Crossfade Optional

First version can switch frames discretely.

Optional crossfade:

1. keep previous and next frame groups for a short duration;
2. fade role materials or object opacity;
3. remove previous group after fade.

Do not attempt vertex morphing.

## Disposal

On dispose:

1. remove current frame group from root;
2. dispose all cached frame groups;
3. clear cache;
4. stop playback;
5. remove references.

## Do Not

Do not create a new material system per frame.

Do not create RAF inside the player unless it is clearly owned and disposed.

Prefer external RAF calling:

```ts
player.update(deltaSeconds);
renderer.render(scene, camera);
```
