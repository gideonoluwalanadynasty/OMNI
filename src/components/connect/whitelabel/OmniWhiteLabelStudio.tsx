import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Palette,
  Sliders,
  Bot,
  Shield,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash2,
  Lock,
  Layers,
  ChevronRight,
  Monitor,
  Smartphone,
  Info
} from 'lucide-react';
import {
  WhiteLabelTenant,
  WhiteLabelCustomerType,
  EcosystemMode,
  TenantFeatureFlags,
  WhiteLabelAiConfig
} from '../../../types/omni_white_label';

interface OmniWhiteLabelStudioProps {
  tenant: WhiteLabelTenant;
  onUpdateTenant: (updated: WhiteLabelTenant) => void;
  onPreviewTenant: (tenant: WhiteLabelTenant) => void;
}

export const OmniWhiteLabelStudio: React.FC<OmniWhiteLabelStudioProps> = ({
  tenant,
  onUpdateTenant,
  onPreviewTenant,
}) => {
  const [activeTab, setActiveTab] = useState<
    'branding' | 'domains' | 'features' | 'ai_config' | 'ecosystem' | 'preview'
  >('branding');

  const [branding, setBranding] = useState(tenant.branding);
  const [domains, setDomains] = useState(tenant.domains);
  const [features, setFeatures] = useState<TenantFeatureFlags>(tenant.features);
  const [aiConfig, setAiConfig] = useState<WhiteLabelAiConfig>(tenant.aiConfig);
  const [ecosystemMode, setEcosystemMode] = useState<EcosystemMode>(tenant.ecosystemMode);
  const [customerType, setCustomerType] = useState<WhiteLabelCustomerType>(tenant.customerType);

  const [newDomainInput, setNewDomainInput] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [newKnowledgeTitle, setNewKnowledgeTitle] = useState('');
  const [newKnowledgeType, setNewKnowledgeType] = useState<'internal_docs' | 'policy_pdf' | 'wiki_articles' | 'crm_tickets' | 'external_url'>('internal_docs');

  const handleSaveAll = () => {
    const updated: WhiteLabelTenant = {
      ...tenant,
      branding,
      domains,
      features,
      aiConfig,
      ecosystemMode,
      customerType,
    };
    onUpdateTenant(updated);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  const handleAddDomain = () => {
    if (!newDomainInput.trim()) return;
    const cleanDomain = newDomainInput.trim().toLowerCase().replace(/^https?:\/\//, '');
    const newDomainObj = {
      domain: cleanDomain,
      status: 'verified' as const,
      cnameRecord: 'cname.omni.network',
      txtVerificationToken: `omni-verify=${Math.random().toString(36).substring(2, 10)}`,
      sslIssued: true,
      sslExpiresAt: '2027-08-30',
      primaryRedirect: domains.length === 0,
    };
    setDomains([...domains, newDomainObj]);
    setNewDomainInput('');
  };

  const handleRemoveDomain = (domainStr: string) => {
    setDomains(domains.filter(d => d.domain !== domainStr));
  };

  const handleAddKnowledgeSource = () => {
    if (!newKnowledgeTitle.trim()) return;
    const newSource = {
      id: `ks-${Date.now()}`,
      name: newKnowledgeTitle.trim(),
      type: newKnowledgeType,
      itemCount: Math.floor(Math.random() * 80) + 12,
      lastSynced: 'Just now',
      status: 'indexed' as const,
    };
    setAiConfig({
      ...aiConfig,
      knowledgeSources: [...aiConfig.knowledgeSources, newSource],
    });
    setNewKnowledgeTitle('');
  };

  const handleRemoveKnowledgeSource = (id: string) => {
    setAiConfig({
      ...aiConfig,
      knowledgeSources: aiConfig.knowledgeSources.filter(s => s.id !== id),
    });
  };

  const toggleFeature = (key: keyof TenantFeatureFlags) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl p-0.5 border flex items-center justify-center shrink-0 shadow-xl overflow-hidden"
              style={{ borderColor: branding.primaryColor, backgroundColor: branding.surfaceColor }}
            >
              <img
                src={branding.logoUrl}
                alt={branding.brandName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
                  {branding.brandName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {customerType}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
                    ecosystemMode === 'isolated_private'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  {ecosystemMode === 'isolated_private' ? 'Private Isolated Tenant' : 'OMNI Ecosystem Federated'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">{branding.tagline}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 font-mono text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  {domains[0]?.domain || 'tenant.omni.network'}
                </span>
                <span>•</span>
                <span>{tenant.memberCount.toLocaleString()} Active Members</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">SOC2 & ITAR Guarded</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => onPreviewTenant({ ...tenant, branding, domains, features, aiConfig, ecosystemMode, customerType })}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-700 transition shadow-sm"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              Live Tenant Preview
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              Deploy Configuration
            </button>
          </div>
        </div>

        {savedBanner && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>White-label configuration deployed to all sovereign edge clusters and DNS routers.</span>
            </div>
            <span className="font-mono text-emerald-400/80">LATENCY: 14ms</span>
          </div>
        )}

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {[
            { id: 'branding', label: 'Brand & Visual Theme', icon: Palette },
            { id: 'domains', label: 'Custom Domains & SSL', icon: Globe, count: domains.length },
            { id: 'features', label: 'Feature Activation', icon: Sliders },
            { id: 'ai_config', label: 'White Label AI Copilot', icon: Bot },
            { id: 'ecosystem', label: 'Ecosystem & Isolation', icon: Shield },
            { id: 'preview', label: 'Interactive Canvas Preview', icon: Eye },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px] font-mono text-slate-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}

      {/* 1. BRANDING & VISUAL IDENTITY */}
      {activeTab === 'branding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-400" />
                Brand Identity & Metadata
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Platform Brand Name
                  </label>
                  <input
                    type="text"
                    value={branding.brandName}
                    onChange={e => setBranding({ ...branding, brandName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Aegis Quantum Dynamics"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Customer Vertical / Category
                  </label>
                  <select
                    value={customerType}
                    onChange={e => setCustomerType(e.target.value as WhiteLabelCustomerType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="company">Company / Enterprise</option>
                    <option value="university">University / Higher Learning</option>
                    <option value="church">Church / Religious Fellowship</option>
                    <option value="government">Government / Public Agency</option>
                    <option value="ngo">NGO / Non-Profit Mission</option>
                    <option value="media">Media / Journalism Organization</option>
                    <option value="association">Professional Association</option>
                    <option value="community">Independent Sovereign Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Brand Tagline & Mission Statement
                </label>
                <input
                  type="text"
                  value={branding.tagline}
                  onChange={e => setBranding({ ...branding, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Sovereign Enterprise Defense & Autonomous Systems"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Logo Asset URL (Light / Vector)
                  </label>
                  <input
                    type="text"
                    value={branding.logoUrl}
                    onChange={e => setBranding({ ...branding, logoUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Favicon / PWA Icon URL
                  </label>
                  <input
                    type="text"
                    value={branding.faviconUrl}
                    onChange={e => setBranding({ ...branding, faviconUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Color Scheme & Typography */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                Color Theme & Typography Tokens
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Accent
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding.primaryColor}
                      onChange={e => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={branding.primaryColor}
                      onChange={e => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Secondary Shade
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding.secondaryColor}
                      onChange={e => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={branding.secondaryColor}
                      onChange={e => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Highlight Glow
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding.accentColor}
                      onChange={e => setBranding({ ...branding, accentColor: e.target.value })}
                      className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={branding.accentColor}
                      onChange={e => setBranding({ ...branding, accentColor: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Surface Dark
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding.surfaceColor}
                      onChange={e => setBranding({ ...branding, surfaceColor: e.target.value })}
                      className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={branding.surfaceColor}
                      onChange={e => setBranding({ ...branding, surfaceColor: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Typography Pairing
                  </label>
                  <select
                    value={branding.fontFamily}
                    onChange={e => setBranding({ ...branding, fontFamily: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Space Grotesk">Space Grotesk (High-Tech / Aerospace)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean Enterprise)</option>
                    <option value="Inter">Inter (System / High Density)</option>
                    <option value="Cinzel">Cinzel (Academic / Classical Dignity)</option>
                    <option value="Outfit">Outfit (Friendly / Community Warmth)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Corner Radius Style
                  </label>
                  <select
                    value={branding.borderRadius}
                    onChange={e => setBranding({ ...branding, borderRadius: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="none">Sharp Geometric (0px)</option>
                    <option value="sm">Subtle (6px)</option>
                    <option value="md">Balanced (10px)</option>
                    <option value="lg">Modern Rounded (14px)</option>
                    <option value="xl">Organic Soft (20px)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Palette Preview Card */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-3">Live Component Swatch</h3>
              <div
                className="p-5 rounded-2xl border space-y-4 shadow-xl transition-all"
                style={{
                  backgroundColor: branding.surfaceColor,
                  borderColor: branding.primaryColor + '40',
                }}
              >
                <div className="flex items-center gap-3">
                  <img src={branding.logoUrl} alt="logo" className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{branding.brandName}</h4>
                    <p className="text-[11px] text-slate-400">{branding.tagline}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    className="p-3 rounded-xl text-xs font-medium text-white flex items-center justify-between"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    <span>Primary Action Button</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  <div
                    className="p-3 rounded-xl text-xs font-medium border flex items-center justify-between"
                    style={{
                      borderColor: branding.secondaryColor,
                      color: branding.accentColor,
                      backgroundColor: branding.secondaryColor + '20',
                    }}
                  >
                    <span>Secondary Badge Accent</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-mono">
                  Font Family: {branding.fontFamily} • Radius: {branding.borderRadius}
                </p>
              </div>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-5 space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Mobile App Store Branding
              </h4>
              <p className="text-xs text-slate-400">
                Custom iOS and Android binaries can be generated automatically with matching app icons, push certificates, and sovereign domain endpoints.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOM DOMAINS & SSL */}
      {activeTab === 'domains' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400" />
                Custom Domains & Zero-Config SSL
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Route your custom corporate domain directly to your white-label OMNI instance with automated TLS 1.3 encryption and edge caching.
              </p>
            </div>

            {/* Add Domain Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={newDomainInput}
                  onChange={e => setNewDomainInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddDomain()}
                  placeholder="e.g. connect.yourcompany.com or community.yourorg.org"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                onClick={handleAddDomain}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                Add Domain
              </button>
            </div>

            {/* Domain List */}
            <div className="space-y-3">
              {domains.map((dom, idx) => (
                <div
                  key={dom.domain}
                  className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">{dom.domain}</span>
                        {dom.primaryRedirect && (
                          <span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded text-[10px] font-bold">
                            PRIMARY
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          SSL ACTIVE
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 font-mono">
                        <span>CNAME: {dom.cnameRecord}</span>
                        <span>•</span>
                        <span>TLS 1.3 (Auto-Renew: {dom.sslExpiresAt})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(dom.txtVerificationToken);
                        setCopiedToken(true);
                        setTimeout(() => setCopiedToken(false), 2000);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedToken ? 'Token Copied' : 'Copy TXT Token'}
                    </button>
                    {domains.length > 1 && (
                      <button
                        onClick={() => handleRemoveDomain(dom.domain)}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DNS Instructions Callout */}
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                DNS Configuration Guide for Domain Registrar (Cloudflare, GoDaddy, AWS Route53)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">RECORD TYPE</span>
                  <span className="text-sky-400 font-bold">CNAME</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">HOST / NAME</span>
                  <span className="text-white font-bold">connect (or @)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">POINTS TO / TARGET</span>
                  <span className="text-emerald-400 font-bold">cname.omni.network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FEATURE ACTIVATION MATRIX */}
      {activeTab === 'features' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              White Label Feature Matrix & Module Controls
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Toggle specific modules on or off for your organization. Inactive modules will be completely hidden from employee and community navigation menus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'socialFeed', label: 'Social Feed & Broadcasts', desc: 'Org-wide newsfeed, reactions, polls, and media posts' },
              { key: 'messagingDirect', label: 'Direct & Group Messaging', desc: 'End-to-end encrypted messaging, voice notes, and file drops' },
              { key: 'spacesCommunities', label: 'Spaces & Channels', desc: 'Departmental spaces, project channels, and affinity groups' },
              { key: 'knowledgeWiki', label: 'Knowledge Wiki & Docs', desc: 'Institutional playbooks, ITAR runbooks, and searchable wikis' },
              { key: 'voiceVideoMeetings', label: 'Voice & Video Meetings', desc: 'Sovereign WebRTC video rooms and company townhall streams' },
              { key: 'crmDirectory', label: 'Enterprise Member Directory', desc: 'Department hierarchy, skills taxonomy, and contact cards' },
              { key: 'aiAssistant', label: 'White Label AI Copilot', desc: 'Custom fine-tuned bot grounded on your private documents' },
              { key: 'learningLms', label: 'Learning & Onboarding LMS', desc: 'Employee onboarding tracks, courses, and certifications' },
              { key: 'eventsWebinars', label: 'Events & Summits Calendar', desc: 'Virtual conferences, RSVP management, and calendar sync' },
              { key: 'commerceMarketplace', label: 'Commerce & Storefront', desc: 'Internal gear store, course sales, and digital merch checkout' },
              { key: 'creatorMonetization', label: 'Creator & Patron Tipping', desc: 'Paid membership tiers and patron creator subscriptions' },
              { key: 'adsCampaigns', label: 'Internal Ads & Promotions', desc: 'Targeted announcement banners and sponsor promotions' },
            ].map(f => {
              const isEnabled = features[f.key as keyof TenantFeatureFlags];
              return (
                <div
                  key={f.key}
                  onClick={() => toggleFeature(f.key as keyof TenantFeatureFlags)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                    isEnabled
                      ? 'bg-indigo-950/30 border-indigo-500/40 text-white'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {f.label}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{f.desc}</p>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 mt-0.5 ${
                      isEnabled ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. WHITE LABEL AI CONFIGURATION */}
      {activeTab === 'ai_config' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                White Label AI Assistant Persona & Grounding
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    AI Assistant Name
                  </label>
                  <input
                    type="text"
                    value={aiConfig.assistantName}
                    onChange={e => setAiConfig({ ...aiConfig, assistantName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Aegis Intelligence Sentinel"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Persona Tone & Cadence
                  </label>
                  <select
                    value={aiConfig.personaTone}
                    onChange={e => setAiConfig({ ...aiConfig, personaTone: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="executive">Executive / Strategic Defense</option>
                    <option value="academic">Academic & Peer-Reviewed</option>
                    <option value="pastoral">Pastoral & Encouraging Ministry</option>
                    <option value="analytical">Analytical & Scientific</option>
                    <option value="professional">Professional Corporate</option>
                    <option value="friendly">Warm & Community Friendly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  System Directive & Governance Instructions
                </label>
                <textarea
                  rows={4}
                  value={aiConfig.customInstructions}
                  onChange={e => setAiConfig({ ...aiConfig, customInstructions: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                  placeholder="Define strict operational guidelines, privacy boundaries, and behavior rules..."
                />
              </div>

              {/* Knowledge Sources Grounding */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Private Knowledge Grounding Indices ({aiConfig.knowledgeSources.length})
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newKnowledgeTitle}
                    onChange={e => setNewKnowledgeTitle(e.target.value)}
                    placeholder="e.g. Employee Handbook 2026 or API Runbook"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    value={newKnowledgeType}
                    onChange={e => setNewKnowledgeType(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="internal_docs">Internal Docs (.docx / .md)</option>
                    <option value="policy_pdf">Policy PDF</option>
                    <option value="wiki_articles">Wiki Articles</option>
                    <option value="crm_tickets">Support Tickets</option>
                    <option value="external_url">External Documentation URL</option>
                  </select>
                  <button
                    onClick={handleAddKnowledgeSource}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Source
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {aiConfig.knowledgeSources.map(ks => (
                    <div
                      key={ks.id}
                      className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="font-bold text-white">{ks.name}</span>
                          <span className="text-slate-500 ml-2 font-mono text-[10px]">
                            ({ks.itemCount} items • {ks.type})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-mono">Synced {ks.lastSynced}</span>
                        <button
                          onClick={() => handleRemoveKnowledgeSource(ks.id)}
                          className="text-slate-500 hover:text-rose-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Usage & Quotas */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Monthly AI Token Consumption
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tokens Consumed</span>
                  <span className="text-white font-mono font-bold">
                    {(aiConfig.tokensConsumedThisMonth / 1000000).toFixed(2)}M / {(aiConfig.tokenMonthlyQuota / 1000000).toFixed(0)}M
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full"
                    style={{ width: `${(aiConfig.tokensConsumedThisMonth / aiConfig.tokenMonthlyQuota) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Powered by Gemini 2.5 Flash Enterprise SDK with zero retention agreement.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Public / Customer-Facing AI Access</span>
                  <input
                    type="checkbox"
                    checked={aiConfig.publicCustomerFacing}
                    onChange={e => setAiConfig({ ...aiConfig, publicCustomerFacing: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ECOSYSTEM FEDERATION VS PRIVATE ISOLATION */}
      {activeTab === 'ecosystem' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Sovereign Ecosystem Boundary & Isolation Controls
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Decide whether your organization operates as a strictly quarantined sovereign silo or actively federates with the global OMNI ecosystem directory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode 1: Isolated Private */}
            <div
              onClick={() => setEcosystemMode('isolated_private')}
              className={`p-6 rounded-2xl border cursor-pointer transition space-y-4 relative ${
                ecosystemMode === 'isolated_private'
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-xl shadow-amber-500/5'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-6 h-6" />
                </div>
                {ecosystemMode === 'isolated_private' && (
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACTIVE MODE
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Private Isolated Tenant (Air-Gapped)</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Completely isolated from the public OMNI network. Employees cannot be found in global search, public users cannot join without enterprise SSO invitations, and data never leaves dedicated tenant cryptographic tables.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strict ITAR & SOC2 compliance isolation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Corporate SAML / Okta / Azure AD required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zero cross-tenant indexing</span>
                </div>
              </div>
            </div>

            {/* Mode 2: Federated Ecosystem */}
            <div
              onClick={() => setEcosystemMode('omni_ecosystem_federated')}
              className={`p-6 rounded-2xl border cursor-pointer transition space-y-4 relative ${
                ecosystemMode === 'omni_ecosystem_federated'
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-xl shadow-emerald-500/5'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>
                {ecosystemMode === 'omni_ecosystem_federated' && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACTIVE MODE
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">OMNI Ecosystem Federated</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Your white-label platform is seamlessly pooled with the broader OMNI universe. Your public courses, articles, and open spaces appear on OMNI Universal Search, and users can use their sovereign universal identity.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Universal OMNI Identity login supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Public discovery and cross-network tipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Optional cross-community partner bridges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. INTERACTIVE CANVAS PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white">Previewing:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300">
                https://{domains[0]?.domain || 'connect.aegisquantum.io'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-md text-xs transition ${previewDevice === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-md text-xs transition ${previewDevice === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`mx-auto transition-all border border-slate-800 rounded-2xl overflow-hidden shadow-2xl ${
              previewDevice === 'mobile' ? 'max-w-sm' : 'w-full'
            }`}
            style={{ backgroundColor: branding.surfaceColor }}
          >
            {/* Mock Header */}
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: branding.primaryColor + '30', backgroundColor: branding.surfaceColor }}
            >
              <div className="flex items-center gap-3">
                <img src={branding.logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">{branding.brandName}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{branding.tagline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-lg"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  Launch Workplace
                </span>
              </div>
            </div>

            {/* Mock Feed / Hero */}
            <div className="p-6 space-y-4">
              <div
                className="p-5 rounded-xl border space-y-3"
                style={{
                  backgroundColor: branding.primaryColor + '10',
                  borderColor: branding.primaryColor + '40',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: branding.accentColor }}
                  />
                  <span className="text-xs font-bold text-white">Sovereign Enterprise Network Active</span>
                </div>
                <h4 className="text-base font-bold text-white">Welcome to the {branding.brandName} Portal</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All enterprise spaces, communications, and knowledge assets are secured with post-quantum encryption.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {features.socialFeed && (
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Feed & Posts
                  </div>
                )}
                {features.spacesCommunities && (
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    Spaces & Depts
                  </div>
                )}
                {features.knowledgeWiki && (
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Knowledge Wiki
                  </div>
                )}
                {features.aiAssistant && (
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {aiConfig.assistantName}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
