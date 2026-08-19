import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  FileText,
  DollarSign,
  Receipt,
  Users,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Filter,
  Download,
  Zap,
  Sparkles,
  Link as LinkIcon,
  CreditCard,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Check,
  X,
  Scan,
  RefreshCw,
  Eye,
  FileCode,
  Layers,
  Settings,
  HelpCircle,
  Play,
  Send,
  Lock,
  Search,
  Sliders
} from 'lucide-react';

import {
  BusinessProfile,
  BusinessDepartment,
  BusinessBranch,
  BusinessCostCentre,
  BusinessProject,
  BusinessEmployee,
  BusinessInvoice,
  InvoiceLineItem,
  BusinessPaymentLink,
  BusinessExpenseItem,
  BusinessPayrollRun,
  EmployeePayslipItem,
  BusinessApprovalRuleConfig,
  BusinessAiCfoReport,
  SuperAdminBusinessSuiteConfig,
  BusinessTestSuiteResult
} from '../../types/omni_business_suite';

import {
  SEED_BUSINESS_PROFILE,
  SEED_BUSINESS_DEPARTMENTS,
  SEED_BUSINESS_BRANCHES,
  SEED_BUSINESS_COST_CENTRES,
  SEED_BUSINESS_PROJECTS,
  SEED_BUSINESS_EMPLOYEES,
  SEED_BUSINESS_POLICIES,
  SEED_BUSINESS_INVOICES,
  SEED_BUSINESS_PAYMENT_LINKS,
  SEED_BUSINESS_EXPENSES,
  SEED_BUSINESS_PAYROLL_RUNS,
  SEED_BUSINESS_APPROVAL_RULES,
  SEED_BUSINESS_AI_REPORTS,
  SEED_SUPER_ADMIN_BUSINESS_CONFIG,
  calculateInvoiceTotals,
  createAndPostInvoice,
  recordInvoicePayment,
  issueCreditNote,
  simulateOcrReceiptScan,
  calculateEmployeePayroll,
  executeEnterprisePayrollRun,
  calculateArAging,
  OmniBusinessTestSuite
} from '../../engine/omni_business_engine';

import { FinanceTenant } from '../../types/finance_os';

interface OmniBusinessFinanceSuiteProps {
  tenant: FinanceTenant;
  onOpenLedgerEntry?: (journalEntryId: string) => void;
}

export default function OmniBusinessFinanceSuite({
  tenant,
  onOpenLedgerEntry
}: OmniBusinessFinanceSuiteProps) {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'invoices'
    | 'payment_links'
    | 'expenses'
    | 'payroll'
    | 'accounting'
    | 'approvals'
    | 'ai_cfo'
    | 'admin_config'
    | 'test_suite'
  >('overview');

  // State
  const [profile, setProfile] = useState<BusinessProfile>(SEED_BUSINESS_PROFILE);
  const [invoices, setInvoices] = useState<BusinessInvoice[]>(SEED_BUSINESS_INVOICES);
  const [paymentLinks, setPaymentLinks] = useState<BusinessPaymentLink[]>(SEED_BUSINESS_PAYMENT_LINKS);
  const [expenses, setExpenses] = useState<BusinessExpenseItem[]>(SEED_BUSINESS_EXPENSES);
  const [payrollRuns, setPayrollRuns] = useState<BusinessPayrollRun[]>(SEED_BUSINESS_PAYROLL_RUNS);
  const [employees, setEmployees] = useState<BusinessEmployee[]>(SEED_BUSINESS_EMPLOYEES);
  const [approvalRules, setApprovalRules] = useState<BusinessApprovalRuleConfig[]>(SEED_BUSINESS_APPROVAL_RULES);
  const [aiReports] = useState<BusinessAiCfoReport[]>(SEED_BUSINESS_AI_REPORTS);
  const [adminConfig, setAdminConfig] = useState<SuperAdminBusinessSuiteConfig>(SEED_SUPER_ADMIN_BUSINESS_CONFIG);
  const [testResults, setTestResults] = useState<BusinessTestSuiteResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Modals & Selection states
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<BusinessInvoice | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<BusinessInvoice | null>(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState('');
  const [paymentRailInput, setPaymentRailInput] = useState<'fednow' | 'ach' | 'wire' | 'card_network' | 'stablecoin_usdc'>('fednow');

  const [showCreditNoteModal, setShowCreditNoteModal] = useState<BusinessInvoice | null>(null);
  const [creditNoteAmountInput, setCreditNoteAmountInput] = useState('');
  const [creditNoteReasonInput, setCreditNoteReasonInput] = useState('');

  // Payment Link modal
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkAmount, setLinkAmount] = useState('250.00');
  const [linkCurrency, setLinkCurrency] = useState('USD');
  const [selectedPaymentLinkForPreview, setSelectedPaymentLinkForPreview] = useState<BusinessPaymentLink | null>(null);

  // Expense modal & OCR scanner state
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);
  const [expenseMerchant, setExpenseMerchant] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<BusinessExpenseItem['category']>('software_saas');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseReceiptName, setExpenseReceiptName] = useState('Uber_Trip_Receipt_0818.pdf');
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [ocrPreviewResult, setOcrPreviewResult] = useState<any>(null);

  // Payroll modal & selected payslip
  const [showRunPayrollModal, setShowRunPayrollModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<EmployeePayslipItem | null>(null);
  const [payrollPeriodTitleInput, setPayrollPeriodTitleInput] = useState('August 2026 - Monthly Sovereign Run');

  // New Invoice Form state
  const [newInvCustomerName, setNewInvCustomerName] = useState('');
  const [newInvCustomerEmail, setNewInvCustomerEmail] = useState('');
  const [newInvDueDate, setNewInvDueDate] = useState('2026-09-15');
  const [newInvItems, setNewInvItems] = useState<InvoiceLineItem[]>([
    {
      id: 'item_1',
      description: 'Enterprise Sovereign Platform License',
      quantity: 1,
      unitPrice: 15000,
      taxRatePercent: 0,
      taxAmount: 0,
      totalAmount: 15000
    }
  ]);

  // Financial aggregates
  const totalReceivables = invoices
    .filter((i) => i.status === 'issued' || i.status === 'partially_paid' || i.status === 'viewed')
    .reduce((acc, i) => acc + i.amountDue, 0);

  const totalInvoicedYtd = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollectedYtd = invoices.reduce((acc, i) => acc + i.amountPaid, 0);
  const totalExpensesYtd = expenses.reduce((acc, e) => acc + e.amount, 0);
  const totalPayrollMonthly = employees.reduce((acc, e) => acc + calculateEmployeePayroll(e).grossPay, 0);

  // Handlers
  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvCustomerName || newInvItems.length === 0) return;

    const { invoice } = createAndPostInvoice({
      tenantId: tenant.id,
      customerName: newInvCustomerName,
      customerEmail: newInvCustomerEmail || 'finance@customer.com',
      billingAddress: 'Sovereign Business Center',
      lineItems: newInvItems,
      currency: 'USD',
      paymentTerms: 'net_15',
      dueDate: newInvDueDate
    });

    setInvoices([invoice, ...invoices]);
    setShowNewInvoiceModal(false);
    setSelectedInvoice(invoice);
  };

  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPaymentModal) return;
    const amt = parseFloat(paymentAmountInput);
    if (!amt || amt <= 0) return;

    const { updatedInvoice } = recordInvoicePayment({
      tenantId: tenant.id,
      invoice: showPaymentModal,
      paymentAmount: amt,
      paymentRail: paymentRailInput,
      transactionReference: `TX_MANUAL_${Date.now()}`
    });

    setInvoices(invoices.map((i) => (i.id === updatedInvoice.id ? updatedInvoice : i)));
    setShowPaymentModal(null);
    setPaymentAmountInput('');
  };

  const handleIssueCreditNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showCreditNoteModal) return;
    const amt = parseFloat(creditNoteAmountInput);
    if (!amt || amt <= 0) return;

    const { updatedInvoice } = issueCreditNote({
      tenantId: tenant.id,
      invoice: showCreditNoteModal,
      creditAmount: amt,
      reason: creditNoteReasonInput || 'Commercial concession'
    });

    setInvoices(invoices.map((i) => (i.id === updatedInvoice.id ? updatedInvoice : i)));
    setShowCreditNoteModal(null);
    setCreditNoteAmountInput('');
    setCreditNoteReasonInput('');
  };

  const handleSimulateOcr = (fileName: string) => {
    setIsScanningOcr(true);
    setExpenseReceiptName(fileName);
    setTimeout(() => {
      const ocr = simulateOcrReceiptScan({
        receiptFileName: fileName,
        existingExpenses: expenses
      });
      setOcrPreviewResult(ocr);
      setExpenseMerchant(ocr.merchantNameExtracted);
      setExpenseAmount(ocr.totalAmountExtracted.toString());
      setIsScanningOcr(false);
    }, 600);
  };

  const handleCreateExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expenseAmount);
    if (!amt || !expenseMerchant) return;

    const newExp: BusinessExpenseItem = {
      id: `exp_${Date.now()}`,
      tenantId: tenant.id,
      expenseNumber: `EXP-2026-${Math.floor(100 + Math.random() * 900)}`,
      submitterUserId: 'emp_001_aris',
      submitterName: 'Dr. Aris Thorne',
      submitterEmail: 'aris.thorne@omni-corp.com',
      departmentId: 'dept_eng_01',
      departmentName: 'Engineering & Infrastructure',
      costCentreId: 'cc_101_cloud',
      merchantName: expenseMerchant,
      category: expenseCategory,
      glAccountCode: ocrPreviewResult?.suggestedGlAccountCode || '5030',
      description: expenseDesc || `${expenseCategory} expenditure`,
      amount: amt,
      currency: 'USD',
      usdEquivalent: amt,
      expenseDate: new Date().toISOString().split('T')[0],
      receiptFileName: expenseReceiptName,
      ocrAnalysis: ocrPreviewResult || undefined,
      isPolicyViolated: false,
      approvalStatus: amt > 500 ? 'pending_finance_director' : 'approved_ready_for_payment',
      approversFlow: [
        {
          level: 1,
          approverRole: 'Department Manager',
          approverName: 'Dr. Aris Thorne',
          approvedAt: new Date().toISOString(),
          comments: 'Auto-verified with OCR'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setExpenses([newExp, ...expenses]);
    setShowNewExpenseModal(false);
    setExpenseMerchant('');
    setExpenseAmount('');
    setExpenseDesc('');
    setOcrPreviewResult(null);
  };

  const handleExecutePayrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { payrollRun } = executeEnterprisePayrollRun({
      tenantId: tenant.id,
      payPeriodTitle: payrollPeriodTitleInput,
      employees,
      approverName: 'Marcus Sterling',
      approverRole: 'Finance Director & Signer'
    });

    setPayrollRuns([payrollRun, ...payrollRuns]);
    setShowRunPayrollModal(false);
  };

  const handleRunAllTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      const results = OmniBusinessTestSuite.runAllTests(tenant.id);
      setTestResults(results);
      setIsRunningTests(false);
    }, 450);
  };

  const arAgingBuckets = calculateArAging(invoices);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-indigo-950/50 to-stone-900 border border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            <Building className="w-4 h-4 text-indigo-400" />
            <span>OMNI Business Finance Operating System • Multi-Entity Ledger Ready</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
            <span>{profile.legalEntityName}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono">
              Tier: {profile.tier}
            </span>
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            Enterprise Invoicing • Smart OCR Expenses • Multi-Jurisdiction Payroll • Double-Entry Accounting
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowNewInvoiceModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
          <button
            onClick={() => setShowNewExpenseModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-sm font-medium transition"
          >
            <Scan className="w-4 h-4 text-emerald-400" />
            <span>Scan Receipt</span>
          </button>
          <button
            onClick={() => setShowRunPayrollModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-sm font-medium transition"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Run Payroll</span>
          </button>
          <button
            onClick={handleRunAllTests}
            className="flex items-center gap-2 px-3.5 py-2 bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/50 rounded-xl text-sm font-medium transition"
          >
            <Play className="w-4 h-4 text-purple-400" />
            <span>Run Suite Tests</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-800 scrollbar-thin">
        {[
          { id: 'overview', label: 'Executive Overview', icon: Briefcase },
          { id: 'invoices', label: 'Invoices & Receivables', icon: FileText, count: invoices.length },
          { id: 'payment_links', label: 'Payment Links', icon: LinkIcon, count: paymentLinks.length },
          { id: 'expenses', label: 'Expenses & AI OCR', icon: Receipt, count: expenses.length },
          { id: 'payroll', label: 'Payroll & Taxes', icon: Users, count: employees.length },
          { id: 'accounting', label: 'Accounting & P&L', icon: PieChart },
          { id: 'approvals', label: 'Approval Workflows', icon: ShieldCheck, count: expenses.filter(e => e.approvalStatus.includes('pending')).length },
          { id: 'ai_cfo', label: 'AI CFO Advisory', icon: Sparkles },
          { id: 'admin_config', label: 'Super Admin Settings', icon: Settings },
          { id: 'test_suite', label: 'Test Harness Matrix', icon: CheckCircle2, count: testResults.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-400">Total Outstanding A/R</span>
                <span className="p-2 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/30">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-white mt-3 font-mono">
                ${totalReceivables.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 mt-2 font-medium">
                <span>{invoices.filter((i) => i.amountDue > 0).length} Uncollected Invoices</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-400">YTD Revenue Billed</span>
                <span className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/30">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-white mt-3 font-mono">
                ${totalInvoicedYtd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>${totalCollectedYtd.toLocaleString()} settled to cash</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-400">Monthly Payroll & Benefits</span>
                <span className="p-2 rounded-xl bg-sky-950/60 text-sky-400 border border-sky-800/30">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-white mt-3 font-mono">
                ${totalPayrollMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-2 font-medium">
                <span>{employees.length} Full-time Sovereign Team</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-400">Operational Cash Runway</span>
                <span className="p-2 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/30">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold text-white mt-3 font-mono">22.4 Months</div>
              <div className="flex items-center gap-1.5 text-xs text-purple-400 mt-2 font-medium">
                <span>Net Burn: $148.2k/mo</span>
              </div>
            </div>
          </div>

          {/* Org Structure & Cost Centers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Departments & Budget Spend */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">Department Budgets & YTD Spend</h3>
                  <p className="text-xs text-stone-400">Active cost centre allocations across business units</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 border border-stone-700 font-mono">
                  {profile.departments.length} Departments
                </span>
              </div>

              <div className="space-y-3.5">
                {profile.departments.map((dept) => {
                  const percentUsed = Math.round((dept.spentYtdUsd / dept.budgetAnnualUsd) * 100);
                  return (
                    <div key={dept.id} className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/40 font-semibold">
                            {dept.code}
                          </span>
                          <span className="font-medium text-stone-200">{dept.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-medium text-white">${dept.spentYtdUsd.toLocaleString()}</span>
                          <span className="text-stone-500 text-xs"> / ${dept.budgetAnnualUsd.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            percentUsed > 85 ? 'bg-amber-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${Math.min(100, percentUsed)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span>Lead: {dept.headOfDepartment}</span>
                        <span className="font-mono">{percentUsed}% utilized</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Global Branches & Entities */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Global Sovereign Branches</h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 font-mono">
                  {profile.branches.length}
                </span>
              </div>

              <div className="space-y-3">
                {profile.branches.map((branch) => (
                  <div key={branch.id} className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-200">{branch.city}</span>
                      {branch.isHeadquarters && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          HQ
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-400 truncate">{branch.name}</div>
                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-800/60">
                      <span>{branch.taxJurisdiction}</span>
                      <span className="font-mono text-indigo-400 font-medium">{branch.currency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVOICES & RECEIVABLES */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Invoicing & Accounts Receivable</h2>
              <p className="text-xs text-stone-400">
                Track client billing, recurring invoices, partial payments, credit notes, and instant factoring advances
              </p>
            </div>
            <button
              onClick={() => setShowNewInvoiceModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Smart Invoice</span>
            </button>
          </div>

          {/* Invoices List */}
          <div className="overflow-hidden rounded-2xl bg-stone-900 border border-stone-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-950/80 text-stone-400 font-mono text-xs uppercase border-b border-stone-800">
                  <tr>
                    <th className="px-5 py-3.5">Invoice #</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Issue / Due Date</th>
                    <th className="px-5 py-3.5 text-right">Total Amount</th>
                    <th className="px-5 py-3.5 text-right">Amount Paid</th>
                    <th className="px-5 py-3.5 text-right">Balance Due</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {invoices.map((inv) => {
                    const statusColors: Record<string, string> = {
                      paid_in_full: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                      partially_paid: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                      issued: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
                      overpaid: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                      past_due: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    };

                    return (
                      <tr key={inv.id} className="hover:bg-stone-800/40 transition">
                        <td className="px-5 py-4 font-mono font-semibold text-indigo-400">
                          {inv.invoiceNumber}
                          {inv.isRecurring && (
                            <span className="block text-[10px] text-stone-500 uppercase font-sans">Recurring ({inv.recurringSchedule?.frequency})</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-stone-200">{inv.customer.name}</div>
                          <div className="text-xs text-stone-500">{inv.customer.companyName || inv.customer.email}</div>
                        </td>
                        <td className="px-5 py-4 text-xs text-stone-400 font-mono">
                          <div>Issued: {inv.issueDate}</div>
                          <div>Due: {inv.dueDate}</div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-semibold text-white">
                          ${inv.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-emerald-400 font-medium">
                          ${inv.amountPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-semibold text-white">
                          ${inv.amountDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono border uppercase ${
                              statusColors[inv.status] || 'bg-stone-800 text-stone-400 border-stone-700'
                            }`}
                          >
                            {inv.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inv.amountDue > 0 && (
                              <button
                                onClick={() => {
                                  setShowPaymentModal(inv);
                                  setPaymentAmountInput(inv.amountDue.toString());
                                }}
                                className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition"
                              >
                                Record Pay
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setShowCreditNoteModal(inv);
                                setCreditNoteAmountInput((inv.totalAmount * 0.1).toFixed(2));
                              }}
                              className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-lg text-xs font-medium transition"
                            >
                              Credit Note
                            </button>
                            <button
                              onClick={() => setSelectedInvoice(inv)}
                              className="p-1 text-stone-400 hover:text-white"
                              title="View Invoice Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT LINKS */}
      {activeTab === 'payment_links' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Hosted Sovereign Payment Links</h2>
              <p className="text-xs text-stone-400">
                Shareable checkout links supporting Instant FedNow, Cards, SEPA, and USDC Stablecoins
              </p>
            </div>
            <button
              onClick={() => setShowNewLinkModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Payment Link</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentLinks.map((link) => (
              <div key={link.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-base">{link.title}</h3>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2">{link.description}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {link.status}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950/70 border border-stone-800 font-mono text-sm">
                  <span className="text-stone-400 text-xs font-sans">Price:</span>
                  <span className="text-lg font-bold text-white">
                    ${link.amount.toLocaleString()} {link.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Collected: {link.totalPaymentsCollected} payments</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    ${link.totalVolumeUsd.toLocaleString()} Vol
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                  <input
                    type="text"
                    readOnly
                    value={link.hostedUrl}
                    className="flex-1 px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-lg text-xs font-mono text-stone-300"
                  />
                  <button
                    onClick={() => setSelectedPaymentLinkForPreview(link)}
                    className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Checkout Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXPENSES & AI OCR SCANNER */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Smart Expense Platform & AI OCR</h2>
              <p className="text-xs text-stone-400">
                Automated receipt reading, GL account code suggestion, duplicate detection, and reimbursement dispatch
              </p>
            </div>
            <button
              onClick={() => setShowNewExpenseModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
            >
              <Scan className="w-4 h-4" />
              <span>Submit Expense with Receipt</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl bg-stone-900 border border-stone-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-950/80 text-stone-400 font-mono text-xs uppercase border-b border-stone-800">
                  <tr>
                    <th className="px-5 py-3.5">Expense #</th>
                    <th className="px-5 py-3.5">Submitter & Department</th>
                    <th className="px-5 py-3.5">Merchant & Category</th>
                    <th className="px-5 py-3.5">OCR Status</th>
                    <th className="px-5 py-3.5 text-right">Amount</th>
                    <th className="px-5 py-3.5 text-center">Approval State</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-stone-800/40 transition">
                      <td className="px-5 py-4 font-mono font-semibold text-indigo-400">{exp.expenseNumber}</td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-stone-200">{exp.submitterName}</div>
                        <div className="text-xs text-stone-500">{exp.departmentName}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{exp.merchantName}</div>
                        <div className="text-xs text-stone-400">{exp.category.replace(/_/g, ' ')} • GL {exp.glAccountCode}</div>
                      </td>
                      <td className="px-5 py-4">
                        {exp.ocrAnalysis ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>OCR {exp.ocrAnalysis.confidenceScorePercent}%</span>
                          </div>
                        ) : (
                          <span className="text-xs text-stone-500 font-mono">Manual Entry</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-semibold text-white">
                        ${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono border uppercase ${
                            exp.approvalStatus === 'reimbursed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : exp.approvalStatus === 'approved_ready_for_payment'
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {exp.approvalStatus.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {exp.approvalStatus === 'approved_ready_for_payment' && (
                          <button
                            onClick={() => {
                              setExpenses(
                                expenses.map((e) =>
                                  e.id === exp.id
                                    ? {
                                        ...e,
                                        approvalStatus: 'reimbursed',
                                        reimbursementDetails: {
                                          reimbursementDate: new Date().toISOString(),
                                          payoutRail: 'fednow',
                                          destinationBankOrWallet: 'Direct Deposit',
                                          disbursedAmount: e.amount,
                                          journalEntryId: `je_reimb_${Date.now()}`
                                        }
                                      }
                                    : e
                                )
                              );
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition"
                          >
                            Disburse Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PAYROLL & TAX CENTER */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Global Payroll & Tax Withholdings</h2>
              <p className="text-xs text-stone-400">
                Multi-jurisdiction employee compensation, pension matching, tax withholding, and cryptographic payslips
              </p>
            </div>
            <button
              onClick={() => setShowRunPayrollModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
            >
              <Users className="w-4 h-4" />
              <span>Execute Enterprise Payroll Run</span>
            </button>
          </div>

          {/* Employee Salary Table */}
          <div className="overflow-hidden rounded-2xl bg-stone-900 border border-stone-800">
            <div className="p-4 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm">Active Sovereign Employees ({employees.length})</h3>
              <span className="text-xs text-stone-400 font-mono">
                Total Monthly Base: ${employees.reduce((a, b) => a + b.monthlyBase, 0).toLocaleString()}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-950/40 text-stone-400 font-mono text-xs uppercase border-b border-stone-800">
                  <tr>
                    <th className="px-5 py-3">Employee</th>
                    <th className="px-5 py-3">Department & Branch</th>
                    <th className="px-5 py-3 text-right">Base Monthly</th>
                    <th className="px-5 py-3 text-right">Allowances</th>
                    <th className="px-5 py-3 text-right">Tax & Deductions</th>
                    <th className="px-5 py-3 text-right">Est. Net Pay</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {employees.map((emp) => {
                    const payCalc = calculateEmployeePayroll(emp);
                    return (
                      <tr key={emp.id} className="hover:bg-stone-800/40 transition">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-stone-200">{emp.name}</div>
                          <div className="text-xs text-stone-500 font-mono">{emp.employeeNumber} • {emp.jobTitle}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-stone-300 text-xs">{emp.departmentName}</div>
                          <div className="text-xs text-stone-500">{emp.branchName}</div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-medium text-white">
                          ${emp.monthlyBase.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-indigo-400 font-medium">
                          +${payCalc.allowancesTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-rose-400 font-medium">
                          -${payCalc.totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-bold text-emerald-400">
                          ${payCalc.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => setSelectedPayslip(payCalc)}
                            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-medium transition"
                          >
                            View Payslip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BUSINESS ACCOUNTING & FINANCIAL STATEMENTS */}
      {activeTab === 'accounting' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Business Accounting & Ledger Statements</h2>
              <p className="text-xs text-stone-400">
                Real-time Income Statement (P&L), Cash Flow Breakdown, and Accounts Receivable Aging
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
              Double-Entry General Ledger Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Statement (P&L) */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-semibold text-white text-base">Income Statement (Profit & Loss)</h3>
                <span className="text-xs font-mono text-stone-400">Q3 2026 YTD</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between font-semibold text-stone-200">
                  <span>Gross Operating Revenue</span>
                  <span className="font-mono text-emerald-400">$645,000.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400 pl-3">
                  <span>SaaS & Enterprise BaaS Licensing (GL 4010)</span>
                  <span className="font-mono">$580,000.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400 pl-3">
                  <span>Payment Settlement & Factoring Fees (GL 4020)</span>
                  <span className="font-mono">$65,000.00</span>
                </div>

                <div className="flex items-center justify-between font-semibold text-stone-200 pt-2 border-t border-stone-800/80">
                  <span>Cost of Goods & Cloud Infrastructure</span>
                  <span className="font-mono text-rose-400">-$138,500.00</span>
                </div>

                <div className="flex items-center justify-between font-bold text-white pt-2 border-t border-stone-800">
                  <span>Gross Profit</span>
                  <span className="font-mono text-emerald-400">$506,500.00 (78.5%)</span>
                </div>

                <div className="flex items-center justify-between font-semibold text-stone-200 pt-2 border-t border-stone-800">
                  <span>Operating Expenses (OPEX)</span>
                  <span className="font-mono text-rose-400">-$286,000.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400 pl-3">
                  <span>Salaries & Global Benefits (GL 5020)</span>
                  <span className="font-mono">-$210,000.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400 pl-3">
                  <span>Marketing & Customer Acquisition (GL 5030)</span>
                  <span className="font-mono">-$48,000.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400 pl-3">
                  <span>General & Administrative Tools</span>
                  <span className="font-mono">-$28,000.00</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between text-base font-bold text-emerald-300 mt-4">
                  <span>Net Operating Income (EBITDA)</span>
                  <span className="font-mono">$220,500.00 (34.2%)</span>
                </div>
              </div>
            </div>

            {/* A/R Aging Analysis */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-semibold text-white text-base">Accounts Receivable Aging</h3>
                <span className="text-xs font-mono text-stone-400">Total: ${totalReceivables.toLocaleString()}</span>
              </div>

              <div className="space-y-4">
                {arAgingBuckets.map((bucket) => (
                  <div key={bucket.bucketName} className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-stone-200">{bucket.label}</span>
                      <span className="font-mono font-bold text-white">${bucket.totalAmountUsd.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${bucket.percentOfTotal}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span>{bucket.invoicesCount} Invoices</span>
                      <span className="font-mono">{bucket.percentOfTotal}% of total A/R</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: APPROVAL WORKFLOWS */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Multi-Tier Approval Governance</h2>
              <p className="text-xs text-stone-400">
                Rule-based approval matrices by amount threshold, department, and sovereign role
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg font-mono">
              {approvalRules.length} Active Rules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvalRules.map((rule) => (
              <div key={rule.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-base">{rule.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono uppercase mt-1 inline-block">
                      Module: {rule.module}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono font-medium">Active</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-xs font-mono space-y-1">
                  <div>Threshold: ${rule.minAmountUsd.toLocaleString()} {rule.maxAmountUsd ? `to $${rule.maxAmountUsd.toLocaleString()}` : '+'}</div>
                  <div>Department Scope: {rule.departmentScope}</div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-800">
                  <span className="text-xs text-stone-400 font-medium">Required Approver Chain:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {rule.requiredApprovers.map((app, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 font-medium flex items-center gap-1"
                      >
                        <span>{idx + 1}. {app.roleName}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: AI CFO ADVISORY */}
      {activeTab === 'ai_cfo' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>OMNI AI CFO Autonomous Business Agent</span>
              </h2>
              <p className="text-xs text-stone-400">
                Working capital forecasting, burn rate analytics, and governance-guarded advisory
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Strict RBAC Read-Only Governance
            </span>
          </div>

          {aiReports.map((report) => (
            <div key={report.id} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">{report.title}</h3>
                <p className="text-sm text-stone-300 mt-2 leading-relaxed">{report.summary}</p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {report.keyMetrics.map((km, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                    <span className="text-xs text-stone-400">{km.label}</span>
                    <div className="text-xl font-bold text-white font-mono mt-1">{km.value}</div>
                  </div>
                ))}
              </div>

              {/* Recommendations & Anomalies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-2">
                  <span className="text-xs font-semibold uppercase text-indigo-400 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Strategic AI Recommendations
                  </span>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {report.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-2">
                  <span className="text-xs font-semibold uppercase text-amber-400 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Detected Sprawl & Anomalies
                  </span>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {report.anomaliesDetected.map((an, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{an.description} (Est. ${an.impactAmountUsd.toLocaleString()})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 9: SUPER ADMIN SETTINGS */}
      {activeTab === 'admin_config' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Super Admin Business Configuration</h2>
              <p className="text-xs text-stone-400">
                Global module activations, country tax rules, and statutory payroll rate settings
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-stone-800 text-stone-300 rounded-lg font-mono">
              Root Authority
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
            <h3 className="font-semibold text-white text-base">Module Activation Toggles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: 'invoicingEnabled', label: 'Enterprise Invoicing Engine' },
                { key: 'paymentLinksEnabled', label: 'Hosted Payment Links' },
                { key: 'expenseOcrEnabled', label: 'AI OCR Expense Platform' },
                { key: 'payrollEngineEnabled', label: 'Global Payroll & Tax Withholding' },
                { key: 'instantFactoringEnabled', label: 'Instant Invoice Factoring' },
                { key: 'aiCfoAgentEnabled', label: 'AI CFO Advisory Assistant' }
              ].map((mod) => (
                <div key={mod.key} className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-200">{mod.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-white text-base pt-4 border-t border-stone-800">
              Configured Country Tax & Statutory Pension Rates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {adminConfig.supportedCountries.map((c) => (
                <div key={c.code} className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-200">{c.name} ({c.code})</span>
                    <span className="font-mono text-xs text-indigo-400 font-medium">{c.currency}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-400 pt-1">
                    <div>VAT/GST: {c.vatRatePercent}%</div>
                    <div>Corporate Tax: {c.corporateTaxRatePercent}%</div>
                    <div>Employer Pension: {c.statutoryPensionEmployerPercent}%</div>
                    <div>Employee Pension: {c.statutoryPensionEmployeePercent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: TEST HARNESS MATRIX */}
      {activeTab === 'test_suite' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Business Suite Mission-Critical Test Matrix</h2>
              <p className="text-xs text-stone-400">
                8-scenario verification covering Invoicing, OCR parsing, Payroll math, Accounting reports, and AI governance
              </p>
            </div>
            <button
              onClick={handleRunAllTests}
              disabled={isRunningTests}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-purple-600/20"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              <span>{isRunningTests ? 'Executing Scenarios...' : 'Run All 8 Scenarios'}</span>
            </button>
          </div>

          {testResults.length === 0 ? (
            <div className="p-12 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="font-semibold text-white text-base">Test Suite Ready for Execution</h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Click above to execute all 8 mission-critical test scenarios and verify General Ledger double-entry balance integrity.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {testResults.map((tr) => (
                <div key={tr.testId} className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white text-sm">{tr.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-stone-400">{tr.executionMs}ms</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-mono font-bold">
                        {tr.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300">{tr.details}</p>
                  <div className="space-y-1 pt-1">
                    {tr.assertions.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{a.check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: CREATE INVOICE */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-bold text-white text-lg">Create New Smart Invoice</h3>
              <button onClick={() => setShowNewInvoiceModal(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-400">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newInvCustomerName}
                    onChange={(e) => setNewInvCustomerName(e.target.value)}
                    placeholder="e.g. Apex Global Corp"
                    className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-400">Customer Email</label>
                  <input
                    type="email"
                    required
                    value={newInvCustomerEmail}
                    onChange={(e) => setNewInvCustomerEmail(e.target.value)}
                    placeholder="finance@apexcorp.com"
                    className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400">Due Date</label>
                <input
                  type="date"
                  value={newInvDueDate}
                  onChange={(e) => setNewInvDueDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Line Items */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="text-xs font-semibold text-stone-300">Invoice Items</label>
                {newInvItems.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...newInvItems];
                        updated[idx].description = e.target.value;
                        setNewInvItems(updated);
                      }}
                      placeholder="Item description"
                      className="col-span-6 px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...newInvItems];
                        updated[idx].quantity = parseFloat(e.target.value) || 1;
                        updated[idx].totalAmount = updated[idx].quantity * updated[idx].unitPrice;
                        setNewInvItems(updated);
                      }}
                      className="col-span-2 px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white"
                    />
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => {
                        const updated = [...newInvItems];
                        updated[idx].unitPrice = parseFloat(e.target.value) || 0;
                        updated[idx].totalAmount = updated[idx].quantity * updated[idx].unitPrice;
                        setNewInvItems(updated);
                      }}
                      className="col-span-4 px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-white"
                    />
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center justify-between text-sm">
                <span className="text-stone-400">Total Invoice Amount:</span>
                <span className="font-mono font-bold text-white">
                  ${calculateInvoiceTotals(newInvItems).totalAmount.toLocaleString()} USD
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
                >
                  Issue &amp; Post to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SCAN RECEIPT & NEW EXPENSE */}
      {showNewExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Scan className="w-5 h-5 text-emerald-400" />
                <span>Smart Receipt OCR &amp; Expense Entry</span>
              </h3>
              <button onClick={() => setShowNewExpenseModal(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Demo Upload Triggers */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="text-xs font-semibold text-stone-400 font-mono">SIMULATE RECEIPT SCAN:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Equinix_NY_Datacenter.pdf', label: 'Equinix Datacenter' },
                  { name: 'Uber_Executive_Trip.pdf', label: 'Uber Airport Transit' },
                  { name: 'Blue_Hill_Dinner_Receipt.jpg', label: 'Client Dinner' }
                ].map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => handleSimulateOcr(s.name)}
                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-medium transition border border-stone-700"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {isScanningOcr && (
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 flex items-center gap-3 text-xs text-indigo-300 font-mono animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running AI Vision &amp; OCR text itemization parser...</span>
              </div>
            )}

            {ocrPreviewResult && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-emerald-400 font-semibold font-mono">
                  <span>AI OCR PARSED SUCCESSFULLY</span>
                  <span>Confidence: {ocrPreviewResult.confidenceScorePercent}%</span>
                </div>
                <div className="text-stone-300">Suggested GL: {ocrPreviewResult.suggestedGlAccountCode} ({ocrPreviewResult.suggestedGlAccountName})</div>
              </div>
            )}

            <form onSubmit={handleCreateExpenseSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-stone-400">Merchant Name</label>
                <input
                  type="text"
                  required
                  value={expenseMerchant}
                  onChange={(e) => setExpenseMerchant(e.target.value)}
                  placeholder="e.g. Uber Technologies"
                  className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-400">Total Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-400">Category</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="software_saas">Software &amp; SaaS</option>
                    <option value="hardware_equipment">Hardware &amp; Equipment</option>
                    <option value="travel_lodging">Travel &amp; Lodging</option>
                    <option value="meals_entertainment">Meals &amp; Entertainment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400">Business Purpose Description</label>
                <input
                  type="text"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  placeholder="e.g. Executive transit for Q3 board presentation"
                  className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewExpenseModal(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RUN ENTERPRISE PAYROLL */}
      {showRunPayrollModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                <span>Execute Global Sovereign Payroll Run</span>
              </h3>
              <button onClick={() => setShowRunPayrollModal(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecutePayrollSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-stone-400">Pay Period Title</label>
                <input
                  type="text"
                  required
                  value={payrollPeriodTitleInput}
                  onChange={(e) => setPayrollPeriodTitleInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono space-y-2">
                <div className="flex justify-between text-stone-300">
                  <span>Eligible Employees:</span>
                  <span className="font-bold text-white">{employees.length}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Est. Gross Salary Outlay:</span>
                  <span className="font-bold text-white">${totalPayrollMonthly.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-stone-400 border-t border-stone-800/80 pt-2">
                  <span>Dual Security Signer:</span>
                  <span className="text-indigo-400">Marcus Sterling (Finance Director)</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRunPayrollModal(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-medium transition"
                >
                  Sign &amp; Disburse Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD INVOICE PAYMENT */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-bold text-white text-lg">Record Customer Payment</h3>
              <button onClick={() => setShowPaymentModal(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="space-y-4">
              <div className="text-xs text-stone-400 font-mono">
                Invoice: {showPaymentModal.invoiceNumber} • Remaining Due: ${showPaymentModal.amountDue.toFixed(2)}
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400">Payment Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={paymentAmountInput}
                  onChange={(e) => setPaymentAmountInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400">Payment Rail</label>
                <select
                  value={paymentRailInput}
                  onChange={(e) => setPaymentRailInput(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="fednow">FedNow Instant Settlement</option>
                  <option value="ach">ACH Bank Transfer</option>
                  <option value="wire">Fedwire Wholesale</option>
                  <option value="card_network">Card Payment</option>
                  <option value="stablecoin_usdc">USDC Stablecoin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition"
                >
                  Apply Payment to GL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PAYSLIP PREVIEW */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-lg">Official Payslip Statement</h3>
                <p className="text-xs text-stone-400 font-mono">Hash: {selectedPayslip.payslipPdfHash}</p>
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono space-y-3">
              <div className="flex justify-between border-b border-stone-800/80 pb-2">
                <span className="text-stone-400">Employee:</span>
                <span className="text-white font-bold">{selectedPayslip.employeeName} ({selectedPayslip.employeeNumber})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Monthly Base Salary:</span>
                <span className="text-white">${selectedPayslip.baseSalaryMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-indigo-400">
                <span>Total Allowances:</span>
                <span>+${selectedPayslip.allowancesTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white border-t border-stone-800 pt-1">
                <span>Gross Pay:</span>
                <span>${selectedPayslip.grossPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Income Tax Withheld:</span>
                <span>-${selectedPayslip.incomeTaxWithheld.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Pension &amp; Health Deductions:</span>
                <span>-${(selectedPayslip.pensionContribution + selectedPayslip.healthInsuranceDeduction).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-emerald-400 border-t border-stone-800 pt-2">
                <span>Net Disbursed Pay:</span>
                <span>${selectedPayslip.netPay.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-sm font-medium transition"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
