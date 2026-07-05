import type {
  LineSequence,
  LineFrame,
  MaterialConfig,
  NormalizedLineFrame,
  NormalizedLineSequence,
} from "./types";
import { safeArray, validateEdge } from "./sampling";

const DEFAULT_MATERIALS: Record<string, MaterialConfig> = {
  primary_ring: { color: "#B8E8FF", opacity: 0.92, lineWidth: 1, glow: 0.45 },
  secondary_ring: { color: "#6EAAC4", opacity: 0.45, lineWidth: 1, glow: 0.18 },
  connection_line: { color: "#4A7E99", opacity: 0.38, lineWidth: 1, glow: 0.1 },
  long_connection: { color: "#9FE8FF", opacity: 0.78, lineWidth: 1, glow: 0.42 },
  hub_line: { color: "#FFFFFF", opacity: 0.82, lineWidth: 1, glow: 0.55 },
  debug_unknown: { color: "#FF4D4D", opacity: 0.85, lineWidth: 1, glow: 0.3 },
};

const DEFAULT_ROLE_TO_MATERIAL: Record<string, string> = {
  uncategorized: "debug_unknown",
};

export class LineSequenceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LineSequenceValidationError";
  }
}

function buildEdgeGroupsFromRoles(
  edgesLength: number,
  edgeRoles: string[]
): Record<string, number[]> {
  const groups: Record<string, number[]> = {};
  for (let i = 0; i < edgesLength; i++) {
    const role = edgeRoles[i] ?? "uncategorized";
    if (!groups[role]) groups[role] = [];
    groups[role].push(i);
  }
  return groups;
}

function normalizeFrame(raw: LineFrame, roleToMaterial: Record<string, string>): NormalizedLineFrame {
  const vertices = safeArray(raw.vertices);
  const edges = safeArray(raw.edges);
  const edgeRoles = safeArray(raw.edge_roles);
  const edgeMaterials = safeArray(raw.edge_materials);
  const edgeGroups = raw.edge_groups
    ? { ...raw.edge_groups }
    : buildEdgeGroupsFromRoles(edges.length, edgeRoles);
  const roleCounts: Record<string, number> = {};

  for (const [role, indices] of Object.entries(edgeGroups)) {
    roleCounts[role] = indices.length;
  }

  const normalizedEdgeMaterials = edges.map((_, index) => {
    const role = edgeRoles[index] ?? "uncategorized";
    return (
      edgeMaterials[index] ??
      roleToMaterial[role] ??
      roleToMaterial["uncategorized"] ??
      "debug_unknown"
    );
  });

  const normalizedEdgeRoles = edges.map((_, index) => edgeRoles[index] ?? "uncategorized");

  if (edgeRoles.length > 0 && edgeRoles.length !== edges.length) {
    console.warn(
      `[LineSequence] edge_roles length (${edgeRoles.length}) does not match edges length (${edges.length}) on frame ${raw.frame}`
    );
  }
  if (edgeMaterials.length > 0 && edgeMaterials.length !== edges.length) {
    console.warn(
      `[LineSequence] edge_materials length (${edgeMaterials.length}) does not match edges length (${edges.length}) on frame ${raw.frame}`
    );
  }

  let skippedEdges = 0;
  for (const [role, indices] of Object.entries(edgeGroups)) {
    const validIndices: number[] = [];
    for (const idx of indices) {
      const edge = edges[idx];
      const check = validateEdge(edge, vertices);
      if (check.valid) {
        validIndices.push(idx);
      } else {
        skippedEdges++;
        console.warn(
          `[LineSequence] skipping invalid edge ${idx} in role "${role}" on frame ${raw.frame}: ${check.reason}`
        );
      }
    }
    edgeGroups[role] = validIndices;
  }

  if (skippedEdges > 0) {
    console.warn(
      `[LineSequence] frame ${raw.frame}: skipped ${skippedEdges} invalid edges`
    );
  }

  return {
    frame: raw.frame,
    vertices,
    edges,
    edgeRoles: normalizedEdgeRoles,
    edgeMaterials: normalizedEdgeMaterials,
    edgeGroups,
    roleCounts,
    componentSummaries: safeArray(raw.component_summaries),
  };
}

export function normalizeLineSequence(raw: LineSequence): NormalizedLineSequence {
  if (!raw || typeof raw !== "object") {
    throw new LineSequenceValidationError("Input is not an object");
  }

  const frames = safeArray(raw.frames);
  if (frames.length === 0) {
    throw new LineSequenceValidationError("frames is empty or missing");
  }

  for (const frame of frames) {
    if (!Array.isArray(frame.vertices)) {
      throw new LineSequenceValidationError(
        `Frame ${frame.frame} is missing vertices array`
      );
    }
    if (!Array.isArray(frame.edges)) {
      throw new LineSequenceValidationError(
        `Frame ${frame.frame} is missing edges array`
      );
    }
  }

  const materials: Record<string, MaterialConfig> =
    raw.materials && Object.keys(raw.materials).length > 0
      ? { ...raw.materials }
      : { ...DEFAULT_MATERIALS };

  const roleToMaterial: Record<string, string> = raw.role_to_material
    ? { ...raw.role_to_material, ...DEFAULT_ROLE_TO_MATERIAL }
    : { ...DEFAULT_ROLE_TO_MATERIAL };

  const normalizedFrames = frames.map((frame) => normalizeFrame(frame, roleToMaterial));

  return {
    sourceObject: raw.source_object ?? "unknown",
    frameStart: raw.frame_start ?? 1,
    frameEnd: raw.frame_end ?? normalizedFrames.length,
    frameStep: raw.frame_step ?? 1,
    materials,
    roleToMaterial,
    frames: normalizedFrames,
  };
}
