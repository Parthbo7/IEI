import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Calendar,
  Compass,
  Users,
  CheckCircle,
  ExternalLink,
  HelpCircle,
  Mail,
  Lock,
  Building,
  Handshake,
  ChevronDown,
  Award,
  MapPin,
  Clock,
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';
import { HACKATHON_CONFIG } from '../../config/hackathonConfig';
import { ComingSoonView } from './ComingSoonView';

export type ModalTabType =
  | 'overview'
  | 'tracks'
  | 'prizes'
  | 'schedule'
  | 'register'
  | 'sponsors'
  | 'faq'
  | 'contact'
  | 'login';

interface HackathonModalProps {
  isOpen: boolean;
  initialTab?: ModalTabType;
  onClose: () => void;
}

export const HackathonModal: React.FC<HackathonModalProps> = ({
  isOpen,
  initialTab = 'overview',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<ModalTabType>(initialTab);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Sync active tab whenever modal opens or initialTab changes
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Who is eligible to participate in the Smart City Hackathon?',
      a: 'Undergraduate and postgraduate engineering, technology, and polytechnic students from recognized institutions across India. Cross-disciplinary and multi-department teams are encouraged.'
    },
    {
      q: 'What is the team size requirement?',
      a: 'Teams must consist of 2 to 4 members, including 1 designated Team Leader who serves as the primary liaison for mentor checkpoints and submission reviews.'
    },
    {
      q: 'Is this an online or in-person hackathon?',
      a: "Smart City Innovation 2026 is an intensive 24-hour in-person hackathon hosted at MGM's College of Engineering campus in Nanded, Maharashtra."
    },
    {
      q: 'What will be provided to participants during the 24 hours?',
      a: 'All verified teams receive continuous high-speed Wi-Fi, power connectivity, dedicated lab workstations, meals, midnight refreshments, and access to industry/municipal mentors.'
    },
    {
      q: 'How will projects be evaluated?',
      a: 'A joint jury comprising municipal leadership from NWCMC, academic experts, and industry tech leaders will evaluate solutions based on technical innovation, feasibility, civic impact, and working prototype fidelity.'
    },
    {
      q: 'What is the registration process and fee?',
      a: 'Registration is ₹600 per team. You can register your team immediately using the dedicated Register button on the website.'
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0E15] border border-white/[0.12] rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-zinc-300">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-[#070A0F]/90">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_16px_rgba(198,255,53,0.35)] shrink-0">
              <svg width="20" height="22" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1524 3.33203C8.00879 3.33203 6.02803 4.47562 4.95624 6.33203L1.10723 12.9987C0.0354385 14.8551 0.0354366 17.1423 1.10723 18.9987L4.95624 25.6654C6.02803 27.5218 8.00879 28.6654 10.1524 28.6654H17.8504C19.994 28.6654 21.9747 27.5218 23.0465 25.6654L26.8955 18.9987C27.9673 17.1423 27.9673 14.8551 26.8955 12.9987L23.0465 6.33203C21.9747 4.47563 19.994 3.33203 17.8504 3.33203H10.1524ZM17.8504 7.33203L13.0391 7.33203C12.2693 7.33203 11.7883 8.16529 12.1738 8.83162C13.3631 10.8875 14.5553 12.9418 15.7428 14.9987C16.1001 15.6175 16.1001 16.3799 15.7428 16.9987C14.5553 19.0556 13.3631 21.1099 12.1738 23.1658C11.7883 23.8321 12.2693 24.6654 13.0391 24.6654H17.8504C18.5649 24.6654 19.2252 24.2842 19.5824 23.6654L23.4314 16.9987C23.7887 16.3799 23.7887 15.6175 23.4314 14.9987L19.5824 8.33203C19.2252 7.71323 18.5649 7.33203 17.8504 7.33203Z"
                  fill="black"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-tech text-white text-base sm:text-lg font-bold tracking-wide leading-tight">
                SMART CITY INNOVATION HACKATHON 2026
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                MGM's College of Engineering · IEI Student Chapter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#C6FF35]/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs Bar */}
        <div className="flex items-center gap-2 sm:gap-4 px-6 sm:px-8 border-b border-white/[0.08] bg-[#070A0F] overflow-x-auto text-xs font-mono scrollbar-none">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'schedule'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Schedule
          </button>

          <button
            onClick={() => setActiveTab('tracks')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'tracks'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Problem Statements
          </button>

          <button
            onClick={() => setActiveTab('sponsors')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'sponsors'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Sponsors
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'faq'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'contact'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => setActiveTab('login')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'login'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Portal Login
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'overview'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('prizes')}
            className={`py-3.5 px-2 border-b-2 font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer uppercase ${
              activeTab === 'prizes'
                ? 'text-[#C6FF35] border-[#C6FF35] font-bold'
                : 'text-zinc-400 border-transparent hover:text-white'
            }`}
          >
            Prizes
          </button>
        </div>

        {/* Modal Content Body */}
        <div
          className={`flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-sm ${
            ['schedule', 'tracks', 'sponsors'].includes(activeTab)
              ? 'flex flex-col items-center justify-center min-h-[460px]'
              : ''
          }`}
        >
          {/* =========================================================
              TAB: SCHEDULE (COMING SOON)
              ========================================================= */}
          {activeTab === 'schedule' && (
            <ComingSoonView
              label="SMART CITY INNOVATION 2026"
              heading="COMING SOON..."
              description="Official schedule and event details will be announced soon. Stay tuned for updates."
              icon={<Calendar className="w-10 h-10 stroke-[2.2]" />}
            />
          )}

          {/* =========================================================
              TAB: PROBLEM STATEMENTS & TRACKS (COMING SOON)
              ========================================================= */}
          {activeTab === 'tracks' && (
            <ComingSoonView
              label="SMART CITY CHALLENGES"
              heading="COMING SOON..."
              description="Exciting real-world urban challenges will be revealed soon. Get ready to innovate."
              icon={<Compass className="w-10 h-10 stroke-[2.2]" />}
            />
          )}

          {/* =========================================================
              TAB: SPONSORS & PARTNERS (COMING SOON)
              ========================================================= */}
          {activeTab === 'sponsors' && (
            <ComingSoonView
              label="OUR PARTNERS"
              heading="COMING SOON..."
              description="We're bringing together organizations and technology partners to power the next generation of smart-city innovation."
              icon={<Handshake className="w-10 h-10 stroke-[2.2]" />}
            />
          )}

          {/* =========================================================
              TAB: FAQ
              ========================================================= */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-[#0E1520] border border-white/[0.1] rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-widest font-bold mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="font-tech text-white text-2xl font-bold tracking-tight">
                  Everything You Need to Know
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                  Have questions about registration, eligibility, evaluation, or logistics? Find answers below.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#070A0F] border border-white/[0.08] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-sm font-tech font-bold text-white hover:text-[#C6FF35] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C6FF35] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-white/[0.05] text-xs font-sans text-zinc-300 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: CONTACT
              ========================================================= */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-[#0E1520] border border-white/[0.1] rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-widest font-bold mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Official Organizing Secretariat</span>
                </div>
                <h3 className="font-tech text-white text-2xl font-bold tracking-tight">
                  Get in Touch
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                  For participation queries, travel assistance, or institutional partnerships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#070A0F] border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 text-[#C6FF35] text-xs font-mono font-bold">
                    <Mail className="w-4 h-4" />
                    <span>EMAIL COMMUNICATIONS</span>
                  </div>
                  <a
                    href="mailto:iei.it@mgmcen.ac.in"
                    className="font-tech text-lg text-white hover:text-[#C6FF35] transition-colors block font-bold"
                  >
                    iei.it@mgmcen.ac.in
                  </a>
                  <p className="text-xs font-mono text-zinc-400">
                    Official inquiries, verification support, and sponsorship proposals.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#070A0F] border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2 text-[#C6FF35] text-xs font-mono font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>EVENT VENUE</span>
                  </div>
                  <h5 className="font-tech text-lg text-white font-bold">
                    MGM's College of Engineering
                  </h5>
                  <p className="text-xs font-mono text-zinc-400">
                    VIP Road, Nanded, Maharashtra - 431605, India
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#070A0F] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">Helpline Numbers & Coordinators:</span>
                  <span className="text-zinc-400 text-xs">Direct mobile helplines and student coordinators will be designated closer to the event.</span>
                </div>
                <span className="text-[#C6FF35] font-semibold px-3 py-1 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/25 self-start sm:self-auto shrink-0">
                  Announcement Pending
                </span>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: LOGIN (CLEAR STRUCTURED PARTICIPANT GATEWAY)
              ========================================================= */}
          {activeTab === 'login' && (
            <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
              <div className="bg-[#0E1520] border border-white/[0.1] rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#C6FF35]/10 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35] mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-tech text-white text-xl font-bold tracking-tight">
                  Team & Participant Portal Login
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 max-w-md mx-auto">
                  Access your registered team workspace, project submission dashboard, and mentor checkpoint feedback.
                </p>
              </div>

              {/* Informational Status Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3 text-xs font-mono">
                <AlertCircle className="w-5 h-5 text-[#C6FF35] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-white font-bold block">PORTAL CREDENTIALS PROVISIONING</span>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Login credentials and team access tokens are generated upon application verification and activated prior to Day 1 sprint kickoff.
                  </p>
                </div>
              </div>

              {/* Login Form Interface */}
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-mono text-zinc-300 block font-medium">
                    Team ID or Registered Leader Email
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SCI-2026-TEAM-042 or leader@college.edu"
                    className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/[0.12] text-sm font-sans text-white placeholder-zinc-500 focus:border-[#C6FF35] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-mono text-zinc-300 block font-medium">
                    Security Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your team password"
                    className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/[0.12] text-sm font-sans text-white placeholder-zinc-500 focus:border-[#C6FF35] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(198,255,53,0.35)] hover:bg-[#d5ff55] transition-all cursor-pointer"
                >
                  ENTER PARTICIPANT WORKSPACE
                </button>
              </form>
            </div>
          )}

          {/* =========================================================
              TAB: OVERVIEW
              ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-[#0E1520] border border-white/[0.1] rounded-2xl p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-widest font-bold">
                  <Compass className="w-4 h-4" />
                  <span>Theme & Core Objective</span>
                </div>
                <h3 className="font-tech text-white text-2xl font-bold tracking-tight">
                  {HACKATHON_CONFIG.theme.title}
                </h3>
                <p className="leading-relaxed text-xs sm:text-sm font-sans text-zinc-300">
                  {HACKATHON_CONFIG.theme.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HACKATHON_CONFIG.theme.focus.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#070A0F] border border-white/[0.08] flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#C6FF35] shrink-0" />
                    <span className="text-xs font-mono text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: PRIZES
              ========================================================= */}
          {activeTab === 'prizes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="relative py-14 px-6 sm:px-12 rounded-3xl bg-[#080D15]/90 border border-white/[0.1] text-center max-w-2xl mx-auto space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C6FF35]/[0.08] rounded-full blur-3xl pointer-events-none" />

                <div className="w-16 h-16 rounded-2xl bg-[#0E1624] border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35] mx-auto shadow-[0_0_28px_rgba(198,255,53,0.25)]">
                  <Trophy className="w-8 h-8 animate-pulse" />
                </div>

                <div className="inline-block px-3.5 py-1 rounded-full bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] font-mono text-xs font-bold tracking-widest uppercase">
                  PRIZES & REWARDS
                </div>

                <div className="space-y-3">
                  <h3 className="font-tech text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    COMING SOON...
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base font-sans max-w-md mx-auto leading-relaxed">
                    Official prize pool, award categories, and incentive details will be announced soon. Stay tuned for updates.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
                  <span>Cash prizes, citations, and incubation opportunities will be awarded to top-performing teams.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonModal;
