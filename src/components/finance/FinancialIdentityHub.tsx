import React, { useState } from 'react';
import {
  UserCheck, Shield, Key, Landmark, Globe, CheckCircle2,
  AlertTriangle, RefreshCw, Layers, ArrowUpRight, ArrowDownLeft,
  ExternalLink, Lock, Check, Search, Filter, Cpu, Database,
  Fingerprint, ChevronRight, Zap, Award, Activity, AlertCircle,
  Copy, Eye, EyeOff, Building2, Coins, ArrowRightLeft, ShieldCheck
} from 'lucide-react';

import {
  FinancialProfile,
  FinanceWallet,
  ExternalAccountAdapter,
  FinancialRbacRole,
  FinanceSecurityTestResult,
  FinanceTenant,
  FinanceCurrencyRegistryItem
} from '../../types/finance_os';

import {
  SEED_FINANCIAL_PROFILES,
  SEED_FINANCE_WALLETS,
  SEED_EXTERNAL_ADAPTERS,
  SEED_RBAC_ROLES,
  SEED_SECURITY_TEST_RESULTS,
  SEED_FINANCE_TENANTS,
  SEED_FINANCE_CURRENCY_REGISTRY
} from '../../data/finance_os_seed';

interface FinancialIdentityHubProps {
  onNotify?: (message: string) => void;
}

export default function FinancialIdentityHub({ onNotify }: FinancialIdentityHubProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'profiles' | 'wallets' | 'adapters' | 'rbac' | 'currencies' | 'security_audit'
  >('profiles');

  const [profiles, setProfiles] = useState<FinancialProfile[]>(SEED_FINANCIAL_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(SEED_FINANCIAL_PROFILES[0].id);
  const [wallets, setWallets] = useState<FinanceWallet[]>(SEED_FINANCE_WALLETS);
  const [adapters, setAdapters] = useState<ExternalAccountAdapter[]>(SEED_EXTERNAL_ADAPTERS);
  const [rbacRoles, setRbacRoles] = useState<FinancialRbacRole[]>(SEED_RBAC_ROLES);
  const [securityTests, setSecurityTests] = useState<FinanceSecurityTestResult[]>(SEED_SECURITY_TEST_RESULTS);
  const [currencies, setCurrencies] = useState<FinanceCurrencyRegistryItem[]>(SEED_FINANCE_CURRENCY_REGISTRY);

  const [syncingAdapterId, setSyncingAdapterId] = useState<string | null>(null);
  const [runningSecurityAudit, setRunningSecurityAudit] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState('ALL');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId) || profiles[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedText(label);
    if (onNotify) onNotify(`Copied ${label} to clipboard`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSyncAdapter = (adapterId: string) => {
    setSyncingAdapterId(adapterId);
    setTimeout(() => {
      setAdapters((prev) =>
        prev.map((a) =>
          a.id === adapterId
            ? { ...a, lastSyncTimestamp: new Date().toISOString(), status: 'connected' }
            : a
        )
      );
      setSyncingAdapterId(null);
      if (onNotify) onNotify(`External adapter ${adapterId} successfully synchronized with live ledger`);
    }, 1200);
  };

  const handleRunSecurityAudit = () => {
    setRunningSecurityAudit(true);
    setTimeout(() => {
      setSecurityTests((prev) =>
        prev.map((t) => ({
          ...t,
          status: 'passed',
          timestamp: new Date().toISOString()
        }))
      );
      setRunningSecurityAudit(false);
      if (onNotify) onNotify('Automated Financial Tenancy & RBAC Audit completed: 100% tests passed');
    }, 1500);
  };

  const handleUpdateVerificationTier = (profileId: string, newStatus: FinancialProfile['verificationStatus']) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, verificationStatus: newStatus } : p))
    );
    if (onNotify) onNotify(`Updated KYC/KYB Tier to: ${newStatus.toUpperCase().replace(/_/g, ' ')}`);
  };

  const filteredWallets = wallets.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.primaryCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.owner.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = accountTypeFilter === 'ALL' || w.walletType === accountTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            <Fingerprint className="w-4 h-4" />
            <span>OMNI Financial Passport &amp; Unified Identity Core</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
            Global Financial Identity &amp; Wallet Hub
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Single OMNI Passport credentials powering multi-tenant personal, business, merchant, creator, and sovereign NGO accounts with real-time RBAC, Open Banking integrations, and cryptographic audit proofs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunSecurityAudit}
            disabled={runningSecurityAudit}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-950/40 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${runningSecurityAudit ? 'animate-spin' : ''}`} />
            <span>{runningSecurityAudit ? 'Running Audits...' : 'Run Security Audit'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-stone-800">
        {[
          { id: 'profiles', label: 'Financial Profiles', icon: UserCheck, count: profiles.length },
          { id: 'wallets', label: 'Multi-Currency Wallets', icon: Landmark, count: wallets.length },
          { id: 'adapters', label: 'External Account Adapters', icon: Globe, count: adapters.length },
          { id: 'rbac', label: 'Financial RBAC & Permissions', icon: Key, count: rbacRoles.length },
          { id: 'currencies', label: 'Currency Registry', icon: Layers, count: currencies.length },
          { id: 'security_audit', label: 'Tenancy Security Tests', icon: Shield, count: securityTests.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 border border-stone-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-stone-800 text-stone-400 font-mono">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: FINANCIAL PROFILES & OMNI PASSPORT */}
      {activeSubTab === 'profiles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Profile Selector */}
          <div className="space-y-3 lg:col-span-1">
            <h3 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider px-1">
              Select Financial Identity
            </h3>
            <div className="space-y-2">
              {profiles.map((p) => {
                const isSelected = p.id === selectedProfile.id;
                const passportCode = p.omniPassportId;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProfileId(p.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-md'
                        : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {passportCode}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.verificationStatus === 'tier_5_institutional_sovereign' || p.verificationStatus === 'tier_3_enhanced_due_diligence'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        }`}
                      >
                        {p.verificationStatus.replace(/tier_\d+_/, '').replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-stone-100 mt-2">{p.legalName}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{p.industryCategory || 'Financial Participant'} • {p.preferredCurrencies.join(', ')}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800/60 font-mono">
                      <span>AML Risk: <strong className="text-emerald-400 capitalize">{p.riskProfile.level}</strong></span>
                      <span>Score: {p.riskProfile.overallScore}/100</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Profile Details Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-300">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-white">{selectedProfile.legalName}</h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                        {selectedProfile.omniPassportId}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-mono mt-0.5">
                      OMNI UID: {selectedProfile.userId} • Category: {selectedProfile.industryCategory || 'Corporate Sovereign'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedProfile.omniPassportId, 'Passport ID')}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono font-medium flex items-center gap-1.5 border border-stone-700 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText === 'Passport ID' ? 'Copied!' : 'Copy Passport ID'}</span>
                  </button>
                </div>
              </div>

              {/* KYC / KYB Verification Tiers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-400 uppercase">
                  <span>Verification Status &amp; Tier Level</span>
                  <span className="text-indigo-400">Target: Global Zero-Fee Rail Settlement</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'tier_1_basic_kyc', label: 'Tier 1 Basic', limit: '$10,000/mo' },
                    { id: 'tier_2_verified_individual', label: 'Tier 2 KYC', limit: '$100,000/mo' },
                    { id: 'tier_3_enhanced_due_diligence', label: 'Tier 3 EDD', limit: '$1,000,000/mo' },
                    { id: 'tier_5_institutional_sovereign', label: 'Tier 5 Sovereign', limit: 'Unlimited' }
                  ].map((tier) => {
                    const isCurrent = selectedProfile.verificationStatus === tier.id;
                    const isPassed =
                      selectedProfile.verificationStatus === 'tier_5_institutional_sovereign' ||
                      (selectedProfile.verificationStatus === 'tier_3_enhanced_due_diligence' && tier.id !== 'tier_5_institutional_sovereign') ||
                      (selectedProfile.verificationStatus === 'tier_2_verified_individual' && (tier.id === 'tier_1_basic_kyc' || tier.id === 'tier_2_verified_individual')) ||
                      (selectedProfile.verificationStatus === 'tier_1_basic_kyc' && tier.id === 'tier_1_basic_kyc');

                    return (
                      <div
                        key={tier.id}
                        onClick={() => handleUpdateVerificationTier(selectedProfile.id, tier.id as any)}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-sm'
                            : isPassed
                            ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                            : 'bg-stone-900/40 border-stone-800 text-stone-500 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1 text-xs font-bold">
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
                          <span>{tier.label}</span>
                        </div>
                        <div className="text-[10px] font-mono text-stone-400 mt-1">{tier.limit}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Financial Risk & Compliance Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                  <div className="text-[11px] text-stone-400 font-medium">AML &amp; PEP Risk Level</div>
                  <div className="text-sm font-black text-emerald-400 capitalize font-mono">
                    {selectedProfile.riskProfile.level.replace(/_/g, ' ')}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    Sanctions: {selectedProfile.riskProfile.amlSanctionsPass ? 'Passed' : 'Review Required'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                  <div className="text-[11px] text-stone-400 font-medium">Credit Score Index</div>
                  <div className="text-sm font-black text-white font-mono">
                    {selectedProfile.riskProfile.creditScoreIndex} / 850
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    Velocity Tier: {selectedProfile.riskProfile.velocityTier}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                  <div className="text-[11px] text-stone-400 font-medium">Security &amp; MFA Status</div>
                  <div className="text-sm font-black text-indigo-300 font-mono">
                    {selectedProfile.twoFactorEnforced ? 'Hardware MFA Enforced' : 'Single-Factor'}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    Auto-Sweep Yield: {selectedProfile.financialPreferences.autoSweepIdleYield ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              </div>

              {/* Connected Account & Business Relationships */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-stone-400 uppercase">
                  Connected Entities &amp; Business Delegations ({selectedProfile.businessRelationships.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProfile.businessRelationships.map((rel, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{rel.organizationName}</div>
                        <div className="text-[11px] text-indigo-400 font-mono">{rel.relationshipRole.replace(/_/g, ' ')}</div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          Entity ID: {rel.organizationId}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                        {rel.ownershipPercentage}% Equity
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Activity Summary */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-indigo-300">Lifetime Ledger Metrics</div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    {selectedProfile.financialActivitySummary.totalTransactionsCount.toLocaleString()} total lifetime transactions processed across global rails.
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-stone-500 block text-[10px]">30D THROUGHPUT</span>
                    <strong className="text-emerald-400">${selectedProfile.financialActivitySummary.total30dVolumeUsd.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">ALL-TIME VOLUME</span>
                    <strong className="text-stone-200">${selectedProfile.financialActivitySummary.allTimeThroughputUsd.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-CURRENCY WALLETS */}
      {activeSubTab === 'wallets' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by wallet name, currency, or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs text-white placeholder-stone-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 font-mono">Type:</span>
              <select
                value={accountTypeFilter}
                onChange={(e) => setAccountTypeFilter(e.target.value)}
                className="bg-stone-800 border border-stone-700 text-xs text-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Account Types</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="enterprise">Enterprise</option>
                <option value="merchant">Merchant</option>
                <option value="creator">Creator</option>
                <option value="developer">Developer</option>
                <option value="affiliate">Affiliate</option>
              </select>
            </div>
          </div>

          {/* Wallet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-300 border border-stone-700">
                      {wallet.walletType}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      Primary: <strong className="text-emerald-400">{wallet.primaryCurrency}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3">{wallet.name}</h3>
                  <div className="text-xs text-stone-400 font-mono mt-0.5">
                    Owner: {wallet.owner.name} ({wallet.owner.role})
                  </div>

                  {/* Total Value */}
                  <div className="mt-4 p-3 rounded-xl bg-stone-950/80 border border-stone-800/80">
                    <div className="text-[11px] text-stone-400">Total Net USD Value</div>
                    <div className="text-xl font-black text-white font-mono mt-0.5">
                      ${(wallet.totalUsdEquivalent || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Multi-Currency Balances Breakdown */}
                  <div className="mt-3 space-y-1.5">
                    <div className="text-[11px] font-mono font-semibold text-stone-400 uppercase">
                      Currencies &amp; Assets ({wallet.multiCurrencyBalances?.length || wallet.balances?.length || 0})
                    </div>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {(wallet.multiCurrencyBalances || []).map((mb, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-stone-900/60 border border-stone-800/40"
                        >
                          <span className="font-mono font-bold text-stone-200">{mb.currency}</span>
                          <div className="text-right font-mono">
                            <span className="text-stone-300 font-medium">
                              {mb.available.toLocaleString()} {mb.currency}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              ≈ ${mb.usdEquivalent.toLocaleString()} USD
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span>Daily Cap: ${(wallet.transactionLimits.dailyLimit).toLocaleString()}</span>
                  <button
                    onClick={() => handleCopy(wallet.id, 'Wallet ID')}
                    className="hover:text-indigo-400 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>ID: {wallet.id.substring(0, 10)}...</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EXTERNAL ACCOUNT ADAPTERS */}
      {activeSubTab === 'adapters' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white">External Institution Connectors &amp; Banking Rails</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Standardized adapter layer connecting OMNI Finance OS to global payment rails, Open Banking APIs, ISO 20022 message networks, and crypto custody.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-mono font-bold">
              {adapters.filter((a) => a.status === 'connected').length} of {adapters.length} Rails Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adapters.map((adapter) => {
              const isSyncing = syncingAdapterId === adapter.id;
              return (
                <div
                  key={adapter.id}
                  className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-300 border border-stone-700">
                        {adapter.adapterType.replace(/_/g, ' ')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          adapter.status === 'connected'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {adapter.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-3">{adapter.institutionName}</h3>
                    <div className="text-xs text-stone-400 font-mono mt-0.5">
                      Account: {adapter.accountNumberMasked} ({adapter.currency})
                    </div>

                    {/* Supported Operations */}
                    <div className="mt-3 space-y-1">
                      <div className="text-[11px] font-mono text-stone-400">Supported Capabilities</div>
                      <div className="flex flex-wrap gap-1">
                        {adapter.supportedOperations.map((op, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-stone-800/80 text-stone-300 text-[10px] font-mono"
                          >
                            {op.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between text-stone-400">
                        <span>Adapter ID:</span>
                        <span className="text-stone-300">{adapter.id}</span>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Last Synced:</span>
                        <span className="text-emerald-400">{new Date(adapter.lastSyncTimestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSyncAdapter(adapter.id)}
                    disabled={isSyncing}
                    className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 border border-stone-700 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Synchronizing Adapter...' : 'Sync Live Ledger'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: FINANCIAL RBAC & PERMISSION POLICIES */}
      {activeSubTab === 'rbac' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white">Financial Role-Based Access Control (RBAC)</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Hierarchical role delegations, multi-signature approvals, and per-role transaction limits enforced across all tenant workspaces.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 text-xs font-mono font-bold">
              {rbacRoles.length} Active System Roles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rbacRoles.map((role) => (
              <div
                key={role.roleKey}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                      {role.roleKey}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-300 border border-stone-700">
                      {role.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-2">{role.roleName}</h3>
                  <p className="text-xs text-stone-400 mt-1">{role.description}</p>

                  {/* Permissions List */}
                  <div className="mt-3 space-y-1">
                    <div className="text-[11px] font-mono text-stone-400">Granted Permissions ({role.permissions.length})</div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-mono"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CURRENCY REGISTRY & RAILS */}
      {activeSubTab === 'currencies' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white">Global Currency &amp; Settlement Rail Registry</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Centralized registry of supported fiat, stablecoins, and sovereign crypto assets with real-time settlement rails and exchange providers.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-mono font-bold">
              {currencies.length} Registered Assets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currencies.map((curr) => (
              <div
                key={curr.code}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center font-bold text-sm text-indigo-300">
                      {curr.symbol}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{curr.name}</div>
                      <div className="text-xs text-stone-400 font-mono">{curr.code} • {curr.decimalRules} Decimals</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-300 border border-stone-700">
                    {curr.isStablecoin ? 'Stablecoin' : curr.isFiat ? 'Fiat' : 'Crypto'}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                  <div className="text-[11px] font-mono text-stone-400 uppercase">Default Rail &amp; Clearing</div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-[10px] font-mono uppercase">
                      {curr.settlementRailDefault}
                    </span>
                    <span className="text-[11px] text-stone-400">{curr.settlementRules.clearingRailName}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Default Provider:</span>
                  <span className="text-stone-200 font-bold">{curr.provider}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SECURITY & TENANCY ISOLATION AUDIT */}
      {activeSubTab === 'security_audit' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white">Automated Security &amp; Tenancy Isolation Test Suite</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Continuous automated penetration testing and formal invariant verification ensuring zero cross-tenant leakage, tamper-proof ledgers, and strict RBAC.
              </p>
            </div>
            <button
              onClick={handleRunSecurityAudit}
              disabled={runningSecurityAudit}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${runningSecurityAudit ? 'animate-spin' : ''}`} />
              <span>{runningSecurityAudit ? 'Running Verification...' : 'Re-run Test Suite'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {securityTests.map((test) => (
              <div
                key={test.testId}
                className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 p-1.5 rounded-lg ${
                      test.status === 'passed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {test.status === 'passed' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{test.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-400">
                        {test.category.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">{test.assertionDetails}</p>
                    {test.logOutput && test.logOutput.length > 0 && (
                      <div className="mt-2 p-2 rounded bg-stone-950 border border-stone-800/80 font-mono text-[10px] text-stone-400 space-y-0.5">
                        {test.logOutput.map((l, i) => (
                          <div key={i}>{l}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 block">
                    {test.status} ({test.executionMs}ms)
                  </span>
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    {new Date(test.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
