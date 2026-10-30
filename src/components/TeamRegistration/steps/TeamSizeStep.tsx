import React from 'react';
import { ArrowLeft, ArrowRight, UserCheck, Users, Shield } from 'lucide-react';
import { TeamSize } from '../types';

interface TeamSizeStepProps {
  selectedSize: TeamSize;
  onSelectSize: (size: TeamSize) => void;
  onContinue: () => void;
  onBackToHome: () => void;
}

export const TeamSizeStep: React.FC<TeamSizeStepProps> = ({
  selectedSize,
  onSelectSize,
  onContinue,
  onBackToHome,
}) => {
  const options: {
    size: TeamSize;
    num: string;
    title: string;
    breakdown: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      size: 2,
      num: '02',
      title: 'MEMBERS',
      breakdown: '1 Leader + 1 Member',
      description: 'Ideal for focused pairs tackling specialized software, AI models, or IoT design challenges.',
      icon: <Users className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />,
    },
    {
      size: 3,
      num: '03',
      title: 'MEMBERS',
      breakdown: '1 Leader + 2 Members',
      description: 'Balanced cross-functional team combining frontend engineering, backend services, and hardware design.',
      icon: <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />,
    },
    {
      size: 4,
      num: '04',
      title: 'MEMBERS',
      breakdown: '1 Leader + 3 Members',
      description: 'Maximum capacity team for comprehensive end-to-end municipal smart-city innovation projects.',
      icon: <Shield className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-2 sm:mb-2.5 max-w-2xl shrink-0">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold font-sans text-white tracking-tight mb-0.5">
          How many team members?
        </h2>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-normal">
          Select the total number of team members, including the team leader.
        </p>
      </div>

      {/* 3 Equal Cards Grid - perfectly centered */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-2 sm:mb-3 items-stretch">
        {options.map((opt) => {
          const isSelected = selectedSize === opt.size;

          return (
            <button
              key={opt.size}
              type="button"
              onClick={() => onSelectSize(opt.size)}
              className={`relative flex flex-col items-center text-center p-4 sm:p-5 rounded-[16px] border transition-all duration-200 cursor-pointer min-h-[210px] sm:min-h-[230px] justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF35] ${
                isSelected
                  ? 'bg-[#0B1119] border-2 border-[#C6FF35] shadow-[0_0_24px_rgba(198,255,53,0.2)] ring-1 ring-[#C6FF35]/50'
                  : 'bg-[#080D14] border border-slate-800/90 hover:border-slate-700 hover:bg-[#0B1018]'
              }`}
            >
              {/* Selected Badge matching Image 2 */}
              {isSelected && (
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 px-2.5 py-0.5 rounded-full bg-[#C6FF35]/15 border border-[#C6FF35] text-[#C6FF35] font-mono text-[8.5px] font-bold tracking-widest uppercase">
                  (SELECTED)
                </div>
              )}

              {/* Top Section: Icon, Number, Title, Breakdown */}
              <div className="flex flex-col items-center w-full">
                {/* Icon Container (42px-48px) */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 mb-2 ${
                    isSelected
                      ? 'bg-[#C6FF35] text-black shadow-[0_0_14px_rgba(198,255,53,0.4)]'
                      : 'bg-white/[0.04] border border-white/[0.08] text-zinc-400 group-hover:text-white group-hover:border-white/[0.2]'
                  }`}
                >
                  {opt.icon}
                </div>

                {/* Number and Title */}
                <div className="mb-1">
                  <div
                    className={`text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none mb-0.5 transition-colors ${
                      isSelected ? 'text-[#C6FF35]' : 'text-white'
                    }`}
                  >
                    {opt.num}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
                    {opt.title}
                  </div>
                </div>

                {/* Breakdown Badge Pill */}
                <div
                  className={`px-3 py-0.5 rounded-full text-[10.5px] font-mono font-semibold transition-colors mt-0.5 mb-1 ${
                    isSelected
                      ? 'bg-[#C6FF35]/10 text-[#C6FF35] border border-[#C6FF35]/40'
                      : 'bg-white/[0.04] text-zinc-300 border border-white/[0.08]'
                  }`}
                >
                  {opt.breakdown}
                </div>
              </div>

              {/* Description pinned to bottom with Flexbox */}
              <div className="w-full mt-auto pt-2">
                <p className="text-[11px] sm:text-xs font-sans text-zinc-400 leading-normal px-1 text-center max-w-[280px] mx-auto">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Buttons matching Image 2 */}
      <div className="registration-navigation">
        <button
          type="button"
          onClick={onBackToHome}
          className="h-[40px] sm:h-[42px] px-6 sm:px-7 rounded-[10px] border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] text-white font-mono text-xs sm:text-[13px] font-bold tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C6FF35]" />
          <span>BACK TO HOME</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedSize}
          className="h-[40px] sm:h-[42px] px-7 sm:px-8 rounded-[10px] bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-[13px] font-bold tracking-wider inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(198,255,53,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
