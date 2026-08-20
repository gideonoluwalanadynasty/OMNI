import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  Play,
  Video,
  FileText,
  Mic,
  Smartphone,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Wallet,
  Building,
  RefreshCw
} from 'lucide-react';
import { CreatorAdRevShareSlot } from '../../../types/omni_ads';
import { SEED_CREATOR_REV_SHARE_SLOTS } from '../../../data/omni_ads_seed';

interface Props {
  slots?: CreatorAdRevShareSlot[];
  onWithdrawToFinanceOs?: (amountUsd: number) => void;
}

export const OmniCreatorAdRevShareView: React.FC<Props> = ({
  slots = SEED_CREATOR_REV_SHARE_SLOTS,
  onWithdrawToFinanceOs
}) => {
  const [revSlots, setRevSlots] = useState<CreatorAdRevShareSlot[]>(slots);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const totalGrossRevenue = revSlots.reduce((acc, s) => acc + s.grossAdRevenueUsd, 0);
  const totalCreatorEarnings = revSlots.reduce((acc, s) => acc + s.creatorNetEarningsUsd, 0);
  const totalPlatformFees = revSlots.reduce((acc, s) => acc + s.omniPlatformFeeUsd, 0);
  const totalImpressions = revSlots.reduce((acc, s) => acc + s.adImpressionsServed, 0);

  const toggleMonetization = (id: string) => {
    setRevSlots(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, monetizationEnabled: !s.monetizationEnabled };
      }
      return s;
    }));
  };

  const handleInstantPayout = (id: string) => {
    setWithdrawingId(id);
    setTimeout(() => {
      setRevSlots(prev => prev.map(s => {
        if (s.id === id) {
          const updated: CreatorAdRevShareSlot = {
            ...s,
            payoutStatus: 'settled',
            omniFinanceTransactionRef: `TX-FIN-CREATOR-${Math.floor(100000 + Math.random() * 900000)}`,
            lastSettledAt: new Date().toISOString()
          };
          onWithdrawToFinanceOs?.(s.creatorNetEarningsUsd);
          return updated;
        }
        return s;
      }));
      setWithdrawingId(null);
    }, 800);
  };

  const getTypeIcon = (type: CreatorAdRevShareSlot['contentType']) => {
    switch (type) {
      case 'video': return Video;
      case 'podcast': return Mic;
      case 'article': return FileText;
      case 'moment': return Smartphone;
      default: return Play;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Flow Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <DollarSign className="w-4 h-4" />
              Creator Revenue Sharing Protocol
            </div>
            <h2 className="text-2xl font-black text-white">Eligible Content Ad Revenue Sharing</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Automatic transparent 70/30 split on all in-stream video ad breaks, overlay banners, and sponsored audio reels with real-time settlement into OMNI Finance OS.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Direct-to-Wallet Instant Settlement
            </div>
          </div>
        </div>

        {/* The 5-Step Flow Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-6 pt-5 border-t border-slate-800">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Step 1</div>
            <div className="text-xs font-black text-white mt-0.5">Advertiser Auction</div>
            <div className="text-[10px] text-slate-500 mt-0.5">High-CPM Bid Placed</div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Step 2</div>
            <div className="text-xs font-black text-white mt-0.5">Content Placement</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Video / Podcast Break</div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Step 3</div>
            <div className="text-xs font-black text-white mt-0.5">Revenue Calculation</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Impressions x CPM</div>
          </div>

          <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 text-center">
            <div className="text-[10px] font-bold text-emerald-400 uppercase">Step 4</div>
            <div className="text-xs font-black text-emerald-300 mt-0.5">70% Creator Share</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Industry-Leading Split</div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Step 5</div>
            <div className="text-xs font-black text-white mt-0.5">OMNI Finance Payout</div>
            <div className="text-[10px] text-slate-500 mt-0.5">1-Click Sovereign Vault</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Creator Net Earnings</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            ${totalCreatorEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">70% Net Creator Split</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Gross Ad Spend Served</div>
          <div className="text-2xl font-black text-white mt-1">
            ${totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Before Platform Fee</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Monetized Ad Impressions</div>
          <div className="text-2xl font-black text-indigo-300 mt-1">
            {totalImpressions.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Avg CPM: ${(totalGrossRevenue / (totalImpressions / 1000)).toFixed(2)}</div>
        </div>

        <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Platform Reserve (30%)</div>
          <div className="text-2xl font-black text-slate-300 mt-1">
            ${totalPlatformFees.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Infrastructure & Edge CDN</div>
        </div>
      </div>

      {/* Monetized Content Slots Table */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white">Monetized Content Slots & Ledger</h3>
            <p className="text-xs text-slate-400">Manage in-stream ad break permissions and execute immediate treasury disbursements.</p>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {revSlots.map(slot => {
            const Icon = getTypeIcon(slot.contentType);
            const isSettled = slot.payoutStatus === 'settled';

            return (
              <div key={slot.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white">{slot.contentTitle}</h4>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase rounded">
                        {slot.contentType}
                      </span>
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase rounded">
                        {slot.adBreakType.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 flex-wrap">
                      <span>Creator: <strong className="text-white">{slot.creatorName}</strong> (@{slot.creatorHandle})</span>
                      <span>Impressions: <strong className="text-indigo-300">{slot.adImpressionsServed.toLocaleString()}</strong></span>
                      <span>RevShare: <strong className="text-emerald-400">{slot.creatorRevSharePct}%</strong></span>
                    </div>

                    {slot.omniFinanceTransactionRef && (
                      <div className="text-[11px] text-slate-500 font-mono mt-1">
                        Settlement Ref: {slot.omniFinanceTransactionRef}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:text-right border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">Net Creator Earnings</div>
                    <div className="text-lg font-black text-emerald-400">
                      ${slot.creatorNetEarningsUsd.toFixed(2)} USD
                    </div>
                    <div className="text-[10px] text-slate-500">Gross: ${slot.grossAdRevenueUsd.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMonetization(slot.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                        slot.monetizationEnabled
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {slot.monetizationEnabled ? 'Monetization Active' : 'Monetization Off'}
                    </button>

                    {isSettled ? (
                      <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Settled in OMNI Finance
                      </div>
                    ) : (
                      <button
                        onClick={() => handleInstantPayout(slot.id)}
                        disabled={withdrawingId === slot.id}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors shadow flex items-center gap-1.5"
                      >
                        {withdrawingId === slot.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Settling...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-3.5 h-3.5" />
                            Disburse to Wallet
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
