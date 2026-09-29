import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, ExternalLink, LayoutGrid, Server, X } from 'lucide-react';
import {
  getTallerPath,
  isTallerAvailable,
  statusLabels,
  talleresRegistry,
} from '../../../data/talleres.registry';
import { courseInfo } from '../../../data/curso.data';
import type { SidebarProps } from './Sidebar.d';
import './Sidebar.styles.css';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `sidebar-link ${isActive ? 'is-active' : ''}`;

export const Sidebar: React.FC<SidebarProps> = ({ id, isOpen, onClose }) => {
  const { pathname } = useLocation();

  return (
    <aside id={id} className={`sidebar-root ${isOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
      <div className="sidebar-brand-row">
        <Link to="/" className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <Server size={14} />
          </span>
          <span className="sidebar-brand-text">
            <strong>{courseInfo.name}</strong>
            <span>{courseInfo.code} · UTP</span>
          </span>
        </Link>
        <button type="button" className="sidebar-close" onClick={onClose} aria-label="Cerrar menú">
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-group">
          <NavLink to="/" end className={navClass}>
            <LayoutGrid size={15} />
            <span>Resumen</span>
          </NavLink>
          <NavLink to="/curso" className={navClass}>
            <BookOpen size={15} />
            <span>Información del curso</span>
          </NavLink>
        </div>

        <div className="sidebar-group">
          <h2 className="sidebar-group-title">Talleres</h2>
          {talleresRegistry.map((taller) =>
            isTallerAvailable(taller) ? (
              <Link
                key={taller.id}
                to={getTallerPath(taller)}
                className={navClass({ isActive: pathname.startsWith(`/talleres/${taller.id}/`) })}
              >
                <span className="sidebar-taller-number">{taller.number}</span>
                <span className="sidebar-taller-text">
                  <span className="sidebar-taller-title">{taller.shortTitle}</span>
                  <span className="sidebar-taller-meta">
                    <span className={`sidebar-status-dot status-${taller.status}`} />
                    {statusLabels[taller.status]}
                    {taller.points ? ` · ${taller.points} pts` : ''}
                  </span>
                </span>
              </Link>
            ) : (
              <div key={taller.id} className="sidebar-link is-disabled" aria-disabled="true">
                <span className="sidebar-taller-number">{taller.number}</span>
                <span className="sidebar-taller-text">
                  <span className="sidebar-taller-title">{taller.shortTitle}</span>
                  <span className="sidebar-taller-meta">{statusLabels[taller.status]}</span>
                </span>
              </div>
            )
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <a href={courseInfo.classroomUrl} target="_blank" rel="noopener noreferrer" className="sidebar-external">
          <span>Google Classroom</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </aside>
  );
};
