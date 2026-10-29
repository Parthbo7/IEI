import React, { useState } from 'react';
import { Users, Settings, Building2 } from 'lucide-react';
import { ParticipantLoginForm } from './ParticipantLoginForm';
import { TeamDashboardModal } from './TeamDashboardModal';
import { TeamSession, getActiveSession } from './authService';

interface LoginPageProps {
  onBackToHome: () => void;
  onNavigateToRegister: () => void;
  onNavigateToDashboard: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  onNavigateToRegister,
  onNavigateToDashboard,
}) => {
  const [activeSession, setActiveSession] = useState<TeamSession | null>(() => getActiveSession());
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLoginSuccess = (session: TeamSession) => {
    setActiveSession(session);
    onNavigateToDashboard();
  };

  const handleLogout = () => {
    setActiveSession(null);
    setShowDashboard(false);
  };

  return (
    <div className="relative z-20 min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-x-hidden">
      {/* Cinematic Ambient Backdrop Lighting & Selective Edge Vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-gradient-to-r from-[#070A0F]/80 via-[#070A0F]/20 to-[#070A0F]/40"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#070A0F]/50 via-transparent to-[#070A0F]/80"
      />
      {/* Subtle radial glow accent */}
      <div
        aria-hidden="true"
        className="fixed top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none bg-[#C6FF35]/[0.035] blur-[140px]"
      />

      {/* Main Container: Wide 2-Column Responsive Layout matching reference image */}
      <div className="relative max-w-[1440px] xl:max-w-[1520px] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-10 xl:gap-14 my-auto">
        {/* =========================================================================
            LEFT COLUMN: BRANDING AND INTRODUCTION (~50%)
            ========================================================================= */}
        <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-center space-y-6 text-left shrink-0">
          {/* Event Identifier with Glowing Indicator */}
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF35] shadow-[0_0_10px_#C6FF35] animate-pulse" />
            <span className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] uppercase text-[#C6FF35]">
              SMART CITY INNOVATION 2026
            </span>
          </div>

          {/* Main Heading: CITIES, TOGETHER. */}
          <h1 className="text-5xl sm:text-6xl lg:text-[68px] xl:text-[80px] font-black uppercase tracking-tight leading-[0.92] font-sans">
            <span className="text-white block">CITIES,</span>
            <span className="text-[#C6FF35] block drop-shadow-[0_0_35px_rgba(198,255,53,0.45)]">
              TOGETHER.
            </span>
          </h1>

          {/* Subtitle / Introduction */}
          <p className="text-zinc-300 text-sm sm:text-base xl:text-[16px] max-w-[480px] leading-relaxed font-sans font-normal">
            A collaborative smart-city innovation initiative connecting engineering students with municipal
            challenges and opportunities for technology-driven solutions.
          </p>

          {/* Feature Highlights: 3 Vertically Stacked Items with Neon-Green Icons */}
          <div className="space-y-4 pt-1">
            {/* Highlight 01 */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-2xl bg-[#0E1624]/80 border border-[#C6FF35]/50 flex items-center justify-center text-[#C6FF35] shadow-[0_0_14px_rgba(198,255,53,0.2)] shrink-0 transition-transform group-hover:scale-105">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
                  Innovate for Real Cities
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Tackle real municipal challenges.
                </p>
              </div>
            </div>

            {/* Highlight 02 */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-2xl bg-[#0E1624]/80 border border-[#C6FF35]/50 flex items-center justify-center text-[#C6FF35] shadow-[0_0_14px_rgba(198,255,53,0.2)] shrink-0 transition-transform group-hover:scale-105">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
                  Build Practical Solutions
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Turn ideas into technology-driven impact.
                </p>
              </div>
            </div>

            {/* Highlight 03 */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-2xl bg-[#0E1624]/80 border border-[#C6FF35]/50 flex items-center justify-center text-[#C6FF35] shadow-[0_0_14px_rgba(198,255,53,0.2)] shrink-0 transition-transform group-hover:scale-105">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
                  Collaborate and Grow
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Work with like-minded innovators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: PARTICIPANT LOGIN CARD (~48%)
            ========================================================================= */}
        <div className="w-full lg:w-[48%] xl:w-[46%] flex justify-center lg:justify-end">
          <div className="w-full max-w-[500px] xl:max-w-[520px]">
            <ParticipantLoginForm
              onSuccess={handleLoginSuccess}
              onNavigateToRegister={onNavigateToRegister}
              onBackToHome={onBackToHome}
            />
          </div>
        </div>
      </div>

      {/* Authenticated Team Dashboard Modal */}
      <TeamDashboardModal
        session={activeSession}
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};
