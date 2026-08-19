import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  ShoppingBag,
  Share2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Compass,
  FileText,
  Copy,
  Check,
  Send,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingDown,
  Layers,
  Award,
  RefreshCw,
  X,
  MessageSquare,
  HelpCircle,
  Video,
  Mail,
  Plus
} from 'lucide-react';
import {
  OmniBrowserTab,
  OmniBrowserAssistantSubMode,
  OmniBrowserPageSummary,
  OmniBrowserComparisonMatrix,
  OmniBrowserResearchReport,
  OmniBrowserShoppingAnalysis,
  OmniBrowserContentCreationResult,
  OmniBrowserVoiceState,
  OmniBrowserAiMessage
} from '../../../types';
import { browserAiAssistantService } from '../../../sdk/browser-services/OmniBrowserAiAssistantService';

interface OmniBrowserAiAssistantPanelProps {
  activeTab: OmniBrowserTab;
  allTabs: OmniBrowserTab[];
  isOpen: boolean;
  onClose: () => void;
  initialSubMode?: OmniBrowserAssistantSubMode;
  onNavigateUrl?: (url: string) => void;
  onExportToDocs?: (title: string, markdown: string) => void;
}

export const OmniBrowserAiAssistantPanel: React.FC<OmniBrowserAiAssistantPanelProps> = ({
  activeTab,
  allTabs,
  isOpen,
  onClose,
  initialSubMode = 'page_understanding',
  onNavigateUrl,
  onExportToDocs
}) => {
  const [subMode, setSubMode] = useState<OmniBrowserAssistantSubMode>(initialSubMode);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1. Page Understanding State
  const [pageSummary, setPageSummary] = useState<OmniBrowserPageSummary | null>(null);
  const [comprehensionLevel, setComprehensionLevel] = useState<'executive' | 'intermediate' | 'deepTechnical'>('executive');
  const [userQuestion, setUserQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<OmniBrowserAiMessage[]>([
    {
      id: 'msg_init',
      sender: 'omni_ai',
      text: `Hello! I am your OMNI Browser Assistant. I have analyzed "${activeTab.title}". Ask me anything about this page, initiate deep research, analyze shopping products, or generate social content.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // 2. Comparison State
  const [comparisonTargetTabId, setComparisonTargetTabId] = useState<string>(
    allTabs.find(t => t.id !== activeTab.id)?.id || ''
  );
  const [comparisonMatrix, setComparisonMatrix] = useState<OmniBrowserComparisonMatrix | null>(null);

  // 3. Research Mode State
  const [researchTopic, setResearchTopic] = useState<string>(activeTab.title || 'Sovereign Edge Computing');
  const [researchDepth, setResearchDepth] = useState<'standard' | 'deep' | 'exhaustive'>('deep');
  const [researchReport, setResearchReport] = useState<OmniBrowserResearchReport | null>(null);

  // 4. Shopping Intelligence State
  const [shoppingAnalysis, setShoppingAnalysis] = useState<OmniBrowserShoppingAnalysis | null>(null);
  const [purchasePasskey, setPurchasePasskey] = useState('');
  const [showPurchaseConfirmModal, setShowPurchaseConfirmModal] = useState(false);

  // 5. Content Creation State
  const [contentTargetFormat, setContentTargetFormat] = useState<'social_posts' | 'newsletter' | 'blog' | 'video_script' | 'presentation'>('social_posts');
  const [contentCreationResult, setContentCreationResult] = useState<OmniBrowserContentCreationResult | null>(null);
  const [sentToCreateSuccess, setSentToCreateSuccess] = useState(false);

  // 6. Voice Assistant State
  const [voiceState, setVoiceState] = useState<OmniBrowserVoiceState>(browserAiAssistantService.getVoiceState());

  useEffect(() => {
    if (initialSubMode) {
      setSubMode(initialSubMode);
    }
  }, [initialSubMode]);

  // Load summary when tab or mode changes
  useEffect(() => {
    if (isOpen && activeTab) {
      loadPageSummary();
    }
  }, [activeTab?.id, isOpen]);

  const loadPageSummary = async () => {
    setLoading(true);
    try {
      const summary = await browserAiAssistantService.summarizePage(activeTab);
      setPageSummary(summary);
    } finally {
      setLoading(false);
    }
  };

  const handleRunComparison = async () => {
    const targetTab = allTabs.find(t => t.id === comparisonTargetTabId);
    if (!targetTab) return;
    setLoading(true);
    try {
      const matrix = await browserAiAssistantService.compareWebsites(activeTab, targetTab);
      setComparisonMatrix(matrix);
    } finally {
      setLoading(false);
    }
  };

  const handleRunResearch = async () => {
    if (!researchTopic.trim()) return;
    setLoading(true);
    try {
      const report = await browserAiAssistantService.startResearch(researchTopic, researchDepth);
      setResearchReport(report);
    } finally {
      setLoading(false);
    }
  };

  const handleRunShoppingAnalysis = async () => {
    setLoading(true);
    try {
      const analysis = await browserAiAssistantService.analyzeProduct(activeTab);
      setShoppingAnalysis(analysis);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPurchase = () => {
    if (!shoppingAnalysis) return;
    const token = purchasePasskey || `passkey_token_${Date.now()}`;
    const updated = browserAiAssistantService.confirmPurchase(shoppingAnalysis, token);
    setShoppingAnalysis(updated);
    setShowPurchaseConfirmModal(false);
  };

  const handleDeclinePurchase = () => {
    if (!shoppingAnalysis) return;
    const updated = browserAiAssistantService.declinePurchase(shoppingAnalysis);
    setShoppingAnalysis(updated);
    setShowPurchaseConfirmModal(false);
  };

  const handleGenerateContent = async (format: 'social_posts' | 'newsletter' | 'blog' | 'video_script' | 'presentation') => {
    setContentTargetFormat(format);
    setLoading(true);
    setSentToCreateSuccess(false);
    try {
      const result = await browserAiAssistantService.createContentFromPage(activeTab, format);
      setContentCreationResult(result);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToOmniCreate = () => {
    if (!contentCreationResult) return;
    browserAiAssistantService.sendToOmniAiCreate(contentCreationResult);
    setSentToCreateSuccess(true);
  };

  const handleSendChatQuestion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userQuestion.trim()) return;

    const userMsg: OmniBrowserAiMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: userQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const q = userQuestion;
    setUserQuestion('');
    setLoading(true);

    try {
      const answer = await browserAiAssistantService.answerPageQuestion(activeTab, q);
      const aiMsg: OmniBrowserAiMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'omni_ai',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourcesCited: [{ title: activeTab.title, url: activeTab.url }]
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVoice = () => {
    if (voiceState.isListening) {
      browserAiAssistantService.stopListening();
      setVoiceState({ ...browserAiAssistantService.getVoiceState() });
    } else {
      browserAiAssistantService.startListening(transcript => {
        setUserQuestion(transcript);
        setVoiceState({ ...browserAiAssistantService.getVoiceState(), transcript });
      });
      setVoiceState({ ...browserAiAssistantService.getVoiceState() });
    }
  };

  const handleSpeakSummary = () => {
    if (voiceState.isSpeaking) {
      browserAiAssistantService.stopSpeaking();
      setVoiceState({ ...browserAiAssistantService.getVoiceState() });
    } else {
      const textToSpeak = pageSummary?.executiveSummary || `Summary of ${activeTab.title}`;
      browserAiAssistantService.speakText(textToSpeak, () => {
        setVoiceState({ ...browserAiAssistantService.getVoiceState() });
      });
      setVoiceState({ ...browserAiAssistantService.getVoiceState() });
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="omni_browser_ai_panel"
      className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[540px] bg-slate-900/98 backdrop-blur-xl border-l border-slate-700/80 text-slate-100 flex flex-col z-50 shadow-2xl transition-all animate-in slide-in-from-right duration-200"
    >
      {/* 1. Header & Navigation Sub-Tabs */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">OMNI Browser Assistant</h2>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                Sovereign AI
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[280px]">
              Active Page: {activeTab.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            id="btn_voice_quick_toggle"
            onClick={handleSpeakSummary}
            title={voiceState.isSpeaking ? 'Stop neural speech' : 'Read executive summary aloud'}
            className={`p-2 rounded-lg transition-colors ${
              voiceState.isSpeaking
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {voiceState.isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            id="btn_close_ai_panel"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Submode Selector Pill Bar */}
      <div className="px-3 py-2 border-b border-slate-800 bg-slate-900/90 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        <button
          id="tab_mode_page_understanding"
          onClick={() => setSubMode('page_understanding')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
            subMode === 'page_understanding'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Page Understanding
        </button>
        <button
          id="tab_mode_research"
          onClick={() => {
            setSubMode('research');
            if (!researchReport) handleRunResearch();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
            subMode === 'research'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Research Mode
        </button>
        <button
          id="tab_mode_shopping"
          onClick={() => {
            setSubMode('shopping');
            if (!shoppingAnalysis) handleRunShoppingAnalysis();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
            subMode === 'shopping'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Shopping Intel
        </button>
        <button
          id="tab_mode_create"
          onClick={() => {
            setSubMode('content_create');
            if (!contentCreationResult) handleGenerateContent('social_posts');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
            subMode === 'content_create'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          Create Studio
        </button>
        <button
          id="tab_mode_voice"
          onClick={() => setSubMode('voice')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
            subMode === 'voice'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          Voice & Audio
        </button>
      </div>

      {/* Main Body Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-300 scrollbar-thin scrollbar-thumb-slate-700">
        {loading && (
          <div className="flex items-center justify-center py-8 gap-3 text-indigo-400 animate-pulse">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">OMNI Sovereign AI is processing page context...</span>
            {/* Quick Link to OMNI Market */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold">Explore OMNI Market</span>
              </div>
              <button
                onClick={() => {
                  if (activeTab) {
                    // Navigate tab to marketplace
                    const newUrl = 'https://market.omni.com';
                    window.dispatchEvent(new CustomEvent('omni-navigate-url', { detail: { url: newUrl } }));
                  }
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
              >
                Open Market →
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBMODE 1: PAGE UNDERSTANDING */}
        {/* ------------------------------------------------------------- */}
        {subMode === 'page_understanding' && pageSummary && (
          <div className="space-y-4">
            {/* Comprehension Level Switcher */}
            <div className="p-1 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
              {(['executive', 'intermediate', 'deepTechnical'] as const).map(lvl => (
                <button
                  key={lvl}
                  id={`btn_comp_level_${lvl}`}
                  onClick={() => setComprehensionLevel(lvl)}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg capitalize transition-all ${
                    comprehensionLevel === lvl
                      ? 'bg-slate-800 text-white font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl === 'deepTechnical' ? 'Deep Technical' : lvl}
                </button>
              ))}
            </div>

            {/* Executive Summary Card */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {comprehensionLevel === 'executive'
                    ? 'Executive Summary'
                    : comprehensionLevel === 'intermediate'
                    ? 'Intermediate Conceptual Breakdown'
                    : 'Deep Technical Architecture'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{pageSummary.readingTimeMinutes} min read</span>
                  <button
                    onClick={() => copyToClipboard(pageSummary.comprehensionLevels[comprehensionLevel], 'summary')}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Copy summary"
                  >
                    {copiedKey === 'summary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {pageSummary.comprehensionLevels[comprehensionLevel]}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Key Takeaways
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {pageSummary.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extracted Entities & Data Points */}
            {pageSummary.extractedEntities.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Extracted Entities & Metrics
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {pageSummary.extractedEntities.map((ent, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <strong>{ent.name}</strong>
                      <span className="text-[10px] text-slate-400">({ent.category})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-Tab Comparison Launcher */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  Compare This Page With Open Tab
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  id="select_comparison_target_tab"
                  value={comparisonTargetTabId}
                  onChange={e => setComparisonTargetTabId(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {allTabs.map(t => (
                    <option key={t.id} value={t.id} disabled={t.id === activeTab.id}>
                      {t.title} {t.id === activeTab.id ? '(Active)' : ''}
                    </option>
                  ))}
                </select>
                <button
                  id="btn_trigger_tab_comparison"
                  onClick={handleRunComparison}
                  className="px-3 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  Compare
                </button>
              </div>

              {comparisonMatrix && (
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{comparisonMatrix.topic}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded">
                      Recommended: {comparisonMatrix.recommendedChoice}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">{comparisonMatrix.aiVerdict}</p>
                  <div className="space-y-1 pt-1 border-t border-slate-800 text-[11px]">
                    {comparisonMatrix.featureMatrix.map((f, i) => (
                      <div key={i} className="flex items-center justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">{f.feature}</span>
                        <span className="font-medium text-emerald-400">{f.itemAValue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Items */}
            {pageSummary.actionItems.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  Generated Action Items & Next Steps
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {pageSummary.actionItems.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <input type="checkbox" className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBMODE 2: RESEARCH MODE */}
        {/* ------------------------------------------------------------- */}
        {subMode === 'research' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  OMNI Deep Research Engine
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Multi-Source Consensus
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-medium">Research Topic or Query</label>
                <div className="flex gap-2">
                  <input
                    id="input_research_topic"
                    type="text"
                    value={researchTopic}
                    onChange={e => setResearchTopic(e.target.value)}
                    placeholder="Enter topic to research..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                  <select
                    id="select_research_depth"
                    value={researchDepth}
                    onChange={e => setResearchDepth(e.target.value as any)}
                    className="px-2 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200"
                  >
                    <option value="standard">Standard</option>
                    <option value="deep">Deep</option>
                    <option value="exhaustive">Exhaustive</option>
                  </select>
                  <button
                    id="btn_run_research"
                    onClick={handleRunResearch}
                    className="px-4 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                  >
                    Research
                  </button>
                </div>
              </div>
            </div>

            {researchReport && (
              <div className="space-y-3">
                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-white">Synthesized Findings</h3>
                    <button
                      id="btn_export_research_docs"
                      onClick={() => onExportToDocs?.(researchReport.topic, researchReport.executiveSummary)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Export to OMNI Docs
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{researchReport.executiveSummary}</p>
                </div>

                {/* Consensus Matrix */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Consensus & Controversy Matrix
                  </h3>
                  <div className="space-y-2">
                    {researchReport.consensusMatrix.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">{item.claim}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              item.level === 'broad_consensus'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : item.level === 'emerging_agreement'
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {item.level.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{item.summary}</p>
                        <div className="text-[10px] text-slate-500 flex gap-3 pt-1">
                          <span>Supporting Sources: {item.supportingSourcesCount}</span>
                          <span>Opposing: {item.opposingSourcesCount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources Gathered */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Gathered Authorised Sources ({researchReport.sourcesGathered.length})
                  </h3>
                  <div className="space-y-1.5">
                    {researchReport.sourcesGathered.map(src => (
                      <div key={src.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-indigo-300">{src.title}</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                              {src.credentialTier.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 italic mt-0.5">"{src.keyQuote}"</p>
                          <span className="text-[10px] text-slate-500">{src.authorOrOrg} • {src.domain}</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">{src.relevanceScore}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBMODE 3: SHOPPING INTELLIGENCE */}
        {/* ------------------------------------------------------------- */}
        {subMode === 'shopping' && (
          <div className="space-y-4">
            {shoppingAnalysis ? (
              <div className="space-y-3">
                {/* Product Card */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {shoppingAnalysis.dealRating.replace('_', ' ')}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5">{shoppingAnalysis.productName}</h3>
                      <p className="text-xs text-slate-400">{shoppingAnalysis.sellerName} • Trust: {shoppingAnalysis.sellerTrustScore}%</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-white">
                        ${shoppingAnalysis.currentPrice.toFixed(2)}
                      </div>
                      {shoppingAnalysis.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          ${shoppingAnalysis.originalPrice.toFixed(2)} (-{shoppingAnalysis.discountPercentage}%)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buying Verdict */}
                  <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                    <strong>AI Verdict:</strong> {shoppingAnalysis.buyingVerdict}
                  </div>
                </div>

                {/* Review Authenticity & Sentiment */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Review Intelligence & Bot Detection</span>
                    <span className="text-emerald-400 font-bold">{shoppingAnalysis.reviewIntelligence.authenticityScore}% Authentic</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[11px]">Verified Purchasers</span>
                      <p className="text-sm font-bold text-white">{(shoppingAnalysis.reviewIntelligence.verifiedPurchasersRatio * 100).toFixed(0)}%</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[11px]">Total Reviews Analyzed</span>
                      <p className="text-sm font-bold text-white">{shoppingAnalysis.reviewIntelligence.totalReviewsAnalyzed.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-emerald-400">Common Praise:</span>
                    {shoppingAnalysis.reviewIntelligence.commonPraise.map((p, i) => (
                      <p key={i} className="text-slate-300 pl-2 border-l border-emerald-500/40">• {p}</p>
                    ))}
                  </div>
                </div>

                {/* Available Coupons */}
                {shoppingAnalysis.availableCoupons.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Verified Discount Codes Applied
                    </h3>
                    <div className="space-y-1.5">
                      {shoppingAnalysis.availableCoupons.map((c, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                            {c.code}
                          </span>
                          <span className="text-slate-300">{c.discountDesc}</span>
                          <span className="text-emerald-400 font-medium">{c.verifiedSuccessRate}% Success</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CRITICAL HUMAN CONFIRMATION POLICY ENFORCEMENT */}
                {/* "Do not make purchasing decisions without user confirmation." */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Sovereign Human Confirmation Enclave
                  </div>
                  <p className="text-xs text-slate-300">
                    In compliance with OMNI Sovereign Governance, <strong>the AI will NEVER make purchases automatically</strong>. Explicit dual-factor human confirmation is required for all payments.
                  </p>

                  {shoppingAnalysis.purchaseRequest?.status === 'confirmed_by_user' ? (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>
                        Purchase confirmed by user at {new Date(shoppingAnalysis.purchaseRequest.confirmedAt || '').toLocaleTimeString()}. Order dispatched to merchant.
                      </span>
                    </div>
                  ) : shoppingAnalysis.purchaseRequest?.status === 'declined' ? (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                      Purchase request was declined by user.
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-1">
                      <button
                        id="btn_open_purchase_confirm"
                        onClick={() => setShowPurchaseConfirmModal(true)}
                        className="flex-1 py-2 px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
                      >
                        Authorize Purchase (${shoppingAnalysis.currentPrice.toFixed(2)})
                      </button>
                      <button
                        id="btn_decline_purchase"
                        onClick={handleDeclinePurchase}
                        className="py-2 px-3 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <ShoppingBag className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-400">Click to analyze products on this page.</p>
                <button
                  onClick={handleRunShoppingAnalysis}
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                >
                  Analyze Product
                </button>
              </div>
            )}

            {/* Quick Link to OMNI Market */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold">Explore OMNI Market</span>
              </div>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('omni-navigate-url', { detail: { url: 'https://market.omni.com' } }));
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
              >
                Open Market →
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBMODE 4: CONTENT CREATION STUDIO */}
        {/* ------------------------------------------------------------- */}
        {subMode === 'content_create' && (
          <div className="space-y-4">
            {/* Format Selection Buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { format: 'social_posts', label: 'Social Posts', icon: Share2 },
                { format: 'newsletter', label: 'Newsletter', icon: Mail },
                { format: 'blog', label: 'Blog Article', icon: FileText },
                { format: 'video_script', label: 'Video Script', icon: Video },
                { format: 'presentation', label: 'Slide Deck', icon: Layers }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.format}
                    id={`btn_format_${item.format}`}
                    onClick={() => handleGenerateContent(item.format as any)}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      contentTargetFormat === item.format
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {contentCreationResult && (
              <div className="space-y-3">
                {/* Social Posts Output */}
                {contentTargetFormat === 'social_posts' && contentCreationResult.socialPosts && (
                  <div className="space-y-2.5">
                    {/* X / Twitter */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-sky-400">X / Twitter Thread Hook</span>
                        <button
                          onClick={() => copyToClipboard(contentCreationResult.socialPosts!.xTwitter, 'xtwitter')}
                          className="text-slate-400 hover:text-white"
                        >
                          {copiedKey === 'xtwitter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {contentCreationResult.socialPosts.xTwitter}
                      </p>
                    </div>

                    {/* LinkedIn */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-400">LinkedIn Executive Post</span>
                        <button
                          onClick={() => copyToClipboard(contentCreationResult.socialPosts!.linkedIn, 'linkedin')}
                          className="text-slate-400 hover:text-white"
                        >
                          {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {contentCreationResult.socialPosts.linkedIn}
                      </p>
                    </div>
                  </div>
                )}

                {/* Newsletter Output */}
                {contentTargetFormat === 'newsletter' && contentCreationResult.newsletterIssue && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">Newsletter Issue Draft</span>
                      <button
                        onClick={() => copyToClipboard(contentCreationResult.newsletterIssue!.bodyMarkdown, 'newsletter')}
                        className="text-slate-400 hover:text-white"
                      >
                        {copiedKey === 'newsletter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-white">Subject: {contentCreationResult.newsletterIssue.subjectLine}</div>
                      <p className="text-slate-400 italic">Preview: {contentCreationResult.newsletterIssue.previewSnippet}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-200 whitespace-pre-line leading-relaxed border border-slate-800">
                      {contentCreationResult.newsletterIssue.bodyMarkdown}
                    </div>
                  </div>
                )}

                {/* Video Script Output */}
                {contentTargetFormat === 'video_script' && contentCreationResult.videoScript && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                      <span>Video Script ({contentCreationResult.videoScript.targetDuration})</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                        {contentCreationResult.videoScript.targetPlatform}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {contentCreationResult.videoScript.scenes.map((sc, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span>{sc.timestamp}</span>
                            <span className="text-indigo-400 font-sans font-semibold">{sc.hookOrSection}</span>
                          </div>
                          <p className="text-slate-200"><strong>Voiceover:</strong> "{sc.narrationVoiceover}"</p>
                          <p className="text-[11px] text-slate-400 italic">Visual Cue: {sc.visualCue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Send to OMNI AI Create Button */}
                <div className="pt-2">
                  {sentToCreateSuccess ? (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Package sent to OMNI AI Create Studio
                      </span>
                      <button className="underline font-bold">Open Project</button>
                    </div>
                  ) : (
                    <button
                      id="btn_send_to_omni_create"
                      onClick={handleSendToOmniCreate}
                      className="w-full py-2.5 px-4 text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Send Creation Tasks to OMNI AI Create
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBMODE 5: VOICE ASSISTANT & AUDIO */}
        {/* ------------------------------------------------------------- */}
        {subMode === 'voice' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/80 to-slate-900 border border-indigo-500/30 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  voiceState.isListening
                    ? 'bg-rose-500/20 text-rose-400 border-2 border-rose-500 animate-pulse scale-110'
                    : voiceState.isSpeaking
                    ? 'bg-amber-500/20 text-amber-300 border-2 border-amber-400 animate-pulse'
                    : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 hover:bg-indigo-600/30'
                }`}
              >
                {voiceState.isListening ? (
                  <Mic className="w-9 h-9" />
                ) : voiceState.isSpeaking ? (
                  <Volume2 className="w-9 h-9" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  {voiceState.isListening
                    ? 'Listening to Speech Input...'
                    : voiceState.isSpeaking
                    ? 'Speaking Page Summary...'
                    : 'Conversational Browsing Active'}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Speak naturally to ask questions about this page, summarize sections, or trigger sovereign actions.
                </p>
              </div>

              <div className="flex gap-2 w-full max-w-xs">
                <button
                  id="btn_voice_record_toggle"
                  onClick={handleToggleVoice}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    voiceState.isListening
                      ? 'bg-rose-600 text-white hover:bg-rose-500'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'
                  }`}
                >
                  {voiceState.isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {voiceState.isListening ? 'Stop Listening' : 'Start Speaking'}
                </button>
                <button
                  id="btn_voice_read_summary"
                  onClick={handleSpeakSummary}
                  className="py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Read Summary
                </button>
              </div>
            </div>

            {/* Voice Preferences */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Neural Speech Engine</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Synthesizer Voice</label>
                  <select
                    value={voiceState.selectedVoice}
                    onChange={e => setVoiceState(prev => ({ ...prev, selectedVoice: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200"
                  >
                    {voiceState.supportedVoices.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PERSISTENT CONVERSATION HISTORY & ASK BAR */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Session Dialogue
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl text-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/30 ml-6'
                    : 'bg-slate-800/70 text-slate-200 border border-slate-700/60 mr-6'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-semibold text-slate-300">
                    {msg.sender === 'user' ? 'You' : 'OMNI AI Assistant'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Prompt Input Field */}
          <form onSubmit={handleSendChatQuestion} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                id="input_ai_assistant_question"
                type="text"
                value={userQuestion}
                onChange={e => setUserQuestion(e.target.value)}
                placeholder="Ask OMNI anything about this page..."
                className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-500 shadow-inner"
              />
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                  voiceState.isListening ? 'text-rose-400 animate-pulse' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <button
              id="btn_send_ai_question"
              type="submit"
              disabled={!userQuestion.trim() || loading}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* HUMAN PURCHASE CONFIRMATION MODAL (EXPLICIT POLICY) */}
      {/* ------------------------------------------------------------- */}
      {showPurchaseConfirmModal && shoppingAnalysis && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Confirm Sovereign Payment Authorization</h3>
              </div>
              <button onClick={() => setShowPurchaseConfirmModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Product:</span>
                <span className="font-semibold text-white">{shoppingAnalysis.productName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Merchant:</span>
                <span className="text-white">{shoppingAnalysis.sellerName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Authorized Amount:</span>
                <span className="text-base font-extrabold text-emerald-400">${shoppingAnalysis.currentPrice.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-300 font-medium">OMNI Passport Biometric / Passkey Verification</label>
              <input
                id="input_purchase_passkey"
                type="password"
                value={purchasePasskey}
                onChange={e => setPurchasePasskey(e.target.value)}
                placeholder="Touch biometric sensor or enter PIN..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 font-mono text-xs"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              By authorizing, you sign this transaction with your sovereign private key. The payment will settle via OMNI Double-Entry Treasury.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                id="btn_confirm_purchase_action"
                onClick={handleConfirmPurchase}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
              >
                Sign & Complete Purchase
              </button>
              <button
                onClick={() => setShowPurchaseConfirmModal(false)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
