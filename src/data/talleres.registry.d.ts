export type TallerStatus = 'completado' | 'en-progreso' | 'pendiente';

export interface TallerSection {
  slug: string;
  label: string;
}

export interface TallerEntry {
  id: string;
  kind?: 'taller' | 'exposicion';
  /** Overrides the default /talleres/:id/:section route. */
  path?: string;
  number: number;
  title: string;
  shortTitle: string;
  topic: string;
  corte: string;
  status: TallerStatus;
  summary: string;
  objective: string;
  sections: TallerSection[];
}
