import React, { useState } from 'react';
import { 
  OmniAiPlanConfig, 
  OmniAiPlanTier, 
  OmniUsageUnitRate, 
  OmniUsageDimension, 
  OmniUsageConsumptionLog, 
  OmniAiBudgetStructure 
} from '../../../types';
import { 
  SEED_OMNI_AI_PLANS, 
  SEED_USAGE_DIMENSION_RATES, 
  SEED_USAGE_CONSUMPTION_LOGS, 
  SEED_AI_BUDGET_STRUCTURE 
} from '../../../monetisation_store_data';
import { 
  CreditCard, 
  Layers, 
  Zap, 
  Shield, 
  Check, 
  Sliders, 
  TrendingUp, 
  Calculator, 
  DollarSign, 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  Settings, 
  ChevronRight, 
  Cpu, 
  Sparkles, 
  PieChart, 
  Bell, 
  Database, 
  Lock, 
  SlidersHorizontal,
  CheckCircle2,
  HelpCircle,
  Plus
} from 'lucide-react';

interface OmniPlansCreditsHubProps {
  triggerToast?: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export function OmniPlansCreditsHub({ triggerToast }: OmniPlansCreditsHubProps) {
  // State
  const [plans, setPlans] = useState<OmniAiPlanConfig[]>(SEED_OMNI_AI_PLANS);
  const [currentPlanTier, setCurrentPlanTier] = useState<OmniAiPlanTier>('business');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeTab, setActiveTab] = useState<'plans' | 'credits_engine' | 'budgets' | 'logs' | 'admin_config'>('plans');

  // Usage rates & logs
  const [usageRates, setUsageRates] = useState<OmniUsageUnitRate[]>(SEED_USAGE_DIMENSION_RATES);
  const [consumptionLogs, setConsumptionLogs] = useState<OmniUsageConsumptionLog[]>(SEED_USAGE_CONSUMPTION_LOGS);
  const [budgetStructure, setBudgetStructure] = useState<OmniAiBudgetStructure>(SEED_AI_BUDGET_STRUCTURE);

  // Simulator state
  const [simDimension, setSimDimension] = useState<OmniUsageDimension>('deep_research');
  const [simQuantity, setSimQuantity] = useState<number>(5);

  // Admin Plan Configurator selected plan
  const [editingPlanTier, setEditingPlanTier] = useState<OmniAiPlanTier>('pro');

  // Calculate live simulator values
  const activeRate = usageRates.find(r => r.dimension === simDimension) || usageRates[0];
  const simRawCost = activeRate.baseProviderCostUsd * simQuantity;
  const simInfraCost = activeRate.infraCostUsd * simQuantity;
  const simMargin = (simRawCost + simInfraCost) * (activeRate.configuredMarginPercent / 100);
  const simTotalBillableUsd = simRawCost + simInfraCost + simMargin;
  const simCreditsDeducted = Math.ceil(activeRate.creditsPerUnit * simQuantity);

  // Handle plan selection / upgrade
  const handleSelectPlan = (tier: OmniAiPlanTier) => {
    setCurrentPlanTier(tier);
    const plan = plans.find(p => p.tier === tier);
    if (triggerToast) {
      triggerToast(
        'Subscription Updated',
        `Tenant switched to ${plan?.name}. Plan limits and sovereign permissions updated immediately.`,
        'success'
      );
    }
  };

  // Handle simulated execution & ledger write
  const handleExecuteSimulatedUsage = () => {
    const newLog: OmniUsageConsumptionLog = {
      id: `use_log_${Date.now().toString().slice(-4)}`,
      tenantId: 'tenant_dynasty_99',
      organizationId: 'org_dynasty',
      userId: 'usr_gideon',
      userEmail: 'gideonoluwalanadynasty@gmail.com',
      dimension: simDimension,
      quantity: simQuantity,
      rawProviderCostUsd: simRawCost,
      infraCostUsd: simInfraCost,
      marginUsd: simMargin,
      totalBillableUsd: simTotalBillableUsd,
      creditsDeducted: simCreditsDeducted,
      doubleEntryLedgerRefId: `tx_de_${Date.now().toString().slice(-4)}`,
      metadata: { simulated: true, rateName: activeRate.name },
      timestamp: new Date().toISOString()
    };

    setConsumptionLogs(prev => [newLog, ...prev]);
    setBudgetStructure(prev => ({
      ...prev,
      currentSpentUsd: prev.currentSpentUsd + simTotalBillableUsd,
      currentSpentCredits: prev.currentSpentCredits + simCreditsDeducted,
      todaySpentUsd: prev.todaySpentUsd + simTotalBillableUsd
    }));

    if (triggerToast) {
      triggerToast(
        'Usage Metered & Debited',
        `Debited ${simCreditsDeducted} OCU ($${simTotalBillableUsd.toFixed(4)}) for ${simQuantity}x ${activeRate.name}. Double-entry ledger ref: ${newLog.doubleEntryLedgerRefId}.`,
        'success'
      );
    }
  };

  return (
    <div id="omni_plans_credits_hub" className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. HEADER & NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Commercial Core & Metering
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> OMNI Compute Units (OCU)
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Plans, Usage Credits & Financial Budgets
            </h1>
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Manage multi-tenant subscription tiers, internal usage-unit abstractions (OCU), real-time double-entry settlement logs, and multi-tier spend caps.
            </p>
          </div>

          {/* QUICK CREDITS BADGE */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-600 text-white">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block">Current Plan / Balance</span>
              <div className="flex items-center gap-2">
                <strong className="text-sm font-black text-neutral-900 dark:text-white">Business Team</strong>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {(budgetStructure.monthlyBudgetCredits - budgetStructure.currentSpentCredits).toLocaleString()} OCU
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SUB-TABS */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-4 h-4" /> Subscription Plans (6 Tiers)
          </button>

          <button
            onClick={() => setActiveTab('credits_engine')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'credits_engine'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Zap className="w-4 h-4" /> Usage Dimensions & Calculator (11 Metrics)
          </button>

          <button
            onClick={() => setActiveTab('budgets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'budgets'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <PieChart className="w-4 h-4" /> Budgets & Hard-Stop Caps
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <FileText className="w-4 h-4" /> Consumption Logs ({consumptionLogs.length})
          </button>

          <button
            onClick={() => setActiveTab('admin_config')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'admin_config'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Sliders className="w-4 h-4" /> Admin Plan Configurator
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PLANS COMPARISON VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* BILLING CYCLE TOGGLE */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
              Monthly Invoicing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 p-1 relative transition-colors cursor-pointer"
            >
              <div className={`w-4 h-4 rounded-full bg-indigo-600 transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : ''}`} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${billingCycle === 'annual' ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
                Annual Pre-Commitment
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
                SAVE 20%
              </span>
            </div>
          </div>

          {/* 6-TIER PLANS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => {
              const isCurrent = plan.tier === currentPlanTier;
              const price = billingCycle === 'annual' ? plan.basePriceAnnualMonthlyUsd : plan.basePriceMonthlyUsd;

              return (
                <div
                  key={plan.id}
                  className={`bg-white dark:bg-neutral-900 border rounded-3xl p-6 lg:p-7 flex flex-col justify-between space-y-6 transition-all relative ${
                    isCurrent
                      ? 'border-indigo-600 shadow-xl ring-2 ring-indigo-500/20'
                      : plan.isPopular
                      ? 'border-indigo-300 dark:border-indigo-800 shadow-md'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-black uppercase ${
                        isCurrent
                          ? 'bg-indigo-600 text-white'
                          : plan.isPopular
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      }`}>
                        {isCurrent ? 'Current Tenant Plan' : plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">{plan.name}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 min-h-[32px]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-3xl font-black font-mono text-neutral-900 dark:text-white">
                        {plan.isCustomPricing ? 'Custom' : `$${price}`}
                      </span>
                      {!plan.isCustomPricing && (
                        <span className="text-xs text-neutral-400">/ seat / month</span>
                      )}
                    </div>

                    {/* FEATURE & LIMIT BREAKDOWN */}
                    <div className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Monthly Tokens:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{(plan.limits.monthlyTokens / 1000000).toFixed(1)}M</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Daily Requests:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{plan.limits.requestsPerDay.toLocaleString()}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Autonomous Agents:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{plan.allowedAgentCount}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Deep Research Passes:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{plan.deepResearchQueriesPerMonth} / mo</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Vector Knowledge Storage:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{plan.storageGb} GB</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Team Seats Included:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{plan.teamSeatsIncluded} (Up to {plan.maxSeats})</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">White-Label AI Portal:</span>
                        <span className={plan.whiteLabelEligible ? 'text-emerald-600 font-bold' : 'text-neutral-400'}>
                          {plan.whiteLabelEligible ? 'Included' : 'Not Included'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">BYOK / BYOM Private Node:</span>
                        <span className={plan.byokEligible ? 'text-emerald-600 font-bold' : 'text-neutral-400'}>
                          {plan.byokEligible ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">SLA Guarantee:</span>
                        <strong className="text-neutral-900 dark:text-white font-mono">{plan.slaGuaranteePercent}%</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isCurrent}
                    onClick={() => handleSelectPlan(plan.tier)}
                    className={`w-full py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-default'
                        : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 shadow-xs'
                    }`}
                  >
                    {isCurrent ? 'Active Plan' : `Switch to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. USAGE UNITS ENGINE & REAL-TIME CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'credits_engine' && (
        <div className="space-y-6">
          {/* USAGE UNIT ABSTRACTION NOTICE */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <strong className="font-extrabold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-600" /> Usage-Unit Abstraction Specification
            </strong>
            <p>
              OMNI Compute Units (OCU) represent prepaid internal platform consumption units and must never be represented as regulated fiat currency. All consumption is metered across 11 discrete hardware and model dimensions, factoring actual raw provider cost, cluster infrastructure overhead, and the configured enterprise platform margin.
            </p>
          </div>

          {/* INTERACTIVE SIMULATOR & CALCULATOR */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-500" /> Live Unit Consumption & Ledger Cost Simulator
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Simulate any multi-modal AI task to inspect provider cost, infra overhead, platform margin, and billable OCU credits.
                </p>
              </div>

              <button
                onClick={handleExecuteSimulatedUsage}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Simulate & Write Ledger Leg
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Target Metered Dimension</label>
                  <select
                    value={simDimension}
                    onChange={(e) => setSimDimension(e.target.value as any)}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-bold"
                  >
                    {usageRates.map(r => (
                      <option key={r.dimension} value={r.dimension}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Quantity ({activeRate.unitLabel})</label>
                  <input
                    type="number"
                    min={1}
                    value={simQuantity}
                    onChange={(e) => setSimQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono text-base font-bold"
                  />
                </div>

                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-neutral-500 text-[11px]">
                  {activeRate.description}
                </div>
              </div>

              {/* CALCULATION FORMULA BREAKDOWN */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-4">
                <span className="text-xs font-extrabold text-neutral-900 dark:text-white block">
                  Double-Entry Ledger Settlement Breakdown
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Raw Provider Cost</span>
                    <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">${simRawCost.toFixed(5)}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Infra Reserve</span>
                    <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">${simInfraCost.toFixed(5)}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Margin ({activeRate.configuredMarginPercent}%)</span>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">${simMargin.toFixed(5)}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-mono font-bold block">Billable OCU Units</span>
                    <span className="text-base font-black font-mono text-indigo-700 dark:text-indigo-300">{simCreditsDeducted} OCU</span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs flex items-center justify-between">
                  <span className="font-mono text-neutral-600 dark:text-neutral-400">Total Billed to Tenant Wallet:</span>
                  <strong className="font-mono text-sm text-neutral-900 dark:text-white">${simTotalBillableUsd.toFixed(5)} USD</strong>
                </div>
              </div>
            </div>
          </div>

          {/* ALL 11 DIMENSIONS RATES TABLE */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">All 11 Platform Metered Dimensions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono text-[10px] uppercase">
                    <th className="pb-3 font-bold">Dimension</th>
                    <th className="pb-3 font-bold">Unit Metric</th>
                    <th className="pb-3 font-bold">Raw Provider Cost</th>
                    <th className="pb-3 font-bold">Infra Overhead</th>
                    <th className="pb-3 font-bold">Configured Margin</th>
                    <th className="pb-3 font-bold">OCU Credits</th>
                    <th className="pb-3 font-bold text-right">Billable Rate (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono">
                  {usageRates.map(r => (
                    <tr key={r.dimension} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                      <td className="py-3 font-sans font-extrabold text-neutral-900 dark:text-white">{r.name}</td>
                      <td className="py-3 text-neutral-500">{r.unitLabel}</td>
                      <td className="py-3 text-neutral-600 dark:text-neutral-400">${r.baseProviderCostUsd.toFixed(4)}</td>
                      <td className="py-3 text-neutral-600 dark:text-neutral-400">${r.infraCostUsd.toFixed(4)}</td>
                      <td className="py-3 text-emerald-600 dark:text-emerald-400">{r.configuredMarginPercent}%</td>
                      <td className="py-3 font-black text-indigo-600 dark:text-indigo-400">{r.creditsPerUnit} OCU</td>
                      <td className="py-3 font-black text-neutral-900 dark:text-white text-right">${r.billableUsdPerUnit.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. BUDGETS & HARD-STOP CAPS VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MONTHLY BUDGET GAUGE */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Monthly Org Budget</h4>
                <span className="text-xs font-mono font-bold text-neutral-400">${budgetStructure.monthlyBudgetUsd.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (budgetStructure.currentSpentUsd / budgetStructure.monthlyBudgetUsd) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>Spent: ${budgetStructure.currentSpentUsd.toFixed(2)}</span>
                  <span>{((budgetStructure.currentSpentUsd / budgetStructure.monthlyBudgetUsd) * 100).toFixed(1)}% Used</span>
                </div>
              </div>
            </div>

            {/* DAILY CAP GAUGE */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Daily Velocity Cap</h4>
                <span className="text-xs font-mono font-bold text-neutral-400">${budgetStructure.dailyCapUsd.toFixed(2)} / day</span>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (budgetStructure.todaySpentUsd / budgetStructure.dailyCapUsd) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>Today: ${budgetStructure.todaySpentUsd.toFixed(2)}</span>
                  <span>{((budgetStructure.todaySpentUsd / budgetStructure.dailyCapUsd) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* ENFORCEMENT MODE TOGGLE */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Enforcement Policy</h4>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => {
                    setBudgetStructure(prev => ({ ...prev, enforcementMode: 'hard_stop' }));
                    if (triggerToast) triggerToast('Policy Updated', 'Hard Stop enforcement active. Non-essential inference blocks at 100%.', 'info');
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                    budgetStructure.enforcementMode === 'hard_stop'
                      ? 'border-red-500 bg-red-50/40 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-500'
                  }`}
                >
                  <span>Hard Stop (Block Requests)</span>
                  {budgetStructure.enforcementMode === 'hard_stop' && <Check className="w-4 h-4 text-red-500" />}
                </button>

                <button
                  onClick={() => {
                    setBudgetStructure(prev => ({ ...prev, enforcementMode: 'soft_alert' }));
                    if (triggerToast) triggerToast('Policy Updated', 'Soft Alert mode active. Emails dispatched without pausing compute.', 'info');
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                    budgetStructure.enforcementMode === 'soft_alert'
                      ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-500'
                  }`}
                >
                  <span>Soft Alert (Email & Webhook Only)</span>
                  {budgetStructure.enforcementMode === 'soft_alert' && <Check className="w-4 h-4 text-indigo-500" />}
                </button>
              </div>
            </div>
          </div>

          {/* PROJECT & AGENT SUB-BUDGETS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Project-Level Budget Allocation</h4>
              <div className="space-y-3">
                {budgetStructure.projectBudgets.map(pb => (
                  <div key={pb.projectId} className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">{pb.projectName}</span>
                      <span className="font-mono text-neutral-500">${pb.currentSpentUsd.toFixed(2)} / ${pb.monthlyCapUsd.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full"
                        style={{ width: `${(pb.currentSpentUsd / pb.monthlyCapUsd) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Agent-Level Spend Caps</h4>
              <div className="space-y-3">
                {budgetStructure.agentBudgets.map(ab => (
                  <div key={ab.agentId} className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">{ab.agentName}</span>
                      <span className="font-mono text-neutral-500">${ab.currentSpentUsd.toFixed(2)} / ${ab.monthlyCapUsd.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${(ab.currentSpentUsd / ab.monthlyCapUsd) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CONSUMPTION LOGS VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">Real-Time Core Billing Audit Trail</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Every AI task writes an immutable double-entry ledger settlement record.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">{consumptionLogs.length} Events Logged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono text-[10px] uppercase">
                  <th className="pb-3 font-bold">Timestamp</th>
                  <th className="pb-3 font-bold">User</th>
                  <th className="pb-3 font-bold">Dimension</th>
                  <th className="pb-3 font-bold">Quantity</th>
                  <th className="pb-3 font-bold">Raw Cost</th>
                  <th className="pb-3 font-bold">Infra</th>
                  <th className="pb-3 font-bold">Margin</th>
                  <th className="pb-3 font-bold">Total USD</th>
                  <th className="pb-3 font-bold text-right">Ledger Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono text-[11px]">
                {consumptionLogs.map(log => (
                  <tr key={log.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                    <td className="py-3 text-neutral-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="py-3 text-neutral-800 dark:text-neutral-200 font-sans font-bold">{log.userEmail.split('@')[0]}</td>
                    <td className="py-3 text-indigo-600 dark:text-indigo-400 font-sans font-bold">{log.dimension.replace('_', ' ')}</td>
                    <td className="py-3 text-neutral-500">{log.quantity}</td>
                    <td className="py-3 text-neutral-600 dark:text-neutral-400">${log.rawProviderCostUsd.toFixed(4)}</td>
                    <td className="py-3 text-neutral-600 dark:text-neutral-400">${log.infraCostUsd.toFixed(4)}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">${log.marginUsd.toFixed(4)}</td>
                    <td className="py-3 font-black text-neutral-900 dark:text-white">${log.totalBillableUsd.toFixed(4)}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
                        {log.doubleEntryLedgerRefId}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ADMIN PLAN CONFIGURATOR VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'admin_config' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-500" /> Administrator Plan Limit & Feature Configurator
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Customize limits, allowed models, agent quotas, storage, research passes, and white-label permissions without hardcoding.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-neutral-500">Target Plan:</label>
              <select
                value={editingPlanTier}
                onChange={(e) => setEditingPlanTier(e.target.value as any)}
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1.5 text-xs font-bold text-neutral-900 dark:text-white"
              >
                {plans.map(p => (
                  <option key={p.tier} value={p.tier}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const plan = plans.find(p => p.tier === editingPlanTier) || plans[0];

            return (
              <div className="space-y-6 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Base Monthly Price ($ USD)</label>
                    <input
                      type="number"
                      value={plan.basePriceMonthlyUsd}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, basePriceMonthlyUsd: val, basePriceAnnualMonthlyUsd: Math.round(val * 0.8) } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Monthly Tokens Ceiling</label>
                    <input
                      type="number"
                      step={500000}
                      value={plan.limits.monthlyTokens}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, limits: { ...p.limits, monthlyTokens: val } } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Daily Request Limit</label>
                    <input
                      type="number"
                      value={plan.limits.requestsPerDay}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, limits: { ...p.limits, requestsPerDay: val } } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Allowed Agents Count</label>
                    <input
                      type="number"
                      value={plan.allowedAgentCount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, allowedAgentCount: val } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Vector Storage (GB)</label>
                    <input
                      type="number"
                      value={plan.storageGb}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, storageGb: val } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Deep Research Passes / Mo</label>
                    <input
                      type="number"
                      value={plan.deepResearchQueriesPerMonth}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, deepResearchQueriesPerMonth: val } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">SLA Guarantee %</label>
                    <input
                      type="number"
                      step={0.01}
                      value={plan.slaGuaranteePercent}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, slaGuaranteePercent: val } : p));
                      }}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <label className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">White-Label Eligible</span>
                    <input
                      type="checkbox"
                      checked={plan.whiteLabelEligible}
                      onChange={(e) => {
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, whiteLabelEligible: e.target.checked } : p));
                      }}
                      className="rounded text-indigo-600"
                    />
                  </label>

                  <label className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">BYOK Credential Allowed</span>
                    <input
                      type="checkbox"
                      checked={plan.byokEligible}
                      onChange={(e) => {
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, byokEligible: e.target.checked } : p));
                      }}
                      className="rounded text-indigo-600"
                    />
                  </label>

                  <label className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">BYOM Private Node Allowed</span>
                    <input
                      type="checkbox"
                      checked={plan.byomEligible}
                      onChange={(e) => {
                        setPlans(plans.map(p => p.tier === editingPlanTier ? { ...p, byomEligible: e.target.checked } : p));
                      }}
                      className="rounded text-indigo-600"
                    />
                  </label>
                </div>

                <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      if (triggerToast) {
                        triggerToast('Plan Configuration Saved', `Configuration for tier "${plan.name}" persisted to Sovereign Core config.`, 'success');
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Save & Deploy Tier Config
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
}
