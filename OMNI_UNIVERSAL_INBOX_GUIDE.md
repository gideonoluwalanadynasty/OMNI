# OMNI Universal Inbox & Communication Gateway Architecture Guide

```
========================================================================================
                          OMNI UNIVERSAL INBOX & GATEWAY
         Sovereign Multichannel Relationship & Communication Command Centre
========================================================================================
```

## 1. Executive Vision & Invariant Rules

The **OMNI Universal Inbox** makes OMNI Connect the central communication command centre for individuals, creators, and businesses worldwide.

### Sovereign Gateway Principle
> **"External platforms are integrations. They are not dependencies. OMNI Connect remains the primary relationship layer."**

```
 ┌─────────────────┐     ┌──────────────────────┐     ┌────────────────────────┐
 │ External Channels│     │ Integration Gateway  │     │ OMNI Universal Inbox   │
 │ • WhatsApp      │────▶│ • HMAC Auth          │────▶│ • 3-Pane Sovereign UI  │
 │ • Email         │     │ • Schema Normalizer  │     │ • CRM 360 Context      │
 │ • SMS / MMS     │     │ • Idempotency Cache  │     │ • Gemini 2.5 Copilot   │
 │ • Instagram/FB  │     │ • Rate Limit Buffer  │     │ • Merkle Audit Logs    │
 │ • Webchat / TG  │     │ • Backoff Resiliency │     │ • Human-in-the-Loop    │
 └─────────────────┘     └──────────────────────┘     └────────────────────────┘
```

If an external platform experiences downtime or changes its developer terms, customer relationships, historical conversations, and business context inside OMNI remain completely intact.

---

## 2. Supported Channel Adapters

| Adapter Channel | Target Provider Protocol | Key Capabilities | Security & Verification |
| :--- | :--- | :--- | :--- |
| **WhatsApp Business** | Meta Cloud API / On-Prem WABA | Templates, Media, Quick Replies, Read Receipts, 24h Window | Double Opt-In + Webhook SHA-256 |
| **Email Gateway** | SMTP / IMAP / SendGrid / Graph | Threading (RFC 2822), HTML/Markdown, Attachments, CC/BCC | DKIM, SPF, DMARC, TLS 1.3 |
| **SMS / MMS** | Twilio / Telnyx / 10DLC / Toll-Free | High Throughput, Media attachments, Automated STOP opt-out | Carrier Registry + Rate Throttling |
| **Instagram Direct** | Meta Graph API v19.0 | Story Mentions, DMs, Quick Replies, Media Carousel | OAuth 2.0 Token Rotation |
| **Facebook Messenger** | Meta Graph API v19.0 | Threaded DMs, Rich Cards, Structured Action Buttons | App Secret Proof HMAC |
| **Website Live Chat** | OMNI Embedded Web SDK | Real-Time WebSockets, Visitor Typing, Co-browsing, Form sync | JWT Domain Origin Verification |
| **Telegram Bot** | Telegram Bot API MTProto | Group Mentions, Channel Broadcasts, Bot Actions | Bot Token Secret Vault |
| **OMNI Native Bridge** | Signal Double-Ratchet E2EE | Quantum-Resistant Kyber-1024, Instant OmniPay transfers | Zero-Knowledge Fingerprints |

---

## 3. The 3-Pane Universal Inbox Architecture

The flagship `OmniUniversalInboxView` is crafted with an ergonomic 3-pane workflow:

```
┌─────────────────────────┬───────────────────────────────┬──────────────────────────┐
│ PANE 1: CONVERSATIONS   │ PANE 2: ACTIVE THREAD         │ PANE 3: CRM 360 & AI     │
│ • Channel Selector      │ • Channel Origin Badge        │ • Contact & Company 360  │
│ • Real-time Search      │ • Inbound/Outbound Bubbles    │ • Lifetime Value & Score │
│ • Status Queues (Open,  │ • SLA Countdown Timer         │ • Active CRM Deals ($)   │
│   Pending, Resolved)    │ • AI Translations (100+ Lang) │ • Agent & Team Assignee  │
│ • Unread Count Badges   │ • Gemini Smart Reply Matrix   │ • Sentiment & Intent Tag │
│ • Customer Identity Pill│ • Rich Multi-channel Composer │ • Internal Team Notes    │
└─────────────────────────┴───────────────────────────────┴──────────────────────────┘
```

### Key Workflow Actions:
1. **Real-time Channel Switching**: Filter by WhatsApp, Email, SMS, Instagram, Webchat, Telegram, or view the unified multi-channel inbox.
2. **Channel Delivery Receipts**: Monitor message delivery status (`queued`, `sent`, `delivered`, `read`, `failed`).
3. **Multi-Tone AI Smart Replies**: Generate replies in 4 calibrated tones (*Professional*, *Empathetic*, *Concise*, *Sales-focused*).
4. **CRM 360 Progression**: Update deal stages, modify customer tiers, and convert inbound chats into qualified opportunities with 1 click.

---

## 4. AI Communication Copilot & Strict Safety Policy

### Grounded Intelligence Features:
- **Instant Thread Summarization**: Condenses multi-day customer conversations into 2 concise executive sentences.
- **Sentiment & Intent Classification**: Automatically scores sentiment (0–100%) and categorizes intent (`sales_inquiry`, `technical_support`, `billing_question`, `partnership`, `feedback`).
- **Multilingual Neural Translation**: Translates incoming messages from 100+ languages to the agent's preferred language with source retention.
- **Recommended Next Best Action**: Suggests commercial actions (e.g., *"Offer Enterprise Tier Discount with 14-day evaluation trial"*).

### Strict AI Safety Invariant
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ CRITICAL AI COMMUNICATION SAFETY POLICY #1:                             │
│                                                                             │
│ AI cannot automatically dispatch external customer messages without         │
│ explicit human agent click-through and review.                              │
│                                                                             │
│ • aiAutoSendBlocked = true is permanently enforced in the Gateway Core.     │
│ • All AI suggestions are presented as editable drafts requiring approval.  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Event-Driven Conversation Automations

The workflow engine handles event-driven triage rules:

```
[Inbound Event Payload]
         │
         ▼
[Trigger Evaluation] ──▶ (VIP Customer | Keywords | After-Hours | Negative Sentiment | SLA Breach)
         │
         ▼
[Conditions Filter] ───▶ (Match customer tier, tags, channels, or time window)
         │
         ▼
[Automated Actions] ───▶ • Assign to Team / Agent
                         • Create / Update CRM Lead & Opportunity
                         • Send Verified Auto-Receipt Template
                         • Auto-Tag & Route to Priority Queue
```

---

## 6. Multichannel Broadcast & Campaigns

- **Double Opt-In Enforcement**: Outbound promotional broadcasts require explicit verified consent records.
- **Automated STOP Handler**: Instantly suppresses contacts sending STOP/UNSUBSCRIBE across all SMS/WhatsApp adapters.
- **Quiet Hours Scheduling**: Automatically delays marketing broadcasts between 22:00 and 08:00 in the recipient's local timezone.

---

## 7. Performance Analytics & Conversion Intelligence

Track real-time relationship ROI:
- **Median First Response Time (FRT)**: Benchmark against SLA targets.
- **Median Resolution Time**: Single-session vs. multi-touch resolution analytics.
- **CSAT & Sentiment Trends**: 98.4% customer satisfaction tracking.
- **Sales Pipeline Influenced**: Measure dollar value of deals closed directly from chat conversations.
- **Agent Workload Balancing**: Real-time agent capacity and response-time leaderboards.

---

## 8. Diagnostic Test Suite Verification

The built-in automated test suite validates all 6 foundational scenarios:

1. **Adapter Synchronization**: End-to-end normalization of WhatsApp, Email, and Instagram webhooks into canonical `UniversalMessage` entities.
2. **Channel Resiliency**: Upstream API 503 error simulation with exponential retry backoff in OMNI Universal Queue.
3. **CRM Entity Auto-Resolution**: Verified customer matching, lifetime value calculation, and deal stage linkages.
4. **AI Safety Boundary**: Verified blocking of unapproved autonomous outbound dispatches.
5. **Consent Compliance**: Automated STOP opt-out suppression ledger verification.
6. **Concurrency & SLA Timers**: High-load multi-agent allocation with zero deadlocks.
