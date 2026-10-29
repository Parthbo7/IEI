import React from 'react';
import { HelpCircle, Mail, FileQuestion } from 'lucide-react';

interface NeedHelpCardProps {
  onViewFaq: () => void;
  onContactUs: () => void;
}

export const NeedHelpCard: React.FC<NeedHelpCardProps> = ({
  onViewFaq,
  onContactUs,
}) => {
  return (
    <div className="rounded-3xl bg-[#080D15]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-7 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-start gap-3.5 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/35 flex items-center justify-center text-[#C6FF35] shrink-0 shadow-[0_0_15px_rgba(198,255,53,0.15)]">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white font-sans">Need Help?</h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">
            If you face any issues or have questions, feel free to contact the organizing team.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={onViewFaq}
          className="h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:border-[#C6FF35]/50 hover:text-[#C6FF35] text-xs font-mono font-semibold text-zinc-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <FileQuestion className="w-4 h-4" />
          <span>View FAQ</span>
        </button>

        <button
          type="button"
          onClick={onContactUs}
          className="h-11 px-4 rounded-xl bg-[#C6FF35] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(198,255,53,0.3)] hover:bg-[#d5ff55] hover:shadow-[0_0_28px_rgba(198,255,53,0.5)] active:scale-[0.98] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4 text-black" />
          <span>Contact Us</span>
        </button>
      </div>
    </div>
  );
};
