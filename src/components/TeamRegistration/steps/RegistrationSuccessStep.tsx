import React, { useState } from 'react';
import { CheckCircle2, Home, Copy, Check, Download } from 'lucide-react';
import { RegistrationFormData } from '../types';

interface RegistrationSuccessStepProps {
  referenceId: string;
  teamName: string;
  formData: RegistrationFormData;
  onReturnHome: () => void;
}

export const RegistrationSuccessStep: React.FC<RegistrationSuccessStepProps> = ({
  referenceId,
  teamName,
  formData,
  onReturnHome,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSummary = () => {
    const summaryText = `SMART CITY INNOVATION 2026 - OFFICIAL REGISTRATION RECEIPT
================================================================
Reference ID: ${referenceId}
Registration Timestamp: ${new Date().toLocaleString()}
Team Name: ${teamName}
Team Size: ${formData.teamSize} Members (1 Leader + ${formData.teamSize - 1} Members)

TEAM LEADER:
  Full Name: ${formData.leader.fullName}
  Email: ${formData.leader.email}
  Mobile: ${formData.leader.phone}
  College: ${formData.leader.college}
  Department: ${formData.leader.department}
  Year of Study: ${formData.leader.yearOfStudy}

TEAM MEMBERS:
${formData.members
  .slice(0, formData.teamSize - 1)
  .map(
    (m, i) => `  Member 0${i + 1}:
    Full Name: ${m.fullName}
    Email: ${m.email}
    Mobile: ${m.phone}
    College: ${m.college}
    Department: ${m.department}
    Year of Study: ${m.yearOfStudy}
    ${m.rollNumber ? `Roll Number: ${m.rollNumber}` : ''}`
  )
  .join('\n\n')}

================================================================
Please preserve this Reference ID for hackathon check-in and portal credentials.
Official event portal: https://smartcity2026.iei.edu
================================================================`;

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${referenceId}_Hackathon_Registration.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col items-center py-6 text-center">
      {/* Animated Glowing Badge */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[#C6FF35]/25 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-[#0E1720] border-2 border-[#C6FF35] flex items-center justify-center text-[#C6FF35] shadow-[0_0_40px_rgba(198,255,53,0.5)]">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans text-white tracking-tight mb-3">
        REGISTRATION SUCCESSFUL!
      </h2>
      <p className="text-sm sm:text-base font-mono text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
        Your team registration has been recorded and confirmed for Smart City Innovation 2026.
      </p>

      {/* Confirmation Badge Container */}
      <div className="w-full max-w-xl bg-[#0A0F15] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.6)] mb-10 text-left">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <span className="text-xs font-mono text-zinc-400">REGISTERED TEAM</span>
          <span className="text-base font-bold font-mono text-[#C6FF35]">{teamName}</span>
        </div>

        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <span className="text-xs font-mono text-zinc-400">TOTAL MEMBERS</span>
          <span className="text-sm font-mono text-white font-semibold">
            {formData.teamSize} Members
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">REFERENCE NUMBER</span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-mono font-bold text-white bg-black/60 px-3 py-1.5 rounded-lg border border-white/[0.12]">
              {referenceId}
            </span>
            <button
              type="button"
              onClick={handleCopyReference}
              title="Copy Reference ID"
              className="p-2 text-zinc-400 hover:text-[#C6FF35] hover:bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#C6FF35]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
        <button
          type="button"
          onClick={handleDownloadSummary}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-sm font-semibold border border-white/[0.15] text-zinc-200 hover:text-white hover:border-white/[0.35] hover:bg-white/[0.05] transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#C6FF35]" />
          <span>DOWNLOAD RECEIPT</span>
        </button>

        <button
          type="button"
          onClick={onReturnHome}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-sm font-bold bg-[#C6FF35] text-black hover:bg-[#b0ec22] transition-all shadow-[0_0_24px_rgba(198,255,53,0.35)] cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>RETURN TO HOMEPAGE</span>
        </button>
      </div>
    </div>
  );
};
