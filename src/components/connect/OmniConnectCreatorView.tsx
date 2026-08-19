import React from 'react';
import {
  Sparkles,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  CreditCard,
  ArrowUpRight,
  Eye,
  Heart,
  Share2
} from 'lucide-react';
import { CreatorStudioStats, ConnectProfile } from '../../types/omni_connect';

interface Props {
  stats: CreatorStudioStats;
  activeProfile: ConnectProfile;
}

export const OmniConnectCreatorView: React.FC<Props> = ({ stats, activeProfile }) => {
  return (
    <div id="omni-connect-creator-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                DIRECT LEDGER PAYOUTS
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              Creator Studio & Monetization Hub
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Monetize content directly through paid subscriber tiers, micro-tipping jars, paywalled premium releases, and verified brand sponsorships with zero intermediary rake.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[130px]">
              <div className="text-xl font-bold text-emerald-400">${stats.totalEarningsUsd.toLocaleString()}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Total Revenue</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[120px]">
              <div className="text-xl font-bold text-indigo-400">${stats.monthlyRecurringRevenueUsd.toLocaleString()}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Monthly MRR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Total Audience</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalFollowers.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% this month
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Monthly Reach</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.monthlyReach.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +28.5% impressions
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Active Paid Patrons</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.subscribersCount}</div>
          <div className="text-[11px] text-indigo-300 font-semibold">
            Across 3 recurring tiers
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Tip Jar Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">${stats.tipJarEarningsUsd.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">
            Instant wallet deposits
          </div>
        </div>
      </div>

      {/* Top Content & Subscribers Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Monetized Posts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Top Monetized Releases
          </h3>

          <div className="space-y-3">
            {stats.topPosts.map(p => (
              <div key={p.id} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {p.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {p.likes}</span>
                    <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {p.shares}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Earned</div>
                  <div className="text-sm font-bold text-emerald-400">${p.revenueUsd.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Paid Subscribers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            Recent Member Subscriptions
          </h3>

          <div className="space-y-3">
            {stats.recentSubscribers.map((sub, i) => (
              <div key={i} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{sub.subscriberName}</h4>
                  <p className="text-[11px] text-indigo-300">{sub.tierName}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">+${sub.amountUsd.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-500">{new Date(sub.subscribedAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
