import React from 'react';
import { Users, Crown, ArrowLeft, Download, ShieldCheck, Mail, Phone, Building2, GraduationCap } from 'lucide-react';
import { TeamProfile } from '../types';

interface TeamDetailsViewProps {
  teamProfile: TeamProfile;
  onBackToDashboard: () => void;
  onEditDetails: () => void;
}

export const TeamDetailsView: React.FC<TeamDetailsViewProps> = ({
  teamProfile,
  onBackToDashboard,
  onEditDetails,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO DASHBOARD</span>
        </button>

        <button
          type="button"
          onClick={() => alert(`Verification pass for team ${teamProfile.teamName} [${teamProfile.referenceId}] generated.`)}
          className="px-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#C6FF35]/50 text-xs font-mono text-zinc-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#C6FF35]" />
          <span>Download Team Pass</span>
        </button>
      </div>

      {/* Main Team Info Card */}
      <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0E1624] border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35] shadow-[0_0_20px_rgba(198,255,53,0.15)]">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6FF35] font-semibold">
                SMART CITY INNOVATION 2026 • REGISTERED TEAM
              </span>
              <h2 className="text-2xl font-bold text-white font-sans">{teamProfile.teamName}</h2>
              <p className="text-xs text-zinc-400 mt-0.5">{teamProfile.college || 'MGM COE Nanded'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C6FF35]/15 border border-[#C6FF35]/40 text-[#C6FF35]">
              {teamProfile.referenceId}
            </span>
            <button
              type="button"
              onClick={onEditDetails}
              className="px-4 py-2 rounded-xl bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d5ff55] transition-colors cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        </div>

        {/* Members Roster */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Registered Team Roster ({teamProfile.members.length} / {teamProfile.teamSize} Members)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamProfile.members.map((member, idx) => {
              const isLeader = member.role === 'Team Leader' || idx === 0;

              return (
                <div
                  key={member.id || idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-[#C6FF35]/30 transition-all flex items-start gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md relative"
                    style={{
                      backgroundColor: member.avatarColor || (isLeader ? '#3B82F6' : '#10B981'),
                    }}
                  >
                    {member.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                    {isLeader && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow">
                        <Crown className="w-3 h-3 fill-black text-black" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-xs font-sans">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{member.fullName}</h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          isLeader
                            ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                            : 'bg-white/[0.05] text-zinc-300'
                        }`}
                      >
                        {member.role}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-xs mt-1 truncate">
                      {member.college || teamProfile.college}
                    </p>

                    {member.email && (
                      <p className="text-zinc-500 text-[11px] font-mono mt-1 truncate">
                        {member.email}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
