import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Sparkles,
  ExternalLink,
  Copy,
  CheckCircle2,
  Trash2,
  Bookmark,
  Share2,
  Download,
  Search,
  Quote
} from 'lucide-react';
import { OmniWorkspaceResearchItem } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceResearchView: React.FC<{ onOpenAiSummary?: () => void }> = ({ onOpenAiSummary }) => {
  const [items, setItems] = useState<OmniWorkspaceResearchItem[]>(
    omniWorkspaceService.getResearchItems()
  );
  const [selectedFormat, setSelectedFormat] = useState<'apa' | 'mla' | 'bibtex' | 'chicago'>('apa');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New research form
  const [newTitle, setNewTitle] = useState('');
  const [newAuthors, setNewAuthors] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newYear, setNewYear] = useState(2026);
  const [newUrl, setNewUrl] = useState('');
  const [newAbstract, setNewAbstract] = useState('');
  const [newTakeaways, setNewTakeaways] = useState('');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setItems(omniWorkspaceService.getResearchItems());
    });
  }, []);

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreateResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    omniWorkspaceService.addResearchItem({
      title: newTitle,
      authors: newAuthors.split(',').map(a => a.trim()).filter(Boolean),
      publicationOrSource: newSource || 'OMNI Web Research Clip',
      publishedYear: newYear,
      url: newUrl || 'https://omni.com/research',
      abstract: newAbstract,
      keyTakeaways: newTakeaways.split('\n').map(t => t.trim()).filter(Boolean),
      tags: ['Research', 'Sovereign'],
      readingProgressPercent: 50
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewAuthors('');
    setNewSource('');
    setNewUrl('');
    setNewAbstract('');
    setNewTakeaways('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this research publication from library?')) {
      omniWorkspaceService.deleteResearchItem(id);
    }
  };

  const filteredItems = items.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              research.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{items.length} Academic Papers & Web Clips</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Research Library & Citation Engine</h2>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAiSummary && (
            <button
              onClick={onOpenAiSummary}
              className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Summarise Saved Research</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Paper / Clip</span>
          </button>
        </div>
      </div>

      {/* Format Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search papers, authors, or key takeaways..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-stone-400 font-sans mr-1">Citation Format:</span>
          {(['apa', 'mla', 'bibtex', 'chicago'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-2.5 py-1.5 rounded-lg uppercase font-bold transition-all ${
                selectedFormat === fmt
                  ? 'bg-indigo-600 text-white'
                  : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Research List */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const citationText = item.citations[selectedFormat];
          return (
            <div
              key={item.id}
              className="p-5 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-stone-100">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded bg-stone-950 text-stone-400 font-mono text-[10px] border border-stone-800">
                      {item.category.replace('_', ' ').toUpperCase()}
                    </span>
                    {item.publishedYear && (
                      <span className="text-stone-500 font-mono text-xs">({item.publishedYear})</span>
                    )}
                  </div>

                  <div className="text-xs text-indigo-300 font-mono">
                    {item.authors.join(', ')} • <em>{item.publicationOrSource}</em>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 rounded-lg text-xs"
                    title="Open Source URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Abstract */}
              <p className="text-xs text-stone-400 leading-relaxed font-sans">{item.abstract}</p>

              {/* Key Takeaways */}
              {item.keyTakeaways.length > 0 && (
                <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1.5 text-xs">
                  <div className="text-[10px] font-bold text-stone-500 uppercase font-mono">
                    Key Findings & Empirical Takeaways:
                  </div>
                  {item.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-300">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Citation Copy Box */}
              <div className="p-3 bg-indigo-950/20 border border-indigo-800/40 rounded-xl flex items-center justify-between gap-2 text-xs">
                <div className="font-mono text-[11px] text-stone-300 truncate select-all">
                  <span className="text-indigo-400 uppercase font-bold mr-2">[{selectedFormat}]</span>
                  {citationText}
                </div>

                <button
                  onClick={() => handleCopyCitation(citationText, item.id)}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 shrink-0"
                >
                  {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Paper Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateResearch}
            className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Save Research Paper / Web Clip</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Paper Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Decentralized Peer-to-Peer Agent Orchestration"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Authors (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Dr. Elena Rostova, Marcus Vance"
                    value={newAuthors}
                    onChange={(e) => setNewAuthors(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Publication / Journal</label>
                  <input
                    type="text"
                    placeholder="IEEE Transactions"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Source URL / DOI</label>
                  <input
                    type="text"
                    placeholder="https://doi.org/10.1109/..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Abstract</label>
                <textarea
                  rows={3}
                  placeholder="Summary of research methodology and outcomes..."
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Key Takeaways (one per line)</label>
                <textarea
                  rows={2}
                  placeholder="- WASM sandbox overhead is under 3.5ms&#10;- Zero telemetry leaks"
                  value={newTakeaways}
                  onChange={(e) => setNewTakeaways(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Save Paper
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
