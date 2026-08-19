import React, { useState } from 'react';
import {
  WhiteLabelBrowserConfig
} from '../../../types/whitelabel_browser';
import {
  Search,
  Sparkles,
  Shield,
  ShieldCheck,
  Globe,
  ExternalLink,
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Plus,
  X,
  Radio,
  Sliders,
  CheckCircle2,
  Terminal,
  Layers,
  Send,
  Building2,
  Code2,
  Database,
  HardDrive,
  Cloud,
  CheckSquare,
  TrendingUp,
  LineChart,
  Wallet,
  Percent,
  Megaphone,
  Download,
  Share2,
  Cpu
} from 'lucide-react';

interface WhiteLabelLivePreviewProps {
  config: WhiteLabelBrowserConfig;
  onClosePreview?: () => void;
  onEditConfig?: () => void;
}

export const WhiteLabelLivePreview: React.FC<WhiteLabelLivePreviewProps> = ({
  config,
  onClosePreview,
  onEditConfig
}) => {
  const [activeTabUrl, setActiveTabUrl] = useState<string>(`https://${config.domain.customDomain || config.domain.subdomain + '.omnibrowser.com'}`);
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; timestamp: string }>>([
    {
      role: 'assistant',
      text: `Hello! I am ${config.aiAssistant.aiAssistantName}, tuned specifically for ${config.brand.companyName}. How can I assist your workflow today?`,
      timestamp: 'Just now'
    }
  ]);
  const [copilotInput, setCopilotInput] = useState('');
  const [activeView, setActiveView] = useState<'home' | 'webpage' | 'intranet'>('home');
  const [loadedUrl, setLoadedUrl] = useState('');
  const [vpnActive, setVpnActive] = useState(config.vpn.vpnBundled);

  const getDialIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4" />;
      case 'Cloud': return <Cloud className="w-4 h-4" />;
      case 'CheckSquare': return <CheckSquare className="w-4 h-4" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
      case 'LineChart': return <LineChart className="w-4 h-4" />;
      case 'Wallet': return <Wallet className="w-4 h-4" />;
      case 'Percent': return <Percent className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchQuery.startsWith('!')) {
      const bang = config.searchEngine.customBangShortcuts.find(b => searchQuery.startsWith(b.prefix));
      if (bang) {
        const queryTerm = searchQuery.replace(bang.prefix, '').trim();
        const targetUrl = bang.urlTemplate.replace('%s', encodeURIComponent(queryTerm));
        setLoadedUrl(targetUrl);
        setActiveTabUrl(targetUrl);
        setActiveView('webpage');
        return;
      }
    }

    if (config.searchEngine.defaultEngine === 'custom_intranet' && config.searchEngine.customSearchEndpoint) {
      const targetUrl = config.searchEngine.customSearchEndpoint.replace('%s', encodeURIComponent(searchQuery));
      setLoadedUrl(targetUrl);
      setActiveTabUrl(targetUrl);
      setActiveView('intranet');
    } else {
      const targetUrl = `https://omni-search.internal/?q=${encodeURIComponent(searchQuery)}`;
      setLoadedUrl(targetUrl);
      setActiveTabUrl(targetUrl);
      setActiveView('webpage');
    }
  };

  const handleSendCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;

    const userText = copilotInput;
    setCopilotMessages(prev => [...prev, { role: 'user', text: userText, timestamp: 'Now' }]);
    setCopilotInput('');

    setTimeout(() => {
      let reply = `[${config.aiAssistant.aiAssistantName} - ${config.aiAssistant.modelTier}] Based on ${config.brand.companyName} enterprise knowledge bases (${config.aiAssistant.knowledgeBases.length} indexed documents): `;
      if (userText.toLowerCase().includes('policy') || userText.toLowerCase().includes('handbook')) {
        reply += `According to section 4.2 of the ${config.brand.companyName} security policy, zero-trust cryptographic keys are enforced with automated 90-day rotation and air-gapped backups.`;
      } else if (userText.toLowerCase().includes('vpn') || userText.toLowerCase().includes('tunnel')) {
        reply += `Your current connection is routed through ${config.vpn.tunnelMode} with kill-switch enabled and zero telemetry logging.`;
      } else {
        reply += `I processed your inquiry "${userText}" under zero-data-retention parameters. Everything is verified against your corporate compliance policies.`;
      }
      setCopilotMessages(prev => [...prev, { role: 'assistant', text: reply, timestamp: 'Just now' }]);
    }, 700);
  };

  return (
    <div className="w-full flex flex-col h-[760px] bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl">
      {/* Top Simulator Control Bar */}
      <div className="px-4 py-2.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE SIMULATOR: {config.brand.brandName}
          </div>
          <span className="text-stone-400 font-mono hidden sm:inline">
            Domain: {config.domain.customDomain || `${config.domain.subdomain}.omnibrowser.com`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onEditConfig && (
            <button
              onClick={onEditConfig}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Configuration</span>
            </button>
          )}
          {onClosePreview && (
            <button
              onClick={onClosePreview}
              className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Simulated Browser Frame */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          backgroundColor: config.brand.surfaceColor || '#0b132b',
          fontFamily: config.brand.fontFamily
        }}
      >
        {/* Browser Top Window Chrome & Tabs */}
        <div className="bg-stone-900/90 backdrop-blur border-b border-stone-800/80 px-3 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 pr-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Custom Branded Tab */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950 text-stone-100 rounded-t-xl border-t border-x border-stone-800 text-xs font-medium max-w-xs truncate">
              {config.logos.faviconUrl ? (
                <img src={config.logos.faviconUrl} alt="Favicon" className="w-3.5 h-3.5 rounded" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span className="truncate">{activeView === 'home' ? config.brand.brandName : activeTabUrl}</span>
              <X className="w-3 h-3 text-stone-500 hover:text-stone-300 ml-auto cursor-pointer" />
            </div>

            <button className="p-1 rounded hover:bg-stone-800 text-stone-400">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Brand Badge */}
          <div className="flex items-center gap-2 pb-1.5">
            {config.brand.poweredByOmniBadge && (
              <span className="px-2 py-0.5 rounded-full bg-stone-800/90 text-stone-400 border border-stone-700 text-[10px] font-mono">
                powered by <span className="text-indigo-300 font-bold">OMNI</span>
              </span>
            )}
            <div className="w-6 h-6 rounded-full overflow-hidden border border-stone-700 bg-stone-800 flex items-center justify-center text-xs text-stone-200">
              {config.usersPermissions.teamMembers[0]?.name.charAt(0) || 'U'}
            </div>
          </div>
        </div>

        {/* Browser URL Navigation Bar */}
        <div className="bg-stone-900/60 px-3 py-2 border-b border-stone-800/80 flex items-center gap-2">
          <div className="flex items-center gap-1 text-stone-400">
            <button
              onClick={() => setActiveView('home')}
              className="p-1.5 rounded hover:bg-stone-800 hover:text-stone-200 transition-colors"
              title="Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-stone-800 hover:text-stone-200 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-stone-800 hover:text-stone-200 transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Omnibox URL Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
            <div className="w-full flex items-center gap-2 px-3 py-1.5 bg-stone-950/90 border border-stone-800 rounded-xl text-xs focus-within:border-blue-500">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-mono">https://</span>
              <input
                type="text"
                value={activeView === 'home' ? `${config.domain.customDomain || config.domain.subdomain + '.omnibrowser.com'}` : activeTabUrl}
                onChange={(e) => setActiveTabUrl(e.target.value)}
                placeholder={`Search ${config.brand.brandName} or enter URL...`}
                className="w-full bg-transparent text-stone-200 outline-none placeholder:text-stone-500 font-mono"
              />
              <span className="text-[10px] text-stone-500 font-mono px-1.5 py-0.5 rounded bg-stone-800">
                {config.searchEngine.defaultEngine === 'custom_intranet' ? 'Intranet Index' : 'OMNI Sovereign'}
              </span>
            </div>
          </form>

          {/* Extension & Action Badges */}
          <div className="flex items-center gap-1.5">
            {/* VPN Status Pill */}
            {config.vpn.vpnBundled && (
              <button
                onClick={() => setVpnActive(!vpnActive)}
                className={`px-2 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                  vpnActive
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                    : 'bg-stone-800 text-stone-400 border-stone-700'
                }`}
                title={`Tunnel Mode: ${config.vpn.tunnelMode}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{vpnActive ? 'WireGuard: Active' : 'VPN: Off'}</span>
              </button>
            )}

            {/* Custom AI Copilot Button */}
            <button
              onClick={() => setCopilotOpen(!copilotOpen)}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-all"
              style={{
                background: `linear-gradient(135deg, ${config.brand.accentColor}, #4f46e5)`
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{config.aiAssistant.aiAssistantName}</span>
            </button>
          </div>
        </div>

        {/* Main Content Area + Sidebar Copilot */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Web View / New Tab Page */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
            {activeView === 'home' ? (
              /* Custom Branded New Tab Page */
              <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
                {/* Announcement Banner */}
                {config.homepage.announcementBanner.isEnabled && (
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/80 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Megaphone className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="font-bold text-blue-200 mr-2">{config.homepage.announcementBanner.title}:</span>
                        <span className="text-stone-300">{config.homepage.announcementBanner.text}</span>
                      </div>
                    </div>
                    {config.homepage.announcementBanner.ctaLabel && (
                      <a
                        href={config.homepage.announcementBanner.ctaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shrink-0 transition-colors"
                      >
                        {config.homepage.announcementBanner.ctaLabel}
                      </a>
                    )}
                  </div>
                )}

                {/* Hero Header & Brand Identity */}
                <div className="text-center space-y-3 pt-4">
                  <div className="flex items-center justify-center gap-3">
                    {config.logos.logoUrl ? (
                      <img
                        src={config.logos.logoUrl}
                        alt={config.brand.brandName}
                        className="w-12 h-12 rounded-xl object-cover shadow-lg border border-stone-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                        {config.brand.brandName.charAt(0)}
                      </div>
                    )}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
                      {config.homepage.heroTitle || config.brand.brandName}
                    </h1>
                  </div>
                  <p className="text-sm text-stone-400 max-w-xl mx-auto">
                    {config.homepage.heroSubtitle || config.brand.tagline}
                  </p>
                </div>

                {/* Hero Search Box */}
                {config.homepage.widgets.quickSearch && (
                  <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto w-full">
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-900/90 hover:bg-stone-900 border border-stone-700/80 focus-within:border-blue-500 rounded-2xl shadow-xl transition-all">
                      <Search className="w-5 h-5 text-stone-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search intranet, documents, or web with ${config.brand.brandName}...`}
                        className="w-full bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-500"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-xl font-semibold text-xs text-white shadow"
                        style={{ backgroundColor: config.brand.accentColor || '#3b82f6' }}
                      >
                        Search
                      </button>
                    </div>

                    {/* Bang Shortcut Hints */}
                    {config.searchEngine.customBangShortcuts.length > 0 && (
                      <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-stone-500">
                        <span>Shortcuts:</span>
                        {config.searchEngine.customBangShortcuts.map((bang, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSearchQuery(`${bang.prefix} `)}
                            className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono"
                          >
                            {bang.prefix} ({bang.name})
                          </button>
                        ))}
                      </div>
                    )}
                  </form>
                )}

                {/* Pinned Speed Dials Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-400 px-1">
                    <span>ENTERPRISE SHORTCUTS & APPS</span>
                    <span className="font-mono text-[10px] text-stone-500">{config.homepage.pinnedSpeedDials.length} Pinned</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {config.homepage.pinnedSpeedDials.map((dial) => (
                      <div
                        key={dial.id}
                        onClick={() => {
                          setActiveTabUrl(dial.url);
                          setLoadedUrl(dial.url);
                          setActiveView('webpage');
                        }}
                        className={`p-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800/90 border border-stone-800 hover:border-stone-600 transition-all cursor-pointer flex flex-col items-center text-center gap-2 group relative`}
                      >
                        {dial.isSponsored && (
                          <span className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded bg-amber-950 border border-amber-800 text-[8px] font-mono text-amber-300">
                            Ad
                          </span>
                        )}
                        {dial.isAffiliate && (
                          <span className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-[8px] font-mono text-emerald-300">
                            Partner
                          </span>
                        )}

                        <div className={`p-2.5 rounded-xl border ${dial.color || 'text-blue-400 bg-blue-950/80 border-blue-800'}`}>
                          {getDialIcon(dial.iconName)}
                        </div>

                        <div className="w-full">
                          <div className="font-bold text-xs text-stone-200 truncate group-hover:text-blue-300">
                            {dial.name}
                          </div>
                          <div className="text-[10px] text-stone-500 truncate font-mono">
                            {dial.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* News & Threat Feed Preview */}
                {config.newsFeed.enabled && (
                  <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
                      <div className="flex items-center gap-2">
                        <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        <span>{config.brand.companyName} Curated Intelligence Feed</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500">Cadence: {config.newsFeed.aiDigestCadence}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {config.newsFeed.sources.map((src) => (
                        <div key={src.id} className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 flex items-center justify-between">
                          <div className="truncate">
                            <div className="font-medium text-stone-200 truncate">{src.name}</div>
                            <div className="text-[10px] text-stone-500 font-mono truncate">{src.category} • {src.rssUrl}</div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-stone-500 shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Notice */}
                <div className="pt-6 text-center text-xs text-stone-500 space-y-1">
                  <div>{config.brand.copyrightNotice}</div>
                  <div className="text-[10px] text-stone-600 font-mono">
                    Security Enclave ID: {config.domain.txtVerificationKey} • {config.usersPermissions.ssoProvider.toUpperCase()} SSO
                  </div>
                </div>
              </div>
            ) : (
              /* Loaded Webpage or Intranet Simulation */
              <div className="w-full max-w-4xl space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-stone-200">Loaded: {loadedUrl}</span>
                  </div>
                  <button
                    onClick={() => setActiveView('home')}
                    className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                  >
                    Return to {config.brand.brandName} Home
                  </button>
                </div>

                <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mx-auto">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-200">
                    Enterprise Sandbox View Active
                  </h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    This window is rendering via {config.brand.brandName}&apos;s zero-trust sandboxed enclave. Telemetry is stripped and WireGuard egress encryption is enforced.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Custom Copilot Side Drawer */}
          {copilotOpen && (
            <div className="w-80 border-l border-stone-800 bg-stone-900/95 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
              <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800 text-blue-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-100">{config.aiAssistant.aiAssistantName}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{config.aiAssistant.modelTier}</div>
                  </div>
                </div>
                <button
                  onClick={() => setCopilotOpen(false)}
                  className="p-1 rounded hover:bg-stone-800 text-stone-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                {copilotMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl ${
                      msg.role === 'assistant'
                        ? 'bg-stone-950 border border-stone-800 text-stone-200'
                        : 'bg-blue-600 text-white ml-6'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-60 mb-1">
                      {msg.role === 'assistant' ? config.aiAssistant.aiAssistantName : 'You'} • {msg.timestamp}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))}
              </div>

              {/* Copilot Input */}
              <form onSubmit={handleSendCopilot} className="p-2.5 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
                <input
                  type="text"
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  placeholder={`Ask ${config.aiAssistant.aiAssistantName}...`}
                  className="flex-1 bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800 text-xs text-stone-200 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
