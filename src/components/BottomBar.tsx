import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { HACKATHON_CONFIG } from '../config/hackathonConfig';

interface BottomBarProps {
  onLocationClick?: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ onLocationClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-30 h-11 bg-[#0B0F14]/90 backdrop-blur-md border-t border-[#2B333A] text-xs font-mono select-none px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Left: Venue & Host College Location */}
      <div
        onClick={onLocationClick}
        className="flex items-center gap-2 cursor-pointer group"
        title="View College Venue & Travel Guidelines"
      >
        <div className="w-5 h-5 rounded-[2px] bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_10px_rgba(198,255,53,0.4)] group-hover:scale-105 transition-transform">
          <MapPin className="w-3 h-3 text-black" />
        </div>
        <span className="text-[#AAB4C0] group-hover:text-white transition-colors text-[11px] md:text-xs">
          <strong className="text-[#F4F6F8] font-semibold">{HACKATHON_CONFIG.organizer.institution}</strong>
          <span className="hidden sm:inline">, {HACKATHON_CONFIG.organizer.location}</span>
        </span>
      </div>

      {/* Center: Copyright & Attribution */}
      <div className="text-center text-[#7E8895] text-[11px] hidden md:block">
        © 2026{' '}
        <span className="text-[#AAB4C0]">
          {HACKATHON_CONFIG.organizer.chapter}
        </span>
        {' · '}IT Department · Smart City Hackathon
      </div>

      {/* Right: Confirmed Event Schedule Dates */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B0F14]/70 border border-white/[0.08] text-[#AAB4C0] text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-[#C6FF35]" />
          <span className="text-[#F4F6F8] font-semibold">{HACKATHON_CONFIG.eventDates.display}</span>
        </div>
        <div className="hidden lg:flex items-center gap-1 text-[10px] text-[#C6FF35] font-mono px-2 py-0.5 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/30">
          <Sparkles className="w-2.5 h-2.5" />
          <span>48H Hackathon</span>
        </div>
      </div>
    </footer>
  );
};
