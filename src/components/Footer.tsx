import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.styles.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        {/* Footnotes / Course disclaimer */}
        <div className="footer-disclaimer">
          <p>
            1. Material de estudio y plataforma de desarrollo para la asignatura <strong>Sistemas Distribuidos (IS893)</strong>, Facultad de Ingenierías, Programa de Ingeniería de Sistemas y Computación, <strong>Universidad Tecnológica de Pereira (UTP)</strong>.
          </p>
          <p className="footer-disclaimer-note">
            2. Docente titular: <strong>César Augusto Díaz Arriaga</strong> (black@utp.edu.co).
          </p>
        </div>

        {/* Directory columns */}
        <div className="footer-grid">
          <div>
            <h4 className="footer-column-title">
              Evaluación & Talleres
            </h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/talleres/1" className="footer-link">
                  Taller 1: Clúster vs Grid (50 pts)
                </Link>
              </li>
              <li>
                <Link to="/talleres" className="footer-link">
                  Catálogo de Talleres (20%)
                </Link>
              </li>
              <li>
                <Link to="/parciales" className="footer-link">
                  Guía de Parciales 1, 2 y 3 (60%)
                </Link>
              </li>
              <li>
                <Link to="/exposiciones" className="footer-link">
                  Exposiciones Temáticas (20%)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">
              Temario del Curso
            </h4>
            <ul className="footer-link-list">
              <li><span>Introducción y Arquitecturas</span></li>
              <li><span>Comunicación y Protocolos (RPC/RMI)</span></li>
              <li><span>Sistemas de Archivos Distribuidos</span></li>
              <li><span>Sincronización y Tolerancia a Fallos</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">
              Bibliografía Principal
            </h4>
            <ul className="footer-link-list">
              <li><span>Tanenbaum & Van Steen</span></li>
              <li><span>Coulouris, Dollimore, Kindberg</span></li>
              <li><span>López Fuentes (Sistemas Distribuidos)</span></li>
              <li><span>Edwin D. Reilly (Java Distributed)</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Cristian Gutierrez · UTP · Ingeniería de Sistemas y Computación. Todos los derechos reservados.
          </div>
          <div className="footer-bottom-meta">
            <span>Pereira, Colombia</span>
            <span>·</span>
            <span>Edición Académica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
