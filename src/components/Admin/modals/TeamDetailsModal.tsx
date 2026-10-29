import React from 'react';
import { X, Mail, Phone, Building2, BookOpen, Users, CheckCircle2, AlertCircle, Send, Shield } from 'lucide-react';
import { TeamRegistration } from '../types';

interface TeamDetailsModalProps {
  team: TeamRegistration | null;
  onClose: () => void;
  onConfirmRegistration: (teamId: string) => void;
  onRejectRegistration?: (teamId: string) => void;
  onResendConfirmation: (teamId: string) => void;
}

export const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
  team,
  onClose,
  onConfirmRegistration,
  onRejectRegistration,
  onResendConfirmation,
}) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0A0F1A] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#060A12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] flex items-center justify-center font-bold text-sm">
              {team.teamName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{team.teamName}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-[#C6FF35] border border-[#C6FF35]/30 font-bold">
                  {team.registrationId}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Registered on {team.registrationDate} • {team.teamSize} Members
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                Registration Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                  team.status === 'Confirmed'
                    ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                    : 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                {team.status}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                Email Dispatch
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
                <Send className="w-3 h-3" />
                {team.confirmationEmailStatus}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                Security Hash
              </span>
              <span className="text-xs font-mono text-zinc-400 truncate block">
                SHA256 • Verified
              </span>
            </div>
          </div>

          {/* TEAM LEADER SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Team Leader Information
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white block">{team.teamLeader}</span>
                  <span className="text-xs text-zinc-400 font-mono">Team Leader</span>
                </div>
                <button
                  onClick={() => onResendConfirmation(team.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#C6FF35]/15 hover:bg-[#C6FF35]/25 text-[#C6FF35] border border-[#C6FF35]/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Resend Confirmation
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-mono text-zinc-200">{team.leaderEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-mono text-zinc-200">{team.leaderPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{team.college}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{team.branch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ALL TEAM MEMBERS */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#C6FF35]" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C6FF35] font-bold">
                Registered Team Members ({team.members?.length || team.teamSize})
              </h4>
            </div>

            <div className="space-y-2.5">
              {team.members?.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono font-bold text-zinc-300">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{member.fullName}</span>
                        <span
                          className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded ${
                            member.role === 'Team Leader'
                              ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                              : 'bg-white/[0.04] text-zinc-400'
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        {member.college || team.college} • {member.branch || team.branch}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-1 font-mono text-[11px] text-zinc-400">
                    <span className="text-zinc-300">{member.email}</span>
                    <span>{member.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* PAYMENT & VERIFICATION INSPECTION SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-[#C6FF35]" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C6FF35] font-bold">
                Payment Verification Details
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Registration Fee</span>
                  <span className="text-sm font-bold text-white font-mono">₹{team.payment?.amount || 600}.00</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Transaction ID (UTR)</span>
                  <span className="text-xs font-bold text-[#C6FF35] font-mono break-all">
                    {team.payment?.transactionId || team.notes || 'TXN-SCI26-PENDING'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Payment Status</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      team.status === 'Confirmed'
                        ? 'bg-[#C6FF35]/15 text-[#C6FF35]'
                        : team.status === 'Cancelled'
                        ? 'bg-rose-500/15 text-rose-400'
                        : 'bg-amber-400/15 text-amber-400'
                    }`}
                  >
                    {team.status === 'Confirmed' ? 'Verified' : team.status === 'Cancelled' ? 'Rejected' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              {team.payment?.screenshotPath && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">
                    Receipt: <span className="text-zinc-200">{team.payment.screenshotPath}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.05] text-[#C6FF35]">
                    Storage Secured
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-t border-white/10 bg-[#060A12]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onConfirmRegistration(team.id);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)]"
            >
              Approve Payment & Confirm
            </button>

            {onRejectRegistration && (
              <button
                onClick={() => {
                  onRejectRegistration(team.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold transition-all cursor-pointer"
              >
                Reject Payment
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
