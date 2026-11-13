export interface ServicioEjemplo {
  id: string;
  name: string;
  origin: string;
  url: string;
  description: string;
  /** Short "how it works" points. */
  puntos: string[];
  /** A sample query and its answer, to show the resolve vs. search difference. */
  ejemplo: { pregunta: string; respuesta: string };
  enClase: string;
}

export const serviciosNombres: ServicioEjemplo[] = [
  {
    id: 'dns',
    name: 'DNS (Domain Name System)',
    origin: 'Paul Mockapetris, 1983 (RFC 1034 y 1035)',
    url: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
    description:
      'Es el servicio de nombres de internet: traduce nombres de dominio (como www.utp.edu.co) a direcciones IP. Su espacio de nombres es un árbol jerárquico que se lee de derecha a izquierda, y está distribuido entre millones de servidores, cada uno responsable de su zona.',
    puntos: [
      'El cliente le pregunta a un **resolver** (el de su proveedor o uno público como 8.8.8.8).',
      'Si no tiene la respuesta en caché, el resolver pregunta a un **servidor raíz**, que lo remite al servidor de `.co`; este lo remite al de `edu.co`, y luego al de `utp.edu.co`, que tiene la respuesta.',
      'Guarda la respuesta en **caché** durante el **TTL** que indica el registro.',
      'Tiene varios tipos de registro: `A` / `AAAA` (IPv4/IPv6), `CNAME` (alias), `MX` (servidor de correo), y `PTR` para la resolución inversa (IP → nombre).',
      'Cada zona tiene servidores primario y secundarios que se replican entre sí.',
    ],
    ejemplo: { pregunta: 'resolve("www.utp.edu.co")', respuesta: 'Una dirección IP (o varias, si hay réplicas)' },
    enClase: 'Ejemplo central de la clase 19: espacio de nombres jerárquico, distribución por zonas, caché con TTL y resolución inversa.',
  },
  {
    id: 'eureka',
    name: 'Netflix Eureka (Spring Cloud)',
    origin: 'Netflix, 2012; hoy parte de Spring Cloud Netflix',
    url: 'https://spring.io/projects/spring-cloud-netflix',
    description:
      'Es un registro de servicios para arquitecturas de microservicios. Cada instancia de un servicio se registra con su nombre lógico (por ejemplo, PEDIDOS) y su dirección real (IP y puerto). Los demás servicios piden el nombre y reciben la lista de instancias disponibles.',
    puntos: [
      'Al arrancar, cada microservicio se **registra** en el servidor Eureka con su nombre, IP y puerto.',
      'Envía un **heartbeat** cada 30 segundos; si deja de enviarlo, a los 90 segundos se le retira del registro (lease).',
      'Los clientes descargan el registro y lo guardan en **caché** local, refrescándolo cada 30 segundos.',
      'Un nombre devuelve **varias instancias**, y el cliente elige una con un balanceador de carga (Spring Cloud LoadBalancer).',
      'Se pueden levantar varios servidores Eureka que se replican entre sí (peer awareness).',
    ],
    ejemplo: { pregunta: 'getInstances("PEDIDOS")', respuesta: '10.0.0.5:8081, 10.0.0.7:8081' },
    enClase: 'Es el binder del modelo cliente-servidor: un nombre que devuelve una o varias direcciones. Es parte de la exposición del Grupo C.',
  },
  {
    id: 'rmiregistry',
    name: 'Java RMI Registry',
    origin: 'Sun Microsystems, 1997 (JDK 1.1)',
    url: 'https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/hello/hello-world.html',
    description:
      'Es el servicio de nombres de Java RMI. Un servidor publica un objeto remoto con un nombre simple, y los clientes lo buscan por ese nombre para obtener una referencia (stub) con la que llaman a sus métodos como si fueran locales.',
    puntos: [
      'Se ejecuta como un proceso aparte (`rmiregistry`), por defecto en el puerto **1099**.',
      'El servidor hace `bind("Calculadora", objeto)` o `rebind(...)` para publicar el objeto con ese nombre.',
      'El cliente hace `lookup("rmi://host:1099/Calculadora")` y recibe el stub.',
      'Es un espacio de nombres **plano** (sin jerarquía) y la comparación es **exacta**: si el nombre está mal escrito, lanza `NotBoundException`.',
      'Por seguridad, solo acepta `bind` desde la misma máquina en la que corre.',
    ],
    ejemplo: { pregunta: 'lookup("Calculadora")', respuesta: 'El stub del objeto remoto' },
    enClase: 'El binder local de RMI (clase 16): stub, skeleton y lookup por nombre exacto.',
  },
];

export const serviciosDirectorio: ServicioEjemplo[] = [
  {
    id: 'active-directory',
    name: 'Microsoft Active Directory (AD DS)',
    origin: 'Microsoft, 1999 (Windows 2000 Server)',
    url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview',
    description:
      'Es el servicio de directorio de las redes empresariales con Windows. Guarda en un solo lugar usuarios, grupos, equipos, impresoras y carpetas compartidas, y con él se controla quién puede iniciar sesión y a qué recursos tiene acceso.',
    puntos: [
      'Organiza los objetos en un árbol de **dominios** y **unidades organizativas** (OU), por ejemplo por facultad o departamento.',
      'Cada objeto tiene **atributos** definidos por un **esquema** (un usuario tiene nombre, correo, departamento, grupos).',
      'Se consulta con **LDAP** y autentica con **Kerberos**; además, depende del **DNS** para que los equipos encuentren los controladores de dominio.',
      'Hay varios **controladores de dominio** con réplicas multimaestro: se puede escribir en cualquiera y los cambios se propagan.',
      'Aplica permisos por objeto y **directivas de grupo** (GPO) a usuarios y equipos.',
    ],
    ejemplo: {
      pregunta: 'search("(&(objectClass=printer)(printColor=TRUE)(location=Ingeniería*))")',
      respuesta: 'Todas las impresoras a color de Ingeniería',
    },
    enClase: 'El ejemplo de la impresora de la clase: buscar por características (a color, A4, Ingeniería de Sistemas) en lugar de por nombre.',
  },
  {
    id: 'openldap',
    name: 'OpenLDAP',
    origin: 'OpenLDAP Project, 1998 (basado en el LDAP de la Universidad de Michigan)',
    url: 'https://www.openldap.org/doc/admin26/intro.html',
    description:
      'Es la implementación libre más usada del protocolo LDAP (Lightweight Directory Access Protocol). Se usa en Linux y en universidades para centralizar cuentas de usuario, grupos y la información de autenticación de muchos sistemas.',
    puntos: [
      'Los datos forman un árbol llamado **DIT** (Directory Information Tree).',
      'Cada entrada se identifica con su **DN**, por ejemplo `uid=jperez,ou=estudiantes,dc=utp,dc=edu,dc=co`.',
      'Las **objectClass** del esquema definen qué atributos son obligatorios y cuáles opcionales.',
      'Las consultas usan **filtros**, como `(&(ou=sistemas)(semestre=10))`, y pueden devolver cero, uno o muchos resultados.',
      'Está optimizado para muchas lecturas y pocas escrituras, y se replica entre servidores (syncrepl, incluso multimaestro).',
    ],
    ejemplo: { pregunta: 'search("(&(ou=sistemas)(semestre=10))")', respuesta: 'Todos los estudiantes de décimo de Sistemas' },
    enClase: 'Entradas con atributos clave-valor, esquemas, DN y la operación search con filtros complejos.',
  },
  {
    id: 'entra-id',
    name: 'Microsoft Entra ID (antes Azure Active Directory)',
    origin: 'Microsoft, 2010 (renombrado en 2023)',
    url: 'https://learn.microsoft.com/en-us/entra/fundamentals/whatis',
    description:
      'Es el servicio de directorio e identidad en la nube de Microsoft. Guarda los usuarios, grupos, dispositivos y aplicaciones de una organización y da inicio de sesión único a Microsoft 365, Teams, Azure y miles de aplicaciones externas.',
    puntos: [
      'Es un servicio gestionado y distribuido globalmente: Microsoft lo replica en varios centros de datos.',
      'Las aplicaciones no usan LDAP sino protocolos web: **OAuth 2.0**, **OpenID Connect** y **SAML**.',
      'Se consulta con la API **Microsoft Graph** usando filtros, por ejemplo usuarios por departamento o cargo.',
      'Asigna permisos por **roles** y **grupos** sobre los recursos de Azure (los que se nombran con Azure Resource Manager).',
      'Se puede sincronizar con un Active Directory local (Entra Connect).',
    ],
    ejemplo: {
      pregunta: "GET /users?$filter=department eq 'Ingeniería'",
      respuesta: 'Todos los usuarios del departamento de Ingeniería',
    },
    enClase: 'Seguridad por objeto en el directorio, y el ejemplo de Azure que se dio en clase para asignar permisos a recursos.',
  },
];

export const t6MatrixColumns = ['Servicio', 'Tipo', 'Entrada', 'Salida', 'Estructura', 'Escalabilidad'];

export const t6Matrix: string[][] = [
  ['DNS', 'Nombres', 'Dominio exacto', 'IP(s)', 'Árbol jerárquico de zonas', 'Distribuido por zonas, caché con TTL'],
  ['Eureka', 'Nombres', 'Nombre lógico del servicio', 'Lista de instancias (IP:puerto)', 'Plana', 'Réplicas entre servidores, caché en el cliente'],
  ['RMI Registry', 'Nombres', 'Nombre exacto del objeto', 'Stub del objeto remoto', 'Plana', 'Un registro por máquina'],
  ['Active Directory', 'Directorio', 'Filtros LDAP sobre atributos', 'Cero, uno o muchos objetos', 'Dominios y OU', 'Controladores de dominio multimaestro'],
  ['OpenLDAP', 'Directorio', 'Filtros LDAP sobre atributos', 'Cero, uno o muchas entradas', 'Árbol DIT', 'Replicación syncrepl'],
  ['Microsoft Entra ID', 'Directorio', 'Filtros vía Microsoft Graph', 'Usuarios, grupos y apps que cumplen', 'Inquilino (tenant) en la nube', 'Servicio global gestionado'],
];
