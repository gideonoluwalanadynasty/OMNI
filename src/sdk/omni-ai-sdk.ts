/**
 * @omni/ai-sdk - Universal Client & Server SDK for Sovereign OMNI Ecosystem Intelligence
 *
 * CRITICAL ARCHITECTURAL RULE:
 * No OMNI application should integrate directly with third-party LLM providers (Gemini, OpenAI, Claude).
 * All AI capabilities, tool calls, agent orchestrations, and embeddings MUST pass through OMNI AI
 * to enforce multi-tenant isolation, RBAC scopes, budget caps, and human-in-the-loop approvals.
 */

import {
  OmniAgentSpec,
  OmniToolSpec,
  OmniRoutingProfile,
  OmniRoutingTaskType,
  OmniToolExecutionRecord,
  OmniHumanApprovalTask,
  OmniAiSdkCallLog
} from '../types';

export interface OmniAiSdkConfig {
  apiKey?: string;
  tenantId: string;
  organizationId: string;
  applicationId: string;
  userId?: string;
  baseUrl?: string;
  preferredProfile?: OmniRoutingProfile;
  timeoutMs?: number;
}

export interface CompletionRequest {
  prompt: string;
  taskType?: OmniRoutingTaskType;
  preferredProfile?: OmniRoutingProfile;
  forcedModelId?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  enableCache?: boolean;
}

export interface CompletionResponse {
  success: boolean;
  text: string;
  modelId: string;
  providerId: string;
  tokensConsumed: {
    input: number;
    output: number;
    total: number;
  };
  costUsd: number;
  latencyMs: number;
  cacheHit?: boolean;
  routingReasoning?: string[];
}

export interface ResearchRequest {
  topic: string;
  hypothesis?: string;
  maxSources?: number;
  depth?: 'standard' | 'deep' | 'exhaustive';
}

export interface CallAgentRequest {
  agentId: string;
  taskPrompt: string;
  parameters?: Record<string, any>;
  idempotencyKey?: string;
  requireApprovalIfThresholdExceeded?: boolean;
}

export interface CallAgentResponse {
  success: boolean;
  executionId: string;
  agentId: string;
  agentName: string;
  status: 'completed' | 'requires_approval' | 'failed';
  outputText?: string;
  approvalTask?: OmniHumanApprovalTask;
  toolsExecuted?: string[];
  costUsd: number;
  latencyMs: number;
}

export interface RegisterAgentRequest {
  name: string;
  description: string;
  instructions: string;
  type?: string;
  category?: 'core' | 'operations' | 'growth' | 'finance' | 'engineering' | 'creator' | 'custom';
  defaultModelId?: string;
  routingProfile?: OmniRoutingProfile;
  knowledgeSpaceIds?: string[];
  allowedToolIds?: string[];
  autonomyLevel?: 0 | 1 | 2 | 3 | 4 | 5;
  permissions?: string[];
  budgetMonthlyUsd?: number;
  approvalRequiredAboveUsd?: number;
}

export interface RegisterToolRequest {
  name: string;
  displayName: string;
  category: string;
  description: string;
  requiredScopes?: string[];
  requiredRoles?: string[];
  parametersList: Array<{
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    description: string;
    required: boolean;
    defaultValue?: any;
    enumValues?: string[];
  }>;
  isHighRisk?: boolean;
  requiresApprovalByDefault?: boolean;
  defaultApprovalThresholdUsd?: number;
  idempotencyRequired?: boolean;
}

export interface SubmitKnowledgeRequest {
  spaceId: string;
  documentTitle: string;
  content: string;
  mimeType?: string;
  metadata?: Record<string, any>;
}

export interface RequestMediaRequest {
  prompt: string;
  mediaType: 'image' | 'video' | 'audio' | '3d';
  aspectRatio?: string;
  stylePreset?: string;
  durationSeconds?: number;
}

export class OmniAiSdk {
  private config: OmniAiSdkConfig;
  private baseUrl: string;

  constructor(config: OmniAiSdkConfig) {
    this.config = {
      preferredProfile: 'balanced',
      timeoutMs: 30000,
      baseUrl: '',
      ...config
    };
    this.baseUrl = this.config.baseUrl || '';
  }

  /**
   * Helper: Dispatches authenticated requests to the central OMNI AI gateway
   */
  private async dispatch<T>(endpoint: string, payload: Record<string, any>): Promise<T> {
    const enrichedPayload = {
      ...payload,
      tenantId: this.config.tenantId,
      organizationId: this.config.organizationId,
      applicationId: this.config.applicationId,
      userId: this.config.userId || 'usr_omni_active',
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OMNI-API-KEY': this.config.apiKey || 'omni_passport_session',
        'X-OMNI-TENANT-ID': this.config.tenantId,
        'X-OMNI-APP-ID': this.config.applicationId
      },
      body: JSON.stringify(enrichedPayload)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Network request failed' }));
      throw new Error(err.error || `OMNI AI SDK request failed with status ${response.status}`);
    }

    return response.json();
  }

  /**
   * 1. Request Intelligent Completion via the Sovereign Router
   */
  async requestCompletion(params: CompletionRequest): Promise<CompletionResponse> {
    return this.dispatch<CompletionResponse>('/api/v1/ai/route', {
      prompt: params.prompt,
      taskType: params.taskType || 'chat',
      preferredProfile: params.preferredProfile || this.config.preferredProfile,
      forcedModelId: params.forcedModelId,
      systemPrompt: params.systemPrompt,
      enableCache: params.enableCache !== false
    });
  }

  /**
   * Shorthand alias for requestCompletion
   */
  async complete(params: CompletionRequest): Promise<CompletionResponse> {
    return this.requestCompletion(params);
  }

  /**
   * 2. Run Deep Autonomous Research Session
   */
  async runResearch(params: ResearchRequest): Promise<any> {
    return this.dispatch('/api/ai/research/start', {
      topic: params.topic,
      hypothesis: params.hypothesis || '',
      depth: params.depth || 'standard'
    });
  }

  /**
   * 3. Call an Autonomous Agent in the Shared Registry
   */
  async callAgent(params: CallAgentRequest): Promise<CallAgentResponse> {
    return this.dispatch<CallAgentResponse>('/api/ai/agents/invoke', {
      agentId: params.agentId,
      taskPrompt: params.taskPrompt,
      parameters: params.parameters || {},
      idempotencyKey: params.idempotencyKey || `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      requireApprovalIfThresholdExceeded: params.requireApprovalIfThresholdExceeded !== false
    });
  }

  /**
   * 4. Dynamically Register a New Specialist Agent
   */
  async registerAgent(params: RegisterAgentRequest): Promise<{ success: boolean; agent: OmniAgentSpec }> {
    return this.dispatch('/api/ai/agents/register', {
      agentConfig: params
    });
  }

  /**
   * 5. Expose an Authorized Tool from an OMNI Application
   */
  async registerTool(params: RegisterToolRequest): Promise<{ success: boolean; tool: OmniToolSpec }> {
    return this.dispatch('/api/ai/tools/register', {
      toolConfig: params
    });
  }

  /**
   * 6. Submit Knowledge to Ingestion Pipeline
   */
  async submitKnowledge(params: SubmitKnowledgeRequest): Promise<{ success: boolean; documentId: string }> {
    return this.dispatch('/api/ai/knowledge/documents/create', {
      spaceId: params.spaceId,
      title: params.documentTitle,
      content: params.content,
      mimeType: params.mimeType || 'text/markdown',
      metadata: params.metadata || {}
    });
  }

  /**
   * 7. Request Vector Embeddings
   */
  async requestEmbedding(text: string, dimensions: number = 768): Promise<{ success: boolean; vector: number[]; dimensions: number }> {
    return this.dispatch('/api/ai/embeddings/generate', {
      text,
      dimensions
    });
  }

  /**
   * 8. Request Multimodal Media Generation (Images/Audio/Video)
   */
  async requestMedia(params: RequestMediaRequest): Promise<{ success: boolean; mediaUrl: string; metadata: any }> {
    return this.dispatch('/api/ai/media/generate', {
      prompt: params.prompt,
      type: params.mediaType,
      aspectRatio: params.aspectRatio || '1:1',
      style: params.stylePreset || 'hyper-realistic'
    });
  }

  /**
   * 9. Retrieve Approved Usage & Cost Telemetry
   */
  async getApprovedUsage(timeRange: 'day' | 'week' | 'month' = 'month'): Promise<{
    success: boolean;
    tenantId: string;
    totalTokens: number;
    totalCostUsd: number;
    callsCount: number;
    spendCapUsd: number;
  }> {
    return this.dispatch('/api/ai/telemetry/usage', {
      timeRange
    });
  }
}

/**
 * Singleton factory for rapid instantiations across client apps
 */
export function createOmniAiClient(config: OmniAiSdkConfig): OmniAiSdk {
  return new OmniAiSdk(config);
}

export const omniAiSdk = new OmniAiSdk({
  tenantId: 'tenant_default',
  organizationId: 'org_omni_global',
  applicationId: 'omni_browser'
});

