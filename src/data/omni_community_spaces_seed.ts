import {
  OmniSpace,
  OmniGroup,
  OmniChannel,
  OmniSpaceMember,
  OmniSpaceDiscussionTopic,
  OmniSpaceCourseModule,
  OmniSpaceStoreItem,
  OmniSpaceResourceDoc,
  OmniSpaceMediaItem,
  OmniCommunityReport,
  OmniCommunityAnalytics
} from '../types/omni_community_spaces';

export const SEED_OMNI_SPACES: OmniSpace[] = [
  {
    id: 'space_tech_founders',
    tenantId: 'tenant_global',
    slug: 'tech-founders-guild',
    name: 'Sovereign Tech Founders & Architects',
    tagline: 'Global syndicate of deep-tech engineers, AI researchers and sovereign system builders.',
    description: 'A global high-trust ecosystem for technical founders building next-gen operating systems, distributed ledgers, AI infrastructure and sovereign platforms. Share blueprints, get peer review, co-build and hire top architects.',
    spaceType: 'public',
    category: 'businesses',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    customDomain: 'founders.omnispace.io',
    ownerProfileId: 'prof_gideon',
    membershipTier: 'free',
    subscriptionPriceMonthlyUsd: 0,
    totalMembersCount: 14280,
    activeOnlineCount: 842,
    totalRevenueUsd: 48500,
    donationsTotalUsd: 12400,
    isVerified: true,
    isFeatured: true,
    customTheme: {
      primaryColor: '#6366f1',
      accentColor: '#06b6d4',
      darkCanvas: true
    },
    rules: [
      'Strictly high-signal discussions only. No unsolicited direct pitch spam.',
      'Respect cryptographic privacy and intellectual property standards.',
      'Constructive technical critique and verifiable benchmarks required.',
      'Abide by OMNI sovereign community code of conduct.'
    ],
    tabsEnabled: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'courses', 'store', 'media', 'ai_assistant', 'analytics', 'moderation'],
    aiAssistant: {
      assistantName: 'OmniArchitect AI',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
      systemPrompt: 'You are OmniArchitect AI, the resident expert assistant for Sovereign Tech Founders. Ground your responses in distributed computing, cryptography, high-scale architecture and OMNI ecosystem documentation.',
      welcomeMessageTemplate: 'Welcome to Sovereign Tech Founders, {{name}}! What architecture or venture are you building today?',
      autoModerationEnabled: true,
      toxicityThreshold: 0.85,
      autoWelcomeNewMembers: true,
      groundedResourceIds: ['doc_arch_01', 'doc_arch_02', 'doc_token_01'],
      supportedLanguages: ['English', 'Spanish', 'French', 'Portuguese', 'German', 'Japanese', 'Mandarin']
    },
    crmIntegration: {
      enabled: true,
      autoSyncMembersToLeads: true,
      pipelineStage: 'Qualified Founder Lead'
    },
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-08-19T04:30:00Z'
  },
  {
    id: 'space_ai_academy',
    tenantId: 'tenant_global',
    slug: 'omni-ai-mastery',
    name: 'OMNI AI & Neural Agents Academy',
    tagline: 'Master autonomous multi-agent swarms, LLM orchestration and sovereign neural interfaces.',
    description: 'Comprehensive learning space and collaborative playground for AI practitioners, prompt engineers, ML architects and business automators.',
    spaceType: 'learning',
    category: 'courses',
    avatarUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200',
    customDomain: 'learn.omni-ai.org',
    ownerProfileId: 'prof_elena',
    membershipTier: 'paid',
    subscriptionPriceMonthlyUsd: 29.99,
    totalMembersCount: 8930,
    activeOnlineCount: 520,
    totalRevenueUsd: 184500,
    donationsTotalUsd: 8200,
    isVerified: true,
    isFeatured: true,
    customTheme: {
      primaryColor: '#8b5cf6',
      accentColor: '#ec4899',
      darkCanvas: true
    },
    rules: [
      'Share tested prompts, agent configs and reproducible code snippets.',
      'Credit original model creators and adhere to responsible AI ethics.',
      'Keep discussion supportive for beginner through advanced researchers.'
    ],
    tabsEnabled: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'courses', 'store', 'media', 'ai_assistant', 'analytics'],
    aiAssistant: {
      assistantName: 'NeuralTutor AI',
      avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200',
      systemPrompt: 'You are NeuralTutor AI. You provide step-by-step guidance on building AI agent workflows, function calling, vector databases, and evaluation frameworks.',
      welcomeMessageTemplate: 'Greetings {{name}}! Welcome to OMNI AI Academy. Ready to train your first autonomous agent?',
      autoModerationEnabled: true,
      toxicityThreshold: 0.9,
      autoWelcomeNewMembers: true,
      groundedResourceIds: ['doc_agent_01', 'doc_rag_02'],
      supportedLanguages: ['English', 'German', 'French', 'Hindi', 'Arabic']
    },
    crmIntegration: {
      enabled: true,
      autoSyncMembersToLeads: true,
      pipelineStage: 'Enrolled AI Student'
    },
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-08-19T05:00:00Z'
  },
  {
    id: 'space_global_faith',
    tenantId: 'tenant_global',
    slug: 'sovereign-faith-network',
    name: 'Kingdom Builders Global Fellowship',
    tagline: 'Uniting churches, ministries, leaders and families across nations in prayer and community.',
    description: 'A dedicated spiritual sanctuary for daily devotions, live broadcast worship services, pastoral care, community prayer requests, outreach missions and family discipleship.',
    spaceType: 'organisation',
    category: 'churches',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200',
    customDomain: 'faith.kingdomnetwork.org',
    ownerProfileId: 'prof_pastor_john',
    membershipTier: 'free',
    subscriptionPriceMonthlyUsd: 0,
    totalMembersCount: 22400,
    activeOnlineCount: 1650,
    totalRevenueUsd: 92400,
    donationsTotalUsd: 78900,
    isVerified: true,
    isFeatured: true,
    customTheme: {
      primaryColor: '#f59e0b',
      accentColor: '#10b981',
      darkCanvas: false
    },
    rules: [
      'Speak the truth in love; honor and uplift every participant with grace.',
      'Keep prayer requests confidential and respectful.',
      'No commercial solicitation or doctrinal strife.'
    ],
    tabsEnabled: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'store', 'media', 'ai_assistant', 'analytics'],
    aiAssistant: {
      assistantName: 'GraceDevotion AI',
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200',
      systemPrompt: 'You are GraceDevotion AI, assisting members with daily scripture readings, thematic prayer suggestions, and organizing study plans with compassion and biblical reverence.',
      welcomeMessageTemplate: 'Peace be with you, {{name}}. Welcome to Kingdom Builders Global Fellowship!',
      autoModerationEnabled: true,
      toxicityThreshold: 0.95,
      autoWelcomeNewMembers: true,
      groundedResourceIds: ['doc_devotion_01', 'doc_study_02'],
      supportedLanguages: ['English', 'Spanish', 'French', 'Yoruba', 'Swahili', 'Portuguese', 'Korean']
    },
    crmIntegration: {
      enabled: false,
      autoSyncMembersToLeads: false,
      pipelineStage: 'Ministry Partner'
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-18T22:00:00Z'
  },
  {
    id: 'space_enterprise_corp',
    tenantId: 'tenant_global',
    slug: 'dynasty-enterprise-hub',
    name: 'Dynasty Capital Enterprise Collective',
    tagline: 'Private institutional network for cross-border treasury, portfolio syndication and partners.',
    description: 'Encrypted private space for institutional partners, enterprise portfolio companies, board directors, and vetted co-investors.',
    spaceType: 'enterprise',
    category: 'professional_networks',
    avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    customDomain: 'partners.dynastycapital.com',
    ownerProfileId: 'prof_marcus',
    membershipTier: 'approval',
    subscriptionPriceMonthlyUsd: 199.00,
    totalMembersCount: 1450,
    activeOnlineCount: 180,
    totalRevenueUsd: 312000,
    donationsTotalUsd: 0,
    isVerified: true,
    isFeatured: false,
    customTheme: {
      primaryColor: '#0ea5e9',
      accentColor: '#10b981',
      darkCanvas: true
    },
    rules: [
      'Strict NDA and SEC/FINRA compliance guidelines apply.',
      'All shared term sheets and deal flows remain confidential to this Space.',
      'Two-factor hardware authentication required for board room rooms.'
    ],
    tabsEnabled: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'media', 'ai_assistant', 'analytics', 'moderation'],
    aiAssistant: {
      assistantName: 'CapitalAdvisor AI',
      avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200',
      systemPrompt: 'You are CapitalAdvisor AI. You summarize financial disclosures, macroeconomic signals, treasury balances and deal memo drafts strictly conforming to enterprise security protocols.',
      welcomeMessageTemplate: 'Welcome partner {{name}}. CapitalAdvisor AI is ready with Q3 syndicate performance metrics.',
      autoModerationEnabled: true,
      toxicityThreshold: 0.8,
      autoWelcomeNewMembers: true,
      groundedResourceIds: ['doc_term_01', 'doc_fund_02'],
      supportedLanguages: ['English', 'Mandarin', 'Japanese', 'German']
    },
    crmIntegration: {
      enabled: true,
      autoSyncMembersToLeads: true,
      pipelineStage: 'Enterprise Investor Partner'
    },
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-08-19T03:15:00Z'
  },
  {
    id: 'space_creator_studio',
    tenantId: 'tenant_global',
    slug: 'amara-design-fandom',
    name: 'Amara Studio VIP Creator Hub',
    tagline: 'Exclusive backstage passes, design asset drops, 3D templates and creative feedback.',
    description: 'The official digital sanctuary for 3D animators, brand identity designers, and creative directors. Access monthly masterclasses, raw project files, and 1-on-1 design critiques.',
    spaceType: 'creator',
    category: 'brands',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
    customDomain: 'vip.amaradesign.art',
    ownerProfileId: 'prof_amara',
    membershipTier: 'paid',
    subscriptionPriceMonthlyUsd: 14.99,
    totalMembersCount: 5200,
    activeOnlineCount: 390,
    totalRevenueUsd: 64200,
    donationsTotalUsd: 15300,
    isVerified: true,
    isFeatured: true,
    customTheme: {
      primaryColor: '#ec4899',
      accentColor: '#8b5cf6',
      darkCanvas: true
    },
    rules: [
      'Respect fellow creators; provide constructive, uplifting portfolio feedback.',
      'Do not redistribute VIP digital asset packs outside of this community.'
    ],
    tabsEnabled: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'courses', 'store', 'media', 'ai_assistant'],
    aiAssistant: {
      assistantName: 'CreativeMuse AI',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      systemPrompt: 'You are CreativeMuse AI. You provide lighting recommendations, color palette harmonies, typography pairings and UI design tips.',
      welcomeMessageTemplate: 'Welcome to Amara VIP Studio, {{name}}! Let’s create something stunning today.',
      autoModerationEnabled: true,
      toxicityThreshold: 0.85,
      autoWelcomeNewMembers: true,
      groundedResourceIds: ['doc_figma_01', 'doc_shaders_02'],
      supportedLanguages: ['English', 'French', 'Italian', 'Japanese']
    },
    crmIntegration: {
      enabled: true,
      autoSyncMembersToLeads: true,
      pipelineStage: 'VIP Creator Subscriber'
    },
    createdAt: '2026-03-20T14:00:00Z',
    updatedAt: '2026-08-19T02:00:00Z'
  },
  {
    id: 'space_heritage_family',
    tenantId: 'tenant_global',
    slug: 'oluwalana-family-sanctuary',
    name: 'Oluwalana Heritage & Family Circle',
    tagline: 'Private sovereign family vault for genealogy records, reunions, shared albums and blessings.',
    description: 'A private multi-generational sanctuary preserving lineage archives, family milestones, recipes, holiday plans and collective trust goals.',
    spaceType: 'family',
    category: 'families',
    avatarUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1200',
    ownerProfileId: 'prof_gideon',
    membershipTier: 'invitation',
    subscriptionPriceMonthlyUsd: 0,
    totalMembersCount: 48,
    activeOnlineCount: 12,
    totalRevenueUsd: 0,
    donationsTotalUsd: 4500,
    isVerified: true,
    isFeatured: false,
    customTheme: {
      primaryColor: '#10b981',
      accentColor: '#f59e0b',
      darkCanvas: false
    },
    rules: [
      'Family privacy is strictly preserved.',
      'Share loving memories, photos, and mutual encouragement.'
    ],
    tabsEnabled: ['home', 'feed', 'chat', 'members', 'events', 'resources', 'media', 'ai_assistant'],
    aiAssistant: {
      assistantName: 'FamilyHistorian AI',
      avatarUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200',
      systemPrompt: 'You are FamilyHistorian AI. You help organize family tree branches, summarize holiday itineraries, and archive oral histories and memories.',
      welcomeMessageTemplate: 'Welcome home {{name}}! Looking forward to documenting more cherished family moments together.',
      autoModerationEnabled: false,
      toxicityThreshold: 0.9,
      autoWelcomeNewMembers: true,
      groundedResourceIds: ['doc_tree_01'],
      supportedLanguages: ['English', 'Yoruba', 'French']
    },
    crmIntegration: {
      enabled: false,
      autoSyncMembersToLeads: false,
      pipelineStage: 'Family Member'
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-18T18:00:00Z'
  }
];

export const SEED_SPACE_MEMBERS: Record<string, OmniSpaceMember[]> = {
  space_tech_founders: [
    {
      profileId: 'prof_gideon',
      displayName: 'Gideon Oluwalana',
      username: 'gideon',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      role: 'owner',
      membershipTier: 'free',
      badges: ['Founder', 'Chief Architect', 'Sovereign Pioneer'],
      joinedAt: '2026-01-10T10:00:00Z',
      reputationPoints: 2450,
      lastActive: 'Just now'
    },
    {
      profileId: 'prof_elena',
      displayName: 'Elena Rostova',
      username: 'elena_ai',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
      role: 'admin',
      membershipTier: 'free',
      badges: ['Core Admin', 'Neural Lead'],
      joinedAt: '2026-01-11T12:00:00Z',
      reputationPoints: 1820,
      lastActive: '5m ago'
    },
    {
      profileId: 'prof_marcus',
      displayName: 'Marcus Sterling',
      username: 'marcus_vc',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      role: 'vip',
      membershipTier: 'free',
      badges: ['Angel Syndicate', 'VIP Investor'],
      joinedAt: '2026-01-15T09:30:00Z',
      reputationPoints: 1420,
      lastActive: '1h ago'
    },
    {
      profileId: 'prof_sarah_chen',
      displayName: 'Sarah Chen',
      username: 'sarah_rust',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
      role: 'moderator',
      membershipTier: 'free',
      badges: ['Rust Evangelist', 'Moderator'],
      joinedAt: '2026-01-20T14:15:00Z',
      reputationPoints: 1650,
      lastActive: '12m ago'
    },
    {
      profileId: 'prof_alex_k',
      displayName: 'Alex Kowalski',
      username: 'alex_k',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      role: 'member',
      membershipTier: 'free',
      badges: ['Active Contributor'],
      joinedAt: '2026-02-01T16:00:00Z',
      reputationPoints: 480,
      lastActive: '3h ago'
    }
  ]
};

export const SEED_SPACE_DISCUSSIONS: Record<string, OmniSpaceDiscussionTopic[]> = {
  space_tech_founders: [
    {
      id: 'disc_arch_01',
      title: 'Architecting zero-latency p2p mesh state replication over WebRTC and libp2p',
      category: 'System Architecture',
      authorProfileId: 'prof_gideon',
      authorName: 'Gideon Oluwalana',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      createdAt: '2026-08-18T14:30:00Z',
      repliesCount: 34,
      upvotesCount: 142,
      upvotedBy: ['prof_elena', 'prof_marcus', 'prof_sarah_chen'],
      isSolved: true,
      isPinned: true,
      tags: ['WebRTC', 'CRDT', 'P2P Mesh', 'Sovereign OS'],
      content: 'When synchronizing state across decentralized browser runtimes without central servers, deterministic CRDTs with state vector compression yields <15ms convergence even across cellular NATs. Here is our benchmark test harness and packet capture analysis.',
      solutionComment: {
        id: 'sol_01',
        authorName: 'Sarah Chen',
        content: 'Benchmarked with 500 nodes across 4 continents. State compression with Brotli + Vector Clocks reduced overhead from 420KB/s to 18KB/s per active peer node.',
        markedAt: '2026-08-18T18:20:00Z'
      }
    },
    {
      id: 'disc_arch_02',
      title: 'How should sovereign identities handle multi-party hardware key recovery without trusted third parties?',
      category: 'Cryptography & Security',
      authorProfileId: 'prof_sarah_chen',
      authorName: 'Sarah Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
      createdAt: '2026-08-17T09:15:00Z',
      repliesCount: 19,
      upvotesCount: 88,
      upvotedBy: ['prof_gideon', 'prof_elena'],
      isSolved: false,
      isPinned: false,
      tags: ['MPC', 'FROST', 'Shamir Secret Sharing', 'Hardware Enclaves'],
      content: 'Exploring FROST Schnorr threshold signatures combined with WebAuthn PRF extensions so users can recover root keys through 3 of 5 guardian social circles without revealing secret shares.'
    },
    {
      id: 'disc_arch_03',
      title: 'Fundraising in 2026: Sovereign Equity vs. Revenue-Share Token Bonds for DeepTech',
      category: 'Venture & Economics',
      authorProfileId: 'prof_marcus',
      authorName: 'Marcus Sterling',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      createdAt: '2026-08-16T11:00:00Z',
      repliesCount: 27,
      upvotesCount: 110,
      upvotedBy: ['prof_gideon'],
      isSolved: true,
      isPinned: false,
      tags: ['Tokenomics', 'Venture Capital', 'Revenue Share'],
      content: 'Institutions are prioritizing real cash-flow on-chain dividends over speculative governance tokens. We analyzed 40 recent seed rounds in the OMNI ecosystem.'
    }
  ]
};

export const SEED_SPACE_COURSES: Record<string, OmniSpaceCourseModule[]> = {
  space_tech_founders: [
    {
      id: 'course_mod_01',
      title: 'Module 1: Sovereign Operating System Core Primitives',
      durationMinutes: 45,
      lessonCount: 6,
      instructorName: 'Gideon Oluwalana',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      isUnlocked: true,
      progressPercent: 100,
      xpReward: 250
    },
    {
      id: 'course_mod_02',
      title: 'Module 2: High-Throughput Merkle State & Event Sourcing',
      durationMinutes: 60,
      lessonCount: 8,
      instructorName: 'Sarah Chen',
      instructorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
      isUnlocked: true,
      progressPercent: 65,
      xpReward: 350
    },
    {
      id: 'course_mod_03',
      title: 'Module 3: Multi-Agent Neural Swarms with Autonomous Tool Calling',
      durationMinutes: 90,
      lessonCount: 10,
      instructorName: 'Elena Rostova',
      instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
      isUnlocked: false,
      progressPercent: 0,
      xpReward: 500
    }
  ],
  space_ai_academy: [
    {
      id: 'course_ai_01',
      title: 'Foundations: Transformer Internals, Attention Heads & KV-Caching',
      durationMinutes: 60,
      lessonCount: 7,
      instructorName: 'Elena Rostova',
      instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
      isUnlocked: true,
      progressPercent: 80,
      xpReward: 300
    }
  ]
};

export const SEED_SPACE_STORE: Record<string, OmniSpaceStoreItem[]> = {
  space_tech_founders: [
    {
      id: 'store_item_01',
      title: 'Sovereign OS Architecture Blueprints (CAD + PDF + Figma)',
      description: 'Production-ready vector diagrams, state machine schemas and protocol specs ready for deployment.',
      itemType: 'digital_download',
      priceUsd: 49.00,
      priceOmniCoins: 120,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
      salesCount: 840,
      rating: 4.9
    },
    {
      id: 'store_item_02',
      title: 'VIP Founder Syndicate Annual Access Pass',
      description: 'Private deal-flow invitations, monthly live mastermind with Gideon & Elena, and priority token allocations.',
      itemType: 'vip_pass',
      priceUsd: 499.00,
      priceOmniCoins: 1250,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500',
      salesCount: 128,
      rating: 5.0
    },
    {
      id: 'store_item_03',
      title: 'OMNI Heavyweight Embroidered Architect Hoodie',
      description: 'Limited edition organic heavyweight black hoodie with cryptographic hash patch on wrist.',
      itemType: 'physical_merch',
      priceUsd: 85.00,
      priceOmniCoins: 210,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500',
      salesCount: 410,
      stockRemaining: 42,
      rating: 4.8
    }
  ]
};

export const SEED_SPACE_RESOURCES: Record<string, OmniSpaceResourceDoc[]> = {
  space_tech_founders: [
    {
      id: 'doc_arch_01',
      title: 'OMNI Sovereign Protocol Specification v4.2',
      fileName: 'omni_protocol_spec_v4_2.pdf',
      fileSizeBytes: 8450000,
      fileType: 'pdf',
      downloadUrl: '#',
      uploaderName: 'Gideon Oluwalana',
      uploadedAt: '2026-08-15',
      downloadsCount: 1420,
      isEnterpriseLocked: false,
      category: 'Specifications'
    },
    {
      id: 'doc_arch_02',
      title: 'Distributed CRDT Sync Engine - Rust & TypeScript Reference',
      fileName: 'crdt_sync_engine_ref.zip',
      fileSizeBytes: 24500000,
      fileType: 'zip',
      downloadUrl: '#',
      uploaderName: 'Sarah Chen',
      uploadedAt: '2026-08-17',
      downloadsCount: 980,
      isEnterpriseLocked: false,
      category: 'Source Code'
    },
    {
      id: 'doc_token_01',
      title: 'Institutional Tokenomics Modeling Sheet (2026-2030 Projections)',
      fileName: 'tokenomics_financial_model.xlsx',
      fileSizeBytes: 4200000,
      fileType: 'sheet',
      downloadUrl: '#',
      uploaderName: 'Marcus Sterling',
      uploadedAt: '2026-08-18',
      downloadsCount: 650,
      isEnterpriseLocked: true,
      category: 'Financial Models'
    }
  ]
};

export const SEED_SPACE_MEDIA: Record<string, OmniSpaceMediaItem[]> = {
  space_tech_founders: [
    {
      id: 'media_01',
      title: 'Global Sovereign Tech Keynote 2026: The Next Computing Era',
      type: 'recording_replay',
      mediaUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
      durationFormatted: '1:18:45',
      viewsCount: 18400,
      uploadedAt: '2026-08-10'
    },
    {
      id: 'media_02',
      title: 'Deep Dive: Autonomous Agent Swarms on Edge Devices',
      type: 'video',
      mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
      durationFormatted: '42:10',
      viewsCount: 9340,
      uploadedAt: '2026-08-14'
    }
  ]
};

export const SEED_OMNI_GROUPS: OmniGroup[] = [
  {
    id: 'grp_rust_engineers',
    spaceId: 'space_tech_founders',
    name: 'Rust Core & Embedded Systems SIG',
    slug: 'rust-core-engineers',
    description: 'Special Interest Group for low-level memory safety, zero-copy networking and WebAssembly toolchains.',
    privacy: 'public',
    category: 'study_circle',
    avatarUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    creatorProfileId: 'prof_sarah_chen',
    membersCount: 3840,
    rules: [
      'Show reproducible code snippets with `cargo test` results.',
      'No flame wars on framework comparisons.'
    ],
    moderatorProfileIds: ['prof_sarah_chen', 'prof_gideon'],
    recentPostsCount: 48,
    createdAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 'grp_ai_swarms',
    spaceId: 'space_tech_founders',
    name: 'Autonomous Multi-Agent Swarms Lab',
    slug: 'ai-swarms-lab',
    description: 'Co-designing autonomous agents capable of collaborative code generation, audit and test execution.',
    privacy: 'private',
    category: 'project',
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    creatorProfileId: 'prof_elena',
    membersCount: 1950,
    rules: [
      'Members must actively contribute test results and model evaluations.'
    ],
    moderatorProfileIds: ['prof_elena'],
    recentPostsCount: 82,
    createdAt: '2026-02-05T14:00:00Z'
  },
  {
    id: 'grp_angel_syndicate',
    spaceId: 'space_tech_founders',
    name: 'Sovereign Angel Syndicate (Accredited)',
    slug: 'angel-syndicate-vip',
    description: 'Private deal-sharing circle for accredited angel investors and Tier-1 funds backing OMNI founders.',
    privacy: 'paid',
    monthlyFeeUsd: 149.00,
    category: 'work_team',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    creatorProfileId: 'prof_marcus',
    membersCount: 290,
    rules: [
      'Strict confidentiality of financial metrics and capitalization tables.',
      'Active co-investment syndication required annually.'
    ],
    moderatorProfileIds: ['prof_marcus'],
    recentPostsCount: 31,
    createdAt: '2026-02-20T09:00:00Z'
  }
];

export const SEED_OMNI_CHANNELS: OmniChannel[] = [
  {
    id: 'chan_omni_official',
    name: 'OMNI Official Broadcast & Releases',
    handle: '@omni_official',
    description: 'Official announcements, protocol upgrades, releases, and platform-wide events from OMNI Core Foundation.',
    channelType: 'company',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000',
    ownerProfileId: 'prof_gideon',
    ownerName: 'OMNI Core Engineering',
    isVerified: true,
    subscribersCount: 84200,
    broadcastsCount: 142,
    monthlyGrowthRate: 24.8,
    analytics: {
      impressions7d: 384000,
      engagementRate: 8.4,
      shares7d: 12400
    },
    posts: [
      {
        id: 'post_chan_01',
        channelId: 'chan_omni_official',
        title: 'OMNI Connect v5.0 Live: The Sovereign Spaces & Social Ecosystem',
        content: 'We are thrilled to launch OMNI Spaces — combining communities, custom website builder, live courses, WebRTC meetings, digital store, CRM synchronization and autonomous AI assistants into a single sovereign canvas.',
        mediaUrls: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800'],
        publishedAt: '2026-08-19T02:00:00Z',
        viewsCount: 42100,
        reactionsCount: 3450,
        sharesCount: 1280,
        isPinned: true
      },
      {
        id: 'post_chan_02',
        channelId: 'chan_omni_official',
        title: 'Security Advisory: Zero-Knowledge Passkey Upgrades Across All Nodes',
        content: 'All nodes have successfully migrated to quantum-resistant lattice key-derivation algorithms. No user intervention needed.',
        mediaUrls: [],
        publishedAt: '2026-08-17T11:30:00Z',
        viewsCount: 28400,
        reactionsCount: 1890,
        sharesCount: 540,
        isPinned: false
      }
    ],
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'chan_deeptech_news',
    name: 'DeepTech Daily & AI Intel',
    handle: '@deeptech_daily',
    description: 'Curated daily intelligence on breakthroughs in neuromorphic chips, LLM architectures, robotics and sovereign networks.',
    channelType: 'news',
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000',
    ownerProfileId: 'prof_elena',
    ownerName: 'Elena Rostova',
    isVerified: true,
    subscribersCount: 46200,
    broadcastsCount: 320,
    monthlyGrowthRate: 18.2,
    analytics: {
      impressions7d: 195000,
      engagementRate: 9.1,
      shares7d: 8200
    },
    posts: [
      {
        id: 'post_chan_03',
        channelId: 'chan_deeptech_news',
        title: 'Breakthrough: 1M Context Window with 99.8% Needle Retrieval at Sub-10ms Latency',
        content: 'New selective sparse memory architectures demonstrate near-instant retrieval with 80% reduced memory footprint. Analysis and benchmark graphs inside.',
        mediaUrls: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'],
        publishedAt: '2026-08-18T16:00:00Z',
        viewsCount: 21900,
        reactionsCount: 2100,
        sharesCount: 940,
        isPinned: true
      }
    ],
    createdAt: '2026-01-15T00:00:00Z'
  }
];

export const SEED_COMMUNITY_REPORTS: OmniCommunityReport[] = [
  {
    id: 'rep_01',
    spaceId: 'space_tech_founders',
    spaceName: 'Sovereign Tech Founders & Architects',
    targetType: 'post',
    targetId: 'post_spam_09',
    reporterProfileId: 'prof_sarah_chen',
    reporterName: 'Sarah Chen',
    reason: 'spam',
    status: 'pending',
    timestamp: '2026-08-19T03:45:00Z',
    aiToxicityScore: 0.12,
    notes: 'User repeatedly posted third-party affiliate crypto link.'
  },
  {
    id: 'rep_02',
    spaceId: 'space_tech_founders',
    spaceName: 'Sovereign Tech Founders & Architects',
    targetType: 'comment',
    targetId: 'comm_toxic_12',
    reporterProfileId: 'prof_alex_k',
    reporterName: 'Alex Kowalski',
    reason: 'harassment',
    status: 'resolved_removed',
    timestamp: '2026-08-18T19:20:00Z',
    aiToxicityScore: 0.94,
    notes: 'Offensive language targeted at beginner contributor. AI Auto-quarantined.'
  }
];

export const SEED_COMMUNITY_ANALYTICS: Record<string, OmniCommunityAnalytics> = {
  space_tech_founders: {
    spaceId: 'space_tech_founders',
    spaceName: 'Sovereign Tech Founders & Architects',
    totalMembers: 14280,
    memberGrowth30d: 19.4,
    activeDailyMembers: 2840,
    engagementScore: 94,
    totalPostsThisMonth: 1240,
    totalDiscussionsSolved: 412,
    retentionRatePercent: 88.5,
    mrrUsd: 14800,
    grossDonationsUsd: 12400,
    topActiveMembers: [
      {
        profileId: 'prof_gideon',
        displayName: 'Gideon Oluwalana',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        contributions: 142
      },
      {
        profileId: 'prof_sarah_chen',
        displayName: 'Sarah Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
        contributions: 98
      },
      {
        profileId: 'prof_elena',
        displayName: 'Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
        contributions: 84
      }
    ]
  }
};
