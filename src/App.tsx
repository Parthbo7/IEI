import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { CityCanvas } from './components/3D/CityCanvas';
import { OverlayManager } from './components/overlays/OverlayManager';
import { HackathonModal, ModalTabType } from './components/Modals/HackathonModal';
import { RegistrationPage } from './components/TeamRegistration/RegistrationPage';
import { LoginPage } from './components/Auth/LoginPage';
import { ParticipantDashboard } from './components/Dashboard/ParticipantDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { getActiveSession, TeamSession } from './components/Auth/authService';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(25);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentView, setCurrentView] = useState(0);
  const [modalTab, setModalTab] = useState<ModalTabType>('schedule');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'register' | 'login' | 'dashboard' | 'admin'>('home');

  const lenisRef = useRef<Lenis | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync route from URL path or hash
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const isRegisterPath =
        window.location.pathname === '/register' ||
        window.location.hash === '#register' ||
        window.location.hash === '#/register';
      const isLoginPath =
        window.location.pathname === '/login' ||
        window.location.hash === '#login' ||
        window.location.hash === '#/login';
      const isDashboardPath =
        window.location.pathname === '/dashboard' ||
        window.location.hash === '#dashboard' ||
        window.location.hash === '#/dashboard';
      const isAdminPath =
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin' ||
        window.location.hash === '#/admin';

      if (isAdminPath) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setCurrentRoute('admin');
      } else if (isRegisterPath) {
        setCurrentRoute('register');
      } else if (isLoginPath) {
        setCurrentRoute('login');
      } else if (isDashboardPath) {
        // Check active session, fallback to default demo session for direct URL access
        const session = getActiveSession();
        if (!session && typeof window !== 'undefined') {
          const demoSession: TeamSession = {
            teamName: 'Urban Innovators',
            referenceId: 'SCI2026-087',
            leaderName: 'Aditya Sharma',
            leaderEmail: 'aditya.sharma@iitn.ac.in',
            verificationStatus: 'VERIFIED',
            token: `sci_jwt_demo_${Date.now()}`,
            loginTimestamp: Date.now(),
          };
          window.sessionStorage.setItem('sci2026_team_session', JSON.stringify(demoSession));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        setCurrentRoute('dashboard');
      } else {
        setCurrentRoute('home');
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);

    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  const navigateToRegister = useCallback(() => {
    window.history.pushState(null, '', '/register');
    setCurrentRoute('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToLogin = useCallback(() => {
    window.history.pushState(null, '', '/login');
    setCurrentRoute('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToDashboard = useCallback(() => {
    window.history.pushState(null, '', '/dashboard');
    setCurrentRoute('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToAdmin = useCallback(() => {
    window.history.pushState(null, '', '/admin');
    setCurrentRoute('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToHome = useCallback(() => {
    window.history.pushState(null, '', '/');
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    if (currentRoute === 'register' || currentRoute === 'login' || currentRoute === 'dashboard') return;

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
  }, [currentRoute]);

  // Track mouse coordinates for subtle camera parallax
  useEffect(() => {
    if (currentRoute === 'register' || currentRoute === 'login' || currentRoute === 'dashboard') return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [currentRoute]);

  // Jump to specific camera sector with smooth flight
  const handleSelectView = useCallback((viewIndex: number) => {
    if (currentRoute !== 'home') {
      navigateToHome();
      return;
    }
    if (!lenisRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetProgress = viewIndex === 0 ? 0.0 : viewIndex === 1 ? 0.33 : viewIndex === 2 ? 0.67 : 1.0;
    lenisRef.current.scrollTo(targetProgress * maxScroll, { duration: 1.6 });
  }, [currentRoute, navigateToHome]);

  const handleOpenModal = useCallback((tab: ModalTabType = 'overview') => {
    if (tab === 'register') {
      navigateToRegister();
      return;
    }
    if (tab === 'login') {
      navigateToLogin();
      return;
    }
    setModalTab(tab);
    setIsModalOpen(true);
  }, [navigateToRegister, navigateToLogin]);

  // Full-Page Dedicated Registration Route
  if (currentRoute === 'register') {
    return <RegistrationPage onBackToHome={navigateToHome} />;
  }

  // Full-Page Dedicated Participant Login Route with Live 3D City Model Background
  if (currentRoute === 'login') {
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
          currentView={3}
          onSelectView={handleSelectView}
          onOpenModal={handleOpenModal}
        />

        {/* 3D WebGL City Scene pinned to Sector 4 Municipal Building */}
        <CityCanvas
          scrollProgress={1.0}
          currentView={3}
          mouseRef={mouseRef}
        />

        {/* Participant Login Interface */}
        <LoginPage
          onBackToHome={navigateToHome}
          onNavigateToRegister={navigateToRegister}
          onNavigateToDashboard={navigateToDashboard}
        />

        {/* Hackathon Details Modal if opened from Navigation */}
        <HackathonModal
          isOpen={isModalOpen}
          initialTab={modalTab}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  // Full-Page Master Participant Dashboard Route
  if (currentRoute === 'dashboard') {
    return (
      <div className="relative w-full bg-[#0B0F14] text-white overflow-x-hidden min-h-screen">
        {/* Live 3D WebGL City Scene pinned to Sector 4 (visible in background behind dashboard) */}
        <CityCanvas
          scrollProgress={1.0}
          currentView={3}
          mouseRef={mouseRef}
        />

        {/* Master Participant Dashboard Interface */}
        <ParticipantDashboard
          onNavigateHome={navigateToHome}
          onNavigateLogin={navigateToLogin}
          onOpenModal={handleOpenModal}
        />

        {/* Hackathon Details Modal if opened from Header */}
        <HackathonModal
          isOpen={isModalOpen}
          initialTab={modalTab}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  // Full-Page Master Admin Control Center Route with live 3D background
  if (currentRoute === 'admin') {
    return (
      <div className="relative w-full bg-[#0B0F14] text-white overflow-x-hidden min-h-screen">
        {/* Live 3D WebGL City Scene pinned to Sector 4 */}
        <CityCanvas
          scrollProgress={1.0}
          currentView={3}
          mouseRef={mouseRef}
        />

        {/* Master Admin Dashboard Interface */}
        <AdminDashboard
          onNavigateHome={navigateToHome}
          onLogout={navigateToLogin}
          onOpenModal={handleOpenModal}
        />

        {/* Hackathon Details Modal if opened from Admin Header */}
        <HackathonModal
          isOpen={isModalOpen}
          initialTab={modalTab}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

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
