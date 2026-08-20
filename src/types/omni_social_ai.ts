/**
 * OMNI SOCIAL INTELLIGENCE LAYER — TYPE DEFINITIONS (PROMPT 13)
 * Unifies Personal, Relationship, Community, Business, Creator, Content,
 * Customer Service, Moderation, Translation, and Privacy AI systems
 * on top of OMNI AI Gateway, Knowledge Base, and Memory Infrastructure.
 */

export type OmniSocialAgentType =
  | 'personal_social'
  | 'relationship_graph'
  | 'community_spaces'
  | 'business_crm'
  | 'customer_service'
  | 'creator_studio'
  | 'content_intelligence'
  | 'moderation_safety'
  | 'translation_gateway';

export interface OmniAiAgentDescriptor {
  id: string;
  type: OmniSocialAgentType;
  name: string;
  tagline: string;
  avatarIcon: string;
  model: string;
  status: 'active' | 'standby' | 'paused';
  activeByDefault: boolean;
  capabilities: string[];
  systemPrompt: string;
  totalInteractions: number;
  avgLatencyMs: number;
  accuracyScore: number;
  tenantId: string;
  permissionsRequired: string[];
}

// 1. Personal Social Assistant Types
export interface OmniDailyActivitySummary {
  id: string;
  timestamp: string;
  timeframe: 'today' | 'this_week' | 'yesterday';
  headline: string;
  unreadMessagesCount: number;
  highPriorityMessages: {
    senderId: string;
    senderName: string;
    senderAvatar: string;
    snippet: string;
    urgency: 'high' | 'medium' | 'normal';
    timestamp: string;
  }[];
  communityUpdates: {
    spaceId: string;
    spaceName: string;
    category: string;
    updateSummary: string;
    memberCount: number;
  }[];
  upcomingEvents: {
    eventId: string;
    title: string;
    startTime: string;
    locationOrLink: string;
    isHostOrAttending: boolean;
  }[];
  recommendedActions: {
    id: string;
    title: string;
    category: 'connection' | 'followup' | 'event' | 'task';
    actionPayload: string;
  }[];
  aiConfidenceScore: number;
}

export interface OmniSuggestedConnection {
  id: string;
  targetUserId: string;
  name: string;
  handle: string;
  avatarUrl: string;
  roleOrBio: string;
  matchScore: number; // 0 - 100%
  mutualConnections: number;
  commonInterests: string[];
  reason: string;
  connectionStatus: 'suggested' | 'requested' | 'connected' | 'dismissed';
}

// 2. Relationship Assistant Types
export interface OmniRelationshipHealthAlert {
  id: string;
  contactId: string;
  contactName: string;
  contactHandle: string;
  contactAvatar: string;
  relationshipType: 'client' | 'mentor' | 'friend' | 'collaborator' | 'investor' | 'partner';
  daysSinceLastContact: number;
  relationshipStrength: number; // 0 - 100
  decayRisk: 'critical' | 'moderate' | 'low';
  lastInteractionDate: string;
  suggestedAction: {
    type: 'send_message' | 'schedule_meeting' | 'send_gift' | 'endorse_milestone';
    draftSubject?: string;
    draftBody: string;
    channel: 'omni_chat' | 'email' | 'voice_call' | 'meeting';
  };
  keyNotes: string[];
}

export interface OmniRelationshipMilestone {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar: string;
  milestoneType: 'birthday' | 'work_anniversary' | 'promotion' | 'deal_closed' | 'project_launch';
  milestoneDate: string;
  isUpcoming: boolean;
  suggestedGreeting: string;
}

// 3. Community AI Types
export interface OmniCommunityIntelligence {
  spaceId: string;
  spaceName: string;
  memberCount: number;
  trendingTopics: {
    tag: string;
    sentiment: 'positive' | 'neutral' | 'constructive';
    mentionCount: number;
    sampleDiscussion: string;
  }[];
  automatedFaqs: {
    question: string;
    aiAnswer: string;
    timesAsked: number;
    isVerifiedByAdmin: boolean;
  }[];
  onboardingAssistant: {
    welcomeMessageTemplate: string;
    recommendedResources: { title: string; url: string; type: string }[];
    autoWelcomeEnabled: boolean;
  };
  moderatorAlerts: {
    id: string;
    type: 'spam_spike' | 'toxic_thread' | 'rule_violation' | 'unanswered_question';
    threadTitle: string;
    authorName: string;
    severity: 'high' | 'medium' | 'low';
    aiRecommendation: string;
    status: 'pending' | 'resolved' | 'dismissed';
  }[];
}

// 4. Business AI & CRM Types
export interface OmniBusinessAiInsight {
  id: string;
  companyId: string;
  companyName: string;
  insightCategory: 'sales_forecast' | 'churn_prevention' | 'upsell_opportunity' | 'deal_coaching';
  headline: string;
  summary: string;
  potentialRevenueImpact: number;
  confidence: number;
  recommendedAction: string;
  associatedDeals: {
    dealId: string;
    dealName: string;
    amount: number;
    stage: string;
  }[];
  createdAt: string;
}

export interface OmniLeadScoreCard {
  leadId: string;
  leadName: string;
  leadEmail: string;
  leadCompany: string;
  aiScore: number; // 0 - 100
  qualificationLevel: 'hot_deal' | 'warm_prospect' | 'nurture' | 'disqualified';
  buyingIntentSignals: string[];
  conversationSummary: string;
  suggestedPitch: string;
}

// 5. Customer Service AI Types
export interface OmniCustomerServiceTicket {
  id: string;
  customerName: string;
  customerAvatar: string;
  customerEmail: string;
  channel: 'omni_chat' | 'whatsapp' | 'email' | 'instagram_dm';
  status: 'ai_resolving' | 'escalated_to_human' | 'resolved' | 'waiting_customer';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: 'billing' | 'technical_support' | 'order_tracking' | 'refund' | 'product_inquiry';
  sentiment: 'frustrated' | 'neutral' | 'delighted';
  csatPredicted: number; // 1-5
  aiDraftedResponse: string;
  aiConfidenceScore: number;
  history: { sender: 'customer' | 'ai_bot' | 'human_agent'; message: string; timestamp: string }[];
}

// 6. Creator AI Types (1-to-N Repurposing Engine)
export interface OmniCreatorRepurposingJob {
  id: string;
  sourceType: 'long_video' | 'podcast_audio' | 'written_article' | 'livestream';
  sourceTitle: string;
  sourceUrlOrSummary: string;
  status: 'ready' | 'processing' | 'completed';
  outputs: {
    shortClips: {
      clipId: string;
      title: string;
      hook: string;
      timestampRange: string;
      aspectRatio: '9:16' | '16:9' | '1:1';
      viralScore: number;
    }[];
    longFormArticle: {
      title: string;
      readingTime: string;
      markdownContent: string;
      seoKeywords: string[];
    };
    newsletterDraft: {
      subjectLine: string;
      previewText: string;
      bodyContent: string;
    };
    socialAdCopies: {
      platform: 'omni_feed' | 'moments' | 'x_twitter' | 'linkedin';
      copyText: string;
      ctaText: string;
    }[];
    multilingualTranslations: {
      language: string;
      languageCode: string;
      translatedTitle: string;
      translatedHook: string;
    }[];
  };
  createdAt: string;
}

// 7. Content Intelligence Types
export interface OmniContentTrendItem {
  id: string;
  topic: string;
  category: 'technology' | 'finance' | 'creator_economy' | 'lifestyle' | 'education' | 'business';
  volumeGrowthPercent: number;
  velocityScore: number; // 0-100
  sentimentSummary: string;
  topHashtags: string[];
  recommendedAngleForCreators: string;
}

// AI Moderation Assistant Types
export interface OmniModerationAiScanItem {
  id: string;
  contentType: 'post' | 'comment' | 'dm' | 'space_message' | 'user_profile';
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  contentSnippet: string;
  flagReason: 'spam_bot' | 'harassment' | 'hate_speech' | 'scam_crypto' | 'misinformation' | 'impersonation';
  aiConfidence: number; // 0 - 100%
  botProbabilityScore: number;
  severity: 'critical' | 'high' | 'medium';
  actionTaken: 'quarantined' | 'flagged_for_human' | 'auto_warning_issued';
  humanReviewStatus: 'pending' | 'approved_clean' | 'confirmed_violation';
  timestamp: string;
}

// AI Multilingual Translation Types
export interface OmniTranslationSession {
  id: string;
  participants: {
    userId: string;
    name: string;
    preferredLanguage: string;
    langCode: string;
    avatarUrl: string;
  }[];
  messages: {
    id: string;
    senderId: string;
    originalLanguage: string;
    originalText: string;
    translations: Record<string, string>; // langCode -> translatedText
    timestamp: string;
    preservedTone: 'formal' | 'casual' | 'professional' | 'humorous';
  }[];
}

// User Privacy & Memory Controls
export interface OmniAiPrivacyConfig {
  userId: string;
  aiAssistanceEnabled: boolean;
  episodicMemoryEnabled: boolean;
  semanticPersonalization: boolean;
  conversationAnalysisAllowed: boolean;
  dataContributionForTraining: boolean;
  piiMaskingStrict: boolean;
  retentionPeriodDays: number;
  totalMemoriesStored: number;
  lastMemoryWipeTimestamp?: string;
}

// Super Admin AI Control Types
export interface OmniAiSuperAdminConfig {
  globalAiStatus: 'operational' | 'degraded' | 'maintenance';
  defaultModel: string;
  availableModels: {
    id: string;
    name: string;
    provider: string;
    costPer1kTokens: number;
    isPrimary: boolean;
  }[];
  dailyTokenLimitPerTenant: number;
  enforceCrossTenantIsolation: boolean;
  activeByDefault: boolean;
  totalMonthlyCostUsd: number;
  totalTokensUsedThisMonth: number;
  tenantAiPolicies: {
    tenantId: string;
    tenantName: string;
    allowedAgents: OmniSocialAgentType[];
    customTokenLimit: number;
    byokConfigured: boolean;
  }[];
}

// Diagnostic Test Case
export interface OmniSocialAiTestCase {
  id: string;
  name: string;
  category: 'permission_boundary' | 'memory_privacy' | 'prompt_injection' | 'pii_masking' | 'cross_tenant_isolation' | 'translation_fidelity' | 'creator_repurposing' | 'relationship_decay';
  description: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  executionTimeMs: number;
  details: string;
  logs: string[];
}
