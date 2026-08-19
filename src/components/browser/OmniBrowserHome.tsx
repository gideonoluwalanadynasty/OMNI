import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Newspaper,
  Terminal,
  Wallet,
  Server,
  Star,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Activity,
  Compass,
  PenTool,
  DollarSign,
  Tv,
  Puzzle,
  ShieldAlert,
  Share2,
  Calendar,
  MessageSquare,
  BarChart3,
  ShoppingBag,
  Gamepad2,
  GraduationCap,
  WifiOff,
  Sliders,
  Handshake,
  Building2,
  Landmark
} from 'lucide-react';
import {
  OmniBrowserWorkspace,
  OmniBrowserBookmark,
  OmniBrowserPrivacyShield,
  OmniBrowserVpnState
} from '../../types';

interface OmniBrowserHomeProps {
  workspaces: OmniBrowserWorkspace[];
  activeWorkspaceId: string;
  bookmarks: OmniBrowserBookmark[];
  privacyShields: OmniBrowserPrivacyShield[];
  vpnState: OmniBrowserVpnState;
  onNavigate: (url: string) => void;
  onSelectWorkspace: (workspaceId: string) => void;
  onOpenSecurityCenter: () => void;
}

export const OmniBrowserHome: React.FC<OmniBrowserHomeProps> = ({
  workspaces,
  activeWorkspaceId,
  bookmarks,
  privacyShields,
  vpnState,
  onNavigate,
  onSelectWorkspace,
  onOpenSecurityCenter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'ai_grounded' | 'web'>('ai_grounded');

  const totalTrackersBlocked = privacyShields.reduce((acc, s) => acc + s.blockedCount24h, 0);

  const speedDials = [
    { title: 'Enterprise & Gov', subtitle: 'Fleet, GPO & Security Audit', url: 'https://enterprise.omni.com', icon: Landmark, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' },
    { title: 'White Label SaaS', subtitle: 'Launch Custom Browser', url: 'https://whitelabel.omni.com', icon: Sliders, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' },
    { title: 'OMNI Play', subtitle: 'PQC Puzzles & Arcade', url: 'https://play.omni.com', icon: Gamepad2, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' },
    { title: 'OMNI Learn', subtitle: 'Courses & Certifications', url: 'https://learn.omni.com', icon: GraduationCap, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' },
    { title: 'OMNI Market', subtitle: 'Hardware, TPUs & Escrow', url: 'https://market.omni.com', icon: ShoppingBag, color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' },
    { title: 'Social Hub', subtitle: '11 Channels & AI Agents', url: 'omni://social', icon: Share2, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' },
    { title: 'Offline Enclave', subtitle: 'Air-Gapped Sandbox', url: 'https://offline.omni.com', icon: WifiOff, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' },
    { title: 'OMNI AI', subtitle: 'Universal Multimodal AI', url: 'https://ai.omni.com', icon: Sparkles, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' },
    { title: 'OMNI Pay', subtitle: 'Double-Entry Ledger', url: 'https://pay.omni.com', icon: Wallet, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' },
    { title: 'OMNI Passport', subtitle: 'Sovereign Identity', url: 'https://passport.omni.com', icon: ShieldCheck, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' },
    { title: 'OMNI Cloud', subtitle: 'Containers & Spanner', url: 'https://cloud.omni.com', icon: Server, color: 'text-purple-400 bg-purple-950/60 border-purple-800/60' },
  ];

  const dailyIntelligence = [
    {
      category: 'ENTERPRISE AI',
      headline: 'Sovereign Multi-Agent Workspaces Mitigate Cross-Tenant Prompt Leakage by 99.98%',
      source: 'arXiv CS.AI',
      timestamp: '2h ago',
      url: 'https://arxiv.org/abs/2608.10921'
    },
    {
      category: 'GLOBAL INFRASTRUCTURE',
      headline: 'Financial Ledgers Adopt Strict Double-Entry Cryptographic Proofs for AI Compute Settlement',
      source: 'TechCrunch',
      timestamp: '4h ago',
      url: 'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os'
    },
    {
      category: 'SOVEREIGN WEB',
      headline: 'OMNI Browser Integrates Native Multi-Hop VPN Relays and Zero-Logging DNS-over-HTTPS',
      source: 'OMNI Trust Lab',
      timestamp: '6h ago',
      url: 'https://omni.com'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchMode === 'ai_grounded') {
      onNavigate(`https://search.omni.com?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate(`https://duckduckgo.com/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div
      id="browser-home-page"
      className="flex-1 overflow-y-auto bg-stone-950 text-stone-100 p-6 md:p-10 flex flex-col items-center select-none"
    >
      <div className="w-full max-w-4xl space-y-8">
        {/* Brand & Hero */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sovereign Digital Gateway</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-100 tracking-tight">
            OMNI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Browser</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-lg mx-auto">
            AI-Powered Privacy Gateway, Digital Workspaces & Sovereign VPN Tunnel.
          </p>
        </div>

        {/* Central Omnibox Search Field */}
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative flex items-center bg-stone-900 border border-stone-700 rounded-2xl p-2 shadow-2xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <div className="flex items-center gap-1.5 pl-3 pr-2 text-indigo-400">
              {searchMode === 'ai_grounded' ? <Sparkles className="w-5 h-5" /> : <Search className="w-5 h-5 text-stone-400" />}
            </div>
            <input
              id="home-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchMode === 'ai_grounded'
                  ? 'Ask OMNI AI or search with cryptographic groundings...'
                  : 'Search privacy web or enter destination URL...'
              }
              className="flex-1 bg-transparent border-none outline-none text-stone-100 placeholder-stone-500 text-sm px-2"
            />
            <div className="flex items-center gap-1.5 pr-1">
              <button
                type="button"
                onClick={() => setSearchMode(searchMode === 'ai_grounded' ? 'web' : 'ai_grounded')}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-colors ${
                  searchMode === 'ai_grounded'
                    ? 'bg-indigo-900/60 border-indigo-700 text-indigo-200'
                    : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                }`}
              >
                {searchMode === 'ai_grounded' ? 'AI Grounded' : 'Web Index'}
              </button>
              <button
                type="submit"
                id="btn-home-search-submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
                title="Search (Enter)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Privacy & Security Telemetry Summary Cards */}
        <div
          id="home-privacy-metrics"
          onClick={onOpenSecurityCenter}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 bg-stone-900/60 border border-stone-800 rounded-2xl cursor-pointer hover:border-stone-700 transition-colors"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-100">{totalTrackersBlocked.toLocaleString()}</div>
              <div className="text-[11px] text-stone-400">Trackers Deflected</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-800 text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-100">86.4 MB</div>
              <div className="text-[11px] text-stone-400">Bandwidth Saved</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-indigo-950/70 border border-indigo-800 text-indigo-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-100">100% TLS 1.3</div>
              <div className="text-[11px] text-stone-400">HTTPS Enforced</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 rounded-xl bg-purple-950/70 border border-purple-800 text-purple-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-bold text-stone-100">{vpnState.isConnected ? 'Active' : 'Disabled'}</div>
              <div className="text-[11px] text-stone-400">Sovereign VPN</div>
            </div>
          </div>
        </div>

        {/* OMNI Content Ecosystem Banner & Quick Access */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI CONTENT & CREATOR NETWORK
              </span>
            </div>
            <button
              onClick={() => onNavigate('https://content.omni.com')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
            >
              <span>Explore Content Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => onNavigate('https://discover.omni.com')}
              className="p-3 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-indigo-700/60 rounded-xl text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-stone-500 font-mono">Personalised</span>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200 group-hover:text-indigo-300">Discover Feed</div>
                <div className="text-[10px] text-stone-500">Multi-source curated stream</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('https://magazine.omni.com')}
              className="p-3 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-blue-700/60 rounded-xl text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-blue-950 text-blue-300 border border-blue-800">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-blue-400 font-mono">10 Topics</span>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200 group-hover:text-blue-300">AI Magazine</div>
                <div className="text-[10px] text-stone-500">Peer-reviewed issues</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('https://creator.omni.com')}
              className="p-3 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-purple-700/60 rounded-xl text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-purple-950 text-purple-300 border border-purple-800">
                  <PenTool className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-purple-400 font-mono">AI Studio</span>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200 group-hover:text-purple-300">Creator Tools</div>
                <div className="text-[10px] text-stone-500">Blogs, Podcasts & Videos</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('https://monetize.omni.com')}
              className="p-3 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-emerald-700/60 rounded-xl text-left transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">0% Take</span>
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200 group-hover:text-emerald-300">Monetisation</div>
                <div className="text-[10px] text-stone-500">Ads, Subs & Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* OMNI Extension Marketplace & Developer Ecosystem Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-stone-900 to-stone-900 border border-indigo-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI EXTENSION MARKETPLACE & DEVELOPER ECOSYSTEM
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold">
              90% Developer Revenue Share
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => onNavigate('https://store.browser.omni.com')}
              className="p-4 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-indigo-600/80 rounded-xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                    <Puzzle className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-stone-200 group-hover:text-indigo-300">
                    OMNI Extension Store
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-stone-400 leading-snug">
                Chrome MV3, Firefox WebExtensions & OMNI native extensions. Zero-trust sandboxed security scanning.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500">
                <span>Free & Paid</span>
                <span>•</span>
                <span>Subscriptions</span>
                <span>•</span>
                <span>Enterprise DLP</span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('https://developers.browser.omni.com')}
              className="p-4 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-indigo-600/80 rounded-xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-stone-900 text-cyan-400 border border-stone-700">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-stone-200 group-hover:text-cyan-300">
                    Developer Portal & Console
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-stone-400 leading-snug">
                Submit packages, manage versions, test multi-engine compatibility & review automated security audits.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                <span>developers.browser.omni.com</span>
                <span>•</span>
                <span>5-Stage Review Pipeline</span>
              </div>
            </div>
          </div>
        </div>

        {/* OMNI Social Media Command Centre Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-indigo-950/40 to-stone-900 border border-indigo-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI SOCIAL MEDIA COMMAND CENTRE
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold">
              11 Official Connectors • Zero Scraping
            </span>
          </div>

          <div
            onClick={() => onNavigate('omni://social')}
            className="p-4 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-indigo-600/80 rounded-xl cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-100 group-hover:text-indigo-300">
                    OMNI Social Hub & Multi-Agent Swarm
                  </div>
                  <div className="text-xs text-stone-400">
                    Unified management for Facebook, Instagram, TikTok, YouTube, LinkedIn, X, Threads, Pinterest, Snapchat, WhatsApp & Telegram.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800 text-[10px] font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <span className="text-indigo-300">⚡ AI Hook Crafter</span>
                <span>•</span>
                <span className="text-emerald-300">📅 Content Calendar</span>
                <span>•</span>
                <span className="text-pink-300">💬 Unified Inbox</span>
                <span>•</span>
                <span className="text-amber-300">🎯 Competitor Recon</span>
              </div>
              <span className="text-indigo-400 font-semibold group-hover:underline">Open Social Hub →</span>
            </div>
          </div>
        </div>

        {/* OMNI Sovereign Marketplace & Commerce Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-stone-900 to-indigo-950/40 border border-amber-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI MARKETPLACE, COMMERCE & PRODUCT DISCOVERY
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold">
              100% Escrow Protection • 0% Dark Patterns
            </span>
          </div>

          <div
            onClick={() => onNavigate('https://market.omni.com')}
            className="p-4 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-600/80 rounded-xl cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-100 group-hover:text-amber-300">
                    OMNI Market & AI Shopping Intelligence
                  </div>
                  <div className="text-xs text-stone-400">
                    Discover sovereign hardware, compare specifications side-by-side, verify merchant trust scores, and pay securely via OMNI Pay.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800 text-[10px] font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <span className="text-amber-300">⚡ Neural TPUs & Hardware</span>
                <span>•</span>
                <span className="text-emerald-300">🛡️ FIDO3 Security Keys</span>
                <span>•</span>
                <span className="text-cyan-300">🤖 AI Price & Deal Audits</span>
                <span>•</span>
                <span className="text-purple-300">🤝 OMNI Affiliate Links</span>
              </div>
              <span className="text-amber-400 font-semibold group-hover:underline">Launch OMNI Market →</span>
            </div>
          </div>
        </div>

        {/* OMNI Play & Learn Ecosystem Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-stone-900 to-emerald-950/30 border border-indigo-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI PLAY & LEARN SOVEREIGN ACADEMY
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold">
              100% Offline-Ready • Air-Gapped Sandboxes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => onNavigate('https://play.omni.com')}
              className="p-4 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-indigo-600/80 rounded-xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-stone-100 group-hover:text-indigo-300">
                      OMNI Play Sovereign Arcade
                    </div>
                    <div className="text-xs text-stone-400">
                      Educational games, post-quantum cypher grids, silicon logic builder & family multiplayer trivia.
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 pt-1 border-t border-stone-800/80">
                <span>⚡ Lattice PQC</span>
                <span>•</span>
                <span>🧩 Circuit Sim</span>
                <span>•</span>
                <span>🏆 XP Achievements</span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('https://learn.omni.com')}
              className="p-4 bg-stone-950/80 hover:bg-stone-800/80 border border-stone-800 hover:border-emerald-600/80 rounded-xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-stone-100 group-hover:text-emerald-300">
                      OMNI Learn Academy & Certifications
                    </div>
                    <div className="text-xs text-stone-400">
                      Interactive engineering courses, verifiable cryptographic credentials, and Socratic AI Tutoring.
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 pt-1 border-t border-stone-800/80">
                <span>🎓 Verifiable Badges</span>
                <span>•</span>
                <span>🤖 Socratic AI Tutor</span>
                <span>•</span>
                <span>📦 Offline Enclave</span>
              </div>
            </div>
          </div>
        </div>

        {/* OMNI White Label Browser Platform Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-stone-900 to-indigo-950/40 border border-purple-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI WHITE LABEL BROWSER SAAS PLATFORM
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] font-semibold">
              B2B Browser Engine • 40% Wholesale Margin
            </span>
          </div>

          <div
            onClick={() => onNavigate('https://whitelabel.omni.com')}
            className="p-4 bg-stone-950/90 hover:bg-stone-900 border border-stone-800 hover:border-purple-600/80 rounded-xl cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-100 group-hover:text-purple-300 flex items-center gap-2">
                    <span>White Label Browser Builder</span>
                    <span className="text-stone-500 font-normal text-xs">— Launch &quot;MyCompany Browser&quot; powered by OMNI</span>
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    Configure custom branding, logos, domains (<code className="text-cyan-400 text-[11px]">company.omnibrowser.com</code> & <code className="text-cyan-400 text-[11px]">customdomain.com</code>), intranet search, custom AI copilots, WireGuard VPNs, seat subscriptions, ad rev-share, and OMNI reseller ledger.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-800/80 text-[11px] font-mono text-stone-400">
              <div className="flex items-center gap-3">
                <span className="text-purple-300">🏢 Multi-Tenancy</span>
                <span>•</span>
                <span className="text-cyan-300">🌐 OMNI Domains</span>
                <span>•</span>
                <span className="text-emerald-300">🤖 Fine-Tuned Copilots</span>
                <span>•</span>
                <span className="text-amber-300">🤝 40% Reseller Margins</span>
                <span>•</span>
                <span className="text-indigo-300">💳 Double-Entry Invoicing</span>
              </div>
              <span className="text-purple-400 font-semibold group-hover:underline">Open SaaS Builder →</span>
            </div>
          </div>
        </div>

        {/* OMNI Enterprise, Government & Security Audit Hub Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-stone-900 to-indigo-950/40 border border-cyan-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                OMNI ENTERPRISE, GOVERNMENT & SECURITY AUDIT HUB
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold">
              FedRAMP High • NIST SP 800-208 PQC • SOC2 Ready
            </span>
          </div>

          <div
            onClick={() => onNavigate('https://enterprise.omni.com')}
            className="p-4 bg-stone-950/90 hover:bg-stone-900 border border-stone-800 hover:border-cyan-600/80 rounded-xl cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-100 group-hover:text-cyan-300 flex items-center gap-2">
                    <span>Enterprise Edition &amp; Security / Performance Audit Suite</span>
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">
                    Central management for Companies, Schools, Governments, and NGOs. Zero-Trust MDM fleet controls, declarative GPO policy engine, air-gapped internal portals, phishing drills, and live automated penetration test suites.
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-800/80 text-[11px] font-mono text-stone-400">
              <div className="flex items-center gap-3">
                <span className="text-cyan-300">🛡️ 8 Security Vectors Audited</span>
                <span>•</span>
                <span className="text-emerald-300">⚡ 6 Performance Benchmarks</span>
                <span>•</span>
                <span className="text-indigo-300">💻 MDM Fleet Lock/Wipe</span>
                <span>•</span>
                <span className="text-amber-300">🔒 Zero-Trust DLP</span>
              </div>
              <span className="text-cyan-400 font-semibold group-hover:underline">Open Enterprise Hub →</span>
            </div>
          </div>
        </div>

        {/* Speed Dials Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-400 px-1">
            <span>QUICK LAUNCH & SPEED DIALS</span>
            <span className="text-stone-500">8 shortcuts</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {speedDials.map((dial, idx) => {
              const IconComp = dial.icon;
              return (
                <button
                  key={idx}
                  id={`btn-speed-dial-${idx}`}
                  onClick={() => onNavigate(dial.url)}
                  className="flex items-start gap-3 p-3 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-xl text-left transition-all group"
                >
                  <div className={`p-2 rounded-lg border ${dial.color} shrink-0`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-stone-200 group-hover:text-white truncate">
                      {dial.title}
                    </div>
                    <div className="text-[11px] text-stone-500 truncate">{dial.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Daily Intelligence Briefing Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-400 px-1">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI DAILY INTELLIGENCE BRIEFING</span>
            </div>
            <span className="text-stone-500 font-mono text-[10px]">Zero-Telemetry Feed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dailyIntelligence.map((item, idx) => (
              <div
                key={idx}
                id={`intel-card-${idx}`}
                onClick={() => onNavigate(item.url)}
                className="flex flex-col justify-between p-3.5 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl cursor-pointer transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider">
                    <span className="text-indigo-400 font-mono">{item.category}</span>
                    <span className="text-stone-500">{item.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium text-stone-200 group-hover:text-indigo-300 leading-snug line-clamp-3">
                    {item.headline}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 text-[11px] text-stone-500">
                  <span>{item.source}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workspaces & Bookmarks Quick Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Active Workspaces */}
          <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-400">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>DIGITAL WORKSPACES</span>
              </div>
              <span className="text-[11px] text-stone-500">{workspaces.length} enclaves</span>
            </div>
            <div className="space-y-1.5">
              {workspaces.map(ws => (
                <button
                  key={ws.id}
                  onClick={() => onSelectWorkspace(ws.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    ws.id === activeWorkspaceId
                      ? 'bg-stone-800 text-white font-medium border border-stone-700'
                      : 'text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ws.color }} />
                    <span className="truncate">{ws.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-500">{ws.tabIds.length} tabs</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bookmarked Favorites */}
          <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-400">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>FAVORITE BOOKMARKS</span>
              </div>
              <span className="text-[11px] text-stone-500">{bookmarks.filter(b => b.isFavorite).length} saved</span>
            </div>
            <div className="space-y-1.5">
              {bookmarks.filter(b => b.isFavorite).slice(0, 4).map(bm => (
                <button
                  key={bm.id}
                  onClick={() => onNavigate(bm.url)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs text-stone-300 hover:text-white hover:bg-stone-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                    <span className="truncate">{bm.title}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-stone-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
