import React from 'react';

interface ComingSoonViewProps {
  label: string;
  heading?: string;
  description: string;
  icon: React.ReactNode;
}

export const ComingSoonView: React.FC<ComingSoonViewProps> = ({
  label,
  heading = 'COMING SOON...',
  description,
  icon,
}) => {
  return (
    <div className="relative w-full py-12 sm:py-16 px-4 flex flex-col items-center justify-center text-center select-none overflow-hidden animate-in fade-in duration-300">
      {/* Subtle Ambient Radial Neon Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-gradient-to-b from-[#C6FF35]/[0.06] via-[#C6FF35]/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Futuristic HUD Icon Reticle matching reference screenshot */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Outer dashed radar ring with subtle slow rotation */}
        <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#C6FF35]/25 animate-[spin_28s_linear_infinite] pointer-events-none" />
        {/* Inner solid glowing circular ring */}
        <div className="absolute w-20 h-20 rounded-full border border-[#C6FF35]/40 shadow-[0_0_24px_rgba(198,255,53,0.18)] pointer-events-none" />
        {/* Side HUD bracket ticks [ | ] */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-[#C6FF35]/50 rounded-full" />
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-[#C6FF35]/50 rounded-full" />

        {/* Center Icon */}
        <div className="relative z-10 w-16 h-16 flex items-center justify-center text-[#C6FF35] drop-shadow-[0_0_18px_rgba(198,255,53,0.6)]">
          {icon}
        </div>
      </div>

      {/* Small Uppercase Label */}
      <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C6FF35] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(198,255,53,0.35)]">
        {label}
      </span>

      {/* Main Dominant Heading */}
      <h2 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none mb-3.5">
        <span>COMING </span>
        <span className="text-[#C6FF35] drop-shadow-[0_0_24px_rgba(198,255,53,0.45)]">SOON...</span>
      </h2>

      {/* Supporting Description Text */}
      <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-[620px] mx-auto leading-relaxed mb-8 px-2 font-normal">
        {description}
      </p>

      {/* Futuristic Glowing Pip Divider matching reference screenshot */}
      <div className="flex items-center justify-center gap-3 w-full max-w-[280px] mx-auto opacity-90">
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent to-[#C6FF35]/70" />
        <div className="w-3.5 h-3.5 rounded-full border border-[#C6FF35] flex items-center justify-center p-0.5 shadow-[0_0_10px_rgba(198,255,53,0.4)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF35] shadow-[0_0_6px_#C6FF35]" />
        </div>
        <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent to-[#C6FF35]/70" />
      </div>
    </div>
  );
};

