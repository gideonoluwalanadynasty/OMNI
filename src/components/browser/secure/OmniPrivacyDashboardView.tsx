import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Cpu,
  Globe,
  Radio,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Laptop,
  Smartphone,
  Server,
  Trash2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import {
  OmniPrivacyScoreBreakdown,
  OmniSitePermission,
  OmniConnectedDevice,
  OmniVpnLiveSession
} from '../../../types';

interface OmniPrivacyDashboardViewProps {
  scoreBreakdown: OmniPrivacyScoreBreakdown;
  sitePermissions: OmniSitePermission[];
  connectedDevices: OmniConnectedDevice[];
  vpnSession: OmniVpnLiveSession;
  onFixRecommendation: (actionType: string) => void;
  onUpdatePermission: (domain: string, perm: OmniSitePermission['permission'], status: OmniSitePermission['status']) => void;
  onRevokePermission: (domain: string, perm: OmniSitePermission['permission']) => void;
  onRevokeDevice: (deviceId: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const OmniPrivacyDashboardView: React.FC<OmniPrivacyDashboardViewProps> = ({
  scoreBreakdown,
  sitePermissions,
  connectedDevices,
  vpnSession,
  onFixRecommendation,
  onUpdatePermission,
  onRevokePermission,
  onRevokeDevice,
  onNavigateTab
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'text-emerald-400 border-emerald-500 bg-emerald-950/40';
      case 'A':
        return 'text-teal-400 border-teal-500 bg-teal-950/40';
      case 'B':
        return 'text-cyan-400 border-cyan-500 bg-cyan-950/40';
      case 'C':
        return 'text-amber-400 border-amber-500 bg-amber-950/40';
      default:
        return 'text-rose-400 border-rose-500 bg-rose-950/40';
    }
  };

  return (
    <div id="omni-privacy-dashboard-view" className="space-y-6">
      {/* Top Banner: Score & Security Posture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Privacy Score Gauge Card */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Overall Privacy Score
              </span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-black border ${getGradeColor(scoreBreakdown.grade)}`}>
                Grade {scoreBreakdown.grade}
              </span>
            </div>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-5xl font-black tracking-tight text-stone-100 font-mono">
                {scoreBreakdown.totalScore}
              </span>
              <span className="text-stone-500 font-mono text-lg">/ 100</span>
            </div>
            <p className="text-xs text-stone-400 pt-1 leading-relaxed">
              Calculated across cryptographic VPN tunnels, DNS-over-HTTPS encryption, active tracker mitigation, and anti-fingerprint noise injection.
            </p>
          </div>

          {/* Mini Category Bars */}
          <div className="space-y-2 pt-4 border-t border-stone-800/80 text-[11px] font-medium">
            <div className="flex justify-between items-center text-stone-300">
              <span className="flex items-center gap-1.5 text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Network Security
              </span>
              <span className="font-mono text-emerald-400">{scoreBreakdown.categories.networkSecurity} / 20</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${(scoreBreakdown.categories.networkSecurity / 20) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-stone-300">
              <span className="flex items-center gap-1.5 text-stone-400">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> Fingerprint Resistance
              </span>
              <span className="font-mono text-cyan-400">{scoreBreakdown.categories.fingerprintResistance} / 15</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all"
                style={{ width: `${(scoreBreakdown.categories.fingerprintResistance / 15) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-stone-300">
              <span className="flex items-center gap-1.5 text-stone-400">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> DNS & Cookies
              </span>
              <span className="font-mono text-indigo-400">{scoreBreakdown.categories.dnsPrivacy + scoreBreakdown.categories.cookieHygiene} / 30</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${((scoreBreakdown.categories.dnsPrivacy + scoreBreakdown.categories.cookieHygiene) / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Active Protections Matrix */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <h2 className="text-sm font-bold text-stone-100">Active Protection Layers</h2>
              <p className="text-xs text-stone-400">Real-time status of OMNI Secure privacy daemons</p>
            </div>
            <button
              onClick={() => onNavigateTab('vpn')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              Configure VPN <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* VPN Status Box */}
            <div
              onClick={() => onNavigateTab('vpn')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                vpnSession.status === 'connected'
                  ? 'bg-indigo-950/40 border-indigo-700 text-indigo-200'
                  : 'bg-stone-800/60 border-stone-700 text-stone-400 hover:border-stone-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold">VPN Encrypted Tunnel</span>
                <span className={`w-2 h-2 rounded-full ${vpnSession.status === 'connected' ? 'bg-indigo-400 animate-pulse' : 'bg-stone-500'}`} />
              </div>
              <div className="text-xs font-bold text-stone-100">
                {vpnSession.status === 'connected' ? vpnSession.activeServer?.name || 'Connected' : 'Disconnected'}
              </div>
              <div className="text-[10px] text-stone-400 font-mono mt-1">
                {vpnSession.status === 'connected' ? `IP: ${vpnSession.realIpMasked}` : 'IP Exposed'}
              </div>
            </div>

            {/* Tracker Shield Box */}
            <div
              onClick={() => onNavigateTab('trackers')}
              className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/80 text-emerald-200 cursor-pointer transition-all hover:bg-emerald-950/60"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold">Tracker Deflections</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-bold text-stone-100">Zero-Telemetry Active</div>
              <div className="text-[10px] text-emerald-300/80 font-mono mt-1">
                2,546 scripts blocked (24h)
              </div>
            </div>

            {/* Secure DNS Box */}
            <div
              onClick={() => onNavigateTab('dns')}
              className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-700/80 text-cyan-200 cursor-pointer transition-all hover:bg-cyan-950/60"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold">Encrypted DNS (DoH)</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div className="text-xs font-bold text-stone-100">Sovereign DoH Active</div>
              <div className="text-[10px] text-cyan-300/80 font-mono mt-1">
                No ISP query logging
              </div>
            </div>

            {/* Anti-Fingerprint Box */}
            <div
              onClick={() => onNavigateTab('fingerprint')}
              className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-700/80 text-purple-200 cursor-pointer transition-all hover:bg-purple-950/60"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold">Anti-Fingerprint Jitter</span>
                <span className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
              <div className="text-xs font-bold text-stone-100">Canvas & Audio Noise</div>
              <div className="text-[10px] text-purple-300/80 font-mono mt-1">
                Sub-pixel variance on
              </div>
            </div>

            {/* Cookie Isolation Box */}
            <div
              onClick={() => onNavigateTab('cookies')}
              className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-700/80 text-amber-200 cursor-pointer transition-all hover:bg-amber-950/60"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold">Cookie Jar Partition</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <div className="text-xs font-bold text-stone-100">3rd-Party Blocked</div>
              <div className="text-[10px] text-amber-300/80 font-mono mt-1">
                Workspace isolation active
              </div>
            </div>

            {/* Kill-Switch Box */}
            <div
              onClick={() => onNavigateTab('vpn')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                vpnSession.killSwitchActive
                  ? 'bg-rose-950/40 border-rose-700/80 text-rose-200'
                  : 'bg-stone-800/60 border-stone-700 text-stone-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold">Hardware Kill-Switch</span>
                <span className={`w-2 h-2 rounded-full ${vpnSession.killSwitchActive ? 'bg-rose-400' : 'bg-stone-500'}`} />
              </div>
              <div className="text-xs font-bold text-stone-100">
                {vpnSession.killSwitchActive ? 'Armed & Enforced' : 'Disabled'}
              </div>
              <div className="text-[10px] text-stone-400 font-mono mt-1">
                Zero leak protection
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Recommendations Section */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Security & Privacy Recommendations
            </h2>
            <p className="text-xs text-stone-400">Actionable steps to harden your sovereign privacy posture</p>
          </div>
        </div>

        <div className="space-y-3">
          {scoreBreakdown.recommendations.map(rec => (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                rec.isFixed
                  ? 'bg-emerald-950/20 border-emerald-900/60 text-stone-300'
                  : 'bg-stone-800/50 border-stone-700/80 text-stone-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-100">{rec.title}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      rec.impact === 'high'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : rec.impact === 'medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {rec.impact} impact
                  </span>
                </div>
                <p className="text-xs text-stone-400">{rec.description}</p>
              </div>

              <div className="shrink-0">
                {rec.isFixed ? (
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Hardened
                  </div>
                ) : (
                  <button
                    onClick={() => onFixRecommendation(rec.actionType)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                  >
                    {rec.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions & Connected Devices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Domain Permissions Manager */}
        <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <h2 className="text-sm font-bold text-stone-100">Site Permissions Manager</h2>
              <p className="text-xs text-stone-400">Control hardware device and sensor access per domain</p>
            </div>
            <span className="text-xs font-mono text-stone-500">{sitePermissions.length} rules</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {sitePermissions.map((perm, idx) => (
              <div
                key={`${perm.domain}-${perm.permission}-${idx}`}
                className="p-3 bg-stone-800/40 border border-stone-800 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-stone-200">{perm.domain}</div>
                  <div className="text-[11px] text-stone-400 font-mono capitalize">
                    {perm.permission.replace('_', ' ')} access
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={perm.status}
                    onChange={e => onUpdatePermission(perm.domain, perm.permission, e.target.value as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-800 border outline-none cursor-pointer ${
                      perm.status === 'allow'
                        ? 'text-emerald-400 border-emerald-800'
                        : perm.status === 'block'
                        ? 'text-rose-400 border-rose-800'
                        : 'text-amber-400 border-amber-800'
                    }`}
                  >
                    <option value="allow">Allow</option>
                    <option value="ask">Ask</option>
                    <option value="block">Block</option>
                  </select>

                  <button
                    onClick={() => onRevokePermission(perm.domain, perm.permission)}
                    className="p-1 rounded text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                    title="Delete permission"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Devices Registry */}
        <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <h2 className="text-sm font-bold text-stone-100">Connected Devices & Sessions</h2>
              <p className="text-xs text-stone-400">Authenticated devices on your sovereign privacy mesh</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">{connectedDevices.length} Active</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {connectedDevices.map(dev => (
              <div
                key={dev.id}
                className="p-3 bg-stone-800/40 border border-stone-800 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 text-indigo-400">
                    {dev.deviceType === 'mobile' ? (
                      <Smartphone className="w-4 h-4" />
                    ) : dev.deviceType === 'desktop' ? (
                      <Server className="w-4 h-4" />
                    ) : (
                      <Laptop className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                      <span>{dev.deviceName}</span>
                      {dev.isCurrentDevice && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 font-normal">
                          This Device
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono">
                      {dev.location} • {dev.ipAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-500 font-mono">{dev.lastSeen}</span>
                  {!dev.isCurrentDevice && (
                    <button
                      onClick={() => onRevokeDevice(dev.id)}
                      className="px-2 py-1 text-[11px] font-semibold bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
