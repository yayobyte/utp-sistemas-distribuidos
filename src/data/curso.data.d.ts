export interface GradingItem {
  id: string;
  label: string;
  percentage: number;
  content: string[];
}

export interface ParcialTopic {
  title: string;
  points: string[];
}

export interface ParcialItem {
  id: string;
  name: string;
  percentage: number;
  topics: ParcialTopic[];
}

export interface ExposicionCriterion {
  label: string;
  percentage: number;
  description: string;
}

export interface BibliographyItem {
  authors: string;
  title: string;
}

export interface CourseInfo {
  name: string;
  code: string;
  program: string;
  institution: string;
  professor: string;
  professorEmail: string;
  classroomUrl: string;
  objective: string;
}
