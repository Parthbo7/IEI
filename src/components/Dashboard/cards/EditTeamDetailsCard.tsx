import React, { useState } from 'react';
import { Edit3, Users, Building2, Lock, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { TeamProfile } from '../types';

interface EditTeamDetailsCardProps {
  teamProfile: TeamProfile;
  onSave: (updates: Partial<TeamProfile>) => Promise<{ success: boolean; message: string }>;
  onChangePasswordClick: () => void;
}

export const EditTeamDetailsCard: React.FC<EditTeamDetailsCardProps> = ({
  teamProfile,
  onSave,
  onChangePasswordClick,
}) => {
  const [college, setCollege] = useState(teamProfile.college || '');
  const [description, setDescription] = useState(teamProfile.description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const maxDescLength = 200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!college.trim()) {
      setStatusMessage({ text: 'College / Institution cannot be empty.', type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const result = await onSave({
        college: college.trim(),
        description: description.trim(),
      });

      if (result.success) {
        setStatusMessage({ text: result.message || 'Team details updated successfully.', type: 'success' });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ text: result.message || 'Failed to save changes.', type: 'error' });
      }
    } catch {
      setStatusMessage({ text: 'A network error occurred while updating details.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-7 flex flex-col justify-between transition-all">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">Edit Team Details</h3>
              <p className="text-xs text-zinc-400 font-sans">Update your team information. Some fields may be restricted.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#C6FF35]/60 hover:text-[#C6FF35] text-xs font-mono text-zinc-200 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C6FF35]" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-[#C6FF35]" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-[#C6FF35]/10 border border-[#C6FF35]/30 text-[#C6FF35]'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Team Name */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Team Name <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Users className="w-4 h-4" />
              </div>
              <input
                type="text"
                disabled
                value={teamProfile.teamName}
                title="Team Name is verified and locked to prevent impersonation."
                className="w-full h-11 pl-10 pr-3 bg-[#0A101A]/60 border border-white/[0.08] rounded-xl text-zinc-300 text-xs font-sans cursor-not-allowed"
              />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 mt-1 block">Verified team name (locked)</span>
          </div>

          {/* College / Institution */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              College / Institution <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Building2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter college name"
                className="w-full h-11 pl-10 pr-3 bg-[#0A101A]/90 border border-white/[0.12] rounded-xl text-white text-xs font-sans focus:outline-none focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35] transition-all"
              />
            </div>
          </div>

          {/* Team Password & Change Password Action */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Team Password
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  disabled
                  value="••••••••"
                  className="w-full h-11 pl-10 pr-3 bg-[#0A101A]/60 border border-white/[0.08] rounded-xl text-zinc-400 text-xs tracking-widest cursor-not-allowed"
                />
              </div>
              <button
                type="button"
                onClick={onChangePasswordClick}
                className="h-11 px-3 rounded-xl bg-white/[0.03] border border-white/[0.12] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono text-zinc-300 transition-colors cursor-pointer shrink-0"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Team Description Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Team Description
            </label>
            <span className="text-[11px] font-mono text-zinc-500">
              {description.length}/{maxDescLength}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= maxDescLength) {
                setDescription(e.target.value);
              }
            }}
            rows={2}
            placeholder="Brief overview of your team's focus area (e.g., Innovating for smarter, greener cities)."
            className="w-full p-3 bg-[#0A101A]/90 border border-white/[0.12] rounded-xl text-white text-xs font-sans placeholder:text-zinc-500 focus:outline-none focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35] transition-all resize-none"
          />
        </div>
      </form>
    </div>
  );
};
