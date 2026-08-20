import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Calendar,
  BarChart3,
  DollarSign,
  Compass,
  Award,
  Radio,
  Brain,
  ShieldAlert,
  ShieldCheck,
  Plus,
  Play,
  Share2,
  FileText
} from 'lucide-react';

import {
  CreatorContentItem,
  CreatorSubscriptionTier,
  CreatorCourse,
  CreatorDigitalProduct,
  CreatorConsultingSlot,
  CreatorAnalyticsSummary,
  CreatorFinanceStatement,
  CreatorMarketplaceProfile,
  CreatorLiveStreamCommerce,
  AiCreatorManagerRecommendation,
  AiRepurposeOutput
} from '../../../types/omni_creator';

import {
  SEED_CREATOR_CONTENT_ITEMS,
  SEED_CREATOR_SUBSCRIPTION_TIERS,
  SEED_CREATOR_COURSES,
  SEED_CREATOR_DIGITAL_PRODUCTS,
  SEED_CREATOR_CONSULTING_SLOTS,
  SEED_CREATOR_ANALYTICS_SUMMARY,
  SEED_CREATOR_FINANCE_STATEMENT,
  SEED_CREATOR_MARKETPLACE_PROFILES,
  SEED_CREATOR_LIVE_COMMERCE,
  SEED_AI_CREATOR_RECOMMENDATIONS
} from '../../../data/omni_creator_seed';

import { OmniCreatorStudioWorkspace } from './OmniCreatorStudioWorkspace';
import { OmniAiCreationAssistantView } from './OmniAiCreationAssistantView';
import { OmniCreatorPublishingScheduleView } from './OmniCreatorPublishingScheduleView';
import { OmniCreatorAnalyticsView } from './OmniCreatorAnalyticsView';
import { OmniCreatorMonetizationView } from './OmniCreatorMonetizationView';
import { OmniCreatorFinanceLedgerView } from './OmniCreatorFinanceLedgerView';
import { OmniCreatorMarketplaceView } from './OmniCreatorMarketplaceView';
import { OmniFanEngagementMembershipsView } from './OmniFanEngagementMembershipsView';
import { OmniLiveStreamCommerceView } from './OmniLiveStreamCommerceView';
import { OmniAiCreatorManagerView } from './OmniAiCreatorManagerView';
import { OmniCreatorAdminControlView } from './OmniCreatorAdminControlView';
import { OmniCreatorTestSuiteModal } from './OmniCreatorTestSuiteModal';

export type CreatorPlatformTab =
  | 'studio'
  | 'ai_assistant'
  | 'schedule'
  | 'analytics'
  | 'monetization'
  | 'finance'
  | 'marketplace'
  | 'memberships'
  | 'livestream'
  | 'ai_manager'
  | 'admin';

interface Props {
  initialTab?: CreatorPlatformTab;
  onOpenDirectChat?: (recipientId: string, recipientName: string) => void;
}

export const OmniCreatorEconomyPlatform: React.FC<Props> = ({
  initialTab = 'studio',
  onOpenDirectChat
}) => {
  const [activeTab, setActiveTab] = useState<CreatorPlatformTab>(initialTab);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Core Reactive Data
  const [contentItems, setContentItems] = useState<CreatorContentItem[]>(SEED_CREATOR_CONTENT_ITEMS);
  const [subscriptionTiers, setSubscriptionTiers] = useState<CreatorSubscriptionTier[]>(SEED_CREATOR_SUBSCRIPTION_TIERS);
  const [courses, setCourses] = useState<CreatorCourse[]>(SEED_CREATOR_COURSES);
  const [digitalProducts, setDigitalProducts] = useState<CreatorDigitalProduct[]>(SEED_CREATOR_DIGITAL_PRODUCTS);
  const [consultingSlots, setConsultingSlots] = useState<CreatorConsultingSlot[]>(SEED_CREATOR_CONSULTING_SLOTS);
  const [analytics, setAnalytics] = useState<CreatorAnalyticsSummary>(SEED_CREATOR_ANALYTICS_SUMMARY);
  const [financeStatement, setFinanceStatement] = useState<CreatorFinanceStatement>(SEED_CREATOR_FINANCE_STATEMENT);
  const [marketplaceCreators, setMarketplaceCreators] = useState<CreatorMarketplaceProfile[]>(SEED_CREATOR_MARKETPLACE_PROFILES);
  const [liveStream, setLiveStream] = useState<CreatorLiveStreamCommerce>(SEED_CREATOR_LIVE_COMMERCE);
  const [aiRecommendations, setAiRecommendations] = useState<AiCreatorManagerRecommendation[]>(SEED_AI_CREATOR_RECOMMENDATIONS);

  // Selected item for AI Repurposing
  const [selectedForAi, setSelectedForAi] = useState<CreatorContentItem>(contentItems[0]);

  // Handlers
  const handleCreateContent = (item: CreatorContentItem) => {
    setContentItems(prev => [item, ...prev]);
  };

  const handleUpdateContent = (item: CreatorContentItem) => {
    setContentItems(prev => prev.map(i => (i.id === item.id ? item : i)));
  };

  const handleDeleteContent = (id: string) => {
    setContentItems(prev => prev.filter(i => i.id !== id));
  };

  const handlePublishNow = (id: string) => {
    setContentItems(prev =>
      prev.map(i =>
        i.id === id
          ? {
              ...i,
              status: 'published',
              publishedAt: new Date().toISOString()
            }
          : i
      )
    );
  };

  const handleSelectForAi = (item: CreatorContentItem) => {
    setSelectedForAi(item);
    setActiveTab('ai_assistant');
  };

  const handleApplyRepurposedContent = (output: AiRepurposeOutput) => {
    if (output.repurposedArticle) {
      const newArticle: CreatorContentItem = {
        id: `article-${Date.now()}`,
        creatorId: 'prof-001',
        creatorName: 'Dr. Adeyemi Alabi',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        creatorHandle: 'adeyemi_ai',
        title: output.repurposedArticle.headline,
        type: 'article',
        description: output.repurposedArticle.headline,
        contentBody: output.repurposedArticle.markdownBody,
        category: 'AI & Engineering',
        status: 'draft',
        accessTier: 'free',
        crossPlatformDestinations: ['omni_feed', 'newsletter_blast'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: output.recommendedHashtags || ['AI', 'Generated'],
        viewsCount: 0,
        impressionsCount: 0,
        watchTimeMinutes: 0,
        likesCount: 0,
        sharesCount: 0,
        bookmarksCount: 0,
        commentsCount: 0,
        conversionsCount: 0,
        revenueGeneratedUsd: 0
      };
      setContentItems(prev => [newArticle, ...prev]);
      setActiveTab('studio');
    }
  };

  const handleCreateCourse = (course: CreatorCourse) => {
    setCourses(prev => [course, ...prev]);
  };

  const handleCreateProduct = (prod: CreatorDigitalProduct) => {
    setDigitalProducts(prev => [prod, ...prev]);
  };

  const handleCreateTier = (tier: CreatorSubscriptionTier) => {
    setSubscriptionTiers(prev => [tier, ...prev]);
  };

  const handleRequestPayout = (amount: number) => {
    setFinanceStatement(prev => ({
      ...prev,
      availableBalanceUsd: Math.max(0, prev.availableBalanceUsd - amount),
      recentSettlements: [
        {
          id: `payout-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          streamType: 'subscriptions',
          grossAmountUsd: amount,
          platformFeeUsd: 0,
          taxWithheldUsd: 0,
          netPayoutUsd: amount,
          status: 'settled',
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
          description: `Instant Payout to Sovereign Web3 Vault (${financeStatement.connectedWalletAddress.substring(0, 8)}...)`
        },
        ...prev.recentSettlements
      ]
    }));
  };

  const handleApplyAiRecommendation = (recId: string) => {
    setAiRecommendations(prev =>
      prev.map(r => (r.id === recId ? { ...r, appliedStatus: 'applied' } : r))
    );
  };

  const handleDismissAiRecommendation = (recId: string) => {
    setAiRecommendations(prev =>
      prev.map(r => (r.id === recId ? { ...r, appliedStatus: 'dismissed' } : r))
    );
  };

  const handleLiveChatMessage = (message: string, isSuperchat?: boolean, amount?: number) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'usr-current',
      senderName: 'You (Alex)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      message,
      timestamp: 'Just now',
      isSuperchat,
      superchatAmountUsd: amount
    };

    setLiveStream(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMsg],
      totalStreamRevenueUsd: isSuperchat && amount ? prev.totalStreamRevenueUsd + amount : prev.totalStreamRevenueUsd
    }));
  };

  const handleLivePurchase = (productId: string, productName: string, price: number) => {
    setLiveStream(prev => ({
      ...prev,
      totalStreamRevenueUsd: prev.totalStreamRevenueUsd + price,
      productsForSale: prev.productsForSale.map(p =>
        p.id === productId ? { ...p, salesDuringStream: p.salesDuringStream + 1 } : p
      )
    }));
  };

  const tabsConfig = [
    { id: 'studio' as const, label: 'Creator Studio', icon: Layers, count: contentItems.length },
    { id: 'ai_assistant' as const, label: 'AI Repurposing (Gemini 2.5)', icon: Sparkles },
    { id: 'schedule' as const, label: 'Publishing Schedule', icon: Calendar, count: contentItems.filter(i => i.status === 'scheduled').length },
    { id: 'analytics' as const, label: 'Creator Analytics', icon: BarChart3 },
    { id: 'monetization' as const, label: '9-Stream Monetization', icon: DollarSign },
    { id: 'finance' as const, label: 'Finance & Ledger', icon: ShieldCheck },
    { id: 'marketplace' as const, label: 'Discovery Marketplace', icon: Compass, count: marketplaceCreators.length },
    { id: 'memberships' as const, label: 'Patron Memberships', icon: Award, count: subscriptionTiers.length },
    { id: 'livestream' as const, label: 'Live Commerce', icon: Radio, pulse: true },
    { id: 'ai_manager' as const, label: 'AI Creator Manager', icon: Brain },
    { id: 'admin' as const, label: 'Super Admin', icon: ShieldAlert }
  ];

  return (
    <div id="omni-creator-economy-platform" className="space-y-6">
      {/* Top Main Navigation Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 lg:p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">OMNI Creator Economy</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO STUDIO v4.8
              </span>
            </div>
            <p className="text-xs text-slate-400">
              The sovereign home for creators, educators, influencers, publishers and professionals.
            </p>
          </div>
        </div>

        {/* Global Action: Test Suite Runner */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTestModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Run 8-Point Diagnostics</span>
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {tabsConfig.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${tab.pulse ? 'text-rose-400 animate-pulse' : ''}`} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-indigo-900/60 text-indigo-200' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'studio' && (
        <OmniCreatorStudioWorkspace
          contentItems={contentItems}
          onCreateItem={handleCreateContent}
          onUpdateItem={handleUpdateContent}
          onDeleteItem={handleDeleteContent}
          onSelectForAi={handleSelectForAi}
        />
      )}

      {activeTab === 'ai_assistant' && (
        <OmniAiCreationAssistantView
          selectedContentItem={selectedForAi}
          onApplyRepurposedContent={handleApplyRepurposedContent}
        />
      )}

      {activeTab === 'schedule' && (
        <OmniCreatorPublishingScheduleView
          contentItems={contentItems}
          onPublishNow={handlePublishNow}
        />
      )}

      {activeTab === 'analytics' && (
        <OmniCreatorAnalyticsView
          analytics={analytics}
          contentItems={contentItems}
        />
      )}

      {activeTab === 'monetization' && (
        <OmniCreatorMonetizationView
          subscriptionTiers={subscriptionTiers}
          courses={courses}
          digitalProducts={digitalProducts}
          consultingSlots={consultingSlots}
          onCreateCourse={handleCreateCourse}
          onCreateProduct={handleCreateProduct}
          onCreateTier={handleCreateTier}
        />
      )}

      {activeTab === 'finance' && (
        <OmniCreatorFinanceLedgerView
          financeStatement={financeStatement}
          onRequestPayout={handleRequestPayout}
        />
      )}

      {activeTab === 'marketplace' && (
        <OmniCreatorMarketplaceView
          creators={marketplaceCreators}
          onOpenConsultingModal={c => {
            console.log('Book advisory with:', c.displayName);
          }}
          onOpenDirectChat={onOpenDirectChat}
        />
      )}

      {activeTab === 'memberships' && (
        <OmniFanEngagementMembershipsView
          subscriptionTiers={subscriptionTiers}
          contentItems={contentItems}
          onOpenDirectChat={onOpenDirectChat}
        />
      )}

      {activeTab === 'livestream' && (
        <OmniLiveStreamCommerceView
          liveStream={liveStream}
          onSendChatMessage={handleLiveChatMessage}
          onPurchaseProduct={handleLivePurchase}
        />
      )}

      {activeTab === 'ai_manager' && (
        <OmniAiCreatorManagerView
          recommendations={aiRecommendations}
          onApplyRecommendation={handleApplyAiRecommendation}
          onDismissRecommendation={handleDismissAiRecommendation}
        />
      )}

      {activeTab === 'admin' && (
        <OmniCreatorAdminControlView
          creators={marketplaceCreators}
          onToggleVerification={id => console.log('Toggle verify', id)}
          onFreezePayouts={id => console.log('Freeze payouts', id)}
        />
      )}

      {/* 8-Point Diagnostic Test Suite Modal */}
      <OmniCreatorTestSuiteModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
};
