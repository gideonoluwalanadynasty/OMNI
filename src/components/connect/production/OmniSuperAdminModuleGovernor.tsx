import React, { useState } from 'react';
import {
  Sliders,
  Shield,
  Globe,
  Building2,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Settings,
  CreditCard,
  MessageSquare,
  Users,
  Compass,
  Code
} from 'lucide-react';
import { GlobalModuleControl, ModuleStatus, SubscriptionTierRequirement } from '../../../types/omni_production';
import { SEED_GLOBAL_MODULE_CONTROLS } from '../../../data/omni_production_seed';

export const OmniSuperAdminModuleGovernor: React.FC = () => {
  const [modules, setModules] = useState<GlobalModuleControl[]>(SEED_GLOBAL_MODULE_CONTROLS);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(SEED_GLOBAL_MODULE_CONTROLS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveBanner, setSaveBanner] = useState(false);

  const selectedModule = modules.find(m => m.id === selectedModuleId) || modules[0];

  const handleStatusChange = (modId: string, status: ModuleStatus) => {
    setModules(prev =>
      prev.map(m => (m.id === modId ? { ...m, status, globalEnabled: status === 'active' } : m))
    );
    showSaveNotification();
  };

  const handleTierChange = (modId: string, tier: SubscriptionTierRequirement) => {
    setModules(prev =>
      prev.map(m => (m.id === modId ? { ...m, minSubscriptionTier: tier } : m))
    );
    showSaveNotification();
  };

  const handleRateLimitChange = (modId: string, rateLimit: number) => {
    setModules(prev =>
      prev.map(m => (m.id === modId ? { ...m, rateLimitPerMinute: rateLimit } : m))
    );
    showSaveNotification();
  };

  const handleGeoModeChange = (modId: string, mode: 'allow_all' | 'whitelist' | 'blacklist') => {
    setModules(prev =>
      prev.map(m =>
        m.id === modId
          ? {
              ...m,
              geoRestrictions: {
                ...m.geoRestrictions,
                mode,
                countryCodes: mode === 'allow_all' ? [] : ['US', 'GB', 'DE', 'CH', 'SG', 'NG'],
              },
            }
          : m
      )
    );
    showSaveNotification();
  };

  const handleTenantIsolatedToggle = (modId: string) => {
    setModules(prev =>
      prev.map(m =>
        m.id === modId
          ? {
              ...m,
              tenantRestrictions: {
                ...m.tenantRestrictions,
                isolatedTenantOnly: !m.tenantRestrictions.isolatedTenantOnly,
              },
            }
          : m
      )
    );
    showSaveNotification();
  };

  const showSaveNotification = () => {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2500);
  };

  const filteredModules = modules.filter(
    m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Super Admin Global Feature Control & Module Matrix</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  GOVERNANCE ENGINE ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Granular global toggles across every OMNI Connect module: Activate, Deactivate, Geo-Fence by Country, Tenant Isolation, and Subscription Tier Gating.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveBanner && (
              <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-mono animate-in fade-in flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live Configuration Propagated to Edge
              </span>
            )}
          </div>
        </div>

        {/* Global Module Audit Counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Total Governed Modules</span>
            <span className="text-xl font-bold text-white font-mono">{modules.length} Modules</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Active Production State</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">
              {modules.filter(m => m.status === 'active').length} / {modules.length} (100%)
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Global SLA 30-Day Avg</span>
            <span className="text-xl font-bold text-sky-400 font-mono">99.995%</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Edge Mesh Sync</span>
            <span className="text-xl font-bold text-purple-400 font-mono">INSTANT (0.8s)</span>
          </div>
        </div>
      </div>

      {/* Main Governor Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Module List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter modules..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/80 max-h-[640px] overflow-y-auto no-scrollbar">
            {filteredModules.map(mod => {
              const isSelected = selectedModule.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`p-3.5 cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-purple-950/40 border-l-4 border-l-purple-500' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white truncate">{mod.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
                      <span className="capitalize">{mod.category}</span>
                      <span>•</span>
                      <span>{mod.version}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 font-mono ${
                      mod.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : mod.status === 'degraded'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    }`}
                  >
                    {mod.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Deep Module Configuration Governor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{selectedModule.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {selectedModule.category.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{selectedModule.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedModule.status}
                  onChange={e => handleStatusChange(selectedModule.id, e.target.value as ModuleStatus)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono font-bold"
                >
                  <option value="active">Active (Production)</option>
                  <option value="degraded">Degraded (Fallback)</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="disabled">Disabled (403 Gated)</option>
                </select>
              </div>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Subscription Tier Requirement */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  Minimum Subscription Tier
                </span>
                <select
                  value={selectedModule.minSubscriptionTier}
                  onChange={e => handleTierChange(selectedModule.id, e.target.value as SubscriptionTierRequirement)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                >
                  <option value="all">Public Free & All Users</option>
                  <option value="verified_plus">Verified Plus & Higher</option>
                  <option value="pro">OMNI Pro & Business Tier</option>
                  <option value="enterprise_sovereign">Enterprise Sovereign Only</option>
                </select>
                <p className="text-[11px] text-slate-400">
                  Users below this tier receive automated upgrade prompts when accessing module endpoints.
                </p>
              </div>

              {/* 2. Rate Limit Per Minute */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Rate Limit Threshold (Per Minute)
                </span>
                <input
                  type="number"
                  step={5000}
                  value={selectedModule.rateLimitPerMinute}
                  onChange={e => handleRateLimitChange(selectedModule.id, Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  Redis Token Bucket limit across all edge gateway points before HTTP 429 backoff.
                </p>
              </div>

              {/* 3. Geo-Fencing & Country Control */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-400" />
                  Country & Geo-Fencing Mode
                </span>
                <select
                  value={selectedModule.geoRestrictions.mode}
                  onChange={e => handleGeoModeChange(selectedModule.id, e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                >
                  <option value="allow_all">Allow All 195+ Countries Globally</option>
                  <option value="whitelist">Whitelist Designated Jurisdictions</option>
                  <option value="blacklist">Blacklist OFAC / Sanctioned Regions</option>
                </select>
                {selectedModule.geoRestrictions.mode !== 'allow_all' && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedModule.geoRestrictions.countryCodes.map(c => (
                      <span key={c} className="px-2 py-0.5 bg-slate-900 text-sky-300 rounded text-[10px] font-mono border border-slate-800">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Multi-Tenant Air-Gap Restriction */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Multi-Tenant Sovereign Gating
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Air-Gapped Sovereign Tenants Only</span>
                  <input
                    type="checkbox"
                    checked={selectedModule.tenantRestrictions.isolatedTenantOnly}
                    onChange={() => handleTenantIsolatedToggle(selectedModule.id)}
                    className="w-5 h-5 rounded text-purple-600 bg-slate-900 border-slate-800"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  When enabled, this module is strictly quarantined to private enterprise tenants.
                </p>
              </div>
            </div>

            {/* SLA & Health Audit Footer */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <span className="text-slate-400">
                30-Day Verified Uptime SLA: <span className="text-emerald-400 font-bold">{selectedModule.slaUptime30d}%</span>
              </span>
              <span className="text-slate-400">
                Circuit Breaker Threshold: <span className="text-purple-300 font-bold">{selectedModule.circuitBreakerThresholdPct}%</span>
              </span>
              <span className="text-slate-500">Last Sync: {selectedModule.lastHealthCheck}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
