import { Wallet, ShieldAlert, Cpu, ArrowUpRight, ArrowDownRight, Layers, FileText, CheckCircle } from 'lucide-react';
import { OMNIState, LedgerEntry, FeatureFlag, AuditLog } from '../types';

interface AccountDashboardPageProps {
  state: OMNIState;
  addTransaction: (amount: number, type: 'credit' | 'debit', description: string) => boolean;
  toggleFeatureFlag: (id: string) => void;
  setView: (view: string, appId: string | null) => void;
}

export function AccountDashboardPage({ state, addTransaction, toggleFeatureFlag, setView }: AccountDashboardPageProps) {
  const currentOrg = state.organizations?.find((o) => o.id === state.currentOrgId) || state.organizations?.[0] || {
    id: 'org_dynasty',
    name: 'Dynasty Global Holdings',
    slug: 'dynasty',
    tenantId: 'tenant_dynasty_99',
    status: 'active' as const,
    orgType: 'company' as const,
    billingPlan: 'enterprise' as const,
    walletBalance: 4280550.00,
    apiKey: 'omni_live_api_dyn_k8s_9v02l4k1a7s90f8',
    webhookUrl: 'https://api.dynastyholdings.com/omni-webhook',
    subdomains: ['dynasty.omni.io'],
    createdAt: '2026-01-05T00:00:00Z',
    kybVerified: true
  };
  
  // Filter ledger for current wallet
  const currentWalletId = `wallet_${currentOrg?.id}`;
  const filteredLedger = state.ledger.filter((entry) => entry.walletId === currentWalletId).slice(0, 5);

  const handleQuickDeposit = () => {
    addTransaction(25000, 'credit', 'Injected operational testing capital');
  };

  const handleQuickWithdraw = () => {
    addTransaction(10000, 'debit', 'Settle physical logistics dispatch invoice');
  };

  return (
    <div id="omni-dashboard-container" className="flex flex-col gap-8 font-sans">
      {/* Header and Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
            {currentOrg?.name}
          </h1>
          <p className="text-xs text-neutral-500 font-normal mt-1">
            Tenant ID: <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300">{currentOrg?.tenantId}</span> · Router Slug: <span className="font-mono text-neutral-700">{currentOrg?.slug}.omni.io</span>
          </p>
        </div>

        {/* Action button cluster */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleQuickDeposit}
            className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm"
          >
            Inject $25,000 Credit
          </button>
          <button
            onClick={handleQuickWithdraw}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
          >
            Settle $10,000 Invoice
          </button>
        </div>
      </div>

      {/* Main Metric Cards Grid (Flat visual depth, cap outer radius, mathematically nested padding) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Wallet Balance Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Distributed Ledger Balance</span>
            <Wallet className="w-4.5 h-4.5 text-neutral-400" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-mono">
              ${currentOrg?.walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 self-start px-2 py-0.5 rounded font-mono font-semibold mt-1">
              Active currency: USD
            </span>
          </div>
        </div>

        {/* Feature Flags Indicator Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Micro-routing Capabilities</span>
            <Layers className="w-4.5 h-4.5 text-neutral-400" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-mono">
              {state.featureFlags.filter((f) => f.isEnabled).length} / {state.featureFlags.length}
            </span>
            <p className="text-xs text-neutral-500 font-normal">
              Active configuration routing keys deployed on Edge nodes.
            </p>
          </div>
        </div>

        {/* Account Security Trust Score */}
        <div
          onClick={() => setView('shared_services', null)}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm cursor-pointer hover:border-neutral-900 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Trust Framework State</span>
            <ShieldAlert className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {state.user?.isMfaEnabled ? 'Grade AA+' : 'Grade B'}
            </span>
            <p className="text-xs text-neutral-500 font-normal">
              Click to manage reputation, inspect risk alerts, and audit GDPR privacy agreements.
            </p>
          </div>
        </div>
      </div>

      {/* Main Split Sections: Ledger and Flag Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Transaction Ledger list */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>Genesis Wallet Ledger (Recent TXs)</span>
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">Synced to Postgres</span>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            {filteredLedger.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-400 font-normal">
                No ledger transactions logged for this organization workspace.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredLedger.map((tx) => (
                  <div key={tx.id} id={`tx-${tx.id}`} className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl flex items-center justify-center ${
                        tx.type === 'credit'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {tx.type === 'credit' ? <ArrowUpRight className="w-4.5 h-4.5" /> : <ArrowDownRight className="w-4.5 h-4.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate max-w-xs md:max-w-md">
                          {tx.description}
                        </p>
                        <span className="text-[10px] font-mono text-neutral-400">
                          ID: {tx.referenceId} · {new Date(tx.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col gap-1">
                      <span className={`text-sm font-bold font-mono ${tx.type === 'credit' ? 'text-emerald-600' : 'text-neutral-900 dark:text-white'}`}>
                        {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded self-end">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Routing controls & Flag matrix */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Feature Flag panel */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Tenant Feature Flags
            </h3>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
              {state.featureFlags.map((flag) => (
                <div key={flag.id} id={`flag-item-${flag.id}`} className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white block truncate">
                      {flag.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate">
                      {flag.key}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFeatureFlag(flag.id)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      flag.isEnabled ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 shadow ring-0 transition duration-200 ease-in-out ${
                        flag.isEnabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Core Licensing quick actions */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Billing Framework
            </h3>
            <div className="bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4 font-sans shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Subscription plan</span>
                  <span className="text-sm font-bold text-white uppercase">{currentOrg?.billingPlan} LICENSE</span>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                Your pricing context is managed universally. High throughput API limits, automated tax filing, and priority routing active.
              </p>
              <button
                onClick={() => setView('settings', null)}
                className="w-full bg-white text-neutral-900 text-xs font-semibold py-2.5 rounded-lg uppercase tracking-wider text-center hover:bg-neutral-100 transition-colors"
              >
                Configure billing details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs trail Section */}
      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
          Active Security Audit Trail
        </h3>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-mono text-[10px] text-neutral-400 uppercase">
                  <th className="p-3 pl-5">Timestamp</th>
                  <th className="p-3">Operator</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">Action</th>
                  <th className="p-3 pr-5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs font-normal">
                {state.auditLogs.slice(0, 5).map((log) => (
                  <tr key={log.id} id={`audit-${log.id}`} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/20 text-neutral-700 dark:text-neutral-300">
                    <td className="p-3 pl-5 font-mono text-[10px] text-neutral-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 font-semibold text-neutral-900 dark:text-white">
                      {log.userEmail}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">
                      {log.action}
                    </td>
                    <td className="p-3 pr-5 text-neutral-500 max-w-xs truncate">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
