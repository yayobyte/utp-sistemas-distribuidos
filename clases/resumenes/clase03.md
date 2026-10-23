# Clase 03: Aplicaciones y modelos de computación distribuida (parte 1)

> Fecha: 2026-09-15 (aprox.) · Fuente: `clases/clase03.txt` · Tema 1: Introducción · Modelos: Cluster, Grid, Volunteer, Utility, Cloud

## Idea central

Los sistemas distribuidos están en casi todo: empresas, big data, industria, internet, el hogar inteligente. Hay **nueve modelos de computación distribuida**. Cada uno responde de forma distinta a la pregunta: **¿de quién son los recursos y cómo se usan?**

## 1. Dónde se aplican los sistemas distribuidos

| Ámbito | Ejemplo |
|---|---|
| Entornos empresariales | Reemplazar mainframes y sistemas legados por varias máquinas que intercambian información. |
| Altas prestaciones (HPC) | Procesar grandes volúmenes o ejecutar programas que exigen muchos recursos. |
| Alta disponibilidad | Google, Amazon, Netflix, Facebook: deben responder siempre, desde cualquier lugar. |
| Bases de datos distribuidas | El banco con una base de datos en cada sede que intercambia información. |
| **Big Data** | Procesar **petabytes** de datos estructurados (BD, JSON, XML), no estructurados (logs) y binarios (video, audio) de muchas fuentes. Ej.: pronóstico del clima con datos de satélites y sensores, análisis de redes sociales. |
| Multimedia | Renderizado de películas, gestión de video. |
| Industria y control | Líneas de producción con robots y sensores. |
| **Internet** | El mejor ejemplo de sistema distribuido: nodos heterogéneos, sin reloj común ni memoria compartida, y aun así lo vemos como **un solo internet** (imagen de sistema único). |
| Sistemas ubicuos | Carros conectados, domótica, biometría, neveras, lavadoras y televisores inteligentes. |

## 2. Los nueve modelos

**Cluster · Grid · Volunteer · Utility · Cloud · Mobile · Ubiquitous · Edge/Fog · Autonomic**

Muchos eran una utopía hace 20 años; hoy son cotidianos. El avance de los últimos 10 años ha sido mayor que toda la historia anterior de la computación.

## 3. Cluster computing

- Dedicado a **un solo trabajo**. Puede buscar **altas prestaciones** (todo el recurso para reducir el tiempo) o **alta disponibilidad** (atender a más usuarios y seguir funcionando si algo falla).
- **Partición**: se puede segmentar un clúster (por ejemplo, con virtualización) para correr varias aplicaciones: 2 nodos para RR.HH., 3 para contabilidad, etc.
- **Fuertemente acoplado**: si falla un nodo, cambia el rendimiento de todo el sistema.
- **Poca dispersión geográfica**: idealmente un solo sitio, pero puede estar en varios edificios si la red es de alta velocidad.
- **Normalmente homogéneo**, aunque con el tiempo se vuelve heterogéneo: dentro de 10 años no vas a encontrar el mismo equipo para reemplazar uno dañado.
- **Estático**: el número de nodos cambia poco. Si se agrega uno, queda en 11 hasta la próxima necesidad.
- Hardware **estándar**.
- Necesita un **planificador de trabajos**: un nodo maestro que divide las tareas entre los nodos trabajadores.

## 4. Grid computing

- Como un "clúster global" entre comillas, pero su objetivo **no es el alto rendimiento**, sino ejecutar **muchas tareas a la vez**.
- **Menor acoplamiento**: si un nodo está ocupado o cae, simplemente no se le mandan tareas. No hay garantía de inmediatez: una tarea puede esperar horas.
- **Varios dominios de administración**: cada centro de datos puede ser de otro departamento u otra empresa, con sus propias reglas.
- **Recursos no dedicados**: el grid convive con los sistemas propios de cada organización y usa lo que esté ocioso.
- **Heterogéneo**: puede unir nodos sueltos, clústeres o ambos.
- **Dinámico**: pueden entrar y salir nodos, aunque entrar suele requerir un convenio formal.
- Los recursos son **simétricos**: todos los miembros pueden pedir y prestar.

## 5. Volunteer computing

- Como un grid, pero los recursos los **donan personas del común**, no empresas.
- Se donan **ciclos de CPU** y **almacenamiento** mientras el equipo está ocioso (por ejemplo, con el protector de pantalla). Cuando el dueño vuelve, el proyecto se detiene.
- Proyectos **altruistas**: Folding@home, SETI@home.
- **Asimetría de roles**: tú donas al proyecto, pero no puedes pedirle recursos al proyecto.
- **Anónimo**: el proyecto no sabe quién eres; las tareas se reparten sin elegir equipo.
- **Muy volátil**: hoy 100 voluntarios, en dos minutos ninguno. El ritmo de procesamiento es dinámico.

| | Grid | Volunteer |
|---|---|---|
| ¿Quién aporta? | Organizaciones | Individuos |
| Roles | Simétricos (todos dan y reciben) | Asimétricos (solo se dona) |
| Entrada/salida | Por convenio | En cualquier momento |
| Disponibilidad | Bastante estable | Muy volátil |

## 6. Utility computing

- La computación como un **servicio público**: como el agua, el gas o el teléfono. **Pagas por lo que consumes**; si no consumes, no pagas consumo.
- Ejemplo: alquilar 3 procesadores, RAM y disco durante 3 días, o escalar en Black Friday y pagar solo esos días.
- Es un **modelo de facturación**, no una plataforma.
- Idea de **John McCarthy en 1961**, cuando los computadores (después del ENIAC de 1945) se alquilaban por tiempo de uso con tarjetas perforadas.
- El reto: **cómo tarificar**. ¿Vale lo mismo mucho CPU y poco disco que poco CPU y mucho disco?

## 7. Cloud computing

- Recursos de cómputo a los que se accede **por la red, desde cualquier lugar**. Normalmente por internet, aunque no siempre.
- Tipos de nube:
  - **Pública**: abierta a todos por internet.
  - **Privada**: solo para una organización. Puede ser **on-premises** (tú administras todo, en tu oficina o en un centro de datos alquilado) y se puede acceder por VPN, intranet, línea dedicada o enlace físico privado.
- Modelos de servicio:

| Modelo | Qué te dan | Ejemplo |
|---|---|---|
| **IaaS** | Hardware **virtual**: VMs, redes virtuales, discos virtuales. Como comprar un computador que vive en el centro de datos del proveedor. | AWS EC2 |
| **PaaS** | Una **plataforma** lista (SO, runtime, BD). Solo te ocupas de tu app y tus datos; los parches del SO son problema del proveedor. | Plataforma para Java + BD, PHP, .NET + SQL Server |
| **SaaS** | La **aplicación** terminada. | Drive, Dropbox |

- **Colocation**: compras tu propio hardware físico y lo pones en el centro de datos de un tercero, que te da conectividad, energía, refrigeración y seguridad. Muy usado en el sector público colombiano porque "queda el aparato".
- Hay muchos "X as a Service" (almacenamiento, autenticación, funciones, contenedores, escritorio, pagos…), pero todos se resumen en **IaaS, PaaS o SaaS**.

## Para el examen

- Cluster = un trabajo, acoplado, estático. Grid = muchos trabajos, poco acoplado, dinámico, entre organizaciones.
- Volunteer = individuos, altruista, anónimo, asimétrico, volátil.
- Utility = pago por uso (McCarthy, 1961).
- Cloud = acceso por red desde cualquier lugar; IaaS → PaaS → SaaS.
