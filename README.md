# OMNI Sovereign Global Digital Operating System

OMNI is an AI-powered, multi-tenant digital operating system designed to unify identity, ledgers, and dynamic applications. The platform enables white-labeled custom-branded instances to run with complete data isolation, universal keyboard-driven AI command consoles, shared double-entry wallets, dynamic app registries, and multi-tier partner networks.

---

## 1. Core Platform Blueprint

The OMNI architecture is built around five fundamental pillars:

1. **One Identity (OMNI Passport):** Dynamic role-based SSO supporting personal, corporate, developer, and investor accounts across tenant boundaries.
2. **One Wallet Ledger:** Double-entry accounting system with matched credit-debit legs to enforce balance correctness and prevent double-spending.
3. **One AI Layer (Universal Console):** Instant access console (`Cmd+K` or `Ctrl+K`) for executing state changes, organization switching, and financial payouts under strict permission boundaries.
4. **Dynamic Application Registry:** Modular app swapping dynamically matching sidebar, Switcher, and Universal Launcher scopes.
5. **Multi-Tier Partnership Program:** Comprehensive reseller hierarchies, dynamic affiliate attributions, and advanced anti-fraud filters.

---

## 2. Directory Matrix to Core System Guides

Detailed operational, development, and architectural specifications are separated into specialized files in this repository:

| Core Guide / Report | Path | Scope Summary |
| :--- | :--- | :--- |
| **System Architecture** | [`/OMNI_ARCHITECTURE.md`](./OMNI_ARCHITECTURE.md) | High-integrity paradigm, multi-tenancy boundaries, and structural layouts. |
| **Integration Standard** | [`/OMNI_INTEGRATION_STANDARD.md`](./OMNI_INTEGRATION_STANDARD.md) | OMNI OIDC, single sign-on exchanges, and manifest validations. |
| **API & Webhook Guide** | [`/OMNI_API_GUIDE.md`](./OMNI_API_GUIDE.md) | Endpoint parameters, wallet ledger API, and HMAC signature validations. |
| **Operations & Resiliency**| [`/OMNI_OPERATIONS_GUIDE.md`](./OMNI_OPERATIONS_GUIDE.md) | Performance metrics, non-leakable caching, background jobs, and RPO/RTO plans. |
| **White-Label Branding** | [`/OMNI_WHITE_LABEL_GUIDE.md`](./OMNI_WHITE_LABEL_GUIDE.md) | DNS mapping, custom variable CSS injections, and regional privacy rules. |
| **Super-Admin Manual** | [`/OMNI_ADMIN_GUIDE.md`](./OMNI_ADMIN_GUIDE.md) | Governance policy tables, feature flags overrides, and peer co-signing approvals. |
| **App Migration Steps** | [`/OMNI_APP_MIGRATION_CHECKLIST.md`](./OMNI_APP_MIGRATION_CHECKLIST.md) | Chronological migration instructions for external third-party apps. |
| **Security & Privacy Audit**| [`/OMNI_SECURITY_REPORT.md`](./OMNI_SECURITY_REPORT.md) | Penetration testing logs, XSS/SQLi mitigations, and cross-tenant tests. |
| **Production Readiness** | [`/OMNI_PRODUCTION_READINESS.md`](./OMNI_PRODUCTION_READINESS.md) | Core readiness audits, commercial dependencies, and gap evaluation matrix. |

---

## 3. Local Development & Verification

OMNI is written in Type-Safe React with Tailwind CSS and bundled using Vite.

### Install Dependencies
To install standard package nodes:
```bash
npm install
```

### Run Local Development Server
To launch the interactive local server binding automatically to port `3000`:
```bash
npm run dev
```

### Run Visual Linter & Static Code Audits
To execute the visual linter checks:
```bash
npm run lint
```

### Compile Production Static Bundle
To build the optimized static build output into the `/dist` directory:
```bash
npm run build
```
