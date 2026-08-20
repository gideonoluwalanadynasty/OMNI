// ============================================================================
// OMNI DISCOVERY, SEARCH, RECOMMENDATIONS & ANALYTICS TYPE DEFINITIONS
// Prompt 14 — OMNI Discovery Intelligence Platform
// ============================================================================

export type OmniSearchEntityType =
  | 'all'
  | 'people'
  | 'businesses'
  | 'creators'
  | 'communities'
  | 'posts'
  | 'videos'
  | 'products'
  | 'services'
  | 'courses'
  | 'events'
  | 'documents';

export type OmniSearchMode = 'keyword' | 'semantic' | 'ai_search';

export type OmniSearchSortOrder = 'relevance' | 'engagement' | 'proximity' | 'affinity' | 'recency' | 'price_low' | 'price_high' | 'rating';

export interface OmniSearchFilterState {
  query: string;
  mode: OmniSearchMode;
  entityType: OmniSearchEntityType;
  sortBy: OmniSearchSortOrder;
  verifiedOnly: boolean;
  priceFilter: 'all' | 'free' | 'paid' | 'subscription';
  locationFilter: string; // e.g., 'All', 'San Francisco', 'London', 'Tokyo', 'Nearby (<25km)'
  languageFilter: string; // e.g., 'all', 'en', 'es', 'fr', 'de', 'ja'
  minRating: number; // 0, 4.0, 4.5
  dateRange: 'all' | 'past_24h' | 'past_week' | 'past_month' | 'past_year';
  availability: 'all' | 'instant' | 'booking' | 'in_stock';
}

export interface OmniSearchResultItem {
  id: string;
  entityType: OmniSearchEntityType;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  avatarUrl?: string;
  badge?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  location?: string;
  priceDisplay?: string;
  category: string;
  tags: string[];
  engagementScore: number; // 0 - 100
  relevanceScore: number; // 0 - 100
  affinityScore: number; // 0 - 100
  timestamp: string;
  actionType: 'view' | 'connect' | 'follow' | 'join' | 'book' | 'buy' | 'rsvp' | 'enroll' | 'read';
  actionLabel: string;
  privacyVisibility: 'public' | 'circles_only' | 'followers_only' | 'private';
  metadata: Record<string, any>;
}

// ----------------------------------------------------------------------------
// Discovery & Recommendations
// ----------------------------------------------------------------------------

export type OmniDiscoveryCategory =
  | 'for_you'
  | 'trending'
  | 'people'
  | 'communities'
  | 'businesses'
  | 'creators'
  | 'products'
  | 'services'
  | 'events'
  | 'courses';

export interface OmniRecommendationSignal {
  id: string;
  signalName: string;
  weightPercent: number; // 0 - 100
  description: string;
  status: 'active' | 'paused';
}

export interface OmniRecommendationPrivacyConsent {
  enableAiPersonalization: boolean;
  allowBehavioralTracking: boolean;
  allowLocationDiscovery: boolean;
  allowRelationshipGraphMatching: boolean;
  allowPurchaseHistoryAffinity: boolean;
  dataRetentionPeriodDays: number;
  anonymizeTelemetry: boolean;
}

// ----------------------------------------------------------------------------
// Business Discovery Specifics
// ----------------------------------------------------------------------------

export interface OmniBusinessDiscoveryCard {
  id: string;
  name: string;
  type: 'local_business' | 'service' | 'store' | 'professional' | 'course_provider';
  tagline: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  location: string;
  distanceKm: number;
  isOpenNow: boolean;
  openingHours: string;
  pricingType: 'hourly' | 'fixed' | 'free' | 'quote';
  priceEstimate?: string;
  contactEmail: string;
  phone?: string;
  websiteUrl?: string;
  avatarUrl: string;
  coverUrl: string;
  badges: string[];
  servicesOffered: string[];
  popularProductsCount?: number;
  certifications?: string[];
  escrowEnabled: boolean;
}

// ----------------------------------------------------------------------------
// Analytics Tiers
// ----------------------------------------------------------------------------

export type OmniAnalyticsTier =
  | 'personal'
  | 'creator'
  | 'business'
  | 'community'
  | 'super_admin';

export interface OmniPersonalAnalyticsData {
  timeframe: '7d' | '30d' | '90d';
  engagementRate: number; // e.g. 8.4%
  totalReach: number;
  impressions: number;
  profileViews: number;
  relationshipActivity: {
    totalConnections: number;
    newConnectionsThisPeriod: number;
    interactionsLogged: number;
    networkHealthScore: number; // 0 - 100
    decayAlertsResolved: number;
  };
  contentPerformance: {
    totalPosts: number;
    topLikedPostTitle: string;
    totalShares: number;
    avgCommentsPerPost: number;
  };
  digitalWellbeing: {
    dailyAvgScreenTimeMinutes: number;
    screenTimeChangePct: number; // -12%
    focusHoursLogged: number;
    notificationsReceived: number;
    mindfulBreaksTaken: number;
    doNotDisturbActive: boolean;
  };
  dailyActivitySeries: { date: string; impressions: number; interactions: number; screenTimeMin: number }[];
}

export interface OmniCreatorAnalyticsData {
  timeframe: '7d' | '30d' | '90d';
  followersTotal: number;
  followersNetGrowth: number;
  reachTotal: number;
  reachGrowthPct: number;
  revenueTotalUsd: number;
  revenueBreakdown: {
    subscriptionsUsd: number;
    tipsAndGiftsUsd: number;
    marketplaceDropsUsd: number;
    adRevenueShareUsd: number;
  };
  contentPerformance: {
    totalMomentsViews: number;
    avgWatchRetentionPct: number;
    viralCoefficient: number;
    topPerformingVideoTitle: string;
    topPerformingPostEngagementPct: number;
  };
  audienceInsights: {
    topCountries: { country: string; percent: number }[];
    ageDemographics: { range: string; percent: number }[];
    genderBreakdown: { label: string; percent: number }[];
    peakActiveHoursUtc: string[];
  };
  growthTimeline: { date: string; followers: number; revenue: number; views: number }[];
}

export interface OmniBusinessAnalyticsData {
  timeframe: '7d' | '30d' | '90d';
  totalCustomers: number;
  newCustomersGrowthPct: number;
  leadsTotal: number;
  leadsQualifiedRatePct: number;
  grossSalesUsd: number;
  salesGrowthPct: number;
  avgOrderValueUsd: number;
  conversionFunnel: {
    impressions: number;
    profileClicks: number;
    leadInquiries: number;
    dealProposals: number;
    closedWon: number;
    overallConversionRatePct: number;
  };
  businessMessages: {
    totalConversations: number;
    avgFirstResponseTimeMin: number;
    slaCompliancePct: number;
    csatScore: number;
  };
  campaignsRoi: {
    campaignName: string;
    spendUsd: number;
    revenueUsd: number;
    roas: number;
    status: 'active' | 'completed';
  }[];
  revenueSeries: { date: string; sales: number; leads: number }[];
}

export interface OmniCommunityAnalyticsData {
  timeframe: '7d' | '30d' | '90d';
  totalMembers: number;
  memberGrowthPct: number;
  activeDailyMembers: number;
  retentionCohort30d: {
    d1RetentionPct: number;
    d7RetentionPct: number;
    d14RetentionPct: number;
    d30RetentionPct: number;
  };
  engagementMetrics: {
    messagesPerDayAvg: number;
    postsThisPeriod: number;
    reactionsTotal: number;
    audioRoomMinutes: number;
    eventAttendanceAvg: number;
  };
  topContributors: {
    profileId: string;
    name: string;
    avatarUrl: string;
    postsCount: number;
    reputationPoints: number;
    role: string;
  }[];
  moderationHealth: {
    flagsResolved: number;
    avgResolutionTimeMin: number;
    cleanHealthIndexPct: number;
  };
  growthSeries: { date: string; members: number; dailyMessages: number }[];
}

export interface OmniSuperAdminAnalyticsData {
  timeframe: '24h' | '7d' | '30d';
  platformUsers: {
    dau: number;
    mau: number;
    wau: number;
    yoyGrowthPct: number;
  };
  networkInfrastructure: {
    storageTerabytes: number;
    edgeNodesOnline: number;
    globalTrafficQps: number;
    p95LatencyMs: number;
    p99LatencyMs: number;
    uptimeSlaPct: number;
  };
  ecosystemEconomy: {
    grossMerchandiseVolumeUsd: number;
    platformTakeRateRevenueUsd: number;
    activeWalletsCount: number;
    ledgerTransactionsTotal: number;
  };
  trustAndSafety: {
    automatedScansCount: number;
    quarantinedSpamItems: number;
    avgIncidentTriageSeconds: number;
    botnetAttacksMitigated: number;
  };
  systemThroughputSeries: { time: string; qps: number; latencyMs: number; cpuLoadPct: number }[];
}

// ----------------------------------------------------------------------------
// AI Analytics Assistant
// ----------------------------------------------------------------------------

export interface OmniAiAnalyticsQuery {
  id: string;
  question: string;
  timestamp: string;
  answerMarkdown: string;
  keyInsights: string[];
  recommendedActions: {
    title: string;
    description: string;
    impactLevel: 'high' | 'medium' | 'low';
    actionPayload?: string;
  }[];
  chartType?: 'bar' | 'line' | 'funnel' | 'pie';
  chartData?: any[];
}

// ----------------------------------------------------------------------------
// Diagnostics & Test Suite
// ----------------------------------------------------------------------------

export interface OmniDiscoveryTestScenario {
  id: string;
  name: string;
  category: 'search_accuracy' | 'permission_filtering' | 'recommendation_privacy' | 'dataset_scalability' | 'analytics_calculations';
  targetStandard: string;
  status: 'passed' | 'failed' | 'pending';
  executionTimeMs: number;
  details: string;
  auditMetrics: Record<string, any>;
}
