import React, { useState } from 'react';
import {
  binderSteps,
  cloudModels,
  computingModels,
  examClues,
  families,
  quizOptions,
  quizTips,
  semantics,
  serverModels,
  standbyModes,
  transparencies,
  transparencyQuiz,
} from '../data/guia.data';
import type { FamilyId } from '../data/guia.data';
import './GuiaEstudioPage.styles.css';

const SectionHead: React.FC<{ family: FamilyId; title: string; children: React.ReactNode }> = ({ family, title, children }) => {
  const f = families.find((x) => x.id === family)!;
  return (
    <div className="guia-head">
      <span className="guia-eyebrow">Familia {f.number}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
};

const VsCard: React.FC<{ title: string; items: React.ReactNode[] }> = ({ title, items }) => (
  <div className="guia-card">
    <h3>{title}</h3>
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const TransparencyQuiz: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, 'ok' | 'no'>>({});
  const [feedback, setFeedback] = useState('');
  const { scenario, answer } = transparencyQuiz[index];

  const choose = (option: string) => {
    const correct = option === answer;
    setPicked((p) => ({ ...p, [option]: correct ? 'ok' : 'no' }));
    setFeedback(correct ? `Correcto. ${quizTips[answer] ?? ''}` : `No es ${option}. ${quizTips[option] ?? 'Intenta otra vez.'}`);
  };

  const next = () => {
    setIndex((i) => (i + 1) % transparencyQuiz.length);
    setPicked({});
    setFeedback('');
  };

  return (
    <div className="guia-quiz">
      <h3>Práctica: ¿qué transparencia es?</h3>
      <p className="guia-quiz-scenario">{scenario}</p>
      <div className="guia-quiz-options">
        {quizOptions.map((option) => (
          <button key={option} type="button" className={picked[option] ? `is-${picked[option]}` : ''} onClick={() => choose(option)}>
            {option}
          </button>
        ))}
      </div>
      <p className="guia-quiz-feedback" aria-live="polite">{feedback}</p>
      <div className="guia-quiz-footer">
        <span>{index + 1} / {transparencyQuiz.length}</span>
        <button type="button" onClick={next}>Siguiente escenario</button>
      </div>
    </div>
  );
};

const BinderSequence: React.FC = () => {
  const [step, setStep] = useState(4);
  const on = (n: number) => `guia-msg ${n <= step ? 'is-on' : ''}`;

  return (
    <div className="guia-seq">
      <div className="guia-scroll">
        <svg viewBox="0 0 600 230" role="img" aria-label="Secuencia del binder: el servidor se registra, el cliente pregunta, el binder responde y el cliente llama directo al servidor">
          <rect className="n" x="20" y="20" width="110" height="40" rx="6" /><text x="75" y="44" textAnchor="middle">Cliente</text>
          <rect className="nf" x="245" y="20" width="110" height="40" rx="6" /><text x="300" y="44" textAnchor="middle" className="on-fill">Binder</text>
          <rect className="n" x="470" y="20" width="110" height="40" rx="6" /><text x="525" y="44" textAnchor="middle">Servidor</text>
          <path className="e" d="M75 60 V220 M300 60 V220 M525 60 V220" strokeDasharray="3 4" />
          <g className={on(1)}><path className="ea" d="M525 85 H306 M312 79 L306 85 L312 91" /><text x="415" y="78" textAnchor="middle">1 registrar("pagos", 10.0.0.7:5000)</text></g>
          <g className={on(2)}><path className="ea" d="M75 120 H294 M288 114 L294 120 L288 126" /><text x="185" y="113" textAnchor="middle">2 buscar("pagos")</text></g>
          <g className={on(3)}><path className="ea" d="M300 150 H81" strokeDasharray="5 4" /><path className="ea" d="M87 144 L81 150 L87 156" /><text x="190" y="143" textAnchor="middle">3 → 10.0.0.7:5000</text></g>
          <g className={on(4)}><path className="ea" d="M75 190 H519 M513 184 L519 190 L513 196" /><text x="300" y="183" textAnchor="middle">4 petición directa al servidor (el binder no participa)</text></g>
        </svg>
      </div>
      <div className="guia-steps" role="group" aria-label="Pasos del binder">
        {binderSteps.map((s, i) => (
          <button key={s.label} type="button" aria-pressed={step === i + 1} onClick={() => setStep(i + 1)}>
            {i + 1} · {s.label}
          </button>
        ))}
      </div>
      <p className="guia-seq-say">{binderSteps[step - 1].say}</p>
    </div>
  );
};

export const GuiaEstudioPage: React.FC = () => {
  return (
    <div className="guia-page container-tight">
      <header className="guia-header">
        <p className="guia-kicker">Guía de estudio · clases 1–13</p>
        <h1 className="type-display-lg">¿De qué tema es esta pregunta?</h1>
        <p className="guia-lead">
          Los quices mezclan seis familias de ideas. Cada familia responde su propia pregunta. Identifica primero la pregunta y las opciones se
          vuelven mucho más fáciles de separar. Los colores se mantienen en toda la página.
        </p>
      </header>

      <nav className="guia-map" aria-label="Familias de temas">
        {families.map((f) => (
          <a key={f.id} href={`#${f.anchor}`} className={`guia-tile fam-${f.id}`}>
            <span className="guia-eyebrow">{f.number} · {f.name}</span>
            <span className="guia-tile-q">{f.question}</span>
            <span className="guia-tile-terms">{f.terms}</span>
          </a>
        ))}
      </nav>

      <div className="guia-trick">
        <b>Truco de examen:</b>
        <span>
          Busca la palabra clave en la pregunta.{' '}
          {examClues.map(([clue, family], i) => (
            <React.Fragment key={clue}>
              {clue} → <b>{family}</b>{i < examClues.length - 1 ? '. ' : '.'}
            </React.Fragment>
          ))}
        </span>
      </div>

      {/* 1 Modelos */}
      <section id="modelos" className="guia-section fam-model">
        <SectionHead family="model" title="Modelos de computación">
          Describen <b>de quién son las máquinas</b> que hacen el trabajo y <b>dónde están</b>. No dicen nada de cómo se organiza el software por dentro.
        </SectionHead>
        <div className="guia-table-wrap">
          <table className="guia-table">
            <thead><tr><th>Modelo</th><th>¿De quién son los recursos?</th><th>Idea clave</th><th>Palabras clave</th></tr></thead>
            <tbody>
              {computingModels.map((m) => (
                <tr key={m.name}><td>{m.name}</td><td>{m.whose}</td><td>{m.idea}</td><td>{m.clues}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Modelos de servicio en la nube: cuánto administras tú</h3>
        <div className="guia-grid">
          {cloudModels.map((c) => (
            <div key={c.tag} className="guia-card">
              <span className="guia-tag">{c.tag}</span>
              <p><b>Recibes:</b> {c.get}.<br /><b>Administras:</b> {c.manage}.<br />Ejemplo: {c.example}.</p>
            </div>
          ))}
        </div>
        <p className="guia-callout">Entre más arriba en la pirámide, <b>menos responsabilidad</b> tienes y <b>más dependes</b> del proveedor.</p>
      </section>

      {/* 2 Arquitecturas */}
      <section id="arquitecturas" className="guia-section fam-arch">
        <SectionHead family="arch" title="Arquitecturas y patrones">
          Describen los <b>roles</b> de los componentes y la <b>dirección</b> de la comunicación. Cualquiera puede correr sobre cualquier modelo: una app
          maestro-trabajador puede correr en un cluster o en la nube.
        </SectionHead>
        <div className="guia-grid">
          <div className="guia-card">
            <svg viewBox="0 0 220 130" role="img" aria-label="El maestro envía tareas a tres trabajadores">
              <rect className="n" x="80" y="8" width="60" height="28" rx="5" /><text x="110" y="26" textAnchor="middle">Maestro</text>
              <path className="ea" d="M95 36 L40 88 M110 36 L110 88 M125 36 L180 88" />
              <rect className="n" x="12" y="90" width="56" height="26" rx="5" /><text x="40" y="107" textAnchor="middle">T1</text>
              <rect className="n" x="82" y="90" width="56" height="26" rx="5" /><text x="110" y="107" textAnchor="middle">T2</text>
              <rect className="n" x="152" y="90" width="56" height="26" rx="5" /><text x="180" y="107" textAnchor="middle">T3</text>
            </svg>
            <span className="guia-tag">Maestro-Trabajador</span>
            <p>Un maestro recibe <b>todas</b> las tareas, las divide y las reparte. Los trabajadores solo procesan. El maestro no es cuello de botella, pero sí es <b>punto crítico de fallo</b>.</p>
          </div>
          <div className="guia-card">
            <svg viewBox="0 0 220 130" role="img" aria-label="Varios clientes envían peticiones a un servidor">
              <rect className="n" x="140" y="48" width="66" height="32" rx="5" /><text x="173" y="68" textAnchor="middle">Servidor</text>
              <circle className="n" cx="34" cy="24" r="16" /><text x="34" y="28" textAnchor="middle">C</text>
              <circle className="n" cx="34" cy="64" r="16" /><text x="34" y="68" textAnchor="middle">C</text>
              <circle className="n" cx="34" cy="104" r="16" /><text x="34" y="108" textAnchor="middle">C</text>
              <path className="ea" d="M50 24 L138 58 M50 64 L138 64 M50 104 L138 70" />
            </svg>
            <span className="guia-tag">Cliente-Servidor</span>
            <p>Los clientes preguntan, el servidor responde. Los roles son fijos. El servidor tiene el servicio y los datos.</p>
          </div>
          <div className="guia-card">
            <svg viewBox="0 0 220 130" role="img" aria-label="Cinco pares conectados entre sí">
              <path className="e" d="M110 18 L40 55 L70 112 L150 112 L180 55 Z M110 18 L70 112 M110 18 L150 112 M40 55 L180 55" />
              <circle className="n" cx="110" cy="18" r="13" /><circle className="n" cx="40" cy="55" r="13" /><circle className="n" cx="180" cy="55" r="13" />
              <circle className="n" cx="70" cy="112" r="13" /><circle className="n" cx="150" cy="112" r="13" />
            </svg>
            <span className="guia-tag">Peer-to-Peer</span>
            <p>Cada nodo es cliente y servidor a la vez. No hay coordinador central.</p>
          </div>
          <div className="guia-card">
            <svg viewBox="0 0 220 130" role="img" aria-label="El editor envía a un broker que entrega a los suscriptores">
              <rect className="n" x="6" y="50" width="56" height="28" rx="5" /><text x="34" y="68" textAnchor="middle">Editor</text>
              <rect className="nf" x="84" y="46" width="52" height="36" rx="5" /><text x="110" y="68" textAnchor="middle" className="on-fill">Broker</text>
              <path className="ea" d="M62 64 L84 64 M136 58 L160 26 M136 64 L160 64 M136 70 L160 104" />
              <rect className="n" x="160" y="14" width="54" height="24" rx="5" /><text x="187" y="30" textAnchor="middle">Sub</text>
              <rect className="n" x="160" y="52" width="54" height="24" rx="5" /><text x="187" y="68" textAnchor="middle">Sub</text>
              <rect className="n" x="160" y="92" width="54" height="24" rx="5" /><text x="187" y="108" textAnchor="middle">Sub</text>
            </svg>
            <span className="guia-tag">Editor-Suscriptor</span>
            <p>Los editores publican eventos en un tema y los suscriptores los reciben. Ninguno conoce al otro: es el patrón <b>desacoplado</b> clásico.</p>
          </div>
        </div>
        <div className="guia-two">
          <VsCard title="P2P desestructurado" items={['Topología lógica arbitraria', 'Busca inundando a los vecinos', 'No se puede predecir dónde está un recurso', 'Ejemplo: Gnutella']} />
          <VsCard title="P2P estructurado" items={['Topología fija y organizada', <>Una <b>DHT</b> (tabla hash distribuida) decide qué nodo guarda cada clave</>, 'Búsquedas eficientes y predecibles', 'Ejemplo: Chord, Kademlia']} />
          <VsCard title="Cliente ligero (thin)" items={['La lógica vive en el servidor', 'Se actualiza el servidor una vez y todos los clientes lo reciben', <b key="b">Menor mantenimiento, mejor seguridad</b>, 'Necesita red. Ejemplo: la web']} />
          <VsCard title="Cliente pesado (thick)" items={['Procesamiento fuerte en el dispositivo', 'Puede funcionar desconectado', 'Hay que actualizar cada instalación', 'Ejemplo: app de escritorio']} />
        </div>
      </section>

      {/* 3 Transparencia */}
      <section id="transparencia" className="guia-section fam-trans">
        <SectionHead family="trans" title="Transparencias">
          Un sistema distribuido tiene muchas máquinas pero debe verse como <b>una sola</b>. Cada transparencia oculta una cosa específica. Léela como "el
          usuario no nota el/la ___".
        </SectionHead>
        <div className="guia-table-wrap">
          <table className="guia-table">
            <thead><tr><th>Transparencia de…</th><th>Qué se oculta</th><th>Ejemplo</th></tr></thead>
            <tbody>
              {transparencies.map((t) => (
                <tr key={t.name}><td>{t.name}</td><td>{t.hidden}</td><td>{t.example}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="guia-callout">
          <b>La trampa común.</b> Posición y migración se confunden fácil. <b>Posición</b> es <i>no necesitar saber dónde</i> está algo. <b>Migración</b> es
          que el recurso <i>se mueve</i> sin que nadie lo note. Si la pregunta dice "migrar de un nodo a otro", la respuesta es migración.
        </p>
        <TransparencyQuiz />
      </section>

      {/* 4 Acoplamiento */}
      <section id="acoplamiento" className="guia-section fam-coup">
        <SectionHead family="coup" title="Acoplamiento">
          Cuánto dependen dos partes entre sí. Hay dos ejes independientes: <b>espacio</b> (¿necesito saber quién eres y dónde estás?) y <b>tiempo</b>
          (¿ambos debemos estar activos al mismo tiempo?).
        </SectionHead>
        <div className="guia-table-wrap">
          <table className="guia-table">
            <thead><tr><th></th><th>Temporal: ambos activos a la vez</th><th>Temporal: pueden estar en momentos distintos</th></tr></thead>
            <tbody>
              <tr><td>Espacial: debo conocer al receptor</td><td>Llamada directa, como una llamada telefónica<br /><span className="guia-k">acoplado en espacio y tiempo</span></td><td>Correo a una dirección específica<br /><span className="guia-k">desacoplamiento temporal</span></td></tr>
              <tr><td>Espacial: no necesito conocer al receptor</td><td>Transmisión en vivo, radio<br /><span className="guia-k">desacoplamiento espacial</span></td><td>Pub-sub con cola almacenada<br /><span className="guia-k">desacoplado en ambos</span></td></tr>
            </tbody>
          </table>
        </div>
        <p className="guia-callout"><b>Espacial</b> = identidad y ubicación. <b>Temporal</b> = estar en línea al mismo tiempo. Maestro-trabajador está acoplado en ambos: el maestro debe conocer a sus trabajadores y ambos deben estar corriendo.</p>
      </section>

      {/* 5 Escalabilidad */}
      <section id="escalar" className="guia-section fam-scale">
        <SectionHead family="scale" title="Escalabilidad y alta disponibilidad">
          Las herramientas para soportar más carga y seguir en pie cuando algo falla.
        </SectionHead>
        <div className="guia-two">
          <div className="guia-card">
            <svg viewBox="0 0 220 120" role="img" aria-label="Scale up: un servidor se hace más grande">
              <rect className="n" x="30" y="70" width="40" height="40" rx="4" /><text x="50" y="94" textAnchor="middle">S</text>
              <path className="ea" d="M82 90 L118 90 M112 84 L118 90 L112 96" />
              <rect className="n" x="130" y="20" width="70" height="90" rx="4" /><text x="165" y="70" textAnchor="middle">S++</text>
            </svg>
            <span className="guia-tag">Scale-up · vertical</span>
            <p>Darle a <b>una máquina</b> más CPU y RAM. Simple, pero llega a un límite de hardware y no reparte la carga.</p>
          </div>
          <div className="guia-card">
            <svg viewBox="0 0 220 120" role="img" aria-label="Scale out: se agregan más servidores">
              <rect className="n" x="20" y="60" width="36" height="36" rx="4" /><text x="38" y="82" textAnchor="middle">S</text>
              <path className="ea" d="M66 78 L96 78 M90 72 L96 78 L90 84" />
              <rect className="n" x="108" y="60" width="30" height="36" rx="4" /><rect className="n" x="144" y="60" width="30" height="36" rx="4" /><rect className="n" x="180" y="60" width="30" height="36" rx="4" />
              <text x="159" y="45" textAnchor="middle" className="lbl">+ más nodos</text>
            </svg>
            <span className="guia-tag">Scale-out · horizontal</span>
            <p><b>Agregar más servidores</b> y repartir la carga. Crece casi sin límite. El costo es mantener los datos sincronizados entre nodos.</p>
          </div>
        </div>
        <div className="guia-card">
          <div className="guia-scroll">
            <svg viewBox="0 0 640 150" role="img" aria-label="Proxy forward del lado de los clientes y proxy reverse del lado de los servidores" className="guia-wide">
              <rect x="6" y="20" width="230" height="120" rx="8" className="zone" /><text x="16" y="38" className="lbl">Organización de los clientes</text>
              <rect x="404" y="20" width="230" height="120" rx="8" className="zone" /><text x="414" y="38" className="lbl">Organización de los servidores</text>
              <circle className="n" cx="40" cy="70" r="14" /><circle className="n" cx="40" cy="110" r="14" />
              <rect className="n" x="120" y="72" width="100" height="34" rx="5" /><text x="170" y="93" textAnchor="middle">Forward proxy</text>
              <path className="ea" d="M54 72 L120 86 M54 108 L120 94" />
              <ellipse cx="320" cy="89" rx="52" ry="26" className="cloud" /><text x="320" y="93" textAnchor="middle">Internet</text>
              <path className="ea" d="M220 89 L268 89 M372 89 L420 89" />
              <rect className="n" x="420" y="72" width="100" height="34" rx="5" /><text x="470" y="93" textAnchor="middle">Reverse proxy</text>
              <rect className="n" x="570" y="54" width="44" height="24" rx="4" /><rect className="n" x="570" y="100" width="44" height="24" rx="4" />
              <text x="592" y="70" textAnchor="middle">S1</text><text x="592" y="116" textAnchor="middle">S2</text>
              <path className="ea" d="M520 84 L570 66 M520 94 L570 112" />
            </svg>
          </div>
          <p>El <b>forward proxy</b> es la cara de los clientes hacia la red. El <b>reverse proxy</b> se ubica <b>con los servidores</b>, es la cara del mundo hacia ellos, oculta cuántos servidores hay y puede guardar caché y repartir la carga.</p>
        </div>
        <div className="guia-two">
          <VsCard title="Replicación activa" items={[<>El cliente envía la petición a <b>todas</b> las réplicas</>, 'Todas la procesan y mantienen el mismo estado', 'Si una falla, las otras ya están al día', <b key="b">Más réplicas = escrituras más lentas, porque esperas a todas</b>]} />
          <VsCard title="Replicación pasiva (primario-backup)" items={[<>Solo el <b>primario</b> atiende a los clientes</>, 'Luego propaga el nuevo estado a los backups', 'Solo esperas a un nodo', 'Qué tan fresco está el backup depende del modo standby']} />
        </div>
        <div className="guia-table-wrap">
          <table className="guia-table">
            <thead><tr><th>Standby</th><th>Cuándo recibe actualizaciones</th><th>Qué tan al día está</th><th>Velocidad de relevo</th></tr></thead>
            <tbody>
              {standbyModes.map((s) => (
                <tr key={s.name}><td>{s.name}</td><td>{s.when}</td><td>{s.fresh}</td><td>{s.takeover}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 Servidor */}
      <section id="servidor" className="guia-section fam-server">
        <SectionHead family="server" title="Dentro del cliente-servidor">
          Ahora un solo servidor: cómo atiende muchas peticiones, cómo lo encuentran los clientes y qué pasa cuando se pierden mensajes.
        </SectionHead>
        <h3>Binder: el directorio de servicios</h3>
        <p className="guia-body">
          El cliente conoce el <b>nombre</b> de un servicio ("pagos") pero no en qué máquina y puerto corre. El binder guarda la tabla <code>nombre → host:puerto</code>. Recorre los pasos.
        </p>
        <BinderSequence />
        <div className="guia-two">
          <VsCard title="Binder" items={[<>Solo <b>te dice dónde</b> está el servicio</>, <>Luego <b>se aparta</b>: las peticiones van directo al servidor</>, 'Si el servidor se mueve, se vuelve a registrar y los clientes lo encuentran (transparencia de posición)', 'Costo: los clientes quedan acoplados al binder', 'Como el DNS o un directorio telefónico']} />
          <VsCard title="Proxy" items={[<><b>Se queda en medio</b> de cada petición</>, 'Reenvía, filtra, guarda caché, balancea', 'Oculta los servidores por completo', 'Todos los mensajes pasan por él', 'Como una recepcionista que atiende todas las llamadas']} />
        </div>
        <h3>Cómo atiende un servidor a muchos clientes</h3>
        <div className="guia-table-wrap">
          <table className="guia-table">
            <thead><tr><th>Modelo</th><th>Cómo funciona</th><th>Ventaja / costo</th></tr></thead>
            <tbody>
              {serverModels.map((s) => (
                <tr key={s.name}><td>{s.name}</td><td>{s.how}</td><td>{s.tradeoff}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Cuando fallan los mensajes: semánticas de ejecución</h3>
        <div className="guia-grid">
          {semantics.map((s) => (
            <div key={s.tag} className="guia-card"><span className="guia-tag">{s.tag}</span><p>{s.text}</p></div>
          ))}
        </div>
        <div className="guia-two">
          <VsCard title="Lease" items={[<>Un recurso se entrega <b>por un tiempo limitado</b></>, 'El cliente debe renovarlo', 'Si no renueva, probablemente se cayó, y el servidor libera el recurso', <>Sirve para <b>detectar caídas de nodos y recursos abandonados</b></>]} />
          <VsCard title="Con estado vs sin estado" items={[<><b>Con estado:</b> el servidor recuerda a cada cliente. Mensajes más cortos, pero pierde todo si se cae</>, <><b>Sin estado:</b> cada petición lleva todos sus datos. Más fácil de replicar y escalar horizontalmente</>]} />
        </div>
      </section>

      <p className="guia-footnote">
        Basada en las transcripciones de las clases 1–13. La DHT y los ejemplos de transparencias complementan con teoría general donde las clases no entran en detalle.
      </p>
    </div>
  );
};
