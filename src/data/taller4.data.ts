export interface SistemaArchivos {
  id: string;
  name: string;
  origin: string;
  url: string;
  description: string;
  /** Link to concepts seen in class 18. */
  enClase: string;
  matrix: {
    arquitectura: string;
    semantica: string;
    tolerancia: string;
    usoTipico: string;
  };
}

export const sistemasArchivos: SistemaArchivos[] = [
  {
    id: 'nfs',
    name: 'NFS (Network File System)',
    origin: 'Sun Microsystems, 1984',
    url: 'https://datatracker.ietf.org/doc/html/rfc7530',
    description:
      'Es el sistema de archivos distribuido clásico de Unix/Linux. Un servidor exporta un directorio y los clientes lo montan dentro de su propio árbol (por ejemplo en /mnt/datos), así que se usa como si fuera local. Los clientes envían las operaciones (abrir, leer, escribir) al servidor mediante RPC. Las versiones 2 y 3 no guardaban estado en el servidor; NFSv4 ya maneja estado, bloqueos y seguridad con Kerberos.',
    enClase: 'Cliente ligero que reenvía las llamadas por RPC; espacio de nombres único por montaje.',
    matrix: {
      arquitectura: 'Cliente-servidor (un servidor por exportación)',
      semantica: 'Cercana a Unix, con caché de cliente que se revalida cada pocos segundos',
      tolerancia: 'Baja: si cae el servidor, el recurso no está disponible',
      usoTipico: 'Directorios compartidos en redes locales y laboratorios',
    },
  },
  {
    id: 'afs',
    name: 'AFS (Andrew File System)',
    origin: 'Carnegie Mellon University, 1983',
    url: 'https://www.openafs.org/',
    description:
      'Fue diseñado para miles de estaciones de un campus. Al abrir un archivo, el cliente descarga una copia completa a su disco local y trabaja sobre ella; los cambios se envían al servidor cuando el archivo se cierra. El servidor registra quién tiene copia y les avisa (callback) cuando cambia, para que la invaliden. Todos los usuarios ven un mismo árbol global bajo /afs. Hoy sigue vivo como OpenAFS.',
    enClase: 'Ejemplo directo de la semántica de sesión y de caché con invalidación (escritura diferida).',
    matrix: {
      arquitectura: 'Cliente-servidor con cliente pesado (caché en disco local)',
      semantica: 'De sesión: los cambios se ven al cerrar el archivo',
      tolerancia: 'Media: volúmenes replicados de solo lectura',
      usoTipico: 'Universidades y centros de investigación',
    },
  },
  {
    id: 'gfs',
    name: 'Google File System (GFS) / Colossus',
    origin: 'Google, 2003 (Colossus lo reemplazó desde 2010)',
    url: 'https://research.google/pubs/the-google-file-system/',
    description:
      'Google lo creó para guardar archivos gigantes en miles de servidores baratos que fallan a menudo. Un nodo maestro guarda solo los metadatos (nombres y en qué servidor está cada fragmento) y los chunkservers guardan los datos en fragmentos de 64 MB, cada uno replicado tres veces. Está optimizado para escribir agregando al final y para lecturas secuenciales largas. Su sucesor, Colossus, distribuye también los metadatos para no depender de un solo maestro.',
    enClase: 'Maestro-trabajador con réplicas: el maestro sabe dónde está cada bloque y los trabajadores lo guardan.',
    matrix: {
      arquitectura: 'Maestro de metadatos + muchos chunkservers',
      semantica: 'Relajada: optimizada para agregar al final (append)',
      tolerancia: 'Alta: 3 réplicas por fragmento y re-replicación automática',
      usoTipico: 'Índices de búsqueda y datos internos de Google',
    },
  },
  {
    id: 'hdfs',
    name: 'HDFS (Hadoop Distributed File System)',
    origin: 'Apache, 2006 (inspirado en GFS)',
    url: 'https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html',
    description:
      'Es la versión de código abierto de las ideas de GFS y la base del ecosistema Hadoop. El NameNode guarda el árbol de directorios y la ubicación de los bloques; los DataNodes guardan bloques de 128 MB, replicados 3 veces por defecto en distintos racks. Los archivos se escriben una vez y luego solo se leen o se les agrega al final. Para que el NameNode no sea punto único de fallo, se configura uno en espera con failover automático.',
    enClase: 'Archivos casi inmutables (escribir una vez, leer muchas), replicación y failover del nodo primario.',
    matrix: {
      arquitectura: 'Maestro-trabajador (NameNode + DataNodes)',
      semantica: 'Escribir una vez, leer muchas (casi inmutable)',
      tolerancia: 'Alta: réplicas por bloque y NameNode en espera',
      usoTipico: 'Big data: Hadoop, Spark, Hive',
    },
  },
  {
    id: 'ceph',
    name: 'CephFS (Ceph)',
    origin: 'Sage Weil, UC Santa Cruz, 2006; hoy Linux Foundation',
    url: 'https://docs.ceph.com/en/latest/cephfs/',
    description:
      'Ceph es una plataforma de almacenamiento que ofrece a la vez objetos, bloques y un sistema de archivos POSIX (CephFS). No usa una tabla central de ubicaciones: el algoritmo CRUSH calcula en qué nodos (OSDs) va cada objeto, así que cualquier cliente sabe a dónde ir sin preguntar. Unos monitores mantienen el mapa del clúster por consenso (Paxos) y unos servidores de metadatos (MDS) atienden el árbol de directorios. Protege los datos con réplicas o con códigos de borrado.',
    enClase: 'Quórum de monitores (mitad más uno), y réplicas o paridad (códigos correctores) en vez de RAID.',
    matrix: {
      arquitectura: 'Descentralizada: monitores, MDS y OSDs',
      semantica: 'POSIX (cercana a Unix)',
      tolerancia: 'Muy alta: réplicas o códigos de borrado, sin punto único de fallo',
      usoTipico: 'Nubes privadas (OpenStack), Kubernetes',
    },
  },
  {
    id: 'gluster',
    name: 'GlusterFS',
    origin: 'Gluster Inc., 2005; luego Red Hat',
    url: 'https://docs.gluster.org/en/latest/',
    description:
      'Junta directorios de discos locales de varios servidores (llamados bricks) en un solo volumen que se monta por red. No tiene servidor de metadatos: la ubicación de cada archivo se calcula con un hash de su nombre. Al crear el volumen se elige el tipo: distribuido (reparte archivos), replicado (copias en varios bricks), dispersado (con paridad) o combinaciones de ellos.',
    enClase: 'El caso típico de DFS que suma los discos DAS de cada nodo y los muestra como uno solo.',
    matrix: {
      arquitectura: 'Peer to peer entre servidores, sin nodo de metadatos',
      semantica: 'POSIX',
      tolerancia: 'Configurable: volúmenes replicados o dispersados',
      usoTipico: 'Almacenamiento de archivos y medios, contenedores',
    },
  },
];

export const dfsMatrixColumns = ['Sistema', 'Arquitectura', 'Semántica', 'Tolerancia a fallos', 'Uso típico'];

/* ---------------- RAID ---------------- */

/** Block layout on 4 disks: d = data, p = parity, q = second parity, m = mirror copy. */
export type RaidCell = { label: string; kind: 'd' | 'p' | 'q' | 'm' };

export interface NivelRaid {
  id: string;
  name: string;
  nickname: string;
  minDisks: number;
  description: string;
  pros: string;
  cons: string;
  /** Usable capacity with n disks of 1 unit each. */
  usable: (n: number) => number;
  /** How many disks can fail without losing data (worst case). */
  tolerates: string;
  /** Rows = stripes, columns = disks. */
  layout: RaidCell[][];
  common: boolean;
}

const d = (label: string): RaidCell => ({ label, kind: 'd' });
const p = (label: string): RaidCell => ({ label, kind: 'p' });
const q = (label: string): RaidCell => ({ label, kind: 'q' });
const m = (label: string): RaidCell => ({ label, kind: 'm' });

export const raidIntro = [
  '**RAID** (Redundant Array of Independent Disks) es una técnica que combina varios discos físicos en una sola unidad lógica. El sistema operativo ve un único disco virtual, pero por debajo los datos se reparten o se copian entre los discos.',
  'Persigue dos objetivos, a veces juntos y a veces enfrentados: **rendimiento** (leer y escribir en varios discos a la vez, con striping) y **tolerancia a fallos** (sobrevivir a la pérdida de un disco, con mirroring o paridad). Son justo las tres técnicas de los sistemas de archivos paralelos vistas en la clase 18.',
  'Puede implementarse por **hardware** (una controladora RAID con su propio procesador, típica en NAS y SAN) o por **software** (el sistema operativo: mdadm en Linux, Espacios de almacenamiento en Windows, ZFS). RAID **no reemplaza las copias de seguridad**: si se borra un archivo por error o entra un ransomware, el cambio se copia a todos los discos.',
];

export const nivelesRaid: NivelRaid[] = [
  {
    id: 'raid0',
    name: 'RAID 0',
    nickname: 'Striping (división)',
    minDisks: 2,
    description:
      'Divide los datos en bloques y los reparte de forma alterna entre todos los discos, sin ninguna redundancia. Con 4 discos, un archivo se lee y se escribe en 4 partes a la vez.',
    pros: 'Máximo rendimiento y se aprovecha el 100 % de la capacidad.',
    cons: 'Si falla un solo disco se pierde todo el arreglo. Es menos confiable que un disco solo.',
    usable: (n) => n,
    tolerates: '0 discos',
    layout: [
      [d('A1'), d('A2'), d('A3'), d('A4')],
      [d('B1'), d('B2'), d('B3'), d('B4')],
      [d('C1'), d('C2'), d('C3'), d('C4')],
    ],
    common: true,
  },
  {
    id: 'raid1',
    name: 'RAID 1',
    nickname: 'Mirroring (espejo)',
    minDisks: 2,
    description:
      'Cada disco guarda una copia idéntica de los datos. Lo que se escribe en uno se escribe en su espejo. Las lecturas pueden repartirse entre las copias.',
    pros: 'Muy simple y seguro; lecturas rápidas y reconstrucción sencilla (copiar el disco sano).',
    cons: 'Se aprovecha solo una copia: con 2 discos de 1 TB se tiene 1 TB útil.',
    usable: () => 1,
    tolerates: 'n − 1 discos',
    layout: [
      [d('A'), m('A'), m('A'), m('A')],
      [d('B'), m('B'), m('B'), m('B')],
      [d('C'), m('C'), m('C'), m('C')],
    ],
    common: true,
  },
  {
    id: 'raid2',
    name: 'RAID 2',
    nickname: 'Striping a nivel de bit + Hamming',
    minDisks: 3,
    description:
      'Reparte los datos bit a bit entre los discos y guarda en discos aparte un código de Hamming que corrige errores. Requiere que todos los discos giren sincronizados.',
    pros: 'Corrige errores de bit sobre la marcha.',
    cons: 'Obsoleto: los discos modernos ya traen su propia corrección de errores, y necesita muchos discos de control.',
    usable: (n) => Math.max(n - Math.ceil(Math.log2(n + 1)), 0),
    tolerates: '1 disco',
    layout: [
      [d('A0'), d('A1'), p('Ham'), p('Ham')],
      [d('B0'), d('B1'), p('Ham'), p('Ham')],
      [d('C0'), d('C1'), p('Ham'), p('Ham')],
    ],
    common: false,
  },
  {
    id: 'raid3',
    name: 'RAID 3',
    nickname: 'Striping a nivel de byte + paridad dedicada',
    minDisks: 3,
    description:
      'Reparte los datos byte a byte y guarda la paridad (XOR) en un disco dedicado. Cada operación usa todos los discos a la vez.',
    pros: 'Muy buena transferencia para archivos grandes y secuenciales (video).',
    cons: 'Solo atiende una petición a la vez, y el disco de paridad es un cuello de botella. Casi en desuso.',
    usable: (n) => n - 1,
    tolerates: '1 disco',
    layout: [
      [d('A1'), d('A2'), d('A3'), p('Ap')],
      [d('B1'), d('B2'), d('B3'), p('Bp')],
      [d('C1'), d('C2'), d('C3'), p('Cp')],
    ],
    common: false,
  },
  {
    id: 'raid4',
    name: 'RAID 4',
    nickname: 'Striping por bloques + paridad dedicada',
    minDisks: 3,
    description:
      'Igual que RAID 3 pero con bloques en lugar de bytes, así que varias lecturas pequeñas pueden atenderse en paralelo. La paridad sigue en un solo disco.',
    pros: 'Buenas lecturas; tolera un disco caído.',
    cons: 'Toda escritura debe actualizar el disco de paridad, que se vuelve cuello de botella. Es el problema que se mencionó en clase y que RAID 5 resuelve rotando la paridad.',
    usable: (n) => n - 1,
    tolerates: '1 disco',
    layout: [
      [d('A1'), d('A2'), d('A3'), p('Ap')],
      [d('B1'), d('B2'), d('B3'), p('Bp')],
      [d('C1'), d('C2'), d('C3'), p('Cp')],
    ],
    common: false,
  },
  {
    id: 'raid5',
    name: 'RAID 5',
    nickname: 'Striping por bloques + paridad distribuida',
    minDisks: 3,
    description:
      'Reparte bloques de datos y un bloque de paridad por franja, pero la paridad **rota** entre todos los discos. Si un disco falla, su contenido se recalcula con XOR a partir de los demás.',
    pros: 'Buen equilibrio: capacidad de n − 1 discos, buenas lecturas y tolera un fallo.',
    cons: 'Escrituras más lentas (hay que recalcular paridad). Con un disco caído trabaja en modo degradado, y si falla otro durante la reconstrucción se pierde todo.',
    usable: (n) => n - 1,
    tolerates: '1 disco',
    layout: [
      [d('A1'), d('A2'), d('A3'), p('Ap')],
      [d('B1'), d('B2'), p('Bp'), d('B3')],
      [d('C1'), p('Cp'), d('C2'), d('C3')],
      [p('Dp'), d('D1'), d('D2'), d('D3')],
    ],
    common: true,
  },
  {
    id: 'raid6',
    name: 'RAID 6',
    nickname: 'Striping por bloques + doble paridad distribuida',
    minDisks: 4,
    description:
      'Como RAID 5, pero cada franja tiene **dos** bloques de paridad independientes (P y Q), también rotados. Es la opción de "dos bloques de paridad" de la clase.',
    pros: 'Tolera dos discos caídos al mismo tiempo; recomendable con discos grandes, cuya reconstrucción tarda horas.',
    cons: 'Pierde la capacidad de dos discos y las escrituras son más lentas que en RAID 5.',
    usable: (n) => n - 2,
    tolerates: '2 discos',
    layout: [
      [d('A1'), d('A2'), p('Ap'), q('Aq')],
      [d('B1'), p('Bp'), q('Bq'), d('B2')],
      [p('Cp'), q('Cq'), d('C1'), d('C2')],
      [q('Dq'), d('D1'), d('D2'), p('Dp')],
    ],
    common: true,
  },
  {
    id: 'raid10',
    name: 'RAID 10 (1+0)',
    nickname: 'Espejos dentro de un striping',
    minDisks: 4,
    description:
      'Nivel anidado: primero se forman pares en espejo (RAID 1) y luego se hace striping (RAID 0) entre los pares. Con 4 discos: los discos 1-2 son espejo, 3-4 son espejo, y los datos se reparten entre ambos pares.',
    pros: 'Rendimiento de RAID 0 con la seguridad de RAID 1; reconstrucción rápida. Muy usado en bases de datos.',
    cons: 'Solo se aprovecha el 50 % de la capacidad.',
    usable: (n) => Math.floor(n / 2),
    tolerates: '1 por cada par espejo',
    layout: [
      [d('A1'), m('A1'), d('A2'), m('A2')],
      [d('B1'), m('B1'), d('B2'), m('B2')],
      [d('C1'), m('C1'), d('C2'), m('C2')],
    ],
    common: true,
  },
];

export const otrosNiveles = [
  { name: 'RAID 01 (0+1)', text: 'Al revés que RAID 10: dos grupos en striping que son espejo uno del otro. Si falla un disco de un grupo, ese grupo entero queda fuera, así que es menos tolerante que RAID 10.' },
  { name: 'RAID 50 (5+0)', text: 'Striping sobre varios grupos RAID 5. Mejora el rendimiento de escritura y tolera un disco por grupo. Mínimo 6 discos.' },
  { name: 'RAID 60 (6+0)', text: 'Striping sobre varios grupos RAID 6. Tolera dos discos por grupo; se usa en arreglos grandes. Mínimo 8 discos.' },
  { name: 'JBOD', text: '"Just a Bunch Of Disks": no es RAID. Concatena discos uno tras otro, sin paralelismo ni redundancia, como el DFS secuencial de la clase.' },
];
