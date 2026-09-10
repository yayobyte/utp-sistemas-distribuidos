# Taller 1: Conceptos de Cluster y Grid — Análisis de Hardware y Diferencias

* **Asignatura:** Sistemas Distribuidos (IS893)
* **Docente:** César Augusto Díaz Arriaga
* **Estudiante:** Yayo Gutiérrez
* **Programa:** Ingeniería de Sistemas y Computación — Universidad Tecnológica de Pereira (UTP)
* **Google Classroom:** [Taller 1: Conceptos Cluster y Grid](https://classroom.google.com/c/ODcyMDQwNDA5MjIw/a/ODcyMDQwNDA5MjMy/details)
* **Objetivo de Aprendizaje:** Reconocer los conceptos de **CLUSTER** y **GRID** y los componentes de **Hardware** necesarios en su instalación, identificando los elementos críticos en la construcción de la infraestructura de sistemas distribuidos.

---

## 1. Fundamentación Teórica

### 1.1 ¿Qué es un Clúster?
Un **Clúster** es un conjunto de computadores independientes (denominados nodos) interconectados a través de una red local de alta velocidad y baja latencia, que trabajan de manera coordinada para comportarse y ser vistos por los usuarios como un **único sistema de cómputo de alto rendimiento** (*Single System Image*). Es un sistema **fuertemente acoplado**, generalmente homogéneo, ubicado en un mismo espacio físico (mismo rack o centro de datos) y bajo un **único dominio administrativo**.

### 1.2 ¿Qué es un Grid?
Un **Grid** (Computación en Malla) es una infraestructura que integra y coordina recursos heterogéneos y dispersos geográficamente (computadores, clústeres, unidades de almacenamiento, instrumentos científicos) pertenecientes a **múltiples dominios administrativos independientes** (organizaciones, universidades, centros de investigación). Es un sistema **débilmente acoplado** que comparte recursos dinámicamente mediante protocolos abiertos y seguros (e.g., Globus Toolkit), formando organizaciones virtuales (*Virtual Organizations - VOs*).

---

## 2. Hardware para la Conformación de un CLÚSTER

La infraestructura de un clúster está diseñada para maximizar el rendimiento computacional (*HPC - High Performance Computing*) y/o la alta disponibilidad (*HA - High Availability*). Sus componentes clave son:

```text
┌───────────────────────────────────────────────────────────────────────┐
│                           INFRAESTRUCTURA DE CLÚSTER                  │
│                                                                       │
│  ┌────────────────────┐                   ┌────────────────────────┐  │
│  │   Master / Head    │═══════════════════│  Storage Compartido    │  │
│  │       Node         │   Red Gestión     │  (SAN / NAS / NVMe-oF) │  │
│  └─────────┬──────────┘   (1 GbE / IPMI)  └───────────┬────────────┘  │
│            │                                          │               │
│  ══════════╪══════════════════════════════════════════╪═════════════  │
│            │   Red de Alta Velocidad (InfiniBand / RoCE / 100 GbE)    │
│  ┌─────────┴──────────┐  ┌───────────────────┐  ┌─────┴────────────┐  │
│  │  Compute Node 1    │  │  Compute Node 2   │  │  Compute Node N  │  │
│  │  (CPUs + GPUs/ECC) │  │(CPUs + GPUs/ECC)  │  │(CPUs + GPUs/ECC) │  │
│  └────────────────────┘  └───────────────────┘  └──────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
```

### A. Nodos de Cómputo (*Compute Nodes / Worker Nodes*)
* **Procesadores (CPU):** Procesadores multinúcleo para servidores (Intel Xeon Scalable, AMD EPYC) con soporte para instrucciones vectoriales (AVX-512, AMX).
* **Aceleradores Heterogéneos (GPUs / TPUs / FPGAs):** Tarjetas de cómputo científico y aprendizaje automático (NVIDIA H100, A100, L40S, AMD Instinct) conectadas vía PCIe Gen 5 o enlaces propietarios como NVLink.
* **Memoria RAM:** Módulos de alta velocidad DDR4/DDR5 con corrección de errores (**ECC - Error-Correcting Code**), dimensionados para mantener grandes volúmenes de datos en memoria (ej. 128 GB a 2 TB por nodo).
* **Homogeneidad:** Por lo general, los nodos de cómputo comparten una arquitectura idéntica de hardware para simplificar la planificación de tareas y evitar cuellos de botella por diferencias de rendimiento.

### B. Nodo Maestro / Controlador (*Head Node / Master Node*)
* **Función:** Servidor dedicado a la administración centralizada, gestión de colas y planificador de trabajos (Slurm, PBS Pro, Torque), autenticación de usuarios, monitorización y compilación.
* **Componentes:** Servidor con tolerancia a fallos (fuentes redundantes, RAID 1/10 en discos locales) y múltiples interfaces de red (una hacia la red interna del clúster y otra hacia la red pública/campus).

### C. Red de Interconexión de Alta Velocidad y Baja Latencia
* **Tecnologías de Red:**
  * **InfiniBand (HDR/NDR):** Proporciona anchos de banda de 200 a 400+ Gbps con latencias sub-microsegundo (< 1 µs) y soporte nativo para **RDMA** (*Remote Direct Memory Access*).
  * **RoCE (RDMA over Converged Ethernet) / High-Speed Ethernet:** 25/40/100/200/400 GbE para entornos de coste optimizado.
  * **Omni-Path:** Alternativa para interconexiones de computación masiva.
* **Topologías de Red:** Fat-Tree, Clos Network, 3D/nD Torus, Hypercube.
* **Switches de baja latencia:** Switches no bloqueantes (*non-blocking switches*) gestionados.

### D. Sistema de Almacenamiento Compartido y Paralelo
* **Sistemas de Archivos Paralelos:** Lustre, GPFS (IBM Spectrum Scale), Ceph, BeeGFS.
* **Hardware de Almacenamiento:**
  * Cabinas de almacenamiento **SAN (Storage Area Network)** vía Fibre Channel (32/64G FC) o iSCSI.
  * Soluciones **NVMe-over-Fabrics (NVMe-oF)** para acceso ultrarrápido a almacenamiento flash.
  * Controladoras RAID por hardware redundantes (RAID 6, RAID 60).

### E. Infraestructura Física, Soporte y Gestión Fuera de Banda
* **Racks Estándar:** Racks de 19 pulgadas (42U a 48U) de alta densidad (formato 1U, 2U o chasis *Blade*).
* **Gestión Fuera de Banda (OOB / IPMI):** Tarjetas iDRAC (Dell), iLO (HPE), BMC estándar conectadas a una subred de gestión 1 GbE para encendido remoto, KVM virtual y telemetría.
* **Suministro Eléctrico:** PDUs (*Power Distribution Units*) inteligentes y sistemas SAI/UPS industriales redundantes (N+1 o 2N).
* **Refrigeración:** Aire forzado de precisión (pasillo frío/pasillo caliente) o refrigeración líquida directa al chip (*Direct-to-Chip Liquid Cooling*) para nodos con alta densidad de GPUs.

---

## 3. Hardware para la Conformación de un GRID

A diferencia del clúster, un **Grid** no se construye adquiriendo un conjunto homogéneo de máquinas en una misma sala, sino integrando plataformas de cómputo y almacenamiento autónomas ya existentes:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              INFRAESTRUCTURA DE GRID                   │
│                                                                        │
│   ┌───────────────────────────┐      ┌───────────────────────────┐     │
│   │   ORGANIZACIÓN A (UTP)    │      │  ORGANIZACIÓN B (CERN)    │     │
│   │  ┌─────────────────────┐  │      │  ┌─────────────────────┐  │     │
│   │  │ Grid Gateway / C.A. │  │      │  │ Grid Gateway / C.A. │  │     │
│   │  └──────────┬──────────┘  │      │  └──────────┬──────────┘  │     │
│   │             │             │      │             │             │     │
│   │     [Clúster Local A]     │      │   [Supercomputador B]     │     │
│   └─────────────┼─────────────┘      └─────────────┼─────────────┘     │
│                 │                                  │                   │
│   ══════════════╪══════════════════════════════════╪════════════════   │
│                 Red de Área Extensa (WAN / Internet / RENATA / GEANT)  │
│                 │                                  │                   │
│   ┌─────────────┴─────────────┐      ┌─────────────┴─────────────┐     │
│   │  ORGANIZACIÓN C (UNAL)    │      │  ORGANIZACIÓN D (LAB X)   │     │
│   │  ┌─────────────────────┐  │      │  ┌─────────────────────┐  │     │
│   │  │ Grid Gateway / SRM  │  │      │  │ Storage Element SRM │  │     │
│   │  └──────────┬──────────┘  │      │  └──────────┬──────────┘  │     │
│   │             │             │      │             │             │     │
│   │     [Servidores / PCs]    │      │    [Cabinas Mass Storage] │     │
│   └───────────────────────────┘      └───────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

### A. Nodos de Recursos Heterogéneos (*Heterogeneous Resource Nodes*)
* **Naturaleza:** Los nodos del Grid pueden ser:
  * Clústeres completos con sus propios administradores locales.
  * Supercomputadores tradicionales (Cray, IBM).
  * Servidores independientes y granjas de servidores.
  * Estaciones de trabajo o PCs de sobremesa (en esquemas de Grid de escritorio / computación voluntaria).
  * Instrumentos científicos conectados (radiotelescopios, aceleradores de partículas, secuenciadores de ADN).
* **Heterogeneidad total:** Coexisten distintas arquitecturas (x86_64, ARM, POWER), diferentes capacidades de CPU, GPU, memoria RAM y sistemas operativos.

### B. Pasarelas de Acceso y Agentes de Recursos (*Grid Gateways / Gatekeepers / Resource Brokers*)
* **Servidores Front-End / Gateways:** Máquinas puente dedicadas a ejecutar el software de middleware Grid (Globus Toolkit, gLite, UNICORE, ARC).
* **Resource Brokers & Information Servers:** Servidores encargados de consultar el catálogo de recursos disponibles en toda la malla, emparejar las solicitudes de los usuarios (*matchmaking*) y despachar los trabajos a las organizaciones que tengan capacidad ociosa.

### C. Red de Interconexión de Área Extensa (WAN / Internet)
* **Infraestructura de Conectividad:**
  * Enlaces WAN globales, Internet público y redes académicas/científicas dedicadas (como **RENATA** en Colombia, **RedCLARA** en Latinoamérica, **GEANT** en Europa, **Internet2** en EE.UU.).
  * Routers de frontera de alta capacidad y switches BGP para encaminamiento global.
  * **Características:** Latencia no despreciable (ms o cientos de ms), ancho de banda variable y no garantizado, y paquetes enrutados por redes no confiables.

### D. Elementos de Almacenamiento Distribuido y Heterogéneo (*Storage Elements - SE*)
* **Gestión de Datos Distribuidos:** Storage Resource Managers (SRM), dCache, iRODS, GridFTP.
* **Hardware de Almacenamiento:** Múltiples tecnologías locales conectadas a la red:
  * Sistemas de almacenamiento en cinta magnética (LTO Tape Libraries) para archivo a largo plazo y bajo coste.
  * Cabinas de discos SAS/SATA/SSD heterogéneas en cada institución.
  * Almacenamiento en la nube o repositorios federados de datos.

### E. Servidores de Seguridad y Autenticación de Organización Virtual
* **Infraestructura de Clave Pública (PKI / X.509):** Servidores de Autoridad de Certificación (CA) dedicados para emitir y validar credenciales de usuarios y nodos entre organizaciones.
* **Servidores VOMS (*Virtual Organization Membership Service*):** Servidores que mapean roles y privilegios globales a usuarios en cada centro local.
* **Firewalls de Alta Capacidad y Pasarelas VPN:** Hardware de seguridad perimetral para aislar las redes internas de cada organización mientras se exponen exclusivamente los puertos del middleware Grid.

---

## 4. Tabla Comparativa de Hardware: Clúster vs. Grid

| Criterio de Hardware / Infraestructura | Clúster (Cluster Computing) | Grid (Grid Computing) |
| :--- | :--- | :--- |
| **Naturaleza de los Nodos** | **Homogénea**: Mismas CPUs, placas base, memoria y aceleradores. | **Heterogénea**: Mezcla de clústeres, supercomputadores, servidores y PCs. |
| **Tipo de Acoplamiento** | **Fuertemente acoplado** (*Tightly coupled*). | **Débilmente acoplado** (*Loosely coupled*). |
| **Red de Interconexión** | Red local dedicada de muy alta velocidad y ultra baja latencia (**InfiniBand, RoCE, 100+ GbE**). | Red de área amplia (**WAN, Internet, Redes Académicas** como RENATA/GEANT). |
| **Latencia de Red** | Menor a **1 microsegundo (< 1 µs)**. | Desde **varios milisegundos hasta cientos de ms**. |
| **Ubicación Física** | **Centralizada**: En una misma sala, pasillo de racks o centro de datos. | **Geográficamente dispersa**: Distribuida en ciudades, países o continentes. |
| **Dominio de Administración** | **Único**: Administrado por un solo equipo/departamento de TI. | **Múltiple / Federado**: Cada sitio tiene su propio administrador y políticas. |
| **Almacenamiento** | Compartido o paralelo de alta velocidad (**SAN, Lustre, GPFS, NVMe-oF**). | Distribuido y federado (**GridFTP, SRM, iRODS, librerías de cinta magnética**). |
| **Seguridad Física y de Red** | Seguridad perimetral del datacenter local; red privada interna. | Seguridad criptográfica federada (**PKI, Certificados X.509, VOMS, túneles seguros**). |
| **Componente de Gestión** | Nodo Maestro / Head Node con planificador local (Slurm, PBS). | Pasarelas Grid (*Gatekeepers*), *Resource Brokers* y servidores de metadatos. |
| **Tolerancia a la Variabilidad de HW** | Muy baja; se diseñan para consistencia de hardware. | Muy alta; el middleware abstrae la disparidad del hardware subyacente. |

---

## 5. Ejemplos Reales de Aplicación

* **Ejemplos de Clúster:**
  * **Supercomputadores del Top500:** Como *Frontier* (Oak Ridge National Laboratory), *Fugaku* (RIKEN) o clústeres locales universitarios para simulación de dinámica molecular y entrenamiento de redes neuronales.
  * **Granjas de renderizado:** Clústeres de servidores dedicados a procesamiento 3D en estudios de animación y cine.
  * **Clústeres de Alta Disponibilidad (HA):** Clústeres bancarios basados en replicación local síncrona.

* **Ejemplos de Grid:**
  * **WLCG (Worldwide LHC Computing Grid):** La malla de cómputo más grande del mundo, que conecta más de 170 centros de datos en más de 40 países para procesar los petabytes de datos generados por el Gran Colisionador de Hadrones (CERN).
  * **OSG (Open Science Grid):** Malla nacional en EE.UU. que comparte recursos computacionales entre universidades para proyectos de astrofísica, genómica y física de altas energías.
  * **Proyectos de Computación Voluntaria / Desktop Grid:** *Folding@home* (simulación de plegamiento de proteínas) y *SETI@home*.

---

## 6. Conclusiones

1. **Especialización vs. Agregación:** El hardware de un **clúster** se adquiere y configura específicamente para resolver problemas complejos de computación en paralelo masivo donde la velocidad de intercambio de mensajes en memoria y red es el factor limitante. Por el contrario, un **grid** aprovecha y agrega infraestructuras ya existentes para procesar cargas de trabajo de alto volumen desacopladas (*High Throughput Computing - HTC*).
2. **El rol crítico de la red:** Mientras que en un clúster la inversión en hardware se concentra fuertemente en switches no bloqueantes y tarjetas con soporte RDMA (InfiniBand), en un grid los componentes clave son los gateways, routers de frontera y sistemas de almacenamiento federado capaces de operar sobre redes WAN no confiables y de alta latencia.
3. **Coexistencia en la arquitectura distribuida:** Un Grid frecuentemente utiliza clústeres como sus nodos de cómputo básicos (*Tier-1* o *Tier-2* en la terminología de WLCG), demostrando que ambos conceptos son complementarios en la jerarquía de sistemas distribuidos modernos.
