# OMNI Developer API & SSO Integration Guide

**Ecosystem Phase:** Production Staging  
**SDK Format Availability:** TypeScript, JSON, Webhook Event Payload  

---

## 1. Authentication & Unified Passport SSO Handshake

OMNI provides a unified single sign-on (SSO) gateway allowing partners and third-party apps to securely query user permissions and active tenant scopes:

```
[Third-Party App] ──────> Redirect to OMNI Passport ──────> User Authenticates
       ▲                                                          │
       │                                                          ▼
  Get Access Token <── Exchange Temp Authorization Code <─── Return Auth Code
```

### A. Exchange Authorization Code
Exchange your temporary application access code for a production OAuth token:
- **HTTP Method:** `POST`
- **Endpoint:** `https://passport.omni.io/api/v1/oauth/token`
- **Headers:** 
  - `Content-Type: application/json`
  - `X-Correlation-ID: corr_omni_unique_id`

**Request Payload:**
```json
{
  "client_id": "app_client_dynasty_9912",
  "client_secret": "sec_omni_live_8812039ab31f",
  "code": "auth_code_temp_8829013",
  "grant_type": "authorization_code",
  "redirect_uri": "https://dynasty-app.io/callback"
}
```

**Response Payload:**
```json
{
  "access_token": "tok_omni_live_user_9921b38",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "passport.user.read wallet.ledger.write",
  "user": {
    "passport_id": "usr_gideon",
    "email": "gideonoluwalanadynasty@gmail.com",
    "organization_id": "ten_dynasty_99",
    "role": "superadmin"
  }
}
```

---

## 2. Wallet & Ledger Balance Query

Read high-integrity balances across the network or disburse affiliate payouts.

- **HTTP Method:** `GET`
- **Endpoint:** `https://api.omni.io/api/v1/ledger/balances`
- **Headers:**
  - `Authorization: Bearer tok_omni_live_user_9921b38`
  - `X-OMNI-Tenant-ID: ten_dynasty_99`

**Response Payload:**
```json
{
  "tenant_id": "ten_dynasty_99",
  "currency": "USD",
  "available_balance": 12500.00,
  "ledger_entries_count": 4,
  "last_reconciliation_timestamp": "2026-08-15T00:00:00Z"
}
```

---

## 3. Creating double-Entry Ledgers (API Write)

Execute a secure ledger transfer. To prevent double-spending and balance manipulation, OMNI compiles transactions with matching credit and debit legs:

- **HTTP Method:** `POST`
- **Endpoint:** `https://api.omni.io/api/v1/ledger/transfers`

**Request Payload:**
```json
{
  "source_tenant_id": "ten_dynasty_99",
  "destination_tenant_id": "ten_artisan_dynasty",
  "amount": 2500.00,
  "currency": "USD",
  "description": "Ecosystem white-label franchise fee settlement",
  "idempotency_key": "idem_ledger_tx_991823901"
}
```

**Response Payload (201 Created):**
```json
{
  "transfer_id": "tx_double_entry_8819203",
  "status": "completed",
  "amount": 2500.00,
  "currency": "USD",
  "idempotency_key": "idem_ledger_tx_991823901",
  "source_entry": {
    "entry_id": "ent_debit_992301",
    "type": "debit",
    "tenant_id": "ten_dynasty_99"
  },
  "destination_entry": {
    "entry_id": "ent_credit_992302",
    "type": "credit",
    "tenant_id": "ten_artisan_dynasty"
  }
}
```

---

## 4. Inbound Webhooks Validation

When OMNI issues event webhooks (e.g. `affiliate.commission.payout` or `subscription.entitlement.updated`), developers must validate the webhook sender signature:

### Webhook Event Header Structure
- `X-OMNI-Signature`: Contains the computed HMAC SHA-256 hex digest of the raw payload string using the tenant client's secret.
- `X-OMNI-Timestamp`: POSIX timestamp. Prevent replay attacks by discarding payloads with a timestamp variance exceeding 300 seconds.

**Compute Validation (Node.js):**
```js
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret, timestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTimestamp - timestamp) > 300) {
    throw new Error('Possible replay attack. Timestamp delta too wide.');
  }
  
  const signedPayload = `${timestamp}.${payload}`;
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}
```
