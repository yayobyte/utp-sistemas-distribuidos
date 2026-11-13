import type { ChoiceItem, FamilyTile, SeqStep } from '../components/guia/GuiaParts';

export const almFamilies: FamilyTile[] = [
  { id: 'where', anchor: 'donde', number: 1, name: 'Dónde vive el disco', question: '¿Pegado al nodo, en la LAN o en su propia red?', terms: 'DAS, NAS, SAN, Samba, fibra' },
  { id: 'dfs', anchor: 'dfs', number: 2, name: 'Archivos distribuidos', question: '¿Cómo se ven muchos discos como uno solo?', terms: 'DFS, espacio de nombres único, cliente ligero / pesado, semánticas, caché, quórum' },
  { id: 'par', anchor: 'paralelos', number: 3, name: 'Paralelos y RAID', question: '¿Cómo leo de todos a la vez sin perder datos?', terms: 'Striping, mirroring, paridad XOR, modo degradado, RAID 0/1/5/6/10, Lustre' },
  { id: 'names', anchor: 'nombres', number: 4, name: 'Servicio de nombres', question: 'Sé a quién busco: ¿dónde está?', terms: 'Nombre, dirección, indirección, URI, DNS, espacio de nombres, TTL, resolve' },
  { id: 'dir', anchor: 'directorio', number: 5, name: 'Servicio de directorio', question: 'Sé qué necesito: ¿quiénes lo cumplen?', terms: 'Páginas amarillas, atributos, esquema, DN, search, LDAP, Active Directory' },
];

export const almExamClues: [string, string][] = [
  ['"red dedicada, fibra"', 'SAN'],
  ['"un nodo de discos en la LAN"', 'NAS'],
  ['"los cambios se ven al cerrar"', 'semántica de sesión'],
  ['"se lee secuencial"', 'DFS'],
  ['"paridad rotada"', 'RAID 5'],
  ['"nombre exacto"', 'servicio de nombres'],
  ['"por características"', 'servicio de directorio'],
];

export const storageTypes = [
  ['**DAS**', 'Discos conectados directo a cada nodo', 'Bus interno', 'Limitada por los puertos', 'Samba, carpeta compartida'],
  ['**NAS**', 'Un nodo dedicado a discos', 'LAN (Ethernet)', 'Decenas o cientos de TB', '"Dropbox" de la empresa'],
  ['**SAN**', 'Una red aparte solo para almacenamiento', 'Fibra, dos tarjetas por servidor', 'PB y más', 'Google, Netflix'],
];

export const semantics = [
  ['**Unix**', 'Todos sobre el original; los cambios se ven al instante', 'Mucho ancho de banda', 'NFS (aprox.)'],
  ['**De sesión**', 'Copia local; los cambios llegan al cerrar o guardar', 'Los demás ven la versión vieja', 'AFS'],
  ['**Inmutables**', 'Se escriben una vez y quedan de solo lectura', 'Para cambiar hay que crear otro archivo', 'HDFS, reportes'],
  ['**Transacciones atómicas**', 'Todo o nada; se envía el estado final', 'Más costosa', 'CODA (relajada)'],
];

export const raidTable = [
  ['**RAID 0**', 'Striping', '2', 'n', '0', 'Velocidad pura; si falla uno, se pierde todo'],
  ['**RAID 1**', 'Espejo', '2', '1 disco', 'n − 1', 'Simple y seguro, mitad del espacio'],
  ['**RAID 5**', 'Paridad **rotada**', '3', 'n − 1', '1', 'Equilibrio; modo degradado al fallar'],
  ['**RAID 6**', 'Doble paridad', '4', 'n − 2', '2', 'Discos grandes, reconstrucción larga'],
  ['**RAID 10**', 'Espejos + striping', '4', 'n / 2', '1 por par', 'Bases de datos'],
];

export const dfsExamples = [
  ['**NFS**', 'Cliente-servidor por RPC', 'Montar carpetas de un servidor'],
  ['**AFS**', 'Copia local completa, callbacks', 'Semántica de sesión'],
  ['**GFS / HDFS**', 'Maestro de metadatos + nodos de datos, 3 réplicas', 'Escribir una vez, leer muchas'],
  ['**CephFS**', 'CRUSH calcula la ubicación; monitores por quórum', 'Sin punto único de fallo'],
  ['**Lustre**', 'MDS para metadatos, OSS/OST para datos en franjas', 'Paralelo: supercomputación'],
  ['**GPFS / BeeGFS**', 'Bloques en todos los discos; tokens o buddy mirroring', 'Paralelo: HPC e IA'],
];

export const namesVsDir = [
  ['Analogía', '**Páginas blancas**', '**Páginas amarillas**'],
  ['Pregunta', '¿Dónde está **quién**?', '¿**Qué** recursos cumplen esto?'],
  ['Entrada', 'Nombre **exacto**', 'Atributos y filtros'],
  ['Salida', 'Una dirección (o varias réplicas)', 'Cero, uno o muchos'],
  ['Operación', '`resolve` (+ inversa)', '`search`'],
  ['Recursos', 'Un tipo por servicio', 'De todo tipo en el mismo'],
  ['Carga', 'Se actualiza a menudo (caché, TTL)', 'Muchas lecturas, pocos cambios'],
  ['Seguridad', 'Normalmente todo consultable', 'Permisos por objeto'],
  ['Ejemplos', 'DNS, ARP, RMI Registry, Eureka', 'Active Directory, OpenLDAP, Entra ID'],
];

export const internetChain = [
  ['**DNS**', '`www.utp.edu.co`', 'IP'],
  ['**ARP**', 'IP', 'MAC de la tarjeta'],
  ['**Servidor HTTP**', 'Ruta de la URL', 'Aplicación o archivo'],
  ['**Sistema de archivos**', 'Ruta del archivo', 'Disco, partición, bloques'],
];

export const dnsSteps: SeqStep[] = [
  { label: 'Pregunta', say: 'El navegador pregunta al **resolver** local por `www.utp.edu.co`. Si lo tiene en caché y el **TTL** no ha vencido, responde de una vez.' },
  { label: 'Raíz', say: 'No lo tiene: pregunta a un **servidor raíz**, que no sabe la IP pero sí quién maneja `.co`.' },
  { label: '.co', say: 'El servidor de `.co` lo remite al de `edu.co`. Se lee de **derecha a izquierda**: cada nivel reduce el espacio de nombres.' },
  { label: 'edu.co', say: 'El de `edu.co` lo remite al servidor de la **UTP**: distribución, cada uno solo conoce su zona.' },
  { label: 'utp.edu.co', say: 'El servidor de la UTP responde con la **IP** de `www` (o varias, si hay réplicas).' },
  { label: 'Caché', say: 'El resolver **guarda la respuesta en caché** durante el TTL y se la entrega al navegador. La próxima consulta no sale de la red local.' },
];

export interface Printer {
  name: string;
  color: boolean;
  a4: boolean;
  a3: boolean;
  facultad: string;
  programa: string;
}

export const printers: Printer[] = [
  { name: 'HP-Color-Sistemas-1', color: true, a4: true, a3: false, facultad: 'Ingenierías', programa: 'Sistemas' },
  { name: 'HP-Color-Sistemas-2', color: true, a4: true, a3: true, facultad: 'Ingenierías', programa: 'Sistemas' },
  { name: 'Epson-BN-Sistemas', color: false, a4: true, a3: false, facultad: 'Ingenierías', programa: 'Sistemas' },
  { name: 'Canon-Color-Industrial', color: true, a4: true, a3: true, facultad: 'Ingenierías', programa: 'Industrial' },
  { name: 'Ricoh-BN-Eléctrica', color: false, a4: true, a3: true, facultad: 'Ingenierías', programa: 'Eléctrica' },
  { name: 'Plotter-Artes', color: true, a4: false, a3: true, facultad: 'Bellas Artes', programa: 'Artes Visuales' },
  { name: 'HP-BN-Salud', color: false, a4: true, a3: false, facultad: 'Ciencias de la Salud', programa: 'Medicina' },
];

export const almQuizOptions = ['DAS', 'NAS', 'SAN', 'DFS', 'RAID 5', 'Servicio de nombres', 'Servicio de directorio'];

export const almQuiz: ChoiceItem[] = [
  { scenario: 'Netflix guarda petabytes en una red de fibra dedicada solo a almacenamiento.', answer: 'SAN', why: 'Red aparte, fibra y gran escala.' },
  { scenario: 'Compartes una carpeta de tu PC con Samba para que tus compañeros la abran.', answer: 'DAS', why: 'Son discos locales de una máquina concreta, no un nodo de almacenamiento.' },
  { scenario: 'Una pyme compra una caja con 4 discos que se conecta al switch y todos guardan ahí.', answer: 'NAS', why: 'Un nodo dedicado a discos, accesible por la LAN.' },
  { scenario: '100 nodos con 1 TB cada uno se ven como un único árbol de unos 100 TB, y los archivos se leen de forma secuencial.', answer: 'DFS', why: 'Junta los DAS y emula un sistema centralizado, sin paralelismo.' },
  { scenario: 'Cuatro discos, uno falla y el servidor sigue funcionando más lento mientras reconstruye con XOR.', answer: 'RAID 5', why: 'Paridad distribuida: tolera un disco y trabaja en modo degradado.' },
  { scenario: 'Escribes `www.utp.edu.co` y el sistema devuelve 200.21.x.x.', answer: 'Servicio de nombres', why: 'Nombre exacto → dirección (DNS).' },
  { scenario: 'Pides "una impresora a color, A4, en Ingeniería de Sistemas" sin saber cómo se llama.', answer: 'Servicio de directorio', why: 'Búsqueda por atributos; puede devolver varias.' },
  { scenario: 'Un cliente RMI hace `lookup("Calculadora")` para obtener el stub.', answer: 'Servicio de nombres', why: 'El RMI Registry resuelve un nombre exacto (binder).' },
  { scenario: 'Buscas en LDAP `(&(ou=sistemas)(semestre=10))` y salen 34 estudiantes.', answer: 'Servicio de directorio', why: 'Filtro por atributos con muchos resultados.' },
];

export const almQa = [
  { q: '¿Por qué un DFS no es "paralelo"?', a: 'Porque cada archivo es como una lista enlazada de bloques que se lee y escribe en **secuencia**: se llena un disco y se pasa al siguiente. Su objetivo es **emular** un sistema centralizado, no ser más rápido.' },
  { q: 'Escritura inmediata vs. diferida en la caché', a: 'Inmediata (**write-through**): al guardar se **actualizan** todas las cachés; datos frescos pero mucho tráfico (como la replicación activa). Diferida: solo se **invalidan** y cada nodo recarga cuando lo necesita.' },
  { q: 'Con 5 réplicas, ¿cuántas deben vivir para elegir primario?', a: '**3**, la mitad más uno (quórum). Si caen 3, el sistema se detiene.' },
  { q: '¿Por qué se rota la paridad?', a: 'Con un disco de paridad **dedicado** (RAID 4) toda escritura lo toca, así que es cuello de botella; y si se pierde junto con otro, no hay cómo reconstruir. Rotarla (RAID 5) reparte la carga.' },
  { q: '¿RAID reemplaza el backup?', a: 'No. Un borrado por error o un ransomware se copia a todos los discos al instante.' },
  { q: '¿Qué es la indirección y qué transparencias da?', a: 'Poner un nombre a una dirección. Da transparencia de **ubicación**, **migración** y **réplica**: si el servidor cambia, el nombre apunta al nuevo.' },
  { q: 'Replicación vs. distribución en un servicio de nombres', a: 'Replicación: varios servidores con **todo**. Distribución: cada uno con **su zona** (DNS de la UTP, de la Católica); se consultan entre ellos y guardan en caché.' },
  { q: '¿Qué es el DN?', a: 'El **nombre distinguido**: la concatenación de atributos que identifica a un único objeto, p. ej. `uid=jperez,ou=estudiantes,dc=utp,dc=edu,dc=co`. Si dos objetos coinciden en todo, falta un atributo (serial, modelo).' },
  { q: '¿Por qué internet usa nombres y no un gran directorio?', a: 'Un directorio con todos los recursos del mundo sería imposible de mantener y optimizar. Muchos servicios de nombres pequeños y especializados (DNS, ARP, HTTP, sistema de archivos) encadenados escalan mejor.' },
];
