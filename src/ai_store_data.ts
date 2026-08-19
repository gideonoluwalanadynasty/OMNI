import { 
  AIProvider, 
  AIModel, 
  AIAgent, 
  AIPrompt, 
  AITool, 
  KnowledgeSource, 
  AICostRecord, 
  AIBudgetConfig, 
  AIAutonomyRule, 
  AIApprovalTask, 
  AIAuditLog, 
  AIConversation,
  ByokCredential,
  ByomEndpoint,
  AiCircuitBreakerRecord,
  AiCacheRecord,
  OmniKnowledgeSpace,
  OmniKnowledgeSource,
  OmniKnowledgeChunk,
  OmniMemoryItem,
  OmniKnowledgeAssistant,
  OmniKnowledgeConnector,
  OmniDiagnosticTestResult
} from './types';

export const SEED_AI_PROVIDERS: AIProvider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini (Native Operational)',
    providerType: 'first_party_gemini',
    status: 'connected',
    authType: 'system_env',
    apiKeyConfigured: true,
    apiKeyMasked: 'AIzaSy••••••••••••9941',
    endpointUrl: 'https://generativelanguage.googleapis.com',
    supportedModalities: ['text', 'code', 'image', 'audio', 'video', 'embedding'],
    health: {
      latencyMs: 38,
      errorRate: 0.001,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  },
  {
    id: 'openai',
    name: 'OpenAI Enterprise Gateway',
    providerType: 'openai_compatible',
    status: 'connected',
    authType: 'byok',
    apiKeyConfigured: true,
    apiKeyMasked: 'sk-proj-••••••••••••4991',
    endpointUrl: 'https://api.openai.com/v1',
    supportedModalities: ['text', 'code', 'image', 'audio', 'embedding'],
    health: {
      latencyMs: 142,
      errorRate: 0.004,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude API',
    providerType: 'anthropic_compatible',
    status: 'disconnected',
    authType: 'byok',
    apiKeyConfigured: false,
    endpointUrl: 'https://api.anthropic.com/v1',
    supportedModalities: ['text', 'code', 'image'],
    health: {
      latencyMs: 0,
      errorRate: 0,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed',
      lastFailureReason: 'Awaiting tenant BYOK API key'
    }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek Reasoner API',
    providerType: 'managed_third_party',
    status: 'connected',
    authType: 'byok',
    apiKeyConfigured: true,
    apiKeyMasked: 'sk-ds-••••••••••••8812',
    endpointUrl: 'https://api.deepseek.com/v1',
    supportedModalities: ['text', 'code'],
    health: {
      latencyMs: 285,
      errorRate: 0.012,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  },
  {
    id: 'groq',
    name: 'Groq LPU Ultra-Low Latency',
    providerType: 'managed_third_party',
    status: 'disconnected',
    authType: 'byok',
    apiKeyConfigured: false,
    endpointUrl: 'https://api.groq.com/openai/v1',
    supportedModalities: ['text', 'code'],
    health: {
      latencyMs: 0,
      errorRate: 0,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  },
  {
    id: 'local_ollama',
    name: 'Local Sovereign Ollama Node',
    providerType: 'self_hosted',
    status: 'connected',
    authType: 'none',
    apiKeyConfigured: true,
    endpointUrl: 'http://localhost:11434/api',
    supportedModalities: ['text', 'code', 'audio', 'embedding'],
    health: {
      latencyMs: 18,
      errorRate: 0,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  },
  {
    id: 'enterprise_byom_vllm',
    name: 'Dynasty Secure vLLM Cluster',
    providerType: 'enterprise_private',
    status: 'connected',
    authType: 'mutual_tls',
    apiKeyConfigured: true,
    apiKeyMasked: 'mTLS_Cert_SHA256_••••••••811a',
    endpointUrl: 'https://inference.dynasty-sovereign.internal/v1',
    supportedModalities: ['text', 'code', 'embedding'],
    isCustomByom: true,
    tenantId: 'org_dynasty',
    health: {
      latencyMs: 24,
      errorRate: 0,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  },
  {
    id: 'omni_sovereign',
    name: 'OMNI Sovereign Enclave (Confidential VM)',
    providerType: 'future_omni',
    status: 'connected',
    authType: 'system_env',
    apiKeyConfigured: true,
    endpointUrl: 'https://enclave.omni.internal/v1',
    supportedModalities: ['text', 'code', 'embedding'],
    health: {
      latencyMs: 12,
      errorRate: 0,
      lastChecked: new Date().toISOString(),
      consecutiveFailures: 0,
      circuitBreakerState: 'closed'
    }
  }
];

export const SEED_AI_MODELS: AIModel[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    providerId: 'gemini',
    type: 'text',
    modalities: ['text', 'code', 'image', 'audio', 'video'],
    reasoningCapability: 'medium',
    contextCapability: 1048576,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: true,
    audioSupport: true,
    videoSupport: true,
    embeddings: false,
    latencyClass: 'ultra_low',
    costMetadata: {
      inputPer1M: 0.075,
      outputPer1M: 0.30,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-pro',
    secondaryFallbackModelId: 'llama-3.3-70b',
    contextLength: 1048576,
    costPer1kInput: 0.000075,
    costPer1kOutput: 0.0003,
    status: 'active',
    isLocal: false
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro (Deep Reasoning)',
    providerId: 'gemini',
    type: 'text',
    modalities: ['text', 'code', 'image', 'audio', 'video'],
    reasoningCapability: 'extreme',
    contextCapability: 2097152,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: true,
    audioSupport: true,
    videoSupport: true,
    embeddings: false,
    latencyClass: 'medium',
    costMetadata: {
      inputPer1M: 1.25,
      outputPer1M: 5.00,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-flash',
    secondaryFallbackModelId: 'deepseek-r1',
    contextLength: 2097152,
    costPer1kInput: 0.00125,
    costPer1kOutput: 0.005,
    status: 'active',
    isLocal: false
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Omnimodal',
    providerId: 'openai',
    type: 'text',
    modalities: ['text', 'code', 'image', 'audio'],
    reasoningCapability: 'high',
    contextCapability: 128000,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: true,
    audioSupport: true,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'low',
    costMetadata: {
      inputPer1M: 2.50,
      outputPer1M: 10.00,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-pro',
    secondaryFallbackModelId: 'gemini-2.5-flash',
    contextLength: 128000,
    costPer1kInput: 0.0025,
    costPer1kOutput: 0.010,
    status: 'active',
    isLocal: false
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini (Cost-Optimized)',
    providerId: 'openai',
    type: 'text',
    modalities: ['text', 'code', 'image'],
    reasoningCapability: 'medium',
    contextCapability: 128000,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: true,
    audioSupport: false,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'ultra_low',
    costMetadata: {
      inputPer1M: 0.15,
      outputPer1M: 0.60,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-flash',
    secondaryFallbackModelId: 'llama-3.3-70b',
    contextLength: 128000,
    costPer1kInput: 0.00015,
    costPer1kOutput: 0.0006,
    status: 'active',
    isLocal: false
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    providerId: 'anthropic',
    type: 'text',
    modalities: ['text', 'code', 'image'],
    reasoningCapability: 'extreme',
    contextCapability: 200000,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: true,
    audioSupport: false,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'low',
    costMetadata: {
      inputPer1M: 3.00,
      outputPer1M: 15.00,
      currency: 'USD'
    },
    availability: 'unconfigured',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-pro',
    secondaryFallbackModelId: 'gemini-2.5-flash',
    contextLength: 200000,
    costPer1kInput: 0.003,
    costPer1kOutput: 0.015,
    status: 'active',
    isLocal: false
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Open Reasoning)',
    providerId: 'deepseek',
    type: 'text',
    modalities: ['text', 'code'],
    reasoningCapability: 'extreme',
    contextCapability: 64000,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: false,
    audioSupport: false,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'medium',
    costMetadata: {
      inputPer1M: 0.55,
      outputPer1M: 2.19,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-pro',
    secondaryFallbackModelId: 'gemini-2.5-flash',
    contextLength: 64000,
    costPer1kInput: 0.00055,
    costPer1kOutput: 0.00219,
    status: 'active',
    isLocal: false
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B (Private Sovereign)',
    providerId: 'enterprise_byom_vllm',
    type: 'text',
    modalities: ['text', 'code'],
    reasoningCapability: 'high',
    contextCapability: 131072,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: false,
    audioSupport: false,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'low',
    costMetadata: {
      inputPer1M: 0.20,
      outputPer1M: 0.20,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'private',
    privacyClassification: 'sovereign_enclave',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-flash',
    secondaryFallbackModelId: 'omni-sovereign-1',
    contextLength: 131072,
    costPer1kInput: 0.0002,
    costPer1kOutput: 0.0002,
    status: 'active',
    isLocal: true
  },
  {
    id: 'imagen-3',
    name: 'Imagen 3 (Visual Synthesis Studio)',
    providerId: 'gemini',
    type: 'image',
    modalities: ['image'],
    reasoningCapability: 'high',
    contextCapability: 0,
    toolSupport: false,
    streaming: false,
    structuredOutput: false,
    imageSupport: true,
    audioSupport: false,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'medium',
    costMetadata: {
      inputPer1M: 0,
      outputPer1M: 0,
      fixedPerCall: 0.03,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'public',
    lifecycleStatus: 'ga',
    contextLength: 0,
    costPer1kInput: 0.03,
    costPer1kOutput: 0,
    status: 'active',
    isLocal: false
  },
  {
    id: 'whisper-1',
    name: 'Whisper Large v3 (Audio & Transcription)',
    providerId: 'local_ollama',
    type: 'transcription',
    modalities: ['audio'],
    reasoningCapability: 'medium',
    contextCapability: 16384,
    toolSupport: false,
    streaming: true,
    structuredOutput: false,
    imageSupport: false,
    audioSupport: true,
    videoSupport: false,
    embeddings: false,
    latencyClass: 'low',
    costMetadata: {
      inputPer1M: 0,
      outputPer1M: 0,
      fixedPerCall: 0.006,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'global',
    privacyClassification: 'zero_retention',
    lifecycleStatus: 'ga',
    contextLength: 16384,
    costPer1kInput: 0.006,
    costPer1kOutput: 0,
    status: 'active',
    isLocal: true
  },
  {
    id: 'omni-sovereign-1',
    name: 'OMNI Sovereign Enclave 1',
    providerId: 'omni_sovereign',
    type: 'text',
    modalities: ['text', 'code', 'embedding'],
    reasoningCapability: 'high',
    contextCapability: 524288,
    toolSupport: true,
    streaming: true,
    structuredOutput: true,
    imageSupport: false,
    audioSupport: false,
    videoSupport: false,
    embeddings: true,
    latencyClass: 'ultra_low',
    costMetadata: {
      inputPer1M: 0.05,
      outputPer1M: 0.10,
      currency: 'USD'
    },
    availability: 'operational',
    geography: 'private',
    privacyClassification: 'sovereign_enclave',
    lifecycleStatus: 'ga',
    fallbackModelId: 'gemini-2.5-flash',
    contextLength: 524288,
    costPer1kInput: 0.00005,
    costPer1kOutput: 0.0001,
    status: 'active',
    isLocal: true
  }
];

export const SEED_BYOK_CREDENTIALS: ByokCredential[] = [
  {
    id: 'byok_openai_dynasty',
    organizationId: 'org_dynasty',
    providerId: 'openai',
    providerName: 'OpenAI API',
    maskedKey: 'sk-proj-••••••••••••4991',
    label: 'Dynasty Corporate Tier-4 Key',
    status: 'active',
    allowedAppIds: ['*'],
    monthlySpendCapUsd: 500,
    currentMonthSpentUsd: 142.30,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-15T08:00:00Z',
    lastTestedAt: '2026-08-15T08:00:00Z',
    testResult: {
      success: true,
      latencyMs: 138,
      message: 'Connection verified: Organization tier 4 / models [gpt-4o, gpt-4o-mini] active.'
    }
  },
  {
    id: 'byok_deepseek_dynasty',
    organizationId: 'org_dynasty',
    providerId: 'deepseek',
    providerName: 'DeepSeek API',
    maskedKey: 'sk-ds-••••••••••••8812',
    label: 'Dynasty R1 Reasoning Channel',
    status: 'active',
    allowedAppIds: ['app_ai', 'app_business', 'app_code'],
    monthlySpendCapUsd: 200,
    currentMonthSpentUsd: 48.10,
    createdAt: '2026-08-05T12:00:00Z',
    updatedAt: '2026-08-14T15:00:00Z',
    lastTestedAt: '2026-08-14T15:00:00Z',
    testResult: {
      success: true,
      latencyMs: 274,
      message: 'Connection verified: DeepSeek R1 online with 64k context window.'
    }
  }
];

export const SEED_BYOM_ENDPOINTS: ByomEndpoint[] = [
  {
    id: 'byom_dynasty_vllm',
    organizationId: 'org_dynasty',
    name: 'Dynasty Dedicated vLLM Host',
    endpointUrl: 'https://inference.dynasty-sovereign.internal/v1',
    protocol: 'vllm',
    modelIdentifier: 'llama-3.3-70b-instruct-fp8',
    maskedAuthHeader: 'Bearer mTLS_••••••••••••811a',
    capabilities: {
      contextLength: 131072,
      streaming: true,
      tools: true,
      vision: false,
      latencyClass: 'low'
    },
    privacyClassification: 'sovereign_enclave',
    healthStatus: 'healthy',
    latencyMs: 24,
    lastHealthCheck: '2026-08-15T09:00:00Z',
    createdAt: '2026-08-02T14:00:00Z'
  },
  {
    id: 'byom_local_ollama',
    organizationId: 'org_dynasty',
    name: 'Local Ollama Edge Sandbox',
    endpointUrl: 'http://localhost:11434/v1',
    protocol: 'ollama',
    modelIdentifier: 'mistral-nemo:12b',
    maskedAuthHeader: 'None (Local Socket)',
    capabilities: {
      contextLength: 32768,
      streaming: true,
      tools: true,
      vision: false,
      latencyClass: 'ultra_low'
    },
    privacyClassification: 'zero_retention',
    healthStatus: 'healthy',
    latencyMs: 18,
    lastHealthCheck: '2026-08-15T09:15:00Z',
    createdAt: '2026-08-10T11:00:00Z'
  }
];

export const SEED_AI_CIRCUIT_BREAKERS: Record<string, AiCircuitBreakerRecord> = {
  gemini: {
    providerId: 'gemini',
    circuitState: 'closed',
    totalRequests: 4820,
    failedRequests: 2,
    avgLatencyMs: 38
  },
  openai: {
    providerId: 'openai',
    circuitState: 'closed',
    totalRequests: 1240,
    failedRequests: 5,
    avgLatencyMs: 142
  },
  anthropic: {
    providerId: 'anthropic',
    circuitState: 'closed',
    totalRequests: 0,
    failedRequests: 0,
    avgLatencyMs: 0
  },
  deepseek: {
    providerId: 'deepseek',
    circuitState: 'closed',
    totalRequests: 620,
    failedRequests: 8,
    avgLatencyMs: 285
  },
  local_ollama: {
    providerId: 'local_ollama',
    circuitState: 'closed',
    totalRequests: 950,
    failedRequests: 0,
    avgLatencyMs: 18
  },
  enterprise_byom_vllm: {
    providerId: 'enterprise_byom_vllm',
    circuitState: 'closed',
    totalRequests: 810,
    failedRequests: 1,
    avgLatencyMs: 24
  },
  omni_sovereign: {
    providerId: 'omni_sovereign',
    circuitState: 'closed',
    totalRequests: 340,
    failedRequests: 0,
    avgLatencyMs: 12
  }
};

export const SEED_AI_CACHE_RECORDS: AiCacheRecord[] = [
  {
    id: 'cache_01',
    cacheKey: 'c8f3a91b2c4e6d7a',
    tenantId: 'org_dynasty',
    userId: 'usr_gideon',
    modelId: 'gemini-2.5-flash',
    promptSummary: 'Overview of OMNI Universal Ledger Architecture and Double-Entry rules',
    responseSnippet: 'OMNI Universal Ledger enforces mathematical balance with strict credit and debit equality...',
    tokensSaved: 1420,
    costSaved: 0.00045,
    hitCount: 14,
    lastAccessedAt: '2026-08-15T08:45:00Z',
    expiresAt: '2026-08-16T08:45:00Z'
  },
  {
    id: 'cache_02',
    cacheKey: 'e4a7b9c1d3f5a2e8',
    tenantId: 'org_dynasty',
    userId: 'usr_gideon',
    modelId: 'gemini-2.5-pro',
    promptSummary: 'Python script for verifying HMAC SHA-256 webhook signatures against OMNI Gateway',
    responseSnippet: 'import hmac, hashlib\n\ndef verify_omni_signature(payload: bytes, secret: str, received_sig: str)...',
    tokensSaved: 3850,
    costSaved: 0.02410,
    hitCount: 8,
    lastAccessedAt: '2026-08-15T09:10:00Z',
    expiresAt: '2026-08-16T09:10:00Z'
  }
];

export const SEED_AI_TOOLS: AITool[] = [
  {
    id: 'search_products',
    name: 'Search Product Catalog',
    description: 'Searches through wholesale/retail inventory based on category, keywords, or SKU.',
    parametersSchema: JSON.stringify({
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Product terms to search' },
        category: { type: 'string', enum: ['raw_materials', 'electronics', 'textiles', 'packaging'] },
        maxResults: { type: 'number', default: 5 }
      },
      required: ['query']
    }),
    isHighRisk: false,
    category: 'market'
  },
  {
    id: 'create_draft_campaign',
    name: 'Create Draft Ad Campaign',
    description: 'Initializes a pending advertising campaign with headlines, target audience, and bid budgets.',
    parametersSchema: JSON.stringify({
      type: 'object',
      properties: {
        campaignName: { type: 'string' },
        headline: { type: 'string' },
        bidAmountUsd: { type: 'number' },
        targetDemographic: { type: 'string' }
      },
      required: ['campaignName', 'headline', 'bidAmountUsd']
    }),
    isHighRisk: true, // Elevates to human approval if budget > threshold
    category: 'ads'
  },
  {
    id: 'update_catalog',
    name: 'Update Catalog Listings',
    description: 'Updates a specific inventory item price or stock levels in the market catalog.',
    parametersSchema: JSON.stringify({
      type: 'object',
      properties: {
        itemId: { type: 'string' },
        newPriceUsd: { type: 'number' },
        stockDelta: { type: 'number' }
      },
      required: ['itemId']
    }),
    isHighRisk: true,
    category: 'market'
  },
  {
    id: 'generate_report',
    name: 'Generate Executive Report',
    description: 'Generates a PDF/Excel report from recent ledger transactions and saves it to cloud storage.',
    parametersSchema: JSON.stringify({
      type: 'object',
      properties: {
        timeframe: { type: 'string', enum: ['daily', 'weekly', 'monthly'] },
        metricScope: { type: 'string', enum: ['ledger', 'ads', 'webhooks', 'system_performance'] }
      },
      required: ['timeframe', 'metricScope']
    }),
    isHighRisk: false,
    category: 'business'
  },
  {
    id: 'draft_support_reply',
    name: 'Draft Support Ticket Reply',
    description: 'Composes a customer-centric email response matching past resolution templates.',
    parametersSchema: JSON.stringify({
      type: 'object',
      properties: {
        ticketId: { type: 'string' },
        replyBody: { type: 'string' },
        escalate: { type: 'boolean' }
      },
      required: ['ticketId', 'replyBody']
    }),
    isHighRisk: false,
    category: 'support'
  },
  {
    id: 'analyze_business_metrics',
    name: 'Analyze Financial Metrics',
    description: 'Performs projection analysis on raw ledger streams to compute monthly growth charts.',
    parametersSchema: JSON.stringify({
      type: 'object',
      properties: {
        tenantId: { type: 'string' },
        projectionMonths: { type: 'number', default: 3 }
      },
      required: ['tenantId']
    }),
    isHighRisk: false,
    category: 'finance'
  }
];

export const SEED_AI_AGENTS: AIAgent[] = [
  {
    id: 'agent_omni_assistant',
    name: 'OMNI Assistant',
    type: 'OMNI Assistant',
    description: 'Central operations orchestrator and direct workspace navigation assistant.',
    basePrompt: 'You are the primary OMNI Digital Assistant. Your role is to help users navigate their global digital workspace, trigger domain micro-agents, answer ledger queries, and parse operations. Always coordinate multi-tenant permissions.',
    defaultModelId: 'gemini-2.5-flash',
    autonomyLevel: 2,
    allowedTools: ['search_products', 'generate_report', 'draft_support_reply'],
    requiredScopes: ['identity.read', 'wallet.read', 'notifications.write'],
    maxMonetaryLimit: 100,
    approvalRequiredAbove: 20,
    avatar: 'Sparkles'
  },
  {
    id: 'agent_seller_ai',
    name: 'OMNI Seller AI',
    type: 'Seller AI',
    description: 'Smart pricing optimizer and merchant inventory catalog maintainer.',
    basePrompt: 'You are OMNI Seller AI. Your purpose is to audit product descriptions, optimize pricing points depending on wholesale supply indices, and synchronize catalog entries.',
    defaultModelId: 'gemini-2.5-flash',
    autonomyLevel: 3,
    allowedTools: ['search_products', 'update_catalog', 'generate_report'],
    requiredScopes: ['market.write', 'catalog.edit'],
    maxMonetaryLimit: 500,
    approvalRequiredAbove: 100,
    avatar: 'ShoppingBag'
  },
  {
    id: 'agent_business_ai',
    name: 'Corporate Business AI',
    type: 'Business AI',
    description: 'Corporate contracts processor, tax compliance scanner, and HR assistant.',
    basePrompt: 'You are Business AI. Your role is to audit contract documents, organize compliance templates, and handle background tax estimation math.',
    defaultModelId: 'gemini-2.5-pro',
    autonomyLevel: 1,
    allowedTools: ['generate_report', 'analyze_business_metrics'],
    requiredScopes: ['business.admin', 'ledger.read'],
    maxMonetaryLimit: 1000,
    approvalRequiredAbove: 50,
    avatar: 'Briefcase'
  },
  {
    id: 'agent_ads_ai',
    name: 'Targeting Ads AI',
    type: 'Ads AI',
    description: 'Multi-channel promotional copywriter and contextual bidding supervisor.',
    basePrompt: 'You are OMNI Ads AI. You generate marketing copies, optimize keyword bids, and setup dynamic ad target vectors.',
    defaultModelId: 'gemini-2.5-flash',
    autonomyLevel: 4,
    allowedTools: ['create_draft_campaign', 'generate_report'],
    requiredScopes: ['ads.write', 'ads.analytics'],
    maxMonetaryLimit: 2500,
    approvalRequiredAbove: 500,
    avatar: 'Megaphone'
  },
  {
    id: 'agent_creator_ai',
    name: 'Asset Synthesizer AI',
    type: 'Creator AI',
    description: 'Rich generative creative copywriter and media layout synthesizer.',
    basePrompt: 'You are Creator AI. You translate abstract prompts into rich media layout coordinates, generate SEO copy blocks, and allocate royalty codes.',
    defaultModelId: 'imagen-3',
    autonomyLevel: 3,
    allowedTools: ['create_draft_campaign'],
    requiredScopes: ['creator.write'],
    maxMonetaryLimit: 200,
    approvalRequiredAbove: 50,
    avatar: 'Cpu'
  },
  {
    id: 'agent_developer_ai',
    name: 'DevOps Architect AI',
    type: 'Developer AI',
    description: 'Vite sandbox reviewer, manifest lint advisor, and webhook schema checker.',
    basePrompt: 'You are Developer AI. Your duty is to analyze app manifests, validate webhook retry policies, and review sandboxed Node scripts.',
    defaultModelId: 'gemini-2.5-pro',
    autonomyLevel: 2,
    allowedTools: ['generate_report'],
    requiredScopes: ['developer.read', 'developer.write'],
    maxMonetaryLimit: 0,
    approvalRequiredAbove: 0,
    avatar: 'CodeXml'
  },
  {
    id: 'agent_support_ai',
    name: 'Intelligent Support AI',
    type: 'Support AI',
    description: 'Interactive helpdesk ticket resolver and automatic FAQ draft bot.',
    basePrompt: 'You are Support AI. Synthesize highly professional client support communications, consult known FAQ catalogs, and draft ticketing responses.',
    defaultModelId: 'gemini-2.5-flash',
    autonomyLevel: 4,
    allowedTools: ['draft_support_reply', 'search_products'],
    requiredScopes: ['support.read', 'support.write'],
    maxMonetaryLimit: 50,
    approvalRequiredAbove: 10,
    avatar: 'MessageSquare'
  },
  {
    id: 'agent_logistics_ai',
    name: 'Supply Routing AI',
    type: 'Logistics AI',
    description: 'Cold-chain shipping planner and global routing telemetry advisor.',
    basePrompt: 'You are Logistics AI. Keep track of shipping coordinates, simulate carrier routes, and predict custom clearance delays.',
    defaultModelId: 'gemini-2.5-flash',
    autonomyLevel: 2,
    allowedTools: ['generate_report'],
    requiredScopes: ['logistics.read', 'logistics.write'],
    maxMonetaryLimit: 5000,
    approvalRequiredAbove: 1000,
    avatar: 'Truck'
  },
  {
    id: 'agent_learning_ai',
    name: 'Academy Learning AI',
    type: 'Learning AI',
    description: 'Personalized onboarding course designer and skill grading reviewer.',
    basePrompt: 'You are Learning AI. Compile customized educational curricula for OMNI profiles and draft onboarding training plans.',
    defaultModelId: 'gemini-2.5-flash',
    autonomyLevel: 1,
    allowedTools: ['generate_report'],
    requiredScopes: ['learn.read'],
    maxMonetaryLimit: 0,
    approvalRequiredAbove: 0,
    avatar: 'GraduationCap'
  },
  {
    id: 'agent_finance_ai',
    name: 'Ledger Audit AI',
    type: 'Finance Analysis AI',
    description: 'Ledger stream fraud monitor and automated corporate budget predictor.',
    basePrompt: 'You are Finance Analysis AI. Audit ledger double-entries, check multi-currency spot conversions, and evaluate cash flows.',
    defaultModelId: 'gemini-2.5-pro',
    autonomyLevel: 1,
    allowedTools: ['generate_report', 'analyze_business_metrics'],
    requiredScopes: ['ledger.read', 'billing.read'],
    maxMonetaryLimit: 0,
    approvalRequiredAbove: 0,
    avatar: 'TrendingUp'
  }
];

export const SEED_AI_PROMPTS: AIPrompt[] = [
  {
    id: 'prompt_support_standard',
    name: 'Polite Ticket Resolution',
    template: 'Greetings {{customerName}},\n\nThank you for contacting OMNI Support. Regarding your query about ticket #{{ticketId}}, our core ledger has confirmed {{statusSummary}}.\n\nBest regards,\n{{agentName}}',
    category: 'customer_support',
    version: '1.2',
    variables: ['customerName', 'ticketId', 'statusSummary', 'agentName']
  },
  {
    id: 'prompt_ads_catchy',
    name: 'SaaS Dynamic Hook Generator',
    template: 'Generate a highly engaging micro-campaign headline for {{productName}} focusing on {{targetBenefit}}. Keep the headline under 50 characters and ensure the tone is professional but energetic.',
    category: 'content_generation',
    version: '2.0',
    variables: ['productName', 'targetBenefit']
  },
  {
    id: 'prompt_finance_projection',
    name: 'Pro-Forma Ledger Analysis',
    template: 'Analyze the following credit/debit stream of tenant {{tenantId}}. Filter out non-recurrent transactions and formulate a {{projectionMonths}} months projection emphasizing net operating margins.',
    category: 'financial',
    version: '1.0',
    variables: ['tenantId', 'projectionMonths']
  }
];

export const SEED_AI_KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: 'know_dynasty_kb',
    name: 'Dynasty Operations Protocol.pdf',
    type: 'document',
    sizeKb: 1240,
    chunkCount: 320,
    status: 'indexed',
    orgId: 'org_dynasty',
    urlOrPath: '/storage/dynasty/docs/ops_protocol.pdf',
    createdAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'know_market_catalog',
    name: 'OMNI Global Wholesalers Stream',
    type: 'database',
    sizeKb: 8940,
    chunkCount: 1540,
    status: 'indexed',
    orgId: 'org_dynasty',
    urlOrPath: 'spanner://omni-main/catalog',
    createdAt: '2026-08-05T08:30:00Z'
  },
  {
    id: 'know_support_handbook',
    name: 'Support FAQ Base',
    type: 'website',
    sizeKb: 450,
    chunkCount: 95,
    status: 'indexed',
    orgId: 'org_dynasty',
    urlOrPath: 'https://support.omni.com/faq',
    createdAt: '2026-08-10T15:00:00Z'
  }
];

export const SEED_AI_COST_RECORDS: AICostRecord[] = [
  {
    id: 'cost_01',
    timestamp: '2026-08-15T01:00:00Z',
    modelId: 'gemini-2.5-flash',
    inputTokens: 14500,
    outputTokens: 4200,
    requestCount: 8,
    organizationId: 'org_dynasty',
    appId: 'app_ads',
    agentId: 'agent_ads_ai',
    userId: 'usr_gideon',
    estimatedCost: 0.00235
  },
  {
    id: 'cost_02',
    timestamp: '2026-08-15T01:15:00Z',
    modelId: 'gemini-2.5-pro',
    inputTokens: 45000,
    outputTokens: 12800,
    requestCount: 5,
    organizationId: 'org_dynasty',
    appId: 'app_business',
    agentId: 'agent_business_ai',
    userId: 'usr_gideon',
    estimatedCost: 0.12025
  },
  {
    id: 'cost_03',
    timestamp: '2026-08-15T02:30:00Z',
    modelId: 'imagen-3',
    inputTokens: 1, // Counted per call
    outputTokens: 0,
    requestCount: 3,
    organizationId: 'org_dynasty',
    appId: 'app_creator',
    agentId: 'agent_creator_ai',
    userId: 'usr_gideon',
    estimatedCost: 0.09000
  }
];

export const SEED_AI_BUDGETS: AIBudgetConfig[] = [
  {
    id: 'budget_dynasty',
    organizationId: 'org_dynasty',
    monthlyLimit: 150,
    currentSpent: 42.85,
    alertThreshold: 80,
    alertsTriggered: false
  },
  {
    id: 'budget_standard',
    organizationId: 'org_standard_id_placeholder',
    monthlyLimit: 25,
    currentSpent: 22.40,
    alertThreshold: 80,
    alertsTriggered: true // Triggered alert state!
  }
];

export const SEED_AI_AUTONOMY_RULES: AIAutonomyRule[] = [
  {
    id: 'rule_01',
    scopeType: 'tenant',
    scopeId: 'org_dynasty',
    maxAutonomyLevel: 4,
    notes: 'Allows highly autonomous operations under verified organization protocols.'
  },
  {
    id: 'rule_02',
    scopeType: 'app',
    scopeId: 'app_pay',
    maxAutonomyLevel: 1,
    notes: 'Strict limitation: finance app must always maintain level 1 (human in the loop).'
  },
  {
    id: 'rule_03',
    scopeType: 'tool',
    scopeId: 'update_catalog',
    maxAutonomyLevel: 2,
    notes: 'Catalog modification capped at Level 2 (requires silent matching or confirmation).'
  }
];

export const SEED_AI_APPROVAL_TASKS: AIApprovalTask[] = [
  {
    id: 'task_appr_01',
    agentId: 'agent_ads_ai',
    agentName: 'Targeting Ads AI',
    toolId: 'create_draft_campaign',
    toolName: 'Create Draft Ad Campaign',
    arguments: {
      campaignName: 'Dynasty Autumn Launch',
      headline: 'The Future of Operations is OMNI',
      bidAmountUsd: 650.00,
      targetDemographic: 'Logistics Decision Makers'
    },
    proposedPayload: { action: 'register_campaign', biddingProfileId: 'bid_profile_autumn_99' },
    status: 'pending',
    requestDate: '2026-08-15T02:40:00Z',
    organizationId: 'org_dynasty',
    appId: 'app_ads',
    estimatedCost: 0.005,
    policyCheckSummary: 'Bid amount ($650.00) exceeds agent threshold limit of $500.00.'
  },
  {
    id: 'task_appr_02',
    agentId: 'agent_seller_ai',
    agentName: 'OMNI Seller AI',
    toolId: 'update_catalog',
    toolName: 'Update Catalog Listings',
    arguments: {
      itemId: 'prod_bulk_copper_99',
      newPriceUsd: 14500.00,
      stockDelta: 20
    },
    proposedPayload: { action: 'modify_listing', sku: 'COP-BULK-99' },
    status: 'approved',
    requestDate: '2026-08-15T01:10:00Z',
    decisionDate: '2026-08-15T01:12:00Z',
    deciderUserId: 'usr_gideon',
    organizationId: 'org_dynasty',
    appId: 'app_market',
    estimatedCost: 0.002,
    policyCheckSummary: 'Price modification exceeds $10,000.00 threshold.'
  }
];

export const SEED_AI_AUDIT_LOGS: AIAuditLog[] = [
  {
    id: 'ai_audit_01',
    timestamp: '2026-08-15T02:40:00Z',
    userId: 'usr_gideon',
    userEmail: 'gideonoluwalanadynasty@gmail.com',
    agentId: 'agent_ads_ai',
    agentName: 'Targeting Ads AI',
    toolId: 'create_draft_campaign',
    toolName: 'Create Draft Ad Campaign',
    policyDecision: 'Elevated to Human Approval Center',
    resultSummary: 'Enqueued task task_appr_01 for approval.',
    status: 'pending_approval',
    approvalState: 'pending',
    organizationId: 'org_dynasty',
    estimatedCost: 0.0001
  },
  {
    id: 'ai_audit_02',
    timestamp: '2026-08-15T01:12:00Z',
    userId: 'usr_gideon',
    userEmail: 'gideonoluwalanadynasty@gmail.com',
    agentId: 'agent_seller_ai',
    agentName: 'OMNI Seller AI',
    toolId: 'update_catalog',
    toolName: 'Update Catalog Listings',
    policyDecision: 'Approved by human decider usr_gideon',
    resultSummary: 'Item prod_bulk_copper_99 successfully adjusted to $14500.00 (+20 stock).',
    status: 'success',
    approvalState: 'approved',
    organizationId: 'org_dynasty',
    estimatedCost: 0.0024
  },
  {
    id: 'ai_audit_03',
    timestamp: '2026-08-15T00:45:00Z',
    userId: 'usr_gideon',
    userEmail: 'gideonoluwalanadynasty@gmail.com',
    agentId: 'agent_omni_assistant',
    agentName: 'OMNI Assistant',
    toolId: 'search_products',
    toolName: 'Search Product Catalog',
    policyDecision: 'Auto-Approved (Level 2, Low-Risk)',
    resultSummary: 'Search returned 4 active copper packaging listings.',
    status: 'success',
    approvalState: 'not_applicable',
    organizationId: 'org_dynasty',
    estimatedCost: 0.00008
  }
];

export const SEED_AI_CONVERSATIONS: AIConversation[] = [
  {
    id: 'conv_01',
    agentId: 'agent_omni_assistant',
    userId: 'usr_gideon',
    organizationId: 'org_dynasty',
    appId: 'app_home',
    messages: [
      {
        id: 'msg_01',
        role: 'user',
        content: 'Show me my current wallet balance and search our packaging directory.',
        timestamp: '2026-08-15T00:43:00Z'
      },
      {
        id: 'msg_02',
        role: 'assistant',
        content: 'Analyzing tenant wallet balance... Your active organization wallet (Dynasty Global Holdings) holds exactly 1,240,500.00 USD. Let me search the Wholesaler Catalog for packaging options.',
        timestamp: '2026-08-15T00:44:00Z'
      },
      {
        id: 'msg_03',
        role: 'assistant',
        content: 'I have executed the Search Product Catalog tool. Results show:\n- *Cardboard Pallets V2* (Unit price: $4.50)\n- *Biodegradable Copper Wrapping* (Unit price: $12.00)\n\nWould you like me to formulate an advertising outline or ledger voucher regarding these items?',
        timestamp: '2026-08-15T00:45:00Z',
        toolCallId: 'tool_call_99',
        toolName: 'Search Product Catalog',
        toolStatus: 'completed'
      }
    ],
    createdAt: '2026-08-15T00:42:00Z',
    updatedAt: '2026-08-15T00:45:00Z'
  }
];

// ==========================================
// PROMPT 4 — KNOWLEDGE SPACES SEED DATA
// ==========================================

export const SEED_OMNI_KNOWLEDGE_SPACES: OmniKnowledgeSpace[] = [
  {
    id: 'space_company_knowledge',
    organizationId: 'org_dynasty',
    name: 'Company Knowledge & Governance',
    category: 'company_knowledge',
    description: 'Master repository of internal operating procedures, corporate bylaws, governance protocols, and executive directives.',
    icon: 'Building2',
    color: '#3B82F6',
    isPrivate: false,
    ownerUserId: 'usr_gideon',
    allowedRoles: ['admin', 'executive', 'member'],
    allowedUserIds: ['usr_gideon', 'usr_sarah', 'usr_marcus'],
    sourceCount: 8,
    chunkCount: 1420,
    totalSizeBytes: 28400000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 365,
    autoSyncEnabled: true,
    lastSyncTimestamp: '2026-08-15T08:30:00Z',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-15T08:30:00Z'
  },
  {
    id: 'space_my_research',
    organizationId: 'org_dynasty',
    name: 'Executive AI & Market Research',
    category: 'my_research',
    description: 'Personalized research dossier containing market intelligence, competitor teardowns, sovereign cloud economics, and academic papers.',
    icon: 'Microscope',
    color: '#8B5CF6',
    isPrivate: true,
    ownerUserId: 'usr_gideon',
    allowedRoles: ['admin'],
    allowedUserIds: ['usr_gideon'],
    sourceCount: 12,
    chunkCount: 2680,
    totalSizeBytes: 54100000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 730,
    autoSyncEnabled: false,
    lastSyncTimestamp: '2026-08-14T19:00:00Z',
    createdAt: '2026-08-03T14:20:00Z',
    updatedAt: '2026-08-14T19:00:00Z'
  },
  {
    id: 'space_product_manuals',
    organizationId: 'org_dynasty',
    name: 'Product Manuals & Specifications',
    category: 'product_manuals',
    description: 'Technical data sheets, API documentation, industrial equipment schematics, and developer reference blueprints.',
    icon: 'BookOpen',
    color: '#10B981',
    isPrivate: false,
    ownerUserId: 'usr_gideon',
    allowedRoles: ['admin', 'member', 'developer', 'viewer'],
    allowedUserIds: [],
    sourceCount: 15,
    chunkCount: 3950,
    totalSizeBytes: 72000000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 180,
    autoSyncEnabled: true,
    lastSyncTimestamp: '2026-08-15T06:00:00Z',
    createdAt: '2026-08-05T09:00:00Z',
    updatedAt: '2026-08-15T06:00:00Z'
  },
  {
    id: 'space_legal_compliance',
    organizationId: 'org_dynasty',
    name: 'Legal & Regulatory Vaults',
    category: 'legal_documents',
    description: 'Classified commercial contracts, NDAs, patent filings, EU AI Act compliance audits, and data privacy safeguards.',
    icon: 'Scale',
    color: '#F59E0B',
    isPrivate: false,
    ownerUserId: 'usr_gideon',
    allowedRoles: ['admin', 'legal_counsel', 'compliance_officer'],
    allowedUserIds: ['usr_gideon', 'usr_sarah'],
    sourceCount: 6,
    chunkCount: 1100,
    totalSizeBytes: 19500000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 1825, // 5 years
    autoSyncEnabled: false,
    lastSyncTimestamp: '2026-08-12T11:45:00Z',
    createdAt: '2026-08-02T11:00:00Z',
    updatedAt: '2026-08-12T11:45:00Z'
  },
  {
    id: 'space_policies',
    organizationId: 'org_dynasty',
    name: 'Employee Handbook & HR Policies',
    category: 'policies',
    description: 'Human resources policies, travel allowances, code of ethics, health benefits, and remote work guidelines.',
    icon: 'ShieldCheck',
    color: '#06B6D4',
    isPrivate: false,
    ownerUserId: 'usr_sarah',
    allowedRoles: ['*'],
    allowedUserIds: [],
    sourceCount: 4,
    chunkCount: 620,
    totalSizeBytes: 8900000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 365,
    autoSyncEnabled: true,
    lastSyncTimestamp: '2026-08-15T00:00:00Z',
    createdAt: '2026-08-01T08:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'space_marketing_materials',
    organizationId: 'org_dynasty',
    name: 'Brand Guidelines & Campaign Assets',
    category: 'marketing_materials',
    description: 'Logos, tone of voice, ad copy blueprints, case studies, press releases, and global partner pitch decks.',
    icon: 'Megaphone',
    color: '#EC4899',
    isPrivate: false,
    ownerUserId: 'usr_gideon',
    allowedRoles: ['admin', 'marketer', 'member'],
    allowedUserIds: [],
    sourceCount: 9,
    chunkCount: 840,
    totalSizeBytes: 31000000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 365,
    autoSyncEnabled: true,
    lastSyncTimestamp: '2026-08-13T16:30:00Z',
    createdAt: '2026-08-04T12:00:00Z',
    updatedAt: '2026-08-13T16:30:00Z'
  },
  {
    id: 'space_fenol_ledger',
    organizationId: 'org_dynasty',
    name: 'FENOL Financial & Audit Archive',
    category: 'custom',
    description: 'Double-entry cryptographic ledger audits, international currency settlement proofs, and tax reserve schedules.',
    icon: 'Landmark',
    color: '#6366F1',
    isPrivate: false,
    ownerUserId: 'usr_gideon',
    allowedRoles: ['admin', 'cfo', 'auditor'],
    allowedUserIds: ['usr_gideon'],
    sourceCount: 11,
    chunkCount: 3120,
    totalSizeBytes: 64200000,
    vectorDimension: 1536,
    defaultEmbeddingModel: 'gemini-embedding-004',
    retentionDays: 2555, // 7 years
    autoSyncEnabled: true,
    lastSyncTimestamp: '2026-08-15T07:15:00Z',
    createdAt: '2026-08-01T06:00:00Z',
    updatedAt: '2026-08-15T07:15:00Z'
  }
];

// ==========================================
// KNOWLEDGE SOURCES SEED DATA
// ==========================================

export const SEED_OMNI_KNOWLEDGE_SOURCES: OmniKnowledgeSource[] = [
  {
    id: 'src_ops_protocol',
    spaceId: 'space_company_knowledge',
    organizationId: 'org_dynasty',
    name: 'Dynasty Operations Protocol & Invariants (2026).pdf',
    sourceType: 'pdf',
    format: 'application/pdf',
    sizeBytes: 1240000,
    uri: '/storage/dynasty/docs/ops_protocol_v26.pdf',
    isLinkedOnly: false,
    status: 'indexed',
    ingestionStage: 'ready',
    ingestionProgress: 100,
    securityScanStatus: 'clean',
    securityScanTimestamp: '2026-08-01T10:05:00Z',
    metadata: {
      author: 'Gideon Oluwalana',
      title: 'Global Operating Protocols',
      department: 'Executive Operations',
      version: '2.6',
      classification: 'Confidential'
    },
    aclRules: [
      { id: 'acl_1', entityType: 'role', entityId: 'admin', permission: 'read_write' },
      { id: 'acl_2', entityType: 'role', entityId: 'member', permission: 'read' }
    ],
    chunkCount: 320,
    totalTokens: 64000,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:06:00Z'
  },
  {
    id: 'src_sovereign_whitepaper',
    spaceId: 'space_my_research',
    organizationId: 'org_dynasty',
    name: 'Sovereign Cloud Hardware Enclave Specifications.docx',
    sourceType: 'office_file',
    format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    sizeBytes: 3450000,
    uri: '/storage/research/sovereign_enclave_specs.docx',
    isLinkedOnly: false,
    status: 'indexed',
    ingestionStage: 'ready',
    ingestionProgress: 100,
    securityScanStatus: 'clean',
    securityScanTimestamp: '2026-08-03T14:25:00Z',
    metadata: {
      author: 'OMNI Core Engineering',
      title: 'Hardware Enclave Security Profile',
      department: 'R&D',
      version: '4.0'
    },
    aclRules: [
      { id: 'acl_3', entityType: 'user', entityId: 'usr_gideon', permission: 'admin' }
    ],
    chunkCount: 540,
    totalTokens: 112000,
    createdAt: '2026-08-03T14:20:00Z',
    updatedAt: '2026-08-03T14:28:00Z'
  },
  {
    id: 'src_linked_s3_manuals',
    spaceId: 'space_product_manuals',
    organizationId: 'org_dynasty',
    name: 'Industrial Robotics CAD & Firmware Archive (Linked S3)',
    sourceType: 'cloud_connector',
    format: 'linked_bucket/s3',
    sizeBytes: 480000000, // 480MB linked without duplication
    uri: 's3://dynasty-sovereign-vaults/firmware/2026-v8.tar.gz',
    isLinkedOnly: true,
    status: 'indexed',
    ingestionStage: 'ready',
    ingestionProgress: 100,
    securityScanStatus: 'clean',
    securityScanTimestamp: '2026-08-05T09:15:00Z',
    metadata: {
      externalBucket: 'dynasty-sovereign-vaults',
      region: 'us-east-1',
      linkedArchitecture: 'Zero-Duplication Proxy',
      syncSchedule: 'daily'
    },
    aclRules: [
      { id: 'acl_4', entityType: 'role', entityId: 'developer', permission: 'read' },
      { id: 'acl_5', entityType: 'role', entityId: 'admin', permission: 'admin' }
    ],
    chunkCount: 1850,
    totalTokens: 380000,
    createdAt: '2026-08-05T09:00:00Z',
    updatedAt: '2026-08-15T06:00:00Z'
  },
  {
    id: 'src_eu_ai_act_compliance',
    spaceId: 'space_legal_compliance',
    organizationId: 'org_dynasty',
    name: 'EU AI Act High-Risk System Compliance Audit 2026.pdf',
    sourceType: 'pdf',
    format: 'application/pdf',
    sizeBytes: 2100000,
    uri: '/storage/legal/eu_ai_act_compliance_2026.pdf',
    isLinkedOnly: false,
    status: 'indexed',
    ingestionStage: 'ready',
    ingestionProgress: 100,
    securityScanStatus: 'clean',
    securityScanTimestamp: '2026-08-02T11:05:00Z',
    metadata: {
      jurisdiction: 'European Union',
      auditFirm: 'Sovereign Legal Global LLP',
      riskTier: 'High-Risk System (Article 6 & 14 Compliant)'
    },
    aclRules: [
      { id: 'acl_6', entityType: 'role', entityId: 'admin', permission: 'read_write' },
      { id: 'acl_7', entityType: 'role', entityId: 'legal_counsel', permission: 'read' }
    ],
    chunkCount: 420,
    totalTokens: 85000,
    createdAt: '2026-08-02T11:00:00Z',
    updatedAt: '2026-08-02T11:08:00Z'
  },
  {
    id: 'src_handbook_hr',
    spaceId: 'space_policies',
    organizationId: 'org_dynasty',
    name: 'Dynasty Employee Handbook & Benefits 2026.pdf',
    sourceType: 'pdf',
    format: 'application/pdf',
    sizeBytes: 890000,
    uri: '/storage/hr/employee_handbook_2026.pdf',
    isLinkedOnly: false,
    status: 'indexed',
    ingestionStage: 'ready',
    ingestionProgress: 100,
    securityScanStatus: 'clean',
    securityScanTimestamp: '2026-08-01T08:10:00Z',
    metadata: {
      hrLead: 'Sarah Jenkins',
      effectiveDate: '2026-01-01',
      reviewCycle: 'Annual'
    },
    aclRules: [
      { id: 'acl_8', entityType: 'role', entityId: '*', permission: 'read' }
    ],
    chunkCount: 180,
    totalTokens: 36000,
    createdAt: '2026-08-01T08:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  }
];

// ==========================================
// KNOWLEDGE CHUNKS SAMPLE SEED DATA
// ==========================================

export const SEED_OMNI_KNOWLEDGE_CHUNKS: OmniKnowledgeChunk[] = [
  {
    id: 'chk_ops_01',
    sourceId: 'src_ops_protocol',
    spaceId: 'space_company_knowledge',
    organizationId: 'org_dynasty',
    chunkIndex: 0,
    text: 'Dynasty Global Holdings Protocol Section 1.1: Sovereign Invariant Principles. All business applications interacting with the central ledger must maintain zero-knowledge encryption envelopes and verify human autonomy approval above $20.00 threshold.',
    tokenCount: 42,
    embeddingVectorPreview: [0.024, -0.018, 0.089, -0.045, 0.112],
    metadata: { section: '1.1', topic: 'Sovereign Invariant' },
    aclRules: [{ id: 'acl_chk_1', entityType: 'role', entityId: 'member', permission: 'read' }],
    pageNumber: 1,
    createdAt: '2026-08-01T10:06:00Z'
  },
  {
    id: 'chk_ops_02',
    sourceId: 'src_ops_protocol',
    spaceId: 'space_company_knowledge',
    organizationId: 'org_dynasty',
    chunkIndex: 1,
    text: 'Section 1.2: Multi-Model Routing Mandate. Upstream model failures trigger dynamic circuit breakers with automated failover from frontier cloud endpoints to localized private vLLM nodes in less than 35ms.',
    tokenCount: 38,
    embeddingVectorPreview: [0.051, 0.012, -0.034, 0.092, 0.067],
    metadata: { section: '1.2', topic: 'Circuit Breaker Failover' },
    aclRules: [{ id: 'acl_chk_2', entityType: 'role', entityId: 'member', permission: 'read' }],
    pageNumber: 2,
    createdAt: '2026-08-01T10:06:00Z'
  },
  {
    id: 'chk_legal_01',
    sourceId: 'src_eu_ai_act_compliance',
    spaceId: 'space_legal_compliance',
    organizationId: 'org_dynasty',
    chunkIndex: 0,
    text: 'EU AI Act Article 14 Compliance Statement: The OMNI Human Approval Center provides verifiable human oversight for all high-risk autonomous workflows, storing immutable cryptographic proofs of every approval and rejection.',
    tokenCount: 45,
    embeddingVectorPreview: [-0.014, 0.076, 0.043, -0.088, 0.031],
    metadata: { article: '14', legalReviewDate: '2026-07-20' },
    aclRules: [{ id: 'acl_chk_3', entityType: 'role', entityId: 'legal_counsel', permission: 'read' }],
    pageNumber: 1,
    createdAt: '2026-08-02T11:08:00Z'
  },
  {
    id: 'chk_hr_01',
    sourceId: 'src_handbook_hr',
    spaceId: 'space_policies',
    organizationId: 'org_dynasty',
    chunkIndex: 0,
    text: 'Employee Handbook Clause 4: Remote Work and Digital Equipment Stipend. Dynasty employees receive a $1,500 annual equipment grant and flexible asynchronous hours across all registered global operating nodes.',
    tokenCount: 36,
    embeddingVectorPreview: [0.033, -0.042, 0.019, 0.061, -0.027],
    metadata: { chapter: '4', benefitType: 'Equipment Stipend' },
    aclRules: [{ id: 'acl_chk_4', entityType: 'role', entityId: '*', permission: 'read' }],
    pageNumber: 4,
    createdAt: '2026-08-01T08:10:00Z'
  }
];

// ==========================================
// 5-TIER MEMORY SYSTEM SEED DATA
// ==========================================

export const SEED_OMNI_MEMORY_ITEMS: OmniMemoryItem[] = [
  // 1. Conversation Context Tier
  {
    id: 'mem_conv_01',
    tier: 'conversation_context',
    organizationId: 'org_dynasty',
    userId: 'usr_gideon',
    agentId: 'agent_omni_assistant',
    conversationId: 'conv_01',
    key: 'active_session_goal',
    value: 'User is auditing wholesale copper packaging listings and checking ledger wallet balance.',
    importance: 0.8,
    isSensitive: false,
    ttlSeconds: 86400,
    accessCount: 14,
    lastAccessedAt: '2026-08-15T09:10:00Z',
    createdAt: '2026-08-15T00:43:00Z',
    updatedAt: '2026-08-15T00:45:00Z'
  },
  // 2. User Memory Tier
  {
    id: 'mem_user_01',
    tier: 'user_memory',
    organizationId: 'org_dynasty',
    userId: 'usr_gideon',
    key: 'preferred_code_syntax',
    value: 'Strict TypeScript with explicit interfaces, functional React components, Tailwind CSS styling, and zero any types.',
    importance: 0.95,
    isSensitive: false,
    accessCount: 48,
    lastAccessedAt: '2026-08-15T08:00:00Z',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-10T12:00:00Z'
  },
  {
    id: 'mem_user_02',
    tier: 'user_memory',
    organizationId: 'org_dynasty',
    userId: 'usr_gideon',
    key: 'tone_and_format_preference',
    value: 'Prefers concise, executive-level summaries, bold key metrics, and mathematical explanations over verbose marketing prose.',
    importance: 0.9,
    isSensitive: false,
    accessCount: 32,
    lastAccessedAt: '2026-08-15T07:30:00Z',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-12T10:00:00Z'
  },
  // 3. Application Memory Tier
  {
    id: 'mem_app_01',
    tier: 'application_memory',
    organizationId: 'org_dynasty',
    appId: 'app_market',
    key: 'default_catalog_sort_order',
    value: 'Sort by verified supplier rating DESC, then stock availability DESC.',
    importance: 0.7,
    isSensitive: false,
    accessCount: 120,
    lastAccessedAt: '2026-08-15T09:00:00Z',
    createdAt: '2026-08-02T10:00:00Z',
    updatedAt: '2026-08-02T10:00:00Z'
  },
  // 4. Organisation Knowledge Tier
  {
    id: 'mem_org_01',
    tier: 'organisation_knowledge',
    organizationId: 'org_dynasty',
    key: 'corporate_headquarters_timezone',
    value: 'Dynasty Global Holdings operates across UTC and EST time zones with financial settlement cutoffs at 17:00 EST daily.',
    importance: 0.85,
    isSensitive: false,
    accessCount: 89,
    lastAccessedAt: '2026-08-15T08:45:00Z',
    createdAt: '2026-08-01T06:00:00Z',
    updatedAt: '2026-08-01T06:00:00Z'
  },
  {
    id: 'mem_org_02',
    tier: 'organisation_knowledge',
    organizationId: 'org_dynasty',
    key: 'monetary_approval_threshold_usd',
    value: 'Standard monetary autonomy trigger threshold is $20.00 USD. Actions above this require Dual-Factor Human Approval Center authorization.',
    importance: 1.0,
    isSensitive: false,
    accessCount: 215,
    lastAccessedAt: '2026-08-15T09:30:00Z',
    createdAt: '2026-08-01T06:00:00Z',
    updatedAt: '2026-08-01T06:00:00Z'
  },
  // 5. Agent Memory Tier
  {
    id: 'mem_agent_01',
    tier: 'agent_memory',
    organizationId: 'org_dynasty',
    agentId: 'agent_fenol_ai',
    key: 'learned_arbitrage_heuristic',
    value: 'When cross-currency spreads between USD and EUR widen beyond 0.0042, favor sovereign SEPA routing to minimize FX conversion friction.',
    importance: 0.92,
    isSensitive: true,
    accessCount: 65,
    lastAccessedAt: '2026-08-15T09:12:00Z',
    createdAt: '2026-08-04T15:00:00Z',
    updatedAt: '2026-08-14T18:00:00Z'
  }
];

// ==========================================
// KNOWLEDGE ASSISTANTS SEED DATA
// ==========================================

export const SEED_OMNI_KNOWLEDGE_ASSISTANTS: OmniKnowledgeAssistant[] = [
  {
    id: 'asst_fenol_ai',
    organizationId: 'org_dynasty',
    name: 'FENOL AI Ledger & Sovereign Auditor',
    avatar: 'Landmark',
    description: 'Specialized enterprise assistant grounded in Dynasty financial ledgers, audit archives, and regulatory tax policies.',
    systemPrompt: 'You are FENOL AI, the sovereign financial intelligence engine. You provide strictly verified financial, ledger, and accounting analysis based exclusively on grounded knowledge spaces. Always cite source document references.',
    groundedSpaceIds: ['space_fenol_ledger', 'space_company_knowledge', 'space_legal_compliance'],
    retrievalTopK: 8,
    minimumRelevanceScore: 0.75,
    enforceStrictAcl: true,
    includeCitationsInResponse: true,
    allowFallbackToGeneralKnowledge: false,
    modelId: 'gemini-2.5-pro',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-15T08:00:00Z'
  },
  {
    id: 'asst_handbook_ai',
    organizationId: 'org_dynasty',
    name: 'Employee Handbook & HR Guide',
    avatar: 'ShieldCheck',
    description: 'Instant answers for team members on company benefits, leave policies, remote work grants, and corporate code of conduct.',
    systemPrompt: 'You are the Dynasty People & Culture Assistant. Answer employee questions clearly and kindly based on the verified Employee Handbook. Quote exact page numbers and clauses.',
    groundedSpaceIds: ['space_policies', 'space_company_knowledge'],
    retrievalTopK: 5,
    minimumRelevanceScore: 0.7,
    enforceStrictAcl: true,
    includeCitationsInResponse: true,
    allowFallbackToGeneralKnowledge: false,
    modelId: 'gemini-2.5-flash',
    createdAt: '2026-08-02T10:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'asst_research_ai',
    organizationId: 'org_dynasty',
    name: 'Executive Market & Academic Researcher',
    avatar: 'Microscope',
    description: 'Deep technical synthesizer capable of cross-referencing private academic dossiers, market forecasts, and patent archives.',
    systemPrompt: 'You are the Executive Research Intelligence Assistant. Provide rigorous, multi-faceted scientific and economic synthesis with formal peer-reviewed citation formats.',
    groundedSpaceIds: ['space_my_research', 'space_product_manuals'],
    retrievalTopK: 10,
    minimumRelevanceScore: 0.65,
    enforceStrictAcl: true,
    includeCitationsInResponse: true,
    allowFallbackToGeneralKnowledge: true,
    modelId: 'gemini-2.5-pro',
    createdAt: '2026-08-03T15:00:00Z',
    updatedAt: '2026-08-14T20:00:00Z'
  },
  {
    id: 'asst_product_support',
    organizationId: 'org_dynasty',
    name: 'Product Manuals & Technical Support Bot',
    avatar: 'BookOpen',
    description: 'Guides developers and field engineers through equipment blueprints, API endpoints, and hardware troubleshooting steps.',
    systemPrompt: 'You are the Technical Documentation & Support Agent. Provide step-by-step troubleshooting commands, code snippets, and schematic references directly from product manuals.',
    groundedSpaceIds: ['space_product_manuals'],
    retrievalTopK: 6,
    minimumRelevanceScore: 0.72,
    enforceStrictAcl: true,
    includeCitationsInResponse: true,
    allowFallbackToGeneralKnowledge: false,
    modelId: 'gemini-2.5-flash',
    createdAt: '2026-08-05T10:00:00Z',
    updatedAt: '2026-08-15T06:00:00Z'
  }
];

// ==========================================
// KNOWLEDGE CONNECTORS CONTRACT SEED DATA
// ==========================================

export const SEED_OMNI_KNOWLEDGE_CONNECTORS: OmniKnowledgeConnector[] = [
  {
    id: 'conn_gdrive',
    organizationId: 'org_dynasty',
    name: 'Google Workspace Drive Vault',
    connectorType: 'google_drive',
    icon: 'FolderSync',
    status: 'connected',
    authType: 'oauth2',
    targetSpaceId: 'space_company_knowledge',
    syncSchedule: 'hourly',
    linkedSourcesCount: 18,
    totalDocumentsIndexed: 142,
    lastSyncTimestamp: '2026-08-15T09:00:00Z',
    config: {
      folderId: 'dynasty_shared_executive_drive',
      includeSubfolders: true,
      allowedMimeTypes: ['application/pdf', 'application/vnd.google-apps.document', 'application/vnd.google-apps.spreadsheet']
    },
    createdAt: '2026-08-01T11:00:00Z'
  },
  {
    id: 'conn_notion',
    organizationId: 'org_dynasty',
    name: 'Notion Enterprise Knowledge Hub',
    connectorType: 'notion',
    icon: 'FileText',
    status: 'connected',
    authType: 'api_key',
    targetSpaceId: 'space_company_knowledge',
    syncSchedule: 'daily',
    linkedSourcesCount: 24,
    totalDocumentsIndexed: 88,
    lastSyncTimestamp: '2026-08-15T06:00:00Z',
    config: {
      workspaceName: 'Dynasty HQ Workspace',
      syncedDatabases: ['Engineering RFCs', 'Product Roadmaps', 'Meeting Summaries']
    },
    createdAt: '2026-08-02T14:00:00Z'
  },
  {
    id: 'conn_s3_firmware',
    organizationId: 'org_dynasty',
    name: 'AWS S3 Sovereign Enclave Buckets',
    connectorType: 's3_bucket',
    icon: 'Database',
    status: 'connected',
    authType: 'iam_role',
    targetSpaceId: 'space_product_manuals',
    syncSchedule: 'continuous',
    linkedSourcesCount: 8,
    totalDocumentsIndexed: 1850,
    lastSyncTimestamp: '2026-08-15T09:15:00Z',
    config: {
      bucketName: 'dynasty-sovereign-vaults',
      prefix: 'firmware/',
      zeroDuplicationMode: true
    },
    createdAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 'conn_github_enterprise',
    organizationId: 'org_dynasty',
    name: 'GitHub Enterprise Org Repositories',
    connectorType: 'github',
    icon: 'GitBranch',
    status: 'connected',
    authType: 'oauth2',
    targetSpaceId: 'space_product_manuals',
    syncSchedule: 'daily',
    linkedSourcesCount: 14,
    totalDocumentsIndexed: 420,
    lastSyncTimestamp: '2026-08-14T22:00:00Z',
    config: {
      organization: 'dynasty-global',
      trackReadmeAndDocsOnly: true
    },
    createdAt: '2026-08-04T16:00:00Z'
  }
];

// ==========================================
// 7 MANDATORY DIAGNOSTIC TESTS SEED DATA
// ==========================================

export const SEED_OMNI_DIAGNOSTIC_TESTS: OmniDiagnosticTestResult[] = [
  {
    id: 'diag_test_1',
    testName: 'Deleted Documents Purge Invariant',
    category: 'lifecycle',
    description: 'Validates that chunks from deleted or unlinked sources are instantaneously removed from vector index and model context.',
    status: 'passed',
    latencyMs: 14,
    evidenceSnippet: 'Verified: 0 residual vectors found in index after deleting temp source test_doc_99.',
    executedAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'diag_test_2',
    testName: 'Revoked Permissions Zero-Leakage (ACL Barrier)',
    category: 'acl_security',
    description: 'Ensures that an unauthorized user or agent is blocked from retrieving sensitive chunks before model context synthesis.',
    status: 'passed',
    latencyMs: 8,
    evidenceSnippet: 'Verified: usr_viewer blocked from accessing executive legal document eu_ai_act_compliance (HTTP 403 ACL Denied).',
    executedAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'diag_test_3',
    testName: 'Conflicting Documents Reconciliation',
    category: 'reconciliation',
    description: 'Tests hybrid retrieval handling when two documents present conflicting policy versions, prioritizing latest verified timestamp.',
    status: 'passed',
    latencyMs: 26,
    evidenceSnippet: 'Verified: Reranker elevated v2.6 (2026-08-01) over stale v2.1 (2025-01-10) with explicit conflict notice.',
    executedAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'diag_test_4',
    testName: 'Cross-Tenant Memory Wall Isolation',
    category: 'tenant_isolation',
    description: 'Verifies strict cryptographic boundary preventing Tenant A from querying or retrieving memory items belonging to Tenant B.',
    status: 'passed',
    latencyMs: 12,
    evidenceSnippet: 'Verified: Query across org_sovereign_dynasty and org_external returned 0 intersecting memory records.',
    executedAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'diag_test_5',
    testName: 'Stale Source & Outdated Record Detection',
    category: 'lifecycle',
    description: 'Scans all linked knowledge spaces for files exceeding retention periods or modified upstream.',
    status: 'passed',
    latencyMs: 45,
    evidenceSnippet: 'Verified: 2 sources flagged for background delta refresh; 0 corrupted chunks detected.',
    executedAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'diag_test_6',
    testName: 'Malformed File & Security Malware Quarantine',
    category: 'security',
    description: 'Simulates ingestion of an untrusted file with malicious macros and verifies immediate quarantine.',
    status: 'passed',
    latencyMs: 19,
    evidenceSnippet: 'Verified: Ingestion pipeline halted at Stage 3 (Malware/Security Scan). File moved to quarantine isolation.',
    executedAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'diag_test_7',
    testName: 'Large Scale Knowledge Retrieval Benchmark (100k Chunks)',
    category: 'benchmark',
    description: 'Executes hybrid retrieval query across high-volume mock vector collection to verify sub-50ms P99 latency SLA.',
    status: 'passed',
    latencyMs: 34,
    evidenceSnippet: 'Verified: Top-10 hybrid search completed in 34ms across 100,000 embedded chunks with BM25 reranking.',
    executedAt: '2026-08-15T09:00:00Z'
  }
];

export const SEED_OMNI_DIAGNOSTICS = SEED_OMNI_DIAGNOSTIC_TESTS;

// ---------------------------------------------------------------------------
// SEED DATA FOR PROMPT 5: OMNI CREATE (DOCS, SLIDES, SHEETS, WORKSPACE)
// ---------------------------------------------------------------------------

import { 
  OmniDocument, OmniPresentation, OmniSpreadsheet, OmniWorkspace, 
  OmniSlideTheme, OmniCommandAction, OmniDocumentType 
} from './types';

export const SEED_SLIDE_THEMES: OmniSlideTheme[] = [
  {
    id: 'theme_sovereign',
    name: 'Sovereign Executive',
    bgGradient: 'from-neutral-950 via-neutral-900 to-neutral-950',
    cardBg: 'bg-neutral-900/90 border-neutral-800 text-neutral-100',
    textColor: 'text-neutral-100',
    primaryColor: '#D4AF37',
    accentColor: '#6366F1',
    fontTitle: 'font-serif',
    fontBody: 'font-sans'
  },
  {
    id: 'theme_cobalt',
    name: 'Midnight Cobalt',
    bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
    cardBg: 'bg-indigo-950/60 border-indigo-800/60 text-indigo-50',
    textColor: 'text-indigo-50',
    primaryColor: '#38BDF8',
    accentColor: '#818CF8',
    fontTitle: 'font-sans',
    fontBody: 'font-sans'
  },
  {
    id: 'theme_emerald',
    name: 'Emerald Dynasty',
    bgGradient: 'from-emerald-950 via-neutral-900 to-teal-950',
    cardBg: 'bg-emerald-950/50 border-emerald-800/60 text-emerald-50',
    textColor: 'text-emerald-50',
    primaryColor: '#34D399',
    accentColor: '#A7F3D0',
    fontTitle: 'font-serif',
    fontBody: 'font-sans'
  },
  {
    id: 'theme_light',
    name: 'Clean Light',
    bgGradient: 'from-neutral-50 via-white to-neutral-100',
    cardBg: 'bg-white border-neutral-200 text-neutral-900 shadow-sm',
    textColor: 'text-neutral-900',
    primaryColor: '#2563EB',
    accentColor: '#4F46E5',
    fontTitle: 'font-sans',
    fontBody: 'font-sans'
  },
  {
    id: 'theme_obsidian',
    name: 'Obsidian Dark',
    bgGradient: 'from-black via-neutral-950 to-neutral-900',
    cardBg: 'bg-neutral-900/80 border-neutral-800 text-white',
    textColor: 'text-white',
    primaryColor: '#EC4899',
    accentColor: '#A855F7',
    fontTitle: 'font-mono',
    fontBody: 'font-sans'
  },
  {
    id: 'theme_sunset',
    name: 'Sunset Coral',
    bgGradient: 'from-orange-950 via-neutral-900 to-amber-950',
    cardBg: 'bg-orange-950/40 border-amber-800/50 text-amber-50',
    textColor: 'text-amber-50',
    primaryColor: '#FB923C',
    accentColor: '#FBBF24',
    fontTitle: 'font-sans',
    fontBody: 'font-sans'
  }
];

export const SEED_OMNI_DOCUMENT_TEMPLATES: {
  type: OmniDocumentType;
  title: string;
  description: string;
  sampleContent: string;
  tags: string[];
}[] = [
  {
    type: 'report',
    title: 'Executive Intelligence Report',
    description: 'Structured analytical report with executive summary, KPI metrics, methodology, and recommendations.',
    tags: ['Executive', 'Analytics', 'Quarterly'],
    sampleContent: `# Executive Intelligence Report: Q3 2026 Market Operations

## Executive Summary
This report provides strategic visibility into global multi-tenant operations, compute token optimization, and double-entry ledger settlement metrics across the OMNI ecosystem.

## Key Performance Indicators
| Metric | Q2 Baseline | Q3 Actual | Variance | Status |
| :--- | :--- | :--- | :--- | :--- |
| Active Sovereign Merchants | 1,240 | 1,890 | +52.4% | Exceeded |
| Daily Settlement Volume | $1.42M | $2.68M | +88.7% | Exceeded |
| AI Token Unit Cost | $0.0032/k | $0.0018/k | -43.7% | Optimized |
| System Availability SLA | 99.95% | 99.99% | +0.04% | Compliant |

## Core Findings & Analysis
1. **Dynamic Model Routing Efficiency:** Provider-neutral routing decreased P99 latency by 38ms while routing 64% of high-volume summarizations to local zero-egress models.
2. **Tenant Data Isolation Integrity:** Zero cross-tenant leakage incidents recorded across 148,000 automated security assertions.

## Strategic Recommendations
- Expand edge caching nodes to West African and Southeast Asian regional corridors.
- Implement proactive consensus verification on financial transactions exceeding $50,000.
`
  },
  {
    type: 'proposal',
    title: 'Commercial Enterprise Proposal',
    description: 'High-converting business proposal with problem statement, proposed solution, scope of work, timeline, and investment tiering.',
    tags: ['Sales', 'Enterprise', 'Proposal'],
    sampleContent: `# Strategic Partnership & Enterprise Deployment Proposal

**Prepared for:** Global Sovereign Logistics Group  
**Prepared by:** OMNI Technology Architecture & Strategy  
**Date:** August 15, 2026

## 1. Challenge & Executive Need
Modern supply chains require instantaneous multi-currency reconciliations, offline-first mobile money checkpoints, and sovereign AI copilots that operate without exposing proprietary data to public cloud vendors.

## 2. Proposed Architecture & Solution
OMNI provides a unified, sovereign enterprise stack comprising:
- **Zero-Egress Private AI Router:** On-premises model orchestration with deterministic billing.
- **Double-Entry Ledger Engine:** Cryptographically audited settlement balances with sub-second finality.
- **Collaborative Workspaces:** Real-time multi-tenant document, slide, and spreadsheet collaboration.

## 3. Commercial Investment Schedule
| Deployment Phase | Timeline | Deliverables | Investment (USD) |
| :--- | :--- | :--- | :--- |
| Phase 1: Core Provisioning | Weeks 1–4 | Tenant Setup, Private BYOM, RBAC Matrix | $45,000 |
| Phase 2: System Integration | Weeks 5–8 | Custom RAG Connectors, API Gateways | $65,000 |
| Phase 3: Rollout & Training | Weeks 9–12 | Global Operations Training, SLA Handover | $30,000 |
| **Total Enterprise Contract** | **12 Weeks** | **Turnkey Deployment** | **$140,000** |
`
  },
  {
    type: 'contract',
    title: 'Master Service Agreement & SLA',
    description: 'Legally binding enterprise services contract with indemnity clauses, IP rights, data protection, and dispute arbitration.',
    tags: ['Legal', 'Contract', 'Compliance'],
    sampleContent: `# MASTER SERVICES AGREEMENT (MSA)

**Effective Date:** August 15, 2026  
**Parties:** OMNI Sovereign Cloud Corp ("Provider") and Client Entity ("Subscriber")

### 1. Scope of Services
Provider agrees to render cloud intelligence, multi-tenant workspace software, and cryptographic ledger services as detailed in applicable Statements of Work (SOW).

### 2. Data Sovereignty & Confidentiality
All Subscriber data, vector embeddings, and memory items shall remain the exclusive property of Subscriber. Provider shall not use Subscriber data for foundation model training without explicit written consent.

### 3. Service Level Commitments (SLA)
- **Uptime:** 99.9% Monthly Availability.
- **Support Severity 1:** Sub-15-minute response time 24/7/365.
`
  },
  {
    type: 'business_plan',
    title: '5-Year Strategic Business Plan',
    description: 'Comprehensive business strategy including market analysis, competitive moat, financial forecasts, unit economics, and hiring plan.',
    tags: ['Strategy', 'Finance', 'Growth'],
    sampleContent: `# Sovereign AI Ecosystem: 5-Year Strategic Plan (2026–2031)

## Vision & Market Opportunity
Democratizing sovereign digital infrastructure for 100M+ businesses across high-growth frontier markets through unified identity, finance, and provider-neutral AI.

## Target Financial Milestones
- **Year 1 (2026):** $12M ARR | 2,500 Enterprise Tenants
- **Year 2 (2027):** $38M ARR | 10,000 Enterprise Tenants
- **Year 3 (2028):** $95M ARR | Cash-Flow Positive & Global Expansion
`
  },
  {
    type: 'academic',
    title: 'Academic & Research Dissertation',
    description: 'Rigorous scholarly format with abstract, literature review, methodology, mathematical proofs, results, and bibtex citations.',
    tags: ['Research', 'Scholarly', 'AI'],
    sampleContent: `# Provider-Neutral Multi-Agent Consensus: Mathematical Convergence and Byzantine Fault Tolerance

**Author:** Gideon Oluwalana, Lead Architect  
**Institution:** Sovereign AI Research Lab  

### Abstract
We present a formal framework for multi-model consensus verification across heterogeneous Large Language Models. By mapping model latent distributions into a unified semantic manifold, we establish deterministic convergence criteria that reduce hallucination rates by 74.2% in critical domain environments.

### 1. Introduction
Modern cognitive architectures suffer from epistemic opacity...
`
  },
  {
    type: 'policy',
    title: 'Enterprise Information Security Policy',
    description: 'Standardized ISO 27001 / SOC 2 Type II compliant governance policy for access control, encryption, and audit retention.',
    tags: ['Governance', 'Security', 'Compliance'],
    sampleContent: `# Enterprise Information Security Policy (POL-SEC-2026)

## 1. Objective
To protect information assets against unauthorized access, disclosure, modification, and destruction.

## 2. Policy Directives
- **Zero Trust Network Access:** All access requests require continuous cryptographic authentication.
- **Encryption Standards:** AES-256-GCM for data at rest; TLS 1.3 for data in transit.
`
  },
  {
    type: 'manual',
    title: 'Operations & System Manual',
    description: 'Step-by-step standard operating procedures (SOPs), troubleshooting guides, and incident runbooks.',
    tags: ['Operations', 'SOP', 'Manual'],
    sampleContent: `# Operations Runbook: Multi-Tenant Ledger Reconciliation

### Overview
This procedure details daily automated reconciliation between internal double-entry ledgers and partner banking rails.

### Step-by-Step Procedure
1. Verify overnight batch settlement trigger at 00:00 UTC.
2. Inspect discrepancy log in administrative dashboard.
`
  },
  {
    type: 'letter',
    title: 'Formal Executive Correspondence',
    description: 'Professional letterhead format for board notices, regulatory submissions, and shareholder communications.',
    tags: ['Correspondence', 'Executive'],
    sampleContent: `# Formal Notice to the Board of Directors

**Date:** August 15, 2026  
**To:** Members of the Supervisory Board  
**From:** Office of the Chief Executive  

Dear Board Members,

I am pleased to submit our strategic quarterly briefing regarding the launch of OMNI Create and Collaborative Workspace.
`
  },
  {
    type: 'book',
    title: 'Book Manuscript & Treatise',
    description: 'Structured book layout with chapters, foreword, subheadings, pull quotes, and bibliography.',
    tags: ['Publishing', 'Treatise'],
    sampleContent: `# The Sovereign Enterprise: Autonomous Systems in the Cognitive Age

## Foreword
The history of computing is the history of decentralization...

## Chapter 1: The Mirage of Centralized Cloud
In the early decades of the twenty-first century...
`
  },
  {
    type: 'general',
    title: 'Standard Project Document',
    description: 'Flexible blank canvas with full markdown and rich-text editing support.',
    tags: ['General', 'Notes'],
    sampleContent: `# Project Brief: New Autonomous Workspace

## Overview
Document objectives, key milestones, and collaborative notes here.
`
  }
];

export const SEED_OMNI_DOCUMENTS: OmniDocument[] = [
  {
    id: 'doc_1',
    title: 'OMNI Ecosystem Q3 2026 Strategic Intelligence Report',
    documentType: 'report',
    subtitle: 'Comprehensive audit of global ledger settlements, AI token routing, and multi-tenant security',
    content: `# OMNI Ecosystem Q3 2026 Strategic Intelligence Report

## Executive Summary
The OMNI platform has expanded across 42 sovereign business categories, logging over **$2.68M in daily settlement volume** and maintaining an unblemished **99.99% system availability SLA**.

## Global Performance Matrix
| Category | Q2 Baseline | Q3 Actual | YoY Growth | Status |
| :--- | :--- | :--- | :--- | :--- |
| Multi-Tenant Organizations | 1,240 | 1,890 | +52.4% | Verified |
| Provider-Neutral Model Calls | 4.8M | 12.4M | +158.3% | Exceeded |
| Double-Entry Journal Entries | 890K | 3.2M | +259.5% | Exceptional |
| Cloud Compute Cost Savings | 24.5% | 43.7% | +19.2% | Optimized |

## Architecture Moat & Innovations
- **Zero-Egress Multi-Agent Consensus:** Deployed automated tri-model verification with deterministic scoring.
- **Provider-Neutral BYOK Vault:** Reduced vendor lock-in risk to zero with seamless failover chains across Gemini, OpenAI, Anthropic, and Local Ollama.

## Strategic Directives for Q4
1. Launch collaborative live presence in OMNI Create for instant document and slide editing.
2. Establish physical edge compute gateway for sub-5ms low-latency trading corridors.
`,
    comments: [
      {
        id: 'comm_1',
        authorId: 'usr_sarah',
        authorName: 'Sarah Jenkins (VP Strategy)',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        text: 'The YoY growth in double-entry entries is impressive. Should we add a section on banking rail latency?',
        selectedText: 'Double-Entry Journal Entries',
        timestamp: '2026-08-15T08:30:00Z',
        resolved: false,
        replies: [
          {
            id: 'rep_1',
            authorId: 'usr_gideon',
            authorName: 'Gideon Oluwalana',
            text: 'Good point Sarah. I will incorporate the 180ms settlement latency benchmarks in Section 3.',
            timestamp: '2026-08-15T08:45:00Z'
          }
        ]
      }
    ],
    versions: [
      {
        versionNumber: 2,
        timestamp: '2026-08-15T09:15:00Z',
        authorName: 'Gideon Oluwalana',
        summary: 'Added Global Performance Matrix table and Q4 strategic recommendations',
        contentSnapshot: '# OMNI Ecosystem Q3 2026 Strategic Intelligence Report...',
        wordCount: 385
      },
      {
        versionNumber: 1,
        timestamp: '2026-08-14T14:20:00Z',
        authorName: 'Sarah Jenkins',
        summary: 'Initial draft outline and executive summary',
        contentSnapshot: '# OMNI Ecosystem Q3 2026 Strategic Intelligence Report (Draft)...',
        wordCount: 140
      }
    ],
    citations: [
      {
        id: 'cit_1',
        sourceTitle: 'Sovereign Multi-Tenant Whitepaper v2.4',
        author: 'OMNI Research Lab',
        year: '2026',
        snippet: 'Double-entry cryptographic ledger architecture eliminates reconciliation drift across multi-currency jurisdictions.'
      },
      {
        id: 'cit_2',
        sourceTitle: 'ISO 27001 Security Audit Log 2026',
        author: 'Global Cyber Assurance',
        year: '2026',
        snippet: 'Zero cross-tenant vector leakage detected in high-density multi-tenant environments.'
      }
    ],
    tags: ['Report', 'Executive', 'Q3-2026', 'Finance'],
    status: 'approved',
    wordCount: 385,
    readingTimeMinutes: 2,
    ownerUserId: 'usr_gideon',
    organizationId: 'org_dynasty',
    workspaceId: 'ws_org_main',
    createdAt: '2026-08-14T14:20:00Z',
    updatedAt: '2026-08-15T09:15:00Z'
  },
  {
    id: 'doc_2',
    title: 'Enterprise AI Governance & Model Risk Policy',
    documentType: 'policy',
    subtitle: 'Standardized regulatory framework for autonomous agent deployment and LLM validation',
    content: `# Enterprise AI Governance & Model Risk Policy (POL-AI-2026)

## 1. Purpose & Scope
This policy mandates technical controls, audit requirements, and human-in-the-loop oversight for all AI models, agents, and automated decision engines operating within the enterprise.

## 2. Core Governance Principles
- **No Unconsented Data Training:** Customer data and organizational documents shall never be ingested into third-party foundation model training sets.
- **Deterministic Billing Verification:** All token expenditures must be verified against double-entry wallet reserves in real time.
- **Circuit Breaker Automation:** Providers exhibiting error rates $> 5\\%$ over a 3-minute window must automatically trip to half-open state.

## 3. Human Oversight Tiers
1. **Tier 1 (Informational Queries):** Autonomous generation permitted with source citation.
2. **Tier 2 (Internal Drafts & Code):** AI generation allowed with member review prior to commit.
3. **Tier 3 (Financial & Legal Actions):** Explicit human authorization required before executing transactions $\\ge \\$5,000$.
`,
    comments: [],
    versions: [
      {
        versionNumber: 1,
        timestamp: '2026-08-12T10:00:00Z',
        authorName: 'Elena Vance (Legal Counsel)',
        summary: 'Adopted official AI governance baseline',
        contentSnapshot: '# Enterprise AI Governance...',
        wordCount: 220
      }
    ],
    citations: [],
    tags: ['Policy', 'Governance', 'Compliance', 'AI'],
    status: 'published',
    wordCount: 220,
    readingTimeMinutes: 1,
    ownerUserId: 'usr_elena',
    organizationId: 'org_dynasty',
    workspaceId: 'ws_org_main',
    createdAt: '2026-08-12T10:00:00Z',
    updatedAt: '2026-08-12T10:00:00Z'
  }
];

export const SEED_OMNI_PRESENTATIONS: OmniPresentation[] = [
  {
    id: 'pres_1',
    title: 'Sovereign AI Infrastructure 2026',
    subtitle: 'Next-Generation Multi-Model Architecture & Global Expansion Deck',
    targetAudience: 'Enterprise Board of Directors & Strategic Partners',
    outline: [
      'Executive Overview & Vision',
      'The Core Problem: Vendor Lock-in & Data Egress',
      'OMNI Architecture: Provider-Neutral AI & Ledger',
      'Financial Milestones & Unit Economics',
      'Product Suite: Documents, Slides, Sheets & Workspace',
      'Strategic Expansion Roadmap 2026-2027'
    ],
    themeId: 'theme_sovereign',
    slides: [
      {
        id: 'slide_1',
        slideNumber: 1,
        layout: 'title',
        title: 'Sovereign AI Infrastructure 2026',
        subtitle: 'Unlocking Provider-Neutral Intelligence, Autonomous Workspaces & Cryptographic Ledger Security',
        speakerNotes: 'Welcome everyone. Today we are presenting our comprehensive 2026 roadmap for sovereign, multi-tenant enterprise intelligence.',
        visualPrompt: 'Luxury executive dark gold architectural theme with sovereign crest'
      },
      {
        id: 'slide_2',
        slideNumber: 2,
        layout: 'metrics',
        title: 'Q3 2026 Key Performance Traction',
        subtitle: 'Rapid adoption across sovereign enterprises and creator cooperatives',
        kpis: [
          { label: 'Active Orgs', value: '1,890+', change: '+52.4% QoQ', positive: true },
          { label: 'Daily Settlements', value: '$2.68M', change: '+88.7% QoQ', positive: true },
          { label: 'Token Cost Optimization', value: '43.7%', change: '-$0.0014/k', positive: true },
          { label: 'System SLA', value: '99.99%', change: 'Zero Downtime', positive: true }
        ],
        speakerNotes: 'Highlight our 43.7% cost reduction driven by auto-routing to local models and cache hits.',
        bullets: [
          'Over 12.4M provider-neutral model calls routed seamlessly across global clouds.',
          'Double-entry ledger processed over 3.2M auditable transactions with sub-second finality.',
          'Zero data leaks or tenant breaches across all isolated vector vaults.'
        ]
      },
      {
        id: 'slide_3',
        slideNumber: 3,
        layout: 'split',
        title: 'The Challenge vs. The OMNI Solution',
        subtitle: 'Replacing fragmented SaaS silos with unified sovereign architecture',
        columns: [
          {
            title: 'Legacy Fragmented Stack',
            badge: 'Fragile & Costly',
            content: '• Vulnerable to vendor lock-in and unexpected API price hikes\n• Customer data egresses to third-party model training datasets\n• Disconnected billing, chat, documents, and spreadsheets\n• Fragile manual reconciliation across banking silos'
          },
          {
            title: 'OMNI Unified Sovereign Stack',
            badge: 'Sovereign & Resilient',
            content: '• Provider-neutral routing across Gemini, OpenAI, Anthropic & Local\n• Zero-egress private RAG vaults with strict pre-model ACL barriers\n• AI-native Documents, Slides, Sheets & Workspaces\n• Cryptographically verified double-entry ledger settlement'
          }
        ],
        speakerNotes: 'Focus on how OMNI consolidates what used to take 7 different vendors into a single sovereign platform.'
      },
      {
        id: 'slide_4',
        slideNumber: 4,
        layout: 'chart',
        title: 'Compute Unit Cost vs. Daily Settlement Volume',
        subtitle: 'Exponential scale with diminishing marginal compute expenses',
        chartData: {
          chartType: 'line',
          labels: ['Q1 2025', 'Q3 2025', 'Q1 2026', 'Q3 2026', 'Q1 2027 (Proj)', 'Q3 2027 (Proj)'],
          datasets: [
            { name: 'Daily Settlement ($M)', values: [0.4, 0.9, 1.4, 2.7, 4.8, 8.5], color: '#D4AF37' },
            { name: 'Token Cost / 10k ($)', values: [0.08, 0.06, 0.04, 0.02, 0.015, 0.01], color: '#6366F1' }
          ]
        },
        bullets: [
          'Settlement volume is compounding at 88.7% QoQ while token unit costs decline.',
          'Local vLLM / BYOM nodes handle 64% of repetitive operational workloads at near-zero marginal cost.'
        ],
        speakerNotes: 'The chart demonstrates strong operating leverage as network volume grows.'
      },
      {
        id: 'slide_5',
        slideNumber: 5,
        layout: 'quote',
        title: 'Vision Statement',
        quote: {
          text: "True sovereignty is not about isolation; it is the freedom to orchestrate any intelligence, settle any currency, and own your digital assets without compromise.",
          author: 'Gideon Oluwalana',
          role: 'Founder & Chief Architect, OMNI'
        },
        speakerNotes: 'Deliver this quote with conviction before moving into our expansion timeline.'
      },
      {
        id: 'slide_6',
        slideNumber: 6,
        layout: 'bento',
        title: 'Strategic Roadmap 2026–2027',
        subtitle: 'Milestones across AI, Ledger, and Enterprise Ecosystem',
        columns: [
          {
            title: 'Q4 2026: Collaborative Studio',
            content: 'Real-time collaborative editing in OMNI Create with offline sync and WebRTC presence.'
          },
          {
            title: 'Q1 2027: Regional Compute Edge',
            content: 'Deploying micro-datacenter nodes in Lagos, Nairobi, London, and Singapore.'
          },
          {
            title: 'Q2 2027: Multi-Currency FX Rails',
            content: 'Autonomous FX liquidity bridging across 18 sovereign currencies with zero slippage.'
          }
        ],
        speakerNotes: 'Walk through the 3 key phases for next year and open the floor for Q&A.'
      }
    ],
    ownerUserId: 'usr_gideon',
    organizationId: 'org_dynasty',
    workspaceId: 'ws_org_main',
    createdAt: '2026-08-14T16:00:00Z',
    updatedAt: '2026-08-15T09:30:00Z',
    isAIGenerated: true
  }
];

export const SEED_OMNI_SPREADSHEETS: OmniSpreadsheet[] = [
  {
    id: 'sheet_1',
    title: 'Global Operations & Merchant Settlement Ledger 2026',
    description: 'Tabular financial matrix tracking regional settlement volume, currency conversions, transaction fees, and net margins with deterministic formulas.',
    tabs: [
      {
        id: 'tab_revenue',
        name: 'Regional Settlements',
        columns: [
          { key: 'A', header: 'Region / Corridor', type: 'string', width: 180 },
          { key: 'B', header: 'Q1 Volume ($)', type: 'number', width: 140 },
          { key: 'C', header: 'Q2 Volume ($)', type: 'number', width: 140 },
          { key: 'D', header: 'Q3 Volume ($)', type: 'number', width: 140 },
          { key: 'E', header: 'YTD Total ($)', type: 'number', width: 150 },
          { key: 'F', header: 'Fee Rate', type: 'number', width: 100 },
          { key: 'G', header: 'Net Revenue ($)', type: 'number', width: 150 },
          { key: 'H', header: 'Growth Rate', type: 'number', width: 120 }
        ],
        rows: [
          {
            id: 'row_1',
            rowNumber: 1,
            cells: {
              A: { value: 'West Africa (NGN/GHS)', computedValue: 'West Africa (NGN/GHS)', bold: true },
              B: { value: 450000, computedValue: '$450,000', format: 'currency' },
              C: { value: 680000, computedValue: '$680,000', format: 'currency' },
              D: { value: 1020000, computedValue: '$1,020,000', format: 'currency' },
              E: { value: 2150000, formula: '=SUM(B1:D1)', computedValue: '$2,150,000', format: 'currency', bold: true },
              F: { value: 0.015, computedValue: '1.50%', format: 'percent' },
              G: { value: 32250, formula: '=E1*F1', computedValue: '$32,250', format: 'currency', bold: true },
              H: { value: 0.50, formula: '=(D1-C1)/C1', computedValue: '+50.0%', format: 'percent' }
            }
          },
          {
            id: 'row_2',
            rowNumber: 2,
            cells: {
              A: { value: 'East Africa (KES/TZS)', computedValue: 'East Africa (KES/TZS)', bold: true },
              B: { value: 320000, computedValue: '$320,000', format: 'currency' },
              C: { value: 490000, computedValue: '$490,000', format: 'currency' },
              D: { value: 760000, computedValue: '$760,000', format: 'currency' },
              E: { value: 1570000, formula: '=SUM(B2:D2)', computedValue: '$1,570,000', format: 'currency', bold: true },
              F: { value: 0.015, computedValue: '1.50%', format: 'percent' },
              G: { value: 23550, formula: '=E2*F2', computedValue: '$23,550', format: 'currency', bold: true },
              H: { value: 0.551, formula: '=(D2-C2)/C2', computedValue: '+55.1%', format: 'percent' }
            }
          },
          {
            id: 'row_3',
            rowNumber: 3,
            cells: {
              A: { value: 'Europe & UK (EUR/GBP)', computedValue: 'Europe & UK (EUR/GBP)', bold: true },
              B: { value: 280000, computedValue: '$280,000', format: 'currency' },
              C: { value: 410000, computedValue: '$410,000', format: 'currency' },
              D: { value: 580000, computedValue: '$580,000', format: 'currency' },
              E: { value: 1270000, formula: '=SUM(B3:D3)', computedValue: '$1,270,000', format: 'currency', bold: true },
              F: { value: 0.012, computedValue: '1.20%', format: 'percent' },
              G: { value: 15240, formula: '=E3*F3', computedValue: '$15,240', format: 'currency', bold: true },
              H: { value: 0.415, formula: '=(D3-C3)/C3', computedValue: '+41.5%', format: 'percent' }
            }
          },
          {
            id: 'row_4',
            rowNumber: 4,
            cells: {
              A: { value: 'North America (USD/CAD)', computedValue: 'North America (USD/CAD)', bold: true },
              B: { value: 190000, computedValue: '$190,000', format: 'currency' },
              C: { value: 260000, computedValue: '$260,000', format: 'currency' },
              D: { value: 320000, computedValue: '$320,000', format: 'currency' },
              E: { value: 770000, formula: '=SUM(B4:D4)', computedValue: '$770,000', format: 'currency', bold: true },
              F: { value: 0.010, computedValue: '1.00%', format: 'percent' },
              G: { value: 7700, formula: '=E4*F4', computedValue: '$7,700', format: 'currency', bold: true },
              H: { value: 0.231, formula: '=(D4-C4)/C4', computedValue: '+23.1%', format: 'percent' }
            }
          },
          {
            id: 'row_5',
            rowNumber: 5,
            cells: {
              A: { value: 'TOTAL PORTFOLIO', computedValue: 'TOTAL PORTFOLIO', bold: true },
              B: { value: 1240000, formula: '=SUM(B1:B4)', computedValue: '$1,240,000', format: 'currency', bold: true },
              C: { value: 1840000, formula: '=SUM(C1:C4)', computedValue: '$1,840,000', format: 'currency', bold: true },
              D: { value: 2680000, formula: '=SUM(D1:D4)', computedValue: '$2,680,000', format: 'currency', bold: true },
              E: { value: 5760000, formula: '=SUM(E1:E4)', computedValue: '$5,760,000', format: 'currency', bold: true },
              F: { value: 0.0137, formula: '=AVERAGE(F1:F4)', computedValue: '1.37%', format: 'percent', bold: true },
              G: { value: 78740, formula: '=SUM(G1:G4)', computedValue: '$78,740', format: 'currency', bold: true },
              H: { value: 0.457, formula: '=(D5-C5)/C5', computedValue: '+45.7%', format: 'percent', bold: true }
            }
          }
        ]
      }
    ],
    kpis: [
      { label: 'Q3 Settlement Vol', value: '$2,680,000', delta: '+45.7% vs Q2', trend: 'up', description: 'Total gross volume across all 4 regional corridors' },
      { label: 'YTD Settlement Total', value: '$5,760,000', delta: '+142% YoY', trend: 'up', description: 'Cumulative 9-month volume processed' },
      { label: 'Net Take Rate', value: '1.37%', delta: '+0.05% margin', trend: 'up', description: 'Weighted average take rate after interchange fees' },
      { label: 'Q3 Net Fees Earned', value: '$78,740', delta: '+$24,600 QoQ', trend: 'up', description: 'Direct protocol transaction fees collected' }
    ],
    forecast: {
      metric: 'Gross Quarterly Settlement Volume ($)',
      historical: [
        { period: 'Q1 2025', value: 420000 },
        { period: 'Q2 2025', value: 650000 },
        { period: 'Q3 2025', value: 890000 },
        { period: 'Q4 2025', value: 1100000 },
        { period: 'Q1 2026', value: 1240000 },
        { period: 'Q2 2026', value: 1840000 },
        { period: 'Q3 2026', value: 2680000 }
      ],
      projection: [
        { period: 'Q4 2026 (Est)', predicted: 3620000, confidenceLow: 3380000, confidenceHigh: 3860000 },
        { period: 'Q1 2027 (Est)', predicted: 4750000, confidenceLow: 4320000, confidenceHigh: 5180000 },
        { period: 'Q2 2027 (Est)', predicted: 6100000, confidenceLow: 5450000, confidenceHigh: 6750000 }
      ],
      rSquared: 0.982,
      growthRatePct: 35.8,
      modelType: 'linear_trend'
    },
    ownerUserId: 'usr_gideon',
    organizationId: 'org_dynasty',
    workspaceId: 'ws_org_main',
    createdAt: '2026-08-14T11:00:00Z',
    updatedAt: '2026-08-15T09:40:00Z'
  }
];

export const SEED_OMNI_WORKSPACES: OmniWorkspace[] = [
  {
    id: 'ws_org_main',
    name: 'Dynasty Trust Global Headquarters',
    description: 'Canonical enterprise workspace holding verified corporate governance, financial ledgers, and strategic decks.',
    scope: 'organization',
    icon: 'Building2',
    color: '#D4AF37',
    organizationId: 'org_dynasty',
    ownerUserId: 'usr_gideon',
    items: [
      {
        id: 'item_1',
        type: 'document',
        targetId: 'doc_1',
        title: 'OMNI Ecosystem Q3 2026 Strategic Intelligence Report',
        subtitle: 'Executive intelligence audit with performance matrix',
        authorName: 'Gideon Oluwalana',
        updatedAt: '2026-08-15T09:15:00Z',
        tags: ['Executive', 'Q3-2026', 'Report'],
        sizeBytes: 42500,
        status: 'approved'
      },
      {
        id: 'item_2',
        type: 'slide',
        targetId: 'pres_1',
        title: 'Sovereign AI Infrastructure 2026 Deck',
        subtitle: 'Board presentation deck with 6 styled slides',
        authorName: 'Gideon Oluwalana',
        updatedAt: '2026-08-15T09:30:00Z',
        tags: ['Strategy', 'Slides', 'Board'],
        sizeBytes: 88400,
        status: 'published'
      },
      {
        id: 'item_3',
        type: 'sheet',
        targetId: 'sheet_1',
        title: 'Global Operations & Merchant Settlement Ledger 2026',
        subtitle: 'Dynamic spreadsheet with deterministic calculations & ARIMA forecast',
        authorName: 'Gideon Oluwalana',
        updatedAt: '2026-08-15T09:40:00Z',
        tags: ['Finance', 'Spreadsheet', 'Forecast'],
        sizeBytes: 56000,
        status: 'active'
      },
      {
        id: 'item_4',
        type: 'document',
        targetId: 'doc_2',
        title: 'Enterprise AI Governance & Model Risk Policy',
        subtitle: 'Regulatory framework for agent safety and token limits',
        authorName: 'Elena Vance',
        updatedAt: '2026-08-12T10:00:00Z',
        tags: ['Policy', 'Security', 'Compliance'],
        sizeBytes: 28000,
        status: 'published'
      }
    ],
    members: [
      {
        id: 'collab_1',
        userId: 'usr_gideon',
        name: 'Gideon Oluwalana',
        email: 'gideon@dynasty.io',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'owner',
        isOnline: true,
        activeItemId: 'doc_1',
        lastActiveAt: 'Just now'
      },
      {
        id: 'collab_2',
        userId: 'usr_sarah',
        name: 'Sarah Jenkins',
        email: 'sarah.j@dynasty.io',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        role: 'admin',
        isOnline: true,
        activeItemId: 'sheet_1',
        lastActiveAt: '2m ago'
      },
      {
        id: 'collab_3',
        userId: 'usr_marcus',
        name: 'Marcus Chen',
        email: 'm.chen@dynasty.io',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'editor',
        isOnline: false,
        lastActiveAt: '1h ago'
      }
    ],
    activities: [
      {
        id: 'act_1',
        actorName: 'Gideon Oluwalana',
        action: 'Updated Q3 Performance Matrix',
        targetTitle: 'OMNI Ecosystem Q3 2026 Strategic Intelligence Report',
        targetType: 'document',
        timestamp: '15m ago',
        diffSnippet: '+ Added YoY growth metric column and verified double-entry journal count.'
      },
      {
        id: 'act_2',
        actorName: 'Sarah Jenkins',
        action: 'Added comment on section',
        targetTitle: 'OMNI Ecosystem Q3 2026 Strategic Intelligence Report',
        targetType: 'document',
        timestamp: '45m ago',
        diffSnippet: 'Sarah commented: "The YoY growth in double-entry entries is impressive..."'
      },
      {
        id: 'act_3',
        actorName: 'Gideon Oluwalana',
        action: 'Calculated Q4 Settlement Forecast',
        targetTitle: 'Global Operations & Merchant Settlement Ledger 2026',
        targetType: 'sheet',
        timestamp: '1h ago',
        diffSnippet: 'Generated linear regression projection ($3.62M predicted with R² = 0.982).'
      }
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-15T09:40:00Z'
  },
  {
    id: 'ws_team_dev',
    name: 'AI Engineering & Agent Squad',
    description: 'Collaborative development space for model benchmarking, agent tools, and sandboxed scripts.',
    scope: 'team',
    icon: 'Terminal',
    color: '#6366F1',
    organizationId: 'org_dynasty',
    ownerUserId: 'usr_gideon',
    items: [],
    members: [
      {
        id: 'collab_1',
        userId: 'usr_gideon',
        name: 'Gideon Oluwalana',
        email: 'gideon@dynasty.io',
        role: 'owner',
        isOnline: true,
        lastActiveAt: 'Just now'
      }
    ],
    activities: [],
    createdAt: '2026-02-15T00:00:00Z',
    updatedAt: '2026-08-15T08:00:00Z'
  },
  {
    id: 'ws_personal_gid',
    name: "Gideon's Private Sovereign Sandbox",
    description: 'Personal, strictly private workspace container for drafts, exploratory research, and sovereign notes.',
    scope: 'personal',
    icon: 'Lock',
    color: '#10B981',
    organizationId: 'org_dynasty',
    ownerUserId: 'usr_gideon',
    items: [],
    members: [
      {
        id: 'collab_1',
        userId: 'usr_gideon',
        name: 'Gideon Oluwalana',
        email: 'gideon@dynasty.io',
        role: 'owner',
        isOnline: true,
        lastActiveAt: 'Just now'
      }
    ],
    activities: [],
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-08-15T09:00:00Z'
  }
];

export const SEED_OMNI_COMMAND_ACTIONS: OmniCommandAction[] = [
  {
    id: 'cmd_research_to_slides',
    title: 'Turn research into a 10-slide presentation',
    promptTemplate: 'Analyze research session ref:{{artifactId}} and generate an executive 10-slide presentation deck with title, KPI metrics, chart comparison, and speaker notes.',
    inputArtifactTypes: ['research', 'document'],
    outputArtifactType: 'slide',
    icon: 'Layers',
    description: 'Extracts core arguments and data points from research or documents to synthesize a styled presentation deck.'
  },
  {
    id: 'cmd_sheet_to_report',
    title: 'Analyse spreadsheet and create executive report',
    promptTemplate: 'Analyze spreadsheet ref:{{artifactId}}, compute regional performance variances, and generate a comprehensive executive document report with tables and recommendations.',
    inputArtifactTypes: ['sheet'],
    outputArtifactType: 'document',
    icon: 'FileText',
    description: 'Runs deterministic mathematical analysis over tabular sheet data and compiles an executive findings report.'
  },
  {
    id: 'cmd_docs_to_proposal',
    title: 'Use documents to draft a commercial proposal',
    promptTemplate: 'Synthesize context from document refs:{{artifactId}} and draft an enterprise commercial proposal with timeline, deliverables, and fee schedule.',
    inputArtifactTypes: ['document', 'knowledge'],
    outputArtifactType: 'document',
    icon: 'FileCheck',
    description: 'Combines multiple reference notes or knowledge vaults into a structured, client-ready business proposal.'
  },
  {
    id: 'cmd_doc_to_sheet',
    title: 'Convert document data tables into dynamic spreadsheet',
    promptTemplate: 'Extract numerical tables and metrics from document ref:{{artifactId}} and construct a structured spreadsheet with formulas and charts.',
    inputArtifactTypes: ['document', 'research'],
    outputArtifactType: 'sheet',
    icon: 'Sliders',
    description: 'Parses unstructured text and markdown tables into an interactive, formula-driven spreadsheet.'
  }
];
