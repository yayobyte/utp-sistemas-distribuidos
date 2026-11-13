import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { TallerLayout } from '../components/layout/TallerLayout/TallerLayout';
import { DataTable } from '../components/ui/DataTable/DataTable';
import { getTaller, getTallerPath } from '../data/talleres.registry';
import { RichText } from './ClasePage';
import {
  dfsMatrixColumns,
  nivelesRaid,
  otrosNiveles,
  raidIntro,
  sistemasArchivos,
  type NivelRaid,
} from '../data/taller4.data';
import '../components/taller2/ModelSection/ModelSection.styles.css';
import './Taller2Page.styles.css';
import './Taller4Page.styles.css';

type Taller4SectionSlug = 'sistemas' | 'raid' | 'matriz';

const taller = getTaller('4')!;

const hostLabel = (url: string) => new URL(url).hostname.replace(/^www\./, '');

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const SistemasView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Seis sistemas de archivos distribuidos reales, del más clásico al más reciente. Cada uno indica con qué concepto de la
      clase 18 se relaciona.
    </p>
    <div className="model-section-grid t4-dfs-grid">
      {sistemasArchivos.map((s, i) => (
        <article key={s.id} id={s.id} className="model-example-card">
          <span className="model-example-label">
            {String(i + 1).padStart(2, '0')} · {s.origin}
          </span>
          <h3 className="model-example-name">{s.name}</h3>
          <p className="model-example-desc">{s.description}</p>
          <p className="t4-enclase">
            <strong>Visto en clase:</strong> {s.enClase}
          </p>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="model-example-link">
            <span>{hostLabel(s.url)}</span>
            <ExternalLink size={13} />
          </a>
        </article>
      ))}
    </div>
  </>
);

const RaidDiagram: React.FC<{ nivel: NivelRaid }> = ({ nivel }) => (
  <div className="t4-raid-diagram" role="img" aria-label={`Distribución de bloques en ${nivel.name} con 4 discos`}>
    {[0, 1, 2, 3].map((disk) => (
      <div key={disk} className="t4-disk">
        <span className="t4-disk-label">Disco {disk + 1}</span>
        {nivel.layout.map((row, r) => (
          <span key={r} className={`t4-block is-${row[disk].kind}`}>
            {row[disk].label}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Legend: React.FC = () => (
  <div className="t4-legend">
    <span><i className="t4-block is-d" /> Dato</span>
    <span><i className="t4-block is-m" /> Copia espejo</span>
    <span><i className="t4-block is-p" /> Paridad / control</span>
    <span><i className="t4-block is-q" /> Segunda paridad</span>
  </div>
);

const calcLevels = nivelesRaid.filter((n) => n.common);

const CapacityCalculator: React.FC = () => {
  const [disks, setDisks] = useState(4);
  const [size, setSize] = useState(2);
  return (
    <section className="t4-calc" aria-labelledby="t4-calc-title">
      <h2 id="t4-calc-title" className="t4-h2">Calculadora de capacidad</h2>
      <div className="t4-calc-controls">
        <label>
          Discos: <b>{disks}</b>
          <input type="range" min={2} max={12} value={disks} onChange={(e) => setDisks(+e.target.value)} />
        </label>
        <label>
          Tamaño de cada disco: <b>{size} TB</b>
          <input type="range" min={1} max={20} value={size} onChange={(e) => setSize(+e.target.value)} />
        </label>
      </div>
      <div className="t4-calc-rows">
        {calcLevels.map((n) => {
          const ok = disks >= n.minDisks && (n.id !== 'raid10' || disks % 2 === 0);
          const usable = ok ? n.usable(disks) : 0;
          const pct = ok ? Math.round((usable / disks) * 100) : 0;
          return (
            <div key={n.id} className={`t4-calc-row${ok ? '' : ' is-off'}`}>
              <span className="t4-calc-name">{n.name}</span>
              <span className="t4-calc-bar" aria-hidden="true">
                <span style={{ width: `${pct}%` }} />
              </span>
              <span className="t4-calc-value">
                {ok
                  ? `${usable * size} TB útiles de ${disks * size} TB (${pct} %) · tolera ${n.tolerates}`
                  : n.id === 'raid10' && disks >= 4
                    ? 'Necesita un número par de discos'
                    : `Necesita mínimo ${n.minDisks} discos`}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const RaidView: React.FC = () => (
  <>
    <section className="t4-intro">
      <h2 className="t4-h2">¿Qué son los arreglos de disco RAID?</h2>
      {raidIntro.map((t) => (
        <p key={t}><RichText text={t} /></p>
      ))}
    </section>

    <div className="taller2-jump-list" aria-label="Ir a un nivel RAID">
      {nivelesRaid.map((n) => (
        <button key={n.id} type="button" className="taller2-jump-chip" onClick={() => scrollTo(n.id)}>
          {n.name}
        </button>
      ))}
    </div>
    <Legend />

    {nivelesRaid.map((n) => (
      <section key={n.id} id={n.id} className="t4-level">
        <div className="t4-level-text">
          <span className="model-example-label">
            Mínimo {n.minDisks} discos · tolera {n.tolerates}
            {!n.common && ' · poco usado hoy'}
          </span>
          <h2 className="t4-h2">
            {n.name} <small>{n.nickname}</small>
          </h2>
          <p><RichText text={n.description} /></p>
          <p><strong>A favor:</strong> {n.pros}</p>
          <p><strong>En contra:</strong> {n.cons}</p>
        </div>
        <RaidDiagram nivel={n} />
      </section>
    ))}

    <section className="t4-others">
      <h2 className="t4-h2">Otros niveles y variantes</h2>
      <div className="model-section-grid">
        {otrosNiveles.map((o) => (
          <article key={o.name} className="model-example-card">
            <h3 className="model-example-name">{o.name}</h3>
            <p className="model-example-desc">{o.text}</p>
          </article>
        ))}
      </div>
    </section>

    <CapacityCalculator />
  </>
);

const dfsRows = sistemasArchivos.map((s) => [
  s.name,
  s.matrix.arquitectura,
  s.matrix.semantica,
  s.matrix.tolerancia,
  s.matrix.usoTipico,
]);

const raidRows = nivelesRaid.map((n) => [
  n.name,
  n.nickname,
  String(n.minDisks),
  n.id === 'raid1' ? '1 disco' : n.id === 'raid10' ? 'n / 2' : n.id === 'raid2' ? 'n − discos Hamming' : n.id === 'raid0' ? 'n' : n.id === 'raid6' ? 'n − 2' : 'n − 1',
  n.tolerates,
  n.common ? 'Sí' : 'No',
]);

const MatrizView: React.FC = () => (
  <>
    <p className="taller2-lead">Resumen de los seis sistemas de archivos distribuidos.</p>
    <DataTable columns={dfsMatrixColumns} rows={dfsRows} />
    <p className="taller2-lead t4-gap">Resumen de los niveles RAID (n = número de discos).</p>
    <DataTable
      columns={['Nivel', 'Técnica', 'Mín. discos', 'Capacidad útil', 'Tolera', 'Uso actual']}
      rows={raidRows}
    />
  </>
);

export const Taller4Page: React.FC = () => {
  const { section } = useParams<{ section: Taller4SectionSlug }>();

  const sectionViews: Record<Taller4SectionSlug, React.ReactNode> = {
    sistemas: <SistemasView />,
    raid: <RaidView />,
    matriz: <MatrizView />,
  };

  if (!section || !(section in sectionViews)) {
    return <Navigate to={getTallerPath(taller)} replace />;
  }

  return (
    <TallerLayout taller={taller}>
      <div className="container-wide taller2-content">{sectionViews[section]}</div>
    </TallerLayout>
  );
};
