# OMNI Finance OS — Super Administrator & Infrastructure Operations Guide

**Audience:** Platform Super Administrators, Chief Risk Officers, and Treasury Operations  
**Access Portal:** `https://admin.finance.omni.com` (Protected by FIDO2 Multi-Factor WebAuthn)  

---

## 1. Super Admin Role & Responsibilities

The OMNI Finance Super Administrator platform provides centralized control over global financial infrastructure without bypassing cryptographic tenant separation or double-entry ledger invariants.

Key Responsibilities:
1. **Tenant Lifecycle Management:** Provisioning, tier upgrades, risk profiling, and emergency tenant freeze.
2. **BaaS Gateway Management:** Onboarding, routing weighting, health monitoring, and failover for banking partners (FedNow, SEPA, Circle, Wise, PIX, UPI).
3. **Corridor & Currency Governance:** Activating fiat currencies, stablecoin pairs, and setting maximum daily transaction corridors.
4. **Global Platform Fee Distribution:** Setting interchange markups, FX spread floors, and white-label revenue sharing percentages.
5. **Sanctions & Compliance Oversight:** Real-time OFAC/UN sanctions feed monitoring, PEP screening thresholds, and SAR case triage.

---

## 2. Tenant Provisioning & Isolation Workflows

### 2.1 Provisioning New Financial Tenants
1. Navigate to **Super Admin Hub -> Tenant Directory**.
2. Click **+ Provision New Tenant**.
3. Configure tenant parameters:
   - **Legal Organization Name:** (e.g. `Apex Sovereign NeoBank Ltd`)
   - **Tenant Type:** `Personal`, `Business`, `Enterprise`, `Government`, or `White-Label Operator`.
   - **Jurisdiction & Base Currency:** (e.g. `GB` / `GBP` or `US` / `USD`).
   - **Compliance Tier:** Tier 1 (Standard KYC) to Tier 4 (Full Institutional KYB / UBO).
4. System automatically provisions:
   - Isolated PostgreSQL tenant ID with active Row-Level Security rules.
   - Dedicated Chart of Accounts in the General Ledger.
   - Master Multi-Currency Liquid Vault.

### 2.2 Emergency Tenant Freeze (Circuit Breaker)
In the event of detected fraudulent activity or court order:
1. Open Tenant Dossier in Super Admin.
2. Toggle **Account Status** to `FROZEN_SUSPENDED`.
3. The platform instantly:
   - Revokes all active JWT tokens and developer API keys.
   - Rejects outbound payment instructions with `403 ACCOUNT_FROZEN`.
   - Holds inbound settlements in a segregated escrow buffer.

---

## 3. BaaS Provider Gateway Controls

Administrators can dynamically manage banking partners in real time:

| Provider | Type | Primary Region | Supported Rails | Failover Target |
|---|---|---|---|---|
| **FedNow Direct** | Instant BaaS | North America (US) | FedNow, Fedwire, ACH | JPM / Column |
| **SEPA Instant (BCE)** | Eurozone RTGS | Europe (EU) | SEPA Instant, SEPA Credit, TARGET2 | Banking Circle |
| **FPS / ClearBank** | Clearing Bank | United Kingdom (GB) | Faster Payments, BACS, CHAPS | Modulr |
| **Circle USDC Gateway** | Stablecoin Bridge | Global | ERC-20, Solana, Base, Stellar | Paxos / Kraken |
| **Wise Platform Rail** | Cross-Border FX | Global (160+ countries)| Local ACH / SEPA / EFT | Currencycloud |
| **Central Bank UAE (Aani)**| National Switch | Middle East (AE) | Aani Instant, UAEFTS | Emirates NBD |
| **Central Bank Brazil (PIX)**| Instant Switch | Latin America (BR) | PIX Real-Time | Banco Central do Brasil |
