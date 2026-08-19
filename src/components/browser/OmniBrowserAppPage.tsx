import React, { useState } from 'react';
import { useOmni } from '../../hooks/useOmni';
import { OmniBrowserTabBar } from './OmniBrowserTabBar';
import { OmniBrowserNavBar } from './OmniBrowserNavBar';
import { OmniBrowserHome } from './OmniBrowserHome';
import { OmniBrowserWebView } from './OmniBrowserWebView';
import { OmniBrowserSidebar, BrowserSidebarMode } from './OmniBrowserSidebar';
import { OmniBrowserSecurityCentre } from './OmniBrowserSecurityCentre';
import { OmniBrowserSettings } from './OmniBrowserSettings';
import {
  OmniBrowserTab,
  OmniBrowserSavedSession,
  OmniBrowserProjectSpace,
  OmniBrowserReadingListItem,
  OmniBrowserSyncConfig,
  OmniBrowserSyncPayload,
  OmniBrowserAssistantSubMode,
  BrowserPlatformType
} from '../../types';
import { tabsService } from '../../sdk/browser-services/TabsService';
import { sessionsService } from '../../sdk/browser-services/SessionsService';
import { bookmarksService } from '../../sdk/browser-services/BookmarksService';
import { historyService } from '../../sdk/browser-services/HistoryService';
import { readingListService } from '../../sdk/browser-services/ReadingListService';
import { downloadsService } from '../../sdk/browser-services/DownloadsService';
import { encryptedSyncService } from '../../sdk/browser-services/EncryptedSyncService';
import { deviceSecurityService } from '../../sdk/browser-services/DeviceSecurityService';
import { browserAdapterFactory } from '../../sdk/browser-adapters/BrowserAdapterFactory';
import { OmniBrowserAiAssistantPanel } from './ai/OmniBrowserAiAssistantPanel';
import { OmniAskOmniCommandBar } from './ai/OmniAskOmniCommandBar';

interface OmniBrowserAppPageProps {
  onNavigateApp?: (appId: string) => void;
}

export const OmniBrowserAppPage: React.FC<OmniBrowserAppPageProps> = ({ onNavigateApp }) => {
  const { state, updateState } = useOmni();

  // Active view mode: 'browser' | 'security_centre' | 'settings'
  const [viewMode, setViewMode] = useState<'browser' | 'security_centre' | 'settings'>('browser');

  // Sidebar state & active drawer
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<BrowserSidebarMode>('ai_copilot');

  // Dedicated AI Assistant Panel state (Prompt 3 Deep Companion)
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiPanelSubMode, setAiPanelSubMode] = useState<OmniBrowserAssistantSubMode>('page_understanding');

  // "Ask OMNI" Command Bar state
  const [isAskOmniOpen, setIsAskOmniOpen] = useState(false);

  // Global shortcut listener: ⌘K or Ctrl+K opens "Ask OMNI"
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsAskOmniOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Split View state
  const [splitTabId, setSplitTabId] = useState<string | null>(null);

  // Active tab & workspace lookup
  const activeWorkspace =
    state.browserWorkspaces.find(w => w.id === state.activeBrowserWorkspaceId) ||
    state.browserWorkspaces[0];
  const activeTab =
    state.browserTabs.find(t => t.id === state.activeBrowserTabId) ||
    state.browserTabs[0] ||
    null;
  const splitTab = splitTabId
    ? state.browserTabs.find(t => t.id === splitTabId) || null
    : null;

  // TAB ACTIONS VIA SDK SERVICE
  const handleSelectTab = (tabId: string) => {
    updateState({ activeBrowserTabId: tabId });
    if (viewMode !== 'browser') setViewMode('browser');
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { remainingTabs, nextActiveTabId } = tabsService.closeTab(
      state.browserTabs,
      tabId,
      state.activeBrowserTabId,
      state.activeBrowserWorkspaceId,
      activeWorkspace?.color,
      activeWorkspace?.name
    );

    if (splitTabId === tabId) setSplitTabId(null);

    updateState({
      browserTabs: remainingTabs,
      activeBrowserTabId: nextActiveTabId
    });
  };

  const handleNewTab = () => {
    const { newTab, updatedTabs, updatedWorkspaces } = tabsService.createNewTab(
      state.browserTabs,
      state.browserWorkspaces,
      state.activeBrowserWorkspaceId,
      activeWorkspace?.color,
      activeWorkspace?.name
    );

    updateState({
      browserTabs: updatedTabs,
      activeBrowserTabId: newTab.id,
      browserWorkspaces: updatedWorkspaces
    });
    if (viewMode !== 'browser') setViewMode('browser');
  };

  const handleTogglePinTab = (tabId: string) => {
    const updated = tabsService.togglePinTab(state.browserTabs, tabId);
    updateState({ browserTabs: updated });
  };

  const handleToggleMuteTab = (tabId: string) => {
    const updated = tabsService.toggleMuteTab(state.browserTabs, tabId);
    updateState({ browserTabs: updated });
  };

  const handleToggleSplitView = (tabId: string) => {
    if (splitTabId === tabId) {
      setSplitTabId(null);
    } else {
      setSplitTabId(tabId);
    }
  };

  const handleToggleGroupCollapse = (groupId: string) => {
    const updatedGroups = (state.browserTabGroups || []).map(g =>
      g.id === groupId ? { ...g, isCollapsed: !g.isCollapsed } : g
    );
    updateState({ browserTabGroups: updatedGroups });
  };

  const handleCreateGroup = (title: string, color: string, tabIds: string[]) => {
    const newGroup = tabsService.createTabGroup(
      title,
      color,
      tabIds,
      state.activeBrowserWorkspaceId
    );
    updateState({
      browserTabGroups: [...(state.browserTabGroups || []), newGroup]
    });
  };

  // NAVIGATION ACTIONS
  const handleNavigate = async (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      if (cleanUrl.includes('.') && !cleanUrl.includes(' ')) {
        cleanUrl = 'https://' + cleanUrl;
      } else {
        cleanUrl = `https://search.omni.com?q=${encodeURIComponent(cleanUrl)}`;
      }
    }

    if (viewMode !== 'browser') setViewMode('browser');

    if (activeTab) {
      let pageTitle = 'Web Page';
      if (cleanUrl === 'https://omni.com') pageTitle = 'OMNI Sovereign Gateway';
      else if (cleanUrl.includes('discover.omni.com')) pageTitle = 'OMNI Discover — Personalised Intelligence Feed';
      else if (cleanUrl.includes('magazine.omni.com')) pageTitle = 'OMNI AI Magazine — Peer-Reviewed Editorial';
      else if (cleanUrl.includes('creator.omni.com')) pageTitle = 'OMNI Creator Studio — Multi-Format Publishing';
      else if (cleanUrl.includes('monetize.omni.com')) pageTitle = 'OMNI Monetisation & Sovereign Revenue';
      else if (cleanUrl.includes('content.omni.com')) pageTitle = 'OMNI Content Ecosystem Hub';
      else if (cleanUrl.includes('ai.omni.com')) pageTitle = 'OMNI AI — Universal Multimodal Intelligence';
      else if (cleanUrl.includes('passport.omni.com')) pageTitle = 'OMNI Passport — Sovereign Identity';
      else if (cleanUrl.includes('pay.omni.com')) pageTitle = 'OMNI Pay — Double-Entry Settlement';
      else if (cleanUrl.includes('cloud.omni.com')) pageTitle = 'OMNI Cloud — Distributed Containers';
      else if (cleanUrl.includes('search.omni.com')) pageTitle = 'OMNI Grounded Search';
      else if (cleanUrl.includes('arxiv.org')) pageTitle = 'arXiv:2608.10921 — Sovereign Multi-Agent Orchestration';
      else if (cleanUrl.includes('techcrunch.com')) pageTitle = 'TechCrunch: Sovereign AI Architecture 2026';
      else if (cleanUrl.includes('terminal.finance')) pageTitle = 'Sovereign Reserves FX Terminal';
      else if (cleanUrl.includes('github.com')) pageTitle = 'GitHub: omni-core-runtime';

      const updatedTab: OmniBrowserTab = {
        ...activeTab,
        url: cleanUrl,
        title: pageTitle,
        canGoBack: true,
        trackersBlockedCount: Math.floor(Math.random() * 8) + 2,
        adsBlockedCount: Math.floor(Math.random() * 12) + 3,
        fingerprintAttemptsDeflected: 1,
        lastAccessedAt: new Date().toISOString()
      };

      const updatedHistory = historyService.recordVisit(
        state.browserHistory || [],
        cleanUrl,
        pageTitle,
        state.activeBrowserWorkspaceId,
        updatedTab.trackersBlockedCount
      );

      updateState({
        browserTabs: state.browserTabs.map(t => (t.id === activeTab.id ? updatedTab : t)),
        browserHistory: updatedHistory.slice(0, 100)
      });
    }
  };

  const handleGoBack = () => {
    if (activeTab) {
      handleNavigate('https://omni.com');
    }
  };

  const handleGoForward = () => {
    if (activeTab) {
      handleNavigate('https://ai.omni.com');
    }
  };

  const handleReload = () => {
    if (activeTab) {
      updateState({
        browserTabs: state.browserTabs.map(t =>
          t.id === activeTab.id ? { ...t, isLoading: true } : t
        )
      });
      setTimeout(() => {
        updateState({
          browserTabs: state.browserTabs.map(t =>
            t.id === activeTab.id ? { ...t, isLoading: false } : t
          )
        });
      }, 350);
    }
  };

  const handleGoHome = () => {
    handleNavigate('https://omni.com');
  };

  const handleToggleBookmark = (tab: OmniBrowserTab) => {
    const existing = (state.browserBookmarks || []).find(b => b.url === tab.url);
    if (existing) {
      updateState({
        browserBookmarks: state.browserBookmarks.filter(b => b.id !== existing.id)
      });
    } else {
      const newBm = bookmarksService.createBookmark(tab.title, tab.url, 'fld_ecosystem', ['sovereign']);
      updateState({
        browserBookmarks: [...(state.browserBookmarks || []), newBm]
      });
    }
  };

  const handleToggleReaderMode = () => {
    if (activeTab) {
      updateState({
        browserTabs: state.browserTabs.map(t =>
          t.id === activeTab.id ? { ...t, readerModeActive: !t.readerModeActive } : t
        )
      });
    }
  };

  // WORKSPACE ACTIONS
  const handleSelectWorkspace = (workspaceId: string) => {
    updateState({ activeBrowserWorkspaceId: workspaceId });
    const targetWsTabs = state.browserTabs.filter(t => t.workspaceId === workspaceId);
    if (targetWsTabs.length > 0) {
      updateState({ activeBrowserTabId: targetWsTabs[0].id });
    }
  };

  const handleCreateWorkspace = (name: string, color: string, icon: string) => {
    const { newWorkspace, newHomeTab } = tabsService.createWorkspace(
      name,
      color,
      icon,
      `Isolated cryptographic container for ${name}`
    );

    updateState({
      browserWorkspaces: [...state.browserWorkspaces, newWorkspace],
      browserTabs: [...state.browserTabs, newHomeTab],
      activeBrowserWorkspaceId: newWorkspace.id,
      activeBrowserTabId: newHomeTab.id
    });
  };

  // SESSION SAVE & RESTORE
  const handleSaveSessionNow = () => {
    if (!activeWorkspace) return;
    const newSession = sessionsService.saveWorkspaceSession(
      activeWorkspace,
      state.browserTabs,
      state.browserTabGroups || [],
      `${activeWorkspace.name} Snapshot (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
    );

    updateState({
      browserSavedSessions: [newSession, ...(state.browserSavedSessions || [])]
    });
    setSidebarMode('projects_sessions');
    setIsSidebarOpen(true);
  };

  const handleRestoreSession = (session: OmniBrowserSavedSession) => {
    const restoredTabs = sessionsService.restoreSession(session);
    updateState({
      browserTabs: [...state.browserTabs, ...restoredTabs],
      activeBrowserTabId: restoredTabs[0]?.id || state.activeBrowserTabId,
      activeBrowserWorkspaceId: session.workspaceId
    });
  };

  // SIDEBAR DRAWER TRIGGERS
  const handleToggleAiSidebar = () => {
    setIsAiPanelOpen(prev => !prev);
  };

  const handleOpenAiAssistantWithSubMode = (subMode: OmniBrowserAssistantSubMode) => {
    setAiPanelSubMode(subMode);
    setIsAiPanelOpen(true);
  };

  const handleTriggerAskOmniAction = (actionType: string, subMode: OmniBrowserAssistantSubMode) => {
    setAiPanelSubMode(subMode);
    setIsAiPanelOpen(true);
  };

  const openDrawer = (mode: BrowserSidebarMode) => {
    setSidebarMode(mode);
    setIsSidebarOpen(true);
  };

  // SECURITY & VPN ACTIONS
  const handleToggleVpn = () => {
    const nextConnected = !state.browserVpnState.isConnected;
    updateState({
      browserVpnState: {
        ...state.browserVpnState,
        isConnected: nextConnected,
        ipMasked: nextConnected ? '194.38.20.114' : '172.56.21.9'
      }
    });
  };

  const handleToggleShield = (shieldId: string) => {
    updateState({
      browserPrivacyShields: state.browserPrivacyShields.map(s =>
        s.id === shieldId ? { ...s, isEnabled: !s.isEnabled } : s
      )
    });
  };

  const handleSelectVpnNode = (nodeId: string) => {
    const node = state.browserVpnNodes.find(n => n.id === nodeId);
    if (node) {
      updateState({
        browserVpnState: {
          ...state.browserVpnState,
          activeNodeId: nodeId,
          isConnected: true,
          ipMasked: node.ipAddress
        }
      });
    }
  };

  const handleInvokeAiAction = (
    action: 'summarize' | 'fact_check' | 'translate' | 'extract_data' | 'research' | 'shopping' | 'create_content' | 'voice',
    tab: OmniBrowserTab
  ) => {
    if (action === 'research') {
      setAiPanelSubMode('research');
    } else if (action === 'shopping') {
      setAiPanelSubMode('shopping');
    } else if (action === 'create_content') {
      setAiPanelSubMode('content_create');
    } else if (action === 'voice') {
      setAiPanelSubMode('voice');
    } else {
      setAiPanelSubMode('page_understanding');
    }
    setIsAiPanelOpen(true);
  };

  // Check if active tab is Sovereign Home page
  const isHomePage = activeTab?.url === 'https://omni.com' && !activeTab.readerModeActive;

  return (
    <div id="omni-browser-application" className="flex flex-col h-full w-full bg-stone-950 text-stone-100 overflow-hidden font-sans">
      {/* 1. Chrome Tab Strip */}
      <OmniBrowserTabBar
        tabs={state.browserTabs}
        activeTabId={state.activeBrowserTabId}
        workspaces={state.browserWorkspaces}
        activeWorkspaceId={state.activeBrowserWorkspaceId}
        tabGroups={state.browserTabGroups || []}
        onSelectTab={handleSelectTab}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
        onTogglePinTab={handleTogglePinTab}
        onToggleMuteTab={handleToggleMuteTab}
        onToggleSplitView={handleToggleSplitView}
        onToggleGroupCollapse={handleToggleGroupCollapse}
        onCreateGroup={handleCreateGroup}
        onSaveSessionClick={handleSaveSessionNow}
        splitTabId={splitTabId}
      />

      {/* 2. Navigation / Omnibox Bar */}
      <OmniBrowserNavBar
        activeTab={activeTab}
        workspaces={state.browserWorkspaces}
        activeWorkspaceId={state.activeBrowserWorkspaceId}
        extensions={state.browserExtensions}
        vpnState={state.browserVpnState}
        vpnNodes={state.browserVpnNodes}
        bookmarks={state.browserBookmarks}
        apps={state.apps}
        isAiSidebarOpen={isAiPanelOpen}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onReload={handleReload}
        onGoHome={handleGoHome}
        onToggleBookmark={handleToggleBookmark}
        onToggleReaderMode={handleToggleReaderMode}
        onToggleAiSidebar={handleToggleAiSidebar}
        onSelectWorkspace={handleSelectWorkspace}
        onOpenSecurityCenter={() => setViewMode('security_centre')}
        onOpenDownloads={() => openDrawer('downloads')}
        onOpenHistory={() => openDrawer('history')}
        onOpenSettings={() => setViewMode('settings')}
        onOpenReadingList={() => openDrawer('reading_list')}
        onOpenProjectsSessions={() => openDrawer('projects_sessions')}
        onOpenSync={() => openDrawer('encrypted_sync')}
        onOpenDeviceRegistry={() => openDrawer('device_registry')}
        onOpenEngine={() => openDrawer('multiplatform_engine')}
        onOpenAskOmniCommandBar={() => setIsAskOmniOpen(true)}
        onLaunchApp={(appId) => {
          if (onNavigateApp) onNavigateApp(appId);
        }}
        onToggleVpn={handleToggleVpn}
      />

      {/* 3. Main Stage: Home / WebView / Security Centre / Settings */}
      <div className="flex-1 flex overflow-hidden relative">
        {viewMode === 'security_centre' ? (
          <OmniBrowserSecurityCentre
            privacyShields={state.browserPrivacyShields}
            vpnState={state.browserVpnState}
            vpnNodes={state.browserVpnNodes}
            auditLogs={state.browserSecurityAuditLogs}
            onToggleShield={handleToggleShield}
            onSelectVpnNode={handleSelectVpnNode}
            onToggleVpn={handleToggleVpn}
            onToggleKillSwitch={() => {
              updateState({
                browserVpnState: {
                  ...state.browserVpnState,
                  killSwitchEnabled: !state.browserVpnState.killSwitchEnabled
                }
              });
            }}
            onToggleTorBridge={() => {
              updateState({
                browserVpnState: {
                  ...state.browserVpnState,
                  torRoutingEnabled: !state.browserVpnState.torRoutingEnabled
                }
              });
            }}
            onSelectDohProvider={(provider) => {
              updateState({
                browserVpnState: {
                  ...state.browserVpnState,
                  dohProvider: provider
                }
              });
            }}
            onClose={() => setViewMode('browser')}
          />
        ) : viewMode === 'settings' ? (
          <OmniBrowserSettings
            settings={state.browserSettings}
            searchEngines={state.browserSearchEngines}
            onUpdateSettings={(newSettings) => {
              updateState({
                browserSettings: { ...state.browserSettings, ...newSettings }
              });
            }}
            onClearBrowsingData={() => {
              updateState({
                browserHistory: [],
                browserDownloads: []
              });
            }}
            onClose={() => setViewMode('browser')}
          />
        ) : (
          /* Standard Browser Viewport */
          <div className="flex-1 flex overflow-hidden">
            {/* Primary Viewport */}
            {isHomePage ? (
              <OmniBrowserHome
                workspaces={state.browserWorkspaces}
                activeWorkspaceId={state.activeBrowserWorkspaceId}
                bookmarks={state.browserBookmarks}
                privacyShields={state.browserPrivacyShields}
                vpnState={state.browserVpnState}
                onNavigate={handleNavigate}
                onSelectWorkspace={handleSelectWorkspace}
                onOpenSecurityCenter={() => setViewMode('security_centre')}
              />
            ) : activeTab ? (
              <OmniBrowserWebView
                tab={activeTab}
                onNavigate={handleNavigate}
                onToggleReaderMode={handleToggleReaderMode}
                onInvokeAiAction={handleInvokeAiAction}
              />
            ) : null}

            {/* Split Screen Secondary Viewport */}
            {splitTab && splitTab.id !== activeTab?.id && (
              <div className="flex-1 border-l-2 border-stone-700 flex flex-col overflow-hidden">
                <div className="px-3 py-1 bg-stone-900 border-b border-stone-800 text-[11px] font-semibold text-stone-300 flex justify-between items-center">
                  <span>Split View: {splitTab.title}</span>
                  <button
                    onClick={() => setSplitTabId(null)}
                    className="text-stone-500 hover:text-stone-300"
                  >
                    Close Split
                  </button>
                </div>
                <OmniBrowserWebView
                  tab={splitTab}
                  onNavigate={handleNavigate}
                  onToggleReaderMode={() => {}}
                  onInvokeAiAction={handleInvokeAiAction}
                />
              </div>
            )}
          </div>
        )}

        {/* 4. Collapsible Multi-Drawer Sidebar */}
        {isSidebarOpen && (
          <OmniBrowserSidebar
            mode={sidebarMode}
            activeTab={activeTab}
            workspaces={state.browserWorkspaces}
            activeWorkspaceId={state.activeBrowserWorkspaceId}
            bookmarks={state.browserBookmarks}
            bookmarkFolders={state.browserBookmarkFolders}
            history={state.browserHistory}
            downloads={state.browserDownloads}
            extensions={state.browserExtensions}
            privacyShields={state.browserPrivacyShields}
            vpnState={state.browserVpnState}
            vpnNodes={state.browserVpnNodes}
            readingList={state.browserReadingList || []}
            savedSessions={state.browserSavedSessions || []}
            projectSpaces={state.browserProjectSpaces || []}
            syncConfig={state.browserSyncConfig}
            syncPayloads={state.browserSyncPayloads || []}
            authorizedDevices={state.browserAuthorizedDevices || []}
            securitySessions={state.browserSecuritySessions || []}
            suspiciousAlerts={state.browserSuspiciousAlerts || []}
            activePlatform={state.browserActivePlatform || 'desktop'}
            tabs={state.browserTabs}
            tabGroups={state.browserTabGroups || []}
            fullState={state}
            onClose={() => setIsSidebarOpen(false)}
            onNavigate={handleNavigate}
            onSelectWorkspace={handleSelectWorkspace}
            onCreateWorkspace={handleCreateWorkspace}
            onDeleteBookmark={(id) => {
              updateState({
                browserBookmarks: state.browserBookmarks.filter(b => b.id !== id)
              });
            }}
            onUpdateBookmarks={(bms) => {
              updateState({ browserBookmarks: bms });
            }}
            onClearHistory={() => {
              updateState({ browserHistory: [] });
            }}
            onUpdateHistory={(hist) => {
              updateState({ browserHistory: hist });
            }}
            onUpdateDownloads={(dw) => {
              updateState({ browserDownloads: dw });
            }}
            onToggleExtension={(id) => {
              updateState({
                browserExtensions: state.browserExtensions.map(e =>
                  e.id === id ? { ...e, isEnabled: !e.isEnabled } : e
                )
              });
            }}
            onToggleShield={handleToggleShield}
            onToggleVpn={handleToggleVpn}
            onUpdateReadingList={(items: OmniBrowserReadingListItem[]) => {
              updateState({ browserReadingList: items });
            }}
            onUpdateSavedSessions={(sessions: OmniBrowserSavedSession[]) => {
              updateState({ browserSavedSessions: sessions });
            }}
            onUpdateProjectSpaces={(spaces: OmniBrowserProjectSpace[]) => {
              updateState({ browserProjectSpaces: spaces });
            }}
            onRestoreSession={handleRestoreSession}
            onUpdateSyncConfig={(cfg: OmniBrowserSyncConfig) => {
              updateState({ browserSyncConfig: cfg });
            }}
            onAddSyncPayload={(payload: OmniBrowserSyncPayload, newCfg: OmniBrowserSyncConfig) => {
              updateState({
                browserSyncConfig: newCfg,
                browserSyncPayloads: [payload, ...(state.browserSyncPayloads || [])]
              });
            }}
            onRevokeDevice={(devId: string) => {
              const { updatedDevices, updatedSessions, auditLog } = deviceSecurityService.revokeDevice(
                state.browserAuthorizedDevices || [],
                state.browserSecuritySessions || [],
                devId
              );
              updateState({
                browserAuthorizedDevices: updatedDevices,
                browserSecuritySessions: updatedSessions,
                browserSecurityLogs: [auditLog, ...(state.browserSecurityLogs || [])]
              });
            }}
            onResolveAlert={(alertId: string) => {
              const updatedAlerts = deviceSecurityService.resolveAlert(
                state.browserSuspiciousAlerts || [],
                alertId
              );
              updateState({ browserSuspiciousAlerts: updatedAlerts });
            }}
            onSwitchPlatform={(platform: BrowserPlatformType) => {
              updateState({ browserActivePlatform: platform });
            }}
          />
        )}
      </div>

      {/* 5. Prompt 3: OMNI AI Browser Assistant Companion Panel */}
      {activeTab && (
        <OmniBrowserAiAssistantPanel
          activeTab={activeTab}
          allTabs={state.browserTabs}
          isOpen={isAiPanelOpen}
          onClose={() => setIsAiPanelOpen(false)}
          initialSubMode={aiPanelSubMode}
          onNavigateUrl={handleNavigate}
          onExportToDocs={(title, markdown) => {
            if (onNavigateApp) {
              onNavigateApp('docs');
            }
          }}
        />
      )}

      {/* 6. Prompt 3: "Ask OMNI" Command Bar Modal (⌘K) */}
      {activeTab && (
        <OmniAskOmniCommandBar
          isOpen={isAskOmniOpen}
          onClose={() => setIsAskOmniOpen(false)}
          activeTab={activeTab}
          onTriggerAction={(actionType, subMode, presetPrompt) => {
            handleTriggerAskOmniAction(actionType, subMode);
          }}
        />
      )}
    </div>
  );
};
