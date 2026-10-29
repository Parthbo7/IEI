import React from 'react';
import { Megaphone, ChevronRight, Calendar, Bell, ArrowRight } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementsCardProps {
  announcements: Announcement[];
  onViewAllClick: () => void;
  onSelectAnnouncement?: (announcement: Announcement) => void;
}

export const AnnouncementsCard: React.FC<AnnouncementsCardProps> = ({
  announcements,
  onViewAllClick,
  onSelectAnnouncement,
}) => {
  return (
    <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-7 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-sans">Announcements</h3>
            <p className="text-xs text-zinc-400 font-sans">Stay updated with the latest news and important information.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAllClick}
          className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-4 space-y-2.5">
        {announcements.length === 0 ? (
          <div className="py-8 text-center">
            <Bell className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
            <h5 className="text-sm font-bold text-zinc-300">No announcements yet</h5>
            <p className="text-xs text-zinc-500 mt-1">Important updates from the organizing team will appear here.</p>
          </div>
        ) : (
          announcements.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAnnouncement?.(item)}
              className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.015] border border-white/[0.05] hover:border-[#C6FF35]/30 hover:bg-white/[0.03] transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-[#C6FF35] group-hover:border-[#C6FF35]/30 transition-colors shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs sm:text-[13px] font-bold text-white group-hover:text-[#C6FF35] transition-colors truncate">
                      {item.title}
                    </h5>
                    {item.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-block">
                  {item.date}
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#C6FF35] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
