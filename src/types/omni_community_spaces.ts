/**
 * OMNI COMMUNITY, GROUPS, CHANNELS & OMNI SPACES ARCHITECTURE TYPES
 * Social Organization, Multi-Tenant Space Ecosystem & Sovereign Networks
 */

export type OmniSpaceType =
  | 'public'
  | 'private'
  | 'enterprise'
  | 'learning'
  | 'business'
  | 'creator'
  | 'family'
  | 'organisation';

export type OmniSpaceCategory =
  | 'interests'
  | 'businesses'
  | 'schools'
  | 'churches'
  | 'families'
  | 'brands'
  | 'courses'
  | 'events'
  | 'professional_networks';

export type OmniSpaceTab =
  | 'home'
  | 'feed'
  | 'discussion'
  | 'chat'
  | 'members'
  | 'events'
  | 'resources'
  | 'courses'
  | 'store'
  | 'media'
  | 'ai_assistant'
  | 'analytics'
  | 'moderation';

export type OmniMembershipTier = 'free' | 'paid' | 'approval' | 'invitation';

export type OmniMemberRole = 'owner' | 'admin' | 'moderator' | 'vip' | 'member' | 'guest';

export interface OmniSpaceMember {
  profileId: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  role: OmniMemberRole;
  membershipTier: OmniMembershipTier;
  badges: string[];
  joinedAt: string;
  reputationPoints: number;
  isMuted?: boolean;
  warningStrikes?: number;
  lastActive: string;
  crmLeadId?: string;
}

export interface OmniSpaceDiscussionTopic {
  id: string;
  title: string;
  category: string;
  authorProfileId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  repliesCount: number;
  upvotesCount: number;
  upvotedBy: string[];
  isSolved: boolean;
  isPinned: boolean;
  tags: string[];
  content: string;
  solutionComment?: {
    id: string;
    authorName: string;
    content: string;
    markedAt: string;
  };
}

export interface OmniSpaceCourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  lessonCount: number;
  instructorName: string;
  instructorAvatar: string;
  isUnlocked: boolean;
  progressPercent: number;
  xpReward: number;
}

export interface OmniSpaceStoreItem {
  id: string;
  title: string;
  description: string;
  itemType: 'digital_download' | 'physical_merch' | 'course_access' | 'vip_pass' | 'consultation';
  priceUsd: number;
  priceOmniCoins: number;
  imageUrl: string;
  salesCount: number;
  stockRemaining?: number;
  rating: number;
}

export interface OmniSpaceResourceDoc {
  id: string;
  title: string;
  fileName: string;
  fileSizeBytes: number;
  fileType: 'pdf' | 'docx' | 'sheet' | 'zip' | 'code' | 'video';
  downloadUrl: string;
  uploaderName: string;
  uploadedAt: string;
  downloadsCount: number;
  isEnterpriseLocked: boolean;
  category: string;
}

export interface OmniSpaceMediaItem {
  id: string;
  title: string;
  type: 'video' | 'photo' | 'recording_replay';
  mediaUrl: string;
  thumbnailUrl: string;
  durationFormatted?: string;
  viewsCount: number;
  uploadedAt: string;
}

export interface OmniSpaceAiConfig {
  assistantName: string;
  avatarUrl: string;
  systemPrompt: string;
  welcomeMessageTemplate: string;
  autoModerationEnabled: boolean;
  toxicityThreshold: number; // 0.0 to 1.0
  autoWelcomeNewMembers: boolean;
  groundedResourceIds: string[];
  supportedLanguages: string[];
}

export interface OmniSpace {
  id: string;
  tenantId: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  spaceType: OmniSpaceType;
  category: OmniSpaceCategory;
  avatarUrl: string;
  bannerUrl: string;
  customDomain?: string;
  ownerProfileId: string;
  membershipTier: OmniMembershipTier;
  subscriptionPriceMonthlyUsd?: number;
  totalMembersCount: number;
  activeOnlineCount: number;
  totalRevenueUsd: number;
  donationsTotalUsd: number;
  isVerified: boolean;
  isFeatured: boolean;
  customTheme: {
    primaryColor: string;
    accentColor: string;
    darkCanvas: boolean;
  };
  rules: string[];
  tabsEnabled: OmniSpaceTab[];
  aiAssistant: OmniSpaceAiConfig;
  crmIntegration: {
    enabled: boolean;
    autoSyncMembersToLeads: boolean;
    pipelineStage: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// GROUP SYSTEM
// ============================================================================

export type OmniGroupPrivacy =
  | 'public'
  | 'private'
  | 'secret'
  | 'paid'
  | 'organisation';

export type OmniGroupType = OmniGroupPrivacy;

export type OmniGroupCategory =
  | 'family'
  | 'work_team'
  | 'study_circle'
  | 'project'
  | 'hobby'
  | 'faith_fellowship'
  | 'support_circle';

export interface OmniGroup {
  id: string;
  spaceId?: string;
  name: string;
  slug: string;
  description: string;
  privacy: OmniGroupPrivacy;
  category: OmniGroupCategory;
  avatarUrl: string;
  bannerUrl?: string;
  creatorProfileId: string;
  memberProfileIds?: string[];
  membersCount: number;
  monthlyFeeUsd?: number;
  rules: string[];
  moderatorProfileIds: string[];
  recentPostsCount: number;
  createdAt: string;
}

// ============================================================================
// CHANNEL SYSTEM (One-to-Many Broadcast)
// ============================================================================

export type OmniChannelType =
  | 'creator'
  | 'company'
  | 'news'
  | 'ministry'
  | 'educational';

export interface OmniChannelBroadcastPost {
  id: string;
  channelId: string;
  title: string;
  content: string;
  mediaUrls: string[];
  videoEmbedUrl?: string;
  publishedAt: string;
  viewsCount: number;
  reactionsCount: number;
  sharesCount: number;
  isPinned: boolean;
  audioVoiceNoteUrl?: string;
}

export interface OmniChannel {
  id: string;
  name: string;
  handle: string; // e.g. @omni_official_news
  description: string;
  channelType: OmniChannelType;
  avatarUrl: string;
  bannerUrl: string;
  ownerProfileId: string;
  ownerName: string;
  isVerified: boolean;
  subscribersCount: number;
  broadcastsCount: number;
  posts: OmniChannelBroadcastPost[];
  monthlyGrowthRate: number; // e.g. +18.4%
  analytics: {
    impressions7d: number;
    engagementRate: number;
    shares7d: number;
  };
  createdAt: string;
}

// ============================================================================
// COMMUNITY MODERATION & REPORTS
// ============================================================================

export interface OmniCommunityReport {
  id: string;
  spaceId: string;
  spaceName: string;
  targetType: 'post' | 'comment' | 'member' | 'discussion';
  targetId: string;
  reporterProfileId: string;
  reporterName: string;
  reason: 'spam' | 'harassment' | 'hate_speech' | 'copyright' | 'misinformation' | 'inappropriate_media';
  status: 'pending' | 'resolved_dismissed' | 'resolved_removed' | 'resolved_banned';
  timestamp: string;
  aiToxicityScore: number;
  notes?: string;
}

// ============================================================================
// COMMUNITY ANALYTICS METRICS
// ============================================================================

export interface OmniCommunityAnalytics {
  spaceId: string;
  spaceName: string;
  totalMembers: number;
  memberGrowth30d: number; // percentage e.g. 14.5
  activeDailyMembers: number;
  engagementScore: number; // 0 to 100
  totalPostsThisMonth: number;
  totalDiscussionsSolved: number;
  retentionRatePercent: number;
  mrrUsd: number;
  grossDonationsUsd: number;
  topActiveMembers: {
    profileId: string;
    displayName: string;
    avatarUrl: string;
    contributions: number;
  }[];
}
