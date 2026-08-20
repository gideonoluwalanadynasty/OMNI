/**
 * OMNI COMMERCE ENGINE — SEED & REFERENCE DATA
 * Comprehensive mock data representing real-world creators, businesses, multi-archetype catalogues,
 * storefronts, shopping carts, orders, financial settlements, and reviews.
 */

import {
  CommerceProduct,
  BusinessStorefront,
  SocialReview,
  ShoppingCart,
  CommerceOrder,
  SellerAnalytics,
  CommerceAdminGovernance,
  AiShoppingChatMessage
} from '../types/omni_commerce';

// ============================================================================
// 1. SEED COMMERCE PRODUCTS (9 DISTINCT ARCHETYPES)
// ============================================================================

export const SEED_COMMERCE_PRODUCTS: CommerceProduct[] = [
  // 1. PHYSICAL PRODUCT
  {
    id: 'prod-phys-001',
    sellerId: 'prof-store-aethelgard',
    sellerName: 'Aethelgard Hardware Lab',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_business',
    sellerRating: 4.95,
    sellerStoreSlug: 'aethelgard-lab',
    name: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
    headline: 'Aerospace-Grade Hardware Key with Zero-Knowledge NFC & Kyber-1024 Chipset',
    description: 'The definitive physical companion to your OMNI Sovereign Identity. Houses a secure enclave with quantum-resistant key generation, dual NFC/BLE 5.3 interfaces, and an IP68 waterproof titanium frame.',
    archetype: 'physical',
    category: 'Hardware & Devices',
    tags: ['Security', 'Hardware', 'E2EE', 'Titanium', 'NFC'],
    priceUsd: 289.00,
    compareAtPriceUsd: 349.00,
    currency: 'USD',
    inventoryCount: 42,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&auto=format&fit=crop&q=80'
    ],
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-details-4822-large.mp4',
    variants: [
      { id: 'var-ring-01', name: 'Finish', value: 'Matte Stealth Black', priceDeltaUsd: 0, inventoryCount: 22, sku: 'AETH-RING-BLK' },
      { id: 'var-ring-02', name: 'Finish', value: 'Raw Brushed Titanium', priceDeltaUsd: 20, inventoryCount: 12, sku: 'AETH-RING-RAW' },
      { id: 'var-ring-03', name: 'Finish', value: 'Cyberpunk Rose Gold', priceDeltaUsd: 35, inventoryCount: 8, sku: 'AETH-RING-ROSE' }
    ],
    shippingInfo: {
      weightKg: 0.15,
      originCountry: 'United Kingdom',
      freeShippingThresholdUsd: 200,
      estimatedDeliveryDays: { min: 2, max: 5 },
      methods: [
        { id: 'ship-std', name: 'Royal Mail / DHL Tracked Standard', costUsd: 0, carrier: 'DHL Express' },
        { id: 'ship-exp', name: 'FedEx Sovereign Overnight Priority', costUsd: 25.00, carrier: 'FedEx' }
      ]
    },
    averageRating: 4.9,
    reviewsCount: 128,
    salesCount: 840,
    isFeaturedMarketplace: true,
    isOmniPrimeEligible: true,
    attachedSocialMediaCount: 34,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-08-10T14:30:00Z'
  },

  // 2. DIGITAL PRODUCT
  {
    id: 'prod-digi-002',
    sellerId: 'prof-dynasty-ai',
    sellerName: 'Dynasty Digital & AI',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_creator',
    sellerRating: 4.98,
    sellerStoreSlug: 'dynasty-ai',
    name: 'OMNI Agentic AI Full-Stack TypeScript Architecture Kit',
    headline: 'Production-Ready Microfrontends, Gemini 2.5 Interactions SDK & Edge Workflows',
    description: 'Comprehensive boilerplate containing 45+ headless UI widgets, server-side Gemini 2.5 streaming pipelines, HMAC cryptographic webhook verifiers, and multi-tenant RLS schema configurations.',
    archetype: 'digital',
    category: 'Developer Tools',
    tags: ['TypeScript', 'Gemini AI', 'React', 'Boilerplate', 'SDK'],
    priceUsd: 149.00,
    compareAtPriceUsd: 199.00,
    currency: 'USD',
    inventoryCount: 9999,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-kit-indie', name: 'License', value: 'Solo Developer License (1 Project)', priceDeltaUsd: 0, inventoryCount: 9999, sku: 'DYN-KIT-SOLO' },
      { id: 'var-kit-team', name: 'License', value: 'Commercial Startup License (Unlimited Apps)', priceDeltaUsd: 150, inventoryCount: 9999, sku: 'DYN-KIT-COMM' },
      { id: 'var-kit-ent', name: 'License', value: 'Enterprise Perpetual with Source Code Escrow', priceDeltaUsd: 750, inventoryCount: 9999, sku: 'DYN-KIT-ENT' }
    ],
    digitalAssetInfo: {
      fileFormat: 'ZIP (.tar.gz / GitHub Vault Repo Access)',
      fileSizeBytes: 145000000,
      instantDeliveryMethod: 'download_link',
      licenseType: 'commercial'
    },
    averageRating: 5.0,
    reviewsCount: 312,
    salesCount: 1420,
    isFeaturedMarketplace: true,
    isOmniPrimeEligible: true,
    attachedSocialMediaCount: 88,
    createdAt: '2026-02-01T12:00:00Z',
    updatedAt: '2026-08-18T09:15:00Z'
  },

  // 3. COURSE
  {
    id: 'prod-course-003',
    sellerId: 'prof-omni-academy',
    sellerName: 'OmniAcademy Masterclasses',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_official',
    sellerRating: 4.92,
    sellerStoreSlug: 'omni-academy',
    name: 'Zero-Knowledge Cryptography & Sovereign Systems Engineering',
    headline: 'Master Halo2, Circom, Groth16, and Distributed Identity Architecture in 8 Weeks',
    description: 'An intensive, hands-on masterclass for senior engineers. Build your own zk-SNARK rollup proof circuits, design decentralized key management systems, and deploy sovereign smart contracts.',
    archetype: 'course',
    category: 'Education & Masterclasses',
    tags: ['ZKP', 'Cryptography', 'Smart Contracts', 'Security', 'Engineering'],
    priceUsd: 495.00,
    compareAtPriceUsd: 750.00,
    currency: 'USD',
    inventoryCount: 150,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-course-self', name: 'Track', value: 'Self-Paced Video + Codebase Access', priceDeltaUsd: 0, inventoryCount: 9999, sku: 'OA-ZKP-SELF' },
      { id: 'var-course-cohort', name: 'Track', value: 'Live Cohort with Weekly Office Hours & Capstone Review', priceDeltaUsd: 300, inventoryCount: 28, sku: 'OA-ZKP-COHORT' }
    ],
    courseCurriculum: {
      modulesCount: 12,
      totalHours: 48,
      certificationOffered: true,
      skillLevel: 'advanced',
      includesLiveCohort: true
    },
    averageRating: 4.94,
    reviewsCount: 86,
    salesCount: 420,
    isFeaturedMarketplace: true,
    isOmniPrimeEligible: true,
    attachedSocialMediaCount: 19,
    createdAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-08-15T11:20:00Z'
  },

  // 4. SERVICE
  {
    id: 'prod-serv-004',
    sellerId: 'prof-dynasty-ai',
    sellerName: 'Dynasty Digital & AI',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_creator',
    sellerRating: 4.98,
    sellerStoreSlug: 'dynasty-ai',
    name: 'Enterprise Security Architecture & Smart Contract Audit',
    headline: 'Comprehensive White-Hat Penetration Testing & Cryptographic Verification',
    description: 'Our senior security partners conduct thorough static analysis, symbolic execution, and manual bytecode reviews of your multi-chain smart contracts and API gateways. Delivers a formal cryptographic audit report.',
    archetype: 'service',
    category: 'Consulting & Audits',
    tags: ['Audit', 'Security', 'Enterprise', 'Smart Contracts'],
    priceUsd: 2500.00,
    currency: 'USD',
    inventoryCount: 4,
    availability: 'low_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-audit-std', name: 'Scope', value: 'Standard Smart Contract Suite (Up to 2,000 LoC)', priceDeltaUsd: 0, inventoryCount: 2, sku: 'DYN-AUD-STD' },
      { id: 'var-audit-ent', name: 'Scope', value: 'Full Protocol Audit with Threat Modeling & Formal Verification', priceDeltaUsd: 4500, inventoryCount: 2, sku: 'DYN-AUD-ENT' }
    ],
    averageRating: 5.0,
    reviewsCount: 44,
    salesCount: 68,
    isFeaturedMarketplace: false,
    isOmniPrimeEligible: false,
    attachedSocialMediaCount: 12,
    createdAt: '2026-02-15T16:00:00Z',
    updatedAt: '2026-08-12T10:00:00Z'
  },

  // 5. SUBSCRIPTION
  {
    id: 'prod-sub-005',
    sellerId: 'prof-store-aethelgard',
    sellerName: 'Aethelgard Hardware Lab',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_business',
    sellerRating: 4.95,
    sellerStoreSlug: 'aethelgard-lab',
    name: 'Sovereign Node Cluster & High-Speed Relay Subscription',
    headline: 'Dedicated 10Gbps Zero-Knowledge RPC Relays & IPFS Pinning Nodes',
    description: 'Get uninterrupted, un-throttled access to global geo-distributed RPC endpoints with 99.999% SLA uptime, automated snapshot replication, and 1TB decentralized storage quota.',
    archetype: 'subscription',
    category: 'Cloud & Infrastructure',
    tags: ['Infrastructure', 'RPC', 'Decentralized', 'Subscription'],
    priceUsd: 49.00,
    compareAtPriceUsd: 79.00,
    currency: 'USD',
    inventoryCount: 500,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-sub-m', name: 'Billing', value: 'Monthly Autopay (Cancel Anytime)', priceDeltaUsd: 0, inventoryCount: 500, sku: 'AETH-NODE-MO' },
      { id: 'var-sub-a', name: 'Billing', value: 'Annual Sovereign Pass (Save 25%)', priceDeltaUsd: 390, inventoryCount: 500, sku: 'AETH-NODE-YR' }
    ],
    averageRating: 4.88,
    reviewsCount: 94,
    salesCount: 1100,
    isFeaturedMarketplace: true,
    isOmniPrimeEligible: true,
    attachedSocialMediaCount: 15,
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-08-16T18:00:00Z'
  },

  // 6. APPOINTMENT / ADVISORY
  {
    id: 'prod-appt-006',
    sellerId: 'prof-dynasty-ai',
    sellerName: 'Dynasty Digital & AI',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_creator',
    sellerRating: 4.98,
    sellerStoreSlug: 'dynasty-ai',
    name: '1-on-1 Venture Architecture & AI Systems Advisory',
    headline: '60-Minute Private Strategy Session with Principal AI Systems Architect',
    description: 'Deep-dive into your venture roadmap, system architecture, Gemini multimodal integration, or tokenized business model. Includes tailored recording, transcript, and architectural diagram.',
    archetype: 'appointment',
    category: 'Advisory & Mentorship',
    tags: ['Advisory', 'Mentorship', 'Strategy', 'AI'],
    priceUsd: 350.00,
    currency: 'USD',
    inventoryCount: 12,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-appt-60', name: 'Duration', value: '60-Minute Intensive Advisory Session', priceDeltaUsd: 0, inventoryCount: 8, sku: 'DYN-ADV-60' },
      { id: 'var-appt-90', name: 'Duration', value: '90-Minute Extended Advisory with Code Review', priceDeltaUsd: 150, inventoryCount: 4, sku: 'DYN-ADV-90' }
    ],
    appointmentInfo: {
      durationMinutes: 60,
      bookingPlatform: 'omni_calendar',
      bufferMinutes: 15,
      timezone: 'UTC',
      availableDays: ['Tuesday', 'Thursday', 'Friday']
    },
    averageRating: 5.0,
    reviewsCount: 52,
    salesCount: 140,
    isFeaturedMarketplace: false,
    isOmniPrimeEligible: false,
    attachedSocialMediaCount: 8,
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-08-19T07:45:00Z'
  },

  // 7. TICKET / EVENT PASS
  {
    id: 'prod-tkt-007',
    sellerId: 'prof-omni-academy',
    sellerName: 'OmniAcademy Masterclasses',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_official',
    sellerRating: 4.92,
    sellerStoreSlug: 'omni-academy',
    name: 'OMNI Decentralized Sovereign Builder Summit 2026 (London)',
    headline: 'VIP Keynote, Hackathon & Private Founder Networking Pass (Dec 2026)',
    description: 'Join 1,200 world-class system engineers, venture capitalists, and cryptographers at the Barbican Centre in London. Includes catered networking dinners, VIP backstage access, and summit swag kit.',
    archetype: 'ticket',
    category: 'Events & Conferences',
    tags: ['Conference', 'London', 'VIP', 'Networking', 'Summit'],
    priceUsd: 550.00,
    compareAtPriceUsd: 750.00,
    currency: 'USD',
    inventoryCount: 65,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-tkt-gen', name: 'Pass Type', value: 'General Builder Pass (2 Days)', priceDeltaUsd: -200, inventoryCount: 45, sku: 'SUM-26-GEN' },
      { id: 'var-tkt-vip', name: 'Pass Type', value: 'All-Access VIP Founder & Investor Pass', priceDeltaUsd: 0, inventoryCount: 20, sku: 'SUM-26-VIP' }
    ],
    averageRating: 4.96,
    reviewsCount: 78,
    salesCount: 520,
    isFeaturedMarketplace: true,
    isOmniPrimeEligible: false,
    attachedSocialMediaCount: 42,
    createdAt: '2026-04-01T09:00:00Z',
    updatedAt: '2026-08-17T15:00:00Z'
  },

  // 8. DONATION / SUPPORT
  {
    id: 'prod-don-008',
    sellerId: 'prof-dynasty-ai',
    sellerName: 'Dynasty Digital & AI',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_creator',
    sellerRating: 4.98,
    sellerStoreSlug: 'dynasty-ai',
    name: 'Open-Source Sovereign Privacy Protocol Maintenance Grant',
    headline: 'Direct Support for Open-Source Double-Ratchet & Kyber-1024 Libraries',
    description: 'Support our core maintainers with continuous fuzzing infrastructure, cryptographic formal audits, and community documentation. 100% of proceeds go directly to open-source developers.',
    archetype: 'donation',
    category: 'Open Source Support',
    tags: ['Open Source', 'Privacy', 'Grant', 'Community'],
    priceUsd: 50.00,
    currency: 'USD',
    inventoryCount: 9999,
    availability: 'on_demand',
    mediaUrls: [
      'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-don-25', name: 'Tier', value: 'Community Backer ($25)', priceDeltaUsd: -25, inventoryCount: 9999, sku: 'DON-25' },
      { id: 'var-don-50', name: 'Tier', value: 'Sovereign Champion ($50)', priceDeltaUsd: 0, inventoryCount: 9999, sku: 'DON-50' },
      { id: 'var-don-250', name: 'Tier', value: 'Core Ecosystem Patron ($250 with Name in README)', priceDeltaUsd: 200, inventoryCount: 9999, sku: 'DON-250' }
    ],
    averageRating: 5.0,
    reviewsCount: 160,
    salesCount: 890,
    isFeaturedMarketplace: false,
    isOmniPrimeEligible: false,
    attachedSocialMediaCount: 28,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-08-14T12:00:00Z'
  },

  // 9. MEMBERSHIP / SYNDICATE
  {
    id: 'prod-mem-009',
    sellerId: 'prof-solaria-bio',
    sellerName: 'Solaria Wellness & Bio-Intelligence',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    sellerBadge: 'verified_creator',
    sellerRating: 4.97,
    sellerStoreSlug: 'solaria-bio',
    name: 'Solaria Bio-Intelligence Circle & Longevity Syndicate',
    headline: 'Private Community, Monthly Epigenetic Panels, and Direct Access to Top Longevity MDs',
    description: 'Exclusive private club for high-performance leaders and biohackers. Includes private encrypted community channels, quarterly biomarker diagnostics, and personalized longevity regimens.',
    archetype: 'membership',
    category: 'Health & Longevity',
    tags: ['Longevity', 'Biohacking', 'Syndicate', 'Exclusive', 'Health'],
    priceUsd: 199.00,
    compareAtPriceUsd: 299.00,
    currency: 'USD',
    inventoryCount: 30,
    availability: 'in_stock',
    mediaUrls: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'var-mem-mo', name: 'Tier', value: 'Monthly Syndicate Membership', priceDeltaUsd: 0, inventoryCount: 20, sku: 'SOL-MEM-MO' },
      { id: 'var-mem-patron', name: 'Tier', value: 'Annual Founder Patron with Diagnostic Kit', priceDeltaUsd: 1800, inventoryCount: 10, sku: 'SOL-MEM-PATRON' }
    ],
    averageRating: 4.98,
    reviewsCount: 64,
    salesCount: 280,
    isFeaturedMarketplace: true,
    isOmniPrimeEligible: true,
    attachedSocialMediaCount: 36,
    createdAt: '2026-03-01T15:00:00Z',
    updatedAt: '2026-08-19T09:00:00Z'
  }
];

// ============================================================================
// 2. SEED BUSINESS STOREFRONTS
// ============================================================================

export const SEED_BUSINESS_STOREFRONTS: BusinessStorefront[] = [
  {
    id: 'store-aethelgard',
    profileId: 'prof-store-aethelgard',
    handle: 'aethelgard-lab',
    name: 'Aethelgard Hardware Lab',
    tagline: 'Precision-Engineered Quantum Enclaves & Sovereign Security Hardware',
    description: 'Founded by defense hardware veterans in Cambridge, UK. We engineer tamper-resistant biometric security devices, hardware cryptographic keys, and cold-storage sovereign vaults for high-net-worth individuals and critical institutions.',
    logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80',
    verificationBadge: 'verified_business',
    establishedYear: 2021,
    country: 'United Kingdom',
    returnPolicyDays: 30,
    averageResponseTimeMinutes: 12,
    collections: [
      {
        id: 'col-aeth-01',
        title: 'Sovereign Biometric Wearables',
        description: 'Titanium hardware rings and smart accessories with zero-knowledge enclave authentication.',
        bannerImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
        productIds: ['prod-phys-001'],
        isFeatured: true
      },
      {
        id: 'col-aeth-02',
        title: 'Distributed Infrastructure Nodes',
        description: 'Dedicated high-throughput validator clusters and RPC gateways.',
        bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        productIds: ['prod-sub-005'],
        isFeatured: true
      }
    ],
    specialOffers: [
      {
        id: 'off-aeth-01',
        code: 'SOVEREIGN20',
        discountPercentage: 20,
        description: '20% off all hardware keys for verified OMNI Passport holders',
        validUntil: '2026-12-31T23:59:59Z',
        minimumSpendUsd: 200
      }
    ],
    featuredProductIds: ['prod-phys-001', 'prod-sub-005'],
    socialProof: {
      totalSalesVolumeUsd: 1480000,
      satisfactionRate: 99.2,
      followersCount: 38400
    },
    contact: {
      email: 'concierge@aethelgard.io',
      phone: '+44 20 7946 0991',
      supportChannelUrl: 'https://connect.omni.com/c/aethelgard-support'
    },
    activeSections: ['products', 'collections', 'offers', 'reviews', 'about', 'contact', 'community'],
    customThemeColor: '#6366f1'
  },
  {
    id: 'store-dynasty',
    profileId: 'prof-dynasty-ai',
    handle: 'dynasty-ai',
    name: 'Dynasty Digital & AI Engineering',
    tagline: 'Agentic Multimodal Intelligence, Architecture SDKs & Formal Security Audits',
    description: 'The digital engineering arm of Dynasty Systems. We build bleeding-edge developer tools, AI agent orchestration harnesses, and formal cryptographic smart contract audits trusted by Tier 1 fintechs.',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    verificationBadge: 'verified_creator',
    establishedYear: 2023,
    country: 'United States',
    returnPolicyDays: 14,
    averageResponseTimeMinutes: 5,
    collections: [
      {
        id: 'col-dyn-01',
        title: 'Developer SDKs & Full-Stack Kits',
        description: 'TypeScript, Gemini 2.5, and React boilerplates built for extreme scale.',
        bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        productIds: ['prod-digi-002'],
        isFeatured: true
      },
      {
        id: 'col-dyn-02',
        title: 'Advisory & Security Audits',
        description: 'White-glove consultation and formal mathematical verification.',
        bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
        productIds: ['prod-serv-004', 'prod-appt-006'],
        isFeatured: true
      }
    ],
    specialOffers: [
      {
        id: 'off-dyn-01',
        code: 'BUILDER50',
        discountPercentage: 50,
        description: '50% discount on Developer SDK for students and open-source contributors',
        validUntil: '2026-11-30T23:59:59Z',
        minimumSpendUsd: 100
      }
    ],
    featuredProductIds: ['prod-digi-002', 'prod-serv-004', 'prod-appt-006', 'prod-don-008'],
    socialProof: {
      totalSalesVolumeUsd: 3250000,
      satisfactionRate: 99.8,
      followersCount: 84200
    },
    contact: {
      email: 'partners@dynasty-ai.com',
      phone: '+1 415 890 2311',
      supportChannelUrl: 'https://connect.omni.com/c/dynasty-vip'
    },
    activeSections: ['products', 'collections', 'offers', 'reviews', 'about', 'contact', 'community'],
    customThemeColor: '#10b981'
  }
];

// ============================================================================
// 3. SEED SOCIAL REVIEWS
// ============================================================================

export const SEED_SOCIAL_REVIEWS: Record<string, SocialReview[]> = {
  'prod-phys-001': [
    {
      id: 'rev-001',
      productId: 'prod-phys-001',
      authorId: 'prof-user-elena',
      authorName: 'Dr. Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      title: 'Unbelievable build quality and instant NFC zero-knowledge handshake',
      comment: 'I travel constantly across Europe and the Middle East. Having my OMNI Passport and sovereign multi-currency key ring on a titanium band that requires my biometric touch is revolutionary. Delivery to Zurich took 48 hours.',
      photos: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80'
      ],
      verifiedPurchase: true,
      helpfulVotes: 48,
      createdAt: '2026-07-12T14:20:00Z',
      sellerReply: {
        authorName: 'Aethelgard Hardware Concierge',
        replyText: 'Thank you Dr. Rostova! We designed the dual-frequency antenna specifically for seamless international border travel.',
        repliedAt: '2026-07-12T16:00:00Z'
      }
    },
    {
      id: 'rev-002',
      productId: 'prod-phys-001',
      authorId: 'prof-user-marcus',
      authorName: 'Marcus Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      title: 'The Apple Watch of Hardware Security Keys',
      comment: 'Seamless integration with OMNI Pay. I just tapped the ring against my POS terminal in London and the transaction settled in USDC from my wallet with zero friction.',
      verifiedPurchase: true,
      helpfulVotes: 22,
      createdAt: '2026-08-01T10:15:00Z'
    }
  ],
  'prod-digi-002': [
    {
      id: 'rev-003',
      productId: 'prod-digi-002',
      authorId: 'prof-user-sato',
      authorName: 'Kenji Sato',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      title: 'Saved our team at least 6 months of architecture and Gemini integration',
      comment: 'The type definitions, strict error boundaries, and webhook HMAC verifiers are the cleanest code I have ever inspected. Deployed our startup portal in 3 days.',
      verifiedPurchase: true,
      helpfulVotes: 91,
      createdAt: '2026-06-25T18:30:00Z',
      sellerReply: {
        authorName: 'Gideon (Dynasty Systems)',
        replyText: 'Delighted to hear this Kenji! v2.4 with deep research agent tools is dropping next week as a free update for all license holders.',
        repliedAt: '2026-06-26T09:00:00Z'
      }
    }
  ]
};

// ============================================================================
// 4. SEED SHOPPING CART
// ============================================================================

export const SEED_SHOPPING_CART: ShoppingCart = {
  id: 'cart-sess-992',
  userId: 'prof-active-user',
  items: [
    {
      id: 'ci-001',
      productId: 'prod-phys-001',
      variantId: 'var-ring-02',
      variantName: 'Raw Brushed Titanium',
      sellerId: 'prof-store-aethelgard',
      sellerName: 'Aethelgard Hardware Lab',
      productName: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
      archetype: 'physical',
      priceUsd: 309.00,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80',
      isSavedForLater: false,
      selectedShippingMethodId: 'ship-std'
    },
    {
      id: 'ci-002',
      productId: 'prod-digi-002',
      variantId: 'var-kit-indie',
      variantName: 'Solo Developer License (1 Project)',
      sellerId: 'prof-dynasty-ai',
      sellerName: 'Dynasty Digital & AI',
      productName: 'OMNI Agentic AI Full-Stack TypeScript Architecture Kit',
      archetype: 'digital',
      priceUsd: 149.00,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80',
      isSavedForLater: false
    }
  ],
  appliedCoupons: [
    {
      code: 'SOVEREIGN20',
      discountAmountUsd: 61.80,
      sellerId: 'prof-store-aethelgard'
    }
  ],
  notesForSeller: 'Please include the titanium laser engraved serial certificate.',
  lastUpdated: '2026-08-20T02:45:00Z'
};

// ============================================================================
// 5. SEED COMMERCE ORDERS
// ============================================================================

export const SEED_COMMERCE_ORDERS: CommerceOrder[] = [
  {
    id: 'ord-88901',
    orderNumber: 'ORD-88901-GB',
    buyerProfileId: 'prof-user-elena',
    buyerName: 'Dr. Elena Rostova',
    buyerEmail: 'elena.rostova@zurich-ai.org',
    sellerProfileId: 'prof-store-aethelgard',
    sellerName: 'Aethelgard Hardware Lab',
    sellerStoreSlug: 'aethelgard-lab',
    items: [
      {
        productId: 'prod-phys-001',
        productName: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
        archetype: 'physical',
        variantName: 'Raw Brushed Titanium',
        unitPriceUsd: 309.00,
        quantity: 1,
        totalPriceUsd: 309.00,
        thumbnailUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotalUsd: 309.00,
    shippingFeeUsd: 0.00,
    taxUsd: 18.54,
    totalAmountUsd: 327.54,
    currency: 'USD',
    status: 'delivered',
    paymentMethod: 'omni_wallet',
    isEscrowProtected: true,
    tracking: {
      carrier: 'DHL Express Worldwide',
      trackingNumber: 'DHL-EU-9920194882',
      trackingUrl: 'https://dhl.com/track/DHL-EU-9920194882',
      estimatedDelivery: '2026-08-14T16:00:00Z'
    },
    financialSettlement: {
      ledgerTxId: 'LTX-88901-ESCROW-REL',
      grossAmountUsd: 327.54,
      platformTakeRateFeeUsd: 8.19, // 2.5%
      escrowFeeUsd: 1.50,
      affiliateCommissionUsd: 0,
      taxCollectedUsd: 18.54,
      netSellerPayoutUsd: 299.31,
      settlementStatus: 'released_to_wallet',
      settlementReleaseTime: '2026-08-14T17:00:00Z',
      cryptographicMerkleHash: '0x8f7a99b2c83d4e1122aef904491cba0e8829f7721e'
    },
    customerNotes: 'Deliver to building reception concierge.',
    createdAt: '2026-08-12T10:00:00Z',
    updatedAt: '2026-08-14T17:00:00Z'
  },
  {
    id: 'ord-88902',
    orderNumber: 'ORD-88902-US',
    buyerProfileId: 'prof-user-sato',
    buyerName: 'Kenji Sato',
    buyerEmail: 'sato@tokyo-labs.io',
    sellerProfileId: 'prof-dynasty-ai',
    sellerName: 'Dynasty Digital & AI',
    sellerStoreSlug: 'dynasty-ai',
    items: [
      {
        productId: 'prod-digi-002',
        productName: 'OMNI Agentic AI Full-Stack TypeScript Architecture Kit',
        archetype: 'digital',
        variantName: 'Commercial Startup License (Unlimited Apps)',
        unitPriceUsd: 299.00,
        quantity: 1,
        totalPriceUsd: 299.00,
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=80',
        digitalDeliveryCode: 'OMNI-LIC-DYN-9982-COMM-VERIFIED'
      }
    ],
    subtotalUsd: 299.00,
    shippingFeeUsd: 0.00,
    taxUsd: 0.00,
    totalAmountUsd: 299.00,
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'omni_pay_1click',
    isEscrowProtected: true,
    financialSettlement: {
      ledgerTxId: 'LTX-88902-INSTANT-SETTLE',
      grossAmountUsd: 299.00,
      platformTakeRateFeeUsd: 7.48,
      escrowFeeUsd: 0.00,
      affiliateCommissionUsd: 14.95, // 5% affiliate kickback
      taxCollectedUsd: 0.00,
      netSellerPayoutUsd: 276.57,
      settlementStatus: 'released_to_wallet',
      settlementReleaseTime: '2026-08-18T09:16:00Z',
      cryptographicMerkleHash: '0x12bb499aae38801dff90918cba551928374aaeec01'
    },
    createdAt: '2026-08-18T09:15:00Z',
    updatedAt: '2026-08-18T09:16:00Z'
  },
  {
    id: 'ord-88903',
    orderNumber: 'ORD-88903-CH',
    buyerProfileId: 'prof-user-marcus',
    buyerName: 'Marcus Vance',
    buyerEmail: 'marcus.v@sovereign-capital.ch',
    sellerProfileId: 'prof-store-aethelgard',
    sellerName: 'Aethelgard Hardware Lab',
    sellerStoreSlug: 'aethelgard-lab',
    items: [
      {
        productId: 'prod-phys-001',
        productName: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
        archetype: 'physical',
        variantName: 'Matte Stealth Black',
        unitPriceUsd: 289.00,
        quantity: 2,
        totalPriceUsd: 578.00,
        thumbnailUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotalUsd: 578.00,
    shippingFeeUsd: 25.00,
    taxUsd: 34.68,
    totalAmountUsd: 637.68,
    currency: 'USD',
    status: 'shipped',
    paymentMethod: 'crypto_usdc',
    isEscrowProtected: true,
    tracking: {
      carrier: 'FedEx Sovereign Overnight',
      trackingNumber: 'FDX-SOV-8829104',
      trackingUrl: 'https://fedex.com/track/FDX-SOV-8829104',
      estimatedDelivery: '2026-08-21T12:00:00Z'
    },
    financialSettlement: {
      ledgerTxId: 'LTX-88903-ESCROW-HELD',
      grossAmountUsd: 637.68,
      platformTakeRateFeeUsd: 15.94,
      escrowFeeUsd: 2.50,
      affiliateCommissionUsd: 0,
      taxCollectedUsd: 34.68,
      netSellerPayoutUsd: 584.56,
      settlementStatus: 'held_in_escrow',
      settlementReleaseTime: 'Pending Delivery Confirmation',
      cryptographicMerkleHash: '0x55aa3388cbe4019284fae0192471928374faec8810'
    },
    createdAt: '2026-08-19T14:00:00Z',
    updatedAt: '2026-08-19T18:30:00Z'
  },
  {
    id: 'ord-88904',
    orderNumber: 'ORD-88904-NG',
    buyerProfileId: 'prof-user-chidi',
    buyerName: 'Chidi Okonkwo',
    buyerEmail: 'chidi@lagos-fintech.ng',
    sellerProfileId: 'prof-omni-academy',
    sellerName: 'OmniAcademy Masterclasses',
    sellerStoreSlug: 'omni-academy',
    items: [
      {
        productId: 'prod-course-003',
        productName: 'Zero-Knowledge Cryptography & Sovereign Systems Engineering',
        archetype: 'course',
        variantName: 'Live Cohort with Weekly Office Hours & Capstone Review',
        unitPriceUsd: 795.00,
        quantity: 1,
        totalPriceUsd: 795.00,
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80',
        digitalDeliveryCode: 'OMNI-ACAD-COHORT-2026-CHIDI-PASS'
      }
    ],
    subtotalUsd: 795.00,
    shippingFeeUsd: 0.00,
    taxUsd: 0.00,
    totalAmountUsd: 795.00,
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'omni_wallet',
    isEscrowProtected: true,
    financialSettlement: {
      ledgerTxId: 'LTX-88904-ACAD-SETTLE',
      grossAmountUsd: 795.00,
      platformTakeRateFeeUsd: 19.88,
      escrowFeeUsd: 0,
      affiliateCommissionUsd: 39.75,
      taxCollectedUsd: 0,
      netSellerPayoutUsd: 735.37,
      settlementStatus: 'released_to_wallet',
      settlementReleaseTime: '2026-08-19T20:00:00Z',
      cryptographicMerkleHash: '0x99cc4477aa2211993847faec119284758291039485'
    },
    createdAt: '2026-08-19T19:58:00Z',
    updatedAt: '2026-08-19T20:00:00Z'
  },
  {
    id: 'ord-88905',
    orderNumber: 'ORD-88905-BR',
    buyerProfileId: 'prof-user-mateo',
    buyerName: 'Mateo Silva',
    buyerEmail: 'mateo@sao-paulo.br',
    sellerProfileId: 'prof-store-aethelgard',
    sellerName: 'Aethelgard Hardware Lab',
    sellerStoreSlug: 'aethelgard-lab',
    items: [
      {
        productId: 'prod-phys-001',
        productName: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
        archetype: 'physical',
        variantName: 'Cyberpunk Rose Gold',
        unitPriceUsd: 324.00,
        quantity: 1,
        totalPriceUsd: 324.00,
        thumbnailUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&auto=format&fit=crop&q=80'
      }
    ],
    subtotalUsd: 324.00,
    shippingFeeUsd: 0.00,
    taxUsd: 19.44,
    totalAmountUsd: 343.44,
    currency: 'USD',
    status: 'refunded',
    paymentMethod: 'debit_credit_card',
    isEscrowProtected: true,
    cancellationReason: 'Customer requested cancellation prior to carrier parcel dispatch',
    financialSettlement: {
      ledgerTxId: 'LTX-88905-REFUND-REVERSAL',
      grossAmountUsd: 343.44,
      platformTakeRateFeeUsd: 0,
      escrowFeeUsd: 0,
      affiliateCommissionUsd: 0,
      taxCollectedUsd: 0,
      netSellerPayoutUsd: 0,
      settlementStatus: 'refunded',
      settlementReleaseTime: '2026-08-17T11:00:00Z',
      cryptographicMerkleHash: '0x44dd8811ee33994827164920482910483920194857'
    },
    createdAt: '2026-08-16T14:00:00Z',
    updatedAt: '2026-08-17T11:00:00Z'
  }
];

// ============================================================================
// 6. SEED SELLER ANALYTICS
// ============================================================================

export const SEED_SELLER_ANALYTICS: SellerAnalytics = {
  period: '30_days',
  totalRevenueUsd: 48950.00,
  netEarningsUsd: 45720.00,
  ordersCount: 164,
  averageOrderValueUsd: 298.47,
  conversionRatePct: 4.82,
  topSellingProducts: [
    {
      productId: 'prod-phys-001',
      productName: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
      unitsSold: 94,
      revenueUsd: 28946.00
    },
    {
      productId: 'prod-digi-002',
      productName: 'OMNI Agentic AI Full-Stack TypeScript Architecture Kit',
      unitsSold: 46,
      revenueUsd: 9154.00
    },
    {
      productId: 'prod-course-003',
      productName: 'Zero-Knowledge Cryptography Bootcamp',
      unitsSold: 18,
      revenueUsd: 8910.00
    },
    {
      productId: 'prod-sub-005',
      productName: 'Sovereign Node Cluster Subscription',
      unitsSold: 38,
      revenueUsd: 1862.00
    }
  ],
  salesByArchetype: {
    physical: 28946.00,
    digital: 9154.00,
    course: 8910.00,
    service: 2500.00,
    subscription: 1862.00,
    appointment: 1050.00,
    ticket: 1100.00,
    donation: 450.00,
    membership: 995.00
  },
  escrowBalancePendingUsd: 4820.00,
  availableWalletBalanceUsd: 40900.00
};

// ============================================================================
// 7. SEED SUPER ADMIN GOVERNANCE
// ============================================================================

export const SEED_COMMERCE_ADMIN_GOVERNANCE: CommerceAdminGovernance = {
  isCommerceGloballyActive: true,
  platformTakeRatePct: 2.5,
  escrowHoldDurationDays: 7,
  minimumPayoutThresholdUsd: 50.00,
  supportedCurrencies: [
    { code: 'USD', symbol: '$', exchangeRateToUsd: 1.0, isCrypto: false },
    { code: 'EUR', symbol: '€', exchangeRateToUsd: 1.08, isCrypto: false },
    { code: 'GBP', symbol: '£', exchangeRateToUsd: 1.28, isCrypto: false },
    { code: 'OMNI', symbol: '⚡', exchangeRateToUsd: 4.50, isCrypto: true },
    { code: 'USDC', symbol: '₮', exchangeRateToUsd: 1.0, isCrypto: true },
    { code: 'NGN', symbol: '₦', exchangeRateToUsd: 0.00065, isCrypto: false },
    { code: 'BRL', symbol: 'R$', exchangeRateToUsd: 0.18, isCrypto: false }
  ],
  allowedArchetypes: [
    'physical',
    'digital',
    'course',
    'service',
    'subscription',
    'appointment',
    'ticket',
    'donation',
    'membership'
  ],
  restrictedProductKeywords: ['weapons', 'narcotics', 'exploit_malware', 'counterfeit', 'unverified_pharma'],
  totalGlobalSalesVolumeUsd: 84200000.00,
  activeSellersCount: 14200,
  totalOrdersProcessed: 312000
};

// ============================================================================
// 8. SEED AI SHOPPING ASSISTANT MESSAGES
// ============================================================================

export const SEED_AI_SHOPPING_MESSAGES: AiShoppingChatMessage[] = [
  {
    id: 'msg-ai-001',
    sender: 'omni_ai',
    text: 'Hello! I am your OMNI Shopping Copilot. I can recommend products across our 9 product archetypes, compare specifications, summarize authentic verified customer reviews, and check inventory in real time.',
    safetyNotice: '🛡️ Safety Policy: I never make undisclosed sponsored recommendations, and I will never complete a transaction without your explicit manual review and click-through in OMNI Checkout.',
    timestamp: '2026-08-20T02:00:00Z'
  },
  {
    id: 'msg-ai-002',
    sender: 'user',
    text: 'Can you compare the Titanium Hardware Key Ring vs other developer kits for secure authentication?',
    timestamp: '2026-08-20T02:01:00Z'
  },
  {
    id: 'msg-ai-003',
    sender: 'omni_ai',
    text: 'Here is an objective comparison between our leading hardware biometric enclave and our full-stack developer software kit:',
    comparisonTable: {
      features: ['Form Factor', 'Zero-Knowledge Support', 'Deployment Speed', 'Security Level', 'Price'],
      products: [
        {
          name: 'OMNI Biometric Key Ring',
          values: ['Physical Titanium Ring (IP68)', 'Hardware Enclave (Kyber-1024)', 'Instant via NFC Tap', 'Air-Gapped Sovereign Hardware', '$289.00']
        },
        {
          name: 'OMNI Agentic AI Architecture Kit',
          values: ['Full-Stack TypeScript SDK', 'Software Cryptographic HMAC', 'Ready in 5 minutes via npm/ZIP', 'Enterprise Application Layer', '$149.00']
        }
      ]
    },
    recommendations: [
      {
        productId: 'prod-phys-001',
        productName: 'OMNI Biometric Key Ring (Titanium Aero Edition)',
        archetype: 'physical',
        priceUsd: 289.00,
        matchScorePct: 98,
        justification: 'Best choice if you need physical tap-to-sign biometric security for traveling and offline authorization.',
        pros: ['Quantum-resistant Kyber-1024 enclave', 'Waterproof grade titanium', 'Fast 1-tap NFC signing'],
        cons: ['Requires physical delivery (2-5 days)'],
        isSponsored: false
      },
      {
        productId: 'prod-digi-002',
        productName: 'OMNI Agentic AI Full-Stack TypeScript Architecture Kit',
        archetype: 'digital',
        priceUsd: 149.00,
        matchScorePct: 92,
        justification: 'Best choice if you are building an AI-powered web application and need complete backend/frontend templates.',
        pros: ['Instant digital download', '45+ customizable React components', 'Gemini 2.5 interactions ready'],
        cons: ['Requires software development knowledge'],
        isSponsored: false
      }
    ],
    reviewSummary: {
      productId: 'prod-phys-001',
      sentimentScorePct: 99,
      keyThemes: ['Biometric Speed', 'Extreme Durability', 'OMNI Pay 1-Tap Convenience'],
      prosSummary: 'Over 98% of verified buyers praised the instant NFC authentication and comfortable titanium finish.',
      consSummary: 'A few international buyers wished for more ring size options (currently sizing 8-12).'
    },
    timestamp: '2026-08-20T02:01:30Z'
  }
];
