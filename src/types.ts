export type UserRole = 'owner' | 'admin' | 'member' | 'superadmin' | 'administrator' | 'manager' | 'accountant' | 'marketer' | 'developer' | 'seller' | 'support' | 'analyst' | 'viewer';

export type OMNIProfileType = 'personal' | 'professional' | 'creator' | 'seller' | 'developer' | 'affiliate' | 'investor';

export interface OMNIProfile {
  id: string;
  type: OMNIProfileType;
  displayName: string;
  bio?: string;
  metadata?: Record<string, any>;
}

export interface OMNIVerificationStatus {
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean; // KYC
  organizationVerified: boolean; // KYB
  businessVerified: boolean; // KYB
}

export interface ActiveSession {
  id: string;
  deviceName: string;
  ipAddress: string;
  browser: string;
  location: string;
  createdAt: string;
  isCurrent: boolean;
}

export interface LoginHistoryEntry {
  id: string;
  timestamp: string;
  ipAddress: string;
  browser: string;
  location: string;
  status: 'success' | 'failed' | 'suspicious' | 'mfa_pending';
  type: 'password' | 'mfa' | 'passkey' | 'sso';
}

export interface OMNISecurity {
  recoveryCodes: string[];
  activeSessions: ActiveSession[];
  loginHistory: LoginHistoryEntry[];
  passkeys: { id: string; name: string; createdAt: string }[];
  ssoConfig?: { idpName: string; entityId: string; ssoUrl: string; isEnabled: boolean };
}

export interface ConnectedAppConsent {
  appId: string;
  appName: string;
  scopes: string[];
  authorizedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  isMfaEnabled: boolean;
  mfaSecretSimulated?: string;
  role: UserRole;
  currentTenantId: string;
  createdAt: string;
  // OMNI Passport Extensions
  language: string;
  country: string;
  timezone: string;
  preferredCurrency: string;
  verificationStatus: OMNIVerificationStatus;
  profiles: OMNIProfile[];
  currentProfileType: OMNIProfileType;
  security: OMNISecurity;
  connectedApps: ConnectedAppConsent[];
}

export type OrgStatus = 'active' | 'suspended' | 'trial';
export type BillingPlan = 'free' | 'growth' | 'enterprise';
export type OrgType = 'company' | 'school' | 'NGO' | 'government' | 'merchant' | 'creator_team' | 'agency' | 'reseller' | 'white_label';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  tenantId: string;
  status: OrgStatus;
  orgType: OrgType;
  logoUrl?: string;
  billingPlan: BillingPlan;
  walletBalance: number;
  apiKey: string;
  webhookUrl: string;
  subdomains: string[];
  createdAt: string;
  // Trust Extensions
  kybVerified: boolean;
  kybProvider?: string;
  kybCheckedAt?: string;
}

export interface Membership {
  userId: string;
  organizationId: string;
  role: UserRole;
  permissions: string[];
}

export interface AppRegistration {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  description: string;
  status: 'active' | 'beta' | 'disabled';
  category: 'core' | 'finance' | 'productivity' | 'developer' | 'infrastructure';
  url?: string;
  isNative: boolean;
  author: string;
  createdAt: string;

  // Expanded Registry Properties
  owner?: string;
  routes?: { primary: string; path: string };
  subdomain?: string;
  externalUrl?: string;
  requiredScopes?: string[];
  optionalScopes?: string[];
  supportedCountries?: string[];
  supportedLanguages?: string[];
  subscriptionRequirements?: string;
  billingModel?: 'free' | 'saas_fixed' | 'pay_as_you_go' | 'revenue_share';
  whiteLabelCapability?: boolean;
  resellerCapability?: boolean;
  affiliateCapability?: boolean;
  aiCapability?: boolean;
  mobileCapability?: boolean;
  apiInfo?: {
    version: string;
    endpoints: string[];
    documentationUrl?: string;
  };
  webhookConfig?: {
    deliveryUrl: string;
    subscribedEvents: string[];
  };
  featureFlags?: string[];
}

export type WebhookEventTopic = 
  | 'user.created'
  | 'organization.created'
  | 'subscription.started'
  | 'payment.completed'
  | 'affiliate.conversion'
  | 'reseller.created'
  | 'order.completed'
  | 'domain.connected'
  | 'user.deleted'
  // OMNI AI Domain Events (Prompt 1)
  | 'ai.request.started'
  | 'ai.request.completed'
  | 'ai.request.failed'
  | 'ai.usage.recorded'
  | 'ai.agent.created'
  | 'ai.agent.run.started'
  | 'ai.agent.action.requested'
  | 'ai.agent.action.approved'
  | 'ai.agent.action.executed'
  | 'ai.knowledge.indexed'
  | 'ai.artifact.created'
  | 'ai.marketplace.item.published';

export interface WebhookDeliveryLog {
  id: string;
  appId: string;
  eventTopic: WebhookEventTopic;
  payload: any;
  endpoint: string;
  timestamp: string;
  statusCode: number;
  responseBody: string;
  deliverySecretSigned: string;
  idempotencyKey: string;
  attemptNumber: number;
  nextRetryAt?: string | null;
  status: 'success' | 'failed' | 'retrying';
}

export interface DomainEvent {
  id: string;
  topic: WebhookEventTopic;
  payload: any;
  timestamp: string;
}

export interface LedgerEntry {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  referenceId: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'security' | 'billing' | 'action';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface ApiCredential {
  id: string;
  organizationId: string;
  label: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Webhook {
  id: string;
  organizationId: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  secret: string;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  isEnabled: boolean;
  tenantScope: 'all' | 'growth-enterprise' | 'enterprise-only';
  createdAt: string;
  isGlobal?: boolean;
  targetTenants?: string[];
  targetApps?: string[];
  targetCountries?: string[];
  targetPlans?: string[];
  targetUserCohorts?: string[];
}

export interface SystemNode {
  name: string;
  region: string;
  load: number; // 0-100
  status: 'operational' | 'degraded' | 'offline';
  latencyMs: number;
  requestCount: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface Incident {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'critical' | 'major' | 'minor';
  timestamp: string;
}

// ==========================================
// OMNI AI OPERATING SYSTEM & INTELLIGENCE ROUTER
// ==========================================

export type AIProviderType = 
  | 'first_party_gemini'
  | 'openai_compatible'
  | 'anthropic_compatible'
  | 'managed_third_party'
  | 'open_weights'
  | 'self_hosted'
  | 'enterprise_private'
  | 'future_omni';

export interface AIProviderHealth {
  latencyMs: number;
  errorRate: number;
  lastChecked: string;
  consecutiveFailures: number;
  circuitBreakerState: 'closed' | 'half_open' | 'open';
  lastFailureReason?: string;
  cooldownUntil?: string;
}

export interface AIProvider {
  id: string;
  name: string;
  providerType: AIProviderType;
  status: 'connected' | 'disconnected' | 'degraded' | 'error';
  authType: 'system_env' | 'byok' | 'mutual_tls' | 'oauth' | 'none';
  apiKeyConfigured: boolean;
  apiKeyMasked?: string;
  endpointUrl: string;
  supportedModalities: ('text' | 'image' | 'audio' | 'video' | 'embedding' | 'code')[];
  health: AIProviderHealth;
  isCustomByom?: boolean;
  tenantId?: string;
}

export type AIModality = 'text' | 'image' | 'audio' | 'video' | 'embedding' | 'code';
export type AIRoutingLatencyClass = 'ultra_low' | 'low' | 'medium' | 'batch';
export type AIRoutingPrivacyClass = 'public' | 'zero_retention' | 'hipaa' | 'sovereign_enclave';
export type AIModelLifecycle = 'ga' | 'preview' | 'deprecated' | 'sunset';

export interface AICostMetadata {
  inputPer1M: number;
  outputPer1M: number;
  fixedPerCall?: number;
  currency: string;
}

export interface AIModel {
  id: string;
  name: string;
  providerId: string;
  type: 'text' | 'image' | 'speech' | 'transcription' | 'vision' | 'embeddings' | 'reranking';
  modalities: AIModality[];
  reasoningCapability: 'low' | 'medium' | 'high' | 'extreme';
  contextCapability: number;
  toolSupport: boolean;
  streaming: boolean;
  structuredOutput: boolean;
  imageSupport: boolean;
  audioSupport: boolean;
  videoSupport: boolean;
  embeddings: boolean;
  latencyClass: AIRoutingLatencyClass;
  costMetadata: AICostMetadata;
  availability: 'operational' | 'degraded' | 'unavailable' | 'unconfigured';
  geography: 'global' | 'eu' | 'us' | 'apac' | 'private';
  privacyClassification: AIRoutingPrivacyClass;
  lifecycleStatus: AIModelLifecycle;
  fallbackModelId?: string;
  secondaryFallbackModelId?: string;
  isLocal: boolean;
  contextLength: number;
  costPer1kInput: number;
  costPer1kOutput: number;
  status: 'active' | 'deprecated' | 'offline';
}

export type OmniRoutingProfile = 
  | 'economy'
  | 'balanced'
  | 'max_intelligence'
  | 'privacy_priority'
  | 'speed_priority'
  | 'expert_manual';

export type OmniRoutingTaskType = 
  | 'chat'
  | 'code'
  | 'reasoning'
  | 'creative'
  | 'fast_query'
  | 'search_grounded'
  | 'deep_research'
  | 'vision'
  | 'audio_transcribe'
  | 'embeddings';

export interface ByokCredential {
  id: string;
  organizationId: string;
  providerId: string;
  providerName: string;
  maskedKey: string;
  encryptedKey?: string;
  label: string;
  status: 'active' | 'revoked' | 'invalid' | 'rate_limited';
  allowedAppIds: string[];
  monthlySpendCapUsd?: number;
  currentMonthSpentUsd: number;
  createdAt: string;
  updatedAt: string;
  lastTestedAt?: string;
  testResult?: {
    success: boolean;
    latencyMs: number;
    message: string;
  };
}

export interface ByomEndpoint {
  id: string;
  organizationId: string;
  name: string;
  endpointUrl: string;
  protocol: 'openai_v1' | 'ollama' | 'vllm' | 'tgi' | 'custom_rest';
  modelIdentifier: string;
  maskedAuthHeader: string;
  customHeaders?: Record<string, string>;
  capabilities: {
    contextLength: number;
    streaming: boolean;
    tools: boolean;
    vision: boolean;
    latencyClass: AIRoutingLatencyClass;
  };
  privacyClassification: AIRoutingPrivacyClass;
  healthStatus: 'healthy' | 'degraded' | 'offline' | 'untested';
  latencyMs: number;
  lastHealthCheck: string;
  createdAt: string;
}

export interface AiCircuitBreakerRecord {
  providerId: string;
  circuitState: 'closed' | 'half_open' | 'open';
  totalRequests: number;
  failedRequests: number;
  avgLatencyMs: number;
  lastFailureTimestamp?: string;
  lastFailureReason?: string;
  cooldownUntil?: string;
}

export interface AiCacheRecord {
  id: string;
  cacheKey: string;
  tenantId: string;
  userId: string;
  modelId: string;
  promptSummary: string;
  responseSnippet: string;
  tokensSaved: number;
  costSaved: number;
  hitCount: number;
  lastAccessedAt: string;
  expiresAt: string;
}

export interface AIAgent {
  id: string;
  name: string;
  type: 'OMNI Assistant' | 'Seller AI' | 'Business AI' | 'Ads AI' | 'Creator AI' | 'Developer AI' | 'Support AI' | 'Logistics AI' | 'Learning AI' | 'Finance Analysis AI';
  description: string;
  basePrompt: string;
  defaultModelId: string;
  autonomyLevel: number; // 0 to 5
  allowedTools: string[];
  requiredScopes: string[];
  maxMonetaryLimit: number;
  approvalRequiredAbove: number;
  avatar: string; // Lucide Icon or character
}

export interface AIPrompt {
  id: string;
  name: string;
  template: string;
  category: 'customer_support' | 'analytics' | 'content_generation' | 'code_generation' | 'financial' | 'general';
  version: string;
  variables: string[];
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  parametersSchema: string; // JSON String or description
  isHighRisk: boolean;
  category: string;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: 'document' | 'database' | 'website' | 'cloud_storage' | 'app_record';
  sizeKb: number;
  chunkCount: number;
  status: 'indexed' | 'indexing' | 'failed';
  orgId: string;
  urlOrPath?: string;
  createdAt: string;
}

export interface AICostRecord {
  id: string;
  timestamp: string;
  modelId: string;
  providerId?: string;
  routingMode?: 'omni_auto' | 'expert_manual';
  routingProfile?: OmniRoutingProfile;
  inputTokens: number;
  outputTokens: number;
  mediaUsage?: {
    imagesCount?: number;
    audioSeconds?: number;
  };
  latencyMs?: number;
  providerReportedCost?: number;
  estimatedInternalCost?: number;
  omniUsageUnitsCharged?: number;
  requestCount: number;
  organizationId: string;
  appId: string;
  agentId: string;
  userId: string;
  estimatedCost: number;
  status?: 'success' | 'fallback_used' | 'cached' | 'blocked_budget' | 'failed';
  fallbackChain?: {
    attemptedModel: string;
    failureReason: string;
    finalModel: string;
  };
  cacheHit?: boolean;
}

export interface AIBudgetConfig {
  id: string;
  organizationId: string;
  monthlyLimit: number;
  currentSpent: number;
  alertThreshold: number; // e.g. 80 for 80%
  alertsTriggered: boolean;
}

export interface AIAutonomyRule {
  id: string;
  scopeType: 'tenant' | 'app' | 'agent' | 'tool';
  scopeId: string; // matches tenantId, appId, agentId or toolId
  maxAutonomyLevel: number; // 0 to 5
  notes?: string;
}

export interface AIApprovalTask {
  id: string;
  agentId: string;
  agentName: string;
  toolId: string;
  toolName: string;
  arguments: Record<string, any>;
  proposedPayload: any;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
  requestDate: string;
  decisionDate?: string;
  deciderUserId?: string;
  modifiedArguments?: Record<string, any>;
  organizationId: string;
  appId: string;
  estimatedCost: number;
  policyCheckSummary: string;
}

export interface AIAuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  agentId: string;
  agentName: string;
  toolId: string;
  toolName: string;
  policyDecision: string;
  resultSummary: string;
  status: 'success' | 'failed' | 'blocked' | 'pending_approval';
  approvalState: 'not_applicable' | 'pending' | 'approved' | 'rejected' | 'modified_and_approved';
  organizationId: string;
  estimatedCost: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  agentId?: string;
  // If this message represents a tool call/approval status:
  toolCallId?: string;
  toolName?: string;
  toolStatus?: 'pending' | 'executing' | 'completed' | 'failed' | 'needs_approval';
}

export interface AIConversation {
  id: string;
  agentId: string;
  userId: string;
  organizationId: string;
  appId: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface OMNIState {
  user: User | null;
  organizations: Organization[];
  currentOrgId: string | null;
  apps: AppRegistration[];
  ledger: LedgerEntry[];
  notifications: Notification[];
  apiCredentials: ApiCredential[];
  webhooks: Webhook[];
  webhookLogs: WebhookDeliveryLog[];
  domainEvents: DomainEvent[];
  featureFlags: FeatureFlag[];
  auditLogs: AuditLog[];
  systemNodes: SystemNode[];
  incidents: Incident[];
  activeView: string; // 'home' | 'login' | 'signup' | 'onboarding' | 'dashboard' | 'app' | 'settings' | 'security' | 'admin' | 'status'
  activeAppId: string | null; // Currently selected micro-app (e.g. 'Pay', 'Market')
  searchQuery: string;
  theme: 'light' | 'dark';

  // AI Operating System State Extensions
  aiProviders: AIProvider[];
  aiModels: AIModel[];
  aiAgents: AIAgent[];
  aiPrompts: AIPrompt[];
  aiTools: AITool[];
  aiKnowledgeSources: KnowledgeSource[];
  aiCostRecords: AICostRecord[];
  aiBudgets: AIBudgetConfig[];
  aiAutonomyRules: AIAutonomyRule[];
  aiApprovalTasks: AIApprovalTask[];
  aiAuditLogs: AIAuditLog[];
  aiConversations: AIConversation[];
  byokCredentials: ByokCredential[];
  byomEndpoints: ByomEndpoint[];
  aiCircuitBreakers: Record<string, AiCircuitBreakerRecord>;
  aiCacheRecords: AiCacheRecord[];
  activeRoutingProfile: OmniRoutingProfile;

  // OMNI Financial Accounting Engine State
  doubleEntryLedger: DoubleEntryLedgerEntry[];
  omniWallets: OmniWallet[];
  paymentIntegrations: PaymentIntegration[];
  billableProducts: BillableProduct[];
  subscriptions: SubscriptionRecord[];
  invoices: InvoiceRecord[];
  payouts: PayoutRecord[];
  reconciliationLogs: ReconciliationLog[];

  // OMNI Affiliate, Partner, Agent and Growth Network State
  affiliates: Affiliate[];
  affiliateOpportunities: AffiliateOpportunity[];
  affiliateClicks: AffiliateClick[];
  affiliateLeads: AffiliateLead[];
  affiliateConversions: AffiliateConversion[];
  affiliateCommissions: AffiliateCommission[];
  growthRewards: GrowthReward[];
  attributionSettings: AttributionSettings;
  fraudAlerts: AffiliateFraudAlert[];

  // OMNI White-Label, Reseller and Platform-Builder Engine State
  tenantPlatforms: TenantPlatform[];
  resellerNodes: ResellerNode[];
  resellerEconomics: ResellerEconomics[];
  superAdminControls: SuperAdminWhiteLabelControl;

  // OMNI Shared Horizontal Services State
  notificationTemplates: NotificationTemplate[];
  notificationPreferences: NotificationPreference[];
  notificationDeliveryLogs: NotificationDeliveryLog[];
  omniInboxMessages: OmniInboxMessage[];
  analyticsEvents: AnalyticsEvent[];
  privacyConsentConfigs: PrivacyConsentConfig[];
  entityTrustScores: EntityTrustScore[];
  riskEvents: RiskEvent[];
  savedSearches: SavedSearch[];
  searchHistory: SearchHistoryEntry[];

  // OMNI Developer Platform & Third-Party Ecosystem State
  developerProfiles: DeveloperProfile[];
  marketplaceApps: MarketplaceApp[];
  appInstallations: AppInstallation[];
  sandboxApiRequests: SandboxApiRequest[];
  developerEarningLogs: DeveloperEarningLog[];

  // OMNI Capital and Ownership State
  shareholders: ShareholderProfile[];
  capTable: CapTableConfig;
  valuationRecords: ValuationRecord[];
  investmentOfferings: InvestmentOffering[];
  exchangeCredentials: ExchangeCredential[];

  // OMNI Governance Policies & Operations Management
  governancePolicies: GovernancePolicy[];
  adminApprovalTasks: AdminApprovalTask[];

  // OMNI Browser Sovereign Digital Workspace & Security State
  browserTabs: OmniBrowserTab[];
  browserWorkspaces: OmniBrowserWorkspace[];
  activeBrowserWorkspaceId: string;
  activeBrowserTabId: string;
  browserBookmarks: OmniBrowserBookmark[];
  browserBookmarkFolders: OmniBrowserBookmarkFolder[];
  browserHistory: OmniBrowserHistoryEntry[];
  browserDownloads: OmniBrowserDownloadItem[];
  browserExtensions: OmniBrowserExtension[];
  browserPrivacyShields: OmniBrowserPrivacyShield[];
  browserVpnNodes: OmniBrowserVpnNode[];
  browserVpnState: OmniBrowserVpnState;
  browserSearchEngines: OmniBrowserSearchEngine[];
  browserSettings: OmniBrowserSettings;
  browserReaderContent: Record<string, OmniBrowserReaderContent>;
  browserSecurityAuditLogs: OmniBrowserSecurityAuditLog[];
  browserTabGroups: OmniBrowserTabGroup[];
  browserSavedSessions: OmniBrowserSavedSession[];
  browserProjectSpaces: OmniBrowserProjectSpace[];
  browserReadingList: OmniBrowserReadingListItem[];
  browserSyncConfig: OmniBrowserSyncConfig;
  browserSyncPayloads: OmniBrowserSyncPayload[];
  browserAuthorizedDevices: OmniBrowserAuthorizedDevice[];
  browserSecuritySessions: OmniBrowserSecuritySession[];
  browserSuspiciousAlerts: OmniBrowserSuspiciousAlert[];
  activeBrowserPlatformAdapter: BrowserPlatformType;
}

export interface DoubleEntryLedgerEntry {
  id: string;
  timestamp: string;
  debitAccount: string; // e.g. platform, merchant_org_dynasty, customer_usr_gideon
  creditAccount: string; // e.g. reseller_oluwalana, affiliate_gideon
  debitType: 'customers' | 'merchants' | 'affiliates' | 'resellers' | 'creators' | 'platform' | 'tenants' | 'refunds' | 'promotional credits';
  creditType: 'customers' | 'merchants' | 'affiliates' | 'resellers' | 'creators' | 'platform' | 'tenants' | 'refunds' | 'promotional credits';
  amount: number;
  currency: string;
  description: string;
  referenceId: string;
  verificationHash: string; // Cryptographic ledger seal
  status: 'completed' | 'pending' | 'failed';
  isReconciled: boolean;
}

export interface OmniWallet {
  id: string;
  tenantId: string;
  availableBalance: number;
  pendingBalance: number;
  affiliateEarnings: number;
  resellerEarnings: number;
  refundsTotal: number;
  creditsBalance: number; // separated platform credits
  rewardsBalance: number;
  withdrawalsTotal: number;
  currency: string;
}

export interface PaymentIntegration {
  id: string;
  tenantId: string;
  provider: 'stripe' | 'paypal' | 'paystack' | 'flutterwave' | 'mobile_money' | 'bank_transfer' | 'custom';
  label: string;
  apiKeySimulated: string;
  isEnabled: boolean;
  countries: string[];
  currencies: string[];
  transactionTypes: ('one-time' | 'subscription' | 'usage' | 'payout')[];
}

export interface BillableProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePriceMonthly: number;
  basePriceAnnual: number;
  entitlements: string[];
}

export interface SubscriptionRecord {
  id: string;
  tenantId: string;
  productId: string;
  productName: string;
  status: 'trial' | 'active' | 'grace_period' | 'unpaid' | 'cancelled';
  billingCycle: 'monthly' | 'annual';
  price: number;
  startDate: string;
  endDate: string;
  trialEndDate?: string;
  cancelAtPeriodEnd: boolean;
  couponApplied?: string;
  discountPercentage?: number;
  seatsCount: number;
  metricsUsed: {
    apiCalls: number;
    storageGb: number;
    aiTokens: number;
    adClicks: number;
  };
}

export interface InvoiceRecord {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  type: 'invoice' | 'receipt' | 'credit_note';
  status: 'paid' | 'unpaid' | 'draft' | 'refunded' | 'void';
  amount: number;
  taxAmount: number;
  subtotal: number;
  discountAmount: number;
  currency: string;
  dueDate: string;
  issuedDate: string;
  billingEmail: string;
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];
  taxJurisdiction: string;
  taxRate: number;
  notes?: string;
}

export interface PayoutRecord {
  id: string;
  recipientId: string;
  recipientType: 'seller' | 'affiliate' | 'reseller' | 'creator' | 'service_provider';
  recipientName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'on_hold' | 'failed' | 'risk_rejected';
  holdReason?: string;
  isVerified: boolean;
  riskReviewScore: number;
  payoutMethod: string;
  timestamp: string;
  reference: string;
}

export interface ReconciliationLog {
  id: string;
  timestamp: string;
  checkedRecordsCount: number;
  unbalancedEntriesCount: number;
  discrepanciesDetected: string[];
  status: 'balanced' | 'integrity_breached';
  details: string;
}

export type PartnerType = 'affiliate' | 'influencer' | 'agency' | 'referral_partner' | 'sales_agent' | 'regional_representative';

export interface Affiliate {
  id: string;
  userId: string;
  name: string;
  email: string;
  partnerType: PartnerType;
  affiliateId: string; // public identifier / referral code (e.g. 'GIDEON2026')
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  referralLink: string;
  qrCodeUrl: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'suspended';
  clicksCount: number;
  leadsCount: number;
  conversionsCount: number;
  earningsPending: number;
  earningsApproved: number;
  earningsRejected: number;
}

export interface AffiliateOpportunity {
  id: string;
  appName: string;
  productName: string;
  description: string;
  commissionType: 'percentage' | 'fixed';
  commissionValue: number; // e.g. 20 for 20%
  isRecurring: boolean; // recurring commission on subscriptions
  recurringPeriodMonths?: number;
  promoCode?: string;
  payoutFrequency: string; // 'Monthly' etc.
  category: string;
}

export interface AffiliateClick {
  id: string;
  affiliateId: string;
  opportunityId: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  referer: string;
  campaign?: string;
  country: string;
  isSpam: boolean;
  cookieStuffed: boolean;
}

export interface AffiliateLead {
  id: string;
  clickId: string;
  affiliateId: string;
  opportunityId: string;
  email: string;
  timestamp: string;
  status: 'pending' | 'converted' | 'expired';
  customerType: 'individual' | 'enterprise';
}

export interface AffiliateConversion {
  id: string;
  leadId?: string;
  clickId?: string;
  affiliateId: string;
  opportunityId: string;
  amount: number;
  currency: string;
  timestamp: string;
  orderId: string;
  planId: string;
  customerType: 'individual' | 'enterprise';
  country: string;
  campaign?: string;
  isSuspicious: boolean;
  fraudType?: string;
}

export interface AffiliateCommission {
  id: string;
  affiliateId: string;
  conversionId: string;
  opportunityId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  payoutId?: string;
  isRecurring: boolean;
  createdAt: string;
  approvedAt?: string;
}

export interface GrowthReward {
  id: string;
  recipientId: string; // can be affiliateId, merchantId, or userId
  recipientName: string;
  points: number; // "Do not call reward points shares"
  activityType: 'verified_customer_acquisition' | 'merchant_acquisition' | 'completed_sales' | 'retention_milestone' | 'useful_content' | 'geographic_expansion' | 'validated_business_development';
  description: string;
  timestamp: string;
  status: 'allocated' | 'redeemed' | 'cancelled';
  redemptionMethod?: string;
}

export interface AttributionSettings {
  model: 'first_click' | 'last_click' | 'coupon' | 'app_specific';
  windowDays: number;
}

export interface AffiliateFraudAlert {
  id: string;
  timestamp: string;
  affiliateId: string;
  affiliateName: string;
  type: 'self_referral' | 'fake_account' | 'click_spam' | 'cookie_stuffing' | 'suspicious_conversion_pattern' | 'duplicate_identity' | 'refund_abuse';
  severity: 'low' | 'medium' | 'high';
  description: string;
  status: 'flagged' | 'dismissed' | 'resolved_suspended';
  evidence: string;
}

// OMNI White-Label, Reseller & Platform Builder Types
export type WhiteLabelLevel = 'level_1_app' | 'level_2_suite' | 'level_3_super_platform';

export interface ColorSystem {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  accent: string;
  text: string;
}

export interface TypographyConfig {
  displayFont: string;
  bodyFont: string;
  baseSize: string;
  lineHeight: number;
}

export interface TerminologyConfig {
  platformName: string;
  appsLabel: string;
  merchantLabel: string;
  customerLabel: string;
  walletLabel: string;
  affiliateLabel: string;
}

export interface LegalPage {
  title: string;
  slug: string;
  content: string;
}

export interface DomainConfig {
  subdomain: string;
  customDomain?: string;
  appDomain?: string;
  dnsStatus: 'verified' | 'unverified' | 'propagating';
  txtRecordName: string;
  txtRecordValue: string;
  cnameTarget: string;
  sslStatus: 'active' | 'generating' | 'expired' | 'inactive';
  canonicalSelection: 'subdomain' | 'custom' | 'app_custom';
}

export interface WhiteLabelTemplate {
  id: string;
  name: string;
  category: string;
  layout: 'sidebar' | 'topbar' | 'bento' | 'minimalist_cards';
  sections: string[];
  colorSystem: ColorSystem;
  typography: TypographyConfig;
  terminology: TerminologyConfig;
  appIds: string[];
  homepageHeadline: string;
  homepageSubheadline: string;
  footerText: string;
  emailHeaderHex: string;
  legalPages: LegalPage[];
}

export interface TenantPlatform {
  id: string;
  name: string;
  ownerOrgId: string;
  ownerUserId: string;
  level: WhiteLabelLevel;
  slug: string;
  logoUrl?: string;
  faviconUrl?: string;
  templateId: string;
  apps: string[];
  domain: DomainConfig;
  branding: {
    colorSystem: ColorSystem;
    typography: TypographyConfig;
    terminology: TerminologyConfig;
    homepageHeadline: string;
    homepageSubheadline: string;
    footerText: string;
    emailHeaderHex: string;
    navigationItems: { label: string; href: string }[];
  };
  countries: string[];
  currencies: string[];
  languages: string[];
  pricing: {
    baseMonthlyFee: number;
    revenueSharePercent: number;
    payoutMethod: string;
  };
  commissions: {
    referralRatePercent: number;
    minimumCommitment: number;
  };
  analytics: {
    visitors24h: number;
    registrations30d: number;
    volume30d: number;
  };
  status: 'active' | 'paused' | 'onboarding';
  createdAt: string;
}

export interface ResellerNode {
  id: string;
  name: string;
  type: 'omni' | 'master_reseller' | 'reseller' | 'tenant' | 'end_customer';
  parentId: string | null;
  orgId?: string;
  status: 'active' | 'suspended';
  level: number;
}

export interface ResellerEconomics {
  id: string;
  resellerNodeId: string;
  wholesalePriceUsd: number;
  resellerMarkupPercent: number;
  recurringRevenueSharePercent: number;
  commissionPercent: number;
  minimumCommitmentUsd: number;
  tierPricing: { maxTenants: number; costPerTenantUsd: number }[];
}

export interface SuperAdminWhiteLabelControl {
  permittedApps: string[];
  minimumMonthlyPriceUsd: number;
  defaultRevenueSharePercent: number;
  allowedCountries: string[];
  resourceLimits: {
    maxStorageGb: number;
    maxTenantsPerReseller: number;
    maxDomainsPerTenant: number;
  };
  brandingRestrictions: {
    customFaviconsAllowed: boolean;
    poweredByOmniFooterRequired: boolean;
  };
  policyRequirements: {
    mfaRequiredForOperators: boolean;
    kybRequiredBeforeLaunch: boolean;
  };
}

// ==========================================
// OMNI Notification, Inbox, Analytics, Privacy & Trust Systems
// ==========================================

export interface NotificationTemplate {
  id: string;
  tenantId: string | null; // null for global standard templates
  category: 'system' | 'billing' | 'security' | 'marketing' | 'support' | 'custom';
  titleTemplate: string; // e.g. "Welcome to {{platformName}}!"
  bodyTemplate: string; // e.g. "Hi {{name}}, your subscription started on {{date}}."
  language: string; // e.g. "en_US", "es_ES", "sw_KE"
  branding: {
    headerColor: string;
    logoUrl?: string;
    footerText?: string;
  };
}

export interface NotificationPreference {
  userId: string;
  tenantId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  webhookEnabled: boolean;
  categoryPreferences: Record<string, boolean>; // category: enabled
}

export interface NotificationDeliveryLog {
  id: string;
  tenantId: string;
  userId: string;
  recipient: string; // email, phone, webhook endpoint, or push token
  channel: 'in_app' | 'email' | 'sms' | 'push' | 'webhook';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  content: string;
  status: 'pending' | 'sent' | 'failed' | 'queued' | 'retrying';
  retryCount: number;
  maxRetries: number;
  errorLog?: string;
  scheduledAt?: string;
  sentAt?: string;
}

export interface OmniInboxMessage {
  id: string;
  tenantId: string;
  userId: string;
  appId: string; // Application registering this message type
  messageType: 'announcement' | 'direct_message' | 'alert' | 'ticket_update';
  subject: string;
  body: string;
  isRead: boolean;
  isArchived: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  tenantId: string;
  userId?: string;
  appId: string;
  eventType: 'page_view' | 'signup' | 'app_open' | 'subscription_started' | 'purchase_completed' | 'referral_conversion' | 'ad_click' | 'course_completed' | string;
  timestamp: string;
  metadata: Record<string, any>; // e.g. amount, pageUrl, referrer, duration
  country?: string;
  userAgent?: string;
}

export interface PrivacyConsentConfig {
  userId: string;
  tenantId: string;
  consentGrantedAt: string;
  analyticsEnabled: boolean;
  marketingEnabled: boolean;
  dataMinimizationEnabled: boolean;
  regionalSchema: 'GDPR' | 'CCPA' | 'HIPAA' | 'standard';
}

export interface ReputationSignal {
  id: string;
  type: 'positive' | 'negative';
  source: string; // e.g. "double-entry", "fraud-checker", "app_pay"
  scoreImpact: number; // e.g. +15 or -30
  reasonCode: string; // e.g. "ON_TIME_RECONCILIATION", "CHARGEBACK_RECEIVED"
  description: string;
  timestamp: string;
}

export interface TrustAppeal {
  id: string;
  reason: string;
  evidenceUrl?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  reviewedAt?: string;
}

export interface EntityTrustScore {
  id: string; // tenantId, userId, or appId
  ownerId: string;
  entityName: string;
  entityType: 'buyer' | 'seller' | 'business' | 'affiliate' | 'creator' | 'developer';
  score: number; // 0 to 100
  level: 'excellent' | 'good' | 'neutral' | 'fair' | 'high_risk';
  signals: ReputationSignal[];
  appeals: TrustAppeal[];
}

export interface RiskEvent {
  id: string;
  tenantId: string;
  appId: string;
  userId?: string;
  riskType: 'rapid_payout_velocity' | 'mismatched_bin_country' | 'duplicate_session_ip' | 'unusual_ledger_amount' | 'repeated_mfa_failures' | 'referral_circle';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  triggerPayload: Record<string, any>;
  status: 'active_alert' | 'reviewing' | 'resolved' | 'suppressed';
  timestamp: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  query: string;
  filters: Record<string, any>;
  name: string;
  createdAt: string;
}

export interface SearchHistoryEntry {
  id: string;
  userId: string;
  query: string;
  timestamp: string;
}

// --- PROMPT 9: DEVELOPER PLATFORM & THIRD-PARTY MARKETPLACE TYPES ---

export interface DeveloperProfile {
  id: string;
  userId: string;
  companyName: string;
  developerWebsite: string;
  status: 'pending_verification' | 'verified' | 'suspended';
  apiKey: string;
  oauthClientId: string;
  oauthClientSecret: string;
  webhookUrl: string;
  registeredAt: string;
  earningsBalanceUsd: number;
}

export type MarketplaceCategory = 'integration' | 'extension' | 'app' | 'theme' | 'ai_agent' | 'automation_template' | 'connector';

export interface MarketplaceApp {
  id: string;
  developerId: string;
  developerName: string;
  name: string;
  slug: string;
  category: MarketplaceCategory;
  shortDescription: string;
  longDescription: string;
  screenshots: string[];
  manifest: {
    apiVersion: string;
    entryPoint: string;
    requestedScopes: string[];
    webhooksEnabled: boolean;
  };
  privacyPolicyUrl: string;
  pricingType: 'free' | 'subscription' | 'one_time' | 'usage';
  priceAmount: number;
  revenueSharePercent: number; // e.g. 80 meaning 80% to developer, 20% to OMNI
  supportEmail: string;
  targetCountries: string[];
  status: 'submitted' | 'automated_check_passed' | 'security_review' | 'policy_review' | 'approved' | 'rejected' | 'published';
  reviewNotes?: string;
  rating: number;
  installCount: number;
  createdAt: string;
}

export interface AppInstallation {
  id: string;
  tenantId: string;
  appId: string;
  approvedScopes: string[];
  status: 'active' | 'revoked';
  installedBy: string;
  installedAt: string;
  revokedAt?: string;
}

export interface SandboxApiRequest {
  id: string;
  apiKey: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  requestPayload: string;
  responsePayload: string;
  statusCode: number;
  tenantIsolationCheck: 'PASS_ENFORCED' | 'FAIL_RESTRICTED';
  timestamp: string;
}

export interface DeveloperEarningLog {
  id: string;
  developerId: string;
  appId: string;
  tenantId: string;
  amountGross: number;
  amountFee: number;
  amountNet: number;
  referenceInvoiceId: string;
  createdAt: string;
}

// --- PROMPT 10: CAPITAL, CAP TABLE & SHAREHOLDER TRUST ARCHITECTURE TYPES ---

export interface ShareholderProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  shareClass: 'Class A Voting' | 'Class B Non-Voting' | 'Preferred';
  unitCount: number;
  costBasisUsd: number;
  ownershipPercent: number;
  acquiredAt: string;
  kycStatus: 'unverified' | 'pending' | 'verified';
  corporateDocuments: string[]; // List of names
}

export interface CapTableConfig {
  authorizedShares: number;
  issuedShares: number;
  outstandingShares: number;
  optionPoolShares: number;
  shareClasses: {
    name: string;
    description: string;
    issuedUnits: number;
    votingPowerMultiplier: number;
  }[];
}

export interface ValuationRecord {
  id: string;
  date: string;
  methodology: '409A Asset Approach' | 'Discounted Cash Flow (DCF)' | 'Comparable Market Multiples' | 'Precedent Transactions';
  supportingDocument: string;
  approvingAuthority: string;
  valuationAmount: number;
  notes: string;
}

export interface InvestmentOffering {
  id: string;
  title: string;
  targetAmount: number;
  pricePerShare: number;
  shareClass: string;
  minInvestment: number;
  status: 'draft' | 'compliance_review' | 'approved' | 'open' | 'closed' | 'allotted';
  jurisdictionConfigured: boolean;
  licensedProviderName: string;
  legalApprovalReceived: boolean;
  kycAmlRulesRequired: boolean;
  investorDisclosuresCount: number;
  eligibilityRules: string;
}

export interface ExchangeCredential {
  id: string;
  providerName: string;
  apiVersion: string;
  endpoint: string;
  status: 'connected' | 'disconnected' | 'unlicensed';
  connectedAt?: string;
  apiKeysGenerated: boolean;
}

export interface GovernancePolicy {
  id: string;
  name: string;
  category: 'affiliate' | 'payout' | 'ai' | 'reseller' | 'app' | 'country';
  description: string;
  value: any; // Can be percentage, numeric limit, string restriction, or JSON config
  isEnabled: boolean;
  approvalRequired: boolean;
  updatedAt: string;
}

export interface AdminApprovalTask {
  id: string;
  actionType: string; // e.g. 'SUSPEND_USER', 'APPROVE_OFFERING', 'UPDATE_POLICY', 'RELEASE_PAYOUT', 'REVOKE_APP'
  requestedBy: string;
  requestedByEmail: string;
  payload: any;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  completedAt?: string;
  completedBy?: string;
}

// ==========================================
// OMNI AI NATIVE APPLICATION CONTRACT & TYPES
// ==========================================

export type OmniAiScope =
  | 'ai.chat.use'
  | 'ai.search.use'
  | 'ai.research.run'
  | 'ai.knowledge.read'
  | 'ai.knowledge.write'
  | 'ai.files.upload'
  | 'ai.documents.create'
  | 'ai.slides.create'
  | 'ai.sheets.create'
  | 'ai.media.generate'
  | 'ai.agents.create'
  | 'ai.agents.run'
  | 'ai.tools.invoke'
  | 'ai.code.use'
  | 'ai.models.select'
  | 'ai.team.manage'
  | 'ai.billing.view'
  | 'ai.provider.manage'
  | 'ai.admin.manage';

export type OmniAiNavigationTab =
  | 'home'
  | 'my-omni'
  | 'team-ai'
  | 'cross-app'
  | 'chat'
  | 'router'
  | 'search'
  | 'research'
  | 'consensus'
  | 'arena'
  | 'knowledge'
  | 'create'
  | 'media'
  | 'code'
  | 'build'
  | 'agents'
  | 'workspace'
  | 'marketplace'
  | 'monetisation'
  | 'white-label'
  | 'admin';

export type OmniAiLanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar';

export interface OmniAiLanguageOption {
  code: OmniAiLanguageCode;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
}

export interface OmniAiArtifact {
  id: string;
  title: string;
  type: 'document' | 'slide' | 'sheet' | 'image' | 'code';
  content: string;
  language?: string;
  organizationId: string;
  authorUserId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  metadata?: Record<string, any>;
}

export interface OmniAiSearchCitation {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
  relevanceScore: number;
  publishedDate?: string;
}

export interface OmniAiSearchQuery {
  id: string;
  query: string;
  scope: 'web' | 'enterprise_vault' | 'hybrid';
  results: OmniAiSearchCitation[];
  synthesizedAnswer: string;
  confidenceScore: number;
  timestamp: string;
  userId: string;
  organizationId: string;
}

export interface OmniAiResearchStep {
  stepNumber: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  findings: string;
  sourcesExamined: number;
}

export interface OmniAiResearchSession {
  id: string;
  topic: string;
  hypothesis: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  steps: OmniAiResearchStep[];
  executiveSummary: string;
  keyInsights: string[];
  citationsCount: number;
  tokensConsumed: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  organizationId: string;
}

export interface OmniAiWorkspaceItem {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  membersCount: number;
  activeAgentsCount: number;
  knowledgeSourcesCount: number;
  artifactsCount: number;
  organizationId: string;
  createdAt: string;
}

export interface OmniAiMarketplaceListing {
  id: string;
  title: string;
  itemType: 'agent' | 'prompt_pack' | 'tool_connector' | 'workflow';
  authorName: string;
  authorOrg: string;
  description: string;
  category: 'productivity' | 'finance' | 'developer' | 'marketing' | 'legal' | 'research';
  rating: number;
  reviewsCount: number;
  installCount: number;
  priceUsd: number;
  isVerified: boolean;
  requiredScopes: OmniAiScope[];
  tags: string[];
}

// ---------------------------------------------------------------------------
// OMNI CHAT EXTENSIONS & MULTIMODAL CAPABILITIES
// ---------------------------------------------------------------------------

export interface OmniChatAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'audio' | 'video' | 'code';
  sizeBytes: number;
  url: string;
  mimeType: string;
  extractedText?: string;
  previewThumbnail?: string;
}

export interface OmniChatBranchNode {
  id: string;
  parentId?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  modelId?: string;
  providerId?: string;
  latencyMs?: number;
  costUsd?: number;
  tokens?: { input: number; output: number; total: number };
  cacheHit?: boolean;
  fallbackUsed?: boolean;
  fallbackTrace?: string[];
  attachments?: OmniChatAttachment[];
  artifacts?: OmniAiArtifact[];
  groundingCitations?: OmniAiSearchCitation[];
  audioUrl?: string;
  isVoiceInput?: boolean;
  branchSiblings?: string[]; // IDs of alternate branches at this step
  activeBranchIndex?: number;
}

export interface OmniChatFolder {
  id: string;
  name: string;
  color: string;
  icon?: string;
  organizationId: string;
  createdAt: string;
}

export interface OmniChatConversation {
  id: string;
  title: string;
  folderId?: string;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  userId: string;
  activeModelId: string;
  routingMode: 'omni_auto' | 'expert_manual';
  routingProfile: OmniRoutingProfile;
  selectedKnowledgeSpaceIds: string[];
  enabledAppContexts: ('finance' | 'crm' | 'commerce' | 'ledger' | 'docs')[];
  memoryEnabled: boolean;
  privacySharePolicy: 'tenant_private' | 'anonymized_team' | 'public_scrubbed';
  shareToken?: string;
  messages: OmniChatBranchNode[];
}

// ---------------------------------------------------------------------------
// OMNI CONSENSUS ENGINE (MULTI-MODEL ARBITRATION)
// ---------------------------------------------------------------------------

export interface OmniConsensusModelOutput {
  modelId: string;
  modelName: string;
  providerId: string;
  providerIcon?: string;
  content: string;
  confidenceScore: number;
  latencyMs: number;
  tokens: { input: number; output: number };
  costUsd: number;
  epistemicStance: 'confident' | 'nuanced' | 'skeptical' | 'speculative';
  keyArguments: string[];
  citationsClaimed: string[];
}

export interface OmniConsensusAgreementPoint {
  id: string;
  topic: string;
  consensusScore: number; // 0-100%
  supportingModels: string[];
  summary: string;
}

export interface OmniConsensusDisagreementPoint {
  id: string;
  topic: string;
  divergenceLevel: 'minor_nuance' | 'methodological_split' | 'direct_contradiction';
  perspectives: {
    modelId: string;
    modelName: string;
    stance: string;
    reasoning: string;
  }[];
}

export interface OmniConsensusSession {
  id: string;
  query: string;
  createdAt: string;
  organizationId: string;
  userId: string;
  participatingModelIds: string[];
  individualOutputs: OmniConsensusModelOutput[];
  agreements: OmniConsensusAgreementPoint[];
  disagreements: OmniConsensusDisagreementPoint[];
  uncertaintyMarkers: string[];
  synthesizedArbitration: string;
  epistemologicalDisclaimer: string;
  synthesisConfidence: number;
  totalCostUsd: number;
  status: 'dispatching' | 'comparing' | 'synthesized' | 'failed';
}

// ---------------------------------------------------------------------------
// OMNI MODEL ARENA (BLIND COMPARISON)
// ---------------------------------------------------------------------------

export interface OmniArenaMatch {
  id: string;
  prompt: string;
  category: 'coding' | 'reasoning' | 'creativity' | 'factual' | 'multilingual' | 'conciseness';
  modelAId: string;
  modelAName: string; // Hidden during blind evaluation
  modelAProvider: string;
  modelAOutput: string;
  modelALatencyMs: number;

  modelBId: string;
  modelBName: string; // Hidden during blind evaluation
  modelBProvider: string;
  modelBOutput: string;
  modelBLatencyMs: number;

  hasVoted: boolean;
  winner?: 'model_a' | 'model_b' | 'tie' | 'both_bad';
  userFeedbackReason?: string;
  evaluatedAt?: string;
  organizationId: string;
  userId: string;
}

export interface OmniArenaLeaderboardEntry {
  modelId: string;
  modelName: string;
  providerId: string;
  eloRating: number;
  matchesPlayed: number;
  winRate: number;
  avgLatencyMs: number;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
}

// ---------------------------------------------------------------------------
// OMNI DEEP RESEARCH MULTI-STAGE ENGINE
// ---------------------------------------------------------------------------

export type OmniDeepResearchStageName =
  | 'question_analysis'
  | 'scope_definition'
  | 'plan_generation'
  | 'source_discovery'
  | 'source_retrieval'
  | 'evidence_extraction'
  | 'cross_comparison'
  | 'deductive_analysis'
  | 'synthesis'
  | 'citation_validation'
  | 'final_report';

export interface OmniDeepResearchSourceItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  sourceType: 'academic' | 'regulatory' | 'financial_sec' | 'news' | 'internal_rag' | 'technical_spec';
  reliabilityScore: number; // 0-100
  freshness: string;
  snippet: string;
  extractedKeyPoints: string[];
}

export interface OmniDeepResearchEvidenceItem {
  id: string;
  claim: string;
  supportingSourceIds: string[];
  confidenceScore: number;
  contradictoryEvidence?: string;
  methodologyNote: string;
}

export interface OmniDeepResearchExecution {
  id: string;
  topic: string;
  scopeParameters: {
    depth: 'standard' | 'deep_multi_pass' | 'exhaustive_academic';
    domainsAllowed: string[];
    maxSourcesToProbe: number;
    includeInternalVaults: boolean;
    dateCutoff?: string;
  };
  currentStage: OmniDeepResearchStageName;
  stageProgressPercent: number;
  researchPlan: {
    coreObjective: string;
    subHypotheses: string[];
    investigationPhases: string[];
  };
  sources: OmniDeepResearchSourceItem[];
  evidence: OmniDeepResearchEvidenceItem[];
  finalReportMarkdown?: string;
  executiveSummary?: string;
  riskAndLimitationMatrix?: { risk: string; mitigation: string; severity: 'high' | 'med' | 'low' }[];
  citationsValidatedCount: number;
  totalTokensConsumed: number;
  totalCostUsd: number;
  createdAt: string;
  completedAt?: string;
  status: 'planning' | 'running' | 'completed' | 'paused' | 'failed';
  organizationId: string;
  userId: string;
}

// ===========================================================================
// PROMPT 4: OMNI KNOWLEDGE, RAG, MEMORY, ACL & CONTEXT ENGINE TYPES
// ===========================================================================

export type OmniKnowledgeScopeType = 
  | 'user' 
  | 'project' 
  | 'organisation' 
  | 'team' 
  | 'tenant' 
  | 'application';

export type OmniKnowledgeAccessLevel = 
  | 'private' 
  | 'team_restricted' 
  | 'org_wide' 
  | 'public';

export interface OmniKnowledgeAclRule {
  id: string;
  principalType?: 'user' | 'team' | 'role' | 'application' | 'tenant';
  principalId?: string;
  entityType?: 'user' | 'role' | 'tenant';
  entityId?: string;
  permission: 'read' | 'write' | 'read_write' | 'admin';
  grantedAt?: string;
  grantedBy?: string;
}

export interface OmniKnowledgeSpace {
  id: string;
  name: string;
  description: string;
  category?: 'company_knowledge' | 'my_research' | 'product_manuals' | 'policies' | 'legal_documents' | 'marketing_materials' | 'course_library' | 'custom' | string;
  scopeType?: OmniKnowledgeScopeType;
  ownerId?: string;
  ownerUserId?: string;
  organizationId: string;
  tenantId?: string;
  teamId?: string;
  projectId?: string;
  appId?: string;
  isPrivate?: boolean;
  accessLevel?: OmniKnowledgeAccessLevel;
  allowedRoles?: string[];
  allowedUserIds?: string[];
  aclRules?: OmniKnowledgeAclRule[];
  sourceCount?: number;
  sourcesCount?: number;
  chunkCount?: number;
  totalChunks?: number;
  totalTokens?: number;
  totalSizeBytes?: number;
  vectorDimension?: number;
  vectorEmbeddingModel?: string;
  defaultEmbeddingModel?: string;
  retentionDays?: number;
  autoSyncEnabled?: boolean;
  isEncrypted?: boolean;
  icon?: string;
  color?: string;
  tags?: string[];
  lastSyncTimestamp?: string;
  createdAt: string;
  updatedAt: string;
}

export type OmniKnowledgeSourceType = 
  | 'document' 
  | 'pdf' 
  | 'office' 
  | 'office_file'
  | 'text' 
  | 'plain_text'
  | 'structured_data' 
  | 'structured_json'
  | 'web_page' 
  | 'app_record' 
  | 'external_connector' 
  | 'cloud_connector'
  | 'media_transcript';

export type OmniKnowledgeIngestionStatus = 
  | 'uploading' 
  | 'validating' 
  | 'security_scanning' 
  | 'extracting' 
  | 'normalizing' 
  | 'chunking' 
  | 'embedding' 
  | 'indexing' 
  | 'indexed'
  | 'ready' 
  | 'error' 
  | 'stale' 
  | 'quarantined'
  | 'revoked';

export interface OmniKnowledgeSource {
  id: string;
  spaceId: string;
  name: string;
  sourceType: OmniKnowledgeSourceType;
  format?: string;
  isLinkedSource?: boolean;
  isLinkedOnly?: boolean;
  linkedSourceUri?: string;
  uri?: string;
  linkedSyncFrequency?: 'realtime_webhook' | 'hourly' | 'daily' | 'manual';
  fileSize?: number;
  sizeBytes?: number;
  contentHash?: string;
  status: OmniKnowledgeIngestionStatus;
  ingestionStage?: string;
  ingestionProgress?: number;
  securityScanResult?: {
    virusScan: 'clean' | 'suspicious' | 'quarantined';
    dlpRisk: 'none' | 'pii_detected' | 'credentials_detected';
    passedAt: string;
  };
  securityScanStatus?: 'clean' | 'suspicious' | 'quarantined';
  securityScanTimestamp?: string;
  chunkCount?: number;
  totalTokens?: number;
  tokenCount?: number;
  metadata?: Record<string, any>;
  aclRules?: any[];
  originalMetadata?: {
    author?: string;
    createdDate?: string;
    mimeType: string;
    checksum?: string;
    sourceUrl?: string;
    pageCount?: number;
    wordCount?: number;
    appSource?: string;
    tags?: string[];
  };
  ingestionPipelineStep?: number;
  staleStatus?: {
    isStale: boolean;
    lastSynchronizedAt: string;
    remoteVersion?: string;
    staleReason?: string;
  };
  organizationId: string;
  tenantId?: string;
  ownerUserId?: string;
  createdAt: string;
  updatedAt: string;
  retentionExpiresAt?: string;
}

export interface OmniKnowledgeChunk {
  id: string;
  sourceId: string;
  spaceId: string;
  chunkIndex: number;
  content?: string;
  text?: string;
  tokenCount: number;
  pageNumber?: number;
  sectionHeading?: string;
  embeddingVectorPreview?: number[];
  organizationId?: string;
  metadata?: Record<string, any>;
  aclRules?: any[];
  acl?: {
    organizationId: string;
    tenantId: string;
    allowedUserIds?: string[];
    allowedTeamIds?: string[];
    allowedAppIds?: string[];
    securityClassification: 'public' | 'internal' | 'confidential' | 'restricted';
  };
  createdAt?: string;
}

export type OmniHybridRetrievalMode = 'hybrid' | 'vector_dense' | 'bm25_keyword';

export interface OmniHybridRetrievalRequest {
  query: string;
  spaceIds?: string[];
  mode?: OmniHybridRetrievalMode;
  vectorWeight?: number;
  keywordWeight?: number;
  topK?: number;
  similarityThreshold?: number;
  minimumRelevanceScore?: number;
  organizationId?: string;
  userId?: string;
  userRole?: string;
  enableCrossEncoderReranking?: boolean;
  metadataFilters?: {
    sourceTypes?: OmniKnowledgeSourceType[];
    tags?: string[];
    author?: string;
    securityClassification?: 'public' | 'internal' | 'confidential' | 'restricted';
  };
  userContext?: {
    userId: string;
    organizationId: string;
    tenantId: string;
    userRoles: string[];
    teamIds: string[];
  };
}

export interface OmniHybridRetrievalResultItem {
  id?: string;
  chunkId?: string;
  chunk?: OmniKnowledgeChunk;
  sourceId?: string;
  sourceName?: string;
  spaceId?: string;
  spaceName?: string;
  text?: string;
  relevanceScore?: number;
  keywordMatchScore?: number;
  vectorSimilarityScore?: number;
  rerankScore?: number;
  retrievalMethod?: string;
  pageNumber?: number;
  metadata?: any;
  source?: OmniKnowledgeSource;
  vectorScore?: number;
  keywordScore?: number;
  hybridFusionScore?: number;
  highlights?: string[];
  citationRef?: {
    citationId: string;
    documentTitle: string;
    spaceName: string;
    sectionHeading?: string;
    pageNumber?: number;
    snippet: string;
    permalink: string;
    confidenceScore: number;
  };
  aclCheckPassed?: boolean;
}

export interface OmniHybridRetrievalResponse {
  query: string;
  executionTimeMs?: number;
  latencyMs?: number;
  totalEvaluated?: number;
  totalEvaluatedChunks?: number;
  aclBlockedCount?: number;
  aclBlockedChunksCount?: number;
  retrievedChunks: OmniHybridRetrievalResultItem[];
  results?: OmniHybridRetrievalResultItem[];
  synthesizedAnswer?: string;
  rerankingApplied?: boolean;
  timestamp?: string;
  citations?: {
    citationId?: string;
    sourceId?: string;
    sourceName?: string;
    documentTitle?: string;
    spaceName?: string;
    snippet?: string;
    confidenceScore?: number;
    pageNumber?: number;
  }[];
}

// ---------------------------------------------------------------------------
// OMNI 5-TIER SEPARATED MEMORY SYSTEM
// ---------------------------------------------------------------------------

export type OmniMemoryTier = 
  | 'conversation_context' 
  | 'user_memory' 
  | 'application_memory' 
  | 'organisation_knowledge' 
  | 'agent_memory';

export interface OmniMemoryItem {
  id: string;
  tier: OmniMemoryTier;
  category?: string;
  key: string;
  value: string;
  confidence?: number;
  importance?: number;
  isSensitive?: boolean;
  ttlSeconds?: number;
  accessCount?: number;
  source?: string;
  organizationId: string;
  tenantId?: string;
  userId?: string;
  appId?: string;
  agentId?: string;
  conversationId?: string;
  isEnabled?: boolean;
  isExplicitlyPermitted?: boolean;
  createdAt: string;
  updatedAt: string;
  lastAccessedAt?: string;
}

// ---------------------------------------------------------------------------
// OMNI GROUNDED KNOWLEDGE ASSISTANTS
// ---------------------------------------------------------------------------

export interface OmniKnowledgeAssistant {
  id: string;
  name: string;
  avatar?: string;
  roleTitle?: string;
  description: string;
  groundedSpaceIds: string[];
  systemPrompt?: string;
  systemDirective?: string;
  enforceStrictAcl?: boolean;
  includeCitationsInResponse?: boolean;
  allowFallbackToGeneralKnowledge?: boolean;
  retrievalTopK?: number;
  minimumRelevanceScore?: number;
  retrievalSettings?: {
    topK: number;
    hybridAlpha: number;
    strictCitationRequired: boolean;
    minRelevanceScore: number;
    temperature: number;
  };
  organizationId: string;
  tenantId?: string;
  creatorUserId?: string;
  modelId?: string;
  status?: 'active' | 'archived' | 'draft';
  totalQueriesHandled?: number;
  avgCitationCount?: number;
  isRAGGroundingNoticeDisplayed?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// OMNI KNOWLEDGE CONNECTOR CONTRACT
// ---------------------------------------------------------------------------

export type OmniConnectorType = 
  | 'google_drive' 
  | 'notion' 
  | 'github_enterprise' 
  | 's3_bucket' 
  | 'web_crawler' 
  | 'postgresql_omni' 
  | 'sharepoint' 
  | 'slack_transcripts'
  | string;

export interface OmniKnowledgeConnector {
  id: string;
  name: string;
  icon?: string;
  connectorType?: string;
  authType?: string;
  syncSchedule?: string;
  linkedSourcesCount?: number;
  type?: OmniConnectorType;
  status: 'connected' | 'syncing' | 'error' | 'revoked' | 'unauthorized' | string;
  syncFrequency?: 'realtime_webhook' | 'hourly' | 'daily' | 'manual';
  syncIntervalMinutes?: number;
  lastSyncAt?: string;
  lastSyncTimestamp?: string;
  totalDocumentsSynced?: number;
  totalDocumentsIndexed?: number;
  documentsIndexedCount?: number;
  organizationId: string;
  tenantId?: string;
  authCredentialMasked?: string;
  targetSpaceId?: string;
  isLinkedSourceMode?: boolean;
  health?: {
    latencyMs: number;
    errorCount: number;
    lastErrorMsg?: string;
    webhookSubscribed: boolean;
  };
  config?: Record<string, any>;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// OMNI DIAGNOSTIC TEST SUITE & FAILURE SIMULATION
// ---------------------------------------------------------------------------

export type OmniDiagnosticTestCaseId = 
  | 'deleted_documents_purge' 
  | 'revoked_permission_acl' 
  | 'conflicting_documents_reconciliation' 
  | 'cross_tenant_isolation' 
  | 'stale_source_detection' 
  | 'malformed_file_quarantine' 
  | 'large_scale_knowledge_benchmark'
  | 'diag_test_1'
  | 'diag_test_2'
  | 'diag_test_3'
  | 'diag_test_4'
  | 'diag_test_5'
  | 'diag_test_6'
  | 'diag_test_7'
  | string;

export interface OmniDiagnosticTestResult {
  id: OmniDiagnosticTestCaseId;
  name?: string;
  testName?: string;
  category: 'security' | 'lifecycle' | 'accuracy' | 'performance' | 'acl_security' | 'reconciliation' | 'tenant_isolation' | 'benchmark' | string;
  description: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  executionTimeMs?: number;
  latencyMs?: number;
  assertionsCount?: number;
  assertionsPassed?: number;
  auditTrace?: string[];
  evidenceSnippet?: string;
  findings?: string;
  executedAt?: string;
  timestamp?: string;
}

// ---------------------------------------------------------------------------
// PROMPT 5: OMNI CREATE — DOCUMENTS, SLIDES, SHEETS & COLLABORATIVE WORKSPACE
// ---------------------------------------------------------------------------

export type OmniDocumentType = 
  | 'report' 
  | 'proposal' 
  | 'letter' 
  | 'book' 
  | 'academic' 
  | 'contract' 
  | 'business_plan' 
  | 'policy' 
  | 'manual' 
  | 'general';

export interface OmniDocumentCommentReply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
}

export interface OmniDocumentComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  selectedText?: string;
  timestamp: string;
  resolved: boolean;
  replies: OmniDocumentCommentReply[];
}

export interface OmniDocumentVersion {
  versionNumber: number;
  timestamp: string;
  authorName: string;
  summary: string;
  contentSnapshot: string;
  wordCount: number;
}

export interface OmniDocumentCitation {
  id: string;
  sourceTitle: string;
  author?: string;
  year?: string;
  url?: string;
  snippet: string;
  spaceId?: string;
}

export interface OmniDocument {
  id: string;
  title: string;
  documentType: OmniDocumentType;
  subtitle?: string;
  content: string; // Markdown / Rich HTML
  comments: OmniDocumentComment[];
  versions: OmniDocumentVersion[];
  citations: OmniDocumentCitation[];
  tags: string[];
  status: 'draft' | 'in_review' | 'approved' | 'published';
  wordCount: number;
  readingTimeMinutes: number;
  ownerUserId: string;
  organizationId: string;
  workspaceId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OmniSlideLayout = 
  | 'title' 
  | 'content' 
  | 'split' 
  | 'bento' 
  | 'metrics' 
  | 'timeline' 
  | 'quote' 
  | 'chart' 
  | 'comparison';

export interface OmniSlideTheme {
  id: string;
  name: string;
  bgGradient: string;
  cardBg: string;
  textColor: string;
  primaryColor: string;
  accentColor: string;
  fontTitle: string;
  fontBody: string;
}

export interface OmniSlideKpi {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export interface OmniSlideChartData {
  chartType: 'bar' | 'line' | 'pie';
  labels: string[];
  datasets: {
    name: string;
    values: number[];
    color?: string;
  }[];
}

export interface OmniSlide {
  id: string;
  slideNumber: number;
  layout: OmniSlideLayout;
  title: string;
  subtitle?: string;
  bullets?: string[];
  kpis?: OmniSlideKpi[];
  chartData?: OmniSlideChartData;
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  columns?: {
    title: string;
    content: string;
    badge?: string;
  }[];
  speakerNotes: string;
  visualPrompt?: string;
  imageUrl?: string;
}

export interface OmniPresentation {
  id: string;
  title: string;
  subtitle?: string;
  targetAudience?: string;
  outline: string[];
  themeId: string;
  slides: OmniSlide[];
  ownerUserId: string;
  organizationId: string;
  workspaceId?: string;
  createdAt: string;
  updatedAt: string;
  isAIGenerated: boolean;
  sourceArtifactId?: string;
}

export interface OmniSheetCell {
  value: string | number;
  formula?: string;
  format?: 'text' | 'currency' | 'percent' | 'number' | 'date';
  computedValue: string | number;
  error?: string;
  bold?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface OmniSheetColumn {
  key: string;
  header: string;
  width?: number;
  type?: 'string' | 'number' | 'date' | 'boolean';
}

export interface OmniSheetRow {
  id: string;
  rowNumber: number;
  cells: Record<string, OmniSheetCell>;
}

export interface OmniSheetTab {
  id: string;
  name: string;
  columns: OmniSheetColumn[];
  rows: OmniSheetRow[];
}

export interface OmniSheetKpi {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export interface OmniSheetForecast {
  metric: string;
  historical: { period: string; value: number }[];
  projection: { period: string; predicted: number; confidenceLow: number; confidenceHigh: number }[];
  rSquared: number;
  growthRatePct: number;
  modelType: 'linear_trend' | 'moving_average' | 'exponential_smoothing';
}

export interface OmniSpreadsheet {
  id: string;
  title: string;
  description: string;
  tabs: OmniSheetTab[];
  kpis: OmniSheetKpi[];
  forecast?: OmniSheetForecast;
  sourceFileName?: string;
  ownerUserId: string;
  organizationId: string;
  workspaceId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OmniWorkspaceScope = 'personal' | 'team' | 'organization';
export type OmniWorkspaceRole = 'owner' | 'admin' | 'editor' | 'commenter' | 'viewer';
export type OmniCollaboratorRole = OmniWorkspaceRole;
export type OmniWorkspaceItemType = 
  | 'document' 
  | 'slide' 
  | 'sheet' 
  | 'chat' 
  | 'knowledge' 
  | 'research' 
  | 'agent' 
  | 'task' 
  | 'file';

export interface OmniWorkspaceItem {
  id: string;
  type: OmniWorkspaceItemType;
  targetId: string;
  title: string;
  subtitle?: string;
  icon?: string;
  updatedAt: string;
  authorName: string;
  tags: string[];
  sizeBytes?: number;
  status?: string;
}

export interface OmniWorkspaceCollaborator {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: OmniWorkspaceRole;
  isOnline: boolean;
  activeItemId?: string;
  lastActiveAt: string;
}

export interface OmniWorkspaceActivity {
  id: string;
  actorName: string;
  actorAvatar?: string;
  action: string;
  targetTitle: string;
  targetType: OmniWorkspaceItemType;
  timestamp: string;
  diffSnippet?: string;
}

export interface OmniWorkspace {
  id: string;
  name: string;
  description: string;
  scope: OmniWorkspaceScope;
  icon: string;
  color: string;
  organizationId: string;
  ownerUserId: string;
  items: OmniWorkspaceItem[];
  members: OmniWorkspaceCollaborator[];
  activities: OmniWorkspaceActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface OmniCommandAction {
  id: string;
  title: string;
  promptTemplate: string;
  inputArtifactTypes: OmniWorkspaceItemType[];
  outputArtifactType: OmniWorkspaceItemType;
  icon: string;
  description: string;
}

// ===========================================================================
// PROMPT 6: OMNI MULTIMODAL CREATOR (IMAGE, VIDEO, AUDIO, VOICE & MEDIA LIBRARY)
// ===========================================================================

export type OmniMediaCapability = 
  | 'text_to_image'
  | 'image_editing'
  | 'image_variations'
  | 'background_ops'
  | 'image_upscaling'
  | 'image_understanding'
  | 'design_assistance'
  | 'text_to_video'
  | 'image_to_video'
  | 'video_transformation'
  | 'ad_assets'
  | 'social_variations'
  | 'video_captions'
  | 'video_transcripts'
  | 'text_to_speech'
  | 'speech_to_text'
  | 'audio_transcription'
  | 'audio_translation'
  | 'voiceover'
  | 'podcast_workflow'
  | 'audio_summarisation'
  | 'music_generation'
  | 'realtime_voice';

export type OmniProviderStatus = 'configured' | 'unconfigured' | 'degraded' | 'rate_limited';

export interface OmniConfiguredProvider {
  id: string;
  name: string;
  providerKey: 'gemini' | 'imagen' | 'veo' | 'openai' | 'elevenlabs' | 'whisper' | 'stability' | 'runway' | 'lyria' | 'custom_sovereign';
  status: OmniProviderStatus;
  statusMessage?: string;
  supportedCapabilities: OmniMediaCapability[];
  models: {
    id: string;
    name: string;
    costPerUnitUsd: number;
    unitType: 'image' | 'second' | 'minute' | '1k_characters' | '1k_tokens';
    maxResolution?: string;
    maxDurationSec?: number;
    isPaidTierRequired?: boolean;
  }[];
  latencyAvgMs: number;
  apiEndpoint?: string;
  isByokActive: boolean;
}

export type OmniMediaSafetyRating = 'safe' | 'warning' | 'prohibited';

export interface OmniMediaSafetyAssessment {
  overallResult: OmniMediaSafetyRating;
  prohibitedContentScore: number; // 0-1
  privacyPiiScore: number;
  impersonationRiskScore: number;
  biometricSensitiveScore: number;
  copyrightRiskScore: number;
  childSafetyCheck: 'passed' | 'review_required' | 'blocked';
  watermarkEmbedded: boolean;
  provenanceC2paSigned: boolean;
  flaggedCategories: string[];
  moderationNotes?: string;
}

export type OmniRightsLicense = 
  | 'enterprise_sovereign'
  | 'proprietary_commercial'
  | 'cc_by_4_0'
  | 'royalty_free'
  | 'training_opt_out'
  | 'personal_use_only';

export type OmniMediaType = 'image' | 'video' | 'audio' | 'voice_session' | 'design_project';

export interface OmniMediaAsset {
  id: string;
  title: string;
  mediaType: OmniMediaType;
  url: string;
  thumbnailUrl?: string;
  ownerUserId: string;
  ownerName: string;
  tenantId: string;
  organizationId: string;
  source: 'prompt' | 'uploaded' | 'transformed' | 'agent_workflow' | 'live_voice';
  prompt?: string;
  negativePrompt?: string;
  provider: string;
  model: string;
  dimensions?: { width: number; height: number };
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9';
  durationSec?: number;
  fileSizeBytes: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  status: 'ready' | 'processing' | 'flagged' | 'archived';
  usageTokens?: number;
  costUsd: number;
  rightsLicense: OmniRightsLicense;
  safety: OmniMediaSafetyAssessment;
  tags: string[];
  metadata?: Record<string, any>;
  transcriptText?: string;
  captionsVttUrl?: string;
}

// Async Video Job Queue Structures
export type OmniVideoJobStatus = 
  | 'queued' 
  | 'reserving_credits' 
  | 'rendering' 
  | 'transcoding' 
  | 'generating_captions'
  | 'completed' 
  | 'cancelled' 
  | 'failed' 
  | 'timeout' 
  | 'reconciled';

export interface OmniVideoJob {
  id: string;
  organizationId: string;
  userId: string;
  mode: 'text_to_video' | 'image_to_video' | 'transformation' | 'ad_campaign' | 'social_variations';
  prompt: string;
  sourceImageUrl?: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '21:9';
  resolution: '720p' | '1080p' | '4k';
  durationSeconds: number;
  fps: 24 | 30 | 60;
  providerId: string;
  modelId: string;
  status: OmniVideoJobStatus;
  progressPercent: number;
  currentStage: string;
  reservedCreditsUsd: number;
  actualCostUsd: number;
  reconciledCreditDiffUsd: number;
  retryCount: number;
  maxRetries: number;
  cancellable: boolean;
  errorReason?: string;
  outputMediaAssetId?: string;
  outputVideoUrl?: string;
  captionsVtt?: string;
  transcript?: string;
  socialCuts?: {
    platform: 'tiktok_reels' | 'youtube_shorts' | 'instagram_square' | 'linkedin_landscape';
    aspectRatio: string;
    url: string;
    title: string;
  }[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// Audio Creation & Podcast Workflow
export interface OmniPodcastSpeaker {
  id: string;
  name: string;
  role: 'host' | 'co_host' | 'guest' | 'narrator';
  voiceId: string;
  timbre: 'warm' | 'authoritative' | 'conversational' | 'energetic' | 'calm';
  gender: 'female' | 'male' | 'neutral';
  accent: 'american' | 'british' | 'australian' | 'neutral';
}

export interface OmniPodcastScriptLine {
  id: string;
  speakerId: string;
  speakerName: string;
  dialogueText: string;
  emotion?: 'neutral' | 'curious' | 'excited' | 'thoughtful' | 'serious';
  pauseAfterMs?: number;
  audioClipUrl?: string;
  durationSec?: number;
}

export interface OmniPodcastEpisode {
  id: string;
  title: string;
  showName: string;
  topic: string;
  organizationId: string;
  speakers: OmniPodcastSpeaker[];
  scriptLines: OmniPodcastScriptLine[];
  introMusicStyle?: string;
  outroMusicStyle?: string;
  durationTotalSec: number;
  status: 'draft' | 'synthesizing' | 'ready' | 'failed';
  fullAudioUrl?: string;
  chapters: { title: string; startSec: number; endSec: number }[];
  summaryNote: string;
  costUsd: number;
  createdAt: string;
}

// Real-Time Voice Conversation Lounge
export interface OmniVoiceTurn {
  id: string;
  speaker: 'user' | 'agent';
  transcript: string;
  timestamp: string;
  audioDurationSec?: number;
  interrupted?: boolean;
  latencyMs?: number;
  modelConfidence?: number;
}

export interface OmniVoiceSession {
  id: string;
  organizationId: string;
  userId: string;
  status: 'idle' | 'listening' | 'speaking' | 'interrupted' | 'processing' | 'closed';
  voiceName: string;
  language: string;
  micPermissionGranted: boolean;
  activeTurnId?: string;
  conversationHistory: OmniVoiceTurn[];
  totalTokensUsed: number;
  sessionDurationSec: number;
  startedAt: string;
  endedAt?: string;
}

// Test Matrix Results
export interface OmniMultimodalTestResult {
  id: string;
  testCaseName: string;
  category: 'resilience' | 'security' | 'billing' | 'compliance' | 'isolation';
  status: 'passed' | 'failed' | 'running' | 'skipped';
  assertionSummary: string;
  latencyMs: number;
  simulatedScenario: string;
  timestamp: string;
}

// ===========================================================================
// PROMPT 7: OMNI CODE & OMNI BUILD STUDIO ARCHITECTURE
// ===========================================================================

export type OmniProjectFramework = 
  | 'react_vite'
  | 'nextjs'
  | 'nodejs_express'
  | 'omni_native_app'
  | 'vanilla_web'
  | 'python_fastapi';

export type OmniCodeFileLanguage = 
  | 'typescript' 
  | 'javascript' 
  | 'html' 
  | 'css' 
  | 'json' 
  | 'sql' 
  | 'markdown' 
  | 'yaml' 
  | 'python';

export interface OmniCodeFile {
  id: string;
  path: string; // e.g. 'src/App.tsx', 'server.ts'
  name: string;
  content: string;
  language: OmniCodeFileLanguage;
  isModified?: boolean;
  originalContent?: string;
  generatedByAi?: boolean;
  reviewed?: boolean;
  lastUpdated: string;
}

export interface OmniCodeFolder {
  id: string;
  path: string;
  name: string;
  children: string[]; // file or folder IDs
}

export type OmniSandboxProviderType = 
  | 'client_virtual_sandbox' // Safe in-memory/iframe runner without backend server execution
  | 'webcontainer_isolated'
  | 'e2b_microvm'
  | 'docker_gvisor_enclave'
  | 'unconfigured';

export interface OmniSandboxProviderConfig {
  id: string;
  providerType: OmniSandboxProviderType;
  name: string;
  status: 'active' | 'unconfigured' | 'degraded';
  statusMessage?: string;
  supportsTerminal: boolean;
  supportsNpmInstall: boolean;
  supportsLivePort3000: boolean;
  maxExecutionTimeSec: number;
  memoryLimitMb: number;
}

export interface OmniCodeDiagnostic {
  id: string;
  filePath: string;
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  source: 'linter' | 'typescript' | 'security_scanner';
}

export interface OmniCodeTestRun {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'failed' | 'running' | 'skipped';
  durationMs: number;
  errorSnippet?: string;
}

export type OmniAiCodingAction = 
  | 'generate'
  | 'explain'
  | 'refactor'
  | 'debug'
  | 'test_generation'
  | 'code_review'
  | 'documentation'
  | 'migration_generation'
  | 'api_generation'
  | 'schema_assistance';

export interface OmniAiCodeChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedAction?: OmniAiCodingAction;
  fileDiffs?: {
    filePath: string;
    oldContent: string;
    newContent: string;
  }[];
  appliedStatus?: 'pending' | 'applied' | 'rejected';
}

// OMNI BUILD GUIDED WORKFLOW
export type OmniBuildStep = 
  | 'idea' 
  | 'requirements' 
  | 'architecture' 
  | 'data_model' 
  | 'pages' 
  | 'components' 
  | 'apis' 
  | 'implementation' 
  | 'tests' 
  | 'preview' 
  | 'deployment';

export interface OmniBuildRequirement {
  id: string;
  title: string;
  category: 'core' | 'auth' | 'database' | 'ui' | 'integration' | 'security';
  description: string;
  priority: 'must_have' | 'should_have' | 'nice_to_have';
  status: 'draft' | 'approved' | 'implemented';
}

export interface OmniBuildArchitectureSpec {
  framework: OmniProjectFramework;
  runtime: string;
  frontendStack: string[];
  backendStack: string[];
  databaseEngine: 'postgres' | 'sqlite' | 'firestore' | 'spanner' | 'omni_ledger';
  authProvider: 'omni_passport' | 'firebase_auth' | 'custom_jwt';
  routingStrategy: string;
  stateManagement: string;
}

export interface OmniDbColumn {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'datetime' | 'json' | 'uuid' | 'foreign_key';
  isPrimary?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  referencesTable?: string;
  defaultValue?: string;
}

export interface OmniDbTableSchema {
  id: string;
  tableName: string;
  description: string;
  columns: OmniDbColumn[];
  indexes: string[];
}

export interface OmniDbMigration {
  id: string;
  version: string;
  description: string;
  sqlUp: string;
  sqlDown: string;
  applied: boolean;
  appliedAt?: string;
}

export interface OmniApiEndpointSpec {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  authRequired: boolean;
  requiredRoles: string[];
  requestSchemaJson?: string;
  responseSchemaJson?: string;
  handlerSnippet?: string;
}

// VERSION CONTROL (GIT PROVIDER ABSTRACTION)
export type OmniGitProvider = 'github' | 'gitlab' | 'omni_sovereign_git';

export interface OmniGitBranch {
  name: string;
  isDefault: boolean;
  latestCommitSha: string;
}

export interface OmniGitCommit {
  sha: string;
  message: string;
  author: string;
  timestamp: string;
  filesChanged: number;
}

export interface OmniGitPullRequest {
  id: string;
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'open' | 'merged' | 'closed';
  createdAt: string;
  author: string;
  diffSummary: string;
}

// DEPLOYMENT PROVIDER ABSTRACTION
export type OmniDeploymentTarget = 
  | 'cloud_run'
  | 'vercel'
  | 'aws_ecs'
  | 'cloudflare_workers'
  | 'omni_edge_mesh';

export interface OmniDeploymentRecord {
  id: string;
  target: OmniDeploymentTarget;
  environment: 'production' | 'staging' | 'preview';
  deploymentUrl: string;
  status: 'building' | 'deploying' | 'live' | 'failed' | 'rolled_back';
  deployedAt: string;
  commitSha: string;
  logs: string[];
}

// OMNI-NATIVE GENERATION (OMNI APP ECOSYSTEM MANIFEST)
export interface OmniNativeAppManifest {
  manifestVersion: '1.0';
  appId: string;
  appName: string;
  version: string;
  description: string;
  category: 'enterprise' | 'fintech' | 'developer_tool' | 'productivity' | 'ai_assistant';
  passportIntegration: {
    enabled: boolean;
    requiredScopes: string[];
    roleDefinitions: string[];
  };
  tenancy: {
    multiTenantIsolated: boolean;
    orgBoundaryEnforced: boolean;
  };
  meteredBilling: {
    enabled: boolean;
    planTiers: { id: string; name: string; priceMonthlyUsd: number; quotaCredits: number }[];
    usageMetrics: { metricKey: string; unitPriceUsd: number }[];
  };
  aiCapabilities: {
    modelsAllowed: string[];
    groundingEnabled: boolean;
    ragKnowledgeBaseIds: string[];
  };
  eventContracts: {
    subscribesTo: string[];
    publishes: string[];
  };
  securityGuarantees: {
    sandboxedExecution: boolean;
    noSecretExfiltration: boolean;
    c2paSigned: boolean;
  };
}

// SECURITY & STATIC ANALYSIS SCAN
export interface OmniCodeSecurityAudit {
  overallStatus: 'secure' | 'warning' | 'critical_blocked';
  maliciousPatternsFound: string[];
  secretExfiltrationRisks: string[];
  vulnerableDependencies: string[];
  dangerousShellCommands: string[];
  networkAbuseChecks: string[];
  fileSystemEscapeChecks: string[];
  auditTimestamp: string;
}

export interface OmniProjectWorkspace {
  id: string;
  name: string;
  description: string;
  framework: OmniProjectFramework;
  organizationId: string;
  tenantId: string;
  isOmniNative: boolean;
  omniManifest?: OmniNativeAppManifest;
  files: OmniCodeFile[];
  activeFileId: string;
  openFileIds: string[];
  dbSchemas: OmniDbTableSchema[];
  dbMigrations: OmniDbMigration[];
  apiEndpoints: OmniApiEndpointSpec[];
  git: {
    provider: OmniGitProvider;
    repoName: string;
    currentBranch: string;
    branches: OmniGitBranch[];
    commits: OmniGitCommit[];
    pullRequests: OmniGitPullRequest[];
    uncommittedChangesCount: number;
  };
  deployments: OmniDeploymentRecord[];
  buildPipeline: {
    currentStep: OmniBuildStep;
    ideaPrompt: string;
    requirements: OmniBuildRequirement[];
    architecture: OmniBuildArchitectureSpec;
    generatedTestSuites: OmniCodeTestRun[];
  };
  securityAudit: OmniCodeSecurityAudit;
  sandbox: OmniSandboxProviderConfig;
  createdAt: string;
  updatedAt: string;
}

// ===========================================================================
// PROMPT 8: OMNI AGENTS, AUTOMATION, CROSS-OMNI TOOLS & AI SDK CONTRACT
// ===========================================================================

export type OmniAgentAutonomyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface OmniAgentMemoryConfig {
  shortTermWindow: number; // Message context count
  workingMemory: boolean;
  vectorMemoryEnabled: boolean;
  longTermKnowledgeSpaceIds: string[];
  retentionDays: number;
}

export interface OmniAgentBudgetConfig {
  monthlyCapUsd: number;
  perInvocationCapUsd: number;
  approvalRequiredAboveUsd: number;
  currentMonthSpendUsd: number;
}

export interface OmniAgentSchedule {
  id: string;
  cronExpression: string;
  label: string;
  timezone: string;
  isEnabled: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
}

export interface OmniAgentTrigger {
  id: string;
  eventTopic: string;
  filterExpression?: string;
  isEnabled: boolean;
  description: string;
}

export interface OmniAgentApprovalRule {
  approverRoles: string[];
  minApprovers: number;
  autoRejectTimeoutMinutes: number;
  notifyChannels: ('in_app' | 'email' | 'webhook')[];
}

export interface OmniAgentSpec {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: 
    | 'OMNI Assistant' 
    | 'Research Agent' 
    | 'Sales Agent' 
    | 'Marketing Agent' 
    | 'Customer Support Agent' 
    | 'Business Agent' 
    | 'Developer Agent' 
    | 'Learning Agent' 
    | 'Logistics Agent' 
    | 'Finance Analysis Agent' 
    | 'Creator Agent'
    | string;
  category: 'core' | 'operations' | 'growth' | 'finance' | 'engineering' | 'creator' | 'custom';
  icon: string;
  avatar: string;
  instructions: string; // Base system instructions
  systemPrompt?: string;
  defaultModelId: string;
  routingProfile: OmniRoutingProfile;
  knowledgeSpaceIds: string[];
  allowedToolIds: string[];
  memoryConfig: OmniAgentMemoryConfig;
  autonomyLevel: OmniAgentAutonomyLevel; // 0 to 5
  permissions: string[]; // Required OAuth scopes
  budgetConfig: OmniAgentBudgetConfig;
  schedules: OmniAgentSchedule[];
  triggers: OmniAgentTrigger[];
  approvalRules: OmniAgentApprovalRule;
  ownerUserId: string;
  ownerName: string;
  organizationId: string;
  tenantId: string;
  applicationId: string;
  applicationName: string;
  status: 'active' | 'paused' | 'draft' | 'archived';
  totalRuns: number;
  successRate: number;
  isSharedCoreAgent?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// CROSS-OMNI TOOL REGISTRY CONTRACT
// ---------------------------------------------------------------------------

export type OmniToolCategory = 
  | 'marketing' 
  | 'crm' 
  | 'finance' 
  | 'commerce' 
  | 'logistics' 
  | 'learning' 
  | 'communication' 
  | 'calendar' 
  | 'support' 
  | 'ledger' 
  | 'security' 
  | 'core' 
  | string;

export interface OmniToolParameterSpec {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  defaultValue?: any;
  enumValues?: string[];
  validationPattern?: string;
}

export interface OmniToolSpec {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  category: OmniToolCategory;
  description: string;
  applicationId: string;
  applicationName: string;
  requiredScopes: string[];
  requiredRoles: string[];
  parametersList: OmniToolParameterSpec[];
  parametersSchema: string; // JSON Schema representation
  returnsSchema: string;
  isHighRisk: boolean;
  requiresApprovalByDefault: boolean;
  defaultApprovalThresholdUsd: number;
  idempotencyRequired: boolean;
  rateLimitPerMinute: number;
  timeoutMs: number;
  isEnabled: boolean;
  isCoreTool?: boolean;
  usageCount: number;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// TOOL EXECUTION CONTRACT & LIFECYCLE
// ---------------------------------------------------------------------------

export type OmniToolExecutionLifecycle = 
  | 'requested'
  | 'policy_evaluated'
  | 'approval_required'
  | 'approved'
  | 'executing'
  | 'succeeded'
  | 'failed'
  | 'rejected'
  | 'audited';

export interface OmniToolValidationCheck {
  dimension: 'user' | 'organisation' | 'tenant' | 'scope' | 'permission' | 'agent' | 'tool' | 'budget' | 'approval_policy';
  passed: boolean;
  reason: string;
  timestamp: string;
}

export interface OmniToolExecutionRecord {
  id: string;
  idempotencyKey: string;
  toolId: string;
  toolName: string;
  agentId: string;
  agentName: string;
  userId: string;
  userEmail: string;
  userKycStatus: string;
  organizationId: string;
  tenantId: string;
  applicationId: string;
  inputParameters: Record<string, any>;
  autonomyLevel: OmniAgentAutonomyLevel;
  estimatedCostUsd: number;
  monetaryActionAmountUsd: number;
  validationChecks: OmniToolValidationCheck[];
  lifecycleStatus: OmniToolExecutionLifecycle;
  approvalTaskId?: string;
  executionResult?: Record<string, any>;
  executionError?: string;
  latencyMs?: number;
  auditLogId?: string;
  isIdempotentReplay?: boolean;
  createdAt: string;
  completedAt?: string;
}

// ---------------------------------------------------------------------------
// HUMAN APPROVAL CENTER CONTRACT
// ---------------------------------------------------------------------------

export interface OmniHumanApprovalTask {
  id: string;
  executionRequestId: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  toolId: string;
  toolName: string;
  applicationId: string;
  requestedByUserId: string;
  requestedByEmail: string;
  actionTitle: string;
  actionDescription: string;
  proposedChanges: { field: string; oldValue: any; newValue: any }[];
  affectedRecords: { recordType: string; recordId: string; recordName: string }[];
  estimatedCostUsd: number;
  monetaryActionAmountUsd: number;
  reasonForApproval: string;
  status: 'pending' | 'approved' | 'rejected' | 'modified_and_approved';
  modifiedParameters?: Record<string, any>;
  decisionNotes?: string;
  approverUserId?: string;
  approverEmail?: string;
  executionResult?: Record<string, any>;
  decidedAt?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// AUTOMATIONS & WORKFLOWS CONTRACT
// ---------------------------------------------------------------------------

export interface OmniWorkflowStep {
  id: string;
  stepNumber: number;
  name: string;
  type: 'agent_task' | 'tool_call' | 'condition' | 'approval_gate' | 'delay' | 'notify';
  agentId?: string;
  toolId?: string;
  parametersTemplate?: Record<string, any>;
  conditionExpr?: string;
  status?: 'idle' | 'running' | 'completed' | 'failed' | 'waiting_approval';
  outputSummary?: string;
}

export interface OmniAutomationWorkflow {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  tenantId: string;
  applicationId: string;
  triggerType: 'event' | 'schedule' | 'manual' | 'webhook';
  triggerConfig: {
    eventTopic?: string;
    cronExpression?: string;
    filterCondition?: string;
  };
  steps: OmniWorkflowStep[];
  isEnabled: boolean;
  status: 'active' | 'paused' | 'error';
  lastRunAt?: string;
  lastExecutionStatus?: 'success' | 'failed' | 'pending';
  executionCount: number;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// CROSS-OMNI AI SDK TELEMETRY CONTRACT (@omni/ai-sdk)
// ---------------------------------------------------------------------------

export interface OmniAiSdkCallLog {
  id: string;
  method: 
    | 'requestCompletion'
    | 'runResearch'
    | 'callAgent'
    | 'registerAgent'
    | 'registerTool'
    | 'submitKnowledge'
    | 'requestEmbedding'
    | 'requestMedia'
    | 'getApprovedUsage';
  tenantId: string;
  organizationId: string;
  applicationId: string;
  callerId: string;
  payloadSummary: string;
  status: 'success' | 'rejected_policy' | 'failed_auth' | 'rate_limited' | 'error';
  latencyMs: number;
  costUsd: number;
  tokensConsumed: number;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// GOVERNANCE & RESILIENCE TEST MATRIX (PROMPT 8)
// ---------------------------------------------------------------------------

export interface OmniAgentSecurityTestResult {
  id: string;
  testCaseName: string;
  category: 'authorization' | 'tenancy' | 'approval' | 'idempotency' | 'budget' | 'permissions' | 'sanitization' | 'resilience';
  status: 'passed' | 'failed' | 'running';
  assertionSummary: string;
  simulatedScenario: string;
  latencyMs: number;
  timestamp: string;
}

// ===========================================================================
// PROMPT 9: MY OMNI PERSONAL AI, CONTEXT CONTROL CENTER, TEAM AI & ENTERPRISE CONTROLS
// ===========================================================================

export type OmniPersonalContextCategory = 
  | 'omni_profile'
  | 'preferences'
  | 'projects'
  | 'knowledge_spaces'
  | 'files'
  | 'tasks'
  | 'calendar'
  | 'connected_apps'
  | 'communications'
  | 'goals';

export interface OmniContextElement {
  id: string;
  category: OmniPersonalContextCategory;
  name: string;
  description: string;
  sourceApp: string;
  lastAccessedAt: string;
  status: 'enabled' | 'disabled' | 'revoked';
  dataSummary: string;
  privacyClassification: 'public' | 'internal' | 'confidential' | 'restricted';
  isDeletable: boolean;
  itemCount: number;
  rawSampleJson?: string;
  updatedAt: string;
}

export interface OmniContextAccessAudit {
  id: string;
  timestamp: string;
  category: OmniPersonalContextCategory;
  elementId: string;
  elementName: string;
  action: 'query' | 'synthesize' | 'command' | 'export';
  reason: string;
  userPrompt: string;
  tenantId: string;
  permissionsVerified: boolean;
}

export interface OmniPersonalCommandResult {
  command: string;
  category: string;
  synthesizedAnswer: string;
  sourcesUsed: { name: string; category: string; permissionsVerified: boolean }[];
  actionItems: { id: string; title: string; priority: 'high' | 'medium' | 'low'; dueDate?: string; sourceApp?: string; completed?: boolean }[];
  keyMetrics?: { label: string; value: string; change?: string; trend?: 'up' | 'down' | 'neutral' }[];
  confidenceScore: number;
  latencyMs: number;
  costUsd: number;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// OMNI TEAM AI & DEPARTMENTAL ASSISTANTS
// ---------------------------------------------------------------------------

export type OmniTeamDepartment = 
  | 'company_core'
  | 'executive'
  | 'sales'
  | 'marketing'
  | 'finance'
  | 'hr'
  | 'support'
  | 'operations'
  | 'legal_compliance';

export interface OmniDepartmentalAssistant {
  id: string;
  department: OmniTeamDepartment;
  name: string;
  title: string;
  icon: string;
  avatar: string;
  description: string;
  systemPrompt: string;
  scopes: string[];
  allowedToolIds: string[];
  knowledgeSpaceIds: string[];
  monthlyBudgetUsd: number;
  currentSpendUsd: number;
  autonomyLevel: OmniAgentAutonomyLevel;
  memoryRetentionDays: number;
  workingMemory: boolean;
  vectorMemory: boolean;
  parentAssistantId?: string;
  handoffTargets: OmniTeamDepartment[];
  assignedTeamMembers: string[];
  status: 'active' | 'paused';
  totalTasksExecuted: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface OmniTeamSharedPrompt {
  id: string;
  title: string;
  department: OmniTeamDepartment;
  description: string;
  template: string;
  variables: { name: string; label: string; placeholder: string; required: boolean }[];
  authorUserId: string;
  authorName: string;
  usageCount: number;
  isApproved: boolean;
  tags: string[];
  createdAt: string;
}

export interface OmniAgentHandoffSession {
  id: string;
  conversationId: string;
  fromAssistantId: string;
  fromDepartment: OmniTeamDepartment;
  toAssistantId: string;
  toDepartment: OmniTeamDepartment;
  reason: string;
  statePayload: Record<string, any>;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  timestamp: string;
}

export interface OmniEnterpriseAiPolicy {
  organizationId: string;
  allowedModels: { modelId: string; name: string; provider: string; isApproved: boolean; maxTier: string }[];
  allowedProviders: { providerId: string; name: string; isEnabled: boolean }[];
  dataRetentionPolicy: {
    retentionDays: number;
    autoScrubPii: boolean;
    redactSecrets: boolean;
    zeroDataRetentionEnforced: boolean;
  };
  budgetCeilings: {
    department: OmniTeamDepartment;
    monthlyCapUsd: number;
    alertAtPercent: number;
    currentMonthSpendUsd: number;
  }[];
  externalConnectors: {
    id: string;
    name: string;
    type: 'google_workspace' | 'slack' | 'jira' | 'github' | 'salesforce' | 'sap_erp';
    status: 'connected' | 'unlinked' | 'pending_auth';
    allowedScopes: string[];
    lastSyncAt?: string;
  }[];
  byokPolicy: {
    allowedForDepartments: OmniTeamDepartment[];
    requireFipsCompliance: boolean;
    allowLocalOllama: boolean;
  };
  sharingPolicies: {
    allowCrossDepartmentPromptSharing: boolean;
    allowCrossTenantDataSharing: boolean; // Strictly false by Sovereign rule
    requireManagerSignOffForCustomAgents: boolean;
  };
  maxAutonomyCeilingPerDepartment: Record<OmniTeamDepartment, OmniAgentAutonomyLevel>;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// CROSS-APP MULTI-STEP SYNTHESIS CONTRACT
// ---------------------------------------------------------------------------

export interface OmniCrossAppExecutionPipeline {
  id: string;
  query: string;
  title: string;
  targetApps: {
    appId: string;
    appName: string;
    isAvailable: boolean; // Registered app vs Graceful Capability state
    requiredScope: string;
    dataExtractedSummary?: string;
  }[];
  steps: {
    stepNumber: number;
    title: string;
    appId: string;
    toolId?: string;
    status: 'completed' | 'simulated' | 'degraded_fallback' | 'failed';
    outputData?: any;
    summary: string;
  }[];
  synthesizedOutput: string;
  actionableRecommendations: string[];
  executionTimeMs: number;
  costUsd: number;
  timestamp: string;
}

// ===========================================================================
// PROMPT 10: OMNI AI MARKETPLACE, MONETISATION, CREDITS, WHITE-LABEL & PARTNER ECONOMY
// ===========================================================================

export type OmniAiPlanTier = 'free' | 'plus' | 'pro' | 'business' | 'enterprise' | 'pay_as_you_go';

export interface OmniAiPlanConfig {
  id: string;
  tier: OmniAiPlanTier;
  name: string;
  badge?: string;
  description: string;
  basePriceMonthlyUsd: number;
  basePriceAnnualMonthlyUsd: number;
  isCustomPricing: boolean;
  limits: {
    requestsPerDay: number;
    monthlyTokens: number;
    concurrentExecutions: number;
    maxContextWindow: number;
    rateLimitRpm: number;
  };
  allowedModels: string[];
  allowedAgentCount: number;
  maxAgentAutonomy: OmniAgentAutonomyLevel;
  storageGb: number;
  deepResearchQueriesPerMonth: number;
  mediaCreditsPerMonth: {
    imageGenerations: number;
    videoSeconds: number;
    ttsCharacters: number;
    voiceMinutes: number;
  };
  codeSandboxMinutesPerMonth: number;
  teamSeatsIncluded: number;
  maxSeats: number;
  perAdditionalSeatUsd: number;
  apiAccessTier: 'none' | 'standard' | 'enterprise_high_throughput';
  whiteLabelEligible: boolean;
  byokEligible: boolean;
  byomEligible: boolean;
  slaGuaranteePercent: number;
  dedicatedSupport: boolean;
  isPopular?: boolean;
}

export type OmniUsageDimension = 
  | 'text_inference' 
  | 'reasoning' 
  | 'deep_research' 
  | 'images' 
  | 'video' 
  | 'audio' 
  | 'agents' 
  | 'tool_execution' 
  | 'storage' 
  | 'code_sandbox' 
  | 'api_calls';

export interface OmniUsageUnitRate {
  dimension: OmniUsageDimension;
  name: string;
  unitLabel: string;
  baseProviderCostUsd: number;
  infraCostUsd: number;
  configuredMarginPercent: number;
  creditsPerUnit: number;
  billableUsdPerUnit: number;
  description: string;
}

export interface OmniUsageConsumptionLog {
  id: string;
  tenantId: string;
  organizationId: string;
  userId: string;
  userEmail: string;
  dimension: OmniUsageDimension;
  quantity: number;
  rawProviderCostUsd: number;
  infraCostUsd: number;
  marginUsd: number;
  totalBillableUsd: number;
  creditsDeducted: number;
  doubleEntryLedgerRefId: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface OmniAiBudgetStructure {
  id: string;
  organizationId: string;
  tenantId: string;
  monthlyBudgetUsd: number;
  monthlyBudgetCredits: number;
  currentSpentUsd: number;
  currentSpentCredits: number;
  dailyCapUsd: number;
  todaySpentUsd: number;
  projectBudgets: {
    projectId: string;
    projectName: string;
    monthlyCapUsd: number;
    currentSpentUsd: number;
  }[];
  agentBudgets: {
    agentId: string;
    agentName: string;
    monthlyCapUsd: number;
    currentSpentUsd: number;
  }[];
  notificationThresholds: number[]; // e.g. [50, 80, 90, 100]
  alertsTriggered: {
    threshold: number;
    triggeredAt: string;
    acknowledged: boolean;
  }[];
  enforcementMode: 'soft_alert' | 'hard_stop';
  autoRechargeEnabled: boolean;
  autoRechargeThresholdUsd?: number;
  autoRechargeAmountUsd?: number;
  updatedAt: string;
}

export type OmniMarketplaceItemType = 
  | 'agent' 
  | 'prompt_system' 
  | 'workflow' 
  | 'skill' 
  | 'connector' 
  | 'knowledge_template' 
  | 'automation_template' 
  | 'model_integration' 
  | 'specialist_ai_product';

export type OmniMarketplacePricingModel = 'free' | 'one_time' | 'monthly_subscription' | 'usage_based';

export type OmniMarketplaceReviewStatus = 
  | 'draft' 
  | 'submitted' 
  | 'automated_review' 
  | 'security_review' 
  | 'approved' 
  | 'rejected' 
  | 'published';

export interface OmniMarketplaceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  itemType: OmniMarketplaceItemType;
  category: 'productivity' | 'finance' | 'legal' | 'developer' | 'marketing' | 'sales' | 'operations' | 'creative' | 'security' | 'research';
  creatorId: string;
  creatorName: string;
  creatorOrg: string;
  creatorAvatar?: string;
  creatorVerified: boolean;
  isOmniOfficial: boolean;
  description: string;
  fullMarkdown: string;
  featuresList: string[];
  screenshots: { id: string; url: string; caption: string }[];
  version: string;
  releaseNotes: string;
  changelog: { version: string; date: string; notes: string }[];
  pricingModel: OmniMarketplacePricingModel;
  priceUsd: number;
  creditsPrice?: number;
  usageUnitRateUsd?: number;
  trialDays?: number;
  requiredScopes: string[];
  allowedRoles: string[];
  supportedCountries: string[]; // ['ALL'] or ISO codes
  dependencies: {
    type: 'model' | 'tool' | 'connector' | 'env_var';
    name: string;
    isRequired: boolean;
    isSatisfied?: boolean;
  }[];
  supportInfo: {
    email: string;
    docsUrl: string;
    responseTimeSla: string;
  };
  privacyInfo: {
    dataRetentionDays: number;
    piiCollected: boolean;
    telemetryStored: boolean;
    zeroDataRetentionSupported: boolean;
    privacyPolicyUrl: string;
  };
  reviewStatus: OmniMarketplaceReviewStatus;
  automatedScanResults?: {
    passed: boolean;
    securityScore: number;
    vulnerabilitiesFound: number;
    piiChecksPassed: boolean;
    permissionLeakCheck: boolean;
    scannedAt: string;
    reportNotes: string;
  };
  securityPolicyReview?: {
    reviewedBy: string;
    decision: 'approved' | 'rejected' | 'pending';
    feedbackNotes?: string;
    decidedAt?: string;
  };
  rating: number;
  reviewCount: number;
  installCount: number;
  activeTenantsCount: number;
  isInstalledInCurrentOrg?: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OmniMarketplaceInstallation {
  id: string;
  marketplaceItemId: string;
  itemTitle: string;
  itemType: OmniMarketplaceItemType;
  tenantId: string;
  organizationId: string;
  installedByUserId: string;
  installedByUserEmail: string;
  approvedScopes: string[];
  autoUpdate: boolean;
  status: 'active' | 'suspended' | 'revoked';
  subscriptionId?: string;
  priceUsd: number;
  doubleEntryLedgerRef?: string;
  installedAt: string;
  lastUsedAt?: string;
}

export interface OmniMarketplaceDeveloperPayout {
  id: string;
  developerId: string;
  developerName: string;
  grossRevenueUsd: number;
  platformCommissionPercent: number;
  platformCommissionUsd: number;
  netEarningsUsd: number;
  availableForPayoutUsd: number;
  pendingHoldUsd: number;
  lifetimeEarningsUsd: number;
  payoutMethod: 'omni_wallet' | 'stripe_connect' | 'bank_wire' | 'crypto';
  recentTransactions: {
    id: string;
    itemId: string;
    itemTitle: string;
    tenantName: string;
    amountGrossUsd: number;
    commissionUsd: number;
    netUsd: number;
    timestamp: string;
  }[];
}

export interface OmniAiWhiteLabelConfig {
  id: string;
  tenantId: string;
  organizationId: string;
  isEnabled: boolean;
  brandName: string;
  logoUrl: string;
  faviconUrl: string;
  customDomain: string;
  cnameTarget: string;
  dnsStatus: 'verified' | 'propagating' | 'pending';
  sslActive: boolean;
  primaryColorHex: string;
  accentColorHex: string;
  backgroundColorHex: string;
  surfaceColorHex: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  defaultPromptSuggestions: string[];
  enabledAgentIds: string[];
  enabledKnowledgeSpaceIds: string[];
  allowedModelIds: string[];
  customPricingPlans: {
    planId: string;
    name: string;
    priceMonthlyUsd: number;
    customLimitsSummary: string;
  }[];
  customUsageCreditsMultiplier: number;
  marketplaceMode: 'curated_only' | 'full_ecosystem' | 'disabled';
  providerSecretsExposed: false; // strictly locked to false for sovereign safety
  updatedBy: string;
  updatedAt: string;
}

export interface OmniAffiliateProgramConfig {
  id: string;
  affiliateCode: string;
  affiliateUserId: string;
  affiliateOrgName: string;
  referralLink: string;
  defaultCommissionRatePercent: number;
  recurringCommissionRatePercent: number;
  marketplaceProductCommissionPercent: number;
  cookieWindowDays: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenueGeneratedUsd: number;
  totalCommissionEarnedUsd: number;
  pendingPayoutUsd: number;
  status: 'active' | 'paused';
  referralHistory: {
    id: string;
    referredTenantName: string;
    planPurchased: string;
    revenueUsd: number;
    commissionUsd: number;
    date: string;
    status: 'paid' | 'pending' | 'cleared';
  }[];
}

export interface OmniResellerHierarchy {
  id: string;
  resellerOrgId: string;
  resellerOrgName: string;
  tier: 'authorized' | 'silver' | 'gold' | 'diamond_sovereign';
  wholesaleDiscountPercent: number;
  retailMarkupPercent: number;
  allocatedMonthlyQuotaCredits: number;
  usedQuotaCredits: number;
  activeSubTenantsCount: number;
  subTenants: {
    tenantId: string;
    orgName: string;
    planTier: OmniAiPlanTier;
    allocatedCredits: number;
    status: 'active' | 'suspended';
    joinedDate: string;
  }[];
  monthlyResellerVolumeUsd: number;
  totalMarginEarnedUsd: number;
}

export interface OmniReconciliationTestResult {
  id: string;
  testName: string;
  category: 'ledger_sync' | 'margin_accuracy' | 'developer_split' | 'budget_hard_stop' | 'tenant_isolation' | 'secret_redaction' | 'byok_enclave' | 'reseller_reconciliation';
  description: string;
  status: 'passed' | 'failed' | 'running';
  assertionsCount: number;
  assertionsPassed: number;
  simulatedInput: Record<string, any>;
  calculatedOutput: Record<string, any>;
  ledgerEntriesVerified: {
    debitAccount: string;
    creditAccount: string;
    amount: number;
    isBalanced: boolean;
  }[];
  executionLatencyMs: number;
  verifiedAt: string;
  reconciliationHash: string;
}

// =========================================================================
// PROMPT 11: OMNI AI ADMINISTRATION, SAFETY, SECURITY, PRIVACY & OBSERVABILITY
// =========================================================================

export type OmniAiProviderVendor = 'google' | 'openai' | 'anthropic' | 'deepseek' | 'meta_llama' | 'mistral' | 'byok_custom' | 'byom_onprem';

export interface OmniAiProviderConfig {
  id: string;
  name: string;
  vendor: OmniAiProviderVendor;
  isEnabled: boolean;
  status: 'operational' | 'degraded' | 'disabled' | 'rate_limited' | 'maintenance';
  endpoint: string;
  apiKeyConfigured: boolean;
  apiKeyMasked: string;
  countryAvailability: string[]; // ['ALL'] or specific ISO codes
  tenantAvailability: string[]; // ['ALL'] or specific tenant IDs
  capabilities: {
    text: boolean;
    vision: boolean;
    audio: boolean;
    realtimeStreaming: boolean;
    reasoning: boolean;
    toolExecution: boolean;
    codeSandbox: boolean;
    fineTuning: boolean;
    embedding: boolean;
  };
  costMetadata: {
    inputCostPerMTokensUsd: number;
    outputCostPerMTokensUsd: number;
    cacheReadCostPerMTokensUsd: number;
    audioInputCostPerMinuteUsd?: number;
    imageCostPerGenUsd?: number;
  };
  fallbackProviderId?: string;
  deprecatedModels: string[];
  latencyP95Ms: number;
  errorRatePercent: number;
  compliancePiiScrubbed: boolean;
  notes?: string;
}

export interface OmniAiRoutingPolicy {
  id: string;
  name: string;
  description: string;
  priority: number;
  strategy: 'cost_optimized' | 'latency_optimized' | 'highest_quality' | 'sovereign_local_only' | 'fallback_cascade' | 'consensus_panel' | 'custom_rules';
  isEnabled: boolean;
  rules: {
    id: string;
    conditionField: 'task_type' | 'prompt_token_count' | 'tenant_tier' | 'user_role' | 'country_code' | 'privacy_level' | 'estimated_cost';
    operator: 'equals' | 'greater_than' | 'less_than' | 'in_list' | 'contains';
    value: string | number | string[];
    targetModelId: string;
    targetProviderId: string;
  }[];
  fallbackModelId: string;
  fallbackProviderId: string;
  appliedRequestCount: number;
  avgRoutingLatencyMs: number;
  lastEditedBy: string;
  updatedAt: string;
}

export interface OmniSystemPromptRegistryEntry {
  id: string;
  title: string;
  version: string;
  ownerUserId: string;
  ownerName: string;
  applicationScope: 'global_system' | 'crm' | 'finance' | 'code' | 'deep_research' | 'support' | 'legal' | 'medical' | 'custom';
  promptContent: string;
  status: 'draft' | 'under_evaluation' | 'active_production' | 'deprecated';
  evaluationScore: number; // 0 - 100
  safetyGrade: 'A+' | 'A' | 'B' | 'C' | 'FAIL';
  confidential: boolean;
  allowedRoles: UserRole[];
  deploymentDate: string;
  changelog: string;
  temperature: number;
  topP: number;
  maxTokens: number;
}

export interface OmniAiEvaluationDataset {
  id: string;
  name: string;
  description: string;
  domain: 'general' | 'coding' | 'reasoning' | 'safety' | 'rag_citation' | 'tool_calling' | 'finance' | 'medical';
  sampleCount: number;
  goldenTruthVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OmniAiEvaluationRun {
  id: string;
  datasetId: string;
  datasetName: string;
  modelId: string;
  providerId: string;
  taskSuccessRate: number; // 0 - 100%
  factualityScore: number; // 0 - 100%
  citationQualityScore: number; // 0 - 100%
  p95LatencyMs: number;
  avgCostPerQueryUsd: number;
  userPreferenceWinRate: number; // 0 - 100%
  toolSuccessRate: number; // 0 - 100%
  safetyPassRate: number; // 0 - 100%
  routingPerformanceScore: number; // 0 - 100%
  sampleCount: number;
  testDate: string;
  status: 'completed' | 'running' | 'failed';
  evaluatedBy: string;
  notes: string;
}

export type OmniAiSecurityAttackVector =
  | 'prompt_injection'
  | 'indirect_prompt_injection'
  | 'tool_poisoning'
  | 'retrieval_poisoning'
  | 'system_prompt_leakage'
  | 'secret_leakage'
  | 'cross_tenant_rag_leakage'
  | 'unauthorized_tool_execution'
  | 'excessive_agency'
  | 'arbitrary_url_ssrf'
  | 'malicious_upload'
  | 'data_exfiltration'
  | 'unsafe_code_exec';

export interface OmniAiSecurityIncidentAlert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  attackVector: OmniAiSecurityAttackVector;
  tenantId: string;
  tenantName: string;
  userId: string;
  userEmail: string;
  ipAddress: string;
  promptExcerpt: string;
  mitigationAction: 'blocked_at_gateway' | 'redacted_by_enclave' | 'tool_execution_denied' | 'tenant_quarantined' | 'session_terminated';
  isResolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNote?: string;
}

export interface OmniAiSecurityTestResult {
  id: string;
  vector: OmniAiSecurityAttackVector;
  testName: string;
  payloadInput: string;
  expectedProtection: string;
  observedDefenseBehavior: string;
  isPassed: boolean;
  protectionTier: 'L1_gateway_firewall' | 'L2_context_isolator' | 'L3_tool_sandbox' | 'L4_redaction_enclave';
  executionTimeMs: number;
  testedAt: string;
}

export interface OmniPrivacyGovernancePolicy {
  tenantId: string;
  tenantName: string;
  dataMinimizationEnabled: boolean;
  retentionDays: number;
  allowEvaluationUsage: boolean;
  allowModelTraining: boolean; // Strictly false by default; requiring explicit separate consent
  userExportEnabled: boolean;
  hardDeletionGraceDays: number;
  memoryPurgeSchedule: 'immediate' | 'daily' | 'weekly' | 'never';
  piiMaskingLevel: 'strict' | 'standard' | 'off';
  zeroDataRetentionEnforced: boolean;
  updatedAt: string;
  governingOfficer: string;
}

export interface OmniHighStakesGuardConfig {
  domain: 'health' | 'law' | 'finance' | 'employment' | 'education' | 'government';
  title: string;
  isEnabled: boolean;
  requiredDisclaimerText: string;
  enforcementMode: 'mandatory_disclaimer' | 'block_advisory_claims' | 'require_human_expert_co_sign';
  auditRetentionDays: number;
  blockedKeywords: string[];
  safeAlternativeAdviceTemplate: string;
}

export interface OmniDistributedTraceEntry {
  traceId: string;
  correlationId: string; // OMNI App -> AI Gateway -> provider/tool -> response -> billing
  timestamp: string;
  appOrigin: 'OMNI_CHAT' | 'OMNI_DEEP_RESEARCH' | 'OMNI_CODE' | 'OMNI_AGENTS' | 'OMNI_SYNTHESIS' | 'OMNI_API';
  tenantId: string;
  userId: string;
  gatewayDurationMs: number;
  providerDurationMs: number;
  totalDurationMs: number;
  providerName: string;
  modelName: string;
  toolCallsCount: number;
  toolsUsed: string[];
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  providerCostUsd: number;
  billingOcuCharged: number;
  statusCode: 200 | 400 | 403 | 429 | 500 | 504;
  securityInspectionResult: 'pass' | 'flagged' | 'blocked';
  ipEgressRedacted: boolean;
}

export interface OmniSovereignKillSwitch {
  id: string;
  targetType: 'model' | 'provider' | 'agent' | 'tool' | 'tenant' | 'api_key' | 'routing_override';
  targetId: string;
  targetName: string;
  isBlocked: boolean;
  reason: string;
  activatedBy: string;
  activatedAt: string;
  impactedWorkloads: string;
}

// ==========================================
// OMNI BROWSER SOVEREIGN TYPES & INTERFACES
// ==========================================

export type OmniBrowserTabSecurity = 'secure' | 'insecure' | 'warning' | 'sandboxed' | 'tor_routed';

export interface OmniBrowserSslInfo {
  protocol: string; // e.g. TLS 1.3
  cipherSuite: string;
  issuer: string;
  validUntil: string;
  keyStrength: string;
  hstsEnabled: boolean;
  certificateAuthority: string;
  isOrganizationValidated: boolean;
}

export interface OmniBrowserTab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  isLoading?: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
  workspaceId: string;
  containerColor?: string; // Container tab color (e.g. blue for work, orange for personal)
  containerName?: string; // e.g. "Work Enclave", "Personal", "Crypto/Finance"
  securityStatus?: OmniBrowserTabSecurity;
  sslInfo?: OmniBrowserSslInfo;
  trackersBlockedCount: number;
  adsBlockedCount: number;
  fingerprintAttemptsDeflected: number;
  history?: string[];
  historyIndex?: number;
  readerModeActive?: boolean;
  zoomLevel?: number;
  createdAt?: string;
  lastAccessedAt: string;
  splitWithTabId?: string; // For side-by-side split screen
}

export interface OmniBrowserWorkspace {
  id: string;
  name: string;
  icon: string; // Lucide icon identifier
  color: string; // Hex or tailwind class
  description: string;
  tabIds: string[];
  activeTabId: string;
  isDefault: boolean;
  organizationId: string;
  profileType: OMNIProfileType;
  tags: string[];
  createdAt: string;
  cookieContainerId?: string;
  vpnRelayOverrideId?: string;
  isZeroTelemetry?: boolean;
  proxyNode?: string;
  cookieJarScope?: string;
}

export interface OmniBrowserBookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folderId: string | null;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  note?: string;
  aiSummary?: string;
}

export interface OmniBrowserBookmarkFolder {
  id: string;
  name: string;
  parentId: string | null;
  color?: string;
  icon?: string;
  isExpanded?: boolean;
}

export interface OmniBrowserHistoryEntry {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  visitedAt: string;
  visitCount: number;
  category: 'ecosystem' | 'productivity' | 'research' | 'finance' | 'developer' | 'general';
  workspaceId: string;
  trackersBlockedCount: number;
}

export interface OmniBrowserDownloadItem {
  id: string;
  filename: string;
  fileSize: number; // bytes
  fileType: string;
  url: string;
  progress: number; // 0 to 100
  status: 'downloading' | 'completed' | 'paused' | 'cancelled' | 'scanned_safe' | 'threat_quarantined';
  downloadedAt: string;
  localPath: string;
  sha256: string;
  speedBps: number;
  mimeType: string;
  omniCloudSynced?: boolean;
  omniCloudFileId?: string;
  omniCloudVaultPath?: string;
  storageTier?: 'standard' | 'encrypted_vault' | 'immutable_archive';
}

export interface OmniBrowserExtension {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string;
  author: string;
  isEnabled: boolean;
  permissions: string[];
  category: 'privacy' | 'productivity' | 'developer' | 'ai' | 'security' | 'web3';
  rating: number;
  installCount: number;
  optionsUrl?: string;
  isVerifiedByOmni: boolean;
  sizeKb: number;
  lastUpdated: string;
}

export interface OmniBrowserPrivacyShield {
  id: string;
  name: string;
  isEnabled: boolean;
  description: string;
  category: 'trackers' | 'ads' | 'fingerprinting' | 'https_upgrade' | 'crypto_mining' | 'malware' | 'cookie_isolation' | 'referrer_trim';
  blockedCount24h: number;
  protectionTier: 'standard' | 'aggressive' | 'custom';
}

export interface OmniBrowserVpnNode {
  id: string;
  location: string;
  countryCode: string;
  city: string;
  ip: string;
  pingMs: number;
  loadPercent: number;
  isPremium: boolean;
  protocol: 'WireGuard' | 'OpenVPN' | 'OmniTunnel' | 'TorBridge';
  status: 'available' | 'connected' | 'maintenance';
}

export interface OmniBrowserVpnState {
  isConnected: boolean;
  activeNodeId: string | null;
  bytesDownloaded: number;
  bytesUploaded: number;
  sessionDurationSeconds: number;
  ipMasked: string;
  killSwitchEnabled: boolean;
  splitTunnelingEnabled: boolean;
  dnsOverHttps: boolean;
  dohProvider: string; // e.g. "Cloudflare Privacy", "Quad9", "OMNI Sovereign DNS"
  torRelayEnabled: boolean;
}

export interface OmniBrowserSearchEngine {
  id: string;
  name: string;
  urlTemplate: string;
  icon: string;
  isDefault: boolean;
  isAiGrounded: boolean;
  description: string;
}

export interface OmniBrowserSettings {
  defaultSearchEngineId: string;
  homePageUrl: string;
  newTabPageMode: 'omni_feed' | 'blank' | 'custom' | 'ai_briefing';
  defaultZoom: number;
  hardwareAcceleration: boolean;
  clearDataOnExit: boolean;
  blockThirdPartyCookies: boolean;
  sendDoNotTrack: boolean;
  enableVpnOnStartup: boolean;
  enableAiCopilotSidebar: boolean;
  autoSummarizeLongArticles: boolean;
  omniboxAiAutoSuggest: boolean;
  tabLayout: 'horizontal_top' | 'vertical_sidebar';
  themeMode: 'system' | 'light' | 'dark' | 'glass';
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  syncWithPassport: boolean;
}

export interface OmniBrowserReaderContent {
  url: string;
  title: string;
  byline?: string;
  publishedDate?: string;
  readingTimeMinutes: number;
  headings: string[];
  markdownContent: string;
  wordCount: number;
  aiKeyInsights: string[];
  aiSentiment: 'neutral' | 'positive' | 'critical' | 'analytical';
}

export interface OmniBrowserSecurityAuditLog {
  id: string;
  timestamp: string;
  url: string;
  eventType: 'tracker_blocked' | 'ad_scrubbed' | 'fingerprint_randomized' | 'https_upgraded' | 'cookie_isolated' | 'malware_intercepted';
  domain: string;
  actionTaken: string;
  protectionLayer: string;
}

export interface OmniBrowserNativeBridgeSpec {
  providerName: string;
  runtimeEnvironment: 'web_sandbox' | 'tauri_desktop' | 'electron_desktop' | 'react_native_mobile' | 'wasm_engine';
  isNativeEngineConnected: boolean;
  capabilitiesSupported: string[];
  engineVersion: string;
}

// ===========================================================================
// PROMPT 2: OMNI BROWSER ENGINE LAYER & MULTIPLATFORM ARCHITECTURE
// ===========================================================================

export type BrowserPlatformType = 'web' | 'pwa' | 'extension' | 'desktop' | 'android' | 'ios';

export interface BrowserRuntimeCapabilities {
  supportsMultipleWindows: boolean;
  supportsNativeTabs: boolean;
  supportsFilesystemDirectAccess: boolean;
  supportsNativeVpnRouting: boolean;
  supportsBackgroundSync: boolean;
  supportsNotifications: boolean;
  supportsBiometrics: boolean;
  supportsHardwareAcceleration: boolean;
  supportsWasmSandbox: boolean;
  supportsDeclarativeNetRequest: boolean;
  supportsServiceWorker: boolean;
}

export interface BrowserRuntimeInfo {
  platform: BrowserPlatformType;
  version: string;
  engineName: string;
  engineVersion: string;
  userAgent: string;
  isOnline: boolean;
  memoryUsageMb: number;
  sandboxType: 'isolated_wasm' | 'chromium_embed' | 'wkwebview' | 'native_v8';
  capabilities: BrowserRuntimeCapabilities;
}

export interface OmniBrowserTabGroup {
  id: string;
  title: string;
  color: string;
  isCollapsed: boolean;
  tabIds: string[];
  workspaceId: string;
  createdAt: string;
}

export interface OmniBrowserSavedSession {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: string;
  tabCount: number;
  tabsSnapshot: Array<{
    id: string;
    title: string;
    url: string;
    favicon?: string;
    containerColor?: string;
    containerName?: string;
  }>;
  groupsSnapshot: OmniBrowserTabGroup[];
  isAutoSaved: boolean;
}

export interface OmniBrowserProjectSpace {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  associatedWorkspaceId: string;
  pinnedUrls: string[];
  savedNote: string;
  aiContextPrompt: string;
  updatedAt: string;
  collaboratorDids?: string[];
}

export interface OmniBrowserReadingListAnnotation {
  id: string;
  text: string;
  selectedQuote: string;
  color: string; // e.g. '#fef08a' (yellow), '#bbf7d0' (green), '#bae6fd' (blue)
  createdAt: string;
}

export interface OmniBrowserReadingListItem {
  id: string;
  url: string;
  title: string;
  domain: string;
  savedAt: string;
  isRead: boolean;
  readingTimeMinutes: number;
  aiSummary?: string;
  aiKeyPoints?: string[];
  annotations: OmniBrowserReadingListAnnotation[];
  offlineCached: boolean;
  tags: string[];
}

export interface OmniBrowserSyncConfig {
  syncEnabled: boolean;
  syncTabs: boolean;
  syncBookmarks: boolean;
  syncHistory: boolean;
  syncReadingList: boolean;
  syncExtensions: boolean;
  syncSettings: boolean;
  syncWorkspaces: boolean;
  encryptionPassphraseHash: string;
  keyFingerprint: string;
  lastSyncTimestamp: string;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'conflict_detected' | 'error';
  autoSyncIntervalMinutes: number;
  cloudEndpoint: string;
  totalEncryptedBytesSynced: number;
}

export interface OmniBrowserSyncPayload {
  id: string;
  deviceId: string;
  deviceName: string;
  syncedAt: string;
  schemaVersion: number;
  encryptedBlobLength: number;
  vectorClock: number;
  checksum: string;
}

export interface OmniBrowserAuthorizedDevice {
  id: string;
  deviceName: string;
  platform: BrowserPlatformType;
  osVersion: string;
  browserEngineVersion: string;
  lastActiveIp: string;
  locationCity: string;
  locationCountry: string;
  isCurrentDevice: boolean;
  isVerified: boolean;
  trustScore: number; // 0-100
  lastSeenAt: string;
  firstAuthorizedAt: string;
  deviceFingerprint: string;
  pushToken?: string;
  status: 'authorized' | 'quarantined' | 'revoked';
}

export interface OmniBrowserSecuritySession {
  sessionId: string;
  deviceId: string;
  deviceName: string;
  userId: string;
  passportDid: string;
  createdAt: string;
  expiresAt: string;
  lastActivityAt: string;
  status: 'active' | 'revoked' | 'expired' | 'quarantined';
  isMfaVerified: boolean;
  ipAddress: string;
  userAgent: string;
}

export interface OmniBrowserSuspiciousAlert {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  deviceId?: string;
  ipAddress: string;
  resolved: boolean;
  actionTaken: string;
}

// ===========================================================================
// PROMPT 3: OMNI AI BROWSER ASSISTANT
// ===========================================================================

export type OmniBrowserAssistantSubMode =
  | 'page_understanding'
  | 'research'
  | 'shopping'
  | 'content_create'
  | 'voice'
  | 'ask_omni_chat';

export interface OmniBrowserPageEntity {
  name: string;
  category: 'person' | 'organization' | 'technology' | 'metric' | 'date' | 'location' | 'price';
  context: string;
  importance: 'high' | 'medium' | 'low';
}

export interface OmniBrowserPageSummary {
  url: string;
  title: string;
  domain: string;
  executiveSummary: string;
  keyTakeaways: string[];
  readingTimeMinutes: number;
  sentiment: 'constructive' | 'analytical' | 'optimistic' | 'cautious' | 'critical';
  comprehensionLevels: {
    executive: string;
    intermediate: string;
    deepTechnical: string;
  };
  extractedEntities: OmniBrowserPageEntity[];
  extractedDataPoints: Array<{ label: string; value: string; confidence: number }>;
  actionItems: string[];
  citations: Array<{ quote: string; sourceAnchor?: string; section: string }>;
  suggestedFollowUps: string[];
  generatedAt: string;
}

export interface OmniBrowserComparisonItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  specs: Record<string, string>;
  pricing: string;
  targetAudience: string;
  score: number; // 1-100
}

export interface OmniBrowserComparisonMatrix {
  id: string;
  topic: string;
  itemA: OmniBrowserComparisonItem;
  itemB: OmniBrowserComparisonItem;
  featureMatrix: Array<{
    feature: string;
    itemAValue: string;
    itemBValue: string;
    winner: 'A' | 'B' | 'tie';
    notes: string;
  }>;
  aiVerdict: string;
  recommendedChoice: string;
  generatedAt: string;
}

export interface OmniBrowserResearchSource {
  id: string;
  title: string;
  url: string;
  domain: string;
  relevanceScore: number;
  credentialTier: 'peer_reviewed' | 'official_spec' | 'verified_news' | 'developer_docs' | 'web_open';
  keyQuote: string;
  authorOrOrg: string;
}

export interface OmniBrowserResearchReport {
  id: string;
  topic: string;
  hypothesis?: string;
  status: 'gathering_sources' | 'synthesizing' | 'completed' | 'failed';
  depth: 'standard' | 'deep' | 'exhaustive';
  executiveSummary: string;
  keyFindings: string[];
  consensusMatrix: Array<{
    claim: string;
    level: 'broad_consensus' | 'emerging_agreement' | 'active_controversy';
    supportingSourcesCount: number;
    opposingSourcesCount: number;
    summary: string;
  }>;
  detailedAnalysisSections: Array<{
    heading: string;
    contentMarkdown: string;
    sourceIds: string[];
  }>;
  sourcesGathered: OmniBrowserResearchSource[];
  recommendedActions: string[];
  exportedToOmniDocs: boolean;
  docId?: string;
  createdAt: string;
  tokensConsumed: number;
  costUsd: number;
}

export interface OmniBrowserProductReviewSentiment {
  authenticityScore: number; // 0-100 (flags fake/bot reviews)
  sentimentScore: number; // 0-100
  totalReviewsAnalyzed: number;
  verifiedPurchasersRatio: number;
  commonPraise: string[];
  commonComplaints: string[];
  recurringDefectWarnings: string[];
}

export interface OmniBrowserProductPriceHistory {
  date: string;
  price: number;
  seller: string;
}

export interface OmniBrowserShoppingAnalysis {
  id: string;
  url: string;
  productName: string;
  currentPrice: number;
  originalPrice?: number;
  currency: string;
  dealRating: 'excellent_deal' | 'fair_price' | 'overpriced' | 'historic_low';
  discountPercentage?: number;
  sellerName: string;
  sellerTrustScore: number; // 0-100
  productCategory: string;
  specsSummary: Record<string, string>;
  pros: string[];
  cons: string[];
  reviewIntelligence: OmniBrowserProductReviewSentiment;
  priceHistory: OmniBrowserProductPriceHistory[];
  availableCoupons: Array<{ code: string; discountDesc: string; verifiedSuccessRate: number }>;
  alternativeProducts: Array<{
    name: string;
    url: string;
    price: number;
    comparisonNote: string;
  }>;
  buyingVerdict: string;
  // Explicit Human Confirmation Policy:
  // "Do not make purchasing decisions without user confirmation."
  purchaseRequest?: {
    status: 'awaiting_user_confirmation' | 'confirmed_by_user' | 'declined' | 'settled';
    authorizedAmount: number;
    currency: string;
    merchant: string;
    deliveryAddressHash: string;
    confirmedAt?: string;
    userSignatureToken?: string;
  };
}

export interface OmniBrowserSocialPostVariants {
  xTwitter: string;
  linkedIn: string;
  threads: string;
  bluesky: string;
}

export interface OmniBrowserVideoScriptScene {
  timestamp: string;
  hookOrSection: string;
  visualCue: string;
  narrationVoiceover: string;
  onScreenText: string;
}

export interface OmniBrowserPresentationSlide {
  slideNumber: number;
  title: string;
  bullets: string[];
  speakerNotes: string;
  suggestedVisual: string;
}

export interface OmniBrowserContentCreationResult {
  id: string;
  sourceUrl: string;
  sourceTitle: string;
  targetFormat: 'social_posts' | 'newsletter' | 'blog' | 'video_script' | 'presentation' | 'executive_summary';
  socialPosts?: OmniBrowserSocialPostVariants;
  newsletterIssue?: {
    subjectLine: string;
    previewSnippet: string;
    bodyMarkdown: string;
    curatorTake: string;
  };
  blogPostMarkdown?: string;
  videoScript?: {
    title: string;
    targetDuration: string;
    targetPlatform: 'YouTube' | 'TikTok / Reels' | 'Conference Keynote';
    hook: string;
    scenes: OmniBrowserVideoScriptScene[];
    callToAction: string;
  };
  presentationDeck?: {
    title: string;
    subtitle: string;
    themeStyle: string;
    slides: OmniBrowserPresentationSlide[];
  };
  executiveSummaryText?: string;
  sentToOmniAiCreate: boolean;
  omniCreateProjectId?: string;
  createdAt: string;
}

export interface OmniBrowserVoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  liveAudioLevel: number; // 0-100 for visualizer
  selectedVoice: string;
  speakingRate: number; // 0.8 - 1.5
  speakingPitch: number;
  supportedVoices: string[];
  lastVoiceCommandRecognized?: string;
  lastAiSpokenResponse?: string;
}

export interface OmniBrowserCommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'page_understanding' | 'research' | 'shopping' | 'creation' | 'voice' | 'navigation' | 'security';
  shortcut?: string;
  actionType: string;
  presetPrompt?: string;
}

export interface OmniBrowserAiMessage {
  id: string;
  sender: 'user' | 'omni_ai' | 'system';
  text: string;
  timestamp: string;
  actionSuggested?: string;
  actionData?: any;
  sourcesCited?: Array<{ title: string; url: string }>;
  tokens?: number;
  modelUsed?: string;
}

export interface OmniBrowserAiChatSession {
  id: string;
  workspaceId: string;
  currentTabUrl?: string;
  messages: OmniBrowserAiMessage[];
  activeSubMode: OmniBrowserAssistantSubMode;
  isStreaming: boolean;
}

// ===========================================================================
// PROMPT 4: OMNI SECURE VPN & PRIVACY PROTECTION PLATFORM
// ===========================================================================

export type OmniVpnProviderCategory =
  | 'omni_infrastructure'
  | 'approved_provider'
  | 'enterprise_provider'
  | 'custom_wireguard';

export type OmniVpnProtocolType =
  | 'WireGuard'
  | 'OpenVPN'
  | 'IPsec_IKEv2'
  | 'Tailscale_Mesh'
  | 'Cloudflare_WARP'
  | 'Sovereign_Relay';

export type OmniVpnConnectionStatus =
  | 'disconnected'
  | 'resolving_dns'
  | 'initiating_handshake'
  | 'routing_traffic'
  | 'connected'
  | 'reconnecting'
  | 'disconnecting'
  | 'error'
  | 'killswitch_engaged';

export interface OmniVpnServerNode {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America' | 'Middle East' | 'Sovereign Mesh';
  flagEmoji: string;
  ipAddress: string;
  providerId: string;
  providerType: OmniVpnProviderCategory;
  latencyMs: number;
  loadPercent: number;
  protocol: OmniVpnProtocolType;
  tier: 'free' | 'pro' | 'enterprise';
  features: {
    multiHop: boolean;
    p2pAllowed: boolean;
    zeroLoggingAudited: boolean;
    streamingOptimized: boolean;
    ipv6Ready: boolean;
    hardwareEnclave: boolean;
  };
  isOnline: boolean;
}

export interface OmniVpnProviderAdapterInfo {
  id: string;
  name: string;
  category: OmniVpnProviderCategory;
  vendorLogo: string;
  description: string;
  authType: 'token' | 'config_file' | 'sso_saml' | 'public_key';
  isConfigured: boolean;
  isDeployed: boolean; // Accurate status: true only if infrastructure is deployed
  deploymentNote?: string;
  supportedProtocols: OmniVpnProtocolType[];
  serverCount: number;
  endpointUrl?: string;
  accountTier?: string;
}

export interface OmniVpnLiveSession {
  status: OmniVpnConnectionStatus;
  activeServer: OmniVpnServerNode | null;
  providerAdapterId: string;
  virtualIp: string;
  realIpMasked: string;
  connectedAt?: string;
  sessionDurationSec: number;
  bytesDownloaded: number;
  bytesUploaded: number;
  currentDownMbps: number;
  currentUpMbps: number;
  killSwitchActive: boolean;
  splitTunnelingActive: boolean;
  multiHopSecondaryServer?: OmniVpnServerNode;
  cipherSuite: string;
  handshakeLatencyMs: number;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  dataQuotaBytes?: number;
  dataUsedBytes: number;
}

export type OmniTrackerCategory =
  | 'analytics'
  | 'advertising'
  | 'social_pixel'
  | 'fingerprinting'
  | 'cryptomining'
  | 'telemetry';

export interface OmniTrackerItem {
  id: string;
  domain: string;
  scriptUrl: string;
  category: OmniTrackerCategory;
  severity: 'high' | 'medium' | 'low';
  blockedCount: number;
  siteUrl: string;
  detectedAt: string;
  companyName: string;
  purposeDescription: string;
}

export type OmniAdBlockRuleType =
  | 'user_custom'
  | 'easylist'
  | 'enterprise_policy'
  | 'subscription_rule'
  | 'whitelist_exception';

export interface OmniAdBlockRule {
  id: string;
  name: string;
  ruleText: string;
  ruleType: OmniAdBlockRuleType;
  isEnabled: boolean;
  targetDomains: string[];
  blockedElementsCount: number;
  createdAt: string;
}

export interface OmniPublisherMonetizationConfig {
  allowAcceptableAds: boolean; // Respects non-intrusive ads from verified publishers
  directPublisherRewards: boolean; // Opt-in sovereign micro-rewards
  verifiedPublisherAllowlist: string[];
}

export interface OmniCookieItem {
  id: string;
  name: string;
  domain: string;
  value: string;
  path: string;
  expires: string;
  isSession: boolean;
  isHttpOnly: boolean;
  isSecure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
  isThirdParty: boolean;
  isPartitioned: boolean;
  partitionKey?: string;
  isTrackingCookie: boolean;
}

export interface OmniCookiePolicy {
  blockThirdPartyCookies: boolean;
  autoRejectConsentBanners: boolean;
  autoClearOnClose: boolean;
  isolateCookiesPerWorkspace: boolean;
  domainExceptions: string[];
}

export interface OmniSecureDnsProvider {
  id: string;
  name: string;
  description: string;
  dohUrl: string;
  dotServer: string;
  ipv4: string[];
  ipv6: string[];
  privacyPolicyUrl: string;
  features: ('dnssec' | 'no_logging' | 'malware_filtering' | 'ad_filtering' | 'ecs_disabled')[];
  isCustom?: boolean;
}

export interface OmniAntiFingerprintConfig {
  canvasNoiseInjection: boolean;
  webGlVendorMasking: boolean;
  audioBufferFuzzing: boolean;
  fontEnumerationSpoofing: boolean;
  clientHintsStandardization: boolean;
  screenResolutionLetterboxing: boolean;
  webRtcIpLeakShield: boolean;
  batteryStatusSpoofing: boolean;
  hardwareConcurrencyFuzzing: boolean;
  anonymityNoticeAcknowledged: boolean; // Explicit transparency requirement
}

export interface OmniSitePermission {
  domain: string;
  permission: 'camera' | 'microphone' | 'geolocation' | 'notifications' | 'clipboard' | 'usb_bluetooth' | 'sensors';
  status: 'allow' | 'block' | 'ask';
  updatedDate: string;
}

export interface OmniConnectedDevice {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'laptop' | 'mobile' | 'tablet' | 'sovereign_node';
  os: string;
  clientVersion: string;
  location: string;
  ipAddress: string;
  vpnActive: boolean;
  lastSeen: string;
  isCurrentDevice: boolean;
}

export interface OmniPrivacyRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'vpn' | 'dns' | 'trackers' | 'fingerprinting' | 'cookies' | 'permissions';
  actionLabel: string;
  actionType: string;
  isFixed: boolean;
}

export interface OmniPrivacyScoreBreakdown {
  totalScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  categories: {
    networkSecurity: number; // max 20
    trackerShield: number; // max 20
    adBlockState: number; // max 15
    fingerprintResistance: number; // max 15
    cookieHygiene: number; // max 15
    dnsPrivacy: number; // max 15
  };
  recommendations: OmniPrivacyRecommendation[];
}

// ==========================================
// PROMPT 5: OMNI CONTENT HUB, NEWS, CREATOR & PUBLISHING TYPES
// ==========================================

export type OmniDiscoverSourceType =
  | 'omni_creator'
  | 'omni_media'
  | 'publisher'
  | 'organisation'
  | 'user_interest';

export interface OmniPersonalisationControls {
  enablePersonalisation: boolean;
  privacyMode: boolean; // Zero telemetry / randomized feed
  language: string; // 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh'
  locationRegion: string; // 'Global' | 'North America' | 'Europe' | 'Asia-Pacific' | 'Latin America' | 'Africa'
  professionalInterests: string[]; // ['Artificial Intelligence', 'Cybersecurity', 'Fintech', 'Quantum Computing', 'Biotech', 'Agritech', 'Clean Energy']
  topicWeights: Record<string, number>; // 0 to 100 weighting
  sourcePreferences: {
    omniCreator: boolean;
    omniMedia: boolean;
    publishers: boolean;
    organisations: boolean;
  };
  blockedSources: string[];
  readingHistoryTracking: boolean;
}

export interface OmniDiscoverFeedItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  sourceType: OmniDiscoverSourceType;
  sourceName: string;
  sourceAvatar?: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorVerified?: boolean;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  url: string;
  coverImageUrl: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  aiKeyTakeaways: string[];
  audioNarratedUrl?: string;
  tierRequirement?: 'free' | 'supporter' | 'insider';
  sponsorBadge?: string;
}

export type OmniAiMagazineCategory =
  | 'technology'
  | 'business'
  | 'finance'
  | 'education'
  | 'science'
  | 'health'
  | 'entertainment'
  | 'lifestyle'
  | 'travel'
  | 'agriculture';

export interface OmniAiMagazineArticle {
  id: string;
  category: OmniAiMagazineCategory;
  headline: string;
  subheadline: string;
  leadParagraph: string;
  fullBodyMarkdown: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    credentials: string;
  };
  keyTakeaways: string[];
  infographicData?: {
    label: string;
    metric: string;
    context: string;
  }[];
  citations: {
    title: string;
    source: string;
    url: string;
    doi?: string;
  }[];
  audioNarrationMinutes: number;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedDate: string;
  editionIssue: string; // e.g. "Issue #48 - Autumn 2026"
}

export interface OmniAiMagazineIssue {
  id: string;
  category: OmniAiMagazineCategory;
  title: string;
  issueNumber: number;
  editionName: string;
  curatorEditorial: string;
  curatorName: string;
  curatorRole: string;
  curatorAvatar: string;
  coverStory: OmniAiMagazineArticle;
  featuredArticles: OmniAiMagazineArticle[];
  publishedAt: string;
  totalArticlesCount: number;
  themeColor: string;
}

export type OmniCreatorContentType =
  | 'blog'
  | 'newsletter'
  | 'magazine'
  | 'podcast'
  | 'video_channel';

export interface OmniCreatorPost {
  id: string;
  contentType: OmniCreatorContentType;
  title: string;
  subtitle?: string;
  slug: string;
  body: string;
  excerpt: string;
  coverImageUrl: string;
  tags: string[];
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  visibility: 'public' | 'subscribers_only' | 'vip_only';
  scheduledFor?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  stats: {
    views: number;
    reads: number;
    completionRate: number; // percentage
    earnings: number;
    subscribersGained: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    seoScore: number; // 0-100
    readabilityGrade: string;
    searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  };
  // Specific metadata
  newsletterMetadata?: {
    issueNumber: number;
    sentToCount?: number;
    openRate?: number;
    clickRate?: number;
  };
  magazineMetadata?: {
    editionTitle: string;
    sectionCategory: OmniAiMagazineCategory;
  };
  podcastMetadata?: {
    audioUrl: string;
    durationSeconds: number;
    episodeNumber: number;
    seasonNumber: number;
    audioWaveform: number[];
    transcript: string;
    chapters: { timestamp: string; title: string }[];
  };
  videoMetadata?: {
    videoUrl: string;
    thumbnailUrl: string;
    durationMinutes: number;
    channelName: string;
    subscribersCount: number;
    chapters: { timestamp: string; title: string }[];
  };
}

export interface OmniSeoAnalysisReport {
  score: number; // 0 - 100
  readabilityScore: number;
  readabilityGrade: string;
  keywordDensity: number;
  searchIntent: string;
  wordCount: number;
  estimatedReadTime: number;
  strengths: string[];
  warnings: string[];
  suggestions: string[];
}

export interface OmniCreatorSubscriber {
  id: string;
  email: string;
  name: string;
  avatar: string;
  tier: 'free' | 'supporter' | 'insider' | 'vip';
  joinedAt: string;
  lifetimeValue: number;
  status: 'active' | 'churned';
  openRateAvg: number;
}

export interface OmniSubscriptionPlanTier {
  id: string;
  tierName: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  perks: string[];
  isPopular?: boolean;
  activeSubscribersCount: number;
}

export interface OmniAdsConfig {
  adsEnabled: boolean;
  privacyRespectingContextual: boolean;
  adPlacements: {
    inlineArticle: boolean;
    feedNative: boolean;
    sidebarBanner: boolean;
    audioPreRoll: boolean;
  };
  currentMonthlyEarnings: number;
  averageRpm: number; // e.g. $18.40
  totalAdImpressions: number;
  payoutStatus: 'auto_transfer' | 'hold';
}

export interface OmniAffiliateItem {
  id: string;
  productName: string;
  vendorName: string;
  category: string;
  commissionRate: number; // e.g. 20%
  affiliateUrl: string;
  shortCode: string;
  totalClicks: number;
  conversions: number;
  earnedCommission: number;
  imageUrl: string;
}

export interface OmniCreatorDigitalProduct {
  id: string;
  title: string;
  authorName: string;
  category: 'ebook' | 'template' | 'course' | 'audio_pack' | 'research_report';
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  coverImage: string;
  description: string;
  features: string[];
  previewUrl?: string;
  isUnlocked?: boolean;
}

export * from './types/extension_ecosystem';
export * from './types/workspace';
export * from './types/social_hub';
export * from './types/commerce_market';
export * from './types/play_learn_ecosystem';
export * from './types/whitelabel_browser';
