# Clase 08: Cliente-Servidor y el reparto de funciones (cliente ligero vs. pesado)

> Fecha: 2026-10-01 · Fuente: `clases/clase08.txt` · Tema 2: Arquitecturas

## Idea central

**Cliente-servidor** es la arquitectura más conocida: un cliente **activo** pide y un servidor **pasivo** responde. Es simple, pero tiene **tres problemas**: el servidor es **cuello de botella** y **punto crítico de fallo**, y los recursos del cliente se **desperdician**. La primera solución es **repartir funciones** con el cliente, lo que define qué tan **grueso o delgado** es.

## 1. Repaso de maestro-trabajador

- Cuello de botella = **escalabilidad**. Punto crítico de fallo = **fiabilidad**.
- El maestro **no es** cuello de botella (la capacidad depende de cuántos trabajadores haya), pero **sí es** punto crítico de fallo.
- Soluciones: un **maestro espejo (shadow)** que recibe todo lo que recibe el maestro, o un **algoritmo de elección**. En el segundo caso, cada trabajador lleva "un maestro apagado" dentro (un dos en uno), lo que complica el desarrollo.

## 2. Arquitecturas de propósito general

**Cliente-servidor, editor-suscriptor y peer-to-peer**: sirven también para sistemas centralizados, pero los sistemas distribuidos se apoyan mucho en ellas.

## 3. Cliente-Servidor

| Rol | Comportamiento |
|---|---|
| **Cliente** | **Activo**: necesita algo y lo pide. |
| **Servidor** | **Pasivo**: espera peticiones, procesa, responde y vuelve a esperar. Nunca inicia nada. |

Analogía: ir a la empresa de servicios públicos a poner una queja. Tú (cliente) vas al asesor (servidor); si no llega nadie, el asesor no hace nada.

- **Acoplamiento alto en espacio y tiempo**: el cliente debe saber a qué servidor preguntar y necesita que lo atienda ya.
- El cliente debe **conocer qué servicios ofrece cada servidor** (no pides tu factura del agua en el banco).

**Los tres problemas:**

| Problema | Por qué |
|---|---|
| **Cuello de botella** | El servidor concentra toda la lógica. Su velocidad decide cuántos usuarios se atienden por unidad de tiempo. A diferencia del maestro-trabajador, no basta con agregar trabajadores. |
| **Punto crítico de fallo** | Si cae el servidor, cae todo el sistema. |
| **Recursos del cliente mal utilizados** | El PC del usuario (Core i5, 8 GB de RAM, 512 GB) solo captura datos, envía, recibe y muestra. Ejemplo: en el login, todo lo valida el servidor. |

## 4. El grosor del cliente

**Grosor** = cuánta responsabilidad del sistema recae en el cliente.

| | Cliente ligero (delgado) | Cliente pesado (grueso) |
|---|---|---|
| Hace | Muestra pantallas y captura datos | Valida, calcula, procesa (y a veces guarda) |
| Ejemplo | Una página que solo recibe HTML | Las apps de escritorio de bases de datos |
| Ventajas | **Mantenimiento barato**: actualizas el servidor y aplica para todos. **Más seguro**. | **Menos carga en el servidor** = atiende más usuarios. Más **autonomía** y sensación de **rapidez**. **Mejor escalabilidad**. |
| Desventajas | El servidor hace todo | Actualizar equipo por equipo y bloquear los desactualizados. **Cada cliente es un foco de inseguridad** (memoria accesible). Un cambio de regla de negocio obliga a actualizar todos los clientes. |

Ejemplos de lo que se puede delegar al cliente: validar que la edad sea un número, que la cédula no esté vacía, calcular el total, el IVA y los descuentos del carrito, o sumar la cantidad si un producto se repite.

Analogía: en un trabajo en grupo, si cada uno resuelve su parte y solo pregunta lo puntual, el profesor (servidor) puede atender a muchos más.

## 5. Formas de repartir las capas

Con tres capas (**presentación**, **lógica** y **datos**), el corte entre cliente y servidor puede caer en varios puntos. De más ligero a más pesado:

| # | En el cliente | En el servidor | Ejemplo |
|---|---|---|---|
| 1 | Parte de la interfaz (pintar HTML/CSS) | Construir la interfaz + lógica + datos | Web clásica que devuelve HTML (PHP) |
| 2 | Toda la interfaz | Lógica + datos | SPA que solo muestra y captura |
| 3 | Interfaz + **parte** de la lógica | Resto de la lógica + datos | Calcular totales en el cliente; Next.js (cliente y servidor) |
| 4 | Interfaz + **toda** la lógica | Solo la base de datos | App de escritorio conectada a una BD; SPA con Supabase/Firebase |
| 5 | Interfaz + lógica + **parte de los datos** | Parte de los datos | Juegos online (League of Legends), apps con **modo desconectado** que sincronizan después, Facebook que muestra fotos sin red, PWAs |

- La web ha ido y vuelto: *server-side rendering* → *single page application* → otra vez SSR. Con las SPA, el navegador del usuario carga con el procesamiento ("no es que Chrome se coma la memoria").
- Si eliges escritorio (Java, .NET), tendrás que construir un **gestor de actualizaciones** que no es parte de la funcionalidad.

## 6. Lo que viene

Otras variantes de cliente-servidor que se verán después: **con proxy**, **con caché**, **con varios servidores / alta disponibilidad** y **con código móvil** (en vez de mandar "qué tarea y con qué datos", se envía **el código** a ejecutar, del cliente al servidor o al revés).

## Para el examen

- Cliente = activo; servidor = pasivo.
- Tres problemas: cuello de botella, punto crítico de fallo y recursos del cliente desperdiciados.
- Cliente pesado = menos carga en el servidor, pero mantenimiento caro y menos seguro.
- Cliente ligero = mantenimiento barato y más seguro, pero el servidor hace todo.
