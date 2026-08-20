import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  MessageSquare,
  DollarSign,
  Flame,
  Clock,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';
import { OmniCommunityAnalytics } from '../../../types/omni_spaces';
import { SEED_COMMUNITY_ANALYTICS } from '../../../data/omni_spaces_seed';

interface Props {
  analytics?: OmniCommunityAnalytics;
}

export const OmniCommunityAnalyticsView: React.FC<Props> = ({
  analytics = SEED_COMMUNITY_ANALYTICS
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  return (
    <div id="omni-community-analytics" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              COMMUNITY ANALYTICS ENGINE
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LEDGER AUDITED
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Members, Growth, Engagement & Monetization Performance
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Real-time analytics measuring Active Members, Post Volume, Engagement Velocity, 30-Day/90-Day Retention Cohorts, and OMNI Finance gross revenue.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {(['7d', '30d', '90d', '1y'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors ${
                timeRange === range
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              Total Space Members
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{analytics.growthRatePercent}%/mo
            </span>
          </div>
          <div className="text-2xl font-black text-white">{analytics.totalMembers.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">
            {analytics.activeDau.toLocaleString()} DAU • {analytics.activeMau.toLocaleString()} MAU
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Engagement Rate
            </span>
            <span className="text-emerald-400 font-bold">Top 5% Ecosystem</span>
          </div>
          <div className="text-2xl font-black text-amber-400">{analytics.engagementRatePercent}%</div>
          <div className="text-[11px] text-slate-500">
            {analytics.chatMessagesSentThisMonth.toLocaleString()} chat messages • {analytics.postsPublishedThisMonth.toLocaleString()} posts
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Total Revenue Settled
            </span>
            <span className="text-emerald-400 font-bold">OMNI Finance</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">${analytics.totalRevenueUsd.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">
            MRR: ${analytics.mrrUsd.toLocaleString()} • Subscriptions & Storefront
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              Community Posts & Threads
            </span>
            <span className="text-blue-400 font-bold">+18.4%</span>
          </div>
          <div className="text-2xl font-black text-white">{analytics.postsPublishedThisMonth.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">Across Spaces, Groups, and Channel Broadcasts</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              Retention Rate (30d / 90d)
            </span>
            <span className="text-purple-400 font-bold">High Loyalty</span>
          </div>
          <div className="text-2xl font-black text-purple-300">
            {analytics.retentionCohort30d}% <span className="text-sm text-slate-400">/ {analytics.retentionCohort90d}%</span>
          </div>
          <div className="text-[11px] text-slate-500">Cohort retention measured over rolling cycles</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-400" />
              AI Assistant Invocations
            </span>
            <span className="text-emerald-400 font-bold">99.4% Accuracy</span>
          </div>
          <div className="text-2xl font-black text-white">41,200</div>
          <div className="text-[11px] text-slate-500">Space Q&A, thread summarization & 100+ translation queries</div>
        </div>
      </div>

      {/* Visual Chart: Growth & Engagement Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Monthly Active Engagement & Membership Velocity</h3>
            <p className="text-xs text-slate-400">Comparing active member participation against total sovereign node growth.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <span className="w-3 h-3 bg-indigo-500 rounded-sm" />
              Active DAU
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-3 h-3 bg-emerald-500 rounded-sm" />
              New Members
            </span>
          </div>
        </div>

        {/* CSS/SVG Bar Visualization */}
        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
          {[
            { month: 'Jan', dau: 12000, newM: 3200 },
            { month: 'Feb', dau: 14500, newM: 4100 },
            { month: 'Mar', dau: 16800, newM: 4800 },
            { month: 'Apr', dau: 19400, newM: 5200 },
            { month: 'May', dau: 22100, newM: 6100 },
            { month: 'Jun', dau: 26500, newM: 7400 },
            { month: 'Jul', dau: 31200, newM: 8900 },
            { month: 'Aug', dau: 38400, newM: 10400 }
          ].map((bar, idx) => {
            const dauHeight = (bar.dau / 40000) * 100;
            const newMHeight = (bar.newM / 12000) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end justify-center gap-1 h-36">
                  <div
                    className="w-1/2 bg-indigo-500/80 hover:bg-indigo-400 rounded-t-lg transition-all"
                    style={{ height: `${dauHeight}%` }}
                    title={`DAU: ${bar.dau.toLocaleString()}`}
                  />
                  <div
                    className="w-1/2 bg-emerald-500/80 hover:bg-emerald-400 rounded-t-lg transition-all"
                    style={{ height: `${newMHeight}%` }}
                    title={`New: ${bar.newM.toLocaleString()}`}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{bar.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
