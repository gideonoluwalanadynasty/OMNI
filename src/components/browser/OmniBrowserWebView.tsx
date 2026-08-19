import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Languages,
  FileText,
  AlertTriangle,
  Info,
  Terminal,
  Clock,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Wallet,
  Server,
  Compass,
  ShoppingBag,
  Share2,
  Mic
} from 'lucide-react';
import { OmniBrowserTab, OmniBrowserReaderContent } from '../../types';
import { SEED_BROWSER_READER_CONTENT } from '../../browser_store_data';
import { OmniContentHubRoot } from './content/OmniContentHubRoot';
import { OmniDiscoverFeedView } from './content/OmniDiscoverFeedView';
import { OmniAiMagazineView } from './content/OmniAiMagazineView';
import { OmniCreatorStudioView } from './content/OmniCreatorStudioView';
import { OmniMonetizationView } from './content/OmniMonetizationView';

import { OmniDeveloperPortalView } from './extensions/OmniDeveloperPortalView';
import { OmniExtensionStoreView } from './extensions/OmniExtensionStoreView';
import { OmniWorkspaceView } from './workspace/OmniWorkspaceView';
import { OmniSocialHubRoot } from './social/OmniSocialHubRoot';
import { OmniCommerceRoot } from './commerce/OmniCommerceRoot';
import { OmniPlayRoot } from './play/OmniPlayRoot';
import { OmniLearnRoot } from './learn/OmniLearnRoot';
import { OmniOfflineCacheManager } from './learn/OmniOfflineCacheManager';
import { OmniWhiteLabelRoot } from './whitelabel/OmniWhiteLabelRoot';
import { OmniEnterpriseRoot } from './enterprise/OmniEnterpriseRoot';

interface OmniBrowserWebViewProps {
  tab: OmniBrowserTab;
  onNavigate: (url: string) => void;
  onToggleReaderMode: () => void;
  onInvokeAiAction: (action: 'summarize' | 'fact_check' | 'translate' | 'extract_data' | 'research' | 'shopping' | 'create_content' | 'voice', tab: OmniBrowserTab) => void;
}

export const OmniBrowserWebView: React.FC<OmniBrowserWebViewProps> = ({
  tab,
  onNavigate,
  onToggleReaderMode,
  onInvokeAiAction
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);
  const [showNetworkInspector, setShowNetworkInspector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar'>('en');

  const readerContent: OmniBrowserReaderContent | undefined = SEED_BROWSER_READER_CONTENT[tab.url];

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(tab.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 70));

  // Determine which page viewport to render based on URL
  const isContentHub = tab.url.includes('content.omni.com');
  const isDiscover = tab.url.includes('discover.omni.com');
  const isMagazine = tab.url.includes('magazine.omni.com');
  const isCreator = tab.url.includes('creator.omni.com');
  const isMonetize = tab.url.includes('monetize.omni.com');
  const isDeveloperPortal = tab.url.includes('developers.browser.omni.com') || tab.url.includes('developer.omni.com') || tab.url.includes('omni://developer');
  const isExtensionStore = tab.url.includes('store.browser.omni.com') || tab.url.includes('extensions.omni.com') || tab.url.includes('omni://extensions') || tab.url.includes('omni://store');
  const isWorkspace = tab.url.includes('workspace.omni.com') || tab.url.includes('workspace.browser.omni.com') || tab.url.includes('omni://workspace');
  const isSocialHub = tab.url.includes('social.omni.com') || tab.url.includes('social-hub.omni.com') || tab.url.includes('omni://social') || tab.url.includes('omni://social-hub');
  const isMarketplace = tab.url.includes('market.omni.com') || tab.url.includes('shop.omni.com') || tab.url.includes('commerce.omni.com') || tab.url.includes('omni://market') || tab.url.includes('omni://shop') || tab.url.includes('omni://commerce') || tab.url.includes('affiliate.omni.com') || tab.url.includes('omni://affiliate') || tab.url.includes('pay.omni.com');
  const isWhiteLabel = tab.url.includes('whitelabel.omni.com') || tab.url.includes('builder.omni.com') || tab.url.includes('omnibrowser.com') || tab.url.includes('saas.omni.com') || tab.url.includes('omni://whitelabel') || tab.url.includes('omni://builder') || tab.url.includes('omni://saas') || tab.url.includes('reseller.omni.com') || tab.url.includes('domains.omni.com');
  const isEnterprise = tab.url.includes('enterprise.omni.com') || tab.url.includes('gov.omni.com') || tab.url.includes('defense.omni.com') || tab.url.includes('audit.omni.com') || tab.url.includes('omni://enterprise') || tab.url.includes('omni://gov') || tab.url.includes('omni://audit') || tab.url.includes('omni://fleet') || tab.url.includes('omni://policies');
  const isPlay = tab.url.includes('play.omni.com') || tab.url.includes('games.omni.com') || tab.url.includes('omni://play') || tab.url.includes('omni://games');
  const isLearn = tab.url.includes('learn.omni.com') || tab.url.includes('academy.omni.com') || tab.url.includes('courses.omni.com') || tab.url.includes('omni://learn') || tab.url.includes('omni://academy') || tab.url.includes('omni://courses');
  const isOffline = tab.url.includes('offline.omni.com') || tab.url.includes('omni://offline');
  const isPasswords = tab.url.includes('passwords.omni.com') || tab.url.includes('vault.omni.com') || tab.url.includes('omni://passwords') || tab.url.includes('omni://vault');
  const isTasks = tab.url.includes('tasks.omni.com') || tab.url.includes('omni://tasks');
  const isNotes = tab.url.includes('notes.omni.com') || tab.url.includes('omni://notes');
  const isDocs = tab.url.includes('docs.omni.com') || tab.url.includes('omni://docs');
  const isCalendar = tab.url.includes('calendar.omni.com') || tab.url.includes('omni://calendar');
  const isResearch = tab.url.includes('research.omni.com') || tab.url.includes('omni://research');
  const isFiles = tab.url.includes('files.omni.com') || tab.url.includes('omni://files');
  const isReminders = tab.url.includes('reminders.omni.com') || tab.url.includes('omni://reminders');
  const isProjects = tab.url.includes('projects.omni.com') || tab.url.includes('omni://projects');
  const isBookmarks = tab.url.includes('bookmarks.omni.com') || tab.url.includes('omni://bookmarks');
  const isOmniHub = tab.url === 'https://omni.com' || tab.url.includes('omni.com/hub');
  const isOmniAi = tab.url.includes('ai.omni.com');
  const isOmniPassport = tab.url.includes('passport.omni.com');
  const isOmniPay = tab.url.includes('pay.omni.com');
  const isOmniCloud = tab.url.includes('cloud.omni.com');
  const isSearch = tab.url.includes('search.omni.com');
  const isArxiv = tab.url.includes('arxiv.org');
  const isTechcrunch = tab.url.includes('techcrunch.com');
  const isFinance = tab.url.includes('terminal.finance');
  const isGithub = tab.url.includes('github.com');

  const searchQueryParam = isSearch ? decodeURIComponent(tab.url.split('q=')[1] || '') : '';

  return (
    <div
      id={`webview-container-${tab.id}`}
      className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-hidden relative"
    >
      {/* Top Page Sub-Header / Security & AI Floating Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
            <Lock className="w-3 h-3" />
            <span>TLS 1.3</span>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{tab.containerName || 'Default Enclave'}</span>
          </div>

          {tab.trackersBlockedCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-medium border border-emerald-800">
              {tab.trackersBlockedCount} Trackers Blocked
            </span>
          )}
        </div>

        {/* In-Page AI Actions Toolbar */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-ai-summarize-page"
            onClick={() => onInvokeAiAction('summarize', tab)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/80 text-indigo-300 transition-colors"
            title="Generate Instant AI Summary with Citations"
          >
            <Sparkles className="w-3 h-3" />
            <span>Summarize</span>
          </button>

          <button
            id="btn-ai-research-mode"
            onClick={() => onInvokeAiAction('research', tab)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800/80 text-cyan-300 transition-colors"
            title="Gather Multi-Source Consensus & Deep Research Report"
          >
            <Compass className="w-3 h-3" />
            <span>Research</span>
          </button>

          <button
            id="btn-ai-shopping-intel"
            onClick={() => onInvokeAiAction('shopping', tab)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Analyze Products, Reviews & Buying Verdict"
          >
            <ShoppingBag className="w-3 h-3 text-rose-400" />
            <span>Shopping</span>
          </button>

          <button
            id="btn-ai-create-content"
            onClick={() => onInvokeAiAction('create_content', tab)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Generate Social Posts, Newsletter, Scripts, or Slides"
          >
            <Share2 className="w-3 h-3 text-blue-400" />
            <span>Create</span>
          </button>

          <button
            id="btn-ai-fact-check"
            onClick={() => onInvokeAiAction('fact_check', tab)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Cryptographically Verify Claims & Sources"
          >
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Fact-Check</span>
          </button>

          <button
            id="btn-ai-translate"
            onClick={() => onInvokeAiAction('translate', tab)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Translate Page via OMNI Neural Models"
          >
            <Languages className="w-3 h-3" />
            <span>Translate</span>
          </button>

          {/* Reader Mode Toggle */}
          <button
            id="btn-webview-reader-mode"
            onClick={onToggleReaderMode}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
              tab.readerModeActive
                ? 'bg-cyan-950 border-cyan-800 text-cyan-300 font-semibold'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-stone-100'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Reader Mode</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-stone-800 rounded-lg p-0.5 text-stone-400">
            <button onClick={handleZoomOut} className="p-1 hover:text-stone-100" title="Zoom Out">
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] px-1 font-mono">{zoomLevel}%</span>
            <button onClick={handleZoomIn} className="p-1 hover:text-stone-100" title="Zoom In">
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={handleCopyUrl}
            className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center"
        style={{ zoom: `${zoomLevel}%` }}
      >
        {/* READER MODE VIEW */}
        {tab.readerModeActive && readerContent ? (
          <div className="w-full max-w-3xl bg-stone-900/90 border border-stone-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="space-y-2 pb-6 border-b border-stone-800">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Distraction-Free Reader Mode</span>
                <span>•</span>
                <span className="text-stone-400">{readerContent.readingTimeMinutes} min read</span>
                <span>•</span>
                <span className="text-stone-400">{readerContent.wordCount} words</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-stone-100 leading-tight">
                {readerContent.title}
              </h1>
              {readerContent.byline && (
                <div className="text-xs text-stone-400">{readerContent.byline} — {readerContent.publishedDate}</div>
              )}
            </div>

            {/* AI Key Insights Box */}
            <div className="p-4 bg-indigo-950/50 border border-indigo-800/80 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4" />
                <span>AI EXECUTIVE SYNTHESIS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {readerContent.aiKeyInsights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formatted Markdown Content */}
            <div className="prose prose-invert max-w-none text-stone-200 text-sm leading-relaxed space-y-4 font-sans">
              <div className="whitespace-pre-line">
                {readerContent.markdownContent}
              </div>
            </div>
          </div>
        ) : isContentHub ? (
          /* OMNI CONTENT HUB SUITE */
          <div className="w-full max-w-6xl">
            <OmniContentHubRoot />
          </div>
        ) : isDiscover ? (
          /* OMNI DISCOVER FEED */
          <div className="w-full max-w-6xl">
            <OmniContentHubRoot initialTab="discover" />
          </div>
        ) : isMagazine ? (
          /* OMNI AI MAGAZINE */
          <div className="w-full max-w-6xl">
            <OmniContentHubRoot initialTab="magazine" />
          </div>
        ) : isCreator ? (
          /* OMNI CREATOR STUDIO */
          <div className="w-full max-w-6xl">
            <OmniContentHubRoot initialTab="creator" />
          </div>
        ) : isMonetize ? (
          /* OMNI MONETISATION */
          <div className="w-full max-w-6xl">
            <OmniContentHubRoot initialTab="monetize" />
          </div>
        ) : isDeveloperPortal ? (
          /* DEVELOPERS.BROWSER.OMNI.COM DEVELOPER PORTAL */
          <div className="w-full max-w-6xl">
            <OmniDeveloperPortalView
              onNavigateStore={() => onNavigate('https://store.browser.omni.com')}
            />
          </div>
        ) : isExtensionStore ? (
          /* STORE.BROWSER.OMNI.COM EXTENSION MARKETPLACE */
          <div className="w-full max-w-6xl">
            <OmniExtensionStoreView
              onOpenDeveloperPortal={() => onNavigate('https://developers.browser.omni.com')}
            />
          </div>
        ) : isSocialHub ? (
          /* OMNI SOCIAL HUB & MULTI-PLATFORM COMMAND CENTRE */
          <div className="w-full max-w-6xl h-full">
            <OmniSocialHubRoot />
          </div>
        ) : isMarketplace ? (
          /* OMNI SOVEREIGN MARKETPLACE, COMMERCE & PRODUCT DISCOVERY */
          <div className="w-full max-w-6xl">
            <OmniCommerceRoot
              initialProductId={
                tab.url.includes('/p/')
                  ? tab.url.split('/p/')[1]?.split('?')[0]
                  : tab.url.includes('product=')
                  ? tab.url.split('product=')[1]?.split('&')[0]
                  : undefined
              }
              onNavigateUrl={onNavigate}
            />
          </div>
        ) : isWhiteLabel ? (
          /* OMNI WHITE LABEL BROWSER BUILDER & SAAS ENGINE */
          <div className="w-full max-w-6xl h-full">
            <OmniWhiteLabelRoot />
          </div>
        ) : isEnterprise ? (
          /* OMNI ENTERPRISE, GOVERNMENT & SECURITY AUDIT HUB */
          <div className="w-full max-w-6xl h-full">
            <OmniEnterpriseRoot />
          </div>
        ) : isPlay ? (
          /* OMNI PLAY SOVEREIGN ARCADE */
          <div className="w-full max-w-6xl h-full">
            <OmniPlayRoot />
          </div>
        ) : isLearn ? (
          /* OMNI LEARN SOVEREIGN ACADEMY */
          <div className="w-full max-w-6xl h-full">
            <OmniLearnRoot />
          </div>
        ) : isOffline ? (
          /* OMNI OFFLINE CACHE ENCLAVE */
          <div className="w-full max-w-6xl h-full">
            <OmniOfflineCacheManager onBack={() => onNavigate('https://omni.com')} />
          </div>
        ) : isWorkspace || isPasswords || isNotes || isTasks || isCalendar || isDocs || isFiles || isResearch || isReminders || isProjects || isBookmarks ? (
          /* OMNI DIGITAL WORKSPACE SUITE */
          <div className="w-full max-w-6xl">
            <OmniWorkspaceView
              initialTab={
                isPasswords ? 'passwords' :
                isNotes ? 'notes' :
                isTasks ? 'tasks' :
                isCalendar ? 'calendar' :
                isDocs ? 'documents' :
                isFiles ? 'files' :
                isResearch ? 'research' :
                isReminders ? 'reminders' :
                isProjects ? 'projects' :
                isBookmarks ? 'bookmarks' : 'overview'
              }
              currentTabUrl={tab.url}
              onNavigateToUrl={onNavigate}
            />
          </div>
        ) : isSearch ? (
          /* SEARCH RESULTS VIEWPORT */
          <div className="w-full max-w-3xl space-y-6">
            <div className="pb-4 border-b border-stone-800">
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                OMNI SOVEREIGN GROUNDED SEARCH
              </div>
              <h2 className="text-xl font-bold text-stone-100 mt-1">
                Results for &ldquo;{searchQueryParam}&rdquo;
              </h2>
              <div className="text-xs text-stone-500 mt-1">Cryptographic Groundings • Zero-Search-Profiling</div>
            </div>

            {/* AI Direct Answer Synthesis */}
            <div className="p-5 bg-stone-900 border border-indigo-900/80 rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>SOVEREIGN AI DIRECT SYNTHESIS</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">
                Based on real-time retrieval from indexed enterprise preprints, developer documentation, and verified sovereign nodes, <strong>{searchQueryParam}</strong> is fully integrated into the OMNI ecosystem with multi-tenant isolation, RBAC role-gates, and double-entry accounting proofs.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800 text-[11px] text-stone-400">
                <span className="px-2 py-0.5 rounded bg-stone-800 font-mono text-indigo-300">[1] arxiv.org/abs/2608.10921</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 font-mono text-indigo-300">[2] docs.omni.com/sdk/ts</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 font-mono text-indigo-300">[3] pay.omni.com/ledger</span>
              </div>
            </div>

            {/* Web Search Result Cards */}
            <div className="space-y-4">
              <div
                onClick={() => onNavigate('https://ai.omni.com')}
                className="p-4 bg-stone-900/70 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl cursor-pointer transition-colors space-y-1"
              >
                <div className="text-[11px] text-emerald-400 font-mono">https://ai.omni.com</div>
                <div className="text-sm font-semibold text-indigo-300">OMNI AI — Sovereign Universal Intelligence</div>
                <p className="text-xs text-stone-400">Multimodal reasoning, deep research pipelines, autonomous agents, and dynamic model routing without third-party prompt leakage.</p>
              </div>

              <div
                onClick={() => onNavigate('https://arxiv.org/abs/2608.10921')}
                className="p-4 bg-stone-900/70 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl cursor-pointer transition-colors space-y-1"
              >
                <div className="text-[11px] text-emerald-400 font-mono">https://arxiv.org/abs/2608.10921</div>
                <div className="text-sm font-semibold text-indigo-300">[2608.10921] Sovereign Multi-Agent Orchestration</div>
                <p className="text-xs text-stone-400">Formal verification of four-tier isolation architectures combining WebAssembly micro-sandboxes with cryptographic double-entry ledger settlement.</p>
              </div>

              <div
                onClick={() => onNavigate('https://techcrunch.com/2026/08/16/sovereign-ai-omni-os')}
                className="p-4 bg-stone-900/70 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl cursor-pointer transition-colors space-y-1"
              >
                <div className="text-[11px] text-emerald-400 font-mono">https://techcrunch.com/2026/08/16/sovereign-ai-omni-os</div>
                <div className="text-sm font-semibold text-indigo-300">TechCrunch: How Sovereign AI Architecture Is Rewriting Enterprise Infrastructure</div>
                <p className="text-xs text-stone-400">Analysis of the global enterprise migration away from closed monolithic AI platforms toward privacy-first operating systems.</p>
              </div>
            </div>
          </div>
        ) : isOmniAi ? (
          /* OMNI AI EMBEDDED PREVIEW */
          <div className="w-full max-w-4xl space-y-6">
            <div className="p-6 bg-stone-900 border border-indigo-800/80 rounded-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg">OMNI AI — Unified Intelligence Gateway</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold border border-indigo-800">
                  Live Gateway Node
                </span>
              </div>
              <p className="text-xs text-stone-300">
                You are securely connected to the sovereign AI operating system. Chat, research, agents, and models are available via the OMNI AI Copilot sidebar or directly in the OMNI AI native application.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                  <div className="text-base font-bold text-indigo-400">16 Hubs</div>
                  <div className="text-[11px] text-stone-400">AI Admin & Models</div>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                  <div className="text-base font-bold text-emerald-400">100% Pass</div>
                  <div className="text-[11px] text-stone-400">Red-Team Defenses</div>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                  <div className="text-base font-bold text-cyan-400">Double-Entry</div>
                  <div className="text-[11px] text-stone-400">Ledger Billing</div>
                </div>
              </div>
            </div>
          </div>
        ) : isArxiv ? (
          /* ARXIV RESEARCH VIEWPORT */
          <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2 pb-4 border-b border-stone-800">
              <div className="text-xs font-mono text-amber-400">arXiv:2608.10921 [cs.AI]</div>
              <h1 className="text-xl md:text-2xl font-extrabold text-stone-100">
                Sovereign Multi-Agent Orchestration in Enterprise Computing Enclaves
              </h1>
              <div className="text-xs text-stone-400">
                Authors: Dr. Evelyn Vance, Marcus Thorne (OMNI Intelligence Institute)
              </div>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-stone-300">Abstract</div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Conventional multi-agent artificial intelligence pipelines suffer from severe cross-tenant memory leakage, unauthorized tool execution, and catastrophic billing drift when autonomous agents interact across distributed cloud environments. We present empirical benchmarks across 100,000 enterprise workflows showing 99.98% prompt injection mitigation.
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-stone-800 text-xs text-stone-400">
              <span>View full paper in clean reader mode for AI takeaways:</span>
              <button
                onClick={onToggleReaderMode}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
              >
                Switch to Reader View
              </button>
            </div>
          </div>
        ) : isTechcrunch ? (
          /* TECHCRUNCH ARTICLE VIEWPORT */
          <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2 pb-4 border-b border-stone-800">
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Enterprise Infrastructure</div>
              <h1 className="text-xl md:text-2xl font-extrabold text-stone-100">
                How Sovereign AI Architecture Is Rewriting Enterprise Infrastructure in 2026
              </h1>
              <div className="text-xs text-stone-400">By Sarah Perez • August 16, 2026</div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              The enterprise technology landscape in 2026 is witnessing an unprecedented transformation: the migration away from single-vendor proprietary AI silos toward sovereign, self-governing operating platforms with zero training data leakage.
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-stone-800 text-xs text-stone-400">
              <span>Read complete sanitized article without ads:</span>
              <button
                onClick={onToggleReaderMode}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
              >
                Open in Reader Mode
              </button>
            </div>
          </div>
        ) : (
          /* GENERIC SANDBOXED WEB PAGE VIEW */
          <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl p-8 space-y-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center mx-auto text-indigo-400">
              <Globe className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-stone-100">{tab.title}</h2>
              <div className="text-xs text-stone-500 font-mono">{tab.url}</div>
            </div>
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-left text-xs text-stone-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Active Sovereign Sandbox Protection</span>
              </div>
              <p>
                This webpage is executing within a secure WebAssembly container enclave. Cross-site tracking scripts, canvas fingerprinting attempts, and intrusive ads are blocked in real-time.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => onInvokeAiAction('summarize', tab)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Summarize with OMNI AI
              </button>
              <button
                onClick={onToggleReaderMode}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
              >
                Toggle Reader Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
