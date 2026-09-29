import React from 'react';
import type { TallerEntry } from '../../../data/talleres.registry.d';

export interface TallerLayoutProps {
  taller: TallerEntry;
  children: React.ReactNode;
}
