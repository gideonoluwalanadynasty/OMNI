import { DeveloperProfile, MarketplaceApp, AppInstallation, SandboxApiRequest, DeveloperEarningLog } from './types';

export const SEED_DEVELOPER_PROFILES: DeveloperProfile[] = [
  {
    id: 'dev_oluwalana_tech',
    userId: 'usr_gideon',
    companyName: 'Oluwalana Systems Ltd',
    developerWebsite: 'https://oluwalana.tech',
    status: 'verified',
    apiKey: 'omni_dev_key_oluwalana_99a8c3',
    oauthClientId: 'client_id_oluwalana_pos_gateway',
    oauthClientSecret: 'client_secret_olu_••••••••••••••••0129',
    webhookUrl: 'https://api.oluwalana.tech/v2/omni_receiver',
    registeredAt: '2026-02-15T09:00:00Z',
    earningsBalanceUsd: 12450.00
  },
  {
    id: 'dev_african_textiles',
    userId: 'usr_artisan_2',
    companyName: 'Adebayo Garments Guild',
    developerWebsite: 'https://adebayotextiles.com',
    status: 'verified',
    apiKey: 'omni_dev_key_adebayo_22f8a1',
    oauthClientId: 'client_id_adebayo_wholesale_portal',
    oauthClientSecret: 'client_secret_ade_••••••••••••••••8812',
    webhookUrl: 'https://wholesale.adebayotextiles.com/webhooks',
    registeredAt: '2026-03-22T14:30:00Z',
    earningsBalanceUsd: 4800.00
  },
  {
    id: 'dev_quantum_agents',
    userId: 'usr_student_1',
    companyName: 'Quantum Automation Lab',
    developerWebsite: 'https://quantumautomation.io',
    status: 'pending_verification',
    apiKey: 'omni_dev_key_quantum_77c2a1',
    oauthClientId: 'client_id_quantum_reconciliation_agent',
    oauthClientSecret: 'client_secret_qnt_••••••••••••••••5503',
    webhookUrl: 'https://reconcile.quantumautomation.io/api/v1/event',
    registeredAt: '2026-08-10T11:15:00Z',
    earningsBalanceUsd: 0.00
  }
];

export const SEED_MARKETPLACE_APPS: MarketplaceApp[] = [
  {
    id: 'mkt_app_double_entry_reconciler',
    developerId: 'dev_oluwalana_tech',
    developerName: 'Oluwalana Systems Ltd',
    name: 'Fidelity Ledger Reconciler',
    slug: 'fidelity-reconciler',
    category: 'ai_agent',
    shortDescription: 'AI-driven double-entry ledger auditor that automatically scans cross-tenant payout logs to clear unmatched transactions.',
    longDescription: 'This advanced AI agent integrates directly into OMNI Financial Ledgers. It pulls real-time double-entry balances, matches clearing bank logs with internal peer-to-peer allocations, and issues automated clearing recommendations. It completely mitigates billing leakages across white-label reseller setups.',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    manifest: {
      apiVersion: 'v2.1',
      entryPoint: 'https://reconciler.oluwalana.tech/app/index.js',
      requestedScopes: ['wallet.ledger.read', 'wallet.ledger.write', 'analytics.push'],
      webhooksEnabled: true
    },
    privacyPolicyUrl: 'https://oluwalana.tech/privacy-policy-ledger',
    pricingType: 'subscription',
    priceAmount: 89.00,
    revenueSharePercent: 80, // 80% to developer
    supportEmail: 'support@oluwalana.tech',
    targetCountries: ['US', 'NG', 'KE', 'ZA', 'GB'],
    status: 'published',
    rating: 4.8,
    installCount: 14,
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'mkt_app_chrome_billing_hud',
    developerId: 'dev_oluwalana_tech',
    developerName: 'Oluwalana Systems Ltd',
    name: 'OMNI Chrome Billing HUD',
    slug: 'chrome-billing-hud',
    category: 'extension',
    shortDescription: 'Sovereign browser extension rendering dynamic white-label reseller margins on any retail web portal.',
    longDescription: 'Instantly view active reseller margins, pending KYC audits, and real-time transaction velocities without switching browser tabs. Securely authorized via OAuth client scopes.',
    screenshots: [
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80'
    ],
    manifest: {
      apiVersion: 'v1.8',
      entryPoint: 'https://chrome.google.com/webstore/detail/omni-hud',
      requestedScopes: ['identity.read', 'wallet.ledger.read'],
      webhooksEnabled: false
    },
    privacyPolicyUrl: 'https://oluwalana.tech/privacy-chrome-ext',
    pricingType: 'free',
    priceAmount: 0,
    revenueSharePercent: 100,
    supportEmail: 'extensions@oluwalana.tech',
    targetCountries: ['all'],
    status: 'published',
    rating: 4.5,
    installCount: 42,
    createdAt: '2026-04-12T11:00:00Z'
  },
  {
    id: 'mkt_app_decentralized_invoice_connector',
    developerId: 'dev_african_textiles',
    developerName: 'Adebayo Garments Guild',
    name: 'African Wholesaler Catalog Sync',
    slug: 'african-wholesale-sync',
    category: 'connector',
    shortDescription: 'Synchronizes regional textile cooperative inventories with global retail catalogs and double-entry invoices.',
    longDescription: 'Bypasses outdated trading houses by linking decentralized wholesale clothing inventory straight with OMNI payment gateways. Automatic currency conversion is triggered for high-speed cross-border settlements.',
    screenshots: [
      'https://images.unsplash.com/photo-1524295921346-61874052f553?auto=format&fit=crop&w=800&q=80'
    ],
    manifest: {
      apiVersion: 'v2.0',
      entryPoint: 'https://wholesale.adebayotextiles.com/sync-manifest.json',
      requestedScopes: ['wallet.ledger.write', 'notifs.send'],
      webhooksEnabled: true
    },
    privacyPolicyUrl: 'https://adebayotextiles.com/privacy-guild',
    pricingType: 'one_time',
    priceAmount: 199.00,
    revenueSharePercent: 85,
    supportEmail: 'guild@adebayotextiles.com',
    targetCountries: ['NG', 'GH', 'KE', 'ZA', 'US'],
    status: 'published',
    rating: 4.9,
    installCount: 8,
    createdAt: '2026-05-15T15:30:00Z'
  },
  {
    id: 'mkt_app_payout_velocity_guard',
    developerId: 'dev_quantum_agents',
    developerName: 'Quantum Automation Lab',
    name: 'Payout Velocity Fraud Guard',
    slug: 'payout-velocity-guard',
    category: 'automation_template',
    shortDescription: 'Advanced security rule checking for extreme transaction volumes and duplicate session signatures.',
    longDescription: 'Automated policy rule checking that flags nested ledger transfers occurring within milliseconds of each other. Connects with the OMNI Risk Engine to isolate suspicious accounts.',
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    ],
    manifest: {
      apiVersion: 'v2.2',
      entryPoint: 'https://quantumautomation.io/rules/velocity-guard.json',
      requestedScopes: ['wallet.ledger.read', 'notifs.send'],
      webhooksEnabled: true
    },
    privacyPolicyUrl: 'https://quantumautomation.io/privacy-payout-guard',
    pricingType: 'usage',
    priceAmount: 0.05, // $0.05 per API check
    revenueSharePercent: 80,
    supportEmail: 'security@quantumautomation.io',
    targetCountries: ['all'],
    status: 'submitted', // Undergoing review
    rating: 0,
    installCount: 0,
    createdAt: '2026-08-10T12:00:00Z'
  }
];

export const SEED_APP_INSTALLATIONS: AppInstallation[] = [
  {
    id: 'inst_1',
    tenantId: 'plat_learn_dynasty',
    appId: 'mkt_app_double_entry_reconciler',
    approvedScopes: ['wallet.ledger.read', 'wallet.ledger.write', 'analytics.push'],
    status: 'active',
    installedBy: 'usr_gideon',
    installedAt: '2026-03-15T14:00:00Z'
  },
  {
    id: 'inst_2',
    tenantId: 'plat_learn_dynasty',
    appId: 'mkt_app_chrome_billing_hud',
    approvedScopes: ['identity.read', 'wallet.ledger.read'],
    status: 'active',
    installedBy: 'usr_gideon',
    installedAt: '2026-04-20T09:30:00Z'
  }
];

export const SEED_SANDBOX_API_REQUESTS: SandboxApiRequest[] = [
  {
    id: 'req_sand_01',
    apiKey: 'omni_dev_key_oluwalana_99a8c3',
    method: 'GET',
    endpoint: '/api/v1/ledger/balances?walletId=wallet_dynasty',
    requestPayload: '{}',
    responsePayload: '{"walletId":"wallet_dynasty","balance":4280550.00,"currency":"USD","status":"active"}',
    statusCode: 200,
    tenantIsolationCheck: 'PASS_ENFORCED',
    timestamp: '2026-08-15T02:40:00Z'
  },
  {
    id: 'req_sand_02',
    apiKey: 'omni_dev_key_oluwalana_99a8c3',
    method: 'POST',
    endpoint: '/api/v1/ledger/transfers',
    requestPayload: '{"from":"wallet_dynasty","to":"wallet_sandbox","amount":5000.00,"description":"Developer API double-entry trial"}',
    responsePayload: '{"transferId":"tx_dev_8812a84","status":"completed","reconciled":true}',
    statusCode: 200,
    tenantIsolationCheck: 'PASS_ENFORCED',
    timestamp: '2026-08-15T03:15:00Z'
  },
  {
    id: 'req_sand_03',
    apiKey: 'omni_dev_key_quantum_77c2a1',
    method: 'GET',
    endpoint: '/api/v1/ledger/balances?walletId=wallet_restricted_competitor_node',
    requestPayload: '{}',
    responsePayload: '{"error":"Forbidden","message":"Access denied: Requesting credentials does not match target tenant isolation bounds. Direct multi-tenant database cross-queries are blocked."}',
    statusCode: 403,
    tenantIsolationCheck: 'FAIL_RESTRICTED',
    timestamp: '2026-08-15T03:55:00Z'
  }
];

export const SEED_DEVELOPER_EARNING_LOGS: DeveloperEarningLog[] = [
  {
    id: 'earn_log_1',
    developerId: 'dev_oluwalana_tech',
    appId: 'mkt_app_double_entry_reconciler',
    tenantId: 'plat_learn_dynasty',
    amountGross: 89.00,
    amountFee: 17.80, // 20% commission
    amountNet: 71.20,
    referenceInvoiceId: 'inv_88a9c2',
    createdAt: '2026-07-15T00:01:00Z'
  },
  {
    id: 'earn_log_2',
    developerId: 'dev_oluwalana_tech',
    appId: 'mkt_app_double_entry_reconciler',
    tenantId: 'plat_learn_dynasty',
    amountGross: 89.00,
    amountFee: 17.80,
    amountNet: 71.20,
    referenceInvoiceId: 'inv_99b0c4',
    createdAt: '2026-08-15T00:01:00Z'
  },
  {
    id: 'earn_log_3',
    developerId: 'dev_african_textiles',
    appId: 'mkt_app_decentralized_invoice_connector',
    tenantId: 'plat_soko_oluwalana',
    amountGross: 199.00,
    amountFee: 29.85, // 15% commission
    amountNet: 169.15,
    referenceInvoiceId: 'inv_77a2f1',
    createdAt: '2026-08-12T14:40:00Z'
  }
];
