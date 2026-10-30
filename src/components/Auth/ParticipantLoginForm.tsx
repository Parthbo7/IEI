import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Home,
  AlertCircle,
  Loader2,
  Mail,
  LogIn,
  CheckCircle2,
  Check,
  X,
  KeyRound,
} from 'lucide-react';
import {
  authenticateTeam,
  getRememberedTeamName,
  sendPasswordResetEmail,
  TeamSession,
} from './authService';

interface ParticipantLoginFormProps {
  onSuccess: (session: TeamSession) => void;
  onNavigateToRegister: () => void;
  onBackToHome: () => void;
}

export const ParticipantLoginForm: React.FC<ParticipantLoginFormProps> = ({
  onSuccess,
  onNavigateToRegister,
  onBackToHome,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotStatus, setForgotStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Pre-load remembered team name / email if present
  useEffect(() => {
    const remembered = getRememberedTeamName();
    if (remembered) {
      setIdentifier(remembered);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanId = identifier.trim();
    if (!cleanId) {
      setErrorMessage('Please enter your registered email, team name or admin ID.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authenticateTeam(cleanId, password, rememberMe);
      if (result.success && result.session) {
        onSuccess(result.session);
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch {
      setErrorMessage('A network error occurred while communicating with the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotStatus({ success: false, message: 'Please enter your registered email address.' });
      return;
    }

    setForgotLoading(true);
    setForgotStatus(null);
    try {
      const res = await sendPasswordResetEmail(forgotEmail);
      setForgotStatus(res);
    } catch {
      setForgotStatus({
        success: false,
        message: 'Unable to process reset request. Please contact support@mgmcen.ac.in.',
      });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Floating Glassmorphic Login Card matching Target Reference Image */}
      <div className="relative rounded-[26px] sm:rounded-[30px] bg-[#070D17]/92 backdrop-blur-2xl border-2 border-[#C6FF35]/40 shadow-[0_0_50px_rgba(198,255,53,0.14),0_24px_80px_rgba(0,0,0,0.95)] p-6 sm:p-8 xl:p-9 transition-all duration-300">
        {/* Subtle Top Edge Glow Accent */}
        <div className="absolute -top-px left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6FF35]/60 to-transparent" />

        {/* =========================================================================
            1. CARD HEADER: CENTERED LOGO, TITLE, SUBTITLE (Reference Image 3)
            ========================================================================= */}
        <div className="flex items-center justify-center gap-3 mb-3">
          {/* Hackathon Neon Lime Brand Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_18px_rgba(198,255,53,0.35)] shrink-0">
            <svg
              width="20"
              height="22"
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
            <span className="font-tech text-white text-xs sm:text-sm font-black tracking-tight leading-none">
              SMART CITY INNOVATION
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-zinc-400 tracking-wider uppercase mt-1">
              HACKATHON 2026
            </span>
          </div>
        </div>

        {/* Centered Welcome Back & Subtitle */}
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-[28px] font-black text-white tracking-tight font-sans">
            Welcome Back!
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed font-sans">
            Login to access your team dashboard.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-4 sm:mb-5 p-3 sm:p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-left">
              <span className="font-semibold block text-rose-200">Authentication Failed</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            2. UNIFIED LOGIN FORM (PARTICIPANTS & ADMINS)
            ========================================================================= */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* FIELD 1: EMAIL ADDRESS / TEAM NAME / ADMIN USER ID */}
          <div className="text-left">
            <label
              htmlFor="team-identifier"
              className="block text-[11px] sm:text-xs font-mono font-bold text-zinc-300 mb-2 uppercase tracking-wider"
            >
              EMAIL ADDRESS / TEAM NAME / ADMIN USER ID <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-zinc-400 flex items-center justify-center z-10">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="team-identifier"
                name="teamIdentifier"
                type="text"
                autoComplete="username"
                disabled={isLoading}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your registered email, team name or admin ID"
                style={{ paddingLeft: '48px', paddingRight: '16px' }}
                className="w-full h-[48px] sm:h-[50px] bg-[#080E18] border border-white/[0.14] rounded-xl text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* FIELD 2: PASSWORD */}
          <div className="text-left">
            <label
              htmlFor="team-password"
              className="block text-[11px] sm:text-xs font-mono font-bold text-zinc-300 mb-2 uppercase tracking-wider"
            >
              PASSWORD <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-zinc-400 flex items-center justify-center z-10">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="team-password"
                name="teamPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ paddingLeft: '48px', paddingRight: '48px' }}
                className="w-full h-[48px] sm:h-[50px] bg-[#080E18] border border-white/[0.14] rounded-xl text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer z-10 flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CONTROLS ROW: REMEMBER ME & FORGOT PASSWORD */}
          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2.5 text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                  rememberMe
                    ? 'bg-[#C6FF35] text-black shadow-[0_0_8px_rgba(198,255,53,0.5)]'
                    : 'bg-[#0A1220] border border-white/20'
                }`}
              >
                {rememberMe && <Check className="w-3 h-3 text-black stroke-[3]" />}
              </div>
              <span className="text-zinc-200 hover:text-white transition-colors font-sans text-xs">
                Remember Me
              </span>
            </label>

            <button
              type="button"
              onClick={() => {
                setShowForgotModal(true);
                setForgotStatus(null);
                setForgotEmail(identifier.includes('@') ? identifier : '');
              }}
              className="text-[#C6FF35] hover:text-[#d7ff66] transition-colors font-medium font-sans cursor-pointer hover:underline text-xs"
            >
              Forgot Password?
            </button>
          </div>

          {/* PRIMARY LOGIN BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] sm:h-[50px] py-3 px-6 rounded-xl bg-[#C6FF35] text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(198,255,53,0.35)] hover:bg-[#d5ff55] hover:shadow-[0_0_35px_rgba(198,255,53,0.6)] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-black stroke-[2.5]" />
                <span>LOGIN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* =========================================================================
            3. OR DIVIDER
            ========================================================================= */}
        <div className="relative my-4 sm:my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.08]" />
          </div>
          <div className="relative flex justify-center text-[10px] font-mono uppercase">
            <span className="bg-[#070D17] px-3 text-zinc-500 tracking-widest">OR</span>
          </div>
        </div>

        {/* =========================================================================
            4. REGISTER YOUR TEAM LINK
            ========================================================================= */}
        <div className="text-center">
          <p className="text-xs sm:text-[13px] text-zinc-300 font-sans">
            <span>Don&apos;t have a team yet? </span>
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="text-[#C6FF35] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Register Your Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>

        {/* =========================================================================
            5. BACK TO HOME
            ========================================================================= */}
        <div className="text-center mt-3 pt-1">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer font-sans"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          FORGOT PASSWORD MODAL
          ========================================================================= */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForgotModal(false);
          }}
        >
          <div className="relative w-full max-w-md bg-[#080D17] border border-[#C6FF35]/30 rounded-2xl p-6 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.95)] text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#C6FF35]" />
                <span className="font-tech text-sm font-bold text-white tracking-wide">
                  PASSWORD RECOVERY
                </span>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
              Enter your registered team leader email address. We will send password reset
              instructions to your inbox.
            </p>

            {forgotStatus && (
              <div
                className={`mb-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  forgotStatus.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {forgotStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{forgotStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-zinc-300 mb-1.5 uppercase">
                  Registered Email Address <span className="text-[#C6FF35]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="leader@example.com"
                  className="w-full h-11 px-4 bg-[#070D17] border border-white/[0.15] rounded-xl text-white text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#C6FF35]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.15] text-zinc-300 hover:text-white text-xs font-mono font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="px-5 py-2 rounded-xl bg-[#C6FF35] text-black text-xs font-mono font-black uppercase hover:bg-[#d5ff55] shadow-[0_0_15px_rgba(198,255,53,0.3)] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {forgotLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <span>SEND RESET LINK</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Also export as UnifiedLoginForm for semantics
export const UnifiedLoginForm = ParticipantLoginForm;
export default ParticipantLoginForm;
