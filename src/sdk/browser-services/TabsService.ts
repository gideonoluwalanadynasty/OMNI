import {
  OmniBrowserTab,
  OmniBrowserTabGroup,
  OmniBrowserSavedSession,
  OmniBrowserProjectSpace,
  OmniBrowserWorkspace
} from '../../types';
import { browserAdapterFactory } from '../browser-adapters/BrowserAdapterFactory';

export class TabsService {
  private static instance: TabsService;

  public static getInstance(): TabsService {
    if (!TabsService.instance) {
      TabsService.instance = new TabsService();
    }
    return TabsService.instance;
  }

  /**
   * Create a new tab within an existing or active workspace
   */
  async createTab(
    url = 'https://omni.com',
    workspaceId = 'ws_dynasty',
    options?: { title?: string; isPinned?: boolean; groupId?: string }
  ): Promise<OmniBrowserTab> {
    const adapter = browserAdapterFactory.getAdapter();
    const tab = await adapter.createTab(url, true, workspaceId);
    if (options?.title) tab.title = options.title;
    if (options?.isPinned) tab.isPinned = options.isPinned;
    return tab;
  }

  /**
   * Create a new tab synchronously for React state updates
   */
  createNewTab(
    tabs: OmniBrowserTab[],
    workspaces: OmniBrowserWorkspace[],
    activeWorkspaceId: string,
    containerColor = '#4f46e5',
    containerName = 'Active Container'
  ): { newTab: OmniBrowserTab; updatedTabs: OmniBrowserTab[]; updatedWorkspaces: OmniBrowserWorkspace[] } {
    const tabId = `tab_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newTab: OmniBrowserTab = {
      id: tabId,
      url: 'https://omni.com',
      title: 'OMNI Sovereign Gateway',
      favicon: 'https://www.google.com/s2/favicons?domain=omni.com&sz=64',
      isLoading: false,
      isPinned: false,
      canGoBack: false,
      canGoForward: false,
      workspaceId: activeWorkspaceId,
      containerColor,
      containerName,
      trackersBlockedCount: 0,
      adsBlockedCount: 0,
      fingerprintAttemptsDeflected: 0,
      lastAccessedAt: new Date().toISOString(),
      zoomLevel: 100,
      createdAt: new Date().toISOString()
    };

    const updatedTabs = [...tabs, newTab];
    const updatedWorkspaces = workspaces.map(ws =>
      ws.id === activeWorkspaceId ? { ...ws, activeTabId: newTab.id } : ws
    );

    return { newTab, updatedTabs, updatedWorkspaces };
  }

  /**
   * Close a tab and find the next active tab
   */
  closeTab(
    tabs: OmniBrowserTab[],
    tabIdToClose: string,
    currentActiveId: string,
    currentWorkspaceId: string,
    containerColor = '#4f46e5',
    containerName = 'Active Container'
  ): { remainingTabs: OmniBrowserTab[]; nextActiveTabId: string } {
    const remaining = tabs.filter(t => t.id !== tabIdToClose);
    if (remaining.length === 0) {
      const fallbackTab: OmniBrowserTab = {
        id: `tab_${Date.now()}`,
        url: 'https://omni.com',
        title: 'OMNI Sovereign Gateway',
        favicon: 'https://www.google.com/s2/favicons?domain=omni.com&sz=64',
        isLoading: false,
        isPinned: false,
        canGoBack: false,
        canGoForward: false,
        workspaceId: currentWorkspaceId,
        containerColor,
        containerName,
        trackersBlockedCount: 0,
        adsBlockedCount: 0,
        fingerprintAttemptsDeflected: 0,
        lastAccessedAt: new Date().toISOString(),
        zoomLevel: 100,
        createdAt: new Date().toISOString()
      };
      return { remainingTabs: [fallbackTab], nextActiveTabId: fallbackTab.id };
    }

    let nextActive = currentActiveId;
    if (currentActiveId === tabIdToClose) {
      const workspaceTabs = remaining.filter(t => t.workspaceId === currentWorkspaceId);
      nextActive = workspaceTabs.length > 0 ? workspaceTabs[workspaceTabs.length - 1].id : remaining[0].id;
    }

    return { remainingTabs: remaining, nextActiveTabId: nextActive };
  }

  /**
   * Toggle Pin Status
   */
  togglePinTab(tabs: OmniBrowserTab[], tabId: string): OmniBrowserTab[] {
    return tabs.map(t => (t.id === tabId ? { ...t, isPinned: !t.isPinned } : t));
  }

  /**
   * Toggle Mute Status
   */
  toggleMuteTab(tabs: OmniBrowserTab[], tabId: string): OmniBrowserTab[] {
    return tabs.map(t => (t.id === tabId ? { ...t, isMuted: !t.isMuted } : t));
  }

  /**
   * Create a new workspace / isolated container
   */
  createWorkspace(
    name: string,
    color: string,
    icon: string,
    description = ''
  ): { newWorkspace: OmniBrowserWorkspace; newHomeTab: OmniBrowserTab } {
    const wsId = `ws_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const tabId = `tab_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newHomeTab: OmniBrowserTab = {
      id: tabId,
      url: 'https://omni.com',
      title: `${name} — Gateway`,
      favicon: 'https://www.google.com/s2/favicons?domain=omni.com&sz=64',
      isLoading: false,
      isPinned: false,
      canGoBack: false,
      canGoForward: false,
      workspaceId: wsId,
      containerColor: color,
      containerName: name,
      trackersBlockedCount: 0,
      adsBlockedCount: 0,
      fingerprintAttemptsDeflected: 0,
      lastAccessedAt: new Date().toISOString(),
      zoomLevel: 100,
      createdAt: new Date().toISOString()
    };

    const newWorkspace: OmniBrowserWorkspace = {
      id: wsId,
      name,
      icon,
      color,
      description: description || `Encrypted isolation container for ${name}`,
      tabIds: [tabId],
      activeTabId: tabId,
      isDefault: false,
      organizationId: 'org_personal_sovereign',
      profileType: 'personal',
      tags: ['custom-workspace', name.toLowerCase()],
      createdAt: new Date().toISOString(),
      cookieJarScope: `scope_${wsId}`,
      isZeroTelemetry: true,
      proxyNode: 'Sovereign-Direct-v4'
    };

    return { newWorkspace, newHomeTab };
  }

  /**
   * Create a tab group for clustering related workflows
   */
  createTabGroup(
    title: string,
    color: string,
    tabIds: string[],
    workspaceId: string
  ): OmniBrowserTabGroup {
    return {
      id: `grp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title,
      color,
      isCollapsed: false,
      tabIds,
      workspaceId,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Add tabs to group
   */
  addTabsToGroup(group: OmniBrowserTabGroup, newTabIds: string[]): OmniBrowserTabGroup {
    const combined = Array.from(new Set([...group.tabIds, ...newTabIds]));
    return { ...group, tabIds: combined };
  }

  /**
   * Remove a tab from a group
   */
  removeTabFromGroup(group: OmniBrowserTabGroup, tabId: string): OmniBrowserTabGroup {
    return { ...group, tabIds: group.tabIds.filter(id => id !== tabId) };
  }

  /**
   * Save the current workspace state as a saved session
   */
  createSavedSession(
    name: string,
    workspaceId: string,
    tabs: OmniBrowserTab[],
    groups: OmniBrowserTabGroup[] = [],
    isAutoSaved = false
  ): OmniBrowserSavedSession {
    const workspaceTabs = tabs.filter(t => t.workspaceId === workspaceId);
    const workspaceGroups = groups.filter(g => g.workspaceId === workspaceId);

    return {
      id: `sess_${Date.now()}`,
      name,
      workspaceId,
      createdAt: new Date().toISOString(),
      tabCount: workspaceTabs.length,
      tabsSnapshot: workspaceTabs.map(t => ({
        id: t.id,
        title: t.title,
        url: t.url,
        favicon: t.favicon,
        containerColor: t.containerColor,
        containerName: t.containerName
      })),
      groupsSnapshot: workspaceGroups,
      isAutoSaved
    };
  }

  /**
   * Restore tabs from a saved session into a workspace
   */
  restoreSavedSession(
    session: OmniBrowserSavedSession,
    targetWorkspaceId?: string
  ): { newTabs: OmniBrowserTab[]; newGroups: OmniBrowserTabGroup[] } {
    const targetWs = targetWorkspaceId || session.workspaceId;
    const restoredTabs: OmniBrowserTab[] = session.tabsSnapshot.map(snap => ({
      id: `tab_restored_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: snap.title,
      url: snap.url,
      favicon: snap.favicon,
      isLoading: false,
      isPinned: false,
      canGoBack: false,
      canGoForward: false,
      workspaceId: targetWs,
      containerColor: snap.containerColor || '#4f46e5',
      containerName: snap.containerName || 'Restored Session',
      trackersBlockedCount: 0,
      adsBlockedCount: 0,
      fingerprintAttemptsDeflected: 0,
      lastAccessedAt: new Date().toISOString(),
      zoomLevel: 100,
      createdAt: new Date().toISOString()
    }));

    const restoredGroups: OmniBrowserTabGroup[] = session.groupsSnapshot.map(g => ({
      ...g,
      id: `grp_restored_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      workspaceId: targetWs
    }));

    return { newTabs: restoredTabs, newGroups: restoredGroups };
  }

  /**
   * Create or update a project space
   */
  createProjectSpace(
    title: string,
    description: string,
    icon: string,
    color: string,
    associatedWorkspaceId: string,
    pinnedUrls: string[] = [],
    savedNote = '',
    aiContextPrompt = ''
  ): OmniBrowserProjectSpace {
    return {
      id: `proj_${Date.now()}`,
      title,
      description,
      icon,
      color,
      associatedWorkspaceId,
      pinnedUrls,
      savedNote,
      aiContextPrompt,
      updatedAt: new Date().toISOString()
    };
  }
}

export const tabsService = TabsService.getInstance();
