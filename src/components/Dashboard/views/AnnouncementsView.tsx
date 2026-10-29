import React from 'react';
import { Megaphone, Calendar, ArrowLeft, Bell, AlertCircle, Info, Sparkles } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  onBackToDashboard: () => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  onBackToDashboard,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO DASHBOARD</span>
        </button>

        <span className="text-xs font-mono text-zinc-400">
          Showing <span className="text-[#C6FF35] font-bold">{announcements.length}</span> Official Updates
        </span>
      </div>

      {/* Announcements List Container */}
      <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
          <div className="w-10 h-10 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Official Announcements</h2>
            <p className="text-xs text-zinc-400 font-sans">
              Critical updates, deadlines, and guidelines released by the organizing committee.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {announcements.length === 0 ? (
            <div className="py-12 text-center">
              <Bell className="w-10 h-10 text-zinc-500 mx-auto mb-2" />
              <h4 className="text-base font-bold text-zinc-300">No announcements yet</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Important updates from the organizing team will appear here.
              </p>
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-[#C6FF35]/35 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C6FF35]" />
                    <h3 className="text-base font-bold text-white group-hover:text-[#C6FF35] transition-colors font-sans">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {item.date}
                    </span>
                    {item.priority === 'HIGH' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold uppercase">
                        Important
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pl-4.5 border-l-2 border-white/[0.08] mt-2">
                  {item.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
