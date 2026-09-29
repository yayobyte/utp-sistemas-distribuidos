import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  bibliographyData,
  courseInfo,
  exposicionCriteria,
  exposicionesDescription,
  gradingData,
  parcialesData,
} from '../data/curso.data';
import './CursoPage.styles.css';

export const CursoPage: React.FC = () => {
  return (
    <div className="curso-page container-tight">
      <header className="curso-header">
        <p className="curso-eyebrow">
          {courseInfo.code} · {courseInfo.program}
        </p>
        <h1 className="type-display-lg">Información del curso</h1>
        <p className="curso-lead">{courseInfo.objective}</p>
      </header>

      <section id="evaluacion" className="curso-section">
        <h2 className="curso-section-title">Evaluación</h2>
        <div className="curso-table-wrapper">
          <table className="curso-table">
            <thead>
              <tr>
                <th scope="col">Componente</th>
                <th scope="col">%</th>
                <th scope="col">Contenido</th>
              </tr>
            </thead>
            <tbody>
              {gradingData.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.label}</th>
                  <td className="curso-table-percentage">{item.percentage}%</td>
                  <td>{item.content.join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="parciales" className="curso-section">
        <h2 className="curso-section-title">Parciales</h2>
        <div className="curso-parciales-grid">
          {parcialesData.map((parcial) => (
            <article key={parcial.id} className="curso-card">
              <div className="curso-card-header">
                <h3>{parcial.name}</h3>
                <span>{parcial.percentage}%</span>
              </div>
              {parcial.topics.map((topic) => (
                <div key={topic.title} className="curso-topic">
                  <h4>{topic.title}</h4>
                  <ul>
                    {topic.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section id="exposiciones" className="curso-section">
        <h2 className="curso-section-title">Exposiciones</h2>
        <p className="curso-text">{exposicionesDescription}</p>
        <div className="curso-criteria-grid">
          {exposicionCriteria.map((criterion) => (
            <div key={criterion.label} className="curso-card">
              <span className="curso-criterion-percentage">{criterion.percentage}%</span>
              <h3 className="curso-criterion-label">{criterion.label}</h3>
              <p className="curso-criterion-desc">{criterion.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="bibliografia" className="curso-section">
        <h2 className="curso-section-title">Bibliografía</h2>
        <ol className="curso-bibliography">
          {bibliographyData.map((item) => (
            <li key={item.title}>
              <strong>{item.authors}</strong> — <em>{item.title}</em>
            </li>
          ))}
        </ol>
      </section>

      <section id="contacto" className="curso-section">
        <h2 className="curso-section-title">Contacto</h2>
        <dl className="curso-contact">
          <div>
            <dt>Docente</dt>
            <dd>{courseInfo.professor}</dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd>
              <a href={`mailto:${courseInfo.professorEmail}`}>{courseInfo.professorEmail}</a>
            </dd>
          </div>
          <div>
            <dt>Aula virtual</dt>
            <dd>
              <a href={courseInfo.classroomUrl} target="_blank" rel="noopener noreferrer">
                Google Classroom <ExternalLink size={12} />
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
};
