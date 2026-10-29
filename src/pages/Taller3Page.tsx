import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TallerLayout } from '../components/layout/TallerLayout/TallerLayout';
import { ModelSection } from '../components/taller2/ModelSection/ModelSection';
import { DataTable } from '../components/ui/DataTable/DataTable';
import { getTaller, getTallerPath } from '../data/talleres.registry';
import { matrixColumns, arquitecturasData } from '../data/taller3.data';
import type { Taller3SectionSlug } from './Taller3Page.d';
import './Taller2Page.styles.css';

const taller = getTaller('3')!;

const matrixRows = arquitecturasData.map((modelo) => [
  modelo.shortName,
  modelo.matrix.enfoque,
  modelo.matrix.acoplamiento,
  modelo.matrix.red,
  modelo.matrix.dominio,
  modelo.matrix.metrica,
]);

const scrollToModel = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const EjemplosView: React.FC = () => (
  <>
    <div className="taller2-jump-list" aria-label="Ir a una arquitectura">
      {arquitecturasData.map((modelo) => (
        <button
          key={modelo.id}
          type="button"
          className="taller2-jump-chip"
          onClick={() => scrollToModel(modelo.id)}
        >
          {modelo.shortName}
        </button>
      ))}
    </div>
    {arquitecturasData.map((modelo, index) => (
      <ModelSection key={modelo.id} modelo={modelo} index={index} />
    ))}
  </>
);

const MatrizView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Resumen comparativo de las 4 arquitecturas según su idea central, acoplamiento, roles, forma de comunicación y punto débil.
    </p>
    <DataTable columns={matrixColumns} rows={matrixRows} />
  </>
);

export const Taller3Page: React.FC = () => {
  const { section } = useParams<{ section: Taller3SectionSlug }>();

  const sectionViews: Record<Taller3SectionSlug, React.ReactNode> = {
    ejemplos: <EjemplosView />,
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
