import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Sparkles,
  Briefcase,
  ShieldAlert,
  Calendar,
  Clock,
  Heart,
  Eye,
  DollarSign,
  Award,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
  BarChart3,
  Flame,
  MessageSquare,
  Globe,
  HardDrive
} from 'lucide-react';
import {
  OmniAnalyticsTier,
  OmniPersonalAnalyticsData,
  OmniCreatorAnalyticsData,
  OmniBusinessAnalyticsData,
  OmniCommunityAnalyticsData,
  OmniSuperAdminAnalyticsData
} from '../../../types/omni_discovery';
import {
  SEED_PERSONAL_ANALYTICS,
  SEED_CREATOR_ANALYTICS,
  SEED_BUSINESS_ANALYTICS,
  SEED_COMMUNITY_ANALYTICS,
  SEED_SUPER_ADMIN_ANALYTICS
} from './discoveryData';

interface OmniConnectAnalyticsProps {
  initialTier?: OmniAnalyticsTier;
  onOpenAiAssistant?: () => void;
}

export const OmniConnectAnalytics: React.FC<OmniConnectAnalyticsProps> = ({
  initialTier = 'personal',
  onOpenAiAssistant
}) => {
  const [activeTier, setActiveTier] = useState<OmniAnalyticsTier>(initialTier);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [mindfulBreakCount, setMindfulBreakCount] = useState<number>(28);
  const [mindfulToast, setMindfulToast] = useState<string | null>(null);

  const tiers: { id: OmniAnalyticsTier; label: string; icon: React.FC<{ className?: string }>; badge: string }[] = [
    { id: 'personal', label: 'Personal Analytics', icon: Heart, badge: 'Wellbeing' },
    { id: 'creator', label: 'Creator Analytics', icon: Sparkles, badge: 'Revenue & Reach' },
    { id: 'business', label: 'Business Analytics', icon: Briefcase, badge: 'Leads & Funnel' },
    { id: 'community', label: 'Community Analytics', icon: Users, badge: '30d Cohorts' },
    { id: 'super_admin', label: 'Super Admin Analytics', icon: ShieldAlert, badge: 'Platform Mesh' }
  ];

  const handleTakeMindfulBreak = () => {
    setMindfulBreakCount(prev => prev + 1);
    setMindfulToast('5-minute digital wellbeing pause logged. Screen time paused.');
    setTimeout(() => setMindfulToast(null), 3000);
  };

  return (
    <div className="space-y-6" id="omni-connect-analytics-container">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                OMNI Connect Analytics Suite
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                5 Sovereign Tiers
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Multi-Dimensional Analytics Platform</h2>
            <p className="text-xs text-slate-400">
              Real-time telemetry for Individuals, Creators, Businesses, Community Spaces, and Global Platform Governance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Timeframe selector */}
            <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              {(['7d', '30d', '90d'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    timeframe === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* AI Assistant Button */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI Assistant
              </button>
            )}
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {tiers.map(tier => {
            const Icon = tier.icon;
            const isActive = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                id={`analytics-tier-${tier.id}`}
                onClick={() => setActiveTier(tier.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 border transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tier.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">
                  {tier.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {mindfulToast && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {mindfulToast}
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. PERSONAL ANALYTICS TIER */}
      {/* ==================================================================== */}
      {activeTier === 'personal' && (
        <div className="space-y-6" id="personal-analytics-section">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Engagement Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_PERSONAL_ANALYTICS.engagementRate}%</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +2.1%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Likes, comments & shares vs reach</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Total Impressions</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_PERSONAL_ANALYTICS.impressions.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{SEED_PERSONAL_ANALYTICS.totalReach.toLocaleString()} unique accounts reached</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Network Health Score</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-indigo-400">{SEED_PERSONAL_ANALYTICS.relationshipActivity.networkHealthScore} / 100</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Optimal
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{SEED_PERSONAL_ANALYTICS.relationshipActivity.newConnectionsThisPeriod} new connections in 30d</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Daily Avg Screen Time</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_PERSONAL_ANALYTICS.digitalWellbeing.dailyAvgScreenTimeMinutes} min</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" /> -14% (Wellbeing)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Balanced sovereign usage</p>
            </div>
          </div>

          {/* Relationship Activity & Content Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Relationship Activity Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Relationship Graph & Contact Velocity
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Total Connections</span>
                  <span className="block text-lg font-bold text-white mt-1">{SEED_PERSONAL_ANALYTICS.relationshipActivity.totalConnections}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Interactions Logged</span>
                  <span className="block text-lg font-bold text-white mt-1">{SEED_PERSONAL_ANALYTICS.relationshipActivity.interactionsLogged}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Decay Alerts Resolved</span>
                  <span className="block text-lg font-bold text-emerald-400 mt-1">{SEED_PERSONAL_ANALYTICS.relationshipActivity.decayAlertsResolved}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Profile Views</span>
                  <span className="block text-lg font-bold text-white mt-1">{SEED_PERSONAL_ANALYTICS.profileViews}</span>
                </div>
              </div>
            </div>

            {/* Digital Wellbeing Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  Digital Wellbeing & Mindful Hours
                </h3>
                <button
                  onClick={handleTakeMindfulBreak}
                  className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Log Mindful Break
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Focus Hours Logged</span>
                  <span className="block text-lg font-bold text-white mt-1">{SEED_PERSONAL_ANALYTICS.digitalWellbeing.focusHoursLogged} hrs</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400">Mindful Breaks Taken</span>
                  <span className="block text-lg font-bold text-rose-400 mt-1">{mindfulBreakCount} sessions</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                You are spending 14% less time on passive feeds than last month, with 42 hours in uninterrupted Focus Mode.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. CREATOR ANALYTICS TIER */}
      {/* ==================================================================== */}
      {activeTier === 'creator' && (
        <div className="space-y-6" id="creator-analytics-section">
          {/* Creator KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Total Followers</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_CREATOR_ANALYTICS.followersTotal.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{SEED_CREATOR_ANALYTICS.followersNetGrowth.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Net subscriber growth (30d)</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Global Reach</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{(SEED_CREATOR_ANALYTICS.reachTotal / 1000).toFixed(0)}k</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{SEED_CREATOR_ANALYTICS.reachGrowthPct}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Across Moments, Feeds & Spaces</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Gross Creator Revenue</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-400">${SEED_CREATOR_ANALYTICS.revenueTotalUsd.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +31.2%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Direct sovereign payout</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Avg Watch Retention</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_CREATOR_ANALYTICS.contentPerformance.avgWatchRetentionPct}%</span>
                <span className="text-xs text-indigo-400 font-semibold flex items-center">
                  Viral Coeff: {SEED_CREATOR_ANALYTICS.contentPerformance.viralCoefficient}x
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Moments video completion</p>
            </div>
          </div>

          {/* Revenue Breakdown & Audience Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Stream Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                4-Stream Monetization Breakdown
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>VIP Patron Subscriptions</span>
                    <span>${SEED_CREATOR_ANALYTICS.revenueBreakdown.subscriptionsUsd.toLocaleString()} (50%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>Marketplace Drops & Digital Goods</span>
                    <span>${SEED_CREATOR_ANALYTICS.revenueBreakdown.marketplaceDropsUsd.toLocaleString()} (26%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>Live Stream Tips & Gifts</span>
                    <span>${SEED_CREATOR_ANALYTICS.revenueBreakdown.tipsAndGiftsUsd.toLocaleString()} (13.5%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '13.5%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>OMNI Ads Publisher Revenue Share</span>
                    <span>${SEED_CREATOR_ANALYTICS.revenueBreakdown.adRevenueShareUsd.toLocaleString()} (10.5%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '10.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Geography */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                Audience Demographics & Peak Activity
              </h3>
              <div className="space-y-2.5 text-xs">
                {SEED_CREATOR_ANALYTICS.audienceInsights.topCountries.map(c => (
                  <div key={c.country} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-medium">{c.country}</span>
                    <span className="font-bold text-indigo-400">{c.percent}%</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-xs text-slate-400">
                <span>Peak Active Windows: </span>
                <strong className="text-white">14:00 - 16:00 UTC & 19:00 - 22:00 UTC</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. BUSINESS ANALYTICS TIER */}
      {/* ==================================================================== */}
      {activeTier === 'business' && (
        <div className="space-y-6" id="business-analytics-section">
          {/* Business KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Gross Merchandise Sales</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">${SEED_BUSINESS_ANALYTICS.grossSalesUsd.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{SEED_BUSINESS_ANALYTICS.salesGrowthPct}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Avg order value: ${SEED_BUSINESS_ANALYTICS.avgOrderValueUsd}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Pipeline Leads</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_BUSINESS_ANALYTICS.leadsTotal}</span>
                <span className="text-xs text-indigo-400 font-semibold flex items-center">
                  {SEED_BUSINESS_ANALYTICS.leadsQualifiedRatePct}% Qualified
                </span>
              </div>
              <p className="text-[11px] text-slate-500">AI scored inbound intent</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Message SLA & Response</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-400">{SEED_BUSINESS_ANALYTICS.businessMessages.avgFirstResponseTimeMin} min</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  {SEED_BUSINESS_ANALYTICS.businessMessages.slaCompliancePct}% SLA
                </span>
              </div>
              <p className="text-[11px] text-slate-500">CSAT Score: {SEED_BUSINESS_ANALYTICS.businessMessages.csatScore} / 5.0</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Funnel Conversion Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_BUSINESS_ANALYTICS.conversionFunnel.overallConversionRatePct}%</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +0.6%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Visitor to Closed Deal</p>
            </div>
          </div>

          {/* Funnel & Active Ad Campaigns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                End-to-End Buyer Conversion Funnel
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">1. Discovery Impressions</span>
                  <span className="font-bold text-white">{SEED_BUSINESS_ANALYTICS.conversionFunnel.impressions.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">2. Profile & Store Visits</span>
                  <span className="font-bold text-white">{SEED_BUSINESS_ANALYTICS.conversionFunnel.profileClicks.toLocaleString()} (14.8%)</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">3. Lead Inquiries & DMs</span>
                  <span className="font-bold text-indigo-400">{SEED_BUSINESS_ANALYTICS.conversionFunnel.leadInquiries.toLocaleString()} (13.0%)</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">4. Proposals Dispatched</span>
                  <span className="font-bold text-amber-400">{SEED_BUSINESS_ANALYTICS.conversionFunnel.dealProposals.toLocaleString()} (28.3%)</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">5. Closed Deals (Won)</span>
                  <span className="font-bold text-emerald-400">{SEED_BUSINESS_ANALYTICS.conversionFunnel.closedWon.toLocaleString()} (50.0%)</span>
                </div>
              </div>
            </div>

            {/* OMNI Ads ROI Tracker */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Active Ad Campaigns ROAS & Revenue
              </h3>
              <div className="space-y-3">
                {SEED_BUSINESS_ANALYTICS.campaignsRoi.map(c => (
                  <div key={c.campaignName} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{c.campaignName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        {c.roas}x ROAS
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Spend: ${c.spendUsd.toLocaleString()}</span>
                      <span>Revenue: ${c.revenueUsd.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. COMMUNITY ANALYTICS TIER */}
      {/* ==================================================================== */}
      {activeTier === 'community' && (
        <div className="space-y-6" id="community-analytics-section">
          {/* Community KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Total Space Members</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_COMMUNITY_ANALYTICS.totalMembers.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{SEED_COMMUNITY_ANALYTICS.memberGrowthPct}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{SEED_COMMUNITY_ANALYTICS.activeDailyMembers.toLocaleString()} daily active members</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">30-Day Retention (D30)</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-400">{SEED_COMMUNITY_ANALYTICS.retentionCohort30d.d30RetentionPct}%</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  Top 5% Cohort
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Benchmark: &gt;50% is stellar</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Daily Messages Avg</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_COMMUNITY_ANALYTICS.engagementMetrics.messagesPerDayAvg.toLocaleString()}</span>
                <span className="text-xs text-indigo-400 font-semibold flex items-center">
                  {SEED_COMMUNITY_ANALYTICS.engagementMetrics.reactionsTotal.toLocaleString()} reactions
                </span>
              </div>
              <p className="text-[11px] text-slate-500">In spaces, squads & channels</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Moderation Health Index</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-400">{SEED_COMMUNITY_ANALYTICS.moderationHealth.cleanHealthIndexPct}%</span>
                <span className="text-xs text-slate-400 font-semibold">
                  {SEED_COMMUNITY_ANALYTICS.moderationHealth.avgResolutionTimeMin}m avg SLA
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Zero active toxic flags</p>
            </div>
          </div>

          {/* Retention Cohort Table & Top Contributors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 30-Day Retention Cohort Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                30-Day Retention Cohort Matrix
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Day 1</span>
                  <span className="text-lg font-black text-white">{SEED_COMMUNITY_ANALYTICS.retentionCohort30d.d1RetentionPct}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Day 7</span>
                  <span className="text-lg font-black text-white">{SEED_COMMUNITY_ANALYTICS.retentionCohort30d.d7RetentionPct}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Day 14</span>
                  <span className="text-lg font-black text-indigo-400">{SEED_COMMUNITY_ANALYTICS.retentionCohort30d.d14RetentionPct}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Day 30</span>
                  <span className="text-lg font-black text-emerald-400">{SEED_COMMUNITY_ANALYTICS.retentionCohort30d.d30RetentionPct}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                New space members maintain 62.4% active engagement after 30 days, driven by automated welcome guides and weekly live voice townhalls.
              </p>
            </div>

            {/* Top Contributors */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Top Community Contributors & Mentors
              </h3>
              <div className="space-y-2.5">
                {SEED_COMMUNITY_ANALYTICS.topContributors.map(c => (
                  <div key={c.profileId} className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatarUrl} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-white block">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.role} • {c.postsCount} posts</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold font-mono">
                      {c.reputationPoints.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. SUPER ADMIN PLATFORM ANALYTICS TIER */}
      {/* ==================================================================== */}
      {activeTier === 'super_admin' && (
        <div className="space-y-6" id="super-admin-analytics-section">
          {/* Admin KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Platform DAU / MAU</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{(SEED_SUPER_ADMIN_ANALYTICS.platformUsers.dau / 1000).toFixed(0)}k / {(SEED_SUPER_ADMIN_ANALYTICS.platformUsers.mau / 1000).toFixed(0)}k</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{SEED_SUPER_ADMIN_ANALYTICS.platformUsers.yoyGrowthPct}% YoY
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Stickiness ratio: 16.9%</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Global QPS & Latency</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_SUPER_ADMIN_ANALYTICS.networkInfrastructure.globalTrafficQps.toLocaleString()} QPS</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  P95: {SEED_SUPER_ADMIN_ANALYTICS.networkInfrastructure.p95LatencyMs}ms
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{SEED_SUPER_ADMIN_ANALYTICS.networkInfrastructure.edgeNodesOnline} edge nodes online • 99.994% SLA</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Ecosystem Gross Volume</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-400">${(SEED_SUPER_ADMIN_ANALYTICS.ecosystemEconomy.grossMerchandiseVolumeUsd / 1000000).toFixed(1)}M</span>
                <span className="text-xs text-indigo-400 font-semibold">
                  ${(SEED_SUPER_ADMIN_ANALYTICS.ecosystemEconomy.platformTakeRateRevenueUsd / 1000).toFixed(0)}k Fee Rev
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{SEED_SUPER_ADMIN_ANALYTICS.ecosystemEconomy.activeWalletsCount.toLocaleString()} active sovereign wallets</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Trust & Safety Triage</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{SEED_SUPER_ADMIN_ANALYTICS.trustAndSafety.avgIncidentTriageSeconds}s</span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {SEED_SUPER_ADMIN_ANALYTICS.trustAndSafety.botnetAttacksMitigated} attacks blocked
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{SEED_SUPER_ADMIN_ANALYTICS.trustAndSafety.automatedScansCount.toLocaleString()} scans in 30d</p>
            </div>
          </div>

          {/* Infrastructure & System Load Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-indigo-400" />
              Global Edge Mesh Telemetry & Throughput
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              {SEED_SUPER_ADMIN_ANALYTICS.systemThroughputSeries.map(s => (
                <div key={s.time} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-mono text-[10px]">{s.time} UTC</span>
                  <span className="block text-base font-bold text-white">{s.qps.toLocaleString()} QPS</span>
                  <span className="text-[11px] text-indigo-400 font-mono">{s.latencyMs}ms ({s.cpuLoadPct}% CPU)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
