# OMNI Embedded Finance & Developer Platform Guide

**Domain:** `developers.finance.omni.com`  
**API Base URL (Live):** `https://api.finance.omni.com/v1`  
**API Base URL (Sandbox):** `https://sandbox.finance.omni.com/v1`  
**Status:** **ACTIVE & PRODUCTION READY**  

---

## 1. Executive Summary & Objective

The **OMNI Embedded Finance & Developer Platform** exposes the full sovereign multi-rail financial capabilities of OMNI Finance as an institutional **Financial Infrastructure as a Service (FaaS / BaaS)** layer.

External businesses, marketplace platforms, fintech startups, gig networks, and enterprise holding companies can programmatically embed:
- **Multi-Currency Sovereign Wallets** (USD, EUR, GBP, JPY, SGD, vIBANs)
- **Multi-Rail Payment Acceptance** (Visa, Mastercard, FedNow, SEPA Instant, Pix, ACH, Apple Pay)
- **Instant Global Payouts & Transfers** (< 4-second cross-border settlement)
- **Split Escrow & Take-Rate Monetization**
- **Smart Factored Invoicing & Subscriptions**
- **Guaranteed 60-Second Real-Time Spot FX Rate Locks**

---

## 2. API Architecture (`/api/v1`)

All endpoints are strictly RESTful, JSON-encoded, and versioned under `/api/v1`.

### 2.1 Core Resource Map

| Resource Path | Method | Description | Required Scopes |
|---|---|---|---|
| `/api/v1/customers` | `POST`, `GET` | Create customer dossier with automated KYC/KYB screening | `customers:write`, `customers:read` |
| `/api/v1/wallets` | `POST`, `GET` | Provision multi-currency ledger wallets & virtual IBANs | `wallets:write`, `wallets:read` |
| `/api/v1/wallets/:id/balances` | `GET` | Real-time multi-asset liquid & reserved balance inquiry | `wallets:read` |
| `/api/v1/payments/charges` | `POST` | Execute multi-rail charge (Card, Instant Bank, Apple Pay) | `payments:write` |
| `/api/v1/transfers` | `POST` | Execute instant 0ms internal or external bank transfer | `transfers:execute` |
| `/api/v1/invoices` | `POST`, `GET` | Issue smart invoice with real-time factoring option | `invoices:write`, `invoices:read` |
| `/api/v1/subscriptions` | `POST` | Recurring billing schedule with automatic retry logic | `subscriptions:write` |
| `/api/v1/fx/quotes` | `POST` | 60-second guaranteed spot FX rate lock & execution | `fx:quote`, `fx:execute` |
| `/api/v1/reports/reconciliation`| `GET` | Export cryptographic double-entry settlement logs | `reports:export` |
| `/api/v1/webhooks` | `POST`, `GET` | Configure webhook subscription endpoints & event filters | `webhooks:manage` |

---

## 3. API Security & Authentication Standard

### 3.1 Authentication Headers
All API requests must include an authorization header with a valid Secret Key:
```http
Authorization: Bearer omni_live_sec_8f92410a89b418a049102847aef
Idempotency-Key: idem_901824981024_01
Content-Type: application/json
```

### 3.2 Granular RBAC Scopes
Keys are bound to principle-of-least-privilege scopes:
- `wallets:*` — Full wallet provisioning and balance inspection
- `payments:create` — Initiate charges and payment intents
- `transfers:execute` — Authorize money movement out of wallets
- `fx:quote` — Read-only spot exchange rate queries

### 3.3 Rate Limiting & Leaky Bucket
- **Sandbox Environment:** 300 requests / minute per client ID.
- **Production Environment:** 2,000 requests / minute (scalable to 50,000 req/min for Enterprise Tier).
- When limits are exceeded, OMNI returns **`HTTP 429 Too Many Requests`** with RFC 6585 headers:
  ```http
  HTTP/1.1 429 Too Many Requests
  Retry-After: 15
  X-RateLimit-Limit: 2000
  X-RateLimit-Remaining: 0
  X-RateLimit-Reset: 1755481215
  ```

---

## 4. Webhook Engine & Signature Verification

### 4.1 Supported Lifecycle Events
- `payment.completed` — Inbound payment successfully cleared and funds credited.
- `payment.failed` — Card decline, insufficient funds, or risk block.
- `transfer.completed` — Outbound wire / FedNow / SEPA transfer acknowledged by destination rail.
- `invoice.paid` — Counterparty paid invoice via any supported payment method.
- `wallet.updated` — Balance delta occurred on a watched wallet ID.
- `settlement.completed` — Nightly commercial batch settlement reconciled to general ledger.
- `kyc.verified` — End-user identity check approved with 3D biometric match.

### 4.2 HMAC-SHA256 Signature Verification
Every delivery includes the `X-Omni-Signature` header:
```http
X-Omni-Signature: t=1755481200,v1=9f82104810294817204918274019284710491827
```

**Verification Pattern (Node.js):**
```javascript
import crypto from 'crypto';

export function verifyWebhook(rawBody, signatureHeader, secretKey) {
  const parts = signatureHeader.split(',');
  const timestamp = parts.find(p => p.startsWith('t=')).split('=')[1];
  const signature = parts.find(p => p.startsWith('v1=')).split('=')[1];

  // Prevent replay attacks (reject payloads older than 5 minutes)
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTimestamp - parseInt(timestamp, 10)) > 300) {
    throw new Error('Webhook timestamp delta exceeds 300s window (Replay Attack)');
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(signedPayload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}
```

---

## 5. Multi-Language SDKs

### 5.1 Node.js / TypeScript (`@omni-finance/sdk`)
```typescript
import { OmniFinance } from '@omni-finance/sdk';

const omni = new OmniFinance({
  apiKey: process.env.OMNI_SECRET_KEY,
  environment: 'production'
});

const payment = await omni.payments.create({
  amount: 1500.00,
  currency: 'USD',
  destinationWalletId: 'wlt_merchant_901',
  paymentMethod: 'pm_card_visa'
});
```

### 5.2 Python 3 (`omni-finance`)
```python
from omni_finance import OmniClient

client = OmniClient(api_key="omni_live_sec_...", environment="production")

wallet = client.wallets.create(
    customer_id="cus_901824981",
    currencies=["USD", "EUR"],
    label="Creator Earnings Wallet"
)
```

### 5.3 iOS Swift & Android Kotlin
OMNI provides native drop-in UI checkout sheets (`OmniPaymentSheet` and `OmniPaymentLauncher`) for embedding Apple Pay, Google Pay, and card entry directly into mobile apps.

---

## 6. Banking-as-a-Service (BaaS) Blueprints

1. **Two-Sided Marketplace & Split Escrow:** Programmable escrow holds buyer payments and releases merchant balances upon delivery while deducting marketplace commission.
2. **Corporate Employee Cards & Budgets:** Issue virtual Mastercards with MCC allowlists and auto-reconciliation to company general ledger.
3. **Creator & Gig Instant Payouts:** Sub-4 second real-time cashouts over FedNow / SEPA Instant.
4. **Campus Tuition & School Billing:** Automated direct debit semester schedules with split scholarships.

---

## 7. Status & Certification
- **Embedded Finance:** `ACTIVE`
- **Developer Platform:** `ACTIVE`
- **API Infrastructure:** `ACTIVE`
- **Verification Matrix:** 6 / 6 Automated Tests Passed (100% Green).
