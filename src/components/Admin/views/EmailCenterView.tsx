import React, { useState } from 'react';
import {
  Send,
  Users,
  Crown,
  CheckCircle2,
  AlertTriangle,
  History,
  MailCheck,
  FileText,
  Search,
  Sparkles,
} from 'lucide-react';
import { EmailLog, TeamRegistration } from '../types';

interface EmailCenterViewProps {
  emailLogs: EmailLog[];
  teams: TeamRegistration[];
  onSendBulkEmail: (params: {
    subject: string;
    category: EmailLog['category'];
    recipientCategory: EmailLog['recipientCategory'];
    customRecipients?: string[];
    body: string;
  }) => { success: boolean; count: number; message: string };
}

export const EmailCenterView: React.FC<EmailCenterViewProps> = ({
  emailLogs,
  teams,
  onSendBulkEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');

  // Form states
  const [category, setCategory] = useState<EmailLog['category']>('Important Event Update');
  const [recipientCategory, setRecipientCategory] =
    useState<EmailLog['recipientCategory']>('All Participants');
  const [subject, setSubject] = useState(
    'Important Hackathon Update: Smart City Innovation 2026 Orientation Schedule'
  );
  const [body, setBody] = useState(
    `Dear Innovators,\n\nWe are pleased to announce the upcoming pre-hackathon orientation session for Smart City Innovation Hackathon 2026.\n\nDate: 12 April 2026\nTime: 5:00 PM - 6:30 PM (IST)\nPlatform: Microsoft Teams Live\n\nPlease ensure at least one team member joins the orientation to receive briefing on problem statements and evaluation criteria.\n\nWarm regards,\nMGM COE Hackathon Organizing Committee`
  );

  // Safety confirmation dialog state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Calculate recipient count dynamically
  const calculatedCount = React.useMemo(() => {
    if (recipientCategory === 'All Participants') {
      return teams.reduce((acc, t) => acc + (t.members?.length || t.teamSize), 0);
    }
    if (recipientCategory === 'All Team Leaders' || recipientCategory === 'All Registered Teams') {
      return teams.length;
    }
    return 1;
  }, [recipientCategory, teams]);

  const handleOpenSendConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setFeedbackMessage({ type: 'error', text: 'Please fill in both subject and body content.' });
      return;
    }
    setFeedbackMessage(null);
    setShowConfirmModal(true);
  };

  const handleExecuteSend = () => {
    const res = onSendBulkEmail({
      subject,
      category,
      recipientCategory,
      body,
    });

    setShowConfirmModal(false);
    if (res.success) {
      setFeedbackMessage({ type: 'success', text: res.message });
      setActiveTab('history');
    } else {
      setFeedbackMessage({ type: 'error', text: 'Failed to dispatch email. Please check server logs.' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Email Center — Bulk Email System
          </h1>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Dispatch registration confirmations, event schedules, problem statement releases, and broadcast announcements with built-in safeguards.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'compose'
                ? 'bg-[#C6FF35] text-black shadow-[0_0_12px_rgba(198,255,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Compose Email
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-[#C6FF35] text-black shadow-[0_0_12px_rgba(198,255,53,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Dispatch History ({emailLogs.length})</span>
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-mono flex items-center gap-2.5 ${
            feedbackMessage.type === 'success'
              ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {activeTab === 'compose' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Compose Form (Span 7) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
            <form onSubmit={handleOpenSendConfirmation} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EmailLog['category'])}
                  className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C6FF35]/40"
                >
                  <option value="Registration Confirmation">Registration Confirmation</option>
                  <option value="Important Event Update">Important Event Update</option>
                  <option value="Schedule Announcement">Schedule Announcement</option>
                  <option value="Problem Statement Release">Problem Statement Release</option>
                  <option value="General Announcement">General Announcement</option>
                </select>
              </div>

              {/* Recipient Target */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Choose Recipients
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'All Participants', label: 'All Participants', desc: 'Every registered individual' },
                    { id: 'All Team Leaders', label: 'Team Leaders Only', desc: 'Single point of contacts' },
                    { id: 'All Registered Teams', label: 'Registered Teams', desc: '1 email per team' },
                  ].map((target) => (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => setRecipientCategory(target.id as EmailLog['recipientCategory'])}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        recipientCategory === target.id
                          ? 'bg-[#C6FF35]/10 border-[#C6FF35]/50 text-white shadow-[0_0_15px_rgba(198,255,53,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{target.label}</span>
                      <span className="text-[10px] text-zinc-500 mt-0.5 block">{target.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter a clear, descriptive subject..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50 font-medium"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Message Content
                </label>
                <textarea
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Draft your announcement or instructions here..."
                  className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50 leading-relaxed font-sans"
                />
              </div>

              {/* Safety notice & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/5">
                <div className="text-xs font-mono text-zinc-400">
                  Total Recipients: <span className="text-[#C6FF35] font-bold">{calculatedCount} emails</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Preview & Confirm Send</span>
                </button>
              </div>
            </form>
          </div>

          {/* Email Preview Card (Span 5) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#070B14] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6FF35]" />
                  Live Email Template Preview
                </span>
                <span className="text-[10px] font-mono text-zinc-500">HTML Mock</span>
              </div>

              <div className="rounded-2xl bg-[#0F1626] border border-white/10 p-5 space-y-4 text-xs font-sans shadow-2xl">
                {/* Header branding */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#C6FF35] flex items-center justify-center text-black font-black text-xs">
                      S
                    </div>
                    <span className="font-extrabold text-white text-xs">
                      SMART CITY INNOVATION 2026
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C6FF35]">Official Notice</span>
                </div>

                {/* Subject */}
                <div className="text-sm font-bold text-white leading-snug">
                  {subject || 'Subject will appear here'}
                </div>

                {/* Meta details */}
                <div className="text-[10.5px] font-mono text-zinc-400 space-y-0.5 pb-2 border-b border-white/5">
                  <div>From: organizer@smartcityinnovation.org</div>
                  <div>To: {recipientCategory} ({calculatedCount} recipients)</div>
                </div>

                {/* Body Content */}
                <div className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {body || 'Your email text will be displayed in this preview.'}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-white/10 text-[10px] text-zinc-500 font-mono">
                  MGM College of Engineering & Technology, Nanded • IEI Maharashtra
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2 font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Safety Guarantee: Emails are sent individually to each recipient via backend batch queue. Addresses are completely shielded from other participants.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="p-6 rounded-3xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
          <h3 className="text-sm font-bold text-white mb-4">Email Dispatch Log</h3>
          <div className="space-y-3">
            {emailLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{log.subject}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-zinc-300 border border-white/10">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs mt-1 max-w-2xl line-clamp-2">
                    {log.bodyPreview}
                  </p>
                  <div className="flex items-center gap-3 text-[10.5px] font-mono text-zinc-500 mt-2">
                    <span>Sent By: {log.sentBy}</span>
                    <span>•</span>
                    <span>Target: {log.recipientCategory}</span>
                    <span>•</span>
                    <span>{log.sentAt}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      log.status === 'Sent'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-700/50 text-zinc-300'
                    }`}
                  >
                    {log.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#C6FF35]">
                    {log.recipientCount} Dispatched
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0A0F1A] border border-white/15 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">Confirm Bulk Email Broadcast</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                You are about to transmit this message to{' '}
                <strong className="text-[#C6FF35]">{calculatedCount} recipient(s)</strong> under{' '}
                <strong className="text-white">{recipientCategory}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-1">
              <div className="text-zinc-400">Subject: <span className="text-white">{subject}</span></div>
              <div className="text-zinc-400">Category: <span className="text-white">{category}</span></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteSend}
                className="px-5 py-2 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)] flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Yes, Transmit Bulk Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
