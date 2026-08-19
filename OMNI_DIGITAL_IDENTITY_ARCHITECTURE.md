# OMNI Digital Identity System Architecture & Specification

## Executive Overview
The **OMNI Digital Identity System** provisions a permanent, globally unique, sovereign identity for every OMNI user across the globe. Powered by **OMNI Passport SSO**, a single identity operates seamlessly across **OMNI Connect, OMNI Finance OS, OMNI Browser, OMNI AI Mesh, OMNI Marketplace, OMNI Ads**, and all white-label ecosystem nodes.

---

## 1. Universal URL Architecture

Every registered user, creator, business, and sovereign organisation is immediately reachable via three standard web routing layers:

1. **Canonical Web Path**: `omni.com/@username`
2. **Dedicated Subdomain**: `https://username.omni.com`
3. **Verified Custom Domain / Apex**: `https://www.company.com` or `https://ecclesiaglobal.org`

### Automatic 301 Historical Redirect Engine
When an identity claims a new handle (e.g. `@fenol` -> `@fenol_enterprise`), the system automatically stores the previous handle in `UsernameHistoryRecord` and establishes a zero-latency permanent 301 redirect to guarantee link persistence.

---

## 2. 6 Specialized Profile Archetypes

| Archetype | Key Capabilities | Example |
| :--- | :--- | :--- |
| **Personal Profile** | Encrypted DMs, biometric badges, social graph, sovereign privacy envelope. | `@gideon` |
| **Creator Profile** | Monthly subscription tiers, Masterclass courses, tips, and MRR metrics. | `@gideon` |
| **Business Profile** | Enterprise services catalogue, VAT/Reg IDs, ratings, commercial lead routing. | `@fenol` |
| **Organisation Profile** | Multi-branch diocese management, mission donation campaigns, tithes. | `@ecclesiaglobal` |
| **Community Profile** | Public/private group channels, forum governance, topic moderation. | `@kingdombuilders` |
| **Enterprise Profile** | Multi-tenant RBAC, custom SSO, audit logs, dedicated edge subdomains. | `@omnicorp` |

---

## 3. Omni Page Builder: Profiles as Sovereign Websites

The **OMNI Pages Engine** converts raw profiles into responsive, production-ready websites with zero code:
- **9 Adaptable Sovereign Templates**: Business, Creator, Portfolio, Church, School, Company, NGO, Community, Store.
- **WYSIWYG Section Manager**: Dynamic reordering and visibility toggles for *Home, About, Products, Services, Courses, Events, Community, Media, Contact, Reviews, Donations*.
- **Live Device Frame Simulator**: Real-time rendering across Desktop, Tablet, and Mobile viewports with custom brand themes and layout variants.

---

## 4. Custom Domains, DNS Verification & Edge SSL

- **DNS Records Generated**:
  - `CNAME` targeting `connect.omni.com`
  - `A Record` targeting `104.21.48.91` / `172.67.182.120` (Cloudflare / Let's Encrypt Edge Proxy)
  - `TXT` token for domain ownership challenge (`omni-verification=...`)
- **Automated SSL/TLS Issuance**: Automatic Let's Encrypt and Cloudflare Edge certificate generation with 90-day automated renewal.

---

## 5. Trust & Verification Badging Framework

- **Verified Person (Blue Check)**: Biometric and Passport/Government ID verification.
- **Verified Creator (Purple Star)**: Recognized public figures, authors, educators, and architects.
- **Verified Business (Gold Shield)**: Incorporation registration and commercial tax audit.
- **Official Organisation (Emerald Badge)**: Ecclesiastical charters, dioceses, universities, and government bodies.
- **Super Admin Queue**: Cryptographic review pipeline with SHA-256 Merkle proof stamps for every badge decision.

---

## 6. Multi-Tenant Separation & Sovereign Privacy

- **Row-Level Security (RLS)**: Enforces strict `tenant_id` boundaries between personal identities, corporate entities (`tenant_fenol_corp`), and faith dioceses (`tenant_ecclesia_org`).
- **Privacy Gates**: Granular direct messaging controls (`verified_only`, `followers_only`, `closed`), profile visibility toggles, and search engine index management.
