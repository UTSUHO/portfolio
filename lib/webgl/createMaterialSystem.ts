import * as THREE from "three";
import type { MaterialConfig, MaterialSystem, NormalizedLineSequence, RoleControls } from "./types";

const DEFAULT_MATERIALS: Record<string, MaterialConfig> = {
  primary_ring: { color: "#B8E8FF", opacity: 0.92, lineWidth: 1, glow: 0.45 },
  secondary_ring: { color: "#6EAAC4", opacity: 0.45, lineWidth: 1, glow: 0.18 },
  inner_ring: { color: "#4A7E99", opacity: 0.38, lineWidth: 1, glow: 0.1 },
  connection_line: { color: "#4A7E99", opacity: 0.38, lineWidth: 1, glow: 0.1 },
  long_connection: { color: "#9FE8FF", opacity: 0.78, lineWidth: 1, glow: 0.42 },
  hub_line: { color: "#FFFFFF", opacity: 0.82, lineWidth: 1, glow: 0.55 },
  annotation_line: { color: "#FFAA55", opacity: 0.7, lineWidth: 1, glow: 0.2 },
  debug_unknown: { color: "#FF4D4D", opacity: 0.85, lineWidth: 1, glow: 0.3 },
};

const DEFAULT_ROLE_CONTROLS: Record<string, RoleControls> = {
  outer_large_node_ring: { visible: true, opacity: 1.0, lineRatio: 1.0 },
  outer_small_node_ring: { visible: true, opacity: 0.7, lineRatio: 1.0 },
  inner_large_node_ring: { visible: true, opacity: 0.85, lineRatio: 1.0 },
  inner_small_node_ring: { visible: true, opacity: 0.7, lineRatio: 1.0 },
  hub_spokes: { visible: true, opacity: 1.0, lineRatio: 1.0 },
  long_connections: { visible: true, opacity: 0.9, lineRatio: 0.9 },
  connection_network: { visible: true, opacity: 0.55, lineRatio: 0.45 },
  short_connections: { visible: true, opacity: 0.45, lineRatio: 0.6 },
  closed_loops: { visible: true, opacity: 0.5, lineRatio: 1.0 },
  annotation_lines: { visible: true, opacity: 0.75, lineRatio: 1.0 },
  uncategorized: { visible: true, opacity: 0.8, lineRatio: 1.0 },
};

function createThreeMaterial(config: MaterialConfig): THREE.LineBasicMaterial {
  const color = new THREE.Color(config.color ?? "#ffffff");
  const opacity = config.opacity ?? 1.0;
  const transparent = config.transparent ?? opacity < 1.0;

  return new THREE.LineBasicMaterial({
    color,
    transparent,
    opacity,
    depthWrite: config.depthWrite ?? false,
    blending:
      config.blending === "additive"
        ? THREE.AdditiveBlending
        : THREE.NormalBlending,
  });
}

export function createMaterialSystem(
  sequence: NormalizedLineSequence,
  overrides?: Record<string, Partial<RoleControls>>,
  roleMaterialOverrides?: Record<string, Partial<MaterialConfig>>
): MaterialSystem {
  const baseMaterials = new Map<string, THREE.LineBasicMaterial>();
  const roleMaterials = new Map<string, THREE.LineBasicMaterial>();
  const roleControls = new Map<string, RoleControls>();

  const materialConfigs: Record<string, MaterialConfig> = {
    ...DEFAULT_MATERIALS,
    ...sequence.materials,
  };

  const roles = new Set<string>();
  for (const frame of sequence.frames) {
    for (const role of Object.keys(frame.edgeGroups)) {
      roles.add(role);
    }
  }

  for (const materialKey of Object.keys(materialConfigs)) {
    baseMaterials.set(materialKey, createThreeMaterial(materialConfigs[materialKey]));
  }

  for (const role of roles) {
    const materialKey =
      sequence.roleToMaterial[role] ??
      sequence.roleToMaterial["uncategorized"] ??
      "debug_unknown";

    const base = baseMaterials.get(materialKey);
    const baseConfig = materialConfigs[materialKey] ?? {};
    const roleOverride = roleMaterialOverrides?.[role] ?? {};
    const roleConfig: MaterialConfig = {
      ...baseConfig,
      ...roleOverride,
      color: roleOverride.color ?? baseConfig.color ?? "#ffffff",
      opacity: roleOverride.opacity ?? baseConfig.opacity ?? 1.0,
    };
    const material = createThreeMaterial(roleConfig);

    roleMaterials.set(role, material);

    const defaults = DEFAULT_ROLE_CONTROLS[role] ?? {
      visible: true,
      opacity: 1.0,
      lineRatio: 1.0,
    };
    const override = overrides?.[role] ?? {};
    const controls: RoleControls = {
      visible: override.visible ?? defaults.visible,
      opacity: override.opacity ?? defaults.opacity,
      lineRatio: override.lineRatio ?? defaults.lineRatio,
      color: roleConfig.color,
    };
    roleControls.set(role, controls);

    material.userData = {
      kind: "role-material",
      role,
      materialKey,
    };
  }

  const getMaterial = (materialKey: string): THREE.Material => {
    return baseMaterials.get(materialKey) ?? baseMaterials.get("debug_unknown")!;
  };

  const getMaterialForRole = (role: string): THREE.Material => {
    return roleMaterials.get(role) ?? baseMaterials.get("debug_unknown")!;
  };

  const getMaterialKeyForRole = (role: string): string => {
    return (
      sequence.roleToMaterial[role] ??
      sequence.roleToMaterial["uncategorized"] ??
      "debug_unknown"
    );
  };

  const setRoleOpacity = (role: string, opacity: number) => {
    const controls = roleControls.get(role);
    if (!controls) return;
    controls.opacity = opacity;
    const material = roleMaterials.get(role);
    if (material) {
      material.opacity = opacity;
      material.transparent = opacity < 1.0;
      material.needsUpdate = true;
    }
  };

  const setRoleVisible = (role: string, visible: boolean) => {
    const controls = roleControls.get(role);
    if (controls) controls.visible = visible;
  };

  const setRoleLineRatio = (role: string, ratio: number) => {
    const controls = roleControls.get(role);
    if (controls) controls.lineRatio = ratio;
  };

  const setRoleColor = (role: string, color: string) => {
    const controls = roleControls.get(role);
    if (controls) controls.color = color;
    const material = roleMaterials.get(role);
    if (material) {
      material.color.set(color);
      material.needsUpdate = true;
    }
  };

  const getRoleControls = (role: string): RoleControls => {
    return (
      roleControls.get(role) ?? {
        visible: true,
        opacity: 1.0,
        lineRatio: 1.0,
      }
    );
  };

  const getRoles = (): string[] => Array.from(roles);

  const dispose = () => {
    for (const material of baseMaterials.values()) material.dispose();
    for (const material of roleMaterials.values()) material.dispose();
    baseMaterials.clear();
    roleMaterials.clear();
    roleControls.clear();
  };

  return {
    getMaterial,
    getMaterialForRole,
    getMaterialKeyForRole,
    setRoleOpacity,
    setRoleVisible,
    setRoleLineRatio,
    setRoleColor,
    getRoleControls,
    getRoles,
    dispose,
  };
}
