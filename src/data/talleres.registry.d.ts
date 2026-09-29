export type TallerStatus = 'completado' | 'en-progreso' | 'pendiente';

export interface TallerSection {
  slug: string;
  label: string;
}

export interface TallerEntry {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  topic: string;
  corte: string;
  status: TallerStatus;
  points?: number;
  classroomUrl?: string;
  summary: string;
  objective: string;
  sections: TallerSection[];
}
