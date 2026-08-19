// ============================================================================
// OMNI COMMERCE FINANCIAL SETTLEMENT ENGINE - EXPLORER & COMMAND CENTER
// Powering Marketplace, Ads, Creator Economy, Affiliate, Subscriptions & Payouts
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  Store,
  DollarSign,
  TrendingUp,
  Users,
  Percent,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Zap,
  Lock,
  FileText,
  Sliders,
  Send,
  Layers,
  Sparkles,
  Bot,
  Play,
  RotateCcw,
  Clock,
  Radio,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  PlusCircle,
  HelpCircle,
  Briefcase,
  Award,
  BookOpen,
  Tv,
  HeartHandshake
} from 'lucide-react';

import {
  CommerceFinancialAccount,
  RevenueSplitRule,
  CommerceSettlementTransaction,
  AdsCampaignBudget,
  AffiliateLinkRecord,
  AffiliateCommissionItem,
  CommerceSubscriptionRecord,
  PayoutDisbursementItem,
  CommerceRefundOrDispute,
  SuperAdminCommerceConfig,
  CommerceAiInsight,
  CommerceTestScenarioResult,
  CommerceAccountRole,
  CommerceModuleSource,
  CommerceProductType,
  PayoutRailType
} from '../../types/omni_commerce_settlement';

import {
  FinanceLedgerAccount,
  FinanceJournalEntry,
  PaymentRail
} from '../../types/finance_os';

import {
  SEED_COMMERCE_ACCOUNTS,
  SEED_REVENUE_SPLIT_RULES,
  SEED_COMMERCE_TRANSACTIONS,
  SEED_ADS_CAMPAIGNS,
  SEED_AFFILIATE_LINKS,
  SEED_AFFILIATE_COMMISSIONS,
  SEED_SUBSCRIPTIONS,
  SEED_PAYOUT_DISBURSEMENTS,
  SEED_REFUNDS_DISPUTES,
  SEED_SUPER_ADMIN_COMMERCE_CONFIG,
  SEED_COMMERCE_AI_INSIGHTS,
  executeCommerceTransaction,
  releaseEscrowToAvailable,
  processCommerceRefund,
  executePayoutDisbursement,
  OmniCommerceTestHarness,
  calculateRevenueSplit
} from '../../engine/omni_commerce_engine';

export type CommerceSubTab =
  | 'overview'
  | 'accounts'
  | 'split_rules'
  | 'marketplace'
  | 'ads_network'
  | 'affiliate_hub'
  | 'subscriptions'
  | 'payouts'
  | 'refunds_disputes'
  | 'ai_copilot'
  | 'admin_control'
  | 'test_suite';

interface OmniCommerceSettlementExplorerProps {
  ledgerAccounts?: FinanceLedgerAccount[];
  journalEntries?: FinanceJournalEntry[];
  onAddJournalEntry?: (entry: FinanceJournalEntry) => void;
  showToast?: (message: string) => void;
}

export const OmniCommerceSettlementExplorer: React.FC<OmniCommerceSettlementExplorerProps> = ({
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
  const [activeSubTab, setActiveSubTab] = useState<CommerceSubTab>('overview');
  const [accounts, setAccounts] = useState<CommerceFinancialAccount[]>(SEED_COMMERCE_ACCOUNTS);
  const [rules, setRules] = useState<RevenueSplitRule[]>(SEED_REVENUE_SPLIT_RULES);
  const [transactions, setTransactions] = useState<CommerceSettlementTransaction[]>(SEED_COMMERCE_TRANSACTIONS);
  const [adsCampaigns, setAdsCampaigns] = useState<AdsCampaignBudget[]>(SEED_ADS_CAMPAIGNS);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLinkRecord[]>(SEED_AFFILIATE_LINKS);
  const [affiliateCommissions, setAffiliateCommissions] = useState<AffiliateCommissionItem[]>(SEED_AFFILIATE_COMMISSIONS);
  const [subscriptions, setSubscriptions] = useState<CommerceSubscriptionRecord[]>(SEED_SUBSCRIPTIONS);
  const [payouts, setPayouts] = useState<PayoutDisbursementItem[]>(SEED_PAYOUT_DISBURSEMENTS);
  const [refundsDisputes, setRefundsDisputes] = useState<CommerceRefundOrDispute[]>(SEED_REFUNDS_DISPUTES);
  const [adminConfig, setAdminConfig] = useState<SuperAdminCommerceConfig>(SEED_SUPER_ADMIN_COMMERCE_CONFIG);
  const [aiInsights] = useState<CommerceAiInsight[]>(SEED_COMMERCE_AI_INSIGHTS);

  // Test Runner State
  const [testResults, setTestResults] = useState<CommerceTestScenarioResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Modals State
  const [isSimulateOrderOpen, setIsSimulateOrderOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<CommerceSettlementTransaction | null>(null);

  // Simulation Form State
  const [simProductType, setSimProductType] = useState<CommerceProductType>('course');
  const [simGrossAmount, setSimGrossAmount] = useState('499.00');
  const [simBuyerName, setSimBuyerName] = useState('Alex Mercer');
  const [simBuyerEmail, setSimBuyerEmail] = useState('alex.mercer@enterprise.io');
  const [simSellerAccountId, setSimSellerAccountId] = useState('comm_acc_learn_institute');
  const [simAffiliateCode, setSimAffiliateCode] = useState('GROWTH_OMNI_2026');
  const [simPaymentRail, setSimPaymentRail] = useState<PaymentRail>('fednow');

  // Payout Form State
  const [payoutAccountId, setPayoutAccountId] = useState('comm_acc_maya_creator');
  const [payoutAmountInput, setPayoutAmountInput] = useState('5000.00');
  const [payoutRailInput, setPayoutRailInput] = useState<PayoutRailType>('bank_fednow');

  // Refund Form State
  const [selectedTxForRefund, setSelectedTxForRefund] = useState<CommerceSettlementTransaction | null>(null);
  const [refundTypeInput, setRefundTypeInput] = useState<'full_refund' | 'partial_refund' | 'chargeback'>('full_refund');
  const [refundAmountInput, setRefundAmountInput] = useState('499.00');
  const [refundReasonInput, setRefundReasonInput] = useState('Buyer requested cancellation');

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Computed Totals
  const totalGmv = useMemo(() => {
    return transactions.reduce((acc, t) => acc + t.grossAmount, 0) + 1150000;
  }, [transactions]);

  const totalPlatformFees = useMemo(() => {
    return transactions.reduce((acc, t) => acc + t.platformFeeAmount, 0) + 143500;
  }, [transactions]);

  const totalEscrowHolding = useMemo(() => {
    return accounts.reduce((acc, a) => acc + a.escrowBalance, 0);
  }, [accounts]);

  const totalAvailableBalances = useMemo(() => {
    return accounts.reduce((acc, a) => acc + a.availableBalance, 0);
  }, [accounts]);

  // Handlers
  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      const results = OmniCommerceTestHarness.runAllTests(adminConfig);
      setTestResults(results);
      setIsRunningTests(false);
      const passedCount = results.filter((r) => r.passed).length;
      notify('Test Matrix Complete', `${passedCount} of ${results.length} commerce settlement tests passed green.`, 'success');
    }, 600);
  };

  const handleSimulateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const gross = parseFloat(simGrossAmount);
    if (isNaN(gross) || gross <= 0) {
      notify('Invalid Amount', 'Please enter a valid positive numeric amount.', 'error');
      return;
    }

    const seller = accounts.find((a) => a.id === simSellerAccountId);
    if (!seller) {
      notify('Error', 'Selected seller account not found.', 'error');
      return;
    }

    const matchedRule = rules.find((r) => r.productType === simProductType) || rules[0];
    const affiliate = affiliateLinks.find((l) => l.affiliateCode === simAffiliateCode);

    let moduleSource: CommerceModuleSource = 'omni_marketplace';
    if (simProductType === 'course') moduleSource = 'omni_learn';
    else if (simProductType === 'creator_membership' || simProductType === 'creator_tip') moduleSource = 'omni_creator';
    else if (simProductType === 'ad_campaign_cpc_cpm') moduleSource = 'omni_ads';

    const res = executeCommerceTransaction({
      tenantId: 'omni_global_holding',
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      moduleSource,
      productType: simProductType,
      productTitle: `${matchedRule.name} — Live Settlement Order`,
      buyerUserId: `usr_${Date.now()}`,
      buyerName: simBuyerName,
      buyerEmail: simBuyerEmail,
      currency: seller.currency,
      grossAmount: gross,
      sellerAccountId: seller.id,
      sellerName: seller.displayName,
      affiliateAccountId: affiliate ? affiliate.affiliateAccountId : undefined,
      affiliateCode: affiliate ? affiliate.affiliateCode : undefined,
      affiliateName: affiliate ? affiliate.affiliateName : undefined,
      paymentMethod: `${simPaymentRail.toUpperCase()} Direct Inbound`,
      paymentRail: simPaymentRail,
      rule: matchedRule,
      adminConfig
    });

    if (res.success && res.transaction) {
      setTransactions((prev) => [res.transaction!, ...prev]);
      if (res.journalEntry && onAddJournalEntry) {
        onAddJournalEntry(res.journalEntry);
      }
      if (res.affiliateCommission) {
        setAffiliateCommissions((prev) => [res.affiliateCommission!, ...prev]);
      }

      // Update seller balances
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === seller.id) {
            return {
              ...acc,
              totalGrossRevenue: acc.totalGrossRevenue + gross,
              totalFeesPaid: acc.totalFeesPaid + res.transaction!.platformFeeAmount,
              escrowBalance: acc.escrowBalance + res.transaction!.sellerNetShare,
              updatedAt: new Date().toISOString()
            };
          }
          return acc;
        })
      );

      setIsSimulateOrderOpen(false);
      setSelectedTxForReceipt(res.transaction);
      setIsReceiptModalOpen(true);
      notify('Order Processed', `Order ${res.transaction.orderNumber} successfully processed & locked in escrow.`, 'success');
    } else {
      notify('Transaction Failed', res.error || 'Failed to execute commerce settlement.', 'error');
    }
  };

  const handleReleaseEscrow = (tx: CommerceSettlementTransaction) => {
    const res = releaseEscrowToAvailable(tx, 'omni_global_holding');
    if (res.success) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === tx.id ? res.updatedTransaction : t))
      );
      if (res.journalEntry && onAddJournalEntry) {
        onAddJournalEntry(res.journalEntry);
      }

      // Move from escrow to available balance
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === tx.sellerAccountId) {
            return {
              ...acc,
              escrowBalance: Math.max(0, acc.escrowBalance - tx.sellerNetShare),
              availableBalance: acc.availableBalance + tx.sellerNetShare,
              updatedAt: new Date().toISOString()
            };
          }
          return acc;
        })
      );

      notify('Escrow Released', `Funds ($${tx.sellerNetShare.toFixed(2)}) moved to ${tx.sellerName}'s available balance.`, 'success');
    }
  };

  const handleExecutePayout = (e: React.FormEvent) => {
    e.preventDefault();
    const reqAmount = parseFloat(payoutAmountInput);
    const targetAccount = accounts.find((a) => a.id === payoutAccountId);

    if (!targetAccount) {
      notify('Error', 'Selected payout account not found.', 'error');
      return;
    }

    const res = executePayoutDisbursement({
      tenantId: 'omni_global_holding',
      account: targetAccount,
      requestedAmount: reqAmount,
      payoutRail: payoutRailInput,
      adminConfig
    });

    if (res.success && res.payoutItem && res.updatedAccount) {
      setPayouts((prev) => [res.payoutItem!, ...prev]);
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === targetAccount.id ? res.updatedAccount! : acc))
      );
      if (res.journalEntry && onAddJournalEntry) {
        onAddJournalEntry(res.journalEntry);
      }
      setIsPayoutModalOpen(false);
      notify('Payout Disbursed', `Disbursed $${res.payoutItem.netDisbursedAmount.toFixed(2)} to ${targetAccount.displayName} via ${payoutRailInput}.`, 'success');
    } else {
      notify('Payout Failed', res.error || 'Failed to process payout.', 'error');
    }
  };

  const handleExecuteRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTxForRefund) return;

    const refAmount = parseFloat(refundAmountInput);
    const res = processCommerceRefund({
      tenantId: 'omni_global_holding',
      transaction: selectedTxForRefund,
      refundType: refundTypeInput,
      refundAmount: refAmount,
      reason: refundReasonInput
    });

    if (res.success && res.refundRecord) {
      setRefundsDisputes((prev) => [res.refundRecord!, ...prev]);
      if (res.journalEntry && onAddJournalEntry) {
        onAddJournalEntry(res.journalEntry);
      }

      // Mark transaction status
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === selectedTxForRefund.id) {
            return {
              ...t,
              status: refundTypeInput === 'full_refund' ? 'fully_refunded' : refundTypeInput === 'chargeback' ? 'chargeback_reversed' : 'partially_refunded',
              refundedAt: new Date().toISOString()
            };
          }
          return t;
        })
      );

      // Clawback from seller account
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === selectedTxForRefund.sellerAccountId) {
            return {
              ...acc,
              availableBalance: Math.max(0, acc.availableBalance - res.refundRecord!.sellerClawbackAmount),
              updatedAt: new Date().toISOString()
            };
          }
          return acc;
        })
      );

      setIsRefundModalOpen(false);
      notify('Refund Executed', `${refundTypeInput.toUpperCase()} of $${refAmount.toFixed(2)} processed with balanced GL clawback.`, 'success');
    } else {
      notify('Refund Failed', res.error || 'Failed to process refund.', 'error');
    }
  };

  return (
    <div id="omni-commerce-settlement-explorer" className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-bold tracking-tight text-white">OMNI Commerce Financial Settlement Engine</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ACTIVE BY DEFAULT
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Unified financial infrastructure powering Marketplace, OMNI Ads, Creator Economy, Affiliates, Learn & Payouts
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsSimulateOrderOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md hover:shadow-indigo-500/20 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Simulate Commerce Order
            </button>
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition active:scale-95"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              Request Payout
            </button>
            <button
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md transition active:scale-95 disabled:opacity-50"
            >
              <Play className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              {isRunningTests ? 'Running Test Matrix...' : 'Run 8-Scenario Tests'}
            </button>
          </div>
        </div>

        {/* Metric Quick Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <p className="text-[11px] font-medium text-slate-400">Total Economy GMV</p>
            <p className="text-lg font-bold text-white mt-0.5">${totalGmv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +24.8% this month
            </p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <p className="text-[11px] font-medium text-slate-400">Platform Revenue</p>
            <p className="text-lg font-bold text-indigo-300 mt-0.5">${totalPlatformFees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Blended Take: 12.4%</p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <p className="text-[11px] font-medium text-slate-400">In-Escrow Holding</p>
            <p className="text-lg font-bold text-amber-300 mt-0.5">${totalEscrowHolding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-amber-400/80 mt-0.5">72h clearing window</p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <p className="text-[11px] font-medium text-slate-400">Seller Available Balances</p>
            <p className="text-lg font-bold text-emerald-300 mt-0.5">${totalAvailableBalances.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-emerald-400/80 mt-0.5">Cleared for instant payout</p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <p className="text-[11px] font-medium text-slate-400">Active Commerce Accounts</p>
            <p className="text-lg font-bold text-white mt-0.5">{accounts.length} Accounts</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Creators, Sellers, Ads</p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <p className="text-[11px] font-medium text-slate-400">Ledger Assurance</p>
            <p className="text-lg font-bold text-cyan-300 mt-0.5">100% Balanced</p>
            <p className="text-[10px] text-cyan-400/80 mt-0.5">SHA-256 Merkle verified</p>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'overview', label: 'Economy Overview', icon: Layers },
          { id: 'accounts', label: 'Commerce Accounts', icon: Users, badge: accounts.length },
          { id: 'split_rules', label: 'Split Rules Engine', icon: Percent },
          { id: 'marketplace', label: 'Marketplace & Learn', icon: Store, badge: transactions.length },
          { id: 'ads_network', label: 'OMNI Ads Financials', icon: Tv },
          { id: 'affiliate_hub', label: 'Affiliate Hub', icon: HeartHandshake, badge: affiliateLinks.length },
          { id: 'subscriptions', label: 'Subscriptions', icon: RotateCcw, badge: subscriptions.length },
          { id: 'payouts', label: 'Payouts & Rails', icon: Send, badge: payouts.length },
          { id: 'refunds_disputes', label: 'Refunds & Disputes', icon: AlertTriangle, badge: refundsDisputes.length },
          { id: 'ai_copilot', label: 'AI Revenue Intel', icon: Bot },
          { id: 'admin_control', label: 'Super Admin Control', icon: Sliders },
          { id: 'test_suite', label: 'Test Matrix', icon: ShieldCheck, badge: testResults.length > 0 ? `${testResults.filter(t => t.passed).length}/8` : '8' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as CommerceSubTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT */}

      {/* ------------------------------------------------------------- */}
      {/* OVERVIEW TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Economy Flow Diagram Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">OMNI Universal Settlement Pipeline</h3>
                <p className="text-xs text-slate-500">Every economic transaction flows through OMNI Finance with double-entry ledger precision</p>
              </div>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
                Continuous Real-Time Clearing
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 relative items-center text-center">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">1</div>
                <p className="text-xs font-bold text-slate-900">Customer Payment</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Card / FedNow / SEPA / Crypto</p>
              </div>

              <div className="hidden md:flex justify-center text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-xs">2</div>
                <p className="text-xs font-bold text-slate-900">Transaction Verification</p>
                <p className="text-[10px] text-slate-500 mt-0.5">KYC / Anti-Fraud / Risk</p>
              </div>

              <div className="hidden md:flex justify-center text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">3</div>
                <p className="text-xs font-bold text-slate-900">Multi-Party Split</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Creator / Platform / Affiliate</p>
              </div>

              <div className="hidden md:flex justify-center text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs">4</div>
                <p className="text-xs font-bold text-emerald-900">Escrow & GL Ledger</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">Balanced Postings + Payout</p>
              </div>
            </div>
          </div>

          {/* Module Ecosystem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">OMNI Marketplace</h4>
                  <p className="text-xs text-slate-500">Digital goods, physical hardware & licenses</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gross Sales Volume:</span>
                  <span className="font-semibold text-slate-900">$385,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Seller Share:</span>
                  <span className="font-semibold text-emerald-600">80% – 85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Escrow Period:</span>
                  <span className="font-semibold text-slate-700">72 Hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">OMNI Ads Financials</h4>
                  <p className="text-xs text-slate-500">Advertiser wallets, CPC/CPM & publisher share</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Ad Budgets:</span>
                  <span className="font-semibold text-slate-900">$40,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Publisher Split:</span>
                  <span className="font-semibold text-emerald-600">55% Guaranteed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Creator Placement Cut:</span>
                  <span className="font-semibold text-indigo-600">20%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Creator & Learn Hub</h4>
                  <p className="text-xs text-slate-500">Courses, tips, memberships & affiliate splits</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Learn Masterclasses:</span>
                  <span className="font-semibold text-slate-900">$520,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Creator Net Cut:</span>
                  <span className="font-semibold text-emerald-600">70% – 90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Affiliate Referral Cut:</span>
                  <span className="font-semibold text-amber-600">10% Automated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Live Settlements Table Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Commerce Settlement Transactions</h3>
                <p className="text-xs text-slate-500">Real-time ledger postings across marketplace, learn, and creator sales</p>
              </div>
              <button
                onClick={() => setActiveSubTab('marketplace')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                View all transactions <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Order / Reference</th>
                    <th className="py-3 px-3">Module & Product</th>
                    <th className="py-3 px-3">Gross Amount</th>
                    <th className="py-3 px-3">Seller Net</th>
                    <th className="py-3 px-3">Platform Fee</th>
                    <th className="py-3 px-3">Affiliate Cut</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {transactions.slice(0, 4).map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900">{tx.orderNumber}</span>
                        <p className="text-[10px] text-slate-400">{tx.buyerName}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900">{tx.productTitle}</span>
                        <p className="text-[10px] text-indigo-600 uppercase font-bold">{tx.moduleSource.replace('omni_', '')}</p>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        ${tx.grossAmount.toFixed(2)} {tx.currency}
                      </td>
                      <td className="py-3 px-3 text-emerald-600 font-semibold">
                        ${tx.sellerNetShare.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        ${tx.platformFeeAmount.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-amber-600 font-semibold">
                        {tx.affiliateCommissionAmount > 0 ? `$${tx.affiliateCommissionAmount.toFixed(2)}` : '—'}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.status === 'settled_to_wallet'
                              ? 'bg-emerald-100 text-emerald-700'
                              : tx.status === 'funds_in_escrow'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {tx.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedTxForReceipt(tx);
                            setIsReceiptModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold transition"
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* COMMERCE ACCOUNTS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'accounts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Commerce Financial Accounts Directory</h3>
              <p className="text-xs text-slate-500">Registered creators, sellers, advertisers, affiliates, publishers, and course providers</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
              >
                <option value="all">All Roles</option>
                <option value="creator">Creators</option>
                <option value="seller">Sellers</option>
                <option value="advertiser">Advertisers</option>
                <option value="affiliate">Affiliates</option>
                <option value="course_provider">Course Providers</option>
                <option value="publisher">Publishers</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {accounts
              .filter((acc) => {
                const matchesSearch = acc.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || acc.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRole = roleFilter === 'all' || acc.role === roleFilter;
                return matchesSearch && matchesRole;
              })
              .map((acc) => (
                <div key={acc.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                        alt={acc.displayName}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{acc.displayName}</h4>
                        <p className="text-xs text-slate-500">{acc.ownerName} • {acc.country}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase">
                      {acc.role.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500">Available Balance</p>
                      <p className="text-sm font-bold text-emerald-600 mt-0.5">${acc.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500">In-Escrow Hold</p>
                      <p className="text-sm font-bold text-amber-600 mt-0.5">${acc.escrowBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500">Lifetime Gross</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">${acc.totalGrossRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-500">Total Paid Out</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">${acc.totalPaidOut.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[11px] font-medium">{acc.taxFormStatus.toUpperCase()} Verified</span>
                    </div>

                    <button
                      onClick={() => {
                        setPayoutAccountId(acc.id);
                        setPayoutAmountInput(Math.min(acc.availableBalance, 1000).toFixed(2));
                        setIsPayoutModalOpen(true);
                      }}
                      disabled={acc.availableBalance <= 0}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl transition text-xs disabled:opacity-40"
                    >
                      Instant Payout
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REVENUE SPLIT RULES ENGINE TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'split_rules' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Configurable Revenue Splitting Rules</h3>
              <p className="text-xs text-slate-500">Exact percentage and fixed-cents fee allocations calculated prior to double-entry ledger posting</p>
            </div>
            <button
              onClick={() => notify('Admin Action', 'New split rule creation enabled.', 'info')}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" /> Add Split Rule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rule.name}</h4>
                    <p className="text-xs text-slate-500">{rule.description}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>

                {/* Progress Bar Visualization */}
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    {rule.primarySellerPercent > 0 && (
                      <div style={{ width: `${rule.primarySellerPercent}%` }} className="bg-emerald-500" title={`Seller: ${rule.primarySellerPercent}%`} />
                    )}
                    {rule.platformFeePercent > 0 && (
                      <div style={{ width: `${rule.platformFeePercent}%` }} className="bg-indigo-500" title={`Platform: ${rule.platformFeePercent}%`} />
                    )}
                    {rule.affiliatePercent > 0 && (
                      <div style={{ width: `${rule.affiliatePercent}%` }} className="bg-amber-500" title={`Affiliate: ${rule.affiliatePercent}%`} />
                    )}
                    {rule.publisherPercent > 0 && (
                      <div style={{ width: `${rule.publisherPercent}%` }} className="bg-blue-500" title={`Publisher: ${rule.publisherPercent}%`} />
                    )}
                    {rule.secondaryCreatorPercent > 0 && (
                      <div style={{ width: `${rule.secondaryCreatorPercent}%` }} className="bg-purple-500" title={`Creator Ad Cut: ${rule.secondaryCreatorPercent}%`} />
                    )}
                    {rule.taxReservePercent > 0 && (
                      <div style={{ width: `${rule.taxReservePercent}%` }} className="bg-rose-400" title={`Tax: ${rule.taxReservePercent}%`} />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-600">
                    {rule.primarySellerPercent > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Seller: {rule.primarySellerPercent}%
                      </span>
                    )}
                    {rule.platformFeePercent > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Platform: {rule.platformFeePercent}% {rule.fixedPlatformFeeCents > 0 && `+$${(rule.fixedPlatformFeeCents / 100).toFixed(2)}`}
                      </span>
                    )}
                    {rule.affiliatePercent > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Affiliate: {rule.affiliatePercent}%
                      </span>
                    )}
                    {rule.publisherPercent > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Publisher: {rule.publisherPercent}%
                      </span>
                    )}
                    {rule.taxReservePercent > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        Tax Reserve: {rule.taxReservePercent}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Source: <strong className="text-slate-800">{rule.moduleSource}</strong></span>
                  <button
                    onClick={() => notify('Rule Config', `Editing configuration for ${rule.name}`, 'info')}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Configure Percentages
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MARKETPLACE & LEARN TRANSACTIONS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Marketplace & Learn Orders Stream</h3>
              <p className="text-xs text-slate-500">Full audit log of purchases, revenue splits, tax withholding, and escrow locks</p>
            </div>
            <button
              onClick={() => setIsSimulateOrderOpen(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" /> Simulate New Order
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Order / ID</th>
                    <th className="py-3.5 px-4">Product Title</th>
                    <th className="py-3.5 px-4">Buyer</th>
                    <th className="py-3.5 px-4">Gross</th>
                    <th className="py-3.5 px-4">Seller Share</th>
                    <th className="py-3.5 px-4">Platform Take</th>
                    <th className="py-3.5 px-4">Affiliate</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">{tx.orderNumber}</span>
                        <p className="text-[10px] text-slate-400">{tx.paymentMethod}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-[200px] truncate">
                        <span className="font-semibold text-slate-900">{tx.productTitle}</span>
                        <p className="text-[10px] text-slate-500">{tx.sellerName}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-900">{tx.buyerName}</span>
                        <p className="text-[10px] text-slate-400">{tx.buyerEmail}</p>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ${tx.grossAmount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-600 font-semibold">
                        ${tx.sellerNetShare.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        ${tx.platformFeeAmount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-amber-600 font-semibold">
                        {tx.affiliateCommissionAmount > 0 ? `$${tx.affiliateCommissionAmount.toFixed(2)}` : '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.status === 'settled_to_wallet'
                              ? 'bg-emerald-100 text-emerald-700'
                              : tx.status === 'funds_in_escrow'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {tx.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        {tx.status === 'funds_in_escrow' && (
                          <button
                            onClick={() => handleReleaseEscrow(tx)}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition"
                            title="Release escrow hold early"
                          >
                            Release
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedTxForRefund(tx);
                            setRefundAmountInput(tx.grossAmount.toFixed(2));
                            setIsRefundModalOpen(true);
                          }}
                          className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition"
                        >
                          Refund
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTxForReceipt(tx);
                            setIsReceiptModalOpen(true);
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* OMNI ADS FINANCIALS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'ads_network' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">OMNI Ads Network Financial System</h3>
              <p className="text-xs text-slate-500">Advertiser pre-funded escrow budgets, automated CPC/CPM delivery, and publisher/creator revenue share</p>
            </div>
            <button
              onClick={() => notify('OMNI Ads', 'New advertiser campaign funding initiated.', 'info')}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" /> Deposit Ad Campaign Budget
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {adsCampaigns.map((camp) => (
              <div key={camp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{camp.campaignTitle}</h4>
                    <p className="text-xs text-slate-500">{camp.advertiserName} • Model: <strong className="uppercase">{camp.bidModel}</strong></p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[10px] font-bold">
                    {camp.status.toUpperCase()}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Budget:</span>
                    <span className="font-bold text-slate-900">${camp.budgetTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivered Spend:</span>
                    <span className="font-bold text-indigo-600">${camp.budgetSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Remaining Wallet Escrow:</span>
                    <span className="font-bold text-emerald-600">${camp.budgetRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-blue-50/60 rounded-xl border border-blue-100">
                    <p className="text-[10px] text-blue-700 font-medium">Publisher Cut (55%)</p>
                    <p className="text-xs font-bold text-blue-900 mt-0.5">${camp.publisherEarningsTotal.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-purple-50/60 rounded-xl border border-purple-100">
                    <p className="text-[10px] text-purple-700 font-medium">Creator Cut (20%)</p>
                    <p className="text-xs font-bold text-purple-900 mt-0.5">${camp.creatorAdShareTotal.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-indigo-50/60 rounded-xl border border-indigo-100">
                    <p className="text-[10px] text-indigo-700 font-medium">Platform (25%)</p>
                    <p className="text-xs font-bold text-indigo-900 mt-0.5">${camp.platformAdRevenueTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AFFILIATE HUB TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'affiliate_hub' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">OMNI Affiliate Financial Ecosystem</h3>
              <p className="text-xs text-slate-500">Referral links, automatic conversion attribution, pending commission holds, and paid payouts</p>
            </div>
            <button
              onClick={() => notify('Affiliate Link', 'Generated new affiliate tracking link.', 'success')}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" /> Create Affiliate Link
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {affiliateLinks.map((link) => (
              <div key={link.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{link.targetProductTitle}</h4>
                    <p className="text-xs text-indigo-600 font-mono font-bold mt-0.5">{link.affiliateCode}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold">
                    {link.commissionRate}% Commission
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-500">Clicks</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{link.totalClicks.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-500">Conversions</p>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5">{link.totalConversions}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-500">Total Earned</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">${link.totalCommissionEarned.toFixed(2)}</p>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-600 truncate">
                  {link.destinationUrl}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBSCRIPTIONS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Subscription & Recurring Billing Hub</h3>
              <p className="text-xs text-slate-500">Creator memberships, SaaS tiers, annual passes, grace period rules, and dunning retries</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{sub.planName}</h4>
                    <p className="text-xs text-slate-500">Subscriber: <strong className="text-slate-800">{sub.subscriberName}</strong></p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                    {sub.status.toUpperCase()}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Billing Amount:</span>
                    <span className="font-bold text-slate-900">${sub.amountPerPeriod.toFixed(2)} / {sub.billingInterval}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cycles Billed:</span>
                    <span className="font-semibold text-slate-700">{sub.totalCyclesBilled} cycles (${sub.totalLifetimeRevenue.toFixed(2)} lifetime)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Renewal Date:</span>
                    <span className="font-semibold text-indigo-600">{new Date(sub.nextBillingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dunning Grace Period:</span>
                    <span className="font-semibold text-slate-700">{sub.gracePeriodDays} days on payment failure</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PAYOUTS & RAILS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'payouts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Multi-Rail Payout Disbursement Engine</h3>
              <p className="text-xs text-slate-500">Disburse available creator & seller balances via FedNow, SEPA, ACH, SWIFT, Mobile Money (M-Pesa/Pix), or Internal Wallet</p>
            </div>
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" /> Request Payout
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Disbursement ID</th>
                    <th className="py-3.5 px-4">Recipient</th>
                    <th className="py-3.5 px-4">Rail</th>
                    <th className="py-3.5 px-4">Gross Request</th>
                    <th className="py-3.5 px-4">Rail Fee</th>
                    <th className="py-3.5 px-4">Net Disbursed</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">{p.id}</span>
                        <p className="text-[10px] text-slate-400">{p.batchReference}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900">{p.recipientName}</span>
                        <p className="text-[10px] text-slate-500">{p.destinationDetails}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-700 uppercase">
                        {p.payoutRail.replace('bank_', '').replace('mobile_money_', '')}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        ${p.requestedAmount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        ${p.payoutFee.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600">
                        ${p.netDisbursedAmount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-400">
                        {new Date(p.initiatedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REFUNDS & DISPUTES TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'refunds_disputes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Refunds, Chargebacks & Disputes Ledger</h3>
              <p className="text-xs text-slate-500">Full and partial refund clawback management with balanced contra-revenue GL postings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {refundsDisputes.map((ref) => (
              <div key={ref.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Order {ref.orderNumber}</h4>
                    <p className="text-xs text-slate-500">Seller: <strong className="text-slate-800">{ref.sellerName}</strong></p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ref.type === 'chargeback' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {ref.type.toUpperCase().replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Original Amount:</span>
                    <span className="font-semibold text-slate-900">${ref.originalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Refunded / Charged Back:</span>
                    <span className="font-bold text-rose-600">${ref.refundAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Seller Clawback:</span>
                    <span className="font-semibold text-slate-700">${ref.sellerClawbackAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reason:</span>
                    <span className="font-medium text-slate-800">{ref.reason}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Status: <strong>{ref.status.replace(/_/g, ' ')}</strong></span>
                  <span>{new Date(ref.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AI REVENUE INTELLIGENCE (READ-ONLY GOVERNANCE) TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'ai_copilot' && (
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-950">OMNI AI Commerce Intelligence</h4>
                <p className="text-xs text-indigo-700">Financial revenue analysis, cohort projections & tax summaries</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-white border border-indigo-200 text-indigo-800 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              Read-Only Governance Enforced (Cannot alter rules or disburse funds)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {aiInsights.map((ins) => (
              <div key={ins.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{ins.title}</h4>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold">
                    {ins.confidenceScore}% Confidence
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{ins.summary}</p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Key Metric</p>
                  <p className="font-bold text-slate-900">{ins.keyMetric}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold mt-2">Recommendation</p>
                  <p className="text-indigo-700 font-medium">{ins.recommendedAction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUPER ADMIN CONTROL TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'admin_control' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Super Admin Commerce Settlement Master Configuration</h3>
              <p className="text-xs text-slate-500">Configure global marketplace take rates, escrow hold durations, payout rail fees, and emergency controls</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="text-xs font-bold text-slate-700">Settlement Engine Status</label>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={adminConfig.isCommerceSettlementActive}
                    onChange={(e) => {
                      setAdminConfig((prev) => ({ ...prev, isCommerceSettlementActive: e.target.checked }));
                      notify('Admin Config', `Commerce Settlement Engine is now ${e.target.checked ? 'ACTIVE' : 'DISABLED'}`, 'info');
                    }}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    {adminConfig.isCommerceSettlementActive ? 'Active (Processing Live Orders)' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="text-xs font-bold text-slate-700">Default Marketplace Take Rate (bps)</label>
                <input
                  type="number"
                  value={adminConfig.defaultPlatformMarketplaceFeeBps}
                  onChange={(e) => setAdminConfig((prev) => ({ ...prev, defaultPlatformMarketplaceFeeBps: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[10px] text-slate-500">1500 bps = 15.0%</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="text-xs font-bold text-slate-700">Standard Escrow Hold Duration</label>
                <input
                  type="number"
                  value={adminConfig.standardEscrowHoldPeriodHours}
                  onChange={(e) => setAdminConfig((prev) => ({ ...prev, standardEscrowHoldPeriodHours: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[10px] text-slate-500">Hours before automated release (Default: 72 hours)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TEST SUITE MATRIX TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'test_suite' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Mission-Critical 8-Scenario Settlement Test Suite</h3>
              <p className="text-xs text-slate-500">Automated verification of marketplace sales, revenue splitting, affiliate payouts, refunds, chargebacks, and AI governance</p>
            </div>

            <button
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition disabled:opacity-50"
            >
              <Play className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              {isRunningTests ? 'Executing Scenarios...' : 'Execute Test Suite'}
            </button>
          </div>

          {testResults.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
              <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Test Harness Ready</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click &quot;Execute Test Suite&quot; to run the comprehensive 8-scenario test matrix covering mathematical precision, ledger balancing, and security guardrails.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testResults.map((res) => (
                <div
                  key={res.id}
                  className={`p-5 rounded-2xl border transition ${
                    res.passed
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {res.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{res.name}</h4>
                        <p className="text-[10px] text-slate-500">{res.category} • {res.executionTimeMs}ms</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        res.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {res.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-2.5 font-medium">{res.details}</p>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Audit Trail</p>
                    {res.auditTrail.map((trail, i) => (
                      <p key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                        {trail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: SIMULATE COMMERCE ORDER */}
      {/* ------------------------------------------------------------- */}
      {isSimulateOrderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Simulate Commerce Order</h3>
              </div>
              <button
                onClick={() => setIsSimulateOrderOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulateTransaction} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Type</label>
                <select
                  value={simProductType}
                  onChange={(e) => setSimProductType(e.target.value as CommerceProductType)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="course">OMNI Learn Course ($499.00 Standard)</option>
                  <option value="digital_product">Marketplace Digital Good</option>
                  <option value="physical_product">Marketplace Physical Product</option>
                  <option value="creator_membership">Creator Membership ($89.00/mo)</option>
                  <option value="creator_tip">Creator Sovereign Tip</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Gross Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={simGrossAmount}
                    onChange={(e) => setSimGrossAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Payment Rail</label>
                  <select
                    value={simPaymentRail}
                    onChange={(e) => setSimPaymentRail(e.target.value as PaymentRail)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value="fednow">FedNow Instant</option>
                    <option value="card_visa">Visa Direct</option>
                    <option value="sepa_instant">SEPA Instant</option>
                    <option value="internal_ledger">Internal Ledger</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Beneficiary Seller / Creator</label>
                <select
                  value={simSellerAccountId}
                  onChange={(e) => setSimSellerAccountId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.displayName} ({a.role.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Buyer Name</label>
                  <input
                    type="text"
                    value={simBuyerName}
                    onChange={(e) => setSimBuyerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Affiliate Referral Code</label>
                  <input
                    type="text"
                    value={simAffiliateCode}
                    onChange={(e) => setSimAffiliateCode(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSimulateOrderOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md transition"
                >
                  Process Order & Lock Escrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: PAYOUT REQUEST */}
      {/* ------------------------------------------------------------- */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Request Balance Payout</h3>
              </div>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecutePayout} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Account</label>
                <select
                  value={payoutAccountId}
                  onChange={(e) => setPayoutAccountId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.displayName} (Available: ${a.availableBalance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Disbursement Rail</label>
                <select
                  value={payoutRailInput}
                  onChange={(e) => setPayoutRailInput(e.target.value as PayoutRailType)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="bank_fednow">FedNow Instant (0.15% fee, instant 24/7)</option>
                  <option value="omni_internal_wallet">OMNI Internal Wallet (Zero Fee, Real-time)</option>
                  <option value="bank_sepa">SEPA Instant Eurozone (€0.50)</option>
                  <option value="bank_ach">US ACH Standard ($0.50)</option>
                  <option value="mobile_money_mpesa">M-Pesa Mobile Money Africa (0.15%)</option>
                  <option value="mobile_money_pix">Pix Real-Time Brazil (0.15%)</option>
                  <option value="stablecoin_usdc">USDC Sovereign Stablecoin ($0.25)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Payout Amount (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={payoutAmountInput}
                  onChange={(e) => setPayoutAmountInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-md transition"
                >
                  Disburse Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: REFUND / DISPUTE */}
      {/* ------------------------------------------------------------- */}
      {isRefundModalOpen && selectedTxForRefund && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">Process Refund / Dispute</h3>
              </div>
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteRefund} className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-700">
                <p>Order: <strong>{selectedTxForRefund.orderNumber}</strong> ({selectedTxForRefund.productTitle})</p>
                <p>Gross Amount: <strong>${selectedTxForRefund.grossAmount.toFixed(2)}</strong></p>
                <p>Seller: <strong>{selectedTxForRefund.sellerName}</strong></p>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Adjustment Type</label>
                <select
                  value={refundTypeInput}
                  onChange={(e) => setRefundTypeInput(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="full_refund">Full Refund (100% Reversal)</option>
                  <option value="partial_refund">Partial Refund</option>
                  <option value="chargeback">Bank Chargeback Reversal</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Refund Amount (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  max={selectedTxForRefund.grossAmount}
                  value={refundAmountInput}
                  onChange={(e) => setRefundAmountInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reason / Notes</label>
                <input
                  type="text"
                  value={refundReasonInput}
                  onChange={(e) => setRefundReasonInput(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRefundModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-semibold shadow-md transition"
                >
                  Confirm & Post Reversal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: AUDIT RECEIPT & MERKLE PROOF */}
      {/* ------------------------------------------------------------- */}
      {isReceiptModalOpen && selectedTxForReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Cryptographic Settlement Receipt</h3>
              </div>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 font-medium text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-bold text-slate-900">{selectedTxForReceipt.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Product:</span>
                  <span className="font-semibold text-slate-800">{selectedTxForReceipt.productTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gross Paid:</span>
                  <span className="font-bold text-slate-900">${selectedTxForReceipt.grossAmount.toFixed(2)} {selectedTxForReceipt.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seller Net Share:</span>
                  <span className="font-bold text-emerald-600">${selectedTxForReceipt.sellerNetShare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Platform Service Take:</span>
                  <span className="font-semibold text-slate-700">${selectedTxForReceipt.platformFeeAmount.toFixed(2)}</span>
                </div>
                {selectedTxForReceipt.affiliateCommissionAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Affiliate Referral ({selectedTxForReceipt.affiliateCode}):</span>
                    <span className="font-semibold text-amber-600">${selectedTxForReceipt.affiliateCommissionAmount.toFixed(2)}</span>
                  </div>
                )}
                {selectedTxForReceipt.taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tax Reserve Withholding:</span>
                    <span className="font-semibold text-rose-600">${selectedTxForReceipt.taxAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl space-y-1.5 font-mono text-[11px]">
                <p className="text-slate-400 text-[10px] uppercase font-bold">SHA-256 Merkle Verification Proof</p>
                <p className="break-all text-emerald-400">{selectedTxForReceipt.verificationMerkleHash}</p>
                <p className="text-[10px] text-slate-400 mt-1">Double-Entry Journal: {selectedTxForReceipt.journalEntryId || 'Verified'}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
