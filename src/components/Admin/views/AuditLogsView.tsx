import React, { useState } from 'react';
import { FileSpreadsheet, ShieldAlert, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { AuditLogEntry } from '../types';

interface AuditLogsViewProps {
  logs: AuditLogEntry[];
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.recordRef && l.recordRef.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.08]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          Security & Administrative Audit Logs
        </h1>
        <p className="text-xs sm:text-[13px] text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
          Tamper-evident chronological audit trail of all organizer activities, email broadcasts, problem statement publications, and registration verifications.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail by action or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6FF35]/50"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="p-5 rounded-2xl bg-[#090E18]/85 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                <th className="pb-3.5 font-semibold">Timestamp</th>
                <th className="pb-3.5 font-semibold">Administrator</th>
                <th className="pb-3.5 font-semibold">Action Event</th>
                <th className="pb-3.5 font-semibold">Details</th>
                <th className="pb-3.5 font-semibold">Record Ref</th>
                <th className="pb-3.5 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 text-zinc-400 whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 text-white font-sans font-medium whitespace-nowrap">
                    {log.adminName}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-[#C6FF35]/10 text-[#C6FF35] border border-[#C6FF35]/25 text-[10.5px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 text-zinc-300 font-sans max-w-md">
                    {log.details}
                  </td>
                  <td className="py-3.5 text-zinc-400">
                    {log.recordRef || '—'}
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Success'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
