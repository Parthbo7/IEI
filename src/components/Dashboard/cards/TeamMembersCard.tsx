import React from 'react';
import { Users, Crown, Settings } from 'lucide-react';
import { TeamMember } from '../types';

interface TeamMembersCardProps {
  members: TeamMember[];
  onManageClick: () => void;
}

export const TeamMembersCard: React.FC<TeamMembersCardProps> = ({
  members,
  onManageClick,
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
            <h3 className="text-base font-bold text-white font-sans">Team Members</h3>
            <p className="text-xs text-zinc-400 font-sans">Your registered team members.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onManageClick}
          className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Manage</span>
        </button>
      </div>

      {/* Members Grid / Row */}
      <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        {members.map((member, idx) => {
          const isLeader = member.role === 'Team Leader' || idx === 0;

          return (
            <div
              key={member.id || idx}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-[#C6FF35]/30 transition-all group"
            >
              {/* Avatar circle */}
              <div className="relative mb-2.5">
                <div
                  className="w-13 h-13 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform group-hover:scale-105"
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
                </div>

                {isLeader && (
                  <div
                    title="Team Leader"
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg"
                  >
                    <Crown className="w-3 h-3 fill-black text-black" />
                  </div>
                )}
              </div>

              <span className="text-xs sm:text-sm font-bold text-white font-sans truncate w-full">
                {member.fullName}
              </span>

              <span
                className={`text-[11px] font-mono mt-0.5 block truncate w-full ${
                  isLeader ? 'text-[#C6FF35] font-semibold' : 'text-zinc-400'
                }`}
              >
                {member.role}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
