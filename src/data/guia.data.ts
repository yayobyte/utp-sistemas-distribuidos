export type FamilyId = 'model' | 'arch' | 'trans' | 'coup' | 'scale' | 'server';

export interface Family {
  id: FamilyId;
  anchor: string;
  number: number;
  name: string;
  question: string;
  terms: string;
}

export const families: Family[] = [
  { id: 'model', anchor: 'modelos', number: 1, name: 'Modelos de computación', question: '¿De dónde sale el poder de cómputo?', terms: 'Cluster, Grid, Volunteer, Utility, Cloud (IaaS/PaaS/SaaS), Mobile, Ubiquitous, Edge/Fog, Autonomic' },
  { id: 'arch', anchor: 'arquitecturas', number: 2, name: 'Arquitecturas / patrones', question: '¿Cómo se organizan las piezas y quién habla con quién?', terms: 'Maestro-Trabajador, Cliente-Servidor, Peer-to-Peer, Editor-Suscriptor, cliente ligero vs pesado' },
  { id: 'trans', anchor: 'transparencia', number: 3, name: 'Transparencias', question: '¿Qué NO debe notar el usuario?', terms: 'Acceso, posición, migración, reubicación, replicación, concurrencia, fallos, rendimiento, escalabilidad' },
  { id: 'coup', anchor: 'acoplamiento', number: 4, name: 'Acoplamiento', question: '¿Qué necesitan saber dos partes una de la otra?', terms: 'Espacial (quién/dónde) y temporal (cuándo)' },
  { id: 'scale', anchor: 'escalar', number: 5, name: 'Escalabilidad y disponibilidad', question: '¿Cómo soportamos más carga y sobrevivimos a fallos?', terms: 'Scale-up/out, proxy forward/reverse, caché, replicación activa/pasiva, hot/warm/cold standby' },
  { id: 'server', anchor: 'servidor', number: 6, name: 'Dentro del cliente-servidor', question: '¿Cómo funciona un servidor y cómo lo encuentran los clientes?', terms: 'Secuencial / hilos / procesos / eventos, binder, con/sin estado, lease, semánticas de fallo' },
];

export const examClues: [string, string][] = [
  ['"donados por usuarios"', 'modelo'],
  ['"asignadas por un proceso central"', 'arquitectura'],
  ['"sin que el usuario lo note"', 'transparencia'],
  ['"no necesita conocer al receptor"', 'acoplamiento'],
  ['"más servidores" / "standby"', 'escalabilidad'],
  ['"dirección y puerto de un servicio"', 'binder'],
];

export const computingModels = [
  { name: 'Cluster', whose: 'Una organización, un mismo lugar', idea: 'Nodos homogéneos en red local rápida que actúan como una sola máquina', clues: 'homogéneo, baja latencia, LAN' },
  { name: 'Grid', whose: 'Varias organizaciones los prestan', idea: 'Máquinas distintas en lugares distintos, compartidas entre entidades', clues: 'heterogéneo, entidades, alta latencia' },
  { name: 'Volunteer', whose: 'Personas del común los donan', idea: 'Como un grid, pero con voluntarios. Mucha capacidad, pero volátil', clues: 'altruista, donan, voluntarios' },
  { name: 'Utility', whose: 'Un proveedor los vende', idea: 'Pagar el cómputo como el agua o la luz', clues: 'pago por uso, medido' },
  { name: 'Cloud', whose: 'Centros de datos de un proveedor', idea: 'Recursos bajo demanda por internet, vendidos como IaaS / PaaS / SaaS', clues: 'bajo demanda, elástico' },
  { name: 'Mobile / Ubiquitous', whose: 'Celulares y dispositivos cotidianos', idea: 'Cómputo que se mueve contigo o está embebido en todas partes', clues: 'móvil, en todas partes' },
  { name: 'Edge / Fog', whose: 'Nodos cerca de usuarios o sensores', idea: 'Procesar cerca de donde nacen los datos para bajar la latencia. Complementa la nube', clues: 'borde, cerca, latencia, IoT' },
  { name: 'Autonomic', whose: 'Cualquiera', idea: 'El sistema se gestiona, se repara y se ajusta solo', clues: 'autogestión, auto-reparación' },
];

export const cloudModels = [
  { tag: 'IaaS · base de la pirámide', get: 'máquinas virtuales, red, almacenamiento', manage: 'SO, runtime, app y datos', example: 'AWS EC2' },
  { tag: 'PaaS · mitad', get: 'una plataforma completa para desarrollar y ejecutar apps', manage: 'solo tu código y tus datos', example: 'Heroku, App Engine' },
  { tag: 'SaaS · cima', get: 'la aplicación terminada', manage: 'nada, solo la usas', example: 'Gmail, Drive' },
];

export const transparencies = [
  { name: 'Acceso', hidden: 'Si el recurso es local o remoto. Se usan igual', example: 'Abrir un archivo de una unidad de red como uno local' },
  { name: 'Posición (ubicación)', hidden: 'Dónde está el recurso', example: 'Escribes google.com, no la IP de un servidor en algún país' },
  { name: 'Migración', hidden: 'Que el recurso se movió a otro nodo', example: 'Una VM pasa a otro host y tu app sigue funcionando' },
  { name: 'Reubicación', hidden: 'Que se movió mientras lo estabas usando', example: 'El celular cambia de antena en plena llamada' },
  { name: 'Replicación', hidden: 'Que hay varias copias', example: 'Ves una base de datos, no tres réplicas' },
  { name: 'Concurrencia', hidden: 'Que otros usuarios comparten el recurso', example: 'Dos personas compran boletas y todo queda consistente' },
  { name: 'Fallos', hidden: 'Que algo se dañó y se recuperó', example: 'Una réplica cae y responde el backup' },
  { name: 'Rendimiento', hidden: 'Que el sistema se reconfiguró por carga', example: 'Arrancan más instancias en un pico' },
  { name: 'Escalabilidad', hidden: 'Que el sistema creció', example: 'Se agregan servidores y nada cambia para ti' },
];

export const transparencyQuiz: { scenario: string; answer: string }[] = [
  { scenario: 'Una base de datos se mueve a otro centro de datos en la noche. Al otro día la app funciona igual.', answer: 'Migración' },
  { scenario: 'Abres un archivo de una unidad de red compartida igual que uno de tu portátil.', answer: 'Acceso' },
  { scenario: 'Usas "api.tienda.com" y nunca sabes en qué país está el servidor.', answer: 'Posición' },
  { scenario: 'Hay tres copias de tu saldo bancario, pero siempre ves un solo número.', answer: 'Replicación' },
  { scenario: 'Un servidor se cae y un backup responde tu petición sin que lo notes.', answer: 'Fallos' },
  { scenario: 'Dos usuarios editan el mismo inventario al tiempo y los datos quedan consistentes.', answer: 'Concurrencia' },
  { scenario: 'Tu videollamada sigue mientras el celular pasa de Wi-Fi a 4G.', answer: 'Reubicación' },
  { scenario: 'La empresa agrega 20 servidores para Black Friday y los usuarios no notan nada.', answer: 'Escalabilidad' },
];

export const quizOptions = ['Acceso', 'Posición', 'Migración', 'Reubicación', 'Replicación', 'Concurrencia', 'Fallos', 'Escalabilidad'];

export const quizTips: Record<string, string> = {
  Posición: 'Posición oculta DÓNDE está. Nada se movió.',
  Migración: 'Migración: el recurso SE MOVIÓ a otro nodo.',
  Reubicación: 'Reubicación: se movió MIENTRAS se usaba.',
  Acceso: 'Acceso: lo local y lo remoto se usan igual.',
};

export const standbyModes = [
  { name: 'Hot', when: 'Justo después de cada transacción', fresh: 'Totalmente al día', takeover: 'Inmediata' },
  { name: 'Warm', when: 'Periódicamente, cambios agrupados en lotes', fresh: 'Cerca, pero no al día', takeover: 'Rápida, puede perder el último lote' },
  { name: 'Cold', when: 'Programado, por ejemplo cada medianoche', fresh: 'Desactualizado', takeover: 'Lenta, debe cargar el estado' },
];

export const serverModels = [
  { name: 'Secuencial', how: 'Una petición a la vez, las demás esperan', tradeoff: 'Simple, pero lento con carga' },
  { name: 'Concurrente · procesos', how: 'Un proceso nuevo por petición', tradeoff: 'Aislado pero pesado' },
  { name: 'Concurrente · hilos', how: 'Un hilo por petición, o un pool ya creado', tradeoff: 'Más liviano, requiere sincronización' },
  { name: 'Basado en eventos', how: 'Un solo hilo espera un evento de cualquier cliente y lo atiende', tradeoff: 'Muy eficiente, más difícil de programar' },
];

export const semantics = [
  { tag: 'Al menos una vez · ≥ 1', text: 'Reintenta hasta recibir respuesta. Se ejecuta seguro, pero quizá varias veces. Solo es seguro con operaciones idempotentes.' },
  { tag: 'Como mucho una vez · 0 o 1', text: 'Nunca repite. El servidor filtra duplicados. Puede no ejecutarse, pero nunca dos veces.' },
  { tag: 'Exactamente una vez · = 1', text: 'Lo ideal. Muy difícil de garantizar en una red real.' },
];

export const binderSteps = [
  { label: 'Registrar', say: 'Al arrancar, el servidor se registra en el binder: "Soy el servicio pagos, en 10.0.0.7 puerto 5000".' },
  { label: 'Buscar', say: 'El cliente solo conoce el nombre del servicio. Le pregunta al binder: "¿Dónde está pagos?".' },
  { label: 'Responder', say: 'El binder consulta su tabla y devuelve la dirección y el puerto.' },
  { label: 'Llamar directo', say: 'El cliente habla directo con el servidor. El binder ya no está en el camino. Esa es la gran diferencia con un proxy.' },
];
