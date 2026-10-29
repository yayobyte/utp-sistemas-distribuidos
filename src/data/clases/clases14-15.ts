import type { Clase } from './types';

export const clase14: Clase = {
  number: 14,
  date: '2026-10-22',
  tema: 'Arquitecturas',
  title: 'Ejercicio práctico: análisis de arquitectura (AstroSearch)',
  idea:
    'La parte práctica del parcial: descomponer un sistema en subsistemas, elegir la arquitectura de cada uno con su acoplamiento, justificar el modelo de cómputo, encontrar los puntos críticos de fallo y dibujar el diagrama.',
  keyTerms: ['Matriz de decisiones', 'Acoplamiento', 'Volunteer computing', 'Cluster', 'Punto crítico de fallo', 'Transparencia', 'Broker'],
  sections: [
    {
      heading: 'El escenario: AstroSearch',
      blocks: [
        {
          type: 'p',
          text: 'Una agencia espacial coordina una red que conecta **telescopios robotizados**, centros de análisis, universidades y miles de astrónomos aficionados. Combina un **clúster** en el centro de datos principal con **computación voluntaria** por internet.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Portal de investigadores', text: '10.000 astrónomos, login y registro de hallazgos. 15.000 peticiones concurrentes, transacciones ACID, respuesta < 200 ms.' },
            { title: 'Malla de alertas', text: 'Una supernova o un asteroide genera una alerta crítica para miles de observatorios y móviles en < 300 ms. El emisor **no conoce** a los receptores.' },
            { title: 'Búsqueda de exoplanetas', text: 'Petabytes de datos y sin presupuesto para un supercomputador: el análisis se parte en millones de paquetes para PCs de voluntarios.' },
            { title: 'Replicación de catálogos', text: 'Mapas celestes FITS de 30 a 100 GB. Descargarlos todos de un servidor central colapsaría el enlace.' },
          ],
        },
      ],
    },
    {
      heading: 'Matriz de decisiones arquitectónicas',
      blocks: [
        {
          type: 'table',
          headers: ['Subsistema', 'Arquitectura', 'Acopl. espacial', 'Acopl. temporal', 'Por qué'],
          rows: [
            ['Portal', '**Cliente-servidor**', 'Alto', 'Alto', 'El login y los hallazgos necesitan respuesta inmediata y transacciones ACID.'],
            ['Alertas', '**Editor-suscriptor**', 'Bajo', 'Bajo', 'Un emisor y muchos consumidores desconocidos, con un broker en el medio.'],
            ['Exoplanetas', '**Maestro-trabajador**', 'Alto', 'Bajo', 'El maestro conoce a sus nodos, pero un voluntario puede tardar segundos o un mes.'],
            ['Catálogos', '**P2P**', 'Flexible', 'Flexible', 'Los pares se pasan los archivos directamente, sin servidor central.'],
          ],
        },
        { type: 'diagram', id: 'cuadrante-acoplamiento' },
        {
          type: 'list',
          items: [
            'Para cada subsistema hay que justificar también **por qué se descartan las otras**.',
            'Alertas: no es cliente-servidor porque agregar un consumidor obligaría a tocar al emisor. No es maestro-trabajador porque no se **delegan tareas**, solo se notifica.',
            'Exoplanetas: no es editor-suscriptor porque el trabajador tiene que **devolver un resultado** (doble vía).',
            '**Push o pull**: la alerta es crítica pero se pide **asíncrona**. Es "crítica pero no urgente", así que pull también es defendible si se justifica.',
          ],
        },
        {
          type: 'callout',
          text: 'En volunteer computing, maestro-trabajador **no** está fuertemente acoplado en el tiempo: los nodos son volátiles y la tarea puede quedar pendiente hasta que el voluntario se conecte. En un clúster el acoplamiento sí sería alto.',
        },
      ],
    },
    {
      heading: 'Modelo de cómputo',
      blocks: [
        {
          type: 'list',
          items: [
            '**Volunteer computing** para los exoplanetas: no hay supercomputador ni un grid lo bastante grande, y se aprovecha cómputo ocioso que no se paga. A cambio, los nodos son volátiles y hay que respetar el tiempo de su dueño.',
            '**Clúster** para el portal, las alertas y la consolidación de datos: las restricciones de milisegundos exigen **baja latencia** y alto rendimiento.',
            'Es un sistema mixto: el clúster recoge, consolida y parte los datos, y los voluntarios procesan los paquetes y devuelven resultados.',
          ],
        },
      ],
    },
    {
      heading: 'Diagrama y puntos críticos de fallo',
      blocks: [
        { type: 'diagram', id: 'pubsub' },
        {
          type: 'table',
          headers: ['Punto crítico', 'Resiliencia', 'Transparencia'],
          rows: [
            ['Gestor de registro de eventos (15.000 peticiones)', 'Servidores replicados y base de datos replicada con hot swap', 'Ubicación, replicación, concurrencia'],
            ['Broker de alertas', '**Clúster de brokers** (más caro, pero resiliente)', 'Ubicación'],
            ['Maestro de exoplanetas', 'Réplica en **standby** y un reverse proxy delante', 'Replicación, migración'],
          ],
        },
        {
          type: 'p',
          text: '"¿Entonces la solución es clúster para todo?" Si hay plata, sí. Pero hay que analizar el escenario y justificar cada redundancia contra el presupuesto.',
        },
        {
          type: 'callout',
          text: '**Entregable:** la matriz, la evaluación del modelo de cómputo, los puntos críticos con su resiliencia y transparencia, un diagrama de bloques sencillo (Excalidraw, Paint, lo que sea) y un **video de 1 a 2 minutos** explicando las decisiones. Plazo: el domingo a medianoche.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué arquitectura usar si el emisor no conoce a los receptores?', a: 'Editor-suscriptor con un broker: bajo acoplamiento espacial y temporal.' },
    { q: '¿Por qué maestro-trabajador tiene bajo acoplamiento temporal en volunteer computing?', a: 'Los nodos son volátiles; la tarea queda pendiente hasta que el voluntario esté disponible, sin bloquear al maestro.' },
    { q: '¿Cómo se hace resiliente un broker?', a: 'Con un clúster de brokers, que aporta transparencia de ubicación a cambio de más costo.' },
  ],
};

export const clase15: Clase = {
  number: 15,
  date: '2026-10-27',
  tema: 'Comunicación',
  title: 'Paso de mensajes, marshalling y sockets',
  idea:
    'Sin memoria compartida, los nodos se comunican enviando mensajes. El reto es que el receptor entienda lo que llega: tamaños de tipos, orden de bytes (endianness) y serialización. El marshalling lo resuelve, y los sockets son la base de todo.',
  keyTerms: ['Send / receive', 'Endianness', 'Marshalling', 'XDR / CDR', 'JSON', 'Protocol Buffers', 'Bloqueante', 'Buffer', 'Socket'],
  sections: [
    {
      heading: 'Tres mecanismos de comunicación',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Paso de mensajes', text: 'Todo se empaqueta en un mensaje, como una carta en un sobre, y se envía a un destinatario.' },
            { title: 'Middleware', text: 'RPC, RMI, CORBA: se programa sin preocuparse de cómo llega el mensaje al destino.' },
            { title: 'Servicios web', text: 'El tercer mecanismo, que se verá más adelante.' },
          ],
        },
        {
          type: 'p',
          text: 'En un sistema centralizado, dos procesos comparten información con **memoria compartida** (y los hilos ya comparten la memoria del proceso). En un sistema distribuido un nodo no puede leer la memoria de otro, así que hay que **enviar mensajes** por un canal.',
        },
      ],
    },
    {
      heading: 'Paso de mensajes',
      blocks: [
        {
          type: 'table',
          headers: ['Modelo', 'Canal', 'Uso típico'],
          rows: [
            ['**1 a 1** (punto a punto)', 'Número de proceso o socket', 'Un emisor y un receptor, nada más'],
            ['**N a 1**', 'Un puerto publicado', 'Cliente-servidor, también en modelo de eventos'],
            ['**N a N**', '**Cola de mensajes**', 'Muchos emisores y muchos receptores'],
          ],
        },
        {
          type: 'list',
          items: [
            'Solo hay dos operaciones: **send** y **receive**.',
            'Comunicación **directa** (se sabe por dónde viaja el mensaje) o **indirecta** (no se sabe: desacoplamiento espacial).',
            '**Simétrica** (ida y vuelta) o **asimétrica** (solo envío). Los canales son unidireccionales o bidireccionales y cada uno tiene su capacidad.',
            '**Sincronización**: si uno envía, el otro tiene que estar en modo recepción. Si no, no hay comunicación.',
          ],
        },
      ],
    },
    {
      heading: 'Formato de representación',
      blocks: [
        {
          type: 'p',
          text: 'No todos los equipos ni lenguajes representan igual los datos. Un **char** ocupa 1 byte en C y 2 en Java. Si C envía 2 bytes y Java lee 4, se leen datos más basura. Emisor y receptor tienen que **acordar un formato**: tamaños, orden de bytes, codificación de texto y estructura del mensaje.',
        },
        {
          type: 'table',
          headers: ['Tipo', 'C', 'Java'],
          rows: [
            ['char', '1 byte', '2 bytes'],
            ['int', '2 bytes', '4 bytes'],
            ['long', '4 bytes', '8 bytes'],
          ],
        },
        {
          type: 'callout',
          text: '**Little endian vs. big endian**: el orden en que se guardan los bytes de un número. Un 5 que un PC x86 (little endian) envía a un equipo big endian (routers antiguos, PLCs, sensores) puede llegar como **83.886.080**: un sensor que marca 5° y se lee como 83 millones de grados. Los sistemas distribuidos son heterogéneos, así que no se puede asumir el orden.',
        },
        {
          type: 'p',
          text: 'Con las **estructuras** pasa lo mismo: hay que **serializarlas** (aplanarlas) con una cabecera, separadores y un fin de mensaje. Java con Java se entienden, pero Java con C# probablemente no.',
        },
      ],
    },
    {
      heading: 'Marshalling',
      blocks: [
        {
          type: 'p',
          text: '**Marshalling**: convertir la representación nativa a una **representación intermedia** que entiendan emisor y receptor. **Unmarshalling** es la operación contraria. Ejemplo: un objeto Java pasa a JSON, viaja y Python lo convierte en un diccionario.',
        },
        {
          type: 'list',
          items: [
            'El **texto** es mala idea para el rendimiento: un entero de 4 bytes puede ocupar 20 bytes como cadena, y más de 100 en XML con sus etiquetas. Por eso se pasó de **XML a JSON**, que es menos verboso.',
            'Con **sockets**, el marshalling es **responsabilidad del programador**.',
            'Con **MPI**, **RPC**, **RMI** o **CORBA**, el marshalling es **automático**.',
          ],
        },
        {
          type: 'table',
          headers: ['Formato', 'Tipo', 'Notas'],
          rows: [
            ['**XDR**', 'Binario, implícito', 'El de RPC; incluye tipos'],
            ['**CDR**', 'Binario, implícito', 'El de CORBA'],
            ['XML', 'Texto, explícito', 'Tipos con XML Schema; muy verboso'],
            ['**JSON**', 'Texto, explícito', 'Más ligero; tipos opcionales con JSON Schema'],
            ['**Protocol Buffers**', 'Binario', 'De Google; ambos lados conocen el esquema'],
            ['Otros', 'Binario', 'Java serialization (solo Java), ASN.1, Thrift, **Avro** (Kafka), **BSON** (MongoDB)'],
          ],
        },
        {
          type: 'callout',
          text: 'Mientras más estándar, mejor (sistemas abiertos). Se recomiendan **formatos binarios** si los dos lados los entienden. El texto gasta más ancho de banda y suma latencia por las conversiones.',
        },
      ],
    },
    {
      heading: 'Bloqueante o no bloqueante',
      blocks: [
        {
          type: 'list',
          items: [
            '**Bloqueante (síncrono)**: se envía y el emisor espera la respuesta. Para no esperar para siempre se usa un **timeout**; al vencer se descarta, se reintenta o se avisa.',
            '**No bloqueante (asíncrono)**: se envía y se sigue trabajando, con **esperas múltiples** independientes. La última petición puede responder primero.',
            'Mientras el receptor no lee, los mensajes quedan en una **cola de mensajes** o en un **buffer**: el "canasto" donde el sistema operativo deja lo que llega.',
          ],
        },
      ],
    },
    {
      heading: 'Sockets',
      blocks: [
        {
          type: 'p',
          text: 'Un **socket** es el mecanismo de comunicación más básico: todo lo demás (RPC, CORBA) termina siendo un flujo de bytes por un socket. El receptor abre un **puerto conocido** (por ejemplo 8080) y el emisor un **puerto dinámico** (por ejemplo 53.847). Se establece un canal bidireccional y por él viajan los send y receive.',
        },
        {
          type: 'table',
          headers: ['Arquitectura', 'Cómo se implementa con sockets'],
          rows: [
            ['Cliente-servidor', 'Sincronizado: si el cliente envía, el servidor recibe, y al revés.'],
            ['Editor-suscriptor (pull)', 'El broker funciona como un servidor; el suscriptor envía la suscripción y consulta eventos.'],
            ['Editor-suscriptor (push)', 'El suscriptor se suscribe una vez y deja el canal **abierto**. La conexión es permanente para no tener que relocalizarlo.'],
            ['P2P', '**Dos sockets** por nodo: uno de recepción (puerto conocido) y otro de envío (puerto dinámico), porque cada nodo es cliente y servidor a la vez.'],
          ],
        },
        {
          type: 'p',
          text: '**Avisos:** exposiciones en grupos de 5 (criptomonedas, microservicios/Spring Cloud, contenedores y Kubernetes, gRPC y Event Sourcing, DevOps/DevSecOps), cada una de hora y media y enfocada en sistemas distribuidos. Posible regreso presencial los martes (bloque 15). Las notas finales cierran el 5 de diciembre. La **comunicación a grupo** queda para la próxima clase.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Por qué en un sistema distribuido se usa paso de mensajes y no memoria compartida?', a: 'Porque un nodo no puede leer la memoria de otra máquina; hay que enviar los datos por un canal.' },
    { q: '¿Qué es el marshalling?', a: 'Convertir los datos de su representación nativa a una intermedia que entiendan emisor y receptor (y unmarshalling al revés).' },
    { q: 'Little endian vs. big endian', a: 'El orden en que se guardan los bytes de un número. Si emisor y receptor difieren, el valor llega distorsionado.' },
    { q: '¿Quién hace el marshalling con sockets y quién con RPC?', a: 'Con sockets, el programador; con RPC, RMI, CORBA o MPI, la herramienta, automáticamente.' },
    { q: '¿Cuántos sockets necesita un nodo P2P?', a: 'Dos: uno de recepción en un puerto conocido y otro de envío en un puerto dinámico.' },
  ],
};
