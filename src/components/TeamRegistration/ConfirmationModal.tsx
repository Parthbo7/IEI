import React, { useState } from 'react';
import { CheckCircle2, Home, Copy, Check, X, Clock, AlertCircle } from 'lucide-react';
import { RegistrationFormData } from './types';

interface ConfirmationModalProps {
  isOpen: boolean;
  referenceId: string;
  teamName: string;
  formData: RegistrationFormData;
  onReturnHome: () => void;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  referenceId,
  teamName,
  formData,
  onReturnHome,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyReference = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#0A0F15] border border-white/[0.12] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col text-left">
        {/* Close Button at Top Right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#C6FF35]/50 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#C6FF35]/10 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35] shadow-[0_0_20px_rgba(198,255,53,0.2)] shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="font-mono text-[11px] text-[#C6FF35] font-bold tracking-widest uppercase block">
              SUBMISSION RECEIVED
            </span>
            <h3 className="font-tech text-white text-xl sm:text-2xl font-black tracking-tight uppercase">
              THANK YOU FOR REGISTERING!
            </h3>
          </div>
        </div>

        {/* Exact Required Confirmation Message */}
        <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed pb-5 border-b border-white/[0.08]">
          <p>
            Thank you for registering for <strong>Smart City Innovation Hackathon 2026</strong>.
          </p>
          <p>
            We have successfully received your registration submission and payment details. Our organizing team will review the information, and we will soon share a confirmation email with you.
          </p>
          <p className="text-zinc-400 text-xs font-mono">
            Please keep your transaction reference number for future communication.
          </p>
        </div>

        {/* Summary Badges */}
        <div className="py-4 space-y-2.5 font-mono text-xs border-b border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">STATUS</span>
            <span className="text-amber-300 font-bold px-2.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 text-[11px]">
              REGISTRATION SUBMITTED — AWAITING VERIFICATION
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">REGISTERED TEAM</span>
            <span className="text-white font-bold text-sm">{teamName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">REGISTRATION FEE</span>
            <span className="text-[#C6FF35] font-bold">₹{formData.payment.registrationFee} (One-time team fee)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500">REFERENCE ID</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold bg-black/60 px-2.5 py-1 rounded border border-white/[0.12] text-xs">
                {referenceId}
              </span>
              <button
                type="button"
                onClick={handleCopyReference}
                title="Copy Reference ID"
                className="p-1.5 text-zinc-400 hover:text-[#C6FF35] hover:bg-white/[0.05] rounded transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#C6FF35]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Popup Action Buttons */}
        <div className="pt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold border border-white/[0.15] text-zinc-300 hover:text-white hover:border-white/[0.3] hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            CLOSE
          </button>

          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-[#C6FF35] text-black hover:bg-[#b0ec22] transition-all shadow-[0_0_20px_rgba(198,255,53,0.35)] cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
