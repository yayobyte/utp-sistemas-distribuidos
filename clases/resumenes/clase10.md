# Clase 10: Alta disponibilidad, replicación y código móvil

> Fecha: 2026-10-08 · Fuente: `clases/clase10.txt` · Tema 2: Arquitecturas

## Idea central

**Alta disponibilidad** = el sistema sigue respondiendo aunque se caiga un servidor. La única forma de lograrla es con **réplicas**, y eso obliga a decidir **cómo se sincronizan** los datos: replicación **activa** o **pasiva** (hot, warm o cold standby). Al final se presenta la última forma de depender menos del servidor: el **código móvil**.

## 1. Alta disponibilidad y consistencia

- Varios nodos capaces de hacer lo mismo, configurados para **soportar la caída** de uno o varios.
- Con datos replicados aparece la **consistencia**: al consultar, espero la versión más actualizada. Es parte de la **fiabilidad**.
- La alta disponibilidad **no es transparente** ni consiste en "tener un servidor espejo": hay que definir cómo se sincroniza.

## 2. Replicación activa vs. pasiva

| | **Activa** | **Pasiva (primario-secundarios)** |
|---|---|---|
| Quién recibe la petición | **Todos** los servidores | Solo el **primario** |
| Quién procesa | Todos procesan lo mismo | El primario procesa; luego **propaga el estado final** (no reprocesa) |
| Responsabilidad | El **cliente** envía a cada réplica y **espera a todas** | El primario responde y luego sincroniza |
| Si una réplica da error | Se revierte en todas (si solo está caída, se sigue con las demás) | — |
| Escrituras | **Más lentas con más nodos**: con 10 réplicas esperas 10 respuestas | Esperas una respuesta, pero el primario queda ocupado sincronizando |
| Uso típico | Tres bases de datos con la misma información | Primario + standby |

El "cliente" no tiene que ser el usuario final: la capa de lógica es **cliente** de la capa de datos.

## 3. Los tres modos de la replicación pasiva

| Modo | Cuándo sincroniza | Rendimiento | Riesgo de pérdida |
|---|---|---|---|
| **Hot standby** | **Inmediatamente** después de cada transacción | El más bajo: el primario hace dos trabajos (atender y sincronizar) y no puede aceptar cambios mientras propaga. Cerca de "la mitad" de capacidad. | Mínimo |
| **Warm standby** | **Por lotes**: cada X tiempo o X transacciones, o cuando el primario está libre | Mejor | Se puede perder **el último lote** sin sincronizar |
| **Cold standby** | **Cuando se decida**: a medianoche, en horas no pico. Los secundarios casi ni responden. | El mejor para atender usuarios | El más alto, como el backup que se hace "cuando me acuerdo" y el rayo quema el PC a las 5 p. m. |

**Por qué importa el rendimiento:** de nada sirve el mejor respaldo si cada "guardar" tarda un minuto. Y **agregar nodos no multiplica el rendimiento**: 2 nodos dan ~1,8×, no 2×, porque hay que gestionarlos.

**Combinación típica:** servidores de aplicación en scale-out (cada petición a uno distinto, para rendimiento) y la capa de datos aparte, con replicación activa o pasiva según el caso.

## 4. Código móvil

En vez de enviar **datos** ("haz X con estos parámetros"), se envía **código**.

| Variante | Qué viaja | Ejemplos |
|---|---|---|
| **Código bajo demanda** | El **servidor entrega código** que se ejecuta en el cliente. El servidor es un repositorio. | Applets de Java (hasta Java 8), Flash, reproductores multimedia, modelos 3D, **SPA** (Angular, React, Vue, Svelte; la interfaz de YouTube corre en tu navegador), **PWA** (se instalan como app nativa y se actualizan solas) |
| **Evaluación remota** | El **cliente envía un script** que el servidor ejecuta. El servidor "no sabe hacer nada", solo ejecuta lo que le mandan. | **SQL** (INSERT, SELECT), **PostScript** (impresoras), comandos de Cisco/routers, trabajos por lotes, pipelines de **CI/CD** |
| **Agentes móviles** | Un programa que **se mueve por su cuenta** entre máquinas, usa sus recursos y decide adónde ir y cuándo volver. Necesita un **middleware** en cada nodo. | Proyecto académico: un agente que salta de hospital en hospital reuniendo la historia clínica de un paciente. No llegó a producción por bases de datos distintas y falta de confianza. |

- Los agentes móviles fueron populares alrededor del 2000. Hoy se usan poco porque exigían perfiles muy especializados, pero el profesor cree que los agentes de IA podrían retomarlos.
- Un agente móvil **ya no es cliente-servidor puro**: no hay quien pida y quien responda, sino un componente autogestionado.
- (Un estudiante recordó la botnet que en 2016 tumbó parte de internet usando dispositivos IoT, la versión maliciosa de esta idea.)

## 5. Resumen: formas de depender menos del servidor

Cliente más grueso · caché · proxy · servidores jerárquicos · scale-out · replicación para alta disponibilidad · código móvil.

**Lo que viene:** los **cinco aspectos de diseño** de cliente-servidor: atender uno o muchos clientes, conexión por petición o persistente, localización del servidor, con o sin estado, y comportamiento ante fallos.

**Parcial:** será aplicado. Se dan uno o dos escenarios y hay que **proponer una arquitectura** con los conceptos de introducción y de las **cuatro arquitecturas del curso** (no microservicios).

## Para el examen

- Activa = todos procesan, el cliente espera a todos; las escrituras se hacen más lentas con más nodos.
- Pasiva = solo el primario; hot (inmediato), warm (por lotes, puede perder el último), cold (cuando se decida).
- Código bajo demanda = el servidor envía código (SPA). Evaluación remota = el cliente envía un script (SQL). Agente móvil = el código viaja solo.
