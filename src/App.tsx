import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell/AppShell';
import { HomePage } from './pages/HomePage';
import { CursoPage } from './pages/CursoPage';
import { Taller1Page } from './pages/Taller1Page';
import { Taller2Page } from './pages/Taller2Page';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="curso" element={<CursoPage />} />
          <Route path="talleres/1/:section?" element={<Taller1Page />} />
          <Route path="talleres/2/:section?" element={<Taller2Page />} />

          {/* Rutas anteriores al rediseño */}
          <Route path="talleres" element={<Navigate to="/" replace />} />
          <Route path="parciales" element={<Navigate to={{ pathname: '/curso', hash: '#parciales' }} replace />} />
          <Route path="exposiciones" element={<Navigate to={{ pathname: '/curso', hash: '#exposiciones' }} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
