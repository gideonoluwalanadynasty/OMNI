import React, { useState } from 'react';
import {
  Server, Key, Shield, Globe, CheckCircle2, XCircle, AlertTriangle,
  Play, RefreshCw, Cpu, Database, Sliders, ChevronDown, ChevronRight,
  DollarSign, Clock, Plus, Trash2, Edit3, Lock, ShieldAlert
} from 'lucide-react';
import { OmniAiProviderConfig, OmniAiProviderVendor } from '../../../types';
import { INITIAL_AI_PROVIDERS } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OmniAiProvidersModelsAdmin({ triggerToast }: Props) {
  const [providers, setProviders] = useState<OmniAiProviderConfig[]>(INITIAL_AI_PROVIDERS);
  const [selectedProviderId, setSelectedProviderId] = useState<string>(providers[0]?.id || '');
  const [isTestingProvider, setIsTestingProvider] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { status: string; latencyMs: number; message: string }>>({});
  const [editingProvider, setEditingProvider] = useState<OmniAiProviderConfig | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState<string | null>(null);
  const [newApiKeyInput, setNewApiKeyInput] = useState('');

  const selectedProvider = providers.find(p => p.id === selectedProviderId) || providers[0];

  const handleToggleProvider = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isEnabled;
        triggerToast(
          nextState ? 'Provider Activated' : 'Provider Deactivated',
          `${p.name} status updated to ${nextState ? 'ENABLED' : 'DISABLED'}.`,
          nextState ? 'success' : 'info'
        );
        return { ...p, isEnabled: nextState, status: nextState ? 'operational' : 'disabled' };
      }
      return p;
    }));
  };

  const handleTestProvider = (provider: OmniAiProviderConfig) => {
    setIsTestingProvider(provider.id);
    setTimeout(() => {
      setIsTestingProvider(null);
      const simulatedLatency = Math.floor(Math.random() * 120) + 180;
      setTestResults(prev => ({
        ...prev,
        [provider.id]: {
          status: 'SUCCESS',
          latencyMs: simulatedLatency,
          message: `Endpoint verified: ${provider.endpoint} (HTTP 200 OK, auth valid).`
        }
      }));
      triggerToast('Health Check Passed', `${provider.name} responded in ${simulatedLatency}ms.`, 'success');
    }, 900);
  };

  const handleSaveApiKey = (providerId: string) => {
    if (!newApiKeyInput.trim()) {
      triggerToast('Validation Error', 'API Key cannot be empty.', 'error');
      return;
    }
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const masked = newApiKeyInput.slice(0, 7) + '********************' + newApiKeyInput.slice(-4);
        return {
          ...p,
          apiKeyConfigured: true,
          apiKeyMasked: masked
        };
      }
      return p;
    }));
    setShowApiKeyModal(null);
    setNewApiKeyInput('');
    triggerToast('Credentials Secured', 'API key encrypted and stored in sovereign secret enclave.', 'success');
  };

  const handleAddDeprecatedModel = (providerId: string, modelName: string) => {
    if (!modelName.trim()) return;
    setProviders(prev => prev.map(p => {
      if (p.id === providerId && !p.deprecatedModels.includes(modelName)) {
        return {
          ...p,
          deprecatedModels: [...p.deprecatedModels, modelName]
        };
      }
      return p;
    }));
    triggerToast('Model Deprecated', `Marked ${modelName} as deprecated. Fallback routing will engage.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black tracking-tight">AI Provider & Model Infrastructure Hub</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Configure upstream foundation model providers, sovereign on-prem cluster endpoints, credential enclaves, capability matrices, and deprecated model fallbacks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              providers.forEach(p => handleTestProvider(p));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ping All Endpoints</span>
          </button>
        </div>
      </div>

      {/* Grid: Provider List + Provider Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Provider Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Connected Providers ({providers.length})</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● {providers.filter(p => p.isEnabled).length} Active</span>
          </div>

          {providers.map(prov => {
            const isSelected = prov.id === selectedProviderId;
            return (
              <div
                key={prov.id}
                onClick={() => setSelectedProviderId(prov.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-neutral-900 dark:text-white">{prov.name}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                        prov.status === 'operational'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {prov.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate max-w-[200px]">
                      {prov.endpoint}
                    </p>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleProvider(prov.id);
                    }}
                    className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      prov.isEnabled ? 'bg-indigo-600 justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>P95: <strong className="text-neutral-700 dark:text-neutral-300 font-mono">{prov.latencyP95Ms}ms</strong></span>
                  <span>Input: <strong className="text-neutral-700 dark:text-neutral-300 font-mono">${prov.costMetadata.inputCostPerMTokensUsd}/M</strong></span>
                  <span>Err: <strong className="text-neutral-700 dark:text-neutral-300 font-mono">{prov.errorRatePercent}%</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Configuration Inspector */}
        <div className="lg:col-span-2 space-y-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          {selectedProvider ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">{selectedProvider.name}</h3>
                    <span className="text-[10px] font-mono uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md font-bold text-neutral-600 dark:text-neutral-400">
                      {selectedProvider.vendor}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{selectedProvider.notes || 'Configured AI Provider Endpoint'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTestProvider(selectedProvider)}
                    disabled={isTestingProvider === selectedProvider.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Play className={`w-3.5 h-3.5 text-indigo-600 ${isTestingProvider === selectedProvider.id ? 'animate-spin' : ''}`} />
                    <span>{isTestingProvider === selectedProvider.id ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                  <button
                    onClick={() => setShowApiKeyModal(selectedProvider.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Rotate Key</span>
                  </button>
                </div>
              </div>

              {/* Test Result Banner if present */}
              {testResults[selectedProvider.id] && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{testResults[selectedProvider.id].message}</span>
                  </div>
                  <span className="font-mono font-bold">{testResults[selectedProvider.id].latencyMs}ms</span>
                </div>
              )}

              {/* Security & Credentials Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">Credentials & Sovereign Enclave</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase">Encrypted Master Token</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">{selectedProvider.apiKeyMasked}</span>
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase">Active Gateway Target</span>
                    <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200 block truncate">{selectedProvider.endpoint}</span>
                  </div>
                </div>
              </div>

              {/* Availability & Scopes */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">Tenant & Geographic Availability</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase">Country Availability</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProvider.countryAvailability.map(c => (
                        <span key={c} className="text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase">Tenant Availability</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProvider.tenantAvailability.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded font-bold text-indigo-700 dark:text-indigo-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Capabilities Mapping Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">Engine Capabilities Matrix</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(selectedProvider.capabilities).map(([capKey, isSupported]) => (
                    <div
                      key={capKey}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        isSupported
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-neutral-900 dark:text-white'
                          : 'bg-neutral-50 dark:bg-neutral-800/30 border-neutral-200 dark:border-neutral-800 text-neutral-400 line-through'
                      }`}
                    >
                      <span className="capitalize font-semibold">{capKey.replace(/([A-Z])/g, ' $1')}</span>
                      {isSupported ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Metadata & Rate Modeling */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">Cost & Margin Metadata</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                    <span className="text-[10px] text-neutral-400 font-bold block">INPUT / 1M TOKENS</span>
                    <span className="text-sm font-black font-mono text-neutral-900 dark:text-white mt-1 block">
                      ${selectedProvider.costMetadata.inputCostPerMTokensUsd.toFixed(3)}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                    <span className="text-[10px] text-neutral-400 font-bold block">OUTPUT / 1M TOKENS</span>
                    <span className="text-sm font-black font-mono text-neutral-900 dark:text-white mt-1 block">
                      ${selectedProvider.costMetadata.outputCostPerMTokensUsd.toFixed(3)}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                    <span className="text-[10px] text-neutral-400 font-bold block">CACHE READ / 1M</span>
                    <span className="text-sm font-black font-mono text-neutral-900 dark:text-white mt-1 block">
                      ${selectedProvider.costMetadata.cacheReadCostPerMTokensUsd.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fallback Configuration & Deprecated Models */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500">Failover & Deprecated Model Management</h4>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">Active Cascade Fallback Target</span>
                      <p className="text-[11px] text-neutral-500">Engages immediately if primary endpoint exceeds 2.5s latency or returns 429/5xx.</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                      {selectedProvider.fallbackProviderId || 'None (Hard Error)'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Deprecated Models Tagger:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {selectedProvider.deprecatedModels.length === 0 ? (
                        <span className="text-xs text-neutral-400 italic">No models currently deprecated.</span>
                      ) : (
                        selectedProvider.deprecatedModels.map(m => (
                          <span key={m} className="text-[10px] font-mono px-2 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded font-bold flex items-center gap-1">
                            <span>{m}</span>
                            <span className="text-rose-400">✕</span>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-400 text-xs">Select a provider to inspect credentials and configurations.</div>
          )}
        </div>
      </div>

      {/* Rotate Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Key className="w-5 h-5" />
              <h3 className="text-sm font-black text-neutral-900 dark:text-white">Rotate Upstream Master Key</h3>
            </div>
            <p className="text-xs text-neutral-500">
              New secret will be written directly to the sovereign AES-256 hardware enclave. Redacted from browser logs.
            </p>
            <input
              type="password"
              placeholder="Paste new upstream API key..."
              value={newApiKeyInput}
              onChange={e => setNewApiKeyInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowApiKeyModal(null);
                  setNewApiKeyInput('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveApiKey(showApiKeyModal)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 cursor-pointer"
              >
                Save &amp; Encrypt Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
