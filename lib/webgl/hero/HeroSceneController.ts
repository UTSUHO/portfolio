import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createHeroArchitecture } from './createHeroArchitecture';
import { bindPointerParallax } from './bindPointerParallax';
import { bindScrollTimeline } from './bindScrollTimeline';
import { projectToScreen } from './projectToScreen';
import type { AnnotationUpdateHandler } from '@/app/components/webgl/types';

gsap.registerPlugin(ScrollTrigger);

interface Options {
  onAnnotationUpdate?: AnnotationUpdateHandler;
}

export class HeroSceneController {
  private container: HTMLElement;
  private options: Options;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private architecture!: ReturnType<typeof createHeroArchitecture>;
  private animationFrame = 0;
  private cleanupFns: Array<() => void> = [];

  constructor(container: HTMLElement, options: Options = {}) {
    this.container = container;
    this.options = options;
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
    const frustum = 3.45;

    this.camera = new THREE.OrthographicCamera(
      -frustum * aspect,
      frustum * aspect,
      frustum,
      -frustum,
      0.1,
      100,
    );

    this.camera.position.set(5.4, 5.2, 6.2);
    this.camera.lookAt(0, 1.05, 0);
  }

  private createLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 3.4);
    key.position.set(5, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
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

    this.updateAnnotations();
    this.renderer.render(this.scene, this.camera);
  };

  private getScrollProgress() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (!maxScroll) return 0;
    return Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  }

  private updateAnnotations() {
    const { onAnnotationUpdate } = this.options;
    if (!onAnnotationUpdate || !this.architecture?.anchors) return;

    const scrollProgress = this.getScrollProgress();

    const items = Object.entries(this.architecture.anchors).map(([id, anchor]) => {
      const config = anchor.userData.annotationConfig as {
        label: string;
        sublabel?: string;
        side: 'left' | 'right' | 'top';
        active?: boolean;
        initialVisible?: boolean;
      };
      const projected = projectToScreen(anchor, this.camera, this.container, config?.side);

      const isVisible =
        config?.initialVisible ||
        scrollProgress > 0.08;

      const fadeProgress =
        config?.initialVisible
          ? 1
          : Math.min(Math.max((scrollProgress - 0.08) / 0.12, 0), 1);

      return {
        id,
        label: config?.label ?? id,
        sublabel: config?.sublabel,
        targetLayer: anchor.userData.targetLayer,
        side: config?.side ?? 'right',
        active: config?.active,
        x: projected.x,
        y: projected.y,
        visible: projected.visible && isVisible,
        opacity: 0.72 * fadeProgress,
      };
    });

    onAnnotationUpdate(items);
  }

  private resize = () => {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (!width || !height) return;

    const aspect = width / height;
    const frustum = 3.45;

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
