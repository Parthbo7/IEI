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
    <div className="w-full max-w-[860px] mx-auto px-4 my-5 sm:my-7 select-none shrink-0">
      {/* Desktop & Tablet Stepper */}
      <div className="hidden sm:flex items-start justify-between relative w-full">
        {STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const hasConnectingLine = idx < STEPS.length - 1;
          const isLineActive = step.id < currentStep;

          return (
            <div key={step.id} className="relative flex-1 flex flex-col items-center">
              {/* Connecting line to the next step: centered vertically at 18px */}
              {hasConnectingLine && (
                <div
                  className={`absolute top-[18px] left-1/2 w-full h-[1.5px] transition-colors duration-300 z-0 ${
                    isLineActive ? 'bg-[#C6FF35]' : 'bg-slate-800'
                  }`}
                />
              )}

              {/* Numbered Step Circle (36px) */}
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C6FF35] text-black ring-4 ring-[#C6FF35]/25 shadow-[0_0_20px_rgba(198,255,53,0.55)] scale-105'
                    : isCompleted
                    ? 'bg-[#070B10] border border-[#C6FF35] text-[#C6FF35]'
                    : 'bg-[#070B10] border border-slate-700/80 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5] text-[#C6FF35]" />
                ) : (
                  step.num
                )}
              </div>

              {/* Step Label directly beneath circle */}
              <span
                className={`mt-2 font-mono text-[10.5px] tracking-wider uppercase text-center transition-colors ${
                  isActive
                    ? 'text-[#C6FF35] font-bold drop-shadow-[0_0_8px_rgba(198,255,53,0.4)]'
                    : isCompleted
                    ? 'text-zinc-200 font-semibold'
                    : 'text-slate-500 font-medium'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Responsive Stepper */}
      <div className="sm:hidden flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-xs relative px-2 mb-2">
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
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                    isActive
                      ? 'bg-[#C6FF35] text-black ring-2 ring-[#C6FF35]/40 shadow-[0_0_12px_rgba(198,255,53,0.5)]'
                      : isCompleted
                      ? 'bg-[#070B10] border border-[#C6FF35] text-[#C6FF35]'
                      : 'bg-[#070B10] border border-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.id}
                </div>
              </div>
            );
          })}
        </div>
        <div className="font-mono text-xs text-[#C6FF35] font-semibold tracking-wider uppercase mt-1">
          STEP {currentStep} OF 5: {STEPS[currentStep - 1]?.label}
        </div>
      </div>
    </div>
  );
};
