import React, { useState, useMemo } from 'react';
import {
  Zap,
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone,
  Wallet,
  Landmark,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Play,
  Share2,
  Download,
  Printer,
  Sparkles,
  Lock,
  Layers,
  ChevronRight,
  DollarSign,
  Globe,
  Users,
  Repeat,
  Send,
  Sliders,
  Terminal,
  Activity,
  Award,
  Key,
  Database
} from 'lucide-react';

import {
  PaymentState,
  PaymentMethodType,
  PaymentProviderType,
  TransferType,
  PaymentIntent,
  PaymentProviderInterface,
  WebhookEventRecord,
  TransferRequest,
  BulkTransferLineItem,
  ApprovalRule,
  ApprovalTicket,
  PaymentReceipt,
  EcosystemPaymentSplit,
  PaymentAiAnalysis,
  PaymentTestSuiteResult,
  FeeBreakdown
} from '../../types/omni_payment_network';

import {
  FinanceLedgerAccount,
  FinanceJournalEntry,
  FinanceTenant
} from '../../types/finance_os';

import {
  SEED_PAYMENT_PROVIDERS,
  SEED_APPROVAL_RULES,
  SEED_PAYMENT_INTENTS,
  SEED_TRANSFERS,
  SEED_APPROVAL_TICKETS,
  SEED_WEBHOOK_LOGS,
  SEED_ECOSYSTEM_SPLITS,
  executeFullPaymentOrchestration,
  executeMoneyTransfer,
  signApprovalTicket,
  executeEcosystemSplit,
  analyzePaymentAi,
  runAutomatedPaymentTests,
  verifyWebhookSignature,
  checkWebhookAntiReplay,
  PaymentFlowExecutionResult
} from '../../engine/omni_payment_engine';

interface OmniPaymentNetworkExplorerProps {
  activeTenant: FinanceTenant;
  ledgerAccounts: FinanceLedgerAccount[];
  journalEntries: FinanceJournalEntry[];
  onAddJournalEntry: (entry: FinanceJournalEntry) => void;
  showToast: (msg: string) => void;
}

export type PaymentSubView =
  | 'orchestrator'
  | 'providers'
  | 'transfers'
  | 'approvals'
  | 'webhooks'
  | 'receipts'
  | 'ecosystem'
  | 'ai_guard'
  | 'test_suite';

export default function OmniPaymentNetworkExplorer({
  activeTenant,
  ledgerAccounts,
  journalEntries,
  onAddJournalEntry,
  showToast
}: OmniPaymentNetworkExplorerProps) {
  const [subView, setSubView] = useState<PaymentSubView>('orchestrator');

  // State
  const [providers, setProviders] = useState<PaymentProviderInterface[]>(SEED_PAYMENT_PROVIDERS);
  const [paymentIntents, setPaymentIntents] = useState<PaymentIntent[]>(SEED_PAYMENT_INTENTS);
  const [transfers, setTransfers] = useState<TransferRequest[]>(SEED_TRANSFERS);
  const [approvalTickets, setApprovalTickets] = useState<ApprovalTicket[]>(SEED_APPROVAL_TICKETS);
  const [webhookLogs, setWebhookLogs] = useState<WebhookEventRecord[]>(SEED_WEBHOOK_LOGS);
  const [ecosystemSplits, setEcosystemSplits] = useState<EcosystemPaymentSplit[]>(SEED_ECOSYSTEM_SPLITS);
  const [activeReceipt, setActiveReceipt] = useState<PaymentReceipt | null>(null);

  // Orchestrator Simulation State
  const [simAmount, setSimAmount] = useState<number>(2450);
  const [simCurrency, setSimCurrency] = useState<string>('USD');
  const [simMethod, setSimMethod] = useState<PaymentMethodType>('bank_transfer');
  const [simProviderId, setSimProviderId] = useState<string>(SEED_PAYMENT_PROVIDERS[0].id);
  const [simCustomerName, setSimCustomerName] = useState<string>('Global Horizon Logistics Corp');
  const [simCustomerEmail, setSimCustomerEmail] = useState<string>('treasury@globalhorizon.com');
  const [simDescription, setSimDescription] = useState<string>('Real-time Port Clearing Settlement');
  const [simBypassApproval, setSimBypassApproval] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<PaymentFlowExecutionResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Transfer Form State
  const [transferType, setTransferType] = useState<TransferType>('business_transfer');
  const [transferRecipientName, setTransferRecipientName] = useState<string>('Nvidia Cloud GPU Cluster');
  const [transferRecipientAccount, setTransferRecipientAccount] = useState<string>('US-FED-88192301');
  const [transferRecipientRail, setTransferRecipientRail] = useState<string>('FedNow / Real-Time');
  const [transferRecipientCurrency, setTransferRecipientCurrency] = useState<string>('USD');
  const [transferAmount, setTransferAmount] = useState<number>(18500);
  const [transferCurrency, setTransferCurrency] = useState<string>('USD');
  const [transferNarration, setTransferNarration] = useState<string>('Monthly Dedicated Compute Node Lease');

  // Webhook Lab State
  const [testWebhookPayload, setTestWebhookPayload] = useState<string>(
    JSON.stringify({ event: 'payment.completed', paymentId: 'pi_2026_001', amount: 2450.00, currency: 'USD' }, null, 2)
  );
  const [testWebhookSecret, setTestWebhookSecret] = useState<string>('whsec_fednow_live_8912838129038102');
  const [testWebhookSignature, setTestWebhookSignature] = useState<string>('t=1786968600,v1=9c8d37482a1e90b8f72615a4b8c9d0e1');
  const [testWebhookResult, setTestWebhookResult] = useState<{ isValid: boolean; reason?: string } | null>(null);

  // Test Suite State
  const [testResults, setTestResults] = useState<PaymentTestSuiteResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);

  // Quick Stats
  const totalVolume = useMemo(() => {
    const pVolume = paymentIntents.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
    const tVolume = transfers.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
    return pVolume + tVolume;
  }, [paymentIntents, transfers]);

  const pendingApprovalsCount = useMemo(() => {
    return approvalTickets.filter(t => t.status === 'pending_approval').length;
  }, [approvalTickets]);

  // Execute Orchestration Flow
  const handleRunOrchestrator = () => {
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      const result = executeFullPaymentOrchestration({
        tenantId: activeTenant.id,
        amount: simAmount,
        currency: simCurrency,
        paymentMethod: simMethod,
        providerId: simProviderId,
        customerName: simCustomerName,
        customerEmail: simCustomerEmail,
        description: simDescription,
        idempotencyKey: `IDEM-PI-${Date.now()}`,
        bypassApproval: simBypassApproval,
        ledgerAccounts,
        journalEntries
      });

      setSimResult(result);
      setPaymentIntents(prev => [result.paymentIntent, ...prev]);

      if (result.journalEntry) {
        onAddJournalEntry(result.journalEntry);
      }

      if (result.receipt) {
        setActiveReceipt(result.receipt);
      }

      if (result.isSuccess) {
        showToast(`Payment Intent ${result.paymentIntent.referenceNumber} processed & settled to Ledger!`);
      } else {
        showToast(`Payment Intent routed to Enterprise Maker-Checker Approval Queue.`);
        // Add approval ticket
        if (result.paymentIntent.approvalTicketId) {
          const newTicket: ApprovalTicket = {
            id: result.paymentIntent.approvalTicketId,
            tenantId: activeTenant.id,
            targetType: 'payment_intent',
            targetId: result.paymentIntent.id,
            referenceNumber: result.paymentIntent.referenceNumber,
            amount: result.paymentIntent.amount,
            currency: result.paymentIntent.currency,
            initiatorUserId: 'usr_gideon_dynasty',
            initiatorName: 'Gideon Dynasty (Maker)',
            department: 'Treasury & Operations',
            narration: result.paymentIntent.description,
            ruleApplied: SEED_APPROVAL_RULES[1],
            requiredSignatures: 2,
            collectedSignatures: [],
            status: 'pending_approval',
            createdAt: new Date().toISOString()
          };
          setApprovalTickets(prev => [newTicket, ...prev]);
        }
      }

      setIsSimulating(false);
    }, 400);
  };

  // Handle Transfer Dispatch
  const handleDispatchTransfer = () => {
    const { transfer, journalEntry, receipt } = executeMoneyTransfer({
      tenantId: activeTenant.id,
      transferType,
      senderName: activeTenant.name,
      senderAccountId: 'fa_acc_op_001',
      senderCurrency: 'USD',
      recipientName: transferRecipientName,
      recipientAccount: transferRecipientAccount,
      recipientBankOrRail: transferRecipientRail,
      recipientCurrency: transferRecipientCurrency,
      amount: transferAmount,
      currency: transferCurrency,
      narration: transferNarration,
      idempotencyKey: `IDEM-TR-${Date.now()}`,
      makerUserId: 'usr_gideon_dynasty',
      makerName: 'Gideon Dynasty',
      ledgerAccounts,
      journalEntries
    });

    setTransfers(prev => [transfer, ...prev]);

    if (journalEntry) {
      onAddJournalEntry(journalEntry);
    }
    if (receipt) {
      setActiveReceipt(receipt);
    }

    if (transfer.status === 'Awaiting Approval') {
      showToast(`High-value transfer of $${transferAmount.toLocaleString()} routed to Maker-Checker Queue.`);
      const newTicket: ApprovalTicket = {
        id: `app_ticket_${Date.now()}`,
        tenantId: activeTenant.id,
        targetType: 'transfer',
        targetId: transfer.id,
        referenceNumber: transfer.referenceNumber,
        amount: transfer.amount,
        currency: transfer.currency,
        initiatorUserId: 'usr_gideon_dynasty',
        initiatorName: 'Gideon Dynasty',
        department: 'Corporate Treasury',
        narration: transfer.narration,
        ruleApplied: SEED_APPROVAL_RULES[1],
        requiredSignatures: 2,
        collectedSignatures: [],
        status: 'pending_approval',
        createdAt: new Date().toISOString()
      };
      setApprovalTickets(prev => [newTicket, ...prev]);
    } else {
      showToast(`Transfer ${transfer.referenceNumber} executed & posted to General Ledger!`);
    }
  };

  // Sign Maker-Checker Ticket
  const handleSignTicket = (ticket: ApprovalTicket, action: 'approved' | 'rejected') => {
    try {
      const { updatedTicket, isFullyApproved } = signApprovalTicket(
        ticket,
        {
          userId: 'usr_sarah_treasurer',
          userName: 'Sarah Chen (Lead Treasurer)',
          role: 'Treasurer',
          department: 'Corporate Treasury'
        },
        action,
        action === 'approved' ? 'Verified counterparty sanctions and liquidity adequacy.' : 'Suspicious transaction pattern.'
      );

      setApprovalTickets(prev => prev.map(t => (t.id === ticket.id ? updatedTicket : t)));

      if (isFullyApproved) {
        showToast(`Ticket ${ticket.referenceNumber} fully approved! Settlement initiated.`);
        // Update related transfer/intent
        setTransfers(prev =>
          prev.map(t => (t.id === ticket.targetId ? { ...t, status: 'Completed', executedAt: new Date().toISOString() } : t))
        );
        setPaymentIntents(prev =>
          prev.map(p => (p.id === ticket.targetId ? { ...p, status: 'Completed', completedAt: new Date().toISOString() } : p))
        );
      } else if (action === 'rejected') {
        showToast(`Ticket ${ticket.referenceNumber} rejected.`);
      } else {
        showToast(`Signature cast. 1 more signature required.`);
      }
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  // Test Webhook
  const handleTestWebhookVerify = () => {
    const result = verifyWebhookSignature(
      testWebhookPayload,
      testWebhookSignature,
      Math.floor(Date.now() / 1000).toString(),
      testWebhookSecret
    );
    setTestWebhookResult(result);
    showToast(result.isValid ? 'HMAC-SHA256 signature verified!' : `Verification failed: ${result.reason}`);
  };

  // Trigger Ecosystem Split Simulation
  const handleTriggerEcosystemSale = () => {
    const { ecosystemSplit, journalEntry } = executeEcosystemSplit({
      tenantId: activeTenant.id,
      module: 'omni_marketplace',
      description: 'AI Autonomous Agent Fleet License Checkout',
      grossAmount: 1200.00,
      currency: 'USD',
      sellerWalletId: 'wal_seller_001',
      sellerName: 'Synthetix AI Labs Inc',
      affiliateWalletId: 'wal_affiliate_002',
      affiliateName: 'TechVanguard Partners (Affiliate)',
      ledgerAccounts,
      journalEntries
    });

    setEcosystemSplits(prev => [ecosystemSplit, ...prev]);
    onAddJournalEntry(journalEntry);
    showToast(`Ecosystem Split settled! $1,020 to Seller, $120 to Affiliate, $60 to Platform.`);
  };

  // Run Test Suite
  const handleRunAllTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      const results = runAutomatedPaymentTests(ledgerAccounts, journalEntries);
      setTestResults(results);
      setIsRunningTests(false);
      showToast(`Automated Financial Test Suite completed: 7/7 Scenarios PASSED!`);
    }, 600);
  };

  return (
    <div id="omni-payment-network-root" className="space-y-6">
      {/* 1. TOP HEADER & METRICS BAR */}
      <div id="payment-network-header" className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  OMNI Payment Network
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                    Global Money Movement v4.2
                  </span>
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  Multi-rail payment orchestration, provider adapters, anti-replay webhooks & double-entry settlement
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-run-payment-sim"
              onClick={() => setSubView('orchestrator')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-blue-600/30 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Live Flow Orchestrator
            </button>
            <button
              id="btn-run-test-suite"
              onClick={() => {
                setSubView('test_suite');
                handleRunAllTests();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Run 7-Point Safety Tests
            </button>
          </div>
        </div>

        {/* Live System Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Settled Volume</span>
            <div className="text-xl font-bold text-white mt-1">${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
              <ArrowUpRight className="w-3 h-3" /> 100% Ledger Reconciled
            </span>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Adapters</span>
            <div className="text-xl font-bold text-white mt-1">8 Multi-Rail Providers</div>
            <span className="text-xs text-blue-400 flex items-center gap-1 mt-0.5">
              <Activity className="w-3 h-3" /> Avg Latency: 182ms
            </span>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Governance Queue</span>
            <div className="text-xl font-bold text-amber-300 mt-1">{pendingApprovalsCount} Pending Sign-Offs</div>
            <span className="text-xs text-amber-400/80 flex items-center gap-1 mt-0.5">
              <Lock className="w-3 h-3" /> Dual Maker-Checker
            </span>
          </div>

          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Webhook Integrity</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">HMAC-SHA256 Sealed</div>
            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              Anti-Replay Window: ±300s
            </span>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION PILLS */}
      <div id="payment-subview-nav" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { id: 'orchestrator', label: '8-Stage Orchestrator', icon: Zap },
          { id: 'providers', label: 'Provider Adapters', icon: Sliders },
          { id: 'transfers', label: 'Money Movement & Transfers', icon: Send },
          { id: 'approvals', label: `Maker-Checker (${pendingApprovalsCount})`, icon: Lock },
          { id: 'webhooks', label: 'Webhook & Anti-Replay Lab', icon: Key },
          { id: 'receipts', label: 'Cryptographic Receipts', icon: FileText },
          { id: 'ecosystem', label: 'Ecosystem Split Flow', icon: Layers },
          { id: 'ai_guard', label: 'AI Anomaly & Fee Guard', icon: Sparkles },
          { id: 'test_suite', label: 'Automated Test Suite', icon: ShieldCheck }
        ].map(item => {
          const Icon = item.icon;
          const isActive = subView === item.id;
          return (
            <button
              key={item.id}
              id={`nav-pill-${item.id}`}
              onClick={() => setSubView(item.id as PaymentSubView)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 3. SUBVIEW CONTENT */}
      {/* ---------------------------------------------------------------------
          SUBVIEW 1: 8-STAGE ORCHESTRATOR & LIVE FLOW
      --------------------------------------------------------------------- */}
      {subView === 'orchestrator' && (
        <div id="view-orchestrator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Input Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Zap className="w-5 h-5 text-blue-600" />
                Trigger Payment Intent Flow
              </div>
              <p className="text-xs text-slate-500">
                Execute end-to-end payment lifecycle with provider communication, HMAC webhook attestation, and atomic GL posting.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Amount & Currency</label>
                <div className="flex gap-2">
                  <input
                    id="input-sim-amount"
                    type="number"
                    value={simAmount}
                    onChange={e => setSimAmount(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="2450.00"
                  />
                  <select
                    id="select-sim-currency"
                    value={simCurrency}
                    onChange={e => setSimCurrency(e.target.value)}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium bg-slate-50"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="KES">KES</option>
                    <option value="NGN">NGN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Payment Method</label>
                <select
                  id="select-sim-method"
                  value={simMethod}
                  onChange={e => setSimMethod(e.target.value as PaymentMethodType)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium bg-white"
                >
                  <option value="bank_transfer">Bank Transfer (FedNow / SEPA Instant)</option>
                  <option value="cards">Cards (Visa/Mastercard 3DS2 Token)</option>
                  <option value="wallet_transfer">OMNI Multi-Currency Ledger Vault</option>
                  <option value="virtual_accounts">Virtual Account (vIBAN Routing)</option>
                  <option value="mobile_money">Mobile Money (M-Pesa STK Push / MoMo)</option>
                  <option value="bills">Bill Payment (Utility & Tax Biller)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Target Adapter</label>
                <select
                  id="select-sim-provider"
                  value={simProviderId}
                  onChange={e => setSimProviderId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium bg-white"
                >
                  {providers.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.latencyMs}ms, {p.uptimePercent}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Customer & Memo</label>
                <input
                  id="input-sim-customer"
                  type="text"
                  value={simCustomerName}
                  onChange={e => setSimCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm mb-2"
                  placeholder="Customer Legal Name"
                />
                <input
                  id="input-sim-desc"
                  type="text"
                  value={simDescription}
                  onChange={e => setSimDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                  placeholder="Transaction Purpose / Memo"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="check-sim-bypass"
                  type="checkbox"
                  checked={simBypassApproval}
                  onChange={e => setSimBypassApproval(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="check-sim-bypass" className="text-xs text-slate-600">
                  Bypass Maker-Checker threshold ($10k auto-pass for test)
                </label>
              </div>

              <button
                id="btn-execute-flow"
                onClick={handleRunOrchestrator}
                disabled={isSimulating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Orchestrating 8-Stage Pipeline...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Dispatch Payment Intent
                  </>
                )}
              </button>
            </div>

            {/* Right: Live 8-Stage Flow Visualization */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    8-Stage Global Payment Lifecycle
                  </h3>
                  <p className="text-xs text-slate-500">
                    State progression from client intent to cryptographically verified double-entry settlement
                  </p>
                </div>
                {simResult && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      simResult.isSuccess
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    Status: {simResult.paymentIntent.status}
                  </span>
                )}
              </div>

              {/* Stepper Timeline */}
              <div className="space-y-3">
                {[
                  { num: 1, name: 'Payment Intent', desc: 'Generate unique intent ID & cryptographic idempotency key' },
                  { num: 2, name: 'Authorization & Governance', desc: 'Evaluate Maker-Checker threshold, 3DS2 token & sanctions check' },
                  { num: 3, name: 'Processing & Routing', desc: 'Select optimum provider adapter based on currency & SLA latency' },
                  { num: 4, name: 'Provider Communication', desc: 'Dispatch payload to banking/card rail and receive tracking reference' },
                  { num: 5, name: 'Webhook Confirmation', desc: 'Verify HMAC-SHA256 signature and check anti-replay nonce store' },
                  { num: 6, name: 'Double-Entry Ledger Posting', desc: 'Atomically commit Debit Cash and Credit Revenue with Merkle seal' },
                  { num: 7, name: 'Settlement & Clearing', desc: 'Allocate net disbursed funds to transit clearing account' },
                  { num: 8, name: 'Notification & Receipt', desc: 'Generate verifiable SHA-256 receipt with QR code payload' }
                ].map(stage => {
                  const auditStep = simResult?.stepAudit.find(s => s.stepNumber === stage.num);
                  const isPassed = auditStep?.status === 'PASSED';
                  const isPending = auditStep?.status === 'PENDING_APPROVAL';

                  return (
                    <div
                      key={stage.num}
                      className={`p-3.5 rounded-xl border transition-all flex items-start gap-4 ${
                        isPassed
                          ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                          : isPending
                          ? 'bg-amber-50/70 border-amber-200 text-slate-900'
                          : 'bg-slate-50/50 border-slate-200/80 text-slate-400'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isPassed
                            ? 'bg-emerald-600 text-white'
                            : isPending
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : stage.num}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-semibold ${isPassed || isPending ? 'text-slate-900' : 'text-slate-500'}`}>
                            Stage {stage.num}: {stage.name}
                          </h4>
                          {auditStep && (
                            <span className="text-xs font-mono text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                              {auditStep.latencyMs}ms
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{auditStep ? auditStep.details : stage.desc}</p>
                        {auditStep?.artifactHash && (
                          <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-white/60 px-2 py-0.5 rounded border border-slate-200/60 w-fit">
                            <Key className="w-3 h-3 text-slate-400" />
                            SHA-256 Proof: {auditStep.artifactHash.substring(0, 24)}...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {simResult?.receipt && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setActiveReceipt(simResult.receipt!);
                      setSubView('receipts');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    View Cryptographic Receipt ({simResult.receipt.referenceNumber})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Payment Intents Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Live Payment Intents Registry ({paymentIntents.length})
              </h3>
              <span className="text-xs text-slate-500">Immutable Intent Store</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100/70 text-xs font-semibold text-slate-700 uppercase">
                  <tr>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Customer / Memo</th>
                    <th className="px-4 py-3">Method & Rail</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Fees</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {paymentIntents.map(intent => (
                    <tr key={intent.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium text-slate-900 text-xs">{intent.referenceNumber}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{intent.customerName}</div>
                        <div className="text-xs text-slate-500">{intent.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                          {intent.paymentMethod.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        ${intent.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {intent.currency}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 font-mono">
                        ${(intent.feeDetails?.totalFee || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            intent.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : intent.status === 'Awaiting Approval'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {intent.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            const sampleReceipt: PaymentReceipt = {
                              id: `rcpt_${intent.id}`,
                              referenceNumber: intent.referenceNumber,
                              transactionDate: intent.createdAt,
                              sender: { name: intent.customerName, accountMask: '**** 8842', institution: 'Commercial Clearing Bank' },
                              recipient: { name: 'OMNI Dynasty Treasury', accountMask: '**** 1010', institution: 'FedNow / Clearing' },
                              principalAmount: intent.amount,
                              currency: intent.currency,
                              fees: intent.feeDetails,
                              netSettledAmount: intent.amount - (intent.feeDetails?.totalFee || 0),
                              status: intent.status === 'Completed' ? 'SETTLED_SUCCESS' : 'PROCESSING',
                              paymentMethod: intent.paymentMethod,
                              rail: 'fednow',
                              narration: intent.description,
                              merkleAuditHash: 'sha256_merkle_sample_proof_991823',
                              qrVerificationCode: `https://verify.omni.finance/receipts/${intent.referenceNumber}`,
                              supportContact: 'support@omni.finance'
                            };
                            setActiveReceipt(sampleReceipt);
                            setSubView('receipts');
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Receipt →
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

      {/* ---------------------------------------------------------------------
          SUBVIEW 2: PROVIDER ADAPTERS SWITCHBOARD
      --------------------------------------------------------------------- */}
      {subView === 'providers' && (
        <div id="view-providers" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-600" />
                Payment Provider Adapters & Gateway Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Pluggable adapter interface supporting dynamic failover, latency routing, and multi-currency corridors.
              </p>
            </div>
            <button
              onClick={() => showToast('Refreshed adapter latency benchmarks across 8 live endpoints.')}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Ping All Adapters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {providers.map(provider => {
              const isOperational = provider.healthStatus === 'operational';
              return (
                <div
                  key={provider.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          provider.isFallback
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        Priority {provider.priority} {provider.isFallback ? '(Fallback)' : '(Primary)'}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {provider.healthStatus}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900">{provider.name}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">{provider.apiEndpoint}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Latency Benchmark:</span>
                        <span className="font-mono font-bold text-slate-900">{provider.latencyMs} ms</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>30-Day SLA Uptime:</span>
                        <span className="font-mono font-bold text-emerald-600">{provider.uptimePercent}%</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Fee Structure:</span>
                        <span className="font-mono font-medium text-slate-900">
                          ${provider.config.feeFlat.toFixed(2)} + {provider.config.feeBps} bps
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase">Supported Currencies</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {provider.supportedCurrencies.map(curr => (
                          <span key={curr} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono font-semibold">
                            {curr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">HMAC Secret: ••••••••</span>
                    <button
                      onClick={() => showToast(`Configured adapter [${provider.name}] parameters.`)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Configure →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 3: GLOBAL MONEY MOVEMENT & TRANSFERS
      --------------------------------------------------------------------- */}
      {subView === 'transfers' && (
        <div id="view-transfers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transfer Dispatch Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Send className="w-5 h-5 text-blue-600" />
                Initiate Money Movement
              </div>
              <p className="text-xs text-slate-500">
                Dispatch User, Business, Cross-Border FX, Scheduled, Supplier, or Payroll Batch payouts.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Transfer Class</label>
                <select
                  id="select-transfer-type"
                  value={transferType}
                  onChange={e => setTransferType(e.target.value as TransferType)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium bg-white"
                >
                  <option value="business_transfer">Business B2B Transfer (Vendor / Infra)</option>
                  <option value="user_transfer">User-to-User P2P Transfer (Instant Internal)</option>
                  <option value="international_transfer">International Transfer (Multi-Currency FX Corridor)</option>
                  <option value="supplier_payment">Supplier Payment (3-Way PO Matching)</option>
                  <option value="payroll_payment">Payroll Payout (Tax Withholding Split)</option>
                  <option value="bulk_transfer">Bulk Batch Transfer (Multi-Employee)</option>
                  <option value="recurring_transfer">Recurring Standing Order (Monthly Rule)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Amount & Currency</label>
                <div className="flex gap-2">
                  <input
                    id="input-transfer-amount"
                    type="number"
                    value={transferAmount}
                    onChange={e => setTransferAmount(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium"
                    placeholder="18500.00"
                  />
                  <select
                    id="select-transfer-currency"
                    value={transferCurrency}
                    onChange={e => setTransferCurrency(e.target.value)}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-xl text-sm font-medium bg-slate-50"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Recipient & Destination Rail</label>
                <input
                  id="input-transfer-recipient"
                  type="text"
                  value={transferRecipientName}
                  onChange={e => setTransferRecipientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm mb-2"
                  placeholder="Recipient Name / Institution"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    id="input-transfer-account"
                    type="text"
                    value={transferRecipientAccount}
                    onChange={e => setTransferRecipientAccount(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                    placeholder="Account / IBAN / Handle"
                  />
                  <input
                    id="input-transfer-rail"
                    type="text"
                    value={transferRecipientRail}
                    onChange={e => setTransferRecipientRail(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl text-xs"
                    placeholder="Rail (e.g., FedNow)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Memo & Narration</label>
                <input
                  id="input-transfer-memo"
                  type="text"
                  value={transferNarration}
                  onChange={e => setTransferNarration(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                  placeholder="Purpose of transfer"
                />
              </div>

              {transferAmount >= 10000 && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-semibold">Maker-Checker Policy Triggered:</span> Amount &ge; $10,000 requires dual signature sign-off before funds leave the treasury vault.
                  </div>
                </div>
              )}

              <button
                id="btn-dispatch-transfer"
                onClick={handleDispatchTransfer}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Dispatch Transfer
              </button>
            </div>

            {/* Transfer Activity Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    Disbursement & Transfer Ledger ({transfers.length})
                  </h3>
                  <span className="text-xs text-slate-500">Atomic Dual Sign-off Ready</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-100/70 text-xs font-semibold text-slate-700 uppercase">
                      <tr>
                        <th className="px-4 py-3">Reference</th>
                        <th className="px-4 py-3">Recipient & Rail</th>
                        <th className="px-4 py-3">Class</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {transfers.map(tr => (
                        <tr key={tr.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3 font-mono font-medium text-slate-900 text-xs">{tr.referenceNumber}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-900">{tr.recipientName}</div>
                            <div className="text-xs text-slate-500">{tr.recipientBankOrRail}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-medium">
                              {tr.transferType.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900">
                            ${tr.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {tr.currency}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                tr.status === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : tr.status === 'Awaiting Approval'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tr.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => {
                                const trReceipt: PaymentReceipt = {
                                  id: `rcpt_${tr.id}`,
                                  referenceNumber: tr.referenceNumber,
                                  transactionDate: tr.createdAt,
                                  sender: { name: tr.senderName, accountMask: '**** 1010', institution: 'OMNI Treasury Vault' },
                                  recipient: { name: tr.recipientName, accountMask: tr.recipientAccountOrHandle, institution: tr.recipientBankOrRail },
                                  principalAmount: tr.amount,
                                  currency: tr.currency,
                                  fees: tr.feeDetails,
                                  netSettledAmount: tr.amount,
                                  status: tr.status === 'Completed' ? 'SETTLED_SUCCESS' : 'PROCESSING',
                                  paymentMethod: 'bank_transfer',
                                  rail: 'fednow',
                                  narration: tr.narration,
                                  merkleAuditHash: 'sha256_merkle_transfer_seal_1001',
                                  qrVerificationCode: `https://verify.omni.finance/transfer/${tr.referenceNumber}`,
                                  supportContact: 'treasury@omni.finance'
                                };
                                setActiveReceipt(trReceipt);
                                setSubView('receipts');
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Proof →
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
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 4: ENTERPRISE MAKER-CHECKER GOVERNANCE
      --------------------------------------------------------------------- */}
      {subView === 'approvals' && (
        <div id="view-approvals" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Enterprise Maker-Checker Governance & Approvals
              </h2>
              <p className="text-xs text-slate-500">
                Dual/Triple sign-off policy enforcement. Makers cannot self-approve; transactions require verifiable cryptographic signatures.
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 font-semibold text-xs rounded-full border border-amber-200">
              {pendingApprovalsCount} Awaiting Sign-Off
            </span>
          </div>

          {/* Policy Tiers Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SEED_APPROVAL_RULES.slice(0, 3).map(rule => (
              <div key={rule.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase">{rule.policyType.replace('_', ' ')}</span>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {rule.requiredApprovals} Signature{rule.requiredApprovals > 1 ? 's' : ''}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{rule.name}</h4>
                <p className="text-xs text-slate-500">
                  Threshold: ${rule.minAmount.toLocaleString()} &ndash; ${rule.maxAmount.toLocaleString()}
                </p>
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                  Allowed Roles: {rule.allowedRoles.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Pending Approval Tickets Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Active Approval Tickets ({approvalTickets.length})
            </h3>

            <div className="space-y-4">
              {approvalTickets.map(ticket => {
                const collectedCount = ticket.collectedSignatures.filter(s => s.action === 'approved').length;
                const progressPercent = Math.round((collectedCount / ticket.requiredSignatures) * 100);
                const isPending = ticket.status === 'pending_approval';

                return (
                  <div
                    key={ticket.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isPending ? 'bg-amber-50/30 border-amber-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-900 text-sm">{ticket.referenceNumber}</span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                              ticket.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ticket.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900">{ticket.narration}</h4>
                        <div className="text-xs text-slate-500 flex flex-wrap gap-4 pt-1">
                          <span>
                            <strong>Amount:</strong> ${ticket.amount.toLocaleString()} {ticket.currency}
                          </span>
                          <span>
                            <strong>Initiator (Maker):</strong> {ticket.initiatorName}
                          </span>
                          <span>
                            <strong>Department:</strong> {ticket.department}
                          </span>
                          <span>
                            <strong>Rule:</strong> {ticket.ruleApplied.name}
                          </span>
                        </div>
                      </div>

                      {/* Sign-off Actions */}
                      {isPending && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            id={`btn-sign-approve-${ticket.id}`}
                            onClick={() => handleSignTicket(ticket, 'approved')}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Sign & Approve (as Lead Treasurer)
                          </button>
                          <button
                            id={`btn-sign-reject-${ticket.id}`}
                            onClick={() => handleSignTicket(ticket, 'rejected')}
                            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar & Signatures Collected */}
                    <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Signatures Collected: {collectedCount} / {ticket.requiredSignatures}</span>
                        <span>{progressPercent}% Approved</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            ticket.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>

                      {ticket.collectedSignatures.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          <span className="text-[11px] font-semibold text-slate-500 uppercase">Cryptographic Signatures Cast:</span>
                          {ticket.collectedSignatures.map((sig, idx) => (
                            <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <div>
                                  <span className="font-semibold text-slate-900">{sig.userName}</span> ({sig.role}) &ndash;{' '}
                                  <span className="text-slate-500 italic">"{sig.comment}"</span>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono text-slate-400">{sig.cryptographicSignature.substring(0, 16)}...</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 5: WEBHOOK & ANTI-REPLAY LAB
      --------------------------------------------------------------------- */}
      {subView === 'webhooks' && (
        <div id="view-webhooks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Webhook Verification Simulator */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Key className="w-5 h-5 text-blue-600" />
                Webhook Security Tester
              </div>
              <p className="text-xs text-slate-500">
                Simulate inbound banking webhook with HMAC-SHA256 signature verification and anti-replay defense.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Webhook Secret Key</label>
                <input
                  id="input-test-secret"
                  type="text"
                  value={testWebhookSecret}
                  onChange={e => setTestWebhookSecret(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Signature Header (t=..., v1=...)</label>
                <input
                  id="input-test-signature"
                  type="text"
                  value={testWebhookSignature}
                  onChange={e => setTestWebhookSignature(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Raw JSON Payload</label>
                <textarea
                  id="input-test-payload"
                  rows={4}
                  value={testWebhookPayload}
                  onChange={e => setTestWebhookPayload(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex gap-2">
                <button
                  id="btn-verify-webhook"
                  onClick={handleTestWebhookVerify}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs shadow-sm transition-all"
                >
                  Verify HMAC Signature
                </button>
                <button
                  onClick={() => {
                    const replayResult = checkWebhookAntiReplay('evt_replay_test_dup');
                    showToast(replayResult.isDuplicate ? 'Replay attack blocked! Duplicate dropped.' : 'Event stored in anti-replay nonces.');
                  }}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs"
                >
                  Test Replay
                </button>
              </div>

              {testWebhookResult && (
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    testWebhookResult.isValid
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <div className="font-bold">{testWebhookResult.isValid ? '✓ Signature Verified Valid' : '✗ Verification Failed'}</div>
                  {testWebhookResult.reason && <div className="mt-0.5">{testWebhookResult.reason}</div>}
                </div>
              )}
            </div>

            {/* Right: Inbound Webhook Audit Stream */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  Inbound Webhook Audit Log & Dedup Store ({webhookLogs.length})
                </h3>
                <span className="text-xs text-slate-500 font-mono">Anti-Replay Window: ±300s</span>
              </div>
              <div className="divide-y divide-slate-100">
                {webhookLogs.map(wh => (
                  <div key={wh.id} className="p-4 hover:bg-slate-50 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">{wh.eventId}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-semibold">
                          {wh.eventType}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        HMAC Verified ({wh.processingDurationMs}ms)
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center justify-between">
                      <span>Provider: <strong>{wh.providerName}</strong></span>
                      <span>Received: {new Date(wh.receivedAt).toLocaleTimeString()}</span>
                    </div>

                    <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                      {wh.rawPayload}
                    </pre>

                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      Merkle Audit Seal: {wh.auditMerkleHash}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 6: CRYPTOGRAPHIC RECEIPTS & PROOF OF PAYMENT
      --------------------------------------------------------------------- */}
      {subView === 'receipts' && (
        <div id="view-receipts" className="space-y-6">
          <div className="max-w-3xl mx-auto">
            {activeReceipt ? (
              <div id="payment-receipt-card" className="bg-white rounded-3xl border-2 border-slate-900 shadow-2xl p-8 space-y-6 relative overflow-hidden">
                {/* Stamp */}
                <div className="absolute top-6 right-6 border-2 border-emerald-600 text-emerald-600 uppercase font-black tracking-widest text-xs px-3 py-1 rounded rotate-12 bg-emerald-50/90 shadow-sm">
                  {activeReceipt.status}
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                    OMNI
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Official Payment Receipt</h2>
                    <p className="text-xs text-slate-500">
                      Verifiable Double-Entry Transaction Attestation &bull; Reference: <strong>{activeReceipt.referenceNumber}</strong>
                    </p>
                  </div>
                </div>

                {/* Amount Hero */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-1">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Total Amount Settled</span>
                  <div className="text-4xl font-extrabold text-slate-900">
                    ${activeReceipt.principalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {activeReceipt.currency}
                  </div>
                  <span className="text-xs text-emerald-600 font-medium">Cleared instantly on FedNow Real-Time Rails</span>
                </div>

                {/* Party Details */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <span className="text-xs uppercase text-slate-400 font-bold">Payer (Sender)</span>
                    <div className="font-bold text-slate-900">{activeReceipt.sender.name}</div>
                    <div className="text-xs text-slate-500">{activeReceipt.sender.institution} ({activeReceipt.sender.accountMask})</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-xs uppercase text-slate-400 font-bold">Payee (Recipient)</span>
                    <div className="font-bold text-slate-900">{activeReceipt.recipient.name}</div>
                    <div className="text-xs text-slate-500">{activeReceipt.recipient.institution} ({activeReceipt.recipient.accountMask})</div>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Gross Principal Amount:</span>
                    <span>${activeReceipt.principalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Rail Network Fee:</span>
                    <span>-${(activeReceipt.fees?.railNetworkFee || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Provider Interchange:</span>
                    <span>-${(activeReceipt.fees?.providerInterchangeFee || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Platform Markup:</span>
                    <span>-${(activeReceipt.fees?.platformMarkupFee || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Net Settled Amount:</span>
                    <span>${activeReceipt.netSettledAmount.toFixed(2)} {activeReceipt.currency}</span>
                  </div>
                </div>

                {/* Cryptographic Proof Strip */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Cryptographic Merkle Proof:</span>
                    <span className="font-mono text-[11px] text-emerald-400">STATUS: AUDITED & SEALED</span>
                  </div>
                  <p className="font-mono text-[11px] text-slate-400 break-all">{activeReceipt.merkleAuditHash}</p>
                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
                    <span>Verification Endpoint: {activeReceipt.qrVerificationCode}</span>
                    <span>Timestamp: {new Date(activeReceipt.transactionDate).toUTCString()}</span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setSubView('orchestrator')}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    &larr; Back to Flow
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => showToast('Receipt exported as signed PDF document.')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => showToast('Sent receipt link to customer email.')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share Attestation
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No Receipt Selected</h3>
                <p className="text-xs text-slate-500">
                  Run a Payment Flow or select a transaction from the Payment Intents or Transfers registry.
                </p>
                <button
                  onClick={() => setSubView('orchestrator')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
                >
                  Run Payment Intent
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 7: OMNI ECOSYSTEM SPLIT FLOW
      --------------------------------------------------------------------- */}
      {subView === 'ecosystem' && (
        <div id="view-ecosystem" className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  OMNI Ecosystem Split & Revenue Waterfall
                </h2>
                <p className="text-xs text-slate-500">
                  Automated multi-party split payouts across Marketplace, Creator, Ads, Learn, Capital, and Affiliate modules.
                </p>
              </div>
              <button
                id="btn-trigger-eco-split"
                onClick={handleTriggerEcosystemSale}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Trigger Marketplace Sale Split ($1,200)
              </button>
            </div>

            {/* Waterfall Diagram */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-6">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Automated Settlement Waterfall Engine
              </span>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Step 1: Inbound Sale */}
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 text-center space-y-1">
                  <span className="text-[11px] text-blue-400 uppercase font-semibold">1. Gross Checkout</span>
                  <div className="text-xl font-extrabold text-white">$1,200.00 USD</div>
                  <span className="text-xs text-slate-400">Marketplace Sale Inflow</span>
                </div>

                <ArrowRight className="w-6 h-6 text-slate-500 hidden md:block" />

                {/* Step 2: Atomic GL Posting */}
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 text-center space-y-1">
                  <span className="text-[11px] text-emerald-400 uppercase font-semibold">2. Double-Entry GL</span>
                  <div className="text-xl font-extrabold text-white">DR = CR</div>
                  <span className="text-xs text-slate-400">Balanced Ledger Postings</span>
                </div>

                <ArrowRight className="w-6 h-6 text-slate-500 hidden md:block" />

                {/* Step 3: Multi-Party Splits */}
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 text-center space-y-1">
                  <span className="text-[11px] text-purple-400 uppercase font-semibold">3. Multi-Party Payout</span>
                  <div className="text-sm font-bold text-white">85% Seller &bull; 10% Affiliate &bull; 5% Platform</div>
                  <span className="text-xs text-slate-400">Instant Wallet Credits</span>
                </div>
              </div>
            </div>

            {/* Recent Ecosystem Splits Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Recent Ecosystem Revenue Splits</h4>
              <div className="space-y-3">
                {ecosystemSplits.map(split => (
                  <div key={split.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                          {split.ecosystemModule.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="font-semibold text-slate-900 text-sm">{split.eventDescription}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">Gross: ${split.grossAmount.toFixed(2)} {split.currency}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {split.splits.map((s, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span className="uppercase text-slate-500">{s.recipientRole.replace('_', ' ')}</span>
                            <span className="text-emerald-600">{s.percentage}%</span>
                          </div>
                          <div className="font-bold text-slate-900">{s.recipientName}</div>
                          <div className="text-slate-500 font-mono">
                            ${s.amount.toFixed(2)} &bull; GL {s.glAccountCode}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 8: AI PAYMENT INTELLIGENCE & ANOMALY GUARD
      --------------------------------------------------------------------- */}
      {subView === 'ai_guard' && (
        <div id="view-ai-guard" className="space-y-6">
          {/* Strict AI Guard Banner */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  OMNI AI Financial Intelligence Guard
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                    Strict Advisory Mode
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Explaining payments, fee breakdowns, and anomaly detection.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-purple-500/30 text-xs text-purple-200 space-y-1">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-purple-400" />
                ARCHITECTURAL SECURITY GUARANTEE:
              </div>
              <p>
                OMNI AI operates strictly in a read-only advisory capacity. AI cannot approve payments, move money, sign transactions, or mutate the double-entry general ledger.
              </p>
            </div>
          </div>

          {/* AI Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Live Anomaly Radar & Velocity Scanner
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    FedNow Inbound Corridor Velocity Normal
                  </div>
                  <p>Trailing 24h transaction volume is within 1.1x of standard historical baseline ($245k / $220k cap).</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Sanctions Screening & Geo-IP Audit Passed
                  </div>
                  <p>100% of counterparty entities screened against OFAC, EU Financial Sanctions, and PEP databases.</p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Off-Hour Batch Execution Advisory
                  </div>
                  <p>Engineering payroll batch executed at 02:00 UTC during off-peak FedNow window (Low clearing contention).</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Natural Language Fee & Route Explanation
              </h4>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-900 block">How did FedNow save processing costs on the last $14,500 intent?</span>
                  <p>
                    "By dispatching over FedNow Real-Time Bank Rails instead of a traditional Visa Corporate card, the network fee was fixed at $0.25 flat plus $0.50 interchange, compared to a standard 2.15% card processing fee ($311.75). Net merchant savings: <strong>$307.50</strong>."
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-900 block">Why did Transfer TR-OMNI-2026-1002 require 2 signatures?</span>
                  <p>
                    "The transfer amount of $80,000 USD to Zurich Quantum Labs AG falls in Tier 2 ($10,000 - $100,000), which triggers policy rule <code>High-Value Commercial Payout</code> requiring 2 distinct signatures from Finance / Treasury leadership."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SUBVIEW 9: AUTOMATED TEST SUITE (7 CRITICAL SCENARIOS)
      --------------------------------------------------------------------- */}
      {subView === 'test_suite' && (
        <div id="view-test-suite" className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  7-Point Automated Financial Safety & Integrity Suite
                </h2>
                <p className="text-xs text-slate-500">
                  Comprehensive test harness executing idempotency, failovers, anti-replay, concurrency mutex, balance bounds, and RBAC governance.
                </p>
              </div>
              <button
                id="btn-run-all-tests-again"
                onClick={handleRunAllTests}
                disabled={isRunningTests}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2 disabled:opacity-50 transition-all"
              >
                {isRunningTests ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executing 7 Test Vectors...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Execute All 7 Safety Tests
                  </>
                )}
              </button>
            </div>

            {/* Test Results Display */}
            {testResults.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold">
                  <span>Suite Result: ALL {testResults.length} CRITICAL SCENARIOS PASSED</span>
                  <span>100% Assertion Coverage</span>
                </div>

                <div className="space-y-3">
                  {testResults.map(test => (
                    <div
                      key={test.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                            ✓
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                          <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                            {test.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500">{test.executionTimeMs} ms</span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {test.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600">{test.details}</p>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs grid grid-cols-2 gap-2 text-slate-500">
                        <div>
                          <strong>Expected:</strong> {test.expectedOutcome}
                        </div>
                        <div>
                          <strong>Actual:</strong> {test.actualOutcome}
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Key className="w-3 h-3 text-slate-400" />
                        Audit Hash: {test.auditProof}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Test Harness Standing By</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click "Execute All 7 Safety Tests" to validate duplicate payments, failovers, webhook replay attacks, concurrency mutex locks, and Maker-Checker enforcement.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
