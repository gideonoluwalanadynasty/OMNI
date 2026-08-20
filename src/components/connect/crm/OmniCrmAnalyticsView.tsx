import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Clock,
  ArrowUpRight,
  PieChart as PieIcon,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { CrmExecutiveAnalytics, CrmDeal, Customer360Profile } from '../../../types/omni_crm';

interface Props {
  analytics: CrmExecutiveAnalytics;
  deals: CrmDeal[];
  profiles: Customer360Profile[];
}

export const OmniCrmAnalyticsView: React.FC<Props> = ({
  analytics,
  deals,
  profiles
}) => {
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | '12m'>('30d');

  return (
    <div id="omni-crm-analytics-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                EXECUTIVE CRM INTELLIGENCE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Commercial Analytics, Conversion Funnel & Sales Velocity
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              End-to-end commercial performance across omni-channel acquisition, pipeline conversion velocity, sales representative leaderboard, and cohort retention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['30d', '90d', '12m'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    timeframe === tf ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf === '30d' ? 'Last 30 Days' : tf === '90d' ? 'Last Quarter' : 'Year to Date'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 4 KPI Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Pipeline Value</span>
            <div className="text-2xl font-black text-white mt-1 font-mono">
              ${analytics.pipelineSummary.totalPipelineValueUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +24.8% vs previous month
            </span>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Closed Won Revenue</span>
            <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
              ${analytics.pipelineSummary.wonDealsValueUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">
              {analytics.pipelineSummary.wonDealsCount} Closed Contracts
            </span>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Win Rate</span>
            <div className="text-2xl font-black text-indigo-400 mt-1 font-mono">
              {analytics.pipelineSummary.winRatePct}%
            </div>
            <span className="text-[10px] text-indigo-300">Target Benchmark: 75%</span>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Avg Sales Cycle</span>
            <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
              {analytics.pipelineSummary.averageSalesCycleDays} Days
            </div>
            <span className="text-[10px] text-slate-400">From Lead to Settlement</span>
          </div>
        </div>
      </div>

      {/* Funnel & Channels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Conversion Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Multi-Stage Sales Funnel
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Active Ingestion</span>
          </div>

          <div className="space-y-2.5">
            {[
              { stage: '1. Ingested Leads', count: 184, dropoff: '100%', color: 'bg-sky-500' },
              { stage: '2. Contacted & Engaged', count: 142, dropoff: '77.1%', color: 'bg-indigo-500' },
              { stage: '3. Qualified Opportunities', count: 98, dropoff: '53.2%', color: 'bg-purple-500' },
              { stage: '4. Enterprise Proposals Delivered', count: 54, dropoff: '29.3%', color: 'bg-amber-500' },
              { stage: '5. Contract Negotiations', count: 32, dropoff: '17.3%', color: 'bg-cyan-500' },
              { stage: '6. Closed Won & Settled', count: 28, dropoff: '15.2%', color: 'bg-emerald-500' }
            ].map(f => (
              <div key={f.stage} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{f.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400">{f.count} Accounts</span>
                    <span className="font-mono font-bold text-indigo-400">{f.dropoff}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${f.color} h-full rounded-full`}
                    style={{ width: f.dropoff }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources Distribution (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Lead Generation by Channel
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">184 Total Ingested</span>
          </div>

          <div className="space-y-3">
            {analytics.leadsBySource.map(src => (
              <div
                key={src.source}
                className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white capitalize">{src.source.replace(/_/g, ' ')}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-300">{src.count} Leads</span>
                    <span className="text-emerald-400 font-bold">{src.conversionRatePct}% Conv</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(src.count / 184) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Team Rep Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Enterprise Sales Team Performance & SLA Compliance
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Real-time Leaderboard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="pb-3 font-bold">Sales Representative</th>
                <th className="pb-3 font-bold">Deals Closed</th>
                <th className="pb-3 font-bold">Revenue Settled</th>
                <th className="pb-3 font-bold">Avg Response Time</th>
                <th className="pb-3 font-bold">SLA Adherence</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {analytics.repPerformance.map(rep => (
                <tr key={rep.repId} className="hover:bg-slate-950/40 transition">
                  <td className="py-3 flex items-center gap-2.5">
                    <img
                      src={rep.repAvatar}
                      alt={rep.repName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <span className="font-bold text-white">{rep.repName}</span>
                  </td>
                  <td className="py-3 font-mono text-slate-200">{rep.dealsClosedCount}</td>
                  <td className="py-3 font-mono font-bold text-emerald-400">${rep.revenueGeneratedUsd.toLocaleString()}</td>
                  <td className="py-3 font-mono text-slate-300">{rep.avgResponseTimeMinutes} mins</td>
                  <td className="py-3 font-mono font-bold text-indigo-400">{rep.slaAdherencePct}%</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[9px] font-bold rounded-full border border-emerald-500/20">
                      TOP PERFORMER
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
