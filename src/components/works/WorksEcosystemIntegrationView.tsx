import React, { useState } from 'react';
import { 
  GitMerge, CheckCircle2, Zap, Sparkles, MessageSquare, Wallet, 
  Server, Bell, BarChart3, Globe, ShieldCheck, RefreshCw, Play, 
  Layers, ArrowRight, Terminal, Check, Activity
} from 'lucide-react';
import { WorksEcosystemBridgeStatus } from '../../types/works';
import { SEED_WORKS_ECOSYSTEM_BRIDGES } from '../../data/omni_works_seed';

interface WorksEcosystemIntegrationViewProps {
  onTriggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onNavigateConnectHuddle?: () => void;
  onNavigateFinanceEscrow?: () => void;
}

export const WorksEcosystemIntegrationView: React.FC<WorksEcosystemIntegrationViewProps> = ({
  onTriggerToast,
  onNavigateConnectHuddle,
  onNavigateFinanceEscrow
}) => {
  const [bridges, setBridges] = useState<WorksEcosystemBridgeStatus[]>(SEED_WORKS_ECOSYSTEM_BRIDGES);
  const [testingService, setTestingService] = useState<string | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<{ id: string; service: string; action: string; result: string; timestamp: string }[]>([
    {
      id: 'log_01',
      service: 'omni_core',
      action: 'SYSTEM_EVENT_BUS_HEARTBEAT',
      result: 'ACK 200 OK — 18 Shards Synchronized across Europe & US Nodes',
      timestamp: '2 mins ago'
    },
    {
      id: 'log_02',
      service: 'omni_connect',
      action: 'WEBSOCKET_MESH_HANDSHAKE',
      result: 'Established CRDT relay channel [room: ws_dynasty_core_collab]',
      timestamp: '5 mins ago'
    },
    {
      id: 'log_03',
      service: 'omni_finance',
      action: 'ESCROW_MILESTONE_PROBE',
      result: 'Smart Contract Escrow Bridge validated (Contract: 0x904a...bf1)',
      timestamp: '12 mins ago'
    }
  ]);

  const serviceIcons: Record<string, React.ReactNode> = {
    omni_core: <Layers className="w-5 h-5 text-indigo-400" />,
    omni_identity: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    omni_ai: <Sparkles className="w-5 h-5 text-purple-400" />,
    omni_connect: <MessageSquare className="w-5 h-5 text-indigo-400" />,
    omni_finance: <Wallet className="w-5 h-5 text-emerald-400" />,
    omni_cloud: <Server className="w-5 h-5 text-amber-400" />,
    omni_notifications: <Bell className="w-5 h-5 text-rose-400" />,
    omni_analytics: <BarChart3 className="w-5 h-5 text-blue-400" />,
    omni_white_label: <Globe className="w-5 h-5 text-teal-400" />
  };

  const handleRunSimulation = (serviceKey: string, actionName: string, successMsg: string) => {
    setTestingService(serviceKey);

    setTimeout(() => {
      const newLog = {
        id: `sim_${Date.now()}`,
        service: serviceKey,
        action: actionName,
        result: successMsg,
        timestamp: 'Just now'
      };

      setSimulationLogs(prev => [newLog, ...prev.slice(0, 9)]);
      setTestingService(null);
      onTriggerToast?.('Ecosystem Bridge Verified', `${actionName} executed successfully across ${serviceKey}.`, 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <GitMerge className="w-4 h-4" />
            <span>9-Layer Ecosystem Native Collaborative Fabric</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">OMNI Ecosystem Integration Hub</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            OMNI Works operates natively connected to Core, Identity, AI, Connect, Finance, Cloud, Notifications, Analytics, and White-Label subsystems.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800 text-xs font-mono shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-white font-bold">9 / 9 Bridges Synced</span>
        </div>
      </div>

      {/* Bridges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bridges.map((bridge) => {
          const icon = serviceIcons[bridge.service] || <Layers className="w-5 h-5" />;
          const isTesting = testingService === bridge.service;

          return (
            <div
              key={bridge.service}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{bridge.displayName}</h3>
                      <div className="text-[10px] font-mono text-neutral-500">Service: {bridge.service}</div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {bridge.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {bridge.description}
                </p>

                <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Latency:</span>
                    <span className="text-emerald-400 font-bold">{bridge.latencyMs} ms</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">24h Events:</span>
                    <span>{bridge.eventsProcessed24h.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Capability:</span>
                    <span className="text-indigo-400 truncate max-w-[150px]">{bridge.primaryCapability}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-neutral-800">
                <button
                  onClick={() => handleRunSimulation(
                    bridge.service,
                    `VERIFY_${bridge.service.toUpperCase()}_BRIDGE`,
                    `Cryptographic ping OK (${bridge.latencyMs}ms) — Data synchronization verified`
                  )}
                  disabled={isTesting}
                  className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-indigo-400' : ''}`} />
                  <span>{isTesting ? 'Verifying Bridge...' : 'Test Bridge Link'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Simulation & Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Quick Interactive Triggers */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Interactive Cross-Pillar Actions</span>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => handleRunSimulation('omni_core', 'DISPATCH_DOMAIN_EVENT_WORKS_TASK_COMPLETED', 'Event works.task.completed routed to 12 subscribers')}
              className="w-full p-3 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>1. Core Event Bus Dispatch</span>
                <Play className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Broadcasts <code>works.task.completed</code> to OMNI Core system ledger.</p>
            </button>

            <button
              onClick={() => handleRunSimulation('omni_connect', 'INITIATE_WEBRTC_HUDDLE_MESH', 'Video SFU room provisioned [huddle_ws_dynasty]')}
              className="w-full p-3 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>2. OMNI Connect Live Huddle</span>
                <Play className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Spawns instant WebRTC audio/video huddle on active doc/canvas.</p>
            </button>

            <button
              onClick={() => handleRunSimulation('omni_finance', 'GENERATE_TIMESHEET_ESCROW_INVOICE', 'Invoice $14,500 USD committed with smart contract milestone')}
              className="w-full p-3 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>3. OMNI Finance Escrow Link</span>
                <Play className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Converts sprint timesheets into OMNI Finance escrow deliverables.</p>
            </button>

            <button
              onClick={() => handleRunSimulation('omni_ai', 'EXECUTE_AGENT_TASK_ESTIMATION', 'AI Agent estimated 24 story points & generated 6 sub-tasks')}
              className="w-full p-3 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>4. OMNI AI Copilot Assistant</span>
                <Play className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Runs autonomous context extraction and sprint burndown forecast.</p>
            </button>
          </div>
        </div>

        {/* Right: Live Event Telemetry Stream */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Real-Time Ecosystem Event Log</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry Active
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[320px] font-mono text-xs pr-1">
            {simulationLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-indigo-400">{log.action}</span>
                  <span className="text-neutral-500 text-[10px]">{log.timestamp}</span>
                </div>
                <div className="text-neutral-300 text-[11px]">{log.result}</div>
                <div className="text-[10px] text-neutral-500">Service Gateway: {log.service}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
