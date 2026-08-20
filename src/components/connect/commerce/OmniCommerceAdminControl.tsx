import React, { useState } from 'react';
import {
  ShieldAlert,
  Settings,
  DollarSign,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Layers,
  Save,
  Key
} from 'lucide-react';
import { CommerceAdminGovernance } from '../../../types/omni_commerce';

interface Props {
  config: CommerceAdminGovernance;
  onUpdateConfig: (newConfig: CommerceAdminGovernance) => void;
}

export const OmniCommerceAdminControl: React.FC<Props> = ({
  config,
  onUpdateConfig
}) => {
  const [currentConfig, setCurrentConfig] = useState<CommerceAdminGovernance>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleGlobalCommerce = () => {
    setCurrentConfig(prev => ({
      ...prev,
      isCommerceGloballyActive: !prev.isCommerceGloballyActive
    }));
  };

  const handleSave = () => {
    onUpdateConfig(currentConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div id="omni-commerce-admin-control" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              SUPER ADMIN GOVERNANCE
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            OMNI Commerce Governance & Financial Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Configure global platform take-rates, escrow duration policies, dispute resolutions, and multi-currency oracle rates.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Governance Settings
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Super Admin parameters updated and broadcast to OMNI Finance nodes.</span>
        </div>
      )}

      {/* Main Governance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Core System Parameters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Platform Take-Rate & Escrow Timers
          </h3>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white">Global Commerce Engine</span>
                <p className="text-[11px] text-slate-400">Allow instant checkout and seller catalogues</p>
              </div>
              <button
                onClick={handleToggleGlobalCommerce}
                className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                  currentConfig.isCommerceGloballyActive ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition transform ${
                    currentConfig.isCommerceGloballyActive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold">Platform Take-Rate Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={currentConfig.platformTakeRatePct}
                onChange={e => setCurrentConfig({ ...currentConfig, platformTakeRatePct: Number(e.target.value) })}
                className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-bold"
              />
              <p className="text-[10px] text-slate-500 mt-1">Directly deducted at atomic settlement into OMNI Foundation treasury.</p>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold">Escrow Default Holding Window (Days)</label>
              <input
                type="number"
                value={currentConfig.escrowHoldDurationDays}
                onChange={e => setCurrentConfig({ ...currentConfig, escrowHoldDurationDays: Number(e.target.value) })}
                className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-bold"
              />
              <p className="text-[10px] text-slate-500 mt-1">Funds remain in sovereign multi-sig contract until delivery or timer expiry.</p>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold">Minimum Payout Threshold ($)</label>
              <input
                type="number"
                value={currentConfig.minimumPayoutThresholdUsd}
                onChange={e => setCurrentConfig({ ...currentConfig, minimumPayoutThresholdUsd: Number(e.target.value) })}
                className="w-full mt-1.5 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-bold"
              />
              <p className="text-[10px] text-slate-500 mt-1">Minimum seller wallet balance required to trigger automated sweep.</p>
            </div>
          </div>
        </div>

        {/* Card 2: Currency Oracle Rates */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            OMNI Finance Exchange Rate Oracles (USD Base)
          </h3>

          <div className="space-y-3 pt-2">
            {currentConfig.supportedCurrencies.map((curr, idx) => (
              <div key={curr.code} className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
                    {curr.symbol}
                  </span>
                  <span className="font-bold text-white font-mono">{curr.code} / USD</span>
                  {curr.isCrypto && (
                    <span className="text-[9px] px-1 bg-indigo-900/60 text-indigo-300 rounded font-semibold">CRYPTO</span>
                  )}
                </div>
                <input
                  type="number"
                  step="0.0001"
                  value={curr.exchangeRateToUsd}
                  onChange={e => {
                    const newCurrencies = [...currentConfig.supportedCurrencies];
                    newCurrencies[idx] = {
                      ...newCurrencies[idx],
                      exchangeRateToUsd: Number(e.target.value)
                    };
                    setCurrentConfig({ ...currentConfig, supportedCurrencies: newCurrencies });
                  }}
                  className="w-28 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-right font-mono text-white text-xs font-bold"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
