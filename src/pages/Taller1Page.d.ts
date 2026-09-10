export type Taller1TabType = 'investigacion' | 'matriz' | 'casos';

export type ArchType = 'cluster' | 'grid';

export type ComponentDetailType =
  | 'compute'
  | 'network'
  | 'master'
  | 'storage'
  | 'gateways'
  | 'wan'
  | 'heterogeneous'
  | 'srm';

export interface ComparisonCriterion {
  criterion: string;
  cluster: string;
  grid: string;
}

export interface RealWorldCase {
  tag: string;
  title: string;
  description: string;
  usage: string;
  borderColor: string;
}
