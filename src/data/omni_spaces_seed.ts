/**
 * OMNI SPACES, COMMUNITIES, GROUPS & CHANNELS — RICH PRODUCTION SEED DATA
 * Comprehensive mock data covering all 8 Space Types, 5 Group Types, 5 Channel Types, and all 11 modules.
 */

import {
  OmniSpace,
  OmniGroup,
  OmniChannel,
  OmniSpaceMember,
  OmniDiscussionTopic,
  OmniSpaceCourse,
  OmniSpaceStoreItem,
  OmniSpaceDocument,
  OmniSpaceEvent,
  OmniSpaceMediaItem,
  OmniCommunityReport,
  OmniCommunityAnalytics,
  OmniCommunityGovernancePolicy,
  OmniGroupPost
} from '../types/omni_spaces';

// ============================================================================
// 1. OMNI SPACES SEED (8 SPACE TYPES COVERING OBJECTIVES)
// ============================================================================

export const SEED_OMNI_SPACES: OmniSpace[] = [
  {
    id: 'space_dev_sovereign',
    tenantId: 'tenant_primary_001',
    name: 'OMNI Builders & Sovereign Tech Space',
    slug: 'omni-sovereign-builders',
    tagline: 'Global engineering ecosystem building decentralized, AI-native operating systems',
    description: 'The flagship community for developers, systems architects, and sovereign enterprise builders deploying on OMNI SDKs, OMNI Finance OS, and OMNI Cloud.',
    spaceType: 'public_space',
    category: 'professional_networks',
    avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_usr_001',
    ownerName: 'Gideon Oluwalana',
    isVerified: true,
    isFeatured: true,
    membershipType: 'free',
    membersCount: 48200,
    onlineCount: 4120,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'courses', 'store', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Sovereign Dev Bot',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the OMNI Sovereign Tech Copilot. Help members with architecture guidelines, SDK code snippets, and system specifications.',
      welcomeMessageTemplate: 'Welcome to OMNI Builders Space! Check out our Developer Docs in Resources or ask me any questions on OMNI APIs.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 14,
      supportedLanguages: ['English', 'German', 'French', 'Spanish', 'Mandarin', 'Yoruba', 'Japanese']
    },
    rules: [
      'Be respectful and constructive in technical discussions.',
      'No spamming unverified third-party token links.',
      'Ground code solutions in OMNI sovereign standards and verifiable cryptography.',
      'Label sponsored showcases clearly.'
    ],
    tags: ['SovereignAI', 'DistributedSystems', 'WebRTC', 'FinanceOS', 'TypeScript'],
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-08-18T16:00:00Z'
  },
  {
    id: 'space_grace_ministry',
    tenantId: 'tenant_church_001',
    name: 'Grace Cathedral Global Fellowship Space',
    slug: 'grace-cathedral-global',
    tagline: 'Faith, Fellowship, Discipleship & Global Outreach Across 180 Countries',
    description: 'Official digital space for Grace Cathedral worldwide branches, online Sunday streaming, youth fellowships, daily devotions, and ministry tithes.',
    spaceType: 'organisation_space',
    category: 'churches',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_org_003',
    ownerName: 'Pastoral Council Grace',
    isVerified: true,
    isFeatured: true,
    membershipType: 'free',
    donationGoalUsd: 250000,
    donationRaisedUsd: 184500,
    membersCount: 22400,
    onlineCount: 2890,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'courses', 'store', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Grace Faith Assistant',
      avatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the Grace Cathedral Faith Copilot. Provide scripture references, sermon summaries, and prayer guidance with warmth.',
      welcomeMessageTemplate: 'Grace and peace to you! Welcome to Grace Cathedral Global. Join our daily fellowship chat or watch Sunday broadcast.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 28,
      supportedLanguages: ['English', 'Spanish', 'Portuguese', 'Swahili', 'French', 'Yoruba']
    },
    rules: [
      'Speak the truth in love and mutual encouragement.',
      'Respect pastoral directives and branch announcements.',
      'No solicitations without pastoral council clearance.'
    ],
    tags: ['Faith', 'GospelOutreach', 'DailyDevotion', 'Fellowship', 'Tithes'],
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-19T10:00:00Z'
  },
  {
    id: 'space_fintech_academy',
    tenantId: 'tenant_edu_002',
    name: 'Apex Sovereign Finance & Ledger Academy',
    slug: 'apex-finance-academy',
    tagline: 'Certified Masterclasses in Multi-Currency Ledgers, ISO 20022 & Global BaaS',
    description: 'Interactive accredited learning space featuring structured modules, live cohort lectures, ISO 20022 certification exams, and sandbox labs.',
    spaceType: 'learning_space',
    category: 'courses',
    avatarUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_usr_004',
    ownerName: 'Sarah Jenkins',
    isVerified: true,
    isFeatured: true,
    membershipType: 'paid_subscription',
    membershipPriceUsd: 49.00,
    billingPeriod: 'monthly',
    membersCount: 8900,
    onlineCount: 1450,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'courses', 'store', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Ledger Academy AI Tutor',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the certified Fintech AI Tutor. Clarify double-entry accounting formulas, ISO 20022 messaging schemas, and evaluate student queries.',
      welcomeMessageTemplate: 'Welcome to Apex Finance Academy! You have full access to our 5 masterclass courses and sandbox ledger playground.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 42,
      supportedLanguages: ['English', 'German', 'Mandarin', 'Japanese', 'Arabic']
    },
    rules: [
      'Maintain academic integrity on all quiz submissions.',
      'Share sandbox code examples via OMNI Code snippets.',
      'Active peer reviews on course assignments are highly encouraged.'
    ],
    tags: ['Fintech', 'ISO20022', 'DoubleEntry', 'BaaS', 'Certification'],
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-08-18T14:30:00Z'
  },
  {
    id: 'space_enterprise_dynasty',
    tenantId: 'tenant_enterprise_001',
    name: 'Dynasty Capital Enterprise Space',
    slug: 'dynasty-capital-enterprise',
    tagline: 'Private executive network for institutional treasury, M&A syndicates and partners',
    description: 'High-security, end-to-end encrypted collaboration space for enterprise executives, board members, institutional LPs, and corporate partners.',
    spaceType: 'enterprise_space',
    category: 'businesses',
    avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_usr_001',
    ownerName: 'Gideon Oluwalana',
    isVerified: true,
    isFeatured: false,
    membershipType: 'approval_required',
    membersCount: 650,
    onlineCount: 180,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'store', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Dynasty Executive AI',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the Dynasty Capital confidential executive intelligence copilot. Summarize board memos, financial models, and diligence logs.',
      welcomeMessageTemplate: 'Executive clearance confirmed. Welcome to Dynasty Capital Enterprise Space. All conversations are logged on Merkle ledger.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 50,
      supportedLanguages: ['English', 'German', 'French', 'Swiss German']
    },
    rules: [
      'Strict NDA and regulatory compliance applies to all shared documents.',
      'Two-factor biometric authentication required for deal room access.',
      'No external screenshotting or document dissemination.'
    ],
    tags: ['InstitutionalTreasury', 'PrivateEquity', 'M&A', 'Enterprise', 'Confidential'],
    crmConnected: true,
    crmLeadStage: 'won',
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-08-19T11:00:00Z'
  },
  {
    id: 'space_creator_luxe',
    tenantId: 'tenant_creator_005',
    name: 'Aria Vance VIP Creator Lounge',
    slug: 'aria-vance-vip',
    tagline: 'Exclusive behind-the-scenes music production, sample packs, and live listening parties',
    description: 'Direct-to-fan creator sanctuary with VIP sample drops, weekly live video production jams, stems vault, and exclusive merchandise.',
    spaceType: 'creator_space',
    category: 'brands',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_creator_005',
    ownerName: 'Aria Vance',
    isVerified: true,
    isFeatured: true,
    membershipType: 'paid_subscription',
    membershipPriceUsd: 15.00,
    billingPeriod: 'monthly',
    membersCount: 14200,
    onlineCount: 2300,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'store', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Aria VIP Bot',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are Aria Vance official fan copilot. Inform fans about new track releases, concert tour stops, and audio sample downloads.',
      welcomeMessageTemplate: 'Welcome to the VIP Lounge! Grab your exclusive stems in Resources and join the live chat channel.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 10,
      supportedLanguages: ['English', 'Spanish', 'Korean', 'Japanese']
    },
    rules: [
      'Exclusive audio stems are for personal remixing and non-commercial release unless cleared.',
      'Keep discussions creative, upbeat, and fan-friendly.'
    ],
    tags: ['MusicProducer', 'SamplePacks', 'VIPPass', 'DirectToFan', 'LiveJam'],
    createdAt: '2026-03-01T12:00:00Z',
    updatedAt: '2026-08-17T18:00:00Z'
  },
  {
    id: 'space_oluwalana_family',
    tenantId: 'tenant_family_001',
    name: 'Oluwalana Family Heritage Space',
    slug: 'oluwalana-family-heritage',
    tagline: 'Private family lineage archives, holiday event planning, photo albums & recipes',
    description: 'Private, family-only sanctuary for organizing reunions, sharing sacred family recipes, preserving genealogical history, and coordinating family trust updates.',
    spaceType: 'family_space',
    category: 'families',
    avatarUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_usr_001',
    ownerName: 'Gideon Oluwalana',
    isVerified: true,
    isFeatured: false,
    membershipType: 'invite_only',
    membersCount: 42,
    onlineCount: 16,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Oluwalana Heritage AI',
      avatarUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the family archivist. Help family members find old photos, recall ancestral lineage records, and organize birthday reminders.',
      welcomeMessageTemplate: 'Welcome home to the Oluwalana Family Space! Check out the reunion calendar in Events.',
      autoModerationEnabled: false,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 15,
      supportedLanguages: ['English', 'Yoruba']
    },
    rules: [
      'Love, honor, and cherish family connections.',
      'Upload high-resolution family photos to the Vault.'
    ],
    tags: ['FamilyFirst', 'Genealogy', 'HolidayPlanner', 'Heritage'],
    createdAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-08-16T12:00:00Z'
  },
  {
    id: 'space_nordic_saas_crm',
    tenantId: 'tenant_biz_004',
    name: 'Nordic Sovereign SaaS & Customer Hub',
    slug: 'nordic-saas-support',
    tagline: 'Customer Success, Ticket Helpdesk, Feature Roadmap & Verified Partner Network',
    description: 'Dedicated business community connecting enterprise clients with product engineering, SLA support tickets, product updates, and roadmap voting.',
    spaceType: 'business_space',
    category: 'businesses',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_biz_002',
    ownerName: 'Apex SaaS Solutions',
    isVerified: true,
    isFeatured: false,
    membershipType: 'free',
    membersCount: 5400,
    onlineCount: 820,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'SaaS Customer Support Bot',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the 24/7 Tier-1 Technical Support Copilot. Answer API integration questions, troubleshoot webhook errors, and escalate complex issues.',
      welcomeMessageTemplate: 'Welcome to Nordic SaaS Hub! Need help with your integration? Ask me or post in Discussion for our engineering team.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 30,
      supportedLanguages: ['English', 'Swedish', 'German', 'Finnish', 'Norwegian']
    },
    rules: [
      'Sanitize all API keys and bearer tokens before posting error logs.',
      'Check knowledge base before filing duplicate support tickets.'
    ],
    tags: ['CustomerSuccess', 'Helpdesk', 'APIIntegration', 'SLA', 'CRMConnected'],
    crmConnected: true,
    crmLeadStage: 'proposal_sent',
    createdAt: '2026-03-15T09:00:00Z',
    updatedAt: '2026-08-18T17:00:00Z'
  },
  {
    id: 'space_ai_neuro_research',
    tenantId: 'tenant_primary_001',
    name: 'Neural Quantum AI Research Space',
    slug: 'neural-quantum-ai',
    tagline: 'Private research consortium exploring multi-modal agentic architectures and reasoning',
    description: 'Restricted invite-only space for AI researchers, ML engineers, and quantum compute scientists publishing pre-prints and benchmarking LLM reasoning engines.',
    spaceType: 'private_space',
    category: 'interests',
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_usr_001',
    ownerName: 'Gideon Oluwalana',
    isVerified: true,
    isFeatured: true,
    membershipType: 'approval_required',
    membersCount: 1950,
    onlineCount: 420,
    enabledModules: ['home', 'feed', 'discussion', 'chat', 'members', 'events', 'resources', 'media', 'ai_assistant'],
    aiAssistantConfig: {
      assistantName: 'Quantum AI Research Copilot',
      avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
      personalityPrompt: 'You are the deep research assistant. Analyze scientific preprints, explain mathematical derivations, and summarize benchmark findings.',
      welcomeMessageTemplate: 'Welcome to Neural Quantum Research Space. Access all latest peer-reviewed papers in Resources.',
      autoModerationEnabled: true,
      autoWelcomeEnabled: true,
      qaGroundingDocsCount: 65,
      supportedLanguages: ['English', 'German', 'Mandarin', 'French']
    },
    rules: [
      'Cite all claims with verifiable benchmark links.',
      'Engage in rigorous, peer-reviewed level academic discourse.'
    ],
    tags: ['AgenticAI', 'QuantumML', 'DeepReasoning', 'ResearchConsortium'],
    createdAt: '2026-04-01T10:00:00Z',
    updatedAt: '2026-08-19T08:00:00Z'
  }
];

// ============================================================================
// 2. OMNI GROUPS SEED (5 GROUP TYPES)
// ============================================================================

export const SEED_OMNI_GROUPS: OmniGroup[] = [
  {
    id: 'grp_public_rust_core',
    spaceId: 'space_dev_sovereign',
    tenantId: 'tenant_primary_001',
    name: 'Rust & Zero-Copy Engine Guild',
    slug: 'rust-engine-guild',
    description: 'Public working group dedicated to ultra-low latency systems, WASM compilers, and SIMD memory optimizations.',
    avatarUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150&auto=format&fit=crop&q=80',
    groupType: 'public_group',
    category: 'project',
    creatorProfileId: 'prof_usr_001',
    creatorName: 'Gideon Oluwalana',
    membersCount: 3840,
    moderatorsCount: 4,
    isPaid: false,
    rules: ['Share runnable playground links', 'Zero unsafe code in production discussions without audit justification'],
    postsCount: 142,
    filesCount: 38,
    pollsCount: 12,
    activeEventsCount: 2,
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'grp_private_youth_grace',
    spaceId: 'space_grace_ministry',
    tenantId: 'tenant_church_001',
    name: 'Grace Young Adults & Campus Ministry',
    slug: 'grace-young-adults',
    description: 'Private fellowship for university students and young professionals. Weekly Bible studies, career mentorship, and retreats.',
    avatarUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&auto=format&fit=crop&q=80',
    groupType: 'private_group',
    category: 'faith_fellowship',
    creatorProfileId: 'prof_org_003',
    creatorName: 'Pastor David Adebayo',
    membersCount: 1420,
    moderatorsCount: 6,
    isPaid: false,
    rules: ['Encouraging fellowship only', 'Respect privacy of prayer requests shared within the group'],
    postsCount: 284,
    filesCount: 19,
    pollsCount: 24,
    activeEventsCount: 3,
    createdAt: '2026-02-10T12:00:00Z'
  },
  {
    id: 'grp_secret_m_and_a_syndicate',
    spaceId: 'space_enterprise_dynasty',
    tenantId: 'tenant_enterprise_001',
    name: 'Project Sovereign Alpha M&A Syndicate',
    slug: 'secret-sovereign-alpha',
    description: 'Secret, unlisted, invite-only deal room for $450M cross-border payments acquisition syndicate.',
    avatarUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
    groupType: 'secret_group',
    category: 'work_team',
    creatorProfileId: 'prof_usr_001',
    creatorName: 'Gideon Oluwalana',
    membersCount: 18,
    moderatorsCount: 2,
    isPaid: false,
    rules: ['Strict NDA in force', 'All file downloads watermarked with viewer UUID and timestamp'],
    postsCount: 45,
    filesCount: 82,
    pollsCount: 6,
    activeEventsCount: 1,
    createdAt: '2026-03-01T08:00:00Z'
  },
  {
    id: 'grp_paid_fx_signals',
    spaceId: 'space_fintech_academy',
    tenantId: 'tenant_edu_002',
    name: 'Institutional FX Liquidity & Algo Signals',
    slug: 'paid-fx-signals-circle',
    description: 'Paid quantitative research group providing automated real-time cross-currency swap spreads, arbitrage indices, and central bank liquidity maps.',
    avatarUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80',
    groupType: 'paid_group',
    category: 'study_circle',
    creatorProfileId: 'prof_usr_004',
    creatorName: 'Sarah Jenkins',
    membersCount: 840,
    moderatorsCount: 3,
    membershipFeeUsd: 99.00,
    isPaid: true,
    rules: ['Not financial advice; educational quantitative models only', 'No redistribution of raw telemetry data'],
    postsCount: 390,
    filesCount: 64,
    pollsCount: 31,
    activeEventsCount: 4,
    createdAt: '2026-03-15T10:00:00Z'
  },
  {
    id: 'grp_org_security_auditors',
    spaceId: 'space_dev_sovereign',
    tenantId: 'tenant_primary_001',
    name: 'OMNI Core Security & Cryptographic Reviewers',
    slug: 'org-security-auditors',
    description: 'Organisation group for official formal verification leads, pen-testers, and Merkle ledger integrity verifiers.',
    avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    groupType: 'organisation_group',
    category: 'work_team',
    creatorProfileId: 'prof_usr_001',
    creatorName: 'Gideon Oluwalana',
    membersCount: 64,
    moderatorsCount: 5,
    isPaid: false,
    rules: ['Follow responsible disclosure SOP', 'PGP sign all advisory submissions'],
    postsCount: 88,
    filesCount: 112,
    pollsCount: 15,
    activeEventsCount: 2,
    createdAt: '2026-01-20T11:00:00Z'
  }
];

// ============================================================================
// 3. OMNI CHANNELS SEED (5 CHANNEL TYPES FOR 1-TO-MANY BROADCASTS)
// ============================================================================

export const SEED_OMNI_CHANNELS: OmniChannel[] = [
  {
    id: 'chan_creator_aria',
    tenantId: 'tenant_creator_005',
    spaceId: 'space_creator_luxe',
    name: 'Aria Vance Broadcast Channel',
    handle: '@ariavance.live',
    tagline: 'Official music releases, tour dates, and live session updates',
    description: 'One-to-many broadcast channel direct to 85,000+ music fans across the globe.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    channelType: 'creator_channel',
    ownerProfileId: 'prof_creator_005',
    ownerName: 'Aria Vance',
    isVerified: true,
    subscribersCount: 85400,
    postsCount: 142,
    videosCount: 38,
    broadcastsCount: 54,
    avgEngagementRate: 18.4,
    allowSubscriberComments: true,
    broadcasts: [
      {
        id: 'bc_001',
        channelId: 'chan_creator_aria',
        authorName: 'Aria Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'New Single "Neon Horizon" drops midnight on OMNI Music!',
        content: 'Hey everyone! My brand new track featuring analogue synth layers and live 808s drops tonight. VIP Lounge members get the raw 24-bit FLAC stems immediately in the Space Resources!',
        mediaType: 'video',
        mediaUrl: 'https://cdn.omni.com/video/neon_horizon_teaser.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
        viewsCount: 42100,
        likesCount: 8900,
        sharesCount: 1450,
        deliveredCount: 85400,
        openRatePercent: 82.5,
        isLiveStream: false,
        publishedAt: '2026-08-18T18:00:00Z'
      },
      {
        id: 'bc_002',
        channelId: 'chan_creator_aria',
        authorName: 'Aria Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: '🔴 LIVE Acoustic Studio Jam & Q&A Session',
        content: 'Tuning up the grand piano and Prophet-6. Join the live stream now for exclusive unreleased track previews.',
        mediaType: 'livestream_push',
        mediaUrl: 'https://cdn.omni.com/live/aria_acoustic.m3u8',
        thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        viewsCount: 18900,
        likesCount: 4200,
        sharesCount: 890,
        deliveredCount: 85400,
        openRatePercent: 91.2,
        isLiveStream: true,
        publishedAt: '2026-08-19T14:00:00Z'
      }
    ],
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'chan_company_omni',
    tenantId: 'tenant_primary_001',
    spaceId: 'space_dev_sovereign',
    name: 'OMNI Foundation Official Announcements',
    handle: '@omni.official',
    tagline: 'Platform updates, hard-fork advisories, and ecosystem milestones',
    description: 'The verified company broadcast channel for OMNI operating system engineering releases and governance alerts.',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    channelType: 'company_channel',
    ownerProfileId: 'prof_usr_001',
    ownerName: 'OMNI Foundation',
    isVerified: true,
    subscribersCount: 142000,
    postsCount: 230,
    videosCount: 45,
    broadcastsCount: 88,
    avgEngagementRate: 14.2,
    allowSubscriberComments: false,
    broadcasts: [
      {
        id: 'bc_comp_001',
        channelId: 'chan_company_omni',
        authorName: 'OMNI Core Engineering',
        authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        title: 'OMNI Connect v1.0 Released: Social, Spaces, Video & BaaS OS',
        content: 'We are pleased to announce the release of OMNI Connect v1.0. All enterprise and community nodes now feature native OMNI Spaces, multi-currency ledger routing, and WebRTC SFU mesh.',
        mediaType: 'press_release',
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        viewsCount: 98000,
        likesCount: 14200,
        sharesCount: 6500,
        deliveredCount: 142000,
        openRatePercent: 78.4,
        isLiveStream: false,
        publishedAt: '2026-08-18T12:00:00Z'
      }
    ],
    createdAt: '2026-01-01T08:00:00Z'
  },
  {
    id: 'chan_news_fintech',
    tenantId: 'tenant_edu_002',
    name: 'Sovereign Fintech & Central Bank News Wire',
    handle: '@sovereign.wire',
    tagline: 'Instant alerts on ISO 20022 mandates, BIS guidelines, and FX liquidity flows',
    description: 'Curated 24/7 global wire service for central bankers, treasurers, and financial infrastructure builders.',
    avatarUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    channelType: 'news_channel',
    ownerProfileId: 'prof_usr_004',
    ownerName: 'Sarah Jenkins',
    isVerified: true,
    subscribersCount: 62000,
    postsCount: 840,
    videosCount: 120,
    broadcastsCount: 410,
    avgEngagementRate: 11.8,
    allowSubscriberComments: true,
    broadcasts: [
      {
        id: 'bc_news_001',
        channelId: 'chan_news_fintech',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        title: 'ECB and Federal Reserve finalize Real-Time Cross-Border Settlement Specs',
        content: 'The new ISO 20022 pacs.008 schema mandates sub-second liquidity lock and cryptographic Merkle provenance across wholesale corridors.',
        mediaType: 'announcement',
        viewsCount: 41200,
        likesCount: 5600,
        sharesCount: 2800,
        deliveredCount: 62000,
        openRatePercent: 86.4,
        isLiveStream: false,
        publishedAt: '2026-08-19T09:30:00Z'
      }
    ],
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'chan_ministry_grace',
    tenantId: 'tenant_church_001',
    spaceId: 'space_grace_ministry',
    name: 'Grace Cathedral Word Broadcast',
    handle: '@gracecathedral.word',
    tagline: 'Daily audio devotions, Sunday live sermons, and global mission reports',
    description: 'Official broadcast ministry reaching over 120,000 households with uplifting messages of hope, healing, and kingdom purpose.',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&auto=format&fit=crop&q=80',
    channelType: 'ministry_channel',
    ownerProfileId: 'prof_org_003',
    ownerName: 'Pastoral Council Grace',
    isVerified: true,
    subscribersCount: 124000,
    postsCount: 390,
    videosCount: 210,
    broadcastsCount: 320,
    avgEngagementRate: 24.6,
    allowSubscriberComments: true,
    broadcasts: [
      {
        id: 'bc_min_001',
        channelId: 'chan_ministry_grace',
        authorName: 'Senior Pastor Adebayo',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'Sunday Live Service: Walking in Kingdom Authority and Unfailing Faith',
        content: 'Broadcast from the Grace International Sanctuary. Join 30,000 members online for worship, word, and communion prayer.',
        mediaType: 'video',
        mediaUrl: 'https://cdn.omni.com/video/sunday_service_stream.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80',
        viewsCount: 68500,
        likesCount: 19400,
        sharesCount: 7800,
        deliveredCount: 124000,
        openRatePercent: 94.1,
        isLiveStream: false,
        publishedAt: '2026-08-17T10:00:00Z'
      }
    ],
    createdAt: '2026-01-20T08:00:00Z'
  },
  {
    id: 'chan_edu_stem',
    tenantId: 'tenant_edu_002',
    name: 'OMNI Masterclasses & Quantum Compute Talks',
    handle: '@omni.edu',
    tagline: 'High-definition video lectures on cryptography, AI reasoning, and sovereign tech',
    description: 'Educational streaming channel featuring world-class university professors, industry CTOs, and interactive whiteboards.',
    avatarUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    channelType: 'educational_channel',
    ownerProfileId: 'prof_usr_001',
    ownerName: 'Gideon Oluwalana',
    isVerified: true,
    subscribersCount: 49000,
    postsCount: 95,
    videosCount: 78,
    broadcastsCount: 42,
    avgEngagementRate: 15.7,
    allowSubscriberComments: true,
    broadcasts: [
      {
        id: 'bc_edu_001',
        channelId: 'chan_edu_stem',
        authorName: 'Dr. Michael Adeyemi',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'Masterclass: Designing High-Throughput Double-Entry Sharded Engines in Node.js & Rust',
        content: 'A deep-dive 90-minute lecture explaining lock-free memory rings, write-ahead logs, and immutable append-only ledgers.',
        mediaType: 'video',
        mediaUrl: 'https://cdn.omni.com/video/ledger_architecture_lecture.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
        viewsCount: 34500,
        likesCount: 6800,
        sharesCount: 2900,
        deliveredCount: 49000,
        openRatePercent: 88.0,
        isLiveStream: false,
        publishedAt: '2026-08-16T15:00:00Z'
      }
    ],
    createdAt: '2026-02-15T11:00:00Z'
  }
];

// ============================================================================
// 4. DISCUSSION TOPICS SEED
// ============================================================================

export const SEED_SPACE_DISCUSSIONS: OmniDiscussionTopic[] = [
  {
    id: 'disc_001',
    spaceId: 'space_dev_sovereign',
    authorProfileId: 'prof_usr_001',
    authorName: 'Gideon Oluwalana',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'owner',
    title: 'How are you implementing zero-downtime ledger migration with Merkle trees?',
    content: 'When moving from traditional SQL partitions to OMNI sovereign Merkle ledgers, what batch compaction sizes are giving the lowest tail latency during peak hours?',
    category: 'Architecture',
    tags: ['MerkleLedger', 'Migration', 'Database', 'HighThroughput'],
    upvotesCount: 84,
    upvotedBy: ['prof_usr_004', 'prof_usr_002'],
    repliesCount: 6,
    isPinned: true,
    isSolved: true,
    acceptedReplyId: 'reply_001',
    replies: [
      {
        id: 'reply_001',
        topicId: 'disc_001',
        authorProfileId: 'prof_usr_004',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        authorRole: 'admin',
        content: 'We found that chunking into 10,000 tx root blocks with parallel worker threads kept P99 latency under 4.2ms without saturating Redis memory cache.',
        upvotesCount: 42,
        upvotedBy: ['prof_usr_001'],
        isAcceptedSolution: true,
        createdAt: '2026-08-18T11:30:00Z'
      }
    ],
    createdAt: '2026-08-18T09:00:00Z',
    updatedAt: '2026-08-18T14:00:00Z'
  },
  {
    id: 'disc_002',
    spaceId: 'space_dev_sovereign',
    authorProfileId: 'prof_dev_009',
    authorName: 'Klaus Reinhardt',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorRole: 'member',
    title: 'Best practices for WebRTC SFU Mesh bandwidth scaling on mobile clients',
    content: 'When broadcasting 1080p video to 250+ peers on 4G networks, how should simulcast layers be dynamically allocated in OMNI Media Engine?',
    category: 'WebRTC & Media',
    tags: ['WebRTC', 'SFU', 'Simulcast', 'Mobile'],
    upvotesCount: 38,
    upvotedBy: ['prof_usr_001'],
    repliesCount: 3,
    isPinned: false,
    isSolved: false,
    replies: [],
    createdAt: '2026-08-18T16:00:00Z',
    updatedAt: '2026-08-18T17:30:00Z'
  }
];

// ============================================================================
// 5. SPACE COURSES SEED
// ============================================================================

export const SEED_SPACE_COURSES: OmniSpaceCourse[] = [
  {
    id: 'course_001',
    spaceId: 'space_fintech_academy',
    title: 'Mastering ISO 20022 & Multi-Currency Ledger Routing',
    slug: 'iso-20022-multi-currency-masterclass',
    description: 'Comprehensive 8-module certified curriculum covering pacs.008, pacs.009, pain.001 schemas, real-time FedNow & SEPA Instant integration, and double-entry reconciliation.',
    instructorName: 'Sarah Jenkins',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    level: 'Advanced',
    durationHours: 12,
    enrollmentCount: 3420,
    rating: 4.9,
    isFree: false,
    priceUsd: 149.00,
    certificateGranted: true,
    curriculumModules: [
      {
        id: 'mod_001',
        title: 'Module 1: Foundations of Sovereign Double-Entry Accounting',
        durationMinutes: 45,
        videoUrl: 'https://cdn.omni.com/courses/mod1.mp4',
        contentSummary: 'Debit and Credit invariance, ledger partitions, and Merkle leaf verification.',
        quizQuestionCount: 5,
        isCompleted: true
      },
      {
        id: 'mod_002',
        title: 'Module 2: ISO 20022 XML Messaging & Message Validation',
        durationMinutes: 60,
        videoUrl: 'https://cdn.omni.com/courses/mod2.mp4',
        contentSummary: 'Dissecting pacs.008 customer credit transfers and camt.053 bank statement feeds.',
        quizQuestionCount: 8,
        isCompleted: false
      },
      {
        id: 'mod_003',
        title: 'Module 3: Real-Time Multi-Currency FX Engine & Liquidity Pools',
        durationMinutes: 75,
        videoUrl: 'https://cdn.omni.com/courses/mod3.mp4',
        contentSummary: 'Building dynamic rate feeds, spreads, and multi-currency treasury sweeps.',
        quizQuestionCount: 10,
        isCompleted: false
      }
    ]
  },
  {
    id: 'course_002',
    spaceId: 'space_dev_sovereign',
    title: 'Building AI-Powered Native Apps on OMNI SDK',
    slug: 'building-omni-sdk-apps',
    description: 'Learn how to architect, test, and deploy sovereign applications utilizing OMNI Connect, OMNI Finance OS, and Gemini AI agentic workflows.',
    instructorName: 'Gideon Oluwalana',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    level: 'Intermediate',
    durationHours: 8,
    enrollmentCount: 6840,
    rating: 5.0,
    isFree: true,
    certificateGranted: true,
    curriculumModules: [
      {
        id: 'mod_omni_01',
        title: 'Module 1: OMNI Ecosystem Architecture & Passport Identity',
        durationMinutes: 40,
        contentSummary: 'Single Sign-On across all OMNI domains with zero-knowledge cryptographic proofs.',
        quizQuestionCount: 4,
        isCompleted: true
      },
      {
        id: 'mod_omni_02',
        title: 'Module 2: OMNI Spaces & Real-time WebRTC Mesh Integration',
        durationMinutes: 55,
        contentSummary: 'Hooking up live audio stages, channels, and rich community feeds.',
        quizQuestionCount: 6,
        isCompleted: true
      }
    ]
  }
];

// ============================================================================
// 6. SPACE STORE ITEMS SEED (OMNI FINANCE INTEGRATED)
// ============================================================================

export const SEED_SPACE_STORE_ITEMS: OmniSpaceStoreItem[] = [
  {
    id: 'store_001',
    spaceId: 'space_dev_sovereign',
    name: 'OMNI Sovereign Core Architect Hoodie (Organic Cotton)',
    description: 'Official heavyweight black hoodie with embroidered Merkle tree insignia and cybernetic sleeve detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
    itemType: 'merchandise',
    priceUsd: 65.00,
    currency: 'USD',
    stockCount: 140,
    salesCount: 420,
    rating: 4.9,
    isAvailable: true
  },
  {
    id: 'store_002',
    spaceId: 'space_fintech_academy',
    name: 'Certified ISO 20022 Master Certification Pass & Exam Voucher',
    description: 'Official accredited examination voucher including digital NFT credential and verified Passport badge.',
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-dad6ef49ab6f?w=400&auto=format&fit=crop&q=80',
    itemType: 'course_pass',
    priceUsd: 199.00,
    currency: 'USD',
    salesCount: 1250,
    rating: 5.0,
    isAvailable: true
  },
  {
    id: 'store_003',
    spaceId: 'space_creator_luxe',
    name: 'Aria Vance "Neon Dreams" 24-Bit Analogue Sample & Stems Vault',
    description: 'Over 4.5 GB of royalty-free lossless WAV drum breaks, Moog bass loops, Prophet chords, and vocal hooks.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&auto=format&fit=crop&q=80',
    itemType: 'digital_download',
    priceUsd: 39.00,
    currency: 'USD',
    salesCount: 2840,
    rating: 4.9,
    isAvailable: true
  },
  {
    id: 'store_004',
    spaceId: 'space_grace_ministry',
    name: 'Grace Global Mission Outreach Pledge (Monthly Support)',
    description: 'Direct tax-deductible donation pledge to support clean water, orphan education, and hospital missions in 14 countries.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80',
    itemType: 'donation_pledge',
    priceUsd: 50.00,
    currency: 'USD',
    salesCount: 3910,
    rating: 5.0,
    isAvailable: true
  }
];

// ============================================================================
// 7. SPACE DOCUMENTS & VAULT SEED
// ============================================================================

export const SEED_SPACE_DOCUMENTS: OmniSpaceDocument[] = [
  {
    id: 'doc_001',
    spaceId: 'space_dev_sovereign',
    title: 'OMNI Sovereign Architecture Whitepaper v3.4.pdf',
    description: 'Complete technical specifications of the decentralized ledger, WebRTC SFU mesh, and AI Copilot.',
    fileType: 'pdf',
    fileSizeBytes: 4890000,
    downloadUrl: 'https://cdn.omni.com/docs/OMNI_Whitepaper_v3.4.pdf',
    uploaderName: 'Gideon Oluwalana',
    accessRoleRequired: 'member',
    downloadCount: 14200,
    updatedAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'doc_002',
    spaceId: 'space_fintech_academy',
    title: 'ISO_20022_Pacs008_Schema_Specification_2026.docx',
    description: 'Standardized XML and JSON validation definitions for cross-border financial transactions.',
    fileType: 'docx',
    fileSizeBytes: 1250000,
    downloadUrl: 'https://cdn.omni.com/docs/ISO_20022_Pacs008.docx',
    uploaderName: 'Sarah Jenkins',
    accessRoleRequired: 'student',
    downloadCount: 3100,
    updatedAt: '2026-08-10T14:00:00Z'
  },
  {
    id: 'doc_003',
    spaceId: 'space_enterprise_dynasty',
    title: 'Dynasty_Capital_Q2_Institutional_Financial_Audit.sheet',
    description: 'Fully audited double-entry balance sheets, cashflow statements, and LP return metrics.',
    fileType: 'sheet',
    fileSizeBytes: 3400000,
    downloadUrl: 'https://cdn.omni.com/docs/Dynasty_Q2_Audit.sheet',
    uploaderName: 'Apex Treasury Auditor',
    accessRoleRequired: 'vip',
    downloadCount: 420,
    updatedAt: '2026-08-17T18:00:00Z'
  }
];

// ============================================================================
// 8. SPACE EVENTS SEED
// ============================================================================

export const SEED_SPACE_EVENTS: OmniSpaceEvent[] = [
  {
    id: 'ev_001',
    spaceId: 'space_dev_sovereign',
    title: 'Global Sovereign Tech Summit & Hackathon 2026',
    description: 'Join 5,000 developers live online for keynote addresses from Gideon Oluwalana, architecture workshops, and $150,000 in hackathon prizes.',
    bannerUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
    format: 'online_live',
    hostName: 'Gideon Oluwalana',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    startDateTime: '2026-08-25T14:00:00Z',
    endDateTime: '2026-08-25T19:00:00Z',
    timezone: 'UTC',
    isTicketed: false,
    rsvpCount: 4120,
    maxAttendees: 10000,
    isLiveNow: false,
    meetingRoomId: 'room_dev_summit_2026'
  },
  {
    id: 'ev_002',
    spaceId: 'space_grace_ministry',
    title: 'Grace Global Night of Worship & Prophetic Breakthrough',
    description: 'Live interactive worship night with international worship leaders, choir ensembles, and worldwide prayer chains.',
    bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80',
    format: 'hybrid',
    hostName: 'Pastoral Council Grace',
    hostAvatar: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=150&auto=format&fit=crop&q=80',
    startDateTime: '2026-08-22T18:00:00Z',
    endDateTime: '2026-08-22T21:30:00Z',
    timezone: 'UTC',
    isTicketed: false,
    rsvpCount: 12400,
    isLiveNow: true,
    meetingRoomId: 'room_grace_worship_live'
  },
  {
    id: 'ev_003',
    spaceId: 'space_creator_luxe',
    title: 'Aria Vance VIP Album Listening & Stems Breakdown',
    description: 'Exclusive listening party with live track walkthroughs on Ableton Live, Q&A on vocal production, and merch giveaways.',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    format: 'online_live',
    hostName: 'Aria Vance',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    startDateTime: '2026-08-24T20:00:00Z',
    endDateTime: '2026-08-24T22:00:00Z',
    timezone: 'EST',
    isTicketed: true,
    ticketPriceUsd: 10.00,
    rsvpCount: 2890,
    maxAttendees: 5000,
    isLiveNow: false,
    meetingRoomId: 'room_aria_vip_listening'
  }
];

// ============================================================================
// 9. SPACE MEMBERS SEED
// ============================================================================

export const SEED_SPACE_MEMBERS: OmniSpaceMember[] = [
  {
    id: 'mem_001',
    profileId: 'prof_usr_001',
    displayName: 'Gideon Oluwalana',
    handle: '@gideon',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'owner',
    membershipType: 'free',
    joinedAt: '2026-01-05T10:00:00Z',
    status: 'active',
    reputationPoints: 998,
    badges: ['Founder', 'Chief Architect', 'Core Verifier']
  },
  {
    id: 'mem_002',
    profileId: 'prof_usr_004',
    displayName: 'Sarah Jenkins',
    handle: '@sarah.jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    membershipType: 'paid_subscription',
    joinedAt: '2026-01-10T12:00:00Z',
    status: 'active',
    reputationPoints: 920,
    badges: ['Treasury Lead', 'Instructor', 'Moderator'],
    subscriptionDetails: {
      tierName: 'Apex Enterprise Academy',
      amountUsd: 49.00,
      billingCycle: 'monthly',
      renewsAt: '2026-09-10T12:00:00Z',
      financeTxId: 'tx_sub_fin_9821'
    }
  },
  {
    id: 'mem_003',
    profileId: 'prof_creator_005',
    displayName: 'Aria Vance',
    handle: '@ariavance',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'vip',
    membershipType: 'paid_subscription',
    joinedAt: '2026-02-01T14:00:00Z',
    status: 'active',
    reputationPoints: 880,
    badges: ['VIP Creator', 'Artist']
  },
  {
    id: 'mem_004',
    profileId: 'prof_dev_009',
    displayName: 'Klaus Reinhardt',
    handle: '@klaus.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'member',
    membershipType: 'free',
    joinedAt: '2026-03-01T09:00:00Z',
    status: 'active',
    reputationPoints: 540,
    badges: ['Rust Builder', 'Active Contributor']
  }
];

// ============================================================================
// 10. COMMUNITY MODERATION REPORTS SEED
// ============================================================================

export const SEED_COMMUNITY_REPORTS: OmniCommunityReport[] = [
  {
    id: 'rep_001',
    spaceId: 'space_dev_sovereign',
    targetType: 'chat_message',
    targetId: 'msg_flag_098',
    targetContentSnippet: 'Claim free 10,000 USDT giveaway by clicking this telegram link: http://unverified-giveaway.xyz',
    reporterProfileId: 'prof_dev_009',
    reporterName: 'Klaus Reinhardt',
    reportedProfileId: 'prof_spammer_001',
    reportedProfileName: 'CryptoPromoBot99',
    violation: 'spam_scam',
    severity: 'high',
    status: 'pending_review',
    aiRiskScore: 96,
    aiSuggestedAction: 'user_banned',
    createdAt: '2026-08-19T14:20:00Z'
  },
  {
    id: 'rep_002',
    spaceId: 'space_grace_ministry',
    targetType: 'post',
    targetId: 'post_flag_044',
    targetContentSnippet: 'Commercial sales pitch for unapproved health supplements during live church broadcast',
    reporterProfileId: 'prof_org_003',
    reporterName: 'Pastoral Council Grace',
    reportedProfileId: 'prof_vendor_88',
    reportedProfileName: 'QuickHealth Direct',
    violation: 'spam_scam',
    severity: 'medium',
    status: 'resolved',
    aiRiskScore: 78,
    aiSuggestedAction: 'content_removed',
    resolvedBy: 'Pastor David Adebayo',
    resolutionAction: 'content_removed',
    resolutionNotes: 'Post removed and user sent warning regarding community guidelines.',
    createdAt: '2026-08-18T16:40:00Z'
  }
];

// ============================================================================
// 11. COMMUNITY ANALYTICS SEED
// ============================================================================

export const SEED_COMMUNITY_ANALYTICS: OmniCommunityAnalytics = {
  totalMembers: 124800,
  activeDau: 38400,
  activeMau: 96500,
  growthRatePercent: 24.8,
  engagementRatePercent: 19.4,
  postsPublishedThisMonth: 14800,
  chatMessagesSentThisMonth: 382000,
  retentionCohort30d: 84.2,
  retentionCohort90d: 76.5,
  totalRevenueUsd: 485000.00,
  mrrUsd: 142000.00,
  topActiveSpaces: [
    { name: 'OMNI Builders & Sovereign Tech', members: 48200, engagement: 22.4 },
    { name: 'Grace Cathedral Global Fellowship', members: 22400, engagement: 26.8 },
    { name: 'Aria Vance VIP Creator Lounge', members: 14200, engagement: 31.2 },
    { name: 'Apex Sovereign Finance Academy', members: 8900, engagement: 28.5 },
    { name: 'Nordic Sovereign SaaS & CRM Hub', members: 5400, engagement: 16.4 }
  ],
  membershipBreakdown: [
    { type: 'Free Memberships', count: 98400, percentage: 78.8 },
    { type: 'Paid Subscriptions', count: 18600, percentage: 14.9 },
    { type: 'Vetted Approval Enterprise', count: 5200, percentage: 4.2 },
    { type: 'Private Invite Only', count: 2600, percentage: 2.1 }
  ],
  monthlyGrowthTrend: [
    { month: 'Mar 2026', members: 62000, revenue: 180000, posts: 6400 },
    { month: 'Apr 2026', members: 78000, revenue: 240000, posts: 8900 },
    { month: 'May 2026', members: 92000, revenue: 310000, posts: 11200 },
    { month: 'Jun 2026', members: 104000, revenue: 385000, posts: 12800 },
    { month: 'Jul 2026', members: 116000, revenue: 430000, posts: 13900 },
    { month: 'Aug 2026', members: 124800, revenue: 485000, posts: 14800 }
  ]
};

// ============================================================================
// 12. SUPER ADMIN GOVERNANCE POLICIES
// ============================================================================

export const SEED_COMMUNITY_GOVERNANCE: OmniCommunityGovernancePolicy = {
  allowedSpaceTypes: [
    'public_space',
    'private_space',
    'enterprise_space',
    'learning_space',
    'business_space',
    'creator_space',
    'family_space',
    'organisation_space'
  ],
  globalMaxMembersPerSpace: 250000,
  platformMonetizationFeePercent: 2.5,
  allowDonationsByDefault: true,
  automatedAiSafetyThreshold: 85,
  requireIdentityVerificationForPaidSpaces: true,
  crmIntegrationEnabled: true,
  sovereignCustomDomainsAllowed: true
};

export const SEED_GOVERNANCE_POLICY = SEED_COMMUNITY_GOVERNANCE;
export const SEED_MODERATION_REPORTS = SEED_COMMUNITY_REPORTS;
