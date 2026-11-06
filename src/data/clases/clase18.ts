import type { Clase } from './types';

export const clase18: Clase = {
  number: 18,
  date: '2026-11-05',
  tema: 'Almacenamiento',
  title: 'Sistemas de archivos distribuidos y paralelos',
  idea:
    'Cómo usar los discos de muchas máquinas. Primero, dónde vive el almacenamiento (DAS, NAS o SAN). Luego, dos formas de gestionarlo: un sistema de archivos distribuido (DFS), que emula un único disco centralizado y lee de forma secuencial, o uno paralelo, que parte cada archivo entre varios discos para ganar velocidad y usa réplicas o paridad para tolerar fallos.',
  keyTerms: ['Sistema de archivos', 'DAS', 'NAS', 'SAN', 'DFS', 'Espacio de nombres único', 'Semántica Unix / de sesión', 'Archivos inmutables', 'Write-through / write-back', 'Striping', 'Mirroring', 'Paridad', 'Failover', 'Quórum'],
  sections: [
    {
      heading: 'Tres tipos de almacenamiento',
      blocks: [
        {
          type: 'p',
          text: 'Un **sistema de archivos** es el software que administra un disco (FAT, NTFS). El sistema operativo solo gestiona los discos de su propia máquina; en un sistema distribuido hace falta otra capa. Antes hay que saber **dónde** está el almacenamiento.',
        },
        {
          type: 'table',
          headers: ['', 'DAS', 'NAS', 'SAN'],
          rows: [
            ['Nombre', 'Direct Attached Storage', 'Network Attached Storage', 'Storage Area Network'],
            ['Qué es', 'Discos conectados **directo** a cada nodo (SSD, HDD, cintas, USB)', 'Un **nodo dedicado** a discos, accesible por la LAN', 'Una **red aparte**, solo para almacenamiento, con muchos discos'],
            ['Conexión', 'Bus interno del equipo', 'Ethernet (LAN, no WAN)', 'Generalmente **fibra**; cada servidor necesita dos tarjetas'],
            ['Escala', 'Limitada por los puertos del equipo', 'Decenas o cientos de TB', 'PB y más; archivos de cientos de GB'],
            ['Ejemplo', 'Servidor web de archivos estáticos, **Samba**, carpeta compartida de Windows', 'Un "Dropbox" casero para la empresa o la casa', 'Google, Netflix, virtualización a gran escala'],
          ],
        },
        {
          type: 'callout',
          text: '**¿Samba es NAS?** No: es **DAS**. Publica carpetas locales de una máquina concreta y hay que decirle a cuál ir. En una NAS todo el nodo está compartido, y en una SAN son muchos nodos de discos. Regla práctica: poco volumen, NAS; gran escala, SAN; sin presupuesto, DAS.',
        },
      ],
    },
    {
      heading: 'Sistema de archivos distribuido (DFS)',
      blocks: [
        {
          type: 'p',
          text: 'Lo más común es aprovechar los discos **DAS** de cada nodo. Un **DFS** (Distributed File System) es software que junta esos discos y los muestra como **un solo sistema de archivos**: 100 nodos con 1 TB se ven como unos 100 TB. Con NAS o SAN no hace falta, porque ahí el almacenamiento ya está centralizado.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Transparencia', text: 'De **acceso** (desde cualquier equipo), de **ubicación** (no sé en qué nodo está) y de **réplica** (no sé cuántas copias hay).' },
            { title: 'Tolerancia a fallos', text: 'Si un nodo falla, el sistema sigue operando.' },
            { title: 'Rendimiento y escalabilidad', text: 'Agregar nodos para crecer.' },
            { title: 'Espacio de nombres único', text: 'Como en Linux: no hay C:, D:, solo `/`, `/home`, `/boot` montados en un mismo árbol aunque sean discos distintos.' },
          ],
        },
        {
          type: 'list',
          items: [
            '**Limitación:** no hay paralelismo. Un archivo es como una lista enlazada de bloques, así que se lee y se escribe de forma **secuencial**: se llena un disco y se pasa al siguiente.',
            'Arquitectura **cliente-servidor**, y se comunica por **RPC**.',
            '**Cliente ligero** (lo tradicional): el cliente es una pasarela que reenvía `open`, `read`, `write`, `close` al servidor, que sabe dónde está cada archivo, sus permisos y quién lo tiene abierto.',
            '**Cliente pesado**: el cliente lleva la gestión (archivos abiertos, ubicación, permisos) y el servidor solo lee y escribe bloques. Escala mejor, pero cada actualización hay que llevarla a todos los clientes.',
            '**Módulos:** servicio de **archivos** (leer, escribir, crear, borrar), servicio de **directorios** (traduce el nombre del archivo a su ubicación física) y **módulo cliente** (recibe las llamadas de las aplicaciones).',
          ],
        },
      ],
    },
    {
      heading: 'Semánticas de uso concurrente',
      blocks: [
        {
          type: 'p',
          text: '¿Qué ve cada proceso cuando varios usan el mismo archivo a la vez? Depende de la semántica que se configure.',
        },
        {
          type: 'table',
          headers: ['Semántica', 'Cómo funciona', 'A favor / en contra'],
          rows: [
            ['**Unix**', 'Todos trabajan sobre el archivo **original**; una escritura se ve **al instante** en todos los lectores', 'Siempre actualizado, pero cada cambio va directo al disco y consume mucho ancho de banda'],
            ['**De sesión**', 'Cada uno trabaja en una **copia local**; los cambios llegan al original solo al **cerrar o guardar**', 'Se puede deshacer sin tocar el original; los demás ven la versión vieja mientras tanto'],
            ['**Archivos inmutables**', 'Se crean, se escriben una vez y quedan de **solo lectura**; para cambiar algo hay que crear un archivo nuevo', 'Ideal para reportes e históricos que no deben alterarse'],
            ['**Transacciones atómicas**', 'Todo o nada: se envía el **estado final** del bloque, no la lista de operaciones', 'CODA usa una versión no tan estricta de esta semántica'],
          ],
        },
      ],
    },
    {
      heading: 'Caché y replicación en el DFS',
      blocks: [
        {
          type: 'p',
          text: 'La **caché** es una copia del archivo (o de un bloque) del lado del cliente para leer y escribir más rápido. El problema es saber si esa copia sigue vigente.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Escritura inmediata (write-through)', text: 'Al guardar, se **actualizan** las cachés de todos los nodos que tienen el archivo. Siempre leen datos frescos, pero genera mucho tráfico. Equivale a la **replicación activa**. "Somos impacientes".' },
            { title: 'Escritura diferida', text: 'Al guardar, solo se **invalidan** las otras copias; cada nodo vuelve a cargar cuando de verdad lo necesita. Menos tráfico, más eficiente. "Somos precavidos".' },
          ],
        },
        {
          type: 'list',
          items: [
            'Un DFS puede guardar varias copias en distintos nodos y centros de datos, con un esquema **maestro-trabajador**: las escrituras van al nodo **primario**, que las replica.',
            'Si el primario cae, hay **failover**: se elige un nuevo primario, que ya estaba actualizado.',
            'La elección es por **votación** y necesita **mitad más uno** (quórum). Con 5 nodos hacen falta 3; si caen 3, no se puede elegir y el sistema se detiene.',
          ],
        },
      ],
    },
    {
      heading: 'Sistemas de archivos paralelos',
      blocks: [
        {
          type: 'p',
          text: 'Aquí sí se usan **varios discos a la vez**. El archivo se parte en bloques y cada bloque va a un disco distinto, así que lectura y escritura ocurren en paralelo. Se usa sobre todo con NAS y SAN, y quita el cuello de botella de leer un nodo tras otro.',
        },
        {
          type: 'table',
          headers: ['Técnica', 'Cómo funciona', 'Capacidad útil (4 × 1 TB)', 'Si falla un disco'],
          rows: [
            ['**Striping**', 'Parte el archivo en tantos bloques como discos: 1 MB en 4 discos son 4 × 256 KB escritos a la vez', '**4 TB (100 %)**', 'Se pierde el archivo completo; no hay cómo recuperar el bloque'],
            ['**Mirroring** (réplica)', 'Cada bloque se guarda también en otro disco: discos espejo, o copias repartidas entre los mismos discos', '**2 TB (50 %)**', 'Se lee la copia; luego se cambia el disco y se **reconstruye** copiando'],
            ['**Códigos correctores** (paridad)', 'Con los bloques de datos se calcula un bloque de **paridad** que permite reconstruir el que falte', 'Unos **3 TB (66–75 %)**', 'Modo **degradado**: lee más lento porque reconstruye al vuelo'],
          ],
        },
        {
          type: 'list',
          items: [
            '**Paridad en un disco dedicado**: si se pierden ese disco y otro, ya no hay con qué reconstruir. Por eso se **rota** la paridad entre todos los discos.',
            'Con paridad rotada se tolera **un** disco caído. Para tolerar **dos**, se usan **dos bloques de paridad**: por ejemplo 6 discos, 4 de datos, aprovechando el 66 %.',
            'Replicar todo para cubrir dos fallos desperdiciaría más espacio: haría falta el doble de discos.',
            'En DAS esto lo hace software; en NAS y SAN normalmente lo hace **hardware** (arreglos **RAID**), que presenta un disco virtual con la capacidad sumada.',
          ],
        },
        {
          type: 'table',
          headers: ['', 'Distribuido (DFS)', 'Paralelo'],
          rows: [
            ['Objetivo', '**Emular** un sistema de archivos centralizado', '**Rendimiento**: más rápido y eficiente'],
            ['Escalabilidad', 'Limitada por el almacenamiento de cada servidor', 'Más nodos, más velocidad'],
            ['Un archivo', 'Generalmente completo en un solo disco o nodo', 'Partido en bloques entre todos los discos'],
            ['Tolerancia a fallos', 'Depende de la **replicación**', 'Réplica de fragmentos o **códigos correctores**'],
          ],
        },
        {
          type: 'callout',
          text: '**Avisos:** dos talleres cortos (sistemas de archivos distribuidos y paralelos existentes, más una investigación sobre **arreglos RAID**) para el próximo jueves. RAID se retoma en la próxima clase, junto con **servicios de nombres**. Las exposiciones empiezan en 8 días, duran **hora y media** (ni más ni menos) y empieza el grupo de criptomonedas. La última clase sería el 3 de diciembre, con posible evaluación del segundo parcial (comunicación, sistemas de archivos y servicios de nombres).',
        },
      ],
    },
  ],
  repaso: [
    { q: 'DAS, NAS y SAN en una frase cada uno', a: 'DAS: discos pegados al nodo. NAS: un nodo de discos accesible por la LAN. SAN: una red dedicada solo al almacenamiento, normalmente por fibra.' },
    { q: '¿Por qué Samba es DAS y no NAS?', a: 'Porque publica carpetas locales de una máquina específica; no es un nodo dedicado de almacenamiento.' },
    { q: '¿Qué busca un DFS y cuál es su limitación?', a: 'Mostrar los discos de todos los nodos como un único sistema de archivos con un solo espacio de nombres. No tiene paralelismo: lee y escribe de forma secuencial.' },
    { q: 'Semántica Unix vs. de sesión', a: 'Unix: todos sobre el original y los cambios se ven al instante. Sesión: cada uno en una copia local y los cambios llegan al cerrar o guardar.' },
    { q: 'Escritura inmediata vs. diferida en la caché', a: 'Inmediata: actualiza todas las cachés al guardar (mucho tráfico). Diferida: solo las invalida y cada nodo recarga cuando lo necesita.' },
    { q: 'Con 4 discos de 1 TB, ¿cuánto se aprovecha con striping, mirroring y paridad?', a: '4 TB, 2 TB y unos 3 TB. Striping no tolera ninguna falla; mirroring y paridad sí.' },
    { q: 'Con 5 nodos replicados, ¿cuántos deben seguir vivos para elegir un nuevo primario?', a: 'Tres: la mitad más uno.' },
  ],
};
