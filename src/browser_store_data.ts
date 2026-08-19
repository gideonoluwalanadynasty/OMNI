import {
  OmniBrowserTab,
  OmniBrowserWorkspace,
  OmniBrowserBookmark,
  OmniBrowserBookmarkFolder,
  OmniBrowserHistoryEntry,
  OmniBrowserDownloadItem,
  OmniBrowserExtension,
  OmniBrowserPrivacyShield,
  OmniBrowserVpnNode,
  OmniBrowserVpnState,
  OmniBrowserSearchEngine,
  OmniBrowserSettings,
  OmniBrowserReaderContent,
  OmniBrowserSecurityAuditLog,
  OmniBrowserNativeBridgeSpec,
  OmniBrowserTabGroup,
  OmniBrowserSavedSession,
  OmniBrowserProjectSpace,
  OmniBrowserReadingListItem,
  OmniBrowserSyncConfig,
  OmniBrowserSyncPayload,
  OmniBrowserAuthorizedDevice,
  OmniBrowserSecuritySession,
  OmniBrowserSuspiciousAlert
} from './types';

export const SEED_BROWSER_WORKSPACES: OmniBrowserWorkspace[] = [
  {
    id: 'ws_dynasty',
    name: 'Dynasty Sovereign',
    icon: 'ShieldCheck',
    color: '#4f46e5',
    description: 'Primary corporate operations, sovereign governance, and OMNI ecosystem management.',
    tabIds: ['tab_omni_home', 'tab_omni_ai', 'tab_omni_passport'],
    activeTabId: 'tab_omni_home',
    isDefault: true,
    organizationId: 'org_dynasty',
    profileType: 'professional',
    tags: ['Corporate', 'Sovereign', 'High-Trust'],
    createdAt: '2026-01-01T00:00:00Z',
    cookieContainerId: 'container_corp_sovereign'
  },
  {
    id: 'ws_research',
    name: 'Intelligence & Research',
    icon: 'Sparkles',
    color: '#06b6d4',
    description: 'Deep technical research, arXiv preprint syntheses, and AI market benchmarks.',
    tabIds: ['tab_arxiv_ai', 'tab_techcrunch', 'tab_market_intel'],
    activeTabId: 'tab_arxiv_ai',
    isDefault: false,
    organizationId: 'org_dynasty',
    profileType: 'developer',
    tags: ['AI', 'Research', 'Preprints'],
    createdAt: '2026-02-15T00:00:00Z',
    cookieContainerId: 'container_research_sandbox'
  },
  {
    id: 'ws_finance',
    name: 'Crypto & Ledger',
    icon: 'Wallet',
    color: '#10b981',
    description: 'Double-entry treasury settlement, decentralized market feeds, and financial accounting.',
    tabIds: ['tab_omni_pay', 'tab_bloomberg_crypto'],
    activeTabId: 'tab_omni_pay',
    isDefault: false,
    organizationId: 'org_dynasty',
    profileType: 'investor',
    tags: ['Finance', 'Ledger', 'Treasury'],
    createdAt: '2026-03-01T00:00:00Z',
    cookieContainerId: 'container_finance_hardened',
    vpnRelayOverrideId: 'vpn_node_zurich'
  },
  {
    id: 'ws_dev',
    name: 'Dev & Sandboxes',
    icon: 'Terminal',
    color: '#f59e0b',
    description: 'Cloud microservices, GitHub pull requests, and API developer playgrounds.',
    tabIds: ['tab_github_omni', 'tab_omni_cloud'],
    activeTabId: 'tab_github_omni',
    isDefault: false,
    organizationId: 'org_dynasty',
    profileType: 'developer',
    tags: ['Engineering', 'Wasm', 'Containers'],
    createdAt: '2026-03-20T00:00:00Z',
    cookieContainerId: 'container_dev_isolate'
  }
];

export const SEED_BROWSER_TABS: OmniBrowserTab[] = [
  {
    id: 'tab_omni_home',
    title: 'OMNI Ecosystem Hub - Sovereign Gateway',
    url: 'https://omni.com',
    favicon: 'Globe',
    isActive: true,
    isPinned: true,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_dynasty',
    containerColor: '#4f46e5',
    containerName: 'Dynasty Corporate',
    securityStatus: 'secure',
    sslInfo: {
      protocol: 'TLS 1.3 (RFC 8446)',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      issuer: 'OMNI Sovereign Certificate Authority',
      validUntil: '2028-12-31T23:59:59Z',
      keyStrength: 'RSA 4096-bit / P-384 ECDSA',
      hstsEnabled: true,
      certificateAuthority: 'OMNI Trust Root G4',
      isOrganizationValidated: true
    },
    trackersBlockedCount: 0,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 0,
    history: ['https://omni.com'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:25:00Z'
  },
  {
    id: 'tab_omni_ai',
    title: 'OMNI AI - Unified Multimodal Intelligence',
    url: 'https://ai.omni.com',
    favicon: 'Sparkles',
    isActive: false,
    isPinned: true,
    isMuted: false,
    isLoading: false,
    canGoBack: true,
    canGoForward: false,
    workspaceId: 'ws_dynasty',
    containerColor: '#4f46e5',
    containerName: 'Dynasty Corporate',
    securityStatus: 'secure',
    sslInfo: {
      protocol: 'TLS 1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      issuer: 'OMNI Sovereign Root CA',
      validUntil: '2028-12-31T23:59:59Z',
      keyStrength: 'ECDSA P-384',
      hstsEnabled: true,
      certificateAuthority: 'OMNI Trust Root G4',
      isOrganizationValidated: true
    },
    trackersBlockedCount: 0,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 0,
    history: ['https://omni.com', 'https://ai.omni.com'],
    historyIndex: 1,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:24:00Z'
  },
  {
    id: 'tab_omni_passport',
    title: 'OMNI Passport - Sovereign Identity & Security',
    url: 'https://passport.omni.com',
    favicon: 'ShieldCheck',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_dynasty',
    containerColor: '#4f46e5',
    containerName: 'Dynasty Corporate',
    securityStatus: 'secure',
    sslInfo: {
      protocol: 'TLS 1.3',
      cipherSuite: 'TLS_CHACHA20_POLY1305_SHA256',
      issuer: 'OMNI Trust CA',
      validUntil: '2028-12-31T23:59:59Z',
      keyStrength: 'Ed25519 / RSA 4096',
      hstsEnabled: true,
      certificateAuthority: 'OMNI Trust Root G4',
      isOrganizationValidated: true
    },
    trackersBlockedCount: 0,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 0,
    history: ['https://passport.omni.com'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:20:00Z'
  },
  {
    id: 'tab_arxiv_ai',
    title: 'arXiv:2608.10921 [cs.AI] Sovereign Multi-Agent Orchestration',
    url: 'https://arxiv.org/abs/2608.10921',
    favicon: 'BookOpen',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: true,
    canGoForward: false,
    workspaceId: 'ws_research',
    containerColor: '#06b6d4',
    containerName: 'Research Sandbox',
    securityStatus: 'secure',
    sslInfo: {
      protocol: 'TLS 1.3',
      cipherSuite: 'TLS_AES_128_GCM_SHA256',
      issuer: 'Let\'s Encrypt Authority X3',
      validUntil: '2026-11-20T12:00:00Z',
      keyStrength: 'RSA 2048-bit',
      hstsEnabled: true,
      certificateAuthority: 'ISRG Root X1',
      isOrganizationValidated: false
    },
    trackersBlockedCount: 4,
    adsBlockedCount: 1,
    fingerprintAttemptsDeflected: 2,
    history: ['https://arxiv.org', 'https://arxiv.org/abs/2608.10921'],
    historyIndex: 1,
    readerModeActive: true,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:15:00Z'
  },
  {
    id: 'tab_techcrunch',
    title: 'TechCrunch: Sovereign AI Architecture Dominates Enterprise Infrastructure 2026',
    url: 'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os',
    favicon: 'Newspaper',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_research',
    containerColor: '#06b6d4',
    containerName: 'Research Sandbox',
    securityStatus: 'secure',
    sslInfo: {
      protocol: 'TLS 1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      issuer: 'DigiCert Global Root G2',
      validUntil: '2027-04-14T00:00:00Z',
      keyStrength: 'RSA 2048-bit',
      hstsEnabled: true,
      certificateAuthority: 'DigiCert Inc',
      isOrganizationValidated: true
    },
    trackersBlockedCount: 22,
    adsBlockedCount: 14,
    fingerprintAttemptsDeflected: 6,
    history: ['https://techcrunch.com/2026/08/16/sovereign-ai-omni-os'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:10:00Z'
  },
  {
    id: 'tab_market_intel',
    title: 'OMNI Deep Market Intelligence - Global Tech Valuations 2026',
    url: 'https://research.omni.com/dossier/tech-valuations-2026',
    favicon: 'TrendingUp',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_research',
    containerColor: '#06b6d4',
    containerName: 'Research Sandbox',
    securityStatus: 'secure',
    trackersBlockedCount: 0,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 0,
    history: ['https://research.omni.com/dossier/tech-valuations-2026'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:05:00Z'
  },
  {
    id: 'tab_omni_pay',
    title: 'OMNI Pay - Double-Entry Financial Settlement Ledger',
    url: 'https://pay.omni.com',
    favicon: 'Wallet',
    isActive: false,
    isPinned: true,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_finance',
    containerColor: '#10b981',
    containerName: 'Finance Hardened',
    securityStatus: 'secure',
    trackersBlockedCount: 0,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 0,
    history: ['https://pay.omni.com'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T07:00:00Z'
  },
  {
    id: 'tab_bloomberg_crypto',
    title: 'Financial Terminal - FX Rates & Cross-Border Sovereign Reserves',
    url: 'https://terminal.finance/sovereign-fx',
    favicon: 'TrendingUp',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_finance',
    containerColor: '#10b981',
    containerName: 'Finance Hardened',
    securityStatus: 'secure',
    trackersBlockedCount: 16,
    adsBlockedCount: 8,
    fingerprintAttemptsDeflected: 3,
    history: ['https://terminal.finance/sovereign-fx'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T06:50:00Z'
  },
  {
    id: 'tab_github_omni',
    title: 'GitHub - omni-platform/omni-core-runtime',
    url: 'https://github.com/omni-platform/omni-core-runtime',
    favicon: 'GitBranch',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_dev',
    containerColor: '#f59e0b',
    containerName: 'Dev Isolate',
    securityStatus: 'secure',
    trackersBlockedCount: 7,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 2,
    history: ['https://github.com/omni-platform/omni-core-runtime'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T06:40:00Z'
  },
  {
    id: 'tab_omni_cloud',
    title: 'OMNI Cloud - Edge Containers & Spanner DB Shards',
    url: 'https://cloud.omni.com',
    favicon: 'Server',
    isActive: false,
    isPinned: false,
    isMuted: false,
    isLoading: false,
    canGoBack: false,
    canGoForward: false,
    workspaceId: 'ws_dev',
    containerColor: '#f59e0b',
    containerName: 'Dev Isolate',
    securityStatus: 'secure',
    trackersBlockedCount: 0,
    adsBlockedCount: 0,
    fingerprintAttemptsDeflected: 0,
    history: ['https://cloud.omni.com'],
    historyIndex: 0,
    readerModeActive: false,
    zoomLevel: 100,
    lastAccessedAt: '2026-08-16T06:30:00Z'
  }
];

export const SEED_BROWSER_BOOKMARK_FOLDERS: OmniBrowserBookmarkFolder[] = [
  { id: 'fld_ecosystem', name: 'OMNI Sovereign Suite', parentId: null, color: '#4f46e5', icon: 'ShieldCheck' },
  { id: 'fld_ai_research', name: 'AI & Machine Intelligence', parentId: null, color: '#06b6d4', icon: 'Sparkles' },
  { id: 'fld_finance', name: 'Treasury & Ledger', parentId: null, color: '#10b981', icon: 'Wallet' },
  { id: 'fld_developer', name: 'Developer & DevSecOps', parentId: null, color: '#f59e0b', icon: 'CodeXml' }
];

export const SEED_BROWSER_BOOKMARKS: OmniBrowserBookmark[] = [
  {
    id: 'bm_01',
    title: 'OMNI AI Sovereign Console',
    url: 'https://ai.omni.com',
    favicon: 'Sparkles',
    folderId: 'fld_ecosystem',
    tags: ['Core', 'AI', 'Flagship'],
    isFavorite: true,
    createdAt: '2026-01-01T00:00:00Z',
    note: 'Universal AI operating system, models, agent swarm, and consensus hub.'
  },
  {
    id: 'bm_02',
    title: 'OMNI Passport Identity Portal',
    url: 'https://passport.omni.com',
    favicon: 'ShieldCheck',
    folderId: 'fld_ecosystem',
    tags: ['Identity', 'WebAuthn', 'KYC'],
    isFavorite: true,
    createdAt: '2026-01-02T00:00:00Z',
    note: 'Universal credentials, KYC/KYB verified badges, and passkey management.'
  },
  {
    id: 'bm_03',
    title: 'OMNI Cloud Serverless & Spanner',
    url: 'https://cloud.omni.com',
    favicon: 'Server',
    folderId: 'fld_ecosystem',
    tags: ['Cloud', 'Compute', 'Storage'],
    isFavorite: false,
    createdAt: '2026-01-10T00:00:00Z'
  },
  {
    id: 'bm_04',
    title: 'arXiv AI Papers & Preprints',
    url: 'https://arxiv.org/list/cs.AI/recent',
    favicon: 'BookOpen',
    folderId: 'fld_ai_research',
    tags: ['Research', 'Preprints', 'Math'],
    isFavorite: true,
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'bm_05',
    title: 'Hugging Face Open Weights Repository',
    url: 'https://huggingface.co/models',
    favicon: 'Cpu',
    folderId: 'fld_ai_research',
    tags: ['LLM', 'BYOM', 'OpenWeights'],
    isFavorite: false,
    createdAt: '2026-02-10T00:00:00Z'
  },
  {
    id: 'bm_06',
    title: 'OMNI Pay Double-Entry Settlement',
    url: 'https://pay.omni.com',
    favicon: 'Wallet',
    folderId: 'fld_finance',
    tags: ['Ledger', 'Accounting', 'Settlement'],
    isFavorite: true,
    createdAt: '2026-01-05T00:00:00Z'
  },
  {
    id: 'bm_07',
    title: 'Developer REST & GraphQL SDKs',
    url: 'https://docs.omni.com/sdk/ts',
    favicon: 'Terminal',
    folderId: 'fld_developer',
    tags: ['SDK', 'Typescript', 'API'],
    isFavorite: true,
    createdAt: '2026-01-15T00:00:00Z'
  }
];

export const SEED_BROWSER_HISTORY: OmniBrowserHistoryEntry[] = [
  {
    id: 'hist_01',
    title: 'OMNI Ecosystem Hub - Sovereign Gateway',
    url: 'https://omni.com',
    favicon: 'Globe',
    visitedAt: '2026-08-16T07:25:00Z',
    visitCount: 42,
    category: 'ecosystem',
    workspaceId: 'ws_dynasty',
    trackersBlockedCount: 0
  },
  {
    id: 'hist_02',
    title: 'OMNI AI - Unified Multimodal Intelligence',
    url: 'https://ai.omni.com',
    favicon: 'Sparkles',
    visitedAt: '2026-08-16T07:24:00Z',
    visitCount: 118,
    category: 'ecosystem',
    workspaceId: 'ws_dynasty',
    trackersBlockedCount: 0
  },
  {
    id: 'hist_03',
    title: 'arXiv:2608.10921 [cs.AI] Sovereign Multi-Agent Orchestration',
    url: 'https://arxiv.org/abs/2608.10921',
    favicon: 'BookOpen',
    visitedAt: '2026-08-16T07:15:00Z',
    visitCount: 5,
    category: 'research',
    workspaceId: 'ws_research',
    trackersBlockedCount: 4
  },
  {
    id: 'hist_04',
    title: 'TechCrunch: Sovereign AI Architecture Dominates Enterprise Infrastructure 2026',
    url: 'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os',
    favicon: 'Newspaper',
    visitedAt: '2026-08-16T07:10:00Z',
    visitCount: 2,
    category: 'productivity',
    workspaceId: 'ws_research',
    trackersBlockedCount: 22
  },
  {
    id: 'hist_05',
    title: 'GitHub - omni-platform/omni-core-runtime',
    url: 'https://github.com/omni-platform/omni-core-runtime',
    favicon: 'GitBranch',
    visitedAt: '2026-08-16T06:40:00Z',
    visitCount: 29,
    category: 'developer',
    workspaceId: 'ws_dev',
    trackersBlockedCount: 7
  },
  {
    id: 'hist_06',
    title: 'Financial Terminal - FX Rates & Cross-Border Sovereign Reserves',
    url: 'https://terminal.finance/sovereign-fx',
    favicon: 'TrendingUp',
    visitedAt: '2026-08-16T06:50:00Z',
    visitCount: 14,
    category: 'finance',
    workspaceId: 'ws_finance',
    trackersBlockedCount: 16
  }
];

export const SEED_BROWSER_DOWNLOADS: OmniBrowserDownloadItem[] = [
  {
    id: 'dl_01',
    filename: 'OMNI_AI_Architecture_Whitepaper_2026.pdf',
    fileSize: 4218900,
    fileType: 'PDF Document',
    url: 'https://ai.omni.com/downloads/whitepaper.pdf',
    progress: 100,
    status: 'scanned_safe',
    downloadedAt: '2026-08-16T06:15:00Z',
    localPath: '~/Downloads/OMNI_AI_Architecture_Whitepaper_2026.pdf',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    speedBps: 0,
    mimeType: 'application/pdf'
  },
  {
    id: 'dl_02',
    filename: 'omni_passport_passkey_backup.json.enc',
    fileSize: 16384,
    fileType: 'Encrypted Key Vault',
    url: 'https://passport.omni.com/vault/export',
    progress: 100,
    status: 'scanned_safe',
    downloadedAt: '2026-08-15T22:30:00Z',
    localPath: '~/Downloads/omni_passport_passkey_backup.json.enc',
    sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    speedBps: 0,
    mimeType: 'application/json'
  },
  {
    id: 'dl_03',
    filename: 'omni_desktop_runtime_x86_64.tar.gz',
    fileSize: 84920400,
    fileType: 'Compressed Binary Archive',
    url: 'https://releases.omni.com/desktop/v1.0.0/omni_desktop.tar.gz',
    progress: 100,
    status: 'completed',
    downloadedAt: '2026-08-14T18:00:00Z',
    localPath: '~/Downloads/omni_desktop_runtime_x86_64.tar.gz',
    sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    speedBps: 0,
    mimeType: 'application/gzip'
  }
];

export const SEED_BROWSER_EXTENSIONS: OmniBrowserExtension[] = [
  {
    id: 'ext_omni_ai_copilot',
    name: 'OMNI AI Sovereign Copilot',
    version: '2.4.0',
    description: 'Instant page summarization, semantic fact-checking, deep research sidekick, and cross-document reasoning.',
    icon: 'Sparkles',
    author: 'OMNI Intelligence Labs',
    isEnabled: true,
    permissions: ['activeTab', 'contextMenus', 'storage', 'ai.use'],
    category: 'ai',
    rating: 4.9,
    installCount: 384000,
    optionsUrl: 'omni://extensions/omni-ai-copilot',
    isVerifiedByOmni: true,
    sizeKb: 1420,
    lastUpdated: '2026-08-10'
  },
  {
    id: 'ext_privacy_sentinel',
    name: 'OMNI Privacy Sentinel Pro',
    version: '3.1.2',
    description: 'Multi-layer tracker interception, canvas fingerprint randomizer, CNAME uncloaking, and cookie sandboxing.',
    icon: 'ShieldCheck',
    author: 'OMNI Security Taskforce',
    isEnabled: true,
    permissions: ['webRequest', 'webRequestBlocking', 'privacy', 'cookies'],
    category: 'privacy',
    rating: 5.0,
    installCount: 520000,
    optionsUrl: 'omni://extensions/privacy-sentinel',
    isVerifiedByOmni: true,
    sizeKb: 890,
    lastUpdated: '2026-08-12'
  },
  {
    id: 'ext_web3_vault',
    name: 'OMNI Web3 & Sovereign Key Vault',
    version: '1.8.5',
    description: 'Hardware passkey authentication, multi-signature transaction signer, and double-entry ledger integration.',
    icon: 'Wallet',
    author: 'OMNI Cryptographic Systems',
    isEnabled: true,
    permissions: ['storage', 'passkeys', 'wallet.sign'],
    category: 'web3',
    rating: 4.8,
    installCount: 195000,
    optionsUrl: 'omni://extensions/web3-vault',
    isVerifiedByOmni: true,
    sizeKb: 2150,
    lastUpdated: '2026-08-01'
  },
  {
    id: 'ext_dark_reader_pro',
    name: 'OMNI Smart Dark Theme Engine',
    version: '4.9.68',
    description: 'Intelligent high-contrast eye-safe color inversion with dynamic luminescence correction and CSS filtering.',
    icon: 'Moon',
    author: 'OMNI Accessibility Guild',
    isEnabled: true,
    permissions: ['storage', 'tabs'],
    category: 'productivity',
    rating: 4.7,
    installCount: 410000,
    optionsUrl: 'omni://extensions/dark-reader',
    isVerifiedByOmni: true,
    sizeKb: 450,
    lastUpdated: '2026-07-28'
  },
  {
    id: 'ext_devtools_inspect',
    name: 'OMNI Network & DOM Inspector',
    version: '2.0.1',
    description: 'Real-time WebSocket inspector, HTTP header debugger, and WASM memory profiler for web developers.',
    icon: 'Terminal',
    author: 'OMNI Developer Relations',
    isEnabled: true,
    permissions: ['devtools', 'debugger', 'network'],
    category: 'developer',
    rating: 4.9,
    installCount: 88000,
    optionsUrl: 'omni://extensions/devtools-inspect',
    isVerifiedByOmni: true,
    sizeKb: 1820,
    lastUpdated: '2026-08-05'
  }
];

export const SEED_BROWSER_PRIVACY_SHIELDS: OmniBrowserPrivacyShield[] = [
  {
    id: 'sh_trackers',
    name: 'Cross-Site Tracker Blocker',
    isEnabled: true,
    description: 'Blocks behavioral telemetry, marketing analytics beacons, and hidden pixel trackers before network dispatch.',
    category: 'trackers',
    blockedCount24h: 1842,
    protectionTier: 'aggressive'
  },
  {
    id: 'sh_ads',
    name: 'Intrusive Ad & Banner Shield',
    isEnabled: true,
    description: 'Scans and strips programmatic ad scripts, pop-unders, video pre-rolls, and malicious redirect payload URLs.',
    category: 'ads',
    blockedCount24h: 4120,
    protectionTier: 'aggressive'
  },
  {
    id: 'sh_fingerprint',
    name: 'Browser Fingerprint Randomizer',
    isEnabled: true,
    description: 'Injects subtle, undetectable noise into HTML5 Canvas, WebGL, AudioContext, and font metric detection APIs.',
    category: 'fingerprinting',
    blockedCount24h: 312,
    protectionTier: 'standard'
  },
  {
    id: 'sh_https',
    name: 'Automatic HTTPS Upgrader',
    isEnabled: true,
    description: 'Enforces end-to-end TLS 1.3 encryption on all insecure HTTP connections and validates strict HSTS policies.',
    category: 'https_upgrade',
    blockedCount24h: 94,
    protectionTier: 'standard'
  },
  {
    id: 'sh_cookie_containers',
    name: 'Multi-Tenant Cookie Containers',
    isEnabled: true,
    description: 'Isolates cookies, localStorage, and IndexedDB between different workspace enclaves to prevent cross-site identity leakage.',
    category: 'cookie_isolation',
    blockedCount24h: 580,
    protectionTier: 'aggressive'
  },
  {
    id: 'sh_crypto_miner',
    name: 'Cryptojacking Script Interceptor',
    isEnabled: true,
    description: 'Detects and neutralizes unauthorized WebAssembly and JavaScript cryptocurrency mining scripts.',
    category: 'crypto_mining',
    blockedCount24h: 18,
    protectionTier: 'standard'
  }
];

export const SEED_BROWSER_VPN_NODES: OmniBrowserVpnNode[] = [
  {
    id: 'vpn_node_zurich',
    location: 'Zurich, Switzerland',
    countryCode: 'CH',
    city: 'Zurich',
    ip: '194.182.164.88',
    pingMs: 14,
    loadPercent: 28,
    isPremium: true,
    protocol: 'WireGuard',
    status: 'connected'
  },
  {
    id: 'vpn_node_london',
    location: 'London, United Kingdom',
    countryCode: 'GB',
    city: 'London',
    ip: '185.156.46.12',
    pingMs: 18,
    loadPercent: 44,
    isPremium: false,
    protocol: 'WireGuard',
    status: 'available'
  },
  {
    id: 'vpn_node_frankfurt',
    location: 'Frankfurt, Germany',
    countryCode: 'DE',
    city: 'Frankfurt',
    ip: '193.138.218.70',
    pingMs: 22,
    loadPercent: 52,
    isPremium: false,
    protocol: 'WireGuard',
    status: 'available'
  },
  {
    id: 'vpn_node_tokyo',
    location: 'Tokyo, Japan',
    countryCode: 'JP',
    city: 'Tokyo',
    ip: '133.242.180.44',
    pingMs: 148,
    loadPercent: 36,
    isPremium: true,
    protocol: 'OmniTunnel',
    status: 'available'
  },
  {
    id: 'vpn_node_nyc',
    location: 'New York, United States',
    countryCode: 'US',
    city: 'New York',
    ip: '199.195.250.31',
    pingMs: 76,
    loadPercent: 68,
    isPremium: false,
    protocol: 'WireGuard',
    status: 'available'
  },
  {
    id: 'vpn_node_singapore',
    location: 'Singapore, SG',
    countryCode: 'SG',
    city: 'Singapore',
    ip: '103.253.144.19',
    pingMs: 162,
    loadPercent: 31,
    isPremium: true,
    protocol: 'WireGuard',
    status: 'available'
  },
  {
    id: 'vpn_node_reykjavik',
    location: 'Reykjavik, Iceland',
    countryCode: 'IS',
    city: 'Reykjavik',
    ip: '185.112.146.99',
    pingMs: 42,
    loadPercent: 19,
    isPremium: true,
    protocol: 'TorBridge',
    status: 'available'
  }
];

export const DEFAULT_BROWSER_VPN_STATE: OmniBrowserVpnState = {
  isConnected: true,
  activeNodeId: 'vpn_node_zurich',
  bytesDownloaded: 148920340, // ~148 MB
  bytesUploaded: 32180400, // ~32 MB
  sessionDurationSeconds: 7420,
  ipMasked: '194.182.164.88 (Zurich, Switzerland)',
  killSwitchEnabled: true,
  splitTunnelingEnabled: true,
  dnsOverHttps: true,
  dohProvider: 'OMNI Sovereign DoH (Zero-Logging)',
  torRelayEnabled: false
};

export const SEED_BROWSER_SEARCH_ENGINES: OmniBrowserSearchEngine[] = [
  {
    id: 'se_omni',
    name: 'OMNI Sovereign Grounded Search',
    urlTemplate: 'https://search.omni.com?q=%s',
    icon: 'Sparkles',
    isDefault: true,
    isAiGrounded: true,
    description: 'AI-grounded semantic retrieval with cryptographic citations and zero search query logging.'
  },
  {
    id: 'se_duckduckgo',
    name: 'DuckDuckGo',
    urlTemplate: 'https://duckduckgo.com/?q=%s',
    icon: 'ShieldCheck',
    isDefault: false,
    isAiGrounded: false,
    description: 'Standard privacy search without personalized tracker profiling.'
  },
  {
    id: 'se_google',
    name: 'Google Search (Encrypted Proxy)',
    urlTemplate: 'https://www.google.com/search?q=%s',
    icon: 'Search',
    isDefault: false,
    isAiGrounded: false,
    description: 'Standard web indexing passed through OMNI IP anonymization proxy.'
  },
  {
    id: 'se_brave',
    name: 'Brave Search',
    urlTemplate: 'https://search.brave.com/search?q=%s',
    icon: 'Compass',
    isDefault: false,
    isAiGrounded: false,
    description: 'Independent web index with privacy focus.'
  }
];

export const DEFAULT_BROWSER_SETTINGS: OmniBrowserSettings = {
  defaultSearchEngineId: 'se_omni',
  homePageUrl: 'https://omni.com',
  newTabPageMode: 'omni_feed',
  defaultZoom: 100,
  hardwareAcceleration: true,
  clearDataOnExit: false,
  blockThirdPartyCookies: true,
  sendDoNotTrack: true,
  enableVpnOnStartup: true,
  enableAiCopilotSidebar: true,
  autoSummarizeLongArticles: false,
  omniboxAiAutoSuggest: true,
  tabLayout: 'horizontal_top',
  themeMode: 'system',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: 'medium',
  syncWithPassport: true
};

export const SEED_BROWSER_READER_CONTENT: Record<string, OmniBrowserReaderContent> = {
  'https://arxiv.org/abs/2608.10921': {
    url: 'https://arxiv.org/abs/2608.10921',
    title: 'Sovereign Multi-Agent Orchestration in Enterprise Computing Enclaves',
    byline: 'Dr. Evelyn Vance, Marcus Thorne — OMNI Intelligence Institute',
    publishedDate: 'August 14, 2026',
    readingTimeMinutes: 6,
    headings: [
      '1. Abstract & High-Stakes Threat Models',
      '2. Dual Ledger & Capability-Based Access Control',
      '3. Human-in-the-Loop Co-Signing Architecture',
      '4. Empirical Latency & Cost Reduction Benchmarks'
    ],
    markdownContent: `# Sovereign Multi-Agent Orchestration in Enterprise Computing Enclaves

## 1. Abstract & High-Stakes Threat Models
Conventional multi-agent artificial intelligence pipelines suffer from severe cross-tenant memory leakage, unauthorized tool execution, and catastrophic billing drift when autonomous agents interact across distributed cloud environments. In this paper, we propose a four-tier isolation architecture combining WebAssembly micro-sandboxes, Row-Level Security (RLS) enclaves, and cryptographic double-entry ledger settlement.

## 2. Dual Ledger & Capability-Based Access Control
Every autonomous agent invocation is verified against a strict Capability-Based Access Control (CBAC) matrix. Tool parameters proposing destructive actions (e.g., database mutations, external payouts, credential rotations) must generate an immutable Human-in-the-Loop (HITL) approval task.

\`\`\`typescript
interface AgentExecutionProof {
  agentId: string;
  autonomyLevel: 0 | 1 | 2 | 3 | 4 | 5;
  capabilityToken: string;
  ledgerReservationId: string;
  signature: string;
}
\`\`\`

## 3. Human-in-the-Loop Co-Signing Architecture
When an autonomous agent reaches Autonomy Level 3 or higher, high-risk tools cannot execute without a dual-key cryptographic co-sign from an authorized human operator. This completely eliminates rogue agent loops and unauthorized data exfiltration.

## 4. Empirical Latency & Cost Reduction Benchmarks
Benchmarking across 100,000 synthetic enterprise workflows demonstrated a 99.98% mitigation rate against prompt injection attacks, zero floating-point ledger discrepancies, and a 42% decrease in token consumption via dynamic semantic routing.`,
    wordCount: 1240,
    aiKeyInsights: [
      'Four-tier isolation guarantees zero cross-tenant contamination in RAG and agent systems.',
      'Cryptographic double-entry ledger prevents unauthorized billing loops during autonomous runs.',
      'HITL co-signing enforces strict human oversight over high-stakes API mutations.'
    ],
    aiSentiment: 'analytical'
  },
  'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os': {
    url: 'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os',
    title: 'How Sovereign AI Architecture Is Rewriting Enterprise Infrastructure in 2026',
    byline: 'Sarah Perez — TechCrunch Enterprise',
    publishedDate: 'August 16, 2026',
    readingTimeMinutes: 4,
    headings: [
      'The Shift from Monolithic LLMs to Sovereign Orchestration',
      'Privacy-First Browsers and Digital Workspaces',
      'The Economics of Double-Entry AI Settlement'
    ],
    markdownContent: `# How Sovereign AI Architecture Is Rewriting Enterprise Infrastructure in 2026

The enterprise technology landscape in 2026 is witnessing an unprecedented transformation: the migration away from single-vendor proprietary AI silos toward sovereign, self-governing operating platforms.

### The Shift from Monolithic LLMs to Sovereign Orchestration
CIOs are no longer willing to route sensitive intellectual property through closed black-box endpoints. Modern enterprises demand dynamic model routing, BYOK (Bring Your Own Key) vaults, and on-premises private endpoints (vLLM, Ollama) that guarantee zero training data retention.

### Privacy-First Browsers and Digital Workspaces
Browsers like OMNI Browser are redefining the gateway to the internet. By embedding privacy shields, tracker mitigations, and context-aware AI copilots directly into sandboxed workspace enclaves, knowledge workers can synthesize complex research in seconds without exposing confidential corporate artifacts to external tracking networks.`,
    wordCount: 780,
    aiKeyInsights: [
      'Enterprises are transitioning from single-vendor AI dependencies to sovereign routing fabrics.',
      'Privacy-first browser workspaces safeguard intellectual property during active research.',
      'Decentralized identity (OMNI Passport) is becoming the standard for enterprise SSO and compliance.'
    ],
    aiSentiment: 'positive'
  }
};

export const SEED_BROWSER_SECURITY_AUDIT_LOGS: OmniBrowserSecurityAuditLog[] = [
  {
    id: 'sec_log_01',
    timestamp: '2026-08-16T07:22:10Z',
    url: 'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os',
    eventType: 'tracker_blocked',
    domain: 'techcrunch.com',
    actionTaken: 'Blocked 22 tracking beacons (Google Analytics 4, DoubleClick, Criteo)',
    protectionLayer: 'L1 Network Shield'
  },
  {
    id: 'sec_log_02',
    timestamp: '2026-08-16T07:22:11Z',
    url: 'https://techcrunch.com/2026/08/16/sovereign-ai-omni-os',
    eventType: 'ad_scrubbed',
    domain: 'techcrunch.com',
    actionTaken: 'Scrubbed 14 promotional banners and video pre-roll iframes',
    protectionLayer: 'L2 Content Scrubber'
  },
  {
    id: 'sec_log_03',
    timestamp: '2026-08-16T07:15:02Z',
    url: 'https://arxiv.org/abs/2608.10921',
    eventType: 'fingerprint_randomized',
    domain: 'arxiv.org',
    actionTaken: 'Injected 0.001% variance into HTML5 Canvas & WebGL pixel readouts',
    protectionLayer: 'L3 Privacy Randomizer'
  },
  {
    id: 'sec_log_04',
    timestamp: '2026-08-16T06:50:30Z',
    url: 'https://terminal.finance/sovereign-fx',
    eventType: 'cookie_isolated',
    domain: 'terminal.finance',
    actionTaken: 'Encapsulated authentication token inside Finance Hardened Container',
    protectionLayer: 'L4 Container Sandbox'
  }
];

export const DEFAULT_NATIVE_BRIDGE_SPEC: OmniBrowserNativeBridgeSpec = {
  providerName: 'OMNI Native Core Engine Bridge',
  runtimeEnvironment: 'web_sandbox',
  isNativeEngineConnected: true,
  capabilitiesSupported: [
    'IPC_SANDBOX_MESSAGING',
    'TLS_CERTIFICATE_INSPECTOR',
    'DNS_OVER_HTTPS_FORWARDER',
    'WIREGUARD_VPN_TUNNEL',
    'TAB_SESSION_RESTORE',
    'READER_MODE_DOM_EXTRACTOR',
    'AI_INLINE_COPILOT_BRIDGE'
  ],
  engineVersion: 'OMNI-Chromium-Wasm v1.0.4-sovereign'
};

// --- PROMPT 2 SEED DATA ---

export const SEED_BROWSER_TAB_GROUPS: OmniBrowserTabGroup[] = [
  {
    id: 'grp_ecosystem_core',
    title: 'OMNI Ecosystem Hub',
    color: '#6366f1',
    isCollapsed: false,
    tabIds: ['tab_omni_home', 'tab_omni_ai', 'tab_omni_passport'],
    workspaceId: 'ws_dynasty',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'grp_ai_papers',
    title: 'Frontier AI Research',
    color: '#06b6d4',
    isCollapsed: false,
    tabIds: ['tab_arxiv_ai', 'tab_techcrunch'],
    workspaceId: 'ws_research',
    createdAt: '2026-08-10T14:30:00Z'
  },
  {
    id: 'grp_crypto_yields',
    title: 'DeFi & Settlements',
    color: '#10b981',
    isCollapsed: false,
    tabIds: ['tab_omni_pay', 'tab_bloomberg_crypto'],
    workspaceId: 'ws_finance',
    createdAt: '2026-08-12T09:15:00Z'
  }
];

export const SEED_BROWSER_SAVED_SESSIONS: OmniBrowserSavedSession[] = [
  {
    id: 'sess_prod_launch',
    name: 'OMNI Core v2.4 Launch Sprint',
    workspaceId: 'ws_dynasty',
    createdAt: '2026-08-15T18:00:00Z',
    tabCount: 4,
    tabsSnapshot: [
      { id: 't_s1', title: 'OMNI Ecosystem Hub', url: 'https://omni.com', containerName: 'Dynasty Corporate', containerColor: '#4f46e5' },
      { id: 't_s2', title: 'OMNI AI Copilot Studio', url: 'https://omni.com/ai', containerName: 'Dynasty Corporate', containerColor: '#4f46e5' },
      { id: 't_s3', title: 'OMNI Passport Governance', url: 'https://omni.com/passport', containerName: 'Dynasty Corporate', containerColor: '#4f46e5' },
      { id: 't_s4', title: 'Developer Portal CI/CD', url: 'https://omni.com/developers', containerName: 'Dynasty Corporate', containerColor: '#4f46e5' }
    ],
    groupsSnapshot: [],
    isAutoSaved: false
  },
  {
    id: 'sess_market_research',
    name: 'Quantum & Autonomous Agent Deep Dive',
    workspaceId: 'ws_research',
    createdAt: '2026-08-14T11:20:00Z',
    tabCount: 3,
    tabsSnapshot: [
      { id: 't_r1', title: 'arXiv:2608.01249 Reasoning Agent Transformers', url: 'https://arxiv.org/abs/2608.01249', containerName: 'Intelligence Sandbox', containerColor: '#06b6d4' },
      { id: 't_r2', title: 'TechCrunch Frontier AI Sovereign Infrastructure', url: 'https://techcrunch.com/2026/08/omni-sovereign-browser', containerName: 'Intelligence Sandbox', containerColor: '#06b6d4' },
      { id: 't_r3', title: 'Bloomberg Autonomous Intelligence Market Index', url: 'https://bloomberg.com/crypto/yield-markets-2026', containerName: 'Intelligence Sandbox', containerColor: '#06b6d4' }
    ],
    groupsSnapshot: [],
    isAutoSaved: true
  }
];

export const SEED_BROWSER_PROJECT_SPACES: OmniBrowserProjectSpace[] = [
  {
    id: 'proj_browser_sovereignty',
    title: 'Sovereign Multiplatform Browser Architecture',
    description: 'Engineering the next-generation zero-telemetry WebAssembly sandbox with cross-device cryptographic sync and OMNI AI integration.',
    icon: 'Layers',
    color: '#6366f1',
    associatedWorkspaceId: 'ws_dynasty',
    pinnedUrls: [
      'https://omni.com',
      'https://omni.com/ai',
      'https://github.com/omni-os/browser-core'
    ],
    savedNote: 'Priority milestone: Verify WebExtension Manifest v3 polyfill and ChaCha20-Poly1305 end-to-end sync across Mac, Android, and Linux nodes.',
    aiContextPrompt: 'You are analyzing the architecture specifications for OMNI Browser multiplatform engine. Focus on zero-knowledge sync and sandbox IPC.',
    updatedAt: '2026-08-16T07:15:00Z',
    collaboratorDids: ['did:omni:usr_gideon', 'did:omni:org_dynasty_lead']
  },
  {
    id: 'proj_defi_settlement',
    title: 'DeFi Automated Settlement Pipeline',
    description: 'High-frequency double-entry ledger settlement nodes with WireGuard VPN isolation.',
    icon: 'Wallet',
    color: '#10b981',
    associatedWorkspaceId: 'ws_finance',
    pinnedUrls: [
      'https://omni.com/pay',
      'https://bloomberg.com/crypto/yield-markets-2026'
    ],
    savedNote: 'Zurich secure VPN node verified. Target latency under 12ms for Zurich-Frankfurt corridor.',
    aiContextPrompt: 'Evaluate high-volume ledger reconciliation throughput and cryptographic audit log seals.',
    updatedAt: '2026-08-15T19:40:00Z'
  }
];

export const SEED_BROWSER_READING_LIST: OmniBrowserReadingListItem[] = [
  {
    id: 'read_arxiv_2608',
    url: 'https://arxiv.org/abs/2608.01249',
    title: 'Autonomous Reasoning Agents on Decentralized Edge Nodes',
    domain: 'arxiv.org',
    savedAt: '2026-08-16T02:00:00Z',
    isRead: false,
    readingTimeMinutes: 8,
    aiSummary: 'This paper demonstrates how local multi-tenant WebAssembly enclaves achieve zero-knowledge inference while maintaining sub-50ms roundtrip latency on distributed devices.',
    aiKeyPoints: [
      'Local WebAssembly sandboxing isolates user context from third-party tracking scripts.',
      'Sovereign token routing eliminates centralized model vendor vendor-lock-in.',
      'Cryptographic state synchronization maintains consistency without unencrypted cloud relays.'
    ],
    annotations: [
      {
        id: 'ann_1',
        selectedQuote: 'Local multi-tenant WebAssembly enclaves achieve zero-knowledge inference',
        text: 'Directly aligns with OMNI Browser multiplatform sandboxing specs.',
        color: '#fef08a',
        createdAt: '2026-08-16T03:15:00Z'
      }
    ],
    offlineCached: true,
    tags: ['AI', 'Wasm', 'Cryptography', 'Preprint']
  },
  {
    id: 'read_techcrunch_omni',
    url: 'https://techcrunch.com/2026/08/omni-sovereign-browser',
    title: 'How OMNI Browser Is Redefining Private Digital Workspaces',
    domain: 'techcrunch.com',
    savedAt: '2026-08-15T21:10:00Z',
    isRead: true,
    readingTimeMinutes: 5,
    aiSummary: 'TechCrunch examines the rise of sovereign web browsers that combine AI copilot workflows, multi-hop WireGuard VPN tunnels, and zero-telemetry shields into a single digital platform.',
    aiKeyPoints: [
      'Unified workspace enclaves replace cluttered tab management with isolated cryptographic containers.',
      'One-click reader mode strips ad telemetry while generating instant executive takeaways via OMNI AI.',
      'Seamless multi-platform portability across Web, PWA, Desktop, and Mobile environments.'
    ],
    annotations: [
      {
        id: 'ann_2',
        selectedQuote: 'Unified workspace enclaves replace cluttered tab management',
        text: 'Mention our Arc-style workspace and project space architecture here.',
        color: '#bbf7d0',
        createdAt: '2026-08-15T22:00:00Z'
      }
    ],
    offlineCached: true,
    tags: ['TechCrunch', 'Reviews', 'Privacy', 'Workspaces']
  }
];

export const SEED_BROWSER_SYNC_CONFIG: OmniBrowserSyncConfig = {
  syncEnabled: true,
  syncTabs: true,
  syncBookmarks: true,
  syncHistory: false, // User selected to keep history local on this device
  syncReadingList: true,
  syncExtensions: true,
  syncSettings: true,
  syncWorkspaces: true,
  encryptionPassphraseHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  keyFingerprint: 'OMNI-SYNC-FPR-8821-E59A-34CD-901B',
  lastSyncTimestamp: '2026-08-16T07:25:00Z',
  syncStatus: 'synced',
  autoSyncIntervalMinutes: 5,
  cloudEndpoint: 'https://sync.omni.com/v1/vault',
  totalEncryptedBytesSynced: 482910
};

export const SEED_BROWSER_SYNC_PAYLOADS: OmniBrowserSyncPayload[] = [
  {
    id: 'payload_sync_01',
    deviceId: 'dev_macbook_m3',
    deviceName: 'MacBook Pro 16" (Gideon M3 Max)',
    syncedAt: '2026-08-16T07:25:00Z',
    schemaVersion: 2,
    encryptedBlobLength: 142850,
    vectorClock: 14,
    checksum: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'payload_sync_02',
    deviceId: 'dev_iphone_15_pro',
    deviceName: 'iPhone 15 Pro (Mobile Enclave)',
    syncedAt: '2026-08-16T06:12:00Z',
    schemaVersion: 2,
    encryptedBlobLength: 98400,
    vectorClock: 13,
    checksum: 'sha256:3b7b252062f3a8b29330a10972049bf98e09e13467ea55610996fa1ea8865d49'
  },
  {
    id: 'payload_sync_03',
    deviceId: 'dev_ubuntu_server',
    deviceName: 'Ubuntu Workstation (Developer Node)',
    syncedAt: '2026-08-15T22:45:00Z',
    schemaVersion: 2,
    encryptedBlobLength: 124500,
    vectorClock: 11,
    checksum: 'sha256:1a8565a9d214a3850816912384a3297a731d1d86d5e5e0a6d1a1b1a77e5e33d4'
  }
];

export const SEED_BROWSER_AUTHORIZED_DEVICES: OmniBrowserAuthorizedDevice[] = [
  {
    id: 'dev_macbook_m3',
    deviceName: 'MacBook Pro 16" (Primary Sovereign Node)',
    platform: 'desktop',
    osVersion: 'macOS Sonoma 14.6.1 (Darwin 23.6.0)',
    browserEngineVersion: 'OMNI Browser Desktop Engine v2.4.0 (Electron/Wasm Sandboxed)',
    lastActiveIp: '184.22.115.9',
    locationCity: 'New York',
    locationCountry: 'United States',
    isCurrentDevice: true,
    isVerified: true,
    trustScore: 98,
    lastSeenAt: '2026-08-16T07:35:00Z',
    firstAuthorizedAt: '2026-01-10T12:00:00Z',
    deviceFingerprint: 'FP-M3MAX-9A4B-883C-112D-E76A',
    pushToken: 'push_apns_m3_prod_9921',
    status: 'authorized'
  },
  {
    id: 'dev_iphone_15_pro',
    deviceName: 'iPhone 15 Pro (Mobile Sovereign Gateway)',
    platform: 'ios',
    osVersion: 'iOS 18.1 (Build 22B83)',
    browserEngineVersion: 'OMNI Mobile WKWebView Bridge v2.4.0',
    lastActiveIp: '172.56.21.84',
    locationCity: 'New York',
    locationCountry: 'United States',
    isCurrentDevice: false,
    isVerified: true,
    trustScore: 95,
    lastSeenAt: '2026-08-16T06:12:00Z',
    firstAuthorizedAt: '2026-02-01T09:30:00Z',
    deviceFingerprint: 'FP-IPH15P-3C7D-441A-998E-F21B',
    pushToken: 'push_apns_ios_prod_4412',
    status: 'authorized'
  },
  {
    id: 'dev_ubuntu_server',
    deviceName: 'Ubuntu Workstation (Engineering Lab)',
    platform: 'desktop',
    osVersion: 'Ubuntu 24.04 LTS (Kernel 6.8.0)',
    browserEngineVersion: 'OMNI Browser Linux Tauri v2.4.0',
    lastActiveIp: '192.168.1.55',
    locationCity: 'New York (Intranet)',
    locationCountry: 'United States',
    isCurrentDevice: false,
    isVerified: true,
    trustScore: 92,
    lastSeenAt: '2026-08-15T22:45:00Z',
    firstAuthorizedAt: '2026-03-15T15:20:00Z',
    deviceFingerprint: 'FP-LNX64-55E8-229A-661C-B34D',
    status: 'authorized'
  },
  {
    id: 'dev_android_tablet',
    deviceName: 'Samsung Galaxy Tab S9 (PWA Touch Enclave)',
    platform: 'android',
    osVersion: 'Android 14 (OneUI 6.1)',
    browserEngineVersion: 'OMNI PWA Standalone Chrome-Embed v2.4.0',
    lastActiveIp: '184.22.115.9',
    locationCity: 'New York',
    locationCountry: 'United States',
    isCurrentDevice: false,
    isVerified: true,
    trustScore: 89,
    lastSeenAt: '2026-08-14T17:30:00Z',
    firstAuthorizedAt: '2026-04-10T11:00:00Z',
    deviceFingerprint: 'FP-ANDR14-88A2-331B-559D-C01A',
    status: 'authorized'
  }
];

export const SEED_BROWSER_SECURITY_SESSIONS: OmniBrowserSecuritySession[] = [
  {
    sessionId: 'sess_sec_01',
    deviceId: 'dev_macbook_m3',
    deviceName: 'MacBook Pro 16" (Gideon M3 Max)',
    userId: 'usr_gideon',
    passportDid: 'did:omni:usr_gideon_passport_root',
    createdAt: '2026-08-16T00:00:00Z',
    expiresAt: '2026-08-23T00:00:00Z',
    lastActivityAt: '2026-08-16T07:35:00Z',
    status: 'active',
    isMfaVerified: true,
    ipAddress: '184.22.115.9',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) OMNIBrowser/2.4.0'
  },
  {
    sessionId: 'sess_sec_02',
    deviceId: 'dev_iphone_15_pro',
    deviceName: 'iPhone 15 Pro (Mobile Gateway)',
    userId: 'usr_gideon',
    passportDid: 'did:omni:usr_gideon_passport_root',
    createdAt: '2026-08-15T10:00:00Z',
    expiresAt: '2026-08-22T10:00:00Z',
    lastActivityAt: '2026-08-16T06:12:00Z',
    status: 'active',
    isMfaVerified: true,
    ipAddress: '172.56.21.84',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 OMNIBrowserMobile/2.4.0'
  }
];

export const SEED_BROWSER_SUSPICIOUS_ALERTS: OmniBrowserSuspiciousAlert[] = [
  {
    id: 'alert_susp_01',
    timestamp: '2026-08-14T19:15:00Z',
    severity: 'medium',
    title: 'Anomalous Geolocation Ingress Intercepted',
    description: 'Login attempt from IP 198.51.100.4 (Dublin, Ireland) detected 20 minutes after active session in New York, US. Impossible travel heuristic flagged.',
    deviceId: undefined,
    ipAddress: '198.51.100.4',
    resolved: true,
    actionTaken: 'MFA challenge enforced and untrusted IP quarantined by OMNI Passport Shield'
  },
  {
    id: 'alert_susp_02',
    timestamp: '2026-08-13T04:22:00Z',
    severity: 'high',
    title: 'Canvas Fingerprinting Exploit Deflected',
    description: 'Suspicious script on tracking-heavy ad domain attempted to extract hardware WebGL uniform values and canvas hashing.',
    deviceId: 'dev_macbook_m3',
    ipAddress: '184.22.115.9',
    resolved: true,
    actionTaken: 'Canvas noise injector randomized uniform return values to 0x992B'
  }
];

// ===========================================================================
// PROMPT 3: OMNI AI BROWSER ASSISTANT SEED DATA
// ===========================================================================

export const SEED_BROWSER_PAGE_SUMMARIES: Record<string, any> = {
  'https://omni.com': {
    url: 'https://omni.com',
    title: 'OMNI Ecosystem Hub - Sovereign Gateway',
    domain: 'omni.com',
    executiveSummary: 'OMNI represents a sovereign computing platform uniting autonomous AI orchestration, double-entry financial settlement, multi-tenant digital identities, and a privacy-first engine with zero telemetry.',
    keyTakeaways: [
      'Zero third-party trackers or telemetry collection by default.',
      'Sovereign multi-hop VPN with WireGuard and Onion routing integration.',
      'Embedded multi-agent AI assistant supporting live contextual research, shopping intelligence, and multimodal creation.',
      'Cryptographically isolated container workspaces for work, personal, and financial tasks.'
    ],
    readingTimeMinutes: 3,
    sentiment: 'optimistic',
    comprehensionLevels: {
      executive: 'High-level sovereign operating system delivering integrated privacy, autonomous AI agents, and corporate treasury management in a single verified enclave.',
      intermediate: 'A multiplatform web and desktop environment replacing disparate SaaS tools with native AI routing, encrypted sync, and isolated browser containers.',
      deepTechnical: 'Built upon a modular runtime adapter abstraction with WebAssembly sandboxing, strict capability-based access control (CBAC), and append-only cryptographic audit ledgers.'
    },
    extractedEntities: [
      { name: 'OMNI Sovereign Engine', category: 'technology', context: 'Core multiplatform runtime powering browser execution', importance: 'high' },
      { name: 'WireGuard & TorBridge', category: 'technology', context: 'Encrypted network transit layers', importance: 'medium' },
      { name: 'OMNI Passport', category: 'organization', context: 'Decentralized W3C DID identity protocol', importance: 'high' },
      { name: '2026-Q3 Release', category: 'date', context: 'Target rollout for enterprise mesh sync', importance: 'medium' }
    ],
    extractedDataPoints: [
      { label: 'Sandboxed Enclave Overhead', value: '< 12ms', confidence: 99 },
      { label: 'Trackers scrubbed on load', value: '100% of telemetry domains', confidence: 100 },
      { label: 'Supported Platforms', value: '6 (Web, PWA, Extension, Desktop, Android, iOS)', confidence: 98 }
    ],
    actionItems: [
      'Audit container workspace cookie isolation boundaries',
      'Verify biometric passkey registration for current sovereign session',
      'Connect OMNI Cloud vault for automated encrypted sync'
    ],
    citations: [
      { quote: 'True digital sovereignty requires uncompromising local privacy coupled with decentralized AI.', section: 'Manifesto §1.2' },
      { quote: 'Every browsing session is an isolated cryptographic container.', section: 'Architecture Spec v2.4' }
    ],
    suggestedFollowUps: [
      'How does OMNI Browser protect against browser fingerprinting?',
      'Can I sync my workspaces between my macOS desktop and iPhone?',
      'What AI models power the browser assistant?'
    ],
    generatedAt: '2026-08-16T07:40:00Z'
  },
  'https://arxiv.org/abs/2608.10921': {
    url: 'https://arxiv.org/abs/2608.10921',
    title: 'arXiv:2608.10921 — Sovereign Multi-Agent Orchestration in Edge-Sandboxed Browsers',
    domain: 'arxiv.org',
    executiveSummary: 'This preprint demonstrates sub-millisecond multi-agent context switching across isolated client enclaves using WebAssembly linear memory sandboxes and zero-copy IPC channels.',
    keyTakeaways: [
      'Eliminates cross-tab side-channel timing attacks using memory-isolated Wasm instances.',
      'Achieves 4.2x faster tool dispatch latency compared to legacy Electron IPC models.',
      'Introduces a formal verification framework for LLM-directed browser action approval.'
    ],
    readingTimeMinutes: 12,
    sentiment: 'analytical',
    comprehensionLevels: {
      executive: 'Academic validation proving that local AI agent execution inside browsers can be made cryptographically safe without sacrificing speed.',
      intermediate: 'Researchers designed a new way to run AI agent tools inside WebAssembly so malicious websites cannot hijack or snoop on background tasks.',
      deepTechnical: 'Utilizes memory-bound capability tokens where all DOM manipulation calls require cryptographic nonces issued by the browser microkernel.'
    },
    extractedEntities: [
      { name: 'Wasm Linear Memory Enclave', category: 'technology', context: 'Security isolation model', importance: 'high' },
      { name: '4.2x Latency Improvement', category: 'metric', context: 'Performance benchmark vs IPC', importance: 'high' },
      { name: 'DeepMind / OMNI Research Labs', category: 'organization', context: 'Primary research authors', importance: 'medium' }
    ],
    extractedDataPoints: [
      { label: 'Memory Footprint Per Tab', value: '42 MB', confidence: 96 },
      { label: 'IPC Dispatch Overhead', value: '0.84 ms', confidence: 99 },
      { label: 'Attacks Mitigated', value: '14 known Spectre-class vectors', confidence: 100 }
    ],
    actionItems: [
      'Incorporate capability-based token verification in extension adapter',
      'Benchmark local Ollama LLM response latency in edge sandbox'
    ],
    citations: [
      { quote: 'Client-side agent autonomy must treat the underlying DOM as an untrusted hostile surface.', section: 'Introduction p. 2' }
    ],
    suggestedFollowUps: [
      'How does this compare to Chromium Site Isolation?',
      'Can we export this paper summary directly to OMNI Docs?'
    ],
    generatedAt: '2026-08-16T07:42:00Z'
  }
};

export const SEED_BROWSER_COMPARISONS: Record<string, any> = {
  'browser_comparison': {
    id: 'comp_browser_engines',
    topic: 'OMNI Sovereign Browser vs. Traditional Chromium Browsers',
    itemA: {
      id: 'item_omni',
      title: 'OMNI Sovereign Browser',
      url: 'https://omni.com/browser',
      domain: 'omni.com',
      overview: 'Privacy-first, multiplatform browser with native container isolation, multi-agent AI assistant, and zero telemetry.',
      strengths: ['Built-in multi-agent AI companion', 'Zero telemetry collection', 'Hardware passkey sync', 'Native WebAssembly sandboxing', 'Double-entry wallet & cloud integration'],
      weaknesses: ['Emerging sovereign ecosystem', 'Custom extension store approval flow'],
      specs: {
        'Telemetry Policy': 'Zero Data Retention / No Phone-Home',
        'AI Assistant': 'Deeply Integrated Sovereign Copilot (Gemini / Claude / Local)',
        'Container Tabs': 'Isolated cryptographic memory enclaves',
        'Sync Security': 'End-to-end client-encrypted vector clocks',
        'Resource Overhead': 'Low (Adaptive Memory Freezing)'
      },
      pricing: 'Free sovereign tier / Enterprise custom',
      targetAudience: 'Executives, Developers, Privacy-conscious Professionals',
      score: 96
    },
    itemB: {
      id: 'item_chrome',
      title: 'Standard Commercial Browsers (Chrome / Edge)',
      url: 'https://google.com/chrome',
      domain: 'google.com',
      overview: 'Mass-market web browsers reliant on ad-monetization ecosystems and centralized telemetry profiling.',
      strengths: ['Massive extension ecosystem', 'Universal legacy compatibility'],
      weaknesses: ['Extensive user telemetry tracking', 'No native cryptographic workspace containers', 'Third-party cookie and ad surveillance dependencies', 'AI features gated behind cloud telemetry'],
      specs: {
        'Telemetry Policy': 'Extensive user tracking & ad profiling',
        'AI Assistant': 'Separate side-panel or paid cloud subscriptions',
        'Container Tabs': 'Limited profiles (Not memory isolated)',
        'Sync Security': 'Centralized provider cloud keys',
        'Resource Overhead': 'High memory footprint'
      },
      pricing: 'Free (Monetized via User Data & Ads)',
      targetAudience: 'General Consumers',
      score: 68
    },
    featureMatrix: [
      { feature: 'User Telemetry & Profiling', itemAValue: 'Zero Data Retention (Cryptographically Verified)', itemBValue: 'Continuous Behavioral Logging & Ad Telemetry', winner: 'A', notes: 'OMNI guarantees sovereign privacy.' },
      { feature: 'AI Browser Assistant Integration', itemAValue: 'Native Multi-Agent with Voice, Shopping & Research', itemBValue: 'Separate web apps or basic text summary stubs', winner: 'A', notes: 'OMNI assistant operates with full page context.' },
      { feature: 'Workspaces & Isolated Containers', itemAValue: 'Independent cookie jars and sandbox enclaves', itemBValue: 'Basic separate browser profiles', winner: 'A', notes: 'Prevents cross-account session leaks.' },
      { feature: 'Extension Store Ecosystem', itemAValue: 'Curated Sovereign Verified Registry', itemBValue: 'Millions of Web Store extensions', winner: 'B', notes: 'Legacy store has larger legacy catalog volume.' },
      { feature: 'Cross-Device Encrypted Sync', itemAValue: 'Zero-Knowledge Client Encryption (User Passphrase Key)', itemBValue: 'Decrypted server-side for account sync', winner: 'A', notes: 'OMNI server never sees sync payloads.' }
    ],
    aiVerdict: 'OMNI Sovereign Browser is decisively superior for users requiring confidentiality, integrated autonomous AI productivity, and enterprise-grade isolation without commercial data harvesting.',
    recommendedChoice: 'OMNI Sovereign Browser',
    generatedAt: '2026-08-16T07:44:00Z'
  }
};

export const SEED_BROWSER_RESEARCH_REPORTS: any[] = [
  {
    id: 'res_rep_01',
    topic: 'Next-Generation Sovereign AI Architecture and On-Device Inference Trends 2026',
    hypothesis: 'Modern enterprise workloads are transitioning from centralized cloud API calls toward hybrid on-device / sovereign enclave AI routing due to data privacy regulations and latency constraints.',
    status: 'completed',
    depth: 'deep',
    executiveSummary: 'Comprehensive synthesis of 18 industry whitepapers, academic preprints, and market analyses revealing a 64% year-over-year increase in enterprise deployments of local/enclave-routed AI inference.',
    keyFindings: [
      'Hybrid routing architectures reduce average token costs by 48% while maintaining 99.4% task accuracy.',
      'Strict sovereignty compliance (GDPR/HIPAA/EU AI Act) is driving enterprise adoption of client-side Wasm and private BYOM inference nodes.',
      'Multi-agent consensus arbitration reduces hallucination rates from 8.2% to under 0.6% in critical decision pathways.',
      'Hardware advancements in Apple Silicon M-series and Snapdragon X Elite enable 40+ tokens/sec on 70B parameter quantized models directly on edge devices.'
    ],
    consensusMatrix: [
      {
        claim: 'Local quantized models (4-bit / 8-bit) match FP16 model utility for 85%+ of day-to-day knowledge work.',
        level: 'broad_consensus',
        supportingSourcesCount: 14,
        opposingSourcesCount: 1,
        summary: 'Empirical benchmarks across MMLU-Pro and HumanEval confirm parity for common summarization and coding tasks.'
      },
      {
        claim: 'Centralized public cloud LLM APIs present insurmountable compliance risk for confidential legal/medical workloads.',
        level: 'emerging_agreement',
        supportingSourcesCount: 11,
        opposingSourcesCount: 3,
        summary: 'Enterprises require cryptographic zero-data-retention guarantees or air-gapped sovereign VPC nodes.'
      },
      {
        claim: 'Autonomous browser agents can safely execute multi-step financial transactions without human verification.',
        level: 'active_controversy',
        supportingSourcesCount: 2,
        opposingSourcesCount: 12,
        summary: 'Consensus firmly requires explicit dual-factor human-in-the-loop authorization before executing financial settlement or purchases.'
      }
    ],
    detailedAnalysisSections: [
      {
        heading: '1. The Rise of Sovereign AI Orchestration',
        contentMarkdown: 'Enterprise architectures in 2026 have moved beyond single-vendor dependencies. Autonomous routers dynamically arbitrate between first-party models (such as Gemini 2.5), open-weights models (Llama 3.3), and local enclaves based on real-time cost, latency, and confidentiality parameters.',
        sourceIds: ['src_01', 'src_02']
      },
      {
        heading: '2. Cryptographic Memory Isolation & Agent Safety',
        contentMarkdown: 'When AI assistants browse live pages, indirect prompt injection presents a major attack vector. OMNI Sovereign Browser tackles this by running DOM parsing and LLM inference inside isolated WebAssembly memory spaces with strict capability-based access controls.',
        sourceIds: ['src_03', 'src_04']
      }
    ],
    sourcesGathered: [
      {
        id: 'src_01',
        title: 'State of Sovereign Enterprise AI 2026',
        url: 'https://techcrunch.com/2026/08/sovereign-ai-report',
        domain: 'techcrunch.com',
        relevanceScore: 98,
        credentialTier: 'verified_news',
        keyQuote: 'Enterprises are migrating en masse to sovereign AI fabrics that eliminate vendor lock-in and guarantee confidential data isolation.',
        authorOrOrg: 'TechCrunch Enterprise Analytics'
      },
      {
        id: 'src_02',
        title: 'arXiv:2608.10921 — Edge-Sandboxed Browser Agent Inference',
        url: 'https://arxiv.org/abs/2608.10921',
        domain: 'arxiv.org',
        relevanceScore: 95,
        credentialTier: 'peer_reviewed',
        keyQuote: 'Memory-isolated enclaves reduce side-channel leakage to zero during multi-agent browser task execution.',
        authorOrOrg: 'DeepMind / OMNI Research'
      },
      {
        id: 'src_03',
        title: 'NIST Guidelines on Autonomous Agent Cryptographic Governance',
        url: 'https://csrc.nist.gov/publications/detail/sp/800-224/draft',
        domain: 'nist.gov',
        relevanceScore: 91,
        credentialTier: 'official_spec',
        keyQuote: 'Human approval gates must remain strictly non-bypassable for transactions carrying financial or legal liability.',
        authorOrOrg: 'National Institute of Standards & Technology'
      }
    ],
    recommendedActions: [
      'Configure Sovereign Intelligence Router with Balanced profile as default',
      'Enable Multi-Model Consensus for critical corporate research queries',
      'Export comprehensive synthesis into OMNI Docs for executive review'
    ],
    exportedToOmniDocs: false,
    createdAt: '2026-08-16T07:20:00Z',
    tokensConsumed: 4820,
    costUsd: 0.0034
  }
];

export const SEED_BROWSER_SHOPPING_ANALYSES: any[] = [
  {
    id: 'shop_01',
    url: 'https://store.omni.com/hardware/sovereign-key-yubi-v5',
    productName: 'OMNI Sovereign Enclave Hardware Security Key (Dual NFC + USB-C)',
    currentPrice: 89.00,
    originalPrice: 119.00,
    currency: 'USD',
    dealRating: 'excellent_deal',
    discountPercentage: 25,
    sellerName: 'OMNI Hardware Labs & Security Enclaves (Official Store)',
    sellerTrustScore: 99,
    productCategory: 'Hardware Security / FIDO2 Passkeys',
    specsSummary: {
      'Interface': 'USB-C & Contactless NFC',
      'Cryptographic Algorithms': 'Ed25519, RSA 4096, ECDSA P-256/P-384',
      'Standards Supported': 'FIDO2 / WebAuthn, OMNI Sovereign DID, OpenPGP',
      'Water & Shock Resistance': 'IP68 Certified (Submersible to 3m)',
      'Secure Enclave Certification': 'FIPS 140-3 Level 3 Physical Tamper Resistance'
    },
    pros: [
      'Zero-battery design with virtually indestructible anodized titanium casing',
      'Instant native pairing with OMNI Passport and OMNI Browser workspaces',
      '25% seasonal promotion (historic low price for titanium edition)',
      'Verified zero supply-chain tampering certificate included with shipment'
    ],
    cons: [
      'Requires USB-C port or NFC-capable device (legacy USB-A adapter sold separately)',
      'High initial setup security ceremony for backup key generation'
    ],
    reviewIntelligence: {
      authenticityScore: 98,
      sentimentScore: 94,
      totalReviewsAnalyzed: 1420,
      verifiedPurchasersRatio: 0.96,
      commonPraise: [
        'Unmatched build quality and ultra-fast touch response under 80ms',
        'Flawless integration with OMNI Browser biometrics and passwordless login',
        'Clean, elegant industrial design'
      ],
      commonComplaints: [
        'Keychain loop is slightly narrow for heavy-duty carabiners'
      ],
      recurringDefectWarnings: []
    },
    priceHistory: [
      { date: '2026-05-01', price: 119.00, seller: 'OMNI Official' },
      { date: '2026-06-15', price: 109.00, seller: 'OMNI Official' },
      { date: '2026-07-20', price: 119.00, seller: 'OMNI Official' },
      { date: '2026-08-16', price: 89.00, seller: 'OMNI Official (Flash Sale)' }
    ],
    availableCoupons: [
      { code: 'SOVEREIGN25', discountDesc: '25% Off Hardware Keys', verifiedSuccessRate: 100 },
      { code: 'FREESHIP2026', discountDesc: 'Complimentary Insured Courier Delivery', verifiedSuccessRate: 98 }
    ],
    alternativeProducts: [
      {
        name: 'YubiKey 5C NFC',
        url: 'https://yubico.com/yubikey-5c-nfc',
        price: 75.00,
        comparisonNote: 'Industry standard, but lacks titanium housing and native OMNI Sovereign DID enclave synchronization.'
      },
      {
        name: 'Google Titan Security Key',
        url: 'https://store.google.com/titan-security-key',
        price: 60.00,
        comparisonNote: 'Lower cost, plastic chassis, no Ed25519 or decentralized DID support.'
      }
    ],
    buyingVerdict: 'Highly recommended purchase at current 25% discount ($89.00). Offers superior cryptographic durability and seamless sovereign multi-device authentication.',
    purchaseRequest: {
      status: 'awaiting_user_confirmation',
      authorizedAmount: 89.00,
      currency: 'USD',
      merchant: 'OMNI Hardware Labs & Security Enclaves',
      deliveryAddressHash: 'addr_hash_99a8b1c4e72f',
      confirmedAt: undefined,
      userSignatureToken: undefined
    }
  }
];

export const SEED_BROWSER_CONTENT_CREATIONS: any[] = [
  {
    id: 'create_01',
    sourceUrl: 'https://omni.com',
    sourceTitle: 'OMNI Ecosystem Hub - Sovereign Gateway',
    targetFormat: 'social_posts',
    socialPosts: {
      xTwitter: '🚀 The web was built for openness, but turned into a surveillance labyrinth. OMNI Browser restores digital sovereignty with native zero-telemetry containers, multi-agent AI research, and encrypted sync.\n\nBrowse without compromise: omni.com\n\n#SovereignTech #PrivacyFirst #AI2026 #Web3',
      linkedIn: 'Excited to share a major milestone in digital sovereignty: the release of OMNI Browser.\n\nTraditional commercial browsers treat users as ad-monetization telemetry streams. OMNI reimagines the browser as a hardened personal operating enclave:\n\n🔹 Multi-agent AI Assistant for deep research, cross-tab comparison & content generation\n🔹 Cryptographically isolated container workspaces\n🔹 Zero telemetry, zero tracking by design\n🔹 Zero-knowledge encrypted sync\n\nExplore the architecture: https://omni.com\n\n#ArtificialIntelligence #CyberSecurity #DataPrivacy #SovereignComputing',
      threads: 'Why settle for browsers that harvest your data when you can have an AI-powered sovereign enclave? 🌐\n\nOMNI Browser isolates every workflow, blocks 100% of telemetry, and integrates deep AI page understanding directly in your session. Link in bio!',
      bluesky: 'Tired of browsers phoning home with every keystroke? OMNI Sovereign Browser runs on zero telemetry with native container tabs and local AI assistants. 🛡️ omni.com'
    },
    sentToOmniAiCreate: false,
    createdAt: '2026-08-16T07:30:00Z'
  }
];

export const DEFAULT_BROWSER_VOICE_STATE = {
  isListening: false,
  isSpeaking: false,
  transcript: '',
  liveAudioLevel: 0,
  selectedVoice: 'Sovereign Iris (Neural Natural)',
  speakingRate: 1.0,
  speakingPitch: 1.0,
  supportedVoices: [
    'Sovereign Iris (Neural Natural)',
    'Sovereign Orion (Deep Analytical)',
    'Sovereign Lyra (Clear Concise)',
    'Sovereign Nova (Warm Conversational)'
  ],
  lastVoiceCommandRecognized: undefined,
  lastAiSpokenResponse: undefined
};

export const SEED_BROWSER_COMMAND_ITEMS = [
  {
    id: 'cmd_summarize',
    title: 'Summarise this page',
    subtitle: 'Generate an executive summary, key insights, and extracted data points',
    icon: 'Sparkles',
    category: 'page_understanding',
    shortcut: '⌘S',
    actionType: 'summarize_page',
    presetPrompt: 'Summarise the key findings, actionable takeaways, and architecture of this webpage.'
  },
  {
    id: 'cmd_explain_article',
    title: 'Explain this article',
    subtitle: 'Break down complex concepts for executive or technical understanding',
    icon: 'BookOpen',
    category: 'page_understanding',
    shortcut: '⌘E',
    actionType: 'explain_article',
    presetPrompt: 'Explain the core thesis and practical implications of this page in simple, crystal-clear terms.'
  },
  {
    id: 'cmd_extract_data',
    title: 'Extract structured data & entities',
    subtitle: 'Extract statistics, prices, people, companies, and date metrics into a structured table',
    icon: 'Table',
    category: 'page_understanding',
    shortcut: '⌘X',
    actionType: 'extract_data',
    presetPrompt: 'Extract all data metrics, numerical statistics, key entities, and dates from this webpage into a structured table.'
  },
  {
    id: 'cmd_compare_tabs',
    title: 'Compare this page with active tabs',
    subtitle: 'Create a side-by-side feature and spec comparison matrix',
    icon: 'Columns',
    category: 'page_understanding',
    shortcut: '⌘C',
    actionType: 'compare_tabs',
    presetPrompt: 'Compare this active webpage with other open tabs and produce a comprehensive feature matrix and verdict.'
  },
  {
    id: 'cmd_translate',
    title: 'Translate page',
    subtitle: 'Translate page content into Spanish, Mandarin, German, French, Japanese, or Arabic',
    icon: 'Languages',
    category: 'page_understanding',
    shortcut: '⌘T',
    actionType: 'translate_page',
    presetPrompt: 'Translate the main contents of this page into fluent, professional Spanish.'
  },
  {
    id: 'cmd_research_topic',
    title: 'Start Deep Research',
    subtitle: 'Gather verified sources, synthesize reports, and build a consensus matrix',
    icon: 'Compass',
    category: 'research',
    shortcut: '⌘R',
    actionType: 'start_research',
    presetPrompt: 'Research this topic: analyze sovereign AI edge architecture and on-device inference.'
  },
  {
    id: 'cmd_shopping_intel',
    title: 'Analyze product & reviews',
    subtitle: 'Compare price history, analyze fake review ratio, and inspect specs before buying',
    icon: 'ShoppingBag',
    category: 'shopping',
    shortcut: '⌘P',
    actionType: 'shopping_analysis',
    presetPrompt: 'Analyze this product: verify review authenticity, evaluate price competitiveness, and check for available coupons.'
  },
  {
    id: 'cmd_create_social',
    title: 'Generate social media posts',
    subtitle: 'Create formatted posts for X/Twitter, LinkedIn, Threads, and Bluesky',
    icon: 'Share2',
    category: 'creation',
    shortcut: '⌘G',
    actionType: 'create_social_posts',
    presetPrompt: 'From this webpage, draft engaging and insightful social posts for X/Twitter, LinkedIn, Threads, and Bluesky.'
  },
  {
    id: 'cmd_create_newsletter',
    title: 'Draft newsletter edition',
    subtitle: 'Create an editorial newsletter issue with key insights and commentary',
    icon: 'Mail',
    category: 'creation',
    shortcut: '⌘N',
    actionType: 'create_newsletter',
    presetPrompt: 'Draft an editorial newsletter issue based on this webpage with subject lines, executive summary, and curator take.'
  },
  {
    id: 'cmd_create_video_script',
    title: 'Generate video script',
    subtitle: 'Produce a timed script with hooks, visual cues, and narration',
    icon: 'Video',
    category: 'creation',
    shortcut: '⌘V',
    actionType: 'create_video_script',
    presetPrompt: 'Generate a high-retention video script from this article with timestamps, visual directions, and narration voiceover.'
  },
  {
    id: 'cmd_voice_assistant',
    title: 'Voice Assistant & Dictation',
    subtitle: 'Speak commands or listen to conversational page summaries',
    icon: 'Mic',
    category: 'voice',
    shortcut: '⌘M',
    actionType: 'toggle_voice',
    presetPrompt: 'Listen to page summary read aloud with neural speech synthesis.'
  }
];


