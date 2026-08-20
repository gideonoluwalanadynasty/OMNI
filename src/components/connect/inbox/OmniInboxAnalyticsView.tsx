import React from 'react';
import {
  TrendingUp,
  Clock,
  Heart,
  DollarSign,
  Users,
  CheckCircle2,
  PieChart,
  BarChart3,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { UniversalInboxAnalytics, InboxTeamAgent } from '../../../types/omni_universal_inbox';

interface Props {
  analytics: UniversalInboxAnalytics;
  teamAgents: InboxTeamAgent[];
}

export const OmniInboxAnalyticsView: React.FC<Props> = ({
  analytics,
  teamAgents
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                COMMUNICATION & CONVERSION INTELLIGENCE
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Rolling 30-Day Metrics
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Omni-Channel Analytics & Performance</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-1">
              Analyze first response latency, conversation throughput, net sentiment, and pipeline revenue influenced directly through unified inbox interactions.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-right flex-shrink-0">
            <span className="text-[11px] text-slate-400 block font-medium">Sales Influenced From Chat</span>
            <div className="text-2xl font-black text-emerald-400">${(analytics.salesPipelineInfluencedUsd / 1000000).toFixed(2)}M</div>
            <span className="text-[10px] text-slate-500">{analytics.dealsClosedFromChatCount} Enterprise Deals Won</span>
          </div>
        </div>
      </div>

      {/* KPI Cards (4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Median First Response</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{analytics.medianFirstResponseTimeSec}s</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>45% faster than benchmark</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Customer CSAT Score</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-black text-pink-300">{analytics.csatScorePercent}%</div>
          <div className="text-xs text-slate-400">
            98.2% SLA Attainment Rate
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Total Conversations</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{analytics.totalConversations.toLocaleString()}</div>
          <div className="text-xs text-slate-400">
            {analytics.activeOpenConversations} currently active
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Median Resolution Time</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{analytics.medianResolutionTimeMin} min</div>
          <div className="text-xs text-slate-400">
            Single-session resolution rate: 89%
          </div>
        </div>
      </div>

      {/* Two Column Breakdown: Channel Volumes + Agent Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Channel Volume Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Conversation Volume by Channel</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Last 30 Days</span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.volumeByChannel.map(item => (
              <div key={item.channel} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span className="capitalize">{item.channel.replace('_', ' ')}</span>
                  <span className="font-mono text-white font-bold">{item.count.toLocaleString()} ({item.percent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Leaderboard & Capacity (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Team & Agent Performance</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">{teamAgents.length} Agents</span>
          </div>

          <div className="space-y-3 pt-2">
            {teamAgents.map(ag => (
              <div
                key={ag.id}
                className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ag.avatarUrl}
                    alt={ag.displayName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="font-extrabold text-white">{ag.displayName}</h4>
                    <p className="text-[11px] text-slate-400">{ag.team} • {ag.role.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-amber-300">{ag.csatRating}% CSAT</div>
                  <span className="text-[10px] text-slate-500">
                    {ag.activeConversationsCount}/{ag.maxCapacity} load • {ag.avgResponseTimeMin}m avg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
