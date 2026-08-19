import React, { useState } from 'react';
import { 
  OmniDocument, OmniDocumentType, OmniDocumentComment, 
  OmniDocumentVersion, OmniDocumentCitation 
} from '../../../types';
import { SEED_OMNI_DOCUMENTS, SEED_OMNI_DOCUMENT_TEMPLATES } from '../../../ai_store_data';
import { omniAi } from '../../../lib/omniAiSdk';
import { 
  FileText, Plus, Sparkles, MessageSquare, History, Download, 
  Share2, Save, Trash2, CheckCircle2, ChevronRight, BookOpen, 
  FileCheck, Shield, Book, Briefcase, Mail, FileSpreadsheet, 
  Edit3, Eye, Copy, RefreshCw, Send, Check, Clock, User, 
  Languages, Sliders, CornerDownRight, X, ArrowLeft, Paperclip,
  ExternalLink, Printer, Search, HelpCircle, FileCode, Layers
} from 'lucide-react';

interface OmniDocumentStudioProps {
  initialDocumentId?: string;
  onOpenSlideDeck?: (slideDeckId?: string) => void;
  onOpenSpreadsheet?: (sheetId?: string) => void;
}

export const OmniDocumentStudio: React.FC<OmniDocumentStudioProps> = ({
  initialDocumentId,
  onOpenSlideDeck,
  onOpenSpreadsheet
}) => {
  const [documents, setDocuments] = useState<OmniDocument[]>(SEED_OMNI_DOCUMENTS);
  const [activeDocId, setActiveDocId] = useState<string>(initialDocumentId || SEED_OMNI_DOCUMENTS[0].id);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [sidebarPanel, setSidebarPanel] = useState<'ai' | 'comments' | 'versions' | 'citations' | null>('ai');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Assistant States
  const [aiActionType, setAiActionType] = useState<'rewrite' | 'summarize' | 'expand' | 'translate' | 'adjust_tone' | 'qa'>('rewrite');
  const [aiInstruction, setAiInstruction] = useState('');
  const [aiTone, setAiTone] = useState('Sovereign Executive');
  const [aiLanguage, setAiLanguage] = useState('French');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // Comment States
  const [newCommentText, setNewCommentText] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  // Active Document
  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];

  const updateActiveDocument = (updates: Partial<OmniDocument>) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === activeDoc.id) {
        const updated = { ...doc, ...updates, updatedAt: new Date().toISOString() };
        if (updates.content !== undefined) {
          const words = updates.content.trim().split(/\s+/).filter(Boolean).length;
          updated.wordCount = words;
          updated.readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
        }
        return updated;
      }
      return doc;
    }));
  };

  // Create from Template
  const handleCreateDocument = (template?: typeof SEED_OMNI_DOCUMENT_TEMPLATES[0]) => {
    const newDocId = `doc_${Date.now()}`;
    const newDoc: OmniDocument = {
      id: newDocId,
      title: template ? template.title : 'Untitled Sovereign Document',
      documentType: template ? template.type : 'general',
      subtitle: template ? template.description : 'Standard editable document canvas',
      content: template ? template.sampleContent : '# Untitled Document\n\nBegin drafting your content here...',
      comments: [],
      versions: [
        {
          versionNumber: 1,
          timestamp: new Date().toISOString(),
          authorName: 'Gideon Oluwalana',
          summary: 'Document initialized',
          contentSnapshot: template ? template.sampleContent : '# Untitled Document',
          wordCount: 10
        }
      ],
      citations: [],
      tags: template ? [...template.tags] : ['Draft'],
      status: 'draft',
      wordCount: 10,
      readingTimeMinutes: 1,
      ownerUserId: 'usr_gideon',
      organizationId: 'org_dynasty',
      workspaceId: 'ws_org_main',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocId(newDocId);
    setIsTemplateModalOpen(false);
  };

  // Save Version Snapshot
  const handleSaveVersion = () => {
    const nextVerNumber = (activeDoc.versions?.length || 0) + 1;
    const newVersion: OmniDocumentVersion = {
      versionNumber: nextVerNumber,
      timestamp: new Date().toISOString(),
      authorName: 'Gideon Oluwalana',
      summary: `Manual checkpoint v${nextVerNumber}`,
      contentSnapshot: activeDoc.content,
      wordCount: activeDoc.wordCount
    };
    updateActiveDocument({
      versions: [newVersion, ...(activeDoc.versions || [])]
    });
  };

  // Restore Version Snapshot
  const handleRestoreVersion = (version: OmniDocumentVersion) => {
    if (window.confirm(`Restore Document to Version ${version.versionNumber}?`)) {
      updateActiveDocument({
        content: version.contentSnapshot,
        wordCount: version.wordCount
      });
    }
  };

  // Run AI Action
  const handleRunAIAction = async () => {
    setIsAiLoading(true);
    setAiResult(null);
    try {
      const resp = await omniAi.executeDocumentAIAction({
        action: aiActionType,
        documentTitle: activeDoc.title,
        content: activeDoc.content,
        selectedText: selectedText.trim() || undefined,
        tone: aiTone,
        targetLanguage: aiLanguage,
        question: aiActionType === 'qa' ? aiInstruction : undefined,
        customInstruction: aiInstruction.trim() || undefined
      });
      setAiResult(resp.resultText);
    } catch (err: any) {
      setAiResult(`AI Operation Note: ${err.message}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Apply AI Result to Document
  const handleApplyAiResult = () => {
    if (!aiResult) return;
    if (selectedText.trim() && activeDoc.content.includes(selectedText)) {
      const updatedContent = activeDoc.content.replace(selectedText, aiResult);
      updateActiveDocument({ content: updatedContent });
    } else {
      updateActiveDocument({ content: activeDoc.content + '\n\n' + aiResult });
    }
    setAiResult(null);
    setSelectedText('');
  };

  // Insert Formatting Markup into Editor
  const handleInsertMarkup = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('doc-markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;
    const selected = currentVal.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    updateActiveDocument({ content: newVal });
  };

  // Add Comment
  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newComment: OmniDocumentComment = {
      id: `comm_${Date.now()}`,
      authorId: 'usr_gideon',
      authorName: 'Gideon Oluwalana (You)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: newCommentText.trim(),
      selectedText: selectedText.trim() || undefined,
      timestamp: 'Just now',
      resolved: false,
      replies: []
    };
    updateActiveDocument({
      comments: [newComment, ...(activeDoc.comments || [])]
    });
    setNewCommentText('');
    setSelectedText('');
  };

  // Reply to Comment
  const handleAddReply = (commentId: string) => {
    const reply = replyText[commentId];
    if (!reply || !reply.trim()) return;

    const updatedComments = (activeDoc.comments || []).map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [
            ...(c.replies || []),
            {
              id: `rep_${Date.now()}`,
              authorId: 'usr_gideon',
              authorName: 'Gideon Oluwalana',
              text: reply.trim(),
              timestamp: 'Just now'
            }
          ]
        };
      }
      return c;
    });

    updateActiveDocument({ comments: updatedComments });
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
  };

  // Resolve Comment
  const handleToggleResolveComment = (commentId: string) => {
    const updatedComments = (activeDoc.comments || []).map(c => {
      if (c.id === commentId) {
        return { ...c, resolved: !c.resolved };
      }
      return c;
    });
    updateActiveDocument({ comments: updatedComments });
  };

  // Real Export Utilities (Downloads actual files)
  const handleExport = (format: 'html' | 'md' | 'doc' | 'pdf_print') => {
    if (format === 'html') {
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${activeDoc.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 850px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #111; }
    h1 { font-size: 28px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; color: #1e1b4b; }
    h2 { font-size: 22px; margin-top: 24px; color: #312e81; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #d1d5db; padding: 10px; text-align: left; }
    th { background: #f3f4f6; font-weight: 600; }
    blockquote { border-left: 4px solid #6366f1; margin: 0; padding-left: 16px; color: #4b5563; font-style: italic; }
    .meta { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
  </style>
</head>
<body>
  <h1>${activeDoc.title}</h1>
  <div class="meta">Document Type: ${activeDoc.documentType.toUpperCase()} | Status: ${activeDoc.status.toUpperCase()} | Generated via OMNI Create</div>
  <div>
    ${activeDoc.content.replace(/\n/g, '<br/>')}
  </div>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeDoc.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'md') {
      const blob = new Blob([activeDoc.content], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeDoc.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'doc') {
      const blob = new Blob([activeDoc.content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeDoc.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.doc`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf_print') {
      window.print();
    }
  };

  const getDocTypeIcon = (type: OmniDocumentType) => {
    switch (type) {
      case 'report': return FileText;
      case 'proposal': return FileCheck;
      case 'contract': return Shield;
      case 'policy': return Shield;
      case 'academic': return BookOpen;
      case 'business_plan': return Briefcase;
      case 'book': return Book;
      case 'letter': return Mail;
      case 'manual': return FileSpreadsheet;
      default: return FileText;
    }
  };

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div id="omni-document-studio-container" className="flex flex-col h-full bg-neutral-950 text-neutral-100 min-h-[750px]">
      {/* Top Header Bar */}
      <header id="doc-studio-header" className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <input
                id="doc-title-input"
                type="text"
                value={activeDoc.title}
                onChange={e => updateActiveDocument({ title: e.target.value })}
                className="bg-transparent text-lg font-semibold text-white focus:outline-none focus:border-b border-indigo-500 hover:border-b hover:border-neutral-700 transition-colors"
                placeholder="Document Title"
              />
              <span className="px-2 py-0.5 text-xs uppercase font-mono rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                {activeDoc.documentType}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                activeDoc.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                activeDoc.status === 'approved' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {activeDoc.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-0.5">
              <span>{activeDoc.wordCount} words</span>
              <span>•</span>
              <span>~{activeDoc.readingTimeMinutes} min read</span>
              <span>•</span>
              <span>Updated {new Date(activeDoc.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
            <button
              id="view-editor-btn"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'editor' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Edit
            </button>
            <button
              id="view-split-btn"
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'split' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Split View
            </button>
            <button
              id="view-preview-btn"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'preview' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview
            </button>
          </div>

          {/* New Document Button */}
          <button
            id="new-doc-btn"
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-400" />
            <span>New Document</span>
          </button>

          {/* Save Version Checkpoint */}
          <button
            id="save-version-btn"
            onClick={handleSaveVersion}
            title="Save version snapshot"
            className="p-1.5 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
          >
            <Save className="w-4 h-4" />
          </button>

          {/* Export Dropdown Group */}
          <div className="relative group">
            <button
              id="export-doc-btn"
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50">
              <button
                onClick={() => handleExport('html')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>HTML Web Page</span>
                <span className="text-neutral-500 font-mono">.html</span>
              </button>
              <button
                onClick={() => handleExport('md')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Markdown Raw</span>
                <span className="text-neutral-500 font-mono">.md</span>
              </button>
              <button
                onClick={() => handleExport('doc')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Word / Text Doc</span>
                <span className="text-neutral-500 font-mono">.doc</span>
              </button>
              <div className="border-t border-neutral-800 my-1"></div>
              <button
                onClick={() => handleExport('pdf_print')}
                className="w-full text-left px-3 py-1.5 text-xs text-indigo-400 hover:bg-neutral-800 flex items-center space-x-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Body: Left Nav, Center Canvas, Right Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Document Drawer / Switcher */}
        <aside id="doc-list-sidebar" className="w-64 border-r border-neutral-800 bg-neutral-900/50 flex flex-col shrink-0">
          <div className="p-3 border-b border-neutral-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Document Items List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredDocs.map(doc => {
              const IconComp = getDocTypeIcon(doc.documentType);
              const isActive = doc.id === activeDoc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id)}
                  className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start space-x-2.5 ${
                    isActive 
                      ? 'bg-indigo-600/15 border border-indigo-500/30 text-white shadow-sm' 
                      : 'hover:bg-neutral-800/60 border border-transparent text-neutral-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${
                    isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-medium truncate">{doc.title}</h4>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">{doc.subtitle || `${doc.wordCount} words`}</p>
                    <div className="flex items-center space-x-1.5 mt-1.5">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800/80 text-neutral-400 border border-neutral-700/60">
                        {doc.documentType}
                      </span>
                      {doc.comments && doc.comments.length > 0 && (
                        <span className="text-[10px] flex items-center text-amber-400">
                          <MessageSquare className="w-2.5 h-2.5 mr-0.5" />
                          {doc.comments.length}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Cross-Create Navigation */}
          <div className="p-3 border-t border-neutral-800 bg-neutral-900/80">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Connected Studios</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onOpenSlideDeck && onOpenSlideDeck()}
                className="px-2 py-1.5 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 flex items-center justify-center space-x-1"
              >
                <Layers className="w-3 h-3 text-amber-400" />
                <span>Slides</span>
              </button>
              <button
                onClick={() => onOpenSpreadsheet && onOpenSpreadsheet()}
                className="px-2 py-1.5 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 flex items-center justify-center space-x-1"
              >
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                <span>Sheets</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Center Canvas Area: Markdown Toolbar + Editor / Preview */}
        <main id="doc-main-canvas" className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
          {/* Formatting Toolbar */}
          {(activeTab === 'editor' || activeTab === 'split') && (
            <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900/40 flex items-center space-x-1 flex-wrap gap-y-1">
              <button onClick={() => handleInsertMarkup('# ')} className="px-2 py-1 text-xs font-mono font-bold bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Heading 1">H1</button>
              <button onClick={() => handleInsertMarkup('## ')} className="px-2 py-1 text-xs font-mono font-bold bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Heading 2">H2</button>
              <button onClick={() => handleInsertMarkup('### ')} className="px-2 py-1 text-xs font-mono font-bold bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Heading 3">H3</button>
              <span className="text-neutral-700 px-1">|</span>
              <button onClick={() => handleInsertMarkup('**', '**')} className="px-2 py-1 text-xs font-bold bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Bold">B</button>
              <button onClick={() => handleInsertMarkup('*', '*')} className="px-2 py-1 text-xs italic bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Italic">I</button>
              <button onClick={() => handleInsertMarkup('~~', '~~')} className="px-2 py-1 text-xs line-through bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Strikethrough">S</button>
              <button onClick={() => handleInsertMarkup('`', '`')} className="px-2 py-1 text-xs font-mono bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Inline Code">&lt;/&gt;</button>
              <span className="text-neutral-700 px-1">|</span>
              <button onClick={() => handleInsertMarkup('- ')} className="px-2 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Bullet List">• List</button>
              <button onClick={() => handleInsertMarkup('1. ')} className="px-2 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Numbered List">1. List</button>
              <button onClick={() => handleInsertMarkup('- [ ] ')} className="px-2 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Task Checkbox">☑ Check</button>
              <button onClick={() => handleInsertMarkup('\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Val A | Val B | Val C |\n')} className="px-2 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Table Insert">Table</button>
              <button onClick={() => handleInsertMarkup('> ')} className="px-2 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-200" title="Quote Block">Quote</button>
              <span className="text-neutral-700 px-1">|</span>
              <button 
                onClick={() => {
                  const selection = window.getSelection()?.toString();
                  if (selection) setSelectedText(selection);
                  setSidebarPanel('ai');
                }} 
                className="px-2.5 py-1 text-xs bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>AI Assist</span>
              </button>
            </div>
          )}

          {/* Editor and Preview Containers */}
          <div className="flex-1 flex overflow-hidden">
            {/* Editor Area */}
            {(activeTab === 'editor' || activeTab === 'split') && (
              <div className={`h-full flex flex-col p-6 overflow-y-auto ${activeTab === 'split' ? 'w-1/2 border-r border-neutral-800' : 'w-full'}`}>
                <textarea
                  id="doc-markdown-editor"
                  value={activeDoc.content}
                  onChange={e => updateActiveDocument({ content: e.target.value })}
                  onSelect={e => {
                    const target = e.target as HTMLTextAreaElement;
                    const selected = target.value.substring(target.selectionStart, target.selectionEnd);
                    if (selected && selected.trim()) {
                      setSelectedText(selected);
                    }
                  }}
                  className="w-full h-full bg-transparent text-neutral-200 font-mono text-sm leading-relaxed focus:outline-none resize-none placeholder-neutral-600"
                  placeholder="Draft your document with rich markdown..."
                />
              </div>
            )}

            {/* Formatted Preview Area */}
            {(activeTab === 'preview' || activeTab === 'split') && (
              <div className={`h-full p-8 overflow-y-auto bg-neutral-900/20 ${activeTab === 'split' ? 'w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
                <div className="prose prose-invert max-w-none space-y-4">
                  {/* Dynamic HTML/Markdown rendering */}
                  <div className="border-b border-neutral-800 pb-4 mb-6">
                    <h1 className="text-3xl font-serif font-bold text-white tracking-tight">{activeDoc.title}</h1>
                    {activeDoc.subtitle && (
                      <p className="text-base text-neutral-400 mt-2 font-sans">{activeDoc.subtitle}</p>
                    )}
                    <div className="flex items-center space-x-3 mt-4 text-xs text-neutral-500">
                      <span>Owner: <strong className="text-neutral-300">{activeDoc.ownerUserId === 'usr_gideon' ? 'Gideon Oluwalana' : 'Elena Vance'}</strong></span>
                      <span>•</span>
                      <span>Workspace: <strong className="text-neutral-300">Dynasty Trust Sovereign HQ</strong></span>
                    </div>
                  </div>

                  {/* Render Lines / Sections with rich styled formatting */}
                  <div className="space-y-4 text-neutral-200 leading-relaxed text-sm">
                    {activeDoc.content.split('\n\n').map((block, idx) => {
                      const trimmed = block.trim();
                      if (trimmed.startsWith('# ')) {
                        return <h1 key={idx} className="text-2xl font-serif font-bold text-white mt-6 mb-2">{trimmed.replace('# ', '')}</h1>;
                      } else if (trimmed.startsWith('## ')) {
                        return <h2 key={idx} className="text-xl font-serif font-semibold text-indigo-200 mt-5 mb-2 border-b border-neutral-800 pb-1">{trimmed.replace('## ', '')}</h2>;
                      } else if (trimmed.startsWith('### ')) {
                        return <h3 key={idx} className="text-base font-sans font-semibold text-amber-200 mt-4 mb-1">{trimmed.replace('### ', '')}</h3>;
                      } else if (trimmed.startsWith('|')) {
                        // Render Table
                        const rows = trimmed.split('\n').filter(r => r.includes('|') && !r.includes('---'));
                        const headers = rows[0]?.split('|').map(c => c.trim()).filter(Boolean) || [];
                        const dataRows = rows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
                        return (
                          <div key={idx} className="overflow-x-auto my-4 rounded-lg border border-neutral-800">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-neutral-800/70 text-neutral-300 border-b border-neutral-700">
                                <tr>
                                  {headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-3 py-2 font-semibold">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/40">
                                {dataRows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-neutral-800/40">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-3 py-2 text-neutral-300">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                        const items = trimmed.split('\n').map(i => i.replace(/^[-*]\s+/, ''));
                        return (
                          <ul key={idx} className="list-disc list-inside space-y-1.5 my-2 pl-2">
                            {items.map((item, iIdx) => (
                              <li key={iIdx} className="text-neutral-300">{item}</li>
                            ))}
                          </ul>
                        );
                      } else if (trimmed.startsWith('> ')) {
                        return (
                          <blockquote key={idx} className="border-l-4 border-indigo-500 pl-4 py-1.5 my-3 text-neutral-300 italic bg-indigo-950/20 rounded-r">
                            {trimmed.replace('> ', '')}
                          </blockquote>
                        );
                      }
                      return <p key={idx} className="text-neutral-300 leading-relaxed">{trimmed}</p>;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: AI Assistant / Comments / Versions / Citations */}
        <aside id="doc-right-sidebar" className="w-80 border-l border-neutral-800 bg-neutral-900/60 flex flex-col shrink-0">
          {/* Panel Selector Tabs */}
          <div className="flex border-b border-neutral-800 bg-neutral-900 p-1">
            <button
              onClick={() => setSidebarPanel('ai')}
              className={`flex-1 py-2 text-xs font-medium rounded transition-colors flex items-center justify-center space-x-1 ${
                sidebarPanel === 'ai' ? 'bg-neutral-800 text-indigo-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Tools</span>
            </button>
            <button
              onClick={() => setSidebarPanel('comments')}
              className={`flex-1 py-2 text-xs font-medium rounded transition-colors flex items-center justify-center space-x-1 ${
                sidebarPanel === 'comments' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Comments ({activeDoc.comments?.length || 0})</span>
            </button>
            <button
              onClick={() => setSidebarPanel('versions')}
              className={`flex-1 py-2 text-xs font-medium rounded transition-colors flex items-center justify-center space-x-1 ${
                sidebarPanel === 'versions' ? 'bg-neutral-800 text-emerald-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </div>

          {/* Panel Contents */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* AI Assistant Panel */}
            {sidebarPanel === 'ai' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Action Mode</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'rewrite', label: 'Rewrite' },
                      { id: 'summarize', label: 'Summarise' },
                      { id: 'expand', label: 'Expand' },
                      { id: 'translate', label: 'Translate' },
                      { id: 'adjust_tone', label: 'Tone' },
                      { id: 'qa', label: 'Doc Q&A' }
                    ].map(act => (
                      <button
                        key={act.id}
                        onClick={() => setAiActionType(act.id as any)}
                        className={`px-2 py-1.5 text-xs rounded border text-center transition-colors ${
                          aiActionType === act.id
                            ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                            : 'bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                        }`}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Select */}
                {aiActionType === 'adjust_tone' && (
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Target Tone</label>
                    <select
                      value={aiTone}
                      onChange={e => setAiTone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Sovereign Executive">Sovereign Executive</option>
                      <option value="Formal Legal & Compliance">Formal Legal & Compliance</option>
                      <option value="Persuasive Commercial Proposal">Persuasive Commercial Proposal</option>
                      <option value="Rigorous Academic Dissertation">Rigorous Academic Dissertation</option>
                      <option value="Technical Engineering Manual">Technical Engineering Manual</option>
                    </select>
                  </div>
                )}

                {/* Language Select */}
                {aiActionType === 'translate' && (
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Target Language</label>
                    <select
                      value={aiLanguage}
                      onChange={e => setAiLanguage(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="French">French (Français)</option>
                      <option value="Spanish">Spanish (Español)</option>
                      <option value="German">German (Deutsch)</option>
                      <option value="Mandarin Chinese">Mandarin Chinese (中文)</option>
                      <option value="Japanese">Japanese (日本語)</option>
                      <option value="Arabic">Arabic (العربية)</option>
                      <option value="Portuguese">Portuguese (Português)</option>
                      <option value="Yoruba">Yoruba</option>
                      <option value="Swahili">Swahili</option>
                    </select>
                  </div>
                )}

                {/* Scope Note */}
                {selectedText ? (
                  <div className="p-2 rounded bg-indigo-950/40 border border-indigo-800/50 text-[11px] text-indigo-300 flex items-center justify-between">
                    <span className="truncate">Selected text: "{selectedText.slice(0, 30)}..."</span>
                    <button onClick={() => setSelectedText('')} className="text-indigo-400 hover:text-white ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-400">Targeting whole document. Select text in editor to target specific passages.</p>
                )}

                {/* Custom Instruction / Question */}
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    {aiActionType === 'qa' ? 'Ask a Question about this Document' : 'Custom Guidance (Optional)'}
                  </label>
                  <textarea
                    value={aiInstruction}
                    onChange={e => setAiInstruction(e.target.value)}
                    placeholder={aiActionType === 'qa' ? 'e.g., What are our SLA commitments in section 2?' : 'e.g., Make it punchier for venture partners...'}
                    className="w-full p-2.5 text-xs bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-indigo-500 resize-none h-20 placeholder-neutral-500"
                  />
                </div>

                {/* Execute Button */}
                <button
                  id="execute-ai-btn"
                  onClick={handleRunAIAction}
                  disabled={isAiLoading}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center space-x-2 shadow-sm transition-colors disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing Sovereign Intelligence...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Execute {aiActionType.replace('_', ' ').toUpperCase()}</span>
                    </>
                  )}
                </button>

                {/* AI Result Box */}
                {aiResult && (
                  <div className="p-3 bg-neutral-800/80 border border-indigo-500/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                      <span>AI Generated Output</span>
                      <button onClick={() => navigator.clipboard.writeText(aiResult)} className="text-neutral-400 hover:text-white" title="Copy">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-neutral-200 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed border-t border-neutral-700/50 pt-2 font-mono">
                      {aiResult}
                    </div>
                    {aiActionType !== 'qa' && (
                      <button
                        onClick={handleApplyAiResult}
                        className="w-full py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Insert / Apply to Document</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Comments Panel */}
            {sidebarPanel === 'comments' && (
              <div className="space-y-4">
                {/* New Comment Input */}
                <div className="space-y-2">
                  <textarea
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    placeholder="Add a comment or @mention a collaborator..."
                    className="w-full p-2.5 text-xs bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500 resize-none h-18 placeholder-neutral-500"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newCommentText.trim()}
                    className="w-full py-1.5 text-xs font-semibold rounded bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center space-x-1 disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Comment</span>
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {(activeDoc.comments || []).length === 0 ? (
                    <p className="text-xs text-neutral-500 text-center py-6">No comments yet. Highlight text or write a review comment above.</p>
                  ) : (
                    activeDoc.comments?.map(comment => (
                      <div key={comment.id} className={`p-3 rounded-lg border text-xs space-y-2 ${
                        comment.resolved 
                          ? 'bg-neutral-900/40 border-neutral-800 opacity-60' 
                          : 'bg-neutral-800/80 border-neutral-700'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                              {comment.authorName.charAt(0)}
                            </div>
                            <span className="font-semibold text-neutral-200">{comment.authorName}</span>
                          </div>
                          <button
                            onClick={() => handleToggleResolveComment(comment.id)}
                            className={`p-1 rounded ${comment.resolved ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'}`}
                            title={comment.resolved ? 'Reopen comment' : 'Mark as resolved'}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {comment.selectedText && (
                          <div className="p-1.5 bg-neutral-900/80 border-l-2 border-amber-500 text-[11px] text-neutral-400 italic">
                            "{comment.selectedText}"
                          </div>
                        )}
                        <p className="text-neutral-200 leading-normal">{comment.text}</p>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="pl-3 border-l border-neutral-700 space-y-2 mt-2 pt-1">
                            {comment.replies.map(r => (
                              <div key={r.id} className="text-[11px] space-y-0.5">
                                <span className="font-semibold text-neutral-300">{r.authorName}: </span>
                                <span className="text-neutral-400">{r.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input */}
                        {!comment.resolved && (
                          <div className="flex items-center space-x-1.5 pt-1.5">
                            <input
                              type="text"
                              value={replyText[comment.id] || ''}
                              onChange={e => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                              onKeyDown={e => e.key === 'Enter' && handleAddReply(comment.id)}
                              placeholder="Reply..."
                              className="flex-1 px-2 py-1 text-[11px] bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500"
                            />
                            <button
                              onClick={() => handleAddReply(comment.id)}
                              className="px-2 py-1 text-[11px] font-semibold bg-neutral-700 hover:bg-neutral-600 rounded text-neutral-200"
                            >
                              Reply
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Version History Panel */}
            {sidebarPanel === 'versions' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-300">Version Timeline</span>
                  <button
                    onClick={handleSaveVersion}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Save Snapshot</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {(activeDoc.versions || []).map((ver, idx) => (
                    <div key={ver.versionNumber} className="p-3 bg-neutral-800/70 border border-neutral-700 rounded-lg text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono font-bold text-[10px]">
                            v{ver.versionNumber}
                          </span>
                          <span className="font-semibold text-neutral-200">{ver.authorName}</span>
                        </div>
                        {idx !== 0 && (
                          <button
                            onClick={() => handleRestoreVersion(ver)}
                            className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium"
                          >
                            Restore
                          </button>
                        )}
                      </div>
                      <p className="text-neutral-400 text-[11px]">{ver.summary}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-neutral-500 pt-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(ver.timestamp).toLocaleDateString()} {new Date(ver.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span>{ver.wordCount} words</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* New Document Template Picker Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Create New Sovereign Document</h3>
                <p className="text-xs text-neutral-400">Choose from institutional templates or start with a clean slate</p>
              </div>
              <button onClick={() => setIsTemplateModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-3">
              {SEED_OMNI_DOCUMENT_TEMPLATES.map(tpl => {
                const Icon = getDocTypeIcon(tpl.type);
                return (
                  <button
                    key={tpl.type}
                    onClick={() => handleCreateDocument(tpl)}
                    className="p-3 rounded-lg border border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800 hover:border-indigo-500/50 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-indigo-300">{tpl.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{tpl.description}</p>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-3">
                      {tpl.tags.map(t => (
                        <span key={t} className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-900 text-neutral-400 border border-neutral-700/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
