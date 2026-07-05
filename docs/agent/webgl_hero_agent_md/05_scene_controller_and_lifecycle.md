# 05 — Scene Controller and Lifecycle

## 目标

创建一个稳定的 Three.js 控制器，管理：

```text
- renderer
- scene
- camera
- lights
- architecture root
- animation loop
- resize
- pointer interaction
- scroll timeline
- dispose cleanup
```

## HeroSceneController

建议文件：

```text
src/webgl/hero/HeroSceneController.ts
```

```ts
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createHeroArchitecture } from './createHeroArchitecture';
import { bindPointerParallax } from './bindPointerParallax';
import { bindScrollTimeline } from './bindScrollTimeline';

gsap.registerPlugin(ScrollTrigger);

export class HeroSceneController {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private architecture!: ReturnType<typeof createHeroArchitecture>;
  private animationFrame = 0;
  private cleanupFns: Array<() => void> = [];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  init() {
    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.createLights();

    this.architecture = createHeroArchitecture();
    this.scene.add(this.architecture.root);

    this.cleanupFns.push(
      bindPointerParallax({
        container: this.container,
        root: this.architecture.root,
        camera: this.camera,
      }),
    );

    this.cleanupFns.push(
      bindScrollTimeline({
        architecture: this.architecture,
        trigger: document.body,
      }),
    );

    window.addEventListener('resize', this.resize);
    this.resize();
    this.render();
  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  private createScene() {
    this.scene = new THREE.Scene();
  }

  private createCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    const frustum = 5.2;

    this.camera = new THREE.OrthographicCamera(
      -frustum * aspect,
      frustum * aspect,
      frustum,
      -frustum,
      0.1,
      100,
    );

    this.camera.position.set(4.8, 4.2, 5.4);
    this.camera.lookAt(0, 0.8, 0);
  }

  private createLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 1.6);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(5, 8, 5);
    key.castShadow = true;
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.8);
    fill.position.set(-4, 3, -2);
    this.scene.add(fill);
  }

  private render = () => {
    this.animationFrame = requestAnimationFrame(this.render);

    if (this.architecture?.activeNode) {
      const t = performance.now() * 0.001;
      const s = 1 + Math.sin(t * 2.4) * 0.04;
      this.architecture.activeNode.scale.setScalar(s);
    }

    this.renderer.render(this.scene, this.camera);
  };

  private resize = () => {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (!width || !height) return;

    const aspect = width / height;
    const frustum = 5.2;

    this.camera.left = -frustum * aspect;
    this.camera.right = frustum * aspect;
    this.camera.top = frustum;
    this.camera.bottom = -frustum;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };

  dispose() {
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.resize);

    for (const fn of this.cleanupFns) fn();

    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;

      if (mesh.geometry) {
        mesh.geometry.dispose();
      }

      const material = mesh.material;
      if (Array.isArray(material)) {
        material.forEach((m) => m.dispose());
      } else if (material) {
        material.dispose();
      }
    });

    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
```

## 生命周期要求

### init

必须按顺序：

```text
1. createRenderer
2. createScene
3. createCamera
4. createLights
5. createHeroArchitecture
6. add root to scene
7. bind pointer
8. bind scroll
9. bind resize
10. start render loop
```

### dispose

必须清理：

```text
- animation frame
- resize listener
- pointer listener
- GSAP timeline / ScrollTrigger
- geometry
- material
- renderer
- canvas DOM
```

## SSR 注意

如果项目是 Next.js，确保该组件只在 client side 运行：

```tsx
'use client';
```

或者动态导入：

```ts
dynamic(() => import('./HeroCanvas'), { ssr: false })
```

## 常见问题

### 右侧 canvas 不显示

检查：

```text
- 容器高度是否为 0
- container 是否 position relative
- WebGLRenderer 是否 append 到 DOM
- camera 是否 lookAt 正确
- root scale 是否太小
```

### 滚动动画没有触发

检查：

```text
- gsap.registerPlugin(ScrollTrigger)
- trigger 是否存在
- 页面是否有足够高度
- ScrollTrigger.refresh() 是否需要在布局完成后调用
```
