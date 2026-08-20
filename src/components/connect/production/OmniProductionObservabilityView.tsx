import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  Cpu,
  Database,
  Shield,
  CreditCard,
  MessageSquare,
  Sparkles,
  Server,
  Zap,
  TrendingUp,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ObservabilityMetricPoint } from '../../../types/omni_production';
import { SEED_OBSERVABILITY_STREAM } from '../../../data/omni_production_seed';

export const OmniProductionObservabilityView: React.FC = () => {
  const [streamData, setStreamData] = useState<ObservabilityMetricPoint[]>(SEED_OBSERVABILITY_STREAM);
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true);

  // Live polling effect simulation
  useEffect(() => {
    if (!isLiveTelemetry) return;
    const interval = setInterval(() => {
      setStreamData(prev => {
        const last = prev[prev.length - 1];
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newPoint: ObservabilityMetricPoint = {
          timestamp: nextTime,
          messagesPerSec: Math.floor(last.messagesPerSec + (Math.random() * 20000 - 10000)),
          apiRequestsPerSec: Math.floor(last.apiRequestsPerSec + (Math.random() * 30000 - 15000)),
          aiTokensPerSec: Math.floor(last.aiTokensPerSec + (Math.random() * 2000 - 1000)),
          storageIops: Math.floor(last.storageIops + (Math.random() * 5000 - 2500)),
          settlementVolumeUsdPerMin: Math.floor(last.settlementVolumeUsdPerMin + (Math.random() * 15000 - 7500)),
          threatsBlockedPerMin: Math.floor(Math.random() * 500 + 1500),
          averageLatencyMs: Number((Math.random() * 3 + 13.5).toFixed(1)),
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  const current = streamData[streamData.length - 1];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Full-Stack Distributed Telemetry & Observability</h2>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE (3s TICK)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time OpenTelemetry ingestion pipeline monitoring messages, APIs, AI token burning, storage IOPS, and payment escrow throughput.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLiveTelemetry(!isLiveTelemetry)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
              isLiveTelemetry
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Radio className="w-4 h-4" />
            {isLiveTelemetry ? 'Pause Live Telemetry' : 'Resume Telemetry Stream'}
          </button>
        </div>

        {/* Global Live Meters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Current Ingest RPS</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">
              {(current.apiRequestsPerSec / 1000).toFixed(0)}k req/s
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Real-Time Messaging</span>
            <span className="text-xl font-bold text-sky-400 font-mono">
              {(current.messagesPerSec / 1000).toFixed(0)}k msg/s
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">P95 Global Latency</span>
            <span className="text-xl font-bold text-purple-400 font-mono">{current.averageLatencyMs} ms</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Threats Neutralized</span>
            <span className="text-xl font-bold text-rose-400 font-mono">{current.threatsBlockedPerMin}/min</span>
          </div>
        </div>
      </div>

      {/* 6 Grid Metrics Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Real-Time Messages */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              Messaging Subsystem
            </span>
            <span className="text-xs font-mono text-sky-400 font-bold">{current.messagesPerSec.toLocaleString()} msg/s</span>
          </div>
          <div className="h-16 flex items-end gap-1.5 pt-2">
            {streamData.map((d, i) => (
              <div key={i} className="flex-1 bg-slate-950 rounded-t flex flex-col justify-end h-full">
                <div
                  className="bg-sky-500 rounded-t w-full transition-all duration-300"
                  style={{ height: `${(d.messagesPerSec / 600000) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-right">Cluster Health: Nominal</span>
        </div>

        {/* 2. API Gateway */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              API Gateway Ingress
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{current.apiRequestsPerSec.toLocaleString()} RPS</span>
          </div>
          <div className="h-16 flex items-end gap-1.5 pt-2">
            {streamData.map((d, i) => (
              <div key={i} className="flex-1 bg-slate-950 rounded-t flex flex-col justify-end h-full">
                <div
                  className="bg-emerald-500 rounded-t w-full transition-all duration-300"
                  style={{ height: `${(d.apiRequestsPerSec / 800000) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-right">Edge Error Rate: 0.000%</span>
        </div>

        {/* 3. AI Tokens Ingestion */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Tokens Rate
            </span>
            <span className="text-xs font-mono text-purple-400 font-bold">{current.aiTokensPerSec.toLocaleString()} tok/s</span>
          </div>
          <div className="h-16 flex items-end gap-1.5 pt-2">
            {streamData.map((d, i) => (
              <div key={i} className="flex-1 bg-slate-950 rounded-t flex flex-col justify-end h-full">
                <div
                  className="bg-purple-500 rounded-t w-full transition-all duration-300"
                  style={{ height: `${(d.aiTokensPerSec / 35000) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-right">Inference Latency: 220ms</span>
        </div>

        {/* 4. S3 Media & DB Storage IOPS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Storage IOPS
            </span>
            <span className="text-xs font-mono text-amber-400 font-bold">{current.storageIops.toLocaleString()} IOPS</span>
          </div>
          <div className="h-16 flex items-end gap-1.5 pt-2">
            {streamData.map((d, i) => (
              <div key={i} className="flex-1 bg-slate-950 rounded-t flex flex-col justify-end h-full">
                <div
                  className="bg-amber-500 rounded-t w-full transition-all duration-300"
                  style={{ height: `${(d.storageIops / 150000) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-right">NVMe Read IOPS: 99.9% Cache Hit</span>
        </div>

        {/* 5. Payments & Escrow Volume */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Settlement Volume
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ${(current.settlementVolumeUsdPerMin / 1000).toFixed(0)}k/min
            </span>
          </div>
          <div className="h-16 flex items-end gap-1.5 pt-2">
            {streamData.map((d, i) => (
              <div key={i} className="flex-1 bg-slate-950 rounded-t flex flex-col justify-end h-full">
                <div
                  className="bg-emerald-400 rounded-t w-full transition-all duration-300"
                  style={{ height: `${(d.settlementVolumeUsdPerMin / 300000) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-right">Escrow Integrity: 100% Reconciled</span>
        </div>

        {/* 6. Security Threats Mitigated */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              Edge Threat Shield
            </span>
            <span className="text-xs font-mono text-rose-400 font-bold">{current.threatsBlockedPerMin}/min</span>
          </div>
          <div className="h-16 flex items-end gap-1.5 pt-2">
            {streamData.map((d, i) => (
              <div key={i} className="flex-1 bg-slate-950 rounded-t flex flex-col justify-end h-full">
                <div
                  className="bg-rose-500 rounded-t w-full transition-all duration-300"
                  style={{ height: `${(d.threatsBlockedPerMin / 3000) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block text-right">WAF & DDoS Scrubbing Active</span>
        </div>
      </div>
    </div>
  );
};
