import React, { useState } from 'react';
import {
  Server,
  Cloud,
  Database,
  Activity,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Zap,
  Globe,
  Radio,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { ScalingSubsystemNode, DisasterRecoveryDrill } from '../../../types/omni_production';
import { SEED_SCALING_NODES, SEED_DISASTER_RECOVERY_DRILLS } from '../../../data/omni_production_seed';

export const OmniScalingAndDisasterRecoveryView: React.FC = () => {
  const [nodes, setNodes] = useState<ScalingSubsystemNode[]>(SEED_SCALING_NODES);
  const [drDrills, setDrDrills] = useState<DisasterRecoveryDrill[]>(SEED_DISASTER_RECOVERY_DRILLS);
  const [activeTab, setActiveTab] = useState<'subsystems' | 'drills'>('subsystems');
  const [activeDrillRunning, setActiveDrillRunning] = useState<string | null>(null);
  const [liveDrillLog, setLiveDrillLog] = useState('[DR_ENGINE] Active-Active multi-region topology synchronized.');

  const triggerDrill = (drillId: string) => {
    setActiveDrillRunning(drillId);
    setLiveDrillLog(`[FAILOVER_TEST] Initiating disaster recovery drill: ${drillId}...`);

    setTimeout(() => {
      setDrDrills(prev =>
        prev.map(d => (d.id === drillId ? { ...d, status: 'passed', lastDrillDate: new Date().toISOString().split('T')[0] } : d))
      );
      setActiveDrillRunning(null);
      setLiveDrillLog(`[RECOVERY_SUCCESS] Drill ${drillId} completed. Achieved RTO: 1.4m, RPO: 0.0m.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Global Cloud Infrastructure & Disaster Recovery</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  RPO: 0 MIN • RTO: &lt; 2 MIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Anycast CDN Edge (285 PoPs), Redis Cluster mesh, distributed sharded Postgres, Kafka event streaming, and automated cross-region failover.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('subsystems')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'subsystems' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Scaling Subsystems ({nodes.length})
            </button>
            <button
              onClick={() => setActiveTab('drills')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'drills' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              DR Failover Drills ({drDrills.length})
            </button>
          </div>
        </div>

        {/* Global Topology Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Global Edge Nodes</span>
            <span className="text-xl font-bold text-sky-400 font-mono">1,420 Nodes</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Replication Topology</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">Multi-Master Sync</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Kafka Event Bus</span>
            <span className="text-xl font-bold text-purple-400 font-mono">2.1M Ev/sec</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Backup Retention</span>
            <span className="text-xl font-bold text-amber-400 font-mono">Continuous WAL</span>
          </div>
        </div>
      </div>

      {/* Live Log */}
      <div className="p-3.5 bg-black/90 border border-slate-800 rounded-xl font-mono text-[11px] text-sky-400/90 flex items-center gap-2">
        <Server className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span className="truncate">{liveDrillLog}</span>
      </div>

      {/* 1. SUBSYSTEMS TAB */}
      {activeTab === 'subsystems' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map(node => (
            <div
              key={node.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{node.name}</h3>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-mono font-bold uppercase">
                    {node.health}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono space-y-1">
                  <div>Active Nodes: <span className="text-white font-bold">{node.activeNodes}</span> across {node.clusterCount} clusters</div>
                  <div>Throughput: <span className="text-sky-300 font-bold">{node.trafficThroughput}</span></div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Capacity Load</span>
                  <span className="text-white font-bold">{node.capacityUtilizationPct}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
                    style={{ width: `${node.capacityUtilizationPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Auto-Scale Min: {node.autoScalingGroup.min}</span>
                  <span>Max: {node.autoScalingGroup.max}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. DISASTER RECOVERY DRILLS TAB */}
      {activeTab === 'drills' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                Chaos Engineering & Disaster Recovery Verification Matrix
              </h3>
              <span className="text-xs text-slate-400 font-mono">SOC2 / ISO 27001 AUDITED</span>
            </div>

            <div className="space-y-3">
              {drDrills.map(drill => (
                <div
                  key={drill.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{drill.name}</h4>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded text-[10px] font-mono">
                        PASSED
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{drill.summary}</p>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                      <span>Target RPO: <span className="text-white font-bold">{drill.rpoTargetMinutes}m</span></span>
                      <span>•</span>
                      <span>Achieved RTO: <span className="text-emerald-400 font-bold">{drill.achievedRtoMinutes}m</span></span>
                      <span>•</span>
                      <span>Last Verified: <span className="text-slate-300">{drill.lastDrillDate}</span></span>
                    </div>
                  </div>

                  <button
                    onClick={() => triggerDrill(drill.id)}
                    disabled={activeDrillRunning === drill.id}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {activeDrillRunning === drill.id ? 'Simulating Failover...' : 'Trigger Chaos Drill'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
