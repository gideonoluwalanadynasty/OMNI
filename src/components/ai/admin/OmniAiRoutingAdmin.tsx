import React, { useState } from 'react';
import {
  Network, Plus, Trash2, Sliders, CheckCircle2, ArrowRight,
  Shield, Cpu, DollarSign, Clock, Play, RefreshCw, Zap, Layers, AlertCircle
} from 'lucide-react';
import { OmniAiRoutingPolicy } from '../../../types';
import { INITIAL_ROUTING_POLICIES } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OmniAiRoutingAdmin({ triggerToast }: Props) {
  const [policies, setPolicies] = useState<OmniAiRoutingPolicy[]>(INITIAL_ROUTING_POLICIES);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(policies[0]?.id || '');
  const [showNewPolicyModal, setShowNewPolicyModal] = useState(false);

  // Simulator state
  const [simTaskType, setSimTaskType] = useState('code_generation');
  const [simTokenCount, setSimTokenCount] = useState<number>(4500);
  const [simTenantTier, setSimTenantTier] = useState('enterprise');
  const [simPrivacyLevel, setSimPrivacyLevel] = useState('standard');
  const [simulationResult, setSimulationResult] = useState<{
    matchedPolicy: string;
    targetModel: string;
    targetProvider: string;
    reason: string;
    estimatedLatencyMs: number;
    estimatedCostUsd: number;
  } | null>(null);

  const selectedPolicy = policies.find(p => p.id === selectedPolicyId) || policies[0];

  const handleTogglePolicy = (id: string) => {
    setPolicies(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isEnabled;
        triggerToast(
          nextState ? 'Policy Activated' : 'Policy Suspended',
          `Routing policy "${p.name}" is now ${nextState ? 'ACTIVE' : 'INACTIVE'}.`,
          nextState ? 'success' : 'info'
        );
        return { ...p, isEnabled: nextState };
      }
      return p;
    }));
  };

  const handleRunSimulator = () => {
    // Evaluate against active policies in priority order
    const activePolicies = policies.filter(p => p.isEnabled).sort((a, b) => b.priority - a.priority);

    let matched: any = null;

    if (simPrivacyLevel === 'sovereign_zero_retention') {
      matched = {
        matchedPolicy: 'Sovereign Zero-Cloud Containment Policy',
        targetModel: 'omni_sovereign_llama70b',
        targetProvider: 'OMNI Sovereign On-Premises Cluster (vLLM)',
        reason: 'Rule matched: privacy_level = "sovereign_zero_retention". Cloud egress blocked.',
        estimatedLatencyMs: 140,
        estimatedCostUsd: 0.00000
      };
    } else if (simTaskType === 'code_generation') {
      matched = {
        matchedPolicy: 'Cost & Latency Intelligent Balancer',
        targetModel: 'claude-3-5-sonnet',
        targetProvider: 'Anthropic Claude Engine',
        reason: 'Rule matched: task_type = "code_generation". Dispatched to top code benchmark engine.',
        estimatedLatencyMs: 720,
        estimatedCostUsd: (simTokenCount / 1000000) * 3.0
      };
    } else if (simTaskType === 'deep_reasoning') {
      matched = {
        matchedPolicy: 'Cost & Latency Intelligent Balancer',
        targetModel: 'deepseek-r1',
        targetProvider: 'DeepSeek Reasoner Cluster',
        reason: 'Rule matched: task_type = "deep_reasoning". Dispatched to symbolic chain-of-thought reasoner.',
        estimatedLatencyMs: 1100,
        estimatedCostUsd: (simTokenCount / 1000000) * 0.55
      };
    } else if (simTokenCount < 1000) {
      matched = {
        matchedPolicy: 'Cost & Latency Intelligent Balancer',
        targetModel: 'gemini-2.5-flash',
        targetProvider: 'Google Gemini & Vertex AI',
        reason: 'Rule matched: prompt_token_count < 1000. Optimized for sub-400ms TTFT response.',
        estimatedLatencyMs: 340,
        estimatedCostUsd: (simTokenCount / 1000000) * 0.15
      };
    } else {
      matched = {
        matchedPolicy: 'Cost & Latency Intelligent Balancer',
        targetModel: 'gemini-2.5-pro',
        targetProvider: 'Google Gemini & Vertex AI',
        reason: 'Default fallback rule for Enterprise Tier high context workloads.',
        estimatedLatencyMs: 460,
        estimatedCostUsd: (simTokenCount / 1000000) * 1.25
      };
    }

    setSimulationResult(matched);
    triggerToast('Routing Evaluated', `Dispatched to ${matched.targetModel} via ${matched.targetProvider}.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black tracking-tight">AI Dynamic Routing Administration</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Configure declarative routing rules, quality vs. cost trade-off functions, and sovereign containment cascades without redeploying code.
          </p>
        </div>

        <button
          onClick={() => {
            triggerToast('Routing Template', 'New routing policy template instantiated.', 'info');
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Routing Policy</span>
        </button>
      </div>

      {/* Grid: Routing Policy Registry + Routing Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Policies list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Routing Policies ({policies.length})</span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Priority Sorted</span>
          </div>

          {policies.map(pol => {
            const isSelected = pol.id === selectedPolicyId;
            return (
              <div
                key={pol.id}
                onClick={() => setSelectedPolicyId(pol.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{pol.name}</h4>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                        PRIORITY {pol.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">{pol.description}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePolicy(pol.id);
                    }}
                    className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      pol.isEnabled ? 'bg-indigo-600 justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Strategy: <strong className="text-neutral-800 dark:text-neutral-200 uppercase font-mono">{pol.strategy.replace('_', ' ')}</strong></span>
                  <span>Requests: <strong className="text-neutral-800 dark:text-neutral-200 font-mono">{pol.appliedRequestCount.toLocaleString()}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Policy Rules Inspector & Interactive Real-Time Simulator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Policy Rules Configuration */}
          {selectedPolicy && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">{selectedPolicy.name}</h3>
                  <span className="text-[11px] text-neutral-500">Strategy: {selectedPolicy.strategy} • Overhead: {selectedPolicy.avgRoutingLatencyMs}ms</span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl">
                  {selectedPolicy.rules.length} Active Rules
                </span>
              </div>

              {/* Rules List */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Evaluation Hierarchy Cascade</span>
                {selectedPolicy.rules.map((rule, idx) => (
                  <div
                    key={rule.id}
                    className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] font-black flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-mono">
                        {idx + 1}
                      </span>
                      <div className="font-mono">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{rule.conditionField}</span>{' '}
                        <span className="text-neutral-400">{rule.operator}</span>{' '}
                        <strong className="text-neutral-900 dark:text-white">"{rule.value}"</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                      <span className="px-2.5 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg font-mono font-bold text-neutral-900 dark:text-white">
                        {rule.targetModelId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fallback rule */}
              <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-neutral-700 dark:text-neutral-300">Deterministic Default Fallback Target:</span>
                </div>
                <span className="font-mono font-bold text-amber-800 dark:text-amber-300">
                  {selectedPolicy.fallbackModelId} ({selectedPolicy.fallbackProviderId})
                </span>
              </div>
            </div>
          )}

          {/* Interactive Routing Simulator */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-neutral-900 dark:text-white">Live Routing Decision Simulator</h3>
            </div>
            <p className="text-xs text-neutral-500">
              Test how live application queries are classified, filtered by sovereign policy, and routed across models.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Task Type</label>
                <select
                  value={simTaskType}
                  onChange={e => setSimTaskType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200"
                >
                  <option value="code_generation">Code Generation</option>
                  <option value="deep_reasoning">Deep Reasoning</option>
                  <option value="general_chat">General Chat</option>
                  <option value="document_qa">Document RAG</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Token Length</label>
                <input
                  type="number"
                  value={simTokenCount}
                  onChange={e => setSimTokenCount(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Tenant Tier</label>
                <select
                  value={simTenantTier}
                  onChange={e => setSimTenantTier(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200"
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="business">Business</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">Privacy Level</label>
                <select
                  value={simPrivacyLevel}
                  onChange={e => setSimPrivacyLevel(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200"
                >
                  <option value="standard">Standard Cloud</option>
                  <option value="sovereign_zero_retention">Sovereign Zero-Retention</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRunSimulator}
              className="w-full py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-xs font-black hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Gateway Routing Execution</span>
            </button>

            {/* Simulation output */}
            {simulationResult && (
              <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-indigo-900 dark:text-indigo-200">Matched: {simulationResult.matchedPolicy}</span>
                  <span className="font-mono text-[11px] text-neutral-500">Latency: {simulationResult.estimatedLatencyMs}ms</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Selected Model</span>
                    <span className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5 block">{simulationResult.targetModel}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Provider Engine</span>
                    <span className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5 block">{simulationResult.targetProvider}</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 italic">
                  Rationale: {simulationResult.reason} (Est. cost: ${simulationResult.estimatedCostUsd.toFixed(5)})
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
