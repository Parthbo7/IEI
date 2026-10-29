import React from 'react';
import {
  LayoutDashboard,
  Lightbulb,
  Users,
  Megaphone,
  ShieldCheck,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { DashboardViewType } from './types';

interface DashboardSidebarProps {
  activeView: DashboardViewType;
  unreadAnnouncements?: number;
  onSelectView: (view: DashboardViewType) => void;
  onLogout: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeView,
  unreadAnnouncements = 2,
  onSelectView,
  onLogout,
}) => {
  const navItems = [
    {
      id: 'dashboard' as DashboardViewType,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'problem-statements' as DashboardViewType,
      label: 'Problem Statements',
      icon: Lightbulb,
      badge: 'SOON',
    },
    {
      id: 'team-details' as DashboardViewType,
      label: 'Team Details',
      icon: Users,
    },
    {
      id: 'announcements' as DashboardViewType,
      label: 'Announcements',
      icon: Megaphone,
      count: unreadAnnouncements,
    },
    {
      id: 'profile-security' as DashboardViewType,
      label: 'Profile & Security',
      icon: ShieldCheck,
    },
  ];

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6 bg-[#080D15]/85 backdrop-blur-2xl border-r border-white/[0.08] lg:sticky lg:top-[78px] lg:h-[calc(100vh-78px)] lg:overflow-y-auto select-none">
      {/* Top Nav List */}
      <div className="space-y-2">
        <div className="px-3 py-2 hidden lg:block">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold">
            NAVIGATION
          </span>
        </div>

        <nav className="space-y-1.5 font-sans">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? 'bg-[#0E1624] border-2 border-[#C6FF35] shadow-[0_0_24px_rgba(198,255,53,0.18)] text-white'
                    : 'bg-white/[0.015] border border-transparent hover:border-white/[0.08] hover:bg-white/[0.04] text-zinc-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'text-[#C6FF35] bg-[#C6FF35]/15'
                        : 'text-zinc-400 group-hover:text-zinc-200 bg-white/[0.03]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm font-semibold tracking-wide ${
                      isActive ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30">
                    {item.badge}
                  </span>
                )}

                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#C6FF35] text-black font-mono font-bold text-[10px] flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onLogout}
            className="w-full text-left px-3.5 py-3 rounded-2xl flex items-center gap-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer font-sans"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-rose-400 bg-rose-500/10">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold tracking-wide font-mono">Logout</span>
          </button>
        </div>
      </div>

      {/* Bottom Sidebar Footer: CITIES, TOGETHER. */}
      <div className="hidden lg:block pt-8 border-t border-white/[0.06] mt-8">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]">
          <h4 className="text-sm font-black uppercase tracking-tight text-white font-sans leading-tight">
            CITIES, <span className="text-[#C6FF35]">TOGETHER.</span>
          </h4>
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 leading-snug">
            INNOVATE • COLLABORATE • BUILD A SMARTER TOMORROW
          </p>
        </div>
      </div>
    </aside>
  );
};
