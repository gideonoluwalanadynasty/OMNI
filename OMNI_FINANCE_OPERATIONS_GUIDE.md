# OMNI Finance OS — Production Operations & SRE Runbook

**Audience:** Site Reliability Engineers (SRE), FinOps, and DevSecOps  
**SLA Target:** 99.999% Availability | < 50ms P95 API Latency | < 500ms P99 Wire Settlement  

---

## 1. Observability, Logging & Tracing Architecture

OMNI Finance OS implements comprehensive telemetry across Google Cloud Operations Suite (Cloud Logging, Cloud Monitoring, Cloud Trace, and Cloud Profiler).

### 1.1 JSON Structured Logging Standard
All logs emit formatted JSON to `stdout` with mandatory contextual fields:

```json
{
  "timestamp": "2026-08-18T09:30:00.124Z",
  "severity": "INFO",
  "service": "omni-finance-core",
  "traceId": "projects/omni-prod/traces/4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "tenantId": "tenant_enterprise_001",
  "userId": "usr_9984_cfo",
  "eventType": "TRANSACTION_SETTLED",
  "transactionId": "tx_fednow_889211",
  "amount": 25000.00,
  "currency": "USD",
  "rail": "FEDNOW_INSTANT",
  "latencyMs": 42.6,
  "message": "Transaction tx_fednow_889211 settled successfully via FedNow rail"
}
```

### 1.2 Strict PII & PCI Redaction Invariant
The following data elements are **NEVER logged under any circumstances**:
- Plaintext Card Primary Account Numbers (PAN), CVV/CVC, Expiry Dates
- Account Passwords, PINs, or Seed Phrases
- Plaintext KYC Identity Documents (SSN, National ID numbers)
- Unmasked Bank Account Numbers or Routing Codes

---

## 2. Real-Time Alerting Thresholds & PagerDuty Routing

| Alert Name | Condition | Severity | Action / Pager Routing |
|---|---|---|---|
| **Ledger Imbalance Detected** | `debit_sum != credit_sum` on any journal post | **P0 (Critical)** | PagerDuty to Principal Financial SRE & CFO; halt automated settlement pipeline. |
| **BaaS Gateway Disconnect** | Any Tier-1 provider (FedNow, SEPA, Circle) down > 60s | **P1 (High)** | Auto-route traffic to secondary standby provider; alert FinOps. |
| **High API Error Rate** | HTTP 5xx errors > 0.5% over 5-minute rolling window | **P1 (High)** | Trigger auto-rollback if recent deployment occurred; page on-call SRE. |
| **P99 Latency Breach** | API latency P99 > 800ms over 3 consecutive minutes | **P2 (Medium)** | Autoscale Cloud Run instances; inspect PostgreSQL connection pool. |
| **SAR AML Velocity Spike** | > 20 high-risk AML anomalies flagged within 10 minutes | **P2 (Medium)** | Notify Compliance Officer & Automated Fraud Radar team. |

---

## 3. Standard Operational Runbooks

### Runbook 1: BaaS Liquidity Provider Failover
1. **Detection:** Provider status shifts to `degraded` or `offline` in Super Admin.
2. **Execution:**
   - In Super Admin Dashboard (`/admin/finance`), toggle status of degraded provider to `OFFLINE`.
   - Routing engine immediately activates backup corridor (e.g. FedNow -> RTP -> Fedwire).
   - In-flight webhooks are re-queued with exponential backoff.

### Runbook 2: Routine Secret Rotation (Every 90 Days)
1. Generate new API keys and HMAC secrets in BaaS partner portal.
2. Create new secret version in Google Secret Manager:
   ```bash
   gcloud secrets versions add omni-fednow-hmac-secret --data-file=new_secret.txt
   ```
3. Deploy rolling restart of Cloud Run instances to pick up newest version with zero downtime.
4. Revoke previous secret version after verifying 24 hours of successful webhook deliveries.
