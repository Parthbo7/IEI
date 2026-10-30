import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  maxLength?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon,
  disabled = false,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col text-left w-full min-w-0">
      {/* Label positioned clearly above the input */}
      <label
        htmlFor={name}
        className="flex items-center gap-1 text-[11px] sm:text-xs font-sans font-medium text-zinc-200 mb-1 select-none"
      >
        <span>{label}</span>
        {required && <span className="text-[#C6FF35] font-bold text-xs">*</span>}
      </label>

      {/* Input container with optimized 40px/42px height for 100vh fit */}
      <div className="relative flex items-center w-full min-w-0">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={effectiveType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          style={{
            paddingLeft: icon ? '38px' : '14px',
            paddingRight: isPassword ? '38px' : '14px',
          }}
          className={`w-full h-[40px] sm:h-[42px] rounded-[10px] text-xs sm:text-[13px] font-sans text-white placeholder:text-zinc-500 bg-[#070B10] border transition-all duration-200 outline-none ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
              : 'border-[#1E293B] hover:border-slate-700 focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35]/30'
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#C6FF35] transition-colors p-1 rounded-lg focus:outline-none cursor-pointer"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-[10px] font-mono text-red-400 mt-0.5 tracking-tight flex items-center gap-1">
          <span>⚠</span> {error}
        </span>
      )}
    </div>
  );
};
