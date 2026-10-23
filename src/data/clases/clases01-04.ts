import type { Clase } from './types';

export const clase01: Clase = {
  number: 1,
  date: '2026-09-08',
  tema: 'Introducción',
  title: '¿Por qué sistemas distribuidos?',
  idea:
    'Los sistemas distribuidos aparecen cuando una sola máquina ya no alcanza. Procesador, memoria y almacenamiento tienen un techo físico y económico; para seguir creciendo hay que repartir el trabajo entre varias máquinas.',
  keyTerms: ['Coulouris', 'Tanenbaum', 'Imagen de sistema único', 'VM vs. contenedor', 'Falacias'],
  sections: [
    {
      heading: 'El límite de crecer en una sola máquina',
      blocks: [
        {
          type: 'p',
          text: 'En clase se buscó el equipo más grande que se puede comprar: un servidor de **896 núcleos y 48 TB de RAM** por unos **USD 300.000**. Con el mismo dinero se compran unos **400 PCs** de 9 núcleos y 16 GB, y además no hay que comprarlos todos el primer día.',
        },
        { type: 'diagram', id: 'servidor-vs-pcs', caption: 'Mismo presupuesto, dos caminos. Valores aproximados de la clase.' },
        {
          type: 'callout',
          text: 'Antes de los 80 todo corría en **mainframes** con terminales "brutas". En los 90, con las redes, Coulouris y Tanenbaum empezaron a hablar de sistemas distribuidos.',
        },
      ],
    },
    {
      heading: 'Dos definiciones clásicas',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Coulouris', text: 'Componentes en una red que **coordinan sus acciones mediante paso de mensajes**. Mira cómo funciona por dentro.' },
            { title: 'Tanenbaum', text: 'Elementos autónomos que **el usuario percibe como un solo sistema**. Mira cómo lo ve el usuario.' },
          ],
        },
      ],
    },
    {
      heading: 'Características',
      blocks: [
        {
          type: 'table',
          headers: ['Característica', 'Qué significa'],
          rows: [
            ['Nodos en red', 'Máquinas físicas, **VMs** (emulan una máquina completa) o **contenedores** (comparten el kernel del host)'],
            ['Red real o virtual', 'Las VMs y contenedores se hablan por una red virtual dentro del host'],
            ['Sin memoria compartida', 'No se puede leer fácilmente la memoria de otra máquina'],
            ['Sin reloj común', 'Cada máquina tiene su propia hora y velocidad'],
            ['Fallos independientes', 'Puede fallar un cable o un switch que no es tu código'],
            ['Heterogeneidad', 'Fabricantes, SO y versiones distintos'],
            ['Imagen de sistema único', 'El usuario no debería saber en qué máquina o puerto corre cada cosa'],
          ],
        },
      ],
    },
    {
      heading: 'Ventajas y desventajas',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Economía', text: 'Mejor relación rendimiento/costo que un equipo gigante.' },
            { title: 'Crecimiento', text: 'Empiezas con pocos nodos y agregas según la demanda.' },
            { title: 'Alto rendimiento', text: 'Tareas en paralelo real, cada nodo con sus recursos.' },
            { title: 'Inherentemente distribuidas', text: 'Banco con oficinas que operan solas; cada sede del supermercado factura y luego consolida.' },
            { title: 'Fiabilidad', text: 'Si un nodo cae, el resto sigue. En un sistema centralizado no hay plan B.' },
            { title: 'Carácter abierto', text: 'Con estándares, una memoria dañada se compra a cualquier fabricante.' },
          ],
        },
        {
          type: 'list',
          items: [
            '**Desventajas:** nuevas formas de programar, la red introduce pérdida de mensajes, latencia y datos obsoletos, y hay que controlar la seguridad y la confidencialidad.',
            '**Lamport:** "un sistema distribuido es aquel en el que no puedes trabajar porque falló una máquina que ni sabías que existía". Ejemplo: la caída de AWS que tumbó a Bancolombia.',
          ],
        },
      ],
    },
    {
      heading: 'Las 8 falacias',
      blocks: [
        {
          type: 'table',
          headers: ['Falacia', 'Por qué es falsa'],
          rows: [
            ['La red es confiable', 'Cualquier tarjeta, cable o conector puede fallar'],
            ['La latencia es cero', 'Siempre hay demora, y crece con cada nodo'],
            ['El ancho de banda es infinito', 'Limitado por el canal, incluso con fibra'],
            ['La red es segura', 'Siempre hay riesgo'],
            ['La topología no cambia', 'Cambia cada vez que entra o sale un equipo'],
            ['Hay un solo administrador', 'Son demasiados componentes para una persona'],
            ['El transporte cuesta cero', 'Mantenimiento, daños y personal cuestan'],
            ['La red es homogénea', 'Los equipos nuevos nunca son iguales a los viejos'],
          ],
        },
        { type: 'callout', text: '**Taller 1:** investigar el hardware para montar un clúster y un grid.' },
      ],
    },
  ],
  repaso: [
    { q: '¿Cuáles son los tres recursos de cómputo?', a: 'Procesador, memoria y almacenamiento.' },
    { q: '¿Qué diferencia a un contenedor de una VM?', a: 'El contenedor comparte el kernel del SO anfitrión; la VM emula una máquina completa con su propio SO.' },
    { q: '¿Qué dice Tanenbaum que no dice Coulouris?', a: 'Que el usuario debe percibir el conjunto como un solo sistema.' },
  ],
};

export const clase02: Clase = {
  number: 2,
  date: '2026-09-10',
  tema: 'Introducción',
  title: 'Clúster vs. Grid: hardware e infraestructura',
  idea:
    'Un clúster junta equipos iguales en un solo lugar para resolver un problema a la vez lo más rápido posible. Un grid une equipos distintos y dispersos para compartir recursos y atender muchos problemas a la vez.',
  keyTerms: ['HPC', 'HTC', 'Homogéneo', 'UTP / coaxial / fibra', 'Alta disponibilidad'],
  sections: [
    {
      heading: 'Clúster vs. Grid',
      blocks: [
        { type: 'diagram', id: 'cluster-vs-grid' },
        {
          type: 'table',
          headers: ['', 'Clúster', 'Grid'],
          rows: [
            ['Objetivo', '**Un problema** a la vez (HPC)', '**Muchos problemas** a la vez (HTC)'],
            ['Nodos', 'Homogéneos', 'Heterogéneos'],
            ['Ubicación', 'Centralizado, un sitio', 'Distribuido, cualquier lugar'],
            ['Red', 'Alta velocidad (microsegundos)', 'Normal (milisegundos)'],
            ['Acoplamiento', 'Fuerte', 'Débil'],
            ['Si cae un nodo', 'La tarea se reparte y **tarda más**', 'Se atienden menos peticiones; nada más cambia'],
          ],
        },
        {
          type: 'list',
          items: [
            '**¿Por qué homogéneos?** La tarea se parte en N pedazos iguales; si los nodos son iguales, todos tardan lo mismo.',
            '**¿Por qué red rápida?** El clúster compite con un supercomputador cuyos procesos se hablan por el **bus de la board**.',
            'Ejemplos de clúster: renderizar una película animada, el pronóstico del clima del IDEAM.',
          ],
        },
      ],
    },
    {
      heading: 'Medios de transmisión',
      blocks: [
        { type: 'diagram', id: 'distancia-cables', caption: 'Distancia máxima sin repetidor (escala ilustrativa).' },
        {
          type: 'list',
          items: [
            '**UTP**: cobre; Cat 8 llega a ~40 Gbps en distancias cortas. Genera calor y ruido electromagnético.',
            '**Coaxial**: el de la televisión; hoy poco usado.',
            '**Fibra**: la más rápida, sin calor ni interferencia; es vidrio frágil que no admite curvas cerradas. Lo caro son las tarjetas, los equipos y la instalación.',
          ],
        },
      ],
    },
    {
      heading: 'Lecciones de diseño',
      blocks: [
        {
          type: 'callout',
          text: '**No uses lo último en tecnología** si solo lo fabrica un proveedor. Anécdota del profesor: tarjetas de 10 Gb "en demo" con desconexiones intermitentes y sin repuesto. Con estándares, una tarjeta dañada se cambia en media hora. Y **tú** cargas con la responsabilidad ante el gerente.',
        },
        {
          type: 'cards',
          items: [
            { title: 'Hardware del clúster', text: 'Nodos iguales (rack, escritorio o VMs), red rápida, NAS/SAN, GPUs si hacen falta, **espacio** con refrigeración, UPS y planta, y **administradores**.' },
            { title: 'Hardware del grid', text: 'Nodos de cualquier tipo y en cualquier lugar, red normal, sin espacio dedicado.' },
          ],
        },
        {
          type: 'p',
          text: '**HPC vs. alta disponibilidad:** un clúster HPC no tiene nodos de reserva (sería presupuesto ocioso). La alta disponibilidad sí usa redundancia: para el rendimiento de 10 equipos compras 20.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Cuál resuelve un solo problema lo más rápido posible?', a: 'El clúster (HPC).' },
    { q: '¿Distancia máxima de un UTP entre switches?', a: '100 metros.' },
    { q: '¿Qué pasa si cae un nodo de un clúster HPC?', a: 'La tarea se redistribuye entre los demás y tarda más: se pierde rendimiento.' },
  ],
};

export const clase03: Clase = {
  number: 3,
  date: '2026-09-15',
  tema: 'Introducción',
  title: 'Aplicaciones y modelos de computación (parte 1)',
  idea:
    'Los sistemas distribuidos están en empresas, big data, industria, internet y el hogar. Hay nueve modelos de computación distribuida, y cada uno responde de forma distinta a la pregunta: ¿de quién son los recursos y cómo se usan?',
  keyTerms: ['Big Data', 'Cluster', 'Grid', 'Volunteer', 'Utility', 'Cloud', 'Colocation'],
  sections: [
    {
      heading: 'Dónde se aplican',
      blocks: [
        {
          type: 'list',
          items: [
            'Empresas (reemplazar mainframes), alto rendimiento, alta disponibilidad (Google, Netflix).',
            '**Big Data**: petabytes de datos estructurados, no estructurados y binarios (pronóstico del clima, redes sociales).',
            'Multimedia, industria y control, sistemas ubicuos.',
            '**Internet** es el mejor ejemplo: nodos heterogéneos, sin reloj común, y aun así lo vemos como un solo sistema.',
          ],
        },
      ],
    },
    {
      heading: 'Los nueve modelos',
      blocks: [
        { type: 'diagram', id: 'modelos-recursos', caption: 'Ordenados por quién aporta los recursos.' },
        {
          type: 'table',
          headers: ['Modelo', 'Lo esencial'],
          rows: [
            ['**Cluster**', 'Un trabajo, fuertemente acoplado, estático, con planificador maestro. Se puede **particionar** para varias apps.'],
            ['**Grid**', 'Muchas tareas, poco acoplado, **varios dominios de administración**, recursos no dedicados, dinámico, roles **simétricos**.'],
            ['**Volunteer**', 'Personas del común donan CPU y disco ociosos (Folding@home, SETI@home). **Asimétrico**, **anónimo** y **volátil**.'],
            ['**Utility**', 'Pagar por lo que consumes, como el agua o el teléfono (McCarthy, 1961). Es un **modelo de facturación**.'],
            ['**Cloud**', 'Recursos accesibles **por la red desde cualquier lugar**: pública, privada (on-premises) o híbrida.'],
          ],
        },
      ],
    },
    {
      heading: 'Grid vs. Volunteer',
      blocks: [
        {
          type: 'table',
          headers: ['', 'Grid', 'Volunteer'],
          rows: [
            ['Aporta', 'Organizaciones', 'Individuos'],
            ['Roles', 'Simétricos (todos dan y reciben)', 'Asimétricos (solo se dona)'],
            ['Entrada/salida', 'Por convenio', 'En cualquier momento'],
            ['Disponibilidad', 'Estable', 'Muy volátil'],
          ],
        },
      ],
    },
    {
      heading: 'Cloud: modelos de servicio',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'IaaS', text: 'Hardware **virtual**: VMs, redes y discos virtuales.' },
            { title: 'PaaS', text: 'Una **plataforma** lista; tú solo pones la app y los datos.' },
            { title: 'SaaS', text: 'La **aplicación** terminada (Drive, Dropbox).' },
            { title: 'Colocation', text: 'Tu hardware **físico** en el centro de datos de otro, que da red, energía y seguridad. Muy usado en el sector público.' },
          ],
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué modelo usa recursos donados por personas?', a: 'Volunteer computing.' },
    { q: '¿Qué define al utility computing?', a: 'La forma de facturar: pagas por lo que consumes.' },
    { q: '¿En qué se diferencian los roles de grid y volunteer?', a: 'En el grid son simétricos (todos dan y reciben); en volunteer son asimétricos (solo se dona).' },
  ],
};

export const clase04: Clase = {
  number: 4,
  date: '2026-09-17',
  tema: 'Introducción',
  title: 'Responsabilidad en la nube, Mobile, Ubiquitous, Edge/Fog y Autonomic',
  idea:
    'En la nube la responsabilidad es compartida: cuanto más arriba subes (IaaS → PaaS → SaaS), menos administras y más dependes del proveedor. Después se cierran los modelos que faltaban.',
  keyTerms: ['Responsabilidad compartida', 'Pizza as a Service', 'Ad hoc', 'Context-aware', 'IoT', 'Self-*'],
  sections: [
    {
      heading: '¿Quién administra qué?',
      blocks: [
        { type: 'diagram', id: 'pila-responsabilidad' },
        {
          type: 'list',
          items: [
            '**On-premises**: todo es tuyo. A la cultura colombiana le gusta "tener el control", pero subestima el trabajo.',
            '**IaaS**: un "coco vacío". Tú instalas, parchas el SO, abres puertos y haces backups (una VPS).',
            '**PaaS**: el proveedor también se encarga del SO y el runtime, pero quedas limitado a sus herramientas (un hosting PHP + MySQL).',
            '**SaaS**: solo usas la aplicación.',
          ],
        },
      ],
    },
    {
      heading: 'Pizza as a Service',
      blocks: [
        {
          type: 'table',
          headers: ['Modelo', 'Pizza', 'Tú pones'],
          rows: [
            ['On-premises', 'Hecha en casa', 'Todo'],
            ['IaaS', 'Caja con los ingredientes', 'Horno, gas, bebidas, mesa'],
            ['PaaS', 'Pizza a domicilio', 'Bebidas y mesa'],
            ['SaaS', 'Comer en el restaurante', 'Nada'],
          ],
        },
        {
          type: 'p',
          text: 'Proveedores típicos: IaaS (EC2, Compute Engine, Azure), Storage (S3, Drive), PaaS (App Engine, Heroku), DBaaS (DynamoDB, Mongo Atlas), FaaS (Lambda, Cloud Functions; sin servidores siempre encendidos) y SaaS (Slack, Workspace).',
        },
      ],
    },
    {
      heading: 'Los modelos que faltaban',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Mobile', text: 'Laptops y celulares con acceso remoto, en redes **ad hoc**. Retos: **batería**, ancho de banda variable, modo desconectado, seguridad.' },
            { title: 'Ubiquitous', text: 'Computadores en el ambiente que envían datos **sin que un humano lo pida**: relojes, sensores, casas inteligentes. **Context-aware** e **IoT**.' },
            { title: 'Edge / Fog', text: 'Procesar **cerca del usuario** para bajar la latencia. Netflix pone el contenido popular dentro de los ISP.' },
            { title: 'Autonomic', text: 'Inspirado en el sistema nervioso: **autoconfigurable, autorreparable, autooptimizable, autoprotegido**. El menos implementado (Matrix como ejemplo).' },
          ],
        },
        { type: 'diagram', id: 'edge-fog-cloud' },
      ],
    },
  ],
  repaso: [
    { q: 'En IaaS, ¿quién parcha el sistema operativo?', a: 'Tú, el cliente.' },
    { q: 'Pizza a domicilio equivale a…', a: 'PaaS.' },
    { q: '¿Cuáles son las 4 propiedades self-* de autonomic computing?', a: 'Autoconfiguración, autorreparación, autooptimización y autoprotección.' },
  ],
};
