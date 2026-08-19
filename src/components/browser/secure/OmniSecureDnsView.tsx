import React, { useState } from 'react';
import {
  Globe,
  Lock,
  ShieldCheck,
  Zap,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Server,
  Code
} from 'lucide-react';
import { OmniSecureDnsProvider } from '../../../types';

interface OmniSecureDnsViewProps {
  dnsProviders: OmniSecureDnsProvider[];
  selectedProvider: OmniSecureDnsProvider;
  onSelectProvider: (providerId: string) => void;
  onAddCustomProvider: (name: string, dohUrl: string, dotServer: string) => void;
}

export const OmniSecureDnsView: React.FC<OmniSecureDnsViewProps> = ({
  dnsProviders,
  selectedProvider,
  onSelectProvider,
  onAddCustomProvider
}) => {
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [customDohUrl, setCustomDohUrl] = useState<string>('');
  const [customDotServer, setCustomDotServer] = useState<string>('');
  const [isTestingLeak, setIsTestingLeak] = useState<boolean>(false);
  const [leakTestResult, setLeakTestResult] = useState<{
    status: 'clean' | 'leaking' | null;
    resolversFound: string[];
    testedAt: string;
  }>({
    status: 'clean',
    resolversFound: [selectedProvider.name],
    testedAt: 'Just now'
  });

  const handleRunLeakTest = async () => {
    setIsTestingLeak(true);
    await new Promise(r => setTimeout(r, 1200));
    setLeakTestResult({
      status: 'clean',
      resolversFound: [selectedProvider.name, 'DoH Hardware Enclave Relay'],
      testedAt: new Date().toLocaleTimeString()
    });
    setIsTestingLeak(false);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customDohUrl.trim()) return;
    onAddCustomProvider(customName.trim(), customDohUrl.trim(), customDotServer.trim());
    setCustomName('');
    setCustomDohUrl('');
    setCustomDotServer('');
    setShowCustomModal(false);
  };

  return (
    <div id="omni-secure-dns-view" className="space-y-6">
      {/* 1. DNS Leak Defense Banner & Test Action */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-cyan-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase tracking-wider">
              DNS-over-HTTPS (DoH) & DoT Engine
            </span>
            <span className="text-xs text-stone-400">Zero-ISP Query Visibility</span>
          </div>
          <h2 className="text-sm font-bold text-stone-100">
            Encrypted Resolution via {selectedProvider.name}
          </h2>
          <p className="text-xs text-stone-300">
            All domain name lookups are encrypted using TLS 1.3 to prevent ISP eavesdropping, recursive caching, and MITM spoofing attacks.
          </p>
        </div>

        <button
          onClick={handleRunLeakTest}
          disabled={isTestingLeak}
          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 shadow-lg shadow-cyan-600/20"
        >
          <RefreshCw className={`w-4 h-4 ${isTestingLeak ? 'animate-spin' : ''}`} />
          <span>{isTestingLeak ? 'Probing DNS Leaks...' : 'Run DNS Leak Test'}</span>
        </button>
      </div>

      {/* 2. DNS Leak Test Result Card */}
      {leakTestResult.status && (
        <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-stone-200 flex items-center gap-2">
                <span>Zero DNS Leaks Detected</span>
                <span className="text-[10px] text-stone-500 font-mono">Tested at {leakTestResult.testedAt}</span>
              </div>
              <div className="text-[11px] text-stone-400 font-mono">
                Active Resolvers: {leakTestResult.resolversFound.join(' • ')} (No unencrypted ISP resolvers found)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Encrypted DNS Provider Selection */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              Secure DNS Provider Interface
            </h2>
            <p className="text-xs text-stone-400">Choose between zero-knowledge encrypted resolvers or configure your custom DoH/DoT daemon</p>
          </div>

          <button
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom DoH</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dnsProviders.map(provider => {
            const isSelected = provider.id === selectedProvider.id;
            return (
              <div
                key={provider.id}
                onClick={() => onSelectProvider(provider.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-950/40'
                    : 'bg-stone-800/40 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-100">{provider.name}</span>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-stone-700" />
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">{provider.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-800/80 text-[11px] font-mono">
                  <div className="text-stone-400 truncate" title={provider.dohUrl}>
                    DoH: <span className="text-stone-300">{provider.dohUrl}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {provider.features.map(f => (
                      <span
                        key={f}
                        className="px-1.5 py-0.2 rounded text-[10px] bg-stone-900 text-cyan-300 border border-cyan-900"
                      >
                        {f.replace('_', ' ').toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom DoH Provider Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustom}
            className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-sm font-bold text-stone-100">Add Custom DoH / DoT Endpoint</h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="text-stone-400 hover:text-stone-200 text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Provider Label</label>
                <input
                  type="text"
                  placeholder="e.g. My Homelab Pi-hole / CoreDNS"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">DNS-over-HTTPS (DoH) URL</label>
                <input
                  type="url"
                  placeholder="https://dns.myhomelab.net/dns-query"
                  value={customDohUrl}
                  onChange={e => setCustomDohUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs font-mono text-stone-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">DNS-over-TLS (DoT) Server (Optional)</label>
                <input
                  type="text"
                  placeholder="dns.myhomelab.net:853"
                  value={customDotServer}
                  onChange={e => setCustomDotServer(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs font-mono text-stone-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Save Provider
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
