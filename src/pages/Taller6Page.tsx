import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { TallerLayout } from '../components/layout/TallerLayout/TallerLayout';
import { DataTable } from '../components/ui/DataTable/DataTable';
import { getTaller, getTallerPath } from '../data/talleres.registry';
import { RichText } from './ClasePage';
import {
  serviciosDirectorio,
  serviciosNombres,
  t6Matrix,
  t6MatrixColumns,
  type ServicioEjemplo,
} from '../data/taller6.data';
import '../components/taller2/ModelSection/ModelSection.styles.css';
import './Taller2Page.styles.css';
import './Taller4Page.styles.css';

type Taller6SectionSlug = 'nombres' | 'directorio' | 'matriz';

const taller = getTaller('6')!;

const hostLabel = (url: string) => new URL(url).hostname.replace(/^www\./, '');

const ServicioList: React.FC<{ items: ServicioEjemplo[]; op: string }> = ({ items, op }) => (
  <>
    {items.map((s, i) => (
      <section key={s.id} id={s.id} className="t4-level t5-detail">
        <div className="t4-level-text">
          <span className="model-example-label">
            {String(i + 1).padStart(2, '0')} · {s.origin}
          </span>
          <h2 className="t4-h2">{s.name}</h2>
          <p>{s.description}</p>
          <h3 className="t5-h3">Cómo funciona</h3>
          <ul className="t5-steps">
            {s.puntos.map((p) => (
              <li key={p}><RichText text={p} /></li>
            ))}
          </ul>
          <p className="t4-enclase"><strong>Visto en clase:</strong> {s.enClase}</p>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="model-example-link">
            <span>{hostLabel(s.url)}</span>
            <ExternalLink size={13} />
          </a>
        </div>
        <div className="t5-components">
          <h3 className="t5-h3">Operación: {op}</h3>
          <div className="t5-component">
            <strong>Consulta</strong>
            <code className="t6-code">{s.ejemplo.pregunta}</code>
          </div>
          <div className="t5-component">
            <strong>Respuesta</strong>
            <span>{s.ejemplo.respuesta}</span>
          </div>
        </div>
      </section>
    ))}
  </>
);

const NombresView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Tres servicios de nombres (páginas blancas): se les da un nombre <strong>exacto</strong> y devuelven dónde está el
      recurso.
    </p>
    <ServicioList items={serviciosNombres} op="resolve" />
  </>
);

const DirectorioView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Tres servicios de directorio (páginas amarillas): se les dan <strong>características</strong> y devuelven todos los
      recursos que las cumplen.
    </p>
    <ServicioList items={serviciosDirectorio} op="search" />
  </>
);

const MatrizView: React.FC = () => (
  <>
    <p className="taller2-lead">Resumen de los seis servicios investigados.</p>
    <DataTable columns={t6MatrixColumns} rows={t6Matrix} />
  </>
);

export const Taller6Page: React.FC = () => {
  const { section } = useParams<{ section: Taller6SectionSlug }>();

  const sectionViews: Record<Taller6SectionSlug, React.ReactNode> = {
    nombres: <NombresView />,
    directorio: <DirectorioView />,
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
