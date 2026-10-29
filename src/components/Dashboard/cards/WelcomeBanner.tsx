import React, { useState } from 'react';
import { Copy, Check, Users, ShieldCheck } from 'lucide-react';
import { TeamProfile } from '../types';

interface WelcomeBannerProps {
  teamProfile: TeamProfile;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ teamProfile }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(teamProfile.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-5 pb-2">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans">
          Welcome, <span className="text-[#C6FF35] drop-shadow-[0_0_24px_rgba(198,255,53,0.35)]">{teamProfile.teamName}</span>!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 font-sans">
          Here&apos;s an overview of your team and hackathon journey.
        </p>
      </div>

      {/* Compact Team Status Pill */}
      <div className="flex flex-wrap items-center gap-3 p-2 sm:p-2.5 rounded-2xl bg-[#090E17]/90 border border-white/[0.1] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        {/* Team ID */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Team ID</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
            {teamProfile.referenceId}
          </span>
          <button
            type="button"
            onClick={handleCopyId}
            aria-label="Copy Team ID"
            className="text-zinc-400 hover:text-[#C6FF35] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#C6FF35]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C6FF35]/10 border border-[#C6FF35]/30">
          <span className="w-2 h-2 rounded-full bg-[#C6FF35] animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-[#C6FF35] uppercase tracking-wider">
            {teamProfile.verificationStatus === 'VERIFIED' ? 'Verified' : 'Registered'}
          </span>
        </div>

        {/* Team Size */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <Users className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs font-mono font-semibold text-zinc-200">
            {teamProfile.teamSize} Members
          </span>
        </div>
      </div>
    </div>
  );
};
