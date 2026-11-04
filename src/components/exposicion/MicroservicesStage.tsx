import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { MicroservicesStageProps, NodeId, SceneLink, SceneState } from './MicroservicesStage.d';
import { FAIL_COLOR, nodeDefs, nodeIds, sceneStates } from './stageScenes';
import './MicroservicesStage.styles.css';

const PACKET_SPEED = 0.7; // link lengths per second
const PACKET_INTERVAL = 0.85; // seconds between packets on a link

const makeGeometry = (shape: (typeof nodeDefs)[NodeId]['shape']): THREE.BufferGeometry => {
  switch (shape) {
    case 'sphere': return new THREE.SphereGeometry(0.7, 32, 16);
    case 'octa': return new THREE.OctahedronGeometry(0.85);
    case 'cylinder': return new THREE.CylinderGeometry(0.75, 0.75, 1.6, 32);
    case 'torus': return new THREE.TorusGeometry(0.65, 0.22, 16, 48);
    default: return new THREE.BoxGeometry(1.4, 1, 1.4);
  }
};

const makeLabel = (text: string): THREE.Sprite => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.font = '600 52px -apple-system, "SF Pro Text", Inter, sans-serif';
  const width = Math.min(ctx.measureText(text).width + 56, 512);
  const x = (512 - width) / 2;
  ctx.fillStyle = 'rgba(12, 14, 22, 0.78)';
  ctx.beginPath();
  ctx.roundRect(x, 24, width, 80, 40);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 66);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(2.8, 0.7, 1);
  return sprite;
};

interface NodeView {
  mesh: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
  label: THREE.Sprite;
  baseColor: THREE.Color;
  scale: number;
}

interface LinkView {
  link: SceneLink;
  line: THREE.Line;
  timer: number;
}

interface Packet {
  mesh: THREE.Mesh;
  link: SceneLink;
  t: number;
}

export const MicroservicesStage: React.FC<MicroservicesStageProps> = ({ scene, panelRatio, lift = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(scene);
  const panelRef = useRef(panelRatio);
  const liftRef = useRef(lift);
  sceneRef.current = scene;
  panelRef.current = panelRatio;
  liftRef.current = lift;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const world = new THREE.Scene();
    world.fog = new THREE.Fog(0x05070d, 30, 70);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    camera.position.set(0, 12, 22);

    world.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(8, 16, 10);
    world.add(key);
    const rim = new THREE.PointLight(0x2997ff, 40, 40);
    rim.position.set(-6, 6, -6);
    world.add(rim);

    const grid = new THREE.GridHelper(60, 60, 0x1d3a66, 0x111a2b);
    grid.position.y = -1.2;
    world.add(grid);

    // Background dust
    const dustGeo = new THREE.BufferGeometry();
    const dust = new Float32Array(900 * 3);
    for (let i = 0; i < dust.length; i += 3) {
      dust[i] = (Math.random() - 0.5) * 80;
      dust[i + 1] = Math.random() * 30 - 4;
      dust[i + 2] = (Math.random() - 0.5) * 80;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x5e9eff, size: 0.08, transparent: true, opacity: 0.6 });
    world.add(new THREE.Points(dustGeo, dustMat));

    const cluster = new THREE.Group();
    world.add(cluster);

    const nodes = {} as Record<NodeId, NodeView>;
    for (const id of nodeIds) {
      const def = nodeDefs[id];
      const material = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.18,
        metalness: 0.35,
        roughness: 0.35,
      });
      const mesh = new THREE.Mesh(makeGeometry(def.shape), material);
      if (def.shape === 'torus') mesh.rotation.x = Math.PI / 2;
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry, 30),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
      );
      mesh.add(edges);
      mesh.scale.setScalar(0.0001);
      mesh.visible = false;
      const label = makeLabel(def.label);
      cluster.add(mesh, label);
      nodes[id] = { mesh, material, label, baseColor: new THREE.Color(def.color), scale: 0 };
    }

    const packetGeo = new THREE.SphereGeometry(0.14, 12, 8);
    let links: LinkView[] = [];
    let packets: Packet[] = [];
    let activeScene: SceneState | null = null;

    const disposeLine = (view: LinkView) => {
      cluster.remove(view.line);
      view.line.geometry.dispose();
      (view.line.material as THREE.Material).dispose();
    };

    const applyScene = (state: SceneState) => {
      links.forEach(disposeLine);
      links = state.links.map((link) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const material = link.cut
          ? new THREE.LineDashedMaterial({ color: FAIL_COLOR, dashSize: 0.3, gapSize: 0.2, transparent: true })
          : new THREE.LineBasicMaterial({ color: link.color ?? 0x5e9eff, transparent: true, opacity: 0.45 });
        const line = new THREE.Line(geometry, material);
        cluster.add(line);
        return { link, line, timer: Math.random() * PACKET_INTERVAL };
      });
      activeScene = state;
    };

    const spawnPacket = (link: SceneLink) => {
      const mesh = new THREE.Mesh(
        packetGeo,
        new THREE.MeshBasicMaterial({ color: link.color ?? 0x9fd0ff })
      );
      cluster.add(mesh);
      packets.push({ mesh, link, t: 0 });
    };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      // Render the left part of a wider virtual frame, so the cluster is centred
      // in the area beside the text panel instead of behind it.
      const shift = (panelRef.current * w) / 2;
      const raise = (liftRef.current * h) / 2;
      camera.aspect = (w + 2 * shift) / (h + 2 * raise);
      if (shift > 0 || raise > 0) camera.setViewOffset(w + 2 * shift, h + 2 * raise, 0, 2 * raise, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const clock = new THREE.Clock();
    const target = new THREE.Vector3();
    const camTarget = new THREE.Vector3();
    let lastLayout = `${panelRef.current}:${liftRef.current}`;
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      const k = reduced ? 1 : 1 - Math.exp(-dt * 3.5);

      const state = sceneStates[sceneRef.current];
      if (state !== activeScene) {
        applyScene(state);
        if (reduced) packets.forEach((p) => cluster.remove(p.mesh));
      }
      const layout = `${panelRef.current}:${liftRef.current}`;
      if (layout !== lastLayout) {
        lastLayout = layout;
        resize();
      }

      for (const id of nodeIds) {
        const view = nodes[id];
        const spec = state.nodes[id];
        // Hidden nodes collapse into the centre, so new ones burst out of it.
        if (spec) target.set(...spec.pos);
        else target.set(0, 0, 0);
        const goal = spec ? spec.scale ?? 1 : 0;
        view.mesh.position.lerp(target, k);
        view.scale += (goal - view.scale) * k;

        const s = Math.max(view.scale, 0.0001);
        const bob = reduced || !spec ? 0 : Math.sin(elapsed * 1.4 + view.mesh.id) * 0.08;
        view.mesh.position.y += bob * k;
        view.mesh.scale.setScalar(s);
        view.mesh.visible = view.scale > 0.02;
        if (!reduced) view.mesh.rotation.y += dt * 0.35;

        const failed = state.failed?.includes(id);
        view.material.color.lerp(failed ? new THREE.Color(FAIL_COLOR) : view.baseColor, k);
        view.material.emissive.copy(view.material.color);
        view.material.emissiveIntensity = failed ? 0.35 + Math.sin(elapsed * 6) * 0.25 : 0.18;

        view.label.position.set(view.mesh.position.x, view.mesh.position.y + 0.9 + 0.6 * s, view.mesh.position.z);
        view.label.material.opacity = Math.min(1, view.scale);
        view.label.visible = view.mesh.visible;
      }

      for (const view of links) {
        const a = nodes[view.link.from];
        const b = nodes[view.link.to];
        const attr = view.line.geometry.getAttribute('position') as THREE.BufferAttribute;
        attr.setXYZ(0, a.mesh.position.x, a.mesh.position.y, a.mesh.position.z);
        attr.setXYZ(1, b.mesh.position.x, b.mesh.position.y, b.mesh.position.z);
        attr.needsUpdate = true;
        view.line.geometry.computeBoundingSphere();
        if (view.link.cut) view.line.computeLineDistances();
        const mat = view.line.material as THREE.LineBasicMaterial;
        mat.opacity = Math.min(a.scale, b.scale) * (view.link.cut ? 0.9 : 0.45);

        if (!reduced && !view.link.cut) {
          view.timer -= dt;
          if (view.timer <= 0) {
            view.timer = PACKET_INTERVAL * (0.7 + Math.random() * 0.6);
            spawnPacket(view.link);
          }
        }
      }

      const live = new Set(state.links.filter((l) => !l.cut));
      packets = packets.filter((p) => {
        p.t += dt * PACKET_SPEED;
        if (p.t >= 1 || !live.has(p.link)) {
          cluster.remove(p.mesh);
          (p.mesh.material as THREE.Material).dispose();
          return false;
        }
        const a = nodes[p.link.from].mesh.position;
        const b = nodes[p.link.to].mesh.position;
        p.mesh.position.lerpVectors(a, b, p.t);
        p.mesh.position.y += Math.sin(p.t * Math.PI) * 0.6;
        return true;
      });

      if (state.spin && !reduced) {
        cluster.rotation.y += dt * 0.12;
      } else {
        const wrapped = Math.atan2(Math.sin(cluster.rotation.y), Math.cos(cluster.rotation.y));
        cluster.rotation.y = wrapped * (1 - k);
      }

      camTarget.set(...state.camera);
      camera.position.lerp(camTarget, k * 0.8);
      camera.lookAt(0, 0, 0);

      renderer.render(world, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      links.forEach(disposeLine);
      packets.forEach((p) => (p.mesh.material as THREE.Material).dispose());
      packetGeo.dispose();
      for (const id of nodeIds) {
        const view = nodes[id];
        view.mesh.geometry.dispose();
        view.material.dispose();
        view.mesh.children.forEach((child) => {
          const seg = child as THREE.LineSegments;
          seg.geometry.dispose();
          (seg.material as THREE.Material).dispose();
        });
        view.label.material.map?.dispose();
        view.label.material.dispose();
      }
      dustGeo.dispose();
      dustMat.dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="ms-stage" aria-hidden="true" />;
};
