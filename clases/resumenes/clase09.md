# Clase 09: Variantes de cliente-servidor (caché, proxy, jerárquico, scale-up/scale-out)

> Fecha: 2026-10-06 · Fuente: `clases/clase09.txt` · Tema 2: Arquitecturas

## Idea central

Si no queremos repartir carga con el cliente, hay **variantes del lado del servidor** para quitarle presión: **caché**, **proxy**, **servidores jerárquicos** y **varios servidores** (escalar). Cada una mejora algo, pero agrega su propia complejidad.

## 1. Cliente-servidor con caché

**Caché** = memoria temporal de corto plazo que guarda resultados para no volver a pedirlos o calcularlos.

| Dónde | Qué resuelve | Latencia |
|---|---|---|
| **En el cliente** | No vuelve a preguntar lo que ya sabe | Ni siquiera usa la red |
| **En el servidor** | Muchos clientes preguntan lo mismo ("dame el listado de usuarios") | Hay viaje por la red, pero no reprocesamiento |

**Ventajas:** menos latencia, menos uso del servidor, **modo desconectado**, y la posibilidad de guardar operaciones mientras el servidor no responde y enviarlas después.

**El problema: datos obsoletos.**
- ¿El servicio tolera datos viejos? El **saldo bancario** no; las **reglas de descuento** (que cambian poco) sí.
- **Coherencia** de la caché. Dos estrategias:
  - **Recargar cada cierto tiempo** (*prefetching*): por ejemplo, a medianoche. Pero puedes descargar datos que no cambiaron o que no se usarán, y gastas ancho de banda.
  - **Invalidar**: cuando cambia la fuente, avisar a todos los nodos con copia que ese dato venció.
- Ambas agregan **sobrecarga** y funcionalidad que no es del negocio.

**Anécdota del profesor:** un servidor de sockets para dispositivos móviles con 3G. Al hacer login, el dispositivo descargaba productos, precios y clientes para trabajar desconectado. A las 8 a. m. llegaban 500–1000 peticiones casi simultáneas pidiendo lo mismo. Con una caché en el servidor, el **80% de los datos ya estaba listo** y solo se procesaba el 20% restante.

## 2. Cliente-servidor con proxy

El **proxy** es un **concentrador**, un elemento **híbrido**: es servidor para los clientes y cliente para los servidores. **No procesa, redirige.** Identifica peticiones repetidas, envía **una sola** al servidor y responde a todos los que esperaban. Puede tener **caché**.

| Tipo | Dónde está | Qué es |
|---|---|---|
| **Forward proxy** | **Del lado de los clientes** | La cara visible de los clientes hacia la red. Ejemplo: el proxy HTTP de una empresa (evita dar IP pública a cada equipo). El router de la casa se parece, pero solo concentra y delega. |
| **Reverse proxy** | **Del lado de los servidores** | La cara visible del mundo hacia los servidores. Oculta cuántos son y dónde están. A veces el **firewall** cumple este rol (enruta por tipo o ruta). |
| **Open proxy** | En medio | Consolida varios forward proxies hacia el reverse proxy. |

**Beneficios:** **transparencia de ubicación** (el cliente no sabe cuál servidor responde), **menos carga** en los servidores (el reverse proxy responde lo común) y **escalabilidad**: puedes poner más proxies para segmentar clientes, y para el sistema es como si hubiera un solo cliente.

## 3. Servidores jerárquicos

En vez de un servidor que hace todo, se arma un **árbol de servidores**.

| División | Cómo funciona | Ejemplo |
|---|---|---|
| **Vertical** | **Cada nivel tiene una responsabilidad distinta**. Lo que un nivel no sabe hacer, lo pasa al siguiente. | Tres capas en servidores separados: presentación → lógica → base de datos. El cliente solo habla con presentación. También el banco: oficina → regional → nacional → internacional, en vez de que el cajero use dos aplicaciones. |
| **Horizontal** | **Varios servidores iguales** que se reparten la carga. Si uno no sabe algo, pregunta a sus "hermanos". | **DNS**: hay muchos servidores que convierten dominio en IP. Si el tuyo (8.8.8.8, 1.1.1.1) no conoce `utp.edu.co`, pregunta a otros hasta encontrarlo. Tú solo hablas con uno. |

En la división vertical se puede reforzar la capa que recibe más tráfico (presentación) y dejar pequeña la de datos.

## 4. Varios servidores: scale-up vs. scale-out

| | **Scale-up** (vertical) | **Scale-out** (horizontal) |
|---|---|---|
| Qué es | **Más recursos al mismo servidor** | **Más servidores** con copias del servicio |
| Ventaja | Simple; "amplía la boca de la botella" | Crece "casi sin límite" (el límite es el dinero) |
| Límite | **No es lineal** (el SO y los runtimes también limitan) y llega a un techo | Necesita un **repartidor de carga** |
| Tolerancia a fallos | No mejora: sigue siendo uno | **Mejora**: si cae un nodo, el servicio sigue |

La "interfaz de servicio" que reparte las peticiones puede ser un **balanceador de carga**, un **distribuidor de conexiones** o un **API Gateway**.

## 5. El problema de los datos en scale-out

Si cada servidor guarda sus propios datos, el servidor 1 registra una venta y el servidor 2 no sabe que existe.

1. Sacar los datos a **un servidor de BD único** → ese servidor se vuelve **cuello de botella y punto único de fallo**.
2. Hacer un **clúster o réplicas de la BD**.
3. Enviar cada escritura a **todos los servidores al mismo tiempo** = **replicación** (datos en espejo). Un nodo nuevo se clona de otro.

Esto lleva al tema de la siguiente clase: **cliente-servidor con alta disponibilidad**.

## Para el examen

- Caché: menos latencia y carga; riesgo de **datos obsoletos**; coherencia por recarga periódica o por invalidación.
- Forward = lado de los clientes; reverse = lado de los servidores; el proxy no procesa, redirige.
- Jerárquico vertical = responsabilidades distintas por nivel; horizontal = iguales que se ayudan (DNS).
- Scale-up = máquina más grande; scale-out = más máquinas + balanceador + sincronización de datos.
