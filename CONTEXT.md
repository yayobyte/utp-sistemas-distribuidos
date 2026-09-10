# Sistemas Distribuidos (IS893) - Contexto de la Asignatura

Este repositorio contiene las notas de clase, talleres, presentaciones, códigos y material de estudio para la asignatura **Sistemas Distribuidos** del programa de **Ingeniería de Sistemas y Computación** en la **Universidad Tecnológica de Pereira (UTP)**.

---

## 📌 Información General

* **Asignatura:** Sistemas Distribuidos
* **Código de Asignatura:** IS893
* **Programa:** Ingeniería de Sistemas y Computación
* **Institución:** Universidad Tecnológica de Pereira (UTP)
* **Docente:** César Augusto Díaz Arriaga
* **Contacto:** `black@utp.edu.co`

---

## 🎯 Objetivo General

Brindar al estudiante la fundamentación teórica y práctica necesaria para **interpretar, planear, diseñar y administrar un Sistema Distribuido**, completando su conocimiento sobre las diferentes alternativas para la construcción de sistemas de este tipo como Clúster, Grid, Cloud, entre otros.

---

## 📊 Sistema de Evaluación

| Componente | Porcentaje | Contenido / Descripción |
| :--- | :---: | :--- |
| **Parcial 1** | **20%** | • Introducción a los Sistemas Distribuidos<br>• Arquitecturas de Sistemas Distribuidos |
| **Parcial 2** | **20%** | • Comunicación en Sistemas Distribuidos<br>• Sistemas de Archivos Distribuidos y Paralelos<br>• Servicio de Nombres y de Directorios |
| **Parcial 3** | **20%** | • Gestión de Procesos<br>• Sincronización, Concurrencia y Transacciones<br>• Fiabilidad y Seguridad |
| **Actividades y Talleres** | **20%** | Investigación y talleres prácticos por capítulo |
| **Exposición** | **20%** | Profundización tecnológica (50% Presentación, 30% Quiz, 20% Asistencia) |
| **Total** | **100%** | |

---

## 📚 Distribución Temática por Evaluación

### 📝 Parcial 1 (20%)
1. **Introducción a los Sistemas Distribuidos**
   * Definición, ventajas, desventajas y falacias de la computación distribuida.
   * Modelos de computación distribuida: *Cluster, Grid, Volunteer, Utility, Cloud, Mobile, Ubiquitous/IoT, Edge/Fog, Autonomic Computing*.
   * Objetivos y transparencias (acceso, posición, migración, concurrencia, replicación, fallos, crecimiento, heterogeneidad).
2. **Arquitecturas de Sistemas Distribuidos**
   * Arquitecturas de software y hardware (Cliente-Servidor, P2P, Middleware, Event-driven, etc.).

---

### 📝 Parcial 2 (20%)
1. **Comunicación en Sistemas Distribuidos**
   * Protocolos de transporte, paso de mensajes, sockets, RPC (Remote Procedure Call), RMI (Remote Method Invocation), MOM / Message Queues.
2. **Sistemas de Archivos Distribuidos y Paralelos**
   * Arquitectura, semántica de compartición, caching, consistencia y replicación (e.g., NFS, HDFS, Lustre).
3. **Servicio de Nombres y de Directorios**
   * Resolución de nombres, entidades, DNS, directorios distribuidos, LDAP.

---

### 📝 Parcial 3 (20%)
1. **Gestión de Procesos**
   * Hilos (threads), virtualización, clientes/servidores, migración de código y balanceo de carga.
2. **Sincronización, Concurrencia y Transacciones**
   * Relojes físicos y lógicos (Lamport, Vector Clocks), exclusión mutua distribuida, algoritmos de elección, transacciones distribuidas y ACID.
3. **Fiabilidad y Seguridad**
   * Modelos de fallos, tolerancia a fallos, consenso distribuido (Paxos, Raft), replicación activa/pasiva y seguridad distribuida.

---

### 🛠️ Actividades y Talleres (20%)
* **Propósito:** Investigación o revisión de las aplicaciones del tema.
* **Metodología:** Durante cada capítulo, se plantearán actividades y talleres para que cada alumno pueda encontrar elementos que ayuden a dar claridad y aplicabilidad del tema revisado en clase.

---

### 🎤 Exposiciones (20%)
* **Propósito:** Profundizaciones de aplicaciones de sistemas distribuidos de manera individual o en parejas, para hacer una revisión de las tecnologías existentes donde se aplican de manera general los conceptos vistos en clase.
* **Criterios de Calificación:**
  * **50%** — Presentación
  * **30%** — Quiz
  * **20%** — Asistencia

---

## 📖 Bibliografía de Referencia

1. **Andrew S. Tanenbaum, Maarten Van Steen** — *Sistemas Distribuidos: Principios y Paradigmas*.
2. **George Coulouris, Jean Dollimore, Tim Kindberg, Gordon Blair** — *Sistemas Distribuidos: Conceptos y Diseño*.
3. **Francisco de Asís López Fuentes** — *Sistemas Distribuidos*.
4. **Edwin D. Reilly** — *Java Network Programming and Distributed Computing*.

---

## 📂 Convenciones y Estructura Sugerida del Repositorio

```text
.
├── CONTEXT.md                  # Contexto global y lineamientos de la materia
├── README.md                   # Presentación del repositorio
├── 0. CLASS_INTRO.txt          # Información inicial de clase
├── 1. INTRO.txt                # Notas y material del Tema 1
├── parcial_1/                  # Notas y material para Parcial 1
│   ├── intro/
│   └── arquitecturas/
├── parcial_2/                  # Notas y material para Parcial 2
│   ├── comunicacion/
│   ├── sistemas_archivos/
│   └── nombres_directorios/
├── parcial_3/                  # Notas y material para Parcial 3
│   ├── gestion_procesos/
│   ├── sincronizacion_concurrencia/
│   └── fiabilidad_seguridad/
├── actividades_talleres/        # Talleres y ejercicios prácticos
└── exposiciones/               # Diapositivas, investigación y código de exposiciones
```

---

## 🤖 Guía para Agentes de IA

Al interactuar o generar contenido dentro de este repositorio:
1. **Contexto Académico:** Todo el código, resúmenes y explicaciones deben alinearse con los conceptos de la materia (modelos distribuidos, consistencia, concurrencia, tolerancia a fallos, comunicación RPC/RMI/Sockets, etc.).
2. **Claridad y Rigor:** Explicar trade-offs de diseño (ej. coherencia vs. latencia, teorema CAP, escalabilidad vs. consistencia).
3. **Lenguajes y Herramientas habituales:** Java (RMI, sockets, threads), Python, Go, Docker/Contenedores, APIs REST/gRPC según las guías del curso.
