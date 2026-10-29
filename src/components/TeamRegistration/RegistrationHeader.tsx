import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface RegistrationHeaderProps {
  onBackToHome: () => void;
}

export const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({ onBackToHome }) => {
  return (
    <header className="w-full h-16 sm:h-18 bg-[#070A0F]/95 backdrop-blur-md border-b border-white/[0.08] px-6 sm:px-10 lg:px-14 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left side: Neon Logo Mark & Hackathon Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          {/* Neon Logo Mark */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_16px_rgba(198,255,53,0.35)] group-hover:scale-105 transition-transform duration-200">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5] text-black" />
          </div>

          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#C6FF35] uppercase font-bold drop-shadow-[0_0_8px_rgba(198,255,53,0.3)]">
            HACKATHON 2026
          </span>
        </button>
      </div>

      {/* Right side: Back to Home button matching reference */}
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] font-mono text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#C6FF35]" />
          <span>BACK TO HOME</span>
        </button>
      </div>
    </header>
  );
};
