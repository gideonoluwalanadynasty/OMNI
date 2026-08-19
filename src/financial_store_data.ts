import { DoubleEntryLedgerEntry, OmniWallet, PaymentIntegration, BillableProduct, SubscriptionRecord, InvoiceRecord, PayoutRecord, ReconciliationLog } from './types';

// Helper to generate IDs
const uuid = (prefix: string) => prefix + '_' + Math.random().toString(36).substring(2, 11);

export const SEED_DOUBLE_ENTRY: DoubleEntryLedgerEntry[] = [
  {
    id: 'tx_de_001',
    timestamp: '2026-08-10T10:00:00Z',
    debitAccount: 'platform_reserve',
    creditAccount: 'merchant_tenant_dynasty_99',
    debitType: 'platform',
    creditType: 'merchants',
    amount: 5000000.00,
    currency: 'USD',
    description: 'Initial Capital Inject of Dynasty Global Holdings Operating Reserve',
    referenceId: 'ref_tx_901124',
    verificationHash: 'sha256_8f293b1239cd394b9f2c7a911e',
    status: 'completed',
    isReconciled: true
  },
  {
    id: 'tx_de_002',
    timestamp: '2026-08-11T14:30:00Z',
    debitAccount: 'merchant_tenant_dynasty_99',
    creditAccount: 'platform_revenue',
    debitType: 'merchants',
    creditType: 'platform',
    amount: 500000.00,
    currency: 'USD',
    description: 'Decentralized wholesale supply logistics acquisition fee',
    referenceId: 'ref_tx_841249',
    verificationHash: 'sha256_7a3d90218bc194de83a71b2d01',
    status: 'completed',
    isReconciled: true
  },
  {
    id: 'tx_de_003',
    timestamp: '2026-08-12T11:15:00Z',
    debitAccount: 'platform_reserve',
    creditAccount: 'tenant_oluwalana_12',
    debitType: 'platform',
    creditType: 'tenants',
    amount: 125000.00,
    currency: 'USD',
    description: 'Cloud storage allocation infrastructure development grant',
    referenceId: 'ref_tx_309121',
    verificationHash: 'sha256_3b01a2c918ee9f110bc8d91012',
    status: 'completed',
    isReconciled: true
  },
  {
    id: 'tx_de_004',
    timestamp: '2026-08-14T09:12:00Z',
    debitAccount: 'merchant_tenant_dynasty_99',
    creditAccount: 'platform_revenue',
    debitType: 'merchants',
    creditType: 'platform',
    amount: 15450.00,
    currency: 'USD',
    description: 'OMNI Ads AI Campaign bidding allocation batch settle',
    referenceId: 'ref_tx_712034',
    verificationHash: 'sha256_9c2d1098bfe13028ee82da103c',
    status: 'completed',
    isReconciled: true
  },
  {
    id: 'tx_de_005',
    timestamp: '2026-08-14T23:55:00Z',
    debitAccount: 'platform_revenue',
    creditAccount: 'affiliate_gideon_partner',
    debitType: 'platform',
    creditType: 'affiliates',
    amount: 246000.00,
    currency: 'USD',
    description: 'Affiliate commission payouts for Q2 corporate white-label referrals',
    referenceId: 'ref_tx_412033',
    verificationHash: 'sha256_cd83b9c2018ea1b02de9d18fae',
    status: 'completed',
    isReconciled: true
  },
  {
    id: 'tx_de_006',
    timestamp: '2026-08-15T00:01:00Z',
    debitAccount: 'merchant_tenant_dynasty_99',
    creditAccount: 'platform_revenue',
    debitType: 'merchants',
    creditType: 'platform',
    amount: 4500.00,
    currency: 'USD',
    description: 'OMNI Business Enterprise recurring license subscription fee',
    referenceId: 'ref_tx_512001',
    verificationHash: 'sha256_5a1aefbcde8271810cbf83e201',
    status: 'completed',
    isReconciled: true
  },
  {
    id: 'tx_de_007',
    timestamp: '2026-08-15T02:10:00Z',
    debitAccount: 'promotional_credits_reserve',
    creditAccount: 'tenant_oluwalana_12',
    debitType: 'promotional credits',
    creditType: 'tenants',
    amount: 500.00,
    currency: 'USD',
    description: 'OMNI AI OS Developer trial promotional credits voucher',
    referenceId: 'ref_credits_88201',
    verificationHash: 'sha256_8d2f10b284ea93010bcef82d33',
    status: 'completed',
    isReconciled: true
  }
];

export const SEED_WALLETS: OmniWallet[] = [
  {
    id: 'wallet_dynasty',
    tenantId: 'tenant_dynasty_99',
    availableBalance: 4280050.00,
    pendingBalance: 24500.00,
    affiliateEarnings: 15400.00,
    resellerEarnings: 0.00,
    refundsTotal: 10500.00,
    creditsBalance: 5000.00, // Platform credits separate
    rewardsBalance: 1250.00,
    withdrawalsTotal: 120000.00,
    currency: 'USD'
  },
  {
    id: 'wallet_sandbox',
    tenantId: 'tenant_oluwalana_12',
    availableBalance: 125000.00,
    pendingBalance: 1500.00,
    affiliateEarnings: 4500.00,
    resellerEarnings: 8200.00,
    refundsTotal: 0.00,
    creditsBalance: 1250.00, // Separated platform credits
    rewardsBalance: 250.00,
    withdrawalsTotal: 5000.00,
    currency: 'USD'
  }
];

export const SEED_PAYMENT_INTEGRATIONS: PaymentIntegration[] = [
  {
    id: 'pay_int_stripe',
    tenantId: 'tenant_dynasty_99',
    provider: 'stripe',
    label: 'Stripe Gateway (Production Core)',
    apiKeySimulated: 'sk_live_51M3b82••••••••••••••••f12',
    isEnabled: true,
    countries: ['US', 'GB', 'CA', 'EU'],
    currencies: ['USD', 'GBP', 'EUR', 'CAD'],
    transactionTypes: ['one-time', 'subscription', 'usage']
  },
  {
    id: 'pay_int_paypal',
    tenantId: 'tenant_dynasty_99',
    provider: 'paypal',
    label: 'PayPal Express Wallet Gateway',
    apiKeySimulated: 'client_id_live_p••••••••••••••••e1a',
    isEnabled: true,
    countries: ['US', 'CA', 'AU', 'EU'],
    currencies: ['USD', 'EUR', 'AUD'],
    transactionTypes: ['one-time', 'subscription']
  },
  {
    id: 'pay_int_paystack',
    tenantId: 'tenant_dynasty_99',
    provider: 'paystack',
    label: 'Paystack Gateway (West Africa Ingress)',
    apiKeySimulated: 'sk_live_paystack••••••••••••••••09a',
    isEnabled: true,
    countries: ['NG', 'GH', 'ZA', 'KE'],
    currencies: ['NGN', 'GHS', 'ZAR', 'KES'],
    transactionTypes: ['one-time', 'subscription', 'usage', 'payout']
  },
  {
    id: 'pay_int_flutterwave',
    tenantId: 'tenant_dynasty_99',
    provider: 'flutterwave',
    label: 'Flutterwave Gateway (Pan-African Cards)',
    apiKeySimulated: 'sk_live_flw••••••••••••••••e8a',
    isEnabled: false,
    countries: ['NG', 'KE', 'ZA', 'GH', 'UG'],
    currencies: ['NGN', 'KES', 'ZAR', 'UGX', 'USD'],
    transactionTypes: ['one-time', 'payout']
  },
  {
    id: 'pay_int_mobile_money',
    tenantId: 'tenant_dynasty_99',
    provider: 'mobile_money',
    label: 'M-Pesa / MTN MoMo API Hub',
    apiKeySimulated: 'momo_api_key_v1_••••••••••••••••33b',
    isEnabled: true,
    countries: ['KE', 'UG', 'GH', 'NG'],
    currencies: ['KES', 'UGX', 'GHS'],
    transactionTypes: ['one-time', 'payout']
  },
  {
    id: 'pay_int_bank_transfer',
    tenantId: 'tenant_dynasty_99',
    provider: 'bank_transfer',
    label: 'Direct Bank Wire Adapter (SWIFT/ACH)',
    apiKeySimulated: 'bank_wire_router_key_••••••••••••••••ef4',
    isEnabled: true,
    countries: ['US', 'EU', 'GB', 'NG'],
    currencies: ['USD', 'EUR', 'GBP', 'NGN'],
    transactionTypes: ['one-time', 'payout']
  }
];

export const SEED_BILLABLE_PRODUCTS: BillableProduct[] = [
  {
    id: 'prod_family_pro',
    name: 'OMNI Family Pro',
    slug: 'omni-family-pro',
    description: 'Shared personal family core state, secure passkeys, and up to 5 individual members.',
    basePriceMonthly: 15.00,
    basePriceAnnual: 144.00,
    entitlements: ['passport.family_sharing', 'storage.allocated_50gb', 'pay.p2p_fees_zero']
  },
  {
    id: 'prod_ads_business',
    name: 'OMNI Ads Business',
    slug: 'omni-ads-business',
    description: 'Advanced contextual AI target audience modeling, multi-channel bidding, and reporting API.',
    basePriceMonthly: 150.00,
    basePriceAnnual: 1440.00,
    entitlements: ['ads.ai_optimization', 'ads.unlimited_campaigns', 'ads.custom_pixel_events']
  },
  {
    id: 'prod_browser_premium',
    name: 'OMNI Browser Premium',
    slug: 'omni-browser-premium',
    description: 'Decentralized sandboxed remote web execution, zero-logs proxy, and premium cloud node routing.',
    basePriceMonthly: 29.00,
    basePriceAnnual: 278.00,
    entitlements: ['browser.unlimited_sandboxes', 'browser.residential_proxies', 'browser.multi_profile_sync']
  },
  {
    id: 'prod_business_enterprise',
    name: 'OMNI Business Enterprise',
    slug: 'omni-business-enterprise',
    description: 'Corporate workspace with multi-tenant subdomains, advanced AI OS agent autonomy, and automated accounting.',
    basePriceMonthly: 4500.00,
    basePriceAnnual: 43200.00,
    entitlements: ['admin.full_control', 'ai_os.autonomy_level_5', 'finance.unlimited_ledgers', 'webhooks.unlimited']
  }
];

export const SEED_SUBSCRIPTIONS: SubscriptionRecord[] = [
  {
    id: 'sub_dyn_01',
    tenantId: 'tenant_dynasty_99',
    productId: 'prod_business_enterprise',
    productName: 'OMNI Business Enterprise',
    status: 'active',
    billingCycle: 'monthly',
    price: 4500.00,
    startDate: '2026-01-05T00:00:00Z',
    endDate: '2026-09-05T00:00:00Z',
    cancelAtPeriodEnd: false,
    couponApplied: 'ENTERPRISE_LOYALTY_50',
    discountPercentage: 10,
    seatsCount: 42,
    metricsUsed: {
      apiCalls: 1250440,
      storageGb: 4850,
      aiTokens: 84905100,
      adClicks: 52140
    }
  },
  {
    id: 'sub_olu_01',
    tenantId: 'tenant_oluwalana_12',
    productId: 'prod_browser_premium',
    productName: 'OMNI Browser Premium',
    status: 'trial',
    billingCycle: 'monthly',
    price: 29.00,
    startDate: '2026-08-10T12:00:00Z',
    endDate: '2026-09-10T12:00:00Z',
    trialEndDate: '2026-08-25T12:00:00Z',
    cancelAtPeriodEnd: false,
    seatsCount: 3,
    metricsUsed: {
      apiCalls: 2450,
      storageGb: 12,
      aiTokens: 125000,
      adClicks: 0
    }
  }
];

export const SEED_INVOICES: InvoiceRecord[] = [
  {
    id: 'inv_dyn_1001',
    tenantId: 'tenant_dynasty_99',
    invoiceNumber: 'INV-2026-001',
    type: 'invoice',
    status: 'paid',
    amount: 4500.00,
    taxAmount: 360.00,
    subtotal: 4140.00,
    discountAmount: 0.00,
    currency: 'USD',
    dueDate: '2026-08-15T00:00:00Z',
    issuedDate: '2026-08-01T00:00:00Z',
    billingEmail: 'accounts@dynastyholdings.com',
    items: [
      { description: 'OMNI Business Enterprise License Fee', quantity: 1, unitPrice: 4140.00, amount: 4140.00 }
    ],
    taxJurisdiction: 'US_CA_VAT_SIM',
    taxRate: 8.7
  },
  {
    id: 'rcp_dyn_1001',
    tenantId: 'tenant_dynasty_99',
    invoiceNumber: 'RCP-2026-001',
    type: 'receipt',
    status: 'paid',
    amount: 4500.00,
    taxAmount: 360.00,
    subtotal: 4140.00,
    discountAmount: 0.00,
    currency: 'USD',
    dueDate: '2026-08-15T00:00:00Z',
    issuedDate: '2026-08-15T00:01:00Z',
    billingEmail: 'accounts@dynastyholdings.com',
    items: [
      { description: 'OMNI Business Enterprise License Fee - Receipt for Settle', quantity: 1, unitPrice: 4140.00, amount: 4140.00 }
    ],
    taxJurisdiction: 'US_CA_VAT_SIM',
    taxRate: 8.7
  },
  {
    id: 'inv_dyn_1002',
    tenantId: 'tenant_dynasty_99',
    invoiceNumber: 'INV-2026-002',
    type: 'invoice',
    status: 'unpaid',
    amount: 15450.00,
    taxAmount: 1236.00,
    subtotal: 14214.00,
    discountAmount: 0.00,
    currency: 'USD',
    dueDate: '2026-08-30T00:00:00Z',
    issuedDate: '2026-08-15T09:00:00Z',
    billingEmail: 'billing@dynastyholdings.com',
    items: [
      { description: 'AI Ad Campaigns bidding deployment usage fee', quantity: 1, unitPrice: 14214.00, amount: 14214.00 }
    ],
    taxJurisdiction: 'US_NY_SALES_TAX_SIM',
    taxRate: 8.875
  },
  {
    id: 'cn_dyn_1001',
    tenantId: 'tenant_dynasty_99',
    invoiceNumber: 'CN-2026-001',
    type: 'credit_note',
    status: 'paid',
    amount: 1200.00,
    taxAmount: 96.00,
    subtotal: 1104.00,
    discountAmount: 0.00,
    currency: 'USD',
    dueDate: '2026-08-15T00:00:00Z',
    issuedDate: '2026-08-14T12:00:00Z',
    billingEmail: 'accounts@dynastyholdings.com',
    items: [
      { description: 'Rebate credit for previous routing outage', quantity: 1, unitPrice: 1104.00, amount: 1104.00 }
    ],
    taxJurisdiction: 'US_CA_VAT_SIM',
    taxRate: 8.7
  }
];

export const SEED_PAYOUTS: PayoutRecord[] = [
  {
    id: 'pay_out_001',
    recipientId: 'reseller_oluwalana_12',
    recipientType: 'reseller',
    recipientName: 'Oluwalana Technologies LLC',
    amount: 2500.00,
    currency: 'USD',
    status: 'completed',
    isVerified: true,
    riskReviewScore: 12,
    payoutMethod: 'Bank Wire transfer',
    timestamp: '2026-08-01T15:00:00Z',
    reference: 'ref_payout_bank_wire_78a101b'
  },
  {
    id: 'pay_out_002',
    recipientId: 'affiliate_gideon_partner',
    recipientType: 'affiliate',
    recipientName: 'Gideon Partner Affiliate Network',
    amount: 15400.00,
    currency: 'USD',
    status: 'on_hold',
    holdReason: 'High Volume Risk Hold - Dynamic Review Required',
    isVerified: true,
    riskReviewScore: 68,
    payoutMethod: 'Stripe Connect balance settle',
    timestamp: '2026-08-14T23:58:00Z',
    reference: 'ref_payout_stripe_connect_9a1102e'
  },
  {
    id: 'pay_out_003',
    recipientId: 'creator_dynasty_team',
    recipientType: 'creator',
    recipientName: 'Dynasty Creative Content Network',
    amount: 450.00,
    currency: 'USD',
    status: 'pending',
    isVerified: false,
    riskReviewScore: 41,
    payoutMethod: 'PayPal Transfer P2P',
    timestamp: '2026-08-15T01:30:00Z',
    reference: 'ref_payout_paypal_88b109e'
  }
];

export const SEED_RECONCILIATION_LOGS: ReconciliationLog[] = [
  {
    id: 'recon_log_001',
    timestamp: '2026-08-14T23:59:00Z',
    checkedRecordsCount: 18,
    unbalancedEntriesCount: 0,
    discrepanciesDetected: [],
    status: 'balanced',
    details: 'Double-entry cryptographic signature integrity verify succeeded. Standard deviation: 0.00.'
  }
];
