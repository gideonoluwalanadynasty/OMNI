// ============================================================================
// OMNI ADS & CAMPAIGNS ECOSYSTEM TYPES (PROMPT 12)
// Unified Advertising Network, Campaign Manager, AI Creative Assistant,
// Creator Ad Revenue Sharing, Publisher Network & Financial Settlement
// ============================================================================

export type AdPlacementType =
  | 'feed_native'
  | 'moments_vertical'
  | 'status_story'
  | 'video_ad_break'
  | 'search_sponsored'
  | 'marketplace_boost'
  | 'creator_co_branded'
  | 'business_page_promoted'
  | 'publisher_web_native'
  | 'publisher_app_rewarded';

export type CampaignObjective =
  | 'awareness'
  | 'traffic'
  | 'engagement'
  | 'messages'
  | 'leads'
  | 'sales'
  | 'app_installs'
  | 'events'
  | 'subscriptions';

export type CampaignStatus =
  | 'draft'
  | 'in_review'
  | 'active'
  | 'paused'
  | 'completed'
  | 'rejected'
  | 'flagged_safety';

export type BidStrategy =
  | 'lowest_cost_auto'
  | 'target_cpc'
  | 'target_cpm'
  | 'target_cpa'
  | 'target_roas';

export type BudgetType = 'daily' | 'lifetime';

export type AdCreativeFormat =
  | 'single_image'
  | 'video_mp4'
  | 'carousel'
  | 'playable_interactive'
  | 'text_banner'
  | 'sponsored_product_card';

export interface AudienceTargeting {
  locations: string[]; // Countries / Cities
  languages: string[];
  ageMin: number;
  ageMax: number;
  genders: ('all' | 'male' | 'female' | 'non_binary')[];
  interests: string[];
  behaviours: string[];
  communityMemberships: string[]; // Space IDs or names
  businessCategories: string[];
  privacyConsentMode: 'anonymized_cohorts' | 'aggregated_differential_privacy';
  estimatedAudienceSize: number;
}

export interface AdCreative {
  id: string;
  headline: string;
  primaryText: string;
  description?: string;
  callToAction: 'Learn More' | 'Shop Now' | 'Sign Up' | 'Send Message' | 'Install App' | 'Subscribe' | 'Book Now' | 'Join Space';
  mediaUrl: string;
  mediaType: AdCreativeFormat;
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5';
  destinationUrl: string;
  displayUrl?: string;
  deepLinkPath?: string;
  sponsorHandle: string;
  sponsorName: string;
  sponsorAvatar: string;
  isAiGenerated?: boolean;
}

export interface AdCampaign {
  id: string;
  advertiserId: string;
  advertiserName: string;
  advertiserAvatar: string;
  advertiserVerified: boolean;
  name: string;
  objective: CampaignObjective;
  status: CampaignStatus;
  budgetType: BudgetType;
  budgetAmountUsd: number;
  spentAmountUsd: number;
  bidStrategy: BidStrategy;
  targetBidUsd: number;
  startDate: string;
  endDate?: string;
  placements: AdPlacementType[];
  targeting: AudienceTargeting;
  creatives: AdCreative[];
  
  // Real-time performance telemetry
  metrics: {
    impressions: number;
    clicks: number;
    ctrPct: number;
    cpcUsd: number;
    cpmUsd: number;
    conversions: number;
    cvrPct: number;
    cpaUsd: number;
    conversionValueUsd: number;
    roas: number;
    reach: number;
    frequency: number;
    invalidClicksFiltered: number;
  };

  aiOptimizationEnabled: boolean;
  aiSuggestedImprovements?: string[];
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// AI CAMPAIGN ASSISTANT SCHEMAS
// ----------------------------------------------------------------------------

export interface AiGeneratedCampaignProposal {
  id: string;
  prompt: string;
  recommendedName: string;
  recommendedObjective: CampaignObjective;
  recommendedPlacements: AdPlacementType[];
  recommendedDailyBudgetUsd: number;
  recommendedBidStrategy: BidStrategy;
  recommendedTargetBidUsd: number;
  predictedRoas: number;
  predictedReachMin: number;
  predictedReachMax: number;
  
  generatedCopyOptions: {
    headline: string;
    primaryText: string;
    callToAction: AdCreative['callToAction'];
    sellingPoints: string[];
  }[];

  generatedVisualPrompts: {
    visualDescription: string;
    recommendedAspectRatio: '1:1' | '9:16' | '16:9';
    previewUrl: string;
  }[];

  suggestedAudience: AudienceTargeting;
  requiresUserApproval: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

// ----------------------------------------------------------------------------
// CREATOR AD REVENUE SHARING MODELS
// ----------------------------------------------------------------------------

export interface CreatorAdRevShareSlot {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  contentId: string;
  contentTitle: string;
  contentType: 'video' | 'podcast' | 'article' | 'livestream' | 'moment';
  monetizationEnabled: boolean;
  adBreakType: 'pre_roll' | 'mid_roll' | 'overlay_banner' | 'in_stream_pinned';
  
  // Revenue Metrics
  adImpressionsServed: number;
  grossAdRevenueUsd: number;
  creatorRevSharePct: number; // e.g. 55% or 70%
  creatorNetEarningsUsd: number;
  omniPlatformFeeUsd: number;
  payoutStatus: 'pending' | 'settled' | 'withdrawn';
  omniFinanceTransactionRef?: string;
  lastSettledAt?: string;
}

// ----------------------------------------------------------------------------
// PUBLISHER NETWORK MODELS (AdSense / AdMob equivalent)
// ----------------------------------------------------------------------------

export type PublisherAdUnitType = 'responsive_banner' | 'native_card' | 'in_feed_grid' | 'interstitial_video' | 'rewarded_ad';

export interface PublisherProperty {
  id: string;
  publisherId: string;
  publisherName: string;
  siteOrAppName: string;
  domainOrBundleId: string;
  propertyType: 'omni_website' | 'omni_app' | 'partner_external_platform';
  verificationStatus: 'verified' | 'pending_dns' | 'rejected';
  status: 'active' | 'paused';
  adUnits: {
    unitId: string;
    unitName: string;
    type: PublisherAdUnitType;
    floorCpmUsd: number;
    impressionsTotal: number;
    clicksTotal: number;
    ctrPct: number;
    revenueUsd: number;
  }[];
  totalImpressions: number;
  totalEarningsUsd: number;
  publisherSharePct: number; // e.g. 68%
  pendingPayoutUsd: number;
  settledPayoutUsd: number;
  embedSnippetCode: string;
}

// ----------------------------------------------------------------------------
// AD SAFETY, POLICY & FRAUD DETECTION
// ----------------------------------------------------------------------------

export interface AdSafetyReviewItem {
  id: string;
  adId: string;
  campaignName: string;
  advertiserName: string;
  creativeHeadline: string;
  mediaUrl: string;
  policyCheckScore: number; // 0-100 (100 = safe)
  policyStatus: 'passed' | 'flagged' | 'under_human_review' | 'rejected';
  policyViolations: string[];
  botFraudScore: number; // 0-100 (higher = suspicious)
  invalidTrafficDetected: boolean;
  reviewedBy: 'omni_ai_safety_guard' | 'human_moderator';
  reviewedAt: string;
}

export interface UserAdReport {
  id: string;
  adId: string;
  reporterUserId: string;
  reason: 'misleading' | 'inappropriate' | 'spam' | 'repetitive' | 'counterfeit' | 'other';
  comment?: string;
  status: 'pending' | 'dismissed' | 'ad_removed';
  reportedAt: string;
}

// ----------------------------------------------------------------------------
// SUPER ADMIN GOVERNANCE & SETTINGS
// ----------------------------------------------------------------------------

export interface OmniAdsAdminSettings {
  defaultCreatorRevSharePct: number; // e.g. 60
  defaultPublisherRevSharePct: number; // e.g. 68
  omniPlatformReservePct: number; // e.g. 32
  minDailyBudgetUsd: number; // e.g. 5
  minBidFloorCpcUsd: number; // e.g. 0.05
  minBidFloorCpmUsd: number; // e.g. 1.20
  allowPoliticalAds: boolean;
  requireKycForAdvertisers: boolean;
  automatedAiReviewEnabled: boolean;
  invalidTrafficFilterStrictness: 'standard' | 'high_heuristic' | 'ml_strict';
  restrictedCountries: string[];
  activePlacementSwitches: Record<AdPlacementType, boolean>;
}

// ----------------------------------------------------------------------------
// DIAGNOSTIC TEST RUNNER INTERFACES
// ----------------------------------------------------------------------------

export interface AdsDiagnosticTestResult {
  id: string;
  testName: string;
  category: 'campaign_creation' | 'budget_pacing' | 'rev_share_split' | 'analytics_telemetry' | 'fraud_prevention' | 'finance_settlement';
  status: 'passed' | 'failed' | 'running' | 'idle';
  durationMs: number;
  details: string;
  telemetryLogs: string[];
}
