import React from 'react';
import { Cpu, Globe } from 'lucide-react';
import type { AppleContinuityMockupProps } from './AppleContinuityMockup.d';
import './AppleContinuityMockup.styles.css';

export const AppleContinuityMockup: React.FC<AppleContinuityMockupProps> = ({ currentCase }) => {
  return (
    <div className="apple-mockup-wrapper">
      {/* MacBook Display Frame */}
      <div className="apple-macbook-frame">
        {/* Top Menu Bar */}
        <div className="apple-mac-menubar">
          <div className="apple-mac-menubar-left">
            <span className="apple-logo-glyph"></span>
            <span className="apple-menubar-title">Duplicación del Clúster</span>
            <span className="apple-menubar-item hide-mobile">Edición</span>
            <span className="apple-menubar-item hide-mobile">Visualización</span>
            <span className="apple-menubar-item hide-mobile">Ventana</span>
            <span className="apple-menubar-item hide-mobile">Ayuda</span>
          </div>
          <div className="apple-mac-menubar-right">
            <span className="apple-menubar-metric">{currentCase.impactMetric}</span>
            <span className="apple-status-dot green" />
          </div>
        </div>

        {/* MacBook Screen Content (Wallpaper + Terminal Window) */}
        <div className={`apple-mac-screen bg-${currentCase.id}`}>
          {/* Live Cluster Dashboard Inset */}
          <div className="apple-mac-window">
            <div className="apple-window-header">
              <div className="apple-window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="apple-window-title">{currentCase.title} — Telemetry Console</span>
            </div>
            <div className="apple-window-body">
              <div className="apple-terminal-header">
                <div className="apple-terminal-pill">{currentCase.tag}</div>
                <span className="apple-terminal-sub">{currentCase.subtitle}</span>
              </div>

              <div className="apple-terminal-grid">
                {currentCase.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="apple-terminal-stat">
                    <span className="stat-label">{spec.label}</span>
                    <strong className="stat-value">{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom macOS Dock */}
          <div className="apple-mac-dock">
            <span className="dock-icon c-blue">🖥️</span>
            <span className="dock-icon c-purple">⚡</span>
            <span className="dock-icon c-green">🌐</span>
            <span className="dock-icon c-orange">📊</span>
            <span className="dock-icon c-teal">🔒</span>
            <span className="dock-icon c-dark">⚙️</span>
          </div>
        </div>

        {/* Floating iPhone Screen Mirroring Window */}
        <div className="apple-iphone-mirror">
          <div className="apple-iphone-notch" />
          <div className="apple-iphone-statusbar">
            <span>9:41</span>
            <div className="iphone-icons">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
          <div className="apple-iphone-body">
            <div className="iphone-widget">
              <div className="widget-icon">
                {currentCase.category === 'cluster' ? <Cpu size={16} /> : <Globe size={16} />}
              </div>
              <div className="widget-info">
                <span className="widget-label">LIVE STATUS</span>
                <strong className="widget-val">{currentCase.impactMetric}</strong>
              </div>
            </div>
            <div className="iphone-metric-bar">
              <div className="iphone-metric-track">
                <div
                  className="iphone-metric-fill"
                  style={{
                    width: currentCase.category === 'cluster' ? '94%' : '88%',
                    backgroundColor: currentCase.category === 'cluster' ? '#2997ff' : '#34c759',
                  }}
                />
              </div>
              <span className="iphone-caption">
                {currentCase.category === 'cluster' ? 'Latencia < 1 µs (RDMA)' : 'Nodos WAN Conectados'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
