import React from 'react';
import {
  Users2,
  UserCheck,
  Crown,
  UserPlus,
  MailQuestion,
  CheckCircle2,
  Calendar,
  Globe2,
  TrendingUp,
  PieChart,
  Clock,
  ArrowUpRight,
  Send,
  Megaphone,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  Eye,
  FileCode2,
} from 'lucide-react';
import { AdminStats, TeamRegistration, EmailLog, AdminViewType } from '../types';
import { Announcement } from '../../Dashboard/types';

interface OverviewViewProps {
  stats: AdminStats;
  recentTeams: TeamRegistration[];
  recentAnnouncements: Announcement[];
  recentEmails: EmailLog[];
  isProblemStatementsPublished: boolean;
  onNavigateView: (view: AdminViewType) => void;
  onSelectTeam: (team: TeamRegistration) => void;
  onQuickAction: (action: string) => void;
  onPublishProblemStatements: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  stats,
  recentTeams,
  recentAnnouncements,
  recentEmails,
  isProblemStatementsPublished,
  onNavigateView,
  onSelectTeam,
  onQuickAction,
  onPublishProblemStatements,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* =========================================================================
          TOP BANNER: WELCOME + EVENT QUICK STATUS
          ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans flex items-center gap-2">
            Welcome, Admin!
          </h1>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Manage registrations, coordinate participants, publish challenges, and communicate with your hackathon community.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          {/* Event Date Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0B101B]/90 border border-white/10 shadow-inner">
            <Calendar className="w-4 h-4 text-[#C6FF35]" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider leading-none">Event Date</span>
              <span className="text-xs font-bold text-white leading-tight">15 – 16 March 2026</span>
            </div>
          </div>

          {/* Registration Status Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0B101B]/90 border border-white/10 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C6FF35] animate-pulse shadow-[0_0_8px_#C6FF35]" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider leading-none">Registration Status</span>
              <span className="text-xs font-bold text-[#C6FF35] leading-tight">Open</span>
            </div>
          </div>

          {/* View Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
          >
            <span>View Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* =========================================================================
          6 SUMMARY STATS CARDS (Exact match to reference image)
          ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* TOTAL REGISTRATIONS */}
        <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#C6FF35]/30 transition-all group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Users2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              TOTAL REGISTRATIONS
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {stats.totalRegistrations}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Teams Registered</div>
        </div>

        {/* TOTAL PARTICIPANTS */}
        <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#C6FF35]/30 transition-all group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              TOTAL PARTICIPANTS
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {stats.totalParticipants}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Registered Participants</div>
        </div>

        {/* TEAM LEADERS */}
        <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/30 transition-all group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Crown className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              TEAM LEADERS
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {stats.totalTeamLeaders}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Team Leaders</div>
        </div>

        {/* TEAM MEMBERS */}
        <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] hover:border-emerald-400/30 transition-all group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              TEAM MEMBERS
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {stats.totalTeamMembers}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Additional Members</div>
        </div>

        {/* PENDING CONFIRMATIONS */}
        <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/30 transition-all group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MailQuestion className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              PENDING CONFIRMATIONS
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight font-sans">
            {stats.pendingConfirmations}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Awaiting Email</div>
        </div>

        {/* CONFIRMED REGISTRATIONS */}
        <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#C6FF35]/30 transition-all group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center text-[#C6FF35]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
              CONFIRMED REGISTRATIONS
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#C6FF35] tracking-tight font-sans">
            {stats.confirmedRegistrations}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Teams Confirmed</div>
        </div>
      </div>

      {/* =========================================================================
          CHARTS SECTION (3-column layout matching reference screenshot)
          - Registrations Over Time (glowing neon bar/line chart)
          - Team Size Distribution (Donut chart 2, 3, 4 members)
          - Registration Status (Donut chart Confirmed, Pending, Cancelled)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart 1: Registrations Over Time (Span 6) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C6FF35]" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Registrations Over Time
              </h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
              Last 30 Days ▾
            </span>
          </div>

          {/* SVG Glowing Bar Histogram */}
          <div className="h-44 w-full flex items-end gap-1.5 pt-4 pb-2 px-2">
            {[4, 6, 3, 8, 5, 9, 12, 7, 10, 14, 8, 11, 16, 9, 13, 8, 12, 17, 10, 15, 12, 14, 9, 6].map(
              (val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    className="w-full bg-[#C6FF35]/70 hover:bg-[#C6FF35] rounded-t-sm transition-all duration-300 shadow-[0_0_8px_rgba(198,255,53,0.3)]"
                    style={{ height: `${(val / 18) * 100}%` }}
                  />
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-7 text-[10px] font-mono bg-black/90 text-[#C6FF35] px-1.5 py-0.5 rounded border border-[#C6FF35]/30 pointer-events-none transition-opacity z-10 whitespace-nowrap">
                    {val} teams
                  </div>
                </div>
              )
            )}
          </div>

          {/* X Axis Labels */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5 px-2">
            <span>Mar 1</span>
            <span>Mar 5</span>
            <span>Mar 10</span>
            <span>Mar 15</span>
            <span>Mar 20</span>
            <span>Mar 25</span>
            <span>Mar 30</span>
          </div>
        </div>

        {/* Chart 2: Team Size Distribution (Span 3) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="w-4 h-4 text-[#C6FF35]" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Team Size Distribution
            </h3>
          </div>

          <div className="flex items-center justify-center gap-4 my-auto">
            {/* Donut graphic */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-sky-500"
                  strokeWidth="4.5"
                  strokeDasharray="32, 100"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#C6FF35]"
                  strokeWidth="4.5"
                  strokeDasharray="43, 100"
                  strokeDashoffset="-32"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500"
                  strokeWidth="4.5"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-75"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-white font-sans leading-none">{stats.totalRegistrations}</span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase mt-0.5">Teams</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span className="text-zinc-300">2 Members</span>
                <span className="text-zinc-500 font-bold ml-auto">{stats.teamSizeDistribution.size2} (32%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF35]" />
                <span className="text-zinc-300">3 Members</span>
                <span className="text-zinc-500 font-bold ml-auto">{stats.teamSizeDistribution.size3} (43%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-zinc-300">4 Members</span>
                <span className="text-zinc-500 font-bold ml-auto">{stats.teamSizeDistribution.size4} (25%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 3: Registration Status (Span 3) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#C6FF35]" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Registration Status
            </h3>
          </div>

          <div className="flex items-center justify-center gap-4 my-auto">
            {/* Donut graphic */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#C6FF35]"
                  strokeWidth="4.5"
                  strokeDasharray="86, 100"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500"
                  strokeWidth="4.5"
                  strokeDasharray="14, 100"
                  strokeDashoffset="-86"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-white font-sans leading-none">{stats.totalRegistrations}</span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase mt-0.5">Teams</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF35]" />
                <span className="text-zinc-300">Confirmed</span>
                <span className="text-zinc-500 font-bold ml-auto">{stats.confirmedRegistrations} (86%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-zinc-300">Pending</span>
                <span className="text-zinc-500 font-bold ml-auto">{stats.pendingConfirmations} (14%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-zinc-300">Cancelled</span>
                <span className="text-zinc-500 font-bold ml-auto">{stats.cancelledRegistrations} (0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LOWER SECTION: RECENT REGISTRATIONS (LEFT) + QUICK ACTIONS & EMAIL SUMMARY (RIGHT)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent Registrations Table (Span 8) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-[#C6FF35]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Recent Registrations
                </h3>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Latest team registrations in your hackathon
              </p>
            </div>
            <button
              onClick={() => onNavigateView('registrations')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-[#C6FF35] hover:underline cursor-pointer border border-white/5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">#</th>
                  <th className="pb-3 font-semibold">Team Name</th>
                  <th className="pb-3 font-semibold">Team Leader</th>
                  <th className="pb-3 font-semibold">College / Institution</th>
                  <th className="pb-3 font-semibold text-center">Team Size</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Registered On</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentTeams.slice(0, 5).map((team) => (
                  <tr key={team.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3 font-mono text-zinc-400">{team.registrationId}</td>
                    <td className="py-3 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-[10px] font-mono">
                          {team.teamName.charAt(0)}
                        </div>
                        <span className="truncate max-w-[140px]">{team.teamName}</span>
                      </div>
                    </td>
                    <td className="py-3 text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate max-w-[130px]">{team.teamLeader}</span>
                      </div>
                    </td>
                    <td className="py-3 text-zinc-400 truncate max-w-[150px]">{team.college}</td>
                    <td className="py-3 font-mono text-center text-zinc-300">{team.teamSize}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          team.status === 'Confirmed'
                            ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                            : team.status === 'Pending'
                            ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {team.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                      {team.registrationDate}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onSelectTeam(team)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#C6FF35]/20 text-zinc-400 hover:text-[#C6FF35] transition-colors cursor-pointer"
                        title="View Team Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Actions & Email Summary (Span 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Actions Card */}
          <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#C6FF35]/15 flex items-center justify-center text-[#C6FF35]">
                ⚡
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Quick Actions
              </h3>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onQuickAction('send_confirmation')}
                className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#C6FF35]/10 border border-white/5 hover:border-[#C6FF35]/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-[#C6FF35] block">
                      Send Confirmation Emails
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Email selected or all participants
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#C6FF35]" />
              </button>

              <button
                onClick={() => onQuickAction('send_announcement')}
                className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#C6FF35]/10 border border-white/5 hover:border-[#C6FF35]/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C6FF35]/15 text-[#C6FF35] flex items-center justify-center">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-[#C6FF35] block">
                      Send Announcement
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Notify participants with updates
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#C6FF35]" />
              </button>

              <button
                onClick={() => onQuickAction('publish_ps')}
                className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#C6FF35]/10 border border-white/5 hover:border-[#C6FF35]/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-[#C6FF35] block">
                      Publish Problem Statement
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      Make challenges visible to participants
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#C6FF35]" />
              </button>

              <button
                onClick={() => onNavigateView('registrations')}
                className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#C6FF35]/10 border border-white/5 hover:border-[#C6FF35]/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-[#C6FF35] block">
                      Manage Registrations
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      View and manage all teams
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#C6FF35]" />
              </button>
            </div>
          </div>

          {/* Email Summary Card */}
          <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#C6FF35]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Email Summary
                </h3>
              </div>
              <button
                onClick={() => onNavigateView('email_center')}
                className="text-[11px] font-mono text-[#C6FF35] hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2.5">
              {recentEmails.slice(0, 3).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-white block truncate">
                      {log.subject}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {log.recipientCount} recipients • {log.sentAt}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono shrink-0 font-bold ${
                      log.status === 'Sent'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-700/50 text-zinc-300'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ROW: RECENT ANNOUNCEMENTS (LEFT) + PROBLEM STATEMENT MANAGEMENT WIDGET (RIGHT)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent Announcements Widget (Span 6) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#C6FF35]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Recent Announcements
                </h3>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Latest announcements for participants
              </p>
            </div>
            <button
              onClick={() => onNavigateView('announcements')}
              className="text-[11px] font-mono text-[#C6FF35] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="space-y-2.5">
            {recentAnnouncements.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateView('announcements')}
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-[#C6FF35] transition-colors truncate">
                      {item.title}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded uppercase font-bold shrink-0 ${
                        item.priority === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                      }`}
                    >
                      {item.priority === 'HIGH' ? 'Priority' : item.category || 'Info'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 ml-auto shrink-0">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-1">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#C6FF35] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Problem Statement Management Widget (Span 6) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[#C6FF35]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Problem Statement Management
                </h3>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Create, edit and publish problem statements
              </p>
            </div>
            <button
              onClick={() => onNavigateView('problem_statements')}
              className="text-[11px] font-mono text-[#C6FF35] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="my-auto py-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#C6FF35]/10 border border-[#C6FF35]/30 text-[#C6FF35] mx-auto flex items-center justify-center mb-3">
              <FileCode2 className="w-6 h-6" />
            </div>

            <div className="text-sm font-extrabold text-white mb-1">
              {isProblemStatementsPublished ? (
                <span className="text-[#C6FF35] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Challenges Officially Published
                </span>
              ) : (
                <span className="text-amber-400 flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4" /> Currently in Draft Mode
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-4">
              {isProblemStatementsPublished
                ? 'Problem statements are live and visible to registered participants on their dashboard.'
                : 'Problem statements are not yet published for participants. Click below to create or release.'}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => onQuickAction('create_ps')}
                className="px-4 py-2 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)]"
              >
                + Create New Problem Statement
              </button>
              <button
                onClick={() => onNavigateView('problem_statements')}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Manage & Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
