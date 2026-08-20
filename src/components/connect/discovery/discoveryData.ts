// ============================================================================
// OMNI DISCOVERY INTELLIGENCE PLATFORM — DATA & ENGINE CORE
// Prompt 14 — Search, Discovery, Recommendation Engine & 5-Tier Analytics
// ============================================================================

import {
  OmniSearchResultItem,
  OmniSearchEntityType,
  OmniSearchFilterState,
  OmniBusinessDiscoveryCard,
  OmniPersonalAnalyticsData,
  OmniCreatorAnalyticsData,
  OmniBusinessAnalyticsData,
  OmniCommunityAnalyticsData,
  OmniSuperAdminAnalyticsData,
  OmniRecommendationSignal,
  OmniRecommendationPrivacyConsent,
  OmniAiAnalyticsQuery,
  OmniDiscoveryTestScenario
} from '../../../types/omni_discovery';

// ----------------------------------------------------------------------------
// 1. MASTER SEARCHABLE ENTITY CORPUS (11 ENTITY TYPES)
// ----------------------------------------------------------------------------

export const SEED_SEARCH_ITEMS: OmniSearchResultItem[] = [
  // --- PEOPLE ---
  {
    id: 'person_01',
    entityType: 'people',
    title: 'Dr. Elena Rostova',
    subtitle: '@elena_ai • Chief AI Architect at NeuroMesh',
    description: 'Specializing in decentralized transformer models, distributed parameter sharding, and zero-knowledge model verification.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Verified Expert',
    rating: 4.9,
    reviewCount: 142,
    location: 'Zurich, Switzerland',
    category: 'Artificial Intelligence',
    tags: ['AI', 'Transformers', 'ZeroKnowledge', 'DistributedSystems'],
    engagementScore: 94,
    relevanceScore: 98,
    affinityScore: 92,
    timestamp: '2026-08-19T14:30:00Z',
    actionType: 'connect',
    actionLabel: 'Connect',
    privacyVisibility: 'public',
    metadata: { role: 'AI Researcher', mutualConnections: 18, hourlyRate: '$250/hr' }
  },
  {
    id: 'person_02',
    entityType: 'people',
    title: 'Marcus Vance',
    subtitle: '@marcus_fintech • Sovereign Treasury Engineer',
    description: 'Pioneering multi-currency programmable liquidity pools, real-time gross settlement (RTGS), and sovereign BaaS infrastructure.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'FinTech Lead',
    rating: 4.8,
    reviewCount: 96,
    location: 'London, UK',
    category: 'Finance & Treasury',
    tags: ['Fintech', 'Treasury', 'Liquidity', 'BaaS', 'Settlement'],
    engagementScore: 89,
    relevanceScore: 91,
    affinityScore: 87,
    timestamp: '2026-08-18T10:15:00Z',
    actionType: 'connect',
    actionLabel: 'Connect',
    privacyVisibility: 'public',
    metadata: { role: 'Treasury Lead', mutualConnections: 12, hourlyRate: '$220/hr' }
  },

  // --- BUSINESSES ---
  {
    id: 'biz_01',
    entityType: 'businesses',
    title: 'Aegis Sovereign Security Corp',
    subtitle: 'Enterprise Cybersecurity & Cryptographic Auditing',
    description: 'Providing automated smart contract formal verification, PQC post-quantum encryption migration, and 24/7 autonomous SOC defense.',
    avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Enterprise Verified',
    rating: 4.95,
    reviewCount: 310,
    location: 'San Francisco, CA',
    priceDisplay: 'Custom Enterprise',
    category: 'Cybersecurity',
    tags: ['Security', 'Cryptography', 'Audit', 'Enterprise', 'QuantumSafe'],
    engagementScore: 96,
    relevanceScore: 95,
    affinityScore: 88,
    timestamp: '2026-08-19T08:00:00Z',
    actionType: 'book',
    actionLabel: 'Book Consultation',
    privacyVisibility: 'public',
    metadata: { verifiedKyb: true, escrowEnabled: true, employeeCount: '50-200' }
  },
  {
    id: 'biz_02',
    entityType: 'businesses',
    title: 'Nexus Cloud Edge Labs',
    subtitle: 'Global Sub-5ms Distributed Compute Mesh',
    description: 'Zero-egress cloud computing with 280+ POPs worldwide, serverless WebAssembly runtimes, and distributed vector database pipelines.',
    avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Top Tier Provider',
    rating: 4.88,
    reviewCount: 418,
    location: 'Frankfurt, Germany',
    priceDisplay: 'Pay As You Go',
    category: 'Cloud Infrastructure',
    tags: ['Edge', 'Wasm', 'VectorDB', 'Cloud', 'Distributed'],
    engagementScore: 92,
    relevanceScore: 93,
    affinityScore: 85,
    timestamp: '2026-08-17T11:45:00Z',
    actionType: 'view',
    actionLabel: 'Explore Services',
    privacyVisibility: 'public',
    metadata: { verifiedKyb: true, uptime: '99.999%', slaGuarantee: '100% Guaranteed' }
  },

  // --- CREATORS ---
  {
    id: 'creator_01',
    entityType: 'creators',
    title: 'Aria Thorne',
    subtitle: '@aria_tech • Next-Gen AI & System Design',
    description: 'Weekly deep dives on sovereign operating systems, LLM agentic choreography, and modern full-stack UI architectures.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Featured Creator',
    rating: 4.97,
    reviewCount: 840,
    location: 'Austin, TX',
    category: 'Tech & Education',
    tags: ['AI', 'Tech', 'Coding', 'Agents', 'SystemDesign'],
    engagementScore: 98,
    relevanceScore: 97,
    affinityScore: 95,
    timestamp: '2026-08-19T18:20:00Z',
    actionType: 'follow',
    actionLabel: 'Follow Creator',
    privacyVisibility: 'public',
    metadata: { followersCount: 185000, subscriberTier: '$9.99/mo' }
  },
  {
    id: 'creator_02',
    entityType: 'creators',
    title: 'Kenji Sato',
    subtitle: '@kenji_film • 8K Cinematic Visual Storyteller',
    description: 'Creator of viral visual essays, color grading science masterclasses, and open-source generative cinematic pipelines.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Pro Creator',
    rating: 4.92,
    reviewCount: 520,
    location: 'Tokyo, Japan',
    category: 'Media & Creative',
    tags: ['Video', 'Cinematography', 'ColorGrading', 'VisualArts', 'Creative'],
    engagementScore: 91,
    relevanceScore: 89,
    affinityScore: 83,
    timestamp: '2026-08-18T16:00:00Z',
    actionType: 'follow',
    actionLabel: 'Follow Creator',
    privacyVisibility: 'public',
    metadata: { followersCount: 94000, subscriberTier: '$14.99/mo' }
  },

  // --- COMMUNITIES ---
  {
    id: 'comm_01',
    entityType: 'communities',
    title: 'OMNI Sovereign Builders Space',
    subtitle: '14,280 Members • Active 24/7',
    description: 'The flagship community for developers, architects, and founders building native apps, micro-services, and agents on OMNI OS.',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Official Space',
    rating: 4.98,
    reviewCount: 1200,
    location: 'Global / Decentralized',
    category: 'Engineering & Dev',
    tags: ['Developers', 'Architecture', 'TypeScript', 'Agents', 'OpenSource'],
    engagementScore: 99,
    relevanceScore: 99,
    affinityScore: 96,
    timestamp: '2026-08-20T02:00:00Z',
    actionType: 'join',
    actionLabel: 'Join Space',
    privacyVisibility: 'public',
    metadata: { memberCount: 14280, activeVoiceRooms: 3, dailyMessages: 4200 }
  },
  {
    id: 'comm_02',
    entityType: 'communities',
    title: 'Global FinTech & Treasury Guild',
    subtitle: '8,450 Members • Verified Professionals',
    description: 'Peer group discussing programmable currencies, treasury yield optimization, regulatory frameworks, and enterprise BaaS.',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Verified Hub',
    rating: 4.86,
    reviewCount: 680,
    location: 'London & New York',
    category: 'Finance Guild',
    tags: ['FinTech', 'Treasury', 'Banking', 'Compliance', 'Liquidity'],
    engagementScore: 88,
    relevanceScore: 90,
    affinityScore: 84,
    timestamp: '2026-08-19T12:00:00Z',
    actionType: 'join',
    actionLabel: 'Join Guild',
    privacyVisibility: 'public',
    metadata: { memberCount: 8450, verifiedRequired: true, monthlyTownhalls: 2 }
  },

  // --- POSTS ---
  {
    id: 'post_01',
    entityType: 'posts',
    title: 'Deep Dive: Achieving Sub-35ms Agentic Vector Lookups on Edge Meshes',
    subtitle: 'Published by @elena_ai • 4.2k Likes • 380 Comments',
    description: 'How we restructured HNSW graph partitioning across distributed nodes with zero cold-starts and strict tenant memory sandboxing.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    category: 'Technical Paper',
    tags: ['VectorDB', 'HNSW', 'AI', 'Edge', 'Latency'],
    engagementScore: 95,
    relevanceScore: 96,
    affinityScore: 90,
    timestamp: '2026-08-19T09:30:00Z',
    actionType: 'read',
    actionLabel: 'Read Post',
    privacyVisibility: 'public',
    metadata: { readTime: '8 min read', bookmarksCount: 1450 }
  },
  {
    id: 'post_02',
    entityType: 'posts',
    title: 'The Sovereign Creator Economy: Why Middlemen Are Mathematically Obsolete',
    subtitle: 'Published by @aria_tech • 6.8k Likes • 512 Comments',
    description: 'An economic model proving that zero-take-rate peer channels deliver 3.4x higher lifetime earnings for independent artists.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verified: true,
    category: 'Economics & Media',
    tags: ['CreatorEconomy', 'DirectPayouts', 'Monetization', 'Sovereign'],
    engagementScore: 97,
    relevanceScore: 94,
    affinityScore: 93,
    timestamp: '2026-08-18T14:10:00Z',
    actionType: 'read',
    actionLabel: 'Read Post',
    privacyVisibility: 'public',
    metadata: { readTime: '6 min read', bookmarksCount: 2890 }
  },

  // --- VIDEOS / MOMENTS ---
  {
    id: 'video_01',
    entityType: 'videos',
    title: 'Building a Full-Stack AI Agent in 12 Minutes with OMNI SDK',
    subtitle: 'OMNI Moments • 48.2k Views • 98.4% Retention',
    description: 'Live coding walkthrough demonstrating autonomous tool calling, multi-tenant memory stores, and instant WebSocket streaming.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Viral Moment',
    category: 'Video Tutorial',
    tags: ['Tutorial', 'Agents', 'TypeScript', 'SDK', 'LiveCoding'],
    engagementScore: 99,
    relevanceScore: 98,
    affinityScore: 94,
    timestamp: '2026-08-19T20:15:00Z',
    actionType: 'view',
    actionLabel: 'Watch Video',
    privacyVisibility: 'public',
    metadata: { duration: '12:45', resolution: '4K HDR', likesCount: 5400 }
  },

  // --- PRODUCTS ---
  {
    id: 'prod_01',
    entityType: 'products',
    title: 'OMNI Sovereign Core Node Hardware (Gen 4)',
    subtitle: 'Dedicated Encrypted Home & Office Micro-Server',
    description: 'Plug-and-play local edge server featuring 64-core ARM processor, 128GB ECC RAM, 8TB NVMe encrypted storage, and hardware HSM.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Hardware',
    rating: 4.96,
    reviewCount: 215,
    location: 'Ships Worldwide',
    priceDisplay: '$1,299 USD',
    category: 'Hardware & Devices',
    tags: ['Hardware', 'Server', 'Security', 'HSM', 'SelfHost'],
    engagementScore: 93,
    relevanceScore: 92,
    affinityScore: 89,
    timestamp: '2026-08-15T00:00:00Z',
    actionType: 'buy',
    actionLabel: 'Order with Escrow',
    privacyVisibility: 'public',
    metadata: { stock: 45, freeShipping: true, warrantyYears: 3 }
  },
  {
    id: 'prod_02',
    entityType: 'products',
    title: 'Sovereign UI Component System Pro (Figma + React)',
    subtitle: 'Digital Asset Kit • 1,200+ Accessible Tokens',
    description: 'Production-ready dark/light theme component library tailored for sovereign digital operating systems with Tailwind and Radix.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Digital Kit',
    rating: 4.91,
    reviewCount: 380,
    location: 'Instant Download',
    priceDisplay: '$149 USD',
    category: 'Design Systems',
    tags: ['UI', 'React', 'Figma', 'Tailwind', 'DesignSystem'],
    engagementScore: 90,
    relevanceScore: 91,
    affinityScore: 86,
    timestamp: '2026-08-16T12:00:00Z',
    actionType: 'buy',
    actionLabel: 'Instant Purchase',
    privacyVisibility: 'public',
    metadata: { licenseType: 'Commercial Unlimited', version: '4.2.0' }
  },

  // --- SERVICES ---
  {
    id: 'serv_01',
    entityType: 'services',
    title: 'Full-Stack Architecture & Cryptographic Audit',
    subtitle: 'Provided by Aegis Sovereign Security • 48h Turnaround',
    description: 'Comprehensive static and dynamic security audit covering threat modeling, cryptographic validation, and penetration testing.',
    avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Verified Service',
    rating: 5.0,
    reviewCount: 88,
    location: 'Remote Global',
    priceDisplay: '$4,500 / Audit',
    category: 'Security Services',
    tags: ['Audit', 'Security', 'PenTest', 'Crypto', 'Compliance'],
    engagementScore: 94,
    relevanceScore: 93,
    affinityScore: 87,
    timestamp: '2026-08-18T09:00:00Z',
    actionType: 'book',
    actionLabel: 'Schedule Audit',
    privacyVisibility: 'public',
    metadata: { turnaroundDays: 2, signedCertificate: true, escrowProtected: true }
  },

  // --- COURSES ---
  {
    id: 'course_01',
    entityType: 'courses',
    title: 'Mastering Sovereign Cloud & Multi-Agent Architectures',
    subtitle: 'Instructor: Dr. Elena Rostova • 6-Week Cohort',
    description: 'Build enterprise-grade decentralized applications, multi-agent reasoning graphs, and sovereign data pipelines from first principles.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Accredited Masterclass',
    rating: 4.97,
    reviewCount: 310,
    location: 'Interactive Online',
    priceDisplay: '$499 USD',
    category: 'AI & Cloud Engineering',
    tags: ['Masterclass', 'AI', 'Agents', 'Cloud', 'Certification'],
    engagementScore: 96,
    relevanceScore: 97,
    affinityScore: 92,
    timestamp: '2026-08-19T15:00:00Z',
    actionType: 'enroll',
    actionLabel: 'Enroll Cohort',
    privacyVisibility: 'public',
    metadata: { nextCohortStart: '2026-09-01', enrolledCount: 240, certificateIssued: true }
  },

  // --- EVENTS ---
  {
    id: 'event_01',
    entityType: 'events',
    title: 'OMNI Global Developer Summit 2026',
    subtitle: 'Virtual Townhall & Keynote • 12,500 Attendees Registered',
    description: 'The annual keynote unveiling OMNI OS 5.0, high-speed neural consensus, zero-knowledge sovereign identity, and live developer demos.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Flagship Event',
    rating: 4.99,
    reviewCount: 1850,
    location: 'Global Stream & SF Hub',
    priceDisplay: 'Free Registration',
    category: 'Developer Summit',
    tags: ['Summit', 'Keynote', 'Developers', 'Innovation', 'LiveDemo'],
    engagementScore: 99,
    relevanceScore: 99,
    affinityScore: 98,
    timestamp: '2026-09-15T16:00:00Z',
    actionType: 'rsvp',
    actionLabel: 'RSVP Pass (Free)',
    privacyVisibility: 'public',
    metadata: { liveSpeakersCount: 24, interactiveQna: true, poapBadgeIssued: true }
  },

  // --- DOCUMENTS ---
  {
    id: 'doc_01',
    entityType: 'documents',
    title: 'OMNI Sovereign Architecture & Vector RAG Specification v4.8',
    subtitle: 'Technical Whitepaper • 48 Pages • SHA-256 Verified',
    description: 'Comprehensive mathematical and cryptographic specification of the OMNI distributed memory layer, access control, and consensus mechanism.',
    avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badge: 'Whitepaper',
    category: 'Architecture Docs',
    tags: ['Whitepaper', 'Specification', 'VectorRAG', 'Cryptography', 'Consensus'],
    engagementScore: 92,
    relevanceScore: 95,
    affinityScore: 91,
    timestamp: '2026-08-10T12:00:00Z',
    actionType: 'read',
    actionLabel: 'Open Document',
    privacyVisibility: 'public',
    metadata: { format: 'PDF / Markdown', sha256Checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  }
];

// ----------------------------------------------------------------------------
// 2. BUSINESS DISCOVERY SEED DATA
// ----------------------------------------------------------------------------

export const SEED_BUSINESS_DISCOVERY: OmniBusinessDiscoveryCard[] = [
  {
    id: 'biz_card_01',
    name: 'Aegis Sovereign Security Corp',
    type: 'service',
    tagline: 'Zero-trust enterprise security and formal cryptographic verification',
    description: 'Enterprise smart contract audits, post-quantum cryptography migration, and 24/7 autonomous SOC defense.',
    category: 'Cybersecurity',
    rating: 4.95,
    reviewCount: 310,
    verified: true,
    location: 'San Francisco, CA (Financial District)',
    distanceKm: 2.4,
    isOpenNow: true,
    openingHours: 'Mon - Fri: 8:00 AM - 6:00 PM PST',
    pricingType: 'fixed',
    priceEstimate: '$4,500 / audit',
    contactEmail: 'contact@aegissecurity.omni',
    phone: '+1 (415) 890-2341',
    websiteUrl: 'https://aegissecurity.omni',
    avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    badges: ['Enterprise Verified', 'SOC 2 Type II', 'ISO 27001'],
    servicesOffered: ['Smart Contract Audit', 'Zero-Trust Cloud Mesh', 'Penetration Testing', 'Incident Response'],
    escrowEnabled: true,
    certifications: ['CISSP Certified', 'CREST Accredited']
  },
  {
    id: 'biz_card_02',
    name: 'Artisan Roastery & Sovereign Cafe',
    type: 'local_business',
    tagline: 'Single-origin specialty coffees with instant 1-tap OMNI Wallet checkout',
    description: 'Neighborhood specialty coffee roastery featuring direct trade beans from Ethiopia, Colombia, and Costa Rica.',
    category: 'Food & Beverage',
    rating: 4.88,
    reviewCount: 480,
    verified: true,
    location: 'London, UK (Shoreditch)',
    distanceKm: 1.1,
    isOpenNow: true,
    openingHours: 'Daily: 7:00 AM - 7:00 PM GMT',
    pricingType: 'fixed',
    priceEstimate: '£3.50 - £8.00',
    contactEmail: 'hello@artisancafe.omni',
    phone: '+44 20 7946 0912',
    avatarUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80',
    badges: ['Locally Owned', 'OMNI Pay 5% Cashback', 'Direct Trade'],
    servicesOffered: ['Dine-in Espresso Bar', 'Whole Bean Subscription', 'Barista Masterclasses'],
    popularProductsCount: 18,
    escrowEnabled: true
  },
  {
    id: 'biz_card_03',
    name: 'Vance FinTech Advisory',
    type: 'professional',
    tagline: 'Multi-currency treasury design and regulatory BaaS compliance consulting',
    description: 'Senior advisory services for FinTech startups, BaaS platforms, and cross-border payment processors.',
    category: 'Financial Consulting',
    rating: 4.92,
    reviewCount: 96,
    verified: true,
    location: 'London, UK & Remote Global',
    distanceKm: 3.5,
    isOpenNow: true,
    openingHours: 'Mon - Fri: 9:00 AM - 5:30 PM GMT',
    pricingType: 'hourly',
    priceEstimate: '$250 / hour',
    contactEmail: 'marcus@vancefintech.omni',
    phone: '+44 20 7946 0843',
    websiteUrl: 'https://vancefintech.omni',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    badges: ['FCA Registered', 'BaaS Specialist', 'Top Rated'],
    servicesOffered: ['BaaS Architecture Design', 'Treasury Risk Audit', 'Cross-Border Rails Setup'],
    escrowEnabled: true,
    certifications: ['Chartered Financial Analyst (CFA)', 'ACAMS Anti-Money Laundering']
  },
  {
    id: 'biz_card_04',
    name: 'NeuroMesh Academy',
    type: 'course_provider',
    tagline: 'World-class cohort courses on agentic AI, decentralized computing, and neural RAG',
    description: 'Leading digital university for AI practitioners, offering accredited cohorts, mentor office hours, and project certification.',
    category: 'Education & AI',
    rating: 4.97,
    reviewCount: 520,
    verified: true,
    location: 'Zurich, Switzerland & Online',
    distanceKm: 0,
    isOpenNow: true,
    openingHours: 'Online 24/7 (Live Office Hours Weekly)',
    pricingType: 'fixed',
    priceEstimate: '$499 / course',
    contactEmail: 'admissions@neuromesh.omni',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    badges: ['Accredited Certs', 'Top Instructor', '100% Completion Guarantee'],
    servicesOffered: ['6-Week Cohorts', 'Executive AI Workshops', '1-on-1 Mentorship Sessions'],
    popularProductsCount: 8,
    escrowEnabled: true
  }
];

// ----------------------------------------------------------------------------
// 3. RECOMMENDATION ENGINE SIGNAL WEIGHTS & PRIVACY CONSENT DEFAULTS
// ----------------------------------------------------------------------------

export const SEED_RECOMMENDATION_SIGNALS: OmniRecommendationSignal[] = [
  {
    id: 'sig_interests',
    signalName: 'User Interests & Topic Affinity',
    weightPercent: 25,
    description: 'Semantic vector matching against declared skills, followed tags, and curated reading lists.',
    status: 'active'
  },
  {
    id: 'sig_relationships',
    signalName: 'Social Graph & Connection Density',
    weightPercent: 20,
    description: 'Prioritizing content, creators, and spaces with 1st and 2nd degree connection overlap.',
    status: 'active'
  },
  {
    id: 'sig_engagement',
    signalName: 'Historical Engagement Velocity',
    weightPercent: 15,
    description: 'Likes, comments, bookmarks, and detailed dwell time on relevant formats.',
    status: 'active'
  },
  {
    id: 'sig_communities',
    signalName: 'Shared Spaces & Guild Memberships',
    weightPercent: 10,
    description: 'Affinity boost for members participating in the same OMNI Spaces and Squads.',
    status: 'active'
  },
  {
    id: 'sig_content_interaction',
    signalName: 'Video Watch Retention & Link Clicks',
    weightPercent: 10,
    description: 'Deep engagement signals such as >85% video completion and document reading depth.',
    status: 'active'
  },
  {
    id: 'sig_purchases',
    signalName: 'Commerce & Marketplace Transactions',
    weightPercent: 10,
    description: 'Past orders, hired services, subscribed tiers, and course enrollments.',
    status: 'active'
  },
  {
    id: 'sig_location',
    signalName: 'Geographical Proximity & City Radius',
    weightPercent: 5,
    description: 'Local businesses, events, and nearby verified professionals within specified radius.',
    status: 'active'
  },
  {
    id: 'sig_language',
    signalName: 'Language & Locale Compatibility',
    weightPercent: 5,
    description: 'Native and secondary languages matching the user’s OMNI Passport settings.',
    status: 'active'
  }
];

export const DEFAULT_PRIVACY_CONSENT: OmniRecommendationPrivacyConsent = {
  enableAiPersonalization: true,
  allowBehavioralTracking: true,
  allowLocationDiscovery: true,
  allowRelationshipGraphMatching: true,
  allowPurchaseHistoryAffinity: true,
  dataRetentionPeriodDays: 90,
  anonymizeTelemetry: true
};

// ----------------------------------------------------------------------------
// 4. 5-TIER ANALYTICS DATASETS
// ----------------------------------------------------------------------------

export const SEED_PERSONAL_ANALYTICS: OmniPersonalAnalyticsData = {
  timeframe: '30d',
  engagementRate: 8.7,
  totalReach: 34200,
  impressions: 89400,
  profileViews: 1420,
  relationshipActivity: {
    totalConnections: 248,
    newConnectionsThisPeriod: 34,
    interactionsLogged: 412,
    networkHealthScore: 92,
    decayAlertsResolved: 16
  },
  contentPerformance: {
    totalPosts: 24,
    topLikedPostTitle: 'Deep Dive: Achieving Sub-35ms Agentic Vector Lookups on Edge Meshes',
    totalShares: 480,
    avgCommentsPerPost: 18.5
  },
  digitalWellbeing: {
    dailyAvgScreenTimeMinutes: 74,
    screenTimeChangePct: -14,
    focusHoursLogged: 42,
    notificationsReceived: 185,
    mindfulBreaksTaken: 28,
    doNotDisturbActive: false
  },
  dailyActivitySeries: [
    { date: 'Aug 1', impressions: 2100, interactions: 140, screenTimeMin: 85 },
    { date: 'Aug 5', impressions: 3400, interactions: 210, screenTimeMin: 78 },
    { date: 'Aug 10', impressions: 2900, interactions: 190, screenTimeMin: 65 },
    { date: 'Aug 15', impressions: 4800, interactions: 310, screenTimeMin: 90 },
    { date: 'Aug 18', impressions: 5200, interactions: 340, screenTimeMin: 72 },
    { date: 'Aug 20', impressions: 4600, interactions: 280, screenTimeMin: 68 }
  ]
};

export const SEED_CREATOR_ANALYTICS: OmniCreatorAnalyticsData = {
  timeframe: '30d',
  followersTotal: 185400,
  followersNetGrowth: 14200,
  reachTotal: 640000,
  reachGrowthPct: 24.8,
  revenueTotalUsd: 28450.00,
  revenueBreakdown: {
    subscriptionsUsd: 14200.00,
    tipsAndGiftsUsd: 3850.00,
    marketplaceDropsUsd: 7400.00,
    adRevenueShareUsd: 3000.00
  },
  contentPerformance: {
    totalMomentsViews: 520000,
    avgWatchRetentionPct: 82.4,
    viralCoefficient: 1.42,
    topPerformingVideoTitle: 'Building a Full-Stack AI Agent in 12 Minutes with OMNI SDK',
    topPerformingPostEngagementPct: 11.8
  },
  audienceInsights: {
    topCountries: [
      { country: 'United States', percent: 38 },
      { country: 'United Kingdom', percent: 18 },
      { country: 'Germany', percent: 14 },
      { country: 'Japan', percent: 12 },
      { country: 'Other', percent: 18 }
    ],
    ageDemographics: [
      { range: '18-24', percent: 22 },
      { range: '25-34', percent: 54 },
      { range: '35-44', percent: 18 },
      { range: '45+', percent: 6 }
    ],
    genderBreakdown: [
      { label: 'Identified Male', percent: 52 },
      { label: 'Identified Female', percent: 43 },
      { label: 'Non-Binary / Other', percent: 5 }
    ],
    peakActiveHoursUtc: ['14:00 - 16:00 UTC', '19:00 - 22:00 UTC']
  },
  growthTimeline: [
    { date: 'Aug 1', followers: 171200, revenue: 820, views: 14000 },
    { date: 'Aug 5', followers: 173500, revenue: 950, views: 18000 },
    { date: 'Aug 10', followers: 176800, revenue: 1100, views: 22000 },
    { date: 'Aug 15', followers: 181200, revenue: 1400, views: 31000 },
    { date: 'Aug 18', followers: 183900, revenue: 1250, views: 26000 },
    { date: 'Aug 20', followers: 185400, revenue: 1350, views: 28000 }
  ]
};

export const SEED_BUSINESS_ANALYTICS: OmniBusinessAnalyticsData = {
  timeframe: '30d',
  totalCustomers: 1420,
  newCustomersGrowthPct: 18.5,
  leadsTotal: 380,
  leadsQualifiedRatePct: 68.4,
  grossSalesUsd: 148900.00,
  salesGrowthPct: 22.4,
  avgOrderValueUsd: 104.85,
  conversionFunnel: {
    impressions: 124000,
    profileClicks: 18400,
    leadInquiries: 2400,
    dealProposals: 680,
    closedWon: 340,
    overallConversionRatePct: 2.74
  },
  businessMessages: {
    totalConversations: 840,
    avgFirstResponseTimeMin: 4.2,
    slaCompliancePct: 98.6,
    csatScore: 4.92
  },
  campaignsRoi: [
    { campaignName: 'Q3 Enterprise Security Audits Blitz', spendUsd: 3200, revenueUsd: 18400, roas: 5.75, status: 'active' },
    { campaignName: 'OMNI Core Node Hardware Promo', spendUsd: 5000, revenueUsd: 26000, roas: 5.20, status: 'active' },
    { campaignName: 'Developer SDK Retargeting', spendUsd: 1800, revenueUsd: 8200, roas: 4.55, status: 'completed' }
  ],
  revenueSeries: [
    { date: 'Aug 1', sales: 4200, leads: 12 },
    { date: 'Aug 5', sales: 5100, leads: 16 },
    { date: 'Aug 10', sales: 4800, leads: 14 },
    { date: 'Aug 15', sales: 7400, leads: 24 },
    { date: 'Aug 18', sales: 6200, leads: 19 },
    { date: 'Aug 20', sales: 6900, leads: 22 }
  ]
};

export const SEED_COMMUNITY_ANALYTICS: OmniCommunityAnalyticsData = {
  timeframe: '30d',
  totalMembers: 14280,
  memberGrowthPct: 16.2,
  activeDailyMembers: 4820,
  retentionCohort30d: {
    d1RetentionPct: 88.5,
    d7RetentionPct: 74.2,
    d14RetentionPct: 68.0,
    d30RetentionPct: 62.4
  },
  engagementMetrics: {
    messagesPerDayAvg: 4200,
    postsThisPeriod: 640,
    reactionsTotal: 34500,
    audioRoomMinutes: 18400,
    eventAttendanceAvg: 480
  },
  topContributors: [
    { profileId: 'user_01', name: 'Dr. Elena Rostova', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', postsCount: 48, reputationPoints: 3420, role: 'Moderator' },
    { profileId: 'user_02', name: 'Marcus Vance', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', postsCount: 36, reputationPoints: 2890, role: 'Guild Lead' },
    { profileId: 'user_03', name: 'Aria Thorne', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', postsCount: 42, reputationPoints: 3120, role: 'VIP Educator' }
  ],
  moderationHealth: {
    flagsResolved: 42,
    avgResolutionTimeMin: 3.4,
    cleanHealthIndexPct: 99.4
  },
  growthSeries: [
    { date: 'Aug 1', members: 12300, dailyMessages: 3600 },
    { date: 'Aug 5', members: 12700, dailyMessages: 3900 },
    { date: 'Aug 10', members: 13150, dailyMessages: 4100 },
    { date: 'Aug 15', members: 13700, dailyMessages: 4600 },
    { date: 'Aug 18', members: 14050, dailyMessages: 4300 },
    { date: 'Aug 20', members: 14280, dailyMessages: 4500 }
  ]
};

export const SEED_SUPER_ADMIN_ANALYTICS: OmniSuperAdminAnalyticsData = {
  timeframe: '30d',
  platformUsers: {
    dau: 142000,
    mau: 840000,
    wau: 410000,
    yoyGrowthPct: 184.5
  },
  networkInfrastructure: {
    storageTerabytes: 428.5,
    edgeNodesOnline: 312,
    globalTrafficQps: 18450,
    p95LatencyMs: 18.2,
    p99LatencyMs: 34.6,
    uptimeSlaPct: 99.994
  },
  ecosystemEconomy: {
    grossMerchandiseVolumeUsd: 14200000.00,
    platformTakeRateRevenueUsd: 426000.00,
    activeWalletsCount: 94000,
    ledgerTransactionsTotal: 8420000
  },
  trustAndSafety: {
    automatedScansCount: 4890000,
    quarantinedSpamItems: 1420,
    avgIncidentTriageSeconds: 14.2,
    botnetAttacksMitigated: 88
  },
  systemThroughputSeries: [
    { time: '00:00', qps: 12400, latencyMs: 16.4, cpuLoadPct: 38 },
    { time: '04:00', qps: 14200, latencyMs: 17.1, cpuLoadPct: 41 },
    { time: '08:00', qps: 19800, latencyMs: 19.8, cpuLoadPct: 58 },
    { time: '12:00', qps: 22400, latencyMs: 22.4, cpuLoadPct: 64 },
    { time: '16:00', qps: 21100, latencyMs: 20.2, cpuLoadPct: 61 },
    { time: '20:00', qps: 17500, latencyMs: 18.0, cpuLoadPct: 49 }
  ]
};

// ----------------------------------------------------------------------------
// 5. AI ANALYTICS ASSISTANT PRE-CONFIGURED QUERIES & GENERATIVE HANDLER
// ----------------------------------------------------------------------------

export const SEED_AI_ANALYTICS_QUERIES: OmniAiAnalyticsQuery[] = [
  {
    id: 'query_01',
    question: 'Why did engagement drop on Tuesday?',
    timestamp: '2026-08-19T17:30:00Z',
    answerMarkdown: `### 🔍 AI Engagement Diagnostics (Root Cause Analysis)

Our Gemini 2.5 time-series anomaly detection evaluated your Tuesday drop (-18.4% vs 30-day baseline):

1. **Suboptimal Publishing Time Window**: Your long-form technical article was posted at 04:15 UTC (3.5 hours before your primary US/European audience peak activity at 14:00 UTC).
2. **Video Hook Retention Dip**: The accompanying Moments video experienced a sharp 34% drop-off at the 4-second mark due to a slow static intro card.
3. **Competing Ecosystem Event**: The *OMNI Developer Keynote stream* absorbed 42% of active developer feed impressions during that 2-hour window.`,
    keyInsights: [
      'Publishing at 14:00 - 16:00 UTC delivers 2.8x higher day-1 distribution velocity',
      'Videos with immediate voiceover in first 1.5s retain 84% more viewers',
      'Mid-week mornings remain your strongest conversion period'
    ],
    recommendedActions: [
      {
        title: 'Auto-Schedule to Peak Time (14:30 UTC)',
        description: 'Update your publishing queue to automatically hold scheduled drafts for peak subscriber windows.',
        impactLevel: 'high',
        actionPayload: 'schedule_peak_sync'
      },
      {
        title: 'Apply Viral 1-to-N Hook Template',
        description: 'Re-edit the opening 3 seconds with dynamic waveform motion and bold text overlay.',
        impactLevel: 'medium',
        actionPayload: 'open_repurpose_hook'
      }
    ],
    chartType: 'bar',
    chartData: [
      { day: 'Mon', engagement: 92 },
      { day: 'Tue (Drop)', engagement: 68 },
      { day: 'Wed (Recovery)', engagement: 89 },
      { day: 'Thu', engagement: 95 }
    ]
  },
  {
    id: 'query_02',
    question: 'What content performed best this month?',
    timestamp: '2026-08-19T14:10:00Z',
    answerMarkdown: `### 🏆 Top Content Performance Breakdown

Your top content generated **640k total impressions** and **$28,450 gross creator revenue**:

- **#1 Top Performing Format**: *12-Minute Hands-On SDK Tutorials* (82.4% avg retention, 1.42 viral coefficient).
- **#2 Top Revenue Driver**: *Sovereign Core Node Hardware Unboxing & Benchmark* ($7,400 marketplace drops, $4,200 affiliate commissions).
- **#3 Top Engagement Magnet**: *Sub-35ms Agentic Vector Lookups Deep Dive* (4.2k likes, 380 discussion threads in OMNI Spaces).`,
    keyInsights: [
      'Interactive live coding videos convert to paid patrons at 4.2% (vs 0.8% for text-only posts)',
      'Articles with embedded code snippets receive 3.4x higher bookmark rates',
      'Weekend tutorial releases drive 28% longer dwell times'
    ],
    recommendedActions: [
      {
        title: 'Launch 3-Part Follow-Up Series',
        description: 'Expand the top SDK tutorial into a 3-part masterclass series with downloadable GitHub repos.',
        impactLevel: 'high',
        actionPayload: 'create_series_draft'
      },
      {
        title: 'Bundle with Patron Tier VIP Access',
        description: 'Offer raw project files and architectural diagrams exclusively to $9.99/mo patrons.',
        impactLevel: 'high',
        actionPayload: 'gate_patron_perk'
      }
    ],
    chartType: 'pie',
    chartData: [
      { name: 'Video Tutorials', value: 48 },
      { name: 'Hardware Demos', value: 26 },
      { name: 'Technical Articles', value: 16 },
      { name: 'Quick Notes', value: 10 }
    ]
  },
  {
    id: 'query_03',
    question: 'Which customers need follow-up right now?',
    timestamp: '2026-08-19T11:00:00Z',
    answerMarkdown: `### 💼 High-Priority Customer & Lead Triage

Our Business AI assistant analyzed **380 active pipeline leads** and flagged **3 high-value enterprise contacts** needing urgent engagement:

1. **Aegis Sovereign Security** (Deal Value: $18,400) — *Status: Proposal Sent (5 days without reply)*. Relationship decay score: High.
2. **Nexus Cloud Edge Labs** (Deal Value: $12,500) — *Status: Requested BaaS White-Label Demo*. High buyer intent (94/100).
3. **FinTech Treasury Guild Founder** (Deal Value: $8,000) — *Status: Viewed Pricing Page 4x in past 24 hours*.`,
    keyInsights: [
      'Sending follow-ups within 5 days of proposal increases win rate by +38%',
      'Customers who view pricing >3x are 4.5x more likely to close with a 10% annual prepay discount',
      'OMNI Chat SLA under 5 minutes yields 98.6% positive CSAT'
    ],
    recommendedActions: [
      {
        title: 'Dispatch 1-Click Contextual Follow-Up',
        description: 'Send Gemini-drafted enterprise check-in with calendar scheduling link to Aegis Security.',
        impactLevel: 'high',
        actionPayload: 'send_aegis_followup'
      },
      {
        title: 'Schedule Live BaaS Demo with Nexus',
        description: 'Trigger automated VIP meeting invite with dedicated technical architect.',
        impactLevel: 'high',
        actionPayload: 'schedule_nexus_demo'
      }
    ],
    chartType: 'funnel',
    chartData: [
      { stage: 'Inquiries', count: 380 },
      { stage: 'AI Qualified', count: 260 },
      { stage: 'Proposals Out', count: 48 },
      { stage: 'Urgent Follow-Up', count: 3 }
    ]
  }
];

// ----------------------------------------------------------------------------
// 6. DISCOVERY & SEARCH TEST SUITE SCENARIOS
// ----------------------------------------------------------------------------

export const SEED_DISCOVERY_TESTS: OmniDiscoveryTestScenario[] = [
  {
    id: 'test_search_multientity',
    name: 'Universal Search Multi-Entity Accuracy',
    category: 'search_accuracy',
    targetStandard: 'Accurate retrieval & entity tagging across all 11 corpus types in < 35ms',
    status: 'passed',
    executionTimeMs: 14,
    details: 'Verified keyword, semantic, and AI search indexing across People, Businesses, Creators, Communities, Posts, Videos, Products, Services, Courses, Events, and Documents with 100% precision.',
    auditMetrics: { corpusSize: 11, entitiesFound: 11, latencyMs: 14, precisionScore: '1.00' }
  },
  {
    id: 'test_search_filters',
    name: 'Multi-Criteria Filter & Sort Enforcement',
    category: 'search_accuracy',
    targetStandard: 'Strict enforcement of price, location, language, rating, and recency bounds',
    status: 'passed',
    executionTimeMs: 9,
    details: 'Validated price bounds (Free/Paid), verified status tags, 4.5+ star ratings, and geolocation filtering with zero false inclusions.',
    auditMetrics: { filterCombinationsTested: 16, accuracyPct: 100, edgeCasesHandled: 8 }
  },
  {
    id: 'test_permission_filtering',
    name: 'Permission & Sovereign Privacy Gatekeeper',
    category: 'permission_filtering',
    targetStandard: '100% exclusion of Private, Restricted Circles, and Tenant-Bounded records from public queries',
    status: 'passed',
    executionTimeMs: 8,
    details: 'Audited 50 simulated search queries across multi-tenant boundaries. Zero leakage of private messages or restricted circle content.',
    auditMetrics: { privateRecordsTested: 120, leakageCount: 0, isolationIntegrity: '100%' }
  },
  {
    id: 'test_recommendation_privacy',
    name: 'Recommendation Privacy Consent & Signal Purge',
    category: 'recommendation_privacy',
    targetStandard: 'Immediate eradication of behavioral tracking upon user opt-out and 1-click purge',
    status: 'passed',
    executionTimeMs: 7,
    details: 'Verified that toggling AI Personalization off immediately reverts recommendations to non-personalized popularity index and purges cached feature vectors.',
    auditMetrics: { vectorsPurged: 450, trackingState: 'Disabled', complianceVerified: true }
  },
  {
    id: 'test_multisignal_scoring',
    name: '8-Signal Weighted Recommendation Model',
    category: 'recommendation_privacy',
    targetStandard: 'Mathematical convergence of 8 distinct signal weights equaling exactly 100%',
    status: 'passed',
    executionTimeMs: 6,
    details: 'Validated that Interests (25%), Graph (20%), Engagement (15%), Communities (10%), Interactions (10%), Purchases (10%), Location (5%), and Language (5%) sum to 100% and rank candidates properly.',
    auditMetrics: { totalSignals: 8, sumWeight: 100, rankingEntropy: 0.042 }
  },
  {
    id: 'test_dataset_scalability',
    name: 'Large Dataset Scalability & Index Latency',
    category: 'dataset_scalability',
    targetStandard: 'Sub-50ms query latency under simulated 100k+ record in-memory HNSW index',
    status: 'passed',
    executionTimeMs: 22,
    details: 'Simulated 100,000 vector document embeddings with cosine similarity scoring. P99 latency measured at 22ms.',
    auditMetrics: { indexSize: 100000, p95LatencyMs: 16, p99LatencyMs: 22, memoryMb: 14.8 }
  },
  {
    id: 'test_analytics_calculations',
    name: '5-Tier Analytics Formula Accuracy',
    category: 'analytics_calculations',
    targetStandard: 'Zero deviation in ROAS, CAC, 30-day cohort retention, and screen time wellbeing calculations',
    status: 'passed',
    executionTimeMs: 11,
    details: 'Validated mathematical formulas across Personal, Creator, Business, Community, and Super Admin analytics tiers with high floating point precision.',
    auditMetrics: { tiersAudited: 5, formulasVerified: 24, precisionDeviation: 0 }
  },
  {
    id: 'test_ai_assistant_reasoning',
    name: 'AI Analytics Assistant Generative Reasoning',
    category: 'analytics_calculations',
    targetStandard: 'Accurate root-cause diagnosis, structured action plan generation, and chart mapping',
    status: 'passed',
    executionTimeMs: 18,
    details: 'Executed natural language diagnostics for drop analysis, top content ranking, and high-value lead triage with actionable 1-click execution payloads.',
    auditMetrics: { queriesEvaluated: 10, actionPayloadValidity: '100%', hallucinationRate: '0.0%' }
  }
];

// ----------------------------------------------------------------------------
// 7. SEARCH & RECOMMENDATION EXECUTION LOGIC
// ----------------------------------------------------------------------------

export function executeOmniSearch(
  corpus: OmniSearchResultItem[],
  filterState: OmniSearchFilterState,
  privacyConsent: OmniRecommendationPrivacyConsent
): { results: OmniSearchResultItem[]; aiSummary?: string } {
  const queryLower = filterState.query.trim().toLowerCase();

  let filtered = corpus.filter(item => {
    // 1. Entity type filter
    if (filterState.entityType !== 'all' && item.entityType !== filterState.entityType) {
      return false;
    }

    // 2. Verified only filter
    if (filterState.verifiedOnly && !item.verified) {
      return false;
    }

    // 3. Rating filter
    if (filterState.minRating > 0 && (!item.rating || item.rating < filterState.minRating)) {
      return false;
    }

    // 4. Price filter
    if (filterState.priceFilter === 'free') {
      const isFree = item.priceDisplay?.toLowerCase().includes('free') || item.priceDisplay === undefined;
      if (!isFree) return false;
    } else if (filterState.priceFilter === 'paid') {
      const isPaid = item.priceDisplay && !item.priceDisplay.toLowerCase().includes('free');
      if (!isPaid) return false;
    }

    // 5. Privacy visibility check (Public or matches consent)
    if (item.privacyVisibility === 'private') {
      return false;
    }

    // 6. Text matching (Keyword / Semantic / AI)
    if (!queryLower) {
      return true;
    }

    const titleMatch = item.title.toLowerCase().includes(queryLower);
    const subtitleMatch = item.subtitle.toLowerCase().includes(queryLower);
    const descMatch = item.description.toLowerCase().includes(queryLower);
    const categoryMatch = item.category.toLowerCase().includes(queryLower);
    const tagMatch = item.tags.some(t => t.toLowerCase().includes(queryLower));

    // In AI/Semantic mode, also match conceptual keywords
    if (filterState.mode === 'ai_search' || filterState.mode === 'semantic') {
      const conceptualTerms: Record<string, string[]> = {
        ai: ['machine learning', 'transformers', 'agents', 'neuromesh', 'vector', 'rag', 'models', 'llm'],
        security: ['cryptography', 'audit', 'soc', 'quantum', 'encryption', 'pentest', 'hsm'],
        finance: ['treasury', 'liquidity', 'baas', 'settlement', 'money', 'banking', 'fintech', 'revenue'],
        code: ['typescript', 'fullstack', 'react', 'system', 'developers', 'sdk', 'api'],
        video: ['moments', 'cinematic', 'tutorial', 'stream', 'reels', 'clip', 'camera']
      };

      for (const [key, terms] of Object.entries(conceptualTerms)) {
        if (queryLower.includes(key) || terms.some(t => queryLower.includes(t))) {
          if (item.category.toLowerCase().includes(key) || item.tags.some(t => terms.includes(t.toLowerCase()))) {
            return true;
          }
        }
      }
    }

    return titleMatch || subtitleMatch || descMatch || categoryMatch || tagMatch;
  });

  // Ranking & Sorting
  filtered.sort((a, b) => {
    if (filterState.sortBy === 'relevance') {
      return b.relevanceScore - a.relevanceScore;
    }
    if (filterState.sortBy === 'engagement') {
      return b.engagementScore - a.engagementScore;
    }
    if (filterState.sortBy === 'affinity') {
      return b.affinityScore - a.affinityScore;
    }
    if (filterState.sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (filterState.sortBy === 'recency') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return b.relevanceScore - a.relevanceScore;
  });

  let aiSummary: string | undefined = undefined;
  if (filterState.query.trim().length > 2 && filterState.mode === 'ai_search') {
    aiSummary = `Found **${filtered.length} verified results** across the OMNI ecosystem matching "${filterState.query}". Top entities include verified professionals, accredited masterclasses, and secure developer tools with end-to-end cryptographic verification.`;
  }

  return { results: filtered, aiSummary };
}
