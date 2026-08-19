# OMNI Finance OS — Disaster Recovery & Business Continuity Plan (BCP)

**Classification:** Critical Disaster Recovery Specification  
**Recovery Objectives:** **RTO < 30 Seconds** | **RPO = 0.00 Seconds**  
**Compliance Standard:** FFIEC Business Continuity Standards, ISO 22301, EBA Guidelines on ICT and Security Risk  

---

## 1. Disaster Recovery Objectives & SLA Guarantees

| Metric | Target SLA | Architectural Enabler |
|---|---|---|
| **Recovery Point Objective (RPO)** | **0.00 Seconds (Zero Data Loss)** | Synchronous PostgreSQL WAL streaming replication between `europe-west2` and `europe-west1`. |
| **Recovery Time Objective (RTO)** | **< 30 Seconds** | Automated health-check DNS failover via Cloudflare / Cloud DNS + pre-warmed standby compute pools. |
| **Point-in-Time Recovery (PITR)** | **Sub-second precision for past 14 days** | Continuous WAL archive streaming to multi-region encrypted Cloud Storage buckets with immutable object locks. |

---

## 2. Multi-Region High-Availability Architecture

```
[ PRIMARY REGION: europe-west2 (London) ]          [ SECONDARY REGION: europe-west1 (Belgium) ]
┌─────────────────────────────────────────┐          ┌─────────────────────────────────────────┐
│ Cloud Run Compute Pool (Active-Primary) │          │ Cloud Run Compute Pool (Hot-Standby)    │
│ Cloud SQL PostgreSQL (Primary Writer)   ├─Sync WAL─► Cloud SQL PostgreSQL (Sync Standby)     │
│ Memorystore Redis (Active Leader)       ├─Replicate► Memorystore Redis (Replica)             │
└─────────────────────────────────────────┘          └─────────────────────────────────────────┘
                    │                                                     │
                    └──────────────────────────┬──────────────────────────┘
                                               │ Continuous Streaming
                                               ▼
                              [ MULTI-REGION COLD ARCHIVE (GCS) ]
                              • Daily Full Database Snapshots (AES-256)
                              • Continuous Transaction WAL Logs (PITR)
                              • Merkle Tree Cryptographic Audit Roots
```

---

## 3. Disaster Scenarios & Automated Recovery Procedures

### Scenario A: Complete Cloud Datacenter Outage (Primary Region Loss)
1. **Automated Detection (t = 0s to 5s):**
   - Multi-zone health probes in London detect 3 consecutive failed health check pings on `/api/health`.
2. **Automated Promotion (t = 6s to 15s):**
   - Cloud SQL synchronous standby in Belgium is automatically promoted to Primary Read/Write master.
   - Zero committed transactions lost due to synchronous WAL commitment.
3. **Traffic Ingress Rerouting (t = 16s to 25s):**
   - Anycast Global Load Balancer switches origin traffic from London to Belgium.
4. **Service Restoration (t < 30s):**
   - Secondary compute pool handles 100% of global API and payment pipeline traffic.

### Scenario B: Accidental Data Corruption / Ransomware Mitigation
1. **Isolation:** Immediately place database in read-only maintenance mode via Super Admin switch.
2. **Point-in-Time Restore (PITR):**
   - Trigger restoration from Cloud Storage WAL archive to a target timestamp exactly 1 second prior to corrupting event:
     ```bash
     gcloud sql instances restore-backup omni-finance-prod-db \
       --backup-id=PITR_SNAPSHOT_ID \
       --point-in-time="2026-08-18T09:14:59.000Z"
     ```
3. **Verification:** Automated reconciliation daemon validates balance checksums against Merkle root hashes before releasing write locks.

---

## 4. Automated Backup Verification & Quarterly Drills

- **Daily Automated Test Restoration:** Every night at 02:00 UTC, the CI/CD pipeline restores the latest snapshot onto an ephemeral isolated testing cluster, validates double-entry ledger balance integrity (`sum(debit) == sum(credit)`), and posts verification proof to `#sre-audit-logs`.
- **Quarterly Tabletop & Live Chaos Drills:** Simulated catastrophic loss of primary database master during peak transaction load to verify RTO under real-world conditions.
