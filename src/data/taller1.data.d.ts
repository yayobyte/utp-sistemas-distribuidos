export interface ComparisonCriterionItem {
  id: string;
  criterion: string;
  cluster: {
    highlight?: string;
    description: string;
  };
  grid: {
    highlight?: string;
    description: string;
  };
}

export interface CaseStudySpecItem {
  label: string;
  value: string;
}

export interface CaseStudyData {
  id: string;
  category: 'cluster' | 'grid';
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  detailedPoints?: string[];
  specs: CaseStudySpecItem[];
  impactMetric: string;
  impactLabel: string;
}

export interface AppleEditorialValueItem {
  id: string;
  iconName: 'globe' | 'cpu' | 'shield';
  title: string;
  description: string;
  linkText: string;
  href: string;
}

export interface KeyDifferenceItem {
  id: string;
  criterionNumber: number;
  iconName: 'cpu' | 'zap' | 'server' | 'hard-drive';
  title: string;
  cluster: {
    badge: string;
    headline: string;
    description: string;
  };
  grid: {
    badge: string;
    headline: string;
    description: string;
  };
}

export interface ConclusionItem {
  number: string;
  tag: string;
  iconName: 'cpu' | 'zap' | 'sparkles';
  title: string;
  body: string;
}

export interface HardwareNodeItem {
  id: string;
  name: string;
  shortDesc: string;
  iconName: 'cpu' | 'server' | 'zap' | 'hard-drive' | 'globe' | 'layers' | 'shield';
  accentColor: string;
  detailedTitle: string;
  detailedIntro: string;
  detailedPoints: {
    label: string;
    text: string;
  }[];
}
