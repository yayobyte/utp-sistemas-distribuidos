import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Server, BookOpen, Layers, Award, Terminal } from 'lucide-react';
import './GlobalNav.styles.css';

export const GlobalNav: React.FC = () => {
  return (
    <header className="global-nav-header">
      <div className="global-nav-container">
        {/* Brand / Logo */}
        <Link to="/" className="global-nav-brand">
          <div className="global-nav-brand-icon">
            <Server size={14} />
          </div>
          <span>UTP · Sistemas Distribuidos</span>
          <span className="global-nav-badge">IS893</span>
        </Link>

        {/* Navigation links */}
        <nav className="global-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `global-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <BookOpen size={13} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/talleres"
            className={({ isActive }) =>
              `global-nav-link global-nav-link-special ${isActive ? 'active' : ''}`
            }
          >
            <Terminal size={13} />
            <span>Talleres (20%)</span>
          </NavLink>

          <NavLink
            to="/parciales"
            className={({ isActive }) =>
              `global-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Layers size={13} />
            <span>Parciales (60%)</span>
          </NavLink>

          <NavLink
            to="/exposiciones"
            className={({ isActive }) =>
              `global-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Award size={13} />
            <span>Exposiciones (20%)</span>
          </NavLink>
        </nav>

        {/* Quick Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/talleres/1" className="global-nav-action">
            Taller 1: Clúster vs Grid
          </Link>
        </div>
      </div>
    </header>
  );
};
