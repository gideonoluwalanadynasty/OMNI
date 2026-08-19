import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Star,
  BookOpen,
  Sparkles,
  Search,
  Globe,
  Layers,
  Sliders,
  ChevronDown,
  ExternalLink,
  Wifi,
  WifiOff,
  Check,
  Download,
  Clock,
  Settings,
  Cpu,
  Wallet,
  ShoppingBag,
  Server,
  Grid,
  FolderKanban,
  RefreshCw,
  Fingerprint,
  Puzzle
} from 'lucide-react';
import {
  OmniBrowserTab,
  OmniBrowserWorkspace,
  OmniBrowserExtension,
  OmniBrowserVpnState,
  OmniBrowserVpnNode,
  OmniBrowserBookmark,
  AppRegistration
} from '../../types';

interface OmniBrowserNavBarProps {
  activeTab: OmniBrowserTab | null;
  workspaces: OmniBrowserWorkspace[];
  activeWorkspaceId: string;
  extensions: OmniBrowserExtension[];
  vpnState: OmniBrowserVpnState;
  vpnNodes: OmniBrowserVpnNode[];
  bookmarks: OmniBrowserBookmark[];
  apps: AppRegistration[];
  isAiSidebarOpen: boolean;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onGoHome: () => void;
  onToggleBookmark: (tab: OmniBrowserTab) => void;
  onToggleReaderMode: () => void;
  onToggleAiSidebar: () => void;
  onSelectWorkspace: (workspaceId: string) => void;
  onOpenSecurityCenter: () => void;
  onOpenDownloads: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenReadingList?: () => void;
  onOpenProjectsSessions?: () => void;
  onOpenSync?: () => void;
  onOpenDeviceRegistry?: () => void;
  onOpenEngine?: () => void;
  onOpenAskOmniCommandBar?: () => void;
  onLaunchApp: (appId: string) => void;
  onToggleVpn: () => void;
}

export const OmniBrowserNavBar: React.FC<OmniBrowserNavBarProps> = ({
  activeTab,
  workspaces,
  activeWorkspaceId,
  extensions,
  vpnState,
  vpnNodes,
  bookmarks,
  apps,
  isAiSidebarOpen,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onGoHome,
  onToggleBookmark,
  onToggleReaderMode,
  onToggleAiSidebar,
  onSelectWorkspace,
  onOpenSecurityCenter,
  onOpenDownloads,
  onOpenHistory,
  onOpenSettings,
  onOpenReadingList,
  onOpenProjectsSessions,
  onOpenSync,
  onOpenDeviceRegistry,
  onOpenEngine,
  onOpenAskOmniCommandBar,
  onLaunchApp,
  onToggleVpn
}) => {
  const [urlInput, setUrlInput] = useState(activeTab?.url || '');
  const [showSslModal, setShowSslModal] = useState(false);
  const [showShieldPopover, setShowShieldPopover] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);
  const [showVpnPopover, setShowVpnPopover] = useState(false);

  // Sync input when active tab changes
  React.useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url);
    }
  }, [activeTab?.id, activeTab?.url]);

  const handleSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onNavigate(urlInput.trim());
    }
  };

  const isBookmarked = activeTab ? bookmarks.some(b => b.url === activeTab.url) : false;
  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId);
  const activeVpnNode = vpnNodes.find(n => n.id === vpnState.activeNodeId);

  const totalShieldBlocked = (activeTab?.trackersBlockedCount || 0) + (activeTab?.adsBlockedCount || 0);

  return (
    <div
      id="browser-nav-bar"
      className="relative flex items-center gap-2 px-3 py-2 bg-stone-900 text-stone-200 border-b border-stone-800"
    >
      {/* Navigation Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          id="btn-browser-back"
          onClick={onGoBack}
          disabled={!activeTab?.canGoBack}
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Back (Alt+Left)"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          id="btn-browser-forward"
          onClick={onGoForward}
          disabled={!activeTab?.canGoForward}
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Forward (Alt+Right)"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          id="btn-browser-reload"
          onClick={onReload}
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          title="Reload Page (Cmd+R)"
        >
          <RotateCw className={`w-4 h-4 ${activeTab?.isLoading ? 'animate-spin text-indigo-400' : ''}`} />
        </button>
        <button
          id="btn-browser-home"
          onClick={onGoHome}
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          title="OMNI Browser Home"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Workspace Switcher Button */}
      <div className="relative shrink-0">
        <button
          id="btn-workspace-dropdown"
          onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: activeWorkspace?.color || '#4f46e5' }}
          />
          <span className="max-w-[80px] truncate">{activeWorkspace?.name || 'Workspace'}</span>
          <ChevronDown className="w-3 h-3 text-stone-400" />
        </button>

        {showWorkspaceMenu && (
          <div
            id="workspace-dropdown-menu"
            className="absolute left-0 mt-1 w-64 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 p-2 text-xs"
          >
            <div className="px-2 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              Switch Workspace
            </div>
            <div className="space-y-1 mt-1">
              {workspaces.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace(ws.id);
                    setShowWorkspaceMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                    ws.id === activeWorkspaceId
                      ? 'bg-stone-800 text-white font-medium'
                      : 'text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: ws.color }}
                    />
                    <div>
                      <div className="text-stone-200">{ws.name}</div>
                      <div className="text-[10px] text-stone-500">{ws.profileType} • {ws.tabIds.length} tabs</div>
                    </div>
                  </div>
                  {ws.id === activeWorkspaceId && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sovereign Privacy Shield Pill */}
      <div className="relative shrink-0">
        <button
          id="btn-privacy-shield-pill"
          onClick={() => setShowShieldPopover(!showShieldPopover)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
            totalShieldBlocked > 0
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900/80'
              : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
          }`}
          title="Privacy Shield Deflections"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-mono">{totalShieldBlocked}</span>
        </button>

        {showShieldPopover && (
          <div
            id="shield-popover-menu"
            className="absolute left-0 mt-1 w-64 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 p-3 text-xs space-y-2"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="font-semibold text-stone-100">Zero-Telemetry Enclave</span>
              <span className="text-[10px] font-mono text-emerald-400">Strict Protection</span>
            </div>
            <div className="space-y-1.5 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Trackers Blocked:</span>
                <span className="font-mono text-emerald-400">{activeTab?.trackersBlockedCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Ad Injections Scrubbed:</span>
                <span className="font-mono text-emerald-400">{activeTab?.adsBlockedCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Canvas Fingerprint Deflected:</span>
                <span className="font-mono text-cyan-400">{activeTab?.fingerprintAttemptsDeflected || 0}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={() => {
                  onOpenSecurityCenter();
                  setShowShieldPopover(false);
                }}
                className="w-full py-1 text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Open Security Centre & Logs →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* WireGuard VPN Node Indicator */}
      <div className="relative shrink-0">
        <button
          id="btn-vpn-status-pill"
          onClick={() => setShowVpnPopover(!showVpnPopover)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
            vpnState.isConnected
              ? 'bg-indigo-950/80 text-indigo-300 border-indigo-800'
              : 'bg-stone-800 text-stone-400 border-stone-700'
          }`}
          title={vpnState.isConnected ? `VPN Encrypted: ${activeVpnNode?.location}` : 'VPN Disconnected'}
        >
          {vpnState.isConnected ? <Wifi className="w-3.5 h-3.5 text-indigo-400" /> : <WifiOff className="w-3.5 h-3.5 text-stone-500" />}
          <span className="max-w-[70px] truncate">{vpnState.isConnected ? activeVpnNode?.countryCode || 'VPN' : 'Off'}</span>
        </button>

        {showVpnPopover && (
          <div
            id="vpn-popover-menu"
            className="absolute left-0 mt-1 w-64 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 p-3 text-xs space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-100">Sovereign WireGuard VPN</span>
              <button
                onClick={onToggleVpn}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  vpnState.isConnected ? 'bg-indigo-600 text-white' : 'bg-stone-800 text-stone-400'
                }`}
              >
                {vpnState.isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            {vpnState.isConnected && (
              <div className="text-[11px] text-stone-300 space-y-1 font-mono">
                <div>Node: {activeVpnNode?.name}</div>
                <div>Masked IP: {vpnState.ipMasked}</div>
                <div>Latency: {activeVpnNode?.latencyMs} ms</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Omnibox / URL Search Bar */}
      <form onSubmit={handleSubmitUrl} className="flex-1 min-w-[180px] relative">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          {/* SSL / Security Padlock */}
          <button
            type="button"
            id="btn-ssl-inspector"
            onClick={() => setShowSslModal(!showSslModal)}
            className="shrink-0 p-0.5 rounded hover:bg-stone-800 text-emerald-400 hover:text-emerald-300"
            title="Inspect TLS 1.3 Security Certificate"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          {/* URL Input */}
          <input
            id="browser-omnibox-input"
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Search with OMNI AI or enter web address..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-stone-100 placeholder-stone-500 font-mono tracking-tight"
          />

          {/* Ask OMNI Quick Command Bar Trigger */}
          {onOpenAskOmniCommandBar && (
            <button
              type="button"
              id="btn-omnibox-ask-omni"
              onClick={onOpenAskOmniCommandBar}
              className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium transition-colors"
              title="Open 'Ask OMNI' Command Bar (⌘K)"
            >
              <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
              <span>Ask OMNI</span>
              <span className="text-[9px] font-mono opacity-70 ml-0.5">⌘K</span>
            </button>
          )}

          {/* Reader Mode Toggle */}
          <button
            type="button"
            id="btn-reader-mode"
            onClick={onToggleReaderMode}
            className={`shrink-0 p-1 rounded hover:bg-stone-800 transition-colors ${
              activeTab?.readerModeActive ? 'text-cyan-400 bg-cyan-950/80' : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle Clean Reader Mode"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          {/* Bookmark Star Toggle */}
          <button
            type="button"
            id="btn-bookmark-tab"
            onClick={() => activeTab && onToggleBookmark(activeTab)}
            className={`shrink-0 p-1 rounded hover:bg-stone-800 transition-colors ${
              isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-stone-400 hover:text-stone-200'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks Vault'}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* SSL Certificate Modal */}
        {showSslModal && activeTab?.sslInfo && (
          <div
            id="ssl-certificate-modal"
            className="absolute left-0 top-full mt-1.5 w-80 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 p-3.5 text-xs"
          >
            <div className="flex items-center gap-2 pb-2.5 border-b border-stone-800">
              <Lock className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-semibold text-stone-100">Connection is Encrypted</div>
                <div className="text-[11px] text-emerald-400">Verified by {activeTab.sslInfo.certificateAuthority}</div>
              </div>
            </div>
            <div className="py-2.5 space-y-1.5 font-mono text-[11px] text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-500">Protocol:</span>
                <span>{activeTab.sslInfo.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Cipher:</span>
                <span className="truncate max-w-[170px]" title={activeTab.sslInfo.cipherSuite}>
                  {activeTab.sslInfo.cipherSuite}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Key Strength:</span>
                <span>{activeTab.sslInfo.keyStrength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">HSTS:</span>
                <span className="text-emerald-400">Enabled (Strict)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Valid Until:</span>
                <span>{new Date(activeTab.sslInfo.validUntil).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSslModal(false)}
                className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Feature Drawers & Action Strip */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Reading List Drawer Button */}
        {onOpenReadingList && (
          <button
            id="btn-quick-reading-list"
            onClick={onOpenReadingList}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="Reading List & Annotations"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        )}

        {/* Project Spaces & Saved Sessions Button */}
        {onOpenProjectsSessions && (
          <button
            id="btn-quick-projects"
            onClick={onOpenProjectsSessions}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="Project Spaces & Saved Sessions"
          >
            <FolderKanban className="w-4 h-4" />
          </button>
        )}

        {/* Encrypted Cross-Device Sync Status Button */}
        {onOpenSync && (
          <button
            id="btn-quick-sync"
            onClick={onOpenSync}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="Cross-Device Encrypted Sync"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {/* OMNI Passport Device Registry */}
        {onOpenDeviceRegistry && (
          <button
            id="btn-quick-device-registry"
            onClick={onOpenDeviceRegistry}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="Passport Device Registry & Killswitch"
          >
            <Fingerprint className="w-4 h-4" />
          </button>
        )}

        {/* Multiplatform Engine Diagnostics */}
        {onOpenEngine && (
          <button
            id="btn-quick-engine"
            onClick={onOpenEngine}
            className="p-1.5 rounded-lg text-stone-400 hover:text-indigo-300 hover:bg-stone-800 transition-colors"
            title="Technology Abstraction Engine & Adapters"
          >
            <Cpu className="w-4 h-4" />
          </button>
        )}

        {/* Extensions Marketplace & Developer Portal Quick Trigger */}
        <button
          id="btn-quick-extensions-store"
          onClick={() => onNavigate('https://store.browser.omni.com')}
          className="p-1.5 rounded-lg text-stone-400 hover:text-indigo-300 hover:bg-stone-800 transition-colors"
          title="Extension Marketplace & Developer Ecosystem"
        >
          <Puzzle className="w-4 h-4" />
        </button>

        {/* Quick Downloads */}
        <button
          id="btn-quick-downloads"
          onClick={onOpenDownloads}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          title="Downloads Manager"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Quick History */}
        <button
          id="btn-quick-history"
          onClick={onOpenHistory}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          title="Browsing History"
        >
          <Clock className="w-4 h-4" />
        </button>

        {/* AI Copilot Toggle Button */}
        <button
          id="btn-ai-copilot-toggle"
          onClick={onToggleAiSidebar}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
            isAiSidebarOpen
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800 hover:bg-indigo-900/80'
          }`}
          title="Toggle OMNI AI Page Copilot (Cmd+K)"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Copilot</span>
        </button>

        {/* OMNI Ecosystem Launcher */}
        <div className="relative">
          <button
            id="btn-app-launcher-menu"
            onClick={() => setShowAppLauncher(!showAppLauncher)}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            title="OMNI Ecosystem Apps"
          >
            <Grid className="w-4 h-4" />
          </button>

          {showAppLauncher && (
            <div
              id="app-launcher-popover"
              className="absolute right-0 mt-1.5 w-72 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 p-3 text-xs"
            >
              <div className="px-1 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Sovereign Ecosystem Apps
              </div>
              <div className="grid grid-cols-3 gap-2">
                {apps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onLaunchApp(app.id);
                      setShowAppLauncher(false);
                    }}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-indigo-400">
                      {app.slug === 'ai' && <Sparkles className="w-4 h-4 text-indigo-400" />}
                      {app.slug === 'pay' && <Wallet className="w-4 h-4 text-emerald-400" />}
                      {app.slug === 'market' && <ShoppingBag className="w-4 h-4 text-amber-400" />}
                      {app.slug === 'cloud' && <Server className="w-4 h-4 text-purple-400" />}
                      {app.slug === 'browser' && <Globe className="w-4 h-4 text-cyan-400" />}
                      {!['ai', 'pay', 'market', 'cloud', 'browser'].includes(app.slug) && (
                        <Globe className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                    <span className="text-[11px] truncate max-w-full font-medium">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
