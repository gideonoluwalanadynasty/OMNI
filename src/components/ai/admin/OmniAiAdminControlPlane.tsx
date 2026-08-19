import React, { useState } from 'react';
import {
  Server, Network, FileCode2, BarChart2, ShieldAlert, ShieldCheck,
  AlertTriangle, Activity, Ban, Sliders, Shield, Key, Cpu, Database,
  DollarSign, FileText, CheckCircle2, Award, Zap, Layers, RefreshCw
} from 'lucide-react';
import { UserRole } from '../../../types';
import OmniAiProvidersModelsAdmin from './OmniAiProvidersModelsAdmin';
import OmniAiRoutingAdmin from './OmniAiRoutingAdmin';
import OmniAiPromptRegistryAdmin from './OmniAiPromptRegistryAdmin';
import OmniAiEvaluationsAdmin from './OmniAiEvaluationsAdmin';
import OmniAiSecurityRedTeamAdmin from './OmniAiSecurityRedTeamAdmin';
import OmniAiPrivacyGovernanceAdmin from './OmniAiPrivacyGovernanceAdmin';
import OmniAiHighStakesSafeguardsAdmin from './OmniAiHighStakesSafeguardsAdmin';
import OmniAiObservabilityDashboard from './OmniAiObservabilityDashboard';
import OmniAiIncidentKillSwitchAdmin from './OmniAiIncidentKillSwitchAdmin';

interface Props {
  currentUserRole?: UserRole;
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export type OmniAdminAiSubTab =
  | 'providers'
  | 'routing'
  | 'prompts'
  | 'evaluations'
  | 'safety'
  | 'privacy'
  | 'high-stakes'
  | 'observability'
  | 'incidents'
  | 'security-audit';

export default function OmniAiAdminControlPlane({
  currentUserRole = 'superadmin',
  triggerToast
}: Props) {
  const [activeSubTab, setActiveSubTab] = useState<OmniAdminAiSubTab>('providers');

  const navItems = [
    { key: 'providers', label: 'Providers & Models', icon: Server },
    { key: 'routing', label: 'Dynamic Routing', icon: Network },
    { key: 'prompts', label: 'Prompt Registry', icon: FileCode2 },
    { key: 'evaluations', label: 'AI Evaluations', icon: BarChart2 },
    { key: 'safety', label: 'Security & Red Team', icon: ShieldAlert, highlight: true },
    { key: 'privacy', label: 'Privacy & Governance', icon: ShieldCheck },
    { key: 'high-stakes', label: 'High-Stakes Safeguards', icon: AlertTriangle },
    { key: 'observability', label: 'Observability & Tracing', icon: Activity },
    { key: 'incidents', label: 'Incident Kill-Switches', icon: Ban, highlight: true },
  ];

  return (
    <div className="space-y-6">
      {/* Master Control Plane Top Header */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">OMNI AI Sovereign Admin Center</h2>
              <span className="text-[10px] font-mono uppercase bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold px-2 py-0.5 rounded-full">
                CONTROL PLANE v4.2
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Comprehensive administration covering providers, declarative routing, versioned prompts, evaluations, red-team defenses, zero-training privacy, and instant kill-switches.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>AI Gateway 100% Operational</span>
          </span>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto shadow-xs">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSubTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSubTab(item.key as OmniAdminAiSubTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? (item.highlight ? 'text-rose-400' : 'text-indigo-400') : 'text-neutral-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Sub-Module View */}
      <div>
        {activeSubTab === 'providers' && (
          <OmniAiProvidersModelsAdmin triggerToast={triggerToast} />
        )}

        {activeSubTab === 'routing' && (
          <OmniAiRoutingAdmin triggerToast={triggerToast} />
        )}

        {activeSubTab === 'prompts' && (
          <OmniAiPromptRegistryAdmin currentUserRole={currentUserRole} triggerToast={triggerToast} />
        )}

        {activeSubTab === 'evaluations' && (
          <OmniAiEvaluationsAdmin triggerToast={triggerToast} />
        )}

        {activeSubTab === 'safety' && (
          <OmniAiSecurityRedTeamAdmin triggerToast={triggerToast} />
        )}

        {activeSubTab === 'privacy' && (
          <OmniAiPrivacyGovernanceAdmin triggerToast={triggerToast} />
        )}

        {activeSubTab === 'high-stakes' && (
          <OmniAiHighStakesSafeguardsAdmin triggerToast={triggerToast} />
        )}

        {activeSubTab === 'observability' && (
          <OmniAiObservabilityDashboard triggerToast={triggerToast} />
        )}

        {activeSubTab === 'incidents' && (
          <OmniAiIncidentKillSwitchAdmin triggerToast={triggerToast} />
        )}
      </div>
    </div>
  );
}
