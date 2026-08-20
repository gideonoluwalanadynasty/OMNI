// ============================================================================
// OMNI ADS & CAMPAIGNS SEED DATA (PROMPT 12)
// High-Fidelity Multi-Campaign Data, AI Proposals, Creator RevShare Ledger,
// Publisher Network Properties, Safety Reviews & Super Admin Controls
// ============================================================================

import {
  AdCampaign,
  AiGeneratedCampaignProposal,
  CreatorAdRevShareSlot,
  PublisherProperty,
  AdSafetyReviewItem,
  UserAdReport,
  OmniAdsAdminSettings,
  AdsDiagnosticTestResult
} from '../types/omni_ads';

export const SEED_AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-001',
    advertiserId: 'adv-tech-01',
    advertiserName: 'QuantumCore Cloud Systems',
    advertiserAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
    advertiserVerified: true,
    name: 'Global Developer AI Infra Rollout — Q3',
    objective: 'sales',
    status: 'active',
    budgetType: 'daily',
    budgetAmountUsd: 250,
    spentAmountUsd: 1845.50,
    bidStrategy: 'target_roas',
    targetBidUsd: 3.80,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    placements: ['feed_native', 'video_ad_break', 'search_sponsored', 'creator_co_branded'],
    targeting: {
      locations: ['United States', 'United Kingdom', 'Germany', 'Singapore', 'Canada', 'Nigeria'],
      languages: ['English', 'German'],
      ageMin: 22,
      ageMax: 55,
      genders: ['all'],
      interests: ['Cloud Computing', 'TypeScript', 'Kubernetes', 'Machine Learning', 'DevOps'],
      behaviours: ['Tech Early Adopters', 'Frequent SaaS Buyers', 'GitHub Enterprise Users'],
      communityMemberships: ['space-developers-hub', 'space-ai-builders'],
      businessCategories: ['Technology', 'Cloud Services', 'Enterprise Software'],
      privacyConsentMode: 'anonymized_cohorts',
      estimatedAudienceSize: 1850000
    },
    creatives: [
      {
        id: 'creat-001-a',
        headline: 'Scale Edge Compute with Zero Cold Starts',
        primaryText: 'Deploy high-throughput microservices across 180+ global PoPs in under 4ms latency with QuantumCore Cloud.',
        description: 'Includes $500 free developer credits upon verification.',
        callToAction: 'Sign Up',
        mediaUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        mediaType: 'single_image',
        aspectRatio: '16:9',
        destinationUrl: 'https://quantumcore.cloud/deploy',
        displayUrl: 'quantumcore.cloud/ai-edge',
        sponsorHandle: 'quantumcore',
        sponsorName: 'QuantumCore Cloud',
        sponsorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
        isAiGenerated: true
      },
      {
        id: 'creat-001-b',
        headline: 'Watch Benchmark: 10x Faster Serverless Execution',
        primaryText: 'See how senior cloud architects cut inference costs by 64% using native OMNI Cloud integration.',
        callToAction: 'Learn More',
        mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        mediaType: 'video_mp4',
        aspectRatio: '1:1',
        destinationUrl: 'https://quantumcore.cloud/benchmarks',
        displayUrl: 'quantumcore.cloud/benchmark-2026',
        sponsorHandle: 'quantumcore',
        sponsorName: 'QuantumCore Cloud',
        sponsorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200'
      }
    ],
    metrics: {
      impressions: 142850,
      clicks: 4890,
      ctrPct: 3.42,
      cpcUsd: 0.38,
      cpmUsd: 12.92,
      conversions: 382,
      cvrPct: 7.81,
      cpaUsd: 4.83,
      conversionValueUsd: 8740.00,
      roas: 4.73,
      reach: 98400,
      frequency: 1.45,
      invalidClicksFiltered: 124
    },
    aiOptimizationEnabled: true,
    aiSuggestedImprovements: [
      'Increase bid allocation on Video Ad Breaks (+18% higher CVR vs Feed)',
      'Expand targeting to include Japanese tech hubs (Tokyo/Osaka)',
      'Refresh Headline variation B for lower fatigue index'
    ],
    createdAt: '2026-08-01T08:00:00Z',
    updatedAt: '2026-08-20T03:45:00Z'
  },
  {
    id: 'camp-002',
    advertiserId: 'adv-lux-02',
    advertiserName: 'Aura Artisanal Chronographs',
    advertiserAvatar: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
    advertiserVerified: true,
    name: 'Heritage Titanium Automatic — Limited Drop',
    objective: 'sales',
    status: 'active',
    budgetType: 'lifetime',
    budgetAmountUsd: 5000,
    spentAmountUsd: 3120.00,
    bidStrategy: 'target_cpa',
    targetBidUsd: 45.00,
    startDate: '2026-08-10',
    endDate: '2026-08-30',
    placements: ['moments_vertical', 'feed_native', 'marketplace_boost', 'status_story'],
    targeting: {
      locations: ['United States', 'Switzerland', 'UAE', 'Singapore', 'Monaco', 'France'],
      languages: ['English', 'French'],
      ageMin: 28,
      ageMax: 65,
      genders: ['all'],
      interests: ['Horology', 'Luxury Goods', 'Mechanical Watches', 'Sovereign Wealth', 'Design'],
      behaviours: ['Luxury Online Shoppers', 'High Net Worth Investors'],
      communityMemberships: ['space-luxury-collectors', 'space-horology-circle'],
      businessCategories: ['Luxury', 'Apparel & Accessories', 'Jewelry'],
      privacyConsentMode: 'anonymized_cohorts',
      estimatedAudienceSize: 620000
    },
    creatives: [
      {
        id: 'creat-002-a',
        headline: 'Only 250 Individually Numbered Pieces',
        primaryText: 'Swiss automatic calibre, aerospace titanium grade 5 case, 80-hour power reserve. Delivered in bespoke presentation vault.',
        callToAction: 'Shop Now',
        mediaUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
        mediaType: 'video_mp4',
        aspectRatio: '9:16',
        destinationUrl: 'https://aurawatches.luxury/titanium-drop',
        displayUrl: 'aurawatches.luxury/limited-250',
        sponsorHandle: 'aurawatches',
        sponsorName: 'Aura Chronographs',
        sponsorAvatar: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
        isAiGenerated: false
      }
    ],
    metrics: {
      impressions: 89400,
      clicks: 3120,
      ctrPct: 3.49,
      cpcUsd: 1.00,
      cpmUsd: 34.90,
      conversions: 84,
      cvrPct: 2.69,
      cpaUsd: 37.14,
      conversionValueUsd: 151200.00,
      roas: 48.46,
      reach: 64200,
      frequency: 1.39,
      invalidClicksFiltered: 88
    },
    aiOptimizationEnabled: true,
    aiSuggestedImprovements: [
      'Inventory pacing warning: 82% of batch sold. Recommend reducing budget by 30% to maintain stock longevity.'
    ],
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-08-20T02:10:00Z'
  },
  {
    id: 'camp-003',
    advertiserId: 'adv-fin-03',
    advertiserName: 'OmniYield Quantitative Hedge Protocol',
    advertiserAvatar: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200',
    advertiserVerified: true,
    name: 'Institutional Staking & Treasury Growth',
    objective: 'leads',
    status: 'active',
    budgetType: 'daily',
    budgetAmountUsd: 180,
    spentAmountUsd: 920.40,
    bidStrategy: 'target_cpa',
    targetBidUsd: 22.00,
    startDate: '2026-08-15',
    endDate: '2026-09-15',
    placements: ['search_sponsored', 'creator_co_branded', 'business_page_promoted', 'feed_native'],
    targeting: {
      locations: ['Global', 'Tier 1 Financial Hubs'],
      languages: ['English'],
      ageMin: 25,
      ageMax: 65,
      genders: ['all'],
      interests: ['DeFi', 'Quantitative Finance', 'Treasury Management', 'Algorithmic Trading'],
      behaviours: ['CFOs', 'Treasury Directors', 'Crypto Institutional Allocators'],
      communityMemberships: ['space-fintech-executives'],
      businessCategories: ['Finance', 'Investment Banking'],
      privacyConsentMode: 'aggregated_differential_privacy',
      estimatedAudienceSize: 450000
    },
    creatives: [
      {
        id: 'creat-003-a',
        headline: 'Automated 11.4% Net APY Treasury Vaults',
        primaryText: 'Audited smart contract vaults with delta-neutral hedging. Protect corporate balances while earning yield.',
        callToAction: 'Book Now',
        mediaUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800',
        mediaType: 'single_image',
        aspectRatio: '1:1',
        destinationUrl: 'https://omniyield.finance/institutional',
        displayUrl: 'omniyield.finance/treasury',
        sponsorHandle: 'omniyield',
        sponsorName: 'OmniYield Protocol',
        sponsorAvatar: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200'
      }
    ],
    metrics: {
      impressions: 54100,
      clicks: 1640,
      ctrPct: 3.03,
      cpcUsd: 0.56,
      cpmUsd: 17.01,
      conversions: 49,
      cvrPct: 2.99,
      cpaUsd: 18.78,
      conversionValueUsd: 24500.00,
      roas: 26.62,
      reach: 41200,
      frequency: 1.31,
      invalidClicksFiltered: 42
    },
    aiOptimizationEnabled: true,
    createdAt: '2026-08-15T12:00:00Z',
    updatedAt: '2026-08-20T01:30:00Z'
  },
  {
    id: 'camp-004',
    advertiserId: 'adv-ed-04',
    advertiserName: 'Dr. Adeyemi AI Masterclass',
    advertiserAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    advertiserVerified: true,
    name: 'Full-Stack Gemini 2.5 Architecture Masterclass',
    objective: 'subscriptions',
    status: 'active',
    budgetType: 'daily',
    budgetAmountUsd: 120,
    spentAmountUsd: 640.00,
    bidStrategy: 'lowest_cost_auto',
    targetBidUsd: 1.20,
    startDate: '2026-08-12',
    endDate: '2026-09-12',
    placements: ['feed_native', 'video_ad_break', 'moments_vertical', 'publisher_web_native'],
    targeting: {
      locations: ['Global'],
      languages: ['English', 'French', 'Spanish'],
      ageMin: 20,
      ageMax: 50,
      genders: ['all'],
      interests: ['Software Engineering', 'Generative AI', 'React', 'Full-Stack Development'],
      behaviours: ['Lifelong Learners', 'Active Course Students'],
      communityMemberships: ['space-ai-builders', 'space-creators-circle'],
      businessCategories: ['Education', 'Tech Training'],
      privacyConsentMode: 'anonymized_cohorts',
      estimatedAudienceSize: 2200000
    },
    creatives: [
      {
        id: 'creat-004-a',
        headline: 'Master Gemini 2.5 Multimodal Engineering in 4 Weeks',
        primaryText: 'Hands-on architectural guide with 14 production project boilerplates, direct mentor code reviews, and lifetime Discord VIP access.',
        callToAction: 'Subscribe',
        mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        mediaType: 'single_image',
        aspectRatio: '16:9',
        destinationUrl: 'https://connect.omni.com/creator/adeyemi_ai/masterclass',
        displayUrl: 'omni.creator/adeyemi-masterclass',
        sponsorHandle: 'adeyemi_ai',
        sponsorName: 'Dr. Adeyemi Alabi',
        sponsorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
      }
    ],
    metrics: {
      impressions: 76200,
      clicks: 3410,
      ctrPct: 4.47,
      cpcUsd: 0.19,
      cpmUsd: 8.40,
      conversions: 112,
      cvrPct: 3.28,
      cpaUsd: 5.71,
      conversionValueUsd: 6720.00,
      roas: 10.50,
      reach: 58900,
      frequency: 1.29,
      invalidClicksFiltered: 54
    },
    aiOptimizationEnabled: true,
    createdAt: '2026-08-12T09:00:00Z',
    updatedAt: '2026-08-20T04:00:00Z'
  }
];

export const SEED_AI_CAMPAIGN_PROPOSALS: AiGeneratedCampaignProposal[] = [
  {
    id: 'ai-prop-001',
    prompt: 'Create a high-converting global campaign to promote our new sovereign biometric hardware wallet with instant NFC payments.',
    recommendedName: 'Sovereign Biometric NFC Key — Global Launch',
    recommendedObjective: 'sales',
    recommendedPlacements: ['feed_native', 'moments_vertical', 'marketplace_boost', 'video_ad_break'],
    recommendedDailyBudgetUsd: 150,
    recommendedBidStrategy: 'target_roas',
    recommendedTargetBidUsd: 4.20,
    predictedRoas: 5.8,
    predictedReachMin: 120000,
    predictedReachMax: 350000,
    generatedCopyOptions: [
      {
        headline: 'Your Keys, Your Biometrics: Unhackable Sovereign Security',
        primaryText: 'Air-gapped secure element with sub-second fingerprint authentication and tap-to-pay NFC. Zero seed phrase vulnerabilities.',
        callToAction: 'Shop Now',
        sellingPoints: ['EAL6+ Military Grade Vault', '1-Tap NFC Checkout', 'Global Express Shipping']
      },
      {
        headline: 'Stop Worrying About Seed Phrase Theft. Tap & Verify.',
        primaryText: 'The next evolution of sovereign hardware protection. Integrated seamlessly with OMNI Pay and cold storage reserves.',
        callToAction: 'Learn More',
        sellingPoints: ['FIDO2 Certified', 'Titanium Enclosure', '100% Open Source Firmware']
      }
    ],
    generatedVisualPrompts: [
      {
        visualDescription: 'Sleek matte titanium biometric hardware key floating against minimalist dark cybernetic grid with soft neon cyan rim lighting.',
        recommendedAspectRatio: '1:1',
        previewUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800'
      },
      {
        visualDescription: 'Hand tapping sleek black titanium biometric card against OMNI POS terminal with instant glowing confirmation checkmark.',
        recommendedAspectRatio: '9:16',
        previewUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800'
      }
    ],
    suggestedAudience: {
      locations: ['United States', 'Germany', 'United Kingdom', 'Japan', 'UAE', 'Singapore'],
      languages: ['English', 'German', 'Japanese'],
      ageMin: 24,
      ageMax: 60,
      genders: ['all'],
      interests: ['Hardware Security', 'Cryptocurrency', 'Privacy Tech', 'FinTech', 'Sovereign Identity'],
      behaviours: ['Hardware Wallet Owners', 'High Tech Spenders'],
      communityMemberships: ['space-security-architects', 'space-crypto-whales'],
      businessCategories: ['Cybersecurity', 'Financial Hardware'],
      privacyConsentMode: 'anonymized_cohorts',
      estimatedAudienceSize: 1420000
    },
    requiresUserApproval: true,
    approvalStatus: 'pending'
  }
];

export const SEED_CREATOR_REV_SHARE_SLOTS: CreatorAdRevShareSlot[] = [
  {
    id: 'rev-slot-001',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorHandle: 'adeyemi_ai',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    contentId: 'cont-vid-001',
    contentTitle: 'Deep Dive: Gemini 2.5 Architecture & Agentic Reasoning',
    contentType: 'video',
    monetizationEnabled: true,
    adBreakType: 'mid_roll',
    adImpressionsServed: 248900,
    grossAdRevenueUsd: 3484.60,
    creatorRevSharePct: 70,
    creatorNetEarningsUsd: 2439.22,
    omniPlatformFeeUsd: 1045.38,
    payoutStatus: 'settled',
    omniFinanceTransactionRef: 'TX-FIN-CREATOR-982110',
    lastSettledAt: '2026-08-19T23:00:00Z'
  },
  {
    id: 'rev-slot-002',
    creatorId: 'prof-001',
    creatorName: 'Dr. Adeyemi Alabi',
    creatorHandle: 'adeyemi_ai',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    contentId: 'cont-pod-002',
    contentTitle: 'OMNI Tech Radar #42: Quantum Computing in 2026',
    contentType: 'podcast',
    monetizationEnabled: true,
    adBreakType: 'pre_roll',
    adImpressionsServed: 112400,
    grossAdRevenueUsd: 1348.80,
    creatorRevSharePct: 70,
    creatorNetEarningsUsd: 944.16,
    omniPlatformFeeUsd: 404.64,
    payoutStatus: 'pending'
  },
  {
    id: 'rev-slot-003',
    creatorId: 'prof-002',
    creatorName: 'Elena Rostova',
    creatorHandle: 'elena_art',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    contentId: 'cont-mom-003',
    contentTitle: 'Generative 3D Shaders in WebGPU',
    contentType: 'moment',
    monetizationEnabled: true,
    adBreakType: 'overlay_banner',
    adImpressionsServed: 540200,
    grossAdRevenueUsd: 4861.80,
    creatorRevSharePct: 65,
    creatorNetEarningsUsd: 3160.17,
    omniPlatformFeeUsd: 1701.63,
    payoutStatus: 'settled',
    omniFinanceTransactionRef: 'TX-FIN-CREATOR-982144',
    lastSettledAt: '2026-08-18T18:30:00Z'
  },
  {
    id: 'rev-slot-004',
    creatorId: 'prof-003',
    creatorName: 'Marcus Sterling',
    creatorHandle: 'sterling_macro',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    contentId: 'cont-art-004',
    contentTitle: 'Global Liquidity Cycles & Sovereign Bonds Q3 2026',
    contentType: 'article',
    monetizationEnabled: true,
    adBreakType: 'in_stream_pinned',
    adImpressionsServed: 84300,
    grossAdRevenueUsd: 1011.60,
    creatorRevSharePct: 70,
    creatorNetEarningsUsd: 708.12,
    omniPlatformFeeUsd: 303.48,
    payoutStatus: 'pending'
  }
];

export const SEED_PUBLISHER_PROPERTIES: PublisherProperty[] = [
  {
    id: 'pub-001',
    publisherId: 'user-pub-881',
    publisherName: 'TechChronicle Media Group',
    siteOrAppName: 'TechChronicle Daily Portal',
    domainOrBundleId: 'techchronicle.io',
    propertyType: 'omni_website',
    verificationStatus: 'verified',
    status: 'active',
    adUnits: [
      {
        unitId: 'unit-banner-01',
        unitName: 'Header Responsive Billboard',
        type: 'responsive_banner',
        floorCpmUsd: 2.50,
        impressionsTotal: 684000,
        clicksTotal: 18450,
        ctrPct: 2.70,
        revenueUsd: 2872.80
      },
      {
        unitId: 'unit-native-02',
        unitName: 'In-Article Recommended Grid',
        type: 'native_card',
        floorCpmUsd: 3.20,
        impressionsTotal: 412000,
        clicksTotal: 16900,
        ctrPct: 4.10,
        revenueUsd: 2183.60
      }
    ],
    totalImpressions: 1096000,
    totalEarningsUsd: 3438.35, // 68% share
    publisherSharePct: 68,
    pendingPayoutUsd: 1140.20,
    settledPayoutUsd: 2298.15,
    embedSnippetCode: `<script async src="https://ads.omni.network/sdk/v1/omni-ads.js" data-publisher="pub-001" data-unit="unit-banner-01"></script>\n<div id="omni-ad-unit-banner-01"></div>`
  },
  {
    id: 'pub-002',
    publisherId: 'user-pub-902',
    publisherName: 'Apex Gaming Studios',
    siteOrAppName: 'Galaxy Raiders Mobile App',
    domainOrBundleId: 'com.apexgaming.galaxyraiders',
    propertyType: 'omni_app',
    verificationStatus: 'verified',
    status: 'active',
    adUnits: [
      {
        unitId: 'unit-rewarded-01',
        unitName: 'Double Energy Rewarded Video',
        type: 'rewarded_ad',
        floorCpmUsd: 8.00,
        impressionsTotal: 340000,
        clicksTotal: 29800,
        ctrPct: 8.76,
        revenueUsd: 4420.00
      }
    ],
    totalImpressions: 340000,
    totalEarningsUsd: 3005.60,
    publisherSharePct: 68,
    pendingPayoutUsd: 890.40,
    settledPayoutUsd: 2115.20,
    embedSnippetCode: `// OMNI Mobile SDK Initializer\nOmniAds.showRewardedVideo({ unitId: 'unit-rewarded-01', onReward: (reward) => unlockEnergy(reward) });`
  }
];

export const SEED_AD_SAFETY_REVIEWS: AdSafetyReviewItem[] = [
  {
    id: 'rev-ad-001',
    adId: 'creat-001-a',
    campaignName: 'Global Developer AI Infra Rollout',
    advertiserName: 'QuantumCore Cloud Systems',
    creativeHeadline: 'Scale Edge Compute with Zero Cold Starts',
    mediaUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    policyCheckScore: 98,
    policyStatus: 'passed',
    policyViolations: [],
    botFraudScore: 2,
    invalidTrafficDetected: false,
    reviewedBy: 'omni_ai_safety_guard',
    reviewedAt: '2026-08-01T08:05:00Z'
  },
  {
    id: 'rev-ad-002',
    adId: 'creat-suspicious-09',
    campaignName: 'Guaranteed 500x Crypto Returns Overnight',
    advertiserName: 'Unknown QuickYield Trader',
    creativeHeadline: 'Turn $100 into $50,000 in 24 Hours Guaranteed',
    mediaUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    policyCheckScore: 12,
    policyStatus: 'rejected',
    policyViolations: ['Prohibited Financial Guarantee', 'Misleading High-Yield Claims', 'Unverified Advertiser'],
    botFraudScore: 89,
    invalidTrafficDetected: true,
    reviewedBy: 'omni_ai_safety_guard',
    reviewedAt: '2026-08-19T14:20:00Z'
  },
  {
    id: 'rev-ad-003',
    adId: 'creat-002-a',
    campaignName: 'Heritage Titanium Automatic',
    advertiserName: 'Aura Artisanal Chronographs',
    creativeHeadline: 'Only 250 Individually Numbered Pieces',
    mediaUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
    policyCheckScore: 95,
    policyStatus: 'passed',
    policyViolations: [],
    botFraudScore: 4,
    invalidTrafficDetected: false,
    reviewedBy: 'omni_ai_safety_guard',
    reviewedAt: '2026-08-10T10:02:00Z'
  }
];

export const SEED_USER_AD_REPORTS: UserAdReport[] = [
  {
    id: 'rep-001',
    adId: 'creat-suspicious-09',
    reporterUserId: 'usr-fed-992',
    reason: 'misleading',
    comment: 'Scam ad claiming impossible 500x returns.',
    status: 'ad_removed',
    reportedAt: '2026-08-19T14:15:00Z'
  },
  {
    id: 'rep-002',
    adId: 'creat-001-a',
    reporterUserId: 'usr-dev-110',
    reason: 'repetitive',
    comment: 'I already signed up for QuantumCore, no need to see it daily.',
    status: 'dismissed',
    reportedAt: '2026-08-18T11:00:00Z'
  }
];

export const SEED_OMNI_ADS_ADMIN_SETTINGS: OmniAdsAdminSettings = {
  defaultCreatorRevSharePct: 70,
  defaultPublisherRevSharePct: 68,
  omniPlatformReservePct: 30,
  minDailyBudgetUsd: 5.00,
  minBidFloorCpcUsd: 0.05,
  minBidFloorCpmUsd: 1.00,
  allowPoliticalAds: false,
  requireKycForAdvertisers: true,
  automatedAiReviewEnabled: true,
  invalidTrafficFilterStrictness: 'ml_strict',
  restrictedCountries: ['North Korea', 'Syria', 'Iran'],
  activePlacementSwitches: {
    feed_native: true,
    moments_vertical: true,
    status_story: true,
    video_ad_break: true,
    search_sponsored: true,
    marketplace_boost: true,
    creator_co_branded: true,
    business_page_promoted: true,
    publisher_web_native: true,
    publisher_app_rewarded: true
  }
};

export const SEED_ADS_DIAGNOSTIC_TESTS: AdsDiagnosticTestResult[] = [
  {
    id: 'test-ads-01',
    testName: 'Campaign Creation & 9-Objective Matrix Validation',
    category: 'campaign_creation',
    status: 'passed',
    durationMs: 42,
    details: 'Validated full lifecycle for Sales, Leads, Awareness, Messages, Installs, Subscriptions and Events with aggregated targeting.',
    telemetryLogs: [
      '[AUDIT] Initialized Campaign Builder with objective: "sales"',
      '[AUDIT] Anonymized targeting cohort compiled (Audience size: 1,850,000)',
      '[AUDIT] Media assets validated across 1:1, 9:16, 16:9 aspect ratios',
      '[SUCCESS] Campaign registered with ID: camp-001 in active state'
    ]
  },
  {
    id: 'test-ads-02',
    testName: 'Auction Bidding, Floor Pricing & Budget Pacing Engine',
    category: 'budget_pacing',
    status: 'passed',
    durationMs: 38,
    details: 'Simulated 100,000 real-time second-price auction events with smooth daily pacing and target ROAS bid constraints.',
    telemetryLogs: [
      '[AUCTION] Executed second-price auction (Highest Bid: $3.80, Clearing Bid: $3.42)',
      '[PACING] Hourly spend calibrated at $10.41/hr for $250 daily cap',
      '[FLOOR] Floor pricing rule enforced (Min CPM: $1.00 satisfied)',
      '[SUCCESS] 0 overspend anomalies detected across 24h simulation window'
    ]
  },
  {
    id: 'test-ads-03',
    testName: 'Creator & Publisher 70/30 Revenue Split Calculation',
    category: 'rev_share_split',
    status: 'passed',
    durationMs: 29,
    details: 'Calculated split on $3,484.60 gross video revenue: Creator received $2,439.22 (70%), Platform Reserve received $1,045.38 (30%).',
    telemetryLogs: [
      '[SPLIT] Ingested gross ad revenue: $3,484.60 USD on Video ID: cont-vid-001',
      '[SPLIT] Creator rate 70% applied -> $2,439.22 net credited to creator balance',
      '[SPLIT] OMNI Platform fee 30% -> $1,045.38 reserved for protocol operations',
      '[SUCCESS] Double-entry balances reconcile with zero floating-point remainder'
    ]
  },
  {
    id: 'test-ads-04',
    testName: 'Real-Time Ad Analytics, CTR, CVR & ROAS Telemetry',
    category: 'analytics_telemetry',
    status: 'passed',
    durationMs: 35,
    details: 'Verified sub-second streaming metrics for impressions, unique reach, click attribution, conversions, and ROAS calculations.',
    telemetryLogs: [
      '[ANALYTICS] Ingested 142,850 impressions & 4,890 clicks',
      '[CALC] CTR computed at 3.42%, CPC computed at $0.38 USD',
      '[ATTRIBUTION] Multi-touch conversion attribution credited 382 sales ($8,740.00 conversion value)',
      '[SUCCESS] Live ROAS calculated accurately at 4.73x'
    ]
  },
  {
    id: 'test-ads-05',
    testName: 'AI Safety Policy Review & Invalid Traffic (IVT) Bot Defense',
    category: 'fraud_prevention',
    status: 'passed',
    durationMs: 46,
    details: 'Scanned ad creatives with Gemini AI Policy engine. Intercepted 124 bot click attempts via behavioral fingerprinting.',
    telemetryLogs: [
      '[SAFETY] Gemini 2.5 Policy Guard scanned ad copy against prohibited claims list',
      '[FRAUD] Heuristic bot detection triggered for 124 rapid IP click spikes',
      '[IVT] Invalid traffic isolated and zero charges billed to advertiser',
      '[SUCCESS] 1 high-risk deceptive ad blocked and quarantined automatically'
    ]
  },
  {
    id: 'test-ads-06',
    testName: 'OMNI Finance Settlement & Double-Entry Ledger Sync',
    category: 'finance_settlement',
    status: 'passed',
    durationMs: 31,
    details: 'Transferred advertiser payments into escrow, cleared platform reserve, and generated cryptographic receipt TX-FIN-CREATOR-982110.',
    telemetryLogs: [
      '[FINANCE] Debit Advertiser Account: -$1,845.50 USD',
      '[FINANCE] Credit Creator Sovereign Wallet: +$2,439.22 USD',
      '[FINANCE] Credit OMNI Protocol Reserve: +$1,045.38 USD',
      '[SUCCESS] Merkle settlement receipt generated: TX-FIN-CREATOR-982110'
    ]
  }
];
