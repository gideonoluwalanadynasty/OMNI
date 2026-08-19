import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  Server,
  Globe,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  Activity,
  Zap,
  Sliders,
  ChevronDown,
  Building,
  Key,
  Database
} from 'lucide-react';
import {
  OmniVpnServerNode,
  OmniVpnProviderAdapterInfo,
  OmniVpnLiveSession,
  OmniVpnProtocolType
} from '../../../types';

interface OmniVpnPlatformViewProps {
  vpnSession: OmniVpnLiveSession;
  servers: OmniVpnServerNode[];
  adapters: OmniVpnProviderAdapterInfo[];
  activeAdapterId: string;
  onConnect: (server?: OmniVpnServerNode) => void;
  onDisconnect: () => void;
  onSelectAdapter: (adapterId: string) => void;
  onToggleKillSwitch: () => void;
  onToggleSplitTunneling: () => void;
  onUpgradeTier: (tier: 'free' | 'pro' | 'enterprise') => void;
}

export const OmniVpnPlatformView: React.FC<OmniVpnPlatformViewProps> = ({
  vpnSession,
  servers,
  adapters,
  activeAdapterId,
  onConnect,
  onDisconnect,
  onSelectAdapter,
  onToggleKillSwitch,
  onToggleSplitTunneling,
  onUpgradeTier
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [protocolFilter, setProtocolFilter] = useState<string>('All');
  const [showAdapterModal, setShowAdapterModal] = useState<boolean>(false);

  // Filter servers
  const filteredServers = servers.filter(server => {
    if (selectedRegion !== 'All' && server.region !== selectedRegion) return false;
    if (protocolFilter !== 'All' && server.protocol !== protocolFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        server.name.toLowerCase().includes(q) ||
        server.country.toLowerCase().includes(q) ||
        server.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const isConnected = vpnSession.status === 'connected';
  const isTransitioning = ['resolving_dns', 'initiating_handshake', 'routing_traffic', 'disconnecting'].includes(
    vpnSession.status
  );

  const activeAdapter = adapters.find(a => a.id === activeAdapterId) || adapters[0];

  const formatBytes = (bytes: number) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  return (
    <div id="omni-vpn-platform-view" className="space-y-6">
      {/* 1. Architecture Flow & Provider-Neutral Transparency Card */}
      <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
                Provider-Neutral Architecture
              </span>
              <span className="text-xs text-stone-400">Cryptographic Relay Orchestrator</span>
            </div>
            <p className="text-xs text-stone-300 pt-0.5">
              OMNI Secure decouples the cryptographic tunnel engine from physical infrastructure, orchestrating connections across self-hosted relays, approved privacy providers, and enterprise zero-trust networks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdapterModal(true)}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
            >
              <span>Adapter: {activeAdapter?.name || 'Default'}</span>
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Visual Architecture Pipeline */}
        <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-stone-300">
            <div className="w-6 h-6 rounded-lg bg-stone-800 flex items-center justify-center text-stone-300 font-bold">
              1
            </div>
            <span>User Client</span>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-600 hidden sm:block" />

          <div className="flex items-center gap-2 text-indigo-300 font-semibold">
            <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300 font-bold">
              2
            </div>
            <span>OMNI Secure Layer</span>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-600 hidden sm:block" />

          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-300 font-bold">
              3
            </div>
            <span>{activeAdapter?.name}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-600 hidden sm:block" />

          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-300 font-bold">
              4
            </div>
            <span>Encrypted Outbound</span>
          </div>
        </div>
      </div>

      {/* 2. Main Connection Deck & Real-Time Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Connection Control Card */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-stone-900/90 border border-indigo-900/60 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Connection Engine
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 ${
                  isConnected
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : isTransitioning
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-emerald-400 animate-pulse' : isTransitioning ? 'bg-amber-400 animate-ping' : 'bg-stone-500'
                  }`}
                />
                {vpnSession.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Target Server Display */}
            <div className="pt-2">
              <div className="text-xs text-stone-400">Selected Node</div>
              <div className="text-base font-bold text-stone-100 flex items-center gap-2 mt-0.5">
                <span>{vpnSession.activeServer?.flagEmoji || '🇨🇭'}</span>
                <span className="truncate">{vpnSession.activeServer?.name || 'Zurich Zero-Log Enclave'}</span>
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                {vpnSession.activeServer?.city || 'Zurich'}, {vpnSession.activeServer?.country || 'Switzerland'} • {vpnSession.activeServer?.protocol || 'WireGuard'}
              </div>
            </div>
          </div>

          {/* One-Click Connect Big Button */}
          <div className="flex flex-col items-center py-2">
            <button
              onClick={() => {
                if (isConnected) onDisconnect();
                else onConnect(vpnSession.activeServer || servers[0]);
              }}
              disabled={isTransitioning}
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 transition-all shadow-2xl relative ${
                isConnected
                  ? 'bg-gradient-to-b from-rose-600 to-rose-700 text-white shadow-rose-600/30 hover:scale-105'
                  : isTransitioning
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-indigo-600/40 hover:scale-105'
              }`}
            >
              {isConnected ? (
                <>
                  <WifiOff className="w-8 h-8" />
                  <span className="text-xs font-black uppercase tracking-wider">Disconnect</span>
                </>
              ) : isTransitioning ? (
                <>
                  <RefreshCw className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-bold capitalize">{vpnSession.status.replace('_', ' ')}</span>
                </>
              ) : (
                <>
                  <Wifi className="w-8 h-8" />
                  <span className="text-xs font-black uppercase tracking-wider">Connect Now</span>
                </>
              )}
            </button>
          </div>

          {/* Masked IP & Tunnel Details */}
          <div className="pt-4 border-t border-stone-800 text-xs font-mono space-y-1.5">
            <div className="flex justify-between">
              <span className="text-stone-500">Masked Public IP:</span>
              <span className={isConnected ? 'text-indigo-300 font-bold' : 'text-stone-400'}>
                {vpnSession.realIpMasked}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Virtual Assigned IP:</span>
              <span className="text-emerald-400 font-bold">{vpnSession.virtualIp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Cipher Suite:</span>
              <span className="text-stone-300 truncate max-w-[150px]" title={vpnSession.cipherSuite}>
                {vpnSession.cipherSuite}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry & Bandwidth Meter */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Live Bandwidth & Session Telemetry
              </h2>
              <p className="text-xs text-stone-400">Zero-knowledge packet counters and real-time throughput metrics</p>
            </div>

            {/* Subscription Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize border ${
                  vpnSession.subscriptionTier === 'enterprise'
                    ? 'bg-purple-950 text-purple-300 border-purple-800'
                    : vpnSession.subscriptionTier === 'pro'
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    : 'bg-stone-800 text-stone-300 border-stone-700'
                }`}
              >
                {vpnSession.subscriptionTier} Tier
              </span>
            </div>
          </div>

          {/* Speed Dials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 space-y-1">
              <span className="text-[11px] text-stone-400">Download Speed</span>
              <div className="text-xl font-extrabold text-emerald-400 font-mono">
                {vpnSession.currentDownMbps} <span className="text-xs text-stone-500 font-normal">Mbps</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 space-y-1">
              <span className="text-[11px] text-stone-400">Upload Speed</span>
              <div className="text-xl font-extrabold text-cyan-400 font-mono">
                {vpnSession.currentUpMbps} <span className="text-xs text-stone-500 font-normal">Mbps</span>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 space-y-1">
              <span className="text-[11px] text-stone-400">Session Transferred</span>
              <div className="text-lg font-bold text-stone-200 font-mono">
                {formatBytes(vpnSession.bytesDownloaded + vpnSession.bytesUploaded)}
              </div>
            </div>

            <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 space-y-1">
              <span className="text-[11px] text-stone-400">Session Uptime</span>
              <div className="text-lg font-bold text-stone-200 font-mono">
                {formatDuration(vpnSession.sessionDurationSec)}
              </div>
            </div>
          </div>

          {/* Simulated Real-Time Waveform Graph */}
          <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-[11px] text-stone-400 font-mono">
              <span>Dynamic Throughput Sampling</span>
              <span className="text-emerald-400">WireGuard Turbo • HW Accelerated</span>
            </div>
            {/* Visualizer bars */}
            <div className="h-16 flex items-end gap-1 pt-2">
              {[40, 65, 30, 85, 95, 70, 45, 60, 80, 55, 90, 75, 60, 85, 100, 68, 72, 88, 92, 78, 64, 82, 90, 94].map(
                (val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t transition-all duration-300 ${
                      isConnected ? 'bg-gradient-to-t from-indigo-900 to-indigo-500' : 'bg-stone-800'
                    }`}
                    style={{
                      height: isConnected ? `${Math.max(15, (val * (vpnSession.currentDownMbps || 50)) / 100)}%` : '10%'
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* Hardened Toggles Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-stone-200">Hardware Kill-Switch</div>
                <div className="text-[11px] text-stone-400">Block all traffic if VPN drops</div>
              </div>
              <button
                onClick={onToggleKillSwitch}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  vpnSession.killSwitchActive ? 'bg-indigo-600' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    vpnSession.killSwitchActive ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3 bg-stone-800/40 rounded-xl border border-stone-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-stone-200">Split-Tunneling</div>
                <div className="text-[11px] text-stone-400">Bypass VPN for local LAN & printer</div>
              </div>
              <button
                onClick={onToggleSplitTunneling}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  vpnSession.splitTunnelingActive ? 'bg-indigo-600' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    vpnSession.splitTunnelingActive ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Server & Location Selection Explorer */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Global Relay Nodes & Locations
            </h2>
            <p className="text-xs text-stone-400">Choose from low-latency sovereign gateways and verified privacy relays</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                placeholder="Search city or country..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500 w-48"
              />
            </div>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none"
            >
              <option value="All">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="Latin America">Latin America</option>
            </select>

            {/* Protocol Filter */}
            <select
              value={protocolFilter}
              onChange={e => setProtocolFilter(e.target.value)}
              className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none"
            >
              <option value="All">All Protocols</option>
              <option value="WireGuard">WireGuard</option>
              <option value="OpenVPN">OpenVPN</option>
              <option value="Sovereign_Relay">Sovereign Relay</option>
              <option value="Tailscale_Mesh">Tailscale Mesh</option>
              <option value="IPsec_IKEv2">IPsec IKEv2</option>
            </select>
          </div>
        </div>

        {/* Server Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredServers.map(server => {
            const isCurrentActive = vpnSession.activeServer?.id === server.id;
            return (
              <div
                key={server.id}
                onClick={() => onConnect(server)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isCurrentActive && isConnected
                    ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-lg shadow-indigo-950/50'
                    : 'bg-stone-800/40 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{server.flagEmoji}</span>
                    <div>
                      <div className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
                        <span>{server.city}</span>
                        {server.features.hardwareEnclave && (
                          <span className="px-1 py-0.2 text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                            HW Enclave
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">{server.name}</div>
                    </div>
                  </div>

                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                      server.tier === 'enterprise'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : server.tier === 'pro'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {server.tier}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[11px] font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400">{server.latencyMs} ms</span>
                    <span className="text-stone-500">{server.loadPercent}% load</span>
                  </div>
                  <span className="text-stone-400">{server.protocol.replace('_', ' ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Provider Adapter Switcher Modal */}
      {showAdapterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-sm font-bold text-stone-100">Select VPN Provider Adapter</h3>
                <p className="text-xs text-stone-400">Switch between self-hosted, commercial, and enterprise zero-trust layers</p>
              </div>
              <button
                onClick={() => setShowAdapterModal(false)}
                className="text-stone-400 hover:text-stone-200 text-xs px-2 py-1 bg-stone-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {adapters.map(adapter => (
                <div
                  key={adapter.id}
                  onClick={() => {
                    onSelectAdapter(adapter.id);
                    setShowAdapterModal(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    adapter.id === activeAdapterId
                      ? 'bg-indigo-950/70 border-indigo-600 text-white'
                      : 'bg-stone-800/50 border-stone-700 text-stone-300 hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{adapter.vendorLogo}</span>
                      <div>
                        <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                          <span>{adapter.name}</span>
                          {adapter.isDeployed && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                              Deployed & Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400 pt-1 leading-relaxed">{adapter.description}</p>
                      </div>
                    </div>
                  </div>

                  {adapter.deploymentNote && (
                    <div className="mt-2.5 p-2 bg-stone-950/70 rounded-lg text-[11px] font-mono text-stone-400 border border-stone-800">
                      ℹ️ {adapter.deploymentNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
