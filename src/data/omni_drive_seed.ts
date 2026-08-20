import {
  WorksDriveFolder,
  WorksDriveFile,
  WorksCloudBucket,
  WorksAiDocAnalysisResult
} from '../types/works';

export const SEED_WORKS_CLOUD_BUCKETS: WorksCloudBucket[] = [
  {
    id: 'bucket_sovereign_eu',
    name: 'Sovereign Primary IPFS Mesh (Frankfurt)',
    region: 'eu-central-1',
    provider: 'omni_decentralized_mesh',
    totalSizeBytes: 1099511627776, // 1 TB
    usedSizeBytes: 48200000000,    // 48.2 GB
    fileCount: 342,
    encryptionKeyFingerprint: 'ED25519:f9a2:81b0:99c3:44d1:aa02',
    redundancyFactor: 5,
    healthStatus: 'optimal'
  },
  {
    id: 'bucket_decentralized_filecoin',
    name: 'IPFS / Filecoin Permanent Archival Pinning',
    region: 'global-mesh',
    provider: 'ipfs_filecoin',
    totalSizeBytes: 5497558138880, // 5 TB
    usedSizeBytes: 128400000000,   // 128.4 GB
    fileCount: 1290,
    encryptionKeyFingerprint: 'SECP256K1:0x71a9...c4b2',
    redundancyFactor: 12,
    healthStatus: 'optimal'
  },
  {
    id: 'bucket_r2_edge_cache',
    name: 'Cloudflare R2 Ultra-Low Latency Edge CDN',
    region: 'global-anycast',
    provider: 'cloudflare_r2',
    totalSizeBytes: 2199023255552, // 2 TB
    usedSizeBytes: 24100000000,    // 24.1 GB
    fileCount: 810,
    encryptionKeyFingerprint: 'AES-256-GCM-HW-FIPS-140-3',
    redundancyFactor: 3,
    healthStatus: 'optimal'
  }
];

export const SEED_WORKS_DRIVE_FOLDERS: WorksDriveFolder[] = [
  {
    id: 'folder_architecture',
    workspaceId: 'ws_dynasty_core',
    parentId: null,
    name: 'Architecture & Specifications',
    color: '#6366f1',
    icon: 'Layers',
    description: 'System whitepapers, microservice topologies, cryptographic proofs and RFC documents.',
    departmentId: 'dept_eng',
    teamId: 'team_distributed',
    isPinned: true,
    isEncryptedZeroKnowledge: true,
    createdBy: 'usr_gideon_01',
    createdByName: 'Gideon Oluwalana',
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-08-20T04:15:00Z',
    fileCount: 4,
    subFolderCount: 2,
    totalSizeBytes: 24800000,
    tags: ['Architecture', 'RFC', 'Core-Protocol', 'E2EE']
  },
  {
    id: 'folder_product_design',
    workspaceId: 'ws_dynasty_core',
    parentId: null,
    name: 'Product Specs & PRDs',
    color: '#ec4899',
    icon: 'Compass',
    description: 'Product Requirements Documents, feature matrices, user journeys and design guidelines.',
    departmentId: 'dept_product',
    teamId: 'team_ui_experience',
    isPinned: true,
    isEncryptedZeroKnowledge: false,
    createdBy: 'usr_sarah_chen',
    createdByName: 'Dr. Sarah Chen',
    createdAt: '2026-02-01T11:30:00Z',
    updatedAt: '2026-08-19T21:00:00Z',
    fileCount: 3,
    subFolderCount: 1,
    totalSizeBytes: 18200000,
    tags: ['PRD', 'Design', 'Roadmap', 'UX']
  },
  {
    id: 'folder_treasury_financials',
    workspaceId: 'ws_dynasty_core',
    parentId: null,
    name: 'Treasury & Financial Models',
    color: '#10b981',
    icon: 'DollarSign',
    description: 'Quarterly financial reports, token allocation models, cap tables, and escrow audits.',
    departmentId: 'dept_finance',
    isPinned: true,
    isEncryptedZeroKnowledge: true,
    createdBy: 'usr_elena_rostova',
    createdByName: 'Elena Rostova',
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-08-20T02:40:00Z',
    fileCount: 2,
    subFolderCount: 0,
    totalSizeBytes: 8900000,
    tags: ['Finance', 'Treasury', 'CapTable', 'Escrow']
  },
  {
    id: 'folder_legal_contracts',
    workspaceId: 'ws_dynasty_core',
    parentId: null,
    name: 'Legal, Charters & Compliance',
    color: '#f59e0b',
    icon: 'ShieldCheck',
    description: 'Master service agreements, DID verification frameworks, GDPR/SOC2 records and NDA templates.',
    departmentId: 'dept_security',
    isPinned: false,
    isEncryptedZeroKnowledge: true,
    createdBy: 'usr_sofia_audit',
    createdByName: 'Sofia Al-Mansoor',
    createdAt: '2026-02-10T16:00:00Z',
    updatedAt: '2026-08-18T18:20:00Z',
    fileCount: 2,
    subFolderCount: 0,
    totalSizeBytes: 14500000,
    tags: ['Legal', 'Compliance', 'SOC2', 'DID-Notarized']
  },
  {
    id: 'folder_code_snippets',
    workspaceId: 'ws_dynasty_core',
    parentId: 'folder_architecture',
    name: 'Source Schemas & Algorithmic Engines',
    color: '#06b6d4',
    icon: 'Code',
    description: 'CRDT conflict resolution core, state machines and Rust/TypeScript reference routines.',
    departmentId: 'dept_eng',
    teamId: 'team_distributed',
    isPinned: false,
    isEncryptedZeroKnowledge: false,
    createdBy: 'usr_sarah_chen',
    createdByName: 'Dr. Sarah Chen',
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-08-20T03:10:00Z',
    fileCount: 2,
    subFolderCount: 0,
    totalSizeBytes: 4200000,
    tags: ['Code', 'Rust', 'CRDT', 'Algorithms']
  }
];

export const SEED_WORKS_DRIVE_FILES: WorksDriveFile[] = [
  {
    id: 'file_omni_manifesto',
    workspaceId: 'ws_dynasty_core',
    folderId: 'folder_architecture',
    title: 'OMNI Sovereign Enterprise Architecture Whitepaper 2026.md',
    extension: 'md',
    format: 'markdown',
    mimeType: 'text/markdown',
    sizeBytes: 124000,
    classification: 'restricted_sovereign',
    isPinned: true,
    isStarred: true,
    isArchived: false,
    isZeroKnowledgeEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM-ECDH-Curve25519',
    ipfsCid: 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xhiyulpvhwe6j4tfbda',
    sha256Checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    cloudBucketId: 'bucket_sovereign_eu',
    storageReplicationNodes: 5,
    departmentId: 'dept_exec',
    departmentName: 'Executive Leadership',
    teamId: 'team_distributed',
    teamName: 'Distributed Consensus & CRDT Squad',
    ownerId: 'usr_gideon_01',
    ownerName: 'Gideon Oluwalana',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ownerDid: 'did:omni:secp256k1:0x71a9e821b044d1883fa012',
    createdDate: '2026-01-15T09:30:00Z',
    lastModifiedDate: '2026-08-20T05:15:00Z',
    lastModifiedById: 'usr_gideon_01',
    lastModifiedByName: 'Gideon Oluwalana',
    currentVersion: 5,
    accessScope: 'workspace_members',
    viewCount: 142,
    downloadCount: 38,
    summary: 'Foundational architectural manifesto detailing the sovereign CRDT synchronization mesh, Zero-Knowledge verification protocol, and cross-application ecosystem integration across OMNI Core, AI, Connect, Finance, and Cloud.',
    aiTags: ['Sovereignty', 'Architecture', 'CRDT', 'Zero-Knowledge', 'Enterprise-Grade', 'IPFS'],
    userTags: ['Whitepaper', 'Core', 'V2.5', 'Board-Approved'],
    metadata: {
      wordCount: 1840,
      readingTimeMinutes: 7,
      linesOfCode: 0
    },
    content: `# OMNI Sovereign Enterprise Architecture Charter & Whitepaper (2026)

## Executive Abstract
The OMNI Ecosystem represents a paradigm shift in decentralized, sovereign enterprise productivity. By replacing fragmented web2 SaaS silos with a unified, cryptographically verifiable multi-tenant fabric, OMNI guarantees **mathematical data sovereignty**, **sub-5ms multi-user collaboration**, and **native multimodal AI orchestration**.

---

## 1. Architectural Pillars

### 1.1 Mathematical Data Sovereignty
Every document, relational schema, sprint artifact, and voice briefing stored within OMNI Drive is anchored to a self-sovereign Decentralized Identifier (**DID**).
* **Zero-Knowledge Enclaves**: Encryption keys remain under the sole custody of the tenant organization.
* **IPFS & Arweave Verification**: Storage blocks are pinned across peer-to-peer IPFS nodes with immutable cryptographic hashes (\`bafybeih...\`).
* **Hardware-Backed FIDO2 Authentication**: Access grants require hardware passkeys, preventing unauthorized credential theft.

\`\`\`
+--------------------------------------------------------------------+
|                  OMNI SOVEREIGN SECURE ENCLAVE                      |
|                                                                    |
|  [Tenant Key Vault] ---> [Zero-Knowledge Proof Generator]          |
|          |                                   |                     |
|          v                                   v                     |
|  +---------------+                 +--------------------+          |
|  | Local CRDT    | <--- P2P Mesh-> | Distributed IPFS   |          |
|  | State (State) |   (Sub-5ms)     | Storage Buckets    |          |
|  +---------------+                 +--------------------+          |
+--------------------------------------------------------------------+
\`\`\`

---

## 2. Real-Time CRDT Synchronization Engine
Unlike centralized legacy document editors that rely on centralized locking mechanisms, OMNI Works employs an optimized **Yjs / Automerge State-Vector Conflict-Free Replicated Data Type (CRDT)** layer.

### Core Metrics:
1. **P2P Transport Latency**: 4.8ms average across EU and US nodes.
2. **Offline-First Resilience**: Full offline read/write capability with automatic deterministic merging upon network reconnection.
3. **Presence & Telemetry**: Live cursor tracking, voice huddle hot-linking, and granular cell-level lockouts.

---

## 3. Deep Multimodal AI Intelligence Integration
OMNI AI is not an afterthought chatbot; it is a contextual reasoning co-processor built directly into the file pipeline:
* **Deep Document Summarization**: Instant extraction of executive summaries, risk factors, and financial impact.
* **Interactive Document Q&A**: Ask arbitrary questions grounded strictly within the document's verified text.
* **Multi-Language Sovereign Translation**: Zero-retention neural translation into 10+ target languages.
* **Automated Action Item Extraction**: Automatically converts meeting notes and RFC specs into executable Agile Sprint tickets.

---

## 4. Governance, RBAC & Multi-Tenant Partitioning
| Security Tier | Encryption Standard | Access Mechanism | Audit Standard |
|---|---|---|---|
| **Public** | TLS 1.3 | Public Read URL | Standard Access Log |
| **Internal** | AES-256-GCM | Tenant SSO / OAuth | Immutable DB Log |
| **Confidential** | XChaCha20-Poly1305 | RBAC + Team Gate | Cryptographic Proof |
| **Restricted Sovereign** | Zero-Knowledge Hardware Key | FIDO2 + DID Signature | IPFS Tamper Ledger |

---

## 5. Roadmap & Strategic Objectives
- [x] Phase 1: Core Partition Multi-Tenancy & Workspace Engine
- [x] Phase 2: Departments, Squads & RBAC Framework
- [x] Phase 3: OMNI Drive, Knowledge Management & Gemini Integration
- [ ] Phase 4: Collaborative Block Canvas & Relational Database Subsystem
- [ ] Phase 5: Agile Sprint Engine & Escrow Workflow Automations

*Approved by Gideon Oluwalana, Chief Executive Officer, Dynasty Sovereign Holdings.*
`,
    versions: [
      {
        versionNumber: 5,
        versionId: 'ver_05',
        createdAt: '2026-08-20T05:15:00Z',
        createdBy: 'usr_gideon_01',
        createdByName: 'Gideon Oluwalana',
        createdByAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Finalized Section 4 Governance Matrix and updated IPFS pin references for EU nodes.',
        sizeBytes: 124000,
        contentSnapshot: 'Updated governance matrix and zero-knowledge enclave architecture diagram.',
        ipfsCid: 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xhiyulpvhwe6j4tfbda',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      },
      {
        versionNumber: 4,
        versionId: 'ver_04',
        createdAt: '2026-08-19T18:30:00Z',
        createdBy: 'usr_sarah_chen',
        createdByName: 'Dr. Sarah Chen',
        createdByAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Added CRDT mathematical convergence benchmarks and latency figures.',
        sizeBytes: 118400,
        contentSnapshot: 'Added latency metrics and Automerge state-vector diagram.',
        ipfsCid: 'bafybeicg82490dfkj23984yhjkn3298',
        sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
      },
      {
        versionNumber: 3,
        versionId: 'ver_03',
        createdAt: '2026-08-15T12:00:00Z',
        createdBy: 'usr_marcus_vance',
        createdByName: 'Marcus Vance',
        createdByAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Integrated Gemini multimodal AI reasoning pipeline specifications.',
        sizeBytes: 104200,
        contentSnapshot: 'Detailed AI document Q&A and translation pipeline.',
        sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
      },
      {
        versionNumber: 2,
        versionId: 'ver_02',
        createdAt: '2026-08-01T10:00:00Z',
        createdBy: 'usr_gideon_01',
        createdByName: 'Gideon Oluwalana',
        createdByAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Refined Security Classification tiers and added DID hardware signature requisites.',
        sizeBytes: 89000,
        contentSnapshot: 'Security enclaves and FIDO2 authentication prerequisites.',
        sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
      },
      {
        versionNumber: 1,
        versionId: 'ver_01',
        createdAt: '2026-01-15T09:30:00Z',
        createdBy: 'usr_gideon_01',
        createdByName: 'Gideon Oluwalana',
        createdByAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Initial draft genesis of OMNI sovereign whitepaper.',
        sizeBytes: 54000,
        contentSnapshot: 'Initial outline and abstract.',
        sha256Hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
      }
    ],
    shares: [
      {
        id: 'sh_01',
        targetType: 'workspace_wide',
        targetName: 'All Dynasty Sovereign Members',
        role: 'viewer',
        grantedBy: 'usr_gideon_01',
        grantedAt: '2026-01-15T09:35:00Z',
        allowDownload: true,
        allowExport: true
      },
      {
        id: 'sh_02',
        targetType: 'team',
        targetId: 'team_distributed',
        targetName: 'Distributed Consensus & CRDT Squad',
        role: 'editor',
        grantedBy: 'usr_gideon_01',
        grantedAt: '2026-01-15T09:35:00Z',
        allowDownload: true,
        allowExport: true
      },
      {
        id: 'sh_03',
        targetType: 'user',
        targetId: 'usr_sarah_chen',
        targetName: 'Dr. Sarah Chen',
        targetAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        role: 'editor',
        grantedBy: 'usr_gideon_01',
        grantedAt: '2026-01-15T09:35:00Z',
        allowDownload: true,
        allowExport: true
      }
    ],
    comments: [
      {
        id: 'com_01',
        fileId: 'file_omni_manifesto',
        authorId: 'usr_sarah_chen',
        authorName: 'Dr. Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        authorRole: 'Chief Technology Officer',
        content: 'The CRDT state vector latency in section 2 has been benchmarked down to 4.2ms in our Frankfurt cluster. We are well ahead of the 10ms target! 🚀',
        createdAt: '2026-08-19T14:20:00Z',
        isResolved: false,
        taggedUserIds: ['usr_gideon_01'],
        reactions: [{ emoji: '🔥', count: 3, userIds: ['usr_gideon_01', 'usr_marcus_vance', 'usr_kai_takahashi'] }],
        replies: [
          {
            id: 'rep_01',
            authorId: 'usr_gideon_01',
            authorName: 'Gideon Oluwalana',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            content: 'Outstanding work Sarah. Make sure this benchmark is incorporated in our quarterly investor memo as well.',
            createdAt: '2026-08-19T15:05:00Z'
          }
        ]
      },
      {
        id: 'com_02',
        fileId: 'file_omni_manifesto',
        authorId: 'usr_sofia_audit',
        authorName: 'Sofia Al-Mansoor',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        authorRole: 'Head of Compliance',
        content: 'Verified that the Zero-Knowledge hardware key requirements satisfy EU NIS2 and SOC2 Type II cryptographic non-repudiation clauses.',
        createdAt: '2026-08-18T11:45:00Z',
        isResolved: true,
        resolvedBy: 'usr_gideon_01',
        resolvedAt: '2026-08-18T16:00:00Z'
      }
    ],
    activeCollaborators: [
      {
        userId: 'usr_gideon_01',
        userName: 'Gideon Oluwalana',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        color: '#6366f1',
        status: 'editing',
        lastPingAt: 'Just now',
        activeCursorLine: 42
      },
      {
        userId: 'usr_sarah_chen',
        userName: 'Dr. Sarah Chen',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        color: '#06b6d4',
        status: 'viewing',
        lastPingAt: '1m ago'
      }
    ]
  },
  {
    id: 'file_crdt_mesh_router',
    workspaceId: 'ws_dynasty_core',
    folderId: 'folder_code_snippets',
    title: 'distributed_crdt_mesh_router.rs',
    extension: 'rs',
    format: 'code',
    mimeType: 'text/x-rust',
    sizeBytes: 48900,
    classification: 'confidential',
    isPinned: false,
    isStarred: true,
    isArchived: false,
    isZeroKnowledgeEncrypted: false,
    ipfsCid: 'bafybeih4j2k8sfhjkweruio23489jksdflkjwer',
    sha256Checksum: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    cloudBucketId: 'bucket_sovereign_eu',
    storageReplicationNodes: 4,
    departmentId: 'dept_eng',
    departmentName: 'Core Engineering',
    teamId: 'team_distributed',
    teamName: 'Distributed Consensus & CRDT Squad',
    ownerId: 'usr_sarah_chen',
    ownerName: 'Dr. Sarah Chen',
    ownerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    ownerDid: 'did:omni:secp256k1:0x892a019481b01c34a',
    createdDate: '2026-02-15T08:15:00Z',
    lastModifiedDate: '2026-08-20T03:10:00Z',
    lastModifiedById: 'usr_sarah_chen',
    lastModifiedByName: 'Dr. Sarah Chen',
    currentVersion: 3,
    accessScope: 'team_only',
    viewCount: 68,
    downloadCount: 14,
    summary: 'High-performance Rust implementation of the OMNI state-vector CRDT sync engine with vectorized SIMD diff calculations and zero-copy binary serialization.',
    aiTags: ['Rust', 'CRDT', 'State-Vector', 'SIMD', 'Distributed', 'Concurrency'],
    userTags: ['Core-Engine', 'Production', 'High-Perf'],
    metadata: {
      linesOfCode: 248,
      language: 'rust'
    },
    content: `// =========================================================================
// OMNI Sovereign Core: Distributed CRDT Mesh Router (Rust v1.82+)
// Zero-allocation SIMD state-vector reconciliation layer
// =========================================================================

use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct VectorClock {
    pub client_id: u64,
    pub counter: u64,
    pub lamport_ts: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CrdtOperationChunk {
    pub chunk_id: [u8; 32],
    pub document_id: String,
    pub vector_clock: VectorClock,
    pub payload: Vec<u8>,
    pub signature: [u8; 64],
}

pub struct DistributedMeshRouter {
    node_id: u64,
    active_peers: Arc<RwLock<HashMap<u64, String>>>,
    document_clocks: Arc<RwLock<HashMap<String, VectorClock>>>,
}

impl DistributedMeshRouter {
    pub fn new(node_id: u64) -> Self {
        Self {
            node_id,
            active_peers: Arc::new(RwLock::new(HashMap::new())),
            document_clocks: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    /// Reconciles incoming CRDT operation against local state-vector with zero-copy
    pub async fn process_incoming_chunk(&self, chunk: CrdtOperationChunk) -> Result<bool, String> {
        let mut clocks = self.document_clocks.write().await;
        let current_clock = clocks.entry(chunk.document_id.clone()).or_insert(VectorClock {
            client_id: self.node_id,
            counter: 0,
            lamport_ts: 0,
        });

        // Fast-path convergence test: If chunk lamport TS is ahead, apply deterministic merge
        if chunk.vector_clock.lamport_ts > current_clock.lamport_ts {
            current_clock.lamport_ts = chunk.vector_clock.lamport_ts + 1;
            current_clock.counter += 1;
            // Broadcast chunk down P2P WebRTC data channels
            self.broadcast_to_mesh(&chunk).await?;
            Ok(true)
        } else {
            // Already seen or causal conflict: execute LWW (Last-Write-Wins) tiebreaker
            Ok(false)
        }
    }

    async fn broadcast_to_mesh(&self, chunk: &CrdtOperationChunk) -> Result<(), String> {
        // P2P low-latency broadcast hook bridged into WebRTC DataChannels
        Ok(())
    }
}
`,
    versions: [
      {
        versionNumber: 3,
        versionId: 'cver_03',
        createdAt: '2026-08-20T03:10:00Z',
        createdBy: 'usr_sarah_chen',
        createdByName: 'Dr. Sarah Chen',
        createdByAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Optimized fast-path convergence test and removed unnecessary heap allocations.',
        sizeBytes: 48900,
        contentSnapshot: 'Optimized Rust sync engine with fast-path SIMD vector clocks.',
        sha256Hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b'
      },
      {
        versionNumber: 2,
        versionId: 'cver_02',
        createdAt: '2026-08-10T14:00:00Z',
        createdBy: 'usr_sarah_chen',
        createdByName: 'Dr. Sarah Chen',
        createdByAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Added ed25519 signature checks on broadcast chunks.',
        sizeBytes: 42100,
        contentSnapshot: 'Cryptographic chunk validation.',
        sha256Hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
      },
      {
        versionNumber: 1,
        versionId: 'cver_01',
        createdAt: '2026-02-15T08:15:00Z',
        createdBy: 'usr_sarah_chen',
        createdByName: 'Dr. Sarah Chen',
        createdByAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Initial skeleton of DistributedMeshRouter in Rust.',
        sizeBytes: 28000,
        contentSnapshot: 'Initial router structure.',
        sha256Hash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d'
      }
    ],
    shares: [
      {
        id: 'csh_01',
        targetType: 'team',
        targetId: 'team_distributed',
        targetName: 'Distributed Consensus & CRDT Squad',
        role: 'editor',
        grantedBy: 'usr_sarah_chen',
        grantedAt: '2026-02-15T08:20:00Z',
        allowDownload: true,
        allowExport: true
      }
    ],
    comments: [],
    activeCollaborators: []
  },
  {
    id: 'file_q3_treasury_csv',
    workspaceId: 'ws_dynasty_core',
    folderId: 'folder_treasury_financials',
    title: 'Dynasty_Q3_2026_Treasury_Allocation_CapTable.csv',
    extension: 'csv',
    format: 'spreadsheet',
    mimeType: 'text/csv',
    sizeBytes: 18400,
    classification: 'restricted_sovereign',
    isPinned: true,
    isStarred: false,
    isArchived: false,
    isZeroKnowledgeEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM',
    ipfsCid: 'bafybeicgq7834hjkfsd782390jkshdjkfhwe',
    sha256Checksum: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    cloudBucketId: 'bucket_sovereign_eu',
    storageReplicationNodes: 5,
    departmentId: 'dept_finance',
    departmentName: 'Capital & Treasury',
    ownerId: 'usr_elena_rostova',
    ownerName: 'Elena Rostova',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    ownerDid: 'did:omni:secp256k1:0x55aa01824c90',
    createdDate: '2026-07-01T10:00:00Z',
    lastModifiedDate: '2026-08-20T02:40:00Z',
    lastModifiedById: 'usr_elena_rostova',
    lastModifiedByName: 'Elena Rostova',
    currentVersion: 4,
    accessScope: 'private',
    viewCount: 45,
    downloadCount: 8,
    summary: 'Executive treasury ledger tracking liquid capital reserve, developer grant disbursements, R&D operational budget, and multi-currency escrow balances.',
    aiTags: ['Finance', 'Treasury', 'Budget', 'CapTable', 'Escrow', 'USD', 'ETH'],
    userTags: ['Quarterly', 'Confidential', 'Audit-Ready'],
    metadata: {
      rowCount: 8,
      columnHeaders: ['Department / Division', 'Allocated (USD)', 'Spent YTD (USD)', 'Escrow Reserved (USD)', 'Burn Rate (Mo)', 'Variance %', 'Status']
    },
    content: `Department / Division,Allocated (USD),Spent YTD (USD),Escrow Reserved (USD),Burn Rate (Mo),Variance %,Status
Executive Leadership,1500000,420000,200000,35000,-4.2%,On Track
Core Engineering & Infra,3800000,1850000,450000,154000,+2.1%,Optimal
Product Strategy & UX,1200000,480000,100000,40000,-1.8%,On Track
Capital & Treasury Operations,850000,210000,1200000,17500,-5.0%,Under Budget
Global Ecosystem Grants,2500000,920000,800000,76000,+0.5%,Active
Security & Compliance,950000,340000,150000,28000,-2.4%,On Track
Total Enterprise Sovereign Mesh,10800000,4220000,2900000,350500,-1.8%,Healthy
`,
    versions: [
      {
        versionNumber: 4,
        versionId: 'fver_04',
        createdAt: '2026-08-20T02:40:00Z',
        createdBy: 'usr_elena_rostova',
        createdByName: 'Elena Rostova',
        createdByAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Reconciled August escrow reserves and updated developer grants spend.',
        sizeBytes: 18400,
        contentSnapshot: 'Updated financial table rows with latest August reconciliations.',
        sha256Hash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d'
      }
    ],
    shares: [
      {
        id: 'fsh_01',
        targetType: 'user',
        targetId: 'usr_gideon_01',
        targetName: 'Gideon Oluwalana',
        targetAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'owner',
        grantedBy: 'usr_elena_rostova',
        grantedAt: '2026-07-01T10:05:00Z',
        allowDownload: true,
        allowExport: true
      }
    ],
    comments: [],
    activeCollaborators: []
  },
  {
    id: 'file_prd_canvas_db',
    workspaceId: 'ws_dynasty_core',
    folderId: 'folder_product_design',
    title: 'OMNI_Works_Canvas_and_Relational_Databases_PRD_v2.md',
    extension: 'md',
    format: 'document',
    mimeType: 'text/markdown',
    sizeBytes: 86400,
    classification: 'internal',
    isPinned: true,
    isStarred: true,
    isArchived: false,
    isZeroKnowledgeEncrypted: false,
    ipfsCid: 'bafybeihz79234jklnsd98234yujkhsdfljkn',
    sha256Checksum: '5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b',
    cloudBucketId: 'bucket_r2_edge_cache',
    storageReplicationNodes: 3,
    departmentId: 'dept_product',
    departmentName: 'Product Strategy & UX',
    teamId: 'team_ui_experience',
    teamName: 'UI/UX & Design Systems Squad',
    ownerId: 'usr_marcus_vance',
    ownerName: 'Marcus Vance',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ownerDid: 'did:omni:secp256k1:0x44aa81920b',
    createdDate: '2026-03-01T11:00:00Z',
    lastModifiedDate: '2026-08-19T21:00:00Z',
    lastModifiedById: 'usr_marcus_vance',
    lastModifiedByName: 'Marcus Vance',
    currentVersion: 3,
    accessScope: 'workspace_members',
    viewCount: 94,
    downloadCount: 22,
    summary: 'Comprehensive PRD for OMNI collaborative canvas blocks (text, code, math, diagrams) and multi-view relational databases (Table, Kanban, Calendar, Timeline, Gallery, Form).',
    aiTags: ['PRD', 'Canvas', 'Databases', 'Relational', 'Kanban', 'Blocks', 'UX'],
    userTags: ['Phase-4', 'Design-Ready', 'Sprint-Candidate'],
    metadata: {
      wordCount: 1420,
      readingTimeMinutes: 5
    },
    content: `# Product Requirements Document: OMNI Canvas & Relational Database Subsystems

## 1. Objective
Deliver a unified, Notion/Coda-grade document experience married with Airtable-grade relational power, operating with native P2P CRDT synchronization and zero vendor lock-in.

---

## 2. Core Functional Specifications

### 2.1 Block-Based Canvas Engine
* **Block Types**:
  1. \`Paragraph\`: Rich formatted typography with markdown shortcut triggers.
  2. \`Heading (H1-H4)\`: Anchor linked with automatic Table of Contents.
  3. \`Code Block\`: Multi-language syntax highlighting with instant execution console.
  4. \`Callout\`: Visual warning, information, tip, and sovereign proof boxes.
  5. \`AI Copilot Block\`: Inline generation, text refinement, translation, and data synthesis.
  6. \`Math Equation\`: LaTeX inline and display equation renderer.
  7. \`Embedded Media\`: Video, audio, Figma, Loom, and sovereign IPFS viewers.

### 2.2 Relational Database Subsystem
* **Field Types**: Single line text, Rich markdown, Number, Currency, Select, Multi-select, Date/Time, User/Assignee, File Attachment, Formula, Rollup, Lookup, Checkbox, DID Signature.
* **Views**:
  - **Grid / Table View**: Fast spreadsheet sorting, grouping, and multi-column aggregation.
  - **Kanban Board**: Drag-and-drop state machines with WIP limits.
  - **Calendar View**: Month, week, and day scheduling with date-range bindings.
  - **Timeline / Gantt View**: Dependency mapping with critical path highlights.
  - **Gallery View**: Visual card tiles with image cover previews.

---

## 3. Performance Criteria
* Canvas initial block rendering: < 16ms (60fps).
* Relational database scrolling with 10,000 records: Virtualized DOM with zero dropped frames.
* Collaborative typing latency: < 5ms local echo, < 15ms global network propagation.
`,
    versions: [
      {
        versionNumber: 3,
        versionId: 'prdver_03',
        createdAt: '2026-08-19T21:00:00Z',
        createdBy: 'usr_marcus_vance',
        createdByName: 'Marcus Vance',
        createdByAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Finalized database view requirements and formula engine specifications.',
        sizeBytes: 86400,
        contentSnapshot: 'Detailed formula engine and relational lookup syntax.',
        sha256Hash: '5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b'
      }
    ],
    shares: [
      {
        id: 'prdsh_01',
        targetType: 'workspace_wide',
        targetName: 'All Dynasty Sovereign Members',
        role: 'commenter',
        grantedBy: 'usr_marcus_vance',
        grantedAt: '2026-03-01T11:05:00Z',
        allowDownload: true,
        allowExport: true
      }
    ],
    comments: [],
    activeCollaborators: []
  },
  {
    id: 'file_legal_master_agreement_pdf',
    workspaceId: 'ws_dynasty_core',
    folderId: 'folder_legal_contracts',
    title: 'Sovereign_Smart_Contract_Escrow_Master_Agreement_v3.pdf',
    extension: 'pdf',
    format: 'pdf',
    mimeType: 'application/pdf',
    sizeBytes: 245000,
    classification: 'confidential',
    isPinned: false,
    isStarred: false,
    isArchived: false,
    isZeroKnowledgeEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM-ECDSA-P256',
    ipfsCid: 'bafybeihp098234jklfsd902348jkhsdkfjhwe',
    sha256Checksum: '4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b',
    cloudBucketId: 'bucket_decentralized_filecoin',
    storageReplicationNodes: 12,
    departmentId: 'dept_security',
    departmentName: 'Security & Compliance',
    ownerId: 'usr_sofia_audit',
    ownerName: 'Sofia Al-Mansoor',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    ownerDid: 'did:omni:secp256k1:0x33bb89201a09',
    createdDate: '2026-04-10T14:30:00Z',
    lastModifiedDate: '2026-08-18T18:20:00Z',
    lastModifiedById: 'usr_sofia_audit',
    lastModifiedByName: 'Sofia Al-Mansoor',
    currentVersion: 2,
    accessScope: 'workspace_members',
    viewCount: 31,
    downloadCount: 12,
    summary: 'Standardized enterprise client escrow fulfillment contract governing tokenized milestones, cryptographic milestone sign-offs, and multi-signature fund releases.',
    aiTags: ['Legal', 'PDF', 'Smart-Contract', 'Escrow', 'Arbitration', 'DID-Signature'],
    userTags: ['Template', 'Legal-Approved', 'Client-Facing'],
    metadata: {
      wordCount: 920,
      readingTimeMinutes: 4
    },
    content: `# SOVEREIGN SMART CONTRACT ESCROW MASTER AGREEMENT
**Document Reference: OMNI-LEGAL-2026-ESC-0092**
**Cryptographic Hash: 4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b**

### 1. PARTIES & JURISDICTION
This Master Agreement is entered into between **Dynasty Sovereign Holdings AG** ("Provider") and the verified Counterparty holding cryptographic key credentials ("Client").

### 2. ESCROW VAULT & TOKEN DISBURSEMENT
All client milestone payments are deposited into multi-signature smart contract vaults. Funds are locked autonomously until dual-signature cryptographic milestone verification is recorded.

### 3. ARBITRATION & DISPUTE RESOLUTION
In the event of milestone dispute, decentralized staking oracles review logged CRDT git commits and deliver deterministic judgment within 72 hours.

### 4. NOTARIZED SIGNATURE ATTESTATION
- **Provider Signatory**: Gideon Oluwalana (DID: \`did:omni:secp256k1:0x71a9e821b044d1883fa012\`) [VALID]
- **Auditor Notary**: Sofia Al-Mansoor (DID: \`did:omni:secp256k1:0x33bb89201a09\`) [VALID]
- **Timestamp**: 2026-08-18T18:20:00Z | Block #4,910,239
`,
    versions: [
      {
        versionNumber: 2,
        versionId: 'lver_02',
        createdAt: '2026-08-18T18:20:00Z',
        createdBy: 'usr_sofia_audit',
        createdByName: 'Sofia Al-Mansoor',
        createdByAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Updated Section 3 decentralized dispute arbitration window to 72 hours.',
        sizeBytes: 245000,
        contentSnapshot: 'Updated legal dispute resolution terms and notary stamps.',
        sha256Hash: '4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b'
      }
    ],
    shares: [],
    comments: [],
    activeCollaborators: []
  },
  {
    id: 'file_mesh_topology_svg',
    workspaceId: 'ws_dynasty_core',
    folderId: 'folder_architecture',
    title: 'omni_sovereign_mesh_datacenter_topology.svg',
    extension: 'svg',
    format: 'image',
    mimeType: 'image/svg+xml',
    sizeBytes: 15600,
    classification: 'internal',
    isPinned: false,
    isStarred: true,
    isArchived: false,
    isZeroKnowledgeEncrypted: false,
    ipfsCid: 'bafybeicg82490dfkj23984yhjkn3298092348',
    sha256Checksum: '3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c',
    cloudBucketId: 'bucket_r2_edge_cache',
    storageReplicationNodes: 6,
    departmentId: 'dept_eng',
    departmentName: 'Core Engineering',
    ownerId: 'usr_sarah_chen',
    ownerName: 'Dr. Sarah Chen',
    ownerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    ownerDid: 'did:omni:secp256k1:0x892a019481b01c34a',
    createdDate: '2026-05-12T16:00:00Z',
    lastModifiedDate: '2026-08-15T10:00:00Z',
    lastModifiedById: 'usr_sarah_chen',
    lastModifiedByName: 'Dr. Sarah Chen',
    currentVersion: 1,
    accessScope: 'workspace_members',
    viewCount: 88,
    downloadCount: 30,
    summary: 'Vector architecture diagram depicting Frankfurt, Dublin, Ashburn, Tokyo, and Singapore mesh nodes interconnected via low-latency BGP anycast tunnels.',
    aiTags: ['Architecture', 'SVG', 'Diagram', 'Mesh', 'Datacenter', 'Network'],
    userTags: ['Visual-Asset', 'Infra', 'Topology'],
    metadata: {
      dimensions: { width: 1200, height: 600 }
    },
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <rect width="800" height="400" fill="#09090b" rx="16"/>
  <circle cx="200" cy="150" r="45" fill="#6366f1" fill-opacity="0.2" stroke="#6366f1" stroke-width="2"/>
  <text x="200" y="145" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Frankfurt (EU-1)</text>
  <text x="200" y="165" text-anchor="middle" fill="#818cf8" font-family="monospace" font-size="10">Primary Mesh</text>

  <circle cx="600" cy="150" r="45" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="2"/>
  <text x="600" y="145" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Ashburn (US-1)</text>
  <text x="600" y="165" text-anchor="middle" fill="#22d3ee" font-family="monospace" font-size="10">Sub-5ms Sync</text>

  <circle cx="400" cy="300" r="45" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
  <text x="400" y="295" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13">Tokyo (AP-1)</text>
  <text x="400" y="315" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">Edge Ingress</text>

  <path d="M 245 150 L 555 150" stroke="#6366f1" stroke-width="2" stroke-dasharray="4 4"/>
  <path d="M 230 185 L 370 265" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4"/>
  <path d="M 570 185 L 430 265" stroke="#06b6d4" stroke-width="2" stroke-dasharray="4 4"/>

  <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16">OMNI Sovereign Distributed Mesh Backbone</text>
  <text x="400" y="65" text-anchor="middle" fill="#71717a" font-family="sans-serif" font-size="12">Cryptographic CRDT synchronization with sub-5ms P2P transport</text>
</svg>`,
    versions: [
      {
        versionNumber: 1,
        versionId: 'svgver_01',
        createdAt: '2026-05-12T16:00:00Z',
        createdBy: 'usr_sarah_chen',
        createdByName: 'Dr. Sarah Chen',
        createdByAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        changeSummary: 'Initial SVG topology vector render.',
        sizeBytes: 15600,
        contentSnapshot: 'Vector SVG rendering of multi-region mesh.',
        sha256Hash: '3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c'
      }
    ],
    shares: [],
    comments: [],
    activeCollaborators: []
  }
];

export const SEED_WORKS_AI_DOC_ANALYSIS: Record<string, WorksAiDocAnalysisResult> = {
  file_omni_manifesto: {
    fileId: 'file_omni_manifesto',
    executiveSummary: 'The OMNI Sovereign Enterprise Architecture Charter establishes mathematical data sovereignty, sub-5ms collaborative CRDT synchronization, and deep multimodal AI integration for enterprise tenants without SaaS vendor lock-in.',
    keyTakeaways: [
      'Zero-knowledge enclaves ensure encryption keys are strictly held by the tenant organization with FIDO2 passkey protection.',
      'Distributed CRDT state vectors achieve 4.8ms average latency across European and North American mesh clusters.',
      'Native multimodal AI coprocessor handles document summarization, interactive Q&A, translation, and sprint action item conversion without data egress.'
    ],
    actionItems: [
      { task: 'Deploy ZK hardware key support for client guests in Phase 4', suggestedAssignee: 'Dr. Sarah Chen', priority: 'high' },
      { task: 'Benchmark Asian edge ingress nodes in Tokyo and Singapore', suggestedAssignee: 'Kai Takahashi', priority: 'medium' },
      { task: 'Prepare executive summary slides for Q4 Board of Directors meeting', suggestedAssignee: 'Marcus Vance', priority: 'low' }
    ],
    suggestedTags: ['Data-Sovereignty', 'CRDT-Mesh', 'Zero-Knowledge', 'Enterprise-Security'],
    sentiment: 'constructive',
    confidenceScore: 0.98
  }
};
