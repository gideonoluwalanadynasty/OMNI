# OMNI Finance OS — AI Financial Intelligence & Agent Governance Framework

**Classification:** Enterprise AI Governance & Safety Standard  
**Compliance Standard:** NIST AI Risk Management Framework (AI RMF 1.0), EU AI Act (High-Risk Financial AI), ISO/IEC 42001  
**Status:** ENFORCED AT RUNTIME  

---

## 1. AI Safety & Governance Philosophy

OMNI Finance OS integrates **7 Specialized AI Financial Agents** to deliver predictive analytics, automated bookkeeping, and compliance assistance.

> **CRITICAL SECURITY INVARIANT:**  
> **Artificial Intelligence agents possess ZERO autonomous authority to move funds, alter account balances, approve wires, or modify general ledger journal entries.**  
> All financial mutations require human cryptographic sign-off (WebAuthn / Passkey / 4-Eyes Dual Authorization).

---

## 2. Seven Specialized Financial AI Agents

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OMNI FINANCIAL AI AGENT SPECIALIZATIONS                  │
├─────────────────────────┬──────────────────────────┬────────────────────────┤
│ Agent Name              │ Analytical Scope         │ Permissions            │
├─────────────────────────┼──────────────────────────┼────────────────────────┤
│ 1. Personal Wealth AI   │ Budgeting, 50/30/20 Rule │ Read-Only              │
│ 2. Treasury Copilot     │ Cash sweeps, yield sim   │ Read-Only (Drafts only)│
│ 3. Working Capital AI   │ Invoice factoring scores │ Read-Only              │
│ 4. FX Arbitrage Copilot │ Spot hedging quotes      │ Read-Only              │
│ 5. Compliance Radar AI  │ Smurfing, SAR drafts     │ Read-Only (Triage only)│
│ 6. Tax Optimizer AI     │ VAT/GST categorization   │ Read-Only (Tagging)    │
│ 7. Developer SDK AI     │ API code snippet gen     │ Read-Only              │
└─────────────────────────┴──────────────────────────┴────────────────────────┘
```

---

## 3. Strict Architectural Boundary Enforcements

### 3.1 Zero Direct Database Write Access
- AI agents run under dedicated database roles with `GRANT SELECT` privileges exclusively scoped to analytical views (`v_analytics_*`).
- Physical tables (`accounts`, `wallets`, `journal_entries`, `transactions`) possess `REVOKE ALL PRIVILEGES` for the AI service account.

### 3.2 Anti-Prompt Injection Defense Shield
- **Pre-Execution Sanitizer:** User inputs pass through an adversarial filter trained to detect instruction overrides, jailbreaks, and system prompt exfiltration attempts.
- **Deterministic Tool Invocation:** The AI cannot construct raw SQL, shell commands, or arbitrary network requests. All agent capabilities map to strictly typed JSON schema function declarations.

### 3.3 Strict Multi-Tenant Data Isolation
- Vector retrieval embeddings (RAG) and analytical contexts are partitioned by cryptographic `tenant_id` hashes.
- Embeddings belonging to Tenant A are never queried or visible to Tenant B under any circumstance.

### 3.4 Human-in-the-Loop (HITL) Cryptographic Gate
When an AI agent identifies an optimization opportunity (e.g. *"Executing a $50,000 sweep to a 5.2% yield vault will save $210/mo"*):
1. The AI generates an immutable **Draft Action Proposal**.
2. The proposal is presented in the user's dashboard with detailed cost-benefit analysis.
3. The transaction is ONLY executed when an authorized human signs the action using their hardware security key or biometric passkey.
