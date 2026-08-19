import React, { useState } from 'react';
import {
  AlertTriangle, Shield, HeartPulse, Scale, DollarSign, Briefcase,
  GraduationCap, Landmark, CheckCircle2, Sliders, Lock, FileText, Check
} from 'lucide-react';
import { OmniHighStakesGuardConfig } from '../../../types';
import { INITIAL_HIGH_STAKES_CONFIGS } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

const DOMAIN_ICONS: Record<string, any> = {
  health: HeartPulse,
  law: Scale,
  finance: DollarSign,
  employment: Briefcase,
  education: GraduationCap,
  government: Landmark
};

export default function OmniAiHighStakesSafeguardsAdmin({ triggerToast }: Props) {
  const [configs, setConfigs] = useState<OmniHighStakesGuardConfig[]>(INITIAL_HIGH_STAKES_CONFIGS);
  const [selectedDomain, setSelectedDomain] = useState<string>(configs[0]?.domain || 'health');

  const selectedConfig = configs.find(c => c.domain === selectedDomain) || configs[0];

  const handleToggleDomain = (domain: string) => {
    setConfigs(prev => prev.map(c => {
      if (c.domain === domain) {
        const nextState = !c.isEnabled;
        triggerToast(
          nextState ? 'Safeguard Activated' : 'Safeguard Suspended',
          `${c.title} is now ${nextState ? 'ACTIVE' : 'INACTIVE'}.`,
          nextState ? 'success' : 'info'
        );
        return { ...c, isEnabled: nextState };
      }
      return c;
    }));
  };

  const handleUpdateConfig = (domain: string, updates: Partial<OmniHighStakesGuardConfig>) => {
    setConfigs(prev => prev.map(c => {
      if (c.domain === domain) {
        return { ...c, ...updates };
      }
      return c;
    }));
    triggerToast('Safeguard Config Saved', 'Domain notice & enforcement rules updated.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black tracking-tight">High-Stakes Context Safeguards & Regulatory Disclaimers</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Enforce non-negotiable statutory advisory notices across Health, Law, Finance, Employment, Education, and Government. Prohibits marketing AI output as accredited professional advice.
          </p>
        </div>
      </div>

      {/* Grid: Domain Cards + Deep Guard Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Domains list */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Regulated Domains ({configs.length})</span>
          {configs.map(cfg => {
            const Icon = DOMAIN_ICONS[cfg.domain] || Shield;
            const isSelected = cfg.domain === selectedDomain;
            return (
              <div
                key={cfg.domain}
                onClick={() => setSelectedDomain(cfg.domain)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white capitalize">{cfg.domain}</h4>
                      <span className="text-[10px] text-neutral-400 block truncate max-w-[150px]">{cfg.title}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDomain(cfg.domain);
                    }}
                    className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      cfg.isEnabled ? 'bg-indigo-600 justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Enforcement: <strong className="text-neutral-800 dark:text-neutral-200 uppercase font-mono">{cfg.enforcementMode.replace(/_/g, ' ')}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Deep Domain Guard Inspector & Disclaimer Editor */}
        <div className="lg:col-span-2 space-y-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          {selectedConfig && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-neutral-900 dark:text-white">{selectedConfig.title}</h3>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-lg">
                  {selectedConfig.auditRetentionDays}d Compliance Retention
                </span>
              </div>

              {/* Mandatory Disclaimer Text Preview & Editor */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Mandatory Statutory Advisory Notice (Appended Automatically)</span>
                <textarea
                  rows={3}
                  value={selectedConfig.requiredDisclaimerText}
                  onChange={e => handleUpdateConfig(selectedConfig.domain, { requiredDisclaimerText: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-amber-50/40 dark:bg-amber-950/20 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              {/* Enforcement Mode Selector */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Domain Enforcement Strictness</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { mode: 'mandatory_disclaimer', label: 'Mandatory Notice', desc: 'Appends legal disclaimer to all model completions.' },
                    { mode: 'block_advisory_claims', label: 'Block Advice Claims', desc: 'Intercepts any output asserting certified guidance.' },
                    { mode: 'require_human_expert_co_sign', label: 'Human Co-Sign', desc: 'Halts completion until a licensed expert signs off.' }
                  ].map(m => (
                    <div
                      key={m.mode}
                      onClick={() => handleUpdateConfig(selectedConfig.domain, { enforcementMode: m.mode as any })}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                        selectedConfig.enforcementMode === m.mode
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700'
                          : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      <span className="text-xs font-extrabold text-neutral-900 dark:text-white block">{m.label}</span>
                      <p className="text-[10px] text-neutral-500">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blocked High-Risk Keywords */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Prohibited High-Risk Claims &amp; Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedConfig.blockedKeywords.map(kw => (
                    <span key={kw} className="text-[11px] font-mono px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg font-bold">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Alternative Safe Guidance Guidance */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase">Fallback Professional Referral Directive</span>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 italic">{selectedConfig.safeAlternativeAdviceTemplate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
