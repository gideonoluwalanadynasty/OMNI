import React, { useState } from 'react';
import { EnterprisePolicyProfile, EnterprisePolicyRule, EnterpriseOrgSector } from '../../../types/enterprise_audit';
import { INITIAL_POLICY_PROFILES } from '../../../data/mockEnterpriseAuditData';
import {
  Sliders,
  Shield,
  Lock,
  Sparkles,
  Layers,
  Radio,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Building2,
  GraduationCap,
  Landmark,
  HeartHandshake
} from 'lucide-react';

export const EnterprisePolicyEngine: React.FC = () => {
  const [profiles, setProfiles] = useState<EnterprisePolicyProfile[]>(INITIAL_POLICY_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(INITIAL_POLICY_PROFILES[0].id);
  const [savedNotice, setSavedNotice] = useState(false);

  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  const handleToggleRule = (ruleId: string) => {
    setProfiles(prev =>
      prev.map(p => {
        if (p.id === selectedProfile.id) {
          const updatedRules = p.rules.map(r =>
            r.id === ruleId ? { ...r, isEnabled: !r.isEnabled } : r
          );
          return { ...p, rules: updatedRules, lastModified: new Date().toISOString().split('T')[0] };
        }
        return p;
      })
    );
  };

  const handleSavePolicies = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const getSectorBadge = (sector: EnterpriseOrgSector) => {
    switch (sector) {
      case 'government':
        return { label: 'Government / FedRAMP', icon: Landmark, color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800' };
      case 'company':
        return { label: 'Enterprise Corporate', icon: Building2, color: 'text-indigo-400 bg-indigo-950/80 border-indigo-800' };
      case 'school':
        return { label: 'Education / K-12', icon: GraduationCap, color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' };
      case 'ngo':
        return { label: 'Humanitarian / NGO', icon: HeartHandshake, color: 'text-amber-400 bg-amber-950/80 border-amber-800' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-100">Zero-Trust Enterprise Policy Engine (GPO / MDM)</h2>
          <p className="text-xs text-stone-400">
            Define declarative browser enforcement policies for Data Loss Prevention, AI safety guardrails, and cryptographic isolation.
          </p>
        </div>

        <button
          onClick={handleSavePolicies}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Deploy Policy Updates</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Policy profile &quot;{selectedProfile.name}&quot; successfully pushed to {selectedProfile.assignedDeviceCount} managed endpoints!</span>
          </div>
          <span className="font-mono text-[10px]">PQC Ratchet Sync Active</span>
        </div>
      )}

      {/* Grid: Profile Selector + Rule Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Profiles List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-semibold text-stone-400 px-1">POLICY PROFILES</div>

          <div className="space-y-2">
            {profiles.map((profile) => {
              const badge = getSectorBadge(profile.targetSector);
              const Icon = badge.icon;
              const isSelected = selectedProfileId === profile.id;

              return (
                <div
                  key={profile.id}
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-stone-800/90 border-indigo-500 shadow-md'
                      : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono flex items-center gap-1 ${badge.color}`}>
                      <Icon className="w-3 h-3" />
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">{profile.assignedDeviceCount} nodes</span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-stone-200">{profile.name}</h3>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">{profile.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Profile Rule Manager */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-100">{selectedProfile.name}</h3>
                <div className="text-stone-400 text-[11px] mt-0.5">
                  Sector Target: <strong className="text-stone-200 uppercase font-mono">{selectedProfile.targetSector}</strong> • Last Modified: {selectedProfile.lastModified}
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] font-bold">
                {selectedProfile.rules.filter(r => r.isEnabled).length} / {selectedProfile.rules.length} Rules Active
              </span>
            </div>

            {/* List of Policy Rules */}
            <div className="space-y-3">
              {selectedProfile.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-200">{rule.name}</span>
                      <span className="px-1.5 py-0.2 rounded bg-stone-900 border border-stone-800 text-stone-400 font-mono text-[9px] uppercase">
                        {rule.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">{rule.description}</p>
                    <div className="text-[10px] text-stone-500 font-mono">
                      Enforcement Level: <strong className="text-cyan-400">{rule.enforcementLevel.toUpperCase()}</strong>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={rule.isEnabled}
                    onChange={() => handleToggleRule(rule.id)}
                    className="w-4 h-4 rounded text-indigo-600 cursor-pointer shrink-0 mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
