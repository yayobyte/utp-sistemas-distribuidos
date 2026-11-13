import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell/AppShell';
import { HomePage } from './pages/HomePage';
import { Taller1Page } from './pages/Taller1Page';
import { Taller2Page } from './pages/Taller2Page';
import { Taller3Page } from './pages/Taller3Page';
import { Taller4Page } from './pages/Taller4Page';
import { Taller5Page } from './pages/Taller5Page';
import { Taller6Page } from './pages/Taller6Page';
import { GuiaEstudioPage } from './pages/GuiaEstudioPage';
import { GuiaComunicacionPage } from './pages/GuiaComunicacionPage';
import { GuiaExposicionPage } from './pages/GuiaExposicionPage';
import { ClasesIndexPage } from './pages/ClasesIndexPage';
import { ClasePage } from './pages/ClasePage';
import { ExposicionPage } from './pages/ExposicionPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="exposicion/microservicios" element={<ExposicionPage />} />
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="guia" element={<Navigate to="/guia/arquitecturas" replace />} />
          <Route path="guia/arquitecturas" element={<GuiaEstudioPage />} />
          <Route path="guia/comunicacion" element={<GuiaComunicacionPage />} />
          <Route path="guia/exposicion" element={<GuiaExposicionPage />} />
          <Route path="clases" element={<ClasesIndexPage />} />
          <Route path="clases/:numero" element={<ClasePage />} />
          <Route path="talleres/1/:section?" element={<Taller1Page />} />
          <Route path="talleres/2/:section?" element={<Taller2Page />} />
          <Route path="talleres/3/:section?" element={<Taller3Page />} />
          <Route path="talleres/4/:section?" element={<Taller4Page />} />
          <Route path="talleres/5/:section?" element={<Taller5Page />} />
          <Route path="talleres/6/:section?" element={<Taller6Page />} />

          {/* Rutas anteriores al rediseño */}
          <Route path="talleres" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
