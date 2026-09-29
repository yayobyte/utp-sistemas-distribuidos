export interface ModelExample {
  name: string;
  url: string;
  description: string;
}

export interface ModelMatrixRow {
  enfoque: string;
  acoplamiento: string;
  red: string;
  dominio: string;
  metrica: string;
}

export interface ModeloComputacion {
  id: string;
  name: string;
  shortName: string;
  examples: ModelExample[];
  matrix: ModelMatrixRow;
}
