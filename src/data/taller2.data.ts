import type { ModeloComputacion } from './taller2.data.d';

export const matrixColumns = [
  'Modelo',
  'Enfoque Principal',
  'Acoplamiento',
  'Tipo de Red',
  'Dominio Administrativo',
  'Métrica Clave',
];

export const modelosData: ModeloComputacion[] = [
  {
    id: 'cluster',
    name: 'Cluster Computing',
    shortName: 'Cluster',
    examples: [
      {
        name: 'Frontier Supercomputer (Oak Ridge National Laboratory)',
        url: 'https://www.top500.org/system/180047/',
        description:
          'Supercomputador exaescala formado por miles de nodos idénticos HPE Cray EX interconectados por una red dedicada HPE Slingshot-11 de topología Dragonfly y baja latencia. Opera en un único datacenter y bajo un único dominio administrativo; el planificador Slurm presenta los nodos como un recurso de cómputo unificado para ejecutar simulaciones físicas y moleculares de alto rendimiento (HPC) que requieren comunicación fuertemente acoplada mediante MPI.',
      },
      {
        name: 'Pixar Render Farm (RenderMan + Tractor)',
        url: 'https://renderman.pixar.com/tractor',
        description:
          'Granja de renderizado de animación por computadora localizada en el centro de datos de Pixar. Consiste en servidores de cómputo dedicados en un mismo sitio, con almacenamiento compartido, coordinados por el gestor de colas distribuido Tractor. Opera bajo una red de área local cerrada y un único control administrativo para repartir fotogramas y cálculos de trazado de rayos entre los nodos.',
      },
    ],
    matrix: {
      enfoque: 'HPC / Cómputo paralelo en un solo sitio',
      acoplamiento: 'Fuerte (MPI) a moderado (granjas de render)',
      red: 'LAN dedicada de alta velocidad (InfiniBand / Slingshot / RoCE)',
      dominio: 'Único',
      metrica: 'FLOPS / Latencia de red',
    },
  },
  {
    id: 'grid',
    name: 'Grid Computing',
    shortName: 'Grid',
    examples: [
      {
        name: 'Worldwide LHC Computing Grid (WLCG - CERN)',
        url: 'https://wlcg.web.cern.ch/',
        description:
          'Infraestructura global de computación en malla que integra recursos de computación y almacenamiento de más de 170 centros de datos independientes en más de 40 países. Emplea middleware grid estandarizado y federación de identidades (PKI/X.509) para coordinar recursos heterogéneos y dispersos sobre redes WAN (GEANT/LHCOPN), procesando de forma desacoplada los petabytes de datos producidos por los experimentos del Gran Colisionador de Hadrones.',
      },
      {
        name: 'Open Science Grid (OSG Consortium)',
        url: 'https://osg-htc.org/',
        description:
          'Federación distribuida de centros de datos universitarios y laboratorios nacionales de EE. UU. que comparten recursos computacionales heterogéneos bajo el modelo de High-Throughput Computing (HTC). Orquestado por el middleware HTCondor, permite a proyectos de astrofísica y genómica ejecutar millones de trabajos computacionales independientes aprovechando capacidades ociosas entre dominios autónomos.',
      },
    ],
    matrix: {
      enfoque: 'HTC / Federación de recursos',
      acoplamiento: 'Débilmente acoplado',
      red: 'WAN / Redes académicas',
      dominio: 'Múltiple / Federado',
      metrica: 'Throughput / Trabajos/mes',
    },
  },
  {
    id: 'volunteer',
    name: 'Volunteer Computing',
    shortName: 'Volunteer',
    examples: [
      {
        name: 'BOINC - Berkeley Open Infrastructure for Network Computing',
        url: 'https://boinc.berkeley.edu/',
        description:
          'Plataforma middleware desarrollada desde 2002 por la Universidad de California en Berkeley que permite a cientos de miles de voluntarios donar ciclos de CPU y GPU de sus computadores personales para proyectos de investigación científica global. Emplea una arquitectura cliente-servidor distribuida con tolerancia a nodos no confiables y validación cruzada redundante de cálculos.',
      },
      {
        name: 'Folding@home',
        url: 'https://foldingathome.org/',
        description:
          'Proyecto de computación voluntaria activo desde el año 2000, orientado a la simulación del plegamiento de proteínas y dinámica molecular para la investigación de enfermedades. Cientos de miles de voluntarios ejecutan un cliente ligero en segundo plano que descarga unidades de trabajo y utiliza la capacidad ociosa de sus tarjetas gráficas y procesadores para realizar simulaciones complejas.',
      },
    ],
    matrix: {
      enfoque: 'Cómputo oportunista ciudadano',
      acoplamiento: 'Muy débilmente acoplado',
      red: 'Internet público no confiable',
      dominio: 'Abierto / Descentralizado',
      metrica: 'Nodos activos / Quórum',
    },
  },
  {
    id: 'utility',
    name: 'Utility Computing',
    shortName: 'Utility',
    examples: [
      {
        name: 'Sun Grid Compute Utility (Sun Microsystems, 2006)',
        url: 'https://en.wikipedia.org/wiki/Sun_Cloud',
        description:
          'Servicio lanzado por Sun Microsystems en 2006 que ofrecía capacidad de cómputo por Internet a una tarifa fija de US$1 por CPU-hora. El usuario enviaba trabajos y pagaba solo por el consumo medido de CPU, como un servicio público de agua o electricidad, sin adquirir ni administrar hardware. Es un ejemplo histórico de utility computing anterior a la popularización del término cloud.',
      },
      {
        name: 'Amazon Elastic Compute Cloud (Amazon EC2) On-Demand',
        url: 'https://aws.amazon.com/ec2/',
        description:
          'Servicio de infraestructura que provee capacidad de cómputo empaquetada como máquinas virtuales redimensionables bajo un modelo medido y tarifado por segundo o por hora (pay-as-you-go). El usuario accede a recursos bajo demanda sin inversión en hardware físico, consumiendo el procesamiento como un servicio público medible.',
      },
    ],
    matrix: {
      enfoque: 'Medición y tarificación por consumo',
      acoplamiento: 'Variable según servicio',
      red: 'Red del proveedor / Internet',
      dominio: 'Proveedor de servicio',
      metrica: 'Costo por segundo o recurso',
    },
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    shortName: 'Cloud',
    examples: [
      {
        name: 'Microsoft Azure Cloud Platform',
        url: 'https://azure.microsoft.com/',
        description:
          'Plataforma pública de computación en la nube que suministra servicios elásticos bajo demanda en los modelos IaaS, PaaS y SaaS. Ofrece recursos multitenant compartidos a escala global, autoservicio inmediato, balanceo de carga, elasticidad dinámica y disponibilidad garantizada mediante SLAs para aplicaciones empresariales.',
      },
      {
        name: 'Salesforce (Software as a Service)',
        url: 'https://www.salesforce.com/',
        description:
          'Pionera del modelo SaaS desde 1999, entrega su plataforma CRM completamente a través del navegador. Su arquitectura multitenant hace que miles de organizaciones compartan la misma infraestructura y base de código, aisladas lógicamente, recibiendo actualizaciones simultáneas del proveedor. El cliente consume el software por suscripción sin administrar servidores ni bases de datos.',
      },
    ],
    matrix: {
      enfoque: 'Elasticidad, autoservicio y abstracción',
      acoplamiento: 'Variable (IaaS/PaaS/SaaS)',
      red: 'Internet / VPN dedicada',
      dominio: 'Proveedor cloud multitenant',
      metrica: 'Elasticidad / SLA de servicio',
    },
  },
  {
    id: 'mobile',
    name: 'Mobile Computing',
    shortName: 'Mobile',
    examples: [
      {
        name: 'Apple Continuity y Handoff',
        url: 'https://support.apple.com/en-us/102426',
        description:
          'Arquitectura distribuida para dispositivos móviles (iPhone, iPad, Mac, Apple Watch) que utiliza Bluetooth Low Energy para detección de proximidad, Wi-Fi punto a punto (AWDL, Apple Wireless Direct Link) para transferencia directa de datos y la cuenta de iCloud para autenticar los dispositivos del usuario. Permite continuar una tarea iniciada en un equipo en otro cercano sin perder su estado.',
      },
      {
        name: 'Google Maps Navigation con Android Auto',
        url: 'https://www.android.com/auto/',
        description:
          'Aplicación de computación móvil que opera en entornos de alta movilidad física con conectividad celular intermitente. Combina la ejecución local en el smartphone (sensores GPS, brújula y renderizado local con mapas en caché) con comunicación hacia la infraestructura de nube para sincronizar datos de tráfico y recalcular rutas óptimas al vuelo.',
      },
    ],
    matrix: {
      enfoque: 'Portabilidad y cambio dinámico de contexto',
      acoplamiento: 'Débil / Conectividad intermitente',
      red: 'Celular / BLE / Wi-Fi',
      dominio: 'Personal / Usuario móvil',
      metrica: 'Consumo de batería / Resiliencia',
    },
  },
  {
    id: 'iot',
    name: 'Ubiquitous Computing / Internet of Things (IoT)',
    shortName: 'Ubiquitous / IoT',
    examples: [
      {
        name: 'Philips Hue Smart Lighting System',
        url: 'https://www.philips-hue.com/',
        description:
          'Sistema de computación ubicua donde microcontroladores embebidos en luminarias y sensores se integran de manera invisible en el entorno doméstico. Los nodos se comunican mediante redes de malla Zigbee de bajo consumo coordinadas por un puente local (Hue Bridge), automatizando el ambiente con base en presencia y ritmos circadianos sin intervención explícita.',
      },
      {
        name: 'AWS IoT Core',
        url: 'https://aws.amazon.com/iot-core/',
        description:
          'Plataforma distribuida que gestiona la conexión bidireccional y segura de miles de millones de sensores y actuadores físicos con servicios de nube. Emplea protocolos ligeros como MQTT y provee sombras virtuales de dispositivos (Device Shadows) para interactuar con los dispositivos físicos incluso cuando pierden conectividad de red.',
      },
    ],
    matrix: {
      enfoque: 'Integración invisible en el entorno físico',
      acoplamiento: 'Red de malla / Eventos',
      red: 'Zigbee / Thread / BLE / MQTT',
      dominio: 'Local o nube personal',
      metrica: 'Densidad de nodos / Latencia sensorial',
    },
  },
  {
    id: 'edge-fog',
    name: 'Edge / Fog Computing',
    shortName: 'Edge / Fog',
    examples: [
      {
        name: 'Cloudflare Workers',
        url: 'https://workers.cloudflare.com/',
        description:
          'Plataforma de computación serverless en el borde que ejecuta funciones de usuario en cientos de puntos de presencia (PoPs) globales. Al procesar las solicitudes en el borde de la red, cerca del cliente final, reduce la latencia a pocos milisegundos y descongestiona los servidores centrales de origen.',
      },
      {
        name: 'Cisco IOx (Fog Computing)',
        url: 'https://developer.cisco.com/docs/iox/',
        description:
          'Plataforma de Cisco, empresa que acuñó el término fog computing, que ejecuta aplicaciones en contenedores directamente sobre routers, switches y gateways industriales ubicados entre los sensores y la nube. Esta capa de niebla filtra, agrega y analiza localmente los datos de campo y envía a la nube solo la información resumida, reduciendo latencia y ancho de banda.',
      },
    ],
    matrix: {
      enfoque: 'Procesamiento cercano a la fuente de datos',
      acoplamiento: 'Distribuido perimetral',
      red: 'Red de borde / 5G / LAN local',
      dominio: 'Híbrido (local/nube)',
      metrica: 'Latencia / Ancho de banda ahorrado',
    },
  },
  {
    id: 'autonomic',
    name: 'Autonomic Computing',
    shortName: 'Autonomic',
    examples: [
      {
        name: 'Kubernetes Horizontal Pod Autoscaler (HPA) con Control Loops',
        url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/',
        description:
          'Mecanismo de orquestación que implementa un bucle de control cerrado equivalente al ciclo autonómico MAPE-K (Monitor, Analyze, Plan, Execute). Mide periódicamente las métricas de carga, las compara contra el objetivo deseado, calcula el número de réplicas requeridas y escala horizontalmente los pods sin intervención de administradores humanos (auto-optimización).',
      },
      {
        name: 'Oracle Autonomous Database',
        url: 'https://www.oracle.com/autonomous-database/',
        description:
          'Base de datos en la nube que Oracle define como self-driving, self-securing y self-repairing, propiedades alineadas con los principios autonómicos de IBM: autoconfiguración de recursos, autooptimización de consultas e índices mediante aprendizaje automático, autorreparación ante fallos y autoprotección mediante aplicación automática de parches de seguridad.',
      },
    ],
    matrix: {
      enfoque: 'Bucles cerrados de autocontrol (MAPE-K)',
      acoplamiento: 'N/A (Paradigma de control)',
      red: 'N/A (Aplica a cualquier red)',
      dominio: 'Autónomo (Software/Agentes)',
      metrica: 'MTTD / MTTR / Reducción de intervención',
    },
  },
];
