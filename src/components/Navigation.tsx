import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { ModalTabType } from './Modals/HackathonModal';

interface NavigationProps {
  currentView: number;
  onSelectView: (viewIndex: number) => void;
  onOpenModal: (tab?: ModalTabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
  onOpenModal
}) => {
  const [sponsorsDropdownOpen, setSponsorsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSponsorsOpen, setMobileSponsorsOpen] = useState(false);

  const sponsorsRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown and mobile menu on Escape key
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

  const handleLogoClick = () => {
    onSelectView(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (tab: ModalTabType) => {
    setSponsorsDropdownOpen(false);
    setMobileMenuOpen(false);
    onOpenModal(tab);
  };

  const handleCollaborationClick = () => {
    setSponsorsDropdownOpen(false);
    setMobileMenuOpen(false);
    onSelectView(3); // Sector 4: NWCMC Municipal Collaboration Stage
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 h-16 lg:h-[72px] bg-[#0B0F14]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 lg:px-10 flex items-center justify-between select-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* =========================================================================
          DESKTOP LEFT NAVIGATION: SCHEDULE | SPONSORS ▼
          ========================================================================= */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8 z-10 text-xs font-mono font-semibold tracking-wider">
        {/* 1. SCHEDULE */}
        <button
          onClick={() => handleNavClick('schedule')}
          className="text-[#F4F6F8] hover:text-[#C6FF35] transition-colors duration-200 cursor-pointer uppercase py-1"
        >
          SCHEDULE
        </button>

        {/* 2. SPONSORS DROPDOWN */}
        <div ref={sponsorsRef} className="relative">
          <button
            onClick={() => setSponsorsDropdownOpen(prev => !prev)}
            aria-expanded={sponsorsDropdownOpen}
            aria-haspopup="true"
            className="flex items-center gap-1.5 text-[#F4F6F8] hover:text-[#C6FF35] transition-colors duration-200 cursor-pointer uppercase py-1"
          >
            <span>SPONSORS</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                sponsorsDropdownOpen ? 'rotate-180 text-[#C6FF35]' : 'text-[#AAB4C0]'
              }`}
            />
          </button>

          {/* Sponsors Dropdown Menu */}
          {sponsorsDropdownOpen && (
            <div
              role="menu"
              className="absolute top-full left-0 mt-3 w-48 bg-[#0E1319] border border-white/[0.1] rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.7)] py-1.5 z-50 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <button
                role="menuitem"
                onClick={() => handleNavClick('sponsors')}
                className="w-full text-left px-4 py-2.5 text-xs font-mono font-medium text-[#F4F6F8] hover:text-[#C6FF35] hover:bg-white/[0.05] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Sponsors</span>
              </button>

              <button
                role="menuitem"
                onClick={handleCollaborationClick}
                className="w-full text-left px-4 py-2.5 text-xs font-mono font-medium text-[#F4F6F8] hover:text-[#C6FF35] hover:bg-white/[0.05] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Collaboration</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          CENTER: GRASS BLOCK LOGO
          Strictly visually centered within the overall viewport
          ========================================================================= */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
        <button
          onClick={handleLogoClick}
          aria-label="Smart City Innovation Home"
          title="Return to Landing Page"
          className="group flex items-center justify-center cursor-pointer p-1.5 rounded focus:outline-none focus:ring-1 focus:ring-[#C6FF35]/50"
        >
          <div className="w-10 h-10 lg:w-11 lg:h-11 aspect-square rounded-[6px] bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_18px_rgba(198,255,53,0.35)] group-hover:scale-110 group-hover:shadow-[0_0_26px_rgba(198,255,53,0.6)] active:scale-95 transition-all duration-200">
            <svg
              width="22"
              height="25"
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
        </button>
      </div>

      {/* =========================================================================
          DESKTOP RIGHT NAVIGATION: PROBLEM STATEMENT | FAQ | CONTACT | LOGIN
          ========================================================================= */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8 z-10 text-xs font-mono font-semibold tracking-wider">
        {/* 4. PROBLEM STATEMENT (Full text visible on desktop) */}
        <button
          onClick={() => handleNavClick('tracks')}
          className="text-[#F4F6F8] hover:text-[#C6FF35] transition-colors duration-200 cursor-pointer uppercase py-1 whitespace-nowrap"
        >
          PROBLEM STATEMENT
        </button>

        {/* 5. FAQ */}
        <button
          onClick={() => handleNavClick('faq')}
          className="text-[#F4F6F8] hover:text-[#C6FF35] transition-colors duration-200 cursor-pointer uppercase py-1"
        >
          FAQ
        </button>

        {/* 6. CONTACT */}
        <button
          onClick={() => handleNavClick('contact')}
          className="text-[#F4F6F8] hover:text-[#C6FF35] transition-colors duration-200 cursor-pointer uppercase py-1"
        >
          CONTACT
        </button>

        {/* 7. LOGIN BUTTON */}
        <button
          onClick={() => handleNavClick('login')}
          className="px-4 py-1.5 rounded bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(198,255,53,0.35)] hover:bg-[#d5ff55] hover:shadow-[0_0_20px_rgba(198,255,53,0.55)] active:scale-95 transition-all duration-200 cursor-pointer"
        >
          LOGIN
        </button>
      </div>

      {/* =========================================================================
          TABLET / MOBILE RESPONSIVE HAMBURGER TOGGLE
          Keeps Grass Block Logo centered while providing clean touch navigation
          ========================================================================= */}
      <div className="lg:hidden flex items-center justify-between w-full">
        {/* Spacer on left to ensure logo stays centered */}
        <div className="w-9" />

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="w-9 h-9 rounded bg-[#141920] border border-white/[0.1] flex items-center justify-center text-[#F4F6F8] hover:text-[#C6FF35] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* =========================================================================
          MOBILE / TABLET SLIDE-DOWN DRAWER MENU
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-[#0B0F14]/98 border-b border-white/[0.1] backdrop-blur-xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-mono tracking-wider font-semibold">
            {/* Mobile Schedule */}
            <button
              onClick={() => handleNavClick('schedule')}
              className="text-left py-2 text-[#F4F6F8] hover:text-[#C6FF35] border-b border-white/[0.05] transition-colors cursor-pointer"
            >
              SCHEDULE
            </button>

            {/* Mobile Sponsors Dropdown */}
            <div className="border-b border-white/[0.05] pb-2">
              <button
                onClick={() => setMobileSponsorsOpen(prev => !prev)}
                className="w-full flex items-center justify-between py-2 text-[#F4F6F8] hover:text-[#C6FF35] transition-colors cursor-pointer"
              >
                <span>SPONSORS</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileSponsorsOpen ? 'rotate-180 text-[#C6FF35]' : 'text-[#AAB4C0]'
                  }`}
                />
              </button>

              {mobileSponsorsOpen && (
                <div className="pl-4 py-2 space-y-2 bg-white/[0.02] rounded-md mt-1">
                  <button
                    onClick={() => handleNavClick('sponsors')}
                    className="w-full text-left py-1.5 text-xs text-[#AAB4C0] hover:text-[#C6FF35] transition-colors block cursor-pointer"
                  >
                    • Sponsors
                  </button>
                  <button
                    onClick={handleCollaborationClick}
                    className="w-full text-left py-1.5 text-xs text-[#AAB4C0] hover:text-[#C6FF35] transition-colors block cursor-pointer"
                  >
                    • Collaboration
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Problem Statement */}
            <button
              onClick={() => handleNavClick('tracks')}
              className="text-left py-2 text-[#F4F6F8] hover:text-[#C6FF35] border-b border-white/[0.05] transition-colors cursor-pointer"
            >
              PROBLEM STATEMENT
            </button>

            {/* Mobile FAQ */}
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 text-[#F4F6F8] hover:text-[#C6FF35] border-b border-white/[0.05] transition-colors cursor-pointer"
            >
              FAQ
            </button>

            {/* Mobile Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 text-[#F4F6F8] hover:text-[#C6FF35] border-b border-white/[0.05] transition-colors cursor-pointer"
            >
              CONTACT
            </button>

            {/* Mobile Login Button */}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 rounded bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider text-center shadow-[0_0_15px_rgba(198,255,53,0.35)] hover:bg-[#d5ff55] transition-all cursor-pointer"
              >
                LOGIN
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
