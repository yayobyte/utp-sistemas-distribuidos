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
