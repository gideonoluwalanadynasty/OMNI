import React, { useState } from 'react';
import {
  X, FileText, Code, Table, Shield, Sparkles, History, Users,
  Share2, HardDrive, Download, Lock, Check, Send, AlertCircle,
  Copy, RefreshCw, MessageSquare, Tag, Eye, ChevronRight,
  ExternalLink, CornerDownRight, CheckCircle2, Globe, FileCode
} from 'lucide-react';
import {
  WorksDriveFile,
  WorksFileVersion,
  WorksFileComment,
  WorksFileAccessRole
} from '../../types/works';
import { SEED_WORKS_AI_DOC_ANALYSIS } from '../../data/omni_drive_seed';

interface WorksFilePreviewModalProps {
  file: WorksDriveFile;
  onClose: () => void;
  onUpdateFile: (fileId: string, updated: Partial<WorksDriveFile>) => void;
  onRestoreVersion: (fileId: string, version: WorksFileVersion) => void;
  onTriggerToast?: (title: string, description: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  onNavigateApp?: (appId: string) => void;
}

type PreviewTab = 'preview' | 'ai' | 'versions' | 'comments' | 'sharing' | 'audit' | 'cloud';

export const WorksFilePreviewModal: React.FC<WorksFilePreviewModalProps> = ({
  file,
  onClose,
  onUpdateFile,
  onRestoreVersion,
  onTriggerToast,
  onNavigateApp
}) => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('preview');
  
  // AI Q&A State
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiConversation, setAiConversation] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: string }[]>([
    {
      sender: 'ai',
      text: `Hello! I am your OMNI AI Document Co-Processor. I have analyzed **${file.title}**. You can ask me any specific question regarding its architecture, requirements, formulas, or key dates.`,
      timestamp: 'Just now'
    }
  ]);
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Spanish');
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);

  // Version Comparison State
  const [selectedDiffVersion, setSelectedDiffVersion] = useState<number>(
    file.versions.length > 1 ? file.versions[1].versionNumber : file.currentVersion
  );

  // Comment State
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [filterUnresolvedOnly, setFilterUnresolvedOnly] = useState<boolean>(false);

  // Sharing State
  const [newShareTarget, setNewShareTarget] = useState<string>('');
  const [newShareRole, setNewShareRole] = useState<WorksFileAccessRole>('editor');

  const analysis = SEED_WORKS_AI_DOC_ANALYSIS[file.id] || {
    fileId: file.id,
    executiveSummary: file.summary || `Comprehensive ${file.format} file containing verified workspace operational data.`,
    keyTakeaways: [
      `Format verified as ${file.format.toUpperCase()} with SHA-256 cryptographic non-repudiation.`,
      `Integrated with ${file.cloudBucketId ? 'OMNI Sovereign Storage Bucket' : 'Local Mesh'}.`,
      `Security classification enforced at ${file.classification.replace(/_/g, ' ').toUpperCase()}.`
    ],
    actionItems: [
      { task: `Review ${file.title} with department leads`, priority: 'medium' }
    ],
    suggestedTags: file.aiTags.length > 0 ? file.aiTags : ['Operational', 'Document'],
    sentiment: 'constructive',
    confidenceScore: 0.96
  };

  const handleAskAi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim() || isAiProcessing) return;

    const userQ = aiQuestion.trim();
    setAiConversation(prev => [...prev, { sender: 'user', text: userQ, timestamp: 'Just now' }]);
    setAiQuestion('');
    setIsAiProcessing(true);

    setTimeout(() => {
      let answer = '';
      const lower = userQ.toLowerCase();
      if (lower.includes('summary') || lower.includes('summarize')) {
        answer = `**Executive Summary**: ${analysis.executiveSummary}\n\n**Key Takeaways**:\n${analysis.keyTakeaways.map(t => `• ${t}`).join('\n')}`;
      } else if (lower.includes('crdt') || lower.includes('latency') || lower.includes('sync')) {
        answer = `According to **${file.title}**, the CRDT synchronization engine operates on an Automerge/Yjs state-vector architecture with sub-5ms latency across European and North American mesh nodes.`;
      } else if (lower.includes('security') || lower.includes('encryption') || lower.includes('zk') || lower.includes('key')) {
        answer = `This document utilizes **${file.encryptionAlgorithm || 'AES-256-GCM'}** with cryptographic SHA-256 checksum \`${file.sha256Checksum.slice(0, 16)}...\`. Hardware-backed FIDO2 passkeys are enforced for access.`;
      } else if (lower.includes('action') || lower.includes('task') || lower.includes('todo')) {
        answer = `Identified Action Items:\n${analysis.actionItems.map(a => `• **${a.task}** (Priority: ${a.priority.toUpperCase()})`).join('\n')}`;
      } else {
        answer = `Based on my analysis of **${file.title}** (${file.format.toUpperCase()} payload):\n\nThe document highlights core operational standards for ${file.departmentName || 'the workspace'}, specifying mathematical non-repudiation, tamper-evident audit trails, and multi-tenant isolation.`;
      }

      setAiConversation(prev => [...prev, { sender: 'ai', text: answer, timestamp: 'Just now' }]);
      setIsAiProcessing(false);
    }, 600);
  };

  const handleTranslate = () => {
    setIsAiProcessing(true);
    setTimeout(() => {
      setTranslatedContent(
        `[Translated into ${selectedLanguage} via OMNI Sovereign AI Pipeline]\n\n# ${file.title.replace(/\.[^/.]+$/, '')} (${selectedLanguage})\n\nEste documento contiene especificaciones operativas y arquitectónicas verificadas con soberanía matemática y sincronización en tiempo real sin fuga de datos.`
      );
      setIsAiProcessing(false);
      onTriggerToast?.('Translation Complete', `Document translated into ${selectedLanguage}.`, 'success');
    }, 800);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: WorksFileComment = {
      id: `com_${Date.now()}`,
      fileId: file.id,
      authorId: 'usr_gideon_01',
      authorName: 'Gideon Oluwalana',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authorRole: 'Chief Executive Officer',
      content: newCommentText.trim(),
      createdAt: 'Just now',
      isResolved: false,
      reactions: []
    };

    onUpdateFile(file.id, {
      comments: [newComment, ...file.comments]
    });
    setNewCommentText('');
    onTriggerToast?.('Comment Added', 'New collaborator comment pinned to document.', 'success');
  };

  const handleReplyComment = (commentId: string) => {
    if (!replyText.trim()) return;
    const updatedComments = file.comments.map(c => {
      if (c.id === commentId) {
        const existingReplies = c.replies || [];
        return {
          ...c,
          replies: [
            ...existingReplies,
            {
              id: `rep_${Date.now()}`,
              authorId: 'usr_gideon_01',
              authorName: 'Gideon Oluwalana',
              authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              content: replyText.trim(),
              createdAt: 'Just now'
            }
          ]
        };
      }
      return c;
    });

    onUpdateFile(file.id, { comments: updatedComments });
    setReplyText('');
    setReplyingToCommentId(null);
    onTriggerToast?.('Reply Sent', 'Thread updated.', 'info');
  };

  const handleToggleResolve = (commentId: string) => {
    const updatedComments = file.comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isResolved: !c.isResolved,
          resolvedBy: !c.isResolved ? 'Gideon Oluwalana' : undefined,
          resolvedAt: !c.isResolved ? 'Just now' : undefined
        };
      }
      return c;
    });
    onUpdateFile(file.id, { comments: updatedComments });
  };

  const handleAddShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShareTarget.trim()) return;

    const newShare = {
      id: `sh_${Date.now()}`,
      targetType: 'user' as const,
      targetName: newShareTarget.trim(),
      role: newShareRole,
      grantedBy: 'usr_gideon_01',
      grantedAt: 'Just now',
      allowDownload: true,
      allowExport: true
    };

    onUpdateFile(file.id, {
      shares: [...file.shares, newShare]
    });
    setNewShareTarget('');
    onTriggerToast?.('Access Granted', `Shared ${file.title} with ${newShareTarget} as ${newShareRole}.`, 'success');
  };

  const handleRemoveShare = (shareId: string) => {
    onUpdateFile(file.id, {
      shares: file.shares.filter(s => s.id !== shareId)
    });
    onTriggerToast?.('Access Revoked', 'Permission removed.', 'info');
  };

  const filteredComments = filterUnresolvedOnly
    ? file.comments.filter(c => !c.isResolved)
    : file.comments;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              {file.format === 'markdown' || file.format === 'document' ? <FileText className="w-5 h-5" /> :
               file.format === 'code' ? <Code className="w-5 h-5" /> :
               file.format === 'spreadsheet' ? <Table className="w-5 h-5" /> :
               file.format === 'pdf' ? <Shield className="w-5 h-5" /> :
               file.format === 'image' ? <Eye className="w-5 h-5" /> :
               <FileCode className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white truncate">{file.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-800 text-neutral-300 font-mono">
                  v{file.currentVersion}.0
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  file.classification === 'restricted_sovereign' ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40' :
                  file.classification === 'confidential' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40' :
                  'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                }`}>
                  {file.classification.replace(/_/g, ' ')}
                </span>
                {file.isZeroKnowledgeEncrypted && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>ZK-E2EE</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 truncate flex items-center gap-2 mt-0.5">
                <span>{(file.sizeBytes / 1024).toFixed(1)} KB</span>
                <span>•</span>
                <span>Owner: <strong className="text-neutral-300">{file.ownerName}</strong></span>
                <span>•</span>
                <span>IPFS CID: <code className="text-indigo-400 font-mono">{file.ipfsCid ? `${file.ipfsCid.slice(0, 12)}...` : 'Local'}</code></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                navigator.clipboard.writeText(file.content);
                onTriggerToast?.('Content Copied', 'File contents copied to clipboard.', 'success');
              }}
              className="px-2.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Content"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </button>

            <button
              onClick={() => {
                const element = document.createElement('a');
                const blobFile = new Blob([file.content], { type: file.mimeType });
                element.href = URL.createObjectURL(blobFile);
                element.download = file.title;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                onTriggerToast?.('Download Started', `Exporting ${file.title}`, 'info');
              }}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-600/30 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Sub-Header Tabs */}
        <div className="px-5 py-2 border-b border-neutral-800 bg-neutral-950/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>OMNI AI Intelligence</span>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('versions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'versions' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Versions ({file.versions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'comments' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comments ({file.comments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sharing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'sharing' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Sharing & RBAC</span>
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'cloud' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>OMNI Cloud & IPFS</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-neutral-900/60">
          
          {/* TAB 1: PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              {/* Top Presence & Active Collaborators banner */}
              {file.activeCollaborators && file.activeCollaborators.length > 0 && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-neutral-400">Live Presence:</span>
                    <div className="flex items-center -space-x-1.5">
                      {file.activeCollaborators.map(c => (
                        <img
                          key={c.userId}
                          src={c.userAvatar}
                          alt={c.userName}
                          title={`${c.userName} (${c.status})`}
                          className="w-6 h-6 rounded-full border-2 border-neutral-900"
                        />
                      ))}
                    </div>
                    <span className="text-neutral-300 font-medium ml-1">
                      {file.activeCollaborators.map(c => c.userName).join(', ')} currently {file.activeCollaborators[0]?.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono">CRDT State Vector: CONVERGED (4.8ms)</span>
                </div>
              )}

              {/* Render based on file format */}
              {file.format === 'markdown' || file.format === 'document' ? (
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-200 prose prose-invert max-w-none font-sans leading-relaxed text-sm">
                  {translatedContent ? (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 flex items-center justify-between text-xs mb-4">
                        <span>Viewing Sovereign AI Translation</span>
                        <button onClick={() => setTranslatedContent(null)} className="text-indigo-400 hover:underline">Revert to Original</button>
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-300 bg-transparent p-0">{translatedContent}</pre>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-300 bg-transparent p-0 select-text leading-relaxed">
                      {file.content}
                    </pre>
                  )}
                </div>
              ) : file.format === 'code' ? (
                <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden font-mono text-xs">
                  <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{file.title} • {file.metadata?.linesOfCode || 200} lines</span>
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(file.content);
                        onTriggerToast?.('Code Copied', 'Copied to clipboard', 'info');
                      }}
                      className="hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto max-h-[500px]">
                    <table className="w-full text-left">
                      <tbody>
                        {file.content.split('\n').map((line, idx) => (
                          <tr key={idx} className="hover:bg-neutral-900/60">
                            <td className="pr-4 py-0.5 text-neutral-600 select-none text-right w-8">{idx + 1}</td>
                            <td className="py-0.5 text-neutral-300 whitespace-pre">{line}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : file.format === 'spreadsheet' ? (
                <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden text-xs">
                  <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-2">
                      <Table className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Structured Ledger Grid • {file.metadata?.rowCount || 8} rows</span>
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-800 bg-neutral-900/80">
                          {file.content.split('\n')[0]?.split(',').map((header, i) => (
                            <th key={i} className="px-3 py-2 text-neutral-300 font-bold text-[11px] uppercase tracking-wider">{header.trim()}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 font-mono">
                        {file.content.split('\n').slice(1).filter(l => l.trim()).map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-neutral-900/40">
                            {row.split(',').map((cell, cIdx) => (
                              <td key={cIdx} className="px-3 py-2 text-neutral-300 whitespace-nowrap">{cell.trim()}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : file.format === 'image' ? (
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center">
                  <div 
                    className="w-full max-w-2xl bg-neutral-900 rounded-xl p-4 border border-neutral-800 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: file.content }}
                  />
                  <p className="text-xs text-neutral-400 mt-3 font-mono">
                    Vector SVG Asset • Rendered at Native Canvas Resolution
                  </p>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 font-sans text-sm text-neutral-300">
                  <pre className="whitespace-pre-wrap font-mono text-xs">{file.content}</pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: OMNI AI INTELLIGENCE */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: AI Summary & Action Items */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Executive Summary Card */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>Executive AI Summary</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/40">
                      {Math.round(analysis.confidenceScore * 100)}% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/60">
                    {analysis.executiveSummary}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">Key Takeaways</span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {analysis.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">Suggested Tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.suggestedTags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-[10px] font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Action Items Extractor */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Extracted Sprint Action Items</span>
                  </span>
                  <div className="space-y-2">
                    {analysis.actionItems.map((act, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs flex items-center justify-between gap-2">
                        <div>
                          <p className="text-white font-medium">{act.task}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Assignee: {act.suggestedAssignee || 'Unassigned'}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          act.priority === 'high' ? 'bg-rose-950 text-rose-300 border border-rose-800/40' :
                          act.priority === 'medium' ? 'bg-amber-950 text-amber-300 border border-amber-800/40' :
                          'bg-neutral-800 text-neutral-400'
                        }`}>
                          {act.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Translation Box */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Sovereign Translation Pipeline</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none"
                    >
                      <option value="Spanish">Spanish (Español)</option>
                      <option value="French">French (Français)</option>
                      <option value="German">German (Deutsch)</option>
                      <option value="Japanese">Japanese (日本語)</option>
                      <option value="Chinese">Chinese (Mandarin)</option>
                      <option value="Arabic">Arabic (العربية)</option>
                      <option value="Portuguese">Portuguese (Português)</option>
                    </select>
                    <button
                      onClick={handleTranslate}
                      disabled={isAiProcessing}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                    >
                      Translate
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Ask Document Q&A Chat */}
              <div className="lg:col-span-7 flex flex-col h-[520px] rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden">
                <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">Ask Document (Grounded Gemini Q&A)</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">Zero Egress Verified</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none whitespace-pre-wrap'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}
                  {isAiProcessing && (
                    <div className="flex items-center gap-2 text-xs text-indigo-400 bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800 w-fit">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing answer from document state vector...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAskAi} className="p-3 bg-neutral-900/90 border-t border-neutral-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="Ask anything about this document..."
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-neutral-500"
                  />
                  <button
                    type="submit"
                    disabled={!aiQuestion.trim() || isAiProcessing}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 3: VERSION CONTROL & HISTORY */}
          {activeTab === 'versions' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Immutable Document Version History</h4>
                  <p className="text-xs text-neutral-400">Every snapshot is anchored with SHA-256 integrity hashing and IPFS pinning.</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-mono">
                  Current: v{file.currentVersion}.0
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {file.versions.map((ver) => (
                  <div
                    key={ver.versionId}
                    className={`p-4 rounded-2xl border transition-all ${
                      ver.versionNumber === file.currentVersion
                        ? 'bg-indigo-950/20 border-indigo-500/40 shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-mono ${
                          ver.versionNumber === file.currentVersion ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          v{ver.versionNumber}.0
                        </span>
                        {ver.versionNumber === file.currentVersion && (
                          <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">(Active Head)</span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500">{new Date(ver.createdAt).toLocaleString()}</span>
                    </div>

                    <p className="text-xs text-neutral-200 font-medium mb-3">{ver.changeSummary}</p>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800/80">
                      <div className="flex items-center gap-1.5">
                        <img src={ver.createdByAvatar} alt={ver.createdByName} className="w-4 h-4 rounded-full" />
                        <span>{ver.createdByName}</span>
                      </div>
                      <span>{(ver.sizeBytes / 1024).toFixed(1)} KB</span>
                    </div>

                    <div className="mt-3 pt-2 flex items-center justify-between gap-2">
                      <code className="text-[10px] text-neutral-500 font-mono truncate max-w-[200px]" title={ver.sha256Hash}>
                        SHA: {ver.sha256Hash.slice(0, 16)}...
                      </code>
                      {ver.versionNumber !== file.currentVersion && (
                        <button
                          onClick={() => {
                            onRestoreVersion(file.id, ver);
                            onTriggerToast?.('Version Restored', `Restored to v${ver.versionNumber}.0`, 'success');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Restore Version
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COLLABORATION & COMMENTS */}
          {activeTab === 'comments' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Document Comments & Mentions</h4>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-mono">
                    {file.comments.length}
                  </span>
                </div>

                <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterUnresolvedOnly}
                    onChange={(e) => setFilterUnresolvedOnly(e.target.checked)}
                    className="rounded bg-neutral-950 border-neutral-800 text-indigo-600 focus:ring-0"
                  />
                  <span>Unresolved Only</span>
                </label>
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Leave a comment, use @name to mention squad members..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-indigo-500"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-neutral-500">Supports markdown and @mentions</span>
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              {/* Comment List */}
              <div className="space-y-3">
                {filteredComments.map((com) => (
                  <div
                    key={com.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      com.isResolved ? 'bg-neutral-950/40 border-neutral-800/40 opacity-70' : 'bg-neutral-950 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={com.authorAvatar} alt={com.authorName} className="w-7 h-7 rounded-full" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{com.authorName}</span>
                            <span className="text-[10px] text-neutral-400">{com.authorRole}</span>
                          </div>
                          <span className="text-[10px] text-neutral-500">{com.createdAt}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleResolve(com.id)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                          com.isResolved
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{com.isResolved ? 'Resolved' : 'Mark Resolved'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-neutral-200 pl-9.5 mb-2 leading-relaxed">{com.content}</p>

                    {/* Replies */}
                    {com.replies && com.replies.length > 0 && (
                      <div className="ml-9.5 space-y-2 mt-3 pt-3 border-t border-neutral-800/60">
                        {com.replies.map(rep => (
                          <div key={rep.id} className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/40 flex items-start gap-2.5">
                            <img src={rep.authorAvatar} alt={rep.authorName} className="w-5 h-5 rounded-full mt-0.5" />
                            <div className="text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-neutral-200">{rep.authorName}</span>
                                <span className="text-[10px] text-neutral-500">{rep.createdAt}</span>
                              </div>
                              <p className="text-neutral-300 mt-0.5">{rep.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply form */}
                    {replyingToCommentId === com.id ? (
                      <div className="ml-9.5 mt-3 flex items-center gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write reply..."
                          className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          onClick={() => handleReplyComment(com.id)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => setReplyingToCommentId(null)}
                          className="px-2 py-1.5 rounded-xl bg-neutral-800 text-neutral-400 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="ml-9.5 mt-2">
                        <button
                          onClick={() => setReplyingToCommentId(com.id)}
                          className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <CornerDownRight className="w-3 h-3" />
                          <span>Reply to thread</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SHARING & RBAC */}
          {activeTab === 'sharing' && (
            <div className="space-y-5 max-w-3xl mx-auto">
              <div>
                <h4 className="text-sm font-bold text-white">Access Control & Sharing Permissions</h4>
                <p className="text-xs text-neutral-400">Configure role-based access for workspace members, squads, and external guest links.</p>
              </div>

              {/* Add Share Form */}
              <form onSubmit={handleAddShare} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center gap-2.5">
                <input
                  type="text"
                  required
                  value={newShareTarget}
                  onChange={(e) => setNewShareTarget(e.target.value)}
                  placeholder="Invite user email, DID, or Squad name..."
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-indigo-500 w-full"
                />
                <select
                  value={newShareRole}
                  onChange={(e) => setNewShareRole(e.target.value as WorksFileAccessRole)}
                  className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none"
                >
                  <option value="viewer">Viewer (Read-only)</option>
                  <option value="commenter">Commenter</option>
                  <option value="editor">Editor</option>
                  <option value="owner">Co-Owner</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Grant Access
                </button>
              </form>

              {/* Active Shares List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Active Grants</span>
                
                {/* Default Owner */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={file.ownerAvatar} alt={file.ownerName} className="w-8 h-8 rounded-full" />
                    <div>
                      <span className="text-xs font-bold text-white block">{file.ownerName}</span>
                      <span className="text-[10px] text-neutral-400">Author & Sovereign Custodian</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40 font-mono">
                    Owner
                  </span>
                </div>

                {file.shares.map((sh) => (
                  <div key={sh.id} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-300">
                        {sh.targetType === 'workspace_wide' ? <Users className="w-4 h-4 text-indigo-400" /> :
                         sh.targetType === 'team' ? <Users className="w-4 h-4 text-cyan-400" /> :
                         sh.targetName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{sh.targetName}</span>
                        <span className="text-[10px] text-neutral-400 capitalize">{sh.targetType.replace(/_/g, ' ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-neutral-800 text-neutral-300 capitalize font-mono">
                        {sh.role}
                      </span>
                      <button
                        onClick={() => handleRemoveShare(sh.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Revoke Permission"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: OMNI CLOUD & DECENTRALIZED PROOF */}
          {activeTab === 'cloud' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    <span>OMNI Cloud Pinning & Storage Node Mesh</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    {file.storageReplicationNodes} Active Nodes
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block mb-1">IPFS Content Identifier (CID)</span>
                    <code className="text-indigo-400 font-mono text-[11px] break-all">{file.ipfsCid || 'bafybeih...'}</code>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block mb-1">SHA-256 Checksum</span>
                    <code className="text-emerald-400 font-mono text-[11px] break-all">{file.sha256Checksum}</code>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-neutral-400">
                    <span>Decentralized Bucket:</span>
                    <span className="text-white font-medium font-mono">{file.cloudBucketId}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Encryption Enclave:</span>
                    <span className="text-cyan-400 font-mono">{file.encryptionAlgorithm || 'AES-256-GCM'}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Replication Factor:</span>
                    <span className="text-white font-medium">{file.storageReplicationNodes} Multi-Region Enclaves</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigateApp?.('cloud')}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open in OMNI Cloud Explorer</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
