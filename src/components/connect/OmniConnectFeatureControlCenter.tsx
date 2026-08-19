import React, { useState } from 'react';
import {
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Globe,
  Sliders,
  AlertTriangle,
  Lock,
  Layers,
  Search,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';
import { ConnectFeatureModule, ConnectModuleId } from '../../types/omni_connect';

interface Props {
  modules: ConnectFeatureModule[];
  onToggleModule: (id: ConnectModuleId, status: 'ACTIVE' | 'INACTIVE' | 'RESTRICTED') => void;
  onUpdateConfig: (id: ConnectModuleId, updates: Partial<ConnectFeatureModule>) => void;
}

export const OmniConnectFeatureControlCenter: React.FC<Props> = ({
  modules,
  onToggleModule,
  onUpdateConfig
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | 'free' | 'growth' | 'enterprise'>('all');
  const [selectedModule, setSelectedModule] = useState<ConnectFeatureModule | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.capabilityKey.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTierFilter === 'all' || m.requiredSubscriptionTier === selectedTierFilter;
    return matchesSearch && matchesTier;
  });

  const activeCount = modules.filter(m => m.status === 'ACTIVE').length;
  const restrictedCount = modules.filter(m => m.status === 'RESTRICTED').length;
  const inactiveCount = modules.filter(m => m.status === 'INACTIVE').length;

  return (
    <div id="omni-connect-feature-control-center" className="space-y-6">
      {/* Header & Status Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ALL MODULES ACTIVE BY DEFAULT
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                SUPER ADMIN LEVEL
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sliders className="w-6 h-6 text-indigo-400" />
              OMNI Connect Feature Control Centre
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Super Admin switchboard to govern application capabilities, tenant access rules, geographic geo-fencing, subscription tier gates, and runtime API limits across all 18 OMNI Connect modular services.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-xl font-bold text-emerald-400">{activeCount}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Active</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-xl font-bold text-amber-400">{restrictedCount}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Restricted</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-xl font-bold text-rose-400">{inactiveCount}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Inactive</div>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-modules-input"
            type="text"
            placeholder="Search modules or capability keys..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-xl focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {(['all', 'free', 'growth', 'enterprise'] as const).map(tier => (
            <button
              key={tier}
              id={`filter-tier-${tier}`}
              onClick={() => setSelectedTierFilter(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedTierFilter === tier
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tier} tier
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredModules.map(mod => {
          const isActive = mod.status === 'ACTIVE';
          const isRestricted = mod.status === 'RESTRICTED';

          return (
            <div
              key={mod.id}
              id={`module-card-${mod.id}`}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white leading-snug">{mod.name}</h3>
                      <p className="text-xs font-mono text-slate-400">{mod.capabilityKey}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isRestricted
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {mod.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mt-2">{mod.description}</p>

                {/* Tag Attributes */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-slate-500" /> Country Scope
                    </span>
                    <span className="text-slate-200 font-medium font-mono">
                      {mod.enabledForCountries.includes('*') ? 'GLOBAL (ALL)' : mod.enabledForCountries.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-slate-500" /> Tier Required
                    </span>
                    <span className="text-indigo-300 font-semibold uppercase">{mod.requiredSubscriptionTier}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Rate Limit
                    </span>
                    <span className="text-slate-300">{mod.rateLimitPerMinute} req/min</span>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  id={`btn-configure-${mod.id}`}
                  onClick={() => setSelectedModule(mod)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  Configure Rules
                </button>

                <div className="flex items-center gap-1">
                  <button
                    id={`btn-toggle-active-${mod.id}`}
                    onClick={() => {
                      const nextStatus = isActive ? 'INACTIVE' : 'ACTIVE';
                      onToggleModule(mod.id, nextStatus);
                      showToast(`Module [${mod.name}] is now ${nextStatus}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {isActive ? 'ACTIVE' : 'ACTIVATE'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Configuration Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold">Configure {selectedModule.name}</h3>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Operational Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['ACTIVE', 'RESTRICTED', 'INACTIVE'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        onToggleModule(selectedModule.id, st);
                        setSelectedModule({ ...selectedModule, status: st });
                        showToast(`Status updated to ${st}`);
                      }}
                      className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                        selectedModule.status === st
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Required Subscription Plan
                </label>
                <select
                  value={selectedModule.requiredSubscriptionTier}
                  onChange={e => {
                    const tier = e.target.value as any;
                    onUpdateConfig(selectedModule.id, { requiredSubscriptionTier: tier });
                    setSelectedModule({ ...selectedModule, requiredSubscriptionTier: tier });
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="free">Free (All Tenants)</option>
                  <option value="growth">Growth Tier</option>
                  <option value="enterprise">Enterprise Tier</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  API Rate Limit (Req / Minute)
                </label>
                <input
                  type="number"
                  value={selectedModule.rateLimitPerMinute}
                  onChange={e => {
                    const limit = parseInt(e.target.value) || 60;
                    onUpdateConfig(selectedModule.id, { rateLimitPerMinute: limit });
                    setSelectedModule({ ...selectedModule, rateLimitPerMinute: limit });
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  Live Governance Info
                </div>
                <p>Changes apply instantly to all tenant nodes via the OMNI Core State Bus with cryptographic Merkle verification.</p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedModule(null);
                  showToast(`Configuration saved successfully`);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
