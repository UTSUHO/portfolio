import * as THREE from "three";
import type {
  BuildFrameGroupOptions,
  MaterialSystem,
  NormalizedLineFrame,
} from "./types";
import { evenPick, validateEdge } from "./sampling";

export function buildFrameGroup(
  frame: NormalizedLineFrame,
  materialSystem: MaterialSystem,
  options?: BuildFrameGroupOptions
): THREE.Group {
  const group = new THREE.Group();
  group.userData = {
    kind: "line-sequence-frame-group",
    frame: frame.frame,
    roleCount: 0,
    edgeCount: 0,
  };

  const roles = options?.debugFlattenRoles
    ? ["debug_unknown"]
    : Object.keys(frame.edgeGroups);

  let totalEdgeCount = 0;

  for (const role of roles) {
    const edgeIndices = options?.debugFlattenRoles
      ? frame.edges.map((_, i) => i)
      : frame.edgeGroups[role] ?? [];

    if (edgeIndices.length === 0) continue;

    const controls = materialSystem.getRoleControls(role);
    if (!controls.visible) continue;

    const sampledCount = Math.floor(edgeIndices.length * controls.lineRatio);
    const selectedIndices = evenPick(edgeIndices, sampledCount);

    const positions = new Float32Array(selectedIndices.length * 2 * 3);
    let positionIndex = 0;
    let skippedEdgeCount = 0;
    let renderedEdgeCount = 0;

    for (const edgeIndex of selectedIndices) {
      const edge = frame.edges[edgeIndex];
      const check = validateEdge(edge, frame.vertices);
      if (!check.valid) {
        skippedEdgeCount++;
        continue;
      }

      const [a, b] = edge;
      const va = frame.vertices[a];
      const vb = frame.vertices[b];

      positions[positionIndex++] = va[0];
      positions[positionIndex++] = va[1];
      positions[positionIndex++] = va[2];
      positions[positionIndex++] = vb[0];
      positions[positionIndex++] = vb[1];
      positions[positionIndex++] = vb[2];
      renderedEdgeCount++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setDrawRange(0, renderedEdgeCount * 2);

    const material = materialSystem.getMaterialForRole(role) as THREE.LineBasicMaterial;
    material.opacity = controls.opacity;
    material.transparent = controls.opacity < 1.0;
    material.needsUpdate = true;

    const lineSegments = new THREE.LineSegments(geometry, material);
    lineSegments.userData = {
      kind: "classified-line-segments",
      frame: frame.frame,
      role,
      materialKey: materialSystem.getMaterialKeyForRole(role),
      edgeCount: renderedEdgeCount,
      skippedEdgeCount,
    };

    group.add(lineSegments);
    totalEdgeCount += renderedEdgeCount;
  }

  group.userData.roleCount = group.children.length;
  group.userData.edgeCount = totalEdgeCount;

  return group;
}
