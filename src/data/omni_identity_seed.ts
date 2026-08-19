/**
 * OMNI DIGITAL IDENTITY SYSTEM & USERNAME REGISTRY — SEED DATA
 * Contains rich profiles for Personal, Creator, Business, Organisation, Community & Enterprise.
 */

import {
  UsernameRecord,
  UsernameRuleConfig,
  UniversalOmniProfile,
  OmniPageConfig,
  OmniPageTemplateDefinition,
  CustomDomainRecord,
  VerificationApplication,
  IdentityPrivacySettings
} from '../types/omni_identity';

// ============================================================================
// 1. USERNAME RULES & RESERVED KEYWORDS
// ============================================================================

export const SEED_USERNAME_RULES: UsernameRuleConfig = {
  minLength: 3,
  maxLength: 30,
  allowedRegex: '^[a-z0-9_.-]+$',
  allowUppercase: false,
  reservedKeywords: [
    'admin', 'root', 'omni', 'system', 'support', 'billing', 'api', 'help',
    'finance', 'connect', 'auth', 'passport', 'gov', 'moderator', 'official',
    'security', 'legal', 'compliance', 'privacy', 'status', 'developer',
    'marketing', 'press', 'null', 'undefined', 'void', 'login', 'signup'
  ],
  premiumKeywords: [
    'pay', 'bank', 'invest', 'cloud', 'ai', 'global', 'crypto', 'prime',
    'wallet', 'capital', 'ventures', 'media', 'shop', 'church', 'school'
  ],
  coolDownDaysBetweenChanges: 14
};

// ============================================================================
// 2. USERNAME REGISTRY RECORDS
// ============================================================================

export const SEED_USERNAME_REGISTRY: UsernameRecord[] = [
  {
    id: 'usr_reg_001',
    username: 'gideon',
    profileId: 'prof_usr_001',
    tenantId: 'tenant_primary_001',
    status: 'active',
    isPrimary: true,
    assignedAt: '2026-01-10T08:00:00Z',
    previousUsernames: ['gideon_dev', 'gideon.arch'],
    canonicalUrl: 'omni.com/@gideon',
    subdomainUrl: 'gideon.omni.com',
    customDomain: 'gideon.me'
  },
  {
    id: 'usr_reg_002',
    username: 'fenol',
    profileId: 'prof_biz_fenol',
    tenantId: 'tenant_fenol_corp',
    status: 'active',
    isPrimary: true,
    assignedAt: '2026-02-01T10:15:00Z',
    previousUsernames: ['fenol_intl'],
    canonicalUrl: 'omni.com/@fenol',
    subdomainUrl: 'fenol.omni.com',
    customDomain: 'www.fenolsolutions.com'
  },
  {
    id: 'usr_reg_003',
    username: 'ecclesiaglobal',
    profileId: 'prof_org_ecclesia',
    tenantId: 'tenant_ecclesia_org',
    status: 'active',
    isPrimary: true,
    assignedAt: '2026-02-10T14:30:00Z',
    previousUsernames: [],
    canonicalUrl: 'omni.com/@ecclesiaglobal',
    subdomainUrl: 'ecclesiaglobal.omni.com',
    customDomain: 'www.ecclesiaglobal.org'
  },
  {
    id: 'usr_reg_004',
    username: 'apex.finance',
    profileId: 'prof_biz_002',
    tenantId: 'tenant_enterprise_001',
    status: 'active',
    isPrimary: true,
    assignedAt: '2026-02-15T09:30:00Z',
    previousUsernames: [],
    canonicalUrl: 'omni.com/@apex.finance',
    subdomainUrl: 'apex.omni.com',
    customDomain: 'apex.finance'
  },
  {
    id: 'usr_reg_005',
    username: 'grace.citychurch',
    profileId: 'prof_org_003',
    tenantId: 'tenant_church_001',
    status: 'active',
    isPrimary: true,
    assignedAt: '2026-02-18T11:00:00Z',
    previousUsernames: [],
    canonicalUrl: 'omni.com/@grace.citychurch',
    subdomainUrl: 'grace.omni.com'
  }
];

// ============================================================================
// 3. UNIVERSAL ENRICHED PROFILES (6 PROFILE ARCHETYPES)
// ============================================================================

export const SEED_UNIVERSAL_PROFILES: UniversalOmniProfile[] = [
  // 1. CREATOR / ARCHITECT PROFILE: @gideon
  {
    id: 'prof_usr_001',
    tenantId: 'tenant_primary_001',
    userId: 'usr_gideon_001',
    username: 'gideon',
    displayName: 'Gideon Oluwalana',
    headline: 'Founder & Principal Architect • Sovereign OMNI Ecosystem',
    bio: 'Pioneering decentralized financial operating systems, zero-knowledge communications infrastructure, and high-concurrency sovereign technologies. Building tools for financial freedom.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80',
    profileType: 'creator',
    verificationBadge: 'verified_creator',
    reputationScore: 994,
    countryCode: 'GB',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    canonicalUrl: 'omni.com/@gideon',
    subdomain: 'gideon.omni.com',
    customDomain: 'gideon.me',
    customLinks: [
      { platform: 'website', url: 'https://omni.com', label: 'OMNI Ecosystem' },
      { platform: 'github', url: 'https://github.com/omni-core', label: 'Open Source Repos' },
      { platform: 'x', url: 'https://x.com/gideon_arch', label: 'Technical Insights' }
    ],
    stats: {
      postsCount: 142,
      followersCount: 38400,
      followingCount: 312,
      communitiesCount: 8,
      reputationPoints: 12450
    },
    personalData: {
      location: 'London, United Kingdom & Lagos, Nigeria',
      languages: ['English', 'Yoruba', 'French'],
      interests: ['Decentralized Finance', 'Distributed Systems', 'Cryptography', 'Theology', 'AI Research'],
      skills: ['Distributed Consensus', 'Financial Engineering', 'TypeScript', 'Rust', 'Cloud Architecture'],
      availabilityStatus: 'speaking_engagements',
      websiteLinks: [{ platform: 'website', url: 'https://omni.com', label: 'Sovereign Core' }],
      featuredPostIds: ['post_001', 'post_002'],
      joinedCommunitiesCount: 8
    },
    creatorData: {
      creatorCategory: 'Fintech & Tech',
      subscribersCount: 1420,
      monthlyRevenueUsd: 14200,
      monetizationEnabled: true,
      membershipTiers: [
        {
          id: 'tier_supporter',
          name: 'Architecture Insider',
          priceUsdMonth: 10,
          benefits: ['Access to weekly architecture whitepapers', 'Private Discord voice stage', 'Early preview builds'],
          subscribersCount: 980
        },
        {
          id: 'tier_fellow',
          name: 'Sovereign Engineering Fellow',
          priceUsdMonth: 45,
          benefits: ['1-on-1 Monthly Technical Advisory', 'Source code review access', 'Private Repository Git Access'],
          subscribersCount: 440
        }
      ],
      courses: [
        {
          id: 'course_fintech_01',
          title: 'Building High-Throughput Double-Entry Ledger Engines',
          modulesCount: 14,
          studentsCount: 3200,
          priceUsd: 199,
          thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80'
        }
      ],
      mediaGallery: [
        {
          id: 'med_01',
          title: 'The Future of Sovereign Digital Banking & FedNow Integration',
          type: 'video',
          durationOrLength: '42:15',
          viewsCount: 28400,
          mediaUrl: 'https://connect.omni.com/media/sovereign_banking_keynote'
        },
        {
          id: 'med_02',
          title: 'Decentralized Consensus in Zero-Knowledge Financial Mesh',
          type: 'article',
          durationOrLength: '12 min read',
          viewsCount: 14900,
          mediaUrl: 'https://connect.omni.com/articles/zk_mesh'
        }
      ],
      connectedFinanceWalletId: 'wal_eur_gideon_001',
      omniAdsRevenueSharePercent: 85
    },
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-08-18T12:00:00Z'
  },

  // 2. BUSINESS PROFILE: @fenol (Fenol Global Solutions)
  {
    id: 'prof_biz_fenol',
    tenantId: 'tenant_fenol_corp',
    userId: 'usr_fenol_owner',
    username: 'fenol',
    displayName: 'Fenol Global Solutions Ltd',
    headline: 'Enterprise Cloud Infrastructure, ERP & Global Logistics Software',
    bio: 'Empowering multinational corporations and supply chains across Europe and Africa with next-generation enterprise automation, fleet telematics, and cross-border invoicing.',
    avatarUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=300&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80',
    profileType: 'business',
    verificationBadge: 'verified_business',
    reputationScore: 988,
    countryCode: 'GB',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    canonicalUrl: 'omni.com/@fenol',
    subdomain: 'fenol.omni.com',
    customDomain: 'www.fenolsolutions.com',
    customLinks: [
      { platform: 'website', url: 'https://www.fenolsolutions.com', label: 'Official Corporate Website' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/fenol-solutions', label: 'Corporate LinkedIn' }
    ],
    stats: {
      postsCount: 68,
      followersCount: 52100,
      followingCount: 84,
      communitiesCount: 4,
      reputationPoints: 34200
    },
    businessData: {
      companyRegistrationNumber: 'UK-COMP-09482104',
      taxVatNumber: 'GB-994-201-84',
      foundedYear: 2018,
      headquartersAddress: '45 Finsbury Square, Financial District, London EC2A 1PX',
      operatingHours: [
        { day: 'Monday', hours: '08:00 - 18:00 GMT', isOpen: true },
        { day: 'Tuesday', hours: '08:00 - 18:00 GMT', isOpen: true },
        { day: 'Wednesday', hours: '08:00 - 18:00 GMT', isOpen: true },
        { day: 'Thursday', hours: '08:00 - 18:00 GMT', isOpen: true },
        { day: 'Friday', hours: '08:00 - 17:00 GMT', isOpen: true },
        { day: 'Saturday', hours: 'Emergency Support Only', isOpen: false },
        { day: 'Sunday', hours: 'Closed', isOpen: false }
      ],
      contactOptions: {
        email: 'contact@fenolsolutions.com',
        phone: '+44 20 7946 0912',
        whatsappNumber: '+44 7700 900142',
        supportPortalUrl: 'https://support.fenolsolutions.com'
      },
      services: [
        {
          id: 'srv_01',
          title: 'Custom ERP & Logistics Integration Rails',
          description: 'Turnkey cloud migration and real-time ledger accounting for freight & shipping enterprises.',
          startingPriceUsd: 15000,
          serviceCategory: 'Enterprise Software'
        },
        {
          id: 'srv_02',
          title: '24/7 Managed Infrastructure & Kubernetes Mesh',
          description: 'Sovereign private cloud clustering, automated failover, and multi-region database replication.',
          startingPriceUsd: 4500,
          serviceCategory: 'Cloud DevOps'
        }
      ],
      verifiedReviews: [
        {
          id: 'rev_01',
          authorName: 'David H. Sterling',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
          rating: 5,
          reviewText: 'Fenol migrated our entire 400-vehicle fleet telematics system in under 3 weeks. Zero downtime and outstanding ongoing SLA support.',
          date: '2026-07-22',
          verifiedPurchase: true
        }
      ],
      averageRating: 4.96,
      totalReviewsCount: 148,
      teamMembersCount: 42,
      crmIntegrationActive: true
    },
    createdAt: '2026-02-01T10:15:00Z',
    updatedAt: '2026-08-18T14:30:00Z'
  },

  // 3. ORGANISATION PROFILE: @ecclesiaglobal (Ecclesia Global Fellowship & Diocese)
  {
    id: 'prof_org_ecclesia',
    tenantId: 'tenant_ecclesia_org',
    userId: 'usr_ecclesia_council',
    username: 'ecclesiaglobal',
    displayName: 'Ecclesia Global Fellowship & Diocese',
    headline: 'Global Christian Network • 48 Dioceses • Humanitarian Missions',
    bio: 'Connecting faith communities, gospel ministers, youth campus fellowships, and charitable disaster relief missions across 32 countries worldwide.',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=300&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&auto=format&fit=crop&q=80',
    profileType: 'organization',
    verificationBadge: 'verified_official',
    reputationScore: 996,
    countryCode: 'GB',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    canonicalUrl: 'omni.com/@ecclesiaglobal',
    subdomain: 'ecclesiaglobal.omni.com',
    customDomain: 'www.ecclesiaglobal.org',
    customLinks: [
      { platform: 'website', url: 'https://www.ecclesiaglobal.org', label: 'Diocese Global Portal' },
      { platform: 'youtube', url: 'https://youtube.com/@ecclesiaglobal', label: 'Worldwide Sunday Live Broadcast' }
    ],
    stats: {
      postsCount: 520,
      followersCount: 194000,
      followingCount: 48,
      communitiesCount: 36,
      reputationPoints: 89400
    },
    organisationData: {
      orgType: 'church_ministry',
      governingCouncil: ['Rt. Rev. Timothy Adebayo', 'Dr. Miriam Campbell', 'Pastor Samuel Osei'],
      membersCount: 84200,
      announcements: [
        {
          id: 'ann_01',
          title: 'Global Prayer Convocation 2026: The Sovereign Awakening',
          content: 'Join over 100,000 delegates online and in person across our regional diocesan hubs for 3 days of fasting, prayer, and leadership training.',
          publishedAt: '2026-08-15T09:00:00Z',
          priority: 'broadcast'
        }
      ],
      downloadableResources: [
        {
          id: 'res_01',
          title: '2026 Discipleship Study Guide & Daily Devotional (Vol 3)',
          format: 'PDF',
          fileSizeBytes: 4820000,
          downloadUrl: 'https://connect.omni.com/resources/devotional_vol3.pdf'
        }
      ],
      donationCampaigns: [
        {
          id: 'don_01',
          title: 'East Africa Clean Water & Community Medical Clinic Mission',
          causeDescription: 'Providing solar-powered clean water boreholes and maternal health supplies to 12 rural communities.',
          targetAmountUsd: 250000,
          raisedAmountUsd: 194500,
          donorsCount: 3410,
          acceptsRecurringTithe: true,
          financeLedgerAccountId: 'acct_giving_missions_001'
        }
      ],
      affiliatedBranches: [
        {
          id: 'br_01',
          branchName: 'Ecclesia Central Cathedral (London Hub)',
          locationCity: 'London, UK',
          pastorOrLeadName: 'Bishop Marcus Vance',
          membersCount: 4800
        },
        {
          id: 'br_02',
          branchName: 'Ecclesia Grace Chapel (Lagos Regional Diocese)',
          locationCity: 'Lagos, Nigeria',
          pastorOrLeadName: 'Pastor Emmanuel Okon',
          membersCount: 12400
        },
        {
          id: 'br_03',
          branchName: 'Ecclesia Faith Fellowship (Dallas Metro)',
          locationCity: 'Dallas, TX, USA',
          pastorOrLeadName: 'Pastor Sarah Jenkins',
          membersCount: 3100
        }
      ]
    },
    createdAt: '2026-02-10T14:30:00Z',
    updatedAt: '2026-08-18T16:00:00Z'
  },

  // 4. BUSINESS PROFILE: @apex.finance
  {
    id: 'prof_biz_002',
    tenantId: 'tenant_enterprise_001',
    userId: 'usr_apex_corp',
    username: 'apex.finance',
    displayName: 'Apex Global Financial Group',
    headline: 'Institutional Treasury & Cross-Border Liquidity Rails',
    bio: 'Multi-jurisdictional financial institution delivering FedNow, SEPA Instant, and Tier-1 liquidity infrastructure to global enterprises.',
    avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80',
    profileType: 'business',
    verificationBadge: 'verified_business',
    reputationScore: 980,
    countryCode: 'US',
    language: 'en',
    isPrivate: false,
    allowDirectMessages: 'everyone',
    canonicalUrl: 'omni.com/@apex.finance',
    subdomain: 'apex.omni.com',
    customDomain: 'apex.finance',
    customLinks: [
      { platform: 'website', url: 'https://apex.finance', label: 'Corporate Portal' },
      { platform: 'website', url: 'https://developers.apex.finance', label: 'BaaS API Docs' }
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
  }
];

// ============================================================================
// 4. THE 9 ADAPTABLE OMNI PAGE TEMPLATES
// ============================================================================

export const SEED_PAGE_TEMPLATES: OmniPageTemplateDefinition[] = [
  {
    category: 'business',
    name: 'Corporate & Professional Services',
    description: 'Modern executive layout with service showcase, client testimonials, team directory, and appointment booking.',
    badge: 'Enterprise Standard',
    recommendedFor: 'Consulting firms, software companies, agencies & legal practices',
    previewThumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'services', 'reviews', 'contact'],
    defaultPrimaryColor: '#4f46e5',
    defaultAccentColor: '#06b6d4'
  },
  {
    category: 'creator',
    name: 'Creator & Digital Media Hub',
    description: 'High-engagement showcase featuring video galleries, podcast feeds, paid subscription tiers, and direct merchandise store.',
    badge: 'Monetization Ready',
    recommendedFor: 'Educators, podcasters, YouTubers, authors & thought leaders',
    previewThumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'media', 'courses', 'products', 'community', 'contact'],
    defaultPrimaryColor: '#8b5cf6',
    defaultAccentColor: '#ec4899'
  },
  {
    category: 'portfolio',
    name: 'Executive Portfolio & Resume',
    description: 'Sleek, minimalist dark-mode portfolio highlighting research papers, patents, high-impact projects, and speaking engagements.',
    badge: 'Personal Brand',
    recommendedFor: 'Founders, senior architects, designers, C-suite executives',
    previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'media', 'reviews', 'contact'],
    defaultPrimaryColor: '#0ea5e9',
    defaultAccentColor: '#10b981'
  },
  {
    category: 'church',
    name: 'Church & Faith Fellowship',
    description: 'Inspiring sanctuary theme with livestream player, multi-branch diocese directory, event calendar, and tithes/donations.',
    badge: 'Faith & Ministry',
    recommendedFor: 'Churches, cathedrals, ministries, prayer groups & missions',
    previewThumbnail: 'https://images.unsplash.com/photo-1548625361-1959828d1163?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'events', 'donations', 'community', 'media', 'contact'],
    defaultPrimaryColor: '#d97706',
    defaultAccentColor: '#f59e0b'
  },
  {
    category: 'school',
    name: 'Academy & University Campus',
    description: 'Academic portal featuring student course catalogues, faculty directory, downloadable syllabus resources, and admissions contact.',
    badge: 'Education',
    recommendedFor: 'Universities, colleges, flight academies, online bootcamps',
    previewThumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'courses', 'events', 'community', 'contact'],
    defaultPrimaryColor: '#2563eb',
    defaultAccentColor: '#10b981'
  },
  {
    category: 'company',
    name: 'SaaS & Technology Startup',
    description: 'High-converting product landing page with dynamic pricing matrix, feature cards, API documentation links, and live chat.',
    badge: 'Tech & SaaS',
    recommendedFor: 'Fintech startups, AI products, developer tools & platforms',
    previewThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'products', 'reviews', 'contact'],
    defaultPrimaryColor: '#6366f1',
    defaultAccentColor: '#14b8a6'
  },
  {
    category: 'ngo',
    name: 'NGO & Humanitarian Foundation',
    description: 'Impact-driven website with transparent project fund counters, donor impact stories, volunteer registration, and reports.',
    badge: 'Non-Profit',
    recommendedFor: 'Charities, human rights groups, disaster relief & foundations',
    previewThumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'donations', 'events', 'community', 'contact'],
    defaultPrimaryColor: '#059669',
    defaultAccentColor: '#34d399'
  },
  {
    category: 'community',
    name: 'Community & Regional Association',
    description: 'Member-driven hub with discussion boards, local event notices, neighborhood polls, and officer directory.',
    badge: 'Community',
    recommendedFor: 'Neighborhood associations, sports clubs, alumni networks',
    previewThumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'about', 'community', 'events', 'contact'],
    defaultPrimaryColor: '#ea580c',
    defaultAccentColor: '#fb923c'
  },
  {
    category: 'store',
    name: 'E-Commerce & Digital Storefront',
    description: 'Seamless storefront with product grids, instant 1-click OmniPay multi-currency checkout, and customer review badges.',
    badge: 'Commerce',
    recommendedFor: 'Brands, digital goods creators, physical retailers & artisans',
    previewThumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    defaultSections: ['home', 'products', 'about', 'reviews', 'contact'],
    defaultPrimaryColor: '#ec4899',
    defaultAccentColor: '#a855f7'
  }
];

// ============================================================================
// 5. OMNI PAGES SEED CONFIGURATIONS (Profiles converted to Websites)
// ============================================================================

export const SEED_OMNI_PAGES: OmniPageConfig[] = [
  {
    id: 'page_gideon_001',
    profileId: 'prof_usr_001',
    tenantId: 'tenant_primary_001',
    slug: 'gideon',
    siteTitle: 'Gideon Oluwalana — Sovereign Fintech & Distributed Systems',
    tagline: 'Architecting decentralized banking infrastructure, high-throughput financial ledgers & AI communications for the next generation.',
    templateCategory: 'creator',
    theme: {
      primaryColor: '#6366f1',
      accentColor: '#06b6d4',
      fontFamily: 'Plus Jakarta Sans',
      darkModeDefault: true,
      heroBannerVariant: 'gradient_minimal'
    },
    sections: [
      { id: 'sec_home', type: 'home', title: 'Welcome & Mission', isVisible: true, order: 1 },
      { id: 'sec_about', type: 'about', title: 'Biography & Engineering Philosophy', isVisible: true, order: 2 },
      { id: 'sec_media', type: 'media', title: 'Keynotes & Whitepapers', isVisible: true, order: 3 },
      { id: 'sec_courses', type: 'courses', title: 'Masterclasses & Technical Advisory', isVisible: true, order: 4 },
      { id: 'sec_community', type: 'community', title: 'Sovereign Developer Collective', isVisible: true, order: 5 },
      { id: 'sec_contact', type: 'contact', title: 'Get In Touch', isVisible: true, order: 6 }
    ],
    isPublished: true,
    publishedUrl: 'https://gideon.omni.com',
    customDomain: 'gideon.me',
    seoMeta: {
      title: 'Gideon Oluwalana — Sovereign Architect',
      description: 'Official portal of Gideon Oluwalana, lead architect behind the OMNI Sovereign Ecosystem and OMNI Finance OS.',
      keywords: ['Gideon Oluwalana', 'Fintech Architect', 'OMNI Ecosystem', 'Decentralized Banking'],
      ogImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200'
    },
    analytics: {
      pageViews: 142000,
      uniqueVisitors: 48900,
      conversionRatePercent: 4.8
    },
    updatedAt: '2026-08-18T18:00:00Z'
  },
  {
    id: 'page_fenol_001',
    profileId: 'prof_biz_fenol',
    tenantId: 'tenant_fenol_corp',
    slug: 'fenol',
    siteTitle: 'Fenol Global Solutions — Enterprise Cloud Infrastructure',
    tagline: 'Automating high-scale enterprise supply chains and sovereign financial infrastructure across the globe.',
    templateCategory: 'business',
    theme: {
      primaryColor: '#4f46e5',
      accentColor: '#10b981',
      fontFamily: 'Inter',
      darkModeDefault: true,
      heroBannerVariant: 'split_showcase'
    },
    sections: [
      { id: 'sec_home', type: 'home', title: 'Enterprise Overview', isVisible: true, order: 1 },
      { id: 'sec_about', type: 'about', title: 'About Fenol Solutions', isVisible: true, order: 2 },
      { id: 'sec_services', type: 'services', title: 'Our Core Capabilities', isVisible: true, order: 3 },
      { id: 'sec_reviews', type: 'reviews', title: 'Client Reviews & Case Studies', isVisible: true, order: 4 },
      { id: 'sec_contact', type: 'contact', title: 'Schedule Enterprise Consultation', isVisible: true, order: 5 }
    ],
    isPublished: true,
    publishedUrl: 'https://fenol.omni.com',
    customDomain: 'www.fenolsolutions.com',
    seoMeta: {
      title: 'Fenol Global Solutions Ltd',
      description: 'Enterprise ERP, Cloud Infrastructure and Fleet Telematics.',
      keywords: ['Fenol', 'Enterprise Cloud', 'Logistics ERP'],
      ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200'
    },
    analytics: {
      pageViews: 89400,
      uniqueVisitors: 28100,
      conversionRatePercent: 6.2
    },
    updatedAt: '2026-08-18T19:20:00Z'
  },
  {
    id: 'page_ecclesia_001',
    profileId: 'prof_org_ecclesia',
    tenantId: 'tenant_ecclesia_org',
    slug: 'ecclesiaglobal',
    siteTitle: 'Ecclesia Global Fellowship & Diocese',
    tagline: 'A Global Network of Faith, Discipleship and Humanitarian Missions Connecting Believers in 32 Nations.',
    templateCategory: 'church',
    theme: {
      primaryColor: '#d97706',
      accentColor: '#f59e0b',
      fontFamily: 'Playfair Display',
      darkModeDefault: true,
      heroBannerVariant: 'full_cover'
    },
    sections: [
      { id: 'sec_home', type: 'home', title: 'Diocese Welcome', isVisible: true, order: 1 },
      { id: 'sec_about', type: 'about', title: 'Our Vision & Governance', isVisible: true, order: 2 },
      { id: 'sec_events', type: 'events', title: 'Sunday Services & Global Convocations', isVisible: true, order: 3 },
      { id: 'sec_donations', type: 'donations', title: 'Tithes & Humanitarian Giving', isVisible: true, order: 4 },
      { id: 'sec_community', type: 'community', title: 'Regional Fellowship Branches', isVisible: true, order: 5 },
      { id: 'sec_contact', type: 'contact', title: 'Connect With A Minister', isVisible: true, order: 6 }
    ],
    isPublished: true,
    publishedUrl: 'https://ecclesiaglobal.omni.com',
    customDomain: 'www.ecclesiaglobal.org',
    seoMeta: {
      title: 'Ecclesia Global Fellowship',
      description: 'Official global portal of Ecclesia Global Diocese and Humanitarian Missions.',
      keywords: ['Ecclesia Global', 'Church Fellowship', 'Christian Ministry', 'Global Diocese'],
      ogImageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200'
    },
    analytics: {
      pageViews: 412000,
      uniqueVisitors: 114000,
      conversionRatePercent: 12.4
    },
    updatedAt: '2026-08-18T19:50:00Z'
  }
];

// ============================================================================
// 6. CUSTOM DOMAIN RECORDS & DNS PROVISIONING STATE
// ============================================================================

export const SEED_CUSTOM_DOMAINS: CustomDomainRecord[] = [
  {
    id: 'dom_001',
    profileId: 'prof_usr_001',
    tenantId: 'tenant_primary_001',
    domain: 'gideon.me',
    domainType: 'custom_apex',
    status: 'active',
    dnsRecords: [
      { type: 'A', name: '@', value: '76.76.21.21', ttl: 300, isVerified: true },
      { type: 'CNAME', name: 'www', value: 'connect.omni.com', ttl: 300, isVerified: true },
      { type: 'TXT', name: '_omni-verify', value: 'omni-verify=9f82a17b8849', ttl: 300, isVerified: true }
    ],
    sslCertificate: {
      issuer: 'Let\'s Encrypt Authority X3',
      validUntil: '2027-08-18T00:00:00Z',
      isAutoRenewing: true
    },
    targetPageId: 'page_gideon_001',
    routingTarget: 'connect.omni.com/@gideon',
    createdAt: '2026-01-15T12:00:00Z',
    lastCheckedAt: '2026-08-18T20:00:00Z'
  },
  {
    id: 'dom_002',
    profileId: 'prof_biz_fenol',
    tenantId: 'tenant_fenol_corp',
    domain: 'www.fenolsolutions.com',
    domainType: 'custom_subdomain',
    status: 'active',
    dnsRecords: [
      { type: 'CNAME', name: 'www', value: 'connect.omni.com', ttl: 300, isVerified: true },
      { type: 'TXT', name: '_omni-verify', value: 'omni-verify=4a88bc9123fe', ttl: 300, isVerified: true }
    ],
    sslCertificate: {
      issuer: 'Cloudflare Zero Trust Edge CA',
      validUntil: '2027-09-01T00:00:00Z',
      isAutoRenewing: true
    },
    targetPageId: 'page_fenol_001',
    routingTarget: 'connect.omni.com/@fenol',
    createdAt: '2026-02-05T09:00:00Z',
    lastCheckedAt: '2026-08-18T20:00:00Z'
  },
  {
    id: 'dom_003',
    profileId: 'prof_org_ecclesia',
    tenantId: 'tenant_ecclesia_org',
    domain: 'www.ecclesiaglobal.org',
    domainType: 'custom_subdomain',
    status: 'active',
    dnsRecords: [
      { type: 'CNAME', name: 'www', value: 'connect.omni.com', ttl: 300, isVerified: true },
      { type: 'TXT', name: '_omni-verify', value: 'omni-verify=77ab1288ccee', ttl: 300, isVerified: true }
    ],
    sslCertificate: {
      issuer: 'Let\'s Encrypt Authority X3',
      validUntil: '2027-06-15T00:00:00Z',
      isAutoRenewing: true
    },
    targetPageId: 'page_ecclesia_001',
    routingTarget: 'connect.omni.com/@ecclesiaglobal',
    createdAt: '2026-02-12T16:00:00Z',
    lastCheckedAt: '2026-08-18T20:00:00Z'
  }
];

// ============================================================================
// 7. VERIFICATION APPLICATIONS & AUDIT QUEUE
// ============================================================================

export const SEED_VERIFICATION_APPLICATIONS: VerificationApplication[] = [
  {
    id: 'ver_app_001',
    profileId: 'prof_usr_001',
    tenantId: 'tenant_primary_001',
    applicantLegalName: 'Gideon Oluwalana',
    applicantEmail: 'gideonoluwalanadynasty@gmail.com',
    entityType: 'creator',
    requestedBadge: 'verified_creator',
    category: 'Fintech Engineering & System Architecture',
    justificationText: 'Principal architect and author of the OMNI Sovereign Operating System and published distributed systems research.',
    officialWebsiteUrl: 'https://gideon.me',
    documents: [
      {
        id: 'doc_01',
        docType: 'government_id',
        fileName: 'UK_Passport_Gideon_Oluwalana.pdf',
        fileSizeBytes: 2450000,
        uploadedAt: '2026-01-11T10:00:00Z',
        checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        status: 'verified_authentic'
      }
    ],
    status: 'approved',
    submittedAt: '2026-01-11T10:00:00Z',
    reviewedAt: '2026-01-11T14:30:00Z',
    reviewerNotes: 'Identity confirmed via Government ID biometric check. Official creator badge issued.',
    assignedBadge: 'verified_creator',
    merkleAuditProof: '0x8f72aa9821ef94821a8bcee102948217bb94819a'
  },
  {
    id: 'ver_app_002',
    profileId: 'prof_biz_fenol',
    tenantId: 'tenant_fenol_corp',
    applicantLegalName: 'Fenol Global Solutions Limited',
    applicantEmail: 'compliance@fenolsolutions.com',
    entityType: 'business',
    requestedBadge: 'verified_business',
    category: 'Enterprise Cloud Software & Logistics',
    justificationText: 'Registered UK corporation operating logistics cloud infrastructure and multi-currency invoicing.',
    officialWebsiteUrl: 'https://www.fenolsolutions.com',
    documents: [
      {
        id: 'doc_02',
        docType: 'business_registration',
        fileName: 'Companies_House_Certificate_09482104.pdf',
        fileSizeBytes: 1820000,
        uploadedAt: '2026-02-02T11:00:00Z',
        checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        status: 'verified_authentic'
      }
    ],
    status: 'approved',
    submittedAt: '2026-02-02T11:00:00Z',
    reviewedAt: '2026-02-02T15:00:00Z',
    reviewerNotes: 'Verified against UK Companies House registrar and active VAT registration.',
    assignedBadge: 'verified_business',
    merkleAuditProof: '0x44ee19842af0192837bcde1029485728190aafe1'
  },
  {
    id: 'ver_app_003',
    profileId: 'prof_org_ecclesia',
    tenantId: 'tenant_ecclesia_org',
    applicantLegalName: 'Ecclesia Global Network & Diocese',
    applicantEmail: 'council@ecclesiaglobal.org',
    entityType: 'organization',
    requestedBadge: 'verified_official',
    category: 'International Faith & Charity Fellowship',
    justificationText: 'Global Christian fellowship of 48 branch dioceses and registered 501(c)(3) humanitarian missionary council.',
    officialWebsiteUrl: 'https://www.ecclesiaglobal.org',
    documents: [
      {
        id: 'doc_03',
        docType: 'tax_exemption_501c3',
        fileName: 'Charity_Commission_Registration_Ecclesia.pdf',
        fileSizeBytes: 3120000,
        uploadedAt: '2026-02-11T12:00:00Z',
        checksumSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        status: 'verified_authentic'
      }
    ],
    status: 'approved',
    submittedAt: '2026-02-11T12:00:00Z',
    reviewedAt: '2026-02-11T16:00:00Z',
    reviewerNotes: 'Non-profit ecclesiastical charter verified. Official organisation badge issued.',
    assignedBadge: 'verified_official',
    merkleAuditProof: '0x77aa182940294857182938475829103948571829'
  }
];

// ============================================================================
// 8. PRIVACY SETTINGS SEED
// ============================================================================

export const SEED_PRIVACY_SETTINGS: Record<string, IdentityPrivacySettings> = {
  prof_usr_001: {
    profileVisibility: 'public',
    allowDirectMessages: 'everyone',
    whoCanFollow: 'everyone',
    contentVisibility: 'public',
    showOnlineStatus: true,
    showFollowersList: true,
    showFinancialBadges: true,
    allowSearchEngineIndexing: true,
    twoFactorEnforced: true
  },
  prof_biz_fenol: {
    profileVisibility: 'public',
    allowDirectMessages: 'everyone',
    whoCanFollow: 'everyone',
    contentVisibility: 'public',
    showOnlineStatus: true,
    showFollowersList: true,
    showFinancialBadges: true,
    allowSearchEngineIndexing: true,
    twoFactorEnforced: true
  },
  prof_org_ecclesia: {
    profileVisibility: 'public',
    allowDirectMessages: 'everyone',
    whoCanFollow: 'everyone',
    contentVisibility: 'public',
    showOnlineStatus: true,
    showFollowersList: true,
    showFinancialBadges: true,
    allowSearchEngineIndexing: true,
    twoFactorEnforced: true
  }
};
