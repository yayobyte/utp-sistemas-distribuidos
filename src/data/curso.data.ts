import type {
  BibliographyItem,
  CourseInfo,
  ExposicionCriterion,
  GradingItem,
  ParcialItem,
} from './curso.data.d';
import { COURSE_CLASSROOM_URL } from './talleres.registry';

export const courseInfo: CourseInfo = {
  name: 'Sistemas Distribuidos',
  code: 'IS893',
  program: 'Ingeniería de Sistemas y Computación',
  institution: 'Universidad Tecnológica de Pereira (UTP)',
  professor: 'César Augusto Díaz Arriaga',
  professorEmail: 'black@utp.edu.co',
  classroomUrl: COURSE_CLASSROOM_URL,
  objective:
    'Brindar al estudiante la fundamentación teórica y práctica necesaria para interpretar, planear, diseñar y administrar un Sistema Distribuido, completando su conocimiento sobre las diferentes alternativas para la construcción de sistemas de este tipo como Clúster, Grid, Cloud, entre otros.',
};

export const gradingData: GradingItem[] = [
  {
    id: 'parcial-1',
    label: 'Parcial 1',
    percentage: 20,
    content: ['Introducción a los Sistemas Distribuidos', 'Arquitecturas de Sistemas Distribuidos'],
  },
  {
    id: 'parcial-2',
    label: 'Parcial 2',
    percentage: 20,
    content: [
      'Comunicación en Sistemas Distribuidos',
      'Sistemas de Archivos Distribuidos y Paralelos',
      'Servicio de Nombres y de Directorios',
    ],
  },
  {
    id: 'parcial-3',
    label: 'Parcial 3',
    percentage: 20,
    content: [
      'Gestión de Procesos',
      'Sincronización, Concurrencia y Transacciones',
      'Fiabilidad y Seguridad',
    ],
  },
  {
    id: 'talleres',
    label: 'Actividades y Talleres',
    percentage: 20,
    content: ['Investigación y talleres prácticos por capítulo'],
  },
  {
    id: 'exposicion',
    label: 'Exposición',
    percentage: 20,
    content: ['Profundización tecnológica (50% Presentación, 30% Quiz, 20% Asistencia)'],
  },
];

export const parcialesData: ParcialItem[] = [
  {
    id: 'parcial-1',
    name: 'Parcial 1',
    percentage: 20,
    topics: [
      {
        title: 'Introducción a los Sistemas Distribuidos',
        points: [
          'Definición, ventajas y desventajas frente a sistemas centralizados.',
          'Falacias de la computación distribuida (Deutsch).',
          'Modelos: Cluster, Grid, Volunteer, Utility, Cloud, Mobile, Ubiquitous/IoT, Edge/Fog y Autonomic.',
          'Objetivos y transparencias (acceso, ubicación, replicación, fallos).',
        ],
      },
      {
        title: 'Arquitecturas de Sistemas Distribuidos',
        points: [
          'Cliente-Servidor (multicapa), P2P (estructurado/DHT vs no estructurado).',
          'Arquitecturas basadas en eventos y capas de middleware.',
        ],
      },
    ],
  },
  {
    id: 'parcial-2',
    name: 'Parcial 2',
    percentage: 20,
    topics: [
      {
        title: 'Comunicación en Sistemas Distribuidos',
        points: [
          'Sockets TCP/UDP, paso de mensajes, RPC y Java RMI.',
          'Message-Oriented Middleware (MOM) y colas de mensajes.',
        ],
      },
      {
        title: 'Sistemas de Archivos Distribuidos y Paralelos',
        points: ['NFS, HDFS, Lustre, semánticas de compartición y caching.'],
      },
      {
        title: 'Servicio de Nombres y Directorios',
        points: ['Resolución de nombres, DNS, LDAP y localización de entidades.'],
      },
    ],
  },
  {
    id: 'parcial-3',
    name: 'Parcial 3',
    percentage: 20,
    topics: [
      {
        title: 'Gestión de Procesos',
        points: ['Hilos, virtualización, agentes y migración de código.'],
      },
      {
        title: 'Sincronización y Transacciones',
        points: [
          'Relojes de Lamport y vectoriales, exclusión mutua distribuida, algoritmos de elección.',
        ],
      },
      {
        title: 'Fiabilidad y Seguridad',
        points: [
          'Tolerancia a fallos, consenso distribuido (Paxos/Raft), replicación y criptografía distribuida.',
        ],
      },
    ],
  },
];

export const exposicionesDescription =
  'Profundizaciones de aplicaciones de sistemas distribuidos de manera individual o en parejas, para hacer una revisión de las tecnologías existentes donde se aplican de manera general los conceptos vistos en clase.';

export const exposicionCriteria: ExposicionCriterion[] = [
  { label: 'Presentación', percentage: 50, description: 'Claridad técnica, dominio del tema y soporte audiovisual.' },
  { label: 'Quiz', percentage: 30, description: 'Evaluación sobre el contenido expuesto.' },
  { label: 'Asistencia', percentage: 20, description: 'Participación activa durante las exposiciones.' },
];

export const bibliographyData: BibliographyItem[] = [
  { authors: 'Andrew S. Tanenbaum, Maarten Van Steen', title: 'Sistemas Distribuidos: Principios y Paradigmas' },
  { authors: 'George Coulouris, Jean Dollimore, Tim Kindberg, Gordon Blair', title: 'Sistemas Distribuidos: Conceptos y Diseño' },
  { authors: 'Francisco de Asís López Fuentes', title: 'Sistemas Distribuidos' },
  { authors: 'Edwin D. Reilly', title: 'Java Network Programming and Distributed Computing' },
];
