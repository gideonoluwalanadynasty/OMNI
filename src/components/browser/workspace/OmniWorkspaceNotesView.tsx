import React, { useState, useEffect } from 'react';
import {
  FileText,
  Pin,
  Plus,
  Trash2,
  Tag,
  Folder,
  Search,
  Sparkles,
  CheckCircle2,
  Copy,
  Edit3,
  Calendar
} from 'lucide-react';
import { OmniWorkspaceNote } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceNotesView: React.FC = () => {
  const [notes, setNotes] = useState<OmniWorkspaceNote[]>(omniWorkspaceService.getNotes());
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  // Active note editor state
  const selectedNote = notes.find(n => n.id === selectedNoteId);
  const [editTitle, setEditTitle] = useState(selectedNote?.title || '');
  const [editContent, setEditContent] = useState(selectedNote?.content || '');
  const [editFolder, setEditFolder] = useState(selectedNote?.folder || 'General');
  const [editTags, setEditTags] = useState(selectedNote?.tags?.join(', ') || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      const updated = omniWorkspaceService.getNotes();
      setNotes(updated);
      if (!selectedNoteId && updated.length > 0) {
        setSelectedNoteId(updated[0].id);
      }
    });
  }, [selectedNoteId]);

  useEffect(() => {
    if (selectedNote) {
      setEditTitle(selectedNote.title);
      setEditContent(selectedNote.content);
      setEditFolder(selectedNote.folder || 'General');
      setEditTags(selectedNote.tags?.join(', ') || '');
    }
  }, [selectedNoteId]);

  const handleSaveActiveNote = () => {
    if (!selectedNoteId) return;
    omniWorkspaceService.updateNote(selectedNoteId, {
      title: editTitle,
      content: editContent,
      folder: editFolder,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean)
    });
  };

  const handleCreateNewNote = () => {
    const created = omniWorkspaceService.createNote(
      'New Note',
      '# New Note\n\nStart typing ideas, code snippets, or sprint requirements...',
      ['Workspace'],
      'General'
    );
    setSelectedNoteId(created.id);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Delete note?')) {
      omniWorkspaceService.deleteNote(id);
      const remaining = notes.filter(n => n.id !== id);
      if (remaining.length > 0) {
        setSelectedNoteId(remaining[0].id);
      } else {
        setSelectedNoteId(null);
      }
    }
  };

  const handleTogglePin = (id: string) => {
    omniWorkspaceService.toggleNotePin(id);
  };

  const handleAiSummarizeNote = () => {
    if (!selectedNote) return;
    const summary = `Executive Summary of "${selectedNote.title}": Focuses on sovereign local execution, encrypted state boundaries, and automated task synthesis without server leaks.`;
    omniWorkspaceService.updateNote(selectedNote.id, {
      aiSummary: summary,
      actionItems: [
        'Review architecture security bounds',
        'Verify zero-telemetry WASM worker'
      ]
    });
  };

  const filteredNotes = notes.filter(n => {
    const matchSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFolder = selectedFolder === 'all' || n.folder === selectedFolder;
    return matchSearch && matchFolder;
  });

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              notes.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{notes.length} Sovereign Notes</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Sovereign Markdown Notes</h2>
        </div>

        <button
          onClick={handleCreateNewNote}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Notes Navigation List */}
        <div className="md:col-span-4 space-y-3">
          <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-xl space-y-2">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
            />
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full px-3 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Folders</option>
              <option value="General">General</option>
              <option value="Engineering">Engineering</option>
              <option value="Security">Security</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredNotes.map(n => {
              const isSelected = n.id === selectedNoteId;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNoteId(n.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md'
                      : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-indigo-300' : 'text-stone-200'}`}>
                      {n.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePin(n.id);
                      }}
                      className={`p-1 rounded hover:bg-stone-800 ${n.isPinned ? 'text-amber-400' : 'text-stone-500'}`}
                    >
                      <Pin className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed font-mono">
                    {n.content.replace(/[#*`>-]/g, '').slice(0, 80)}...
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono pt-1">
                    <span>{n.folder || 'General'}</span>
                    <span>{n.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Note Editor */}
        <div className="md:col-span-8 p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
          {selectedNote ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                  }}
                  onBlur={handleSaveActiveNote}
                  placeholder="Note Title..."
                  className="bg-transparent text-lg font-bold text-stone-100 focus:outline-none flex-1"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAiSummarizeNote}
                    className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Summarize</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(editContent);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-1.5 bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 rounded-xl text-xs"
                    title="Copy Markdown"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleDeleteNote(selectedNote.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Note Metadata Row */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-stone-400 font-semibold">Folder:</span>
                  <input
                    type="text"
                    value={editFolder}
                    onChange={(e) => setEditFolder(e.target.value)}
                    onBlur={handleSaveActiveNote}
                    className="w-full px-2.5 py-1 bg-stone-950 border border-stone-800 rounded text-stone-300 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-stone-400 font-semibold">Tags (comma separated):</span>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    onBlur={handleSaveActiveNote}
                    className="w-full px-2.5 py-1 bg-stone-950 border border-stone-800 rounded text-stone-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* AI Summary Banner if present */}
              {selectedNote.aiSummary && (
                <div className="p-3.5 bg-indigo-950/30 border border-indigo-800/40 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-300 font-mono text-[11px] uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Synthesis & Action Items</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">{selectedNote.aiSummary}</p>
                  {selectedNote.actionItems && selectedNote.actionItems.length > 0 && (
                    <div className="pt-1 space-y-1">
                      {selectedNote.actionItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-stone-400">
                          <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Editor Textarea */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
                  <span>Markdown Syntax Supported</span>
                  <span>{editContent.length} chars</span>
                </div>
                <textarea
                  rows={14}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveActiveNote}
                  className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono text-stone-200 leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
                  placeholder="Write note in markdown..."
                />
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-stone-500 space-y-2">
              <FileText className="w-8 h-8 mx-auto text-stone-600" />
              <div className="text-sm font-semibold">No note selected</div>
              <p className="text-xs">Select a note from the left or create a new note.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
