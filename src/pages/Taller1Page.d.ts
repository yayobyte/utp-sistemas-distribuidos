export type Taller1TabType =
  | 'investigacion'
  | 'matriz'
  | 'casos'
  | 'diferencias'
  | 'conclusiones';

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

export interface CaseStudySpec {
  label: string;
  value: string;
}

export interface CaseStudyItem {
  id: string;
  category: 'cluster' | 'grid';
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  detailedPoints: string[];
  specs: CaseStudySpec[];
  impactMetric: string;
  impactLabel: string;
}
