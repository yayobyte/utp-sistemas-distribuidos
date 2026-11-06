import type { Clase } from './types';

export const clase16: Clase = {
  number: 16,
  date: '2026-10-29',
  tema: 'Comunicación',
  title: 'Comunicación a grupo, colas de mensajes y RPC',
  idea:
    'Además del socket uno a uno, el paso de mensajes se puede hacer a un grupo (un solo mensaje, varios receptores) o a través de una cola que desacopla productor y consumidor. Luego llega el primer middleware, RPC: el programador solo llama funciones y los stubs se encargan de la comunicación.',
  keyTerms: ['Unicast', 'Broadcast', 'Multicast', 'Anycast', 'Grupo abierto / cerrado', 'Cola de mensajes', 'Tópico', 'Kafka', 'RPC', 'Stub', 'Binder / portmapper', 'IDL', 'rpcgen', 'XDR'],
  sections: [
    {
      heading: 'Comunicación a grupo',
      blocks: [
        {
          type: 'p',
          text: 'En vez de abrir un socket por cada destinatario y enviar N mensajes, se envía **un solo mensaje al canal** y este puede llegar a varios nodos.',
        },
        {
          type: 'table',
          headers: ['Tipo', 'Destinatarios', 'Analogía en el salón'],
          rows: [
            ['**Unicast**', 'Uno solo, identificado', '"Oye, cuéntame cómo te fue el fin de semana"'],
            ['**Broadcast**', 'Todos los del grupo', 'El profesor da la clase a todos'],
            ['**Multicast**', 'Un subconjunto', 'Indicaciones a un equipo de trabajo'],
            ['**Anycast**', 'Un subconjunto, pero basta con que **uno** lo reciba', 'Una pregunta al aire: con que uno responda es suficiente'],
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'Grupo abierto', text: 'Puede recibir mensajes de nodos **externos**. Típico en **servicios o datos replicados**: la lógica de negocio envía al grupo de nodos de base de datos.' },
            { title: 'Grupo cerrado', text: 'Solo se comunican sus miembros, como un grupo de WhatsApp. Ejemplos: los trabajadores en maestro-trabajador (solo el maestro habla con el exterior) o los hilos de un proceso.' },
          ],
        },
        {
          type: 'callout',
          text: 'Las redes funcionan así (direcciones IP y máscaras), pero en sistemas distribuidos el grupo se monta como un **canal** sobre un middleware. Por dentro todo sigue siendo socket.',
        },
      ],
    },
    {
      heading: 'Colas de mensajes',
      blocks: [
        {
          type: 'p',
          text: 'Un **intermediario** recibe los mensajes y los guarda en colas: casilleros o buzones donde cada cola es un **destinatario**. Es asíncrono y **desacoplado espacial y temporalmente**: el productor no sabe dónde están los consumidores ni si existen en este momento.',
        },
        {
          type: 'list',
          items: [
            'Funcionan en **FIFO**: el primer mensaje en entrar es el primero en salir.',
            'El consumidor saca mensajes con **receive** (uno), **poll** (uno o varios, según la tecnología) o **notify** (push hacia un consumidor predeterminado, sin suscripción ni balanceo).',
            '**Convencional (efímero)**: el mensaje se borra al leerse. **Persistente**: queda como histórico para trazabilidad, reprocesar o que un nodo de reemplazo retome el trabajo.',
            'Ejemplos: IBM WebSphere MQ, Microsoft MQ, JMS. Suelen ser **centralizadas** y difíciles de llevar a clúster.',
            'Funciones avanzadas: **filtrado** de mensajes, mensajería **transaccional** (avisar un rollback) y **transformación** de mensajes.',
          ],
        },
        {
          type: 'table',
          headers: ['Arquitectura', 'Cómo encaja la cola'],
          rows: [
            ['Editor-suscriptor', 'Notify permite push, pero cada mensaje llega a **un solo** consumidor.'],
            ['Cliente-servidor replicado', 'La cola se pone entre clientes y servidores: cada servidor libre saca la siguiente petición (reparto de carga).'],
            ['SOA', 'Las colas desacoplaron las conexiones directas entre servicios e impulsaron la integración empresarial.'],
          ],
        },
        {
          type: 'callout',
          text: '**Cola vs. tópico**: una cola es punto a punto (cada mensaje lo consume **un** consumidor). Un tópico permite que **varios** reciban el mismo mensaje (editor-suscriptor). **Kafka** combina ambos modos, es persistente y permite volver atrás en los mensajes. El precio de las colas: más latencia y menos rendimiento, a cambio de no perder información en grandes volúmenes.',
        },
      ],
    },
    {
      heading: 'RPC: llamada a procedimientos remotos',
      blocks: [
        {
          type: 'p',
          text: 'Con sockets, colas o grupos, el desarrollador tiene que dominar el canal, el protocolo y el marshalling. **RPC** es el primer middleware: oculta todo eso. El cliente **llama a la función** como si fuera local y el servidor solo **implementa** la función.',
        },
        {
          type: 'p',
          text: 'Es la misma idea de las bibliotecas en C, donde el linker une tu código con la biblioteca, salvo que aquí la implementación vive en otra máquina. Ese trabajo lo hacen el **stub del cliente** y el **stub del servidor**: empaquetan la petición, la envían, la desempaquetan, ejecutan la función y devuelven la respuesta, mientras el cliente espera.',
        },
        { type: 'diagram', id: 'binder' },
        {
          type: 'list',
          items: [
            'Al arrancar, el servidor se **registra ante el binder** local. El cliente le pregunta dónde escucha el servicio y luego se conecta directamente. Al apagarse, el servidor se da de baja.',
            'En Linux el binder es **rpcbind** o **portmapper** y siempre escucha en el **puerto 111**.',
            'El servicio se identifica con **número de programa + número de versión**. El enlace es dinámico: los servidores pueden arrancar en cualquier puerto.',
            'Transporte: **TCP** (fiable) o **UDP** (más rápido, sin garantía de entrega).',
            'Conexión persistente: `clnt_create`, N llamadas y `clnt_destroy` para liberar el servidor.',
          ],
        },
        {
          type: 'table',
          headers: ['Variante', 'Origen', 'Notas'],
          rows: [
            ['**ONC RPC**', 'Sun Microsystems', 'Formato binario propietario; la base del estándar'],
            ['**DCE RPC**', 'Open Software Foundation', 'Buscaba interoperabilidad entre fabricantes'],
            ['**DCOM**', 'Microsoft', 'Misma filosofía, cerrado; desapareció tras CORBA'],
            ['**RPC de Linux**', 'Linux', 'Usa **XDR**; es el que sobrevive'],
          ],
        },
      ],
    },
    {
      heading: 'IDL y rpcgen',
      blocks: [
        {
          type: 'p',
          text: 'Las funciones remotas se describen en un archivo **IDL** (extensión `.x`): el programa, sus versiones y sus procedimientos con sus parámetros y tipos. Cada programa, versión y procedimiento lleva un **número** (por ejemplo, programa 99, versión 1, procedimientos 1 y 2), porque en C es más fácil identificar con números que con cadenas.',
        },
        {
          type: 'list',
          items: [
            'En las primeras versiones un procedimiento solo recibía **un argumento**, así que varios parámetros se agrupaban en un **struct**. Las versiones recientes lo hacen internamente.',
            '**rpcgen** convierte el `.x` en: el **stub del cliente**, el **stub del servidor**, el archivo **XDR** (marshalling, endianness, tamaños) y la **cabecera `.h`**.',
            'El programador escribe solo el código del cliente y la implementación del servidor. El **linker** une ese código, los stubs y las bibliotecas de RPC en cada ejecutable.',
            'Por eso una calculadora de 2 KB de código fuente puede terminar ocupando varios megas: la mayor parte es la plataforma RPC.',
          ],
        },
        {
          type: 'callout',
          text: '**Próxima clase:** RMI, CORBA y servicios web. Las exposiciones tienen que estar listas pronto porque las notas cierran el 5 de diciembre.',
        },
      ],
    },
  ],
  repaso: [
    { q: 'Diferencia entre multicast y anycast', a: 'Los dos van a un subconjunto, pero en multicast deben recibirlo todos y en anycast basta con que uno lo reciba.' },
    { q: '¿Grupo abierto o cerrado para servicios replicados?', a: 'Abierto: nodos externos (como la lógica de negocio) envían mensajes al grupo de réplicas.' },
    { q: '¿Cola o tópico?', a: 'En una cola cada mensaje lo consume un solo consumidor (punto a punto). En un tópico lo reciben varios (editor-suscriptor).' },
    { q: '¿Qué hacen los stubs en RPC?', a: 'Ocultan la comunicación: empaquetan y envían la llamada, la desempaquetan en el servidor, invocan la función y devuelven el resultado.' },
    { q: '¿En qué puerto escucha el binder de RPC y cómo identifica un servicio?', a: 'Puerto 111 (rpcbind/portmapper). Por número de programa más número de versión.' },
    { q: '¿Qué genera rpcgen a partir del .x?', a: 'El stub del cliente, el stub del servidor, el archivo XDR de marshalling y la cabecera .h.' },
  ],
};

export const clase17: Clase = {
  number: 17,
  date: '2026-11-03',
  tema: 'Comunicación',
  title: 'Java RMI, CORBA y servicios web (SOAP y REST)',
  idea:
    'La idea de RPC aplicada a objetos: Java RMI publica objetos en un registro global y CORBA intentó hacerlo entre lenguajes, pero sus ORB eran caros. Los servicios web terminaron siendo un "RPC sobre la web": SOAP, estricto y basado en XML, y REST, flexible y basado en recursos y verbos HTTP.',
  keyTerms: ['RMI', 'Stub / Skeleton', 'RMI Registry', 'CORBA', 'ORB', 'OMG', 'API', 'SOAP', 'WSDL', 'UDDI', 'REST', 'Richardson', 'HATEOAS', 'Idempotencia'],
  sections: [
    {
      heading: 'Java RMI: invocación remota de métodos',
      blocks: [
        {
          type: 'p',
          text: 'Es la versión de RPC para Java. Como Java es orientado a objetos, ya no se publican procedimientos sino **objetos**, y el cliente invoca sus **métodos** como si el objeto fuera local. Fue el primer modelo de **objetos distribuidos**.',
        },
        {
          type: 'table',
          headers: ['', 'RPC', 'RMI'],
          rows: [
            ['Qué se publica', 'Procedimientos', '**Objetos**'],
            ['Binder', '**Local** (portmapper en cada máquina)', '**Global**: un **RMI Registry** que puede estar en otra máquina'],
            ['IDL', 'Archivo `.x` + rpcgen', 'Una **interfaz Java** normal'],
            ['Stubs', 'Stub del cliente y del servidor', '**Stub** (cliente) y **skeleton** (servidor)'],
            ['Lenguaje', 'Sobre todo C', 'Solo Java'],
          ],
        },
        {
          type: 'list',
          items: [
            '**Interfaz remota**: `interface Sumador extends java.rmi.Remote`, y cada método declara `throws RemoteException` para capturar los fallos de transporte.',
            '**Implementación**: `SumadorImpl extends UnicastRemoteObject implements Sumador`. En el constructor se registra con `Naming.rebind(nombre, this)`.',
            '**Servidor**: instala un **SecurityManager** si no hay uno (Java es estricto con los recursos de red), crea el objeto y listo. No hay que escribir un ciclo de escucha: lo hace RMI.',
            '**Cliente**: `Sumador s = (Sumador) Naming.lookup("rmi://host/Sumador")` y luego `s.sumar(5, 2)`. El `lookup` funciona como un `new` de un objeto que vive en otra máquina.',
          ],
        },
        {
          type: 'callout',
          text: 'Comparado con RPC en C (`clnt_create`, punteros, `clnt_destroy`), en RMI basta con un `lookup` y llamar al método. Microsoft tenía su equivalente, **DCOM**, para sus lenguajes (Visual Basic, Visual C++, J++).',
        },
      ],
    },
    {
      heading: 'CORBA',
      blocks: [
        {
          type: 'p',
          text: 'Cada fabricante tenía su estándar (RMI en Java, DCOM en Microsoft), pero ¿cómo invoca Visual Basic un objeto hecho en Java? La **OMG** (Object Management Group, fundada en 1989, que define estándares de orientación a objetos) definió la **OMA** y, dentro de ella, **CORBA**: *Common Object Request Broker Architecture*.',
        },
        {
          type: 'list',
          items: [
            'El binder se llama **ORB** (Object Request Broker). Ahí se publican **servicios**, **facilities** (utilidades) e **interfaces de dominio**, escritos en cualquier lenguaje.',
            'Cada lenguaje traduce sus objetos a una **representación CORBA** común. Así un objeto en C se puede invocar desde Java aunque su representación en memoria sea distinta.',
            'CORBA es una **especificación**, no un producto: cada empresa construía su propio ORB.',
          ],
        },
        {
          type: 'callout',
          text: '**Por qué no se popularizó:** los ORB de producción eran caros (hasta unos **US$5.000 por licencia**, por servidor y renovable), y los gratuitos eran servidores pequeños solo para pruebas. Mientras tanto la web resolvió el mismo problema: cualquier lenguaje sabe hablar HTTP.',
        },
      ],
    },
    {
      heading: 'De la web de documentos a los servicios web',
      blocks: [
        {
          type: 'table',
          headers: ['Etapa', 'Qué se publica', 'Relación'],
          rows: [
            ['**Web de documentos**', 'HTML estático en carpetas del servidor HTTP', 'Compartir artículos académicos'],
            ['**Aplicaciones web**', 'HTML generado por CGI, PHP, ASP, JSP o JSF en servidores de aplicaciones', '**B2C**: el cliente interactúa con el negocio'],
            ['**Servicios web**', 'Funciones expuestas por HTTP', '**B2B**: una aplicación habla con otra'],
          ],
        },
        {
          type: 'p',
          text: 'Una **API** (*Application Programming Interface*) es el **contrato** que dice cómo pedirle algo a una aplicación y cómo responde. No es para usuarios sino para otras aplicaciones; una app móvil, por ejemplo, habla con la API, no la persona. Los servicios web son, en el fondo, **RPC sobre la web**, y por eso reemplazaron a CORBA: un servidor en Java, Python, Go o Node se entiende con cualquier otro.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Antes: el agente de viajes', text: 'Entraba a la web de cada aerolínea y cada hotel, reservaba y luego copiaba todo a mano en el sistema de su empresa.' },
            { title: 'Con servicios web', text: 'El servidor de la agencia habla directamente con los de aerolíneas, hoteles y pagos. Así nacieron Despegar, Trivago o Booking: integración de servicios, un gran sistema distribuido.' },
          ],
        },
      ],
    },
    {
      heading: 'SOAP',
      blocks: [
        {
          type: 'table',
          headers: ['', 'SOAP', 'REST'],
          rows: [
            ['Tipo', 'Protocolo **estandarizado** (W3C)', '**Estilo** de arquitectura, estándar de facto'],
            ['Transporte', 'HTTP, SMTP, TCP…', 'HTTP'],
            ['Formato', '**XML**', 'JSON, XML o texto plano'],
            ['Contrato', '**WSDL**', 'No hay (solo la documentación, p. ej. OpenAPI/Swagger)'],
            ['Localización', '**UDDI** (binder)', 'IP y puerto directos'],
            ['Capa', 'Aplicación (capa 7): ya no se trabaja sobre TCP/UDP directamente', 'Aplicación (capa 7)'],
          ],
        },
        {
          type: 'list',
          items: [
            '*Simple Object Access Protocol*. Es **paso de mensajes en XML**: un **Envelope** con un **Header** opcional y un **Body**, donde va el objeto y el método (por ejemplo `GetLastTradePrice` del servicio `StockQuote`).',
            'Todas las peticiones van por **POST** a un solo endpoint. La respuesta es otro sobre con, por ejemplo, `<Price>34.5</Price>` y el código HTTP `200 OK`.',
            '**Ventajas**: estandarización e interoperabilidad entre lenguajes, seguridad estandarizada (WS-Security), transporte flexible y puede ser **stateless o stateful**.',
            '**Desventajas**: complejidad (muchas reglas y bibliotecas), **lentitud** al convertir entre objetos y XML, y cada cambio del WSDL obliga a cambiar cliente y servidor.',
          ],
        },
        {
          type: 'callout',
          text: '**UDDI** se pensó como un binder **global y replicable** entre fabricantes, pero nunca se usó en la práctica: no le daba ganancia a nadie. Por eso los servicios web se llaman por **IP:puerto** directamente, y si hay varias réplicas todo llega al mismo servidor, a menos que se cambie la dirección a mano. Es el problema de no tener binder.',
        },
      ],
    },
    {
      heading: 'REST y el modelo de madurez de Richardson',
      blocks: [
        {
          type: 'p',
          text: '*Representational State Transfer*. En vez de meter el objeto en un sobre XML, se manda el **dato crudo** en el body, el **recurso** se indica en la **URL** y la **acción** con el **verbo HTTP**. Un recurso es la cosa que se gestiona: usuario, producto, cuenta. No es un estándar sino un conjunto de convenciones; si se cumplen, el servicio es **RESTful**.',
        },
        {
          type: 'table',
          headers: ['Nivel', 'Qué agrega', 'Ejemplo'],
          rows: [
            ['**0**', 'Solo HTTP: un endpoint, todo por POST, datos en JSON/XML propios', 'Lo que hace **SOAP**'],
            ['**1**', '**Recursos** con URIs propias y con sentido', '`/api/accounts`, `/api/users`'],
            ['**2**', '**Verbos** HTTP y **códigos de estado** bien usados → **RESTful**', '`GET` 200, `POST` 201, 404, 409'],
            ['**3**', '**HATEOAS**: la respuesta trae `data` y `links` a lo que se puede hacer después', '`{ data, links: { self, roles } }`'],
          ],
        },
        {
          type: 'table',
          headers: ['Petición', 'Para qué', '¿Idempotente?', 'Códigos típicos'],
          rows: [
            ['`GET /api/accounts`', 'Consultar', 'Sí', '200, 204, 401'],
            ['`POST /api/accounts`', 'Crear', '**No**', '201, 400, 401, 409'],
            ['`PUT /api/accounts/:id`', 'Reemplazar todo', 'Sí', '200, 401, 404'],
            ['`PATCH /api/accounts/:id`', 'Modificar una parte', 'Depende', '200, 404'],
            ['`DELETE /api/accounts/:id`', 'Borrar', 'Sí', '200, 204, 401, 404'],
          ],
        },
        {
          type: 'list',
          items: [
            '`:id` es una variable de ruta: `/api/accounts/150` hace que `id = 150`.',
            '`POST /api/auth/register` (201, 400 o 409) y `POST /api/auth/login` (200 o 401) son **nivel 1**: tienen recurso, pero el verbo no expresa la acción.',
            '**Ventajas**: escalabilidad horizontal (stateless), flexibilidad de formatos y verbos HTTP estándar.',
            '**Desventajas**: sobrecarga de datos, más latencia por mandar el objeto completo, seguridad a cargo del programador y transacciones complejas difíciles, porque se separa por recursos y no por funcionalidades.',
          ],
        },
        {
          type: 'callout',
          text: '**Próxima clase:** sistemas de archivos distribuidos. El cronograma de exposiciones y del cierre del curso se anuncia pronto; las notas del parcial aún no están.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué diferencia el binder de RMI del de RPC?', a: 'En RPC es local a cada máquina (portmapper); en RMI es global: un RMI Registry que puede estar en otra máquina y donde se registran objetos.' },
    { q: '¿Qué hace falta para que una interfaz Java sea remota en RMI?', a: 'Que extienda java.rmi.Remote y que sus métodos declaren throws RemoteException.' },
    { q: '¿Por qué fracasó CORBA?', a: 'Era solo una especificación y los ORB de producción eran caros y con licencias renovables; los servicios web resolvieron la interoperabilidad con HTTP.' },
    { q: 'SOAP vs. REST en contrato y formato', a: 'SOAP usa XML, WSDL como contrato y UDDI para localizar. REST usa JSON (u otros), no tiene contrato formal y se llama por IP y puerto.' },
    { q: '¿Desde qué nivel de Richardson un servicio es RESTful?', a: 'Desde el nivel 2: recursos, verbos HTTP y códigos de estado bien usados. El nivel 3 agrega HATEOAS.' },
    { q: '¿Por qué POST no es idempotente y PUT sí?', a: 'Cada POST crea un recurso nuevo; repetir el mismo PUT deja el recurso en el mismo estado.' },
  ],
};
