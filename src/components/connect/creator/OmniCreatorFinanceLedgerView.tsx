import React, { useState } from 'react';
import {
  DollarSign,
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  FileText,
  Clock,
  CheckCircle2,
  Lock,
  Building,
  RefreshCw,
  Download,
  AlertCircle
} from 'lucide-react';
import { CreatorFinanceStatement } from '../../../types/omni_creator';

interface Props {
  financeStatement: CreatorFinanceStatement;
  onRequestPayout: (amount: number) => void;
}

export const OmniCreatorFinanceLedgerView: React.FC<Props> = ({
  financeStatement,
  onRequestPayout
}) => {
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(financeStatement.availableBalanceUsd);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState('');

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount <= 0 || payoutAmount > financeStatement.availableBalanceUsd) return;
    onRequestPayout(payoutAmount);
    setPayoutSuccessMsg(`Payout of $${payoutAmount.toLocaleString()} USD dispatched to sovereign wallet.`);
    setIsPayoutModalOpen(false);
    setTimeout(() => setPayoutSuccessMsg(''), 5000);
  };

  return (
    <div id="omni-creator-finance-ledger-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              OMNI FINANCE OS & DOUBLE-ENTRY LEDGER INTEGRATION
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              TAX COMPLIANT
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Creator Earnings, Settlements & Sovereign Ledger
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Real-time settlement pipeline linked to OMNI Finance Vault. Automates tax withholding (W-8BEN / W-9), calculates 1.5% platform fee, and provides instant zero-fee withdrawals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Request Instant Payout</span>
          </button>
        </div>
      </div>

      {payoutSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{payoutSuccessMsg}</span>
        </div>
      )}

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Balance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-between">
            <span>Available Balance</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ${financeStatement.availableBalanceUsd.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            Available for immediate withdrawal
          </div>
        </div>

        {/* Pending Escrow */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-between">
            <span>Pending Escrow</span>
            <Lock className="w-4 h-4 text-amber-400" />
          </span>
          <div className="text-2xl font-black text-amber-400 font-mono">
            ${financeStatement.pendingEscrowUsd.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            Releases upon completion / 7-day guarantee
          </div>
        </div>

        {/* Lifetime Gross Earnings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-between">
            <span>Lifetime Gross Earnings</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </span>
          <div className="text-2xl font-black text-white font-mono">
            ${financeStatement.lifetimeGrossEarningsUsd.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold">
            Platform Fee: {financeStatement.platformFeeRatePercent}% (Lowest in Industry)
          </div>
        </div>

        {/* Tax Withheld */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-between">
            <span>Tax Withholding Status</span>
            <FileText className="w-4 h-4 text-sky-400" />
          </span>
          <div className="text-lg font-bold text-sky-400">
            {financeStatement.taxStatus.replace('_', ' ')}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            ${financeStatement.taxWithheldLifetimeUsd.toLocaleString()} lifetime withheld
          </div>
        </div>
      </div>

      {/* Connected Vault & Banking Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-400" />
          Connected Sovereign Payout Gateways
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400">Sovereign Web3 Vault Address</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
                ACTIVE
              </span>
            </div>
            <div className="text-xs font-mono text-white bg-slate-900 p-2.5 rounded-xl truncate">
              {financeStatement.connectedWalletAddress}
            </div>
            <span className="text-[10px] text-slate-400">
              Direct smart contract multi-sig deposit with instant finality.
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400">Fiat Multi-Currency IBAN</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
                VERIFIED
              </span>
            </div>
            <div className="text-xs font-mono text-white bg-slate-900 p-2.5 rounded-xl truncate">
              {financeStatement.connectedIban}
            </div>
            <span className="text-[10px] text-slate-400">
              SEPA & UK Faster Payments integration via OMNI Finance Banking Rail.
            </span>
          </div>
        </div>
      </div>

      {/* Double-Entry Ledger Settlements Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              Recent Settlement Ledger & Audit Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Itemized double-entry records with cryptographic transaction verification hashes.
            </p>
          </div>
          <button className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export Tax CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Stream / Description</th>
                <th className="py-3 px-4 text-right">Gross Amount</th>
                <th className="py-3 px-4 text-right">Platform Fee (1.5%)</th>
                <th className="py-3 px-4 text-right">Tax Withheld (5%)</th>
                <th className="py-3 px-4 text-right">Net Settled</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {financeStatement.recentSettlements.map(st => (
                <tr key={st.id} className="hover:bg-slate-950/60 transition">
                  <td className="py-3.5 px-4 font-mono text-slate-400">{st.date}</td>
                  <td className="py-3.5 px-4 font-medium text-white max-w-xs">
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 mr-2">
                      {st.streamType}
                    </span>
                    {st.description}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ${st.grossAmountUsd.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                    -${st.platformFeeUsd.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                    -${st.taxWithheldUsd.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    ${st.netPayoutUsd.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        st.status === 'settled'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {st.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-indigo-400">{st.txHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-400" />
              Request Instant Creator Payout
            </h3>

            <form onSubmit={handlePayoutSubmit} className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Available For Immediate Payout</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  ${financeStatement.availableBalanceUsd.toLocaleString()} USD
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Withdrawal Amount (USD)</label>
                <input
                  type="number"
                  min="50"
                  max={financeStatement.availableBalanceUsd}
                  value={payoutAmount}
                  onChange={e => setPayoutAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="text-xs text-slate-400 space-y-1 bg-slate-950 p-3 rounded-xl">
                <div>Destination: <span className="text-white font-mono">{financeStatement.connectedWalletAddress}</span></div>
                <div>Estimated Processing Time: <span className="text-emerald-400 font-bold">Instant (0s)</span></div>
                <div>Withdrawal Fee: <span className="text-emerald-400 font-bold">$0.00 (Sovereign Free)</span></div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Confirm Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
