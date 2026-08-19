# OMNI Payment Network & Global Money Movement Engine — Architecture Guide

**System Version:** 4.2  
**Target Environment:** Cloud Run Production Container  
**Security Standard:** PCI-DSS Level 1 / SOC 2 Type II / ISO 20022 Compliant  
**Cryptographic Primitives:** HMAC-SHA256, ECDSA Signature Verification, Merkle Tree GL Seals  

---

## 1. Executive Summary & Architectural Philosophy

The **OMNI Payment Network** is a pluggable, high-throughput payment orchestration layer and global money movement engine. It decouples the core financial operating system from any single proprietary banking rail or payment gateway.

### Core Non-Negotiables
1. **No Hardcoded Single Provider:** All payment rails operate through a unified, extensible `PaymentProviderInterface`.
2. **Never Trust Client-Side Confirmation:** No payment is marked `Completed` or ledgered based on frontend status; cryptographic HMAC-SHA256 webhook attestation or verified synchronous server-to-server responses are required.
3. **Atomic Double-Entry Equilibrium:** Every completed payment or transfer automatically triggers balanced double-entry General Ledger postings ($Debits = Credits$) sealed with SHA-256 Merkle hashes.
4. **Strict Maker-Checker Governance:** High-value corporate transactions exceeding configured policy thresholds require cryptographically signed sign-offs from authorized checkers; makers cannot approve their own transactions.
5. **Strict AI Guardrails:** AI operates exclusively as an advisory analysis engine. AI has zero cryptographic permission to approve payments, move money, sign transactions, or mutate the double-entry general ledger.

---

## 2. Pluggable Provider Architecture & Adapters

The engine interfaces with banking and card rails through standardized adapter modules:

```
                          ┌─────────────────────────────┐
                          │   OMNI Payment Intent API   │
                          └──────────────┬──────────────┘
                                         │
                    ┌────────────────────▼────────────────────┐
                    │    Smart Routing & Fallback Engine      │
                    └────────────────────┬────────────────────┘
                                         │
     ┌──────────────────┬────────────────┼──────────────────┬──────────────────┐
     ▼                  ▼                ▼                  ▼                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│ FedNow Rails │ │ Visa/MC 3DS2 │ │ M-Pesa / MoMo│ │ ECB vIBAN    │ │ OMNI Vault       │
│ (Real-Time)  │ │ (Tokenized)  │ │ (USSD / STK) │ │ (Virtual IBAN│ │ (Internal Ledger)│
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────┘
```

### Supported Provider Types & Adapters
1. **Bank Transfer Provider:** FedNow (US Real-Time), SEPA Instant (EU), Faster Payments (UK), ACH Pull/Push, SWIFT GPI (Fallback).
2. **Card Provider:** Visa / Mastercard / AMEX Tokenization Gateway with 3DS2 frictionless and challenge biometric flows.
3. **Mobile Money Provider:** M-Pesa STK Push, MTN MoMo, Orange Money, GCash for high-speed emerging market collections.
4. **Wallet Provider:** OMNI Sovereign Multi-Currency Ledger Vault, Apple Pay, Google Pay tokenized checkout.
5. **Virtual Account Provider:** Dynamic virtual IBAN (vIBAN) and US routing/account number generator for automated client segregation and sweeping.
6. **Direct Debit Provider:** SEPA B2B Direct Debit and US ACH Debit pull mandate management with dunning rules.
7. **Bill Payment Provider:** Institutional bridge for utilities, telecommunications, customs duties, and government taxes.

---

## 3. 8-Stage Payment Lifecycle State Machine

Every payment transitions through eight deterministic stages:

```
[1. Payment Intent] ──► [2. Authorization & Governance] ──► [3. Smart Routing] ──► [4. Provider Dispatch]
                                                                                           │
[8. Cryptographic Receipt] ◄── [7. Settlement] ◄── [6. Double-Entry GL] ◄── [5. Webhook Attestation]
```

### State Machine Definitions:
- `Created`: Payment intent generated with client secret and idempotency key.
- `Awaiting Approval`: Transaction exceeds corporate threshold; routed to Maker-Checker approval queue.
- `Authorized`: 3DS2 or fund hold placed; counterparty sanctions verified.
- `Processing`: Smart router selected optimal provider based on currency, fee, and SLA latency.
- `Pending Provider`: Dispatched payload to provider API awaiting clearing.
- `Completed`: Cryptographically confirmed via HMAC webhook and posted to GL.
- `Failed`: Provider returned rejection or timeout with automatic fallback attempt.
- `Cancelled`: Aborted by customer or expired before authorization.
- `Reversed`: Chargeback or recall executed via reversal journal entry.
- `Refunded`: Full or partial refund credited to original payment instrument.
- `Under Review`: Flagged by risk radar for compliance or AML velocity check.

---

## 4. Webhook Security & Anti-Replay Architecture

To guarantee zero double-spends and eliminate spoofing attacks:

1. **HMAC-SHA256 Signature Verification:**
   - Headers: `t=<timestamp>, v1=<signature_hash>`.
   - The payload is hashed against the provider's shared secret: `HMAC_SHA256(timestamp + "." + rawPayload, secret)`.
2. **Anti-Replay Protection Window:**
   - The server enforces a strict timestamp tolerance window ($\pm 300\text{s}$). Stale webhooks are dropped immediately.
3. **Idempotency & Nonce Storage:**
   - Every provider `eventId` is recorded in an in-memory / persistent `processed_events` store. Replayed events are discarded with HTTP 200 `duplicate_ignored`.
4. **Exponential Backoff Retries:**
   - Failed webhook delivery triggers retries at $t = 5\text{s}, 25\text{s}, 125\text{s}, 625\text{s}$ with jitter.

---

## 5. Global Money Movement & Transfer System

The transfer engine orchestrates multi-rail disbursements:

| Transfer Class | Clearing Rail | Governance Rule | FX Conversion |
|---|---|---|---|
| **User-to-User (P2P)** | OMNI Internal Vault | Instant (< 25ms) | Live spot rate |
| **Business B2B** | FedNow / SEPA Instant | Single Maker-Checker (<$10k) | Real-time lock |
| **International Cross-Border** | SWIFT / Wise Corridors | Dual Sign-Off (>$10k) | Guaranteed 60-min FX rate lock |
| **Scheduled & Standing Orders** | Automated Crons | Pre-authorized rule | Auto-executed at 00:00 UTC |
| **Bulk Batch Payout** | Multi-Rail CSV/JSON | Batch verification | Line-by-line atomic execution |
| **Supplier PO Matching** | ACH / Wire / Direct | 3-Way Match Verified | Net 30/60/90 terms |
| **Payroll Disbursement** | FedNow / Direct Rail | Department Lead + VP Finance | Multi-state tax withholding split |

---

## 6. Enterprise Maker-Checker Governance & Approvals

Corporate risk policies prevent unilateral funds movement:

- **Tier 1 (Standard Operational < $10,000):** Single approval from Finance Manager or Operations Lead.
- **Tier 2 (High-Value Commercial $10,000 – $100,000):** Dual sign-off required (Treasurer + VP Finance).
- **Tier 3 (Executive Sovereign > $100,000):** Triple sign-off required (CFO + CEO + Board Trustee).
- **Maker Role Restriction:** The user who initiates a transfer (`Maker`) is cryptographically blocked from casting a `Checker` approval signature on the same ticket.

---

## 7. OMNI Ecosystem Multi-Party Split Flow

The engine automatically distributes revenue across OMNI ecosystem modules:

```
[Marketplace Sale: $1,200.00]
            │
            ├──► Seller Escrow (85% = $1,020.00) ────────► GL 2050 (Seller Wallet Credit)
            ├──► Affiliate Commission (10% = $120.00) ───► GL 2010 (Accounts Payable Affiliate)
            └──► Platform Take Rate (5% = $60.00) ──────► GL 4010 (Commercial Revenue)
```

---

## 8. AI Payment Intelligence (Strict Advisory Boundaries)

OMNI AI provides natural language payment explanations, fee comparison insights, and real-time anomaly detection.

### Explicit Architectural Boundary:
```typescript
// Strict read-only guarantee enforced in engine:
export interface PaymentAiAnalysis {
  riskScore: number;
  riskLevel: 'very_low' | 'low' | 'moderate' | 'elevated' | 'high' | 'critical';
  naturalLanguageSummary: string;
  flowExplanation: string;
  feeOptimizationNote: string;
  anomaliesDetected: AnomalyRecord[];
  readOnlyDisclaimer: "AI CANNOT APPROVE PAYMENTS, MOVE MONEY, OR MUTATE THE LEDGER";
}
```

---

## 9. 7-Scenario Automated Test Harness Matrix

The system includes a self-contained automated test suite covering all critical edge cases:

1. **Duplicate Payment Guard:** Verifies idempotency key indexing and duplicate request deduplication.
2. **Provider Failover Engine:** Simulates primary provider outage and verifies automatic fallback rerouting within SLA.
3. **Webhook Replay Detection:** Verifies duplicate event ID detection and immediate replay attack drops.
4. **Concurrent Transfer Mutex:** Verifies account mutex locking and double-spend race condition prevention.
5. **Insufficient Balance Pre-Auth:** Verifies pre-authorization fund adequacy checks and clean rejection.
6. **Maker-Checker Governance Breach Prevention:** Verifies that Maker self-approval attempts throw governance exceptions.
7. **Corridor & Currency Support Validation:** Verifies unsupported currency routing rejection on domestic rails.
