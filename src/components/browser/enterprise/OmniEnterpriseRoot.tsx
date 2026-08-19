import React, { useState } from 'react';
import { EnterpriseOrgSector } from '../../../types/enterprise_audit';
import { EnterpriseFleetManager } from './EnterpriseFleetManager';
import { EnterprisePolicyEngine } from './EnterprisePolicyEngine';
import { EnterpriseUserGroups } from './EnterpriseUserGroups';
import { EnterpriseInternalPortals } from './EnterpriseInternalPortals';
import { EnterpriseTrainingPortal } from './EnterpriseTrainingPortal';
import { EnterpriseSecurityAuditSuite } from './EnterpriseSecurityAuditSuite';
import { EnterprisePerformanceAuditSuite } from './EnterprisePerformanceAuditSuite';
import {
  Building2,
  GraduationCap,
  Landmark,
  HeartHandshake,
  Laptop,
  Sliders,
  Users,
  Layers,
  Award,
  ShieldCheck,
  Gauge,
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const OmniEnterpriseRoot: React.FC = () => {
  const [activeSector, setActiveSector] = useState<EnterpriseOrgSector>('government');
  const [activeTab, setActiveTab] = useState<
    'fleet' | 'policies' | 'groups' | 'portals' | 'training' | 'security_audit' | 'performance_audit'
  >('security_audit');

  const sectorConfigs = {
    government: {
      name: 'OMNI Defense & Government Edition',
      subtitle: 'Air-Gapped Sovereign Mesh • NIST FIPS 203 Post-Quantum • FedRAMP High Attestation',
      icon: Landmark,
      badge: 'TOP SECRET / SCI READY',
      badgeColor: 'text-rose-300 bg-rose-950/80 border-rose-800'
    },
    company: {
      name: 'OMNI Enterprise Corporate Edition',
      subtitle: 'Zero-Trust MDM Fleet • AI Prompt DLP • 40% Wholesale Reseller Ledger',
      icon: Building2,
      badge: 'ENTERPRISE SOC2 READY',
      badgeColor: 'text-indigo-300 bg-indigo-950/80 border-indigo-800'
    },
    school: {
      name: 'OMNI Education & Academy Edition',
      subtitle: 'FERPA/COPPA Compliant • Socratic AI Learning • Anti-Cheating Exam Lockdown',
      icon: GraduationCap,
      badge: 'EDUCATION COMPLIANT',
      badgeColor: 'text-emerald-300 bg-emerald-950/80 border-emerald-800'
    },
    ngo: {
      name: 'OMNI Humanitarian & NGO Defender',
      subtitle: 'Anti-Surveillance Onion Routing • Emergency Duress Memory Shredder • Offline Field Aid',
      icon: HeartHandshake,
      badge: 'HUMAN RIGHTS ENFORCED',
      badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-800'
    }
  };

  const currentSector = sectorConfigs[activeSector];
  const SectorIcon = currentSector.icon;

  const tabs = [
    { id: 'security_audit', label: 'Security Audit (8 Vectors)', icon: ShieldCheck },
    { id: 'performance_audit', label: 'Performance Benchmarks', icon: Gauge },
    { id: 'fleet', label: 'Managed Browsers', icon: Laptop },
    { id: 'policies', label: 'Policy Engine (GPO)', icon: Sliders },
    { id: 'groups', label: 'User Groups & RBAC', icon: Users },
    { id: 'portals', label: 'Internal Portals Hub', icon: Layers },
    { id: 'training', label: 'Security Training', icon: Award }
  ] as const;

  return (
    <div className="w-full h-full flex flex-col bg-stone-950 text-stone-100 overflow-y-auto">
      {/* Top Enterprise Control Bar */}
      <div className="p-4 sm:p-5 bg-stone-900 border-b border-stone-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Sector & Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center text-white shadow-lg border border-stone-700">
              <SectorIcon className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-stone-100">{currentSector.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold ${currentSector.badgeColor}`}>
                  {currentSector.badge}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{currentSector.subtitle}</p>
            </div>
          </div>

          {/* Right: Sector Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-950 border border-stone-800 rounded-xl">
            {(Object.keys(sectorConfigs) as EnterpriseOrgSector[]).map((sec) => {
              const cfg = sectorConfigs[sec];
              const Icon = cfg.icon;
              const isSelected = activeSector === sec;

              return (
                <button
                  key={sec}
                  onClick={() => setActiveSector(sec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-stone-800 text-stone-100 shadow border border-stone-700'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="capitalize">{sec}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-t border-stone-800/80 pt-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-stone-800 text-stone-100 border border-stone-700 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container Content */}
      <div className="flex-1 p-5 max-w-7xl mx-auto w-full space-y-6">
        {activeTab === 'security_audit' && <EnterpriseSecurityAuditSuite />}
        {activeTab === 'performance_audit' && <EnterprisePerformanceAuditSuite />}
        {activeTab === 'fleet' && <EnterpriseFleetManager />}
        {activeTab === 'policies' && <EnterprisePolicyEngine />}
        {activeTab === 'groups' && <EnterpriseUserGroups />}
        {activeTab === 'portals' && <EnterpriseInternalPortals />}
        {activeTab === 'training' && <EnterpriseTrainingPortal />}
      </div>
    </div>
  );
};
