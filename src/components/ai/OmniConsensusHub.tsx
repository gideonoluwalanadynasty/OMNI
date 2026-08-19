import { useState } from 'react';
import { OMNIState, OmniConsensusSession } from '../../types';
import { 
  Scale, Sparkles, CheckCircle2, AlertCircle, RefreshCw, 
  Layers, Copy, ChevronDown, ChevronRight, ShieldCheck, 
  HelpCircle, Zap, Cpu, ArrowRight, Eye
} from 'lucide-react';
import { omniAi } from '../../lib/omniAiSdk';

interface OmniConsensusHubProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  onContinueInChat?: (prompt: string) => void;
}

const AVAILABLE_CONSENSUS_MODELS = [
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'DeepMind', defaultSelected: true },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', defaultSelected: true },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', defaultSelected: true },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', defaultSelected: true },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'vLLM Sovereign', defaultSelected: false }
];

export function OmniConsensusHub({
  state,
  triggerToast,
  onContinueInChat
}: OmniConsensusHubProps) {
  const [query, setQuery] = useState('Compare optimistic versus zero-knowledge rollup state transitions for high-frequency financial ledgers.');
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([
    'gemini-2.5-pro', 'gpt-4o', 'claude-3-5-sonnet', 'deepseek-r1'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [consensusResult, setConsensusResult] = useState<OmniConsensusSession | null>(null);
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);

  const toggleModelSelection = (id: string) => {
    setSelectedModelIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 2) {
          triggerToast('Minimum Models', 'At least 2 models are required for consensus arbitration.', 'error');
          return prev;
        }
        return prev.filter(m => m !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleExecuteConsensus = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await omniAi.executeConsensus({
        query,
        participatingModelIds: selectedModelIds,
        organizationId: state.currentOrgId
      });
      setConsensusResult(res);
      triggerToast('Consensus Synthesized', `Arbitration panel evaluated across ${res.participatingModelIds.length} frontier models.`, 'success');
    } catch (err: any) {
      triggerToast('Consensus Failed', err?.message || 'Error executing consensus panel', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header & Configuration */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                OMNI Multi-Model Consensus & Arbitration
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Parallel multi-model execution, automated point-by-point agreement extraction, dispute synthesis, and executive arbitration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-400">Selected Models:</span>
            <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-mono font-bold">
              {selectedModelIds.length} Nodes
            </span>
          </div>
        </div>

        {/* Model Chips Selector */}
        <div className="flex flex-wrap gap-2 pt-1">
          {AVAILABLE_CONSENSUS_MODELS.map(m => {
            const isSelected = selectedModelIds.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleModelSelection(m.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-xs'
                    : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{m.name}</span>
                <span className="text-[10px] opacity-60">({m.provider})</span>
              </button>
            );
          })}
        </div>

        {/* Query Input */}
        <div className="space-y-3 pt-2">
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Pose a complex architectural, legal, or financial dispute for multi-model panel evaluation..."
            rows={2}
            className="w-full p-4 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-2xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed font-medium"
          />

          <div className="flex items-center justify-between">
            <p className="text-[11px] text-neutral-400">
              Parallel execution dispatches concurrently across independent provider adapters.
            </p>
            <button
              onClick={handleExecuteConsensus}
              disabled={isLoading || !query.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-500 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
              <span>{isLoading ? 'Arbitrating Across Models...' : 'Execute Consensus Panel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Consensus Showcase */}
      {consensusResult ? (
        <div className="space-y-6">
          
          {/* Epistemological Disclaimer Banner */}
          <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-3xl border border-amber-200 dark:border-amber-800/60 flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 space-y-0.5">
              <p className="font-bold">Epistemological & Empirical Integrity Notice</p>
              <p className="text-amber-800/90 dark:text-amber-300/80 text-[11px] leading-relaxed">
                High consensus score across independent large language models indicates strong statistical alignment in training distributions, but does not constitute formal mathematical proof or infallible empirical ground truth. Critical ledger changes should be validated with formal verification tools.
              </p>
            </div>
          </div>

          {/* Synthesized Arbitration Card */}
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-mono font-bold uppercase border border-indigo-200 dark:border-indigo-800">
                  Consensus Score: {consensusResult.consensusScorePercentage}% Harmony
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                  Synthesized Executive Arbitration
                </h3>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(consensusResult.synthesizedArbitration);
                  triggerToast('Copied', 'Arbitration synthesis copied.', 'success');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-bold hover:bg-neutral-200 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-neutral-800 dark:text-neutral-200">
              {consensusResult.synthesizedArbitration}
            </div>
          </div>

          {/* Points of Agreement vs Points of Disagreement Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Agreement Cards */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Points of High-Confidence Agreement
                </h3>
              </div>

              <div className="space-y-3">
                {consensusResult.areasOfAgreement.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.point}</p>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-black/40 px-2 py-0.5 rounded-md">
                        {item.confidenceScore}% Unanimous
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.supportingModelIds.map(mId => (
                        <span key={mId} className="px-2 py-0.5 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 text-[10px] font-mono rounded-md border border-neutral-200 dark:border-neutral-700">
                          {mId}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disagreement Cards */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Areas of Disagreement & Methodological Splits
                </h3>
              </div>

              <div className="space-y-3">
                {consensusResult.areasOfDisagreement.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-2"
                  >
                    <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.topic}</p>
                    <div className="space-y-1.5 pt-1">
                      {item.divergenceDetails.map((div, dIdx) => (
                        <div key={dIdx} className="text-[11px] p-2 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-0.5">
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{div.modelId}:</span>
                          <p className="text-neutral-700 dark:text-neutral-300">{div.stance}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Epistemic Nuances */}
          {consensusResult.uncertaintyAndNuances && consensusResult.uncertaintyAndNuances.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>Identified Nuances & Open Empirical Questions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {consensusResult.uncertaintyAndNuances.map((nuance, idx) => (
                  <div key={idx} className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300">
                    • {nuance}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Side-by-Side Model Responses Accordion */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Independent Model Outputs & Telemetry ({consensusResult.participatingModels.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consensusResult.participatingModels.map(m => {
                const isExpanded = expandedModelId === m.modelId;
                return (
                  <div
                    key={m.modelId}
                    className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{m.modelId}</p>
                        <p className="text-[10px] font-mono text-neutral-400">
                          {m.provider} • {m.latencyMs}ms • ${(m.costUsd || 0).toFixed(5)}
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedModelId(isExpanded ? null : m.modelId)}
                        className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 cursor-pointer"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className={`text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans ${isExpanded ? '' : 'line-clamp-4'}`}>
                      {m.responseSnippet}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-neutral-900 p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-3 max-w-md mx-auto">
          <Scale className="w-10 h-10 mx-auto text-indigo-500 opacity-60" />
          <h3 className="text-base font-bold">Consensus Chamber Idle</h3>
          <p className="text-xs text-neutral-500">
            Select 2 or more foundation models above to arbitrate viewpoints, measure semantic agreement, and resolve disputes.
          </p>
        </div>
      )}

    </div>
  );
}
