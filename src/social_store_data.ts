import {
  SocialAccount,
  SocialPost,
  SocialComment,
  SocialCompetitor,
  SocialAiAgent,
  SocialPlatformMetrics
} from './types/social_hub';

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'acc-x-omni',
    platform: 'x',
    displayName: 'OMNI Sovereign OS',
    handle: '@OmniSovereign',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 248900,
    followingCount: 412,
    postsCount: 1840,
    engagementRate: 5.6,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Twitter API v2 Enterprise',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access', 'dm.read'],
    tokenExpiresAt: '2026-11-20T12:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    apiRateLimitRemaining: 8940,
    apiRateLimitTotal: 10000,
    complianceNotes: 'Official X Developer Enterprise Tier. Rate limits auto-throttled to maintain 100% compliance with X Developer Agreement.'
  },
  {
    id: 'acc-linkedin-omni',
    platform: 'linkedin',
    displayName: 'OMNI Platform Technologies',
    handle: 'company/omni-platform',
    avatarUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 184200,
    postsCount: 620,
    engagementRate: 7.2,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Community Management API v2026',
    scopes: ['w_member_social', 'r_organization_social', 'w_organization_social', 'rw_organization_admin'],
    tokenExpiresAt: '2026-12-15T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    apiRateLimitRemaining: 4800,
    apiRateLimitTotal: 5000,
    complianceNotes: 'Official LinkedIn Partner API. No unauthorized user profile scraping.'
  },
  {
    id: 'acc-instagram-omni',
    platform: 'instagram',
    displayName: 'OMNI Browser & Ecosystem',
    handle: '@omni.sovereign',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 512000,
    followingCount: 190,
    postsCount: 940,
    engagementRate: 6.8,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Meta Graph API v20.0 (Instagram Professional)',
    scopes: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'instagram_manage_insights'],
    tokenExpiresAt: '2026-10-30T10:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    apiRateLimitRemaining: 192,
    apiRateLimitTotal: 200,
    complianceNotes: 'Verified Instagram Business Account via Meta Cloud API.'
  },
  {
    id: 'acc-youtube-omni',
    platform: 'youtube',
    displayName: 'OMNI Intelligence & Engineering',
    handle: '@OmniPlatformOfficial',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 395000,
    postsCount: 310,
    engagementRate: 8.4,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'YouTube Data API v3 & YouTube Studio Partner',
    scopes: ['youtube.upload', 'youtube.readonly', 'youtube.force-ssl', 'youtubepartner'],
    tokenExpiresAt: '2026-10-18T18:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    apiRateLimitRemaining: 94000,
    apiRateLimitTotal: 100000,
    complianceNotes: 'OAuth 2.0 Client credentials with direct video upload & community post permissions.'
  },
  {
    id: 'acc-tiktok-omni',
    platform: 'tiktok',
    displayName: 'OMNI Tech & Future',
    handle: '@omni.future',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 840000,
    followingCount: 85,
    postsCount: 490,
    engagementRate: 11.2,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'TikTok Content Posting API & Commercial API v2',
    scopes: ['video.upload', 'video.publish', 'user.info.basic', 'comment.list', 'comment.reply'],
    tokenExpiresAt: '2026-09-25T14:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    apiRateLimitRemaining: 1840,
    apiRateLimitTotal: 2000,
    complianceNotes: 'Direct TikTok Creator Partner integration with Spark Ads compliance.'
  },
  {
    id: 'acc-threads-omni',
    platform: 'threads',
    displayName: 'OMNI Sovereign OS',
    handle: '@omni.sovereign',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 168000,
    followingCount: 140,
    postsCount: 420,
    engagementRate: 6.1,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Meta Threads API v1.0',
    scopes: ['threads_basic', 'threads_content_publish', 'threads_read_replies', 'threads_manage_replies'],
    tokenExpiresAt: '2026-11-12T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    apiRateLimitRemaining: 240,
    apiRateLimitTotal: 250,
    complianceNotes: 'Official Meta Threads Publishing API with automatic replies webhook integration.'
  },
  {
    id: 'acc-facebook-omni',
    platform: 'facebook',
    displayName: 'OMNI Operating System',
    handle: 'omni.sovereign.os',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 310000,
    postsCount: 880,
    engagementRate: 4.3,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Meta Graph API v20.0 (Pages)',
    scopes: ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts', 'pages_manage_metadata'],
    tokenExpiresAt: '2026-12-01T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    apiRateLimitRemaining: 1900,
    apiRateLimitTotal: 2000,
    complianceNotes: 'Official Facebook Business Page token with automatic webhook events.'
  },
  {
    id: 'acc-pinterest-omni',
    platform: 'pinterest',
    displayName: 'OMNI Design & Architecture',
    handle: 'omni_architecture',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 94000,
    postsCount: 1200,
    engagementRate: 4.9,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Pinterest API v5',
    scopes: ['boards:read', 'boards:write', 'pins:read', 'pins:write', 'user_accounts:read'],
    tokenExpiresAt: '2026-11-15T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    apiRateLimitRemaining: 980,
    apiRateLimitTotal: 1000,
    complianceNotes: 'Official Pinterest Developer App. Direct Rich Pin & Idea Pin creation enabled.'
  },
  {
    id: 'acc-telegram-omni',
    platform: 'telegram',
    displayName: 'OMNI Announcements & Alpha',
    handle: 't.me/omni_sovereign_official',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 142000,
    postsCount: 750,
    engagementRate: 14.8,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Telegram Bot API v7.4 (MTProto Gateway)',
    scopes: ['send_messages', 'send_media', 'post_to_channels', 'pin_messages', 'manage_chat'],
    tokenExpiresAt: '2027-01-01T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    apiRateLimitRemaining: 2980,
    apiRateLimitTotal: 3000,
    complianceNotes: 'High-speed encrypted broadcast channel via official Telegram Bot token.'
  },
  {
    id: 'acc-whatsapp-omni',
    platform: 'whatsapp',
    displayName: 'OMNI Enterprise VIP Desk',
    handle: '+1 (800) 555-OMNI',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: true,
    status: 'connected',
    followerCount: 28400,
    postsCount: 140,
    engagementRate: 26.4,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'WhatsApp Cloud API (Meta BSP)',
    scopes: ['whatsapp_business_messaging', 'whatsapp_business_management'],
    tokenExpiresAt: '2026-12-30T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    apiRateLimitRemaining: 9940,
    apiRateLimitTotal: 10000,
    complianceNotes: 'Pre-approved Meta Template messaging for verified opt-in enterprise subscribers.'
  },
  {
    id: 'acc-snapchat-omni',
    platform: 'snapchat',
    displayName: 'OMNI Spotlight Tech',
    handle: 'omni_spotlight',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    verified: false,
    status: 'connected',
    followerCount: 68000,
    postsCount: 220,
    engagementRate: 7.9,
    brandWorkspace: 'OMNI Global Ecosystem',
    officialApiVersion: 'Snapchat Marketing & Creator API v3',
    scopes: ['snapchat-marketing-api', 'creative-kit'],
    tokenExpiresAt: '2026-10-05T00:00:00Z',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    apiRateLimitRemaining: 480,
    apiRateLimitTotal: 500,
    complianceNotes: 'Official Snap Kit Creator integration with Spotlight distribution.'
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    title: 'OMNI Browser Release — Zero-Knowledge Sovereign Gateway',
    primaryContent: '🚀 Introducing OMNI Browser: The world\'s first sovereign AI-native web operating system with zero-knowledge encrypted vaults, multi-hop privacy tunnels, and autonomous AI agents.\n\nBrowse without telemetry. Build without limits.\n\n👇 Read the full architectural breakdown:',
    platformCustomizations: {
      x: {
        content: '🚀 Introducing OMNI Browser: The world\'s first sovereign AI-native web operating system.\n\n• Zero-knowledge encrypted vault\n• Multi-hop privacy tunnels\n• Autonomous AI agents\n\nBrowse without telemetry. Build without limits. 🌐⚡\n\nhttps://omni.com/browser',
        hashtags: ['#SovereignAI', '#PrivacyFirst', '#OMNIBrowser', '#Web3']
      },
      linkedin: {
        content: 'Enterprise AI computing requires a fundamental paradigm shift: moving away from monolithic data-harvesting silos toward verifiable, zero-trust sovereign enclaves.\n\nToday, we are thrilled to unveil OMNI Browser — an AI-powered operating environment designed for modern developers and security-conscious enterprises.\n\nKey architectural pillars:\n1. Client-side encrypted credential vault with zero server knowledge.\n2. Native WebAssembly container isolation per tab.\n3. Sovereign Multi-Agent Copilot directly embedded in the DOM.\n\nRead the full whitepaper: https://arxiv.org/abs/2608.10921',
        hashtags: ['#EnterpriseAI', '#CyberSecurity', '#CloudArchitecture', '#TechInnovation']
      },
      instagram: {
        content: 'The future of browsing is sovereign. 🌐✨\n\nMeet OMNI Browser: Privacy-first. AI-native. Encrypted by default.\n\nTap the link in bio to experience the sovereign digital workspace! 🚀',
        hashtags: ['#TechNews', '#AI', '#CyberSecurity', '#FutureOfTech', '#OMNISovereign']
      },
      tiktok: {
        content: 'This new AI browser changes EVERYTHING about digital privacy 🔥🤯 Check out how it blocks 100% of trackers in real time! #tech #techtok #ai #browser #coding',
        hashtags: ['#techtok', '#tech', '#ai', '#privacy', '#software']
      },
      youtube: {
        content: 'OMNI Browser: Full System Architecture & Live Demo (2026 Deep Dive)\n\nIn this walkthrough, we examine how OMNI enforces zero-telemetry browsing while running multimodal AI models locally and across sovereign clouds.\n\nChapters:\n00:00 Introduction\n02:15 Zero-Knowledge Vault\n05:40 Multi-Hop VPN Engine\n09:30 OMNI AI Copilot',
        hashtags: ['#SoftwareEngineering', '#AIArchitecture', '#Demo']
      },
      telegram: {
        content: '📢 **OMNI Browser v2.4 Officially Released!**\n\n• Sovereign WebAssembly Sandbox Enclaves\n• Zero-Telemetry Private DNS-over-HTTPS\n• Integrated Multi-Channel Social Hub\n\nDownload updates directly via verified sovereign hash: https://omni.com/download'
      }
    },
    targetAccountIds: ['acc-x-omni', 'acc-linkedin-omni', 'acc-instagram-omni', 'acc-tiktok-omni', 'acc-youtube-omni', 'acc-telegram-omni'],
    targetPlatforms: ['x', 'linkedin', 'instagram', 'tiktok', 'youtube', 'telegram'],
    mediaType: 'video',
    mediaUrls: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    status: 'published',
    scheduledFor: '2026-08-16T14:00:00Z',
    publishedAt: '2026-08-16T14:00:05Z',
    createdAt: '2026-08-15T09:30:00Z',
    updatedAt: '2026-08-16T14:00:05Z',
    authorName: 'Alex Thorne (Chief Product)',
    brandWorkspace: 'OMNI Global Ecosystem',
    campaignTag: 'Browser Launch 2026',
    isAiGenerated: true,
    aiPromptUsed: 'Draft an exciting cross-platform launch announcement highlighting sovereign AI, zero-knowledge vaults, and privacy-first engineering.',
    approvalStatus: 'approved',
    performance: {
      impressions: 482900,
      reach: 341000,
      likes: 24800,
      comments: 1420,
      shares: 6150,
      clicks: 19400,
      saves: 4890,
      videoViews: 218000,
      engagementRate: 7.8
    }
  },
  {
    id: 'post-2',
    title: 'Double-Entry Accounting for Autonomous AI Agents',
    primaryContent: 'Why do autonomous AI agents need cryptographic double-entry accounting ledgers? 🤖💸\n\nWhen AI agents execute tools, purchase compute, or book flights on your behalf, traditional billing APIs fail to prevent drift and unauthorized spending.\n\nHere is how OMNI Pay solves autonomous micro-settlement with mathematical certainty 🧵👇',
    platformCustomizations: {
      x: {
        content: 'Why autonomous AI agents need double-entry ledgers (not credit cards) 🤖💳\n\nWhen AI executes API tools or triggers cloud compute, single-entry logs cause catastrophic billing drift.\n\nHere is our 4-point architecture for verifiable AI transaction proofs 🧵👇',
        hashtags: ['#Fintech', '#AI', '#SystemArchitecture', '#CryptoLedger']
      },
      linkedin: {
        content: 'Managing financial risk in autonomous multi-agent environments is the next frontier of enterprise infrastructure.\n\nIn our latest technical paper, we demonstrate how strict double-entry cryptographic ledgers ensure every automated token exchange and compute transaction is mathematically reconciled before execution.\n\nAre your agentic workflows audit-proof?',
        hashtags: ['#FinancialEngineering', '#AutonomousAI', '#EnterpriseSoftware']
      }
    },
    targetAccountIds: ['acc-x-omni', 'acc-linkedin-omni', 'acc-threads-omni'],
    targetPlatforms: ['x', 'linkedin', 'threads'],
    mediaType: 'carousel',
    mediaUrls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // 4 hours from now
    createdAt: '2026-08-16T18:00:00Z',
    updatedAt: '2026-08-17T00:30:00Z',
    authorName: 'Elena Rostova (Head of Fintech)',
    brandWorkspace: 'OMNI Global Ecosystem',
    campaignTag: 'OMNI Pay Thought Leadership',
    isAiGenerated: true,
    aiPromptUsed: 'Explain double-entry bookkeeping for AI compute with high clarity and compelling technical hooks.',
    approvalStatus: 'approved'
  },
  {
    id: 'post-3',
    title: 'Top 5 AI Extensions for Productivity in 2026',
    primaryContent: 'Supercharge your daily workflow with these 5 must-have AI extensions on the OMNI Extension Store! ⚡\n\n1. Deep Research Synthesizer\n2. Real-Time TLS Packet Decryptor\n3. Sovereign Meeting Scribe\n4. Code Review Sentinel\n5. Multi-Channel Social Hub\n\nWhich one is your daily driver?',
    platformCustomizations: {
      instagram: {
        content: 'Level up your browser workflow with these 5 powerful tools! 🚀💻\n\nSwipe left to see our top picks for 2026 👉\n\nWhich tool would save you the most hours this week? Let us know in the comments!',
        hashtags: ['#ProductivityHacks', '#DeveloperTools', '#AIApps', '#CodingLife']
      },
      pinterest: {
        content: 'Best Productivity Extensions for Developers & Designers in 2026. Clean workspace setup with zero-lag AI tools.',
        hashtags: ['#workspace', '#developer', '#productivity', '#minimaltech']
      }
    },
    targetAccountIds: ['acc-instagram-omni', 'acc-pinterest-omni', 'acc-threads-omni'],
    targetPlatforms: ['instagram', 'pinterest', 'threads'],
    mediaType: 'carousel',
    mediaUrls: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    status: 'scheduled',
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString(), // Tomorrow
    createdAt: '2026-08-16T20:15:00Z',
    updatedAt: '2026-08-16T20:15:00Z',
    authorName: 'Marcus Vance (Community Lead)',
    brandWorkspace: 'OMNI Global Ecosystem',
    campaignTag: 'Store Highlights',
    isAiGenerated: false,
    approvalStatus: 'approved'
  },
  {
    id: 'post-4',
    title: 'Behind the Scenes: How We Built 99.98% Prompt Injection Mitigation',
    primaryContent: 'Drafting our deep-dive engineering blog on four-tier WebAssembly sandboxing and deterministic output validators.',
    platformCustomizations: {},
    targetAccountIds: ['acc-x-omni', 'acc-linkedin-omni'],
    targetPlatforms: ['x', 'linkedin'],
    mediaType: 'text',
    mediaUrls: [],
    status: 'draft',
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    createdAt: '2026-08-17T00:10:00Z',
    updatedAt: '2026-08-17T00:10:00Z',
    authorName: 'Dr. Evelyn Vance (Chief AI Scientist)',
    brandWorkspace: 'OMNI Global Ecosystem',
    campaignTag: 'Security Whitepapers',
    isAiGenerated: false,
    approvalStatus: 'pending'
  }
];

export const INITIAL_SOCIAL_COMMENTS: SocialComment[] = [
  {
    id: 'comm-1',
    postId: 'post-1',
    postTitleOrSnippet: 'OMNI Browser Release — Zero-Knowledge Sovereign Gateway',
    platform: 'x',
    accountId: 'acc-x-omni',
    authorName: 'Sarah Jenkins',
    authorHandle: '@s_jenkins_dev',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    content: 'Does the zero-knowledge password vault support biometric passkeys across Android and iOS out of the box?',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    likesCount: 38,
    sentiment: 'question',
    sentimentScore: 0.85,
    status: 'unread',
    isPriority: true,
    replies: [],
    suggestedAiReply: 'Yes! OMNI Vault fully supports FIDO2 WebAuthn passkeys with biometric hardware keys on iOS (Touch/Face ID), Android (Fingerprint), and desktop TPM enclaves with zero cloud password storage.',
    platformUrl: 'https://x.com/omni_sovereign/status/19823719283'
  },
  {
    id: 'comm-2',
    postId: 'post-1',
    postTitleOrSnippet: 'OMNI Browser Release — Zero-Knowledge Sovereign Gateway',
    platform: 'linkedin',
    accountId: 'acc-linkedin-omni',
    authorName: 'David Chen',
    authorHandle: 'david-chen-cto',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    content: 'Incredible achievement. The emphasis on strict multi-tenant container isolation solves our biggest compliance barrier with enterprise AI adoption. Will definitely test the enterprise DLP rules.',
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    likesCount: 19,
    sentiment: 'positive',
    sentimentScore: 0.96,
    status: 'replied',
    isPriority: false,
    replies: [
      {
        id: 'reply-1',
        authorName: 'OMNI Platform Technologies',
        authorHandle: 'company/omni-platform',
        authorAvatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80',
        content: 'Thank you David! Our enterprise team is happy to provide a dedicated POC sandbox for your security auditors anytime.',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        isAiGenerated: true,
        publishedViaApi: true
      }
    ],
    platformUrl: 'https://linkedin.com/feed/update/urn:li:activity:7198273891'
  },
  {
    id: 'comm-3',
    postId: 'post-1',
    postTitleOrSnippet: 'OMNI Browser Release — Zero-Knowledge Sovereign Gateway',
    platform: 'youtube',
    accountId: 'acc-youtube-omni',
    authorName: 'CodeWithTechie',
    authorHandle: '@CodeWithTechie',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    content: 'How does the multi-hop VPN maintain low latency during 4K streaming or live video calls?',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    likesCount: 54,
    sentiment: 'question',
    sentimentScore: 0.78,
    status: 'unread',
    isPriority: true,
    replies: [],
    suggestedAiReply: 'OMNI Multi-Hop uses WireGuard-accelerated UDP tunnels with dynamic kernel-bypass routing (eBPF). Packet routing selects low-jitter nodes dynamically to maintain <25ms overhead even under high throughput.',
    platformUrl: 'https://youtube.com/watch?v=omni_browser_arch'
  },
  {
    id: 'comm-4',
    postId: 'post-1',
    postTitleOrSnippet: 'OMNI Browser Release — Zero-Knowledge Sovereign Gateway',
    platform: 'tiktok',
    accountId: 'acc-tiktok-omni',
    authorName: 'maya_builds',
    authorHandle: '@maya_builds',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    content: 'Just tried the AI reader mode on a 40-page research paper and the executive summary was chef\'s kiss 🤌🔥 Need this on mobile ASAP!!',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    likesCount: 142,
    sentiment: 'positive',
    sentimentScore: 0.98,
    status: 'read',
    isPriority: false,
    replies: [],
    suggestedAiReply: 'Glad you loved it Maya! Mobile companion app is in active alpha testing — stay tuned for the public flight test link!',
    platformUrl: 'https://tiktok.com/@omni.future/video/7391823910'
  },
  {
    id: 'comm-5',
    postId: 'post-1',
    postTitleOrSnippet: 'OMNI Browser Release — Zero-Knowledge Sovereign Gateway',
    platform: 'x',
    accountId: 'acc-x-omni',
    authorName: 'CryptoBot_99',
    authorHandle: '@airdrop_promo_99',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    content: 'Claim free $10,000 crypto airdrop click my link telegram.me/fake_airdrop_scam immediately!!',
    timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    likesCount: 0,
    sentiment: 'spam',
    sentimentScore: 0.05,
    status: 'flagged',
    isPriority: false,
    replies: [],
    suggestedAiReply: 'Spam detected. Auto-hide and block user recommended.',
    platformUrl: 'https://x.com/omni_sovereign/status/19823719283'
  }
];

export const INITIAL_COMPETITORS: SocialCompetitor[] = [
  {
    id: 'comp-1',
    name: 'Brave Software',
    handle: '@brave',
    platform: 'x',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    followerCount: 310000,
    followerGrowthRate30d: 2.1,
    postingFrequencyWeekly: 14,
    avgEngagementRate: 3.4,
    topHashtags: ['#BraveBrowser', '#Web3', '#Privacy', '#Crypto'],
    recentViralPost: {
      content: 'Shields up! Block trackers and save battery life with Brave v1.68 released today.',
      publishedAt: '2026-08-14T16:00:00Z',
      likes: 1240,
      comments: 98,
      shares: 340,
      estimatedReach: 85000,
      contentType: 'post'
    },
    aiTeardownAnalysis: {
      contentStrategySummary: 'Focuses heavily on general consumer privacy metrics, crypto token rewards, and basic ad-blocking stats.',
      identifiedWeakness: 'Under-indexes on enterprise AI workflows, autonomous agent capabilities, and sovereign developer toolchains.',
      counterStrategyOpportunity: 'Position OMNI as the Next-Generation Sovereign AI OS — not just an ad blocker, but a complete autonomous intelligence suite for creators and engineers.',
      suggestedHookIdeas: [
        'Why standard ad-blockers can\'t protect you against AI prompt harvesting',
        'How OMNI combines zero-telemetry browsing with locally-executed AI agents',
        'From private browsing to sovereign operating systems: the 2026 shift'
      ]
    }
  },
  {
    id: 'comp-2',
    name: 'Arc / The Browser Company',
    handle: '@browsercompany',
    platform: 'youtube',
    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80',
    followerCount: 220000,
    followerGrowthRate30d: 3.8,
    postingFrequencyWeekly: 3,
    avgEngagementRate: 6.2,
    topHashtags: ['#Design', '#UIUX', '#Productivity', '#MacApps'],
    recentViralPost: {
      content: 'How we designed the future of web navigation with fluid split screens and AI summaries.',
      publishedAt: '2026-08-10T19:00:00Z',
      likes: 8900,
      comments: 610,
      shares: 1400,
      estimatedReach: 195000,
      contentType: 'short'
    },
    aiTeardownAnalysis: {
      contentStrategySummary: 'Polished aesthetic product storytelling, high-fidelity UI animations, and designer-focused founder vlogs.',
      identifiedWeakness: 'Lacks deep infrastructure proofs (cryptographic ledgers, double-entry financial settlements, cross-platform Linux/Windows parity).',
      counterStrategyOpportunity: 'Publish high-aesthetic videos that highlight OMNI\'s enterprise security depth alongside sleek modern UI design.',
      suggestedHookIdeas: [
        'What happens when beautiful UX meets military-grade cryptographic zero-knowledge enclaves?',
        'The architecture behind instant split-screen AI reasoning inside OMNI Browser'
      ]
    }
  },
  {
    id: 'comp-3',
    name: 'Perplexity AI',
    handle: '@perplexity_ai',
    platform: 'tiktok',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    followerCount: 650000,
    followerGrowthRate30d: 14.5,
    postingFrequencyWeekly: 21,
    avgEngagementRate: 8.9,
    topHashtags: ['#Perplexity', '#SearchEngine', '#AIResearch', '#StudyTok'],
    recentViralPost: {
      content: 'Stop using traditional search engines for your thesis — use cited AI grounding instead! 📚🤯',
      publishedAt: '2026-08-15T12:30:00Z',
      likes: 48900,
      comments: 1100,
      shares: 14200,
      estimatedReach: 620000,
      contentType: 'reel'
    },
    aiTeardownAnalysis: {
      contentStrategySummary: 'Rapid-fire TikTok search query comparisons, student study hacks, and viral search demonstrations.',
      identifiedWeakness: 'Reliance on centralized cloud LLM providers without user-owned sovereign key enclaves.',
      counterStrategyOpportunity: 'Highlight OMNI\'s zero-logging grounded search with private offline-first vector indexing that never trains on user research.',
      suggestedHookIdeas: [
        'The search engine that cites real arXiv papers without selling your query history to ad brokers',
        'How researchers are using OMNI Research Library to auto-summarize 100 papers in 3 minutes'
      ]
    }
  }
];

export const INITIAL_SOCIAL_AGENTS: SocialAiAgent[] = [
  {
    id: 'agent-caption-crafter',
    name: 'Viral Hook & Caption Crafter',
    role: 'Multimodal Copywriting Engine',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    badge: 'Content Agent',
    description: 'Generates high-retention hooks, platform-optimized captions, tailored hashtag clusters, and CTA variations across all 11 social networks.',
    status: 'active',
    autonomousPermissions: ['generate_variations', 'optimize_character_limits', 'hashtag_research'],
    actionsExecutedCount: 342,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    recentActivity: [
      {
        id: 'act-1',
        timestamp: '10m ago',
        action: 'Generated 4 LinkedIn Thought Leadership variations for Post #182',
        impact: '+24% Predicted Engagement Rate',
        platform: 'linkedin'
      },
      {
        id: 'act-2',
        timestamp: '45m ago',
        action: 'Optimized TikTok caption hook with retention triggers',
        impact: 'High Viral Probability Score (92/100)',
        platform: 'tiktok'
      }
    ]
  },
  {
    id: 'agent-social-autopilot',
    name: 'Calendar & Scheduler Autopilot',
    role: 'Autonomous Publishing Dispatcher',
    avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80',
    badge: 'Scheduling Agent',
    description: 'Monitors audience activity heatmaps across timezones and auto-reschedules queued drafts into optimal engagement windows.',
    status: 'active',
    autonomousPermissions: ['reschedule_queue', 'rate_limit_throttling', 'multi_timezone_dispatch'],
    actionsExecutedCount: 819,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    recentActivity: [
      {
        id: 'act-3',
        timestamp: '25m ago',
        action: 'Adjusted X Post queue time to match peak European developer activity',
        impact: 'Predicted +38% Impressions Window',
        platform: 'x'
      }
    ]
  },
  {
    id: 'agent-inbox-sentinel',
    name: 'Unified Inbox & Sentiment Sentinel',
    role: 'Real-Time Comment & PR Guardian',
    avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80',
    badge: 'Moderation Agent',
    description: 'Scans inbound comments across all 11 platforms for sentiment, flags high-priority technical questions, auto-suggests replies, and isolates crypto spam.',
    status: 'active',
    autonomousPermissions: ['auto_flag_spam', 'sentiment_scoring', 'draft_ai_replies'],
    actionsExecutedCount: 2190,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    recentActivity: [
      {
        id: 'act-4',
        timestamp: '2m ago',
        action: 'Identified 3 technical questions and prepared cited developer replies',
        impact: 'Average Response Time reduced to 45 seconds',
        platform: 'youtube'
      },
      {
        id: 'act-5',
        timestamp: '18m ago',
        action: 'Auto-flagged crypto scam airdrop comment on X post',
        impact: 'Zero brand reputational risk exposure',
        platform: 'x'
      }
    ]
  },
  {
    id: 'agent-competitor-recon',
    name: 'Competitor Intelligence & Trends Radar',
    role: 'Market Surveillance Engine',
    avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    badge: 'Analytics Agent',
    description: 'Tracks competitor publishing velocity, detects viral content anomalies, and highlights actionable content gaps via AI teardowns.',
    status: 'active',
    autonomousPermissions: ['benchmark_scraping_compliance', 'trend_synthesis', 'gap_opportunity_alerts'],
    actionsExecutedCount: 154,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    recentActivity: [
      {
        id: 'act-6',
        timestamp: '1h ago',
        action: 'Completed 30-day benchmark audit of Brave vs Arc vs OMNI',
        impact: 'Identified 4 untapped high-growth technical topics',
        platform: 'youtube'
      }
    ]
  }
];

export const INITIAL_PLATFORM_METRICS: SocialPlatformMetrics[] = [
  {
    platform: 'tiktok',
    totalFollowers: 840000,
    followerGrowthRate7d: 8.4,
    totalImpressions30d: 4890000,
    totalEngagements30d: 547680,
    avgEngagementRate: 11.2,
    postsPublished30d: 42,
    sharesCount: 94200,
    clicksCount: 88400
  },
  {
    platform: 'instagram',
    totalFollowers: 512000,
    followerGrowthRate7d: 4.6,
    totalImpressions30d: 2940000,
    totalEngagements30d: 199920,
    avgEngagementRate: 6.8,
    postsPublished30d: 28,
    sharesCount: 38900,
    clicksCount: 46200
  },
  {
    platform: 'youtube',
    totalFollowers: 395000,
    followerGrowthRate7d: 5.2,
    totalImpressions30d: 3120000,
    totalEngagements30d: 262080,
    avgEngagementRate: 8.4,
    postsPublished30d: 14,
    sharesCount: 41200,
    clicksCount: 71000
  },
  {
    platform: 'x',
    totalFollowers: 248900,
    followerGrowthRate7d: 3.8,
    totalImpressions30d: 1840000,
    totalEngagements30d: 103040,
    avgEngagementRate: 5.6,
    postsPublished30d: 64,
    sharesCount: 29800,
    clicksCount: 52100
  },
  {
    platform: 'linkedin',
    totalFollowers: 184200,
    followerGrowthRate7d: 6.1,
    totalImpressions30d: 1120000,
    totalEngagements30d: 80640,
    avgEngagementRate: 7.2,
    postsPublished30d: 22,
    sharesCount: 16400,
    clicksCount: 38900
  },
  {
    platform: 'threads',
    totalFollowers: 168000,
    followerGrowthRate7d: 5.9,
    totalImpressions30d: 890000,
    totalEngagements30d: 54290,
    avgEngagementRate: 6.1,
    postsPublished30d: 36,
    sharesCount: 12100,
    clicksCount: 18400
  },
  {
    platform: 'telegram',
    totalFollowers: 142000,
    followerGrowthRate7d: 9.8,
    totalImpressions30d: 980000,
    totalEngagements30d: 145040,
    avgEngagementRate: 14.8,
    postsPublished30d: 48,
    sharesCount: 31200,
    clicksCount: 68400
  },
  {
    platform: 'facebook',
    totalFollowers: 310000,
    followerGrowthRate7d: 1.4,
    totalImpressions30d: 1450000,
    totalEngagements30d: 62350,
    avgEngagementRate: 4.3,
    postsPublished30d: 26,
    sharesCount: 14800,
    clicksCount: 22400
  },
  {
    platform: 'pinterest',
    totalFollowers: 94000,
    followerGrowthRate7d: 2.8,
    totalImpressions30d: 620000,
    totalEngagements30d: 30380,
    avgEngagementRate: 4.9,
    postsPublished30d: 38,
    sharesCount: 8900,
    clicksCount: 29500
  },
  {
    platform: 'whatsapp',
    totalFollowers: 28400,
    followerGrowthRate7d: 12.4,
    totalImpressions30d: 110000,
    totalEngagements30d: 29040,
    avgEngagementRate: 26.4,
    postsPublished30d: 16,
    sharesCount: 7800,
    clicksCount: 19800
  },
  {
    platform: 'snapchat',
    totalFollowers: 68000,
    followerGrowthRate7d: 4.1,
    totalImpressions30d: 410000,
    totalEngagements30d: 32390,
    avgEngagementRate: 7.9,
    postsPublished30d: 20,
    sharesCount: 6400,
    clicksCount: 11200
  }
];
