import type { ModeloComputacion } from './taller2.data.d';

// Reuses the Taller 2 shape. Matrix fields map to: enfoque = idea central, red = roles,
// dominio = comunicación, metrica = punto débil.
export const matrixColumns = [
  'Arquitectura',
  'Idea Central',
  'Acoplamiento (espacial / temporal)',
  'Roles',
  'Comunicación',
  'Punto Débil',
];

export const arquitecturasData: ModeloComputacion[] = [
  {
    id: 'maestro-trabajador',
    name: 'Maestro / Trabajador',
    shortName: 'Maestro / Trabajador',
    examples: [
      {
        name: 'Apache Spark',
        url: 'https://spark.apache.org/docs/latest/cluster-overview.html',
        description:
          'Spark es un motor de procesamiento de grandes volúmenes de datos. Cada aplicación tiene un proceso driver (maestro) que divide el trabajo en tasks y las reparte entre los executors (trabajadores) de los nodos del clúster. Los executors procesan su partición de los datos y devuelven los resultados al driver, que los consolida. Si un executor falla, el driver vuelve a asignar sus tareas a otro nodo. El acoplamiento espacial es alto: el driver conoce y coordina a cada executor.',
      },
      {
        name: 'Jenkins (builds distribuidos)',
        url: 'https://www.jenkins.io/doc/book/scaling/architecting-for-scale/',
        description:
          'Jenkins es un servidor de integración continua. En su arquitectura distribuida, el controller (maestro) mantiene la cola de trabajos, decide qué build corre en qué máquina y recoge los resultados. Los agents (trabajadores), que pueden ser Linux, Windows, macOS o contenedores, solo ejecutan las compilaciones y pruebas que se les asignan y reportan el resultado. Así se escala horizontalmente: para más capacidad se agregan más agentes, sin cargar al controller con la ejecución.',
      },
    ],
    matrix: {
      enfoque: 'Dividir un trabajo grande en tareas y repartirlas',
      acoplamiento: 'Alto / alto',
      red: 'Maestro que divide y consolida; trabajadores que ejecutan',
      dominio: 'Bidireccional: tareas de ida, resultados de vuelta',
      metrica: 'El maestro es punto único de fallo',
    },
  },
  {
    id: 'cliente-servidor',
    name: 'Cliente / Servidor',
    shortName: 'Cliente / Servidor',
    examples: [
      {
        name: 'PostgreSQL',
        url: 'https://www.postgresql.org/docs/current/tutorial-arch.html',
        description:
          'PostgreSQL usa un modelo cliente-servidor. El servidor (proceso postgres) administra los archivos de la base de datos, acepta conexiones y ejecuta las consultas. Las aplicaciones cliente (psql, herramientas gráficas, aplicaciones web) envían peticiones SQL por la red y esperan la respuesta. El servidor crea un proceso por cada conexión, así que atiende varios clientes de forma concurrente. El acoplamiento es alto en espacio y tiempo: el cliente debe conocer el host y el puerto, y el servidor debe estar activo para responder.',
      },
      {
        name: 'Servidor dedicado de Minecraft',
        url: 'https://minecraft.wiki/w/Server',
        description:
          'En el modo multijugador de Minecraft, un servidor central mantiene el estado oficial del mundo: bloques, jugadores, inventarios y reglas. Cada jugador usa un cliente que se conecta por su dirección IP y puerto (por defecto 25565), envía sus acciones y recibe las actualizaciones del mundo. El servidor valida todo para que ningún cliente pueda alterar el juego de los demás. Muestra las ventajas del modelo (control y consistencia centralizados) y su límite: si el servidor cae, todos los jugadores se desconectan.',
      },
    ],
    matrix: {
      enfoque: 'Un servidor central atiende peticiones de muchos clientes',
      acoplamiento: 'Alto / alto',
      red: 'Cliente que pide; servidor que procesa y responde',
      dominio: 'Petición-respuesta síncrona',
      metrica: 'Cuello de botella y punto único de fallo',
    },
  },
  {
    id: 'editor-suscriptor',
    name: 'Editor / Subscriptor',
    shortName: 'Editor / Subscriptor',
    examples: [
      {
        name: 'Amazon SNS (Simple Notification Service)',
        url: 'https://docs.aws.amazon.com/sns/latest/dg/welcome.html',
        description:
          'Amazon SNS es un servicio de mensajería pub/sub. Los editores publican mensajes en un topic sin saber quién los va a recibir. SNS, que actúa como intermediario (broker), los entrega por push a todos los suscriptores de ese topic: colas SQS, funciones Lambda, endpoints HTTP, correos o notificaciones móviles. El editor y los suscriptores están desacoplados en espacio y tiempo, así que se pueden agregar consumidores nuevos sin cambiar al editor.',
      },
      {
        name: 'Apache Pulsar',
        url: 'https://pulsar.apache.org/docs/next/concepts-messaging/',
        description:
          'Pulsar es una plataforma de mensajería distribuida creada en Yahoo para unir servicios como Yahoo Mail y Yahoo Finance. Los productores publican en topics y los consumidores se suscriben a ellos. Un clúster de brokers recibe y distribuye los mensajes, y los guarda de forma persistente (en Apache BookKeeper) para que un suscriptor desconectado los reciba al volver. Ofrece varios tipos de suscripción (exclusiva, compartida, failover) y replicación entre regiones, así que el broker no es un punto único de fallo.',
      },
    ],
    matrix: {
      enfoque: 'Difundir eventos a quien esté interesado',
      acoplamiento: 'Bajo / bajo',
      red: 'Editor que publica; broker que distribuye; suscriptores que reciben',
      dominio: 'Asíncrona, push o pull, por topics',
      metrica: 'El broker, si no se replica',
    },
  },
  {
    id: 'peer-to-peer',
    name: 'Peer to Peer (P2P)',
    shortName: 'Peer to Peer',
    examples: [
      {
        name: 'BitTorrent',
        url: 'https://www.bittorrent.org/beps/bep_0003.html',
        description:
          'BitTorrent es un protocolo P2P para distribuir archivos grandes. El archivo se divide en piezas y cada par (peer) descarga piezas de otros pares mientras sube las que ya tiene, así que todos son cliente y servidor a la vez. Un tracker (o la DHT en la versión sin tracker) solo indica qué pares tienen el archivo; los datos viajan directamente entre pares. Mientras más usuarios descargan, más capacidad tiene la red, al revés que un servidor central que se satura.',
      },
      {
        name: 'IPFS (InterPlanetary File System)',
        url: 'https://docs.ipfs.tech/concepts/how-ipfs-works/',
        description:
          'IPFS es un sistema de archivos distribuido P2P. Cada archivo se identifica por su contenido (un hash llamado CID), no por el servidor donde está. Para obtenerlo, el nodo busca en una DHT distribuida qué pares lo tienen y lo descarga directamente de uno o varios de ellos, verificando con el hash que no fue alterado. No hay un servidor central: cualquier nodo puede almacenar y compartir contenido, y el contenido sigue disponible mientras algún par lo tenga.',
      },
    ],
    matrix: {
      enfoque: 'Compartir recursos directamente entre iguales',
      acoplamiento: 'Flexible / flexible',
      red: 'Cada par es cliente y servidor a la vez',
      dominio: 'Directa entre pares; tracker o DHT para localizar',
      metrica: 'Difícil garantizar consistencia y control central',
    },
  },
];
