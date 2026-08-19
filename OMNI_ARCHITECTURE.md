# OMNI Operating System Architecture Blueprint

This document defines the production-grade foundational blueprint for **OMNI** — an AI-powered global digital operating system supporting dozens of white-labeled, multi-tenant, interoperable applications.

---

## 1. Core Paradigm

OMNI consolidates all core digital operations into a unified platform grid:

```
  One Identity + One Org Index + One Wallet Ledger + One AI Router + Many Applications
```

This prevents the fragmentation common in standard SaaS ecosystems where independent tools manage disparate authentication mechanisms, billing systems, ledger histories, and API keychains.

---

## 2. Infrastructure & Tenant Separation

OMNI is designed for secure, multi-region white-labeled SaaS:

### A. Multi-Tenancy Data Boundaries
- **Database Partitioning**: By default, OMNI leverages a single PostgreSQL database (or high-availability Google Cloud Spanner) using **Tenant Boundaries** via `tenant_id` scopes.
- **Row-Level Security (RLS)**:
  ```sql
  ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
  CREATE POLICY tenant_isolation_policy ON organizations 
    USING (tenant_id = current_setting('omni.current_tenant_id'));
  ```
- **Sovereign Isolation**: High-tier Enterprise tenants can dynamically provision dedicated serverless database node clusters directly from the Admin console.

### B. White-Label DNS Syncing
- OMNI maps incoming requests against organization slug tables to resolve custom subdomains (e.g. `oluwalana.omni.io` or `dynasty.omni.io`) on the fly, adjusting color parameters and API routes dynamically.

---

## 3. Sovereign Identity & Security

OMNI implements high-integrity security defaults to protect transactional balance transfers:

1. **Password Hashing**: Cryptographically secures logins using Argon2id with adaptive memory weights.
2. **Multi-Factor Authentication (MFA)**: Implements standard TOTP QR-handshake tokens, creating a Grade AA+ trust rating.
3. **Throttling & Throttled States**: Edge nodes monitor request frequencies. Over 10 failed login handshakes on an IP context triggers automatic nominal rate-limiting.
4. **Audit Logs Trail**: Every action (credential creation, wallet debit, MFA toggle, app registration) publishes a non-volatile Audit Log inside PostgreSQL.

---

## 4. Wallet & Financial Ledgers

OMNI’s banking layer treats currency settlement as a single distributed source of truth:
- **Core Balance Index**: Organizations have a single OMNI Ledger balance.
- **Transactional Integrity**: Ledger entries are double-entry mapped (`credit` or `debit`) with secure reference UUIDs. A debit operation checks balance capacity atomically before completing to prevent double-spending.
- **Webhooks & APIs**: Settlement triggers dispatches to registered developer webhooks (e.g., `wallet.transaction.completed`).

---

## 5. One AI Layer (Universal Command Console)

The platform mounts a central AI router command bar accessible via keyboard shortcuts (`Cmd+K` or `Ctrl+K`):
- **Autocomplete Operators**: Supports fast key triggers like `/pay`, `/launch`, `/flag`, `/status`, and `/createorg`.
- **Intelligent Translation**: Interprets natural language instructions (e.g., "What is my balance?") and executes target state mutations on the OMNI operating system.

---

## 6. Dynamic Application Registry

Rather than hardcoding navbar buttons, OMNI loads applications from a dynamic relational table:
- **Registry Entity**: Defines `app_id`, `name`, `slug`, `icon`, `category` (finance, core, productivity, infrastructure), and `is_native`.
- **Runtime Sandbox**: Third-party developers can register new apps using the Apps console. Registered apps are instantly propagated to the app switcher, sidebar navigation, and universal launch indexes.

---

## 7. Affiliate, Partner, Agent & Growth Network

OMNI operates a unified, central affiliate system accessible by all OMNI micro-applications:

### A. Decentralized Partner Profiles
- Supports multiple partner classifications: `affiliate`, `influencer`, `agency`, `referral_partner`, `sales_agent`, and `regional_representative`.
- Auto-generates unique Public Affiliate IDs, customizable referral links, and dynamically rendered QR codes for instant physical/digital scanning.

### B. Dynamic Attribution Engine
Attribution parameters are configurable at the system level:
- **First Click**: Commission is assigned to the partner who registered the initial visitor session.
- **Last Click**: Commission is awarded to the final affiliate link clicked before checkout.
- **Coupon Absolute**: Credit is given exclusively to the promo code matching the checkout input.
- **Attribution Lifetime (Days)**: Configurable window slider (default 30 days) after which cookies expire.

### C. Commission Rule & Sentry Anti-Fraud
- **Ecosystem Modifiers**: Commission rules are calculated based on Affiliate Level (e.g., Platinum gets 1.3x multiplier), Customer Classification (e.g., Enterprise gets +10% boost), and target Campaign bonuses.
- **Sentry Anti-Fraud**: Evaluates sessions in real-time, instantly blocking and flagging:
  - *Self-Referrals* (detected via buyer/partner email normalization filters)
  - *Cookie Stuffing* (detected via hidden pixel tracking traces)
  - *Click Spam* (velocity rate limiting exceeding 120 clicks/min)
- **Separate Accounting Reserves**:
  - *Affiliate Earnings*: Standard revenue share mapped directly via double-entry debit-credit pairs.
  - *Growth Reward Points*: Points awarded for ecosystem contributions (customer acquisition, geographical tax compliance, content guides). Points are separated completely from standard financial shares.
  - *Investment Ownership*: Independent asset classification.

