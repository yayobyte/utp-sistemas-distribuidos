import type { TallerEntry, TallerStatus } from './talleres.registry.d';

export const COURSE_CLASSROOM_URL = 'https://classroom.google.com/c/ODcyMDQwNDA5MjIw';

export const talleresRegistry: TallerEntry[] = [
  {
    id: '1',
    number: 1,
    title: 'Clúster vs. Grid: Conceptos y Hardware',
    shortTitle: 'Clúster vs. Grid',
    topic: 'Tema 1 · Introducción',
    corte: 'Parcial 1',
    status: 'completado',
    points: 50,
    classroomUrl: 'https://classroom.google.com/c/ODcyMDQwNDA5MjIw/a/ODcyMDQwNDA5MjMy/details',
    summary:
      'Investigación del hardware necesario para construir un clúster y un grid: nodos, redes de baja latencia, almacenamiento paralelo, middleware y diferencias de arquitectura.',
    objective:
      'Reconocer los conceptos CLUSTER y GRID y los componentes de Hardware necesarios en su instalación, para identificar los elementos clave en la construcción de la infraestructura de sistemas distribuidos.',
    sections: [
      { slug: 'hardware', label: 'Hardware & Arquitectura' },
      { slug: 'matriz', label: 'Matriz Comparativa' },
      { slug: 'casos', label: 'Casos Reales' },
      { slug: 'diferencias', label: 'Diferencias Clave' },
      { slug: 'conclusiones', label: 'Conclusiones' },
    ],
  },
  {
    id: '2',
    number: 2,
    title: 'Aplicaciones de Modelos de Computación Distribuida',
    shortTitle: 'Modelos de Computación',
    topic: 'Tema 1 · Introducción',
    corte: 'Parcial 1',
    status: 'completado',
    classroomUrl: COURSE_CLASSROOM_URL,
    summary:
      'Dos ejemplos reales, pasados y actuales, para cada uno de los 9 modelos: Cluster, Grid, Volunteer, Utility, Cloud, Mobile, Ubiquitous/IoT, Edge/Fog y Autonomic.',
    objective:
      'Nombrar ejemplos de aplicaciones de los diferentes modelos de computación distribuida, para demostrar que estos conceptos se han utilizado para solucionar problemas de computación en el pasado y en la actualidad.',
    sections: [
      { slug: 'ejemplos', label: 'Ejemplos por Modelo' },
      { slug: 'matriz', label: 'Matriz Comparativa' },
    ],
  },
  {
    id: '3',
    number: 3,
    title: 'Comunicación con Sockets & Java RMI',
    shortTitle: 'Sockets & Java RMI',
    topic: 'Tema 3 · Comunicación',
    corte: 'Parcial 2',
    status: 'pendiente',
    summary:
      'Implementación práctica de paso de mensajes mediante sockets TCP/UDP e invocación de métodos remotos (RMI) con paso de objetos y stubs.',
    objective: '',
    sections: [],
  },
];

export const statusLabels: Record<TallerStatus, string> = {
  completado: 'Completado',
  'en-progreso': 'En progreso',
  pendiente: 'Próximamente',
};

export const getTaller = (id: string): TallerEntry | undefined =>
  talleresRegistry.find((t) => t.id === id);

export const isTallerAvailable = (taller: TallerEntry): boolean =>
  taller.status !== 'pendiente' && taller.sections.length > 0;

export const getTallerPath = (taller: TallerEntry, sectionSlug?: string): string =>
  `/talleres/${taller.id}/${sectionSlug ?? taller.sections[0]?.slug ?? ''}`;

export const getAdjacentTalleres = (id: string) => {
  const available = talleresRegistry.filter(isTallerAvailable);
  const index = available.findIndex((t) => t.id === id);
  return {
    previous: index > 0 ? available[index - 1] : undefined,
    next: index >= 0 && index < available.length - 1 ? available[index + 1] : undefined,
  };
};
