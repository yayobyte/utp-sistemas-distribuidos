import type { Clase } from './types';

export const clase19: Clase = {
  number: 19,
  date: '2026-11-10',
  tema: 'Nombres',
  title: 'Servicios de nombres y servicios de directorio',
  idea:
    'Cómo encontrar un recurso en un sistema distribuido. Un servicio de nombres (como las páginas blancas) traduce un nombre exacto a una dirección. Un servicio de directorio (como las páginas amarillas) busca por características y devuelve todos los recursos que las cumplen. Es el último tema del segundo parcial.',
  keyTerms: ['Nombre', 'Dirección', 'Indirección', 'URI / URN / URL', 'Servicio de nombres', 'Espacio de nombres', 'Traducción de rutas', 'Resolución inversa', 'TTL', 'Servicio de directorio', 'Atributos', 'Esquema / clases', 'DN (nombre distinguido)', 'resolve vs. search'],
  sections: [
    {
      heading: 'Nombre, dirección e indirección',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Dirección', text: 'Dónde está el recurso: la IP de un servidor, la posición de un archivo en el disco, la MAC de una tarjeta de red, el puerto de un sensor.' },
            { title: 'Nombre', text: 'La cadena de caracteres que le ponemos a esa ubicación para identificarla: un dominio, el nombre de un archivo, una variable, un correo.' },
          ],
        },
        {
          type: 'p',
          text: 'La **indirección** es ponerle un alias a la dirección. ¿Para qué, si podríamos usar la dirección directamente?',
        },
        {
          type: 'list',
          items: [
            '**Los humanos recordamos mejor nombres que direcciones**: sabemos cómo se llama un compañero, no su número de teléfono; recordamos `www.utp.edu.co`, no su IP.',
            '**Migración y replicación**: si el servidor muere y hay uno de respaldo, el mismo nombre ahora apunta al respaldo, sin que el usuario se entere.',
            'Por eso estos servicios **aumentan la transparencia** (de ubicación, de migración, de réplica).',
            'Pero son **otro servidor más** dentro del sistema, con caché: hay que pensar en cómo mantener esa caché actualizada, y en los problemas de siempre (cuello de botella, punto único de fallo).',
          ],
        },
      ],
    },
    {
      heading: 'URI: URN + URL',
      blocks: [
        {
          type: 'table',
          headers: ['Sigla', 'Significa', 'Qué identifica'],
          rows: [
            ['**URI**', 'Uniform Resource Identifier', 'La forma estándar de identificar cualquier recurso accesible por la red. Tiene dos partes:'],
            ['**URN**', 'Uniform Resource Name', 'El **nombre** del recurso, único en todo internet'],
            ['**URL**', 'Uniform Resource Locator', 'La **ubicación** del recurso (dominio o IP + ruta); no tiene que ser un número'],
          ],
        },
        {
          type: 'callout',
          text: '**¿Por qué casi nadie usa URNs?** Porque internet nunca tuvo un servicio de nombres genérico para todos los recursos. Un **buscador no es un servicio de nombres**: busca coincidencias dentro del contenido, mientras que un servicio de nombres necesita el nombre completo y exacto.',
        },
      ],
    },
    {
      heading: 'Servicio de nombres: las páginas blancas',
      blocks: [
        {
          type: 'p',
          text: 'Como el viejo directorio telefónico ordenado alfabéticamente por apellido: si sé el nombre exacto de la persona, encuentro su dirección y su teléfono. Un servicio de nombres tiene **una sola función**: dado un nombre, devolver su ubicación.',
        },
        {
          type: 'table',
          headers: ['Servicio', 'Traduce', 'A'],
          rows: [
            ['**DNS**', 'Nombre de dominio', 'Dirección IP'],
            ['**ARP**', 'Dirección IP', 'Dirección MAC de la tarjeta de red'],
            ['**Sistema de archivos**', 'Ruta (`C:\\Windows\\...`, `/home/...`)', 'Disco, partición, inodo y bloques'],
            ['**Correo electrónico**', '`usuario@utp.edu.co`', 'Servidor de correo y buzón'],
            ['**Servidor HTTP**', 'Ruta de la URL', 'Aplicación o archivo en disco'],
            ['**Azure Resource Manager**', 'Nombre o ID del recurso', 'La VM, storage o gateway; sobre él se asignan permisos y roles'],
          ],
        },
        {
          type: 'list',
          items: [
            'Es **bidireccional**: nombre → dirección (resolución) y dirección → nombre (**resolución inversa**).',
            'Un nombre puede devolver **varias direcciones** (réplicas): el cliente elige una, al azar o con muestreo, o se apunta a un balanceador de carga.',
            'Es básicamente un **binder** (clases de cliente-servidor y RPC), pero para cualquier tipo de recurso, no solo servidores.',
            'Las comparaciones son **exactas**: no hay búsquedas tipo `LIKE` ("todos los servidores de la UTP"). Si escribo mal el nombre, no lo encuentra.',
          ],
        },
      ],
    },
    {
      heading: 'Espacio de nombres y traducción de rutas',
      blocks: [
        {
          type: 'p',
          text: 'El **espacio de nombres** es el conjunto de todos los nombres válidos y cómo se organizan. Casi siempre es **jerárquico**, como un árbol de carpetas, porque guardar todos los nombres del mundo en una sola tabla sería imposible de gestionar.',
        },
        {
          type: 'table',
          headers: ['', 'Sistema de archivos', 'DNS'],
          rows: [
            ['Ejemplo', '`D:\\archivos\\universidad\\semestre10\\distribuidos`', '`www.utp.edu.co`'],
            ['Se lee', 'De **izquierda a derecha**: disco, carpeta, subcarpeta… archivo', 'De **derecha a izquierda**: `co` (Colombia) → `edu` (educativas) → `utp` → `www` (el servidor)'],
            ['Rutas relativas', 'Sí: "abre `clientes.csv`" desde la carpeta actual', 'No: siempre el dominio **completo** (absoluto)'],
          ],
        },
        {
          type: 'list',
          items: [
            '**Traducción de rutas**: se resuelve nivel por nivel; cada nivel reduce el conjunto de candidatos hasta llegar al recurso.',
            '**Traducción de dos niveles**: nombre del usuario → identificador interno → dirección física. Ejemplo: el DFS de la clase 18 traduce la ruta a una ubicación global, y esa ubicación a qué máquina y qué disco. Lo más común es la traducción directa.',
          ],
        },
      ],
    },
    {
      heading: 'Escalar el servicio de nombres',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Replicación', text: 'Varios servidores con **la misma información** y las consultas repartidas entre ellos (scale out). Puede ser activa (simétrica) o pasiva (primario-secundario), como ya vimos.' },
            { title: 'Distribución', text: 'Cada servidor gestiona **solo su parte** del espacio de nombres: el DNS de la UTP, el de la Católica, el de la Libre. Entre ellos se hablan: si preguntan al de la UTP por la Católica, él le consulta al de la Católica.' },
          ],
        },
        {
          type: 'list',
          items: [
            'Tras consultar a otro servidor, guarda la respuesta en **caché**: las siguientes peticiones del mismo nombre se responden sin salir.',
            'La vigencia de cada entrada en caché la define el **TTL** (tiempo de vida). Como un dominio casi nunca cambia de servidor, puede ser largo (horas o incluso días).',
            'Si la dirección cacheada ya no responde, se detecta y se vuelve a consultar; o se usa invalidación cuando cambia el dato de origen (como en la caché del DFS).',
          ],
        },
      ],
    },
    {
      heading: 'Servicio de directorio: las páginas amarillas',
      blocks: [
        {
          type: 'p',
          text: 'En las páginas amarillas no se busca por nombre sino por **categoría**: "restaurantes", "fontaneros". Un servicio de directorio localiza recursos por sus **características** sin necesidad de saber cómo se llaman, y puede guardar recursos de **muchos tipos** en un mismo lugar: usuarios, impresoras, servidores, bases de datos, credenciales.',
        },
        {
          type: 'callout',
          text: '**Ejemplo de la impresora.** Con nombres: hay que saber que está en el equipo de "Martica", en la secretaría, y cuál de sus tres impresoras es. Con directorio: "impresora **a color**, que soporte **A4**, en la **Facultad de Ingenierías**, de **Sistemas**". Cada filtro reduce el grupo. Al final se puede pedir "imprime en la impresora a color más cercana" sin saber cuál es.',
        },
        {
          type: 'list',
          items: [
            '**Estructura de árbol dirigido** para las categorías (clases), pero un mismo recurso se enlaza a **varias hojas** a la vez: no queda clasificado en un solo lugar.',
            '**Entradas y atributos**: cada objeto es un conjunto de pares clave-valor (`facultad = Ingenierías`, `programa = Sistemas`).',
            '**Clases y esquemas**: definen qué atributos puede tener cada tipo de objeto, cuáles son obligatorios y cuáles opcionales.',
            '**DN (Distinguished Name)**: la concatenación de los atributos que identifican de forma única a un objeto. Si dos objetos tienen exactamente los mismos valores, o son el mismo, o falta un atributo que los distinga (modelo, serial, año).',
            'Aquí el nombre casi deja de importar: se llega al recurso por sus características.',
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'Optimizado para leer', text: 'Muchas consultas, pocas escrituras: lo contrario de una base de datos transaccional.' },
            { title: 'Filtros complejos', text: 'Muchas condiciones y restricciones por consulta; justo eso es lo que está optimizado.' },
            { title: 'Descentralizado', text: 'Puede replicarse y distribuirse para no ser cuello de botella (aunque en la práctica muchas empresas tienen uno solo).' },
            { title: 'Seguridad por objeto', text: 'Controla quién puede consultar cada recurso (por grupo o atributos). En un servicio de nombres, lo normal es que todo sea consultable.' },
          ],
        },
      ],
    },
    {
      heading: 'Nombres vs. directorio',
      blocks: [
        {
          type: 'table',
          headers: ['', 'Servicio de nombres', 'Servicio de directorio'],
          rows: [
            ['Analogía', '**Páginas blancas**', '**Páginas amarillas**'],
            ['Pregunta', '¿**Quién** es? (sé a quién busco)', '¿**Qué** necesito? (no sé quién es)'],
            ['Entrada', 'El nombre **exacto**, sin errores', 'Un conjunto de **atributos y filtros**'],
            ['Salida', '**Una** dirección (IP, ubicación, puerto)', '**Uno, muchos o ninguno**; si son muchos, se refina el filtro'],
            ['Carga de trabajo', 'Alta frecuencia de actualización (renueva su caché)', 'Optimizado para consultas; objetos poco volátiles'],
            ['Tipo de recurso', 'Uno solo por servicio (DNS: dominios)', 'De todo tipo en el mismo servicio'],
            ['Operación clave', '`resolve` (y resolución inversa)', '`search` con filtros'],
          ],
        },
        {
          type: 'list',
          items: [
            'Son **complementarios**: un sistema puede tener un directorio para unos recursos y varios servicios de nombres para otros.',
            'En ambos importan la **jerarquía**, la **replicación** y la **caché**, para no volverse cuello de botella. Un directorio único con filtros muy distintos en cada consulta puede saturarse.',
            'La **indirección** es la clave de la transparencia: el recurso puede moverse, replicarse o cambiar sin que el usuario lo note.',
          ],
        },
        {
          type: 'callout',
          text: '**Pregunta de clase: ¿internet usa nombres o directorio?** Nombres, y **muchos encadenados**: DNS (dominio → IP), ARP (IP → MAC), el servidor HTTP (URL → aplicación o archivo) y el sistema de archivos (ruta → disco). Un gran directorio de todos los recursos de internet sería imposible de mantener actualizado y de optimizar; servicios de nombres pequeños, cada uno con una sola tarea, escalan mucho mejor.',
        },
        {
          type: 'callout',
          text: '**Avisos:** con este tema se cierra el segundo parcial, que incluye comunicación (paso de mensajes, RPC, RMI, servicios web), sistemas de archivos distribuidos y paralelos, y servicios de nombres y de directorio. Hay un taller de investigación sobre servicios de nombres y de directorio para la próxima semana. La primera exposición empieza el jueves.',
        },
      ],
    },
  ],
  repaso: [
    { q: '¿Qué es la indirección y por qué la usamos?', a: 'Ponerle un nombre (alias) a una dirección. Los nombres son más fáciles de recordar, y permite mover o replicar el recurso sin que el usuario lo note (transparencia).' },
    { q: 'URI, URN y URL', a: 'URI es el identificador de un recurso en internet; se compone de la URN (su nombre) y la URL (su ubicación).' },
    { q: '¿Cómo se lee www.utp.edu.co?', a: 'De derecha a izquierda: co (Colombia), edu (entidades educativas), utp (la universidad), www (el servidor web).' },
    { q: 'Replicación vs. distribución en un servicio de nombres', a: 'Replicación: varios servidores con toda la información. Distribución: cada servidor gestiona solo su parte del espacio de nombres y consulta a los demás cuando no sabe, guardando la respuesta en caché.' },
    { q: '¿Para qué sirve el TTL?', a: 'Define cuánto tiempo una respuesta puede quedarse en la caché antes de volver a consultarla.' },
    { q: '¿Qué es un DN?', a: 'El nombre distinguido: la combinación de atributos que identifica de forma única a un objeto en el directorio.' },
    { q: 'Diferencia clave entre servicio de nombres y de directorio', a: 'Nombres: entrada exacta, una respuesta, operación resolve (páginas blancas). Directorio: búsqueda por atributos, cero o más respuestas, operación search (páginas amarillas).' },
    { q: '¿Por qué internet usa servicios de nombres y no un gran directorio?', a: 'Porque un directorio con todos los recursos del mundo sería imposible de mantener y optimizar; muchos servicios de nombres pequeños y especializados (DNS, ARP, HTTP, sistema de archivos) escalan mejor.' },
  ],
};
