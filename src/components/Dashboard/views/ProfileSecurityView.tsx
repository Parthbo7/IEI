import React from 'react';
import { ShieldCheck, KeyRound, LogOut, ArrowLeft, Lock, Smartphone, Clock, CheckCircle } from 'lucide-react';
import { TeamProfile } from '../types';

interface ProfileSecurityViewProps {
  teamProfile: TeamProfile;
  onBackToDashboard: () => void;
  onChangePasswordClick: () => void;
  onLogout: () => void;
}

export const ProfileSecurityView: React.FC<ProfileSecurityViewProps> = ({
  teamProfile,
  onBackToDashboard,
  onChangePasswordClick,
  onLogout,
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

        <span className="text-xs font-mono text-[#C6FF35] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>SECURE PARTICIPANT SESSION</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Account Details & Session */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
              <div className="w-10 h-10 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">Account & Security</h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Manage your authenticated credentials and session privacy.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Team Identifier</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{teamProfile.teamName}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30">
                  {teamProfile.referenceId}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Primary Contact Email</span>
                  <span className="text-sm font-medium text-white mt-0.5 block">{teamProfile.leaderEmail}</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C6FF35]" /> Verified
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Active Device Session</span>
                  <span className="text-xs font-mono text-zinc-300 mt-0.5 block">
                    Browser Session • End-to-end tokenized
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#C6FF35]">Active Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Change Password Card */}
          <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-sans">Team Password</h4>
              <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                Update your team password. Ensure all team members are notified of credentials update.
              </p>
            </div>

            <button
              type="button"
              onClick={onChangePasswordClick}
              className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono text-zinc-200 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6FF35]" />
              <span>Change Team Password</span>
            </button>
          </div>

          {/* End Session Card */}
          <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-rose-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-sans">Logout Active Session</h4>
              <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                Terminate your session and clear local authorization keys from this browser.
              </p>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="w-full py-3 px-4 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 text-rose-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT NOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
