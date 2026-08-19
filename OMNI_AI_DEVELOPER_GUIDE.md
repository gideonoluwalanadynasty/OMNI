# OMNI AI Developer Guide & Cross-App Integration Contract
**Document Reference:** `OMNI-DEV-SDK-2026-V1`  
**Target Audience:** OMNI Core Engineers, Specialist App Developers, Ecosystem Partners  
**Version:** 1.0.0  

---

## 1. Overview & Architectural Philosophy

The **OMNI AI SDK** (`@omni/ai-sdk` / `src/lib/omniAiSdk.ts`) is the official client interface for any application running within the OMNI Operating System.

### Golden Rule for OMNI Application Developers
> **Never embed direct foundation model SDKs (e.g., direct OpenAI, Anthropic, or Gemini libraries) inside individual OMNI applications.**
> Always route requests through the canonical **OMNI AI Gateway** via the `@omni/ai-sdk`.

This guarantees:
1. **Single Sovereign Identity:** Uses active OMNI Passport session and RBAC permissions automatically.
2. **Unified Billing & Double-Entry Ledger:** Usage is metered in standard OMNI Credit Units (OCU) or charged to the tenant's active subscription.
3. **Enterprise Governance & Redaction:** Transparently applies L1–L4 threat defense, PII scrubbing, zero-training guarantees, and statutory disclaimers.
4. **Dynamic Model Routing & Failovers:** Applications stay resilient to external API outages with automatic fallback chains.

---

## 2. Canonical Cross-OMNI Integration Workflow

Every interaction between an OMNI Application (e.g., OMNI Pay, OMNI Market, OMNI CRM, OMNI Docs) and OMNI AI follows this canonical 9-step pipeline:

```
+-------------------+
|     OMNI App      |  (e.g., OMNI CRM / OMNI Market)
+---------+---------+
          | 1. User Action
+---------v---------+
|   OMNI Passport   |  2. Authenticates user session & resolves RBAC profile
+---------+---------+
          | 3. Passes Token + App Scopes
+---------v---------+
|    @omni/ai-sdk   |  4. Constructs typed request with routing preferences
+---------+---------+
          | 5. Dispatch RPC
+---------v---------+
|  OMNI AI Gateway  |  6. L1 Firewall check, dynamic policy routing & budget check
+---------+---------+
          | 7. Execution
+---------v---------+
| Model / Tool / RAG|  8. Generates completion or invokes sandboxed tool
+---------+---------+
          | 9. Response & Ledger Settlement
+---------v---------+
| OMNI Core Ledger  |  Debits OCU, emits domain event, returns sanitized result
+-------------------+
```

---

## 3. Quickstart Integration in React / TypeScript

### 3.1 Basic Prompt Execution
```typescript
import { omniAi } from '@omni/ai-sdk';

async function generateSummary(text: string, orgId: string) {
  try {
    const result = await omniAi.routePrompt({
      prompt: `Summarize the following customer contract:\n${text}`,
      preferredProfile: 'speed_optimized', // 'cost_optimized' | 'quality_first' | 'privacy_local'
      organizationId: orgId,
      maxTokens: 500,
      temperature: 0.2,
      systemPrompt: 'You are an executive legal analyst for OMNI Enterprise.'
    });

    console.log('Summary:', result.text);
    console.log('Model Used:', result.modelId);
    console.log('Latency:', result.latencyMs, 'ms');
    console.log('Tokens:', result.tokens.total);
  } catch (error) {
    console.error('OMNI AI Generation Error:', error);
  }
}
```

### 3.2 Grounded Web & Enterprise Search
```typescript
import { omniAi } from '@omni/ai-sdk';

async function searchWithCitations(query: string, orgId: string) {
  const response = await omniAi.groundedSearch({
    query: 'Latest tax regulation changes for UK subsidiaries in 2026',
    includeWebSearch: true,
    includeKnowledgeSpaces: true,
    organizationId: orgId,
    maxCitations: 5
  });

  console.log('Synthesized Answer:', response.answer);
  response.citations.forEach(cite => {
    console.log(`[${cite.index}] ${cite.title} - ${cite.url} (Confidence: ${cite.confidence}%)`);
  });
}
```

---

## 4. Specialist Application Extension Contracts

Specialist OMNI applications can register custom capabilities into OMNI AI without modifying core platform code.

### 4.1 Registering Custom Tools & Actions
Specialist apps can expose tools (e.g., `omni_pay_create_invoice`, `omni_crm_sync_contact`) to the universal agent swarm:

```typescript
export interface OmniToolDefinition {
  toolId: string;
  appId: string;
  name: string;
  description: string;
  parametersJsonSchema: Record<string, any>;
  requiredPermissions: string[];
  executionEndpoint: string;
  isFinancialAction: boolean;
  requiresHumanApproval: boolean;
}

// Example: Registering an OMNI Pay invoice creation tool
const invoiceTool: OmniToolDefinition = {
  toolId: 'tool_pay_create_invoice_v1',
  appId: 'app_pay',
  name: 'Create Customer Invoice',
  description: 'Generates a compliant multi-currency tax invoice and dispatches it to the client.',
  parametersJsonSchema: {
    type: 'object',
    properties: {
      customerId: { type: 'string' },
      amount: { type: 'number' },
      currency: { type: 'string', enum: ['USD', 'EUR', 'GBP'] },
      lineItems: { type: 'array', items: { type: 'string' } }
    },
    required: ['customerId', 'amount', 'currency']
  },
  requiredPermissions: ['pay:invoices:write', 'ai:tools:execute'],
  executionEndpoint: '/api/v1/apps/pay/tools/create-invoice',
  isFinancialAction: true,
  requiresHumanApproval: true // Triggers Human-in-the-Loop co-signing modal if amount > $100
};
```

### 4.2 Registering Custom Knowledge Connectors
Applications with private document or entity stores (e.g., OMNI Drive, OMNI CRM) can expose RAG connectors:

```typescript
export interface OmniKnowledgeConnectorConfig {
  connectorId: string;
  sourceAppId: string;
  displayName: string;
  syncIntervalMinutes: number;
  supportedMimeTypes: string[];
  fetchEntitiesEndpoint: string;
  generateEmbeddingsOnSync: boolean;
}
```

### 4.3 Subscribing to AI Domain Webhook Events
Applications can listen to asynchronous AI events on the OMNI Event Bus:

| Event Topic | Description | Payload Attributes |
| :--- | :--- | :--- |
| `ai.request.completed` | Emitted whenever an AI inference job finishes. | `requestId`, `tokens`, `modelId`, `costUsd`, `latencyMs` |
| `ai.agent.action.approval_required` | Emitted when an autonomous agent requests permission to execute a tool. | `agentId`, `toolId`, `actionPayload`, `riskLevel`, `thresholdUsd` |
| `ai.agent.action.approved` | Emitted when human co-signer approves the tool action. | `actionId`, `approverUserId`, `approvedAt` |
| `ai.research.dossier.ready` | Emitted when deep research synthesis compiles an artifact. | `researchId`, `topic`, `artifactUrl`, `citationCount` |
| `ai.budget.threshold.exceeded` | Emitted when monthly compute consumption reaches 80% or 100%. | `tenantId`, `currentSpendUsd`, `budgetLimitUsd` |

---

## 5. Security & Isolation Rules for App Developers

1. **Never Forward Raw Tenant API Keys to Browsers:** The `@omni/ai-sdk` communicates with server-side proxy routes that attach encrypted server secrets.
2. **Always Provide `organizationId`:** OMNI AI verifies that the caller's Passport session is authorized for the target organization before executing prompts or querying vector stores.
3. **Respect Idempotency Headers:** When executing multi-step agent actions or financial tools, include a unique `idempotencyKey` to prevent duplicate charges or duplicate actions during network retries.
