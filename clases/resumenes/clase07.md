# Clase 07: Arquitecturas y acoplamiento

> Fecha: 2026-09-29 · Fuente: `clases/clase07.txt` · Tema 2: Arquitecturas (Parcial 1)

## Idea central

La **arquitectura** es la **organización lógica de los componentes** de una aplicación distribuida: qué componentes hay, qué rol cumple cada uno y cómo interactúan. Es **lógica, no física**: se define sin saber en qué máquina se instala, en qué lenguaje se programa ni cómo se implementa.

## 1. El símil del arquitecto civil

| Arquitectura civil | Software |
|---|---|
| El arquitecto **diseña**, no construye | El arquitecto define **qué** construir, no **cómo** |
| Identifica componentes (cocina, baño, sala) | Identifica componentes (módulos, servicios, roles) |
| Define cómo se conectan (pasillos) | Define cómo **interactúan** los componentes |
| El ingeniero civil calcula y construye | El equipo de desarrollo e infraestructura implementa |
| Hay restricciones y presupuesto | Hay restricciones (latencia, fallos, costo) |

- Una casa y un apartamento son ambos vivienda, pero distribuyen distinto sus componentes (patio, baños, pisos).
- Un barrio no son solo casas: necesita colegio, parque, iglesia.
- El arquitecto tiene libertad creativa, pero sobre **patrones ya establecidos**.

## 2. Acoplamiento: el concepto más importante de la clase

**Acoplamiento** = qué tan dependientes son los componentes entre sí.

| Tipo | Pregunta |
|---|---|
| **Espacial** (dónde) | ¿Necesito conocer la identidad o dirección del otro para comunicarme? |
| **Temporal** (cuándo) | ¿Ambos deben estar **activos al mismo tiempo**? |

| Ejemplo | Espacial | Temporal |
|---|---|---|
| Llamada telefónica | Acoplado (necesitas el número) | Acoplado (ambos en línea) |
| Mensaje de voz de WhatsApp | Acoplado | **Desacoplado** (responde horas después) |
| Carta postal | Acoplado (necesitas la dirección) | **Desacoplado** |
| Transmisión en vivo | **Desacoplado** (el emisor no sabe dónde estás) | Acoplado (si no estás, te lo pierdes) |
| Anuncio en el tablón / Classroom | **Desacoplado** | **Desacoplado** |

**Trade-off:**

| Más acoplado | Menos acoplado |
|---|---|
| Respuesta inmediata, más rendimiento, más control | Más **tolerancia a fallos** y mantenibilidad |
| Si falla uno, falla todo | Más latencia y sin garantía de entrega |

> El acoplamiento no es bueno ni malo; depende. Para sistemas distribuidos lo ideal es **desacoplado**; para rendimiento, **acoplado**.

**Push notifications** = editor/suscriptor en modo push: no sé dónde estás (desacoplado espacial), pero te llega al instante (acoplado temporal).

| Cuadrante | Arquitectura / mecanismo |
|---|---|
| Acoplado + acoplado | Cliente-servidor tradicional |
| Desacoplado espacial + acoplado temporal | Editor-suscriptor (push, comunicación a grupo) |
| Desacoplado + desacoplado | **Colas de mensajes (MOM)**: ideal para sistemas distribuidos |
| Acoplado espacial + desacoplado temporal | Poco sentido práctico |

El **correo electrónico** deja el mensaje en un buzón central (Gmail): se parece más al tablón.

## 3. ¿Cuántas arquitecturas hay?

- **No existe una plantilla universal**: cada proyecto requiere su propio análisis.
- Se mencionaron: monolito, SOA, microservicios, serverless, event-driven, capas, publicador-suscriptor, peer-to-peer.
- **Un monolito no es mala práctica**: hacer microservicios por defecto es sobreingeniería.

**Las 4 arquitecturas "ortogonales" del curso** (resuelven problemas distintos):

| Arquitectura | Aplica a |
|---|---|
| **Maestro-Trabajador** | Solo sistemas distribuidos |
| **Cliente-Servidor** | Centralizados y distribuidos |
| **Editor-Suscriptor** | Ambos |
| **Peer-to-Peer** | Ambos |

## 4. Maestro-Trabajador

(También llamado maestro-esclavo; el profesor prefiere "trabajador".)

**Maestro:** recibe **todas** las tareas, las reparte, encola las que sobran, espera las respuestas, consolida y devuelve el resultado. Decide qué trabajador recibe cada tarea.

**Trabajador:** recibe una tarea, se dedica al 100% a ella y avisa al maestro cuando termina. Puede ser **genérico** o **especializado** (decisión del arquitecto).

**Reglas:** toda la comunicación pasa por el maestro. El usuario nunca habla con un trabajador y los trabajadores no se hablan entre sí.

**Acoplamiento alto en ambos ejes**: el maestro debe saber dónde está cada trabajador, y ambos deben estar activos.

## 5. Tolerancia a fallos en Maestro-Trabajador

| Falla… | Qué pasa |
|---|---|
| Un **trabajador** | El maestro lo reemplaza o redistribuye su tarea. El sistema sigue, más lento. |
| El **maestro** | **Punto crítico de fallo**: los trabajadores quedan inútiles y se pierde el estado de las tareas. |

> **Punto crítico de fallo ≠ cuello de botella.** El maestro no limita la velocidad (eso depende de cuántos trabajadores haya), pero si cae, cae todo.

**Soluciones:**
- **Maestro de respaldo (replicación)**: recibe cada avance del principal y lo reemplaza si falla. Costo: pagar un nodo que está "sentado sin trabajar".
- **Promoción / elección**: un **algoritmo de elección** convierte a un trabajador en el nuevo maestro.

Concepto relacionado que se verá más adelante: **idempotencia** (registrar el identificador de la transacción para poder reintentar sin duplicar).

## Para el examen

- Arquitectura = organización **lógica** de componentes, roles e interacción.
- Espacial = dónde. Temporal = cuándo. Push = desacoplado espacial + acoplado temporal.
- Las 4 ortogonales; maestro-trabajador es la única exclusiva de sistemas distribuidos.
- Maestro = punto crítico de fallo, no cuello de botella.
