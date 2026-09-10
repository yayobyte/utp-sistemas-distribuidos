import React from 'react';
import { SubNav } from '../components/SubNav';
import './ExposicionesPage.styles.css';

export const ExposicionesPage: React.FC = () => {
  return (
    <div>
      <SubNav
        title="Exposiciones Temáticas"
        subtitle="20% de la calificación definitiva"
        badge="IS893"
      />

      <section className="tile-section tile-light exposiciones-section">
        <div className="container-tight">
          <div className="exposiciones-header">
            <h1 className="type-display-lg exposiciones-title">
              Profundizaciones en Tecnologías Distribuidas
            </h1>
            <p className="type-body exposiciones-lead">
              Son profundizaciones de aplicaciones de sistemas distribuidos de manera individual o en parejas, para hacer una revisión de las tecnologías existentes donde se aplican de manera general los conceptos vistos en clase.
            </p>
          </div>

          {/* Grading Criteria Card */}
          <div className="utility-card exposiciones-card">
            <h3 className="exposiciones-card-title">
              Criterios de Calificación de la Exposición (20%)
            </h3>

            <div className="exposiciones-criteria-grid">
              <div className="exposicion-criteria-box">
                <div className="exposicion-percentage" style={{ color: 'var(--color-primary)' }}>50%</div>
                <div className="exposicion-criteria-name">Presentación</div>
                <div className="exposicion-criteria-desc">Claridad técnica, dominio del tema y soporte audiovisual.</div>
              </div>

              <div className="exposicion-criteria-box">
                <div className="exposicion-percentage" style={{ color: 'var(--color-success)' }}>30%</div>
                <div className="exposicion-criteria-name">Quiz</div>
                <div className="exposicion-criteria-desc">Evaluación sobre el contenido expuesto.</div>
              </div>

              <div className="exposicion-criteria-box">
                <div className="exposicion-percentage" style={{ color: 'var(--color-accent-purple)' }}>20%</div>
                <div className="exposicion-criteria-name">Asistencia</div>
                <div className="exposicion-criteria-desc">Participación activa durante las exposiciones.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
