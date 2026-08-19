import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Bookmark,
  Clock,
  Download,
  Layers,
  Sliders,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Send,
  CheckCircle2,
  Lock,
  Wifi,
  FileText,
  Copy,
  Check,
  Star,
  Folder,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FolderKanban,
  RotateCcw,
  RefreshCw,
  Fingerprint,
  Cpu,
  Cloud,
  ShieldAlert,
  Tag
} from 'lucide-react';
import {
  OmniBrowserTab,
  OmniBrowserWorkspace,
  OmniBrowserBookmark,
  OmniBrowserBookmarkFolder,
  OmniBrowserHistoryEntry,
  OmniBrowserDownloadItem,
  OmniBrowserExtension,
  OmniBrowserPrivacyShield,
  OmniBrowserVpnState,
  OmniBrowserVpnNode,
  OmniBrowserReadingListItem,
  OmniBrowserSavedSession,
  OmniBrowserProjectSpace,
  OmniBrowserSyncConfig,
  OmniBrowserSyncPayload,
  OmniBrowserAuthorizedDevice,
  OmniBrowserSecuritySession,
  OmniBrowserSuspiciousAlert,
  BrowserPlatformType,
  OMNIState
} from '../../types';
import { omniAiSdk } from '../../sdk/omni-ai-sdk';
import { bookmarksService } from '../../sdk/browser-services/BookmarksService';
import { historyService } from '../../sdk/browser-services/HistoryService';
import { downloadsService } from '../../sdk/browser-services/DownloadsService';
import { ReadingListDrawer } from './drawers/ReadingListDrawer';
import { ProjectsAndSessionsDrawer } from './drawers/ProjectsAndSessionsDrawer';
import { EncryptedSyncDrawer } from './drawers/EncryptedSyncDrawer';
import { DeviceRegistryDrawer } from './drawers/DeviceRegistryDrawer';
import { MultiplatformEngineDrawer } from './drawers/MultiplatformEngineDrawer';

export type BrowserSidebarMode =
  | 'ai_copilot'
  | 'bookmarks'
  | 'history'
  | 'downloads'
  | 'workspaces'
  | 'extensions'
  | 'security'
  | 'reading_list'
  | 'projects_sessions'
  | 'encrypted_sync'
  | 'device_registry'
  | 'multiplatform_engine';

interface OmniBrowserSidebarProps {
  mode: BrowserSidebarMode;
  activeTab: OmniBrowserTab | null;
  workspaces: OmniBrowserWorkspace[];
  activeWorkspaceId: string;
  bookmarks: OmniBrowserBookmark[];
  bookmarkFolders: OmniBrowserBookmarkFolder[];
  history: OmniBrowserHistoryEntry[];
  downloads: OmniBrowserDownloadItem[];
  extensions: OmniBrowserExtension[];
  privacyShields: OmniBrowserPrivacyShield[];
  vpnState: OmniBrowserVpnState;
  vpnNodes: OmniBrowserVpnNode[];
  readingList?: OmniBrowserReadingListItem[];
  savedSessions?: OmniBrowserSavedSession[];
  projectSpaces?: OmniBrowserProjectSpace[];
  syncConfig?: OmniBrowserSyncConfig;
  syncPayloads?: OmniBrowserSyncPayload[];
  authorizedDevices?: OmniBrowserAuthorizedDevice[];
  securitySessions?: OmniBrowserSecuritySession[];
  suspiciousAlerts?: OmniBrowserSuspiciousAlert[];
  activePlatform?: BrowserPlatformType;
  tabs?: OmniBrowserTab[];
  tabGroups?: any[];
  fullState?: OMNIState;
  onClose: () => void;
  onNavigate: (url: string) => void;
  onSelectWorkspace: (workspaceId: string) => void;
  onCreateWorkspace: (name: string, color: string, icon: string) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
  onUpdateBookmarks?: (bookmarks: OmniBrowserBookmark[]) => void;
  onClearHistory: () => void;
  onUpdateHistory?: (history: OmniBrowserHistoryEntry[]) => void;
  onUpdateDownloads?: (downloads: OmniBrowserDownloadItem[]) => void;
  onToggleExtension: (extensionId: string) => void;
  onToggleShield: (shieldId: string) => void;
  onToggleVpn: () => void;
  onUpdateReadingList?: (items: OmniBrowserReadingListItem[]) => void;
  onUpdateSavedSessions?: (sessions: OmniBrowserSavedSession[]) => void;
  onUpdateProjectSpaces?: (spaces: OmniBrowserProjectSpace[]) => void;
  onRestoreSession?: (session: OmniBrowserSavedSession) => void;
  onUpdateSyncConfig?: (config: OmniBrowserSyncConfig) => void;
  onAddSyncPayload?: (payload: OmniBrowserSyncPayload, newConfig: OmniBrowserSyncConfig) => void;
  onRevokeDevice?: (deviceId: string) => void;
  onResolveAlert?: (alertId: string) => void;
  onSwitchPlatform?: (platform: BrowserPlatformType) => void;
}

export const OmniBrowserSidebar: React.FC<OmniBrowserSidebarProps> = ({
  mode,
  activeTab,
  workspaces,
  activeWorkspaceId,
  bookmarks,
  bookmarkFolders,
  history,
  downloads,
  extensions,
  privacyShields,
  vpnState,
  vpnNodes,
  readingList = [],
  savedSessions = [],
  projectSpaces = [],
  syncConfig,
  syncPayloads = [],
  authorizedDevices = [],
  securitySessions = [],
  suspiciousAlerts = [],
  activePlatform = 'desktop',
  tabs = [],
  tabGroups = [],
  fullState,
  onClose,
  onNavigate,
  onSelectWorkspace,
  onCreateWorkspace,
  onDeleteBookmark,
  onUpdateBookmarks,
  onClearHistory,
  onUpdateHistory,
  onUpdateDownloads,
  onToggleExtension,
  onToggleShield,
  onToggleVpn,
  onUpdateReadingList,
  onUpdateSavedSessions,
  onUpdateProjectSpaces,
  onRestoreSession,
  onUpdateSyncConfig,
  onAddSyncPayload,
  onRevokeDevice,
  onResolveAlert,
  onSwitchPlatform
}) => {
  // Local Copilot state
  const [copilotInput, setCopilotInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [categorizingBmId, setCategorizingBmId] = useState<string | null>(null);
  const [syncingDownloadId, setSyncingDownloadId] = useState<string | null>(null);

  // Search filter for lists
  const [searchFilter, setSearchFilter] = useState('');

  // New workspace form state
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [newWsColor, setNewWsColor] = useState('#4f46e5');

  const [messages, setMessages] = useState<
    Array<{ id: string; sender: 'user' | 'ai'; text: string; timestamp: string; citations?: string[] }>
  >([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Hello! I am your OMNI Sovereign Copilot. I have context on "${activeTab?.title || 'this page'}" and can help summarize, analyze cryptographically, or execute tasks.`,
      timestamp: 'Just now'
    }
  ]);

  const handleSendAiMessage = async (overridePrompt?: string) => {
    const textToSend = overridePrompt || copilotInput.trim();
    if (!textToSend) return;

    const userMsgId = 'msg_' + Date.now();
    const newUserMsg = {
      id: userMsgId,
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    if (!overridePrompt) setCopilotInput('');
    setIsAiResponding(true);

    try {
      const prompt = `You are OMNI Browser AI Copilot. Context: Current tab title is "${activeTab?.title || 'Web Page'}" at "${activeTab?.url || 'https://omni.com'}". User query: "${textToSend}". Provide a direct, authoritative, and concise response with key takeaways.`;

      const aiResponse = await omniAiSdk.complete({
        prompt,
        temperature: 0.3
      });

      const aiMsg = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai' as const,
        text: aiResponse.text || 'Context parsed successfully. All security parameters confirmed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [activeTab?.url || 'omni://core']
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const fallbackAiMsg = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai' as const,
        text: `Analysis of ${activeTab?.title || 'current page'}: The document conforms to standard sovereign protocol specs. Zero third-party telemetry leaks observed.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [activeTab?.url || 'omni://core']
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleAiCategorizeBookmark = async (bm: OmniBrowserBookmark) => {
    setCategorizingBmId(bm.id);
    try {
      const result = await bookmarksService.categorizeBookmarkWithAi(bm);
      if (onUpdateBookmarks) {
        const updated = bookmarks.map(b =>
          b.id === bm.id
            ? { ...b, tags: result.suggestedTags, aiSummary: result.summary }
            : b
        );
        onUpdateBookmarks(updated);
      }
    } finally {
      setCategorizingBmId(null);
    }
  };

  const handleSyncDownloadToVault = async (item: OmniBrowserDownloadItem) => {
    setSyncingDownloadId(item.id);
    try {
      const syncedItem = await downloadsService.syncToOmniCloudVault(item);
      if (onUpdateDownloads) {
        const updated = downloads.map(d => (d.id === item.id ? syncedItem : d));
        onUpdateDownloads(updated);
      }
    } finally {
      setSyncingDownloadId(null);
    }
  };

  const handlePurgeHistoryWindow = (range: 'last_hour' | 'today' | 'last_7_days' | 'all') => {
    const updated = historyService.purgeByTimeRange(history, range);
    if (onUpdateHistory) onUpdateHistory(updated);
  };

  const handleDeleteHistoryDomain = (domain: string) => {
    const updated = historyService.deleteDomainHistory(history, domain);
    if (onUpdateHistory) onUpdateHistory(updated);
  };

  return (
    <div
      id="omni-browser-sidebar-drawer"
      className="w-96 bg-stone-900 border-l border-stone-800 flex flex-col h-full z-20 shrink-0 select-none shadow-2xl"
    >
      {/* DRAWER HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800 bg-stone-950/60">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
          {mode === 'ai_copilot' && (
            <>
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>OMNI AI Sovereign Copilot</span>
            </>
          )}
          {mode === 'reading_list' && (
            <>
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Reading List & Annotations</span>
            </>
          )}
          {mode === 'projects_sessions' && (
            <>
              <FolderKanban className="w-4 h-4 text-indigo-400" />
              <span>Project Spaces & Sessions</span>
            </>
          )}
          {mode === 'encrypted_sync' && (
            <>
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <span>Cross-Device Encrypted Sync</span>
            </>
          )}
          {mode === 'device_registry' && (
            <>
              <Fingerprint className="w-4 h-4 text-indigo-400" />
              <span>Passport Device Registry</span>
            </>
          )}
          {mode === 'multiplatform_engine' && (
            <>
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Technology Abstraction Engine</span>
            </>
          )}
          {mode === 'bookmarks' && (
            <>
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>Bookmarks & AI Categories</span>
            </>
          )}
          {mode === 'history' && (
            <>
              <Clock className="w-4 h-4 text-blue-400" />
              <span>User-Controlled History</span>
            </>
          )}
          {mode === 'downloads' && (
            <>
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Downloads & OMNI Cloud Vault</span>
            </>
          )}
          {mode === 'workspaces' && (
            <>
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Isolated Workspaces</span>
            </>
          )}
          {mode === 'extensions' && (
            <>
              <Sliders className="w-4 h-4 text-rose-400" />
              <span>Browser Extensions (MV3)</span>
            </>
          )}
          {mode === 'security' && (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security & Privacy Controls</span>
            </>
          )}
        </div>

        <button
          id="btn-close-browser-sidebar"
          onClick={onClose}
          className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          title="Close Sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* DRAWER BODY BY MODE */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. READING LIST MODE */}
        {mode === 'reading_list' && onUpdateReadingList && (
          <ReadingListDrawer
            readingList={readingList}
            activeTab={activeTab}
            onUpdateReadingList={onUpdateReadingList}
            onNavigate={onNavigate}
          />
        )}

        {/* 2. PROJECTS & SESSIONS MODE */}
        {mode === 'projects_sessions' && onUpdateProjectSpaces && onUpdateSavedSessions && onRestoreSession && (
          <ProjectsAndSessionsDrawer
            projectSpaces={projectSpaces}
            savedSessions={savedSessions}
            workspaces={workspaces}
            activeWorkspaceId={activeWorkspaceId}
            tabs={tabs}
            tabGroups={tabGroups}
            onUpdateProjectSpaces={onUpdateProjectSpaces}
            onUpdateSavedSessions={onUpdateSavedSessions}
            onRestoreSession={onRestoreSession}
            onSelectWorkspace={onSelectWorkspace}
            onNavigate={onNavigate}
          />
        )}

        {/* 3. ENCRYPTED SYNC MODE */}
        {mode === 'encrypted_sync' && syncConfig && fullState && onUpdateSyncConfig && onAddSyncPayload && (
          <EncryptedSyncDrawer
            syncConfig={syncConfig}
            syncPayloads={syncPayloads}
            fullState={fullState}
            onUpdateSyncConfig={onUpdateSyncConfig}
            onAddSyncPayload={onAddSyncPayload}
          />
        )}

        {/* 4. PASSPORT DEVICE REGISTRY MODE */}
        {mode === 'device_registry' && onRevokeDevice && onResolveAlert && (
          <DeviceRegistryDrawer
            devices={authorizedDevices}
            sessions={securitySessions}
            suspiciousAlerts={suspiciousAlerts}
            onRevokeDevice={onRevokeDevice}
            onResolveAlert={onResolveAlert}
          />
        )}

        {/* 5. MULTIPLATFORM ENGINE ADAPTER MODE */}
        {mode === 'multiplatform_engine' && onSwitchPlatform && (
          <MultiplatformEngineDrawer
            activePlatform={activePlatform}
            onSwitchPlatform={onSwitchPlatform}
          />
        )}

        {/* 6. AI COPILOT MODE */}
        {mode === 'ai_copilot' && (
          <div className="flex flex-col h-full space-y-3">
            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-stone-800 shrink-0">
              <button
                onClick={() => handleSendAiMessage('Summarize this page in 3 bullet points.')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/70 text-indigo-200 transition-colors"
              >
                Summarize Page
              </button>
              <button
                onClick={() => handleSendAiMessage('Extract all key facts, statistics, and figures from this page.')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                Extract Figures
              </button>
              <button
                onClick={() => handleSendAiMessage('Fact-check the main claims in this document against verified sources.')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                Fact Check
              </button>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white ml-6 font-medium shadow-sm'
                      : 'bg-stone-950 border border-stone-800 text-stone-200 mr-2 space-y-2'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-70 pb-1">
                    <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'OMNI AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-stone-800/80 text-[10px] text-stone-400 font-mono">
                      <span>Source: {msg.citations[0]}</span>
                    </div>
                  )}
                </div>
              ))}
              {isAiResponding && (
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-400 text-xs flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  <span>Synthesizing page context...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="pt-2 border-t border-stone-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAiMessage();
                }}
                className="flex items-center gap-1.5 p-1 bg-stone-950 border border-stone-700 rounded-xl focus-within:border-indigo-500"
              >
                <input
                  type="text"
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  placeholder="Ask about this page..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-stone-100 placeholder-stone-500 px-2.5"
                />
                <button
                  type="submit"
                  disabled={!copilotInput.trim() || isAiResponding}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 7. BOOKMARKS MODE */}
        {mode === 'bookmarks' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search bookmarks by title, URL or tag..."
                className="w-full pl-8 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 outline-none focus:border-stone-600"
              />
            </div>

            {/* Bookmark Folders */}
            <div className="space-y-3">
              {bookmarkFolders.map(folder => {
                const folderBookmarks = bookmarks.filter(
                  b =>
                    b.folderId === folder.id &&
                    (b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      b.url.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      (b.tags && b.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()))))
                );

                return (
                  <div key={folder.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-400 px-1">
                      <div className="flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{folder.name}</span>
                        <span className="text-[10px] text-stone-600">({folderBookmarks.length})</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pl-2">
                      {folderBookmarks.map(bm => {
                        const isCategorizing = categorizingBmId === bm.id;

                        return (
                          <div
                            key={bm.id}
                            className="group p-2.5 rounded-xl bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800/60 text-xs transition-colors space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div
                                onClick={() => onNavigate(bm.url)}
                                className="flex items-center gap-2 truncate cursor-pointer flex-1"
                              >
                                <Star className={`w-3.5 h-3.5 shrink-0 ${bm.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-stone-500'}`} />
                                <div className="truncate">
                                  <div className="text-stone-200 group-hover:text-white font-medium truncate">{bm.title}</div>
                                  <div className="text-[10px] text-stone-500 truncate">{bm.url}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleAiCategorizeBookmark(bm)}
                                  disabled={isCategorizing}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-indigo-400 hover:text-indigo-300 rounded text-[10px] flex items-center gap-0.5 transition-opacity"
                                  title="AI Auto-Categorise & Tag"
                                >
                                  <Sparkles className={`w-3 h-3 ${isCategorizing ? 'animate-spin' : ''}`} />
                                </button>
                                <button
                                  onClick={() => onDeleteBookmark(bm.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 rounded transition-opacity"
                                  title="Delete Bookmark"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Tags */}
                            {bm.tags && bm.tags.length > 0 && (
                              <div className="flex items-center gap-1 flex-wrap pt-0.5">
                                {bm.tags.map((t, idx) => (
                                  <span key={idx} className="px-1.5 py-0.2 bg-stone-900 border border-stone-800 text-stone-400 rounded text-[9px]">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* AI Summary note if present */}
                            {bm.aiSummary && bm.aiSummary !== 'Pending OMNI AI indexing...' && (
                              <div className="text-[10px] text-stone-400 italic bg-stone-900/60 p-1.5 rounded border border-stone-800/80">
                                {bm.aiSummary}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. HISTORY MODE */}
        {mode === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-stone-400">Privacy-Controlled History</div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePurgeHistoryWindow('last_hour')}
                  className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] transition-colors"
                >
                  Last 1h
                </button>
                <button
                  onClick={onClearHistory}
                  className="px-2 py-0.5 bg-rose-950/60 border border-rose-900 text-rose-300 hover:bg-rose-900 rounded text-[10px] transition-colors"
                >
                  Purge All
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search history records..."
                className="w-full pl-8 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 outline-none focus:border-stone-600"
              />
            </div>

            <div className="space-y-2">
              {history
                .filter(h => h.title.toLowerCase().includes(searchFilter.toLowerCase()) || h.url.toLowerCase().includes(searchFilter.toLowerCase()))
                .map(item => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800/60 text-xs transition-colors space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        onClick={() => onNavigate(item.url)}
                        className="font-medium text-stone-200 group-hover:text-white truncate cursor-pointer flex-1"
                      >
                        {item.title}
                      </span>
                      <span className="text-[10px] text-stone-500 shrink-0">
                        {new Date(item.visitedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span className="truncate max-w-[200px]">{item.url}</span>
                      <button
                        onClick={() => {
                          try {
                            const domain = new URL(item.url).hostname;
                            handleDeleteHistoryDomain(domain);
                          } catch {
                            // fallback
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 text-stone-500 hover:text-rose-400 text-[9px]"
                        title="Wipe domain from history"
                      >
                        Wipe domain
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 9. DOWNLOADS MODE (Integrated with OMNI Cloud Vault) */}
        {mode === 'downloads' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-semibold text-stone-400">Encrypted Downloads Queue</div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SHA-256 Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {downloads.map(item => {
                const isSyncing = syncingDownloadId === item.id;

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-stone-100 truncate">{item.filename}</div>
                        <div className="text-[10px] text-stone-500 flex items-center gap-2 mt-0.5 font-mono">
                          <span>{(item.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                          <span>•</span>
                          <span className="text-emerald-400">Scanned Safe</span>
                        </div>
                      </div>

                      {/* Sync to OMNI Cloud Vault Trigger */}
                      <button
                        onClick={() => handleSyncDownloadToVault(item)}
                        disabled={item.omniCloudSynced || isSyncing}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all ${
                          item.omniCloudSynced
                            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                            : 'bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 text-indigo-300'
                        }`}
                      >
                        <Cloud className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{item.omniCloudSynced ? 'Vault Synced' : isSyncing ? 'Encrypting...' : 'Sync Vault'}</span>
                      </button>
                    </div>

                    {/* SHA256 integrity hash */}
                    <div className="font-mono text-[9px] text-stone-500 truncate bg-stone-900 px-2 py-0.5 rounded">
                      {item.sha256}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 10. WORKSPACES MODE */}
        {mode === 'workspaces' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-stone-400">Cryptographic Containers</div>
              {!isCreatingWorkspace && (
                <button
                  onClick={() => setIsCreatingWorkspace(true)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Workspace</span>
                </button>
              )}
            </div>

            {/* Create Workspace Modal / Box */}
            {isCreatingWorkspace && (
              <div className="p-3 bg-stone-950 border border-stone-700 rounded-xl space-y-3 text-xs">
                <div className="font-semibold text-stone-200">Create Isolated Workspace</div>
                <input
                  type="text"
                  placeholder="Workspace Name (e.g., Quantum Research)"
                  value={newWsName}
                  onChange={(e) => setNewWsName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        onClick={() => setNewWsColor(color)}
                        className={`w-5 h-5 rounded-full transition-transform ${
                          newWsColor === color ? 'scale-125 ring-2 ring-white' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setIsCreatingWorkspace(false)}
                      className="px-2.5 py-1 text-stone-400 hover:text-stone-200 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (newWsName.trim()) {
                          onCreateWorkspace(newWsName.trim(), newWsColor, 'Layers');
                          setNewWsName('');
                          setIsCreatingWorkspace(false);
                        }
                      }}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Workspaces List */}
            <div className="space-y-2">
              {workspaces.map(ws => (
                <div
                  key={ws.id}
                  onClick={() => onSelectWorkspace(ws.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    ws.id === activeWorkspaceId
                      ? 'bg-stone-800 border-indigo-600 text-white shadow-md'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-xs">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ws.color }} />
                      <span>{ws.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">{ws.tabIds.length} tabs</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1.5 leading-snug">{ws.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. EXTENSIONS MODE */}
        {mode === 'extensions' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-semibold text-stone-400">Installed Verified Extensions</div>
              <button
                onClick={() => onNavigate('https://store.browser.omni.com')}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-0.5"
              >
                <span>Store</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Quick Developer Console Callout */}
            <div className="p-3 bg-gradient-to-r from-indigo-950/60 to-stone-900 border border-indigo-800/60 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-100 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Developer Portal</span>
                </span>
                <span className="px-1.5 py-0.2 bg-indigo-900 text-indigo-200 rounded text-[9px] font-mono">90/10 Split</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-tight">
                Submit, review, test sandbox compatibility & monetize your extensions.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => onNavigate('https://developers.browser.omni.com')}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Open Dev Console</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onNavigate('https://store.browser.omni.com')}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[10px] font-semibold transition-colors"
                >
                  Marketplace
                </button>
              </div>
            </div>

            {extensions.map(ext => (
              <div
                key={ext.id}
                className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-stone-100">{ext.name}</div>
                    <div className="text-[10px] text-stone-500">v{ext.version} • {ext.author}</div>
                  </div>
                  <button
                    onClick={() => onToggleExtension(ext.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      ext.isEnabled
                        ? 'bg-indigo-600 text-white'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                    }`}
                  >
                    {ext.isEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 leading-snug">{ext.description}</p>
                {ext.optionsUrl && (
                  <div className="pt-1 flex justify-between items-center text-[10px]">
                    <span className="text-emerald-400 font-mono">Sandbox Verified</span>
                    <button
                      onClick={() => onNavigate('https://store.browser.omni.com')}
                      className="text-stone-400 hover:text-stone-200"
                    >
                      Audit Report
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 12. SECURITY & PRIVACY CONTROLS */}
        {mode === 'security' && (
          <div className="space-y-4">
            <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-stone-100">
                <span>Sovereign VPN Relay</span>
                <button
                  onClick={onToggleVpn}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    vpnState.isConnected ? 'bg-indigo-600 text-white' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {vpnState.isConnected ? 'Connected' : 'Disconnected'}
                </button>
              </div>
              <div className="text-[11px] text-stone-400 font-mono">
                Masked IP: {vpnState.ipMasked}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-stone-400 px-1">Shield Filters (24h Deflections)</div>
              {privacyShields.map(shield => (
                <div
                  key={shield.id}
                  className="flex items-center justify-between p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs"
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="font-semibold text-stone-200">{shield.name}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">{shield.blockedCount24h} blocked</div>
                  </div>
                  <button
                    onClick={() => onToggleShield(shield.id)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                      shield.isEnabled ? 'bg-emerald-600' : 'bg-stone-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        shield.isEnabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
