import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalNav } from './components/GlobalNav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TalleresPage } from './pages/TalleresPage';
import { Taller1Page } from './pages/Taller1Page';
import { ParcialesPage } from './pages/ParcialesPage';
import { ExposicionesPage } from './pages/ExposicionesPage';

export const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <GlobalNav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/talleres" element={<TalleresPage />} />
            <Route path="/talleres/1" element={<Taller1Page />} />
            <Route path="/parciales" element={<ParcialesPage />} />
            <Route path="/exposiciones" element={<ExposicionesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
