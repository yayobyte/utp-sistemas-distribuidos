import type { Clase } from './types';
import { clase01, clase02, clase03, clase04 } from './clases01-04';
import { clase05, clase06, clase07, clase08 } from './clases05-08';
import { clase09, clase10, clase11, clase12, clase13 } from './clases09-13';
import { clase14, clase15 } from './clases14-15';
import { clase16, clase17 } from './clases16-17';
import { clase18 } from './clase18';
import { clase19 } from './clase19';

export type { Clase } from './types';

export const clases: Clase[] = [
  clase01, clase02, clase03, clase04, clase05, clase06, clase07,
  clase08, clase09, clase10, clase11, clase12, clase13, clase14, clase15, clase16, clase17, clase18, clase19,
];

export const temaTone: Record<Clase['tema'], string> = {
  Introducción: 'tema-intro',
  Arquitecturas: 'tema-arq',
  Comunicación: 'tema-com',
  Almacenamiento: 'tema-alm',
  Nombres: 'tema-nom',
};

/** Anchor id for a class section, e.g. "Aspecto 3: el binder" → "aspecto-3-el-binder". */
export const sectionSlug = (heading: string) =>
  heading
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const getClase = (number: number) => clases.find((c) => c.number === number);
