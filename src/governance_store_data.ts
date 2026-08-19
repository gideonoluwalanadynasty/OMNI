import { GovernancePolicy, AdminApprovalTask, FeatureFlag } from './types';

export const SEED_GOVERNANCE_POLICIES: GovernancePolicy[] = [
  {
    id: 'pol_affiliate_commission_limit',
    name: 'Affiliate Commission Cap Rate',
    category: 'affiliate',
    description: 'The maximum permissible percentage commission rate awarded on secondary level referral conversions.',
    value: 25.0, // 25% max
    isEnabled: true,
    approvalRequired: true,
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'pol_payout_hold_threshold',
    name: 'High-Value Payout Security Hold Limit',
    category: 'payout',
    description: 'Payout requests exceeding this USD threshold are automatically placed on a 14-day compliance audit hold.',
    value: 5000.00, // $5,000 threshold
    isEnabled: true,
    approvalRequired: true,
    updatedAt: '2026-08-05T09:30:00Z'
  },
  {
    id: 'pol_ai_spending_limit_standard',
    name: 'Standard Tier AI Agent Monthly Limit',
    category: 'ai',
    description: 'The absolute monthly monetary spending ceiling (USD) allocated per standard client organization tenant.',
    value: 500.00, // $500 ceiling
    isEnabled: true,
    approvalRequired: false,
    updatedAt: '2026-08-10T14:15:00Z'
  },
  {
    id: 'pol_reseller_subnode_cap',
    name: 'Maximum Sub-Nodes per Reseller',
    category: 'reseller',
    description: 'The maximum number of downstream white-label child reseller instances permitted per main regional franchisee node.',
    value: 5, // max 5 sub-nodes
    isEnabled: true,
    approvalRequired: true,
    updatedAt: '2026-07-20T10:00:00Z'
  },
  {
    id: 'pol_app_access_security_review',
    name: 'App Store Third-Party Registry Approval',
    category: 'app',
    description: 'Requires all third-party external developer app integrations to complete an automated sandbox audit review.',
    value: 'required', // String flag
    isEnabled: true,
    approvalRequired: true,
    updatedAt: '2026-08-12T16:00:00Z'
  },
  {
    id: 'pol_country_restrictions_list',
    name: 'Jurisdictional Sovereign Blocks',
    category: 'country',
    description: 'Sanctioned or regulatory restricted country codes blocked from registering white-label platforms.',
    value: ['KP', 'IR', 'SY', 'CU'], // Restricted ISO codes
    isEnabled: true,
    approvalRequired: true,
    updatedAt: '2026-08-14T11:00:00Z'
  }
];

export const SEED_ADMIN_APPROVAL_TASKS: AdminApprovalTask[] = [
  {
    id: 'tsk_suspend_usr_malicious',
    actionType: 'SUSPEND_USER',
    requestedBy: 'usr_artisan_2',
    requestedByEmail: 'security-reviewer@omni.io',
    payload: { userId: 'usr_unverified_investor', reason: 'Repeated KYC document mismatch and potential multi-accounting fraud alerts.' },
    description: 'Suspend Adebayo investor account pending manual W-8BEN validation.',
    status: 'pending',
    createdAt: '2026-08-14T20:30:00Z'
  },
  {
    id: 'tsk_release_payout_high',
    actionType: 'RELEASE_PAYOUT',
    requestedBy: 'usr_student_1',
    requestedByEmail: 'finance-officer@omni.io',
    payload: { payoutId: 'pay_growth_reseller_bonus', amount: 8500.00, recipient: 'Adebayo Textiles LLC' },
    description: 'Release high-value white-label reseller performance bonus override ($8,500.00).',
    status: 'pending',
    createdAt: '2026-08-15T01:10:00Z'
  },
  {
    id: 'tsk_approve_offering_securities',
    actionType: 'APPROVE_OFFERING',
    requestedBy: 'usr_gideon',
    requestedByEmail: 'gideonoluwalanadynasty@gmail.com',
    payload: { offeringId: 'off_series_a_sovereign_growth', title: 'Series A Sovereign Ledger Funding' },
    description: 'Approve public filing and legal disclosures release for the Series A private placement stock round.',
    status: 'pending',
    createdAt: '2026-08-15T03:00:00Z'
  },
  {
    id: 'tsk_revoke_app_malware',
    actionType: 'REVOKE_APP',
    requestedBy: 'usr_artisan_2',
    requestedByEmail: 'marketplace-audit@omni.io',
    payload: { appId: 'app_sales_boost', reason: 'App sandbox requests unauthorized write permissions on organization master invoice logs.' },
    description: 'Instantly revoke OMNI App Store developer app "Omni Sales Booster" and disable current installations.',
    status: 'pending',
    createdAt: '2026-08-15T03:45:00Z'
  }
];

export const SEED_ADVANCED_FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'flag_multi_tenant_sso',
    name: 'Enterprise SAML / Single Sign-On',
    key: 'omni.auth.sso',
    description: 'Enables custom SAML 2.0 and OIDC connection portals per white-label client domain.',
    isEnabled: false,
    tenantScope: 'enterprise-only',
    createdAt: '2026-05-15T08:00:00Z',
    isGlobal: false,
    targetTenants: ['ten_artisan_dynasty'],
    targetApps: [],
    targetCountries: ['US', 'NG', 'GB'],
    targetPlans: ['Enterprise', 'Sovereign Growth'],
    targetUserCohorts: ['beta-testers']
  },
  {
    id: 'flag_sovereign_double_entry_ledger',
    name: 'Sovereign Cryptographic Ledger Audit',
    key: 'omni.finance.cryptoledger',
    description: 'Enables real-time SHA-256 block verification seal hashing on double-entry ledger database commits.',
    isEnabled: true,
    tenantScope: 'all',
    createdAt: '2026-06-01T10:00:00Z',
    isGlobal: true,
    targetTenants: [],
    targetApps: ['Pay'],
    targetCountries: [],
    targetPlans: [],
    targetUserCohorts: []
  },
  {
    id: 'flag_ai_autonomy_agent_override',
    name: 'Autonomous Agent Tool Permission Bypass',
    key: 'omni.ai.autonomy_bypass',
    description: 'Allows autonomous support agents to write invoice refunds up to $50 without explicit humans approval.',
    isEnabled: false,
    tenantScope: 'growth-enterprise',
    createdAt: '2026-07-10T12:00:00Z',
    isGlobal: false,
    targetTenants: [],
    targetApps: [],
    targetCountries: [],
    targetPlans: ['Enterprise'],
    targetUserCohorts: ['advanced-agents']
  }
];
