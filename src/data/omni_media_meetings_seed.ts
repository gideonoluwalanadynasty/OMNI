/**
 * OMNI VOICE, VIDEO, MEETINGS, WEBINARS & RECORDINGS SEED DATA
 */

import {
  CallHistoryRecord,
  OmniMeetingSession,
  OmniWebinarSession,
  OmniVirtualClassroom,
  AiMeetingLiveTranscriptItem,
  AiMeetingActionItem,
  AiMeetingExecutiveDigest,
  OmniCloudRecording,
  MediaPlatformAdminPolicies
} from '../types/omni_media_meetings';

export const SEED_CALL_HISTORY: CallHistoryRecord[] = [
  {
    id: 'call_hist_01',
    callType: 'one_to_one_video',
    direction: 'incoming',
    initiatorProfileId: 'prof_sarah_chen',
    participants: [
      {
        profileId: 'prof_sarah_chen',
        displayName: 'Sarah Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      {
        profileId: 'prof_alex_rivers',
        displayName: 'Alex Rivers',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
      }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    durationSeconds: 1620,
    status: 'completed',
    recordingId: 'rec_cloud_01',
    isE2EE: true
  },
  {
    id: 'call_hist_02',
    callType: 'one_to_one_voice',
    direction: 'outgoing',
    initiatorProfileId: 'prof_alex_rivers',
    participants: [
      {
        profileId: 'prof_alex_rivers',
        displayName: 'Alex Rivers',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
      },
      {
        profileId: 'prof_elena_rostova',
        displayName: 'Dr. Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 105).toISOString(),
    durationSeconds: 900,
    status: 'completed',
    isE2EE: true
  },
  {
    id: 'call_hist_03',
    callType: 'group_video',
    direction: 'missed',
    initiatorProfileId: 'prof_marcus_vance',
    participants: [
      {
        profileId: 'prof_marcus_vance',
        displayName: 'Marcus Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      },
      {
        profileId: 'prof_alex_rivers',
        displayName: 'Alex Rivers',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
      }
    ],
    startedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    durationSeconds: 0,
    status: 'missed',
    isE2EE: true
  }
];

export const SEED_MEETING_SESSIONS: OmniMeetingSession[] = [
  {
    id: 'room_boardroom_alpha',
    tenantId: 'tenant_global_01',
    slug: 'omni-executive-boardroom',
    roomTitle: 'OMNI Core Strategic Architecture & Enterprise Governance',
    description: 'Executive roadmap review, high-frequency media relay routing, and quantum-resistant communications benchmark.',
    hostProfileId: 'prof_alex_rivers',
    hostName: 'Alex Rivers',
    hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    coHostProfileIds: ['prof_sarah_chen'],
    scheduledStartTime: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    scheduledEndTime: new Date(Date.now() + 1000 * 60 * 65).toISOString(),
    actualStartTime: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: 'active',
    isLocked: false,
    waitingRoomEnabled: true,
    e2eeEnabled: true,
    maxParticipants: 100,
    allowScreenShare: true,
    allowChat: true,
    allowUnmuteSelf: true,
    muteParticipantsOnEntry: false,
    layoutMode: 'grid',
    isCloudRecordingActive: true,
    isAiTranscribingActive: true,
    associatedCrmDealId: 'deal_enterprise_meridian',
    activeParticipants: [
      {
        profileId: 'prof_alex_rivers',
        username: 'alexrivers',
        displayName: 'Alex Rivers (Host)',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        verificationBadge: 'official_purple',
        isMutedAudio: false,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isSpeaking: true,
        virtualBackground: 'studio_minimal',
        noiseSuppression: 'ai_krisp_neural',
        networkQuality: 'excellent',
        bitrateKbps: 2450,
        packetLossPercent: 0.1,
        joinedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
      },
      {
        profileId: 'prof_sarah_chen',
        username: 'sarahchen',
        displayName: 'Sarah Chen (Co-Host)',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        verificationBadge: 'business_emerald',
        isMutedAudio: false,
        isVideoOff: false,
        isScreenSharing: true,
        isHandRaised: false,
        isSpeaking: false,
        virtualBackground: 'office_luxury',
        noiseSuppression: 'ai_krisp_neural',
        networkQuality: 'excellent',
        bitrateKbps: 3200,
        packetLossPercent: 0.0,
        joinedAt: new Date(Date.now() - 1000 * 60 * 24).toISOString()
      },
      {
        profileId: 'prof_marcus_vance',
        username: 'marcusvance',
        displayName: 'Marcus Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        verificationBadge: 'creator_gold',
        isMutedAudio: true,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: true,
        isSpeaking: false,
        virtualBackground: 'cyber_matrix',
        noiseSuppression: 'standard_dsp',
        networkQuality: 'good',
        bitrateKbps: 1850,
        packetLossPercent: 0.4,
        joinedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
      },
      {
        profileId: 'prof_elena_rostova',
        username: 'elenarostova',
        displayName: 'Dr. Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        verificationBadge: 'developer_cyan',
        isMutedAudio: false,
        isVideoOff: false,
        isScreenSharing: false,
        isHandRaised: false,
        isSpeaking: false,
        virtualBackground: 'nature_sunset',
        noiseSuppression: 'ai_krisp_neural',
        networkQuality: 'excellent',
        bitrateKbps: 2200,
        packetLossPercent: 0.0,
        joinedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString()
      }
    ],
    waitingRoomParticipants: [
      {
        profileId: 'prof_david_okafor',
        name: 'David Okafor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        requestedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString()
      }
    ],
    activeBreakoutRooms: [
      {
        id: 'breakout_01',
        name: 'Engineering & Protocol Scalability',
        participantIds: ['prof_alex_rivers', 'prof_elena_rostova']
      },
      {
        id: 'breakout_02',
        name: 'Commercial & Institutional Adoption',
        participantIds: ['prof_sarah_chen', 'prof_marcus_vance']
      }
    ]
  },
  {
    id: 'room_crm_sales_sync',
    tenantId: 'tenant_global_01',
    slug: 'meridian-capital-contract-sync',
    roomTitle: 'Meridian Capital $120k Enterprise Contract & Security Review',
    description: 'Finalizing security audit sign-offs, SLA guarantee parameters, and bank transfer routing.',
    hostProfileId: 'prof_sarah_chen',
    hostName: 'Sarah Chen',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coHostProfileIds: ['prof_alex_rivers'],
    scheduledStartTime: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
    scheduledEndTime: new Date(Date.now() + 1000 * 60 * 180).toISOString(),
    status: 'scheduled',
    isLocked: false,
    waitingRoomEnabled: true,
    e2eeEnabled: true,
    maxParticipants: 25,
    allowScreenShare: true,
    allowChat: true,
    allowUnmuteSelf: true,
    muteParticipantsOnEntry: true,
    layoutMode: 'speaker',
    isCloudRecordingActive: false,
    isAiTranscribingActive: false,
    associatedCrmDealId: 'deal_enterprise_meridian',
    activeParticipants: [],
    waitingRoomParticipants: []
  }
];

export const SEED_WEBINARS: OmniWebinarSession[] = [
  {
    id: 'webinar_global_dev_2026',
    tenantId: 'tenant_global_01',
    title: 'OMNI Global Keynote: Sovereign Media Infrastructure & Neural AI',
    subtitle: 'Unveiling sub-10ms WebRTC SFU Mesh routing, Post-Quantum Kyber-1024 calls, and automated CRM meeting intelligence.',
    coverBannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    hostProfileId: 'prof_alex_rivers',
    hostName: 'Alex Rivers',
    speakers: [
      {
        profileId: 'prof_alex_rivers',
        name: 'Alex Rivers',
        role: 'keynote_speaker',
        headline: 'Founder & Chief Architect at OMNI',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        bio: 'Pioneering decentralized infrastructure, sovereign digital identity, and zero-fee financial operating systems.'
      },
      {
        profileId: 'prof_sarah_chen',
        name: 'Sarah Chen',
        role: 'moderator',
        headline: 'VP Global Operations, Meridian Capital',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      {
        profileId: 'prof_elena_rostova',
        name: 'Dr. Elena Rostova',
        role: 'panelist',
        headline: 'Quantum Cryptography Fellow, Zurich Institute',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      }
    ],
    scheduledStartTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    durationMinutes: 90,
    maxAudienceCapacity: 10000,
    isTicketed: false,
    ticketPriceUsd: 0,
    currency: 'USD',
    status: 'live',
    registrationsCount: 5420,
    liveAudienceCount: 3840,
    streamRtmpEgressUrl: 'rtmp://live.omni.network/live/stream_key_quantum_dev_2026',
    broadcastQuality: '4k30',
    chatAllowed: true,
    qaItems: [
      {
        id: 'qa_01',
        webinarId: 'webinar_global_dev_2026',
        authorProfileId: 'prof_user_44',
        authorName: 'Jean Dupont',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        questionText: 'How does the WebRTC media layer handle automated bandwidth switching when scaling to 10,000+ viewers?',
        timestamp: '14:32',
        upvotes: 42,
        upvotedByProfileIds: ['prof_alex_rivers', 'prof_marcus_vance'],
        isAnswered: true,
        answeredByName: 'Alex Rivers',
        answerText: 'We utilize dynamic simulcast layers (1080p, 720p, 360p) routed through geo-distributed edge SFU media relays.'
      },
      {
        id: 'qa_02',
        webinarId: 'webinar_global_dev_2026',
        authorProfileId: 'prof_user_99',
        authorName: 'Klaus Lindner',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        questionText: 'Are the AI speech-to-text transcriptions and live translations executed entirely on sovereign client-side models?',
        timestamp: '14:38',
        upvotes: 28,
        upvotedByProfileIds: [],
        isAnswered: false
      }
    ],
    polls: [
      {
        id: 'poll_webinar_01',
        webinarId: 'webinar_global_dev_2026',
        question: 'Which OMNI Media capability is most critical for your organization in 2026?',
        options: [
          { id: 'opt_1', text: 'E2EE Post-Quantum Video & Audio', voteCount: 1420 },
          { id: 'opt_2', text: 'AI Meeting Intelligence & CRM Sync', voteCount: 1680 },
          { id: 'opt_3', text: '10,000+ Scalable HD Webinars', voteCount: 540 },
          { id: 'opt_4', text: 'Zero-Fee OmniPay In-Call Settlements', voteCount: 200 }
        ],
        isLive: true,
        totalVotes: 3840,
        votedUserIds: ['prof_alex_rivers'],
        createdAt: '14:20'
      }
    ]
  },
  {
    id: 'webinar_sovereign_fintech_summit',
    tenantId: 'tenant_global_01',
    title: 'Sovereign Digital Banking & Real-Time Treasury Masterclass',
    subtitle: 'Institutional liquidity management, ISO 20022 compliance, and programmable multi-currency settlement rails.',
    coverBannerUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    hostProfileId: 'prof_sarah_chen',
    hostName: 'Sarah Chen',
    speakers: [
      {
        profileId: 'prof_sarah_chen',
        name: 'Sarah Chen',
        role: 'keynote_speaker',
        headline: 'VP Global Operations, Meridian Capital',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }
    ],
    scheduledStartTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    durationMinutes: 60,
    maxAudienceCapacity: 5000,
    isTicketed: true,
    ticketPriceUsd: 149,
    currency: 'USD',
    status: 'published',
    registrationsCount: 1240,
    liveAudienceCount: 0,
    broadcastQuality: '1080p60',
    chatAllowed: true,
    qaItems: [],
    polls: []
  }
];

export const SEED_VIRTUAL_CLASSROOM: OmniVirtualClassroom = {
  id: 'class_learn_ts_advanced',
  tenantId: 'tenant_global_01',
  courseId: 'course_omni_distributed_systems',
  courseTitle: 'OMNI Learn: High-Performance Distributed Systems & Media Architectures',
  lessonNumber: 6,
  lessonTitle: 'Lesson 6: WebRTC SFU Mesh Protocol, Jitter Buffers, and Neural Audio Transcriptions',
  teacherProfileId: 'prof_alex_rivers',
  teacherName: 'Alex Rivers (Lead Instructor)',
  teacherAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  enrolledStudentsCount: 42,
  presentStudentsCount: 38,
  status: 'live_lesson',
  scheduledTime: '10:00 AM UTC',
  lessonOutline: [
    { id: 'topic_1', topic: 'WebRTC PeerConnection negotiation & SDP offer/answer exchanges', durationMinutes: 15, isCompleted: true },
    { id: 'topic_2', topic: 'SFU (Selective Forwarding Unit) architecture vs P2P Mesh at scale', durationMinutes: 20, isCompleted: true },
    { id: 'topic_3', topic: 'Lattice-based ML-KEM Post-Quantum session keys in active video pipelines', durationMinutes: 25, isCompleted: false },
    { id: 'topic_4', topic: 'Real-time AI Gemini live transcription and multi-language translation', durationMinutes: 15, isCompleted: false }
  ],
  attendanceLedger: [
    {
      studentProfileId: 'prof_marcus_vance',
      studentName: 'Marcus Vance',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      status: 'present',
      joinTime: '10:01 AM',
      attentionScorePercent: 96,
      certificateIssued: false
    },
    {
      studentProfileId: 'prof_elena_rostova',
      studentName: 'Dr. Elena Rostova',
      studentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      status: 'present',
      joinTime: '10:00 AM',
      attentionScorePercent: 99,
      certificateIssued: false
    },
    {
      studentProfileId: 'prof_david_okafor',
      studentName: 'David Okafor',
      studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      status: 'late',
      joinTime: '10:14 AM',
      attentionScorePercent: 88,
      certificateIssued: false
    }
  ],
  activeQuiz: {
    id: 'quiz_lesson_6',
    question: 'Why is an SFU architecture preferred over P2P full mesh for group calls exceeding 6 participants?',
    options: [
      'SFU consumes fewer server resources than MCU while eliminating the exponential N*(N-1) uplink bitrate bottleneck of P2P',
      'SFU converts video directly to text to reduce bandwidth',
      'P2P requires post-quantum encryption while SFU does not',
      'SFU relies exclusively on centralized telephone numbers'
    ],
    correctOptionIndex: 0,
    timeRemainingSec: 45,
    studentAnswers: [
      { studentId: 'prof_marcus_vance', selectedIndex: 0, isCorrect: true },
      { studentId: 'prof_elena_rostova', selectedIndex: 0, isCorrect: true }
    ]
  },
  whiteboardSnapshots: [
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
  ]
};

export const SEED_LIVE_TRANSCRIPTS: AiMeetingLiveTranscriptItem[] = [
  {
    id: 'tr_01',
    meetingId: 'room_boardroom_alpha',
    speakerProfileId: 'prof_alex_rivers',
    speakerName: 'Alex Rivers',
    speakerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    timestamp: '14:05',
    originalText: 'Welcome everyone. Today we are signing off on the enterprise deployment for Meridian Capital and reviewing our sub-10ms real-time audio/video relay architecture.',
    detectedLanguage: 'en',
    translations: {
      es: 'Bienvenidos a todos. Hoy aprobamos el despliegue empresarial para Meridian Capital.',
      fr: 'Bienvenue à tous. Aujourd’hui, nous validons le déploiement d’entreprise.',
      zh: '欢迎大家。今天我们将签署 Meridian Capital 的企业部署协议。',
      de: 'Willkommen an alle. Heute unterzeichnen wir die Unternehmensbereitstellung.'
    },
    sentiment: 'action_driven'
  },
  {
    id: 'tr_02',
    meetingId: 'room_boardroom_alpha',
    speakerProfileId: 'prof_sarah_chen',
    speakerName: 'Sarah Chen',
    speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    timestamp: '14:08',
    originalText: 'Our security and risk officers completed the Post-Quantum Kyber-1024 audit. The cryptographic proofs were verified with zero vulnerabilities.',
    detectedLanguage: 'en',
    translations: {
      es: 'Nuestros oficiales de seguridad completaron la auditoría cuántica Kyber-1024.',
      fr: 'Nos responsables de la sécurité ont terminé l’audit quantique.',
      zh: '我们的安全主管已完成后量子 Kyber-1024 审计。'
    },
    sentiment: 'positive'
  },
  {
    id: 'tr_03',
    meetingId: 'room_boardroom_alpha',
    speakerProfileId: 'prof_elena_rostova',
    speakerName: 'Dr. Elena Rostova',
    speakerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    timestamp: '14:12',
    originalText: 'We can now proceed to execute the $120,000 annual contract directly through OMNI Finance OS with automated escrow settlement.',
    detectedLanguage: 'en',
    translations: {
      es: 'Ahora podemos proceder a ejecutar el contrato anual de $120,000 en OMNI Finance OS.',
      fr: 'Nous pouvons maintenant exécuter le contrat annuel de 120 000 $.'
    },
    sentiment: 'action_driven'
  }
];

export const SEED_MEETING_ACTION_ITEMS: AiMeetingActionItem[] = [
  {
    id: 'act_01',
    meetingId: 'room_boardroom_alpha',
    taskTitle: 'Execute $120,000 Meridian Capital invoice and escrow transfer in OMNI Finance OS',
    assigneeProfileId: 'prof_sarah_chen',
    assigneeName: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    dueDate: 'Tomorrow, 5:00 PM',
    priority: 'urgent',
    crmSynced: true,
    status: 'in_progress'
  },
  {
    id: 'act_02',
    meetingId: 'room_boardroom_alpha',
    taskTitle: 'Publish verified Post-Quantum cryptographic audit whitepaper to OMNI Developer Docs',
    assigneeProfileId: 'prof_elena_rostova',
    assigneeName: 'Dr. Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    dueDate: 'Friday, 12:00 PM',
    priority: 'high',
    crmSynced: false,
    status: 'pending'
  },
  {
    id: 'act_03',
    meetingId: 'room_boardroom_alpha',
    taskTitle: 'Provision 500 enterprise seat tokens on Meridian primary custom domain',
    assigneeProfileId: 'prof_alex_rivers',
    assigneeName: 'Alex Rivers',
    assigneeAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    dueDate: 'End of week',
    priority: 'medium',
    crmSynced: true,
    status: 'pending'
  }
];

export const SEED_EXECUTIVE_DIGEST: AiMeetingExecutiveDigest = {
  meetingId: 'room_boardroom_alpha',
  generatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  executiveSummary: 'The Board concluded the review of the Q3 Enterprise Rollout. Meridian Capital completed all cryptographic and SLA validation steps for their $120k contract. Media infrastructure performance across 10,000-viewer load tests passed all sub-10ms latency thresholds.',
  keyAgreements: [
    'Meridian Capital security audit approved with 100% compliance',
    'Escrow settlement for $120k scheduled via OMNI Finance OS double-entry ledger',
    'WebRTC SFU edge relay nodes operational in US-East, EU-Central, and AP-East',
    'Enterprise DLP auto-watermarking active on all shared presentation screens'
  ],
  blockersAndRisks: [
    'Ensure custom domain DNS SSL certificates auto-renew without manual intervention'
  ],
  overallSentiment: 'optimistic',
  sentimentScorePercent: 94,
  topicsDiscussed: [
    { topic: 'Meridian Capital Enterprise Contract ($120k)', durationMinutes: 12 },
    { topic: 'Post-Quantum Lattice-Based Key Verification', durationMinutes: 8 },
    { topic: 'Global SFU Media Relay Edge Scaling', durationMinutes: 5 }
  ],
  crmFollowUpNotes: 'Meridian Capital deal ready to transition to Closed Won ($120,000). Automated contract generated.',
  crmLeadStageRecommended: 'closed_won'
};

export const SEED_CLOUD_RECORDINGS: OmniCloudRecording[] = [
  {
    id: 'rec_cloud_01',
    tenantId: 'tenant_global_01',
    meetingId: 'room_boardroom_alpha',
    roomTitle: 'Executive Strategic Architecture & Enterprise Governance',
    hostProfileId: 'prof_alex_rivers',
    hostName: 'Alex Rivers',
    durationSeconds: 3240,
    fileSizeBytes: 840000000, // 840 MB
    cloudStorageUrl: 'https://cdn.omni.network/recordings/rec_cloud_01.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    resolution: '1080p',
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 89).toISOString(), // 90 days
    isPasswordProtected: false,
    accessPermission: 'organization',
    viewCount: 142,
    downloadCount: 18,
    smartChapters: [
      { timestampSec: 0, title: 'Opening & Architecture Agenda' },
      { timestampSec: 720, title: 'Post-Quantum Kyber-1024 Security Review' },
      { timestampSec: 1800, title: 'Meridian Capital $120k Contract Terms' },
      { timestampSec: 2700, title: 'Q&A and Escrow Approval' }
    ],
    sha256ProofHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'rec_cloud_02',
    tenantId: 'tenant_global_01',
    meetingId: 'class_learn_ts_advanced',
    roomTitle: 'OMNI Learn: High-Performance Distributed Systems (Lesson 5)',
    hostProfileId: 'prof_alex_rivers',
    hostName: 'Alex Rivers',
    durationSeconds: 2700,
    fileSizeBytes: 620000000,
    cloudStorageUrl: 'https://cdn.omni.network/recordings/rec_cloud_02.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    resolution: '1080p',
    recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(),
    isPasswordProtected: true,
    passcode: 'LEARN2026',
    accessPermission: 'invited_only',
    viewCount: 88,
    downloadCount: 12,
    smartChapters: [
      { timestampSec: 0, title: 'Introduction to Distributed State Machines' },
      { timestampSec: 900, title: 'Raft Consensus vs Paxos' },
      { timestampSec: 2100, title: 'Hands-on Lab Exercise' }
    ],
    sha256ProofHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
  }
];

export const SEED_MEDIA_ADMIN_POLICIES: MediaPlatformAdminPolicies = {
  maxMeetingDurationMinutes: 240,
  maxParticipantsStandard: 100,
  maxParticipantsEnterprise: 1000,
  maxWebinarAudience: 10000,
  e2eeMandatoryForEnterprise: true,
  cloudRecordingRetentionDays: 90,
  autoTranscribeAllMeetings: true,
  watermarkScreenshares: true,
  tenantCloudStorageQuotaGb: 2048,
  tenantCloudStorageUsedGb: 486.5,
  totalBandwidthConsumedGb: 12450,
  activeConcurrentRooms: 14
};
