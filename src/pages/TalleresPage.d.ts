export interface TallerSummaryItem {
  id: number;
  title: string;
  description: string;
  score: number;
  status: 'active' | 'upcoming';
  topic: string;
  cut: string;
  deadline?: string;
  objective?: string;
}
