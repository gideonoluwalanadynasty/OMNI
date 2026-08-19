import React, { useState } from 'react';
import {
  Briefcase, TrendingUp, TrendingDown, DollarSign, FileText, Users,
  CheckCircle, Clock, AlertTriangle, ArrowUpRight, ArrowDownLeft,
  Plus, Receipt, Filter, Download, Zap, CreditCard, ChevronRight,
  ShieldCheck, Check, X, Building
} from 'lucide-react';
import {
  FinanceTenant,
  FinancialAccount,
  FinanceTransaction,
  SmartInvoice,
  PayrollRun,
  ExpenseItem,
  FinanceApprovalRequest,
  FinanceAiInsight
} from '../../types/finance_os';

interface BusinessFinanceDashboardProps {
  tenant: FinanceTenant;
  accounts: FinancialAccount[];
  transactions: FinanceTransaction[];
  invoices: SmartInvoice[];
  payrollRuns: PayrollRun[];
  expenses: ExpenseItem[];
  approvals: FinanceApprovalRequest[];
  insights: FinanceAiInsight[];
  onCreateInvoice: (customerName: string, amount: number, desc: string) => void;
  onRunPayroll: (payPeriod: string, totalGross: number, employeesCount: number) => void;
  onApproveRequest: (requestId: string) => void;
  onFactorInvoice: (invoiceId: string) => void;
}

export default function BusinessFinanceDashboard({
  tenant,
  accounts,
  transactions,
  invoices,
  payrollRuns,
  expenses,
  approvals,
  insights,
  onCreateInvoice,
  onRunPayroll,
  onApproveRequest,
  onFactorInvoice
}: BusinessFinanceDashboardProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'invoices' | 'payroll' | 'expenses' | 'approvals'>('overview');
  
  // Modals
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invCustomer, setInvCustomer] = useState('');
  const [invAmount, setInvAmount] = useState('');
  const [invDesc, setInvDesc] = useState('');

  const [payrollModalOpen, setPayrollModalOpen] = useState(false);
  const [payrollPeriod, setPayrollPeriod] = useState('Aug 16 - Aug 31, 2026');
  const [payrollGross, setPayrollGross] = useState('312000');
  const [payrollCount, setPayrollCount] = useState('49');

  // Computed Business Metrics
  const totalCashOperating = accounts
    .filter(a => a.category === 'asset')
    .reduce((acc, a) => acc + a.balance, 0);

  const totalReceivables = invoices
    .filter(i => i.status === 'issued' || i.status === 'viewed')
    .reduce((acc, i) => acc + i.totalAmount, 0);

  const totalPayables = 342000.00; // Accrued Trade A/P
  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;

  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(invAmount);
    if (!amt || !invCustomer) return;
    onCreateInvoice(invCustomer, amt, invDesc || 'Consulting & Engineering Services');
    setInvCustomer('');
    setInvAmount('');
    setInvDesc('');
    setInvoiceModalOpen(false);
  };

  const handlePayrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gross = parseFloat(payrollGross);
    const count = parseInt(payrollCount, 10);
    if (!gross || !count) return;
    onRunPayroll(payrollPeriod, gross, count);
    setPayrollModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-indigo-950/40 to-stone-900 border border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>Commercial &amp; SME Operating System • Multi-Entity Ledger Ready</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
            {tenant.name || 'Dynasty Commercial Operations'}
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Real-time cash position, A/R smart invoicing with instant factoring advances, automated global payroll, spend management, and dual-signoff governance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setInvoiceModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-700 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>+ Create Invoice</span>
          </button>
          <button
            onClick={() => setPayrollModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-900/40 transition cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Run Payroll</span>
          </button>
        </div>
      </div>

      {/* Business Core KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Operating Cash Runway</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ${totalCashOperating.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>44 Months Runway Projected</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Trade Receivables (A/R)</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-300 font-mono">
            ${totalReceivables.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-indigo-400 font-mono flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>$405k available for Instant Factoring</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Trade Payables (A/P)</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-stone-100 font-mono">
            ${totalPayables.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-stone-400">
            All vendor obligations current (0 overdue)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Pending Approvals</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">
            {pendingApprovalsCount} Action{pendingApprovalsCount === 1 ? '' : 's'} Required
          </div>
          <div className="text-[11px] text-amber-400 font-mono">
            Dual-signoff threshold: &gt;$100,000
          </div>
        </div>
      </div>

      {/* Nav Sub-Tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'overview', label: 'Cash Flow & Accounts' },
          { id: 'invoices', label: `Invoices & Factoring (${invoices.length})` },
          { id: 'payroll', label: `Global Payroll (${payrollRuns.length})` },
          { id: 'expenses', label: `Expenses & Receipts (${expenses.length})` },
          { id: 'approvals', label: `Governance Approvals (${pendingApprovalsCount})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition ${
              activeSection === tab.id
                ? 'bg-stone-800 text-white font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION: OVERVIEW (Cash & Accounts) */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Commercial Accounts Breakdown */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Commercial Banking &amp; Settlement Accounts</span>
                </h2>
                <span className="text-xs font-mono text-emerald-400">FedNow &amp; SEPA Live</span>
              </div>

              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-4 rounded-xl bg-stone-950 border border-stone-800/80 hover:border-stone-700 transition flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-stone-900 text-indigo-400 border border-stone-800">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{acc.accountName}</span>
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-mono text-stone-300">
                            {acc.glAccountCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                          {acc.accountNumber} • {acc.routingDetails?.swiftBic || 'FEDNOW-DIRECT'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-sm font-black text-white">
                        {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Available: {acc.currency} {acc.availableBalance.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Business Activity Stream */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Real-Time Commercial Ledger Stream</span>
              </h2>

              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${tx.direction === 'inbound' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-stone-900 text-stone-300 border border-stone-800'}`}>
                        {tx.direction === 'inbound' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-stone-100">{tx.counterpartyName}</div>
                        <div className="text-[11px] text-stone-400 font-mono">{tx.memo} • Rail: {tx.rail.toUpperCase()}</div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className={`font-bold ${tx.direction === 'inbound' ? 'text-emerald-400' : 'text-stone-200'}`}>
                        {tx.direction === 'inbound' ? '+' : '-'}{tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-stone-500">{new Date(tx.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Insights & Quick Factoring Card */}
          <div className="space-y-6">
            {/* Factoring Advance Spotlight */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-stone-900 to-stone-950 border border-indigo-700/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <span>Instant Factoring Capital</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-900 text-[10px] font-mono text-indigo-200 font-bold">
                  0.75% Rate
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xl font-black text-white font-mono">$405,000.00</div>
                <p className="text-xs text-stone-300">
                  Instant advance ready against Aegis Defence invoice #INV-2026-0842 ($450,000). Zero dilution working capital.
                </p>
              </div>

              <button
                onClick={() => onFactorInvoice('inv_849202')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Draw $405,000 Instant Advance</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pending Approvals Summary */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Governance Signoff Inbox</span>
              </h3>

              <div className="space-y-3">
                {approvals.map((req) => (
                  <div key={req.id} className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{req.title}</span>
                      <span className="font-mono text-amber-400 font-bold">${req.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-stone-400">
                      Requested by {req.requestedByUserName}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => onApproveRequest(req.id)}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition cursor-pointer"
                      >
                        Sign &amp; Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: INVOICES & FACTORING */}
      {activeSection === 'invoices' && (
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white">Smart Invoicing &amp; Factoring Engine</h2>
              <p className="text-xs text-stone-400">Issue crypto-signed verifiable invoices with multi-jurisdiction tax calculations and 1-click liquidity advances.</p>
            </div>
            <button
              onClick={() => setInvoiceModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Smart Invoice</span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{inv.invoiceNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      inv.status === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                    }`}>
                      {inv.status}
                    </span>
                    {inv.isFactored && (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono font-semibold border border-amber-800">
                        ⚡ Factoring Advance Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-300">{inv.customerName} ({inv.customerEmail})</div>
                  <div className="text-[11px] text-stone-500">Issued: {inv.issueDate} • Due: {inv.dueDate}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-mono">
                    <div className="text-sm font-black text-white">${inv.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    <div className="text-[10px] text-stone-400">{inv.lineItems.length} line item(s)</div>
                  </div>

                  {inv.status !== 'paid' && !inv.isFactored && (
                    <button
                      onClick={() => onFactorInvoice(inv.id)}
                      className="px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-indigo-300" />
                      <span>Factor (90% Cash)</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: PAYROLL */}
      {activeSection === 'payroll' && (
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Autonomous Global Payroll</h2>
              <p className="text-xs text-stone-400">Direct deposit across 45 countries via FedNow and SEPA Instant rails with automatic withholding.</p>
            </div>
            <button
              onClick={() => setPayrollModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition"
            >
              <Users className="w-4 h-4" />
              <span>+ New Payroll Batch</span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {payrollRuns.map((run) => (
              <div
                key={run.id}
                className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{run.payPeriod}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      run.status === 'disbursed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {run.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 font-mono">
                    {run.employeesCount} Employees • Rail: {run.directDepositRail.toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-right text-xs">
                  <div>
                    <div className="text-stone-400 text-[10px]">Gross Pay</div>
                    <div className="font-bold text-white">${run.totalGrossPay.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-stone-400 text-[10px]">Tax Withheld</div>
                    <div className="font-bold text-rose-400">${run.totalTaxesWithheld.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-stone-400 text-[10px]">Net Disbursed</div>
                    <div className="font-black text-emerald-400">${run.totalNetDisbursement.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {invoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Create &amp; Dispatch Smart Invoice</span>
              </h3>
              <button onClick={() => setInvoiceModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleInvoiceSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Customer / Client Legal Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lockheed Advanced Systems"
                  value={invCustomer}
                  onChange={(e) => setInvCustomer(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Invoice Total Amount (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 150000.00"
                  value={invAmount}
                  onChange={(e) => setInvAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-mono text-xs focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Description / Line Item Memo</label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise Sovereign Cryptographic Integration Milestone 1"
                  value={invDesc}
                  onChange={(e) => setInvDesc(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInvoiceModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg"
                >
                  Issue &amp; Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payroll Batch Modal */}
      {payrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Execute Direct Deposit Payroll Batch</span>
              </h3>
              <button onClick={() => setPayrollModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handlePayrollSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Pay Period</label>
                <input
                  type="text"
                  required
                  value={payrollPeriod}
                  onChange={(e) => setPayrollPeriod(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Gross Disbursement Total (USD)</label>
                <input
                  type="number"
                  required
                  value={payrollGross}
                  onChange={(e) => setPayrollGross(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Employee Count</label>
                <input
                  type="number"
                  required
                  value={payrollCount}
                  onChange={(e) => setPayrollCount(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs"
                />
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400">
                Direct disbursements will be pushed over the FedNow &amp; SEPA Instant networks with sub-second delivery.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPayrollModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Execute Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
