import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, Server } from 'lucide-react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../../Footer';
import { courseInfo } from '../../../data/curso.data';
import type { AppShellProps } from './AppShell.d';
import './AppShell.styles.css';

// Scroll resets only when moving to a different page; switching tabs inside a
// taller (/talleres/:id/:section) keeps the reader where they are.
const pageKey = (pathname: string) => pathname.split('/').slice(0, 3).join('/');

export const AppShell: React.FC<AppShellProps> = () => {
  const { pathname, hash } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const previousPageKey = useRef(pageKey(pathname));

  useEffect(() => {
    setIsMenuOpen(false);

    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else if (previousPageKey.current !== pageKey(pathname)) {
      window.scrollTo(0, 0);
    }
    previousPageKey.current = pageKey(pathname);
  }, [pathname, hash]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="app-shell">
      <header className="app-shell-topbar">
        <button
          type="button"
          className="app-shell-menu-button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="app-sidebar"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="app-shell-topbar-brand">
          <Server size={14} />
          <span>{courseInfo.name} · {courseInfo.code}</span>
        </Link>
      </header>

      <Sidebar id="app-sidebar" isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {isMenuOpen && (
        <div className="app-shell-backdrop" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}

      <div className="app-shell-content">
        <main className="app-shell-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
