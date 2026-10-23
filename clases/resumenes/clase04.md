# Clase 04: Modelos de computación (parte 2): responsabilidades en la nube, Mobile, Ubiquitous, Edge/Fog, Autonomic

> Fecha: 2026-09-17 · Fuente: `clases/clase04.txt` · Tema 1: Modelos de computación distribuida

## Idea central

En la nube la responsabilidad es **compartida**: cuanto más arriba subes (IaaS → PaaS → SaaS), menos administras tú y más dependes del proveedor. Después se cierran los modelos que faltaban: **Mobile, Ubiquitous, Edge/Fog y Autonomic**.

## 1. ¿Quién administra qué? (modelo de responsabilidad compartida)

Las capas de la computación, de abajo hacia arriba: **red → almacenamiento → servidores → virtualización → sistema operativo → middleware → runtime → datos → aplicaciones**.

| Capa | On-premises / Colocation | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Red | Tú* | Proveedor | Proveedor | Proveedor |
| Almacenamiento | Tú | Proveedor | Proveedor | Proveedor |
| Servidores | Tú | Proveedor | Proveedor | Proveedor |
| Virtualización | Tú | Proveedor | Proveedor | Proveedor |
| Sistema operativo | Tú | **Tú** | Proveedor | Proveedor |
| Middleware / runtime | Tú | **Tú** | Proveedor | Proveedor |
| Datos | Tú | **Tú** | **Tú** | Proveedor |
| Aplicaciones | Tú | **Tú** | **Tú** | Proveedor |

\* En colocation el proveedor suele dar la red, pero puedes contratar tu propio enlace.

- **On-premises**: todo es tuyo. A la cultura colombiana le gusta "tener el control", pero subestima el trabajo: con 10–15 servidores heterogéneos necesitas especialistas para cada cosa. Además hay que comprar pensando en la capacidad futura.
- **IaaS**: un "coco vacío". Pides exactamente lo que necesitas (por ejemplo, 100 GB de disco) y no te preocupas de discos dañados ni cables. Tú instalas, parchas el SO, abres puertos y haces backups. Ejemplo: una VPS.
- **PaaS**: el proveedor también se encarga del SO, el middleware y el runtime (parches de seguridad incluidos). Tú solo gestionas la app y sus datos, pero quedas **limitado a las herramientas que te ofrecen**. Ejemplo: un hosting que solo corre PHP + MySQL.
- **SaaS**: no tienes ninguna responsabilidad técnica; solo usas la aplicación.

## 2. Pizza as a Service

| Modelo | Pizza | Tú pones |
|---|---|---|
| On-premises | Pizza hecha en casa | Todo: ingredientes, horno, gas, bebidas, mesa |
| IaaS | Te mandan una **caja con los ingredientes** | Horno, gas, cocinar, bebidas, mesa |
| PaaS | **Pizza a domicilio** | Bebidas y mesa |
| SaaS | **Comer en el restaurante** | Nada, solo comer |

Cuanta más responsabilidad asume el proveedor, **más sube el precio**.

## 3. La pirámide de servicios y proveedores

| Nivel | Ejemplos |
|---|---|
| **IaaS** (base) | Amazon EC2, Google Compute Engine, Azure Compute, Rackspace, OpenStack, Apache CloudStack |
| **Storage as a Service** | S3, Google Cloud Storage, Azure Storage, OneDrive, Drive, Dropbox, iCloud |
| **PaaS** | Azure, Google App Engine, Salesforce Platform, OpenShift, Cloud Foundry |
| **Database as a Service** | DynamoDB, Cassandra, Oracle Cloud, SQL Azure, MongoDB Atlas, Neptune (grafos) |
| **Functions as a Service** | Cloud Functions, AWS Lambda, OpenWhisk. Parecido a PaaS, pero **los servidores no están siempre encendidos**. |
| **SaaS** (cima) | Slack, Google Workspace, SugarCRM, Drive |

Las nubes grandes (Azure, DigitalOcean) ofrecen **una mezcla de todos los niveles**: VMs (los *droplets* de DigitalOcean), Kubernetes, funciones, bases de datos, backups.

## 4. Mobile computing

- Sistema distribuido que incluye **dispositivos portátiles con acceso remoto**: laptops, PDAs, tablets, celulares. Hoy un celular tiene 8 núcleos, 12–16 GB de RAM y 1 TB.
- Conectados de forma **inalámbrica**, formando redes **ad hoc**: la topología se arma "al vuelo" según entran y salen dispositivos.
- Retos:
  - **Energía**: la batería es el talón de Aquiles.
  - **Ancho de banda variable**: las redes inalámbricas son más lentas y sufren **ruido electromagnético**.
  - Trabajo en **modo desconectado**.
  - Más **amenazas a la seguridad y la privacidad**, porque los datos viajan por el aire.
- En mobile, el sistema funciona principalmente **cuando el usuario interactúa** con él (con matices: las notificaciones siguen llegando).

## 5. Ubiquitous computing

- Computadores **en todas partes**, integrados en el ambiente, que envían y reciben información **sin que un humano lo pida**.
- Ejemplos: relojes inteligentes (presión, oxigenación), tenis con sensores, casas y empresas inteligentes, la nevera que sabe cuándo vence un alimento, el carro que avisa que lo están robando.
- **Context-aware computing**: el comportamiento depende del contexto. Una cámara te reconoce, se abre la puerta según tu rol y se encienden las luces del pasillo a tu paso. Ejemplo del hotel: un dispositivo de identificación que sabía dónde estuviste y te ofrecía imprimir tus fotos.
- **Internet de las cosas (IoT)**: objetos cotidianos que intercambian información entre ellos o con nosotros.

## 6. Edge / Fog computing

- Una **extensión de la nube**: no todo tiene que procesarse en un centro de datos lejano.
- Se procesa **más cerca del usuario**, en "la niebla" (entre la tierra y la nube), para **bajar la latencia** y escalar a usuarios de todo el mundo.
- Ejemplo: **Netflix** ubica el contenido más visto en servidores dentro de los ISP de cada país. Por eso arranca más rápido que otras plataformas de streaming.

## 7. Autonomic computing

- Inspirada en el **sistema nervioso humano**, que se adapta a los recursos que le quedan.
- Sistemas con funciones **self-***: **autoconfigurable, autorreparable, autooptimizable y autoprotegido**, sin intervención humana.
- Ejemplos de ciencia ficción: la IA que se reconfigura y crea robots para protegerse, o **Matrix** (el Arquitecto reconfigura, los agentes reparan anomalías). Es el modelo **menos implementado hoy**, pero cada vez está más cerca.

## Para el examen

- Responsabilidad compartida: IaaS = tú desde el SO hacia arriba; PaaS = tú solo app y datos; SaaS = nada.
- Pizza: ingredientes = IaaS, domicilio = PaaS, restaurante = SaaS.
- Mobile = portátil, inalámbrico, ad hoc, batería y ancho de banda limitados.
- Ubiquitous = en todas partes, sin interacción humana, context-aware, IoT.
- Edge/Fog = cerca del usuario para reducir la latencia (Netflix).
- Autonomic = self-configuring, self-healing, self-optimizing, self-protecting.
