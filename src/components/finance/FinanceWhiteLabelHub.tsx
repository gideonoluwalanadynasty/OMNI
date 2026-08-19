import React, { useState } from 'react';
import {
  Sparkles, Globe, CreditCard, DollarSign, Layers, Palette,
  Settings, CheckCircle2, ShieldCheck, ArrowUpRight, Copy, Check
} from 'lucide-react';
import { FinanceTenant } from '../../types/finance_os';

interface FinanceWhiteLabelHubProps {
  tenants: FinanceTenant[];
  onUpdateWhiteLabel: (tenantId: string, brandName: string, domain: string, markupBps: number) => void;
}

export default function FinanceWhiteLabelHub({
  tenants,
  onUpdateWhiteLabel
}: FinanceWhiteLabelHubProps) {
  const wlTenant = tenants.find(t => t.isWhiteLabelTenant) || tenants[0];

  const [brandName, setBrandName] = useState(wlTenant.whiteLabelConfig?.brandName || 'NovaPay Business OS');
  const [customDomain, setCustomDomain] = useState(wlTenant.whiteLabelConfig?.customDomain || 'finance.novapay.global');
  const [feeMarkupBps, setFeeMarkupBps] = useState(wlTenant.whiteLabelConfig?.feeMarkupBps?.toString() || '20');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const bps = parseInt(feeMarkupBps, 10) || 0;
    onUpdateWhiteLabel(wlTenant.id, brandName, customDomain, bps);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${customDomain}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-cyan-950/40 to-stone-900 border border-cyan-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>White-Label NeoBank &amp; BaaS Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
            Launch Your Custom FinTech Brand
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Deploy a fully white-labeled financial operating system with custom domains, dedicated BIN ranges, automated markups, and institutional compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyUrl}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-stone-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Copied Domain!' : 'Copy Portal URL'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: White Label Config Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span>Branding &amp; Domain Configuration</span>
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1">Brand Display Name</label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1">Custom Domain (CNAME)</label>
                  <input
                    type="text"
                    required
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs font-mono focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1">Fee Markup (Basis Points, bps)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={feeMarkupBps}
                      onChange={(e) => setFeeMarkupBps(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs font-mono focus:border-cyan-500 outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-[11px] text-stone-500 font-mono">
                      = {(parseInt(feeMarkupBps || '0') / 100).toFixed(2)}% margin
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1">BIN Range Prefix (Card Sponsorship)</label>
                  <input
                    type="text"
                    disabled
                    value="482910 (OMNI / Marqeta Visa BIN)"
                    className="w-full px-3.5 py-2.5 bg-stone-950/60 border border-stone-900 rounded-xl text-stone-400 text-xs font-mono"
                  />
                </div>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>White-Label configurations deployed successfully to edge CDN.</span>
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-900/40 transition cursor-pointer"
              >
                Save &amp; Deploy Changes
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Live Live Preview Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
            <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>Live White-Label Preview</span>
            </h3>

            {/* Mock Whitelabel Card */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-cyan-800/40 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="font-bold text-white text-sm tracking-tight">{brandName}</div>
                <span className="text-[10px] font-mono text-cyan-400">POWERED BY OMNI</span>
              </div>

              <div className="space-y-1 font-mono text-xs">
                <div className="text-stone-400 text-[10px]">Merchant Gateway Balance</div>
                <div className="text-xl font-black text-white">$1,420,800.00</div>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-900 text-[11px] text-stone-300 font-mono flex items-center justify-between">
                <span>Interchange Rev-Share:</span>
                <span className="text-emerald-400 font-bold">+{feeMarkupBps} bps</span>
              </div>
            </div>

            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
              <div className="text-stone-200 font-semibold">Turnkey Infrastructure:</div>
              <div>• Instant virtual card issuance</div>
              <div>• SEPA Instant &amp; FedNow clearing</div>
              <div>• Automated KYB/KYC onboarding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
