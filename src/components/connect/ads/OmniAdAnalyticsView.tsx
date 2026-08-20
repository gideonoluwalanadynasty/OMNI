import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Target,
  Eye,
  MousePointer,
  Layers,
  Globe,
  PieChart,
  ShieldCheck,
  Calendar,
  Download,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { AdCampaign } from '../../../types/omni_ads';

interface Props {
  campaigns: AdCampaign[];
}

export const OmniAdAnalyticsView: React.FC<Props> = ({ campaigns }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const totalImpressions = campaigns.reduce((acc, c) => acc + c.metrics.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.metrics.clicks, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spentAmountUsd, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.metrics.conversions, 0);
  const totalConversionValue = campaigns.reduce((acc, c) => acc + c.metrics.conversionValueUsd, 0);
  const avgCtr = totalClicks / (totalImpressions || 1) * 100;
  const avgCpc = totalSpend / (totalClicks || 1);
  const avgCpm = totalSpend / (totalImpressions / 1000 || 1);
  const avgCpa = totalSpend / (totalConversions || 1);
  const avgRoas = totalConversionValue / (totalSpend || 1);
  const totalInvalidFiltered = campaigns.reduce((acc, c) => acc + c.metrics.invalidClicksFiltered, 0);

  // Placements Breakdown Data
  const placementBreakdowns = [
    { placement: 'Feed Native Ads', sharePct: 38, impressions: Math.round(totalImpressions * 0.38), spend: totalSpend * 0.32, roas: 4.8 },
    { placement: 'Video In-Stream Breaks', sharePct: 26, impressions: Math.round(totalImpressions * 0.26), spend: totalSpend * 0.34, roas: 5.6 },
    { placement: 'Moments Reels (9:16)', sharePct: 18, impressions: Math.round(totalImpressions * 0.18), spend: totalSpend * 0.16, roas: 4.2 },
    { placement: 'Sponsored Search', sharePct: 11, impressions: Math.round(totalImpressions * 0.11), spend: totalSpend * 0.12, roas: 7.4 },
    { placement: 'Publisher Web & App', sharePct: 7, impressions: Math.round(totalImpressions * 0.07), spend: totalSpend * 0.06, roas: 3.9 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            Executive Ad Analytics & Attribution
          </div>
          <h2 className="text-xl font-black text-white">Full-Funnel Advertising Performance</h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time telemetry measuring reach, spend efficiency, conversion attribution, and net ROAS.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['7d', '30d', '90d', 'all'] as const).map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors ${
                  timeRange === r ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Spend</div>
          <div className="text-xl font-black text-white mt-1">${totalSpend.toFixed(2)}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">CPM: ${avgCpm.toFixed(2)}</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Impressions</div>
          <div className="text-xl font-black text-white mt-1">{totalImpressions.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">99.8% Viewability</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Clicks & CTR</div>
          <div className="text-xl font-black text-indigo-300 mt-1">{totalClicks.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">CTR: {avgCtr.toFixed(2)}% (CPC: ${avgCpc.toFixed(2)})</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Conversions</div>
          <div className="text-xl font-black text-white mt-1">{totalConversions.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">CPA: ${avgCpa.toFixed(2)}</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Value</div>
          <div className="text-xl font-black text-emerald-400 mt-1">${totalConversionValue.toFixed(2)}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Sovereign Direct</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Blended ROAS</div>
          <div className="text-xl font-black text-emerald-400 mt-1">{avgRoas.toFixed(2)}x</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">+14% vs Benchmark</div>
        </div>
      </div>

      {/* Placements & Funnel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Placement Performance Table */}
        <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Performance by Ad Placement Channel
          </h3>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
            {placementBreakdowns.map((item, idx) => (
              <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{item.placement}</div>
                  <div className="text-slate-400">{item.sharePct}% of network inventory</div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-slate-400">Impressions</div>
                    <div className="text-white font-bold">{item.impressions.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Spend</div>
                    <div className="text-white font-bold">${item.spend.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">ROAS</div>
                    <div className="text-emerald-400 font-black text-sm">{item.roas}x</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Invalid Traffic Defense & Quality Score */}
        <div className="lg:col-span-4 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            IVT Traffic Quality Shield
          </div>

          <h3 className="text-base font-black text-white">Bot & Fraud Filtering Radar</h3>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Invalid Clicks Filtered</span>
              <span className="text-white font-bold">{totalInvalidFiltered} clicks</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ad Spend Saved</span>
              <span className="text-emerald-400 font-bold">${(totalInvalidFiltered * avgCpc).toFixed(2)} USD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Traffic Cleanliness Index</span>
              <span className="text-emerald-400 font-bold">99.4% Verified Humans</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            OMNI Ads uses multi-layer heuristic and behavioral fingerprinting to drop click farms and automated crawler requests before billing the advertiser.
          </p>
        </div>
      </div>
    </div>
  );
};
