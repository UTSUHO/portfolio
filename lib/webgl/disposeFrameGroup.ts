import * as THREE from "three";

export function disposeFrameGroup(group: THREE.Group) {
  group.traverse((obj) => {
    const lineSegments = obj as THREE.LineSegments;
    if (lineSegments.geometry) {
      lineSegments.geometry.dispose();
    }
  });
  group.clear();
}
