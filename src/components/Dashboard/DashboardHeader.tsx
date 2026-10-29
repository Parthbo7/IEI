import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, User, LogOut, Shield, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { ModalTabType } from '../Modals/HackathonModal';
import { TeamProfile } from './types';

interface DashboardHeaderProps {
  teamProfile: TeamProfile;
  unreadCount?: number;
  onOpenModal: (tab: ModalTabType) => void;
  onNavigateHome: () => void;
  onNavigateView: (view: 'dashboard' | 'problem-statements' | 'team-details' | 'announcements' | 'profile-security') => void;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  teamProfile,
  unreadCount = 2,
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

  // Close menus on outside click
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
          <span className="font-mono text-xs sm:text-[13px] font-black tracking-wider text-white uppercase group-hover:text-[#C6FF35] transition-colors leading-tight">
            SMART CITY INNOVATION
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-widest text-[#C6FF35] uppercase">
            HACKATHON 2026
          </span>
        </div>
      </div>

      {/* =========================================================================
          CENTER / RIGHT LINKS
          ========================================================================= */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-7 font-mono text-[12.5px] font-semibold tracking-wider">
        {/* Nav Links: Desktop */}
        <div className="hidden xl:flex items-center gap-6 text-zinc-300">
          <button
            onClick={() => onOpenModal('schedule')}
            className="hover:text-[#C6FF35] transition-colors uppercase py-1 cursor-pointer"
          >
            SCHEDULE
          </button>

          {/* SPONSORS DROPDOWN */}
          <div ref={sponsorsRef} className="relative">
            <button
              onClick={() => setSponsorsOpen((prev) => !prev)}
              className={`flex items-center gap-1 hover:text-[#C6FF35] transition-colors uppercase py-1 cursor-pointer ${
                sponsorsOpen ? 'text-[#C6FF35]' : ''
              }`}
            >
              <span>SPONSORS</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {sponsorsOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#0A101A] border border-white/[0.1] rounded-xl shadow-2xl p-2 z-50">
                <button
                  onClick={() => {
                    setSponsorsOpen(false);
                    onOpenModal('sponsors');
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-white/[0.05] hover:text-[#C6FF35] transition-colors"
                >
                  • Industry Sponsors
                </button>
                <button
                  onClick={() => {
                    setSponsorsOpen(false);
                    onOpenModal('sponsors');
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-white/[0.05] hover:text-[#C6FF35] transition-colors"
                >
                  • NWCMC Collaboration
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigateView('problem-statements')}
            className="hover:text-[#C6FF35] transition-colors uppercase py-1 cursor-pointer"
          >
            PROBLEM STATEMENT
          </button>

          <button
            onClick={() => onOpenModal('faq')}
            className="hover:text-[#C6FF35] transition-colors uppercase py-1 cursor-pointer"
          >
            FAQ
          </button>

          <button
            onClick={() => onOpenModal('contact')}
            className="hover:text-[#C6FF35] transition-colors uppercase py-1 cursor-pointer"
          >
            CONTACT
          </button>
        </div>

        {/* NOTIFICATIONS BELL */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            aria-label="View notifications"
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#C6FF35]/40 hover:text-[#C6FF35] flex items-center justify-center text-zinc-300 transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C6FF35] text-black font-mono font-bold text-[9px] flex items-center justify-center shadow-[0_0_8px_rgba(198,255,53,0.8)]">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#090E17]/98 border border-[#C6FF35]/30 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-4 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6FF35]" />
                  <span>NOTIFICATIONS</span>
                </div>
                <span className="text-[10px] font-mono text-[#C6FF35]">{unreadCount} New</span>
              </div>
              <div className="py-2 space-y-2.5 max-h-60 overflow-y-auto">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#C6FF35]/30 transition-colors">
                  <p className="text-xs font-semibold text-white">Problem Statements Coming Soon</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Municipal challenge domains are being finalized.</p>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1 block">10 Apr 2026</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#C6FF35]/30 transition-colors">
                  <p className="text-xs font-semibold text-white">Orientation Webinar Scheduled</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Live meeting with mentors on 12 April 2026 at 5:00 PM.</p>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1 block">08 Apr 2026</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setNotificationsOpen(false);
                  onNavigateView('announcements');
                }}
                className="w-full mt-2 py-1.5 text-center text-[11px] font-mono text-[#C6FF35] hover:underline"
              >
                View all announcements →
              </button>
            </div>
          )}
        </div>

        {/* LOGGED-IN TEAM ACCOUNT DROPDOWN PILL */}
        <div ref={accountRef} className="relative">
          <button
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-[#0E1624]/90 border border-[#C6FF35]/40 hover:border-[#C6FF35] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.15)]"
          >
            <div className="w-7 h-7 rounded-full bg-[#C6FF35] flex items-center justify-center text-black font-bold">
              <User className="w-4 h-4 text-black" />
            </div>
            <span className="text-xs font-sans font-bold text-white max-w-[130px] sm:max-w-[170px] truncate">
              {teamProfile.teamName}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                accountMenuOpen ? 'rotate-180 text-[#C6FF35]' : ''
              }`}
            />
          </button>

          {accountMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[#090E17]/98 border border-white/[0.12] rounded-2xl shadow-2xl backdrop-blur-2xl p-3 z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b border-white/[0.08] mb-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block tracking-wider">
                  REGISTERED TEAM
                </span>
                <p className="text-sm font-bold text-white truncate">{teamProfile.teamName}</p>
                <p className="text-[11px] font-mono text-[#C6FF35] mt-0.5">{teamProfile.referenceId}</p>
              </div>

              <div className="space-y-1 text-xs font-sans">
                <button
                  onClick={() => {
                    setAccountMenuOpen(false);
                    onNavigateView('team-details');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] flex items-center gap-2.5 transition-colors"
                >
                  <User className="w-4 h-4 text-[#C6FF35]" />
                  <span>Team Details</span>
                </button>

                <button
                  onClick={() => {
                    setAccountMenuOpen(false);
                    onNavigateView('profile-security');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] flex items-center gap-2.5 transition-colors"
                >
                  <Shield className="w-4 h-4 text-zinc-400" />
                  <span>Profile & Security</span>
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setAccountMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2.5 transition-colors font-mono text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOGOUT SESSION</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
