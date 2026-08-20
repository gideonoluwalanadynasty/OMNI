import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Users,
  Settings,
  Clock,
  Key,
  Database,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Server,
  Zap
} from 'lucide-react';

interface Props {
  tenantName?: string;
}

export const OmniCrmAdminControlView: React.FC<Props> = ({
  tenantName = 'OmniTech Enterprise Global'
}) => {
  const [responseSlaMins, setResponseSlaMins] = useState(15);
  const [resolutionSlaHours, setResolutionSlaHours] = useState(24);
  const [requireHumanApproval, setRequireHumanApproval] = useState(true);
  const [auditLoggingEnabled, setAuditLoggingEnabled] = useState(true);
  const [gdprEnforcement, setGdprEnforcement] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePolicies = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div id="omni-crm-admin-control-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                SOVEREIGN CRM GOVERNANCE & PERMISSIONS
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AUDITED & SECURE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Super Admin Policy & CRM Compliance Center
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Configure strict organizational SLA policies, RBAC access boundaries, GDPR customer sovereignty export keys, and AI commercial guardrails.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-300 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800">
              Tenant: {tenantName}
            </span>
          </div>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>✓ Organization CRM governance policies and SLA thresholds updated successfully.</span>
        </div>
      )}

      {/* Admin Settings Form */}
      <form onSubmit={handleSavePolicies} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SLA & Response Policies (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              SLA Response & Escalation Thresholds
            </h3>
            <span className="text-[10px] text-amber-400 font-mono font-bold">Automatic Monitoring</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Target First Response SLA (Minutes):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={responseSlaMins}
                  onChange={e => setResponseSlaMins(Number(e.target.value))}
                  className="w-24 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono font-bold"
                />
                <span className="text-xs text-slate-400">
                  Triggers alert at {Math.round(responseSlaMins * 0.75)}m; breaches at {responseSlaMins}m
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Maximum Ticket Resolution SLA (Hours):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="72"
                  value={resolutionSlaHours}
                  onChange={e => setResolutionSlaHours(Number(e.target.value))}
                  className="w-24 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono font-bold"
                />
                <span className="text-xs text-slate-400">
                  Auto-escalates to Department Head at {resolutionSlaHours} hours
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Departmental Routing Queues:
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span>Sales & Institutional BD Queue</span>
                  <span className="text-emerald-400 font-bold font-mono">3 Agents Online</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span>Enterprise Support & SLA Queue</span>
                  <span className="text-emerald-400 font-bold font-mono">5 Agents Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Guardrails & Compliance (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              AI Commercial Guardrails & GDPR Protection
            </h3>
            <span className="text-[10px] text-indigo-300 font-mono">Enforced Hardware Security</span>
          </div>

          <div className="space-y-3.5">
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Strict Human Commercial Authorization</span>
                <span className="text-[11px] text-slate-400">
                  AI cannot close deals or modify ledger credit limits without employee 2FA.
                </span>
              </div>
              <input
                type="checkbox"
                checked={requireHumanApproval}
                onChange={e => setRequireHumanApproval(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Immutable Audit Trail (Cryptographic Logs)</span>
                <span className="text-[11px] text-slate-400">
                  Record all deal transitions and customer data accesses with timestamped hashes.
                </span>
              </div>
              <input
                type="checkbox"
                checked={auditLoggingEnabled}
                onChange={e => setAuditLoggingEnabled(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">GDPR & Sovereign Data Erasure Compliance</span>
                <span className="text-[11px] text-slate-400">
                  Support 1-click customer data purge and full JSON archive export.
                </span>
              </div>
              <input
                type="checkbox"
                checked={gdprEnforcement}
                onChange={e => setGdprEnforcement(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Enforce Policies</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
