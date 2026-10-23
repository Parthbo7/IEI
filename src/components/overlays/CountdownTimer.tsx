import React, { useState, useEffect } from 'react';

// Target date: 3 December 2026 at 00:00:00 IST (Indian Standard Time, UTC+05:30)
const TARGET_TIMESTAMP = new Date('2026-12-03T00:00:00+05:30').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const difference = TARGET_TIMESTAMP - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isComplete: false
  };
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  if (timeLeft.isComplete) {
    return (
      <div className="flex items-center justify-center gap-2.5 py-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF35] animate-ping" />
        <span className="font-mono text-base sm:text-lg font-bold tracking-widest text-[#C6FF35]">
          EVENT IS LIVE NOW · 03–04 DEC 2026
        </span>
      </div>
    );
  }

  const units = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) }
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-10 lg:gap-12 mx-auto w-full max-w-2xl">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex-1 flex flex-col items-center min-w-[60px] sm:min-w-[80px] md:min-w-[96px]">
            <span className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-[#F4F6F8] leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              {unit.value}
            </span>
            <span className="mt-2.5 sm:mt-3 font-mono text-[10px] sm:text-xs md:text-[13px] tracking-[0.24em] text-[#AAB4C0] uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {unit.label}
            </span>
          </div>

          {index < units.length - 1 && (
            <div className="pb-5 sm:pb-6 select-none">
              <span className="text-[#C6FF35] font-mono text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-[0_0_10px_rgba(198,255,53,0.55)]">
                :
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
