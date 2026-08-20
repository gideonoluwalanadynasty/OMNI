import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Award,
  DollarSign,
  ShoppingBag,
  GraduationCap,
  Calendar,
  MessageSquare,
  LifeBuoy,
  FileCheck,
  Sparkles,
  Search,
  Filter,
  ArrowUpRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Plus,
  Send,
  UserCheck
} from 'lucide-react';
import { Customer360Profile, CustomerTier, CrmLifecycleStage } from '../../../types/omni_crm';

interface Props {
  profiles: Customer360Profile[];
  selectedProfileId?: string;
  onSelectProfile: (profileId: string) => void;
  onOpenDirectChat?: (recipientId: string, recipientName: string) => void;
  onCreateTaskForCustomer?: (customerId: string, taskTitle: string) => void;
}

export const OmniCustomer360View: React.FC<Props> = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
  onOpenDirectChat,
  onCreateTaskForCustomer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'education_events' | 'conversations_support' | 'compliance' | 'tasks_notes'>('overview');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(!!selectedProfileId);

  // Active customer detail object
  const activeCustomer = profiles.find(p => p.id === (selectedProfileId || profiles[0]?.id)) || profiles[0];

  const handleCardClick = (profileId: string) => {
    onSelectProfile(profileId);
    setIsDetailModalOpen(true);
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch =
      profile.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = selectedTier === 'all' || profile.customerTier === selectedTier;
    const matchesStage = selectedStage === 'all' || profile.lifecycleStage === selectedStage;

    return matchesSearch && matchesTier && matchesStage;
  });

  const getTierBadge = (tier: CustomerTier) => {
    switch (tier) {
      case 'enterprise_institutional':
        return { label: 'Institutional Tier', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'platinum_vip':
        return { label: 'Platinum VIP', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'gold':
        return { label: 'Gold Tier', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      case 'silver':
        return { label: 'Silver Tier', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };
      default:
        return { label: 'Standard Tier', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Hot 🔥', color: 'text-rose-400 bg-rose-950 border-rose-500/30' };
    if (score >= 75) return { label: 'Warm ⚡', color: 'text-amber-400 bg-amber-950 border-amber-500/30' };
    if (score >= 50) return { label: 'Nurture 🌱', color: 'text-sky-400 bg-sky-950 border-sky-500/30' };
    return { label: 'Cold ❄️', color: 'text-slate-400 bg-slate-900 border-slate-700' };
  };

  return (
    <div id="omni-customer-360-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                CUSTOMER 360 INTELLIGENCE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Customer 360 Directory & Behavioral Profiles
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Holistic single-pane-of-glass customer profiles synthesizing verified identities, purchase ledger history, course progress, community reputation, and AI lead insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-xs text-slate-400 block font-medium">Total Profiles</span>
              <span className="text-xl font-bold text-white font-mono">{profiles.length}</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-xs text-slate-400 block font-medium">Avg Lead Score</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">83.6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name, handle, company, or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTier}
              onChange={e => setSelectedTier(e.target.value)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none text-xs"
            >
              <option value="all">All Customer Tiers</option>
              <option value="enterprise_institutional">Institutional Tier</option>
              <option value="platinum_vip">Platinum VIP</option>
              <option value="gold">Gold Tier</option>
              <option value="silver">Silver Tier</option>
              <option value="standard">Standard Tier</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStage}
              onChange={e => setSelectedStage(e.target.value)}
              className="bg-transparent text-slate-300 font-semibold focus:outline-none text-xs"
            >
              <option value="all">All Lifecycle Stages</option>
              <option value="vip_advocate">VIP Advocate</option>
              <option value="active_customer">Active Customer</option>
              <option value="qualified_opportunity">Opportunity</option>
              <option value="lead">Lead</option>
              <option value="at_risk_churn">At-Risk Churn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.map(profile => {
          const tierBadge = getTierBadge(profile.customerTier);
          const scoreBadge = getScoreBadge(profile.aiIntelligence.leadScore);

          return (
            <div
              key={profile.id}
              onClick={() => handleCardClick(profile.id)}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 space-y-4 shadow-lg hover:shadow-indigo-500/10 transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={profile.avatarUrl}
                        alt={profile.displayName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow"
                      />
                      {profile.verificationStatus !== 'unverified' && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[9px] shadow">
                          ✓
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition flex items-center gap-1.5">
                        {profile.displayName}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono">{profile.handle}</p>
                      <p className="text-[11px] text-slate-300 font-medium truncate max-w-[170px] mt-0.5">
                        {profile.companyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${scoreBadge.color}`}>
                      Score {profile.aiIntelligence.leadScore} ({scoreBadge.label})
                    </span>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${tierBadge.color}`}>
                      {tierBadge.label}
                    </span>
                  </div>
                </div>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 mt-4 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Lifetime Value</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      ${profile.lifetimeValueUsd.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Orders</span>
                    <span className="text-xs font-bold text-white font-mono">{profile.totalOrdersCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Rep Score</span>
                    <span className="text-xs font-bold text-indigo-400 font-mono">{profile.reputationScore}</span>
                  </div>
                </div>

                {/* AI Recommendation Snippet */}
                <div className="mt-3 p-2.5 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-[11px] text-indigo-200 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="line-clamp-2">
                    <strong className="text-indigo-300">Next Action:</strong> {profile.aiIntelligence.recommendedNextAction}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px] text-slate-500">
                  Acquired: {new Date(profile.firstAcquiredDate).toLocaleDateString()}
                </span>
                <span className="text-indigo-400 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-1">
                  View 360 Profile <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL CUSTOMER 360 PROFILE MODAL */}
      {isDetailModalOpen && activeCustomer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-fade-in overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={activeCustomer.avatarUrl}
                  alt={activeCustomer.displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{activeCustomer.displayName}</h2>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTierBadge(activeCustomer.customerTier).color}`}>
                      {getTierBadge(activeCustomer.customerTier).label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{activeCustomer.handle} • {activeCustomer.title}</p>
                  <p className="text-xs text-indigo-300 font-semibold mt-0.5">{activeCustomer.companyName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {onOpenDirectChat && (
                  <button
                    onClick={() => {
                      onOpenDirectChat(activeCustomer.id, activeCustomer.displayName);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Direct Chat</span>
                  </button>
                )}

                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 border-b border-slate-800 bg-slate-950/40 overflow-x-auto scrollbar-thin">
              {[
                { id: 'overview', label: '360 Overview & AI', icon: Sparkles },
                { id: 'financials', label: 'Financials & Orders', icon: DollarSign, badge: activeCustomer.orders.length },
                { id: 'education_events', label: 'Courses & Events', icon: GraduationCap },
                { id: 'conversations_support', label: 'Conversations & Support', icon: MessageSquare },
                { id: 'compliance', label: 'Consent & GDPR', icon: ShieldCheck },
                { id: 'tasks_notes', label: 'Tasks & Notes', icon: CheckCircle2, badge: activeCustomer.tasks.length }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-3 border-b-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                      isActive
                        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded-full font-mono">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: OVERVIEW & AI INTELLIGENCE */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* AI Intelligence Card */}
                  <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        OMNI AI Predictive Scoring & Behavioral Analysis
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Last Analyzed: {new Date(activeCustomer.aiIntelligence.lastAnalyzedAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                        <span className="text-[10px] text-slate-400 block font-semibold">Lead Score</span>
                        <div className="text-xl font-black text-rose-400 font-mono mt-0.5">
                          {activeCustomer.aiIntelligence.leadScore} / 100
                        </div>
                        <span className="text-[9px] text-slate-400">{activeCustomer.aiIntelligence.ratingTier.toUpperCase()} LEAD</span>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                        <span className="text-[10px] text-slate-400 block font-semibold">Win Probability</span>
                        <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                          {activeCustomer.aiIntelligence.conversionProbabilityPct}%
                        </div>
                        <span className="text-[9px] text-emerald-400/80">High Confidence</span>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                        <span className="text-[10px] text-slate-400 block font-semibold">Buying Intent</span>
                        <div className="text-xl font-black text-indigo-400 font-mono mt-0.5">
                          {activeCustomer.aiIntelligence.buyingIntentScore} / 100
                        </div>
                        <span className="text-[9px] text-indigo-300">Active Procurement</span>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-500/20">
                        <span className="text-[10px] text-slate-400 block font-semibold">Churn Risk</span>
                        <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                          {activeCustomer.aiIntelligence.churnRiskPct}%
                        </div>
                        <span className="text-[9px] text-slate-400">Minimal Risk</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950/90 rounded-xl border border-indigo-500/20 space-y-2">
                      <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        AI Recommended Strategic Action:
                      </div>
                      <p className="text-xs text-white">
                        {activeCustomer.aiIntelligence.recommendedNextAction}
                      </p>
                      <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-1.5">
                        <strong>Reasoning:</strong> {activeCustomer.aiIntelligence.aiJustification}
                      </div>
                    </div>

                    {/* Non-delegation note */}
                    <p className="text-[10px] text-slate-500 italic">
                      * OMNI AI Governance: AI produces recommendations and risk assessments. Final commercial terms and decision-making remain strictly with authorized human personnel.
                    </p>
                  </div>

                  {/* Core Identity & Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Contact & Location</h4>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-mono text-white">{activeCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-mono text-white">{activeCustomer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{activeCustomer.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Timezone: {activeCustomer.timezone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Passport Identity & Rep</h4>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Passport UID:</span>
                          <span className="font-mono font-semibold text-white">{activeCustomer.passportUid}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Verification:</span>
                          <span className="text-emerald-400 font-bold">VERIFIED HUMAN</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Reputation Points:</span>
                          <span className="font-mono font-bold text-indigo-400">{activeCustomer.reputationScore} / 1000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Internal Credit Score:</span>
                          <span className="font-mono font-bold text-white">{activeCustomer.creditScoreInternal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FINANCIALS & ORDERS */}
              {activeTab === 'financials' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Lifetime Value</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">
                        ${activeCustomer.lifetimeValueUsd.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Avg Order Value</span>
                      <span className="text-lg font-black text-white font-mono">
                        ${activeCustomer.averageOrderValueUsd.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Outstanding Balance</span>
                      <span className="text-lg font-black text-slate-400 font-mono">
                        ${activeCustomer.outstandingBalanceUsd}
                      </span>
                    </div>
                  </div>

                  {/* Order History */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-indigo-400" />
                      Commerce Order History
                    </h4>
                    {activeCustomer.orders.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No previous orders on record.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.orders.map(order => (
                          <div
                            key={order.id}
                            className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-white font-mono">{order.orderNumber}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{order.itemsSummary}</div>
                              <span className="text-[10px] text-slate-500">{new Date(order.date).toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-mono font-bold text-emerald-400">${order.amountUsd.toLocaleString()}</div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-semibold border border-emerald-500/20">
                                {order.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Settled Payment Transactions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Settled Payment Receipts (OMNI Finance Ledger)
                    </h4>
                    {activeCustomer.payments.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No ledger transactions logged.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.payments.map(pay => (
                          <div
                            key={pay.id}
                            className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono"
                          >
                            <div>
                              <span className="text-indigo-400 font-bold">{pay.reference}</span>
                              <div className="text-[10px] text-slate-500 mt-0.5">Rail: {pay.rail.toUpperCase()}</div>
                            </div>
                            <div className="text-right">
                              <span className="text-white font-bold">${pay.amountUsd.toLocaleString()}</span>
                              <span className="block text-[9px] text-emerald-400">SETTLED</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: EDUCATION & EVENTS */}
              {activeTab === 'education_events' && (
                <div className="space-y-6">
                  {/* Masterclasses */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      Enrolled Courses & Masterclasses
                    </h4>
                    {activeCustomer.coursesEnrolled.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No masterclass enrollments.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.coursesEnrolled.map(c => (
                          <div key={c.id} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{c.title}</span>
                              <span className="font-mono text-indigo-400 font-bold">{c.progressPercent}% Complete</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-indigo-500 h-full rounded-full"
                                style={{ width: `${c.progressPercent}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span>Certificate: {c.certificateIssued ? '🎖️ Issued On-Chain' : 'In Progress'}</span>
                              <span>Last Active: {new Date(c.lastAccessedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Events & Summits */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      Summits & WebRTC Webinars Attended
                    </h4>
                    {activeCustomer.eventsAttended.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No event attendance records.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.eventsAttended.map(evt => (
                          <div key={evt.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-white">{evt.title}</span>
                              <div className="text-[10px] text-slate-400">{new Date(evt.date).toLocaleDateString()}</div>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-semibold border border-emerald-500/20">
                              CHECKED IN
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: CONVERSATIONS & SUPPORT */}
              {activeTab === 'conversations_support' && (
                <div className="space-y-6">
                  {/* Conversations */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      Universal Communication Channels
                    </h4>
                    {activeCustomer.conversationsHistory.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No active conversations found.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.conversationsHistory.map(conv => (
                          <div key={conv.id} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-indigo-300">{conv.channel}</span>
                              <span className="text-[10px] text-slate-500">{new Date(conv.date).toLocaleString()}</span>
                            </div>
                            <p className="text-slate-300 text-xs italic">"{conv.lastMessage}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Support Tickets */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <LifeBuoy className="w-4 h-4 text-rose-400" />
                      Customer Support Tickets
                    </h4>
                    {activeCustomer.supportTickets.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No support tickets logged. Clean support record.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.supportTickets.map(t => (
                          <div key={t.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-white">{t.subject}</div>
                              <span className="text-[10px] text-slate-500 font-mono">{t.ticketNumber}</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                              {t.status.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: CONSENT & COMPLIANCE */}
              {activeTab === 'compliance' && (
                <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    GDPR, Consent & Communication Opt-Ins
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-300">Direct Messages (OMNI & Social):</span>
                      <span className="text-emerald-400 font-bold">OPTED IN ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-300">Transactional & Marketing Email:</span>
                      <span className="text-emerald-400 font-bold">OPTED IN ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-300">GDPR & Sovereign Data Processing:</span>
                      <span className="text-emerald-400 font-bold">ACCEPTED & AUDITED ✓</span>
                    </div>
                    <div className="p-2.5 bg-slate-900/40 rounded-xl text-[11px] text-slate-400 space-y-1">
                      <div>Consent Timestamp: <strong className="text-white font-mono">{activeCustomer.consent.consentGivenAt}</strong></div>
                      <div>Origin Source: <strong className="text-white">{activeCustomer.consent.consentSource}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: TASKS & NOTES */}
              {activeTab === 'tasks_notes' && (
                <div className="space-y-6">
                  {/* Tasks */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      Assigned Action Tasks
                    </h4>
                    {activeCustomer.tasks.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No pending tasks for this customer.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.tasks.map(t => (
                          <div key={t.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-white">{t.title}</span>
                              <div className="text-[10px] text-slate-400 mt-0.5">Due: {t.dueDate} • Assignee: {t.assignedAgentName}</div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/20 font-semibold uppercase">
                              {t.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Internal Notes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-amber-400" />
                      Internal Team Notes
                    </h4>
                    {activeCustomer.notes.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No notes created.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeCustomer.notes.map(n => (
                          <div key={n.id} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="font-bold text-indigo-300">{n.authorName}</span>
                              <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-200">{n.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
