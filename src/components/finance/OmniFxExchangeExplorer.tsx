import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe, ArrowRightLeft, TrendingUp, TrendingDown, RefreshCw,
  ShieldCheck, AlertTriangle, Plus, CheckCircle, Clock,
  DollarSign, Lock, Unlock, Zap, Server, Sliders, Play,
  Check, FileText, Building2, Landmark, Sparkles, Scale,
  ChevronRight, ArrowUpRight, ArrowDownRight, Layers, Eye,
  Info, ExternalLink, ShieldAlert, BadgePercent, Activity
} from 'lucide-react';

import {
  CurrencyRecord,
  FxProvider,
  ExchangeRateRecord,
  FxQuote,
  FxTransaction,
  MultiCurrencyWallet,
  MultiCurrencyBalance,
  BusinessFxExposure,
  EnterpriseTreasurySettlementPlan,
  FxAdminConfig,
  FxAiInsight,
  FxTestResult
} from '../../types/omni_fx_engine';

import {
  SEED_CURRENCIES,
  SEED_FX_PROVIDERS,
  SEED_EXCHANGE_RATES,
  SEED_MULTI_CURRENCY_WALLETS,
  SEED_FX_TRANSACTIONS,
  SEED_BUSINESS_FX_EXPOSURE,
  SEED_ENTERPRISE_SETTLEMENT_PLAN,
  SEED_FX_ADMIN_CONFIG,
  SEED_FX_AI_INSIGHTS,
  calculateFxQuote,
  executeCurrencyConversion,
  OmniFxTestHarness
} from '../../engine/omni_fx_engine';

import { FinanceJournalEntry, FinanceLedgerAccount } from '../../types/finance_os';

interface OmniFxExchangeExplorerProps {
  activeTenant?: any;
  ledgerAccounts?: FinanceLedgerAccount[];
  journalEntries?: FinanceJournalEntry[];
  onAddJournalEntry?: (entry: FinanceJournalEntry) => void;
  showToast?: (message: string) => void;
}

export type FxSubTab =
  | 'multi_wallet'
  | 'converter'
  | 'rates_matrix'
  | 'business_treasury'
  | 'enterprise_settlement'
  | 'ai_analyst'
  | 'admin_control'
  | 'test_suite';

export const OmniFxExchangeExplorer: React.FC<OmniFxExchangeExplorerProps> = ({
  activeTenant,
  ledgerAccounts = [],
  journalEntries = [],
  onAddJournalEntry,
  showToast = (_msg?: string) => {}
}) => {
  const notify = (title: string, message: string = '', _type?: string) => {
    if (showToast) {
      showToast(message ? `${title}: ${message}` : title);
    }
  };
  // Master State
  const [activeSubTab, setActiveSubTab] = useState<FxSubTab>('multi_wallet');
  const [currencies, setCurrencies] = useState<CurrencyRecord[]>(SEED_CURRENCIES);
  const [providers, setProviders] = useState<FxProvider[]>(SEED_FX_PROVIDERS);
  const [rates, setRates] = useState<ExchangeRateRecord[]>(SEED_EXCHANGE_RATES);
  const [wallets, setWallets] = useState<MultiCurrencyWallet[]>(SEED_MULTI_CURRENCY_WALLETS);
  const [transactions, setTransactions] = useState<FxTransaction[]>(SEED_FX_TRANSACTIONS);
  const [adminConfig, setAdminConfig] = useState<FxAdminConfig>(SEED_FX_ADMIN_CONFIG);
  const [businessExposure, setBusinessExposure] = useState<BusinessFxExposure>(SEED_BUSINESS_FX_EXPOSURE);
  const [enterprisePlan, setEnterprisePlan] = useState<EnterpriseTreasurySettlementPlan>(SEED_ENTERPRISE_SETTLEMENT_PLAN);
  const [aiInsights] = useState<FxAiInsight[]>(SEED_FX_AI_INSIGHTS);
  const [testResults, setTestResults] = useState<FxTestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Selected Active Wallet (Default to Gideon Dynasty personal vault)
  const [selectedWalletId, setSelectedWalletId] = useState<string>('mcw_gideon_dynasty_vault');
  const activeWallet = useMemo(() => {
    return wallets.find((w) => w.id === selectedWalletId) || wallets[0];
  }, [wallets, selectedWalletId]);

  // Converter Form State
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [fromAmountInput, setFromAmountInput] = useState<string>('2500');
  const [activeQuote, setActiveQuote] = useState<FxQuote | null>(null);
  const [quoteSecondsLeft, setQuoteSecondsLeft] = useState<number>(120);
  const [isQuoting, setIsQuoting] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [conversionPurpose, setConversionPurpose] = useState<FxTransaction['purposeCode']>('treasury_rebalance');
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState<boolean>(false);
  const [lastExecutedTx, setLastExecutedTx] = useState<FxTransaction | null>(null);

  // Dynamic Add Currency Form State
  const [addCurrencyModalOpen, setAddCurrencyModalOpen] = useState<boolean>(false);
  const [newCurrencyCode, setNewCurrencyCode] = useState<string>('');
  const [newCurrencyName, setNewCurrencyName] = useState<string>('');
  const [newCurrencySymbol, setNewCurrencySymbol] = useState<string>('');
  const [newCurrencyCountry, setNewCurrencyCountry] = useState<string>('');
  const [newCurrencyCountryCode, setNewCurrencyCountryCode] = useState<string>('');
  const [newCurrencyFlag, setNewCurrencyFlag] = useState<string>('🌐');
  const [newCurrencyRegion, setNewCurrencyRegion] = useState<CurrencyRecord['region']>('Europe');
  const [newCurrencyDecimals, setNewCurrencyDecimals] = useState<number>(2);

  // Live Quote Calculation Trigger
  const handleRequestQuote = () => {
    const amountNum = parseFloat(fromAmountInput);
    if (isNaN(amountNum) || amountNum <= 0) {
      notify('Invalid Amount', 'Please enter a positive numeric conversion amount.', 'error');
      return;
    }

    setIsQuoting(true);
    const result = calculateFxQuote({
      tenantId: activeWallet.tenantId,
      userId: activeWallet.ownerId,
      fromCurrency,
      toCurrency,
      fromAmount: amountNum,
      rates,
      currencies,
      adminConfig,
      userVolumeUsd: activeWallet.totalValueUsd
    });

    setIsQuoting(false);
    if (result.success && result.quote) {
      setActiveQuote(result.quote);
      setQuoteSecondsLeft(adminConfig.rateLockValiditySeconds);
      notify('Live Quote Locked', `Rate locked at ${result.quote.appliedRate} for ${adminConfig.rateLockValiditySeconds}s`, 'info');
    } else {
      setActiveQuote(null);
      notify('Quote Error', result.error || 'Failed to generate FX quote.', 'error');
    }
  };

  // Countdown timer for rate lock
  useEffect(() => {
    if (!activeQuote) return;
    const interval = setInterval(() => {
      setQuoteSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveQuote((q) => (q ? { ...q, isExpired: true } : null));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuote]);

  // Execute Conversion
  const handleConfirmConversion = () => {
    if (!activeQuote) return;
    if (activeQuote.isExpired || quoteSecondsLeft <= 0) {
      notify('Quote Expired', 'The rate lock duration has expired. Please refresh the quote.', 'error');
      return;
    }

    setIsExecuting(true);
    setTimeout(() => {
      const prevHash = journalEntries[0]?.merkleHash || '0000000000000000000000000000000000000000000000000000000000000000';
      const result = executeCurrencyConversion({
        tenantId: activeWallet.tenantId,
        userId: activeWallet.ownerId,
        userName: activeWallet.ownerName,
        userEmail: 'gideonoluwalanadynasty@gmail.com',
        quote: activeQuote,
        wallet: activeWallet,
        purposeCode: conversionPurpose,
        previousMerkleHash: prevHash
      });

      setIsExecuting(false);
      setPreviewModalOpen(false);

      if (result.success && result.transaction && result.updatedWallet && result.journalEntry) {
        // Update state
        setTransactions((prev) => [result.transaction!, ...prev]);
        setWallets((prev) => prev.map((w) => (w.id === result.updatedWallet!.id ? result.updatedWallet! : w)));
        if (onAddJournalEntry) {
          onAddJournalEntry(result.journalEntry);
        }
        setLastExecutedTx(result.transaction);
        setReceiptModalOpen(true);
        setActiveQuote(null);
        notify('FX Conversion Executed', `Successfully converted ${result.transaction.fromAmount} ${result.transaction.fromCurrency} -> ${result.transaction.toAmount} ${result.transaction.toCurrency}`, 'success');
      } else {
        notify('Execution Failed', result.error || 'Conversion could not be completed.', 'error');
      }
    }, 450);
  };

  // Quick Switch Currencies
  const handleSwapCurrencies = () => {
    const prevFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(prevFrom);
    setActiveQuote(null);
  };

  // Add Dynamic Currency
  const handleAddCurrency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCurrencyCode || !newCurrencyName) {
      notify('Required Fields', 'Please fill in Currency Code and Name.', 'error');
      return;
    }

    const upperCode = newCurrencyCode.trim().toUpperCase();
    if (currencies.some((c) => c.code === upperCode)) {
      notify('Currency Exists', `Currency code ${upperCode} already exists in registry.`, 'error');
      return;
    }

    const newRecord: CurrencyRecord = {
      code: upperCode,
      name: newCurrencyName.trim(),
      symbol: newCurrencySymbol || upperCode,
      country: newCurrencyCountry.trim() || 'Global',
      countryCode: newCurrencyCountryCode.trim().toUpperCase() || 'GL',
      flagEmoji: newCurrencyFlag || '🌐',
      region: newCurrencyRegion,
      decimalPrecision: newCurrencyDecimals,
      minorUnit: 10 ** newCurrencyDecimals,
      settlementAvailability: true,
      providerAvailability: true,
      exchangeAvailability: true,
      riskClassification: 'low',
      restrictions: [],
      status: 'active',
      isDefaultBase: false,
      dailyConversionLimitUsd: 1000000,
      addedAt: new Date().toISOString()
    };

    setCurrencies((prev) => [...prev, newRecord]);
    setAddCurrencyModalOpen(false);
    notify('Currency Added', `${newRecord.flagEmoji} ${newRecord.code} added to dynamic currency registry.`, 'success');

    // Reset form
    setNewCurrencyCode('');
    setNewCurrencyName('');
    setNewCurrencySymbol('');
    setNewCurrencyCountry('');
    setNewCurrencyCountryCode('');
  };

  // Run Automated 8-Scenario Test Suite
  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      const results = OmniFxTestHarness.runAllTests(wallets, rates, currencies, adminConfig);
      setTestResults(results);
      setIsRunningTests(false);
      const passedCount = results.filter((r) => r.passed).length;
      notify('FX Test Suite Completed', `${passedCount} of ${results.length} scenarios verified green.`, 'success');
    }, 600);
  };

  return (
    <div id="omni-fx-exchange-root" className="space-y-6">
      {/* Top Banner / Breadcrumb Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <Globe className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  OMNI Global FX & Multi-Currency Engine
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/40">
                    20+ Sovereign Rails
                  </span>
                </h1>
                <p className="text-sm text-slate-400">
                  Universal multi-currency ledger, live real-time rate normalization, zero-drift minor units, and atomic double-entry GL settlement.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Engine Status */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-right">
              <div className="text-xs text-slate-400 font-medium">FX Engine Switch</div>
              <div className="text-sm font-semibold text-emerald-400 flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {adminConfig.isEngineActive ? 'ONLINE (Active)' : 'PAUSED'}
              </div>
            </div>
            <button
              onClick={() => setActiveSubTab('test_suite')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition shadow-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run 8-Point Test Matrix
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'multi_wallet', label: 'Multi-Currency Wallets', icon: Landmark, badge: `${Object.keys(activeWallet.balances).length} Currencies` },
            { id: 'converter', label: 'Live FX Converter', icon: ArrowRightLeft, badge: 'Lock Rate' },
            { id: 'rates_matrix', label: 'Rates & Providers', icon: Activity, badge: '5 Feeds' },
            { id: 'business_treasury', label: 'Business FX & Exposure', icon: Building2, badge: 'VaR 95%' },
            { id: 'enterprise_settlement', label: 'Enterprise Treasury', icon: Scale, badge: 'Netting' },
            { id: 'ai_analyst', label: 'AI FX Market Intelligence', icon: Sparkles, badge: 'Strict Advisory' },
            { id: 'admin_control', label: 'FX Admin Centre', icon: Sliders, badge: 'Switchboard' },
            { id: 'test_suite', label: 'Automated Test Suite', icon: ShieldCheck, badge: '8 Scenarios' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as FxSubTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-indigo-700/80 text-white' : 'bg-slate-700/80 text-slate-300'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: MULTI-CURRENCY WALLETS */}
      {/* ========================================================================= */}
      {activeSubTab === 'multi_wallet' && (
        <div className="space-y-6">
          {/* Wallet Switcher & Aggregated Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Wallet Entity</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">
                  {activeWallet.ownerType}
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-medium">Switch Sovereign Portfolio</label>
                <select
                  value={selectedWalletId}
                  onChange={(e) => setSelectedWalletId(e.target.value)}
                  className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.ownerName} ({w.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Preferred Settlement:</span>
                <span className="font-bold text-slate-800">{activeWallet.preferredSettlementCurrency}</span>
              </div>
            </div>

            {/* Total Balance Aggregation (Consolidated USD) */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-indigo-200 font-medium">
                <span>Consolidated Net Worth (USD Equivalent)</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight">
                ${activeWallet.totalValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +2.4%
                </span>
                <span>FX market revaluation 30-day index</span>
              </div>
            </div>

            {/* Auto-Sweep & Treasury Automation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Treasury Auto-Sweep</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${activeWallet.autoSweepEnabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                  {activeWallet.autoSweepEnabled ? 'ACTIVE' : 'DISABLED'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Automatically converts non-base balances exceeding threshold into {activeWallet.autoSweepTargetCurrency || 'USD'} liquidity pool.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Threshold:</span>
                <span className="font-bold text-slate-800">${(activeWallet.autoSweepThresholdUsd || 0).toLocaleString()} USD</span>
              </div>
            </div>
          </div>

          {/* Currencies Sub-Accounts Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900">Multi-Currency Sub-Account Vaults</h3>
                <p className="text-xs text-slate-500">Granular breakdown of available, pending, and reserved balances across sovereign currencies.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAddCurrencyModalOpen(true)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Currency to Registry
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.values(activeWallet.balances).map((balance: MultiCurrencyBalance) => {
                const meta = currencies.find((c) => c.code === balance.currency);
                return (
                  <div
                    key={balance.currency}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-indigo-300 transition space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{meta?.flagEmoji || '🌐'}</span>
                        <div>
                          <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            {balance.currency}
                            <span className="text-xs font-normal text-slate-500">({meta?.symbol || balance.symbol})</span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[120px]">{meta?.name || balance.currency}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">
                        {balance.baseSharePct}% share
                      </span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">Available Balance</div>
                        <div className="text-lg font-extrabold text-slate-900">
                          {meta?.symbol} {balance.available.toLocaleString('en-US', { minimumFractionDigits: meta?.decimalPrecision ?? 2, maximumFractionDigits: meta?.decimalPrecision ?? 2 })}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          ≈ ${balance.usdEquivalent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500 border-t border-dashed border-slate-100">
                        <div>
                          <span>Pending: </span>
                          <span className="font-semibold text-slate-700">{balance.pending > 0 ? `${meta?.symbol}${balance.pending}` : '0.00'}</span>
                        </div>
                        <div>
                          <span>Reserved: </span>
                          <span className="font-semibold text-slate-700">{balance.reserved > 0 ? `${meta?.symbol}${balance.reserved}` : '0.00'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setFromCurrency(balance.currency);
                          setToCurrency(balance.currency === 'USD' ? 'EUR' : 'USD');
                          setFromAmountInput(balance.available > 0 ? Math.min(balance.available, 1000).toString() : '100');
                          setActiveSubTab('converter');
                          handleRequestQuote();
                        }}
                        className="w-full py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 hover:border-indigo-200 transition flex items-center justify-center gap-1.5"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        Convert {balance.currency}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent FX Transactions Audit Trail */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent FX Conversions & Settlements</h3>
                <p className="text-xs text-slate-500">Cryptographically verifiable transactions with double-entry general ledger links.</p>
              </div>
              <span className="text-xs text-slate-500">Total Recorded: {transactions.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                    <th className="py-3 px-4">Ref Number</th>
                    <th className="py-3 px-4">Conversion Flow</th>
                    <th className="py-3 px-4">Applied Rate</th>
                    <th className="py-3 px-4">Fee Charged</th>
                    <th className="py-3 px-4">Provider Rail</th>
                    <th className="py-3 px-4">GL Journal</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{tx.referenceNumber}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {tx.fromAmount.toLocaleString()} {tx.fromCurrency} <span className="text-indigo-500">➔</span> {tx.toAmount.toLocaleString()} {tx.toCurrency}
                        </div>
                        <div className="text-[10px] text-slate-500">{tx.purposeCode.replace('_', ' ')}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">{tx.appliedRate}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {tx.totalFeeCharged.toFixed(2)} {tx.feeCurrency} ({tx.feeStructure})
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{tx.providerName}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {tx.journalEntryId || 'JNL-AUTO-POSTED'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {tx.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-400">{new Date(tx.createdAt).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: LIVE FX CONVERTER TERMINAL */}
      {/* ========================================================================= */}
      {activeSubTab === 'converter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Interactive Conversion Terminal */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Universal FX Conversion Terminal</h3>
                <p className="text-xs text-slate-500">Real-time quote locking, automated fee tiers, and instant settlement.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Rate Guarantee:</span>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                  {adminConfig.rateLockValiditySeconds}s TTL
                </span>
              </div>
            </div>

            {/* Currency Inputs */}
            <div className="space-y-4">
              {/* Sell / From Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold uppercase tracking-wider">You Sell (Source Currency)</span>
                  <span>
                    Available:{' '}
                    <span className="font-bold text-slate-800">
                      {(activeWallet.balances[fromCurrency]?.available ?? 0).toLocaleString()} {fromCurrency}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="number"
                    value={fromAmountInput}
                    onChange={(e) => {
                      setFromAmountInput(e.target.value);
                      setActiveQuote(null);
                    }}
                    placeholder="0.00"
                    className="w-full text-2xl font-bold bg-transparent outline-none text-slate-900 placeholder:text-slate-300"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => {
                      setFromCurrency(e.target.value);
                      setActiveQuote(null);
                    }}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  >
                    {currencies
                      .filter((c) => c.status === 'active' && c.exchangeAvailability)
                      .map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flagEmoji} {c.code} ({c.name})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Swap Button Divider */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={handleSwapCurrencies}
                  className="p-2.5 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 hover:text-indigo-600 transition text-slate-600"
                  title="Swap currencies"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Buy / To Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold uppercase tracking-wider">You Receive (Target Currency)</span>
                  <span>
                    Current Balance:{' '}
                    <span className="font-bold text-slate-800">
                      {(activeWallet.balances[toCurrency]?.available ?? 0).toLocaleString()} {toCurrency}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {activeQuote ? activeQuote.toAmount.toLocaleString() : '---'}
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => {
                      setToCurrency(e.target.value);
                      setActiveQuote(null);
                    }}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  >
                    {currencies
                      .filter((c) => c.status === 'active' && c.exchangeAvailability)
                      .map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flagEmoji} {c.code} ({c.name})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Purpose & Compliance */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Conversion Purpose (ISO 20022 Compliance Code)</label>
              <select
                value={conversionPurpose}
                onChange={(e) => setConversionPurpose(e.target.value as any)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="treasury_rebalance">Treasury Rebalance & Liquidity Management</option>
                <option value="supplier_settlement">Cross-Border Supplier Settlement</option>
                <option value="invoice_payment">International Commercial Invoice Payment</option>
                <option value="payroll_disbursement">Multi-Jurisdiction Payroll Disbursement</option>
                <option value="travel_p2p">Travel & Cross-Border Sovereign Remittance</option>
                <option value="hedging">FX Risk Exposure Hedging</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleRequestQuote}
                disabled={isQuoting}
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isQuoting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Fetching Live Interbank Quote...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-400" />
                    Lock Live Guaranteed Rate
                  </>
                )}
              </button>

              {activeQuote && !activeQuote.isExpired && (
                <button
                  onClick={() => setPreviewModalOpen(true)}
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Review & Execute Conversion
                </button>
              )}
            </div>
          </div>

          {/* Live Quote Breakdown & Countdown Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {activeQuote ? (
              <div className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-sm space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live Rate Locked</span>
                  </div>
                  <div className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {quoteSecondsLeft}s remaining
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Applied Exchange Rate:</span>
                    <span className="font-mono font-bold text-slate-900">
                      1 {activeQuote.fromCurrency} = {activeQuote.appliedRate} {activeQuote.toCurrency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Mid-Market Reference Rate:</span>
                    <span className="font-mono text-slate-700">
                      1 {activeQuote.fromCurrency} = {activeQuote.midMarketRate} {activeQuote.toCurrency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Spread Markup:</span>
                    <span className="font-mono text-slate-700">{activeQuote.spreadBps} bps</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Fee Tier Applied:</span>
                    <span className="font-semibold text-indigo-600 capitalize">{activeQuote.feeTier.replace('_', ' ')}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Total Fee Charged:</span>
                    <span className="font-bold text-slate-900">
                      {activeQuote.totalFeeCharged.toFixed(2)} {activeQuote.feeCurrency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Provider Clearing Rail:</span>
                    <span className="font-medium text-slate-800">{activeQuote.providerUsed}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-slate-900">
                    <span>Net Amount Received:</span>
                    <span className="text-emerald-600 font-extrabold text-base">
                      {activeQuote.toAmount.toLocaleString()} {activeQuote.toCurrency}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Zero slippage guarantee. Double-entry general ledger journal will post atomically to GL 2050 and GL 4030.
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">No Active Quote Locked</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Select your desired currency pair and click <strong>"Lock Live Guaranteed Rate"</strong> to generate a binding 120-second quote.
                </p>
              </div>
            )}

            {/* Sovereign FX Rules & Settlement Corridors */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Corridor Settlement Standards</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>USD / EUR (Transatlantic)</span>
                  <span className="text-emerald-600 font-semibold">Instant (SEPA / FedNow)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>USD / NGN (African Corridor)</span>
                  <span className="text-emerald-600 font-semibold">&lt; 30s (NIBSS Instant)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>USD / GBP (Sterling Direct)</span>
                  <span className="text-emerald-600 font-semibold">Instant (Faster Payments)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>USD / AED (Pegged Settlement)</span>
                  <span className="text-emerald-600 font-semibold">Fixed Rate (3.6725)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: RATES MATRIX & PROVIDERS */}
      {/* ========================================================================= */}
      {activeSubTab === 'rates_matrix' && (
        <div className="space-y-6">
          {/* Top Rates Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sovereign FX Rates & Provider Feeds</h3>
              <p className="text-xs text-slate-500">Live interbank orderbook, institutional bid/ask spreads, and 24-hour volatility metrics.</p>
            </div>
            <button
              onClick={() => {
                notify('Rates Refreshed', 'Live streaming FX rate feeds updated from ECB, Refinitiv, and Wise.', 'info');
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Rates Now
            </button>
          </div>

          {/* Rates Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                    <th className="py-3.5 px-4">Currency Pair</th>
                    <th className="py-3.5 px-4">Mid-Market Rate</th>
                    <th className="py-3.5 px-4">Customer Buy</th>
                    <th className="py-3.5 px-4">Customer Sell</th>
                    <th className="py-3.5 px-4">Spread</th>
                    <th className="py-3.5 px-4">24h Change</th>
                    <th className="py-3.5 px-4">Provider Feed</th>
                    <th className="py-3.5 px-4">Volatility</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rates.map((rate) => {
                    const isPositive = rate.change24hPct >= 0;
                    return (
                      <tr key={rate.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <span className="font-mono">{rate.pair}</span>
                          <span className="text-[10px] text-slate-400">({rate.source.replace('_', ' ')})</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{rate.omniReferenceRate}</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">{rate.buyRate}</td>
                        <td className="py-3.5 px-4 font-mono text-rose-600 font-semibold">{rate.sellRate}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-mono">{rate.spreadBps} bps</td>
                        <td className="py-3.5 px-4 font-semibold">
                          <span className={`flex items-center gap-0.5 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {rate.change24hPct > 0 ? `+${rate.change24hPct}%` : `${rate.change24hPct}%`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{rate.providerName}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rate.volatilityStatus === 'calm'
                              ? 'bg-blue-50 text-blue-700'
                              : rate.volatilityStatus === 'normal'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {rate.volatilityStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setFromCurrency(rate.baseCurrency);
                              setToCurrency(rate.quoteCurrency);
                              setActiveSubTab('converter');
                              handleRequestQuote();
                            }}
                            className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs transition"
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connected Providers Status Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {providers.map((prov) => (
              <div key={prov.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 truncate max-w-[130px]">{prov.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] text-slate-500">Type: <span className="font-semibold text-slate-700">{prov.type.replace('_', ' ')}</span></div>
                <div className="text-[11px] text-slate-500">Latency: <span className="font-mono font-semibold text-slate-700">{prov.latencyMs}ms</span></div>
                <div className="text-[11px] text-slate-500">Reliability: <span className="font-bold text-emerald-600">{prov.reliabilityScore}%</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: BUSINESS FX & EXPOSURE */}
      {/* ========================================================================= */}
      {activeSubTab === 'business_treasury' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1-Day VaR Risk Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">1-Day Value at Risk (VaR 95%)</span>
                <ShieldAlert className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                ${businessExposure.valueAtRisk95_1DayUsd.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">
                Maximum expected 24h currency fluctuation loss with 95% statistical confidence across unhedged positions.
              </p>
            </div>

            {/* Hedging Ratio */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">Portfolio Hedging Ratio</span>
                <BadgePercent className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-3xl font-extrabold text-indigo-600">
                {businessExposure.hedgingRatioPct}%
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${businessExposure.hedgingRatioPct}%` }} />
              </div>
            </div>

            {/* Upcoming Foreign Payables */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider">Open Foreign Invoices</span>
                <FileText className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {businessExposure.upcomingForeignObligations.length} Invoices
              </div>
              <p className="text-xs text-slate-500">
                Cross-border supplier invoices requiring settlement over the next 30 days.
              </p>
            </div>
          </div>

          {/* Foreign Holdings Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Foreign Currency Holdings & Unhedged Exposure</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                    <th className="py-3 px-4">Currency</th>
                    <th className="py-3 px-4">Holding Amount</th>
                    <th className="py-3 px-4">USD Value</th>
                    <th className="py-3 px-4">Portfolio Share</th>
                    <th className="py-3 px-4">Hedged Amount</th>
                    <th className="py-3 px-4">Unrealized FX Gain/Loss</th>
                    <th className="py-3 px-4 text-right">30d Volatility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {businessExposure.currencyHoldings.map((h) => (
                    <tr key={h.currency} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{h.currency}</td>
                      <td className="py-3.5 px-4 font-mono">{h.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold">${h.usdValue.toLocaleString()}</td>
                      <td className="py-3.5 px-4">{h.weightPct}%</td>
                      <td className="py-3.5 px-4 font-mono">${h.hedgedAmount.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className={`font-semibold ${h.fxGainLossUnrealizedUsd >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {h.fxGainLossUnrealizedUsd >= 0 ? `+$${h.fxGainLossUnrealizedUsd}` : `-$${Math.abs(h.fxGainLossUnrealizedUsd)}`}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono">{h.volatility30d}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Obligations List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Upcoming International Supplier Obligations</h3>
            <div className="space-y-3">
              {businessExposure.upcomingForeignObligations.map((obl) => (
                <div key={obl.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{obl.supplierName} ({obl.invoiceNumber})</div>
                    <div className="text-xs text-slate-500">
                      Due in <span className="font-semibold text-slate-700">{obl.dueDays} days</span> • Foreign Amount: <span className="font-mono font-bold text-slate-800">{obl.foreignAmount.toLocaleString()} {obl.currency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-xs">
                      <div className="font-bold text-slate-900">${obl.currentUsdValue.toLocaleString()} USD</div>
                      <div className={`text-[11px] font-semibold ${obl.fxVarianceUsd >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        FX Variance: {obl.fxVarianceUsd >= 0 ? `+$${obl.fxVarianceUsd}` : `-$${Math.abs(obl.fxVarianceUsd)}`}
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      obl.hedgedStatus === 'fully_locked'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : obl.hedgedStatus === 'partially_hedged'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {obl.hedgedStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: ENTERPRISE GLOBAL TREASURY */}
      {/* ========================================================================= */}
      {activeSubTab === 'enterprise_settlement' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Enterprise Multi-Entity Treasury</span>
                <h3 className="text-xl font-extrabold">{enterprisePlan.period}</h3>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-right">
                <div className="text-xs text-indigo-200">Projected Netting Savings</div>
                <div className="text-2xl font-bold text-emerald-400">+${enterprisePlan.netCrossBorderSavingsUsd.toLocaleString()} USD</div>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              Multilateral netting automatically clears cross-border balances between OMNI subsidiaries, reducing foreign exchange friction and correspondent banking transfer fees.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Scheduled Multilateral Settlements</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                    <th className="py-3 px-4">Subsidiary Entity</th>
                    <th className="py-3 px-4">Corridor</th>
                    <th className="py-3 px-4">Volume</th>
                    <th className="py-3 px-4">Execution Strategy</th>
                    <th className="py-3 px-4">Target Date</th>
                    <th className="py-3 px-4">Projected Savings</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enterprisePlan.plannedSettlements.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.subsidiaryName}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{item.corridor}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold">{item.volume.toLocaleString()} {item.sourceCurrency}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {item.strategy.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{item.targetDate}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600">+${item.projectedSavingsUsd.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {item.status.toUpperCase()}
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
      {/* SUB-TAB 6: AI FX MARKET INTELLIGENCE (STRICT READ-ONLY) */}
      {/* ========================================================================= */}
      {activeSubTab === 'ai_analyst' && (
        <div className="space-y-6">
          {/* Strict Compliance Banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Strict AI Guardrails & Read-Only Policy</h4>
              <p className="text-xs text-amber-800">
                OMNI AI operates strictly as an explanatory and analytical assistant. AI has zero cryptographic permission to execute FX trades, alter exchange rates, or mutate the double-entry general ledger.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-bold text-slate-900">{insight.currencyPair}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {insight.confidenceScore}% Confidence
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800">{insight.analysisTitle}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.movementSummary}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Key Macro Drivers</div>
                  <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                    {insight.macroDrivers.map((driver, idx) => (
                      <li key={idx} className="leading-snug">{driver}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800">Hedging Recommendation:</div>
                  <div className="text-slate-600">{insight.hedgingRecommendation}</div>
                </div>

                <div className="text-[10px] text-slate-400 italic text-center">
                  {insight.readOnlyDisclaimer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 7: SUPER ADMIN FX SWITCHBOARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'admin_control' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Super Admin FX Administration Switchboard</h3>
              <p className="text-xs text-slate-500">Configure global rate spreads, fee tiers, limits, country restrictions, and emergency circuit breaker.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              {/* Master Engine Toggle */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Global FX Engine Status</span>
                  <input
                    type="checkbox"
                    checked={adminConfig.isEngineActive}
                    onChange={(e) => {
                      setAdminConfig((prev) => ({ ...prev, isEngineActive: e.target.checked }));
                      notify('Admin Updated', `FX Engine is now ${e.target.checked ? 'ACTIVE' : 'PAUSED'}`, 'info');
                    }}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                </div>
                <p className="text-xs text-slate-500">Active by default. Super Admin can pause all quote requests and conversions globally.</p>
              </div>

              {/* Emergency Circuit Breaker */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900">Emergency Rate Circuit Breaker</span>
                  <input
                    type="checkbox"
                    checked={adminConfig.emergencyCircuitBreakerActive}
                    onChange={(e) => {
                      setAdminConfig((prev) => ({ ...prev, emergencyCircuitBreakerActive: e.target.checked }));
                      notify('Circuit Breaker', e.target.checked ? 'EMERGENCY CIRCUIT BREAKER ACTIVATED' : 'Circuit breaker disengaged.', 'error');
                    }}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                </div>
                <p className="text-xs text-rose-700">Instantly freezes all conversions in the event of extreme currency black swan market events.</p>
              </div>

              {/* Rate Lock Validity Duration */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <label className="text-xs font-bold text-slate-800">Quote Lock Validity (Seconds)</label>
                <input
                  type="number"
                  value={adminConfig.rateLockValiditySeconds}
                  onChange={(e) => setAdminConfig((prev) => ({ ...prev, rateLockValiditySeconds: parseInt(e.target.value) || 60 }))}
                  className="w-full text-xs font-bold bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                />
                <p className="text-[11px] text-slate-500">Guaranteed rate window before expiration.</p>
              </div>
            </div>

            {/* Currencies Management Table in Admin */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Currency Registry Switchboard ({currencies.length} Supported)</h4>
                <button
                  onClick={() => setAddCurrencyModalOpen(true)}
                  className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Currency
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                      <th className="py-2 px-3">Code</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Country</th>
                      <th className="py-2 px-3">Decimals</th>
                      <th className="py-2 px-3">Settlement</th>
                      <th className="py-2 px-3">Exchange</th>
                      <th className="py-2 px-3">Risk</th>
                      <th className="py-2 px-3 text-right">Toggle Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currencies.map((c) => (
                      <tr key={c.code} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{c.flagEmoji}</span>
                          <span>{c.code}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">{c.name}</td>
                        <td className="py-2.5 px-3 text-slate-600">{c.country}</td>
                        <td className="py-2.5 px-3 font-mono">{c.decimalPrecision}</td>
                        <td className="py-2.5 px-3">
                          <span className={c.settlementAvailability ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {c.settlementAvailability ? 'YES' : 'NO'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={c.exchangeAvailability ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                            {c.exchangeAvailability ? 'YES' : 'BLOCKED'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.riskClassification === 'low'
                              ? 'bg-emerald-50 text-emerald-700'
                              : c.riskClassification === 'moderate'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}>
                            {c.riskClassification.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => {
                              setCurrencies((prev) =>
                                prev.map((item) =>
                                  item.code === c.code
                                    ? {
                                        ...item,
                                        exchangeAvailability: !item.exchangeAvailability,
                                        status: item.exchangeAvailability ? 'restricted' : 'active'
                                      }
                                    : item
                                )
                              );
                              notify('Currency Toggled', `${c.code} exchange availability toggled.`, 'info');
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              c.exchangeAvailability
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            }`}
                          >
                            {c.exchangeAvailability ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 8: AUTOMATED 8-SCENARIO TEST SUITE */}
      {/* ========================================================================= */}
      {activeSubTab === 'test_suite' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">OMNI FX 8-Point Mission-Critical Test Matrix</h3>
                <p className="text-xs text-slate-500">
                  Comprehensive automated validation verifying zero floating-point math drift, rate lock timeouts, double-conversion protection, double-entry GL ledger balance, and sanctions enforcement.
                </p>
              </div>
              <button
                onClick={handleRunTests}
                disabled={isRunningTests}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                {isRunningTests ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executing Test Matrix...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Execute All 8 Verification Tests
                  </>
                )}
              </button>
            </div>

            {testResults.length > 0 ? (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {testResults.map((test, index) => (
                  <div
                    key={test.testId}
                    className={`p-4 rounded-xl border transition ${
                      test.passed ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {test.passed ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-rose-600" />
                        )}
                        <span className="text-xs font-bold text-slate-900">
                          {index + 1}. {test.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{test.durationMs}ms</span>
                    </div>
                    <div className="mt-2 pl-7 space-y-1">
                      <div className="text-xs text-slate-600">{test.scenario}</div>
                      <div className="text-xs font-mono font-semibold text-slate-800">{test.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center border border-dashed border-slate-300 space-y-3">
                <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
                <div className="text-sm font-bold text-slate-700">Test Matrix Ready for Execution</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the button above to run all 8 automated scenarios against the in-memory ledger and multi-currency exchange engine.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: PREVIEW & CONFIRM CONVERSION */}
      {/* ========================================================================= */}
      {previewModalOpen && activeQuote && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Confirm FX Conversion</h4>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">You are selling:</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {activeQuote.fromAmount.toLocaleString()} {activeQuote.fromCurrency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">You will receive:</span>
                  <span className="font-extrabold text-emerald-600 text-sm">
                    {activeQuote.toAmount.toLocaleString()} {activeQuote.toCurrency}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-indigo-100/60">
                  <span className="text-slate-500">Locked Rate:</span>
                  <span className="font-mono font-bold text-slate-800">
                    1 {activeQuote.fromCurrency} = {activeQuote.appliedRate} {activeQuote.toCurrency}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 px-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Fee Charged:</span>
                  <span className="font-semibold text-slate-900">
                    {activeQuote.totalFeeCharged.toFixed(2)} {activeQuote.feeCurrency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Target Wallet:</span>
                  <span className="font-semibold text-slate-900">{activeWallet.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>GL Posting Mode:</span>
                  <span className="font-semibold text-indigo-600">Atomic Double-Entry (GL 2050 / 4030)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConversion}
                disabled={isExecuting}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Confirm & Execute
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CRYPTOGRAPHIC RECEIPT MODAL */}
      {/* ========================================================================= */}
      {receiptModalOpen && lastExecutedTx && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h4 className="text-base font-bold text-slate-900">Cryptographic FX Receipt</h4>
              </div>
              <button
                onClick={() => setReceiptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Ref:</span>
                <span className="font-bold text-slate-900">{lastExecutedTx.referenceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sold:</span>
                <span className="font-bold text-rose-600">
                  -{lastExecutedTx.fromAmount.toLocaleString()} {lastExecutedTx.fromCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Purchased:</span>
                <span className="font-bold text-emerald-600">
                  +{lastExecutedTx.toAmount.toLocaleString()} {lastExecutedTx.toCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Applied Rate:</span>
                <span className="text-slate-800">{lastExecutedTx.appliedRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Double-Entry Journal:</span>
                <span className="text-indigo-600">{lastExecutedTx.journalEntryId}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px]">Merkle Proof Hash:</span>
                <div className="text-[10px] break-all text-slate-700 bg-white p-2 rounded border border-slate-200">
                  {lastExecutedTx.merkleReceiptHash}
                </div>
              </div>
            </div>

            <button
              onClick={() => setReceiptModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD DYNAMIC CURRENCY TO REGISTRY */}
      {/* ========================================================================= */}
      {addCurrencyModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddCurrency} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Add Currency to Dynamic Registry</h4>
              <button
                type="button"
                onClick={() => setAddCurrencyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Currency Code (ISO)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JOD"
                    maxLength={4}
                    value={newCurrencyCode}
                    onChange={(e) => setNewCurrencyCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold uppercase mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Symbol</label>
                  <input
                    type="text"
                    placeholder="e.g. JD"
                    value={newCurrencySymbol}
                    onChange={(e) => setNewCurrencySymbol(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 mt-1 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Currency Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordanian Dinar"
                  value={newCurrencyName}
                  onChange={(e) => setNewCurrencyName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 mt-1 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Jordan"
                    value={newCurrencyCountry}
                    onChange={(e) => setNewCurrencyCountry(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 mt-1 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Flag Emoji</label>
                  <input
                    type="text"
                    placeholder="🇯🇴"
                    value={newCurrencyFlag}
                    onChange={(e) => setNewCurrencyFlag(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-center mt-1 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Region</label>
                  <select
                    value={newCurrencyRegion}
                    onChange={(e) => setNewCurrencyRegion(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 mt-1 outline-none"
                  >
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Latin America">Latin America</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Decimals (Precision)</label>
                  <input
                    type="number"
                    min={0}
                    max={4}
                    value={newCurrencyDecimals}
                    onChange={(e) => setNewCurrencyDecimals(parseInt(e.target.value) || 2)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 mt-1 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAddCurrencyModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-md"
              >
                Save Currency
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OmniFxExchangeExplorer;
