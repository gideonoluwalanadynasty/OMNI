/**
 * OMNI CUSTOMER RELATIONSHIP OPERATING SYSTEM — SEED DATA
 * Connects OMNI Contacts, Graph, Messenger, Finance, Marketplace & AI.
 */

import {
  Customer360Profile,
  CrmDeal,
  CrmCompany,
  CrmTask,
  CrmTicket,
  BusinessInboxConversation,
  BusinessAutomationWorkflow,
  CustomerJourneyTemplate,
  AiBusinessChatMessage,
  CrmExecutiveAnalytics,
  CrmAdminGovernance
} from '../types/omni_crm';

// ============================================================================
// 1. CUSTOMER 360 PROFILES
// ============================================================================

export const SEED_CUSTOMER_360_PROFILES: Customer360Profile[] = [
  {
    id: 'cust-360-001',
    passportUid: 'usr-oxford-vivienne-8841',
    displayName: 'Dr. Vivienne Vance',
    handle: '@dr_vivienne',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'v.vance@oxford-quantum.ac.uk',
    phone: '+44 20 7946 0912',
    title: 'Director of Cryptographic Research',
    companyName: 'Oxford Quantum Computing Lab',
    location: 'Oxford, United Kingdom',
    timezone: 'Europe/London (GMT+1)',
    languages: ['English (Native)', 'French (Fluent)', 'German (Conversational)'],
    verificationStatus: 'verified_human',
    reputationScore: 948,
    lifecycleStage: 'vip_advocate',
    customerTier: 'enterprise_institutional',
    leadSource: 'virtual_event',
    firstAcquiredDate: '2025-11-14T09:00:00Z',
    lastActiveDate: '2026-08-20T10:15:00Z',
    lifetimeValueUsd: 148500,
    totalOrdersCount: 14,
    averageOrderValueUsd: 10607,
    outstandingBalanceUsd: 0,
    creditScoreInternal: 820,
    orders: [
      {
        id: 'ord-8812',
        orderNumber: 'OMNI-ORD-8812',
        date: '2026-08-10T14:20:00Z',
        amountUsd: 24500,
        status: 'delivered',
        itemsSummary: '50x Titanium Zero-Knowledge Key Rings + Enterprise SDK'
      },
      {
        id: 'ord-7901',
        orderNumber: 'OMNI-ORD-7901',
        date: '2026-05-18T11:00:00Z',
        amountUsd: 45000,
        status: 'completed',
        itemsSummary: 'Quantum Auth Server Licence (Annual)'
      }
    ],
    payments: [
      {
        id: 'pay-901',
        reference: 'TX-OMNI-PAY-901842',
        date: '2026-08-10T14:21:30Z',
        amountUsd: 24500,
        rail: 'usdc_sovereign',
        status: 'settled'
      },
      {
        id: 'pay-811',
        reference: 'TX-OMNI-BANK-811902',
        date: '2026-05-18T11:05:00Z',
        amountUsd: 45000,
        rail: 'omni_pay',
        status: 'settled'
      }
    ],
    coursesEnrolled: [
      {
        id: 'course-zk-01',
        title: 'Zero-Knowledge Cryptography & Sovereign Auth Masterclass',
        progressPercent: 100,
        certificateIssued: true,
        lastAccessedAt: '2026-06-20T16:00:00Z'
      }
    ],
    eventsAttended: [
      {
        id: 'evt-summit-26',
        title: 'OMNI Global Sovereign Cryptography Summit 2026',
        date: '2026-07-15T09:00:00Z',
        attendanceType: 'in_person_summit',
        checkedIn: true
      },
      {
        id: 'evt-webinar-44',
        title: 'Post-Quantum Encryption Standards Webinar',
        date: '2026-04-10T14:00:00Z',
        attendanceType: 'live_webinar',
        checkedIn: true
      }
    ],
    communitiesJoined: [
      {
        id: 'space-zk-research',
        spaceName: 'Zero-Knowledge Research Guild',
        role: 'moderator',
        contributionsCount: 142
      },
      {
        id: 'space-oxford-alumni',
        spaceName: 'Oxford Sovereign Tech Alliance',
        role: 'founder',
        contributionsCount: 89
      }
    ],
    conversationsHistory: [
      {
        id: 'conv-9901',
        channel: 'OMNI Messenger',
        lastMessage: 'All 50 hardware units successfully paired with our laboratory server cluster.',
        date: '2026-08-12T11:45:00Z',
        sentiment: 'positive'
      }
    ],
    supportTickets: [],
    interactions: [
      {
        id: 'int-001',
        crmContactId: 'cust-360-001',
        channel: 'webrtc_meeting',
        direction: 'outbound',
        subject: 'Annual Enterprise Expansion & Multi-Site Deployment',
        summary: 'Met with Dr. Vivienne and the Oxford Dean of Computing. Reviewed Q4 hardware delivery schedule.',
        sentiment: 'positive',
        actorName: 'Alexander Hayes',
        actorRole: 'VP of Enterprise Partnerships',
        timestamp: '2026-08-15T14:00:00Z',
        durationMinutes: 45
      }
    ],
    tasks: [
      {
        id: 'task-001',
        title: 'Send Q4 Institutional Deployment Quote ($120k)',
        description: 'Prepare formal multi-sig escrow contract for 200 additional hardware keys.',
        priority: 'high',
        status: 'in_progress',
        dueDate: '2026-08-25',
        assignedAgentId: 'agent-alexander-01',
        assignedAgentName: 'Alexander Hayes',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        linkedEntity: {
          type: 'deal',
          id: 'deal-001',
          name: 'Oxford Quantum Lab Expansion'
        },
        reminderEnabled: true,
        createdAt: '2026-08-16T10:00:00Z'
      }
    ],
    notes: [
      {
        id: 'note-001',
        authorId: 'agent-alexander-01',
        authorName: 'Alexander Hayes',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Dr. Vivienne confirmed budget allocation approval from UKRI grant for additional ZK-hardware rollout.',
        isPinned: true,
        tags: ['Key Decision Maker', 'Institutional Budget Approved', 'ZK-Hardware'],
        createdAt: '2026-08-15T15:30:00Z'
      }
    ],
    consent: {
      marketingEmailOptIn: true,
      smsAlertsOptIn: true,
      directMessageOptIn: true,
      dataProcessingGdprAccepted: true,
      consentGivenAt: '2025-11-14T09:05:00Z',
      consentSource: 'Event Registration Form - Sovereign Summit'
    },
    aiIntelligence: {
      leadScore: 98,
      ratingTier: 'hot',
      conversionProbabilityPct: 94,
      buyingIntentScore: 96,
      churnRiskPct: 2,
      keyInterestArchetypes: ['Physical Hardware', 'Enterprise Support', 'Institutional Escrow'],
      recommendedNextAction: 'Dispatch formal multi-sig proposal with volume tier discount before August 25.',
      aiJustification: 'High interaction frequency, flawless payment history across 14 settled orders, 100% course completion, active community moderator.',
      suggestedOffers: ['Enterprise Multi-Seat Hardware Bundle (20% Off)', 'Custom On-Premises Cryptographic Node Service'],
      lastAnalyzedAt: '2026-08-20T08:30:00Z'
    }
  },
  {
    id: 'cust-360-002',
    passportUid: 'usr-apex-marcus-7721',
    displayName: 'Marcus Sterling',
    handle: '@marcus_sterling',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'm.sterling@apex-sovereign.ch',
    phone: '+41 22 819 3300',
    title: 'Managing Partner & CIO',
    companyName: 'Apex Sovereign Capital AG',
    location: 'Geneva, Switzerland',
    timezone: 'Europe/Zurich (GMT+2)',
    languages: ['English', 'German', 'Italian'],
    verificationStatus: 'verified_business',
    reputationScore: 915,
    lifecycleStage: 'qualified_opportunity',
    customerTier: 'platinum_vip',
    leadSource: 'omni_messages',
    firstAcquiredDate: '2026-01-20T14:30:00Z',
    lastActiveDate: '2026-08-19T18:40:00Z',
    lifetimeValueUsd: 85000,
    totalOrdersCount: 6,
    averageOrderValueUsd: 14166,
    outstandingBalanceUsd: 0,
    creditScoreInternal: 790,
    orders: [
      {
        id: 'ord-7102',
        orderNumber: 'OMNI-ORD-7102',
        date: '2026-06-05T10:15:00Z',
        amountUsd: 35000,
        status: 'delivered',
        itemsSummary: 'Sovereign Multi-Family Treasury Setup Pass'
      }
    ],
    payments: [
      {
        id: 'pay-710',
        reference: 'TX-OMNI-PAY-710921',
        date: '2026-06-05T10:17:00Z',
        amountUsd: 35000,
        rail: 'usdc_sovereign',
        status: 'settled'
      }
    ],
    coursesEnrolled: [],
    eventsAttended: [
      {
        id: 'evt-davos-26',
        title: 'Sovereign Wealth & Autonomous Finance Roundtable',
        date: '2026-05-12T16:00:00Z',
        attendanceType: 'in_person_summit',
        checkedIn: true
      }
    ],
    communitiesJoined: [
      {
        id: 'space-family-office',
        spaceName: 'Global Family Office Treasury Network',
        role: 'active_member',
        contributionsCount: 34
      }
    ],
    conversationsHistory: [
      {
        id: 'conv-8812',
        channel: 'WhatsApp Enterprise',
        lastMessage: 'We would like to onboard 4 Swiss fund managers onto the OMNI Finance settlement rail.',
        date: '2026-08-19T18:40:00Z',
        sentiment: 'positive'
      }
    ],
    supportTickets: [],
    interactions: [
      {
        id: 'int-002',
        crmContactId: 'cust-360-002',
        channel: 'whatsapp',
        direction: 'inbound',
        subject: 'Institutional Treasury Onboarding Inquiry',
        summary: 'Marcus sent requirements for Swiss FINMA compliance reporting on OMNI Payments.',
        sentiment: 'positive',
        actorName: 'Marcus Sterling',
        actorRole: 'Managing Partner',
        timestamp: '2026-08-19T18:40:00Z'
      }
    ],
    tasks: [
      {
        id: 'task-002',
        title: 'Schedule FINMA Compliance Briefing with Legal',
        description: 'Provide Marcus with the OMNI Swiss regulatory sandbox whitepaper.',
        priority: 'urgent',
        status: 'todo',
        dueDate: '2026-08-21',
        assignedAgentId: 'agent-sophia-02',
        assignedAgentName: 'Sophia Lin',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        linkedEntity: {
          type: 'deal',
          id: 'deal-002',
          name: 'Apex Sovereign Multi-Fund Rail Integration'
        },
        reminderEnabled: true,
        createdAt: '2026-08-19T19:00:00Z'
      }
    ],
    notes: [
      {
        id: 'note-002',
        authorId: 'agent-sophia-02',
        authorName: 'Sophia Lin',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        content: 'Deal size potential exceeds $250k ARR if all 4 fund subsidiaries deploy before Q4 close.',
        isPinned: true,
        tags: ['Swiss Capital', 'Institutional Rail', 'High ARR'],
        createdAt: '2026-08-19T19:10:00Z'
      }
    ],
    consent: {
      marketingEmailOptIn: true,
      smsAlertsOptIn: false,
      directMessageOptIn: true,
      dataProcessingGdprAccepted: true,
      consentGivenAt: '2026-01-20T14:35:00Z',
      consentSource: 'OMNI Messenger Direct Verification'
    },
    aiIntelligence: {
      leadScore: 92,
      ratingTier: 'hot',
      conversionProbabilityPct: 88,
      buyingIntentScore: 94,
      churnRiskPct: 5,
      keyInterestArchetypes: ['Institutional Escrow', 'Multi-Sig Treasury', 'Regulatory Reporting'],
      recommendedNextAction: 'Execute FINMA compliance briefing and send customized $250k enterprise proposal.',
      aiJustification: 'Expressed clear buying intent in recent WhatsApp message, managing $1.2B AUM, zero invoice friction.',
      suggestedOffers: ['Institutional Tier SLA Upgrade', 'Dedicated Private Settlement Gateway'],
      lastAnalyzedAt: '2026-08-20T07:15:00Z'
    }
  },
  {
    id: 'cust-360-003',
    passportUid: 'usr-cyber-elena-9912',
    displayName: 'Elena Rostova',
    handle: '@elena_rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'elena@cybersec-academy.io',
    phone: '+49 30 555 0192',
    title: 'Lead Instructor & Founder',
    companyName: 'CyberSecurity Academy Berlin',
    location: 'Berlin, Germany',
    timezone: 'Europe/Berlin (GMT+2)',
    languages: ['German', 'English', 'Russian'],
    verificationStatus: 'verified_creator',
    reputationScore: 882,
    lifecycleStage: 'active_customer',
    customerTier: 'gold',
    leadSource: 'omni_marketplace',
    firstAcquiredDate: '2026-02-10T11:00:00Z',
    lastActiveDate: '2026-08-20T09:40:00Z',
    lifetimeValueUsd: 32000,
    totalOrdersCount: 8,
    averageOrderValueUsd: 4000,
    outstandingBalanceUsd: 0,
    creditScoreInternal: 760,
    orders: [
      {
        id: 'ord-6019',
        orderNumber: 'OMNI-ORD-6019',
        date: '2026-07-22T08:15:00Z',
        amountUsd: 9500,
        status: 'completed',
        itemsSummary: '100x Student Exam Passes & Verified Certificates'
      }
    ],
    payments: [
      {
        id: 'pay-601',
        reference: 'TX-OMNI-CARD-601912',
        date: '2026-07-22T08:16:00Z',
        amountUsd: 9500,
        rail: 'card',
        status: 'settled'
      }
    ],
    coursesEnrolled: [
      {
        id: 'course-sec-02',
        title: 'Advanced Threat Hunting & Autonomous Security',
        progressPercent: 95,
        certificateIssued: true,
        lastAccessedAt: '2026-08-14T20:00:00Z'
      }
    ],
    eventsAttended: [
      {
        id: 'evt-berlin-sec',
        title: 'Berlin DevCon 2026',
        date: '2026-06-18T10:00:00Z',
        attendanceType: 'in_person_summit',
        checkedIn: true
      }
    ],
    communitiesJoined: [
      {
        id: 'space-sec-devs',
        spaceName: 'European Security Educators Circle',
        role: 'moderator',
        contributionsCount: 67
      }
    ],
    conversationsHistory: [
      {
        id: 'conv-7702',
        channel: 'Email Gateway',
        lastMessage: 'Looking to integrate our LMS with the OMNI Course smart contract module for our Autumn cohort.',
        date: '2026-08-18T14:15:00Z',
        sentiment: 'positive'
      }
    ],
    supportTickets: [],
    interactions: [
      {
        id: 'int-003',
        crmContactId: 'cust-360-003',
        channel: 'email',
        direction: 'inbound',
        subject: 'Autumn Cohort LMS Smart Contract Integration',
        summary: 'Elena requested technical documentation for batch minting course completion badges.',
        sentiment: 'positive',
        actorName: 'Elena Rostova',
        actorRole: 'Founder',
        timestamp: '2026-08-18T14:15:00Z'
      }
    ],
    tasks: [
      {
        id: 'task-003',
        title: 'Send LMS API Webhook Guide & Batch Minting Demo',
        description: 'Provide developer guide for OMNI Connect course webhook listeners.',
        priority: 'normal',
        status: 'completed',
        dueDate: '2026-08-19',
        assignedAgentId: 'agent-david-03',
        assignedAgentName: 'David Mercer',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        linkedEntity: {
          type: 'contact',
          id: 'cust-360-003',
          name: 'Elena Rostova'
        },
        reminderEnabled: false,
        createdAt: '2026-08-18T15:00:00Z',
        completedAt: '2026-08-19T11:20:00Z'
      }
    ],
    notes: [
      {
        id: 'note-003',
        authorId: 'agent-david-03',
        authorName: 'David Mercer',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        content: 'Elena has 450 active students enrolled across 3 academies in Germany and Poland.',
        isPinned: false,
        tags: ['Education Sector', 'High Volume Passes', 'LMS Integration'],
        createdAt: '2026-08-18T16:00:00Z'
      }
    ],
    consent: {
      marketingEmailOptIn: true,
      smsAlertsOptIn: false,
      directMessageOptIn: true,
      dataProcessingGdprAccepted: true,
      consentGivenAt: '2026-02-10T11:05:00Z',
      consentSource: 'Marketplace Checkout Opt-In'
    },
    aiIntelligence: {
      leadScore: 84,
      ratingTier: 'warm',
      conversionProbabilityPct: 78,
      buyingIntentScore: 82,
      churnRiskPct: 8,
      keyInterestArchetypes: ['Course Passes', 'Smart Certificates', 'LMS Webhooks'],
      recommendedNextAction: 'Offer bulk semester pass discount (250+ passes at 15% off) before September 1.',
      aiJustification: 'Strong recurring purchase cadence ahead of university semester cycles, high educational engagement.',
      suggestedOffers: ['Campus Bulk License Pack', 'Co-Branded Space Moderation Suite'],
      lastAnalyzedAt: '2026-08-20T06:00:00Z'
    }
  },
  {
    id: 'cust-360-004',
    passportUid: 'usr-nexus-chen-6612',
    displayName: 'David Chen',
    handle: '@david_chen_hw',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'd.chen@nexus-hardware.sg',
    phone: '+65 6789 0123',
    title: 'Chief Hardware Architect',
    companyName: 'Nexus Hardware Labs Singapore',
    location: 'Singapore',
    timezone: 'Asia/Singapore (GMT+8)',
    languages: ['English', 'Mandarin Chinese'],
    verificationStatus: 'verified_business',
    reputationScore: 890,
    lifecycleStage: 'lead',
    leadSource: 'embedded_website_widget',
    customerTier: 'silver',
    firstAcquiredDate: '2026-08-01T04:20:00Z',
    lastActiveDate: '2026-08-20T02:15:00Z',
    lifetimeValueUsd: 4800,
    totalOrdersCount: 2,
    averageOrderValueUsd: 2400,
    outstandingBalanceUsd: 0,
    creditScoreInternal: 740,
    orders: [
      {
        id: 'ord-5521',
        orderNumber: 'OMNI-ORD-5521',
        date: '2026-08-05T06:00:00Z',
        amountUsd: 2400,
        status: 'delivered',
        itemsSummary: '10x Developer Key Evaluation Kits'
      }
    ],
    payments: [],
    coursesEnrolled: [],
    eventsAttended: [],
    communitiesJoined: [
      {
        id: 'space-sg-tech',
        spaceName: 'Singapore Hardware Innovators',
        role: 'active_member',
        contributionsCount: 12
      }
    ],
    conversationsHistory: [
      {
        id: 'conv-6612',
        channel: 'Website Chatbot',
        lastMessage: 'What is the lead time for 1,000 custom engraved Titanium NFC key rings with our corporate root certificate?',
        date: '2026-08-20T02:15:00Z',
        sentiment: 'urgent'
      }
    ],
    supportTickets: [],
    interactions: [
      {
        id: 'int-004',
        crmContactId: 'cust-360-004',
        channel: 'social_dm',
        direction: 'inbound',
        subject: 'Bulk Custom Engraving & Manufacturing Inquiry',
        summary: 'David reached out asking for pricing tiers for 1,000 units.',
        sentiment: 'urgent',
        actorName: 'David Chen',
        actorRole: 'Chief Hardware Architect',
        timestamp: '2026-08-20T02:15:00Z'
      }
    ],
    tasks: [
      {
        id: 'task-004',
        title: 'Prepare 1,000 Unit Hardware Manufacturing Quote',
        description: 'Calculate BOM and custom firmware flashing cost for Singapore delivery.',
        priority: 'urgent',
        status: 'todo',
        dueDate: '2026-08-21',
        assignedAgentId: 'agent-alexander-01',
        assignedAgentName: 'Alexander Hayes',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        linkedEntity: {
          type: 'deal',
          id: 'deal-003',
          name: 'Nexus Hardware Labs 1k Unit Deployment'
        },
        reminderEnabled: true,
        createdAt: '2026-08-20T03:00:00Z'
      }
    ],
    notes: [
      {
        id: 'note-004',
        authorId: 'agent-alexander-01',
        authorName: 'Alexander Hayes',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'David stated they are standardizing their engineering fleet on OMNI NFC authenticators.',
        isPinned: true,
        tags: ['Singapore', 'Hardware Manufacturing', 'High Urgency'],
        createdAt: '2026-08-20T03:15:00Z'
      }
    ],
    consent: {
      marketingEmailOptIn: true,
      smsAlertsOptIn: true,
      directMessageOptIn: true,
      dataProcessingGdprAccepted: true,
      consentGivenAt: '2026-08-01T04:25:00Z',
      consentSource: 'Embedded Website Chat Lead Capture'
    },
    aiIntelligence: {
      leadScore: 91,
      ratingTier: 'hot',
      conversionProbabilityPct: 86,
      buyingIntentScore: 95,
      churnRiskPct: 4,
      keyInterestArchetypes: ['Physical Hardware', 'Custom Firmware', 'Logistics'],
      recommendedNextAction: 'Trigger urgent sales outreach with tier-priced manufacturing proposal within 2 hours.',
      aiJustification: 'Inquired specifically about 1,000 unit production run after testing 10 evaluation kits with 100% positive feedback.',
      suggestedOffers: ['Tier 3 Volume Hardware Discount ($85k total)', 'Free Express Air Freight to Singapore'],
      lastAnalyzedAt: '2026-08-20T05:30:00Z'
    }
  },
  {
    id: 'cust-360-005',
    passportUid: 'usr-oasis-sophia-5511',
    displayName: 'Sophia Al-Mansoor',
    handle: '@sophia_almansoor',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 's.mansoor@gulf-fintech.ae',
    phone: '+971 4 312 9000',
    title: 'Head of Digital Innovation',
    companyName: 'Gulf FinTech Oasis Dubai',
    location: 'Dubai, United Arab Emirates',
    timezone: 'Asia/Dubai (GMT+4)',
    languages: ['Arabic', 'English'],
    verificationStatus: 'verified_human',
    reputationScore: 960,
    lifecycleStage: 'active_customer',
    customerTier: 'enterprise_institutional',
    leadSource: 'referral',
    firstAcquiredDate: '2025-10-05T08:00:00Z',
    lastActiveDate: '2026-08-20T07:10:00Z',
    lifetimeValueUsd: 210000,
    totalOrdersCount: 18,
    averageOrderValueUsd: 11666,
    outstandingBalanceUsd: 0,
    creditScoreInternal: 840,
    orders: [],
    payments: [],
    coursesEnrolled: [],
    eventsAttended: [],
    communitiesJoined: [],
    conversationsHistory: [],
    supportTickets: [],
    interactions: [],
    tasks: [],
    notes: [],
    consent: {
      marketingEmailOptIn: true,
      smsAlertsOptIn: true,
      directMessageOptIn: true,
      dataProcessingGdprAccepted: true,
      consentGivenAt: '2025-10-05T08:10:00Z',
      consentSource: 'Executive Partner Referral'
    },
    aiIntelligence: {
      leadScore: 95,
      ratingTier: 'hot',
      conversionProbabilityPct: 92,
      buyingIntentScore: 90,
      churnRiskPct: 1,
      keyInterestArchetypes: ['Cross-Border Escrow', 'Islamic Finance Compliance', 'Institutional Multi-Sig'],
      recommendedNextAction: 'Schedule quarterly executive business review with Dubai innovation council.',
      aiJustification: 'Consistently high deal throughput, premier institutional backing in UAE freezone.',
      suggestedOffers: ['Regional Co-Branded Accelerator Space', 'Sovereign AED/USD Currency Oracle Node'],
      lastAnalyzedAt: '2026-08-20T08:00:00Z'
    }
  },
  {
    id: 'cust-360-006',
    passportUid: 'usr-emerald-liam-4401',
    displayName: 'Liam O’Connor',
    handle: '@liam_emerald',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    email: 'liam@emerald-media.ie',
    phone: '+353 1 496 0123',
    title: 'Creative Director & Podcaster',
    companyName: 'Emerald Media Dublin',
    location: 'Dublin, Ireland',
    timezone: 'Europe/Dublin (GMT+1)',
    languages: ['English', 'Irish'],
    verificationStatus: 'verified_creator',
    reputationScore: 820,
    lifecycleStage: 'at_risk_churn',
    customerTier: 'standard',
    leadSource: 'omni_ads',
    firstAcquiredDate: '2026-03-12T10:00:00Z',
    lastActiveDate: '2026-08-01T15:20:00Z',
    lifetimeValueUsd: 1200,
    totalOrdersCount: 3,
    averageOrderValueUsd: 400,
    outstandingBalanceUsd: 85,
    creditScoreInternal: 680,
    orders: [],
    payments: [],
    coursesEnrolled: [],
    eventsAttended: [],
    communitiesJoined: [],
    conversationsHistory: [],
    supportTickets: [],
    interactions: [],
    tasks: [],
    notes: [],
    consent: {
      marketingEmailOptIn: true,
      smsAlertsOptIn: false,
      directMessageOptIn: true,
      dataProcessingGdprAccepted: true,
      consentGivenAt: '2026-03-12T10:05:00Z',
      consentSource: 'OMNI Social Feed Ad Click'
    },
    aiIntelligence: {
      leadScore: 42,
      ratingTier: 'nurture',
      conversionProbabilityPct: 35,
      buyingIntentScore: 40,
      churnRiskPct: 65,
      keyInterestArchetypes: ['Creator Studio', 'Livestream Pass', 'Tip Jar'],
      recommendedNextAction: 'Trigger AI automated re-engagement sequence with 30-day Creator Pro bonus pass.',
      aiJustification: 'No active login in 19 days, pending billing reminder for podcast studio bandwidth.',
      suggestedOffers: ['Creator Monetization Toolkit (Free Trial)', '1-on-1 Livestreaming Masterclass'],
      lastAnalyzedAt: '2026-08-20T04:10:00Z'
    }
  }
];

// ============================================================================
// 2. CRM DEALS & PIPELINE
// ============================================================================

export const SEED_CRM_DEALS: CrmDeal[] = [
  {
    id: 'deal-001',
    title: 'Oxford Quantum Lab — Phase II Institutional Deployment',
    companyId: 'comp-001',
    companyName: 'Oxford Quantum Computing Lab',
    contactId: 'cust-360-001',
    contactName: 'Dr. Vivienne Vance',
    contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    valueUsd: 120000,
    stage: 'proposal',
    probabilityPercent: 85,
    expectedCloseDate: '2026-09-15',
    leadSource: 'virtual_event',
    assignedRepId: 'agent-alexander-01',
    assignedRepName: 'Alexander Hayes',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['Physical NFC Keys (200 Units)', 'Enterprise SDK', 'Quantum Node Licence'],
    notesCount: 4,
    tasksCount: 2,
    lastActivityAt: '2026-08-16T10:00:00Z',
    createdAt: '2026-07-20T11:00:00Z'
  },
  {
    id: 'deal-002',
    title: 'Apex Sovereign Capital — Swiss Multi-Fund Rail Integration',
    companyId: 'comp-002',
    companyName: 'Apex Sovereign Capital AG',
    contactId: 'cust-360-002',
    contactName: 'Marcus Sterling',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    valueUsd: 250000,
    stage: 'negotiation',
    probabilityPercent: 90,
    expectedCloseDate: '2026-08-31',
    leadSource: 'omni_messages',
    assignedRepId: 'agent-sophia-02',
    assignedRepName: 'Sophia Lin',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['Institutional Settlement Rail', 'FINMA Compliance Module', 'Multi-Sig Custody'],
    notesCount: 6,
    tasksCount: 3,
    lastActivityAt: '2026-08-19T19:00:00Z',
    createdAt: '2026-06-10T14:00:00Z'
  },
  {
    id: 'deal-003',
    title: 'Nexus Hardware Labs — 1,000 Custom Engraved Key Rings',
    companyId: 'comp-003',
    companyName: 'Nexus Hardware Labs Singapore',
    contactId: 'cust-360-004',
    contactName: 'David Chen',
    contactAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    valueUsd: 85000,
    stage: 'qualified',
    probabilityPercent: 75,
    expectedCloseDate: '2026-09-05',
    leadSource: 'embedded_website_widget',
    assignedRepId: 'agent-alexander-01',
    assignedRepName: 'Alexander Hayes',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['1,000 Custom Titanium NFC Keys', 'Air Freight to SG', 'Factory Root Certificates'],
    notesCount: 2,
    tasksCount: 1,
    lastActivityAt: '2026-08-20T03:00:00Z',
    createdAt: '2026-08-05T08:00:00Z'
  },
  {
    id: 'deal-004',
    title: 'CyberSecurity Academy — European Semester License (450 Students)',
    companyId: 'comp-004',
    companyName: 'CyberSecurity Academy Berlin',
    contactId: 'cust-360-003',
    contactName: 'Elena Rostova',
    contactAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    valueUsd: 42000,
    stage: 'contacted',
    probabilityPercent: 60,
    expectedCloseDate: '2026-09-01',
    leadSource: 'omni_marketplace',
    assignedRepId: 'agent-david-03',
    assignedRepName: 'David Mercer',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['Course Passes', 'Smart Certificates', 'LMS Webhook Integrations'],
    notesCount: 3,
    tasksCount: 1,
    lastActivityAt: '2026-08-18T15:00:00Z',
    createdAt: '2026-08-10T09:00:00Z'
  },
  {
    id: 'deal-005',
    title: 'Gulf FinTech Oasis — Regional Autonomous Node Cluster',
    companyId: 'comp-005',
    companyName: 'Gulf FinTech Oasis Dubai',
    contactId: 'cust-360-005',
    contactName: 'Sophia Al-Mansoor',
    contactAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    valueUsd: 180000,
    stage: 'won',
    probabilityPercent: 100,
    expectedCloseDate: '2026-08-01',
    leadSource: 'referral',
    assignedRepId: 'agent-sophia-02',
    assignedRepName: 'Sophia Lin',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['Regional Oracle Cluster', 'Escrow Smart Contracts', 'Dedicated VPC'],
    notesCount: 8,
    tasksCount: 0,
    lastActivityAt: '2026-08-01T12:00:00Z',
    createdAt: '2026-05-15T10:00:00Z',
    wonAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'deal-006',
    title: 'Nordic Sovereign Health — Biometric Key Patient Access Trial',
    contactId: 'cust-360-006',
    contactName: 'Liam O’Connor',
    contactAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    valueUsd: 28000,
    stage: 'new_lead',
    probabilityPercent: 25,
    expectedCloseDate: '2026-10-15',
    leadSource: 'lead_capture_form',
    assignedRepId: 'agent-david-03',
    assignedRepName: 'David Mercer',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['NFC Key Rings', 'HIPAA/GDPR Vault'],
    notesCount: 1,
    tasksCount: 1,
    lastActivityAt: '2026-08-19T10:00:00Z',
    createdAt: '2026-08-19T10:00:00Z'
  },
  {
    id: 'deal-007',
    title: 'Kyoto University — ZK Academic Syllabus Adoption',
    contactId: 'cust-360-001',
    contactName: 'Dr. Vivienne Vance',
    contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    valueUsd: 65000,
    stage: 'won',
    probabilityPercent: 100,
    expectedCloseDate: '2026-07-28',
    leadSource: 'referral',
    assignedRepId: 'agent-alexander-01',
    assignedRepName: 'Alexander Hayes',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['Curriculum Licensing', 'Evaluation Kits'],
    notesCount: 3,
    tasksCount: 0,
    lastActivityAt: '2026-07-28T16:00:00Z',
    createdAt: '2026-06-01T09:00:00Z',
    wonAt: '2026-07-28T16:00:00Z'
  },
  {
    id: 'deal-008',
    title: 'Tokyo FinTech Hub — Trial Payment Gateway',
    contactId: 'cust-360-004',
    contactName: 'David Chen',
    contactAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    valueUsd: 18000,
    stage: 'lost',
    probabilityPercent: 0,
    expectedCloseDate: '2026-08-10',
    leadSource: 'omni_ads',
    assignedRepId: 'agent-david-03',
    assignedRepName: 'David Mercer',
    assignedRepAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    productsInterested: ['Payment Gateway'],
    notesCount: 2,
    tasksCount: 0,
    lastActivityAt: '2026-08-10T14:00:00Z',
    createdAt: '2026-07-05T10:00:00Z',
    lossReason: 'Selected legacy bank provider due to existing contractual lock-in until 2027.'
  }
];

// ============================================================================
// 3. CRM COMPANIES
// ============================================================================

export const SEED_CRM_COMPANIES: CrmCompany[] = [
  {
    id: 'comp-001',
    name: 'Oxford Quantum Computing Lab',
    domain: 'oxford-quantum.ac.uk',
    industry: 'Academic & Quantum Research',
    size: '51-200',
    tier: 'enterprise_institutional',
    annualRevenueEstimateUsd: 45000000,
    totalDealsValueUsd: 185000,
    dealsCount: 2,
    contactsCount: 4,
    primaryContactName: 'Dr. Vivienne Vance',
    primaryContactEmail: 'v.vance@oxford-quantum.ac.uk',
    country: 'United Kingdom',
    city: 'Oxford',
    healthScore: 98,
    logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=80',
    createdAt: '2025-11-14T09:00:00Z'
  },
  {
    id: 'comp-002',
    name: 'Apex Sovereign Capital AG',
    domain: 'apex-sovereign.ch',
    industry: 'Family Office & Autonomous Wealth',
    size: '11-50',
    tier: 'platinum_vip',
    annualRevenueEstimateUsd: 120000000,
    totalDealsValueUsd: 250000,
    dealsCount: 1,
    contactsCount: 3,
    primaryContactName: 'Marcus Sterling',
    primaryContactEmail: 'm.sterling@apex-sovereign.ch',
    country: 'Switzerland',
    city: 'Geneva',
    healthScore: 94,
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    createdAt: '2026-01-20T14:30:00Z'
  },
  {
    id: 'comp-003',
    name: 'Nexus Hardware Labs Singapore',
    domain: 'nexus-hardware.sg',
    industry: 'Semiconductors & Cryptographic Devices',
    size: '201-1000',
    tier: 'silver',
    annualRevenueEstimateUsd: 85000000,
    totalDealsValueUsd: 103000,
    dealsCount: 2,
    contactsCount: 5,
    primaryContactName: 'David Chen',
    primaryContactEmail: 'd.chen@nexus-hardware.sg',
    country: 'Singapore',
    city: 'Singapore',
    healthScore: 89,
    logoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01T04:20:00Z'
  },
  {
    id: 'comp-004',
    name: 'CyberSecurity Academy Berlin',
    domain: 'cybersec-academy.io',
    industry: 'EdTech & Professional Certification',
    size: '11-50',
    tier: 'gold',
    annualRevenueEstimateUsd: 8500000,
    totalDealsValueUsd: 42000,
    dealsCount: 1,
    contactsCount: 2,
    primaryContactName: 'Elena Rostova',
    primaryContactEmail: 'elena@cybersec-academy.io',
    country: 'Germany',
    city: 'Berlin',
    healthScore: 88,
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    createdAt: '2026-02-10T11:00:00Z'
  },
  {
    id: 'comp-005',
    name: 'Gulf FinTech Oasis Dubai',
    domain: 'gulf-fintech.ae',
    industry: 'Financial Freezone & Regulatory Sandbox',
    size: '51-200',
    tier: 'enterprise_institutional',
    annualRevenueEstimateUsd: 180000000,
    totalDealsValueUsd: 180000,
    dealsCount: 1,
    contactsCount: 6,
    primaryContactName: 'Sophia Al-Mansoor',
    primaryContactEmail: 's.mansoor@gulf-fintech.ae',
    country: 'United Arab Emirates',
    city: 'Dubai',
    healthScore: 97,
    logoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
    createdAt: '2025-10-05T08:00:00Z'
  }
];

// ============================================================================
// 4. CRM TASKS & TICKETS
// ============================================================================

export const SEED_CRM_TASKS: CrmTask[] = [
  {
    id: 'task-101',
    title: 'Draft Q4 Oxford Institutional Contract',
    description: 'Prepare multi-sig escrow contract for 200 hardware tokens.',
    priority: 'urgent',
    status: 'in_progress',
    dueDate: '2026-08-22',
    assignedAgentId: 'agent-alexander-01',
    assignedAgentName: 'Alexander Hayes',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    linkedEntity: {
      type: 'deal',
      id: 'deal-001',
      name: 'Oxford Quantum Lab Deployment'
    },
    reminderEnabled: true,
    createdAt: '2026-08-16T10:00:00Z'
  },
  {
    id: 'task-102',
    title: 'Schedule FINMA Compliance Call with Marcus Sterling',
    description: 'Coordinate with Swiss legal team on OMNI escrow regulatory filing.',
    priority: 'urgent',
    status: 'todo',
    dueDate: '2026-08-21',
    assignedAgentId: 'agent-sophia-02',
    assignedAgentName: 'Sophia Lin',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    linkedEntity: {
      type: 'deal',
      id: 'deal-002',
      name: 'Apex Sovereign Capital Integration'
    },
    reminderEnabled: true,
    createdAt: '2026-08-19T19:00:00Z'
  },
  {
    id: 'task-103',
    title: 'Singapore Logistics & Air Freight Quote for Nexus Labs',
    description: 'Confirm factory lead times for 1,000 units with Shenzhen manufacturing plant.',
    priority: 'high',
    status: 'todo',
    dueDate: '2026-08-22',
    assignedAgentId: 'agent-alexander-01',
    assignedAgentName: 'Alexander Hayes',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    linkedEntity: {
      type: 'deal',
      id: 'deal-003',
      name: 'Nexus Hardware Labs Singapore'
    },
    reminderEnabled: true,
    createdAt: '2026-08-20T03:00:00Z'
  },
  {
    id: 'task-104',
    title: 'Send LMS API Webhook Guide to Elena Rostova',
    description: 'Provide developer guide for automated batch cert minting.',
    priority: 'normal',
    status: 'completed',
    dueDate: '2026-08-19',
    assignedAgentId: 'agent-david-03',
    assignedAgentName: 'David Mercer',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    linkedEntity: {
      type: 'contact',
      id: 'cust-360-003',
      name: 'Elena Rostova'
    },
    reminderEnabled: false,
    createdAt: '2026-08-18T15:00:00Z',
    completedAt: '2026-08-19T11:20:00Z'
  }
];

export const SEED_CRM_TICKETS: CrmTicket[] = [
  {
    id: 'tick-001',
    ticketNumber: 'TICK-9082',
    customerId: 'cust-360-004',
    customerName: 'David Chen',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    subject: 'Factory Root Certificate Provisioning for Batch Hardware',
    description: 'Requesting clarification on how private root certificates are flashed during assembly.',
    category: 'technical_issue',
    priority: 'urgent',
    status: 'in_progress',
    slaDeadlineAt: '2026-08-20T12:00:00Z',
    slaMinutesRemaining: 45,
    isSlaBreached: false,
    assignedAgentId: 'agent-alexander-01',
    assignedAgentName: 'Alexander Hayes',
    createdAt: '2026-08-20T03:30:00Z'
  },
  {
    id: 'tick-002',
    ticketNumber: 'TICK-9077',
    customerId: 'cust-360-003',
    customerName: 'Elena Rostova',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subject: 'Batch Minting Gas Optimization on Sovereign Chain',
    description: 'Inquiring if semester exam certificates can be bundled in a single Merkle tree transaction.',
    category: 'product_feature',
    priority: 'normal',
    status: 'resolved',
    slaDeadlineAt: '2026-08-19T18:00:00Z',
    slaMinutesRemaining: 0,
    isSlaBreached: false,
    assignedAgentId: 'agent-david-03',
    assignedAgentName: 'David Mercer',
    createdAt: '2026-08-18T16:00:00Z',
    resolvedAt: '2026-08-19T11:00:00Z'
  }
];

// ============================================================================
// 5. BUSINESS INBOX EXTENSION
// ============================================================================

export const SEED_BUSINESS_INBOX_CONVERSATIONS: BusinessInboxConversation[] = [
  {
    id: 'binbox-001',
    channel: 'website_chat',
    customer: {
      id: 'cust-360-004',
      displayName: 'David Chen',
      handle: '@david_chen_hw',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      company: 'Nexus Hardware Labs Singapore',
      tier: 'silver',
      leadScore: 91
    },
    assignedTeam: 'Enterprise Sales',
    assignedAgentId: 'agent-alexander-01',
    assignedAgentName: 'Alexander Hayes',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    status: 'open',
    priority: 'urgent',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T12:00:00Z',
    responseTimeRemainingMinutes: 45,
    firstResponseTimeSeconds: 120,
    lastMessageSnippet: 'What is the lead time for 1,000 custom engraved Titanium NFC key rings with our corporate root certificate?',
    lastMessageTimestamp: '2026-08-20T02:15:00Z',
    unreadCount: 1,
    tags: ['High Value Inbound', 'Singapore Fleet', 'Lead Score: 91'],
    internalNotes: [
      {
        id: 'inote-01',
        authorId: 'agent-alexander-01',
        authorName: 'Alexander Hayes',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'David tested evaluation units last week with 100% positive marks. Prepare immediate manufacturing schedule.',
        isPinned: true,
        tags: ['Hot Lead'],
        createdAt: '2026-08-20T03:00:00Z'
      }
    ],
    aiAnalysis: {
      sentiment: 'urgent',
      sentimentScore: 92,
      intent: 'Immediate bulk procurement inquiry',
      keyTopics: ['1,000 Units', 'Titanium NFC', 'Root Certificate Flashing'],
      suggestedReply: 'Hi David! For a 1,000 unit custom production run with private root certificates, our standard factory turnaround is 12 business days with express DHL door-to-door delivery to Singapore. I have prepared our volume pricing breakdown ($85k total). Would you like to review the technical specification sheet on a brief 10-minute briefing?',
      suggestedAction: 'Send formal quote and schedule Webrtc briefing.',
      confidencePercent: 96
    }
  },
  {
    id: 'binbox-002',
    channel: 'whatsapp',
    customer: {
      id: 'cust-360-002',
      displayName: 'Marcus Sterling',
      handle: '@marcus_sterling',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      company: 'Apex Sovereign Capital AG',
      tier: 'platinum_vip',
      leadScore: 92
    },
    assignedTeam: 'VIP Concierge',
    assignedAgentId: 'agent-sophia-02',
    assignedAgentName: 'Sophia Lin',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    status: 'open',
    priority: 'urgent',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-20T14:30:00Z',
    responseTimeRemainingMinutes: 120,
    firstResponseTimeSeconds: 45,
    lastMessageSnippet: 'We would like to onboard 4 Swiss fund managers onto the OMNI Finance settlement rail.',
    lastMessageTimestamp: '2026-08-19T18:40:00Z',
    unreadCount: 0,
    tags: ['Swiss Capital', 'FINMA Compliance', 'VIP Client'],
    internalNotes: [
      {
        id: 'inote-02',
        authorId: 'agent-sophia-02',
        authorName: 'Sophia Lin',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        content: 'Marcus confirmed budget authorization. Awaiting legal sign-off on Swiss data jurisdiction addendum.',
        isPinned: true,
        tags: ['High Value'],
        createdAt: '2026-08-19T19:00:00Z'
      }
    ],
    aiAnalysis: {
      sentiment: 'positive',
      sentimentScore: 94,
      intent: 'Multi-entity institutional onboarding',
      keyTopics: ['Fund Managers', 'OMNI Finance Settlement', 'Swiss Jurisdiction'],
      suggestedReply: 'Dear Marcus, wonderful to hear from you. We have set up the institutional onboarding workspace for your 4 Swiss fund managers with FINMA-compliant audit trails pre-configured. I can join a call tomorrow at 10:00 CET to walk through the treasury keys.',
      suggestedAction: 'Schedule Webrtc VIP review & dispatch legal addendum.',
      confidencePercent: 98
    }
  },
  {
    id: 'binbox-003',
    channel: 'omni_messenger',
    customer: {
      id: 'cust-360-001',
      displayName: 'Dr. Vivienne Vance',
      handle: '@dr_vivienne',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      company: 'Oxford Quantum Computing Lab',
      tier: 'enterprise_institutional',
      leadScore: 98
    },
    assignedTeam: 'Enterprise Sales',
    assignedAgentId: 'agent-alexander-01',
    assignedAgentName: 'Alexander Hayes',
    assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    status: 'pending',
    priority: 'high',
    slaState: 'within_sla',
    slaDeadlineAt: '2026-08-21T09:00:00Z',
    responseTimeRemainingMinutes: 600,
    firstResponseTimeSeconds: 60,
    lastMessageSnippet: 'All 50 hardware units successfully paired with our laboratory server cluster.',
    lastMessageTimestamp: '2026-08-12T11:45:00Z',
    unreadCount: 0,
    tags: ['Institutional Partner', 'Hardware Verified', 'High ARR'],
    internalNotes: [],
    aiAnalysis: {
      sentiment: 'very_positive',
      sentimentScore: 98,
      intent: 'Successful deployment verification',
      keyTopics: ['Hardware Pairing', 'Lab Cluster', 'Phase II Expansion'],
      suggestedReply: 'Dr. Vance, that is outstanding news. We look forward to progressing the Phase II expansion contract next week.',
      suggestedAction: 'Send Phase II contract reminder.',
      confidencePercent: 95
    }
  }
];

// ============================================================================
// 6. BUSINESS AUTOMATION BUILDER WORKFLOWS
// ============================================================================

export const SEED_BUSINESS_AUTOMATION_WORKFLOWS: BusinessAutomationWorkflow[] = [
  {
    id: 'wf-001',
    name: 'High-Value Inbound Lead Routing & Instant Welcome SLA',
    category: 'sales_acceleration',
    description: 'Detects high-intent inquiries from Messages/Forms, calculates AI Lead Score, routes to VIP sales reps, and fires instant verified response.',
    isActive: true,
    trigger: {
      type: 'new_message_received',
      label: 'New Customer Message Inbound',
      description: 'Triggered when an incoming message arrives via WhatsApp, Messenger, or Website Chat.',
      conditions: [
        { field: 'message_intent', operator: 'contains', value: 'purchase,pricing,quote,enterprise' }
      ]
    },
    steps: [
      {
        id: 'step-001-1',
        type: 'update_crm_stage',
        name: 'Identify Customer & Update CRM Record',
        description: 'Synchronizes profile with OMNI Graph, establishes Lead record, and applies initial Lead Score.',
        delayMinutes: 0,
        parameters: { targetStage: 'new_lead', tagToAdd: 'High-Intent Inbound' },
        isRequired: true,
        requiresHumanApproval: false
      },
      {
        id: 'step-001-2',
        type: 'assign_employee',
        name: 'Round-Robin Routing to Senior Sales Rep',
        description: 'Assigns conversation to available Senior Account Executive based on timezone & expertise.',
        delayMinutes: 0,
        parameters: { assigneeRole: 'Enterprise Sales AE' },
        isRequired: true,
        requiresHumanApproval: false
      },
      {
        id: 'step-001-3',
        type: 'send_message',
        name: 'Send Verified AI Welcome Reply',
        description: 'Dispatches personalized greeting acknowledging the request within 60 seconds.',
        delayMinutes: 1,
        parameters: {
          messageBody: 'Hello! Thank you for connecting with OMNI. Our enterprise specialist has been assigned to your inquiry and is reviewing your specifications.'
        },
        isRequired: true,
        requiresHumanApproval: false
      },
      {
        id: 'step-001-4',
        type: 'create_crm_task',
        name: 'Create 2-Hour SLA Sales Task',
        description: 'Generates urgent CRM follow-up task with active SLA countdown.',
        delayMinutes: 0,
        parameters: { taskTitle: 'Executive Inbound Follow-Up Call', taskPriority: 'urgent' },
        isRequired: true,
        requiresHumanApproval: false
      }
    ],
    executionStats: {
      totalTriggered: 1420,
      completedCount: 1395,
      activeExecutions: 25,
      failedCount: 0,
      conversionSuccessPct: 42.8
    },
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-08-15T12:00:00Z'
  },
  {
    id: 'wf-002',
    name: 'Abandoned Sovereign Cart Win-Back & Escrow Voucher',
    category: 'welcome',
    description: 'Detects shopping cart idle for 30 minutes, sends gentle recovery notification with a limited-time 15% incentive voucher.',
    isActive: true,
    trigger: {
      type: 'new_order_placed',
      label: 'Cart Inactivity Threshold Exceeded',
      description: 'Triggered when items remain in active shopping cart without checkout after 30 minutes.',
      conditions: [
        { field: 'cart_subtotal_usd', operator: 'greater_than', value: 100 }
      ]
    },
    steps: [
      {
        id: 'step-002-1',
        type: 'send_message',
        name: 'Send Cart Recovery Message with 1-Tap Link',
        description: 'Dispatches instant messenger notification with direct checkout deep-link.',
        delayMinutes: 30,
        parameters: {
          messageBody: 'Your sovereign items are reserved in your OMNI Cart. Complete checkout in the next 2 hours to apply code SOVEREIGN15 for 15% off.'
        },
        isRequired: true,
        requiresHumanApproval: false
      },
      {
        id: 'step-002-2',
        type: 'create_crm_task',
        name: 'Log Cart Recovery Outreach Task',
        description: 'Flags user profile as high-intent shopper for re-marketing sequences.',
        delayMinutes: 0,
        parameters: { taskTitle: 'Review High-Value Cart Abandonment', taskPriority: 'normal' },
        isRequired: false,
        requiresHumanApproval: false
      }
    ],
    executionStats: {
      totalTriggered: 890,
      completedCount: 860,
      activeExecutions: 30,
      failedCount: 0,
      conversionSuccessPct: 31.4
    },
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-08-10T14:00:00Z'
  },
  {
    id: 'wf-003',
    name: 'Masterclass Academy Onboarding & Cohort Assignment',
    category: 'onboarding',
    description: 'Upon purchase of Course archetype, auto-enrolls student into private Guild Space, generates calendar invites, and sends prerequisite files.',
    isActive: true,
    trigger: {
      type: 'payment_received',
      label: 'Course Payment Settled',
      description: 'Triggered when payment is confirmed for a Course archetype product.',
      conditions: [
        { field: 'product_archetype', operator: 'equals', value: 'course' }
      ]
    },
    steps: [
      {
        id: 'step-003-1',
        type: 'update_crm_stage',
        name: 'Update Customer Tier to Scholar',
        description: 'Promotes contact to enrolled student status in CRM.',
        delayMinutes: 0,
        parameters: { targetStage: 'won', tagToAdd: 'Masterclass Enrolled' },
        isRequired: true,
        requiresHumanApproval: false
      },
      {
        id: 'step-003-2',
        type: 'send_email_template',
        name: 'Send Academy Welcome & Syllabi PDF',
        description: 'Sends rich course materials, schedule, and private Guild Space access link.',
        delayMinutes: 0,
        parameters: { templateId: 'tpl_academy_welcome_2026' },
        isRequired: true,
        requiresHumanApproval: false
      },
      {
        id: 'step-003-3',
        type: 'schedule_meeting_invite',
        name: 'Calendar Invite for Cohort Kickoff',
        description: 'Adds recurring masterclass webinar sessions to student calendar.',
        delayMinutes: 5,
        parameters: { meetingDurationMinutes: 60 },
        isRequired: true,
        requiresHumanApproval: false
      }
    ],
    executionStats: {
      totalTriggered: 540,
      completedCount: 540,
      activeExecutions: 0,
      failedCount: 0,
      conversionSuccessPct: 98.2
    },
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-08-18T10:00:00Z'
  }
];

// ============================================================================
// 7. CUSTOMER JOURNEYS
// ============================================================================

export const SEED_CUSTOMER_JOURNEYS: CustomerJourneyTemplate[] = [
  {
    id: 'jrn-001',
    title: '14-Day Sovereign Enterprise Onboarding Journey',
    badge: 'Flagship Enterprise',
    description: 'Structured multi-touch sequence guiding new institutional customers from passport verification through key generation to node deployment.',
    targetAudience: 'Institutional Clients, Labs, Family Offices',
    estimatedDuration: '14 Days',
    recommendedFor: ['High LTV Customers', 'Institutional Tier', 'Hardware Buyers'],
    stages: [
      {
        dayOffset: 0,
        title: 'Day 0: Welcome & Executive Introduction',
        channel: 'OMNI Messenger & Email',
        actionDescription: 'Welcome message from assigned Account Executive + Security Whitepaper download.',
        triggerCondition: 'First enterprise deal closed won'
      },
      {
        dayOffset: 3,
        title: 'Day 3: Hardware Pairing & Key Flashing Check-In',
        channel: 'WebRTC Meeting or Interactive Chat',
        actionDescription: 'Assigned solutions architect conducts 15-minute key synchronization walkthrough.',
        triggerCondition: 'Hardware kit delivery confirmation'
      },
      {
        dayOffset: 7,
        title: 'Day 7: Guild Space & Private Group Onboarding',
        channel: 'OMNI Spaces Push Notification',
        actionDescription: 'Invite core team members to private institutional Guild Space for direct engineering support.',
        triggerCondition: 'Active key pairing detected'
      },
      {
        dayOffset: 14,
        title: 'Day 14: Executive Quarterly Review Setup',
        channel: 'Calendar Invite & CRM Task',
        actionDescription: 'Book Q1 roadmap review and collect Net Promoter Score (NPS) feedback.',
        triggerCondition: '2 weeks post-deployment'
      }
    ]
  },
  {
    id: 'jrn-002',
    title: 'Abandoned Cart Win-Back & Retention Sequence',
    badge: 'E-Commerce Acceleration',
    description: 'High-conversion automated multi-step reminder sequence tailored for sovereign hardware and high-ticket masterclasses.',
    targetAudience: 'Shoppers with items in cart > 30 minutes',
    estimatedDuration: '72 Hours',
    recommendedFor: ['Physical Hardware', 'Masterclass Drops', 'Passes'],
    stages: [
      {
        dayOffset: 0,
        title: 'Hour 1: Gentle Cart Reservation Reminder',
        channel: 'OMNI Messenger / WhatsApp',
        actionDescription: 'Notification alerting user that stock is reserved with 1-tap checkout button.',
        triggerCondition: 'Inactivity 60 minutes'
      },
      {
        dayOffset: 1,
        title: 'Hour 24: 15% Sovereign Voucher Drop',
        channel: 'Direct Message & Push Alert',
        actionDescription: 'Sends limited-time coupon code SOVEREIGN15 valid for 48 hours.',
        triggerCondition: 'Unpurchased after 24h'
      },
      {
        dayOffset: 3,
        title: 'Hour 72: Final Inventory Expiry Notice',
        channel: 'Email / SMS',
        actionDescription: 'Last call notification before cart release back to public marketplace catalogue.',
        triggerCondition: 'Unpurchased after 72h'
      }
    ]
  },
  {
    id: 'jrn-003',
    title: 'Scholar Course-to-Certification Pathway',
    badge: 'Education & Community',
    description: 'Automated milestone encouragement keeping students engaged across 6-week technical curriculum.',
    targetAudience: 'Masterclass Enrollees',
    estimatedDuration: '45 Days',
    recommendedFor: ['All Course Archetypes'],
    stages: [
      {
        dayOffset: 0,
        title: 'Day 0: Course Guild Access & Syllabi',
        channel: 'Email & Space Invitation',
        actionDescription: 'Instant private guild link, live lecture dates, and discord-style study room access.',
        triggerCondition: 'Course checkout complete'
      },
      {
        dayOffset: 14,
        title: 'Day 14: Mid-Term Project Check-In',
        channel: 'OMNI Messenger Bot',
        actionDescription: 'Automated study check-in asking if student requires TA office hours.',
        triggerCondition: '50% lecture completion'
      },
      {
        dayOffset: 45,
        title: 'Day 45: Verifiable On-Chain Certificate Minting',
        channel: 'OMNI Pay / Wallet Notification',
        actionDescription: 'Mints tamper-proof cryptographic diploma directly to student OMNI Passport.',
        triggerCondition: '100% coursework submitted'
      }
    ]
  }
];

// ============================================================================
// 8. AI BUSINESS ASSISTANT CHAT MESSAGES
// ============================================================================

export const SEED_AI_BUSINESS_CHAT_MESSAGES: AiBusinessChatMessage[] = [
  {
    id: 'aimsg-01',
    sender: 'user',
    text: 'Give me an executive summary of our top 3 enterprise leads closing this month and any SLA risks.',
    timestamp: '2026-08-20T08:00:00Z'
  },
  {
    id: 'aimsg-02',
    sender: 'omni_ai',
    text: 'Here is your real-time CRM Executive Summary & Pipeline Risk Analysis:',
    timestamp: '2026-08-20T08:00:15Z',
    structuredInsight: {
      type: 'sales_forecast',
      headline: 'August 2026 Enterprise Pipeline: $455,000 Weighted Value',
      summaryPoints: [
        'Apex Sovereign Capital AG ($250k): Negotiation stage, 90% probability. Marcus Sterling requested FINMA legal review. Sophia Lin has scheduled briefing for Aug 21.',
        'Oxford Quantum Lab ($120k): Proposal stage, 85% probability. Dr. Vivienne Vance approved UKRI budget allocation. Formal contract dispatch needed before Aug 25.',
        'Nexus Hardware Labs SG ($85k): Qualified stage, 75% probability. David Chen requested urgent 1,000 unit manufacturing quotation. Ticket SLA has 45 minutes remaining.'
      ],
      metrics: [
        { label: 'Weighted Value', value: '$455,000', trend: 'up' },
        { label: 'Average Win Rate', value: '84.2%', trend: 'up' },
        { label: 'Urgent SLA Tasks', value: '2 Active', trend: 'neutral' }
      ],
      actionButtonLabel: 'View Visual Pipeline & Deals'
    }
  }
];

// ============================================================================
// 9. CRM EXECUTIVE ANALYTICS
// ============================================================================

export const SEED_CRM_EXECUTIVE_ANALYTICS: CrmExecutiveAnalytics = {
  timeframe: '30d',
  totalLeadsCount: 342,
  leadsChangePct: 18.5,
  conversionRatePct: 38.4,
  conversionRateChangePct: 4.2,
  totalPipelineValueUsd: 778000,
  weightedPipelineValueUsd: 592000,
  closedWonRevenueUsd: 310000,
  avgDealSizeUsd: 86444,
  avgSalesCycleDays: 22,
  avgFirstResponseTimeMinutes: 4.8,
  slaComplianceRatePct: 97.6,
  customerSatisfactionScore: 4.92,
  netPromoterScore: 78,
  leadsBySource: [
    { source: 'omni_messages', count: 112, valueUsd: 290000, conversionRate: 46.2 },
    { source: 'virtual_event', count: 78, valueUsd: 195000, conversionRate: 41.0 },
    { source: 'embedded_website_widget', count: 64, valueUsd: 120000, conversionRate: 34.5 },
    { source: 'omni_marketplace', count: 48, valueUsd: 88000, conversionRate: 31.2 },
    { source: 'referral', count: 28, valueUsd: 65000, conversionRate: 58.0 },
    { source: 'omni_ads', count: 12, valueUsd: 20000, conversionRate: 16.5 }
  ],
  pipelineByStage: [
    { stage: 'new_lead', label: 'New Inbound', dealsCount: 12, totalValueUsd: 95000, probabilityPct: 20 },
    { stage: 'contacted', label: 'Contacted', dealsCount: 8, totalValueUsd: 78000, probabilityPct: 40 },
    { stage: 'qualified', label: 'Qualified', dealsCount: 6, totalValueUsd: 145000, probabilityPct: 60 },
    { stage: 'proposal', label: 'Proposal', dealsCount: 4, totalValueUsd: 160000, probabilityPct: 75 },
    { stage: 'negotiation', label: 'Negotiation', dealsCount: 3, totalValueUsd: 300000, probabilityPct: 90 },
    { stage: 'won', label: 'Closed Won', dealsCount: 14, totalValueUsd: 310000, probabilityPct: 100 }
  ],
  topPerformingAgents: [
    {
      agentId: 'agent-alexander-01',
      name: 'Alexander Hayes',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      dealsWonCount: 6,
      revenueWonUsd: 185000,
      avgResponseMinutes: 3.2,
      csat: 4.96
    },
    {
      agentId: 'agent-sophia-02',
      name: 'Sophia Lin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      dealsWonCount: 5,
      revenueWonUsd: 245000,
      avgResponseMinutes: 4.1,
      csat: 4.94
    },
    {
      agentId: 'agent-david-03',
      name: 'David Mercer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      dealsWonCount: 3,
      revenueWonUsd: 82000,
      avgResponseMinutes: 5.6,
      csat: 4.86
    }
  ]
};

// ============================================================================
// 10. SUPER ADMIN GOVERNANCE
// ============================================================================

export const SEED_CRM_ADMIN_GOVERNANCE: CrmAdminGovernance = {
  isCrmGloballyActive: true,
  isAutomationEngineActive: true,
  isAiLeadScoringActive: true,
  isSlaEnforcementActive: true,
  defaultSlaMinutes: {
    urgent: 120, // 2 Hours
    high: 240, // 4 Hours
    normal: 720, // 12 Hours
    low: 1440 // 24 Hours
  },
  leadScoringWeights: {
    messageEngagement: 30,
    commerceHistory: 25,
    eventAttendance: 20,
    communityActivity: 15,
    profileCompleteness: 10
  },
  rolesAndPermissions: [
    {
      roleName: 'Super Admin & Founder',
      canViewAllDeals: true,
      canEditPipelines: true,
      canTriggerAutomations: true,
      canExportCustomerData: true,
      canManageGovernance: true
    },
    {
      roleName: 'Enterprise Sales AE',
      canViewAllDeals: true,
      canEditPipelines: true,
      canTriggerAutomations: true,
      canExportCustomerData: false,
      canManageGovernance: false
    },
    {
      roleName: 'Support Agent & Specialist',
      canViewAllDeals: false,
      canEditPipelines: false,
      canTriggerAutomations: false,
      canExportCustomerData: false,
      canManageGovernance: false
    }
  ],
  integrationNodes: [
    { serviceName: 'OMNI Contacts & Passport', status: 'connected', syncIntervalMinutes: 1, lastSyncedAt: '2026-08-20T08:30:00Z' },
    { serviceName: 'OMNI Messenger & Universal Inbox', status: 'connected', syncIntervalMinutes: 1, lastSyncedAt: '2026-08-20T08:30:00Z' },
    { serviceName: 'OMNI Finance OS & Payments', status: 'connected', syncIntervalMinutes: 5, lastSyncedAt: '2026-08-20T08:25:00Z' },
    { serviceName: 'OMNI Commerce & Marketplace', status: 'connected', syncIntervalMinutes: 5, lastSyncedAt: '2026-08-20T08:25:00Z' },
    { serviceName: 'OMNI Spaces & Communities', status: 'connected', syncIntervalMinutes: 10, lastSyncedAt: '2026-08-20T08:20:00Z' },
    { serviceName: 'OMNI AI Copilot Engine', status: 'connected', syncIntervalMinutes: 1, lastSyncedAt: '2026-08-20T08:30:00Z' }
  ]
};

// Aliases for compatibility
export const SEED_AUTOMATION_WORKFLOWS = SEED_BUSINESS_AUTOMATION_WORKFLOWS;
export const SEED_JOURNEY_TEMPLATES = SEED_CUSTOMER_JOURNEYS;
export const MOCK_CUSTOMER_360_PROFILES = SEED_CUSTOMER_360_PROFILES;
export const MOCK_CRM_DEALS = SEED_CRM_DEALS;
export const MOCK_CRM_COMPANIES = SEED_CRM_COMPANIES;
export const MOCK_CRM_TASKS = SEED_CRM_TASKS;
export const MOCK_CRM_TICKETS = SEED_CRM_TICKETS;
export const MOCK_BUSINESS_INBOX_CONVERSATIONS = SEED_BUSINESS_INBOX_CONVERSATIONS;
export const MOCK_AUTOMATION_WORKFLOWS = SEED_BUSINESS_AUTOMATION_WORKFLOWS;
export const MOCK_JOURNEY_TEMPLATES = SEED_CUSTOMER_JOURNEYS;
export const MOCK_AI_BUSINESS_CHAT_MESSAGES = SEED_AI_BUSINESS_CHAT_MESSAGES;
export const MOCK_CRM_EXECUTIVE_ANALYTICS = SEED_CRM_EXECUTIVE_ANALYTICS;
export const MOCK_CRM_ADMIN_GOVERNANCE = SEED_CRM_ADMIN_GOVERNANCE;

