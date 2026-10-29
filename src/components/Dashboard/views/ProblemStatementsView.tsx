import React, { useState, useEffect } from 'react';
import { Lightbulb, Clock, ArrowLeft, Megaphone, Sparkles, Building2, Tag, CheckCircle2 } from 'lucide-react';
import { fetchLivePublishedProblemStatements } from '../dashboardService';
import { ProblemStatement } from '../../../lib/supabase';

interface ProblemStatementsViewProps {
  onBackToDashboard: () => void;
  onNavigateToAnnouncements: () => void;
}

export const ProblemStatementsView: React.FC<ProblemStatementsViewProps> = ({
  onBackToDashboard,
  onNavigateToAnnouncements,
}) => {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLivePublishedProblemStatements()
      .then((data) => {
        setProblemStatements(data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // When published problem statements exist in Supabase, display them!
  if (!loading && problemStatements.length > 0) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Breadcrumb Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← BACK TO DASHBOARD</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF35]/10 border border-[#C6FF35]/30 text-[#C6FF35] font-mono text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{problemStatements.length} CHALLENGES PUBLISHED</span>
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problemStatements.map((ps) => (
            <div
              key={ps.id}
              className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] hover:border-[#C6FF35]/50 p-6 flex flex-col justify-between transition-all group shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-[#C6FF35]">
                    <Tag className="w-3 h-3" />
                    <span>{ps.category}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Building2 className="w-3 h-3 text-zinc-500" />
                    <span>{ps.organization}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#C6FF35] transition-colors font-sans">
                  {ps.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {ps.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  Published by Municipal Committee
                </span>
                <span className="text-xs font-mono text-[#C6FF35] font-bold">
                  ACTIVE CHALLENGE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // When no problem statements are published, display the existing "Coming Soon" interface
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO DASHBOARD</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF35]/10 border border-[#C6FF35]/30 text-[#C6FF35] font-mono text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>STATUS: COMING SOON</span>
        </div>
      </div>

      {/* Main Feature Container */}
      <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6FF35]/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 space-y-6">
          {/* Futuristic Icon */}
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#0E1624] border-2 border-[#C6FF35] shadow-[0_0_40px_rgba(198,255,53,0.3)] flex items-center justify-center text-[#C6FF35]">
              <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#C6FF35] text-black flex items-center justify-center shadow-lg font-bold">
              <Sparkles className="w-4 h-4 fill-black" />
            </div>
          </div>

          {/* Heading */}
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#C6FF35] block mb-2">
              SMART CITY INNOVATION 2026
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
              PROBLEM STATEMENTS
            </h2>
            <div className="inline-block mt-3 px-4 py-1 rounded-full bg-[#C6FF35] text-black font-mono font-black text-xs tracking-widest uppercase">
              COMING SOON
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl mx-auto">
            Our team is preparing the municipal problem statements for Smart City Innovation 2026.
            Check back soon for challenges, themes, and selection details.
          </p>

          {/* Futuristic animated bar */}
          <div className="w-64 h-1.5 bg-white/[0.08] rounded-full mx-auto overflow-hidden">
            <div className="w-32 h-full bg-gradient-to-r from-transparent via-[#C6FF35] to-transparent animate-[shimmer_2s_infinite]" />
          </div>

          {/* Actions */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-6 py-3 rounded-xl bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(198,255,53,0.3)] hover:bg-[#d5ff55] transition-all cursor-pointer"
            >
              Return to Dashboard
            </button>

            <button
              type="button"
              onClick={onNavigateToAnnouncements}
              className="px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#C6FF35]/50 text-zinc-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Megaphone className="w-4 h-4 text-[#C6FF35]" />
              <span>View Announcements</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
