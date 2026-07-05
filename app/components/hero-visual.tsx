"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadGLTFModel } from "../../lib/model";

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

export default function HeroVisual() {
  const refContainer = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reqRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);

  const handleWindowResize = useCallback(() => {
    const container = refContainer.current;
    const renderer = rendererRef.current;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      renderer.setSize(scW, scH);
    }
  }, []);

  useEffect(() => {
    const container = refContainer.current;
    if (!container || rendererRef.current) return;

    const scW = container.clientWidth;
    const scH = container.clientHeight;

    const rendererInstance = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererInstance.setSize(scW, scH);
    rendererInstance.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(rendererInstance.domElement);
    rendererRef.current = rendererInstance;

    const scale = scH * 0.005 + 4.8;
    const camera = new THREE.OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.01,
      50000
    );
    const target = new THREE.Vector3(-0.5, 1.2, 0);
    const initialCameraPosition = new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    );
    camera.position.copy(initialCameraPosition);
    camera.lookAt(target);

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, rendererInstance.domElement);
    controls.autoRotate = true;
    controls.target = target;

    loadGLTFModel(scene, "/portal2.glb", {
      receiveShadow: false,
      castShadow: false,
    }).then(() => {
      setLoading(false);
    });

    let frame = 0;
    const animate = () => {
      reqRef.current = requestAnimationFrame(animate);

      frame = frame <= 100 ? frame + 1 : frame;

      if (frame <= 100) {
        const p = initialCameraPosition;
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

        camera.position.y = 10;
        camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
        camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
        camera.lookAt(target);
      } else {
        controls.update();
      }

      rendererInstance.render(scene, camera);
    };

    animate();

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      controls.dispose();
      rendererInstance.dispose();
      rendererRef.current = null;
      if (container.contains(rendererInstance.domElement)) {
        container.removeChild(rendererInstance.domElement);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [handleWindowResize]);

  return (
    <div ref={refContainer} className="w-full h-full flex-1 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs uppercase tracking-widest text-text-secondary">
            Loading model...
          </div>
        </div>
      )}
    </div>
  );
}
