import React, { useState, useEffect } from 'react';
import { Users, Lock, Eye, EyeOff, Shield, ArrowRight, Home, AlertCircle, Loader2, Mail } from 'lucide-react';
import {
  authenticateTeam,
  getRememberedTeamName,
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
  const [activeTab, setActiveTab] = useState<'participant' | 'admin'>('participant');
  const [teamName, setTeamName] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Pre-load remembered team name if present
  useEffect(() => {
    const remembered = getRememberedTeamName();
    if (remembered) {
      setTeamName(remembered);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!teamName.trim()) {
      setErrorMessage('Please enter your registered email address or team name.');
      return;
    }
    if (!teamPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authenticateTeam(teamName, teamPassword, rememberMe);
      if (result.success && result.session) {
        onSuccess(result.session);
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setErrorMessage('A network error occurred while communicating with the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminTabClick = () => {
    setActiveTab('admin');
    window.history.pushState(null, '', '/admin');
    window.location.href = '/admin';
  };

  const handleParticipantTabClick = () => {
    setActiveTab('participant');
    setAdminNotice(null);
  };

  return (
    <div className="w-full">
      {/* Glassmorphic Login Card matching Image 2 */}
      <div className="relative rounded-[28px] bg-[#070D17]/88 backdrop-blur-2xl border border-white/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.92)] p-6 sm:p-7 xl:p-8 transition-all duration-300">
        {/* Subtle Top Edge Accent */}
        <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6FF35]/50 to-transparent" />

        {/* =========================================================================
            1. PARTICIPANT & ADMIN LOGIN TABS (Exact match to Image 2)
            ========================================================================= */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* PARTICIPANT LOGIN TAB (Active = Solid Lime Green with Black Text) */}
          <button
            type="button"
            onClick={handleParticipantTabClick}
            className={`text-left p-3 sm:p-3.5 rounded-2xl transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center gap-3 ${
              activeTab === 'participant'
                ? 'bg-[#C6FF35] text-black shadow-[0_0_24px_rgba(198,255,53,0.35)]'
                : 'bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-zinc-300'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                activeTab === 'participant'
                  ? 'text-black bg-black/15'
                  : 'text-zinc-400 bg-white/[0.05] border border-white/[0.08]'
              }`}
            >
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span
                className={`text-xs sm:text-[12px] font-mono font-black tracking-wider uppercase block truncate ${
                  activeTab === 'participant' ? 'text-black' : 'text-white'
                }`}
              >
                PARTICIPANT LOGIN
              </span>
              <p
                className={`text-[10px] truncate font-sans mt-0.5 ${
                  activeTab === 'participant' ? 'text-black/75 font-medium' : 'text-zinc-400'
                }`}
              >
                Login to your registered team
              </p>
            </div>
          </button>

          {/* ADMIN LOGIN TAB */}
          <button
            type="button"
            onClick={handleAdminTabClick}
            className={`text-left p-3 sm:p-3.5 rounded-2xl transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center gap-3 ${
              activeTab === 'admin'
                ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                : 'bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-zinc-300'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'admin'
                  ? 'text-black bg-black/15'
                  : 'text-zinc-400 bg-white/[0.05] border border-white/[0.08]'
              }`}
            >
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-[12px] font-mono font-bold tracking-wider uppercase text-zinc-200 block truncate">
                ADMIN LOGIN
              </span>
              <p className="text-[10px] text-zinc-400 truncate font-sans mt-0.5">
                For organizers and coordinators
              </p>
            </div>
          </button>
        </div>

        {/* =========================================================================
            2. CARD HEADING
            ========================================================================= */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-[28px] font-black text-white tracking-tight font-sans">
            Welcome Back!
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed font-sans">
            Login to your team account to access the Smart City Innovation 2026 dashboard.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-rose-200">Authentication Failed</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Admin notice if user clicked admin tab */}
        {adminNotice && activeTab === 'admin' && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-3 text-amber-200 text-xs animate-in fade-in">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block text-amber-300">Restricted Access</span>
              <span>{adminNotice}</span>
              <button
                type="button"
                onClick={handleParticipantTabClick}
                className="block mt-1.5 text-[#C6FF35] hover:underline font-mono text-[11px]"
              >
                ← Switch back to Participant Login
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. PARTICIPANT LOGIN FORM
            ========================================================================= */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FIELD 1: EMAIL ADDRESS OR TEAM NAME */}
          <div>
            <label
              htmlFor="team-name"
              className="block text-[11px] font-mono font-bold text-zinc-300 mb-2 uppercase tracking-wider"
            >
              EMAIL ADDRESS OR TEAM NAME <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="team-name"
                name="teamName"
                type="text"
                autoComplete="off"
                disabled={isLoading}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your registered email or team name"
                className="w-full h-12 pl-12 pr-4 bg-[#070D17]/95 border border-white/[0.12] rounded-xl text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* FIELD 2: TEAM PASSWORD */}
          <div>
            <label
              htmlFor="team-password"
              className="block text-[11px] font-mono font-bold text-zinc-300 mb-2 uppercase tracking-wider"
            >
              TEAM PASSWORD <span className="text-[#C6FF35]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="team-password"
                name="teamPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                disabled={isLoading}
                value={teamPassword}
                onChange={(e) => setTeamPassword(e.target.value)}
                placeholder="Enter your team password"
                className="w-full h-12 pl-12 pr-12 bg-[#070D17]/95 border border-white/[0.12] rounded-xl text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CONTROLS ROW: REMEMBER ME & FORGOT PASSWORD */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#070D17] border-white/[0.2] text-[#C6FF35] focus:ring-[#C6FF35]/30 focus:ring-offset-0 cursor-pointer accent-[#C6FF35]"
              />
              <span className="text-zinc-300 hover:text-white transition-colors">Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => {
                alert(
                  'Password Recovery:\n\nPlease check your team leader email registered during team sign-up or contact the MGM COE Technical Helpdesk at support@mgmcen.ac.in.'
                );
              }}
              className="text-[#C6FF35] hover:text-[#d7ff66] transition-colors font-medium font-sans cursor-pointer hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* PRIMARY LOGIN BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 py-3 px-6 rounded-xl bg-[#C6FF35] text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(198,255,53,0.35)] hover:bg-[#d5ff55] hover:shadow-[0_0_32px_rgba(198,255,53,0.6)] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>AUTHENTICATING TEAM...</span>
              </>
            ) : (
              <>
                <span>LOGIN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* =========================================================================
            4. OR DIVIDER
            ========================================================================= */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.08]" />
          </div>
          <div className="relative flex justify-center text-[10px] font-mono uppercase">
            <span className="bg-[#070D17] px-3 text-zinc-500 tracking-wider">OR</span>
          </div>
        </div>

        {/* =========================================================================
            5. REGISTER YOUR TEAM LINK
            ========================================================================= */}
        <div className="text-center">
          <p className="text-xs text-zinc-300 font-sans">
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
            6. BACK TO HOME
            ========================================================================= */}
        <div className="text-center mt-5 pt-2">
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
    </div>
  );
};
