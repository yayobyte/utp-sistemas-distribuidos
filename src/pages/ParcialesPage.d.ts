export interface ParcialTopic {
  title: string;
  items: string[];
}

export interface ParcialCourseCut {
  id: number;
  cutName: string;
  percentage: number;
  statusText: string;
  title: string;
  topics: ParcialTopic[];
  borderColorClass: string;
}
