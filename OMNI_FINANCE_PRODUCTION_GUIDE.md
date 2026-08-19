# OMNI Finance OS — Production Deployment & Architecture Guide

**System:** OMNI Finance OS Enterprise Core  
**Classification:** Tier-1 Critical Financial Infrastructure  
**Uptime Target:** 99.999% Availability (Five Nines)  
**Standard:** SOC 2 Type II, PCI-DSS Level 1, ISO 27001, GDPR, FinCEN / FCA / CBUAE Compliant  

---

## 1. Enterprise Production Topology

OMNI Finance OS utilizes a zero-trust, multi-region active-active deployment topology designed to eliminate single points of failure across ingress, computation, messaging, and persistence layers.

```
                              [ GLOBAL USERS & SDK CLIENTS ]
                                            │
                                            ▼
                          [ Cloudflare / Google Cloud CDN ]
                             • Anycast DNS (0.1ms DNS RTT)
                             • Global SSL / TLS 1.3 Termination
                             • Static Asset & WASM Edge Caching
                                            │
                                            ▼
                           [ Google Cloud Armor / WAF ]
                             • L7 DDoS Mitigation (100Gbps+ absorbed)
                             • OWASP Top 10 Dynamic Rule Evaluation
                             • Geofencing & IP Reputation Filtering
                             • Rate Limiting (Token Bucket per IP / API Key)
                                            │
                                            ▼
                   [ Internal HTTPS Load Balancers (Multi-Region) ]
                                 /                     \
                                /                       \
      [ Primary Region: London (europe-west2) ]   [ Secondary Region: Belgium (europe-west1) ]
      ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
      │  Cloud Run / GKE Auto-Scaling Pool   │     │  Cloud Run / GKE Auto-Scaling Pool   │
      │  • Node.js / Express Core Server     │     │  • Node.js / Express Core Server     │
      │  • 8-Stage Payment Pipeline Engine   │     │  • 8-Stage Payment Pipeline Engine   │
      │  • Double-Entry GL Ledger Service    │     │  • Double-Entry GL Ledger Service    │
      │  • Merkle Root Verification Daemon   │     │  • Merkle Root Verification Daemon   │
      └──────────────────┬───────────────────┘     └──────────────────┬───────────────────┘
                         │                                            │
                         ▼                                            ▼
      ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
      │     Google Cloud Memorystore Redis   │◄───►│     Google Cloud Memorystore Redis   │
      │  • Distributed Mutex Locks (`Redlock`)│     │  • Active Replication Hot Standby    │
      │  • Idempotency Key TTL Cache (24h)   │     │  • Session Invalidation Bus          │
      │  • High-Throughput FX Ticker PubSub  │     │                                      │
      └──────────────────┬───────────────────┘     └──────────────────┬───────────────────┘
                         │                                            │
                         ▼                                            ▼
      ┌───────────────────────────────────────────────────────────────────────────────────┐
      │            High-Availability Cloud SQL (PostgreSQL 16 Enterprise)                 │
      │  • Primary Writer (europe-west2) with Synchronous Standby (europe-west1)          │
      │  • Read-Replicas with Dynamic Load-Balancing Pool                                 │
      │  • Row-Level Security (RLS) Tenant Isolation                                      │
      │  • Transparent Data Encryption (CMEK AES-256-GCM)                                 │
      │  • Point-in-Time Recovery (PITR) with Continuous WAL Streaming to Cloud Storage   │
      └───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Infrastructure Component Specifications

### 2.1 Compute Layer
- **Engine:** Google Cloud Run (Containerized Micro-Monolith / Service Mesh).
- **CPU / Memory Allocation:** Minimum 4 vCPU, 8GB RAM per instance; autoscaling between 5 and 150 instances based on concurrency thresholds (max 80 concurrent connections per instance).
- **Cold Start Elimination:** Minimum 3 warm instances per region with min-instance provisioning.
- **Port & Ingress:** Binds to internal port 3000, exposed externally exclusively via HTTPS 443 through Cloud Load Balancer.

### 2.2 In-Memory Distributed Cache (Redis)
- **Engine:** Redis 7.2 Cluster with Multi-AZ HA.
- **Primary Roles:**
  1. **Idempotency Key Store:** Stores `idempotency_key -> { status, response_payload }` with 24-hour TTL.
  2. **Distributed Locks:** Uses `Redlock` algorithm to prevent concurrent double-spends on balance accounts (`lock:wallet:{wallet_id}`).
  3. **Rate Limiter:** Token-bucket rate limiting enforcing 100 req/min for public endpoints and 5,000 req/min for Tier-3 Enterprise API keys.

### 2.3 Relational Database Layer (PostgreSQL)
- **Engine:** PostgreSQL 16 Enterprise with `pgcrypto` and `uuid-ossp`.
- **Isolation Level:** `READ COMMITTED` default, elevating to `SERIALIZABLE` for multi-account currency settlement and bilateral netting.
- **Row-Level Security (RLS):** Mandatory `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` on all 42 tables, binding every query context to `current_setting('app.current_tenant_id')`.

---

## 3. Production Deployment Checklist

| Step | Action | Verification Standard |
|---|---|---|
| 1 | **Secret Injection** | All secrets sourced from Google Secret Manager; zero `.env` in container image. |
| 2 | **Database Migration** | Zero-downtime Blue/Green schema migration executed with backward compatibility. |
| 3 | **CMEK Key Validation** | Cloud KMS key ring rotation verified for database and WAL storage buckets. |
| 4 | **BaaS Webhook Endpoints** | HMAC-SHA256 secrets provisioned across FedNow, SEPA, Circle, and Wise. |
| 5 | **AI Agent Boundary Audit** | Confirmation that AI Agent token scopes have zero write permissions to ledger tables. |
| 6 | **Smoke & Health Checks** | `/api/health` returns HTTP 200 with DB, Redis, and BaaS gateway latencies < 50ms. |
