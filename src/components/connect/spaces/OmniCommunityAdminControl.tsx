import React, { useState } from 'react';
import {
  Sliders,
  Shield,
  DollarSign,
  Users,
  CheckCircle2,
  Lock,
  Globe,
  Building,
  GraduationCap,
  Sparkles,
  Briefcase,
  Heart,
  Layers,
  Save,
  AlertCircle
} from 'lucide-react';
import { OmniCommunityGovernancePolicy, OmniSpaceType } from '../../../types/omni_spaces';
import { SEED_GOVERNANCE_POLICY } from '../../../data/omni_spaces_seed';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  policy?: OmniCommunityGovernancePolicy;
  activeProfile: ConnectProfile;
}

export const OmniCommunityAdminControl: React.FC<Props> = ({
  policy = SEED_GOVERNANCE_POLICY,
  activeProfile
}) => {
  const [govPolicy, setGovPolicy] = useState<OmniCommunityGovernancePolicy>(policy);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const toggleSpaceType = (typeKey: OmniSpaceType) => {
    setGovPolicy(prev => ({
      ...prev,
      allowedSpaceTypes: {
        ...prev.allowedSpaceTypes,
        [typeKey]: !prev.allowedSpaceTypes[typeKey]
      }
    }));
  };

  const handleSave = () => {
    setSaveStatus('Governance and Monetization policies updated across all sovereign nodes. Merkle policy leaf stamped.');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const spaceTypesList: { key: OmniSpaceType; label: string; desc: string; icon: any }[] = [
    { key: 'public_space', label: 'Public Spaces', desc: 'Open discovery, searchable across global sovereign index', icon: Globe },
    { key: 'private_space', label: 'Private Spaces', desc: 'Access via tokenized invite or application review', icon: Lock },
    { key: 'enterprise_space', label: 'Enterprise Spaces', desc: 'SAML SSO, custom SLA, and audit compliance logging', icon: Building },
    { key: 'learning_space', label: 'Learning Spaces', desc: 'LMS courses, certificate credentials, and student vaults', icon: GraduationCap },
    { key: 'business_space', label: 'Business Spaces', desc: 'Storefront checkout, merchant ledgers, and CRM sync', icon: Briefcase },
    { key: 'creator_space', label: 'Creator Spaces', desc: 'Subscriber tier gates, VIP live streams, and fan memberships', icon: Sparkles },
    { key: 'family_space', label: 'Family Spaces', desc: 'End-to-end encrypted photo albums and closed family chat', icon: Heart },
    { key: 'organisation_space', label: 'Organisation Spaces', desc: 'Multi-chapter hierarchies, non-profit tithing, and NGO records', icon: Layers }
  ];

  return (
    <div id="omni-community-admin-control" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              SUPER ADMIN GOVERNANCE
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              NETWORK AUTHORITATIVE
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Space Types, Membership Rules, Monetization & Safety Controls
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Configure system-wide community policies, adjust platform fee sharing (OMNI Finance), tune AI safety risk thresholds, and govern allowed space archetypes.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Policy Updates</span>
        </button>
      </div>

      {saveStatus && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* 3 Main Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Space Types Switchboard (Col 1) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Allowed Space Types (8)
          </h3>
          <p className="text-xs text-slate-400">Enable or disable specific space archetypes across the entire network.</p>

          <div className="space-y-3">
            {spaceTypesList.map(item => {
              const isEnabled = govPolicy.allowedSpaceTypes[item.key];
              return (
                <div
                  key={item.key}
                  className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <item.icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{item.label}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSpaceType(item.key)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                      isEnabled ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Membership & Quotas (Col 2) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Membership Rules & Capacity
          </h3>
          <p className="text-xs text-slate-400">Control max roster ceilings, auto-approvals, and creator quotas.</p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Max Member Capacity Per Space</label>
              <input
                type="number"
                value={govPolicy.maxMembersPerSpace}
                onChange={e => setGovPolicy({ ...govPolicy, maxMembersPerSpace: parseInt(e.target.value) || 100000 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <span className="text-[10px] text-slate-500">Supports up to 1,000,000 via high-performance sharding</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Max Spaces Per Creator Account</label>
              <input
                type="number"
                value={govPolicy.maxSpacesPerUser}
                onChange={e => setGovPolicy({ ...govPolicy, maxSpacesPerUser: parseInt(e.target.value) || 50 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Require Verification for Public Listing</div>
                <div className="text-[10px] text-slate-500">Prevent spam spaces in global discovery</div>
              </div>
              <button
                onClick={() => setGovPolicy({ ...govPolicy, requireVerificationForPublicSpaces: !govPolicy.requireVerificationForPublicSpaces })}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  govPolicy.requireVerificationForPublicSpaces ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    govPolicy.requireVerificationForPublicSpaces ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Monetization & AI Safety (Col 3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            Monetization & Safety Risk Tuning
          </h3>
          <p className="text-xs text-slate-400">Configure fee revenue sharing and AI content moderation thresholds.</p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Platform Revenue Fee Sharing (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={govPolicy.platformFeePercent}
                  onChange={e => setGovPolicy({ ...govPolicy, platformFeePercent: parseFloat(e.target.value) || 2.5 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <span className="text-xs font-bold text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-500">Sovereign standard: 2.5% network fee on store/course/subs</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">AI Safety Auto-Flag Threshold (Risk 0-100)</label>
              <input
                type="range"
                min="30"
                max="95"
                value={govPolicy.aiModerationThreshold}
                onChange={e => setGovPolicy({ ...govPolicy, aiModerationThreshold: parseInt(e.target.value) })}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Sensitive (30)</span>
                <span className="font-bold text-indigo-400">Current: {govPolicy.aiModerationThreshold}</span>
                <span>Permissive (95)</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Enable Global CRM Sync</div>
                <div className="text-[10px] text-slate-500">Sync member tags with OMNI CRM</div>
              </div>
              <button
                onClick={() => setGovPolicy({ ...govPolicy, enableCrmIntegrationGlobal: !govPolicy.enableCrmIntegrationGlobal })}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  govPolicy.enableCrmIntegrationGlobal ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    govPolicy.enableCrmIntegrationGlobal ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
