import { 
  NotificationTemplate, 
  NotificationPreference, 
  NotificationDeliveryLog, 
  OmniInboxMessage, 
  AnalyticsEvent, 
  PrivacyConsentConfig, 
  EntityTrustScore, 
  RiskEvent, 
  SavedSearch, 
  SearchHistoryEntry 
} from './types';

// 1. Notification Templates
export const SEED_NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'tmpl_welcome',
    tenantId: null,
    category: 'system',
    titleTemplate: 'Welcome to {{platformName}}, {{name}}!',
    bodyTemplate: 'Hi {{name}},\n\nYour account is now active on {{platformName}}. Explore your personalized workspace modules here: {{link}}.',
    language: 'en_US',
    branding: { headerColor: '#3B82F6', footerText: 'Dynasty OMNI Automated Delivery Service' }
  },
  {
    id: 'tmpl_invoice_paid',
    tenantId: null,
    category: 'billing',
    titleTemplate: 'Receipt for Invoice #{{invoiceId}}',
    bodyTemplate: 'Dear Partner,\n\nWe successfully processed your billing payment of {{amount}} {{currency}} on the global ledger. Your transaction hash is {{txHash}}.',
    language: 'en_US',
    branding: { headerColor: '#10B981', footerText: 'Ledger settlements are audited under double-entry guidelines.' }
  },
  {
    id: 'tmpl_mfa_warning',
    tenantId: null,
    category: 'security',
    titleTemplate: '[Security Alert] MFA Session Authenticated',
    bodyTemplate: 'We detected a new login session for username {{username}} from {{location}} using IP {{ipAddress}}. If this was not you, lock your passport immediately.',
    language: 'en_US',
    branding: { headerColor: '#EF4444', footerText: 'OMNI Identity Protection Service' }
  },
  {
    id: 'tmpl_sw_welcome',
    tenantId: null,
    category: 'system',
    titleTemplate: 'Karibu {{platformName}}, {{name}}!',
    bodyTemplate: 'Hujambo {{name}},\n\nKaribu kwenye {{platformName}}. Unaweza kuona moduli zako zote na kuanza biashara leo.',
    language: 'sw_KE',
    branding: { headerColor: '#C2410C', footerText: 'Mfumo wa OMNI' }
  }
];

// 2. Notification Preferences
export const SEED_NOTIFICATION_PREFERENCES: NotificationPreference[] = [
  {
    userId: 'usr_gideon',
    tenantId: 'plat_learn_dynasty',
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    inAppEnabled: true,
    webhookEnabled: true,
    categoryPreferences: { system: true, billing: true, security: true, marketing: false, support: true }
  },
  {
    userId: 'usr_gideon',
    tenantId: 'plat_soko_oluwalana',
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    inAppEnabled: true,
    webhookEnabled: true,
    categoryPreferences: { system: true, billing: true, security: true, marketing: true, support: true }
  }
];

// 3. Notification Delivery Logs
export const SEED_NOTIFICATION_DELIVERY_LOGS: NotificationDeliveryLog[] = [
  {
    id: 'log_001',
    tenantId: 'plat_learn_dynasty',
    userId: 'usr_gideon',
    recipient: 'gideon@dynastyholdings.com',
    channel: 'email',
    category: 'system',
    priority: 'high',
    title: 'Welcome to Dynasty Academy, Gideon!',
    content: 'Hi Gideon, your executive learning account is ready. Explore the leadership courses here.',
    status: 'sent',
    retryCount: 0,
    maxRetries: 3,
    sentAt: '2026-08-14T10:30:00Z'
  },
  {
    id: 'log_002',
    tenantId: 'plat_soko_oluwalana',
    userId: 'usr_gideon',
    recipient: '+2348031234567',
    channel: 'sms',
    category: 'security',
    priority: 'critical',
    title: 'MFA Code',
    content: 'Your OMNI secure authentication code is 482109.',
    status: 'sent',
    retryCount: 0,
    maxRetries: 2,
    sentAt: '2026-08-15T02:00:00Z'
  },
  {
    id: 'log_003',
    tenantId: 'plat_soko_oluwalana',
    userId: 'usr_gideon',
    recipient: 'https://oluwalana.tech/api/webhooks/omni',
    channel: 'webhook',
    category: 'billing',
    priority: 'medium',
    title: 'Payment Hook Received',
    content: 'Transaction code tx_99218a cleared on the ledger.',
    status: 'failed',
    retryCount: 3,
    maxRetries: 3,
    errorLog: 'Connection timeout - Destination endpoint returned status 504',
    sentAt: '2026-08-15T01:15:00Z'
  },
  {
    id: 'log_004',
    tenantId: 'plat_learn_dynasty',
    userId: 'usr_gideon',
    recipient: 'gideon@dynastyholdings.com',
    channel: 'push',
    category: 'marketing',
    priority: 'low',
    title: 'New course drop on Ledger Management',
    content: 'Dr. Oluwalana has dropped a brand-new masterclass on double-entry accounting structures.',
    status: 'retrying',
    retryCount: 1,
    maxRetries: 3,
    errorLog: 'Push token registration expired. Attempting token cache refresh.',
    scheduledAt: '2026-08-15T04:30:00Z'
  }
];

// 4. OMNI Unified Communication Inbox Messages
export const SEED_OMNI_INBOX_MESSAGES: OmniInboxMessage[] = [
  {
    id: 'msg_001',
    tenantId: 'plat_learn_dynasty',
    userId: 'usr_gideon',
    appId: 'app_learn',
    messageType: 'announcement',
    subject: 'Welcome to your Enterprise Syllabus',
    body: 'Greetings Student! The Dynasty Academic syllabus has been fully updated for the fall semester. Access your downloadable resources in module 2.',
    isRead: false,
    isArchived: false,
    createdAt: '2026-08-14T08:00:00Z'
  },
  {
    id: 'msg_002',
    tenantId: 'plat_soko_oluwalana',
    userId: 'usr_gideon',
    appId: 'app_pay',
    messageType: 'alert',
    subject: '[Action Required] Ledger Reconciliation Mismatch Alert',
    body: 'Our automatic ledger matching engine found a pending $12.00 imbalance between clearing house node A and sub-merchant B. Please check audit logs.',
    isRead: true,
    isArchived: false,
    createdAt: '2026-08-15T01:00:00Z'
  },
  {
    id: 'msg_003',
    tenantId: 'plat_soko_oluwalana',
    userId: 'usr_gideon',
    appId: 'app_logistics',
    messageType: 'ticket_update',
    subject: 'Cargo forwarding dispatch confirmed - Flight NG204',
    body: 'The shipping cooperative confirmed loading of artisan textiles onto carrier NG204. Cold-chain temperature telemetry logs are tracking active.',
    isRead: false,
    isArchived: false,
    createdAt: '2026-08-15T03:00:00Z'
  }
];

// 5. Standard Analytics Events (Rich coverage for dashboards)
export const SEED_ANALYTICS_EVENTS: AnalyticsEvent[] = [
  // Page Views
  { id: 'ev_001', tenantId: 'plat_learn_dynasty', appId: 'app_learn', eventType: 'page_view', timestamp: '2026-08-14T09:00:00Z', metadata: { pageUrl: '/courses/ledger', duration: 120 }, country: 'US' },
  { id: 'ev_002', tenantId: 'plat_soko_oluwalana', appId: 'app_market', eventType: 'page_view', timestamp: '2026-08-14T09:15:00Z', metadata: { pageUrl: '/catalog/textiles', referrer: 'instagram' }, country: 'NG' },
  { id: 'ev_003', tenantId: 'plat_soko_oluwalana', appId: 'app_market', eventType: 'page_view', timestamp: '2026-08-14T10:00:00Z', metadata: { pageUrl: '/home', browser: 'chrome' }, country: 'ZA' },
  { id: 'ev_004', tenantId: 'plat_learn_dynasty', appId: 'app_learn', eventType: 'page_view', timestamp: '2026-08-14T11:45:00Z', metadata: { pageUrl: '/courses/architecture' }, country: 'GB' },
  
  // Signups
  { id: 'ev_005', tenantId: 'plat_learn_dynasty', userId: 'usr_student_1', appId: 'app_learn', eventType: 'signup', timestamp: '2026-08-14T12:00:00Z', metadata: { origin: 'organic', role: 'student' }, country: 'US' },
  { id: 'ev_006', tenantId: 'plat_soko_oluwalana', userId: 'usr_artisan_1', appId: 'app_market', eventType: 'signup', timestamp: '2026-08-14T13:20:00Z', metadata: { designer: 'Adebayo Textiles' }, country: 'NG' },
  
  // App Opens
  { id: 'ev_007', tenantId: 'plat_learn_dynasty', userId: 'usr_gideon', appId: 'app_learn', eventType: 'app_open', timestamp: '2026-08-15T01:00:00Z', metadata: { version: '1.4.0' } },
  { id: 'ev_008', tenantId: 'plat_soko_oluwalana', userId: 'usr_gideon', appId: 'app_market', eventType: 'app_open', timestamp: '2026-08-15T02:00:00Z', metadata: { version: '2.0.1' } },
  
  // Subscriptions
  { id: 'ev_009', tenantId: 'plat_learn_dynasty', userId: 'usr_student_1', appId: 'app_learn', eventType: 'subscription_started', timestamp: '2026-08-14T12:15:00Z', metadata: { plan: 'growth', fee: 299.00 } },
  { id: 'ev_010', tenantId: 'plat_soko_oluwalana', userId: 'usr_artisan_2', appId: 'app_market', eventType: 'subscription_started', timestamp: '2026-08-14T14:00:00Z', metadata: { plan: 'enterprise', fee: 899.00 } },
  
  // Purchases
  { id: 'ev_011', tenantId: 'plat_soko_oluwalana', userId: 'usr_patron_1', appId: 'app_market', eventType: 'purchase_completed', timestamp: '2026-08-14T16:00:00Z', metadata: { amount: 1450.00, itemsCount: 4, paymentProvider: 'stripe' }, country: 'US' },
  { id: 'ev_012', tenantId: 'plat_soko_oluwalana', userId: 'usr_patron_2', appId: 'app_market', eventType: 'purchase_completed', timestamp: '2026-08-14T18:30:00Z', metadata: { amount: 350.00, itemsCount: 1, paymentProvider: 'mobile_money' }, country: 'KE' },
  { id: 'ev_013', tenantId: 'plat_learn_dynasty', userId: 'usr_student_2', appId: 'app_learn', eventType: 'purchase_completed', timestamp: '2026-08-15T01:45:00Z', metadata: { amount: 49.00, course: 'Double-entry 101' }, country: 'ZA' },

  // Ad clicks
  { id: 'ev_014', tenantId: 'plat_soko_oluwalana', appId: 'app_ads', eventType: 'ad_click', timestamp: '2026-08-15T02:30:00Z', metadata: { campaignId: 'cmp_native_beads', clickValue: 0.15 }, country: 'NG' },

  // Course completion
  { id: 'ev_015', tenantId: 'plat_learn_dynasty', userId: 'usr_student_1', appId: 'app_learn', eventType: 'course_completed', timestamp: '2026-08-15T03:10:00Z', metadata: { syllabusId: 'syll_financial_audits' }, country: 'US' },

  // Referral conversion
  { id: 'ev_016', tenantId: 'plat_soko_oluwalana', userId: 'usr_newly_referred_buyer', appId: 'app_market', eventType: 'referral_conversion', timestamp: '2026-08-15T03:30:00Z', metadata: { affiliateId: 'aff_gideon', payoutReward: 15.00 }, country: 'NG' }
];

// 6. Privacy Consent Configs
export const SEED_PRIVACY_CONSENT_CONFIGS: PrivacyConsentConfig[] = [
  {
    userId: 'usr_gideon',
    tenantId: 'plat_learn_dynasty',
    consentGrantedAt: '2026-08-14T09:00:00Z',
    analyticsEnabled: true,
    marketingEnabled: true,
    dataMinimizationEnabled: true,
    regionalSchema: 'GDPR'
  },
  {
    userId: 'usr_gideon',
    tenantId: 'plat_soko_oluwalana',
    consentGrantedAt: '2026-08-15T02:00:00Z',
    analyticsEnabled: true,
    marketingEnabled: false,
    dataMinimizationEnabled: false,
    regionalSchema: 'standard'
  }
];

// 7. Trust Scores & Signal Profiles
export const SEED_ENTITY_TRUST_SCORES: EntityTrustScore[] = [
  {
    id: 'plat_learn_dynasty',
    ownerId: 'org_dynasty',
    entityName: 'Dynasty Professional Academy',
    entityType: 'business',
    score: 96,
    level: 'excellent',
    signals: [
      { id: 'sig_001', type: 'positive', source: 'double-entry', scoreImpact: 10, reasonCode: 'CLEAN_AUDIT_TRAIL', description: 'Double-entry ledger matches within zero-error boundaries over 180 continuous cycles.', timestamp: '2026-08-14T12:00:00Z' },
      { id: 'sig_002', type: 'positive', source: 'fraud-checker', scoreImpact: 5, reasonCode: 'LOW_REVERSAL_RATE', description: 'Payout chargeback rate is 0.00% over the last 90 business days.', timestamp: '2026-08-15T01:00:00Z' },
      { id: 'sig_003', type: 'positive', source: 'white_label_onboarding', scoreImpact: 10, reasonCode: 'KYB_VERIFIED', description: 'Business registration verified via third-party registrar with valid registration keys.', timestamp: '2026-03-15T12:00:00Z' }
    ],
    appeals: []
  },
  {
    id: 'plat_soko_oluwalana',
    ownerId: 'org_sandbox',
    entityName: 'SokoGlobal Fashion Market',
    entityType: 'seller',
    score: 89,
    level: 'good',
    signals: [
      { id: 'sig_004', type: 'positive', source: 'double-entry', scoreImpact: 15, reasonCode: 'VOLUME_MILESTONE', description: 'Cleared over $140,000.00 in total trade volume with standard clearing settlement.', timestamp: '2026-08-14T20:00:00Z' },
      { id: 'sig_005', type: 'negative', source: 'fraud-checker', scoreImpact: -15, reasonCode: 'MISMATCHED_BIN_COUNTRY', description: 'Customer checkouts flagged duplicate sessions with mismatched card BIN issuer countries.', timestamp: '2026-08-15T02:30:00Z' }
    ],
    appeals: [
      {
        id: 'apl_001',
        reason: 'The mismatched cards are from verified tourists buying high-value Ankara garments in our Lagos physical showroom store.',
        evidenceUrl: 'https://oluwalana.tech/documents/proof_of_retail_customer_sales.pdf',
        submittedAt: '2026-08-15T03:00:00Z',
        status: 'pending'
      }
    ]
  },
  {
    id: 'usr_gideon',
    ownerId: 'usr_gideon',
    entityName: 'Gideon Oluwalana (Affiliate Ambassador)',
    entityType: 'affiliate',
    score: 98,
    level: 'excellent',
    signals: [
      { id: 'sig_006', type: 'positive', source: 'affiliates', scoreImpact: 10, reasonCode: 'LOW_REFUND_REFERRALS', description: 'Referred customer purchase refund rate is under 0.2%.', timestamp: '2026-08-14T10:00:00Z' },
      { id: 'sig_007', type: 'positive', source: 'double-entry', scoreImpact: 15, reasonCode: 'CONSISTENT_EARNINGS', description: 'Successfully reconciled double-entry commission payouts over 12 months.', timestamp: '2026-08-15T01:00:00Z' }
    ],
    appeals: []
  }
];

// 8. Shared Risk / Fraud Events
export const SEED_RISK_EVENTS: RiskEvent[] = [
  {
    id: 'risk_001',
    tenantId: 'plat_soko_oluwalana',
    appId: 'app_pay',
    userId: 'usr_gideon',
    riskType: 'rapid_payout_velocity',
    severity: 'medium',
    description: 'Triggered payout threshold velocity limit of 5 requests within a rolling 60-second window.',
    triggerPayload: { requestedAmountUsd: 14500.00, timeframeSeconds: 60, attemptCount: 5 },
    status: 'active_alert',
    timestamp: '2026-08-15T02:15:00Z'
  },
  {
    id: 'risk_002',
    tenantId: 'plat_soko_oluwalana',
    appId: 'app_market',
    riskType: 'mismatched_bin_country',
    severity: 'high',
    description: 'A transaction request of $1,450.00 used a card registered in Germany, while the request IP address was located in Nigeria.',
    triggerPayload: { binCountry: 'DE', userIp: '102.89.23.104', requestCountry: 'NG' },
    status: 'reviewing',
    timestamp: '2026-08-15T02:30:00Z'
  }
];

// 9. Saved Searches & History
export const SEED_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: 'sv_001',
    userId: 'usr_gideon',
    query: 'Ankara textiles premium fabric',
    filters: { category: 'fashion', country: 'NG' },
    name: 'Top Nigerian Fabrics',
    createdAt: '2026-08-14T18:00:00Z'
  }
];

export const SEED_SEARCH_HISTORY: SearchHistoryEntry[] = [
  { id: 'sh_001', userId: 'usr_gideon', query: 'double entry accounting software', timestamp: '2026-08-15T01:10:00Z' },
  { id: 'sh_002', userId: 'usr_gideon', query: 'Ankara textiles premium fabric', timestamp: '2026-08-15T02:00:00Z' }
];
