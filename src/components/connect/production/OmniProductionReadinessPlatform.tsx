import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Cloud,
  Activity,
  Sliders,
  CheckCircle2,
  Terminal,
  Play,
  RotateCcw,
  Layers,
  Server,
  FileText,
  Clock,
  GitBranch,
  Cpu,
  Globe,
  Radio
} from 'lucide-react';
import { OmniSecurityHardeningView } from './OmniSecurityHardeningView';
import { OmniLoadTestingEngineView } from './OmniLoadTestingEngineView';
import { OmniScalingAndDisasterRecoveryView } from './OmniScalingAndDisasterRecoveryView';
import { OmniProductionObservabilityView } from './OmniProductionObservabilityView';
import { OmniSuperAdminModuleGovernor } from './OmniSuperAdminModuleGovernor';

interface OmniProductionReadinessPlatformProps {
  initialSubTab?: 'security' | 'load_testing' | 'scaling_dr' | 'observability' | 'governor' | 'cicd';
}

export const OmniProductionReadinessPlatform: React.FC<OmniProductionReadinessPlatformProps> = ({
  initialSubTab = 'security',
}) => {
  const [activeTab, setActiveTab] = useState<
    'security' | 'load_testing' | 'scaling_dr' | 'observability' | 'governor' | 'cicd'
  >(initialSubTab);

  const [cicdPipelineStatus, setCicdPipelineStatus] = useState({
    codeValidation: 'passed',
    securityScan: 'passed',
    unitAndIntegrationTests: 'passed',
    e2eProductionSimulation: 'passed',
    containerBuild: 'passed',
    multiRegionDeploy: 'deployed',
  });

  return (
    <div className="space-y-6">
      {/* Universal Production Readiness Top Nav */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">OMNI Connect Production Hardening & Global Readiness</h1>
              <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-mono font-bold">
                READY FOR GLOBAL SCALE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Complete security audits, 10M concurrent synthetic load tests, disaster recovery drills, and super admin governance.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
          {[
            { id: 'security', label: 'Security Hardening', icon: ShieldCheck },
            { id: 'load_testing', label: 'Synthetic Load (10M)', icon: Zap },
            { id: 'scaling_dr', label: 'Scaling & DR', icon: Cloud },
            { id: 'observability', label: 'Telemetry & Metrics', icon: Activity },
            { id: 'governor', label: 'Super Admin Governor', icon: Sliders },
            { id: 'cicd', label: 'CI/CD Pipeline', icon: GitBranch },
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-indigo-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'security' && <OmniSecurityHardeningView />}
      {activeTab === 'load_testing' && <OmniLoadTestingEngineView />}
      {activeTab === 'scaling_dr' && <OmniScalingAndDisasterRecoveryView />}
      {activeTab === 'observability' && <OmniProductionObservabilityView />}
      {activeTab === 'governor' && <OmniSuperAdminModuleGovernor />}

      {/* CI/CD Pipeline Tab */}
      {activeTab === 'cicd' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-emerald-400" />
                  Automated Multi-Stage CI/CD Deployment Pipeline
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Immutable release gating with automated linting, zero-vulnerability container scanning, and multi-region canary rollout.
                </p>
              </div>

              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-mono font-bold">
                PIPELINE STATUS: GREEN (100% PASS)
              </span>
            </div>

            {/* Stages */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: '1. Code Lint & Typecheck', tool: 'ESLint / tsc', status: 'Passed in 1.4s', icon: CheckCircle2 },
                { name: '2. Security SAST/DAST', tool: 'Trivy & SonarQube', status: '0 CVEs Detected', icon: ShieldCheck },
                { name: '3. Unit & Integration', tool: 'Vitest / Jest (98%)', status: '1,420 tests passed', icon: CheckCircle2 },
                { name: '4. E2E Stress Sim', tool: 'Playwright & K6', status: '10M Concurrency OK', icon: Zap },
                { name: '5. Docker OCI Build', tool: 'Multi-Arch Distroless', status: 'Signed & Pushed', icon: Layers },
                { name: '6. K8s Canary Deploy', tool: 'ArgoCD / Cloud Run', status: 'Live in 285 PoPs', icon: Globe },
              ].map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white">{st.name}</span>
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block">{st.tool}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded text-[9px] font-mono block text-center">
                      {st.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Production Environments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs text-slate-400 font-mono">DEVELOPMENT (ais-dev)</span>
                <h4 className="text-sm font-bold text-white font-mono">dev.connect.omni.network</h4>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono">
                  Branch: feat/production-hardening
                </span>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs text-slate-400 font-mono">STAGING (ais-pre)</span>
                <h4 className="text-sm font-bold text-white font-mono">staging.connect.omni.network</h4>
                <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded text-[10px] font-mono">
                  Canary 10% Traffic
                </span>
              </div>

              <div className="p-4 bg-slate-950/60 border border-emerald-500/30 rounded-xl space-y-2">
                <span className="text-xs text-emerald-400 font-mono">PRODUCTION (Global Mesh)</span>
                <h4 className="text-sm font-bold text-white font-mono">connect.omni.network</h4>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-mono font-bold">
                  Active (99.999% SLA)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
