import {
  OmniWorkspaceNote,
  OmniWorkspaceTask,
  OmniWorkspaceCalendarEvent,
  OmniWorkspaceDocument,
  OmniWorkspaceFile,
  OmniWorkspaceResearchItem,
  OmniWorkspacePasswordItem,
  OmniWorkspaceReminder,
  OmniWorkspaceProject,
  OmniWorkspaceBookmarkItem,
  VaultSecurityAuditReport,
  PasswordGeneratorOptions,
  WorkspaceAiQueryResponse,
  EncryptedPasswordPayload
} from '../../types/workspace';

// ==========================================
// MOCK ENCRYPTION UTILITIES (ZERO PLAINTEXT)
// ==========================================

function pseudoEncrypt(plaintext: string, salt: string): EncryptedPasswordPayload {
  // Simulates PBKDF2 + AES-256-GCM
  const iv = Array.from({ length: 12 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
  const tag = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
  // Base64 encode an obfuscated payload to represent ciphertext
  const encoded = btoa(`CIPHER_V1:${plaintext.split('').reverse().join('')}:${salt}:${iv}`);
  return {
    cipherText: encoded,
    iv,
    salt,
    tag
  };
}

function pseudoDecrypt(payload: EncryptedPasswordPayload, masterKeyProvided: boolean): string {
  if (!masterKeyProvided) {
    throw new Error('Vault Locked: Master key authentication required.');
  }
  try {
    const raw = atob(payload.cipherText);
    const parts = raw.split(':');
    if (parts.length >= 2) {
      return parts[1].split('').reverse().join('');
    }
    return '••••••••••••';
  } catch {
    return 'Decryption Error';
  }
}

function calculatePasswordStrength(pwd: string): number {
  let score = 0;
  if (!pwd) return 0;
  if (pwd.length >= 8) score += 20;
  if (pwd.length >= 14) score += 25;
  if (pwd.length >= 18) score += 15;
  if (/[A-Z]/.test(pwd)) score += 10;
  if (/[a-z]/.test(pwd)) score += 10;
  if (/[0-9]/.test(pwd)) score += 10;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 10;
  return Math.min(100, score);
}

// ==========================================
// SEED DATA INITIALIZERS
// ==========================================

const INITIAL_PROJECTS: OmniWorkspaceProject[] = [
  {
    id: 'proj_ai_sovereign',
    title: 'OMNI Sovereign Agent Mesh',
    description: 'Decentralized local-first AI browser agents with zero telemetry leaks and peer-to-peer WASM sandboxes.',
    color: '#6366f1',
    status: 'active',
    progressPercent: 78,
    startDate: '2026-06-01',
    targetEndDate: '2026-09-30',
    tags: ['AI', 'Zero-Trust', 'Architecture'],
    pinnedTabUrls: [
      'https://developers.browser.omni.com',
      'https://arxiv.org/abs/2604.sovereign-ai'
    ],
    associatedDocIds: ['doc_agent_arch_spec', 'doc_security_threat_model'],
    associatedTaskIds: ['task_wasm_runtime', 'task_ast_linter'],
    associatedResearchIds: ['res_p2p_mesh_2026', 'res_zero_knowledge_auth'],
    leadName: 'Chief Architect'
  },
  {
    id: 'proj_crypt_ledger',
    title: 'Double-Entry Core Ledger System',
    description: 'Automated 90/10 creator revenue distribution engine with cryptographic proof-of-settlement.',
    color: '#10b981',
    status: 'active',
    progressPercent: 62,
    startDate: '2026-07-15',
    targetEndDate: '2026-10-15',
    tags: ['Finance', 'Ledger', 'Monetization'],
    pinnedTabUrls: ['https://monetize.omni.com'],
    associatedDocIds: ['doc_ledger_rfc'],
    associatedTaskIds: ['task_ledger_audit'],
    associatedResearchIds: ['res_double_entry_dist'],
    leadName: 'Fintech Lead'
  }
];

const INITIAL_NOTES: OmniWorkspaceNote[] = [
  {
    id: 'note_1',
    title: 'Sovereign Workspace Architecture Thoughts',
    content: `# Sovereign Workspace Architecture
- **Local-First Synchronization**: CRDTs over decentralized state stores.
- **Zero-Knowledge Password Vault**: Passwords must never hit backend unencrypted.
- **Unified Research Pipeline**: Web clips → Citations → AI Synthesis → Action items.
- **Contextual Copilot**: AI should summarize research, prepare task briefings, and find docs on demand.`,
    tags: ['Architecture', 'Privacy', 'OMNI'],
    folder: 'Engineering',
    isPinned: true,
    color: '#6366f1',
    createdAt: '2026-08-14 09:30',
    updatedAt: '2026-08-16 11:20',
    projectId: 'proj_ai_sovereign',
    aiSummary: 'Outlines core architectural pillars of OMNI Workspace: local-first sync, zero-knowledge vault, unified research, and contextual AI.',
    actionItems: [
      'Implement AES-256-GCM vault architecture',
      'Add APA/MLA/BibTeX citation generator',
      'Wire up daily task briefing generator'
    ]
  },
  {
    id: 'note_2',
    title: 'Weekly Standup & Sprint Goals',
    content: `### Sprint Focus
1. Complete extension developer security pipeline.
2. Launch OMNI Workspace productivity suite (Docs, Files, Passwords, Tasks).
3. Benchmark AST static analyzer performance on 5,000+ line extensions.`,
    tags: ['Planning', 'Sprint'],
    folder: 'Operations',
    isPinned: false,
    color: '#10b981',
    createdAt: '2026-08-15 10:00',
    updatedAt: '2026-08-15 10:45',
    projectId: 'proj_ai_sovereign'
  },
  {
    id: 'note_3',
    title: 'Security Guidelines for Client Secrets',
    content: `> **Rule:** Never store plaintext credentials or OAuth tokens in unencrypted local storage.
- All secrets must be enveloped in PBKDF2/AES-GCM ciphertext.
- Master session key is stored strictly in memory and cleared on lock.
- Cross-tab autofill must enforce strict origin match.`,
    tags: ['Security', 'Cryptography'],
    folder: 'Security',
    isPinned: true,
    color: '#ef4444',
    createdAt: '2026-08-16 08:00',
    updatedAt: '2026-08-16 08:30',
    aiSummary: 'Strict zero-plaintext cryptographic standard for OMNI Password Manager.'
  }
];

const INITIAL_TASKS: OmniWorkspaceTask[] = [
  {
    id: 'task_1',
    title: 'Prepare Today’s Tasks & Daily Briefing',
    description: 'Synthesize upcoming deadlines, calendar commitments, and urgent project deliverables.',
    status: 'in_progress',
    priority: 'urgent',
    dueDate: '2026-08-16',
    dueTime: '18:00',
    projectId: 'proj_ai_sovereign',
    tags: ['Daily', 'Briefing'],
    subtasks: [
      { id: 'sub_1', title: 'Review 10:00 AM Architect Sync meeting notes', isCompleted: true },
      { id: 'sub_2', title: 'Check research paper takeaways for P2P mesh', isCompleted: false },
      { id: 'sub_3', title: 'Verify zero-knowledge password vault audit alerts', isCompleted: false }
    ],
    estimatedMinutes: 45,
    createdAt: '2026-08-16 08:00'
  },
  {
    id: 'task_2',
    title: 'Audit Password Vault for Compromised Credentials',
    description: 'Run automated breach correlation and alert for reused or weak credentials.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-17',
    projectId: 'proj_ai_sovereign',
    tags: ['Security', 'Vault'],
    subtasks: [
      { id: 'sub_4', title: 'Rotate legacy GitHub PAT', isCompleted: false },
      { id: 'sub_5', title: 'Enable 2FA on secondary dev portal', isCompleted: false }
    ],
    estimatedMinutes: 30,
    createdAt: '2026-08-15 14:00'
  },
  {
    id: 'task_3',
    title: 'Summarise Saved Research Papers for Whitepaper v2',
    description: 'Run OMNI AI on recent decentralized AI and zero-knowledge identity literature.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-08-18',
    projectId: 'proj_ai_sovereign',
    tags: ['Research', 'AI'],
    subtasks: [
      { id: 'sub_6', title: 'Extract BibTeX citations', isCompleted: false },
      { id: 'sub_7', title: 'Generate executive bullet points', isCompleted: false }
    ],
    estimatedMinutes: 60,
    createdAt: '2026-08-14 11:30'
  },
  {
    id: 'task_4',
    title: 'Finalize Double-Entry Ledger RFC Document',
    description: 'Review document version history and share with core protocol reviewers.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-08-15',
    projectId: 'proj_crypt_ledger',
    tags: ['Docs', 'Finance'],
    subtasks: [],
    completedAt: '2026-08-15 17:30',
    createdAt: '2026-08-13 09:00'
  }
];

const INITIAL_CALENDAR_EVENTS: OmniWorkspaceCalendarEvent[] = [
  {
    id: 'evt_1',
    title: 'OMNI Core Architecture & Workspace Review',
    description: 'Deep dive into sovereign productivity environment, password manager encryption, and AI agents.',
    startDate: '2026-08-16',
    startTime: '10:00',
    endDate: '2026-08-16',
    endTime: '11:30',
    isAllDay: false,
    category: 'meeting',
    color: '#6366f1',
    location: 'OMNI Encrypted WebRTC Room 402',
    meetingUrl: 'https://meet.omni.com/arch-sync-402',
    attendees: ['gideon@omni.com', 'architect@omni.com', 'security@omni.com'],
    projectId: 'proj_ai_sovereign',
    reminderMinutesBefore: 15
  },
  {
    id: 'evt_2',
    title: 'Deep Work: Research Synthesis & Whitepaper',
    description: 'Time block reserved for reading decentralized agent mesh papers and drafting specs.',
    startDate: '2026-08-16',
    startTime: '14:00',
    endDate: '2026-08-16',
    endTime: '16:30',
    isAllDay: false,
    category: 'deep_work',
    color: '#8b5cf6',
    projectId: 'proj_ai_sovereign',
    reminderMinutesBefore: 10
  },
  {
    id: 'evt_3',
    title: 'Security Vault & Threat Model Audit',
    description: 'Verification of zero-plaintext client storage and cryptographic isolation against malicious iframes.',
    startDate: '2026-08-17',
    startTime: '11:00',
    endDate: '2026-08-17',
    endTime: '12:00',
    isAllDay: false,
    category: 'work',
    color: '#ef4444',
    projectId: 'proj_ai_sovereign'
  },
  {
    id: 'evt_4',
    title: 'Productivity Milestone: V1 Launch Deadline',
    description: 'Official release of OMNI Digital Workspace across global instances.',
    startDate: '2026-08-19',
    startTime: '09:00',
    endDate: '2026-08-19',
    endTime: '10:00',
    isAllDay: true,
    category: 'deadline',
    color: '#f59e0b',
    projectId: 'proj_ai_sovereign'
  }
];

const INITIAL_DOCUMENTS: OmniWorkspaceDocument[] = [
  {
    id: 'doc_agent_arch_spec',
    title: 'OMNI Autonomous Agent Mesh Specification v2.4',
    category: 'specification',
    content: `# OMNI Autonomous Agent Mesh Specification
**Status:** Approved / Active  
**Author:** Sovereign Systems Architecture Group  
**Classification:** Core System Architecture

---

## 1. Executive Summary
The OMNI Autonomous Agent Mesh provides zero-trust, local-first intelligence across browser tabs. Unlike centralized web copilots that transmit raw DOM strings to third-party servers, OMNI executes embeddings, classification, and AST synthesis inside isolated WASM runtimes on the user's sovereign hardware.

## 2. Security & Isolation Model
1. **Zero Raw Telemetry**: All prompts and DOM clips stay strictly in local memory.
2. **Double-Enveloped Encryption**: Stored context is encrypted with PBKDF2/AES-256-GCM.
3. **Sub-Resource Integrity**: Browser sandbox validates extension hashes before invocation.

## 3. High-Performance Workspace Workflows
- Instant semantic doc search across 10,000+ local documents in < 12ms.
- Daily briefing generation from calendar and pending task queues.
- Automated academic citation extraction in APA, MLA, BibTeX, and Chicago formats.`,
    tags: ['Specification', 'Architecture', 'AI', 'Security'],
    projectId: 'proj_ai_sovereign',
    wordCount: 384,
    createdAt: '2026-08-12 14:00',
    updatedAt: '2026-08-16 09:15',
    isFavorite: true,
    versions: [
      { version: 1, savedAt: '2026-08-12 14:00', author: 'Sovereign Architect', summary: 'Initial RFC draft.' },
      { version: 2, savedAt: '2026-08-14 16:30', author: 'Security Lead', summary: 'Added double-enveloped encryption specs.' },
      { version: 3, savedAt: '2026-08-16 09:15', author: 'Sovereign Architect', summary: 'Added workspace workflow benchmarks.' }
    ],
    collaborators: ['Gideon O.', 'Security Lead', 'Core Protocol Eng']
  },
  {
    id: 'doc_security_threat_model',
    title: 'Browser Password Manager Threat Model & Cryptographic Safeguards',
    category: 'security_brief',
    content: `# Password Manager Cryptographic Safeguards
**Target:** OMNI Sovereign Vault Architecture  
**Standards:** NIST SP 800-132, FIPS 140-3 Compliant

### Threat Vectors & Mitigations
1. **Unencrypted Memory Dumps**: Master key resides exclusively in transient memory with secure wipe on session lock.
2. **Malicious Extension DOM Snooping**: Password fields inject via sandboxed shadow DOM without standard event bubbling.
3. **Phishing / Cross-Origin Spoofing**: Autofill refuses to trigger unless the canonical origin exactly matches the encrypted domain record.`,
    tags: ['Security', 'Threat Model', 'Cryptography', 'Vault'],
    projectId: 'proj_ai_sovereign',
    wordCount: 220,
    createdAt: '2026-08-13 11:00',
    updatedAt: '2026-08-15 15:40',
    isFavorite: true,
    versions: [
      { version: 1, savedAt: '2026-08-13 11:00', author: 'Security Analyst', summary: 'Initial threat analysis.' }
    ]
  },
  {
    id: 'doc_ledger_rfc',
    title: 'Double-Entry Creator Monetization Settlement RFC',
    category: 'specification',
    content: `# Double-Entry Creator Monetization RFC
Describes the 90% creator / 10% platform split automated settlement ledger.
- Real-time transaction validation
- Zero-cost internal settlement
- Instant cryptographic receipts for ISVs and verified developers.`,
    tags: ['Monetization', 'Finance', 'RFC'],
    projectId: 'proj_crypt_ledger',
    wordCount: 145,
    createdAt: '2026-08-10 10:00',
    updatedAt: '2026-08-15 17:00',
    isFavorite: false,
    versions: [
      { version: 1, savedAt: '2026-08-10 10:00', author: 'Fintech Eng', summary: 'RFC proposal.' }
    ]
  }
];

const INITIAL_FILES: OmniWorkspaceFile[] = [
  {
    id: 'file_1',
    name: 'OMNI_Autonomous_Agent_Whitepaper_2026.pdf',
    sizeBytes: 2450000,
    category: 'pdf',
    extension: 'pdf',
    uploadedAt: '2026-08-14 12:00',
    folderPath: '/Research/Whitepapers',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM',
    tags: ['Whitepaper', 'Research', 'AI'],
    projectId: 'proj_ai_sovereign',
    previewSnippet: 'Comprehensive architectural analysis of sovereign web agent networks running in sandboxed WebAssembly environments.'
  },
  {
    id: 'file_2',
    name: 'vault_cryptographic_audit_certificate.pdf',
    sizeBytes: 890000,
    category: 'pdf',
    extension: 'pdf',
    uploadedAt: '2026-08-15 09:30',
    folderPath: '/Security/Audits',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM',
    tags: ['Audit', 'Security', 'FIPS'],
    projectId: 'proj_ai_sovereign',
    previewSnippet: 'Independent third-party zero-knowledge vault verification report confirming 0 plaintext leaks.'
  },
  {
    id: 'file_3',
    name: 'ledger_settlement_benchmarks.json',
    sizeBytes: 154000,
    category: 'data',
    extension: 'json',
    uploadedAt: '2026-08-16 08:15',
    folderPath: '/Finance/Benchmarks',
    isEncrypted: true,
    encryptionAlgorithm: 'AES-256-GCM',
    tags: ['Benchmarks', 'Ledger'],
    projectId: 'proj_crypt_ledger',
    previewSnippet: '{"throughput_tps": 42000, "settlement_latency_ms": 1.4, "reconciliation_errors": 0}'
  },
  {
    id: 'file_4',
    name: 'omni_browser_logo_master.svg',
    sizeBytes: 42000,
    category: 'image',
    extension: 'svg',
    uploadedAt: '2026-08-11 16:00',
    folderPath: '/Brand/Assets',
    isEncrypted: false,
    tags: ['Brand', 'Vector']
  }
];

const INITIAL_RESEARCH: OmniWorkspaceResearchItem[] = [
  {
    id: 'res_p2p_mesh_2026',
    title: 'Decentralized Peer-to-Peer Agent Orchestration in Sandboxed WebAssembly Runtimes',
    authors: ['Dr. Elena Rostova', 'Marcus Vance', 'Kenji Takahashi'],
    publicationOrSource: 'IEEE Transactions on Sovereign Distributed Systems',
    publishedYear: 2026,
    url: 'https://doi.org/10.1109/TSDS.2026.883921',
    doi: '10.1109/TSDS.2026.883921',
    category: 'academic_paper',
    abstract: 'This paper demonstrates how local browser agents can coordinate complex data workflows across peer sandboxes without broadcasting user telemetry to centralized corporate servers. Benchmark results show a 4.2x reduction in latency and mathematical immunity to remote man-in-the-middle surveillance.',
    keyTakeaways: [
      'WASM sandbox overhead is under 3.5ms for high-frequency AST inspections.',
      'Peer-to-peer gossip protocol synchronizes knowledge graphs with differential privacy.',
      'Zero-knowledge state proofs enable verifiable offline task completion.'
    ],
    citations: {
      apa: 'Rostova, E., Vance, M., & Takahashi, K. (2026). Decentralized Peer-to-Peer Agent Orchestration in Sandboxed WebAssembly Runtimes. IEEE Transactions on Sovereign Distributed Systems, 14(2), 112-128.',
      mla: 'Rostova, Elena, et al. "Decentralized Peer-to-Peer Agent Orchestration in Sandboxed WebAssembly Runtimes." IEEE Transactions on Sovereign Distributed Systems 14.2 (2026): 112-128.',
      bibtex: `@article{rostova2026decentralized,
  title={Decentralized Peer-to-Peer Agent Orchestration in Sandboxed WebAssembly Runtimes},
  author={Rostova, Elena and Vance, Marcus and Takahashi, Kenji},
  journal={IEEE Transactions on Sovereign Distributed Systems},
  volume={14},
  number={2},
  pages={112--128},
  year={2026}
}`,
      chicago: 'Rostova, Elena, Marcus Vance, and Kenji Takahashi. "Decentralized Peer-to-Peer Agent Orchestration in Sandboxed WebAssembly Runtimes." IEEE Transactions on Sovereign Distributed Systems 14, no. 2 (2026): 112-128.'
    },
    tags: ['WASM', 'P2P', 'Agent Mesh', 'Privacy'],
    projectId: 'proj_ai_sovereign',
    readingProgressPercent: 100,
    savedAt: '2026-08-14 10:15',
    aiSynthesis: 'Key foundation for OMNI Agent architecture: proves that client-side WASM agents can collaborate securely without server telemetry.'
  },
  {
    id: 'res_zero_knowledge_auth',
    title: 'Zero-Knowledge Cryptographic Vaults: Eliminating Server-Side Credential Liability',
    authors: ['Prof. Sarah Jenkins', 'Liam O’Connor'],
    publicationOrSource: 'ACM Conference on Computer and Communications Security (CCS)',
    publishedYear: 2025,
    url: 'https://doi.org/10.1145/3600000.3600123',
    doi: '10.1145/3600000.3600123',
    category: 'academic_paper',
    abstract: 'An in-depth analysis of end-to-end client encrypted credential vaults. Proves that client-derived master secrets combined with PBKDF2 (600,000 rounds) and AES-256-GCM authentication tags provide provable resistance against side-channel and memory-inspection exploits.',
    keyTakeaways: [
      'Plaintext credentials must never touch storage or IPC busses.',
      'TOTP algorithms can be computed in isolated ephemeral frames.',
      'Automated breach audits can use k-Anonymity hash prefixes to check breaches without revealing passwords.'
    ],
    citations: {
      apa: 'Jenkins, S., & O’Connor, L. (2025). Zero-Knowledge Cryptographic Vaults. In Proceedings of the ACM CCS (pp. 450-466).',
      mla: 'Jenkins, Sarah, and Liam O’Connor. "Zero-Knowledge Cryptographic Vaults." Proceedings of the ACM CCS, 2025, pp. 450-466.',
      bibtex: `@inproceedings{jenkins2025zkvault,
  title={Zero-Knowledge Cryptographic Vaults},
  author={Jenkins, Sarah and O’Connor, Liam},
  booktitle={Proceedings of the ACM CCS},
  pages={450--466},
  year={2025}
}`,
      chicago: 'Jenkins, Sarah, and Liam O’Connor. "Zero-Knowledge Cryptographic Vaults." In Proceedings of the ACM CCS, 450-466. 2025.'
    },
    tags: ['Security', 'Cryptography', 'Zero-Knowledge', 'Vault'],
    projectId: 'proj_ai_sovereign',
    readingProgressPercent: 85,
    savedAt: '2026-08-15 11:30',
    aiSynthesis: 'Directly validates our OMNI Password Manager architecture: enforces PBKDF2/AES-GCM zero-plaintext storage and k-Anonymity breach detection.'
  },
  {
    id: 'res_double_entry_dist',
    title: 'High-Throughput Cryptographic Double-Entry Accounting for Digital Economies',
    authors: ['Alexander Wright', 'Dr. Priya Nair'],
    publicationOrSource: 'Journal of Sovereign Financial Cryptography',
    publishedYear: 2026,
    url: 'https://doi.org/10.1007/s10619-026-0921',
    category: 'market_report',
    abstract: 'Investigates double-entry accounting mechanics in creator platforms. Proves that real-time 90/10 automated revenue splits with cryptographic balance reconciliation prevent float fraud and achieve sub-second creator settlement.',
    keyTakeaways: [
      'Double-entry ledgers prevent balance discrepancies at scale.',
      'Direct creator payouts improve developer retention by 310%.'
    ],
    citations: {
      apa: 'Wright, A., & Nair, P. (2026). High-Throughput Cryptographic Double-Entry Accounting. JSFC, 8(1), 45-60.',
      mla: 'Wright, Alexander, and Priya Nair. "High-Throughput Cryptographic Double-Entry Accounting." JSFC 8.1 (2026): 45-60.',
      bibtex: `@article{wright2026doubleentry,
  title={High-Throughput Cryptographic Double-Entry Accounting},
  author={Wright, Alexander and Nair, Priya},
  journal={Journal of Sovereign Financial Cryptography},
  volume={8},
  number={1},
  pages={45--60},
  year={2026}
}`,
      chicago: 'Wright, Alexander, and Priya Nair. "High-Throughput Cryptographic Double-Entry Accounting." JSFC 8, no. 1 (2026): 45-60.'
    },
    tags: ['Finance', 'Ledger', 'Monetization'],
    projectId: 'proj_crypt_ledger',
    readingProgressPercent: 90,
    savedAt: '2026-08-13 15:20'
  }
];

// ZERO PLAINTEXT PASSWORDS INITIAL SEED
const INITIAL_PASSWORDS: OmniWorkspacePasswordItem[] = [
  {
    id: 'pwd_github_work',
    title: 'GitHub Enterprise (Sovereign Core)',
    itemType: 'login',
    username: 'gideon.sovereign@omni.com',
    encryptedPassword: pseudoEncrypt('G7#x9$K!vL92mQ#@90v', 'salt_gh_8829'),
    url: 'https://github.com',
    matchingDomains: ['github.com', 'gist.github.com'],
    strengthScore: 95,
    isCompromisedInBreach: false,
    isReused: false,
    isWeak: false,
    has2Fa: true,
    twoFactorSecretEncrypted: pseudoEncrypt('JBSWY3DPEHPK3PXP', 'salt_gh_totp'),
    totpDigits: 6,
    totpPeriodSeconds: 30,
    lastRotatedDate: '2026-07-20',
    folder: 'Development',
    favorite: true
  },
  {
    id: 'pwd_aws_prod',
    title: 'AWS Cloud Infrastructure Console',
    itemType: 'login',
    username: 'admin-iam-sovereign',
    encryptedPassword: pseudoEncrypt('P@ssw0rd123!', 'salt_aws_1102'), // Deliberately weak/reused to trigger security audit
    url: 'https://aws.amazon.com',
    matchingDomains: ['aws.amazon.com', 'console.aws.amazon.com'],
    strengthScore: 40,
    isCompromisedInBreach: true,
    isReused: true,
    isWeak: true,
    has2Fa: false,
    lastRotatedDate: '2025-11-10', // > 90 days
    folder: 'Infrastructure',
    favorite: true
  },
  {
    id: 'pwd_omni_passport',
    title: 'OMNI Sovereign Identity Passport',
    itemType: 'login',
    username: 'did:omni:8839219f8a881',
    encryptedPassword: pseudoEncrypt('kX9#vL2$mP8@wQ1!zR7', 'salt_omni_pass'),
    url: 'https://passport.omni.com',
    matchingDomains: ['passport.omni.com', 'id.omni.com'],
    strengthScore: 98,
    isCompromisedInBreach: false,
    isReused: false,
    isWeak: false,
    has2Fa: true,
    twoFactorSecretEncrypted: pseudoEncrypt('HXDMVJECJJWSRB3H', 'salt_omni_totp'),
    totpDigits: 6,
    totpPeriodSeconds: 30,
    lastRotatedDate: '2026-08-01',
    folder: 'Security',
    favorite: true
  },
  {
    id: 'pwd_figma_design',
    title: 'Figma Sovereign Design Space',
    itemType: 'login',
    username: 'lead.designer@omni.com',
    encryptedPassword: pseudoEncrypt('P@ssw0rd123!', 'salt_figma_88'), // Reused password for alert demonstration
    url: 'https://figma.com',
    matchingDomains: ['figma.com'],
    strengthScore: 40,
    isCompromisedInBreach: true,
    isReused: true,
    isWeak: true,
    has2Fa: false,
    lastRotatedDate: '2025-10-04',
    folder: 'Design',
    favorite: false
  },
  {
    id: 'pwd_stripe_connect',
    title: 'Stripe Double-Entry Payout Gateway',
    itemType: 'api_credential',
    username: 'sk_live_omni_double_entry_998129',
    encryptedPassword: pseudoEncrypt('sk_live_998129381029381092381290381092', 'salt_stripe'),
    url: 'https://stripe.com',
    matchingDomains: ['stripe.com', 'dashboard.stripe.com'],
    strengthScore: 90,
    isCompromisedInBreach: false,
    isReused: false,
    isWeak: false,
    has2Fa: true,
    lastRotatedDate: '2026-07-28',
    folder: 'Finance',
    favorite: false
  }
];

const INITIAL_REMINDERS: OmniWorkspaceReminder[] = [
  {
    id: 'rem_1',
    title: '10:00 AM Architect Sync — Have research summary ready',
    dueDateTime: '2026-08-16T10:00:00',
    isCompleted: false,
    priority: 'urgent',
    projectId: 'proj_ai_sovereign',
    linkedUrl: 'https://meet.omni.com/arch-sync-402',
    createdAt: '2026-08-16 08:00'
  },
  {
    id: 'rem_2',
    title: 'Rotate compromised AWS production password',
    dueDateTime: '2026-08-16T17:00:00',
    isCompleted: false,
    priority: 'high',
    projectId: 'proj_ai_sovereign',
    createdAt: '2026-08-16 08:30'
  },
  {
    id: 'rem_3',
    title: 'Review Double-Entry RFC comments before sprint end',
    dueDateTime: '2026-08-17T12:00:00',
    isCompleted: false,
    priority: 'medium',
    projectId: 'proj_crypt_ledger',
    createdAt: '2026-08-15 16:00'
  }
];

const INITIAL_BOOKMARKS: OmniWorkspaceBookmarkItem[] = [
  {
    id: 'bm_1',
    title: 'OMNI Extension Developer Portal',
    url: 'https://developers.browser.omni.com',
    folder: 'OMNI Ecosystem',
    tags: ['Developer', 'SDK', 'Extensions'],
    isFavorite: true,
    createdAt: '2026-08-14',
    visitCount: 42,
    aiDescription: 'Official console for publishing Chrome MV3, Firefox and OMNI native extensions.'
  },
  {
    id: 'bm_2',
    title: 'IEEE Transactions on Sovereign Distributed Systems',
    url: 'https://doi.org/10.1109/TSDS.2026.883921',
    folder: 'Research',
    tags: ['Academic', 'WASM', 'Papers'],
    isFavorite: true,
    createdAt: '2026-08-14',
    visitCount: 18,
    aiDescription: 'Core peer-to-peer agent mesh research paper with benchmark data.'
  },
  {
    id: 'bm_3',
    title: 'OMNI Core Sovereign Billing & Creator Studio',
    url: 'https://monetize.omni.com',
    folder: 'OMNI Ecosystem',
    tags: ['Finance', 'Creator', 'Settlement'],
    isFavorite: false,
    createdAt: '2026-08-15',
    visitCount: 29,
    aiDescription: 'Creator monetization dashboard with double-entry accounting ledger.'
  },
  {
    id: 'bm_4',
    title: 'ACM CCS Cryptographic Vault Standards',
    url: 'https://doi.org/10.1145/3600000.3600123',
    folder: 'Research',
    tags: ['Security', 'Zero-Knowledge'],
    isFavorite: true,
    createdAt: '2026-08-15',
    visitCount: 12,
    aiDescription: 'Zero-knowledge client vault reference architecture.'
  }
];

// ==========================================
// WORKSPACE SERVICE SINGLETON
// ==========================================

export class OmniWorkspaceService {
  private static instance: OmniWorkspaceService;

  private notes: OmniWorkspaceNote[] = INITIAL_NOTES;
  private tasks: OmniWorkspaceTask[] = INITIAL_TASKS;
  private calendarEvents: OmniWorkspaceCalendarEvent[] = INITIAL_CALENDAR_EVENTS;
  private documents: OmniWorkspaceDocument[] = INITIAL_DOCUMENTS;
  private files: OmniWorkspaceFile[] = INITIAL_FILES;
  private researchItems: OmniWorkspaceResearchItem[] = INITIAL_RESEARCH;
  private passwords: OmniWorkspacePasswordItem[] = INITIAL_PASSWORDS;
  private reminders: OmniWorkspaceReminder[] = INITIAL_REMINDERS;
  private projects: OmniWorkspaceProject[] = INITIAL_PROJECTS;
  private bookmarks: OmniWorkspaceBookmarkItem[] = INITIAL_BOOKMARKS;

  // Vault Security Session State (Zero plaintext)
  private isVaultUnlocked: boolean = true; // Auto-unlocked for active master session
  private masterKeyHash: string = 'omni_master_verified_session';

  private listeners: (() => void)[] = [];

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): OmniWorkspaceService {
    if (!OmniWorkspaceService.instance) {
      OmniWorkspaceService.instance = new OmniWorkspaceService();
    }
    return OmniWorkspaceService.instance;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.saveToStorage();
    this.listeners.forEach(l => l());
  }

  private loadFromStorage() {
    try {
      const savedNotes = localStorage.getItem('omni_ws_notes');
      if (savedNotes) this.notes = JSON.parse(savedNotes);

      const savedTasks = localStorage.getItem('omni_ws_tasks');
      if (savedTasks) this.tasks = JSON.parse(savedTasks);

      const savedEvents = localStorage.getItem('omni_ws_events');
      if (savedEvents) this.calendarEvents = JSON.parse(savedEvents);

      const savedDocs = localStorage.getItem('omni_ws_docs');
      if (savedDocs) this.documents = JSON.parse(savedDocs);

      const savedFiles = localStorage.getItem('omni_ws_files');
      if (savedFiles) this.files = JSON.parse(savedFiles);

      const savedResearch = localStorage.getItem('omni_ws_research');
      if (savedResearch) this.researchItems = JSON.parse(savedResearch);

      const savedPasswords = localStorage.getItem('omni_ws_passwords');
      if (savedPasswords) this.passwords = JSON.parse(savedPasswords);

      const savedReminders = localStorage.getItem('omni_ws_reminders');
      if (savedReminders) this.reminders = JSON.parse(savedReminders);

      const savedProjects = localStorage.getItem('omni_ws_projects');
      if (savedProjects) this.projects = JSON.parse(savedProjects);

      const savedBookmarks = localStorage.getItem('omni_ws_bookmarks');
      if (savedBookmarks) this.bookmarks = JSON.parse(savedBookmarks);
    } catch {
      // fallback to initial in-memory
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('omni_ws_notes', JSON.stringify(this.notes));
      localStorage.setItem('omni_ws_tasks', JSON.stringify(this.tasks));
      localStorage.setItem('omni_ws_events', JSON.stringify(this.calendarEvents));
      localStorage.setItem('omni_ws_docs', JSON.stringify(this.documents));
      localStorage.setItem('omni_ws_files', JSON.stringify(this.files));
      localStorage.setItem('omni_ws_research', JSON.stringify(this.researchItems));
      localStorage.setItem('omni_ws_passwords', JSON.stringify(this.passwords));
      localStorage.setItem('omni_ws_reminders', JSON.stringify(this.reminders));
      localStorage.setItem('omni_ws_projects', JSON.stringify(this.projects));
      localStorage.setItem('omni_ws_bookmarks', JSON.stringify(this.bookmarks));
    } catch {
      // quota or local storage restriction
    }
  }

  // ==========================================
  // 1. NOTES METHODS
  // ==========================================
  public getNotes(): OmniWorkspaceNote[] {
    return [...this.notes];
  }

  public createNote(title: string, content: string, tags: string[] = [], folder = 'General', projectId?: string): OmniWorkspaceNote {
    const newNote: OmniWorkspaceNote = {
      id: `note_${Date.now()}`,
      title: title.trim() || 'Untitled Note',
      content,
      tags,
      folder,
      isPinned: false,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      projectId
    };
    this.notes.unshift(newNote);
    this.notify();
    return newNote;
  }

  public updateNote(id: string, updates: Partial<OmniWorkspaceNote>): OmniWorkspaceNote | null {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    this.notes[idx] = {
      ...this.notes[idx],
      ...updates,
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    this.notify();
    return this.notes[idx];
  }

  public deleteNote(id: string): boolean {
    const initialLen = this.notes.length;
    this.notes = this.notes.filter(n => n.id !== id);
    if (this.notes.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  public toggleNotePin(id: string): boolean {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.isPinned = !note.isPinned;
      this.notify();
      return note.isPinned;
    }
    return false;
  }

  // ==========================================
  // 2. TASKS METHODS
  // ==========================================
  public getTasks(): OmniWorkspaceTask[] {
    return [...this.tasks];
  }

  public createTask(taskData: Partial<OmniWorkspaceTask>): OmniWorkspaceTask {
    const newTask: OmniWorkspaceTask = {
      id: `task_${Date.now()}`,
      title: taskData.title?.trim() || 'New Task',
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      dueTime: taskData.dueTime || '17:00',
      projectId: taskData.projectId,
      tags: taskData.tags || [],
      subtasks: taskData.subtasks || [],
      estimatedMinutes: taskData.estimatedMinutes || 30,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    this.tasks.unshift(newTask);
    this.notify();
    return newTask;
  }

  public updateTask(id: string, updates: Partial<OmniWorkspaceTask>): OmniWorkspaceTask | null {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    const isNowDone = updates.status === 'done' && this.tasks[idx].status !== 'done';
    this.tasks[idx] = {
      ...this.tasks[idx],
      ...updates,
      completedAt: isNowDone ? new Date().toISOString().slice(0, 16).replace('T', ' ') : this.tasks[idx].completedAt
    };
    this.notify();
    return this.tasks[idx];
  }

  public deleteTask(id: string): boolean {
    const initialLen = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.tasks.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  public toggleSubtask(taskId: string, subtaskId: string): boolean {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const sub = task.subtasks.find(s => s.id === subtaskId);
      if (sub) {
        sub.isCompleted = !sub.isCompleted;
        this.notify();
        return sub.isCompleted;
      }
    }
    return false;
  }

  // ==========================================
  // 3. CALENDAR METHODS
  // ==========================================
  public getCalendarEvents(): OmniWorkspaceCalendarEvent[] {
    return [...this.calendarEvents];
  }

  public createCalendarEvent(eventData: Partial<OmniWorkspaceCalendarEvent>): OmniWorkspaceCalendarEvent {
    const newEvt: OmniWorkspaceCalendarEvent = {
      id: `evt_${Date.now()}`,
      title: eventData.title?.trim() || 'New Calendar Event',
      description: eventData.description || '',
      startDate: eventData.startDate || new Date().toISOString().split('T')[0],
      startTime: eventData.startTime || '09:00',
      endDate: eventData.endDate || eventData.startDate || new Date().toISOString().split('T')[0],
      endTime: eventData.endTime || '10:00',
      isAllDay: !!eventData.isAllDay,
      category: eventData.category || 'work',
      color: eventData.color || '#6366f1',
      location: eventData.location,
      meetingUrl: eventData.meetingUrl,
      attendees: eventData.attendees || [],
      projectId: eventData.projectId,
      linkedTaskId: eventData.linkedTaskId,
      reminderMinutesBefore: eventData.reminderMinutesBefore || 15
    };
    this.calendarEvents.push(newEvt);
    this.notify();
    return newEvt;
  }

  public updateCalendarEvent(id: string, updates: Partial<OmniWorkspaceCalendarEvent>): OmniWorkspaceCalendarEvent | null {
    const idx = this.calendarEvents.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.calendarEvents[idx] = {
      ...this.calendarEvents[idx],
      ...updates
    };
    this.notify();
    return this.calendarEvents[idx];
  }

  public deleteCalendarEvent(id: string): boolean {
    const initialLen = this.calendarEvents.length;
    this.calendarEvents = this.calendarEvents.filter(e => e.id !== id);
    if (this.calendarEvents.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // 4. DOCUMENTS METHODS
  // ==========================================
  public getDocuments(): OmniWorkspaceDocument[] {
    return [...this.documents];
  }

  public createDocument(docData: Partial<OmniWorkspaceDocument>): OmniWorkspaceDocument {
    const words = (docData.content || '').trim().split(/\s+/).filter(Boolean).length;
    const newDoc: OmniWorkspaceDocument = {
      id: `doc_${Date.now()}`,
      title: docData.title?.trim() || 'Untitled Document',
      category: docData.category || 'general',
      content: docData.content || '# New Document\n\nStart writing your ideas...',
      tags: docData.tags || [],
      projectId: docData.projectId,
      wordCount: words,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isFavorite: false,
      versions: [
        {
          version: 1,
          savedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          author: 'You',
          summary: 'Initial document creation.'
        }
      ],
      collaborators: ['You']
    };
    this.documents.unshift(newDoc);
    this.notify();
    return newDoc;
  }

  public updateDocument(id: string, updates: Partial<OmniWorkspaceDocument>): OmniWorkspaceDocument | null {
    const idx = this.documents.findIndex(d => d.id === id);
    if (idx === -1) return null;
    const current = this.documents[idx];
    const newContent = updates.content !== undefined ? updates.content : current.content;
    const words = newContent.trim().split(/\s+/).filter(Boolean).length;

    let updatedVersions = current.versions;
    if (updates.content && updates.content !== current.content) {
      updatedVersions = [
        ...current.versions,
        {
          version: current.versions.length + 1,
          savedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          author: 'You',
          summary: 'Updated content edit.'
        }
      ];
    }

    this.documents[idx] = {
      ...current,
      ...updates,
      wordCount: words,
      versions: updatedVersions,
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    this.notify();
    return this.documents[idx];
  }

  public deleteDocument(id: string): boolean {
    const initialLen = this.documents.length;
    this.documents = this.documents.filter(d => d.id !== id);
    if (this.documents.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // 5. FILES METHODS
  // ==========================================
  public getFiles(): OmniWorkspaceFile[] {
    return [...this.files];
  }

  public addFile(fileData: Partial<OmniWorkspaceFile>): OmniWorkspaceFile {
    const newFile: OmniWorkspaceFile = {
      id: `file_${Date.now()}`,
      name: fileData.name || 'unnamed_file.dat',
      sizeBytes: fileData.sizeBytes || 102400,
      category: fileData.category || 'document',
      extension: fileData.extension || (fileData.name?.split('.').pop() || 'dat'),
      uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      folderPath: fileData.folderPath || '/Root',
      isEncrypted: fileData.isEncrypted !== undefined ? fileData.isEncrypted : true,
      encryptionAlgorithm: fileData.isEncrypted !== false ? 'AES-256-GCM' : undefined,
      tags: fileData.tags || [],
      projectId: fileData.projectId,
      previewSnippet: fileData.previewSnippet
    };
    this.files.unshift(newFile);
    this.notify();
    return newFile;
  }

  public deleteFile(id: string): boolean {
    const initialLen = this.files.length;
    this.files = this.files.filter(f => f.id !== id);
    if (this.files.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // 6. RESEARCH LIBRARY METHODS
  // ==========================================
  public getResearchItems(): OmniWorkspaceResearchItem[] {
    return [...this.researchItems];
  }

  public addResearchItem(itemData: Partial<OmniWorkspaceResearchItem>): OmniWorkspaceResearchItem {
    const authors = itemData.authors?.length ? itemData.authors : ['Unknown Researcher'];
    const title = itemData.title?.trim() || 'Untitled Research Finding';
    const year = itemData.publishedYear || new Date().getFullYear();
    const source = itemData.publicationOrSource || 'OMNI Web Clip';

    const apa = `${authors.join(', ')} (${year}). ${title}. ${source}.`;
    const mla = `${authors[0]}, et al. "${title}." ${source}, ${year}.`;
    const bibtex = `@article{omni_${Date.now()},\n  title={${title}},\n  author={${authors.join(' and ')}},\n  journal={${source}},\n  year={${year}}\n}`;
    const chicago = `${authors.join(', ')}. "${title}." ${source} (${year}).`;

    const newItem: OmniWorkspaceResearchItem = {
      id: `res_${Date.now()}`,
      title,
      authors,
      publicationOrSource: source,
      publishedYear: year,
      url: itemData.url || 'https://omni.com/research',
      doi: itemData.doi,
      category: itemData.category || 'web_clip',
      abstract: itemData.abstract || 'Saved research capture from sovereign browser session.',
      keyTakeaways: itemData.keyTakeaways?.length ? itemData.keyTakeaways : ['Key finding captured during research session.'],
      citations: {
        apa,
        mla,
        bibtex,
        chicago
      },
      tags: itemData.tags || ['Research'],
      projectId: itemData.projectId,
      readingProgressPercent: itemData.readingProgressPercent || 0,
      savedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      aiSynthesis: itemData.aiSynthesis
    };

    this.researchItems.unshift(newItem);
    this.notify();
    return newItem;
  }

  public updateResearchItem(id: string, updates: Partial<OmniWorkspaceResearchItem>): OmniWorkspaceResearchItem | null {
    const idx = this.researchItems.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.researchItems[idx] = {
      ...this.researchItems[idx],
      ...updates
    };
    this.notify();
    return this.researchItems[idx];
  }

  public deleteResearchItem(id: string): boolean {
    const initialLen = this.researchItems.length;
    this.researchItems = this.researchItems.filter(r => r.id !== id);
    if (this.researchItems.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // 7. PASSWORD MANAGER METHODS (STRICT ZERO PLAINTEXT)
  // ==========================================
  public getPasswords(): OmniWorkspacePasswordItem[] {
    // Returns encrypted items. Zero plaintext passwords exposed in list.
    return [...this.passwords];
  }

  public isVaultSessionUnlocked(): boolean {
    return this.isVaultUnlocked;
  }

  public lockVault() {
    this.isVaultUnlocked = false;
    this.notify();
  }

  public unlockVault(pinOrMasterKey: string): boolean {
    // In production, PBKDF2 derives key and validates HMAC auth tag
    if (pinOrMasterKey.length >= 4) {
      this.isVaultUnlocked = true;
      this.notify();
      return true;
    }
    return false;
  }

  public decryptPasswordForReveal(item: OmniWorkspacePasswordItem): string {
    if (!this.isVaultUnlocked) {
      throw new Error('Vault Locked: Master authentication required.');
    }
    return pseudoDecrypt(item.encryptedPassword, true);
  }

  public decryptTotpSecret(item: OmniWorkspacePasswordItem): string | null {
    if (!this.isVaultUnlocked || !item.twoFactorSecretEncrypted) return null;
    try {
      if (typeof item.twoFactorSecretEncrypted === 'string') {
        return pseudoDecrypt({
          cipherText: item.twoFactorSecretEncrypted,
          iv: '00',
          salt: '00',
          tag: '00'
        }, true);
      }
      return pseudoDecrypt(item.twoFactorSecretEncrypted, true);
    } catch {
      return 'JBSWY3DPEHPK3PXP';
    }
  }

  public generateTotpToken(item: OmniWorkspacePasswordItem): { code: string; secondsRemaining: number } {
    // Generates simulated rotating 6-digit TOTP code synced to 30-second epoch clock
    const nowSec = Math.floor(Date.now() / 1000);
    const period = item.totpPeriodSeconds || 30;
    const epochStep = Math.floor(nowSec / period);
    const secondsRemaining = period - (nowSec % period);

    // Simple deterministic hash for demo token
    let hash = 0;
    const str = `${item.id}_${epochStep}`;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const code = Math.abs(hash % 900000 + 100000).toString();
    return { code, secondsRemaining };
  }

  public generatePassword(options: PasswordGeneratorOptions): { password: string; strengthScore: number; entropyBits: number } {
    if (options.mode === 'passphrase') {
      const words = [
        'quantum', 'sovereign', 'cascade', 'orbital', 'zenith', 'vector', 'prism', 'cipher',
        'nebula', 'horizon', 'matrix', 'echo', 'stellar', 'plasma', 'vortex', 'falcon',
        'aurora', 'nexus', 'shield', 'beacon', 'ember', 'glacier', 'mirage', 'solstice'
      ];
      const count = options.wordCount || 4;
      const selected: string[] = [];
      for (let i = 0; i < count; i++) {
        const randIndex = Math.floor(Math.random() * words.length);
        const w = words[randIndex];
        selected.push(i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w);
      }
      const sep = '-';
      const num = Math.floor(Math.random() * 90 + 10);
      const generated = `${selected.join(sep)}${sep}${num}!`;
      const strength = calculatePasswordStrength(generated);
      const entropy = Math.round(count * Math.log2(words.length) + 12);
      return { password: generated, strengthScore: strength, entropyBits: entropy };
    }

    let charset = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (options.includeUppercase) charset += upper;
    if (options.includeLowercase) charset += lower;
    if (options.includeNumbers) charset += nums;
    if (options.includeSymbols) charset += symbols;

    if (options.avoidAmbiguous) {
      charset = charset.replace(/[1lI0O8B]/g, '');
    }

    if (!charset) charset = lower + nums;

    let res = '';
    for (let i = 0; i < options.length; i++) {
      const idx = Math.floor(Math.random() * charset.length);
      res += charset[idx];
    }

    const strength = calculatePasswordStrength(res);
    const entropy = Math.round(options.length * Math.log2(charset.length));
    return { password: res, strengthScore: strength, entropyBits: entropy };
  }

  public savePasswordItem(
    title: string,
    username: string,
    plainPasswordToEncrypt: string,
    url: string,
    folder = 'General',
    itemType: OmniWorkspacePasswordItem['itemType'] = 'login',
    twoFactorSecret?: string
  ): OmniWorkspacePasswordItem {
    const salt = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    const encrypted = pseudoEncrypt(plainPasswordToEncrypt, salt);
    const strength = calculatePasswordStrength(plainPasswordToEncrypt);
    const isWeak = strength < 60;
    const isReused = this.passwords.some(p => {
      try {
        const decrypted = pseudoDecrypt(p.encryptedPassword, true);
        return decrypted === plainPasswordToEncrypt;
      } catch {
        return false;
      }
    });

    let domain = 'localhost';
    try {
      domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    } catch {
      domain = url;
    }

    const newItem: OmniWorkspacePasswordItem = {
      id: `pwd_${Date.now()}`,
      title: title.trim() || domain,
      itemType,
      username: username.trim(),
      encryptedPassword: encrypted,
      url,
      matchingDomains: [domain],
      strengthScore: strength,
      isCompromisedInBreach: false,
      isReused,
      isWeak,
      has2Fa: !!twoFactorSecret,
      twoFactorSecretEncrypted: twoFactorSecret ? pseudoEncrypt(twoFactorSecret, salt).cipherText : undefined,
      totpDigits: 6,
      totpPeriodSeconds: 30,
      lastRotatedDate: new Date().toISOString().split('T')[0],
      folder,
      favorite: false
    };

    this.passwords.unshift(newItem);
    this.notify();
    return newItem;
  }

  public updatePasswordItem(
    id: string,
    updates: {
      title?: string;
      username?: string;
      newPlainPasswordToEncrypt?: string;
      url?: string;
      folder?: string;
      twoFactorSecret?: string;
    }
  ): OmniWorkspacePasswordItem | null {
    const idx = this.passwords.findIndex(p => p.id === id);
    if (idx === -1) return null;

    const current = this.passwords[idx];
    let newEncrypted = current.encryptedPassword;
    let newStrength = current.strengthScore;
    let isWeak = current.isWeak;

    if (updates.newPlainPasswordToEncrypt) {
      const salt = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
      newEncrypted = pseudoEncrypt(updates.newPlainPasswordToEncrypt, salt);
      newStrength = calculatePasswordStrength(updates.newPlainPasswordToEncrypt);
      isWeak = newStrength < 60;
    }

    this.passwords[idx] = {
      ...current,
      title: updates.title !== undefined ? updates.title : current.title,
      username: updates.username !== undefined ? updates.username : current.username,
      encryptedPassword: newEncrypted,
      strengthScore: newStrength,
      isWeak,
      isCompromisedInBreach: updates.newPlainPasswordToEncrypt ? false : current.isCompromisedInBreach,
      lastRotatedDate: updates.newPlainPasswordToEncrypt ? new Date().toISOString().split('T')[0] : current.lastRotatedDate,
      url: updates.url !== undefined ? updates.url : current.url,
      folder: updates.folder !== undefined ? updates.folder : current.folder
    };

    this.notify();
    return this.passwords[idx];
  }

  public deletePasswordItem(id: string): boolean {
    const initialLen = this.passwords.length;
    this.passwords = this.passwords.filter(p => p.id !== id);
    if (this.passwords.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  public getVaultSecurityAudit(): VaultSecurityAuditReport {
    const total = this.passwords.length;
    let weakCount = 0;
    let reusedCount = 0;
    let breachCount = 0;
    let missing2Fa = 0;
    let oldCount = 0;

    const criticalAlerts: VaultSecurityAuditReport['criticalAlerts'] = [];

    const now = new Date();

    this.passwords.forEach(item => {
      if (item.isWeak || item.strengthScore < 50) {
        weakCount++;
        criticalAlerts.push({
          id: `alert_weak_${item.id}`,
          itemId: item.id,
          title: item.title,
          severity: 'warning',
          message: `Weak password strength (${item.strengthScore}/100). Susceptible to automated brute force.`,
          recommendation: 'Generate a 18+ character password with high entropy.'
        });
      }

      if (item.isReused) {
        reusedCount++;
        criticalAlerts.push({
          id: `alert_reuse_${item.id}`,
          itemId: item.id,
          title: item.title,
          severity: 'critical',
          message: 'Password reuse detected across multiple services. Compromise of one compromises all.',
          recommendation: 'Replace with unique isolated cryptographic credentials.'
        });
      }

      if (item.isCompromisedInBreach) {
        breachCount++;
        criticalAlerts.push({
          id: `alert_breach_${item.id}`,
          itemId: item.id,
          title: item.title,
          severity: 'critical',
          message: 'Found in historical dark web breach databases (k-Anonymity match).',
          recommendation: 'Rotate credential immediately and invalidate active sessions.'
        });
      }

      if (!item.has2Fa && item.itemType === 'login') {
        missing2Fa++;
      }

      // Check if older than 90 days
      const rotated = new Date(item.lastRotatedDate);
      const diffDays = Math.floor((now.getTime() - rotated.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 90) {
        oldCount++;
      }
    });

    let overallScore = 100;
    overallScore -= weakCount * 15;
    overallScore -= reusedCount * 20;
    overallScore -= breachCount * 25;
    overallScore -= (missing2Fa / (total || 1)) * 10;
    overallScore = Math.max(0, Math.min(100, overallScore));

    return {
      totalItems: total,
      overallScore,
      weakPasswordsCount: weakCount,
      reusedPasswordsCount: reusedCount,
      compromisedBreachCount: breachCount,
      missing2FaCount: missing2Fa,
      oldPasswordsCount: oldCount,
      criticalAlerts
    };
  }

  // ==========================================
  // 8. REMINDERS METHODS
  // ==========================================
  public getReminders(): OmniWorkspaceReminder[] {
    return [...this.reminders];
  }

  public createReminder(title: string, dueDateTime: string, priority: OmniWorkspaceReminder['priority'] = 'medium', projectId?: string): OmniWorkspaceReminder {
    const newRem: OmniWorkspaceReminder = {
      id: `rem_${Date.now()}`,
      title: title.trim(),
      dueDateTime,
      isCompleted: false,
      priority,
      projectId,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    this.reminders.unshift(newRem);
    this.notify();
    return newRem;
  }

  public toggleReminderComplete(id: string): boolean {
    const rem = this.reminders.find(r => r.id === id);
    if (rem) {
      rem.isCompleted = !rem.isCompleted;
      this.notify();
      return rem.isCompleted;
    }
    return false;
  }

  public deleteReminder(id: string): boolean {
    const initialLen = this.reminders.length;
    this.reminders = this.reminders.filter(r => r.id !== id);
    if (this.reminders.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // 9. PROJECTS METHODS
  // ==========================================
  public getProjects(): OmniWorkspaceProject[] {
    return [...this.projects];
  }

  public createProject(projectData: Partial<OmniWorkspaceProject>): OmniWorkspaceProject {
    const newProj: OmniWorkspaceProject = {
      id: `proj_${Date.now()}`,
      title: projectData.title?.trim() || 'New Sovereign Project',
      description: projectData.description || 'Collaborative workspace space.',
      color: projectData.color || '#6366f1',
      status: projectData.status || 'active',
      progressPercent: projectData.progressPercent || 0,
      startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      targetEndDate: projectData.targetEndDate || '2026-12-31',
      tags: projectData.tags || ['Project'],
      pinnedTabUrls: projectData.pinnedTabUrls || [],
      associatedDocIds: projectData.associatedDocIds || [],
      associatedTaskIds: projectData.associatedTaskIds || [],
      associatedResearchIds: projectData.associatedResearchIds || [],
      leadName: projectData.leadName || 'You'
    };
    this.projects.push(newProj);
    this.notify();
    return newProj;
  }

  public updateProject(id: string, updates: Partial<OmniWorkspaceProject>): OmniWorkspaceProject | null {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.projects[idx] = {
      ...this.projects[idx],
      ...updates
    };
    this.notify();
    return this.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    if (this.projects.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // 10. BOOKMARKS METHODS
  // ==========================================
  public getBookmarks(): OmniWorkspaceBookmarkItem[] {
    return [...this.bookmarks];
  }

  public addBookmark(title: string, url: string, folder = 'Bookmarks', tags: string[] = []): OmniWorkspaceBookmarkItem {
    const newBm: OmniWorkspaceBookmarkItem = {
      id: `bm_${Date.now()}`,
      title: title.trim() || url,
      url: url.trim(),
      folder,
      tags,
      isFavorite: false,
      createdAt: new Date().toISOString().split('T')[0],
      visitCount: 1,
      aiDescription: `Saved resource: ${title}`
    };
    this.bookmarks.unshift(newBm);
    this.notify();
    return newBm;
  }

  public deleteBookmark(id: string): boolean {
    const initialLen = this.bookmarks.length;
    this.bookmarks = this.bookmarks.filter(b => b.id !== id);
    if (this.bookmarks.length !== initialLen) {
      this.notify();
      return true;
    }
    return false;
  }

  // ==========================================
  // OMNI AI INTEGRATION RESOLVER
  // ==========================================

  public askWorkspaceAi(query: string): WorkspaceAiQueryResponse {
    const q = query.trim().toLowerCase();

    // 1. "Summarise my saved research."
    if (q.includes('summarise') && (q.includes('research') || q.includes('papers') || q.includes('saved'))) {
      const research = this.researchItems;
      const papersCount = research.length;
      const totalTakeaways = research.flatMap(r => r.keyTakeaways);

      const summary = `### 📑 Executive Synthesis: Saved Research Library (${papersCount} Publications)

**Key Academic Consensus & Findings:**
1. **Decentralized WASM Runtime Execution:** Sandboxed WebAssembly agents exhibit under 3.5ms execution overhead, eliminating the need to transmit raw browser DOM and telemetry to cloud servers (*Rostova et al., 2026*).
2. **Zero-Knowledge Cryptographic Vaults:** Provable security requires client-side PBKDF2 (600k rounds) with AES-256-GCM authentication tags and k-Anonymity breach checking (*Jenkins & O’Connor, 2025*).
3. **Double-Entry Settlement:** Automated 90/10 creator splits with continuous cryptographic verification reduce settlement latency to under 1.4ms (*Wright & Nair, 2026*).

**Actionable Recommendations for OMNI Workspace:**
- Enforce strict origin matching across all password autofill delegates.
- Generate automated BibTeX and APA citations for all newly clipped web resources.
- Time-block research deep work slots directly on the calendar.`;

      return {
        queryType: 'summarise_research',
        title: 'Synthesis of Saved Academic & Web Research',
        summaryMarkdown: summary,
        relevantItemIds: research.map(r => r.id),
        suggestedActions: [
          { label: 'Export Citations as BibTeX', actionType: 'export_citations' },
          { label: 'Create Research Synthesis Document', actionType: 'create_doc_from_research' },
          { label: 'Schedule Research Review Time-Block', actionType: 'schedule_deep_work' }
        ]
      };
    }

    // 2. "Find my document."
    if (q.includes('find') && (q.includes('document') || q.includes('doc') || q.includes('file') || q.includes('spec'))) {
      const docs = this.documents;
      const files = this.files;
      const notes = this.notes;

      // Extract search term if any
      const searchTerms = q.replace(/find|my|document|doc|file|please/g, '').trim();

      const matchedDocs = searchTerms
        ? docs.filter(d => d.title.toLowerCase().includes(searchTerms) || d.content.toLowerCase().includes(searchTerms))
        : docs;

      const summary = `### 🔍 Document & Knowledge Retrieval Index

Found **${matchedDocs.length} documents**, **${files.length} encrypted vault files**, and **${notes.length} notes** in your sovereign workspace:

#### 📄 High-Relevance Documents:
${matchedDocs.map(d => `- **[${d.title}](#doc_${d.id})** (${d.category.toUpperCase()}) — ${d.wordCount} words, updated ${d.updatedAt}`).join('\n')}

#### 📁 Sovereign Encrypted Files:
${files.map(f => `- **${f.name}** (${(f.sizeBytes / 1024 / 1024).toFixed(2)} MB, ${f.encryptionAlgorithm}) in \`${f.folderPath}\``).join('\n')}

#### 📝 Related Pinned Notes:
${notes.filter(n => n.isPinned).map(n => `- **${n.title}** (\`${n.folder}\`)`).join('\n')}`;

      return {
        queryType: 'find_document',
        title: 'Document & Knowledge Graph Search Results',
        summaryMarkdown: summary,
        relevantItemIds: matchedDocs.map(d => d.id),
        suggestedActions: [
          { label: 'Open Agent Architecture Spec v2.4', actionType: 'open_doc', payload: 'doc_agent_arch_spec' },
          { label: 'Open Password Manager Threat Model', actionType: 'open_doc', payload: 'doc_security_threat_model' },
          { label: 'Create New Document', actionType: 'new_doc' }
        ]
      };
    }

    // 3. "Prepare today's tasks."
    if (q.includes('prepare') && (q.includes('task') || q.includes('today') || q.includes('schedule') || q.includes('briefing'))) {
      const today = '2026-08-16';
      const todayEvents = this.calendarEvents.filter(e => e.startDate === today);
      const pendingTasks = this.tasks.filter(t => t.status !== 'done');
      const urgentReminders = this.reminders.filter(r => !r.isCompleted);
      const audit = this.getVaultSecurityAudit();

      const summary = `### ☀️ OMNI Daily Briefing & Action Plan (${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })})

#### 📅 Scheduled Calendar Commitments:
${todayEvents.map(e => `- **${e.startTime} - ${e.endTime}**: ${e.title} *(${e.location || 'Local'})*`).join('\n')}

#### ⚡ High-Priority Task Pipeline:
${pendingTasks.map((t, idx) => `${idx + 1}. **[${t.priority.toUpperCase()}]** ${t.title} (Est: ${t.estimatedMinutes}m, Status: \`${t.status}\`)`).join('\n')}

#### 🚨 Critical Security & Vault Actions:
- **${audit.criticalAlerts.length} security alerts detected**: Immediate password rotation needed for \`AWS Cloud Infrastructure\` (${audit.compromisedBreachCount} breach match, ${audit.reusedPasswordsCount} reused credentials).

#### ⏰ Urgent Reminders:
${urgentReminders.map(r => `- ${r.title} *(Due: ${r.dueDateTime.split('T')[1]?.slice(0, 5) || 'Today'})*`).join('\n')}`;

      return {
        queryType: 'prepare_tasks',
        title: 'Daily Task Briefing & Calendar Schedule',
        summaryMarkdown: summary,
        relevantItemIds: pendingTasks.map(t => t.id),
        suggestedActions: [
          { label: 'Start 10:00 AM Architect Sync', actionType: 'join_meeting', payload: 'https://meet.omni.com/arch-sync-402' },
          { label: 'Launch Security Vault Audit', actionType: 'open_vault_audit' },
          { label: 'Mark Top Task In-Progress', actionType: 'start_task', payload: pendingTasks[0]?.id }
        ]
      };
    }

    // Default conversational helper
    return {
      queryType: 'general',
      title: 'OMNI Sovereign Workspace Copilot',
      summaryMarkdown: `I analyzed your query: *"${query}"*.

You can ask me to:
- **"Summarise my saved research."** — Synthesizes all academic literature, web clips, and BibTeX citations.
- **"Find my document."** — Fast semantic index scan over specs, notes, and encrypted vault files.
- **"Prepare today's tasks."** — Compiles an executive morning briefing integrating calendar events, priority tasks, and security alerts.`,
      suggestedActions: [
        { label: 'Summarise saved research', actionType: 'ask_summarise_research' },
        { label: 'Find my document', actionType: 'ask_find_document' },
        { label: 'Prepare today’s tasks', actionType: 'ask_prepare_tasks' }
      ]
    };
  }
}

export const omniWorkspaceService = OmniWorkspaceService.getInstance();
