import React, { useState } from 'react';
import {
  Mail,
  Phone,
  User,
  Copy,
  Check,
  MapPin,
  Building2,
  Landmark,
  GraduationCap,
  ExternalLink,
  Navigation as NavigationIcon,
} from 'lucide-react';

interface ContactPageProps {
  onBackToHome?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('iei_it@mgmcen.ac.in');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = 'iei_it@mgmcen.ac.in';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('8177942863');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = '8177942863';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  return (
    <div className="relative z-20 min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-10 xl:px-16 overflow-x-hidden">
      {/* Cinematic Ambient Backdrop Lighting & Contrast Vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-gradient-to-r from-[#070A0F]/90 via-[#070A0F]/30 to-[#070A0F]/80"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#070A0F]/65 via-transparent to-[#070A0F]/80"
      />
      <div
        aria-hidden="true"
        className="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none bg-[#C6FF35]/[0.035] blur-[150px]"
      />

      {/* Main Container: 2-Column Responsive Layout matching Target Reference Image */}
      <div className="relative max-w-[1440px] xl:max-w-[1520px] mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN: CONTACT HERO & INFORMATION CARDS (col-span-7)
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            {/* 1. Header Section */}
            <div>
              {/* Event Identifier Tag */}
              <div className="inline-flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF35] shadow-[0_0_10px_#C6FF35] animate-pulse" />
                <span className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] uppercase text-[#C6FF35]">
                  GET IN TOUCH
                </span>
              </div>

              {/* Main Heading: CONTACT US */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-black uppercase tracking-tight font-sans leading-none">
                <span className="text-white">CONTACT </span>
                <span className="text-[#C6FF35] drop-shadow-[0_0_32px_rgba(198,255,53,0.45)]">US</span>
              </h1>

              {/* Decorative Accent Underline */}
              <div className="w-16 h-1 bg-[#C6FF35] rounded-full mt-3 mb-4 shadow-[0_0_12px_rgba(198,255,53,0.6)]" />

              {/* Subtitle */}
              <p className="text-zinc-300 text-sm sm:text-base max-w-xl leading-relaxed font-sans font-normal">
                Have a question, need assistance, or want to collaborate? We&apos;re here to help!
                Reach out to our team for any queries related to the Smart City Innovation Hackathon 2026.
              </p>
            </div>

            {/* 2. Top Two Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Card 1: Official Email */}
              <div className="relative rounded-[22px] bg-[#070D17]/88 backdrop-blur-2xl border border-white/[0.12] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.8)] hover:border-[#C6FF35]/40 transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-start gap-3.5 mb-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#09101C] border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35] shadow-[0_0_12px_rgba(198,255,53,0.2)] shrink-0 transition-transform group-hover:scale-105">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-sans tracking-tight">
                        Official Email
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans mt-0.5 leading-snug">
                        For official inquiries, verification support, and sponsorship proposals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pill with Email and Copy Button */}
                <div className="mt-4 bg-[#070C16] border border-white/[0.1] rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                  <a
                    href="mailto:iei_it@mgmcen.ac.in"
                    title="Send Email"
                    className="text-[#C6FF35] font-mono text-xs sm:text-[13px] font-bold truncate hover:underline"
                  >
                    iei_it@mgmcen.ac.in
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-[#C6FF35] hover:border-[#C6FF35]/40 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-[#C6FF35] stroke-[2.5]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Card 2: IEI Student Chapter President */}
              <div className="relative rounded-[22px] bg-[#070D17]/88 backdrop-blur-2xl border border-white/[0.12] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.8)] hover:border-[#C6FF35]/40 transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-start gap-3.5 mb-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#09101C] border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35] shadow-[0_0_12px_rgba(198,255,53,0.2)] shrink-0 transition-transform group-hover:scale-105">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-sans tracking-tight">
                        IEI Student Chapter President
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans mt-0.5 leading-snug">
                        For student-related queries and coordination.
                      </p>
                      <span className="block text-sm font-bold text-white font-sans mt-1.5">
                        Parth Bulbule
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pill with Phone and Copy Button */}
                <div className="mt-4 bg-[#070C16] border border-white/[0.1] rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                  <a
                    href="tel:8177942863"
                    title="Call Phone Number"
                    className="inline-flex items-center gap-2 text-[#C6FF35] font-mono text-xs sm:text-[13px] font-bold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>8177942863</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    title="Copy Phone Number"
                    className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-[#C6FF35] hover:border-[#C6FF35]/40 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-[#C6FF35] stroke-[2.5]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Bottom Wide Card: College Information */}
            <div className="relative rounded-[22px] bg-[#070D17]/88 backdrop-blur-2xl border border-white/[0.12] p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.8)] hover:border-[#C6FF35]/40 transition-all duration-200">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Left Half: College Name & Address */}
                <div className="md:col-span-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#09101C] border border-[#C6FF35]/40 flex items-center justify-center text-[#C6FF35] shadow-[0_0_12px_rgba(198,255,53,0.2)] shrink-0 mt-0.5">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-sans tracking-tight">
                      MGM&apos;s College of Engineering
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                      VIP Road, Nanded,<br />
                      Maharashtra – 431605, India
                    </p>
                  </div>
                </div>

                {/* Right Half: Structured Metadata List */}
                <div className="md:col-span-6 space-y-3 border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6 text-xs font-sans">
                  {/* Location */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 text-[#C6FF35]">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider block">
                        Location
                      </span>
                      <span className="font-semibold text-zinc-200">
                        Nanded, Maharashtra, India
                      </span>
                    </div>
                  </div>

                  {/* Affiliated To */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 text-[#C6FF35]">
                      <Landmark className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider block">
                        Affiliated To
                      </span>
                      <span className="font-semibold text-zinc-200">
                        Mahatma Gandhi Mission (MGM)
                      </span>
                    </div>
                  </div>

                  {/* Organized By */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 text-[#C6FF35]">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider block">
                        Organized By
                      </span>
                      <span className="font-semibold text-zinc-200 leading-tight block">
                        MGM&apos;s College of Engineering · IEI Student Chapter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: DEDICATED OUR LOCATION & GOOGLE MAPS CARD (col-span-5)
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="relative rounded-[24px] sm:rounded-[28px] bg-[#070D17]/88 backdrop-blur-2xl border border-white/[0.12] p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.92)] hover:border-[#C6FF35]/40 transition-all duration-300 flex flex-col h-full">
              {/* Subtle Top Edge Accent */}
              <div className="absolute -top-px left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6FF35]/50 to-transparent" />

              {/* Card Header: Location Icon & Heading */}
              <div className="flex items-center gap-3.5 mb-4 text-left">
                <div className="w-11 h-11 rounded-2xl bg-[#C6FF35] flex items-center justify-center text-black shadow-[0_0_18px_rgba(198,255,53,0.35)] shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans tracking-tight">
                    Our Location
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Find us at MGM&apos;s College of Engineering, Nanded.
                  </p>
                </div>
              </div>

              {/* Embedded Google Maps View */}
              <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[420px] rounded-2xl overflow-hidden border border-white/[0.12] bg-[#060A12] shadow-inner mb-4">
                <iframe
                  title="MGM's College of Engineering, Nanded Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4357287315124!2d77.31558227601956!3d19.17667994881729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d659a805a963%3A0xe54d2e2609bb9953!2sMGM&#39;s%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1712000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-[1.02]"
                />
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between gap-3 pt-1 text-xs font-mono">
                <a
                  href="https://maps.google.com/?q=MGM's+College+of+Engineering+Nanded"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-[#C6FF35]/50 hover:bg-[#C6FF35]/10 text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C6FF35]" />
                  <span>VIEW LARGER MAP</span>
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=MGM's+College+of+Engineering+Nanded"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#C6FF35] hover:bg-[#d5ff55] text-black transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow-[0_0_15px_rgba(198,255,53,0.3)] hover:shadow-[0_0_20px_rgba(198,255,53,0.5)]"
                >
                  <NavigationIcon className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;

