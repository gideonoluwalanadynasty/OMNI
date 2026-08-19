import { useState } from 'react';
import { Server, Globe, AlertTriangle, Play, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { OMNIState, SystemNode, Incident } from '../types';

interface AdminDashboardPageProps {
  state: OMNIState;
  addAuditLog: (action: string, module: string, details: string) => void;
  triggerToast: (title: string, description: string, type: 'success' | 'info' | 'error') => void;
}

export function AdminDashboardPage({ state, addAuditLog, triggerToast }: AdminDashboardPageProps) {
  const [nodes, setNodes] = useState<SystemNode[]>(state.systemNodes);
  const [restartingNode, setRestartingNode] = useState<string | null>(null);

  // Trigger simulated load rebalance
  const handleRebalance = () => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.name === 'omni-node-ber-01') {
          // Recover Berlin load
          return { ...n, load: 42, status: 'operational', latencyMs: 25 };
        }
        // Slightly re-distribute other loads
        return { ...n, load: Math.floor(25 + Math.random() * 30), latencyMs: Math.floor(10 + Math.random() * 15) };
      })
    );
    addAuditLog('CLUSTER_LOAD_REBALANCE', 'Admin/Infrastructure', 'Initiated master load redistribution across global node mesh routers.');
    triggerToast('Load Balancer Settled', 'Distributed connections re-routed. Cluster metrics returned to nominal levels.', 'success');
  };

  // Trigger simulated node restart
  const handleNodeRestart = (nodeName: string) => {
    setRestartingNode(nodeName);
    setNodes((prev) =>
      prev.map((n) => (n.name === nodeName ? { ...n, status: 'offline', load: 0, latencyMs: 0 } : n))
    );

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) =>
          n.name === nodeName
            ? { ...n, status: 'operational', load: 15, latencyMs: 12, requestCount: n.requestCount + 1 }
            : n
        )
      );
      setRestartingNode(null);
      addAuditLog('NODE_RESTART', 'Admin/Infrastructure', `Manually recycled cluster node container: ${nodeName}`);
      triggerToast('Node Restored', `Network route to "${nodeName}" is active.`, 'success');
    }, 1500);
  };

  const totalTransactions = state.ledger.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div id="omni-admin-container" className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
            OMNI Super Admin Console
          </h1>
          <p className="text-xs text-neutral-500 font-normal mt-1">
            Cluster Registry Root · Master controls for all platform modules & global network infrastructure.
          </p>
        </div>

        <button
          onClick={handleRebalance}
          className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Redistribute Mesh Load</span>
        </button>
      </div>

      {/* Global Cluster Statistics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Active Tenants</span>
          <span className="text-2xl font-bold text-neutral-950 block mt-1">{state.organizations.length}</span>
          <span className="text-[10px] text-neutral-400 font-mono mt-1 block">White-label SaaS domains active</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Settled Volume</span>
          <span className="text-2xl font-bold text-emerald-600 block mt-1">${totalTransactions.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Combined OMNI Wallet volume</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Registered Apps</span>
          <span className="text-2xl font-bold text-neutral-950 block mt-1">{state.apps.length}</span>
          <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Launcher registry nodes</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Core Routing Health</span>
          <span className="text-2xl font-bold text-neutral-950 block mt-1">99.98%</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">5 global edges operational</span>
        </div>
      </div>

      {/* Node Matrix and Incident Alerts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Router nodes list */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-neutral-400" />
              <span>Global Router Edge Nodes</span>
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">DNS subdomains mapped</span>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[10px] text-neutral-400 uppercase">
                    <th className="p-3 pl-5">Node Name</th>
                    <th className="p-3">GCP Region</th>
                    <th className="p-3">Load Metric</th>
                    <th className="p-3">Edge Latency</th>
                    <th className="p-3">Total Requests</th>
                    <th className="p-3 pr-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-normal text-neutral-700">
                  {nodes.map((node) => (
                    <tr key={node.name} id={`node-${node.name}`} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-3 pl-5 font-semibold text-neutral-900 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          node.status === 'offline' 
                            ? 'bg-neutral-400' 
                            : node.load > 90 
                            ? 'bg-amber-500 animate-pulse' 
                            : 'bg-emerald-500'
                        }`} />
                        <span>{node.name}</span>
                      </td>
                      <td className="p-3 font-mono text-neutral-500">{node.region}</td>
                      <td className="p-3 font-mono font-bold">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full ${node.load > 90 ? 'bg-amber-500' : 'bg-neutral-900'}`} style={{ width: `${node.load}%` }} />
                          </div>
                          <span>{node.load}%</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-neutral-500">{node.latencyMs > 0 ? `${node.latencyMs}ms` : 'offline'}</td>
                      <td className="p-3 font-mono text-neutral-400">{node.requestCount.toLocaleString()}</td>
                      <td className="p-3 pr-5 text-right">
                        <button
                          disabled={restartingNode !== null}
                          onClick={() => handleNodeRestart(node.name)}
                          className="px-2.5 py-1 text-[10px] border border-neutral-200 hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 rounded-lg uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50"
                        >
                          {restartingNode === node.name ? 'Recycling...' : 'Recycle'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Incidents and security audits */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neutral-400" />
              <span>Incidents Log</span>
            </h3>
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
              {state.incidents.map((inc) => (
                <div key={inc.id} id={`inc-${inc.id}`} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-xs font-semibold text-neutral-900 block truncate max-w-[180px]">
                      {inc.title}
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-wide bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">
                      {inc.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                    <span>Severity: {inc.severity.toUpperCase()}</span>
                    <span>{new Date(inc.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DevOps certification card */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-neutral-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-semibold uppercase tracking-wider">Infrastructure Policy</span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
              OMNI platform deploys all router configurations through containerized serverless tasks on Cloud Run. PostgreSQL tables are multi-tenant isolated with Row Level Security (RLS) policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
