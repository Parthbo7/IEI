import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, KeyRound, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { changeTeamPassword } from '../dashboardService';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentPassword) {
      setError('Please enter your current team password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await changeTeamPassword(currentPassword, newPassword);
      if (res.success) {
        setSuccess(res.message);
        setTimeout(() => {
          onClose();
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setSuccess(null);
        }, 1500);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Failed to update password. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-md bg-[#090E17]/95 border border-[#C6FF35]/30 rounded-2xl shadow-[0_0_50px_rgba(198,255,53,0.15)] overflow-hidden p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">Change Team Password</h3>
              <p className="text-xs text-zinc-400 font-sans">Update password for your team</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:text-[#C6FF35] flex items-center justify-center text-zinc-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 rounded-xl bg-[#C6FF35]/10 border border-[#C6FF35]/30 flex items-center gap-2 text-[#C6FF35] text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Current Password <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full h-11 pl-4 pr-10 bg-[#0B111B] border border-white/[0.12] rounded-xl text-white text-xs focus:outline-none focus:border-[#C6FF35]"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              New Password <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full h-11 pl-4 pr-10 bg-[#0B111B] border border-white/[0.12] rounded-xl text-white text-xs focus:outline-none focus:border-[#C6FF35]"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Confirm New Password <span className="text-[#C6FF35]">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full h-11 px-4 bg-[#0B111B] border border-white/[0.12] rounded-xl text-white text-xs focus:outline-none focus:border-[#C6FF35]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] text-xs font-mono text-zinc-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d5ff55] disabled:opacity-50 flex items-center gap-1.5"
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save New Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
