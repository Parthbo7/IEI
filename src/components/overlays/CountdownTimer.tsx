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
      <div className="flex items-center justify-center gap-2.5 py-3 px-6 rounded-2xl bg-[#0B0F14]/85 border-[1.5px] border-[#C6FF35] shadow-[0_0_20px_rgba(198,255,53,0.25)] backdrop-blur-md">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF35] animate-ping" />
        <span className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-widest text-[#C6FF35]">
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
    <div className="flex items-center justify-center gap-2 sm:gap-3.5 md:gap-4.5 mx-auto max-w-full">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          {/* Individual Boxed Countdown Card */}
          <div className="hero-countdown-box">
            <span className="font-tech text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4F6F8] leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {unit.value}
            </span>
            <span className="mt-2 sm:mt-2.5 font-mono text-[9px] sm:text-[11px] md:text-xs tracking-[0.22em] text-[#AAB4C0] uppercase font-semibold select-none">
              {unit.label}
            </span>
          </div>

          {/* Separator Colons Outside Cards */}
          {index < units.length - 1 && (
            <div className="hero-countdown-colon px-0.5 sm:px-1">
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
