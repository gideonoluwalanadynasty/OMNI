// ============================================================================
// OMNI UNIVERSAL INBOX & EXTERNAL COMMUNICATION GATEWAY — TYPE SYSTEM
// ============================================================================

export type ExternalChannelType =
  | 'omni_messenger'
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'website_chat'
  | 'telegram'
  | 'apple_business'
  | 'line';

export type ChannelHealthStatus =
  | 'active'
  | 'degraded'
  | 'disconnected'
  | 'rate_limited'
  | 'testing'
  | 'maintenance';

export type ConversationPriority = 'urgent' | 'high' | 'medium' | 'low';

export type ConversationStatus = 'open' | 'pending' | 'snoozed' | 'resolved' | 'closed';

export type ConversationSlaState = 'within_sla' | 'warning' | 'breached';

export type CustomerSentiment =
  | 'very_positive'
  | 'positive'
  | 'neutral'
  | 'negative'
  | 'frustrated'
  | 'urgent';

export type CustomerIntentType =
  | 'purchase_inquiry'
  | 'technical_support'
  | 'billing_question'
  | 'pricing_request'
  | 'feature_request'
  | 'churn_risk'
  | 'general_feedback'
  | 'partnership';

export type OptInConsentStatus = 'opted_in' | 'opted_out' | 'pending_verification' | 'not_applicable';

export type MessageDirection = 'inbound' | 'outbound';

export type MessageDeliveryStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export type AgentRole = 'super_admin' | 'team_lead' | 'support_agent' | 'sales_rep' | 'bot_supervisor';

export type CrmLinkType = 'contact' | 'lead' | 'customer' | 'deal' | 'order' | 'ticket';

// ----------------------------------------------------------------------------
// 1. CHANNEL ADAPTER & GATEWAY CONFIGURATIONS
// ----------------------------------------------------------------------------

export interface ChannelAdapterConfig {
  id: string;
  channelType: ExternalChannelType;
  providerName: string; // e.g. "Meta WhatsApp Cloud API", "SendGrid Enterprise", "Twilio SMS", "Meta Graph API"
  displayName: string;
  isActive: boolean;
  healthStatus: ChannelHealthStatus;
  lastSyncAt: string;
  uptimePercent: number;
  credentials: {
    apiKeyMasked?: string;
    webhookUrl: string;
    webhookSecretMasked?: string;
    senderIdentifier: string; // e.g. "+1 (800) 555-0199", "support@omni.network", "@omni_official"
    rateLimitPerMinute: number;
  };
  metrics: {
    inboundTotal: number;
    outboundTotal: number;
    errorCount24h: number;
    avgLatencyMs: number;
  };
  capabilities: {
    supportsRichMedia: boolean;
    supportsTemplates: boolean;
    supportsReadReceipts: boolean;
    supportsTypingIndicator: boolean;
    supportsVoiceNotes: boolean;
    supportsQuickReplies: boolean;
  };
}

// ----------------------------------------------------------------------------
// 2. UNIVERSAL MESSAGE & CONVERSATION SCHEMA
// ----------------------------------------------------------------------------

export interface UniversalMessageAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'voice_note' | 'invoice' | 'receipt';
  url: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
}

export interface UniversalMessage {
  id: string;
  conversationId: string;
  sourceChannel: ExternalChannelType;
  senderType: 'customer' | 'agent' | 'system' | 'ai_copilot';
  senderId: string;
  senderName: string;
  senderAvatarUrl?: string;
  direction: MessageDirection;
  body: string;
  attachments?: UniversalMessageAttachment[];
  deliveryStatus: MessageDeliveryStatus;
  createdAt: string;
  
  // AI & Translation augmentation
  translatedBody?: string;
  detectedLanguage?: string;
  aiSuggestedReplyUsed?: boolean;
  aiApprovalRequired?: boolean;
  approvedByAgentName?: string;
  
  // External Provider metadata
  externalMessageId?: string;
  costEstimateUsd?: number;
}

export interface InternalConversationNote {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  note: string;
  createdAt: string;
  mentionedAgentIds?: string[];
}

export interface CrmLinkData {
  contactId?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAvatarUrl?: string;
  
  leadStatus?: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'converted';
  leadScore?: number;
  
  customerTier?: 'Standard' | 'Silver' | 'Gold' | 'VIP Platinum' | 'Enterprise';
  lifetimeValueUsd?: number;
  
  dealId?: string;
  dealTitle?: string;
  dealValueUsd?: number;
  dealStage?: 'Discovery' | 'Demo' | 'Contract' | 'Closed Won';
  
  recentOrderId?: string;
  recentOrderTotalUsd?: number;
  recentOrderStatus?: 'processing' | 'shipped' | 'delivered' | 'refunded';
  
  ticketId?: string;
  ticketPriority?: 'P1_Urgent' | 'P2_High' | 'P3_Normal';
  ticketStatus?: 'open' | 'in_progress' | 'waiting_on_customer' | 'resolved';
}

export interface AiConversationAnalysis {
  summary: string;
  sentiment: CustomerSentiment;
  sentimentScore: number; // 0 - 100
  intent: CustomerIntentType;
  keyEntities: string[]; // e.g. ["Enterprise Plan", "Billing Question", "API Key Setup"]
  recommendedNextAction: string;
  confidenceScore: number; // 0 - 100
  draftFollowUpSnippet: string;
  suggestedReplies: {
    id: string;
    label: string;
    tone: 'professional' | 'empathetic' | 'concise' | 'sales_focused';
    text: string;
  }[];
  requiresHumanReview: boolean;
}

export interface UniversalConversation {
  id: string;
  tenantId: string;
  sourceChannel: ExternalChannelType;
  externalConversationId?: string;
  
  // Participant / Customer identity
  customer: {
    id: string;
    displayName: string;
    handleOrIdentifier: string; // phone number, email, IG handle, web session
    avatarUrl?: string;
    location?: string;
    isVerified: boolean;
    timezone?: string;
  };
  
  // Ownership & Assignment
  assignedAgentId?: string;
  assignedAgentName?: string;
  assignedAgentAvatarUrl?: string;
  assignedTeam: 'Tier 1 Support' | 'VIP Concierge' | 'Enterprise Sales' | 'Billing & Accounts' | 'General';
  
  // Status & Priority
  status: ConversationStatus;
  priority: ConversationPriority;
  slaState: ConversationSlaState;
  slaDeadlineAt: string;
  firstResponseDueAt: string;
  firstResponseTimeSeconds?: number;
  
  // Categorization & Notes
  tags: string[];
  internalNotes: InternalConversationNote[];
  
  // CRM Linkage & Customer 360
  crm: CrmLinkData;
  
  // AI Copilot intelligence
  aiAnalysis: AiConversationAnalysis;
  
  // Consent & Compliance
  optInConsent: OptInConsentStatus;
  consentSource?: string;
  consentTimestamp?: string;
  
  // Activity timestamps
  unreadCount: number;
  lastMessageSnippet: string;
  lastMessageAt: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// 3. TEAM MEMBERS & ROSTER
// ----------------------------------------------------------------------------

export interface InboxTeamAgent {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  role: AgentRole;
  team: string;
  isOnline: boolean;
  activeConversationsCount: number;
  maxCapacity: number;
  avgResponseTimeMin: number;
  csatRating: number;
}

// ----------------------------------------------------------------------------
// 4. AUTOMATION ENGINE WORKFLOWS
// ----------------------------------------------------------------------------

export type InboxAutomationTriggerType =
  | 'new_inbound_message'
  | 'vip_customer_contacted'
  | 'after_hours_message'
  | 'keyword_match'
  | 'sentiment_negative'
  | 'sla_breach_warning';

export type InboxAutomationActionType =
  | 'assign_to_team'
  | 'assign_to_agent'
  | 'add_tags'
  | 'send_automated_template'
  | 'create_crm_lead'
  | 'create_support_ticket'
  | 'escalate_priority'
  | 'notify_webhook_or_slack';

export interface InboxAutomationRule {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  trigger: InboxAutomationTriggerType;
  conditions: {
    channelFilter?: ExternalChannelType[];
    keywordContains?: string[];
    customerTierFilter?: string[];
  };
  actions: {
    type: InboxAutomationActionType;
    params: Record<string, any>;
  }[];
  executionCountTotal: number;
  lastExecutedAt?: string;
}

// ----------------------------------------------------------------------------
// 5. BROADCAST CAMPAIGNS & CONSENT
// ----------------------------------------------------------------------------

export interface BroadcastCampaign {
  id: string;
  title: string;
  targetChannel: ExternalChannelType;
  status: 'draft' | 'scheduled' | 'broadcasting' | 'completed' | 'cancelled';
  templateName: string;
  messageContent: string;
  scheduledAt?: string;
  sentAt?: string;
  audienceFilter: {
    tag?: string;
    customerTier?: string;
    verifiedOptInOnly: boolean;
  };
  metrics: {
    targetedRecipients: number;
    sentCount: number;
    deliveredCount: number;
    readCount: number;
    clickedCount: number;
    optOutCount: number;
  };
  consentEnforced: boolean;
}

// ----------------------------------------------------------------------------
// 6. INBOX ANALYTICS & SLAS
// ----------------------------------------------------------------------------

export interface UniversalInboxAnalytics {
  timeframe: 'today' | '7d' | '30d' | 'quarter';
  totalConversations: number;
  activeOpenConversations: number;
  resolvedConversations: number;
  medianFirstResponseTimeSec: number;
  medianResolutionTimeMin: number;
  csatScorePercent: number; // e.g. 94.8%
  slaAttainmentPercent: number; // e.g. 98.2%
  
  volumeByChannel: {
    channel: ExternalChannelType;
    count: number;
    percent: number;
  }[];
  
  sentimentBreakdown: {
    positivePercent: number;
    neutralPercent: number;
    negativePercent: number;
  };
  
  salesPipelineInfluencedUsd: number;
  dealsClosedFromChatCount: number;
}

// ----------------------------------------------------------------------------
// 7. SECURITY, AUDIT & GATEWAY GOVERNANCE
// ----------------------------------------------------------------------------

export interface GatewayAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  channel: ExternalChannelType;
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'blocked';
}

export interface GatewaySecurityPolicy {
  tenantId: string;
  maskPIIEnabled: boolean;
  enforceDoubleOptInForWhatsApp: boolean;
  enforceQuietHours: boolean;
  quietHoursStartUtc: string; // "22:00"
  quietHoursEndUtc: string;   // "08:00"
  aiAutoSendBlocked: boolean; // Must always be true for human-in-the-loop
  dlpSensitiveDataFilter: boolean;
  ipWhitelistEnabled: boolean;
}
