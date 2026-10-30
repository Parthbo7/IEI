import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface RegistrationHeaderProps {
  onBackToHome: () => void;
}

export const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({ onBackToHome }) => {
  return (
    <header className="w-full h-12 sm:h-14 bg-[#070A0F]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 lg:px-12 flex items-center justify-between sticky top-0 z-30 select-none shrink-0 box-border">
      {/* Left side: Neon Logo Mark & Hackathon Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          {/* Neon Logo Mark */}
          <div className="w-8 h-8 rounded-lg bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_14px_rgba(198,255,53,0.35)] group-hover:scale-105 transition-transform duration-200">
            <ChevronRight className="w-4 h-4 stroke-[3.5] text-black" />
          </div>

          <span className="font-mono text-xs tracking-[0.2em] text-[#C6FF35] uppercase font-bold drop-shadow-[0_0_8px_rgba(198,255,53,0.3)]">
            HACKATHON 2026
          </span>
        </button>
      </div>

      {/* Right side: Back to Home button */}
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold text-zinc-200 hover:text-white border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C6FF35]" />
          <span>BACK TO HOME</span>
        </button>
      </div>
    </header>
  );
};
