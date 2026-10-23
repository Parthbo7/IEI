import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { CityCanvas } from './components/3D/CityCanvas';
import { OverlayManager } from './components/overlays/OverlayManager';
import { HackathonModal, ModalTabType } from './components/Modals/HackathonModal';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(25);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentView, setCurrentView] = useState(0);
  const [modalTab, setModalTab] = useState<ModalTabType>('schedule');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Simulate asset and scene readiness
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadProgress(60), 300);
    const timer2 = setTimeout(() => setLoadProgress(100), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Initialize Lenis smooth momentum scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
      infinite: false
    });
    lenisRef.current = lenis;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      setScrollProgress(progress);

      // View index mapping matching the 4 sector stages:
      // Sector 01 (Overview): [0.0, 0.20)
      // Sector 02 (MGM College Hero View): [0.20, 0.52)
      // Sector 03 (Urban Mobility Corridors): [0.52, 0.80)
      // Sector 04 (NWCMC Municipal Civic Core): [0.80, 1.0]
      const view = progress < 0.20 ? 0 : progress < 0.52 ? 1 : progress < 0.80 ? 2 : 3;
      setCurrentView(view);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Track mouse coordinates for subtle camera parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Jump to specific camera sector with smooth flight
  const handleSelectView = useCallback((viewIndex: number) => {
    if (!lenisRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetProgress = viewIndex === 0 ? 0.0 : viewIndex === 1 ? 0.33 : viewIndex === 2 ? 0.67 : 1.0;
    lenisRef.current.scrollTo(targetProgress * maxScroll, { duration: 1.6 });
  }, []);

  const handleOpenModal = useCallback((tab: ModalTabType = 'overview') => {
    setModalTab(tab);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="relative w-full bg-[#0B0F14] text-white overflow-x-hidden min-h-screen">
      {/* Reference Preloader */}
      {loading && (
        <Preloader
          progress={loadProgress}
          onComplete={() => setLoading(false)}
        />
      )}

      {/* Top Navigation HUD */}
      <Navigation
        currentView={currentView}
        onSelectView={handleSelectView}
        onOpenModal={handleOpenModal}
      />

      {/* 3D WebGL City Scene */}
      <CityCanvas
        scrollProgress={scrollProgress}
        currentView={currentView}
        mouseRef={mouseRef}
      />

      {/* Clean Sector Overlays & Exploration Indicators */}
      <OverlayManager
        currentView={currentView}
        scrollProgress={scrollProgress}
        onOpenDetails={handleOpenModal}
      />

      {/* Interactive Hackathon Details Modal */}
      <HackathonModal
        isOpen={isModalOpen}
        initialTab={modalTab}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 700vh Virtual Scroll Track matching the reference website */}
      <div
        aria-hidden="true"
        className="pointer-events-none w-full"
        style={{ height: '700vh' }}
      />
    </div>
  );
};

export default App;
