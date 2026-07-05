# 06 — Interaction and Scroll

## Pointer Parallax

建议文件：

```text
src/webgl/hero/bindPointerParallax.ts
```

```ts
import * as THREE from 'three';
import gsap from 'gsap';

interface Params {
  container: HTMLElement;
  root: THREE.Group;
  camera: THREE.Camera;
}

export function bindPointerParallax({ container, root }: Params) {
  const target = {
    rx: root.rotation.x,
    ry: root.rotation.y,
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();

    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(target, {
      rx: -0.28 + ny * 0.035,
      ry: 0.58 + nx * 0.045,
      duration: 0.7,
      ease: 'power3.out',
      onUpdate: () => {
        root.rotation.x = target.rx;
        root.rotation.y = target.ry;
      },
    });
  };

  container.addEventListener('pointermove', onPointerMove);

  return () => {
    container.removeEventListener('pointermove', onPointerMove);
  };
}
```

## Parallax 设计限制

不要超过：

```text
root.rotation.x: ±0.04
root.rotation.y: ±0.05
```

效果应该是“轻微响应”，不是“展示模型”。

## GSAP ScrollTrigger 拆解动画

建议文件：

```text
src/webgl/hero/bindScrollTimeline.ts
```

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroArchitecture } from '@/components/webgl/types';

interface Params {
  architecture: HeroArchitecture;
  trigger: Element;
}

export function bindScrollTimeline({ architecture, trigger }: Params) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: '+=2600',
      scrub: 1,
    },
  });

  Object.values(architecture.layers).forEach((layer, i) => {
    const initial = layer.userData.initialPosition;
    const offset = layer.userData.explodeOffset;

    tl.to(
      layer.position,
      {
        x: initial.x + offset.x,
        y: initial.y + offset.y,
        z: initial.z + offset.z,
        ease: 'none',
      },
      i * 0.08,
    );
  });

  tl.to(
    architecture.root.rotation,
    {
      y: 0.68,
      x: -0.22,
      ease: 'none',
    },
    0,
  );

  tl.to(
    architecture.activeNode.position,
    {
      y: architecture.activeNode.position.y + 0.45,
      ease: 'none',
    },
    0.15,
  );

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
```

## 更精确的 section 联动方案

后续可以改成每个 section 一个 ScrollTrigger：

```text
HOME     -> home layer active
PROJECTS -> projects layer active
RESUME   -> resume layer active
LIBRARY  -> library layer active
NOTES    -> notes layer active
```

推荐状态：

```ts
export interface HeroScrollState {
  activeIndex: number;
  progress: number;
  sectionId: 'home' | 'projects' | 'resume' | 'library' | 'notes';
}
```

## Active Node 后续切换

第一版 active node 固定即可。

第二版可以根据 active section 切换：

```text
HOME     -> identity core position
PROJECTS -> project stack position
RESUME   -> experience archive position
LIBRARY  -> knowledge grid position
NOTES    -> note terminal position
```

示例：

```ts
const ACTIVE_NODE_POSITIONS = {
  home: [1.7, 0.95, 0.95],
  projects: [-1.0, 1.2, 0.8],
  resume: [1.2, 1.55, -0.7],
  library: [-0.6, 2.0, 0.4],
  notes: [0.7, 2.35, 0.2],
};
```

## 动画验收

合格：

```text
- 鼠标移动时建筑轻微改变角度
- 滚动时五个 layer 逐渐分离
- red active node 有轻微呼吸
- 画面仍然稳定、冷静
```

不合格：

```text
- 建筑旋转过快
- 滚动时层级飞出屏幕
- parallax 让人晕
- active node 过度发光
```
