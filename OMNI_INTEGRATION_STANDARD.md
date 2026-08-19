# OMNI Sovereign Integration Standard

This document outlines the standard protocol requirements and cryptographic boundaries for integrating external micro-applications, white-label tenant sites, and developer APIs within the OMNI sovereign ecosystem.

## 1. Single Sign-On (SSO) & OMNI Passport Auth
- **Dynamic Scopes:** Every connected app must present a JWT token with scoped permissions (e.g., `passport.read`, `billing.write`).
- **Identity Binding:** Direct database password tables are forbidden. Users are mapped to their unique OMNI Passport Identity via email-based link handshakes.
- **Session Control:** Authenticated sessions must implement JWT validation check-ups and force expiration rules on tenant-level switches.

## 2. Multi-Tenant Sandbox Isolation
- **Tenant Isolation Barrier:** Cross-tenant queries are blocked at the database routing middleware. Organizations can never view neighbor ledger balances.
- **Custom Domain Mapping:** Every tenant sub-domain resolves to an isolated container router that enforces scoped policies and tenant-specific feature flags.

## 3. Financial & Ledger Protocol
- **Double-Entry Verification:** Standard ledger writes must use the double-entry accounting schema. Balance manipulations without matching credit/debit records trigger audit security locks.
- **Payment Tokenization:** Credit card and bank details are stored exclusively inside merchant-of-record gateways (Stripe, PayPal). Subscriptions are moved using provider-aware token mirrors.

## 4. Webhook Integrity & Replay Mitigation
- **Cryptographic Signatures:** Every incoming webhook is checked against a SHA-256 HMAC signature using client-specific secret keys.
- **Anti-Replay Logs:** Webhook transaction events must register their unique event ID. Replayed payloads or duplicate transaction IDs are rejected instantly.

## 5. Security & Privacy Safeguards
- **Sanitization Guard:** All string inputs are sanitized through an HTML-escape regex parser to prevent cross-site scripting (XSS) and SQL injection.
- **GDPR Right to be Forgotten:** Tenants must offer a "Right to be Forgotten" trigger that safely scrambles or purges user metrics while maintaining legally mandated audit ledgers in a zero-knowledge state.
