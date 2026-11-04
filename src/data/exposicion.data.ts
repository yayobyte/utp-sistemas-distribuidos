import type { Member, Slide } from './exposicion.data.d';

export const exposicionInfo = {
  title: 'Microservicios y Spring Cloud',
  group: 'Grupo C',
  course: 'Sistemas Distribuidos · IS893',
};

export const members: Member[] = [
  { name: 'Cristian Gutiérrez' },
  { name: 'Juan Felipe Lozano' },
  { name: 'Abraham Kaleth Mahecha Corrales' },
];

export const slides: Slide[] = [
  // ── Introducción ───────────────────────────────────────────────
  {
    id: 'portada',
    section: 'Introducción',
    title: 'Microservicios y Spring Cloud',
    scene: 'orbit',
    content: { kind: 'title', subtitle: 'Cómo partir un sistema en servicios pequeños y hacer que funcionen como uno solo' },
    notes: 'Saludo y presentación del tema. Cada nodo que orbita es un servicio; el centro es el gateway. Al final de la exposición este dibujo se entenderá completo.',
  },
  {
    id: 'equipo',
    section: 'Introducción',
    title: 'Grupo C',
    scene: 'orbit',
    content: { kind: 'team' },
    notes: 'Cada integrante se presenta y dice qué parte va a exponer.',
  },
  {
    id: 'agenda',
    section: 'Introducción',
    title: 'Agenda',
    scene: 'orbit',
    content: {
      kind: 'cards',
      items: [
        { tag: '01', title: 'Del monolito a microservicios', text: 'El problema y la idea.' },
        { tag: '02', title: 'Conexión con el curso', text: 'Arquitecturas, acoplamiento, escalamiento y transparencias.' },
        { tag: '03', title: 'Comunicación', text: 'Síncrona, colas, tópicos y Kafka.' },
        { tag: '04', title: 'Spring Cloud', text: 'Config, Eureka, Gateway y OpenFeign.' },
        { tag: '05', title: 'Resiliencia y cierre', text: 'Circuit breaker, tracing, recorrido completo y preguntas.' },
      ],
    },
    notes: 'Recorrer la agenda rápido. Recalcar que casi todo lo que vamos a mostrar ya lo vimos en clase con otro nombre.',
  },

  // ── 1. Del monolito a microservicios ───────────────────────────
  {
    id: 'monolito',
    section: 'Del monolito a microservicios',
    title: 'El monolito',
    scene: 'monolith',
    content: {
      kind: 'bullets',
      items: [
        'Toda la aplicación (usuarios, pedidos, pagos, inventario) en **un solo ejecutable** y una sola base de datos.',
        'Fácil de empezar: un despliegue, una transacción ACID, llamadas locales.',
        'Al crecer: un cambio pequeño obliga a **desplegar todo**; un error de memoria tumba **todo**.',
        'Solo escala **verticalmente** o copiando el bloque entero, aunque solo "pagos" esté saturado.',
        'Un solo equipo, una sola tecnología: difícil que 50 desarrolladores trabajen a la vez.',
      ],
    },
    notes: 'El bloque grande es el monolito. Preguntar a la clase: ¿qué tipo de punto único de fallo es esto? (Clase 10: el monolito entero es un SPOF).',
  },
  {
    id: 'que-es',
    section: 'Del monolito a microservicios',
    title: '¿Qué es un microservicio?',
    scene: 'shatter',
    content: {
      kind: 'cards',
      items: [
        { title: 'Una capacidad de negocio', text: 'Pedidos, pagos, inventario: cada uno es un servicio pequeño con una sola responsabilidad.' },
        { title: 'Su propia base de datos', text: 'Nadie más toca sus tablas; se habla con él solo por su API.' },
        { title: 'Despliegue independiente', text: 'Se actualiza, escala o reinicia sin tocar a los demás.' },
        { title: 'Equipos autónomos', text: 'Cada equipo elige su lenguaje y su ritmo (ley de Conway).' },
      ],
    },
    notes: 'El monolito se rompe en cubos: cada cubo es un proceso independiente que corre en su propio nodo. Ahora el sistema SÍ es distribuido, con todos los problemas del curso.',
  },
  {
    id: 'soa',
    section: 'Del monolito a microservicios',
    title: 'De SOA a microservicios',
    scene: 'shatter',
    content: {
      kind: 'compare',
      left: {
        title: 'SOA (años 2000)',
        items: ['Servicios grandes y compartidos', 'Bus central (**ESB**) con mucha lógica', 'SOAP/XML', 'Base de datos compartida'],
      },
      right: {
        title: 'Microservicios',
        items: ['Servicios pequeños y autónomos', '"Smart endpoints, dumb pipes"', 'REST/JSON, gRPC, eventos', 'Una base de datos por servicio'],
      },
    },
    notes: 'En la clase 16 el profe mencionó que las colas de mensajes impulsaron SOA. Microservicios toma esa idea pero quita el bus central inteligente, que era un cuello de botella.',
  },

  // ── 2. Conexión con el curso ───────────────────────────────────
  {
    id: 'arquitecturas',
    section: 'Conexión con el curso',
    title: 'Las arquitecturas que ya vimos',
    scene: 'orbit',
    content: {
      kind: 'cards',
      items: [
        { tag: 'Clase 9', title: 'Cliente-servidor', text: 'Cada llamada REST entre servicios es cliente-servidor: alto acoplamiento espacial y temporal.' },
        { tag: 'Clase 13', title: 'Editor-suscriptor', text: 'Los eventos ("pedido creado") se publican a un broker y los consume quien quiera.' },
        { tag: 'Clase 11', title: 'Proxy inverso', text: 'El API Gateway es un proxy inverso delante de todos los servicios.' },
        { tag: 'Clase 12', title: 'Binder', text: 'El registro de servicios (Eureka) es el binder: dice dónde vive cada servicio.' },
      ],
    },
    notes: 'Mensaje clave: microservicios no es una arquitectura nueva, es una COMBINACIÓN de las que vimos. Señalar el gateway al centro y los servicios alrededor.',
  },
  {
    id: 'acoplamiento',
    section: 'Conexión con el curso',
    title: 'Acoplamiento',
    scene: 'sync',
    content: {
      kind: 'compare',
      left: {
        title: 'Llamada directa (REST)',
        items: ['Acoplamiento espacial **alto**: conozco la dirección', 'Acoplamiento temporal **alto**: el otro debe estar vivo', 'Respuesta inmediata', 'Una caída se propaga en cadena'],
      },
      right: {
        title: 'Evento por broker',
        items: ['Acoplamiento espacial **bajo**: no sé quién consume', 'Acoplamiento temporal **bajo**: el broker guarda', 'Consistencia **eventual**', 'Agregar consumidores no toca al emisor'],
      },
    },
    notes: 'Volver al cuadrante de acoplamiento de la clase 14 (AstroSearch). La regla práctica: comandos que necesitan respuesta → síncrono; hechos que ya pasaron → eventos.',
  },
  {
    id: 'escalar',
    section: 'Conexión con el curso',
    title: 'Escalar solo lo que se necesita',
    scene: 'scale',
    content: {
      kind: 'bullets',
      items: [
        '**Scale-out** por servicio: si en Black Friday solo "pedidos" está saturado, se agregan réplicas solo de pedidos.',
        'Un **balanceador** reparte las peticiones entre las réplicas (round robin, menor carga).',
        'Las réplicas deben ser **sin estado** (stateless): la sesión va a Redis o a un token JWT.',
        'Es la replicación activa de la clase 12, pero aplicada a un solo servicio.',
      ],
    },
    notes: 'En la escena aparecen 3 réplicas de pedidos detrás del balanceador. Comparar con escalar el monolito entero: se paga RAM para usuarios e inventario aunque no la necesiten.',
  },
  {
    id: 'transparencias',
    section: 'Conexión con el curso',
    title: 'Transparencias',
    scene: 'scale',
    content: {
      kind: 'cards',
      items: [
        { title: 'Ubicación', text: 'El cliente llama `lb://orders-service`, no una IP.' },
        { title: 'Replicación', text: 'No sabe cuántas réplicas hay detrás.' },
        { title: 'Migración', text: 'Una réplica cambia de máquina y se vuelve a registrar sola.' },
        { title: 'Fallos', text: 'Reintentos y fallbacks ocultan la caída de una réplica.' },
      ],
    },
    notes: 'Preguntar a la clase qué transparencia da cada componente de Spring Cloud. Respuesta: Eureka → ubicación/migración; LoadBalancer → replicación; Resilience4j → fallos.',
  },

  // ── 3. Comunicación ────────────────────────────────────────────
  {
    id: 'sincrona',
    section: 'Comunicación',
    title: 'Comunicación síncrona',
    scene: 'sync',
    content: {
      kind: 'compare',
      left: {
        title: 'REST + JSON',
        items: ['HTTP, fácil de depurar', 'Texto: más bytes y más latencia', 'Marshalling a JSON (clase 15)', 'Ideal hacia el navegador'],
      },
      right: {
        title: 'gRPC + Protobuf',
        items: ['El heredero de **RPC** (clase 16)', 'IDL `.proto` → stubs generados', 'Binario y HTTP/2: más rápido', 'Ideal entre servicios internos'],
      },
    },
    notes: 'Conectar con la clase 16: el .proto es el archivo .x de RPC, y protoc es rpcgen. Los stubs ocultan el socket igual que antes. El Grupo B profundiza en gRPC.',
  },
  {
    id: 'colas-topicos',
    section: 'Comunicación',
    title: 'Asíncrona: colas y tópicos',
    scene: 'queue',
    content: {
      kind: 'compare',
      left: {
        title: 'Cola (punto a punto)',
        items: ['Cada mensaje lo procesa **un** consumidor', 'Reparte trabajo entre réplicas', 'RabbitMQ, SQS, JMS', 'Ej.: "procesar pago #881"'],
      },
      right: {
        title: 'Tópico (pub/sub)',
        items: ['Cada mensaje llega a **todos** los suscritos', 'Notificaciones, inventario y analítica a la vez', 'Kafka, SNS, Pulsar', 'Ej.: "pedido #881 creado"'],
      },
    },
    notes: 'Es exactamente la distinción cola vs. tópico de la clase 16. En la escena, el cilindro es el broker y los paquetes salen hacia varios consumidores.',
  },
  {
    id: 'kafka',
    section: 'Comunicación',
    title: 'Kafka como columna vertebral',
    scene: 'queue',
    content: {
      kind: 'bullets',
      items: [
        'Log **persistente** y particionado: los mensajes no se borran al leerse.',
        'Cada grupo de consumidores lleva su **offset**: puede releer desde atrás (event sourcing, reconstruir datos).',
        'Funciona en modo cola (un grupo) y en modo tópico (varios grupos) a la vez.',
        'Con **Spring Cloud Stream** se escribe una función `Consumer<Pedido>` y el binder conecta Kafka o RabbitMQ sin cambiar el código.',
      ],
    },
    notes: 'Retomar: "las colas solo manejan uno a uno; en Kafka sí puedo decir muévase tres mensajes atrás" (profe, clase 16).',
  },

  // ── 4. Spring Cloud ────────────────────────────────────────────
  {
    id: 'mapa',
    section: 'Spring Cloud',
    title: 'El tema nuevo: Spring Cloud',
    scene: 'system',
    content: {
      kind: 'cards',
      items: [
        { tag: 'Config', title: 'Config Server', text: 'Configuración centralizada.' },
        { tag: 'Discovery', title: 'Eureka', text: 'Registro y descubrimiento de servicios.' },
        { tag: 'Edge', title: 'Gateway', text: 'Punto de entrada, rutas y filtros.' },
        { tag: 'Clientes', title: 'OpenFeign + LoadBalancer', text: 'Llamadas REST declarativas y balanceadas.' },
        { tag: 'Resiliencia', title: 'Resilience4j', text: 'Circuit breaker, reintentos y timeouts.' },
        { tag: 'Observabilidad', title: 'Micrometer Tracing', text: 'Seguir una petición entre servicios.' },
      ],
    },
    notes: 'Spring Cloud es un conjunto de proyectos sobre Spring Boot que resuelven los problemas típicos de un sistema distribuido. Cada pieza resuelve algo que vimos en clase. Mencionar que Hystrix, Ribbon y Zuul (Netflix) fueron reemplazados por Resilience4j, LoadBalancer y Gateway.',
  },
  {
    id: 'config',
    section: 'Spring Cloud',
    title: 'Config Server',
    scene: 'config',
    content: {
      kind: 'code',
      lang: 'yaml',
      code: `# orders-service.yml (en un repositorio Git)
spring:
  datasource:
    url: jdbc:postgresql://db-orders:5432/orders
orders:
  max-items: 50

# en cada servicio
spring:
  config:
    import: "configserver:http://config:8888"`,
      items: [
        'La configuración vive en **Git**: versionada y auditada.',
        'Cada servicio la descarga al arrancar; `@RefreshScope` la recarga sin reiniciar.',
        '**Spring Cloud Bus** avisa a todas las réplicas a la vez (broadcast).',
      ],
    },
    notes: 'Sin esto, cambiar una URL obligaría a recompilar 20 servicios. El aviso del Bus a todas las réplicas es un broadcast, como en la comunicación a grupo.',
  },
  {
    id: 'eureka',
    section: 'Spring Cloud',
    title: 'Eureka: el binder de los microservicios',
    scene: 'discovery',
    content: {
      kind: 'code',
      lang: 'java',
      code: `@SpringBootApplication
@EnableEurekaServer
public class RegistryApp { }

# en cada servicio (application.yml)
spring.application.name: orders-service
eureka.client.service-url.defaultZone: http://registry:8761/eureka`,
      items: [
        'Al arrancar, cada servicio **se registra** con su nombre e IP:puerto (como en RPC con el portmapper, puerto 111).',
        'Envía un **heartbeat** cada 30 s; si no renueva en 90 s, lo sacan: es un **lease** (Guía de estudio).',
        'Los clientes piden "¿dónde está `orders-service`?" y reciben la lista de réplicas.',
      ],
    },
    notes: 'Los pulsos verdes de la escena son los heartbeats. Comparar con el binder de RPC: registro al iniciar, consulta del cliente y baja al apagar. Lo nuevo es el lease automático.',
  },
  {
    id: 'gateway',
    section: 'Spring Cloud',
    title: 'Spring Cloud Gateway',
    scene: 'gateway',
    content: {
      kind: 'code',
      lang: 'yaml',
      code: `spring:
  cloud:
    gateway:
      routes:
        - id: orders
          uri: lb://orders-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=1`,
      items: [
        'Una sola puerta de entrada: el cliente solo conoce el gateway (**proxy inverso**, clase 11).',
        '`lb://` pregunta a Eureka y balancea entre réplicas.',
        'Filtros transversales: autenticación JWT, rate limiting, CORS, logs.',
      ],
    },
    notes: 'Señalar los paquetes del cliente entrando al gateway y abriéndose en abanico. Riesgo: el gateway es un SPOF, así que se replica detrás de un balanceador.',
  },
  {
    id: 'feign',
    section: 'Spring Cloud',
    title: 'OpenFeign: llamar a otro servicio como si fuera local',
    scene: 'sync',
    content: {
      kind: 'code',
      lang: 'java',
      code: `@FeignClient(name = "payments-service")
public interface PaymentsClient {
  @PostMapping("/payments")
  PaymentResponse pay(@RequestBody PaymentRequest req);
}

// en OrdersService
PaymentResponse r = paymentsClient.pay(req);`,
      items: [
        'Se declara una **interfaz** y Spring genera la implementación: es el **stub** de RPC.',
        'El marshalling a JSON y la búsqueda en Eureka son automáticos.',
        'Ojo: parece local, pero es una llamada de red que puede fallar o tardar.',
      ],
    },
    notes: 'Es la promesa de RPC de la clase 16 (ocultar el socket) en versión 2026. Pero la red sigue sin ser confiable: el otro servicio puede estar lento o caído. Eso abre la siguiente sección.',
  },

  // ── 5. Resiliencia y cierre ────────────────────────────────────
  {
    id: 'breaker',
    section: 'Resiliencia y cierre',
    title: 'Circuit breaker con Resilience4j',
    scene: 'breaker',
    content: {
      kind: 'code',
      lang: 'java',
      code: `@CircuitBreaker(name = "payments", fallbackMethod = "payLater")
public PaymentResponse pay(PaymentRequest req) {
  return paymentsClient.pay(req);
}

PaymentResponse payLater(PaymentRequest req, Throwable t) {
  return PaymentResponse.pending(); // se cobra después
}`,
      items: [
        '**Cerrado**: todo pasa. Si falla más del 50 %, pasa a **abierto** y corta las llamadas.',
        '**Semiabierto**: deja pasar unas pocas de prueba; si funcionan, se cierra otra vez.',
        'Evita la **falla en cascada**: un servicio lento no deja colgados a todos los que lo llaman.',
      ],
    },
    notes: 'En la escena "pagos" se pone rojo y el enlace se corta: el breaker se abrió y el pedido queda en "pago pendiente". Relacionar con SPOF y transparencia a fallos.',
  },
  {
    id: 'tracing',
    section: 'Resiliencia y cierre',
    title: 'Tracing distribuido',
    scene: 'tracing',
    content: {
      kind: 'bullets',
      items: [
        'Una petición cruza 5 servicios: ¿dónde se demoró? Los logs de cada máquina por separado no alcanzan.',
        '**Micrometer Tracing** agrega un `traceId` a la petición y un `spanId` por cada salto, propagados en las cabeceras HTTP y en los mensajes de Kafka.',
        '**Zipkin** o Grafana Tempo dibujan la línea de tiempo completa.',
        'Las métricas (latencia, errores por servicio) se exportan a **Prometheus** y se ven en Grafana.',
      ],
    },
    notes: 'El camino dorado en la escena es un trace: cliente → gateway → pedidos → pagos → Kafka → notificaciones.',
  },
  {
    id: 'recorrido',
    section: 'Resiliencia y cierre',
    title: 'Recorrido de una compra',
    scene: 'tracing',
    content: {
      kind: 'cards',
      items: [
        { tag: '1', title: 'Gateway', text: 'Valida el JWT y enruta `/api/orders` a `lb://orders-service`.' },
        { tag: '2', title: 'Eureka', text: 'Devuelve las 3 réplicas vivas de pedidos.' },
        { tag: '3', title: 'Pedidos → Pagos', text: 'Llamada Feign síncrona, protegida con circuit breaker.' },
        { tag: '4', title: 'Kafka', text: 'Publica "PedidoCreado" en un tópico.' },
        { tag: '5', title: 'Consumidores', text: 'Inventario descuenta y notificaciones envía el correo, cada uno a su ritmo.' },
      ],
    },
    notes: 'Contar la historia completa de principio a fin. Es el mejor momento para unir todo: síncrono donde hace falta respuesta y eventos donde no.',
  },
  {
    id: 'cuando-no',
    section: 'Resiliencia y cierre',
    title: '¿Cuándo NO usar microservicios?',
    scene: 'monolith',
    content: {
      kind: 'compare',
      left: {
        title: 'Costos reales',
        items: ['Latencia de red en cada salto', 'Consistencia eventual y sagas en vez de ACID', 'Mucha infraestructura: registro, gateway, broker, tracing', 'Depurar es más difícil'],
      },
      right: {
        title: 'Mejor un monolito si…',
        items: ['El equipo es pequeño', 'El dominio aún no está claro', 'No hay necesidad de escalar partes por separado', 'Opción intermedia: **monolito modular**'],
      },
    },
    notes: 'Cerrar con criterio de ingeniero: es una decisión de arquitectura con costos, como en la matriz de decisiones del parcial. "Si hay plata, sí" (profe, clase 14), pero hay que justificarla.',
  },
  {
    id: 'kubernetes',
    section: 'Resiliencia y cierre',
    title: 'Hacia dónde sigue: contenedores',
    scene: 'scale',
    content: {
      kind: 'bullets',
      items: [
        'Cada microservicio se empaqueta en un **contenedor** (Docker).',
        '**Kubernetes** asume parte de Spring Cloud: Services (discovery), ConfigMaps (configuración) e Ingress (gateway).',
        'Hoy es común usar Spring Boot sobre Kubernetes y dejar en Spring Cloud solo lo que Kubernetes no da.',
        'El Grupo E profundiza en contenedores y Kubernetes.',
      ],
    },
    notes: 'Puente hacia la exposición del Grupo E. Mostrar que las ideas (registro, configuración, proxy) son las mismas aunque cambie la herramienta.',
  },
  {
    id: 'quiz',
    section: 'Resiliencia y cierre',
    title: 'Preguntas para la clase',
    scene: 'orbit',
    content: {
      kind: 'quiz',
      items: [
        { q: '¿Qué concepto de RPC (clase 16) cumple Eureka?', a: 'El binder o portmapper: registro del servicio al arrancar y consulta del cliente para encontrarlo.' },
        { q: '"Pedido creado" debe llegar a inventario, correo y analítica. ¿Cola o tópico?', a: 'Tópico: un mismo mensaje para varios consumidores (editor-suscriptor).' },
        { q: '¿Qué transparencia aporta el API Gateway?', a: 'De ubicación (y de replicación con lb://): el cliente no sabe dónde ni cuántos servicios hay.' },
        { q: 'Pagos está caído. ¿Qué evita que pedidos también se caiga?', a: 'El circuit breaker: se abre, deja de llamar a pagos y responde con un fallback.' },
      ],
    },
    notes: 'Hacer las preguntas en voz alta, esperar respuestas y luego revelar con clic. Funciona como el anycast de la clase 16: con que uno responda, seguimos.',
  },
  {
    id: 'gracias',
    section: 'Resiliencia y cierre',
    title: 'Gracias',
    scene: 'system',
    content: { kind: 'title', subtitle: '¿Preguntas?' },
    notes: 'Abrir preguntas. Dejar la escena del sistema completo girando de fondo.',
  },
];
