import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Sparkles,
  CheckCircle2,
  Circle,
  Highlighter,
  Trash2,
  ExternalLink,
  Tag,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import { OmniBrowserReadingListItem, OmniBrowserTab } from '../../../types';
import { readingListService } from '../../../sdk/browser-services/ReadingListService';

interface ReadingListDrawerProps {
  readingList: OmniBrowserReadingListItem[];
  activeTab: OmniBrowserTab | null;
  onUpdateReadingList: (items: OmniBrowserReadingListItem[]) => void;
  onNavigate: (url: string) => void;
}

export const ReadingListDrawer: React.FC<ReadingListDrawerProps> = ({
  readingList,
  activeTab,
  onUpdateReadingList,
  onNavigate
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [annotatingItemId, setAnnotatingItemId] = useState<string | null>(null);
  const [quoteInput, setQuoteInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  // Extract all unique tags
  const allTags = Array.from(new Set(readingList.flatMap(i => i.tags || [])));

  const filteredList = filterTag === 'all'
    ? readingList
    : readingList.filter(i => i.tags && i.tags.includes(filterTag));

  const handleSaveActivePage = async () => {
    if (!activeTab) return;
    const newItem = await readingListService.saveToReadingList(
      activeTab.url,
      activeTab.title,
      ['Saved Tab', activeTab.containerName || 'General']
    );
    onUpdateReadingList([newItem, ...readingList]);
  };

  const handleToggleRead = (id: string) => {
    const updated = readingList.map(item =>
      item.id === id ? readingListService.toggleRead(item) : item
    );
    onUpdateReadingList(updated);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateReadingList(readingList.filter(i => i.id !== id));
  };

  const handleSummarize = async (item: OmniBrowserReadingListItem) => {
    setSummarizingId(item.id);
    try {
      const res = await readingListService.summarizeWithOmniAi(item);
      const updated = readingList.map(i =>
        i.id === item.id ? { ...i, aiSummary: res.summary, aiKeyPoints: res.keyPoints } : i
      );
      onUpdateReadingList(updated);
      setExpandedItemId(item.id);
    } finally {
      setSummarizingId(null);
    }
  };

  const handleAddAnnotation = (item: OmniBrowserReadingListItem) => {
    if (!quoteInput.trim() && !noteInput.trim()) return;
    const updatedItem = readingListService.addAnnotation(
      item,
      quoteInput.trim() || item.title,
      noteInput.trim() || 'Key takeaway note',
      '#fef08a'
    );
    const updated = readingList.map(i => (i.id === item.id ? updatedItem : i));
    onUpdateReadingList(updated);
    setQuoteInput('');
    setNoteInput('');
    setAnnotatingItemId(null);
  };

  return (
    <div id="reading-list-drawer" className="space-y-4 text-stone-100">
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-2 p-3 bg-stone-950/80 border border-stone-800 rounded-xl">
        <div>
          <div className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sovereign Reading List</span>
          </div>
          <div className="text-[11px] text-stone-400">
            {readingList.filter(i => !i.isRead).length} unread • Offline Cache Active
          </div>
        </div>
        {activeTab && (
          <button
            id="btn-save-current-tab-reading"
            onClick={handleSaveActivePage}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            title="Save current tab to reading list"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save Tab</span>
          </button>
        )}
      </div>

      {/* Tag Filter Pills */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilterTag('all')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors whitespace-nowrap ${
              filterTag === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
            }`}
          >
            All ({readingList.length})
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors whitespace-nowrap ${
                filterTag === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Reading Items List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="p-8 text-center bg-stone-950 border border-stone-800 rounded-xl space-y-2">
            <BookOpen className="w-8 h-8 text-stone-600 mx-auto" />
            <p className="text-xs font-semibold text-stone-400">Reading list is empty</p>
            <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
              Save articles, research preprints, or documentation tabs for offline AI reading.
            </p>
          </div>
        ) : (
          filteredList.map(item => {
            const isExpanded = expandedItemId === item.id;
            const isAnnotating = annotatingItemId === item.id;
            const isSummarizing = summarizingId === item.id;

            return (
              <div
                key={item.id}
                id={`reading-item-${item.id}`}
                className={`p-3 bg-stone-950 border rounded-xl space-y-2.5 transition-all ${
                  item.isRead ? 'border-stone-800/60 opacity-85' : 'border-stone-700 bg-stone-950/90'
                }`}
              >
                {/* Title & Domain Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleRead(item.id)}
                      className="mt-0.5 text-stone-400 hover:text-emerald-400 transition-colors shrink-0"
                      title={item.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {item.isRead ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-500" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div
                        onClick={() => onNavigate(item.url)}
                        className={`text-xs font-semibold hover:text-indigo-400 cursor-pointer truncate ${
                          item.isRead ? 'line-through text-stone-400' : 'text-stone-100'
                        }`}
                        title={item.title}
                      >
                        {item.title}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                        <span className="font-mono">{item.domain}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {item.readingTimeMinutes} min
                        </span>
                        {item.offlineCached && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" /> Cached
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Top Item Action Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleSummarize(item)}
                      disabled={isSummarizing}
                      className="p-1 rounded bg-indigo-950/60 border border-indigo-800 text-indigo-300 hover:bg-indigo-900 text-[10px] font-semibold flex items-center gap-1 transition-all"
                      title="Summarize using OMNI AI"
                    >
                      <Sparkles className={`w-3 h-3 ${isSummarizing ? 'animate-spin' : ''}`} />
                      <span>{isSummarizing ? 'AI...' : 'AI Summary'}</span>
                    </button>
                    <button
                      onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                      className="p-1 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 rounded text-stone-500 hover:text-rose-400 hover:bg-stone-800"
                      title="Remove from Reading List"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* AI Summary Section if present */}
                {item.aiSummary && (
                  <div className="p-2.5 bg-indigo-950/30 border border-indigo-900/50 rounded-lg space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>OMNI AI Synthesis</span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">{item.aiSummary}</p>
                    {item.aiKeyPoints && item.aiKeyPoints.length > 0 && (
                      <ul className="space-y-1 pt-1 border-t border-indigo-900/40">
                        {item.aiKeyPoints.map((kp, idx) => (
                          <li key={idx} className="text-[10px] text-stone-400 flex items-start gap-1.5">
                            <span className="text-indigo-400 shrink-0">•</span>
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Expanded Details: Annotations & Tag Badges */}
                {isExpanded && (
                  <div className="pt-2 border-t border-stone-800 space-y-2">
                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {item.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-stone-900 border border-stone-800 text-stone-400 rounded text-[10px] flex items-center gap-1"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Annotations List */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-stone-400">
                        <span className="flex items-center gap-1">
                          <Highlighter className="w-3 h-3 text-amber-400" />
                          <span>Annotations ({item.annotations.length})</span>
                        </span>
                        <button
                          onClick={() => setAnnotatingItemId(isAnnotating ? null : item.id)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Note</span>
                        </button>
                      </div>

                      {item.annotations.map(ann => (
                        <div
                          key={ann.id}
                          className="p-2 bg-stone-900 border border-stone-800 rounded text-[11px] space-y-1"
                        >
                          {ann.selectedQuote && (
                            <div className="italic text-stone-300 border-l-2 border-amber-400 pl-2 text-[10px]">
                              "{ann.selectedQuote}"
                            </div>
                          )}
                          <div className="text-stone-200 font-medium">{ann.text}</div>
                        </div>
                      ))}

                      {/* Add Annotation Form */}
                      {isAnnotating && (
                        <div className="p-2.5 bg-stone-900/90 border border-stone-700 rounded-lg space-y-2 text-xs">
                          <input
                            type="text"
                            placeholder="Selected quote snippet..."
                            value={quoteInput}
                            onChange={e => setQuoteInput(e.target.value)}
                            className="w-full px-2 py-1 bg-stone-950 border border-stone-800 rounded text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <input
                            type="text"
                            placeholder="Your insight / note..."
                            value={noteInput}
                            onChange={e => setNoteInput(e.target.value)}
                            className="w-full px-2 py-1 bg-stone-950 border border-stone-800 rounded text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setAnnotatingItemId(null)}
                              className="px-2 py-0.5 text-stone-400 hover:text-stone-200 text-[10px]"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAddAnnotation(item)}
                              className="px-2.5 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-semibold"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
