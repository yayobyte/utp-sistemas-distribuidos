# Clase 05: Repaso de los modelos y dudas frecuentes

> Fecha: 2026-09-22 · Fuente: `clases/clase05.txt` · Tema 1: Modelos de computación distribuida

## Idea central

Clase de repaso en grupo de los nueve modelos. Se aclararon tres confusiones comunes: **qué cuenta como SaaS**, **cuándo algo es ubicuo y no móvil**, y **la diferencia entre Edge y Fog**.

## 1. Repaso rápido

| Modelo | Lo esencial |
|---|---|
| Cluster | Máquinas similares en un mismo lugar. Sirve para **alto rendimiento** o para **alta disponibilidad**. |
| Grid | Nodos de empresas o sucursales (propias o por convenio) que **comparten recursos**. Es el modelo más común en las soluciones reales porque tiene menos restricciones. |
| Volunteer | Como un grid, pero los recursos los ceden **personas del común**. Mucha capacidad, pero volátil. |
| Utility | Lo que lo define es **la forma de facturar**: un costo fijo de acceso más el consumo real; la factura es dinámica. |
| Cloud | Recursos ubicados **en la red**; nube pública, privada o híbrida; se paga por un servicio (IaaS, PaaS, SaaS). |
| Mobile | Usar laptops, tablets y celulares para **delegarles parte del procesamiento**. |
| Ubiquitous | Dispositivos del ambiente que capturan y envían datos **sin interacción humana directa**. |
| Edge/Fog | Procesar **cerca del usuario** para reducir la latencia. |
| Autonomic | Sistemas que se autoconfiguran, autorreparan, autooptimizan y autoprotegen. |

## 2. Duda: ¿cualquier página web es SaaS?

- **IaaS**: tú administras el SO, las herramientas, las apps y el mantenimiento.
- **PaaS**: te dan un **ambiente de ejecución**, y el proveedor decide qué se puede usar. Si soporta Java 21 y tu app es Java 25, no se puede. Si solo ofrece MySQL, usas MySQL.
- **SaaS**: el proveedor ofrece **la aplicación**; tú solo la usas (Spotify, Netflix, Google Search, chats de IA).
- Respuesta del profesor: **cualquier software accesible por la red que le sirva a alguien es SaaS**, porque no es plataforma ni infraestructura. No hace falta que guardes tus datos en él. Detrás de eltiempo.com hay alguien que compró infraestructura, montó SO, herramientas y app, y la mantiene.
- Antes de Netflix la solución era alquilar un casete; Netflix es software como servicio.
- **Multi-tenant no es obligatorio en SaaS**: puedes tener un servidor por cliente (`cliente1.contable.com`, `cliente2.contable.com`) y sigue siendo SaaS, porque el proveedor gestiona todo. Una sola instalación compartida es **una buena práctica** (10 instalaciones = 10 problemas latentes), no un requisito del modelo.
- Una página estática solo en HTML y CSS a veces "queda clasificada" como cloud, aunque no siempre lo es estrictamente.

## 3. Duda: ¿mobile o ubiquitous?

- **Mobile**: *yo decido* usar mi dispositivo para hacer una tarea.
- **Ubiquitous**: el dispositivo **ya está haciendo la tarea** de forma permanente: el smartwatch, el sensor de presencia del baño, la cámara del supermercado que preclasifica robos, el **tag del peaje**, las compuertas automáticas de un embalse.
- La computación ubicua **no nació con IoT**. Los sensores de fábrica y los edificios inteligentes que abrían puertas con la huella ya eran ubicuos.
- **IoT** (de unos 8–10 años para acá) solo resume que hoy hay tecnología barata para que esos pequeños dispositivos **se conecten directamente a internet**.
- Si el sistema usa sensores como entrada y máquinas o pantallas como salida (sin teclado ni mouse), es computación ubicua. La automatización industrial es computación ubicua aplicada.

## 4. Duda: ¿Edge o Fog?

- Nació por la **migración de on-premises a la nube**: la nube suele estar lejos (por ejemplo, en Virginia, EE. UU.), y eso da tiempos de respuesta peores.
- **Edge**: el procesamiento ocurre **en el mismo dispositivo** o muy cerca de él (por ejemplo, una Raspberry Pi que cuenta los carros por hora y solo envía el resultado).
- **Fog**: una **capa intermedia de nodos** entre los dispositivos y la nube que responde con menor latencia.
- Ejemplos: **AWS CloudFront** y los **previews de Netflix**, que se reproducen al instante porque el contenido estático está en un nodo cercano.
- Ojo: si tienes clientes en todo el mundo, necesitas nodos en todo el mundo.

## 5. Autonomic

- Lo que se busca: un modelo de cómputo **sin intervención humana**. Hoy toda la computación depende de personas, y por eso falla.
- Ejemplo: Iron Man hace traje tras traje (control humano), pero **Ultron** se gestiona, se repara, se reconfigura y se protege solo.
- La móvil y la ubicua también fueron utopías en su momento; hoy cualquiera tiene una cerradura inteligente.

## Para el examen

- SaaS = cualquier app que el proveedor ofrece completa; multi-tenant no es requisito.
- Utility se distingue por **cómo se factura**.
- Ubiquitous = el dispositivo ya trabaja solo; IoT = esos dispositivos conectados directamente a internet.
- Edge = en o junto al dispositivo; Fog = capa intermedia; ambos complementan la nube.
