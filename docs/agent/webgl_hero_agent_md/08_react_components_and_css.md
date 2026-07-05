# 08 — React Components and CSS

## HeroCanvas

建议文件：

```text
src/components/webgl/HeroCanvas.tsx
```

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { HeroSceneController } from '@/webgl/hero/HeroSceneController';

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const controller = new HeroSceneController(containerRef.current);
    controller.init();

    return () => {
      controller.dispose();
    };
  }, []);

  return <div ref={containerRef} className="hero-canvas" />;
}
```

## RightHeroStage

建议文件：

```text
src/components/home/RightHeroStage.tsx
```

```tsx
import { HeroCanvas } from '@/components/webgl/HeroCanvas';

export function RightHeroStage() {
  return (
    <div className="right-hero-stage">
      <HeroCanvas />

      <div className="hero-corner-meta hero-corner-meta--top">
        <span>X:0</span>
        <span>Y:0</span>
        <span>Z:0</span>
      </div>

      <div className="hero-corner-meta hero-corner-meta--bottom">
        <span>STATUS: ONLINE</span>
        <i />
      </div>
    </div>
  );
}
```

## CSS

建议文件：

```text
src/styles/home.css
```

```css
.right-hero-stage {
  position: relative;
  min-height: clamp(560px, 72vh, 820px);
  background: #f3f0e8;
  overflow: hidden;
  border-left: 1px solid rgba(18, 22, 24, 0.35);
  border-bottom: 1px solid rgba(18, 22, 24, 0.35);
}

.hero-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.hero-canvas canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.hero-corner-meta {
  position: absolute;
  z-index: 4;
  font-family: var(--font-mono);
  font-size: 10px;
  color: #4a4d4f;
  display: flex;
  gap: 18px;
  pointer-events: none;
}

.hero-corner-meta--top {
  top: 42px;
  left: 48px;
}

.hero-corner-meta--bottom {
  right: 42px;
  bottom: 34px;
  align-items: center;
}

.hero-corner-meta i {
  width: 6px;
  height: 6px;
  background: #ff3b2f;
  display: block;
}
```

## HomePage 集成

示意：

```tsx
import { RightHeroStage } from '@/components/home/RightHeroStage';

export function HomePage() {
  return (
    <main className="system-frame">
      <TopSystemBar />

      <section className="main-hero-section">
        <LeftIdentityPanel />
        <RightHeroStage />
      </section>

      <BottomNavigation />
    </main>
  );
}
```

## 布局 CSS 示意

```css
.main-hero-section {
  display: grid;
  grid-template-columns: minmax(360px, 36vw) 1fr;
  min-height: clamp(620px, 82vh, 900px);
  border-bottom: 1px solid rgba(18, 22, 24, 0.35);
}

.left-identity-panel {
  border-right: 1px solid rgba(18, 22, 24, 0.35);
}
```

## 响应式建议

小屏幕可以先隐藏 WebGL：

```css
@media (max-width: 900px) {
  .main-hero-section {
    grid-template-columns: 1fr;
  }

  .right-hero-stage {
    min-height: 420px;
  }
}
```

更激进的移动端策略：

```css
@media (max-width: 640px) {
  .right-hero-stage {
    display: none;
  }
}
```

## 注意

如果当前项目使用 CSS Modules 或 Tailwind，需要把类名适配到当前项目风格。核心要求是：

```text
- right-hero-stage must be position: relative
- hero-canvas must be absolute inset: 0
- container must have non-zero height
```
