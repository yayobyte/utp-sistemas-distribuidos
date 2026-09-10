import * as THREE from 'three';

export interface ClusterGrid3DProps {
  mode: 'cluster' | 'grid';
}

export interface PacketData {
  mesh: THREE.Mesh;
  path: THREE.Vector3[];
  progress: number;
  speed: number;
}

export interface SiteLocation {
  name: string;
  pos: THREE.Vector3;
  color: number;
}
