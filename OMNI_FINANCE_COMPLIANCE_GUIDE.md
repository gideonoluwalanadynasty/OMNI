# OMNI Finance OS — Global Regulatory Compliance & AML/CFT Guide

**Classification:** Global Regulatory & Financial Crimes Compliance Standard  
**Jurisdictions Covered:** United States (FinCEN / OCC), United Kingdom (FCA), European Union (EBA / BaFin / ACPR), Singapore (MAS), United Arab Emirates (CBUAE / DFSA), Brazil (BACEN), India (RBI)  
**Standard:** FATF 40 Recommendations, 6AMLD, Bank Secrecy Act (BSA), USA PATRIOT Act  

---

## 1. Compliance Architecture & Tiered KYC/KYB Framework

OMNI Finance OS operates a progressive 4-Tier Know Your Customer (KYC) and Know Your Business (KYB) onboarding verification pipeline:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OMNI PROGRESSIVE VERIFICATION TIERS                      │
├─────────┬───────────────────┬─────────────────────────────────┬─────────────┤
│  Tier   │ Verification Data │ Daily Transaction Limit         │ Max Vault   │
├─────────┼───────────────────┼─────────────────────────────────┼─────────────┤
│ Tier 1  │ Phone + Email     │ $1,000 / day (P2P Domestic)     │ $5,000      │
│ Tier 2  │ Gov ID + 3D Liveness│ $25,000 / day (Global Cards)  │ $100,000    │
│ Tier 3  │ Proof of Address  │ $250,000 / day (FX & Invoicing) │ $1,000,000  │
│ Tier 4  │ KYB / UBO Registry│ $50,000,000+ / day (Treasury)   │ Unlimited   │
└─────────┴───────────────────┴─────────────────────────────────┴─────────────┘
```

---

## 2. Real-Time Sanctions Screening & PEP Radar

1. **Automated Sanctions Feed:** All senders, recipients, and beneficial owners are screened against real-time feeds:
   - US Treasury OFAC (Specially Designated Nationals - SDN)
   - United Nations Security Council Consolidated List
   - EU Consolidated Financial Sanctions List
   - UK HM Treasury Consolidated List
2. **Fuzzy Matching Algorithm:** Jaro-Winkler with Double Metaphone phonetic matching (threshold = 0.85) to prevent obfuscation via name transliterations.
3. **Automated Intercept:** Transactions matching sanctions lists with confidence score > 0.90 are **immediately blocked and placed in segregated compliance freeze**.

---

## 3. Anti-Money Laundering (AML) & Fraud Radar

### 3.1 Smurfing & Structuring Detection
- **Trigger:** Multiple transactions occurring just below mandatory reporting thresholds (e.g. $9,950 vs $10,000 BSA threshold) within 72 hours across related accounts.
- **Action:** System aggregates velocity data, computes risk score (0-100), and automatically prepares a draft **Suspicious Activity Report (SAR)** for Compliance Officer review.

### 3.2 Impossible Travel & Geofence Velocity
- **Trigger:** Successive card transactions or logins originating from geographically separated locations (e.g. London and Singapore) within a physically impossible time delta (< 4 hours).
- **Action:** Immediate temporary card lock + push notification challenge requiring WebAuthn biometric re-authentication.

---

## 4. Suspicious Activity Report (SAR / STR) Workflow

```
[ Anomaly Detected ] ──► [ Risk Engine Scoring (80+) ] ──► [ Compliance Case Created ]
                                                                     │
                                                                     ▼
[ FinCEN / GoAML XML Export ] ◄── [ Officer Sign-off ] ◄── [ AI Dossier Summary ]
```

1. **Case Creation:** Automated case file containing transaction ledger entries, counterparty vIBANs, IP hashes, and device telemetry.
2. **AI Summary:** OMNI Compliance AI drafts clear factual narrative of suspicious movement patterns.
3. **Human Approval:** Licensed Compliance Officer reviews evidence and cryptographically signs report.
4. **Electronic Filing:** Direct schema export to FinCEN BSA E-Filing System and UNODC GoAML XML standards.
