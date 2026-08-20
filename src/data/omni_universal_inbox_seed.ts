// ============================================================================
// OMNI UNIVERSAL INBOX & EXTERNAL COMMUNICATION GATEWAY — SEED DATA
// ============================================================================

import {
  ChannelAdapterConfig,
  UniversalConversation,
  UniversalMessage,
  InboxTeamAgent,
  InboxAutomationRule,
  BroadcastCampaign,
  UniversalInboxAnalytics,
  GatewayAuditLog,
  GatewaySecurityPolicy
} from '../types/omni_universal_inbox';

// ----------------------------------------------------------------------------
// 1. CHANNEL ADAPTER CONFIGURATIONS
// ----------------------------------------------------------------------------

export const SEED_CHANNEL_ADAPTERS: ChannelAdapterConfig[] = [
  {
    id: 'adapter_whatsapp_001',
    channelType: 'whatsapp',
    providerName: 'Meta WhatsApp Business Cloud API',
    displayName: 'OMNI Official WhatsApp Gateway',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:14:22Z',
    uptimePercent: 99.98,
    credentials: {
      apiKeyMasked: 'waba_live_••••••••••••••••••••9F3A',
      webhookUrl: 'https://gateway.omni.network/api/v1/webhooks/whatsapp/inbound',
      webhookSecretMasked: 'whsec_••••••••••••••••••••881B',
      senderIdentifier: '+1 (800) 555-0199 (Verified WABA)',
      rateLimitPerMinute: 1200
    },
    metrics: {
      inboundTotal: 34820,
      outboundTotal: 41290,
      errorCount24h: 3,
      avgLatencyMs: 142
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: true,
      supportsVoiceNotes: true,
      supportsQuickReplies: true
    }
  },
  {
    id: 'adapter_email_002',
    channelType: 'email',
    providerName: 'SendGrid & IMAP Dual Ingress',
    displayName: 'Support & Sales Email Router',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:15:01Z',
    uptimePercent: 100.0,
    credentials: {
      apiKeyMasked: 'SG.live_••••••••••••••••••••72C4',
      webhookUrl: 'https://gateway.omni.network/api/v1/webhooks/email/inbound',
      webhookSecretMasked: 'emsec_••••••••••••••••••••331A',
      senderIdentifier: 'support@omni.network / sales@omni.network',
      rateLimitPerMinute: 3000
    },
    metrics: {
      inboundTotal: 58910,
      outboundTotal: 62400,
      errorCount24h: 0,
      avgLatencyMs: 98
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: false,
      supportsVoiceNotes: false,
      supportsQuickReplies: false
    }
  },
  {
    id: 'adapter_instagram_003',
    channelType: 'instagram',
    providerName: 'Meta Graph API v20.0',
    displayName: 'Instagram Direct Inbox',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:12:45Z',
    uptimePercent: 99.85,
    credentials: {
      apiKeyMasked: 'EAAB••••••••••••••••••••D812',
      webhookUrl: 'https://gateway.omni.network/api/v1/webhooks/instagram/inbound',
      webhookSecretMasked: 'igsec_••••••••••••••••••••091A',
      senderIdentifier: '@omni.ecosystem (Verified)',
      rateLimitPerMinute: 600
    },
    metrics: {
      inboundTotal: 19430,
      outboundTotal: 18120,
      errorCount24h: 12,
      avgLatencyMs: 210
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: false,
      supportsReadReceipts: true,
      supportsTypingIndicator: true,
      supportsVoiceNotes: true,
      supportsQuickReplies: true
    }
  },
  {
    id: 'adapter_sms_004',
    channelType: 'sms',
    providerName: 'Twilio 10DLC Carrier Network',
    displayName: 'SMS Toll-Free & Shortcode Router',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:13:30Z',
    uptimePercent: 99.95,
    credentials: {
      apiKeyMasked: 'AC_live_••••••••••••••••••••44F1',
      webhookUrl: 'https://gateway.omni.network/api/v1/webhooks/sms/inbound',
      webhookSecretMasked: 'twsec_••••••••••••••••••••220D',
      senderIdentifier: '+1 (888) 902-OMNI (Shortcode 88201)',
      rateLimitPerMinute: 2400
    },
    metrics: {
      inboundTotal: 14200,
      outboundTotal: 29800,
      errorCount24h: 2,
      avgLatencyMs: 115
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: false,
      supportsVoiceNotes: false,
      supportsQuickReplies: false
    }
  },
  {
    id: 'adapter_webchat_005',
    channelType: 'website_chat',
    providerName: 'OMNI WebSocket Real-time Edge SDK',
    displayName: 'Website Embeddable Live Chat',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:15:10Z',
    uptimePercent: 100.0,
    credentials: {
      apiKeyMasked: 'omni_ws_live_••••••••••••••••••••555A',
      webhookUrl: 'wss://edge.omni.network/chat/stream/v1',
      webhookSecretMasked: 'ws_sec_••••••••••••••••••••999Z',
      senderIdentifier: 'OMNI Web Widget (omni.network)',
      rateLimitPerMinute: 5000
    },
    metrics: {
      inboundTotal: 42100,
      outboundTotal: 48900,
      errorCount24h: 0,
      avgLatencyMs: 24
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: true,
      supportsVoiceNotes: true,
      supportsQuickReplies: true
    }
  },
  {
    id: 'adapter_facebook_006',
    channelType: 'facebook',
    providerName: 'Meta Messenger Platform',
    displayName: 'Facebook Page Messenger Hub',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:09:18Z',
    uptimePercent: 99.91,
    credentials: {
      apiKeyMasked: 'FB_PAGE_••••••••••••••••••••663A',
      webhookUrl: 'https://gateway.omni.network/api/v1/webhooks/facebook/inbound',
      webhookSecretMasked: 'fbsec_••••••••••••••••••••774B',
      senderIdentifier: 'facebook.com/omniecosystem',
      rateLimitPerMinute: 800
    },
    metrics: {
      inboundTotal: 8400,
      outboundTotal: 9150,
      errorCount24h: 5,
      avgLatencyMs: 188
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: true,
      supportsVoiceNotes: true,
      supportsQuickReplies: true
    }
  },
  {
    id: 'adapter_telegram_007',
    channelType: 'telegram',
    providerName: 'Telegram Bot API v7.2',
    displayName: 'Telegram Official Customer Bot',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:14:50Z',
    uptimePercent: 99.99,
    credentials: {
      apiKeyMasked: 'bot6789••••••••••••••••••••G7H8',
      webhookUrl: 'https://gateway.omni.network/api/v1/webhooks/telegram/inbound',
      webhookSecretMasked: 'tgsec_••••••••••••••••••••451F',
      senderIdentifier: '@OmniNetworkCareBot',
      rateLimitPerMinute: 1800
    },
    metrics: {
      inboundTotal: 11200,
      outboundTotal: 12400,
      errorCount24h: 1,
      avgLatencyMs: 82
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: true,
      supportsVoiceNotes: true,
      supportsQuickReplies: true
    }
  },
  {
    id: 'adapter_omni_008',
    channelType: 'omni_messenger',
    providerName: 'OMNI Native P2P & Sovereign Chat',
    displayName: 'Native OMNI Messenger Bridge',
    isActive: true,
    healthStatus: 'active',
    lastSyncAt: '2026-08-20T10:15:15Z',
    uptimePercent: 100.0,
    credentials: {
      apiKeyMasked: 'omni_internal_core_mesh',
      webhookUrl: 'omni://internal/connect/messenger',
      webhookSecretMasked: 'internal_sovereign_key',
      senderIdentifier: 'OMNI Universal Passport Network',
      rateLimitPerMinute: 20000
    },
    metrics: {
      inboundTotal: 98400,
      outboundTotal: 105200,
      errorCount24h: 0,
      avgLatencyMs: 12
    },
    capabilities: {
      supportsRichMedia: true,
      supportsTemplates: true,
      supportsReadReceipts: true,
      supportsTypingIndicator: true,
      supportsVoiceNotes: true,
      supportsQuickReplies: true
    }
  }
];

// ----------------------------------------------------------------------------
// 2. INBOX TEAM AGENTS
// ----------------------------------------------------------------------------

export const SEED_INBOX_TEAM_AGENTS: InboxTeamAgent[] = [
  {
    id: 'agent_sarah_01',
    displayName: 'Sarah Jenkins',
    email: 'sarah.jenkins@omni.network',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'team_lead',
    team: 'VIP Concierge',
    isOnline: true,
    activeConversationsCount: 4,
    maxCapacity: 10,
    avgResponseTimeMin: 1.8,
    csatRating: 99.2
  },
  {
    id: 'agent_alex_02',
    displayName: 'Alex Chen',
    email: 'alex.chen@omni.network',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'sales_rep',
    team: 'Enterprise Sales',
    isOnline: true,
    activeConversationsCount: 6,
    maxCapacity: 12,
    avgResponseTimeMin: 2.4,
    csatRating: 97.8
  },
  {
    id: 'agent_elena_03',
    displayName: 'Elena Rostova',
    email: 'elena.rostova@omni.network',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'support_agent',
    team: 'Tier 1 Support',
    isOnline: true,
    activeConversationsCount: 5,
    maxCapacity: 15,
    avgResponseTimeMin: 3.1,
    csatRating: 95.4
  },
  {
    id: 'agent_marcus_04',
    displayName: 'Marcus Sterling',
    email: 'marcus.s@omni.network',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    team: 'Billing & Accounts',
    isOnline: true,
    activeConversationsCount: 2,
    maxCapacity: 8,
    avgResponseTimeMin: 1.2,
    csatRating: 100.0
  }
];

// ----------------------------------------------------------------------------
// 3. UNIVERSAL CONVERSATIONS & MESSAGES
// ----------------------------------------------------------------------------

export const SEED_UNIVERSAL_CONVERSATIONS: UniversalConversation[] = [
  {
    id: 'conv_wa_101',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'whatsapp',
    externalConversationId: 'wamid.HBgLMTQxNTU1NTAxOTk=',
    customer: {
      id: 'cust_wa_9901',
      displayName: 'Dr. Tariq Al-Mansoor',
      handleOrIdentifier: '+971 50 849 2201',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      location: 'Dubai, UAE',
      isVerified: true,
      timezone: 'GST (UTC+4)'
    },
    assignedAgentId: 'agent_sarah_01',
    assignedAgentName: 'Sarah Jenkins',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'VIP Concierge',
    status: 'open',
    priority: 'urgent',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T11:30:00Z',
    firstResponseDueAt: '2026-08-20T10:35:00Z',
    firstResponseTimeSeconds: 45,
    tags: ['VIP Platinum', 'Enterprise Trial', 'Multi-Currency Settlement', 'Wharton Alumni'],
    internalNotes: [
      {
        id: 'note_101_1',
        authorId: 'agent_marcus_04',
        authorName: 'Marcus Sterling',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        note: 'Dr. Tariq is expanding his healthcare group into 4 GCC countries. Requested dedicated settlement gateway for AED & SAR.',
        createdAt: '2026-08-20T09:40:00Z'
      }
    ],
    crm: {
      contactId: 'cnt_crm_8801',
      contactName: 'Dr. Tariq Al-Mansoor',
      contactEmail: 'tariq.mansoor@medilink.ae',
      contactPhone: '+971 50 849 2201',
      customerTier: 'VIP Platinum',
      lifetimeValueUsd: 148500,
      leadStatus: 'qualified',
      leadScore: 96,
      dealId: 'deal_gcc_001',
      dealTitle: 'Enterprise GCC Treasury Expansion',
      dealValueUsd: 250000,
      dealStage: 'Contract',
      recentOrderId: 'ord_med_771',
      recentOrderTotalUsd: 12500,
      recentOrderStatus: 'delivered',
      ticketId: 'tkt_vip_402',
      ticketPriority: 'P1_Urgent',
      ticketStatus: 'in_progress'
    },
    aiAnalysis: {
      summary: 'VIP client Dr. Tariq is confirming custom API keys for Dubai branch deployment and asking about instant AED payout windows.',
      sentiment: 'positive',
      sentimentScore: 88,
      intent: 'pricing_request',
      keyEntities: ['GCC Treasury Expansion', 'AED Settlement', 'Custom API Keys', 'Contract Execution'],
      recommendedNextAction: 'Send pre-filled enterprise agreement with 0.15% FX corridor terms and schedule 15-min technical onboarding with Marcus.',
      confidenceScore: 97,
      draftFollowUpSnippet: 'Dear Dr. Tariq, our GCC settlement node is fully provisioned. I have attached the instant AED payout SLA schedule for your review.',
      suggestedReplies: [
        {
          id: 'rep_1',
          label: 'Send SLA & Setup Link',
          tone: 'professional',
          text: 'Hello Dr. Tariq, our GCC Treasury node supports instantaneous AED/SAR settlement. I have unlocked your Sandbox credentials and attached the VIP SLA document.'
        },
        {
          id: 'rep_2',
          label: 'Executive Greeting + Meet',
          tone: 'empathetic',
          text: 'Pleasure hearing from you again Dr. Tariq! We are thrilled to support your Gulf expansion. Let me coordinate an immediate technical call with Marcus.'
        },
        {
          id: 'rep_3',
          label: 'Direct Pricing Confirmation',
          tone: 'sales_focused',
          text: 'Confirmed Dr. Tariq. The custom 0.15% corridor rate has been locked in for your Medilink entity. We are ready to execute the master agreement.'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'WhatsApp Business QR Verification',
    consentTimestamp: '2026-01-15T08:12:00Z',
    unreadCount: 1,
    lastMessageSnippet: 'Can your team confirm if we can enable AED instant batch settlement by this Friday?',
    lastMessageAt: '2026-08-20T10:14:10Z',
    createdAt: '2026-08-19T14:20:00Z'
  },
  {
    id: 'conv_email_102',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'email',
    externalConversationId: '<msg.489201.omni.support@sendgrid.net>',
    customer: {
      id: 'cust_em_4412',
      displayName: 'Claire Beauchamp',
      handleOrIdentifier: 'claire@highland-logistics.co.uk',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      location: 'Edinburgh, UK',
      isVerified: true,
      timezone: 'BST (UTC+1)'
    },
    assignedAgentId: 'agent_alex_02',
    assignedAgentName: 'Alex Chen',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'Enterprise Sales',
    status: 'open',
    priority: 'high',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T12:00:00Z',
    firstResponseDueAt: '2026-08-20T11:00:00Z',
    firstResponseTimeSeconds: 120,
    tags: ['Supply Chain', 'ERP Integration', 'UK & EU B2B', 'Inbound Lead'],
    internalNotes: [
      {
        id: 'note_102_1',
        authorId: 'agent_alex_02',
        authorName: 'Alex Chen',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        note: 'Highland Logistics has 1,200 fleet drivers. Looking to replace legacy SAP EDI with OMNI Universal Inbox & Webhook adapters.',
        createdAt: '2026-08-20T08:15:00Z'
      }
    ],
    crm: {
      contactId: 'cnt_crm_3310',
      contactName: 'Claire Beauchamp',
      contactEmail: 'claire@highland-logistics.co.uk',
      customerTier: 'Enterprise',
      lifetimeValueUsd: 85000,
      leadStatus: 'proposal_sent',
      leadScore: 91,
      dealId: 'deal_logistics_88',
      dealTitle: 'Highland Fleet 1200 Driver Integration',
      dealValueUsd: 180000,
      dealStage: 'Demo'
    },
    aiAnalysis: {
      summary: 'Inquiry regarding webhook latency guarantees and ISO20022 compliance for cross-border freight settlements.',
      sentiment: 'positive',
      sentimentScore: 79,
      intent: 'technical_support',
      keyEntities: ['ISO20022 Compliance', 'Webhook Latency', 'Highland Logistics', '1200 Driver Fleets'],
      recommendedNextAction: 'Share OMNI Developer API sandbox docs and security audit certification.',
      confidenceScore: 94,
      draftFollowUpSnippet: 'Hi Claire, OMNI Gateway guarantees <30ms webhook latency with full ISO20022 message formatting out of the box.',
      suggestedReplies: [
        {
          id: 'rep_email_1',
          label: 'Send Technical Documentation',
          tone: 'professional',
          text: 'Hi Claire, thank you for reaching out. OMNI Universal Gateway provides sub-50ms webhook delivery with native ISO20022 payload compliance. I have attached our SOC2 Type II report and architecture diagram.'
        },
        {
          id: 'rep_email_2',
          label: 'Demo Invitation',
          tone: 'sales_focused',
          text: 'Hello Claire, we would love to walk your engineering leadership through our EDI-to-Webhook migration accelerator. Would Thursday 2 PM BST work for a 30-min demo?'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'Inbound Contact Form Double Opt-In',
    consentTimestamp: '2026-08-18T11:00:00Z',
    unreadCount: 0,
    lastMessageSnippet: 'Can you provide the cryptographic signature verification specification for inbound webhooks?',
    lastMessageAt: '2026-08-20T09:30:15Z',
    createdAt: '2026-08-18T10:50:00Z'
  },
  {
    id: 'conv_ig_103',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'instagram',
    externalConversationId: 'ig_thread_7719280',
    customer: {
      id: 'cust_ig_3910',
      displayName: 'Aria Montell (Creator & Stylist)',
      handleOrIdentifier: '@ariamontell_style',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      location: 'Milan, Italy',
      isVerified: true,
      timezone: 'CET (UTC+1)'
    },
    assignedAgentId: 'agent_sarah_01',
    assignedAgentName: 'Sarah Jenkins',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'VIP Concierge',
    status: 'open',
    priority: 'medium',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T14:00:00Z',
    firstResponseDueAt: '2026-08-20T11:30:00Z',
    firstResponseTimeSeconds: 65,
    tags: ['Creator Space', 'Influencer (450k)', 'Digital Goods Storefront', 'Affiliate'],
    internalNotes: [],
    crm: {
      contactId: 'cnt_crm_7701',
      contactName: 'Aria Montell',
      customerTier: 'Gold',
      lifetimeValueUsd: 18400,
      leadStatus: 'contacted',
      leadScore: 84
    },
    aiAnalysis: {
      summary: 'Influencer with 450k followers wants to sell exclusive Milan Fashion Week masterclass passes using OMNI Social Store & IG Direct automation.',
      sentiment: 'very_positive',
      sentimentScore: 94,
      intent: 'purchase_inquiry',
      keyEntities: ['Creator Space', 'Milan Fashion Week Masterclass', 'Instagram Direct Shop', 'Instant Checkout'],
      recommendedNextAction: 'Enable OMNI Creator Store on her handle and send 1-click checkout setup guide.',
      confidenceScore: 98,
      draftFollowUpSnippet: 'Ciao Aria! We can enable instant Instagram DM checkout for your Milan Masterclass with zero friction for your followers.',
      suggestedReplies: [
        {
          id: 'rep_ig_1',
          label: 'Creator Store Onboarding',
          tone: 'empathetic',
          text: 'Ciao Aria! Absolutely loving your Fashion Week previews. We can link your OMNI Creator Store directly to your IG Direct so followers buy masterclass passes without leaving the app!'
        },
        {
          id: 'rep_ig_2',
          label: 'Quick Link Delivery',
          tone: 'concise',
          text: 'Hey Aria! Here is your custom merchant link: omni.space/ariamontell. It takes 2 minutes to publish your masterclass tickets.'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'Instagram Messaging Direct Interaction',
    consentTimestamp: '2026-08-19T18:20:00Z',
    unreadCount: 2,
    lastMessageSnippet: 'Hey team OMNI! Can I sell my Fashion Week masterclass tickets directly inside Instagram DMs using your checkout widget?',
    lastMessageAt: '2026-08-20T10:05:00Z',
    createdAt: '2026-08-19T18:15:00Z'
  },
  {
    id: 'conv_webchat_104',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'website_chat',
    externalConversationId: 'ws_sess_99014432',
    customer: {
      id: 'cust_web_1204',
      displayName: 'Kenji Takahashi',
      handleOrIdentifier: 'Visitor #9901 (kenji@sakura-fintech.jp)',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      location: 'Tokyo, Japan',
      isVerified: false,
      timezone: 'JST (UTC+9)'
    },
    assignedAgentId: 'agent_elena_03',
    assignedAgentName: 'Elena Rostova',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'Tier 1 Support',
    status: 'open',
    priority: 'urgent',
    slaState: 'warning',
    slaDeadlineAt: '2026-08-20T10:45:00Z',
    firstResponseDueAt: '2026-08-20T10:20:00Z',
    firstResponseTimeSeconds: 15,
    tags: ['Live Visitor', 'Pricing & Tokenomics', 'Japanese Localization', 'Hot Lead'],
    internalNotes: [
      {
        id: 'note_104_1',
        authorId: 'agent_elena_03',
        authorName: 'Elena Rostova',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        note: 'Customer is on the enterprise pricing page. Asked if JPY multi-currency settlement is supported with Japanese Yen bank rails.',
        createdAt: '2026-08-20T10:10:00Z'
      }
    ],
    crm: {
      contactId: 'cnt_crm_9921',
      contactName: 'Kenji Takahashi',
      contactEmail: 'kenji@sakura-fintech.jp',
      customerTier: 'Enterprise',
      leadStatus: 'new',
      leadScore: 89,
      dealValueUsd: 75000
    },
    aiAnalysis: {
      summary: 'Japanese fintech CTO evaluating OMNI multi-currency bank rails (Zengin network) and inquiring about compliance in Japan.',
      sentiment: 'positive',
      sentimentScore: 85,
      intent: 'pricing_request',
      keyEntities: ['JPY Settlement', 'Zengin Rail', 'Tokyo Japan', 'JFSA Compliance'],
      recommendedNextAction: 'Confirm native JPY settlement and offer immediate AI live Japanese translation in chat.',
      confidenceScore: 99,
      draftFollowUpSnippet: 'Konnichiwa Takahashi-san! OMNI natively supports JPY bank payouts via Zengin network with complete JFSA compliance.',
      suggestedReplies: [
        {
          id: 'rep_web_1',
          label: 'Japanese Confirmation',
          tone: 'professional',
          text: 'Konnichiwa Takahashi-san! Yes, OMNI natively settles in Japanese Yen (JPY) with direct Zengin banking connections. We are fully compliant with FSA guidelines.'
        },
        {
          id: 'rep_web_2',
          label: 'Schedule Local Rep',
          tone: 'sales_focused',
          text: 'Hello Kenji, our Asia-Pacific Director in Tokyo would be delighted to host a localized walkthrough. May we book 20 minutes with your engineering team?'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'Website Cookie & Live Chat Terms Accepted',
    consentTimestamp: '2026-08-20T10:08:00Z',
    unreadCount: 1,
    lastMessageSnippet: 'Does OMNI Connect provide native Zengin system connectivity for Japanese corporate bank accounts?',
    lastMessageAt: '2026-08-20T10:12:30Z',
    createdAt: '2026-08-20T10:08:00Z'
  },
  {
    id: 'conv_sms_105',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'sms',
    externalConversationId: 'SMb489028102910',
    customer: {
      id: 'cust_sms_5502',
      displayName: 'Pastor David Olatunji',
      handleOrIdentifier: '+234 803 555 9012',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      location: 'Lagos, Nigeria',
      isVerified: true,
      timezone: 'WAT (UTC+1)'
    },
    assignedAgentId: 'agent_marcus_04',
    assignedAgentName: 'Marcus Sterling',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'Billing & Accounts',
    status: 'open',
    priority: 'medium',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T13:00:00Z',
    firstResponseDueAt: '2026-08-20T10:45:00Z',
    firstResponseTimeSeconds: 40,
    tags: ['Organisation Space', 'Faith Community', 'Donation Ledger', 'Nigeria & US'],
    internalNotes: [],
    crm: {
      contactId: 'cnt_crm_1109',
      contactName: 'Pastor David Olatunji',
      customerTier: 'Silver',
      lifetimeValueUsd: 32000,
      recentOrderId: 'ord_tithe_8819',
      recentOrderTotalUsd: 4500,
      recentOrderStatus: 'delivered',
      ticketId: 'tkt_org_201',
      ticketPriority: 'P3_Normal',
      ticketStatus: 'resolved'
    },
    aiAnalysis: {
      summary: 'Pastor David wants to verify automated SMS broadcast receipts for his 8,500 congregation members before Sunday service.',
      sentiment: 'positive',
      sentimentScore: 90,
      intent: 'general_feedback',
      keyEntities: ['SMS Broadcast', 'Congregation 8500', 'Sunday Service', 'Nigerian Carrier Routes'],
      recommendedNextAction: 'Verify 100% 10DLC and DND delivery bypass on Nigerian carrier routes (MTN, Airtel).',
      confidenceScore: 96,
      draftFollowUpSnippet: 'Pastor David, your SMS broadcast route has been verified with 99.8% instant carrier delivery for Sunday service.',
      suggestedReplies: [
        {
          id: 'rep_sms_1',
          label: 'Broadcast Route Confirmed',
          tone: 'empathetic',
          text: 'Greetings Pastor David! Your congregation broadcast queue is tested and primed for Sunday. All MTN, Airtel, and Glo routes have active priority delivery.'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'SMS KEYWORD "OMNI" Opt-In',
    consentTimestamp: '2026-02-10T14:30:00Z',
    unreadCount: 0,
    lastMessageSnippet: 'Thank you team OMNI for setting up our Sunday broadcast schedule. Blessings!',
    lastMessageAt: '2026-08-20T08:45:00Z',
    createdAt: '2026-08-19T09:00:00Z'
  },
  {
    id: 'conv_tg_106',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'telegram',
    externalConversationId: 'tg_user_8849102',
    customer: {
      id: 'cust_tg_4482',
      displayName: 'Viktor Smirnov (@viktor_dev)',
      handleOrIdentifier: '@viktor_dev',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      location: 'Berlin, Germany',
      isVerified: true,
      timezone: 'CEST (UTC+2)'
    },
    assignedAgentId: 'agent_alex_02',
    assignedAgentName: 'Alex Chen',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'Enterprise Sales',
    status: 'pending',
    priority: 'low',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T18:00:00Z',
    firstResponseDueAt: '2026-08-20T12:00:00Z',
    tags: ['Developer', 'Web3 / Stablecoins', 'Telegram Bot', 'Community Moderator'],
    internalNotes: [],
    crm: {
      contactId: 'cnt_crm_6621',
      contactName: 'Viktor Smirnov',
      customerTier: 'Standard',
      lifetimeValueUsd: 8400,
      leadStatus: 'contacted',
      leadScore: 72
    },
    aiAnalysis: {
      summary: 'Developer asking how to deploy a Telegram bot adapter directly into an OMNI Space channel for auto-publishing GitHub releases.',
      sentiment: 'neutral',
      sentimentScore: 70,
      intent: 'feature_request',
      keyEntities: ['Telegram Bot Adapter', 'GitHub Webhooks', 'Developer API', 'OMNI Spaces'],
      recommendedNextAction: 'Send GitHub Actions webhook guide and link to developer documentation.',
      confidenceScore: 92,
      draftFollowUpSnippet: 'Hi Viktor, you can connect GitHub webhooks straight to your OMNI Telegram bot adapter via the Integration Gateway.',
      suggestedReplies: [
        {
          id: 'rep_tg_1',
          label: 'Send GitHub Webhook Guide',
          tone: 'concise',
          text: 'Hi Viktor! Yes, you can pipe GitHub release webhooks directly into your OMNI Space Telegram channel. Check out: docs.omni.network/integrations/telegram-github'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'Telegram /start command',
    consentTimestamp: '2026-08-17T16:00:00Z',
    unreadCount: 0,
    lastMessageSnippet: 'Is there a rate limit on the Telegram webhook ingress when pushing 500 events per minute?',
    lastMessageAt: '2026-08-20T07:15:00Z',
    createdAt: '2026-08-17T15:50:00Z'
  },
  {
    id: 'conv_fb_107',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'facebook',
    externalConversationId: 'fb_mid_88192039',
    customer: {
      id: 'cust_fb_1002',
      displayName: 'Gabriela Silva',
      handleOrIdentifier: 'fb.me/gabriela.silva.rio',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      location: 'Rio de Janeiro, Brazil',
      isVerified: false,
      timezone: 'BRT (UTC-3)'
    },
    assignedAgentId: 'agent_elena_03',
    assignedAgentName: 'Elena Rostova',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'Tier 1 Support',
    status: 'resolved',
    priority: 'low',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T16:00:00Z',
    firstResponseDueAt: '2026-08-20T09:00:00Z',
    tags: ['Portuguese Support', 'Social Commerce', 'Pix Settlement', 'Resolved'],
    internalNotes: [],
    crm: {
      contactId: 'cnt_crm_8840',
      contactName: 'Gabriela Silva',
      customerTier: 'Standard',
      lifetimeValueUsd: 1450,
      recentOrderId: 'ord_pix_9912',
      recentOrderTotalUsd: 180,
      recentOrderStatus: 'delivered',
      ticketId: 'tkt_fb_109',
      ticketStatus: 'resolved'
    },
    aiAnalysis: {
      summary: 'Customer inquiring about Pix instant payment confirmation on Facebook Messenger store. Confirmed instant receipt.',
      sentiment: 'very_positive',
      sentimentScore: 96,
      intent: 'billing_question',
      keyEntities: ['Pix Payment', 'Brazil', 'Instant Confirmation', 'Order #9912'],
      recommendedNextAction: 'Ticket resolved; trigger automated CSAT survey.',
      confidenceScore: 98,
      draftFollowUpSnippet: 'Tudo certo Gabriela! Seu pagamento via Pix foi confirmado com sucesso.',
      suggestedReplies: [
        {
          id: 'rep_fb_1',
          label: 'Portuguese Thank You',
          tone: 'empathetic',
          text: 'Obrigada Gabriela! Seu comprovante Pix já está disponível no app. Qualquer dúvida estamos sempre à disposição!'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'Facebook Messenger Get Started Button',
    consentTimestamp: '2026-08-19T13:00:00Z',
    unreadCount: 0,
    lastMessageSnippet: 'Perfeito! Já recebi a confirmação do Pix no meu email. Muito obrigada pelo suporte rápido!',
    lastMessageAt: '2026-08-20T06:30:00Z',
    createdAt: '2026-08-19T12:45:00Z'
  },
  {
    id: 'conv_omni_108',
    tenantId: 'tenant_primary_001',
    sourceChannel: 'omni_messenger',
    externalConversationId: 'omni_msg_p2p_99382',
    customer: {
      id: 'cust_omni_001',
      displayName: 'Ambassador Kwame Nkrumah',
      handleOrIdentifier: 'kwame@un-pan-africa.org (OMNI Passport ID: omni://kwame.omni)',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      location: 'Accra, Ghana',
      isVerified: true,
      timezone: 'GMT (UTC+0)'
    },
    assignedAgentId: 'agent_marcus_04',
    assignedAgentName: 'Marcus Sterling',
    assignedAgentAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    assignedTeam: 'VIP Concierge',
    status: 'open',
    priority: 'urgent',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T11:00:00Z',
    firstResponseDueAt: '2026-08-20T10:30:00Z',
    firstResponseTimeSeconds: 20,
    tags: ['Ecosystem Partner', 'Pan-African Trade', 'OMNI Passport Verified', 'High Level'],
    internalNotes: [
      {
        id: 'note_108_1',
        authorId: 'agent_marcus_04',
        authorName: 'Marcus Sterling',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        note: 'Ambassador Kwame is connecting AfCFTA cross-border SME traders with OMNI Universal Inbox for multi-currency trade facilitation.',
        createdAt: '2026-08-20T09:00:00Z'
      }
    ],
    crm: {
      contactId: 'cnt_crm_kwame',
      contactName: 'Ambassador Kwame Nkrumah',
      customerTier: 'Enterprise',
      lifetimeValueUsd: 500000,
      dealId: 'deal_afcfta_01',
      dealTitle: 'AfCFTA 10,000 SME Universal Gateway',
      dealValueUsd: 1200000,
      dealStage: 'Contract'
    },
    aiAnalysis: {
      summary: 'Ambassador Kwame wants to confirm zero-data-leakage compliance for trade documents shared across the OMNI Native Bridge.',
      sentiment: 'positive',
      sentimentScore: 92,
      intent: 'partnership',
      keyEntities: ['AfCFTA Trade', 'OMNI Native Bridge', 'Zero Data Retention', 'Encrypted Ingress'],
      recommendedNextAction: 'Provide sovereign Merkle audit certification for bilateral trade documents.',
      confidenceScore: 99,
      draftFollowUpSnippet: 'Your Excellency, all trade documents routed via OMNI Native Bridge carry sovereign quantum-resistant end-to-end encryption.',
      suggestedReplies: [
        {
          id: 'rep_omni_1',
          label: 'Diplomatic & Sovereign Confirmation',
          tone: 'professional',
          text: 'Your Excellency Ambassador Kwame, we are honored to collaborate. OMNI Native Bridge enforces absolute cryptographic data sovereignty with zero third-party leakage.'
        }
      ],
      requiresHumanReview: true
    },
    optInConsent: 'opted_in',
    consentSource: 'OMNI Sovereign Passport Biometric Handshake',
    consentTimestamp: '2026-01-01T00:00:00Z',
    unreadCount: 1,
    lastMessageSnippet: 'Can we confirm the bilateral sovereign audit protocol for the initial batch of 500 Ghanaian exporters tomorrow?',
    lastMessageAt: '2026-08-20T10:13:00Z',
    createdAt: '2026-08-19T08:00:00Z'
  }
];

// ----------------------------------------------------------------------------
// 4. DETAILED MESSAGES HISTORY PER CONVERSATION
// ----------------------------------------------------------------------------

export const SEED_UNIVERSAL_MESSAGES: Record<string, UniversalMessage[]> = {
  conv_wa_101: [
    {
      id: 'msg_wa_101_1',
      conversationId: 'conv_wa_101',
      sourceChannel: 'whatsapp',
      senderType: 'customer',
      senderId: 'cust_wa_9901',
      senderName: 'Dr. Tariq Al-Mansoor',
      direction: 'inbound',
      body: 'Marhaban Sarah! We are preparing to onboard 14 private clinics across Dubai and Abu Dhabi onto the OMNI Commerce node.',
      deliveryStatus: 'read',
      createdAt: '2026-08-20T09:30:00Z'
    },
    {
      id: 'msg_wa_101_2',
      conversationId: 'conv_wa_101',
      sourceChannel: 'whatsapp',
      senderType: 'agent',
      senderId: 'agent_sarah_01',
      senderName: 'Sarah Jenkins',
      senderAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      direction: 'outbound',
      body: 'Marhaban Dr. Tariq! Wonderful to hear. We have reserved dedicated AED/SAR liquidity pools for Medilink to guarantee zero FX slippage.',
      deliveryStatus: 'read',
      createdAt: '2026-08-20T09:32:15Z'
    },
    {
      id: 'msg_wa_101_3',
      conversationId: 'conv_wa_101',
      sourceChannel: 'whatsapp',
      senderType: 'customer',
      senderId: 'cust_wa_9901',
      senderName: 'Dr. Tariq Al-Mansoor',
      direction: 'inbound',
      body: 'Can your team confirm if we can enable AED instant batch settlement by this Friday? Our CFO needs the signed SLA schedule.',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T10:14:10Z'
    }
  ],
  conv_email_102: [
    {
      id: 'msg_em_102_1',
      conversationId: 'conv_email_102',
      sourceChannel: 'email',
      senderType: 'customer',
      senderId: 'cust_em_4412',
      senderName: 'Claire Beauchamp',
      direction: 'inbound',
      body: 'Hello Alex, following up on our discussion regarding Highland Logistics fleet dispatch. We need to integrate real-time webhook events with our dispatch software.',
      deliveryStatus: 'read',
      createdAt: '2026-08-20T08:00:00Z'
    },
    {
      id: 'msg_em_102_2',
      conversationId: 'conv_email_102',
      sourceChannel: 'email',
      senderType: 'agent',
      senderId: 'agent_alex_02',
      senderName: 'Alex Chen',
      senderAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      direction: 'outbound',
      body: 'Hi Claire, thank you for reaching out. OMNI Universal Gateway provides sub-50ms webhook delivery with native ISO20022 payload compliance.',
      deliveryStatus: 'read',
      createdAt: '2026-08-20T08:20:00Z'
    },
    {
      id: 'msg_em_102_3',
      conversationId: 'conv_email_102',
      sourceChannel: 'email',
      senderType: 'customer',
      senderId: 'cust_em_4412',
      senderName: 'Claire Beauchamp',
      direction: 'inbound',
      body: 'Can you provide the cryptographic signature verification specification for inbound webhooks so our security architect can audit the payload verification?',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T09:30:15Z'
    }
  ],
  conv_ig_103: [
    {
      id: 'msg_ig_103_1',
      conversationId: 'conv_ig_103',
      sourceChannel: 'instagram',
      senderType: 'customer',
      senderId: 'cust_ig_3910',
      senderName: 'Aria Montell',
      direction: 'inbound',
      body: 'Hey team OMNI! Can I sell my Fashion Week masterclass tickets directly inside Instagram DMs using your checkout widget?',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T10:05:00Z'
    }
  ],
  conv_webchat_104: [
    {
      id: 'msg_web_104_1',
      conversationId: 'conv_webchat_104',
      sourceChannel: 'website_chat',
      senderType: 'customer',
      senderId: 'cust_web_1204',
      senderName: 'Kenji Takahashi',
      direction: 'inbound',
      body: 'Does OMNI Connect provide native Zengin system connectivity for Japanese corporate bank accounts?',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T10:12:30Z'
    }
  ],
  conv_sms_105: [
    {
      id: 'msg_sms_105_1',
      conversationId: 'conv_sms_105',
      sourceChannel: 'sms',
      senderType: 'customer',
      senderId: 'cust_sms_5502',
      senderName: 'Pastor David Olatunji',
      direction: 'inbound',
      body: 'Thank you team OMNI for setting up our Sunday broadcast schedule. Blessings!',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T08:45:00Z'
    }
  ],
  conv_tg_106: [
    {
      id: 'msg_tg_106_1',
      conversationId: 'conv_tg_106',
      sourceChannel: 'telegram',
      senderType: 'customer',
      senderId: 'cust_tg_4482',
      senderName: 'Viktor Smirnov',
      direction: 'inbound',
      body: 'Is there a rate limit on the Telegram webhook ingress when pushing 500 events per minute?',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T07:15:00Z'
    }
  ],
  conv_fb_107: [
    {
      id: 'msg_fb_107_1',
      conversationId: 'conv_fb_107',
      sourceChannel: 'facebook',
      senderType: 'customer',
      senderId: 'cust_fb_1002',
      senderName: 'Gabriela Silva',
      direction: 'inbound',
      body: 'Perfeito! Já recebi a confirmação do Pix no meu email. Muito obrigada pelo suporte rápido!',
      deliveryStatus: 'read',
      createdAt: '2026-08-20T06:30:00Z'
    }
  ],
  conv_omni_108: [
    {
      id: 'msg_omni_108_1',
      conversationId: 'conv_omni_108',
      sourceChannel: 'omni_messenger',
      senderType: 'customer',
      senderId: 'cust_omni_001',
      senderName: 'Ambassador Kwame Nkrumah',
      direction: 'inbound',
      body: 'Can we confirm the bilateral sovereign audit protocol for the initial batch of 500 Ghanaian exporters tomorrow?',
      deliveryStatus: 'delivered',
      createdAt: '2026-08-20T10:13:00Z'
    }
  ]
};

// ----------------------------------------------------------------------------
// 5. INBOX AUTOMATION RULES
// ----------------------------------------------------------------------------

export const SEED_INBOX_AUTOMATION_RULES: InboxAutomationRule[] = [
  {
    id: 'auto_rule_vip_001',
    title: 'VIP Customer Fast-Track Routing',
    description: 'Instantly routes customers with lifetime value > $50,000 to Sarah Jenkins in VIP Concierge and flags priority as Urgent.',
    isActive: true,
    trigger: 'vip_customer_contacted',
    conditions: {
      customerTierFilter: ['VIP Platinum', 'Enterprise']
    },
    actions: [
      {
        type: 'assign_to_team',
        params: { team: 'VIP Concierge' }
      },
      {
        type: 'escalate_priority',
        params: { priority: 'urgent', slaMinutes: 30 }
      },
      {
        type: 'add_tags',
        params: { tags: ['VIP Auto-Escalated', 'Priority Queue'] }
      }
    ],
    executionCountTotal: 412,
    lastExecutedAt: '2026-08-20T10:14:10Z'
  },
  {
    id: 'auto_rule_lead_002',
    title: 'Inbound Sales Lead Auto-Sync to CRM',
    description: 'When a new message arrives inquiring about pricing, create a qualified CRM deal and assign to Enterprise Sales.',
    isActive: true,
    trigger: 'keyword_match',
    conditions: {
      keywordContains: ['pricing', 'enterprise quote', 'demo', 'contract', 'settlement rate']
    },
    actions: [
      {
        type: 'create_crm_lead',
        params: { defaultPipelineStage: 'qualified', notifySlack: true }
      },
      {
        type: 'assign_to_team',
        params: { team: 'Enterprise Sales' }
      }
    ],
    executionCountTotal: 1890,
    lastExecutedAt: '2026-08-20T10:05:00Z'
  },
  {
    id: 'auto_rule_afterhours_003',
    title: 'Smart After-Hours Auto-Responder with SLA Notice',
    description: 'During quiet hours (22:00 - 08:00 UTC), sends an intelligent multi-language receipt and logs next-morning SLA schedule.',
    isActive: true,
    trigger: 'after_hours_message',
    conditions: {
      channelFilter: ['whatsapp', 'email', 'sms', 'facebook', 'instagram']
    },
    actions: [
      {
        type: 'send_automated_template',
        params: { templateId: 'tpl_after_hours_warm_reception' }
      }
    ],
    executionCountTotal: 724,
    lastExecutedAt: '2026-08-20T04:12:00Z'
  },
  {
    id: 'auto_rule_sla_004',
    title: 'SLA Breach Auto-Escalation & Manager Alert',
    description: 'When first response timer exceeds 80% of SLA window, alerts team leads and elevates ticket priority to P1.',
    isActive: true,
    trigger: 'sla_breach_warning',
    conditions: {},
    actions: [
      {
        type: 'escalate_priority',
        params: { priority: 'urgent' }
      },
      {
        type: 'notify_webhook_or_slack',
        params: { channel: '#inbox-sla-alerts' }
      }
    ],
    executionCountTotal: 29,
    lastExecutedAt: '2026-08-19T21:40:00Z'
  },
  {
    id: 'auto_rule_sentiment_005',
    title: 'Frustrated / Churn Risk Immediate Supervisor Intercept',
    description: 'Triggers when AI Copilot flags sentiment score < 30 or detects keywords indicating churn or cancellation.',
    isActive: true,
    trigger: 'sentiment_negative',
    conditions: {
      keywordContains: ['cancel subscription', 'terrible', 'unacceptable', 'dispute charge', 'refund immediately']
    },
    actions: [
      {
        type: 'assign_to_agent',
        params: { agentId: 'agent_marcus_04' }
      },
      {
        type: 'add_tags',
        params: { tags: ['Churn Risk', 'Supervisor Review'] }
      }
    ],
    executionCountTotal: 84,
    lastExecutedAt: '2026-08-18T16:20:00Z'
  }
];

// ----------------------------------------------------------------------------
// 6. BROADCAST CAMPAIGNS & CONSENT
// ----------------------------------------------------------------------------

export const SEED_BROADCAST_CAMPAIGNS: BroadcastCampaign[] = [
  {
    id: 'camp_001_enterprise_treasury',
    title: 'GCC & Europe Instant Multi-Currency Settlement Launch',
    targetChannel: 'whatsapp',
    status: 'completed',
    templateName: 'waba_enterprise_gcc_announcement',
    messageContent: 'Dear Valued Partner, OMNI Treasury has enabled instant zero-slippage AED, SAR, and EUR corridors. Check your portal for updated liquidity routes.',
    sentAt: '2026-08-19T08:00:00Z',
    audienceFilter: {
      tag: 'VIP Platinum',
      customerTier: 'Enterprise',
      verifiedOptInOnly: true
    },
    metrics: {
      targetedRecipients: 4200,
      sentCount: 4200,
      deliveredCount: 4188,
      readCount: 3950,
      clickedCount: 2840,
      optOutCount: 1
    },
    consentEnforced: true
  },
  {
    id: 'camp_002_creator_masterclass',
    title: 'Creator Studio: Monetizing Live Streams & Storefronts',
    targetChannel: 'email',
    status: 'completed',
    templateName: 'email_creator_masterclass_aug2026',
    messageContent: 'Discover how top creators generate 5x higher revenue with OMNI Social Store and direct IG DM checkout integrations.',
    sentAt: '2026-08-18T14:00:00Z',
    audienceFilter: {
      tag: 'Creator Space',
      verifiedOptInOnly: true
    },
    metrics: {
      targetedRecipients: 18500,
      sentCount: 18500,
      deliveredCount: 18420,
      readCount: 11200,
      clickedCount: 5410,
      optOutCount: 12
    },
    consentEnforced: true
  },
  {
    id: 'camp_003_sms_flash_update',
    title: 'Security Advisory: Quantum-Resistant Passkeys Enabled',
    targetChannel: 'sms',
    status: 'scheduled',
    templateName: 'sms_security_update_passkeys',
    messageContent: 'OMNI Alert: Quantum-resistant passkeys are now active on your OMNI Passport. No action needed. Reply STOP to opt out.',
    scheduledAt: '2026-08-21T09:00:00Z',
    audienceFilter: {
      customerTier: 'VIP Platinum',
      verifiedOptInOnly: true
    },
    metrics: {
      targetedRecipients: 9200,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      clickedCount: 0,
      optOutCount: 0
    },
    consentEnforced: true
  }
];

// ----------------------------------------------------------------------------
// 7. INBOX ANALYTICS & CONVERSION METRICS
// ----------------------------------------------------------------------------

export const SEED_INBOX_ANALYTICS: UniversalInboxAnalytics = {
  timeframe: '30d',
  totalConversations: 184500,
  activeOpenConversations: 142,
  resolvedConversations: 184358,
  medianFirstResponseTimeSec: 42,
  medianResolutionTimeMin: 6.4,
  csatScorePercent: 98.4,
  slaAttainmentPercent: 99.1,
  volumeByChannel: [
    { channel: 'whatsapp', count: 54200, percent: 29.4 },
    { channel: 'email', count: 48900, percent: 26.5 },
    { channel: 'website_chat', count: 35100, percent: 19.0 },
    { channel: 'instagram', count: 21800, percent: 11.8 },
    { channel: 'sms', count: 12400, percent: 6.7 },
    { channel: 'telegram', count: 8200, percent: 4.4 },
    { channel: 'facebook', count: 3900, percent: 2.2 }
  ],
  sentimentBreakdown: {
    positivePercent: 84.6,
    neutralPercent: 12.8,
    negativePercent: 2.6
  },
  salesPipelineInfluencedUsd: 8450000,
  dealsClosedFromChatCount: 142
};

// ----------------------------------------------------------------------------
// 8. GATEWAY SECURITY POLICY & AUDIT LOGS
// ----------------------------------------------------------------------------

export const SEED_GATEWAY_SECURITY_POLICY: GatewaySecurityPolicy = {
  tenantId: 'tenant_primary_001',
  maskPIIEnabled: true,
  enforceDoubleOptInForWhatsApp: true,
  enforceQuietHours: true,
  quietHoursStartUtc: '22:00',
  quietHoursEndUtc: '08:00',
  aiAutoSendBlocked: true, // Strict human-in-the-loop protection
  dlpSensitiveDataFilter: true,
  ipWhitelistEnabled: true
};

export const SEED_GATEWAY_AUDIT_LOGS: GatewayAuditLog[] = [
  {
    id: 'aud_gtw_001',
    timestamp: '2026-08-20T10:14:10Z',
    actor: 'Meta WhatsApp Ingress Node #4',
    action: 'INBOUND_MESSAGE_AUTHENTICATED',
    channel: 'whatsapp',
    details: 'HMAC SHA-256 signature verified for wamid.HBgLMTQxNTU1NTAxOTk=',
    ipAddress: '157.240.22.35',
    status: 'success'
  },
  {
    id: 'aud_gtw_002',
    timestamp: '2026-08-20T10:12:30Z',
    actor: 'OMNI Edge WebSocket Cluster',
    action: 'SESSION_CONNECTED',
    channel: 'website_chat',
    details: 'Live chat session #99014432 initiated from Tokyo (TLS 1.3)',
    ipAddress: '133.242.18.91',
    status: 'success'
  },
  {
    id: 'aud_gtw_003',
    timestamp: '2026-08-20T09:30:15Z',
    actor: 'SendGrid Webhook Dispatcher',
    action: 'EMAIL_INGRESS_PROCESSED',
    channel: 'email',
    details: 'DKIM & SPF pass for claire@highland-logistics.co.uk',
    ipAddress: '167.89.115.42',
    status: 'success'
  },
  {
    id: 'aud_gtw_004',
    timestamp: '2026-08-20T08:20:00Z',
    actor: 'AI Copilot Shield',
    action: 'AUTO_SEND_PREVENTED_BY_POLICY',
    channel: 'email',
    details: 'Draft reply held for human agent review (Alex Chen) per Safety Governance Rule #1',
    ipAddress: '127.0.0.1 (Internal Mesh)',
    status: 'warning'
  }
];
