import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Eye,
  MousePointer,
  Target,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  X,
  Smartphone,
  Globe,
  Radio
} from 'lucide-react';
import {
  AdCampaign,
  CampaignObjective,
  CampaignStatus,
  BidStrategy,
  BudgetType,
  AdPlacementType,
  AdCreative
} from '../../../types/omni_ads';

interface Props {
  campaigns: AdCampaign[];
  onUpdateCampaigns: (updater: (prev: AdCampaign[]) => AdCampaign[]) => void;
  onOpenAiAssistant: () => void;
  onPreviewPlacement: (placement: AdPlacementType, creative?: AdCreative) => void;
}

export const OmniCampaignManagerView: React.FC<Props> = ({
  campaigns,
  onUpdateCampaigns,
  onOpenAiAssistant,
  onPreviewPlacement
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CampaignStatus>('all');
  const [objectiveFilter, setObjectiveFilter] = useState<'all' | CampaignObjective>('all');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Campaign Form State
  const [newName, setNewName] = useState('');
  const [newObjective, setNewObjective] = useState<CampaignObjective>('sales');
  const [newBudgetType, setNewBudgetType] = useState<BudgetType>('daily');
  const [newBudgetAmount, setNewBudgetAmount] = useState(100);
  const [newBidStrategy, setNewBidStrategy] = useState<BidStrategy>('lowest_cost_auto');
  const [newTargetBid, setNewTargetBid] = useState(2.50);
  const [newPlacements, setNewPlacements] = useState<AdPlacementType[]>(['feed_native', 'video_ad_break']);
  const [newLocations, setNewLocations] = useState('United States, United Kingdom, Germany');
  const [newInterests, setNewInterests] = useState('Technology, Cloud, Engineering');
  const [newHeadline, setNewHeadline] = useState('');
  const [newPrimaryText, setNewPrimaryText] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800');
  const [newCta, setNewCta] = useState<AdCreative['callToAction']>('Sign Up');
  const [newDestUrl, setNewDestUrl] = useState('https://connect.omni.com');

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.advertiserName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesObjective = objectiveFilter === 'all' || c.objective === objectiveFilter;
    return matchesSearch && matchesStatus && matchesObjective;
  });

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const toggleCampaignStatus = (id: string) => {
    onUpdateCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus: CampaignStatus = c.status === 'active' ? 'paused' : 'active';
        return { ...c, status: nextStatus, updatedAt: new Date().toISOString() };
      }
      return c;
    }));
  };

  const handleCreateCampaign = () => {
    if (!newName.trim() || !newHeadline.trim()) return;

    const newCamp: AdCampaign = {
      id: `camp-${Date.now()}`,
      advertiserId: 'adv-current-user',
      advertiserName: 'My Sovereign Brand',
      advertiserAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      advertiserVerified: true,
      name: newName,
      objective: newObjective,
      status: 'active',
      budgetType: newBudgetType,
      budgetAmountUsd: Number(newBudgetAmount),
      spentAmountUsd: 0,
      bidStrategy: newBidStrategy,
      targetBidUsd: Number(newTargetBid),
      startDate: new Date().toISOString().split('T')[0],
      placements: newPlacements,
      targeting: {
        locations: newLocations.split(',').map(s => s.trim()),
        languages: ['English'],
        ageMin: 18,
        ageMax: 65,
        genders: ['all'],
        interests: newInterests.split(',').map(s => s.trim()),
        behaviours: ['Digital Natives', 'Active Consumers'],
        communityMemberships: [],
        businessCategories: ['Technology', 'E-Commerce'],
        privacyConsentMode: 'anonymized_cohorts',
        estimatedAudienceSize: 1250000
      },
      creatives: [
        {
          id: `creat-${Date.now()}`,
          headline: newHeadline,
          primaryText: newPrimaryText,
          callToAction: newCta,
          mediaUrl: newMediaUrl,
          mediaType: 'single_image',
          aspectRatio: '16:9',
          destinationUrl: newDestUrl,
          displayUrl: 'omni.connect/promoted',
          sponsorHandle: 'my_brand',
          sponsorName: 'My Sovereign Brand',
          sponsorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          isAiGenerated: false
        }
      ],
      metrics: {
        impressions: 0,
        clicks: 0,
        ctrPct: 0,
        cpcUsd: 0,
        cpmUsd: 0,
        conversions: 0,
        cvrPct: 0,
        cpaUsd: 0,
        conversionValueUsd: 0,
        roas: 0,
        reach: 0,
        frequency: 1,
        invalidClicksFiltered: 0
      },
      aiOptimizationEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onUpdateCampaigns(prev => [newCamp, ...prev]);
    setSelectedCampaignId(newCamp.id);
    setShowCreateModal(false);
    // Reset inputs
    setNewName('');
    setNewHeadline('');
    setNewPrimaryText('');
  };

  const allPlacementsList: { type: AdPlacementType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { type: 'feed_native', label: 'Feed Native Ad', icon: Layers },
    { type: 'moments_vertical', label: 'Moments Reel 9:16', icon: Smartphone },
    { type: 'status_story', label: 'Status 24h Story', icon: Clock },
    { type: 'video_ad_break', label: 'Video In-Stream Break', icon: Play },
    { type: 'search_sponsored', label: 'Sponsored Search', icon: Search },
    { type: 'marketplace_boost', label: 'Marketplace Boost', icon: DollarSign },
    { type: 'creator_co_branded', label: 'Creator Co-Branded', icon: Sparkles },
    { type: 'business_page_promoted', label: 'Promoted Business Page', icon: Globe },
    { type: 'publisher_web_native', label: 'Publisher Web Native', icon: Radio }
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-400" />
              OMNI Campaign Manager
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Auction Active
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Enterprise advertising engine across 9 OMNI placements with privacy-safe cohort targeting & native OMNI Finance settlement.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onOpenAiAssistant}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Gemini AI Campaign Studio
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Aggregate KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Total Spend</span>
            <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-lg font-black text-white">
            ${campaigns.reduce((acc, c) => acc + c.spentAmountUsd, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            100% Settled
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Total Impressions</span>
            <Eye className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-black text-white">
            {campaigns.reduce((acc, c) => acc + c.metrics.impressions, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across 9 Placements</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Total Clicks</span>
            <MousePointer className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-lg font-black text-white">
            {campaigns.reduce((acc, c) => acc + c.metrics.clicks, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-300 mt-0.5">Avg CTR: 3.60%</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Conversions</span>
            <Target className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-black text-white">
            {campaigns.reduce((acc, c) => acc + c.metrics.conversions, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Direct Attribution</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Conversion Value</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-black text-white">
            ${campaigns.reduce((acc, c) => acc + c.metrics.conversionValueUsd, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-300 mt-0.5">Sovereign Orders</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Avg ROAS</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-black text-emerald-400">
            {(
              campaigns.reduce((acc, c) => acc + c.metrics.conversionValueUsd, 0) /
              (campaigns.reduce((acc, c) => acc + c.spentAmountUsd, 0) || 1)
            ).toFixed(2)}x
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Return on Ad Spend</div>
        </div>
      </div>

      {/* Main Campaign Management Table & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Campaign List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campaigns by name, objective, or advertiser..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="in_review">In Review</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={objectiveFilter}
                onChange={e => setObjectiveFilter(e.target.value as any)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 focus:outline-none"
              >
                <option value="all">All Objectives</option>
                <option value="sales">Sales</option>
                <option value="leads">Leads</option>
                <option value="traffic">Traffic</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="awareness">Awareness</option>
                <option value="app_installs">App Installs</option>
              </select>
            </div>
          </div>

          {/* Campaign Rows */}
          <div className="space-y-3">
            {filteredCampaigns.map(camp => {
              const isSelected = camp.id === selectedCampaignId;
              const isRunning = camp.status === 'active';

              return (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500/80 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCampaignStatus(camp.id);
                        }}
                        className={`mt-0.5 p-2 rounded-lg transition-colors ${
                          isRunning
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                        title={isRunning ? 'Pause Campaign' : 'Resume Campaign'}
                      >
                        {isRunning ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-white hover:text-indigo-300 transition-colors">
                            {camp.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            camp.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {camp.status}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {camp.objective}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 flex-wrap">
                          <span>Adv: <strong className="text-slate-300">{camp.advertiserName}</strong></span>
                          <span>Budget: <strong className="text-slate-200">${camp.budgetAmountUsd}/{camp.budgetType}</strong></span>
                          <span>Spent: <strong className="text-slate-200">${camp.spentAmountUsd.toFixed(2)}</strong></span>
                          <span>Placements: <strong className="text-indigo-300">{camp.placements.length} Active</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                      <div>
                        <div className="text-xs text-slate-400">ROAS</div>
                        <div className="text-base font-black text-emerald-400">{camp.metrics.roas.toFixed(2)}x</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">CTR</div>
                        <div className="text-sm font-bold text-white">{camp.metrics.ctrPct.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Conversions</div>
                        <div className="text-sm font-bold text-indigo-300">{camp.metrics.conversions}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Campaign Deep Dive & Live Creative Preview */}
        <div className="lg:col-span-4 space-y-4">
          {selectedCampaign && (
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-5 sticky top-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Selected Campaign</div>
                  <h3 className="text-base font-black text-white truncate max-w-[220px]">{selectedCampaign.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPreviewPlacement(selectedCampaign.placements[0] || 'feed_native', selectedCampaign.creatives[0])}
                    className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-xs font-bold rounded-lg border border-indigo-500/30 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview Ad
                  </button>
                </div>
              </div>

              {/* Strategy & Budgeting Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="text-slate-400">Bid Strategy</div>
                  <div className="text-white font-bold mt-0.5 uppercase tracking-wide">{selectedCampaign.bidStrategy.replace(/_/g, ' ')}</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="text-slate-400">Target Bid / Floor</div>
                  <div className="text-white font-bold mt-0.5">${selectedCampaign.targetBidUsd.toFixed(2)} USD</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="text-slate-400">Target Audience</div>
                  <div className="text-indigo-300 font-bold mt-0.5 truncate">{selectedCampaign.targeting.estimatedAudienceSize.toLocaleString()} reach</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="text-slate-400">Privacy Mode</div>
                  <div className="text-emerald-400 font-bold mt-0.5">Differential Cohorts</div>
                </div>
              </div>

              {/* Placements Matrix */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Active Placements ({selectedCampaign.placements.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCampaign.placements.map(pl => (
                    <button
                      key={pl}
                      onClick={() => onPreviewPlacement(pl, selectedCampaign.creatives[0])}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-200 border border-slate-800 hover:border-indigo-500/40 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Layers className="w-3 h-3 text-indigo-400" />
                      {pl.replace(/_/g, ' ')}
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Creative Thumbnail & Copy */}
              {selectedCampaign.creatives[0] && (
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Active Creative Asset</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                      {selectedCampaign.creatives[0].mediaType}
                    </span>
                  </div>

                  <img
                    src={selectedCampaign.creatives[0].mediaUrl}
                    alt={selectedCampaign.creatives[0].headline}
                    className="w-full h-32 object-cover rounded-lg border border-slate-800"
                  />

                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{selectedCampaign.creatives[0].headline}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{selectedCampaign.creatives[0].primaryText}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-indigo-300 font-mono">{selectedCampaign.creatives[0].displayUrl || 'omni.connect/ad'}</span>
                    <span className="px-3 py-1 bg-indigo-600 text-white font-bold text-xs rounded-lg">
                      {selectedCampaign.creatives[0].callToAction}
                    </span>
                  </div>
                </div>
              )}

              {/* AI Optimizations Banner */}
              {selectedCampaign.aiSuggestedImprovements && selectedCampaign.aiSuggestedImprovements.length > 0 && (
                <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    Gemini AI Pacing Advisor
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                    {selectedCampaign.aiSuggestedImprovements.map((sug, i) => (
                      <li key={i}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CREATE CAMPAIGN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Create New OMNI Ad Campaign</h3>
                  <p className="text-xs text-slate-400">Launch targeted campaigns across 9 high-impact placements with double-entry ledger integration.</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {/* Campaign Name & Objective */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Campaign Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Q4 Titanium Wallet Drop"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Campaign Objective</label>
                  <select
                    value={newObjective}
                    onChange={e => setNewObjective(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="sales">Sales (Highest Direct Revenue)</option>
                    <option value="leads">Leads (Contact Form & Chat CRM)</option>
                    <option value="traffic">Traffic (Website / Store Clicks)</option>
                    <option value="subscriptions">Subscriptions (Patron / Membership)</option>
                    <option value="awareness">Awareness (Maximum Brand Reach)</option>
                    <option value="engagement">Engagement (Likes, Shares, Comments)</option>
                    <option value="app_installs">App Installs (Mobile Deep Link)</option>
                    <option value="events">Events (Townhall RSVP Registrations)</option>
                  </select>
                </div>
              </div>

              {/* Budget & Bidding */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Budget Type</label>
                  <select
                    value={newBudgetType}
                    onChange={e => setNewBudgetType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                  >
                    <option value="daily">Daily Budget ($/day)</option>
                    <option value="lifetime">Lifetime Budget ($ Total)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Budget Amount ($)</label>
                  <input
                    type="number"
                    min="5"
                    value={newBudgetAmount}
                    onChange={e => setNewBudgetAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Target Bid Floor ($)</label>
                  <input
                    type="number"
                    step="0.10"
                    min="0.10"
                    value={newTargetBid}
                    onChange={e => setNewTargetBid(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Placements Selector */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Ad Placements Selection (Select 1 or more)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allPlacementsList.map(item => {
                    const active = newPlacements.includes(item.type);
                    return (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => {
                          if (active) {
                            if (newPlacements.length > 1) {
                              setNewPlacements(newPlacements.filter(p => p !== item.type));
                            }
                          } else {
                            setNewPlacements([...newPlacements, item.type]);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                          active
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Creative Details */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold uppercase text-indigo-400">Creative Media & Copy</div>
                
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Headline</label>
                  <input
                    type="text"
                    placeholder="High-converting punchy hook (max 80 chars)"
                    value={newHeadline}
                    onChange={e => setNewHeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Primary Body Text</label>
                  <textarea
                    rows={2}
                    placeholder="Detailed selling proposition and customer value..."
                    value={newPrimaryText}
                    onChange={e => setNewPrimaryText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Media Image/Video URL</label>
                    <input
                      type="text"
                      value={newMediaUrl}
                      onChange={e => setNewMediaUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Call-To-Action Button</label>
                    <select
                      value={newCta}
                      onChange={e => setNewCta(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                    >
                      <option value="Shop Now">Shop Now</option>
                      <option value="Sign Up">Sign Up</option>
                      <option value="Learn More">Learn More</option>
                      <option value="Send Message">Send Message</option>
                      <option value="Subscribe">Subscribe</option>
                      <option value="Book Now">Book Now</option>
                      <option value="Install App">Install App</option>
                      <option value="Join Space">Join Space</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCampaign}
                disabled={!newName.trim() || !newHeadline.trim()}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Publish & Fund Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
