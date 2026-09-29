import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ModelSectionProps } from './ModelSection.d';
import './ModelSection.styles.css';

const hostLabel = (url: string) => new URL(url).hostname.replace(/^www\./, '');

export const ModelSection: React.FC<ModelSectionProps> = ({ modelo, index }) => {
  return (
    <section id={modelo.id} className="model-section">
      <header className="model-section-header">
        <span className="model-section-index">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h2 className="model-section-title">{modelo.name}</h2>
          <p className="model-section-focus">{modelo.matrix.enfoque}</p>
        </div>
      </header>

      <div className="model-section-grid">
        {modelo.examples.map((example, exampleIndex) => (
          <article key={example.url} className="model-example-card">
            <span className="model-example-label">Ejemplo {exampleIndex + 1}</span>
            <h3 className="model-example-name">{example.name}</h3>
            <p className="model-example-desc">{example.description}</p>
            <a
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
              className="model-example-link"
            >
              <span>{hostLabel(example.url)}</span>
              <ExternalLink size={13} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
