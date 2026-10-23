import type { Clase } from './types';
import { clase01, clase02, clase03, clase04 } from './clases01-04';
import { clase05, clase06, clase07, clase08 } from './clases05-08';
import { clase09, clase10, clase11, clase12, clase13 } from './clases09-13';

export type { Clase } from './types';

export const clases: Clase[] = [
  clase01, clase02, clase03, clase04, clase05, clase06, clase07,
  clase08, clase09, clase10, clase11, clase12, clase13,
];

export const getClase = (number: number) => clases.find((c) => c.number === number);
