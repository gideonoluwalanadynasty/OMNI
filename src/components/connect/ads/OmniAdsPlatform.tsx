import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Eye,
  DollarSign,
  Radio,
  BarChart3,
  ShieldCheck,
  Lock,
  Activity,
  Zap,
  Globe,
  Sliders,
  CheckCircle,
  Crown
} from 'lucide-react';
import {
  AdCampaign,
  AdPlacementType,
  AdCreative,
  AiGeneratedCampaignProposal
} from '../../../types/omni_ads';
import { SEED_AD_CAMPAIGNS } from '../../../data/omni_ads_seed';
import { OmniCampaignManagerView } from './OmniCampaignManagerView';
import { OmniAiCampaignAssistantView } from './OmniAiCampaignAssistantView';
import { OmniAdPlacementsPreview } from './OmniAdPlacementsPreview';
import { OmniCreatorAdRevShareView } from './OmniCreatorAdRevShareView';
import { OmniPublisherNetworkView } from './OmniPublisherNetworkView';
import { OmniAdAnalyticsView } from './OmniAdAnalyticsView';
import { OmniAdSafetyFraudView } from './OmniAdSafetyFraudView';
import { OmniAdAdminGovernanceView } from './OmniAdAdminGovernanceView';
import { OmniAdsTestSuiteModal } from './OmniAdsTestSuiteModal';

export const OmniAdsPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'campaigns' | 'ai_studio' | 'placements_preview' | 'creator_rev_share' | 'publisher_network' | 'analytics' | 'safety_fraud' | 'governance'
  >('campaigns');

  const [campaigns, setCampaigns] = useState<AdCampaign[]>(SEED_AD_CAMPAIGNS);
  const [previewPlacement, setPreviewPlacement] = useState<AdPlacementType>('feed_native');
  const [previewCreative, setPreviewCreative] = useState<AdCreative | undefined>(undefined);
  const [showTestHarness, setShowTestHarness] = useState(false);
  const [isVipAdFree, setIsVipAdFree] = useState(false);

  const handleOpenPlacementPreview = (placement: AdPlacementType, creative?: AdCreative) => {
    setPreviewPlacement(placement);
    setPreviewCreative(creative);
    setActiveTab('placements_preview');
  };

  const handleApproveAiProposal = (proposal: AiGeneratedCampaignProposal) => {
    const newCamp: AdCampaign = {
      id: `camp-ai-${Date.now()}`,
      advertiserId: 'adv-current-user',
      advertiserName: 'My Sovereign Brand',
      advertiserAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      advertiserVerified: true,
      name: proposal.recommendedName,
      objective: proposal.recommendedObjective,
      status: 'active',
      budgetType: 'daily',
      budgetAmountUsd: proposal.recommendedDailyBudgetUsd,
      spentAmountUsd: 0,
      bidStrategy: proposal.recommendedBidStrategy,
      targetBidUsd: proposal.recommendedTargetBidUsd,
      startDate: new Date().toISOString().split('T')[0],
      placements: proposal.recommendedPlacements,
      targeting: proposal.suggestedAudience,
      creatives: [
        {
          id: `creat-ai-${Date.now()}`,
          headline: proposal.generatedCopyOptions[0]?.headline || 'Sovereign Innovation',
          primaryText: proposal.generatedCopyOptions[0]?.primaryText || 'High-performance AI.',
          callToAction: proposal.generatedCopyOptions[0]?.callToAction || 'Shop Now',
          mediaUrl: proposal.generatedVisualPrompts[0]?.previewUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
          mediaType: 'single_image',
          aspectRatio: proposal.generatedVisualPrompts[0]?.recommendedAspectRatio || '16:9',
          destinationUrl: 'https://omni.connect/campaign',
          displayUrl: 'omni.connect/deal',
          sponsorHandle: 'sovereign_brand',
          sponsorName: 'My Sovereign Brand',
          sponsorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          isAiGenerated: true
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
        roas: proposal.predictedRoas,
        reach: 0,
        frequency: 1,
        invalidClicksFiltered: 0
      },
      aiOptimizationEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setActiveTab('campaigns');
  };

  const navTabs: { id: typeof activeTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'campaigns', label: 'Campaign Manager', icon: Layers },
    { id: 'ai_studio', label: 'Gemini AI Studio', icon: Sparkles },
    { id: 'placements_preview', label: '9 Ad Placements', icon: Eye },
    { id: 'creator_rev_share', label: 'Creator Rev-Share (70%)', icon: DollarSign },
    { id: 'publisher_network', label: 'Publisher SDK (AdSense)', icon: Radio },
    { id: 'analytics', label: 'Ad Analytics & ROAS', icon: BarChart3 },
    { id: 'safety_fraud', label: 'Safety & IVT Shield', icon: ShieldCheck },
    { id: 'governance', label: 'Super Admin Policy', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with VIP Ad-Free toggle & Diagnostic Suite launcher */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-md">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white flex items-center gap-2">
              OMNI Advertising & Campaign Ecosystem
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase rounded border border-indigo-500/30">
                Sovereign Ad Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400">Meta + Google + TikTok + AdMob + AdSense capabilities integrated natively into OMNI.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Ad-Free VIP Subscription Toggle */}
          <button
            onClick={() => setIsVipAdFree(!isVipAdFree)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isVipAdFree
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md shadow-amber-500/10'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            {isVipAdFree ? 'VIP Ad-Free Active ($9.99/mo)' : 'Enable VIP Ad-Free'}
          </button>

          {/* Diagnostic Test Harness */}
          <button
            onClick={() => setShowTestHarness(true)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            Run Test Suite (6 Tests)
          </button>
        </div>
      </div>

      {/* VIP Ad-Free Notice if active */}
      {isVipAdFree && (
        <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>VIP Ad-Free Subscription Enabled: Zero ads displayed in your user feed, moments, and video breaks.</span>
          </div>
          <span className="font-bold text-amber-400">Creator Pool Supported ($9.99/mo)</span>
        </div>
      )}

      {/* Master Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
        {navTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Sub-View */}
      {activeTab === 'campaigns' && (
        <OmniCampaignManagerView
          campaigns={campaigns}
          onUpdateCampaigns={setCampaigns}
          onOpenAiAssistant={() => setActiveTab('ai_studio')}
          onPreviewPlacement={handleOpenPlacementPreview}
        />
      )}

      {activeTab === 'ai_studio' && (
        <OmniAiCampaignAssistantView
          onApproveProposal={handleApproveAiProposal}
          onPreviewPlacement={handleOpenPlacementPreview}
        />
      )}

      {activeTab === 'placements_preview' && (
        <OmniAdPlacementsPreview
          initialPlacement={previewPlacement}
          customCreative={previewCreative}
        />
      )}

      {activeTab === 'creator_rev_share' && (
        <OmniCreatorAdRevShareView />
      )}

      {activeTab === 'publisher_network' && (
        <OmniPublisherNetworkView />
      )}

      {activeTab === 'analytics' && (
        <OmniAdAnalyticsView campaigns={campaigns} />
      )}

      {activeTab === 'safety_fraud' && (
        <OmniAdSafetyFraudView />
      )}

      {activeTab === 'governance' && (
        <OmniAdAdminGovernanceView />
      )}

      {/* Automated Diagnostic Test Suite Modal */}
      <OmniAdsTestSuiteModal
        isOpen={showTestHarness}
        onClose={() => setShowTestHarness(false)}
      />
    </div>
  );
};
