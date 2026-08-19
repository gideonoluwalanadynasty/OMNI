import { useState } from 'react';
import { 
  OmniCrossAppExecutionPipeline, OMNIState 
} from '../../../types';
import { 
  Sparkles, Layers, ArrowRight, Play, RefreshCw, CheckCircle2, 
  AlertCircle, ShieldCheck, Zap, Database, Clock, Cpu, 
  Send, BarChart3, Palette, Truck, BookOpen, ShoppingBag, 
  FileText, ExternalLink, Check, ChevronRight, HelpCircle
} from 'lucide-react';

interface OmniCrossAppCommandExecutorProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  dispatchDomainEvent: (topic: any, payload: any) => void;
}

const PRESET_CROSS_APP_COMMANDS = [
  {
    type: 'sales_marketing',
    title: "Analyse sales & create marketing recommendation",
    prompt: "Analyse this month's sales and create a marketing recommendation.",
    icon: BarChart3,
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    apps: ['OMNI CRM', 'OMNI Financial Ledger', 'OMNI Marketing Engine'],
    desc: 'Extracts deal velocity, revenue cohorts, and outputs targeted multi-channel campaign strategies.'
  },
  {
    type: 'logistics_report',
    title: "Logistics report from shipment telemetry",
    prompt: "Prepare a logistics report from authorised shipment data.",
    icon: Truck,
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    apps: ['OMNI Logistics Hub', 'OMNI Telematics Service', 'OMNI Documents'],
    desc: 'Audits carrier SLAs, international clearance bottlenecks, and dynamic rerouting suggestions.'
  },
  {
    type: 'training_course',
    title: "Synthesize course from governance vaults",
    prompt: "Create a new training course from these documents.",
    icon: BookOpen,
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    apps: ['OMNI Knowledge Hub', 'OMNI Learning Academy'],
    desc: 'Transforms raw corporate bylaws and Spanner v4 specs into interactive 4-module courses with quizzes.'
  },
  {
    type: 'catalogue_campaign',
    title: "Omni-channel campaign for catalogue SKUs",
    prompt: "Draft a campaign for products in my catalogue.",
    icon: ShoppingBag,
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
    apps: ['OMNI Commerce Engine', 'OMNI Content Studio', 'OMNI Marketing Engine'],
    desc: 'Scrapes high-margin tier SKUs and creates launch copy, targeted personas, and discount matrices.'
  }
];

export function OmniCrossAppCommandExecutor({ state, triggerToast, dispatchDomainEvent }: OmniCrossAppCommandExecutorProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<OmniCrossAppExecutionPipeline | null>(null);

  // Execute Cross-App Pipeline
  const handleExecutePipeline = async (type?: string, overrideText?: string) => {
    const textToRun = overrideText || customPrompt;
    if (!type && !textToRun.trim()) return;

    setIsExecuting(true);
    try {
      const res = await fetch('/api/v1/ai/cross-app/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commandType: type,
          customPrompt: textToRun
        })
      });
      const data = await res.json();
      if (data.status === 'success' && data.pipeline) {
        setPipelineResult(data.pipeline);
        triggerToast('Cross-App Pipeline Completed', `Synthesized across ${data.pipeline.targetApps.length} OMNI apps in ${data.pipeline.telemetry.executionTimeMs}ms.`, 'success');
        dispatchDomainEvent('ai.cross_app.pipeline.completed', {
          pipelineId: data.pipeline.id,
          stepCount: data.pipeline.steps.length,
          appsUsed: data.pipeline.targetApps.map((a: any) => a.appName)
        });
      } else {
        triggerToast('Pipeline Failed', data.error || 'Could not execute cross-app synthesis.', 'error');
      }
    } catch (e: any) {
      triggerToast('Execution Error', e.message || 'Network error.', 'error');
    } finally {
      setIsExecuting(false);
      setCustomPrompt('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-indigo-950 to-neutral-900 text-white rounded-3xl p-6 lg:p-8 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Cross-OMNI Synthesis Engine
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Source Permission Gateways Active
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Cross-Application Command Engine</span>
            </h2>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              Execute complex, multi-application synthesis tasks across the entire OMNI ecosystem. Queries live registered application tools when available, respects cryptographic tenant data boundaries, and provides graceful capability states.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Multi-App Mesh</p>
                <p className="text-sm font-black text-white">8 Registered Apps</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Multi-App Workflows */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Canonical Cross-Application Workflows</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESET_CROSS_APP_COMMANDS.map(cmd => {
            const Icon = cmd.icon;
            return (
              <div
                key={cmd.type}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl border ${cmd.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">
                          {cmd.title}
                        </h4>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          “{cmd.prompt}”
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {cmd.desc}
                  </p>

                  {/* Connected Apps Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Target Ecosystem Apps:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cmd.apps.map((app, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">Autonomous Level 2</span>
                  <button
                    disabled={isExecuting}
                    onClick={() => handleExecutePipeline(cmd.type, cmd.prompt)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run Multi-App Pipeline</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Synthesis Prompt Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">
            Custom Multi-Application Prompt
          </h4>
        </div>
        <p className="text-xs text-neutral-500">
          Enter any composite instruction combining CRM data, logistics telemetry, knowledge vaults, and marketing generators.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleExecutePipeline(undefined, customPrompt); }}
            placeholder="e.g. Compare Q3 sales by region with logistics delivery SLAs and draft executive summary..."
            className="flex-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            disabled={isExecuting || !customPrompt.trim()}
            onClick={() => handleExecutePipeline(undefined, customPrompt)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Execute Synthesis</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading Animation */}
      {isExecuting && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 text-center space-y-3 shadow-xs">
          <RefreshCw className="w-7 h-7 text-indigo-600 animate-spin mx-auto" />
          <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">
            Orchestrating Cross-App Pipeline...
          </h4>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Extracting data payloads from registered tools, validating security scopes, and feeding intermediate vectors to synthesis models.
          </p>
        </div>
      )}

      {/* Pipeline Execution Results Canvas */}
      {pipelineResult && !isExecuting && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xs">
          {/* Header & Meta */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Pipeline Completed
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  ID: {pipelineResult.id}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                {pipelineResult.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {pipelineResult.telemetry.executionTimeMs}ms</span>
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-neutral-400" /> ${pipelineResult.telemetry.costUsd.toFixed(4)} USD</span>
            </div>
          </div>

          {/* Target App Availability Matrix (Shows Graceful Capability States) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Target Ecosystem Applications & Scopes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pipelineResult.targetApps.map(app => (
                <div key={app.appId} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 dark:text-white">{app.appName}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                      app.isAvailable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {app.isAvailable ? 'Native App Tool' : 'Fallback State'}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-400">Required: {app.requiredScope}</p>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-300">{app.dataExtractedSummary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sequential Execution Pipeline Steps */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Execution Steps Log</h4>
            <div className="space-y-2.5">
              {pipelineResult.steps.map(step => (
                <div 
                  key={step.stepNumber}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-neutral-900 dark:text-white">{step.title}</p>
                      <span className="font-mono text-[10px] text-neutral-400">{step.toolId}</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-[11px]">{step.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesized Output Result (Markdown) */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Synthesized Output Deliverable</h4>
            <div className="p-5 rounded-2xl bg-neutral-50/60 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed">
              <div className="whitespace-pre-wrap font-sans text-neutral-800 dark:text-neutral-200">
                {pipelineResult.synthesizedOutput}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations with one-click dispatches */}
          {pipelineResult.actionableRecommendations && (
            <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Actionable Recommendations</h4>
              <div className="space-y-2">
                {pipelineResult.actionableRecommendations.map((rec, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs">
                    <span className="text-neutral-800 dark:text-neutral-200">{rec}</span>
                    <button
                      onClick={() => triggerToast('Action Dispatched', `Approved and queued "${rec}" for execution.`, 'success')}
                      className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 rounded-lg font-bold text-[11px] cursor-pointer"
                    >
                      Approve Action
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
