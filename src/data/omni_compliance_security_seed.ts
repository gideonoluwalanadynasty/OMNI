import {
  KycVerificationRecord,
  KybVerificationRecord,
  AmlMonitoringRule,
  AmlAlertRecord,
  FraudDetectionRule,
  ComplianceCaseRecord,
  CountryRulePack,
  ComplianceProviderAdapter,
  SecurityIntelligenceEvent,
  ImmutableComplianceAuditLog
} from '../types/finance_os';

export const SEED_KYC_RECORDS: KycVerificationRecord[] = [
  {
    id: 'kyc_01',
    userId: 'usr_sarah_01',
    userName: 'Sarah Jenkins',
    email: 'sarah.j@enterprise-tech.io',
    nationality: 'United States',
    idType: 'passport',
    idNumber: 'USA-908124982',
    status: 'approved',
    riskTier: 'low',
    biometricMatchScore: 99.4,
    livenessPassed: true,
    sanctionsHit: false,
    pepHit: false,
    addressProofStatus: 'verified',
    provider: 'OmniBiometrics 3D Liveness v3',
    submittedAt: '2026-08-10T11:20:00Z',
    verifiedAt: '2026-08-10T11:22:15Z'
  },
  {
    id: 'kyc_02',
    userId: 'usr_alex_02',
    userName: 'Alexander Vance',
    email: 'a.vance@quantum-shipping.co.uk',
    nationality: 'United Kingdom',
    idType: 'passport',
    idNumber: 'GBR-782104991',
    status: 'review_required',
    riskTier: 'medium',
    biometricMatchScore: 91.2,
    livenessPassed: true,
    sanctionsHit: false,
    pepHit: true, // PEP Match: Former Deputy Minister (Local Council)
    addressProofStatus: 'unverified',
    provider: 'Sumsub Global KYC Adapter',
    submittedAt: '2026-08-16T14:10:00Z'
  },
  {
    id: 'kyc_03',
    userId: 'usr_dmitri_03',
    userName: 'Dmitri Rostova',
    email: 'd.rostova@offshore-trade.net',
    nationality: 'Cyprus',
    idType: 'national_id',
    idNumber: 'CYP-1049921',
    status: 'rejected',
    riskTier: 'high',
    biometricMatchScore: 42.0,
    livenessPassed: false,
    sanctionsHit: true, // OFAC Specially Designated Nationals List
    pepHit: false,
    addressProofStatus: 'rejected',
    provider: 'LexisNexis Bridger Sanctions Adapter',
    submittedAt: '2026-08-15T09:30:00Z',
    verifiedAt: '2026-08-15T09:31:00Z',
    rejectionReason: 'Positive Sanctions List match (OFAC SDN #8921) & failed facial liveness check.'
  },
  {
    id: 'kyc_04',
    userId: 'usr_ade_04',
    userName: 'Adewale Balogun',
    email: 'adewale@lagosfintech.ng',
    nationality: 'Nigeria',
    idType: 'national_id',
    idNumber: 'NGA-NIN-991204918',
    status: 'approved',
    riskTier: 'low',
    biometricMatchScore: 98.8,
    livenessPassed: true,
    sanctionsHit: false,
    pepHit: false,
    addressProofStatus: 'verified',
    provider: 'Nigeria NIMC Direct National ID Adapter',
    submittedAt: '2026-08-14T16:00:00Z',
    verifiedAt: '2026-08-14T16:01:40Z'
  }
];

export const SEED_KYB_RECORDS: KybVerificationRecord[] = [
  {
    id: 'kyb_01',
    tenantId: 'tnt_corp_omni_tech',
    legalBusinessName: 'OMNI Sovereign Tech Inc.',
    tradeName: 'OMNI Enterprise Systems',
    jurisdiction: 'United States (Delaware #7819204)',
    registrationNumber: 'DE-CORP-7819204',
    taxId: 'US-EIN-89-2147102',
    businessAddress: '100 Enterprise Way, Suite 400, Wilmington, DE 19801',
    directors: [
      { name: 'Sarah Jenkins', role: 'Executive Chairman & CEO', kycStatus: 'approved' },
      { name: 'David Hoffman', role: 'Chief Financial Officer', kycStatus: 'approved' },
      { name: 'Dr. Elena Rostova', role: 'Chief Risk Officer', kycStatus: 'approved' }
    ],
    shareholders: [
      { name: 'OMNI Sovereign Founders Trust', ownershipPct: 58.4, isUbo: true },
      { name: 'Apex Horizon Capital LLC', ownershipPct: 24.1, isUbo: true },
      { name: 'Employee Equity Pool', ownershipPct: 17.5, isUbo: false }
    ],
    uboVerified: true,
    status: 'approved',
    riskClassification: 'low',
    industryCategory: 'Financial Technology & Cloud Infrastructure',
    documents: [
      { docType: 'Certificate of Good Standing', docName: 'DE_Good_Standing_2026.pdf', verified: true },
      { docType: 'Articles of Incorporation', docName: 'Omni_Articles_DE_Rev3.pdf', verified: true },
      { docType: 'Proof of Operational Address', docName: 'Wilmington_Commercial_Lease.pdf', verified: true }
    ],
    submittedAt: '2026-08-01T10:00:00Z',
    verifiedAt: '2026-08-01T10:15:00Z'
  },
  {
    id: 'kyb_02',
    tenantId: 'tnt_uk_sub',
    legalBusinessName: 'Vanguard Quantum Logistics Ltd',
    tradeName: 'Vanguard Freight UK',
    jurisdiction: 'United Kingdom (Companies House #12849102)',
    registrationNumber: 'GB-CRN-12849102',
    taxId: 'GB-VAT-902148109',
    businessAddress: '25 Bank Street, Canary Wharf, London E14 5JP',
    directors: [
      { name: 'Alexander Vance', role: 'Managing Director', kycStatus: 'review_required' },
      { name: 'Claire Dubois', role: 'Finance Director', kycStatus: 'approved' }
    ],
    shareholders: [
      { name: 'Alexander Vance', ownershipPct: 42.0, isUbo: true },
      { name: 'Dubois Global Holdings SA', ownershipPct: 38.0, isUbo: true },
      { name: 'UK Minority Angel Syndicate', ownershipPct: 20.0, isUbo: false }
    ],
    uboVerified: false,
    status: 'review_required',
    riskClassification: 'medium',
    industryCategory: 'Maritime Logistics & Multi-Modal Freight',
    documents: [
      { docType: 'Companies House Certificate', docName: 'UK_CH_12849102.pdf', verified: true },
      { docType: 'UBO Register Disclosure', docName: 'Vanguard_PSC_Register.pdf', verified: true },
      { docType: 'Director B Proof of Address', docName: 'Pending_Director_Utility.pdf', verified: false }
    ],
    submittedAt: '2026-08-16T09:00:00Z'
  }
];

export const SEED_AML_RULES: AmlMonitoringRule[] = [
  {
    id: 'aml_r_01',
    ruleCode: 'AML-RULE-CTR-10K',
    name: 'Currency Transaction Report (CTR) Single Large Transaction',
    category: 'unusual_size',
    threshold: 10000,
    thresholdUnit: 'USD',
    timeWindowMinutes: 0,
    severity: 'warning',
    jurisdictionScope: ['US', 'CA', 'AU'],
    isEnabled: true,
    actionOnTrigger: 'flag_alert'
  },
  {
    id: 'aml_r_02',
    ruleCode: 'AML-RULE-STRUCT-50K',
    name: 'Structuring / Smurfing Detection (Multiple Just Below Threshold)',
    category: 'structuring',
    threshold: 3,
    thresholdUnit: 'count_per_hour',
    timeWindowMinutes: 2880, // 48 Hours
    severity: 'critical',
    jurisdictionScope: ['ALL'],
    isEnabled: true,
    actionOnTrigger: 'require_step_up'
  },
  {
    id: 'aml_r_03',
    ruleCode: 'AML-RULE-VELOCITY-HIGH',
    name: 'Rapid Movement of Inflow to Immediate Outflow',
    category: 'rapid_movement',
    threshold: 90,
    thresholdUnit: 'ratio', // 90% of funds drained within 10 minutes
    timeWindowMinutes: 15,
    severity: 'critical',
    jurisdictionScope: ['ALL'],
    isEnabled: true,
    actionOnTrigger: 'delay_settlement'
  },
  {
    id: 'aml_r_04',
    ruleCode: 'AML-RULE-GEO-SANCTIONED',
    name: 'Transaction Originating or Terminating in High-Risk Corridor',
    category: 'unexpected_geography',
    threshold: 1,
    thresholdUnit: 'count_per_hour',
    timeWindowMinutes: 0,
    severity: 'critical',
    jurisdictionScope: ['ALL'],
    isEnabled: true,
    actionOnTrigger: 'block_transaction'
  }
];

export const SEED_AML_ALERTS: AmlAlertRecord[] = [
  {
    id: 'aml_alt_01',
    alertNumber: 'AML-ALT-2026-0914',
    ruleCode: 'AML-RULE-STRUCT-50K',
    ruleName: 'Structuring / Smurfing Detection (Multiple Just Below Threshold)',
    transactionId: 'TX-AML-90148',
    userId: 'usr_corp_apex_01',
    customerName: 'Apex Trade Dynamics GmbH',
    amount: 49500,
    currency: 'USD',
    triggeredAt: '2026-08-17T03:15:00Z',
    severity: 'critical',
    status: 'escalated_to_sar',
    aiNarrativeSummary: 'Customer executed 7 round-dollar deposits of $49,500 across 48 hours, structured exactly below the mandatory $50k enhanced due diligence trigger, followed by immediate outbound cross-border transfer.',
    assignedAnalyst: 'Mark Sterling (Senior AML Investigator)'
  },
  {
    id: 'aml_alt_02',
    alertNumber: 'AML-ALT-2026-0912',
    ruleCode: 'AML-RULE-CTR-10K',
    ruleName: 'Currency Transaction Report (CTR) Single Large Transaction',
    transactionId: 'TX-AML-89410',
    userId: 'usr_sarah_01',
    customerName: 'Sarah Jenkins',
    amount: 450000,
    currency: 'USD',
    triggeredAt: '2026-08-17T09:00:00Z',
    severity: 'info',
    status: 'cleared_false_positive',
    aiNarrativeSummary: 'Expected institutional treasury draw from Aegis Defence invoice #INV-842 with verified invoice documentation and contractual history.',
    assignedAnalyst: 'Automated Regulatory Filing Queue'
  }
];

export const SEED_FRAUD_RULES: FraudDetectionRule[] = [
  {
    id: 'frd_r_01',
    ruleName: 'Account Takeover (ATO) Impossible Travel Velocity',
    signalType: 'impossible_travel',
    condition: 'Login distance > 500 miles within 30 minutes from previous active session',
    action: 'challenge',
    riskScoreImpact: 45,
    isEnabled: true
  },
  {
    id: 'frd_r_02',
    ruleName: 'Tor Exit Node / Anonymizing VPN High-Value Outflow',
    signalType: 'suspicious_login',
    condition: 'Wire instruction > $50,000 created from verified Tor or Darknet proxy IP',
    action: 'block',
    riskScoreImpact: 75,
    isEnabled: true
  },
  {
    id: 'frd_r_03',
    ruleName: 'Brute Force Credential Burst (5+ Failed MFA attempts)',
    signalType: 'multiple_failed_attempts',
    condition: 'Failed authentication count >= 5 in 120 seconds',
    action: 'restrict',
    riskScoreImpact: 50,
    isEnabled: true
  },
  {
    id: 'frd_r_04',
    ruleName: 'New Unregistered Payee High-Velocity Drain',
    signalType: 'payment_anomaly',
    condition: 'Beneficiary bank added < 15 mins prior to transferring > 80% available balance',
    action: 'delay',
    riskScoreImpact: 60,
    isEnabled: true
  }
];

export const SEED_COMPLIANCE_CASES: ComplianceCaseRecord[] = [
  {
    id: 'case_comp_01',
    reference: 'CASE-AML-2026-0043',
    caseType: 'sar_filing',
    customerName: 'Apex Trade Dynamics GmbH',
    customerId: 'usr_corp_apex_01',
    severity: 'critical',
    status: 'escalated_to_mlro',
    assignedOfficer: 'Mark Sterling (MLRO Team)',
    openedAt: '2026-08-16T18:30:00Z',
    updatedAt: '2026-08-17T08:00:00Z',
    evidenceFiles: [
      { name: 'Wire_Flow_Graph_Apex.pdf', fileSize: '1.4 MB', uploadedAt: '2026-08-16T19:00:00Z' },
      { name: 'Cyprus_Counterparty_Invoices.pdf', fileSize: '3.8 MB', uploadedAt: '2026-08-16T19:15:00Z' }
    ],
    notes: [
      {
        author: 'OMNI Compliance AI',
        role: 'AI Assistant',
        text: 'Identified 7 structuring patterns totaling $346,500 with immediate outflow to Cypriot intermediary bank.',
        timestamp: '2026-08-16T18:35:00Z'
      },
      {
        author: 'Mark Sterling',
        role: 'Senior AML Analyst',
        text: 'Drafted FinCEN & BaFin SAR narrative. Holding outgoing SEPA wire batch pending MLRO formal sign-off.',
        timestamp: '2026-08-17T07:45:00Z'
      }
    ],
    associatedTransactionIds: ['TX-AML-90148', 'TX-AML-90149', 'TX-AML-90150']
  },
  {
    id: 'case_comp_02',
    reference: 'CASE-KYB-2026-0891',
    caseType: 'kyb_onboarding',
    customerName: 'Vanguard Quantum Logistics Ltd',
    customerId: 'usr_alex_02',
    severity: 'medium',
    status: 'pending_documentation',
    assignedOfficer: 'Claire Henderson (KYB Specialist)',
    openedAt: '2026-08-16T09:15:00Z',
    updatedAt: '2026-08-16T14:30:00Z',
    evidenceFiles: [
      { name: 'Companies_House_Filing.pdf', fileSize: '850 KB', uploadedAt: '2026-08-16T09:20:00Z' }
    ],
    notes: [
      {
        author: 'Claire Henderson',
        role: 'KYB Analyst',
        text: 'Director Vance matched PEP watchlist. Requesting secondary proof of residence for verification.',
        timestamp: '2026-08-16T14:30:00Z'
      }
    ],
    associatedTransactionIds: []
  }
];

export const SEED_COUNTRY_RULE_PACKS: CountryRulePack[] = [
  {
    id: 'rulepack_us',
    countryCode: 'US',
    countryName: 'United States',
    regulatoryBody: 'FinCEN / OCC / Fed',
    mandatoryKycThresholdUsd: 0,
    ctrReportingThresholdUsd: 10000,
    travelRuleThresholdUsd: 3000,
    pepLookbackYears: 5,
    restrictedCorridors: ['KP', 'IR', 'SY', 'CU'],
    isActive: true
  },
  {
    id: 'rulepack_uk',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    regulatoryBody: 'FCA / JMLSG',
    mandatoryKycThresholdUsd: 0,
    ctrReportingThresholdUsd: 12000,
    travelRuleThresholdUsd: 1000,
    pepLookbackYears: 7,
    restrictedCorridors: ['KP', 'IR', 'RU'],
    isActive: true
  },
  {
    id: 'rulepack_eu',
    countryCode: 'EU',
    countryName: 'European Union (Pan-Euro)',
    regulatoryBody: 'EBA / AMLA (AMLD6)',
    mandatoryKycThresholdUsd: 0,
    ctrReportingThresholdUsd: 10000,
    travelRuleThresholdUsd: 1000,
    pepLookbackYears: 5,
    restrictedCorridors: ['KP', 'IR', 'MM'],
    isActive: true
  },
  {
    id: 'rulepack_sg',
    countryCode: 'SG',
    countryName: 'Singapore',
    regulatoryBody: 'Monetary Authority of Singapore (MAS)',
    mandatoryKycThresholdUsd: 0,
    ctrReportingThresholdUsd: 15000,
    travelRuleThresholdUsd: 1500,
    pepLookbackYears: 5,
    restrictedCorridors: ['KP', 'IR'],
    isActive: true
  },
  {
    id: 'rulepack_ae',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    regulatoryBody: 'Central Bank of the UAE (CBUAE) / DFSA',
    mandatoryKycThresholdUsd: 0,
    ctrReportingThresholdUsd: 15000,
    travelRuleThresholdUsd: 1000,
    pepLookbackYears: 5,
    restrictedCorridors: ['KP', 'IR'],
    isActive: true
  },
  {
    id: 'rulepack_ng',
    countryCode: 'NG',
    countryName: 'Nigeria',
    regulatoryBody: 'Central Bank of Nigeria (CBN) / NFIU',
    mandatoryKycThresholdUsd: 0,
    ctrReportingThresholdUsd: 5000,
    travelRuleThresholdUsd: 1000,
    pepLookbackYears: 10,
    restrictedCorridors: ['KP', 'IR'],
    isActive: true
  }
];

export const SEED_COMPLIANCE_PROVIDERS: ComplianceProviderAdapter[] = [
  {
    id: 'prov_sanc_01',
    name: 'LexisNexis Bridger Global Watchlist',
    adapterType: 'sanctions',
    providerName: 'LexisNexis Risk Solutions',
    apiStatus: 'connected',
    avgLatencyMs: 140,
    dailyMatchCount: 1420,
    isDefault: true
  },
  {
    id: 'prov_pep_01',
    name: 'Refinitiv World-Check One PEP Radar',
    adapterType: 'pep',
    providerName: 'LSEG / Refinitiv',
    apiStatus: 'connected',
    avgLatencyMs: 180,
    dailyMatchCount: 890,
    isDefault: true
  },
  {
    id: 'prov_adv_01',
    name: 'ComplyAdvantage Real-Time Adverse Media',
    adapterType: 'adverse_media',
    providerName: 'ComplyAdvantage Inc.',
    apiStatus: 'connected',
    avgLatencyMs: 220,
    dailyMatchCount: 310,
    isDefault: true
  },
  {
    id: 'prov_bio_01',
    name: 'OmniBiometrics 3D Liveness & Facial OCR',
    adapterType: 'biometric_kyc',
    providerName: 'OMNI Sovereign Trust Labs',
    apiStatus: 'connected',
    avgLatencyMs: 95,
    dailyMatchCount: 5400,
    isDefault: true
  },
  {
    id: 'prov_kyb_01',
    name: 'Companies House & Dun & Bradstreet Registry',
    adapterType: 'kyb_registry',
    providerName: 'D&B Direct Integration',
    apiStatus: 'connected',
    avgLatencyMs: 310,
    dailyMatchCount: 120,
    isDefault: true
  }
];

export const SEED_SECURITY_EVENTS: SecurityIntelligenceEvent[] = [
  {
    id: 'sec_evt_01',
    eventType: 'privilege_escalation_attempt',
    sourceIp: '185.220.101.42 (Tor Exit Node)',
    actorEmail: 'unknown_attacker@dark-route.onion',
    tenantId: 'tnt_corp_omni_tech',
    severity: 'critical',
    description: 'Attempted brute-force invocation of SuperAdmin /api/v1/treasury/bypass_limits endpoint with forged JWT.',
    actionTaken: 'ip_rate_limited',
    timestamp: '2026-08-17T03:14:50Z'
  },
  {
    id: 'sec_evt_02',
    eventType: 'login_anomaly',
    sourceIp: '194.26.29.112 (Seychelles VPN)',
    actorEmail: 'usr_corp_apex_01@apex-dynamics.de',
    tenantId: 'tnt_corp_omni_tech',
    severity: 'high',
    description: 'Impossible travel anomaly: Login from Seychelles 18 minutes after active session in Frankfurt, Germany.',
    actionTaken: 'session_terminated',
    timestamp: '2026-08-17T03:15:10Z'
  },
  {
    id: 'sec_evt_03',
    eventType: 'api_abuse',
    sourceIp: '45.154.255.89 (Scraper Botnet)',
    actorEmail: 'developer_sandbox@external.com',
    tenantId: 'tnt_personal_default',
    severity: 'medium',
    description: 'Burst of 4,200 requests/minute to public FX rate API exceeding rate limit of 120 req/min.',
    actionTaken: 'ip_rate_limited',
    timestamp: '2026-08-17T06:40:00Z'
  }
];

export const SEED_COMPLIANCE_AUDIT_LOGS: ImmutableComplianceAuditLog[] = [
  {
    id: 'aud_01',
    actor: 'Mark Sterling (Senior AML Investigator)',
    actorRole: 'Senior Investigator',
    action: 'AML Case Escalation to MLRO',
    timestamp: '2026-08-17T07:45:00Z',
    tenantId: 'tnt_corp_omni_tech',
    resource: 'CASE-AML-2026-0043',
    reason: 'Confirmed multi-hop structuring pattern totaling $346,500.',
    previousState: 'status: in_progress',
    newState: 'status: escalated_to_mlro',
    merkleHash: '0x8f29410ea89b418a049102847aef92147102948a049182740192847190284710',
    isLocked: true
  },
  {
    id: 'aud_02',
    actor: 'Sarah Jenkins (Chairman & CEO)',
    actorRole: 'Executive Super Admin',
    action: 'Country Rule Pack Activation',
    timestamp: '2026-08-15T12:00:00Z',
    tenantId: 'tnt_corp_omni_tech',
    resource: 'RULEPACK-EU-AMLD6',
    reason: 'Enacted mandatory EU 10-second SEPA instant payment verification standard.',
    previousState: 'isActive: false',
    newState: 'isActive: true',
    merkleHash: '0x3a4b910481029471029481720491827401928471902847104918274019284719',
    isLocked: true
  }
];
