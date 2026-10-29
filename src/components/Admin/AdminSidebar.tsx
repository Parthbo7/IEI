import React from 'react';
import {
  LayoutDashboard,
  Users2,
  UserCheck,
  Mail,
  Megaphone,
  FileCode2,
  CalendarCheck,
  ShieldCheck,
  FileSpreadsheet,
  LogOut,
} from 'lucide-react';
import { AdminViewType } from './types';

interface AdminSidebarProps {
  activeView: AdminViewType;
  onSelectView: (view: AdminViewType) => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeView,
  onSelectView,
  onLogout,
}) => {
  const menuItems: Array<{
    id: AdminViewType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }> = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'registrations', label: 'Registrations & Teams', icon: Users2 },
    { id: 'participants', label: 'Participants', icon: UserCheck },
    { id: 'email_center', label: 'Email Center', icon: Mail },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'problem_statements', label: 'Problem Statements', icon: FileCode2 },
    { id: 'event_settings', label: 'Event Settings', icon: CalendarCheck },
    { id: 'admin_settings', label: 'Admin Settings', icon: ShieldCheck },
    { id: 'audit_logs', label: 'Audit Logs', icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-full lg:w-[260px] xl:w-[275px] shrink-0 bg-[#070A0F]/90 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col justify-between py-6 px-4 z-30 lg:min-h-[calc(100vh-78px)]">
      {/* Navigation Links */}
      <div className="space-y-1.5">
        <div className="px-3 pb-2 text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-bold">
          Navigation
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full text-left flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer relative group ${
                isActive
                  ? 'bg-[#C6FF35]/10 text-[#C6FF35] font-semibold border border-[#C6FF35]/30 shadow-[0_0_20px_rgba(198,255,53,0.12)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#C6FF35]' : 'text-zinc-400 group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C6FF35]/20 text-[#C6FF35] border border-[#C6FF35]/30">
                  {item.badge}
                </span>
              )}

              {/* Active glow indicator on the left */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#C6FF35] rounded-r-full shadow-[0_0_8px_#C6FF35]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Logout button at bottom */}
      <div className="pt-6 mt-6 border-t border-white/[0.08]">
        <button
          onClick={onLogout}
          className="w-full text-left flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-[13px] font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        {/* Bottom micro branding */}
        <div className="mt-8 px-3 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div>
            <span className="text-white font-extrabold tracking-wider block text-xs">CITIES, TOGETHER.</span>
            <span className="text-[9px] uppercase tracking-wider text-zinc-400">INNOVATE · COLLABORATE · BUILD</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#C6FF35] animate-ping" />
        </div>
      </div>
    </aside>
  );
};
