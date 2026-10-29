import React from 'react';
import { ShieldCheck, User, Users, CheckCircle, Clock, FileText, LogOut, X, Download, ExternalLink } from 'lucide-react';
import { TeamSession, logoutTeam } from './authService';

interface TeamDashboardModalProps {
  session: TeamSession | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const TeamDashboardModal: React.FC<TeamDashboardModalProps> = ({
  session,
  isOpen,
  onClose,
  onLogout,
}) => {
  if (!isOpen || !session) return null;

  const handleLogout = () => {
    logoutTeam();
    onLogout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#090D14]/95 border border-[#C6FF35]/30 rounded-2xl shadow-[0_0_50px_rgba(198,255,53,0.15)] overflow-hidden">
        {/* Glow Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#C6FF35] to-transparent" />

        {/* Modal Top Bar */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6FF35]/10 border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6FF35] font-semibold">
                SMART CITY INNOVATION 2026 • TEAM PORTAL
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {session.teamName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Dashboard"
            className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:border-[#C6FF35]/40 hover:text-[#C6FF35] flex items-center justify-center text-zinc-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#C6FF35]/10 to-transparent border border-[#C6FF35]/25 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider bg-[#C6FF35] text-black">
                  <CheckCircle className="w-3 h-3" />
                  AUTHENTICATED
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Ref ID: <span className="text-white font-semibold">{session.referenceId}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300">
                Welcome to your team console. Your hackathon participation credentials have been verified.
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">Registration Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#C6FF35]">
                <Clock className="w-3.5 h-3.5" /> VERIFIED TEAM
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Team Leader</span>
              <p className="text-sm font-semibold text-white mt-1 truncate">{session.leaderName}</p>
              <span className="text-[11px] text-zinc-400 truncate block">{session.leaderEmail || 'Leader'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Venue & Sector</span>
              <p className="text-sm font-semibold text-white mt-1">MGM COE Auditorium</p>
              <span className="text-[11px] text-[#C6FF35] block font-mono">Sector 04 • NWCMC Hub</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111722]/80 border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Hackathon Track</span>
              <p className="text-sm font-semibold text-white mt-1">Smart Urban Infrastructure</p>
              <span className="text-[11px] text-zinc-400 block font-mono">24-Hour Prototype</span>
            </div>
          </div>

          {/* Action Center */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Team Actions & Documentation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#C6FF35]/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C6FF35]/15 text-[#C6FF35] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Problem Statement Dossier</h4>
                    <span className="text-[11px] text-zinc-400">NWCMC Live City Challenges</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  Review the 12 municipal pain points selected for the 2026 innovation cycle.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-2 px-3 rounded-lg bg-[#151D29] hover:bg-[#1E293B] border border-white/[0.1] text-xs font-mono text-[#C6FF35] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Problems</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#C6FF35]/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C6FF35]/15 text-[#C6FF35] flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Team Confirmation Pass</h4>
                    <span className="text-[11px] text-zinc-400">PDF Verification Receipt</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  Download digital team admit badge for on-site registration verification.
                </p>
                <button
                  onClick={() => alert(`Verification pass for ${session.teamName} [${session.referenceId}] is ready.`)}
                  className="w-full py-2 px-3 rounded-lg bg-[#151D29] hover:bg-[#1E293B] border border-white/[0.1] text-xs font-mono text-zinc-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Download Pass</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-[#070A0F] border-t border-white/[0.08] flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT TEAM</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d5ff55] transition-colors cursor-pointer"
          >
            CLOSE CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};
