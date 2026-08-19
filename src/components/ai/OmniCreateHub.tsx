import React, { useState } from 'react';
import { OmniDocumentStudio } from './create/OmniDocumentStudio';
import { OmniSlideStudio } from './create/OmniSlideStudio';
import { OmniSheetStudio } from './create/OmniSheetStudio';
import { OmniWorkspaceHub } from './create/OmniWorkspaceHub';
import { OmniCommandBar } from './create/OmniCommandBar';
import { 
  FileText, Layers, BarChart2, FolderKanban, Sparkles, 
  Command, Plus, ArrowRight, Shield, Zap 
} from 'lucide-react';

interface OmniCreateHubProps {
  initialSubTab?: 'documents' | 'slides' | 'sheets' | 'workspace';
}

export const OmniCreateHub: React.FC<OmniCreateHubProps> = ({
  initialSubTab = 'documents'
}) => {
  const [subTab, setSubTab] = useState<'documents' | 'slides' | 'sheets' | 'workspace'>(initialSubTab);
  const [activeDocId, setActiveDocId] = useState<string | undefined>(undefined);
  const [activeDeckId, setActiveDeckId] = useState<string | undefined>(undefined);
  const [activeSheetId, setActiveSheetId] = useState<string | undefined>(undefined);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  // Navigation callbacks
  const handleOpenDocument = (docId?: string) => {
    if (docId) setActiveDocId(docId);
    setSubTab('documents');
  };

  const handleOpenSlideDeck = (deckId?: string) => {
    if (deckId) setActiveDeckId(deckId);
    setSubTab('slides');
  };

  const handleOpenSpreadsheet = (sheetId?: string) => {
    if (sheetId) setActiveSheetId(sheetId);
    setSubTab('sheets');
  };

  return (
    <div id="omni-create-master-hub" className="flex flex-col h-full bg-neutral-950 text-neutral-100 min-h-[800px]">
      {/* Sub-Header Navigation Tabs */}
      <div className="flex items-center justify-between px-6 py-2 bg-neutral-900 border-b border-neutral-800 shrink-0">
        <div className="flex items-center space-x-1">
          <button
            id="tab-documents-btn"
            onClick={() => setSubTab('documents')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              subTab === 'documents'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Documents</span>
          </button>

          <button
            id="tab-slides-btn"
            onClick={() => setSubTab('slides')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              subTab === 'slides'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Slides</span>
          </button>

          <button
            id="tab-sheets-btn"
            onClick={() => setSubTab('sheets')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              subTab === 'sheets'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sheets</span>
          </button>

          <button
            id="tab-workspace-btn"
            onClick={() => setSubTab('workspace')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              subTab === 'workspace'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-purple-400" />
            <span>Workspace</span>
          </button>
        </div>

        {/* Global AI Command Bar Trigger */}
        <button
          id="global-ai-command-bar-btn"
          onClick={() => setIsCommandBarOpen(true)}
          className="flex items-center space-x-2 px-3 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-neutral-200 border border-neutral-700/80 shadow-sm transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>AI Command Bar</span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono text-neutral-400 border border-neutral-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Main Studio Views */}
      <div className="flex-1 overflow-hidden">
        {subTab === 'documents' && (
          <OmniDocumentStudio
            initialDocumentId={activeDocId}
            onOpenSlideDeck={handleOpenSlideDeck}
            onOpenSpreadsheet={handleOpenSpreadsheet}
          />
        )}

        {subTab === 'slides' && (
          <OmniSlideStudio
            initialPresentationId={activeDeckId}
            onOpenDocument={handleOpenDocument}
            onOpenSpreadsheet={handleOpenSpreadsheet}
          />
        )}

        {subTab === 'sheets' && (
          <OmniSheetStudio
            initialSpreadsheetId={activeSheetId}
            onOpenDocument={handleOpenDocument}
            onOpenSlideDeck={handleOpenSlideDeck}
          />
        )}

        {subTab === 'workspace' && (
          <OmniWorkspaceHub
            onOpenDocument={handleOpenDocument}
            onOpenSlideDeck={handleOpenSlideDeck}
            onOpenSpreadsheet={handleOpenSpreadsheet}
          />
        )}
      </div>

      {/* Command Bar Modal */}
      <OmniCommandBar
        isOpen={isCommandBarOpen}
        onClose={() => setIsCommandBarOpen(false)}
        onNavigateToDocument={handleOpenDocument}
        onNavigateToSlideDeck={handleOpenSlideDeck}
        onNavigateToSpreadsheet={handleOpenSpreadsheet}
      />
    </div>
  );
};
