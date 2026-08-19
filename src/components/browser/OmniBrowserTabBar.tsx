import React, { useState } from 'react';
import {
  Plus,
  X,
  Pin,
  Volume2,
  VolumeX,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Columns,
  Layers,
  Sparkles,
  Lock,
  Globe,
  BookOpen,
  Newspaper,
  Terminal,
  Wallet,
  Server,
  TrendingUp,
  GitBranch,
  Search,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Save
} from 'lucide-react';
import { OmniBrowserTab, OmniBrowserTabGroup, OmniBrowserWorkspace } from '../../types';

interface OmniBrowserTabBarProps {
  tabs: OmniBrowserTab[];
  activeTabId: string;
  workspaces: OmniBrowserWorkspace[];
  activeWorkspaceId: string;
  tabGroups?: OmniBrowserTabGroup[];
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
  onTogglePinTab: (tabId: string) => void;
  onToggleMuteTab: (tabId: string) => void;
  onToggleSplitView?: (tabId: string) => void;
  onToggleGroupCollapse?: (groupId: string) => void;
  onCreateGroup?: (title: string, color: string, tabIds: string[]) => void;
  onSaveSessionClick?: () => void;
  splitTabId?: string | null;
}

export const OmniBrowserTabBar: React.FC<OmniBrowserTabBarProps> = ({
  tabs,
  activeTabId,
  workspaces,
  activeWorkspaceId,
  tabGroups = [],
  onSelectTab,
  onCloseTab,
  onNewTab,
  onTogglePinTab,
  onToggleMuteTab,
  onToggleSplitView,
  onToggleGroupCollapse,
  onCreateGroup,
  onSaveSessionClick,
  splitTabId
}) => {
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [groupTitleInput, setGroupTitleInput] = useState('');
  const [groupColorInput, setGroupColorInput] = useState('#6366f1');

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId);
  const currentWorkspaceTabs = tabs.filter(t => t.workspaceId === activeWorkspaceId);
  const currentWorkspaceGroups = tabGroups.filter(g => g.workspaceId === activeWorkspaceId);

  const pinnedTabs = currentWorkspaceTabs.filter(t => t.isPinned);
  const unpinnedTabs = currentWorkspaceTabs.filter(t => !t.isPinned);

  const getFaviconIcon = (tab: OmniBrowserTab) => {
    if (tab.favicon === 'Sparkles') return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
    if (tab.favicon === 'ShieldCheck') return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
    if (tab.favicon === 'BookOpen') return <BookOpen className="w-3.5 h-3.5 text-cyan-400" />;
    if (tab.favicon === 'Newspaper') return <Newspaper className="w-3.5 h-3.5 text-rose-400" />;
    if (tab.favicon === 'Terminal') return <Terminal className="w-3.5 h-3.5 text-amber-400" />;
    if (tab.favicon === 'Wallet') return <Wallet className="w-3.5 h-3.5 text-emerald-400" />;
    if (tab.favicon === 'Server') return <Server className="w-3.5 h-3.5 text-purple-400" />;
    if (tab.favicon === 'TrendingUp') return <TrendingUp className="w-3.5 h-3.5 text-blue-400" />;
    if (tab.favicon === 'GitBranch') return <GitBranch className="w-3.5 h-3.5 text-stone-400" />;
    if (tab.url.includes('search.omni.com')) return <Search className="w-3.5 h-3.5 text-indigo-400" />;
    return <Globe className="w-3.5 h-3.5 text-stone-500" />;
  };

  const handleCreateNewGroup = () => {
    if (!groupTitleInput.trim() || !onCreateGroup) return;
    onCreateGroup(groupTitleInput.trim(), groupColorInput, [activeTabId]);
    setGroupTitleInput('');
    setShowNewGroupModal(false);
  };

  return (
    <div
      id="browser-tab-bar"
      className="flex items-center gap-1 px-2.5 pt-2 bg-stone-900 text-stone-200 border-b border-stone-800 select-none overflow-x-auto no-scrollbar"
    >
      {/* Workspace Indicator Badge */}
      {activeWorkspace && (
        <div
          id="active-workspace-badge"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-t-md text-xs font-semibold uppercase tracking-wider text-white shrink-0 shadow-sm"
          style={{ backgroundColor: activeWorkspace.color }}
          title={`Active Cryptographic Workspace: ${activeWorkspace.name}`}
        >
          <Layers className="w-3 h-3" />
          <span className="truncate max-w-[100px]">{activeWorkspace.name}</span>
        </div>
      )}

      {/* Tabs Strip with Groups & Pinned Tabs */}
      <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto no-scrollbar">
        {/* 1. Pinned Tabs (Compact) */}
        {pinnedTabs.map(tab => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              id={`tab-pinned-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative flex items-center justify-center p-1.5 rounded-t-lg cursor-pointer transition-all duration-150 border-t border-x shrink-0 ${
                isActive
                  ? 'bg-stone-800 text-white border-stone-700 shadow-sm'
                  : 'bg-stone-950/70 text-stone-400 border-transparent hover:bg-stone-800/60 hover:text-stone-200'
              } min-w-[38px]`}
              title={`${tab.title} (Pinned)`}
            >
              {getFaviconIcon(tab)}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePinTab(tab.id);
                }}
                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 p-0.5 bg-stone-800 rounded-full text-indigo-400 hover:text-stone-100 shadow"
                title="Unpin Tab"
              >
                <Pin className="w-2.5 h-2.5" />
              </button>
            </div>
          );
        })}

        {pinnedTabs.length > 0 && unpinnedTabs.length > 0 && (
          <div className="h-4 w-[1px] bg-stone-800 mx-1 shrink-0" />
        )}

        {/* 2. Tab Groups Render */}
        {currentWorkspaceGroups.map(group => {
          const groupTabs = tabs.filter(t => group.tabIds.includes(t.id));
          if (groupTabs.length === 0) return null;

          return (
            <div
              key={group.id}
              className="flex items-center gap-1 rounded-t-lg p-0.5 border-t border-x border-stone-800/80 bg-stone-950/40 shrink-0"
              style={{ borderTopColor: group.color }}
            >
              {/* Group Header Badge */}
              <button
                onClick={() => onToggleGroupCollapse && onToggleGroupCollapse(group.id)}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-stone-100 shrink-0 transition-opacity hover:opacity-90"
                style={{ backgroundColor: group.color }}
                title={`Tab Group: ${group.title} (${groupTabs.length} tabs)`}
              >
                <span>{group.title}</span>
                {group.isCollapsed ? (
                  <ChevronRight className="w-2.5 h-2.5" />
                ) : (
                  <ChevronDown className="w-2.5 h-2.5" />
                )}
              </button>

              {/* Group Tabs (if not collapsed) */}
              {!group.isCollapsed &&
                groupTabs.map(tab => {
                  const isActive = tab.id === activeTabId;
                  const isSplit = tab.id === splitTabId;

                  return (
                    <div
                      key={tab.id}
                      id={`tab-grouped-item-${tab.id}`}
                      onClick={() => onSelectTab(tab.id)}
                      className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-t-lg text-xs font-medium cursor-pointer transition-all duration-150 border-t border-x ${
                        isActive
                          ? 'bg-stone-800 text-white border-stone-700 shadow-sm'
                          : 'bg-stone-950/60 text-stone-400 border-transparent hover:bg-stone-800/60 hover:text-stone-200'
                      } max-w-[180px] min-w-[110px] shrink-0`}
                    >
                      <div className="shrink-0">{getFaviconIcon(tab)}</div>
                      <span className="truncate flex-1 text-left" title={tab.title}>
                        {tab.title}
                      </span>
                      <button
                        onClick={(e) => onCloseTab(tab.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-stone-700 text-stone-400 hover:text-rose-300"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}

        {/* 3. Ungrouped Standard Tabs */}
        {unpinnedTabs
          .filter(t => !currentWorkspaceGroups.some(g => g.tabIds.includes(t.id)))
          .map(tab => {
            const isActive = tab.id === activeTabId;
            const isSplit = tab.id === splitTabId;

            return (
              <div
                key={tab.id}
                id={`tab-item-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-medium cursor-pointer transition-all duration-150 border-t border-x ${
                  isActive
                    ? 'bg-stone-800 text-white border-stone-700 shadow-sm'
                    : 'bg-stone-950/60 text-stone-400 border-transparent hover:bg-stone-800/60 hover:text-stone-200'
                } max-w-[220px] min-w-[130px] shrink-0`}
              >
                {/* Container color accent strip on tab bottom */}
                {tab.containerColor && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-t"
                    style={{ backgroundColor: tab.containerColor }}
                    title={`Isolated Container: ${tab.containerName || 'Enclave'}`}
                  />
                )}

                {/* Favicon */}
                <div className="shrink-0 flex items-center justify-center">
                  {getFaviconIcon(tab)}
                </div>

                {/* Tab Title */}
                <span className="truncate flex-1 text-left" title={tab.title}>
                  {tab.title}
                </span>

                {/* Tab Hover Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMuteTab(tab.id);
                    }}
                    className={`p-0.5 rounded hover:bg-stone-700 text-stone-400 hover:text-stone-100 ${
                      tab.isMuted ? 'opacity-100 text-rose-400' : ''
                    }`}
                    title={tab.isMuted ? 'Unmute Tab' : 'Mute Tab'}
                  >
                    {tab.isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>

                  {onToggleSplitView && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSplitView(tab.id);
                      }}
                      className={`p-0.5 rounded hover:bg-stone-700 ${
                        isSplit ? 'text-indigo-400' : 'text-stone-400 hover:text-stone-100'
                      }`}
                      title="Split View"
                    >
                      <Columns className="w-3 h-3" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePinTab(tab.id);
                    }}
                    className="p-0.5 rounded hover:bg-stone-700 text-stone-400 hover:text-stone-100"
                    title="Pin Tab"
                  >
                    <Pin className="w-3 h-3" />
                  </button>

                  <button
                    onClick={(e) => onCloseTab(tab.id, e)}
                    className="p-0.5 rounded hover:bg-stone-700 text-stone-400 hover:text-rose-300"
                    title="Close Tab"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* New Group & Save Session Controls */}
      <div className="flex items-center gap-1 shrink-0">
        {onCreateGroup && (
          <button
            onClick={() => setShowNewGroupModal(!showNewGroupModal)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            title="Create Tab Group"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        )}

        {onSaveSessionClick && (
          <button
            onClick={onSaveSessionClick}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            title="Save Workspace Session"
          >
            <Save className="w-3.5 h-3.5" />
          </button>
        )}

        {/* New Tab Button */}
        <button
          id="btn-new-browser-tab"
          onClick={onNewTab}
          className="flex items-center justify-center p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          title="Open New Tab (Cmd+T)"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* New Group Modal Popover */}
      {showNewGroupModal && (
        <div className="absolute top-10 right-12 z-50 p-3 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl space-y-2 text-xs w-60">
          <div className="font-semibold text-stone-200">New Tab Group</div>
          <input
            type="text"
            placeholder="Group Title (e.g. AI Research)"
            value={groupTitleInput}
            onChange={e => setGroupTitleInput(e.target.value)}
            className="w-full px-2 py-1 bg-stone-950 border border-stone-800 rounded text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              {['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'].map(color => (
                <button
                  key={color}
                  onClick={() => setGroupColorInput(color)}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    groupColorInput === color ? 'scale-125 ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button
              onClick={handleCreateNewGroup}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold"
            >
              Group Active
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
