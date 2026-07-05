import * as THREE from "three";
import type {
  InterpolatedFrameGroup,
  LineSequencePlayerParams,
  MaterialSystem,
  NormalizedLineSequence,
  PlayerState,
} from "./types";
import {
  buildInterpolatedFrameGroup,
  computeSampledEdgeIndices,
  validateAndGetVertex,
} from "./buildInterpolatedFrameGroup";
import { disposeFrameGroup } from "./disposeFrameGroup";

export class LineSequencePlayer {
  private sequence: NormalizedLineSequence;
  private root: THREE.Group;
  private materialSystem: MaterialSystem;
  private fps: number;
  private speed: number;
  private loop: boolean;

  private isPlaying = false;
  private frameIndex = 0;
  private accumulator = 0;
  private elapsed = 0;
  private frameGroup: InterpolatedFrameGroup | null = null;
  private sampledEdgeIndices: Record<string, number[]> = {};

  constructor(params: LineSequencePlayerParams) {
    this.sequence = params.sequence;
    this.root = params.root;
    this.materialSystem = params.materialSystem;
    this.fps = params.fps ?? 24;
    this.speed = params.speed ?? 1;
    this.loop = params.loop ?? true;
  }

  init() {
    if (this.frameGroup) return;

    this.sampledEdgeIndices = computeSampledEdgeIndices(
      this.sequence,
      this.materialSystem
    );

    this.frameGroup = buildInterpolatedFrameGroup(
      this.sequence,
      this.materialSystem
    );
    this.root.add(this.frameGroup);
    this.updateGeometry();
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  toggle() {
    this.isPlaying = !this.isPlaying;
  }

  stop() {
    this.isPlaying = false;
    this.frameIndex = 0;
    this.accumulator = 0;
    this.elapsed = 0;
    this.updateGeometry();
  }

  private getWrappedFrameIndex(index: number): number {
    const frameCount = this.sequence.frames.length;
    if (frameCount === 0) return 0;
    if (this.loop) {
      return ((index % frameCount) + frameCount) % frameCount;
    }
    return Math.max(0, Math.min(index, frameCount - 1));
  }

  private updateGeometry() {
    if (!this.frameGroup) return;

    const frameCount = this.sequence.frames.length;
    if (frameCount === 0) return;

    const frameIndex = this.getWrappedFrameIndex(this.frameIndex);
    const frame = this.sequence.frames[frameIndex];

    for (const child of this.frameGroup.children) {
      const role = child.userData.role as string;
      const lineSegments = child as THREE.LineSegments;
      const geometry = lineSegments.geometry;
      const positionAttribute = geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;

      const sampledIndices = this.sampledEdgeIndices[role] ?? [];
      const edgeGroup = frame.edgeGroups[role] ?? [];

      let writeIndex = 0;
      let visibleCount = 0;

      for (const sampledIdx of sampledIndices) {
        const edge = validateAndGetVertex(frame, sampledIdx, edgeGroup);
        if (!edge.valid) continue;

        const va = edge.va!;
        const vb = edge.vb!;

        positions[writeIndex++] = va[0];
        positions[writeIndex++] = va[1];
        positions[writeIndex++] = va[2];
        positions[writeIndex++] = vb[0];
        positions[writeIndex++] = vb[1];
        positions[writeIndex++] = vb[2];

        visibleCount++;
      }

      geometry.setDrawRange(0, visibleCount * 2);
      positionAttribute.needsUpdate = true;

      const controls = this.materialSystem.getRoleControls(role);
      lineSegments.visible = controls.visible && visibleCount > 0;
      const material = lineSegments.material as THREE.LineBasicMaterial;
      material.opacity = controls.opacity;
      material.transparent = controls.opacity < 1.0;
    }
  }

  update(deltaSeconds: number) {
    this.elapsed += deltaSeconds;

    if (!this.isPlaying) return;

    this.accumulator += deltaSeconds * this.speed;
    const frameDuration = 1 / this.fps;

    let advanced = false;
    while (this.accumulator >= frameDuration) {
      this.accumulator -= frameDuration;
      this.frameIndex++;
      advanced = true;
    }

    if (advanced) {
      const frameCount = this.sequence.frames.length;
      if (!this.loop && this.frameIndex >= frameCount) {
        this.frameIndex = frameCount - 1;
        this.isPlaying = false;
      }
      this.updateGeometry();
    }
  }

  setFrameIndex(index: number) {
    const frameCount = this.sequence.frames.length;
    this.frameIndex = Math.max(0, Math.min(index, frameCount - 1));
    this.updateGeometry();
  }

  setProgress(progress: number) {
    const frameCount = this.sequence.frames.length;
    const clamped = Math.max(0, Math.min(1, progress));
    this.frameIndex = Math.floor(clamped * (frameCount - 1));
    this.updateGeometry();
  }

  setFps(fps: number) {
    this.fps = Math.max(1, fps);
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setLoop(loop: boolean) {
    this.loop = loop;
  }

  getState(): PlayerState {
    const frameIndex = this.getWrappedFrameIndex(this.frameIndex);
    const frame = this.sequence.frames[frameIndex];
    const vertexCount = frame?.vertices.length ?? 0;
    const edgeCount = Object.values(frame?.roleCounts ?? {}).reduce(
      (a, b) => a + b,
      0
    );
    return {
      isPlaying: this.isPlaying,
      frameIndex,
      frameCount: this.sequence.frames.length,
      blenderFrame: frame?.frame ?? 0,
      subFrame: 0,
      elapsed: this.elapsed,
      fps: this.fps,
      speed: this.speed,
      loop: this.loop,
      vertexCount,
      edgeCount,
    };
  }

  getCachedFrameCount(): number {
    return 0;
  }

  getCurrentGroup(): THREE.Group | null {
    return this.frameGroup;
  }

  dispose() {
    this.isPlaying = false;
    if (this.frameGroup) {
      if (this.frameGroup.parent === this.root) {
        this.root.remove(this.frameGroup);
      }
      disposeFrameGroup(this.frameGroup);
      this.frameGroup = null;
    }
  }
}
