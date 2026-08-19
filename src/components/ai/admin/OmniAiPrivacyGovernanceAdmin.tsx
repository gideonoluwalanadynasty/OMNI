import React, { useState } from 'react';
import {
  ShieldCheck, Lock, Download, Trash2, Sliders, CheckCircle2,
  AlertTriangle, RefreshCw, EyeOff, FileText, UserCheck, Scale, Check
} from 'lucide-react';
import { OmniPrivacyGovernancePolicy } from '../../../types';
import { INITIAL_PRIVACY_POLICIES } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OmniAiPrivacyGovernanceAdmin({ triggerToast }: Props) {
  const [policies, setPolicies] = useState<OmniPrivacyGovernancePolicy[]>(INITIAL_PRIVACY_POLICIES);
  const [selectedTenantId, setSelectedTenantId] = useState<string>(policies[0]?.tenantId || '');
  const [isExporting, setIsExporting] = useState(false);
  const [isPurgingMemory, setIsPurgingMemory] = useState(false);

  const selectedPolicy = policies.find(p => p.tenantId === selectedTenantId) || policies[0];

  const handleUpdatePolicy = (tenantId: string, updates: Partial<OmniPrivacyGovernancePolicy>) => {
    setPolicies(prev => prev.map(p => {
      if (p.tenantId === tenantId) {
        return {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    triggerToast('Privacy Policy Updated', 'Governance settings saved and applied to tenant partition.', 'success');
  };

  const handleExportUserData = () => {
    setIsExporting(true);
    triggerToast('Compiling Privacy Archive', 'Generating cryptographically signed GDPR/CCPA export bundle...', 'info');
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('Export Ready', 'Export bundle packaged into AES-256 encrypted JSON archive.', 'success');
    }, 1000);
  };

  const handlePurgeMemory = () => {
    setIsPurgingMemory(true);
    triggerToast('Purging Vector Memory', 'Cryptographically shredding ephemeral conversational embeddings...', 'info');
    setTimeout(() => {
      setIsPurgingMemory(false);
      triggerToast('Memory Shredded', 'Zero-retention vector purge executed across tenant indices.', 'success');
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-black tracking-tight">AI Privacy, Consent & Zero-Training Governance</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Enforce strict data minimisation, independent model training consent separation, GDPR/CCPA export bundles, and zero-retention memory shredding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportUserData}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export Tenant Archive'}</span>
          </button>
          <button
            onClick={handlePurgeMemory}
            disabled={isPurgingMemory}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isPurgingMemory ? 'Shredding...' : 'Purge AI Memory'}</span>
          </button>
        </div>
      </div>

      {/* Critical Zero-Training Notice Banner */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200">
              Constitutional AI Sovereign Zero-Training Guarantee
            </h4>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
              By enterprise charter, customer and tenant inputs are <strong>NEVER used to train or fine-tune public foundation models</strong>. Training consent is an explicitly separate, governed opt-in mechanism requiring verified corporate authority.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-600 text-white font-mono font-bold rounded-lg shrink-0 text-center">
          ZERO TRAINING ENFORCED
        </span>
      </div>

      {/* Grid: Tenant Privacy List & Deep Policy Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tenant Policies */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Tenant Governance Policies ({policies.length})</span>
          {policies.map(pol => {
            const isSelected = pol.tenantId === selectedTenantId;
            return (
              <div
                key={pol.tenantId}
                onClick={() => setSelectedTenantId(pol.tenantId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{pol.tenantName}</h4>
                    <span className="text-[10px] font-mono text-neutral-400">{pol.tenantId}</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase">
                    {pol.retentionDays}d Retention
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>PII Masking: <strong className="text-neutral-800 dark:text-neutral-200 uppercase">{pol.piiMaskingLevel}</strong></span>
                  <span className="text-emerald-600 font-bold">● Zero-Training</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Deep Privacy Controls */}
        <div className="lg:col-span-2 space-y-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          {selectedPolicy && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">{selectedPolicy.tenantName} Privacy Governance</h3>
                  <span className="text-[11px] text-neutral-500">Governed by: {selectedPolicy.governingOfficer}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-lg">
                  GDPR &amp; CCPA Compliant
                </span>
              </div>

              {/* Data Minimization & Retention Matrix */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Data Minimisation &amp; Retention Controls</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Data Minimisation Toggle */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white block">Automatic PII Scrubbing</span>
                      <span className="text-[11px] text-neutral-500">Redacts SSN, phone numbers, and emails before LLM transmission.</span>
                    </div>
                    <button
                      onClick={() => handleUpdatePolicy(selectedPolicy.tenantId, { dataMinimizationEnabled: !selectedPolicy.dataMinimizationEnabled })}
                      className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        selectedPolicy.dataMinimizationEnabled ? 'bg-indigo-600 justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                    </button>
                  </div>

                  {/* Retention Days Selector */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">Retention Period</span>
                      <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">{selectedPolicy.retentionDays} Days</span>
                    </div>
                    <select
                      value={selectedPolicy.retentionDays}
                      onChange={e => handleUpdatePolicy(selectedPolicy.tenantId, { retentionDays: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-neutral-200"
                    >
                      <option value={1}>1 Day (Ephemeral Scrub)</option>
                      <option value={7}>7 Days (Sandbox Standard)</option>
                      <option value={14}>14 Days (Standard Team)</option>
                      <option value={30}>30 Days (Enterprise Regulatory)</option>
                      <option value={90}>90 Days (Financial Audit Minimum)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Memory Controls & Training Consent Separation */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Memory Controls &amp; Model Training Consent</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Memory Purge Schedule */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">Conversational Memory Purge</span>
                    <select
                      value={selectedPolicy.memoryPurgeSchedule}
                      onChange={e => handleUpdatePolicy(selectedPolicy.tenantId, { memoryPurgeSchedule: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-neutral-200"
                    >
                      <option value="immediate">Immediate (Session End Shred)</option>
                      <option value="daily">Daily Midnight Cleanse</option>
                      <option value="weekly">Weekly Rotation</option>
                      <option value="never">Never (Preserve Context Memory)</option>
                    </select>
                  </div>

                  {/* Separate Model Training Governance Opt-In */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white block">Future Model Training Consent</span>
                      <span className="text-[11px] text-neutral-500">Distinct governed policy. Requires board resolution.</span>
                    </div>
                    <button
                      onClick={() => {
                        if (!selectedPolicy.allowModelTraining) {
                          triggerToast('Authorization Blocked', 'Model training consent requires explicit multi-party legal co-signing.', 'error');
                        } else {
                          handleUpdatePolicy(selectedPolicy.tenantId, { allowModelTraining: false });
                        }
                      }}
                      className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        selectedPolicy.allowModelTraining ? 'bg-indigo-600 justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hard Deletion Shredder */}
              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-200">Cryptographic Right-to-be-Forgotten Shredding</span>
                  <p className="text-[11px] text-rose-700 dark:text-rose-400">
                    Irreversibly overwrite all vector indices, cached transcripts, and embeddings with DoD 5220.22-M 7-pass random entropy.
                  </p>
                </div>
                <button
                  onClick={handlePurgeMemory}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                >
                  Execute Cryptographic Shred
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
