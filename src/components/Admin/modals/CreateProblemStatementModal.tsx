import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, ExternalLink } from 'lucide-react';
import { ProblemStatementAdminItem } from '../types';

interface CreateProblemStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (item: Omit<ProblemStatementAdminItem, 'id' | 'createdAt' | 'selectedByTeamsCount'>) => void;
}

export const CreateProblemStatementModal: React.FC<CreateProblemStatementModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [referenceCode, setReferenceCode] = useState(`PS-SCI-2026-0${Math.floor(Math.random() * 90 + 10)}`);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Smart Mobility & Traffic');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [requirements, setRequirements] = useState<string[]>([
    'Real-time edge IoT sensor integration',
    'Low-latency data pipeline with REST/WebSocket interfaces',
  ]);
  const [newReq, setNewReq] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');

  if (!isOpen) return null;

  const handleAddReq = () => {
    if (!newReq.trim()) return;
    setRequirements([...requirements, newReq.trim()]);
    setNewReq('');
  };

  const handleRemoveReq = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    onCreate({
      referenceCode,
      title,
      category,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      requirements,
      expectedOutcomes: ['Working prototype / simulator', 'Technical documentation'],
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0A0F1A] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#060A12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C6FF35]/15 border border-[#C6FF35]/30 text-[#C6FF35] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Create New Problem Statement</h3>
              <p className="text-xs text-zinc-400">Add a challenge track for participants</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                Reference Code
              </label>
              <input
                type="text"
                required
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono focus:outline-none focus:border-[#C6FF35]/50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                Category / Track
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C6FF35]/40"
              >
                <option value="Smart Mobility & Traffic">Smart Mobility & Traffic</option>
                <option value="Waste & Sanitation">Waste & Sanitation</option>
                <option value="Clean Energy & Smart Grid">Clean Energy & Smart Grid</option>
                <option value="Water Resource Management">Water Resource Management</option>
                <option value="Urban Safety & Surveillance">Urban Safety & Surveillance</option>
                <option value="Citizen Services & Governance">Citizen Services & Governance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
              Challenge Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI-driven Smart Water Metering and Leakage Detection"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#C6FF35]/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              required
              placeholder="Brief summary visible on preview cards..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#C6FF35]/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
              Detailed Scope & Requirements
            </label>
            <textarea
              rows={4}
              placeholder="Detailed technical problem description..."
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#C6FF35]/50"
            />
          </div>

          {/* Key Deliverables / Requirements List */}
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
              Key Deliverables ({requirements.length})
            </label>
            <div className="space-y-1.5 mb-2">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 text-zinc-300">
                  <span>• {req}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveReq(i)}
                    className="text-zinc-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add another deliverable..."
                value={newReq}
                onChange={(e) => setNewReq(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddReq())}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddReq}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-bold cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
              Initial Release Status
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input
                  type="radio"
                  name="ps_status"
                  checked={status === 'Draft'}
                  onChange={() => setStatus('Draft')}
                  className="accent-[#C6FF35]"
                />
                <span>Draft (Hidden from participants)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input
                  type="radio"
                  name="ps_status"
                  checked={status === 'Published'}
                  onChange={() => setStatus('Published')}
                  className="accent-[#C6FF35]"
                />
                <span>Published (Visible if global release enabled)</span>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#C6FF35] text-black font-extrabold hover:bg-[#b0f51e] transition-all cursor-pointer shadow-[0_0_15px_rgba(198,255,53,0.3)]"
            >
              Save Problem Statement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
