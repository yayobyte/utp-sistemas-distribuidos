import React from 'react';
import {
  Cpu,
  Layers,
  Activity,
  Sliders,
  BookmarkCheck,
  ExternalLink,
} from 'lucide-react';
import type { Taller1HeaderProps } from './Taller1Header.d';
import './Taller1Header.styles.css';

export const Taller1Header: React.FC<Taller1HeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <section className="tile-section tile-light taller1-header-section" style={{ padding: '36px 24px 20px' }}>
      <div className="container-wide">
        <div className="taller1-header-wrapper">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="taller1-topic-badge">
                Tema 1 · Sistemas Distribuidos
              </span>
            </div>
            <h1 className="type-display-md taller1-main-title">
              Investigación de Hardware: Clúster vs. Grid
            </h1>
            <p className="taller1-objective-text">
              <strong>Objetivo de Aprendizaje:</strong> Reconocer los conceptos CLUSTER y GRID y los componentes de Hardware necesarios en su instalación, para identificar los elementos clave en la construcción de la infraestructura de sistemas distribuidos.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="utility-card taller1-score-card">
            <div className="taller1-score-label">
              Puntaje Asignado
            </div>
            <div className="taller1-score-value">
              50 Puntos
            </div>
            <a
              href="https://classroom.google.com/c/ODcyMDQwNDA5MjIw/a/ODcyMDQwNDA5MjMy/details"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pearl-capsule"
              style={{ fontSize: '11px', padding: '4px 10px', marginTop: '6px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
            >
              <span>Google Classroom</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="taller1-tabs-bar">
          <button
            onClick={() => onTabChange('investigacion')}
            className={activeTab === 'investigacion' ? 'btn-primary' : 'btn-pearl-capsule'}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <Cpu size={14} />
            1. Hardware & Arquitectura
          </button>
          <button
            onClick={() => onTabChange('matriz')}
            className={activeTab === 'matriz' ? 'btn-primary' : 'btn-pearl-capsule'}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <Layers size={14} />
            2. Matriz Comparativa
          </button>
          <button
            onClick={() => onTabChange('casos')}
            className={activeTab === 'casos' ? 'btn-primary' : 'btn-pearl-capsule'}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <Activity size={14} />
            3. Casos Reales
          </button>
          <button
            onClick={() => onTabChange('diferencias')}
            className={activeTab === 'diferencias' ? 'btn-primary' : 'btn-pearl-capsule'}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <Sliders size={14} />
            4. Diferencias Clave
          </button>
          <button
            onClick={() => onTabChange('conclusiones')}
            className={activeTab === 'conclusiones' ? 'btn-primary' : 'btn-pearl-capsule'}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <BookmarkCheck size={14} />
            5. Conclusiones
          </button>
        </div>
      </div>
    </section>
  );
};
