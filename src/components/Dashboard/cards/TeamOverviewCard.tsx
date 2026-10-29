import React from 'react';
import { Users, Building2, User, Phone, Mail, Edit3 } from 'lucide-react';
import { TeamProfile } from '../types';

interface TeamOverviewCardProps {
  teamProfile: TeamProfile;
  onEditClick: () => void;
}

export const TeamOverviewCard: React.FC<TeamOverviewCardProps> = ({
  teamProfile,
  onEditClick,
}) => {
  return (
    <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-7 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-sans">Team Overview</h3>
            <p className="text-xs text-zinc-400 font-sans">Basic information about your registered team.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Details</span>
        </button>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
        {/* Left: Team Avatar & Name & Tagline */}
        <div className="md:col-span-5 flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/[0.15] flex items-center justify-center text-cyan-400 shrink-0 shadow-lg">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="min-w-0">
            <h4 className="text-lg sm:text-xl font-bold text-white font-sans truncate">
              {teamProfile.teamName}
            </h4>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
              {teamProfile.description || 'Innovating for smarter, greener cities.'}
            </p>
          </div>
        </div>

        {/* Right: Contact & Institutional Info */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block flex items-center gap-1">
              <Building2 className="w-3 h-3 text-zinc-400" /> College / Institution
            </span>
            <p className="text-white font-medium truncate">{teamProfile.college || 'MGM COE Nanded'}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block flex items-center gap-1">
              <User className="w-3 h-3 text-zinc-400" /> Team Leader
            </span>
            <p className="text-white font-medium truncate">{teamProfile.leaderName}</p>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block flex items-center gap-1">
              <Phone className="w-3 h-3 text-zinc-400" /> Contact
            </span>
            <p className="text-zinc-300 font-mono text-[11px] truncate">
              {teamProfile.leaderPhone} • {teamProfile.leaderEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
