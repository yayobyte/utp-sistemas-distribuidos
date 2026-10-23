# Clase 13: Comportamiento ante fallos y Editor-Suscriptor

> Fecha: 2026-10-20 · Fuente: `clases/clase13.txt` · Tema 2: Arquitecturas (cierre antes del Parcial 1)

## Idea central

El quinto aspecto de diseño de cliente-servidor es **qué garantiza el sistema cuando algo falla**: las **semánticas de ejecución**. Con **reintentos y operaciones idempotentes** se puede acercar a "exactamente una vez". Después, la arquitectura **editor-suscriptor**: desacoplada en tiempo y espacio, ideal para eventos.

## Repaso de los aspectos 1 a 4

- Atención: secuencial, concurrente (hilos o procesos) o eventos.
- Conexiones: una por petición o persistente.
- Localización: **binder**, que baja el acoplamiento espacial y permite escalar horizontalmente.
- Estado: **con estado** (mensajes cortos, rápido, pero atado al mismo servidor, solo escala verticalmente) o **sin estado** (mensajes pesados, pero si cae un servidor otro atiende).
- **Leases**: no son un temporizador ni un token; son una conversación para saber si el otro sigue vivo. Evitan timeouts arbitrarios (por ejemplo, el registro biométrico de 10 huellas más el rostro no se hace en un segundo).

## Aspecto 5: comportamiento ante fallos

Los fallos ya no son solo del software: la **red**, el **ambiente** y la **comunicación** también fallan.

### Las cuatro semánticas de ejecución

| Semántica | Cuántas veces se ejecuta | Descripción |
|---|---|---|
| **Ejecución arbitraria** (ingenua) | **0 a N** | No hay ningún control. Se pueden **perder o duplicar** datos. **Evitarla.** |
| **Al menos una vez** (*at-least-once*) | **≥ 1** | **Reintentos**: si no hay respuesta, reenvía hasta recibirla. Se ejecuta seguro, pero quizá varias veces. |
| **Como mucho una vez** (*at-most-once*) | **0 o 1** | El modelo clásico: se pide una vez; si falla, "no se pudo" y no se reintenta. Es el que **menos código** requiere. |
| **Exactamente una vez** (*exactly-once*) | **= 1** | El ideal. Con fallos es casi imposible, salvo centralizándolo todo (que no es lo que se busca). |

### Idempotencia: el puente hacia "exactamente una vez"

> **Al menos una vez + operaciones idempotentes ≈ exactamente una vez**

Una operación es **idempotente** si ejecutarla N veces deja el **mismo resultado** que ejecutarla una. Las consultas lo son; las mutaciones hay que diseñarlas.

- **Mal**: "suma 100.000 al saldo". Cinco clics impacientes en "enviar" = 500.000.
- **Bien**: enviar **el saldo final** ("el nuevo saldo es 1.100.000"). Cinco updates dejan lo mismo.
- **Bien**: marcar cada tarea con un **ID único**. Cada reintento lleva el mismo ID y el servidor detecta que ya la procesó.

### Escenarios de fallo

**Comunicación fiable** (por ejemplo, dentro de un clúster; solo falla si cae el switch):
- Si **cae el servidor**, no se sabe si alcanzó a ejecutar. Al reiniciar, debe leer una **lista de tareas pendientes** y un **registro de respuestas por enviar**. Funciona en modo **asíncrono**.
- En *como mucho una vez*: si llega la respuesta, se ejecutó. Si no llega, no se sabe (¿hay que hacer **rollback**?).
- En *al menos una vez*: retransmitir hasta recibir la respuesta.
- Las **transacciones distribuidas** (una tarea que modifica varios servicios) son "uno de los dolores de cabeza más grandes" de la computación distribuida: no hay bala de plata.

**Comunicación no fiable** (se pierden paquetes):
- Se pierde la **petición** → retransmitir. Conviene usar **números de secuencia** (mensaje 3, copia 1, 2, 3…) y un número máximo de reintentos.
- Se pierde la **respuesta** → retransmitir provocaría reejecutar. Solución: guardar un **histórico de respuestas** (como una caché) y devolver la misma respuesta.
- Si **cae el cliente**, el servidor procesa para nadie (como pedir algo en una tienda e irse mientras lo buscan). Se puede guardar la respuesta en caché por si vuelve.

### Detectar clientes caídos: épocas y leases

- **Épocas**: un contador que aumenta cada vez que el cliente se reinicia. Si llega una petición de la época 2, las tareas de la época 1 de ese cliente se pueden descartar.
- **Leases**: si el cliente no renueva, se abortan sus tareas.
- **Abortar no es trivial**: puede dejar el servidor **incoherente** (datos a medio insertar). A veces es mejor **dejar terminar**, perder ese procesamiento y hacer **rollback** o borrar los datos temporales.

## Arquitectura Editor-Suscriptor (Publish-Subscribe)

- **Editores** publican **eventos** en un tema. **Suscriptores** reciben **solo los temas que les interesan**. En medio hay un **broker** o gestor con **colas de mensajes** (un buzón). Es una arquitectura de **eventos distribuidos**.
- **Desacoplada en tiempo** (asíncrona: el suscriptor puede no estar disponible cuando se publica) **y en espacio** (nadie conoce a nadie). Facilita los **sistemas heterogéneos**.
- Usos: **bolsa de valores** (te notifican si sube tu acción), **domótica**, **IoT**, sensores.
- Operaciones: suscribirse, darse de baja, publicar (editor), notificar (plataforma → suscriptor en push), obtener (suscriptor en pull).

| | **Push** | **Pull** |
|---|---|---|
| Quién busca a quién | La **plataforma** busca a los suscriptores y les envía | El **suscriptor** pregunta a la plataforma: "¿hay eventos?" |
| Requisito | El suscriptor debe **escuchar** como si fuera servidor | Solo llamar a `obtener` |
| Uso | **Tiempo real** (nivel de un embalse) | Eventos no urgentes. El evento puede llegar tarde. |

### Formas de implementarlo

| Implementación | Ventaja | Desventaja |
|---|---|---|
| **Conexión directa** editor ↔ suscriptor | Simple | **Acoplamiento espacial**: hay que conectarse a cada editor. 5 suscriptores = 5 mensajes |
| **Un intermediario** (broker) | Desacoplamiento espacial | El broker es **cuello de botella y punto crítico de fallo** |
| **Red / clúster de intermediarios** | Replicación, tolerante a fallos, escalable: **la solución ideal** | **La más costosa** (se pasa de 1 a unas 8 máquinas) |
| **Comunicación a grupo** (multicast, próximo módulo) | Un mensaje llega a muchos | Poco común en el día a día |

### Simularlo con cliente-servidor

No son arquitecturas nuevas, sino **variantes de cliente-servidor**:
- **Client polling**: el cliente pregunta cada X tiempo (AJAX, programación reactiva). **Long polling**: el servidor se queda callado hasta que haya algo, así que **no se puede usar timeout**.
- **Server push**: el cliente deja abierto un canal en segundo plano y el servidor envía cuando quiere. Tecnologías: **HTTP server push** (notificaciones de correo), **Server-Sent Events** y **WebSocket**.
- Se usa más WebSocket que Kafka porque estamos más cómodos con cliente-servidor. Pero "si solo tienes un martillo, todo parece una puntilla": **usa la arquitectura que corresponde**.

### Cliente-servidor vs. editor-suscriptor: agregar un consumidor

Un generador de datos debe enviar a imprimir, almacenar y proyectar.
- **Cliente-servidor**: para agregar un cuarto consumidor (enviar por correo) hay que **modificar el cliente** para que también se conecte al servidor 4.
- **Editor-suscriptor**: el nuevo consumidor **solo se suscribe** al broker. No se toca nada más.
- **Pero** si el generador necesita **saber que cada consumidor terminó** (retroalimentación), cliente-servidor es mejor: su canal es **bidireccional**, mientras que en pub-sub nadie conoce a nadie.

## Parcial 1

- **40%**: cuestionario teórico **sincrónico**.
- **60%**: ejercicio práctico (proponer una arquitectura), con hora y media o el fin de semana.
- Hay una o dos preguntas sobre **peer-to-peer**, que no se alcanzó a ver: revisar el video que dejó el profesor.

## Para el examen

- Semánticas: arbitraria (0–N), al menos una vez (≥1, reintentos), como mucho una vez (0–1), exactamente una vez (=1).
- Al menos una vez + idempotencia ≈ exactamente una vez.
- Pub-sub = desacoplado en tiempo y espacio; push vs. pull; el broker único es punto de fallo.
- Client polling, long polling, server push y WebSocket simulan pub-sub con cliente-servidor.
