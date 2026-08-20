/**
 * OMNI CREATOR ECONOMY PLATFORM — SEED DATA & MOCK REPOSITORY
 */

import {
  CreatorContentItem,
  CreatorSubscriptionTier,
  CreatorCourse,
  CreatorDigitalProduct,
  CreatorLiveStreamCommerce,
  CreatorConsultingSlot,
  CreatorMarketplaceProfile,
  CreatorFinanceStatement,
  CreatorAnalyticsSummary,
  AiCreatorManagerRecommendation,
  CreatorAdminGovernanceConfig,
  AiRepurposeOutput
} from '../types/omni_creator';

export const SEED_CREATOR_CONTENT_ITEMS: CreatorContentItem[] = [
  {
    id: 'cnt-001',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'Decentralized AI & Sovereign Mesh Networks: Full Engineering Masterclass',
    type: 'video',
    description: 'A deep architectural walkthrough of running multi-agent Gemini clusters over sovereign peer-to-peer mesh networks with zero centralized latency.',
    contentBody: `In this comprehensive masterclass, we explore how edge computing nodes communicate via WebRTC SFU/MCU meshes to synthesize real-time intelligence without transmitting private telemetry to centralized servers. Key sections include cryptographic key rotation, decentralized state consensus, and zero-latency audio streaming.`,
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-signals-32127-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    durationSec: 2840,
    readTimeMinutes: 48,
    tags: ['DecentralizedAI', 'MeshNetworks', 'Web3', 'GeminiMesh', 'Sovereignty'],
    category: 'AI & Engineering',
    status: 'published',
    accessTier: 'free',
    publishedAt: '2026-08-18T14:30:00Z',
    createdAt: '2026-08-17T09:00:00Z',
    updatedAt: '2026-08-18T14:30:00Z',
    crossPlatformDestinations: ['omni_feed', 'omni_channels', 'video_hub', 'youtube_sync'],
    viewsCount: 48200,
    impressionsCount: 142000,
    watchTimeMinutes: 890400,
    likesCount: 3910,
    commentsCount: 428,
    sharesCount: 1250,
    bookmarksCount: 2890,
    revenueGeneratedUsd: 4280.50,
    conversionsCount: 142,
    seoScore: 94,
    aiGeneratedSummary: 'Architectural overview of peer-to-peer AI mesh networks, cryptographic consensus, and edge inference optimization.'
  },
  {
    id: 'cnt-002',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'Why 99% of Autonomous Agents Fail in Production (And The 3 Rules to Fix It)',
    type: 'short_video',
    description: 'High-impact 60-second breakdown on state divergence and how deterministic finite state machines resolve loop hallucination.',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-42861-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    durationSec: 58,
    tags: ['Shorts', 'AIProd', 'EngineeringTips', 'ViralTech'],
    category: 'AI & Engineering',
    status: 'published',
    accessTier: 'free',
    publishedAt: '2026-08-19T10:00:00Z',
    createdAt: '2026-08-19T08:30:00Z',
    updatedAt: '2026-08-19T10:00:00Z',
    crossPlatformDestinations: ['omni_feed', 'video_hub'],
    viewsCount: 184500,
    impressionsCount: 520000,
    watchTimeMinutes: 165000,
    likesCount: 14200,
    commentsCount: 890,
    sharesCount: 5400,
    bookmarksCount: 6100,
    revenueGeneratedUsd: 1820.00,
    conversionsCount: 310,
    seoScore: 91
  },
  {
    id: 'cnt-003',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'Sovereign Tokenomics & Algorithmic Liquidity Systems (Issue #44)',
    type: 'newsletter',
    description: 'Exclusive subscriber-only technical brief analyzing automated market makers, sovereign multi-currency corridors, and real-yield protocols.',
    contentBody: `Welcome to Issue #44 of Sovereign Signals. Today we examine the transition from speculative liquidity mining to programmatic asset-backed yield. Discover how cross-border FX corridors eliminate intermediary settlement friction while guaranteeing 100% solvency proofs on-chain.`,
    readTimeMinutes: 14,
    tags: ['Newsletter', 'Tokenomics', 'SovereignFinance', 'Web3'],
    category: 'Finance & Web3',
    status: 'published',
    accessTier: 'subscribers_only',
    priceUsd: 15,
    publishedAt: '2026-08-16T16:00:00Z',
    createdAt: '2026-08-15T11:00:00Z',
    updatedAt: '2026-08-16T16:00:00Z',
    crossPlatformDestinations: ['newsletter_blast', 'omni_feed'],
    viewsCount: 12400,
    impressionsCount: 28000,
    watchTimeMinutes: 148800,
    likesCount: 1420,
    commentsCount: 215,
    sharesCount: 430,
    bookmarksCount: 980,
    revenueGeneratedUsd: 8950.00,
    conversionsCount: 85,
    seoScore: 88
  },
  {
    id: 'cnt-004',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'Live Stream Commerce & Live Q&A: Enterprise AI Systems Demo & Product Drop',
    type: 'livestream',
    description: 'Live interactive product demonstration and sovereign hardware security key unboxing with live purchase links.',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-podcast-with-microphone-and-headphones-42862-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    durationSec: 5400,
    tags: ['LiveStream', 'LiveCommerce', 'ProductDrop', 'QandA'],
    category: 'Business & Marketing',
    status: 'published',
    accessTier: 'free',
    publishedAt: '2026-08-18T18:00:00Z',
    createdAt: '2026-08-18T17:00:00Z',
    updatedAt: '2026-08-18T19:30:00Z',
    crossPlatformDestinations: ['omni_feed', 'video_hub'],
    viewsCount: 16800,
    impressionsCount: 64000,
    watchTimeMinutes: 720000,
    likesCount: 2840,
    commentsCount: 1490,
    sharesCount: 780,
    bookmarksCount: 450,
    revenueGeneratedUsd: 14650.00,
    conversionsCount: 184,
    attachedProductIds: ['prod-001', 'prod-002']
  },
  {
    id: 'cnt-005',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'The Sovereign Mind Podcast Ep. 108: Future of Decentralized Media & Creator Guilds',
    type: 'podcast',
    description: 'In-depth 55-minute audio conversation with visionary founders on transitioning from ad-reliant platforms to sovereign creator economies.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
    durationSec: 3300,
    readTimeMinutes: 55,
    tags: ['Podcast', 'CreatorEconomy', 'Audio', 'Leadership'],
    category: 'Business & Marketing',
    status: 'published',
    accessTier: 'free',
    publishedAt: '2026-08-14T12:00:00Z',
    createdAt: '2026-08-13T15:00:00Z',
    updatedAt: '2026-08-14T12:00:00Z',
    crossPlatformDestinations: ['podcast_rss', 'omni_feed', 'omni_channels'],
    viewsCount: 22100,
    impressionsCount: 78000,
    watchTimeMinutes: 980000,
    likesCount: 1890,
    commentsCount: 310,
    sharesCount: 920,
    bookmarksCount: 1400,
    revenueGeneratedUsd: 2150.00,
    conversionsCount: 65,
    seoScore: 89
  },
  {
    id: 'cnt-006',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'The Comprehensive Guide to Zero-Knowledge Proofs in Enterprise Identity Systems',
    type: 'article',
    description: 'Long-form cryptographic technical paper exploring zk-SNARKs and zk-STARKs implementation benchmarks in high-frequency financial networks.',
    contentBody: `## Zero-Knowledge Identity Proofs: A Technical Deep Dive
Zero-Knowledge (ZK) cryptography allows one party (the prover) to demonstrate to another (the verifier) that a specific statement is true without revealing any information beyond the validity of the statement itself.

### Key Benchmark Metrics:
- **Proof Generation Time**: 18.4ms per credential issuance.
- **Verification Complexity**: O(1) constant time across multi-tenant clusters.
- **Payload Footprint**: Less than 384 bytes per cryptographic attestation.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    readTimeMinutes: 18,
    tags: ['Cryptography', 'ZKProofs', 'Identity', 'ResearchPaper'],
    category: 'AI & Engineering',
    status: 'published',
    accessTier: 'free',
    publishedAt: '2026-08-12T09:00:00Z',
    createdAt: '2026-08-11T14:00:00Z',
    updatedAt: '2026-08-12T09:00:00Z',
    crossPlatformDestinations: ['omni_feed', 'linkedin_sync'],
    viewsCount: 31400,
    impressionsCount: 92000,
    watchTimeMinutes: 440000,
    likesCount: 2900,
    commentsCount: 412,
    sharesCount: 1850,
    bookmarksCount: 4200,
    revenueGeneratedUsd: 3100.00,
    conversionsCount: 95,
    seoScore: 96
  },
  {
    id: 'cnt-007',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'Production Multi-Agent Systems Masterclass: From Prompt Chains to Autonomous Swarms',
    type: 'course',
    description: 'Complete 12-chapter interactive masterclass with live code sandboxes, architectural diagrams, and completion certification.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    durationSec: 36000,
    readTimeMinutes: 600,
    tags: ['Masterclass', 'AgenticAI', 'Course', 'Certification'],
    category: 'AI & Engineering',
    status: 'published',
    accessTier: 'course_enrollment',
    priceUsd: 199,
    publishedAt: '2026-08-01T10:00:00Z',
    createdAt: '2026-07-20T12:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z',
    crossPlatformDestinations: ['omni_feed', 'omni_channels'],
    viewsCount: 14200,
    impressionsCount: 45000,
    watchTimeMinutes: 2800000,
    likesCount: 1950,
    commentsCount: 680,
    sharesCount: 1100,
    bookmarksCount: 3200,
    revenueGeneratedUsd: 48500.00,
    conversionsCount: 244,
    seoScore: 98
  },
  {
    id: 'cnt-008',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    creatorHandle: 'adeyemi_ai',
    title: 'Enterprise AI Architecture Blueprint & Production Terraform Stacks (v4.2)',
    type: 'digital_product',
    description: 'Production-ready IaC templates, Kubernetes helm charts, and multi-cloud AI orchestration configurations for scalable deployments.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    tags: ['DigitalProduct', 'IaC', 'Terraform', 'Kubernetes', 'CodeBundle'],
    category: 'AI & Engineering',
    status: 'published',
    accessTier: 'paywalled',
    priceUsd: 79,
    publishedAt: '2026-08-05T14:00:00Z',
    createdAt: '2026-08-04T10:00:00Z',
    updatedAt: '2026-08-05T14:00:00Z',
    crossPlatformDestinations: ['omni_feed'],
    viewsCount: 8900,
    impressionsCount: 26000,
    watchTimeMinutes: 89000,
    likesCount: 890,
    commentsCount: 140,
    sharesCount: 420,
    bookmarksCount: 1850,
    revenueGeneratedUsd: 18960.00,
    conversionsCount: 240,
    seoScore: 92
  }
];

export const SEED_AI_REPURPOSE_PREVIEW: AiRepurposeOutput = {
  id: 'rep-001',
  originalContentId: 'cnt-001',
  viralScore: 94,
  seoScore: 96,
  suggestedTitles: [
    { title: 'The Sovereign AI Architecture That Eliminates Cloud Bills by 80%', predictedCtr: '12.4%', tone: 'High-Impact Technical' },
    { title: 'How We Built an Offline-First Decentralized Gemini Cluster', predictedCtr: '10.8%', tone: 'Case Study' },
    { title: 'Stop Building Centralized Agents: The 2026 Mesh Paradigm', predictedCtr: '9.9%', tone: 'Contrarian Leadership' }
  ],
  captions: {
    instagramReels: '⚡ Edge AI changes everything. Here is how decentralized mesh networks eliminate central cloud bottleneck in under 60 seconds. Link in bio for the full blueprint! #AI #Engineering #Web3',
    xTwitter: 'Cloud fees are crushing AI startups. \n\nHere is how we architected a zero-cloud sovereign mesh cluster that handles 100k req/sec with P2P WebRTC consensus:\n\n🧵 Thread below:',
    linkedIn: 'Autonomous agent architectures are shifting rapidly from centralized cloud endpoints to local deterministic mesh networks. In our latest technical masterclass, Dr. Adeyemi Alabi covers the exact mathematical frameworks behind zero-latency P2P clusters.',
    omniFeed: 'Exclusive masterclass release on OMNI Connect: Decentralized AI & Sovereign Mesh Networks. Full video, open code repository, and downloadable architecture diagrams available.',
    youtubeDescription: 'Full course walkthrough on peer-to-peer AI mesh architectures. Timestamps, GitHub repository, and architecture blueprint linked in the description below.'
  },
  videoScript: {
    hook: 'What if your AI agents could communicate across devices with zero server latency, zero cloud costs, and 100% cryptographic sovereignty?',
    scenes: [
      { timestamp: '0:00 - 0:15', visualCue: 'Animated node connection diagram showing P2P signal handshake', voiceover: 'Every central server is a single point of failure and an ongoing cost liability.' },
      { timestamp: '0:15 - 0:45', visualCue: 'Screen capture of terminal running Rust SFU routing engine', voiceover: 'By utilizing WebRTC data channels with deterministic finite state machines, nodes synchronize state in sub-12 milliseconds.' },
      { timestamp: '0:45 - 1:00', visualCue: 'Creator holding cryptographic hardware key next to high-performance edge node', voiceover: 'Download the complete open-source blueprint on OMNI Creator Studio today.' }
    ],
    callToAction: 'Tap the link to access the full 48-minute masterclass and production code templates.'
  },
  repurposedArticle: {
    headline: 'Decentralized AI & Sovereign Mesh Networks: An Architectural Blueprint',
    readingTime: '8 min read',
    markdownBody: `### Introduction\nAs enterprise machine learning models grow in complexity, relying solely on centralized cloud hyperscalers introduces bandwidth constraints, vendor lock-in, and unpredictable inference costs.\n\n### The Solution: P2P Mesh Clusters\nBy combining cryptographic identity attestations with decentralized state routing, distributed nodes can perform collaborative inference directly on the edge.`
  },
  repurposedNewsletter: {
    subjectLine: '🔥 Issue #45: The End of Centralized Cloud Bottlenecks for AI',
    previewSnippet: 'How sovereign mesh networks achieve sub-15ms inference latency across distributed edge nodes...',
    emailBody: `Dear Sovereign Builder,\n\nThis week we are releasing our complete engineering benchmark on decentralized multi-agent mesh networks. Learn how top systems teams are reducing cloud compute overhead while guaranteeing 100% data residency.`
  },
  repurposedShortClips: [
    { title: 'Clip 1: The 12ms P2P State Synchronization Secret', timestampRange: '04:12 - 05:10', suggestedMusic: 'Cyberpunk Synthwave 128 BPM', aspectRatio: '9:16' },
    { title: 'Clip 2: Why Token Latency Destroys Traditional Voice Agents', timestampRange: '18:40 - 19:35', suggestedMusic: 'Low-Fi Focus Beat', aspectRatio: '9:16' },
    { title: 'Clip 3: Live Hardware Unboxing & Cryptographic Key Pairing', timestampRange: '32:15 - 33:10', suggestedMusic: 'Energetic Tech Pulse', aspectRatio: '9:16' }
  ],
  translations: [
    { language: 'Spanish (Español)', translatedTitle: 'IA Descentralizada y Redes de Malla Soberanas: Clase Magistral Completa', translatedSummary: 'Una guía completa de ingeniería para ejecutar clústeres de IA en redes P2P sin latencia centralizada.' },
    { language: 'French (Français)', translatedTitle: 'IA Décentralisée et Réseaux Maillés Souverains: Masterclass Complète', translatedSummary: 'Une présentation architecturale approfondie de l’exécution de clusters d’agents IA sur des réseaux maillés décentralisés.' },
    { language: 'German (Deutsch)', translatedTitle: 'Dezentrale KI & Souveräne Mesh-Netzwerke: Vollständige Masterclass', translatedSummary: 'Ein umfassender technischer Leitfaden zur Ausführung dezentraler KI-Cluster ohne zentrale Latenz.' },
    { language: 'Japanese (日本語)', translatedTitle: '分散型AIとソブリンメッシュネットワーク：エンジニアリングマスタークラス', translatedSummary: '集中サーバーなしでP2Pメッシュ上でAIクラスターを実行するための包括的なエンジニアリング解説。' },
    { language: 'Yoruba (Èdè Yorùbá)', translatedTitle: 'Ẹ̀kọ́ Pípé lórí Ọgbọ́n Orí Ẹ̀rọ tí kò ní Ibùdó Àárín àti Àwọ̀n Àkójọpọ̀', translatedSummary: 'Ìtọ́sọ́nà ìmọ̀-ẹ̀rọ fún ṣíṣe àwọn ẹ̀rọ ọgbọ́n orí lórí àwọ̀n pípé láìsí àṣẹ àárín.' }
  ],
  recommendedHashtags: ['#SovereignAI', '#DecentralizedTech', '#GeminiMesh', '#EdgeComputing', '#Web3Engineering', '#CreatorEconomy']
};

export const SEED_CREATOR_SUBSCRIPTION_TIERS: CreatorSubscriptionTier[] = [
  {
    id: 'tier-bronze',
    creatorId: 'prof-001',
    name: 'Bronze Supporter',
    priceMonthlyUsd: 9,
    priceAnnualUsd: 89,
    description: 'Support the research and gain access to community discussions, public live streams, and badge flair.',
    badgeIcon: '🥉',
    colorAccent: 'amber',
    perks: [
      'Supporter badge on all comments & live chats',
      'Early access to weekly articles (48h advance)',
      'Access to members-only Q&A comments section',
      '10% discount on all digital product bundles'
    ],
    activeSubscribersCount: 420,
    monthlyRevenueUsd: 3780
  },
  {
    id: 'tier-silver',
    creatorId: 'prof-001',
    name: 'Silver Pro Member',
    priceMonthlyUsd: 29,
    priceAnnualUsd: 290,
    description: 'Full access to weekly technical newsletters, private Telegram/OMNI channels, and live code repositories.',
    badgeIcon: '🥈',
    colorAccent: 'indigo',
    perks: [
      'All Bronze Supporter benefits',
      'Full technical newsletter archives & raw code templates',
      'Private OMNI Channel & Discord developer lounge',
      'Monthly live group AMA & architecture review stream',
      '25% discount on all courses & masterclasses'
    ],
    activeSubscribersCount: 285,
    monthlyRevenueUsd: 8265
  },
  {
    id: 'tier-gold',
    creatorId: 'prof-001',
    name: 'Gold VIP Sovereign Circle',
    priceMonthlyUsd: 99,
    priceAnnualUsd: 990,
    description: 'Elite circle for founders, senior engineers, and investors. Includes quarterly 1-on-1 advisory and priority support.',
    badgeIcon: '👑',
    colorAccent: 'emerald',
    perks: [
      'All Silver Pro Member benefits',
      'Free access to ALL current and future courses',
      'Quarterly 45-minute 1-on-1 private consulting session',
      'Direct priority direct messaging access with guaranteed 24h response',
      'Co-author credit on select open-source whitepapers'
    ],
    activeSubscribersCount: 68,
    monthlyRevenueUsd: 6732
  }
];

export const SEED_CREATOR_COURSES: CreatorCourse[] = [
  {
    id: 'course-001',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    title: 'Production Multi-Agent Systems & Autonomous Swarms Masterclass',
    description: 'The definitive end-to-end curriculum for building, deploying, and monetizing production-ready multi-agent AI swarms in 2026.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    category: 'AI & Engineering',
    level: 'masterclass',
    priceUsd: 199,
    originalPriceUsd: 299,
    enrolledStudentsCount: 480,
    ratingAverage: 4.96,
    reviewsCount: 184,
    totalDurationHours: 14.5,
    chaptersCount: 6,
    hasCertificate: true,
    totalRevenueUsd: 95520,
    chapters: [
      { id: 'ch-1', title: 'Chapter 1: Agentic Foundations & Finite State Machines', durationMinutes: 45, isFreePreview: true, isCompleted: true },
      { id: 'ch-2', title: 'Chapter 2: Real-time Tool Calling & Dynamic Schema Generation', durationMinutes: 65, isFreePreview: false, isCompleted: true },
      { id: 'ch-3', title: 'Chapter 3: Memory Vector Stores & Long-term Context Compression', durationMinutes: 80, isFreePreview: false, isCompleted: true },
      { id: 'ch-4', title: 'Chapter 4: Multi-Agent Consensus, Voting & Supervisor Routing', durationMinutes: 95, isFreePreview: false, isCompleted: false },
      { id: 'ch-5', title: 'Chapter 5: Guardrails, Human-in-the-Loop & Commercial Governance', durationMinutes: 70, isFreePreview: false, isCompleted: false },
      { id: 'ch-6', title: 'Chapter 6: High-Concurrency Production Deployment & Load Balancing', durationMinutes: 90, isFreePreview: false, isCompleted: false }
    ]
  },
  {
    id: 'course-002',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    title: 'Sovereign Digital Identity & Zero-Knowledge Cryptography',
    description: 'Learn how to architect self-sovereign identity (SSI) systems, verifiable credentials, and privacy-preserving compliance tools.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    category: 'Finance & Web3',
    level: 'advanced',
    priceUsd: 149,
    originalPriceUsd: 199,
    enrolledStudentsCount: 310,
    ratingAverage: 4.92,
    reviewsCount: 96,
    totalDurationHours: 9.8,
    chaptersCount: 4,
    hasCertificate: true,
    totalRevenueUsd: 46190,
    chapters: [
      { id: 'ch-201', title: 'Chapter 1: Cryptographic Primitives & Elliptic Curves', durationMinutes: 50, isFreePreview: true, isCompleted: true },
      { id: 'ch-202', title: 'Chapter 2: Designing W3C Verifiable Credentials', durationMinutes: 60, isFreePreview: false, isCompleted: false },
      { id: 'ch-203', title: 'Chapter 3: Implementing zk-SNARK Circuits with Rust & Circom', durationMinutes: 90, isFreePreview: false, isCompleted: false },
      { id: 'ch-204', title: 'Chapter 4: Enterprise Compliance & Zero-Knowledge Verification', durationMinutes: 75, isFreePreview: false, isCompleted: false }
    ]
  }
];

export const SEED_CREATOR_DIGITAL_PRODUCTS: CreatorDigitalProduct[] = [
  {
    id: 'prod-001',
    creatorId: 'prof-001',
    title: 'Production Multi-Agent Terraform & Kubernetes Stacks (v4.2)',
    description: 'Complete infrastructure as code bundle including Dockerfiles, Helm charts, and CI/CD pipelines for zero-downtime AI agent swarms.',
    coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    fileFormat: 'CODE_BUNDLE',
    fileSizeBytes: 42000000,
    downloadUrl: 'https://omni-cdn.network/products/agent-stacks-v4.zip',
    priceUsd: 79,
    salesCount: 342,
    totalRevenueUsd: 27018,
    rating: 4.98,
    tags: ['Terraform', 'Kubernetes', 'Helm', 'IaC', 'MultiAgent']
  },
  {
    id: 'prod-002',
    creatorId: 'prof-001',
    title: 'The Sovereign Creator OS — Notion Workspace & Financial Model',
    description: 'The ultimate operating system for creators: content calendar, sponsorship CRM, automated tax calculation, and multi-stream revenue forecast.',
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    fileFormat: 'NOTION_KIT',
    fileSizeBytes: 12000000,
    downloadUrl: 'https://omni-cdn.network/products/creator-os-notion.zip',
    priceUsd: 39,
    salesCount: 680,
    totalRevenueUsd: 26520,
    rating: 4.95,
    tags: ['Notion', 'CreatorOS', 'FinancialModel', 'Template']
  },
  {
    id: 'prod-003',
    creatorId: 'prof-001',
    title: 'Edge AI Prompt Engineering & Tool-Calling Cheat Sheet (PDF)',
    description: 'High-density 40-page reference manual for deterministic JSON extraction, multi-turn reasoning prompts, and failure recovery protocols.',
    coverImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    fileFormat: 'PDF',
    fileSizeBytes: 8500000,
    downloadUrl: 'https://omni-cdn.network/products/prompt-cheatsheet.pdf',
    priceUsd: 19,
    salesCount: 1240,
    totalRevenueUsd: 23560,
    rating: 4.89,
    tags: ['PDF', 'PromptEngineering', 'CheatSheet', 'Guide']
  }
];

export const SEED_CREATOR_LIVE_COMMERCE: CreatorLiveStreamCommerce = {
  id: 'live-stream-001',
  creatorId: 'prof-001',
  creatorName: 'Dr. Adeyemi Alabi',
  creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  title: '⚡ LIVE: Sovereign Hardware Drop & Multi-Agent AI System Demo',
  bannerUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
  streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-signals-32127-large.mp4',
  status: 'live',
  startedAt: '2026-08-20T10:00:00Z',
  currentLiveViewers: 3420,
  peakLiveViewers: 4890,
  totalLikes: 18450,
  pinnedProductId: 'prod-001',
  productsForSale: [
    {
      id: 'prod-001',
      name: 'Production Multi-Agent Terraform & Kubernetes Stacks (v4.2)',
      priceUsd: 79,
      salePriceUsd: 59,
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      inStockCount: 158,
      salesDuringStream: 46
    },
    {
      id: 'prod-002',
      name: 'The Sovereign Creator OS — Notion Workspace & Financial Model',
      priceUsd: 39,
      salePriceUsd: 29,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      inStockCount: 999,
      salesDuringStream: 82
    },
    {
      id: 'prod-hw-01',
      name: 'OMNI Sovereign Cryptographic Hardware Security Key (Titanium Edition)',
      priceUsd: 120,
      salePriceUsd: 99,
      imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800',
      inStockCount: 18,
      salesDuringStream: 32
    }
  ],
  chatMessages: [
    { id: 'cm-1', senderName: 'Elena Rostova', senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', message: 'Just purchased the Terraform bundle! Super clean architecture.', timestamp: '10:14:02', isSuperchat: true, superchatAmountUsd: 25 },
    { id: 'cm-2', senderName: 'Kofi Mensah', senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', message: 'How does latency hold up when routing across West Africa edge nodes?', timestamp: '10:15:30' },
    { id: 'cm-3', senderName: 'Dr. Sarah Lin', senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', message: 'Sending $50 tip for the incredible open-source contributions!', timestamp: '10:16:11', isSuperchat: true, superchatAmountUsd: 50 },
    { id: 'cm-4', senderName: 'Tariq Al-Mansoor', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', message: 'Ordered the Titanium Security Key! Will it sync with OMNI Passport 2FA?', timestamp: '10:17:45' }
  ],
  totalStreamRevenueUsd: 8250.00,
  superchatEarningsUsd: 480.00,
  productSalesRevenueUsd: 7770.00
};

export const SEED_CREATOR_CONSULTING_SLOTS: CreatorConsultingSlot[] = [
  {
    id: 'consult-001',
    creatorId: 'prof-001',
    title: '1-on-1 AI Architecture Review & Code Audit',
    description: 'Direct deep-dive on your multi-agent codebase, state orchestration, vector database pipelines, and cloud cost optimization.',
    durationMinutes: 45,
    priceUsd: 250,
    availableDays: ['Tuesdays', 'Thursdays', 'Saturdays'],
    bookedSlotsCount: 42,
    totalRevenueUsd: 10500,
    rating: 5.0
  },
  {
    id: 'consult-002',
    creatorId: 'prof-001',
    title: 'Executive Tokenomics & Sovereign Treasury Advisory',
    description: 'Advisory for Web3 protocols, venture funds, and sovereign DAOs on automated market making, liquidity depth, and legal compliance.',
    durationMinutes: 60,
    priceUsd: 400,
    availableDays: ['Wednesdays', 'Fridays'],
    bookedSlotsCount: 28,
    totalRevenueUsd: 11200,
    rating: 4.98
  }
];

export const SEED_CREATOR_MARKETPLACE_PROFILES: CreatorMarketplaceProfile[] = [
  {
    id: 'mkt-001',
    profileId: 'prof-001',
    displayName: 'Dr. Adeyemi Alabi',
    handle: 'adeyemi_ai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
    headline: 'Senior AI Systems Architect & Founder of Sovereign Mesh Protocol',
    bio: 'Author of 14 peer-reviewed papers on decentralized machine learning. Teaching 40,000+ developers how to build agentic swarms.',
    niche: 'AI & Engineering',
    verificationLevel: 'sovereign_creator',
    rating: 4.98,
    reviewsCount: 384,
    followersCount: 142000,
    subscribersCount: 773,
    hourlyConsultingRateUsd: 350,
    featuredCourseTitle: 'Production Multi-Agent Systems Masterclass',
    featuredProductTitle: 'Production Multi-Agent Terraform Stacks',
    isAvailableForHire: true,
    totalEarningsUsd: 248650,
    country: 'United Kingdom / Nigeria',
    badges: ['Top 1% Creator', 'Verified Pro', 'Sovereign Pioneer', '5-Star Mentor']
  },
  {
    id: 'mkt-002',
    profileId: 'prof-002',
    displayName: 'Elena Rostova',
    handle: 'elena_fintech',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200',
    headline: 'Quantitative Trader & Algorithmic Liquidity Specialist',
    bio: 'Managing $45M institutional liquidity pools. Publishing weekly macro research and quantitative algorithmic strategies.',
    niche: 'Finance & Web3',
    verificationLevel: 'institutional_master',
    rating: 4.95,
    reviewsCount: 290,
    followersCount: 98000,
    subscribersCount: 1120,
    hourlyConsultingRateUsd: 450,
    featuredCourseTitle: 'Algorithmic High-Frequency Arbitrage',
    featuredProductTitle: 'Python Quant Backtester Engine',
    isAvailableForHire: true,
    totalEarningsUsd: 312000,
    country: 'Switzerland',
    badges: ['Wall Street Veteran', 'Quant Master', 'Verified Institutional']
  },
  {
    id: 'mkt-003',
    profileId: 'prof-003',
    displayName: 'Pastor Samuel Kwesi',
    handle: 'pastor_samuel',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200',
    headline: 'Global Faith Fellowship Leader & Spiritual Leadership Mentor',
    bio: 'Ministering to 250,000+ souls worldwide through daily devotional streams, biblical leadership masterclasses, and community prayer hubs.',
    niche: 'Faith & Leadership',
    verificationLevel: 'sovereign_creator',
    rating: 5.0,
    reviewsCount: 940,
    followersCount: 265000,
    subscribersCount: 3400,
    hourlyConsultingRateUsd: 150,
    featuredCourseTitle: 'Spiritual Leadership in Modern Times',
    featuredProductTitle: 'Daily Grace 365 Devotional E-Book',
    isAvailableForHire: true,
    totalEarningsUsd: 185000,
    country: 'Ghana / Global',
    badges: ['Faith Fellowship', 'Honorary Mentor', 'Community Pillar']
  },
  {
    id: 'mkt-004',
    profileId: 'prof-004',
    displayName: 'Maya Chen',
    handle: 'maya_design',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200',
    headline: 'Design Systems Architect & 3D Spatial Interface Designer',
    bio: 'Former lead designer at top tech unicorns. Creator of the Nebula UI design kit used by 12,000+ product teams.',
    niche: 'Design & Creative',
    verificationLevel: 'verified_pro',
    rating: 4.96,
    reviewsCount: 512,
    followersCount: 115000,
    subscribersCount: 890,
    hourlyConsultingRateUsd: 275,
    featuredCourseTitle: 'Mastering Spatial UI & Design Tokens',
    featuredProductTitle: 'Nebula Pro UI Component System',
    isAvailableForHire: true,
    totalEarningsUsd: 215400,
    country: 'Singapore / USA',
    badges: ['Figma Community Lead', 'Top Design Creator', 'Verified Pro']
  }
];

export const SEED_CREATOR_FINANCE_STATEMENT: CreatorFinanceStatement = {
  creatorId: 'prof-001',
  currency: 'USD',
  lifetimeGrossEarningsUsd: 248650.00,
  availableBalanceUsd: 34180.50,
  pendingEscrowUsd: 9420.00,
  nextPayoutDate: '2026-08-25',
  connectedWalletAddress: '0x71C...89B2 (OMNI Sovereign Vault)',
  connectedIban: 'GB33 OMNI 0014 9823 4910 22',
  taxStatus: 'W-8BEN_VERIFIED',
  taxWithheldLifetimeUsd: 12432.50,
  platformFeeRatePercent: 1.5, // Ultra low sovereign platform rake
  recentSettlements: [
    {
      id: 'settle-101',
      date: '2026-08-19',
      description: 'Course Sales: Production Multi-Agent Masterclass (24 enrollments)',
      streamType: 'courses',
      grossAmountUsd: 4776.00,
      platformFeeUsd: 71.64,
      taxWithheldUsd: 238.80,
      netPayoutUsd: 4465.56,
      status: 'settled',
      txHash: '0x9a8f...4102'
    },
    {
      id: 'settle-102',
      date: '2026-08-18',
      description: 'Live Stream Commerce Product Sales & Superchats',
      streamType: 'superchats',
      grossAmountUsd: 8250.00,
      platformFeeUsd: 123.75,
      taxWithheldUsd: 412.50,
      netPayoutUsd: 7713.75,
      status: 'settled',
      txHash: '0x4f12...99bc'
    },
    {
      id: 'settle-103',
      date: '2026-08-15',
      description: 'Monthly Fan Subscriptions & Patron Memberships (773 Patrons)',
      streamType: 'subscriptions',
      grossAmountUsd: 18777.00,
      platformFeeUsd: 281.65,
      taxWithheldUsd: 938.85,
      netPayoutUsd: 17556.50,
      status: 'settled',
      txHash: '0x88ea...1200'
    },
    {
      id: 'settle-104',
      date: '2026-08-14',
      description: 'Digital Downloads: Terraform & IaC Stacks Bundle',
      streamType: 'digital_products',
      grossAmountUsd: 2686.00,
      platformFeeUsd: 40.29,
      taxWithheldUsd: 134.30,
      netPayoutUsd: 2511.41,
      status: 'settled',
      txHash: '0x712e...6681'
    },
    {
      id: 'settle-105',
      date: '2026-08-12',
      description: '1-on-1 AI Architecture Code Audit Consultations (4 Sessions)',
      streamType: 'consulting',
      grossAmountUsd: 1000.00,
      platformFeeUsd: 15.00,
      taxWithheldUsd: 50.00,
      netPayoutUsd: 935.00,
      status: 'held_in_escrow',
      txHash: '0x3219...bb44'
    }
  ]
};

export const SEED_CREATOR_ANALYTICS_SUMMARY: CreatorAnalyticsSummary = {
  totalFollowers: 142000,
  followerGrowthRatePercent: 18.4,
  monthlyReach: 890000,
  totalImpressions: 2450000,
  averageEngagementRate: 6.8,
  totalWatchTimeHours: 64200,
  totalConversions: 3240,
  freeToPaidConversionRate: 4.8,
  revenueByStream: {
    advertisingRevenueUsd: 14200.00,
    subscriptionsRevenueUsd: 68450.00,
    paidCommunitiesRevenueUsd: 24500.00,
    coursesRevenueUsd: 64800.00,
    digitalProductsRevenueUsd: 38900.00,
    affiliateIncomeUsd: 8400.00,
    tipsAndSuperchatsUsd: 6200.00,
    eventsAndTicketsUsd: 11500.00,
    consultingRevenueUsd: 11700.00,
    totalGrossRevenueUsd: 248650.00
  },
  audienceDemographics: {
    topCountries: [
      { country: 'United States', percentage: 38 },
      { country: 'United Kingdom', percentage: 22 },
      { country: 'Nigeria', percentage: 14 },
      { country: 'Germany', percentage: 10 },
      { country: 'Canada', percentage: 8 },
      { country: 'Others', percentage: 8 }
    ],
    ageDistribution: [
      { ageGroup: '18-24', percentage: 18 },
      { ageGroup: '25-34', percentage: 52 },
      { ageGroup: '35-44', percentage: 22 },
      { ageGroup: '45+', percentage: 8 }
    ],
    deviceBreakdown: {
      mobile: 62,
      desktop: 31,
      tablet: 5,
      tv: 2
    }
  },
  retentionCurve: [
    { secondPercent: 0, retentionRate: 100 },
    { secondPercent: 10, retentionRate: 88 },
    { secondPercent: 25, retentionRate: 76 },
    { secondPercent: 50, retentionRate: 68 },
    { secondPercent: 75, retentionRate: 59 },
    { secondPercent: 100, retentionRate: 51 }
  ]
};

export const SEED_AI_CREATOR_RECOMMENDATIONS: AiCreatorManagerRecommendation[] = [
  {
    id: 'rec-001',
    category: 'monetization',
    title: 'Launch a $49 Mini-Course on Deterministic JSON Function Calling',
    impactLevel: 'CRITICAL',
    rationale: 'Your video on "Why 99% of Autonomous Agents Fail" generated 184,500 views with 890 technical comments asking for sample schemas.',
    actionableStep: 'Click to auto-generate course chapter outline, marketing email copy, and pricing tier in 1-click.',
    estimatedRevenueLiftUsd: 18500,
    appliedStatus: 'pending'
  },
  {
    id: 'rec-002',
    category: 'viral_hook',
    title: 'Optimize Hook Pacing: Add Code Terminal Overlay in First 3 Seconds',
    impactLevel: 'HIGH',
    rationale: 'Retention analysis shows viewer drop-off reduces by 24% when dynamic code snippets are rendered immediately in the introduction.',
    actionableStep: 'Apply AI Automated B-Roll Overlay filter to next scheduled short video.',
    appliedStatus: 'pending'
  },
  {
    id: 'rec-003',
    category: 'pricing_optimization',
    title: 'Introduce Annual Discount for Gold VIP Sovereign Tier (Save 18%)',
    impactLevel: 'HIGH',
    rationale: 'Over 42% of your monthly Gold members have remained active for 6+ consecutive months without churn.',
    actionableStep: 'Enable $990/year annual billing option with instant settlement.',
    estimatedRevenueLiftUsd: 12400,
    appliedStatus: 'applied'
  },
  {
    id: 'rec-004',
    category: 'content_strategy',
    title: 'Schedule Thursday Live Stream Q&A at 17:00 GMT for Peak US & EU Overlap',
    impactLevel: 'MEDIUM',
    rationale: 'Your combined US (38%) and European (32%) audience activity peaks on Thursdays between 16:30 and 18:30 GMT.',
    actionableStep: 'Queue live stream announcement in OMNI Channels and schedule calendar event.',
    appliedStatus: 'pending'
  }
];

export const SEED_CREATOR_ADMIN_GOVERNANCE: CreatorAdminGovernanceConfig = {
  autoVerificationThresholdFollowers: 10000,
  platformCommissionRatePercent: 1.5,
  minPayoutThresholdUsd: 50.00,
  requireKycForMonetization: true,
  enableLiveStreamCommerce: true,
  enableAiCreationTools: true,
  enableTipJars: true,
  enablePaidCommunities: true,
  globalCreatorCount: 14850,
  totalCreatorPayoutsLifetimeUsd: 14280000.00
};
