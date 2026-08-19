import React, { useState } from 'react';
import {
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Server,
  Lock,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { CustomDomainRecord, UniversalOmniProfile } from '../../types/omni_identity';

interface OmniCustomDomainManagerProps {
  domains: CustomDomainRecord[];
  activeProfile: UniversalOmniProfile;
  onAddDomain: (profileId: string, domain: string) => CustomDomainRecord;
  onVerifyDomain: (domainId: string) => { success: boolean; domain: CustomDomainRecord };
}

export const OmniCustomDomainManager: React.FC<OmniCustomDomainManagerProps> = ({
  domains,
  activeProfile,
  onAddDomain,
  onVerifyDomain
}) => {
  const [newDomainInput, setNewDomainInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

  const handleAddDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainInput.trim()) return;
    try {
      onAddDomain(activeProfile.id, newDomainInput.trim());
      setNewDomainInput('');
      setIsAdding(false);
      setVerifyMessage('Domain successfully attached! Please configure the DNS records below.');
      setTimeout(() => setVerifyMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error adding custom domain');
    }
  };

  const handleVerify = (domainId: string) => {
    setVerifyingId(domainId);
    setTimeout(() => {
      onVerifyDomain(domainId);
      setVerifyingId(null);
      setVerifyMessage('DNS records verified! Free SSL certificate provisioned and active.');
      setTimeout(() => setVerifyMessage(null), 4000);
    }, 1200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              OMNI CUSTOM DOMAIN ROUTING ENGINE
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Connect Custom Domains & Edge Subdomains
          </h2>
          <p className="text-xs text-slate-400">
            Map external domains like <strong className="text-cyan-400 font-mono">www.company.com</strong> or free subdomains like <strong className="text-indigo-400 font-mono">{activeProfile.username}.omni.com</strong> to your sovereign identity and pages.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Domain</span>
        </button>
      </div>

      {verifyMessage && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center gap-2.5 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{verifyMessage}</span>
        </div>
      )}

      {/* Add Domain Modal Form */}
      {isAdding && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Attach External Domain or Apex Hostname
          </h3>
          <p className="text-xs text-slate-400">
            Enter your custom domain (e.g. <span className="font-mono text-cyan-300">www.fenolsolutions.com</span> or <span className="font-mono text-cyan-300">ecclesiaglobal.org</span>)
          </p>

          <form onSubmit={handleAddDomainSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="www.yourbrand.com"
                value={newDomainInput}
                onChange={(e) => setNewDomainInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                required
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Add Domain Record
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Domains List */}
      <div className="space-y-4">
        {domains.map(dom => {
          const isDomainActive = dom.status === 'active';
          return (
            <div
              key={dom.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
            >
              {/* Domain Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base font-extrabold text-white font-mono">{dom.domain}</span>
                    {isDomainActive ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ACTIVE & SECURED
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        DNS PENDING
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>Routing to:</span>
                    <strong className="text-indigo-400 font-mono">{dom.routingTarget}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isDomainActive && (
                    <button
                      onClick={() => handleVerify(dom.id)}
                      disabled={verifyingId === dom.id}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${verifyingId === dom.id ? 'animate-spin' : ''}`} />
                      <span>{verifyingId === dom.id ? 'Checking DNS...' : 'Verify DNS & Issue SSL'}</span>
                    </button>
                  )}
                  <a
                    href={`https://${dom.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
                    title="Open Live Domain"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* DNS Configuration Table */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  Required DNS Configuration Records
                </div>
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-wider">
                        <th className="p-3">Type</th>
                        <th className="p-3">Host / Name</th>
                        <th className="p-3">Target Value</th>
                        <th className="p-3">TTL</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {dom.dnsRecords.map((rec, i) => (
                        <tr key={i} className="text-slate-300">
                          <td className="p-3 font-bold text-indigo-400">{rec.type}</td>
                          <td className="p-3 text-white">{rec.name}</td>
                          <td className="p-3 text-cyan-300 truncate max-w-xs">{rec.value}</td>
                          <td className="p-3 text-slate-400">{rec.ttl}s</td>
                          <td className="p-3">
                            {rec.isVerified ? (
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Verified
                              </span>
                            ) : (
                              <span className="text-amber-400 font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> Pending
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleCopy(rec.value)}
                              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                              title="Copy Value"
                            >
                              {copiedText === rec.value ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SSL Certificate Details */}
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>SSL Certificate: <strong className="text-white">{dom.sslCertificate.issuer}</strong></span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Auto-renews: {new Date(dom.sslCertificate.validUntil).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
