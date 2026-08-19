import React, { useState } from 'react';
import {
  Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, Sparkles, Send,
  QrCode, RefreshCw, ShieldCheck, PiggyBank, Target, Plus, Check,
  ChevronRight, Lock, TrendingUp, DollarSign, Calendar
} from 'lucide-react';
import {
  FinanceWallet,
  FinancialAccount,
  FinanceTransaction,
  VirtualCard,
  FinanceAiInsight
} from '../../types/finance_os';

interface PersonalFinanceDashboardProps {
  wallet: FinanceWallet;
  accounts: FinancialAccount[];
  transactions: FinanceTransaction[];
  cards: VirtualCard[];
  insights: FinanceAiInsight[];
  onSendPayment: (amount: number, recipient: string, note: string) => void;
  onCreateSavingsGoal: (title: string, targetAmount: number) => void;
}

export default function PersonalFinanceDashboard({
  wallet,
  accounts,
  transactions,
  cards,
  insights,
  onSendPayment,
  onCreateSavingsGoal
}: PersonalFinanceDashboardProps) {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendNote, setSendNote] = useState('');
  const [selectedCurrencyTab, setSelectedCurrencyTab] = useState('ALL');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Filter transactions
  const filteredTxs = transactions.filter(t => {
    if (selectedCurrencyTab === 'ALL') return true;
    return t.currency === selectedCurrencyTab;
  });

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (!amt || amt <= 0 || !sendRecipient) return;
    onSendPayment(amt, sendRecipient, sendNote || 'Personal Instant Transfer');
    setSendAmount('');
    setSendRecipient('');
    setSendNote('');
    setSendModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-emerald-950/40 to-stone-900 border border-emerald-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Sovereign Personal Finance Engine • Tier-3 EDD Verified</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
            Personal &amp; Family Wealth Hub
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Real-time unified balance across global fiat currencies, high-yield vault reserves, programmable payment cards, and instant zero-fee transfers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setQrModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-700 transition cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Receive QR</span>
          </button>
          <button
            onClick={() => setSendModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Money</span>
          </button>
        </div>
      </div>

      {/* Primary Wealth Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Total Liquid Wealth (USD)</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ${(wallet.totalUsdEquivalent || 1568682.50).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% yield this month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Locked Savings Vault</span>
            <PiggyBank className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">
            ${(wallet.vaultSavingsLocked || 200000).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-stone-400 font-mono">
            Earning 5.25% APY compounding daily
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Active Virtual Cards</span>
            <CreditCard className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-300 font-mono">
            {cards.length || 3} Cards
          </div>
          <div className="text-[11px] text-stone-400">
            ${cards.reduce((acc, c) => acc + c.spentCurrentMonth, 0).toLocaleString()} spent this billing cycle
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Monthly Budget Goal</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">
            78% On Track
          </div>
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full w-[78%]" />
          </div>
        </div>
      </div>

      {/* AI Financial Advisor Insight Callout */}
      {insights && insights.length > 0 && (
        <div className="p-4 rounded-2xl bg-stone-900/70 border border-indigo-900/40 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-300">OMNI AI Personal Financial Advisor</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-900/50 text-[10px] font-mono text-indigo-300 font-semibold">
                Confidence {insights[0].confidenceScore}%
              </span>
            </div>
            <p className="text-stone-300 mt-0.5 font-medium">{insights[0].headline}</p>
            <p className="text-stone-400 text-[11px] mt-0.5">{insights[0].detail}</p>
          </div>
          <button
            onClick={() => onSendPayment(1000, 'OMNI High Yield Vault', 'Auto-sweep recommended savings')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs whitespace-nowrap cursor-pointer transition"
          >
            {insights[0].suggestedActionTitle}
          </button>
        </div>
      )}

      {/* Main Grid: Multi-Currency Balances & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Multi-Currency Assets & Accounts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Multi-Currency Balances */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Multi-Currency Asset Holdings</span>
              </h2>
              <span className="text-xs font-mono text-stone-400">5 Active Currencies</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(wallet.balances || []).map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-stone-700 transition space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className="text-sm">{b.currency === 'USD' ? '💵' : b.currency === 'EUR' ? '💶' : b.currency === 'BTC' ? '⚡' : b.currency === 'ETH' ? '🔷' : '🪙'}</span>
                      <span>{b.currency}</span>
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">≈ ${(b.usdValue).toLocaleString()}</span>
                  </div>
                  <div className="text-lg font-black text-stone-100 font-mono">
                    {b.amount.toLocaleString(undefined, { maximumFractionDigits: b.currency === 'BTC' || b.currency === 'ETH' ? 4 : 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions List */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-cyan-400" />
                <span>Recent Personal Transactions</span>
              </h2>

              {/* Currency Tabs */}
              <div className="flex items-center gap-1 text-[11px] font-mono bg-stone-950 p-1 rounded-lg border border-stone-800">
                {['ALL', 'USD', 'EUR', 'USDC'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedCurrencyTab(tab)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition ${
                      selectedCurrencyTab === tab
                        ? 'bg-stone-800 text-white font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredTxs.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500 font-mono">
                  No transactions found for this currency filter.
                </div>
              ) : (
                filteredTxs.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 hover:border-stone-700 flex items-center justify-between gap-3 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${tx.direction === 'inbound' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-stone-900 text-rose-400 border border-stone-800'}`}>
                        {tx.direction === 'inbound' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                          <span>{tx.counterpartyName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-stone-800 text-[10px] text-stone-400 font-mono uppercase">
                            {tx.rail}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                          <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{tx.memo || tx.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className={`text-xs font-bold ${tx.direction === 'inbound' ? 'text-emerald-400' : 'text-stone-200'}`}>
                        {tx.direction === 'inbound' ? '+' : '-'}{tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                        <Check className="w-3 h-3" />
                        <span>Settled</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Sovereign Cards & Quick Actions */}
        <div className="space-y-6">
          {/* Card Carousel Preview */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>Programmable Cards</span>
              </h2>
              <span className="text-[10px] text-indigo-400 font-mono font-semibold">Zero-Overdraft</span>
            </div>

            {/* Visual Card Representation */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-stone-900 to-purple-950 border border-indigo-700/60 shadow-xl text-white space-y-4 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold tracking-widest text-indigo-300">OMNI SOVEREIGN</span>
                <span className="px-2 py-0.5 rounded bg-black/40 border border-indigo-400/30 text-[10px] text-indigo-200">VISA DEBIT</span>
              </div>
              <div className="text-lg font-mono tracking-widest text-stone-200 pt-2">
                •••• •••• •••• {cards[0]?.lastFour || '4910'}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-300">
                <div>
                  <div className="text-[9px] text-stone-400 uppercase">Cardholder</div>
                  <div className="font-semibold">{cards[0]?.cardholderName || 'Gideon Oluwalana'}</div>
                </div>
                <div>
                  <div className="text-[9px] text-stone-400 uppercase">Expires</div>
                  <div className="font-semibold">{cards[0]?.expiry || '08/29'}</div>
                </div>
              </div>
            </div>

            {/* Card Controls */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-300">
                <span>Monthly Card Limit:</span>
                <span className="font-mono font-bold text-white">${(cards[0]?.spendingLimitMonthly || 5000).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-300">
                <span>Spent This Month:</span>
                <span className="font-mono font-bold text-indigo-400">${(cards[0]?.spentCurrentMonth || 420).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Savings Vaults / Goals */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-400" />
                <span>Savings Vaults</span>
              </h2>
              <button
                onClick={() => onCreateSavingsGoal('Emergency Reserve Vault', 50000)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
              >
                + New Goal
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-200">Sovereign Runway Vault</span>
                  <span className="font-mono text-emerald-400 font-semibold">$150,000 / $200,000</span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[75%]" />
                </div>
                <div className="text-[10px] text-stone-400 flex items-center justify-between">
                  <span>75% Reached</span>
                  <span className="text-emerald-400">+5.25% Yield</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-200">Family Global Real Estate Fund</span>
                  <span className="font-mono text-cyan-400 font-semibold">$50,000 / $100,000</span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[50%]" />
                </div>
                <div className="text-[10px] text-stone-400 flex items-center justify-between">
                  <span>50% Reached</span>
                  <span className="text-cyan-400">Compounding daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Money Modal */}
      {sendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Instant Zero-Fee Transfer</span>
              </h3>
              <button
                onClick={() => setSendModalOpen(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Recipient (Email, OMNI Handle, or FedNow Alias)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. sarah@omni.io or +12125550199"
                  value={sendRecipient}
                  onChange={(e) => setSendRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-stone-500 font-mono">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="0.00"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-mono text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 block mb-1">Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Monthly rent share"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800/80 text-[11px] text-stone-400 space-y-1">
                <div className="flex justify-between">
                  <span>Routing Network:</span>
                  <span className="text-emerald-400 font-semibold font-mono">FedNow Instant Rail</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="text-emerald-400 font-semibold font-mono">$0.00 (Zero Fee)</span>
                </div>
                <div className="flex justify-between">
                  <span>Settlement Latency:</span>
                  <span className="text-stone-300 font-mono">&lt; 200 ms</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSendModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40"
                >
                  Confirm &amp; Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receive QR Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Receive Instant Transfer</h3>
              <button onClick={() => setQrModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 bg-white rounded-xl inline-block mx-auto">
              {/* QR Mock Representation */}
              <div className="w-40 h-40 bg-stone-900 rounded-lg flex items-center justify-center text-white font-mono text-xs">
                [OMNI-QR-PAY]
              </div>
            </div>

            <div className="text-xs text-stone-300 font-mono bg-stone-950 p-2.5 rounded-xl border border-stone-800 select-all">
              gideon.omni.io / $gideon_dynasty
            </div>

            <p className="text-[11px] text-stone-400">
              Scan to send USD, EUR, USDC or BTC with sub-second instant settlement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
