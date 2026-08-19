# OMNI Connect Architecture & Sovereign Super-App Blueprint

## Application Metadata & Positioning
- **Application ID:** `connect` (`app_connect`)
- **Primary Domain:** `connect.omni.com`
- **Path Routing:** `/connect` or `omni.com/connect`
- **Product Title:** AI-Powered Social, Communication, Community, Commerce & Business Super-App
- **Parent Ecosystem:** OMNI Core Ecosystem

---

## 1. Executive Summary & Design Principles

OMNI Connect is the dedicated relationship, communication, community, and social commerce layer of the OMNI ecosystem. Rather than fragmenting communication into disjointed applications, OMNI Connect unifies:
1. **High-Concurrency Real-Time Messaging & Voice:** End-to-end encrypted (E2EE) 1:1 direct messages, group chats, ephemeral voice notes, and embedded multi-currency crypto/fiat peer-to-peer transfers.
2. **Algorithm-Free Sovereign Social Feeds:** Chronological timeline feeds with rich media, polls, paywalled releases, and embedded 1-click OmniPay commerce cards.
3. **Structured Community Hubs & Fellowship Channels:** Multi-tier servers with hierarchical channels (Announcements, Discussion, Dev Showcase, Faith Fellowship, Campus Rooms), role-based permissions, and WebRTC voice stages.
4. **Social CRM & Omni-Channel Business Pipelines:** Unified customer messaging inbox, Kanban deal pipeline tracking with win-probability metrics, and lifetime customer value calculation.
5. **Creator Studio & Direct Monetization Hub:** Recurring membership tiers, digital asset marketplace, tipping jars, and paywall unlocks settled atomically into OMNI Finance OS multi-currency wallets with zero third-party rake.
6. **Events & HD Video Conferencing:** WebRTC encrypted video rooms, live screen sharing, AI live transcription (Gemini 2.5), and automated post-meeting executive action item generation.
7. **Active-by-Default Feature Switchboard:** Full granular administrative governance allowing super-admins to inspect, toggle, configure rate limits, and audit all 12 modules without requiring runtime rebuilds.

---

## 2. Shared OMNI Core Subsystem Re-Use Matrix

In accordance with the OMNI Sovereign Architecture Principle (**"Do not rebuild existing infrastructure"**):

| OMNI Core Subsystem | Integration Pattern in OMNI Connect | Re-Used Files / Infrastructure |
| :--- | :--- | :--- |
| **OMNI Passport & Identity** | Global single-sign-on (SSO), profile verification badges (`verified_official`, `verified_business`, `creator_pro`), multi-profile switching | `src/types.ts`, `src/types/omni_passport.ts` |
| **OMNI Finance OS** | In-chat P2P transfers, tip jars, creator payouts, 1-click commerce checkout, escrow protection | `src/components/finance/`, `src/data/financial_store_data.ts` |
| **OMNI AI (Gemini 2.5 Mesh)** | Real-time multilingual message translation (100+ languages), AI post drafting, smart replies, meeting transcription, safety scanning | `src/types/omni_ai.ts`, `@google/genai` |
| **OMNI Organization & RLS** | Multi-tenant data segregation, department and church multi-branch scoping via `tenant_id` | `src/types.ts` (`Organization`, `UserRole`) |
| **OMNI Developer Platform** | Open REST & GraphQL APIs under `/api/v1/connect/*` and outbound webhooks | `omni.connect.manifest.json`, `src/store.ts` |
| **OMNI Cryptographic Security** | SHA-256 Merkle tree state proofs for all administrative module state updates and audit logs | `src/engine/omni_connect_engine.ts` |

---

## 3. Four Dashboard Archetypes

OMNI Connect dynamically adapts its interface layout to 4 user archetypes:
1. **Personal Dashboard:** Algorithmic-free chronological feeds, encrypted 1:1 and family chats, voice notes, bookmarks, and events RSVP.
2. **Business Dashboard:** Omni-channel lead inbox, Kanban deal pipeline (`Discovery -> Demo -> Proposal -> Closed Won`), product listings, and invoice triggers.
3. **Organisation / Church / School Dashboard:** Hierarchical community channels, member rosters, campus sub-units, announcements broadcast, and faith fellowship groups.
4. **Enterprise / Super Admin Control Centre:** Feature activation switchboard (Active by Default), cryptographic audit logs, concurrency rate-limiting, and tenant access rules.

---

## 4. Cryptographic Proof & Audit Trail

All actions inside OMNI Connect (module toggles, post creations, deal state modifications, message transmissions) generate an immutable audit record:
```typescript
interface ConnectAuditLog {
  id: string;
  tenantId: string;
  actorId: string;
  actorName: string;
  action: string;
  targetType: 'module' | 'post' | 'message' | 'community' | 'deal' | 'product';
  targetId: string;
  timestamp: string;
  merkleHashProof: string; // SHA-256 of timestamp + actorId + action + targetId
}
```
