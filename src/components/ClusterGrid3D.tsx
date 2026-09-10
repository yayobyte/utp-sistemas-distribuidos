import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, Globe, RotateCw } from 'lucide-react';
import type { ClusterGrid3DProps, PacketData, SiteLocation } from './ClusterGrid3D.d';
import './ClusterGrid3D.styles.css';

export const ClusterGrid3D: React.FC<ClusterGrid3DProps> = ({ mode }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(mode === 'cluster' ? 0x0088ff : 0x34c759, 2, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Particles/Packets
    const packets: { mesh: THREE.Mesh; path: THREE.Vector3[]; progress: number; speed: number }[] = [];

    if (mode === 'cluster') {
      // Setup Cluster 3D Environment (Server Racks, Central Switch, Floor Grid)
      camera.position.set(0, 12, 22);
      camera.lookAt(0, 0, 0);

      // Floor Grid
      const gridHelper = new THREE.GridHelper(30, 30, 0x0066cc, 0x1f293d);
      gridHelper.position.y = -2;
      mainGroup.add(gridHelper);

      // Materials
      const rackMat = new THREE.MeshStandardMaterial({
        color: 0x1c1c20,
        roughness: 0.3,
        metalness: 0.8,
      });

      // 1. Head Node / Master Computer Material (Electric Apple Blue)
      const masterMat = new THREE.MeshStandardMaterial({
        color: 0x0071e3,
        roughness: 0.2,
        metalness: 0.85,
        emissive: 0x004085,
        emissiveIntensity: 0.45,
      });

      // 2. NAS / SAN Parallel Storage Material (Distinct Apple Purple)
      const storageMat = new THREE.MeshStandardMaterial({
        color: 0xaf52de,
        roughness: 0.25,
        metalness: 0.85,
        emissive: 0x581c87,
        emissiveIntensity: 0.5,
      });

      // 3. Central Switch Material (High-Speed Amber)
      const switchMat = new THREE.MeshStandardMaterial({
        color: 0xff9f0a,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0xcc7a00,
        emissiveIntensity: 0.85,
      });

      // 4. Worker Compute Nodes Material (Sleek Dark Slate)
      const workerMat = new THREE.MeshStandardMaterial({
        color: 0x242730,
        roughness: 0.35,
        metalness: 0.75,
      });

      const ledGreenMat = new THREE.MeshBasicMaterial({ color: 0x34c759 });
      const ledBlueMat = new THREE.MeshBasicMaterial({ color: 0x2997ff });
      const ledPurpleMat = new THREE.MeshBasicMaterial({ color: 0xbf5af2 });
      const ledAmberMat = new THREE.MeshBasicMaterial({ color: 0xff9f0a });

      // 1. Master Head Node Rack (Left Back - Cobalt Blue)
      const masterRack = new THREE.Mesh(new THREE.BoxGeometry(2.5, 5.2, 2.2), masterMat);
      masterRack.position.set(-3.8, 0.6, -4);
      mainGroup.add(masterRack);

      // Master Top Display / Control Panel Screen
      const masterDisplay = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.2, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x64d2ff })
      );
      masterDisplay.position.set(-3.8, 1.8, -2.85);
      mainGroup.add(masterDisplay);

      // 2. NAS / SAN Parallel Storage Array (Right Back - Royal Purple)
      const storageRack = new THREE.Mesh(new THREE.BoxGeometry(2.5, 5.2, 2.2), storageMat);
      storageRack.position.set(3.8, 0.6, -4);
      mainGroup.add(storageRack);

      // Storage Drive Bays (Horizontal Disk Tray Slots)
      for (let i = 0; i < 4; i++) {
        const driveBay = new THREE.Mesh(
          new THREE.BoxGeometry(2.0, 0.4, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x2d124d, metalness: 0.9 })
        );
        driveBay.position.set(3.8, 2.0 - i * 0.8, -2.86);
        mainGroup.add(driveBay);

        const driveLed = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.15, 0.05),
          i % 2 === 0 ? ledPurpleMat : ledAmberMat
        );
        driveLed.position.set(4.6, 2.0 - i * 0.8, -2.8);
        mainGroup.add(driveLed);
      }

      // 3. Central High Speed Switch (Center)
      const switchBox = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.9, 1.6), switchMat);
      switchBox.position.set(0, 0, 0);
      mainGroup.add(switchBox);

      // Switch Port LEDs
      for (let p = -5; p <= 5; p++) {
        const portLed = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.12, 0.05),
          p % 2 === 0 ? ledGreenMat : ledAmberMat
        );
        portLed.position.set(p * 0.5, 0.2, 0.82);
        mainGroup.add(portLed);
      }

      // 4. Worker Compute Blades (Front Row)
      const workerPositions = [-6, -2, 2, 6];
      workerPositions.forEach((posX) => {
        const worker = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 2), workerMat);
        worker.position.set(posX, 0, 4);
        mainGroup.add(worker);

        // Blinking LEDs on each worker
        for (let i = 0; i < 3; i++) {
          const led = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.05), Math.random() > 0.5 ? ledGreenMat : ledBlueMat);
          led.position.set(posX - 0.5 + i * 0.5, 1.2, 5.05);
          mainGroup.add(led);
        }

        // Connection line to switch
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(posX, 0.2, 4),
          new THREE.Vector3(posX * 0.5, 0.2, 2),
          new THREE.Vector3(0, 0, 0),
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x34c759, transparent: true, opacity: 0.7 });
        const line = new THREE.Line(lineGeo, lineMat);
        mainGroup.add(line);

        // Packet
        const packetGeo = new THREE.SphereGeometry(0.18, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({ color: 0x30d158 });
        const packet = new THREE.Mesh(packetGeo, packetMat);
        mainGroup.add(packet);

        packets.push({
          mesh: packet,
          path: [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(posX * 0.5, 0.2, 2),
            new THREE.Vector3(posX, 0.2, 4),
          ],
          progress: Math.random(),
          speed: 0.02 + Math.random() * 0.02,
        });
      });

      // Master to Switch Connection Line (Electric Blue)
      const masterLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.8, 0.5, -2.9),
        new THREE.Vector3(-1.8, 0.2, -1.2),
        new THREE.Vector3(0, 0, 0),
      ]);
      mainGroup.add(new THREE.Line(masterLineGeo, new THREE.LineBasicMaterial({ color: 0x0071e3, linewidth: 2 })));

      // Master to Switch Packet
      const masterPacket = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), new THREE.MeshBasicMaterial({ color: 0x64d2ff }));
      mainGroup.add(masterPacket);
      packets.push({
        mesh: masterPacket,
        path: [
          new THREE.Vector3(-3.8, 0.5, -2.9),
          new THREE.Vector3(-1.8, 0.2, -1.2),
          new THREE.Vector3(0, 0, 0),
        ],
        progress: 0.2,
        speed: 0.025,
      });

      // Storage to Switch Connection Line (Purple)
      const storageLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(3.8, 0.5, -2.9),
        new THREE.Vector3(1.8, 0.2, -1.2),
        new THREE.Vector3(0, 0, 0),
      ]);
      mainGroup.add(new THREE.Line(storageLineGeo, new THREE.LineBasicMaterial({ color: 0xaf52de, linewidth: 2 })));

      // Storage to Switch Packet
      const storagePacket = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), new THREE.MeshBasicMaterial({ color: 0xbf5af2 }));
      mainGroup.add(storagePacket);
      packets.push({
        mesh: storagePacket,
        path: [
          new THREE.Vector3(3.8, 0.5, -2.9),
          new THREE.Vector3(1.8, 0.2, -1.2),
          new THREE.Vector3(0, 0, 0),
        ],
        progress: 0.6,
        speed: 0.022,
      });

    } else {
      // Setup Grid 3D Environment (Globe, Geographical Sites, Arced WAN links)
      camera.position.set(0, 8, 20);
      camera.lookAt(0, 0, 0);

      // 1. Globe Sphere (Earth representation)
      const globeGeo = new THREE.SphereGeometry(6, 32, 32);
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.8,
        metalness: 0.2,
        wireframe: true,
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      mainGroup.add(globe);

      // Atmosphere Glow
      const glowGeo = new THREE.SphereGeometry(6.2, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x1e3a8a,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
      });
      mainGroup.add(new THREE.Mesh(glowGeo, glowMat));

      // 2. Geographical Sites / Organizations
      const sites = [
        { name: 'UTP (Colombia)', pos: new THREE.Vector3(-3.5, 1.2, 4.8), color: 0x0066cc },
        { name: 'CERN (Europa)', pos: new THREE.Vector3(3.2, 4.5, 2.5), color: 0x34c759 },
        { name: 'UNAL (Bogotá)', pos: new THREE.Vector3(-4.2, 0.5, 4.2), color: 0xff9f0a },
        { name: 'Storage Tier', pos: new THREE.Vector3(4.8, -2.5, 3.1), color: 0xaf52de },
      ];

      sites.forEach((site) => {
        // Pin mesh
        const pinGeo = new THREE.CylinderGeometry(0.08, 0.2, 0.8, 8);
        const pinMat = new THREE.MeshStandardMaterial({ color: site.color, emissive: site.color, emissiveIntensity: 0.6 });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.position.copy(site.pos);
        pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), site.pos.clone().normalize());
        mainGroup.add(pin);

        // Halo
        const haloGeo = new THREE.RingGeometry(0.3, 0.45, 16);
        const haloMat = new THREE.MeshBasicMaterial({ color: site.color, side: THREE.DoubleSide });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(site.pos.clone().multiplyScalar(1.02));
        halo.quaternion.copy(pin.quaternion);
        halo.rotateX(Math.PI / 2);
        mainGroup.add(halo);
      });

      // 3. Arced WAN Curves between sites
      for (let i = 0; i < sites.length; i++) {
        for (let j = i + 1; j < sites.length; j++) {
          const v1 = sites[i].pos;
          const v2 = sites[j].pos;

          // Compute midpoint elevated above the sphere
          const mid = v1.clone().add(v2).multiplyScalar(0.5);
          mid.normalize().multiplyScalar(8.2);

          const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
          const points = curve.getPoints(30);
          const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
          const curveMat = new THREE.LineBasicMaterial({ color: 0x2997ff, transparent: true, opacity: 0.45 });
          mainGroup.add(new THREE.Line(curveGeo, curveMat));

          // WAN Traveling Packet
          const packetGeo = new THREE.SphereGeometry(0.2, 8, 8);
          const packetMat = new THREE.MeshBasicMaterial({ color: 0x58a6ff });
          const packet = new THREE.Mesh(packetGeo, packetMat);
          mainGroup.add(packet);

          packets.push({
            mesh: packet,
            path: points,
            progress: Math.random(),
            speed: 0.008 + Math.random() * 0.008,
          });
        }
      }
    }

    // Mouse Interaction (Orbit rotation)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto gentle rotation
      if (!isDragging) {
        mainGroup.rotation.y += mode === 'cluster' ? 0.002 : 0.004;
      }

      // Update packet positions
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const totalPoints = p.path.length;
        const index = Math.floor(p.progress * (totalPoints - 1));
        const nextIndex = Math.min(index + 1, totalPoints - 1);
        const subProgress = (p.progress * (totalPoints - 1)) - index;

        p.mesh.position.lerpVectors(p.path[index], p.path[nextIndex], subProgress);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode]);

  return (
    <div className="cluster-grid-3d-wrapper">
      <div ref={mountRef} className="cluster-grid-3d-canvas" />

      {/* Top HUD Overlay */}
      <div className="cluster-grid-3d-overlay">
        <div className="cluster-grid-3d-title">
          {mode === 'cluster' ? <Cpu size={16} color="#2997ff" /> : <Globe size={16} color="#34c759" />}
          <span>
            {mode === 'cluster'
              ? 'Visualización 3D: Clúster HPC & Switch RDMA'
              : 'Visualización 3D: Malla Geográfica & Enlaces WAN'}
          </span>
        </div>
        <div className="cluster-grid-3d-hint">
          Arrastra con el ratón para rotar en 3D
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="cluster-grid-3d-legend">
        <div className="cluster-grid-3d-badges">
          {mode === 'cluster' ? (
            <>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#0071e3' }} />
                <span>Nodo Maestro (Head Node)</span>
              </div>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#af52de' }} />
                <span>NAS / SAN (Lustre Storage)</span>
              </div>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#ff9f0a' }} />
                <span>Switch InfiniBand (&lt; 1 µs)</span>
              </div>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#34c759' }} />
                <span>Nodos Cómputo (Workers)</span>
              </div>
            </>
          ) : (
            <>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#0071e3' }} />
                <span>Organizaciones (Gateways)</span>
              </div>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#2997ff' }} />
                <span>Enlaces WAN / GEANT</span>
              </div>
              <div className="cluster-grid-3d-badge">
                <span className="cluster-grid-3d-indicator" style={{ backgroundColor: '#af52de' }} />
                <span>Storage Tier (SRM / LTO)</span>
              </div>
            </>
          )}
        </div>

        <div className="cluster-grid-3d-badge" style={{ opacity: 0.75 }}>
          <RotateCw size={12} />
          <span>Vista Interactiva 3D</span>
        </div>
      </div>
    </div>
  );
};
