/**
 * OMNI RELATIONSHIP GRAPH, CONTACTS & CIRCLES SEED DATA
 * Comprehensive mock data with rich graph links, contacts, circles, and AI intelligence signals.
 */

import {
  OmniGraphNode,
  OmniGraphEdge,
  OmniUniversalContact,
  OmniCircle,
  AiRelationshipRecommendation,
  AiFollowUpSuggestion,
  AiOpportunitySignal,
  AiEngagementPattern,
  RelationshipAdminPolicies
} from '../types/omni_relationship_graph';

export const SEED_GRAPH_NODES: OmniGraphNode[] = [
  {
    id: 'node_gideon',
    name: 'Gideon Oluwalanadynasty',
    handle: '@gideon',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    entityType: 'person',
    categoryTag: 'Ecosystem Founder',
    organisation: 'OMNI Foundation',
    isVerified: true,
    tenantId: 'tenant_primary_001',
    x: 400,
    y: 300,
    radius: 36
  },
  {
    id: 'node_fenol',
    name: 'Fenol Technologies Ltd',
    handle: '@fenol',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    entityType: 'business',
    categoryTag: 'Fintech & Cloud Systems',
    organisation: 'Fenol Group Global',
    isVerified: true,
    tenantId: 'tenant_fenol_corp',
    x: 240,
    y: 180,
    radius: 32
  },
  {
    id: 'node_ecclesia',
    name: 'Ecclesia Global Network',
    handle: '@ecclesiaglobal',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-195fe5787e91?w=150',
    entityType: 'organisation',
    categoryTag: 'Faith & Missions',
    organisation: 'Ecclesia World Alliance',
    isVerified: true,
    tenantId: 'tenant_ecclesia_org',
    x: 580,
    y: 160,
    radius: 32
  },
  {
    id: 'node_sarah_chen',
    name: 'Sarah Chen, CFA',
    handle: '@sarah_chen',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    entityType: 'partner',
    categoryTag: 'Institutional Capital',
    organisation: 'Apex Global Capital',
    isVerified: true,
    tenantId: 'tenant_primary_001',
    x: 180,
    y: 380,
    radius: 26
  },
  {
    id: 'node_marcus_vance',
    name: 'Dr. Marcus Vance',
    handle: '@marcus_v',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    entityType: 'customer',
    categoryTag: 'Enterprise Architect',
    organisation: 'Vance BioHealth',
    isVerified: true,
    tenantId: 'tenant_primary_001',
    x: 580,
    y: 420,
    radius: 26
  },
  {
    id: 'node_kingdom_builders',
    name: 'Kingdom Builders Hub',
    handle: '@kingdombuilders',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    entityType: 'community',
    categoryTag: 'Mastermind & Leadership',
    organisation: 'Kingdom Builders Community',
    isVerified: true,
    tenantId: 'tenant_primary_001',
    x: 400,
    y: 120,
    radius: 30
  },
  {
    id: 'node_elena_rostova',
    name: 'Elena Rostova',
    handle: '@elena_design',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    entityType: 'employee',
    categoryTag: 'Lead UI/UX Architect',
    organisation: 'OMNI Core Labs',
    isVerified: true,
    tenantId: 'tenant_primary_001',
    x: 270,
    y: 470,
    radius: 24
  },
  {
    id: 'node_horizon_supply',
    name: 'Horizon Logistics & Hardware',
    handle: '@horizon_supply',
    avatarUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150',
    entityType: 'supplier',
    categoryTag: 'Cloud Infrastructure & Terminals',
    organisation: 'Horizon Enterprise',
    isVerified: true,
    tenantId: 'tenant_primary_001',
    x: 640,
    y: 280,
    radius: 28
  },
  {
    id: 'node_david_adeyemi',
    name: 'Pastor David Adeyemi',
    handle: '@pastordavid',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    entityType: 'member',
    categoryTag: 'Regional Overseer',
    organisation: 'Ecclesia West Africa',
    isVerified: true,
    tenantId: 'tenant_ecclesia_org',
    x: 460,
    y: 490,
    radius: 24
  }
];

export const SEED_GRAPH_EDGES: OmniGraphEdge[] = [
  {
    id: 'edge_gideon_fenol',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_fenol',
    targetName: 'Fenol Technologies Ltd',
    relationshipType: 'partner',
    strength: 95,
    direction: 'bidirectional',
    visibility: 'public',
    circleIds: ['circle_partners', 'circle_vip_biz'],
    tags: ['Strategic Core', 'Fintech Integration', 'OMNI Passport SSO'],
    status: 'active',
    sentimentScore: 0.92,
    interactionCount: 142,
    lastInteractionAt: '2026-08-19T02:40:00Z',
    aiNotes: 'High-trust institutional joint venture. Deep technical API sync.',
    isMutual: true,
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: 'edge_gideon_ecclesia',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_ecclesia',
    targetName: 'Ecclesia Global Network',
    relationshipType: 'member',
    strength: 90,
    direction: 'bidirectional',
    visibility: 'public',
    circleIds: ['circle_faith', 'circle_org_leadership'],
    tags: ['Diocese Platform', 'Tithe Settlement', 'Media Broadcast'],
    status: 'active',
    sentimentScore: 0.88,
    interactionCount: 89,
    lastInteractionAt: '2026-08-18T18:15:00Z',
    aiNotes: 'Key ecclesiastical governance partner using OMNI Pages and Live Video.',
    isMutual: true,
    createdAt: '2025-02-14T12:00:00Z'
  },
  {
    id: 'edge_gideon_sarah',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_sarah_chen',
    targetName: 'Sarah Chen, CFA',
    relationshipType: 'partner',
    strength: 84,
    direction: 'bidirectional',
    visibility: 'mutual_only',
    circleIds: ['circle_investors', 'circle_partners'],
    tags: ['Treasury OS', 'Liquidity Pools', 'FX Hedging'],
    status: 'active',
    sentimentScore: 0.79,
    interactionCount: 38,
    lastInteractionAt: '2026-08-17T11:20:00Z',
    aiNotes: 'Quarterly review pending for $12M multi-currency liquidity line.',
    isMutual: true,
    createdAt: '2025-04-01T09:00:00Z'
  },
  {
    id: 'edge_gideon_marcus',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_marcus_vance',
    targetName: 'Dr. Marcus Vance',
    relationshipType: 'customer',
    strength: 88,
    direction: 'bidirectional',
    visibility: 'circle_only',
    circleIds: ['circle_vip_customers'],
    tags: ['Enterprise CRM', 'White-Label Deploy', 'Hardware Terminals'],
    status: 'active',
    sentimentScore: 0.85,
    interactionCount: 47,
    lastInteractionAt: '2026-08-16T14:30:00Z',
    aiNotes: 'Closed $45,000 annual enterprise license; highly engaged with OMNI AI.',
    isMutual: true,
    createdAt: '2025-06-20T14:00:00Z'
  },
  {
    id: 'edge_gideon_kingdom',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_kingdom_builders',
    targetName: 'Kingdom Builders Hub',
    relationshipType: 'community_member',
    strength: 92,
    direction: 'bidirectional',
    visibility: 'public',
    circleIds: ['circle_community_leaders'],
    tags: ['Founding Moderator', '10,000+ Members', 'Weekly Audio Stage'],
    status: 'active',
    sentimentScore: 0.94,
    interactionCount: 310,
    lastInteractionAt: '2026-08-19T01:10:00Z',
    aiNotes: 'High community resonance; 94% weekly engagement rate.',
    isMutual: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'edge_gideon_elena',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_elena_rostova',
    targetName: 'Elena Rostova',
    relationshipType: 'employee',
    strength: 91,
    direction: 'bidirectional',
    visibility: 'private',
    circleIds: ['circle_core_team'],
    tags: ['Core Engineer', 'Design System', 'Encrypted DM Channel'],
    status: 'active',
    sentimentScore: 0.90,
    interactionCount: 520,
    lastInteractionAt: '2026-08-19T03:15:00Z',
    aiNotes: 'Key contributor to OMNI Connect and OMNI Finance UI token architectures.',
    isMutual: true,
    createdAt: '2025-01-15T08:00:00Z'
  },
  {
    id: 'edge_gideon_horizon',
    tenantId: 'tenant_primary_001',
    sourceId: 'node_gideon',
    sourceName: 'Gideon Oluwalanadynasty',
    targetId: 'node_horizon_supply',
    targetName: 'Horizon Logistics & Hardware',
    relationshipType: 'supplier',
    strength: 78,
    direction: 'bidirectional',
    visibility: 'circle_only',
    circleIds: ['circle_suppliers'],
    tags: ['Server Racks', 'Smart Card Terminals', 'Net-30 Invoicing'],
    status: 'active',
    sentimentScore: 0.72,
    interactionCount: 22,
    lastInteractionAt: '2026-08-10T16:00:00Z',
    aiNotes: 'Hardware dispatch batch #440 delivered on schedule.',
    isMutual: true,
    createdAt: '2025-07-11T13:00:00Z'
  },
  {
    id: 'edge_ecclesia_david',
    tenantId: 'tenant_ecclesia_org',
    sourceId: 'node_ecclesia',
    sourceName: 'Ecclesia Global Network',
    targetId: 'node_david_adeyemi',
    targetName: 'Pastor David Adeyemi',
    relationshipType: 'member',
    strength: 86,
    direction: 'bidirectional',
    visibility: 'public',
    circleIds: ['circle_faith_clergy'],
    tags: ['Diocese Council', 'Church Growth', 'Donor Management'],
    status: 'active',
    sentimentScore: 0.89,
    interactionCount: 64,
    lastInteractionAt: '2026-08-18T10:00:00Z',
    aiNotes: 'Diocese expansion project across 14 new regional assemblies.',
    isMutual: true,
    createdAt: '2025-03-01T09:00:00Z'
  }
];

export const SEED_CIRCLES: OmniCircle[] = [
  // Personal Circles
  {
    id: 'circle_family',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'Family & Kin',
    description: 'Immediate and extended family members with highest trust & photo privileges.',
    category: 'personal',
    color: '#EC4899', // Pink
    iconName: 'Heart',
    memberCount: 6,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_family_01', 'cnt_family_02'],
    privacyLevel: 'private',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-08-10T00:00:00Z'
  },
  {
    id: 'circle_close_friends',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'Close Friends',
    description: 'Inner circle of confidants and lifelong peers.',
    category: 'personal',
    color: '#8B5CF6', // Purple
    iconName: 'Smile',
    memberCount: 14,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_friend_01', 'cnt_friend_02'],
    privacyLevel: 'private',
    createdAt: '2025-01-05T00:00:00Z',
    updatedAt: '2026-08-12T00:00:00Z'
  },
  // Business Circles
  {
    id: 'circle_vip_customers',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'VIP Enterprise Clients',
    description: 'Tier-1 commercial accounts with 24/7 dedicated support and priority beta features.',
    category: 'business',
    color: '#10B981', // Emerald
    iconName: 'Crown',
    memberCount: 28,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_vance_01', 'cnt_global_01'],
    privacyLevel: 'shared_with_members',
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },
  {
    id: 'circle_leads_pipeline',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'Hot Sales Leads (Q3)',
    description: 'Inbound prospective clients currently in active CRM evaluation pipeline.',
    category: 'business',
    color: '#F59E0B', // Amber
    iconName: 'Target',
    memberCount: 42,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_lead_01', 'cnt_lead_02', 'cnt_lead_03'],
    privacyLevel: 'private',
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2026-08-18T00:00:00Z'
  },
  {
    id: 'circle_partners',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'Strategic Alliance Partners',
    description: 'Technology, banking, and channel alliance partners across fintech and SaaS.',
    category: 'business',
    color: '#6366F1', // Indigo
    iconName: 'Handshake',
    memberCount: 18,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_fenol_01', 'cnt_sarah_01'],
    privacyLevel: 'shared_with_members',
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2026-08-19T00:00:00Z'
  },
  {
    id: 'circle_suppliers',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'Hardware & Infrastructure Suppliers',
    description: 'Data centers, cloud transit providers, and PoS terminal suppliers.',
    category: 'business',
    color: '#64748B', // Slate
    iconName: 'Truck',
    memberCount: 9,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_horizon_01'],
    privacyLevel: 'private',
    createdAt: '2025-04-15T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  // Organisation Circles
  {
    id: 'circle_faith_members',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'Ecclesia Assembly Members',
    description: 'Registered church attendees, small group leaders, and online prayer partners.',
    category: 'organisation',
    color: '#06B6D4', // Cyan
    iconName: 'Users',
    memberCount: 1840,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_ecclesia_01'],
    privacyLevel: 'public',
    createdAt: '2025-02-14T00:00:00Z',
    updatedAt: '2026-08-18T00:00:00Z'
  },
  {
    id: 'circle_core_team',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    name: 'OMNI Core Engineering & Execs',
    description: 'Sovereign platform architects, senior developers, and product leads.',
    category: 'organisation',
    color: '#3B82F6', // Blue
    iconName: 'Shield',
    memberCount: 24,
    memberProfileIds: ['prof_gideon_001'],
    memberContactIds: ['cnt_elena_01'],
    privacyLevel: 'private',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-08-19T00:00:00Z'
  }
];

export const SEED_UNIVERSAL_CONTACTS: OmniUniversalContact[] = [
  {
    id: 'cnt_fenol_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'omni_passport',
    name: 'Fenol Technologies Ltd (Executive Desk)',
    displayName: 'Fenol Tech HQ',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    jobTitle: 'Enterprise Integration Directorate',
    organisation: 'Fenol Group Global',
    department: 'Fintech & Cloud Systems',
    phone: '+44 20 7946 0991',
    email: 'partners@fenol.omni.com',
    address: '25 Bank Street, Canary Wharf, London, UK',
    website: 'https://fenol.omni.com',
    linkedOmniHandle: '@fenol',
    relationshipType: 'partner',
    lifecycleStage: 'relationship',
    circleIds: ['circle_partners', 'circle_vip_customers'],
    tags: ['SSO Federation', 'Tier-1 Partner', 'Fintech', 'Treasury Cloud'],
    notes: 'Strategic core alliance partner. Bi-weekly API synchronization calls on Thursdays.',
    dealValue: 240000,
    currency: 'USD',
    leadScore: 98,
    interactions: [
      {
        id: 'int_01',
        type: 'meeting',
        title: 'Q3 Sovereign SSO Architecture Alignment',
        description: 'Reviewed federated passport token exchange protocol with Fenol security team.',
        timestamp: '2026-08-18T14:00:00Z',
        actorName: 'Gideon Oluwalanadynasty',
        channel: 'OMNI Video Room',
        durationMinutes: 45
      },
      {
        id: 'int_02',
        type: 'financial_payment',
        title: 'Treasury OS Monthly Licensing Settlement',
        description: 'Settled $20,000 monthly multi-currency ledger routing fee.',
        timestamp: '2026-08-01T09:00:00Z',
        actorName: 'OMNI Finance Automated Settlement',
        amount: 20000,
        currency: 'USD'
      }
    ],
    orders: [
      {
        orderId: 'ord_fenol_881',
        invoiceNumber: 'INV-2026-0881',
        amount: 20000,
        currency: 'USD',
        status: 'paid',
        date: '2026-08-01',
        productName: 'OMNI Enterprise Core License (Monthly)'
      }
    ],
    messagesCount: 142,
    eventsAttended: ['OMNI Global Summit 2026', 'Fintech Sovereign Keynote'],
    consent: {
      status: 'granted',
      grantedAt: '2025-01-10T10:00:00Z',
      legalBasis: 'contractual_obligation',
      scope: ['commercial_billing', 'api_notifications', 'crm_analytics', 'direct_messaging'],
      proofHash: '0x8f4d92a1c6e7b3049102c918374a56b7c8d9e0f1'
    },
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2026-08-18T16:00:00Z',
    lastContactedAt: '2026-08-18T14:00:00Z',
    isFavorite: true
  },
  {
    id: 'cnt_sarah_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'manual',
    name: 'Sarah Chen, CFA',
    displayName: 'Sarah Chen (Apex Capital)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    jobTitle: 'Managing Partner',
    organisation: 'Apex Global Capital',
    department: 'Private Equity & Treasury',
    phone: '+1 (415) 890-2134',
    email: 'schen@apexcap.io',
    address: '555 California St, Suite 4800, San Francisco, CA',
    website: 'https://apexcap.io',
    linkedOmniHandle: '@sarah_chen',
    relationshipType: 'partner',
    lifecycleStage: 'relationship',
    circleIds: ['circle_partners'],
    tags: ['Institutional Investor', 'Liquidity Provider', 'Advisory Board'],
    notes: 'Oversees $12M multi-currency institutional liquidity line. Interested in OMNI FX hedger.',
    dealValue: 12000000,
    currency: 'USD',
    leadScore: 94,
    interactions: [
      {
        id: 'int_03',
        type: 'call',
        title: 'FX Liquidity & Hedging Pool Allocation',
        description: 'Discussed expanding EUR/GBP/NGN settlement channels on OMNI Finance OS.',
        timestamp: '2026-08-17T11:20:00Z',
        actorName: 'Gideon Oluwalanadynasty',
        channel: 'Encrypted Voice Note',
        durationMinutes: 25
      }
    ],
    orders: [],
    messagesCount: 38,
    eventsAttended: ['OMNI Global Summit 2026'],
    consent: {
      status: 'granted',
      grantedAt: '2025-04-01T09:00:00Z',
      legalBasis: 'explicit_consent',
      scope: ['financial_reports', 'direct_messaging', 'board_materials'],
      proofHash: '0x3a9f1b2c4d5e67890123456789abcdef01234567'
    },
    createdAt: '2025-04-01T09:00:00Z',
    updatedAt: '2026-08-17T12:00:00Z',
    lastContactedAt: '2026-08-17T11:20:00Z',
    isFavorite: true
  },
  {
    id: 'cnt_vance_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'google_contacts',
    name: 'Dr. Marcus Vance',
    displayName: 'Dr. Marcus Vance (Vance Bio)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    jobTitle: 'Chief Medical Officer & CEO',
    organisation: 'Vance BioHealth Research',
    department: 'Executive',
    phone: '+1 (617) 555-0192',
    email: 'marcus@vancebiohealth.com',
    address: 'Kendall Square, Cambridge, MA',
    website: 'https://vancebiohealth.com',
    linkedOmniHandle: '@marcus_v',
    relationshipType: 'customer',
    lifecycleStage: 'customer',
    circleIds: ['circle_vip_customers'],
    tags: ['Enterprise Customer', 'Health Tech', 'Custom Domain Active'],
    notes: 'Signed $45,000 annual white-label deployment contract. Uses OMNI Pages for client portals.',
    dealValue: 45000,
    currency: 'USD',
    leadScore: 92,
    interactions: [
      {
        id: 'int_04',
        type: 'meeting',
        title: 'Custom Domain SSL & Edge Routing Review',
        description: 'Verified DNS CNAME and Cloudflare proxy setup for patient portal.',
        timestamp: '2026-08-16T14:30:00Z',
        actorName: 'Gideon Oluwalanadynasty',
        channel: 'OMNI Video Room',
        durationMinutes: 30
      }
    ],
    orders: [
      {
        orderId: 'ord_vance_092',
        invoiceNumber: 'INV-2026-0092',
        amount: 45000,
        currency: 'USD',
        status: 'paid',
        date: '2026-06-20',
        productName: 'OMNI White-Label Healthcare Suite (Annual)'
      }
    ],
    messagesCount: 47,
    eventsAttended: ['Healthcare Tech Webinar Q2'],
    consent: {
      status: 'granted',
      grantedAt: '2025-06-20T14:00:00Z',
      legalBasis: 'contractual_obligation',
      scope: ['customer_support', 'billing', 'telemetry_alerts'],
      proofHash: '0x7e2d4c6a8b0f1e3a5c7d9e1f3a5c7d9e1f3a5c7d'
    },
    createdAt: '2025-06-20T14:00:00Z',
    updatedAt: '2026-08-16T15:00:00Z',
    lastContactedAt: '2026-08-16T14:30:00Z',
    isFavorite: true
  },
  {
    id: 'cnt_lead_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'csv',
    name: 'Amina Bello',
    displayName: 'Amina Bello (PaySahara)',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    jobTitle: 'VP of Payments Infrastructure',
    organisation: 'PaySahara Africa',
    department: 'Product Engineering',
    phone: '+234 802 345 6789',
    email: 'amina@paysahara.ng',
    address: 'Victoria Island, Lagos, Nigeria',
    website: 'https://paysahara.ng',
    relationshipType: 'lead',
    lifecycleStage: 'lead',
    circleIds: ['circle_leads_pipeline'],
    tags: ['High Value Lead', 'West Africa Gateway', 'OMNI Finance BaaS'],
    notes: 'Evaluating OMNI BaaS multi-currency virtual accounts for 250k merchants. Proposal sent.',
    dealValue: 180000,
    currency: 'USD',
    leadScore: 86,
    interactions: [
      {
        id: 'int_05',
        type: 'email',
        title: 'BaaS Integration Technical Proposal & Commercial Terms',
        description: 'Sent 14-page architectural blueprint and revenue-sharing tier table.',
        timestamp: '2026-08-15T16:45:00Z',
        actorName: 'Gideon Oluwalanadynasty',
        channel: 'OMNI Encrypted Dispatch'
      }
    ],
    orders: [],
    messagesCount: 12,
    eventsAttended: ['Fintech Africa Demo Day'],
    consent: {
      status: 'granted',
      grantedAt: '2026-08-01T10:00:00Z',
      legalBasis: 'explicit_consent',
      scope: ['commercial_proposals', 'technical_updates'],
      proofHash: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d'
    },
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-15T17:00:00Z',
    lastContactedAt: '2026-08-15T16:45:00Z',
    isFavorite: false
  },
  {
    id: 'cnt_elena_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'omni_passport',
    name: 'Elena Rostova',
    displayName: 'Elena (Core Labs UI)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    jobTitle: 'Lead Design Systems Engineer',
    organisation: 'OMNI Core Labs',
    department: 'Product Design',
    phone: '+49 30 2312 9901',
    email: 'elena@omni.com',
    linkedOmniHandle: '@elena_design',
    relationshipType: 'employee',
    lifecycleStage: 'relationship',
    circleIds: ['circle_core_team'],
    tags: ['Core Team', 'Design Systems', 'UI Architecture'],
    notes: 'Key lead on OMNI Relationship Graph visual physics and component hierarchy.',
    dealValue: 0,
    currency: 'USD',
    leadScore: 99,
    interactions: [
      {
        id: 'int_06',
        type: 'chat_message',
        title: 'Relationship Graph Node Collision Tuning',
        description: 'Optimized D3 force simulation layout and responsive drawer drawer physics.',
        timestamp: '2026-08-19T03:15:00Z',
        actorName: 'Elena Rostova',
        channel: 'OMNI Connect Encrypted DM'
      }
    ],
    orders: [],
    messagesCount: 520,
    eventsAttended: ['All-Hands Sprint 42'],
    consent: {
      status: 'granted',
      grantedAt: '2025-01-15T08:00:00Z',
      legalBasis: 'contractual_obligation',
      scope: ['internal_team_comms', 'code_review', 'operational_notices'],
      proofHash: '0x99887766554433221100aabbccddeeff00112233'
    },
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2026-08-19T03:20:00Z',
    lastContactedAt: '2026-08-19T03:15:00Z',
    isFavorite: true
  },
  {
    id: 'cnt_horizon_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'microsoft_contacts',
    name: 'Horizon Logistics & Hardware Corp',
    displayName: 'Horizon Supply Hub',
    avatarUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150',
    jobTitle: 'Supply Chain Directorate',
    organisation: 'Horizon Enterprise',
    department: 'Hardware Fulfillment',
    phone: '+1 (800) 449-0199',
    email: 'dispatch@horizonlogistics.io',
    address: 'Austin Tech Corridor, TX',
    linkedOmniHandle: '@horizon_supply',
    relationshipType: 'supplier',
    lifecycleStage: 'relationship',
    circleIds: ['circle_suppliers'],
    tags: ['Hardware Supplier', 'Net-30 Terms', 'Data Center Hardware'],
    notes: 'Supplies secure cryptographic HSM key cards and dedicated edge nodes.',
    dealValue: 68000,
    currency: 'USD',
    leadScore: 75,
    interactions: [
      {
        id: 'int_07',
        type: 'meeting',
        title: 'HSM Batch #44 Delivery Confirmation',
        description: 'Received tracking numbers for 100 enterprise server units.',
        timestamp: '2026-08-10T16:00:00Z',
        actorName: 'Gideon Oluwalanadynasty',
        channel: 'OMNI Video Room',
        durationMinutes: 20
      }
    ],
    orders: [
      {
        orderId: 'ord_horiz_101',
        invoiceNumber: 'INV-2026-4401',
        amount: 34000,
        currency: 'USD',
        status: 'paid',
        date: '2026-08-05',
        productName: 'OMNI Edge Node Appliance (x50 Units)'
      }
    ],
    messagesCount: 22,
    eventsAttended: [],
    consent: {
      status: 'granted',
      grantedAt: '2025-07-11T13:00:00Z',
      legalBasis: 'contractual_obligation',
      scope: ['invoicing', 'logistics_tracking', 'warranty_claims'],
      proofHash: '0xaa11bb22cc33dd44ee55ff66aa77bb88cc99dd00'
    },
    createdAt: '2025-07-11T13:00:00Z',
    updatedAt: '2026-08-10T17:00:00Z',
    lastContactedAt: '2026-08-10T16:00:00Z',
    isFavorite: false
  },
  {
    id: 'cnt_ecclesia_01',
    tenantId: 'tenant_primary_001',
    ownerProfileId: 'prof_gideon_001',
    source: 'omni_passport',
    name: 'Ecclesia Global Network (Secretariat)',
    displayName: 'Ecclesia Global Secretariat',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-195fe5787e91?w=150',
    jobTitle: 'Executive Secretary',
    organisation: 'Ecclesia World Alliance',
    department: 'General Secretariat',
    phone: '+44 20 8900 1200',
    email: 'secretariat@ecclesiaglobal.org',
    address: 'Westminster, London, UK',
    website: 'https://ecclesiaglobal.org',
    linkedOmniHandle: '@ecclesiaglobal',
    relationshipType: 'member',
    lifecycleStage: 'relationship',
    circleIds: ['circle_faith_members'],
    tags: ['Faith Alliance', 'Diocese Portal', 'Global Missions'],
    notes: 'Operating diocese portal on OMNI Pages; broadcasting sermons to 140 countries.',
    dealValue: 0,
    currency: 'USD',
    leadScore: 95,
    interactions: [
      {
        id: 'int_08',
        type: 'meeting',
        title: 'Global Prayer Broadcast Infrastructure Setup',
        description: 'Tested WebRTC ultra-low latency mesh stream across 4 international hubs.',
        timestamp: '2026-08-18T18:15:00Z',
        actorName: 'Gideon Oluwalanadynasty',
        channel: 'OMNI Video Room',
        durationMinutes: 50
      }
    ],
    orders: [],
    messagesCount: 89,
    eventsAttended: ['Global Day of Prayer', 'Ecclesia Annual Synod 2026'],
    consent: {
      status: 'granted',
      grantedAt: '2025-02-14T12:00:00Z',
      legalBasis: 'explicit_consent',
      scope: ['ministry_updates', 'sermon_broadcasts', 'volunteer_rosters'],
      proofHash: '0xbb22cc33dd44ee55ff66aa77bb88cc99dd00ee11'
    },
    createdAt: '2025-02-14T12:00:00Z',
    updatedAt: '2026-08-18T19:00:00Z',
    lastContactedAt: '2026-08-18T18:15:00Z',
    isFavorite: true
  }
];

export const SEED_AI_RECOMMENDATIONS: AiRelationshipRecommendation[] = [
  {
    id: 'rec_01',
    profileId: 'prof_gabriel_01',
    name: 'Gabriel Sterling, PhD',
    handle: '@gabriel_ai',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    entityType: 'person',
    mutualConnectionsCount: 12,
    mutualCircles: ['OMNI Core Labs', 'Fintech & Cloud Systems'],
    compatibilityScore: 96,
    rationale: 'Top AI research lead specializing in localized LLM inference. Highly aligned with OMNI AI Mesh roadmap.',
    recommendedRelationship: 'partner'
  },
  {
    id: 'rec_02',
    profileId: 'prof_apex_fin',
    name: 'Apex Merchant Alliance',
    handle: '@apex_merchants',
    avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
    entityType: 'business',
    mutualConnectionsCount: 8,
    mutualCircles: ['Strategic Alliance Partners', 'VIP Enterprise Clients'],
    compatibilityScore: 91,
    rationale: 'Consortium of 1,200 European retailers looking to integrate OMNI Social Storefronts & 1-click OmniPay.',
    recommendedRelationship: 'customer'
  },
  {
    id: 'rec_03',
    profileId: 'prof_grace_fellowship',
    name: 'Grace International Fellowship',
    handle: '@grace_fellowship',
    avatarUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=150',
    entityType: 'organisation',
    mutualConnectionsCount: 15,
    mutualCircles: ['Ecclesia Assembly Members', 'Faith & Missions'],
    compatibilityScore: 94,
    rationale: '50-branch church network seeking OMNI Pages diocese management & instant tithe remittance.',
    recommendedRelationship: 'member'
  }
];

export const SEED_AI_FOLLOW_UPS: AiFollowUpSuggestion[] = [
  {
    id: 'flw_01',
    contactId: 'cnt_lead_01',
    contactName: 'Amina Bello (PaySahara)',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    relationshipType: 'lead',
    lastContactDaysAgo: 4,
    priority: 'high',
    reason: 'Commercial proposal sent 4 days ago. Inbound review window closes in 48 hours.',
    recommendedAction: 'Schedule 20-min technical review on virtual BaaS ledger pricing.',
    suggestedDraft: 'Hi Amina, following up on our BaaS integration proposal. Would you have 15 minutes tomorrow to address any technical questions on multi-currency settlement?',
    dueDate: '2026-08-20'
  },
  {
    id: 'flw_02',
    contactId: 'cnt_sarah_01',
    contactName: 'Sarah Chen, CFA (Apex Capital)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    relationshipType: 'partner',
    lastContactDaysAgo: 2,
    priority: 'medium',
    reason: 'Sarah inquired about the Q3 FX liquidity pool term sheet. Action item on our side.',
    recommendedAction: 'Send updated FX hedging simulation and NGN corridor fee schedule.',
    suggestedDraft: 'Sarah, attaching the updated Q3 FX hedging simulations for the West African corridor. Let me know if the 0.08% spread cap meets committee criteria.',
    dueDate: '2026-08-21'
  },
  {
    id: 'flw_03',
    contactId: 'cnt_horizon_01',
    contactName: 'Horizon Logistics & Hardware',
    avatarUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150',
    relationshipType: 'supplier',
    lastContactDaysAgo: 9,
    priority: 'low',
    reason: 'Batch #44 shipment confirmed. Re-order trigger due in 12 days for PoS chip stock.',
    recommendedAction: 'Request Q4 delivery schedule and volume discount tier for 500 units.',
    dueDate: '2026-08-25'
  }
];

export const SEED_AI_OPPORTUNITIES: AiOpportunitySignal[] = [
  {
    id: 'opp_01',
    contactId: 'cnt_lead_01',
    contactName: 'Amina Bello',
    organisation: 'PaySahara Africa',
    title: 'BaaS Virtual Accounts & Cross-Border Ledger (250k Merchants)',
    estimatedValue: 180000,
    currency: 'USD',
    probability: 78,
    rationale: 'PaySahara CEO mentioned regulatory deadline for multi-currency reserves by end of Q3.',
    triggerEvent: 'High engagement on OMNI BaaS API documentation (14 page views yesterday).'
  },
  {
    id: 'opp_02',
    contactId: 'cnt_vance_01',
    contactName: 'Dr. Marcus Vance',
    organisation: 'Vance BioHealth',
    title: 'Add-on: 50x OMNI Edge Terminals for Clinical Centers',
    estimatedValue: 35000,
    currency: 'USD',
    probability: 88,
    rationale: 'Patient portal traffic surged by 340% following custom domain deployment.',
    triggerEvent: 'Marcus created 3 new staff administrator profiles in OMNI Connect.'
  },
  {
    id: 'opp_03',
    contactId: 'cnt_fenol_01',
    contactName: 'Fenol Tech HQ',
    organisation: 'Fenol Group Global',
    title: 'Multi-Region Treasury OS Mesh Expansion (APAC Node)',
    estimatedValue: 95000,
    currency: 'USD',
    probability: 92,
    rationale: 'Fenol Singapore entity registered under OMNI Passport multi-tenant directory.',
    triggerEvent: 'Cross-tenant federation request received from Singapore branch.'
  }
];

export const SEED_AI_ENGAGEMENT_PATTERNS: AiEngagementPattern[] = [
  {
    contactId: 'cnt_fenol_01',
    contactName: 'Fenol Tech HQ',
    trend: 'increasing',
    sentiment: 'enthusiastic',
    engagementScore: 98,
    riskOfChurn: false,
    notes: 'Highest interaction density in ecosystem. 142 DMs, zero latency response time.'
  },
  {
    contactId: 'cnt_vance_01',
    contactName: 'Dr. Marcus Vance',
    trend: 'stable',
    sentiment: 'positive',
    engagementScore: 89,
    riskOfChurn: false,
    notes: 'Consistent weekly login and meeting attendance. High satisfaction rating.'
  },
  {
    contactId: 'cnt_lead_01',
    contactName: 'Amina Bello (PaySahara)',
    trend: 'increasing',
    sentiment: 'positive',
    engagementScore: 82,
    riskOfChurn: false,
    notes: 'Rapidly converting lead. Engagement score increased by +34 points this week.'
  },
  {
    contactId: 'cnt_horizon_01',
    contactName: 'Horizon Logistics',
    trend: 'stable',
    sentiment: 'neutral',
    engagementScore: 68,
    riskOfChurn: false,
    notes: 'Operational supplier relationship. Interactions occur strictly during order fulfillment.'
  }
];

export const SEED_ADMIN_POLICIES: RelationshipAdminPolicies = {
  id: 'pol_rel_001',
  tenantId: 'tenant_primary_001',
  allowCrossTenantSearch: false, // Strict sovereign privacy
  defaultRelationshipVisibility: 'circle_only',
  enableAutomaticAiIntelligence: true,
  dataRetentionDays: 365 * 3, // 3 years default retention with proof
  requireExplicitConsentForImports: true,
  blockedDomainImports: ['spam-crawler.net', 'harvest-leads.io'],
  maxCirclesPerUser: 50,
  enforceZeroKnowledgeGraphPrivacy: true
};
