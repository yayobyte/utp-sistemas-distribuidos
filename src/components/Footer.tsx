import React from 'react';
import { courseInfo } from '../data/curso.data';
import './Footer.styles.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <span>
          {courseInfo.name} ({courseInfo.code}) · {courseInfo.program} · {courseInfo.institution}
        </span>
        <span>
          © {new Date().getFullYear()} Cristian Gutierrez · Docente: {courseInfo.professor}
        </span>
      </div>
    </footer>
  );
};
