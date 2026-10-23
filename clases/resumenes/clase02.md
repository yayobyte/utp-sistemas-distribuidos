# Clase 02: Clúster vs. Grid (hardware e infraestructura)

> Fecha: 2026-09-10 · Fuente: `clases/clase02.txt` · Socialización del Taller 1

## Idea central

Un **clúster** junta muchos equipos iguales en un solo lugar para resolver **un problema a la vez** lo más rápido posible. Un **grid** une equipos distintos y dispersos para **compartir recursos** y atender **muchos problemas a la vez**. El hardware de cada uno se deriva de ese objetivo.

## 1. Clúster vs. Grid

| | Clúster | Grid |
|---|---|---|
| Objetivo | **Un problema a la vez**, en el menor tiempo (HPC: *high performance computing*) | **Muchos problemas** a la vez, compartiendo recursos (HTC: *high throughput computing*) |
| Nodos | **Homogéneos** (iguales) | **Heterogéneos** (distintos) |
| Ubicación | **Centralizado**: un mismo sitio | **Distribuido**: oficinas, sedes, incluso un portátil en un café |
| Red | **Alta velocidad, baja latencia** (microsegundos) | Red normal, latencia de milisegundos |
| Acoplamiento | Fuertemente acoplado (*tightly coupled*) | Débilmente acoplado (*loosely coupled*) |
| Almacenamiento | Compartido (NAS/SAN) | Cada nodo tiene el suyo |
| Métrica | FLOPS (como si fuera una sola máquina) | Trabajos por mes / años de cómputo |
| Estilo | Más sincrónico | Más asincrónico |
| Si un nodo falla | La tarea se **reparte entre los que quedan** y tarda más: se pierde rendimiento | Se pierden los recursos de ese nodo; el resto sigue igual, solo se atienden menos peticiones |

**Ejemplos de clúster:** renderizar una película animada (30 imágenes por segundo durante 2 horas), el modelo del IDEAM para pronosticar el clima de 7 días. La idea es pasar de días de cómputo a horas.

## 2. ¿Por qué el clúster necesita nodos homogéneos?

La tarea se parte en tantos pedazos como nodos hay (20 nodos = 20 pedazos). Si todos los nodos son iguales, cualquier pedazo tarda lo mismo en cualquier máquina y no hay que equilibrar a mano ("la tarea grande al equipo nuevo, la liviana al viejito").

## 3. ¿Por qué el clúster necesita red de alta velocidad?

El clúster **compite con un supercomputador centralizado**. Dentro de una sola máquina, los procesos se comunican por el **bus de datos de la board**, que es rapidísimo. En un clúster esa comunicación pasa por la **red**, así que la red debe ser lo más rápida posible para que no se note la diferencia.

## 4. Medios de transmisión

| Medio | Distancia sin repetidor | Notas |
|---|---|---|
| **UTP** (par trenzado de cobre) | **100 m** máx. entre switches | Cat 5/6/6E en casa y oficina; **Cat 8 llega a ~40 Gbps** en distancias cortas. Barato en total, aunque el cobre metro a metro es caro. Genera calor y ruido electromagnético. |
| **Coaxial** | ~500 m a 1 km | El de la televisión; hoy poco usado. |
| **Fibra óptica** | Casi sin límite (depende de emisor y receptor) | La más rápida, no genera calor ni interferencia. Es vidrio: frágil, no admite curvas cerradas (refracción = pérdida de datos). Lo caro son las tarjetas, los equipos terminales y la instalación. |

Precios aproximados mencionados: tarjeta Ethernet básica 45.000–100.000 COP; tarjetas de alta velocidad desde 800.000 COP hasta más de 2 millones.

## 5. Lección clave: no usar lo último en tecnología

- Si una tecnología la hace un solo fabricante, quedas **atado a ese proveedor**: si falla, esperas semanas o un experto del exterior.
- Anécdota del profesor: un clúster de 16–20 máquinas con las primeras tarjetas de 10 Gb de un solo fabricante. Las tarjetas estaban "en demo" y daban desconexiones intermitentes, sin forma de reemplazarlas rápido.
- Con **estándares**, una tarjeta dañada se cambia en media hora con una de cualquier tienda.
- **Tú cargas con la responsabilidad** de lo que recomiendas: no es Nvidia ni Cisco quien da la cara ante el gerente.
- En ingeniería **casi todo es "depende"**: no hay verdades blancas o negras.

## 6. Hardware necesario

**Clúster**
- Nodos homogéneos (servidores de rack si son muchos, de escritorio o VMs si son pocos).
- Red de alta velocidad: switches, cables, patch cords.
- Almacenamiento compartido (NAS/SAN).
- GPUs solo si la tarea lo pide (gráficos, IA).
- **Espacio físico**: sala o bodega con refrigeración, seguridad, control de acceso, UPS y planta eléctrica.
- **Administradores** que monitoreen, actualicen y reparen.

**Grid**
- Nodos de cualquier tipo, en cualquier lugar.
- Red normal: no hay presión de igualar a una máquina centralizada.
- No necesita un espacio dedicado.

## 7. Clúster HPC vs. clúster de alta disponibilidad

Hubo debate sobre la **redundancia**. La conclusión:

- Un **clúster HPC** no usa nodos de reserva: un nodo esperando sin trabajar es presupuesto desperdiciado. Si un nodo cae, la tarea se reparte y tarda más.
- Un **sistema de alta disponibilidad** (*high availability*) sí usa redundancia: para tener el rendimiento de 10 equipos con alta disponibilidad compras 20. Su objetivo es que el sistema **siempre responda**, no que responda más rápido.

## Para el examen

- Clúster = **un problema**, homogéneo, centralizado, red rápida, HPC.
- Grid = **muchos problemas**, heterogéneo, distribuido, compartir recursos, HTC.
- UTP = 100 m. Coaxial = ~500 m–1 km. Fibra = casi sin límite.
- Preferir **estándares** sobre tecnología nueva de un solo fabricante.
