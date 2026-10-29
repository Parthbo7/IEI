import React from 'react';
import {
  Users,
  User,
  GraduationCap,
  Mail,
  Phone,
  School,
  Building,
  Edit3,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  CreditCard,
  Hash,
  FileCheck,
  Clock,
  Info
} from 'lucide-react';
import { RegistrationFormData } from '../types';

interface ReviewRegistrationStepProps {
  formData: RegistrationFormData;
  onEditTeam: () => void;
  onEditPayment: () => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export const ReviewRegistrationStep: React.FC<ReviewRegistrationStepProps> = ({
  formData,
  onEditTeam,
  onEditPayment,
  onSubmit,
  onBack,
  isSubmitting,
  errorMessage,
}) => {
  const additionalMembersCount = formData.teamSize - 1;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 max-w-2xl shrink-0">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-white tracking-tight mb-2">
          Review & Submit Registration
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Please review your team, member, and payment details carefully before final submission.
        </p>
      </div>

      {/* Calm Blue Manual Email Notice matching Image 2 */}
      <div className="w-full mb-6 p-4 sm:p-4.5 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-3.5 text-zinc-300 text-xs sm:text-[13px] leading-relaxed shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-mono text-xs font-bold text-sky-400 tracking-wider uppercase block mb-0.5">
            NO EMAILS WILL BE SENT AUTOMATICALLY
          </span>
          <span className="text-zinc-300">
            Due to email sending limits, confirmation emails will not be sent automatically. The organizing team will share registration confirmations and announcements manually.
          </span>
        </div>
      </div>

      {/* Database Error Banner if any non-email submission issue occurs */}
      {errorMessage && (
        <div className="w-full mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm font-mono shadow-[0_4px_20px_rgba(239,68,68,0.15)]">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Review Cards List matching Image 2 */}
      <div className="w-full space-y-5 sm:space-y-6 mb-7">
        {/* =========================================================================
            CARD 1: Team & Leader Information
            ========================================================================= */}
        <div className="rounded-[18px] border border-[#26384b] bg-[rgba(10,16,23,0.94)] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-[#C6FF35]" />
              <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                Team & Leader Information
              </h3>
            </div>

            <button
              type="button"
              onClick={onEditTeam}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-[#C6FF35] hover:bg-white/[0.05] border border-white/[0.12] transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>

          {/* Top Row: Team Name & Team Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-5">
            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">TEAM NAME</span>
              <span className="text-[#C6FF35] font-extrabold text-xl sm:text-2xl font-tech tracking-tight block">
                {formData.leader.teamName || '—'}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">TEAM CAPACITY</span>
              <span className="text-white font-bold text-base sm:text-lg block">
                {formData.teamSize} Members{' '}
                <span className="text-zinc-400 text-xs font-mono font-normal">
                  (1 Leader + {formData.teamSize - 1} Members)
                </span>
              </span>
            </div>
          </div>

          {/* Bottom Grid: Leader Information in 3 Columns */}
          <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">LEADER NAME</span>
              <div className="flex items-center gap-2 text-white font-semibold font-sans">
                <User className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="truncate">{formData.leader.fullName || '—'}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">EMAIL ADDRESS</span>
              <div className="flex items-center gap-2 text-zinc-300 font-sans">
                <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="truncate">{formData.leader.email || '—'}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">MOBILE NUMBER</span>
              <div className="flex items-center gap-2 text-zinc-300 font-sans">
                <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>{formData.leader.phone || '—'}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">COLLEGE NAME</span>
              <div className="flex items-center gap-2 text-zinc-300 font-sans">
                <School className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="truncate">{formData.leader.college || '—'}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">DEPARTMENT / BRANCH</span>
              <div className="flex items-center gap-2 text-zinc-300 font-sans">
                <Building className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="truncate">{formData.leader.department || '—'}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">YEAR OF STUDY</span>
              <div className="flex items-center gap-2 text-zinc-300 font-sans">
                <GraduationCap className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>{formData.leader.yearOfStudy || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CARD 2: Team Members Card
            ========================================================================= */}
        {additionalMembersCount > 0 && (
          <div className="rounded-[18px] border border-[#26384b] bg-[rgba(10,16,23,0.94)] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#C6FF35]" />
                <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                  Team Members ({additionalMembersCount})
                </h3>
              </div>

              <button
                type="button"
                onClick={onEditTeam}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-[#C6FF35] hover:bg-white/[0.05] border border-white/[0.12] transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>EDIT</span>
              </button>
            </div>

            {/* Member Sub-cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: additionalMembersCount }).map((_, idx) => {
                const m = formData.members[idx];
                if (!m) return null;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#070B10] border border-[#1E293B] flex flex-col gap-2.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <span className="font-mono text-xs font-bold text-[#C6FF35]">
                        MEMBER #{idx + 2}
                      </span>
                      {m.rollNumber && (
                        <span className="font-mono text-[11px] text-zinc-400">
                          {m.rollNumber}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-white truncate font-sans">
                      {m.fullName || '—'}
                    </div>

                    <div className="text-xs text-zinc-400 flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{m.email || '—'}</span>
                    </div>

                    <div className="text-xs text-zinc-400 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{m.phone || '—'}</span>
                    </div>

                    <div className="text-xs text-zinc-400 flex items-center gap-2 truncate">
                      <School className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{m.college || '—'}</span>
                    </div>

                    <div className="text-xs text-zinc-400 flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{m.department || '—'} ({m.yearOfStudy || '—'})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            CARD 3: Payment Verification Card
            ========================================================================= */}
        <div className="rounded-[18px] border border-[#26384b] bg-[rgba(10,16,23,0.94)] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#C6FF35]" />
              <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                Payment Verification
              </h3>
            </div>

            <button
              type="button"
              onClick={onEditPayment}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-[#C6FF35] hover:bg-white/[0.05] border border-white/[0.12] transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>

          {/* 4 Columns matching Image 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono text-xs">
            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">REGISTRATION FEE</span>
              <span className="text-white font-extrabold text-base sm:text-lg">
                ₹{formData.payment.registrationFee}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">TRANSACTION ID</span>
              <span className="text-[#C6FF35] font-bold text-xs sm:text-sm truncate block">
                {formData.payment.transactionId || '—'}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">RECEIPT SCREENSHOT</span>
              <div className="flex items-center gap-1.5 text-zinc-300 truncate">
                <FileCheck className="w-4 h-4 text-[#C6FF35] shrink-0" />
                <span className="truncate text-xs">
                  {formData.payment.screenshotFileName || formData.payment.screenshotFile?.name || 'Attached'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block text-[10px] mb-1 uppercase tracking-wider">STATUS</span>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Awaiting Check</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Buttons matching Image 2 */}
      <div className="registration-navigation">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-[52px] px-7 rounded-[12px] border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] text-white font-mono text-xs sm:text-sm font-bold tracking-wider inline-flex items-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 text-[#C6FF35]" />
          <span>BACK</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="h-[52px] px-9 rounded-[12px] bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-sm font-bold tracking-wider inline-flex items-center gap-2.5 transition-all shadow-[0_0_24px_rgba(198,255,53,0.45)] cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SUBMITTING REGISTRATION...</span>
            </>
          ) : (
            <>
              <span>SUBMIT REGISTRATION</span>
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
