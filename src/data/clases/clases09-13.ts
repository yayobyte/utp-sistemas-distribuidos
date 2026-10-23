import type { Clase } from './types';

export const clase09: Clase = {
  number: 9,
  date: '2026-10-06',
  tema: 'Arquitecturas',
  title: 'Caché, proxy, servidores jerárquicos y escalado',
  idea:
    'Para quitarle presión al servidor sin engrosar el cliente: caché, proxy, servidores jerárquicos y varios servidores. Cada variante mejora algo, pero agrega su propia complejidad.',
  keyTerms: ['Caché', 'Coherencia', 'Forward proxy', 'Reverse proxy', 'Vertical/horizontal', 'Scale-up', 'Scale-out'],
  sections: [
    {
      heading: 'Caché',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'En el cliente', text: 'No vuelve a preguntar lo que ya sabe; ni siquiera usa la red.' },
            { title: 'En el servidor', text: 'Muchos clientes piden lo mismo; hay viaje por la red, pero no reprocesamiento.' },
          ],
        },
        {
          type: 'list',
          items: [
            'Ventajas: menos latencia, menos carga, **modo desconectado**.',
            'Riesgo: **datos obsoletos**. El saldo no se puede cachear; las reglas de descuento sí.',
            'Coherencia: **recargar periódicamente** (prefetching) o **invalidar** cuando cambia la fuente. Ambas agregan sobrecarga.',
            'Anécdota: 500–1000 logins a las 8 a. m. pidiendo lo mismo; con caché, el 80% ya estaba listo.',
          ],
        },
      ],
    },
    {
      heading: 'Proxy',
      blocks: [
        { type: 'diagram', id: 'proxies' },
        {
          type: 'list',
          items: [
            'El proxy es un **concentrador híbrido**: servidor para los clientes, cliente para los servidores. **No procesa, redirige**, y puede tener caché.',
            '**Forward**: la cara de los clientes hacia la red (el proxy HTTP de la empresa).',
            '**Reverse**: con los servidores; la cara del mundo hacia ellos. Oculta cuántos son y dónde están. A veces lo hace el firewall.',
            'Beneficios: **transparencia de ubicación**, menos carga y escalabilidad.',
          ],
        },
      ],
    },
    {
      heading: 'Servidores jerárquicos',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'División vertical', text: 'Cada nivel tiene una responsabilidad distinta: presentación → lógica → datos, u oficina → regional → nacional.' },
            { title: 'División horizontal', text: 'Servidores iguales que se ayudan. **DNS**: si el tuyo no conoce el dominio, pregunta a otros.' },
          ],
        },
      ],
    },
    {
      heading: 'Scale-up vs. scale-out',
      blocks: [
        { type: 'diagram', id: 'scale-up-out' },
        {
          type: 'table',
          headers: ['', 'Scale-up (vertical)', 'Scale-out (horizontal)'],
          rows: [
            ['Qué es', 'Más recursos a la misma máquina', 'Más máquinas con copias del servicio'],
            ['Límite', 'Techo de hardware; no es lineal', '"Casi ilimitado": el límite es el dinero'],
            ['Tolerancia a fallos', 'No mejora', 'Mejora'],
            ['Necesita', '—', 'Balanceador o API Gateway, y **sincronizar datos**'],
          ],
        },
        {
          type: 'callout',
          text: 'Si cada servidor guarda sus datos, el servidor 2 no conoce la venta del servidor 1. Sacar la BD a un solo servidor crea un nuevo cuello de botella. La salida: **replicar** (tema de la clase 10).',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Dónde se ubica un reverse proxy?', a: 'Del lado de los servidores, en su misma organización.' },
    { q: '¿Qué mecanismo añade más servidores?', a: 'Scale-out (escalado horizontal).' },
    { q: 'Dos formas de mantener coherente la caché', a: 'Recargar periódicamente (prefetching) o invalidar cuando cambia la fuente.' },
  ],
};

export const clase10: Clase = {
  number: 10,
  date: '2026-10-08',
  tema: 'Arquitecturas',
  title: 'Alta disponibilidad, replicación y código móvil',
  idea:
    'La alta disponibilidad solo se logra con réplicas, y eso obliga a decidir cómo se sincronizan: replicación activa o pasiva (hot, warm o cold standby). Al final, el código móvil como otra forma de depender menos del servidor.',
  keyTerms: ['Consistencia', 'Replicación activa', 'Replicación pasiva', 'Hot / Warm / Cold standby', 'Código bajo demanda', 'Evaluación remota', 'Agentes móviles'],
  sections: [
    {
      heading: 'Activa vs. pasiva',
      blocks: [
        { type: 'diagram', id: 'replicacion' },
        {
          type: 'table',
          headers: ['', 'Activa', 'Pasiva'],
          rows: [
            ['Recibe la petición', 'Todos los servidores', 'Solo el primario'],
            ['Procesa', 'Todos', 'El primario; luego propaga el **estado final**'],
            ['El cliente espera', 'A **todas** las réplicas', 'A una'],
            ['Con más nodos', '**Escrituras más lentas**', 'El primario queda ocupado sincronizando'],
          ],
        },
      ],
    },
    {
      heading: 'Hot, warm y cold standby',
      blocks: [
        { type: 'diagram', id: 'standby' },
        {
          type: 'table',
          headers: ['Modo', 'Sincroniza', 'Riesgo'],
          rows: [
            ['**Hot**', 'Después de **cada** transacción', 'Mínimo, pero el primario rinde ~la mitad'],
            ['**Warm**', '**Por lotes** (cada X tiempo o X transacciones)', 'Perder el último lote'],
            ['**Cold**', 'Cuando se decida (medianoche)', 'El más alto: como el backup "cuando me acuerdo"'],
          ],
        },
        {
          type: 'callout',
          text: 'Agregar nodos **no multiplica** el rendimiento: 2 nodos dan ~1,8×. Y de nada sirve el mejor respaldo si cada "guardar" tarda un minuto.',
        },
      ],
    },
    {
      heading: 'Código móvil',
      blocks: [
        {
          type: 'table',
          headers: ['Variante', 'Qué viaja', 'Ejemplos'],
          rows: [
            ['**Código bajo demanda**', 'El servidor envía código al cliente', 'Applets, Flash, **SPA**, **PWA**'],
            ['**Evaluación remota**', 'El cliente envía un script al servidor', '**SQL**, PostScript, comandos Cisco, CI/CD'],
            ['**Agentes móviles**', 'Un programa que se mueve solo entre máquinas', 'Agente que recorre hospitales reuniendo una historia clínica'],
          ],
        },
        {
          type: 'p',
          text: 'El parcial será aplicado: proponer una arquitectura para un escenario usando las **cuatro arquitecturas del curso**.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué le pasa al rendimiento de escritura en replicación activa al agregar nodos?', a: 'Disminuye, porque hay que esperar a todas las réplicas.' },
    { q: 'Backup sincronizado por lotes, no totalmente al día', a: 'Warm standby.' },
    { q: 'Enviar SQL a una base de datos es…', a: 'Evaluación remota.' },
  ],
};

export const clase11: Clase = {
  number: 11,
  date: '2026-10-13',
  tema: 'Arquitecturas',
  title: 'Aspectos de diseño 1 y 2: atención de clientes y conexiones',
  idea:
    'Cliente-servidor es la arquitectura más usada y la más peligrosa para sistemas distribuidos, así que hay que responder cinco aspectos de diseño. Esta clase cubre cómo atender a los clientes y cómo gestionar las conexiones.',
  keyTerms: ['Secuencial', 'Procesos', 'Hilos', 'Pool / híbrido', 'Basado en eventos', 'C10K', 'Conexión persistente'],
  sections: [
    {
      heading: 'Los cinco aspectos',
      blocks: [
        {
          type: 'list',
          items: [
            '1. Atención de clientes',
            '2. Gestión de conexiones',
            '3. Localización del servidor (clase 12)',
            '4. Con o sin estado (clase 12)',
            '5. Comportamiento ante fallos (clase 13)',
          ],
        },
      ],
    },
    {
      heading: 'Aspecto 1: modelos de servidor',
      blocks: [
        { type: 'diagram', id: 'modelos-servidor' },
        {
          type: 'table',
          headers: ['Modelo', 'Cómo funciona', 'Cuándo'],
          rows: [
            ['**Secuencial**', 'Una petición a la vez (FIFO)', 'Tareas enormes que aprovechan toda la máquina'],
            ['**Procesos**', 'El SO crea un proceso por petición (memoria y CPU propias)', 'Alto cómputo; riesgo de **DoS** al llenar la máquina'],
            ['**Hilos**', 'Subprocesos que comparten la memoria del proceso', 'Muchas peticiones pequeñas; cada hilo recibe menos CPU'],
            ['**Pool / híbrido**', 'Procesos prearrancados entre un mínimo y un máximo', 'Evita la latencia de creación'],
            ['**Eventos**', '**Un solo flujo** espera un evento de cualquier cliente', 'Muy eficiente y fácil, pero peor con altísima concurrencia'],
          ],
        },
        {
          type: 'callout',
          text: '**Problema C10K:** crear y destruir procesos e hilos penaliza con poca concurrencia; los eventos se quedan cortos con mucha concurrencia.',
        },
      ],
    },
    {
      heading: 'Aspecto 2: conexiones',
      blocks: [
        { type: 'diagram', id: 'conexiones' },
        {
          type: 'table',
          headers: ['', 'Una por petición', 'Persistente'],
          rows: [
            ['Analogía', 'Cajero automático: tarjeta por cada operación', 'Cajero persona: haces todo en tu turno'],
            ['Implementación', 'Sencilla', 'Compleja'],
            ['Sobrecarga', 'Mayor (reconectarse)', 'Menor'],
            ['Escalar horizontalmente', 'Fácil', 'Difícil: siempre el mismo servidor'],
            ['Extras', '—', 'Pipelining, server push'],
          ],
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué modelo usa un único flujo para muchos clientes esperando eventos?', a: 'El servidor basado en eventos.' },
    { q: '¿Por qué los procesos arriesgan una denegación de servicio?', a: 'Porque cada uno reserva memoria y CPU, y la máquina se llena rápido.' },
    { q: '¿Qué complica una conexión persistente?', a: 'El escalado horizontal: todas las peticiones deben ir al mismo servidor.' },
  ],
};

export const clase12: Clase = {
  number: 12,
  date: '2026-10-15',
  tema: 'Arquitecturas',
  title: 'Aspectos 3 y 4: binder, con o sin estado, y leases',
  idea:
    '¿Cómo encuentra el cliente al servidor sin tener máquina y puerto fijos? Con un binder. Después: ¿el servidor recuerda al cliente o no? Y para detectar caídas, los leases.',
  keyTerms: ['Binder', 'ID de servicio', 'Binder local / global', 'Stateful', 'Stateless', 'Cookies / JWT', 'Lease'],
  sections: [
    {
      heading: 'Aspecto 3: el binder',
      blocks: [
        { type: 'diagram', id: 'binder' },
        {
          type: 'list',
          items: [
            'Guarda **ID del servicio → máquina + puerto**. No procesa nada.',
            'Da **transparencia de ubicación y migración**, baja el acoplamiento espacial y permite réplicas y versiones.',
            'Paradoja: el binder también es un **punto crítico de fallo**, aunque es muy rápido.',
            'Costo: más mensajes y más **latencia**. Cuanto más desacoplado, más lento.',
            'El **DNS** es el binder más pequeño. **Binder ≠ proxy**: el binder se aparta después de responder.',
          ],
        },
        {
          type: 'table',
          headers: ['Modelo', 'Analogía (llamar al vicerrector)'],
          rows: [
            ['Directo (máquina + puerto)', 'Tienes su celular; si cambia, lo pierdes'],
            ['Binder local (máquina + nombre)', 'Llamas al PBX y pides "vicerrectoría"'],
            ['Binder global (solo nombre)', 'Las páginas blancas'],
            ['Global + local', 'La operadora que te pasa con otra operadora'],
          ],
        },
      ],
    },
    {
      heading: 'Aspecto 4: con estado vs. sin estado',
      blocks: [
        {
          type: 'table',
          headers: ['', 'Con estado', 'Sin estado'],
          rows: [
            ['El servidor', 'Recuerda al cliente', 'No sabe nada'],
            ['Mensajes', 'Cortos', 'Llevan todos los datos'],
            ['Si falla el servidor', 'Se pierde el estado', 'Otro atiende'],
            ['Escalar horizontalmente', 'Difícil', '**Fácil**'],
          ],
        },
        {
          type: 'callout',
          text: '**HTTP 1.x es sin estado.** El estado se simula del lado del cliente con **cookies**, localStorage o sessionStorage y **tokens JWT**.',
        },
      ],
    },
    {
      heading: 'Leases',
      blocks: [
        {
          type: 'list',
          items: [
            'A le da a B un lease con vigencia (por ejemplo, 30 s); B debe **renovarlo** antes de que venza.',
            'Si B no renueva, A asume que cayó y **libera los recursos**. Si A no responde, B busca otro servidor.',
            'Distingue "caído" de "ocupado", algo que un timeout fijo no hace.',
            'Usos: binders, pub-sub, cachés de sistemas de archivos, **cerrojos distribuidos**.',
          ],
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué guarda el binder?', a: 'La correspondencia entre el identificador del servicio y su máquina y puerto.' },
    { q: '¿Para qué sirve un lease?', a: 'Para detectar caídas de nodos y recursos abandonados.' },
    { q: '¿Qué tipo de servicio escala mejor horizontalmente?', a: 'Sin estado.' },
  ],
};

export const clase13: Clase = {
  number: 13,
  date: '2026-10-20',
  tema: 'Arquitecturas',
  title: 'Comportamiento ante fallos y Editor-Suscriptor',
  idea:
    'El quinto aspecto de diseño es qué garantiza el sistema cuando algo falla. Con reintentos e idempotencia se acerca a "exactamente una vez". Luego, editor-suscriptor: desacoplado en tiempo y espacio.',
  keyTerms: ['At-least-once', 'At-most-once', 'Exactly-once', 'Idempotencia', 'Épocas', 'Broker', 'Push / Pull', 'WebSocket'],
  sections: [
    {
      heading: 'Las cuatro semánticas',
      blocks: [
        { type: 'diagram', id: 'semanticas' },
        {
          type: 'table',
          headers: ['Semántica', 'Ejecuciones', 'Idea'],
          rows: [
            ['Arbitraria', '0 a N', 'Sin control: se pierden o se duplican datos. Evitarla.'],
            ['**Al menos una vez**', '≥ 1', 'Reintentar hasta recibir respuesta'],
            ['**Como mucho una vez**', '0 o 1', 'Pedir una vez; si falla, "no se pudo"'],
            ['**Exactamente una vez**', '= 1', 'El ideal; casi imposible con fallos'],
          ],
        },
        {
          type: 'callout',
          text: '**Al menos una vez + operaciones idempotentes ≈ exactamente una vez.** No envíes "suma 100.000"; envía "el saldo final es 1.100.000", o marca cada tarea con un **ID único**.',
        },
        {
          type: 'list',
          items: [
            'Si se pierde la petición: retransmitir con **números de secuencia**.',
            'Si se pierde la respuesta: guardar un **histórico de respuestas** y devolver la misma.',
            'Para detectar clientes caídos: **épocas** (contador por reinicio) y **leases**. Abortar no es trivial: puede dejar todo incoherente.',
          ],
        },
      ],
    },
    {
      heading: 'Editor-Suscriptor',
      blocks: [
        { type: 'diagram', id: 'pubsub' },
        {
          type: 'list',
          items: [
            'Los editores publican **eventos** en un **broker**; los suscriptores reciben solo los temas que les interesan.',
            '**Desacoplado en tiempo y espacio**. Usos: bolsa de valores, domótica, IoT.',
            '**Push**: la plataforma notifica (tiempo real). **Pull**: el suscriptor pregunta (eventos no urgentes).',
            'Implementación ideal: un **clúster de brokers**. Un broker único es un punto crítico de fallo.',
          ],
        },
        {
          type: 'p',
          text: 'Con cliente-servidor se puede **simular**: client polling, **long polling** (sin timeout), **server push**, Server-Sent Events y **WebSocket**. Pero "si solo tienes un martillo, todo parece una puntilla".',
        },
        {
          type: 'callout',
          text: 'Para agregar un consumidor nuevo, en pub-sub solo se suscribe; en cliente-servidor hay que modificar el cliente. Pero si el emisor necesita **retroalimentación**, cliente-servidor es mejor porque su canal es bidireccional.',
        },
        {
          type: 'p',
          text: '**Parcial 1:** 40% cuestionario teórico sincrónico y 60% ejercicio de arquitectura. Revisar **peer-to-peer**, que no se alcanzó a ver.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué semántica garantiza 0 o 1 ejecuciones?', a: 'Como mucho una vez (at-most-once).' },
    { q: '¿Cómo se pasa de "al menos una vez" a "exactamente una vez"?', a: 'Haciendo las operaciones idempotentes (estado final o ID único de tarea).' },
    { q: 'Push vs. pull en pub-sub', a: 'Push: la plataforma notifica al suscriptor. Pull: el suscriptor pregunta si hay eventos.' },
  ],
};
