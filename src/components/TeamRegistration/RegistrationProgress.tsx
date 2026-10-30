import React from 'react';
import { Check } from 'lucide-react';
import { StepNumber } from './types';

interface RegistrationProgressProps {
  currentStep: StepNumber;
}

const STEPS = [
  { id: 1, num: '01', label: 'TEAM SIZE' },
  { id: 2, num: '02', label: 'TEAM LEADER' },
  { id: 3, num: '03', label: 'TEAM MEMBERS' },
  { id: 4, num: '04', label: 'PAYMENT' },
  { id: 5, num: '05', label: 'REVIEW & SUBMIT' },
];

export const RegistrationProgress: React.FC<RegistrationProgressProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-[840px] mx-auto px-4 my-2 sm:my-3 lg:my-3.5 select-none shrink-0 box-border relative">
      {/* Background City Skyline SVG Silhouette matching Hackathon Theme */}
      <div className="absolute inset-x-0 -top-7 sm:-top-8 bottom-0 pointer-events-none -z-0 flex items-center justify-center opacity-30 overflow-hidden">
        <svg
          className="w-full max-w-4xl h-14 sm:h-16 text-[#C6FF35]"
          viewBox="0 0 800 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 78 H800 V72 H770 V45 H740 V72 H710 V30 H680 V15 H650 V35 H630 V72 H600 V50 H570 V72 H540 V10 H510 V72 H470 V30 H440 V72 H420 V55 H390 V72 H360 V20 H330 V72 H300 V40 H270 V72 H240 V50 H210 V15 H180 V60 H150 V30 H120 V72 H90 V45 H60 V72 H30 V60 H0 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <line x1="0" y1="76" x2="800" y2="76" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Desktop & Tablet Stepper */}
      <div className="hidden sm:flex items-start justify-between relative w-full z-10">
        {STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const hasConnectingLine = idx < STEPS.length - 1;
          const isLineActive = step.id < currentStep;

          return (
            <div key={step.id} className="relative flex-1 flex flex-col items-center">
              {/* Connecting line to the next step: centered vertically at 15px */}
              {hasConnectingLine && (
                <div
                  className={`absolute top-[15px] left-1/2 w-full h-[1.5px] transition-colors duration-300 z-0 ${
                    isLineActive ? 'bg-[#C6FF35]' : 'bg-slate-800'
                  }`}
                />
              )}

              {/* Numbered Step Circle (28px - 32px) */}
              <div
                className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10.5px] sm:text-[11px] font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C6FF35] text-black ring-3 ring-[#C6FF35]/25 shadow-[0_0_14px_rgba(198,255,53,0.5)] scale-105'
                    : isCompleted
                    ? 'bg-[#070B10] border border-[#C6FF35] text-[#C6FF35]'
                    : 'bg-[#070B10] border border-slate-700/80 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5] text-[#C6FF35]" />
                ) : (
                  step.num
                )}
              </div>

              {/* Step Label directly beneath circle with active indicator underline */}
              <div className="flex flex-col items-center mt-1">
                <span
                  className={`font-mono text-[9.5px] sm:text-[10px] tracking-wider uppercase text-center transition-colors ${
                    isActive
                      ? 'text-[#C6FF35] font-bold drop-shadow-[0_0_8px_rgba(198,255,53,0.4)]'
                      : isCompleted
                      ? 'text-zinc-200 font-semibold'
                      : 'text-slate-500 font-medium'
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <div className="w-8 h-[2px] bg-[#C6FF35] mt-1 rounded-full shadow-[0_0_8px_rgba(198,255,53,0.8)]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Responsive Stepper */}
      <div className="sm:hidden flex flex-col items-center z-10 relative">
        <div className="flex items-center justify-between w-full max-w-xs relative px-2 mb-1">
          {STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const hasLine = idx < STEPS.length - 1;

            return (
              <div key={step.id} className="relative flex-1 flex items-center justify-center">
                {hasLine && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-1/2 w-full h-[1.5px] z-0 ${
                      step.id < currentStep ? 'bg-[#C6FF35]' : 'bg-slate-800'
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                    isActive
                      ? 'bg-[#C6FF35] text-black ring-2 ring-[#C6FF35]/40 shadow-[0_0_10px_rgba(198,255,53,0.5)]'
                      : isCompleted
                      ? 'bg-[#070B10] border border-[#C6FF35] text-[#C6FF35]'
                      : 'bg-[#070B10] border border-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[2.5]" /> : step.id}
                </div>
              </div>
            );
          })}
        </div>
        <div className="font-mono text-[10.5px] text-[#C6FF35] font-semibold tracking-wider uppercase mt-0.5">
          STEP {currentStep} OF 5: {STEPS[currentStep - 1]?.label}
        </div>
      </div>
    </div>
  );
};
