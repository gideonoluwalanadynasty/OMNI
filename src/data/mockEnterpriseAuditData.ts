import {
  EnterpriseManagedDevice,
  EnterprisePolicyProfile,
  EnterpriseUserGroup,
  EnterpriseInternalPortalApp,
  EnterpriseTrainingModule,
  SecurityAuditResult,
  PerformanceAuditMetric,
  EnterpriseOrgSector
} from '../types/enterprise_audit';

export const INITIAL_ENTERPRISE_DEVICES: EnterpriseManagedDevice[] = [
  {
    id: 'dev-001',
    name: 'Ops-SecOps-M3Max',
    assignedUser: 'Elena Rostova',
    userEmail: 'elena.rostova@defense.gov.omni',
    department: 'Cyber Threat Intelligence',
    deviceType: 'desktop_macos',
    osVersion: 'macOS 15.6 Sequoia',
    omniBrowserVersion: 'v4.2.0-enterprise-pqc',
    serialNumber: 'OMNI-SEC-99281-A',
    ipAddress: '10.240.18.42',
    lastSyncTimestamp: 'Just now',
    complianceStatus: 'compliant',
    appliedPolicyProfile: 'gov-fedramp-high',
    hardwareSecurityModule: true,
    pqcKyberActive: true,
    isRemoteLocked: false
  },
  {
    id: 'dev-002',
    name: 'Quant-Terminal-Dell',
    assignedUser: 'Marcus Vance',
    userEmail: 'm.vance@vanguard-holdings.com',
    department: 'Algorithmic Trading',
    deviceType: 'desktop_windows',
    osVersion: 'Windows 11 Enterprise (24H2)',
    omniBrowserVersion: 'v4.2.0-enterprise-pqc',
    serialNumber: 'OMNI-CORP-48192-W',
    ipAddress: '172.16.4.102',
    lastSyncTimestamp: '2 mins ago',
    complianceStatus: 'compliant',
    appliedPolicyProfile: 'corp-zero-trust',
    hardwareSecurityModule: true,
    pqcKyberActive: true,
    isRemoteLocked: false
  },
  {
    id: 'dev-003',
    name: 'Lab-Chromebook-84',
    assignedUser: 'Sarah Lin (Student ID: 9482)',
    userEmail: 'slin9482@stem-academy.edu',
    department: 'AP Quantum Computing Lab',
    deviceType: 'desktop_linux',
    osVersion: 'Sovereign Linux 6.10',
    omniBrowserVersion: 'v4.2.0-edu-locked',
    serialNumber: 'OMNI-EDU-10492-L',
    ipAddress: '192.168.10.84',
    lastSyncTimestamp: '5 mins ago',
    complianceStatus: 'compliant',
    appliedPolicyProfile: 'school-safe-net',
    hardwareSecurityModule: false,
    pqcKyberActive: true,
    isRemoteLocked: false
  },
  {
    id: 'dev-004',
    name: 'Field-Humanitarian-Tablet',
    assignedUser: 'Dr. Tariq Al-Mansoor',
    userEmail: 'tariq.m@refugee-aid.ngo.int',
    department: 'Sub-Saharan Emergency Ops',
    deviceType: 'mobile_android',
    osVersion: 'GrapheneOS 15 (Hardened)',
    omniBrowserVersion: 'v4.2.0-ngo-airgap',
    serialNumber: 'OMNI-NGO-55102-G',
    ipAddress: '100.64.92.11',
    lastSyncTimestamp: '12 mins ago',
    complianceStatus: 'compliant',
    appliedPolicyProfile: 'ngo-human-rights',
    hardwareSecurityModule: true,
    pqcKyberActive: true,
    isRemoteLocked: false
  },
  {
    id: 'dev-005',
    name: 'BYOD-Contractor-Thinkpad',
    assignedUser: 'Alex Rivera',
    userEmail: 'a.rivera.contractor@corp-client.com',
    department: 'External Audits',
    deviceType: 'desktop_windows',
    osVersion: 'Windows 11 Pro',
    omniBrowserVersion: 'v4.1.8-standard',
    serialNumber: 'BYOD-UNK-88410',
    ipAddress: '192.168.1.144',
    lastSyncTimestamp: '1 hour ago',
    complianceStatus: 'warning',
    appliedPolicyProfile: 'corp-zero-trust',
    hardwareSecurityModule: false,
    pqcKyberActive: false,
    isRemoteLocked: false
  }
];

export const INITIAL_POLICY_PROFILES: EnterprisePolicyProfile[] = [
  {
    id: 'corp-zero-trust',
    name: 'Enterprise Corporate Zero-Trust Baseline',
    targetSector: 'company',
    description: 'Enforces strict Data Loss Prevention (DLP), AI secret masking, hardware token MFA, and dynamic ephemeral browser sessions.',
    isDefault: true,
    assignedDeviceCount: 840,
    lastModified: '2026-08-15',
    rules: [
      {
        id: 'r-dlp-1',
        category: 'dlp',
        name: 'Sensitive RegEx & Code Redaction',
        description: 'Blocks pasting of JWTs, private keys, credit cards, and customer PII into unverified domains.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      },
      {
        id: 'r-ai-1',
        category: 'ai_governance',
        name: 'AI Prompt Data Exfiltration Guard',
        description: 'Auto-redacts proprietary source code and intellectual property before routing to external LLMs.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      },
      {
        id: 'r-ext-1',
        category: 'extensions',
        name: 'Manifest V3 Whitelist Enforcement',
        description: 'Disables unverified third-party store extensions. Only IT-approved signed sovereign extensions permitted.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: ['Bitwarden Sovereign', 'uBlock OMNI', 'DevTools Hardened']
      },
      {
        id: 'r-net-1',
        category: 'network',
        name: 'Enforce Kyber-1024 PQC TLS',
        description: 'Demotes connections without post-quantum key encapsulation to quarantine mode.',
        enforcementLevel: 'warn_with_justification',
        isEnabled: true,
        value: true
      }
    ]
  },
  {
    id: 'gov-fedramp-high',
    name: 'Government Defense & FedRAMP High Clearances',
    targetSector: 'government',
    description: 'Military-grade air-gap isolation, dynamic forensic watermarks, remote session kill-switches, and zero-telemetry egress.',
    isDefault: false,
    assignedDeviceCount: 320,
    lastModified: '2026-08-16',
    rules: [
      {
        id: 'r-gov-1',
        category: 'identity',
        name: 'Dynamic Forensic Watermarking Overlay',
        description: 'Overlays semi-transparent user timestamp, clearance tier, and IP hash across all browser viewports.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      },
      {
        id: 'r-gov-2',
        category: 'dlp',
        name: 'Total Clipboard & Screen Capture Quarantine',
        description: 'Hardware-level suppression of print-screen, OS clipboard transfer, and remote window streaming.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      },
      {
        id: 'r-gov-3',
        category: 'network',
        name: 'Air-Gapped Sovereign Mesh Tunneling',
        description: 'Routes 100% of encrypted packets through sovereign multi-hop WireGuard relay nodes.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      }
    ]
  },
  {
    id: 'school-safe-net',
    name: 'K-12 & Higher Education Safe-Net Policy',
    targetSector: 'school',
    description: 'COPPA/FERPA compliance, safe search lockdown, anti-cheat test lockdown mode, and real-time cyberbullying AI filter.',
    isDefault: false,
    assignedDeviceCount: 1450,
    lastModified: '2026-08-14',
    rules: [
      {
        id: 'r-edu-1',
        category: 'media',
        name: 'AI Real-time Content Filter',
        description: 'Automated on-device neural filtering for adult content, violence, and malicious downloads.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      },
      {
        id: 'r-edu-2',
        category: 'ai_governance',
        name: 'Socratic Academic Mode Enforcement',
        description: 'Prevents direct copy-pasting of AI assignment answers; transforms AI tutor into step-by-step guidance.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      }
    ]
  },
  {
    id: 'ngo-human-rights',
    name: 'Humanitarian & NGO Anti-Surveillance Policy',
    targetSector: 'ngo',
    description: 'Designed for journalists and field medics operating in hostile regimes. Anti-tamper memory wipe and onion routing.',
    isDefault: false,
    assignedDeviceCount: 210,
    lastModified: '2026-08-12',
    rules: [
      {
        id: 'r-ngo-1',
        category: 'identity',
        name: 'Duress PIN & Instant Memory Shredder',
        description: 'Entering emergency duress PIN instantly scrubs all IndexedDB, OPFS caches, and active vault keys.',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      },
      {
        id: 'r-ngo-2',
        category: 'network',
        name: 'Decentralized Onion Multi-Hop Proxy',
        description: 'Multi-layer encrypted traffic routing to circumvent state-sponsored Deep Packet Inspection (DPI).',
        enforcementLevel: 'strict_block',
        isEnabled: true,
        value: true
      }
    ]
  }
];

export const INITIAL_USER_GROUPS: EnterpriseUserGroup[] = [
  {
    id: 'grp-secops',
    name: 'SecOps & Defense Intelligence',
    sector: 'government',
    clearanceLevel: 'top_secret',
    memberCount: 42,
    policyProfileId: 'gov-fedramp-high',
    allowedInternalPortals: ['portal-siem', 'portal-sigint', 'portal-airgap-vault'],
    aiExfiltrationProtection: true,
    watermarkOverlay: true,
    clipboardGuard: true,
    screenCaptureBlocked: true,
    sessionTimeoutMinutes: 15
  },
  {
    id: 'grp-executive',
    name: 'Executive & Board of Directors',
    sector: 'company',
    clearanceLevel: 'confidential',
    memberCount: 18,
    policyProfileId: 'corp-zero-trust',
    allowedInternalPortals: ['portal-erp', 'portal-treasury', 'portal-bi'],
    aiExfiltrationProtection: true,
    watermarkOverlay: true,
    clipboardGuard: true,
    screenCaptureBlocked: false,
    sessionTimeoutMinutes: 60
  },
  {
    id: 'grp-engineering',
    name: 'Core R&D & DevOps Engineering',
    sector: 'company',
    clearanceLevel: 'restricted',
    memberCount: 380,
    policyProfileId: 'corp-zero-trust',
    allowedInternalPortals: ['portal-gitlab', 'portal-cloud-k8s', 'portal-observability'],
    aiExfiltrationProtection: true,
    watermarkOverlay: false,
    clipboardGuard: false,
    screenCaptureBlocked: false,
    sessionTimeoutMinutes: 480
  },
  {
    id: 'grp-students',
    name: 'Enrolled Quantum Computing Students',
    sector: 'school',
    clearanceLevel: 'unclassified',
    memberCount: 1450,
    policyProfileId: 'school-safe-net',
    allowedInternalPortals: ['portal-canvas', 'portal-q-simulator', 'portal-library'],
    aiExfiltrationProtection: true,
    watermarkOverlay: false,
    clipboardGuard: false,
    screenCaptureBlocked: false,
    sessionTimeoutMinutes: 120
  },
  {
    id: 'grp-ngo-field',
    name: 'Field Operators & Human Rights Monitors',
    sector: 'ngo',
    clearanceLevel: 'secret',
    memberCount: 95,
    policyProfileId: 'ngo-human-rights',
    allowedInternalPortals: ['portal-crisis-map', 'portal-secure-comms', 'portal-offline-registry'],
    aiExfiltrationProtection: true,
    watermarkOverlay: true,
    clipboardGuard: true,
    screenCaptureBlocked: true,
    sessionTimeoutMinutes: 30
  }
];

export const INITIAL_INTERNAL_PORTALS: EnterpriseInternalPortalApp[] = [
  {
    id: 'portal-siem',
    name: 'OMNI Sentinel Threat SIEM',
    category: 'defense',
    icon: 'ShieldAlert',
    url: 'https://siem.internal.defense.gov.omni',
    ssoEnabled: true,
    requiredClearance: 'Secret / Top Secret',
    description: 'Real-time telemetry ingestion, anomaly detection, and automated threat response orchestration.',
    badgeText: 'PQC Hardened',
    isAirGapped: true
  },
  {
    id: 'portal-erp',
    name: 'Enterprise SAP / Treasury Ledger',
    category: 'finance',
    icon: 'Landmark',
    url: 'https://treasury.internal.corp.omni',
    ssoEnabled: true,
    requiredClearance: 'Confidential',
    description: 'Corporate double-entry payroll, capital allocation, and automated invoice reconciliation.',
    badgeText: 'FIDO2 Enforced',
    isAirGapped: false
  },
  {
    id: 'portal-cloud-k8s',
    name: 'Sovereign Kubernetes Orchestrator',
    category: 'operations',
    icon: 'Server',
    url: 'https://k8s.internal.devops.omni',
    ssoEnabled: true,
    requiredClearance: 'Restricted',
    description: 'Multi-region sovereign container deployment, Spanner sharding, and edge ingress routing.',
    badgeText: 'Zero-Egress',
    isAirGapped: false
  },
  {
    id: 'portal-crisis-map',
    name: 'Humanitarian Emergency Relief Registry',
    category: 'research',
    icon: 'MapPin',
    url: 'https://crisis.internal.ngo.omni',
    ssoEnabled: true,
    requiredClearance: 'Secret',
    description: 'Offline-first field medic telemetry, encrypted supply chain routing, and biometric refugee aid.',
    badgeText: 'Air-Gapped Sync',
    isAirGapped: true
  },
  {
    id: 'portal-canvas',
    name: 'Sovereign Academy & Canvas LMS',
    category: 'academics',
    icon: 'GraduationCap',
    url: 'https://lms.internal.edu.omni',
    ssoEnabled: true,
    requiredClearance: 'Unclassified',
    description: 'Interactive STEM courses, automated grading, peer review, and verifiable on-chain certificates.',
    badgeText: 'COPPA Compliant',
    isAirGapped: false
  }
];

export const INITIAL_TRAINING_MODULES: EnterpriseTrainingModule[] = [
  {
    id: 'trn-phishing-2026',
    title: 'AI Deepfake & Post-Quantum Phishing Defense Drill',
    category: 'phishing',
    durationMinutes: 15,
    completionRate: 94,
    status: 'passed',
    score: 98,
    description: 'Interactive simulation testing employee recognition of AI-generated synthetic spear-phishing and quantum key spoofing.',
    interactiveDrillType: 'phishing_email'
  },
  {
    id: 'trn-ai-leakage',
    title: 'Preventing Data Leakage with Enterprise AI Copilots',
    category: 'ai_data_leakage',
    durationMinutes: 20,
    completionRate: 88,
    status: 'in_progress',
    score: 85,
    description: 'Hands-on practice identifying secret keys, API tokens, and customer PII before sending prompts to LLMs.',
    interactiveDrillType: 'prompt_injection'
  },
  {
    id: 'trn-pqc-cmmc',
    title: 'NIST SP 800-171 & CMMC 2.0 Post-Quantum Compliance',
    category: 'compliance_fedramp',
    durationMinutes: 30,
    completionRate: 100,
    status: 'passed',
    score: 100,
    description: 'Mandatory government defense certification covering Kyber-1024 encryption and secure enclave attestation.',
    interactiveDrillType: 'unauthorized_export'
  }
];

export const INITIAL_SECURITY_AUDIT_VECTORS: SecurityAuditResult[] = [
  {
    id: 'sec-ext-abuse',
    testVector: 'extension_abuse',
    title: 'Extension Privilege Escalation & Content Injection Audit',
    status: 'passed',
    score: 100,
    latencyMs: 14,
    details: 'Verified Manifest V3 strict sandbox. Background service workers strictly isolated from DOM access without explicit user consent. Zero unapproved script injection detected.',
    cryptographicProof: 'SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    recommendations: ['Maintain strict manifest v3 signature checks on third-party extensions.'],
    timestamp: '2026-08-17 01:24:18 UTC'
  },
  {
    id: 'sec-malicious-web',
    testVector: 'malicious_websites',
    title: 'Zero-Day Phishing & Typosquatting Interception Audit',
    status: 'passed',
    score: 99,
    latencyMs: 8,
    details: 'AI on-device heuristic engine evaluated 10,000 synthetic malicious domains. 99.98% intercept rate with sub-10ms lookahead DNS filtering.',
    cryptographicProof: 'PQC-SIG: kyber-ml-dsa-4819a8bc43d1f0',
    recommendations: ['Synchronize local threat bloom filters every 30 minutes.'],
    timestamp: '2026-08-17 01:24:22 UTC'
  },
  {
    id: 'sec-tenant-leak',
    testVector: 'tenant_leakage',
    title: 'Cross-Tenant Storage & Cookie Partition Isolation Audit',
    status: 'passed',
    score: 100,
    latencyMs: 6,
    details: 'Full state partitioning verified. IndexedDB, LocalStorage, ServiceWorkers, and credential caches isolated by top-level site partition key (CHIPS / First-Party Sets).',
    cryptographicProof: 'HMAC-SHA512: c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
    recommendations: ['Enforce strict cross-origin opener policy (COOP) and cross-origin embedder policy (COEP).'],
    timestamp: '2026-08-17 01:24:25 UTC'
  },
  {
    id: 'sec-vpn-perm',
    testVector: 'vpn_permissions',
    title: 'WireGuard Tunneling, WebRTC & DNS Leak Prevention Audit',
    status: 'passed',
    score: 100,
    latencyMs: 12,
    details: 'Zero DNS or WebRTC STUN leaks detected. All mDNS candidates obscured. Kill-switch immediately drops non-tunneled UDP/TCP sockets if VPN interface drops.',
    cryptographicProof: 'WIREGUARD-KEY: vh9JkZ09A9kLmN1Op2QrStUvWxYz1234567890=',
    recommendations: ['Enable multi-hop sovereign relay hops for sensitive classified workloads.'],
    timestamp: '2026-08-17 01:24:30 UTC'
  },
  {
    id: 'sec-sync-e2ee',
    testVector: 'sync_security',
    title: 'Zero-Knowledge E2EE State Sync & Post-Quantum Ratchet Audit',
    status: 'passed',
    score: 100,
    latencyMs: 18,
    details: 'Sync payloads encrypted using Double Ratchet algorithm with Kyber-1024 / X25519 hybrid exchange. OMNI Cloud servers possess zero decryption keys.',
    cryptographicProof: 'RATCHET-EPOCH: 4892-KYBER1024-X25519-SUCCESS',
    recommendations: ['Rotate master ratchet keys bi-weekly for enterprise device groups.'],
    timestamp: '2026-08-17 01:24:35 UTC'
  },
  {
    id: 'sec-vault-sec',
    testVector: 'password_vault',
    title: 'Argon2id Vault Memory Hardness & Secure Enclave Audit',
    status: 'passed',
    score: 100,
    latencyMs: 22,
    details: 'Master password derived using Argon2id (m=64MB, t=4, p=4). Keys stored exclusively inside hardware Secure Enclave / TPM chip. Automatic memory zeroing on browser idle.',
    cryptographicProof: 'TPM2.0-ATTESTATION: PCR0-PCR7-VERIFIED-VALID',
    recommendations: ['Encourage hardware FIDO2 WebAuthn keys for high-clearance administrators.'],
    timestamp: '2026-08-17 01:24:40 UTC'
  },
  {
    id: 'sec-ai-priv',
    testVector: 'ai_privacy',
    title: 'Zero Data Retention (ZDR) & AI PII Masking Verification',
    status: 'passed',
    score: 100,
    latencyMs: 15,
    details: 'Inbound prompts scrubbed of API credentials, Social Security Numbers, and patient PHI before dispatch. Zero Data Retention SLA cryptographically verified with server attestation.',
    cryptographicProof: 'ZDR-ATTEST: GEMINI-2.5-ENTERPRISE-NO-LOGGING-CONFIRMED',
    recommendations: ['Keep client-side regex redactor dictionary updated with internal project codenames.'],
    timestamp: '2026-08-17 01:24:45 UTC'
  },
  {
    id: 'sec-data-leak',
    testVector: 'data_leakage',
    title: 'DLP Clipboard Guard, Watermark & File Export Audit',
    status: 'passed',
    score: 98,
    latencyMs: 9,
    details: 'Clipboard guard successfully intercepted 14 outbound exfiltration attempts. Dynamic forensic watermarking verified on high-clearance browser tabs.',
    cryptographicProof: 'DLP-AGENT-VERIFY: 0x98124FA9B120938C',
    recommendations: ['Enforce file upload hashing against corporate sensitivity registries.'],
    timestamp: '2026-08-17 01:24:50 UTC'
  }
];

export const INITIAL_PERFORMANCE_METRICS: PerformanceAuditMetric[] = [
  {
    id: 'perf-loading',
    area: 'browser_loading',
    name: 'Browser Cold & Warm Start Latency',
    measuredValue: '185 ms',
    benchmarkTarget: '< 300 ms',
    unit: 'milliseconds',
    status: 'optimal',
    ratingScore: 98,
    breakdown: [
      { label: 'DOM Tree Hydration', value: '42 ms' },
      { label: 'WASM Runtime Init', value: '58 ms' },
      { label: 'Policy Cache Read', value: '25 ms' },
      { label: 'GPU Composite Render', value: '60 ms' }
    ]
  },
  {
    id: 'perf-sync',
    area: 'sync',
    name: 'P2P CRDT Sync Roundtrip Latency',
    measuredValue: '34 ms',
    benchmarkTarget: '< 80 ms',
    unit: 'milliseconds',
    status: 'optimal',
    ratingScore: 96,
    breakdown: [
      { label: 'CRDT Conflict Merge', value: '4 ms' },
      { label: 'PQC Encryption Overhead', value: '11 ms' },
      { label: 'Edge Relay Transit', value: '19 ms' }
    ]
  },
  {
    id: 'perf-storage',
    area: 'storage',
    name: 'OPFS & IndexedDB High-Throughput IOPS',
    measuredValue: '48,200 IOPS',
    benchmarkTarget: '> 30,000 IOPS',
    unit: 'IOPS',
    status: 'optimal',
    ratingScore: 99,
    breakdown: [
      { label: 'Origin Private File System Write', value: '620 MB/s' },
      { label: 'IndexedDB B-Tree Query', value: '1.2 ms' },
      { label: 'Memory Cache Hit Rate', value: '99.4%' }
    ]
  },
  {
    id: 'perf-ai-latency',
    area: 'ai_latency',
    name: 'AI First-Token Time to Response (TTFT)',
    measuredValue: '195 ms',
    benchmarkTarget: '< 350 ms',
    unit: 'milliseconds',
    status: 'optimal',
    ratingScore: 97,
    breakdown: [
      { label: 'PII Regex Scrubbing', value: '3 ms' },
      { label: 'Local ONNX Quantized Fallback', value: '45 ms' },
      { label: 'Gemini 2.5 Flash Server Response', value: '147 ms' }
    ]
  },
  {
    id: 'perf-media',
    area: 'media_handling',
    name: '4K 60fps AV1/VP9 Hardware Acceleration',
    measuredValue: '0.01% Frame Drop',
    benchmarkTarget: '< 0.5% Frame Drop',
    unit: '% dropped',
    status: 'optimal',
    ratingScore: 100,
    breakdown: [
      { label: 'Hardware Video Decode', value: 'Metal / Direct3D 12' },
      { label: 'Audio Latency', value: '5.2 ms' },
      { label: 'WebRTC Peer Jitter', value: '1.8 ms' }
    ]
  },
  {
    id: 'perf-extensions',
    area: 'extensions',
    name: 'Isolated Extension Memory & CPU Overhead',
    measuredValue: '18.4 MB / ext',
    benchmarkTarget: '< 40 MB / ext',
    unit: 'MB / extension',
    status: 'optimal',
    ratingScore: 95,
    breakdown: [
      { label: 'Service Worker Idle Sleep', value: '98.5% time' },
      { label: 'Content Script Execution', value: '< 1.5 ms / page' },
      { label: 'Garbage Collection Frequency', value: 'Sub-millisecond' }
    ]
  }
];
