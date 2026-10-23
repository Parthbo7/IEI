import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Calendar,
  Compass,
  Users,
  CheckCircle,
  ExternalLink,
  Zap,
  ShieldAlert,
  Navigation as NavIcon,
  Activity,
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
  Info
} from 'lucide-react';
import { HACKATHON_CONFIG } from '../../config/hackathonConfig';

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
      q: 'Who is eligible to participate in the hackathon?',
      a: 'The hackathon is open to all undergraduate and postgraduate students enrolled in recognized engineering, technology, and computer science programs across India.'
    },
    {
      q: 'What is the permitted team size?',
      a: 'Teams must consist of 2 to 4 members. Interdisciplinary teams combining software, hardware/IoT, and urban design perspectives are strongly encouraged.'
    },
    {
      q: 'What are the problem statements and theme?',
      a: 'The overarching theme is Futuristic Cities and Smart Urban Innovation, covering 4 tracks: Smart Energy Grids, Autonomous Transit, Civic Intelligence & Waste, and Disaster Resilience. Detailed problem statements will be released soon.'
    },
    {
      q: 'Is accommodation and food provided for outstation teams?',
      a: 'Yes, full hospitality including campus accommodation, food, high-speed networking, and mentorship zones will be provided at MGM’s College of Engineering campus, Nanded during the 48-hour hackathon.'
    },
    {
      q: 'How will projects be evaluated?',
      a: 'A joint jury comprising municipal leadership from NWCMC, academic experts, and industry tech leaders will evaluate solutions based on technical innovation, feasibility, civic impact, and working prototype fidelity.'
    },
    {
      q: 'What is the registration process and fee?',
      a: 'Registration is ₹600 per team. Online registration portals and guidelines will be opened shortly. Keep an eye on announcements.'
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E1319] border border-[#2B333A] rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-[#2B333A] bg-[#0A0D12]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_14px_rgba(198,255,53,0.4)]">
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
              <h2 className="font-tech text-white text-base sm:text-lg font-bold tracking-wide">
                {HACKATHON_CONFIG.eventName}
              </h2>
              <p className="text-xs font-mono text-[#AAB4C0]">
                {HACKATHON_CONFIG.organizer.institution} · {HACKATHON_CONFIG.organizer.chapter}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded bg-[#181D24] border border-[#2B333A] flex items-center justify-center text-[#AAB4C0] hover:text-white hover:border-[#C6FF35]/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-2.5 border-b border-[#2B333A] bg-[#0C1016] overflow-x-auto text-xs font-mono scrollbar-none">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'schedule'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Schedule
          </button>

          <button
            onClick={() => setActiveTab('tracks')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tracks'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Problem Statements & Tracks
          </button>

          <button
            onClick={() => setActiveTab('sponsors')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'sponsors'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Sponsors
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'faq'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'contact'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => setActiveTab('login')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'login'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Portal Login
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Theme & Overview
          </button>

          <button
            onClick={() => setActiveTab('prizes')}
            className={`pb-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'prizes'
                ? 'text-[#C6FF35] border-[#C6FF35]'
                : 'text-[#AAB4C0] border-transparent hover:text-white'
            }`}
          >
            Prizes
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-[#AAB4C0]">
          {/* TAB: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="glass-panel p-4 sm:p-5 border-[#C6FF35]/30">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                    <Calendar className="w-4 h-4" />
                    <span>Official 48-Hour Event Timeline</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C6FF35] font-bold px-2 py-0.5 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/30">
                    DETAILED TIMINGS COMING SOON
                  </span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold mt-2">
                  {HACKATHON_CONFIG.eventDates.display} · Non-Stop In-Person Sprint
                </h3>
                <p className="text-xs font-mono text-[#AAB4C0] mt-1">
                  Hosted at {HACKATHON_CONFIG.organizer.institution}, {HACKATHON_CONFIG.organizer.location}
                </p>
              </div>

              {HACKATHON_CONFIG.schedule.map((dayPlan, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#2B333A] pb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C6FF35]" />
                      <h4 className="font-tech text-white text-base font-bold">
                        {dayPlan.day}
                      </h4>
                      <span className="text-xs font-mono text-[#7E8895]">
                        — {dayPlan.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#C6FF35] font-bold px-2 py-0.5 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/30">
                      COMING SOON
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {dayPlan.items.map((item, j) => (
                      <div
                        key={j}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded bg-[#141920] border border-[#2B333A] text-xs font-mono gap-1.5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#C6FF35] font-semibold min-w-28">
                            {item.time}
                          </span>
                          <span className="text-[#F4F6F8] font-bold">
                            {item.event}
                          </span>
                        </div>
                        <span className="text-[#7E8895] text-[11px] sm:text-right">
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: TRACKS & PROBLEM STATEMENTS */}
          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <div className="glass-panel p-4 sm:p-5 border-[#C6FF35]/30">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>Municipal Problem Statements & Innovation Tracks</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C6FF35] font-bold px-2 py-0.5 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/30">
                    STATEMENTS ANNOUNCED SHORTLY
                  </span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold mt-2">
                  4 Critical Urban Frontiers
                </h3>
                <p className="text-xs font-mono text-[#AAB4C0] mt-1 leading-relaxed">
                  Developed in consultation with civic administrators to solve concrete problems facing Indian smart cities.
                </p>
              </div>

              {HACKATHON_CONFIG.tracks.map(track => (
                <div
                  key={track.id}
                  className="glass-panel p-5 border-[#2B333A] hover:border-[#C6FF35]/40 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#161C24] border border-[#2B333A] flex items-center justify-center text-[#C6FF35]">
                        {track.id.includes('energy') && <Zap className="w-5 h-5" />}
                        {track.id.includes('mobility') && <NavIcon className="w-5 h-5" />}
                        {track.id.includes('civic') && <Activity className="w-5 h-5" />}
                        {track.id.includes('resilience') && <ShieldAlert className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-tech text-white text-base font-bold">
                          {track.title}
                        </h4>
                        <p className="text-xs font-mono text-[#7E8895]">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-[#C6FF35]/15 text-[#C6FF35] font-mono text-xs border border-[#C6FF35]/30 shrink-0">
                      {track.metric}
                    </span>
                  </div>

                  <p className="text-xs font-mono leading-relaxed text-[#AAB4C0]">
                    {track.description}
                  </p>

                  <div className="pt-2 border-t border-[#2B333A]/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-[11px] text-[#7E8895] uppercase">
                      Problem Statements & Rubrics:
                    </span>
                    <span className="text-[10px] text-[#C6FF35] uppercase font-bold px-2 py-0.5 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/30">
                      COMING SOON
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: SPONSORS */}
          {activeTab === 'sponsors' && (
            <div className="space-y-6">
              <div className="glass-panel p-4 sm:p-5 border-[#C6FF35]/30">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                  <Handshake className="w-4 h-4" />
                  <span>Partners & Industry Sponsors</span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold mt-2">
                  Building Civic Innovation Ecosystems
                </h3>
                <p className="text-xs font-mono text-[#AAB4C0] mt-1 leading-relaxed">
                  Smart City Innovation Hackathon 2026 brings together government municipal leadership, engineering academia, and cutting-edge technology enterprises.
                </p>
              </div>

              {/* Confirmed Partners */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-white uppercase tracking-wider">
                  Confirmed Organizing & Knowledge Partners:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded bg-[#141920] border border-[#2B333A] space-y-1.5">
                    <span className="text-[10px] font-mono text-[#C6FF35] uppercase block font-semibold">ORGANIZING BODY</span>
                    <h5 className="font-tech text-white font-bold text-sm">IEI Student Chapter</h5>
                    <p className="text-xs font-mono text-[#7E8895]">Department of Information Technology</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/[0.05] text-[#C6FF35] text-[10px] font-mono border border-[#C6FF35]/30">Confirmed</span>
                  </div>

                  <div className="p-4 rounded bg-[#141920] border border-[#2B333A] space-y-1.5">
                    <span className="text-[10px] font-mono text-[#C6FF35] uppercase block font-semibold">HOST INSTITUTION</span>
                    <h5 className="font-tech text-white font-bold text-sm">MGM's College of Engineering</h5>
                    <p className="text-xs font-mono text-[#7E8895]">Nanded, Maharashtra</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/[0.05] text-[#C6FF35] text-[10px] font-mono border border-[#C6FF35]/30">Confirmed</span>
                  </div>

                  <div className="p-4 rounded bg-[#141920] border border-[#2B333A] space-y-1.5">
                    <span className="text-[10px] font-mono text-[#C6FF35] uppercase block font-semibold">MUNICIPAL PARTNER</span>
                    <h5 className="font-tech text-white font-bold text-sm">NWCMC</h5>
                    <p className="text-xs font-mono text-[#7E8895]">Nanded-Waghala Municipal Corporation</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/[0.05] text-[#C6FF35] text-[10px] font-mono border border-[#C6FF35]/30">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Title & Industry Sponsors Coming Soon */}
              <div className="p-5 rounded bg-[#141920] border border-[#2B333A] space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-tech text-white font-bold text-base">
                    Title, Cloud & Industry Technology Sponsors
                  </h4>
                  <span className="text-xs font-mono text-[#C6FF35] font-bold px-2.5 py-1 rounded bg-[#C6FF35]/15 border border-[#C6FF35]/35">
                    COMING SOON
                  </span>
                </div>
                <p className="text-xs font-mono text-[#AAB4C0] leading-relaxed">
                  Official corporate sponsors, developer tooling partners, cloud credit providers, and recruitment scouts will be revealed shortly.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono">
                  <span className="text-[#7E8895]">Interested in partnering or sponsoring?</span>
                  <a
                    href="mailto:iei.it@mgmcen.ac.in"
                    className="text-[#C6FF35] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>iei.it@mgmcen.ac.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="glass-panel p-4 sm:p-5 border-[#C6FF35]/30">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold mt-2">
                  Everything You Need to Know
                </h3>
                <p className="text-xs font-mono text-[#AAB4C0] mt-1">
                  Have questions about registration, rules, judging, or the 48-hour schedule? Find answers below.
                </p>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded bg-[#141920] border border-[#2B333A] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-tech font-bold text-white hover:text-[#C6FF35] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C6FF35] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 border-t border-[#2B333A]/50 text-xs font-mono text-[#AAB4C0] leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="glass-panel p-4 sm:p-5 border-[#C6FF35]/30">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Official Organizing & Institutional Contacts</span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold mt-2">
                  Get in Touch with the Hackathon Secretariat
                </h3>
                <p className="text-xs font-mono text-[#AAB4C0] mt-1">
                  For participation queries, travel guidance, or institutional partnerships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-[#141920] border border-[#2B333A] space-y-2">
                  <div className="flex items-center gap-2 text-[#C6FF35] text-xs font-mono font-bold">
                    <Mail className="w-4 h-4" />
                    <span>EMAIL COMMUNICATIONS</span>
                  </div>
                  <a
                    href="mailto:iei.it@mgmcen.ac.in"
                    className="font-tech text-base text-white hover:text-[#C6FF35] transition-colors block font-semibold"
                  >
                    iei.it@mgmcen.ac.in
                  </a>
                  <p className="text-[11px] font-mono text-[#7E8895]">
                    Official inquiries, sponsorship proposals, and team verifications.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#141920] border border-[#2B333A] space-y-2">
                  <div className="flex items-center gap-2 text-[#C6FF35] text-xs font-mono font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>EVENT LOCATION & VENUE</span>
                  </div>
                  <h5 className="font-tech text-base text-white font-semibold">
                    {HACKATHON_CONFIG.organizer.institution}
                  </h5>
                  <p className="text-[11px] font-mono text-[#7E8895]">
                    VIP Road, Nanded, Maharashtra - 431605, India
                  </p>
                </div>
              </div>

              <div className="p-4 rounded bg-[#141920] border border-[#2B333A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">Student & Faculty Helplines:</span>
                  <span className="text-[#7E8895] text-[11px]">Direct mobile helplines and faculty coordinator contacts</span>
                </div>
                <span className="text-[#C6FF35] font-bold px-3 py-1 rounded bg-[#C6FF35]/10 border border-[#C6FF35]/30 self-start sm:self-auto">
                  COMING SOON
                </span>
              </div>
            </div>
          )}

          {/* TAB: LOGIN (PLACEHOLDER INTEGRATION POINT) */}
          {activeTab === 'login' && (
            <div className="space-y-6">
              <div className="glass-panel p-4 sm:p-5 border-[#C6FF35]/30">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>Participant & Reviewer Portal</span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold mt-2">
                  Team & Jury Authentication Gateway
                </h3>
                <p className="text-xs font-mono text-[#AAB4C0] mt-1 leading-relaxed">
                  Access your team workspace, project submission dashboard, code repository linking, and live mentor checkpoint reviews.
                </p>
              </div>

              {/* Status Integration Notice */}
              <div className="p-4 rounded bg-[#141920] border border-[#C6FF35]/30 flex items-start gap-3 text-xs font-mono">
                <Info className="w-5 h-5 text-[#C6FF35] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold">PORTAL AUTHENTICATION INTEGRATION</span>
                    <span className="text-[10px] text-[#C6FF35] font-bold px-2 py-0.5 rounded bg-[#C6FF35]/15 border border-[#C6FF35]/35">
                      COMING SOON
                    </span>
                  </div>
                  <p className="text-[#AAB4C0] text-[11px] leading-relaxed">
                    Credentials and team access tokens will be provisioned directly to registered team leads upon application verification. Authentication services will be activated prior to Day 1 sprint kickoff.
                  </p>
                </div>
              </div>

              {/* Visual Clean Form Placeholder */}
              <div className="p-5 rounded bg-[#141920] border border-[#2B333A] space-y-4 opacity-75">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white block">
                    Team ID or Registered Institutional Email
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="e.g. SCI-2026-TEAM-042 or teamlead@college.edu"
                    className="w-full px-3.5 py-2.5 rounded bg-[#0A0D12] border border-[#2B333A] text-xs font-mono text-[#7E8895] cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white block">
                    Access Token / Security PIN
                  </label>
                  <input
                    type="password"
                    disabled
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded bg-[#0A0D12] border border-[#2B333A] text-xs font-mono text-[#7E8895] cursor-not-allowed"
                  />
                </div>

                <button
                  disabled
                  className="w-full py-2.5 rounded bg-[#202730] border border-[#2B333A] text-xs font-mono text-[#7E8895] font-bold uppercase tracking-wider cursor-not-allowed"
                >
                  Portal Login Disabled [Awaiting Sprint Inception]
                </button>
              </div>
            </div>
          )}

          {/* TAB: THEME & OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="glass-panel p-5 space-y-3 border-[#C6FF35]/30">
                <div className="flex items-center gap-2 text-[#C6FF35] font-mono text-xs uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Theme & Core Objective</span>
                </div>
                <h3 className="font-tech text-white text-xl font-bold">
                  {HACKATHON_CONFIG.theme.title}
                </h3>
                <p className="leading-relaxed text-xs font-mono text-[#AAB4C0]">
                  {HACKATHON_CONFIG.theme.description}
                </p>
              </div>

              {/* Focus Pillars */}
              <div>
                <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-3">
                  Key Municipal Innovation Focus Areas:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {HACKATHON_CONFIG.theme.focus.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-[#141920] border border-[#2B333A] flex items-start gap-2.5 text-xs font-mono"
                    >
                      <CheckCircle className="w-4 h-4 text-[#C6FF35] shrink-0 mt-0.5" />
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Announcements Banner */}
              <div className="p-3.5 rounded bg-[#141920] border border-[#2B333A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#AAB4C0]">Judges, Mentors, Speakers & Guests Panel:</span>
                <span className="text-[#C6FF35] font-bold">COMING SOON</span>
              </div>
            </div>
          )}

          {/* TAB: PRIZES */}
          {activeTab === 'prizes' && (
            <div className="space-y-6">
              <div className="text-center py-5 select-none">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6FF35] font-semibold block mb-1">
                  PRIZE POOL
                </span>
                <h3 className="font-tech text-4xl sm:text-5xl font-extrabold text-[#F4F6F8] tracking-tight leading-none drop-shadow-[0_0_25px_rgba(198,255,53,0.35)]">
                  {HACKATHON_CONFIG.prizes.poolDisplay}
                </h3>
                <p className="font-mono text-xs text-[#AAB4C0] uppercase tracking-[0.2em] mt-2">
                  CATEGORY DISTRIBUTION & AWARDS: <span className="text-[#C6FF35] font-bold">COMING SOON</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {HACKATHON_CONFIG.prizes.breakdown.map((prize, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border bg-[#141920] border-[#2B333A]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-tech font-bold text-white text-xs">
                        {prize.rank}
                      </span>
                    </div>
                    <div className="text-[#C6FF35] font-mono text-xs font-bold py-1">
                      {prize.amount}
                    </div>
                    <p className="text-[11px] font-mono text-[#AAB4C0] mt-1">
                      {prize.perks}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 md:px-6 py-3 border-t border-[#2B333A] bg-[#0A0D12] flex items-center justify-between text-xs font-mono text-[#7E8895]">
          <span>{HACKATHON_CONFIG.organizer.institution}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-[#C6FF35] transition-colors cursor-pointer"
          >
            Close Window [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
