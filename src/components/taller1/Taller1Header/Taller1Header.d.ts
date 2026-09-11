export type Taller1TabType =
  | 'investigacion'
  | 'matriz'
  | 'casos'
  | 'diferencias'
  | 'conclusiones';

export interface Taller1HeaderProps {
  activeTab: Taller1TabType;
  onTabChange: (tab: Taller1TabType) => void;
}
