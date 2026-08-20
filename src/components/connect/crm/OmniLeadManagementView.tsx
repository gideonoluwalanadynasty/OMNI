import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  UserCheck,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  Building,
  Target,
  Clock,
  Layers,
  BarChart3,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Customer360Profile, LeadSource, DealPipelineStage, CrmDeal } from '../../../types/omni_crm';

interface Props {
  profiles: Customer360Profile[];
  onOpenCustomer360: (customerId: string) => void;
  onConvertToDeal: (profile: Customer360Profile) => void;
}

export const OmniLeadManagementView: React.FC<Props> = ({
  profiles,
  onOpenCustomer360,
  onConvertToDeal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const filteredLeads = profiles.filter(p => {
    const matchesSearch =
      p.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());

    const tier = p.aiIntelligence.ratingTier;
    const matchesQuality = selectedQuality === 'all' || tier === selectedQuality;

    return matchesSearch && matchesQuality;
  });

  const hotCount = profiles.filter(p => p.aiIntelligence.ratingTier === 'hot').length;
  const warmCount = profiles.filter(p => p.aiIntelligence.ratingTier === 'warm').length;
  const nurtureCount = profiles.filter(p => p.aiIntelligence.ratingTier === 'nurture').length;

  return (
    <div id="omni-lead-management-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                AI LEAD SCORING & PIPELINE ACCELERATOR
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Lead Generation & AI Scoring Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Real-time multi-channel lead ingestion from OMNI Messenger, web forms, and marketplace signals, automatically enriched with predictive buying scores and qualification tiering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Hot Leads</span>
              <span className="text-xl font-bold text-rose-400 font-mono">{hotCount}</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Warm Pipeline</span>
              <span className="text-xl font-bold text-amber-400 font-mono">{warmCount}</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Nurture Queue</span>
              <span className="text-xl font-bold text-sky-400 font-mono">{nurtureCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by contact name, company, or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Flame className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedQuality}
              onChange={e => setSelectedQuality(e.target.value)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none text-xs"
            >
              <option value="all">All AI Qualification Tiers</option>
              <option value="hot">🔥 Hot Leads (Score 90+)</option>
              <option value="warm">⚡ Warm Leads (Score 70-89)</option>
              <option value="nurture">🌱 Nurture Queue (Score &lt;70)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="space-y-3">
        {filteredLeads.map(lead => {
          const ai = lead.aiIntelligence;
          const isHot = ai.ratingTier === 'hot';
          const isWarm = ai.ratingTier === 'warm';

          return (
            <div
              key={lead.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md hover:shadow-indigo-500/10 transition"
            >
              {/* Left: Contact Info */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={lead.avatarUrl}
                  alt={lead.displayName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{lead.displayName}</h3>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        isHot
                          ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                          : isWarm
                          ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                          : 'bg-sky-950 text-sky-300 border-sky-500/40'
                      }`}
                    >
                      {isHot ? '🔥 HOT QUALIFIED' : isWarm ? '⚡ WARM PROSPECT' : '🌱 NURTURE'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{lead.email} • {lead.phone}</p>
                  <p className="text-xs text-indigo-300 font-semibold mt-0.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-400" />
                    {lead.companyName} ({lead.title})
                  </p>
                </div>
              </div>

              {/* Middle: AI Scoring Metrics */}
              <div className="grid grid-cols-3 gap-3 p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 text-center min-w-[280px]">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Lead Score</span>
                  <span className="text-base font-black text-rose-400 font-mono">{ai.leadScore}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Buying Intent</span>
                  <span className="text-base font-black text-indigo-400 font-mono">{ai.buyingIntentScore}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Win Probability</span>
                  <span className="text-base font-black text-emerald-400 font-mono">{ai.conversionProbabilityPct}%</span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => onOpenCustomer360(lead.id)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>360 Profile</span>
                </button>

                <button
                  onClick={() => onConvertToDeal(lead)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
                >
                  <span>Convert to Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
