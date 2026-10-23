import React from 'react';
import type { DiagramId } from '../../../data/clases/types';
import './ClaseDiagram.styles.css';

const Arrow: React.FC<{ d: string; dashed?: boolean; muted?: boolean }> = ({ d, dashed, muted }) => (
  <path d={d} className={muted ? 'cd-edge' : 'cd-arrow'} markerEnd={muted ? 'url(#cd-head-muted)' : 'url(#cd-head)'} strokeDasharray={dashed ? '5 4' : undefined} />
);

const Box: React.FC<{ x: number; y: number; w: number; h: number; label: string; filled?: boolean; sub?: string }> = ({ x, y, w, h, label, filled, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={6} className={filled ? 'cd-node-filled' : 'cd-node'} />
    <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 4)} textAnchor="middle" className={filled ? 'cd-on-fill' : undefined}>{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className="cd-label">{sub}</text>}
  </g>
);

const Bar: React.FC<{ x: number; y: number; w: number; h: number; label: string; value: string; muted?: boolean }> = ({ x, y, w, h, label, value, muted }) => (
  <g>
    <text x={x - 8} y={y + h / 2 + 4} textAnchor="end">{label}</text>
    <rect x={x} y={y} width={Math.max(w, 2)} height={h} rx={3} className={muted ? 'cd-bar-muted' : 'cd-bar'} />
    <text x={x + w + 8} y={y + h / 2 + 4} className="cd-label">{value}</text>
  </g>
);

const diagrams: Record<DiagramId, { viewBox: string; title: string; body: React.ReactNode }> = {
  'servidor-vs-pcs': {
    viewBox: '0 0 600 210',
    title: 'Comparación entre un servidor gigante y 400 PCs con el mismo presupuesto',
    body: (
      <>
        <text x="20" y="22" className="cd-heading">Núcleos</text>
        <Bar x={150} y={32} w={96} h={18} label="1 servidor" value="896" muted />
        <Bar x={150} y={56} w={385} h={18} label="400 PCs" value="~3.600" />
        <text x="20" y="112" className="cd-heading">RAM</text>
        <Bar x={150} y={122} w={385} h={18} label="1 servidor" value="48 TB" muted />
        <Bar x={150} y={146} w={51} h={18} label="400 PCs" value="~6,4 TB" />
        <text x="20" y="196" className="cd-label">El servidor gana en RAM, pero los PCs se compran de a pocos y no tienen un único punto de fallo.</text>
      </>
    ),
  },
  'cluster-vs-grid': {
    viewBox: '0 0 600 200',
    title: 'Clúster centralizado frente a grid distribuido',
    body: (
      <>
        <rect x="10" y="20" width="270" height="165" rx="10" className="cd-zone" />
        <text x="24" y="40" className="cd-heading">Clúster: un sitio, nodos iguales</text>
        <Box x={110} y={60} w={70} h={30} label="Switch" filled />
        {[30, 90, 150, 210].map((x) => (
          <g key={x}>
            <Box x={x} y={130} w={44} h={32} label="N" />
            <path d={`M${x + 22} 130 L145 90`} className="cd-edge" />
          </g>
        ))}
        <rect x="320" y="20" width="270" height="165" rx="10" className="cd-zone" />
        <text x="334" y="40" className="cd-heading">Grid: varios sitios, nodos distintos</text>
        <Box x={345} y={60} w={70} h={34} label="Sede A" />
        <Box x={490} y={70} w={80} h={40} label="Clúster B" />
        <Box x={360} y={135} w={56} h={28} label="PC" />
        <Box x={480} y={140} w={90} h={30} label="Sede C" />
        <path d="M415 77 L490 88 M388 94 L388 135 M416 149 L480 155 M530 110 L525 140" className="cd-edge" strokeDasharray="4 4" />
        <text x="445" y="118" className="cd-label" textAnchor="middle">internet</text>
      </>
    ),
  },
  'distancia-cables': {
    viewBox: '0 0 600 140',
    title: 'Distancia máxima sin repetidor por medio de transmisión',
    body: (
      <>
        <Bar x={120} y={20} w={40} h={22} label="UTP" value="100 m" muted />
        <Bar x={120} y={56} w={200} h={22} label="Coaxial" value="~500 m – 1 km" muted />
        <Bar x={120} y={92} w={400} h={22} label="Fibra" value="casi sin límite" />
      </>
    ),
  },
  'modelos-recursos': {
    viewBox: '0 0 640 150',
    title: 'Modelos de computación según quién aporta los recursos',
    body: (
      <>
        <path d="M20 60 H620" className="cd-edge" markerEnd="url(#cd-head-muted)" />
        {[
          ['Cluster', 'una organización', 20],
          ['Grid', 'varias organizaciones', 140],
          ['Volunteer', 'personas', 260],
          ['Utility / Cloud', 'un proveedor que cobra', 380],
          ['Edge / Fog', 'nodos cerca del usuario', 510],
        ].map(([name, who, x]) => (
          <g key={name as string}>
            <circle cx={(x as number) + 50} cy={60} r={7} className="cd-dot" />
            <text x={(x as number) + 50} y={40} textAnchor="middle" className="cd-heading">{name}</text>
            <text x={(x as number) + 50} y={86} textAnchor="middle" className="cd-label">{who}</text>
          </g>
        ))}
        <text x="20" y="130" className="cd-label">Mobile, Ubiquitous y Autonomic describen el tipo de dispositivo o comportamiento, no quién pone los recursos.</text>
      </>
    ),
  },
  'pila-responsabilidad': {
    viewBox: '0 0 620 330',
    title: 'Quién administra cada capa en on-premises, IaaS, PaaS y SaaS',
    body: (
      <>
        {['Aplicaciones', 'Datos', 'Runtime', 'Middleware', 'Sistema operativo', 'Virtualización', 'Servidores', 'Almacenamiento', 'Red'].map((layer, i) => {
          const y = 40 + i * 30;
          const youUntil = [9, 4, 2, 0];
          return (
            <g key={layer}>
              <text x="130" y={y + 18} textAnchor="end">{layer}</text>
              {[0, 1, 2, 3].map((col) => {
                const isYou = i < youUntil[col];
                return <rect key={col} x={145 + col * 115} y={y} width={105} height={26} rx={4} className={isYou ? 'cd-cell-you' : 'cd-cell-prov'} />;
              })}
            </g>
          );
        })}
        {['On-premises', 'IaaS', 'PaaS', 'SaaS'].map((h, col) => (
          <text key={h} x={197 + col * 115} y="28" textAnchor="middle" className="cd-heading">{h}</text>
        ))}
        <rect x="145" y="312" width="14" height="12" rx="2" className="cd-cell-you" />
        <text x="165" y="322" className="cd-label">Tú</text>
        <rect x="205" y="312" width="14" height="12" rx="2" className="cd-cell-prov" />
        <text x="225" y="322" className="cd-label">Proveedor</text>
      </>
    ),
  },
  'edge-fog-cloud': {
    viewBox: '0 0 620 170',
    title: 'Capas edge, fog y cloud con su latencia',
    body: (
      <>
        <Box x={20} y={60} w={130} h={44} label="Dispositivo" sub="edge" />
        <Box x={245} y={60} w={130} h={44} label="Nodo cercano" sub="fog" />
        <Box x={470} y={60} w={130} h={44} label="Nube" sub="centro de datos" filled />
        <Arrow d="M150 82 H243" />
        <Arrow d="M375 82 H468" />
        <text x="197" y="72" textAnchor="middle" className="cd-label">ms</text>
        <text x="422" y="72" textAnchor="middle" className="cd-label">decenas–cientos de ms</text>
        <path d="M20 135 H600" className="cd-edge" />
        <text x="20" y="155" className="cd-label">más cerca = menos latencia</text>
        <text x="600" y="155" textAnchor="end" className="cd-label">más lejos = más capacidad</text>
      </>
    ),
  },
  'cuello-vs-spof': {
    viewBox: '0 0 620 180',
    title: 'Cuello de botella frente a punto único de fallo',
    body: (
      <>
        <text x="20" y="24" className="cd-heading">Cuello de botella: limita cuánto crece</text>
        {[40, 70, 100].map((y) => <Arrow key={y} d={`M20 ${y + 10} L150 85`} muted />)}
        <Box x={150} y={68} w={70} h={34} label="BD" filled />
        <Arrow d="M220 85 H275" />
        <text x="20" y="160" className="cd-label">Todo pasa por aquí: al 99% de CPU, el sistema no crece.</text>
        <text x="340" y="24" className="cd-heading">Punto único de fallo: si cae, cae todo</text>
        <Box x={430} y={60} w={80} h={34} label="Maestro" filled />
        {[350, 440, 530].map((x) => (
          <g key={x}>
            <Box x={x} y={120} w={60} h={28} label="T" />
            <path d={`M470 94 L${x + 30} 120`} className="cd-edge" strokeDasharray="4 4" />
          </g>
        ))}
        <path d="M455 52 L485 102 M485 52 L455 102" className="cd-cross" />
      </>
    ),
  },
  'cuadrante-acoplamiento': {
    viewBox: '0 0 560 300',
    title: 'Cuadrante de acoplamiento espacial y temporal',
    body: (
      <>
        <text x="330" y="22" textAnchor="middle" className="cd-heading">Temporal</text>
        <text x="225" y="42" textAnchor="middle" className="cd-label">acoplado (a la vez)</text>
        <text x="435" y="42" textAnchor="middle" className="cd-label">desacoplado (cuando sea)</text>
        <text x="30" y="160" className="cd-heading" transform="rotate(-90 30 160)" textAnchor="middle">Espacial</text>
        <text x="60" y="105" className="cd-label">conoce al otro</text>
        <text x="60" y="215" className="cd-label">no lo conoce</text>
        {[
          [120, 52, 'Llamada telefónica', 'cliente-servidor'],
          [330, 52, 'Mensaje de voz', 'poco usado'],
          [120, 162, 'Transmisión en vivo', 'push / pub-sub'],
          [330, 162, 'Tablón / colas', 'ideal distribuido'],
        ].map(([x, y, a, b], i) => (
          <g key={a as string}>
            <rect x={x as number} y={y as number} width={200} height={100} rx={8} className={i === 3 ? 'cd-node-filled' : 'cd-node'} />
            <text x={(x as number) + 100} y={(y as number) + 46} textAnchor="middle" className={i === 3 ? 'cd-on-fill' : undefined}>{a}</text>
            <text x={(x as number) + 100} y={(y as number) + 66} textAnchor="middle" className={i === 3 ? 'cd-on-fill' : 'cd-label'}>{b}</text>
          </g>
        ))}
      </>
    ),
  },
  'maestro-trabajador': {
    viewBox: '0 0 560 190',
    title: 'Arquitectura maestro-trabajador',
    body: (
      <>
        <Box x={20} y={70} w={80} h={36} label="Usuario" />
        <Arrow d="M100 88 H198" />
        <text x="148" y="80" textAnchor="middle" className="cd-label">tareas</text>
        <Box x={200} y={70} w={100} h={36} label="Maestro" filled />
        {[20, 75, 130].map((y, i) => (
          <g key={y}>
            <Arrow d={`M300 88 L418 ${y + 18}`} />
            <Box x={420} y={y} w={110} h={34} label={`Trabajador ${i + 1}`} />
          </g>
        ))}
        <text x="200" y="135" className="cd-label">Toda la comunicación pasa por el maestro.</text>
        <text x="200" y="152" className="cd-label">Si cae el maestro, cae todo.</text>
      </>
    ),
  },
  'grosor-cliente': {
    viewBox: '0 0 620 260',
    title: 'Formas de repartir las capas entre cliente y servidor',
    body: (
      <>
        {['Presentación', 'Lógica', 'Datos'].map((l, i) => (
          <text key={l} x={160 + i * 150} y="24" textAnchor="middle" className="cd-heading">{l}</text>
        ))}
        {[
          ['1 · Web clásica', 0.5],
          ['2 · SPA simple', 1],
          ['3 · Parte de la lógica', 1.5],
          ['4 · App + BD remota', 2],
          ['5 · Modo desconectado', 2.5],
        ].map(([name, cut], row) => {
          const y = 38 + row * 42;
          const cutX = 85 + (cut as number) * 150;
          return (
            <g key={name as string}>
              <text x="80" y={y + 20} textAnchor="end" className="cd-label">{name}</text>
              <rect x={85} y={y} width={cutX - 85} height={28} rx={4} className="cd-cell-you" />
              <rect x={cutX} y={y} width={535 - cutX} height={28} rx={4} className="cd-cell-prov" />
            </g>
          );
        })}
        <rect x="85" y="250" width="14" height="10" rx="2" className="cd-cell-you" />
        <text x="105" y="259" className="cd-label">Cliente</text>
        <rect x="170" y="250" width="14" height="10" rx="2" className="cd-cell-prov" />
        <text x="190" y="259" className="cd-label">Servidor</text>
        <text x="535" y="259" textAnchor="end" className="cd-label">ligero → pesado</text>
      </>
    ),
  },
  proxies: {
    viewBox: '0 0 640 160',
    title: 'Forward proxy del lado de los clientes y reverse proxy del lado de los servidores',
    body: (
      <>
        <rect x="6" y="18" width="230" height="130" rx="8" className="cd-zone" />
        <text x="16" y="36" className="cd-label">Organización de los clientes</text>
        <rect x="404" y="18" width="230" height="130" rx="8" className="cd-zone" />
        <text x="414" y="36" className="cd-label">Organización de los servidores</text>
        <circle cx="40" cy="72" r="14" className="cd-node" />
        <circle cx="40" cy="114" r="14" className="cd-node" />
        <Box x={110} y={76} w={110} h={34} label="Forward proxy" />
        <path d="M54 74 L110 88 M54 112 L110 98" className="cd-arrow" />
        <ellipse cx="320" cy="93" rx="52" ry="26" className="cd-cloud" />
        <text x="320" y="97" textAnchor="middle">Internet</text>
        <path d="M220 93 L268 93 M372 93 L418 93" className="cd-arrow" />
        <Box x={418} y={76} w={110} h={34} label="Reverse proxy" filled />
        <Box x={570} y={54} w={50} h={26} label="S1" />
        <Box x={570} y={104} w={50} h={26} label="S2" />
        <path d="M528 88 L570 68 M528 98 L570 116" className="cd-arrow" />
      </>
    ),
  },
  'scale-up-out': {
    viewBox: '0 0 620 170',
    title: 'Escalado vertical frente a escalado horizontal',
    body: (
      <>
        <text x="20" y="22" className="cd-heading">Scale-up (vertical)</text>
        <Box x={30} y={100} w={44} h={44} label="S" />
        <Arrow d="M84 122 H132" />
        <Box x={140} y={40} w={90} h={104} label="S++" filled />
        <text x="20" y="162" className="cd-label">Más CPU y RAM. Tiene techo.</text>
        <text x="330" y="22" className="cd-heading">Scale-out (horizontal)</text>
        <Box x={330} y={60} w={110} h={30} label="Balanceador" />
        {[330, 400, 470, 540].map((x) => (
          <g key={x}>
            <Box x={x} y={114} w={56} h={34} label="S" filled={x === 540} />
            <path d={`M385 90 L${x + 28} 114`} className="cd-edge" />
          </g>
        ))}
        <text x="330" y="162" className="cd-label">Más máquinas. Hay que sincronizar los datos.</text>
      </>
    ),
  },
  replicacion: {
    viewBox: '0 0 640 190',
    title: 'Replicación activa frente a replicación pasiva',
    body: (
      <>
        <text x="20" y="22" className="cd-heading">Activa: el cliente envía a todas</text>
        <Box x={20} y={80} w={70} h={34} label="Cliente" />
        {[40, 90, 140].map((y) => (
          <g key={y}>
            <Arrow d={`M90 97 L198 ${y + 15}`} />
            <Box x={200} y={y} w={70} h={30} label="Réplica" filled />
          </g>
        ))}
        <text x="20" y="180" className="cd-label">Espera a todas: más nodos = escrituras más lentas.</text>
        <text x="340" y="22" className="cd-heading">Pasiva: solo el primario</text>
        <Box x={340} y={80} w={70} h={34} label="Cliente" />
        <Arrow d="M410 97 H458" />
        <Box x={460} y={80} w={80} h={34} label="Primario" filled />
        {[40, 140].map((y) => (
          <g key={y}>
            <Arrow d={`M540 97 L568 ${y + 15}`} dashed />
            <Box x={570} y={y} w={60} h={30} label="Backup" />
          </g>
        ))}
        <text x="340" y="180" className="cd-label">Responde y luego propaga el estado final.</text>
      </>
    ),
  },
  standby: {
    viewBox: '0 0 620 200',
    title: 'Cuándo sincroniza cada modo de standby',
    body: (
      <>
        <path d="M120 175 H600" className="cd-edge" markerEnd="url(#cd-head-muted)" />
        <text x="600" y="194" textAnchor="end" className="cd-label">tiempo</text>
        {[
          ['Hot', 40, [140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540]],
          ['Warm', 90, [240, 400, 560]],
          ['Cold', 140, [580]],
        ].map(([name, y, ticks]) => (
          <g key={name as string}>
            <text x="110" y={(y as number) + 5} textAnchor="end" className="cd-heading">{name}</text>
            <path d={`M120 ${y} H600`} className="cd-edge" />
            {(ticks as number[]).map((t) => <circle key={t} cx={t} cy={y as number} r={5} className="cd-dot" />)}
          </g>
        ))}
        <text x="130" y="20" className="cd-label">● = sincronización con el backup</text>
      </>
    ),
  },
  'modelos-servidor': {
    viewBox: '0 0 640 200',
    title: 'Modelos de servidor: secuencial, procesos, hilos y eventos',
    body: (
      <>
        {[
          ['Secuencial', 'cola FIFO', 20],
          ['Procesos', 'uno por petición', 180],
          ['Hilos', 'dentro de 1 proceso', 340],
          ['Eventos', '1 flujo, muchos clientes', 500],
        ].map(([t, s, x]) => (
          <g key={t as string}>
            <text x={(x as number) + 60} y="22" textAnchor="middle" className="cd-heading">{t}</text>
            <text x={(x as number) + 60} y="38" textAnchor="middle" className="cd-label">{s}</text>
          </g>
        ))}
        {[0, 1, 2].map((i) => <rect key={i} x={30 + i * 26} y={60} width={20} height={20} rx={3} className="cd-node" />)}
        <Box x={40} y={110} w={80} h={34} label="Servidor" filled />
        <Arrow d="M80 82 V108" />
        {[0, 1, 2].map((i) => <Box key={i} x={185 + i * 38} y={100} w={32} h={50} label="P" filled />)}
        <rect x="345" y="96" width="120" height="58" rx="8" className="cd-node" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={355 + i * 26} y={110} width={18} height={32} rx={3} className="cd-node-filled" />)}
        <Box x={530} y={110} w={60} h={34} label="Loop" filled />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={510 + i * 40} cy={70} r={10} className="cd-node" />
            <path d={`M${510 + i * 40} 80 L560 108`} className="cd-edge" strokeDasharray={i === 1 ? undefined : '3 3'} />
          </g>
        ))}
        <text x="20" y="186" className="cd-label">Procesos: pesados, riesgo de DoS. Hilos: livianos, comparten CPU. Eventos: sin crear nada, peor con altísima concurrencia.</text>
      </>
    ),
  },
  conexiones: {
    viewBox: '0 0 620 190',
    title: 'Una conexión por petición frente a conexión persistente',
    body: (
      <>
        <text x="20" y="22" className="cd-heading">Una conexión por petición</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={20 + i * 95} y={36} width={85} height={22} rx={4} className="cd-cell-prov" />
            <text x={62 + i * 95} y={51} textAnchor="middle" className="cd-label">conectar·pedir·cerrar</text>
          </g>
        ))}
        <text x="20" y="80" className="cd-label">Sencillo, más sobrecarga, cualquier servidor puede atender.</text>
        <text x="20" y="118" className="cd-heading">Conexión persistente</text>
        <rect x="20" y="132" width="275" height="22" rx="4" className="cd-cell-you" />
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={70 + i * 55} cy={143} r={5} className="cd-dot-light" />)}
        <text x="20" y="176" className="cd-label">Varias peticiones en una sesión, atada a un servidor.</text>
        <text x="340" y="60" className="cd-label">Cajero automático:</text>
        <text x="340" y="78" className="cd-label">tarjeta por cada operación</text>
        <text x="340" y="150" className="cd-label">Cajero persona:</text>
        <text x="340" y="168" className="cd-label">todo en tu turno</text>
      </>
    ),
  },
  binder: {
    viewBox: '0 0 600 230',
    title: 'Secuencia del binder',
    body: (
      <>
        <Box x={20} y={16} w={110} h={38} label="Cliente" />
        <Box x={245} y={16} w={110} h={38} label="Binder" filled />
        <Box x={470} y={16} w={110} h={38} label="Servidor" />
        <path d="M75 54 V220 M300 54 V220 M525 54 V220" className="cd-edge" strokeDasharray="3 4" />
        <Arrow d="M525 80 H304" />
        <text x="415" y="73" textAnchor="middle" className="cd-label">1 registrar("pagos", 10.0.0.7:5000)</text>
        <Arrow d="M75 115 H296" />
        <text x="185" y="108" textAnchor="middle" className="cd-label">2 ¿dónde está "pagos"?</text>
        <Arrow d="M300 145 H79" dashed />
        <text x="190" y="138" textAnchor="middle" className="cd-label">3 → 10.0.0.7:5000</text>
        <Arrow d="M75 190 H521" />
        <text x="300" y="183" textAnchor="middle" className="cd-label">4 conexión directa (el binder ya no participa)</text>
      </>
    ),
  },
  semanticas: {
    viewBox: '0 0 620 170',
    title: 'Número de ejecuciones garantizado por cada semántica',
    body: (
      <>
        {['0', '1', '2', 'N'].map((n, i) => (
          <text key={n} x={230 + i * 110} y="22" textAnchor="middle" className="cd-heading">{n}</text>
        ))}
        {[
          ['Arbitraria', 0, 3, true],
          ['Al menos una vez', 1, 3, false],
          ['Como mucho una vez', 0, 1, false],
          ['Exactamente una vez', 1, 1, false],
        ].map(([name, from, to, muted], row) => {
          const y = 36 + row * 32;
          const x1 = 230 + (from as number) * 110;
          const x2 = 230 + (to as number) * 110;
          return (
            <g key={name as string}>
              <text x="200" y={y + 14} textAnchor="end">{name}</text>
              <rect x={x1 - 12} y={y} width={x2 - x1 + 24} height={20} rx={10} className={muted ? 'cd-bar-muted' : 'cd-bar'} />
            </g>
          );
        })}
      </>
    ),
  },
  pubsub: {
    viewBox: '0 0 620 200',
    title: 'Editor-suscriptor con broker, en modo push y pull',
    body: (
      <>
        <Box x={20} y={40} w={90} h={32} label="Editor 1" />
        <Box x={20} y={120} w={90} h={32} label="Editor 2" />
        <Arrow d="M110 56 L238 92" />
        <Arrow d="M110 136 L238 104" />
        <text x="160" y="58" className="cd-label">publica</text>
        <Box x={240} y={78} w={110} h={40} label="Broker" filled sub="temas" />
        <Arrow d="M350 90 L478 40" />
        <text x="410" y="52" className="cd-label">push</text>
        <Box x={480} y={22} w={110} h={30} label="Suscriptor A" />
        <Arrow d="M350 98 L478 98" />
        <Box x={480} y={84} w={110} h={30} label="Suscriptor B" />
        <Arrow d="M480 160 L352 112" dashed />
        <text x="410" y="152" className="cd-label">pull: ¿hay algo?</text>
        <Box x={480} y={146} w={110} h={30} label="Suscriptor C" />
        <text x="20" y="192" className="cd-label">Nadie conoce a nadie: desacoplado en tiempo y espacio.</text>
      </>
    ),
  },
};

export const ClaseDiagram: React.FC<{ id: DiagramId; caption?: string }> = ({ id, caption }) => {
  const diagram = diagrams[id];
  return (
    <figure className="cd-figure">
      <div className="cd-scroll">
        <svg viewBox={diagram.viewBox} role="img" aria-label={diagram.title}>
          <defs>
            <marker id="cd-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="cd-head" />
            </marker>
            <marker id="cd-head-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="cd-head-muted" />
            </marker>
          </defs>
          {diagram.body}
        </svg>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
