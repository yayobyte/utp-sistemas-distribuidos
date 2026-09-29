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
Supercomputador exaescala homogéneo operado por el Laboratorio Nacional Oak Ridge (ORNL) para el Departamento de Energía de EE.UU. Está compuesto por miles de nodos idénticos HPE Cray EX con procesadores AMD EPYC de 64 núcleos y aceleradores AMD Instinct MI250X, interconectados mediante una red dedicada de ultra-alta velocidad y topología Dragonfly (Cray Slingshot-11) con latencias submicrosegundo. El sistema opera dentro de un único datacenter, bajo un único dominio administrativo y ofrece una Single System Image (SSI) gestionada por Slurm para resolver simulaciones físicas, modelado molecular y climáticas que requieren comunicación fuertemente acoplada e intensiva mediante MPI.

#### Ejemplo 2: Pixar RenderMan Cluster (https://renderman.pixar.com/tractor)
Granja de renderizado masivo y de alto rendimiento que opera en el centro de datos principal de los estudios Pixar Animation. Consiste en miles de servidores de cómputo homogéneos en rack dedicados exclusivamente a la síntesis de fotogramas mediante algoritmos de trazado de rayos (Path Tracing de Monte Carlo) sobre almacenamiento paralelo SAN/NAS de alta velocidad. Los nodos están gestionados centralmente por el motor distribuido Pixar Tractor, que despacha tareas homogéneas bajo una red de área local cerrada y un único control operativo corporativo, ejemplificando el modelo de clúster dedicado a procesamiento paralelo de alta densidad.

---

### 2. Grid Computing

#### Ejemplo 1: Worldwide LHC Computing Grid (WLCG - CERN) (https://wlcg.web.cern.ch/)
Infraestructura global de computación en malla diseñada para almacenar, distribuir y procesar los petabytes de datos generados anualmente por las colisiones de partículas del Gran Colisionador de Hadrones (LHC) en el CERN. Integra más de 170 centros de datos federados pertenecientes a universidades e institutos de investigación en más de 40 países. Su arquitectura se organiza en niveles jerárquicos (Tier 0, Tier 1, Tier 2) conectados sobre redes WAN de alta velocidad (como LHCOPN y GEANT), usando middleware grid estandarizado y mecanismos de autenticación federada (PKI / certificados X.509) para coordinar recursos heterogéneos bajo múltiples dominios administrativos independientes.

#### Ejemplo 2: Open Science Grid (OSG Consortium) (https://osg-htc.org/)
Consorcio y federación distribuida de centros de investigación y universidades de Estados Unidos que comparten recursos de cómputo y almacenamiento para la ciencia abierta. Basado en el paradigma de High-Throughput Computing (HTC) y orquestado mediante el middleware HTCondor, el OSG permite que trabajos de astrofísica, genómica, economía y física de altas energías aprovechen ciclos ociosos de supercomputadores y clusters independientes, federando su capacidad sin unificar su hardware ni su administración interna.

---

### 3. Volunteer Computing

#### Ejemplo 1: BOINC - Berkeley Open Infrastructure for Network Computing (https://boinc.berkeley.edu/)
Plataforma de middleware de código abierto desarrollada por la Universidad de California en Berkeley que permite a millones de ciudadanos donar el tiempo inactivo de sus computadores personales, tabletas y GPUs para proyectos de investigación científica mundial (como Einstein@Home, Rosetta@home o Climateprediction.net). El sistema se basa en un modelo cliente-servidor distribuido donde clientes no confiables descargan fragmentos de trabajo, ejecutan cálculos con prioridad baja de CPU/GPU y devuelven resultados validados mediante computación redundante (quórum) para mitigar nodos maliciosos o fallidos.

#### Ejemplo 2: Folding@home (https://foldingathome.org/)
Proyecto pionero de computación distribuida voluntaria enfocado en simular la dinámica molecular y el plegamiento de proteínas para descubrir tratamientos contra enfermedades como el Alzheimer, el cáncer y el COVID-19. Miles de voluntarios instalan un software cliente que aprovecha de manera oportunista los recursos libres de sus CPUs y placas de video personales cuando los equipos no se encuentran en uso intensivo, fragmentando cálculos termodinámicos masivos en pequeñas unidades de trabajo que se sintetizan en servidores centrales.

---

### 4. Utility Computing

#### Ejemplo 1: Amazon Elastic Compute Cloud (Amazon EC2) On-Demand (https://aws.amazon.com/ec2/)
Servicio de infraestructura que materializa el concepto clásico de computación como servicio público esencial (al estilo del agua o la energía eléctrica). Amazon EC2 permite provisionar capacidad computacional en forma de máquinas virtuales redimensionables bajo un esquema tarifario estrictamente medido por segundo o por hora (*pay-as-you-go*). El consumidor no invierte en infraestructura física ni en su mantenimiento, sino que accede a recursos elásticos y medibles que se facturan en proporción directa a la capacidad de procesamiento consumida.

#### Ejemplo 2: Google Cloud Compute Engine (https://cloud.google.com/compute)
Servicio de IaaS que ofrece capacidad de cómputo empaquetada y medible en la red global de Google. Implementa un modelo de facturación fraccionada por segundo con descuentos automáticos por uso sostenido y opciones de aprovisionamiento de tipos de máquina personalizados (vCPUs y memoria exacta). Cumple la premisa de utility computing al proveer una utilidad de cómputo estandarizada, ubicua, de disponibilidad inmediata y con medición continua del consumo.

---

### 5. Cloud Computing

#### Ejemplo 1: Microsoft Azure Cloud Platform (https://azure.microsoft.com/)
Plataforma integral de nube pública que suministra servicios en las tres capas de abstracción (IaaS, PaaS y SaaS). Provee agrupación de recursos multitenant a nivel global, aprovisionamiento mediante autoservicio bajo demanda, acceso ubicuo por red y rápida elasticidad. Alberga desde máquinas virtuales y contenedores (AKS) hasta bases de datos distribuidas globalmente (Cosmos DB), respaldadas por acuerdos de nivel de servicio (SLA) industriales y gestión centralizada a través de paneles web y APIs declarativas.

#### Ejemplo 2: Google Kubernetes Engine (GKE) (https://cloud.google.com/kubernetes-engine)
Entorno administrado en la nube para la orquestación, despliegue y administración automatizada de aplicaciones en contenedores utilizando Kubernetes. Abstrae completamente la infraestructura de red, almacenamiento y cómputo subyacente mediante capas de software cloud-native, ofreciendo autoescalado horizontal y vertical de clusters, autoreparación de nodos, balanceo de carga global y despliegues sin tiempo de inactividad.

---

### 6. Mobile Computing

#### Ejemplo 1: Apple Continuity y Handoff (https://support.apple.com/en-us/102426)
Tecnología distribuida diseñada para entornos móviles donde el usuario cambia constantemente de dispositivo físico (iPhone, Apple Watch, iPad, MacBook). Mediante el uso conjunto de Bluetooth Low Energy (BLE) para descubrimiento de proximidad contextual, Wi-Fi Direct para transferencia de datos punto a punto y sincronización de estado de sesión a través de iCloud, permite que una actividad iniciada en un dispositivo móvil (como redactar un correo o navegar una web) sea transferida y continuada en tiempo real en otro dispositivo cercano sin fricción ni pérdida de estado.

#### Ejemplo 2: Google Maps Navigation con Android Auto (https://www.android.com/auto/)
Aplicación de computación móvil que opera en escenarios de movilidad física continua, redes celulares con conectividad variable y restricciones de energía. El sistema combina el procesamiento local en el dispositivo móvil (lectura de GPS, sensores inerciales del vehículo y renderizado de mapas almacenados en caché) con comunicación cliente-servidor distribuida hacia centros de datos de Google para sincronizar condiciones de tráfico en vivo, incidentes y recalcular rutas óptimas en tiempo real.

---

### 7. Ubiquitous Computing / Internet of Things (IoT)

#### Ejemplo 1: Philips Hue Smart Lighting System (https://www.philips-hue.com/)
Ecosistema de computación ubicua donde la tecnología computacional se funde de manera invisible e imperceptible en el entorno cotidiano del hogar. Cada bombilla, interruptor y sensor actúa como un nodo embebido interconectado mediante el protocolo de red en malla (*mesh*) Zigbee de ultra bajo consumo, coordinado por un concentrador local (*Hue Bridge*). El sistema detecta la presencia del usuario, adapta automáticamente la temperatura de color a los ritmos circadianos e interactúa sin que el usuario sea consciente de estar manipulando un clúster de microcomputadores distribuidos.

#### Ejemplo 2: AWS IoT Core (https://aws.amazon.com/iot-core/)
Servicio gestionado en la nube que permite interconectar miles de millones de dispositivos físicos y sensores industriales/domésticos con la infraestructura de servicios distribuidos sin necesidad de aprovisionar servidores. Utiliza protocolos livianos de comunicación como MQTT, WebSockets y HTTPS, e implementa el concepto de *Device Shadow* (sombras de dispositivos), el cual almacena el estado virtual continuo de cada dispositivo conectado, permitiendo que las aplicaciones lean e interactúen con el sensor incluso si este pierde temporalmente la conexión física a la red.

---

### 8. Edge / Fog Computing

#### Ejemplo 1: Cloudflare Workers (https://workers.cloudflare.com/)
Plataforma de computación serverless en el borde (*Edge Computing*) que despliega y ejecuta código de usuario compilado en aislamientos de V8 en más de 330 ciudades de todo el mundo. En lugar de enrutar cada petición HTTP hasta un servidor centralizado en un centro de datos lejano, el cómputo se realiza en el nodo de red más cercano físicamente al usuario final, reduciendo la latencia de respuesta a milisegundos de un solo dígito y filtrando peticiones masivas antes de alcanzar el origen.

#### Ejemplo 2: NVIDIA Jetson Embedded Platform para Robótica Autónoma (https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/)
Módulos de cómputo en el borde orientados a visión por computador, robótica industrial y vehículos autónomos. Incorporan aceleradores de IA y GPUs de bajo consumo para procesar y analizar localmente los flujos masivos de datos generados por sensores LiDAR, radares y cámaras de alta definición. Permite tomar decisiones de control y navegación crítica con latencias inferiores a 10 milisegundos directamente en el extremo de la red, garantizando operación autónoma incluso ante desconexión total de la nube.

---

### 9. Autonomic Computing

#### Ejemplo 1: Kubernetes Horizontal Pod Autoscaler (HPA) con Control Loops (https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
Componente de orquestación distribuida que implementa de forma nativa el bucle de control autonómico MAPE-K (*Monitor, Analyze, Plan, Execute over Knowledge*). Kubernetes monitoriza constantemente las métricas de consumo de CPU, memoria o métricas personalizadas de las aplicaciones, analiza la desviación respecto a los objetivos predefinidos, planifica la escala requerida y ejecuta la creación o destrucción de pods de manera totalmente desatendida. Incorpora propiedades de auto-configuración, auto-optimización y auto-reparación (*self-healing*) al reiniciar contenedores fallidos sin intervención humana.

#### Ejemplo 2: Oracle Autonomous Database (https://www.oracle.com/autonomous-database/)
Sistema de base de datos relacional y transaccional basado rigurosamente en los cuatro pilares del Autonomic Computing formulados por IBM: auto-configuración (*self-configuring* de parámetros del motor según la carga de trabajo), auto-optimización (*self-tuning* de consultas e índices mediante aprendizaje automático), auto-reparación (*self-healing* con conmutación por error y prevención de fallos de hardware) y auto-protección (*self-protecting* al aplicar parches de seguridad y cifrar datos en caliente sin tiempo de inactividad).

---

## 📋 Texto Plano para Diligenciamiento en Google Docs

A continuación se presenta el contenido en el formato exacto requerido por la plantilla de Google Classroom para copiar y pegar:

```text
Aplicaciones de Modelos de Computación Distribuida
Encontrar 2 ejemplos existentes de proyectos y/o aplicaciones para cada uno de los modelos de computación distribuida vistos en clase. De cada aplicación se debe relacionar el nombre, URL de la aplicación (o del artículo donde encontró dicho ejemplo) y una breve descripción que evidencie la pertenencia a dicho modelo.   

Cluster Computing
Ejemplo 1: Frontier Supercomputer (Oak Ridge National Laboratory) (https://www.top500.org/system/180047/)
Supercomputador exaescala homogéneo basado en nodos HPE Cray EX interconectados por una red dedicada Cray Slingshot-11 de topología Dragonfly con latencias submicrosegundo. Opera bajo un único dominio administrativo y ofrece una Single System Image (SSI) gestionada por Slurm para resolver simulaciones físicas y moleculares de computación de alto rendimiento (HPC) que requieren sincronización síncrona intensiva mediante MPI.

Ejemplo 2: Pixar RenderMan Cluster (https://renderman.pixar.com/tractor)
Granja de renderizado de animación por computadora localizada en el centro de datos principal de Pixar. Consiste en miles de nodos de cómputo homogéneos y almacenamiento paralelo SAN/NAS centralizado coordinados por el planificador distribuido Tractor. Opera bajo una red de área local cerrada y un único control de administración para distribuir fotogramas y cálculos de trazado de rayos fotorealista.

Grid Computing
Ejemplo 1: Worldwide LHC Computing Grid (WLCG - CERN) (https://wlcg.web.cern.ch/)
Infraestructura global de computación en malla que integra recursos de computación y almacenamiento de más de 170 centros de datos independientes en más de 40 países. Emplea middleware grid estandarizado y federación de identidades (PKI/X.509) para coordinar recursos heterogéneos y dispersos sobre redes WAN (GEANT/LHCOPN), procesando de forma desacoplada los petabytes de datos producidos por los experimentos del Gran Colisionador de Hadrones.

Ejemplo 2: Open Science Grid (OSG Consortium) (https://osg-htc.org/)
Federación distribuida de centros de datos universitarios y laboratorios nacionales de EE. UU. que comparten recursos computacionales heterogéneos bajo el modelo de High-Throughput Computing (HTC). Orquestado por el middleware HTCondor, permite a proyectos de astrofísica y genómica ejecutar millones de trabajos computacionales independientes aprovechando capacidades ociosas entre dominios autónomos.

Volunteer Computing
Ejemplo 1: BOINC - Berkeley Open Infrastructure for Network Computing (https://boinc.berkeley.edu/)
Plataforma middleware desarrollada por la Universidad de California en Berkeley que permite a millones de usuarios donar ciclos de CPU y GPU de sus computadores personales para proyectos de investigación científica global. Emplea una arquitectura cliente-servidor distribuida con tolerancia intrínseca a nodos no confiables y validación cruzada redundante de cálculos.

Ejemplo 2: Folding@home (https://foldingathome.org/)
Proyecto de computación voluntaria orientado a la simulación del plegamiento de proteínas y dinámica molecular para el descubrimiento de medicamentos. Los voluntarios ejecutan un cliente ligero en segundo plano que descarga unidades de trabajo y utiliza la capacidad ociosa de sus tarjetas gráficas y procesadores de escritorio para realizar simulaciones termodinámicas complejas.

Utility Computing
Ejemplo 1: Amazon Elastic Compute Cloud (Amazon EC2) On-Demand (https://aws.amazon.com/ec2/)
Servicio de infraestructura que provee capacidad de cómputo empaquetada como máquinas virtuales redimensionables bajo un modelo medido y tarifado por segundo o por hora (pay-as-you-go). El usuario accede a recursos elásticos bajo demanda sin inversión en hardware físico, consumiendo el procesamiento como un servicio público medible.

Ejemplo 2: Google Cloud Compute Engine (https://cloud.google.com/compute)
Servicio de IaaS que suministra capacidad computacional escalable con facturación precisa basada en el tiempo real de uso por segundo, con descuentos automáticos por uso continuo. Representa la computación como utilidad al ofrecer recursos estandarizados, inmediatos y tarifados estrictamente según la métrica del consumo.

Cloud Computing
Ejemplo 1: Microsoft Azure Cloud Platform (https://azure.microsoft.com/)
Plataforma pública de computación en la nube que suministra servicios elásticos bajo demanda en los modelos IaaS, PaaS y SaaS. Ofrece recursos multitenant compartidos a escala global, autoservicio inmediato, balanceo de carga, elasticidad dinámica y disponibilidad garantizada mediante SLAs para aplicaciones empresariales.

Ejemplo 2: Google Kubernetes Engine (GKE) (https://cloud.google.com/kubernetes-engine)
Entorno administrado en la nube para el despliegue, escalado y gestión de contenedores que abstrae la infraestructura física subyacente. Proporciona autoescalado horizontal y vertical de clústeres, aprovisionamiento automático de redes y balanceadores, y autorreparación de nodos siguiendo principios cloud-native.

Mobile Computing
Ejemplo 1: Apple Continuity y Handoff (https://support.apple.com/en-us/102426)
Arquitectura distribuida para dispositivos móviles (iPhone, iPad, Mac, Apple Watch) que utiliza Bluetooth Low Energy para detección de proximidad contextual, Wi-Fi Direct para sincronización punto a punto e iCloud para propagación del estado de sesión. Permite migrar tareas de un equipo móvil a otro en tiempo real sin perder continuidad.

Ejemplo 2: Google Maps Navigation con Android Auto (https://www.android.com/auto/)
Aplicación de computación móvil que opera en entornos de alta movilidad física con conectividad celular intermitente. Combina la ejecución local en el smartphone (sensores GPS, brújula y renderizado local con mapas en caché) con comunicación hacia la infraestructura de nube para sincronizar datos telemáticos de tráfico y recalcular rutas óptimas al vuelo.

Ubiquitous Computing/Internet of Things
Ejemplo 1: Philips Hue Smart Lighting System (https://www.philips-hue.com/)
Sistema de computación ubicua donde microcontroladores embebidos en luminarias y sensores se integran de manera invisible en el entorno doméstico. Los nodos se comunican mediante redes de malla Zigbee de bajo consumo coordinadas por un puente local (Hue Bridge), automatizando el ambiente con base en presencia y ritmos circadianos sin intervención explícita.

Ejemplo 2: AWS IoT Core (https://aws.amazon.com/iot-core/)
Plataforma distribuida que gestiona la conexión bidireccional y segura de millones de sensores y actuadores físicos con servicios de nube. Emplea protocolos ligeros como MQTT y provee sombras virtuales de dispositivos (Device Shadows) para interactuar con los dispositivos físicos incluso cuando pierden conectividad de red.

Edge/Fog Computing
Ejemplo 1: Cloudflare Workers (https://workers.cloudflare.com/)
Plataforma de computación serverless en el borde que ejecuta funciones de usuario en cientos de puntos de presencia (PoPs) globales. Al procesar las solicitudes en el borde de la red, inmediatamente cerca del cliente final, minimiza los tiempos de latencia a milisegundos y descongestiona los servidores centrales de origen.

Ejemplo 2: NVIDIA Jetson Embedded Platform para Robótica Autónoma (https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/)
Módulos de cómputo embebidos en el borde para robots, drones y vehículos autónomos. Realizan inferencia de modelos de inteligencia artificial y fusión de sensores directamente en el hardware local con latencias inferiores a 10 ms, permitiendo navegación y decisiones críticas en tiempo real sin depender de conectividad a la nube.

Autonomic Computing
Ejemplo 1: Kubernetes Horizontal Pod Autoscaler (HPA) con Control Loops (https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
Mecanismo de orquestación que implementa el ciclo autonómico MAPE-K (Monitor, Analyze, Plan, Execute). Mide continuamente las métricas de carga, compara contra el umbral deseado, planifica el número de réplicas requeridas y escala o autorrepara contenedores automáticamente sin requerir intervención de administradores humanos.

Ejemplo 2: Oracle Autonomous Database (https://www.oracle.com/autonomous-database/)
Motor de base de datos relacional diseñado sobre los cuatro principios autonómicos: autoconfiguración de recursos, autooptimización de índices mediante aprendizaje automático, autorreparación ante caídas de nodos y autoprotección mediante aplicación automática de parches de seguridad en caliente.
```

---

## 📊 Matriz Comparativa Resumen de los 9 Modelos

| Modelo | Enfoque Principal | Acoplamiento | Tipo de Red | Dominio Administrativo | Métrica Clave |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cluster** | HPC / Cómputo síncrono paralelo | Fuertemente acoplado | LAN / InfiniBand dedicada (< 1 µs) | Único | FLOPS / Latencia de red |
| **Grid** | HTC / Federación de recursos | Débilmente acoplado | WAN / Redes académicas | Múltiple / Federado | Throughput / Trabajos mes |
| **Volunteer** | Cómputo oportunista ciudadano | Muy débilmente acoplado | Internet público no confiable | Abierto / Descentralizado | Nodos activos / Quórum |
| **Utility** | Medición y tarificación por consumo | Variable según servicio | Red del proveedor / Internet | Proveedor de servicio | Costo por segundo o recurso |
| **Cloud** | Elasticidad, autoservicio y abstracción | Variable (IaaS/PaaS/SaaS) | Internet / VPN dedicada | Proveedor cloud multitenant | Elasticidad / SLA de servicio |
| **Mobile** | Portabilidad y cambio dinámico de contexto | Débil / Transaccional | Celular / BLE / Wi-Fi | Personal / Usuario móvil | Consumo de batería / Resiliencia |
| **Ubiquitous / IoT** | Integración invisible en el entorno físico | Red de malla / Eventos | Zigbee / Thread / BLE / MQTT | Local o nube personal | Densidad de nodos / Latencia sensorial |
| **Edge / Fog** | Procesamiento cercano a la fuente de datos | Distribuido perimetral | Red de borde / 5G / LAN local | Híbrido (local/nube) | Latencia (< 10 ms) / Ancho de banda |
| **Autonomic** | Bucles cerrados de autocontrol (MAPE-K) | N/A (Paradigma de control) | N/A (Aplica a cualquier red) | Autónomo (Software/Agentes) | MTTD / MTTR / Reducción de intervención |
