export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'x'
  | 'threads'
  | 'pinterest'
  | 'snapchat'
  | 'whatsapp'
  | 'telegram';

export type SocialHubTabType =
  | 'dashboard'
  | 'accounts'
  | 'composer'
  | 'calendar'
  | 'inbox'
  | 'analytics'
  | 'competitors'
  | 'agents';

export type SocialAccountStatus =
  | 'connected'
  | 'token_expiring'
  | 'reauth_required'
  | 'rate_limited'
  | 'syncing'
  | 'disconnected';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  displayName: string;
  handle: string;
  avatarUrl: string;
  verified: boolean;
  status: SocialAccountStatus;
  followerCount: number;
  followingCount?: number;
  postsCount: number;
  engagementRate: number; // e.g. 4.8 (%)
  brandWorkspace: string; // e.g. "Acme Global", "Sovereign Labs", "Personal Brand"
  officialApiVersion: string; // e.g. "Graph API v20.0", "Twitter API v2"
  scopes: string[];
  tokenExpiresAt: string;
  lastSyncedAt: string;
  apiRateLimitRemaining: number;
  apiRateLimitTotal: number;
  complianceNotes: string;
}

export type PostStatus = 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'needs_approval';

export type PostMediaType = 'image' | 'video' | 'carousel' | 'text' | 'reel' | 'short' | 'story' | 'broadcast';

export interface SocialPostPlatformCustomization {
  content?: string;
  hashtags?: string[];
  mediaUrls?: string[];
  linkUrl?: string;
  firstComment?: string;
  reelsAudioTrack?: string;
  pinBoardId?: string;
  telegramParseMode?: 'MarkdownV2' | 'HTML';
}

export interface SocialPost {
  id: string;
  title?: string;
  primaryContent: string;
  platformCustomizations: Partial<Record<SocialPlatform, SocialPostPlatformCustomization>>;
  targetAccountIds: string[];
  targetPlatforms: SocialPlatform[];
  mediaType: PostMediaType;
  mediaUrls: string[];
  thumbnailUrl?: string;
  status: PostStatus;
  scheduledFor: string; // ISO string
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  brandWorkspace: string;
  campaignTag?: string;
  isAiGenerated: boolean;
  aiPromptUsed?: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
  performance?: {
    impressions: number;
    reach: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    saves: number;
    videoViews?: number;
    engagementRate: number;
  };
}

export type CommentSentiment = 'positive' | 'neutral' | 'negative' | 'question' | 'spam';
export type CommentStatus = 'unread' | 'read' | 'replied' | 'hidden' | 'flagged' | 'archived';

export interface SocialCommentReply {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  isAiGenerated?: boolean;
  publishedViaApi: boolean;
}

export interface SocialComment {
  id: string;
  postId: string;
  postTitleOrSnippet: string;
  platform: SocialPlatform;
  accountId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likesCount: number;
  sentiment: CommentSentiment;
  sentimentScore: number; // 0 to 1
  status: CommentStatus;
  isPriority: boolean;
  replies: SocialCommentReply[];
  suggestedAiReply?: string;
  platformUrl?: string;
}

export interface SocialPlatformMetrics {
  platform: SocialPlatform;
  totalFollowers: number;
  followerGrowthRate7d: number;
  totalImpressions30d: number;
  totalEngagements30d: number;
  avgEngagementRate: number;
  postsPublished30d: number;
  topPostId?: string;
  sharesCount: number;
  clicksCount: number;
}

export interface SocialCompetitor {
  id: string;
  name: string;
  handle: string;
  platform: SocialPlatform;
  avatarUrl: string;
  followerCount: number;
  followerGrowthRate30d: number;
  postingFrequencyWeekly: number;
  avgEngagementRate: number;
  topHashtags: string[];
  recentViralPost: {
    content: string;
    publishedAt: string;
    likes: number;
    comments: number;
    shares: number;
    estimatedReach: number;
    contentType: 'reel' | 'carousel' | 'short' | 'thread' | 'post';
  };
  aiTeardownAnalysis: {
    contentStrategySummary: string;
    identifiedWeakness: string;
    counterStrategyOpportunity: string;
    suggestedHookIdeas: string[];
  };
}

export interface SocialAiAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  badge: string;
  description: string;
  status: 'active' | 'idle' | 'executing' | 'scheduled';
  autonomousPermissions: string[];
  actionsExecutedCount: number;
  lastActiveAt: string;
  recentActivity: {
    id: string;
    timestamp: string;
    action: string;
    impact: string;
    platform?: SocialPlatform;
  }[];
}

export interface SocialCaptionGenerateParams {
  topic: string;
  platform: SocialPlatform;
  tone: 'professional' | 'viral_punchy' | 'storytelling' | 'educational' | 'provocative' | 'casual';
  targetAudience: string;
  callToAction: 'link_in_bio' | 'comment_below' | 'share_repost' | 'save_for_later' | 'visit_website';
  includeHashtags: boolean;
  includeEmojis: boolean;
  brandVoice?: string;
}

export interface GeneratedCaptionVariation {
  id: string;
  hook: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  fullCaption: string;
  viralPredictionScore: number; // 0-100
  characterCount: number;
  platformMaxChars: number;
  suggestedOptimalTime: string;
  suggestedMediaDescription: string;
}
