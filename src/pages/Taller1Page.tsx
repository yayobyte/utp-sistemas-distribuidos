import React, { useState } from 'react';
import {
  Server,
  Globe,
  Cpu,
  HardDrive,
  Shield,
  Layers,
  Activity,
  Zap,
  ExternalLink,
} from 'lucide-react';
import './Taller1Page.styles.css';

export const Taller1Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'investigacion' | 'matriz' | 'casos'>('investigacion');
  const [selectedArch, setSelectedArch] = useState<'cluster' | 'grid'>('cluster');
  const [selectedComponent, setSelectedComponent] = useState<string>('compute');

  return (
    <div>
      {/* Workshop Header Information */}
      <section className="tile-section tile-light taller1-header-section">
        <div className="container-wide">
          <div className="taller1-header-wrapper">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="taller1-topic-badge">
                  Tema 1 · Sistemas Distribuidos
                </span>
              </div>
              <h1 className="type-display-md taller1-main-title">
                Investigación de Hardware: Clúster vs. Grid
              </h1>
              <p className="taller1-objective-text">
                <strong>Objetivo de Aprendizaje:</strong> Reconocer los conceptos CLUSTER y GRID y los componentes de Hardware necesarios en su instalación, para identificar los elementos clave en la construcción de la infraestructura de sistemas distribuidos.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="utility-card taller1-score-card">
              <div className="taller1-score-label">
                Puntaje Asignado
              </div>
              <div className="taller1-score-value">
                50 Puntos
              </div>
              <a
                href="https://classroom.google.com/c/ODcyMDQwNDA5MjIw/a/ODcyMDQwNDA5MjMy/details"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pearl-capsule"
                style={{ fontSize: '11px', padding: '4px 10px', marginTop: '6px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
              >
                <span>Google Classroom</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="taller1-tabs-bar">
            <button
              onClick={() => setActiveTab('investigacion')}
              className={activeTab === 'investigacion' ? 'btn-primary' : 'btn-pearl-capsule'}
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              <Cpu size={14} />
              1. Hardware & Arquitectura
            </button>
            <button
              onClick={() => setActiveTab('matriz')}
              className={activeTab === 'matriz' ? 'btn-primary' : 'btn-pearl-capsule'}
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              <Layers size={14} />
              2. Matriz Comparativa
            </button>
            <button
              onClick={() => setActiveTab('casos')}
              className={activeTab === 'casos' ? 'btn-primary' : 'btn-pearl-capsule'}
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              <Activity size={14} />
              3. Casos Reales (CERN, Top500)
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: INVESTIGACIÓN DE HARDWARE INTERACTIVA */}
      {activeTab === 'investigacion' && (
        <section className="tile-section tile-parchment taller1-content-section">
          <div className="container-wide">
            {/* Architecture Selector (Clúster vs Grid) */}
            <div className="taller1-segmented-controls">
              <div className="taller1-segmented-bar">
                <button
                  onClick={() => {
                    setSelectedArch('cluster');
                    setSelectedComponent('compute');
                  }}
                  className={`taller1-segment-btn ${selectedArch === 'cluster' ? 'active' : 'inactive'}`}
                >
                  Infraestructura de CLÚSTER
                </button>
                <button
                  onClick={() => {
                    setSelectedArch('grid');
                    setSelectedComponent('gateways');
                  }}
                  className={`taller1-segment-btn ${selectedArch === 'grid' ? 'active' : 'inactive'}`}
                >
                  Infraestructura de GRID
                </button>
              </div>
            </div>

            {selectedArch === 'cluster' ? (
              /* CLUSTER VIEW */
              <div className="taller1-arch-grid">
                {/* Visual Architectural Map */}
                <div className="utility-card-dark taller1-interactive-map">
                  <div className="taller1-map-header">
                    <h3 className="taller1-map-title">
                      Esquema de Hardware: Clúster HPC
                    </h3>
                    <span className="taller1-map-badge" style={{ color: 'var(--color-primary-on-dark)' }}>
                      Fuertemente Acoplado · &lt; 1 µs
                    </span>
                  </div>

                  {/* Interactive Nodes in Cluster */}
                  <div className="taller1-nodes-column">
                    <div
                      onClick={() => setSelectedComponent('master')}
                      className={`taller1-node-item ${selectedComponent === 'master' ? 'selected-cluster' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Server size={18} color="#2997ff" />
                        <div>
                          <strong className="taller1-node-name">Nodo Maestro / Head Node</strong>
                          <div className="taller1-node-subtitle">
                            Gestión, planificador Slurm/PBS, autenticación y monitorización.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedComponent('network')}
                      className={`taller1-node-item ${selectedComponent === 'network' ? 'selected-cluster' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Zap size={18} color="#ff9f0a" />
                        <div>
                          <strong className="taller1-node-name">Red de Ultra-Baja Latencia (InfiniBand / RDMA)</strong>
                          <div className="taller1-node-subtitle">
                            Switches no bloqueantes 100-400 Gbps, bypass del kernel con RDMA.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedComponent('compute')}
                      className={`taller1-node-item ${selectedComponent === 'compute' ? 'selected-cluster' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Cpu size={18} color="#34c759" />
                        <div>
                          <strong className="taller1-node-name">Nodos de Cómputo Homogéneos (Workers)</strong>
                          <div className="taller1-node-subtitle">
                            CPUs multinúcleo Xeon/EPYC, aceleradores GPU (H100/A100) y RAM ECC.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedComponent('storage')}
                      className={`taller1-node-item ${selectedComponent === 'storage' ? 'selected-cluster' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <HardDrive size={18} color="#af52de" />
                        <div>
                          <strong className="taller1-node-name">Almacenamiento Paralelo (Lustre / SAN)</strong>
                          <div className="taller1-node-subtitle">
                            SAN Fibre Channel, NVMe-oF, sistemas de archivos Lustre/GPFS.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hardware Inspector Details Panel */}
                <div className="utility-card taller1-detail-card">
                  {selectedComponent === 'compute' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Cpu size={20} color="var(--color-primary)" />
                        <h4 className="taller1-detail-title">
                          Nodos de Cómputo (Compute / Worker Nodes)
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        Son los encargados de ejecutar las tareas de cálculo distribuido masivo en paralelo.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Procesadores Servidor:</strong> Intel Xeon Scalable o AMD EPYC de 64 a 128 núcleos por socket con instrucciones vectoriales (AVX-512).</li>
                        <li><strong>Aceleradores GPU:</strong> NVIDIA H100, A100, L40S interconectadas mediante NVLink para cómputo de coma flotante de alta precisión.</li>
                        <li><strong>Memoria RAM con ECC:</strong> Módulos DDR5 de alta frecuencia con corrección de errores de 128 GB a 2 TB por nodo para evitar corrupciones de memoria.</li>
                        <li><strong>Homogeneidad:</strong> Hardware idéntico para evitar cuellos de botella por diferencias de rendimiento entre nodos.</li>
                      </ul>
                    </div>
                  )}

                  {selectedComponent === 'network' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Zap size={20} color="#ff9f0a" />
                        <h4 className="taller1-detail-title">
                          Red de Interconexión de Ultra-Baja Latencia
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        En un clúster, el rendimiento del paso de mensajes entre nodos (MPI) depende críticamente de la latencia de la red interna.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>InfiniBand (HDR/NDR):</strong> Velocidades de 200 Gbps a 400 Gbps con latencias inferiores a <strong>1 microsegundo (&lt; 1 µs)</strong>.</li>
                        <li><strong>RDMA (Remote Direct Memory Access):</strong> Lectura y escritura directa en la memoria RAM del nodo remoto sin intervención del kernel del sistema operativo.</li>
                        <li><strong>RoCE / 100-400 GbE:</strong> Ethernet convergente para soporte de RDMA en infraestructuras basadas en fibra óptica estándar.</li>
                        <li><strong>Topologías No Bloqueantes:</strong> Fat-Tree o Torus 3D/5D para garantizar ancho de banda constante entre cualquier par de nodos.</li>
                      </ul>
                    </div>
                  )}

                  {selectedComponent === 'master' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Server size={20} color="var(--color-primary)" />
                        <h4 className="taller1-detail-title">
                          Nodo Maestro / Controlador (Head Node)
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        Punto de entrada para los usuarios y cerebro de gestión centralizada del clúster.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Gestión de Trabajos y Colas:</strong> Ejecuta planificadores como Slurm, PBS Pro o Torque para asignar recursos a las tareas enviadas.</li>
                        <li><strong>Doble Interfaz de Red:</strong> Una tarjeta conectada a la red pública/campus y otra a la red privada de alta velocidad del clúster.</li>
                        <li><strong>Alta Disponibilidad:</strong> Fuentes de poder redundantes, discos en RAID 1/10 y configuración pasiva/activa para evitar puntos únicos de fallo.</li>
                      </ul>
                    </div>
                  )}

                  {selectedComponent === 'storage' && (
                    <div>
                      <div className="taller1-detail-header">
                        <HardDrive size={20} color="#af52de" />
                        <h4 className="taller1-detail-title">
                          Almacenamiento Compartido y Paralelo
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        Permite que todos los nodos lean y escriban datos masivos de manera simultánea sin saturar discos individuales.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Sistemas de Archivos Paralelos:</strong> Lustre, IBM Spectrum Scale (GPFS), Ceph o BeeGFS.</li>
                        <li><strong>Infraestructura SAN / NVMe-oF:</strong> Conexiones vía Fibre Channel (32/64G) o arrays NVMe sobre Fabrics para transferencias de decenas de GB/s.</li>
                        <li><strong>Protección de Datos:</strong> Controladoras RAID 6/60 de alta disponibilidad con tolerancia a pérdida simultánea de discos.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* GRID VIEW */
              <div className="taller1-arch-grid">
                {/* Visual Architectural Map for Grid */}
                <div className="utility-card-dark taller1-interactive-map">
                  <div className="taller1-map-header">
                    <h3 className="taller1-map-title">
                      Esquema de Hardware: Grid Computing
                    </h3>
                    <span className="taller1-map-badge" style={{ color: 'var(--color-success)' }}>
                      Débilmente Acoplado · WAN / Internet
                    </span>
                  </div>

                  {/* Interactive Nodes in Grid */}
                  <div className="taller1-nodes-column">
                    <div
                      onClick={() => setSelectedComponent('gateways')}
                      className={`taller1-node-item ${selectedComponent === 'gateways' ? 'selected-grid' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Server size={18} color="#34c759" />
                        <div>
                          <strong className="taller1-node-name">Grid Gateways & Resource Brokers</strong>
                          <div className="taller1-node-subtitle">
                            Pasarelas con middleware (Globus Toolkit, gLite) y servidores de catálogos.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedComponent('wan')}
                      className={`taller1-node-item ${selectedComponent === 'wan' ? 'selected-grid' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Globe size={18} color="#2997ff" />
                        <div>
                          <strong className="taller1-node-name">Red WAN & Redes Académicas (RENATA / GEANT)</strong>
                          <div className="taller1-node-subtitle">
                            Internet global, fibra óptica académica, routers BGP de frontera.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedComponent('heterogeneous')}
                      className={`taller1-node-item ${selectedComponent === 'heterogeneous' ? 'selected-grid' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Layers size={18} color="#ff9f0a" />
                        <div>
                          <strong className="taller1-node-name">Recursos Heterogéneos Federados</strong>
                          <div className="taller1-node-subtitle">
                            Clústeres locales, supercomputadores, granjas de servidores e instrumentos.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedComponent('srm')}
                      className={`taller1-node-item ${selectedComponent === 'srm' ? 'selected-grid' : 'unselected'}`}
                    >
                      <div className="taller1-node-flex">
                        <Shield size={18} color="#af52de" />
                        <div>
                          <strong className="taller1-node-name">Storage Elements (SE) & Seguridad PKI</strong>
                          <div className="taller1-node-subtitle">
                            SRM, GridFTP, librerías de cinta magnética y certificados X.509.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid Inspector Details Panel */}
                <div className="utility-card taller1-detail-card">
                  {selectedComponent === 'gateways' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Server size={20} color="var(--color-success)" />
                        <h4 className="taller1-detail-title">
                          Pasarelas de Acceso (Grid Gateways & Gatekeepers)
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        Actúan como embajadas digitales que reciben solicitudes externas, autentican a los usuarios y traducen las tareas a los planificadores locales.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Servidores de Middleware:</strong> Ejecutan pilas de software estándar como Globus Toolkit (GRAM, GridFTP), gLite o UNICORE.</li>
                        <li><strong>Resource Brokers:</strong> Servidores que reciben los requisitos del trabajo del usuario y buscan en el catálogo de la malla qué centro tiene capacidad disponible (*matchmaking*).</li>
                        <li><strong>Traducción de Trabajos:</strong> Convierten descripciones genéricas (en JDL o XML) a comandos específicos del clúster local (Slurm, Condor).</li>
                      </ul>
                    </div>
                  )}

                  {selectedComponent === 'wan' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Globe size={20} color="var(--color-primary)" />
                        <h4 className="taller1-detail-title">
                          Red WAN & Redes Académicas Globales
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        El Grid no depende de una sola sala de servidores; opera sobre la infraestructura global de telecomunicaciones.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Redes Académicas de Fibra Óptica:</strong> Conexión a través de RENATA (Colombia), RedCLARA (Latinoamérica), GEANT (Europa) e Internet2 (EE.UU.).</li>
                        <li><strong>Latencias Variables:</strong> La latencia pasa de microsegundos a decenas o cientos de milisegundos (ms), exigiendo algoritmos tolerantes al retardo.</li>
                        <li><strong>Routers de Frontera BGP:</strong> Equipos de enrutamiento empresarial con cortafuegos dedicados para el tráfico de la malla.</li>
                      </ul>
                    </div>
                  )}

                  {selectedComponent === 'heterogeneous' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Layers size={20} color="#ff9f0a" />
                        <h4 className="taller1-detail-title">
                          Recursos Heterogéneos y Descentralizados
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        A diferencia del clúster homogéneo, un Grid aprovecha cualquier recurso computacional disponible independientemente de su fabricante o arquitectura.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Diversidad de Nodos:</strong> Supercomputadores, clústeres locales, servidores blade, PCs de laboratorio e instrumentos científicos (telescopios, colisionadores).</li>
                        <li><strong>Arquitecturas Dispares:</strong> Coexistencia de procesadores x86_64, ARM, IBM POWER con distintos sistemas operativos (Linux, Unix).</li>
                        <li><strong>Uso no exclusivo:</strong> Los nodos atienden a sus usuarios locales y donan o alquilan los ciclos de reloj ociosos a la malla.</li>
                      </ul>
                    </div>
                  )}

                  {selectedComponent === 'srm' && (
                    <div>
                      <div className="taller1-detail-header">
                        <Shield size={20} color="#af52de" />
                        <h4 className="taller1-detail-title">
                          Storage Elements & Seguridad PKI / X.509
                        </h4>
                      </div>
                      <p className="taller1-detail-intro">
                        Garantiza la transferencia segura y federada de datos masivos entre instituciones no vinculadas formalmente.
                      </p>
                      <ul className="taller1-detail-list">
                        <li><strong>Storage Resource Managers (SRM):</strong> dCache, iRODS y GridFTP para movimiento masivo de petabytes con recuperación ante cortes de red.</li>
                        <li><strong>Librerías de Cinta Magnética (LTO):</strong> Sistemas de almacenamiento jerárquico masivo de bajo costo para conservación histórica.</li>
                        <li><strong>Autenticación con Certificados X.509:</strong> Servidores de Autoridad de Certificación (CA) y VOMS para gestión de identidades y permisos globales.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: MATRIZ COMPARATIVA DE 10 CRITERIOS */}
      {activeTab === 'matriz' && (
        <section className="tile-section tile-light taller1-content-section">
          <div className="container-wide">
            <div style={{ marginBottom: '24px' }}>
              <h2 className="type-display-md taller1-main-title">
                Matriz Comparativa de Hardware y Arquitectura
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--color-ink-muted-48)' }}>
                Diferencias fundamentales entre la conformación física y lógica de un Clúster vs. un Grid.
              </p>
            </div>

            <div className="taller1-table-wrapper">
              <table className="taller1-matrix-table">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-surface-pearl)', borderBottom: '1px solid var(--color-hairline)' }}>
                    <th className="taller1-th" style={{ color: 'var(--color-ink)', width: '22%' }}>Criterio de Hardware</th>
                    <th className="taller1-th" style={{ color: 'var(--color-primary)', width: '39%', borderRight: '1px solid var(--color-hairline)' }}>
                      Clúster (Cluster Computing)
                    </th>
                    <th className="taller1-th" style={{ color: 'var(--color-success)', width: '39%' }}>
                      Grid (Grid Computing)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Naturaleza de los Nodos</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      <strong>Homogénea:</strong> Mismo modelo de procesadores, placas base, memoria RAM y aceleradores para consistencia de ejecución.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      <strong>Heterogénea:</strong> Múltiples fabricantes, distintas capacidades de CPU/GPU, servidores, clústeres enteros y PCs.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-surface-pearl)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Tipo de Acoplamiento</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      <strong>Fuertemente acoplado</strong> (Tightly coupled). Memoria distribuida pero acceso ultra-rápido síncrono.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      <strong>Débilmente acoplado</strong> (Loosely coupled). Sistemas autónomos que intercambian datos asíncronamente.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Red de Interconexión</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      Red local dedicada de ultra alta velocidad: <strong>InfiniBand (HDR/NDR), RoCE, 100-400 GbE</strong>.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      Red de área extensa: <strong>WAN, Internet público y Redes Académicas</strong> (RENATA, RedCLARA, GEANT).
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-surface-pearl)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Latencia de Red</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      <strong>&lt; 1 microsegundo (&lt; 1 µs)</strong> con soporte RDMA directo a memoria.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      <strong>Milisegundos a cientos de ms</strong> (latencia inherente a enlaces geográficos).
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Ubicación Geográfica</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      <strong>Centralizada:</strong> En un mismo rack o pasillo dentro de un único centro de datos.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      <strong>Distribuida globalmente:</strong> Entre diferentes ciudades, países y continentes.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-surface-pearl)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Dominio Administrativo</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      <strong>Único:</strong> Administrado por un único departamento de TI con políticas homogéneas.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      <strong>Múltiple / Federado:</strong> Cada institución socia mantiene su propia autonomía y administración.
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Almacenamiento</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      SAN / NVMe-oF local con <strong>Sistemas de Archivos Paralelos</strong> (Lustre, GPFS, Ceph).
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      Almacenamiento distribuido heterogéneo (SRM, GridFTP, dCache, librerías de cinta LTO).
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--color-hairline)', backgroundColor: 'var(--color-surface-pearl)' }}>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Seguridad y Control</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      Seguridad perimetral del centro de datos y autenticación de usuarios local (LDAP/Kerberos).
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      Infraestructura de Clave Pública (PKI), <strong>Certificados X.509</strong>, servidores VOMS y túneles seguros.
                    </td>
                  </tr>

                  <tr>
                    <td className="taller1-td" style={{ fontWeight: 600, color: 'var(--color-ink)' }}>Carga de Trabajo Ideal</td>
                    <td className="taller1-td" style={{ borderRight: '1px solid var(--color-hairline)', color: 'var(--color-ink-muted-80)' }}>
                      <strong>HPC (High Performance Computing):</strong> Simulaciones físicas intensivas en comunicación síncrona.
                    </td>
                    <td className="taller1-td" style={{ color: 'var(--color-ink-muted-80)' }}>
                      <strong>HTC (High Throughput Computing):</strong> Procesamiento masivo de tareas independientes (desacopladas).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: CASOS REALES / INDUSTRIA */}
      {activeTab === 'casos' && (
        <section className="tile-section tile-light taller1-content-section">
          <div className="container-wide">
            <div style={{ marginBottom: '32px' }}>
              <h2 className="type-display-md taller1-main-title">
                Casos Reales y Proyectos Emblemáticos
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--color-ink-muted-48)' }}>
                Implementaciones que demuestran la aplicación práctica de Clústeres y Grids a nivel mundial.
              </p>
            </div>

            <div className="taller1-case-grid">
              {/* Frontier Top500 */}
              <div className="utility-card" style={{ borderLeft: '4px solid #0066cc' }}>
                <span className="taller1-case-tag" style={{ color: '#0066cc' }}>
                  Clúster HPC Masivo
                </span>
                <h3 className="taller1-case-title">
                  Supercomputador Frontier (ORNL)
                </h3>
                <p className="taller1-case-desc">
                  El primer supercomputador exaescala del mundo. Posee más de 9,400 nodos homogéneos interconectados mediante la red Slingshot-11 de HPE Cray con refrigeración líquida total.
                </p>
                <div className="taller1-case-footer">
                  Uso: Modelado nuclear, astrofísica y clima.
                </div>
              </div>

              {/* CERN WLCG */}
              <div className="utility-card" style={{ borderLeft: '4px solid #34c759' }}>
                <span className="taller1-case-tag" style={{ color: '#248a3d' }}>
                  La Malla Grid Más Grande
                </span>
                <h3 className="taller1-case-title">
                  WLCG (Worldwide LHC Computing Grid)
                </h3>
                <p className="taller1-case-desc">
                  Integra más de 170 centros de datos en más de 40 países organizados en niveles (Tier-0 en Ginebra, Tier-1 nacionales, Tier-2 universitarios) para procesar los datos del Gran Colisionador de Hadrones.
                </p>
                <div className="taller1-case-footer">
                  Uso: Física de partículas y descubrimiento del bosón de Higgs.
                </div>
              </div>

              {/* Open Science Grid */}
              <div className="utility-card" style={{ borderLeft: '4px solid #af52de' }}>
                <span className="taller1-case-tag" style={{ color: '#af52de' }}>
                  Grid Académico Nacional
                </span>
                <h3 className="taller1-case-title">
                  Open Science Grid (OSG)
                </h3>
                <p className="taller1-case-desc">
                  Consorcio de universidades y laboratorios en EE.UU. que comparten tiempo de cómputo en clústeres locales mediante HTCondor y middleware Grid para democratizar la investigación científica.
                </p>
                <div className="taller1-case-footer">
                  Uso: Genómica, biomedicina y química computacional.
                </div>
              </div>

              {/* Folding@home */}
              <div className="utility-card" style={{ borderLeft: '4px solid #ff9f0a' }}>
                <span className="taller1-case-tag" style={{ color: '#ff9f0a' }}>
                  Desktop / Volunteer Grid
                </span>
                <h3 className="taller1-case-title">
                  Folding@home & SETI@home
                </h3>
                <p className="taller1-case-desc">
                  Malla de computación voluntaria donde millones de usuarios donan ciclos de GPU/CPU de sus computadores personales a través de Internet para simular el plegamiento de proteínas y enfermedades complejas.
                </p>
                <div className="taller1-case-footer">
                  Uso: Búsqueda de fármacos contra COVID-19 y Cáncer.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
