# OMNI AI Integration Audit & Application Contract Report

**Document Version:** 1.0.0  
**Target Application:** OMNI AI (`app_ai` / `ai`)  
**Preferred Routes:** `https://ai.omni.com` | `https://omni.com/ai`  
**Date:** 2026-08-15  
**Architectural Baseline:** OMNI Core Sovereign Platform  

---

## 1. Executive Summary & Architectural Rule

OMNI Core already houses the shared global infrastructure: Sovereign Identity (OMNI Passport), Double-Entry Accounting Ledger, Multi-Tenant Database Isolation, Dynamic App Registry, Universal Event Bus & Webhook Gateway, White-Label/Reseller Engines, and Central Governance.

**The Golden Directive:**  
OMNI AI must **PRODUCTIZE, EXTEND, and EXPOSE** existing OMNI Core shared infrastructure. It must **NEVER** duplicate:
1. Identity / Authentication / SSO (Uses OMNI Passport & OIDC);
2. Organization / Tenant Isolation (Uses OMNI Tenant Boundary & RLS);
3. Financial / Wallet / Billing (Uses OMNI Shared Ledger & Double-Entry Accounting);
4. Affiliate / Reseller / Partner Attributions (Uses OMNI Universal Growth Engine);
5. Notifications / Messaging (Uses OMNI Notification Gateway & Inbox);
6. Analytics / Audit Logging (Uses OMNI Unified Audit Stream & Event Bus);
7. White-Label DNS / Theming (Uses OMNI White-Label Engine).

---

## 2. Comprehensive Component Classification Matrix

Every subsystem and file across the repository has been evaluated against the OMNI AI application contract.

| Component / Subsystem | Path / Reference | Classification | Strategic Action & Integration Plan |
| :--- | :--- | :--- | :--- |
| **OMNI Passport SSO & Identity** | `src/types.ts` (`User`, `Profile`), `useOmni.ts`, `PassportDashboardPage.tsx` | **CONNECT** | Directly authenticate OMNI AI users via Passport. Read active profile (`creator`, `developer`, `professional`, `investor`, etc.) to tailor AI agent responses and capabilities. |
| **Tenant & Organization Context** | `src/types.ts` (`Organization`, `Membership`), `store.ts` | **CONNECT** | Enforce multi-tenant boundaries on all AI conversations, knowledge vaults, custom agents, and billing caps. Switch active org seamlessly. |
| **Shared Double-Entry Wallet** | `src/types.ts` (`OmniWallet`, `DoubleEntryTransaction`), `OMNIFinancialPage.tsx` | **CONNECT** | Settle AI inference costs, fine-tuning fees, and marketplace purchases directly against the organization's OMNI Wallet and credit balances. |
| **AI Providers & Models State** | `src/types.ts` (`AIProvider`, `AIModel`), `store.ts` | **EXTEND** | Enhance existing multi-provider abstractions (Gemini 1.5 Pro, Claude 3.5 Sonnet, GPT-4o, Local DeepSeek, Whisper, Lyria) with streaming metrics, multimodal flags, and context limit gauges. |
| **AI Agents & Autonomy Engine** | `src/types.ts` (`AIAgent`, `AIAutonomyRule`, `AIApprovalTask`) | **EXTEND** | Productize existing autonomy levels (0 to 5), tool binding policies, and human-in-the-loop approval workflows into the dedicated OMNI AI Agent Orchestrator. |
| **AI Knowledge Sources & RAG** | `src/types.ts` (`KnowledgeSource`), `store.ts` | **EXTEND** | Expand knowledge sources to support chunking previews, vector embeddings status, multi-file attachments, and enterprise document vaults. |
| **AI Command Bar (`Cmd+K`)** | `src/components/AiCommandBar.tsx` | **KEEP** | Retain global keyboard-driven command interface across OMNI Core and bridge commands to OMNI AI routes. |
| **AI Operating System Admin Page** | `src/components/AiOperatingSystemPage.tsx` | **KEEP** | Keep as the backend/administrative AI configuration panel (managing raw API keys, provider endpoints, and org budget limits). |
| **OMNI AI Application Shell** | `src/components/OMNIAiAppPage.tsx` | **MISSING -> BUILD** | Build the consumer- and enterprise-facing OMNI AI product shell with Home, Chat, Search, Research, Knowledge, Create, Code, Agents, Workspace, and Marketplace tabs. |
| **AI Domain Events** | `src/types.ts` (`DomainEvent`, `WebhookEventTopic`) | **EXTEND** | Register versioned `ai.*` domain events (`ai.request.started`, `ai.request.completed`, `ai.agent.action.approved`, etc.) to trigger webhooks and audit streams. |
| **Granular AI Scopes** | `src/types.ts` (`AppRegistration.requiredScopes`) | **EXTEND** | Register official granular scopes (`ai.chat.use`, `ai.search.use`, `ai.research.run`, `ai.knowledge.read/write`, `ai.agents.run`, `ai.code.use`, etc.). |
| **Universal App Registry** | `src/store.ts` (`SEED_APPS`), `OMNIDeveloperPortalPage.tsx` | **EXTEND** | Register `app_ai` / `ai` as a native Tier-1 application with full metadata, routes, subdomains, and capability declarations. |
| **Legacy Mock AI Handlers** | Fragmented string generators | **DEPRECATE** | Replace any hardcoded or ungrounded mock responses with structured telemetry, typed state dispatchers, and Gemini API server-side streaming integrations. |
| **Multilingual & RTL Engine** | OMNI UI Components | **EXTEND** | Provide native support for English, Spanish, French, German, Japanese, and Arabic (with dynamic `dir="rtl"` bidirectional layout). |
| **Theme & Accessibility** | OMNI Design System | **CONNECT** | Adhere to OMNI 16px baseline typography, WCAG AA high-contrast tokens, dark/light system sync, and motion micro-interactions. |

---

## 3. Scope Definition & Permission Contract

OMNI AI registers 19 granular permissions within the extensible OMNI RBAC system:

```typescript
export type OmniAiScope =
  | 'ai.chat.use'            // Invoke conversation sessions with LLMs
  | 'ai.search.use'          // Execute real-time web & grounded searches
  | 'ai.research.run'        // Launch autonomous multi-step research investigations
  | 'ai.knowledge.read'      // Read private organizational knowledge vaults
  | 'ai.knowledge.write'     // Upload, index, and modify knowledge documents
  | 'ai.files.upload'        // Attach files, datasets, and media to prompts
  | 'ai.documents.create'    // Generate formatted documents and reports
  | 'ai.slides.create'       // Synthesize presentations and slide decks
  | 'ai.sheets.create'       // Generate structured data tables and calculations
  | 'ai.media.generate'      // Synthesize images, audio, and visual assets
  | 'ai.agents.create'       // Author and customize autonomous agents
  | 'ai.agents.run'          // Execute autonomous agent workloads
  | 'ai.tools.invoke'        // Grant agents authority to execute external tools
  | 'ai.code.use'            // Run sandboxed code interpretation & debugging
  | 'ai.models.select'       // Switch between foundation models & local providers
  | 'ai.team.manage'         // Administer workspace members and shared libraries
  | 'ai.billing.view'        // Monitor token usage, compute costs, and budget limits
  | 'ai.provider.manage'     // Configure third-party AI keys & model gateways
  | 'ai.admin.manage';       // Super-admin governance over AI security & autonomy
```

---

## 4. Domain Event Specifications

All AI events conform to the versioned `DomainEvent` envelope:

```typescript
export interface OmniAiEventPayloads {
  'ai.request.started': {
    version: '1.0.0';
    requestId: string;
    modelId: string;
    agentId?: string;
    organizationId: string;
    userId: string;
    promptLength: number;
    timestamp: string;
  };
  'ai.request.completed': {
    version: '1.0.0';
    requestId: string;
    modelId: string;
    inputTokens: number;
    outputTokens: number;
    latencyMs: number;
    costUsd: number;
    organizationId: string;
  };
  'ai.request.failed': {
    version: '1.0.0';
    requestId: string;
    errorCode: string;
    errorMessage: string;
    providerId: string;
    timestamp: string;
  };
  'ai.usage.recorded': {
    version: '1.0.0';
    usageId: string;
    organizationId: string;
    costUsd: number;
    billingPeriod: string;
  };
  'ai.agent.created': {
    version: '1.0.0';
    agentId: string;
    name: string;
    autonomyLevel: number;
    authorUserId: string;
  };
  'ai.agent.run.started': {
    version: '1.0.0';
    runId: string;
    agentId: string;
    goal: string;
    taskQueueCount: number;
  };
  'ai.agent.action.requested': {
    version: '1.0.0';
    taskId: string;
    agentId: string;
    toolName: string;
    requiresApproval: boolean;
    monetaryValue?: number;
  };
  'ai.agent.action.approved': {
    version: '1.0.0';
    taskId: string;
    approverUserId: string;
    timestamp: string;
  };
  'ai.agent.action.executed': {
    version: '1.0.0';
    taskId: string;
    status: 'success' | 'failed';
    executionTimeMs: number;
  };
  'ai.knowledge.indexed': {
    version: '1.0.0';
    sourceId: string;
    chunksCount: number;
    vectorDimension: number;
    orgId: string;
  };
  'ai.artifact.created': {
    version: '1.0.0';
    artifactId: string;
    type: 'document' | 'slide' | 'sheet' | 'image' | 'code';
    title: string;
  };
  'ai.marketplace.item.published': {
    version: '1.0.0';
    itemId: string;
    itemType: 'agent' | 'prompt' | 'tool' | 'workflow';
    authorOrgId: string;
    priceUsd: number;
  };
}
```

---

## 5. Architectural Verification & Zero-Downtime Guarantee

1. **Non-Destructive Co-Existence**: The backend administrative view `AiOperatingSystemPage.tsx` remains untouched as the system-level AI gateway manager.
2. **Product Shell Mount**: The new `OMNIAiAppPage.tsx` is mounted at `state.activeView === 'ai'` or `state.activeAppId === 'app_ai'` and linked directly into the universal sidebar, top bar app switcher, and `Cmd+K` command console.
3. **Double-Entry Guarantee**: When AI tokens or marketplace items are purchased, transactions write directly to the OMNI Ledger with corresponding credit/debit legs.
