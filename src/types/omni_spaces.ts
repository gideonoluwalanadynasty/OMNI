/**
 * OMNI SPACES, COMMUNITIES, GROUPS & CHANNELS — TYPES & DOMAIN MODELS
 * Part of OMNI Connect Social & Organization Layer
 */

export type OmniSpaceType =
  | 'public_space'
  | 'private_space'
  | 'enterprise_space'
  | 'learning_space'
  | 'business_space'
  | 'creator_space'
  | 'family_space'
  | 'organisation_space';

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

export type OmniSpaceModuleKey =
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
  | 'ai_assistant';

export type OmniMembershipType =
  | 'free'
  | 'paid_subscription'
  | 'paid_onetime'
  | 'approval_required'
  | 'invite_only';

export type OmniMemberRole =
  | 'owner'
  | 'admin'
  | 'moderator'
  | 'vip'
  | 'instructor'
  | 'member'
  | 'student'
  | 'guest';

export interface OmniSpaceMember {
  id: string;
  profileId: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  role: OmniMemberRole;
  membershipType: OmniMembershipType;
  joinedAt: string;
  status: 'active' | 'pending_approval' | 'muted' | 'restricted' | 'banned';
  reputationPoints: number;
  badges: string[];
  subscriptionDetails?: {
    tierName: string;
    amountUsd: number;
    billingCycle: 'monthly' | 'annual' | 'lifetime';
    renewsAt: string;
    financeTxId: string;
  };
}

export interface OmniDiscussionTopic {
  id: string;
  spaceId: string;
  authorProfileId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: OmniMemberRole;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotesCount: number;
  upvotedBy: string[];
  repliesCount: number;
  isPinned: boolean;
  isSolved: boolean;
  acceptedReplyId?: string;
  replies: OmniDiscussionReply[];
  createdAt: string;
  updatedAt: string;
}

export interface OmniDiscussionReply {
  id: string;
  topicId: string;
  authorProfileId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: OmniMemberRole;
  content: string;
  upvotesCount: number;
  upvotedBy: string[];
  isAcceptedSolution: boolean;
  createdAt: string;
}

export interface OmniSpaceCourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  contentSummary: string;
  quizQuestionCount: number;
  isCompleted?: boolean;
}

export interface OmniSpaceCourse {
  id: string;
  spaceId: string;
  title: string;
  slug: string;
  description: string;
  instructorName: string;
  instructorAvatar: string;
  thumbnailUrl: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  enrollmentCount: number;
  rating: number;
  isFree: boolean;
  priceUsd?: number;
  curriculumModules: OmniSpaceCourseModule[];
  certificateGranted: boolean;
}

export interface OmniSpaceStoreItem {
  id: string;
  spaceId: string;
  name: string;
  description: string;
  imageUrl: string;
  itemType: 'digital_download' | 'merchandise' | 'course_pass' | 'vip_membership' | 'event_ticket' | 'donation_pledge';
  priceUsd: number;
  currency: string;
  stockCount?: number;
  salesCount: number;
  rating: number;
  isAvailable: boolean;
}

export interface OmniSpaceDocument {
  id: string;
  spaceId: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'docx' | 'sheet' | 'slide' | 'code' | 'archive';
  fileSizeBytes: number;
  downloadUrl: string;
  uploaderName: string;
  accessRoleRequired: OmniMemberRole;
  downloadCount: number;
  updatedAt: string;
}

export interface OmniSpaceEvent {
  id: string;
  spaceId: string;
  title: string;
  description: string;
  bannerUrl: string;
  format: 'online_live' | 'in_person' | 'hybrid';
  hostName: string;
  hostAvatar: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  isTicketed: boolean;
  ticketPriceUsd?: number;
  rsvpCount: number;
  maxAttendees?: number;
  isLiveNow: boolean;
  meetingRoomId?: string;
}

export interface OmniSpaceMediaItem {
  id: string;
  spaceId: string;
  title: string;
  mediaType: 'video_stream' | 'podcast_audio' | 'photo_gallery' | 'presentation';
  mediaUrl: string;
  thumbnailUrl: string;
  durationSeconds?: number;
  viewsCount: number;
  likesCount: number;
  publishedAt: string;
}

export interface OmniSpaceAiConfig {
  assistantName: string;
  avatarUrl: string;
  personalityPrompt: string;
  welcomeMessageTemplate: string;
  autoModerationEnabled: boolean;
  autoWelcomeEnabled: boolean;
  qaGroundingDocsCount: number;
  supportedLanguages: string[];
}

export interface OmniSpace {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  spaceType: OmniSpaceType;
  category: OmniSpaceCategory;
  avatarUrl: string;
  bannerUrl: string;
  ownerProfileId: string;
  ownerName: string;
  isVerified: boolean;
  isFeatured: boolean;
  membershipType: OmniMembershipType;
  membershipPriceUsd?: number;
  billingPeriod?: 'monthly' | 'annual' | 'one_time';
  donationGoalUsd?: number;
  donationRaisedUsd?: number;
  membersCount: number;
  onlineCount: number;
  enabledModules: OmniSpaceModuleKey[];
  aiAssistantConfig: OmniSpaceAiConfig;
  customDomain?: string;
  rules: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  crmConnected?: boolean;
  crmLeadStage?: string;
}

// ============================================================================
// GROUP SYSTEM TYPES
// ============================================================================

export type OmniGroupType =
  | 'public_group'
  | 'private_group'
  | 'secret_group'
  | 'paid_group'
  | 'organisation_group';

export interface OmniGroupPost {
  id: string;
  groupId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  content: string;
  mediaUrls?: string[];
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
    totalVotes: number;
    hasVoted?: boolean;
  };
  attachments?: { fileName: string; fileSize: string; fileType: string }[];
  reactionsCount: number;
  commentsCount: number;
  isAnnouncement: boolean;
  isPinned: boolean;
  createdAt: string;
}

export interface OmniGroup {
  id: string;
  spaceId?: string;
  tenantId: string;
  name: string;
  slug: string;
  description: string;
  avatarUrl: string;
  bannerUrl?: string;
  groupType: OmniGroupType;
  category: 'family' | 'work_team' | 'study_circle' | 'project' | 'hobby' | 'faith_fellowship';
  creatorProfileId: string;
  creatorName: string;
  membersCount: number;
  moderatorsCount: number;
  membershipFeeUsd?: number;
  isPaid: boolean;
  rules: string[];
  postsCount: number;
  filesCount: number;
  pollsCount: number;
  activeEventsCount: number;
  createdAt: string;
}

// ============================================================================
// CHANNEL SYSTEM (OMNI CHANNELS)
// ============================================================================

export type OmniChannelType =
  | 'creator_channel'
  | 'company_channel'
  | 'news_channel'
  | 'ministry_channel'
  | 'educational_channel';

export interface OmniChannelBroadcast {
  id: string;
  channelId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  mediaType: 'announcement' | 'video' | 'podcast' | 'press_release' | 'livestream_push';
  mediaUrl?: string;
  thumbnailUrl?: string;
  viewsCount: number;
  likesCount: number;
  sharesCount: number;
  deliveredCount: number;
  openRatePercent: number;
  isLiveStream: boolean;
  publishedAt: string;
}

export interface OmniChannel {
  id: string;
  tenantId: string;
  spaceId?: string;
  name: string;
  handle: string;
  tagline: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  channelType: OmniChannelType;
  ownerProfileId: string;
  ownerName: string;
  isVerified: boolean;
  subscribersCount: number;
  postsCount: number;
  videosCount: number;
  broadcastsCount: number;
  avgEngagementRate: number;
  allowSubscriberComments: boolean;
  broadcasts: OmniChannelBroadcast[];
  createdAt: string;
}

// ============================================================================
// MODERATION & SAFETY TYPES
// ============================================================================

export type ModerationViolationType =
  | 'hate_speech'
  | 'harassment'
  | 'spam_scam'
  | 'misinformation'
  | 'copyright_violation'
  | 'impersonation'
  | 'nsfw_content'
  | 'financial_fraud';

export type ModerationActionType =
  | 'warning'
  | 'content_removed'
  | 'user_muted_24h'
  | 'user_muted_7d'
  | 'user_banned'
  | 'dismissed_clean';

export interface OmniCommunityReport {
  id: string;
  spaceId?: string;
  groupId?: string;
  channelId?: string;
  targetType: 'post' | 'comment' | 'chat_message' | 'member';
  targetId: string;
  targetContentSnippet: string;
  reporterProfileId: string;
  reporterName: string;
  reportedProfileId: string;
  reportedProfileName: string;
  violation: ModerationViolationType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending_review' | 'resolved' | 'dismissed';
  aiRiskScore: number; // 0-100
  aiSuggestedAction: ModerationActionType;
  resolvedBy?: string;
  resolutionAction?: ModerationActionType;
  resolutionNotes?: string;
  createdAt: string;
}

// ============================================================================
// COMMUNITY ANALYTICS TYPES
// ============================================================================

export interface OmniCommunityAnalytics {
  totalMembers: number;
  activeDau: number;
  activeMau: number;
  growthRatePercent: number;
  engagementRatePercent: number;
  postsPublishedThisMonth: number;
  chatMessagesSentThisMonth: number;
  retentionCohort30d: number;
  retentionCohort90d: number;
  totalRevenueUsd: number;
  mrrUsd: number;
  topActiveSpaces: { name: string; members: number; engagement: number }[];
  membershipBreakdown: { type: string; count: number; percentage: number }[];
  monthlyGrowthTrend: { month: string; members: number; revenue: number; posts: number }[];
}

// ============================================================================
// SUPER ADMIN GOVERNANCE TYPES
// ============================================================================

export interface OmniCommunityGovernancePolicy {
  allowedSpaceTypes: OmniSpaceType[];
  globalMaxMembersPerSpace: number;
  platformMonetizationFeePercent: number;
  allowDonationsByDefault: boolean;
  automatedAiSafetyThreshold: number; // 0-100
  requireIdentityVerificationForPaidSpaces: boolean;
  crmIntegrationEnabled: boolean;
  sovereignCustomDomainsAllowed: boolean;
}
