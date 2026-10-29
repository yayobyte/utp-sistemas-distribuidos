import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { clases, temaTone } from '../data/clases';
import './ClasePage.styles.css';

export const ClasesIndexPage: React.FC = () => {
  const temas = ['Introducción', 'Arquitecturas', 'Comunicación'] as const;

  return (
    <div className="clase-page container-tight">
      <header className="clase-header">
        <p className="clase-kicker">Resúmenes · clases 1–15</p>
        <h1 className="type-display-lg">Clases</h1>
        <p className="clase-idea">
          Un resumen por clase, sacado de la transcripción, con diagramas y un repaso rápido al final. Para ver cómo encajan todos los temas, usa la{' '}
          <Link to="/guia">guía de estudio</Link>.
        </p>
      </header>

      {temas.map((tema) => (
        <section key={tema} className={`clase-section ${temaTone[tema]}`}>
          <h2>Tema: {tema}</h2>
          <ul className="clases-list">
            {clases.filter((c) => c.tema === tema).map((c) => (
              <li key={c.number}>
                <Link to={`/clases/${c.number}`} className="clases-row">
                  <span className="clases-num">{String(c.number).padStart(2, '0')}</span>
                  <span className="clases-body">
                    <span className="clases-title">{c.title}</span>
                    <span className="clases-meta">{c.date} · {c.keyTerms.slice(0, 4).join(' · ')}</span>
                  </span>
                  <ArrowRight size={16} className="clases-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
