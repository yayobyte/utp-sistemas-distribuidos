import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChoiceQuiz,
  FamilyMap,
  GuiaTable,
  GuiaTabs,
  SectionHead,
  StepButtons,
  VsCard,
  useSteps,
} from '../components/guia/GuiaParts';
import { RichText } from './ClasePage';
import {
  castModes,
  comExamClues,
  comFamilies,
  formats,
  httpVerbs,
  mechanismOptions,
  mechanismQuiz,
  middlewareMatrix,
  payloadSample,
  payloadSizes,
  richardson,
  rpcgenOutputs,
  soapVsRest,
  socketsByArch,
  stubSteps,
  timeline,
  typeSizes,
  webEras,
} from '../data/guiaComunicacion.data';
import type { CastMode } from '../data/guiaComunicacion.data';
import './GuiaEstudioPage.styles.css';
import './GuiaComunicacionPage.styles.css';

const fam = (n: number) => `Familia ${n}`;

// ── 2 · Endianness ───────────────────────────────────────────────

const toBytes = (n: number) => [24, 16, 8, 0].map((shift) => (n >>> shift) & 0xff);
const hex = (b: number) => b.toString(16).toUpperCase().padStart(2, '0');

const EndiannessLab: React.FC = () => {
  const [raw, setRaw] = useState('5');
  const value = Math.min(Math.max(Math.floor(Number(raw) || 0), 0), 0xffffffff);
  const big = toBytes(value);
  const little = [...big].reverse();
  // The little-endian sender's bytes, read by a big-endian receiver.
  const misread = little.reduce((acc, b) => acc * 256 + b, 0);

  return (
    <div className="guia-widget com-endian">
      <h3>Laboratorio: el mismo número, dos órdenes de bytes</h3>
      <label className="com-endian-input">
        Número que envía un PC x86 (little endian)
        <input type="number" min={0} max={4294967295} value={raw} onChange={(e) => setRaw(e.target.value)} />
      </label>
      <div className="com-bytes-rows">
        {[
          { name: 'En memoria del emisor (little endian)', bytes: little },
          { name: 'Como lo espera un receptor big endian', bytes: big },
        ].map((row) => (
          <div key={row.name} className="com-bytes-row">
            <span>{row.name}</span>
            <div className="com-bytes">
              {row.bytes.map((b, i) => (
                <code key={i} className={b ? 'is-set' : ''}>{hex(b)}</code>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="com-endian-result" aria-live="polite">
        Si el receptor big endian lee los bytes tal como llegan, entiende <b>{misread.toLocaleString('es-CO')}</b> en vez de{' '}
        <b>{value.toLocaleString('es-CO')}</b>.
        {value === 5 && ' El sensor que marcaba 5° aparece con 83 millones de grados.'}
      </p>
      <p className="guia-widget-note">Por eso emisor y receptor acuerdan un formato (XDR, CDR, JSON…) en vez de enviar la memoria tal cual.</p>
    </div>
  );
};

// ── 2 · Payload size chart ───────────────────────────────────────

const PayloadChart: React.FC = () => {
  const max = Math.max(...payloadSizes.map((p) => p.bytes));
  const rowH = 34;
  const labelW = 170;
  const chartW = 360;
  const height = payloadSizes.length * rowH + 8;

  return (
    <div className="guia-widget">
      <h3>Tamaño del mismo pedido según el formato</h3>
      <p className="guia-widget-note">
        <code>{payloadSample.jsonText}</code> codificado de cinco formas. Bytes medidos en UTF-8.
      </p>
      <div className="guia-scroll">
        <svg viewBox={`0 0 ${labelW + chartW + 60} ${height}`} className="com-bars" role="img" aria-label="Bytes por formato: struct binario, Protocol Buffers, JSON, XML y SOAP">
          {payloadSizes.map((p, i) => {
            const w = Math.max((p.bytes / max) * chartW, 4);
            const y = i * rowH + 6;
            return (
              <g key={p.label} className="com-bar">
                <title>{`${p.label}: ${p.bytes} bytes. ${p.note}`}</title>
                <rect x={0} y={y - 4} width={labelW + chartW + 60} height={rowH} className="com-bar-hit" />
                <text x={labelW - 10} y={y + 15} textAnchor="end">{p.label}</text>
                <rect x={labelW} y={y + 2} width={w} height={20} rx={4} className="com-bar-fill" />
                <text x={labelW + w + 8} y={y + 16} className="com-bar-value">{p.bytes} B</text>
              </g>
            );
          })}
          <line x1={labelW} x2={labelW} y1={0} y2={height} className="com-bar-axis" />
        </svg>
      </div>
      <details className="com-data">
        <summary>Ver datos</summary>
        <GuiaTable headers={['Formato', 'Bytes', 'Detalle']} rows={payloadSizes.map((p) => [p.label, String(p.bytes), p.note])} />
      </details>
    </div>
  );
};

// ── 3 · Group communication ──────────────────────────────────────

const groupNodes = [
  { id: 1, x: 300, y: 40, inGroup: true },
  { id: 2, x: 380, y: 90, inGroup: true },
  { id: 3, x: 300, y: 140, inGroup: true },
  { id: 4, x: 470, y: 40, inGroup: false },
  { id: 5, x: 500, y: 110, inGroup: false },
  { id: 6, x: 450, y: 170, inGroup: false },
];

const receives = (mode: CastMode, node: (typeof groupNodes)[number]) => {
  switch (mode) {
    case 'unicast': return node.id === 4;
    case 'broadcast': return true;
    case 'multicast': return node.inGroup;
    case 'anycast': return node.id === 2;
  }
};

const CastDiagram: React.FC = () => {
  const [mode, setMode] = useState<CastMode>('multicast');
  const current = castModes.find((m) => m.id === mode)!;

  return (
    <div className="guia-widget">
      <h3>Un mensaje, ¿cuántos receptores?</h3>
      <div className="guia-segmented" role="group" aria-label="Tipo de mensaje">
        {castModes.map((m) => (
          <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>{m.label}</button>
        ))}
      </div>
      <div className="guia-scroll">
        <svg viewBox="0 0 560 200" role="img" aria-label={`${current.label}: ${current.say.replace(/\*\*/g, '')}`}>
          <rect className="zone" x="250" y="12" width="180" height="168" rx="14" />
          <text x="340" y="194" textAnchor="middle" className="lbl">subconjunto (grupo A)</text>
          <rect className="nf" x="20" y="75" width="90" height="40" rx="6" />
          <text x="65" y="99" textAnchor="middle" className="on-fill">Emisor</text>
          <path className="e" d="M110 95 H200" />
          <rect className="n" x="200" y="80" width="30" height="30" rx="4" />
          <text x="215" y="130" textAnchor="middle" className="lbl">canal</text>
          {groupNodes.map((n) => {
            const hit = receives(mode, n);
            const tentative = mode === 'anycast' && n.inGroup && !hit;
            return (
              <g key={n.id} className={hit ? '' : tentative ? '' : 'dim'}>
                <path className={hit ? 'ea' : 'e'} d={`M230 95 L${n.x - 20} ${n.y}`} strokeDasharray={tentative ? '4 4' : undefined} />
                <circle cx={n.x} cy={n.y} r="18" className={hit ? 'hot' : 'n'} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" className={hit ? 'on-fill' : ''}>{n.id}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="guia-seq-say"><RichText text={current.say} /> <span className="com-analogy">En el salón: {current.analogy}</span></p>
    </div>
  );
};

const QueueVsTopic: React.FC = () => (
  <div className="guia-two">
    {[
      { title: 'Cola: cada mensaje a un consumidor', topic: false },
      { title: 'Tópico: cada mensaje a todos los suscritos', topic: true },
    ].map(({ title, topic }) => (
      <div key={title} className="guia-card">
        <h3>{title}</h3>
        <svg viewBox="0 0 320 150" role="img" aria-label={title}>
          <rect className="n" x="10" y="55" width="70" height="36" rx="6" />
          <text x="45" y="77" textAnchor="middle">Productor</text>
          <path className="ea" d="M80 73 H118" />
          <rect className="nf" x="118" y="50" width="86" height="46" rx="8" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={128 + i * 24} y="62" width="18" height="22" rx="3" fill="var(--color-canvas)" opacity="0.85" />
          ))}
          <text x="161" y="114" textAnchor="middle" className="lbl">{topic ? 'tópico' : 'cola FIFO'}</text>
          {[20, 73, 126].map((y, i) => {
            const hot = topic || i === 1;
            return (
              <g key={y} className={hot ? '' : 'dim'}>
                <path className={hot ? 'ea' : 'e'} d={`M204 73 L246 ${y + 13}`} />
                <rect className="n" x="246" y={y} width="66" height="26" rx="5" />
                <text x="279" y={y + 17} textAnchor="middle">Consum. {i + 1}</text>
              </g>
            );
          })}
        </svg>
      </div>
    ))}
  </div>
);

// ── 4 · Stub / skeleton ──────────────────────────────────────────

const StubSequence: React.FC = () => {
  const { step, setStep, on } = useSteps(stubSteps.length);
  const boxes = [
    { x: 10, label: 'Cliente' },
    { x: 130, label: 'Stub' },
    { x: 270, label: 'Red (socket)' },
    { x: 410, label: 'Skeleton' },
    { x: 530, label: 'Objeto' },
  ];
  return (
    <div className="guia-seq">
      <div className="guia-scroll">
        <svg viewBox="0 0 640 210" role="img" aria-label="Llamada remota: cliente, stub, red, skeleton y objeto, ida y vuelta">
          {boxes.map((b, i) => (
            <g key={b.label}>
              <rect className={i === 2 ? 'cloud' : i === 0 || i === 4 ? 'n' : 'nf'} x={b.x} y="20" width="100" height="40" rx="6" />
              <text x={b.x + 50} y="44" textAnchor="middle" className={i === 1 || i === 3 ? 'on-fill' : ''}>{b.label}</text>
              <path className="e" d={`M${b.x + 50} 60 V200`} strokeDasharray="3 4" />
            </g>
          ))}
          <text x="120" y="12" className="lbl">máquina cliente</text>
          <text x="470" y="12" className="lbl">máquina servidor</text>
          <g className={on(1)}><path className="ea" d="M60 85 H174 M168 79 L174 85 L168 91" /><text x="117" y="78" textAnchor="middle">1 sumar(5, 2)</text></g>
          <g className={on(2)}><path className="ea" d="M180 110 H314 M308 104 L314 110 L308 116" /><text x="247" y="103" textAnchor="middle">2 empaquetar</text></g>
          <g className={on(3)}><path className="ea" d="M320 130 H454 M448 124 L454 130 L448 136" /><text x="387" y="123" textAnchor="middle">3 bytes por TCP</text></g>
          <g className={on(4)}><path className="ea" d="M460 150 H574 M568 144 L574 150 L568 156" /><text x="517" y="143" textAnchor="middle">4 invocar</text></g>
          <g className={on(5)}><path className="ea" d="M580 180 H66" strokeDasharray="5 4" /><path className="ea" d="M72 174 L66 180 L72 186" /><text x="320" y="174" textAnchor="middle">5 resultado: 7</text></g>
        </svg>
      </div>
      <StepButtons steps={stubSteps} step={step} setStep={setStep} label="Pasos de la llamada remota" />
    </div>
  );
};

// ── 5 · Timeline and Richardson ──────────────────────────────────

// Four label rows (near/far, above/below) so events a year or two apart don't collide.
const timelineRows = [
  { stem: 70, label: 62, year: 48 },
  { stem: 120, label: 136, year: 150 },
  { stem: 40, label: 32, year: 18 },
  { stem: 152, label: 168, year: 182 },
];

const Timeline: React.FC = () => {
  const min = 1980;
  const max = 2020;
  const x = (year: number) => 40 + ((year - min) / (max - min)) * 860;
  return (
    <div className="guia-scroll">
      <svg viewBox="0 0 940 214" className="com-timeline" role="img" aria-label="Línea de tiempo: sockets 1983, RPC 1985, CORBA 1991, web 1993, DCOM 1996, RMI 1997, SOAP 1998, REST 2000, gRPC 2015">
        <line x1="40" x2="900" y1="95" y2="95" className="e" />
        {[1980, 1990, 2000, 2010, 2020].map((y) => (
          <text key={y} x={x(y)} y="208" textAnchor="middle" className="lbl">{y}</text>
        ))}
        {timeline.map((t, i) => {
          const row = timelineRows[i % timelineRows.length];
          return (
            <g key={t.label}>
              <path className="e" d={`M${x(t.year)} 95 V${row.stem}`} />
              <circle cx={x(t.year)} cy="95" r="6" className={t.kind === 'web' ? 'hot' : 'n'} />
              <text x={x(t.year)} y={row.label} textAnchor="middle">{t.label}</text>
              <text x={x(t.year)} y={row.year} textAnchor="middle" className="lbl">{t.year}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const RichardsonLadder: React.FC = () => (
  <div className="com-ladder" role="list" aria-label="Modelo de madurez de Richardson">
    {richardson.map((r) => (
      <div key={r.level} role="listitem" className={`com-step lvl-${r.level}`}>
        <span className="com-step-level">Nivel {r.level}</span>
        <strong>{r.name}</strong>
        <span><RichText text={r.text} /></span>
        <code>{r.example}</code>
        {r.level === 0 && <span className="com-step-flag">Aquí queda SOAP</span>}
        {r.level === 2 && <span className="com-step-flag">RESTful</span>}
      </div>
    ))}
  </div>
);

export const GuiaComunicacionPage: React.FC = () => (
  <div className="guia-page container-tight">
    <GuiaTabs />
    <header className="guia-header">
      <p className="guia-kicker">Guía de estudio · clases 15–17</p>
      <h1 className="type-display-lg">¿Cómo viaja el mensaje?</h1>
      <p className="guia-lead">
        Toda la unidad de comunicación es una sola historia: sin memoria compartida hay que enviar mensajes, los bytes deben significar lo mismo en
        los dos lados y, capa por capa, el middleware le quita ese trabajo al programador, desde el socket hasta REST.
      </p>
    </header>

    <FamilyMap families={comFamilies} label="Familias de la unidad de comunicación" />

    <div className="guia-trick">
      <b>Truco de examen:</b>
      <span>
        {comExamClues.map(([clue, family], i) => (
          <React.Fragment key={clue}>
            {clue} → <b>{family}</b>{i < comExamClues.length - 1 ? '. ' : '.'}
          </React.Fragment>
        ))}
      </span>
    </div>

    <section id="paso-mensajes" className="guia-section fam-msg">
      <SectionHead eyebrow={fam(1)} title="Paso de mensajes">
        En un sistema centralizado dos procesos comparten memoria. En uno distribuido un nodo no puede leer la memoria de otro: todo se mete en un
        mensaje (la carta en el sobre) y se envía por un canal con dos primitivas, <b>send</b> y <b>receive</b>.
      </SectionHead>
      <GuiaTable
        headers={['Modelo', 'Canal', 'Uso típico']}
        rows={[
          ['**1 a 1**', 'Número de proceso o socket', 'Un emisor y un receptor'],
          ['**N a 1**', 'Un puerto publicado', 'Cliente-servidor'],
          ['**N a N**', '**Cola de mensajes**', 'Muchos emisores y muchos receptores'],
        ]}
      />
      <div className="guia-grid">
        <VsCard title="Directa vs indirecta" items={['**Directa**: se sabe por dónde va el mensaje', '**Indirecta**: no se sabe; hay desacoplamiento espacial']} />
        <VsCard title="Simétrica vs asimétrica" items={['**Simétrica**: ida y vuelta', '**Asimétrica**: solo envío', 'Canales uni o bidireccionales, cada uno con su capacidad']} />
        <VsCard title="Bloqueante vs no bloqueante" items={['**Bloqueante**: envía y espera; un **timeout** evita esperar para siempre', '**No bloqueante**: envía y sigue; la última petición puede responder primero']} />
        <VsCard title="¿Dónde espera el mensaje?" items={['En un **buffer** del sistema operativo o en una **cola**', 'Si nadie está en modo recepción, no hay comunicación']} />
      </div>
    </section>

    <section id="representacion" className="guia-section fam-repr">
      <SectionHead eyebrow={fam(2)} title="Representación de datos y marshalling">
        Los sistemas distribuidos son heterogéneos: cada lenguaje y cada procesador guarda los datos a su manera. <b>Marshalling</b> es pasar de la
        representación nativa a una intermedia que ambos entienden; <b>unmarshalling</b> es lo contrario.
      </SectionHead>
      <EndiannessLab />
      <div className="guia-two">
        <div className="guia-card">
          <h3>Tamaños de tipos: C vs Java</h3>
          <GuiaTable headers={['Tipo', 'C', 'Java']} rows={typeSizes} />
          <p className="guia-widget-note">*El tamaño de <code>int</code> en C depende del compilador (2 bytes en los de 16 bits, como en el ejemplo de clase). Si C envía 2 bytes y Java lee 4, entra basura.</p>
        </div>
        <VsCard
          title="¿Quién hace el marshalling?"
          items={['Con **sockets**: el programador', 'Con **RPC, RMI, CORBA, MPI**: el middleware, de forma automática', 'Con estructuras hay que **aplanar** (serializar) con cabecera, separadores y fin de mensaje']}
        />
      </div>
      <PayloadChart />
      <GuiaTable headers={['Formato', 'Tipo', 'Lo usa', 'Nota']} rows={formats} />
      <p className="guia-callout">
        Regla de clase: <b>mientras más estándar, mejor</b>, y <b>binario</b> si los dos lados lo entienden. El texto gasta ancho de banda y suma latencia
        por las conversiones; por eso se pasó de XML a JSON, y de JSON a Protobuf entre servicios internos.
      </p>
    </section>

    <section id="mensajeria" className="guia-section fam-mq">
      <SectionHead eyebrow={fam(3)} title="Modelos de mensajería">
        Tres formas de paso de mensajes: <b>socket</b> directo (uno a uno), <b>comunicación a grupo</b> (un mensaje al canal, varios receptores) y{' '}
        <b>colas de mensajes</b> (un intermediario guarda el mensaje hasta que alguien lo saque).
      </SectionHead>
      <CastDiagram />
      <div className="guia-two">
        <VsCard title="Grupo abierto" items={['Recibe mensajes de nodos **externos**', 'Típico en **servicios o datos replicados**: la lógica de negocio escribe al grupo de bases de datos']} />
        <VsCard title="Grupo cerrado" items={['Solo hablan sus miembros (un grupo de WhatsApp)', 'Los trabajadores de maestro-trabajador; los hilos de un proceso; un tópico push']} />
      </div>
      <QueueVsTopic />
      <div className="guia-grid">
        <VsCard title="Cola de mensajes" items={['**FIFO**, asíncrona, desacoplada en espacio y tiempo', 'Consumir con **receive**, **poll** o **notify**', 'Convencional (se borra al leer) o **persistente** (histórico para reprocesar)', 'IBM MQ, Microsoft MQ, JMS; suelen ser centralizadas']} />
        <VsCard title="Kafka" items={['Modo **cola** y modo **tópico** a la vez', 'Log **persistente**: se puede volver atrás N mensajes', 'Varios consumidores del mismo mensaje', 'Base de las arquitecturas de eventos']} />
      </div>
      <h3>Sockets por arquitectura</h3>
      <GuiaTable headers={['Arquitectura', 'Cómo se implementa']} rows={socketsByArch} />
    </section>

    <section id="middleware" className="guia-section fam-mw">
      <SectionHead eyebrow={fam(4)} title="Middleware: RPC, RMI y CORBA">
        El middleware oculta el canal, el protocolo y el marshalling. El cliente llama una función o un método como si fuera local; un <b>stub</b> de cada
        lado hace el resto. Se encuentra el servicio con un <b>binder</b>, igual que en la familia 6 de la guía de arquitecturas.
      </SectionHead>
      <StubSequence />
      <div className="guia-table-wrap">
        <table className="guia-table">
          <thead>
            <tr><th></th><th>RPC (C)</th><th>RMI (Java)</th><th>CORBA (OMG)</th></tr>
          </thead>
          <tbody>
            {middlewareMatrix.map(([label, ...cells]) => (
              <tr key={label}>
                <td>{label}</td>
                {cells.map((c, i) => <td key={i}><RichText text={c} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="guia-two">
        <div className="guia-card">
          <h3>Lo que genera rpcgen desde <code>suma.x</code></h3>
          <GuiaTable headers={['Archivo', 'Qué hace']} rows={rpcgenOutputs} />
        </div>
        <div className="guia-card">
          <h3>RMI en cuatro líneas</h3>
          <pre className="com-code">{`interface Sumador extends Remote {
  int sumar(int a, int b) throws RemoteException;
}
// servidor: SumadorImpl extends UnicastRemoteObject
Naming.rebind("Sumador", this);
// cliente
Sumador s = (Sumador) Naming.lookup("rmi://host/Sumador");
int r = s.sumar(5, 2);`}</pre>
        </div>
      </div>
      <p className="guia-callout">
        <b>Cuidado con <code>UnicastRemoteObject</code>:</b> en clase se relacionó con comunicación a grupo, pero en Java significa un objeto remoto con
        referencia <b>punto a punto</b> (un cliente habla con un objeto concreto en un servidor). Si sale en el examen, recuerda también la versión del profesor.
      </p>
    </section>

    <section id="servicios-web" className="guia-section fam-web">
      <SectionHead eyebrow={fam(5)} title="Servicios web: SOAP y REST">
        CORBA quería que cualquier lenguaje hablara con cualquier otro, pero sus ORB eran caros. La web lo resolvió: todos saben HTTP. Los servicios web
        son <b>RPC sobre la web</b>, pensados para que una aplicación hable con otra (<b>B2B</b>).
      </SectionHead>
      <Timeline />
      <GuiaTable headers={['Etapa', 'Qué se publica', 'Para quién']} rows={webEras} />
      <div className="guia-two">
        <div className="guia-card">
          <h3>Anatomía de un mensaje SOAP</h3>
          <pre className="com-code">{`POST /StockQuote HTTP/1.1
Content-Type: application/soap+xml

<soap:Envelope>        ← el sobre
  <soap:Header/>       ← opcional: seguridad, destino
  <soap:Body>          ← la información útil
    <m:GetLastTradePrice>
      <m:Symbol>IBM</m:Symbol>
    </m:GetLastTradePrice>
  </soap:Body>
</soap:Envelope>`}</pre>
          <p className="guia-widget-note">La respuesta es otro sobre con <code>&lt;Price&gt;34.5&lt;/Price&gt;</code> y <code>200 OK</code>. Todo hay que abrirlo y cerrarlo: por eso es lento.</p>
        </div>
        <VsCard
          title="La idea de REST"
          items={['Sin sobre: el **dato crudo** va en el body', 'El **recurso** va en la URL: `/api/accounts/150`', 'La **acción** va en el verbo: GET, POST, PUT, PATCH, DELETE', 'Los **códigos HTTP** dicen cómo salió: 200, 201, 404, 409', 'No es un estándar: son convenciones']}
        />
      </div>
      <div className="guia-table-wrap">
        <table className="guia-table">
          <thead><tr><th></th><th>SOAP</th><th>REST</th></tr></thead>
          <tbody>
            {soapVsRest.map(([label, a, b]) => (
              <tr key={label}><td>{label}</td><td><RichText text={a} /></td><td><RichText text={b} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Modelo de madurez de Richardson</h3>
      <RichardsonLadder />
      <GuiaTable headers={['Petición', 'Para qué', '¿Idempotente?', 'Códigos']} rows={httpVerbs} />
      <p className="guia-callout">
        <b>Idempotente</b> = repetir la petición deja el sistema igual. POST no lo es (cada vez crea uno nuevo); PUT y DELETE sí. Ojo: en la diapositiva de
        clase PUT y POST estaban al revés y el profesor lo corrigió: <b>POST crea, PUT reemplaza</b>. <code>POST /api/auth/login</code> funciona, pero es
        nivel 1: el verbo no describe la acción.
      </p>
    </section>

    <section className="guia-section fam-web">
      <ChoiceQuiz title="Práctica: ¿qué mecanismo es?" options={mechanismOptions} items={mechanismQuiz} />
      <p className="guia-body">
        Para repasar clase por clase, ve a <Link to="/clases/15">clase 15</Link>, <Link to="/clases/16">clase 16</Link> y <Link to="/clases/17">clase 17</Link>.
      </p>
    </section>

    <p className="guia-footnote">
      Basada en las transcripciones de las clases 15–17. Los años de la línea de tiempo y los tamaños por formato complementan lo visto en clase.
    </p>
  </div>
);
