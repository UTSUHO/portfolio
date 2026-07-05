# 07 — Annotation Overlay

## 原则

不要用 Three.js TextGeometry 渲染标注文字。

原因：

```text
- DOM 字体更清晰
- CSS 更好控制
- 更符合系统界面风格
- 响应式更简单
```

## 投影函数

建议文件：

```text
src/webgl/hero/projectToScreen.ts
```

```ts
import * as THREE from 'three';

export function projectToScreen(
  object: THREE.Object3D,
  camera: THREE.Camera,
  container: HTMLElement,
) {
  const worldPosition = new THREE.Vector3();
  object.getWorldPosition(worldPosition);

  const projected = worldPosition.project(camera);

  const x = (projected.x * 0.5 + 0.5) * container.clientWidth;
  const y = (-projected.y * 0.5 + 0.5) * container.clientHeight;

  return {
    x,
    y,
    visible: projected.z > -1 && projected.z < 1,
  };
}
```

## AnnotationOverlay 组件

建议文件：

```text
src/components/webgl/AnnotationOverlay.tsx
```

```tsx
import type { AnnotationConfig } from './types';

interface ProjectedAnnotation extends AnnotationConfig {
  x: number;
  y: number;
  visible: boolean;
}

interface Props {
  annotations: ProjectedAnnotation[];
}

export function AnnotationOverlay({ annotations }: Props) {
  return (
    <div className="hero-annotations">
      {annotations
        .filter((item) => item.visible)
        .map((item) => (
          <div
            key={item.id}
            className={`hero-annotation hero-annotation--${item.side} ${
              item.active ? 'is-active' : ''
            }`}
            style={{
              transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
            }}
          >
            <span className="hero-annotation__code">{item.label}</span>
            {item.sublabel && (
              <span className="hero-annotation__sub">{item.sublabel}</span>
            )}
          </div>
        ))}
    </div>
  );
}
```

## CSS

建议文件：

```text
src/styles/hero-annotations.css
```

```css
.hero-annotations {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 3;
}

.hero-annotation {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.2;
  color: #1a1d1f;
  opacity: 0.72;
  transform-origin: left top;
  white-space: nowrap;
}

.hero-annotation::before {
  content: "";
  position: absolute;
  top: 6px;
  width: 24px;
  height: 1px;
  background: currentColor;
  opacity: 0.55;
}

.hero-annotation--right::before {
  left: -32px;
}

.hero-annotation--left::before {
  right: -32px;
}

.hero-annotation--top::before {
  left: 0;
  top: 18px;
}

.hero-annotation__code {
  display: block;
  letter-spacing: 0.04em;
}

.hero-annotation__sub {
  display: block;
  margin-top: 2px;
  color: #737373;
}

.hero-annotation.is-active {
  color: #ff3b2f;
  opacity: 1;
}
```

## Controller 与 Overlay 的连接

第一版可以不做实时 React state，只做 DOM transform 更新。

更干净的方式是：

```text
HeroSceneController
└── 每帧计算 anchors screen position
    └── callback(projectedAnnotations)
        └── React setState
```

接口建议：

```ts
export type AnnotationUpdateHandler = (items: ProjectedAnnotation[]) => void;
```

Controller 构造参数：

```ts
constructor(
  container: HTMLElement,
  options?: {
    onAnnotationUpdate?: AnnotationUpdateHandler;
  },
)
```

## 简化 MVP

如果 agent 时间有限，第一版可以先只实现静态 DOM label：

```text
- 位置写死
- 不跟随 3D anchor
- 先验证风格
```

第二版再实现：

```text
- Object3D anchor
- projectToScreen
- 每帧更新
- leader line
```

## 后续 leader line

可以使用 SVG overlay：

```text
AnnotationOverlay
├── svg.hero-annotation-lines
└── div.hero-annotation labels
```

每个 annotation 从 anchor point 画线到 label point。

第一版不要求。
