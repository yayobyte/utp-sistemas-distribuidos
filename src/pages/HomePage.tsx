import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Lock } from 'lucide-react';
import {
  getTallerPath,
  isTallerAvailable,
  statusLabels,
  talleresRegistry,
} from '../data/talleres.registry';
import { courseInfo, gradingData } from '../data/curso.data';
import type { TallerEntry } from '../data/talleres.registry.d';
import './HomePage.styles.css';

const TallerRowContent: React.FC<{ taller: TallerEntry }> = ({ taller }) => (
  <>
    <span className="home-taller-number">{taller.number}</span>
    <span className="home-taller-body">
      <span className="home-taller-eyebrow">
        {taller.topic} · {taller.corte}
      </span>
      <span className="home-taller-title">{taller.title}</span>
      <span className="home-taller-summary">{taller.summary}</span>
    </span>
    <span className="home-taller-aside">
      <span className={`home-taller-status status-${taller.status}`}>{statusLabels[taller.status]}</span>
      {taller.points && <span className="home-taller-points">{taller.points} pts</span>}
    </span>
    {isTallerAvailable(taller) ? (
      <ArrowRight size={18} className="home-taller-arrow" />
    ) : (
      <Lock size={16} className="home-taller-arrow" />
    )}
  </>
);

export const HomePage: React.FC = () => {
  return (
    <div className="home-page container-tight">
      <header className="home-intro">
        <p className="home-eyebrow">
          {courseInfo.code} · {courseInfo.institution}
        </p>
        <h1 className="type-display-lg">{courseInfo.name}</h1>
        <p className="home-lead">
          Portafolio de talleres y actividades de la asignatura. Cada taller incluye la investigación completa y el material entregado.
        </p>
        <dl className="home-facts">
          <div>
            <dt>Docente</dt>
            <dd>{courseInfo.professor}</dd>
          </div>
          <div>
            <dt>Programa</dt>
            <dd>{courseInfo.program}</dd>
          </div>
          <div>
            <dt>Aula</dt>
            <dd>
              <a href={courseInfo.classroomUrl} target="_blank" rel="noopener noreferrer">
                Google Classroom <ExternalLink size={12} />
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <section className="home-section" aria-labelledby="home-talleres-title">
        <h2 id="home-talleres-title" className="home-section-title">Talleres</h2>
        <ul className="home-taller-list">
          {talleresRegistry.map((taller) => (
            <li key={taller.id}>
              {isTallerAvailable(taller) ? (
                <Link to={getTallerPath(taller)} className="home-taller-row">
                  <TallerRowContent taller={taller} />
                </Link>
              ) : (
                <div className="home-taller-row is-disabled" aria-disabled="true">
                  <TallerRowContent taller={taller} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="home-grading-title">
        <div className="home-section-heading">
          <h2 id="home-grading-title" className="home-section-title">Evaluación</h2>
          <Link to="/curso" className="home-section-link">
            Información del curso <ArrowRight size={14} />
          </Link>
        </div>
        <ul className="home-grading-row">
          {gradingData.map((item) => (
            <li key={item.id} className={item.id === 'talleres' ? 'is-highlight' : ''}>
              <span className="home-grading-percentage">{item.percentage}%</span>
              <span className="home-grading-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
