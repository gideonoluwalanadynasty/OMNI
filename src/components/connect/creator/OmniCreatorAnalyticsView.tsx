import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Tv,
  Target,
  Award,
  Layers
} from 'lucide-react';
import { CreatorAnalyticsSummary, CreatorContentItem } from '../../../types/omni_creator';

interface Props {
  analytics: CreatorAnalyticsSummary;
  contentItems: CreatorContentItem[];
}

export const OmniCreatorAnalyticsView: React.FC<Props> = ({ analytics, contentItems }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const streamBreakdown = [
    { label: 'Subscriptions & Memberships', amount: analytics.revenueByStream.subscriptionsRevenueUsd, color: 'bg-indigo-500', text: 'text-indigo-400' },
    { label: 'Interactive Courses', amount: analytics.revenueByStream.coursesRevenueUsd, color: 'bg-purple-500', text: 'text-purple-400' },
    { label: 'Digital Products & Downloads', amount: analytics.revenueByStream.digitalProductsRevenueUsd, color: 'bg-teal-500', text: 'text-teal-400' },
    { label: 'Paid Communities Access', amount: analytics.revenueByStream.paidCommunitiesRevenueUsd, color: 'bg-blue-500', text: 'text-blue-400' },
    { label: 'Advertising Revenue Share', amount: analytics.revenueByStream.advertisingRevenueUsd, color: 'bg-rose-500', text: 'text-rose-400' },
    { label: '1-on-1 Consulting Bookings', amount: analytics.revenueByStream.consultingRevenueUsd, color: 'bg-emerald-500', text: 'text-emerald-400' },
    { label: 'Events & Ticket Sales', amount: analytics.revenueByStream.eventsAndTicketsUsd, color: 'bg-amber-500', text: 'text-amber-400' },
    { label: 'Affiliate Commissions', amount: analytics.revenueByStream.affiliateIncomeUsd, color: 'bg-sky-500', text: 'text-sky-400' },
    { label: 'Tips & Live Superchats', amount: analytics.revenueByStream.tipsAndSuperchatsUsd, color: 'bg-pink-500', text: 'text-pink-400' }
  ];

  const totalRev = analytics.revenueByStream.totalGrossRevenueUsd || 1;

  return (
    <div id="omni-creator-analytics-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
              OMNI CREATOR ANALYTICS ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              REAL-TIME TELEMETRY
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Audience Reach, Retention & 9-Stream Revenue
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Track multi-format conversion funnels, second-by-second audience watch time retention, and algorithmic reach across global distribution nodes.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start lg:self-auto">
          {(['7d', '30d', '90d', 'all'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                timeRange === t ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Time' : `Last ${t.replace('d', ' Days')}`}
            </button>
          ))}
        </div>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Followers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Audience</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {analytics.totalFollowers.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +{analytics.followerGrowthRatePercent}% growth velocity
          </div>
        </div>

        {/* Monthly Reach */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Monthly Reach</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {analytics.monthlyReach.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {analytics.totalImpressions.toLocaleString()} total impressions
          </div>
        </div>

        {/* Watch Time */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Watch Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {analytics.totalWatchTimeHours.toLocaleString()} hrs
          </div>
          <div className="text-xs text-indigo-300 font-semibold">
            Avg Engagement: {analytics.averageEngagementRate}%
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Creator Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ${analytics.revenueByStream.totalGrossRevenueUsd.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400/90 font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> 9 Active Monetization Streams
          </div>
        </div>
      </div>

      {/* 9-Stream Revenue Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              9-Stream Creator Monetization Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Multi-source earnings consolidated into your sovereign OMNI Finance ledger with zero intermediary fee extortion.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Gross Settled Earnings</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">
              ${analytics.revenueByStream.totalGrossRevenueUsd.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Multi-color Progress bar */}
        <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex shadow-inner">
          {streamBreakdown.map((stream, idx) => {
            const pct = (stream.amount / totalRev) * 100;
            if (pct <= 0) return null;
            return (
              <div
                key={idx}
                style={{ width: `${pct}%` }}
                className={`${stream.color} transition-all duration-500`}
                title={`${stream.label}: $${stream.amount.toLocaleString()} (${pct.toFixed(1)}%)`}
              />
            );
          })}
        </div>

        {/* Stream List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {streamBreakdown.map((stream, idx) => {
            const pct = ((stream.amount / totalRev) * 100).toFixed(1);
            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${stream.color}`} />
                    <span className="text-xs font-bold text-white truncate">{stream.label}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{pct}% of total revenue</div>
                </div>
                <div className={`text-sm font-bold font-mono ${stream.text}`}>
                  ${stream.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audience Demographics & Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic & Age Demographics */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" />
            Top Global Audience Regions
          </h3>

          <div className="space-y-3">
            {analytics.audienceDemographics.topCountries.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{c.country}</span>
                  <span className="text-sky-400 font-bold font-mono">{c.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {analytics.audienceDemographics.ageDistribution.map((age, idx) => (
              <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">{age.ageGroup}</div>
                <div className="text-xs font-bold text-white mt-0.5">{age.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Retention Curve */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Audience Watch-Time Retention Curve
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Percentage of viewers remaining across the duration of your long-form video masterclasses.
            </p>
          </div>

          {/* Retention Visualizer */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-6 gap-2 items-end h-32 pt-4">
              {analytics.retentionCurve.map((pt, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {pt.retentionRate}%
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-emerald-600 to-indigo-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${pt.retentionRate}%` }}
                  />
                  <span className="text-[9px] text-slate-400 font-mono">
                    {pt.secondPercent}%
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span>0% (Video Start)</span>
              <span className="text-emerald-400 font-semibold">51% Completion Rate</span>
              <span>100% (End)</span>
            </div>
          </div>

          {/* Device Split */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <Smartphone className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Mobile</span>
              <span className="font-bold text-white">{analytics.audienceDemographics.deviceBreakdown.mobile}%</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <Monitor className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Desktop</span>
              <span className="font-bold text-white">{analytics.audienceDemographics.deviceBreakdown.desktop}%</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <Tablet className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Tablet</span>
              <span className="font-bold text-white">{analytics.audienceDemographics.deviceBreakdown.tablet}%</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <Tv className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <span className="text-[10px] text-slate-400 block">Smart TV</span>
              <span className="font-bold text-white">{analytics.audienceDemographics.deviceBreakdown.tv}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
