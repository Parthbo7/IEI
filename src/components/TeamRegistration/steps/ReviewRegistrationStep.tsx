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
  FileText,
  Image as ImageIcon,
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
  const additionalMembersCount = Math.max(0, formData.teamSize - 1);
  const screenshotName =
    formData.payment.screenshotFileName ||
    formData.payment.screenshotFile?.name ||
    'receipt_screenshot.png';

  return (
    <div className="w-full max-w-[1120px] mx-auto flex flex-col items-center px-1 sm:px-2 pb-6">
      {/* 1. Main Heading & Subtitle matching Reference Design */}
      <div className="text-center mb-3 sm:mb-4 max-w-2xl shrink-0">
        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold font-sans text-white tracking-tight mb-1">
          Review & Submit <span className="text-[#C6FF35]">Registration</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-normal">
          Please review your team, member, and payment details carefully before final submission.
        </p>
      </div>

      {/* 2. Important Notice Banner ("NO EMAILS WILL BE SENT AUTOMATICALLY") */}
      <div className="w-full mb-4 sm:mb-5 p-3.5 sm:p-4 rounded-xl bg-[#081829]/90 border border-[#1e4976] flex items-center gap-3.5 sm:gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
        <div className="w-8 h-8 rounded-full bg-[#0088cc]/20 border border-[#00b4d8]/60 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,180,216,0.25)]">
          <Info className="w-4 h-4 text-[#38bdf8]" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-mono text-xs font-bold text-[#38bdf8] tracking-wider uppercase block mb-0.5">
            NO EMAILS WILL BE SENT AUTOMATICALLY
          </span>
          <span className="text-zinc-300 text-xs sm:text-[13px] font-sans leading-relaxed block">
            Due to email limits, confirmations will be shared manually by the committee.
          </span>
        </div>
      </div>

      {/* Optional Submission Error Banner */}
      {errorMessage && (
        <div className="w-full mb-4 p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs font-mono shadow-[0_2px_12px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3. Cards Section */}
      <div className="w-full space-y-4 sm:space-y-5 mb-5 sm:mb-6">
        {/* =========================================================================
            CARD 1: Team & Leader Information
            ========================================================================= */}
        <div className="w-full rounded-[16px] border border-[#1E293B] bg-[#070B12]/95 p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-[#C6FF35]" />
              <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                Team & Leader Information
              </h3>
            </div>

            <button
              type="button"
              onClick={onEditTeam}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-300 hover:text-[#C6FF35] hover:bg-[#C6FF35]/10 border border-zinc-700 hover:border-[#C6FF35] transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>

          {/* Row 1: Team Name & Team Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-4 sm:pb-5 border-b border-white/[0.06]">
            {/* Team Name */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <Users className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  TEAM NAME
                </span>
                <span className="text-base sm:text-lg font-bold font-sans text-white truncate block">
                  {formData.leader.teamName || '—'}
                </span>
              </div>
            </div>

            {/* Team Capacity */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <Users className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  TEAM CAPACITY
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white block">
                  {formData.teamSize} Members{' '}
                  <span className="text-zinc-400 font-normal">
                    (1 Leader + {formData.teamSize - 1} Members)
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Leader Name, Email Address, Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-5 border-b border-white/[0.06]">
            {/* Leader Name */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <User className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  LEADER NAME
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white truncate block">
                  {formData.leader.fullName || '—'}
                </span>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <Mail className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  EMAIL ADDRESS
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white truncate block">
                  {formData.leader.email || '—'}
                </span>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <Phone className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  MOBILE NUMBER
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white truncate block">
                  {formData.leader.phone || '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: College Name, Department / Branch, Year of Study */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-5">
            {/* College Name */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <School className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  COLLEGE NAME
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white truncate block">
                  {formData.leader.college || '—'}
                </span>
              </div>
            </div>

            {/* Department / Branch */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <Building className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  DEPARTMENT / BRANCH
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white truncate block">
                  {formData.leader.department || '—'}
                </span>
              </div>
            </div>

            {/* Year of Study */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <GraduationCap className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  YEAR OF STUDY
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-white truncate block">
                  {formData.leader.yearOfStudy || '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CARD 2: Team Members Card
            ========================================================================= */}
        {additionalMembersCount > 0 && (
          <div className="w-full rounded-[16px] border border-[#1E293B] bg-[#070B12]/95 p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#C6FF35]" />
                <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                  Team Members ({additionalMembersCount})
                </h3>
              </div>

              <button
                type="button"
                onClick={onEditTeam}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-300 hover:text-[#C6FF35] hover:bg-[#C6FF35]/10 border border-zinc-700 hover:border-[#C6FF35] transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>EDIT</span>
              </button>
            </div>

            {/* Members List matching Horizontal Strip Design in Target Screenshot */}
            <div className="divide-y divide-white/[0.08]">
              {Array.from({ length: additionalMembersCount }).map((_, idx) => {
                const m = formData.members[idx];
                if (!m) return null;

                return (
                  <div
                    key={idx}
                    className={`flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-3 py-3.5 ${
                      idx === 0 ? 'pt-1' : ''
                    }`}
                  >
                    {/* Member Pill Badge */}
                    <span className="px-3 py-1 rounded-full bg-[#C6FF35] text-black font-mono font-bold text-xs tracking-wider shrink-0 uppercase shadow-[0_0_10px_rgba(198,255,53,0.3)]">
                      MEMBER #{idx + 2}
                    </span>

                    {/* Member Full Name */}
                    <span className="text-white font-bold font-sans text-sm sm:text-base shrink-0">
                      {m.fullName || '—'}
                    </span>

                    {/* Email */}
                    <div className="flex items-center gap-2 text-zinc-300 text-xs sm:text-sm font-sans shrink-0">
                      <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span className="truncate max-w-[220px]">{m.email || '—'}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-zinc-300 text-xs sm:text-sm font-sans shrink-0">
                      <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{m.phone || '—'}</span>
                    </div>

                    {/* College */}
                    <div className="flex items-center gap-2 text-zinc-300 text-xs sm:text-sm font-sans shrink-0">
                      <School className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{m.college || '—'}</span>
                    </div>

                    {/* Department & Year */}
                    <div className="flex items-center gap-2 text-zinc-300 text-xs sm:text-sm font-sans shrink-0">
                      <GraduationCap className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>
                        {m.department || '—'}
                        {m.yearOfStudy ? ` (${m.yearOfStudy})` : ''}
                      </span>
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
        <div className="w-full rounded-[16px] border border-[#1E293B] bg-[#070B12]/95 p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#C6FF35]" />
              <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                Payment Verification
              </h3>
            </div>

            <button
              type="button"
              onClick={onEditPayment}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-300 hover:text-[#C6FF35] hover:bg-[#C6FF35]/10 border border-zinc-700 hover:border-[#C6FF35] transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT</span>
            </button>
          </div>

          {/* 4 Columns matching Target UI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Registration Fee */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <span className="font-mono font-bold text-base text-[#C6FF35]">₹</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  REGISTRATION FEE
                </span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-[#C6FF35] block">
                  ₹{formData.payment.registrationFee}
                </span>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <FileText className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  TRANSACTION ID
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white truncate block">
                  {formData.payment.transactionId || '—'}
                </span>
              </div>
            </div>

            {/* Receipt Screenshot */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <ImageIcon className="w-5 h-5 text-[#C6FF35]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  RECEIPT SCREENSHOT
                </span>
                <span className="text-sm sm:text-base font-sans font-medium text-white truncate block">
                  {screenshotName}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0e1610] border border-[#C6FF35]/35 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(198,255,53,0.1)]">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wider block">
                  STATUS
                </span>
                <span className="text-sm sm:text-base font-sans font-bold text-amber-400 flex items-center gap-1.5 block">
                  Awaiting Check
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Action Navigation matching Reference Image */}
      <div className="w-full flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-black/40 hover:bg-white/[0.05] text-white font-mono text-xs sm:text-sm font-bold tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
          <span>BACK</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="h-11 sm:h-12 px-7 sm:px-9 rounded-xl bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-sm font-black tracking-wider inline-flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(198,255,53,0.4)] cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>SUBMITTING REGISTRATION...</span>
            </>
          ) : (
            <>
              <span>SUBMIT REGISTRATION</span>
              <CheckCircle2 className="w-5 h-5 stroke-[2.5] text-black" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
