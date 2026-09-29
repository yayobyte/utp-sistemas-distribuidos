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
│   ├── layout/                   # 🧭 Estructura de navegación
│   │   ├── AppShell/             # Sidebar + contenido; drawer en móvil
│   │   ├── Sidebar/              # Lista de talleres (estado y puntos) e información del curso
│   │   └── TallerLayout/         # Encabezado, pestañas enlazables y anterior/siguiente por taller
│   ├── ui/                       # 🧱 Primitivas UI reutilizables
│   │   ├── ComparisonTable/      # Matriz comparativa de 2 columnas (Clúster vs. Grid)
│   │   ├── DataTable/            # Tabla genérica con scroll horizontal en móvil
│   │   ├── BentoSplitCard/       # Tarjetas Bento Clúster vs. Grid
│   │   ├── AppleContinuityMockup/# Mockup interactivo MacBook + iPhone
│   │   ├── AppleEditorialCard/   # Tarjeta editorial minimalista con Action Blue
│   │   └── NumberedCard/         # Tarjeta de conclusiones con numeración sobredimensionada
│   ├── taller1/                  # 📑 Secciones del Taller 1
│   │   ├── TabHardwareArch/      # Visualizador 3D Three.js e inspector de hardware
│   │   ├── TabMatriz/            # Renderizador de la Matriz Comparativa
│   │   ├── TabCasosReales/       # Casos reales, Continuity y tarjetas editoriales
│   │   ├── TabDiferencias/       # 4 Bento cards de diferencias clave
│   │   └── TabConclusiones/      # 3 tarjetas numeradas + banner de entrega
│   ├── taller2/                  # 📑 Secciones del Taller 2
│   │   └── ModelSection/         # Modelo de computación con sus 2 ejemplos
│   ├── ClusterGrid3D.tsx         # Canvas 3D Three.js
│   └── Footer.tsx                # Pie de página institucional
├── data/                         # 📊 Capa de datos tipada y desacoplada
│   ├── talleres.registry.ts      # Registro único de talleres (rutas, estado, secciones)
│   ├── curso.data.ts             # Información del curso, evaluación, parciales y bibliografía
│   ├── taller1.data.ts           # Datos de criterios, casos, bento y conclusiones
│   └── taller2.data.ts           # 9 modelos, 18 ejemplos y matriz comparativa
└── pages/                        # 🧭 Vistas orquestadoras
    ├── HomePage.tsx              # Resumen: talleres y evaluación
    ├── CursoPage.tsx             # Información del curso
    ├── Taller1Page.tsx           # /talleres/1/:seccion
    └── Taller2Page.tsx           # /talleres/2/:seccion
```

---

## 📚 Documentación Adicional

* [CONTEXT.md](file:///Users/yayobyte/Workspace/UTP/Sistemas%20Distribuidos/CONTEXT.md) — Contexto completo de la asignatura, bibliografía Tanenbaum / Coulouris, y directrices para agentes de IA.
* [DESIGN.md](file:///Users/yayobyte/Workspace/UTP/Sistemas%20Distribuidos/DESIGN.md) — Sistema de diseño Apple (paleta de color, tipografía SF Pro, espaciados y especificaciones de componentes UI).
