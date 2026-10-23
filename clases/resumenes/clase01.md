# Clase 01: ¿Por qué sistemas distribuidos?

> Fecha: 2026-09-08 · Fuente: `clases/clase01.txt` · Tema 1: Introducción

## Idea central

Los sistemas distribuidos aparecen cuando **una sola máquina ya no alcanza**. Los recursos de cómputo (procesador, memoria y almacenamiento) de un equipo tienen un techo físico y económico. Cuando el sistema necesita más, la única salida es repartir el trabajo entre varias máquinas.

## 1. El límite de crecer en una sola máquina

- En clase se buscó el equipo más grande que se puede comprar: un servidor empresarial de **896 núcleos y 48 TB de RAM**, por unos **USD 300.000** (miles de millones de pesos).
- Aun así, ¿alcanza para el buscador de Google, atendiendo a millones de usuarios en milisegundos? No.
- Con el mismo dinero se pueden comprar unos **400 computadores** de 8–9 núcleos y 16 GB de RAM. Juntos ofrecen una capacidad parecida (~3.600 núcleos, ~6.400 GB de RAM, ~1 PB de disco).
- Y no hay que comprarlos todos el primer día: se empieza con 10 y se agregan según crezca la demanda.

## 2. Un poco de historia

| Época | Modelo |
|---|---|
| Antes de los 80 | **Mainframes**: un computador enorme y carísimo; los usuarios usaban **terminales "brutas"** (monitor + teclado) conectadas por línea telefónica. Todo el proceso ocurría en el servidor. |
| Años 80 | Llega la computación personal. |
| Años 90 | Redes internas e inicios de internet. Se empieza a hablar de **sistemas distribuidos** (Coulouris, Tanenbaum). |

En el desarrollo tradicional, los módulos se comunican por **memoria** (llamadas a funciones, variables). En un sistema distribuido eso ya no es posible: hay que comunicarse por la red.

## 3. Dos definiciones clásicas

| Autor | Definición |
|---|---|
| **Coulouris** | Componentes de hardware o software ubicados en una red que **coordinan sus acciones mediante paso de mensajes**. |
| **Tanenbaum** | Colección de elementos de cómputo autónomos que **el usuario percibe como un solo sistema** coherente. |

Coulouris mira **cómo funciona por dentro** (mensajes). Tanenbaum mira **cómo lo ve el usuario** (un único sistema).

## 4. Características de un sistema distribuido

1. **Conjunto de nodos** conectados por una red. Los nodos pueden ser:
   - Máquinas físicas.
   - **Máquinas virtuales**: un ambiente independiente que emula una máquina completa sobre una física. Aíslan, permiten repartir recursos y consolidar (200 VMs en un servidor).
   - **Contenedores**: como una VM más liviana que **comparte el kernel del sistema operativo** del host. Un contenedor Linux necesita un host Linux.
2. **Red real o virtual**: las VMs y contenedores comparten la tarjeta del host y pueden hablarse por una red virtual.
3. **Sin memoria compartida**: no se puede leer fácilmente la memoria de otra máquina.
4. **Sin reloj común**: cada máquina tiene su propio reloj, que puede ir a otra velocidad.
5. **E/S asociada a cada nodo**: un sensor o un disco se conecta a un nodo concreto.
6. **Fallos independientes**: puede fallar algo que no es tu código (tarjeta de red, cable, switch, router).
7. **Heterogeneidad**: máquinas distintas en fabricante, SO, versión y velocidad.
8. **Imagen de sistema único** (*single system image*): el usuario no debería saber en qué máquina o puerto corre cada cosa. No siempre se logra ni siempre se desea.

## 5. Ventajas frente a un sistema centralizado

| Ventaja | Explicación |
|---|---|
| **Economía** | Mejor relación rendimiento/costo: varios equipos comunes en vez de uno gigante. |
| **Capacidad de crecimiento** | Empiezas con pocos nodos y agregas más cuando crece la demanda. |
| **Alto rendimiento** | Cada nodo tiene recursos propios, así que las tareas corren en paralelo de verdad. |
| **Aplicaciones inherentemente distribuidas** | Hay problemas que por naturaleza están repartidos. Ejemplos: un banco con oficinas que operan sus cuentas locales cuando se cae la línea nacional, o una cadena de supermercados en la que cada sede factura sola y luego consolida. |
| **Fiabilidad y disponibilidad** | Mayor tolerancia a fallos: si un nodo cae, el resto sigue. En un sistema centralizado no hay plan B. |
| **Carácter abierto y heterogéneo** | Se usan estándares. Si falla una memoria, se compra de cualquier fabricante que cumpla el estándar. |
| **Compartir recursos y datos** | CPU, RAM, disco y archivos se pueden compartir entre nodos. |

## 6. Desventajas

- **Nuevo software y nuevas formas de programar**: ya no es "doble clic al .exe"; hay muchos procesos en muchas máquinas que deben coordinarse.
- **La red introduce problemas**: pérdida de mensajes, saturación, **latencia** y **obsolescencia de datos** (cuando llega la respuesta, el dato ya cambió).
- **Seguridad y confidencialidad**: si los datos se comparten, hay que controlar quién ve qué (ventas, nómina).

> **Definición de Lamport:** "Un sistema distribuido es aquel en el que no puedes trabajar porque falló una máquina que ni siquiera sabías que existía". Ejemplo: la caída de AWS que tumbó a Bancolombia.

## 7. Las falacias de la computación distribuida

Una **falacia** es una afirmación que se da por cierta pero que en la realidad no lo es.

| Falacia | Por qué es falsa |
|---|---|
| La red es confiable | Puedes diseñarla bien, pero cualquier tarjeta, cable o conector puede fallar. |
| La latencia es cero | Siempre hay demora, y crece con cada nodo involucrado. |
| El ancho de banda es infinito | Siempre está limitado por el canal, incluso con fibra óptica. |
| La red es segura | Siempre hay riesgo, por buenos que sean los administradores. |
| La topología no cambia | La red cambia cada vez que entra o sale un equipo. |
| Hay un solo administrador | Son demasiados componentes (nodos, BD, red, seguridad) para una persona. |
| El costo de transporte es cero | Mantenimiento, obsolescencia, daños en la línea y el personal cuestan. |
| La red es homogénea | Los equipos nuevos nunca son iguales a los de hace 5 años. |

## Taller asignado

**Taller 1:** investigar el **hardware** necesario para montar un **clúster** y un **grid**, y cuándo conviene cada uno. Contexto: eres el jefe de TI y el gerente pregunta qué comprar.

## Para el examen

- Los tres recursos de cómputo: **procesador, memoria, almacenamiento**.
- Coulouris = paso de mensajes. Tanenbaum = se ve como un solo sistema.
- Las **8 falacias** y por qué cada una es falsa.
- VM vs. contenedor: el contenedor **comparte el kernel** del SO anfitrión.
