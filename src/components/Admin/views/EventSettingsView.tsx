import React, { useState } from 'react';
import { CalendarCheck, ShieldCheck, CheckCircle2, Lock, Sliders, Users, AlertTriangle } from 'lucide-react';
import { EventSettings } from '../types';

interface EventSettingsViewProps {
  settings: EventSettings;
  onSaveSettings: (settings: EventSettings) => void;
}

export const EventSettingsView: React.FC<EventSettingsViewProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<EventSettings>(settings);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggle = (key: keyof EventSettings) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setFeedback('Event settings persisted successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          Event Settings & Controls
        </h1>
        <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
          Configure real-time event parameters, team limits, problem statement release gates, and registration availability.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 max-w-3xl">
        {/* Registration availability */}
        <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white block">
              Team Registration Portal
            </span>
            <p className="text-xs text-zinc-400 mt-0.5">
              Allow new teams to submit registrations on the public hackathon website.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('registrationOpen')}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              formData.registrationOpen ? 'bg-[#C6FF35]' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                formData.registrationOpen ? 'left-6.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Problem Statement Global Release */}
        <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white block">
              Problem Statement Visibility
            </span>
            <p className="text-xs text-zinc-400 mt-0.5">
              Unlock challenges on participant dashboard (replaces Coming Soon banner).
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('problemStatementsPublished')}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              formData.problemStatementsPublished ? 'bg-[#C6FF35]' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                formData.problemStatementsPublished ? 'left-6.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Problem statement team selection */}
        <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-white block">
              Participant Problem Statement Selection
            </span>
            <p className="text-xs text-zinc-400 mt-0.5">
              Allow confirmed teams to choose and submit their selected challenge track.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('problemStatementSelectionOpen')}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              formData.problemStatementSelectionOpen ? 'bg-[#C6FF35]' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                formData.problemStatementSelectionOpen ? 'left-6.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Allowed Team Sizes */}
        <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
          <span className="text-sm font-bold text-white block mb-2">
            Permitted Team Sizes
          </span>
          <div className="flex items-center gap-3">
            {[2, 3, 4].map((size) => (
              <span
                key={size}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-[#C6FF35]/30 text-white font-mono text-xs font-bold flex items-center gap-2"
              >
                <Users className="w-3.5 h-3.5 text-[#C6FF35]" />
                {size} Members
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)]"
        >
          Save Configuration Changes
        </button>
      </form>
    </div>
  );
};
