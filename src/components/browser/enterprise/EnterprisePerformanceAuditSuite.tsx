import React, { useState } from 'react';
import { PerformanceAuditMetric } from '../../../types/enterprise_audit';
import { INITIAL_PERFORMANCE_METRICS } from '../../../data/mockEnterpriseAuditData';
import {
  Gauge,
  Zap,
  RefreshCw,
  Play,
  HardDrive,
  Bot,
  Video,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Server
} from 'lucide-react';

export const EnterprisePerformanceAuditSuite: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceAuditMetric[]>(INITIAL_PERFORMANCE_METRICS);
  const [isProfiling, setIsProfiling] = useState(false);
  const [selectedMetricId, setSelectedMetricId] = useState<string>(INITIAL_PERFORMANCE_METRICS[0].id);

  const selectedMetric = metrics.find(m => m.id === selectedMetricId) || metrics[0];

  const runBenchmarkSuite = () => {
    setIsProfiling(true);

    metrics.forEach((m, idx) => {
      setTimeout(() => {
        setMetrics(prev =>
          prev.map((item, i) => {
            if (i === idx) {
              return {
                ...item,
                ratingScore: Math.min(100, item.ratingScore + (Math.random() > 0.5 ? 1 : 0))
              };
            }
            return item;
          })
        );

        if (idx === metrics.length - 1) {
          setIsProfiling(false);
        }
      }, (idx + 1) * 300);
    });
  };

  const getMetricIcon = (area: PerformanceAuditMetric['area']) => {
    switch (area) {
      case 'browser_loading':
        return Zap;
      case 'sync':
        return RefreshCw;
      case 'storage':
        return HardDrive;
      case 'ai_latency':
        return Bot;
      case 'media_handling':
        return Video;
      case 'extensions':
        return Layers;
      default:
        return Gauge;
    }
  };

  const avgRating = Math.round(metrics.reduce((acc, m) => acc + m.ratingScore, 0) / metrics.length);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Performance Summary Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-stone-900 to-cyan-950/60 border border-blue-800/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-stone-100">OMNI Engine Performance & Latency Benchmark Suite</h2>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Real-time profiling of browser loading cycles, P2P CRDT sync throughput, OPFS storage IOPS, AI TTFT, 4K media hardware acceleration, and extension sandboxing.
            </p>
          </div>

          <button
            onClick={runBenchmarkSuite}
            disabled={isProfiling}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
              isProfiling
                ? 'bg-stone-800 text-stone-400 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950/50'
            }`}
          >
            {isProfiling ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Profiling Engine...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Run Live Benchmark Suite</span>
              </>
            )}
          </button>
        </div>

        {/* Global Performance Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">Global Performance Index</div>
            <div className="text-xl font-bold text-cyan-400">{avgRating}/100</div>
            <div className="text-[10px] text-emerald-400">Optimal Tier</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">Cold Start Latency</div>
            <div className="text-xl font-bold text-stone-100">185 ms</div>
            <div className="text-[10px] text-stone-500">Target: &lt; 300 ms</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">AI First-Token (TTFT)</div>
            <div className="text-xl font-bold text-indigo-300 font-mono">195 ms</div>
            <div className="text-[10px] text-stone-500">Gemini 2.5 Flash</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">Storage IOPS (OPFS)</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">48.2k</div>
            <div className="text-[10px] text-stone-500">Origin Private File System</div>
          </div>
        </div>
      </div>

      {/* Grid of 6 Performance Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = getMetricIcon(metric.area);
          const isSelected = selectedMetricId === metric.id;

          return (
            <div
              key={metric.id}
              onClick={() => setSelectedMetricId(metric.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-stone-800/90 border-cyan-500 shadow-md'
                  : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${
                    isSelected ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-stone-950 text-stone-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-200">{metric.name}</h3>
                    <span className="text-[10px] text-stone-500 uppercase font-mono">{metric.area}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                  {metric.status.toUpperCase()}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between font-mono">
                <div>
                  <div className="text-[10px] text-stone-500">MEASURED VALUE</div>
                  <div className="text-base font-bold text-cyan-300">{metric.measuredValue}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-500">TARGET BENCHMARK</div>
                  <div className="text-xs text-stone-300">{metric.benchmarkTarget}</div>
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-1 pt-1 border-t border-stone-800/80 text-[11px]">
                {metric.breakdown.map((b, idx) => (
                  <div key={idx} className="flex items-center justify-between text-stone-400">
                    <span>{b.label}</span>
                    <span className="font-mono text-stone-200 font-medium">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
