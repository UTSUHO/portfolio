"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  createLineScene,
  createMaterialSystem,
  LineSequencePlayer,
  loadLineSequence,
  normalizeLineSequence,
} from "@/lib/webgl";
import type {
  LineSceneRuntime,
  MaterialSystem,
  NormalizedLineSequence,
  RoleMaterialOverrides,
} from "@/lib/webgl";
import LineSequenceDebugOverlay from "./line-sequence-debug-overlay";

interface LineSequenceSceneProps {
  dataUrl?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  playbackFps?: number;
  playbackSpeed?: number;
  durationSeconds?: number;
  showDebug?: boolean;
  roleMaterials?: RoleMaterialOverrides;
}

export default function LineSequenceScene({
  dataUrl = "/data/line_sequence_classified.json",
  className = "",
  autoPlay = true,
  loop = true,
  playbackFps,
  playbackSpeed,
  durationSeconds,
  showDebug = false,
  roleMaterials,
}: LineSequenceSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const sceneRuntimeRef = useRef<LineSceneRuntime | null>(null);
  const playerRef = useRef<LineSequencePlayer | null>(null);
  const materialSystemRef = useRef<MaterialSystem | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const visibilityHandlerRef = useRef<(() => void) | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || rendererRef.current) return;
    rendererRef.current = true;

    const sceneRuntime = createLineScene(canvas, container);
    sceneRuntimeRef.current = sceneRuntime;

    const resizeObserver = new ResizeObserver(() => {
      sceneRuntime.resize();
    });
    resizeObserver.observe(container);
    resizeObserverRef.current = resizeObserver;

    let disposed = false;
    let lastTime = performance.now();

    const init = async () => {
      try {
        const raw = await loadLineSequence(dataUrl);
        const sequence: NormalizedLineSequence = normalizeLineSequence(raw);

        if (disposed) return;

        const materialSystem = createMaterialSystem(sequence, undefined, roleMaterials);
        materialSystemRef.current = materialSystem;

        const effectiveFps =
          playbackFps ??
          (durationSeconds
            ? sequence.frames.length / durationSeconds
            : 24);

        const player = new LineSequencePlayer({
          sequence,
          root: sceneRuntime.root,
          materialSystem,
          fps: effectiveFps,
          speed: playbackSpeed ?? 1,
          loop,
        });
        player.init();
        playerRef.current = player;

        fitSequenceToCamera(sequence, sceneRuntime);

        player.setFrameIndex(0);
        if (autoPlay) player.play();

        setLoaded(true);
      } catch (err) {
        console.error("[LineSequenceScene] failed to load sequence", err);
        setError(err instanceof Error ? err.message : "Failed to load sequence");
      }
    };

    init();

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      playerRef.current?.update(deltaSeconds);
      sceneRuntime.render();

      if (showDebug) {
        setTick((t) => (t + 1) % 30);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        playerRef.current?.pause();
      } else if (autoPlay) {
        playerRef.current?.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    visibilityHandlerRef.current = () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    return () => {
      disposed = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      visibilityHandlerRef.current?.();
      resizeObserverRef.current?.disconnect();
      playerRef.current?.dispose();
      materialSystemRef.current?.dispose();
      sceneRuntimeRef.current?.dispose();
      playerRef.current = null;
      materialSystemRef.current = null;
      sceneRuntimeRef.current = null;
      rendererRef.current = false;
    };
  }, [dataUrl, autoPlay, loop, playbackFps, playbackSpeed, durationSeconds, showDebug, roleMaterials]);

  return (
    <div ref={containerRef} className={`relative w-full flex-1 min-h-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80">
          <div className="text-xs uppercase tracking-widest text-text-secondary">
            Loading geometry node line sequence...
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80">
          <div className="text-xs uppercase tracking-widest text-red-400 text-center px-4">
            {error}
          </div>
        </div>
      )}

      {showDebug && (
        <LineSequenceDebugOverlay
          player={playerRef.current}
          materialSystem={materialSystemRef.current}
          loaded={loaded}
          error={error}
        />
      )}

      {/* force re-render of debug overlay with throttled state */}
      <span className="hidden">{tick}</span>
    </div>
  );
}

function fitSequenceToCamera(
  sequence: NormalizedLineSequence,
  sceneRuntime: LineSceneRuntime
) {
  const box = new THREE.Box3();
  let hasVertex = false;

  for (const frame of sequence.frames) {
    for (const vertex of frame.vertices) {
      box.expandByPoint(new THREE.Vector3(vertex[0], vertex[1], vertex[2]));
      hasVertex = true;
    }
  }

  if (!hasVertex) return;

  const center = new THREE.Vector3();
  box.getCenter(center);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z, 0.001);

  sceneRuntime.root.position.copy(center).multiplyScalar(-1);

  const fov = sceneRuntime.camera.fov * (Math.PI / 180);
  const distance = maxDim / (2 * Math.tan(fov / 2));
  sceneRuntime.camera.position.set(0, 0, Math.max(distance * 1.2, 2));
  sceneRuntime.camera.lookAt(0, 0, 0);
  sceneRuntime.camera.updateProjectionMatrix();
}
