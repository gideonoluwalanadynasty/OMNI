import React from 'react';
import { 
  Layers, Plus, FileText, Database, ListOrdered, Zap, Sparkles, 
  Users, Video, ArrowUpRight, CheckCircle2, Clock, MapPin, Globe, 
  ShieldCheck, ArrowRight, Play, Terminal
} from 'lucide-react';
import { WorksWorkspace, WorksModuleStatus, WorksEcosystemBridgeStatus } from '../../types/works';

interface WorksWorkspaceOverviewProps {
  workspace: WorksWorkspace;
  modules: WorksModuleStatus[];
  bridges: WorksEcosystemBridgeStatus[];
  onNavigateTab: (tabId: string) => void;
  onOpenManifest: () => void;
  onTriggerToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const WorksWorkspaceOverview: React.FC<WorksWorkspaceOverviewProps> = ({
  workspace,
  modules,
  bridges,
  onNavigateTab,
  onOpenManifest,
  onTriggerToast
}) => {
  const activeModulesCount = modules.filter(m => m.status === 'active').length;
  const connectedBridgesCount = bridges.filter(b => b.status === 'connected' || b.status === 'synced').length;

  return (
    <div className="space-y-6">
      
      {/* Hero Workspace Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{workspace.tier.replace('_', ' ').toUpperCase()}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Residency: {workspace.residency.toUpperCase()}</span>
              </span>
              {workspace.customDomain && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{workspace.customDomain}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {workspace.name}
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
              {workspace.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {workspace.departments.map((dept, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-neutral-950/80 text-neutral-400 text-[11px] font-mono border border-neutral-800">
                  {dept}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={onOpenManifest}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-neutral-700 shadow-sm"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Inspect Core Manifest</span>
            </button>
            <button
              onClick={() => onNavigateTab('ecosystem')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30"
            >
              <Video className="w-4 h-4" />
              <span>Launch Live Huddle (Connect)</span>
            </button>
          </div>
        </div>

        {/* Live Ribbon Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-800/80">
          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
            <div className="text-[10px] text-neutral-500 font-bold uppercase">Active Sub-Engines</div>
            <div className="text-base font-bold text-white font-mono mt-0.5">{activeModulesCount} / 13 Online</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
            <div className="text-[10px] text-neutral-500 font-bold uppercase">Ecosystem Bridges</div>
            <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{connectedBridgesCount} / 9 Synced</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
            <div className="text-[10px] text-neutral-500 font-bold uppercase">Active Collaborators</div>
            <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">{workspace.activeMembersCount} Online</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
            <div className="text-[10px] text-neutral-500 font-bold uppercase">CRDT Mesh Sync</div>
            <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">&lt; 14ms (P99)</div>
          </div>
        </div>
      </div>

      {/* Quick Tool Launchers Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Modular Execution Engines</h2>
          <span className="text-xs text-neutral-400">Select an engine to launch operations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div
            onClick={() => onNavigateTab('architecture')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-900 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Docs &amp; Infinite Canvas</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Real-time block documentation, CRDT multi-cursor editing, and infinite spatial whiteboards.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 pt-4 mt-2">
              <span>Explore Engine</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('architecture')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-900 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Relational DBs &amp; Sheets</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Custom schema tables, dynamic formulas, multi-view boards, and cross-database rollups.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 pt-4 mt-2">
              <span>Explore Engine</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('architecture')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-900 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <ListOrdered className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Agile Sprints &amp; Epics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sprint cycles, Kanban backlogs, burndown velocity telemetry, and smart dependency maps.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 pt-4 mt-2">
              <span>Explore Engine</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('architecture')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-900 hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">AI Copilot &amp; Automations</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                RAG embeddings search, autonomous task estimation, document summarizer and trigger pipelines.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 pt-4 mt-2">
              <span>Explore Engine</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Ecosystem Status Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Bridge Quick Status */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Connected OMNI Ecosystem Layers</h3>
            <button
              onClick={() => onNavigateTab('ecosystem')}
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Manage 9 Bridges</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bridges.slice(0, 6).map((b) => (
              <div key={b.service} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="truncate">{b.displayName.split(' ')[0]} {b.displayName.split(' ')[1]}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">Latency: {b.latencyMs}ms</div>
                <div className="text-[10px] text-neutral-500 truncate">{b.primaryCapability}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Sovereign Trust Card */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Sovereign Security Posture</span>
            </div>
            <h3 className="text-base font-bold text-white">Zero-Knowledge &amp; Air-Gapped</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every document revision, spreadsheet cell, and sprint card is cryptographically hashed and isolated to your tenant’s regional residency.
            </p>
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={() => onNavigateTab('permissions')}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>View RBAC Security Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
