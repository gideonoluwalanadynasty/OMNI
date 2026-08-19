/**
 * @omni/ai-sdk - Official OMNI Intelligence Layer Client SDK
 * Production-grade Provider-Neutral AI Orchestration Contract
 */

import {
  AIModel,
  AIProvider,
  AIProviderHealth,
  AICostRecord,
  OmniRoutingProfile,
  OmniRoutingTaskType,
  ByokCredential,
  ByomEndpoint,
  AiCircuitBreakerRecord,
  OmniConsensusSession,
  OmniArenaMatch,
  OmniArenaLeaderboardEntry,
  OmniDeepResearchExecution,
  OmniAiSearchQuery,
  OmniKnowledgeSpace,
  OmniKnowledgeSource,
  OmniKnowledgeChunk,
  OmniMemoryItem,
  OmniMemoryTier,
  OmniKnowledgeAssistant,
  OmniKnowledgeConnector,
  OmniHybridRetrievalRequest,
  OmniHybridRetrievalResponse,
  OmniDiagnosticTestResult
} from '../types';

export interface OmniAiRouteOptions {
  prompt: string;
  taskType?: OmniRoutingTaskType;
  preferredProfile?: OmniRoutingProfile;
  forcedModelId?: string;
  organizationId?: string;
  appId?: string;
  userId?: string;
  modalitiesRequired?: ('text' | 'image' | 'audio' | 'video' | 'embedding' | 'code')[];
  toolsRequired?: string[];
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  conversationHistory?: { role: 'user' | 'assistant' | 'system'; content: string }[];
  byokOverride?: string;
  enableCache?: boolean;
  enableSearchGrounding?: boolean;
}

export interface OmniAiRouteDecision {
  selectedModel: AIModel;
  selectedProvider: AIProvider;
  routingMode: 'omni_auto' | 'expert_manual';
  routingProfile: OmniRoutingProfile;
  fallbackChain: string[];
  reasoningNotes: string[];
  estimatedCost: number;
  latencyClass: string;
  privacyClassification: string;
}

export interface OmniAiExecutionResult {
  text: string;
  modelId: string;
  providerId: string;
  routingDecision: OmniAiRouteDecision;
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  latencyMs: number;
  estimatedCostUsd: number;
  cacheHit: boolean;
  fallbackUsed: boolean;
  fallbackTrace?: {
    attemptedModel: string;
    failureReason: string;
    finalModel: string;
  };
  groundingCitations?: {
    title: string;
    url: string;
    snippet: string;
  }[];
  generatedMedia?: {
    type: 'image' | 'audio';
    url: string;
    prompt: string;
  };
}

export interface ByokTestResult {
  success: boolean;
  providerId: string;
  latencyMs: number;
  message: string;
  validatedModels: string[];
}

export interface ByomHealthCheckResult {
  success: boolean;
  endpointId: string;
  status: 'healthy' | 'degraded' | 'offline';
  latencyMs: number;
  message: string;
}

export class OmniAiClient {
  private baseApiUrl: string;

  constructor(baseApiUrl: string = '/api/v1/ai') {
    this.baseApiUrl = baseApiUrl;
  }

  /**
   * Execute intelligent prompt orchestration with OMNI Auto or manual model choice
   */
  async execute(options: OmniAiRouteOptions): Promise<OmniAiExecutionResult> {
    const res = await fetch(`${this.baseApiUrl}/route`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'AI Gateway error' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    return await res.json();
  }

  /**
   * Evaluates OMNI Auto routing decision without executing the full prompt
   */
  async planRoute(options: Omit<OmniAiRouteOptions, 'prompt'> & { promptSummary?: string }): Promise<OmniAiRouteDecision> {
    const res = await fetch(`${this.baseApiUrl}/route/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Route planning failed' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    return await res.json();
  }

  /**
   * Search Grounding execution
   */
  async groundedSearch(query: string, options?: Partial<OmniAiRouteOptions>): Promise<OmniAiExecutionResult> {
    return this.execute({
      ...options,
      prompt: query,
      taskType: 'search_grounded',
      preferredProfile: options?.preferredProfile || 'balanced'
    });
  }

  /**
   * Deep Research execution
   */
  async deepResearch(topic: string, depth: 'standard' | 'deep' | 'comprehensive' = 'deep', options?: Partial<OmniAiRouteOptions>): Promise<OmniAiExecutionResult> {
    return this.execute({
      ...options,
      prompt: `Synthesize comprehensive multi-source intelligence report for topic: "${topic}". Depth level: ${depth}. Provide executive summary, key findings, comparative analysis, and structured citations.`,
      taskType: 'deep_research',
      preferredProfile: options?.preferredProfile || 'max_intelligence'
    });
  }

  /**
   * Code generation with deterministic reasoning
   */
  async generateCode(specification: string, language: string = 'typescript', options?: Partial<OmniAiRouteOptions>): Promise<OmniAiExecutionResult> {
    return this.execute({
      ...options,
      prompt: `Generate production-ready, strictly typed ${language} implementation for: ${specification}. Include full code without stubs and follow security best practices.`,
      taskType: 'code',
      preferredProfile: options?.preferredProfile || 'max_intelligence'
    });
  }

  /**
   * Test BYOK API Key credentials against remote provider without storing in logs
   */
  async testByok(providerId: string, apiKey: string, organizationId: string): Promise<ByokTestResult> {
    const res = await fetch(`${this.baseApiUrl}/byok/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId, apiKey, organizationId })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'BYOK test verification failed' }));
      return {
        success: false,
        providerId,
        latencyMs: 0,
        message: err.error || 'Authentication handshake rejected by provider',
        validatedModels: []
      };
    }

    return await res.json();
  }

  /**
   * Test BYOM private inference endpoint health and latency
   */
  async testByomEndpoint(endpoint: Partial<ByomEndpoint>): Promise<ByomHealthCheckResult> {
    const res = await fetch(`${this.baseApiUrl}/byom/health-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(endpoint)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'BYOM health check failed' }));
      return {
        success: false,
        endpointId: endpoint.id || 'new_endpoint',
        status: 'offline',
        latencyMs: 0,
        message: err.error || 'Connection failed to private inference node'
      };
    }

    return await res.json();
  }

  /**
   * Retrieve live provider cluster health and circuit breaker metrics
   */
  async getHealthMetrics(): Promise<{
    providers: AIProvider[];
    circuitBreakers: Record<string, AiCircuitBreakerRecord>;
    overallStatus: 'optimal' | 'degraded' | 'failover_active';
  }> {
    const res = await fetch(`${this.baseApiUrl}/health`);
    if (!res.ok) {
      throw new Error(`Failed to fetch AI health metrics`);
    }
    return await res.json();
  }

  /**
   * Chaos engineering endpoint: Simulates provider failure to demonstrate circuit tripping and automatic fallbacks
   */
  async simulateFailure(providerId: string, scenario: 'outage' | 'rate_limit' | 'auth_fail' | 'latency_spike' | 'restore'): Promise<{
    success: boolean;
    providerId: string;
    circuitState: 'closed' | 'half_open' | 'open';
    message: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/chaos/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId, scenario })
    });

    return await res.json();
  }
  /**
   * Execute multi-model consensus arbitration panel
   */
  async executeConsensus(params: {
    query: string;
    participatingModelIds?: string[];
    organizationId?: string;
    userId?: string;
  }): Promise<OmniConsensusSession> {
    const res = await fetch(`${this.baseApiUrl}/consensus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Consensus panel execution failed' }));
      throw new Error(err.error || 'Failed to execute multi-model consensus');
    }
    return await res.json();
  }

  /**
   * Request a blind model arena comparison match
   */
  async requestArenaMatch(params: {
    prompt: string;
    category?: string;
    organizationId?: string;
    userId?: string;
  }): Promise<OmniArenaMatch> {
    const res = await fetch(`${this.baseApiUrl}/arena/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error('Failed to initialize blind arena match');
    }
    return await res.json();
  }

  /**
   * Vote on an arena match, revealing provider identities and calibrating Elo ratings
   */
  async voteArenaMatch(params: {
    matchId: string;
    winner: 'model_a' | 'model_b' | 'tie' | 'both_bad';
    userFeedbackReason?: string;
    organizationId?: string;
    userId?: string;
  }): Promise<{
    success: boolean;
    winner: string;
    revealed: {
      modelA: { id: string; name: string; provider: string; newElo: number };
      modelB: { id: string; name: string; provider: string; newElo: number };
    };
    message: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/arena/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error('Failed to record arena evaluation vote');
    }
    return await res.json();
  }

  /**
   * Fetch current Model Arena leaderboard
   */
  async getArenaLeaderboard(): Promise<{
    leaderboard: OmniArenaLeaderboardEntry[];
    totalEvaluations: number;
    timestamp: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/arena/leaderboard`);
    if (!res.ok) {
      throw new Error('Failed to fetch arena leaderboard');
    }
    return await res.json();
  }

  /**
   * Execute multi-stage deep research pipeline
   */
  async executeDeepResearch(params: {
    topic: string;
    scopeParameters?: {
      depth?: 'standard' | 'deep_multi_pass' | 'exhaustive_academic';
      domainsAllowed?: string[];
      maxSourcesToProbe?: number;
      includeInternalVaults?: boolean;
    };
    organizationId?: string;
    userId?: string;
  }): Promise<OmniDeepResearchExecution> {
    const res = await fetch(`${this.baseApiUrl}/deep-research/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error('Failed to execute deep research investigation');
    }
    return await res.json();
  }

  /**
   * Execute provider-neutral search with source links and quoted evidence
   */
  async search(params: {
    query: string;
    scope?: 'web' | 'enterprise_vault' | 'hybrid';
    organizationId?: string;
  }): Promise<{
    query: string;
    scope: string;
    synthesizedAnswer: string;
    citations: any[];
    followUpQuestions: string[];
    confidenceScore: number;
    isModelKnowledgeDistinctFromEvidence: boolean;
    timestamp: string;
    latencyMs: number;
  }> {
    const res = await fetch(`${this.baseApiUrl}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error('Failed to execute search query');
    }
    return await res.json();
  }

  // ==========================================
  // KNOWLEDGE SPACES & INGESTION
  // ==========================================

  /**
   * Fetch Knowledge Spaces for an organization with optional privacy filtering
   */
  async getKnowledgeSpaces(organizationId: string, userId?: string): Promise<OmniKnowledgeSpace[]> {
    const query = new URLSearchParams({ organizationId });
    if (userId) query.append('userId', userId);
    const res = await fetch(`${this.baseApiUrl}/knowledge/spaces?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch knowledge spaces');
    return await res.json();
  }

  /**
   * Create or register a new Knowledge Space
   */
  async createKnowledgeSpace(space: Partial<OmniKnowledgeSpace>): Promise<OmniKnowledgeSpace> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/spaces`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(space)
    });
    if (!res.ok) throw new Error('Failed to create knowledge space');
    return await res.json();
  }

  /**
   * Ingest a document, file, or cloud connection through the 9-stage pipeline
   */
  async ingestKnowledgeSource(params: {
    spaceId: string;
    organizationId: string;
    sourceName: string;
    sourceType: 'pdf' | 'office_file' | 'plain_text' | 'structured_json' | 'web_page' | 'app_record' | 'cloud_connector' | 'media_transcript';
    contentOrUri: string;
    isLinkedOnly?: boolean;
    customMetadata?: Record<string, any>;
    aclRules?: { entityType: 'user' | 'role' | 'tenant'; entityId: string; permission: 'read' | 'read_write' | 'admin' }[];
  }): Promise<{
    source: OmniKnowledgeSource;
    chunksCreated: number;
    tokensTotal: number;
    pipelineStageLog: string[];
    securityStatus: 'clean' | 'quarantined';
    message: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Ingestion pipeline error' }));
      throw new Error(err.error || 'Failed to ingest knowledge source');
    }
    return await res.json();
  }

  /**
   * Execute Hybrid Retrieval (Keyword BM25 + Vector Dense + Metadata + ACL filtering + Cross-Encoder Reranking)
   */
  async hybridRetrieve(request: OmniHybridRetrievalRequest): Promise<OmniHybridRetrievalResponse> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/retrieve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Hybrid retrieval failed' }));
      throw new Error(err.error || 'Failed to retrieve knowledge chunks');
    }
    return await res.json();
  }

  // ==========================================
  // 5-TIER MEMORY ENGINE
  // ==========================================

  /**
   * Fetch memory items across specified tiers with zero cross-tenant leakage
   */
  async getMemoryItems(params: {
    organizationId: string;
    tier?: OmniMemoryTier;
    userId?: string;
    appId?: string;
    agentId?: string;
    conversationId?: string;
  }): Promise<OmniMemoryItem[]> {
    const query = new URLSearchParams({ organizationId: params.organizationId });
    if (params.tier) query.append('tier', params.tier);
    if (params.userId) query.append('userId', params.userId);
    if (params.appId) query.append('appId', params.appId);
    if (params.agentId) query.append('agentId', params.agentId);
    if (params.conversationId) query.append('conversationId', params.conversationId);

    const res = await fetch(`${this.baseApiUrl}/memory?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch memory records');
    return await res.json();
  }

  /**
   * Write or update a memory record
   */
  async saveMemoryItem(item: Partial<OmniMemoryItem>): Promise<OmniMemoryItem> {
    const res = await fetch(`${this.baseApiUrl}/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to save memory item');
    return await res.json();
  }

  /**
   * Forget or purge a memory record (Cryptographic erasure)
   */
  async deleteMemoryItem(memoryId: string, organizationId: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${this.baseApiUrl}/memory/${memoryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationId })
    });
    if (!res.ok) throw new Error('Failed to purge memory record');
    return await res.json();
  }

  // ==========================================
  // KNOWLEDGE ASSISTANTS & GROUNDED RAG CHAT
  // ==========================================

  /**
   * Fetch Grounded Knowledge Assistants
   */
  async getKnowledgeAssistants(organizationId: string): Promise<OmniKnowledgeAssistant[]> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/assistants?organizationId=${organizationId}`);
    if (!res.ok) throw new Error('Failed to fetch knowledge assistants');
    return await res.json();
  }

  /**
   * Ask an Assistant grounded on Knowledge Spaces with ACL security and strict source citations
   */
  async queryAssistant(params: {
    assistantId: string;
    prompt: string;
    organizationId: string;
    userId: string;
    userRole?: string;
    conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
  }): Promise<{
    assistantId: string;
    responseText: string;
    citations: {
      sourceId: string;
      sourceName: string;
      chunkId: string;
      text: string;
      pageNumber?: number;
      relevanceScore: number;
    }[];
    tokensConsumed: { input: number; output: number; total: number };
    latencyMs: number;
    aclEnforced: boolean;
    isModelKnowledgeDistinctFromEvidence: boolean;
  }> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/assistants/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Assistant query failed' }));
      throw new Error(err.error || 'Failed to query knowledge assistant');
    }
    return await res.json();
  }

  // ==========================================
  // CONNECTORS & DIAGNOSTICS
  // ==========================================

  /**
   * Trigger sync on a Knowledge Connector
   */
  async syncConnector(connectorId: string, organizationId: string): Promise<{
    success: boolean;
    connectorId: string;
    documentsSynced: number;
    lastSyncTimestamp: string;
    message: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/connectors/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ connectorId, organizationId })
    });
    if (!res.ok) throw new Error('Failed to sync connector');
    return await res.json();
  }

  /**
   * Execute Diagnostic Test Suite (Purge, ACL Barrier, Conflict Reconciliation, Tenant Isolation, Benchmarks)
   */
  async runDiagnosticTests(testId?: string): Promise<{
    results: OmniDiagnosticTestResult[];
    totalPassed: number;
    totalFailed: number;
    overallStatus: 'all_passed' | 'has_failures';
    executionTimestamp: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/knowledge/diagnostics/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testId })
    });
    if (!res.ok) throw new Error('Failed to execute diagnostic test suite');
    return await res.json();
  }

  // ==========================================
  // OMNI CREATE: DOCUMENTS, SLIDES, SHEETS & WORKSPACE
  // ==========================================

  /**
   * Execute AI action on Document (Rewrite, Summarise, Expand, Translate, Adjust Tone, Document Q&A)
   */
  async executeDocumentAIAction(params: {
    action: 'rewrite' | 'summarize' | 'expand' | 'translate' | 'adjust_tone' | 'qa';
    documentTitle: string;
    content: string;
    selectedText?: string;
    tone?: string;
    targetLanguage?: string;
    question?: string;
    customInstruction?: string;
    organizationId?: string;
  }): Promise<{
    success: boolean;
    resultText: string;
    tokensUsed: number;
    latencyMs: number;
    modelUsed: string;
    action: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/create/document/ai-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Document AI action failed' }));
      throw new Error(err.error || 'Failed to execute document AI action');
    }
    return await res.json();
  }

  /**
   * AI-assisted Presentation Generation (Workflow: Prompt/Doc -> Outline -> Theme -> Slides)
   */
  async generatePresentation(params: {
    prompt: string;
    sourceDocumentContent?: string;
    slideCount?: number;
    themeId?: string;
    targetAudience?: string;
    organizationId?: string;
  }): Promise<{
    success: boolean;
    presentation: any;
    tokensUsed: number;
    latencyMs: number;
    modelUsed: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/create/slides/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Slide generation failed' }));
      throw new Error(err.error || 'Failed to generate presentation');
    }
    return await res.json();
  }

  /**
   * AI Redesign or Content Regeneration for a Single Slide
   */
  async redesignSlide(params: {
    slide: any;
    instruction: string;
    themeId?: string;
    organizationId?: string;
  }): Promise<{
    success: boolean;
    updatedSlide: any;
    tokensUsed: number;
    latencyMs: number;
  }> {
    const res = await fetch(`${this.baseApiUrl}/create/slides/redesign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Slide redesign failed' }));
      throw new Error(err.error || 'Failed to redesign slide');
    }
    return await res.json();
  }

  /**
   * Deterministic Sheet Data Analysis, Cleaning, Formula Computing & Forecasting
   */
  async analyzeSheetDeterministic(params: {
    spreadsheet: any;
    action: 'recalculate' | 'clean' | 'forecast' | 'ask_question' | 'generate_kpis';
    query?: string;
    options?: any;
    organizationId?: string;
  }): Promise<{
    success: boolean;
    spreadsheet?: any;
    forecast?: any;
    kpis?: any[];
    answer?: string;
    cleaningReport?: {
      deduplicatedCount: number;
      imputedValuesCount: number;
      normalizedTextCount: number;
    };
    tokensUsed: number;
    latencyMs: number;
  }> {
    const res = await fetch(`${this.baseApiUrl}/create/sheets/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Spreadsheet analysis failed' }));
      throw new Error(err.error || 'Failed to analyze spreadsheet');
    }
    return await res.json();
  }

  /**
   * Universal AI Command Bar Execution with Artifact References
   */
  async executeCommandBar(params: {
    commandPrompt: string;
    inputArtifactReferences: {
      id: string;
      type: string;
      title?: string;
      contentSnippet?: string;
    }[];
    organizationId: string;
  }): Promise<{
    success: boolean;
    generatedArtifactType: 'document' | 'slide' | 'sheet' | 'text';
    artifact: any;
    summaryMessage: string;
    tokensUsed: number;
    latencyMs: number;
    modelUsed: string;
  }> {
    const res = await fetch(`${this.baseApiUrl}/create/command-bar/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Command Bar execution failed' }));
      throw new Error(err.error || 'Failed to execute command bar action');
    }
    return await res.json();
  }
}

// Global Singleton Instance
export const omniAi = new OmniAiClient();
