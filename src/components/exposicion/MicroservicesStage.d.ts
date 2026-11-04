import type { SceneId } from '../../data/exposicion.data.d';

export interface MicroservicesStageProps {
  scene: SceneId;
  /** Fraction of the viewport width covered by the text panel on the left (0 when stacked). */
  panelRatio: number;
  /** Fraction of the viewport height to raise the scene by, to clear a bottom panel. */
  lift?: number;
}

export type NodeId =
  | 'client'
  | 'gateway'
  | 'registry'
  | 'config'
  | 'broker'
  | 'lb'
  | 'monolith'
  | 'users'
  | 'orders'
  | 'orders2'
  | 'orders3'
  | 'payments'
  | 'inventory'
  | 'notify'
  | 'analytics';

export type Vec3 = [number, number, number];

export interface SceneLink {
  from: NodeId;
  to: NodeId;
  color?: number;
  /** A broken link: drawn red, no traffic. */
  cut?: boolean;
}

export interface SceneState {
  camera: Vec3;
  nodes: Partial<Record<NodeId, { pos: Vec3; scale?: number }>>;
  links: SceneLink[];
  failed?: NodeId[];
  spin?: boolean;
}
