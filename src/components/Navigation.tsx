import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  User,
  Users,
  Handshake,
  ChevronRight,
} from 'lucide-react';
import { ModalTabType } from './Modals/HackathonModal';

interface NavigationProps {
  currentView: number;
  onSelectView: (viewIndex: number) => void;
  onOpenModal: (tab?: ModalTabType) => void;
  activeRoute?: 'home' | 'contact' | string;
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToLogin?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
  onOpenModal,
  activeRoute = 'home',
  onNavigateHome,
  onNavigateToContact,
  onNavigateToLogin,
}) => {
  const [sponsorsDropdownOpen, setSponsorsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSponsorsOpen, setMobileSponsorsOpen] = useState(false);

  const sponsorsRef = useRef<HTMLDivElement>(null);

  const isHomeActive = activeRoute === 'home';
  const isContactActive = activeRoute === 'contact';

  // Close Sponsors dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sponsorsRef.current && !sponsorsRef.current.contains(e.target as Node)) {
        setSponsorsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSponsorsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      onSelectView(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setSponsorsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenModal('contact');
    }
  };

  const handleNavClick = (tab: ModalTabType) => {
    setSponsorsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (tab === 'contact') {
      handleContactClick();
      return;
    }
    if (tab === 'login' && onNavigateToLogin) {
      onNavigateToLogin();
      return;
    }
    onOpenModal(tab);
  };

  const handleCollaborationClick = () => {
    setSponsorsDropdownOpen(false);
    setMobileMenuOpen(false);
    onSelectView(3); // Sector 4: NWCMC Municipal Collaboration Stage
  };

  return (
    <>
      {/* =========================================================================
          FLOATING ISLAND NAVIGATION CONTAINER
          Floating rounded card layout matching reference design ("AFTER (FIXED)")
          ========================================================================= */}
      <header className="fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 lg:left-8 lg:right-8 xl:left-12 xl:right-12 z-50 max-w-[1440px] mx-auto h-[64px] sm:h-[70px] bg-[#070B14]/85 backdrop-blur-2xl border border-white/[0.12] rounded-2xl sm:rounded-[22px] px-4 sm:px-6 lg:px-7 select-none shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between transition-all duration-200">
        
        {/* =========================================================================
            DESKTOP 3-COLUMN GRID LAYOUT (lg:)
            Left: Brand | Center: Navigation Links | Right: Login Button
            ========================================================================= */}
        <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center gap-6 xl:gap-8 w-full">
          {/* 1. LEFT BRAND */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleHomeClick}
              aria-label="Smart City Innovation Hackathon 2026 Home"
              title="Return to Landing Page"
              className="group flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C6FF35]/50 rounded-xl transition-all"
            >
              {/* Neon-lime Brand Icon */}
              <div className="w-10 h-10 aspect-square rounded-xl bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_18px_rgba(198,255,53,0.35)] group-hover:shadow-[0_0_26px_rgba(198,255,53,0.6)] group-hover:scale-105 transition-all duration-200">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 28 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform group-hover:rotate-3 transition-transform duration-200"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.1524 3.33203C8.00879 3.33203 6.02803 4.47562 4.95624 6.33203L1.10723 12.9987C0.0354385 14.8551 0.0354366 17.1423 1.10723 18.9987L4.95624 25.6654C6.02803 27.5218 8.00879 28.6654 10.1524 28.6654H17.8504C19.994 28.6654 21.9747 27.5218 23.0465 25.6654L26.8955 18.9987C27.9673 17.1423 27.9673 14.8551 26.8955 12.9987L23.0465 6.33203C21.9747 4.47563 19.994 3.33203 17.8504 3.33203H10.1524ZM17.8504 7.33203L13.0391 7.33203C12.2693 7.33203 11.7883 8.16529 12.1738 8.83162C13.3631 10.8875 14.5553 12.9418 15.7428 14.9987C16.1001 15.6175 16.1001 16.3799 15.7428 16.9987C14.5553 19.0556 13.3631 21.1099 12.1738 23.1658C11.7883 23.8321 12.2693 24.6654 13.0391 24.6654H17.8504C18.5649 24.6654 19.2252 24.2842 19.5824 23.6654L23.4314 16.9987C23.7887 16.3799 23.7887 15.6175 23.4314 14.9987L19.5824 8.33203C19.2252 7.71323 18.5649 7.33203 17.8504 7.33203Z"
                    fill="black"
                  />
                </svg>
              </div>

              {/* Event Brand Typography */}
              <div className="text-left flex flex-col">
                <span className="font-tech text-white text-sm font-black tracking-tight leading-none group-hover:text-[#C6FF35] transition-colors">
                  SMART CITY INNOVATION
                </span>
                <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mt-0.5">
                  HACKATHON 2026
                </span>
              </div>
            </button>
          </div>

          {/* 2. CENTER NAVIGATION */}
          <nav className="flex items-center justify-center gap-5 xl:gap-8 font-mono text-[12.5px] xl:text-[13px] font-semibold tracking-wider text-zinc-300">
            {/* HOME */}
            <button
              onClick={handleHomeClick}
              className={`relative transition-colors py-1.5 px-1 cursor-pointer uppercase focus:outline-none ${
                isHomeActive
                  ? 'text-[#C6FF35] hover:text-white font-bold'
                  : 'hover:text-[#C6FF35]'
              }`}
            >
              <span>HOME</span>
              {isHomeActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#C6FF35] rounded-full shadow-[0_0_8px_#C6FF35]" />
              )}
            </button>

            {/* SCHEDULE */}
            <button
              onClick={() => handleNavClick('schedule')}
              className="hover:text-[#C6FF35] transition-colors py-1.5 px-1 cursor-pointer uppercase focus:outline-none focus-visible:text-[#C6FF35]"
            >
              SCHEDULE
            </button>

            {/* SPONSORS DROPDOWN */}
            <div ref={sponsorsRef} className="relative">
              <button
                onClick={() => setSponsorsDropdownOpen(prev => !prev)}
                aria-expanded={sponsorsDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 py-1.5 px-1 cursor-pointer uppercase transition-colors focus:outline-none focus-visible:text-[#C6FF35] ${
                  sponsorsDropdownOpen ? 'text-[#C6FF35]' : 'hover:text-[#C6FF35]'
                }`}
              >
                <span>SPONSORS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    sponsorsDropdownOpen ? 'rotate-180 text-[#C6FF35]' : 'text-zinc-400'
                  }`}
                />
              </button>

              {/* Redesigned Floating Sponsors Dropdown Card */}
              {sponsorsDropdownOpen && (
                <div
                  role="menu"
                  className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 min-w-[210px] bg-[#0B1019]/95 border border-white/[0.14] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1"
                >
                  {/* Item 1: Sponsors with active neon vertical indicator bar */}
                  <button
                    role="menuitem"
                    onClick={() => handleNavClick('sponsors')}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all flex items-center gap-2.5 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#C6FF35]/50"
                  >
                    <span className="w-1 h-5 rounded-full bg-[#C6FF35] shrink-0" />
                    <Users className="w-4 h-4 text-zinc-300 group-hover:text-[#C6FF35] transition-colors shrink-0" />
                    <span className="font-mono text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      Sponsors
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#C6FF35] transition-colors ml-auto shrink-0" />
                  </button>

                  {/* Item 2: Collaboration */}
                  <button
                    role="menuitem"
                    onClick={handleCollaborationClick}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all flex items-center gap-2.5 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#C6FF35]/50"
                  >
                    <span className="w-1 h-5 rounded-full bg-transparent shrink-0" />
                    <Handshake className="w-4 h-4 text-zinc-300 group-hover:text-[#C6FF35] transition-colors shrink-0" />
                    <span className="font-mono text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                      Collaboration
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#C6FF35] transition-colors ml-auto shrink-0" />
                  </button>
                </div>
              )}
            </div>

            {/* PROBLEM STATEMENT */}
            <button
              onClick={() => handleNavClick('tracks')}
              className="hover:text-[#C6FF35] transition-colors py-1.5 px-1 cursor-pointer uppercase whitespace-nowrap focus:outline-none focus-visible:text-[#C6FF35]"
            >
              PROBLEM STATEMENT
            </button>

            {/* FAQ */}
            <button
              onClick={() => handleNavClick('faq')}
              className="hover:text-[#C6FF35] transition-colors py-1.5 px-1 cursor-pointer uppercase focus:outline-none focus-visible:text-[#C6FF35]"
            >
              FAQ
            </button>

            {/* CONTACT */}
            <button
              onClick={handleContactClick}
              className={`relative transition-colors py-1.5 px-1 cursor-pointer uppercase focus:outline-none ${
                isContactActive
                  ? 'text-[#C6FF35] hover:text-white font-bold'
                  : 'hover:text-[#C6FF35]'
              }`}
            >
              <span>CONTACT</span>
              {isContactActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#C6FF35] rounded-full shadow-[0_0_8px_#C6FF35]" />
              )}
            </button>
          </nav>

          {/* 3. RIGHT LOGIN BUTTON */}
          <div className="flex items-center justify-end shrink-0">
            <button
              onClick={() => handleNavClick('login')}
              className="inline-flex items-center justify-center gap-2.5 min-h-[42px] px-5 py-2 rounded-xl sm:rounded-2xl border border-[#C6FF35] text-[#C6FF35] bg-[#070D17]/80 hover:bg-[#C6FF35]/15 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_14px_rgba(198,255,53,0.18)] hover:shadow-[0_0_24px_rgba(198,255,53,0.35)] shrink-0 focus:outline-none focus:ring-2 focus:ring-[#C6FF35]/60"
            >
              <User className="w-4 h-4 text-[#C6FF35]" />
              <span>LOGIN</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET HEADER LAYOUT (< lg)
            Left: Brand | Right: Login Pill + Hamburger
            ========================================================================= */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Mobile Brand */}
          <button
            onClick={handleHomeClick}
            aria-label="Smart City Innovation Hackathon 2026 Home"
            title="Return to Landing Page"
            className="group flex items-center gap-2.5 cursor-pointer focus:outline-none rounded-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_14px_rgba(198,255,53,0.35)] shrink-0">
              <svg width="18" height="20" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1524 3.33203C8.00879 3.33203 6.02803 4.47562 4.95624 6.33203L1.10723 12.9987C0.0354385 14.8551 0.0354366 17.1423 1.10723 18.9987L4.95624 25.6654C6.02803 27.5218 8.00879 28.6654 10.1524 28.6654H17.8504C19.994 28.6654 21.9747 27.5218 23.0465 25.6654L26.8955 18.9987C27.9673 17.1423 27.9673 14.8551 26.8955 12.9987L23.0465 6.33203C21.9747 4.47563 19.994 3.33203 17.8504 3.33203H10.1524ZM17.8504 7.33203L13.0391 7.33203C12.2693 7.33203 11.7883 8.16529 12.1738 8.83162C13.3631 10.8875 14.5553 12.9418 15.7428 14.9987C16.1001 15.6175 16.1001 16.3799 15.7428 16.9987C14.5553 19.0556 13.3631 21.1099 12.1738 23.1658C11.7883 23.8321 12.2693 24.6654 13.0391 24.6654H17.8504C18.5649 24.6654 19.2252 24.2842 19.5824 23.6654L23.4314 16.9987C23.7887 16.3799 23.7887 15.6175 23.4314 14.9987L19.5824 8.33203C19.2252 7.71323 18.5649 7.33203 17.8504 7.33203Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text-left flex flex-col">
              <span className="font-tech text-white text-xs sm:text-sm font-black tracking-tight leading-none">
                SMART CITY INNOVATION
              </span>
              <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase mt-0.5">
                HACKATHON 2026
              </span>
            </div>
          </button>

          {/* Mobile Right Controls: Login Button + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick('login')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#C6FF35] text-[#C6FF35] hover:bg-[#C6FF35]/15 font-mono font-bold text-[11px] uppercase tracking-wider shadow-[0_0_10px_rgba(198,255,53,0.18)] transition-all cursor-pointer shrink-0"
            >
              <User className="w-3.5 h-3.5 text-[#C6FF35]" />
              <span>LOGIN</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="w-9 h-9 rounded-xl bg-[#111720] border border-white/[0.12] flex items-center justify-center text-zinc-200 hover:text-[#C6FF35] hover:border-white/[0.25] transition-colors cursor-pointer focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#C6FF35]" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE RESPONSIVE FLOATING DRAWER MENU
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[74px] sm:top-[82px] left-3 right-3 sm:left-6 sm:right-6 max-w-[1440px] mx-auto bg-[#070B14]/98 border border-white/[0.14] rounded-2xl backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col space-y-3">
          <button
            onClick={handleHomeClick}
            className={`text-left font-mono text-sm font-semibold py-2 border-b border-white/[0.06] transition-colors flex items-center justify-between cursor-pointer ${
              isHomeActive ? 'text-[#C6FF35]' : 'text-zinc-200 hover:text-[#C6FF35]'
            }`}
          >
            <span>HOME</span>
            <span className="text-[10px] text-zinc-500 font-mono">01</span>
          </button>

          <button
            onClick={() => handleNavClick('schedule')}
            className="text-left font-mono text-sm font-semibold text-zinc-200 hover:text-[#C6FF35] py-2 border-b border-white/[0.06] transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>SCHEDULE</span>
            <span className="text-[10px] text-[#C6FF35] font-mono">SOON</span>
          </button>

          {/* Mobile Sponsors Collapsible */}
          <div className="border-b border-white/[0.06] pb-2">
            <button
              onClick={() => setMobileSponsorsOpen(prev => !prev)}
              className="w-full text-left font-mono text-sm font-semibold text-zinc-200 hover:text-[#C6FF35] py-2 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>SPONSORS</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  mobileSponsorsOpen ? 'rotate-180 text-[#C6FF35]' : ''
                }`}
              />
            </button>
            {mobileSponsorsOpen && (
              <div className="pl-3 space-y-1.5 pt-2 pb-1">
                <button
                  onClick={() => handleNavClick('sponsors')}
                  className="w-full text-left font-mono text-xs text-zinc-300 hover:text-[#C6FF35] py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-[#C6FF35]" />
                  <span>Sponsors</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 ml-auto" />
                </button>
                <button
                  onClick={handleCollaborationClick}
                  className="w-full text-left font-mono text-xs text-zinc-300 hover:text-[#C6FF35] py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <Handshake className="w-3.5 h-3.5 text-[#C6FF35]" />
                  <span>Collaboration</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500 ml-auto" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('tracks')}
            className="text-left font-mono text-sm font-semibold text-zinc-200 hover:text-[#C6FF35] py-2 border-b border-white/[0.06] transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>PROBLEM STATEMENT</span>
            <span className="text-[10px] text-zinc-500 font-mono">03</span>
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className="text-left font-mono text-sm font-semibold text-zinc-200 hover:text-[#C6FF35] py-2 border-b border-white/[0.06] transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>FAQ</span>
            <span className="text-[10px] text-zinc-500 font-mono">04</span>
          </button>

          <button
            onClick={handleContactClick}
            className={`text-left font-mono text-sm font-semibold py-2 border-b border-white/[0.06] transition-colors flex items-center justify-between cursor-pointer ${
              isContactActive ? 'text-[#C6FF35]' : 'text-zinc-200 hover:text-[#C6FF35]'
            }`}
          >
            <span>CONTACT</span>
            <span className="text-[10px] text-zinc-500 font-mono">05</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('login')}
              className="w-full py-3 rounded-xl bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(198,255,53,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-black" />
              <span>ACCESS PARTICIPANT LOGIN</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
