import React, { useState } from 'react';
import {
  Sliders,
  Cpu,
  DollarSign,
  ShieldAlert,
  CheckCircle,
  Building,
  Lock,
  Layers,
  Sparkles,
  Server
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniAiSuperAdminConfig } from '../../../types/omni_social_ai';

export const OmniAiAdminControlView: React.FC = () => {
  const [adminConfig, setAdminConfig] = useState<OmniAiSuperAdminConfig>(omniSocialAiEngine.getSuperAdminConfig());
  const [selectedModel, setSelectedModel] = useState(adminConfig.defaultModel);
  const [tokenLimit, setTokenLimit] = useState(adminConfig.dailyTokenLimitPerTenant);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSaveModel = (modelId: string) => {
    setSelectedModel(modelId);
    omniSocialAiEngine.updateSuperAdminConfig({ defaultModel: modelId });
    setAdminConfig({ ...omniSocialAiEngine.getSuperAdminConfig() });
    setToastMsg(`Default system model updated to ${modelId}.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveLimit = (e: React.FormEvent) => {
    e.preventDefault();
    omniSocialAiEngine.updateSuperAdminConfig({ dailyTokenLimitPerTenant: Number(tokenLimit) });
    setAdminConfig({ ...omniSocialAiEngine.getSuperAdminConfig() });
    setToastMsg('Daily tenant token limit updated.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI AI Super Admin & Model Governance</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  Platform Core Control
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Model routing, cost caps, cross-tenant isolation enforcement & active-by-default status management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Monthly AI Spend</div>
              <div className="text-lg font-bold text-purple-400">${adminConfig.totalMonthlyCostUsd.toFixed(2)}</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Tokens (MTD)</div>
              <div className="text-lg font-bold text-white">{(adminConfig.totalTokensUsedThisMonth / 1000000).toFixed(1)}M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection & Routing */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Foundation Model Selection & Routing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adminConfig.availableModels.map(model => (
            <div
              key={model.id}
              onClick={() => handleSaveModel(model.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedModel === model.id
                  ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{model.name}</span>
                  {selectedModel === model.id && (
                    <span className="text-[10px] px-2 py-0.5 bg-purple-500 text-white font-bold rounded">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mb-2">Provider: {model.provider}</div>
                <div className="text-xs text-emerald-400 font-mono">
                  ${model.costPer1kTokens} / 1k Tokens
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-700 text-right">
                <button
                  type="button"
                  className={`text-xs font-semibold ${
                    selectedModel === model.id ? 'text-purple-300' : 'text-slate-400'
                  }`}
                >
                  {selectedModel === model.id ? 'Active Route' : 'Set as Default'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tenant Limits & Isolation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Daily Token Budget per Tenant</h3>
          <form onSubmit={handleSaveLimit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Max Daily Token Cap</label>
              <input
                type="number"
                value={tokenLimit}
                onChange={e => setTokenLimit(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg"
            >
              Save Cap Limits
            </button>
          </form>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-3">
          <h3 className="text-base font-bold text-white">Multi-Tenant Isolation & Policy</h3>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span>Cross-Tenant Vector Isolation:</span>
              <span className="text-emerald-400 font-bold">STRICT (ENFORCED)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Active by Default Mode:</span>
              <span className="text-emerald-400 font-bold">ENABLED</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Audit Logging:</span>
              <span className="text-purple-300 font-bold">MERKLE HASHED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
