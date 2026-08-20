import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Download, CodeXml, Layers, Sparkles, Terminal } from 'lucide-react';
import { SEED_WORKS_APPLICATION_MANIFEST } from '../../data/omni_works_seed';

interface WorksManifestInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorksManifestInspectorModal: React.FC<WorksManifestInspectorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'json' | 'yaml'>('formatted');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const manifest = SEED_WORKS_APPLICATION_MANIFEST;
  const jsonString = JSON.stringify(manifest, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'omni-works-manifest.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">OMNI Works Application Manifest</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v{manifest.version}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Registered in Core
                </span>
              </div>
              <p className="text-xs text-neutral-400">Cryptographic Applet Specification &amp; Ecosystem Service Contract</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Export</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-neutral-950/40 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'formatted'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Structured View
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'json'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Raw JSON
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHA-256 Digest: 0x8a92f04e1bc978a3...</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm space-y-6">
          {activeTab === 'formatted' ? (
            <>
              {/* Core Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Application Identity</div>
                  <div className="font-semibold text-white text-base">{manifest.appName}</div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">ID: {manifest.appId}</div>
                  <div className="text-xs text-neutral-400 font-mono">Slug: /{manifest.slug}</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Author &amp; Organization</div>
                  <div className="font-semibold text-white">{manifest.author.name}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{manifest.author.organization}</div>
                  <div className="text-xs text-indigo-400 font-mono">{manifest.author.email}</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Security &amp; Compliance</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">SOC2 Type II</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold border border-cyan-500/20">DID / WebAuthn</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-semibold border border-purple-500/20">E2EE Mesh</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-semibold border border-amber-500/20">GDPR Zero-Ret</span>
                  </div>
                </div>
              </div>

              {/* Scopes & Permissions */}
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Required Ecosystem Scopes (OAuth / DID Auth)</div>
                <div className="flex flex-wrap gap-1.5">
                  {manifest.requiredScopes.map((scope) => (
                    <span key={scope} className="px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-300 font-mono text-[11px] border border-neutral-700/60">
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* API Endpoints */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Service API Endpoints ({manifest.apiEndpoints.length})</div>
                  <span className="text-xs text-neutral-400 font-mono">Gateway: {manifest.deployment.routes.apiGateway}</span>
                </div>
                <div className="border border-neutral-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-950 text-neutral-400 font-semibold border-b border-neutral-800">
                      <tr>
                        <th className="p-2.5">Method</th>
                        <th className="p-2.5">Path</th>
                        <th className="p-2.5">Description</th>
                        <th className="p-2.5">Auth</th>
                        <th className="p-2.5">Rate Limit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/40 font-mono">
                      {manifest.apiEndpoints.map((ep, idx) => (
                        <tr key={idx} className="hover:bg-neutral-800/40 transition-colors">
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                              ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {ep.method}
                            </span>
                          </td>
                          <td className="p-2.5 text-neutral-200 font-semibold">{ep.path}</td>
                          <td className="p-2.5 text-neutral-400 font-sans">{ep.description}</td>
                          <td className="p-2.5 text-neutral-300">{ep.auth}</td>
                          <td className="p-2.5 text-indigo-400">{ep.rateLimit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Webhook Topics */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Subscribed &amp; Emitted Webhook Topics</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {manifest.webhookTopics.map((wh, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-indigo-400">{wh.topic}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">event</span>
                      </div>
                      <p className="text-xs text-neutral-400">{wh.description}</p>
                      <div className="bg-neutral-900 rounded p-2 text-[10px] font-mono text-neutral-400 overflow-x-auto">
                        <code>{wh.samplePayloadSchema}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities & Formats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Supported File Formats</div>
                  <div className="flex flex-wrap gap-1.5">
                    {manifest.supportedFileFormats.map((fmt) => (
                      <span key={fmt} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-xs">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">CRDT &amp; Storage Protocols</div>
                  <div className="text-xs text-neutral-300 font-mono mb-1">{manifest.crdtProtocol}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {manifest.storageAdapters.map((sa) => (
                      <span key={sa} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[11px] border border-indigo-500/20">
                        {sa}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
              <pre>{jsonString}</pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Registered in OMNI Core System Registry</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
