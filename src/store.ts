import { OMNIState, User, Organization, AppRegistration, LedgerEntry, Notification, ApiCredential, Webhook, FeatureFlag, AuditLog, SystemNode, Incident, WebhookDeliveryLog, DomainEvent } from './types';
import {
  SEED_AI_PROVIDERS,
  SEED_AI_MODELS,
  SEED_AI_AGENTS,
  SEED_AI_PROMPTS,
  SEED_AI_TOOLS,
  SEED_AI_KNOWLEDGE_SOURCES,
  SEED_AI_COST_RECORDS,
  SEED_AI_BUDGETS,
  SEED_AI_AUTONOMY_RULES,
  SEED_AI_APPROVAL_TASKS,
  SEED_AI_AUDIT_LOGS,
  SEED_AI_CONVERSATIONS,
  SEED_BYOK_CREDENTIALS,
  SEED_BYOM_ENDPOINTS,
  SEED_AI_CIRCUIT_BREAKERS,
  SEED_AI_CACHE_RECORDS
} from './ai_store_data';
import {
  SEED_DOUBLE_ENTRY,
  SEED_WALLETS,
  SEED_PAYMENT_INTEGRATIONS,
  SEED_BILLABLE_PRODUCTS,
  SEED_SUBSCRIPTIONS,
  SEED_INVOICES,
  SEED_PAYOUTS,
  SEED_RECONCILIATION_LOGS
} from './financial_store_data';
import {
  SEED_AFFILIATES,
  SEED_AFFILIATE_OPPORTUNITIES,
  SEED_AFFILIATE_CLICKS,
  SEED_AFFILIATE_LEADS,
  SEED_AFFILIATE_CONVERSIONS,
  SEED_AFFILIATE_COMMISSIONS,
  SEED_GROWTH_REWARDS,
  DEFAULT_ATTRIBUTION_SETTINGS,
  SEED_FRAUD_ALERTS
} from './affiliate_store_data';
import {
  SEED_WHITE_LABEL_PLATFORMS,
  SEED_RESELLER_NODES,
  SEED_RESELLER_ECONOMICS,
  SEED_SUPER_ADMIN_CONTROLS
} from './white_label_store_data';
import {
  SEED_NOTIFICATION_TEMPLATES,
  SEED_NOTIFICATION_PREFERENCES,
  SEED_NOTIFICATION_DELIVERY_LOGS,
  SEED_OMNI_INBOX_MESSAGES,
  SEED_ANALYTICS_EVENTS,
  SEED_PRIVACY_CONSENT_CONFIGS,
  SEED_ENTITY_TRUST_SCORES,
  SEED_RISK_EVENTS,
  SEED_SAVED_SEARCHES,
  SEED_SEARCH_HISTORY
} from './shared_services_store_data';
import {
  SEED_DEVELOPER_PROFILES as DEV_PROFS,
  SEED_MARKETPLACE_APPS as DEV_APPS,
  SEED_APP_INSTALLATIONS as DEV_INSTALLS,
  SEED_SANDBOX_API_REQUESTS as DEV_REQ_LOGS,
  SEED_DEVELOPER_EARNING_LOGS as DEV_EARNINGS
} from './developer_store_data';
import {
  SEED_SHAREHOLDERS,
  SEED_CAP_TABLE,
  SEED_VALUATION_RECORDS,
  SEED_INVESTMENT_OFFERINGS,
  SEED_EXCHANGE_CREDENTIALS
} from './capital_store_data';
import {
  SEED_GOVERNANCE_POLICIES,
  SEED_ADMIN_APPROVAL_TASKS,
  SEED_ADVANCED_FEATURE_FLAGS
} from './governance_store_data';
import {
  SEED_BROWSER_WORKSPACES,
  SEED_BROWSER_TABS,
  SEED_BROWSER_BOOKMARKS,
  SEED_BROWSER_BOOKMARK_FOLDERS,
  SEED_BROWSER_HISTORY,
  SEED_BROWSER_DOWNLOADS,
  SEED_BROWSER_EXTENSIONS,
  SEED_BROWSER_PRIVACY_SHIELDS,
  SEED_BROWSER_VPN_NODES,
  DEFAULT_BROWSER_VPN_STATE,
  SEED_BROWSER_SEARCH_ENGINES,
  DEFAULT_BROWSER_SETTINGS,
  SEED_BROWSER_READER_CONTENT,
  SEED_BROWSER_SECURITY_AUDIT_LOGS,
  SEED_BROWSER_TAB_GROUPS,
  SEED_BROWSER_SAVED_SESSIONS,
  SEED_BROWSER_PROJECT_SPACES,
  SEED_BROWSER_READING_LIST,
  SEED_BROWSER_SYNC_CONFIG,
  SEED_BROWSER_SYNC_PAYLOADS,
  SEED_BROWSER_AUTHORIZED_DEVICES,
  SEED_BROWSER_SECURITY_SESSIONS,
  SEED_BROWSER_SUSPICIOUS_ALERTS
} from './browser_store_data';


// Standard helper to generate UUIDs
export const generateUUID = () => {
  return 'omni_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Seed Apps
const SEED_APPS: AppRegistration[] = [
  {
    id: 'app_ai',
    name: 'OMNI AI',
    slug: 'ai',
    icon: 'Sparkles',
    description: 'Unified sovereign AI product: Multimodal chat, deep research, grounded search, autonomous agents, and creative studio.',
    status: 'active',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Intelligence Labs',
    createdAt: '2026-01-01T00:00:00Z',
    routes: { primary: 'https://ai.omni.com', path: '/ai' },
    subdomain: 'ai.omni.com',
    requiredScopes: ['ai.chat.use', 'ai.search.use', 'ai.models.select', 'ai.billing.view'],
    optionalScopes: [
      'ai.research.run', 'ai.knowledge.read', 'ai.knowledge.write', 'ai.files.upload',
      'ai.documents.create', 'ai.slides.create', 'ai.sheets.create', 'ai.media.generate',
      'ai.agents.create', 'ai.agents.run', 'ai.tools.invoke', 'ai.code.use',
      'ai.team.manage', 'ai.provider.manage', 'ai.admin.manage'
    ],
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ar'],
    supportedCountries: ['GLOBAL', 'US', 'EU', 'GB', 'CA', 'AU', 'JP', 'SG', 'NG', 'BR', 'IN'],
    billingModel: 'pay_as_you_go',
    whiteLabelCapability: true,
    resellerCapability: true,
    affiliateCapability: true,
    aiCapability: true,
    mobileCapability: true,
    apiInfo: {
      version: 'v1',
      endpoints: ['/api/v1/ai/chat', '/api/v1/ai/search', '/api/v1/ai/research', '/api/v1/ai/agents', '/api/v1/ai/knowledge']
    },
    webhookConfig: {
      deliveryUrl: 'https://api.omni.com/webhooks/ai',
      subscribedEvents: ['ai.request.started', 'ai.request.completed', 'ai.agent.action.requested', 'ai.usage.recorded']
    },
    featureFlags: ['FLAG_AI_DEEP_RESEARCH', 'FLAG_AI_CODE_SANDBOX', 'FLAG_AI_AUTONOMOUS_AGENTS', 'FLAG_AI_RAG_VAULTS']
  },
  {
    id: 'app_home',
    name: 'Home',
    slug: 'home',
    icon: 'Home',
    description: 'OMNI System Portal, personalized workspace, operational hub and task feed.',
    status: 'active',
    category: 'core',
    isNative: true,
    author: 'OMNI Core Devs',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'app_pay',
    name: 'Pay',
    slug: 'pay',
    icon: 'Wallet',
    description: 'Unified payment ledger, peer-to-peer sending, and cross-border settlement.',
    status: 'active',
    category: 'finance',
    isNative: true,
    author: 'OMNI Finance Team',
    createdAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'app_market',
    name: 'Market',
    slug: 'market',
    icon: 'ShoppingBag',
    description: 'Global business merchant directory, decentralized wholesale catalog and inventory.',
    status: 'active',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Ecosystem',
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 'app_ads',
    name: 'Ads',
    slug: 'ads',
    icon: 'Megaphone',
    description: 'AI-driven contextual advertising, multi-channel target campaigns, and bid metrics.',
    status: 'active',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Ads Division',
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'app_business',
    name: 'Business',
    slug: 'business',
    icon: 'Briefcase',
    description: 'Corporate registry, HR payroll integration, automated contracts, and tax pipelines.',
    status: 'active',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Enterprise Systems',
    createdAt: '2026-03-15T00:00:00Z',
  },
  {
    id: 'app_learn',
    name: 'Learn',
    slug: 'learn',
    icon: 'GraduationCap',
    description: 'Professional skills development, cryptographic certifications, and training.',
    status: 'active',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Academy',
    createdAt: '2026-04-12T00:00:00Z',
  },
  {
    id: 'app_books',
    name: 'Books',
    slug: 'books',
    icon: 'BookOpen',
    description: 'Global distributed e-book marketplace, technical documentation, and publishing.',
    status: 'active',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Publishing',
    createdAt: '2026-05-20T00:00:00Z',
  },
  {
    id: 'app_creator',
    name: 'Creator',
    slug: 'creator',
    icon: 'Cpu',
    description: 'Rich media editor, asset synthesis, generative templates, and royalty allocation.',
    status: 'beta',
    category: 'productivity',
    isNative: true,
    author: 'OMNI Creative Lab',
    createdAt: '2026-06-01T00:00:00Z',
  },
  {
    id: 'app_browser',
    name: 'OMNI Browser',
    slug: 'browser',
    icon: 'Compass',
    description: 'AI-Powered Privacy Browser, Digital Workspace, VPN Security Layer, Content Ecosystem and White-Label Platform.',
    status: 'active',
    category: 'core',
    isNative: true,
    author: 'OMNI Secure Systems & Intelligence',
    createdAt: '2026-01-10T00:00:00Z',
    routes: { primary: 'https://browser.omni.com', path: '/browser' },
    subdomain: 'browser.omni.com',
    requiredScopes: [
      'browser.profile.read',
      'browser.sync.manage',
      'browser.bookmark.manage',
      'browser.workspace.create',
      'browser.security.manage',
      'browser.ai.use'
    ],
    optionalScopes: [
      'browser.extension.install',
      'browser.vpn.manage',
      'browser.content.personalize',
      'browser.enterprise.manage',
      'browser.downloads.manage',
      'browser.history.manage',
      'browser.shield.manage'
    ],
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ar'],
    supportedCountries: ['GLOBAL', 'US', 'EU', 'GB', 'CA', 'AU', 'JP', 'SG', 'NG', 'BR', 'IN'],
    billingModel: 'free',
    whiteLabelCapability: true,
    resellerCapability: true,
    affiliateCapability: true,
    aiCapability: true,
    mobileCapability: true,
    apiInfo: {
      version: 'v1',
      endpoints: ['/api/v1/browser/tabs', '/api/v1/browser/workspaces', '/api/v1/browser/sync', '/api/v1/browser/vpn', '/api/v1/browser/shield']
    },
    webhookConfig: {
      deliveryUrl: 'https://api.omni.com/webhooks/browser',
      subscribedEvents: ['browser.session.started', 'browser.shield.blocked', 'browser.vpn.connected', 'browser.ai.assisted']
    },
    featureFlags: ['FLAG_BROWSER_AI_COPILOT', 'FLAG_BROWSER_SOVEREIGN_VPN', 'FLAG_BROWSER_WORKSPACES', 'FLAG_BROWSER_PRIVACY_SHIELD']
  },
  {
    id: 'app_connect',
    name: 'OMNI Connect',
    slug: 'connect',
    icon: 'MessageSquare',
    description: 'AI-Powered Social, Communication, Community, Commerce & Business Super-App.',
    status: 'active',
    category: 'core',
    isNative: true,
    author: 'OMNI Social & Relationship Systems',
    createdAt: '2026-01-05T00:00:00Z',
    routes: { primary: 'https://connect.omni.com', path: '/connect' },
    subdomain: 'connect.omni.com',
    requiredScopes: [
      'connect.profile.read',
      'connect.feed.read',
      'connect.post.create',
      'connect.message.send',
      'connect.community.join',
      'connect.crm.read',
      'connect.commerce.buy',
      'connect.ai.use'
    ],
    optionalScopes: [
      'connect.creator.monetize',
      'connect.meeting.host',
      'connect.event.organize',
      'connect.admin.configure'
    ],
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ar', 'yo', 'ha', 'sw'],
    supportedCountries: ['GLOBAL', 'US', 'EU', 'GB', 'CA', 'AU', 'JP', 'SG', 'NG', 'BR', 'IN'],
    billingModel: 'free',
    whiteLabelCapability: true,
    resellerCapability: true,
    affiliateCapability: true,
    aiCapability: true,
    mobileCapability: true,
    apiInfo: {
      version: 'v1',
      endpoints: ['/api/v1/connect/posts', '/api/v1/connect/messages', '/api/v1/connect/communities', '/api/v1/connect/crm/deals', '/api/v1/connect/products']
    },
    webhookConfig: {
      deliveryUrl: 'https://api.omni.com/webhooks/connect',
      subscribedEvents: ['connect.message.sent', 'connect.post.created', 'connect.deal.won', 'connect.product.purchased']
    },
    featureFlags: ['FLAG_CONNECT_SOCIAL_FEED', 'FLAG_CONNECT_ENCRYPTED_MESSAGING', 'FLAG_CONNECT_COMMUNITIES', 'FLAG_CONNECT_CRM_PIPELINE', 'FLAG_CONNECT_CREATOR_STUDIO', 'FLAG_CONNECT_COMMERCE']
  },
  {
    id: 'app_logistics',
    name: 'Logistics',
    slug: 'logistics',
    icon: 'Truck',
    description: 'Supply chain telemetry, shipping dispatch networks, cold-chain API integrations.',
    status: 'beta',
    category: 'infrastructure',
    isNative: true,
    author: 'OMNI Logistics Corp',
    createdAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'app_cloud',
    name: 'Cloud',
    slug: 'cloud',
    icon: 'Server',
    description: 'Serverless containers, distributed Spanner database allocation, object storage buckets.',
    status: 'active',
    category: 'infrastructure',
    isNative: true,
    author: 'OMNI Infrastructure',
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'app_capital',
    name: 'Capital',
    slug: 'capital',
    icon: 'TrendingUp',
    description: 'Corporate multi-currency loans, dynamic lines of credit, automated risk modeling.',
    status: 'active',
    category: 'finance',
    isNative: true,
    author: 'OMNI Banking Group',
    createdAt: '2026-02-28T00:00:00Z',
  },
  {
    id: 'app_apps',
    name: 'Developer Platform',
    slug: 'apps',
    icon: 'CodeXml',
    description: 'API credential generator, webhook tester, schema designer, and app deployment console.',
    status: 'active',
    category: 'developer',
    isNative: true,
    author: 'OMNI Developer Relations',
    createdAt: '2026-01-05T00:00:00Z',
  }
];

// Seed System Nodes
const SEED_NODES: SystemNode[] = [
  { name: 'omni-node-lon-01', region: 'europe-west2', load: 38, status: 'operational', latencyMs: 14, requestCount: 240890 },
  { name: 'omni-node-tok-01', region: 'asia-northeast1', load: 45, status: 'operational', latencyMs: 22, requestCount: 184560 },
  { name: 'omni-node-nyc-01', region: 'us-east1', load: 72, status: 'operational', latencyMs: 8, requestCount: 412030 },
  { name: 'omni-node-ber-01', region: 'europe-west3', load: 91, status: 'degraded', latencyMs: 124, requestCount: 309851 },
  { name: 'omni-node-sfo-01', region: 'us-west1', load: 12, status: 'operational', latencyMs: 11, requestCount: 95400 }
];

// Seed Feature Flags
const SEED_FLAGS: FeatureFlag[] = [
  { id: 'flag_01', name: 'Real-time Global Settlements', key: 'omni-pay-instant', description: 'Enable immediate settlements in multi-currency transactions via OMNI Ledger routing.', isEnabled: true, tenantScope: 'all', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'flag_02', name: 'Advanced AI Ad Optimization', key: 'omni-ads-v2', description: 'Route high-tier advertiser campaigns through deep reinforcement learning targeting algorithms.', isEnabled: false, tenantScope: 'growth-enterprise', createdAt: '2026-03-01T00:00:00Z' },
  { id: 'flag_03', name: 'Zero-latency Cache Layering', key: 'omni-redis-fallback', description: 'Enable multi-region Redis sync to minimize cloud latency in secondary subdomains.', isEnabled: true, tenantScope: 'enterprise-only', createdAt: '2026-02-15T00:00:00Z' }
];

// Seed Incidents
const SEED_INCIDENTS: Incident[] = [
  { id: 'inc_1', title: 'Ad Delivery Engine Degradation', status: 'resolved', severity: 'minor', timestamp: '2026-08-14T18:45:00-07:00' },
  { id: 'inc_2', title: 'Subdomain Sync Propagation Delay', status: 'resolved', severity: 'major', timestamp: '2026-08-12T04:22:00-07:00' }
];

// Seed Organizations
const SEED_ORGS: Organization[] = [
  {
    id: 'org_dynasty',
    name: 'Dynasty Global Holdings',
    slug: 'dynasty',
    tenantId: 'tenant_dynasty_99',
    status: 'active',
    orgType: 'company',
    logoUrl: undefined,
    billingPlan: 'enterprise',
    walletBalance: 4280550.00,
    apiKey: 'omni_live_api_dyn_k8s_9v02l4k1a7s90f8',
    webhookUrl: 'https://api.dynastyholdings.com/omni-webhook',
    subdomains: ['dynasty.omni.io', 'billing.dynasty.io', 'portal.dynasty.io'],
    createdAt: '2026-01-05T00:00:00Z',
    kybVerified: true,
    kybProvider: 'Middesk',
    kybCheckedAt: '2026-01-06T00:00:00Z'
  },
  {
    id: 'org_sandbox',
    name: 'Oluwalana Technologies LLC',
    slug: 'oluwalana',
    tenantId: 'tenant_oluwalana_12',
    status: 'active',
    orgType: 'white_label',
    logoUrl: undefined,
    billingPlan: 'growth',
    walletBalance: 125000.00,
    apiKey: 'omni_live_api_olu_q9a2n8f4s1g7h5j2',
    webhookUrl: 'https://ops.oluwalana.tech/webhooks/omni',
    subdomains: ['oluwalana.omni.io', 'cloud.oluwalana.tech'],
    createdAt: '2026-02-20T00:00:00Z',
    kybVerified: true,
    kybProvider: 'Persona',
    kybCheckedAt: '2026-02-22T00:00:00Z'
  }
];

// Seed Ledger
const SEED_LEDGER: LedgerEntry[] = [
  { id: generateUUID(), walletId: 'wallet_dynasty', type: 'credit', amount: 5000000.00, description: 'Capital Investment Round A wire', timestamp: '2026-08-10T10:00:00-07:00', referenceId: 'ref_tx_901124', status: 'completed' },
  { id: generateUUID(), walletId: 'wallet_dynasty', type: 'debit', amount: 500000.00, description: 'Decentralized wholesale supply acquisition (Logistics)', timestamp: '2026-08-11T14:30:00-07:00', referenceId: 'ref_tx_841249', status: 'completed' },
  { id: generateUUID(), walletId: 'wallet_dynasty', type: 'debit', amount: 15450.00, description: 'AI Ad Campaigns bidding deployment', timestamp: '2026-08-14T09:12:00-07:00', referenceId: 'ref_tx_712034', status: 'completed' },
  { id: generateUUID(), walletId: 'wallet_sandbox', type: 'credit', amount: 125000.00, description: 'Cloud Storage allocation grant balance', timestamp: '2026-08-12T11:15:00-07:00', referenceId: 'ref_tx_309121', status: 'completed' },
  { id: generateUUID(), walletId: 'wallet_dynasty', type: 'credit', amount: 246000.00, description: 'Affiliate reseller commission payout', timestamp: '2026-08-14T23:55:00-07:00', referenceId: 'ref_tx_412033', status: 'completed' },
];

// Seed Notifications
const SEED_NOTIFS: Notification[] = [
  { id: 'notif_1', title: 'Security: MFA Configured Successfully', content: 'A secure multi-factor authentication (MFA) layer has been registered for user gideonoluwalanadynasty@gmail.com.', type: 'security', isRead: false, createdAt: '2026-08-15T01:50:00-07:00' },
  { id: 'notif_2', title: 'Billing: Enterprise Renewal Succeeded', content: 'Omni Billing has successfully settled the monthly licensing cost of $4,500.00 for Dynasty Global Holdings.', type: 'billing', isRead: false, createdAt: '2026-08-15T00:01:00-07:00' },
  { id: 'notif_3', title: 'System: omni-node-ber-01 degraded load', content: 'OMNI System Watchdog has registered load of 91% on Berlin router node. Auto-failover router triggered.', type: 'info', isRead: true, createdAt: '2026-08-14T22:30:00-07:00' }
];

// Default Credentials
const SEED_CREDS: ApiCredential[] = [
  { id: 'cred_1', organizationId: 'org_dynasty', label: 'Staging Web App Integration', clientId: 'omni_cid_dyn_prod_898a3b82', clientSecret: 'omni_sec_••••••••••••••••3a2f901a', scopes: ['identity.read', 'wallet.ledger.read', 'wallet.ledger.write', 'apps.manage'], isActive: true, createdAt: '2026-03-01T08:00:00Z' },
  { id: 'cred_2', organizationId: 'org_dynasty', label: 'E-commerce Terminal POS', clientId: 'omni_cid_dyn_terminal_332f12c3', clientSecret: 'omni_sec_••••••••••••••••881b24ca', scopes: ['wallet.ledger.write'], isActive: true, createdAt: '2026-05-15T12:00:00Z' }
];

// Default Webhooks
const SEED_WEBHOOKS: Webhook[] = [
  { id: 'web_1', organizationId: 'org_dynasty', url: 'https://api.dynastyholdings.com/omni-webhook', events: ['wallet.transaction.completed', 'security.mfa.alert', 'user.joined'], status: 'active', secret: 'whsec_dyn_prod_77c82a10be', createdAt: '2026-03-01T08:30:00Z' }
];

// Default Audit Logs
const SEED_AUDIT: AuditLog[] = [
  { id: 'log_1', userId: 'usr_gideon', userEmail: 'gideonoluwalanadynasty@gmail.com', action: 'MFA_REGISTRATION', module: 'Auth/Identity', details: 'Added simulated TOTP authenticator device', ipAddress: '184.22.115.9', timestamp: '2026-08-15T01:50:00-07:00' },
  { id: 'log_2', userId: 'usr_gideon', userEmail: 'gideonoluwalanadynasty@gmail.com', action: 'WALLET_LEDGER_EXPORT', module: 'Finance/Pay', details: 'Exported transaction ledger for org_dynasty as CSV (5 records)', ipAddress: '184.22.115.9', timestamp: '2026-08-14T21:40:00-07:00' },
  { id: 'log_3', userId: 'usr_gideon', userEmail: 'gideonoluwalanadynasty@gmail.com', action: 'API_CREDENTIAL_CREATE', module: 'DeveloperPlatform', details: 'Created API Credential [E-commerce Terminal POS]', ipAddress: '184.22.115.9', timestamp: '2026-05-15T12:00:00Z' }
];

// Default User (From additional metadata/prompt details)
const DEFAULT_USER: User = {
  id: 'usr_gideon',
  username: 'gideon',
  email: 'gideonoluwalanadynasty@gmail.com',
  fullName: 'Gideon Oluwalana',
  avatarUrl: undefined,
  phone: '+1 (555) 019-2831',
  isMfaEnabled: true,
  mfaSecretSimulated: 'JBSWY3DPEHPK3PXP', // Simulated MFA secret
  role: 'superadmin',
  currentTenantId: 'tenant_dynasty_99',
  createdAt: '2026-01-01T12:00:00Z',
  language: 'en_US',
  country: 'US',
  timezone: 'America/New_York',
  preferredCurrency: 'USD',
  verificationStatus: {
    emailVerified: true,
    phoneVerified: true,
    identityVerified: true,
    organizationVerified: true,
    businessVerified: true
  },
  profiles: [
    { id: 'prof_personal', type: 'personal', displayName: 'Gideon Oluwalana', bio: 'Architect of the OMNI Operating System. Universal builder.' },
    { id: 'prof_professional', type: 'professional', displayName: 'Gideon Oluwalana, PhD', bio: 'VP of Infrastructure at Dynasty Global Holdings.', metadata: { company: 'Dynasty Global Holdings', title: 'VP of Infrastructure' } },
    { id: 'prof_creator', type: 'creator', displayName: 'Gideon Tech', bio: 'Streaming live ledger engineering & system builds.', metadata: { channel: 'Gideon Tech', followers: 124000 } },
    { id: 'prof_seller', type: 'seller', displayName: 'Oluwalana Merchant', bio: 'Authorized reseller of OMNI cloud nodes.', metadata: { storeName: 'Oluwalana Cloud Hardware', rating: 4.9 } },
    { id: 'prof_developer', type: 'developer', displayName: 'gideon-dev', bio: 'Full-stack distributed core contributor.', metadata: { github: 'gideon-dev', stack: ['TypeScript', 'Rust', 'Docker', 'Go'] } },
    { id: 'prof_affiliate', type: 'affiliate', displayName: 'Gideon Partner', bio: 'OMNI Ecosystem Affiliate.', metadata: { referralCode: 'OMNIGID2026', commissionRate: '12%' } },
    { id: 'prof_investor', type: 'investor', displayName: 'Gideon Capital', bio: 'Venture & liquidity provider.', metadata: { accredited: true, investmentsCount: 18 } }
  ],
  currentProfileType: 'personal',
  security: {
    recoveryCodes: ['OMNI-8A3B-2C9D-1F0E', 'OMNI-4E5F-6G7H-8I9J', 'OMNI-1K2L-3M4N-5O6P', 'OMNI-7Q8R-9S1T-2U3V'],
    activeSessions: [
      { id: 'sess_current', deviceName: 'MacBook Pro 16"', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', createdAt: '2026-08-15T01:10:00Z', isCurrent: true },
      { id: 'sess_phone', deviceName: 'iPhone 15 Pro', ipAddress: '172.56.21.84', browser: 'Safari Mobile', location: 'New York, US', createdAt: '2026-08-14T20:30:00Z', isCurrent: false },
      { id: 'sess_backup', deviceName: 'Ubuntu Workstation', ipAddress: '192.168.1.55', browser: 'Firefox Desktop', location: 'Local Network', createdAt: '2026-08-10T09:15:00Z', isCurrent: false }
    ],
    loginHistory: [
      { id: 'log_h1', timestamp: '2026-08-15T01:10:00Z', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', status: 'success', type: 'password' },
      { id: 'log_h2', timestamp: '2026-08-14T20:30:00Z', ipAddress: '172.56.21.84', browser: 'Safari Mobile', location: 'New York, US', status: 'success', type: 'mfa' },
      { id: 'log_h3', timestamp: '2026-08-14T19:15:00Z', ipAddress: '198.51.100.4', browser: 'Chrome Desktop', location: 'Dublin, IE', status: 'suspicious', type: 'password' },
      { id: 'log_h4', timestamp: '2026-08-12T10:00:00Z', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', status: 'success', type: 'passkey' }
    ],
    passkeys: [
      { id: 'pk_1', name: 'FaceID MacBook Pro Security Key', createdAt: '2026-04-10T12:00:00Z' }
    ],
    ssoConfig: { idpName: 'Okta Enterprise', entityId: 'urn:omni:saml:okta', ssoUrl: 'https://okta.omni.io/sso/federate', isEnabled: true }
  },
  connectedApps: [
    { appId: 'app_pay', appName: 'Pay', scopes: ['identity.read', 'wallet.ledger.read', 'wallet.ledger.write'], authorizedAt: '2026-01-05T12:00:00Z' },
    { appId: 'app_market', appName: 'Market', scopes: ['identity.read'], authorizedAt: '2026-02-10T12:00:00Z' }
  ]
};

const SEED_DOMAIN_EVENTS: DomainEvent[] = [
  {
    id: 'evt_1',
    topic: 'user.created',
    payload: { userId: 'usr_gideon', email: 'gideonoluwalanadynasty@gmail.com', fullName: 'Gideon Oluwalana' },
    timestamp: '2026-08-15T01:50:00Z'
  },
  {
    id: 'evt_2',
    topic: 'organization.created',
    payload: { id: 'org_dynasty', name: 'Dynasty Global Holdings', slug: 'dynasty', ownerId: 'usr_gideon' },
    timestamp: '2026-08-15T02:00:00Z'
  },
  {
    id: 'evt_3',
    topic: 'subscription.started',
    payload: { orgId: 'org_dynasty', plan: 'enterprise', billingCycle: 'monthly', amount: 4500 },
    timestamp: '2026-08-15T02:01:00Z'
  },
  {
    id: 'evt_4',
    topic: 'payment.completed',
    payload: { txId: 'ref_tx_712034', amount: 15450, currency: 'USD', status: 'completed' },
    timestamp: '2026-08-14T09:12:00Z'
  }
];

const SEED_WEBHOOK_LOGS: WebhookDeliveryLog[] = [
  {
    id: 'wlog_1',
    appId: 'app_pay',
    eventTopic: 'payment.completed',
    payload: { txId: 'ref_tx_712034', amount: 15450, currency: 'USD', status: 'completed' },
    endpoint: 'https://api.dynastyholdings.com/omni-webhook',
    timestamp: '2026-08-14T09:12:05Z',
    statusCode: 200,
    responseBody: '{"received":true,"status":"ok"}',
    deliverySecretSigned: 't=1786785125,v1=9e821b332f12c3098e72f88a82b99c1a3b82772f9a12c',
    idempotencyKey: 'idem_pay_8a3b82f12',
    attemptNumber: 1,
    nextRetryAt: null,
    status: 'success'
  },
  {
    id: 'wlog_2',
    appId: 'app_business',
    eventTopic: 'user.created',
    payload: { userId: 'usr_gideon', email: 'gideonoluwalanadynasty@gmail.com', fullName: 'Gideon Oluwalana' },
    endpoint: 'https://ops.oluwalana.tech/webhooks/omni',
    timestamp: '2026-08-15T01:50:02Z',
    statusCode: 503,
    responseBody: 'Service Unavailable',
    deliverySecretSigned: 't=1786845002,v1=bc82f88a82b99c1a3b82772f9a12c9e821b332f12c3098e72',
    idempotencyKey: 'idem_usr_9a2f901ab2',
    attemptNumber: 1,
    nextRetryAt: '2026-08-15T01:50:12Z',
    status: 'retrying'
  },
  {
    id: 'wlog_3',
    appId: 'app_business',
    eventTopic: 'user.created',
    payload: { userId: 'usr_gideon', email: 'gideonoluwalanadynasty@gmail.com', fullName: 'Gideon Oluwalana' },
    endpoint: 'https://ops.oluwalana.tech/webhooks/omni',
    timestamp: '2026-08-15T01:50:12Z',
    statusCode: 503,
    responseBody: 'Service Unavailable',
    deliverySecretSigned: 't=1786845012,v1=cd82f88a82b99c1a3b82772f9a12c9e821b332f12c3098e73',
    idempotencyKey: 'idem_usr_9a2f901ab2',
    attemptNumber: 2,
    nextRetryAt: '2026-08-15T01:50:32Z',
    status: 'retrying'
  },
  {
    id: 'wlog_4',
    appId: 'app_business',
    eventTopic: 'user.created',
    payload: { userId: 'usr_gideon', email: 'gideonoluwalanadynasty@gmail.com', fullName: 'Gideon Oluwalana' },
    endpoint: 'https://ops.oluwalana.tech/webhooks/omni',
    timestamp: '2026-08-15T01:50:32Z',
    statusCode: 200,
    responseBody: '{"status":"processed","id":"usr_gideon"}',
    deliverySecretSigned: 't=1786845032,v1=dd82f88a82b99c1a3b82772f9a12c9e821b332f12c3098e74',
    idempotencyKey: 'idem_usr_9a2f901ab2',
    attemptNumber: 3,
    nextRetryAt: null,
    status: 'success'
  }
];

const DEFAULT_STATE: OMNIState = {
  user: DEFAULT_USER,
  organizations: SEED_ORGS,
  currentOrgId: 'org_dynasty',
  apps: SEED_APPS,
  ledger: SEED_LEDGER,
  notifications: SEED_NOTIFS,
  apiCredentials: SEED_CREDS,
  webhooks: SEED_WEBHOOKS,
  webhookLogs: SEED_WEBHOOK_LOGS,
  domainEvents: SEED_DOMAIN_EVENTS,
  featureFlags: [...SEED_FLAGS, ...SEED_ADVANCED_FEATURE_FLAGS],
  auditLogs: SEED_AUDIT,
  systemNodes: SEED_NODES,
  incidents: SEED_INCIDENTS,
  activeView: 'dashboard', // default is main OMNI dashboard
  activeAppId: null, // no specific launcher-app running initially (Hub View)
  searchQuery: '',
  theme: 'light',

  // AI Operating System State Extensions
  aiProviders: SEED_AI_PROVIDERS,
  aiModels: SEED_AI_MODELS,
  aiAgents: SEED_AI_AGENTS,
  aiPrompts: SEED_AI_PROMPTS,
  aiTools: SEED_AI_TOOLS,
  aiKnowledgeSources: SEED_AI_KNOWLEDGE_SOURCES,
  aiCostRecords: SEED_AI_COST_RECORDS,
  aiBudgets: SEED_AI_BUDGETS,
  aiAutonomyRules: SEED_AI_AUTONOMY_RULES,
  aiApprovalTasks: SEED_AI_APPROVAL_TASKS,
  aiAuditLogs: SEED_AI_AUDIT_LOGS,
  aiConversations: SEED_AI_CONVERSATIONS,
  byokCredentials: SEED_BYOK_CREDENTIALS,
  byomEndpoints: SEED_BYOM_ENDPOINTS,
  aiCircuitBreakers: SEED_AI_CIRCUIT_BREAKERS,
  aiCacheRecords: SEED_AI_CACHE_RECORDS,
  activeRoutingProfile: 'balanced',

  // OMNI Financial Accounting Engine State
  doubleEntryLedger: SEED_DOUBLE_ENTRY,
  omniWallets: SEED_WALLETS,
  paymentIntegrations: SEED_PAYMENT_INTEGRATIONS,
  billableProducts: SEED_BILLABLE_PRODUCTS,
  subscriptions: SEED_SUBSCRIPTIONS,
  invoices: SEED_INVOICES,
  payouts: SEED_PAYOUTS,
  reconciliationLogs: SEED_RECONCILIATION_LOGS,

  // OMNI Affiliate, Partner, Agent and Growth Network State
  affiliates: SEED_AFFILIATES,
  affiliateOpportunities: SEED_AFFILIATE_OPPORTUNITIES,
  affiliateClicks: SEED_AFFILIATE_CLICKS,
  affiliateLeads: SEED_AFFILIATE_LEADS,
  affiliateConversions: SEED_AFFILIATE_CONVERSIONS,
  affiliateCommissions: SEED_AFFILIATE_COMMISSIONS,
  growthRewards: SEED_GROWTH_REWARDS,
  attributionSettings: DEFAULT_ATTRIBUTION_SETTINGS,
  fraudAlerts: SEED_FRAUD_ALERTS,

  // OMNI White-Label, Reseller and Platform-Builder Engine State
  tenantPlatforms: SEED_WHITE_LABEL_PLATFORMS,
  resellerNodes: SEED_RESELLER_NODES,
  resellerEconomics: SEED_RESELLER_ECONOMICS,
  superAdminControls: SEED_SUPER_ADMIN_CONTROLS,

  // OMNI Shared Horizontal Services State
  notificationTemplates: SEED_NOTIFICATION_TEMPLATES,
  notificationPreferences: SEED_NOTIFICATION_PREFERENCES,
  notificationDeliveryLogs: SEED_NOTIFICATION_DELIVERY_LOGS,
  omniInboxMessages: SEED_OMNI_INBOX_MESSAGES,
  analyticsEvents: SEED_ANALYTICS_EVENTS,
  privacyConsentConfigs: SEED_PRIVACY_CONSENT_CONFIGS,
  entityTrustScores: SEED_ENTITY_TRUST_SCORES,
  riskEvents: SEED_RISK_EVENTS,
  savedSearches: SEED_SAVED_SEARCHES,
  searchHistory: SEED_SEARCH_HISTORY,

  // OMNI Developer Platform & Third-Party Ecosystem State
  developerProfiles: DEV_PROFS,
  marketplaceApps: DEV_APPS,
  appInstallations: DEV_INSTALLS,
  sandboxApiRequests: DEV_REQ_LOGS,
  developerEarningLogs: DEV_EARNINGS,

  // OMNI Capital and Ownership State
  shareholders: SEED_SHAREHOLDERS,
  capTable: SEED_CAP_TABLE,
  valuationRecords: SEED_VALUATION_RECORDS,
  investmentOfferings: SEED_INVESTMENT_OFFERINGS,
  exchangeCredentials: SEED_EXCHANGE_CREDENTIALS,

  // OMNI Governance Policies & Operations Management
  governancePolicies: SEED_GOVERNANCE_POLICIES,
  adminApprovalTasks: SEED_ADMIN_APPROVAL_TASKS,

  // OMNI Browser Sovereign Digital Workspace & Security State
  browserTabs: SEED_BROWSER_TABS,
  browserWorkspaces: SEED_BROWSER_WORKSPACES,
  activeBrowserWorkspaceId: 'ws_dynasty',
  activeBrowserTabId: 'tab_omni_home',
  browserBookmarks: SEED_BROWSER_BOOKMARKS,
  browserBookmarkFolders: SEED_BROWSER_BOOKMARK_FOLDERS,
  browserHistory: SEED_BROWSER_HISTORY,
  browserDownloads: SEED_BROWSER_DOWNLOADS,
  browserExtensions: SEED_BROWSER_EXTENSIONS,
  browserPrivacyShields: SEED_BROWSER_PRIVACY_SHIELDS,
  browserVpnNodes: SEED_BROWSER_VPN_NODES,
  browserVpnState: DEFAULT_BROWSER_VPN_STATE,
  browserSearchEngines: SEED_BROWSER_SEARCH_ENGINES,
  browserSettings: DEFAULT_BROWSER_SETTINGS,
  browserReaderContent: SEED_BROWSER_READER_CONTENT,
  browserSecurityAuditLogs: SEED_BROWSER_SECURITY_AUDIT_LOGS,
  browserTabGroups: SEED_BROWSER_TAB_GROUPS,
  browserSavedSessions: SEED_BROWSER_SAVED_SESSIONS,
  browserProjectSpaces: SEED_BROWSER_PROJECT_SPACES,
  browserReadingList: SEED_BROWSER_READING_LIST,
  browserSyncConfig: SEED_BROWSER_SYNC_CONFIG,
  browserSyncPayloads: SEED_BROWSER_SYNC_PAYLOADS,
  browserAuthorizedDevices: SEED_BROWSER_AUTHORIZED_DEVICES,
  browserSecuritySessions: SEED_BROWSER_SECURITY_SESSIONS,
  browserSuspiciousAlerts: SEED_BROWSER_SUSPICIOUS_ALERTS,
  activeBrowserPlatformAdapter: 'desktop'
};

// LocalStorage Hydration
export const loadState = (): OMNIState => {
  try {
    const serialized = localStorage.getItem('omni_platform_state_v1');
    if (!serialized) return DEFAULT_STATE;
    const parsed = JSON.parse(serialized);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_STATE;

    const mergedUser = parsed.user ? {
      ...DEFAULT_USER,
      ...parsed.user,
      profiles: Array.isArray(parsed.user.profiles) && parsed.user.profiles.length > 0 ? parsed.user.profiles : DEFAULT_USER.profiles,
      security: {
        ...DEFAULT_USER.security,
        ...(parsed.user.security || {}),
        activeSessions: Array.isArray(parsed.user.security?.activeSessions) && parsed.user.security.activeSessions.length > 0 ? parsed.user.security.activeSessions : DEFAULT_USER.security.activeSessions,
        loginHistory: Array.isArray(parsed.user.security?.loginHistory) && parsed.user.security.loginHistory.length > 0 ? parsed.user.security.loginHistory : DEFAULT_USER.security.loginHistory,
        passkeys: Array.isArray(parsed.user.security?.passkeys) ? parsed.user.security.passkeys : DEFAULT_USER.security.passkeys,
      },
      connectedApps: Array.isArray(parsed.user.connectedApps) ? parsed.user.connectedApps : DEFAULT_USER.connectedApps,
      verificationStatus: {
        ...DEFAULT_USER.verificationStatus,
        ...(parsed.user.verificationStatus || {})
      }
    } : DEFAULT_USER;

    return {
      ...DEFAULT_STATE,
      ...parsed,
      user: mergedUser,
      apps: Array.isArray(parsed.apps) && parsed.apps.length > 0 ? parsed.apps : DEFAULT_STATE.apps,
      organizations: Array.isArray(parsed.organizations) && parsed.organizations.length > 0 ? parsed.organizations : DEFAULT_STATE.organizations,
      systemNodes: Array.isArray(parsed.systemNodes) && parsed.systemNodes.length > 0 ? parsed.systemNodes : DEFAULT_STATE.systemNodes,
      featureFlags: Array.isArray(parsed.featureFlags) && parsed.featureFlags.length > 0 ? parsed.featureFlags : DEFAULT_STATE.featureFlags,
      incidents: Array.isArray(parsed.incidents) ? parsed.incidents : DEFAULT_STATE.incidents,
      ledger: Array.isArray(parsed.ledger) ? parsed.ledger : DEFAULT_STATE.ledger,
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : DEFAULT_STATE.notifications,
      apiCredentials: Array.isArray(parsed.apiCredentials) ? parsed.apiCredentials : DEFAULT_STATE.apiCredentials,
      webhooks: Array.isArray(parsed.webhooks) ? parsed.webhooks : DEFAULT_STATE.webhooks,
      auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : DEFAULT_STATE.auditLogs,
      domainEvents: Array.isArray(parsed.domainEvents) ? parsed.domainEvents : DEFAULT_STATE.domainEvents,
      webhookLogs: Array.isArray(parsed.webhookLogs) ? parsed.webhookLogs : DEFAULT_STATE.webhookLogs,
      aiProviders: Array.isArray(parsed.aiProviders) && parsed.aiProviders.length > 0 ? parsed.aiProviders : DEFAULT_STATE.aiProviders,
      aiModels: Array.isArray(parsed.aiModels) && parsed.aiModels.length > 0 ? parsed.aiModels : DEFAULT_STATE.aiModels,
      aiAgents: Array.isArray(parsed.aiAgents) && parsed.aiAgents.length > 0 ? parsed.aiAgents : DEFAULT_STATE.aiAgents,
      aiPrompts: Array.isArray(parsed.aiPrompts) ? parsed.aiPrompts : DEFAULT_STATE.aiPrompts,
      aiTools: Array.isArray(parsed.aiTools) ? parsed.aiTools : DEFAULT_STATE.aiTools,
      aiKnowledgeSources: Array.isArray(parsed.aiKnowledgeSources) ? parsed.aiKnowledgeSources : DEFAULT_STATE.aiKnowledgeSources,
      aiCostRecords: Array.isArray(parsed.aiCostRecords) ? parsed.aiCostRecords : DEFAULT_STATE.aiCostRecords,
      aiBudgets: Array.isArray(parsed.aiBudgets) ? parsed.aiBudgets : DEFAULT_STATE.aiBudgets,
      aiAutonomyRules: Array.isArray(parsed.aiAutonomyRules) ? parsed.aiAutonomyRules : DEFAULT_STATE.aiAutonomyRules,
      aiApprovalTasks: Array.isArray(parsed.aiApprovalTasks) ? parsed.aiApprovalTasks : DEFAULT_STATE.aiApprovalTasks,
      aiAuditLogs: Array.isArray(parsed.aiAuditLogs) ? parsed.aiAuditLogs : DEFAULT_STATE.aiAuditLogs,
      aiConversations: Array.isArray(parsed.aiConversations) ? parsed.aiConversations : DEFAULT_STATE.aiConversations,
      doubleEntryLedger: Array.isArray(parsed.doubleEntryLedger) ? parsed.doubleEntryLedger : DEFAULT_STATE.doubleEntryLedger,
      omniWallets: Array.isArray(parsed.omniWallets) && parsed.omniWallets.length > 0 ? parsed.omniWallets : DEFAULT_STATE.omniWallets,
      paymentIntegrations: Array.isArray(parsed.paymentIntegrations) ? parsed.paymentIntegrations : DEFAULT_STATE.paymentIntegrations,
      billableProducts: Array.isArray(parsed.billableProducts) ? parsed.billableProducts : DEFAULT_STATE.billableProducts,
      subscriptions: Array.isArray(parsed.subscriptions) ? parsed.subscriptions : DEFAULT_STATE.subscriptions,
      invoices: Array.isArray(parsed.invoices) ? parsed.invoices : DEFAULT_STATE.invoices,
      payouts: Array.isArray(parsed.payouts) ? parsed.payouts : DEFAULT_STATE.payouts,
      reconciliationLogs: Array.isArray(parsed.reconciliationLogs) ? parsed.reconciliationLogs : DEFAULT_STATE.reconciliationLogs,
      affiliates: Array.isArray(parsed.affiliates) && parsed.affiliates.length > 0 ? parsed.affiliates : DEFAULT_STATE.affiliates,
      affiliateOpportunities: Array.isArray(parsed.affiliateOpportunities) && parsed.affiliateOpportunities.length > 0 ? parsed.affiliateOpportunities : DEFAULT_STATE.affiliateOpportunities,
      affiliateClicks: Array.isArray(parsed.affiliateClicks) ? parsed.affiliateClicks : DEFAULT_STATE.affiliateClicks,
      affiliateLeads: Array.isArray(parsed.affiliateLeads) ? parsed.affiliateLeads : DEFAULT_STATE.affiliateLeads,
      affiliateConversions: Array.isArray(parsed.affiliateConversions) ? parsed.affiliateConversions : DEFAULT_STATE.affiliateConversions,
      affiliateCommissions: Array.isArray(parsed.affiliateCommissions) ? parsed.affiliateCommissions : DEFAULT_STATE.affiliateCommissions,
      growthRewards: Array.isArray(parsed.growthRewards) ? parsed.growthRewards : DEFAULT_STATE.growthRewards,
      fraudAlerts: Array.isArray(parsed.fraudAlerts) ? parsed.fraudAlerts : DEFAULT_STATE.fraudAlerts,
      tenantPlatforms: Array.isArray(parsed.tenantPlatforms) && parsed.tenantPlatforms.length > 0 ? parsed.tenantPlatforms : DEFAULT_STATE.tenantPlatforms,
      resellerNodes: Array.isArray(parsed.resellerNodes) ? parsed.resellerNodes : DEFAULT_STATE.resellerNodes,
      resellerEconomics: Array.isArray(parsed.resellerEconomics) ? parsed.resellerEconomics : DEFAULT_STATE.resellerEconomics,
      superAdminControls: Array.isArray(parsed.superAdminControls) ? parsed.superAdminControls : DEFAULT_STATE.superAdminControls,
      notificationTemplates: Array.isArray(parsed.notificationTemplates) ? parsed.notificationTemplates : DEFAULT_STATE.notificationTemplates,
      notificationPreferences: Array.isArray(parsed.notificationPreferences) ? parsed.notificationPreferences : DEFAULT_STATE.notificationPreferences,
      notificationDeliveryLogs: Array.isArray(parsed.notificationDeliveryLogs) ? parsed.notificationDeliveryLogs : DEFAULT_STATE.notificationDeliveryLogs,
      omniInboxMessages: Array.isArray(parsed.omniInboxMessages) ? parsed.omniInboxMessages : DEFAULT_STATE.omniInboxMessages,
      analyticsEvents: Array.isArray(parsed.analyticsEvents) ? parsed.analyticsEvents : DEFAULT_STATE.analyticsEvents,
      privacyConsentConfigs: Array.isArray(parsed.privacyConsentConfigs) ? parsed.privacyConsentConfigs : DEFAULT_STATE.privacyConsentConfigs,
      entityTrustScores: Array.isArray(parsed.entityTrustScores) ? parsed.entityTrustScores : DEFAULT_STATE.entityTrustScores,
      riskEvents: Array.isArray(parsed.riskEvents) ? parsed.riskEvents : DEFAULT_STATE.riskEvents,
      savedSearches: Array.isArray(parsed.savedSearches) ? parsed.savedSearches : DEFAULT_STATE.savedSearches,
      searchHistory: Array.isArray(parsed.searchHistory) ? parsed.searchHistory : DEFAULT_STATE.searchHistory,
      developerProfiles: Array.isArray(parsed.developerProfiles) ? parsed.developerProfiles : DEFAULT_STATE.developerProfiles,
      marketplaceApps: Array.isArray(parsed.marketplaceApps) ? parsed.marketplaceApps : DEFAULT_STATE.marketplaceApps,
      appInstallations: Array.isArray(parsed.appInstallations) ? parsed.appInstallations : DEFAULT_STATE.appInstallations,
      sandboxApiRequests: Array.isArray(parsed.sandboxApiRequests) ? parsed.sandboxApiRequests : DEFAULT_STATE.sandboxApiRequests,
      developerEarningLogs: Array.isArray(parsed.developerEarningLogs) ? parsed.developerEarningLogs : DEFAULT_STATE.developerEarningLogs,
      shareholders: Array.isArray(parsed.shareholders) ? parsed.shareholders : DEFAULT_STATE.shareholders,
      capTable: Array.isArray(parsed.capTable) ? parsed.capTable : DEFAULT_STATE.capTable,
      valuationRecords: Array.isArray(parsed.valuationRecords) ? parsed.valuationRecords : DEFAULT_STATE.valuationRecords,
      investmentOfferings: Array.isArray(parsed.investmentOfferings) ? parsed.investmentOfferings : DEFAULT_STATE.investmentOfferings,
      exchangeCredentials: Array.isArray(parsed.exchangeCredentials) ? parsed.exchangeCredentials : DEFAULT_STATE.exchangeCredentials,
      governancePolicies: Array.isArray(parsed.governancePolicies) ? parsed.governancePolicies : DEFAULT_STATE.governancePolicies,
      adminApprovalTasks: Array.isArray(parsed.adminApprovalTasks) ? parsed.adminApprovalTasks : DEFAULT_STATE.adminApprovalTasks,
      browserTabs: Array.isArray(parsed.browserTabs) && parsed.browserTabs.length > 0 ? parsed.browserTabs : DEFAULT_STATE.browserTabs,
      browserWorkspaces: Array.isArray(parsed.browserWorkspaces) && parsed.browserWorkspaces.length > 0 ? parsed.browserWorkspaces : DEFAULT_STATE.browserWorkspaces,
      activeBrowserWorkspaceId: parsed.activeBrowserWorkspaceId || DEFAULT_STATE.activeBrowserWorkspaceId,
      activeBrowserTabId: parsed.activeBrowserTabId || DEFAULT_STATE.activeBrowserTabId,
      browserBookmarks: Array.isArray(parsed.browserBookmarks) ? parsed.browserBookmarks : DEFAULT_STATE.browserBookmarks,
      browserBookmarkFolders: Array.isArray(parsed.browserBookmarkFolders) ? parsed.browserBookmarkFolders : DEFAULT_STATE.browserBookmarkFolders,
      browserHistory: Array.isArray(parsed.browserHistory) ? parsed.browserHistory : DEFAULT_STATE.browserHistory,
      browserDownloads: Array.isArray(parsed.browserDownloads) ? parsed.browserDownloads : DEFAULT_STATE.browserDownloads,
      browserExtensions: Array.isArray(parsed.browserExtensions) ? parsed.browserExtensions : DEFAULT_STATE.browserExtensions,
      browserPrivacyShields: Array.isArray(parsed.browserPrivacyShields) ? parsed.browserPrivacyShields : DEFAULT_STATE.browserPrivacyShields,
      browserVpnNodes: Array.isArray(parsed.browserVpnNodes) ? parsed.browserVpnNodes : DEFAULT_STATE.browserVpnNodes,
      browserVpnState: parsed.browserVpnState ? { ...DEFAULT_STATE.browserVpnState, ...parsed.browserVpnState } : DEFAULT_STATE.browserVpnState,
      browserSearchEngines: Array.isArray(parsed.browserSearchEngines) ? parsed.browserSearchEngines : DEFAULT_STATE.browserSearchEngines,
      browserSettings: parsed.browserSettings ? { ...DEFAULT_STATE.browserSettings, ...parsed.browserSettings } : DEFAULT_STATE.browserSettings,
      browserReaderContent: parsed.browserReaderContent || DEFAULT_STATE.browserReaderContent,
      browserSecurityAuditLogs: Array.isArray(parsed.browserSecurityAuditLogs) ? parsed.browserSecurityAuditLogs : DEFAULT_STATE.browserSecurityAuditLogs,
      browserTabGroups: Array.isArray(parsed.browserTabGroups) ? parsed.browserTabGroups : DEFAULT_STATE.browserTabGroups,
      browserSavedSessions: Array.isArray(parsed.browserSavedSessions) ? parsed.browserSavedSessions : DEFAULT_STATE.browserSavedSessions,
      browserProjectSpaces: Array.isArray(parsed.browserProjectSpaces) ? parsed.browserProjectSpaces : DEFAULT_STATE.browserProjectSpaces,
      browserReadingList: Array.isArray(parsed.browserReadingList) ? parsed.browserReadingList : DEFAULT_STATE.browserReadingList,
      browserSyncConfig: parsed.browserSyncConfig ? { ...DEFAULT_STATE.browserSyncConfig, ...parsed.browserSyncConfig } : DEFAULT_STATE.browserSyncConfig,
      browserSyncPayloads: Array.isArray(parsed.browserSyncPayloads) ? parsed.browserSyncPayloads : DEFAULT_STATE.browserSyncPayloads,
      browserAuthorizedDevices: Array.isArray(parsed.browserAuthorizedDevices) ? parsed.browserAuthorizedDevices : DEFAULT_STATE.browserAuthorizedDevices,
      browserSecuritySessions: Array.isArray(parsed.browserSecuritySessions) ? parsed.browserSecuritySessions : DEFAULT_STATE.browserSecuritySessions,
      browserSuspiciousAlerts: Array.isArray(parsed.browserSuspiciousAlerts) ? parsed.browserSuspiciousAlerts : DEFAULT_STATE.browserSuspiciousAlerts,
      activeBrowserPlatformAdapter: parsed.activeBrowserPlatformAdapter || DEFAULT_STATE.activeBrowserPlatformAdapter
    };
  } catch (e) {
    return DEFAULT_STATE;
  }
};

export const saveState = (state: OMNIState) => {
  try {
    localStorage.setItem('omni_platform_state_v1', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save OMNI state:', e);
  }
};
