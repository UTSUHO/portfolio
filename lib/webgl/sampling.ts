import type { Edge, Vec3 } from "./types";

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

export function evenPick<T>(items: T[], count: number): T[] {
  if (count >= items.length) return items;
  if (count <= 0) return [];
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const index = Math.round((i * (items.length - 1)) / (count - 1));
    result.push(items[index]);
  }
  return result;
}

export function validateEdge(
  edge: Edge,
  vertices: Vec3[]
): { valid: boolean; reason?: string } {
  if (!edge || !Array.isArray(edge)) {
    return { valid: false, reason: "edge is not an array" };
  }
  const [a, b] = edge;
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return { valid: false, reason: "edge indices are not finite" };
  }
  if (a < 0 || b < 0 || a >= vertices.length || b >= vertices.length) {
    return { valid: false, reason: "edge index out of range" };
  }
  const va = vertices[a];
  const vb = vertices[b];
  if (!va || !vb) {
    return { valid: false, reason: "vertex missing" };
  }
  if (
    !Number.isFinite(va[0]) ||
    !Number.isFinite(va[1]) ||
    !Number.isFinite(va[2]) ||
    !Number.isFinite(vb[0]) ||
    !Number.isFinite(vb[1]) ||
    !Number.isFinite(vb[2])
  ) {
    return { valid: false, reason: "vertex coordinates are not finite" };
  }
  return { valid: true };
}
