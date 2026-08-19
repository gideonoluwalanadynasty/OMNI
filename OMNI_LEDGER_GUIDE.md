# OMNI Double-Entry Ledger & Accounting Guide

## 1. Accounting Principles & Core Invariants

The OMNI Ledger Engine is an immutable, multi-currency, double-entry financial accounting subsystem designed for mission-critical financial operating systems, institutional treasuries, and sovereign payment networks.

### The Fundamental Accounting Equation
$$\text{Assets} = \text{Liabilities} + \text{Equity}$$
$$\Delta \text{Assets} - \Delta \text{Liabilities} - \Delta \text{Equity} + (\text{Expenses} - \text{Revenues}) = 0$$

### Invariant Rules
1. **Double-Entry Equilibrium**: Every single financial event creates at least one Debit posting and at least one Credit posting.
   $$\sum \text{Debits} = \sum \text{Credits}$$
2. **Conservation of Value**: Money cannot be created or destroyed *ex nihilo*. Every transfer of value is an exact reallocation across ledger accounts.
3. **Immutability (Append-Only)**: Posted journal entries cannot be deleted, mutated, or truncated. Corrections are executed strictly through **Reversal Entries** (`REV-JE-xxx`) paired with **Replacement Entries**.
4. **Zero Floating-Point Drift**: All monetary representations are computed using **integer minor units** (`bigint` precision) mapped to currency decimal definitions (e.g., USD = 2 decimals, USDC = 6 decimals, ETH = 18 decimals, JPY = 0 decimals).
5. **Idempotent Execution**: Every financial request carries an `Idempotency-Key` preventing concurrent double-spends and duplicate executions.
6. **Cryptographic Proof Chain**: Each journal entry is signed with a deterministic SHA-256 Merkle root that cryptographically binds the previous block hash, entry timestamp, source reference, and normalized postings.

---

## 2. Chart of Accounts (COA) Structure

OMNI enforces a standard 5-digit General Ledger (GL) numbering scheme:

| GL Code Range | Category | Normal Balance | Account Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **1000–1999** | **Assets** | **Debit** | `asset`, `clearing`, `settlement` | Cash, FX reserves, bank clearing, card settlement transit, A/R, digital assets. |
| **2000–2999** | **Liabilities** | **Credit** | `liability`, `tax`, `suspense` | Accounts payable, tax withholding accruals, suspense pool, customer escrow deposits. |
| **3000–3999** | **Equity** | **Credit** | `equity` | Contributed capital, retained earnings, treasury reserves. |
| **4000–4999** | **Revenue** | **Credit** | `revenue`, `fee` | SaaS subscriptions, interchange fees, FX spread markup, factoring fees, yield. |
| **5000–5999** | **Expenses** | **Debit** | `expense`, `fee`, `refund` | Network rail processing costs, global payroll, infrastructure, dispute chargebacks. |

### Specialized Account Roles
- **Clearing Accounts (GL 1030)**: Zero-balance transit accounts holding in-flight payments during rail settlement latency.
- **Settlement Accounts (GL 1035)**: Processor settlement clearing for card networks and merchant batches.
- **Suspense Accounts (GL 2040)**: Holding liability accounts for unmatched wire inflows requiring manual or automated KYC/AML attribution.
- **Tax Accounts (GL 2030)**: Jurisdictional tax withholding accruals collected during payroll or invoice factoring.
- **Fee Accounts (GL 4020, GL 5010)**: Segregated accounts for fee income versus direct third-party network rail costs.
- **Refund / Dispute Accounts (GL 5040)**: Contra-expense accounts isolating chargeback losses and user refunds.

---

## 3. Transaction Processing Pipeline (8 Steps)

Every financial transaction flows sequentially through an 8-stage transactional pipeline:

```
[1. Validate Request] ──> [2. Authorize User / RBAC] ──> [3. Check Limits & Velocity] ──> [4. Create Pending Tx]
                                                                                                  │
[8. Analytics & Derived Balances] <── [7. Event Bus Publish] <── [6. Atomic DB Commit] <── [5. Balanced Journal]
```

1. **Validate Request**: Inspects currency codes, non-negative amounts, schema attributes, and integer minor unit constraints.
2. **Authorize User & RBAC**: Verifies caller cryptographic passport, MFA state, and granular permissions (e.g. `wallet.transfer`, `finance.admin`).
3. **Check Limits & Balance**: Locks the account mutex, verifies available ledger liquidity, and checks velocity limits.
4. **Create Transaction**: Issues a uniquely indexed `FinanceTransaction` record with state `pending` or `authorized`.
5. **Generate Balanced Journal**: Invokes standard **Posting Rules** to compile matching debit and credit line items.
6. **Atomic Database Commit**: Commits transaction and journal records in a single transactional unit with Merkle hash linkage.
7. **Publish Event**: Dispatches typed events onto the real-time event bus (`ledger.entry.posted`, `balance.updated`).
8. **Update Analytics**: Computes derived real-time ledger balances and updates trial balance indexes.

---

## 4. Reconciliations & Audit Engine

- **Ledger Invariant Audit**: Verifies that $\sum \text{Debits} \equiv \sum \text{Credits}$ across all active postings.
- **Bank Feed Reconciliation**: Matches third-party bank statements against GL 1010 cash postings, highlighting unreconciled differences.
- **Settlement Batch Reconciliation**: Reconciles processor batch reports against clearing GL accounts.
- **Audit Trails**: Admin actions and manual journal entries are permanently logged with author userId, timestamp, reason, and cryptographic hash.
