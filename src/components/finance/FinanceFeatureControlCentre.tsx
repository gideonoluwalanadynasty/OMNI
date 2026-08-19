import React, { useState } from 'react';
import {
  Sliders, ShieldCheck, AlertCircle, CheckCircle2, Globe, Building2,
  Key, RefreshCw, Layers, Check, X, Info, Zap, Lock
} from 'lucide-react';
import {
  FinanceFeatureFlag,
  FinanceTenantType,
  ComplianceTier
} from '../../types/finance_os';

interface FinanceFeatureControlCentreProps {
  features: FinanceFeatureFlag[];
  onToggleFeature: (featureId: string, isInstalled: boolean) => void;
  onUpdateCountryScope: (featureId: string, countries: string[]) => void;
}

export default function FinanceFeatureControlCentre({
  features,
  onToggleFeature,
  onUpdateCountryScope
}: FinanceFeatureControlCentreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [filterQuery, setFilterQuery] = useState('');

  const categories = ['ALL', 'core', 'payments', 'treasury', 'lending', 'compliance', 'developer', 'whitelabel'];

  const filteredFeatures = features.filter((f) => {
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    const matchesQuery = f.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-cyan-950/40 to-stone-900 border border-cyan-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>OMNI Finance Feature Control Centre &amp; Matrix Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
            Feature Activation &amp; Operational Governance
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl">
            Granular activation switchboard separating <strong className="text-stone-200">Installed Capabilities</strong> from <strong className="text-stone-200">Operational Real-Time Status</strong> across jurisdictions, compliance tiers, and provider connections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <div className="text-stone-400">Total Modules</div>
            <div className="font-bold text-white text-sm">{features.length} Installed</div>
          </div>
        </div>
      </div>

      {/* Philosophical Rule Banner */}
      <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center gap-3 text-xs">
        <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        <div className="text-stone-300">
          <strong className="text-white">Architectural Rule:</strong> Never hide software capability. A feature is displayed in the UI as installed, and marked operational when compliance, licensing, and provider network status are validated.
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Categories */}
        <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs font-semibold overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition uppercase text-[11px] ${
                selectedCategory === cat
                  ? 'bg-stone-800 text-white font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search feature flags by code or keyword..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="px-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-cyan-500 outline-none w-full sm:w-72"
        />
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeatures.map((flag) => (
          <div
            key={flag.id}
            className={`p-5 rounded-2xl border transition space-y-4 ${
              flag.isInstalled
                ? 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                : 'bg-stone-950/60 border-stone-900 opacity-60'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">{flag.code}</span>
                  <span className="px-2 py-0.2 rounded bg-stone-800 text-[10px] text-stone-300 font-mono uppercase">
                    {flag.category}
                  </span>
                  {flag.regulatedActivity && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[9px] font-mono font-bold">
                      Regulated
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-1">{flag.name}</h3>
              </div>

              {/* Install Toggle */}
              <button
                onClick={() => onToggleFeature(flag.id, !flag.isInstalled)}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition cursor-pointer flex items-center gap-1.5 ${
                  flag.isInstalled
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
              >
                {flag.isInstalled ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>{flag.isInstalled ? 'ACTIVE' : 'INACTIVE'}</span>
              </button>
            </div>

            <p className="text-xs text-stone-300">{flag.description}</p>

            {/* Status indicators */}
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Operational Real-Time State:</span>
                <span className={`font-bold font-mono flex items-center gap-1 ${flag.isOperational ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {flag.isOperational ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{flag.isOperational ? 'OPERATIONAL' : 'REQUIRES PROVIDER'}</span>
                </span>
              </div>
              <div className="text-[11px] text-stone-400">
                {flag.operationalReason}
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-stone-900 text-[11px]">
                <span className="text-stone-500">Min. Compliance Tier:</span>
                <span className="font-mono text-purple-300 font-semibold">{flag.minComplianceTierRequired}</span>
              </div>
            </div>

            {/* Jurisdiction Badge */}
            <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span>Jurisdiction: {flag.supportedCountries.join(', ')}</span>
              </div>
              <div>
                <span>{flag.allowedTenantTypes.length} Tenant Types</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
