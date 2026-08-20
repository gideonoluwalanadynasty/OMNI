export type WhiteLabelCustomerType =
  | 'company'
  | 'university'
  | 'church'
  | 'government'
  | 'ngo'
  | 'media'
  | 'association'
  | 'community';

export type EcosystemMode = 'isolated_private' | 'omni_ecosystem_federated';

export type DomainVerificationStatus = 'verified' | 'pending_dns' | 'ssl_active' | 'failed';

export interface CustomDomainConfig {
  domain: string;
  status: DomainVerificationStatus;
  cnameRecord: string;
  txtVerificationToken: string;
  sslIssued: boolean;
  sslExpiresAt: string;
  primaryRedirect: boolean;
}

export interface WhiteLabelBranding {
  brandName: string;
  tagline: string;
  logoUrl: string;
  logoDarkUrl?: string;
  faviconUrl: string;
  primaryColor: string; // e.g. #3b82f6
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Outfit' | 'Cinzel' | 'Space Grotesk';
  customCss?: string;
  mobileAppIconUrl?: string;
  mobileSplashUrl?: string;
}

export interface TenantFeatureFlags {
  socialFeed: boolean;
  messagingDirect: boolean;
  spacesCommunities: boolean;
  commerceMarketplace: boolean;
  crmDirectory: boolean;
  creatorMonetization: boolean;
  aiAssistant: boolean;
  adsCampaigns: boolean;
  eventsWebinars: boolean;
  learningLms: boolean;
  voiceVideoMeetings: boolean;
  knowledgeWiki: boolean;
}

export interface WhiteLabelAiConfig {
  assistantName: string;
  assistantAvatar: string;
  personaTone: 'professional' | 'academic' | 'pastoral' | 'friendly' | 'analytical' | 'executive';
  knowledgeSources: {
    id: string;
    name: string;
    type: 'internal_docs' | 'policy_pdf' | 'wiki_articles' | 'crm_tickets' | 'external_url';
    itemCount: number;
    lastSynced: string;
    status: 'indexed' | 'syncing' | 'error';
  }[];
  customInstructions: string;
  allowedRoles: ('super_admin' | 'dept_admin' | 'employee' | 'member' | 'guest' | 'public')[];
  publicCustomerFacing: boolean;
  tokenMonthlyQuota: number;
  tokensConsumedThisMonth: number;
}

export interface EnterpriseDepartment {
  id: string;
  name: string;
  leadName: string;
  leadAvatar: string;
  memberCount: number;
  privateSpaceId: string;
  unreadCount: number;
}

export interface EnterpriseMember {
  id: string;
  tenantId: string;
  fullName: string;
  email: string;
  title: string;
  departmentId: string;
  role: 'tenant_owner' | 'dept_admin' | 'moderator' | 'member' | 'external_partner' | 'guest';
  avatarUrl: string;
  status: 'active' | 'invited' | 'suspended';
  joinedDate: string;
  lastActive: string;
  twoFactorEnabled: boolean;
  ssoLinked: boolean;
}

export interface EnterpriseAnnouncement {
  id: string;
  tenantId: string;
  title: string;
  summary: string;
  body: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  priority: 'routine' | 'important' | 'urgent_critical';
  targetAudience: 'all_organization' | 'department_only' | 'managers_only' | 'partners';
  departmentId?: string;
  publishedAt: string;
  acknowledgmentsCount: number;
  pinned: boolean;
}

export interface EnterpriseKnowledgeDoc {
  id: string;
  tenantId: string;
  title: string;
  category: 'Operations' | 'Security & Compliance' | 'Engineering' | 'HR & Culture' | 'Product Specs' | 'Mission & Sermons';
  snippet: string;
  content: string;
  authorName: string;
  version: string;
  lastUpdated: string;
  accessLevel: 'public_to_tenant' | 'confidential_exec' | 'dept_restricted';
  views: number;
  aiGroundingEnabled: boolean;
}

export interface EnterprisePartnerNetwork {
  id: string;
  tenantId: string;
  partnerOrgName: string;
  contactPerson: string;
  contactEmail: string;
  partnerType: 'Vendor' | 'Affiliate' | 'Academic Co-op' | 'Sponsor' | 'Gov Liaison';
  sharedSpacesCount: number;
  status: 'active_federation' | 'pending_handshake' | 'paused';
  crossOrgDMsAllowed: boolean;
}

export interface TenantAuditLog {
  id: string;
  tenantId: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetResource: string;
  ipAddress: string;
  status: 'success' | 'denied' | 'flagged';
  cryptographicHash: string;
}

export interface TenantBillingConfig {
  planId: 'starter_community' | 'growth_organization' | 'enterprise_sovereign' | 'mesh_federation';
  planName: string;
  monthlyBaseFee: number;
  billingCycle: 'monthly' | 'annual';
  revenueSharePercentToOMNI: number; // e.g. 5% or 10%
  resellerPartnerId?: string;
  resellerCommissionPercent?: number; // e.g. 15%
  usageMeters: {
    activeUsersCount: number;
    userLimit: number;
    storageUsedGb: number;
    storageLimitGb: number;
    aiTokensUsed: number;
    aiTokenLimit: number;
    bandwidthGb: number;
  };
  invoices: {
    id: string;
    period: string;
    amountDue: number;
    status: 'paid' | 'pending' | 'overdue';
    pdfUrl: string;
  }[];
}

export interface WhiteLabelTenant {
  id: string;
  slug: string;
  customerType: WhiteLabelCustomerType;
  ecosystemMode: EcosystemMode;
  branding: WhiteLabelBranding;
  domains: CustomDomainConfig[];
  features: TenantFeatureFlags;
  aiConfig: WhiteLabelAiConfig;
  departments: EnterpriseDepartment[];
  billing: TenantBillingConfig;
  status: 'active' | 'provisioning' | 'suspended';
  createdAt: string;
  ownerEmail: string;
  memberCount: number;
  activeCommunitiesCount: number;
  securityCompliance: {
    soc2Compliant: boolean;
    hipaaCompliant: boolean;
    gdprCompliant: boolean;
    dataResidencyRegion: 'US-East' | 'EU-Central' | 'APAC-Tokyo' | 'Sovereign-On-Prem';
    dataRetentionDays: number;
  };
}

export interface WhiteLabelTestSuiteResult {
  id: string;
  name: string;
  category: 'isolation' | 'branding' | 'dns_routing' | 'rbac' | 'billing' | 'federation';
  status: 'passed' | 'failed' | 'running';
  details: string;
  executionMs: number;
}
