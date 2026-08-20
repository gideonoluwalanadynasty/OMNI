import React, { useState } from 'react';
import {
  Sliders,
  Radio,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Key,
  Globe,
  ShieldCheck,
  Zap,
  Activity,
  Send,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ChannelAdapterConfig, ExternalChannelType, ChannelHealthStatus } from '../../../types/omni_universal_inbox';

interface Props {
  adapters: ChannelAdapterConfig[];
  onToggleAdapter: (adapterId: string) => void;
  onUpdateCredentials: (adapterId: string, updated: Partial<ChannelAdapterConfig['credentials']>) => void;
  onTestPingWebhook: (adapterId: string) => Promise<{ success: boolean; latencyMs: number; message: string }>;
}

export const OmniChannelAdaptersManager: React.FC<Props> = ({
  adapters,
  onToggleAdapter,
  onUpdateCredentials,
  onTestPingWebhook
}) => {
  const [selectedAdapterId, setSelectedAdapterId] = useState<string>(adapters[0]?.id || '');
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [pingResult, setPingResult] = useState<{ id: string; success: boolean; latencyMs: number; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedAdapter = adapters.find(a => a.id === selectedAdapterId) || adapters[0];

  const handlePing = async (id: string) => {
    setPingingId(id);
    setPingResult(null);
    try {
      const res = await onTestPingWebhook(id);
      setPingResult({ id, ...res });
    } catch (e: any) {
      setPingResult({ id, success: false, latencyMs: 340, message: e?.message || 'Webhook ping failed' });
    } finally {
      setPingingId(null);
    }
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getChannelIcon = (ch: ExternalChannelType) => {
    switch (ch) {
      case 'whatsapp': return MessageSquare;
      case 'email': return Mail;
      case 'sms': return Phone;
      case 'instagram': return MessageCircle;
      case 'website_chat': return Globe;
      case 'telegram': return Send;
      case 'facebook': return MessageCircle;
      case 'omni_messenger': return Sparkles;
      default: return Radio;
    }
  };

  const getStatusBadge = (status: ChannelHealthStatus) => {
    switch (status) {
      case 'active':
        return { label: 'Online / Healthy', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'degraded':
        return { label: 'Degraded Latency', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      case 'disconnected':
        return { label: 'Disconnected', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
      case 'rate_limited':
        return { label: 'Rate Limited', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
      default:
        return { label: status, color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                COMMUNICATION INTEGRATION GATEWAY
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Zero Dependency Architecture
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Channel Adapters & Webhook Gateway</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-1">
              External platforms (WhatsApp, Email, SMS, Instagram, FB, Telegram, Webchat) are connected as sovereign decoupled adapters. OMNI Connect remains the primary relationship layer.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-right flex-shrink-0">
            <span className="text-[11px] text-slate-400 block font-medium">Gateway Total Throughput</span>
            <div className="text-2xl font-black text-emerald-400">287,460 msgs</div>
            <span className="text-[10px] text-slate-500">99.98% Global Uptime</span>
          </div>
        </div>
      </div>

      {/* Grid of Channels (Left list + Right detail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Adapters List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {adapters.map(adapter => {
            const Icon = getChannelIcon(adapter.channelType);
            const status = getStatusBadge(adapter.healthStatus);
            const isSelected = adapter.id === selectedAdapterId;

            return (
              <div
                key={adapter.id}
                onClick={() => setSelectedAdapterId(adapter.id)}
                className={`p-4 rounded-3xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 shadow-xl'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 ${isSelected ? 'text-indigo-400' : 'text-slate-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-white">{adapter.displayName}</h4>
                        {adapter.isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{adapter.providerName}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-slate-500 text-[10px]">Inbound</span>
                    <div className="font-mono font-bold text-white">{adapter.metrics.inboundTotal.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Outbound</span>
                    <div className="font-mono font-bold text-white">{adapter.metrics.outboundTotal.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Avg Latency</span>
                    <div className="font-mono font-bold text-emerald-400">{adapter.metrics.avgLatencyMs}ms</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Adapter Detail & Configuration (7 cols) */}
        {selectedAdapter && (
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl">
                  {React.createElement(getChannelIcon(selectedAdapter.channelType), { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedAdapter.displayName}</h3>
                  <p className="text-xs text-slate-400">Provider: {selectedAdapter.providerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleAdapter(selectedAdapter.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    selectedAdapter.isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {selectedAdapter.isActive ? '● Active' : '○ Disabled'}
                </button>

                <button
                  onClick={() => handlePing(selectedAdapter.id)}
                  disabled={pingingId === selectedAdapter.id}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${pingingId === selectedAdapter.id ? 'animate-spin' : ''}`} />
                  <span>Ping Webhook</span>
                </button>
              </div>
            </div>

            {/* Ping Result Notification */}
            {pingResult && pingResult.id === selectedAdapter.id && (
              <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${
                pingResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>{pingResult.message}</span>
                </div>
                <span className="font-mono font-bold">{pingResult.latencyMs}ms roundtrip</span>
              </div>
            )}

            {/* Gateway Ingress Endpoints & Credentials */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                Webhook Ingress & Credentials
              </h4>

              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Webhook Ingress URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedAdapter.credentials.webhookUrl}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-indigo-300 font-mono text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedAdapter.credentials.webhookUrl, 'webhook')}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                    >
                      {copiedKey === 'webhook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">API Secret Key (Masked)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedAdapter.credentials.apiKeyMasked || '••••••••••••••••'}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Sender Identifier</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={selectedAdapter.credentials.senderIdentifier}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-emerald-300 text-xs focus:outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Rate Limit: <strong className="text-white">{selectedAdapter.credentials.rateLimitPerMinute} req/min</strong></span>
                  <span>Uptime: <strong className="text-emerald-400">{selectedAdapter.uptimePercent}%</strong></span>
                  <span>Errors (24h): <strong className={selectedAdapter.metrics.errorCount24h > 0 ? 'text-amber-400' : 'text-slate-400'}>{selectedAdapter.metrics.errorCount24h}</strong></span>
                </div>
              </div>
            </div>

            {/* Adapter Capabilities Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Supported Feature Capabilities
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {Object.entries(selectedAdapter.capabilities).map(([key, enabled]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      enabled
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="capitalize text-[11px]">{key.replace(/^supports/, '').replace(/([A-Z])/g, ' $1').trim()}</span>
                    {enabled ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span className="text-[10px] uppercase font-bold">N/A</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Invariant Callout */}
            <div className="p-4 bg-slate-950 border border-indigo-500/30 rounded-2xl text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-extrabold">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Integration Gateway Invariant #1</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                External channels are adapters, not dependencies. If WhatsApp or Meta Graph API experiences regional downtime, conversations are preserved safely in OMNI Universal Queue with zero message loss and automatic retry backoff.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
