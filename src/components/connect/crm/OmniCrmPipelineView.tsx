import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Building,
  Tag,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { CrmDeal, DealPipelineStage, LeadSource } from '../../../types/omni_crm';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  deals: CrmDeal[];
  onUpdateDealStage: (dealId: string, stage: DealPipelineStage) => void;
  onCreateDeal: (newDeal: CrmDeal) => void;
  onOpenCustomer360: (customerId: string) => void;
  activeProfile: ConnectProfile;
}

const STAGES: { key: DealPipelineStage; label: string; color: string; bg: string; badgeColor: string }[] = [
  { key: 'new_lead', label: '1. New Lead', color: 'border-sky-500', bg: 'bg-sky-500/10', badgeColor: 'text-sky-400 bg-sky-950 border-sky-500/30' },
  { key: 'contacted', label: '2. Contacted', color: 'border-indigo-500', bg: 'bg-indigo-500/10', badgeColor: 'text-indigo-400 bg-indigo-950 border-indigo-500/30' },
  { key: 'qualified', label: '3. Qualified', color: 'border-purple-500', bg: 'bg-purple-500/10', badgeColor: 'text-purple-400 bg-purple-950 border-purple-500/30' },
  { key: 'proposal', label: '4. Proposal', color: 'border-amber-500', bg: 'bg-amber-500/10', badgeColor: 'text-amber-400 bg-amber-950 border-amber-500/30' },
  { key: 'negotiation', label: '5. Negotiation', color: 'border-cyan-500', bg: 'bg-cyan-500/10', badgeColor: 'text-cyan-400 bg-cyan-950 border-cyan-500/30' },
  { key: 'won', label: '6. Won (100%)', color: 'border-emerald-500', bg: 'bg-emerald-500/10', badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-500/30' },
  { key: 'lost', label: '7. Lost', color: 'border-rose-500', bg: 'bg-rose-500/10', badgeColor: 'text-rose-400 bg-rose-950 border-rose-500/30' }
];

export const OmniCrmPipelineView: React.FC<Props> = ({
  deals,
  onUpdateDealStage,
  onCreateDeal,
  onOpenCustomer360,
  activeProfile
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedRep, setSelectedRep] = useState<string>('all');
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);

  // Form state for new deal
  const [newTitle, setNewTitle] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newValueUsd, setNewValueUsd] = useState(50000);
  const [newStage, setNewStage] = useState<DealPipelineStage>('new_lead');
  const [newSource, setNewSource] = useState<LeadSource>('omni_messages');
  const [newExpectedClose, setNewExpectedClose] = useState('2026-09-30');

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.companyName && deal.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSource = selectedSource === 'all' || deal.leadSource === selectedSource;
    const matchesRep = selectedRep === 'all' || deal.assignedRepName === selectedRep;

    return matchesSearch && matchesSource && matchesRep;
  });

  // Calculate metrics
  const totalPipelineValue = deals.filter(d => d.stage !== 'lost').reduce((sum, d) => sum + d.valueUsd, 0);
  const weightedPipelineValue = deals.filter(d => d.stage !== 'lost').reduce((sum, d) => sum + (d.valueUsd * (d.probabilityPercent / 100)), 0);
  const wonDealsValue = deals.filter(d => d.stage === 'won').reduce((sum, d) => sum + d.valueUsd, 0);
  const wonDealsCount = deals.filter(d => d.stage === 'won').length;
  const closedTotalCount = deals.filter(d => d.stage === 'won' || d.stage === 'lost').length;
  const winRate = closedTotalCount > 0 ? Math.round((wonDealsCount / closedTotalCount) * 100) : 85;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContactName.trim()) return;

    const newDealRecord: CrmDeal = {
      id: `deal-${Date.now()}`,
      title: newTitle,
      companyName: newCompanyName || undefined,
      contactId: `cust-${Date.now()}`,
      contactName: newContactName,
      contactAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      valueUsd: Number(newValueUsd),
      stage: newStage,
      probabilityPercent: newStage === 'won' ? 100 : newStage === 'lost' ? 0 : 50,
      expectedCloseDate: newExpectedClose,
      leadSource: newSource,
      assignedRepId: activeProfile.id,
      assignedRepName: activeProfile.displayName,
      assignedRepAvatar: activeProfile.avatarUrl,
      productsInterested: ['Enterprise OMNI Suite'],
      notesCount: 0,
      tasksCount: 1,
      lastActivityAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    onCreateDeal(newDealRecord);
    setIsNewDealModalOpen(false);
    setNewTitle('');
    setNewCompanyName('');
    setNewContactName('');
  };

  const getStageNext = (current: DealPipelineStage): DealPipelineStage | null => {
    const order: DealPipelineStage[] = ['new_lead', 'contacted', 'qualified', 'proposal', 'negotiation', 'won'];
    const idx = order.indexOf(current);
    if (idx >= 0 && idx < order.length - 1) return order[idx + 1];
    return null;
  };

  const getStagePrev = (current: DealPipelineStage): DealPipelineStage | null => {
    const order: DealPipelineStage[] = ['new_lead', 'contacted', 'qualified', 'proposal', 'negotiation', 'won'];
    const idx = order.indexOf(current);
    if (idx > 0) return order[idx - 1];
    return null;
  };

  return (
    <div id="omni-crm-pipeline-view" className="space-y-6">
      {/* Top Banner & KPI Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                SOVEREIGN SALES PIPELINE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Visual Kanban Pipeline & Enterprise Deals
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Manage multi-stage enterprise opportunities, track probability-weighted deal values, and advance prospects from initial contact to won settlement.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsNewDealModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Deal</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Pipeline</span>
            <div className="text-xl font-black text-white mt-1 font-mono">${totalPipelineValue.toLocaleString()}</div>
            <span className="text-[10px] text-slate-500">{deals.length} Active Deals</span>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Weighted Pipeline</span>
            <div className="text-xl font-black text-indigo-400 mt-1 font-mono">${Math.round(weightedPipelineValue).toLocaleString()}</div>
            <span className="text-[10px] text-indigo-300/80">Probability Adjusted</span>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Closed Won Revenue</span>
            <div className="text-xl font-black text-emerald-400 mt-1 font-mono">${wonDealsValue.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400/80">{wonDealsCount} Contracts Signed</span>
          </div>

          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Win Rate</span>
            <div className="text-xl font-black text-amber-400 mt-1 font-mono">{winRate}%</div>
            <span className="text-[10px] text-slate-500">Historical Conversion</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deals by title, company, or customer name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none text-xs"
            >
              <option value="all">All Lead Sources</option>
              <option value="omni_messages">OMNI Messages</option>
              <option value="lead_capture_form">Lead Form</option>
              <option value="virtual_event">Virtual Event</option>
              <option value="omni_marketplace">Marketplace</option>
              <option value="embedded_website_widget">Website Widget</option>
              <option value="referral">Referral</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedRep}
              onChange={e => setSelectedRep(e.target.value)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none text-xs"
            >
              <option value="all">All Sales Reps</option>
              <option value="Alexander Hayes">Alexander Hayes</option>
              <option value="Sophia Lin">Sophia Lin</option>
              <option value="David Mercer">David Mercer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visual Kanban Board */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex gap-4 min-w-[1250px]">
          {STAGES.map(stage => {
            const stageDeals = filteredDeals.filter(d => d.stage === stage.key);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.valueUsd, 0);

            return (
              <div
                key={stage.key}
                className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex flex-col min-w-[240px] max-w-[280px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full border-2 ${stage.color}`} />
                    <span className="text-xs font-bold text-white">{stage.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${stage.badgeColor}`}>
                    {stageDeals.length}
                  </span>
                </div>

                {/* Stage Summary Value */}
                <div className="mb-3 px-2.5 py-1.5 bg-slate-950/60 rounded-lg border border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Total:</span>
                  <span className="font-mono font-bold text-white">${stageValue.toLocaleString()}</span>
                </div>

                {/* Deal Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {stageDeals.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs border border-dashed border-slate-800/80 rounded-xl">
                      No active deals in stage
                    </div>
                  ) : (
                    stageDeals.map(deal => (
                      <div
                        key={deal.id}
                        className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-3.5 space-y-3 shadow-md hover:shadow-indigo-500/10 transition group"
                      >
                        {/* Title & Value */}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-indigo-300 transition">
                              {deal.title}
                            </h4>
                            <span className="font-mono font-bold text-xs text-emerald-400 whitespace-nowrap">
                              ${deal.valueUsd.toLocaleString()}
                            </span>
                          </div>
                          {deal.companyName && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                              <Building className="w-3 h-3 text-slate-500" />
                              <span className="truncate">{deal.companyName}</span>
                            </div>
                          )}
                        </div>

                        {/* Customer Linkage */}
                        <div
                          onClick={() => onOpenCustomer360(deal.contactId)}
                          className="flex items-center justify-between p-2 bg-slate-900/80 hover:bg-slate-800/80 rounded-lg border border-slate-800 cursor-pointer transition"
                          title="Open Customer 360 Profile"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={deal.contactAvatar}
                              alt={deal.contactName}
                              className="w-5 h-5 rounded-full object-cover border border-slate-700"
                            />
                            <span className="text-[11px] font-semibold text-slate-200 truncate max-w-[120px]">
                              {deal.contactName}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                        </div>

                        {/* Probability & Close Date */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            <span>Prob: <strong className="text-white font-mono">{deal.probabilityPercent}%</strong></span>
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{deal.expectedCloseDate}</span>
                          </div>
                        </div>

                        {/* Products / Tags */}
                        {deal.productsInterested && deal.productsInterested.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {deal.productsInterested.slice(0, 2).map((prod, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] font-medium bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800 truncate max-w-full"
                              >
                                {prod}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Footer: Rep & Stage Actions */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <div className="flex items-center gap-1.5" title={`Assigned to: ${deal.assignedRepName}`}>
                            <img
                              src={deal.assignedRepAvatar}
                              alt={deal.assignedRepName}
                              className="w-4 h-4 rounded-full border border-slate-700"
                            />
                            <span className="text-[10px] text-slate-400 truncate max-w-[70px]">
                              {deal.assignedRepName.split(' ')[0]}
                            </span>
                          </div>

                          {/* Stage Transition Controls */}
                          <div className="flex items-center gap-1">
                            {getStagePrev(deal.stage) && (
                              <button
                                onClick={() => onUpdateDealStage(deal.id, getStagePrev(deal.stage)!)}
                                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition"
                                title="Move to previous stage"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                            )}

                            {getStageNext(deal.stage) && (
                              <button
                                onClick={() => onUpdateDealStage(deal.id, getStageNext(deal.stage)!)}
                                className="p-1 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 rounded transition"
                                title="Advance to next stage"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            {deal.stage !== 'won' && deal.stage !== 'lost' && (
                              <button
                                onClick={() => onUpdateDealStage(deal.id, 'won')}
                                className="p-1 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 rounded transition"
                                title="Mark as Closed Won"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE NEW DEAL MODAL */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Create Sovereign Enterprise Deal
              </h3>
              <button
                onClick={() => setIsNewDealModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300">Deal Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oxford Quantum Lab — Phase II Rollout"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Oxford Quantum Computing Lab"
                    value={newCompanyName}
                    onChange={e => setNewCompanyName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Primary Contact *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Vivienne Vance"
                    value={newContactName}
                    onChange={e => setNewContactName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Deal Value (USD) *</label>
                  <input
                    type="number"
                    required
                    min="100"
                    step="1000"
                    value={newValueUsd}
                    onChange={e => setNewValueUsd(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Expected Close Date</label>
                  <input
                    type="date"
                    value={newExpectedClose}
                    onChange={e => setNewExpectedClose(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Initial Pipeline Stage</label>
                  <select
                    value={newStage}
                    onChange={e => setNewStage(e.target.value as DealPipelineStage)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="new_lead">1. New Lead</option>
                    <option value="contacted">2. Contacted</option>
                    <option value="qualified">3. Qualified</option>
                    <option value="proposal">4. Proposal</option>
                    <option value="negotiation">5. Negotiation</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Lead Source</label>
                  <select
                    value={newSource}
                    onChange={e => setNewSource(e.target.value as LeadSource)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="omni_messages">OMNI Messages</option>
                    <option value="lead_capture_form">Lead Form</option>
                    <option value="virtual_event">Virtual Event</option>
                    <option value="omni_marketplace">Marketplace</option>
                    <option value="embedded_website_widget">Website Widget</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewDealModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30"
                >
                  Confirm & Add Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
