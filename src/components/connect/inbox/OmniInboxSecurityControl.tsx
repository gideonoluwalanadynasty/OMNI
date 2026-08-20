import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Key,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Activity,
  Server,
  UserX,
  Sliders
} from 'lucide-react';
import { GatewaySecurityPolicy, GatewayAuditLog } from '../../../types/omni_universal_inbox';

interface Props {
  policy: GatewaySecurityPolicy;
  auditLogs: GatewayAuditLog[];
  onUpdatePolicy: (updated: Partial<GatewaySecurityPolicy>) => void;
}

export const OmniInboxSecurityControl: React.FC<Props> = ({
  policy,
  auditLogs,
  onUpdatePolicy
}) => {
  const [currentPolicy, setCurrentPolicy] = useState<GatewaySecurityPolicy>(policy);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: keyof GatewaySecurityPolicy) => {
    const updated = {
      ...currentPolicy,
      [key]: !currentPolicy[key]
    };
    setCurrentPolicy(updated);
    onUpdatePolicy(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                SECURITY & SUPER ADMIN CONTROL
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Zero Data Retention (ZDR) Enforced
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Security Policies & Gateway Audit</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-1">
              Configure communication security controls, DLP filters, quiet hours, API credential encryption, and inspect cryptographic audit logs of all inbound/outbound events.
            </p>
          </div>

          {saveSuccess && (
            <div className="px-4 py-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Security Policies Updated</span>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout: Policy Toggles + Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Policy Toggles (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Gateway Security Controls</span>
          </h3>

          <div className="space-y-3 pt-1 text-xs">
            {/* PII Masking */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <strong className="text-white block font-bold">Mask Sensitive PII & Card Numbers</strong>
                <span className="text-[11px] text-slate-400">Automatically obfuscates SSN, credit cards, and private passwords.</span>
              </div>
              <input
                type="checkbox"
                checked={currentPolicy.maskPIIEnabled}
                onChange={() => handleToggle('maskPIIEnabled')}
                className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
              />
            </div>

            {/* Strict AI Human-In-The-Loop Auto-Send Block */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <strong className="text-purple-300 block font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  AI External Auto-Send Block (Mandatory)
                </strong>
                <span className="text-[11px] text-slate-400">AI cannot automatically dispatch messages to external channels without human agent review.</span>
              </div>
              <input
                type="checkbox"
                disabled
                checked={currentPolicy.aiAutoSendBlocked}
                className="w-4 h-4 text-purple-600 rounded bg-slate-900 border-slate-700 cursor-not-allowed opacity-80"
              />
            </div>

            {/* Double Opt-In WhatsApp */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <strong className="text-white block font-bold">Enforce Double Opt-In for WhatsApp</strong>
                <span className="text-[11px] text-slate-400">Require explicit opt-in confirmation before sending outbound notifications.</span>
              </div>
              <input
                type="checkbox"
                checked={currentPolicy.enforceDoubleOptInForWhatsApp}
                onChange={() => handleToggle('enforceDoubleOptInForWhatsApp')}
                className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
              />
            </div>

            {/* Quiet Hours */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <strong className="text-white block font-bold">Enforce Quiet Hours Suppression</strong>
                <span className="text-[11px] text-slate-400">Holds outbound marketing broadcasts between 22:00 and 08:00 local time.</span>
              </div>
              <input
                type="checkbox"
                checked={currentPolicy.enforceQuietHours}
                onChange={() => handleToggle('enforceQuietHours')}
                className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
              />
            </div>

            {/* DLP Sensitive Data Filter */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <strong className="text-white block font-bold">Data Loss Prevention (DLP) Filter</strong>
                <span className="text-[11px] text-slate-400">Scans all outbound agent replies for private API keys and tokens before dispatch.</span>
              </div>
              <input
                type="checkbox"
                checked={currentPolicy.dlpSensitiveDataFilter}
                onChange={() => handleToggle('dlpSensitiveDataFilter')}
                className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Audit Trail Logs (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Gateway Cryptographic Audit Trail</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">HMAC SHA-256 Verified</span>
          </div>

          <div className="space-y-3 pt-1">
            {auditLogs.map(log => (
              <div
                key={log.id}
                className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      log.status === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {log.action}
                    </span>
                    <span className="text-indigo-400 font-bold capitalize">{log.channel}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] font-mono">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-slate-300 text-[11px] font-mono">{log.details}</p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Actor: <strong className="text-slate-400">{log.actor}</strong></span>
                  <span>IP: <strong className="text-slate-400">{log.ipAddress}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
