import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TallerLayout } from '../components/layout/TallerLayout/TallerLayout';
import { ModelSection } from '../components/taller2/ModelSection/ModelSection';
import { DataTable } from '../components/ui/DataTable/DataTable';
import { getTaller, getTallerPath } from '../data/talleres.registry';
import { matrixColumns, modelosData } from '../data/taller2.data';
import type { Taller2SectionSlug } from './Taller2Page.d';
import './Taller2Page.styles.css';

const taller = getTaller('2')!;

const matrixRows = modelosData.map((modelo) => [
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
    <div className="taller2-jump-list" aria-label="Ir a un modelo">
      {modelosData.map((modelo) => (
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
    {modelosData.map((modelo, index) => (
      <ModelSection key={modelo.id} modelo={modelo} index={index} />
    ))}
  </>
);

const MatrizView: React.FC = () => (
  <>
    <p className="taller2-lead">
      Resumen comparativo de los 9 modelos de computación distribuida según su enfoque, acoplamiento, red, dominio administrativo y métrica clave.
    </p>
    <DataTable columns={matrixColumns} rows={matrixRows} />
  </>
);

export const Taller2Page: React.FC = () => {
  const { section } = useParams<{ section: Taller2SectionSlug }>();

  const sectionViews: Record<Taller2SectionSlug, React.ReactNode> = {
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
