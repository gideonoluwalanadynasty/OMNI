import {
  OmniConversation,
  OmniMessage,
  OmniMessengerDevice,
  OmniMessengerSettings,
  OmniMessengerAdminPolicies
} from '../types/omni_messenger';

export const SEED_MESSENGER_DEVICES: OmniMessengerDevice[] = [
  {
    deviceId: 'dev_mac_studio_01',
    name: 'Mac Studio M3 Ultra (Primary Sovereign Node)',
    type: 'desktop',
    os: 'macOS Sequoia 15.4',
    browser: 'OMNI Sovereign Browser 2.4',
    isCurrent: true,
    lastSeenAt: new Date().toISOString(),
    e2eePublicKey: '0x94f8a21b38c01d9f4e29bca71052841f3910c2834b981f20384a719283748291',
    pushTokenRegistered: true
  },
  {
    deviceId: 'dev_iphone_16_pro',
    name: 'iPhone 16 Pro Max (Mobile Secure Enclave)',
    type: 'mobile',
    os: 'iOS 19.1',
    isCurrent: false,
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    e2eePublicKey: '0x38b201948fa1098234bc81927391028374829102394810293847102938471029',
    pushTokenRegistered: true
  },
  {
    deviceId: 'dev_ipad_pro_m4',
    name: 'iPad Pro M4 (Executive Field Terminal)',
    type: 'tablet',
    os: 'iPadOS 19.1',
    isCurrent: false,
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    e2eePublicKey: '0x1029384710293847102938471029384710293847102938471029384710293847',
    pushTokenRegistered: true
  },
  {
    deviceId: 'dev_web_chrome_01',
    name: 'Chrome PWA Workstation (Encrypted IndexedDB)',
    type: 'web',
    os: 'Linux (Fedora Silverblue)',
    browser: 'Chrome 128.0',
    isCurrent: false,
    lastSeenAt: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
    e2eePublicKey: '0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
    pushTokenRegistered: false
  }
];

export const SEED_MESSENGER_CONVERSATIONS: OmniConversation[] = [
  {
    id: 'conv_sarah_001',
    type: 'one_to_one',
    title: 'Dr. Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    description: 'Direct Encrypted Channel • Chief AI Architect @ OMNI Research',
    members: [
      {
        profileId: 'prof_gideon_001',
        username: 'gideon',
        displayName: 'Gideon Dynasty',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        role: 'owner',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: true }
      },
      {
        profileId: 'prof_sarah_002',
        username: 'sarahchen',
        displayName: 'Dr. Sarah Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        role: 'member',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: false }
      }
    ],
    pinnedMessageIds: ['msg_sarah_pin_01'],
    isEncrypted: true,
    encryptionFingerprint: 'X3DH:7F92-4A1B-990C-88E2',
    ephemeralTimerSeconds: 86400, // 24 hours
    unreadCount: 0,
    lastMessage: {
      id: 'msg_sarah_004',
      content: 'I uploaded the neural weight checkpoints to OMNI Cloud CDN with SHA-256 verification.',
      senderDisplayName: 'Dr. Sarah Chen',
      sentAt: '2026-08-19T10:45:00Z',
      state: 'read',
      messageType: 'document'
    },
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-08-19T10:45:00Z',
    tenantId: 'tenant_omni_global_01'
  },
  {
    id: 'conv_group_kernel_002',
    type: 'group',
    title: 'OMNI Core Engineering & Kernel Collective',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
    description: 'Protocol engineering, Double Ratchet sync, and consensus hardening group.',
    members: [
      {
        profileId: 'prof_gideon_001',
        username: 'gideon',
        displayName: 'Gideon Dynasty',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        role: 'owner',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: true }
      },
      {
        profileId: 'prof_marcus_003',
        username: 'marcus_fin',
        displayName: 'Marcus Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        role: 'admin',
        joinedAt: '2026-01-10T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: true }
      },
      {
        profileId: 'prof_elena_004',
        username: 'elena_crypto',
        displayName: 'Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        role: 'moderator',
        joinedAt: '2026-02-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'away',
        lastSeenAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: false }
      }
    ],
    pinnedMessageIds: ['msg_kernel_pin_01'],
    isEncrypted: true,
    encryptionFingerprint: 'SIG:44A0-99BC-11FD-77E0',
    ephemeralTimerSeconds: 0,
    unreadCount: 2,
    lastMessage: {
      id: 'msg_kernel_003',
      content: 'Poll: Should we mandate Post-Quantum Kyber-1024 as default for all enterprise messaging tunnels?',
      senderDisplayName: 'Marcus Vance',
      sentAt: '2026-08-19T10:15:00Z',
      state: 'delivered',
      messageType: 'poll'
    },
    createdAt: '2026-02-01T12:00:00Z',
    updatedAt: '2026-08-19T10:15:00Z',
    tenantId: 'tenant_omni_global_01'
  },
  {
    id: 'conv_crm_apex_003',
    type: 'business_customer',
    title: 'Apex Global Logistics (Enterprise Suite)',
    avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    description: 'Enterprise Client Chat • Multi-Region Supply Chain Onboarding',
    members: [
      {
        profileId: 'prof_gideon_001',
        username: 'gideon',
        displayName: 'Gideon Dynasty',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        role: 'owner',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: true }
      },
      {
        profileId: 'prof_apex_rep',
        username: 'david_apex',
        displayName: 'David Sterling (VP Logistics)',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        role: 'member',
        joinedAt: '2026-03-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: false, canAddMembers: false, canDeleteMessages: false, canManageRoles: false }
      }
    ],
    pinnedMessageIds: [],
    isEncrypted: true,
    encryptionFingerprint: 'X3DH:11A3-77F8-44BC-00E1',
    ephemeralTimerSeconds: 0,
    crmPipelineStage: 'lead',
    crmLeadData: {
      leadId: 'lead_apex_9841',
      dealValueUsd: 120000.00,
      leadScore: 94,
      assignedTo: 'Gideon Dynasty',
      companyName: 'Apex Sovereign Logistics Inc.',
      intentCategory: 'Enterprise License Expansion'
    },
    unreadCount: 1,
    lastMessage: {
      id: 'msg_apex_002',
      content: 'We reviewed the SLA proposal and are ready to finalize the $120,000 annual contract.',
      senderDisplayName: 'David Sterling (VP Logistics)',
      sentAt: '2026-08-19T09:30:00Z',
      state: 'delivered',
      messageType: 'text'
    },
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-08-19T09:30:00Z',
    tenantId: 'tenant_omni_global_01'
  },
  {
    id: 'conv_ai_agent_006',
    type: 'ai',
    title: 'OMNI Sovereign AI Intelligence Agent',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    description: 'Autonomous Sovereign Copilot • CRM extraction, smart drafting & workflow execution.',
    members: [
      {
        profileId: 'prof_gideon_001',
        username: 'gideon',
        displayName: 'Gideon Dynasty',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        role: 'owner',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: true }
      },
      {
        profileId: 'prof_ai_omni_agent',
        username: 'omni_ai',
        displayName: 'OMNI AI Copilot',
        avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
        role: 'admin',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: false, canDeleteMessages: false, canManageRoles: false }
      }
    ],
    pinnedMessageIds: [],
    isEncrypted: true,
    ephemeralTimerSeconds: 0,
    unreadCount: 0,
    lastMessage: {
      id: 'msg_ai_002',
      content: 'I analyzed the Apex Logistics conversation. Extracted action items: 1) Generate Master Service Agreement, 2) Set up dedicated WireGuard cluster.',
      senderDisplayName: 'OMNI AI Copilot',
      sentAt: '2026-08-19T09:35:00Z',
      state: 'read',
      messageType: 'text'
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-19T09:35:00Z',
    tenantId: 'tenant_omni_global_01'
  },
  {
    id: 'conv_community_builders_004',
    type: 'community',
    title: 'Global Sovereign Builders & AI Pioneers',
    avatarUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&auto=format&fit=crop&q=80',
    description: 'Decentralized Community Hub • 4,850+ builders sharing sovereign applications.',
    members: [
      {
        profileId: 'prof_gideon_001',
        username: 'gideon',
        displayName: 'Gideon Dynasty',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        role: 'owner',
        joinedAt: '2026-01-01T00:00:00Z',
        isMuted: false,
        onlineStatus: 'online',
        lastSeenAt: new Date().toISOString(),
        permissions: { canSendMessages: true, canPinMessages: true, canAddMembers: true, canDeleteMessages: true, canManageRoles: true }
      }
    ],
    pinnedMessageIds: [],
    isEncrypted: false,
    channelAnnouncementOnly: false,
    ephemeralTimerSeconds: 0,
    unreadCount: 5,
    lastMessage: {
      id: 'msg_comm_001',
      content: 'Event Invite: Global Sovereign Hackathon 2026 kicks off this Saturday!',
      senderDisplayName: 'Dr. Sarah Chen',
      sentAt: '2026-08-19T08:00:00Z',
      state: 'delivered',
      messageType: 'event'
    },
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-08-19T08:00:00Z',
    tenantId: 'tenant_omni_global_01'
  }
];

export const SEED_MESSAGES_MAP: Record<string, OmniMessage[]> = {
  conv_sarah_001: [
    {
      id: 'msg_sarah_pin_01',
      conversationId: 'conv_sarah_001',
      senderProfileId: 'prof_sarah_002',
      senderUsername: 'sarahchen',
      senderDisplayName: 'Dr. Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'official_purple',
      messageType: 'text',
      content: '📌 PINNED: Sovereign Neural Mesh Model 4.0 architecture specification & Double-Ratchet parameters.',
      state: 'read',
      sentAt: '2026-08-19T08:30:00Z',
      deliveredAt: '2026-08-19T08:30:01Z',
      readAt: '2026-08-19T08:31:00Z',
      isPinned: true,
      reactions: [{ emoji: '🔥', count: 3, reactedProfileIds: ['prof_gideon_001', 'prof_marcus_003'], userReacted: true }],
      reads: [{ profileId: 'prof_gideon_001', displayName: 'Gideon Dynasty', readAt: '2026-08-19T08:31:00Z', deviceId: 'dev_mac_studio_01' }],
      e2eeMetadata: { algorithm: 'Signal-X3DH-DoubleRatchet', fingerprint: 'X3DH:7F92-4A1B-990C-88E2', verified: true }
    },
    {
      id: 'msg_sarah_002',
      conversationId: 'conv_sarah_001',
      senderProfileId: 'prof_gideon_001',
      senderUsername: 'gideon',
      senderDisplayName: 'Gideon Dynasty',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'sovereign_gold',
      messageType: 'voice_note',
      content: 'Audio brief on the sub-10ms latency optimization for multi-device sync.',
      state: 'read',
      sentAt: '2026-08-19T09:10:00Z',
      deliveredAt: '2026-08-19T09:10:01Z',
      readAt: '2026-08-19T09:12:00Z',
      voiceNote: {
        audioUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_waves.ogg',
        durationSeconds: 18,
        waveform: [20, 45, 80, 65, 90, 100, 75, 40, 60, 85, 95, 70, 50, 85, 90, 60, 30, 15],
        transcription: "Sarah, I've verified the Double Ratchet key generation across Mac, iOS, and Web PWA. Ephemeral message self-destruct is ticking cleanly at 24 hours.",
        translation: {
          targetLanguage: 'French',
          text: "Sarah, j'ai vérifié la génération de clés Double Ratchet sur Mac, iOS et Web PWA. L'autodestruction des messages éphémères fonctionne parfaitement à 24 heures."
        },
        summary: 'Verified multi-device Double Ratchet key rotation and 24h ephemeral message self-destruct.',
        isTranscribed: true
      },
      reactions: [{ emoji: '👍', count: 1, reactedProfileIds: ['prof_sarah_002'], userReacted: false }],
      reads: [{ profileId: 'prof_sarah_002', displayName: 'Dr. Sarah Chen', readAt: '2026-08-19T09:12:00Z', deviceId: 'dev_sarah_phone' }]
    },
    {
      id: 'msg_sarah_003',
      conversationId: 'conv_sarah_001',
      senderProfileId: 'prof_gideon_001',
      senderUsername: 'gideon',
      senderDisplayName: 'Gideon Dynasty',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'sovereign_gold',
      messageType: 'payment',
      content: 'OmniPay Instant Transfer: $4,500.00 USD for Q3 Research Grant Grantee Allocation.',
      state: 'read',
      sentAt: '2026-08-19T09:40:00Z',
      deliveredAt: '2026-08-19T09:40:01Z',
      readAt: '2026-08-19T09:42:00Z',
      paymentData: {
        amount: 4500.00,
        currency: 'USD',
        description: 'Q3 Sovereign AI Grant Disbursement • 0% Take Rate',
        status: 'settled',
        transactionId: 'tx_omni_8819420',
        receiptMerkleProof: '0x8824f910ba98124b8912c01928471928'
      },
      reactions: [{ emoji: '❤️', count: 1, reactedProfileIds: ['prof_sarah_002'], userReacted: false }],
      reads: [{ profileId: 'prof_sarah_002', displayName: 'Dr. Sarah Chen', readAt: '2026-08-19T09:42:00Z', deviceId: 'dev_sarah_phone' }]
    },
    {
      id: 'msg_sarah_004',
      conversationId: 'conv_sarah_001',
      senderProfileId: 'prof_sarah_002',
      senderUsername: 'sarahchen',
      senderDisplayName: 'Dr. Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'official_purple',
      messageType: 'document',
      content: 'I uploaded the neural weight checkpoints to OMNI Cloud CDN with SHA-256 verification.',
      state: 'read',
      sentAt: '2026-08-19T10:45:00Z',
      deliveredAt: '2026-08-19T10:45:01Z',
      readAt: '2026-08-19T10:46:00Z',
      attachments: [
        {
          id: 'att_doc_sarah_01',
          type: 'document',
          name: 'Omni_Neural_Mesh_V4_Architecture.pdf',
          sizeBytes: 8420000,
          mimeType: 'application/pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          cdnUrl: 'https://cdn.omni.network/files/docs/v4_mesh.pdf',
          sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        }
      ],
      reactions: [{ emoji: '🚀', count: 2, reactedProfileIds: ['prof_gideon_001', 'prof_sarah_002'], userReacted: true }],
      reads: [{ profileId: 'prof_gideon_001', displayName: 'Gideon Dynasty', readAt: '2026-08-19T10:46:00Z', deviceId: 'dev_mac_studio_01' }]
    }
  ],
  conv_group_kernel_002: [
    {
      id: 'msg_kernel_pin_01',
      conversationId: 'conv_group_kernel_002',
      senderProfileId: 'prof_gideon_001',
      senderUsername: 'gideon',
      senderDisplayName: 'Gideon Dynasty',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'sovereign_gold',
      messageType: 'text',
      content: 'Rule #1: All production messaging channels must be protected with end-to-end Signal Double-Ratchet encryption and offline queue retry buffers.',
      state: 'read',
      sentAt: '2026-08-19T08:00:00Z',
      isPinned: true,
      reactions: [{ emoji: '🛡️', count: 5, reactedProfileIds: ['prof_sarah_002', 'prof_marcus_003'], userReacted: false }],
      reads: []
    },
    {
      id: 'msg_kernel_002',
      conversationId: 'conv_group_kernel_002',
      senderProfileId: 'prof_elena_004',
      senderUsername: 'elena_crypto',
      senderDisplayName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'verified_blue',
      messageType: 'text',
      content: 'Benchmarked the zero-knowledge identity token verification: average authentication latency is 1.4ms across 10,000 simulated client connections.',
      state: 'read',
      sentAt: '2026-08-19T09:50:00Z',
      reactions: [{ emoji: '⚡', count: 4, reactedProfileIds: ['prof_gideon_001'], userReacted: true }],
      reads: []
    },
    {
      id: 'msg_kernel_003',
      conversationId: 'conv_group_kernel_002',
      senderProfileId: 'prof_marcus_003',
      senderUsername: 'marcus_fin',
      senderDisplayName: 'Marcus Vance',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'business_emerald',
      messageType: 'poll',
      content: 'Poll: Should we mandate Post-Quantum Kyber-1024 as default for all enterprise messaging tunnels?',
      state: 'delivered',
      sentAt: '2026-08-19T10:15:00Z',
      pollData: {
        id: 'poll_pqc_001',
        question: 'Should we mandate Post-Quantum Kyber-1024 as default for all enterprise messaging tunnels?',
        options: [
          { id: 'opt_1', text: 'Yes, full mandate across all tiers', votes: 14, voterProfileIds: ['prof_gideon_001', 'prof_sarah_002'] },
          { id: 'opt_2', text: 'Hybrid X3DH + Kyber option', votes: 8, voterProfileIds: [] },
          { id: 'opt_3', text: 'Enterprise configurable policy', votes: 2, voterProfileIds: [] }
        ],
        totalVotes: 24,
        expiresAt: '2026-08-26T00:00:00Z',
        userVotedOptionId: 'opt_1'
      },
      reactions: [{ emoji: '🗳️', count: 6, reactedProfileIds: ['prof_gideon_001'], userReacted: true }],
      reads: []
    }
  ],
  conv_crm_apex_003: [
    {
      id: 'msg_apex_001',
      conversationId: 'conv_crm_apex_003',
      senderProfileId: 'prof_gideon_001',
      senderUsername: 'gideon',
      senderDisplayName: 'Gideon Dynasty',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'sovereign_gold',
      messageType: 'text',
      content: 'Hello David! Welcome to the dedicated OMNI Enterprise CRM channel. All correspondence here is synchronized with your OMNI CRM account ledger.',
      state: 'read',
      sentAt: '2026-08-19T09:00:00Z',
      reactions: [],
      reads: []
    },
    {
      id: 'msg_apex_002',
      conversationId: 'conv_crm_apex_003',
      senderProfileId: 'prof_apex_rep',
      senderUsername: 'david_apex',
      senderDisplayName: 'David Sterling (VP Logistics)',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'business_emerald',
      messageType: 'text',
      content: 'We reviewed the SLA proposal and are ready to finalize the $120,000 annual contract. Please send over the formal OmniPay enterprise invoice.',
      state: 'delivered',
      sentAt: '2026-08-19T09:30:00Z',
      aiAnalysis: {
        intent: 'Purchasing & Contract Closure Intent (High Value Lead: $120k)',
        sentiment: 'positive',
        taskExtracted: 'Generate $120,000 Enterprise Invoice for Apex Logistics',
        suggestedAction: 'Advance CRM Pipeline Stage to "Customer" & Issue OmniPay Invoice'
      },
      reactions: [{ emoji: '🤝', count: 1, reactedProfileIds: ['prof_gideon_001'], userReacted: true }],
      reads: []
    }
  ],
  conv_ai_agent_006: [
    {
      id: 'msg_ai_001',
      conversationId: 'conv_ai_agent_006',
      senderProfileId: 'prof_gideon_001',
      senderUsername: 'gideon',
      senderDisplayName: 'Gideon Dynasty',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'sovereign_gold',
      messageType: 'text',
      content: 'AI, summarize the conversation with Apex Logistics and prepare the CRM contract notes.',
      state: 'read',
      sentAt: '2026-08-19T09:34:00Z',
      reactions: [],
      reads: []
    },
    {
      id: 'msg_ai_002',
      conversationId: 'conv_ai_agent_006',
      senderProfileId: 'prof_ai_omni_agent',
      senderUsername: 'omni_ai',
      senderDisplayName: 'OMNI AI Copilot',
      senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'official_purple',
      messageType: 'text',
      content: '🤖 **Executive Conversation Summary — Apex Global Logistics**\n\n- **Client**: David Sterling (VP Logistics)\n- **Deal Envelope**: $120,000 USD Annual Enterprise SLA\n- **Status**: Proposal Accepted • Ready for Billing\n- **Actions Prepared**:\n  1. Created CRM Deal Card `#DEAL-9841`\n  2. Drafted $120,000 OmniPay Invoice\n  3. Configured high-throughput multi-region WireGuard mesh channel\n\n*Would you like me to dispatch the invoice directly to the Apex channel?*',
      state: 'read',
      sentAt: '2026-08-19T09:35:00Z',
      reactions: [{ emoji: '✨', count: 1, reactedProfileIds: ['prof_gideon_001'], userReacted: true }],
      reads: []
    }
  ],
  conv_community_builders_004: [
    {
      id: 'msg_comm_001',
      conversationId: 'conv_community_builders_004',
      senderProfileId: 'prof_sarah_002',
      senderUsername: 'sarahchen',
      senderDisplayName: 'Dr. Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      senderVerificationBadge: 'official_purple',
      messageType: 'event',
      content: 'Event Invite: Global Sovereign Hackathon 2026 kicks off this Saturday!',
      state: 'delivered',
      sentAt: '2026-08-19T08:00:00Z',
      eventData: {
        id: 'evt_hack_01',
        title: 'Global Sovereign Hackathon & AI Builders Summit 2026',
        startTime: '2026-08-22T14:00:00Z',
        endTime: '2026-08-24T20:00:00Z',
        location: 'Virtual Sovereign WireGuard Mesh & San Francisco Hub',
        rsvpCount: 842,
        userRsvpStatus: 'going'
      },
      reactions: [{ emoji: '🎉', count: 28, reactedProfileIds: ['prof_gideon_001'], userReacted: true }],
      reads: []
    }
  ]
};

export const SEED_MESSENGER_SETTINGS: OmniMessengerSettings = {
  whoCanMessageMe: 'everyone',
  whoCanAddToGroups: 'contacts_only',
  readReceiptsEnabled: true,
  onlineStatusVisibility: 'everyone',
  lastSeenVisibility: 'everyone',
  messageRequestsEnabled: true,
  soundNotifications: true,
  pushNotifications: true,
  emailNotifications: false,
  smsNotifications: false,
  offlineQueueSyncAuto: true,
  ephemeralDefaultTimerSeconds: 0
};

export const SEED_MESSENGER_ADMIN_POLICIES: OmniMessengerAdminPolicies = {
  messagingActive: true,
  defaultRetentionDays: 365,
  maxAttachmentSizeBytes: 104857600, // 100 MB
  e2eeMandatoryForEnterprise: true,
  maxGroupSize: 10000,
  rateLimitMessagesPerMinute: 60,
  autoSpamQuarantine: true,
  tenantStorageQuotaMb: 50000,
  tenantStorageUsedMb: 3420
};
