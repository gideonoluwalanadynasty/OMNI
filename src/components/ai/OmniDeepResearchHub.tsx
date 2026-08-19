import { useState } from 'react';
import { 
  OMNIState, OmniDeepResearchExecution, OmniDeepResearchStageName 
} from '../../types';
import { 
  Globe, Sparkles, CheckCircle2, AlertCircle, RefreshCw, 
  FileText, Download, Copy, Bookmark, ChevronRight, Layers, 
  ShieldCheck, ExternalLink, Play, Clock, ArrowRight, 
  ListOrdered, GitPullRequest, Search, FileCode, Check
} from 'lucide-react';
import { omniAi } from '../../lib/omniAiSdk';

interface OmniDeepResearchHubProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  onExportToDocuments?: (title: string, content: string) => void;
}

const STAGES: { id: OmniDeepResearchStageName; label: string }[] = [
  { id: 'question_analysis', label: '1. Analysis' },
  { id: 'scope_definition', label: '2. Scope' },
  { id: 'plan_generation', label: '3. Plan' },
  { id: 'source_discovery', label: '4. Discovery' },
  { id: 'source_retrieval', label: '5. Retrieval' },
  { id: 'evidence_extraction', label: '6. Extraction' },
  { id: 'cross_comparison', label: '7. Comparison' },
  { id: 'deductive_analysis', label: '8. Deduction' },
  { id: 'synthesis', label: '9. Synthesis' },
  { id: 'citation_validation', label: '10. Validation' },
  { id: 'final_report', label: '11. Final Report' }
];

export function OmniDeepResearchHub({
  state,
  triggerToast,
  onExportToDocuments
}: OmniDeepResearchHubProps) {
  const [topic, setTopic] = useState('Hardware-attested confidential computing enclaves in sovereign multi-tenant banking infrastructure');
  const [depth, setDepth] = useState<'standard' | 'deep_multi_pass' | 'exhaustive_academic'>('deep_multi_pass');
  const [includeInternalVaults, setIncludeInternalVaults] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStageTab, setActiveStageTab] = useState<'report' | 'plan' | 'sources' | 'evidence' | 'risk_matrix'>('report');
  
  const [executionResult, setExecutionResult] = useState<OmniDeepResearchExecution | null>(null);

  const handleStartResearch = async () => {
    if (!topic.trim()) return;

    setIsExecuting(true);
    try {
      const result = await omniAi.executeDeepResearch({
        topic,
        scopeParameters: {
          depth,
          includeInternalVaults,
          maxSourcesToProbe: depth === 'exhaustive_academic' ? 32 : (depth === 'deep_multi_pass' ? 16 : 8)
        },
        organizationId: state.currentOrgId
      });

      setExecutionResult(result);
      triggerToast('Research Completed', 'Comprehensive empirical report synthesized.', 'success');
    } catch (err: any) {
      triggerToast('Research Failed', err?.message || 'Error executing deep research pipeline', 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header & Launchpad */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                OMNI Deep Research Engine
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Autonomous multi-pass empirical inquiry: Question → Scope → Plan → Source Discovery → Evidence Extraction → Deduction → Report.
            </p>
          </div>

          {/* Depth Mode Selectors */}
          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs">
            {[
              { id: 'standard', label: 'Standard (8 Sources)' },
              { id: 'deep_multi_pass', label: 'Deep Multi-Pass (16 Sources)' },
              { id: 'exhaustive_academic', label: 'Exhaustive (32 Sources)' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDepth(d.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  depth === d.id
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box & Execute */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="State your research hypothesis or technical investigation topic in detail..."
              rows={3}
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-2xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={includeInternalVaults}
                onChange={e => setIncludeInternalVaults(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Include Dynasty Capital Internal Ledger Vaults & Security Attestation Telemetry</span>
            </label>

            <button
              onClick={handleStartResearch}
              disabled={isExecuting || !topic.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-500 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isExecuting ? 'Synthesizing Pipeline...' : 'Initiate Deep Research'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Execution Stepper Visualizer */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {STAGES.map((stg, idx) => {
            const isCompleted = !!executionResult;
            const isCurrent = isExecuting && idx === 5;
            return (
              <div key={stg.id} className="flex-1 flex flex-col items-center text-center space-y-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : (isCurrent ? 'bg-indigo-600 text-white animate-pulse' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400')
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <span className="text-[10px] font-semibold text-neutral-500 whitespace-nowrap">
                  {stg.label.split('. ')[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Results Showcase */}
      {executionResult ? (
        <div className="space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto text-xs">
            {[
              { id: 'report', label: 'Executive Final Report', icon: FileText },
              { id: 'plan', label: 'Research Plan & Hypotheses', icon: ListOrdered },
              { id: 'sources', label: `Discovered Sources (${executionResult.sources.length})`, icon: Globe },
              { id: 'evidence', label: `Evidence Matrix (${executionResult.evidence.length})`, icon: ShieldCheck },
              { id: 'risk_matrix', label: 'Risk & Limitation Matrix', icon: AlertCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeStageTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStageTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: EXECUTIVE FINAL REPORT */}
          {activeStageTab === 'report' && (
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100">
                    Empirical Synthesized Research Report
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Tokens: {executionResult.totalTokensConsumed} • Citations: {executionResult.citationsValidatedCount} • Verified Enclave Attestation
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(executionResult.finalReportMarkdown || '');
                      triggerToast('Copied', 'Full Markdown report copied to clipboard.', 'success');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-bold hover:bg-neutral-200 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </button>
                  <button
                    onClick={() => {
                      onExportToDocuments?.(`Deep Research: ${topic.slice(0, 32)}`, executionResult.finalReportMarkdown || '');
                      triggerToast('Exported', 'Saved to OMNI Documents repository.', 'success');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to Documents</span>
                  </button>
                </div>
              </div>

              {/* Report Body */}
              <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-neutral-800 dark:text-neutral-200">
                {executionResult.finalReportMarkdown}
              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH PLAN */}
          {activeStageTab === 'plan' && (
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Generated Strategic Research Plan
              </h3>
              
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-1">
                <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Core Objective</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">{executionResult.researchPlan.coreObjective}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Sub-Hypotheses Investigated</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {executionResult.researchPlan.subHypotheses.map((hyp, i) => (
                    <div key={i} className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs space-y-1">
                      <span className="font-mono text-[10px] text-indigo-500 font-bold">HYPOTHESIS 0{i + 1}</span>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{hyp}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Investigation Phases</h4>
                <div className="space-y-2">
                  {executionResult.researchPlan.investigationPhases.map((phase, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </div>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{phase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISCOVERED SOURCES */}
          {activeStageTab === 'sources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {executionResult.sources.map((src, i) => (
                <div key={src.id} className="bg-white dark:bg-neutral-900 p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase font-bold">
                        {src.sourceType.replace('_', ' ')}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate mt-1">
                        {src.title}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-400">{src.domain}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {src.reliabilityScore}/100
                      </span>
                      <p className="text-[9px] text-neutral-400">Reliability</p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {src.snippet}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Extracted Key Points</p>
                    {src.extractedKeyPoints.map((pt, pIdx) => (
                      <p key={pIdx} className="text-[11px] text-neutral-700 dark:text-neutral-300 flex items-start gap-1.5">
                        <span className="text-indigo-500">•</span>
                        <span>{pt}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: EVIDENCE MATRIX */}
          {activeStageTab === 'evidence' && (
            <div className="space-y-3">
              {executionResult.evidence.map((evi, i) => (
                <div key={evi.id} className="bg-white dark:bg-neutral-900 p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      EVIDENCE CARD #{i + 1}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-md text-[10px] font-mono font-bold">
                      Confidence: {evi.confidenceScore}%
                    </span>
                  </div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    "{evi.claim}"
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    <strong className="text-neutral-700 dark:text-neutral-300">Methodology Validation:</strong> {evi.methodologyNote}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: RISK & LIMITATION MATRIX */}
          {activeStageTab === 'risk_matrix' && (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Risk Assessment & Invariant Mitigations
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">Identified Risk</th>
                      <th className="py-2.5 px-3">Severity</th>
                      <th className="py-2.5 px-3">Architectural Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {executionResult.riskAndLimitationMatrix?.map((r, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                        <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-neutral-100">{r.risk}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            r.severity === 'high' ? 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                          }`}>
                            {r.severity}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-neutral-600 dark:text-neutral-300">{r.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-neutral-900 p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-3 max-w-md mx-auto">
          <Globe className="w-10 h-10 mx-auto text-indigo-500 opacity-60" />
          <h3 className="text-base font-bold">Deep Research Pipeline Idle</h3>
          <p className="text-xs text-neutral-500">
            Configure your technical or financial topic above and initiate autonomous multi-pass evidence extraction across verified repositories.
          </p>
        </div>
      )}

    </div>
  );
}
