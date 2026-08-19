import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Laptop,
  Smartphone,
  Puzzle,
  Globe,
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  RefreshCw
} from 'lucide-react';
import { BrowserPlatformType, BrowserRuntimeCapabilities } from '../../../types';
import { browserAdapterFactory } from '../../../sdk/browser-adapters/BrowserAdapterFactory';

interface MultiplatformEngineDrawerProps {
  activePlatform: BrowserPlatformType;
  onSwitchPlatform: (platform: BrowserPlatformType) => void;
}

export const MultiplatformEngineDrawer: React.FC<MultiplatformEngineDrawerProps> = ({
  activePlatform,
  onSwitchPlatform
}) => {
  const [diagnostics, setDiagnostics] = useState<{
    status: 'healthy' | 'degraded';
    latencyMs: number;
    memoryMb: number;
    details: string;
  }>({
    status: 'healthy',
    latencyMs: 14,
    memoryMb: 148,
    details: 'OMNI Native IPC channel nominal.'
  });
  const [isRunningBench, setIsRunningBench] = useState(false);

  const availableAdapters = browserAdapterFactory.getAllAvailableAdapters();
  const currentAdapter = browserAdapterFactory.getAdapter(activePlatform);

  const runEngineDiagnostics = async () => {
    setIsRunningBench(true);
    try {
      const health = await currentAdapter.checkEngineHealth();
      const mem = await currentAdapter.getMemoryUsageMb();
      setDiagnostics({
        status: health.status,
        latencyMs: health.latencyMs,
        memoryMb: mem,
        details: health.details
      });
    } finally {
      setIsRunningBench(false);
    }
  };

  useEffect(() => {
    runEngineDiagnostics();
  }, [activePlatform]);

  const getPlatformIcon = (plat: BrowserPlatformType) => {
    switch (plat) {
      case 'desktop':
        return <Laptop className="w-4 h-4 text-indigo-400" />;
      case 'android':
      case 'ios':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'extension':
        return <Puzzle className="w-4 h-4 text-amber-400" />;
      case 'pwa':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'web':
      default:
        return <Globe className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div id="multiplatform-engine-drawer" className="space-y-4 text-stone-100">
      {/* 1. Architecture Summary Banner */}
      <div className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <div className="text-xs font-semibold text-stone-100">Technology Abstraction Layer</div>
          </div>
          <span className="px-2 py-0.5 bg-indigo-950 border border-indigo-800 text-indigo-300 rounded text-[10px] font-mono uppercase">
            {activePlatform} Runtime
          </span>
        </div>
        <p className="text-[11px] text-stone-400 leading-snug">
          Single unified sovereign codebase abstracting Desktop, Mobile, Extensions, and PWAs without Chromium fork dependencies.
        </p>
      </div>

      {/* 2. Platform Adapter Switcher Grid */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-400 px-1">Switch Runtime Adapter Target</div>
        <div className="grid grid-cols-2 gap-2">
          {availableAdapters.map(ad => {
            const isSelected = activePlatform === ad.platform;
            return (
              <button
                key={ad.platform}
                id={`btn-select-platform-${ad.platform}`}
                onClick={() => {
                  browserAdapterFactory.switchPlatform(ad.platform);
                  onSwitchPlatform(ad.platform);
                }}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-600 text-white shadow-md'
                    : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  {getPlatformIcon(ad.platform)}
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="mt-2">
                  <div className="text-xs font-semibold capitalize">{ad.platform} Adapter</div>
                  <div className="text-[10px] text-stone-400 truncate mt-0.5">{ad.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Live Diagnostics & Enclave Health */}
      <div className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-stone-100">Live Engine Diagnostics</span>
          </div>
          <button
            onClick={runEngineDiagnostics}
            disabled={isRunningBench}
            className="p-1 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            title="Re-run diagnostics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunningBench ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-stone-900 border border-stone-800 rounded-lg">
            <div className="text-[10px] text-stone-500">IPC Bridge Latency</div>
            <div className="font-mono font-bold text-emerald-400 mt-0.5">{diagnostics.latencyMs} ms</div>
          </div>
          <div className="p-2 bg-stone-900 border border-stone-800 rounded-lg">
            <div className="text-[10px] text-stone-500">Heap Allocation</div>
            <div className="font-mono font-bold text-indigo-400 mt-0.5">{diagnostics.memoryMb} MB</div>
          </div>
        </div>

        <div className="p-2 bg-stone-900/80 border border-stone-800 rounded text-[11px] text-stone-300 font-mono">
          {diagnostics.details}
        </div>
      </div>

      {/* 4. Active Capabilities Matrix */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-400 px-1">Hardware & OS Capability Matrix</div>
        <div className="p-1 bg-stone-950 border border-stone-800 rounded-xl divide-y divide-stone-800/80 text-xs">
          {Object.entries(currentAdapter.capabilities).map(([capKey, enabled]) => (
            <div key={capKey} className="flex items-center justify-between p-2">
              <span className="text-stone-300 capitalize text-[11px]">
                {capKey.replace('supports', '').replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span
                className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                  enabled
                    ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                    : 'bg-stone-900 border border-stone-800 text-stone-500'
                }`}
              >
                {enabled ? 'Supported' : 'Emulated'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
