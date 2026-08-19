import {
  OmniBrowserSavedSession,
  OmniBrowserTab,
  OmniBrowserTabGroup,
  OmniBrowserWorkspace
} from '../../types';

export class SessionsService {
  private static instance: SessionsService;

  public static getInstance(): SessionsService {
    if (!SessionsService.instance) {
      SessionsService.instance = new SessionsService();
    }
    return SessionsService.instance;
  }

  /**
   * Snapshot and save entire workspace session
   */
  saveWorkspaceSession(
    workspace: OmniBrowserWorkspace,
    tabs: OmniBrowserTab[],
    groups: OmniBrowserTabGroup[],
    customName?: string
  ): OmniBrowserSavedSession {
    const wsTabs = tabs.filter(t => t.workspaceId === workspace.id);
    const wsGroups = groups.filter(g => g.workspaceId === workspace.id);

    return {
      id: `sess_ws_${Date.now()}`,
      name: customName || `${workspace.name} Session (${new Date().toLocaleDateString()})`,
      workspaceId: workspace.id,
      createdAt: new Date().toISOString(),
      tabCount: wsTabs.length,
      tabsSnapshot: wsTabs.map(t => ({
        id: t.id,
        title: t.title,
        url: t.url,
        favicon: t.favicon,
        containerColor: t.containerColor,
        containerName: t.containerName
      })),
      groupsSnapshot: wsGroups,
      isAutoSaved: false
    };
  }

  /**
   * Generate an automated recovery checkpoint for crashes or sudden exits
   */
  generateRecoveryCheckpoint(
    workspaceId: string,
    tabs: OmniBrowserTab[],
    groups: OmniBrowserTabGroup[]
  ): OmniBrowserSavedSession {
    const wsTabs = tabs.filter(t => t.workspaceId === workspaceId);
    return {
      id: `sess_auto_recovery_${workspaceId}`,
      name: `Auto-Recovery Checkpoint (${new Date().toLocaleTimeString()})`,
      workspaceId,
      createdAt: new Date().toISOString(),
      tabCount: wsTabs.length,
      tabsSnapshot: wsTabs.map(t => ({
        id: t.id,
        title: t.title,
        url: t.url,
        favicon: t.favicon,
        containerColor: t.containerColor,
        containerName: t.containerName
      })),
      groupsSnapshot: groups.filter(g => g.workspaceId === workspaceId),
      isAutoSaved: true
    };
  }

  /**
   * Restore tabs array directly from a saved session
   */
  restoreSession(session: OmniBrowserSavedSession): OmniBrowserTab[] {
    return session.tabsSnapshot.map(snap => ({
      id: `tab_restored_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: snap.title,
      url: snap.url,
      favicon: snap.favicon,
      isLoading: false,
      isPinned: false,
      canGoBack: false,
      canGoForward: false,
      workspaceId: session.workspaceId,
      containerColor: snap.containerColor || '#4f46e5',
      containerName: snap.containerName || 'Restored Session',
      trackersBlockedCount: 0,
      adsBlockedCount: 0,
      fingerprintAttemptsDeflected: 0,
      lastAccessedAt: new Date().toISOString(),
      zoomLevel: 100,
      createdAt: new Date().toISOString()
    }));
  }
}

export const sessionsService = SessionsService.getInstance();
