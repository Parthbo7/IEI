import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, UserCheck, CheckCircle2 } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const [currentAdmin, setCurrentAdmin] = useState({
    name: 'Admin Organizer',
    email: 'admin@smartcityinnovation.org',
    role: 'Super Administrator',
    secretariat: 'MGM COE Nanded & IEI Maharashtra State Centre',
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Administrator credentials verified.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="pb-2 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          Admin Settings & Security
        </h1>
        <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
          Manage organizer access privileges, security parameters, and backend session credentials.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">{currentAdmin.name}</span>
              <span className="text-xs text-[#C6FF35] font-mono">{currentAdmin.role}</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-white/5 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px]">EMAIL ADDRESS</span>
              <span className="text-zinc-200">{currentAdmin.email}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">INSTITUTIONAL HOST</span>
              <span className="text-zinc-200">{currentAdmin.secretariat}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">ACCESS LEVEL</span>
              <span className="text-emerald-400">Full System Read / Write / Dispatch</span>
            </div>
          </div>
        </div>

        {/* Security & Token Vault */}
        <div className="p-6 rounded-3xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Key className="w-4 h-4 text-[#C6FF35]" />
            <span>Email Service Gateway</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Email transmission credentials and SMTP API keys are stored securely on the isolated server runtime. No credentials are leaked to the client browser.
          </p>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] font-mono space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Provider:</span>
              <span className="text-white font-bold">Resend / AWS SES Relay</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Queue Architecture:</span>
              <span className="text-[#C6FF35]">Async Worker (Rate-limited)</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Encryption:</span>
              <span className="text-white">TLS 1.3 / SPF & DKIM Enforced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
