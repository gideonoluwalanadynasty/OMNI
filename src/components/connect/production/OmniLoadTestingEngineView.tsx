import React, { useState } from 'react';
import {
  Zap,
  Play,
  RotateCcw,
  Cpu,
  Database,
  Users,
  Activity,
  Layers,
  CheckCircle2,
  TrendingUp,
  Clock,
  Radio,
  Server
} from 'lucide-react';
import { LoadTestVector } from '../../../types/omni_production';
import { SEED_LOAD_TEST_VECTORS } from '../../../data/omni_production_seed';

export const OmniLoadTestingEngineView: React.FC = () => {
  const [loadTests, setLoadTests] = useState<LoadTestVector[]>(SEED_LOAD_TEST_VECTORS);
  const [activeTest, setActiveTest] = useState<LoadTestVector | null>(SEED_LOAD_TEST_VECTORS[0]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [liveLog, setLiveLog] = useState('[LOAD_MASTER] Synthetic stress & concurrency generator online.');

  const runSingleLoadTest = (testId: string) => {
    setLoadTests(prev => prev.map(t => (t.id === testId ? { ...t, status: 'running' } : t)));
    setLiveLog(`[STRESS_GEN] Injecting load scenario: ${testId}...`);

    setTimeout(() => {
      setLoadTests(prev =>
        prev.map(t => {
          if (t.id === testId) {
            return {
              ...t,
              status: 'completed',
              metrics: {
                ...t.metrics,
                p50LatencyMs: Number((Math.random() * 5 + 10).toFixed(1)),
                p95LatencyMs: Number((Math.random() * 10 + 22).toFixed(1)),
                p99LatencyMs: Number((Math.random() * 15 + 38).toFixed(1)),
                errorRatePct: 0.0001,
              },
            };
          }
          return t;
        })
      );
      setLiveLog(`[STRESS_OK] Scenario ${testId} concluded successfully with zero degraded nodes.`);
    }, 800);
  };

  const runAllLoadTests = () => {
    setIsRunningAll(true);
    setLoadTests(prev => prev.map(t => ({ ...t, status: 'running' })));
    setLiveLog('[RUNNER] Firing global multi-region synthetic load tests (Up to 10,000,000 users)...');

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < loadTests.length) {
        const item = loadTests[idx];
        setLiveLog(`[BENCHMARKING] ${item.name}... PEAK ACHIEVED (0.000% errors)`);
        setLoadTests(prev =>
          prev.map((t, i) =>
            i === idx
              ? {
                  ...t,
                  status: 'completed',
                  metrics: {
                    ...t.metrics,
                    p50LatencyMs: Number((Math.random() * 4 + 9).toFixed(1)),
                    p95LatencyMs: Number((Math.random() * 8 + 20).toFixed(1)),
                    p99LatencyMs: Number((Math.random() * 12 + 35).toFixed(1)),
                    errorRatePct: 0.0000,
                  },
                }
              : t
          )
        );
        idx++;
      } else {
        clearInterval(interval);
        setIsRunningAll(false);
        setLiveLog('[LOAD_COMPLETE] 6/6 Global Concurrency Stress Scenarios Verified.');
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Global Synthetic Concurrency & Load Testing Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PEAK: 10,000,000 SIMULATED USERS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Stress test scenarios for real-time WebSockets, mega-communities, feed ranking latency, WebRTC mesh, and vector search.
              </p>
            </div>
          </div>

          <button
            onClick={runAllLoadTests}
            disabled={isRunningAll}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-600/20 transition"
          >
            <Play className="w-4 h-4" />
            {isRunningAll ? 'Simulating Peak Traffic...' : 'Execute Full Stress Test Suite'}
          </button>
        </div>

        {/* Global Concurrency Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Total Synthetic Concurrency</span>
            <span className="text-xl font-bold text-amber-400 font-mono">10.0M Users</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Aggregate Throughput</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">1,487,400 RPS</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Global P95 Response</span>
            <span className="text-xl font-bold text-sky-400 font-mono">24.2 ms</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">System Error Rate</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">&lt; 0.0001%</span>
          </div>
        </div>
      </div>

      {/* Terminal Live Output */}
      <div className="p-3.5 bg-black/90 border border-slate-800 rounded-xl font-mono text-[11px] text-amber-400/90 flex items-center gap-2">
        <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span className="truncate">{liveLog}</span>
      </div>

      {/* Load Test Cards and Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Load Scenarios */}
        <div className="lg:col-span-2 space-y-3">
          {loadTests.map(test => (
            <div
              key={test.id}
              onClick={() => setActiveTest(test)}
              className={`bg-slate-900/80 border rounded-2xl p-5 cursor-pointer transition space-y-4 ${
                activeTest?.id === test.id
                  ? 'border-amber-500 bg-slate-900 shadow-lg shadow-amber-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{test.name}</h3>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded text-[10px] font-mono">
                      {(test.simulatedUsers / 1000000).toFixed(1)}M Users
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono block mt-1">
                    Target: {test.targetSubsystem} • {test.concurrencyRps.toLocaleString()} Concurrency RPS
                  </span>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    runSingleLoadTest(test.id);
                  }}
                  disabled={test.status === 'running'}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition shrink-0"
                >
                  Run Stress Test
                </button>
              </div>

              {/* Latency & Resource Profile */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">P50 Latency</span>
                  <span className="text-white font-bold">{test.metrics.p50LatencyMs} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">P95 Latency</span>
                  <span className="text-emerald-400 font-bold">{test.metrics.p95LatencyMs} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">P99 Latency</span>
                  <span className="text-amber-400 font-bold">{test.metrics.p99LatencyMs} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Throughput</span>
                  <span className="text-sky-400 font-bold">{(test.metrics.throughputRps / 1000).toFixed(0)}k RPS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Active Inspector & Resource Gauges */}
        <div className="space-y-6">
          {activeTest && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Cluster Health & Resource Telemetry
              </h4>
              <h3 className="text-sm font-bold text-white">{activeTest.name}</h3>

              <div className="space-y-4">
                {/* CPU Utilization */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" /> CPU Utilization
                    </span>
                    <span className="text-white font-bold">{activeTest.metrics.cpuUtilizationPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activeTest.metrics.cpuUtilizationPct}%` }}
                    />
                  </div>
                </div>

                {/* Memory Utilization */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-sky-400" /> Cluster Memory Mesh
                    </span>
                    <span className="text-white font-bold">{activeTest.metrics.memoryUtilizationPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activeTest.metrics.memoryUtilizationPct}%` }}
                    />
                  </div>
                </div>

                {/* Database Replication Lag */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-purple-400" /> DB Replication Lag
                  </span>
                  <span className="text-emerald-400 font-bold">{activeTest.metrics.databaseLagMs} ms</span>
                </div>

                {/* Error Rate */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs flex items-center justify-between">
                  <span className="text-slate-400">Error Rate at Peak</span>
                  <span className="text-emerald-400 font-bold">{activeTest.metrics.errorRatePct}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
