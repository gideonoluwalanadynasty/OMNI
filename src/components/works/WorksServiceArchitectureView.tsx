import React, { useState } from 'react';
import { 
  Server, Cpu, Activity, Zap, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, RefreshCw, Layers, Database, Sparkles, Clock, Globe,
  Search, ExternalLink, Terminal, Sliders
} from 'lucide-react';
import { WorksModuleStatus } from '../../types/works';
import { SEED_WORKS_MODULE_STATUSES } from '../../data/omni_works_seed';

interface WorksServiceArchitectureViewProps {
  onSelectModule?: (moduleId: string) => void;
}

export const WorksServiceArchitectureView: React.FC<WorksServiceArchitectureViewProps> = ({
  onSelectModule
}) => {
  const [modules, setModules] = useState<WorksModuleStatus[]>(SEED_WORKS_MODULE_STATUSES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [inspectedModule, setInspectedModule] = useState<WorksModuleStatus | null>(modules[0]);

  const categories = [
    { id: 'all', label: 'All Services (13)' },
    { id: 'core_editor', label: 'Core Docs & Canvas' },
    { id: 'data_ops', label: 'Data & Databases' },
    { id: 'project_mgmt', label: 'Agile & Sprints' },
    { id: 'collaboration', label: 'Wiki & Portals' },
    { id: 'automation', label: 'Automations' },
    { id: 'intelligence', label: 'AI Copilot' },
    { id: 'governance', label: 'Security & Audit' }
  ];

  const filteredModules = modules.filter(m => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          m.route.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePing = (id: string) => {
    setPingingId(id);
    setTimeout(() => {
      setModules(prev => prev.map(m => {
        if (m.id === id) {
          const newLatency = Math.floor(Math.random() * 15) + 6;
          return { ...m, latencyMs: newLatency, healthScore: 99.9 };
        }
        return m;
      }));
      setPingingId(null);
    }, 450);
  };

  const avgLatency = Math.round(modules.reduce((acc, m) => acc + m.latencyMs, 0) / modules.length);
  const totalInstances = modules.reduce((acc, m) => acc + m.activeInstances, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider">Sub-Engine Mesh</span>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">13 / 13 Active</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Core Microservices Online</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider">Average Mesh Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{avgLatency} ms</div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">
            P99 &lt; 42ms (Zero-Lag CRDT)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider">Active Workers</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{totalInstances} Pods</div>
          <div className="text-xs text-cyan-400 mt-1 font-mono">
            Auto-scaled across 5 Edge Regions
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider">Global Availability SLO</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">99.998%</div>
          <div className="text-xs text-emerald-400 mt-1 font-mono">
            Zero-Downtime Hot Upgrades
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-neutral-900/40 p-3 rounded-2xl border border-neutral-800/60">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service, route, capability..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Main Grid + Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Services List (2 Cols on desktop) */}
        <div className="lg:col-span-2 space-y-3">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => setInspectedModule(mod)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                inspectedModule?.id === mod.id
                  ? 'bg-indigo-950/20 border-indigo-500/50 shadow-md shadow-indigo-950/40'
                  : 'bg-neutral-900/50 border-neutral-800/70 hover:bg-neutral-900/80 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-indigo-400 font-bold text-sm shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white tracking-tight">{mod.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {mod.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">{mod.version}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">Route: {mod.route}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePing(mod.id);
                    }}
                    disabled={pingingId === mod.id}
                    className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors border border-neutral-700/60 text-xs flex items-center gap-1"
                    title="Ping Sub-Engine"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${pingingId === mod.id ? 'animate-spin text-indigo-400' : ''}`} />
                    <span className="font-mono text-[11px]">{mod.latencyMs}ms</span>
                  </button>
                </div>
              </div>

              {/* Capabilities pills */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-800/60">
                {mod.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-neutral-950/60 text-neutral-300 text-[10px] font-medium border border-neutral-800"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Service Detailed Inspector (1 Col) */}
        <div className="space-y-4">
          {inspectedModule ? (
            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4 sticky top-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Service Inspection</div>
                  <h4 className="text-base font-bold text-white">{inspectedModule.name}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {inspectedModule.id}
                </span>
              </div>

              {/* Live Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 font-semibold uppercase">Health Score</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{inspectedModule.healthScore}%</div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${inspectedModule.healthScore}%` }}></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 font-semibold uppercase">Uptime (30d)</div>
                  <div className="text-xl font-bold text-indigo-400 font-mono mt-0.5">{inspectedModule.uptimePercent}%</div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${inspectedModule.uptimePercent}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Dependencies Graph */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Ecosystem Dependencies</div>
                <div className="space-y-1.5">
                  {inspectedModule.dependencies.map((dep, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-neutral-950/60 border border-neutral-800 text-xs font-mono">
                      <span className="text-neutral-300">{dep}</span>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Connected
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Capabilities */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Sub-Engine Features</div>
                <div className="space-y-1">
                  {inspectedModule.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 flex gap-2">
                <button
                  onClick={() => handlePing(inspectedModule.id)}
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/30"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${pingingId === inspectedModule.id ? 'animate-spin' : ''}`} />
                  <span>Ping Health Check</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500 rounded-2xl border border-neutral-800">
              Select a service module to view architecture details
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
