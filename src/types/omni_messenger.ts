// ============================================================================
// OMNI MESSENGER & REAL-TIME CHAT SYSTEM TYPES
// ============================================================================

export type ConversationType =
  | 'one_to_one'
  | 'group'
  | 'business_customer'
  | 'community'
  | 'channel'
  | 'support'
  | 'ai'
  | 'enterprise';

export type MessageType =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'file'
  | 'gif'
  | 'sticker'
  | 'link'
  | 'location'
  | 'contact'
  | 'product'
  | 'payment'
  | 'event'
  | 'poll'
  | 'voice_note';

export type MessageDeliveryState =
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'
  | 'deleted'
  | 'edited'
  | 'expired';

export type CrmPipelineStage =
  | 'conversation'
  | 'contact'
  | 'lead'
  | 'customer'
  | 'transaction';

export interface OmniMessengerDevice {
  deviceId: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet' | 'web';
  os: string;
  browser?: string;
  isCurrent: boolean;
  lastSeenAt: string;
  e2eePublicKey: string;
  pushTokenRegistered: boolean;
}

export interface OmniConversationMember {
  profileId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  role: 'owner' | 'admin' | 'moderator' | 'member' | 'guest';
  joinedAt: string;
  isMuted: boolean;
  customNickname?: string;
  onlineStatus: 'online' | 'away' | 'offline' | 'busy';
  lastSeenAt: string;
  permissions: {
    canSendMessages: boolean;
    canPinMessages: boolean;
    canAddMembers: boolean;
    canDeleteMessages: boolean;
    canManageRoles: boolean;
  };
}

export interface OmniMessageAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'file' | 'gif' | 'sticker';
  name: string;
  sizeBytes: number;
  mimeType: string;
  url: string;
  cdnUrl: string;
  sha256Hash: string;
  durationSec?: number;
  thumbnailUrl?: string;
}

export interface OmniVoiceNoteData {
  audioUrl: string;
  durationSeconds: number;
  waveform: number[];
  transcription: string;
  translation?: {
    targetLanguage: string;
    text: string;
  };
  summary?: string;
  isTranscribed: boolean;
}

export interface OmniMessageReaction {
  emoji: string;
  count: number;
  reactedProfileIds: string[];
  userReacted: boolean;
}

export interface OmniMessageReadReceipt {
  profileId: string;
  displayName: string;
  readAt: string;
  deviceId: string;
}

export interface OmniMessage {
  id: string;
  conversationId: string;
  senderProfileId: string;
  senderUsername: string;
  senderDisplayName: string;
  senderAvatar: string;
  senderVerificationBadge?: 'sovereign_gold' | 'verified_blue' | 'business_emerald' | 'official_purple';
  messageType: MessageType;
  content: string;
  state: MessageDeliveryState;
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  editedAt?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
  ephemeralTtlSeconds?: number;
  expiresAt?: string;
  attachments?: OmniMessageAttachment[];
  voiceNote?: OmniVoiceNoteData;
  paymentData?: {
    amount: number;
    currency: string;
    description: string;
    status: 'pending' | 'settled' | 'declined';
    transactionId: string;
    receiptMerkleProof?: string;
  };
  productData?: {
    id: string;
    title: string;
    priceUsd: number;
    currency: string;
    imageUrl: string;
    sellerHandle: string;
  };
  pollData?: {
    id: string;
    question: string;
    options: Array<{
      id: string;
      text: string;
      votes: number;
      voterProfileIds: string[];
    }>;
    totalVotes: number;
    expiresAt: string;
    userVotedOptionId?: string;
  };
  eventData?: {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    location: string;
    rsvpCount: number;
    userRsvpStatus?: 'going' | 'maybe' | 'declined';
  };
  locationData?: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  contactCard?: {
    profileId: string;
    displayName: string;
    handle: string;
    avatarUrl: string;
    verificationBadge?: string;
    role?: string;
  };
  reactions: OmniMessageReaction[];
  reads: OmniMessageReadReceipt[];
  e2eeMetadata?: {
    algorithm: 'Signal-X3DH-DoubleRatchet' | 'Post-Quantum-Kyber1024';
    fingerprint: string;
    verified: boolean;
  };
  aiAnalysis?: {
    intent?: string;
    sentiment?: 'positive' | 'neutral' | 'urgent' | 'constructive';
    taskExtracted?: string;
    suggestedAction?: string;
  };
}

export interface OmniConversation {
  id: string;
  type: ConversationType;
  title: string;
  avatarUrl: string;
  description?: string;
  members: OmniConversationMember[];
  pinnedMessageIds: string[];
  isEncrypted: boolean;
  encryptionFingerprint?: string;
  ephemeralTimerSeconds: number; // 0 = off, 3600 = 1h, 86400 = 24h, 604800 = 7d
  crmPipelineStage?: CrmPipelineStage;
  crmLeadData?: {
    leadId: string;
    dealValueUsd: number;
    leadScore: number;
    assignedTo: string;
    companyName?: string;
    intentCategory?: string;
  };
  channelAnnouncementOnly?: boolean;
  unreadCount: number;
  lastMessage?: {
    id: string;
    content: string;
    senderDisplayName: string;
    sentAt: string;
    state: MessageDeliveryState;
    messageType: MessageType;
  };
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  typingUsers?: Array<{
    profileId: string;
    displayName: string;
    typingStartedAt: number;
  }>;
}

export interface OmniMessengerSettings {
  whoCanMessageMe: 'everyone' | 'contacts_only' | 'verified_only' | 'nobody';
  whoCanAddToGroups: 'everyone' | 'contacts_only' | 'nobody';
  readReceiptsEnabled: boolean;
  onlineStatusVisibility: 'everyone' | 'contacts_only' | 'nobody';
  lastSeenVisibility: 'everyone' | 'contacts_only' | 'nobody';
  messageRequestsEnabled: boolean;
  soundNotifications: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  offlineQueueSyncAuto: boolean;
  ephemeralDefaultTimerSeconds: number;
}

export interface OmniMessengerAdminPolicies {
  messagingActive: boolean;
  defaultRetentionDays: number;
  maxAttachmentSizeBytes: number;
  e2eeMandatoryForEnterprise: boolean;
  maxGroupSize: number;
  rateLimitMessagesPerMinute: number;
  autoSpamQuarantine: boolean;
  tenantStorageQuotaMb: number;
  tenantStorageUsedMb: number;
}

export interface OfflineMessageQueueItem {
  id: string;
  conversationId: string;
  queuedAt: string;
  payload: Partial<OmniMessage>;
  retryAttempts: number;
}

export interface MessengerSmartReply {
  id: string;
  category: 'concise' | 'professional' | 'enthusiastic' | 'crm_action';
  text: string;
}

export interface MessengerTestStep {
  stepId: string;
  name: string;
  passed: boolean;
  details: string;
  executionTimeMs: number;
  extraProof?: string;
}

export interface MessengerTestSuiteResult {
  passed: boolean;
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  benchmarkDurationMs: number;
  timestamp: string;
  steps: MessengerTestStep[];
}

