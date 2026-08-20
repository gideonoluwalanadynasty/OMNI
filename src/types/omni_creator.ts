/**
 * OMNI CREATOR ECONOMY PLATFORM — TYPE DEFINITIONS & ARCHITECTURE
 * 
 * Supports:
 * - Professional Creator Studio (Planning, Creation, Editing, Scheduling, Publishing, Analytics, Monetization)
 * - 9 Content Types (Posts, Videos, Shorts, Livestreams, Podcasts, Articles, Newsletters, Courses, Digital Products)
 * - Gemini AI Creation Assistant & Multi-format Content Repurposing
 * - 9-Stream Creator Monetisation & OMNI Finance Ledger Integration (Taxes, Settlements, Escrow)
 * - Creator Marketplace & Expert Discovery
 * - Fan Subscriptions & Tiered Memberships
 * - Live Stream Commerce with Real-time Purchasing
 * - AI Personal Creator Manager
 * - Super Admin Creator Governance & 8-Point Verification Suite
 */

import { ConnectProfile } from './omni_connect';

export type OmniContentType =
  | 'post'
  | 'video'
  | 'short_video'
  | 'livestream'
  | 'podcast'
  | 'article'
  | 'newsletter'
  | 'course'
  | 'digital_product';

export type ContentPublishStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export type ContentAccessTier = 'free' | 'subscribers_only' | 'paywalled' | 'course_enrollment';

export type CrossPlatformDestination =
  | 'omni_feed'
  | 'omni_channels'
  | 'newsletter_blast'
  | 'podcast_rss'
  | 'video_hub'
  | 'youtube_sync'
  | 'x_sync'
  | 'linkedin_sync';

export interface CreatorContentItem {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  title: string;
  type: OmniContentType;
  description: string;
  contentBody?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  audioUrl?: string;
  durationSec?: number;
  readTimeMinutes?: number;
  tags: string[];
  category: string;
  status: ContentPublishStatus;
  accessTier: ContentAccessTier;
  priceUsd?: number;
  scheduledFor?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  crossPlatformDestinations: CrossPlatformDestination[];
  
  // Performance Metrics
  viewsCount: number;
  impressionsCount: number;
  watchTimeMinutes: number;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  bookmarksCount: number;
  revenueGeneratedUsd: number;
  conversionsCount: number;

  // Attached Products/Courses if applicable
  attachedProductIds?: string[];
  aiGeneratedSummary?: string;
  seoScore?: number;
}

export interface AiRepurposeOutput {
  id: string;
  originalContentId: string;
  viralScore: number; // 0 - 100
  seoScore: number; // 0 - 100
  suggestedTitles: Array<{ title: string; predictedCtr: string; tone: string }>;
  captions: {
    instagramReels: string;
    xTwitter: string;
    linkedIn: string;
    omniFeed: string;
    youtubeDescription: string;
  };
  videoScript: {
    hook: string;
    scenes: Array<{ timestamp: string; visualCue: string; voiceover: string }>;
    callToAction: string;
  };
  repurposedArticle: {
    headline: string;
    readingTime: string;
    markdownBody: string;
  };
  repurposedNewsletter: {
    subjectLine: string;
    previewSnippet: string;
    emailBody: string;
  };
  repurposedShortClips: Array<{
    title: string;
    timestampRange: string;
    suggestedMusic: string;
    aspectRatio: string;
  }>;
  translations: Array<{
    language: string;
    translatedTitle: string;
    translatedSummary: string;
  }>;
  recommendedHashtags: string[];
}

export interface CreatorSubscriptionTier {
  id: string;
  creatorId: string;
  name: string; // e.g. "Bronze Patron", "Silver Pro Member", "Gold VIP Sovereign"
  priceMonthlyUsd: number;
  priceAnnualUsd: number;
  description: string;
  badgeIcon: string;
  colorAccent: string;
  perks: string[];
  activeSubscribersCount: number;
  monthlyRevenueUsd: number;
}

export interface CreatorCourseChapter {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  resourcesUrl?: string;
  isFreePreview: boolean;
  isCompleted?: boolean;
}

export interface CreatorCourse {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'masterclass';
  priceUsd: number;
  originalPriceUsd?: number;
  enrolledStudentsCount: number;
  ratingAverage: number;
  reviewsCount: number;
  totalDurationHours: number;
  chaptersCount: number;
  chapters: CreatorCourseChapter[];
  hasCertificate: boolean;
  totalRevenueUsd: number;
}

export interface CreatorDigitalProduct {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  fileFormat: 'PDF' | 'ZIP' | 'EPUB' | 'TEMPLATE' | 'PRESET' | 'NOTION_KIT' | 'CODE_BUNDLE';
  fileSizeBytes: number;
  downloadUrl: string;
  priceUsd: number;
  salesCount: number;
  totalRevenueUsd: number;
  rating: number;
  tags: string[];
}

export interface CreatorLiveStreamCommerce {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  bannerUrl: string;
  streamUrl: string;
  status: 'live' | 'scheduled' | 'ended';
  startedAt?: string;
  scheduledFor?: string;
  currentLiveViewers: number;
  peakLiveViewers: number;
  totalLikes: number;
  pinnedProductId?: string;
  productsForSale: Array<{
    id: string;
    name: string;
    priceUsd: number;
    salePriceUsd?: number;
    imageUrl: string;
    inStockCount: number;
    salesDuringStream: number;
    buyUrl?: string;
  }>;
  chatMessages: Array<{
    id: string;
    senderName: string;
    senderAvatar: string;
    message: string;
    isSuperchat?: boolean;
    superchatAmountUsd?: number;
    timestamp: string;
  }>;
  totalStreamRevenueUsd: number;
  superchatEarningsUsd: number;
  productSalesRevenueUsd: number;
}

export interface CreatorConsultingSlot {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  durationMinutes: number; // e.g. 30, 45, 60
  priceUsd: number;
  availableDays: string[];
  bookedSlotsCount: number;
  totalRevenueUsd: number;
  rating: number;
}

export interface CreatorMarketplaceProfile {
  id: string;
  profileId: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  bannerUrl: string;
  headline: string;
  bio: string;
  niche: 'AI & Engineering' | 'Finance & Web3' | 'Design & Creative' | 'Faith & Leadership' | 'Health & Fitness' | 'Business & Marketing' | 'Music & Audio';
  verificationLevel: 'verified_pro' | 'institutional_master' | 'sovereign_creator';
  rating: number;
  reviewsCount: number;
  followersCount: number;
  subscribersCount: number;
  hourlyConsultingRateUsd: number;
  featuredCourseTitle?: string;
  featuredProductTitle?: string;
  isAvailableForHire: boolean;
  totalEarningsUsd: number;
  country: string;
  badges: string[];
}

export interface CreatorFinanceStatement {
  creatorId: string;
  currency: string;
  lifetimeGrossEarningsUsd: number;
  availableBalanceUsd: number;
  pendingEscrowUsd: number;
  nextPayoutDate: string;
  connectedWalletAddress: string;
  connectedIban: string;
  taxStatus: 'W-8BEN_VERIFIED' | 'W-9_VERIFIED' | 'VAT_EXEMPT';
  taxWithheldLifetimeUsd: number;
  platformFeeRatePercent: number; // 0% - 3%
  recentSettlements: Array<{
    id: string;
    date: string;
    description: string;
    streamType: 'subscriptions' | 'courses' | 'digital_products' | 'consulting' | 'superchats' | 'ads_share' | 'affiliate';
    grossAmountUsd: number;
    platformFeeUsd: number;
    taxWithheldUsd: number;
    netPayoutUsd: number;
    status: 'settled' | 'processing' | 'held_in_escrow';
    txHash: string;
  }>;
}

export interface CreatorRevenueStreamSummary {
  advertisingRevenueUsd: number;
  subscriptionsRevenueUsd: number;
  paidCommunitiesRevenueUsd: number;
  coursesRevenueUsd: number;
  digitalProductsRevenueUsd: number;
  affiliateIncomeUsd: number;
  tipsAndSuperchatsUsd: number;
  eventsAndTicketsUsd: number;
  consultingRevenueUsd: number;
  totalGrossRevenueUsd: number;
}

export interface CreatorAnalyticsSummary {
  totalFollowers: number;
  followerGrowthRatePercent: number;
  monthlyReach: number;
  totalImpressions: number;
  averageEngagementRate: number;
  totalWatchTimeHours: number;
  totalConversions: number;
  freeToPaidConversionRate: number;
  revenueByStream: CreatorRevenueStreamSummary;
  audienceDemographics: {
    topCountries: Array<{ country: string; percentage: number }>;
    ageDistribution: Array<{ ageGroup: string; percentage: number }>;
    deviceBreakdown: { mobile: number; desktop: number; tablet: number; tv: number };
  };
  retentionCurve: Array<{ secondPercent: number; retentionRate: number }>;
}

export interface AiCreatorManagerRecommendation {
  id: string;
  category: 'content_strategy' | 'monetization' | 'audience_growth' | 'viral_hook' | 'pricing_optimization';
  title: string;
  impactLevel: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  rationale: string;
  actionableStep: string;
  estimatedRevenueLiftUsd?: number;
  appliedStatus: 'pending' | 'applied' | 'dismissed';
}

export interface CreatorAdminGovernanceConfig {
  autoVerificationThresholdFollowers: number;
  platformCommissionRatePercent: number;
  minPayoutThresholdUsd: number;
  requireKycForMonetization: boolean;
  enableLiveStreamCommerce: boolean;
  enableAiCreationTools: boolean;
  enableTipJars: boolean;
  enablePaidCommunities: boolean;
  globalCreatorCount: number;
  totalCreatorPayoutsLifetimeUsd: number;
}
