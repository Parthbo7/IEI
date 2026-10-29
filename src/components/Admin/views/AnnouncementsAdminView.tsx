import React, { useState } from 'react';
import { Megaphone, Plus, Eye, Send, CheckCircle2, Archive, Trash2 } from 'lucide-react';
import { Announcement } from '../../Dashboard/types';

interface AnnouncementsAdminViewProps {
  announcements: Announcement[];
  onCreateAnnouncement: (a: Omit<Announcement, 'id'>) => void;
  onSendAnnouncementEmail: (announcement: Announcement) => void;
}

export const AnnouncementsAdminView: React.FC<AnnouncementsAdminViewProps> = ({
  announcements,
  onCreateAnnouncement,
  onSendAnnouncementEmail,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<'Priority' | 'Info' | 'General'>('Info');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    onCreateAnnouncement({
      title,
      description: content,
      date: dateStr,
      priority: tag === 'Priority' ? 'HIGH' : 'NORMAL',
      category: tag === 'Priority' ? 'UPDATE' : 'REGISTRATION',
    });

    setTitle('');
    setContent('');
    setShowCreateModal(false);
    setFeedback('Announcement published to participant dashboard successfully!');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Announcement Management
          </h1>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Publish official announcements directly to the Participant Dashboard notifications feed and optionally dispatch via email.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Announcement</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Announcements List */}
      <div className="grid grid-cols-1 gap-3.5">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/15 transition-all"
          >
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-white">{item.title}</span>
                <span
                  className={`text-[9.5px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    item.priority === 'HIGH'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                  }`}
                >
                  {item.priority === 'HIGH' ? 'Priority' : item.category || 'Info'}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">{item.date}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onSendAnnouncementEmail(item)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#C6FF35]/15 text-zinc-300 hover:text-[#C6FF35] text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/5"
                title="Send as Email Broadcast"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Blast</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Announcement */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0A0F1A] border border-white/15 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-4">
            <h3 className="text-lg font-black text-white">Create Official Announcement</h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule Update or Mentor Allocation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Priority Tag
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as 'Priority' | 'Info' | 'General')}
                  className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C6FF35]/40"
                >
                  <option value="Info">Info (Standard)</option>
                  <option value="Priority">Priority (Urgent)</option>
                  <option value="General">General (Notice)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Announcement Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the full announcement text visible to participants..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50 leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C6FF35] text-black font-extrabold hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)]"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
