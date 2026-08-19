import React, { useState } from 'react';
import {
  Wallet, Briefcase, Landmark, Sliders, Database, Sparkles,
  ShieldAlert, Layers, Code2, Check, ArrowRight, UserCheck,
  ChevronDown, RefreshCw, Bell, ShieldCheck, Globe, ArrowRightLeft, Store
} from 'lucide-react';

import {
  FinanceTenant,
  FinancialAccount,
  FinanceWallet,
  FinanceTransaction,
  VirtualCard,
  PayrollRun,
  SmartInvoice,
  ExpenseItem,
  TreasuryPool,
  FinanceApprovalRequest,
  FinanceAiInsight,
  FinanceFeatureFlag,
  FinanceCurrencyRate,
  FinanceLedgerAccount,
  FinanceJournalEntry,
  FinanceProvider
} from '../../types/finance_os';

import {
  SEED_FINANCE_TENANTS,
  SEED_FINANCE_CURRENCIES,
  SEED_FINANCE_RATES,
  SEED_FINANCIAL_ACCOUNTS,
  SEED_FINANCE_WALLETS,
  SEED_FINANCE_LEDGER_ACCOUNTS,
  SEED_FINANCE_JOURNALS,
  SEED_FINANCE_TRANSACTIONS,
  SEED_FINANCE_FEATURE_FLAGS,
  SEED_FINANCE_PROVIDERS,
  SEED_VIRTUAL_CARDS,
  SEED_PAYROLL_RUNS,
  SEED_SMART_INVOICES,
  SEED_EXPENSE_ITEMS,
  SEED_TREASURY_POOLS,
  SEED_APPROVAL_RULES,
  SEED_APPROVAL_REQUESTS,
  SEED_FINANCE_AI_INSIGHTS
} from '../../data/finance_os_seed';

import {
  createBalancedJournalEntry,
  PipelineExecutionResult
} from '../../engine/omni_ledger_engine';

import PersonalFinanceDashboard from './PersonalFinanceDashboard';
import BusinessFinanceDashboard from './BusinessFinanceDashboard';
import EnterpriseFinanceDashboard from './EnterpriseFinanceDashboard';
import FinancialIdentityHub from './FinancialIdentityHub';
import FinanceFeatureControlCentre from './FinanceFeatureControlCentre';
import FinanceLedgerExplorer from './FinanceLedgerExplorer';
import FinanceAiCopilot from './FinanceAiCopilot';
import SuperAdminFinanceControl from './SuperAdminFinanceControl';
import FinanceWhiteLabelHub from './FinanceWhiteLabelHub';
import FinanceDeveloperPortal from './FinanceDeveloperPortal';
import OmniPaymentNetworkExplorer from './OmniPaymentNetworkExplorer';
import OmniFxExchangeExplorer from './OmniFxExchangeExplorer';
import { OmniCommerceSettlementExplorer } from './OmniCommerceSettlementExplorer';
import OmniBusinessFinanceSuite from './OmniBusinessFinanceSuite';
import OmniComplianceTrustSecuritySuite from './OmniComplianceTrustSecuritySuite';
import OmniEmbeddedDeveloperPlatform from './OmniEmbeddedDeveloperPlatform';
import OmniWhiteLabelInstitutionPlatform from './OmniWhiteLabelInstitutionPlatform';
import OmniGlobalFinanceExpansionPlatform from './OmniGlobalFinanceExpansionPlatform';

export type FinanceTab =
  | 'identity'
  | 'personal'
  | 'payments'
  | 'fx_engine'
  | 'commerce'
  | 'business'
  | 'enterprise'
  | 'compliance_security'
  | 'feature_control'
  | 'ledger'
  | 'ai_copilot'
  | 'super_admin'
  | 'white_label'
  | 'developer'
  | 'global_expansion';

export default function OmniFinanceRoot() {
  const [activeTab, setActiveTab] = useState<FinanceTab>('personal');
  const [tenants, setTenants] = useState<FinanceTenant[]>(SEED_FINANCE_TENANTS);
  const [activeTenantId, setActiveTenantId] = useState<string>(SEED_FINANCE_TENANTS[0].id);

  // Entities state
  const [accounts, setAccounts] = useState<FinancialAccount[]>(SEED_FINANCIAL_ACCOUNTS);
  const [wallets, setWallets] = useState<FinanceWallet[]>(SEED_FINANCE_WALLETS);
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(SEED_FINANCE_TRANSACTIONS);
  const [invoices, setInvoices] = useState<SmartInvoice[]>(SEED_SMART_INVOICES);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(SEED_PAYROLL_RUNS);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(SEED_EXPENSE_ITEMS);
  const [treasuryPools, setTreasuryPools] = useState<TreasuryPool[]>(SEED_TREASURY_POOLS);
  const [approvals, setApprovals] = useState<FinanceApprovalRequest[]>(SEED_APPROVAL_REQUESTS);
  const [featureFlags, setFeatureFlags] = useState<FinanceFeatureFlag[]>(SEED_FINANCE_FEATURE_FLAGS);
  const [journalEntries, setJournalEntries] = useState<FinanceJournalEntry[]>(SEED_FINANCE_JOURNALS);
  const [ledgerAccounts, setLedgerAccounts] = useState<FinanceLedgerAccount[]>(SEED_FINANCE_LEDGER_ACCOUNTS);
  const [providers, setProviders] = useState<FinanceProvider[]>(SEED_FINANCE_PROVIDERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeTenant = tenants.find((t) => t.id === activeTenantId) || tenants[0];
  const activeWallet = wallets.find((w) => w.tenantId === activeTenantId) || wallets[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers
  const handleSendPayment = (amount: number, recipient: string, note: string) => {
    const newTx: FinanceTransaction = {
      id: `ftx_${Date.now()}`,
      tenantId: activeTenantId,
      accountId: accounts[0].id,
      type: 'payment',
      direction: 'outbound',
      amount,
      currency: 'USD',
      usdEquivalent: amount,
      feeAmount: 0,
      feeCurrency: 'USD',
      sourceInstrument: 'Primary Checking / Vault',
      counterpartyName: recipient,
      counterpartyAccountOrHandle: recipient,
      rail: 'fednow',
      status: 'settled',
      category: 'personal_lifestyle',
      memo: note,
      tags: ['transfer', 'instant'],
      referenceNumber: `REF-FEDNOW-${Math.floor(100000 + Math.random() * 900000)}`,
      riskScore: 1,
      createdAt: new Date().toISOString(),
      settledAt: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Instant transfer of $${amount.toLocaleString()} sent to ${recipient} via FedNow!`);
  };

  const handleCreateSavingsGoal = (title: string, targetAmount: number) => {
    showToast(`Created new locked savings vault: "${title}" target $${targetAmount.toLocaleString()}`);
  };

  const handleCreateInvoice = (customerName: string, amount: number, desc: string) => {
    const newInv: SmartInvoice = {
      id: `inv_${Date.now()}`,
      tenantId: activeTenantId,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerEmail: `billing@${customerName.toLowerCase().replace(/\s+/g, '')}.com`,
      lineItems: [{ description: desc, quantity: 1, unitPrice: amount, total: amount }],
      subtotal: amount,
      taxAmount: 0,
      totalAmount: amount,
      currency: 'USD',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'issued',
      isFactored: false,
      advanceOfferedAmount: amount * 0.9,
      paymentLink: `https://pay.omni.com/inv/${Date.now()}`
    };

    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Smart Invoice #${newInv.invoiceNumber} created and dispatched to ${customerName}!`);
  };

  const handleRunPayroll = (payPeriod: string, totalGross: number, employeesCount: number) => {
    const newRun: PayrollRun = {
      id: `payrun_${Date.now()}`,
      tenantId: activeTenantId,
      payPeriod,
      totalGrossPay: totalGross,
      totalTaxesWithheld: totalGross * 0.21,
      totalNetDisbursement: totalGross * 0.79,
      currency: 'USD',
      employeesCount,
      status: 'disbursed',
      scheduledDisbursementDate: new Date().toISOString(),
      directDepositRail: 'fednow'
    };

    setPayrollRuns((prev) => [newRun, ...prev]);
    showToast(`Payroll batch disbursed for ${employeesCount} employees ($${totalGross.toLocaleString()} Gross) via FedNow!`);
  };

  const handleApproveRequest = (requestId: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === requestId
          ? {
              ...a,
              status: 'approved',
              approvedBy: [
                ...a.approvedBy,
                { userId: 'usr_curr_session', userName: 'You (Authorized Officer)', timestamp: new Date().toISOString(), ipHash: 'sha256_verified' }
              ]
            }
          : a
      )
    );
    showToast('Governance dual-signoff approved! Transaction release unlocked.');
  };

  const handleFactorInvoice = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, isFactored: true } : i))
    );
    showToast('Instant Factoring Advance credited ($405,000) to main operating account!');
  };

  const handleExecuteFxSwap = (fromCurr: string, toCurr: string, amount: number) => {
    showToast(`Wholesale FX Swap executed: Sold ${amount.toLocaleString()} ${fromCurr} for ${toCurr} at mid-market spot!`);
  };

  const handleRebalancePool = (poolId: string) => {
    showToast('Autonomous treasury cash sweep rebalanced across multi-entity sweep accounts.');
  };

  const handleToggleFeature = (featureId: string, isInstalled: boolean) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, isInstalled } : f))
    );
    showToast(`Feature flag ${isInstalled ? 'Activated' : 'Deactivated'}`);
  };

  const handleCreateJournalEntry = (desc: string, debitGl: string, creditGl: string, amount: number) => {
    const debitAccount = ledgerAccounts.find(a => a.glCode === debitGl) || ledgerAccounts[0];
    const creditAccount = ledgerAccounts.find(a => a.glCode === creditGl) || ledgerAccounts[1];
    const prevHash = journalEntries[journalEntries.length - 1]?.verificationMerkleHash;

    const newJe = createBalancedJournalEntry({
      tenantId: activeTenantId,
      description: desc,
      sourceModule: 'manual_adjustment',
      sourceReferenceId: `man_${Date.now()}`,
      postedByUserId: 'usr_curr_session',
      previousMerkleHash: prevHash,
      postings: [
        {
          ledgerAccountId: debitAccount.id,
          glCode: debitAccount.glCode,
          accountName: debitAccount.name,
          entryType: 'debit',
          amount,
          currency: debitAccount.currency || 'USD',
          fxRateToBase: 1.0,
          baseAmountUsd: amount,
          memo: `Debit ${debitAccount.name}`
        },
        {
          ledgerAccountId: creditAccount.id,
          glCode: creditAccount.glCode,
          accountName: creditAccount.name,
          entryType: 'credit',
          amount,
          currency: creditAccount.currency || 'USD',
          fxRateToBase: 1.0,
          baseAmountUsd: amount,
          memo: `Credit ${creditAccount.name}`
        }
      ]
    });

    setJournalEntries((prev) => [newJe, ...prev]);
    showToast(`Balanced Journal Entry ${newJe.entryNumber} posted to General Ledger!`);
  };

  const handleAddLedgerAccount = (newAcc: FinanceLedgerAccount) => {
    setLedgerAccounts((prev) => [...prev, newAcc]);
    showToast(`New GL Account ${newAcc.glCode} (${newAcc.name}) created in Chart of Accounts!`);
  };

  const handleReverseJournalEntry = (reversalEntry: FinanceJournalEntry, updatedOriginal: FinanceJournalEntry) => {
    setJournalEntries((prev) =>
      prev.map((je) => (je.id === updatedOriginal.id ? updatedOriginal : je)).concat(reversalEntry)
    );
    showToast(`Journal Entry ${updatedOriginal.entryNumber} reversed via ${reversalEntry.entryNumber}!`);
  };

  const handlePipelineExecute = (result: PipelineExecutionResult) => {
    setTransactions((prev) => [result.transaction, ...prev]);
    setJournalEntries((prev) => [result.journalEntry, ...prev]);
    showToast(`8-Step Pipeline executed: Tx ${result.transaction.referenceNumber} committed & posted!`);
  };

  const handleToggleProviderStatus = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? { ...p, status: p.status === 'operational' ? 'maintenance' : 'operational' }
          : p
      )
    );
    showToast('Provider connectivity status updated.');
  };

  const handleProvisionTenant = (name: string, type: string, country: string, currency: string) => {
    const newTenant: FinanceTenant = {
      id: `ft_tenant_${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: type as any,
      country,
      currency,
      jurisdiction: `${country} Sovereign Law`,
      organizationId: `org_${Date.now()}`,
      ownerUserId: 'usr_curr_session',
      complianceTier: 'tier_4_corporate_kyb',
      riskLevel: 'very_low',
      isWhiteLabelTenant: type === 'whitelabel_fintech',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTenants((prev) => [...prev, newTenant]);
    showToast(`Provisioned new isolated finance tenant: "${name}"`);
  };

  const handleUpdateWhiteLabel = (tenantId: string, brandName: string, domain: string, markupBps: number) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? {
              ...t,
              whiteLabelConfig: {
                brandName,
                logoUrl: 'https://novapay.global/assets/logo.svg',
                customDomain: domain,
                primaryColor: '#06b6d4',
                feeMarkupBps: markupBps,
                binRangePrefix: '482910'
              }
            }
          : t
      )
    );
    showToast('White-Label branding and margin markup saved!');
  };

  const tabs = [
    { id: 'identity', label: 'Financial Identity & Wallets', icon: UserCheck, badge: 'Passport' },
    { id: 'personal', label: 'Personal Wealth', icon: Wallet, badge: 'Sovereign' },
    { id: 'payments', label: 'Payment Network', icon: Globe, badge: 'Multi-Rail' },
    { id: 'fx_engine', label: 'Global FX Engine', icon: ArrowRightLeft, badge: 'Multi-Currency' },
    { id: 'commerce', label: 'Commerce Settlement', icon: Store, badge: 'Settlement' },
    { id: 'business', label: 'Business Operations', icon: Briefcase, badge: 'Commercial' },
    { id: 'enterprise', label: 'Global Treasury', icon: Landmark, badge: 'Holding' },
    { id: 'compliance_security', label: 'Trust & Security Platform', icon: ShieldCheck, badge: 'AML/KYC' },
    { id: 'feature_control', label: 'Feature Matrix', icon: Sliders, badge: 'Matrix' },
    { id: 'ledger', label: 'General Ledger', icon: Database, badge: 'Double-Entry' },
    { id: 'ai_copilot', label: 'AI Finance Intelligence', icon: Sparkles, badge: '7 Agents' },
    { id: 'white_label', label: 'White-Label Institutions', icon: Layers, badge: 'BaaS Builder' },
    { id: 'developer', label: 'Embedded Finance & APIs', icon: Code2, badge: 'developers.omni' },
    { id: 'global_expansion', label: 'Global & Mobile Expansion', icon: Globe, badge: '190+ Countries' },
    { id: 'super_admin', label: 'Super Admin', icon: ShieldAlert, badge: 'Root' }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8 space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-950/95 border border-emerald-700 text-emerald-200 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main OMNI Finance OS Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OMNI Finance OS • Global Financial Operating System</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-1">
            OMNI Finance OS
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Unified financial infrastructure powering personal wealth, commercial business, global multi-entity holding treasuries, and white-label fintech operators.
          </p>
        </div>

        {/* Tenant Switcher & Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2 bg-stone-900 rounded-xl border border-stone-800 flex items-center gap-2 text-xs">
            <span className="text-stone-400 font-mono">Tenant Scope:</span>
            <select
              value={activeTenantId}
              onChange={(e) => {
                setActiveTenantId(e.target.value);
                showToast(`Switched active tenant to: ${tenants.find(t => t.id === e.target.value)?.name}`);
              }}
              className="bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1 text-white font-semibold text-xs outline-none cursor-pointer"
            >
              {tenants.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.type.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>MFA &amp; RLS Enforced</span>
          </div>
        </div>
      </div>

      {/* Master Top Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-900/90 rounded-2xl border border-stone-800 text-xs font-semibold overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FinanceTab)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap cursor-pointer transition flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-950/50'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                isActive ? 'bg-emerald-800/80 text-emerald-100' : 'bg-stone-800 text-stone-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View Rendering */}
      <div>
        {activeTab === 'identity' && (
          <FinancialIdentityHub onNotify={showToast} />
        )}

        {activeTab === 'personal' && (
          <PersonalFinanceDashboard
            wallet={activeWallet}
            accounts={accounts.filter(a => a.tenantId === activeTenantId || a.tenantId === 'ft_tenant_personal_gideon')}
            transactions={transactions}
            cards={SEED_VIRTUAL_CARDS}
            insights={SEED_FINANCE_AI_INSIGHTS}
            onSendPayment={handleSendPayment}
            onCreateSavingsGoal={handleCreateSavingsGoal}
          />
        )}

        {activeTab === 'payments' && (
          <OmniPaymentNetworkExplorer
            activeTenant={activeTenant}
            ledgerAccounts={ledgerAccounts}
            journalEntries={journalEntries}
            onAddJournalEntry={(newEntry) => setJournalEntries((prev) => [newEntry, ...prev])}
            showToast={showToast}
          />
        )}

        {activeTab === 'fx_engine' && (
          <OmniFxExchangeExplorer
            activeTenant={activeTenant}
            ledgerAccounts={ledgerAccounts}
            journalEntries={journalEntries}
            onAddJournalEntry={(newEntry) => setJournalEntries((prev) => [newEntry, ...prev])}
            showToast={showToast}
          />
        )}

        {activeTab === 'commerce' && (
          <OmniCommerceSettlementExplorer
            ledgerAccounts={ledgerAccounts}
            journalEntries={journalEntries}
            onAddJournalEntry={(newEntry) => setJournalEntries((prev) => [newEntry, ...prev])}
            showToast={showToast}
          />
        )}

        {activeTab === 'business' && (
          <OmniBusinessFinanceSuite
            tenant={activeTenant}
            onOpenLedgerEntry={(jeId) => {
              setActiveTab('ledger');
              showToast(`Navigated to General Ledger for entry ${jeId}`);
            }}
          />
        )}

        {activeTab === 'enterprise' && (
          <EnterpriseFinanceDashboard
            tenants={tenants}
            activeTenant={activeTenant}
            accounts={accounts}
            treasuryPools={treasuryPools}
            fxRates={SEED_FINANCE_RATES}
            journalEntries={journalEntries}
            approvalRules={SEED_APPROVAL_RULES}
            onExecuteFxSwap={handleExecuteFxSwap}
            onRebalancePool={handleRebalancePool}
          />
        )}

        {activeTab === 'compliance_security' && (
          <OmniComplianceTrustSecuritySuite
            activeTenant={activeTenant}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'feature_control' && (
          <FinanceFeatureControlCentre
            features={featureFlags}
            onToggleFeature={handleToggleFeature}
            onUpdateCountryScope={() => {}}
          />
        )}

        {activeTab === 'ledger' && (
          <FinanceLedgerExplorer
            ledgerAccounts={ledgerAccounts}
            journalEntries={journalEntries}
            onCreateJournalEntry={handleCreateJournalEntry}
            onAddLedgerAccount={handleAddLedgerAccount}
            onReverseJournalEntry={handleReverseJournalEntry}
            onPipelineExecute={handlePipelineExecute}
          />
        )}

        {activeTab === 'ai_copilot' && (
          <FinanceAiCopilot
            insights={SEED_FINANCE_AI_INSIGHTS}
            activeTenant={activeTenant}
            onApplyInsightAction={(id) => showToast(`Executing insight recommendation #${id}`)}
          />
        )}

        {activeTab === 'super_admin' && (
          <SuperAdminFinanceControl
            tenants={tenants}
            providers={providers}
            currencies={SEED_FINANCE_CURRENCIES}
            onToggleProviderStatus={handleToggleProviderStatus}
            onProvisionTenant={handleProvisionTenant}
          />
        )}

        {activeTab === 'white_label' && (
          <OmniWhiteLabelInstitutionPlatform
            activeTenant={activeTenant}
            onShowToast={showToast}
            onTenantSwitch={(id) => setActiveTenantId(id)}
          />
        )}

        {activeTab === 'developer' && (
          <OmniEmbeddedDeveloperPlatform
            activeTenant={activeTenant}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'global_expansion' && (
          <OmniGlobalFinanceExpansionPlatform
            activeTenant={activeTenant}
            onShowToast={showToast}
          />
        )}
      </div>
    </div>
  );
}
