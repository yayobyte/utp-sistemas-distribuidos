import React, { useState } from 'react';
import { Taller1Header } from '../components/taller1/Taller1Header/Taller1Header';
import { TabHardwareArch } from '../components/taller1/TabHardwareArch/TabHardwareArch';
import { TabMatriz } from '../components/taller1/TabMatriz/TabMatriz';
import { TabCasosReales } from '../components/taller1/TabCasosReales/TabCasosReales';
import { TabDiferencias } from '../components/taller1/TabDiferencias/TabDiferencias';
import { TabConclusiones } from '../components/taller1/TabConclusiones/TabConclusiones';
import type { Taller1TabType } from '../components/taller1/Taller1Header/Taller1Header.d';
import './Taller1Page.styles.css';

export const Taller1Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Taller1TabType>('investigacion');

  return (
    <div className="taller1-page-wrapper">
      {/* Header with Title, Objectives, Score, Classroom link & Tab Switcher */}
      <Taller1Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dynamic Tab Views */}
      {activeTab === 'investigacion' && <TabHardwareArch />}
      {activeTab === 'matriz' && <TabMatriz />}
      {activeTab === 'casos' && (
        <TabCasosReales onExploreClick={() => setActiveTab('investigacion')} />
      )}
      {activeTab === 'diferencias' && <TabDiferencias />}
      {activeTab === 'conclusiones' && <TabConclusiones />}
    </div>
  );
};
