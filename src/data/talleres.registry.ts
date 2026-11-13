import type { TallerEntry, TallerStatus } from './talleres.registry.d';

export const talleresRegistry: TallerEntry[] = [
  {
    id: '1',
    number: 1,
    title: 'Clúster vs. Grid: Conceptos y Hardware',
    shortTitle: 'Clúster vs. Grid',
    topic: 'Tema 1 · Introducción',
    corte: 'Parcial 1',
    status: 'completado',
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
    title: 'Ejemplos de Arquitecturas de Sistemas Distribuidos',
    shortTitle: 'Ejemplos de Arquitecturas',
    topic: 'Tema 2 · Arquitecturas',
    corte: 'Parcial 1',
    status: 'completado',
    summary:
      'Dos aplicaciones reales para cada una de las 4 arquitecturas vistas en clase: Maestro/Trabajador, Cliente/Servidor, Editor/Subscriptor y Peer to Peer.',
    objective:
      'Nombrar ejemplos de aplicaciones de las diferentes arquitecturas de computación distribuida, para demostrar que estos conceptos se han utilizado para solucionar problemas de computación en el pasado y en la actualidad.',
    sections: [
      { slug: 'ejemplos', label: 'Ejemplos por Arquitectura' },
      { slug: 'matriz', label: 'Matriz Comparativa' },
    ],
  },
  {
    id: '4',
    number: 4,
    title: 'Sistemas de Archivos Distribuidos y Arreglos RAID',
    shortTitle: 'Archivos Distribuidos y RAID',
    topic: 'Tema 4 · Almacenamiento',
    corte: 'Parcial 2',
    status: 'completado',
    summary:
      'Seis sistemas de archivos distribuidos reales (NFS, AFS, GFS, HDFS, CephFS y GlusterFS) y los niveles RAID, con diagramas de bloques y una calculadora de capacidad.',
    objective:
      'Reconocer las diferentes alternativas para la gestión de archivos de forma distribuida, para poder elegir entre las diferentes opciones existentes el que más se ajuste a las necesidades de algún proyecto futuro.',
    sections: [
      { slug: 'sistemas', label: 'Sistemas de Archivos' },
      { slug: 'raid', label: 'Arreglos RAID' },
      { slug: 'matriz', label: 'Matriz Comparativa' },
    ],
  },
  {
    id: '5',
    number: 5,
    title: 'Sistemas de Archivos Paralelos',
    shortTitle: 'Archivos Paralelos',
    topic: 'Tema 4 · Almacenamiento',
    corte: 'Parcial 2',
    status: 'completado',
    summary:
      'Seis sistemas de archivos paralelos (Lustre, IBM Storage Scale/GPFS, BeeGFS, OrangeFS, PanFS y DAOS) y cómo funcionan por dentro tres de ellos.',
    objective:
      'Reconocer las diferentes alternativas para la gestión de archivos de forma paralela, para poder elegir entre las diferentes opciones existentes el que más se ajuste a las necesidades de algún proyecto futuro.',
    sections: [
      { slug: 'sistemas', label: 'Sistemas Paralelos' },
      { slug: 'funcionamiento', label: 'Cómo Funcionan' },
      { slug: 'matriz', label: 'Matriz Comparativa' },
    ],
  },
  {
    id: '6',
    number: 6,
    title: 'Servicios de Nombres y Servicios de Directorio',
    shortTitle: 'Nombres y Directorio',
    topic: 'Tema 5 · Servicios de nombres',
    corte: 'Parcial 2',
    status: 'completado',
    summary:
      'Tres servicios de nombres (DNS, Eureka y RMI Registry) y tres de directorio (Active Directory, OpenLDAP y Microsoft Entra ID), con un ejemplo de consulta resolve vs. search en cada uno.',
    objective:
      'Reconocer las diferentes alternativas de servicios de nombres y de directorio, para poder elegir entre las opciones existentes la que más se ajuste a las necesidades de algún proyecto futuro.',
    sections: [
      { slug: 'nombres', label: 'Servicios de Nombres' },
      { slug: 'directorio', label: 'Servicios de Directorio' },
      { slug: 'matriz', label: 'Matriz Comparativa' },
    ],
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
  taller.status !== 'pendiente' && (Boolean(taller.path) || taller.sections.length > 0);

export const getTallerPath = (taller: TallerEntry, sectionSlug?: string): string =>
  taller.path ?? `/talleres/${taller.id}/${sectionSlug ?? taller.sections[0]?.slug ?? ''}`;

export const getAdjacentTalleres = (id: string) => {
  const available = talleresRegistry.filter((t) => isTallerAvailable(t));
  const index = available.findIndex((t) => t.id === id);
  return {
    previous: index > 0 ? available[index - 1] : undefined,
    next: index >= 0 && index < available.length - 1 ? available[index + 1] : undefined,
  };
};
