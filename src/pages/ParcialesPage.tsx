import React from 'react';
import { SubNav } from '../components/SubNav';
import { Clock } from 'lucide-react';
import './ParcialesPage.styles.css';

export const ParcialesPage: React.FC = () => {
  return (
    <div>
      <SubNav
        title="Parciales del Curso"
        subtitle="60% de la calificación definitiva (20% c/u)"
        badge="IS893"
      />

      <section className="tile-section tile-light parciales-section">
        <div className="container-wide">
          <div className="parciales-header">
            <h1 className="type-display-lg parciales-title">
              Guía y Temario de Parciales
            </h1>
            <p className="type-body parciales-lead">
              Estructura temática y objetivos de evaluación de cada uno de los 3 exámenes parciales.
            </p>
          </div>

          <div className="parciales-grid">
            {/* Parcial 1 */}
            <div className="utility-card parcial-card corte1">
              <div className="parcial-card-header">
                <span className="parcial-tag" style={{ color: 'var(--color-primary)' }}>
                  Corte 1 · 20%
                </span>
                <span className="parcial-status">
                  <Clock size={12} />
                  En curso
                </span>
              </div>

              <h3 className="parcial-name">
                Parcial 1
              </h3>

              <div className="parcial-topic-list">
                <div>
                  <strong style={{ color: 'var(--color-ink)' }}>1. Introducción a los Sistemas Distribuidos:</strong>
                  <ul className="parcial-sublist">
                    <li>Definición, ventajas y desventajas frente a sistemas centralizados.</li>
                    <li>Falacias de la computación distribuida (Deutsch).</li>
                    <li>Modelos: Cluster, Grid, Cloud (IaaS, PaaS, SaaS), Edge/Fog, UbiComp/IoT.</li>
                    <li>Objetivos y transparencias (acceso, ubicación, replicación, fallos).</li>
                  </ul>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>2. Arquitecturas de Sistemas Distribuidos:</strong>
                  <ul className="parcial-sublist">
                    <li>Cliente-Servidor (multicapa), P2P (estructurado/DHT vs no estructurado).</li>
                    <li>Arquitecturas basadas en eventos y capas de middleware.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Parcial 2 */}
            <div className="utility-card parcial-card corte2">
              <div className="parcial-card-header">
                <span className="parcial-tag" style={{ color: 'var(--color-accent-cyan)' }}>
                  Corte 2 · 20%
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-ink-muted-48)' }}>
                  Próximo
                </span>
              </div>

              <h3 className="parcial-name">
                Parcial 2
              </h3>

              <div className="parcial-topic-list">
                <div>
                  <strong style={{ color: 'var(--color-ink)' }}>1. Comunicación en Sistemas Distribuidos:</strong>
                  <ul className="parcial-sublist">
                    <li>Sockets TCP/UDP, paso de mensajes, RPC y Java RMI.</li>
                    <li>Message-Oriented Middleware (MOM) y colas de mensajes.</li>
                  </ul>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>2. Sistemas de Archivos Distribuidos y Paralelos:</strong>
                  <ul className="parcial-sublist">
                    <li>NFS, HDFS, Lustre, semánticas de compartición y caching.</li>
                  </ul>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>3. Servicio de Nombres y Directorios:</strong>
                  <ul className="parcial-sublist">
                    <li>Resolución de nombres, DNS, LDAP y localización de entidades.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Parcial 3 */}
            <div className="utility-card parcial-card corte3">
              <div className="parcial-card-header">
                <span className="parcial-tag" style={{ color: 'var(--color-accent-purple)' }}>
                  Corte 3 · 20%
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-ink-muted-48)' }}>
                  Corte Final
                </span>
              </div>

              <h3 className="parcial-name">
                Parcial 3
              </h3>

              <div className="parcial-topic-list">
                <div>
                  <strong style={{ color: 'var(--color-ink)' }}>1. Gestión de Procesos:</strong>
                  <ul className="parcial-sublist">
                    <li>Hilos, virtualización, agentes y migración de código.</li>
                  </ul>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>2. Sincronización y Transacciones:</strong>
                  <ul className="parcial-sublist">
                    <li>Relojes de Lamport y vectoriales, exclusión mutua distribuida, algoritmos de elección.</li>
                  </ul>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>3. Fiabilidad y Seguridad:</strong>
                  <ul className="parcial-sublist">
                    <li>Tolerancia a fallos, consenso distribuido (Paxos/Raft), replicación y criptografía distribuida.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
