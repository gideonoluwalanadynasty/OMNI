import React, { useState } from 'react';
import { 
  Sliders, ShieldAlert, CheckCircle2, Zap, AlertTriangle, RefreshCw, 
  Layers, Lock, Sparkles, Database, Users, Terminal
} from 'lucide-react';
import { WorksFeatureFlagDefinition } from '../../types/works';
import { SEED_WORKS_FEATURE_FLAGS } from '../../data/omni_works_seed';

interface WorksFeatureActivationViewProps {
  currentFlags: Record<string, boolean>;
  onToggleFlag: (key: string, enabled: boolean) => void;
}

export const WorksFeatureActivationView: React.FC<WorksFeatureActivationViewProps> = ({
  currentFlags,
  onToggleFlag
}) => {
  const [flags, setFlags] = useState<WorksFeatureFlagDefinition[]>(SEED_WORKS_FEATURE_FLAGS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [confirmKillSwitchKey, setConfirmKillSwitchKey] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Flags (11)' },
    { id: 'core', label: 'Core Editors & Ops' },
    { id: 'ai', label: 'AI & Intelligence' },
    { id: 'security', label: 'Security & Encryption' },
    { id: 'collaboration', label: 'Collaboration & Portals' },
    { id: 'finance', label: 'Finance & Billing' },
    { id: 'automation', label: 'Workflow Automations' },
    { id: 'experimental', label: 'Experimental' }
  ];

  const filteredFlags = flags.filter(f => selectedCategory === 'all' || f.category === selectedCategory);

  const handleToggle = (key: string, isKillSwitch: boolean) => {
    const currentState = currentFlags[key] !== undefined ? currentFlags[key] : true;
    
    if (isKillSwitch && currentState) {
      // Disabling a kill-switch feature needs confirmation
      setConfirmKillSwitchKey(key);
      return;
    }

    onToggleFlag(key, !currentState);
  };

  const handleConfirmKillSwitch = () => {
    if (confirmKillSwitchKey) {
      onToggleFlag(confirmKillSwitchKey, false);
      setConfirmKillSwitchKey(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Dynamic Feature Flags &amp; Emergency Kill-Switches</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Feature Activation Matrix</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Instant feature toggling with sub-millisecond edge propagation via distributed Redis Pub/Sub mesh. Zero container restarts required.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-neutral-950 px-3 py-2 rounded-xl border border-neutral-800 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Propagation Latency: 4ms</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Flags List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFlags.map((flag) => {
          const isEnabled = currentFlags[flag.key] !== undefined ? currentFlags[flag.key] : flag.defaultValue;

          return (
            <div
              key={flag.key}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isEnabled
                  ? 'bg-neutral-900/80 border-neutral-800'
                  : 'bg-neutral-950/60 border-neutral-900 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white tracking-tight">{flag.name}</h3>
                      {flag.isKillSwitch && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          KILL SWITCH
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-indigo-400 mt-0.5">{flag.key}</div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleToggle(flag.key, flag.isKillSwitch)}
                    className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 ${
                      isEnabled ? 'bg-indigo-600' : 'bg-neutral-800'
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${
                        isEnabled ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {flag.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-800/80 text-[11px] font-mono">
                <span className="text-neutral-500">Min Tier: <span className="text-neutral-300 font-semibold">{flag.minTier.toUpperCase()}</span></span>
                <span className="text-neutral-500">Category: <span className="text-indigo-400">{flag.category}</span></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kill Switch Confirmation Modal */}
      {confirmKillSwitchKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-rose-900/60 rounded-2xl w-full max-w-md p-6 text-neutral-100 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Emergency Kill-Switch Trigger</h3>
                <p className="text-xs text-rose-400/80">Immediate Feature Deactivation</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              You are about to trip the kill switch for <code className="text-rose-400 font-mono font-bold">{confirmKillSwitchKey}</code>.
              This will instantly sever active real-time connections and disable this sub-module across all connected clients.
            </p>

            <div className="pt-2 flex justify-end gap-2 text-xs font-semibold">
              <button
                onClick={() => setConfirmKillSwitchKey(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmKillSwitch}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30"
              >
                Confirm Trip Kill-Switch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
