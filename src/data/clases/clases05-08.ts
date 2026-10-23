import type { Clase } from './types';

export const clase05: Clase = {
  number: 5,
  date: '2026-09-22',
  tema: 'Introducción',
  title: 'Repaso de los modelos y dudas frecuentes',
  idea:
    'Repaso en grupo de los nueve modelos y tres confusiones aclaradas: qué cuenta como SaaS, cuándo algo es ubicuo y no móvil, y la diferencia entre Edge y Fog.',
  keyTerms: ['SaaS', 'Multi-tenant', 'Ubiquitous vs. Mobile', 'Edge vs. Fog', 'CloudFront'],
  sections: [
    {
      heading: '¿Cualquier página web es SaaS?',
      blocks: [
        {
          type: 'p',
          text: 'Según el profesor, **cualquier software accesible por la red que le sirva a alguien es SaaS**, porque no es ni plataforma ni infraestructura. No hace falta que guardes tus datos ahí (Google Search, Spotify, chats de IA).',
        },
        {
          type: 'callout',
          text: '**Multi-tenant no es obligatorio.** Puedes tener un servidor por cliente (`cliente1.contable.com`) y sigue siendo SaaS, porque el proveedor gestiona todo. Una sola instalación es buena práctica (10 instalaciones = 10 problemas latentes), no un requisito.',
        },
        {
          type: 'p',
          text: 'En **PaaS** el proveedor decide qué puedes usar: si soporta Java 21 y tu app es Java 25, no se puede.',
        },
      ],
    },
    {
      heading: '¿Mobile o Ubiquitous?',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Mobile', text: '**Yo decido** usar mi dispositivo para una tarea.' },
            { title: 'Ubiquitous', text: 'El dispositivo **ya está haciendo** la tarea: smartwatch, sensor del baño, tag del peaje, compuertas de un embalse.' },
          ],
        },
        {
          type: 'p',
          text: 'La computación ubicua **no nació con IoT**: los sensores de fábrica ya lo eran. **IoT** solo indica que hoy esos dispositivos se conectan **directamente a internet**.',
        },
      ],
    },
    {
      heading: '¿Edge o Fog?',
      blocks: [
        { type: 'diagram', id: 'edge-fog-cloud' },
        {
          type: 'list',
          items: [
            'Nacieron porque la nube suele estar lejos (por ejemplo, en Virginia).',
            '**Edge**: en el mismo dispositivo o muy cerca (una Raspberry que cuenta carros y solo envía el total).',
            '**Fog**: una capa intermedia de nodos entre los dispositivos y la nube.',
            'Ejemplos: **AWS CloudFront** y los previews instantáneos de Netflix.',
          ],
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Un SaaS tiene que atender a todos los clientes con una sola instalación?', a: 'No. Es una buena práctica, no un requisito del modelo.' },
    { q: 'El tag de un peaje, ¿mobile o ubiquitous?', a: 'Ubiquitous: el dispositivo trabaja sin que un humano lo pida.' },
    { q: '¿Qué es AWS CloudFront?', a: 'Un ejemplo de edge/fog: acerca el contenido al usuario para bajar la latencia.' },
  ],
};

export const clase06: Clase = {
  number: 6,
  date: '2026-09-24',
  tema: 'Introducción',
  title: 'Los cinco objetivos de un sistema distribuido',
  idea:
    'Un buen sistema distribuido se evalúa con cinco objetivos: transparencia, rendimiento, capacidad de crecimiento, carácter abierto y fiabilidad. Ninguno se cumple al 100%, y el gran limitante suele ser el presupuesto.',
  keyTerms: ['Transparencia', 'Rendimiento', 'Escalabilidad', 'Carácter abierto', 'Fiabilidad', 'Cuello de botella', 'Punto único de fallo'],
  sections: [
    {
      heading: '1. Transparencia',
      blocks: [
        {
          type: 'table',
          headers: ['Transparencia de…', 'El usuario no nota…'],
          rows: [
            ['**Acceso**', 'Si el recurso es local o remoto (cómo llego)'],
            ['**Ubicación / posición**', 'Dónde está el recurso'],
            ['**Migración**', 'Que el servicio se movió de máquina'],
            ['**Concurrencia**', 'Que hay otros usuarios (Black Friday)'],
            ['**Replicación**', 'Que hay varias copias'],
            ['**Fallos**', 'Que algo falló'],
            ['**Crecimiento**', 'Que el sistema creció (1 o 100 instancias)'],
          ],
        },
        {
          type: 'callout',
          text: 'No siempre se quiere: **Java RMI** obliga a distinguir una llamada remota de una local, porque el programador debe ser consciente de la latencia y de la posibilidad de fallo.',
        },
      ],
    },
    {
      heading: '2. Rendimiento',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Multiusuario', text: 'Atender a muchos a la vez: si una máquina no da para 100, se reparten 50 y 50.' },
            { title: 'Ejecución paralela', text: 'Partir una tarea grande y procesar los pedazos en paralelo.' },
          ],
        },
        { type: 'p', text: 'Debe ser tan bueno como un sistema centralizado: Word en la nube debe permitir la misma productividad que Word instalado.' },
      ],
    },
    {
      heading: '3. Capacidad de crecimiento',
      blocks: [
        { type: 'diagram', id: 'cuello-vs-spof' },
        {
          type: 'list',
          items: [
            'Síntoma: **cuellos de botella**, es decir, componentes, tablas o algoritmos centralizados.',
            'Estrategias: **reparto** de datos, **replicación** y **procesar parte en el cliente**.',
            'Reglas: nadie tiene el estado completo, se decide con información local, el fallo de una máquina no invalida el algoritmo y **no hay reloj global**.',
          ],
        },
      ],
    },
    {
      heading: '4. Carácter abierto y 5. Fiabilidad',
      blocks: [
        {
          type: 'p',
          text: '**Abierto**: protocolos publicados y estándar, con alternativas para reemplazar componentes; esconde la heterogeneidad.',
        },
        {
          type: 'p',
          text: '**Fiable**: hacer las cosas bien aunque haya fallos. Hay que evitar los **puntos únicos de fallo**, mantener la **coherencia** entre réplicas (activa = guardar en todas a la vez; pasiva = guardar en una y luego sincronizar) y operar bien aunque la red se parta (que Netflix no te ponga la película de otro).',
        },
        {
          type: 'callout',
          text: '**Uber o inDrive**: excelente rendimiento, acceso desde cualquier lugar y muchas copias sin que lo notes. Cada sistema elige en qué objetivos ser más fuerte.',
        },
        { type: 'p', text: '**Taller 2:** ejemplos reales de cada modelo de computación.' },
      ],
    },
  ],
  repaso: [
    { q: '¿Diferencia entre transparencia de acceso y de posición?', a: 'Acceso = cómo llego (igual local o remoto). Posición = dónde está el recurso.' },
    { q: 'Cuello de botella vs. punto único de fallo', a: 'El cuello de botella limita el crecimiento; el punto único de fallo tumba todo si cae.' },
    { q: 'Tres estrategias de crecimiento', a: 'Reparto de datos, replicación y procesamiento en el cliente.' },
  ],
};

export const clase07: Clase = {
  number: 7,
  date: '2026-09-29',
  tema: 'Arquitecturas',
  title: 'Arquitecturas y acoplamiento',
  idea:
    'La arquitectura es la organización lógica de los componentes: qué hay, qué rol cumple cada uno y cómo interactúan. Es lógica, no física. El concepto clave de la clase es el acoplamiento.',
  keyTerms: ['Organización lógica', 'Acoplamiento espacial', 'Acoplamiento temporal', 'Push', 'Maestro-Trabajador', 'Punto crítico de fallo'],
  sections: [
    {
      heading: 'El arquitecto diseña, no construye',
      blocks: [
        {
          type: 'p',
          text: 'Como en arquitectura civil: el arquitecto define **qué** se construye y cómo se relacionan los espacios (casa vs. apartamento), sobre **patrones** ya conocidos. El ingeniero lo lleva a la realidad.',
        },
      ],
    },
    {
      heading: 'Acoplamiento',
      blocks: [
        { type: 'diagram', id: 'cuadrante-acoplamiento' },
        {
          type: 'table',
          headers: ['Ejemplo', 'Espacial (dónde)', 'Temporal (cuándo)'],
          rows: [
            ['Llamada telefónica', 'Acoplado', 'Acoplado'],
            ['Mensaje de voz', 'Acoplado', 'Desacoplado'],
            ['Carta postal', 'Acoplado', 'Desacoplado'],
            ['Transmisión en vivo', 'Desacoplado', 'Acoplado'],
            ['Tablón / Classroom', 'Desacoplado', 'Desacoplado'],
          ],
        },
        {
          type: 'callout',
          text: 'Más acoplado = respuesta inmediata y rendimiento, pero si falla uno falla todo. Menos acoplado = tolerancia a fallos, pero más latencia. **Para sistemas distribuidos, lo ideal es desacoplado.**',
        },
      ],
    },
    {
      heading: 'Las 4 arquitecturas del curso',
      blocks: [
        {
          type: 'table',
          headers: ['Arquitectura', 'Aplica a'],
          rows: [
            ['**Maestro-Trabajador**', 'Solo sistemas distribuidos'],
            ['**Cliente-Servidor**', 'Centralizados y distribuidos'],
            ['**Editor-Suscriptor**', 'Ambos'],
            ['**Peer-to-Peer**', 'Ambos'],
          ],
        },
        { type: 'p', text: 'No hay plantilla universal. Un monolito no es mala práctica: microservicios por defecto es sobreingeniería.' },
      ],
    },
    {
      heading: 'Maestro-Trabajador',
      blocks: [
        { type: 'diagram', id: 'maestro-trabajador' },
        {
          type: 'list',
          items: [
            'El maestro recibe **todas** las tareas, las reparte, encola el exceso y consolida los resultados.',
            'Los trabajadores se dedican al 100% y avisan al terminar; nunca hablan entre sí ni con el usuario.',
            '**Acoplado en espacio y tiempo.** Si cae un trabajador, se redistribuye. Si cae el maestro, cae todo: es un **punto crítico de fallo**, no un cuello de botella.',
            'Soluciones: **maestro de respaldo** (que cuesta sin trabajar) o **algoritmo de elección**.',
          ],
        },
      ],
    },
  ],
  repaso: [
    { q: 'Push notifications: ¿qué tipo de acoplamiento?', a: 'Desacoplado en espacio (no sé dónde estás), acoplado en tiempo (te llega al instante).' },
    { q: '¿El maestro es cuello de botella?', a: 'No; lo limita la cantidad de trabajadores. Sí es punto crítico de fallo.' },
    { q: '¿Qué arquitectura es exclusiva de sistemas distribuidos?', a: 'Maestro-Trabajador.' },
  ],
};

export const clase08: Clase = {
  number: 8,
  date: '2026-10-01',
  tema: 'Arquitecturas',
  title: 'Cliente-Servidor y el grosor del cliente',
  idea:
    'Un cliente activo pide y un servidor pasivo responde. Es simple, pero tiene tres problemas: el servidor es cuello de botella y punto crítico de fallo, y los recursos del cliente se desperdician. La primera solución es repartir funciones con el cliente.',
  keyTerms: ['Cliente activo', 'Servidor pasivo', 'Cliente ligero', 'Cliente pesado', 'SPA / PWA'],
  sections: [
    {
      heading: 'Roles y problemas',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Cliente (activo)', text: 'Necesita algo y lo pide. Debe saber **qué servicios** ofrece cada servidor.' },
            { title: 'Servidor (pasivo)', text: 'Espera, procesa, responde y vuelve a esperar. Nunca inicia nada.' },
          ],
        },
        {
          type: 'table',
          headers: ['Problema', 'Por qué'],
          rows: [
            ['Cuello de botella', 'Toda la lógica está en el servidor; su velocidad decide cuántos usuarios se atienden'],
            ['Punto crítico de fallo', 'Si cae el servidor, cae todo'],
            ['Recursos del cliente desperdiciados', 'El PC solo captura, envía y muestra (ej.: login)'],
          ],
        },
        { type: 'p', text: 'Es **acoplado en espacio y en tiempo**: buen rendimiento, mala tolerancia a fallos.' },
      ],
    },
    {
      heading: 'Cliente ligero vs. pesado',
      blocks: [
        { type: 'diagram', id: 'grosor-cliente', caption: 'Dónde cae el corte entre cliente y servidor en una app de tres capas.' },
        {
          type: 'table',
          headers: ['', 'Ligero', 'Pesado'],
          rows: [
            ['Hace', 'Muestra y captura', 'Valida, calcula (total, IVA) e incluso guarda'],
            ['Ventajas', '**Mantenimiento barato** y **más seguro**', 'Menos carga en el servidor, más autonomía, mejor escalabilidad'],
            ['Desventajas', 'El servidor hace todo', 'Actualizar equipo por equipo; cada cliente es un foco de inseguridad'],
          ],
        },
        {
          type: 'list',
          items: [
            'Ejemplos: web clásica en PHP (ligero), SPA, Next.js (mixto), app de escritorio con BD remota, juegos online y apps con modo desconectado (pesado).',
            'La web ha ido y vuelto: SSR → SPA → SSR otra vez.',
          ],
        },
        { type: 'p', text: 'Próximas variantes: con **proxy**, con **caché**, con varios servidores (alta disponibilidad) y con **código móvil**.' },
      ],
    },
  ],
  repaso: [
    { q: '¿Cuál es el elemento activo en cliente-servidor?', a: 'El cliente.' },
    { q: 'Ventajas de un cliente ligero', a: 'Menor costo de mantenimiento (actualizas el servidor una vez) y mejor seguridad.' },
    { q: 'Los tres problemas de cliente-servidor', a: 'Cuello de botella, punto crítico de fallo y recursos del cliente desperdiciados.' },
  ],
};
