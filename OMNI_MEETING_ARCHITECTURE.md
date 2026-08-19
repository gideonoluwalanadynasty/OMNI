# OMNI Voice, Video, Meetings, and Webinar Platform Architecture

## 1. Executive Summary & Core Principles

The **OMNI Voice, Video, Meetings, and Webinar Platform** is the real-time media and communications infrastructure of the OMNI ecosystem. It delivers high-fidelity audio/video calling, enterprise-grade video conferencing, ultra-scale interactive webinars, and virtual classrooms while strictly adhering to OMNI's architectural tenets:

- **Sovereign Communication Identity**: Communication identity is natively rooted in OMNI Connect. There are no disjointed account silos; all call participants, meeting hosts, and webinar attendees use verified **OMNI DIDs** (`did:omni:...`) and Passport profiles.
- **Deep Ecosystem Integration**: Seamlessly interfaces with:
  - **OMNI Identity & Contacts**: Universal address book, cryptographic contact cards, and relationship graph circles.
  - **OMNI Calendar & Events**: Native scheduling, recurring sync, and automated RSVP ticket verification.
  - **OMNI AI (Gemini 2.5 Copilot)**: Real-time speaker diarization, live subtitles in 100+ languages, automated meeting summaries, and actionable CRM pipeline extraction.
  - **OMNI Cloud & Finance**: Immutable cloud recording storage with SHA-256 Merkle root verification and native ticket monetization.
- **Provider-Agnostic Media Service Abstraction**: A decoupled abstraction layer that does not lock the platform into a single proprietary infrastructure vendor, supporting WebRTC peer-to-peer, Selective Forwarding Units (SFUs), multipoint media servers, and mass RTMP/HLS streaming engines.

---

## 2. Real-Time Media Architecture & Media Service Abstraction Layer

```
                        +---------------------------------------------+
                        |             OMNI Connect Engine             |
                        +---------------------------------------------+
                                               |
                        +---------------------------------------------+
                        |        Media Service Abstraction Layer      |
                        +---------------------------------------------+
                               /               |               \
                              /                |                \
                             v                 v                 v
            +--------------------+   +--------------------+   +--------------------+
            | P2P / SFU Engine   |   | Live AI Pipeline   |   | Cloud CDN / HLS    |
            | (1:1 & Group Calls)|   | (STT, Diarization, |   | (10k+ Attendee     |
            | Opus / AV1 / H.264 |   | Translation, CRM)  |   | Webinar Broadcast) |
            +--------------------+   +--------------------+   +--------------------+
```

### 2.1 Media Service Interface
The platform defines an abstraction interface (`OmniMediaService`) that handles signaling, media session negotiation, codec selection, and transport routing:

```typescript
export interface OmniMediaService {
  startCallSession(params: CallInitiationParams): Promise<OmniCallSession>;
  createMeetingSession(params: MeetingCreationParams): Promise<OmniMeetingSession>;
  registerForWebinar(webinarId: string, attendeeProfileId: string): Promise<OmniWebinarRegistration>;
  startMeetingRecording(meetingId: string): Promise<OmniCloudRecording>;
  injectLiveTranscript(meetingId: string, item: AiMeetingLiveTranscriptItem): Promise<void>;
  syncMeetingToCrmDeal(meetingId: string, dealId: string): Promise<CrmSyncResult>;
}
```

### 2.2 Network Topology & Codec Pipeline
1. **1:1 Calling (Mesh / Direct P2P)**:
   - STUN/TURN ICE candidate gathering with automatic NAT hole punching.
   - Dynamic bit-rate allocation using Opus 48kHz wideband audio and adaptive AV1 / VP9 / H.264 video simulcast.
   - Built-in NetEQ adaptive jitter buffer to recover from packet bursts and packet loss up to 30%.
2. **Multi-Party Meetings (SFU / Selective Forwarding Unit)**:
   - Clustered edge node topology (US-East, EU-Central, AP-East).
   - Downlink bandwidth adaptation: Active speaker streams at 1080p60; non-speaking grid tiles stream at 360p15 to minimize client CPU and memory footprint.
3. **Webinars & Townhalls (Broadcast CDN)**:
   - Ultra-low latency WebRTC ingestion converted to distributed RTMP/HLS for 10,000+ simultaneous passive attendees with sub-second latency.

---

## 3. Meeting System Architecture

### 3.1 Meeting Types & Lifecycle
The meeting subsystem supports four operational modalities:
- **Instant Ad-hoc Calls**: Single-click meeting generated from any chat thread or CRM contact card.
- **Scheduled Meetings**: Synchronized with OMNI Calendar and sent as native invites.
- **Recurring Series**: Standups, project checkpoints, and 1:1 syncs with continuous history.
- **Permanent Sovereign Meeting Rooms**: Personal meeting links (`connect.omni.com/meet/@username`) with customizable waiting room rules.

### 3.2 Security, Permissions & Waiting Room
- **Host & Co-Host Controls**: Mute all participants, lock meeting, toggle screen share permissions, enable waiting room, and force participant eviction.
- **Quarantine Waiting Room**: Unverified or external attendees are placed in an isolated holding state until approved by the host.
- **Forensic DLP Watermarking**: Overlays the viewer's OMNI DID and IP hash as a subtle watermark across the video render pipeline to deter unauthorized recording leaks.

---

## 4. AI Meeting Intelligence & Consent Guardrails

### 4.1 Real-Time Processing Pipeline
```
  [Audio Stream] ──> [Opus NetEQ] ──> [Speaker Diarization] ──> [Gemini 2.5 STT]
                                                                        │
                                   ┌────────────────────────────────────┴───────────────────────────────────┐
                                   ▼                                                                        ▼
                     [Real-time Live Subtitles]                                             [AI Executive Digest Engine]
                     (100+ Multi-Language Translation)                                       • TL;DR Synthesis
                                                                                             • Key Decisions
                                                                                             • Action Items with DIDs
                                                                                             • CRM Deal Stage Pipeline Sync
```

### 4.2 Consent Enforcement
AI transcription, speaker diarization, and cloud recording strictly enforce participant consent. All attendees receive real-time audio/visual notifications when transcription or recording is initiated.

### 4.3 Automated CRM Pipeline Sync
Meeting digests automatically map discussion points to **OMNI CRM** deals:
- Auto-extracts commitments, pricing terms, and next steps.
- Updates deal stages (e.g., *Proposal Sent*, *Contract Negotiation*).
- Assigns actionable tasks to specific team members via OMNI Passport IDs.

---

## 5. Webinar & Large-Scale Broadcast Infrastructure

- **Role Segregation**: Clear division between **Hosts/Co-Hosts**, **Panelists** (active cameras and audio), and **Attendees** (low-latency passive stream).
- **Interactive Engagement Tools**:
  - **Live Q&A**: Upvote ranking, anonymous questions, and answered badges.
  - **Audience Polls**: Real-time broadcast polls with instant percentage tallying.
  - **Live Reactions**: Burst emoji reactions with floating canvas rendering.
- **OMNI Events & Monetization**:
  - Direct integration with OMNI Finance for paid webinar tickets.
  - Verifiable on-chain attendance proofs and VIP backstage passes.

---

## 6. Online Classroom & Education Subsystem

- **OMNI Learn Course Integration**: Direct binding between virtual meeting rooms and educational course modules (`associatedCourseLessonId`).
- **Interactive Syllabus Outline**: Dynamic topic checklist with real-time progress updates.
- **Interactive Knowledge Quizzes**: Timed in-session quizzes with instant scoring and XP distribution.
- **Verifiable Course Certificates**: Issue on-chain, tamper-proof NFT/DID completion certificates based on attendance and quiz performance.

---

## 7. Cloud Recording & Storage Governance

- **SHA-256 Merkle Provenance Hash**: Every recording chunk is cryptographically hashed at the edge to ensure tamper-proof archival integrity.
- **AI Smart Chapters**: Automatically indexes meetings into timestamped chapters with concise summaries.
- **Access Governance**: Supports Private, Invited-Only, Organization Internal, and Password-Protected sharing tiers with automated retention expiration.

---

## 8. Automated Test Suite & Benchmark Telemetry

The platform includes an automated 6-scenario verification suite (`runMediaTestSuite`):

| Test Scenario | Validation Criteria | Benchmark Target |
| :--- | :--- | :--- |
| **01. SFU Concurrency & Mesh Scaling** | 100+ simulated nodes, bidirectional stream routing | < 25ms negotiation |
| **02. Opus NetEQ Jitter Buffer Recovery** | 30% synthetic packet burst loss recovery via FEC | 0 audible artifacts |
| **03. Cloud Recording Crypto Proofs** | SHA-256 Merkle root verification & permission ACL | 100% hash match |
| **04. Dual-Stream Presentation & AI DSP** | 60fps screen share + 40dB ambient noise suppression | < 12ms DSP latency |
| **05. Waiting Room Quarantine Security** | Host authorization enforcement & unauthorized block | 100% rejection rate |
| **06. Large-Scale Broadcast Capacity** | 10,000+ passive attendee broadcast mesh latency | < 850ms latency |

---

## 9. File Structure Reference

```
src/
├── types/
│   ├── omni_media_meetings.ts      # Core media domain models, call types, sessions, policies
│   └── omni_connect.ts             # Navigation tabs and top-level connection definitions
├── engine/
│   └── omni_connect_engine.ts      # State orchestrator, media service methods & automated test suite
├── components/connect/
│   ├── OmniConnectRoot.tsx         # Main entry point with route dispatching and modal managers
│   └── media/
│       ├── OmniCallingModal.tsx          # 1:1 and group call modal with DSP and video filters
│       ├── OmniMeetingsDashboard.tsx     # Video conference dashboard with live AI transcription & CRM sync
│       ├── OmniWebinarHub.tsx            # Mass broadcast platform with Q&A, polls & ticket sales
│       ├── OmniClassroomView.tsx         # Virtual classroom with quizzes & verifiable certificates
│       ├── OmniRecordingsVault.tsx       # Cloud recordings player with SHA-256 Merkle proofs
│       ├── OmniMediaAdminModal.tsx       # Super admin SFU routing & watermark governance
│       └── OmniMediaTestSuiteModal.tsx   # Automated media diagnostics and telemetry runner
└── OMNI_MEETING_ARCHITECTURE.md    # Platform architecture documentation
```
