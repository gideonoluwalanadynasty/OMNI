import {
  FinanceAiAgent,
  PersonalFinanceMemoryItem,
  PersonalFinanceMemorySettings,
  CfoAiReport,
  ComplianceAiCaseSummary,
  ReconciliationMatchItem,
  FraudIntelligenceAlert,
  FinancialResearchBrief,
  FinanceKnowledgeDocument,
  FinanceAiUsageMetric,
  FinanceAiSuperAdminSettings,
  FinanceAiChatMessage
} from '../types/finance_os';

export const SEED_FINANCE_AI_AGENTS: FinanceAiAgent[] = [
  {
    id: 'agent_pers_01',
    name: 'OMNI Personal Finance AI',
    code: 'personal_finance',
    title: 'Personal Financial Assistant',
    description: 'Analyzes personal spending patterns, explains transactions, tracks savings milestones, detects recurring subscriptions, and provides tailored financial education.',
    targetAudience: 'Individuals, Families, Freelancers',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'Spending trend & anomaly breakdown',
      'Plain-language transaction explanations',
      'Automated expense categorisation',
      'Dynamic budget envelope generation',
      'Savings goal milestones & runway',
      'Subscription audit & cancellation advice',
      'Personal finance memory storage'
    ],
    forbiddenActions: [
      'Autonomous money movement',
      'Independent loan or credit issuance',
      'Automatic modification of bank account balance',
      'Executing bank transfers without user confirmation'
    ],
    supportedContexts: ['Personal Accounts', 'Credit & Debit Cards', 'Vaults', 'Savings Goals', 'Personal Receipts'],
    totalRequestsHandled: 48920,
    avgLatencyMs: 420,
    accuracyRating: 99.6,
    isAutonomousExecutionBlocked: true,
    lastActive: 'Just now',
    version: 'v3.4.2-flash'
  },
  {
    id: 'agent_cfo_01',
    name: 'OMNI CFO AI',
    code: 'cfo',
    title: 'AI Chief Financial Officer',
    description: 'Delivers executive financial intelligence, P&L variance analysis, rolling cash flow forecasts, unit economics, margin optimization, and board-level management packs.',
    targetAudience: 'CEOs, CFOs, Board Directors, Finance Directors',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'Consolidated P&L & EBITDA breakdown',
      'Rolling 13-week & 12-month cash runway',
      'Customer receivables aging & DSO analytics',
      'Supplier AP obligations & DPO optimization',
      'Department-level budget vs actual variance',
      'Executive board commentary synthesis',
      'Scenario stress-testing & sensitivity modeling'
    ],
    forbiddenActions: [
      'Autonomous payment batch dispatch',
      'Direct general ledger record overrides',
      'Unilateral budget reallocation',
      'Bypassing organizational RBAC boundaries'
    ],
    supportedContexts: ['General Ledger', 'Invoices', 'Payroll Batches', 'Department Budgets', 'Vendor Contracts'],
    totalRequestsHandled: 27410,
    avgLatencyMs: 580,
    accuracyRating: 99.8,
    isAutonomousExecutionBlocked: true,
    lastActive: '2m ago',
    version: 'v3.8.0-enterprise'
  },
  {
    id: 'agent_tre_01',
    name: 'OMNI Treasury AI',
    code: 'treasury',
    title: 'Enterprise Treasury Intelligence',
    description: 'Surveils multi-currency cash pools, calculates Value-at-Risk (VaR), formulates FX hedging recommendations, and optimizes intercompany multilateral netting.',
    targetAudience: 'Group Treasurers, Cash Managers, FX Traders',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'Multi-entity cash concentration & ZBA analysis',
      '1-Day & 10-Day Parametric VaR (95% & 99%)',
      'FX spot & forward hedging recommendations',
      'Multilateral netting matrix calculation',
      'Yield harvesting across overnight repo & T-bills',
      'Payment rail cost & latency routing advisory'
    ],
    forbiddenActions: [
      'Executing unilateral FX swap trades',
      'Direct initiation of intercompany wire transfers',
      'Altering entity credit facility limits',
      'Disabling counterparty exposure limits'
    ],
    supportedContexts: ['Treasury Pools', 'FX Rate Feeds', 'Intercompany Balances', 'Bank Clearing Rails'],
    totalRequestsHandled: 19840,
    avgLatencyMs: 510,
    accuracyRating: 99.9,
    isAutonomousExecutionBlocked: true,
    lastActive: '4m ago',
    version: 'v2.9.1-pro'
  },
  {
    id: 'agent_cmp_01',
    name: 'OMNI Compliance AI',
    code: 'compliance',
    title: 'Regulatory & AML Compliance Assistant',
    description: 'Assists compliance analysts with KYC/KYB document verification, sanctions & PEP triage, SAR narrative drafting, and regulatory citation mapping.',
    targetAudience: 'MLROs, Compliance Officers, Legal Counsel',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'KYC/KYB dossier analysis & verification gap checks',
      'Sanctions, PEP & adverse media screening triage',
      'Suspicious Activity Report (SAR) narrative drafting',
      'Cross-border transaction pattern explanation',
      'Regulatory compliance citation mapping (FATF, FinCEN, FCA)'
    ],
    forbiddenActions: [
      'Unilateral approval of KYC/KYB verification',
      'Automatic clearing of sanctions or PEP flags',
      'Autonomous closure of AML investigations',
      'Modifying regulatory audit logs'
    ],
    supportedContexts: ['Identity Documents', 'Entity Registrations', 'Watchlist Hits', 'Audit Logs'],
    totalRequestsHandled: 14230,
    avgLatencyMs: 640,
    accuracyRating: 99.95,
    isAutonomousExecutionBlocked: true,
    lastActive: '1m ago',
    version: 'v4.1.0-gov'
  },
  {
    id: 'agent_rec_01',
    name: 'OMNI Reconciliation AI',
    code: 'reconciliation',
    title: 'Automated Ledger Reconciliation',
    description: 'Matches external bank statements, clearing settlement reports, and merchant processor files against internal double-entry general ledger postings.',
    targetAudience: 'Financial Controllers, Staff Accountants, Auditors',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'Multi-source statement parsing & fuzzy matching',
      'Unmatched bank vs ledger exception clustering',
      'Timing difference & float detection',
      'Duplicate charge and fee variance identification',
      'Suggested adjustment journal drafting'
    ],
    forbiddenActions: [
      'Posting unapproved balancing ledger journals',
      'Overriding transaction settlement timestamps',
      'Force-clearing audit reconciliation breaks',
      'Deleting historical ledger entries'
    ],
    supportedContexts: ['Bank Statements', 'Payment Processor Settlement CSVs', 'General Ledger Journal Entries'],
    totalRequestsHandled: 32180,
    avgLatencyMs: 460,
    accuracyRating: 99.7,
    isAutonomousExecutionBlocked: true,
    lastActive: 'Just now',
    version: 'v3.1.2-ledger'
  },
  {
    id: 'agent_frd_01',
    name: 'OMNI Fraud Intelligence AI',
    code: 'fraud_intelligence',
    title: 'Fraud Detection & Velocity Intelligence',
    description: 'Identifies behavioral anomalies, high-velocity transfer bursts, credential stuff attempts, and coordinated syndicate attack patterns.',
    targetAudience: 'Fraud Analysts, Risk Operations, Security Ops',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'Real-time transaction risk score computation (0-100)',
      'Device fingerprint, IP proxy & geofencing analysis',
      'Velocity burst and micro-structuring detection',
      'Account takeover & credential stuffing pattern flags',
      'Explainable AI risk factor breakdowns'
    ],
    forbiddenActions: [
      'Arbitrary account blocking without configured deterministic rule triggers',
      'Confiscating user balances',
      'Disabling multi-factor authentication requirements',
      'Suppression of fraud audit logs'
    ],
    supportedContexts: ['Payment Stream', 'Device Telemetry', 'Login History', 'Counterparty Reputations'],
    totalRequestsHandled: 64800,
    avgLatencyMs: 310,
    accuracyRating: 99.85,
    isAutonomousExecutionBlocked: true,
    lastActive: 'Just now',
    version: 'v5.0.1-sentinel'
  },
  {
    id: 'agent_res_01',
    name: 'OMNI Financial Research AI',
    code: 'financial_research',
    title: 'Macro & Capital Markets Research',
    description: 'Synthesizes central bank interest rate trajectories, macroeconomic indicators, sovereign yield curves, regulatory mandates (Basel IV, MiCA), and sector benchmarks.',
    targetAudience: 'Chief Economists, Investment Committees, Strategy Teams',
    status: 'active',
    model: 'gemini-3.7-flash',
    capabilities: [
      'Fed / ECB / BoE monetary policy rate trajectory analysis',
      'Global liquidity & SOFR/Euribor spread tracking',
      'Regulatory developments (MiCA, FedNow, ISO 20022)',
      'SaaS & Fintech valuation & margin benchmarking',
      'Commodity & foreign exchange thematic outlooks'
    ],
    forbiddenActions: [
      'Independent execution of asset investment orders',
      'Guaranteed return promises or speculative endorsements',
      'Unchecked dissemination of non-public confidential metrics',
      'Altering risk rating weights'
    ],
    supportedContexts: ['Macroeconomic Datasets', 'Central Bank Minutes', 'Industry Benchmark Reports', 'Yield Curves'],
    totalRequestsHandled: 11950,
    avgLatencyMs: 720,
    accuracyRating: 99.2,
    isAutonomousExecutionBlocked: true,
    lastActive: '12m ago',
    version: 'v2.2.0-research'
  }
];

export const SEED_PERSONAL_FINANCE_MEMORIES: PersonalFinanceMemoryItem[] = [
  {
    id: 'mem_01',
    userId: 'usr_sarah_01',
    category: 'savings_target',
    key: 'Home Down Payment Goal',
    value: 'Targeting $150,000 for residential real estate down payment by Dec 2027.',
    confidence: 0.98,
    lastUpdated: '2026-08-14T10:15:00Z',
    isUserEditable: true,
    isAutoLearned: false,
    isArchived: false
  },
  {
    id: 'mem_02',
    userId: 'usr_sarah_01',
    category: 'budget_style',
    key: 'Budget Allocation Framework',
    value: 'Prefers 50/30/20 budget breakdown (50% Needs, 30% Wants, 20% High-Yield Savings).',
    confidence: 0.95,
    lastUpdated: '2026-08-10T14:30:00Z',
    isUserEditable: true,
    isAutoLearned: true,
    isArchived: false
  },
  {
    id: 'mem_03',
    userId: 'usr_sarah_01',
    category: 'spending_preference',
    key: 'Subscription Audit Frequency',
    value: 'Flag monthly SaaS/streaming recurring charges exceeding $40 individually.',
    confidence: 0.92,
    lastUpdated: '2026-08-05T09:00:00Z',
    isUserEditable: true,
    isAutoLearned: false,
    isArchived: false
  },
  {
    id: 'mem_04',
    userId: 'usr_sarah_01',
    category: 'preferred_currency',
    key: 'Base Display Currency',
    value: 'Primary functional display currency is USD; secondary is EUR for European travel.',
    confidence: 0.99,
    lastUpdated: '2026-08-01T11:20:00Z',
    isUserEditable: true,
    isAutoLearned: false,
    isArchived: false
  },
  {
    id: 'mem_05',
    userId: 'usr_sarah_01',
    category: 'custom_note',
    key: 'Tax Optimization Reminder',
    value: 'Max out annual IRA / 401(k) contributions before November 30 tax planning review.',
    confidence: 0.94,
    lastUpdated: '2026-07-28T16:45:00Z',
    isUserEditable: true,
    isAutoLearned: false,
    isArchived: false
  }
];

export const SEED_PERSONAL_MEMORY_SETTINGS: PersonalFinanceMemorySettings = {
  userId: 'usr_sarah_01',
  isMemoryEnabled: true,
  allowAutoLearning: true,
  retentionDays: 365,
  shareAcrossFamilyGroup: false,
  redactPiiOnStorage: true
};

export const SEED_CFO_AI_REPORTS: CfoAiReport[] = [
  {
    id: 'cfo_rep_01',
    reportType: 'executive_summary',
    title: 'Q3 2026 Executive Financial Performance & Liquidity Summary',
    period: 'Q3 2026 (Year-to-Date)',
    targetAudience: 'ceo',
    scopeLevel: 'group_wide',
    kpis: [
      { name: 'Consolidated Revenue', value: '$8,420,000', delta: '+18.4% QoQ', status: 'positive' },
      { name: 'Gross Profit Margin', value: '78.2%', delta: '+2.1% bps', status: 'positive' },
      { name: 'Operating Net Burn', value: '$312,000/mo', delta: '-12.0% efficiency', status: 'positive' },
      { name: 'Cash & Liquid T-Bills', value: '$18,450,000', delta: '44 Months Runway', status: 'positive' },
      { name: 'Days Sales Outstanding (DSO)', value: '34.2 Days', delta: '-4.1 Days improved', status: 'positive' }
    ],
    aiExecutiveCommentary: 'Group financial velocity remains exceptionally robust. Gross margin expanded to 78.2% driven by automation efficiencies in OMNI Commerce settlement. The 44-month liquidity runway affords total sovereign stability against macro interest rate fluctuations. Recommended focus: redeploy $3.5M idle bank checking into the 5.48% sovereign yield pool.',
    strategicRecommendations: [
      'Automate instant invoice factoring drawdowns for receivables aging past 30 days.',
      'Lock in 90-day EUR/USD forward hedges for €1.2M European vendor obligations.',
      'Optimize intercompany netting settlement scheduled for August 31st to compress cross-border FX costs.'
    ],
    citedDataSources: ['General Ledger (GL-1000 to GL-5000)', 'FedNow Settlement Stream', 'Omni Invoicing Registry'],
    generatedAt: '2026-08-17T08:30:00Z'
  },
  {
    id: 'cfo_rep_02',
    reportType: 'board_commentary',
    title: 'Board of Directors Quarterly Treasury & Capital Allocation Briefing',
    period: 'Q2/Q3 2026 Consolidated',
    targetAudience: 'board',
    scopeLevel: 'group_wide',
    kpis: [
      { name: 'Annual Recurring Revenue (ARR)', value: '$33,680,000', delta: '+26.8% YoY', status: 'positive' },
      { name: 'Rule of 40 Score', value: '54.6%', delta: 'Top Decile', status: 'positive' },
      { name: 'Intercompany Netting Volume', value: '$5,250,000', delta: '65% Netting Compression', status: 'positive' }
    ],
    aiExecutiveCommentary: 'All subsidiaries (US, UK, Germany, Singapore) are operating in full compliance with Basel III capital ratios and OECD transfer pricing arms-length guidelines. Unleveraged balance sheet provides strategic flexibility for opportunistic M&A or BaaS expansion.',
    strategicRecommendations: [
      'Maintain conservative $15M minimum cash liquidity buffer.',
      'Expand white-label BaaS program across MENA region to increase high-margin float interchange.'
    ],
    citedDataSources: ['Treasury Concentration Pools', 'Consolidated Balance Sheet', 'Tax Compliance Records'],
    generatedAt: '2026-08-15T14:00:00Z'
  }
];

export const SEED_COMPLIANCE_AI_CASES: ComplianceAiCaseSummary[] = [
  {
    id: 'cmp_case_01',
    caseNumber: 'KYB-2026-0891',
    entityName: 'Vanguard Quantum Logistics Ltd (UK)',
    jurisdiction: 'United Kingdom (Companies House #12849102)',
    riskTier: 'medium',
    caseType: 'kyb_onboarding',
    executiveSummary: 'Enterprise KYB application submitted for corporate treasury account. Ultimate Beneficial Owners (UBOs) identified at 42% and 38% equity stakes. Automated PEP & Sanctions screening returned negative hits. Certificate of Incorporation and Articles of Association verified.',
    missingDocuments: ['Proof of Operating Address (Utility bill under 90 days old for Director B)'],
    suspiciousIndicators: ['None detected; clean corporate registry history since 2021.'],
    suggestedQuestions: [
      'Request updated UK bank statement or council tax bill for Beneficial Owner B.',
      'Confirm expected cross-border corridor volume (projected >$500k/mo to Singapore branch).'
    ],
    regulatoryCitations: ['UK Money Laundering Regulations 2017 (Reg 28 - Customer Due Diligence)', 'JMLSG Guidance Part I'],
    status: 'pending_user_docs',
    isAdvisoryOnly: true,
    reviewedTimestamp: '2026-08-17T09:45:00Z'
  },
  {
    id: 'cmp_case_02',
    caseNumber: 'SAR-2026-0043',
    entityName: 'Apex Trade Dynamics GmbH',
    jurisdiction: 'Germany (Handelsregister HRB 99412)',
    riskTier: 'high',
    caseType: 'sar_investigation',
    executiveSummary: 'Alert triggered by rapid succession of 7 round-dollar incoming transfers ($49,500 each) structured just below the $50,000 threshold within 48 hours, followed by immediate outbound SEPA Instant conversion to EUR.',
    missingDocuments: ['Source of Funds contracts for 3 counterparty remitting accounts in Cyprus'],
    suspiciousIndicators: [
      'Structuring pattern below mandatory threshold reporting trigger',
      'Rapid velocity outflow within 12 minutes of deposit settlement'
    ],
    suggestedQuestions: [
      'Request commercial trade invoices corresponding to payments #TX-8921 to #TX-8927.',
      'Validate legitimacy of Cypriot shipping escrow agent.'
    ],
    regulatoryCitations: ['EU 5th Anti-Money Laundering Directive (5AMLD)', 'German GwG § 43 Reporting Obligation'],
    status: 'escalated_to_mlro',
    isAdvisoryOnly: true,
    reviewedTimestamp: '2026-08-16T18:20:00Z'
  }
];

export const SEED_RECONCILIATION_MATCHES: ReconciliationMatchItem[] = [
  {
    id: 'rec_m_01',
    batchId: 'REC-BATCH-2026-08-17',
    bankRecord: {
      date: '2026-08-17',
      amount: 450000,
      currency: 'USD',
      description: 'FEDNOW INCOMING WIRE / REF: ACH-INV-842-AEGIS',
      reference: 'FEDNOW-90142890',
      bankAccount: 'JPMorgan Chase Operating (*4910)'
    },
    ledgerRecord: {
      journalId: 'JE-2026-0842',
      accountCode: '1010-CASH-OPERATING',
      accountName: 'Operating Cash Checking',
      amount: 450000,
      description: 'Customer payment received for Invoice #INV-2026-0842 Aegis Defence',
      date: '2026-08-17'
    },
    matchConfidence: 99.8,
    matchStatus: 'exact_match',
    aiRationale: 'Exact match on payment amount ($450,000.00), date (2026-08-17), and invoice reference string matching sub-ledger posting.',
    suggestedAdjustment: 'Auto-reconciliation approved. Zero variance.',
    requiresHumanApproval: true,
    approvedBy: 'Financial Controller (Automated Queue)',
    appliedAt: '2026-08-17T09:00:00Z'
  },
  {
    id: 'rec_m_02',
    batchId: 'REC-BATCH-2026-08-17',
    bankRecord: {
      date: '2026-08-16',
      amount: 14850.25,
      currency: 'EUR',
      description: 'STRIPE PAYOUT EUR / REF: PO-891480-EU',
      reference: 'STRIPE-PO-891480',
      bankAccount: 'Deutsche Bank Frankfurt EUR (*1840)'
    },
    ledgerRecord: {
      journalId: 'JE-2026-0839',
      accountCode: '1020-MERCHANT-CLEARING',
      accountName: 'Stripe Clearing Account',
      amount: 15000.00,
      description: 'Gross European marketplace sales batch',
      date: '2026-08-16'
    },
    matchConfidence: 96.4,
    matchStatus: 'probable_match',
    aiRationale: 'Variance of €149.75 matches exactly 1.0% merchant processing fee minus interchange fee. Net settlement formula reconciles 100%.',
    suggestedAdjustment: 'Post credit of €149.75 to GL #5020 (Merchant Processing Fees) and debit GL #1020 (Clearing Buffer).',
    requiresHumanApproval: true
  },
  {
    id: 'rec_m_03',
    batchId: 'REC-BATCH-2026-08-17',
    bankRecord: {
      date: '2026-08-15',
      amount: 8200.00,
      currency: 'USD',
      description: 'INCOMING WIRE / UNKNOWN SENDER OMAHA TECH LLC',
      reference: 'WIRE-US-99182',
      bankAccount: 'JPMorgan Chase Operating (*4910)'
    },
    matchConfidence: 34.0,
    matchStatus: 'unmatched_bank',
    aiRationale: 'No open accounts receivable invoice or counterparty contract matching "Omaha Tech LLC" in billing sub-ledger.',
    suggestedAdjustment: 'Hold in GL #2090 (Unearned / Unidentified Customer Deposits) pending accounts receivable verification.',
    requiresHumanApproval: true
  }
];

export const SEED_FRAUD_ALERTS: FraudIntelligenceAlert[] = [
  {
    id: 'frd_alt_01',
    transactionId: 'TX-SEC-90814',
    userId: 'usr_corp_apex_01',
    amount: 185000,
    currency: 'USD',
    riskScore: 78,
    riskLevel: 'high',
    anomalyFactors: [
      { factor: 'Unusual IP Geolocation', riskWeight: 35, description: 'Login originating from Tor exit node in Seychelles; habitual access is London UK.' },
      { factor: 'Off-Hours Velocity', riskWeight: 25, description: 'Wire instruction created at 03:14 AM local entity time without prior business schedule.' },
      { factor: 'New Beneficiary Routing', riskWeight: 18, description: 'Beneficiary bank account in Panama created under 15 minutes prior to transfer dispatch.' }
    ],
    deviceSignals: {
      ipLocation: 'Victoria, Seychelles (Tor Node)',
      isVpnOrProxy: true,
      deviceFingerprintMatch: false,
      velocityAlert: true
    },
    behavioralPattern: 'High-confidence Account Takeover (ATO) indicator. Deviates 4.2 sigma from established user transaction baseline.',
    investigationSummary: 'Transfer held in pending escrow state by deterministic risk rule #FRD-POL-04. Requires out-of-band biometric or SMS OTP confirmation before release.',
    recommendedMitigation: 'Freeze outgoing wire, invalidate current session tokens, prompt mandatory hardware FIDO2 key step-up challenge.',
    humanDecision: 'pending',
    ruleEnforced: 'RULE-HIGH-RISK-HOLD-04',
    detectedAt: '2026-08-17T03:15:22Z'
  },
  {
    id: 'frd_alt_02',
    transactionId: 'TX-SEC-89102',
    userId: 'usr_sarah_01',
    amount: 42.50,
    currency: 'USD',
    riskScore: 12,
    riskLevel: 'low',
    anomalyFactors: [
      { factor: 'Merchant Category', riskWeight: 8, description: 'Digital media purchase from verified vendor Spotify AB.' },
      { factor: 'Habitual Device', riskWeight: 4, description: 'Known iPhone 16 Pro device fingerprint matched.' }
    ],
    deviceSignals: {
      ipLocation: 'New York, USA (Verizon Fios)',
      isVpnOrProxy: false,
      deviceFingerprintMatch: true,
      velocityAlert: false
    },
    behavioralPattern: 'Standard recurring subscription billing pattern.',
    investigationSummary: 'Zero risk indicators. Normal expected monthly recurring transaction.',
    recommendedMitigation: 'Allow without friction.',
    humanDecision: 'cleared',
    detectedAt: '2026-08-16T12:00:00Z'
  }
];

export const SEED_FINANCIAL_RESEARCH_BRIEFS: FinancialResearchBrief[] = [
  {
    id: 'res_brf_01',
    title: 'Global Central Bank Monetary Policy & Yield Curve Divergence',
    category: 'macro_rates',
    summary: 'Analysis of Federal Reserve, European Central Bank, and Bank of England rate paths for 2026-2027. Market pricing indicates 50 bps Fed cuts while ECB holds neutral corridor.',
    implicationsForOmni: 'Maintains elevated 5.25%-5.50% yield opportunities on US Treasury repo facilities while suggesting advantageous EUR borrowing rates for EU operations.',
    keyForecasts: [
      { horizon: '30 Days', projection: 'Fed Funds: 5.25% - 5.50%', confidence: '94%' },
      { horizon: '90 Days', projection: 'EUR/USD Spot: 1.0950 (+0.8%)', confidence: '82%' },
      { horizon: '180 Days', projection: 'SOFR Yield: 4.90% - 5.15%', confidence: '78%' }
    ],
    sourceCitations: ['Federal Reserve FOMC Minutes', 'ECB Monetary Policy Statement', 'Bloomberg Terminal SOFR Futures'],
    publishedAt: '2026-08-16T08:00:00Z'
  },
  {
    id: 'res_brf_02',
    title: 'European Union MiCA & Instant Payments Mandate Compliance',
    category: 'regulatory_framework',
    summary: 'Full implementation of EU Regulation 2024/886 mandating 10-second SEPA Instant availability 24/7 without surcharges for all PSPs and BaaS institutions.',
    implicationsForOmni: 'OMNI SEPA TIPS connector satisfies all latency and fee parity requirements natively. German and UK subsidiaries fully compliant.',
    keyForecasts: [
      { horizon: 'Immediate', projection: '100% SEPA Instant Parity Active', confidence: '99%' },
      { horizon: '2027', projection: 'Digital Euro Rulebook Alignment', confidence: '85%' }
    ],
    sourceCitations: ['Official Journal of the European Union L_202400886', 'European Payments Council (EPC) Rulebook'],
    publishedAt: '2026-08-10T11:30:00Z'
  }
];

export const SEED_KNOWLEDGE_DOCUMENTS: FinanceKnowledgeDocument[] = [
  {
    id: 'doc_k_01',
    title: 'OMNI Sovereign Group Treasury Policy & Investment Mandate 2026',
    docType: 'treasury_charter',
    entityId: 'ent_us_parent',
    entityName: 'OMNI Sovereign Tech Inc. (US)',
    departmentScope: ['Treasury', 'Executive', 'Board'],
    confidentiality: 'confidential',
    indexedChunks: 48,
    lastIndexedAt: '2026-08-15T10:00:00Z',
    extractedSummary: 'Defines permissible cash equivalents (US Treasuries, Reverse Repo, AAA-rated commercial paper), counterparty limits (<$10M single institution), and 4-Eyes governance requirements.',
    fileSizeBytes: 2450000
  },
  {
    id: 'doc_k_02',
    title: 'OECD Transfer Pricing Documentation & Intercompany Master Agreement',
    docType: 'tax_policy',
    entityId: 'ent_uk_sub',
    entityName: 'OMNI Payments UK Ltd',
    departmentScope: ['Tax', 'Legal', 'Finance'],
    confidentiality: 'restricted',
    indexedChunks: 72,
    lastIndexedAt: '2026-08-12T14:20:00Z',
    extractedSummary: 'Sets arm-length management chargebacks at Cost + 6.5% and software IP royalty licensing at 4.2% of gross European marketplace GMV.',
    fileSizeBytes: 3820000
  },
  {
    id: 'doc_k_03',
    title: 'Customer Master Services Agreement — Aegis Defence Systems (#INV-842)',
    docType: 'invoice',
    entityId: 'ent_us_parent',
    entityName: 'OMNI Sovereign Tech Inc. (US)',
    departmentScope: ['Sales', 'Accounts Receivable'],
    confidentiality: 'internal',
    indexedChunks: 16,
    lastIndexedAt: '2026-08-16T09:00:00Z',
    extractedSummary: 'Invoice for $450,000 with Net-30 payment terms and 1.5% late interest clause. Eligible for instant factoring advance under OMNI Capital credit facility.',
    fileSizeBytes: 890000
  }
];

export const SEED_AI_USAGE_METRICS: FinanceAiUsageMetric[] = [
  {
    id: 'usg_01',
    timestamp: '2026-08-17T09:42:10Z',
    agentType: 'personal_finance',
    agentName: 'OMNI Personal Finance AI',
    tenantId: 'tnt_personal_default',
    actorRole: 'Individual Account Owner',
    promptTokens: 840,
    completionTokens: 290,
    estimatedCostUsd: 0.00042,
    latencyMs: 380,
    dataSourcesQueried: ['Personal Wallet Balances', 'Transaction History', 'Personal Memory Store'],
    guardrailsTriggered: ['PII_REDACTION_APPLIED'],
    safetyStatus: 'passed'
  },
  {
    id: 'usg_02',
    timestamp: '2026-08-17T09:35:40Z',
    agentType: 'cfo',
    agentName: 'OMNI CFO AI',
    tenantId: 'tnt_corp_omni_tech',
    actorRole: 'Group CFO',
    promptTokens: 2480,
    completionTokens: 810,
    estimatedCostUsd: 0.00185,
    latencyMs: 620,
    dataSourcesQueried: ['General Ledger Postings', 'Invoices Registry', 'Payroll Batches'],
    guardrailsTriggered: ['ADVISORY_DISCLAIMER_ATTACHED', 'ROLE_RBAC_CHECK_PASSED'],
    safetyStatus: 'passed'
  },
  {
    id: 'usg_03',
    timestamp: '2026-08-17T09:20:15Z',
    agentType: 'treasury',
    agentName: 'OMNI Treasury AI',
    tenantId: 'tnt_corp_omni_tech',
    actorRole: 'Treasury Analyst',
    promptTokens: 1920,
    completionTokens: 540,
    estimatedCostUsd: 0.00124,
    latencyMs: 510,
    dataSourcesQueried: ['FX Spot Feeds', 'Subsidiary Cash Pools', 'Intercompany Balances'],
    guardrailsTriggered: ['AUTONOMOUS_TRANSFER_BLOCKED_NOTICE'],
    safetyStatus: 'passed'
  },
  {
    id: 'usg_04',
    timestamp: '2026-08-17T09:12:00Z',
    agentType: 'fraud_intelligence',
    agentName: 'OMNI Fraud Intelligence AI',
    tenantId: 'tnt_corp_omni_tech',
    actorRole: 'Risk Operations Lead',
    promptTokens: 1450,
    completionTokens: 410,
    estimatedCostUsd: 0.00095,
    latencyMs: 310,
    dataSourcesQueried: ['Device Telemetry', 'IP Proxy Database', 'Payment Stream'],
    guardrailsTriggered: ['DETERMINISTIC_RULE_ENFORCEMENT'],
    safetyStatus: 'passed'
  }
];

export const SEED_SUPER_ADMIN_AI_SETTINGS: FinanceAiSuperAdminSettings = {
  globalAiEnabled: true,
  defaultModel: 'gemini-3.7-flash',
  strictGuardrailEnforcement: true,
  piiRedaction: true,
  prohibitAutonomousFundMovement: true,
  monthlyTokenBudget: 50000000,
  currentMonthSpendUsd: 14.82,
  agentsConfig: {
    personal_finance: { enabled: true, maxTokens: 4096, model: 'gemini-3.7-flash', rateLimitPerMin: 120 },
    cfo: { enabled: true, maxTokens: 8192, model: 'gemini-3.7-flash', rateLimitPerMin: 60 },
    treasury: { enabled: true, maxTokens: 8192, model: 'gemini-3.7-flash', rateLimitPerMin: 60 },
    compliance: { enabled: true, maxTokens: 8192, model: 'gemini-3.7-flash', rateLimitPerMin: 60 },
    reconciliation: { enabled: true, maxTokens: 8192, model: 'gemini-3.7-flash', rateLimitPerMin: 90 },
    fraud_intelligence: { enabled: true, maxTokens: 4096, model: 'gemini-3.7-flash', rateLimitPerMin: 180 },
    financial_research: { enabled: true, maxTokens: 8192, model: 'gemini-3.7-flash', rateLimitPerMin: 60 }
  }
};

export const INITIAL_AI_CHAT_MESSAGES: FinanceAiChatMessage[] = [
  {
    id: 'chat_msg_01',
    sender: 'ai',
    agentType: 'personal_finance',
    agentName: 'OMNI Personal Finance AI',
    text: 'Hello! I am OMNI Personal Finance AI. I can analyze your spending patterns, explain recent card charges, track your savings goals, and help you budget safely. What financial insight would you like to explore today?',
    timestamp: '09:00 AM',
    suggestedFollowUps: [
      'Why did I spend more this month?',
      'Show my recurring subscriptions',
      'How close am I to my $150k down payment goal?',
      'Create a 50/30/20 budget envelope'
    ]
  }
];
