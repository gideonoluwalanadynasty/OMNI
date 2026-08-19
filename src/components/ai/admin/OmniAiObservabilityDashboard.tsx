import React, { useState } from 'react';
import {
  Activity, Zap, Clock, DollarSign, AlertCircle, Layers, Server,
  Cpu, ArrowRight, ShieldCheck, Database, Sliders, RefreshCw, Search
} from 'lucide-react';
import { OmniDistributedTraceEntry } from '../../../types';
import { INITIAL_DISTRIBUTED_TRACES } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OmniAiObservabilityDashboard({ triggerToast }: Props) {
  const [traces, setTraces] = useState<OmniDistributedTraceEntry[]>(INITIAL_DISTRIBUTED_TRACES);
  const [selectedTraceId, setSelectedTraceId] = useState<string>(traces[0]?.traceId || '');
  const [filterApp, setFilterApp] = useState<string>('ALL');

  const selectedTrace = traces.find(t => t.traceId === selectedTraceId) || traces[0];

  const filteredTraces = filterApp === 'ALL'
    ? traces
    : traces.filter(t => t.appOrigin === filterApp);

  const handleRefresh = () => {
    triggerToast('Traces Synchronized', 'Telemetry flushed from AI Gateway ingress buffer.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black tracking-tight">AI Observability &amp; Distributed Tracing Control Plane</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time telemetry across requests, tokens, cost, latency, queue depths, rate limits, and end-to-end correlation spans (OMNI App → Gateway → Tool → Billing).
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Traces</span>
        </button>
      </div>

      {/* Real-time High-Density Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Invocations', value: '412,890', sub: '+14% vs yesterday', color: 'text-neutral-900 dark:text-white' },
          { label: 'Token Volume', value: '1.48B', sub: 'Input: 72% / Out: 28%', color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'P95 Latency', value: '382ms', sub: 'Gateway overhead: 12ms', color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Total AI Spend', value: '$842.19', sub: 'Margin: 42.1%', color: 'text-neutral-900 dark:text-white' },
          { label: 'Active Rate Limits', value: '2 Tenants', sub: 'Soft-alerting', color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Gateway Queue', value: '0 items', sub: '0ms wait depth', color: 'text-teal-600 dark:text-teal-400' },
        ].map((m, idx) => (
          <div key={idx} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold uppercase block">{m.label}</span>
            <span className={`text-base font-black font-mono block ${m.color}`}>{m.value}</span>
            <span className="text-[10px] text-neutral-500 block truncate">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Grid: Live Traces List + Deep Correlation Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Trace Span List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Live Traces ({filteredTraces.length})</span>
            <select
              value={filterApp}
              onChange={e => setFilterApp(e.target.value)}
              className="text-[10px] font-bold px-2 py-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
            >
              <option value="ALL">All Applications</option>
              <option value="OMNI_DEEP_RESEARCH">Deep Research</option>
              <option value="OMNI_CODE">Code Architect</option>
              <option value="OMNI_SYNTHESIS">Synthesis Engine</option>
              <option value="OMNI_CHAT">Chat Hub</option>
            </select>
          </div>

          {filteredTraces.map(t => {
            const isSelected = t.traceId === selectedTraceId;
            return (
              <div
                key={t.traceId}
                onClick={() => setSelectedTraceId(t.traceId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {t.appOrigin.replace('OMNI_', '')}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${
                        t.statusCode === 200 ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {t.statusCode}
                      </span>
                    </div>
                    <span className="text-xs font-black font-mono text-neutral-900 dark:text-white mt-1 block">
                      {t.modelName}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-neutral-500">
                    {t.totalDurationMs}ms
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Tokens: <strong className="text-neutral-800 dark:text-neutral-200 font-mono">{t.totalTokens}</strong></span>
                  <span>Cost: <strong className="text-neutral-800 dark:text-neutral-200 font-mono">${t.providerCostUsd.toFixed(4)}</strong></span>
                  <span>Units: <strong className="text-indigo-600 font-mono">{t.billingOcuCharged} OCU</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: End-to-End Correlation Path Inspector */}
        <div className="lg:col-span-2 space-y-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          {selectedTrace && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-neutral-900 dark:text-white">Trace Span Inspector</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">
                      {selectedTrace.traceId}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 mt-1 block truncate">
                    Correlation: {selectedTrace.correlationId}
                  </span>
                </div>

                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl ${
                  selectedTrace.securityInspectionResult === 'pass'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                }`}>
                  Inspection: {selectedTrace.securityInspectionResult.toUpperCase()}
                </span>
              </div>

              {/* End-to-End Visual Correlation Journey */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">End-to-End Request Journey</span>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="text-center p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-1">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block">1. Origin</span>
                    <strong className="text-neutral-900 dark:text-white font-mono">{selectedTrace.appOrigin}</strong>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 hidden md:block" />

                  <div className="text-center p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-1">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block">2. AI Gateway</span>
                    <strong className="text-neutral-900 dark:text-white font-mono">{selectedTrace.gatewayDurationMs}ms</strong>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 hidden md:block" />

                  <div className="text-center p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-1">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block">3. Model Engine</span>
                    <strong className="text-neutral-900 dark:text-white font-mono">{selectedTrace.modelName}</strong>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 hidden md:block" />

                  <div className="text-center p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-1">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block">4. Ledger Billing</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 font-mono">+{selectedTrace.billingOcuCharged} OCU</strong>
                  </div>
                </div>
              </div>

              {/* Tools Executed and Tokens Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Tools Invoked ({selectedTrace.toolCallsCount})</span>
                  {selectedTrace.toolsUsed.length === 0 ? (
                    <span className="text-xs text-neutral-500 italic">No tool calls executed in this span.</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTrace.toolsUsed.map(tool => (
                        <span key={tool} className="text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded font-bold">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Token Accounting</span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[9px] text-neutral-400 block">PROMPT</span>
                      <strong className="font-mono">{selectedTrace.promptTokens}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block">COMPLETION</span>
                      <strong className="font-mono">{selectedTrace.completionTokens}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block">TOTAL</span>
                      <strong className="font-mono text-indigo-600">{selectedTrace.totalTokens}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
