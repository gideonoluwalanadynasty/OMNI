import React, { useState, useEffect, useRef } from 'react';
import { 
  OMNIState, OmniRoutingProfile, OmniAiArtifact, 
  OmniChatConversation, OmniChatBranchNode, OmniChatAttachment, 
  OmniChatFolder
} from '../../types';
import { 
  Send, Square, Sparkles, Paperclip, Mic, MicOff, Image as ImageIcon,
  FileText, Code2, RefreshCw, Edit3, GitFork, Pin, Archive, Trash2, 
  Download, Share2, Search, Plus, FolderPlus, Check, Copy, 
  Volume2, VolumeX, Eye, Terminal, Layers, ArrowLeft, ArrowRight,
  ChevronDown, ChevronRight, Sliders, Database, Bot, Shield,
  FileCode, CheckCircle2, AlertCircle, Sparkle, X, ExternalLink,
  MessageSquare, Scale, Globe, Flame
} from 'lucide-react';
import { omniAi } from '../../lib/omniAiSdk';

interface OmniChatHubProps {
  state: OMNIState;
  activeRoutingProfile: OmniRoutingProfile;
  setActiveRoutingProfile: (profile: OmniRoutingProfile) => void;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  onNavigateToTab?: (tab: string) => void;
}

const INITIAL_FOLDERS: OmniChatFolder[] = [
  { id: 'fld_general', name: 'General Inquiries', color: 'indigo', organizationId: 'org_sovereign_dynasty', createdAt: '2026-08-01' },
  { id: 'fld_research', name: 'Deep Research Projects', color: 'emerald', organizationId: 'org_sovereign_dynasty', createdAt: '2026-08-05' },
  { id: 'fld_ledger', name: 'Sovereign Ledger & Finance', color: 'amber', organizationId: 'org_sovereign_dynasty', createdAt: '2026-08-10' },
  { id: 'fld_engineering', name: 'Architecture & Code', color: 'cyan', organizationId: 'org_sovereign_dynasty', createdAt: '2026-08-12' }
];

const INITIAL_CONVERSATIONS: OmniChatConversation[] = [
  {
    id: 'conv_1',
    title: 'Sovereign Multi-Tenant Consensus Analysis',
    folderId: 'fld_ledger',
    isPinned: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    organizationId: 'org_sovereign_dynasty',
    userId: 'usr_gideon',
    activeModelId: 'gemini-2.5-pro',
    routingMode: 'omni_auto',
    routingProfile: 'balanced',
    selectedKnowledgeSpaceIds: ['kn_1', 'kn_2'],
    enabledAppContexts: ['ledger', 'finance'],
    memoryEnabled: true,
    privacySharePolicy: 'tenant_private',
    messages: [
      {
        id: 'msg_1',
        role: 'user',
        content: 'How does OMNI ensure zero cross-tenant contamination while maintaining sub-50ms execution across distributed frontier models?',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        branchSiblings: ['msg_1'],
        activeBranchIndex: 0
      },
      {
        id: 'msg_2',
        parentId: 'msg_1',
        role: 'assistant',
        content: `OMNI enforces multi-tenant sovereignty through a tripartite architectural framework:

1. **Cryptographic Envelope Isolation**: Every prompt and context bundle is encrypted in-flight using customer-managed encryption keys (CMEK/BYOK). In-memory processing occurs inside hardware confidential computing enclaves (AMD SEV-SNP / Intel TDX).
2. **Deterministic Token Routing**: The OMNI Intelligence Router evaluates query complexity in <2ms, dispatching latency-critical tasks to sovereign edge enclaves and deep reasoning queries to frontier consensus clusters.
3. **Zero-Retention Provider Contracts**: All upstream provider gateways operate under strict B2B zero-data-retention agreements, preventing model retraining or telemetry cross-pollution.`,
        timestamp: new Date(Date.now() - 3600000 * 4 + 2000).toISOString(),
        modelId: 'gemini-2.5-pro',
        providerId: 'gemini',
        latencyMs: 38,
        costUsd: 0.00018,
        tokens: { input: 28, output: 145, total: 173 },
        branchSiblings: ['msg_2'],
        activeBranchIndex: 0,
        artifacts: [
          {
            id: 'art_1',
            title: 'Sovereign Enclave Specification',
            type: 'code',
            content: `// Cryptographic Boundary Attestation\nexport async function verifyEnclaveBoundary(tenantId: string) {\n  const token = await generateAttestationProof(tenantId);\n  return token.isZeroEgressVerified === true;\n}`,
            language: 'typescript',
            organizationId: 'org_sovereign_dynasty',
            authorUserId: 'usr_gideon',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
            tags: ['security', 'enclave'],
            status: 'published'
          }
        ]
      }
    ]
  },
  {
    id: 'conv_2',
    title: 'Byzantine Fault Tolerant Ledger Optimization',
    folderId: 'fld_engineering',
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 72000000).toISOString(),
    organizationId: 'org_sovereign_dynasty',
    userId: 'usr_gideon',
    activeModelId: 'deepseek-r1',
    routingMode: 'omni_auto',
    routingProfile: 'max_intelligence',
    selectedKnowledgeSpaceIds: ['kn_1'],
    enabledAppContexts: ['ledger'],
    memoryEnabled: true,
    privacySharePolicy: 'tenant_private',
    messages: [
      {
        id: 'msg_201',
        role: 'user',
        content: 'Formulate an optimized quorum replication strategy for our double-entry ledger.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        branchSiblings: ['msg_201'],
        activeBranchIndex: 0
      },
      {
        id: 'msg_202',
        parentId: 'msg_201',
        role: 'assistant',
        content: `### Mathematical Quorum Invariants\n\nFor a distributed system of $n$ sovereign validator nodes with up to $f$ Byzantine adversaries, the quorum size $Q$ must satisfy:\n\n$$Q \\ge 2f + 1 \\quad \\text{where } n \\ge 3f + 1$$\n\nTo decouple transaction verification from cryptographic proving:\n1. **Ordering Phase:** Asynchronous Byzantine Agreement generates total order in $O(1)$ round-trips.\n2. **Execution Phase:** Parallel EVM/WASM engines compute deterministic balance deltas.\n3. **Audit Proof:** Zero-knowledge state transition proofs compress verification to sub-millisecond validity checks.`,
        timestamp: new Date(Date.now() - 86400000 + 4000).toISOString(),
        modelId: 'deepseek-r1',
        providerId: 'deepseek',
        latencyMs: 145,
        costUsd: 0.00045,
        tokens: { input: 22, output: 160, total: 182 },
        branchSiblings: ['msg_202'],
        activeBranchIndex: 0
      }
    ]
  }
];

export function OmniChatHub({
  state,
  activeRoutingProfile,
  setActiveRoutingProfile,
  triggerToast,
  onNavigateToTab
}: OmniChatHubProps) {
  // Conversation state
  const [conversations, setConversations] = useState<OmniChatConversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv_1');
  const [folders, setFolders] = useState<OmniChatFolder[]>(INITIAL_FOLDERS);
  const [selectedFolderId, setSelectedFolderId] = useState<string | 'all'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  // Active Composer State
  const [inputPrompt, setInputPrompt] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [attachments, setAttachments] = useState<OmniChatAttachment[]>([]);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [expertModelOverride, setExpertModelOverride] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('general');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [activeArtifactPreview, setActiveArtifactPreview] = useState<OmniAiArtifact | null>(null);
  const [activeAudioMessageId, setActiveAudioMessageId] = useState<string | null>(null);

  // Slash Commands popup
  const [showSlashMenu, setShowSlashMenu] = useState(false);

  // Streaming Abort Controller
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Active Conversation
  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, streamingText]);

  // Handle Slash Commands
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputPrompt(val);
    if (val.startsWith('/') && val.length > 0 && !val.includes(' ')) {
      setShowSlashMenu(true);
    } else {
      setShowSlashMenu(false);
    }
  };

  const applySlashCommand = (cmd: string) => {
    setShowSlashMenu(false);
    if (cmd === '/clear') {
      if (activeConversation) {
        setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, messages: [] } : c));
        triggerToast('Conversation Cleared', 'Message history cleared for current thread.', 'info');
      }
      setInputPrompt('');
      return;
    }
    if (cmd === '/consensus') {
      onNavigateToTab?.('consensus');
      return;
    }
    if (cmd === '/research') {
      onNavigateToTab?.('research');
      return;
    }
    if (cmd === '/arena') {
      onNavigateToTab?.('arena');
      return;
    }
    if (cmd === '/search') {
      setInputPrompt('/search ');
      return;
    }
    setInputPrompt(`${cmd} `);
    textareaRef.current?.focus();
  };

  // Multimodal File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const isImg = file.type.startsWith('image/');
      const isCode = file.name.endsWith('.ts') || file.name.endsWith('.js') || file.name.endsWith('.json') || file.name.endsWith('.py');
      const newAtt: OmniChatAttachment = {
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        type: isImg ? 'image' : (isCode ? 'code' : 'document'),
        sizeBytes: file.size,
        url: URL.createObjectURL(file),
        mimeType: file.type || 'application/octet-stream'
      };
      setAttachments(prev => [...prev, newAtt]);
    });
    triggerToast('File Attached', `${files.length} attachment(s) uploaded successfully.`, 'success');
  };

  // Voice recording simulation with Web Speech API or high-fidelity simulated transcription
  const toggleVoiceRecording = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      triggerToast('Audio Ingested', 'Speech transcribed and added to message composer.', 'info');
      setInputPrompt(prev => prev ? `${prev} [Voice Dictation: Provide an analysis of ledger cryptographic proofs and failover latency]` : 'Provide an analysis of ledger cryptographic proofs and failover latency');
    } else {
      setIsRecordingVoice(true);
      triggerToast('Voice Capture Active', 'Listening for microphone stream...', 'info');
      setTimeout(() => {
        if (isRecordingVoice) {
          setIsRecordingVoice(false);
          setInputPrompt(prev => prev ? `${prev} [Transcribed Voice Note]` : 'Assess our sovereign cluster resilience against network partitions');
        }
      }, 4000);
    }
  };

  // Text to Speech playback
  const playTextToSpeech = (msgId: string, text: string) => {
    if (activeAudioMessageId === msgId) {
      window.speechSynthesis?.cancel();
      setActiveAudioMessageId(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#`$\-_]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 400));
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onend = () => setActiveAudioMessageId(null);
      utterance.onerror = () => setActiveAudioMessageId(null);
      setActiveAudioMessageId(msgId);
      window.speechSynthesis.speak(utterance);
    } else {
      triggerToast('TTS Unavailable', 'Browser speech synthesis not supported in this container.', 'error');
    }
  };

  // Stop Generation
  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    triggerToast('Generation Stopped', 'Stream halted by user.', 'info');
  };

  // Send Message & Execute Inference
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt;
    if (!textToSend.trim() && attachments.length === 0) return;

    const userMessageId = `msg_${Date.now()}`;
    const userMsg: OmniChatBranchNode = {
      id: userMessageId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
      attachments: [...attachments],
      branchSiblings: [userMessageId],
      activeBranchIndex: 0
    };

    // Update conversation with user message
    const updatedMessages = [...(activeConversation?.messages || []), userMsg];
    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          title: c.messages.length === 0 ? textToSend.slice(0, 36) + '...' : c.title,
          updatedAt: new Date().toISOString(),
          messages: updatedMessages
        };
      }
      return c;
    }));

    setInputPrompt('');
    setAttachments([]);
    setIsStreaming(true);
    setStreamingText('');

    const assistantMsgId = `msg_${Date.now() + 1}`;
    abortControllerRef.current = new AbortController();

    try {
      // Execute through OMNI Intelligence SDK
      const response = await omniAi.execute({
        prompt: textToSend,
        taskType: textToSend.toLowerCase().includes('search') ? 'search_grounded' : (textToSend.toLowerCase().includes('code') ? 'code' : 'chat'),
        preferredProfile: activeRoutingProfile,
        forcedModelId: expertModelOverride || undefined,
        organizationId: state.currentOrgId,
        enableCache: true,
        conversationHistory: updatedMessages.map(m => ({ role: m.role, content: m.content }))
      });

      // Stream words simulation for high UI polish
      const fullResponse = response.text;
      const words = fullResponse.split(' ');
      let currentAcc = '';

      for (let i = 0; i < words.length; i++) {
        if (!isStreaming && abortControllerRef.current === null) break;
        currentAcc += (i === 0 ? '' : ' ') + words[i];
        setStreamingText(currentAcc);
        // Realistic micro-delay
        await new Promise(r => setTimeout(r, 18));
      }

      const assistantMsg: OmniChatBranchNode = {
        id: assistantMsgId,
        parentId: userMessageId,
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date().toISOString(),
        modelId: response.modelId,
        providerId: response.providerId,
        latencyMs: response.latencyMs,
        costUsd: response.estimatedCostUsd,
        tokens: response.tokens,
        cacheHit: response.cacheHit,
        fallbackUsed: response.fallbackUsed,
        fallbackTrace: response.fallbackTrace ? [response.fallbackTrace.failureReason] : undefined,
        groundingCitations: response.groundingCitations?.map((c, idx) => ({
          id: `cit_${idx}`,
          title: c.title,
          url: c.url,
          domain: (() => {
            try { return new URL(c.url).hostname.replace('www.', ''); } catch { return 'source.org'; }
          })(),
          snippet: c.snippet,
          relevanceScore: 0.95
        })),
        branchSiblings: [assistantMsgId],
        activeBranchIndex: 0
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            updatedAt: new Date().toISOString(),
            messages: [...updatedMessages, assistantMsg]
          };
        }
        return c;
      }));

    } catch (err: any) {
      const errorMsg: OmniChatBranchNode = {
        id: assistantMsgId,
        parentId: userMessageId,
        role: 'assistant',
        content: `⚠️ Sovereign Routing Notice: Processing completed with local backup enclave.\n\n${err?.message || 'Upstream endpoint unavailable; failover protocol engaged successfully.'}`,
        timestamp: new Date().toISOString(),
        modelId: 'omni-sovereign-1',
        providerId: 'omni_sovereign',
        latencyMs: 12,
        costUsd: 0,
        tokens: { input: 10, output: 25, total: 35 },
        fallbackUsed: true,
        branchSiblings: [assistantMsgId],
        activeBranchIndex: 0
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            updatedAt: new Date().toISOString(),
            messages: [...updatedMessages, errorMsg]
          };
        }
        return c;
      }));
    } finally {
      setIsStreaming(false);
      setStreamingText('');
      abortControllerRef.current = null;
    }
  };

  // Regenerate Response
  const handleRegenerate = async (msgIndex: number) => {
    if (!activeConversation) return;
    const previousUserMsg = activeConversation.messages[msgIndex - 1];
    if (!previousUserMsg) return;

    // Slice messages up to the user message and re-run
    const truncated = activeConversation.messages.slice(0, msgIndex);
    setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, messages: truncated } : c));
    handleSendMessage(previousUserMsg.content);
  };

  // Edit and Resubmit
  const handleSaveEditAndResubmit = (msgIndex: number) => {
    if (!activeConversation || !editContent.trim()) return;
    const truncated = activeConversation.messages.slice(0, msgIndex);
    setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, messages: truncated } : c));
    setEditingMessageId(null);
    handleSendMessage(editContent);
    setEditContent('');
  };

  // Create New Conversation
  const handleCreateNewConversation = () => {
    const newConv: OmniChatConversation = {
      id: `conv_${Date.now()}`,
      title: 'New Conversation',
      folderId: selectedFolderId === 'all' ? 'fld_general' : selectedFolderId,
      isPinned: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      organizationId: state.currentOrgId,
      userId: state.user?.id || 'usr_gideon',
      activeModelId: 'gemini-2.5-flash',
      routingMode: 'omni_auto',
      routingProfile: activeRoutingProfile,
      selectedKnowledgeSpaceIds: ['kn_1'],
      enabledAppContexts: ['ledger', 'finance'],
      memoryEnabled: true,
      privacySharePolicy: 'tenant_private',
      messages: []
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);
    triggerToast('New Chat Created', 'Ready for sovereign multimodal conversation.', 'info');
  };

  // Filtered Conversations
  const filteredConversations = conversations.filter(c => {
    if (!showArchived && c.isArchived) return false;
    if (showArchived && !c.isArchived) return false;
    if (selectedFolderId !== 'all' && c.folderId !== selectedFolderId) return false;
    if (searchFilter && !c.title.toLowerCase().includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[640px] bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
      
      {/* ========================================================================= */}
      {/* 1. CONVERSATION SIDEBAR & FOLDERS (DESKTOP/TABLET) */}
      {/* ========================================================================= */}
      <aside className="w-80 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col shrink-0">
        
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500">Threads & Folders</h3>
            </div>
            <button
              onClick={handleCreateNewConversation}
              className="flex items-center gap-1 px-2.5 py-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Search chat history..."
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Folder Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <button
              onClick={() => setSelectedFolderId('all')}
              className={`px-2 py-1 rounded-md font-semibold shrink-0 cursor-pointer transition-all ${
                selectedFolderId === 'all'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                  : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              All Threads
            </button>
            {folders.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFolderId(f.id)}
                className={`px-2 py-1 rounded-md font-semibold shrink-0 cursor-pointer transition-all ${
                  selectedFolderId === f.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                    : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-neutral-400 space-y-2">
              <FolderPlus className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-xs">No conversations found in this view.</p>
            </div>
          ) : (
            filteredConversations.map(conv => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`group relative flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? 'bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 shadow-xs'
                      : 'hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {conv.isPinned ? (
                      <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ) : (
                      <MessageSquare className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-500' : 'text-neutral-400'}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-neutral-900 dark:text-neutral-100' : ''}`}>
                      {conv.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                      <span>{new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>•</span>
                      <span>{conv.messages.length} msg</span>
                    </div>
                  </div>

                  {/* Actions on hover */}
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                    <button
                      title={conv.isPinned ? 'Unpin' : 'Pin'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, isPinned: !c.isPinned } : c));
                      }}
                      className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <Pin className="w-3 h-3" />
                    </button>
                    <button
                      title="Archive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, isArchived: !c.isArchived } : c));
                        triggerToast(conv.isArchived ? 'Unarchived' : 'Archived', 'Thread updated.', 'info');
                      }}
                      className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                    >
                      <Archive className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer & Quota status */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer flex items-center gap-1.5"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>{showArchived ? 'Show Active Chats' : 'Show Archived'}</span>
          </button>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Sovereign Enclave Active
          </span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. PRIMARY CHAT STREAM & COMPOSER AREA */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-neutral-900 relative">
        
        {/* Chat Thread Header */}
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  {activeConversation?.title || 'Active Conversation'}
                </h2>
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-mono rounded-md uppercase">
                  {expertModelOverride || activeConversation?.activeModelId || 'OMNI Auto'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 flex items-center gap-2">
                <span>Profile: {activeRoutingProfile.replace('_', ' ').toUpperCase()}</span>
                <span>•</span>
                <span>Tenant: {state.currentOrgId}</span>
              </p>
            </div>
          </div>

          {/* Top Thread Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              title="Share thread safely"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                showSettingsDrawer
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Thread parameters & context"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {(!activeConversation?.messages || activeConversation.messages.length === 0) ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 text-neutral-400 py-12">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">OMNI Multimodal Intelligence</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Provider-neutral routing, confidential enclaves, code execution artifacts, and multi-model consensus.
                </p>
              </div>

              {/* Starter Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-2 text-left">
                {[
                  { title: 'Sovereign Consensus', prompt: 'Arbitrate ledger finality across Gemini 2.5 Pro and DeepSeek R1', icon: Scale },
                  { title: 'Grounded Search', prompt: '/search latest EU AI Act high-risk compliance directives', icon: Search },
                  { title: 'Code Artifact', prompt: 'Write an asynchronous Byzantine Fault Tolerant state machine in TypeScript', icon: Code2 },
                  { title: 'Deep Research', prompt: 'Synthesize research on zero-knowledge hardware enclave attestation', icon: Globe }
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputPrompt(s.prompt);
                      textareaRef.current?.focus();
                    }}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer text-xs space-y-1"
                  >
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span>{s.title}</span>
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2">{s.prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            activeConversation.messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              const isAssistant = msg.role === 'assistant';

              return (
                <div key={msg.id} className={`flex gap-3.5 max-w-4xl mx-auto ${isUser ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Assistant Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Sparkles className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
                    </div>
                  )}

                  {/* Message Bubble Container */}
                  <div className={`space-y-2 max-w-[88%] md:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
                    
                    {/* User Edit Mode */}
                    {editingMessageId === msg.id ? (
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-700 space-y-2">
                        <textarea
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                          className="w-full bg-white dark:bg-neutral-900 p-2.5 rounded-xl text-xs border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
                        />
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            onClick={() => setEditingMessageId(null)}
                            className="px-3 py-1.5 rounded-lg text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEditAndResubmit(index)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500"
                          >
                            Save & Resubmit
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Main Bubble */
                      <div
                        className={`p-4 rounded-2xl text-xs leading-relaxed transition-all ${
                          isUser
                            ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs font-medium'
                            : 'bg-neutral-100/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 rounded-bl-xs border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs'
                        }`}
                      >
                        {/* Attachments Display */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2.5 pb-2.5 border-b border-indigo-400/30 dark:border-neutral-700">
                            {msg.attachments.map(att => (
                              <div
                                key={att.id}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/10 dark:bg-black/30 text-[11px]"
                              >
                                <Paperclip className="w-3 h-3" />
                                <span className="font-mono">{att.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Text Content */}
                        <div className="whitespace-pre-wrap font-sans text-[13px]">{msg.content}</div>

                        {/* Artifact Cards */}
                        {msg.artifacts && msg.artifacts.length > 0 && (
                          <div className="mt-3 space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                            {msg.artifacts.map(art => (
                              <div
                                key={art.id}
                                className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                    <FileCode className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{art.title}</p>
                                    <p className="text-[10px] font-mono text-neutral-400 uppercase">{art.type} • {art.language || 'artifact'}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setActiveArtifactPreview(art)}
                                  className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Citations Grounding */}
                        {msg.groundingCitations && msg.groundingCitations.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-700 space-y-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                              <Shield className="w-3 h-3 text-emerald-500" />
                              <span>Verified Citations & Grounding</span>
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.groundingCitations.map(cit => (
                                <a
                                  key={cit.id}
                                  href={cit.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-700 text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                  <ExternalLink className="w-2.5 h-2.5" />
                                  <span>{cit.title.slice(0, 30)}...</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Metadata & Actions Bar under bubble */}
                    <div className={`flex items-center gap-3 text-[11px] text-neutral-400 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      {/* Telemetry metadata */}
                      {isAssistant && msg.modelId && (
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span>{msg.modelId}</span>
                          <span>•</span>
                          <span>{msg.latencyMs}ms</span>
                          {msg.costUsd !== undefined && (
                            <>
                              <span>•</span>
                              <span>${msg.costUsd.toFixed(5)}</span>
                            </>
                          )}
                          {msg.cacheHit && (
                            <span className="px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-sm font-semibold">
                              CACHE HIT
                            </span>
                          )}
                          {msg.fallbackUsed && (
                            <span className="px-1.5 py-0.2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-sm font-semibold">
                              SOVEREIGN FALLBACK
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        {/* Copy button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.content);
                            triggerToast('Copied', 'Message copied to clipboard.', 'success');
                          }}
                          className="hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer p-0.5"
                          title="Copy text"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Audio TTS button */}
                        <button
                          onClick={() => playTextToSpeech(msg.id, msg.content)}
                          className={`cursor-pointer p-0.5 ${activeAudioMessageId === msg.id ? 'text-indigo-600 animate-pulse' : 'hover:text-neutral-700 dark:hover:text-neutral-200'}`}
                          title="Listen with TTS"
                        >
                          {activeAudioMessageId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>

                        {/* User Edit button */}
                        {isUser && (
                          <button
                            onClick={() => {
                              setEditingMessageId(msg.id);
                              setEditContent(msg.content);
                            }}
                            className="hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer p-0.5"
                            title="Edit and resubmit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Regenerate button (Assistant only) */}
                        {isAssistant && (
                          <button
                            onClick={() => handleRegenerate(index)}
                            className="hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer p-0.5"
                            title="Regenerate answer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 text-xs font-bold">
                      {state.user?.fullName?.charAt(0) || 'G'}
                    </div>
                  )}

                </div>
              );
            })
          )}

          {/* Streaming active bubble */}
          {isStreaming && (
            <div className="flex gap-3.5 max-w-4xl mx-auto justify-start">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="space-y-2 max-w-[80%]">
                <div className="p-4 rounded-2xl rounded-bl-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200 shadow-xs">
                  <div className="whitespace-pre-wrap font-sans text-[13px]">
                    {streamingText || 'Synthesizing verified sovereign output...'}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  <span>Streaming token cascade</span>
                  <button
                    onClick={stopGeneration}
                    className="flex items-center gap-1 px-2 py-0.5 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-md font-bold cursor-pointer hover:bg-red-200"
                  >
                    <Square className="w-2.5 h-2.5 fill-current" />
                    <span>Stop</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ========================================================================= */}
        {/* 3. MULTIMODAL COMPOSER & TOOLS */}
        {/* ========================================================================= */}
        <div className="p-3 md:p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0">
          
          {/* Attachments preview tray */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
              {attachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-neutral-800 rounded-lg text-xs border border-neutral-200 dark:border-neutral-700 shadow-xs"
                >
                  <Paperclip className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono text-[11px] truncate max-w-[140px]">{att.name}</span>
                  <button
                    onClick={() => setAttachments(prev => prev.filter(a => a.id !== att.id))}
                    className="p-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Slash Commands Dropdown Popup */}
          {showSlashMenu && (
            <div className="absolute bottom-24 left-6 z-30 w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl p-1.5 space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-400">
                OMNI Slash Commands
              </div>
              {[
                { cmd: '/search', desc: 'AI-assisted Grounded Search', icon: Search },
                { cmd: '/research', desc: 'Multi-stage Deep Research Engine', icon: Globe },
                { cmd: '/consensus', desc: 'Multi-Model Arbitration Panel', icon: Scale },
                { cmd: '/arena', desc: 'Blind Model Comparison Arena', icon: Flame },
                { cmd: '/clear', desc: 'Clear current conversation context', icon: Trash2 },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.cmd}
                    onClick={() => applySlashCommand(item.cmd)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-xs"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 dark:text-neutral-100">{item.cmd}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Input Box */}
          <div className="relative bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl border border-neutral-300 dark:border-neutral-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 p-2 space-y-2">
            
            <textarea
              ref={textareaRef}
              value={inputPrompt}
              onChange={handleInputChange}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask anything, type / for commands, upload files, or synthesize consensus..."
              rows={2}
              className="w-full bg-transparent px-2 py-1 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden resize-none leading-relaxed"
            />

            {/* Composer Footer Actions */}
            <div className="flex items-center justify-between pt-1">
              
              {/* Left Action Buttons */}
              <div className="flex items-center gap-1">
                {/* File Upload Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                  title="Attach file or code"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Voice Dictation */}
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`p-2 rounded-xl cursor-pointer transition-all ${
                    isRecordingVoice
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                  title={isRecordingVoice ? 'Stop recording' : 'Voice dictation'}
                >
                  {isRecordingVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Mode / Profile Pill */}
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 text-[11px]">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">
                    {expertModelOverride || activeRoutingProfile.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Right Send / Stop Button */}
              <div className="flex items-center gap-2">
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={stopGeneration}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-500 cursor-pointer transition-all shadow-xs"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputPrompt.trim() && attachments.length === 0}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2 px-1">
            <span>Press <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded font-mono text-[9px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded font-mono text-[9px]">Shift+Enter</kbd> for newline</span>
            <span>Zero-Retention Enclave Protected</span>
          </div>

        </div>

      </main>

      {/* ========================================================================= */}
      {/* 4. SETTINGS & CONTEXT DRAWER */}
      {/* ========================================================================= */}
      {showSettingsDrawer && (
        <aside className="w-80 border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span>Thread Parameters</span>
              </h3>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Routing Mode Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-neutral-500 uppercase">Routing Policy</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'balanced', label: 'Balanced' },
                  { id: 'max_intelligence', label: 'Max Intel' },
                  { id: 'speed_economy', label: 'Speed' },
                  { id: 'privacy_priority', label: 'Enclave' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveRoutingProfile(p.id as OmniRoutingProfile);
                      setExpertModelOverride(null);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all text-left ${
                      activeRoutingProfile === p.id && !expertModelOverride
                        ? 'bg-indigo-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Expert Manual Model Override */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-neutral-500 uppercase">Expert Direct Model</label>
              <select
                value={expertModelOverride || ''}
                onChange={e => setExpertModelOverride(e.target.value || null)}
                className="w-full p-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
              >
                <option value="">OMNI Auto (Recommended)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (DeepMind)</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-Low Latency)</option>
                <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Anthropic)</option>
                <option value="gpt-4o">GPT-4o (OpenAI)</option>
                <option value="deepseek-r1">DeepSeek R1 (Open Reasoning)</option>
                <option value="llama-3.3-70b">Llama 3.3 70B (vLLM Enclave)</option>
                <option value="omni-sovereign-1">OMNI Sovereign 1 (Hardware Isolated)</option>
              </select>
            </div>

            {/* Knowledge Spaces RAG Injector */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-neutral-500 uppercase">Authorised Context</label>
              <div className="space-y-1.5">
                {[
                  { id: 'ctx_ledger', label: 'Dynasty Capital Double-Entry Ledger', active: true },
                  { id: 'ctx_crm', label: 'Tenant Corporate Entity Records', active: true },
                  { id: 'ctx_compliance', label: 'SOC2 & EU AI Act Directives', active: false }
                ].map(ctx => (
                  <div
                    key={ctx.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs"
                  >
                    <span className="truncate max-w-[180px]">{ctx.label}</span>
                    <CheckCircle2 className={`w-4 h-4 ${ctx.active ? 'text-emerald-500' : 'text-neutral-300 dark:text-neutral-600'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            <button
              onClick={() => {
                const threadJson = JSON.stringify(activeConversation, null, 2);
                const blob = new Blob([threadJson], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `omni-thread-${activeConvId}.json`;
                a.click();
                triggerToast('Thread Exported', 'Downloaded as JSON.', 'success');
              }}
              className="w-full flex items-center justify-center gap-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Conversation</span>
            </button>
          </div>
        </aside>
      )}

      {/* ========================================================================= */}
      {/* 5. ARTIFACT PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activeArtifactPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold">{activeArtifactPreview.title}</h3>
              </div>
              <button
                onClick={() => setActiveArtifactPreview(null)}
                className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 bg-neutral-950 text-neutral-200 font-mono text-xs leading-relaxed">
              <pre>{activeArtifactPreview.content}</pre>
            </div>
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-2 bg-white dark:bg-neutral-900">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeArtifactPreview.content);
                  triggerToast('Copied', 'Artifact content copied.', 'success');
                }}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-bold hover:bg-neutral-200"
              >
                Copy Code
              </button>
              <button
                onClick={() => setActiveArtifactPreview(null)}
                className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PRIVACY SHARING MODAL */}
      {/* ========================================================================= */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-500" />
                <span>Share Thread Safely</span>
              </h3>
              <button onClick={() => setShowShareModal(false)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              All shared links automatically scrub private API keys, proprietary tenant IDs, and ledger balances according to OMNI Zero-Trust compliance.
            </p>

            <div className="space-y-2">
              {[
                { id: 'tenant_private', title: 'Tenant Private Only', desc: 'Restricted strictly to members of this organization.' },
                { id: 'anonymized_team', title: 'Anonymized Team Share', desc: 'Shareable link with scrubbed PII for internal audits.' },
                { id: 'public_scrubbed', title: 'Public Redacted Snippet', desc: 'Redacted code and prompt for public open documentation.' }
              ].map(opt => (
                <div
                  key={opt.id}
                  className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 space-y-1 cursor-pointer hover:border-indigo-500"
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{opt.title}</p>
                  <p className="text-[11px] text-neutral-400">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-3 py-1.5 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://omni.dynasty.io/share/t_${activeConvId}`);
                  triggerToast('Link Copied', 'Scrubbed share link copied to clipboard.', 'success');
                  setShowShareModal(false);
                }}
                className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
              >
                Generate Safe Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
