# Taller 2: Aplicaciones de Modelos de Computación Distribuida

* **Asignatura:** Sistemas Distribuidos (IS893)
* **Docente:** César Augusto Díaz Arriaga
* **Estudiante:** Yayo Gutiérrez
* **Programa:** Ingeniería de Sistemas y Computación — Universidad Tecnológica de Pereira (UTP)
* **Google Classroom:** [Sistemas Distribuidos IS893](https://classroom.google.com/c/ODcyMDQwNDA5MjIw)

---

## 🎯 Objetivo de Aprendizaje

Al finalizar esta actividad, el estudiante tendrá la capacidad de nombrar algunos ejemplos de aplicaciones de los diferentes modelos de computación distribuida, para demostrar que estos conceptos se han utilizado para solucionar problemas de computación en el pasado y en la actualidad.

---

## 📌 Instrucciones del Taller

1. El estudiante realiza la consulta de los conceptos en cualquiera de las herramientas disponibles.
2. El estudiante diligencia el documento dando respuesta a cada una de las secciones requeridas.
3. Para cada ejemplo se mantiene la estructura requerida:
   ```text
   Ejemplo <Numero>: <Nombre> (<URL>)
   <Descripción de la aplicación>
   ```
4. El estudiante envía la tarea en Google Classroom y el docente califica los documentos enviados.

---

## 📚 Desarrollo: 2 Ejemplos por Modelo de Computación Distribuida

---

### 1. Cluster Computing

#### Ejemplo 1: Frontier Supercomputer (Oak Ridge National Laboratory) (https://www.top500.org/system/180047/)
Supercomputador exaescala operado por el Laboratorio Nacional Oak Ridge (ORNL) para el Departamento de Energía de EE.UU. Está compuesto por miles de nodos idénticos HPE Cray EX con procesadores AMD EPYC de 64 núcleos y aceleradores AMD Instinct MI250X, interconectados mediante una red dedicada de alta velocidad y baja latencia con topología Dragonfly (HPE Slingshot-11). El sistema opera dentro de un único datacenter y bajo un único dominio administrativo; el planificador Slurm presenta el conjunto de nodos a los usuarios como un único recurso de cómputo unificado para resolver simulaciones físicas, moleculares y climáticas que requieren comunicación fuertemente acoplada e intensiva mediante MPI.

#### Ejemplo 2: Pixar Render Farm (RenderMan + Tractor) (https://renderman.pixar.com/tractor)
Granja de renderizado que opera en el centro de datos de los estudios Pixar Animation. Está formada por servidores de cómputo dedicados, ubicados en un mismo sitio y conectados por una red de área local cerrada, que sintetizan fotogramas mediante el motor RenderMan (trazado de rayos / Path Tracing de Monte Carlo) sobre almacenamiento compartido. Los nodos son gestionados centralmente por Tractor, el gestor de colas distribuido de Pixar, que reparte miles de tareas de renderizado independientes bajo un único control administrativo corporativo, ejemplificando el modelo de clúster dedicado a procesamiento paralelo de alto rendimiento.

---

### 2. Grid Computing

#### Ejemplo 1: Worldwide LHC Computing Grid (WLCG - CERN) (https://wlcg.web.cern.ch/)
Infraestructura global de computación en malla diseñada para almacenar, distribuir y procesar los petabytes de datos generados anualmente por las colisiones de partículas del Gran Colisionador de Hadrones (LHC) en el CERN. Integra más de 170 centros de datos federados pertenecientes a universidades e institutos de investigación en más de 40 países. Su arquitectura se organiza en niveles jerárquicos (Tier 0, Tier 1, Tier 2) conectados sobre redes WAN de alta velocidad (como LHCOPN y GEANT), usando middleware grid estandarizado y mecanismos de autenticación federada (PKI / certificados X.509) para coordinar recursos heterogéneos bajo múltiples dominios administrativos independientes.

#### Ejemplo 2: Open Science Grid (OSG Consortium) (https://osg-htc.org/)
Consorcio y federación distribuida de centros de investigación y universidades de Estados Unidos que comparten recursos de cómputo y almacenamiento para la ciencia abierta. Basado en el paradigma de High-Throughput Computing (HTC) y orquestado mediante el middleware HTCondor, el OSG permite que trabajos de astrofísica, genómica, economía y física de altas energías aprovechen ciclos ociosos de supercomputadores y clusters independientes, federando su capacidad sin unificar su hardware ni su administración interna.

---

### 3. Volunteer Computing

#### Ejemplo 1: BOINC - Berkeley Open Infrastructure for Network Computing (https://boinc.berkeley.edu/)
Plataforma de middleware de código abierto desarrollada desde 2002 por la Universidad de California en Berkeley que permite a cientos de miles de voluntarios donar el tiempo inactivo de sus computadores personales y GPUs para proyectos de investigación científica mundial (como Einstein@Home, Rosetta@home o Climateprediction.net). El sistema se basa en un modelo cliente-servidor distribuido donde clientes no confiables descargan fragmentos de trabajo, ejecutan cálculos con prioridad baja de CPU/GPU y devuelven resultados validados mediante computación redundante (quórum) para mitigar nodos maliciosos o fallidos.

#### Ejemplo 2: Folding@home (https://foldingathome.org/)
Proyecto pionero de computación distribuida voluntaria, activo desde el año 2000, enfocado en simular la dinámica molecular y el plegamiento de proteínas para investigar enfermedades como el Alzheimer, el cáncer y el COVID-19. Cientos de miles de voluntarios instalan un software cliente que aprovecha de manera oportunista los recursos libres de sus CPUs y tarjetas gráficas personales cuando los equipos no se encuentran en uso intensivo, fragmentando simulaciones masivas en pequeñas unidades de trabajo cuyos resultados se integran en servidores centrales.

---

### 4. Utility Computing

#### Ejemplo 1: Sun Grid Compute Utility (Sun Microsystems, 2006) (https://en.wikipedia.org/wiki/Sun_Cloud)
Ejemplo histórico y emblemático del modelo de computación como servicio público. Lanzado por Sun Microsystems en marzo de 2006, ofrecía acceso por Internet a un gran conjunto de servidores (basados en Solaris 10 y Sun Grid Engine) a una tarifa fija de US$1 por CPU-hora. El usuario enviaba trabajos por lotes y pagaba únicamente por el consumo agregado de CPU, exactamente como se paga el agua o la electricidad, sin comprar ni administrar hardware. Evidencia que el concepto de utility computing existía como modelo de negocio medido antes de la popularización del término "cloud".

#### Ejemplo 2: Amazon Elastic Compute Cloud (Amazon EC2) On-Demand (https://aws.amazon.com/ec2/)
Servicio de infraestructura que materializa en la actualidad el concepto clásico de computación como servicio público esencial (al estilo del agua o la energía eléctrica). Amazon EC2 permite provisionar capacidad computacional en forma de máquinas virtuales redimensionables bajo un esquema tarifario estrictamente medido por segundo o por hora (*pay-as-you-go*). El consumidor no invierte en infraestructura física ni en su mantenimiento, sino que accede a recursos medibles que se facturan en proporción directa a la capacidad de procesamiento consumida.

---

### 5. Cloud Computing

#### Ejemplo 1: Microsoft Azure Cloud Platform (https://azure.microsoft.com/)
Plataforma integral de nube pública que suministra servicios en las tres capas de abstracción (IaaS, PaaS y SaaS). Provee agrupación de recursos multitenant a nivel global, aprovisionamiento mediante autoservicio bajo demanda, acceso ubicuo por red y rápida elasticidad. Alberga desde máquinas virtuales y contenedores (AKS) hasta bases de datos distribuidas globalmente (Cosmos DB), respaldadas por acuerdos de nivel de servicio (SLA) y gestión centralizada a través de paneles web y APIs declarativas.

#### Ejemplo 2: Salesforce (Software as a Service) (https://www.salesforce.com/)
Pionera del modelo SaaS desde 1999, Salesforce entrega su plataforma de gestión de clientes (CRM) completamente a través del navegador, sin instalación local. Su arquitectura es multitenant: miles de organizaciones comparten la misma infraestructura y la misma base de código, aisladas lógicamente mediante metadatos, y el proveedor aplica actualizaciones a todos los clientes de forma simultánea y transparente. El cliente consume el software como servicio bajo suscripción, con elasticidad y acceso ubicuo por red, sin administrar servidores, sistema operativo ni base de datos.

---

### 6. Mobile Computing

#### Ejemplo 1: Apple Continuity y Handoff (https://support.apple.com/en-us/102426)
Tecnología distribuida diseñada para entornos móviles donde el usuario cambia constantemente de dispositivo físico (iPhone, Apple Watch, iPad, MacBook). Mediante el uso conjunto de Bluetooth Low Energy (BLE) para descubrimiento de proximidad, Wi-Fi punto a punto mediante AWDL (Apple Wireless Direct Link) para transferencia directa de datos y la cuenta de iCloud compartida para autenticar los dispositivos del mismo usuario, permite que una actividad iniciada en un dispositivo (como redactar un correo o navegar una web) sea transferida y continuada en otro dispositivo cercano sin pérdida de estado.

#### Ejemplo 2: Google Maps Navigation con Android Auto (https://www.android.com/auto/)
Aplicación de computación móvil que opera en escenarios de movilidad física continua, redes celulares con conectividad variable y restricciones de energía. El sistema combina el procesamiento local en el dispositivo móvil (lectura de GPS, sensores y renderizado de mapas almacenados en caché) con comunicación cliente-servidor distribuida hacia centros de datos de Google para sincronizar condiciones de tráfico en vivo, incidentes y recalcular rutas óptimas en tiempo real.

---

### 7. Ubiquitous Computing / Internet of Things (IoT)

#### Ejemplo 1: Philips Hue Smart Lighting System (https://www.philips-hue.com/)
Ecosistema de computación ubicua donde la tecnología computacional se integra de manera invisible en el entorno cotidiano del hogar. Cada bombilla, interruptor y sensor actúa como un nodo embebido interconectado mediante el protocolo de red en malla (*mesh*) Zigbee de bajo consumo, coordinado por un concentrador local (*Hue Bridge*). El sistema detecta la presencia del usuario y adapta automáticamente la iluminación a los ritmos circadianos, sin que el usuario sea consciente de estar interactuando con una red distribuida de microcontroladores.

#### Ejemplo 2: AWS IoT Core (https://aws.amazon.com/iot-core/)
Servicio gestionado en la nube que permite interconectar miles de millones de dispositivos físicos y sensores industriales/domésticos con servicios distribuidos sin necesidad de aprovisionar servidores. Utiliza protocolos livianos de comunicación como MQTT, WebSockets y HTTPS, e implementa el concepto de *Device Shadow* (sombras de dispositivos), el cual almacena el estado virtual de cada dispositivo conectado, permitiendo que las aplicaciones lean e interactúen con el dispositivo incluso si este pierde temporalmente la conexión a la red.

---

### 8. Edge / Fog Computing

#### Ejemplo 1: Cloudflare Workers (https://workers.cloudflare.com/)
Plataforma de computación serverless en el borde (*Edge Computing*) que ejecuta código de usuario en aislamientos (*isolates*) de V8 en más de 330 ciudades de todo el mundo. En lugar de enrutar cada petición HTTP hasta un servidor centralizado en un centro de datos lejano, el cómputo se realiza en el nodo de red más cercano físicamente al usuario final, reduciendo la latencia de respuesta a pocos milisegundos y filtrando peticiones antes de alcanzar el servidor de origen.

#### Ejemplo 2: Cisco IOx (Fog Computing) (https://developer.cisco.com/docs/iox/)
Plataforma de Cisco, empresa que acuñó el término *Fog Computing*, que permite ejecutar aplicaciones (contenedores y paquetes Linux) directamente sobre routers, switches y gateways industriales ubicados entre los sensores y la nube. Esta capa intermedia de niebla recibe los datos de dispositivos de campo (fábricas, redes eléctricas, transporte), los filtra, agrega y analiza localmente, reacciona en tiempo cercano al real y envía a la nube solo la información resumida, reduciendo latencia y consumo de ancho de banda.

---

### 9. Autonomic Computing

#### Ejemplo 1: Kubernetes Horizontal Pod Autoscaler (HPA) con Control Loops (https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
Componente de orquestación distribuida que implementa un bucle de control cerrado equivalente al ciclo autonómico MAPE-K (*Monitor, Analyze, Plan, Execute over Knowledge*). El HPA monitoriza periódicamente métricas de CPU, memoria o métricas personalizadas de las aplicaciones, analiza la desviación respecto al objetivo definido, calcula el número de réplicas requeridas y ejecuta el escalado horizontal de pods de manera totalmente desatendida. Materializa la propiedad de auto-optimización (*self-optimizing*); dentro de Kubernetes la complementan otros bucles de control (kubelet y controladores de ReplicaSet) que aportan la auto-reparación reiniciando o reemplazando contenedores fallidos.

#### Ejemplo 2: Oracle Autonomous Database (https://www.oracle.com/autonomous-database/)
Base de datos en la nube que Oracle define como *self-driving*, *self-securing* y *self-repairing*, propiedades que se alinean con los principios del Autonomic Computing formulados por IBM: auto-configuración (aprovisionamiento y ajuste de parámetros del motor sin intervención de un DBA), auto-optimización (ajuste automático de consultas e índices mediante aprendizaje automático), auto-reparación (detección de fallos y conmutación por error) y auto-protección (aplicación automática de parches de seguridad y cifrado de datos sin tiempo de inactividad).

---

## 📋 Texto Plano para Diligenciamiento en Google Docs

A continuación se presenta el contenido en el formato exacto requerido por la plantilla de Google Classroom para copiar y pegar:

```text
Aplicaciones de Modelos de Computación Distribuida
Encontrar 2 ejemplos existentes de proyectos y/o aplicaciones para cada uno de los modelos de computación distribuida vistos en clase. De cada aplicación se debe relacionar el nombre, URL de la aplicación (o del artículo donde encontró dicho ejemplo) y una breve descripción que evidencie la pertenencia a dicho modelo.

Cluster Computing
Ejemplo 1: Frontier Supercomputer (Oak Ridge National Laboratory) (https://www.top500.org/system/180047/)
Supercomputador exaescala formado por miles de nodos idénticos HPE Cray EX interconectados por una red dedicada HPE Slingshot-11 de topología Dragonfly y baja latencia. Opera en un único datacenter y bajo un único dominio administrativo; el planificador Slurm presenta los nodos como un recurso de cómputo unificado para ejecutar simulaciones físicas y moleculares de alto rendimiento (HPC) que requieren comunicación fuertemente acoplada mediante MPI.

Ejemplo 2: Pixar Render Farm (RenderMan + Tractor) (https://renderman.pixar.com/tractor)
Granja de renderizado de animación por computadora localizada en el centro de datos de Pixar. Consiste en servidores de cómputo dedicados en un mismo sitio, con almacenamiento compartido, coordinados por el gestor de colas distribuido Tractor. Opera bajo una red de área local cerrada y un único control administrativo para repartir fotogramas y cálculos de trazado de rayos entre los nodos.

Grid Computing
Ejemplo 1: Worldwide LHC Computing Grid (WLCG - CERN) (https://wlcg.web.cern.ch/)
Infraestructura global de computación en malla que integra recursos de computación y almacenamiento de más de 170 centros de datos independientes en más de 40 países. Emplea middleware grid estandarizado y federación de identidades (PKI/X.509) para coordinar recursos heterogéneos y dispersos sobre redes WAN (GEANT/LHCOPN), procesando de forma desacoplada los petabytes de datos producidos por los experimentos del Gran Colisionador de Hadrones.

Ejemplo 2: Open Science Grid (OSG Consortium) (https://osg-htc.org/)
Federación distribuida de centros de datos universitarios y laboratorios nacionales de EE. UU. que comparten recursos computacionales heterogéneos bajo el modelo de High-Throughput Computing (HTC). Orquestado por el middleware HTCondor, permite a proyectos de astrofísica y genómica ejecutar millones de trabajos computacionales independientes aprovechando capacidades ociosas entre dominios autónomos.

Volunteer Computing
Ejemplo 1: BOINC - Berkeley Open Infrastructure for Network Computing (https://boinc.berkeley.edu/)
Plataforma middleware desarrollada desde 2002 por la Universidad de California en Berkeley que permite a cientos de miles de voluntarios donar ciclos de CPU y GPU de sus computadores personales para proyectos de investigación científica global. Emplea una arquitectura cliente-servidor distribuida con tolerancia a nodos no confiables y validación cruzada redundante de cálculos.

Ejemplo 2: Folding@home (https://foldingathome.org/)
Proyecto de computación voluntaria activo desde el año 2000, orientado a la simulación del plegamiento de proteínas y dinámica molecular para la investigación de enfermedades. Cientos de miles de voluntarios ejecutan un cliente ligero en segundo plano que descarga unidades de trabajo y utiliza la capacidad ociosa de sus tarjetas gráficas y procesadores para realizar simulaciones complejas.

Utility Computing
Ejemplo 1: Sun Grid Compute Utility (Sun Microsystems, 2006) (https://en.wikipedia.org/wiki/Sun_Cloud)
Servicio lanzado por Sun Microsystems en 2006 que ofrecía capacidad de cómputo por Internet a una tarifa fija de US$1 por CPU-hora. El usuario enviaba trabajos y pagaba solo por el consumo medido de CPU, como un servicio público de agua o electricidad, sin adquirir ni administrar hardware. Es un ejemplo histórico de utility computing anterior a la popularización del término cloud.

Ejemplo 2: Amazon Elastic Compute Cloud (Amazon EC2) On-Demand (https://aws.amazon.com/ec2/)
Servicio de infraestructura que provee capacidad de cómputo empaquetada como máquinas virtuales redimensionables bajo un modelo medido y tarifado por segundo o por hora (pay-as-you-go). El usuario accede a recursos bajo demanda sin inversión en hardware físico, consumiendo el procesamiento como un servicio público medible.

Cloud Computing
Ejemplo 1: Microsoft Azure Cloud Platform (https://azure.microsoft.com/)
Plataforma pública de computación en la nube que suministra servicios elásticos bajo demanda en los modelos IaaS, PaaS y SaaS. Ofrece recursos multitenant compartidos a escala global, autoservicio inmediato, balanceo de carga, elasticidad dinámica y disponibilidad garantizada mediante SLAs para aplicaciones empresariales.

Ejemplo 2: Salesforce (Software as a Service) (https://www.salesforce.com/)
Pionera del modelo SaaS desde 1999, entrega su plataforma CRM completamente a través del navegador. Su arquitectura multitenant hace que miles de organizaciones compartan la misma infraestructura y base de código, aisladas lógicamente, recibiendo actualizaciones simultáneas del proveedor. El cliente consume el software por suscripción sin administrar servidores ni bases de datos.

Mobile Computing
Ejemplo 1: Apple Continuity y Handoff (https://support.apple.com/en-us/102426)
Arquitectura distribuida para dispositivos móviles (iPhone, iPad, Mac, Apple Watch) que utiliza Bluetooth Low Energy para detección de proximidad, Wi-Fi punto a punto (AWDL, Apple Wireless Direct Link) para transferencia directa de datos y la cuenta de iCloud para autenticar los dispositivos del usuario. Permite continuar una tarea iniciada en un equipo en otro cercano sin perder su estado.

Ejemplo 2: Google Maps Navigation con Android Auto (https://www.android.com/auto/)
Aplicación de computación móvil que opera en entornos de alta movilidad física con conectividad celular intermitente. Combina la ejecución local en el smartphone (sensores GPS, brújula y renderizado local con mapas en caché) con comunicación hacia la infraestructura de nube para sincronizar datos de tráfico y recalcular rutas óptimas al vuelo.

Ubiquitous Computing/Internet of Things
Ejemplo 1: Philips Hue Smart Lighting System (https://www.philips-hue.com/)
Sistema de computación ubicua donde microcontroladores embebidos en luminarias y sensores se integran de manera invisible en el entorno doméstico. Los nodos se comunican mediante redes de malla Zigbee de bajo consumo coordinadas por un puente local (Hue Bridge), automatizando el ambiente con base en presencia y ritmos circadianos sin intervención explícita.

Ejemplo 2: AWS IoT Core (https://aws.amazon.com/iot-core/)
Plataforma distribuida que gestiona la conexión bidireccional y segura de miles de millones de sensores y actuadores físicos con servicios de nube. Emplea protocolos ligeros como MQTT y provee sombras virtuales de dispositivos (Device Shadows) para interactuar con los dispositivos físicos incluso cuando pierden conectividad de red.

Edge/Fog Computing
Ejemplo 1: Cloudflare Workers (https://workers.cloudflare.com/)
Plataforma de computación serverless en el borde que ejecuta funciones de usuario en cientos de puntos de presencia (PoPs) globales. Al procesar las solicitudes en el borde de la red, cerca del cliente final, reduce la latencia a pocos milisegundos y descongestiona los servidores centrales de origen.

Ejemplo 2: Cisco IOx (Fog Computing) (https://developer.cisco.com/docs/iox/)
Plataforma de Cisco, empresa que acuñó el término fog computing, que ejecuta aplicaciones en contenedores directamente sobre routers, switches y gateways industriales ubicados entre los sensores y la nube. Esta capa de niebla filtra, agrega y analiza localmente los datos de campo y envía a la nube solo la información resumida, reduciendo latencia y ancho de banda.

Autonomic Computing
Ejemplo 1: Kubernetes Horizontal Pod Autoscaler (HPA) con Control Loops (https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
Mecanismo de orquestación que implementa un bucle de control cerrado equivalente al ciclo autonómico MAPE-K (Monitor, Analyze, Plan, Execute). Mide periódicamente las métricas de carga, las compara contra el objetivo deseado, calcula el número de réplicas requeridas y escala horizontalmente los pods sin intervención de administradores humanos (auto-optimización).

Ejemplo 2: Oracle Autonomous Database (https://www.oracle.com/autonomous-database/)
Base de datos en la nube que Oracle define como self-driving, self-securing y self-repairing, propiedades alineadas con los principios autonómicos de IBM: autoconfiguración de recursos, autooptimización de consultas e índices mediante aprendizaje automático, autorreparación ante fallos y autoprotección mediante aplicación automática de parches de seguridad.
```

---

## 📊 Matriz Comparativa Resumen de los 9 Modelos

| Modelo | Enfoque Principal | Acoplamiento | Tipo de Red | Dominio Administrativo | Métrica Clave |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cluster** | HPC / Cómputo paralelo en un solo sitio | Fuerte (MPI) a moderado (granjas de render) | LAN dedicada de alta velocidad (InfiniBand / Slingshot / RoCE) | Único | FLOPS / Latencia de red |
| **Grid** | HTC / Federación de recursos | Débilmente acoplado | WAN / Redes académicas | Múltiple / Federado | Throughput / Trabajos/mes |
| **Volunteer** | Cómputo oportunista ciudadano | Muy débilmente acoplado | Internet público no confiable | Abierto / Descentralizado | Nodos activos / Quórum |
| **Utility** | Medición y tarificación por consumo | Variable según servicio | Red del proveedor / Internet | Proveedor de servicio | Costo por segundo o recurso |
| **Cloud** | Elasticidad, autoservicio y abstracción | Variable (IaaS/PaaS/SaaS) | Internet / VPN dedicada | Proveedor cloud multitenant | Elasticidad / SLA de servicio |
| **Mobile** | Portabilidad y cambio dinámico de contexto | Débil / Conectividad intermitente | Celular / BLE / Wi-Fi | Personal / Usuario móvil | Consumo de batería / Resiliencia |
| **Ubiquitous / IoT** | Integración invisible en el entorno físico | Red de malla / Eventos | Zigbee / Thread / BLE / MQTT | Local o nube personal | Densidad de nodos / Latencia sensorial |
| **Edge / Fog** | Procesamiento cercano a la fuente de datos | Distribuido perimetral | Red de borde / 5G / LAN local | Híbrido (local/nube) | Latencia / Ancho de banda ahorrado |
| **Autonomic** | Bucles cerrados de autocontrol (MAPE-K) | N/A (Paradigma de control) | N/A (Aplica a cualquier red) | Autónomo (Software/Agentes) | MTTD / MTTR / Reducción de intervención |
