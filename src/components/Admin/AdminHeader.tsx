import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, LogOut, Shield, ExternalLink, Sparkles, Sliders } from 'lucide-react';
import { ModalTabType } from '../Modals/HackathonModal';
import { AdminViewType } from './types';

interface AdminHeaderProps {
  onOpenModal: (tab: ModalTabType) => void;
  onNavigateHome: () => void;
  onNavigateView: (view: AdminViewType) => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenModal,
  onNavigateHome,
  onNavigateView,
  onLogout,
}) => {
  const [sponsorsOpen, setSponsorsOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const sponsorsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sponsorsRef.current && !sponsorsRef.current.contains(e.target as Node)) {
        setSponsorsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-40 h-[74px] lg:h-[78px] bg-[#070A0F]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 lg:px-10 flex items-center justify-between select-none shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
      {/* =========================================================================
          LEFT BRANDING: LOGO + EVENT TITLE
          ========================================================================= */}
      <div className="flex items-center gap-3.5 cursor-pointer group" onClick={onNavigateHome}>
        <div className="w-10 h-10 rounded-xl bg-[#C6FF35] flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(198,255,53,0.35)] group-hover:shadow-[0_0_28px_rgba(198,255,53,0.6)] transition-all">
          <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6.5 3.6v7.2L12 18.7l-6.5-3.6V7.9L12 4.3z" />
            <path d="M10 8l5 4-5 4V8z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] sm:text-[14px] font-black tracking-wider text-white uppercase font-sans group-hover:text-[#C6FF35] transition-colors flex items-center gap-2">
            SMART CITY INNOVATION
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30">
              ADMIN
            </span>
          </span>
          <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
            HACKATHON 2026
          </span>
        </div>
      </div>

      {/* =========================================================================
          CENTER / STANDARD NAVIGATION
          ========================================================================= */}
      <nav className="hidden lg:flex items-center gap-7">
        <button
          onClick={() => onOpenModal('schedule')}
          className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#C6FF35] transition-colors cursor-pointer"
        >
          SCHEDULE
        </button>

        {/* Sponsors Dropdown */}
        <div className="relative" ref={sponsorsRef}>
          <button
            onClick={() => setSponsorsOpen(!sponsorsOpen)}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#C6FF35] transition-colors cursor-pointer"
          >
            SPONSORS
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                sponsorsOpen ? 'rotate-180 text-[#C6FF35]' : 'text-zinc-500'
              }`}
            />
          </button>

          {sponsorsOpen && (
            <div className="absolute top-full left-0 mt-3 w-56 rounded-xl bg-[#0B101B]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5">
                Event Partners
              </div>
              <button
                onClick={() => {
                  setSponsorsOpen(false);
                  onOpenModal('sponsors');
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-zinc-200 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Municipal Corporation</span>
                <span className="text-[9.5px] font-mono text-[#C6FF35] bg-[#C6FF35]/10 px-1.5 py-0.5 rounded">Host</span>
              </button>
              <button
                onClick={() => {
                  setSponsorsOpen(false);
                  onOpenModal('sponsors');
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-zinc-200 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>IEI Nanded Local Centre</span>
                <span className="text-[9.5px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Partner</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigateView('problem_statements')}
          className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#C6FF35] transition-colors cursor-pointer"
        >
          PROBLEM STATEMENT
        </button>

        <button
          onClick={() => onOpenModal('faq')}
          className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#C6FF35] transition-colors cursor-pointer"
        >
          FAQ
        </button>

        <button
          onClick={() => onOpenModal('contact')}
          className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#C6FF35] transition-colors cursor-pointer"
        >
          CONTACT
        </button>
      </nav>

      {/* =========================================================================
          RIGHT: NOTIFICATIONS + ADMIN PROFILE PILL
          ========================================================================= */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#C6FF35]/40 flex items-center justify-center text-zinc-300 hover:text-[#C6FF35] transition-all relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C6FF35] ring-4 ring-[#070A0F] shadow-[0_0_8px_#C6FF35]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 rounded-2xl bg-[#0A0F1A]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.9)] p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Admin Alerts
                </span>
                <span className="text-[10px] font-mono text-[#C6FF35] bg-[#C6FF35]/10 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-1">
                    <span className="text-amber-400 font-bold">Pending Approval</span>
                    <span>10m ago</span>
                  </div>
                  <p className="text-white text-[11.5px] leading-snug">
                    8 team registrations are awaiting confirmation email dispatch.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-1">
                    <span className="text-[#C6FF35] font-bold">System Status</span>
                    <span>1h ago</span>
                  </div>
                  <p className="text-white text-[11.5px] leading-snug">
                    All problem statement drafts ready for review.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ADMIN PROFILE PILL (Matches Screenshot) */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#C6FF35]/40 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#C6FF35]/15 border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35] shadow-[0_0_12px_rgba(198,255,53,0.2)]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold text-white tracking-wide leading-tight group-hover:text-[#C6FF35] transition-colors">
                Admin
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                Organizer
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform ${
                accountMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {accountMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl bg-[#090E17]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.9)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#C6FF35]" />
                  MGM COE Secretariat
                </div>
                <div className="text-[10.5px] font-mono text-zinc-400 mt-0.5 truncate">
                  admin@smartcityinnovation.org
                </div>
              </div>

              <button
                onClick={() => {
                  setAccountMenuOpen(false);
                  onNavigateView('overview');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#C6FF35]" />
                Dashboard Overview
              </button>

              <button
                onClick={() => {
                  setAccountMenuOpen(false);
                  onNavigateView('event_settings');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Sliders className="w-4 h-4 text-zinc-400" />
                Event Controls
              </button>

              <button
                onClick={() => {
                  setAccountMenuOpen(false);
                  onNavigateHome();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <ExternalLink className="w-4 h-4 text-zinc-400" />
                View Public Website
              </button>

              <div className="my-1 border-t border-white/5" />

              <button
                onClick={() => {
                  setAccountMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors flex items-center gap-2.5 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout Admin Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
