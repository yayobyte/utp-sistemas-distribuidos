export type DiagramId =
  | 'servidor-vs-pcs'
  | 'cluster-vs-grid'
  | 'distancia-cables'
  | 'modelos-recursos'
  | 'pila-responsabilidad'
  | 'edge-fog-cloud'
  | 'cuello-vs-spof'
  | 'cuadrante-acoplamiento'
  | 'maestro-trabajador'
  | 'grosor-cliente'
  | 'proxies'
  | 'scale-up-out'
  | 'replicacion'
  | 'standby'
  | 'modelos-servidor'
  | 'conexiones'
  | 'binder'
  | 'semanticas'
  | 'pubsub';

/** Text fields accept **bold** markers. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; text: string }
  | { type: 'cards'; items: { title: string; text: string }[] }
  | { type: 'diagram'; id: DiagramId; caption?: string };

export interface ClaseSection {
  heading: string;
  blocks: Block[];
}

export interface Clase {
  number: number;
  date: string;
  tema: 'Introducción' | 'Arquitecturas' | 'Comunicación';
  title: string;
  idea: string;
  keyTerms: string[];
  sections: ClaseSection[];
  repaso: { q: string; a: string }[];
}
