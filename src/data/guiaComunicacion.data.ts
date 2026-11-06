import type { ChoiceItem, FamilyTile, SeqStep } from '../components/guia/GuiaParts';

export const comFamilies: FamilyTile[] = [
  { id: 'msg', anchor: 'paso-mensajes', number: 1, name: 'Paso de mensajes', question: '¿Cómo se hablan si no comparten memoria?', terms: 'send / receive, directa / indirecta, 1-1, N-1, N-N, bloqueante, timeout, buffer' },
  { id: 'repr', anchor: 'representacion', number: 2, name: 'Representación', question: '¿El receptor entiende los bytes que le llegan?', terms: 'Endianness, tamaños de tipos, serialización, marshalling, XDR, CDR, JSON, Protobuf' },
  { id: 'mq', anchor: 'mensajeria', number: 3, name: 'Modelos de mensajería', question: '¿A cuántos les llega y quién lo guarda?', terms: 'Socket, unicast, broadcast, multicast, anycast, grupo abierto / cerrado, cola, tópico, Kafka' },
  { id: 'mw', anchor: 'middleware', number: 4, name: 'Middleware de objetos', question: '¿Quién esconde el socket?', terms: 'RPC, stub, skeleton, binder local / global, IDL, rpcgen, RMI, CORBA, ORB' },
  { id: 'web', anchor: 'servicios-web', number: 5, name: 'Servicios web', question: '¿SOAP o REST, y qué tan RESTful?', terms: 'API, B2C / B2B, SOAP, WSDL, UDDI, REST, verbos HTTP, Richardson, HATEOAS, idempotencia' },
];

export const comExamClues: [string, string][] = [
  ['"no comparten memoria"', 'paso de mensajes'],
  ['"83 millones de grados" / "orden de los bytes"', 'endianness'],
  ['"con que uno responda"', 'anycast'],
  ['"un solo consumidor por mensaje"', 'cola'],
  ['"stub" / "skeleton" / "rpcgen"', 'middleware'],
  ['"WSDL" / "sobre XML"', 'SOAP'],
  ['"recursos y verbos"', 'REST'],
];

// ── Representación ─────────────────────────────────────────────

export const typeSizes = [
  ['char', '1 byte', '2 bytes'],
  ['int', '2 bytes*', '4 bytes'],
  ['long', '4 bytes', '8 bytes'],
];

export const formats = [
  ['**XDR**', 'Binario', 'RPC (Sun / Linux)', 'Ambos lados conocen el tipo (implícito)'],
  ['**CDR**', 'Binario', 'CORBA', 'Implícito, definido por el IDL'],
  ['**Java serialization**', 'Binario', 'RMI', 'Solo entre programas Java'],
  ['**XML**', 'Texto', 'SOAP', 'Explícito y muy verboso; tipos con XML Schema'],
  ['**JSON**', 'Texto', 'REST', 'Explícito y más liviano; tipos opcionales con JSON Schema'],
  ['**Protocol Buffers**', 'Binario', 'gRPC', 'Esquema `.proto` en ambos lados'],
  ['**Avro / BSON**', 'Binario', 'Kafka / MongoDB', 'Esquema junto al dato (Avro) o JSON binario (BSON)'],
];

/** The same order, encoded five ways. Sizes are measured, not estimated. */
const sample = { id: 881, total: 5, estado: 'PAGADO' };

const varint = (n: number) => {
  let bytes = 1;
  while (n >= 0x80) {
    n >>>= 7;
    bytes++;
  }
  return bytes;
};

// Protobuf: one tag byte per field + varint value, strings as length-prefixed bytes.
const protobufBytes = 1 + varint(sample.id) + 1 + varint(sample.total) + 1 + 1 + sample.estado.length;

const jsonText = JSON.stringify(sample);
const xmlText = `<pedido><id>${sample.id}</id><total>${sample.total}</total><estado>${sample.estado}</estado></pedido>`;
const soapText = `<?xml version="1.0"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Body>${xmlText}</soap:Body></soap:Envelope>`;

const utf8 = (text: string) => new TextEncoder().encode(text).length;

export const payloadSample = { jsonText, xmlText, soapText };

export const payloadSizes = [
  { label: 'Struct binario (C)', bytes: 4 + 4 + 8, note: 'int32 + int32 + char[8]. El receptor debe conocer la estructura y el endianness.' },
  { label: 'Protocol Buffers', bytes: protobufBytes, note: 'Etiquetas de campo y enteros de longitud variable; ambos lados tienen el .proto.' },
  { label: 'JSON', bytes: utf8(jsonText), note: jsonText },
  { label: 'XML', bytes: utf8(xmlText), note: 'Cada campo lleva etiqueta de apertura y de cierre.' },
  { label: 'SOAP (XML en sobre)', bytes: utf8(soapText), note: 'El mismo XML dentro de Envelope y Body, con namespace.' },
];

// ── Mensajería ─────────────────────────────────────────────────

export type CastMode = 'unicast' | 'broadcast' | 'multicast' | 'anycast';

export const castModes: { id: CastMode; label: string; say: string; analogy: string }[] = [
  { id: 'unicast', label: 'Unicast', say: 'Un mensaje al canal con **un solo destinatario** identificado.', analogy: '"Oye, ¿cómo te fue el fin de semana?" a un estudiante.' },
  { id: 'broadcast', label: 'Broadcast', say: 'Un mensaje que reciben **todos** los del grupo.', analogy: 'El profesor dando la clase a todo el salón.' },
  { id: 'multicast', label: 'Multicast', say: 'Un mensaje para **un subconjunto**; todos los del subconjunto lo procesan.', analogy: 'Indicaciones a un solo equipo de trabajo.' },
  { id: 'anycast', label: 'Anycast', say: 'Un mensaje para un subconjunto, pero **basta con que uno** lo reciba y responda.', analogy: 'Una pregunta al aire: con que uno responda, seguimos.' },
];

export const socketsByArch = [
  ['Cliente-servidor', 'Un socket por conexión; el servidor escucha en un **puerto conocido** (8080) y el cliente usa uno **dinámico**.'],
  ['Editor-suscriptor (pull)', 'El broker es un servidor: el suscriptor se conecta, se suscribe y pregunta por eventos.'],
  ['Editor-suscriptor (push)', 'El suscriptor deja la conexión **abierta** para que el broker le empuje los eventos.'],
  ['P2P', '**Dos sockets** por nodo: uno para recibir (puerto conocido) y otro para enviar (dinámico).'],
];

// ── Middleware ─────────────────────────────────────────────────

export const stubSteps: SeqStep[] = [
  { label: 'Llamada local', say: 'El cliente llama `sumador.sumar(5, 2)` como si el objeto fuera local. En realidad llama al **stub**.' },
  { label: 'Marshalling', say: 'El stub **empaqueta** el nombre del método y los parámetros (XDR en RPC, serialización Java en RMI).' },
  { label: 'Red', say: 'El mensaje viaja por un **socket** TCP o UDP. El programador nunca lo abrió.' },
  { label: 'Skeleton', say: 'El **skeleton** (stub del servidor) desempaqueta y llama a la implementación real.' },
  { label: 'Respuesta', say: 'El resultado hace el camino inverso: skeleton empaqueta, stub desempaqueta y el cliente recibe `7`.' },
];

export const middlewareMatrix = [
  ['Unidad remota', 'Procedimiento', 'Objeto (métodos)', 'Objeto (métodos)'],
  ['Binder', '**Local**: portmapper / rpcbind, puerto 111', '**Global**: RMI Registry', '**ORB** (Object Request Broker)'],
  ['Identifica el servicio', 'Nº de programa + versión', 'Nombre: `rmi://host/Sumador`', 'Referencia de objeto en el ORB'],
  ['Contrato (IDL)', 'Archivo `.x` → **rpcgen**', 'Interfaz Java que extiende `Remote`', 'IDL de CORBA → compilador por lenguaje'],
  ['Marshalling', 'XDR', 'Serialización Java', 'CDR'],
  ['Lenguajes', 'Sobre todo C', 'Solo Java', '**Cualquiera** (C, Java, Delphi…)'],
  ['Por qué se dejó de usar', 'Bajo nivel: punteros, `clnt_create`', 'Atado a Java', 'ORBs caros (hasta US$5.000 por licencia)'],
];

export const rpcgenOutputs = [
  ['`suma_clnt.c`', 'Stub del cliente: localiza el servidor vía binder y envía la llamada'],
  ['`suma_svc.c`', 'Stub del servidor: se registra en el binder, recibe y despacha'],
  ['`suma_xdr.c`', 'Marshalling: tamaños, endianness y structs'],
  ['`suma.h`', 'Cabecera con los tipos; la incluyen cliente y servidor'],
];

// ── Servicios web ──────────────────────────────────────────────

export const timeline = [
  { year: 1983, label: 'Sockets BSD', kind: 'base' },
  { year: 1985, label: 'Sun RPC (ONC)', kind: 'mw' },
  { year: 1991, label: 'CORBA 1.0', kind: 'mw' },
  { year: 1993, label: 'Web de documentos', kind: 'web' },
  { year: 1996, label: 'DCOM', kind: 'mw' },
  { year: 1997, label: 'Java RMI', kind: 'mw' },
  { year: 1998, label: 'SOAP', kind: 'web' },
  { year: 2000, label: 'REST (Fielding)', kind: 'web' },
  { year: 2015, label: 'gRPC', kind: 'mw' },
];

export const webEras = [
  ['**Web de documentos**', 'HTML estático en carpetas del servidor', 'Compartir artículos académicos'],
  ['**Aplicaciones web**', 'HTML generado por CGI, PHP, ASP, JSP en servidores de aplicaciones', '**B2C**: el cliente usa el negocio'],
  ['**Servicios web**', 'Funciones expuestas por HTTP (APIs)', '**B2B**: una aplicación habla con otra'],
];

export const soapVsRest = [
  ['Naturaleza', 'Protocolo **estándar** (W3C)', '**Estilo** de arquitectura, estándar de facto'],
  ['Transporte', 'HTTP, SMTP, TCP…', 'HTTP'],
  ['Formato', '**XML** siempre', 'JSON, XML o texto plano'],
  ['Contrato', '**WSDL**', 'Ninguno (opcional: OpenAPI / Swagger)'],
  ['Localización', '**UDDI** (binder, casi no se usó)', 'IP y puerto directos'],
  ['Verbos', 'Todo por **POST** a un endpoint', 'GET, POST, PUT, PATCH, DELETE'],
  ['Estado', 'Con o sin estado', 'Sin estado (stateless)'],
  ['A favor', 'Interoperable, seguridad estándar (WS-Security)', 'Simple, liviano, escala horizontal'],
  ['En contra', 'Complejo y lento (XML ↔ objeto)', 'Seguridad y transacciones a cargo del programador'],
];

export const richardson = [
  { level: 0, name: 'HTTP como túnel', text: 'Un endpoint, todo por POST, datos propios.', example: 'POST /api/service' },
  { level: 1, name: 'Recursos', text: 'Una URI con sentido por recurso.', example: '/api/accounts, /api/users' },
  { level: 2, name: 'Verbos + códigos', text: 'GET, POST, PUT, DELETE y 200/201/404 bien usados. Aquí empieza **RESTful**.', example: 'POST → 201 Created' },
  { level: 3, name: 'HATEOAS', text: 'La respuesta trae `links` a las acciones siguientes.', example: '{ data, links: { self, roles } }' },
];

export const httpVerbs = [
  ['`GET /api/accounts`', 'Consultar', 'Sí', '200 · 204 · 401'],
  ['`POST /api/accounts`', 'Crear', '**No**', '201 · 400 · 409'],
  ['`PUT /api/accounts/:id`', 'Reemplazar todo', 'Sí', '200 · 404'],
  ['`PATCH /api/accounts/:id`', 'Modificar una parte', 'Depende', '200 · 404'],
  ['`DELETE /api/accounts/:id`', 'Borrar', 'Sí', '200 · 204 · 404'],
];

// ── Práctica ───────────────────────────────────────────────────

export const mechanismOptions = ['Socket', 'Grupo', 'Cola', 'Tópico', 'RPC', 'RMI', 'CORBA', 'SOAP', 'REST'];

export const mechanismQuiz: ChoiceItem[] = [
  { scenario: 'Un sensor en C manda la temperatura a un PLC. El programador decide el orden de los bytes y cómo empaquetar el struct.', answer: 'Socket', why: 'Con sockets el marshalling es responsabilidad del programador.' },
  { scenario: 'Un cliente en Java hace Naming.lookup("rmi://host/Banco") y luego llama banco.transferir(…).', answer: 'RMI', why: 'lookup al RMI Registry y llamada a métodos de un objeto remoto.' },
  { scenario: 'Se escribe un archivo .x con el programa 99, versión 1, y se compila con rpcgen.', answer: 'RPC', why: 'El .x es el IDL de RPC y rpcgen genera stubs, XDR y la cabecera.' },
  { scenario: 'Un objeto escrito en Delphi debe ser invocado desde Java a través de un broker de objetos.', answer: 'CORBA', why: 'CORBA y su ORB buscaban interoperabilidad entre lenguajes.' },
  { scenario: 'Las solicitudes de impresión se dejan en un buzón y cada impresora libre saca la siguiente. Cada trabajo se imprime una sola vez.', answer: 'Cola', why: 'Un mensaje, un consumidor: punto a punto.' },
  { scenario: '"Pedido creado" debe llegar a inventario, facturación y analítica a la vez.', answer: 'Tópico', why: 'Un mismo mensaje para varios suscriptores.' },
  { scenario: 'El maestro avisa a todos sus trabajadores del clúster que se detengan, con un solo mensaje.', answer: 'Grupo', why: 'Comunicación a grupo (broadcast en un grupo cerrado).' },
  { scenario: 'POST /StockQuote con un Envelope que contiene GetLastTradePrice; el contrato está en un WSDL.', answer: 'SOAP', why: 'Sobre XML, todo por POST y WSDL como contrato.' },
  { scenario: 'GET /api/accounts/150 devuelve 404 si la cuenta no existe.', answer: 'REST', why: 'Recurso en la URL, verbo HTTP y código de estado: nivel 2 de Richardson.' },
];
