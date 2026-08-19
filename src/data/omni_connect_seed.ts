import {
  ConnectFeatureModule,
  ConnectProfile,
  ConnectPost,
  ConnectConversation,
  ConnectMessage,
  ConnectCommunity,
  ConnectEvent,
  ConnectContact,
  ConnectCrmDeal,
  ConnectCommerceProduct,
  CreatorStudioStats,
  ConnectMeetingRoom,
  ConnectUserPresence,
  ConnectAuditLog
} from '../types/omni_connect';

// ============================================================================
// 1. OMNI CONNECT FEATURE SWITCHBOARD SEED — ALL ACTIVE BY DEFAULT
// ============================================================================

export const SEED_CONNECT_MODULES: ConnectFeatureModule[] = [
  {
    id: 'messaging',
    name: 'Real-Time Messaging & Voice',
    description: 'High-speed encrypted 1:1 direct messages, group chats, typing indicators, voice notes, and OmniPay transfer requests.',
    capabilityKey: 'connect.messaging',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 120,
    config: { e2eeEnabled: true, voiceNotesMaxSec: 300, maxGroupParticipants: 5000 },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'social_feed',
    name: 'Social Feed & Publishing',
    description: 'Algorithmic and chronological newsfeeds, rich media carousels, threaded discussions, and ephemeral stories.',
    capabilityKey: 'connect.social',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 60,
    config: { chronologicalToggle: true, maxMediaAttachments: 10, aiAutoTagging: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'communities',
    name: 'Community & Group Hubs',
    description: 'Custom community servers with nested discussion channels, role hierarchy, announcement broadcasts, and membership gates.',
    capabilityKey: 'connect.communities',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 100,
    config: { maxChannelsPerCommunity: 100, customRolesAllowed: true, membershipPaywalls: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'channels',
    name: 'Broadcast & Topic Channels',
    description: 'One-to-many broadcast channels for organizations, churches, newsletters, and verified media publishers.',
    capabilityKey: 'connect.channels',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 80,
    config: { subscriberCommentsEnabled: true, richMediaBroadcasts: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'commerce',
    name: 'Social Commerce & Storefronts',
    description: 'In-feed social shopping storefronts, product cards, instant 1-click checkout powered by OMNI Finance OS.',
    capabilityKey: 'connect.commerce',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['business', 'creator', 'enterprise', 'school', 'church'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 100,
    config: { settlementRail: 'omni_wallet', escrowProtection: true, commissionBps: 150 },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'creator_studio',
    name: 'Creator Studio & Monetization',
    description: 'Creator analytics dashboard, subscriber tiers, direct tip jar, paywalled premium posts, and brand partnerships.',
    capabilityKey: 'connect.creator',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['creator', 'personal', 'business'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 60,
    config: { payoutsEnabled: true, minimumPayoutThresholdUsd: 25.0 },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'crm',
    name: 'Omni-Channel Business CRM',
    description: 'Centralized customer inbox, deal pipelines, contact directory, lead scoring, and automated support response.',
    capabilityKey: 'connect.crm',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['business', 'enterprise', 'school', 'church'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 100,
    config: { leadStages: ['new_lead', 'contacted', 'qualified', 'proposal_sent', 'won'], automatedAiFollowups: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'events',
    name: 'Events & Ticketing',
    description: 'Virtual webinars, in-person conferences, church services, ticket reservations, and interactive RSVP rosters.',
    capabilityKey: 'connect.events',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 60,
    config: { qrCodeCheckIn: true, automatedCalendarSync: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'meetings',
    name: 'HD Video & Audio Meetings',
    description: 'WebRTC video conferencing with screen sharing, breakout rooms, AI live transcription, and automatic meeting notes.',
    capabilityKey: 'connect.meetings',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 60,
    config: { maxVideoParticipants: 250, aiTranscription: true, cloudRecording: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'ai_assistant',
    name: 'OMNI Connect AI Copilot',
    description: 'Gemini-powered communication copilot providing smart replies, real-time 100+ language translation, and drafting.',
    capabilityKey: 'connect.ai',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 120,
    config: { modelVersion: 'gemini-2.5-flash', contextMemory: true, zeroDataRetention: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'ads',
    name: 'Sovereign Ads & Sponsorships',
    description: 'Privacy-first native feed sponsored content, promoted community channels, and verified merchant ads.',
    capabilityKey: 'connect.ads',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['business', 'creator', 'enterprise'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 60,
    config: { zeroThirdPartyTracking: true, minBidCpmUsd: 2.50 },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'white_label',
    name: 'White-Label Community Portal',
    description: 'Deploy custom branded social networks and private enterprise communication suites on custom subdomains.',
    capabilityKey: 'connect.whitelabel',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['enterprise', 'school', 'church', 'government'],
    requiredSubscriptionTier: 'enterprise',
    rateLimitPerMinute: 100,
    config: { customSsl: true, domainMapping: true, customThemePacks: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  },
  {
    id: 'moderation',
    name: 'Automated AI Safety & Moderation',
    description: 'Multi-layer content moderation filtering toxic spam, illegal materials, hate speech, and fraudulent schemes.',
    capabilityKey: 'connect.content',
    status: 'ACTIVE',
    isInstalled: true,
    isOperational: true,
    enabledForCountries: ['*'],
    enabledForTenantTypes: ['personal', 'business', 'school', 'church', 'enterprise', 'government'],
    requiredSubscriptionTier: 'free',
    rateLimitPerMinute: 200,
    config: { autoQuarantineScore: 0.85, appealWorkflow: true },
    lastUpdated: '2026-08-18T10:00:00Z'
  }
];

// ============================================================================
// 2. CONNECT PROFILES SEED
// ============================================================================

export const SEED_CONNECT_PROFILES: ConnectProfile[] = [
  {
    id: 'prof_usr_001',
    tenantId: 'tenant_primary_001',
    userId: 'usr_gideon_001',
    username: 'gideon.dynasty',
    displayName: 'Gideon Oluwalana',
    headline: 'Founder & Principal Architect • Sovereign OMNI Ecosystem',
    bio: 'Building decentralized financial operating systems, AI communications infrastructure, and high-concurrency sovereign technologies.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    profileType: 'creator',
    verificationBadge: 'verified_official',
    reputationScore: 994,
    countryCode: 'GB',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    customLinks: [
      { label: 'OMNI Ecosystem', url: 'https://omni.com' },
      { label: 'Finance OS', url: 'https://finance.omni.com' },
      { label: 'Research Papers', url: 'https://ai.omni.com/research' }
    ],
    stats: {
      postsCount: 142,
      followersCount: 38400,
      followingCount: 312,
      communitiesCount: 8,
      reputationPoints: 12450
    },
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-08-18T12:00:00Z'
  },
  {
    id: 'prof_biz_002',
    tenantId: 'tenant_enterprise_001',
    userId: 'usr_apex_corp',
    username: 'apex.finance',
    displayName: 'Apex Global Financial Group',
    headline: 'Institutional Treasury & Cross-Border Liquidity Rails',
    bio: 'Multi-jurisdictional financial institution delivering FedNow, SEPA Instant, and Tier-1 liquidity infrastructure to global enterprises.',
    avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    profileType: 'business',
    verificationBadge: 'verified_business',
    reputationScore: 980,
    countryCode: 'US',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    customLinks: [
      { label: 'Corporate Portal', url: 'https://apex.finance' },
      { label: 'BaaS API Docs', url: 'https://developers.apex.finance' }
    ],
    stats: {
      postsCount: 89,
      followersCount: 84500,
      followingCount: 45,
      communitiesCount: 3,
      reputationPoints: 28900
    },
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-08-18T14:15:00Z'
  },
  {
    id: 'prof_org_003',
    tenantId: 'tenant_church_001',
    userId: 'usr_grace_cathedral',
    username: 'grace.citychurch',
    displayName: 'Grace International Cathedral',
    headline: 'Multi-Branch Global Fellowship & Community Outreach',
    bio: 'Connecting 12 branch parishes, youth ministries, charitable food banks, and global discipleship networks.',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&auto=format&fit=crop&q=80',
    profileType: 'organization',
    verificationBadge: 'verified_official',
    reputationScore: 960,
    countryCode: 'GB',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    customLinks: [
      { label: 'Live Sunday Broadcast', url: 'https://connect.omni.com/events/grace_sunday' },
      { label: 'Community Giving', url: 'https://finance.omni.com/giving/grace' }
    ],
    stats: {
      postsCount: 310,
      followersCount: 19800,
      followingCount: 12,
      communitiesCount: 14,
      reputationPoints: 18400
    },
    createdAt: '2026-03-01T11:00:00Z',
    updatedAt: '2026-08-18T15:40:00Z'
  },
  {
    id: 'prof_usr_004',
    tenantId: 'tenant_primary_001',
    userId: 'usr_sarah_cfo',
    username: 'sarah.jenkins',
    displayName: 'Sarah Jenkins, CFA',
    headline: 'VP of Treasury Operations • Sovereign Asset Allocator',
    bio: 'Specializing in algorithmic cash sweeps, cross-border multi-currency liquidity pooling, and institutional risk management.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    profileType: 'personal',
    verificationBadge: 'verified_human',
    reputationScore: 920,
    countryCode: 'US',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'followers',
    customLinks: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
    stats: {
      postsCount: 64,
      followersCount: 12900,
      followingCount: 420,
      communitiesCount: 5,
      reputationPoints: 8900
    },
    createdAt: '2026-03-12T14:20:00Z',
    updatedAt: '2026-08-18T09:00:00Z'
  }
];

// ============================================================================
// 3. CONNECT POSTS (SOCIAL FEED) SEED
// ============================================================================

export const SEED_CONNECT_POSTS: ConnectPost[] = [
  {
    id: 'post_001',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_usr_001',
    authorDisplayName: 'Gideon Oluwalana',
    authorHandle: '@gideon.dynasty',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorVerificationBadge: 'verified_official',
    contentType: 'text',
    title: 'OMNI Connect: The Sovereign Relationship Layer is Live',
    content: 'We are thrilled to launch OMNI Connect — our native AI-powered communication, social, and commercial super-app. Built on top of OMNI Passport and OMNI Finance OS, it combines high-concurrency real-time messaging, community servers, omni-channel business CRM, and creator monetization in a unified sovereign ecosystem with zero algorithmic censorship.\n\nAll 18 modular services are active by default today.',
    mediaUrls: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    visibility: 'public',
    tags: ['OMNIConnect', 'SovereignSocial', 'SuperApp', 'FinTech', 'DecentralizedComms'],
    reactionsSummary: { like: 482, love: 312, celebrate: 195, insightful: 120, support: 84, amen: 42 },
    commentsCount: 86,
    sharesCount: 144,
    viewsCount: 14200,
    isPinned: true,
    isAiEnhanced: true,
    isModerated: true,
    isPaywalled: false,
    createdAt: '2026-08-18T16:30:00Z',
    updatedAt: '2026-08-18T16:30:00Z'
  },
  {
    id: 'post_002',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_org_003',
    authorDisplayName: 'Grace International Cathedral',
    authorHandle: '@grace.citychurch',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=150&auto=format&fit=crop&q=80',
    authorVerificationBadge: 'verified_official',
    contentType: 'event_invite',
    title: 'Global Faith & Leadership Summit 2026',
    content: 'Join us live this coming Sunday across all 12 global parish branches and via our high-definition interactive virtual stream on OMNI Connect! We will be covering community leadership, generational wealth governance, and faith in the digital economy.',
    mediaUrls: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80'],
    eventInvite: {
      eventId: 'evt_faith_summit_2026',
      eventTitle: 'Global Faith & Leadership Summit 2026',
      startDateTime: '2026-08-23T10:00:00Z',
      locationType: 'online'
    },
    visibility: 'public',
    tags: ['FaithAndWork', 'CommunityOutreach', 'LeadershipSummit', 'GraceCathedral'],
    reactionsSummary: { like: 215, love: 184, celebrate: 62, insightful: 44, support: 92, amen: 320 },
    commentsCount: 52,
    sharesCount: 98,
    viewsCount: 8900,
    isPinned: false,
    isAiEnhanced: false,
    isModerated: true,
    isPaywalled: false,
    createdAt: '2026-08-18T14:10:00Z',
    updatedAt: '2026-08-18T14:10:00Z'
  },
  {
    id: 'post_003',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_biz_002',
    authorDisplayName: 'Apex Global Financial Group',
    authorHandle: '@apex.finance',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
    authorVerificationBadge: 'verified_business',
    contentType: 'product_card',
    title: 'Enterprise Multi-Currency Treasury Suite v4.0',
    content: 'Automate your corporate liquidity pooling and cross-border FedNow/SEPA settlement in 160+ countries. Instantly book a live sandbox pilot directly through our OMNI Connect Storefront.',
    mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'],
    productCard: {
      productId: 'prod_treasury_suite_01',
      productName: 'Apex Enterprise Treasury Gateway SDK',
      price: 2500.0,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
      checkoutUrl: 'https://connect.omni.com/checkout/prod_treasury_suite_01'
    },
    visibility: 'public',
    tags: ['EnterpriseTreasury', 'BaaS', 'InstantSettlement', 'FinOps'],
    reactionsSummary: { like: 145, love: 68, celebrate: 89, insightful: 172, support: 31, amen: 0 },
    commentsCount: 28,
    sharesCount: 42,
    viewsCount: 6500,
    isPinned: false,
    isAiEnhanced: true,
    isModerated: true,
    isPaywalled: false,
    createdAt: '2026-08-18T11:45:00Z',
    updatedAt: '2026-08-18T11:45:00Z'
  }
];

// ============================================================================
// 4. REAL-TIME CONVERSATIONS & MESSAGES SEED
// ============================================================================

export const SEED_CONNECT_CONVERSATIONS: ConnectConversation[] = [
  {
    id: 'conv_direct_001',
    tenantId: 'tenant_primary_001',
    type: 'direct',
    title: 'Sarah Jenkins, CFA',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isEncrypted: true,
    participantProfileIds: ['prof_usr_001', 'prof_usr_004'],
    participants: [
      {
        profileId: 'prof_usr_001',
        name: 'Gideon Oluwalana',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'owner',
        onlineStatus: 'online'
      },
      {
        profileId: 'prof_usr_004',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'member',
        onlineStatus: 'online'
      }
    ],
    lastMessage: {
      id: 'msg_004',
      senderName: 'Sarah Jenkins',
      content: 'The $2.5M multi-currency liquidity pool rebalancing was approved and completed through FedNow.',
      timestamp: '2026-08-18T18:42:00Z',
      isRead: false
    },
    unreadCount: 1,
    pinned: true,
    archived: false,
    tags: ['Treasury', 'VIP', 'Encrypted'],
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-08-18T18:42:00Z'
  },
  {
    id: 'conv_group_002',
    tenantId: 'tenant_primary_001',
    type: 'group',
    title: 'OMNI Executive Steering Committee',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    isEncrypted: true,
    participantProfileIds: ['prof_usr_001', 'prof_usr_004', 'prof_biz_002'],
    participants: [
      {
        profileId: 'prof_usr_001',
        name: 'Gideon Oluwalana',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'owner',
        onlineStatus: 'online'
      },
      {
        profileId: 'prof_usr_004',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'admin',
        onlineStatus: 'online'
      },
      {
        profileId: 'prof_biz_002',
        name: 'Apex Finance Rep',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
        role: 'member',
        onlineStatus: 'idle'
      }
    ],
    lastMessage: {
      id: 'msg_006',
      senderName: 'Gideon Oluwalana',
      content: 'Let us initiate the HD video strategy conference at 19:00 UTC.',
      timestamp: '2026-08-18T18:15:00Z',
      isRead: true
    },
    unreadCount: 0,
    pinned: true,
    archived: false,
    tags: ['Steering', 'HighPriority'],
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-18T18:15:00Z'
  },
  {
    id: 'conv_crm_003',
    tenantId: 'tenant_enterprise_001',
    type: 'crm_inquiry',
    title: 'Dr. Michael Adeyemi (Lead Inbound)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isEncrypted: false,
    participantProfileIds: ['prof_usr_001', 'prof_biz_002'],
    participants: [
      {
        profileId: 'prof_usr_001',
        name: 'Gideon Oluwalana',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'owner',
        onlineStatus: 'online'
      }
    ],
    lastMessage: {
      id: 'msg_008',
      senderName: 'Dr. Michael Adeyemi',
      content: 'We are looking to deploy OMNI Connect across our 4 university campuses for 45,000 students.',
      timestamp: '2026-08-18T17:30:00Z',
      isRead: false
    },
    unreadCount: 2,
    pinned: false,
    archived: false,
    tags: ['EnterpriseLead', 'Education', 'ProposalPending'],
    associatedCrmContactId: 'contact_001',
    createdAt: '2026-08-18T16:00:00Z',
    updatedAt: '2026-08-18T17:30:00Z'
  }
];

export const SEED_CONNECT_MESSAGES: ConnectMessage[] = [
  {
    id: 'msg_001',
    tenantId: 'tenant_primary_001',
    conversationId: 'conv_direct_001',
    senderProfileId: 'prof_usr_001',
    senderName: 'Gideon Oluwalana',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    messageKind: 'text',
    content: 'Hi Sarah, did the automated EOD liquidity sweep from the Frankfurt entity settle cleanly into the London master vault?',
    isEndToEndEncrypted: true,
    deliveryStatus: 'read',
    sentAt: '2026-08-18T18:30:00Z',
    readAt: '2026-08-18T18:31:00Z',
    reactions: [{ reaction: '👍', profileId: 'prof_usr_004', profileName: 'Sarah Jenkins' }]
  },
  {
    id: 'msg_002',
    tenantId: 'tenant_primary_001',
    conversationId: 'conv_direct_001',
    senderProfileId: 'prof_usr_004',
    senderName: 'Sarah Jenkins',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    messageKind: 'voice_note',
    content: 'Voice note (0:32): Confirmed! €1.4M was transferred at spot rate with zero spread loss.',
    voiceDurationSec: 32,
    mediaUrl: 'https://cdn.omni.com/audio/voice_note_1842.mp3',
    isEndToEndEncrypted: true,
    deliveryStatus: 'read',
    sentAt: '2026-08-18T18:35:00Z',
    readAt: '2026-08-18T18:36:00Z',
    reactions: [{ reaction: '🔥', profileId: 'prof_usr_001', profileName: 'Gideon Oluwalana' }]
  },
  {
    id: 'msg_003',
    tenantId: 'tenant_primary_001',
    conversationId: 'conv_direct_001',
    senderProfileId: 'prof_usr_001',
    senderName: 'Gideon Oluwalana',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    messageKind: 'omni_pay_request',
    content: 'Disbursement Request: Executive quarterly research stipend',
    payRequest: {
      amount: 15000.0,
      currency: 'USD',
      description: 'Quarterly AI Research & Systems Grant',
      status: 'settled',
      transactionId: 'tx_omni_789410'
    },
    isEndToEndEncrypted: true,
    deliveryStatus: 'read',
    sentAt: '2026-08-18T18:38:00Z',
    readAt: '2026-08-18T18:39:00Z',
    reactions: []
  },
  {
    id: 'msg_004',
    tenantId: 'tenant_primary_001',
    conversationId: 'conv_direct_001',
    senderProfileId: 'prof_usr_004',
    senderName: 'Sarah Jenkins',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    messageKind: 'text',
    content: 'The $2.5M multi-currency liquidity pool rebalancing was approved and completed through FedNow.',
    isEndToEndEncrypted: true,
    deliveryStatus: 'delivered',
    sentAt: '2026-08-18T18:42:00Z',
    reactions: []
  }
];

// ============================================================================
// 5. COMMUNITIES & CHANNELS SEED
// ============================================================================

export const SEED_CONNECT_COMMUNITIES: ConnectCommunity[] = [
  {
    id: 'comm_sovereign_tech',
    tenantId: 'tenant_primary_001',
    name: 'OMNI Developers & Sovereign Tech',
    slug: 'omni-developers',
    tagline: 'Global builders constructing decentralized, AI-native infrastructure',
    description: 'The official developer and creator hub for building on OMNI SDKs, OMNI Finance OS, and OMNI Connect APIs.',
    scope: 'tech_dev',
    avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_usr_001',
    isVerified: true,
    isPrivate: false,
    membersCount: 42800,
    onlineCount: 3840,
    channelsCount: 6,
    eventsCount: 3,
    channels: [
      {
        id: 'chan_announcements',
        communityId: 'comm_sovereign_tech',
        tenantId: 'tenant_primary_001',
        name: '📢 announcements',
        topic: 'Official OMNI ecosystem releases and network updates',
        kind: 'announcements_broadcast',
        isPrivate: false,
        unreadCount: 0,
        isMuted: false,
        createdAt: '2026-01-10T10:00:00Z'
      },
      {
        id: 'chan_general_chat',
        communityId: 'comm_sovereign_tech',
        tenantId: 'tenant_primary_001',
        name: '💬 general-chat',
        topic: 'Open discussions on sovereign architecture and AI systems',
        kind: 'text_chat',
        isPrivate: false,
        unreadCount: 4,
        isMuted: false,
        createdAt: '2026-01-10T10:00:00Z'
      },
      {
        id: 'chan_dev_showcase',
        communityId: 'comm_sovereign_tech',
        tenantId: 'tenant_primary_001',
        name: '🚀 showcase-and-launches',
        topic: 'Share apps, white-label portals, and integrations you have deployed',
        kind: 'forum_feed',
        isPrivate: false,
        unreadCount: 1,
        isMuted: false,
        createdAt: '2026-01-10T10:00:00Z'
      },
      {
        id: 'chan_voice_stage',
        communityId: 'comm_sovereign_tech',
        tenantId: 'tenant_primary_001',
        name: '🎙️ Live Engineering Stage',
        topic: 'Weekly audio dev AMA and technical architecture reviews',
        kind: 'voice_room',
        isPrivate: false,
        unreadCount: 0,
        isMuted: false,
        createdAt: '2026-01-10T10:00:00Z'
      }
    ],
    roles: [
      { id: 'role_founder', name: 'Core Architect', color: '#6366f1', permissions: ['*'] },
      { id: 'role_moderator', name: 'Security Guardian', color: '#10b981', permissions: ['moderate_chat', 'kick_members'] },
      { id: 'role_verified_builder', name: 'Verified Builder', color: '#38bdf8', permissions: ['post_links', 'create_threads'] }
    ],
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: 'comm_grace_fellowship',
    tenantId: 'tenant_church_001',
    name: 'Grace Cathedral Global Fellowship',
    slug: 'grace-cathedral',
    tagline: 'Faith, Family, and Kingdom Community Across All Branches',
    description: 'Central community hub for Grace Cathedral branch members, ministry directors, department leaders, and youth fellowships.',
    scope: 'church_ministry',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&auto=format&fit=crop&q=80',
    ownerProfileId: 'prof_org_003',
    isVerified: true,
    isPrivate: false,
    membersCount: 18900,
    onlineCount: 2150,
    channelsCount: 5,
    eventsCount: 4,
    channels: [
      {
        id: 'chan_grace_announcements',
        communityId: 'comm_grace_fellowship',
        tenantId: 'tenant_church_001',
        name: '🔔 Pastor Announcements',
        topic: 'Weekly devotions, pastoral letters, and branch directives',
        kind: 'announcements_broadcast',
        isPrivate: false,
        unreadCount: 0,
        isMuted: false,
        createdAt: '2026-02-01T10:00:00Z'
      },
      {
        id: 'chan_prayer_requests',
        communityId: 'comm_grace_fellowship',
        tenantId: 'tenant_church_001',
        name: '🙏 prayer-and-testimonies',
        topic: 'Share your testimonies and submit prayer petitions',
        kind: 'forum_feed',
        isPrivate: false,
        unreadCount: 8,
        isMuted: false,
        createdAt: '2026-02-01T10:00:00Z'
      },
      {
        id: 'chan_choir_media_dept',
        communityId: 'comm_grace_fellowship',
        tenantId: 'tenant_church_001',
        name: '🎵 Choir & Creative Arts',
        topic: 'Rehearsals, order of service, and media coordination',
        kind: 'text_chat',
        isPrivate: true,
        unreadCount: 2,
        isMuted: false,
        createdAt: '2026-02-01T10:00:00Z'
      }
    ],
    roles: [
      { id: 'role_pastoral', name: 'Pastoral Council', color: '#f59e0b', permissions: ['*'] },
      { id: 'role_dept_lead', name: 'Department Head', color: '#8b5cf6', permissions: ['post_announcements', 'manage_dept'] },
      { id: 'role_member', name: 'Parish Member', color: '#64748b', permissions: ['participate_chat'] }
    ],
    createdAt: '2026-02-01T08:00:00Z'
  }
];

// ============================================================================
// 6. CRM CONTACTS & DEALS SEED
// ============================================================================

export const SEED_CONNECT_CONTACTS: ConnectContact[] = [
  {
    id: 'contact_001',
    tenantId: 'tenant_enterprise_001',
    businessAccountId: 'biz_acc_001',
    profileId: 'prof_lead_001',
    fullName: 'Dr. Michael Adeyemi',
    email: 'm.adeyemi@lagos-uni.edu.ng',
    phone: '+234 803 555 0192',
    companyName: 'Lagos Metropolitan University System',
    jobTitle: 'Chief Information Officer',
    leadSource: 'social_dm',
    leadStage: 'proposal_sent',
    estimatedLifetimeValueUsd: 145000.0,
    tags: ['University', 'CampusSocial', 'EnterpriseLicense', 'Nigeria'],
    lastContactedAt: '2026-08-18T17:30:00Z',
    notes: [
      'Expressed high interest in deploying OMNI Connect for 45k students with student fee payment integration.',
      'Custom white-label mobile app requested with university emblem.'
    ],
    createdAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'contact_002',
    tenantId: 'tenant_enterprise_001',
    businessAccountId: 'biz_acc_001',
    fullName: 'Elena Rostova',
    email: 'elena@nordic-fintech.se',
    phone: '+46 8 123 4567',
    companyName: 'Nordic Sovereign Payments AB',
    jobTitle: 'Head of Strategic Partnerships',
    leadSource: 'event_attendee',
    leadStage: 'negotiation',
    estimatedLifetimeValueUsd: 280000.0,
    tags: ['Nordics', 'BaaS', 'SEPAInstant', 'NeoBank'],
    lastContactedAt: '2026-08-17T14:15:00Z',
    notes: ['Contract in legal review for SEPA Instant gateway connection.'],
    createdAt: '2026-08-10T11:30:00Z'
  }
];

export const SEED_CONNECT_DEALS: ConnectCrmDeal[] = [
  {
    id: 'deal_001',
    tenantId: 'tenant_enterprise_001',
    contactId: 'contact_001',
    contactName: 'Dr. Michael Adeyemi',
    dealTitle: 'University Enterprise Campus Network & Multi-Branch Portals',
    valueUsd: 145000.0,
    stage: 'contract_review',
    probabilityPercent: 85,
    expectedCloseDate: '2026-09-15',
    assignedStaffProfileId: 'prof_usr_001',
    assignedStaffName: 'Gideon Oluwalana',
    activityHistory: [
      {
        id: 'act_01',
        type: 'message',
        summary: 'Received initial deployment inquiry via Connect DM',
        timestamp: '2026-08-15T09:12:00Z'
      },
      {
        id: 'act_02',
        type: 'meeting',
        summary: 'Conducted live OMNI Connect HD Video architectural walkthrough',
        timestamp: '2026-08-17T11:00:00Z'
      }
    ],
    createdAt: '2026-08-15T09:30:00Z'
  },
  {
    id: 'deal_002',
    tenantId: 'tenant_enterprise_001',
    contactId: 'contact_002',
    contactName: 'Elena Rostova',
    dealTitle: 'Nordic NeoBank White-Label Social Banking Integration',
    valueUsd: 280000.0,
    stage: 'contract_review',
    probabilityPercent: 90,
    expectedCloseDate: '2026-08-31',
    assignedStaffProfileId: 'prof_usr_001',
    assignedStaffName: 'Gideon Oluwalana',
    activityHistory: [
      {
        id: 'act_03',
        type: 'call',
        summary: 'Finalized custom fee-sharing economics and API rate limits',
        timestamp: '2026-08-17T14:30:00Z'
      }
    ],
    createdAt: '2026-08-10T12:00:00Z'
  }
];

// ============================================================================
// 7. EVENTS & HD WEBRTC MEETING ROOMS SEED
// ============================================================================

export const SEED_CONNECT_EVENTS: ConnectEvent[] = [
  {
    id: 'evt_faith_summit_2026',
    tenantId: 'tenant_primary_001',
    organizerProfileId: 'prof_org_003',
    organizerName: 'Grace International Cathedral',
    title: 'Global Faith & Leadership Summit 2026',
    description: 'International gathering uniting church ministers, civic leaders, and innovators for keynotes, workshops, and worship.',
    bannerUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80',
    format: 'hybrid',
    locationDetails: {
      isVirtual: true,
      virtualRoomUrl: 'https://connect.omni.com/meetings/faith_summit_live',
      physicalVenueName: 'Grace Main Auditorium',
      city: 'London',
      country: 'United Kingdom'
    },
    startDateTime: '2026-08-23T10:00:00Z',
    endDateTime: '2026-08-23T16:00:00Z',
    timezone: 'Europe/London',
    isTicketed: false,
    ticketPriceUsd: 0.0,
    rsvpCount: 2450,
    attendees: [
      {
        profileId: 'prof_usr_001',
        name: 'Gideon Oluwalana',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'going',
        ticketPaid: true
      },
      {
        profileId: 'prof_usr_004',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        status: 'going',
        ticketPaid: true
      }
    ],
    createdAt: '2026-08-10T08:00:00Z'
  },
  {
    id: 'evt_fintech_roundtable',
    tenantId: 'tenant_primary_001',
    organizerProfileId: 'prof_biz_002',
    organizerName: 'Apex Global Financial Group',
    title: 'Instant Rail Liquidity & FedNow 24/7/365 Roundtable',
    description: 'Executive roundtable on real-time settlement rails, automated cash sweeps, and multi-currency treasury architectures.',
    bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    format: 'online_webinar',
    locationDetails: {
      isVirtual: true,
      virtualRoomUrl: 'https://connect.omni.com/meetings/fednow_roundtable'
    },
    startDateTime: '2026-08-27T15:00:00Z',
    endDateTime: '2026-08-27T17:00:00Z',
    timezone: 'America/New_York',
    isTicketed: true,
    ticketPriceUsd: 149.0,
    maxAttendees: 500,
    rsvpCount: 382,
    attendees: [],
    createdAt: '2026-08-12T10:00:00Z'
  }
];

export const SEED_MEETING_ROOM: ConnectMeetingRoom = {
  id: 'room_omni_exec_01',
  tenantId: 'tenant_primary_001',
  roomTitle: 'OMNI Executive & Architecture Sync',
  hostProfileId: 'prof_usr_001',
  hostName: 'Gideon Oluwalana',
  isLocked: false,
  isRecording: true,
  isAiTranscribing: true,
  activeParticipants: [
    {
      profileId: 'prof_usr_001',
      name: 'Gideon Oluwalana',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isMutedAudio: false,
      isMutedVideo: false,
      isScreenSharing: true,
      isHandRaised: false,
      connectionQuality: 'excellent'
    },
    {
      profileId: 'prof_usr_004',
      name: 'Sarah Jenkins, CFA',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      isMutedAudio: false,
      isMutedVideo: false,
      isScreenSharing: false,
      isHandRaised: false,
      connectionQuality: 'excellent'
    }
  ],
  liveTranscript: [
    {
      id: 'tr_01',
      speakerName: 'Gideon Oluwalana',
      text: 'Welcome everyone. We have successfully registered OMNI Connect in the application manifest with all 18 capabilities verified active.',
      timestamp: '18:50:12'
    },
    {
      id: 'tr_02',
      speakerName: 'Sarah Jenkins',
      text: 'Excellent. The OMNI Finance OS settlement hooks are connected for in-feed social commerce and tipping.',
      timestamp: '18:50:35'
    }
  ],
  aiMeetingSummary: {
    keyDecisions: [
      'Approved 100% active-by-default status for all OMNI Connect modules in the Super Admin switchboard.',
      'Confirmed seamless OMNI Passport multi-profile switching without secondary credentials.'
    ],
    actionItems: [
      { task: 'Deploy real-time WebRTC presence engine', assignee: 'Gideon Oluwalana' },
      { task: 'Validate CRM deal pipeline stage automation', assignee: 'Sarah Jenkins' }
    ],
    summaryParagraph: 'The executive team reviewed OMNI Connect deployment parameters, certifying zero duplication of Core auth and payment infrastructure while enabling rich social, community, and commercial super-app features.'
  },
  startedAt: '2026-08-18T18:45:00Z'
};

// ============================================================================
// 8. COMMERCE PRODUCTS SEED
// ============================================================================

export const SEED_COMMERCE_PRODUCTS: ConnectCommerceProduct[] = [
  {
    id: 'prod_treasury_suite_01',
    tenantId: 'tenant_enterprise_001',
    sellerProfileId: 'prof_biz_002',
    sellerName: 'Apex Global Financial Group',
    sellerRating: 4.9,
    title: 'Apex Enterprise Treasury Gateway SDK',
    description: 'Full-stack BaaS integration kit supporting real-time FedNow, SEPA, and PIX payment routing with zero reconciliation error.',
    priceUsd: 2500.0,
    currency: 'USD',
    category: 'digital_download',
    inventoryCount: 999,
    mediaUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'],
    salesCount: 68,
    isInstantDelivery: true,
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'prod_sovereign_masterclass',
    tenantId: 'tenant_primary_001',
    sellerProfileId: 'prof_usr_001',
    sellerName: 'Gideon Oluwalana',
    sellerRating: 5.0,
    title: 'Sovereign Digital Architecture Masterclass & Code Templates',
    description: 'Comprehensive 12-module video course with production-ready TypeScript templates for building high-concurrency operating systems.',
    priceUsd: 199.0,
    currency: 'USD',
    category: 'course',
    inventoryCount: 5000,
    mediaUrls: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'],
    salesCount: 1420,
    isInstantDelivery: true,
    createdAt: '2026-08-05T12:00:00Z'
  }
];

// ============================================================================
// 9. CREATOR STUDIO STATS SEED
// ============================================================================

export const SEED_CREATOR_STATS: CreatorStudioStats = {
  profileId: 'prof_usr_001',
  totalFollowers: 38400,
  monthlyReach: 142000,
  engagementRatePercent: 8.4,
  totalEarningsUsd: 34250.0,
  monthlyRecurringRevenueUsd: 6850.0,
  subscribersCount: 284,
  tipJarEarningsUsd: 3420.0,
  topPosts: [
    {
      id: 'post_001',
      title: 'OMNI Connect: The Sovereign Relationship Layer is Live',
      views: 14200,
      likes: 482,
      shares: 144,
      revenueUsd: 1250.0
    },
    {
      id: 'post_003',
      title: 'Decentralized Double-Entry Accounting Invariants',
      views: 9800,
      likes: 380,
      shares: 92,
      revenueUsd: 840.0
    }
  ],
  recentSubscribers: [
    { subscriberName: 'Sarah Jenkins', tierName: 'Founding Patron ($25/mo)', amountUsd: 25.0, subscribedAt: '2026-08-18T10:15:00Z' },
    { subscriberName: 'Dr. Michael Adeyemi', tierName: 'Institutional Tier ($100/mo)', amountUsd: 100.0, subscribedAt: '2026-08-17T16:30:00Z' },
    { subscriberName: 'Alexander Hayes', tierName: 'Pro Creator ($10/mo)', amountUsd: 10.0, subscribedAt: '2026-08-16T11:00:00Z' }
  ]
};

// ============================================================================
// 10. USER PRESENCE & AUDIT LOGS SEED
// ============================================================================

export const SEED_CONNECT_PRESENCE: ConnectUserPresence[] = [
  {
    profileId: 'prof_usr_001',
    displayName: 'Gideon Oluwalana',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    customStatusText: '🚀 Building OMNI Connect Super-App',
    activeDevice: 'desktop_app',
    lastSeenAt: '2026-08-18T18:55:00Z'
  },
  {
    profileId: 'prof_usr_004',
    displayName: 'Sarah Jenkins, CFA',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    customStatusText: '📈 Reviewing multi-currency liquidity',
    activeDevice: 'web',
    lastSeenAt: '2026-08-18T18:54:00Z'
  },
  {
    profileId: 'prof_biz_002',
    displayName: 'Apex Global Financial Group',
    avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
    status: 'idle',
    activeDevice: 'web',
    lastSeenAt: '2026-08-18T18:40:00Z'
  }
];

export const SEED_CONNECT_AUDIT_LOGS: ConnectAuditLog[] = [
  {
    id: 'aud_001',
    tenantId: 'tenant_primary_001',
    timestamp: '2026-08-18T18:50:00Z',
    actorProfileId: 'prof_usr_001',
    actorName: 'Gideon Oluwalana',
    action: 'connect.feature_module.activated',
    targetType: 'feature_flag',
    targetId: 'messaging',
    ipAddress: '192.0.2.1',
    userAgent: 'OMNI-Native/2.0',
    severity: 'info',
    details: { module: 'messaging', status: 'ACTIVE', scope: 'GLOBAL' },
    merkleHashProof: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'aud_002',
    tenantId: 'tenant_primary_001',
    timestamp: '2026-08-18T18:42:00Z',
    actorProfileId: 'prof_usr_004',
    actorName: 'Sarah Jenkins',
    action: 'connect.message.sent',
    targetType: 'message',
    targetId: 'msg_004',
    ipAddress: '198.51.100.44',
    userAgent: 'OMNI-Connect-Web/1.0',
    severity: 'info',
    details: { conversationId: 'conv_direct_001', e2ee: true },
    merkleHashProof: 'sha256:cb8379ac2098aa165029e3938a51da0bcecfc008fd00874e174b55165d832b25'
  }
];
