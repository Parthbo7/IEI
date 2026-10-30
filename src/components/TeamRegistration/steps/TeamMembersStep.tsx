import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  School,
  Building,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Hash,
  ChevronDown
} from 'lucide-react';
import { RegistrationFormData, TeamMemberData } from '../types';
import { FormField } from '../FormField';
import { validateTeamMember, ValidationErrors } from '../registrationValidation';

interface TeamMembersStepProps {
  formData: RegistrationFormData;
  onChangeMember: (index: number, memberData: TeamMemberData) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const TeamMembersStep: React.FC<TeamMembersStepProps> = ({
  formData,
  onChangeMember,
  onContinue,
  onBack,
}) => {
  const additionalMembersCount = formData.teamSize - 1; // 1, 2, or 3
  const [errors, setErrors] = useState<{ [memberIdx: number]: ValidationErrors }>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleFieldChange = (
    memberIdx: number,
    field: keyof TeamMemberData,
    value: string
  ) => {
    const currentMember = formData.members[memberIdx] || {
      fullName: '',
      email: '',
      phone: '',
      college: '',
      department: '',
      yearOfStudy: '',
      rollNumber: '',
    };
    const updated = { ...currentMember, [field]: value };
    onChangeMember(memberIdx, updated);

    if (hasAttemptedSubmit) {
      const memberErrors = validateTeamMember(updated, memberIdx, formData);
      setErrors((prev) => ({
        ...prev,
        [memberIdx]: memberErrors,
      }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    let hasAnyError = false;
    const newErrors: { [memberIdx: number]: ValidationErrors } = {};

    for (let i = 0; i < additionalMembersCount; i++) {
      const member = formData.members[i] || {
        fullName: '',
        email: '',
        phone: '',
        college: '',
        department: '',
        yearOfStudy: '',
      };
      const memberErrors = validateTeamMember(member, i, formData);
      if (Object.keys(memberErrors).length > 0) {
        hasAnyError = true;
      }
      newErrors[i] = memberErrors;
    }

    setErrors(newErrors);

    if (!hasAnyError) {
      onContinue();
    }
  };

  return (
    <form onSubmit={handleContinue} className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-2 sm:mb-2.5 max-w-2xl shrink-0">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold font-sans text-white tracking-tight mb-0.5">
          Team Member Details
        </h2>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-normal">
          Enter details for the {additionalMembersCount} additional member{additionalMembersCount > 1 ? 's' : ''} on your team.
        </p>
      </div>

      {/* Member Panels List */}
      <div className="w-full space-y-3 sm:space-y-4 mb-2">
        {Array.from({ length: additionalMembersCount }).map((_, idx) => {
          const memberData = formData.members[idx] || {
            fullName: '',
            email: '',
            phone: '',
            college: '',
            department: '',
            yearOfStudy: '',
            rollNumber: '',
          };
          const memberErrors = errors[idx] || {};

          return (
            <div
              key={idx}
              className="member-form-panel"
            >
              {/* Member Card Title */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C6FF35] text-black font-mono text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-tech text-sm sm:text-base font-bold text-white tracking-tight">
                    MEMBER {idx + 1}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-wider">
                  TEAM ROSTER #{idx + 2}
                </span>
              </div>

              {/* Form Grid: 2 Equal Columns */}
              <div className="member-form-grid">
                {/* ROW 1: Full Name (Left Column) */}
                <div className="min-w-0">
                  <FormField
                    label="Full Name"
                    name={`member_${idx}_fullName`}
                    value={memberData.fullName}
                    onChange={(val) => handleFieldChange(idx, 'fullName', val)}
                    placeholder="Enter member's full name"
                    required
                    error={memberErrors.fullName}
                    icon={<User className="w-5 h-5 text-zinc-400" />}
                  />
                </div>

                {/* ROW 1: Email Address (Right Column) */}
                <div className="min-w-0">
                  <FormField
                    label="Email Address"
                    name={`member_${idx}_email`}
                    type="email"
                    value={memberData.email}
                    onChange={(val) => handleFieldChange(idx, 'email', val)}
                    placeholder="Enter member's email"
                    required
                    error={memberErrors.email}
                    icon={<Mail className="w-5 h-5 text-zinc-400" />}
                  />
                </div>

                {/* ROW 2: Mobile Number (Left Column) */}
                <div className="min-w-0">
                  <FormField
                    label="Mobile Number"
                    name={`member_${idx}_phone`}
                    type="tel"
                    value={memberData.phone}
                    onChange={(val) => handleFieldChange(idx, 'phone', val)}
                    placeholder="Enter 10-digit mobile number"
                    required
                    error={memberErrors.phone}
                    icon={<Phone className="w-5 h-5 text-zinc-400" />}
                  />
                </div>

                {/* ROW 2: College Name (Right Column) */}
                <div className="min-w-0">
                  <FormField
                    label="College Name"
                    name={`member_${idx}_college`}
                    value={memberData.college}
                    onChange={(val) => handleFieldChange(idx, 'college', val)}
                    placeholder="Enter college or university"
                    required
                    error={memberErrors.college}
                    icon={<School className="w-5 h-5 text-zinc-400" />}
                  />
                </div>

                {/* ROW 3: Department / Branch (Left Column) */}
                <div className="min-w-0">
                  <FormField
                    label="Department / Branch"
                    name={`member_${idx}_department`}
                    value={memberData.department}
                    onChange={(val) => handleFieldChange(idx, 'department', val)}
                    placeholder="e.g. Computer Engineering / IT"
                    required
                    error={memberErrors.department}
                    icon={<Building className="w-5 h-5 text-zinc-400" />}
                  />
                </div>

                {/* ROW 3: Year of Study Dropdown (Right Column) */}
                <div className="min-w-0 flex flex-col text-left w-full">
                  <label className="flex items-center gap-1 text-[11px] sm:text-xs font-sans font-medium text-zinc-200 mb-1 select-none">
                    <span>Year of Study</span>
                    <span className="text-[#C6FF35] font-bold text-xs">*</span>
                  </label>
                  <div className="relative flex items-center w-full min-w-0">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      value={memberData.yearOfStudy}
                      onChange={(e) => handleFieldChange(idx, 'yearOfStudy', e.target.value)}
                      style={{
                        paddingLeft: '38px',
                        paddingRight: '32px',
                      }}
                      className={`w-full h-[40px] sm:h-[42px] rounded-[10px] text-xs sm:text-[13px] font-sans bg-[#070B10] border transition-all duration-200 outline-none appearance-none cursor-pointer ${
                        !memberData.yearOfStudy ? 'text-zinc-500' : 'text-white'
                      } ${
                        memberErrors.yearOfStudy
                          ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                          : 'border-[#1E293B] hover:border-slate-700 focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35]/30'
                      }`}
                    >
                      <option value="" disabled className="bg-[#0A0F15] text-zinc-500">
                        Select year of study
                      </option>
                      <option value="1st Year" className="bg-[#0A0F15] text-white">1st Year (FE)</option>
                      <option value="2nd Year" className="bg-[#0A0F15] text-white">2nd Year (SE)</option>
                      <option value="3rd Year" className="bg-[#0A0F15] text-white">3rd Year (TE)</option>
                      <option value="4th Year" className="bg-[#0A0F15] text-white">4th Year (BE / Final Year)</option>
                      <option value="Postgraduate" className="bg-[#0A0F15] text-white">Postgraduate</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex items-center justify-center">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  {memberErrors.yearOfStudy && (
                    <span className="text-[10px] font-mono text-red-400 mt-0.5 tracking-tight flex items-center gap-1">
                      <span>⚠</span> {memberErrors.yearOfStudy}
                    </span>
                  )}
                </div>

                {/* ROW 4: Roll Number (Optional) (Left Column, NO col-span-2) */}
                <div className="min-w-0">
                  <FormField
                    label="Student Roll Number (Optional)"
                    name={`member_${idx}_rollNumber`}
                    value={memberData.rollNumber || ''}
                    onChange={(val) => handleFieldChange(idx, 'rollNumber', val)}
                    placeholder="e.g. IT-2024-42 / PRN Number"
                    icon={<Hash className="w-4 h-4 text-zinc-400" />}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="registration-navigation">
        <button
          type="button"
          onClick={onBack}
          className="h-[40px] sm:h-[42px] px-6 sm:px-7 rounded-[10px] border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] text-white font-mono text-xs sm:text-[13px] font-bold tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C6FF35]" />
          <span>BACK</span>
        </button>

        <button
          type="submit"
          className="h-[40px] sm:h-[42px] px-7 sm:px-8 rounded-[10px] bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-[13px] font-bold tracking-wider inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(198,255,53,0.4)] cursor-pointer"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </form>
  );
};
