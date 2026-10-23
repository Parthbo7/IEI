import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        const next = Math.min(100, prev + Math.max(1, (progress - prev) * 0.2));
        if (next >= 99.5 && progress >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 400);
          setTimeout(onComplete, 900);
          return 100;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#191d24] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
        {/* Neon Green Logo Mark */}
        <div className="relative flex justify-center items-center h-16 w-16 aspect-square rounded-[6px] border border-[#1F1F1F] bg-[#C1F436] shadow-[0_0_25px_rgba(193,244,54,0.35)] transform transition-transform duration-500 hover:scale-105">
          <svg width="32" height="36" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1524 3.33203C8.00879 3.33203 6.02803 4.47562 4.95624 6.33203L1.10723 12.9987C0.0354385 14.8551 0.0354366 17.1423 1.10723 18.9987L4.95624 25.6654C6.02803 27.5218 8.00879 28.6654 10.1524 28.6654H17.8504C19.994 28.6654 21.9747 27.5218 23.0465 25.6654L26.8955 18.9987C27.9673 17.1423 27.9673 14.8551 26.8955 12.9987L23.0465 6.33203C21.9747 4.47563 19.994 3.33203 17.8504 3.33203H10.1524ZM17.8504 7.33203L13.0391 7.33203C12.2693 7.33203 11.7883 8.16529 12.1738 8.83162C13.3631 10.8875 14.5553 12.9418 15.7428 14.9987C16.1001 15.6175 16.1001 16.3799 15.7428 16.9987C14.5553 19.0556 13.3631 21.1099 12.1738 23.1658C11.7883 23.8321 12.2693 24.6654 13.0391 24.6654H17.8504C18.5649 24.6654 19.2252 24.2842 19.5824 23.6654L23.4314 16.9987C23.7887 16.3799 23.7887 15.6175 23.4314 14.9987L19.5824 8.33203C19.2252 7.71323 18.5649 7.33203 17.8504 7.33203Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h1 className="text-white font-mono text-xl md:text-2xl font-bold tracking-tight uppercase">
            SMART CITY INNOVATION
          </h1>
          <p className="text-[#BABCBF] text-xs font-mono tracking-wide">
            IEI MGM COE · Loading urban telemetry...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 h-1 bg-[#28292B] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C1F436] to-[#9ED834] rounded-full shadow-[0_0_12px_rgba(193,244,54,0.6)] transition-all duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Pulsing Dots */}
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 bg-[#C1F436] rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-[#C1F436] rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-1.5 h-1.5 bg-[#C1F436] rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
};
