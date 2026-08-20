# OMNI CONNECT SRE & OPERATIONS RUNBOOK

## 1. Incident Response Matrix
- **Severity 1 (Critical Outage / Security Breach):**
  - Instant page to on-call Security & SRE Leads.
  - Automated circuit breaker trips degraded modules into maintenance.
  - Failover traffic to secondary regional cluster using Anycast DNS weighted steering.
- **Severity 2 (High Latency / Degraded Feature):**
  - Auto-scale HPA minimum replicas by 2x.
  - Review OpenSearch & Postgres slow query logs.
  - Purge edge Redis cache hotspots if key eviction rate spikes.

## 2. Backup & Disaster Recovery Runbook
- **Continuous WAL Replay:** Automated recovery from S3 storage archives using Point-In-Time Recovery (PITR).
- **RTO / RPO Verification:** Monthly chaos engineering drills simulate full region failure (Target RPO: 0 min, Target RTO: < 2 min).

## 3. Observability & SLO Targets
- **Availability SLO:** 99.999% over 30 rolling days.
- **P95 Latency SLO:** < 30ms for standard API requests; < 15ms for messaging relays.
- **Error Budget:** Less than 0.001% 5xx errors per billion requests.
