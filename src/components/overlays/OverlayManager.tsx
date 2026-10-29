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
  Rocket,
  MapPin,
  CreditCard,
  Radio
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

const LEFT_BENEFITS = [
  {
    id: '01',
    title: 'PRIZE POOL — COMING SOON',
    desc: 'Official prize pool and awards will be announced soon.'
  },
  {
    id: '02',
    title: 'CERTIFICATE',
    desc: 'Receive official proof of participation.'
  },
  {
    id: '03',
    title: 'FREE ACCOMMODATION',
    desc: 'Accommodation for the event duration, subject to final arrangements.'
  },
  {
    id: '04',
    title: 'SKILL DEVELOPMENT',
    desc: 'Gain practical experience through building, workshops, and technical activities.'
  },
  {
    id: '05',
    title: 'NETWORKING',
    desc: 'Connect with fellow developers, industry professionals, sponsors, and peers.'
  }
];

const RIGHT_BENEFITS = [
  {
    id: '06',
    title: 'PORTFOLIO ENHANCEMENT',
    desc: 'Build and showcase a project that demonstrates your technical abilities.'
  },
  {
    id: '07',
    title: 'CAREER ADVANCEMENT',
    desc: 'Explore career opportunities and professional connections.'
  },
  {
    id: '08',
    title: 'PERSONAL GROWTH',
    desc: 'Challenge yourself, collaborate, and develop problem-solving skills.'
  },
  {
    id: '09',
    title: 'INTERNSHIP OPPORTUNITIES',
    desc: 'Explore potential internship opportunities through recruiter interactions, subject to availability.'
  },
  {
    id: '10',
    title: 'MENTORSHIP',
    desc: 'Learn from mentors and experienced professionals.'
  }
];

const HACKATHON_STATS = [
  {
    icon: Trophy,
    value: 'COMING SOON',
    label: 'PRIZE POOL',
    valueColor: 'text-[#C6FF35]',
  },
  {
    icon: Clock,
    value: '24',
    label: 'HOURS',
    valueColor: 'text-white',
  },
  {
    icon: Users,
    value: '3–4',
    label: 'MEMBERS',
    valueColor: 'text-white',
  },
  {
    icon: CreditCard,
    value: '₹600',
    label: 'REGISTRATION',
    valueColor: 'text-white',
  },
  {
    icon: Calendar,
    value: '3–4 DECEMBER 2026',
    label: 'EVENT DATES',
    valueColor: 'text-white',
  },
];

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
          className="absolute top-[18%] sm:top-[19%] md:top-[20%] left-1/2 w-[94%] sm:w-[90%] max-w-4xl flex flex-col items-center text-center transition-transform duration-100 ease-out"
        >
          {/* 1. FIRST — Main Heading (Two lines, Bold Space Grotesk, 2026 in Lime Accent) */}
          <h1
            className="font-tech text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-[#F4F6F8] leading-[1.06] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            style={{ marginBottom: '32px' }}
          >
            SMART CITY<br />
            INNOVATION <span className="text-[#C6FF35]">2026</span>
          </h1>

          {/* 2. SECOND — Boxed Countdown Timer */}
          <div className="flex justify-center w-full" style={{ marginBottom: '36px' }}>
            <CountdownTimer />
          </div>

          {/* 3. THIRD — Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Primary: REGISTER NOW */}
            <button
              id="hero-register-btn"
              onClick={() => onOpenDetails('register')}
              className="hero-btn-primary w-full sm:w-auto"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-5 h-5 text-black stroke-[2.8]" />
            </button>

            {/* Secondary: EXPLORE CHALLENGES */}
            <button
              onClick={() => onOpenDetails('tracks')}
              className="hero-btn-secondary w-full sm:w-auto group"
            >
              <span>EXPLORE CHALLENGES</span>
              <ArrowRight className="w-5 h-5 text-[#C6FF35] stroke-[2.8] transition-transform duration-200 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 2: SECOND SCROLL — HACKATHON OVERVIEW (MGM College)
          Centered Cinematic Composition with Bottom Details Row
          ======================================================== */}
      {stage2Opacity > 0.01 && (
        <div
          style={{
            opacity: stage2Opacity,
            pointerEvents: stage2Opacity > 0.25 ? 'auto' : 'none'
          }}
          className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none transition-opacity duration-300"
        >
          {/* Subtle Ambient Contrast Vignettes */}
          <div className="absolute top-0 left-0 w-full h-44 pointer-events-none bg-gradient-to-b from-[#0B0F14]/80 via-[#0B0F14]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-[#0B0F14]/95 via-[#0B0F14]/50 to-transparent" />

          {/* 1. Main Hero Content (Centered horizontally, positioned neatly below navigation bar) */}
          <div
            style={{ paddingTop: 'clamp(82px, 11vh, 96px)' }}
            className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pointer-events-auto"
          >
            {/* Bold, prominent neon lime green heading */}
            <h1 className="font-tech text-4xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-[#C6FF35] leading-none mb-3 drop-shadow-[0_4px_24px_rgba(198,255,53,0.35)]">
              CAMPUS
            </h1>

            {/* Description constrained so it wraps into two balanced lines */}
            <p className="font-sans text-xs sm:text-sm lg:text-[14px] text-zinc-200/90 leading-relaxed max-w-lg mb-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              A 24-hour smart-city hackathon turning bold ideas into technology-driven solutions for real urban challenges.
            </p>

            {/* Location icon and college name on one centered line */}
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-[13px] text-zinc-100 font-medium mb-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <MapPin className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
              <span>MGM's College of Engineering, Nanded</span>
            </div>

            {/* Explore Guidelines link directly below the location */}
            <button
              onClick={() => onOpenDetails('overview')}
              className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#C6FF35] hover:text-white transition-colors group cursor-pointer drop-shadow-[0_2px_12px_rgba(198,255,53,0.35)]"
            >
              <span>EXPLORE GUIDELINES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 2. Dedicated Bottom Statistics Bar */}
          <div className="relative w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 lg:mb-7 pointer-events-auto">
            <div className="w-full bg-[#0B0F14]/85 backdrop-blur-md border border-white/[0.12] rounded-lg py-3.5 sm:py-4 px-3 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
              {/* CSS Grid: 5 equal columns on desktop, 2-column grid on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-2 lg:gap-0 items-center">
                {HACKATHON_STATS.map((stat, idx) => {
                  const IconComp = stat.icon;
                  const isLast = idx === HACKATHON_STATS.length - 1;
                  return (
                    <div
                      key={stat.label}
                      className={`relative flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 px-2 sm:px-4 lg:px-5 ${
                        isLast ? 'col-span-2 sm:col-span-1' : ''
                      }`}
                    >
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6FF35] shrink-0" />
                      <div className="flex flex-col text-left min-w-0">
                        <span className={`font-tech text-lg sm:text-xl lg:text-[22px] xl:text-[24px] font-bold leading-tight whitespace-nowrap ${stat.valueColor}`}>
                          {stat.value}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] lg:text-[12px] uppercase tracking-wider text-zinc-400 mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                      {!isLast && (
                        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/[0.14]" />
                      )}
                    </div>
                  );
                })}
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
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        >
          {/* Subtle contrast gradient overlays behind text areas (preserving 3D city in center) */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] pointer-events-none bg-gradient-to-r from-[#0B0F14]/90 via-[#0B0F14]/50 to-transparent" />
          <div className="absolute inset-y-0 right-0 hidden lg:block w-[45%] pointer-events-none bg-gradient-to-l from-[#0B0F14]/90 via-[#0B0F14]/50 to-transparent" />

          {/* Dedicated Content Wrapper matching 4.5% horizontal padding and 55-65px spacing below navbar */}
          <div
            style={{ paddingTop: '132px' }}
            className="relative w-full h-full px-6 sm:px-10 lg:px-[4.5%] pb-6 flex flex-col justify-start overflow-y-auto lg:overflow-y-visible"
          >
            {/* 1. Section Heading Block (Upper-Left, 55-65px below navbar) */}
            <div className="w-full lg:max-w-2xl mb-5 sm:mb-6 lg:mb-8 pointer-events-auto">
              {/* Section Label: small neon-green uppercase text */}
              <div className="font-mono text-xs sm:text-sm lg:text-[13px] font-bold uppercase tracking-[0.25em] text-[#C6FF35] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                03 // WHY PARTICIPATE
              </div>

              {/* Main Heading: 64-72px on desktop */}
              <h2 className="font-tech text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-black uppercase tracking-tight leading-none mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                <span className="text-white">WHY </span>
                <span className="text-[#C6FF35]">PARTICIPATE?</span>
              </h2>

              {/* Subtitle */}
              <div className="font-mono text-xs sm:text-sm lg:text-[14px] uppercase tracking-[0.2em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <span className="text-[#C6FF35] font-bold">24-HOUR</span>
                <span className="text-[#CBD5E1] font-medium"> SMART CITY HACKATHON</span>
              </div>
            </div>

            {/* 2. Two-Column Benefits CSS Grid: 01-05 on left, 06-10 on right */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-10 xl:gap-x-14 pointer-events-auto">
              {/* Left Column: 01–05 (Columns 1 to 5) */}
              <div className="lg:col-span-5 flex flex-col">
                {LEFT_BENEFITS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 sm:gap-3.5 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 ${
                      idx !== LEFT_BENEFITS.length - 1 ? 'border-b border-white/[0.12]' : 'border-b border-white/[0.12] lg:border-b-0'
                    }`}
                  >
                    {/* [NUMBER]: 40-44px bold neon green */}
                    <span className="font-tech text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-[#C6FF35] tracking-tight leading-none shrink-0 w-12 sm:w-14 text-left tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.id}
                    </span>

                    {/* [VERTICAL GREEN DIVIDER]: thin neon-green line */}
                    <div className="w-[2px] h-9 sm:h-10 lg:h-11 bg-[#C6FF35] shrink-0 opacity-90 mx-1 sm:mx-2" />

                    {/* [TITLE AND DESCRIPTION] */}
                    <div className="flex flex-col min-w-0 pl-1">
                      <h3 className="font-tech text-base sm:text-lg lg:text-[20px] xl:text-[22px] font-bold text-white tracking-wide uppercase leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm lg:text-[14px] xl:text-[16px] text-zinc-300 leading-snug mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Central Gap Spacer (Columns 6 to 7) to keep 3D city corridor unobstructed */}
              <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

              {/* Right Column: 06–10 (Columns 8 to 12) */}
              <div className="lg:col-span-5 flex flex-col">
                {RIGHT_BENEFITS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 sm:gap-3.5 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 ${
                      idx !== RIGHT_BENEFITS.length - 1 ? 'border-b border-white/[0.12]' : ''
                    }`}
                  >
                    {/* [NUMBER]: 40-44px bold neon green */}
                    <span className="font-tech text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-[#C6FF35] tracking-tight leading-none shrink-0 w-12 sm:w-14 text-left tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.id}
                    </span>

                    {/* [VERTICAL GREEN DIVIDER]: thin neon-green line */}
                    <div className="w-[2px] h-9 sm:h-10 lg:h-11 bg-[#C6FF35] shrink-0 opacity-90 mx-1 sm:mx-2" />

                    {/* [TITLE AND DESCRIPTION] */}
                    <div className="flex flex-col min-w-0 pl-1">
                      <h3 className="font-tech text-base sm:text-lg lg:text-[20px] xl:text-[22px] font-bold text-white tracking-wide uppercase leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm lg:text-[14px] xl:text-[16px] text-zinc-300 leading-snug mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 4: FOURTH SCROLL — IEI × NWCMC COLLABORATION
          Borderless, cinematic layout matching reference image
          ======================================================== */}
      {stage4Opacity > 0.01 && (
        <div
          style={{
            opacity: stage4Opacity,
            pointerEvents: stage4Opacity > 0.25 ? 'auto' : 'none',
            paddingTop: '100px'
          }}
          className="absolute inset-0 flex flex-col justify-between px-6 sm:px-8 lg:px-12 xl:px-16 pb-4 sm:pb-5 pointer-events-none transition-opacity duration-300"
        >
          {/* Subtle edge shadow vignettes for text contrast (center remains 100% crystal clear) */}
          <div className="absolute top-0 left-0 w-[40%] h-full pointer-events-none bg-gradient-to-r from-[#070B12]/85 via-[#070B12]/30 to-transparent -z-10" />
          <div className="absolute top-0 right-0 w-[38%] h-full pointer-events-none bg-gradient-to-l from-[#070B12]/85 via-[#070B12]/30 to-transparent -z-10" />
          <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-[#070B12]/95 via-[#070B12]/60 to-transparent -z-10" />

          {/* MAIN CONTENT AREA: 3 Clear Visual Zones (Left text, Center 3D view corridor, Right text) */}
          <div className="flex-1 w-full flex flex-col lg:flex-row justify-between items-start gap-6 pointer-events-none min-h-0">
            {/* ZONE 1: LEFT CONTENT (Main Heading & Introductory Information) */}
            <div className="w-full lg:w-[420px] xl:w-[460px] max-w-[460px] pointer-events-auto text-left flex flex-col">
              {/* Collaboration Tag */}
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#C6FF35] mb-2 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                IEI STUDENT CHAPTER · IT × ENTC × NWCMC
              </div>

              {/* Main Heading: CITIES, in white, TOGETHER. in neon lime green */}
              <h1 className="font-tech text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-black tracking-tight leading-[1.05] mb-2.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                <span className="text-white">CITIES, </span>
                <span className="text-[#C6FF35] drop-shadow-[0_0_24px_rgba(198,255,53,0.45)]">TOGETHER.</span>
              </h1>

              {/* Introductory Description directly beneath the heading */}
              <p className="font-sans text-xs sm:text-sm lg:text-[14px] text-zinc-300 leading-relaxed max-w-[440px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                A collaborative smart-city innovation initiative connecting engineering students with municipal challenges and opportunities for technology-driven solutions.
              </p>

              {/* IT Department & Student Chapter */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-white/[0.1]">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#C6FF35] uppercase tracking-wider font-bold block mb-0.5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  IT DEPARTMENT
                </span>
                <h2 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  IEI STUDENT CHAPTER
                </h2>
                <p className="font-sans text-[11px] sm:text-xs text-zinc-300 leading-relaxed mt-1 max-w-[420px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  A student-led engineering initiative focused on innovation, technical excellence, and developing practical solutions to real-world challenges.
                </p>

                {/* 4 Points with Neon-Lime Icons */}
                <ul className="mt-2 space-y-1 text-[11px] sm:text-xs font-sans text-zinc-200">
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Rocket className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Student-led innovation</span>
                  </li>
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Cpu className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Technical learning and skill development</span>
                  </li>
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Network className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Engineering collaboration</span>
                  </li>
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Building2 className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Student participation in solving urban challenges</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ZONE 2: CENTER CORRIDOR (Negative Space for 3D Building & Metropolis) */}
            <div className="hidden lg:block flex-1 min-w-[240px] pointer-events-none" />

            {/* ZONE 3: RIGHT CONTENT (Supporting Information: NWCMC & ENTC) */}
            <div className="w-full lg:w-[380px] xl:w-[420px] max-w-[420px] pointer-events-auto text-left flex flex-col">
              {/* NWCMC Section */}
              <div>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#C6FF35] uppercase tracking-wider font-bold block mb-0.5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  NANDED-WAGHALA CITY MUNICIPAL CORPORATION
                </span>
                <h2 className="font-tech text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  NWCMC
                </h2>
                <p className="font-sans text-[11px] sm:text-xs text-zinc-300 leading-relaxed mt-1 max-w-[380px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  A municipal collaboration bringing real-world urban challenges into the student innovation ecosystem.
                </p>

                {/* 4 Points with Neon-Lime Icons */}
                <ul className="mt-2 space-y-1 text-[11px] sm:text-xs font-sans text-zinc-200">
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Building2 className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Real-world municipal problem statements</span>
                  </li>
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Network className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Urban infrastructure and civic challenges</span>
                  </li>
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <MapPin className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Smart-city development opportunities</span>
                  </li>
                  <li className="flex items-center gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <Cpu className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <span>Practical technology-driven solutions</span>
                  </li>
                </ul>
              </div>

              {/* DEDICATED ENTC DEPARTMENT SECTION */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-white/[0.1]">
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="w-3.5 h-3.5 text-[#C6FF35]" />
                  <span className="font-mono text-[11px] text-[#C6FF35] uppercase tracking-wider font-bold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    ENTC DEPARTMENT
                  </span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-zinc-300 leading-relaxed max-w-[380px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Focuses on communication technologies, IoT, embedded systems, and signal processing to enable smart and connected urban solutions.
                </p>
                <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] sm:text-[11px] font-mono text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C6FF35]" />
                    <span>IoT & Sensors</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C6FF35]" />
                    <span>Embedded Systems</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C6FF35]" />
                    <span>Wireless Networks</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#C6FF35]" />
                    <span>Real-time Monitoring</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DEDICATED BOTTOM INFORMATION CARDS ROW (01, 02, 03, 04 in 1 consistent horizontal row on desktop) */}
          <div className="w-full max-w-[1720px] mx-auto pointer-events-auto mt-4 sm:mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
              {/* Card 01 */}
              <div className="bg-[#0B0F15]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#C6FF35]/40 rounded-xl p-3 sm:p-3.5 lg:p-4 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-tech text-sm sm:text-base font-black text-[#C6FF35] tracking-tight">01</span>
                    <Building2 className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <h3 className="font-tech text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider leading-tight">
                      REAL-WORLD URBAN CHALLENGES
                    </h3>
                  </div>
                  <p className="font-sans text-[11px] sm:text-xs text-zinc-300/90 leading-relaxed">
                    Explore practical civic and municipal challenges that can benefit from innovative technology.
                  </p>
                </div>
              </div>

              {/* Card 02 */}
              <div className="bg-[#0B0F15]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#C6FF35]/40 rounded-xl p-3 sm:p-3.5 lg:p-4 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-tech text-sm sm:text-base font-black text-[#C6FF35] tracking-tight">02</span>
                    <Rocket className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <h3 className="font-tech text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider leading-tight">
                      STUDENT-LED INNOVATION
                    </h3>
                  </div>
                  <p className="font-sans text-[11px] sm:text-xs text-zinc-300/90 leading-relaxed">
                    Encourage students to design, develop, and demonstrate technology-driven solutions.
                  </p>
                </div>
              </div>

              {/* Card 03 */}
              <div className="bg-[#0B0F15]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#C6FF35]/40 rounded-xl p-3 sm:p-3.5 lg:p-4 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-tech text-sm sm:text-base font-black text-[#C6FF35] tracking-tight">03</span>
                    <Cpu className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <h3 className="font-tech text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider leading-tight">
                      CIVIC TECHNOLOGY
                    </h3>
                  </div>
                  <p className="font-sans text-[11px] sm:text-xs text-zinc-300/90 leading-relaxed">
                    Explore potential applications in urban infrastructure, public services, sustainability, and digital governance.
                  </p>
                </div>
              </div>

              {/* Card 04 */}
              <div className="bg-[#0B0F15]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#C6FF35]/40 rounded-xl p-3 sm:p-3.5 lg:p-4 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-tech text-sm sm:text-base font-black text-[#C6FF35] tracking-tight">04</span>
                    <Network className="w-3.5 h-3.5 text-[#C6FF35] shrink-0" />
                    <h3 className="font-tech text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider leading-tight">
                      INDUSTRY–INSTITUTION COLLABORATION
                    </h3>
                  </div>
                  <p className="font-sans text-[11px] sm:text-xs text-zinc-300/90 leading-relaxed">
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
