import { useState, useEffect } from 'react';
import { Activity, Circle, Server, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { OMNIState } from '../types';

interface SystemStatusPageProps {
  state: OMNIState;
}

interface RequestLog {
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  status: number;
  latencyMs: number;
  tenant: string;
}

const SIMULATED_PATHS = [
  { method: 'GET' as const, path: '/api/v1/identity/user' },
  { method: 'POST' as const, path: '/api/v1/wallet/settle' },
  { method: 'GET' as const, path: '/api/v1/organizations/dynasty' },
  { method: 'POST' as const, path: '/api/v1/auth/token' },
  { method: 'PUT' as const, path: '/api/v1/webhooks/trigger' },
  { method: 'GET' as const, path: '/api/v1/learn/courses' },
  { method: 'GET' as const, path: '/api/v1/cloud/instances' },
  { method: 'POST' as const, path: '/api/v1/ads/campaign' }
];

const TENANTS = ['tenant_dynasty_99', 'tenant_oluwalana_12', 'tenant_anon_core'];

export function SystemStatusPage({ state }: SystemStatusPageProps) {
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [systemUptime, setSystemUptime] = useState('284d 14h 22m 11s');

  // Simulate real-time API logs stream
  useEffect(() => {
    // Seed initial logs
    const initialLogs: RequestLog[] = [];
    for (let i = 0; i < 6; i++) {
      const pathObj = SIMULATED_PATHS[Math.floor(Math.random() * SIMULATED_PATHS.length)];
      initialLogs.push({
        timestamp: new Date(Date.now() - i * 4000).toLocaleTimeString(),
        method: pathObj.method,
        path: pathObj.path,
        status: Math.random() > 0.05 ? 200 : 500,
        latencyMs: Math.floor(8 + Math.random() * 45),
        tenant: TENANTS[Math.floor(Math.random() * TENANTS.length)]
      });
    }
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const pathObj = SIMULATED_PATHS[Math.floor(Math.random() * SIMULATED_PATHS.length)];
      const newLog: RequestLog = {
        timestamp: new Date().toLocaleTimeString(),
        method: pathObj.method,
        path: pathObj.path,
        status: Math.random() > 0.05 ? (pathObj.method === 'POST' ? 201 : 200) : 500,
        latencyMs: Math.floor(8 + Math.random() * 45),
        tenant: TENANTS[Math.floor(Math.random() * TENANTS.length)]
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 8)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="omni-status-container" className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          OMNI System Status Matrix
        </h1>
        <p className="text-xs text-neutral-500 font-normal mt-1">
          Real-time global metrics. System uptime, edge router workloads and microservice log diagnostics.
        </p>
      </div>

      {/* Grid operational matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Master System State</span>
            <span className="text-lg font-bold text-neutral-900">All Clusters Nominal</span>
          </div>
          <Circle className="w-5 h-5 text-emerald-500 fill-emerald-500 animate-pulse" />
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Cumulative System Uptime</span>
            <span className="text-lg font-bold text-neutral-900">{systemUptime}</span>
          </div>
          <ShieldCheck className="w-5 h-5 text-neutral-800" />
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Mean Edge Latency</span>
            <span className="text-lg font-bold text-neutral-900">18.42 ms</span>
          </div>
          <Activity className="w-5 h-5 text-neutral-800" />
        </div>
      </div>

      {/* Stream Terminal */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neutral-400" />
            <span>Distributed Access Log (Live API Stream)</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded font-bold animate-pulse">
            ● Streaming active
          </span>
        </div>

        <div className="bg-neutral-950 text-neutral-200 rounded-2xl overflow-hidden shadow-xl border border-neutral-800">
          {/* Header row for terminal log */}
          <div className="bg-neutral-900 px-5 py-3 border-b border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wide">
            <span>Core Router Handshakes</span>
            <span>PORT 3000 Ingress</span>
          </div>

          <div className="p-5 font-mono text-xs flex flex-col gap-3 min-h-[300px] overflow-y-auto max-h-[400px]">
            {logs.length === 0 ? (
              <div className="text-neutral-500 animate-pulse text-center py-12">
                Listening for incoming GCP ingress requests...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-900/60 pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-neutral-500">[{log.timestamp}]</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      log.method === 'POST' ? 'bg-blue-950 text-blue-300' :
                      log.method === 'PUT' ? 'bg-amber-950 text-amber-300' :
                      'bg-neutral-900 text-neutral-300'
                    }`}>
                      {log.method}
                    </span>
                    <span className="text-neutral-200 font-semibold">{log.path}</span>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <span className="text-neutral-400 font-mono">Tenant: {log.tenant}</span>
                    <span className="text-neutral-500 font-mono">{log.latencyMs}ms</span>
                    <span className={`font-bold ${log.status >= 500 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
