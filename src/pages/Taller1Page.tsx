import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TallerLayout } from '../components/layout/TallerLayout/TallerLayout';
import { TabHardwareArch } from '../components/taller1/TabHardwareArch/TabHardwareArch';
import { TabMatriz } from '../components/taller1/TabMatriz/TabMatriz';
import { TabCasosReales } from '../components/taller1/TabCasosReales/TabCasosReales';
import { TabDiferencias } from '../components/taller1/TabDiferencias/TabDiferencias';
import { TabConclusiones } from '../components/taller1/TabConclusiones/TabConclusiones';
import { getTaller, getTallerPath } from '../data/talleres.registry';
import type { Taller1SectionSlug } from './Taller1Page.d';
import './Taller1Page.styles.css';

const taller = getTaller('1')!;

export const Taller1Page: React.FC = () => {
  const { section } = useParams<{ section: Taller1SectionSlug }>();
  const navigate = useNavigate();

  const sectionViews: Record<Taller1SectionSlug, React.ReactNode> = {
    hardware: <TabHardwareArch />,
    matriz: <TabMatriz />,
    casos: <TabCasosReales onExploreClick={() => navigate(getTallerPath(taller, 'hardware'))} />,
    diferencias: <TabDiferencias />,
    conclusiones: <TabConclusiones />,
  };

  if (!section || !(section in sectionViews)) {
    return <Navigate to={getTallerPath(taller)} replace />;
  }

  return <TallerLayout taller={taller}>{sectionViews[section]}</TallerLayout>;
};
