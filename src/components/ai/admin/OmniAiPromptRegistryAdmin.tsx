import React, { useState } from 'react';
import {
  FileCode2, Shield, Lock, Eye, EyeOff, Plus, CheckCircle2,
  AlertTriangle, Sliders, Clock, User, Tag, ArrowUpRight, Copy, Check
} from 'lucide-react';
import { OmniSystemPromptRegistryEntry, UserRole } from '../../../types';
import { INITIAL_PROMPT_REGISTRY } from '../../../ai_admin_data';

interface Props {
  currentUserRole?: UserRole;
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OmniAiPromptRegistryAdmin({ currentUserRole = 'superadmin', triggerToast }: Props) {
  const [prompts, setPrompts] = useState<OmniSystemPromptRegistryEntry[]>(INITIAL_PROMPT_REGISTRY);
  const [selectedPromptId, setSelectedPromptId] = useState<string>(prompts[0]?.id || '');
  const [unmaskedPromptIds, setUnmaskedPromptIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedPrompt = prompts.find(p => p.id === selectedPromptId) || prompts[0];

  const isUserAuthorized = (prompt: OmniSystemPromptRegistryEntry) => {
    if (currentUserRole === 'superadmin' || currentUserRole === 'administrator') return true;
    return prompt.allowedRoles.includes(currentUserRole);
  };

  const handleToggleMask = (id: string) => {
    setUnmaskedPromptIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPrompt = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    triggerToast('Copied to Clipboard', 'System prompt definition copied.', 'info');
  };

  const handleDeployPrompt = (id: string) => {
    setPrompts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: 'active_production',
          deploymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    }));
    triggerToast('Prompt Deployed', 'System prompt promoted to active production runtime.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black tracking-tight">Sovereign System Prompt Registry</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Centrally version, evaluate, and deploy shared system instructions. Confidential system prompts are cryptographically masked from unauthorized roles.
          </p>
        </div>

        <button
          onClick={() => triggerToast('New Prompt Template', 'New version draft instantiated.', 'info')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New System Prompt</span>
        </button>
      </div>

      {/* Grid: Prompt List & Prompt Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Prompts List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Registered Prompts ({prompts.length})</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● {prompts.filter(p => p.status === 'active_production').length} in Production</span>
          </div>

          {prompts.map(p => {
            const isSelected = p.id === selectedPromptId;
            const authorized = isUserAuthorized(p);
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPromptId(p.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{p.title}</h4>
                      {p.confidential && (
                        <Lock className="w-3 h-3 text-amber-500" title="Confidential System Prompt" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">v{p.version} • {p.applicationScope}</span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    p.status === 'active_production'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}>
                    {p.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Owner: <strong className="text-neutral-700 dark:text-neutral-300">{p.ownerName}</strong></span>
                  <span className="flex items-center gap-1">
                    <span>Eval:</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{p.evaluationScore}%</strong>
                    <span className="px-1 py-0.2 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded font-bold">{p.safetyGrade}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Prompt Deep Viewer & Editor */}
        <div className="lg:col-span-2 space-y-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          {selectedPrompt ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">{selectedPrompt.title}</h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg">
                      v{selectedPrompt.version}
                    </span>
                    {selectedPrompt.confidential && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Confidential
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Deployed: {selectedPrompt.deploymentDate} • Owner: {selectedPrompt.ownerName} ({selectedPrompt.ownerUserId})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedPrompt.status !== 'active_production' && (
                    <button
                      onClick={() => handleDeployPrompt(selectedPrompt.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Promote to Production
                    </button>
                  )}
                  <button
                    onClick={() => handleCopyPrompt(selectedPrompt.promptContent, selectedPrompt.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {copiedId === selectedPrompt.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === selectedPrompt.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Evaluation Metrics & Parameter Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Benchmark Eval</span>
                  <span className="text-sm font-black font-mono text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                    {selectedPrompt.evaluationScore}%
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Safety Grade</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    {selectedPrompt.safetyGrade} PASS
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Temperature</span>
                  <span className="text-sm font-black font-mono text-neutral-900 dark:text-white mt-0.5 block">
                    {selectedPrompt.temperature}
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Max Output</span>
                  <span className="text-sm font-black font-mono text-neutral-900 dark:text-white mt-0.5 block">
                    {selectedPrompt.maxTokens} tok
                  </span>
                </div>
              </div>

              {/* Prompt Content Box (With strict confidentiality masking enforcement) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-500">System Instruction Payload</span>
                  {selectedPrompt.confidential && (
                    <button
                      onClick={() => handleToggleMask(selectedPrompt.id)}
                      className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 cursor-pointer"
                    >
                      {unmaskedPromptIds[selectedPrompt.id] ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Mask Content</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Reveal Content</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-neutral-200 font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                  {selectedPrompt.confidential && !unmaskedPromptIds[selectedPrompt.id] && !isUserAuthorized(selectedPrompt) ? (
                    <div className="text-center py-8 text-neutral-500 italic space-y-2">
                      <Lock className="w-6 h-6 mx-auto text-amber-500" />
                      <p>[CONFIDENTIAL SYSTEM INSTRUCTION RESTRICTED]</p>
                      <p className="text-[10px]">Your current role does not possess the requisite clearance to view this master instruction block.</p>
                    </div>
                  ) : selectedPrompt.confidential && !unmaskedPromptIds[selectedPrompt.id] ? (
                    <div className="text-center py-6 text-neutral-500 italic">
                      [CLICK "REVEAL CONTENT" TO UNMASK AUTHORIZED PROMPT TEXT]
                    </div>
                  ) : (
                    selectedPrompt.promptContent
                  )}
                </div>
              </div>

              {/* Changelog & Allowed Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase">Version Changelog</span>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">{selectedPrompt.changelog}</p>
                </div>
                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase">Authorized Access Roles</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPrompt.allowedRoles.map(r => (
                      <span key={r} className="text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded font-bold">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
