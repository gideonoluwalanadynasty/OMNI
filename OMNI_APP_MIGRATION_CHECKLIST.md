# OMNI Application Migration & Certification Checklist

This migration guide contains the **chronological checklists** and technical requirements necessary for certification.

---

## Phase 1: Authentication & Identity Migration
- [ ] **Establish OMNI Passport Single Sign-On (SSO)**
  - Ensure the application redirects any unauthenticated user sessions to the central `omni.com/login` gateway.
- [ ] **Implement OIDC Verify Handshake**
  - Verify JWT signatures from the OMNI Identity Service using our published JWKS endpoint.
- [ ] **Enforce Account-Profile Disambiguation**
  - Read profile scopes to detect whether a user is accessing your app via their **personal, professional, creator, seller, developer, affiliate, or investor** profile.
- [ ] **Establish Tenant-Organization Isolation**
  - Resolve the user's active tenant scope to dynamically adapt roles and enterprise billing properties.

## Phase 2: Manifest & App Registry Provisioning
- [ ] **Draft the Versioned App Manifest**
  - Formulate an `omni.manifest.json` file conforming to the Manifest Gateway schema.
- [ ] **Verify Required & Optional Scopes**
  - Audit permissions. Only declare the specific micro-scopes your application requires (e.g., `identity.read`, `wallet.ledger.read`, etc.).
- [ ] **Validate Manifest via Gateway**
  - Upload your manifest to the **Live Manifest Gateway** inside the OMNI Developer Console.
- [ ] **Acquire OMNI Client Credentials**
  - Secure your issued client ID and client secret within a secure environment variable container (never commit these to git!).

## Phase 3: Webhook & Event-Driven Synchronization
- [ ] **Expose a Public Webhook Endpoint**
  - Provision a secure path for incoming webhook payloads (e.g., `https://yourapp.omni.com/webhooks/omni`).
- [ ] **Implement Cryptographic HMAC Signature Auditing**
  - Write validation logic for verifying the `X-Omni-Signature` header using the shared secret.
- [ ] **Enforce Idempotency Protocols**
  - Wire a local Redis or memory cache to store and verify `X-Idempotency-Key` headers, bypassing duplicate operations.
- [ ] **Configure Retries & Backoffs**
  - Prepare a retry queue following the 10-second base exponential backoff rule to process delivery logs seamlessly.

## Phase 4: Shared-Wallet & Billing Alignment
- [ ] **Migrate Standalone Payment Gateways**
  - Deprecate native Stripe or PayPal gateways in favor of direct **OMNI Shared-Ledger** integrations.
- [ ] **Connect Universal Affiliate Pipeline**
  - Track affiliate conversions. Propagate standard commission payouts directly back to the OMNI Core ledger.
- [ ] **Enforce Multi-Tier Corporate Pricing**
  - Align tier limitations to the user's active OMNI organization plan (`free`, `growth`, or `enterprise`).

## Phase 5: Security & Regulatory Compliance Audits
- [ ] **Enforce WCAG AA Compliance**
  - Audit color contrast ranges, typographic margins, and line-widths to match OMNI Design guidelines.
- [ ] **Verify MFA Alignment**
  - Integrate multi-factor authentication (MFA) enforcement policies directly into critical administrative views.
- [ ] **Submit KYB/KYC Verification Logs**
  - Ensure administrative profiles undergo background KYC verification before unlocking enterprise APIs.
