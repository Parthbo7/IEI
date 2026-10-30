import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  Home,
  Clock,
  Users,
  CreditCard,
  Tag,
  FileText,
  Info,
  Hourglass
} from 'lucide-react';
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyReference = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referenceId);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = referenceId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const displayTeamName = teamName || formData.leader.teamName || 'Registered Team';
  const displayFee = formData.payment?.registrationFee || 600;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container: 850–900px Desktop Width, Dark Navy Glassmorphism & Subtle Neon-Green Border */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-[880px] bg-[#070B12]/95 border border-[#C6FF35]/30 rounded-2xl sm:rounded-[24px] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(198,255,53,0.12)] p-5 sm:p-7 md:p-9 flex flex-col text-left overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Subtle Ambient Radial Neon Glow behind modal */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[#C6FF35]/[0.08] rounded-full blur-3xl pointer-events-none" />

        {/* =========================================================================
            1. MODAL TOP HEADER & BRANDING
            ========================================================================= */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-3">
            {/* Hackathon Logo Mark */}
            <div className="w-8 h-8 rounded-lg bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_14px_rgba(198,255,53,0.35)] shrink-0">
              <svg
                width="16"
                height="18"
                viewBox="0 0 28 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1524 3.33203C8.00879 3.33203 6.02803 4.47562 4.95624 6.33203L1.10723 12.9987C0.0354385 14.8551 0.0354366 17.1423 1.10723 18.9987L4.95624 25.6654C6.02803 27.5218 8.00879 28.6654 10.1524 28.6654H17.8504C19.994 28.6654 21.9747 27.5218 23.0465 25.6654L26.8955 18.9987C27.9673 17.1423 27.9673 14.8551 26.8955 12.9987L23.0465 6.33203C21.9747 4.47563 19.994 3.33203 17.8504 3.33203H10.1524ZM17.8504 7.33203L13.0391 7.33203C12.2693 7.33203 11.7883 8.16529 12.1738 8.83162C13.3631 10.8875 14.5553 12.9418 15.7428 14.9987C16.1001 15.6175 16.1001 16.3799 15.7428 16.9987C14.5553 19.0556 13.3631 21.1099 12.1738 23.1658C11.7883 23.8321 12.2693 24.6654 13.0391 24.6654H17.8504C18.5649 24.6654 19.2252 24.2842 19.5824 23.6654L23.4314 16.9987C23.7887 16.3799 23.7887 15.6175 23.4314 14.9987L19.5824 8.33203C19.2252 7.71323 18.5649 7.33203 17.8504 7.33203Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-tech text-xs sm:text-sm font-bold tracking-wider text-[#C6FF35] leading-tight">
                SMART CITY INNOVATION HACKATHON 2026
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                MGM's College of Engineering | IEI Student Chapter
              </span>
            </div>
          </div>

          {/* Close (X) button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#C6FF35]/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* =========================================================================
            2. SUCCESS SECTION: SKYLINE SILHOUETTE, CHECKMARK & HEADINGS
            ========================================================================= */}
        <div className="relative pt-4 sm:pt-6 pb-4 sm:pb-5 flex flex-col items-center text-center z-10">
          {/* Cyber City Skyline Graphic Silhouette in Background */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-full max-w-lg pointer-events-none opacity-35">
            <svg
              className="w-full h-16 sm:h-20 text-[#C6FF35]"
              viewBox="0 0 600 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 78 H600 V72 H580 V45 H550 V72 H520 V25 H490 V15 H460 V35 H440 V72 H410 V50 H380 V72 H350 V10 H320 V72 H280 V30 H250 V72 H230 V55 H200 V72 H170 V20 H140 V72 H110 V40 H80 V72 H50 V60 H20 V72 H0 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <line x1="0" y1="76" x2="600" y2="76" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Animated Circular Neon-Green Checkmark Badge */}
          <div className="relative mb-3 flex items-center justify-center">
            {/* Outer ambient glow */}
            <div className="absolute w-28 h-28 rounded-full bg-[#C6FF35]/20 blur-xl pointer-events-none" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C6FF35] bg-[#0A0E17] flex items-center justify-center text-[#C6FF35] shadow-[0_0_35px_rgba(198,255,53,0.45)] ring-4 ring-[#C6FF35]/20">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-[#C6FF35] stroke-[3.2]" />
            </div>
          </div>

          {/* Small Uppercase Label */}
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C6FF35] uppercase block mb-1.5 drop-shadow-[0_0_10px_rgba(198,255,53,0.35)]">
            SUBMISSION RECEIVED
          </span>

          {/* Dominant Main Heading: THANK YOU FOR (white) REGISTERING! (neon-green) */}
          <h2 className="font-tech text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight uppercase leading-none mb-2.5">
            <span className="text-white">THANK YOU FOR </span>
            <span className="text-[#C6FF35] drop-shadow-[0_0_24px_rgba(198,255,53,0.5)]">REGISTERING!</span>
          </h2>

          {/* Supporting Confirmation Copy */}
          <div className="space-y-1 font-sans text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            <p>
              Thank you for registering for <strong className="text-white font-semibold">Smart City Innovation Hackathon 2026</strong>.
            </p>
            <p className="text-zinc-400">
              We have successfully received your registration submission and payment details. Our organizing team will review the information, and we will soon share a confirmation email with you.
            </p>
          </div>
        </div>

        {/* =========================================================================
            3. REGISTRATION SUMMARY CARD
            ========================================================================= */}
        <div className="w-full bg-[#080D15] border border-[#26384B] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-10 mb-4 sm:mb-5">
          {/* Card Title */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-white font-mono text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-[#C6FF35]" />
            <span>REGISTRATION SUMMARY</span>
          </div>

          {/* 4 Two-Column Summary Rows with Distinct Styling */}
          <div className="divide-y divide-white/[0.06] text-xs font-mono">
            {/* ROW 1: Registration Status */}
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Registration Status</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-400 text-[11px] font-bold tracking-wide shadow-[0_0_12px_rgba(245,158,11,0.15)] self-start sm:self-auto max-w-full">
                <Hourglass className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">REGISTRATION SUBMITTED – AWAITING VERIFICATION</span>
              </div>
            </div>

            {/* ROW 2: Registered Team */}
            <div className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Users className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Registered Team</span>
              </div>
              <span className="font-tech font-bold text-sm sm:text-base text-white tracking-wide truncate max-w-[240px] sm:max-w-md">
                {displayTeamName}
              </span>
            </div>

            {/* ROW 3: Registration Fee */}
            <div className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <CreditCard className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Registration Fee</span>
              </div>
              <div className="font-sans text-xs sm:text-sm">
                <span className="text-[#C6FF35] font-bold font-mono text-sm sm:text-base">₹{displayFee}</span>{' '}
                <span className="text-zinc-400 font-normal">(One-time team fee)</span>
              </div>
            </div>

            {/* ROW 4: Reference ID with Accessible Copy Button & Confirmation */}
            <div className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Tag className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Reference ID</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-bold text-xs sm:text-sm tracking-wider bg-black/60 px-3.5 py-1.5 rounded-lg border border-white/[0.12] select-all">
                  {referenceId || 'SCI26-PENDING'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  aria-label="Copy Reference ID"
                  title={copied ? 'Copied to clipboard!' : 'Copy Reference ID'}
                  className="h-8 px-2.5 rounded-lg border border-white/[0.12] bg-white/[0.04] hover:bg-[#C6FF35]/10 hover:border-[#C6FF35]/50 text-zinc-300 hover:text-[#C6FF35] transition-all cursor-pointer flex items-center gap-1.5 font-mono text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C6FF35] stroke-[2.5]" />
                      <span className="text-[#C6FF35] font-bold text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-zinc-400 text-[11px] hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. INFORMATION NOTICE BANNER
            ========================================================================= */}
        <div className="mb-5 p-3 sm:p-3.5 rounded-xl bg-[#081829]/90 border border-sky-500/30 flex items-center gap-3 text-zinc-300 text-xs sm:text-[13px] font-sans shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            Please keep your transaction reference number safe for future communication.
          </span>
        </div>

        {/* =========================================================================
            5. BOTTOM ACTION BUTTONS: HORIZONTALLY CENTERED
            ========================================================================= */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3.5 w-full z-10 pt-1">
          {/* Secondary Button: CLOSE */}
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto h-11 sm:h-12 px-7 sm:px-8 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-black/40 hover:bg-white/[0.05] text-zinc-200 hover:text-white font-mono text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4 text-zinc-400" />
            <span>CLOSE</span>
          </button>

          {/* Primary Button: BACK TO HOME */}
          <button
            type="button"
            onClick={onReturnHome}
            className="w-full sm:w-auto h-11 sm:h-12 px-8 sm:px-10 rounded-xl bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-sm font-black tracking-wider transition-all shadow-[0_0_24px_rgba(198,255,53,0.45)] hover:shadow-[0_0_32px_rgba(198,255,53,0.65)] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Home className="w-4 h-4 text-black stroke-[2.5]" />
            <span>BACK TO HOME</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;
