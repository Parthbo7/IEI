import React, { useState } from 'react';
import {
  FileCode2,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Eye,
  Send,
  AlertCircle,
  Archive,
  ExternalLink,
  Sliders,
  Check,
} from 'lucide-react';
import { ProblemStatementAdminItem } from '../types';

interface ProblemStatementsAdminViewProps {
  problemStatements: ProblemStatementAdminItem[];
  isGlobalPublished: boolean;
  onPublishAll: () => { count: number; message: string };
  onUnpublishAll: () => void;
  onToggleStatus: (id: string, newStatus: 'Published' | 'Draft' | 'Archived') => void;
  onCreateNew: () => void;
  onPreview: (ps: ProblemStatementAdminItem) => void;
  onEmailNotificationTrigger: () => void;
}

export const ProblemStatementsAdminView: React.FC<ProblemStatementsAdminViewProps> = ({
  problemStatements,
  isGlobalPublished,
  onPublishAll,
  onUnpublishAll,
  onToggleStatus,
  onCreateNew,
  onPreview,
  onEmailNotificationTrigger,
}) => {
  const [showPublishConfirmModal, setShowPublishConfirmModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const publishedCount = problemStatements.filter((p) => p.status === 'Published').length;
  const draftCount = problemStatements.filter((p) => p.status === 'Draft').length;

  const handleExecutePublishAll = () => {
    const res = onPublishAll();
    setShowPublishConfirmModal(false);
    setNotificationMsg(res.message);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Problem Statement Management & Publishing
          </h1>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Create, edit, draft and officially release hackathon challenges. Currently, participant dashboard remains in{' '}
            <strong className="text-amber-400">COMING SOON</strong> until published here.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 font-bold text-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C6FF35]" />
            <span>+ Create Challenge</span>
          </button>

          {!isGlobalPublished ? (
            <button
              onClick={() => setShowPublishConfirmModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_20px_rgba(198,255,53,0.35)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>PUBLISH PROBLEM STATEMENTS</span>
            </button>
          ) : (
            <button
              onClick={onUnpublishAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Revert to Coming Soon</span>
            </button>
          )}
        </div>
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
          <button
            onClick={onEmailNotificationTrigger}
            className="underline hover:text-white cursor-pointer ml-3 shrink-0"
          >
            Email Participants About Release →
          </button>
        </div>
      )}

      {/* Global Status Banner */}
      <div className="p-5 rounded-3xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isGlobalPublished
                ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}
          >
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white">
                Participant Dashboard Status:
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  isGlobalPublished
                    ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                    : 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                }`}
              >
                {isGlobalPublished ? 'LIVE & UNLOCKED' : 'COMING SOON (LOCKED)'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isGlobalPublished
                ? `Participants are currently viewing ${publishedCount} released challenges.`
                : 'Participants currently see the Coming Soon placeholder with release countdown.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-zinc-500 block text-[10px]">PREPARED</span>
            <span className="text-white font-bold">{problemStatements.length} Challenges</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 block text-[10px]">PUBLISHED</span>
            <span className="text-[#C6FF35] font-bold">{publishedCount} Live</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 block text-[10px]">DRAFTS</span>
            <span className="text-amber-400 font-bold">{draftCount} Pending</span>
          </div>
        </div>
      </div>

      {/* Problem Statements List Table */}
      <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                <th className="pb-3.5 font-semibold">PS ID</th>
                <th className="pb-3.5 font-semibold">Title & Track</th>
                <th className="pb-3.5 font-semibold">Category</th>
                <th className="pb-3.5 font-semibold">Requirements</th>
                <th className="pb-3.5 font-semibold">Created</th>
                <th className="pb-3.5 font-semibold">Status</th>
                <th className="pb-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {problemStatements.map((ps) => (
                <tr key={ps.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 font-mono text-[#C6FF35] font-bold whitespace-nowrap">
                    {ps.referenceCode}
                  </td>
                  <td className="py-4">
                    <div className="max-w-md">
                      <span className="font-bold text-white text-xs block leading-snug">
                        {ps.title}
                      </span>
                      <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        {ps.shortDescription}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 font-mono text-zinc-300 whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/5 text-[11px]">
                      {ps.category}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-zinc-400 text-[11px]">
                    {ps.requirements.length} Items
                  </td>
                  <td className="py-4 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                    {ps.createdAt}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        ps.status === 'Published'
                          ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                          : ps.status === 'Draft'
                          ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                          : 'bg-zinc-700/50 text-zinc-400'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {ps.status}
                    </span>
                  </td>
                  <td className="py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreview(ps)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#C6FF35]/20 text-zinc-400 hover:text-[#C6FF35] transition-colors cursor-pointer"
                        title="Preview Challenge"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {ps.status === 'Draft' ? (
                        <button
                          onClick={() => onToggleStatus(ps.id, 'Published')}
                          className="px-2.5 py-1 rounded-lg bg-[#C6FF35]/15 hover:bg-[#C6FF35]/25 text-[#C6FF35] border border-[#C6FF35]/30 text-[10.5px] font-mono font-bold transition-colors cursor-pointer"
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={() => onToggleStatus(ps.id, 'Draft')}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 text-[10.5px] font-mono transition-colors cursor-pointer"
                        >
                          Unpublish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal to Publish All */}
      {showPublishConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0A0F1A] border border-white/15 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">Publish Problem Statements to All Participants?</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                This action will instantly unlock the problem statements on every participant's dashboard, replacing the{' '}
                <strong className="text-amber-400">COMING SOON</strong> banner with full challenge briefs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-1">
              <div className="text-zinc-400">
                Challenges to Release: <span className="text-[#C6FF35] font-bold">{problemStatements.length} Tracks</span>
              </div>
              <div className="text-zinc-400">
                Visibility: <span className="text-white">Public to all registered hackathon teams</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPublishConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecutePublishAll}
                className="px-5 py-2 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)] flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Yes, Publish Challenges Live</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
