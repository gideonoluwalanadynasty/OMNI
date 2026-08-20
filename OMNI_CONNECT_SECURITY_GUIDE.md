# OMNI CONNECT SECURITY & HARDENING GUIDE

## 1. Authentication & Decentralized Identity
- **Decentralized Identity (DID):** Users and organizations authenticate using cryptographic key pairs (`did:omni:*`), eliminating single points of credential compromise.
- **JWT & Session Security:** Access tokens have a 15-minute lifespan and are cryptographically signed with ECDSA (P-256). Refresh tokens are rotated on every use with single-use nonce invalidation.
- **Biometric & Step-Up 2FA:** High-risk actions (wire settlement, credential rotation, tenant isolation changes) require hardware-backed WebAuthn / FIDO2 step-up verification.

## 2. Multi-Tenant Row-Level Security (RLS)
- Every database query automatically binds the tenant context:
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON user_profiles
  USING (tenant_id = current_setting('app.current_tenant_id'));
```
- Air-gapped enterprise tenants utilize dedicated cryptographic encryption keys stored in regional Hardware Security Modules (HSM).

## 3. End-to-End Encryption (E2EE) Protocol
- **Double Ratchet Mechanism:** Direct messages and multi-party room messages are encrypted client-side using the Signal-compatible Double Ratchet algorithm.
- **Forward & Post-Compromise Secrecy:** Ephemeral session keys rotate per message. Server relays store only opaque ciphertext envelopes.

## 4. AI Security & Guardrail Defenses
- **System Prompt Boundary Armor:** All user inputs are sanitized through a dual-stage regex and semantic filter before passing to LLM context windows.
- **Zero-Knowledge Inference:** Tenant proprietary data is never cached or used for general model training.
