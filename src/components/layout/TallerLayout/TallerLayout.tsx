import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import {
  getAdjacentTalleres,
  getTallerPath,
  statusLabels,
} from '../../../data/talleres.registry';
import type { TallerLayoutProps } from './TallerLayout.d';
import './TallerLayout.styles.css';

export const TallerLayout: React.FC<TallerLayoutProps> = ({ taller, children }) => {
  const { previous, next } = getAdjacentTalleres(taller.id);

  return (
    <div className="taller-layout">
      <header className="taller-layout-header">
        <div className="container-wide">
          <nav className="taller-layout-breadcrumb" aria-label="Ruta">
            <Link to="/">Talleres</Link>
            <ChevronRight size={12} />
            <span>Taller {taller.number}</span>
          </nav>

          <div className="taller-layout-heading">
            <div>
              <p className="taller-layout-eyebrow">
                Taller {taller.number} · {taller.topic} · {taller.corte}
              </p>
              <h1 className="type-display-md taller-layout-title">{taller.title}</h1>
              <p className="taller-layout-objective">
                <strong>Objetivo de aprendizaje:</strong> {taller.objective}
              </p>
            </div>

            <div className="taller-layout-meta">
              <span className={`taller-layout-status status-${taller.status}`}>
                {statusLabels[taller.status]}
              </span>
              {taller.points && <span className="taller-layout-points">{taller.points} puntos</span>}
              {taller.classroomUrl && (
                <a
                  href={taller.classroomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pearl-capsule"
                >
                  <span>Google Classroom</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="taller-layout-tabs" aria-label={`Secciones del Taller ${taller.number}`}>
        <div className="container-wide taller-layout-tabs-inner">
          {taller.sections.map((section, index) => (
            <NavLink
              key={section.slug}
              to={getTallerPath(taller, section.slug)}
              className={({ isActive }) => `taller-layout-tab ${isActive ? 'is-active' : ''}`}
            >
              <span className="taller-layout-tab-index">{index + 1}</span>
              {section.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="taller-layout-body">{children}</div>

      {(previous || next) && (
        <nav className="taller-layout-pager container-wide" aria-label="Otros talleres">
          {previous ? (
            <Link to={getTallerPath(previous)} className="taller-layout-pager-link">
              <span className="taller-layout-pager-label">
                <ArrowLeft size={13} /> Anterior
              </span>
              <span className="taller-layout-pager-title">
                Taller {previous.number}: {previous.shortTitle}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={getTallerPath(next)} className="taller-layout-pager-link is-next">
              <span className="taller-layout-pager-label">
                Siguiente <ArrowRight size={13} />
              </span>
              <span className="taller-layout-pager-title">
                Taller {next.number}: {next.shortTitle}
              </span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};
