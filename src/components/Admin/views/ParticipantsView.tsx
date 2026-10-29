import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  UserCheck,
  Shield,
  Crown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Building2,
} from 'lucide-react';
import { ParticipantRecord, RegistrationStatus } from '../types';

interface ParticipantsViewProps {
  participants: ParticipantRecord[];
  onExportCSV: () => void;
}

export const ParticipantsView: React.FC<ParticipantsViewProps> = ({
  participants,
  onExportCSV,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Team Leader' | 'Member'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | RegistrationStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter participants
  const filtered = useMemo(() => {
    return participants.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.fullName.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.teamName.toLowerCase().includes(q) ||
        p.college.toLowerCase().includes(q) ||
        p.branch.toLowerCase().includes(q);

      const matchesRole = roleFilter === 'All' || p.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [participants, searchQuery, roleFilter, statusFilter]);

  // Statistics
  const leaderCount = participants.filter((p) => p.role === 'Team Leader').length;
  const memberCount = participants.filter((p) => p.role === 'Member').length;

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Participant Management
          </h1>
          <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
            Full individual roster of all {participants.length} registered persons across all hackathon teams.
          </p>
        </div>

        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF35] text-black font-extrabold text-xs hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)] shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Participants (CSV)</span>
        </button>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#090E18]/85 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Total Individuals</span>
              <span className="text-base font-extrabold text-white">{participants.length}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">100% Roster</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090E18]/85 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Team Leaders</span>
              <span className="text-base font-extrabold text-amber-400">{leaderCount}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Primary SPOCs</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090E18]/85 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Additional Members</span>
              <span className="text-base font-extrabold text-emerald-400">{memberCount}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Teammates</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search participant name, email, college, or team..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-[#C6FF35]" />
            <span>Role:</span>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as 'All' | 'Team Leader' | 'Member');
              setCurrentPage(1);
            }}
            className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C6FF35]/40"
          >
            <option value="All" className="bg-[#0A0F1A]">All Roles</option>
            <option value="Team Leader" className="bg-[#0A0F1A]">Team Leaders Only</option>
            <option value="Member" className="bg-[#0A0F1A]">Members Only</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono ml-2">
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
          </select>

          <span className="text-xs font-mono text-zinc-500 ml-auto md:ml-3">
            {filtered.length} of {participants.length}
          </span>
        </div>
      </div>

      {/* Participants Table */}
      <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                <th className="pb-3.5 font-semibold">Participant Name</th>
                <th className="pb-3.5 font-semibold">Role</th>
                <th className="pb-3.5 font-semibold">Associated Team</th>
                <th className="pb-3.5 font-semibold">Email Address</th>
                <th className="pb-3.5 font-semibold">Phone Number</th>
                <th className="pb-3.5 font-semibold">College / Institution</th>
                <th className="pb-3.5 font-semibold">Branch</th>
                <th className="pb-3.5 font-semibold text-right">Team Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginated.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                          p.role === 'Team Leader'
                            ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                            : 'bg-white/[0.05] text-zinc-400 border border-white/10'
                        }`}
                      >
                        {p.fullName.charAt(0)}
                      </div>
                      <span className="truncate max-w-[140px]">{p.fullName}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        p.role === 'Team Leader'
                          ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                          : 'bg-white/[0.04] text-zinc-400'
                      }`}
                    >
                      {p.role}
                    </span>
                  </td>
                  <td className="py-3.5 font-medium text-zinc-200">
                    <div className="truncate max-w-[130px]">{p.teamName}</div>
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      {p.teamRegistrationId}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-zinc-400 truncate max-w-[160px]">
                    {p.email}
                  </td>
                  <td className="py-3.5 font-mono text-zinc-400 whitespace-nowrap">
                    {p.phone}
                  </td>
                  <td className="py-3.5 text-zinc-400 truncate max-w-[170px]">
                    {p.college}
                  </td>
                  <td className="py-3.5 text-zinc-400 truncate max-w-[150px]">
                    {p.branch}
                  </td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        p.status === 'Confirmed'
                          ? 'bg-[#C6FF35]/15 text-[#C6FF35] border border-[#C6FF35]/30'
                          : 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-zinc-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} participants
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
