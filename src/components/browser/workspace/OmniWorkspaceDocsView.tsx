import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  History,
  Download,
  Copy,
  CheckCircle2,
  Trash2,
  BookOpen,
  Shield,
  Layers,
  Sparkles,
  Share2
} from 'lucide-react';
import { OmniWorkspaceDocument } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceDocsView: React.FC = () => {
  const [docs, setDocs] = useState<OmniWorkspaceDocument[]>(omniWorkspaceService.getDocuments());
  const [selectedDocId, setSelectedDocId] = useState<string | null>(docs[0]?.id || null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedDoc = docs.find(d => d.id === selectedDocId);
  const [editTitle, setEditTitle] = useState(selectedDoc?.title || '');
  const [editContent, setEditContent] = useState(selectedDoc?.content || '');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      const updated = omniWorkspaceService.getDocuments();
      setDocs(updated);
      if (!selectedDocId && updated.length > 0) {
        setSelectedDocId(updated[0].id);
      }
    });
  }, [selectedDocId]);

  useEffect(() => {
    if (selectedDoc) {
      setEditTitle(selectedDoc.title);
      setEditContent(selectedDoc.content);
    }
  }, [selectedDocId]);

  const handleSaveDoc = () => {
    if (!selectedDocId) return;
    omniWorkspaceService.updateDocument(selectedDocId, {
      title: editTitle,
      content: editContent
    });
  };

  const handleCreateNewDoc = (templateCategory = 'general') => {
    let initialContent = '# Untitled Document\n\nBegin drafting your sovereign document...';
    let title = 'Untitled Document';

    if (templateCategory === 'specification') {
      title = 'Technical Architecture Specification';
      initialContent = `# Technical Architecture Specification
**Author:** Sovereign Architect  
**Status:** Draft  

## 1. Problem Statement & Scope
- 

## 2. Cryptographic Security Invariants
- Zero-Plaintext client memory isolation.
- WASM AST static analysis.

## 3. Implementation Milestones
- Phase 1: Core Engine
- Phase 2: Peer-to-Peer Sync`;
    } else if (templateCategory === 'meeting_notes') {
      title = 'Weekly Architecture Sync Notes';
      initialContent = `# Architecture Sync Notes
**Date:** ${new Date().toLocaleDateString()}  
**Attendees:** Gideon, Security Lead, Core Protocol Eng  

### Agenda
1. Review Sovereign Digital Workspace
2. Finalize Zero-Knowledge Vault Threat Model

### Decisions
- Standardize on PBKDF2 (600,000 rounds) + AES-256-GCM.

### Action Items
- [ ] Prepare daily briefing synthesis
- [ ] Audit compromised breach database correlates`;
    } else if (templateCategory === 'research_paper') {
      title = 'Research Findings & Academic Synthesis';
      initialContent = `# Research Findings & Academic Synthesis
**Topic:** Decentralized Sovereign Agent Networks  
**Target Publication:** IEEE Transactions  

## Abstract
- 

## Key Citations
- Rostova et al. (2026)
- Jenkins & O'Connor (2025)`;
    }

    const created = omniWorkspaceService.createDocument({
      title,
      category: templateCategory as any,
      content: initialContent,
      tags: [templateCategory, 'Workspace']
    });

    setSelectedDocId(created.id);
    setShowTemplateModal(false);
  };

  const handleDeleteDoc = (id: string) => {
    if (confirm('Delete this document?')) {
      omniWorkspaceService.deleteDocument(id);
      const rem = docs.filter(d => d.id !== id);
      if (rem.length > 0) setSelectedDocId(rem[0].id);
      else setSelectedDocId(null);
    }
  };

  const handleExportMarkdown = () => {
    if (!selectedDoc) return;
    const blob = new Blob([selectedDoc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDoc.title.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              docs.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{docs.length} Documents in Workspace</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">OMNI Sovereign Docs & Specs</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => handleCreateNewDoc('general')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Document</span>
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Document Selector */}
        <div className="md:col-span-4 space-y-2 max-h-[650px] overflow-y-auto pr-1">
          {docs.map(doc => {
            const isSelected = doc.id === selectedDocId;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md'
                    : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-indigo-300' : 'text-stone-200'}`}>
                    {doc.title}
                  </h4>
                  <span className="px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 font-mono text-[9px] uppercase border border-stone-800">
                    {doc.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                  <span>{doc.wordCount} words</span>
                  <span>v{doc.versions.length} • {doc.updatedAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Document Editor & Version Panel */}
        <div className="md:col-span-8 p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
          {selectedDoc ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleSaveDoc}
                  className="bg-transparent text-lg font-bold text-stone-100 focus:outline-none flex-1"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowVersionHistory(!showVersionHistory)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                      showVersionHistory ? 'bg-indigo-600 text-white' : 'bg-stone-950 text-stone-400 border border-stone-700'
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>v{selectedDoc.versions.length}</span>
                  </button>

                  <button
                    onClick={handleExportMarkdown}
                    className="p-1.5 bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 rounded-xl text-xs"
                    title="Export Markdown (.md)"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteDoc(selectedDoc.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Version History Drawer */}
              {showVersionHistory && (
                <div className="p-4 bg-stone-950 border border-indigo-800/40 rounded-xl space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase font-mono">
                    Document Revision History (Zero-Knowledge Stored)
                  </div>
                  <div className="space-y-1.5">
                    {selectedDoc.versions.map((ver) => (
                      <div key={ver.version} className="flex items-center justify-between text-stone-300 font-mono text-[11px]">
                        <span>Version {ver.version} — {ver.summary}</span>
                        <span className="text-stone-500">{ver.savedAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Editor Area */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
                  <span>Formatting: Markdown • Auto-Saved</span>
                  <span>{selectedDoc.wordCount} words • {editContent.length} chars</span>
                </div>
                <textarea
                  rows={16}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSaveDoc}
                  className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono text-stone-200 leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
                />
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-stone-500">Select or create a document.</div>
          )}
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100">Choose Document Template</h3>
              <button onClick={() => setShowTemplateModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { id: 'specification', title: 'Technical Architecture Specification', desc: 'Pre-filled with scope, security invariants, and WASM benchmarks.' },
                { id: 'meeting_notes', title: 'Architecture Sync Meeting Notes', desc: 'Agenda, attendee check-in, cryptographic decisions, and action items.' },
                { id: 'research_paper', title: 'Research Findings & Academic Synthesis', desc: 'Abstract, methodology, and multi-format citation references.' },
                { id: 'general', title: 'Blank Sovereign Document', desc: 'Empty canvas with standard markdown scaffolding.' }
              ].map(t => (
                <div
                  key={t.id}
                  onClick={() => handleCreateNewDoc(t.id)}
                  className="p-3 bg-stone-950 hover:bg-indigo-950/40 border border-stone-800 hover:border-indigo-500/50 rounded-xl cursor-pointer transition-all space-y-1"
                >
                  <div className="font-bold text-stone-200">{t.title}</div>
                  <p className="text-stone-400 text-[11px]">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
