import React from 'react';
import { Link } from 'react-router-dom';
import { SubNav } from '../components/SubNav';
import {
  Terminal,
  Cpu,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import './HomePage.styles.css';

export const HomePage: React.FC = () => {
  return (
    <div>
      <SubNav
        title="Sistemas Distribuidos"
        subtitle="Ingeniería de Sistemas y Computación · UTP"
        badge="IS893"
        actions={
          <Link to="/talleres/1" className="btn-primary" style={{ fontSize: '13px', padding: '6px 16px' }}>
            Ir a Taller 1
            <ArrowRight size={14} />
          </Link>
        }
      />

      {/* Hero Section */}
      <section className="tile-section tile-light home-hero-section">
        <div className="container-tight home-hero-container">
          <h1 className="type-hero-display home-hero-title">
            Sistemas Distribuidos
          </h1>
          <p className="type-lead home-hero-lead">
            Fundamentación teórica y práctica para interpretar, planear, diseñar y administrar arquitecturas distribuidas modernas: Clúster, Grid, Cloud y Edge Computing.
          </p>

          <div className="home-hero-actions">
            <Link to="/talleres/1" className="btn-primary">
              <Terminal size={16} />
              Explorar Taller 1 (Clúster vs Grid)
            </Link>
            <Link to="/talleres" className="btn-secondary-pill">
              Ver Todos los Talleres
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dark Tile: TALLER 1 */}
      <section className="tile-section tile-dark home-featured-section">
        <div className="container-wide">
          <div className="home-featured-grid">
            <div>
              <span className="home-badge-pill">
                Actividad Activa · 50 Puntos
              </span>
              <h2 className="type-display-lg home-featured-heading">
                Taller 1: Conceptos y Hardware de Clúster & Grid
              </h2>
              <p className="home-featured-description">
                Análisis exhaustivo de componentes de hardware: Nodos de cómputo, redes de ultra-baja latencia (InfiniBand/RDMA), almacenamiento paralelo (Lustre), pasarelas Grid (Gateways, SRM) y autenticación PKI/X.509.
              </p>

              <div className="home-featured-checklist">
                <div className="home-checklist-item">
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Diferencias clave de Hardware</span>
                </div>
                <div className="home-checklist-item">
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Matriz interactiva de 10 criterios</span>
                </div>
                <div className="home-checklist-item">
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Documento de entrega listo</span>
                </div>
              </div>

              <Link to="/talleres/1" className="btn-primary" style={{ backgroundColor: 'var(--color-primary-on-dark)', color: '#000000', fontWeight: 600 }}>
                Abrir Taller 1 Interactivo
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Visual Hardware Preview Card */}
            <div className="utility-card-dark home-preview-card">
              <div className="home-preview-header">
                <span className="home-preview-title">
                  Comparación de Arquitectura
                </span>
                <span className="home-preview-tag">
                  IS893 · TEMA 1
                </span>
              </div>

              <div className="home-preview-list">
                <div className="home-preview-box cluster">
                  <div className="home-preview-box-header">
                    <Cpu size={16} color="#2997ff" />
                    <strong className="home-preview-box-title">Clúster HPC</strong>
                  </div>
                  <p className="home-preview-box-desc">
                    Homogéneo, fuertemente acoplado, latencia &lt; 1 µs vía InfiniBand, único dominio administrativo (e.g., Slurm, Lustre SAN).
                  </p>
                </div>

                <div className="home-preview-box grid">
                  <div className="home-preview-box-header">
                    <Globe size={16} color="#34c759" />
                    <strong className="home-preview-box-title">Grid Computing</strong>
                  </div>
                  <p className="home-preview-box-desc">
                    Heterogéneo, débilmente acoplado, red WAN/Internet, múltiples dominios federados con pasarelas Grid y certificados X.509 (e.g., WLCG CERN).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Structure & Evaluation Tiles (Parchment) */}
      <section className="tile-section tile-parchment home-evaluation-section">
        <div className="container-wide">
          <div className="home-evaluation-header">
            <h2 className="type-display-lg home-evaluation-title">
              Estructura de Evaluación (100%)
            </h2>
            <p className="type-body home-evaluation-lead">
              Distribución de parciales, talleres y exposiciones según el programa académico oficial.
            </p>
          </div>

          <div className="home-evaluation-grid">
            {/* Parcial 1 */}
            <div className="utility-card">
              <div className="home-eval-card-header">
                <span className="home-eval-tag">CORTE 1</span>
                <span className="home-eval-percentage">20%</span>
              </div>
              <h3 className="home-eval-card-title">Parcial 1</h3>
              <ul className="home-eval-list">
                <li>Introducción a los Sistemas Distribuidos</li>
                <li>Arquitecturas de Sistemas Distribuidos</li>
              </ul>
            </div>

            {/* Parcial 2 */}
            <div className="utility-card">
              <div className="home-eval-card-header">
                <span className="home-eval-tag">CORTE 2</span>
                <span className="home-eval-percentage">20%</span>
              </div>
              <h3 className="home-eval-card-title">Parcial 2</h3>
              <ul className="home-eval-list">
                <li>Comunicación en Sistemas Distribuidos</li>
                <li>Sistemas de Archivos Distribuidos y Paralelos</li>
                <li>Servicio de Nombres y Directorios</li>
              </ul>
            </div>

            {/* Parcial 3 */}
            <div className="utility-card">
              <div className="home-eval-card-header">
                <span className="home-eval-tag">CORTE 3</span>
                <span className="home-eval-percentage">20%</span>
              </div>
              <h3 className="home-eval-card-title">Parcial 3</h3>
              <ul className="home-eval-list">
                <li>Gestión de Procesos</li>
                <li>Sincronización, Concurrencia y Transacciones</li>
                <li>Fiabilidad y Seguridad</li>
              </ul>
            </div>

            {/* Talleres & Exposiciones */}
            <div className="utility-card" style={{ border: '1.5px solid var(--color-primary)' }}>
              <div className="home-eval-card-header">
                <span className="home-eval-tag">CONTINUO</span>
                <span className="home-eval-percentage highlight">40%</span>
              </div>
              <h3 className="home-eval-card-title">Talleres y Exposiciones</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-ink-muted-80)', lineHeight: 1.5 }}>
                • <strong>20% Actividades y Talleres</strong>: Aplicabilidad e investigación por capítulo.<br />
                • <strong>20% Exposición</strong>: 50% Presentación, 30% Quiz, 20% Asistencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professor and Course Meta Section */}
      <section className="tile-section tile-light home-teacher-section">
        <div className="container-tight">
          <div className="utility-card home-teacher-card">
            <div>
              <h3 className="home-teacher-name">
                Docente: César Augusto Díaz Arriaga
              </h3>
              <p className="home-teacher-desc">
                Programa de Ingeniería de Sistemas y Computación · UTP · Contacto: <code>black@utp.edu.co</code>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/talleres/1" className="btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>
                Comenzar Taller 1
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
