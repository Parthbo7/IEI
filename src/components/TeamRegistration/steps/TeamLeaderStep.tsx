import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  School,
  Building,
  GraduationCap,
  Users as TeamIcon,
  Lock,
  Shield,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { TeamLeaderData } from '../types';
import { FormField } from '../FormField';
import { validateTeamLeader, ValidationErrors } from '../registrationValidation';

interface TeamLeaderStepProps {
  data: TeamLeaderData;
  onChange: (data: TeamLeaderData) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const TeamLeaderStep: React.FC<TeamLeaderStepProps> = ({
  data,
  onChange,
  onContinue,
  onBack,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleFieldChange = (field: keyof TeamLeaderData, value: string) => {
    const updated = { ...data, [field]: value };
    onChange(updated);

    if (hasAttemptedSubmit) {
      const newErrors = validateTeamLeader(updated);
      setErrors(newErrors);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    const validationErrors = validateTeamLeader(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onContinue();
    }
  };

  return (
    <form onSubmit={handleContinue} className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 max-w-2xl shrink-0">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-white tracking-tight mb-2">
          Team Leader Details
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Enter the details of the person representing your team.
        </p>
      </div>

      {/* Main Form Panel Matching Reference Design */}
      <div className="leader-form-panel">
        {/* Two-column Grid (Equal 1fr columns, column-gap: 44px, row-gap: 22px) */}
        <div className="leader-form-grid">
          {/* ROW 1: Team Name (Left) & College Name (Right) */}
          <div className="min-w-0">
            <FormField
              label="Team Name"
              name="teamName"
              value={data.teamName}
              onChange={(val) => handleFieldChange('teamName', val)}
              placeholder="Enter your team name"
              required
              error={errors.teamName}
              icon={<TeamIcon className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          <div className="min-w-0">
            <FormField
              label="College Name"
              name="college"
              value={data.college}
              onChange={(val) => handleFieldChange('college', val)}
              placeholder="Enter your college name"
              required
              error={errors.college}
              icon={<School className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          {/* ROW 2: Full Name (Left) & Email Address (Right) */}
          <div className="min-w-0">
            <FormField
              label="Full Name"
              name="fullName"
              value={data.fullName}
              onChange={(val) => handleFieldChange('fullName', val)}
              placeholder="Enter your full name"
              required
              error={errors.fullName}
              icon={<User className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          <div className="min-w-0">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={data.email}
              onChange={(val) => handleFieldChange('email', val)}
              placeholder="Enter your email address"
              required
              error={errors.email}
              icon={<Mail className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          {/* ROW 3: Mobile Number (Left) & Department / Branch (Right) */}
          <div className="min-w-0">
            <FormField
              label="Mobile Number"
              name="phone"
              type="tel"
              value={data.phone}
              onChange={(val) => handleFieldChange('phone', val)}
              placeholder="Enter your mobile number"
              required
              error={errors.phone}
              icon={<Phone className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          <div className="min-w-0">
            <FormField
              label="Department / Branch"
              name="department"
              value={data.department}
              onChange={(val) => handleFieldChange('department', val)}
              placeholder="Enter your department or branch"
              required
              error={errors.department}
              icon={<Building className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          {/* ROW 4: Year of Study (Left) & Team Account Password (Right) */}
          <div className="min-w-0 flex flex-col text-left w-full">
            <label className="flex items-center gap-1.5 text-xs sm:text-[13px] font-sans font-medium text-zinc-200 mb-2 select-none">
              <span>Year of Study</span>
              <span className="text-[#C6FF35] font-bold text-xs">*</span>
            </label>
            <div className="relative flex items-center w-full min-w-0">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <select
                value={data.yearOfStudy}
                onChange={(e) => handleFieldChange('yearOfStudy', e.target.value)}
                style={{
                  paddingLeft: '44px',
                  paddingRight: '36px',
                }}
                className={`w-full h-[56px] rounded-[12px] text-sm font-sans bg-[#070B10] border transition-all duration-200 outline-none appearance-none cursor-pointer ${
                  !data.yearOfStudy ? 'text-zinc-500' : 'text-white'
                } ${
                  errors.yearOfStudy
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                    : 'border-[#1E293B] hover:border-slate-700 focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35]/30'
                }`}
              >
                <option value="" disabled className="bg-[#0A0F15] text-zinc-500">
                  Select your year of study
                </option>
                <option value="1st Year" className="bg-[#0A0F15] text-white">1st Year (FE)</option>
                <option value="2nd Year" className="bg-[#0A0F15] text-white">2nd Year (SE)</option>
                <option value="3rd Year" className="bg-[#0A0F15] text-white">3rd Year (TE)</option>
                <option value="4th Year" className="bg-[#0A0F15] text-white">4th Year (BE / Final Year)</option>
                <option value="Postgraduate" className="bg-[#0A0F15] text-white">Postgraduate (ME / M.Tech / MCA)</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex items-center justify-center">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {errors.yearOfStudy && (
              <span className="text-[11px] font-mono text-red-400 mt-1.5 tracking-tight flex items-center gap-1">
                <span>⚠</span> {errors.yearOfStudy}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <FormField
              label="Team Account Password"
              name="teamPassword"
              type="password"
              value={data.teamPassword}
              onChange={(val) => handleFieldChange('teamPassword', val)}
              placeholder="Create a team password"
              required
              error={errors.teamPassword}
              icon={<Lock className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          {/* ROW 5: Confirm Password (Left) & Account Security Box (Right) */}
          <div className="min-w-0">
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={data.confirmPassword}
              onChange={(val) => handleFieldChange('confirmPassword', val)}
              placeholder="Confirm your password"
              required
              error={errors.confirmPassword}
              icon={<Shield className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          <div className="min-w-0 flex flex-col text-left w-full">
            <label className="flex items-center gap-1.5 text-xs sm:text-[13px] font-sans font-medium text-zinc-400 mb-2 select-none">
              <span>Account Security</span>
            </label>
            <div className="h-[56px] rounded-[12px] bg-[#070B10] border border-[#1E293B] px-4 flex items-center gap-3 text-zinc-400 text-xs font-sans">
              <div className="w-5 h-5 rounded-full bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF35]" />
              </div>
              <span className="leading-snug">
                Keep your team password safe for portal check-in, dashboard access, and submissions.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Navigation Row Beneath the Form Panel */}
      <div className="registration-navigation">
        <button
          type="button"
          onClick={onBack}
          className="h-[50px] sm:h-[52px] px-6 sm:px-7 rounded-[12px] border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] text-white font-mono text-xs sm:text-sm font-bold tracking-wider inline-flex items-center gap-2.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#C6FF35]" />
          <span>BACK</span>
        </button>

        <button
          type="submit"
          className="h-[50px] sm:h-[52px] px-8 sm:px-9 rounded-[12px] bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-sm font-bold tracking-wider inline-flex items-center gap-2.5 transition-all shadow-[0_0_24px_rgba(198,255,53,0.45)] cursor-pointer"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </form>
  );
};
