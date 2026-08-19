# OMNI Finance OS — Developer & Enterprise API Guide

**Base URL:** `https://api.finance.omni.com/v1`  
**Authentication:** Bearer JWT / API Key (`X-Omni-Api-Key`) + HMAC Webhook Signatures  
**Versioning:** `v1` (Semantic Versioning with guaranteed backward compatibility)  

---

## 1. Authentication & Security Headers

All API requests must include standard enterprise authentication and security headers:

```http
POST /v1/payments/transfers HTTP/1.1
Host: api.finance.omni.com
Authorization: Bearer omni_live_sec_994821a08b39c0
Idempotency-Key: 7b3f9408-e8c1-47fa-8025-a131238e8334
X-Omni-Tenant-Id: tenant_enterprise_001
Content-Type: application/json
```

---

## 2. Core API Endpoints

### 2.1 Multi-Currency Wallets & Accounts
- `GET /v1/wallets` — List all liquid multi-currency vaults and balances.
- `GET /v1/wallets/:id` — Retrieve wallet details, vIBANs, and transaction history.
- `POST /v1/wallets/:id/virtual-cards` — Issue virtual or physical debit cards.

### 2.2 Global Payment Routing & Instant Settlement
- `POST /v1/payments/transfers` — Initiate instant transfer across FedNow, SEPA Inst, FPS, PIX, UPI, Aani.
- `GET /v1/payments/transfers/:id` — Poll transfer settlement state and cryptographic rail receipt.
- `POST /v1/payments/payouts/batch` — Execute batch multi-currency payroll or supplier disbursement.

### 2.3 Spot FX & Guaranteed Rate Locks
- `GET /v1/fx/quotes` — Stream real-time institutional FX quotes with spread transparency.
- `POST /v1/fx/locks` — Lock guaranteed exchange rate for 60 seconds.
- `POST /v1/fx/conversions` — Execute atomic spot conversion between two currencies.

### 2.4 Smart Invoicing & Factoring Advances
- `POST /v1/invoices` — Create compliant e-invoice with automatic VAT/GST computation and QR code.
- `POST /v1/invoices/:id/factor` — Request instant 80-90% working capital advance against unpaid invoice.

### 2.5 Real-Time Double-Entry Ledger
- `GET /v1/ledger/accounts` — Fetch general ledger chart of accounts.
- `GET /v1/ledger/journal-entries` — Stream immutable, balanced journal entries with Merkle proofs.

---

## 3. Webhook Delivery & HMAC Signature Verification

OMNI Finance OS pushes real-time events to configured developer endpoints. Every payload is signed with HMAC-SHA256:

```typescript
import crypto from 'crypto';

export function verifyOmniWebhook(
  payload: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds: number = 300
): boolean {
  // Header format: t=1723974600,v1=a849f2b8...
  const parts = signatureHeader.split(',');
  const timestamp = parseInt(parts.find(p => p.startsWith('t='))?.split('=')[1] || '0', 10);
  const receivedSig = parts.find(p => p.startsWith('v1='))?.split('=')[1];

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return false; // Replay attack protection
  }

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(receivedSig || '', 'hex'),
    Buffer.from(expectedSig, 'hex')
  );
}
```

---

## 4. Standard Error Codes

| HTTP Status | Error Code | Description |
|---|---|---|
| `400 Bad Request` | `INVALID_PAYLOAD` | Missing required parameters or malformed JSON. |
| `401 Unauthorized` | `INVALID_API_KEY` | Expired, revoked, or missing API credentials. |
| `403 Forbidden` | `TENANT_RESTRICTED` | Requested resource belongs to an unauthorized tenant boundary (RLS). |
| `409 Conflict` | `IDEMPOTENCY_COLLISION` | Duplicate request payload submitted under active idempotency lock. |
| `422 Unprocessable` | `INSUFFICIENT_FUNDS` | Account available balance is less than transfer amount plus fees. |
| `429 Too Many Req` | `RATE_LIMIT_EXCEEDED` | Exceeded token bucket tier allocation. |
