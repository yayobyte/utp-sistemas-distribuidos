import type { SceneId } from '../../data/exposicion.data.d';
import type { NodeId, SceneLink, SceneState, Vec3 } from './MicroservicesStage.d';

type Shape = 'box' | 'sphere' | 'octa' | 'cylinder' | 'torus';

export const nodeDefs: Record<NodeId, { label: string; shape: Shape; color: number }> = {
  client: { label: 'Cliente', shape: 'sphere', color: 0xf5f5f7 },
  gateway: { label: 'API Gateway', shape: 'octa', color: 0x2997ff },
  registry: { label: 'Eureka', shape: 'torus', color: 0x34c759 },
  config: { label: 'Config Server', shape: 'octa', color: 0xff9f0a },
  broker: { label: 'Kafka', shape: 'cylinder', color: 0xaf52de },
  lb: { label: 'Balanceador', shape: 'octa', color: 0x32ade6 },
  monolith: { label: 'Monolito', shape: 'box', color: 0x8e8e93 },
  users: { label: 'Usuarios', shape: 'box', color: 0x5e9eff },
  orders: { label: 'Pedidos', shape: 'box', color: 0x2997ff },
  orders2: { label: 'Pedidos #2', shape: 'box', color: 0x2997ff },
  orders3: { label: 'Pedidos #3', shape: 'box', color: 0x2997ff },
  payments: { label: 'Pagos', shape: 'box', color: 0x30d158 },
  inventory: { label: 'Inventario', shape: 'box', color: 0x64d2ff },
  notify: { label: 'Notificaciones', shape: 'box', color: 0xbf5af2 },
  analytics: { label: 'Analítica', shape: 'box', color: 0xffd60a },
};

export const nodeIds = Object.keys(nodeDefs) as NodeId[];

export const TRACE_COLOR = 0xffd60a;
export const FAIL_COLOR = 0xff453a;

const CAM: Vec3 = [0, 12, 22];
const CAM_WIDE: Vec3 = [0, 14, 27];

const ring = (ids: NodeId[], radius: number, phase = 0) =>
  Object.fromEntries(
    ids.map((id, i) => {
      const a = phase + (i / ids.length) * Math.PI * 2;
      return [id, { pos: [Math.cos(a) * radius, 0, Math.sin(a) * radius] as Vec3 }];
    })
  );

const chain = (ids: NodeId[], color?: number): SceneLink[] =>
  ids.slice(1).map((to, i) => ({ from: ids[i], to, color }));

const fan = (from: NodeId, to: NodeId[], color?: number): SceneLink[] =>
  to.map((t) => ({ from, to: t, color }));

const services: NodeId[] = ['users', 'orders', 'payments', 'inventory', 'notify'];

export const sceneStates: Record<SceneId, SceneState> = {
  orbit: {
    camera: CAM,
    nodes: {
      gateway: { pos: [0, 0.4, 0], scale: 1.3 },
      ...ring([...services, 'registry', 'config', 'broker'], 6),
    },
    links: fan('gateway', [...services, 'registry', 'config', 'broker']),
    spin: true,
  },
  monolith: {
    camera: CAM,
    nodes: {
      client: { pos: [-6, 0, 0] },
      monolith: { pos: [1, 1, 0], scale: 2.6 },
    },
    links: [{ from: 'client', to: 'monolith' }],
  },
  shatter: {
    camera: CAM,
    nodes: {
      users: { pos: [-4.5, 0, -2.5] },
      orders: { pos: [0, 0, -3.5] },
      payments: { pos: [4.5, 0, -2.5] },
      inventory: { pos: [-2.5, 0, 2.5] },
      notify: { pos: [2.5, 0, 2.5] },
    },
    links: [...chain(['users', 'orders', 'payments']), ...fan('orders', ['inventory', 'notify'])],
  },
  scale: {
    camera: CAM,
    nodes: {
      client: { pos: [-7, 0, 0] },
      lb: { pos: [-3, 0, 0], scale: 1.2 },
      orders: { pos: [1.5, 0, -3.5] },
      orders2: { pos: [1.5, 0, 0] },
      orders3: { pos: [1.5, 0, 3.5] },
      payments: { pos: [6, 0, 0] },
    },
    links: [
      { from: 'client', to: 'lb' },
      ...fan('lb', ['orders', 'orders2', 'orders3']),
      { from: 'orders', to: 'payments' },
      { from: 'orders2', to: 'payments' },
      { from: 'orders3', to: 'payments' },
    ],
  },
  sync: {
    camera: CAM,
    nodes: {
      client: { pos: [-7, 0, 0] },
      gateway: { pos: [-3.5, 0, 0] },
      orders: { pos: [0.5, 0, 0] },
      payments: { pos: [5, 0, -2] },
      inventory: { pos: [5, 0, 2] },
    },
    links: [...chain(['client', 'gateway', 'orders', 'payments']), { from: 'orders', to: 'inventory' }],
  },
  queue: {
    camera: CAM,
    nodes: {
      orders: { pos: [-6, 0, 0] },
      broker: { pos: [-0.5, 0, 0], scale: 1.4 },
      inventory: { pos: [5, 0, -3.5] },
      notify: { pos: [5, 0, 0] },
      analytics: { pos: [5, 0, 3.5] },
    },
    links: [{ from: 'orders', to: 'broker', color: 0xaf52de }, ...fan('broker', ['inventory', 'notify', 'analytics'], 0xaf52de)],
  },
  config: {
    camera: CAM,
    nodes: {
      config: { pos: [0, 1, 0], scale: 1.4 },
      ...ring(services, 5.5, Math.PI / 2),
    },
    links: fan('config', services, 0xff9f0a),
  },
  discovery: {
    camera: CAM,
    nodes: {
      registry: { pos: [0, 0.6, 0], scale: 1.4 },
      ...ring([...services, 'gateway'], 6, Math.PI / 6),
    },
    links: [...services, 'gateway' as NodeId].map((id) => ({ from: id, to: 'registry' as NodeId, color: 0x34c759 })),
  },
  gateway: {
    camera: CAM,
    nodes: {
      client: { pos: [-7.5, 0, 0] },
      gateway: { pos: [-3, 0, 0], scale: 1.4 },
      registry: { pos: [-3, 0, -4.5], scale: 0.8 },
      users: { pos: [2.5, 0, -4.5] },
      orders: { pos: [2.5, 0, -1.5] },
      payments: { pos: [2.5, 0, 1.5] },
      inventory: { pos: [2.5, 0, 4.5] },
    },
    links: [
      { from: 'client', to: 'gateway' },
      { from: 'gateway', to: 'registry', color: 0x34c759 },
      ...fan('gateway', ['users', 'orders', 'payments', 'inventory']),
    ],
  },
  breaker: {
    camera: CAM,
    nodes: {
      client: { pos: [-7.5, 0, 0] },
      gateway: { pos: [-3.5, 0, 0] },
      orders: { pos: [0.5, 0, 0] },
      payments: { pos: [5, 0, -2.5] },
      notify: { pos: [5, 0, 2.5] },
    },
    links: [
      ...chain(['client', 'gateway', 'orders']),
      { from: 'orders', to: 'payments', cut: true },
      { from: 'orders', to: 'notify', color: 0xff9f0a },
    ],
    failed: ['payments'],
  },
  tracing: {
    camera: CAM_WIDE,
    nodes: {
      client: { pos: [-8, 0, 0] },
      gateway: { pos: [-5, 0, 1.5] },
      orders: { pos: [-1.5, 0, -1.5] },
      payments: { pos: [1.5, 0, 1.5] },
      broker: { pos: [4.5, 0, -1.5] },
      notify: { pos: [7.5, 0, 1.5] },
    },
    links: chain(['client', 'gateway', 'orders', 'payments', 'broker', 'notify'], TRACE_COLOR),
  },
  system: {
    camera: CAM_WIDE,
    nodes: {
      client: { pos: [-9, 0, 0] },
      gateway: { pos: [-5.5, 0, 0], scale: 1.2 },
      registry: { pos: [-5.5, 0, -4.5], scale: 0.9 },
      config: { pos: [-5.5, 0, 4.5], scale: 0.9 },
      users: { pos: [-1, 0, -3.5] },
      orders: { pos: [-1, 0, 0] },
      payments: { pos: [-1, 0, 3.5] },
      broker: { pos: [3, 0, 0], scale: 1.2 },
      inventory: { pos: [7, 0, -3.5] },
      notify: { pos: [7, 0, 0] },
      analytics: { pos: [7, 0, 3.5] },
    },
    links: [
      { from: 'client', to: 'gateway' },
      ...fan('gateway', ['users', 'orders', 'payments']),
      { from: 'gateway', to: 'registry', color: 0x34c759 },
      { from: 'orders', to: 'payments' },
      { from: 'orders', to: 'broker', color: 0xaf52de },
      ...fan('broker', ['inventory', 'notify', 'analytics'], 0xaf52de),
    ],
    spin: true,
  },
};
