import React, { useState } from 'react';
import {
  Code2, Key, Terminal, Play, Copy, Check, Send, CheckCircle2,
  RefreshCw, Globe, ShieldCheck, Zap, Layers, Server
} from 'lucide-react';

export default function FinanceDeveloperPortal() {
  const [activeCodeTab, setActiveCodeTab] = useState<'node' | 'curl' | 'python'>('node');
  const [copiedKey, setCopiedKey] = useState(false);
  const [simRail, setSimRail] = useState('fednow');
  const [simAmount, setSimAmount] = useState('2500.00');
  const [simStatus, setSimStatus] = useState<string | null>(null);

  const apiKey = 'sk_live_omni_fin_89a02194fbc82910481';

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSimulatePayment = () => {
    setSimStatus('executing');
    setTimeout(() => {
      setSimStatus('settled');
      setTimeout(() => setSimStatus(null), 3500);
    }, 400);
  };

  const codeSnippets = {
    node: `import { OmniFinance } from '@omni/finance-sdk';

const omni = new OmniFinance({
  apiKey: process.env.OMNI_FINANCE_KEY,
  environment: 'production'
});

// Execute sub-second instant payout via FedNow
const payment = await omni.payments.create({
  amount: 250000, // $2,500.00
  currency: 'USD',
  rail: 'fednow',
  recipient: {
    name: 'Horizon AI Labs Inc.',
    routingNumber: '021000021',
    accountNumber: '9912048'
  },
  idempotencyKey: 'tx_req_894109281'
});

console.log('Settled in ' + payment.settlementLatencyMs + 'ms:', payment.id);`,
    curl: `curl -X POST https://api.finance.omni.com/v1/payments \\
  -H "Authorization: Bearer sk_live_omni_fin_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 250000,
    "currency": "USD",
    "rail": "fednow",
    "recipient": {
      "name": "Horizon AI Labs",
      "routingNumber": "021000021",
      "accountNumber": "9912048"
    }
  }'`,
    python: `from omni_finance import OmniClient

client = OmniClient(api_key="sk_live_omni_fin_...")

# Issue an instant virtual card with $10k spend limit
card = client.cards.create(
    cardholder_name="DevOps Node #12",
    spending_limit_cents=1000000,
    currency="USD",
    type="virtual_subscription"
)

print(f"Card Issued: {card.last4} (Network: {card.network})")`
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-emerald-950/40 to-stone-900 border border-emerald-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>OMNI Embedded Finance &amp; Developer Sandbox</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
            APIs, Webhooks &amp; SDK Architecture
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Integrate global instant payments, programmable card issuing, multi-currency accounts, and automated double-entry ledger hooks directly into any application.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyApiKey}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono font-semibold flex items-center gap-2 border border-stone-700 transition cursor-pointer"
          >
            {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Key className="w-4 h-4 text-emerald-400" />}
            <span>{copiedKey ? 'API Key Copied!' : 'Copy API Key'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Interactive Code Samples */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Embedded SDK Samples</span>
            </h2>

            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs font-mono">
              {(['node', 'curl', 'python'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveCodeTab(t)}
                  className={`px-3 py-1 rounded cursor-pointer transition uppercase text-[10px] ${
                    activeCodeTab === t ? 'bg-stone-800 text-white font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/90 font-mono text-xs text-stone-300 overflow-x-auto">
            <pre className="whitespace-pre">{codeSnippets[activeCodeTab]}</pre>
          </div>
        </div>

        {/* Right Col: Live Sandbox Simulator */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-cyan-400" />
              <span>Live Rail Simulator</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400 font-semibold">Sandbox Active</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Target Payment Rail</label>
              <select
                value={simRail}
                onChange={(e) => setSimRail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs font-mono"
              >
                <option value="fednow">FedNow Instant Clearing (&lt;200ms)</option>
                <option value="sepa">SEPA Instant Euro Clearing (&lt;2s)</option>
                <option value="stablecoin_usdc">USDC Instant On-Chain Settlement</option>
                <option value="pix">Pix Instant Brazil Rail</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Amount ($)</label>
              <input
                type="number"
                value={simAmount}
                onChange={(e) => setSimAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 font-mono text-xs"
              />
            </div>

            {simStatus === 'settled' && (
              <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-xs font-mono text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Webhook Dispatched: payment.settled (142ms)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
              </div>
            )}

            <button
              onClick={handleSimulatePayment}
              disabled={simStatus === 'executing'}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              {simStatus === 'executing' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Simulating Bank Ingress...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Trigger Sandbox API Call</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
