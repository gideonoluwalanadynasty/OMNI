# OMNI Connect — Customer Relationship Operating System (CRM) Architecture & Implementation Guide

## 1. Executive Summary & Vision

The **OMNI Customer Relationship Operating System (CRM)** is an enterprise-grade, intelligence-native CRM layer natively built into **OMNI Connect**. It bridges the gap between high-frequency communication (social messenger, broadcast channels, groups, and HD video spaces) and high-value commercial outcomes (sales pipeline, billing, merchant orders, customer support, and automated lifecycles).

### The Core Vision
> *"The objective is to transform everyday conversations into intelligent, long-term business relationships."*

```
Every Interaction:
Contact ──▶ Lead ──▶ Customer ──▶ Transaction ──▶ Relationship ──▶ Retention
```

---

## 2. Architectural Integration Matrix

Rather than creating isolated silos, OMNI CRM operates as a unified node connected to existing platform subsystems:

| Platform Subsystem | Integration Point | Data & Functional Flow |
| :--- | :--- | :--- |
| **OMNI Passport & Contacts** | Universal Identity Hub | Cryptographic identity, verified badges, multi-role accounts (`@handle`, Sovereign Passport UID), biometric verification status. |
| **OMNI Relationship Graph** | Graph & Circles Engine | Degree of separation, mutual node clusters, trust scores, interaction cadence, sovereign access circles. |
| **OMNI Universal Inbox** | Messenger & Channels | Single unified inbox receiving social DMs, marketplace inquiries, enterprise contact forms, and support tickets with live SLA tracking. |
| **OMNI Finance OS & Ledger** | Financial OS & Double-Entry Ledger | Real-time lifetime value (LTV), transaction histories, escrow status, smart invoicing, and automated credit scoring. |
| **OMNI Commerce & Marketplace** | Product Catalogues & Storefronts | Multi-item basket checkouts, payment requests generated directly in chat threads, and physical/digital fulfillment tracking. |
| **OMNI AI Mesh (Gemini 2.5)** | Copilot & Automation Engine | Real-time sentiment analysis, conversation summarization, deal risk prediction, automated triage, and objection handling drafts. |

---

## 3. Core Modules & Component Architecture

OMNI CRM is structured across 9 modular, interoperable sub-views managed by `OmniCrmRoot.tsx`:

```
/src/components/connect/crm/
├── OmniCrmRoot.tsx                 # Master CRM controller with state coordination and tab routing
├── OmniCrmPipelineView.tsx         # 6-stage Kanban board with probability-weighted revenue metrics
├── OmniCustomer360View.tsx         # Holistic Customer 360 dossier, ledger history, and relationship graph
├── OmniLeadManagementView.tsx      # AI lead scoring (0-100), engagement velocity, and 1-click deal conversion
├── OmniBusinessInboxView.tsx       # SLA timer monitoring, AI copilot responses, team routing, internal notes
├── OmniAutomationEngineView.tsx    # Visual trigger-condition-action workflow builder with live simulation
├── OmniCustomerJourneysView.tsx    # Multi-step lifecycle marketing sequences (Onboarding, Nurture, Churn)
├── OmniAiBusinessAssistantView.tsx # Gemini-powered enterprise sales copilot, deal insights, and email drafting
├── OmniCrmAnalyticsView.tsx        # Executive revenue operations dashboard, pipeline velocity, lead attribution
├── OmniCrmAdminControlView.tsx     # Super Admin governance, data residency, 2FA monetary limits, and RBAC
└── OmniCrmTestSuiteModal.tsx       # 8-Point automated diagnostic suite validating end-to-end CRM integrity
```

---

## 4. Deep-Dive: Customer 360 Profile Specification

The `Customer360Profile` model consolidates 5 dimensions into a single unified dossier:

1. **Identity & Reputation**:
   - Passport UID, cryptographic handle (`@handle`), verified human badges.
   - Internal Credit Score (300-850) and Reputation Index (0-1000).
   - Timezone, primary spoken/written languages, and active organizational affiliation.

2. **Real-Time Financial Standing**:
   - Total Lifetime Value (LTV) calculated from verified settled ledger entries.
   - Total orders count, average order value (AOV), and outstanding receivable balance.
   - Direct itemized purchase history linked to OMNI Commerce order IDs.

3. **Multi-Channel Interaction History**:
   - Chronological unified timeline aggregating DMs, voice calls, video meetings, tickets, notes, and store visits.
   - Sentiment trajectory tracking (Positive, Neutral, Urgent, At Risk).

4. **Predictive AI Signals**:
   - **Churn Risk Score** (0-100%) with actionable trigger causes.
   - **Next Best Action** recommendations tailored to the customer's buying cycle.
   - **Upsell / Expansion Opportunities** identified by conversation semantics.

5. **Associated Commercial Entities**:
   - Active and historic CRM Deals, support tickets, and assigned team members.

---

## 5. Sales Pipeline & Deal Management

The Pipeline Engine (`OmniCrmPipelineView.tsx`) visualizes deals across standard enterprise stages:

```
[1. Lead Inbound] ──▶ [2. Discovery] ──▶ [3. Proposal] ──▶ [4. Negotiation] ──▶ [5. Closed Won / 6. Closed Lost]
```

### Key Capabilities:
- **Weighted Revenue Forecasting**: Calculates Expected Value as `Deal Value × Stage Probability %`.
- **Drag-and-Drop Stage Transitions**: Real-time probability recalculation and activity timestamp updates.
- **Product Multi-Select**: Direct linkage to products defined in OMNI Commerce catalogues.
- **Assigned Representative Roster**: Seamless workload balancing across sales teams.

---

## 6. Business Inbox & SLA Automation Engine

The Business Inbox (`OmniBusinessInboxView.tsx`) unifies customer communications across channels while enforcing strict service-level agreements:

- **SLA Breach Monitoring**: Real-time elapsed time calculation with visual amber/red countdown indicators.
- **Dual-Mode Messaging**: Toggle between customer-facing responses and yellow-highlighted internal team notes.
- **AI Suggested Responses**: Gemini-generated reply recommendations reflecting tone and context.
- **Automated Routing**: Reassign conversations to Tier-1, Tier-2, or Account Executives based on deal size or customer tier.

---

## 7. Workflow Automation & Lifecycle Journeys

### Trigger-Condition-Action Architecture (`OmniAutomationEngineView.tsx`):
- **Triggers**: Inbound messages, deal stage progressions, form submissions, checkout completions, or SLA breaches.
- **Conditions**: Lead score thresholds, customer tier checks, currency amounts, or sentiment states.
- **Actions**: Auto-assign rep, send push/email notifications, apply tags, trigger payment invoices, or invoke webhook endpoints.

### Customer Journeys (`OmniCustomerJourneysView.tsx`):
Multi-step automated sequences (e.g., *VIP Institutional Onboarding*, *Abandoned Checkout Recovery*, *Post-Purchase Advocacy*) that nurture contacts through scheduled touchpoints across Messages, Email, and Spaces.

---

## 8. AI Governance & Human Commercial Agency

To protect business operations and maintain compliance, the AI Business Copilot is bound by strict governance principles:

> **Fundamental Constraint**: AI assists, analyzes, and drafts — but AI **must never make final binding commercial decisions**.

| AI Capability (Permitted) | Human Requirement (Enforced) |
| :--- | :--- |
| Extracting key deal terms from chat | Approving contract submission |
| Calculating lead & churn risk scores | Authorizing discount rates > 15% |
| Generating suggested email & DM replies | Sending commercial commitments |
| Identifying upsell opportunities | Authorizing credit limit alterations |
| Summarizing executive meeting transcripts | Signing final contractual agreements (2FA) |

---

## 9. 8-Point Diagnostic Test Suite

The built-in verification suite (`OmniCrmTestSuiteModal.tsx`) executes 8 automated integration tests:

1. **Test 1: Lead Ingestion & Scoring Engine** — Verifies lead ingestion, metadata extraction, and 0-100 scoring accuracy.
2. **Test 2: Deal Conversion & Pipeline Stage Progression** — Validates conversion of leads to deals and weighted forecast calculations.
3. **Test 3: Customer 360 Financial & Social Sync** — Verifies live synchronization with Finance OS LTV and Commerce orders.
4. **Test 4: Business Inbox Routing & SLA Countdown** — Tests message queueing, triage tags, and SLA breach timers.
5. **Test 5: Workflow Automation Trigger-Condition-Action** — Validates automated execution of active workflow rules.
6. **Test 6: Lifecycle Journey Step Sequencer** — Verifies delay handling and multi-channel message dispatch.
7. **Test 7: AI Copilot Contextual Analysis & Drafts** — Tests Gemini sentiment analysis and safe draft generation.
8. **Test 8: Governance Policy & 2FA Settlement Gate** — Confirms that AI is blocked from unilateral contract finalization.

---

## 10. Summary & Production Readiness

The OMNI CRM module completes the transformation of OMNI Connect into a comprehensive social commerce and enterprise customer operating system. All components adhere strictly to TypeScript type safety, responsive design standards, and sovereign privacy principles.
