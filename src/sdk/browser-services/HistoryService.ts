import {
  OmniBrowserHistoryEntry
} from '../../types';

export class HistoryService {
  private static instance: HistoryService;

  public static getInstance(): HistoryService {
    if (!HistoryService.instance) {
      HistoryService.instance = new HistoryService();
    }
    return HistoryService.instance;
  }

  /**
   * Search history records
   */
  searchHistory(history: OmniBrowserHistoryEntry[], query: string): OmniBrowserHistoryEntry[] {
    const q = query.trim().toLowerCase();
    if (!q) return history;
    return history.filter(h =>
      h.title.toLowerCase().includes(q) ||
      h.url.toLowerCase().includes(q) ||
      h.category.toLowerCase().includes(q)
    );
  }

  /**
   * Record a new visited URL
   */
  recordVisit(
    history: OmniBrowserHistoryEntry[],
    url: string,
    title: string,
    workspaceId = 'ws_dynasty',
    trackersBlocked = 0
  ): OmniBrowserHistoryEntry[] {
    const existingIndex = history.findIndex(h => h.url === url);
    if (existingIndex >= 0) {
      const updated = [...history];
      updated[existingIndex] = {
        ...updated[existingIndex],
        title,
        visitedAt: new Date().toISOString(),
        visitCount: updated[existingIndex].visitCount + 1,
        trackersBlockedCount: updated[existingIndex].trackersBlockedCount + trackersBlocked
      };
      return updated;
    }

    let category: OmniBrowserHistoryEntry['category'] = 'general';
    if (/(ai|arxiv|gpt|deepmind|anthropic)/i.test(url + title)) category = 'productivity';
    else if (/(crypto|finance|pay|wallet|bloomberg)/i.test(url + title)) category = 'finance';
    else if (/(github|developer|code|api)/i.test(url + title)) category = 'developer';
    else if (/(omni\.com)/i.test(url)) category = 'ecosystem';

    const newEntry: OmniBrowserHistoryEntry = {
      id: `hist_${Date.now()}`,
      url,
      title,
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`,
      visitedAt: new Date().toISOString(),
      visitCount: 1,
      category,
      workspaceId,
      trackersBlockedCount: trackersBlocked
    };

    return [newEntry, ...history];
  }

  /**
   * Delete a single history entry
   */
  deleteEntry(history: OmniBrowserHistoryEntry[], entryId: string): OmniBrowserHistoryEntry[] {
    return history.filter(h => h.id !== entryId);
  }

  /**
   * Delete all visits for a specific domain (privacy wipe)
   */
  deleteDomainHistory(history: OmniBrowserHistoryEntry[], targetDomain: string): OmniBrowserHistoryEntry[] {
    return history.filter(h => {
      try {
        const domain = new URL(h.url).hostname;
        return !domain.includes(targetDomain);
      } catch {
        return true;
      }
    });
  }

  /**
   * Purge history by time range (last hour, today, all time)
   */
  purgeByTimeRange(
    history: OmniBrowserHistoryEntry[],
    range: 'last_hour' | 'today' | 'last_7_days' | 'all'
  ): OmniBrowserHistoryEntry[] {
    if (range === 'all') return [];

    const now = Date.now();
    const cutoff =
      range === 'last_hour'
        ? now - 3600 * 1000
        : range === 'today'
        ? now - 24 * 3600 * 1000
        : now - 7 * 24 * 3600 * 1000;

    return history.filter(h => new Date(h.visitedAt).getTime() < cutoff);
  }
}

export const historyService = HistoryService.getInstance();
