/**
 * OMNI CUSTOMER RELATIONSHIP OPERATING SYSTEM (CRM & AUTOMATION ENGINE)
 * Type Definitions & Domain Models
 *
 * Connects:
 * - OMNI Contacts
 * - OMNI Relationship Graph
 * - OMNI Messenger & Universal Inbox
 * - OMNI Finance & Payments
 * - OMNI AI & Predictive Intelligence
 * - OMNI Spaces & Communities
 * - OMNI Commerce & Marketplace
 */

// ============================================================================
// 1. CORE LIFECYCLE & STAGES
// ============================================================================

export type CrmLifecycleStage =
  | 'contact'
  | 'lead'
  | 'qualified_opportunity'
  | 'active_customer'
  | 'vip_advocate'
  | 'at_risk_churn'
  | 'dormant';

export type LeadSource =
  | 'omni_messages'
  | 'lead_capture_form'
  | 'omni_ads'
  | 'virtual_event'
  | 'omni_marketplace'
  | 'embedded_website_widget'
  | 'referral'
  | 'community_space';

export type DealPipelineStage =
  | 'new_lead'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type LeadRatingTier = 'hot' | 'warm' | 'nurture' | 'cold';

export type CustomerTier =
  | 'standard'
  | 'silver'
  | 'gold'
  | 'platinum_vip'
  | 'enterprise_institutional';

export type CrmTaskPriority = 'urgent' | 'high' | 'normal' | 'low';
export type CrmTaskStatus = 'todo' | 'in_progress' | 'completed' | 'deferred';

export type TicketCategory =
  | 'billing_invoice'
  | 'technical_issue'
  | 'order_fulfillment'
  | 'product_feature'
  | 'vip_consulting'
  | 'general_inquiry';

export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_on_customer'
  | 'escalated'
  | 'resolved'
  | 'closed';

// ============================================================================
// 2. CRM ENTITIES
// ============================================================================

export interface CrmInteraction {
  id: string;
  crmContactId: string;
  channel:
    | 'omni_messenger'
    | 'email'
    | 'voice_call'
    | 'webrtc_meeting'
    | 'whatsapp'
    | 'social_dm'
    | 'order_checkout'
    | 'support_ticket';
  direction: 'inbound' | 'outbound';
  subject: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  actorName: string;
  actorRole: string;
  timestamp: string;
  durationMinutes?: number;
  metadata?: Record<string, any>;
}

export interface CrmTask {
  id: string;
  title: string;
  description: string;
  priority: CrmTaskPriority;
  status: CrmTaskStatus;
  dueDate: string;
  dueTime?: string;
  assignedAgentId: string;
  assignedAgentName: string;
  assignedAgentAvatar: string;
  linkedEntity: {
    type: 'contact' | 'lead' | 'deal' | 'customer' | 'company' | 'ticket';
    id: string;
    name: string;
  };
  reminderEnabled: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface CrmNote {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  isPinned: boolean;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface CrmTicket {
  id: string;
  ticketNumber: string; // e.g. "TICK-9082"
  customerId: string;
  customerName: string;
  customerAvatar: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: CrmTaskPriority;
  status: TicketStatus;
  slaDeadlineAt: string;
  slaMinutesRemaining: number;
  isSlaBreached: boolean;
  assignedAgentId: string;
  assignedAgentName: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface CrmDeal {
  id: string;
  title: string;
  companyId?: string;
  companyName?: string;
  contactId: string;
  contactName: string;
  contactAvatar: string;
  valueUsd: number;
  stage: DealPipelineStage;
  probabilityPercent: number; // 0 - 100
  expectedCloseDate: string;
  leadSource: LeadSource;
  assignedRepId: string;
  assignedRepName: string;
  assignedRepAvatar: string;
  productsInterested: string[];
  notesCount: number;
  tasksCount: number;
  lastActivityAt: string;
  createdAt: string;
  wonAt?: string;
  lossReason?: string;
}

export interface CrmCompany {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  tier: CustomerTier;
  annualRevenueEstimateUsd: number;
  totalDealsValueUsd: number;
  dealsCount: number;
  contactsCount: number;
  primaryContactName: string;
  primaryContactEmail: string;
  country: string;
  city: string;
  healthScore: number; // 0 - 100
  logoUrl: string;
  createdAt: string;
}

// ============================================================================
// 3. CUSTOMER 360 PROFILE
// ============================================================================

export interface Customer360Profile {
  id: string;
  passportUid: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  email: string;
  phone: string;
  title: string;
  companyName: string;
  location: string;
  timezone: string;
  languages: string[];
  
  // Badges & Rep
  verificationStatus: 'verified_human' | 'verified_business' | 'verified_creator' | 'unverified';
  reputationScore: number; // 0 - 1000
  
  // Lifecycle & Customer Tier
  lifecycleStage: CrmLifecycleStage;
  customerTier: CustomerTier;
  leadSource: LeadSource;
  firstAcquiredDate: string;
  lastActiveDate: string;
  
  // Financial & Commerce Metrics
  lifetimeValueUsd: number;
  totalOrdersCount: number;
  averageOrderValueUsd: number;
  outstandingBalanceUsd: number;
  creditScoreInternal: number; // 300 - 850
  
  // Cross-System Linkages
  orders: {
    id: string;
    orderNumber: string;
    date: string;
    amountUsd: number;
    status: 'completed' | 'processing' | 'delivered' | 'refunded';
    itemsSummary: string;
  }[];
  
  payments: {
    id: string;
    reference: string;
    date: string;
    amountUsd: number;
    rail: 'omni_pay' | 'card' | 'bank_ach' | 'usdc_sovereign';
    status: 'settled' | 'pending' | 'failed';
  }[];
  
  coursesEnrolled: {
    id: string;
    title: string;
    progressPercent: number;
    certificateIssued: boolean;
    lastAccessedAt: string;
  }[];
  
  eventsAttended: {
    id: string;
    title: string;
    date: string;
    attendanceType: 'live_webinar' | 'in_person_summit' | 'recorded_replay';
    checkedIn: boolean;
  }[];
  
  communitiesJoined: {
    id: string;
    spaceName: string;
    role: 'founder' | 'moderator' | 'active_member' | 'scholar';
    contributionsCount: number;
  }[];
  
  conversationsHistory: {
    id: string;
    channel: string;
    lastMessage: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'urgent';
  }[];
  
  supportTickets: CrmTicket[];
  interactions: CrmInteraction[];
  tasks: CrmTask[];
  notes: CrmNote[];
  
  // Compliance & Consent
  consent: {
    marketingEmailOptIn: boolean;
    smsAlertsOptIn: boolean;
    directMessageOptIn: boolean;
    dataProcessingGdprAccepted: boolean;
    consentGivenAt: string;
    consentSource: string;
  };
  
  // AI Lead Scoring & Behavioral Intelligence
  aiIntelligence: {
    leadScore: number; // 0 - 100
    ratingTier: LeadRatingTier;
    conversionProbabilityPct: number;
    buyingIntentScore: number; // 0 - 100
    churnRiskPct: number;
    keyInterestArchetypes: string[]; // e.g. ["Physical Hardware", "Masterclasses", "Institutional Escrow"]
    recommendedNextAction: string;
    aiJustification: string;
    suggestedOffers: string[];
    lastAnalyzedAt: string;
  };
}

export type SlaStatus = 'within_sla' | 'warning' | 'breached' | 'active' | 'at_risk' | 'met';
export type BusinessDepartment = 'Tier 1 Support' | 'Enterprise Sales' | 'VIP Concierge' | 'Billing & Accounts' | 'All';

// ============================================================================
// 4. BUSINESS INBOX EXTENSION
// ============================================================================

export interface BusinessInboxConversation {
  id: string;
  channel: 'omni_messenger' | 'whatsapp' | 'email' | 'instagram' | 'website_chat' | 'sms';
  customer: {
    id: string;
    displayName: string;
    handle: string;
    avatarUrl: string;
    company?: string;
    tier: CustomerTier;
    leadScore: number;
  };
  assignedTeam: 'Tier 1 Support' | 'Enterprise Sales' | 'VIP Concierge' | 'Billing & Accounts';
  assignedAgentId?: string;
  assignedAgentName?: string;
  assignedAgentAvatar?: string;
  status: 'open' | 'pending' | 'snoozed' | 'resolved' | 'closed';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  
  // SLA Management
  slaState: SlaStatus;
  slaDeadlineAt: string;
  responseTimeRemainingMinutes: number;
  firstResponseTimeSeconds?: number;
  
  // Content & Notes
  lastMessageSnippet: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  tags: string[];
  internalNotes: CrmNote[];
  
  // AI Copilot
  aiAnalysis: {
    sentiment: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'urgent';
    sentimentScore: number;
    intent: string;
    keyTopics: string[];
    suggestedReply: string;
    suggestedAction: string;
    confidencePercent: number;
  };
}

// ============================================================================
// 5. AUTOMATION ENGINE & WORKFLOW BUILDER
// ============================================================================

export type AutomationTriggerType =
  | 'new_message_received'
  | 'new_customer_registered'
  | 'new_order_placed'
  | 'payment_received'
  | 'form_submission'
  | 'lead_form_submitted'
  | 'event_registration'
  | 'community_joining'
  | 'lead_score_above_threshold'
  | 'deal_stage_changed';

export type AutomationActionType =
  | 'send_message'
  | 'send_omni_message'
  | 'create_crm_task'
  | 'assign_employee'
  | 'update_crm_stage'
  | 'send_email_template'
  | 'create_invoice'
  | 'schedule_meeting_invite'
  | 'apply_customer_tag'
  | 'trigger_webhook';

export interface AutomationTriggerConfig {
  type: AutomationTriggerType;
  label: string;
  description: string;
  conditions: {
    field: string;
    operator: 'equals' | 'greater_than' | 'contains' | 'in_list';
    value: string | number;
  }[];
}

export interface AutomationActionStep {
  id: string;
  type: AutomationActionType;
  name: string;
  description: string;
  delayMinutes: number;
  parameters: {
    templateId?: string;
    messageBody?: string;
    taskTitle?: string;
    taskPriority?: CrmTaskPriority;
    assigneeRole?: string;
    assigneeId?: string;
    targetStage?: DealPipelineStage;
    tagToAdd?: string;
    invoiceAmountUsd?: number;
    meetingDurationMinutes?: number;
  };
  isRequired: boolean;
  requiresHumanApproval: boolean;
}

export interface BusinessAutomationWorkflow {
  id: string;
  name?: string;
  title?: string;
  category?: 'welcome' | 'lead_nurture' | 'sales_acceleration' | 'onboarding' | 'retention' | 'support_routing' | string;
  description: string;
  isActive: boolean;
  trigger?: AutomationTriggerConfig;
  triggerType?: AutomationTriggerType;
  triggerLabel?: string;
  conditions?: Array<{
    id?: string;
    field: string;
    operator: 'equals' | 'greater_than' | 'contains' | 'in_list' | string;
    value: string | number;
    label?: string;
  }>;
  steps?: AutomationActionStep[];
  actions?: Array<{
    id?: string;
    actionType: AutomationActionType;
    label?: string;
    config?: Record<string, any>;
  }>;
  executionStats?: {
    totalTriggered: number;
    completedCount: number;
    activeExecutions: number;
    failedCount: number;
    conversionSuccessPct: number;
  };
  executionCount?: number;
  successRatePct?: number;
  createdAt: string;
  updatedAt?: string;
}

// ============================================================================
// 6. CUSTOMER JOURNEYS
// ============================================================================

export interface CustomerJourneyTemplate {
  id: string;
  title: string;
  badge: string;
  description: string;
  targetAudience: string;
  estimatedDuration: string;
  stages: {
    dayOffset: number;
    title: string;
    channel: string;
    actionDescription: string;
    triggerCondition: string;
  }[];
  recommendedFor: string[];
}

// ============================================================================
// 7. AI BUSINESS ASSISTANT CONVERSATION & REPORTS
// ============================================================================

export interface AiBusinessChatMessage {
  id: string;
  sender: 'user' | 'omni_ai';
  text: string;
  timestamp: string;
  structuredInsight?: {
    type: 'customer_summary' | 'draft_reply' | 'sales_forecast' | 'action_plan' | 'churn_alert';
    headline: string;
    summaryPoints: string[];
    metrics?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
    actionButtonLabel?: string;
    actionPayload?: Record<string, any>;
  };
}

// ============================================================================
// 8. CRM ANALYTICS & EXECUTIVE METRICS
// ============================================================================

export interface CrmExecutiveAnalytics {
  timeframe: '7d' | '30d' | '90d' | 'ytd';
  totalLeadsCount: number;
  leadsChangePct: number;
  
  conversionRatePct: number;
  conversionRateChangePct: number;
  
  totalPipelineValueUsd: number;
  weightedPipelineValueUsd: number;
  closedWonRevenueUsd: number;
  
  avgDealSizeUsd: number;
  avgSalesCycleDays: number;
  
  avgFirstResponseTimeMinutes: number;
  slaComplianceRatePct: number;
  
  customerSatisfactionScore: number; // 0 - 5.0 (e.g. 4.92)
  netPromoterScore: number; // -100 to +100 (e.g. +78)
  
  leadsBySource: {
    source: LeadSource;
    count: number;
    valueUsd: number;
    conversionRate: number;
  }[];
  
  pipelineByStage: {
    stage: DealPipelineStage;
    label: string;
    dealsCount: number;
    totalValueUsd: number;
    probabilityPct: number;
  }[];
  
  topPerformingAgents: {
    agentId: string;
    name: string;
    avatar: string;
    dealsWonCount: number;
    revenueWonUsd: number;
    avgResponseMinutes: number;
    csat: number;
  }[];
}

// ============================================================================
// 9. SUPER ADMIN GOVERNANCE & PERMISSIONS
// ============================================================================

export interface CrmAdminGovernance {
  isCrmGloballyActive: boolean;
  isAutomationEngineActive: boolean;
  isAiLeadScoringActive: boolean;
  isSlaEnforcementActive: boolean;
  
  defaultSlaMinutes: {
    urgent: number;
    high: number;
    normal: number;
    low: number;
  };
  
  leadScoringWeights: {
    messageEngagement: number; // e.g. 30%
    commerceHistory: number; // e.g. 25%
    eventAttendance: number; // e.g. 20%
    communityActivity: number; // e.g. 15%
    profileCompleteness: number; // e.g. 10%
  };
  
  rolesAndPermissions: {
    roleName: string;
    canViewAllDeals: boolean;
    canEditPipelines: boolean;
    canTriggerAutomations: boolean;
    canExportCustomerData: boolean;
    canManageGovernance: boolean;
  }[];
  
  integrationNodes: {
    serviceName: string;
    status: 'connected' | 'syncing' | 'degraded' | 'disabled';
    syncIntervalMinutes: number;
    lastSyncedAt: string;
  }[];
}
