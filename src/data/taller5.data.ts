export interface SistemaParalelo {
  id: string;
  name: string;
  origin: string;
  url: string;
  summary: string;
}

export const sistemasParalelos: SistemaParalelo[] = [
  {
    id: 'lustre',
    name: 'Lustre',
    origin: 'Cluster File Systems, 2003; hoy comunidad OpenSFS',
    url: 'https://www.lustre.org/',
    summary:
      'Es el sistema de archivos paralelo más usado en supercomputación: la mayoría de las máquinas del TOP500 lo usan. Separa los metadatos de los datos y reparte cada archivo entre muchos servidores de almacenamiento. Es de código abierto (GPL).',
  },
  {
    id: 'gpfs',
    name: 'IBM Storage Scale (GPFS)',
    origin: 'IBM, 1998 (antes General Parallel File System y Spectrum Scale)',
    url: 'https://www.ibm.com/products/storage-scale',
    summary:
      'Es un sistema de archivos paralelo comercial de IBM. Todos los nodos acceden a los mismos discos compartidos y no hay un servidor central de metadatos. Se usa en supercomputadoras como Summit y Sierra, en bancos y en plataformas de analítica e IA.',
  },
  {
    id: 'beegfs',
    name: 'BeeGFS',
    origin: 'Fraunhofer ITWM, Alemania, 2005 (antes FhGFS)',
    url: 'https://www.beegfs.io/',
    summary:
      'Es un sistema de archivos paralelo diseñado para ser fácil de instalar y administrar. Corre sobre Linux normal y reparte cada archivo entre varios servidores. Es popular en universidades, centros de HPC y clústeres de IA.',
  },
  {
    id: 'orangefs',
    name: 'PVFS / OrangeFS',
    origin: 'Clemson University y Argonne National Laboratory, 1993',
    url: 'https://www.orangefs.org/',
    summary:
      'PVFS (Parallel Virtual File System) fue uno de los primeros sistemas de archivos paralelos para clústeres Linux. OrangeFS es su continuación, y desde 2015 su cliente está incluido en el núcleo de Linux. Se usa mucho en investigación y docencia.',
  },
  {
    id: 'panfs',
    name: 'PanFS (Panasas)',
    origin: 'Panasas, 1999',
    url: 'https://www.panasas.com/',
    summary:
      'Es un sistema de archivos paralelo comercial que se vende junto con su propio hardware. Guarda los archivos como objetos repartidos entre muchos "blades" de almacenamiento. Protege los datos con RAID calculado por archivo (no por disco), así que la reconstrucción es más rápida.',
  },
  {
    id: 'daos',
    name: 'DAOS',
    origin: 'Intel, 2016; hoy DAOS Foundation (Linux Foundation)',
    url: 'https://daos.io/',
    summary:
      'DAOS (Distributed Asynchronous Object Storage) es un sistema de almacenamiento paralelo pensado para memoria persistente y discos NVMe. Evita el núcleo del sistema operativo para reducir la latencia. Se usa en la supercomputadora exaescala Aurora, de Argonne.',
  },
];

export interface ComponenteParalelo {
  name: string;
  role: string;
}

export interface DetalleParalelo {
  id: string;
  name: string;
  intro: string;
  componentes: ComponenteParalelo[];
  pasos: string[];
  tolerancia: string;
  enClase: string;
}

export const detallesParalelos: DetalleParalelo[] = [
  {
    id: 'lustre',
    name: 'Lustre',
    intro:
      'Lustre separa por completo los **metadatos** (nombres, permisos, directorios) de los **datos** de los archivos, y cada tipo lo atiende un servidor distinto. Así, abrir un archivo y transferirlo son trabajos independientes que no compiten entre sí.',
    componentes: [
      { name: 'MGS (Management Server)', role: 'Guarda la configuración del sistema de archivos y la entrega a los demás nodos.' },
      { name: 'MDS / MDT (Metadata Server / Target)', role: 'Atiende el árbol de directorios, los nombres y los permisos, y sabe en qué OSTs está cada archivo.' },
      { name: 'OSS / OST (Object Storage Server / Target)', role: 'Los OSTs son los discos donde se guardan los datos; cada servidor OSS administra varios.' },
      { name: 'Clientes', role: 'Los nodos de cómputo montan Lustre como un sistema de archivos POSIX normal.' },
    ],
    pasos: [
      'El cliente pide abrir el archivo al **MDS**, que revisa los permisos y responde con el **layout**: en qué OSTs está el archivo y con qué tamaño de franja (stripe).',
      'Desde ese momento el cliente habla **directamente con los OSS**, sin volver a pasar por el MDS.',
      'El archivo está dividido en franjas (por ejemplo de 1 MB) repartidas en forma circular entre varios OSTs, así que el cliente lee o escribe en todos **a la vez**.',
      'Cuantos más OSTs tenga un archivo, más ancho de banda: con 100 OSTs se suman las velocidades de 100 discos.',
      'Un gestor de bloqueos distribuido (LDLM) coordina a los clientes que escriben en el mismo archivo para mantener la consistencia.',
    ],
    tolerancia:
      'Los servidores se configuran en **pares de failover**: si un OSS o el MDS cae, su pareja toma sus discos. La protección del disco en sí se deja a RAID por hardware (normalmente RAID 6) debajo de cada OST.',
    enClase: 'Striping de la clase 18, con un servicio de directorios (MDS) separado del servicio de archivos (OSS).',
  },
  {
    id: 'gpfs',
    name: 'IBM Storage Scale (GPFS)',
    intro:
      'GPFS es un sistema de **discos compartidos**: todos los nodos ven todos los discos, ya sea por una SAN o a través de servidores NSD en la red. No hay un único servidor de metadatos; cada nodo puede atender los metadatos de los archivos que está usando.',
    componentes: [
      { name: 'NSD (Network Shared Disk)', role: 'Los discos del sistema, accesibles por SAN o exportados por red desde servidores NSD.' },
      { name: 'Nodos cliente', role: 'Montan el sistema y leen o escriben bloques directamente en los NSD.' },
      { name: 'Cluster manager', role: 'Un nodo elegido por quórum que vigila el estado del clúster.' },
      { name: 'Token manager', role: 'Reparte "tokens" (bloqueos distribuidos) para que dos nodos no modifiquen el mismo bloque a la vez.' },
    ],
    pasos: [
      'Cada archivo se divide en bloques grandes (de 256 KB a 16 MB) que se reparten entre **todos** los discos del sistema.',
      'Para escribir un rango del archivo, el nodo pide un **token** al token manager, que le da derecho exclusivo sobre esos bloques.',
      'Con el token, el nodo escribe en paralelo en todos los NSD involucrados, sin intermediarios.',
      'Los metadatos también están distribuidos: el nodo que tiene abierto un archivo actúa como su "metanodo" y coordina sus cambios.',
      'Puede mover datos de forma automática entre discos rápidos (SSD) y lentos (HDD o cinta) según reglas de uso (gestión del ciclo de vida).',
    ],
    tolerancia:
      'Puede replicar datos y metadatos (2 o 3 copias), o usar **GPFS Native RAID** con códigos de borrado. El clúster sigue funcionando mientras haya **quórum** de nodos (mitad más uno).',
    enClase: 'Quórum para el líder del clúster, y paridad o réplica de bloques para la tolerancia a fallos.',
  },
  {
    id: 'beegfs',
    name: 'BeeGFS',
    intro:
      'BeeGFS sigue la misma idea que Lustre (metadatos por un lado, datos por otro), pero todos sus servicios corren en espacio de usuario sobre sistemas de archivos Linux normales (ext4, XFS). Además, los **metadatos también se reparten** entre varios servidores, directorio por directorio.',
    componentes: [
      { name: 'Management service', role: 'Registro de todos los servicios y nodos; similar a un binder.' },
      { name: 'Metadata service', role: 'Guarda directorios, permisos y el patrón de striping de cada archivo. Puede haber varios, cada uno con una parte del árbol.' },
      { name: 'Storage service', role: 'Guarda los fragmentos (chunks) de los archivos en los discos de cada servidor.' },
      { name: 'Client', role: 'Módulo del núcleo de Linux que monta BeeGFS como un directorio normal.' },
    ],
    pasos: [
      'El cliente consulta al **metadata service** responsable de ese directorio, que le indica en qué storage targets están los chunks del archivo.',
      'El archivo se divide en chunks (512 KB por defecto) repartidos entre varios targets, por ejemplo 4.',
      'El cliente lee y escribe esos chunks **en paralelo** y directamente con los storage servers.',
      'Para crecer, se agregan servidores de almacenamiento o de metadatos sin detener el sistema.',
      'Incluye **BeeOND** ("on demand"): crea un sistema de archivos temporal con los discos locales de los nodos de un trabajo y lo borra al terminar.',
    ],
    tolerancia:
      'Con **buddy mirroring**, cada target de datos o de metadatos tiene una pareja que guarda la misma información. Si uno falla, su pareja sigue atendiendo, y se resincronizan cuando vuelve.',
    enClase: 'Striping de los datos y mirroring por parejas (como RAID 10), con un servicio de registro parecido al binder.',
  },
];

export const paraleloMatrixColumns = ['Sistema', 'Licencia', 'Metadatos', 'Protección de datos', 'Uso típico'];

export const paraleloMatrix: string[][] = [
  ['Lustre', 'Libre (GPL)', 'Servidores MDS dedicados', 'RAID por hardware + failover de servidores', 'Supercomputadoras (TOP500)'],
  ['IBM Storage Scale (GPFS)', 'Comercial', 'Distribuidos entre los nodos', 'Réplicas o Native RAID; quórum', 'HPC, banca, analítica e IA'],
  ['BeeGFS', 'Libre (núcleo) / soporte comercial', 'Varios servidores, por directorio', 'Buddy mirroring', 'Universidades, clústeres de IA'],
  ['PVFS / OrangeFS', 'Libre (LGPL)', 'Distribuidos', 'Depende del almacenamiento subyacente', 'Investigación y docencia'],
  ['PanFS', 'Comercial (con hardware)', 'Director blades', 'RAID por archivo', 'Industria, manufactura, energía'],
  ['DAOS', 'Libre (Apache 2.0)', 'Distribuidos (objetos)', 'Réplicas o códigos de borrado', 'Exaescala (Aurora)'],
];
