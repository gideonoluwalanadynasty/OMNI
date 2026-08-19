import React, { useState } from 'react';
import {
  WhiteLabelBrowserConfig,
  WhiteLabelDnsStatus
} from '../../../types/whitelabel_browser';
import { OMNI_DOMAINS_CATALOG } from '../../../data/mockWhiteLabelData';
import {
  Globe,
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Lock,
  Copy,
  ExternalLink,
  ShieldCheck,
  Check,
  Server,
  ArrowRight
} from 'lucide-react';

interface DomainsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WhiteLabelBrowserConfig;
  onUpdateDomainConfig: (domainConfig: WhiteLabelBrowserConfig['domain']) => void;
}

export const DomainsManagerModal: React.FC<DomainsManagerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateDomainConfig
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'dns_setup' | 'domain_catalog'>('dns_setup');
  const [dnsStatus, setDnsStatus] = useState<WhiteLabelDnsStatus>(config.domain.dnsStatus);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [subdomainInput, setSubdomainInput] = useState(config.domain.subdomain);
  const [customDomainInput, setCustomDomainInput] = useState(config.domain.customDomain);

  if (!isOpen) return null;

  const handleCopy = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerifyDns = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setDnsStatus('verified');
      setIsVerifying(false);
      onUpdateDomainConfig({
        ...config.domain,
        subdomain: subdomainInput,
        customDomain: customDomainInput,
        dnsStatus: 'verified',
        sslStatus: 'issued'
      });
    }, 1200);
  };

  const handleRegisterDomain = (dom: typeof OMNI_DOMAINS_CATALOG[0]) => {
    setCustomDomainInput(dom.domain);
    setActiveTab('dns_setup');
    onUpdateDomainConfig({
      ...config.domain,
      customDomain: dom.domain,
      dnsStatus: 'verified',
      sslStatus: 'issued',
      autoDnsManagedByOmni: true
    });
  };

  const filteredCatalog = OMNI_DOMAINS_CATALOG.filter(d =>
    d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.extension.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
                <span>OMNI Domains & Edge Routing Engine</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[10px]">
                  Zero-SSL TLS 1.3
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Configure instant subdomains or bind custom apex/CNAME domains with automated TLS certificates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-800 bg-stone-950/50 px-4 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('dns_setup')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'dns_setup'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>DNS Configuration & SSL</span>
          </button>
          <button
            onClick={() => setActiveTab('domain_catalog')}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'domain_catalog'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>OMNI Domains Registry (.browser, .ai, .omni)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs">
          {activeTab === 'dns_setup' ? (
            <div className="space-y-5">
              {/* Instant Subdomain Setup */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-stone-200">1. Instant Subdomain (Zero Setup Required)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px]">
                    Auto-Provisioned
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl font-mono text-stone-200">
                    <input
                      type="text"
                      value={subdomainInput}
                      onChange={(e) => setSubdomainInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="bg-transparent outline-none text-cyan-300 font-bold w-36"
                    />
                    <span className="text-stone-500">.omnibrowser.com</span>
                  </div>
                  <a
                    href={`https://${subdomainInput}.omnibrowser.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Custom Domain & DNS Record Verification */}
              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-stone-200">2. Custom Enterprise Domain (e.g. browser.acme.com)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] border ${
                        dnsStatus === 'verified'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {dnsStatus === 'verified' ? 'DNS Verified & Active' : 'DNS Propagation Pending'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-stone-400">Custom Domain Hostname</label>
                  <input
                    type="text"
                    value={customDomainInput}
                    onChange={(e) => setCustomDomainInput(e.target.value)}
                    placeholder="browser.mycompany.com"
                    className="w-full bg-stone-900 border border-stone-700 px-3 py-2 rounded-xl text-stone-200 font-mono outline-none focus:border-cyan-500"
                  />
                </div>

                {/* DNS Records Table */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-semibold text-stone-400">
                    Add the following DNS records at your domain registrar:
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    {/* CNAME Record */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">CNAME</span>
                        <div>
                          <div className="text-stone-400 text-[10px]">Host: {customDomainInput || 'browser'}</div>
                          <div className="text-stone-200 font-bold">{config.domain.cnameTarget}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(config.domain.cnameTarget, 'cname')}
                        className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                      >
                        {copiedKey === 'cname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* TXT Verification */}
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold">TXT</span>
                        <div>
                          <div className="text-stone-400 text-[10px]">Host: _omni-challenge</div>
                          <div className="text-stone-200 font-bold truncate max-w-xs">{config.domain.txtVerificationKey}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(config.domain.txtVerificationKey, 'txt')}
                        className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                      >
                        {copiedKey === 'txt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* SSL Status */}
                <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-stone-200">Automated ECC TLS/SSL Certificate</div>
                      <div className="text-[10px] text-stone-400 font-mono">Issuer: {config.domain.sslIssuer} • Auto-Renews Annually</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono">
                    Active & Secure
                  </span>
                </div>

                {/* Verify DNS Button */}
                <div className="flex justify-end pt-2">
                  <button
                    disabled={isVerifying}
                    onClick={handleVerifyDns}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold flex items-center gap-2 transition-all shadow-md"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                    <span>{isVerifying ? 'Validating DNS Records...' : 'Verify DNS & Link Custom Domain'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* OMNI Domains Catalog Registry */
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-800 rounded-xl">
                <Search className="w-4 h-4 text-stone-400 ml-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search available domains (.browser, .ai, .omni, .tech)..."
                  className="w-full bg-transparent text-stone-200 outline-none placeholder:text-stone-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                {filteredCatalog.map((dom, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-cyan-800/80 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-cyan-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-200 font-mono text-sm flex items-center gap-2">
                          <span>{dom.domain}</span>
                          <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 text-[10px] font-sans">
                            {dom.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {dom.available ? 'Instant 1-Click DNS & Auto SSL' : 'Already Registered'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right font-mono">
                        <div className="font-bold text-stone-200">
                          {dom.priceAnnual === 0 ? 'FREE' : `$${dom.priceAnnual.toFixed(2)}/yr`}
                        </div>
                        <div className="text-[10px] text-stone-500">Includes Cloudflare Edge</div>
                      </div>

                      <button
                        disabled={!dom.available}
                        onClick={() => handleRegisterDomain(dom)}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <span>{dom.available ? 'Link & Connect' : 'Unavailable'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="text-[11px] text-stone-500 font-mono">
            Subdomain: {subdomainInput}.omnibrowser.com • Custom: {customDomainInput || 'None'}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
