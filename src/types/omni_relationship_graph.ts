/**
 * OMNI RELATIONSHIP GRAPH, CONTACTS & CIRCLES TYPE DEFINITIONS
 * Strict multi-tenant schema with granular privacy rules and AI relationship intelligence.
 */

export type OmniRelationshipKind =
  | 'friend'
  | 'follower'
  | 'customer'
  | 'lead'
  | 'employee'
  | 'member'
  | 'supplier'
  | 'partner'
  | 'student'
  | 'subscriber'
  | 'family'
  | 'community_member'
  | 'colleague'
  | 'mentor'
  | 'donor';

export type OmniEntityKind =
  | 'person'
  | 'business'
  | 'community'
  | 'organisation'
  | 'customer'
  | 'member'
  | 'employee'
  | 'partner'
  | 'supplier';

export type RelationshipVisibility = 'public' | 'mutual_only' | 'circle_only' | 'private';

export type ContactSource =
  | 'manual'
  | 'csv'
  | 'vcf'
  | 'phone_sync'
  | 'google_contacts'
  | 'microsoft_contacts'
  | 'omni_passport';

export type ContactLifecycleStage = 'contact' | 'lead' | 'customer' | 'relationship' | 'champion';

export type CircleCategory = 'personal' | 'business' | 'organisation' | 'faith_community' | 'custom';

export interface OmniGraphNode {
  id: string;
  name: string;
  handle?: string;
  avatarUrl: string;
  entityType: OmniEntityKind;
  categoryTag?: string;
  organisation?: string;
  isVerified?: boolean;
  tenantId: string;
  // Node coordinates for visual graph simulation
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
}

export interface OmniGraphEdge {
  id: string;
  tenantId: string;
  sourceId: string;
  sourceName: string;
  targetId: string;
  targetName: string;
  relationshipType: OmniRelationshipKind;
  strength: number; // 1 to 100
  direction: 'bidirectional' | 'unidirectional';
  visibility: RelationshipVisibility;
  circleIds: string[];
  tags: string[];
  status: 'active' | 'pending' | 'dormant' | 'archived';
  sentimentScore: number; // -1.0 to 1.0
  interactionCount: number;
  lastInteractionAt: string;
  aiNotes?: string;
  isMutual: boolean;
  createdAt: string;
}

export interface ContactConsentRecord {
  status: 'granted' | 'revoked' | 'pending';
  grantedAt: string;
  legalBasis: 'explicit_consent' | 'contractual_obligation' | 'legitimate_interest';
  scope: string[]; // e.g. ['email_comms', 'sms_marketing', 'crm_analytics']
  proofHash: string;
}

export interface ContactInteraction {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'chat_message' | 'financial_payment' | 'event_attendance' | 'note';
  title: string;
  description: string;
  timestamp: string;
  actorName: string;
  channel?: string;
  durationMinutes?: number;
  amount?: number;
  currency?: string;
}

export interface ContactOrderSummary {
  orderId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'refunded';
  date: string;
  productName: string;
}

export interface OmniUniversalContact {
  id: string;
  tenantId: string;
  ownerProfileId: string;
  source: ContactSource;
  name: string;
  displayName: string;
  avatarUrl: string;
  jobTitle?: string;
  organisation?: string;
  department?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  linkedOmniHandle?: string; // e.g. @fenol, @gideon
  relationshipType: OmniRelationshipKind;
  lifecycleStage: ContactLifecycleStage;
  circleIds: string[];
  tags: string[];
  notes: string;
  dealValue: number;
  currency: string;
  leadScore: number; // 0 - 100
  interactions: ContactInteraction[];
  orders: ContactOrderSummary[];
  messagesCount: number;
  eventsAttended: string[];
  consent: ContactConsentRecord;
  createdAt: string;
  updatedAt: string;
  lastContactedAt: string;
  isFavorite: boolean;
}

export interface OmniCircle {
  id: string;
  tenantId: string;
  ownerProfileId: string;
  name: string;
  description: string;
  category: CircleCategory;
  color: string;
  iconName: string;
  memberCount: number;
  memberProfileIds: string[];
  memberContactIds: string[];
  privacyLevel: 'private' | 'shared_with_members' | 'public';
  createdAt: string;
  updatedAt: string;
}

export interface AiRelationshipRecommendation {
  id: string;
  profileId: string;
  name: string;
  handle: string;
  avatarUrl: string;
  entityType: OmniEntityKind;
  mutualConnectionsCount: number;
  mutualCircles: string[];
  compatibilityScore: number; // 0 - 100
  rationale: string;
  recommendedRelationship: OmniRelationshipKind;
}

export interface AiFollowUpSuggestion {
  id: string;
  contactId: string;
  contactName: string;
  avatarUrl: string;
  relationshipType: OmniRelationshipKind;
  lastContactDaysAgo: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  recommendedAction: string;
  suggestedDraft?: string;
  dueDate: string;
}

export interface AiOpportunitySignal {
  id: string;
  contactId: string;
  contactName: string;
  organisation: string;
  title: string;
  estimatedValue: number;
  currency: string;
  probability: number; // 0 - 100
  rationale: string;
  triggerEvent: string;
}

export interface AiEngagementPattern {
  contactId: string;
  contactName: string;
  trend: 'increasing' | 'stable' | 'decreasing' | 'inactive';
  sentiment: 'positive' | 'neutral' | 'guarded' | 'enthusiastic';
  engagementScore: number; // 0 - 100
  riskOfChurn: boolean;
  notes: string;
}

export interface RelationshipAdminPolicies {
  id: string;
  tenantId: string;
  allowCrossTenantSearch: boolean;
  defaultRelationshipVisibility: RelationshipVisibility;
  enableAutomaticAiIntelligence: boolean;
  dataRetentionDays: number;
  requireExplicitConsentForImports: boolean;
  blockedDomainImports: string[];
  maxCirclesPerUser: number;
  enforceZeroKnowledgeGraphPrivacy: boolean;
}
