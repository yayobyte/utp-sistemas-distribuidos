import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Presentation } from 'lucide-react';
import {
  FamilyMap,
  GuiaTable,
  QaList,
  SectionHead,
  StepButtons,
  VsCard,
  useSteps,
} from '../components/guia/GuiaParts';
import { RichText } from './ClasePage';
import { slides } from '../data/exposicion.data';
import {
  bridgeTable,
  cheatSheet,
  components,
  decisions,
  expoFamilies,
  glossary,
  levelLabel,
  likelyQuestions,
  purchaseSteps,
  replacements,
  sagaSteps,
  tradeoffs,
} from '../data/guiaExposicion.data';
import type { ComponentId, Level } from '../data/guiaExposicion.data';
import './GuiaEstudioPage.styles.css';
import './GuiaExposicionPage.styles.css';

const fam = (n: number) => `Familia ${n}`;

// Which guide section backs each part of the deck. Slide ranges come from the deck itself.
const guideForSection: Record<string, string> = {
  'Introducción': 'Glosario',
  'Del monolito a microservicios': 'Monolito vs microservicios',
  'Conexión con el curso': 'Tabla puente curso ↔ Spring Cloud',
  'Comunicación': 'Síncrono vs asíncrono y la guía de Comunicación',
  'Spring Cloud': 'Mapa de Spring Cloud y lease de Eureka',
  'Resiliencia y cierre': 'Circuit breaker, recorrido de una compra y preguntas',
};

const deckSections = slides.reduce<{ section: string; from: number; to: number }[]>((acc, s, i) => {
  const last = acc[acc.length - 1];
  if (last && last.section === s.section) last.to = i + 1;
  else acc.push({ section: s.section, from: i + 1, to: i + 1 });
  return acc;
}, []);

// ── 1 · Trade-off dot matrix ─────────────────────────────────────

const Dots: React.FC<{ level: Level; label: string }> = ({ level, label }) => (
  <span className="expo-dots" aria-label={`${label}: ${levelLabel[level]}`} title={levelLabel[level]}>
    {[0, 1, 2].map((i) => <span key={i} className={i <= level ? 'is-on' : ''} />)}
    <em>{levelLabel[level]}</em>
  </span>
);

const TradeoffGrid: React.FC = () => (
  <div className="guia-table-wrap">
    <table className="guia-table expo-tradeoffs">
      <thead>
        <tr><th>Criterio</th><th>Monolito</th><th>Microservicios</th><th>Por qué</th></tr>
      </thead>
      <tbody>
        {tradeoffs.map((t) => (
          <tr key={t.criterion}>
            <td>{t.criterion}</td>
            <td><Dots level={t.monolith} label="Monolito" /></td>
            <td><Dots level={t.micro} label="Microservicios" /></td>
            <td>{t.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── 2 · Spring Cloud map ─────────────────────────────────────────

const mapBoxes: { id: ComponentId | null; label: string; x: number; y: number; w: number; kind: 'infra' | 'svc' | 'ext' }[] = [
  { id: null, label: 'Cliente', x: 10, y: 120, w: 80, kind: 'ext' },
  { id: 'gateway', label: 'Gateway', x: 120, y: 120, w: 90, kind: 'infra' },
  { id: 'eureka', label: 'Eureka', x: 120, y: 20, w: 90, kind: 'infra' },
  { id: 'config', label: 'Config Server', x: 120, y: 220, w: 110, kind: 'infra' },
  { id: null, label: 'Pedidos', x: 280, y: 70, w: 90, kind: 'svc' },
  { id: null, label: 'Pagos', x: 280, y: 170, w: 90, kind: 'svc' },
  { id: 'stream', label: 'Kafka', x: 430, y: 120, w: 80, kind: 'infra' },
  { id: null, label: 'Inventario', x: 560, y: 70, w: 90, kind: 'svc' },
  { id: null, label: 'Notificaciones', x: 560, y: 170, w: 110, kind: 'svc' },
  { id: 'tracing', label: 'Zipkin', x: 430, y: 240, w: 80, kind: 'infra' },
];

const SpringMap: React.FC = () => {
  const [selected, setSelected] = useState<ComponentId>('eureka');
  const c = components[selected];
  const isOn = (id: ComponentId) => selected === id;

  return (
    <div className="guia-widget">
      <h3>Mapa interactivo: toca una pieza</h3>
      <div className="guia-scroll">
        <svg viewBox="0 0 690 290" className="expo-map" role="img" aria-label="Arquitectura: cliente, gateway, Eureka, Config Server, servicios Pedidos y Pagos, Kafka, Inventario, Notificaciones y Zipkin">
          {/* links */}
          <path className="e" d="M90 140 H120" />
          <path className="e" d="M210 140 L280 90 M210 140 L280 190" />
          <path className={isOn('eureka') ? 'ea' : 'e'} d="M165 60 V120 M210 40 Q300 30 325 70" strokeDasharray="4 4" />
          <path className={isOn('config') ? 'ea' : 'e'} d="M230 240 Q300 240 325 210 M230 230 Q330 130 325 110" strokeDasharray="4 4" />
          <path className={isOn('feign') || isOn('breaker') ? 'ea' : 'e'} d="M325 110 V170" />
          <path className={isOn('stream') ? 'ea' : 'e'} d="M370 90 L430 135 M510 140 L560 90 M510 140 L560 190" />
          <path className={isOn('tracing') ? 'ea' : 'e'} d="M325 210 Q350 260 430 260" strokeDasharray="2 4" />
          {/* boxes */}
          {mapBoxes.map((b) => {
            const active = b.id && isOn(b.id);
            return (
              <g
                key={b.label}
                className={b.id ? 'expo-map-btn' : ''}
                role={b.id ? 'button' : undefined}
                tabIndex={b.id ? 0 : undefined}
                aria-pressed={b.id ? Boolean(active) : undefined}
                onClick={() => b.id && setSelected(b.id)}
                onKeyDown={(e) => {
                  if (b.id && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setSelected(b.id);
                  }
                }}
              >
                <rect x={b.x} y={b.y} width={b.w} height="40" rx="7" className={active ? 'nf' : b.kind === 'svc' ? 'cloud' : 'n'} />
                <text x={b.x + b.w / 2} y={b.y + 24} textAnchor="middle" className={active ? 'on-fill' : ''}>{b.label}</text>
              </g>
            );
          })}
          {/* edge labels that select the client-side libraries */}
          {([['feign', 'Feign', 336, 145], ['breaker', 'Breaker', 336, 160]] as const).map(([id, label, x, y]) => (
            <text
              key={id}
              x={x}
              y={y}
              className={`expo-map-chip ${isOn(id) ? 'hot' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(id))}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
      <div className="guia-segmented" role="group" aria-label="Componentes de Spring Cloud">
        {(Object.keys(components) as ComponentId[]).map((id) => (
          <button key={id} type="button" aria-pressed={selected === id} onClick={() => setSelected(id)}>
            {components[id].name.split(' (')[0].replace('Spring Cloud ', '')}
          </button>
        ))}
      </div>
      <div className="expo-detail" aria-live="polite">
        <h4>{c.name}</h4>
        <dl>
          <dt>Qué hace</dt><dd><RichText text={c.what} /></dd>
          <dt>Problema que resuelve</dt><dd>{c.solves}</dd>
          <dt>En el curso</dt><dd><RichText text={c.course} /></dd>
          {c.port && (<><dt>Puerto típico</dt><dd><code>{c.port}</code></dd></>)}
          <dt>Dependencia</dt><dd><code>{c.dep}</code></dd>
        </dl>
      </div>
    </div>
  );
};

// ── 3 · Eureka lease ─────────────────────────────────────────────

const HEARTBEATS = [0, 30, 60];
const CRASH = 70;
const LEASE = 90;
const EVICT = HEARTBEATS[HEARTBEATS.length - 1] + LEASE;

const LeaseTimeline: React.FC = () => {
  const [t, setT] = useState(45);
  const x = (s: number) => 30 + (s / 180) * 600;
  const lastBeat = [...HEARTBEATS].reverse().find((b) => b <= t) ?? 0;
  const state = t >= EVICT ? 'evicted' : t > CRASH ? 'silent' : 'up';
  const message = {
    up: `UP: último heartbeat hace ${t - lastBeat} s. El lease vence a los ${lastBeat + LEASE} s si no lo renueva.`,
    silent: `La instancia se cayó a los ${CRASH} s. Lleva ${t - lastBeat} s sin heartbeat; Eureka todavía la anuncia (los clientes pueden fallar y reintentar).`,
    evicted: `Pasaron ${LEASE} s desde el último heartbeat (${lastBeat} s): el lease expiró y Eureka la saca del registro.`,
  }[state];

  return (
    <div className="guia-widget">
      <h3>El lease de Eureka, segundo a segundo</h3>
      <div className="guia-scroll">
        <svg viewBox="0 0 660 120" role="img" aria-label="Línea de tiempo: heartbeats a los 0, 30 y 60 segundos, caída a los 70 y expulsión a los 150">
          <rect x={x(0)} y="50" width={x(CRASH) - x(0)} height="14" className="expo-lease-up" rx="3" />
          <rect x={x(CRASH)} y="50" width={x(EVICT) - x(CRASH)} height="14" className="expo-lease-silent" rx="3" />
          <line x1={x(0)} x2={x(180)} y1="57" y2="57" className="e" />
          {HEARTBEATS.map((b) => (
            <g key={b}>
              <circle cx={x(b)} cy="57" r="7" className="hot" />
              <text x={x(b)} y="36" textAnchor="middle" className="lbl">♥ {b}s</text>
            </g>
          ))}
          <text x={x(90)} y="36" textAnchor="middle" className="lbl">✕ 90s</text>
          <text x={x(120)} y="36" textAnchor="middle" className="lbl">✕ 120s</text>
          <text x={x(CRASH)} y="88" textAnchor="middle">caída {CRASH}s</text>
          <path className="ea" d={`M${x(EVICT)} 44 V72`} />
          <text x={x(EVICT)} y="88" textAnchor="middle">expulsada {EVICT}s</text>
          <path d={`M${x(t)} 20 V100`} className="expo-cursor" />
          {[0, 30, 60, 90, 120, 150, 180].map((s) => (
            <text key={s} x={x(s)} y="114" textAnchor="middle" className="lbl">{s}</text>
          ))}
        </svg>
      </div>
      <label className="expo-slider">
        Tiempo: <b>{t} s</b>
        <input type="range" min={0} max={180} value={t} onChange={(e) => setT(Number(e.target.value))} />
      </label>
      <p className={`guia-seq-say expo-lease-msg is-${state}`} aria-live="polite">{message}</p>
      <p className="guia-widget-note">
        Valores por defecto: heartbeat cada <b>30 s</b>, expira a los <b>90 s</b> sin renovar. Si de golpe muchas instancias dejan de renovar (por
        ejemplo, una falla de red), Eureka entra en <b>self-preservation</b> y deja de expulsar: prefiere anunciar algunas muertas que borrar las vivas.
      </p>
    </div>
  );
};

// ── 3 · Circuit breaker ──────────────────────────────────────────

type BreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';
const WINDOW = 6;
const MIN_CALLS = 4;
const THRESHOLD = 0.5;
const HALF_OPEN_TRIALS = 2;

const BreakerSim: React.FC = () => {
  const [state, setState] = useState<BreakerState>('CLOSED');
  const [calls, setCalls] = useState<boolean[]>([]);
  const [trials, setTrials] = useState(0);
  const [log, setLog] = useState('Todo funciona: las llamadas a Pagos pasan.');

  const failureRate = calls.length ? calls.filter((ok) => !ok).length / calls.length : 0;

  const call = (ok: boolean) => {
    if (state === 'OPEN') {
      setLog('Abierto: la llamada ni siquiera sale. Fallback inmediato → "pago pendiente".');
      return;
    }
    if (state === 'HALF_OPEN') {
      if (!ok) {
        setState('OPEN');
        setTrials(0);
        setLog('La llamada de prueba falló: vuelve a ABIERTO y espera otra vez.');
        return;
      }
      const next = trials + 1;
      if (next >= HALF_OPEN_TRIALS) {
        setState('CLOSED');
        setCalls([]);
        setTrials(0);
        setLog(`${HALF_OPEN_TRIALS} llamadas de prueba exitosas: Pagos se recuperó, vuelve a CERRADO.`);
      } else {
        setTrials(next);
        setLog(`Prueba ${next}/${HALF_OPEN_TRIALS} exitosa. Falta ${HALF_OPEN_TRIALS - next}.`);
      }
      return;
    }
    const window = [...calls, ok].slice(-WINDOW);
    const rate = window.filter((x) => !x).length / window.length;
    setCalls(window);
    if (window.length >= MIN_CALLS && rate >= THRESHOLD) {
      setState('OPEN');
      setLog(`Falla el ${Math.round(rate * 100)} % (umbral ${THRESHOLD * 100} %): se ABRE el circuito. Pedidos deja de esperar a Pagos.`);
    } else {
      setLog(ok ? 'Llamada exitosa.' : `Llamada fallida. Tasa de fallo: ${Math.round(rate * 100)} %.`);
    }
  };

  const wait = () => {
    if (state !== 'OPEN') return;
    setState('HALF_OPEN');
    setLog('Pasó el tiempo de espera: SEMIABIERTO. Se dejan pasar unas pocas llamadas de prueba.');
  };

  const reset = () => {
    setState('CLOSED');
    setCalls([]);
    setTrials(0);
    setLog('Reiniciado.');
  };

  return (
    <div className="guia-widget">
      <h3>Simulador de circuit breaker</h3>
      <div className="expo-states" role="list" aria-label="Estados del circuit breaker">
        {(['CLOSED', 'OPEN', 'HALF_OPEN'] as BreakerState[]).map((s) => (
          <div key={s} role="listitem" className={`expo-state is-${s.toLowerCase()} ${state === s ? 'is-current' : ''}`}>
            <strong>{{ CLOSED: 'Cerrado', OPEN: 'Abierto', HALF_OPEN: 'Semiabierto' }[s]}</strong>
            <span>{{ CLOSED: 'Las llamadas pasan', OPEN: 'Fallback inmediato', HALF_OPEN: 'Llamadas de prueba' }[s]}</span>
          </div>
        ))}
      </div>
      <div className="expo-rate">
        <span>Tasa de fallo en las últimas {WINDOW} llamadas</span>
        <div className="expo-rate-bar" role="img" aria-label={`Tasa de fallo ${Math.round(failureRate * 100)} %, umbral 50 %`}>
          <div style={{ width: `${failureRate * 100}%` }} />
          <i style={{ left: `${THRESHOLD * 100}%` }} />
        </div>
        <div className="expo-calls">
          {Array.from({ length: WINDOW }, (_, i) => {
            const c = calls[i];
            return <span key={i} className={c === undefined ? '' : c ? 'is-ok' : 'is-fail'}>{c === undefined ? '·' : c ? '✓' : '✕'}</span>;
          })}
        </div>
      </div>
      <div className="guia-segmented">
        <button type="button" onClick={() => call(true)}>Llamada exitosa</button>
        <button type="button" onClick={() => call(false)}>Llamada falla</button>
        <button type="button" onClick={wait} disabled={state !== 'OPEN'}>Esperar el tiempo de espera</button>
        <button type="button" onClick={reset}>Reiniciar</button>
      </div>
      <p className="guia-seq-say" aria-live="polite">{log}</p>
      <p className="guia-widget-note">
        Valores simplificados para la demo (ventana de {WINDOW}, mínimo {MIN_CALLS} llamadas, {HALF_OPEN_TRIALS} pruebas). En Resilience4j el umbral
        por defecto también es 50 %, con ventanas más grandes y 60 s de espera en abierto.
      </p>
    </div>
  );
};

// ── 4 · Purchase sequence ────────────────────────────────────────

const PurchaseSequence: React.FC = () => {
  const { step, setStep, on } = useSteps(purchaseSteps.length);
  const lanes = ['Cliente', 'Gateway', 'Eureka', 'Pedidos', 'Pagos', 'Kafka', 'Consumidores'];
  const lx = (i: number) => 20 + i * 100;
  const arrow = (from: number, to: number, y: number, dashed = false) => {
    const a = lx(from) + 40;
    const b = lx(to) + 40;
    const dir = b > a ? -6 : 6;
    return (
      <>
        <path className="ea" d={`M${a} ${y} H${b}`} strokeDasharray={dashed ? '5 4' : undefined} />
        <path className="ea" d={`M${b + dir} ${y - 6} L${b} ${y} L${b + dir} ${y + 6}`} />
      </>
    );
  };

  return (
    <div className="guia-seq">
      <div className="guia-scroll">
        <svg viewBox="0 0 720 250" role="img" aria-label="Secuencia de una compra entre cliente, gateway, Eureka, pedidos, pagos, Kafka y consumidores">
          {lanes.map((l, i) => (
            <g key={l}>
              <rect className={i === 2 || i === 5 ? 'nf' : 'n'} x={lx(i)} y="10" width="80" height="34" rx="6" />
              <text x={lx(i) + 40} y="31" textAnchor="middle" className={i === 2 || i === 5 ? 'on-fill' : ''}>{l}</text>
              <path className="e" d={`M${lx(i) + 40} 44 V245`} strokeDasharray="3 4" />
            </g>
          ))}
          <g className={on(1)}>{arrow(0, 1, 70)}<text x={lx(0) + 90} y="64" textAnchor="middle">1 POST /api/orders</text></g>
          <g className={on(2)}>{arrow(1, 2, 100)}{arrow(2, 1, 116, true)}<text x={lx(1) + 90} y="94" textAnchor="middle">2 ¿orders-service?</text></g>
          <g className={on(2)}>{arrow(1, 3, 140)}</g>
          <g className={on(3)}>{arrow(3, 4, 165)}{arrow(4, 3, 181, true)}<text x={lx(3) + 90} y="159" textAnchor="middle">3 Feign + breaker</text></g>
          <g className={on(4)}>{arrow(3, 5, 205)}<text x={lx(4) + 40} y="199" textAnchor="middle">4 PedidoCreado</text></g>
          <g className={on(4)}>{arrow(3, 0, 225, true)}<text x={lx(1) + 90} y="219" textAnchor="middle">201 Created</text></g>
          <g className={on(5)}>{arrow(5, 6, 240)}</g>
        </svg>
      </div>
      <StepButtons steps={purchaseSteps} step={step} setStep={setStep} label="Pasos de la compra" />
    </div>
  );
};

export const GuiaExposicionPage: React.FC = () => {
  return (
  <div className="guia-page container-tight">
    <header className="guia-header">
      <p className="guia-kicker">Guía de la exposición · Grupo C</p>
      <h1 className="type-display-lg">Entender para exponer: Microservicios y Spring Cloud</h1>
      <p className="guia-lead">
        Todo lo que el grupo necesita para explicar el tema con seguridad y responder preguntas. Cada concepto se conecta con algo que ya vimos en
        clase: esa conexión es lo que hace fuerte la exposición.
      </p>
      <Link to="/exposicion/microservicios" className="expo-deck-link">
        <Presentation size={16} /> Abrir la presentación
      </Link>
    </header>

    <FamilyMap families={expoFamilies} label="Partes de la guía de la exposición" />

    <div id="mapa-diapositivas" className="guia-table-wrap expo-slidemap expo-target">
      <table className="guia-table">
        <thead><tr><th>Diapositivas</th><th>Sección de la presentación</th><th>Dónde estudiarla en esta guía</th></tr></thead>
        <tbody>
          {deckSections.map((s) => (
            <tr key={s.section}>
              <td><Link to={`/exposicion/microservicios?slide=${s.from}`}>{s.from}–{s.to}</Link></td>
              <td>{s.section}</td>
              <td>{guideForSection[s.section] ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <section id="fundamentos" className="guia-section fam-xbase">
      <SectionHead eyebrow={fam(1)} title="Fundamentos">
        Un microservicio es un servicio pequeño que se despliega solo, es dueño de una capacidad de negocio (pedidos, pagos) y de su propia base de
        datos. Al partir el monolito, la aplicación se vuelve un <b>sistema distribuido</b>, con todos los problemas del curso.
      </SectionHead>
      <h3 id="glosario" className="expo-target">Glosario rápido</h3>
      <div className="expo-glossary">
        {glossary.map((g) => (
          <div key={g.term} className="guia-card">
            <span className="guia-tag">{g.term}</span>
            <p>{g.def}</p>
            <p className="expo-course">En clase: <RichText text={g.course} /></p>
          </div>
        ))}
      </div>
      <div className="guia-two">
        <VsCard title="Monolito" items={['Un ejecutable y una base de datos', 'Fácil de empezar, desplegar y depurar', 'Un cambio obliga a desplegar **todo**', 'Un error de memoria tumba **todo**', 'Solo escala completo']} />
        <VsCard title="Microservicios" items={['Muchos servicios, cada uno con su base', 'Se despliegan y escalan por separado', 'Equipos autónomos (ley de Conway)', 'Cada llamada es por **red**: latencia y fallos', 'Necesita infraestructura: registro, gateway, broker, tracing']} />
      </div>
      <h3 id="trade-offs" className="expo-target">Trade-offs, criterio por criterio</h3>
      <p className="guia-body">En cada fila, <b>Alto</b> es lo deseable: más puntos, mejor en ese criterio.</p>
      <TradeoffGrid />
      <p className="guia-callout">
        <b>Idea para decir en voz alta:</b> microservicios no es "mejor", es <b>cambiar complejidad de código por complejidad de operación</b>. Vale la
        pena cuando hay que escalar partes por separado y varios equipos trabajan a la vez.
      </p>
    </section>

    <section id="spring-cloud" className="guia-section fam-xmap">
      <SectionHead eyebrow={fam(2)} title="Spring Cloud: una pieza por problema">
        Spring Cloud es un conjunto de proyectos sobre Spring Boot. Cada uno resuelve un problema clásico de sistemas distribuidos, y casi todos tienen
        un equivalente directo en lo que vimos en clase.
      </SectionHead>
      <div id="mapa-spring" className="expo-target"><SpringMap /></div>
      <h3 id="tabla-puente" className="expo-target">Tabla puente: curso ↔ Spring Cloud</h3>
      <GuiaTable headers={['Pieza', 'Concepto de clase', 'Transparencia', 'Arquitectura']} rows={bridgeTable} />
    </section>

    <section id="resiliencia" className="guia-section fam-xres">
      <SectionHead eyebrow={fam(3)} title="Resiliencia: cuando algo falla">
        En un monolito una llamada local casi nunca falla. Entre microservicios, la red falla, los servicios se reinician y las réplicas cambian. Dos
        mecanismos son la base: el <b>lease</b> del registro y el <b>circuit breaker</b> en cada llamada.
      </SectionHead>
      <div id="lease" className="expo-target"><LeaseTimeline /></div>
      <div id="breaker" className="expo-target"><BreakerSim /></div>
      <div className="guia-grid">
        <VsCard title="Timeout" items={['Nunca esperar para siempre', 'Igual que en paso de mensajes bloqueante (clase 15)']} />
        <VsCard title="Reintento" items={['Repetir solo si es seguro', 'Exige operaciones **idempotentes**']} />
        <VsCard title="Bulkhead" items={['Separar recursos por dependencia', 'Que Pagos no consuma todos los hilos']} />
      </div>
    </section>

    <section id="flujos" className="guia-section fam-xflow">
      <SectionHead eyebrow={fam(4)} title="Comunicación y datos">
        La pregunta más importante del diseño: ¿esta interacción necesita respuesta inmediata o es un hecho que se puede procesar después? De eso
        depende el acoplamiento.
      </SectionHead>
      <div id="decision" className="expo-decision expo-target" role="list" aria-label="Cómo elegir la comunicación">
        {decisions.map((d, i) => (
          <div key={d.q} role="listitem" className="expo-decision-step">
            <span className="expo-decision-n">{i + 1}</span>
            <strong>{d.q}</strong>
            <div className="expo-decision-yes"><b>Sí →</b> <RichText text={d.yes} /></div>
            <div className="expo-decision-no"><b>No →</b> {d.no}</div>
          </div>
        ))}
      </div>
      <h3 id="recorrido" className="expo-target">Recorrido de una compra</h3>
      <PurchaseSequence />
      <h3 id="saga" className="expo-target">Si preguntan por transacciones: saga</h3>
      <div className="expo-saga" role="list" aria-label="Pasos de una saga con sus compensaciones">
        {sagaSteps.map((s) => (
          <div key={s.step} role="listitem" className="expo-saga-step">
            <strong>{s.step}</strong>
            <span>↩ {s.compensate}</span>
          </div>
        ))}
      </div>
      <div className="guia-two">
        <VsCard title="Coreografía" items={['Cada servicio reacciona a eventos del anterior', 'Sin coordinador; bajo acoplamiento', 'Difícil ver el flujo completo']} />
        <VsCard title="Orquestación" items={['Un orquestador dice a cada servicio qué hacer', 'Flujo explícito y fácil de seguir', 'El orquestador es un punto central']} />
      </div>
      <p className="guia-callout">
        <b>Outbox:</b> el servicio guarda el pedido y el evento en la <b>misma transacción local</b> (tabla outbox) y otro proceso lo publica en Kafka.
        Así no queda un pedido guardado sin su evento si el servicio cae justo en medio.
      </p>
    </section>

    <section id="preparacion" className="guia-section fam-xprep">
      <SectionHead eyebrow={fam(5)} title="Preguntas probables">
        Las preguntas que más probablemente hagan el profesor o la clase, con una respuesta corta que conecta con el curso. Ábrelas para practicar.
      </SectionHead>
      <div id="preguntas" className="expo-target"><QaList items={likelyQuestions} /></div>
    </section>

    <section id="chuleta" className="guia-section fam-xcheat">
      <SectionHead eyebrow="Chuleta" title="Anotaciones, propiedades y reemplazos">
        Lo que aparece en el código de las diapositivas, para leerlo sin dudar.
      </SectionHead>
      <GuiaTable headers={['Código', 'Qué significa']} rows={cheatSheet} />
      <GuiaTable headers={['Netflix (retirado)', 'Reemplazo actual']} rows={replacements} />
    </section>

    <p className="guia-footnote">
      Complementa la presentación del Grupo C. Los valores por defecto de Eureka y Resilience4j corresponden a su configuración estándar; revisa la
      versión que usen si muestran código en vivo.
    </p>
  </div>
);
};
