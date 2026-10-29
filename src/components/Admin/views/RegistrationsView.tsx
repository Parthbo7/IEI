import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Send,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Users2,
} from 'lucide-react';
import { TeamRegistration, RegistrationStatus, EmailDeliveryStatus } from '../types';

interface RegistrationsViewProps {
  teams: TeamRegistration[];
  onSelectTeam: (team: TeamRegistration) => void;
  onUpdateStatus: (teamId: string, status: RegistrationStatus) => void;
  onResendConfirmation: (teamId: string) => void;
  onExportCSV: () => void;
}

export const RegistrationsView: React.FC<RegistrationsViewProps> = ({
  teams,
  onSelectTeam,
  onUpdateStatus,
  onResendConfirmation,
  onExportCSV,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | RegistrationStatus>('All');
  const [sizeFilter, setSizeFilter] = useState<'All' | '2' | '3' | '4'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered teams
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        team.teamName.toLowerCase().includes(q) ||
        team.registrationId.toLowerCase().includes(q) ||
        team.teamLeader.toLowerCase().includes(q) ||
        team.leaderEmail.toLowerCase().includes(q) ||
        team.college.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || team.status === statusFilter;
      const matchesSize = sizeFilter === 'All' || team.teamSize.toString() === sizeFilter;

      return matchesSearch && matchesStatus && matchesSize;
    });
  }, [teams, searchQuery, statusFilter, sizeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage) || 1;
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Registrations & Teams
          </h1>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Manage all registered teams, inspect member credentials, verify participant details, and manage confirmations.
          </p>
        </div>

        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)] shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Teams (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by team, leader, email, or college..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-[#C6FF35]" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as 'All' | RegistrationStatus);
              setCurrentPage(1);
            }}
            className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C6FF35]/40"
          >
            <option value="All" className="bg-[#0A0F1A]">All Statuses</option>
            <option value="Confirmed" className="bg-[#0A0F1A]">Confirmed</option>
            <option value="Pending" className="bg-[#0A0F1A]">Pending</option>
            <option value="Cancelled" className="bg-[#0A0F1A]">Cancelled</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono ml-2">
            <span>Size:</span>
          </div>
          <select
            value={sizeFilter}
            onChange={(e) => {
              setSizeFilter(e.target.value as 'All' | '2' | '3' | '4');
              setCurrentPage(1);
            }}
            className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C6FF35]/40"
          >
            <option value="All" className="bg-[#0A0F1A]">All Sizes</option>
            <option value="2" className="bg-[#0A0F1A]">2 Members</option>
            <option value="3" className="bg-[#0A0F1A]">3 Members</option>
            <option value="4" className="bg-[#0A0F1A]">4 Members</option>
          </select>

          <span className="text-xs font-mono text-zinc-500 ml-auto md:ml-3">
            {filteredTeams.length} of {teams.length} Teams
          </span>
        </div>
      </div>

      {/* Main Registrations Table */}
      <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                <th className="pb-3.5 font-semibold">Reg ID</th>
                <th className="pb-3.5 font-semibold">Team Name</th>
                <th className="pb-3.5 font-semibold">Team Leader</th>
                <th className="pb-3.5 font-semibold">Leader Email</th>
                <th className="pb-3.5 font-semibold">College / Institution</th>
                <th className="pb-3.5 font-semibold text-center">Members</th>
                <th className="pb-3.5 font-semibold">Registered</th>
                <th className="pb-3.5 font-semibold">Status</th>
                <th className="pb-3.5 font-semibold">Email</th>
                <th className="pb-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedTeams.map((team) => (
                <tr key={team.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 font-mono text-[#C6FF35] font-bold">{team.registrationId}</td>
                  <td className="py-3.5 font-bold text-white">
                    <button
                      onClick={() => onSelectTeam(team)}
                      className="text-left hover:text-[#C6FF35] transition-colors truncate max-w-[150px] block cursor-pointer"
                    >
                      {team.teamName}
                    </button>
                  </td>
                  <td className="py-3.5 text-zinc-300 font-medium truncate max-w-[130px]">
                    {team.teamLeader}
                  </td>
                  <td className="py-3.5 font-mono text-zinc-400 truncate max-w-[160px]">
                    {team.leaderEmail}
                  </td>
                  <td className="py-3.5 text-zinc-400 truncate max-w-[160px]">
                    {team.college}
                  </td>
                  <td className="py-3.5 font-mono text-center text-zinc-200">
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">
                      {team.teamSize}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                    {team.registrationDate}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
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
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10.5px] font-mono ${
                        team.confirmationEmailStatus === 'Delivered'
                          ? 'text-sky-400'
                          : team.confirmationEmailStatus === 'Pending'
                          ? 'text-amber-400'
                          : 'text-zinc-500'
                      }`}
                    >
                      {team.confirmationEmailStatus}
                    </span>
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectTeam(team)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#C6FF35]/20 text-zinc-400 hover:text-[#C6FF35] transition-colors cursor-pointer"
                        title="View Team Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onResendConfirmation(team.id)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-sky-500/20 text-zinc-400 hover:text-sky-400 transition-colors cursor-pointer"
                        title="Resend Confirmation Email"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>

                      {team.status === 'Pending' ? (
                        <button
                          onClick={() => onUpdateStatus(team.id, 'Confirmed')}
                          className="px-2 py-1 rounded-lg bg-[#C6FF35]/15 hover:bg-[#C6FF35]/25 text-[#C6FF35] border border-[#C6FF35]/30 text-[10.5px] font-mono font-bold transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateStatus(team.id, 'Pending')}
                          className="px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 text-[10.5px] font-mono transition-colors cursor-pointer"
                        >
                          Mark Pending
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedTeams.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-zinc-500 font-mono text-xs">
                    No teams found matching search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-zinc-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredTeams.length)} of {filteredTeams.length} teams
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-zinc-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-zinc-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
