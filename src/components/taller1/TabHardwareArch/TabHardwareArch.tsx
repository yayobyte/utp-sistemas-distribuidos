import React, { useState } from 'react';
import {
  Cpu,
  Server,
  Zap,
  HardDrive,
  Globe,
  Layers,
  Shield,
} from 'lucide-react';
import { ClusterGrid3D } from '../../ClusterGrid3D';
import {
  clusterHardwareNodes,
  gridHardwareNodes,
} from '../../../data/taller1.data';
import type { ArchType } from './TabHardwareArch.d';
import './TabHardwareArch.styles.css';

const iconMap = {
  cpu: Cpu,
  server: Server,
  zap: Zap,
  'hard-drive': HardDrive,
  globe: Globe,
  layers: Layers,
  shield: Shield,
};

export const TabHardwareArch: React.FC = () => {
  const [selectedArch, setSelectedArch] = useState<ArchType>('cluster');
  const [selectedComponentId, setSelectedComponentId] = useState<string>('compute');

  const nodes = selectedArch === 'cluster' ? clusterHardwareNodes : gridHardwareNodes;
  const activeNode = nodes.find((n) => n.id === selectedComponentId) || nodes[0];
  const ActiveIcon = iconMap[activeNode.iconName] || Cpu;

  return (
    <section className="tile-section tile-parchment taller1-content-section">
      <div className="container-wide">
        {/* Architecture Selector (Clúster vs Grid) */}
        <div className="taller1-segmented-controls">
          <div className="taller1-segmented-bar">
            <button
              onClick={() => {
                setSelectedArch('cluster');
                setSelectedComponentId('compute');
              }}
              className={`taller1-segment-btn ${selectedArch === 'cluster' ? 'active' : 'inactive'}`}
            >
              Infraestructura de CLÚSTER
            </button>
            <button
              onClick={() => {
                setSelectedArch('grid');
                setSelectedComponentId('gateways');
              }}
              className={`taller1-segment-btn ${selectedArch === 'grid' ? 'active' : 'inactive'}`}
            >
              Infraestructura de GRID
            </button>
          </div>
        </div>

        {/* Interactive 3D Canvas Visualizer */}
        <ClusterGrid3D mode={selectedArch} />

        {/* Master Details Split View */}
        <div className="taller1-arch-grid">
          {/* Visual Architectural Map */}
          <div className="utility-card-dark taller1-interactive-map">
            <div className="taller1-map-header">
              <h3 className="taller1-map-title">
                {selectedArch === 'cluster' ? 'Componentes del Clúster' : 'Componentes del Grid'}
              </h3>
              <span
                className="taller1-map-badge"
                style={{
                  color: selectedArch === 'cluster' ? 'var(--color-primary-on-dark)' : 'var(--color-success)',
                }}
              >
                {selectedArch === 'cluster' ? 'Fuertemente Acoplado · < 1 µs' : 'Débilmente Acoplado · WAN / Internet'}
              </span>
            </div>

            {/* Interactive Nodes Column */}
            <div className="taller1-nodes-column">
              {nodes.map((node) => {
                const isSelected = selectedComponentId === node.id;
                const NodeIcon = iconMap[node.iconName] || Server;
                const activeClass = selectedArch === 'cluster' ? 'selected-cluster' : 'selected-grid';

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedComponentId(node.id)}
                    className={`taller1-node-item ${isSelected ? activeClass : 'unselected'}`}
                  >
                    <div className="taller1-node-flex">
                      <NodeIcon size={18} color={node.accentColor} />
                      <div>
                        <strong className="taller1-node-name">{node.name}</strong>
                        <div className="taller1-node-subtitle">{node.shortDesc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hardware Inspector Details Panel */}
          <div className="utility-card taller1-detail-card">
            <div>
              <div className="taller1-detail-header">
                <ActiveIcon size={20} color={activeNode.accentColor} />
                <h4 className="taller1-detail-title">{activeNode.detailedTitle}</h4>
              </div>
              <p className="taller1-detail-intro">{activeNode.detailedIntro}</p>
              <ul className="taller1-detail-list">
                {activeNode.detailedPoints.map((pt, pIdx) => (
                  <li key={pIdx}>
                    <strong>{pt.label} </strong>
                    {pt.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
