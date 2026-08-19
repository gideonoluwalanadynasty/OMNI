/**
 * OMNI SOCIAL CONTENT ENGINE — SEED DATA
 * Rich, authentic data structures for Feed, Moments, Status,
 * Cloud Media, Recommendation Algorithm, Moderation, and Creator Analytics.
 */

import {
  OmniSocialPost,
  OmniMoment,
  OmniStatusItem,
  FeedAlgorithmConfig,
  ContentModerationReport,
  CloudStorageQuota,
  OmniMediaFileRecord,
  CreatorAnalyticsData
} from '../types/omni_social_engine';

export const SEED_FEED_ALGORITHM_CONFIG: FeedAlgorithmConfig = {
  relationshipWeight: 40,
  interestWeight: 25,
  engagementVelocityWeight: 15,
  freshnessDecayWeight: 10,
  communityBoostWeight: 5,
  businessRelevanceWeight: 5,
  currentMode: 'algorithmic',
  mutedTopics: ['gambling', 'clickbait'],
  mutedUsers: ['@spambot_3000'],
  hiddenPostIds: []
};

export const SEED_SOCIAL_POSTS: OmniSocialPost[] = [
  {
    id: 'post_soc_001',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_gideon_001',
    authorHandle: '@gideon',
    authorName: 'Gideon Oluwalanadynasty',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    authorBadge: 'verified_official',
    authorType: 'creator',
    format: 'carousel',
    title: 'Architecting Sovereign Digital Infrastructure: The 7 Pillars of OMNI Connect',
    contentText: 'We have officially deployed the multi-tenant Relationship Intelligence Graph across OMNI Connect. By decoupling user identity from centralized silos and anchoring all graph connections into cryptographic privacy proofs, creators and enterprises now own 100% of their social and transactional distribution.\n\nSwipe through the architectural overview below to see how our zero-leakage RLS partitioning operates at scale. #SovereignTech #OMNIConnect #DecentralizedIdentity #Web5',
    media: [
      {
        id: 'med_001',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300',
        name: 'Omni_Network_Topology.png',
        sizeBytes: 2450000,
        mimeType: 'image/png',
        aspectRatio: '16:9',
        cloudStorageKey: 'cdn/media/topology_v4.png',
        cdnUrl: 'https://cdn.omni.com/media/topology_v4.png',
        processingStatus: 'ready'
      },
      {
        id: 'med_002',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300',
        name: 'Sovereign_Graph_Engine.png',
        sizeBytes: 1890000,
        mimeType: 'image/png',
        aspectRatio: '16:9',
        cloudStorageKey: 'cdn/media/graph_engine_v2.png',
        cdnUrl: 'https://cdn.omni.com/media/graph_engine_v2.png',
        processingStatus: 'ready'
      },
      {
        id: 'med_003',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300',
        name: 'Merkle_Proof_Auditor.png',
        sizeBytes: 3100000,
        mimeType: 'image/png',
        aspectRatio: '16:9',
        cloudStorageKey: 'cdn/media/merkle_v1.png',
        cdnUrl: 'https://cdn.omni.com/media/merkle_v1.png',
        processingStatus: 'ready'
      }
    ],
    hashtags: ['SovereignTech', 'OMNIConnect', 'DecentralizedIdentity', 'Web5'],
    mentions: ['@dynasty_corp', '@dr_elena'],
    reactions: {
      like: 412,
      love: 189,
      insightful: 342,
      celebrate: 98,
      support: 64,
      fire: 275,
      sovereign: 512
    },
    userReaction: 'sovereign',
    commentsCount: 48,
    sharesCount: 136,
    savesCount: 290,
    viewsCount: 12450,
    isSaved: true,
    isShared: false,
    audience: 'public',
    pinned: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    moderationStatus: 'approved',
    aiSummary: 'Comprehensive architectural breakdown of OMNI Connect multi-tenant graph engine and cryptographic privacy models.',
    language: 'en',
    monetization: {
      isPaywalled: false,
      allowTips: true,
      totalTipsEarnedUsd: 1450.00,
      adRevenueEarnedUsd: 320.50
    },
    comments: [
      {
        id: 'comm_001',
        postId: 'post_soc_001',
        authorProfileId: 'prof_elena_001',
        authorHandle: '@dr_elena',
        authorName: 'Dr. Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        authorBadge: 'verified_creator',
        text: 'The mathematical guarantees on zero-leakage RLS partition bounds are phenomenal. We are benchmarking our cross-border FX routing on top of this exact layer today.',
        createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
        likesCount: 38,
        userLiked: true,
        replies: [
          {
            id: 'comm_002',
            postId: 'post_soc_001',
            parentCommentId: 'comm_001',
            authorProfileId: 'prof_gideon_001',
            authorHandle: '@gideon',
            authorName: 'Gideon Oluwalanadynasty',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            authorBadge: 'verified_official',
            text: 'Thank you Elena! Next week we are open-sourcing the formal verification scripts for community audits.',
            createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
            likesCount: 19,
            userLiked: false
          }
        ]
      }
    ]
  },
  {
    id: 'post_soc_002',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_dynasty_001',
    authorHandle: '@dynasty_holdings',
    authorName: 'Dynasty Global Holdings',
    authorAvatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150',
    authorBadge: 'verified_business',
    authorType: 'business',
    format: 'product',
    title: 'OMNI Sovereign Hardware Key — Enterprise Vault Edition',
    contentText: 'Physical hardware security meets OMNI Passport biometric signing. Protect corporate treasury keys, sovereign database nodes, and multisig governance approvals with FIPS 140-3 Level 4 certified physical silicon.\n\nNow shipping worldwide with instant OmniPay 1-click checkout and zero foreign transaction fees.',
    media: [
      {
        id: 'med_004',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1000',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=300',
        name: 'Hardware_Key_Vault.png',
        sizeBytes: 1540000,
        mimeType: 'image/png',
        aspectRatio: '1:1',
        cloudStorageKey: 'cdn/products/vault_key_2026.png',
        cdnUrl: 'https://cdn.omni.com/products/vault_key_2026.png',
        processingStatus: 'ready'
      }
    ],
    product: {
      id: 'prod_vault_key_01',
      name: 'OMNI Sovereign Hardware Key (Enterprise Edition)',
      priceUsd: 249.00,
      originalPriceUsd: 320.00,
      currency: 'USD',
      imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400',
      inStock: true,
      checkoutUrl: 'https://market.omni.com/products/vault-key-enterprise',
      commissionRatePercent: 12
    },
    hashtags: ['HardwareSecurity', 'OmniPay', 'EnterpriseTreasury', 'Fintech'],
    mentions: ['@gideon'],
    reactions: {
      like: 215,
      love: 94,
      insightful: 140,
      celebrate: 82,
      support: 35,
      fire: 160,
      sovereign: 310
    },
    commentsCount: 22,
    sharesCount: 65,
    savesCount: 140,
    viewsCount: 8900,
    isSaved: false,
    isShared: false,
    audience: 'public',
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    moderationStatus: 'approved',
    language: 'en'
  },
  {
    id: 'post_soc_003',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_marcus_001',
    authorHandle: '@marcus_chen',
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    authorBadge: 'verified_creator',
    authorType: 'creator',
    format: 'poll',
    title: 'Community Poll: Primary Cross-Border Settlement Infrastructure for 2026',
    contentText: 'As corporate treasuries shift away from legacy SWIFT correspondent banking delays, which sovereign settlement architecture is your organisation prioritizing for high-velocity cross-border settlement this year?',
    media: [],
    poll: {
      id: 'poll_settlement_01',
      question: 'Which sovereign settlement rail does your team utilize most?',
      options: [
        { id: 'opt_1', text: 'OMNI Finance OS Multi-Currency FX Engine', votesCount: 584, voterProfileIds: ['prof_gideon_001'] },
        { id: 'opt_2', text: 'Cryptographic Stable Settlement (USDC / Sovereign Vault)', votesCount: 312, voterProfileIds: [] },
        { id: 'opt_3', text: 'Hybrid Local Real-Time Gross Settlement (RTGS)', votesCount: 148, voterProfileIds: [] },
        { id: 'opt_4', text: 'Legacy Correspondent Wire Rails', votesCount: 34, voterProfileIds: [] }
      ],
      totalVotes: 1078,
      expiresAt: new Date(Date.now() + 3600000 * 48).toISOString(),
      allowsMultiple: false,
      userVotedOptionIds: ['opt_1']
    },
    hashtags: ['TreasuryManagement', 'FintechSurvey', 'CrossBorderPayments', 'GlobalLiquidity'],
    mentions: ['@gideon', '@dr_elena'],
    reactions: {
      like: 160,
      love: 45,
      insightful: 210,
      celebrate: 32,
      support: 18,
      fire: 88,
      sovereign: 230
    },
    commentsCount: 36,
    sharesCount: 84,
    savesCount: 95,
    viewsCount: 7600,
    isSaved: false,
    isShared: false,
    audience: 'public',
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    moderationStatus: 'approved',
    language: 'en'
  },
  {
    id: 'post_soc_004',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_sarah_001',
    authorHandle: '@sarah_jenkins',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    authorBadge: 'verified_creator',
    authorType: 'creator',
    format: 'audio',
    title: 'The Sovereign Creator Podcast — Episode 42: Monetization Without Platform Rent',
    contentText: 'In this episode, I break down how zero-platform-fee models in OMNI Connect Creator Studio allowed our media company to scale from $12k/mo to $85k/mo in direct subscriber patronage and shoppable live streams.\n\nListen to the 18-minute masterclass directly inside the native audio player below! 🎙️🎧',
    media: [
      {
        id: 'med_005',
        type: 'audio',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600',
        name: 'Sovereign_Creator_Ep42.mp3',
        sizeBytes: 18400000,
        mimeType: 'audio/mp3',
        durationSec: 1080,
        cloudStorageKey: 'cdn/audio/ep42_masterclass.mp3',
        cdnUrl: 'https://cdn.omni.com/audio/ep42_masterclass.mp3',
        processingStatus: 'ready'
      }
    ],
    hashtags: ['CreatorEconomy', 'AudioMasterclass', 'DirectMonetization', 'ZeroPlatformFee'],
    mentions: ['@gideon'],
    reactions: {
      like: 310,
      love: 180,
      insightful: 240,
      celebrate: 110,
      support: 75,
      fire: 195,
      sovereign: 380
    },
    commentsCount: 42,
    sharesCount: 112,
    savesCount: 220,
    viewsCount: 11200,
    isSaved: true,
    isShared: false,
    audience: 'public',
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    moderationStatus: 'approved',
    language: 'en'
  },
  {
    id: 'post_soc_005',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_gideon_001',
    authorHandle: '@gideon',
    authorName: 'Gideon Oluwalanadynasty',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    authorBadge: 'verified_official',
    authorType: 'creator',
    format: 'event',
    title: 'Global Sovereign Developers & Builders Summit 2026',
    contentText: 'Join over 5,000 developers, architects, and sovereign enterprise builders for the annual OMNI Global Summit. We will showcase Live Gemini 2.5 Copilot integration, multi-currency payment settlement pipelines, and the new OMNI Browser extensions.\n\nRSVP to claim your verified attendee NFT pass and access private stage channels!',
    media: [
      {
        id: 'med_006',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300',
        name: 'Summit_Banner_2026.png',
        sizeBytes: 3400000,
        mimeType: 'image/png',
        aspectRatio: '16:9',
        cloudStorageKey: 'cdn/events/summit_2026.png',
        cdnUrl: 'https://cdn.omni.com/events/summit_2026.png',
        processingStatus: 'ready'
      }
    ],
    event: {
      id: 'event_summit_2026',
      title: 'Global Sovereign Builders Summit 2026',
      location: 'Virtual Stage & Sovereign Node Hub, London / Geneva',
      startDate: new Date(Date.now() + 3600000 * 24 * 7).toISOString(),
      endDate: new Date(Date.now() + 3600000 * 24 * 9).toISOString(),
      rsvpCount: 2840,
      isAttending: true,
      coverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      category: 'Keynote & Hackathon'
    },
    hashtags: ['OmniSummit2026', 'Developers', 'Web5', 'Hackathon'],
    mentions: ['@dr_elena', '@marcus_chen'],
    reactions: {
      like: 480,
      love: 260,
      insightful: 390,
      celebrate: 210,
      support: 88,
      fire: 420,
      sovereign: 710
    },
    commentsCount: 65,
    sharesCount: 240,
    savesCount: 410,
    viewsCount: 18900,
    isSaved: true,
    isShared: true,
    audience: 'public',
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    moderationStatus: 'approved',
    language: 'en'
  },
  {
    id: 'post_soc_006',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_gideon_001',
    authorHandle: '@gideon',
    authorName: 'Gideon Oluwalanadynasty',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    authorBadge: 'verified_official',
    authorType: 'creator',
    format: 'livestream',
    title: 'LIVE NOW: Engineering Sovereign Relationship Graphs & AI Moderation',
    contentText: 'We are live streaming deep inside the engine room! Watch our real-time demonstration of sub-10ms graph queries, automated AI content moderation pipelines, and peer-to-peer media delivery.',
    media: [],
    liveStream: {
      id: 'live_stream_01',
      title: 'Deep Dive: Relationship Intelligence Graph Architecture',
      status: 'live',
      viewersCount: 1420,
      playbackUrl: 'https://cdn.omni.com/live/gideon_keynote.m3u8',
      scheduledAt: new Date().toISOString(),
      recordingAvailable: true
    },
    hashtags: ['LiveKeynote', 'SystemArchitecture', 'InteractiveCoding', 'OMNI'],
    mentions: ['@dr_elena'],
    reactions: {
      like: 340,
      love: 190,
      insightful: 280,
      celebrate: 140,
      support: 60,
      fire: 310,
      sovereign: 620
    },
    commentsCount: 89,
    sharesCount: 180,
    savesCount: 190,
    viewsCount: 9400,
    isSaved: false,
    isShared: true,
    audience: 'public',
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    moderationStatus: 'approved',
    language: 'en'
  },
  {
    id: 'post_soc_007',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_david_001',
    authorHandle: '@rev_david',
    authorName: 'Rev. David O. Adeleke',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    authorBadge: 'verified_business',
    authorType: 'organization',
    format: 'document',
    title: 'Ecclesiastical Diocesan Charter & Sovereign Stewardship Whitepaper',
    contentText: 'We are pleased to publish our 2026 Global Mission & Community Stewardship Report. This document outlines our transparent fund disbursements and charitable initiatives coordinated across 45 national chapters via OMNI Connect Circles.\n\nDownload the certified PDF document below.',
    media: [
      {
        id: 'med_007',
        type: 'document',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300',
        name: 'Stewardship_Charter_2026.pdf',
        sizeBytes: 4800000,
        mimeType: 'application/pdf',
        cloudStorageKey: 'cdn/docs/charter_2026.pdf',
        cdnUrl: 'https://cdn.omni.com/docs/charter_2026.pdf',
        processingStatus: 'ready'
      }
    ],
    hashtags: ['Stewardship', 'FaithCommunity', 'Transparency', 'GlobalMissions'],
    mentions: ['@gideon'],
    reactions: {
      like: 195,
      love: 120,
      insightful: 145,
      celebrate: 65,
      support: 140,
      fire: 45,
      sovereign: 320
    },
    commentsCount: 18,
    sharesCount: 52,
    savesCount: 88,
    viewsCount: 5400,
    isSaved: false,
    isShared: false,
    audience: 'public',
    pinned: false,
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    moderationStatus: 'approved',
    language: 'en'
  }
];

export const SEED_MOMENTS: OmniMoment[] = [
  {
    id: 'moment_001',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_gideon_001',
    authorHandle: '@gideon',
    authorName: 'Gideon Oluwalanadynasty',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    authorBadge: 'verified_official',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-grid-animation-31835-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    caption: 'Building real-time relationship intelligence that respects user sovereignty ⚡️🔒 #SovereignTech #OMNI #Architecture',
    durationSec: 15,
    musicTrack: {
      id: 'track_001',
      title: 'Synthesized Horizons (Original Mix)',
      artist: 'OMNI Audio Labs',
      durationSec: 60,
      albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150'
    },
    filterName: 'Sovereign Glow',
    textOverlays: [
      { text: 'ZERO SILOS', x: 50, y: 30, fontSize: 24, color: '#6366f1', style: 'font-bold tracking-wider' },
      { text: '100% USER SOVEREIGNTY', x: 50, y: 70, fontSize: 18, color: '#ffffff', style: 'font-semibold' }
    ],
    aiEnhanced: true,
    collaborativeWith: [
      { profileId: 'prof_elena_001', handle: '@dr_elena', name: 'Dr. Elena Rostova', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' }
    ],
    likesCount: 1420,
    commentsCount: 128,
    sharesCount: 380,
    viewsCount: 24500,
    isLiked: true,
    isSaved: true,
    tags: ['SovereignTech', 'OMNI', 'Architecture', 'Web5'],
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    aspectRatio: '9:16'
  },
  {
    id: 'moment_002',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_elena_001',
    authorHandle: '@dr_elena',
    authorName: 'Dr. Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    authorBadge: 'verified_creator',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-with-green-screen-mockup-41551-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
    caption: 'Testing 1-click biometric payments with multi-currency dynamic FX conversion in OMNI Pay! 💸✨ #Fintech #GlobalCommerce',
    durationSec: 12,
    musicTrack: {
      id: 'track_002',
      title: 'Neon Pulse Waves',
      artist: 'Cybernetics Sound',
      durationSec: 45,
      albumCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150'
    },
    filterName: 'Cyberpunk Gold',
    aiEnhanced: true,
    likesCount: 890,
    commentsCount: 64,
    sharesCount: 145,
    viewsCount: 14200,
    isLiked: false,
    isSaved: false,
    tags: ['Fintech', 'GlobalCommerce', 'OmniPay'],
    createdAt: new Date(Date.now() - 3600000 * 7).toISOString(),
    aspectRatio: '9:16'
  },
  {
    id: 'moment_003',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_marcus_001',
    authorHandle: '@marcus_chen',
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    authorBadge: 'verified_creator',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31834-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    caption: 'How to automate lead attribution across your CRM circles in under 60 seconds 📊📈 #SalesTech #CRM',
    durationSec: 20,
    musicTrack: {
      id: 'track_003',
      title: 'Deep Focus Flow',
      artist: 'Kinetics Studio',
      durationSec: 60,
      albumCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150'
    },
    filterName: 'Natural Luxe',
    aiEnhanced: false,
    likesCount: 650,
    commentsCount: 42,
    sharesCount: 110,
    viewsCount: 9800,
    isLiked: false,
    isSaved: true,
    tags: ['SalesTech', 'CRM', 'OMNIConnect'],
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    aspectRatio: '9:16'
  }
];

export const SEED_STATUS_ITEMS: OmniStatusItem[] = [
  {
    id: 'stat_001',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_gideon_001',
    authorHandle: '@gideon',
    authorName: 'Gideon Oluwalanadynasty',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    authorBadge: 'verified_official',
    type: 'text',
    text: 'Deploying the final OMNI Social Content Engine modules. Complete sovereignty across Feed, Moments, Status, Cloud Media & AI Creation! 🚀✨',
    backgroundTheme: 'from-indigo-600 via-purple-600 to-pink-600',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 22).toISOString(),
    durationHours: 24,
    audience: 'public',
    views: [
      { profileId: 'prof_elena_001', handle: '@dr_elena', name: 'Dr. Elena Rostova', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', viewedAt: new Date(Date.now() - 3600000 * 1).toISOString() },
      { profileId: 'prof_marcus_001', handle: '@marcus_chen', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', viewedAt: new Date(Date.now() - 3600000 * 1.5).toISOString() },
      { profileId: 'prof_sarah_001', handle: '@sarah_jenkins', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', viewedAt: new Date(Date.now() - 3600000 * 0.5).toISOString() }
    ],
    repliesCount: 8,
    reactions: [
      { profileId: 'prof_elena_001', emoji: '🔥', reactedAt: new Date(Date.now() - 3600000 * 1).toISOString() },
      { profileId: 'prof_marcus_001', emoji: '👑', reactedAt: new Date(Date.now() - 3600000 * 1.2).toISOString() },
      { profileId: 'prof_sarah_001', emoji: '⚡️', reactedAt: new Date(Date.now() - 3600000 * 0.4).toISOString() }
    ]
  },
  {
    id: 'stat_002',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_elena_001',
    authorHandle: '@dr_elena',
    authorName: 'Dr. Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    authorBadge: 'verified_creator',
    type: 'image',
    contentUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
    text: 'Keynote prep session at our Zurich research lab! 🇨🇭☕️',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 19).toISOString(),
    durationHours: 24,
    audience: 'followers',
    views: [
      { profileId: 'prof_gideon_001', handle: '@gideon', name: 'Gideon Oluwalanadynasty', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', viewedAt: new Date(Date.now() - 3600000 * 4).toISOString() }
    ],
    repliesCount: 3,
    reactions: [
      { profileId: 'prof_gideon_001', emoji: '🙌', reactedAt: new Date(Date.now() - 3600000 * 4).toISOString() }
    ]
  },
  {
    id: 'stat_003',
    tenantId: 'tenant_primary_001',
    authorProfileId: 'prof_marcus_001',
    authorHandle: '@marcus_chen',
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    authorBadge: 'verified_creator',
    type: 'audio',
    contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    text: 'Quick voice note on relationship graph edge scoring optimization 🎙️',
    audioDurationSec: 42,
    backgroundTheme: 'from-amber-600 via-orange-600 to-red-600',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 16).toISOString(),
    durationHours: 24,
    audience: 'circles',
    allowedCircleIds: ['circle_advisors_board'],
    views: [],
    repliesCount: 1,
    reactions: []
  }
];

export const SEED_MODERATION_REPORTS: ContentModerationReport[] = [
  {
    id: 'mod_rep_001',
    targetType: 'post',
    targetId: 'post_flagged_dummy_01',
    authorProfileId: 'prof_unknown_bot',
    authorHandle: '@crypto_airdrop_bot',
    snippet: 'CLAIM $50,000 FREE AIRDROP NOW CLICK SUSPICIOUS-LINK.XYZ BEFORE TIMEOUT!',
    flaggedReason: 'spam',
    aiConfidenceScore: 0.99,
    toxicityScore: 0.88,
    humanReviewStatus: 'banned',
    reviewerNotes: 'Automated AI quarantine confirmed by Super Admin. Bot banned permanently.',
    auditedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    auditHash: 'sha256:mod_098f6bcd4621d373cade4e832627b4f6'
  },
  {
    id: 'mod_rep_002',
    targetType: 'comment',
    targetId: 'comm_flagged_dummy_02',
    authorProfileId: 'prof_troll_99',
    authorHandle: '@toxic_user_44',
    snippet: 'Disparaging harassment text directed at community organizers.',
    flaggedReason: 'harassment',
    aiConfidenceScore: 0.94,
    toxicityScore: 0.92,
    humanReviewStatus: 'hidden',
    reviewerNotes: 'Content hidden, warning issued to user account.',
    auditedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    auditHash: 'sha256:mod_ad0234829205b9033196ba818f7a872b'
  },
  {
    id: 'mod_rep_003',
    targetType: 'moment',
    targetId: 'moment_review_pending',
    authorProfileId: 'prof_sample_creator',
    authorHandle: '@indie_artist',
    snippet: 'Short video containing copyrighted audio sample claim.',
    flaggedReason: 'copyright_ip',
    aiConfidenceScore: 0.72,
    toxicityScore: 0.05,
    humanReviewStatus: 'pending',
    reviewerNotes: 'Under fair use and creative commons review.',
    auditedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    auditHash: 'sha256:mod_8c6976e5b5410415bde908bd4dee15df'
  }
];

export const SEED_CLOUD_STORAGE_QUOTA: CloudStorageQuota = {
  totalAllocatedBytes: 53687091200, // 50 GB
  usedBytes: 14820000000, // ~13.8 GB
  imageStorageBytes: 6200000000,
  videoStorageBytes: 6800000000,
  audioStorageBytes: 1200000000,
  documentStorageBytes: 620000000,
  cdnCacheHitRatePercent: 98.4,
  edgeNodesActive: 48
};

export const SEED_CLOUD_MEDIA_FILES: OmniMediaFileRecord[] = [
  {
    id: 'file_cloud_01',
    fileName: 'Omni_Network_Topology.png',
    fileType: 'image',
    sizeBytes: 2450000,
    uploadedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    cloudBucket: 'omni-primary-assets-eu-west',
    cdnUrl: 'https://cdn.omni.com/media/topology_v4.png',
    checksum: 'sha256:7f83b1657ff1fc53b92dc18148a1d65d',
    associatedPostId: 'post_soc_001'
  },
  {
    id: 'file_cloud_02',
    fileName: 'Keynote_Video_Master_4K.mp4',
    fileType: 'video',
    sizeBytes: 420000000,
    uploadedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    cloudBucket: 'omni-video-transcoded-us-east',
    cdnUrl: 'https://cdn.omni.com/video/keynote_master_4k.mp4',
    checksum: 'sha256:9c83b1657ff1fc53b92dc18148a1d77a',
    associatedPostId: 'post_soc_006'
  },
  {
    id: 'file_cloud_03',
    fileName: 'Sovereign_Creator_Ep42.mp3',
    fileType: 'audio',
    sizeBytes: 18400000,
    uploadedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    cloudBucket: 'omni-audio-lossless-global',
    cdnUrl: 'https://cdn.omni.com/audio/ep42_masterclass.mp3',
    checksum: 'sha256:5a83b1657ff1fc53b92dc18148a1d22f',
    associatedPostId: 'post_soc_004'
  },
  {
    id: 'file_cloud_04',
    fileName: 'Stewardship_Charter_2026.pdf',
    fileType: 'document',
    sizeBytes: 4800000,
    uploadedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
    cloudBucket: 'omni-secure-docs-vault',
    cdnUrl: 'https://cdn.omni.com/docs/charter_2026.pdf',
    checksum: 'sha256:3d83b1657ff1fc53b92dc18148a1d99c',
    associatedPostId: 'post_soc_007'
  }
];

export const SEED_CREATOR_ANALYTICS: CreatorAnalyticsData = {
  totalImpressions: 148500,
  totalReach: 92400,
  engagementRatePercent: 8.6,
  followerGrowthWeekly: 14.2,
  topPerformingPosts: [
    {
      id: 'post_soc_001',
      title: 'Architecting Sovereign Digital Infrastructure: The 7 Pillars of OMNI Connect',
      reach: 12450,
      engagement: 1890,
      revenueUsd: 1770.50,
      format: 'carousel'
    },
    {
      id: 'post_soc_005',
      title: 'Global Sovereign Developers & Builders Summit 2026',
      reach: 18900,
      engagement: 2450,
      revenueUsd: 3200.00,
      format: 'event'
    },
    {
      id: 'post_soc_004',
      title: 'The Sovereign Creator Podcast — Episode 42',
      reach: 11200,
      engagement: 1540,
      revenueUsd: 890.00,
      format: 'audio'
    }
  ],
  formatBreakdown: {
    feed: 62,
    moments: 28,
    status: 10
  },
  estimatedRevenueUsd: 6840.50,
  adRevenueShareUsd: 1420.50,
  tipsRevenueUsd: 2120.00,
  subscriptionsRevenueUsd: 3300.00
};
