import React from 'react';
import {
  Trophy,
  Clock,
  Users,
  Tag,
  Calendar,
  ArrowRight,
  Building2,
  Cpu,
  Network,
  Rocket
} from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { ModalTabType } from '../Modals/HackathonModal';

interface OverlayManagerProps {
  currentView: number;
  scrollProgress: number;
  onOpenDetails: (tab?: ModalTabType) => void;
}

// Smooth trapezoidal fade window calculation
function calcSectionOpacity(progress: number, start: number, end: number, fadeDist = 0.05): number {
  if (progress < start - fadeDist || progress > end + fadeDist) return 0;
  if (progress >= start && progress <= end) return 1;
  if (progress < start) return (progress - (start - fadeDist)) / fadeDist;
  return (end + fadeDist - progress) / fadeDist;
}

export const OverlayManager: React.FC<OverlayManagerProps> = ({
  scrollProgress,
  onOpenDetails
}) => {
  // Stage 1: Home Screen (0.00 to 0.16)
  const stage1Opacity = scrollProgress <= 0.12 ? 1 : Math.max(0, 1 - (scrollProgress - 0.12) / 0.06);
  const stage1TranslateY = Math.min(25, scrollProgress * 160);

  // Stage 2: Hackathon Overview (0.20 to 0.46)
  const stage2Opacity = calcSectionOpacity(scrollProgress, 0.22, 0.44, 0.05);

  // Stage 3: Why Participate? (0.50 to 0.76)
  const stage3Opacity = calcSectionOpacity(scrollProgress, 0.52, 0.74, 0.05);

  // Stage 4: NWCMC Collaboration (0.80 to 1.00)
  const stage4Opacity = scrollProgress >= 0.84 ? 1 : Math.max(0, (scrollProgress - 0.78) / 0.06);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none select-none overflow-hidden font-sans">
      {/* Subtle Ambient Vignettes for Contrast and Depth */}
      <div className="absolute top-0 left-0 w-full h-44 pointer-events-none bg-gradient-to-b from-[#0B0F14]/90 via-[#0B0F14]/35 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none bg-gradient-to-t from-[#0B0F14]/95 via-[#0B0F14]/40 to-transparent" />

      {/* ========================================================
          STAGE 1: HOMEPAGE HERO — PERFECTLY CENTERED COMPOSITION
          ======================================================== */}
      {stage1Opacity > 0.01 && (
        <div
          style={{
            opacity: stage1Opacity,
            transform: `translate(-50%, -${stage1TranslateY}px)`,
            pointerEvents: stage1Opacity > 0.2 ? 'auto' : 'none'
          }}
          className="absolute top-[12%] sm:top-[13%] md:top-[14%] lg:top-[14%] left-1/2 w-[92%] sm:w-[88%] max-w-3xl flex flex-col items-center text-center transition-transform duration-100 ease-out"
        >
          {/* 1. FIRST — Hackathon Name (Two lines, Bold Space Grotesk, 2026 in Lime Accent) */}
          <h1 className="font-tech text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-[#F4F6F8] leading-[1.04] mb-2 sm:mb-2.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            SMART CITY<br />
            INNOVATION <span className="text-[#C6FF35]">2026</span>
          </h1>

          {/* 2. SECOND — Tagline (Bold, medium-large text, center-aligned) */}
          <p className="font-tech text-xs sm:text-sm md:text-base font-bold tracking-wide text-[#F4F6F8] uppercase mb-3.5 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
            Building Smarter Cities. Engineering a Better Tomorrow.
          </p>

          {/* 3. THIRD — Large Centered Prize Pool Presentation (Section 3 Requirement) */}
          <div className="flex flex-col items-center mb-3.5 sm:mb-4 select-none">
            <span className="font-mono text-[10px] sm:text-xs text-[#C6FF35] uppercase tracking-[0.25em] font-semibold mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              PRIZE POOL
            </span>
            <span className="font-tech text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F4F6F8] tracking-tight leading-none drop-shadow-[0_0_25px_rgba(198,255,53,0.35)]">
              ₹1,00,000
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#AAB4C0] uppercase tracking-[0.2em] mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              AWARDS FOR TOP-PERFORMING TEAMS
            </span>
          </div>

          {/* 4. FOURTH — Organizing Institution & NWCMC Collaboration */}
          <div className="flex flex-col items-center gap-1 mb-4 sm:mb-5">
            <p className="font-mono text-[10px] sm:text-xs md:text-[13px] text-[#AAB4C0] tracking-[0.14em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              IEI Student Chapter · IT Department · MGM's College of Engineering, Nanded
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#AAB4C0] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              A 48-hour smart-city hackathon in collaboration with{' '}
              <span className="text-[#C6FF35] font-semibold underline underline-offset-4 decoration-[#C6FF35]/60">
                NWCMC
              </span>.
            </p>
          </div>

          {/* 5. FIFTH — Countdown Timer */}
          <div className="mb-5 sm:mb-6 flex justify-center w-full">
            <CountdownTimer />
          </div>

          {/* 6. SIXTH — Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono">
            <button
              onClick={() => onOpenDetails('register')}
              className="px-7 sm:px-8 py-2.5 sm:py-3 rounded bg-[#C6FF35] hover:bg-[#d5ff55] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(198,255,53,0.35)] hover:scale-105 active:scale-100"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenDetails('tracks')}
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded bg-[#0B0F14]/75 hover:bg-[#161a22]/90 text-[#F4F6F8] hover:text-[#C6FF35] border border-white/[0.14] hover:border-[#C6FF35]/70 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <span>EXPLORE CHALLENGES</span>
              <ArrowRight className="w-4 h-4 text-[#C6FF35]" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 2: SECOND SCROLL — HACKATHON OVERVIEW (MGM College)
          ======================================================== */}
      {stage2Opacity > 0.01 && (
        <div
          style={{
            opacity: stage2Opacity,
            pointerEvents: stage2Opacity > 0.25 ? 'auto' : 'none'
          }}
          className="absolute inset-0 flex flex-col md:flex-row justify-between items-start px-6 sm:px-10 md:px-14 lg:px-16 top-24 sm:top-28 pointer-events-none transition-opacity duration-300"
        >
          {/* Left Side: Event Introduction (Open editorial layout with subtle backdrop for readability) */}
          <div className="w-full md:w-[380px] lg:w-[420px] pointer-events-auto p-5 sm:p-6 rounded-lg bg-[#0B0F14]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#C6FF35] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
              <span>02 // HACKATHON OVERVIEW</span>
            </div>

            <h2 className="font-tech text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#F4F6F8] tracking-tight leading-[1.1] mb-3.5 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              MGM INNOVATION CAMPUS
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#AAB4C0] leading-relaxed mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              An intensive 48-hour smart-city innovation hackathon bringing together developers, designers, and problem-solvers to build technology-driven solutions for real-world urban challenges.
            </p>

            <div className="pt-2 mb-4 border-t border-white/[0.08]">
              <p className="font-mono text-xs text-[#AAB4C0] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Venue: <span className="text-[#F4F6F8] font-medium">MGM's College of Engineering, Nanded.</span>
              </p>
            </div>

            <button
              onClick={() => onOpenDetails('overview')}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C6FF35] hover:text-white transition-colors group cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              <span className="underline underline-offset-4 decoration-[#C6FF35]/50 group-hover:decoration-white">Explore Guidelines</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Side: Event Details (Clean borderless list with subtle backdrop) */}
          <div className="w-full md:w-[320px] lg:w-[360px] pointer-events-auto mt-6 md:mt-0 p-5 sm:p-6 rounded-lg bg-[#0B0F14]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#C6FF35] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center justify-between">
              <span>EVENT DETAILS</span>
              <span className="text-[#AAB4C0] text-[11px]">03–04 DEC 2026</span>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.08]">
              {/* Prize Pool */}
              <div className="py-2.5 flex items-baseline justify-between group">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-[#C6FF35]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#AAB4C0]">Prize Pool</span>
                </div>
                <span className="font-tech text-xl font-bold text-[#C6FF35] drop-shadow-[0_2px_10px_rgba(198,255,53,0.3)]">
                  ₹1,00,000
                </span>
              </div>

              {/* Event Duration */}
              <div className="py-2.5 flex items-baseline justify-between group">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C6FF35]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#AAB4C0]">Event Duration</span>
                </div>
                <span className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8]">
                  48 Hours
                </span>
              </div>

              {/* Team Size */}
              <div className="py-2.5 flex items-baseline justify-between group">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#C6FF35]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#AAB4C0]">Team Size</span>
                </div>
                <span className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8]">
                  3–4 Members
                </span>
              </div>

              {/* Registration Fee */}
              <div className="py-2.5 flex items-baseline justify-between group">
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-[#C6FF35]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#AAB4C0]">Registration Fee</span>
                </div>
                <span className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8]">
                  ₹600
                </span>
              </div>

              {/* Event Dates */}
              <div className="py-2.5 flex items-baseline justify-between group">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#C6FF35]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#AAB4C0]">Event Dates</span>
                </div>
                <span className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8]">
                  3–4 December 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 3: THIRD SCROLL — WHY PARTICIPATE? (10 Benefits)
          ======================================================== */}
      {stage3Opacity > 0.01 && (
        <div
          style={{
            opacity: stage3Opacity,
            pointerEvents: stage3Opacity > 0.25 ? 'auto' : 'none'
          }}
          className="absolute inset-0 flex flex-col md:flex-row justify-between items-start px-6 sm:px-10 md:px-14 lg:px-16 top-24 sm:top-26 pointer-events-none transition-opacity duration-300"
        >
          {/* Left Column: Benefits 01–05 (Open editorial numbered list with subtle backdrop) */}
          <div className="w-full md:w-[330px] lg:w-[370px] pointer-events-auto p-5 rounded-lg bg-[#0B0F14]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#C6FF35] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
              <span>03 // WHY PARTICIPATE · 01–05</span>
            </div>

            <div className="flex flex-col space-y-3">
              {/* 01: Prize Pool */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">01</span>
                  <h3 className="font-tech text-sm sm:text-base font-bold text-[#F4F6F8] tracking-tight">
                    ₹1,00,000 PRIZE POOL
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Compete for top-ranking team awards.
                </p>
              </div>

              {/* 02: Certificate */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">02</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    CERTIFICATE
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Receive official proof of participation.
                </p>
              </div>

              {/* 03: Free Accommodation */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">03</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    FREE ACCOMMODATION
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Accommodation for the event duration, subject to final event arrangements.
                </p>
              </div>

              {/* 04: Skill Development */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">04</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    SKILL DEVELOPMENT
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Gain practical experience through building, workshops, and technical activities.
                </p>
              </div>

              {/* 05: Networking */}
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">05</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    NETWORKING
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Connect with fellow developers, industry professionals, sponsors, and peers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits 06–10 (Open editorial numbered list with subtle backdrop) */}
          <div className="w-full md:w-[330px] lg:w-[370px] pointer-events-auto mt-6 md:mt-0 p-5 rounded-lg bg-[#0B0F14]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#C6FF35] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
              <span>03 // WHY PARTICIPATE · 06–10</span>
            </div>

            <div className="flex flex-col space-y-3">
              {/* 06: Portfolio Enhancement */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">06</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    PORTFOLIO ENHANCEMENT
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Build and showcase a project that demonstrates your technical abilities.
                </p>
              </div>

              {/* 07: Career Advancement */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">07</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    CAREER ADVANCEMENT
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Explore career opportunities and professional connections.
                </p>
              </div>

              {/* 08: Personal Growth */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">08</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    PERSONAL GROWTH
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Challenge yourself, collaborate, and develop problem-solving skills.
                </p>
              </div>

              {/* 09: Internship Opportunities */}
              <div className="pb-2.5 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">09</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    INTERNSHIP OPPORTUNITIES
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Explore potential internship opportunities through recruiter interactions, subject to availability.
                </p>
              </div>

              {/* 10: Mentorship */}
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm font-bold text-[#C6FF35]">10</span>
                  <h3 className="font-tech text-sm sm:text-base font-semibold text-[#F4F6F8] tracking-tight">
                    MENTORSHIP
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-0.5 pl-6">
                  Learn from mentors and experienced professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 4: FOURTH SCROLL — IEI × NWCMC COLLABORATION
          ======================================================== */}
      {stage4Opacity > 0.01 && (
        <div
          style={{
            opacity: stage4Opacity,
            pointerEvents: stage4Opacity > 0.25 ? 'auto' : 'none'
          }}
          className="absolute inset-0 flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 top-24 sm:top-26 pointer-events-none transition-opacity duration-300"
        >
          {/* Top Collaboration Identity (Above the central municipal building) */}
          <div className="w-full text-center max-w-2xl mx-auto pointer-events-auto">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#C6FF35] mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center justify-center gap-2">
              <span>IEI STUDENT CHAPTER · IT</span>
              <span className="text-[#F4F6F8] font-bold">×</span>
              <span>NWCMC</span>
            </div>

            <h2 className="font-tech text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#F4F6F8] tracking-tight leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              BUILDING BETTER CITIES, TOGETHER.
            </h2>

            <p className="font-sans text-xs sm:text-[13px] text-[#AAB4C0] max-w-xl mx-auto mt-1 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              A collaborative smart-city innovation initiative connecting engineering students with municipal challenges and opportunities for technology-driven solutions.
            </p>
          </div>

          {/* Left and Right Open Panels, keeping the center 3D Municipal Building completely visible */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full mt-4 pb-14 pointer-events-none">
            {/* LEFT SIDE — IEI STUDENT CHAPTER */}
            <div className="w-full md:w-[320px] lg:w-[360px] pointer-events-auto p-5 rounded-lg bg-[#0B0F14]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <div className="mb-4">
                <span className="font-mono text-[11px] text-[#C6FF35] uppercase tracking-wider block mb-0.5">
                  IT DEPARTMENT
                </span>
                <h3 className="font-tech text-xl sm:text-2xl font-bold text-[#F4F6F8] tracking-tight">
                  IEI STUDENT CHAPTER
                </h3>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-1.5">
                  A student-led engineering initiative focused on innovation, technical excellence, and developing practical solutions to real-world challenges.
                </p>

                <ul className="mt-2.5 space-y-1 text-xs font-sans text-[#F4F6F8]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Student-led innovation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Technical learning and skill development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Engineering collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Student participation in solving urban challenges</span>
                  </li>
                </ul>
              </div>

              {/* Civic Innovation Pillars 01 & 02 */}
              <div className="pt-3 border-t border-white/[0.08] space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F4F6F8]">
                    <Building2 className="w-3.5 h-3.5 text-[#C6FF35]" />
                    <span>01 REAL-WORLD URBAN CHALLENGES</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#AAB4C0] leading-relaxed mt-0.5 pl-5.5">
                    Explore practical civic and municipal challenges that can benefit from innovative technology.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F4F6F8]">
                    <Rocket className="w-3.5 h-3.5 text-[#C6FF35]" />
                    <span>02 STUDENT-LED INNOVATION</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#AAB4C0] leading-relaxed mt-0.5 pl-5.5">
                    Encourage students to design, develop, and demonstrate technology-driven solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — NWCMC */}
            <div className="w-full md:w-[320px] lg:w-[360px] pointer-events-auto mt-6 md:mt-0 p-5 rounded-lg bg-[#0B0F14]/80 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <div className="mb-4">
                <span className="font-mono text-[11px] text-[#C6FF35] uppercase tracking-wider block mb-0.5">
                  NANDED-WAGHALA CITY MUNICIPAL CORPORATION
                </span>
                <h3 className="font-tech text-xl sm:text-2xl font-bold text-[#F4F6F8] tracking-tight">
                  NWCMC
                </h3>
                <p className="font-sans text-xs text-[#AAB4C0] leading-relaxed mt-1.5">
                  A municipal collaboration bringing real-world urban challenges into the student innovation ecosystem.
                </p>

                <ul className="mt-2.5 space-y-1 text-xs font-sans text-[#F4F6F8]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Real-world municipal problem statements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Urban infrastructure and civic challenges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Smart-city development opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF35]" />
                    <span>Practical technology-driven solutions</span>
                  </li>
                </ul>
              </div>

              {/* Civic Innovation Pillars 03 & 04 */}
              <div className="pt-3 border-t border-white/[0.08] space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F4F6F8]">
                    <Cpu className="w-3.5 h-3.5 text-[#C6FF35]" />
                    <span>03 CIVIC TECHNOLOGY</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#AAB4C0] leading-relaxed mt-0.5 pl-5.5">
                    Explore potential applications in urban infrastructure, public services, sustainability, and digital governance.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F4F6F8]">
                    <Network className="w-3.5 h-3.5 text-[#C6FF35]" />
                    <span>04 INDUSTRY–INSTITUTION COLLABORATION</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#AAB4C0] leading-relaxed mt-0.5 pl-5.5">
                    Connect academic learning with real-world civic problem-solving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "SCROLL TO EXPLORE" Indicator (Fades out when user starts scrolling) */}
      <div
        className={`fixed bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-all duration-500 ${scrollProgress < 0.05 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#A3ADB8] uppercase font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          Scroll to explore city
        </span>
        <span className="block h-6 w-px bg-gradient-to-b from-transparent via-[#C6FF35] to-[#C6FF35] scroll-line-pulse" />
      </div>
    </div>
  );
};
