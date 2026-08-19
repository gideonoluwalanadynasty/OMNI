import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Plus,
  ExternalLink,
  Trash2,
  Star,
  Search,
  Folder,
  Globe
} from 'lucide-react';
import { OmniWorkspaceBookmarkItem } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceBookmarksView: React.FC<{ onNavigateToUrl?: (url: string) => void }> = ({ onNavigateToUrl }) => {
  const [bookmarks, setBookmarks] = useState<OmniWorkspaceBookmarkItem[]>(
    omniWorkspaceService.getBookmarks()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newFolder, setNewFolder] = useState('Bookmarks');
  const [newTags, setNewTags] = useState('');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setBookmarks(omniWorkspaceService.getBookmarks());
    });
  }, []);

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    omniWorkspaceService.addBookmark(
      newTitle || newUrl,
      newUrl,
      newFolder,
      newTags.split(',').map(t => t.trim()).filter(Boolean)
    );

    setShowAddModal(false);
    setNewTitle('');
    setNewUrl('');
    setNewTags('');
  };

  const handleDelete = (id: string) => {
    omniWorkspaceService.deleteBookmark(id);
  };

  const filteredBookmarks = bookmarks.filter(b => {
    const matchSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFolder = selectedFolder === 'all' || b.folder === selectedFolder;
    return matchSearch && matchFolder;
  });

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              bookmarks.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{bookmarks.length} Sovereign Bookmarks</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Bookmarks & Web Resource Library</h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Bookmark</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search bookmarks by title or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Folders</option>
          <option value="OMNI Ecosystem">OMNI Ecosystem</option>
          <option value="Research">Research</option>
          <option value="Bookmarks">Bookmarks</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBookmarks.map(b => (
          <div
            key={b.id}
            className="p-4 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-indigo-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  {b.isFavorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <button onClick={() => handleDelete(b.id)} className="p-1 text-stone-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-100 truncate">{b.title}</h4>
                <div className="text-[10px] text-stone-500 font-mono truncate">{b.url}</div>
              </div>

              {b.aiDescription && (
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                  {b.aiDescription}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-400">
              <span>{b.folder}</span>
              <button
                onClick={() => {
                  if (onNavigateToUrl) onNavigateToUrl(b.url);
                  else window.open(b.url, '_blank');
                }}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded flex items-center gap-1 font-sans font-semibold"
              >
                <span>Launch</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleAddBookmark}
            className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-indigo-400" />
                <span>Save New Bookmark</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Title</label>
                <input
                  type="text"
                  placeholder="e.g. OMNI Extension Developer Portal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://developers.browser.omni.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Folder</label>
                  <input
                    type="text"
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Tags</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
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
                Save Bookmark
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
