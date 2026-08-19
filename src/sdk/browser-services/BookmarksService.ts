import {
  OmniBrowserBookmark,
  OmniBrowserBookmarkFolder
} from '../../types';
import { omniAiSdk } from '../omni-ai-sdk';

export class BookmarksService {
  private static instance: BookmarksService;

  public static getInstance(): BookmarksService {
    if (!BookmarksService.instance) {
      BookmarksService.instance = new BookmarksService();
    }
    return BookmarksService.instance;
  }

  /**
   * Search bookmarks by title, url, tags, or description
   */
  searchBookmarks(bookmarks: OmniBrowserBookmark[], query: string): OmniBrowserBookmark[] {
    const q = query.trim().toLowerCase();
    if (!q) return bookmarks;
    return bookmarks.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.url.toLowerCase().includes(q) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(q))) ||
      (b.aiSummary && b.aiSummary.toLowerCase().includes(q))
    );
  }

  /**
   * Create a bookmark folder
   */
  createFolder(name: string, color = '#6366f1', parentId?: string): OmniBrowserBookmarkFolder {
    return {
      id: `bfolder_${Date.now()}`,
      name,
      color,
      parentId,
      isExpanded: true
    };
  }

  /**
   * Add a new bookmark
   */
  createBookmark(
    title: string,
    url: string,
    folderId?: string,
    tags: string[] = [],
    isFavorite = false
  ): OmniBrowserBookmark {
    let domain = 'omni.internal';
    try {
      domain = new URL(url).hostname;
    } catch {
      // fallback
    }

    return {
      id: `bm_${Date.now()}`,
      title,
      url,
      favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      folderId,
      tags,
      createdAt: new Date().toISOString(),
      isFavorite,
      aiSummary: 'Pending OMNI AI indexing...'
    };
  }

  /**
   * AI Categorisation and Tag Generator using OMNI AI SDK
   */
  async categorizeBookmarkWithAi(
    bookmark: OmniBrowserBookmark
  ): Promise<{ recommendedFolder: string; suggestedTags: string[]; summary: string }> {
    try {
      const prompt = `Analyze this web bookmark URL and title:
URL: ${bookmark.url}
Title: ${bookmark.title}

Classify into one of: 'Ecosystem & Governance', 'AI & Machine Learning', 'Finance & Markets', 'Engineering & Dev', 'Research & Papers', 'Productivity'.
Provide 3-4 concise tags and a 1-sentence executive summary.
Respond in JSON: {"recommendedFolder": string, "suggestedTags": string[], "summary": string}`;

      const aiResponse = await omniAiSdk.complete({
        prompt,
        temperature: 0.2
      });

      // Parse JSON from AI response if available
      const jsonMatch = aiResponse.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          recommendedFolder: parsed.recommendedFolder || 'Research & Papers',
          suggestedTags: parsed.suggestedTags || ['Research', 'Sovereign', 'Web'],
          summary: parsed.summary || `${bookmark.title} — Sovereign workspace resource.`
        };
      }
    } catch (e) {
      console.warn('AI Categorisation fallback used:', e);
    }

    // Heuristic fallback
    const isAi = /(ai|arxiv|deepmind|anthropic|openai|transformer|agent)/i.test(bookmark.title + bookmark.url);
    const isFinance = /(crypto|pay|wallet|bloomberg|bank|finance|yield)/i.test(bookmark.title + bookmark.url);
    const isDev = /(github|developer|docs|code|api|wasm)/i.test(bookmark.title + bookmark.url);

    return {
      recommendedFolder: isAi ? 'AI & Machine Learning' : isFinance ? 'Finance & Markets' : isDev ? 'Engineering & Dev' : 'General Research',
      suggestedTags: isAi ? ['AI', 'Models', 'Research'] : isFinance ? ['Finance', 'Ledger'] : isDev ? ['Developer', 'API'] : ['Reference'],
      summary: `${bookmark.title} categorized via local sovereign heuristics.`
    };
  }
}

export const bookmarksService = BookmarksService.getInstance();
