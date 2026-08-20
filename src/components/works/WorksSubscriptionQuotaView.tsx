import React, { useState } from 'react';
import { 
  CreditCard, Check, Zap, Sparkles, Database, Users, Shield, 
  ArrowRight, ShieldCheck, Clock, Layers, ArrowUpRight
} from 'lucide-react';
import { WorksTenantTier, WorksSubscriptionTierInfo, WorksWorkspace } from '../../types/works';
import { SEED_WORKS_SUBSCRIPTION_TIERS } from '../../data/omni_works_seed';

interface WorksSubscriptionQuotaViewProps {
  currentWorkspace: WorksWorkspace;
  onUpgradeTier?: (tier: WorksTenantTier) => void;
}

export const WorksSubscriptionQuotaView: React.FC<WorksSubscriptionQuotaViewProps> = ({
  currentWorkspace,
  onUpgradeTier
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTier, setSelectedTier] = useState<WorksTenantTier>(currentWorkspace.tier);
  const [upgrading, setUpgrading] = useState(false);

  const tiers: WorksSubscriptionTierInfo[] = SEED_WORKS_SUBSCRIPTION_TIERS;

  // Live Quota calculations
  const storageUsedGb = (currentWorkspace.storageUsedBytes / (1024 * 1024 * 1024)).toFixed(1);
  const storageLimitGb = (currentWorkspace.storageLimitBytes / (1024 * 1024 * 1024)).toFixed(0);
  const storagePercent = Math.min(100, Math.round((currentWorkspace.storageUsedBytes / currentWorkspace.storageLimitBytes) * 100));

  const aiPercent = Math.min(100, Math.round((currentWorkspace.aiCreditsUsed / currentWorkspace.aiCreditsMonthlyLimit) * 100));
  const automationsPercent = Math.min(100, Math.round((currentWorkspace.automationsRunThisMonth / currentWorkspace.automationsMonthlyLimit) * 100));

  const handleSelectTier = (t: WorksTenantTier) => {
    setSelectedTier(t);
    setUpgrading(true);
    setTimeout(() => {
      onUpgradeTier?.(t);
      setUpgrading(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Current Quota Overview */}
      <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <CreditCard className="w-4 h-4" />
              <span>Sovereign Resource Quotas &amp; Tier Allocation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-white tracking-tight">Active Plan: {currentWorkspace.tier.replace('_', ' ').toUpperCase()}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Workspace: {currentWorkspace.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">20% OFF</span>
            </button>
          </div>
        </div>

        {/* Live Resource Gauges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t border-neutral-800/80">
          
          {/* Storage Gauge */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Cloud Storage</span>
              <span className="font-mono text-white font-bold">{storagePercent}%</span>
            </div>
            <div className="text-lg font-bold text-white font-mono">{storageUsedGb} / {storageLimitGb} GB</div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${storagePercent}%` }}></div>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1.5 font-mono">NVMe Multi-Region S3 Storage</div>
          </div>

          {/* AI Tokens Gauge */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">AI Copilot Tokens</span>
              <span className="font-mono text-cyan-400 font-bold">{aiPercent}%</span>
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {(currentWorkspace.aiCreditsUsed / 1000).toFixed(0)}k / {(currentWorkspace.aiCreditsMonthlyLimit / 1000).toFixed(0)}k
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${aiPercent}%` }}></div>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1.5 font-mono">RAG + Agent Task Executions</div>
          </div>

          {/* Automations Gauge */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Workflow Pipelines</span>
              <span className="font-mono text-amber-400 font-bold">{automationsPercent}%</span>
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {currentWorkspace.automationsRunThisMonth} / {currentWorkspace.automationsMonthlyLimit}
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${automationsPercent}%` }}></div>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1.5 font-mono">Low-Code Event Triggers / mo</div>
          </div>

          {/* Member Seats */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800">
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Active Collaborators</span>
              <span className="font-mono text-emerald-400 font-bold">Uncapped</span>
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {currentWorkspace.activeMembersCount} Members
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '42%' }}></div>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1.5 font-mono">+ Unlimited Client Guests</div>
          </div>

        </div>
      </div>

      {/* Subscription Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const isCurrent = currentWorkspace.tier === tier.tier;
          const price = billingCycle === 'monthly' ? tier.monthlyPriceUsd : Math.round(tier.annualPriceUsd / 12);

          return (
            <div
              key={tier.tier}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/40'
                  : tier.isPopular
                  ? 'bg-neutral-900/80 border-indigo-500/40 hover:border-indigo-400'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:bg-neutral-900/80 hover:border-neutral-700'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-white tracking-tight">{tier.name}</h3>
                    {tier.isPopular && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black text-white font-mono">${price}</span>
                    <span className="text-xs text-neutral-400">/ user / mo</span>
                  </div>
                  {billingCycle === 'annual' && tier.annualPriceUsd > 0 && (
                    <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                      Billed annually (${tier.annualPriceUsd}/yr)
                    </div>
                  )}
                </div>

                {/* Specs overview */}
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Max Seats:</span>
                    <span>{tier.maxMembers === -1 ? 'Unlimited' : tier.maxMembers}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Storage:</span>
                    <span>{tier.maxStorageGb} GB</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">AI Tokens:</span>
                    <span>{(tier.maxAiTokensMonthly / 1000).toFixed(0)}k/mo</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">SLA:</span>
                    <span className="text-emerald-400">{tier.slaUptime}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Included Features</div>
                  <div className="space-y-1.5">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-5 border-t border-neutral-800">
                <button
                  onClick={() => handleSelectTier(tier.tier)}
                  disabled={isCurrent || upgrading}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? 'bg-neutral-800 text-neutral-400 cursor-default'
                      : tier.tier === 'enterprise_sovereign'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  }`}
                >
                  {isCurrent ? (
                    <span>Current Active Tier</span>
                  ) : (
                    <>
                      <span>{upgrading ? 'Upgrading...' : `Switch to ${tier.name}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
