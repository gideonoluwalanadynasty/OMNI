import {
  DeveloperApplication,
  DeveloperApiKey,
  WebhookSubscription,
  WebhookDeliveryLog,
  EmbeddedBaaSBlueprint,
  DeveloperApiRouteSpec
} from '../types/finance_os';

export const SEED_DEVELOPER_APPLICATIONS: DeveloperApplication[] = [
  {
    id: 'app_nexus_market',
    name: 'Nexus B2B Global Marketplace',
    appCode: 'NEXUS-MKT-01',
    tenantId: 'tnt_corp_omni_tech',
    organizationName: 'Nexus Global Commerce Inc.',
    environment: 'production',
    clientId: 'omni_client_nexus_891024',
    clientSecret: 'omni_sec_live_981a04918274019284719028',
    webhookUrl: 'https://api.nexusmarket.io/v1/omni-webhooks',
    webhookSecret: 'whsec_891240182409182049182049',
    scopes: ['wallets:read', 'wallets:write', 'payments:create', 'transfers:execute', 'settlements:read'],
    ipAllowlist: ['142.250.190.46', '35.204.18.99'],
    rateLimitPerMinute: 2000,
    monthlyTransactedVolumeUsd: 14850000,
    status: 'active',
    createdAt: '2026-05-10T08:00:00Z'
  },
  {
    id: 'app_gig_creator',
    name: 'Pulse Creator Instant Payouts',
    appCode: 'PULSE-GIG-02',
    tenantId: 'tnt_corp_omni_tech',
    organizationName: 'Pulse Media Labs Ltd',
    environment: 'production',
    clientId: 'omni_client_pulse_772109',
    clientSecret: 'omni_sec_live_771920481029471902847102',
    webhookUrl: 'https://pulse.fm/api/omni-callback',
    webhookSecret: 'whsec_772109481029481720491827',
    scopes: ['wallets:write', 'payments:create', 'transfers:execute'],
    ipAllowlist: ['52.14.89.210'],
    rateLimitPerMinute: 1200,
    monthlyTransactedVolumeUsd: 4210000,
    status: 'active',
    createdAt: '2026-06-14T11:30:00Z'
  },
  {
    id: 'app_edupay_demo',
    name: 'EduPay Campus Tuition Gateway',
    appCode: 'EDUPAY-EDU-03',
    tenantId: 'tnt_personal_default',
    organizationName: 'EduPay Global Systems',
    environment: 'sandbox',
    clientId: 'omni_client_edupay_test_001',
    clientSecret: 'omni_sec_test_339104819204810294817204',
    webhookUrl: 'https://sandbox.edupay.org/hooks/omni',
    webhookSecret: 'whsec_test_901248102948172049182740',
    scopes: ['invoices:create', 'payments:create', 'wallets:read'],
    ipAllowlist: ['0.0.0.0/0'],
    rateLimitPerMinute: 300,
    monthlyTransactedVolumeUsd: 124000,
    status: 'active',
    createdAt: '2026-08-01T15:00:00Z'
  }
];

export const SEED_DEVELOPER_API_KEYS: DeveloperApiKey[] = [
  {
    id: 'key_live_01',
    appId: 'app_nexus_market',
    name: 'Nexus Production Primary Server Key',
    keyPrefix: 'omni_live_sec',
    tokenMasked: 'omni_live_sec_8f92************************41a0',
    environment: 'production',
    scopes: ['wallets:*', 'payments:*', 'transfers:*', 'fx:*'],
    rateLimitPerMin: 2000,
    lastUsedAt: '2026-08-18T01:54:12Z',
    createdAt: '2026-05-10T08:15:00Z',
    status: 'active'
  },
  {
    id: 'key_live_02',
    appId: 'app_nexus_market',
    name: 'Nexus Client-Side Publishable Key',
    keyPrefix: 'omni_pub',
    tokenMasked: 'omni_pub_live_44b1************************89ec',
    environment: 'production',
    scopes: ['payments:elements_checkout'],
    rateLimitPerMin: 5000,
    lastUsedAt: '2026-08-18T02:05:00Z',
    createdAt: '2026-05-10T08:20:00Z',
    status: 'active'
  },
  {
    id: 'key_test_01',
    appId: 'app_edupay_demo',
    name: 'EduPay Sandbox Secret Key',
    keyPrefix: 'omni_test_sec',
    tokenMasked: 'omni_test_sec_3391************************7204',
    environment: 'sandbox',
    scopes: ['*'],
    rateLimitPerMin: 300,
    lastUsedAt: '2026-08-17T22:10:00Z',
    createdAt: '2026-08-01T15:05:00Z',
    status: 'active'
  }
];

export const SEED_WEBHOOK_SUBSCRIPTIONS: WebhookSubscription[] = [
  {
    id: 'wh_sub_01',
    appId: 'app_nexus_market',
    url: 'https://api.nexusmarket.io/v1/omni-webhooks',
    signingSecret: 'whsec_891240182409182049182049',
    subscribedEvents: [
      'payment.completed',
      'payment.failed',
      'transfer.completed',
      'settlement.completed',
      'wallet.updated'
    ],
    status: 'active',
    deliverySuccessRate: 99.88,
    totalDeliveries: 142850,
    retryStrategy: 'exponential_backoff_4x'
  },
  {
    id: 'wh_sub_02',
    appId: 'app_gig_creator',
    url: 'https://pulse.fm/api/omni-callback',
    signingSecret: 'whsec_772109481029481720491827',
    subscribedEvents: ['transfer.completed', 'wallet.updated', 'kyc.verified'],
    status: 'active',
    deliverySuccessRate: 99.95,
    totalDeliveries: 84120,
    retryStrategy: 'exponential_backoff_4x'
  }
];

export const SEED_WEBHOOK_DELIVERY_LOGS: WebhookDeliveryLog[] = [
  {
    id: 'wh_log_01',
    subscriptionId: 'wh_sub_01',
    eventType: 'payment.completed',
    endpointUrl: 'https://api.nexusmarket.io/v1/omni-webhooks',
    httpStatus: 200,
    status: 'delivered',
    attemptNumber: 1,
    payloadSummary: '{"event": "payment.completed", "payment_id": "pay_901824", "amount": 14500.00, "currency": "USD"}',
    signatureHeader: 't=1755481200,v1=9f82104810294817204918274019284710491827',
    durationMs: 78,
    timestamp: '2026-08-18T01:45:00Z',
    responseBody: '{"received": true, "status": "processed"}'
  },
  {
    id: 'wh_log_02',
    subscriptionId: 'wh_sub_01',
    eventType: 'settlement.completed',
    endpointUrl: 'https://api.nexusmarket.io/v1/omni-webhooks',
    httpStatus: 200,
    status: 'delivered',
    attemptNumber: 1,
    payloadSummary: '{"event": "settlement.completed", "batch_id": "SET-2026-0818", "payout_amount": 428000.00, "currency": "EUR"}',
    signatureHeader: 't=1755481230,v1=33a8190284719028471049182740192847102948',
    durationMs: 92,
    timestamp: '2026-08-18T01:50:30Z',
    responseBody: '{"received": true, "ack": "ok"}'
  },
  {
    id: 'wh_log_03',
    subscriptionId: 'wh_sub_02',
    eventType: 'transfer.completed',
    endpointUrl: 'https://pulse.fm/api/omni-callback',
    httpStatus: 200,
    status: 'delivered',
    attemptNumber: 1,
    payloadSummary: '{"event": "transfer.completed", "transfer_id": "trf_creator_8921", "amount": 840.00, "creator_id": "usr_c_910"}',
    signatureHeader: 't=1755481300,v1=a1b2c3d4e5f60718293847561029384756102938',
    durationMs: 64,
    timestamp: '2026-08-18T01:55:00Z',
    responseBody: '{"status": "credited"}'
  }
];

export const SEED_BAAS_BLUEPRINTS: EmbeddedBaaSBlueprint[] = [
  {
    id: 'bp_marketplace',
    title: 'Two-Sided Marketplace & Split Escrow Engine',
    category: 'marketplace_escrow',
    description: 'Allow buyers to pay with card or instant ACH/SEPA while holding funds in programmed escrow until seller fulfillment. Automatically split marketplace take-rate commission and release seller balance.',
    businessModel: 'Platform Commission (1-5%) + Transaction Processing Fee',
    walletArchitecture: 'Buyer Escrow Wallet -> OMNI Settlement Pool -> Seller Dedicated Virtual IBAN Wallet',
    flowSteps: [
      'Buyer initiates checkout on marketplace app',
      'OMNI Payment Intent created with split_instructions payload',
      'Funds locked in programmatic Escrow Vault',
      'Carrier tracking API verifies delivery confirmation',
      'OMNI auto-executes transfer.release with 90% to Seller & 10% platform fee'
    ],
    recommendedApis: ['/api/v1/payments/intents', '/api/v1/wallets/escrow', '/api/v1/transfers/split'],
    samplePayloadJson: `{
  "amount": 2500.00,
  "currency": "USD",
  "payment_method": "card_token_90124",
  "split_rules": [
    {
      "destination_wallet_id": "wlt_merchant_furniture_01",
      "amount": 2250.00,
      "release_trigger": "shipment.delivered"
    },
    {
      "destination_wallet_id": "wlt_platform_take_rate",
      "amount": 250.00,
      "release_trigger": "instant"
    }
  ]
}`,
    sampleResponseJson: `{
  "intent_id": "pi_split_90812498",
  "status": "escrow_held",
  "amount_gross": 2500.00,
  "currency": "USD",
  "escrow_vault_id": "esc_991204918",
  "created_at": "2026-08-18T02:00:00Z"
}`
  },
  {
    id: 'bp_corporate_expense',
    title: 'Corporate Employee Expense & Instant Card Issuance',
    category: 'employee_corporate',
    description: 'Issue virtual and physical expense cards to thousands of employees with merchant category restrictions (MCC), daily spend limits, and auto-reconciliation directly to accounting ledger.',
    businessModel: 'Interchange Margin Share (1.2% - 1.75%) + SaaS Fee per Active Card',
    walletArchitecture: 'Parent Corporate Treasury Account -> Sub-Allocated Department & Employee Wallets',
    flowSteps: [
      'HR/Finance onboards employee via API',
      'Create sub-wallet with $1,500 monthly budget envelope',
      'Issue Visa/Mastercard virtual card with Apple Pay / Google Pay provisioning token',
      'Real-time webhook authorization check evaluates MCC (e.g. Travel & Dining only)',
      'Transaction auto-clears against company general ledger'
    ],
    recommendedApis: ['/api/v1/wallets/sub', '/api/v1/cards/virtual/issue', '/api/v1/cards/controls'],
    samplePayloadJson: `{
  "employee_id": "emp_sarah_084",
  "card_type": "virtual",
  "currency": "USD",
  "monthly_limit": 1500.00,
  "mcc_allowlist": ["5812", "5814", "3000", "4111"],
  "parent_wallet_id": "wlt_corp_treasury_01"
}`,
    sampleResponseJson: `{
  "card_id": "crd_virt_90148",
  "masked_pan": "4000 1234 5678 9912",
  "exp_month": 8,
  "exp_year": 2029,
  "status": "active",
  "provisioning_payload": "token_applepay_j9812409..."
}`
  },
  {
    id: 'bp_creator_gig',
    title: 'Creator & Gig Economy Instant Micro-Payouts',
    category: 'creator_gig',
    description: 'Empower livestreamers, gig couriers, and freelance creators to cash out streaming earnings in real-time 24/7/365 via FedNow, SEPA Instant, Pix, or Visa Direct.',
    businessModel: 'Instant Payout Fee ($0.50 - $1.50 per transfer) + FX Conversion Margin',
    walletArchitecture: 'Creator Staging Balance -> Instant Rail Dispatcher -> Local Bank / Debit Card',
    flowSteps: [
      'Creator finishes stream with $450 in tips and ad revenue',
      'Platform invokes /api/v1/transfers/instant_payout',
      'OMNI routes via optimal rail (FedNow in US, Faster Payments in UK)',
      'Creator receives funds in bank account in under 4 seconds'
    ],
    recommendedApis: ['/api/v1/transfers/instant_payout', '/api/v1/customers/kyc_status'],
    samplePayloadJson: `{
  "creator_wallet_id": "wlt_creator_stream_44",
  "destination_type": "bank_account",
  "routing_network": "fednow_instant",
  "amount": 450.00,
  "currency": "USD",
  "memo": "Pulse Creator Earnings Cashout"
}`,
    sampleResponseJson: `{
  "payout_id": "po_inst_881920",
  "rail": "FEDNOW",
  "status": "settled",
  "clearing_latency_ms": 1420,
  "timestamp": "2026-08-18T02:04:12Z"
}`
  },
  {
    id: 'bp_school_tuition',
    title: 'School & University Tuition Billing System',
    category: 'education_tuition',
    description: 'Multi-term semester tuition plans, automated parent direct debit scheduling, scholarship credit allocations, and automated receipts.',
    businessModel: 'Per-Student Semester Fee + Low ACH Interchange',
    walletArchitecture: 'Campus Bursar Master Wallet -> Student Semester Ledger Sub-accounts',
    flowSteps: [
      'University registers semester tuition invoice ($12,500)',
      'Parent accepts 4-part installment plan via portal',
      'OMNI automatically debits ACH / SEPA direct debit on 1st of each month',
      'Student receives real-time clearance token for course registration'
    ],
    recommendedApis: ['/api/v1/invoices', '/api/v1/subscriptions/installments'],
    samplePayloadJson: `{
  "student_id": "STU-2026-9041",
  "bursar_wallet_id": "wlt_univ_tuition_main",
  "total_tuition": 12500.00,
  "currency": "USD",
  "installment_count": 4,
  "payer_email": "parent.davis@family-mail.com"
}`,
    sampleResponseJson: `{
  "schedule_id": "sch_tuition_9901",
  "status": "active",
  "monthly_installment": 3125.00,
  "next_debit_date": "2026-09-01"
}`
  }
];

export const SEED_API_ROUTE_SPECS: DeveloperApiRouteSpec[] = [
  {
    method: 'POST',
    path: '/api/v1/customers',
    resourceCategory: 'customers',
    summary: 'Create Customer Dossier',
    description: 'Registers an individual or business entity on OMNI BaaS with automated KYC/KYB screening.',
    requiredScopes: ['customers:write'],
    requestBodySample: `{
  "name": "Sarah Jenkins",
  "email": "sarah.j@enterprise.io",
  "type": "individual",
  "nationality": "US",
  "tax_id": "998-12-4410"
}`,
    responseSample: `{
  "customer_id": "cus_901824981",
  "status": "kyc_pending",
  "created_at": "2026-08-18T02:00:00Z"
}`
  },
  {
    method: 'POST',
    path: '/api/v1/wallets',
    resourceCategory: 'wallets',
    summary: 'Provision Multi-Currency Wallet',
    description: 'Generates a dedicated ledger wallet with support for USD, EUR, GBP, JPY, and SGD balances.',
    requiredScopes: ['wallets:write'],
    requestBodySample: `{
  "customer_id": "cus_901824981",
  "currencies": ["USD", "EUR", "GBP"],
  "label": "Primary Operational Wallet"
}`,
    responseSample: `{
  "wallet_id": "wlt_990148102",
  "customer_id": "cus_901824981",
  "balances": {
    "USD": 0.00,
    "EUR": 0.00,
    "GBP": 0.00
  },
  "virtual_iban": "DE89 3704 0044 0532 0130 00"
}`
  },
  {
    method: 'POST',
    path: '/api/v1/payments/charges',
    resourceCategory: 'payments',
    summary: 'Initiate Direct Payment Charge',
    description: 'Executes a multi-rail charge across Card, FedNow, SEPA Instant, or Apple Pay.',
    requiredScopes: ['payments:write'],
    requestBodySample: `{
  "amount": 150.00,
  "currency": "USD",
  "destination_wallet_id": "wlt_merchant_main",
  "source_token": "tok_visa_4242",
  "idempotency_key": "idem_891024_01"
}`,
    responseSample: `{
  "payment_id": "pay_9081249",
  "status": "succeeded",
  "amount": 150.00,
  "fee_usd": 2.45,
  "net_usd": 147.55,
  "settled_at": "2026-08-18T02:01:10Z"
}`
  },
  {
    method: 'POST',
    path: '/api/v1/transfers',
    resourceCategory: 'transfers',
    summary: 'Execute Wallet or Payout Transfer',
    description: 'Transfers funds between OMNI wallets instantly (0ms latency) or routes to external banking rails.',
    requiredScopes: ['transfers:execute'],
    requestBodySample: `{
  "source_wallet_id": "wlt_990148102",
  "destination_type": "wallet",
  "destination_id": "wlt_merchant_furniture_01",
  "amount": 500.00,
  "currency": "USD"
}`,
    responseSample: `{
  "transfer_id": "trf_89124018",
  "status": "completed",
  "clearing_time_ms": 42,
  "source_balance_after": 4500.00
}`
  },
  {
    method: 'POST',
    path: '/api/v1/invoices',
    resourceCategory: 'invoices',
    summary: 'Create Smart Invoice',
    description: 'Generates an interactive multi-rail invoice with automated factoring and auto-reconciliation.',
    requiredScopes: ['invoices:write'],
    requestBodySample: `{
  "customer_id": "cus_901824981",
  "total_amount": 45000.00,
  "currency": "USD",
  "due_date": "2026-09-30",
  "line_items": [
    { "description": "Cloud Sovereign Infrastructure SLA", "qty": 1, "unit_price": 45000.00 }
  ]
}`,
    responseSample: `{
  "invoice_id": "INV-2026-9042",
  "payment_url": "https://pay.omni.finance/inv/INV-2026-9042",
  "status": "issued"
}`
  },
  {
    method: 'POST',
    path: '/api/v1/fx/quotes',
    resourceCategory: 'fx',
    summary: 'Lock Real-Time FX Rate',
    description: 'Provides a 60-second guaranteed spot FX rate lock across 12 major currency pairs.',
    requiredScopes: ['fx:quote'],
    requestBodySample: `{
  "sell_currency": "USD",
  "buy_currency": "EUR",
  "sell_amount": 100000.00
}`,
    responseSample: `{
  "quote_id": "qte_fx_90148",
  "rate": 0.9214,
  "buy_amount": 92140.00,
  "expires_in_seconds": 60
}`
  }
];
