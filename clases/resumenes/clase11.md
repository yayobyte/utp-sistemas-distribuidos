# Clase 11: Aspectos de diseño de cliente-servidor (1 y 2): atención de clientes y gestión de conexiones

> Fecha: 2026-10-13 · Fuente: `clases/clase11.txt` · Tema 2: Arquitecturas

## Idea central

Cliente-servidor es la arquitectura **más usada** y, para sistemas distribuidos, **la más peligrosa**, porque depende de un componente que es cuello de botella y punto crítico de fallo. Por eso, al usarla hay que responder **cinco aspectos de diseño**. Esta clase cubre los dos primeros: **cómo atender a los clientes** y **cómo gestionar las conexiones**.

**Los cinco aspectos:**
1. Atención de clientes (secuencial, concurrente o por eventos).
2. Gestión de conexiones (una por petición o persistente).
3. Localización del servidor.
4. Servicio con estado o sin estado.
5. Comportamiento ante fallos.

## Aspecto 1: ¿cómo atiende el servidor a los clientes?

### Servidor secuencial

- **Una petición a la vez**: la primera en llegar es la primera en salir (cola FIFO).
- Muy **fácil** de implementar.
- Usa **todos los recursos** para una sola petición. Ideal para tareas enormes (renderizar una película), pero **desperdicia la máquina** con peticiones pequeñas (la lista de ciudades para un combo).

### Servidor concurrente: procesos vs. hilos

| | **Procesos** | **Hilos (threads)** |
|---|---|---|
| Qué son | Programas independientes que el **SO crea** con su propia memoria, CPU y contador de programa | "Subprocesos" que viven **dentro de un proceso** y **comparten su memoria** |
| Creación | **Lenta**: el SO reserva memoria y asigna CPU. **Más latencia** | **Rápida**: solo hace falta el contador de programa |
| Recursos por petición | **Muchos** (dedicados) | **Pocos**: con 1000 hilos, cada uno recibe ~1/1000 del tiempo del proceso |
| Riesgo | Llenan la máquina rápido → **denegación de servicio (DoS)**: la petición 21 no cabe | Los clientes se atienden peor a medida que hay más (se pierde la **transparencia de concurrencia**) |
| Comunicación | Memoria aislada | Memoria compartida, con **problemas de sincronización** |
| Cuándo usarlo | Peticiones de **alto cómputo** | Peticiones **pequeñas** y numerosas |

El proceso principal del servidor solo **escucha**: por cada petición crea un proceso o un hilo y vuelve a escuchar.

### Pool de procesos o hilos prearrancados

- Al arrancar, el servidor **deja listos N procesos**, y cada uno crea hilos para las peticiones. No hay que esperar al SO y la carga se reparte entre procesos.
- Problema: si llegan pocas peticiones, los procesos precargados **ocupan recursos sin hacer nada**.
- **Esquema híbrido**: un **mínimo** y un **máximo** de procesos. Si no hay ninguno libre, se crea uno; si uno está inactivo cierto tiempo, se destruye hasta volver al mínimo.

### Servidor basado en eventos

- **Un solo flujo de ejecución** atiende a **muchos clientes**. Mantiene un **pool de conexiones** (como un vector, una posición por cliente) y espera **un evento de cualquiera** de ellos (la espera simultánea de Unix, `select`).
- **Motivación**: es poco probable que todos los clientes pidan algo al mismo tiempo. Mientras un cliente analiza la respuesta, el servidor atiende a otro.
- **Ventajas**: no crea procesos ni hilos, cada petición tiene **todo el procesador** y la programación es **más sencilla** ("menos oscura").
- **Desventajas**: **peor escalabilidad**. Con muchísimos clientes las peticiones se encolan y en la práctica se vuelve secuencial.
- Depende del lenguaje: C lo soporta bien; en Python (según el profesor) hay que ir con hilos.

**El problema C10K** (los 10.000 clientes): la creación y destrucción de procesos e hilos penaliza con **baja concurrencia**; los eventos se quedan cortos con **alta concurrencia**.

> Los hilos son mala idea en la mayoría de los casos si el sistema no va a crecer mucho. Los eventos son mala idea en servidores de alta concurrencia.

## Aspecto 2: ¿cómo se gestionan las conexiones?

| | **Una conexión por petición** | **Conexión persistente** |
|---|---|---|
| Cómo funciona | Conectar → **una** petición → respuesta → **cerrar** | Conectar → **varias** peticiones → desconectar |
| Analogía del banco | **Cajero automático**: meter la tarjeta, hacer una cosa, sacarla, volver a empezar. O un cajero humano que solo acepta una transacción y te manda otra vez a la cola. | **Cajero persona**: esperas tu turno y haces todo lo que necesitas |
| Implementación | **Sencilla** | **Más compleja** (exige hilos o procesos; casi no encaja con eventos) |
| Sobrecarga | **Mayor**: reconectarse e identificarse cada vez | **Menor** |
| Escalabilidad horizontal | Fácil: cada petición puede ir a cualquier servidor | **Difícil**: todas las peticiones deben ir **al mismo servidor**, que debe recordar al cliente |
| Límite de clientes | No especial | El servidor admite **un número limitado** de conexiones |
| Extras | — | **Pipelining** (enviar la siguiente sin esperar la anterior) y **server push** |
| Para quien espera | Se le atiende rápido, pero cada vez vuelve a la cola | El que está conectado es muy bien atendido; los de la cola pueden sufrir **timeouts** |
| Datos | Cada petición lleva **todo el contexto** (el "tiquete del saldo") | El servidor recuerda el historial |
| Protocolos | TCP/IP, TCP Fast Open | — |

## Para el examen

- Secuencial = una a la vez. Concurrente = procesos (pesados, riesgo de DoS) o hilos (livianos, menos CPU por petición). Eventos = un solo flujo atiende a muchos esperando eventos.
- Pool prearrancado e híbrido (mínimo y máximo de procesos).
- Una conexión por petición = sencillo, más sobrecarga, fácil de escalar. Persistente = menos sobrecarga, pero atado a un servidor.
