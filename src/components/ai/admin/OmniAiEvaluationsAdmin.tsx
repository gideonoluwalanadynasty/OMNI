import React, { useState } from 'react';
import {
  CheckCircle2, Play, RefreshCw, BarChart2, ShieldCheck, Database,
  TrendingUp, Award, Layers, Clock, DollarSign, Activity, FileText, Cpu
} from 'lucide-react';
import { OmniAiEvaluationDataset, OmniAiEvaluationRun } from '../../../types';
import { INITIAL_EVALUATION_DATASETS, INITIAL_EVALUATION_RUNS } from '../../../ai_admin_data';

interface Props {
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OmniAiEvaluationsAdmin({ triggerToast }: Props) {
  const [datasets, setDatasets] = useState<OmniAiEvaluationDataset[]>(INITIAL_EVALUATION_DATASETS);
  const [runs, setRuns] = useState<OmniAiEvaluationRun[]>(INITIAL_EVALUATION_RUNS);
  const [selectedRunId, setSelectedRunId] = useState<string>(runs[0]?.id || '');
  const [isRunningEvaluation, setIsRunningEvaluation] = useState(false);
  const [evalProgress, setEvalProgress] = useState(0);

  const selectedRun = runs.find(r => r.id === selectedRunId) || runs[0];

  const handleLaunchEvaluation = () => {
    setIsRunningEvaluation(true);
    setEvalProgress(10);
    triggerToast('Evaluation Suite Dispatched', 'Running 500 controlled golden-truth prompts across models...', 'info');

    const interval = setInterval(() => {
      setEvalProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRunningEvaluation(false);
            const newRun: OmniAiEvaluationRun = {
              id: `eval_run_new_${Date.now()}`,
              datasetId: 'dataset_frontier_safety_500',
              datasetName: 'OMNI Red-Team & Safety Benchmark (v3)',
              modelId: 'gemini-2.5-pro',
              providerId: 'prov_google_vertex',
              taskSuccessRate: 99.6,
              factualityScore: 99.1,
              citationQualityScore: 99.4,
              p95LatencyMs: 395,
              avgCostPerQueryUsd: 0.0031,
              userPreferenceWinRate: 95.0,
              toolSuccessRate: 99.2,
              safetyPassRate: 100.0,
              routingPerformanceScore: 98.4,
              sampleCount: 500,
              testDate: new Date().toISOString(),
              status: 'completed',
              evaluatedBy: 'Automated CI/CD Evaluator',
              notes: 'Regression test completed with 0 safety failures and sub-400ms latency.'
            };
            setRuns(r => [newRun, ...r]);
            setSelectedRunId(newRun.id);
            triggerToast('Evaluation Complete', 'Automated regression run succeeded with 100% safety pass rate.', 'success');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black tracking-tight">AI Evaluation & Benchmark Control Plane</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Systematically measure model accuracy across 9 critical vectors: Task Success, Factuality, Citation Quality, Latency, Unit Cost, Human Preference, Tool Integrity, Safety, and Routing.
          </p>
        </div>

        <button
          onClick={handleLaunchEvaluation}
          disabled={isRunningEvaluation}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isRunningEvaluation ? `Evaluating (${evalProgress}%)...` : 'Run Golden Benchmark'}</span>
        </button>
      </div>

      {/* Evaluation Datasets Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {datasets.map(ds => (
          <div key={ds.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-300">
                {ds.domain}
              </span>
              <span className="text-xs font-mono font-black text-neutral-900 dark:text-white">{ds.sampleCount} Prompts</span>
            </div>
            <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{ds.name}</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2">{ds.description}</p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-3 h-3" /> Golden Verified
              </span>
              <span>Updated {ds.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Evaluation Runs List + Detailed Multi-Dimensional Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Runs list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-neutral-500">Evaluation Runs ({runs.length})</span>
            <span className="text-[10px] text-indigo-600 font-bold">CI/CD Automated</span>
          </div>

          {runs.map(r => {
            const isSelected = r.id === selectedRunId;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRunId(r.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{r.modelId}</h4>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{r.datasetName}</span>
                  </div>
                  <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {r.taskSuccessRate}% Win
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>P95: <strong className="text-neutral-800 dark:text-neutral-200 font-mono">{r.p95LatencyMs}ms</strong></span>
                  <span>Safety: <strong className="text-emerald-600 font-mono">{r.safetyPassRate}%</strong></span>
                  <span>Cost: <strong className="text-neutral-800 dark:text-neutral-200 font-mono">${r.avgCostPerQueryUsd}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Multi-Dimensional Evaluation Visualizer */}
        <div className="lg:col-span-2 space-y-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          {selectedRun && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-neutral-900 dark:text-white">{selectedRun.modelId} Benchmark Report</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded font-bold">
                      {selectedRun.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Evaluated on {new Date(selectedRun.testDate).toLocaleDateString()} • {selectedRun.sampleCount} test samples • {selectedRun.evaluatedBy}
                  </p>
                </div>
              </div>

              {/* 9 Core Dimensions Grid */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">9-Vector Evaluation Radar</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Task Success Rate', value: `${selectedRun.taskSuccessRate}%`, score: selectedRun.taskSuccessRate, color: 'text-indigo-600 dark:text-indigo-400' },
                    { label: 'Factuality & Truth', value: `${selectedRun.factualityScore}%`, score: selectedRun.factualityScore, color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Citation Quality', value: `${selectedRun.citationQualityScore}%`, score: selectedRun.citationQualityScore, color: 'text-teal-600 dark:text-teal-400' },
                    { label: 'P95 Latency', value: `${selectedRun.p95LatencyMs}ms`, score: Math.max(0, 100 - (selectedRun.p95LatencyMs / 15)), color: 'text-neutral-900 dark:text-white' },
                    { label: 'Unit Query Cost', value: `$${selectedRun.avgCostPerQueryUsd}`, score: Math.max(0, 100 - (selectedRun.avgCostPerQueryUsd * 2000)), color: 'text-neutral-900 dark:text-white' },
                    { label: 'Human Preference', value: `${selectedRun.userPreferenceWinRate}%`, score: selectedRun.userPreferenceWinRate, color: 'text-indigo-600 dark:text-indigo-400' },
                    { label: 'Tool Success Rate', value: `${selectedRun.toolSuccessRate}%`, score: selectedRun.toolSuccessRate, color: 'text-emerald-600 dark:text-emerald-400' },
                    { label: 'Safety Pass Rate', value: `${selectedRun.safetyPassRate}%`, score: selectedRun.safetyPassRate, color: 'text-rose-600 dark:text-rose-400' },
                    { label: 'Routing Performance', value: `${selectedRun.routingPerformanceScore}%`, score: selectedRun.routingPerformanceScore, color: 'text-cyan-600 dark:text-cyan-400' },
                  ].map((dim, idx) => (
                    <div key={idx} className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-neutral-500">{dim.label}</span>
                        <span className={`text-xs font-black font-mono ${dim.color}`}>{dim.value}</span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(0, dim.score))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluator Notes */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase">Automated Auditor Assessment</span>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedRun.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
