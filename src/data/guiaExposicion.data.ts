import type { FamilyTile, SeqStep } from '../components/guia/GuiaParts';

export const expoFamilies: FamilyTile[] = [
  { id: 'xbase', anchor: 'fundamentos', number: 1, name: 'Fundamentos', question: '¿Qué es un microservicio y cuándo vale la pena?', terms: 'Glosario, monolito vs microservicios, trade-offs, base de datos por servicio' },
  { id: 'xmap', anchor: 'spring-cloud', number: 2, name: 'Spring Cloud', question: '¿Qué pieza resuelve qué problema?', terms: 'Config Server, Eureka, Gateway, OpenFeign, LoadBalancer, Stream, Micrometer Tracing' },
  { id: 'xres', anchor: 'resiliencia', number: 3, name: 'Resiliencia', question: '¿Qué pasa cuando algo falla?', terms: 'Lease y heartbeats, circuit breaker, fallback, reintentos, timeouts, falla en cascada' },
  { id: 'xflow', anchor: 'flujos', number: 4, name: 'Comunicación y datos', question: '¿Síncrono, asíncrono, y cómo se mantiene la consistencia?', terms: 'Feign / REST / gRPC, colas, tópicos, saga, outbox, consistencia eventual' },
  { id: 'xprep', anchor: 'preparacion', number: 5, name: 'Preparación', question: '¿Qué nos pueden preguntar?', terms: 'Preguntas probables, mapa de diapositivas, chuleta de puertos y anotaciones' },
];

export const glossary = [
  { term: 'Microservicio', def: 'Servicio pequeño, desplegable por separado, dueño de una capacidad de negocio y de sus datos.', course: 'Un **nodo** del sistema distribuido' },
  { term: 'Bounded context', def: 'Límite dentro del cual un término del negocio significa una sola cosa ("cliente" en ventas ≠ "cliente" en soporte). Sirve para decidir dónde cortar.', course: 'Diseño (DDD)' },
  { term: 'Base de datos por servicio', def: 'Cada servicio tiene su base; los demás solo entran por su API.', course: 'Bajo **acoplamiento** espacial' },
  { term: 'API Gateway', def: 'Única puerta de entrada: enruta, autentica, limita tráfico.', course: '**Proxy inverso** (clase 11)' },
  { term: 'Service discovery', def: 'Registro donde cada servicio anuncia dónde está, y los clientes preguntan.', course: '**Binder** (clases 12 y 16)' },
  { term: 'Client-side load balancing', def: 'El cliente recibe la lista de réplicas y elige una.', course: '**Scale-out** + replicación' },
  { term: 'Config Server', def: 'Configuración centralizada y versionada en Git.', course: 'Gestión centralizada' },
  { term: 'Heartbeat / lease', def: 'Señal periódica; si no se renueva a tiempo, el registro expira.', course: '**Lease** (guía de arquitecturas)' },
  { term: 'Circuit breaker', def: 'Corta las llamadas a un servicio que falla y responde con un plan B.', course: '**Transparencia a fallos**, evita el SPOF en cascada' },
  { term: 'Fallback', def: 'Respuesta alternativa cuando el breaker está abierto ("pago pendiente").', course: 'Degradación controlada' },
  { term: 'Falla en cascada', def: 'Un servicio lento deja colgados a todos los que lo llaman, uno tras otro.', course: 'Acoplamiento **temporal**' },
  { term: 'Evento', def: 'Hecho que ya pasó ("PedidoCreado"), publicado para quien le interese.', course: '**Editor-suscriptor** / tópico' },
  { term: 'Consistencia eventual', def: 'Los datos de varios servicios coinciden después de un rato, no al instante.', course: 'Precio del bajo acoplamiento' },
  { term: 'Saga', def: 'Transacción larga partida en pasos locales, cada uno con su acción compensatoria.', course: 'Reemplaza a la transacción **ACID** distribuida' },
  { term: 'Outbox', def: 'Guardar el evento en la misma transacción que el dato, y publicarlo después.', course: 'No perder mensajes' },
  { term: 'Idempotencia', def: 'Procesar dos veces el mismo mensaje deja el mismo resultado.', course: 'PUT vs POST (clase 17)' },
  { term: 'Trace / span', def: 'El traceId sigue una petición completa; cada salto entre servicios es un span.', course: 'Observabilidad' },
  { term: 'Stateless', def: 'La réplica no guarda sesión; cualquiera puede atender cualquier petición.', course: '**Sin estado** (clase 12)' },
  { term: 'Contenedor', def: 'Paquete con el servicio y sus dependencias, listo para correr igual en cualquier lado.', course: 'Tema del Grupo E' },
  { term: 'Monolito modular', def: 'Un solo despliegue, pero con módulos bien separados por dentro. Opción intermedia.', course: 'Alternativa' },
];

export type Level = 0 | 1 | 2;

export const tradeoffs: { criterion: string; monolith: Level; micro: Level; note: string }[] = [
  { criterion: 'Despliegue independiente', monolith: 0, micro: 2, note: 'Cambiar pagos sin redesplegar todo.' },
  { criterion: 'Escalar una sola parte', monolith: 0, micro: 2, note: 'Más réplicas solo de pedidos.' },
  { criterion: 'Aislamiento de fallos', monolith: 0, micro: 2, note: 'Con breaker, una caída no tumba todo.' },
  { criterion: 'Autonomía de equipos', monolith: 1, micro: 2, note: 'Cada equipo, su servicio y su ritmo.' },
  { criterion: 'Simplicidad operativa', monolith: 2, micro: 0, note: 'Registro, gateway, broker, tracing…' },
  { criterion: 'Latencia baja por petición', monolith: 2, micro: 1, note: 'Llamadas locales vs saltos de red.' },
  { criterion: 'Consistencia de datos', monolith: 2, micro: 0, note: 'ACID vs consistencia eventual.' },
  { criterion: 'Facilidad para depurar', monolith: 2, micro: 0, note: 'Un log vs trazas entre servicios.' },
];

export const levelLabel = ['Bajo', 'Medio', 'Alto'];

export type ComponentId = 'gateway' | 'eureka' | 'config' | 'feign' | 'breaker' | 'stream' | 'tracing';

export const components: Record<ComponentId, {
  name: string;
  what: string;
  solves: string;
  course: string;
  port?: string;
  dep: string;
}> = {
  gateway: { name: 'Spring Cloud Gateway', what: 'Recibe todas las peticiones externas y las enruta al servicio correcto con `lb://nombre`. Aplica filtros: JWT, rate limiting, CORS.', solves: 'El cliente no tiene que conocer 20 direcciones.', course: '**Proxy inverso** (clase 11), transparencia de **ubicación**.', port: '8080', dep: 'spring-cloud-starter-gateway' },
  eureka: { name: 'Eureka (Spring Cloud Netflix)', what: 'Registro de servicios. Cada instancia se registra con nombre e IP:puerto y envía heartbeats; los clientes piden la lista de réplicas.', solves: 'Las réplicas aparecen, cambian de IP y desaparecen.', course: '**Binder** global (RMI Registry, portmapper) + **lease**.', port: '8761', dep: 'spring-cloud-starter-netflix-eureka-server / -client' },
  config: { name: 'Spring Cloud Config', what: 'Servidor que entrega la configuración de cada servicio desde un repositorio Git. `@RefreshScope` la recarga; Spring Cloud Bus avisa a todas las réplicas.', solves: 'Cambiar una URL sin recompilar ni redesplegar 20 servicios.', course: 'Aviso por **broadcast** (comunicación a grupo, clase 16).', port: '8888', dep: 'spring-cloud-config-server / starter-config' },
  feign: { name: 'OpenFeign + LoadBalancer', what: 'Se declara una interfaz `@FeignClient(name = "payments-service")` y Spring genera la implementación; LoadBalancer elige la réplica.', solves: 'Llamar a otro servicio sin escribir código HTTP.', course: '**Stub** de RPC/RMI (clases 16–17), **marshalling** a JSON automático.', dep: 'spring-cloud-starter-openfeign / -loadbalancer' },
  breaker: { name: 'Resilience4j (Spring Cloud CircuitBreaker)', what: 'Envuelve una llamada: si fallan demasiadas, deja de llamar (abierto) y responde con un fallback. También reintentos, timeouts y bulkheads.', solves: 'Que un servicio caído o lento no tumbe a los demás.', course: '**Transparencia a fallos**, punto único de fallo (clase 10).', dep: 'spring-cloud-starter-circuitbreaker-resilience4j' },
  stream: { name: 'Spring Cloud Stream + Kafka', what: 'Se escriben funciones `Consumer<Pedido>` / `Supplier`; el binder las conecta a Kafka o RabbitMQ sin cambiar el código.', solves: 'Publicar eventos sin acoplar al emisor con los consumidores.', course: '**Editor-suscriptor**, colas vs **tópicos** (clase 16).', port: '9092 (Kafka)', dep: 'spring-cloud-stream-binder-kafka' },
  tracing: { name: 'Micrometer Tracing + Zipkin', what: 'Agrega `traceId` y `spanId` a cada petición y mensaje; Zipkin dibuja la línea de tiempo completa.', solves: '¿En qué servicio se demoró la compra?', course: 'Observabilidad de un sistema **distribuido**.', port: '9411 (Zipkin)', dep: 'micrometer-tracing-bridge-brave + zipkin-reporter' },
};

export const bridgeTable = [
  ['Gateway', 'Proxy inverso', 'Ubicación, replicación', 'Cliente-servidor'],
  ['Eureka', 'Binder + lease', 'Ubicación, migración', 'Cliente-servidor (registro)'],
  ['LoadBalancer', 'Scale-out, replicación activa', 'Replicación, rendimiento', 'Cliente-servidor'],
  ['OpenFeign', 'Stub de RPC / RMI', 'Acceso', 'Cliente-servidor síncrono'],
  ['Resilience4j', 'SPOF, semánticas de fallo', 'Fallos', '—'],
  ['Config + Bus', 'Comunicación a grupo', 'Acceso', 'Broadcast'],
  ['Stream + Kafka', 'Broker, cola / tópico', 'Ubicación, migración', 'Editor-suscriptor'],
];

export const purchaseSteps: SeqStep[] = [
  { label: 'Entrada', say: 'El navegador hace `POST /api/orders`. El **Gateway** valida el JWT y ve la ruta `lb://orders-service`. *Qué decir:* "el cliente solo conoce una dirección".' },
  { label: 'Descubrimiento', say: 'El balanceador pregunta a **Eureka** y recibe 3 réplicas vivas de pedidos; elige una. *Qué decir:* "es el binder: nadie escribió una IP".' },
  { label: 'Llamada síncrona', say: 'Pedidos llama a Pagos con **Feign**, protegido por el **circuit breaker**. Necesita la respuesta ya: ¿se cobró o no?' },
  { label: 'Evento', say: 'Con el pago aprobado, Pedidos publica **PedidoCreado** en un tópico de **Kafka** y responde 201 al cliente.' },
  { label: 'Consumidores', say: 'Inventario descuenta stock y Notificaciones envía el correo, cada uno a su ritmo. Si Notificaciones está caído, lee el evento cuando vuelva.' },
];

export const decisions = [
  { q: '¿Necesito la respuesta para continuar?', yes: 'Síncrono: **Feign / REST**, o **gRPC** entre servicios internos. Con timeout y circuit breaker.', no: 'Sigue a la siguiente pregunta.' },
  { q: '¿Es un hecho que les interesa a varios?', yes: '**Tópico** (Kafka): cada consumidor recibe su copia.', no: 'Sigue a la siguiente pregunta.' },
  { q: '¿Es trabajo para repartir entre réplicas?', yes: '**Cola**: cada mensaje lo procesa una sola réplica.', no: 'Quizá no hace falta otro servicio: puede ser una llamada local.' },
];

export const sagaSteps = [
  { step: 'Crear pedido', compensate: 'Cancelar pedido' },
  { step: 'Reservar inventario', compensate: 'Liberar inventario' },
  { step: 'Cobrar pago', compensate: 'Reembolsar pago' },
  { step: 'Confirmar pedido', compensate: '—' },
];

export const likelyQuestions = [
  { q: '¿Eureka no es un punto único de fallo?', a: 'Sí lo sería con una sola instancia. Se corren **varias instancias de Eureka** que se replican entre sí, y cada cliente guarda en **caché** el último registro, así que si Eureka cae un rato las llamadas siguen funcionando. Eureka prefiere disponibilidad sobre consistencia (modo **self-preservation**).' },
  { q: '¿Y el Gateway no es un cuello de botella?', a: 'Es un punto central, igual que el proxy inverso de la clase 11. Se **replica** detrás de un balanceador (o del Ingress de Kubernetes) y no guarda estado, así que escala horizontalmente.' },
  { q: '¿Cómo se hace una transacción entre varios servicios?', a: 'No con ACID distribuido. Se usa una **saga**: pasos locales en cada servicio, y si uno falla se ejecutan **acciones compensatorias** en orden inverso (reembolsar, liberar inventario). El resultado es **consistencia eventual**.' },
  { q: '¿Cuál es la diferencia con SOA?', a: 'SOA usaba servicios grandes, un bus central (ESB) con lógica y a menudo bases compartidas. Microservicios son más pequeños, cada uno con su base de datos, y la lógica vive en los servicios: "smart endpoints, dumb pipes".' },
  { q: '¿Cuándo NO usarían microservicios?', a: 'Con un equipo pequeño, un dominio que aún no se entiende bien o sin necesidad de escalar partes por separado. Ahí conviene un **monolito modular** y extraer servicios después.' },
  { q: 'Si ya existe Kubernetes, ¿para qué Spring Cloud?', a: 'Kubernetes ya da discovery (Services), configuración (ConfigMaps) y entrada (Ingress). Es común usar eso y dejar de Spring Cloud lo que Kubernetes no da: **Feign**, **Resilience4j**, **Stream** y el tracing.' },
  { q: '¿Qué pasa si se pierde un mensaje de Kafka?', a: 'Kafka es **persistente** y replica cada partición en varios brokers. El consumidor lleva su **offset** y puede releer. Del lado del productor, el patrón **outbox** evita perder el evento si el servicio cae justo después de guardar.' },
  { q: '¿Qué pasa si un consumidor procesa dos veces el mismo evento?', a: 'Puede pasar (entrega "al menos una vez"). Por eso los consumidores deben ser **idempotentes**: por ejemplo, guardar el id del evento ya procesado y descartar repetidos.' },
  { q: '¿REST o gRPC entre servicios?', a: 'REST/JSON es simple y fácil de depurar; gRPC/Protobuf es binario, más rápido y genera stubs desde un `.proto` (como rpcgen). Hacia el navegador, REST; entre servicios internos con mucho tráfico, gRPC.' },
  { q: '¿Cómo se manejan la sesión y la autenticación?', a: 'Las réplicas son **stateless**: el Gateway valida un token **JWT** y lo reenvía; cada servicio puede verificarlo sin preguntar a un servidor de sesiones.' },
  { q: '¿Qué transparencias da esta arquitectura?', a: 'Ubicación y migración (Eureka), replicación (LoadBalancer), acceso (Feign y el Gateway) y fallos (Resilience4j). No da transparencia de rendimiento gratis: cada salto de red suma latencia.' },
  { q: '¿Hystrix, Ribbon y Zuul siguen vigentes?', a: 'No. Netflix los dejó en mantenimiento y Spring Cloud los retiró. Hoy son **Resilience4j**, **Spring Cloud LoadBalancer** y **Spring Cloud Gateway**. Eureka sí sigue.' },
];

export const slideMap = [
  { slides: '1–3', section: 'Introducción', guide: 'Glosario' },
  { slides: '4–6', section: 'Del monolito a microservicios', guide: 'Fundamentos: monolito vs microservicios' },
  { slides: '7–10', section: 'Conexión con el curso', guide: 'Tabla puente curso ↔ Spring Cloud' },
  { slides: '11–13', section: 'Comunicación', guide: 'Síncrono vs asíncrono + guía de Comunicación' },
  { slides: '14–18', section: 'Spring Cloud', guide: 'Mapa de Spring Cloud, lease de Eureka' },
  { slides: '19–25', section: 'Resiliencia y cierre', guide: 'Circuit breaker, recorrido de una compra, preguntas' },
];

export const cheatSheet = [
  ['`@EnableEurekaServer`', 'Convierte la app en el registro de servicios'],
  ['`spring.application.name`', 'El nombre con el que el servicio se registra en Eureka'],
  ['`eureka.client.service-url.defaultZone`', 'Dónde está Eureka (`http://registry:8761/eureka`)'],
  ['`spring.config.import: configserver:…`', 'Descargar la configuración del Config Server'],
  ['`@RefreshScope`', 'Recargar la configuración sin reiniciar'],
  ['`uri: lb://orders-service`', 'Ruta del Gateway resuelta por Eureka + balanceador'],
  ['`@FeignClient(name = "…")`', 'Cliente REST declarativo'],
  ['`@CircuitBreaker(name, fallbackMethod)`', 'Proteger una llamada con Resilience4j'],
  ['`Consumer<Pedido>` + Stream', 'Consumir un tópico de Kafka'],
];

export const replacements = [
  ['Hystrix', 'Resilience4j'],
  ['Ribbon', 'Spring Cloud LoadBalancer'],
  ['Zuul', 'Spring Cloud Gateway'],
  ['Sleuth', 'Micrometer Tracing'],
];
