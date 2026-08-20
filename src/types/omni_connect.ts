/**
 * OMNI CONNECT NATIVE APPLICATION — COMPREHENSIVE DATA & DOMAIN TYPES
 * Application ID: connect
 * Primary Domain: connect.omni.com
 * Path: omni.com/connect
 * 
 * Reuses: OMNI Passport, Identity, Organizations, Permissions, Finance OS, AI, Ads, Marketplace, Cloud, Notifications, Analytics, White Label, Developer Platform
 */

// ============================================================================
// 1. OMNI CONNECT CAPABILITIES & FEATURE SWITCHBOARD
// ============================================================================

export type ConnectCapabilityKey =
  | 'connect.identity'
  | 'connect.social'
  | 'connect.messaging'
  | 'connect.communities'
  | 'connect.groups'
  | 'connect.channels'
  | 'connect.content'
  | 'connect.media'
  | 'connect.business'
  | 'connect.crm'
  | 'connect.commerce'
  | 'connect.creator'
  | 'connect.events'
  | 'connect.meetings'
  | 'connect.ai'
  | 'connect.ads'
  | 'connect.analytics'
  | 'connect.api'
  | 'connect.whitelabel';

export type ConnectModuleId =
  | 'messaging'
  | 'social_feed'
  | 'communities'
  | 'channels'
  | 'groups'
  | 'commerce'
  | 'creator_studio'
  | 'crm'
  | 'events'
  | 'meetings'
  | 'ai_assistant'
  | 'ads'
  | 'white_label'
  | 'moderation'
  | 'media_engine';

export interface ConnectFeatureModule {
  id: ConnectModuleId;
  name: string;
  description: string;
  capabilityKey: ConnectCapabilityKey;
  status: 'ACTIVE' | 'INACTIVE' | 'RESTRICTED';
  isInstalled: boolean;
  isOperational: boolean;
  enabledForCountries: string[]; // ['*'] for all, or specific ['US', 'EU', 'GB', 'NG', 'BR', etc.]
  enabledForTenantTypes: string[]; // ['personal', 'business', 'school', 'church', 'enterprise', 'government']
  requiredSubscriptionTier: 'free' | 'growth' | 'enterprise' | 'custom';
  rateLimitPerMinute: number;
  config: Record<string, any>;
  lastUpdated: string;
}

// ============================================================================
// 2. DATABASE FOUNDATION TABLES (20 PRIMARY POSTGRESQL TABLES)
// ============================================================================

/** Table 1: connect_profiles */
export type ConnectProfileType = 'personal' | 'creator' | 'business' | 'community' | 'organization' | 'enterprise';

export interface ConnectProfile {
  id: string; // UUID (Primary Key)
  tenantId: string; // Foreign Key to OMNI Organizations (RLS Partition)
  userId: string; // Foreign Key to OMNI Passport User
  username: string; // Unique slug e.g. @gideon or @dynasty_corp
  displayName: string;
  headline?: string; // e.g. "Fintech Architect & Sovereign Systems Lead"
  bio: string;
  avatarUrl: string;
  coverImageUrl?: string;
  profileType: ConnectProfileType;
  verificationBadge: 'none' | 'verified_human' | 'verified_creator' | 'verified_business' | 'verified_official';
  reputationScore: number; // 0 - 1000
  countryCode: string;
  language: string;
  isPrivate: boolean;
  allowDirectMessages: 'everyone' | 'followers' | 'verified_only' | 'none';
  customLinks: { label: string; url: string; icon?: string }[];
  stats: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
    communitiesCount: number;
    reputationPoints: number;
  };
  createdAt: string;
  updatedAt: string;
}

/** Table 2: connect_usernames */
export interface ConnectUsernameRecord {
  id: string;
  username: string;
  profileId: string;
  tenantId: string;
  assignedAt: string;
  isPrimary: boolean;
  status: 'active' | 'reserved' | 'suspended' | 'premium';
}

/** Table 3: connect_pages */
export type ConnectPageCategory =
  | 'company'
  | 'brand'
  | 'ngo_nonprofit'
  | 'church_faith'
  | 'school_university'
  | 'government'
  | 'community_association'
  | 'retail_store'
  | 'media_publishing';

export interface ConnectPage {
  id: string;
  tenantId: string;
  ownerProfileId: string;
  pageName: string;
  handle: string;
  category: ConnectPageCategory;
  description: string;
  avatarUrl: string;
  bannerUrl?: string;
  websiteUrl?: string;
  officialEmail?: string;
  officialPhone?: string;
  physicalAddress?: string;
  isVerified: boolean;
  membersCount: number;
  followersCount: number;
  administrators: {
    profileId: string;
    role: 'page_admin' | 'editor' | 'moderator' | 'analyst';
  }[];
  createdAt: string;
  updatedAt: string;
}

/** Table 4: connect_relationships */
export type RelationshipType = 'friend' | 'colleague' | 'family' | 'partner' | 'blocked' | 'restricted';

export interface ConnectRelationship {
  id: string;
  tenantId: string;
  initiatorProfileId: string;
  targetProfileId: string;
  type: RelationshipType;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Table 5: connect_followers */
export interface ConnectFollower {
  id: string;
  tenantId: string;
  followerProfileId: string;
  targetProfileId: string;
  targetType: 'profile' | 'page' | 'community' | 'channel';
  notifyAllPosts: boolean;
  createdAt: string;
}

/** Table 6: connect_posts */
export type PostVisibility = 'public' | 'followers_only' | 'community_only' | 'group_only' | 'private';
export type PostContentType = 'text' | 'article' | 'image_gallery' | 'video' | 'poll' | 'audio_voice' | 'product_card' | 'event_invite';

export interface ConnectPost {
  id: string;
  tenantId: string;
  authorProfileId: string;
  authorDisplayName: string;
  authorHandle: string;
  authorAvatarUrl: string;
  authorVerificationBadge: string;
  pageId?: string;
  communityId?: string;
  channelId?: string;
  groupId?: string;
  contentType: PostContentType;
  content: string;
  title?: string;
  mediaUrls: string[];
  thumbnailUrl?: string;
  visibility: PostVisibility;
  tags: string[];
  pollOptions?: { id: string; text: string; votesCount: number; voterProfileIds: string[] }[];
  productCard?: {
    productId: string;
    productName: string;
    price: number;
    currency: string;
    imageUrl: string;
    checkoutUrl: string;
  };
  eventInvite?: {
    eventId: string;
    eventTitle: string;
    startDateTime: string;
    locationType: 'online' | 'physical';
  };
  reactionsSummary: {
    like: number;
    love: number;
    celebrate: number;
    insightful: number;
    support: number;
    amen: number;
  };
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  isPinned: boolean;
  isAiEnhanced: boolean;
  isModerated: boolean;
  isPaywalled: boolean;
  paywallPriceUsd?: number;
  createdAt: string;
  updatedAt: string;
}

/** Table 7: connect_comments */
export interface ConnectComment {
  id: string;
  tenantId: string;
  postId: string;
  parentCommentId?: string; // Threaded comment support
  authorProfileId: string;
  authorDisplayName: string;
  authorHandle: string;
  authorAvatarUrl: string;
  authorVerificationBadge: string;
  content: string;
  mediaUrl?: string;
  reactionsCount: number;
  repliesCount: number;
  isAiModerated: boolean;
  createdAt: string;
}

/** Table 8: connect_reactions */
export type ReactionKind = 'like' | 'love' | 'celebrate' | 'insightful' | 'support' | 'amen' | 'fire';

export interface ConnectReaction {
  id: string;
  tenantId: string;
  targetId: string;
  targetType: 'post' | 'comment' | 'message';
  profileId: string;
  reaction: ReactionKind;
  createdAt: string;
}

/** Table 9: connect_media */
export interface ConnectMedia {
  id: string;
  tenantId: string;
  uploaderProfileId: string;
  mediaType: 'image' | 'video' | 'audio' | 'document' | 'voice_note';
  mimeType: string;
  fileSizeBytes: number;
  storageUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  dimensions?: { width: number; height: number };
  isEncrypted: boolean;
  scanStatus: 'clean' | 'processing' | 'flagged';
  createdAt: string;
}

/** Table 10: connect_messages */
export type MessageDeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export type MessageKind = 'text' | 'voice_note' | 'media_attachment' | 'omni_pay_request' | 'meeting_invite' | 'system_alert';

export interface ConnectMessage {
  id: string;
  tenantId: string;
  conversationId: string;
  senderProfileId: string;
  senderName: string;
  senderAvatar: string;
  messageKind: MessageKind;
  content: string;
  mediaUrl?: string;
  voiceDurationSec?: number;
  attachmentMeta?: {
    fileName: string;
    fileSizeFormatted: string;
    fileType: string;
  };
  payRequest?: {
    amount: number;
    currency: string;
    description: string;
    status: 'pending' | 'settled' | 'declined';
    transactionId?: string;
  };
  meetingInvite?: {
    roomId: string;
    roomTitle: string;
    scheduledFor: string;
  };
  reactions: { reaction: string; profileId: string; profileName: string }[];
  isEndToEndEncrypted: boolean;
  deliveryStatus: MessageDeliveryStatus;
  sentAt: string;
  readAt?: string;
}

/** Table 11: connect_conversations */
export type ConversationType = 'direct' | 'group' | 'channel' | 'crm_inquiry' | 'ai_chat';

export interface ConnectConversation {
  id: string;
  tenantId: string;
  type: ConversationType;
  title: string;
  avatarUrl?: string;
  isEncrypted: boolean;
  participantProfileIds: string[];
  participants: {
    profileId: string;
    name: string;
    avatar: string;
    role: 'owner' | 'admin' | 'member';
    lastReadMessageId?: string;
    isTyping?: boolean;
    onlineStatus?: 'online' | 'idle' | 'offline';
  }[];
  lastMessage?: {
    id: string;
    senderName: string;
    content: string;
    timestamp: string;
    isRead: boolean;
  };
  unreadCount: number;
  pinned: boolean;
  archived: boolean;
  tags?: string[];
  associatedCrmContactId?: string;
  createdAt: string;
  updatedAt: string;
}

/** Table 12: connect_groups */
export type GroupPrivacyType = 'public' | 'private_request' | 'secret_invite_only';

export interface ConnectGroup {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  description: string;
  avatarUrl: string;
  bannerUrl?: string;
  privacy: GroupPrivacyType;
  creatorProfileId: string;
  membersCount: number;
  rules: string[];
  category: 'family' | 'work_team' | 'study_circle' | 'project' | 'hobby' | 'faith_fellowship';
  createdAt: string;
}

/** Table 13: connect_communities */
export type CommunityScope = 'church_ministry' | 'school_campus' | 'enterprise_network' | 'tech_dev' | 'neighborhood' | 'creator_fandom';

export interface ConnectCommunity {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  scope: CommunityScope;
  avatarUrl: string;
  bannerUrl: string;
  ownerProfileId: string;
  isVerified: boolean;
  isPrivate: boolean;
  membershipFeeUsd?: number;
  membersCount: number;
  onlineCount: number;
  channelsCount: number;
  eventsCount: number;
  channels: ConnectChannel[];
  roles: {
    id: string;
    name: string;
    color: string;
    permissions: string[];
  }[];
  createdAt: string;
}

/** Table 14: connect_channels */
export type ChannelKind = 'text_chat' | 'announcements_broadcast' | 'voice_room' | 'forum_feed' | 'media_gallery';

export interface ConnectChannel {
  id: string;
  communityId: string;
  tenantId: string;
  name: string;
  topic: string;
  kind: ChannelKind;
  isPrivate: boolean;
  allowedRoleIds?: string[];
  unreadCount: number;
  isMuted: boolean;
  createdAt: string;
}

/** Table 15: connect_events */
export type EventFormat = 'online_webinar' | 'in_person' | 'hybrid' | 'church_service' | 'enterprise_all_hands';

export interface ConnectEvent {
  id: string;
  tenantId: string;
  organizerProfileId: string;
  organizerName: string;
  title: string;
  description: string;
  bannerUrl: string;
  format: EventFormat;
  locationDetails: {
    isVirtual: boolean;
    virtualRoomUrl?: string;
    physicalVenueName?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  isTicketed: boolean;
  ticketPriceUsd: number;
  maxAttendees?: number;
  rsvpCount: number;
  attendees: {
    profileId: string;
    name: string;
    avatar: string;
    status: 'going' | 'interested' | 'declined';
    ticketPaid: boolean;
  }[];
  createdAt: string;
}

/** Table 16: connect_business_accounts */
export interface ConnectBusinessAccount {
  id: string;
  tenantId: string;
  businessName: string;
  legalEntityName: string;
  industry: string;
  currency: string;
  crmContactsCount: number;
  openDealsValueUsd: number;
  supportTicketsOpenCount: number;
  omniPayConnectedAccountId?: string;
  workingHours: {
    timezone: string;
    daysActive: string[];
    opensAt: string;
    closesAt: string;
    autoAwayReplyMessage: string;
  };
  createdAt: string;
}

/** Table 17: connect_contacts */
export interface ConnectContact {
  id: string;
  tenantId: string;
  businessAccountId: string;
  profileId?: string; // If mapped to an OMNI user
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  jobTitle?: string;
  leadSource: 'social_dm' | 'page_inquiry' | 'event_attendee' | 'store_customer' | 'direct_import';
  leadStage: 'new_lead' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'customer_won' | 'churned';
  estimatedLifetimeValueUsd: number;
  tags: string[];
  lastContactedAt: string;
  notes: string[];
  createdAt: string;
}

/** Table 18: connect_crm_records */
export interface ConnectCrmDeal {
  id: string;
  tenantId: string;
  contactId: string;
  contactName: string;
  dealTitle: string;
  valueUsd: number;
  stage: 'discovery' | 'presentation' | 'contract_review' | 'closed_won' | 'closed_lost';
  probabilityPercent: number;
  expectedCloseDate: string;
  assignedStaffProfileId: string;
  assignedStaffName: string;
  activityHistory: {
    id: string;
    type: 'message' | 'call' | 'meeting' | 'note' | 'payment_received';
    summary: string;
    timestamp: string;
  }[];
  createdAt: string;
}

/** Table 19: connect_permissions */
export interface ConnectPermissionRule {
  id: string;
  tenantId: string;
  roleKey: string;
  scope: 'global' | 'page' | 'community' | 'channel' | 'crm';
  targetEntityId?: string;
  permissions: {
    canView: boolean;
    canPost: boolean;
    canComment: boolean;
    canDirectMessage: boolean;
    canModerate: boolean;
    canManageBilling: boolean;
    canViewCrm: boolean;
    canHostMeetings: boolean;
    canBroadcastAnnouncements: boolean;
  };
  updatedAt: string;
}

/** Table 20: connect_audit_logs */
export interface ConnectAuditLog {
  id: string;
  tenantId: string;
  timestamp: string;
  actorProfileId: string;
  actorName: string;
  action: string; // e.g. "connect.post.deleted", "connect.user.banned", "connect.message.reported"
  targetType: 'post' | 'comment' | 'message' | 'conversation' | 'device' | 'settings' | 'admin' | 'community' | 'crm_record' | 'feature_flag' | 'profile' | 'product' | 'event' | 'deal' | 'module' | 'circle' | 'relationship' | 'contact' | 'system' | 'group';
  targetId: string;
  ipAddress: string;
  userAgent: string;
  severity: 'info' | 'warning' | 'security_alert' | 'moderation_action';
  details: Record<string, any>;
  merkleHashProof: string;
}

// ============================================================================
// 3. REAL-TIME PRESENCE & WEBRTC MEETINGS
// ============================================================================

export interface ConnectUserPresence {
  profileId: string;
  displayName: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'busy_in_meeting' | 'offline';
  customStatusText?: string;
  activeDevice: 'web' | 'mobile_ios' | 'mobile_android' | 'desktop_app';
  lastSeenAt: string;
}

export interface ConnectMeetingRoom {
  id: string;
  tenantId: string;
  roomTitle: string;
  hostProfileId: string;
  hostName: string;
  isLocked: boolean;
  isRecording: boolean;
  isAiTranscribing: boolean;
  activeParticipants: {
    profileId: string;
    name: string;
    avatar: string;
    isMutedAudio: boolean;
    isMutedVideo: boolean;
    isScreenSharing: boolean;
    isHandRaised: boolean;
    connectionQuality: 'excellent' | 'good' | 'poor';
  }[];
  liveTranscript: {
    id: string;
    speakerName: string;
    text: string;
    timestamp: string;
  }[];
  aiMeetingSummary?: {
    keyDecisions: string[];
    actionItems: { task: string; assignee: string }[];
    summaryParagraph: string;
  };
  startedAt: string;
}

// ============================================================================
// 4. CREATOR STUDIO & COMMERCE STOREFRONTS
// ============================================================================

export interface CreatorStudioStats {
  profileId: string;
  totalFollowers: number;
  monthlyReach: number;
  engagementRatePercent: number;
  totalEarningsUsd: number;
  monthlyRecurringRevenueUsd: number;
  subscribersCount: number;
  tipJarEarningsUsd: number;
  topPosts: {
    id: string;
    title: string;
    views: number;
    likes: number;
    shares: number;
    revenueUsd: number;
  }[];
  recentSubscribers: {
    subscriberName: string;
    tierName: string;
    amountUsd: number;
    subscribedAt: string;
  }[];
}

export interface ConnectCommerceProduct {
  id: string;
  tenantId: string;
  sellerProfileId: string;
  sellerName: string;
  sellerRating: number;
  title: string;
  description: string;
  priceUsd: number;
  currency: string;
  category: 'digital_download' | 'merchandise' | 'course' | 'service' | 'event_pass';
  inventoryCount: number;
  mediaUrls: string[];
  salesCount: number;
  isInstantDelivery: boolean;
  createdAt: string;
}

// ============================================================================
// 5. NAVIGATION & DASHBOARD VIEW STATE
// ============================================================================

export type ConnectDashboardMode =
  | 'personal'
  | 'business'
  | 'organisation'
  | 'enterprise';

export type ConnectNavigationTab =
  | 'universal_inbox'
  | 'channel_gateways'
  | 'inbox_automations'
  | 'inbox_broadcasts'
  | 'inbox_analytics'
  | 'inbox_test_suite'
  | 'home'
  | 'omni_spaces'
  | 'omni_groups'
  | 'omni_channels'
  | 'community_analytics'
  | 'spaces_test_suite'
  | 'spaces_admin'
  | 'relationship_graph'
  | 'contacts'
  | 'circles'
  | 'identity_profiles'
  | 'page_builder'
  | 'custom_domains'
  | 'verification_center'
  | 'feed'
  | 'moments'
  | 'messages'
  | 'meetings'
  | 'webinars'
  | 'classroom'
  | 'recordings'
  | 'media_test_suite'
  | 'media_admin'
  | 'communities'
  | 'discover'
  | 'marketplace'
  | 'omni_commerce'
  | 'omni_storefront'
  | 'social_shopping'
  | 'omni_orders'
  | 'seller_portal'
  | 'shopping_cart'
  | 'commerce_test_suite'
  | 'commerce_admin'
  | 'omni_crm'
  | 'crm_pipeline'
  | 'crm_customer_360'
  | 'customer_360'
  | 'lead_management'
  | 'business_inbox'
  | 'automation_builder'
  | 'customer_journeys'
  | 'ai_business_assistant'
  | 'crm_analytics'
  | 'crm_admin'
  | 'crm_test_suite'
  | 'creator_studio'
  | 'omni_creator'
  | 'creator_ai_repurpose'
  | 'creator_schedule'
  | 'creator_analytics'
  | 'creator_monetization'
  | 'creator_finance'
  | 'creator_marketplace'
  | 'creator_memberships'
  | 'creator_livestream'
  | 'creator_ai_manager'
  | 'creator_admin'
  | 'creator_test_suite'
  | 'omni_ads'
  | 'ads_campaigns'
  | 'ads_ai_studio'
  | 'ads_placements'
  | 'ads_creator_revshare'
  | 'ads_publisher_network'
  | 'ads_analytics'
  | 'ads_safety_fraud'
  | 'ads_governance'
  | 'ads_test_suite'
  | 'omni_social_ai'
  | 'ai_personal_social'
  | 'ai_relationship_agent'
  | 'ai_community_agent'
  | 'ai_business_agent'
  | 'ai_customer_service_agent'
  | 'ai_creator_agent'
  | 'ai_content_intelligence'
  | 'ai_moderation_agent'
  | 'ai_translation_layer'
  | 'ai_privacy_controls'
  | 'ai_admin_governance'
  | 'ai_social_test_suite'
  | 'omni_discovery'
  | 'omni_search'
  | 'discovery_feed'
  | 'business_discovery'
  | 'omni_analytics'
  | 'analytics_personal'
  | 'analytics_creator'
  | 'analytics_business'
  | 'analytics_community'
  | 'analytics_super_admin'
  | 'ai_analytics_assistant'
  | 'discovery_test_suite'
  | 'omni_whitelabel'
  | 'whitelabel_studio'
  | 'enterprise_connect'
  | 'whitelabel_admin'
  | 'whitelabel_super_admin'
  | 'whitelabel_test_suite'
  | 'production_readiness'
  | 'security_hardening'
  | 'load_testing'
  | 'scaling_dr'
  | 'observability'
  | 'super_admin_governor'
  | 'moderation_center'
  | 'business'
  | 'events'
  | 'ai_assistant'
  | 'social_test_suite'
  | 'relationship_test_suite'
  | 'identity_test_suite'
  | 'feature_control'
  | 'settings';

export * from './omni_relationship_graph';
export * from './omni_spaces';
export * from './omni_universal_inbox';
export * from './omni_commerce';
export * from './omni_crm';
export * from './omni_creator';
export * from './omni_ads';
export * from './omni_social_ai';
export * from './omni_discovery';
export * from './omni_white_label';
export * from './omni_production';

