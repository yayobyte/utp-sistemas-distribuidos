import React from 'react';
import { Link } from 'react-router-dom';
import { SubNav } from '../components/SubNav';
import { ArrowRight, Clock, Award, Lock } from 'lucide-react';
import './TalleresPage.styles.css';

export const TalleresPage: React.FC = () => {
  return (
    <div>
      <SubNav
        title="Talleres & Actividades"
        subtitle="20% de la calificación definitiva"
        badge="IS893"
      />

      <section className="tile-section tile-light talleres-section">
        <div className="container-wide">
          <div className="talleres-header">
            <h1 className="type-display-lg talleres-title">
              Catálogo de Talleres Prácticos
            </h1>
            <p className="type-body talleres-lead">
              Durante cada capítulo, se plantean actividades y talleres para reforzar la claridad y aplicabilidad de los conceptos teóricos vistos en clase.
            </p>
          </div>

          <div className="talleres-grid">
            {/* Taller 1 - ACTIVE */}
            <div className="utility-card taller-card-active">
              <div>
                <div className="taller-card-header">
                  <span className="taller-badge-active">
                    Activo · Asignado
                  </span>
                  <span className="taller-points">
                    50 Puntos
                  </span>
                </div>

                <h3 className="taller-card-title">
                  Taller 1: Conceptos Clúster y Grid
                </h3>
                <p className="taller-card-desc">
                  Investigación exhaustiva del Hardware para la conformación de un CLÚSTER y/o un GRID, enfatizando las diferencias de arquitectura, acoplamiento, latencia y administración.
                </p>

                <div className="taller-meta-list">
                  <div className="taller-meta-item">
                    <Clock size={14} color="var(--color-primary)" />
                    <span>Entrega: Próxima clase (18:30)</span>
                  </div>
                  <div className="taller-meta-item">
                    <Award size={14} color="var(--color-primary)" />
                    <span>Objetivo: Infraestructura de Hardware Distribuido</span>
                  </div>
                </div>
              </div>

              <Link to="/talleres/1" className="btn-primary" style={{ width: '100%' }}>
                Abrir Taller 1 & Documento
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Taller 2 - Upcoming */}
            <div className="utility-card taller-card-upcoming">
              <div>
                <div className="taller-card-header">
                  <span className="taller-badge-upcoming">
                    Próximamente · Tema 2
                  </span>
                  <span className="taller-tag-cut">
                    Parcial 1
                  </span>
                </div>

                <h3 className="taller-card-title">
                  Taller 2: Arquitecturas Distribuidas & P2P
                </h3>
                <p className="taller-card-desc">
                  Modelos Cliente-Servidor multihilo, arquitecturas P2P no estructuradas y estructuradas (DHT / Chord), y capas de middleware.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-ink-muted-48)' }}>
                <Lock size={14} />
                <span>Disponible tras finalizar Tema 1</span>
              </div>
            </div>

            {/* Taller 3 - Upcoming */}
            <div className="utility-card taller-card-upcoming">
              <div>
                <div className="taller-card-header">
                  <span className="taller-badge-upcoming">
                    Próximamente · Tema 3
                  </span>
                  <span className="taller-tag-cut">
                    Parcial 2
                  </span>
                </div>

                <h3 className="taller-card-title">
                  Taller 3: Comunicación con Sockets & Java RMI
                </h3>
                <p className="taller-card-desc">
                  Implementación práctica de paso de mensajes mediante sockets TCP/UDP e invocación de métodos remotos (RMI) con paso de objetos y stubs.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-ink-muted-48)' }}>
                <Lock size={14} />
                <span>Disponible en Corte 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
