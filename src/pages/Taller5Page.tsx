import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { TallerLayout } from '../components/layout/TallerLayout/TallerLayout';
import { DataTable } from '../components/ui/DataTable/DataTable';
import { getTaller, getTallerPath } from '../data/talleres.registry';
import { RichText } from './ClasePage';
import {
  detallesParalelos,
  paraleloMatrix,
  paraleloMatrixColumns,
  sistemasParalelos,
} from '../data/taller5.data';
import '../components/taller2/ModelSection/ModelSection.styles.css';
import './Taller2Page.styles.css';
import './Taller4Page.styles.css';

type Taller5SectionSlug = 'sistemas' | 'funcionamiento' | 'matriz';

const taller = getTaller('5')!;

const hostLabel = (url: string) => new URL(url).hostname.replace(/^www\./, '');
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const SistemasView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Seis sistemas de archivos paralelos en uso hoy. Todos parten cada archivo en bloques y los reparten entre muchos discos y
      servidores para leer y escribir a la vez (striping, clase 18).
    </p>
    <div className="model-section-grid t4-dfs-grid">
      {sistemasParalelos.map((s, i) => (
        <article key={s.id} className="model-example-card">
          <span className="model-example-label">
            {String(i + 1).padStart(2, '0')} · {s.origin}
          </span>
          <h3 className="model-example-name">{s.name}</h3>
          <p className="model-example-desc">{s.summary}</p>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="model-example-link">
            <span>{hostLabel(s.url)}</span>
            <ExternalLink size={13} />
          </a>
        </article>
      ))}
    </div>
  </>
);

/** Generic picture: client asks metadata once, then talks to every storage server in parallel. */
const FlowDiagram: React.FC = () => (
  <svg className="t5-flow" viewBox="0 0 560 220" role="img" aria-label="El cliente pide la ubicación a metadatos y luego lee en paralelo de los servidores de datos">
    <rect x="20" y="85" width="110" height="50" rx="8" className="t5-node" />
    <text x="75" y="115" textAnchor="middle">Cliente</text>
    <rect x="225" y="10" width="130" height="44" rx="8" className="t5-node is-meta" />
    <text x="290" y="37" textAnchor="middle">Metadatos</text>
    <path d="M130 100 L225 40" className="t5-edge" />
    <text x="150" y="58" className="t5-small">1. ¿dónde está?</text>
    {[0, 1, 2, 3].map((i) => {
      const y = 80 + i * 35;
      return (
        <g key={i}>
          <rect x="420" y={y} width="120" height="28" rx="6" className="t5-node is-data" />
          <text x="480" y={y + 19} textAnchor="middle">Datos {i + 1} · franja {i + 1}</text>
          <path d={`M130 ${110} L420 ${y + 14}`} className="t5-edge is-par" />
        </g>
      );
    })}
    <text x="250" y="210" textAnchor="middle" className="t5-small">2. lectura / escritura en paralelo, directo con cada servidor</text>
  </svg>
);

const FuncionamientoView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Cómo funcionan tres de ellos. Los tres siguen el mismo patrón: el cliente pregunta una vez dónde están los bloques y
      luego habla directamente y en paralelo con los servidores de datos.
    </p>
    <FlowDiagram />
    <div className="taller2-jump-list" aria-label="Ir a un sistema">
      {detallesParalelos.map((s) => (
        <button key={s.id} type="button" className="taller2-jump-chip" onClick={() => scrollTo(`det-${s.id}`)}>
          {s.name}
        </button>
      ))}
    </div>
    {detallesParalelos.map((s, i) => (
      <section key={s.id} id={`det-${s.id}`} className="t4-level t5-detail">
        <div className="t4-level-text">
          <span className="model-example-label">{String(i + 1).padStart(2, '0')}</span>
          <h2 className="t4-h2">{s.name}</h2>
          <p><RichText text={s.intro} /></p>
          <h3 className="t5-h3">Funcionamiento</h3>
          <ol className="t5-steps">
            {s.pasos.map((p) => (
              <li key={p}><RichText text={p} /></li>
            ))}
          </ol>
          <h3 className="t5-h3">Tolerancia a fallos</h3>
          <p><RichText text={s.tolerancia} /></p>
          <p className="t4-enclase"><strong>Visto en clase:</strong> {s.enClase}</p>
        </div>
        <div className="t5-components">
          <h3 className="t5-h3">Componentes</h3>
          {s.componentes.map((c) => (
            <div key={c.name} className="t5-component">
              <strong>{c.name}</strong>
              <span>{c.role}</span>
            </div>
          ))}
        </div>
      </section>
    ))}
  </>
);

const MatrizView: React.FC = () => (
  <>
    <p className="taller2-lead">Resumen de los seis sistemas de archivos paralelos.</p>
    <DataTable columns={paraleloMatrixColumns} rows={paraleloMatrix} />
  </>
);

export const Taller5Page: React.FC = () => {
  const { section } = useParams<{ section: Taller5SectionSlug }>();

  const sectionViews: Record<Taller5SectionSlug, React.ReactNode> = {
    sistemas: <SistemasView />,
    funcionamiento: <FuncionamientoView />,
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
