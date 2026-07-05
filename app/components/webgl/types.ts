import * as THREE from 'three';

export type HeroLayerId =
  | 'home'
  | 'projects'
  | 'resume'
  | 'library'
  | 'notes';

export interface HeroLayerConfig {
  id: HeroLayerId;
  index: number;
  title: string;
  subtitle: string;
  position: [number, number, number];
  size: [number, number, number];
  colorRole: 'light' | 'mid' | 'dark';
  explodeOffset: [number, number, number];
  accent?: boolean;
}

export interface AnnotationConfig {
  id: string;
  label: string;
  sublabel?: string;
  targetLayer: HeroLayerId;
  localPosition: [number, number, number];
  side: 'left' | 'right' | 'top';
  active?: boolean;
}

export interface HeroArchitecture {
  root: THREE.Group;
  layers: Record<HeroLayerId, THREE.Group>;
  anchors: Record<string, THREE.Object3D>;
  activeNode: THREE.Mesh;
}

export interface ProjectedAnnotation extends AnnotationConfig {
  x: number;
  y: number;
  visible: boolean;
}

export type AnnotationUpdateHandler = (items: ProjectedAnnotation[]) => void;
