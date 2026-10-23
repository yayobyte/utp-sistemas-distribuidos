# Clase 12: Aspectos de diseño (3 y 4): localización del servidor (binder), con o sin estado, y leases

> Fecha: 2026-10-15 · Fuente: `clases/clase12.txt` · Tema 2: Arquitecturas

## Idea central

¿Cómo encuentra el cliente al servidor sin tener la dirección y el puerto "quemados"? Con un **binder**, un directorio de servicios. Después: ¿el servidor **recuerda** al cliente (con estado) o no (sin estado)? Y para detectar caídas se usan los **leases**.

## Repaso: gestión de conexiones

- **Una conexión por petición** → se atienden más usuarios con los mismos recursos.
- **Persistente** → los recursos quedan reservados para un cliente, siempre se habla con el mismo servidor y se pierde el escalado horizontal. Obliga al servidor a guardar estado.

## Aspecto 3: localización del servidor

**El problema:** lo habitual es configurar **máquina + puerto** (por ejemplo, `localhost:3306` para MySQL). Si el servicio se mueve, cambia de puerto o tiene varias copias, el cliente no se entera.

### El binder

Un servidor cuya **única función** es decir **dónde está** un servicio: guarda la relación **identificador del servicio → máquina y puerto**. No procesa nada ni guarda respuestas.

1. Al arrancar, el servidor **se registra** en el binder: "si preguntan por este servicio, estoy en tal puerto".
2. El cliente **pregunta** al binder por el servicio.
3. El binder **responde** con la máquina y el puerto.
4. El cliente se **conecta directamente** al servidor. El binder ya no participa.

> **Binder ≠ proxy.** El proxy se queda en medio de todas las peticiones; el binder solo responde "dónde" y luego se aparta.

- **Ventajas**: **transparencia de ubicación** y **migración**, menos **acoplamiento espacial**, soporte para varias réplicas (si una no responde, se usa otra) y para varias versiones del servicio. Puede funcionar como **repartidor de carga** ("vaya a la máquina 1, 2 o 3").
- **Paradoja**: para no depender de la dirección del servidor, agregamos otro servidor cuya dirección hay que conocer. El binder también es **cuello de botella y punto crítico de fallo**, aunque como solo hace una cosa es muy rápido.
- **Costo**: más **mensajes** (más tráfico) y más **latencia**. La conexión directa es la más rápida, pero la menos tolerante a fallos: **cuanto más desacoplado, más lento**.
- El **DNS** es el ejemplo más pequeño de binder. En microservicios, el binder dice dónde está el "servicio financiero" sin saber en qué pod o VM corre.

### Lo deseable del identificador de servicio

- **Ámbito global** (sirve para archivos, impresoras, bases de datos…).
- **Nombre de texto jerárquico**, fácil de recordar para un humano (como `utp.edu.co`, que se lee al revés, o como la ruta de un archivo).
- **Sin ubicación explícita** (nada de "máquina 1" o "el PC de la secretaria").
- Soporta **replicación** (un ID con varias instancias) y **versiones**.

### Cuatro modelos de localización

| Modelo | El cliente conoce | Analogía (llamar al vicerrector) |
|---|---|---|
| **Directo**: máquina + puerto | Máquina y puerto del servidor | Tienes su celular. Si cambia de número, lo pierdes. |
| **Binder local**: máquina + nombre del servicio | La máquina, el nombre del servicio y el puerto del binder local (en la máquina del servidor, que resuelve el puerto). Ej.: RMI Registry, Sun RPC. | Llamas al **PBX de la universidad** y pides "vicerrectoría". Si cambian la extensión, no importa. |
| **Binder global**: solo el nombre del servicio | Dónde está el binder global, que devuelve máquina + puerto | Las **páginas blancas**, el directorio telefónico de la ciudad. |
| **Global + local** (jerárquico) | Dónde está el binder global (que devuelve la máquina) y el puerto de los binders locales (que devuelven el puerto) | La **operadora** que te pasa con otra operadora de Bogotá. |

En el modelo global + local, el binder global **solo conoce máquinas** (responsabilidad menor) y el local maneja puertos y réplicas dentro de su máquina: es un servidor jerárquico.

## Aspecto 4: con estado vs. sin estado

| | **Con estado** (stateful) | **Sin estado** (stateless) |
|---|---|---|
| El servidor… | **Recuerda** los datos y la historia del cliente | **No sabe nada** del cliente |
| Mensajes | **Más cortos**: "ahora dame la desviación estándar" | **Más largos**: cada petición lleva todos los datos ("dame la moda" = vuelve a mandar el conjunto) |
| Rendimiento | Mejor: datos en memoria; puede ser **proactivo** (preparar el reporte mientras el usuario revisa) | Sin proactividad |
| Si el servidor falla | **Se pierde el estado** | **No pasa nada**: otro servidor atiende |
| Escalado horizontal | Difícil: todas las peticiones al **mismo servidor** | **Fácil**: a cualquier réplica |
| Memoria del servidor | Mayor | **Menor** |
| Sesión | Requiere inicio y fin de sesión | Menos mensajes de sesión |

> Para sistemas distribuidos, **sin estado es lo más eficiente**.

**¿Y la web?** **HTTP 1.x es sin estado** y una petición por conexión. El estado se **simula del lado del cliente**: **cookies** (viajan en cada mensaje), localStorage o sessionStorage, y **tokens JWT** para no autenticarse en cada petición. La mayoría de servidores web son realmente sin estado.

## Leases: detectar caídas

**Problema:** en cliente-servidor la llamada suele ser **bloqueante**. Si el servidor no responde, ¿está caído o solo ocupado? Un **timeout** fijo no lo distingue: si la respuesta tarda 2 min 5 s y el timeout es de 2 min, descartas una respuesta válida.

**Cómo funciona un lease:**
1. A le da a B un **lease** con vigencia (por ejemplo, 30 s).
2. Antes de que venza, B debe **renovarlo**. A responde con un lease nuevo.
3. Si B **no renueva** → A asume que B cayó y **libera los recursos** (no sigue procesando algo que nadie va a recibir).
4. Si A **no responde** a la renovación → B sabe que el servidor cayó y puede reenviar a otro, esperar o reintentar.

**Usos**: detectar caídas de clientes en binders, en editor-suscriptor y en cachés de sistemas de archivos distribuidos (si el cliente murió, su caché ya no tiene sentido). Con servicios **con estado** (FTP, CI/CD paso a paso), los leases permiten **cerrojos distribuidos**: el recurso queda bloqueado mientras el lease esté vivo. También ayudan a **recuperar** tras reiniciar: "este cliente renovó, debo tener una tarea pendiente suya; búsquemosla en el log".

## Para el examen

- Binder = guarda **ID del servicio → máquina + puerto**. Da transparencia de ubicación, pero agrega latencia y es un punto de fallo.
- Los cuatro modelos: directo, local, global y global + local.
- Sin estado = escala y tolera fallos; con estado = mensajes cortos y proactividad.
- Lease = permiso con vigencia que se renueva; sirve para **detectar caídas y recursos abandonados**.
