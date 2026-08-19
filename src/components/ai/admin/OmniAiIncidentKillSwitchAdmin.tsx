import React, { useState } from 'react';
import {
  Ban, ShieldAlert, AlertTriangle, CheckCircle2, Lock, Key,
  Cpu, Server, Bot, Wrench, Building2, Network, Plus, Trash2
} from 'lucide-react';
import { OmniSovereignKillSwitch } from '../../../types';
import { INITIAL_KILL_SWITCHES } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

const TARGET_ICONS: Record<string, any> = {
  model: Cpu,
  provider: Server,
  agent: Bot,
  tool: Wrench,
  tenant: Building2,
  api_key: Key,
  routing_override: Network
};

export default function OmniAiIncidentKillSwitchAdmin({ triggerToast }: Props) {
  const [killSwitches, setKillSwitches] = useState<OmniSovereignKillSwitch[]>(INITIAL_KILL_SWITCHES);
  const [selectedTargetType, setSelectedTargetType] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTargetType, setNewTargetType] = useState<'model' | 'provider' | 'agent' | 'tool' | 'tenant' | 'api_key' | 'routing_override'>('model');
  const [newTargetId, setNewTargetId] = useState('');
  const [newTargetName, setNewTargetName] = useState('');
  const [newReason, setNewReason] = useState('');

  const filteredSwitches = selectedTargetType === 'ALL'
    ? killSwitches
    : killSwitches.filter(k => k.targetType === selectedTargetType);

  const handleToggleKillSwitch = (id: string) => {
    setKillSwitches(prev => prev.map(k => {
      if (k.id === id) {
        const nextBlocked = !k.isBlocked;
        triggerToast(
          nextBlocked ? 'Kill-Switch Engaged' : 'Kill-Switch Lifted',
          `Target ${k.targetName} is now ${nextBlocked ? 'BLOCKED & ISOLATED' : 'RESTORED'}.`,
          nextBlocked ? 'error' : 'success'
        );
        return {
          ...k,
          isBlocked: nextBlocked,
          activatedAt: new Date().toISOString()
        };
      }
      return k;
    }));
  };

  const handleAddKillSwitch = () => {
    if (!newTargetId || !newTargetName || !newReason) {
      triggerToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const newSwitch: OmniSovereignKillSwitch = {
      id: `kill_${newTargetType}_${Date.now()}`,
      targetType: newTargetType,
      targetId: newTargetId,
      targetName: newTargetName,
      isBlocked: true,
      reason: newReason,
      activatedBy: 'gideonoluwalanadynasty@gmail.com',
      activatedAt: new Date().toISOString(),
      impactedWorkloads: 'Immediate Global AI Gateway Interception'
    };

    setKillSwitches([newSwitch, ...killSwitches]);
    setShowAddModal(false);
    setNewTargetId('');
    setNewTargetName('');
    setNewReason('');
    triggerToast('Kill-Switch Armed', `Immediate block applied to ${newTargetName}.`, 'error');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Ban className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-black tracking-tight">Sovereign Kill-Switches &amp; Incident Emergency Controls</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Zero-latency global execution interception. Immediately disable specific models, providers, agents, tools, tenants, API keys, or force routing overrides.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Arm New Kill-Switch</span>
        </button>
      </div>

      {/* Filter and Switch Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
            Active Sovereign Interceptions ({filteredSwitches.length})
          </span>

          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'model', 'provider', 'agent', 'tool', 'tenant', 'api_key', 'routing_override'].map(t => (
              <button
                key={t}
                onClick={() => setSelectedTargetType(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedTargetType === t
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSwitches.map(ks => {
            const Icon = TARGET_ICONS[ks.targetType] || Ban;
            return (
              <div
                key={ks.id}
                className={`p-5 rounded-3xl border transition-all space-y-3 ${
                  ks.isBlocked
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                      ks.isBlocked
                        ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{ks.targetName}</h4>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold">
                          {ks.targetType}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">{ks.targetId}</span>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => handleToggleKillSwitch(ks.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      ks.isBlocked
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300'
                    }`}
                  >
                    {ks.isBlocked ? 'BLOCKED' : 'ALLOW'}
                  </button>
                </div>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  <strong>Reason: </strong> {ks.reason}
                </p>

                <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Activated: <strong className="text-neutral-700 dark:text-neutral-300">{new Date(ks.activatedAt).toLocaleString()}</strong></span>
                  <span>By: <strong className="text-neutral-700 dark:text-neutral-300 truncate max-w-[140px]">{ks.activatedBy}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arm New Kill-Switch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <Ban className="w-5 h-5" />
              <h3 className="text-sm font-black text-neutral-900 dark:text-white">Arm Immediate Sovereign Kill-Switch</h3>
            </div>
            <p className="text-xs text-neutral-500">
              This action takes effect instantaneously across all AI gateway routing nodes.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Target Type</label>
                <select
                  value={newTargetType}
                  onChange={e => setNewTargetType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200"
                >
                  <option value="model">Model</option>
                  <option value="provider">Provider</option>
                  <option value="agent">Agent</option>
                  <option value="tool">Tool</option>
                  <option value="tenant">Tenant</option>
                  <option value="api_key">API Key</option>
                  <option value="routing_override">Routing Override</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Target Identifier (ID / Key)</label>
                <input
                  type="text"
                  placeholder="e.g. claude-2.0 or ten_suspicious"
                  value={newTargetId}
                  onChange={e => setNewTargetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Target Name</label>
                <input
                  type="text"
                  placeholder="e.g. Claude 2.0 Legacy or Suspicious Tenant"
                  value={newTargetName}
                  onChange={e => setNewTargetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Interception Reason / Incident Log</label>
                <textarea
                  rows={2}
                  placeholder="State the compliance, security or degradation reason..."
                  value={newReason}
                  onChange={e => setNewReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddKillSwitch}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-500 cursor-pointer shadow-xs"
              >
                Arm &amp; Intercept Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
