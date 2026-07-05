import * as THREE from "three";
import type {
  InterpolatedFrameGroup,
  MaterialSystem,
  NormalizedLineSequence,
} from "./types";
import { evenPick, validateEdge } from "./sampling";

export function buildInterpolatedFrameGroup(
  sequence: NormalizedLineSequence,
  materialSystem: MaterialSystem
): InterpolatedFrameGroup {
  const group = new THREE.Group() as InterpolatedFrameGroup;
  group.userData = { kind: "interpolated-frame-group" };

  const allRoles = new Set<string>();
  const maxEdgeCounts: Record<string, number> = {};

  for (const frame of sequence.frames) {
    for (const [role, indices] of Object.entries(frame.edgeGroups)) {
      allRoles.add(role);
      maxEdgeCounts[role] = Math.max(maxEdgeCounts[role] ?? 0, indices.length);
    }
  }

  for (const role of allRoles) {
    const maxEdges = maxEdgeCounts[role] ?? 0;
    if (maxEdges === 0) continue;

    const controls = materialSystem.getRoleControls(role);
    if (!controls.visible) continue;

    const sampledMax = Math.floor(maxEdges * controls.lineRatio);
    const capacity = Math.max(sampledMax, 1);

    const positions = new Float32Array(capacity * 2 * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setDrawRange(0, 0);

    const material = materialSystem.getMaterialForRole(role) as THREE.LineBasicMaterial;
    material.opacity = controls.opacity;
    material.transparent = controls.opacity < 1.0;
    material.needsUpdate = true;

    const lineSegments = new THREE.LineSegments(geometry, material);
    lineSegments.userData = {
      kind: "interpolated-role-line-segments",
      role,
      materialKey: materialSystem.getMaterialKeyForRole(role),
      maxEdgeCount: capacity,
    };

    group.add(lineSegments);
  }

  return group;
}

export function getRoleLineSegments(
  group: InterpolatedFrameGroup,
  role: string
): THREE.LineSegments | undefined {
  for (const child of group.children) {
    if (child.userData.role === role) {
      return child as THREE.LineSegments;
    }
  }
  return undefined;
}

export function computeSampledEdgeIndices(
  sequence: NormalizedLineSequence,
  materialSystem: MaterialSystem
): Record<string, number[]> {
  const sampled: Record<string, number[]> = {};
  const allRoles = new Set<string>();
  const maxEdgeCounts: Record<string, number> = {};

  for (const frame of sequence.frames) {
    for (const [role, indices] of Object.entries(frame.edgeGroups)) {
      allRoles.add(role);
      maxEdgeCounts[role] = Math.max(maxEdgeCounts[role] ?? 0, indices.length);
    }
  }

  for (const role of allRoles) {
    const controls = materialSystem.getRoleControls(role);
    const maxEdges = maxEdgeCounts[role] ?? 0;
    const sampledCount = Math.floor(maxEdges * controls.lineRatio);
    const allIndices = Array.from({ length: maxEdges }, (_, i) => i);
    sampled[role] = evenPick(allIndices, sampledCount);
  }

  return sampled;
}

export function validateAndGetVertex(
  frame: NormalizedLineSequence["frames"][number],
  edgeIndex: number,
  edgeGroup: number[]
): { va?: [number, number, number]; vb?: [number, number, number]; valid: boolean } {
  const edgeIdx = edgeGroup[edgeIndex];
  if (edgeIdx === undefined) return { valid: false };

  const edge = frame.edges[edgeIdx];
  const check = validateEdge(edge, frame.vertices);
  if (!check.valid) return { valid: false };

  const [a, b] = edge;
  return { va: frame.vertices[a], vb: frame.vertices[b], valid: true };
}
