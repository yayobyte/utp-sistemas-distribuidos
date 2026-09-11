# 🌐 Sistemas Distribuidos (IS893) - UTP

Repositorio académico interactivo para la materia **Sistemas Distribuidos** del programa de **Ingeniería de Sistemas y Computación** en la **Universidad Tecnológica de Pereira (UTP)**.

---

## 👨‍🏫 Información Docente y Asignatura
* **Profesor:** César Augusto Díaz Arriaga
* **Email:** `black@utp.edu.co`
* **Código de Asignatura:** IS893
* **Programa:** Ingeniería de Sistemas y Computación
* **Institución:** Universidad Tecnológica de Pereira (UTP)
* **Google Classroom:** [Sistemas Distribuidos IS893](https://classroom.google.com/c/ODcyMDQwNDA5MjIw)

---

## ⚡ Aplicación Web Interactiva

La plataforma web interactiva del curso está desarrollada con **React 18 + Vite + TypeScript + Three.js**, siguiendo el **Apple Website Design System** con una arquitectura atómica por capas (Option 2).

### 🚀 Inicio Rápido
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 📋 Sistema de Evaluación y Temas

* **Parcial 1 (20%):**
  * Introducción a los Sistemas Distribuidos (*Cluster, Grid, Cloud, Edge, P2P*)
  * Arquitecturas de Sistemas Distribuidos (*Cliente-Servidor, Middleware, Event-driven*)
* **Parcial 2 (20%):**
  * Comunicación en Sistemas Distribuidos (*RPC, RMI, Sockets, MOM*)
  * Sistemas de Archivos Distribuidos y Paralelos (*NFS, HDFS, Lustre*)
  * Servicio de Nombres y de Directorios (*DNS, LDAP*)
* **Parcial 3 (20%):**
  * Gestión de Procesos (*Hilos, virtualización, migración de código*)
  * Sincronización, Concurrencia y Transacciones (*Relojes lógicos, Paxos, Raft, ACID*)
  * Fiabilidad y Seguridad (*Tolerancia a fallos, replicación activa/pasiva*)
* **Actividades y Talleres (20%):**
  * Talleres prácticos e investigación aplicada por capítulo (ej. [Taller 1: Clúster vs. Grid](https://classroom.google.com/c/ODcyMDQwNDA5MjIw/a/ODcyMDQwNDA5MjMy/details)).
* **Exposiciones (20%):**
  * Profundización sobre aplicaciones y tecnologías distribuidas (Presentación 50%, Quiz 30%, Asistencia 20%).

---

## 📂 Arquitectura de Componentes (Option 2: Atomic Primitives)

```text
src/
├── components/
│   ├── ui/                       # 🧱 Primitivas UI reutilizables
│   │   ├── ComparisonTable/      # Matriz comparativa genérica tipada
│   │   ├── BentoSplitCard/       # Tarjetas Bento Clúster vs. Grid
│   │   ├── AppleContinuityMockup/# Mockup interactivo MacBook + iPhone
│   │   ├── AppleEditorialCard/   # Tarjeta editorial minimalista con Action Blue
│   │   └── NumberedCard/         # Tarjeta de conclusiones con numeración sobredimensionada
│   ├── taller1/                  # 📑 Subcomponentes por pestaña de Taller 1
│   │   ├── Taller1Header/        # Header frosted, badges y selector de 5 pestañas
│   │   ├── TabHardwareArch/      # Visualizador 3D Three.js e inspector de hardware
│   │   ├── TabMatriz/            # Renderizador de la Matriz Comparativa (12 criterios)
│   │   ├── TabCasosReales/       # Casos reales, Continuity y tarjetas editoriales
│   │   ├── TabDiferencias/       # 4 Bento cards de diferencias clave
│   │   └── TabConclusiones/      # 3 tarjetas numeradas + banner de entrega
│   ├── ClusterGrid3D/            # Canvas 3D Three.js
│   ├── GlobalNav/                # Barra de navegación principal estilo Apple
│   ├── SubNav/                   # Navegación secundaria contextual
│   └── Footer/                   # Pie de página institucional
├── data/                         # 📊 Capa de datos tipada y desacoplada
│   ├── taller1.data.ts           # Datos de criterios, casos, bento y conclusiones
│   └── taller1.data.d.ts         # Contratos e interfaces de datos
└── pages/                        # 🧭 Vistas orquestadoras
    ├── HomePage.tsx
    ├── TalleresPage.tsx
    ├── Taller1Page.tsx           # Orquestador modular (28 líneas)
    ├── ParcialesPage.tsx
    └── ExposicionesPage.tsx
```

---

## 📚 Documentación Adicional

* [CONTEXT.md](file:///Users/yayobyte/Workspace/UTP/Sistemas%20Distribuidos/CONTEXT.md) — Contexto completo de la asignatura, bibliografía Tanenbaum / Coulouris, y directrices para agentes de IA.
* [DESIGN.md](file:///Users/yayobyte/Workspace/UTP/Sistemas%20Distribuidos/DESIGN.md) — Sistema de diseño Apple (paleta de color, tipografía SF Pro, espaciados y especificaciones de componentes UI).
