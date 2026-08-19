import React, { useState } from 'react';
import {
  WhiteLabelBrowserConfig,
  WhiteLabelStatus,
  WhiteLabelPinnedDial,
  WhiteLabelNewsSource,
  WhiteLabelKnowledgeDoc,
  WhiteLabelPricingTier,
  WhiteLabelUserRole
} from '../../../types/whitelabel_browser';
import {
  INITIAL_WHITE_LABEL_PRESETS,
  CURATED_ENTERPRISE_EXTENSIONS
} from '../../../data/mockWhiteLabelData';
import { WhiteLabelLivePreview } from './WhiteLabelLivePreview';
import { AiBrowserGeneratorModal } from './AiBrowserGeneratorModal';
import { DomainsManagerModal } from './DomainsManagerModal';
import {
  Sparkles,
  Sliders,
  Globe,
  Search,
  Radio,
  Bot,
  Shield,
  Layers,
  DollarSign,
  Megaphone,
  BarChart3,
  Users,
  Handshake,
  Receipt,
  Eye,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  Download,
  Copy,
  Check,
  Building2,
  Lock,
  Server,
  Zap,
  RefreshCw,
  Edit3,
  Key,
  ShieldCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const OmniWhiteLabelRoot: React.FC = () => {
  const [projects, setProjects] = useState<WhiteLabelBrowserConfig[]>(INITIAL_WHITE_LABEL_PRESETS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(INITIAL_WHITE_LABEL_PRESETS[0].id);
  const [activeTab, setActiveTab] = useState<
    | 'brand'
    | 'logos'
    | 'domain'
    | 'homepage'
    | 'search'
    | 'news'
    | 'ai_assistant'
    | 'vpn'
    | 'extensions'
    | 'monetization'
    | 'advertising'
    | 'analytics'
    | 'users'
    | 'reseller'
    | 'billing'
  >('brand');

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDomainsModalOpen, setIsDomainsModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [deploySuccess, setDeploySuccess] = useState(false);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const updateCurrentProject = (updated: Partial<WhiteLabelBrowserConfig>) => {
    setProjects(prev =>
      prev.map(p => (p.id === currentProject.id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p))
    );
  };

  const handleCopy = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDeployChanges = () => {
    setDeploySuccess(true);
    setTimeout(() => setDeploySuccess(false), 3000);
  };

  const handleAddSpeedDial = () => {
    const newDial: WhiteLabelPinnedDial = {
      id: `dial-${Date.now()}`,
      name: 'New Pinned Tile',
      url: 'https://example.com',
      iconName: 'Globe',
      category: 'General',
      color: 'text-indigo-400 bg-indigo-950/80 border-indigo-800'
    };
    updateCurrentProject({
      homepage: {
        ...currentProject.homepage,
        pinnedSpeedDials: [...currentProject.homepage.pinnedSpeedDials, newDial]
      }
    });
  };

  const handleDeleteSpeedDial = (dialId: string) => {
    updateCurrentProject({
      homepage: {
        ...currentProject.homepage,
        pinnedSpeedDials: currentProject.homepage.pinnedSpeedDials.filter(d => d.id !== dialId)
      }
    });
  };

  const handleAddNewsSource = () => {
    const newSource: WhiteLabelNewsSource = {
      id: `ns-${Date.now()}`,
      name: 'Custom Industry RSS',
      rssUrl: 'https://news.ycombinator.com/rss',
      category: 'Tech',
      enabled: true
    };
    updateCurrentProject({
      newsFeed: {
        ...currentProject.newsFeed,
        sources: [...currentProject.newsFeed.sources, newSource]
      }
    });
  };

  const handleAddKnowledgeDoc = () => {
    const newDoc: WhiteLabelKnowledgeDoc = {
      id: `kb-${Date.now()}`,
      name: 'Internal_Operations_Manual_2026.pdf',
      type: 'pdf',
      docCount: 75,
      status: 'indexed',
      lastSyncedAt: new Date().toISOString().split('T')[0]
    };
    updateCurrentProject({
      aiAssistant: {
        ...currentProject.aiAssistant,
        knowledgeBases: [...currentProject.aiAssistant.knowledgeBases, newDoc]
      }
    });
  };

  const handleAddTeamMember = () => {
    const newMem = {
      id: `u-${Date.now()}`,
      name: 'DevOps Lead',
      email: `devops@${currentProject.slug}.com`,
      role: 'IT_SecOps' as WhiteLabelUserRole,
      addedAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      ssoEnabled: true,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80'
    };
    updateCurrentProject({
      usersPermissions: {
        ...currentProject.usersPermissions,
        teamMembers: [...currentProject.usersPermissions.teamMembers, newMem]
      }
    });
  };

  const navTabs = [
    { id: 'brand', label: 'Brand & Identity', icon: Sliders },
    { id: 'logos', label: 'Logos & Assets', icon: Edit3 },
    { id: 'domain', label: 'Domain & SSL', icon: Globe },
    { id: 'homepage', label: 'Homepage & Tabs', icon: Layers },
    { id: 'search', label: 'Search Engine', icon: Search },
    { id: 'news', label: 'News Feed', icon: Radio },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Bot },
    { id: 'vpn', label: 'VPN & Tunneling', icon: Shield },
    { id: 'extensions', label: 'Extensions', icon: Zap },
    { id: 'monetization', label: 'Subscriptions', icon: DollarSign },
    { id: 'advertising', label: 'Advertising', icon: Megaphone },
    { id: 'analytics', label: 'Telemetry & Stats', icon: BarChart3 },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'reseller', label: 'Reseller & Affiliate', icon: Handshake },
    { id: 'billing', label: 'OMNI Billing & Ledger', icon: Receipt }
  ] as const;

  return (
    <div className="w-full h-full flex flex-col bg-stone-950 text-stone-100 overflow-y-auto">
      {/* Top Header Control Banner */}
      <div className="p-4 sm:p-5 bg-stone-900 border-b border-stone-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Project Brand & Selector */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg border border-stone-700"
              style={{ backgroundColor: currentProject.brand.accentColor || '#6366f1' }}
            >
              {currentProject.brand.brandName.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-stone-950 border border-stone-800 text-stone-100 font-bold text-sm rounded-xl px-3 py-1 outline-none cursor-pointer focus:border-indigo-500"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.domain.subdomain}.omnibrowser.com)
                    </option>
                  ))}
                </select>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE ON EDGE
                </span>
              </div>
              <div className="text-xs text-stone-400 mt-0.5 flex items-center gap-2">
                <span>Subdomain: <strong className="text-stone-300">{currentProject.domain.subdomain}.omnibrowser.com</strong></span>
                <span>•</span>
                <span>Custom: <strong className="text-cyan-400">{currentProject.domain.customDomain || 'Unbound'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Quick Engine Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 text-indigo-200 border border-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>AI Browser Wizard</span>
            </button>

            <button
              onClick={() => setIsDomainsModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>OMNI Domains</span>
            </button>

            <button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isPreviewOpen
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isPreviewOpen ? 'Exit Simulator' : 'Live Browser Simulator'}</span>
            </button>

            <button
              onClick={handleDeployChanges}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Publish & Deploy Changes</span>
            </button>
          </div>
        </div>

        {deploySuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Configuration successfully deployed across OMNI edge gateways and custom DNS nodes!</span>
            </div>
            <span className="font-mono text-[10px]">Zero-Downtime Hot Reload</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-t border-stone-800/80 pt-3">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsPreviewOpen(false);
                }}
                className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-stone-800 text-stone-100 border border-stone-700 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Body Content */}
      <div className="flex-1 p-5 max-w-7xl mx-auto w-full space-y-6">
        {isPreviewOpen ? (
          /* Live Interactive Browser Simulator */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-200">
                  Interactive Browser Sandbox Preview: &quot;{currentProject.brand.brandName}&quot;
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-[10px] font-mono">
                  Powered by OMNI
                </span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-xs text-indigo-400 hover:underline"
              >
                Back to Configuration Tabs
              </button>
            </div>

            <WhiteLabelLivePreview
              config={currentProject}
              onClosePreview={() => setIsPreviewOpen(false)}
              onEditConfig={() => setIsPreviewOpen(false)}
            />
          </div>
        ) : (
          /* Builder Modules */
          <div className="space-y-6">
            {/* 1. BRAND & IDENTITY */}
            {activeTab === 'brand' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-stone-100">Brand Identity & Visual Theme</h2>
                    <p className="text-xs text-stone-400">Configure public customer-facing branding, theme modes, and typography.</p>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview in Simulator</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Company & Name */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Company & Browser Names</h3>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Company Name</label>
                      <input
                        type="text"
                        value={currentProject.brand.companyName}
                        onChange={(e) => updateCurrentProject({
                          brand: { ...currentProject.brand, companyName: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Branded Browser Title (&quot;MyCompany Browser&quot;)</label>
                      <input
                        type="text"
                        value={currentProject.brand.brandName}
                        onChange={(e) => updateCurrentProject({
                          brand: { ...currentProject.brand, brandName: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none focus:border-indigo-500 font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Brand Tagline</label>
                      <input
                        type="text"
                        value={currentProject.brand.tagline}
                        onChange={(e) => updateCurrentProject({
                          brand: { ...currentProject.brand, tagline: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Support & Compliance Email</label>
                      <input
                        type="email"
                        value={currentProject.brand.supportEmail}
                        onChange={(e) => updateCurrentProject({
                          brand: { ...currentProject.brand, supportEmail: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Colors & Styling */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Theme Colors & Badges</h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-stone-400">Accent Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={currentProject.brand.accentColor}
                            onChange={(e) => updateCurrentProject({
                              brand: { ...currentProject.brand, accentColor: e.target.value }
                            })}
                            className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-stone-700"
                          />
                          <input
                            type="text"
                            value={currentProject.brand.accentColor}
                            onChange={(e) => updateCurrentProject({
                              brand: { ...currentProject.brand, accentColor: e.target.value }
                            })}
                            className="flex-1 bg-stone-950 border border-stone-800 px-2.5 py-1.5 rounded-xl font-mono text-stone-100 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-stone-400">Surface / Background</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={currentProject.brand.surfaceColor}
                            onChange={(e) => updateCurrentProject({
                              brand: { ...currentProject.brand, surfaceColor: e.target.value }
                            })}
                            className="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-stone-700"
                          />
                          <input
                            type="text"
                            value={currentProject.brand.surfaceColor}
                            onChange={(e) => updateCurrentProject({
                              brand: { ...currentProject.brand, surfaceColor: e.target.value }
                            })}
                            className="flex-1 bg-stone-950 border border-stone-800 px-2.5 py-1.5 rounded-xl font-mono text-stone-100 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Typography Font Family</label>
                      <select
                        value={currentProject.brand.fontFamily}
                        onChange={(e) => updateCurrentProject({
                          brand: { ...currentProject.brand, fontFamily: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none"
                      >
                        <option value="Inter, system-ui, sans-serif">Inter (Modern Clean Sans)</option>
                        <option value="JetBrains Mono, monospace">JetBrains Mono (Developer & Quant)</option>
                        <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (High Precision)</option>
                        <option value="system-ui, -apple-system, sans-serif">Native OS System Fonts</option>
                      </select>
                    </div>

                    {/* Powered by OMNI Badge Toggle */}
                    <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-stone-200">&quot;Powered by OMNI&quot; Attribution Badge</div>
                        <div className="text-[10px] text-stone-400">Display subtle sovereign engine attribution in top bar.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentProject.brand.poweredByOmniBadge}
                        onChange={(e) => updateCurrentProject({
                          brand: { ...currentProject.brand, poweredByOmniBadge: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. LOGOS & ASSETS */}
            {activeTab === 'logos' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">Logos, Favicons & Visual Assets</h2>
                  <p className="text-xs text-stone-400">Upload primary branding icons, splash screens, and browser tab favicons.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  {/* Primary Logo */}
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <div className="font-bold text-stone-200">Primary Brand Logo (Light/Dark)</div>
                    <div className="h-28 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center p-3">
                      <img src={currentProject.logos.logoUrl} alt="Logo" className="max-h-full object-contain rounded-lg" />
                    </div>
                    <input
                      type="text"
                      value={currentProject.logos.logoUrl}
                      onChange={(e) => updateCurrentProject({
                        logos: { ...currentProject.logos, logoUrl: e.target.value }
                      })}
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-200 font-mono text-[11px] outline-none"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Favicon */}
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <div className="font-bold text-stone-200">Browser Tab Favicon (64x64)</div>
                    <div className="h-28 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center p-3">
                      <img src={currentProject.logos.faviconUrl} alt="Favicon" className="w-10 h-10 object-contain rounded" />
                    </div>
                    <input
                      type="text"
                      value={currentProject.logos.faviconUrl}
                      onChange={(e) => updateCurrentProject({
                        logos: { ...currentProject.logos, faviconUrl: e.target.value }
                      })}
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-200 font-mono text-[11px] outline-none"
                      placeholder="https://..."
                    />
                  </div>

                  {/* App Icon */}
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <div className="font-bold text-stone-200">Desktop / OS App Icon (128x128)</div>
                    <div className="h-28 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center p-3">
                      <img src={currentProject.logos.appIconUrl} alt="App Icon" className="w-14 h-14 object-contain rounded-2xl shadow-md" />
                    </div>
                    <input
                      type="text"
                      value={currentProject.logos.appIconUrl}
                      onChange={(e) => updateCurrentProject({
                        logos: { ...currentProject.logos, appIconUrl: e.target.value }
                      })}
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-200 font-mono text-[11px] outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. DOMAIN & SSL */}
            {activeTab === 'domain' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-stone-100">Domain Routing & Automated SSL</h2>
                    <p className="text-xs text-stone-400">
                      Manage <strong className="text-stone-300">{currentProject.domain.subdomain}.omnibrowser.com</strong> and custom apex/CNAME domains.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDomainsModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Search & Link OMNI Domains</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Subdomain & Custom Domain Settings */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Hostnames & Routing</h3>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Instant OMNI Subdomain</label>
                      <div className="flex items-center px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl font-mono text-stone-200">
                        <input
                          type="text"
                          value={currentProject.domain.subdomain}
                          onChange={(e) => updateCurrentProject({
                            domain: { ...currentProject.domain, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }
                          })}
                          className="bg-transparent outline-none text-cyan-300 font-bold w-32"
                        />
                        <span className="text-stone-500">.omnibrowser.com</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Custom Apex / CNAME Domain</label>
                      <input
                        type="text"
                        value={currentProject.domain.customDomain}
                        onChange={(e) => updateCurrentProject({
                          domain: { ...currentProject.domain, customDomain: e.target.value }
                        })}
                        placeholder="browser.mycompany.com"
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-200 font-mono outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="font-bold text-stone-200">Automated ECC TLS/SSL</div>
                          <div className="text-[10px] text-stone-400">Issuer: {currentProject.domain.sslIssuer}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono">
                        {currentProject.domain.sslStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* DNS Record Verification Box */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-200 text-sm">DNS Records Verification</h3>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px]">
                        {currentProject.domain.dnsStatus.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                        <div>
                          <div className="text-stone-500 text-[10px]">CNAME TARGET</div>
                          <div className="text-cyan-300 font-bold">{currentProject.domain.cnameTarget}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(currentProject.domain.cnameTarget, 'cname')}
                          className="p-1.5 rounded hover:bg-stone-800 text-stone-400"
                        >
                          {copiedKey === 'cname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                        <div>
                          <div className="text-stone-500 text-[10px]">TXT CHALLENGE</div>
                          <div className="text-stone-200 font-bold truncate max-w-[200px]">{currentProject.domain.txtVerificationKey}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(currentProject.domain.txtVerificationKey, 'txt')}
                          className="p-1.5 rounded hover:bg-stone-800 text-stone-400"
                        >
                          {copiedKey === 'txt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-400">
                      When custom domains are bound, traffic is automatically routed through OMNI Anycast Edge with zero-egress encryption.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. HOMEPAGE & SPEED DIALS */}
            {activeTab === 'homepage' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-stone-100">Homepage & New Tab Layout</h2>
                    <p className="text-xs text-stone-400">Customize hero copy, announcement banners, and default pinned speed dials.</p>
                  </div>
                  <button
                    onClick={handleAddSpeedDial}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Pinned Speed Dial</span>
                  </button>
                </div>

                {/* Hero & Announcement Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <h3 className="font-bold text-stone-200 text-sm">Hero Headlines</h3>

                    <div className="space-y-1">
                      <label className="text-stone-400">Hero Main Title</label>
                      <input
                        type="text"
                        value={currentProject.homepage.heroTitle}
                        onChange={(e) => updateCurrentProject({
                          homepage: { ...currentProject.homepage, heroTitle: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-stone-400">Hero Subtitle</label>
                      <input
                        type="text"
                        value={currentProject.homepage.heroSubtitle}
                        onChange={(e) => updateCurrentProject({
                          homepage: { ...currentProject.homepage, heroSubtitle: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-200 text-sm">Enterprise Announcement Banner</h3>
                      <input
                        type="checkbox"
                        checked={currentProject.homepage.announcementBanner.isEnabled}
                        onChange={(e) => updateCurrentProject({
                          homepage: {
                            ...currentProject.homepage,
                            announcementBanner: { ...currentProject.homepage.announcementBanner, isEnabled: e.target.checked }
                          }
                        })}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    </div>

                    <input
                      type="text"
                      value={currentProject.homepage.announcementBanner.title}
                      onChange={(e) => updateCurrentProject({
                        homepage: {
                          ...currentProject.homepage,
                          announcementBanner: { ...currentProject.homepage.announcementBanner, title: e.target.value }
                        }
                      })}
                      placeholder="Banner Title"
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-200 outline-none font-bold"
                    />

                    <textarea
                      rows={2}
                      value={currentProject.homepage.announcementBanner.text}
                      onChange={(e) => updateCurrentProject({
                        homepage: {
                          ...currentProject.homepage,
                          announcementBanner: { ...currentProject.homepage.announcementBanner, text: e.target.value }
                        }
                      })}
                      placeholder="Banner Body Text"
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-200 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Pinned Speed Dials List */}
                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                  <h3 className="font-bold text-stone-200 text-sm">Pinned Speed Dial Tiles ({currentProject.homepage.pinnedSpeedDials.length})</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {currentProject.homepage.pinnedSpeedDials.map((dial, idx) => (
                      <div key={dial.id} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 relative group">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={dial.name}
                            onChange={(e) => {
                              const updated = [...currentProject.homepage.pinnedSpeedDials];
                              updated[idx].name = e.target.value;
                              updateCurrentProject({ homepage: { ...currentProject.homepage, pinnedSpeedDials: updated } });
                            }}
                            className="font-bold text-stone-200 bg-transparent outline-none border-b border-transparent focus:border-indigo-500 w-36"
                          />
                          <button
                            onClick={() => handleDeleteSpeedDial(dial.id)}
                            className="p-1 rounded hover:bg-stone-800 text-stone-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={dial.url}
                          onChange={(e) => {
                            const updated = [...currentProject.homepage.pinnedSpeedDials];
                            updated[idx].url = e.target.value;
                            updateCurrentProject({ homepage: { ...currentProject.homepage, pinnedSpeedDials: updated } });
                          }}
                          className="w-full bg-stone-900 border border-stone-800 px-2 py-1 rounded text-[11px] font-mono text-stone-400 outline-none"
                        />

                        <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500">
                          <span>Category: {dial.category}</span>
                          <div className="flex items-center gap-2">
                            {dial.isSponsored && <span className="text-amber-400 font-bold">Sponsored Ad</span>}
                            {dial.isAffiliate && <span className="text-emerald-400 font-bold">Affiliate</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SEARCH ENGINE */}
            {activeTab === 'search' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">Search Engine & Enterprise Intranet Indexing</h2>
                  <p className="text-xs text-stone-400">Configure default omnibox search endpoints, autosuggest APIs, and custom enterprise bang shortcuts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Default Engine</h3>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Search Provider</label>
                      <select
                        value={currentProject.searchEngine.defaultEngine}
                        onChange={(e) => updateCurrentProject({
                          searchEngine: { ...currentProject.searchEngine, defaultEngine: e.target.value as any }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none font-bold"
                      >
                        <option value="custom_intranet">Custom Enterprise Intranet API</option>
                        <option value="omni_sovereign">OMNI Sovereign Search (Zero-Telemetry)</option>
                        <option value="duckduckgo">DuckDuckGo Privacy Search</option>
                        <option value="brave">Brave Independent Search</option>
                        <option value="google">Google Search</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Intranet Search API Endpoint (use %s for query)</label>
                      <input
                        type="text"
                        value={currentProject.searchEngine.customSearchEndpoint}
                        onChange={(e) => updateCurrentProject({
                          searchEngine: { ...currentProject.searchEngine, customSearchEndpoint: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-200 font-mono text-[11px] outline-none"
                        placeholder="https://search.company.internal/api?q=%s"
                      />
                    </div>
                  </div>

                  {/* Bang Shortcuts */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <h3 className="font-bold text-stone-200 text-sm">Enterprise Bang Shortcuts</h3>
                    <div className="space-y-2">
                      {currentProject.searchEngine.customBangShortcuts.map((b, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between font-mono text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                            {b.prefix}
                          </span>
                          <span className="text-stone-300 font-sans font-medium">{b.name}</span>
                          <span className="text-stone-500 truncate max-w-[150px]">{b.urlTemplate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. NEWS FEED */}
            {activeTab === 'news' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-stone-100">Curated News & Intelligence Feeds</h2>
                    <p className="text-xs text-stone-400">Control news sources, internal corporate feeds, and AI digest summaries.</p>
                  </div>
                  <button
                    onClick={handleAddNewsSource}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add RSS Feed</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {currentProject.newsFeed.sources.map((src) => (
                      <div key={src.id} className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                        <div className="font-bold text-stone-200">{src.name}</div>
                        <div className="text-[11px] text-stone-500 font-mono truncate">{src.rssUrl}</div>
                        <div className="text-[10px] text-indigo-400 font-medium">Category: {src.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. AI ASSISTANT ("MyCompany Copilot") */}
            {activeTab === 'ai_assistant' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-stone-100">Custom Branded AI Assistant (&quot;{currentProject.aiAssistant.aiAssistantName}&quot;)</h2>
                    <p className="text-xs text-stone-400">
                      Configure company AI assistant persona, system instructions, and RAG corporate knowledge bases.
                    </p>
                  </div>
                  <button
                    onClick={handleAddKnowledgeDoc}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Knowledge Base Doc</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Persona & System Prompt */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Copilot Persona & Guardrails</h3>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">AI Assistant Name</label>
                      <input
                        type="text"
                        value={currentProject.aiAssistant.aiAssistantName}
                        onChange={(e) => updateCurrentProject({
                          aiAssistant: { ...currentProject.aiAssistant, aiAssistantName: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 font-bold outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Underlying Model Tier</label>
                      <select
                        value={currentProject.aiAssistant.modelTier}
                        onChange={(e) => updateCurrentProject({
                          aiAssistant: { ...currentProject.aiAssistant, modelTier: e.target.value as any }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none"
                      >
                        <option value="enterprise-fine-tuned">Enterprise Fine-Tuned (Corporate RAG & Compliance)</option>
                        <option value="omni-pro-multimodal">OMNI Pro Multimodal (Gemini 2.5 Flash)</option>
                        <option value="omni-flash-sovereign">OMNI Flash Sovereign (Sub-10ms Latency)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Custom Corporate System Instructions</label>
                      <textarea
                        rows={4}
                        value={currentProject.aiAssistant.systemPrompt}
                        onChange={(e) => updateCurrentProject({
                          aiAssistant: { ...currentProject.aiAssistant, systemPrompt: e.target.value }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 p-3 rounded-xl text-stone-200 outline-none resize-none font-mono text-[11px]"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-emerald-300">Zero Data Retention (ZDR) Enforced</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Compliant</span>
                    </div>
                  </div>

                  {/* Knowledge Bases RAG */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Indexed Corporate Knowledge Bases</h3>

                    <div className="space-y-2.5">
                      {currentProject.aiAssistant.knowledgeBases.map((kb) => (
                        <div key={kb.id} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-stone-200">{kb.name}</div>
                            <div className="text-[10px] text-stone-500 font-mono">{kb.docCount} docs • Type: {kb.type} • Synced {kb.lastSyncedAt}</div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px]">
                            {kb.status.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. VPN & TUNNELING */}
            {activeTab === 'vpn' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">VPN Options & Zero-Trust WireGuard Gateway</h2>
                  <p className="text-xs text-stone-400">Configure bundled multi-hop tunnels, dedicated VPC ingress, and sovereign kill-switches.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Tunneling Topology</h3>

                    <div className="space-y-1.5">
                      <label className="text-stone-400">Tunnel Protocol</label>
                      <select
                        value={currentProject.vpn.tunnelMode}
                        onChange={(e) => updateCurrentProject({
                          vpn: { ...currentProject.vpn, tunnelMode: e.target.value as any }
                        })}
                        className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-stone-100 outline-none font-bold"
                      >
                        <option value="enterprise_wireguard">Dedicated Enterprise WireGuard Gateway</option>
                        <option value="omni_multihop">OMNI Multi-Hop Sovereign Mesh</option>
                        <option value="ipsec_gateway">IPSec / IKEv2 Corporate Tunnel</option>
                        <option value="tor_hybrid">Tor Hybrid Onion Routing</option>
                      </select>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-stone-200">Enforce Hard Kill-Switch</div>
                        <div className="text-[10px] text-stone-400">Block all traffic if VPN connection drops.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentProject.vpn.killSwitchEnforced}
                        onChange={(e) => updateCurrentProject({
                          vpn: { ...currentProject.vpn, killSwitchEnforced: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <h3 className="font-bold text-stone-200 text-sm">WireGuard Profile Config</h3>
                    <textarea
                      rows={6}
                      value={currentProject.vpn.customWireguardConfig}
                      onChange={(e) => updateCurrentProject({
                        vpn: { ...currentProject.vpn, customWireguardConfig: e.target.value }
                      })}
                      className="w-full bg-stone-950 border border-stone-800 p-3 rounded-xl text-emerald-400 font-mono text-[11px] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 9. EXTENSIONS */}
            {activeTab === 'extensions' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">Enterprise Extensions Whitelist & Store</h2>
                  <p className="text-xs text-stone-400">Pre-install mandatory security extensions or curate a strict company whitelist.</p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {CURATED_ENTERPRISE_EXTENSIONS.map((ext) => {
                      const isInstalled = currentProject.extensions.preInstalled.some(p => p.id === ext.id);
                      return (
                        <div key={ext.id} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-200">{ext.name}</span>
                              <span className="text-[10px] font-mono text-stone-500">v{ext.version}</span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-1">{ext.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                            <span className="text-[10px] text-indigo-400 font-mono">{ext.category}</span>
                            <button
                              onClick={() => {
                                if (isInstalled) {
                                  updateCurrentProject({
                                    extensions: {
                                      ...currentProject.extensions,
                                      preInstalled: currentProject.extensions.preInstalled.filter(p => p.id !== ext.id)
                                    }
                                  });
                                } else {
                                  updateCurrentProject({
                                    extensions: {
                                      ...currentProject.extensions,
                                      preInstalled: [...currentProject.extensions.preInstalled, ext]
                                    }
                                  });
                                }
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                isInstalled
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                              }`}
                            >
                              {isInstalled ? 'Pre-Installed' : 'Enable Extension'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 10. MONETIZATION & SUBSCRIPTIONS */}
            {activeTab === 'monetization' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">Subscriptions, Monetization & Seat Pricing</h2>
                  <p className="text-xs text-stone-400">Configure your B2B SaaS pricing model, seat caps, paywall triggers, and trial durations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {currentProject.monetization.pricingTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className={`p-5 rounded-2xl bg-stone-900 border ${
                        tier.isPopular ? 'border-indigo-600 ring-1 ring-indigo-500' : 'border-stone-800'
                      } space-y-4 flex flex-col justify-between`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-stone-100 text-sm">{tier.name}</h3>
                          {tier.isPopular && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono">
                              Most Popular
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-stone-100">${tier.priceMonthly}</span>
                          <span className="text-stone-400 text-xs">/ seat / month</span>
                        </div>

                        <div className="text-stone-400 text-[11px]">Seat Cap: {tier.seatCap} users</div>

                        <ul className="space-y-1.5 pt-2 border-t border-stone-800 text-stone-300 text-[11px]">
                          {tier.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs mt-4">
                        Edit Tier Features
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. ADVERTISING */}
            {activeTab === 'advertising' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">Privacy-Respecting Advertising & Sponsorships</h2>
                  <p className="text-xs text-stone-400">
                    Monetize free users with contextual, zero-tracking ads. You keep <strong className="text-emerald-400">{currentProject.advertising.customerPayoutSplit}%</strong> of gross revenue.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-200 text-sm">Ad Placements</h3>
                      <input
                        type="checkbox"
                        checked={currentProject.advertising.adNetworkEnabled}
                        onChange={(e) => updateCurrentProject({
                          advertising: { ...currentProject.advertising, adNetworkEnabled: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                        <span>Sponsored Speed Dial Tiles</span>
                        <input type="checkbox" checked={currentProject.advertising.adTypes.sponsoredSpeedDials} readOnly className="w-3.5 h-3.5" />
                      </label>
                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                        <span>In-Feed Sponsored News Articles</span>
                        <input type="checkbox" checked={currentProject.advertising.adTypes.inFeedSponsoredNews} readOnly className="w-3.5 h-3.5" />
                      </label>
                      <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                        <span>Sidebar Partner Deals & Perks</span>
                        <input type="checkbox" checked={currentProject.advertising.adTypes.sidebarDeals} readOnly className="w-3.5 h-3.5" />
                      </label>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <h3 className="font-bold text-stone-200 text-sm">Monthly Ad Yield</h3>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                      ${currentProject.advertising.currentMonthAdRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-stone-400 text-xs">
                      Paid automatically into your OMNI Billing double-entry ledger on the 1st of every month.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 12. ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">Privacy-Preserving Telemetry & Usage Analytics</h2>
                  <p className="text-xs text-stone-400">Aggregated zero-PII metrics across your active browser deployments.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
                    <div className="text-stone-400">Daily Active Users</div>
                    <div className="text-2xl font-extrabold text-stone-100 font-mono">
                      {currentProject.analytics.activeDailyUsers.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
                    <div className="text-stone-400">Monthly Active Users</div>
                    <div className="text-2xl font-extrabold text-stone-100 font-mono">
                      {currentProject.analytics.activeMonthlyUsers.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
                    <div className="text-stone-400">30-Day Retention</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {currentProject.analytics.retention30d}%
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
                    <div className="text-stone-400">Trackers Blocked</div>
                    <div className="text-2xl font-extrabold text-indigo-400 font-mono">
                      {currentProject.analytics.trackersBlockedTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 13. USERS & PERMISSIONS */}
            {activeTab === 'users' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-stone-100">Users, Seats & RBAC Permissions</h2>
                    <p className="text-xs text-stone-400">
                      Managing {currentProject.usersPermissions.seatsUsed} / {currentProject.usersPermissions.seatsAllocated} active seats.
                    </p>
                  </div>
                  <button
                    onClick={handleAddTeamMember}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Invite Team Member</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                  <div className="space-y-2">
                    {currentProject.usersPermissions.teamMembers.map((mem) => (
                      <div key={mem.id} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={mem.avatarUrl} alt={mem.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-stone-200">{mem.name}</div>
                            <div className="text-[10px] text-stone-500 font-mono">{mem.email} • Added {mem.addedAt}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px]">
                            {mem.role}
                          </span>
                          <span className="text-[10px] text-stone-400">Active: {mem.lastActive}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 14. RESELLER & AFFILIATE */}
            {activeTab === 'reseller' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">OMNI Reseller & Affiliate Business Engine</h2>
                  <p className="text-xs text-stone-400">
                    Earn up to 40% recurring wholesale margins and direct customer referral commissions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                    <div className="text-stone-400">Wholesale Partner Tier</div>
                    <div className="text-lg font-bold text-amber-400 flex items-center gap-1.5">
                      <Handshake className="w-5 h-5" />
                      <span>{currentProject.resellerAffiliate.resellerTier}</span>
                    </div>
                    <div className="text-stone-300 font-mono text-[11px]">
                      Wholesale Margin Discount: <strong className="text-emerald-400">{currentProject.resellerAffiliate.wholesaleDiscountPercent}%</strong>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                    <div className="text-stone-400">Total Affiliate Commissions Earned</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                      ${currentProject.resellerAffiliate.totalCommissionEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-stone-400 text-[10px]">
                      {currentProject.resellerAffiliate.totalAffiliateConversions} conversions from {currentProject.resellerAffiliate.totalAffiliateClicks.toLocaleString()} clicks
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                    <div className="text-stone-400">Referral Code & Link</div>
                    <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-800 rounded-xl font-mono text-[11px] text-indigo-300 font-bold">
                      <span className="truncate">omni.com/ref/{currentProject.resellerAffiliate.affiliateReferralCode}</span>
                      <button
                        onClick={() => handleCopy(`https://omni.com/ref/${currentProject.resellerAffiliate.affiliateReferralCode}`, 'aff-link')}
                        className="p-1 hover:bg-stone-800 rounded text-stone-400"
                      >
                        {copiedKey === 'aff-link' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-[10px] text-stone-500">Payout Method: {currentProject.resellerAffiliate.payoutMethod}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 15. BILLING & INVOICING LEDGER */}
            {activeTab === 'billing' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h2 className="text-base font-bold text-stone-100">OMNI Billing & Enterprise Ledger</h2>
                  <p className="text-xs text-stone-400">Double-entry ledger of wholesale seats, domain registrations, and ad revenue offsets.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Current Invoice */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-stone-200 text-sm">Active Invoice: {currentProject.billingLedger.currentInvoice.invoiceNumber}</h3>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px]">
                        {currentProject.billingLedger.currentInvoice.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 border-y border-stone-800 py-3">
                      {currentProject.billingLedger.currentInvoice.lineItems.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-300">{item.desc}</span>
                          <span className={`font-mono font-bold ${item.total < 0 ? 'text-emerald-400' : 'text-stone-100'}`}>
                            {item.total < 0 ? `-$${Math.abs(item.total).toFixed(2)}` : `$${item.total.toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-stone-300">Total Settled via OMNI Pay</span>
                      <span className="text-lg font-extrabold text-stone-100 font-mono">
                        ${currentProject.billingLedger.currentInvoice.amountDue.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Transaction Ledger */}
                  <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <h3 className="font-bold text-stone-200 text-sm">Double-Entry Transaction Ledger</h3>
                    <div className="space-y-2 font-mono text-[10px]">
                      {currentProject.billingLedger.transactions.map((tx) => (
                        <div key={tx.id} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-stone-200 font-sans">{tx.description}</div>
                            <div className="text-stone-500">{tx.timestamp} • Ref: {tx.referenceId}</div>
                          </div>
                          <div className="text-right">
                            <div className={tx.credit > 0 ? 'text-emerald-400 font-bold' : 'text-stone-300'}>
                              {tx.credit > 0 ? `+$${tx.credit.toFixed(2)}` : `-$${tx.debit.toFixed(2)}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Browser Wizard Modal */}
      <AiBrowserGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onGenerated={(newConfig) => {
          setProjects(prev => [newConfig, ...prev]);
          setSelectedProjectId(newConfig.id);
          setIsPreviewOpen(true);
        }}
      />

      {/* OMNI Domains Manager Modal */}
      <DomainsManagerModal
        isOpen={isDomainsModalOpen}
        onClose={() => setIsDomainsModalOpen(false)}
        config={currentProject}
        onUpdateDomainConfig={(domConf) => {
          updateCurrentProject({ domain: domConf });
        }}
      />
    </div>
  );
};
