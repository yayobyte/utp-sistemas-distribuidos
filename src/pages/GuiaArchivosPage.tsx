import React, { useState } from 'react';
import {
  ChoiceQuiz,
  FamilyMap,
  GuiaTable,
  GuiaTabs,
  QaList,
  SectionHead,
  StepButtons,
  VsCard,
  useSteps,
} from '../components/guia/GuiaParts';
import {
  almExamClues,
  almFamilies,
  almQa,
  almQuiz,
  almQuizOptions,
  dfsExamples,
  dnsSteps,
  internetChain,
  namesVsDir,
  printers,
  raidTable,
  semantics,
  storageTypes,
} from '../data/guiaArchivos.data';
import './GuiaEstudioPage.styles.css';
import './GuiaArchivosPage.styles.css';

const fam = (n: number) => `Familia ${n}`;

// ── 3 · Parity lab ───────────────────────────────────────────────

const bits = (n: number) => n.toString(2).padStart(4, '0');

const ParityLab: React.FC = () => {
  const [data, setData] = useState([0b1011, 0b0110, 0b1100]);
  const [failed, setFailed] = useState<number | null>(null);
  const parity = data.reduce((a, b) => a ^ b, 0);
  const disks = [...data, parity];
  const rebuilt = failed === null ? null : disks.filter((_, i) => i !== failed).reduce((a, b) => a ^ b, 0);

  const flip = (disk: number, bit: number) => {
    setData((d) => d.map((v, i) => (i === disk ? v ^ (1 << (3 - bit)) : v)));
  };

  return (
    <div className="guia-widget">
      <h3>Laboratorio: paridad XOR</h3>
      <p className="guia-widget-note">
        Toca un bit de los discos de datos para cambiarlo; la paridad se recalcula. Luego "daña" un disco y mira cómo se reconstruye con los demás.
      </p>
      <div className="alm-disks">
        {disks.map((v, i) => {
          const isParity = i === 3;
          const isFailed = failed === i;
          return (
            <div key={i} className={`alm-disk${isParity ? ' is-parity' : ''}${isFailed ? ' is-failed' : ''}`}>
              <span className="alm-disk-name">{isParity ? 'Paridad' : `Disco ${i + 1}`}</span>
              <div className="alm-bits">
                {bits(v).split('').map((b, j) => (
                  <button
                    key={j}
                    type="button"
                    disabled={isParity || isFailed}
                    onClick={() => flip(i, j)}
                    aria-label={`Bit ${j + 1} de ${isParity ? 'paridad' : `disco ${i + 1}`}: ${isFailed ? 'perdido' : b}`}
                  >
                    {isFailed ? '?' : b}
                  </button>
                ))}
              </div>
              <button type="button" className="alm-fail" onClick={() => setFailed(isFailed ? null : i)}>
                {isFailed ? 'Reemplazar' : 'Dañar'}
              </button>
            </div>
          );
        })}
      </div>
      <p className="alm-result" aria-live="polite">
        {failed === null ? (
          <>Paridad = D1 ⊕ D2 ⊕ D3 = <code>{bits(parity)}</code>. Se pierde el espacio de un disco (75 % útil con 4).</>
        ) : (
          <>
            Modo <b>degradado</b>: {failed === 3 ? 'la paridad' : `el disco ${failed + 1}`} se recalcula como el XOR de los otros tres ={' '}
            <code>{bits(rebuilt!)}</code>, igual al valor perdido (<code>{bits(disks[failed])}</code>). Si falla un segundo disco, ya no hay con qué
            reconstruir: para eso está RAID 6.
          </>
        )}
      </p>
    </div>
  );
};

// ── 4 · DNS sequence ────────────────────────────────────────────

const DnsSequence: React.FC = () => {
  const { step, setStep, on } = useSteps(dnsSteps.length, 1);
  const servers = [
    { y: 20, label: 'Raíz (.)' },
    { y: 70, label: '.co' },
    { y: 120, label: 'edu.co' },
    { y: 170, label: 'utp.edu.co' },
  ];
  return (
    <div className="guia-seq">
      <div className="guia-scroll">
        <svg viewBox="0 0 600 220" role="img" aria-label="Resolución DNS: navegador, resolver con caché y servidores raíz, .co, edu.co y utp.edu.co">
          <rect className="n" x="10" y="90" width="100" height="40" rx="6" />
          <text x="60" y="114" textAnchor="middle">Navegador</text>
          <rect className="nf" x="200" y="90" width="110" height="40" rx="6" />
          <text x="255" y="114" textAnchor="middle" className="on-fill">Resolver</text>
          <text x="255" y="146" textAnchor="middle" className={`lbl ${step >= 6 ? 'alm-hot' : ''}`}>caché (TTL)</text>
          {servers.map((s, i) => (
            <g key={s.label}>
              <rect className="n" x="440" y={s.y} width="140" height="34" rx="6" />
              <text x="510" y={s.y + 21} textAnchor="middle">{s.label}</text>
              <g className={on(i + 2)}>
                <path className="ea" d={`M310 110 L440 ${s.y + 17}`} />
                <text x="375" y={(110 + s.y + 17) / 2 - 4} textAnchor="middle" className="lbl">{i < 3 ? 'pregunta al siguiente' : 'IP'}</text>
              </g>
            </g>
          ))}
          <g className={on(1)}><path className="ea" d="M110 104 H200 M194 98 L200 104 L194 110" /><text x="155" y="96" textAnchor="middle">www.utp.edu.co?</text></g>
          <g className={on(6)}><path className="ea" d="M200 122 H110 M116 116 L110 122 L116 128" /><text x="155" y="140" textAnchor="middle">200.21.x.x</text></g>
        </svg>
      </div>
      <StepButtons steps={dnsSteps} step={step} setStep={setStep} label="Pasos de la resolución DNS" />
    </div>
  );
};

// ── 5 · Directory vs names lab ──────────────────────────────────

const any = 'Cualquiera';
const facultades = [any, ...Array.from(new Set(printers.map((p) => p.facultad)))];
const programas = [any, ...Array.from(new Set(printers.map((p) => p.programa)))];

const DirectoryLab: React.FC = () => {
  const [name, setName] = useState('HP-Color-Sistemas-1');
  const [color, setColor] = useState(false);
  const [a4, setA4] = useState(false);
  const [facultad, setFacultad] = useState(any);
  const [programa, setPrograma] = useState(any);

  const exact = printers.find((p) => p.name === name.trim());
  const matches = printers.filter(
    (p) => (!color || p.color) && (!a4 || p.a4) && (facultad === any || p.facultad === facultad) && (programa === any || p.programa === programa),
  );
  const filter = [
    color && '(color=TRUE)',
    a4 && '(a4=TRUE)',
    facultad !== any && `(facultad=${facultad})`,
    programa !== any && `(programa=${programa})`,
  ].filter(Boolean);

  return (
    <div className="guia-two">
      <div className="guia-widget fam-names">
        <h3>Servicio de nombres: resolve</h3>
        <label className="alm-field">
          Nombre exacto de la impresora
          <input value={name} onChange={(e) => setName(e.target.value)} spellCheck={false} />
        </label>
        <p className="alm-result" aria-live="polite">
          {exact ? (
            <>Encontrada: <b>{exact.name}</b> → \\{exact.facultad.toLowerCase().split(' ')[0]}-srv\{exact.name.toLowerCase()}</>
          ) : (
            <>No existe. Basta un error de una letra: la comparación es <b>exacta</b>.</>
          )}
        </p>
        <p className="guia-widget-note">Prueba a borrar una letra o escribir "hp-color-sistemas-1" en minúsculas.</p>
      </div>
      <div className="guia-widget fam-dir">
        <h3>Servicio de directorio: search</h3>
        <div className="guia-segmented">
          <button type="button" aria-pressed={color} onClick={() => setColor(!color)}>A color</button>
          <button type="button" aria-pressed={a4} onClick={() => setA4(!a4)}>Soporta A4</button>
        </div>
        <div className="alm-selects">
          <label className="alm-field">
            Facultad
            <select value={facultad} onChange={(e) => setFacultad(e.target.value)}>
              {facultades.map((f) => <option key={f}>{f}</option>)}
            </select>
          </label>
          <label className="alm-field">
            Programa
            <select value={programa} onChange={(e) => setPrograma(e.target.value)}>
              {programas.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>
        <code className="alm-filter">{filter.length ? `(&${filter.join('')})` : '(objectClass=printer)'}</code>
        <p className="alm-result" aria-live="polite">
          <b>{matches.length}</b> {matches.length === 1 ? 'resultado' : 'resultados'}
          {matches.length === 0 && ': ninguno cumple, se relaja el filtro'}
          {matches.length > 1 && ': si solo necesito una, agrego atributos'}
        </p>
        <ul className="alm-matches">
          {matches.map((p) => <li key={p.name}>{p.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

// ── Page ────────────────────────────────────────────────────────

export const GuiaArchivosPage: React.FC = () => (
  <div className="guia-page container-tight">
    <GuiaTabs />
    <header className="guia-header">
      <p className="guia-kicker">Guía de estudio · clases 18–19</p>
      <h1 className="type-display-lg">¿Dónde está y cómo lo encuentro?</h1>
      <p className="guia-lead">
        La última parte del segundo parcial responde dos preguntas. Primero, dónde viven los datos y cómo se reparten entre muchos discos sin
        perderlos. Después, cómo se encuentra cualquier recurso: por su nombre exacto o por sus características.
      </p>
    </header>

    <FamilyMap families={almFamilies} label="Familias de almacenamiento y nombres" />

    <div className="guia-trick">
      <b>Truco de examen:</b>
      <span>
        {almExamClues.map(([clue, family], i) => (
          <React.Fragment key={clue}>
            {clue} → <b>{family}</b>{i < almExamClues.length - 1 ? '. ' : '.'}
          </React.Fragment>
        ))}
      </span>
    </div>

    <section id="donde" className="guia-section fam-where">
      <SectionHead eyebrow={fam(1)} title="DAS, NAS y SAN">
        Antes de gestionar archivos hay que saber dónde están los discos. Regla práctica: poco volumen, <b>NAS</b>; gran escala, <b>SAN</b>; sin
        presupuesto, <b>DAS</b>.
      </SectionHead>
      <GuiaTable headers={['Tipo', 'Qué es', 'Conexión', 'Escala', 'Ejemplo']} rows={storageTypes} />
      <p className="guia-callout">
        <b>Trampa:</b> Samba <b>no</b> es NAS. Publica carpetas locales de una máquina concreta, así que es DAS.
      </p>
    </section>

    <section id="dfs" className="guia-section fam-dfs">
      <SectionHead eyebrow={fam(2)} title="Sistema de archivos distribuido (DFS)">
        Un DFS junta los discos DAS de muchos nodos y los muestra como <b>un solo árbol</b> (100 nodos × 1 TB ≈ 100 TB). Emula un sistema
        centralizado, pero lee y escribe en <b>secuencia</b>.
      </SectionHead>
      <div className="guia-grid">
        <VsCard title="Lo que busca" items={['Transparencia de **acceso**, **ubicación** y **réplica**', '**Espacio de nombres único** (`/`, `/home`…)', 'Tolerancia a fallos y escalabilidad']} />
        <VsCard title="Cliente ligero vs pesado" items={['**Ligero**: reenvía `open/read/write` por RPC; el servidor sabe todo', '**Pesado**: el cliente gestiona; escala mejor pero hay que actualizar a todos']} />
        <VsCard title="Módulos" items={['Servicio de **archivos**', 'Servicio de **directorios** (nombre → ubicación)', '**Módulo cliente**']} />
        <VsCard title="Caché" items={['**Inmediata**: actualiza todas las copias (mucho tráfico)', '**Diferida**: solo invalida; cada uno recarga al necesitar']} />
      </div>
      <GuiaTable headers={['Semántica', 'Cómo funciona', 'Costo', 'Ejemplo']} rows={semantics} />
      <p className="guia-callout">
        <b>Réplicas:</b> las escrituras van al <b>primario</b>; si cae, hay <b>failover</b> por votación con <b>quórum</b> (mitad más uno). Con 5
        nodos hacen falta 3 vivos.
      </p>
      <GuiaTable headers={['Sistema', 'Idea', 'Para recordar']} rows={dfsExamples} />
    </section>

    <section id="paralelos" className="guia-section fam-par">
      <SectionHead eyebrow={fam(3)} title="Sistemas paralelos y RAID">
        Aquí el archivo se parte en bloques que van a <b>discos distintos</b> y se leen a la vez. Tres técnicas: <b>striping</b> (velocidad),{' '}
        <b>mirroring</b> (copias) y <b>paridad</b> (reconstruir con XOR).
      </SectionHead>
      <ParityLab />
      <GuiaTable headers={['Nivel', 'Técnica', 'Mín.', 'Útil', 'Tolera', 'Para qué']} rows={raidTable} />
      <div className="guia-grid">
        <VsCard title="Distribuido (DFS)" items={['Objetivo: **emular** un disco central', 'Archivo completo en un nodo', 'Tolerancia por **replicación**']} />
        <VsCard title="Paralelo" items={['Objetivo: **rendimiento**', 'Archivo en franjas por todos los discos', 'Réplica de fragmentos o **paridad**']} />
      </div>
    </section>

    <section id="nombres" className="guia-section fam-names">
      <SectionHead eyebrow={fam(4)} title="Servicio de nombres (páginas blancas)">
        <b>Indirección</b>: ponerle un nombre a una dirección, porque recordamos mejor nombres y porque si el recurso se mueve o se replica, el
        nombre sigue sirviendo. Es un <b>binder</b> para cualquier recurso.
      </SectionHead>
      <div className="guia-grid">
        <VsCard title="URI = URN + URL" items={['**URN**: el nombre del recurso', '**URL**: su ubicación', 'Un buscador **no** es un servicio de nombres']} />
        <VsCard title="Espacio de nombres" items={['Jerárquico, como carpetas', 'Archivos: izquierda → derecha; DNS: **derecha → izquierda**', 'DNS solo rutas **absolutas**']} />
        <VsCard title="Escalar" items={['**Replicación**: todos con todo', '**Distribución**: cada uno su zona', '**Caché** con **TTL**']} />
      </div>
      <DnsSequence />
      <GuiaTable headers={['Servicio', 'Recibe', 'Devuelve']} rows={internetChain} />
      <p className="guia-callout">
        Internet encadena <b>servicios de nombres</b>: un gran directorio de todo sería imposible de mantener. Los nombres además son{' '}
        <b>bidireccionales</b> (resolución inversa) y pueden devolver varias IPs para balancear.
      </p>
    </section>

    <section id="directorio" className="guia-section fam-dir">
      <SectionHead eyebrow={fam(5)} title="Servicio de directorio (páginas amarillas)">
        No se sabe el nombre: se piden <b>características</b> y vuelven todos los recursos que las cumplen. Árbol de clases, entradas con atributos
        clave-valor, un <b>esquema</b> que dice qué atributos lleva cada objeto y un <b>DN</b> único.
      </SectionHead>
      <DirectoryLab />
      <GuiaTable headers={['', 'Nombres', 'Directorio']} rows={namesVsDir} />
    </section>

    <section className="guia-section fam-dir">
      <SectionHead eyebrow="Práctica" title="¿Qué es?">
        Lee el escenario y elige el concepto.
      </SectionHead>
      <ChoiceQuiz title="Almacenamiento y nombres" options={almQuizOptions} items={almQuiz} />
      <QaList items={almQa} />
    </section>

    <p className="guia-footnote">
      Basada en las transcripciones de las clases 18 y 19 y en los talleres 4, 5 y 6. Los ejemplos de impresoras y direcciones son ilustrativos.
    </p>
  </div>
);
