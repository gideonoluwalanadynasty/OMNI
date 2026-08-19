/**
 * OMNI SOCIAL CONTENT ENGINE — TYPE DEFINITIONS & SCHEMAS
 * Powers: Feed, Moments, Status, Posts, Media Sharing, AI Creation Tools,
 * Cloud Storage, Recommendation Algorithm, and Moderation Engine.
 */

export type OmniPostFormat =
  | 'text'
  | 'image'
  | 'carousel'
  | 'video'
  | 'audio'
  | 'document'
  | 'link'
  | 'poll'
  | 'event'
  | 'product'
  | 'livestream';

export type OmniReactionType =
  | 'like'
  | 'love'
  | 'insightful'
  | 'celebrate'
  | 'support'
  | 'fire'
  | 'sovereign';

export type OmniAudienceScope =
  | 'public'
  | 'followers'
  | 'circles'
  | 'close_friends'
  | 'subscribers'
  | 'private';

export interface OmniMediaAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnailUrl?: string;
  name: string;
  caption?: string;
  sizeBytes: number;
  mimeType: string;
  durationSec?: number;
  aspectRatio?: '1:1' | '4:5' | '16:9' | '9:16';
  cloudStorageKey: string;
  cdnUrl: string;
  resolutionOptions?: string[]; // ['4K', '1080p', '720p', '480p']
  processingStatus: 'ready' | 'transcoding' | 'optimizing';
}

export interface OmniPollOption {
  id: string;
  text: string;
  votesCount: number;
  voterProfileIds: string[];
}

export interface OmniPoll {
  id: string;
  question: string;
  options: OmniPollOption[];
  totalVotes: number;
  expiresAt: string;
  allowsMultiple: boolean;
  userVotedOptionIds: string[];
}

export interface OmniEventData {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  rsvpCount: number;
  isAttending: boolean;
  coverUrl?: string;
  streamUrl?: string;
  category: string;
}

export interface OmniProductTag {
  id: string;
  name: string;
  priceUsd: number;
  originalPriceUsd?: number;
  currency: string;
  imageUrl: string;
  inStock: boolean;
  checkoutUrl: string;
  commissionRatePercent?: number;
}

export interface OmniLiveStreamData {
  id: string;
  title: string;
  status: 'scheduled' | 'live' | 'ended';
  viewersCount: number;
  playbackUrl?: string;
  scheduledAt: string;
  recordingAvailable: boolean;
}

export interface OmniLinkPreview {
  url: string;
  title: string;
  description: string;
  domain: string;
  imageUrl?: string;
}

export interface OmniComment {
  id: string;
  postId: string;
  authorProfileId: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  text: string;
  createdAt: string;
  likesCount: number;
  userLiked: boolean;
  parentCommentId?: string;
  replies?: OmniComment[];
  attachments?: OmniMediaAttachment[];
}

export interface OmniSocialPost {
  id: string;
  tenantId: string;
  authorProfileId: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  authorType?: 'personal' | 'creator' | 'business' | 'community' | 'organization';
  format: OmniPostFormat;
  title?: string;
  contentText: string;
  media: OmniMediaAttachment[];
  poll?: OmniPoll;
  event?: OmniEventData;
  product?: OmniProductTag;
  liveStream?: OmniLiveStreamData;
  linkPreview?: OmniLinkPreview;
  hashtags: string[];
  mentions: string[];
  reactions: Record<OmniReactionType, number>;
  userReaction?: OmniReactionType;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  viewsCount: number;
  isSaved: boolean;
  isShared: boolean;
  audience: OmniAudienceScope;
  circleIds?: string[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  moderationStatus: 'approved' | 'pending' | 'flagged' | 'quarantined';
  aiSummary?: string;
  language: string;
  translatedText?: Record<string, string>; // { 'es': '...', 'fr': '...', 'yo': '...' }
  monetization?: {
    isPaywalled: boolean;
    priceUsd?: number;
    allowTips: boolean;
    totalTipsEarnedUsd: number;
    adRevenueEarnedUsd: number;
  };
  comments?: OmniComment[];
  score?: number; // Internal ranking score calculated by algorithm
}

export interface OmniMoment {
  id: string;
  tenantId: string;
  authorProfileId: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  durationSec: number;
  musicTrack?: {
    id: string;
    title: string;
    artist: string;
    durationSec: number;
    albumCover: string;
  };
  filterName?: string; // e.g. 'Sovereign Glow', 'Cyberpunk Gold', 'Natural Luxe', 'Retro Noir'
  textOverlays?: Array<{
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    style: string;
  }>;
  aiEnhanced: boolean;
  collaborativeWith?: Array<{
    profileId: string;
    handle: string;
    name: string;
    avatar: string;
  }>;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  createdAt: string;
  aspectRatio: '9:16';
}

export interface OmniStatusItem {
  id: string;
  tenantId: string;
  authorProfileId: string;
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'link' | 'product';
  contentUrl?: string;
  text?: string;
  backgroundTheme?: string; // Tailwind gradient or hex
  audioDurationSec?: number;
  linkData?: {
    title: string;
    url: string;
    previewImg?: string;
  };
  productData?: {
    id: string;
    name: string;
    priceUsd: number;
    img: string;
  };
  createdAt: string;
  expiresAt: string;
  durationHours: number;
  audience: OmniAudienceScope;
  allowedCircleIds?: string[];
  views: Array<{
    profileId: string;
    handle: string;
    name: string;
    avatar: string;
    viewedAt: string;
  }>;
  repliesCount: number;
  reactions: Array<{
    profileId: string;
    emoji: string;
    reactedAt: string;
  }>;
}

export interface FeedAlgorithmConfig {
  relationshipWeight: number; // 0 - 100
  interestWeight: number; // 0 - 100
  engagementVelocityWeight: number; // 0 - 100
  freshnessDecayWeight: number; // 0 - 100
  communityBoostWeight: number; // 0 - 100
  businessRelevanceWeight: number; // 0 - 100
  currentMode:
    | 'algorithmic'
    | 'chronological'
    | 'relationships_circles'
    | 'following'
    | 'media_only'
    | 'communities';
  mutedTopics: string[];
  mutedUsers: string[];
  hiddenPostIds: string[];
}

export interface ContentModerationReport {
  id: string;
  targetType: 'post' | 'moment' | 'status' | 'comment';
  targetId: string;
  authorProfileId: string;
  authorHandle: string;
  reportedAuthorHandle?: string;
  reporterHandle?: string;
  snippet: string;
  flaggedReason:
    | 'spam'
    | 'abuse'
    | 'harassment'
    | 'unsafe_nsfw'
    | 'copyright_ip'
    | 'hate_speech'
    | 'misinformation';
  reason?: string;
  aiConfidenceScore: number; // 0.00 - 1.00
  toxicityScore: number; // 0.00 - 1.00
  humanReviewStatus: 'pending' | 'approved' | 'rejected' | 'hidden' | 'warned' | 'banned';
  status?: 'pending' | 'actioned' | 'dismissed' | string;
  actionTaken?: string;
  reviewerNotes?: string;
  createdAt?: string;
  auditedAt: string;
  auditHash: string;
}

export interface ContentScanResult {
  status: 'approved' | 'pending' | 'flagged' | 'quarantined';
  isSafe: boolean;
  safetyScore: number;
  toxicityScore: number;
  confidenceScore: number;
  flaggedReason?:
    | 'spam'
    | 'abuse'
    | 'harassment'
    | 'unsafe_nsfw'
    | 'copyright_ip'
    | 'hate_speech'
    | 'misinformation';
  reason: string;
  actionRecommendation: string;
  categories: {
    toxicity: number;
    harassment: number;
    hateSpeech: number;
    spam: number;
  };
}

export type OmniModerationReport = ContentModerationReport;
export type CreatorAnalytics = CreatorAnalyticsData & {
  monthlyReach: number;
  engagementVelocity: number;
  followersCount: number;
  followerGrowthRate: number;
  totalSovereignEarningsUsd: number;
  topPosts: Array<{
    id: string;
    title: string;
    impressions: number;
    likes: number;
    shares: number;
    revenueUsd: number;
  }>;
  monthlyRecurringRevenueUsd: number;
  tipJarEarningsUsd: number;
  subscribersCount: number;
};

export interface CreatorAnalyticsData {
  totalImpressions: number;
  totalReach: number;
  engagementRatePercent: number;
  followerGrowthWeekly: number;
  topPerformingPosts: Array<{
    id: string;
    title: string;
    reach: number;
    engagement: number;
    revenueUsd: number;
    format: OmniPostFormat;
  }>;
  formatBreakdown: {
    feed: number;
    moments: number;
    status: number;
  };
  estimatedRevenueUsd: number;
  adRevenueShareUsd: number;
  tipsRevenueUsd: number;
  subscriptionsRevenueUsd: number;
}

export interface CloudStorageQuota {
  totalAllocatedBytes: number; // e.g. 50 GB
  totalQuotaBytes?: number;
  fileCount?: number;
  usedBytes: number;
  imageStorageBytes: number;
  videoStorageBytes: number;
  audioStorageBytes: number;
  documentStorageBytes: number;
  cdnCacheHitRatePercent: number;
  edgeNodesActive: number;
}

export interface OmniMediaFileRecord {
  id: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio' | 'document';
  sizeBytes: number;
  uploadedAt: string;
  cloudBucket: string;
  cdnUrl: string;
  checksum: string;
  associatedPostId?: string;
}
