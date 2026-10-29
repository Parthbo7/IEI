import React from 'react';
import { Lightbulb, Sparkles, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface ProblemStatementComingSoonCardProps {
  onViewGuidelines: () => void;
  onExploreMore?: () => void;
}

export const ProblemStatementComingSoonCard: React.FC<ProblemStatementComingSoonCardProps> = ({
  onViewGuidelines,
  onExploreMore,
}) => {
  return (
    <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-7 flex flex-col justify-between transition-all relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6FF35]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-sans">Problem Statement Selection</h3>
            <p className="text-xs text-zinc-400 font-sans">Browse and select a problem statement for your team.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewGuidelines}
          className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>View Guidelines</span>
        </button>
      </div>

      {/* Futuristic COMING SOON Centerpiece */}
      <div className="py-8 sm:py-10 flex flex-col items-center text-center relative z-10 my-auto">
        {/* Glowing Futuristic Icon Container */}
        <div className="relative mb-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-[#0E1624]/90 border-2 border-[#C6FF35]/50 shadow-[0_0_35px_rgba(198,255,53,0.25)] flex items-center justify-center text-[#C6FF35] relative group-hover:scale-105 transition-transform duration-300">
            <Lightbulb className="w-9 h-9 sm:w-10 sm:h-10 animate-pulse" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#C6FF35] text-black flex items-center justify-center shadow-lg">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C6FF35]/15 border border-[#C6FF35]/40 text-[#C6FF35] font-mono text-xs font-bold tracking-widest uppercase mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>COMING SOON</span>
        </div>

        {/* Heading */}
        <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight mb-2">
          PROBLEM STATEMENTS
        </h4>

        {/* Supporting Message */}
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed font-sans px-4">
          Our team is preparing the problem statements for Smart City Innovation 2026.
          Check back soon for challenges, themes, and selection details.
        </p>

        {/* Futuristic accent progress pulse */}
        <div className="w-48 h-1 bg-white/[0.08] rounded-full overflow-hidden mt-6">
          <div className="w-24 h-full bg-gradient-to-r from-transparent via-[#C6FF35] to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );
};
