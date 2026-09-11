import type {
  ComparisonCriterionItem,
  CaseStudyData,
  AppleEditorialValueItem,
  KeyDifferenceItem,
  ConclusionItem,
  HardwareNodeItem,
} from './taller1.data.d';

// =====================================================================
// 1. COMPARISON MATRIX (12 CRITERIA)
// =====================================================================
export const comparisonCriteriaData: ComparisonCriterionItem[] = [
  {
    id: 'nodos',
    criterion: 'Naturaleza de los Nodos',
    cluster: {
      highlight: 'Homogénea:',
      description: 'Mismo modelo de procesadores, placas base, memoria RAM y aceleradores para consistencia de ejecución.',
    },
    grid: {
      highlight: 'Heterogénea:',
      description: 'Múltiples fabricantes, distintas capacidades de CPU/GPU, servidores, clústeres enteros y PCs.',
    },
  },
  {
    id: 'acoplamiento',
    criterion: 'Tipo de Acoplamiento',
    cluster: {
      highlight: 'Fuertemente acoplado',
      description: '(Tightly coupled). Memoria distribuida pero acceso ultra-rápido síncrono.',
    },
    grid: {
      highlight: 'Débilmente acoplado',
      description: '(Loosely coupled). Sistemas autónomos que intercambian datos asíncronamente.',
    },
  },
  {
    id: 'red',
    criterion: 'Red de Interconexión',
    cluster: {
      highlight: 'Red local dedicada:',
      description: 'Ultra alta velocidad y baja latencia (InfiniBand HDR/NDR, RoCE, 100-400 GbE).',
    },
    grid: {
      highlight: 'Red de área extensa:',
      description: 'WAN, Internet público y Redes Académicas avanzadas (RENATA, RedCLARA, GEANT).',
    },
  },
  {
    id: 'latencia',
    criterion: 'Latencia de Red',
    cluster: {
      highlight: '< 1 microsegundo (< 1 µs)',
      description: 'con soporte RDMA directo a memoria sin intervención del kernel.',
    },
    grid: {
      highlight: 'Milisegundos a cientos de ms',
      description: '(latencia inherente a enlaces geográficos continentales e intercontinentales).',
    },
  },
  {
    id: 'ubicacion',
    criterion: 'Ubicación Geográfica',
    cluster: {
      highlight: 'Centralizada:',
      description: 'En una misma sala, pasillo de racks o centro de datos.',
    },
    grid: {
      highlight: 'Distribuida globalmente:',
      description: 'Entre diferentes ciudades, países y continentes.',
    },
  },
  {
    id: 'administracion',
    criterion: 'Dominio Administrativo',
    cluster: {
      highlight: 'Único:',
      description: 'Administrado por un único departamento de TI con políticas homogéneas.',
    },
    grid: {
      highlight: 'Múltiple / Federado:',
      description: 'Cada institución socia mantiene su propia autonomía y administración local.',
    },
  },
  {
    id: 'almacenamiento',
    criterion: 'Almacenamiento',
    cluster: {
      highlight: 'SAN / NVMe-oF local',
      description: 'con Sistemas de Archivos Paralelos de alto rendimiento (Lustre, GPFS, Ceph).',
    },
    grid: {
      highlight: 'Almacenamiento distribuido:',
      description: 'Heterogéneo y federado (SRM, GridFTP, dCache, librerías robóticas de cinta LTO).',
    },
  },
  {
    id: 'seguridad',
    criterion: 'Seguridad y Control',
    cluster: {
      highlight: 'Seguridad perimetral',
      description: 'del centro de datos y autenticación de usuarios local (LDAP/Kerberos).',
    },
    grid: {
      highlight: 'Criptografía federada:',
      description: 'Infraestructura de Clave Pública (PKI), Certificados X.509, servidores VOMS y túneles seguros.',
    },
  },
  {
    id: 'gestion',
    criterion: 'Componente de Gestión',
    cluster: {
      highlight: 'Nodo Maestro / Head Node',
      description: 'con planificadores locales de trabajos y colas (Slurm, PBS Pro, Torque).',
    },
    grid: {
      highlight: 'Pasarelas Grid:',
      description: 'Gatekeepers, Resource Brokers y servidores de catálogos y metadatos.',
    },
  },
  {
    id: 'variabilidad',
    criterion: 'Tolerancia a Variabilidad de HW',
    cluster: {
      highlight: 'Muy baja:',
      description: 'Se diseñan para alta consistencia física y eliminación de cuellos de botella.',
    },
    grid: {
      highlight: 'Muy alta:',
      description: 'El middleware abstrae por completo la disparidad del hardware subyacente.',
    },
  },
  {
    id: 'carga',
    criterion: 'Carga de Trabajo Ideal',
    cluster: {
      highlight: 'HPC (High Performance Computing):',
      description: 'Simulaciones físicas intensivas en comunicación síncrona y procesamiento en paralelo masivo.',
    },
    grid: {
      highlight: 'HTC (High Throughput Computing):',
      description: 'Procesamiento masivo de tareas independientes (desacopladas) a gran escala temporal.',
    },
  },
  {
    id: 'metrica',
    criterion: 'Métrica Clave de Rendimiento',
    cluster: {
      highlight: 'FLOPS / EFLOPS:',
      description: 'Operaciones de punto flotante por segundo en tareas continuas síncronas.',
    },
    grid: {
      highlight: 'Trabajos/Mes o Años de Cómputo:',
      description: 'Volumen total acumulado de unidades de trabajo independientes completadas (Throughput).',
    },
  },
  {
    id: 'fallos',
    criterion: 'Tolerancia a Fallos',
    cluster: {
      highlight: 'Baja en tiempo de ejecución:',
      description: 'En simulaciones MPI síncronas, el fallo de un nodo suele abortar el trabajo si no hay checkpointing.',
    },
    grid: {
      highlight: 'Alta por diseño:',
      description: 'Si un nodo o sitio geográfico se cae, el Resource Broker reasigna la tarea a otro nodo disponible.',
    },
  },
];

// =====================================================================
// 2. CASE STUDIES (TAB 3 CONTINUITY SHOWCASE)
// =====================================================================
export const caseStudiesData: CaseStudyData[] = [
  {
    id: 'frontier',
    category: 'cluster',
    tag: 'Clúster HPC Exaescala',
    title: 'Supercomputador Frontier',
    subtitle: 'Oak Ridge National Laboratory (ORNL) · Top500 #1',
    description:
      'El primer supercomputador exaescala del planeta, diseñado para resolver problemas de simulación cuántica, modelado climático y fusión nuclear mediante una arquitectura homogénea masiva.',
    specs: [
      { label: 'Rendimiento', value: '1.194 ExaFLOPs' },
      { label: 'Interconexión', value: 'Slingshot-11 (RDMA)' },
      { label: 'Almacenamiento', value: '700 PB Orion (Lustre)' },
      { label: 'Acoplamiento', value: 'Fuertemente Acoplado' },
    ],
    impactMetric: '1.194 EF',
    impactLabel: 'Potencia de Cómputo',
  },
  {
    id: 'wlcg',
    category: 'grid',
    tag: 'La Malla Grid Global',
    title: 'Worldwide LHC Computing Grid (WLCG)',
    subtitle: 'CERN · Ginebra & 170+ Centros de Datos en 40 Países',
    description:
      'La infraestructura de computación en malla más grande de la historia científica. Procesa los petabytes de datos generados anualmente por las colisiones de partículas en el Gran Colisionador de Hadrones.',
    specs: [
      { label: 'Infraestructura', value: '170+ Centros / 40 Países' },
      { label: 'Cores Simultáneos', value: '1,000,000+ Cores' },
      { label: 'Almacenamiento', value: '1 Exabyte Distribuido' },
      { label: 'Seguridad', value: 'PKI / Certificados X.509' },
    ],
    impactMetric: '1,000,000+',
    impactLabel: 'Núcleos en Red WAN',
  },
  {
    id: 'osg',
    category: 'grid',
    tag: 'Grid Científico Federado',
    title: 'Open Science Grid (OSG)',
    subtitle: 'Consorcio Nacional de Universidades y Laboratorios en EE.UU.',
    description:
      'Malla de alto rendimiento orientada a High Throughput Computing (HTC) que comparte de forma federada la capacidad ociosa de clústeres universitarios para investigaciones de astrofísica y genómica.',
    specs: [
      { label: 'Organizaciones', value: '120+ Instituciones' },
      { label: 'Enfoque', value: 'HTC (High Throughput)' },
      { label: 'Middleware', value: 'HTCondor / GridWay' },
      { label: 'Administración', value: 'Federada / Multi-sede' },
    ],
    impactMetric: '2.5B hrs',
    impactLabel: 'Cómputo Anual Donado',
  },
  {
    id: 'folding',
    category: 'grid',
    tag: 'Computación Voluntaria / Desktop Grid',
    title: 'Folding@home',
    subtitle: 'Universidad de Stanford / Washington University',
    description:
      'Proyecto de computación distribuida voluntaria que agrupa millones de tarjetas gráficas y procesadores domésticos alrededor del mundo para simular la dinámica molecular de proteínas.',
    specs: [
      { label: 'Participantes', value: 'Millones de Voluntarios' },
      { label: 'Red', value: 'Internet Público' },
      { label: 'Nodos', value: 'PCs / GPUs Domésticas' },
      { label: 'Aplicación', value: 'Biomedicina & Fármacos' },
    ],
    impactMetric: '2.4 EF',
    impactLabel: 'Pico de Cómputo Ciudadano',
  },
];

// =====================================================================
// 3. APPLE EDITORIAL VALUES CARDS (TAB 3 VALUES GRID)
// =====================================================================
export const appleEditorialValuesData: AppleEditorialValueItem[] = [
  {
    id: 'wlcg-val',
    iconName: 'globe',
    title: 'Un plan tan innovador como nuestros sistemas.',
    description:
      'La infraestructura Grid agrega petabytes de datos y millones de ciclos de cómputo en más de 40 países para hacer posible los descubrimientos del CERN.',
    linkText: 'Más información sobre la malla WLCG',
    href: 'https://wlcg.web.cern.ch/',
  },
  {
    id: 'frontier-val',
    iconName: 'cpu',
    title: 'Rendimiento Exaescala. Esto es Frontier.',
    description:
      'Un clúster homogéneo de ultra-baja latencia capaz de ejecutar 1.194 ExaFLOPs con interconexión RDMA Slingshot para física y modelado de alta precisión.',
    linkText: 'Más información sobre Top500',
    href: 'https://www.top500.org/system/180047/',
  },
  {
    id: 'osg-val',
    iconName: 'shield',
    title: 'Innovación diseñada para ser accesible y federada.',
    description:
      'A través de certificados PKI X.509 y middlewares abiertos, cientos de universidades comparten recursos computacionales con total soberanía y seguridad.',
    linkText: 'Más información sobre Open Science Grid',
    href: 'https://osg-htc.org/',
  },
];

// =====================================================================
// 4. KEY DIFFERENCES (TAB 4 BENTO SPLIT CARDS)
// =====================================================================
export const keyDifferencesData: KeyDifferenceItem[] = [
  {
    id: 'diff-homogeneity',
    criterionNumber: 1,
    iconName: 'cpu',
    title: 'Homogeneidad de los Nodos',
    cluster: {
      badge: 'Clúster',
      headline: 'Homogéneo',
      description:
        'Mismo modelo de procesadores (Xeon/EPYC), placas madre, memoria ECC y aceleradores GPU para garantizar cálculo síncrono uniforme y sin variabilidad.',
    },
    grid: {
      badge: 'Grid',
      headline: 'Altamente Heterogéneo',
      description:
        'Integra clústeres completos, supercomputadores, servidores de diversos fabricantes, PCs de laboratorio e instrumentos científicos con múltiples arquitecturas y sistemas operativos.',
    },
  },
  {
    id: 'diff-coupling',
    criterionNumber: 2,
    iconName: 'zap',
    title: 'Acoplamiento y Latencia de Red',
    cluster: {
      badge: 'Clúster',
      headline: 'Fuertemente Acoplado (< 1 µs)',
      description:
        'Interconexión local de ultra-alta velocidad (InfiniBand HDR/NDR, RoCE) con Remote Direct Memory Access (RDMA) para paso de mensajes síncronos MPI a nivel de microsegundo.',
    },
    grid: {
      badge: 'Grid',
      headline: 'Débilmente Acoplado (Red WAN / ms)',
      description:
        'Opera sobre enlaces geográficos WAN, Internet y redes académicas (RENATA, GEANT) con latencias variables en el orden de milisegundos, optimizado para tareas asíncronas independientes.',
    },
  },
  {
    id: 'diff-admin',
    criterionNumber: 3,
    iconName: 'server',
    title: 'Dominio de Administración',
    cluster: {
      badge: 'Clúster',
      headline: 'Único Dominio Centralizado',
      description:
        'Administrado por un único equipo de TI que impone políticas homogéneas, gestión de usuarios local (LDAP/Kerberos) y planificador central de trabajos (Slurm, PBS).',
    },
    grid: {
      badge: 'Grid',
      headline: 'Múltiple y Federado',
      description:
        'Múltiples organizaciones independientes comparten recursos. Cada institución conserva su soberanía administrativa, coordinadas mediante pasarelas Grid y certificados PKI X.509.',
    },
  },
  {
    id: 'diff-storage',
    criterionNumber: 4,
    iconName: 'hard-drive',
    title: 'Almacenamiento y Jerarquía',
    cluster: {
      badge: 'Clúster',
      headline: 'SAN / Lustre / NVMe-oF Local',
      description:
        'Sistemas de archivos paralelos centralizados (Lustre, GPFS) conectados vía Fibre Channel o NVMe sobre Fabrics para lecturas/escrituras concurrentes a decenas de GB/s.',
    },
    grid: {
      badge: 'Grid',
      headline: 'Almacenamiento Distribuido & Cintas',
      description:
        'Gestores de recursos de almacenamiento (SRM, dCache, GridFTP) y librerías robóticas de cintas magnéticas (LTO) para conservación histórica masiva y federada a nivel de Exabytes.',
    },
  },
];

// =====================================================================
// 5. CONCLUSIONS (TAB 5 EDITORIAL NUMBERED CARDS)
// =====================================================================
export const conclusionsData: ConclusionItem[] = [
  {
    number: '01',
    tag: 'HPC vs. HTC',
    iconName: 'cpu',
    title: 'Especialización vs. Agregación de Recursos',
    body:
      'El hardware de un clúster se adquiere y configura específicamente para resolver problemas complejos de computación en paralelo masivo donde la velocidad de intercambio de mensajes en memoria y red es el factor limitante (High Performance Computing - HPC). Por el contrario, un grid aprovecha y agrega infraestructuras ya existentes para procesar cargas de trabajo de alto volumen desacopladas e independientes (High Throughput Computing - HTC).',
  },
  {
    number: '02',
    tag: 'Topología & Enlace',
    iconName: 'zap',
    title: 'El Rol Crítico de la Red de Interconexión',
    body:
      'Mientras que en un clúster la inversión en hardware se concentra fuertemente en switches no bloqueantes y tarjetas con soporte RDMA (InfiniBand) para reducir la latencia al microsegundo, en un grid los componentes clave son los gateways, routers de frontera BGP y sistemas de almacenamiento federado capaces de operar eficientemente sobre redes WAN no confiables y de alta latencia inherente.',
  },
  {
    number: '03',
    tag: 'Sinergia Distribuida',
    iconName: 'sparkles',
    title: 'Coexistencia en la Jerarquía de Sistemas Distribuidos',
    body:
      'Ambos conceptos no compiten entre sí; un Grid frecuentemente utiliza clústeres completos como sus nodos de cómputo básicos (niveles Tier-1 o Tier-2 en la terminología del WLCG del CERN). Esto demuestra que Clúster y Grid son paradigmas complementarios que resuelven diferentes estratos de la escala computacional global.',
  },
];

// =====================================================================
// 6. HARDWARE INSPECTOR NODES (TAB 1 HARDWARE & ARQUITECTURA)
// =====================================================================
export const clusterHardwareNodes: HardwareNodeItem[] = [
  {
    id: 'master',
    name: 'Nodo Maestro / Head Node',
    shortDesc: 'Gestión, planificador Slurm/PBS, autenticación y monitorización.',
    iconName: 'server',
    accentColor: '#2997ff',
    detailedTitle: 'Nodo Maestro / Controlador (Head Node)',
    detailedIntro: 'Punto de entrada para los usuarios y cerebro de gestión centralizada del clúster.',
    detailedPoints: [
      {
        label: 'Gestión de Trabajos y Colas:',
        text: 'Ejecuta planificadores como Slurm, PBS Pro o Torque para asignar recursos a las tareas enviadas.',
      },
      {
        label: 'Doble Interfaz de Red:',
        text: 'Una tarjeta conectada a la red pública/campus y otra a la red privada de alta velocidad del clúster.',
      },
      {
        label: 'Alta Disponibilidad:',
        text: 'Fuentes de poder redundantes, discos en RAID 1/10 y configuración pasiva/activa para evitar puntos únicos de fallo.',
      },
    ],
  },
  {
    id: 'network',
    name: 'Red de Ultra-Baja Latencia (InfiniBand / RDMA)',
    shortDesc: 'Switches no bloqueantes 100-400 Gbps, bypass del kernel con RDMA.',
    iconName: 'zap',
    accentColor: '#ff9f0a',
    detailedTitle: 'Red de Interconexión de Ultra-Baja Latencia',
    detailedIntro: 'En un clúster, el rendimiento del paso de mensajes entre nodos (MPI) depende críticamente de la latencia de la red interna.',
    detailedPoints: [
      {
        label: 'InfiniBand (HDR/NDR):',
        text: 'Velocidades de 200 Gbps a 400 Gbps con latencias inferiores a 1 microsegundo (< 1 µs).',
      },
      {
        label: 'RDMA (Remote Direct Memory Access):',
        text: 'Lectura y escritura directa en la memoria RAM del nodo remoto sin intervención del kernel del sistema operativo.',
      },
      {
        label: 'RoCE / 100-400 GbE:',
        text: 'Ethernet convergente para soporte de RDMA en infraestructuras basadas en fibra óptica estándar.',
      },
      {
        label: 'Topologías No Bloqueantes:',
        text: 'Fat-Tree o Torus 3D/5D para garantizar ancho de banda constante entre cualquier par de nodos.',
      },
    ],
  },
  {
    id: 'compute',
    name: 'Nodos de Cómputo Homogéneos (Workers)',
    shortDesc: 'CPUs multinúcleo Xeon/EPYC, aceleradores GPU (H100/A100) y RAM ECC.',
    iconName: 'cpu',
    accentColor: '#34c759',
    detailedTitle: 'Nodos de Cómputo (Compute / Worker Nodes)',
    detailedIntro: 'Son los encargados de ejecutar las tareas de cálculo distribuido masivo en paralelo.',
    detailedPoints: [
      {
        label: 'Procesadores Servidor:',
        text: 'Intel Xeon Scalable o AMD EPYC de 64 a 128 núcleos por socket con instrucciones vectoriales (AVX-512).',
      },
      {
        label: 'Aceleradores GPU:',
        text: 'NVIDIA H100, A100, L40S interconectadas mediante NVLink para cómputo de coma flotante de alta precisión.',
      },
      {
        label: 'Memoria RAM con ECC:',
        text: 'Módulos DDR5 de alta frecuencia con corrección de errores de 128 GB a 2 TB por nodo para evitar corrupciones de memoria.',
      },
      {
        label: 'Homogeneidad:',
        text: 'Hardware idéntico para evitar cuellos de botella por diferencias de rendimiento entre nodos.',
      },
    ],
  },
  {
    id: 'storage',
    name: 'Almacenamiento Paralelo (Lustre / SAN)',
    shortDesc: 'SAN Fibre Channel, NVMe-oF, sistemas de archivos Lustre/GPFS.',
    iconName: 'hard-drive',
    accentColor: '#af52de',
    detailedTitle: 'Almacenamiento Compartido y Paralelo',
    detailedIntro: 'Permite que todos los nodos lean y escriban datos masivos de manera simultánea sin saturar discos individuales.',
    detailedPoints: [
      {
        label: 'Sistemas de Archivos Paralelos:',
        text: 'Lustre, IBM Spectrum Scale (GPFS), Ceph o BeeGFS.',
      },
      {
        label: 'Infraestructura SAN / NVMe-oF:',
        text: 'Conexiones vía Fibre Channel (32/64G) o arrays NVMe sobre Fabrics para transferencias de decenas de GB/s.',
      },
      {
        label: 'Protección de Datos:',
        text: 'Controladoras RAID 6/60 de alta disponibilidad con tolerancia a pérdida simultánea de discos.',
      },
    ],
  },
];

export const gridHardwareNodes: HardwareNodeItem[] = [
  {
    id: 'gateways',
    name: 'Grid Gateways & Resource Brokers',
    shortDesc: 'Pasarelas con middleware (Globus Toolkit, gLite) y servidores de catálogos.',
    iconName: 'server',
    accentColor: '#34c759',
    detailedTitle: 'Pasarelas de Acceso (Grid Gateways & Gatekeepers)',
    detailedIntro: 'Actúan como embajadas digitales que reciben solicitudes externas, autentican a los usuarios y traducen las tareas a los planificadores locales.',
    detailedPoints: [
      {
        label: 'Servidores de Middleware:',
        text: 'Ejecutan pilas de software estándar como Globus Toolkit (GRAM, GridFTP), gLite o UNICORE.',
      },
      {
        label: 'Resource Brokers:',
        text: 'Servidores que reciben los requisitos del trabajo del usuario y buscan en el catálogo de la malla qué centro tiene capacidad disponible (matchmaking).',
      },
      {
        label: 'Traducción de Trabajos:',
        text: 'Convierten descripciones genéricas (en JDL o XML) a comandos específicos del clúster local (Slurm, Condor).',
      },
    ],
  },
  {
    id: 'wan',
    name: 'Red WAN & Redes Académicas (RENATA / GEANT)',
    shortDesc: 'Internet global, fibra óptica académica, routers BGP de frontera.',
    iconName: 'globe',
    accentColor: '#2997ff',
    detailedTitle: 'Red WAN & Redes Académicas Globales',
    detailedIntro: 'El Grid no depende de una sola sala de servidores; opera sobre la infraestructura global de telecomunicaciones.',
    detailedPoints: [
      {
        label: 'Redes Académicas de Fibra Óptica:',
        text: 'Conexión a través de RENATA (Colombia), RedCLARA (Latinoamérica), GEANT (Europa) e Internet2 (EE.UU.).',
      },
      {
        label: 'Latencias Variables:',
        text: 'La latencia pasa de microsegundos a decenas o cientos de milisegundos (ms), exigiendo algoritmos tolerantes al retardo.',
      },
      {
        label: 'Routers de Frontera BGP:',
        text: 'Equipos de enrutamiento empresarial con cortafuegos dedicados para el tráfico de la malla.',
      },
    ],
  },
  {
    id: 'heterogeneous',
    name: 'Recursos Heterogéneos Federados',
    shortDesc: 'Clústeres locales, supercomputadores, granjas de servidores e instrumentos.',
    iconName: 'layers',
    accentColor: '#ff9f0a',
    detailedTitle: 'Recursos Heterogéneos y Descentralizados',
    detailedIntro: 'A diferencia del clúster homogéneo, un Grid aprovecha cualquier recurso computacional disponible independientemente de su fabricante o arquitectura.',
    detailedPoints: [
      {
        label: 'Diversidad de Nodos:',
        text: 'Supercomputadores, clústeres locales, servidores blade, PCs de laboratorio e instrumentos científicos (telescopios, colisionadores).',
      },
      {
        label: 'Arquitecturas Dispares:',
        text: 'Coexistencia de procesadores x86_64, ARM, IBM POWER con distintos sistemas operativos (Linux, Unix).',
      },
      {
        label: 'Uso no exclusivo:',
        text: 'Los nodos atienden a sus usuarios locales y donan o alquilan los ciclos de reloj ociosos a la malla.',
      },
    ],
  },
  {
    id: 'srm',
    name: 'Storage Elements (SE) & Seguridad PKI',
    shortDesc: 'SRM, GridFTP, librerías de cinta magnética y certificados X.509.',
    iconName: 'shield',
    accentColor: '#af52de',
    detailedTitle: 'Storage Elements & Seguridad PKI / X.509',
    detailedIntro: 'Garantiza la transferencia segura y federada de datos masivos entre instituciones no vinculadas formalmente.',
    detailedPoints: [
      {
        label: 'Storage Resource Managers (SRM):',
        text: 'dCache, iRODS y GridFTP para movimiento masivo de petabytes con recuperación ante cortes de red.',
      },
      {
        label: 'Librerías de Cinta Magnética (LTO):',
        text: 'Sistemas de almacenamiento jerárquico masivo de bajo costo para conservación histórica.',
      },
      {
        label: 'Autenticación con Certificados X.509:',
        text: 'Servidores de Autoridad de Certificación (CA) y VOMS para gestión de identidades y permisos globales.',
      },
    ],
  },
];
