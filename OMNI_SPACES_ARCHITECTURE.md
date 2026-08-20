# OMNI Spaces & Community Platform — System Architecture Specification

## 1. Executive Summary & Objective
**OMNI Spaces** serves as the unified social organization, collaboration, knowledge, and commerce layer of the OMNI Ecosystem. It seamlessly blends community engagement, micro-websites, high-concurrency encrypted chat, structured social feeds, course delivery, integrated commerce storefronts, events, document vaults, and per-space AI assistants into a cohesive, sovereign experience.

Built on top of OMNI Core, OMNI Spaces directly reuses **OMNI Passport (Single Sign-On & Verification)**, **OMNI Finance OS (Real-time Ledger & Multi-Currency Splits)**, and **OMNI AI Mesh (Gemini 2.5 Grounded Knowledge)** without introducing redundant database silos or divergent auth systems.

---

## 2. Space Types & Archetype Taxonomy

OMNI Spaces natively supports 8 specialized space types, each with tailor-made defaults, permission structures, and domain routing:

```
+-----------------------------------------------------------------------------------+
|                                  OMNI SPACES                                      |
+-------------------+-------------------+-------------------+-----------------------+
|  1. Public Space  |  2. Private Space | 3. Enterprise     |  4. Learning Space    |
|     (Interests)   |     (Invite-only) |    (SSO + RBAC)   |     (LMS & Cohorts)   |
+-------------------+-------------------+-------------------+-----------------------+
|  5. Business      |  6. Creator Space | 7. Family Space   |  8. Organisation      |
|     (Store & CRM) |     (Paid & Tier) |    (Vault & Cir)  |     (Faith & NGO)     |
+-------------------+-------------------+-------------------+-----------------------+
```

1. **Public Space**: Open discovery, indexable feed, community discussions, global interest hubs.
2. **Private Space**: Invite-only, hidden rosters, encrypted member discussions, sovereign privacy.
3. **Enterprise Space**: SAML/OIDC SSO enforcement, audit logging, DLP scanning, role-based departmental channels.
4. **Learning Space**: Structured course curricula, video lessons, interactive quizzes, student cohort discussions.
5. **Business Space**: Social storefront, product catalogs, customer direct inquiries, OMNI Pay checkout.
6. **Creator Space**: Monthly membership tiers, subscriber-exclusive content, tipping jar, digital downloads.
7. **Family Space**: Private vaults, shared family calendar, encrypted instant messaging, secure photo galleries.
8. **Organisation Space**: Non-profit, church/fellowship, and civic bodies with tithe/donation collection, volunteer scheduling, and live broadcasting.

---

## 3. Flagship 10-in-1 Space Structure

Every OMNI Space is a composite container composed of 10 fully integrated sovereign modules:

```
+-----------------------------------------------------------------------------------+
|                               OMNI SPACE CONTAINER                                |
+-----------------------------------------------------------------------------------+
|  1. Community Hub    | Dynamic member directory, roles (Owner, Admin, Mod, Member) |
|  2. Custom Website   | White-label landing page builder, custom domain & SSL      |
|  3. Real-Time Chat   | Threaded rooms, voice channels, WebRTC audio/video huddles |
|  4. Social Feed      | Rich media posts, polls, markdown articles, nested comments|
|  5. Courses & LMS    | Multi-module video lessons, progress tracking, certificates|
|  6. Social Store     | Digital goods, tickets, physical merchandise, instant pay  |
|  7. Events & Meet    | Hybrid live streams, webinars, calendar RSVPs              |
|  8. Document Vault   | Encrypted knowledge base, versioning, AI semantic index    |
|  9. Member Directory | Reputation scores, verification badges, activity stats     |
| 10. AI Assistant     | Gemini 2.5 grounded in space docs, Q&A, auto-moderation    |
+-----------------------------------------------------------------------------------+
```

---

## 4. Groups & Broadcast Channels System

### 4.1. The 5 Sovereign Group Types
Groups exist either within a Space or as standalone working units:
- **Public Group**: Open for anyone in the organization or global network.
- **Private Group**: Membership requires approval from group administrators.
- **Secret Group**: Non-indexable; discoverable only through direct cryptographic invite link.
- **Paid Group**: Gated behind one-time ticket or recurring subscription via OMNI Pay.
- **Sovereign Working Squad**: Equipped with task boards, shared file vaults, and meeting rooms.

### 4.2. The 5 Broadcast Channel Types
Channels provide one-to-many asymmetric communication:
- **Public News Wire**: Broadcast announcements to unlimited followers.
- **Verified Official**: Stamped with cryptographic organizational signatures.
- **Subscriber Only**: Premium broadcasts for paying supporters.
- **Internal Org Wire**: Strictly accessible to authenticated staff/members.
- **Urgent Announcement**: High-priority push notifications with delivery receipts.

---

## 5. Membership & OMNI Finance Monetization Engine

All monetary settlement in OMNI Spaces flows directly through the **OMNI Finance Engine**:
- **Free Tier**: Instant onboarding with anti-bot captcha and reputation gating.
- **One-Time Access**: Fixed-fee lifetime membership with instant cryptographic receipt.
- **Recurring Monthly/Annual Subscriptions**: Automated billing, renewal webhooks, and grace period handling.
- **Platform Fee & Revenue Split**: Automatic deduction of platform commission (e.g. 5%) and instant routing of net funds (95%) to the Space Owner's connected OMNI Pay merchant account.
- **Multi-Currency Support**: Native settlement in USD, EUR, GBP, NGN, BRL, and stablecoins.

---

## 6. Space AI Assistant (Gemini 2.5 Grounded Intelligence)

Every Space is equipped with an autonomous AI copilot:
- **Document-Grounded Q&A**: Employs vector semantic search across the Space's Document Vault to provide precise, cited answers.
- **Live 100+ Language Translation**: Real-time cross-language message and post translation.
- **Conversation Summarization**: Generates digestible bulleted summaries of long chat threads and meeting recordings.
- **Automated Content Shield**: Real-time evaluation of posts, comments, and attachments for spam, hate speech, phishing, and policy violations.

---

## 7. Moderation, Safety & Audit Infrastructure

- **Multi-Tier Hierarchy**: Super Admin > Space Owner > Space Admin > Moderator > Verified Member > Standard Member.
- **Action Capabilities**: Mute, Kick, Permanent Ban, Content Removal, Shadow-Restrict, and Identity Flagging.
- **Cryptographic Audit Trail**: All administrative and moderation actions append a SHA-256 Merkle proof to the immutable audit log table (`connect_audit_logs`).

---

## 8. Automated Diagnostic Verification Suite

The system includes a 6-point automated test suite:
1. **Space Provisioning & Scalability**: Verifies indexing, domain routing, and 10k+ member roster handling.
2. **Privacy & Security Boundaries**: Enforces invite-only isolation, secret spaces, and RLS partition checks.
3. **OMNI Finance Payment Ledger**: Validates recurring subscriptions, tier upgrades, and automated split calculations.
4. **AI Assistant Document Grounding**: Verifies semantic vector search and zero-hallucination document retrieval.
5. **Real-time Safety & Moderation**: Tests automated toxicity scoring and audit trail Merkle immutability.
6. **Multi-Tier Role Capabilities**: Validates granular permission matrices across all 10 space modules.
