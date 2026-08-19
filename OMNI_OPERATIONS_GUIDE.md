# OMNI Sovereign Platform Operations & Infrastructure Guide

**Ecosystem Lifecycle Phase:** Production Staging & Sovereign Operations  
**Current Release Version:** v1.2.0-Sovereign  
**Last Updated:** 2026-08-15  

---

## 1. Performance Optimization & Auditing Blueprint

To ensure low-latency settlement of double-entry wallet adjustments and multi-tenant custom domain routing, the OMNI Platform implements the following visual and database execution guidelines:

### A. Database Execution & N+1 Pattern Resolution
- **Index Optimization**: Explicit secondary indexes are enforced on `tenant_id` and `organization_id` columns to ensure row scans resolve in sub-millisecond ranges.
- **N+1 Prevention**: Explicit table joins and pre-fetching of user membership graphs are used in the core Passport engine. Banned pattern: iterating through user records and executing standalone database queries for their mapped organization metadata.
- **Drizzle Compiled Queries**: Query templates are prepared and compiled ahead of execution inside the Express/Node layer to skip SQL statement compilation overhead on repeat lookups.

### B. Dynamic UI & Payload Optimization
- **Payload Splitting**: Custom component definitions are lazy-loaded on the client-side utilizing React (`React.lazy`) and chunked via Vite bundling boundaries.
- **Pagination**: Any query listing ledgers, developers requests, or affiliate attribution entries enforces strict query boundaries (`limit` and `offset` criteria, default limit: 25) with cursor-based indicators to prevent massive database state reads.
- **Static Assets Delivery**: Non-volatile styling configurations, theme templates, and custom white-label logos are cached at the edge network (CDN) with strict `Cache-Control: public, max-age=31536000` instructions.

---

## 2. Multi-Tenant Caching Policies & Boundaries

### A. Data Isolation Caching Rules
To prevent catastrophic leaks of sensitive cross-tenant balances and customer metadata:
- **Zero Shared Memory**: Private ledger balances, custom tenant API keys, and PII-grade profile data must **never** be stored in shared-memory cache engines (such as Redis or Memcached) under a global wildcard query schema.
- **Scope Partitioning**: Cache keys must include the tenant identifier prefix and a cryptographic session hash:
  `omni:tenant:<tenant_id>:session:<session_token_hash>:wallet`
- **Volatile Cache Lifetime (TTL)**: Tenant wallet balance cache lifetimes are capped at 5 seconds (`TTL = 5s`) to prevent desynchronization with the compiled PostgreSQL double-entry database record.

---

## 3. Background Job Architecture (Dead-Letter Handlers)

OMNI leverages a highly reliable background worker queue pattern to process non-blocking processes (e.g. emails, webhooks, analytics, domain checks) without degrading synchronous API gateway response times.

```
[Inbound Trigger] 
       │
       ▼
 ┌───────────┐         ┌───────────────────┐         ┌────────────────────┐
 │ Job Queue │ ──────> │ Job Processor VM  │ ──────> │ Completion/Webhooks│
 └─────┬─────┘         └─────────┬─────────┘         └────────────────────┘
       │ Retry Exhausted         │ (Internal Crash)
       ▼                         ▼
 ┌─────────────────────────────────────────┐
 │       Dead-Letter Queue (DLQ)           │
 └─────────────────────────────────────────┘
```

### A. Queue Processing & Retry Criteria
1. **At-Least-Once Delivery**: Job dispatches are recorded in a PostgreSQL `background_jobs` registry table with states: `pending`, `processing`, `completed`, or `failed`.
2. **Exponential Backoff**: Jobs that fail due to external API timeouts (e.g. email mailer blocks or custom webhook timeouts) undergo three retry steps:
   - *Attempt 1:* 60 seconds delay
   - *Attempt 2:* 300 seconds delay
   - *Attempt 3:* 900 seconds delay
3. **Dead-Letter Queue (DLQ)**: When a background job exhausts all three retries, it is immediately transitioned to `dlq_status` with a copy of its final failure stack trace. This prevents processing loops and isolates broken payloads for manual review.

### B. Core Jobs Registry Scopes
- **Email & Notifications**: Purges transaction alerts and MFA enrollment notifications.
- **Webhook Dispatcher**: Publishes event envelopes (e.g., `subscription.created`) using client HMAC SHA-256 tokens.
- **Domain Verification Checkers**: Scans TXT/CNAME records on the public DNS network to validate white-label tenant domain mappings.
- **Ecosystem Financial Reconciliation**: Background audit script runs nightly at 00:00 UTC to ensure double-entry credit and debit sums across the network equate to zero.

---

## 4. Structured Observability & System Status Telemetry

OMNI integrates deep observability anchors across API routers and worker processes:

### A. Structured Logging & Correlation IDs
- **Correlation Propagation**: Every inbound HTTP request at the API Gateway receives a unique correlation identifier header (`X-Correlation-ID: corr_omni_uuid`).
- **Trace Context**: All downstream log statements (database operations, AI queries, payout validations) must print the correlation ID in standard JSON log envelopes:
  `{"timestamp":"2026-08-15T04:45:59Z","correlation_id":"corr_omni_9912a","tenant_id":"ten_dynasty_99","level":"info","message":"Balance transfer complete"}`

### B. Health & Readiness Diagnostics
- **Liveness Endpoint (`/api/health/liveness`)**: Returns `200 OK` instantly to indicate the Node/Express server process is alive.
- **Readiness Endpoint (`/api/health/readiness`)**: Executes active connection pings to PostgreSQL and background job registers, returning `200 OK` only when all underlying systems are connected and responsive.

### C. Standard System Performance Quotas
To protect system resources, OMNI enforces different API rate-limit bounds:

| Access Profile Class | Max Rate Limits | Burst Allowance | Core Mechanism |
| :--- | :--- | :--- | :--- |
| **Public API Envelopes** | 60 requests / minute | 10 requests | Fixed Window IP Shard |
| **Authenticated Users** | 300 requests / minute | 50 requests | Token Bucket User Context |
| **Developer Third-Party Keys**| 600 requests / minute | 100 requests | Token Bucket Application Key |
| **AI System Queries** | 30 requests / minute | 5 requests | Cognitive Guardrail Check |

---

## 5. Disaster Recovery, Resiliency & BCP Plan

### A. Core Database Backup Protocols
- **Transaction Logs (WAL)**: Write-Ahead Logs are archived continuously to isolated, geo-replicated object storage to facilitate Point-In-Time Restoration (PITR).
- **Daily Snapshot backups**: Full database snapshot images are captured every 24 hours at 01:00 UTC, retained for 35 days, and stored across multiple availability zones.

### B. Cryptographic Secrets Management
- Production credentials (`DATABASE_URL`, `GEMINI_API_KEY`, Stripe secrets) are **never** stored inside code or local directories. They are dynamically mounted from Google Secret Manager or HashiCorp Vault at runtime.

### C. Business Continuity Metric Thresholds (RPO / RTO)

- **Recovery Point Objective (RPO):** Under 5 minutes. Continuous WAL replication guarantees maximum data-loss is capped at 5 minutes during a catastrophic multi-region cloud failure.
- **Recovery Time Objective (RTO):** Under 15 minutes. Automatic DNS failover and pre-baked Kubernetes/Cloud Run container snapshots guarantee standby infrastructure can resume full traffic processing quickly.

---

## 6. Incident Response & Emergency Escapes

1. **Detection:** High-priority alerts dispatch notifications to pager lines when the error rate exceeds 1% of total platform volume over any 3-minute window.
2. **Containment (The Admin Fire-Escape):**
   - Superadmins can flag a tenant ID or user instantly as `suspended` to stop active balance leak vectors.
   - Global feature flags can instantly deactivate third-party API keys or AI agent routing interfaces.
3. **Restoration:**
   - Database rollback scripts are verified against staging environments prior to production snapshot application.
   - Inbound webhook pipelines are temporarily paused and cached, then safely replayed upon connection restoration.
