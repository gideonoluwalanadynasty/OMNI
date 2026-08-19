import { 
  OmniAiPlanConfig,
  OmniUsageUnitRate,
  OmniUsageConsumptionLog,
  OmniAiBudgetStructure,
  OmniMarketplaceItem,
  OmniMarketplaceInstallation,
  OmniMarketplaceDeveloperPayout,
  OmniAiWhiteLabelConfig,
  OmniAffiliateProgramConfig,
  OmniResellerHierarchy,
  OmniReconciliationTestResult
} from './types';

// ===========================================================================
// 1. CONFIGURABLE OMNI AI PLANS ARCHITECTURE
// ===========================================================================

export const SEED_OMNI_AI_PLANS: OmniAiPlanConfig[] = [
  {
    id: 'plan_free',
    tier: 'free',
    name: 'Free Starter',
    badge: 'Community',
    description: 'Explore the sovereign intelligence gateway with essential daily access and standard foundation models.',
    basePriceMonthlyUsd: 0,
    basePriceAnnualMonthlyUsd: 0,
    isCustomPricing: false,
    limits: {
      requestsPerDay: 50,
      monthlyTokens: 250000,
      concurrentExecutions: 1,
      maxContextWindow: 32000,
      rateLimitRpm: 15
    },
    allowedModels: ['gemini-2.5-flash', 'local_ollama'],
    allowedAgentCount: 1,
    maxAgentAutonomy: 1,
    storageGb: 0.5,
    deepResearchQueriesPerMonth: 2,
    mediaCreditsPerMonth: {
      imageGenerations: 10,
      videoSeconds: 0,
      ttsCharacters: 25000,
      voiceMinutes: 5
    },
    codeSandboxMinutesPerMonth: 30,
    teamSeatsIncluded: 1,
    maxSeats: 1,
    perAdditionalSeatUsd: 0,
    apiAccessTier: 'none',
    whiteLabelEligible: false,
    byokEligible: false,
    byomEligible: false,
    slaGuaranteePercent: 99.0,
    dedicatedSupport: false
  },
  {
    id: 'plan_plus',
    tier: 'plus',
    name: 'Plus Professional',
    badge: 'Individual',
    description: 'High-speed reasoning, expanded context windows, multimodal generation, and dedicated RAG vector storage for power users.',
    basePriceMonthlyUsd: 20,
    basePriceAnnualMonthlyUsd: 16,
    isCustomPricing: false,
    limits: {
      requestsPerDay: 500,
      monthlyTokens: 2500000,
      concurrentExecutions: 3,
      maxContextWindow: 200000,
      rateLimitRpm: 60
    },
    allowedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-4o-mini', 'deepseek-r1', 'local_ollama'],
    allowedAgentCount: 5,
    maxAgentAutonomy: 2,
    storageGb: 5,
    deepResearchQueriesPerMonth: 25,
    mediaCreditsPerMonth: {
      imageGenerations: 150,
      videoSeconds: 60,
      ttsCharacters: 200000,
      voiceMinutes: 60
    },
    codeSandboxMinutesPerMonth: 300,
    teamSeatsIncluded: 1,
    maxSeats: 3,
    perAdditionalSeatUsd: 15,
    apiAccessTier: 'standard',
    whiteLabelEligible: false,
    byokEligible: true,
    byomEligible: false,
    slaGuaranteePercent: 99.5,
    dedicatedSupport: false
  },
  {
    id: 'plan_pro',
    tier: 'pro',
    name: 'Pro Sovereign',
    badge: 'Most Popular',
    description: 'Autonomous multi-agent workflows, deep research passes, unlimited consensus panels, and BYOK capabilities.',
    basePriceMonthlyUsd: 49,
    basePriceAnnualMonthlyUsd: 39,
    isCustomPricing: false,
    isPopular: true,
    limits: {
      requestsPerDay: 2000,
      monthlyTokens: 10000000,
      concurrentExecutions: 8,
      maxContextWindow: 1000000,
      rateLimitRpm: 180
    },
    allowedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-4o', 'claude-3-5-sonnet', 'deepseek-r1', 'llama-3.3-70b', 'local_ollama'],
    allowedAgentCount: 20,
    maxAgentAutonomy: 3,
    storageGb: 25,
    deepResearchQueriesPerMonth: 100,
    mediaCreditsPerMonth: {
      imageGenerations: 500,
      videoSeconds: 300,
      ttsCharacters: 1000000,
      voiceMinutes: 300
    },
    codeSandboxMinutesPerMonth: 1200,
    teamSeatsIncluded: 3,
    maxSeats: 10,
    perAdditionalSeatUsd: 25,
    apiAccessTier: 'standard',
    whiteLabelEligible: false,
    byokEligible: true,
    byomEligible: false,
    slaGuaranteePercent: 99.9,
    dedicatedSupport: true
  },
  {
    id: 'plan_business',
    tier: 'business',
    name: 'Business Team',
    badge: 'Scale',
    description: 'Shared team workspaces, departmental AI agents, granular governance, audit trails, and multi-tenant ledger settlement.',
    basePriceMonthlyUsd: 199,
    basePriceAnnualMonthlyUsd: 159,
    isCustomPricing: false,
    limits: {
      requestsPerDay: 10000,
      monthlyTokens: 50000000,
      concurrentExecutions: 25,
      maxContextWindow: 2000000,
      rateLimitRpm: 600
    },
    allowedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-4o', 'gpt-4o-mini', 'claude-3-5-sonnet', 'deepseek-r1', 'llama-3.3-70b', 'omni_sovereign', 'local_ollama'],
    allowedAgentCount: 100,
    maxAgentAutonomy: 4,
    storageGb: 150,
    deepResearchQueriesPerMonth: 500,
    mediaCreditsPerMonth: {
      imageGenerations: 2500,
      videoSeconds: 1800,
      ttsCharacters: 5000000,
      voiceMinutes: 1500
    },
    codeSandboxMinutesPerMonth: 6000,
    teamSeatsIncluded: 10,
    maxSeats: 50,
    perAdditionalSeatUsd: 20,
    apiAccessTier: 'enterprise_high_throughput',
    whiteLabelEligible: true,
    byokEligible: true,
    byomEligible: true,
    slaGuaranteePercent: 99.95,
    dedicatedSupport: true
  },
  {
    id: 'plan_enterprise',
    tier: 'enterprise',
    name: 'Enterprise Sovereign',
    badge: 'Dedicated Enclave',
    description: 'Sovereign private cluster deployments, zero data retention agreements, custom BYOM private models, white-label branding, and 24/7 dedicated engineering SLA.',
    basePriceMonthlyUsd: 999,
    basePriceAnnualMonthlyUsd: 799,
    isCustomPricing: true,
    limits: {
      requestsPerDay: 100000,
      monthlyTokens: 500000000,
      concurrentExecutions: 100,
      maxContextWindow: 2000000,
      rateLimitRpm: 3000
    },
    allowedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-4o', 'claude-3-5-sonnet', 'deepseek-r1', 'llama-3.3-70b', 'enterprise_byom_vllm', 'omni_sovereign', 'local_ollama'],
    allowedAgentCount: 1000,
    maxAgentAutonomy: 5,
    storageGb: 2000,
    deepResearchQueriesPerMonth: 5000,
    mediaCreditsPerMonth: {
      imageGenerations: 25000,
      videoSeconds: 15000,
      ttsCharacters: 50000000,
      voiceMinutes: 10000
    },
    codeSandboxMinutesPerMonth: 60000,
    teamSeatsIncluded: 50,
    maxSeats: 500,
    perAdditionalSeatUsd: 18,
    apiAccessTier: 'enterprise_high_throughput',
    whiteLabelEligible: true,
    byokEligible: true,
    byomEligible: true,
    slaGuaranteePercent: 99.99,
    dedicatedSupport: true
  },
  {
    id: 'plan_pay_as_you_go',
    tier: 'pay_as_you_go',
    name: 'Pay As You Go',
    badge: 'Elastic Utility',
    description: 'Pure consumption billing with prepaid OMNI Compute Units (OCU). Zero upfront monthly commitment with real-time double-entry ledger debiting.',
    basePriceMonthlyUsd: 0,
    basePriceAnnualMonthlyUsd: 0,
    isCustomPricing: false,
    limits: {
      requestsPerDay: 25000,
      monthlyTokens: 100000000,
      concurrentExecutions: 20,
      maxContextWindow: 2000000,
      rateLimitRpm: 1000
    },
    allowedModels: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-4o', 'claude-3-5-sonnet', 'deepseek-r1', 'llama-3.3-70b', 'local_ollama'],
    allowedAgentCount: 50,
    maxAgentAutonomy: 3,
    storageGb: 50,
    deepResearchQueriesPerMonth: 200,
    mediaCreditsPerMonth: {
      imageGenerations: 1000,
      videoSeconds: 600,
      ttsCharacters: 2000000,
      voiceMinutes: 500
    },
    codeSandboxMinutesPerMonth: 2500,
    teamSeatsIncluded: 5,
    maxSeats: 100,
    perAdditionalSeatUsd: 5,
    apiAccessTier: 'enterprise_high_throughput',
    whiteLabelEligible: false,
    byokEligible: true,
    byomEligible: true,
    slaGuaranteePercent: 99.9,
    dedicatedSupport: false
  }
];

// ===========================================================================
// 2. USAGE UNITS / CREDITS METERING DIMENSIONS
// ===========================================================================

export const SEED_USAGE_DIMENSION_RATES: OmniUsageUnitRate[] = [
  {
    dimension: 'text_inference',
    name: 'Standard Text Inference',
    unitLabel: '1,000 Tokens',
    baseProviderCostUsd: 0.00015,
    infraCostUsd: 0.00003,
    configuredMarginPercent: 20,
    creditsPerUnit: 1,
    billableUsdPerUnit: 0.000216,
    description: 'Foundation model prompt and response token processing across Gemini, OpenAI, Claude, and Llama.'
  },
  {
    dimension: 'reasoning',
    name: 'Advanced Reasoning & Chain-of-Thought',
    unitLabel: '1,000 Reasoning Tokens',
    baseProviderCostUsd: 0.0018,
    infraCostUsd: 0.0003,
    configuredMarginPercent: 25,
    creditsPerUnit: 10,
    billableUsdPerUnit: 0.002625,
    description: 'Deep mathematical, algorithmic, and architectural problem solving with extended inference verification.'
  },
  {
    dimension: 'deep_research',
    name: 'Autonomous Deep Research Pass',
    unitLabel: '1 Multi-Pass Study Session',
    baseProviderCostUsd: 0.12,
    infraCostUsd: 0.04,
    configuredMarginPercent: 25,
    creditsPerUnit: 80,
    billableUsdPerUnit: 0.20,
    description: 'Recursive query decomposition, multi-source harvesting, cross-citation synthesis, and executive dossier compiling.'
  },
  {
    dimension: 'images',
    name: 'High-Fidelity Visual Generation',
    unitLabel: '1 Image Render (1024x1024 / 2K)',
    baseProviderCostUsd: 0.03,
    infraCostUsd: 0.008,
    configuredMarginPercent: 20,
    creditsPerUnit: 20,
    billableUsdPerUnit: 0.0456,
    description: 'Text-to-image synthesis, creative asset transformations, and photorealistic rendering.'
  },
  {
    dimension: 'video',
    name: 'Generative Video Rendering',
    unitLabel: '1 Second Rendered (1080p / 4K)',
    baseProviderCostUsd: 0.08,
    infraCostUsd: 0.02,
    configuredMarginPercent: 25,
    creditsPerUnit: 50,
    billableUsdPerUnit: 0.125,
    description: 'Async text-to-video, image-to-video animation, motion vector synthesis, and video transcoding.'
  },
  {
    dimension: 'audio',
    name: 'Neural Voice & Speech Processing',
    unitLabel: '1,000 Characters TTS / 1 Min Audio',
    baseProviderCostUsd: 0.015,
    infraCostUsd: 0.004,
    configuredMarginPercent: 20,
    creditsPerUnit: 8,
    billableUsdPerUnit: 0.0228,
    description: 'Multilingual neural text-to-speech, real-time voice streaming, and Whisper audio transcription.'
  },
  {
    dimension: 'agents',
    name: 'Autonomous Agent Task Execution',
    unitLabel: '1 Multi-Step Agent Execution Session',
    baseProviderCostUsd: 0.05,
    infraCostUsd: 0.015,
    configuredMarginPercent: 25,
    creditsPerUnit: 35,
    billableUsdPerUnit: 0.08125,
    description: 'Multi-tool orchestration, recursive sub-agent handoffs, validation checking, and automated state updates.'
  },
  {
    dimension: 'tool_execution',
    name: 'Sandboxed Tool & API Invocation',
    unitLabel: '1 Tool Call Gate',
    baseProviderCostUsd: 0.002,
    infraCostUsd: 0.001,
    configuredMarginPercent: 30,
    creditsPerUnit: 2,
    billableUsdPerUnit: 0.0039,
    description: 'Enclave-verified tool execution with idempotency checks, perimeter security, and schema validation.'
  },
  {
    dimension: 'storage',
    name: 'Vector Knowledge & Artifact Storage',
    unitLabel: '1 GB / Month',
    baseProviderCostUsd: 0.10,
    infraCostUsd: 0.05,
    configuredMarginPercent: 20,
    creditsPerUnit: 75,
    billableUsdPerUnit: 0.18,
    description: 'High-density vector embeddings, RAG chunk indexing, document snapshots, and multimedia artifact caches.'
  },
  {
    dimension: 'code_sandbox',
    name: 'Isolated Node / Python Sandbox Runtime',
    unitLabel: '1 Minute Compute (2 vCPU / 4GB RAM)',
    baseProviderCostUsd: 0.01,
    infraCostUsd: 0.004,
    configuredMarginPercent: 25,
    creditsPerUnit: 6,
    billableUsdPerUnit: 0.0175,
    description: 'Ephemeral container sandbox for automated script execution, test running, and code synthesis.'
  },
  {
    dimension: 'api_calls',
    name: 'OMNI Core AI Gateway REST/gRPC Requests',
    unitLabel: '1,000 API Requests',
    baseProviderCostUsd: 0.01,
    infraCostUsd: 0.005,
    configuredMarginPercent: 20,
    creditsPerUnit: 8,
    billableUsdPerUnit: 0.018,
    description: 'Programmatic external integration calls passing through tenant authentication, rate limits, and audit logs.'
  }
];

// ===========================================================================
// 3. SEED USAGE CONSUMPTION LOGS (DOUBLE-ENTRY RECONCILED)
// ===========================================================================

export const SEED_USAGE_CONSUMPTION_LOGS: OmniUsageConsumptionLog[] = [
  {
    id: 'use_log_001',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    userId: 'usr_gideon',
    userEmail: 'gideonoluwalanadynasty@gmail.com',
    dimension: 'deep_research',
    quantity: 1,
    rawProviderCostUsd: 0.12,
    infraCostUsd: 0.04,
    marginUsd: 0.04,
    totalBillableUsd: 0.20,
    creditsDeducted: 80,
    doubleEntryLedgerRefId: 'tx_de_004',
    metadata: { topic: 'Autonomous Multi-Tenant Financial Settlements', model: 'gemini-2.5-pro' },
    timestamp: '2026-08-15T08:30:00Z'
  },
  {
    id: 'use_log_002',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    userId: 'usr_gideon',
    userEmail: 'gideonoluwalanadynasty@gmail.com',
    dimension: 'text_inference',
    quantity: 45,
    rawProviderCostUsd: 0.00675,
    infraCostUsd: 0.00135,
    marginUsd: 0.00162,
    totalBillableUsd: 0.00972,
    creditsDeducted: 45,
    doubleEntryLedgerRefId: 'tx_de_006',
    metadata: { model: 'gemini-2.5-flash', tokensTotal: 45000 },
    timestamp: '2026-08-15T09:12:00Z'
  },
  {
    id: 'use_log_003',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    userId: 'usr_sarah',
    userEmail: 'sarah.cfo@dynastyholdings.com',
    dimension: 'agents',
    quantity: 3,
    rawProviderCostUsd: 0.15,
    infraCostUsd: 0.045,
    marginUsd: 0.04875,
    totalBillableUsd: 0.24375,
    creditsDeducted: 105,
    doubleEntryLedgerRefId: 'tx_de_007',
    metadata: { agentName: 'Autonomous Financial Auditor Pro', steps: 12 },
    timestamp: '2026-08-15T11:45:00Z'
  },
  {
    id: 'use_log_004',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    userId: 'usr_gideon',
    userEmail: 'gideonoluwalanadynasty@gmail.com',
    dimension: 'images',
    quantity: 4,
    rawProviderCostUsd: 0.12,
    infraCostUsd: 0.032,
    marginUsd: 0.0304,
    totalBillableUsd: 0.1824,
    creditsDeducted: 80,
    doubleEntryLedgerRefId: 'tx_de_008',
    metadata: { model: 'imagen-3', prompt: 'Sovereign Ledger Node Infrastructure Blueprint' },
    timestamp: '2026-08-15T14:20:00Z'
  },
  {
    id: 'use_log_005',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    userId: 'usr_dev_alex',
    userEmail: 'alex.lead@dynastyholdings.com',
    dimension: 'code_sandbox',
    quantity: 18,
    rawProviderCostUsd: 0.18,
    infraCostUsd: 0.072,
    marginUsd: 0.063,
    totalBillableUsd: 0.315,
    creditsDeducted: 108,
    doubleEntryLedgerRefId: 'tx_de_009',
    metadata: { runtime: 'node-22.4', script: 'verifyLedgerLegs.ts' },
    timestamp: '2026-08-15T16:05:00Z'
  }
];

// ===========================================================================
// 4. SEED MULTI-TIER BUDGETS & NOTIFICATION THRESHOLDS
// ===========================================================================

export const SEED_AI_BUDGET_STRUCTURE: OmniAiBudgetStructure = {
  id: 'bgt_dynasty_01',
  organizationId: 'org_dynasty',
  tenantId: 'tenant_dynasty_99',
  monthlyBudgetUsd: 500.00,
  monthlyBudgetCredits: 200000,
  currentSpentUsd: 84.60,
  currentSpentCredits: 33840,
  dailyCapUsd: 40.00,
  todaySpentUsd: 14.85,
  projectBudgets: [
    { projectId: 'proj_financial_audit', projectName: 'Autonomous Financial Reconciliation', monthlyCapUsd: 150.00, currentSpentUsd: 38.40 },
    { projectId: 'proj_sovereign_rag', projectName: 'Sovereign Knowledge Vaults', monthlyCapUsd: 120.00, currentSpentUsd: 22.10 },
    { projectId: 'proj_marketing_studio', projectName: 'Multimodal Media Generation', monthlyCapUsd: 100.00, currentSpentUsd: 15.60 },
    { projectId: 'proj_code_sandbox', projectName: 'Code Studio & CI Testing', monthlyCapUsd: 80.00, currentSpentUsd: 8.50 }
  ],
  agentBudgets: [
    { agentId: 'agent_auditor_pro', agentName: 'Autonomous Financial Auditor Pro', monthlyCapUsd: 75.00, currentSpentUsd: 28.50 },
    { agentId: 'agent_legal_counsel', agentName: 'Global Sovereign Legal Counsel', monthlyCapUsd: 60.00, currentSpentUsd: 14.20 },
    { agentId: 'agent_code_reviewer', agentName: 'Sovereign Code Reviewer', monthlyCapUsd: 50.00, currentSpentUsd: 9.80 }
  ],
  notificationThresholds: [50, 80, 90, 100],
  alertsTriggered: [
    { threshold: 50, triggeredAt: '2026-08-12T14:00:00Z', acknowledged: true }
  ],
  enforcementMode: 'hard_stop',
  autoRechargeEnabled: true,
  autoRechargeThresholdUsd: 20.00,
  autoRechargeAmountUsd: 100.00,
  updatedAt: '2026-08-15T12:00:00Z'
};

// ===========================================================================
// 5. SEED OMNI AI MARKETPLACE LISTINGS (ALL 9 PRODUCT TYPES)
// ===========================================================================

export const SEED_MARKETPLACE_ITEMS: OmniMarketplaceItem[] = [
  {
    id: 'mp_agent_01',
    slug: 'autonomous-financial-auditor-pro',
    title: 'Autonomous Financial Auditor Pro',
    subtitle: 'Continuous double-entry ledger scanner and regulatory AML anomaly detector',
    itemType: 'agent',
    category: 'finance',
    creatorId: 'usr_dynasty_labs',
    creatorName: 'Dynasty Capital Labs',
    creatorOrg: 'Dynasty Global Holdings',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: false,
    description: 'Autonomous financial agent that continuously scans ledger entries, detects anomalies, verifies credit/debit balances, and drafts reconciliation reports.',
    fullMarkdown: `### Overview\n\nThe **Autonomous Financial Auditor Pro** is built for modern CFOs, controllers, and decentralized treasuries. It enforces strict mathematical integrity across multi-tenant ledger accounts, proactively blocks double-spending attempts, and ensures AML compliance.\n\n### Key Features\n- **Continuous Ledger Scanning**: Monitors all transactions in real-time with sub-millisecond anomaly detection.\n- **Cryptographic Audit Proofs**: Verifies SHA-256 integrity hashes for each debit/credit leg.\n- **Executive Reports**: Generates weekly and monthly financial summaries in Markdown, PDF, or Sheet format.\n\n### Required Permissions\nRequires \`ai.agents.run\`, \`ai.tools.invoke\`, and \`ai.billing.view\` to inspect ledger data within the authorized tenant scope. Cross-tenant queries are strictly rejected by the Sovereign core.`,
    featuresList: [
      'Real-time double-entry ledger verification',
      'Automated AML & suspicious velocity detection',
      'One-click reconciliation dossier generation',
      'Human-in-the-loop approval escalation'
    ],
    screenshots: [
      { id: 'ss_1', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', caption: 'Real-time ledger audit anomaly dashboard' },
      { id: 'ss_2', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80', caption: 'Automated executive financial dossier generator' }
    ],
    version: '2.4.1',
    releaseNotes: 'Added support for Spanner distributed node verification and multi-currency exchange rate drift checks.',
    changelog: [
      { version: '2.4.1', date: '2026-08-10', notes: 'Optimized vector search latency for multi-year historical ledger queries.' },
      { version: '2.3.0', date: '2026-06-15', notes: 'Integrated human-in-the-loop monetary approval gates above $10,000 threshold.' }
    ],
    pricingModel: 'monthly_subscription',
    priceUsd: 49.00,
    creditsPrice: 1960,
    trialDays: 14,
    requiredScopes: ['ai.agents.run', 'ai.tools.invoke', 'ai.billing.view'],
    allowedRoles: ['owner', 'admin', 'accountant'],
    supportedCountries: ['ALL'],
    dependencies: [
      { type: 'model', name: 'gemini-2.5-pro', isRequired: true, isSatisfied: true },
      { type: 'tool', name: 'financial_ledger_query', isRequired: true, isSatisfied: true },
      { type: 'tool', name: 'reconciliation_verify', isRequired: true, isSatisfied: true }
    ],
    supportInfo: {
      email: 'support@dynastycapitallabs.com',
      docsUrl: 'https://docs.dynastyholdings.com/auditor-pro',
      responseTimeSla: '< 4 hours'
    },
    privacyInfo: {
      dataRetentionDays: 30,
      piiCollected: false,
      telemetryStored: true,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://dynastyholdings.com/privacy'
    },
    reviewStatus: 'published',
    automatedScanResults: {
      passed: true,
      securityScore: 99,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-08-01T10:00:00Z',
      reportNotes: 'Static code analysis passed 0 alerts. Zero network egress outside sovereign enclave detected.'
    },
    securityPolicyReview: {
      reviewedBy: 'security_auditor_omni',
      decision: 'approved',
      feedbackNotes: 'Verified tenant boundary enforcement. No risk of cross-tenant exposure.',
      decidedAt: '2026-08-02T14:30:00Z'
    },
    rating: 4.95,
    reviewCount: 142,
    installCount: 1820,
    activeTenantsCount: 420,
    isInstalledInCurrentOrg: true,
    tags: ['Finance', 'Audit', 'Ledger', 'AML', 'Agents'],
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-08-10T00:00:00Z'
  },
  {
    id: 'mp_prompt_02',
    slug: 'global-legal-counsel-prompt-pack',
    title: 'Global Sovereign Legal & Compliance Prompt System',
    subtitle: '120+ battle-tested system prompts for cross-border contracts, GDPR, AML & M&A disclosures',
    itemType: 'prompt_system',
    category: 'legal',
    creatorId: 'usr_sovereign_legal',
    creatorName: 'Sovereign Legal Guild',
    creatorOrg: 'OMNI Ecosystem Foundation',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: true,
    description: 'Comprehensive prompt templates covering international IP contracts, cross-border M&A disclosures, GDPR compliance audits, and AI governance filings.',
    fullMarkdown: `### Enterprise Legal Prompt System\n\nCurated by top international corporate attorneys, this prompt system transforms OMNI AI into an expert cross-border paralegal and compliance auditor.\n\n### Included Templates\n- **Cross-Border M&A Due Diligence**: Scans dataroom documents for hidden liabilities and indemnification clauses.\n- **GDPR & Privacy Shield Audit**: Flags non-compliant PII handling in technical specs.\n- **SaaS Vendor Agreements**: Redlines unfavorable limitation-of-liability and SLA terms automatically.`,
    featuresList: [
      '120+ verified legal system directives',
      'Multi-jurisdictional compliance (US, EU, UK, SG, JP)',
      'Automated clause redlining with rationale explanations',
      'Zero training data retention by default'
    ],
    screenshots: [
      { id: 'ss_3', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80', caption: 'Interactive contract redline breakdown' }
    ],
    version: '3.1.0',
    releaseNotes: 'Updated for EU AI Act compliance verification and 2026 SEC corporate cyber disclosure guidelines.',
    changelog: [
      { version: '3.1.0', date: '2026-07-20', notes: 'Added EU AI Act risk categorization prompts.' }
    ],
    pricingModel: 'one_time',
    priceUsd: 29.00,
    creditsPrice: 1160,
    requiredScopes: ['ai.chat.use', 'ai.documents.create'],
    allowedRoles: ['owner', 'admin', 'manager', 'member'],
    supportedCountries: ['ALL'],
    dependencies: [
      { type: 'model', name: 'gemini-2.5-pro', isRequired: true, isSatisfied: true }
    ],
    supportInfo: {
      email: 'compliance@sovereignlegal.io',
      docsUrl: 'https://docs.sovereignlegal.io/prompts',
      responseTimeSla: '< 12 hours'
    },
    privacyInfo: {
      dataRetentionDays: 0,
      piiCollected: false,
      telemetryStored: false,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://sovereignlegal.io/privacy'
    },
    reviewStatus: 'published',
    automatedScanResults: {
      passed: true,
      securityScore: 100,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-07-20T11:00:00Z',
      reportNotes: 'Clean prompt injection defense barriers verified.'
    },
    securityPolicyReview: {
      reviewedBy: 'policy_lead_omni',
      decision: 'approved',
      feedbackNotes: 'Compliant with all sovereign AI content safety standards.',
      decidedAt: '2026-07-21T09:00:00Z'
    },
    rating: 4.88,
    reviewCount: 94,
    installCount: 1120,
    activeTenantsCount: 310,
    isInstalledInCurrentOrg: false,
    tags: ['Legal', 'Contracts', 'GDPR', 'Compliance', 'Prompts'],
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-07-20T00:00:00Z'
  },
  {
    id: 'mp_connector_03',
    slug: 'spanner-database-rag-connector',
    title: 'Google Cloud Spanner Vector RAG Connector',
    subtitle: 'High-throughput relational vector indexing connector with automatic row-level tenant security',
    itemType: 'connector',
    category: 'developer',
    creatorId: 'usr_omni_core',
    creatorName: 'OMNI Core Infrastructure',
    creatorOrg: 'OMNI Foundation',
    creatorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: true,
    description: 'High-throughput vector indexing connector for relational Google Cloud Spanner instances with built-in row-level security and schema reflection.',
    fullMarkdown: `### Enterprise Spanner RAG Integration\n\nDirectly links OMNI AI Knowledge spaces to global Google Cloud Spanner database clusters. Automatically maps relational table schemas and indexes text embeddings with zero external egress.`,
    featuresList: [
      'Sub-15ms vector similarity queries across multi-region nodes',
      'Row-Level Security (RLS) enforcement on all retrieved chunks',
      'Automatic vector embedding re-sync on database mutation triggers',
      'Zero-configuration connection with OMNI Core database'
    ],
    screenshots: [
      { id: 'ss_4', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80', caption: 'Spanner node telemetry and vector query latency graph' }
    ],
    version: '1.8.0',
    releaseNotes: 'Enhanced query caching and connection pooling for high-concurrency enterprise workloads.',
    changelog: [
      { version: '1.8.0', date: '2026-08-05', notes: 'Integrated Spanner pgvector syntax support.' }
    ],
    pricingModel: 'free',
    priceUsd: 0.00,
    creditsPrice: 0,
    requiredScopes: ['ai.knowledge.read', 'ai.knowledge.write', 'ai.tools.invoke'],
    allowedRoles: ['owner', 'admin', 'developer'],
    supportedCountries: ['ALL'],
    dependencies: [
      { type: 'connector', name: 'spanner_cluster_client', isRequired: true, isSatisfied: true }
    ],
    supportInfo: {
      email: 'infra@omni.io',
      docsUrl: 'https://docs.omni.io/connectors/spanner',
      responseTimeSla: '< 2 hours'
    },
    privacyInfo: {
      dataRetentionDays: 0,
      piiCollected: false,
      telemetryStored: true,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://omni.io/privacy'
    },
    reviewStatus: 'published',
    automatedScanResults: {
      passed: true,
      securityScore: 100,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-08-05T08:00:00Z',
      reportNotes: 'Core infrastructure connector certified.'
    },
    securityPolicyReview: {
      reviewedBy: 'chief_architect_omni',
      decision: 'approved',
      feedbackNotes: 'Official first-party connector.',
      decidedAt: '2026-08-05T08:30:00Z'
    },
    rating: 5.0,
    reviewCount: 310,
    installCount: 5400,
    activeTenantsCount: 1890,
    isInstalledInCurrentOrg: true,
    tags: ['Spanner', 'RAG', 'Vector', 'Database', 'Developer'],
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-08-05T00:00:00Z'
  },
  {
    id: 'mp_workflow_04',
    slug: 'autonomous-m-and-a-dossier-pipeline',
    title: 'Autonomous M&A Deal Due Diligence Pipeline',
    subtitle: '7-step multi-agent automated orchestration for corporate acquisition data room synthesis',
    itemType: 'workflow',
    category: 'finance',
    creatorId: 'usr_apex_capital',
    creatorName: 'Apex Capital Partners',
    creatorOrg: 'Apex Sovereign Fund',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: false,
    description: 'Autonomous multi-stage workflow that ingests pitch decks, financial audits, cap tables, and legal agreements, outputting an investment committee dossier.',
    fullMarkdown: `### M&A Due Diligence Automation Workflow\n\nCoordinates 4 specialist AI agents through a multi-pass pipeline:\n1. **Data Room Ingestion & Categorization**\n2. **Cap Table Dilution Modeling**\n3. **Customer Retention & Churn Cohort Synthesis**\n4. **Legal Liability Redline Audit**\n5. **Valuation & DCF Sensitivity Matrix**\n6. **Executive Investment Memo Generation**\n7. **Human-in-the-loop Partner Signoff Gate**`,
    featuresList: [
      'Multi-agent sequential handoffs with audit trails',
      'Automated DCF & valuation model generation',
      'Cap table waterfall simulation',
      'Interactive executive slide deck export'
    ],
    screenshots: [
      { id: 'ss_5', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80', caption: 'Autonomous deal valuation synthesis pipeline' }
    ],
    version: '1.4.0',
    releaseNotes: 'Added support for cross-app synchronization with OMNI Capital portal.',
    changelog: [
      { version: '1.4.0', date: '2026-08-01', notes: 'Integrated OMNI Capital cap table export.' }
    ],
    pricingModel: 'monthly_subscription',
    priceUsd: 99.00,
    creditsPrice: 3960,
    trialDays: 7,
    requiredScopes: ['ai.agents.run', 'ai.documents.create', 'ai.slides.create', 'ai.billing.view'],
    allowedRoles: ['owner', 'admin', 'manager'],
    supportedCountries: ['ALL'],
    dependencies: [
      { type: 'model', name: 'gemini-2.5-pro', isRequired: true, isSatisfied: true },
      { type: 'tool', name: 'cap_table_analyzer', isRequired: true, isSatisfied: true }
    ],
    supportInfo: {
      email: 'support@apexcapital.io',
      docsUrl: 'https://apexcapital.io/omni-workflow',
      responseTimeSla: '< 6 hours'
    },
    privacyInfo: {
      dataRetentionDays: 60,
      piiCollected: false,
      telemetryStored: true,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://apexcapital.io/privacy'
    },
    reviewStatus: 'published',
    automatedScanResults: {
      passed: true,
      securityScore: 98,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-08-01T15:00:00Z',
      reportNotes: 'Workflow verified. Approval gates properly configured.'
    },
    securityPolicyReview: {
      reviewedBy: 'security_auditor_omni',
      decision: 'approved',
      feedbackNotes: 'High-value enterprise workflow approved.',
      decidedAt: '2026-08-02T10:00:00Z'
    },
    rating: 4.92,
    reviewCount: 68,
    installCount: 520,
    activeTenantsCount: 190,
    isInstalledInCurrentOrg: false,
    tags: ['M&A', 'Workflow', 'Finance', 'Investment', 'Dossier'],
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'mp_skill_05',
    slug: 'sovereign-code-security-linter-skill',
    title: 'Sovereign Code Sandbox & Secret Redaction Skill',
    subtitle: 'Specialist coding skill that detects API key leaks, hardcoded credentials, and memory safety bugs',
    itemType: 'skill',
    category: 'developer',
    creatorId: 'usr_omni_security',
    creatorName: 'OMNI Security Labs',
    creatorOrg: 'OMNI Foundation',
    creatorAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: true,
    description: 'Specialist AI coding capability that intercepts code generation to prevent hardcoded secrets, SQL injection, and cross-site scripting bugs before compilation.',
    fullMarkdown: `### Sovereign Code Security Skill\n\nEnhances OMNI Code Studio and code-generating agents with real-time AST analysis and secret detection.\n\n### Detection Matrix\n- **API Key & Private Key Leaks**: Over 150 signature patterns (OpenAI, AWS, GCP, Stripe, SSH keys).\n- **SQL & Query Injections**: Enforces parameterized queries and prepared statements.\n- **Cross-Tenant Contamination**: Prohibits hardcoded tenant identifiers or bypassing tenant filters.`,
    featuresList: [
      '150+ secret signature pattern verifiers',
      'Real-time AST parsing during code synthesis',
      'Automatic replacement with environment variable placeholders',
      'Zero execution latency overhead (< 5ms)'
    ],
    screenshots: [
      { id: 'ss_6', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80', caption: 'Real-time AST security interceptor' }
    ],
    version: '2.1.0',
    releaseNotes: 'Added detection for quantum-resistant crypto key formats.',
    changelog: [
      { version: '2.1.0', date: '2026-07-28', notes: 'Expanded regex engine for ML model weights URLs.' }
    ],
    pricingModel: 'free',
    priceUsd: 0.00,
    creditsPrice: 0,
    requiredScopes: ['ai.code.use'],
    allowedRoles: ['owner', 'admin', 'developer', 'member'],
    supportedCountries: ['ALL'],
    dependencies: [],
    supportInfo: {
      email: 'security@omni.io',
      docsUrl: 'https://docs.omni.io/skills/code-security',
      responseTimeSla: '< 1 hour'
    },
    privacyInfo: {
      dataRetentionDays: 0,
      piiCollected: false,
      telemetryStored: false,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://omni.io/privacy'
    },
    reviewStatus: 'published',
    automatedScanResults: {
      passed: true,
      securityScore: 100,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-07-28T09:00:00Z',
      reportNotes: 'Certified sovereign security module.'
    },
    securityPolicyReview: {
      reviewedBy: 'ciso_omni',
      decision: 'approved',
      feedbackNotes: 'Recommended for all enterprise tenants.',
      decidedAt: '2026-07-28T09:30:00Z'
    },
    rating: 4.97,
    reviewCount: 420,
    installCount: 6800,
    activeTenantsCount: 2400,
    isInstalledInCurrentOrg: true,
    tags: ['Security', 'Code', 'Linter', 'Secrets', 'Skill'],
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-07-28T00:00:00Z'
  },
  {
    id: 'mp_template_06',
    slug: 'sovereign-kyc-kyb-knowledge-template',
    title: 'Global KYB & Sovereign Verification Knowledge Template',
    subtitle: 'Pre-indexed vector knowledge base with international compliance, AML5/6, and corporate verification statutes',
    itemType: 'knowledge_template',
    category: 'legal',
    creatorId: 'usr_trust_compliance',
    creatorName: 'Trust & Sovereign Compliance Guild',
    creatorOrg: 'OMNI Ecosystem',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: false,
    description: 'Instant vector knowledge space populated with verified global regulatory compliance matrices, corporate registry standards, and identity verification guides.',
    fullMarkdown: `### KYB Knowledge Space Template\n\nInstantly injects an authoritative 12,000-chunk knowledge vault into your organization. Ground all AI compliance workflows with citations directly referencing official statutory language.`,
    featuresList: [
      '12,000+ pre-indexed vector chunks',
      'Covers 60+ sovereign jurisdictions',
      'Automated bi-weekly statutory sync updates',
      'Ready for immediate RAG grounding'
    ],
    screenshots: [
      { id: 'ss_7', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80', caption: 'Pre-indexed regulatory vector chunks explorer' }
    ],
    version: '4.0.2',
    releaseNotes: 'Added 2026 UK Companies House identity verification regulations.',
    changelog: [
      { version: '4.0.2', date: '2026-08-02', notes: 'Synced with latest corporate transparency register statutes.' }
    ],
    pricingModel: 'monthly_subscription',
    priceUsd: 39.00,
    creditsPrice: 1560,
    trialDays: 7,
    requiredScopes: ['ai.knowledge.read', 'ai.knowledge.write'],
    allowedRoles: ['owner', 'admin', 'manager'],
    supportedCountries: ['ALL'],
    dependencies: [],
    supportInfo: {
      email: 'help@trustcompliance.org',
      docsUrl: 'https://trustcompliance.org/omni-template',
      responseTimeSla: '< 8 hours'
    },
    privacyInfo: {
      dataRetentionDays: 0,
      piiCollected: false,
      telemetryStored: false,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://trustcompliance.org/privacy'
    },
    reviewStatus: 'published',
    automatedScanResults: {
      passed: true,
      securityScore: 99,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-08-02T12:00:00Z',
      reportNotes: 'All citations verified against public statutes.'
    },
    securityPolicyReview: {
      reviewedBy: 'compliance_lead_omni',
      decision: 'approved',
      feedbackNotes: 'High-quality legal dataset approved.',
      decidedAt: '2026-08-02T16:00:00Z'
    },
    rating: 4.85,
    reviewCount: 52,
    installCount: 680,
    activeTenantsCount: 220,
    isInstalledInCurrentOrg: false,
    tags: ['KYB', 'KYC', 'Knowledge', 'Compliance', 'Legal'],
    createdAt: '2026-02-25T00:00:00Z',
    updatedAt: '2026-08-02T00:00:00Z'
  },
  {
    id: 'mp_submission_draft_07',
    slug: 'multilingual-customer-support-agent',
    title: 'Autonomous Multilingual Support & Triage Agent',
    subtitle: 'Handles Tier 1-2 customer queries in 40+ languages with sentiment routing and ticket creation',
    itemType: 'agent',
    category: 'productivity',
    creatorId: 'usr_dynasty_labs',
    creatorName: 'Dynasty Capital Labs',
    creatorOrg: 'Dynasty Global Holdings',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    creatorVerified: true,
    isOmniOfficial: false,
    description: 'Self-governing customer support agent that resolves issues across email, chat, and tickets in real-time, escalating high-sentiment disputes.',
    fullMarkdown: `### Support Agent Specification\n\nTrained on omnichannel customer workflows. Integrates with CRM, ticketing engines, and knowledge bases to resolve issues autonomously.`,
    featuresList: [
      'Native fluency in 40+ languages',
      'Real-time sentiment anomaly detection',
      'Autonomous CRM contact synchronization',
      'Automated escalation to human supervisors'
    ],
    screenshots: [
      { id: 'ss_8', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80', caption: 'Multilingual sentiment triage queue' }
    ],
    version: '1.0.0-rc.2',
    releaseNotes: 'Initial release candidate undergoing security and automated policy review.',
    changelog: [
      { version: '1.0.0-rc.2', date: '2026-08-14', notes: 'Configured automated rate limiter and sandbox constraints.' }
    ],
    pricingModel: 'monthly_subscription',
    priceUsd: 35.00,
    creditsPrice: 1400,
    trialDays: 14,
    requiredScopes: ['ai.agents.run', 'ai.chat.use', 'ai.knowledge.read'],
    allowedRoles: ['owner', 'admin', 'support'],
    supportedCountries: ['ALL'],
    dependencies: [
      { type: 'model', name: 'gemini-2.5-flash', isRequired: true, isSatisfied: true }
    ],
    supportInfo: {
      email: 'support@dynastylabs.com',
      docsUrl: 'https://docs.dynastylabs.com/support-agent',
      responseTimeSla: '< 4 hours'
    },
    privacyInfo: {
      dataRetentionDays: 14,
      piiCollected: true,
      telemetryStored: true,
      zeroDataRetentionSupported: true,
      privacyPolicyUrl: 'https://dynastylabs.com/privacy'
    },
    reviewStatus: 'security_review',
    automatedScanResults: {
      passed: true,
      securityScore: 96,
      vulnerabilitiesFound: 0,
      piiChecksPassed: true,
      permissionLeakCheck: true,
      scannedAt: '2026-08-15T06:00:00Z',
      reportNotes: 'Automated vulnerability scanner passed. Awaiting human policy officer sign-off.'
    },
    securityPolicyReview: {
      reviewedBy: 'security_reviewer_omni',
      decision: 'pending',
      feedbackNotes: 'Review in progress. Evaluating PII redaction rules for European GDPR compliance.'
    },
    rating: 0,
    reviewCount: 0,
    installCount: 0,
    activeTenantsCount: 0,
    isInstalledInCurrentOrg: false,
    tags: ['Support', 'Customer', 'Multilingual', 'Agent'],
    createdAt: '2026-08-14T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  }
];

// ===========================================================================
// 6. SEED MARKETPLACE ACTIVE INSTALLATIONS
// ===========================================================================

export const SEED_MARKETPLACE_INSTALLATIONS: OmniMarketplaceInstallation[] = [
  {
    id: 'inst_001',
    marketplaceItemId: 'mp_agent_01',
    itemTitle: 'Autonomous Financial Auditor Pro',
    itemType: 'agent',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    installedByUserId: 'usr_gideon',
    installedByUserEmail: 'gideonoluwalanadynasty@gmail.com',
    approvedScopes: ['ai.agents.run', 'ai.tools.invoke', 'ai.billing.view'],
    autoUpdate: true,
    status: 'active',
    subscriptionId: 'sub_mp_auditor_991',
    priceUsd: 49.00,
    doubleEntryLedgerRef: 'tx_de_006',
    installedAt: '2026-08-01T10:00:00Z',
    lastUsedAt: '2026-08-15T11:45:00Z'
  },
  {
    id: 'inst_002',
    marketplaceItemId: 'mp_connector_03',
    itemTitle: 'Google Cloud Spanner Vector RAG Connector',
    itemType: 'connector',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    installedByUserId: 'usr_gideon',
    installedByUserEmail: 'gideonoluwalanadynasty@gmail.com',
    approvedScopes: ['ai.knowledge.read', 'ai.knowledge.write', 'ai.tools.invoke'],
    autoUpdate: true,
    status: 'active',
    priceUsd: 0.00,
    doubleEntryLedgerRef: 'tx_de_000_free',
    installedAt: '2026-08-02T14:30:00Z',
    lastUsedAt: '2026-08-15T08:00:00Z'
  },
  {
    id: 'inst_003',
    marketplaceItemId: 'mp_skill_05',
    itemTitle: 'Sovereign Code Sandbox & Secret Redaction Skill',
    itemType: 'skill',
    tenantId: 'tenant_dynasty_99',
    organizationId: 'org_dynasty',
    installedByUserId: 'usr_dev_alex',
    installedByUserEmail: 'alex.lead@dynastyholdings.com',
    approvedScopes: ['ai.code.use'],
    autoUpdate: true,
    status: 'active',
    priceUsd: 0.00,
    doubleEntryLedgerRef: 'tx_de_000_free',
    installedAt: '2026-08-05T09:15:00Z',
    lastUsedAt: '2026-08-15T16:05:00Z'
  }
];

// ===========================================================================
// 7. SEED DEVELOPER EARNINGS & PAYOUTS
// ===========================================================================

export const SEED_DEVELOPER_PAYOUT_DASHBOARD: OmniMarketplaceDeveloperPayout = {
  id: 'dev_payout_dynasty',
  developerId: 'usr_dynasty_labs',
  developerName: 'Dynasty Capital Labs',
  grossRevenueUsd: 89180.00,
  platformCommissionPercent: 15.0, // 15% platform fee
  platformCommissionUsd: 13377.00,
  netEarningsUsd: 75803.00,
  availableForPayoutUsd: 18450.00,
  pendingHoldUsd: 3200.00,
  lifetimeEarningsUsd: 75803.00,
  payoutMethod: 'omni_wallet',
  recentTransactions: [
    { id: 'txn_mp_01', itemId: 'mp_agent_01', itemTitle: 'Autonomous Financial Auditor Pro', tenantName: 'Apex Sovereign Fund', amountGrossUsd: 49.00, commissionUsd: 7.35, netUsd: 41.65, timestamp: '2026-08-15T14:10:00Z' },
    { id: 'txn_mp_02', itemId: 'mp_agent_01', itemTitle: 'Autonomous Financial Auditor Pro', tenantName: 'Valence Corp', amountGrossUsd: 49.00, commissionUsd: 7.35, netUsd: 41.65, timestamp: '2026-08-15T12:00:00Z' },
    { id: 'txn_mp_03', itemId: 'mp_agent_01', itemTitle: 'Autonomous Financial Auditor Pro', tenantName: 'Helios Global', amountGrossUsd: 49.00, commissionUsd: 7.35, netUsd: 41.65, timestamp: '2026-08-15T09:30:00Z' },
    { id: 'txn_mp_04', itemId: 'mp_agent_01', itemTitle: 'Autonomous Financial Auditor Pro', tenantName: 'Aegis Security', amountGrossUsd: 49.00, commissionUsd: 7.35, netUsd: 41.65, timestamp: '2026-08-14T22:15:00Z' },
    { id: 'txn_mp_05', itemId: 'mp_agent_01', itemTitle: 'Autonomous Financial Auditor Pro', tenantName: 'Solaria Bio', amountGrossUsd: 49.00, commissionUsd: 7.35, netUsd: 41.65, timestamp: '2026-08-14T18:40:00Z' }
  ]
};

// ===========================================================================
// 8. SEED WHITE-LABEL AI SUITE CONFIGURATION
// ===========================================================================

export const SEED_WHITE_LABEL_CONFIG: OmniAiWhiteLabelConfig = {
  id: 'wl_dynasty_ai',
  tenantId: 'tenant_dynasty_99',
  organizationId: 'org_dynasty',
  isEnabled: true,
  brandName: 'Dynasty Sovereign AI',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
  faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&auto=format&fit=crop&q=80',
  customDomain: 'ai.dynastyholdings.com',
  cnameTarget: 'cname.sovereign.omni.io',
  dnsStatus: 'verified',
  sslActive: true,
  primaryColorHex: '#4F46E5', // Indigo
  accentColorHex: '#10B981',  // Emerald
  backgroundColorHex: '#09090B', // Zinc 950
  surfaceColorHex: '#18181B', // Zinc 900
  welcomeTitle: 'Welcome to Dynasty Sovereign AI Portal',
  welcomeSubtitle: 'Secure, multi-modal enterprise intelligence powered by Dynasty Capital private cluster.',
  defaultPromptSuggestions: [
    'Synthesize our Q3 consolidated financial audit report',
    'Run AML anomaly check on recent international settlements',
    'Draft an acquisition memo for Project Vanguard',
    'Analyze server latency telemetry across European Spanner nodes'
  ],
  enabledAgentIds: ['agent_auditor_pro', 'agent_legal_counsel', 'agent_code_reviewer'],
  enabledKnowledgeSpaceIds: ['ks_1', 'ks_2', 'ks_3'],
  allowedModelIds: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-4o', 'claude-3-5-sonnet', 'enterprise_byom_vllm'],
  customPricingPlans: [
    { planId: 'wl_plan_staff', name: 'Internal Staff Tier', priceMonthlyUsd: 0, customLimitsSummary: 'Unlimited internal inference, full RAG access.' },
    { planId: 'wl_plan_client', name: 'Client Portal Tier', priceMonthlyUsd: 99, customLimitsSummary: '10,000 monthly queries, read-only dossiers.' }
  ],
  customUsageCreditsMultiplier: 1.0,
  marketplaceMode: 'curated_only',
  providerSecretsExposed: false, // STRICT GUARANTEE: Never exposes provider keys
  updatedBy: 'usr_gideon',
  updatedAt: '2026-08-15T15:00:00Z'
};

// ===========================================================================
// 9. SEED AFFILIATE PROGRAM CONFIGURATION
// ===========================================================================

export const SEED_AFFILIATE_PROGRAM_CONFIG: OmniAffiliateProgramConfig = {
  id: 'aff_dynasty_partner',
  affiliateCode: 'DYNASTY_AI_VIP',
  affiliateUserId: 'usr_gideon',
  affiliateOrgName: 'Dynasty Global Holdings',
  referralLink: 'https://omni.io/r/DYNASTY_AI_VIP',
  defaultCommissionRatePercent: 20.0, // 20% on first-year subscriptions
  recurringCommissionRatePercent: 10.0, // 10% lifetime recurring
  marketplaceProductCommissionPercent: 10.0, // 10% on marketplace referrals
  cookieWindowDays: 60,
  totalClicks: 3420,
  totalConversions: 84,
  totalRevenueGeneratedUsd: 148200.00,
  totalCommissionEarnedUsd: 29640.00,
  pendingPayoutUsd: 4800.00,
  status: 'active',
  referralHistory: [
    { id: 'ref_tx_1', referredTenantName: 'Apex Sovereign Fund', planPurchased: 'Enterprise Sovereign ($999/mo)', revenueUsd: 999.00, commissionUsd: 199.80, date: '2026-08-14', status: 'cleared' },
    { id: 'ref_tx_2', referredTenantName: 'Helios Global Logistics', planPurchased: 'Business Team ($199/mo)', revenueUsd: 199.00, commissionUsd: 39.80, date: '2026-08-12', status: 'cleared' },
    { id: 'ref_tx_3', referredTenantName: 'Valence Therapeutics', planPurchased: 'Pro Sovereign ($49/mo)', revenueUsd: 49.00, commissionUsd: 9.80, date: '2026-08-10', status: 'paid' },
    { id: 'ref_tx_4', referredTenantName: 'Aegis Cybersecurity', planPurchased: 'Enterprise Sovereign ($999/mo)', revenueUsd: 999.00, commissionUsd: 199.80, date: '2026-08-08', status: 'paid' }
  ]
};

// ===========================================================================
// 10. SEED RESELLER HIERARCHY & WHOLESALE TIERS
// ===========================================================================

export const SEED_RESELLER_HIERARCHY: OmniResellerHierarchy = {
  id: 'reseller_dynasty_global',
  resellerOrgId: 'org_dynasty',
  resellerOrgName: 'Dynasty Global Reseller Network',
  tier: 'diamond_sovereign',
  wholesaleDiscountPercent: 35.0, // 35% wholesale margin discount from list price
  retailMarkupPercent: 15.0,
  allocatedMonthlyQuotaCredits: 50000000,
  usedQuotaCredits: 14820000,
  activeSubTenantsCount: 18,
  subTenants: [
    { tenantId: 'tenant_sub_01', orgName: 'Meridian Capital Partners', planTier: 'enterprise', allocatedCredits: 8000000, status: 'active', joinedDate: '2026-02-10' },
    { tenantId: 'tenant_sub_02', orgName: 'Nova FinTech Corp', planTier: 'business', allocatedCredits: 3500000, status: 'active', joinedDate: '2026-03-15' },
    { tenantId: 'tenant_sub_03', orgName: 'Astra BioSciences', planTier: 'business', allocatedCredits: 2000000, status: 'active', joinedDate: '2026-05-01' },
    { tenantId: 'tenant_sub_04', orgName: 'Solaria Shipping', planTier: 'pro', allocatedCredits: 1320000, status: 'active', joinedDate: '2026-07-20' }
  ],
  monthlyResellerVolumeUsd: 48900.00,
  totalMarginEarnedUsd: 17115.00
};

// ===========================================================================
// 11. SEED RECONCILIATION & TENANT ISOLATION TESTS
// ===========================================================================

export const SEED_RECONCILIATION_TESTS: OmniReconciliationTestResult[] = [
  {
    id: 'test_recon_01',
    testName: 'Usage Unit to Double-Entry Ledger Synchronicity',
    category: 'ledger_sync',
    description: 'Verifies that every AI inference token debits the exact billable amount from tenant credits and writes balanced debit/credit legs into Core Ledger.',
    status: 'passed',
    assertionsCount: 4,
    assertionsPassed: 4,
    simulatedInput: { tokens: 100000, dimension: 'text_inference', tenantId: 'tenant_dynasty_99' },
    calculatedOutput: { rawCost: 0.015, infraCost: 0.003, margin: 0.0036, totalBillable: 0.0216, creditsDebited: 100 },
    ledgerEntriesVerified: [
      { debitAccount: 'tenant_dynasty_99_wallet', creditAccount: 'omni_ai_revenue_pool', amount: 0.0216, isBalanced: true },
      { debitAccount: 'omni_ai_revenue_pool', creditAccount: 'omni_provider_clearing_gemini', amount: 0.015, isBalanced: true },
      { debitAccount: 'omni_ai_revenue_pool', creditAccount: 'omni_infrastructure_reserve', amount: 0.003, isBalanced: true },
      { debitAccount: 'omni_ai_revenue_pool', creditAccount: 'omni_net_margin_treasury', amount: 0.0036, isBalanced: true }
    ],
    executionLatencyMs: 14.2,
    verifiedAt: '2026-08-16T04:30:00Z',
    reconciliationHash: 'sha256_9c2d1098bfe13028ee82da103c8f12a9'
  },
  {
    id: 'test_recon_02',
    testName: 'Provider Cost + Configured Margin Billable Formula',
    category: 'margin_accuracy',
    description: 'Tests mathematical consistency across all 11 metered usage dimensions against the formula: Cost + Infra + Margin = Billable Rate.',
    status: 'passed',
    assertionsCount: 11,
    assertionsPassed: 11,
    simulatedInput: { testedDimensionsCount: 11, marginTolerancePercent: 0.0001 },
    calculatedOutput: { formulaViolations: 0, maxDeviation: 0.0 },
    ledgerEntriesVerified: [
      { debitAccount: 'formula_test_harness', creditAccount: 'margin_verification_sink', amount: 1.0, isBalanced: true }
    ],
    executionLatencyMs: 6.8,
    verifiedAt: '2026-08-16T04:31:00Z',
    reconciliationHash: 'sha256_7a3d90218bc194de83a71b2d0109fa8b'
  },
  {
    id: 'test_recon_03',
    testName: 'Marketplace Developer Revenue Split & Commission Leg',
    category: 'developer_split',
    description: 'Verifies that a $49.00 marketplace agent purchase distributes 85% ($41.65) to developer balance and 15% ($7.35) to OMNI platform commissions without fractional rounding loss.',
    status: 'passed',
    assertionsCount: 3,
    assertionsPassed: 3,
    simulatedInput: { purchaseAmountUsd: 49.00, platformCommissionPercent: 15.0, developerId: 'usr_dynasty_labs' },
    calculatedOutput: { netToDeveloperUsd: 41.65, platformCommissionUsd: 7.35, sumMatchesGross: true },
    ledgerEntriesVerified: [
      { debitAccount: 'buyer_tenant_wallet', creditAccount: 'marketplace_clearing_account', amount: 49.00, isBalanced: true },
      { debitAccount: 'marketplace_clearing_account', creditAccount: 'developer_dynasty_labs_balance', amount: 41.65, isBalanced: true },
      { debitAccount: 'marketplace_clearing_account', creditAccount: 'omni_platform_commission_pool', amount: 7.35, isBalanced: true }
    ],
    executionLatencyMs: 8.5,
    verifiedAt: '2026-08-16T04:32:00Z',
    reconciliationHash: 'sha256_cd83b9c2018ea1b02de9d18fae839211'
  },
  {
    id: 'test_recon_04',
    testName: 'Multi-Tenant Budget Hard-Stop & Daily Cap Enforcement',
    category: 'budget_hard_stop',
    description: 'Simulates tenant exceeding daily cap ($40.00) and asserts that non-exempt inference calls are blocked with HTTP 429 / Budget Exceeded error.',
    status: 'passed',
    assertionsCount: 5,
    assertionsPassed: 5,
    simulatedInput: { dailyCapUsd: 40.00, simulatedSpendUsd: 40.05, requestAttemptAmountUsd: 0.10 },
    calculatedOutput: { requestAllowed: false, hardStopTriggered: true, alertNotificationDispatched: true },
    ledgerEntriesVerified: [
      { debitAccount: 'budget_enforcement_gate', creditAccount: 'audit_log_sink', amount: 0.0, isBalanced: true }
    ],
    executionLatencyMs: 11.0,
    verifiedAt: '2026-08-16T04:33:00Z',
    reconciliationHash: 'sha256_3b01a2c918ee9f110bc8d910128912aa'
  },
  {
    id: 'test_recon_05',
    testName: 'Zero Cross-Tenant Contamination in Vector Cache & Storage',
    category: 'tenant_isolation',
    description: 'Attempts an unauthorized synthetic cross-tenant vector query from tenant_beta targeting tenant_alpha data; asserts 0 vector chunks returned.',
    status: 'passed',
    assertionsCount: 6,
    assertionsPassed: 6,
    simulatedInput: { callerTenantId: 'tenant_beta', targetVectorVaultTenantId: 'tenant_dynasty_99', attackVector: 'RLS_BYPASS_ATTEMPT' },
    calculatedOutput: { unauthorizedChunksLeaked: 0, rlsFilterEnforced: true, securityAlarmLogged: true },
    ledgerEntriesVerified: [],
    executionLatencyMs: 18.1,
    verifiedAt: '2026-08-16T04:34:00Z',
    reconciliationHash: 'sha256_5a1aefbcde8271810cbf83e2010938ff'
  },
  {
    id: 'test_recon_06',
    testName: 'White-Label Provider Secret Redaction Enclave Guarantee',
    category: 'secret_redaction',
    description: 'Probes white-label tenant API response payloads to verify that master Gemini/OpenAI API keys and upstream credentials are never returned to client browser.',
    status: 'passed',
    assertionsCount: 4,
    assertionsPassed: 4,
    simulatedInput: { endpoint: '/api/v1/ai/white-label/config', testTenantId: 'tenant_dynasty_99' },
    calculatedOutput: { secretsDetectedInResponse: 0, providerSecretsExposedField: false, enclaveSanitized: true },
    ledgerEntriesVerified: [],
    executionLatencyMs: 7.4,
    verifiedAt: '2026-08-16T04:35:00Z',
    reconciliationHash: 'sha256_8f293b1239cd394b9f2c7a911e391290'
  },
  {
    id: 'test_recon_07',
    testName: 'BYOK Key Egress Security & Software Fee Governance',
    category: 'byok_enclave',
    description: 'Validates that user BYOK keys are encrypted at rest with AES-256 tenant envelope keys and routed directly to the provider without intermediate logging.',
    status: 'passed',
    assertionsCount: 3,
    assertionsPassed: 3,
    simulatedInput: { keyLength: 51, provider: 'openai', encryptionMode: 'AES_256_GCM' },
    calculatedOutput: { plaintextLogged: false, envelopeDecryptedInEnclaveOnly: true, softwarePlatformFeeApplied: true },
    ledgerEntriesVerified: [],
    executionLatencyMs: 9.3,
    verifiedAt: '2026-08-16T04:36:00Z',
    reconciliationHash: 'sha256_9a12c840291ba81928cf0182931a0e88'
  },
  {
    id: 'test_recon_08',
    testName: 'Reseller Wholesale Margin & Quota Reconciliation',
    category: 'reseller_reconciliation',
    description: 'Reconciles wholesale discount (35%) against retail sub-tenant invoicing and credits pool balances for 18 active sub-tenants.',
    status: 'passed',
    assertionsCount: 4,
    assertionsPassed: 4,
    simulatedInput: { grossRetailVolumeUsd: 48900.00, wholesaleDiscountPercent: 35.0 },
    calculatedOutput: { wholesalePayableUsd: 31785.00, resellerRetainedMarginUsd: 17115.00, subTenantAllotmentBalanced: true },
    ledgerEntriesVerified: [
      { debitAccount: 'sub_tenants_aggregate_receivable', creditAccount: 'reseller_gross_pool', amount: 48900.00, isBalanced: true },
      { debitAccount: 'reseller_gross_pool', creditAccount: 'omni_core_wholesale_clearing', amount: 31785.00, isBalanced: true },
      { debitAccount: 'reseller_gross_pool', creditAccount: 'reseller_retained_earnings', amount: 17115.00, isBalanced: true }
    ],
    executionLatencyMs: 15.6,
    verifiedAt: '2026-08-16T04:37:00Z',
    reconciliationHash: 'sha256_4b892a019e09d18290fa81203912ca87'
  }
];
