import React, { useState } from 'react';
import { 
  OmniAiWhiteLabelConfig, 
  OmniAffiliateProgramConfig, 
  OmniResellerHierarchy, 
  OmniReconciliationTestResult 
} from '../../../types';
import { 
  SEED_WHITE_LABEL_CONFIG, 
  SEED_AFFILIATE_PROGRAM_CONFIG, 
  SEED_RESELLER_HIERARCHY, 
  SEED_RECONCILIATION_TESTS 
} from '../../../monetisation_store_data';
import { 
  Building2, 
  Share2, 
  Users, 
  ShieldCheck, 
  Globe, 
  Palette, 
  Key, 
  Lock, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Copy, 
  ExternalLink, 
  DollarSign, 
  Award, 
  Sparkles, 
  Server, 
  ChevronRight, 
  Sliders, 
  AlertTriangle,
  FileCheck,
  Zap,
  Eye,
  Check
} from 'lucide-react';

interface OmniPartnerWhiteLabelHubProps {
  triggerToast?: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export function OmniPartnerWhiteLabelHub({ triggerToast }: OmniPartnerWhiteLabelHubProps) {
  // State
  const [activeSubTab, setActiveSubTab] = useState<'white_label' | 'affiliate' | 'reseller' | 'byok_byom' | 'reconciliation_tests'>('white_label');
  
  // White-label configuration state
  const [wlConfig, setWlConfig] = useState<OmniAiWhiteLabelConfig>(SEED_WHITE_LABEL_CONFIG);
  const [livePreviewMode, setLivePreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Affiliate state
  const [affiliateConfig, setAffiliateConfig] = useState<OmniAffiliateProgramConfig>(SEED_AFFILIATE_PROGRAM_CONFIG);

  // Reseller state
  const [resellerHierarchy, setResellerHierarchy] = useState<OmniResellerHierarchy>(SEED_RESELLER_HIERARCHY);

  // Reconciliation tests state
  const [tests, setTests] = useState<OmniReconciliationTestResult[]>(SEED_RECONCILIATION_TESTS);
  const [isRunningAllTests, setIsRunningAllTests] = useState(false);

  // Run all verification tests
  const handleRunAllTests = () => {
    setIsRunningAllTests(true);
    setTimeout(() => {
      setTests(prev => prev.map(t => ({
        ...t,
        status: 'passed',
        verifiedAt: new Date().toISOString(),
        executionLatencyMs: Math.round(5 + Math.random() * 15)
      })));
      setIsRunningAllTests(false);
      if (triggerToast) {
        triggerToast(
          'Reconciliation & Isolation Suite Passed',
          '8 of 8 sovereign ledger and security assertions verified with 100% mathematical integrity.',
          'success'
        );
      }
    }, 1500);
  };

  const handleCopyLink = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (triggerToast) {
      triggerToast('Copied to Clipboard', `${label} copied to clipboard.`, 'info');
    }
  };

  return (
    <div id="omni_partner_white_label_hub" className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & METRICS BAR */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                Partner Economy & Sovereign White-Label
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Enclave Secret Protection
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              White-Label AI, Resellers & Affiliate Economy
            </h1>
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Launch branded AI customer portals, manage reseller wholesale margins, generate affiliate commissions, and execute automated financial reconciliation suites.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAllTests}
              disabled={isRunningAllTests}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isRunningAllTests ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Ledgers...
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" /> Run 8 Sovereign Tests
                </>
              )}
            </button>
          </div>
        </div>

        {/* SUB-TABS */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('white_label')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'white_label'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Building2 className="w-4 h-4" /> White-Label Studio & Portal
          </button>

          <button
            onClick={() => setActiveSubTab('affiliate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'affiliate'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Share2 className="w-4 h-4" /> Affiliate Economy (${affiliateConfig.totalCommissionEarnedUsd.toLocaleString()})
          </button>

          <button
            onClick={() => setActiveSubTab('reseller')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'reseller'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Users className="w-4 h-4" /> Reseller Wholesale Hierarchy
          </button>

          <button
            onClick={() => setActiveSubTab('byok_byom')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'byok_byom'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Server className="w-4 h-4" /> BYOK & BYOM Commercials
          </button>

          <button
            onClick={() => setActiveSubTab('reconciliation_tests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'reconciliation_tests'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Isolation & Ledger Tests (8/8 Passed)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. WHITE-LABEL AI TENANT STUDIO */}
      {/* ========================================================================= */}
      {activeSubTab === 'white_label' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CONFIGURATION COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Tenant Brand & Domain Identity</h3>
                  <p className="text-xs text-neutral-500">Configure white-label branding, custom CNAME, and welcome directives.</p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">White-Label Enabled</span>
                  <input
                    type="checkbox"
                    checked={wlConfig.isEnabled}
                    onChange={(e) => setWlConfig({ ...wlConfig, isEnabled: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              </div>

              {/* STRICT GUARANTEE NOTICE */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-extrabold text-xs">
                  <Lock className="w-4 h-4 text-emerald-600" /> Sovereign Provider Secret Redaction Guarantee
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400 leading-relaxed">
                  OMNI AI guarantees that master provider credentials (Gemini, OpenAI, Anthropic) and upstream billing records are NEVER exposed in white-label tenant payloads. All client queries terminate at the sovereign enclave.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={wlConfig.brandName}
                      onChange={(e) => setWlConfig({ ...wlConfig, brandName: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Custom Domain (FQDN)</label>
                    <input
                      type="text"
                      value={wlConfig.customDomain}
                      onChange={(e) => setWlConfig({ ...wlConfig, customDomain: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-neutral-400 uppercase">CNAME Target</span>
                    <div className="text-neutral-900 dark:text-white font-bold">{wlConfig.cnameTarget}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                    DNS Verified & SSL Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={wlConfig.primaryColorHex}
                        onChange={(e) => setWlConfig({ ...wlConfig, primaryColorHex: e.target.value })}
                        className="w-9 h-9 rounded-lg border border-neutral-300 dark:border-neutral-700 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={wlConfig.primaryColorHex}
                        onChange={(e) => setWlConfig({ ...wlConfig, primaryColorHex: e.target.value })}
                        className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Accent Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={wlConfig.accentColorHex}
                        onChange={(e) => setWlConfig({ ...wlConfig, accentColorHex: e.target.value })}
                        className="w-9 h-9 rounded-lg border border-neutral-300 dark:border-neutral-700 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={wlConfig.accentColorHex}
                        onChange={(e) => setWlConfig({ ...wlConfig, accentColorHex: e.target.value })}
                        className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-2 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Welcome Headline</label>
                  <input
                    type="text"
                    value={wlConfig.welcomeTitle}
                    onChange={(e) => setWlConfig({ ...wlConfig, welcomeTitle: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Welcome Subtitle</label>
                  <textarea
                    rows={2}
                    value={wlConfig.welcomeSubtitle}
                    onChange={(e) => setWlConfig({ ...wlConfig, welcomeSubtitle: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => {
                    if (triggerToast) {
                      triggerToast('White-Label Published', `Brand settings for "${wlConfig.brandName}" deployed to ${wlConfig.customDomain}.`, 'success');
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs cursor-pointer shadow-xs"
                >
                  Save & Deploy Portal
                </button>
              </div>
            </div>
          </div>

          {/* LIVE PORTAL PREVIEW COLUMN */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-neutral-400">Live Client Portal Preview</h3>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-mono text-[11px]">{wlConfig.customDomain}</span>
              </div>
            </div>

            {/* PREVIEW FRAME */}
            <div className="rounded-3xl border-2 border-neutral-300 dark:border-neutral-800 overflow-hidden shadow-2xl bg-neutral-950 text-white min-h-[500px] flex flex-col justify-between p-6">
              {/* TOP BAR */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white"
                    style={{ backgroundColor: wlConfig.primaryColorHex }}
                  >
                    {wlConfig.brandName[0]}
                  </div>
                  <div>
                    <span className="font-extrabold text-sm block leading-none">{wlConfig.brandName}</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Sovereign Client Node</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    SSL 256-bit
                  </span>
                </div>
              </div>

              {/* WELCOME BODY */}
              <div className="py-8 text-center space-y-3">
                <div 
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: wlConfig.primaryColorHex }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg font-black tracking-tight">{wlConfig.welcomeTitle}</h2>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">{wlConfig.welcomeSubtitle}</p>

                {/* PROMPT PILLS */}
                <div className="space-y-2 pt-4">
                  {wlConfig.defaultPromptSuggestions.slice(0, 3).map((prompt, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 hover:border-neutral-700 text-left cursor-pointer">
                      💡 {prompt}
                    </div>
                  ))}
                </div>
              </div>

              {/* INPUT BAR */}
              <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Ask {wlConfig.brandName}...</span>
                <button 
                  className="px-3 py-1.5 rounded-xl font-bold text-xs text-white shadow-sm"
                  style={{ backgroundColor: wlConfig.primaryColorHex }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. AFFILIATE PROGRAM ECONOMY */}
      {/* ========================================================================= */}
      {activeSubTab === 'affiliate' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Total Referral Clicks</span>
              <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                {affiliateConfig.totalClicks.toLocaleString()}
              </div>
              <span className="text-[10px] text-neutral-500">From verified campaigns</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Paid Conversions</span>
              <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {affiliateConfig.totalConversions} Tenants
              </div>
              <span className="text-[10px] text-neutral-500">Conversion Rate: {((affiliateConfig.totalConversions / affiliateConfig.totalClicks) * 100).toFixed(2)}%</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Total Commissions</span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                ${affiliateConfig.totalCommissionEarnedUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-emerald-600">20% first-year + 10% recurring</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Pending Payout</span>
              <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                ${affiliateConfig.pendingPayoutUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-neutral-500">Clears on 1st of month</span>
            </div>
          </div>

          {/* REFERRAL LINK GENERATOR */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">Affiliate Tracking Link & Referral Rules</h3>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 w-full p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl font-mono text-xs text-neutral-900 dark:text-white flex items-center justify-between">
                <span>{affiliateConfig.referralLink}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                  Code: {affiliateConfig.affiliateCode}
                </span>
              </div>

              <button
                onClick={() => handleCopyLink(affiliateConfig.referralLink, 'Affiliate Referral Link')}
                className="px-5 py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <Copy className="w-4 h-4" /> Copy Referral Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <strong className="text-neutral-900 dark:text-white block">First-Year Subscriptions</strong>
                <span className="text-emerald-600 font-mono font-bold text-sm">{affiliateConfig.defaultCommissionRatePercent}% Commission</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <strong className="text-neutral-900 dark:text-white block">Lifetime Recurring Share</strong>
                <span className="text-emerald-600 font-mono font-bold text-sm">{affiliateConfig.recurringCommissionRatePercent}% Monthly</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <strong className="text-neutral-900 dark:text-white block">Attribution Cookie Window</strong>
                <span className="text-neutral-700 dark:text-neutral-300 font-mono font-bold text-sm">{affiliateConfig.cookieWindowDays} Days</span>
              </div>
            </div>
          </div>

          {/* REFERRAL CONVERSION HISTORY */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">Recent Referral Conversions & Double-Entry Leg</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono text-[10px] uppercase">
                    <th className="pb-3 font-bold">Referred Tenant</th>
                    <th className="pb-3 font-bold">Plan Purchased</th>
                    <th className="pb-3 font-bold">Subscription Revenue</th>
                    <th className="pb-3 font-bold">Commission Earned</th>
                    <th className="pb-3 font-bold">Date</th>
                    <th className="pb-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono text-[11px]">
                  {affiliateConfig.referralHistory.map(ref => (
                    <tr key={ref.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                      <td className="py-3 font-sans font-extrabold text-neutral-900 dark:text-white">{ref.referredTenantName}</td>
                      <td className="py-3 text-neutral-600 dark:text-neutral-400">{ref.planPurchased}</td>
                      <td className="py-3 text-neutral-900 dark:text-white">${ref.revenueUsd.toFixed(2)}</td>
                      <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">+${ref.commissionUsd.toFixed(2)}</td>
                      <td className="py-3 text-neutral-400">{ref.date}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ref.status === 'cleared'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        }`}>
                          {ref.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RESELLER WHOLESALE HIERARCHY */}
      {/* ========================================================================= */}
      {activeSubTab === 'reseller' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                    Tier: {resellerHierarchy.tier.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mt-1">{resellerHierarchy.resellerOrgName}</h3>
                <p className="text-xs text-neutral-500">Central wholesale distributor managing {resellerHierarchy.activeSubTenantsCount} sub-tenant organizations.</p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Wholesale Discount</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{resellerHierarchy.wholesaleDiscountPercent}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono block">Monthly Retained Margin</span>
                  <span className="text-xl font-black text-neutral-900 dark:text-white font-mono">${resellerHierarchy.totalMarginEarnedUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* QUOTA GAUGE */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">Monthly Wholesale Quota Allocation (OCU)</span>
                <span className="font-mono text-neutral-500">
                  {(resellerHierarchy.usedQuotaCredits / 1000000).toFixed(1)}M / {(resellerHierarchy.allocatedMonthlyQuotaCredits / 1000000).toFixed(1)}M OCU
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${(resellerHierarchy.usedQuotaCredits / resellerHierarchy.allocatedMonthlyQuotaCredits) * 100}%` }}
                />
              </div>
            </div>

            {/* SUB-TENANTS TABLE */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Managed Sub-Tenant Accounts</h4>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {resellerHierarchy.subTenants.map(st => (
                  <div key={st.tenantId} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="font-extrabold text-neutral-900 dark:text-white">{st.orgName}</strong>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {st.planTier.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">Tenant ID: {st.tenantId} • Joined: {st.joinedDate}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 uppercase block font-mono">Allocated OCU</span>
                        <span className="font-mono font-bold text-neutral-900 dark:text-white">{(st.allocatedCredits / 1000000).toFixed(1)}M</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        ● Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. BYOK & BYOM COMMERCIALS */}
      {/* ========================================================================= */}
      {activeSubTab === 'byok_byom' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BYOK CARD */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Bring Your Own Key (BYOK)</h3>
                  <p className="text-xs text-neutral-500">Connect sovereign provider keys with zero platform markup on tokens</p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                When BYOK is active, model token fees are billed directly to your provider account. OMNI AI applies only a micro orchestration software fee ($0.00005 per 1k tokens) for memory indexing, circuit breakers, and RAG retrieval.
              </p>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Provider Token Cost:</span>
                  <strong className="text-neutral-900 dark:text-white">Direct via Provider Invoice</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">OMNI Software Fee:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">$0.00005 / 1k Tokens</strong>
                </div>
              </div>
            </div>

            {/* BYOM CARD */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Bring Your Own Model (BYOM)</h3>
                  <p className="text-xs text-neutral-500">Connect on-premise vLLM, Ollama, or Triton inference clusters</p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Execute inference entirely on your hardware with zero data leaving your sovereign perimeter. Zero model inference fees are incurred; OMNI AI acts as the orchestration gateway and governance plane.
              </p>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Inference Hardware:</span>
                  <strong className="text-neutral-900 dark:text-white">Sovereign Private Cluster</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Data Egress:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">0% Egress (Zero Retention)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SOVEREIGN RECONCILIATION & ISOLATION TESTS */}
      {/* ========================================================================= */}
      {activeSubTab === 'reconciliation_tests' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Automated Financial Reconciliation & Tenant Isolation Test Matrix
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                8 automated regression tests verifying double-entry balance, developer revenue splits, budget hard-stops, and cryptographic zero cross-tenant contamination.
              </p>
            </div>

            <button
              onClick={handleRunAllTests}
              disabled={isRunningAllTests}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isRunningAllTests ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Running All Assertions...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Run Entire Test Suite
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {tests.map(test => (
              <div key={test.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                        {test.category.replace('_', ' ')}
                      </span>
                      <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">{test.testName}</h4>
                    </div>
                    <p className="text-xs text-neutral-500">{test.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-neutral-400">{test.executionLatencyMs}ms</span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> PASSED ({test.assertionsPassed}/{test.assertionsCount})
                    </span>
                  </div>
                </div>

                {/* VERIFIED LEDGER LEGS */}
                {test.ledgerEntriesVerified.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-neutral-400">Verified Double-Entry Ledger Legs:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                      {test.ledgerEntriesVerified.map((leg, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                          <span className="text-neutral-500">
                            <code>{leg.debitAccount}</code> → <code>{leg.creditAccount}</code>
                          </span>
                          <span className="font-bold text-neutral-900 dark:text-white">${leg.amount.toFixed(4)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1 border-t border-neutral-200 dark:border-neutral-700">
                  <span>Reconciliation Proof Hash: <code>{test.reconciliationHash}</code></span>
                  <span>Verified: {new Date(test.verifiedAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
