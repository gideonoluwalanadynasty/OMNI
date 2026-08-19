import {
  EnterpriseLegalEntity,
  EnterpriseDepartment,
  EnterpriseCostCentre,
  EnterpriseProject,
  EnterpriseCashPosition,
  EnterpriseCashForecast,
  EnterpriseLiquidityPool,
  InternalTransferRequest,
  IntercompanyTransaction,
  IntercompanyNettingMatrix,
  CorporatePaymentBatch,
  EnterpriseApprovalRequest,
  EnterpriseBudget,
  CurrencyExposureItem,
  TreasuryRiskAlert,
  TreasuryAiAdvisory,
  EnterpriseAuditTrailRecord
} from '../types/finance_os';

export const SEED_ENTERPRISE_ENTITIES: EnterpriseLegalEntity[] = [
  {
    id: 'ent_parent_001',
    code: 'OMNI-GLOBAL-HQ',
    name: 'OMNI Sovereign Technologies Group Inc.',
    legalRegistrationName: 'OMNI Sovereign Technologies Group Incorporated (Delaware)',
    entityType: 'parent_holding',
    jurisdiction: 'United States - Delaware (DE-8492014)',
    countryCode: 'US',
    taxIdentifier: 'EIN-XX-9482019',
    functionalCurrency: 'USD',
    reportingCurrency: 'USD',
    ownershipPercent: 100,
    treasuryPoolId: 'pool_global_usd',
    status: 'active',
    totalLiquidityUsd: 142850000.00,
    totalOperatingCashUsd: 38400000.00,
    totalPayablesUsd: 4200000.00,
    totalReceivablesUsd: 18900000.00,
    activeAccountsCount: 6,
    intercompanyCreditRating: 'AAA',
    kybStatus: 'verified',
    createdAt: '2025-01-15T08:00:00Z'
  },
  {
    id: 'ent_sub_uk_002',
    code: 'OMNI-UK-LTD',
    name: 'OMNI Financial Technologies (UK) Ltd',
    legalRegistrationName: 'OMNI Financial Technologies United Kingdom Limited',
    entityType: 'subsidiary',
    jurisdiction: 'United Kingdom - England & Wales (UK-1489201)',
    countryCode: 'GB',
    taxIdentifier: 'VAT-GB-9402194',
    functionalCurrency: 'GBP',
    reportingCurrency: 'USD',
    ownershipPercent: 100,
    parentEntityId: 'ent_parent_001',
    treasuryPoolId: 'pool_global_usd',
    status: 'active',
    totalLiquidityUsd: 46200000.00,
    totalOperatingCashUsd: 12500000.00,
    totalPayablesUsd: 1850000.00,
    totalReceivablesUsd: 6400000.00,
    activeAccountsCount: 4,
    intercompanyCreditRating: 'AA+',
    kybStatus: 'verified',
    createdAt: '2025-03-10T10:00:00Z'
  },
  {
    id: 'ent_sub_sg_003',
    code: 'OMNI-APAC-SG',
    name: 'OMNI Asia-Pacific Treasury Pte. Ltd.',
    legalRegistrationName: 'OMNI Asia-Pacific Treasury Private Limited (Singapore)',
    entityType: 'treasury_center',
    jurisdiction: 'Singapore - ACRA (UEN-202518920K)',
    countryCode: 'SG',
    taxIdentifier: 'GST-M9028190X',
    functionalCurrency: 'SGD',
    reportingCurrency: 'USD',
    ownershipPercent: 100,
    parentEntityId: 'ent_parent_001',
    treasuryPoolId: 'pool_apac_notional',
    status: 'active',
    totalLiquidityUsd: 58900000.00,
    totalOperatingCashUsd: 16800000.00,
    totalPayablesUsd: 920000.00,
    totalReceivablesUsd: 8100000.00,
    activeAccountsCount: 5,
    intercompanyCreditRating: 'AAA',
    kybStatus: 'verified',
    createdAt: '2025-04-01T06:00:00Z'
  },
  {
    id: 'ent_sub_de_004',
    code: 'OMNI-EU-GMBH',
    name: 'OMNI European Banking Infrastructure GmbH',
    legalRegistrationName: 'OMNI European Banking Infrastructure Gesellschaft mit beschränkter Haftung',
    entityType: 'subsidiary',
    jurisdiction: 'Germany - Frankfurt am Main (HRB-98421)',
    countryCode: 'DE',
    taxIdentifier: 'DE-849201948',
    functionalCurrency: 'EUR',
    reportingCurrency: 'USD',
    ownershipPercent: 100,
    parentEntityId: 'ent_parent_001',
    treasuryPoolId: 'pool_global_usd',
    status: 'active',
    totalLiquidityUsd: 34100000.00,
    totalOperatingCashUsd: 9400000.00,
    totalPayablesUsd: 1450000.00,
    totalReceivablesUsd: 4900000.00,
    activeAccountsCount: 4,
    intercompanyCreditRating: 'AA+',
    kybStatus: 'verified',
    createdAt: '2025-05-18T09:30:00Z'
  },
  {
    id: 'ent_sub_ae_005',
    code: 'OMNI-MENA-FZ',
    name: 'OMNI Middle East & Africa FZ-LLC',
    legalRegistrationName: 'OMNI Middle East Sovereign Capital Free Zone LLC (DIFC)',
    entityType: 'regional_branch',
    jurisdiction: 'United Arab Emirates - Dubai DIFC (DIFC-8492)',
    countryCode: 'AE',
    taxIdentifier: 'TRN-1002948201',
    functionalCurrency: 'USD',
    reportingCurrency: 'USD',
    ownershipPercent: 85,
    parentEntityId: 'ent_parent_001',
    treasuryPoolId: 'pool_global_usd',
    status: 'active',
    totalLiquidityUsd: 22400000.00,
    totalOperatingCashUsd: 7100000.00,
    totalPayablesUsd: 650000.00,
    totalReceivablesUsd: 3200000.00,
    activeAccountsCount: 3,
    intercompanyCreditRating: 'A',
    kybStatus: 'verified',
    createdAt: '2025-07-22T11:00:00Z'
  },
  {
    id: 'ent_sub_ng_006',
    code: 'OMNI-NGR-LTD',
    name: 'OMNI Digital Payments West Africa Ltd',
    legalRegistrationName: 'OMNI Digital Payments West Africa Limited (Lagos)',
    entityType: 'subsidiary',
    jurisdiction: 'Nigeria - CAC (RC-1948201)',
    countryCode: 'NG',
    taxIdentifier: 'TIN-94820194-0001',
    functionalCurrency: 'NGN',
    reportingCurrency: 'USD',
    ownershipPercent: 100,
    parentEntityId: 'ent_parent_001',
    treasuryPoolId: 'pool_global_usd',
    status: 'active',
    totalLiquidityUsd: 11800000.00,
    totalOperatingCashUsd: 3900000.00,
    totalPayablesUsd: 480000.00,
    totalReceivablesUsd: 2100000.00,
    activeAccountsCount: 3,
    intercompanyCreditRating: 'A',
    kybStatus: 'verified',
    createdAt: '2025-08-05T14:00:00Z'
  }
];

export const SEED_ENTERPRISE_DEPARTMENTS: EnterpriseDepartment[] = [
  {
    id: 'dep_treasury',
    entityId: 'ent_parent_001',
    code: 'DEP-TRS-01',
    name: 'Global Group Treasury & Liquidity',
    leadName: 'Victoria Sterling, CFA',
    leadEmail: 'v.sterling@omni.sovereign',
    headcount: 14,
    annualBudgetUsd: 4500000,
    spentToDateUsd: 2850000
  },
  {
    id: 'dep_eng',
    entityId: 'ent_parent_001',
    code: 'DEP-ENG-02',
    name: 'Core Financial Engineering & Cryptography',
    leadName: 'Dr. Marcus Vance',
    leadEmail: 'm.vance@omni.sovereign',
    headcount: 48,
    annualBudgetUsd: 18500000,
    spentToDateUsd: 11900000
  },
  {
    id: 'dep_ops',
    entityId: 'ent_sub_uk_002',
    code: 'DEP-OPS-03',
    name: 'Global Clearing & Payment Operations',
    leadName: 'Elena Rostova',
    leadEmail: 'e.rostova@omni.sovereign',
    headcount: 26,
    annualBudgetUsd: 6200000,
    spentToDateUsd: 3950000
  },
  {
    id: 'dep_legal',
    entityId: 'ent_sub_sg_003',
    code: 'DEP-LGL-04',
    name: 'Institutional Compliance & Jurisdictions',
    leadName: 'Tariq Al-Mansoor',
    leadEmail: 't.mansoor@omni.sovereign',
    headcount: 18,
    annualBudgetUsd: 5100000,
    spentToDateUsd: 3400000
  }
];

export const SEED_ENTERPRISE_COST_CENTRES: EnterpriseCostCentre[] = [
  {
    id: 'cc_infra_7010',
    entityId: 'ent_parent_001',
    departmentId: 'dep_eng',
    code: 'CC-7010-INFRA',
    name: 'Tier-4 Cloud Compute & Sovereign HSM Vaults',
    managerName: 'Devin Thorne',
    annualBudgetUsd: 8200000,
    spentToDateUsd: 5400000,
    committedPoUsd: 1200000,
    status: 'active'
  },
  {
    id: 'cc_fx_7020',
    entityId: 'ent_sub_sg_003',
    departmentId: 'dep_treasury',
    code: 'CC-7020-FXMM',
    name: 'Institutional FX Liquidity & Cross-Currency Swaps',
    managerName: 'Katsumi Tanaka',
    annualBudgetUsd: 3800000,
    spentToDateUsd: 2100000,
    committedPoUsd: 450000,
    status: 'active'
  },
  {
    id: 'cc_clearing_7030',
    entityId: 'ent_sub_uk_002',
    departmentId: 'dep_ops',
    code: 'CC-7030-RAILS',
    name: 'Direct Rail Settlement (FedNow, SEPA, SWIFT)',
    managerName: 'Arthur Pendelton',
    annualBudgetUsd: 4900000,
    spentToDateUsd: 3100000,
    committedPoUsd: 800000,
    status: 'active'
  }
];

export const SEED_ENTERPRISE_PROJECTS: EnterpriseProject[] = [
  {
    id: 'prj_global_hsm_2026',
    entityId: 'ent_parent_001',
    costCentreId: 'cc_infra_7010',
    code: 'PRJ-2026-HSM-VAULT',
    name: 'Sovereign Multi-Region Hardware Security Module Grid',
    projectType: 'capex',
    budgetUsd: 4500000,
    spentUsd: 3120000,
    forecastUsd: 4380000,
    variancePercent: -2.67,
    startDate: '2026-01-10',
    endDate: '2026-11-30',
    projectLead: 'Dr. Marcus Vance',
    status: 'active'
  },
  {
    id: 'prj_emea_clearing_2026',
    entityId: 'ent_sub_de_004',
    costCentreId: 'cc_clearing_7030',
    code: 'PRJ-2026-EU-TIPS',
    name: 'Direct ECB TIPS & Bundesbank Settlement Integration',
    projectType: 'strategic_m_and_a',
    budgetUsd: 3200000,
    spentUsd: 1950000,
    forecastUsd: 3100000,
    variancePercent: -3.12,
    startDate: '2026-02-15',
    endDate: '2026-09-30',
    projectLead: 'Elena Rostova',
    status: 'active'
  },
  {
    id: 'prj_apac_baas_2026',
    entityId: 'ent_sub_sg_003',
    costCentreId: 'cc_fx_7020',
    code: 'PRJ-2026-APAC-FX',
    name: 'Real-Time Cross-Border Multi-Currency Netting Router',
    projectType: 'rd_initiative',
    budgetUsd: 2800000,
    spentUsd: 1420000,
    forecastUsd: 2750000,
    variancePercent: -1.78,
    startDate: '2026-03-01',
    endDate: '2026-12-15',
    projectLead: 'Katsumi Tanaka',
    status: 'active'
  }
];

export const SEED_ENTERPRISE_CASH_POSITIONS: EnterpriseCashPosition[] = [
  {
    entityId: 'ent_parent_001',
    entityName: 'OMNI Sovereign Technologies Group Inc.',
    currency: 'USD',
    operatingBalance: 38400000.00,
    yieldVaultBalance: 92500000.00,
    clearingBalance: 5950000.00,
    escrowBalance: 3000000.00,
    taxReserveBalance: 3000000.00,
    totalUsdEquivalent: 142850000.00,
    effectiveApy: 5.48,
    lastReconciledAt: '2026-08-18T08:30:00Z'
  },
  {
    entityId: 'ent_sub_uk_002',
    entityName: 'OMNI Financial Technologies (UK) Ltd',
    currency: 'GBP',
    operatingBalance: 9800000.00, // in GBP (~$12.5M)
    yieldVaultBalance: 24200000.00,
    clearingBalance: 1200000.00,
    escrowBalance: 500000.00,
    taxReserveBalance: 500000.00,
    totalUsdEquivalent: 46200000.00,
    effectiveApy: 5.25,
    lastReconciledAt: '2026-08-18T08:30:00Z'
  },
  {
    entityId: 'ent_sub_sg_003',
    entityName: 'OMNI Asia-Pacific Treasury Pte. Ltd.',
    currency: 'SGD',
    operatingBalance: 22800000.00, // in SGD (~$16.8M)
    yieldVaultBalance: 51200000.00,
    clearingBalance: 3100000.00,
    escrowBalance: 1500000.00,
    taxReserveBalance: 1200000.00,
    totalUsdEquivalent: 58900000.00,
    effectiveApy: 5.15,
    lastReconciledAt: '2026-08-18T08:30:00Z'
  },
  {
    entityId: 'ent_sub_de_004',
    entityName: 'OMNI European Banking Infrastructure GmbH',
    currency: 'EUR',
    operatingBalance: 8650000.00, // in EUR (~$9.4M)
    yieldVaultBalance: 21200000.00,
    clearingBalance: 1100000.00,
    escrowBalance: 250000.00,
    taxReserveBalance: 150000.00,
    totalUsdEquivalent: 34100000.00,
    effectiveApy: 3.90,
    lastReconciledAt: '2026-08-18T08:30:00Z'
  },
  {
    entityId: 'ent_sub_ae_005',
    entityName: 'OMNI Middle East & Africa FZ-LLC',
    currency: 'USD',
    operatingBalance: 7100000.00,
    yieldVaultBalance: 14500000.00,
    clearingBalance: 400000.00,
    escrowBalance: 200000.00,
    taxReserveBalance: 200000.00,
    totalUsdEquivalent: 22400000.00,
    effectiveApy: 5.60,
    lastReconciledAt: '2026-08-18T08:30:00Z'
  },
  {
    entityId: 'ent_sub_ng_006',
    entityName: 'OMNI Digital Payments West Africa Ltd',
    currency: 'NGN',
    operatingBalance: 6240000000.00, // in NGN (~$3.9M)
    yieldVaultBalance: 11800000000.00,
    clearingBalance: 480000000.00,
    escrowBalance: 160000000.00,
    taxReserveBalance: 200000000.00,
    totalUsdEquivalent: 11800000.00,
    effectiveApy: 16.50,
    lastReconciledAt: '2026-08-18T08:30:00Z'
  }
];

export const SEED_ENTERPRISE_FORECAST: EnterpriseCashForecast = {
  period: '90d',
  generatedAt: '2026-08-18T08:45:00Z',
  baselineInflowsUsd: 84500000.00,
  baselineOutflowsUsd: 56200000.00,
  netCashflowUsd: 28300000.00,
  projectedClosingCashUsd: 344550000.00,
  optimisticCashUsd: 362100000.00,
  stressTestCashUsd: 318400000.00,
  dailyTimeline: [
    { date: '2026-08-18', projectedInflowUsd: 2450000, projectedOutflowUsd: 1100000, closingLiquidityUsd: 316250000, status: 'safe' },
    { date: '2026-08-25', projectedInflowUsd: 6800000, projectedOutflowUsd: 3200000, closingLiquidityUsd: 319850000, status: 'safe' },
    { date: '2026-08-31', projectedInflowUsd: 14200000, projectedOutflowUsd: 12400000, closingLiquidityUsd: 321650000, status: 'safe' },
    { date: '2026-09-15', projectedInflowUsd: 18500000, projectedOutflowUsd: 14100000, closingLiquidityUsd: 326050000, status: 'safe' },
    { date: '2026-09-30', projectedInflowUsd: 21900000, projectedOutflowUsd: 11800000, closingLiquidityUsd: 336150000, status: 'safe' },
    { date: '2026-10-15', projectedInflowUsd: 10400000, projectedOutflowUsd: 6800000, closingLiquidityUsd: 339750000, status: 'safe' },
    { date: '2026-10-31', projectedInflowUsd: 10250000, projectedOutflowUsd: 5450000, closingLiquidityUsd: 344550000, status: 'safe' }
  ],
  aiAdvisoryNotes: [
    'Liquidity runway is exceptionally solid at 58.4 months of OPEX burn.',
    'Recommend sweeping $18.5M surplus cash from operating checking accounts into 30-day Treasury Vaults (5.48% APY) to harvest an estimated $84,400 in net interest margin.',
    'EUR/USD exposure peaks on Sep 15 due to €12.5M institutional customer settlement; recommended 75% forward hedge lock at 1.0885.'
  ],
  riskAlerts: [
    'Month-end payroll and vendor clearing on Aug 31 requires $12.4M consolidated liquidity across US & UK operating pools.',
    'Currency volatility buffer in NGN subsidiary recommends maintaining maximum 10-day local working capital with automated daily sweep to USD/USDC.'
  ]
};

export const SEED_LIQUIDITY_POOLS: EnterpriseLiquidityPool[] = [
  {
    id: 'pool_global_usd',
    name: 'Global Consolidated USD Master Treasury Pool',
    leadEntityId: 'ent_parent_001',
    leadEntityName: 'OMNI Sovereign Technologies Group Inc.',
    participatingEntityIds: ['ent_parent_001', 'ent_sub_uk_002', 'ent_sub_sg_003', 'ent_sub_de_004', 'ent_sub_ae_005', 'ent_sub_ng_006'],
    poolType: 'notional_pooling',
    targetBalanceUsd: 150000000.00,
    currentBalanceUsd: 142850000.00,
    currency: 'USD',
    interestOptimizationRate: 5.48,
    autoSweepFrequency: 'real_time_eod',
    autoSweepEnabled: true,
    minSweepThresholdUsd: 250000.00,
    lastSweepAt: '2026-08-17T23:59:59Z'
  },
  {
    id: 'pool_apac_notional',
    name: 'APAC Multi-Currency Cross-Border Sweeping Pool',
    leadEntityId: 'ent_sub_sg_003',
    leadEntityName: 'OMNI Asia-Pacific Treasury Pte. Ltd.',
    participatingEntityIds: ['ent_sub_sg_003', 'ent_parent_001', 'ent_sub_uk_002'],
    poolType: 'physical_sweep',
    targetBalanceUsd: 50000000.00,
    currentBalanceUsd: 58900000.00,
    currency: 'USD',
    interestOptimizationRate: 5.15,
    autoSweepFrequency: 'twice_daily',
    autoSweepEnabled: true,
    minSweepThresholdUsd: 100000.00,
    lastSweepAt: '2026-08-18T06:00:00Z'
  },
  {
    id: 'pool_eu_sepa',
    name: 'European Single Euro Cash Concentration Pool',
    leadEntityId: 'ent_sub_de_004',
    leadEntityName: 'OMNI European Banking Infrastructure GmbH',
    participatingEntityIds: ['ent_sub_de_004', 'ent_sub_uk_002'],
    poolType: 'zero_balance_account',
    targetBalanceUsd: 30000000.00,
    currentBalanceUsd: 34100000.00,
    currency: 'EUR',
    interestOptimizationRate: 3.90,
    autoSweepFrequency: 'real_time_eod',
    autoSweepEnabled: true,
    minSweepThresholdUsd: 50000.00,
    lastSweepAt: '2026-08-17T22:00:00Z'
  }
];

export const SEED_INTERNAL_TRANSFERS: InternalTransferRequest[] = [
  {
    id: 'itr_849201',
    referenceNumber: 'ITR-2026-0818-01',
    fromEntityId: 'ent_parent_001',
    fromEntityName: 'OMNI Sovereign Technologies Group Inc.',
    fromAccountId: 'acc_parent_op_01',
    toEntityId: 'ent_sub_de_004',
    toEntityName: 'OMNI European Banking Infrastructure GmbH',
    toAccountId: 'acc_de_op_01',
    amount: 5000000.00,
    currency: 'USD',
    usdEquivalent: 5000000.00,
    transferType: 'intercompany_loan',
    interestRatePa: 4.50,
    agreementReference: 'ICA-2026-DE-004-LOAN',
    justification: 'Quarterly working capital facility for EU TIPS Direct Clearing pre-funding buffer.',
    status: 'approved',
    createdAt: '2026-08-18T06:30:00Z',
    merkleAuditHash: '0x7f48b9c02d1a3e8f6e5b4a3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e'
  },
  {
    id: 'itr_849202',
    referenceNumber: 'ITR-2026-0818-02',
    fromEntityId: 'ent_sub_sg_003',
    fromEntityName: 'OMNI Asia-Pacific Treasury Pte. Ltd.',
    fromAccountId: 'acc_sg_op_01',
    toEntityId: 'ent_parent_001',
    toEntityName: 'OMNI Sovereign Technologies Group Inc.',
    toAccountId: 'acc_parent_vault_01',
    amount: 12000000.00,
    currency: 'USD',
    usdEquivalent: 12000000.00,
    transferType: 'dividend',
    agreementReference: 'DIV-2026-SG-H1-REMIT',
    justification: 'H1 2026 APAC operating surplus repatriation and dividend upstream to parent.',
    status: 'executed',
    createdAt: '2026-08-17T11:00:00Z',
    executedAt: '2026-08-17T14:20:00Z',
    merkleAuditHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b'
  }
];

export const SEED_INTERCOMPANY_TRANSACTIONS: IntercompanyTransaction[] = [
  {
    id: 'ict_001',
    referenceNumber: 'IC-TX-2026-0801',
    originEntityId: 'ent_parent_001',
    originEntityName: 'OMNI Sovereign Technologies Group Inc.',
    counterpartyEntityId: 'ent_sub_uk_002',
    counterpartyEntityName: 'OMNI Financial Technologies (UK) Ltd',
    transactionType: 'ip_royalty',
    amount: 2400000.00,
    currency: 'USD',
    usdEquivalent: 2400000.00,
    transferPriceMarginBps: 500, // 5.0% cost-plus markup
    armLengthBasis: 'OECD Transfer Pricing Guidelines - Cost Plus 5%',
    agreementDocHash: '0x5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    status: 'netted',
    originGlDebit: '1045 (Intercompany Receivables - UK)',
    originGlCredit: '4030 (Intercompany IP Licensing Revenue)',
    counterGlDebit: '5040 (Intercompany IP Royalty Expense)',
    counterGlCredit: '2045 (Intercompany Payables - US Parent)',
    doubleEntryJournalId: 'je_ic_2026_0801',
    eliminationJournalId: 'je_elim_2026_0801',
    createdAt: '2026-08-01T10:00:00Z',
    settledAt: '2026-08-15T18:00:00Z'
  },
  {
    id: 'ict_002',
    referenceNumber: 'IC-TX-2026-0802',
    originEntityId: 'ent_sub_sg_003',
    originEntityName: 'OMNI Asia-Pacific Treasury Pte. Ltd.',
    counterpartyEntityId: 'ent_parent_001',
    counterpartyEntityName: 'OMNI Sovereign Technologies Group Inc.',
    transactionType: 'trade_service',
    amount: 1850000.00,
    currency: 'USD',
    usdEquivalent: 1850000.00,
    transferPriceMarginBps: 350,
    armLengthBasis: 'Transactional Net Margin Method (TNMM)',
    agreementDocHash: '0x3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b',
    status: 'pending',
    originGlDebit: '1046 (Intercompany Receivables - US)',
    originGlCredit: '4031 (APAC Treasury Service Revenue)',
    counterGlDebit: '5041 (Treasury Service Chargeback)',
    counterGlCredit: '2046 (Intercompany Payables - SG)',
    doubleEntryJournalId: 'je_ic_2026_0802',
    createdAt: '2026-08-16T09:15:00Z'
  },
  {
    id: 'ict_003',
    referenceNumber: 'IC-TX-2026-0803',
    originEntityId: 'ent_sub_uk_002',
    originEntityName: 'OMNI Financial Technologies (UK) Ltd',
    counterpartyEntityId: 'ent_sub_de_004',
    counterpartyEntityName: 'OMNI European Banking Infrastructure GmbH',
    transactionType: 'cost_sharing',
    amount: 920000.00,
    currency: 'EUR',
    usdEquivalent: 1001000.00,
    transferPriceMarginBps: 250,
    armLengthBasis: 'Shared IT Infrastructure Cost Allocation Agreement',
    agreementDocHash: '0x1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d',
    status: 'netted',
    originGlDebit: '1047 (Intercompany Receivables - Germany)',
    originGlCredit: '4032 (Shared Infrastructure Recovery)',
    counterGlDebit: '5042 (Cloud Infrastructure Allocated Expense)',
    counterGlCredit: '2047 (Intercompany Payables - UK)',
    doubleEntryJournalId: 'je_ic_2026_0803',
    eliminationJournalId: 'je_elim_2026_0803',
    createdAt: '2026-08-14T15:45:00Z',
    settledAt: '2026-08-15T18:00:00Z'
  }
];

export const SEED_NETTING_MATRIX: IntercompanyNettingMatrix = {
  settlementCycleId: 'NET-CYCLE-2026-08-15',
  cycleDate: '2026-08-15',
  entities: [
    {
      entityId: 'ent_parent_001',
      entityName: 'OMNI US Parent',
      grossPayablesUsd: 1850000.00,
      grossReceivablesUsd: 2400000.00,
      netPositionUsd: 550000.00, // Net receiver
      settlementCurrency: 'USD'
    },
    {
      entityId: 'ent_sub_uk_002',
      entityName: 'OMNI UK Ltd',
      grossPayablesUsd: 2400000.00,
      grossReceivablesUsd: 1001000.00,
      netPositionUsd: -1399000.00, // Net payer
      settlementCurrency: 'GBP'
    },
    {
      entityId: 'ent_sub_sg_003',
      entityName: 'OMNI Singapore Pte Ltd',
      grossPayablesUsd: 0.00,
      grossReceivablesUsd: 1850000.00,
      netPositionUsd: 1850000.00, // Net receiver
      settlementCurrency: 'USD'
    },
    {
      entityId: 'ent_sub_de_004',
      entityName: 'OMNI Germany GmbH',
      grossPayablesUsd: 1001000.00,
      grossReceivablesUsd: 0.00,
      netPositionUsd: -1001000.00, // Net payer
      settlementCurrency: 'EUR'
    }
  ],
  totalGrossVolumeUsd: 5251000.00,
  netSettlementRequiredUsd: 2400000.00,
  fxSavingsBps: 45,
  totalSavedUsd: 23629.50,
  status: 'settled'
};

export const SEED_CORPORATE_PAYMENT_BATCHES: CorporatePaymentBatch[] = [
  {
    id: 'batch_corp_001',
    batchReference: 'BATCH-2026-0818-SUPPLIER',
    entityId: 'ent_parent_001',
    entityName: 'OMNI Sovereign Technologies Group Inc.',
    batchType: 'supplier',
    description: 'Tier-1 Infrastructure & Security Vendors Batch (AWS, Cloudflare, Equinix HSM)',
    totalAmountUsd: 3840000.00,
    itemCount: 8,
    paymentRail: 'fednow',
    targetCurrency: 'USD',
    makerUserId: 'usr_treasury_maker_01',
    makerName: 'Alexander Hayes (Cash Ops)',
    approverUserIds: ['usr_cfo_01', 'usr_treasury_dir_01'],
    status: 'pending_approval',
    createdAt: '2026-08-18T07:15:00Z',
    merkleAuditHash: '0x8f7e6d5c4b3a291807f6e5d4c3b2a1908f7e6d5c4b3a291807f6e5d4c3b2a190',
    items: [
      {
        id: 'item_01',
        recipientName: 'Amazon Web Services Cloud Services',
        recipientAccountOrIban: 'US89-FEDN-0021-9482019',
        bankSwiftBic: 'CHASUS33XXX',
        amount: 1850000.00,
        currency: 'USD',
        purposeCode: 'SUPP_INFRA',
        invoiceRef: 'INV-AWS-849201',
        departmentCode: 'DEP-ENG-02',
        riskScore: 1,
        status: 'queued'
      },
      {
        id: 'item_02',
        recipientName: 'Cloudflare Enterprise DDoS Protection',
        recipientAccountOrIban: 'US12-FEDN-9948-2810482',
        bankSwiftBic: 'WFBIUS6SXXX',
        amount: 420000.00,
        currency: 'USD',
        purposeCode: 'SUPP_SECURITY',
        invoiceRef: 'INV-CF-902194',
        departmentCode: 'DEP-ENG-02',
        riskScore: 1,
        status: 'queued'
      },
      {
        id: 'item_03',
        recipientName: 'Equinix Sovereign Vault Colo Facilities',
        recipientAccountOrIban: 'US44-FEDN-1029-4820194',
        bankSwiftBic: 'CITIUS33XXX',
        amount: 680000.00,
        currency: 'USD',
        purposeCode: 'SUPP_DATACENTER',
        invoiceRef: 'INV-EQX-39482',
        departmentCode: 'DEP-ENG-02',
        riskScore: 1,
        status: 'queued'
      },
      {
        id: 'item_04',
        recipientName: 'CrowdStrike Falcon Endpoint Security',
        recipientAccountOrIban: 'US55-FEDN-8492-0194820',
        bankSwiftBic: 'BOFAUS3NXXX',
        amount: 890000.00,
        currency: 'USD',
        purposeCode: 'SUPP_CYBER',
        invoiceRef: 'INV-CRWD-9948',
        departmentCode: 'DEP-ENG-02',
        riskScore: 1,
        status: 'queued'
      }
    ]
  },
  {
    id: 'batch_corp_002',
    batchReference: 'BATCH-2026-0818-TAX',
    entityId: 'ent_sub_uk_002',
    entityName: 'OMNI Financial Technologies (UK) Ltd',
    batchType: 'tax_statutory',
    description: 'HMRC UK Corporation Tax & PAYE Employer National Insurance Remittance',
    totalAmountUsd: 1450000.00,
    itemCount: 2,
    paymentRail: 'sepa',
    targetCurrency: 'GBP',
    makerUserId: 'usr_uk_treasurer',
    makerName: 'Sophie Bennett, ACCA',
    approverUserIds: ['usr_uk_md', 'usr_group_cfo'],
    status: 'settled',
    createdAt: '2026-08-15T09:00:00Z',
    settledAt: '2026-08-15T10:15:00Z',
    merkleAuditHash: '0x4b3a291807f6e5d4c3b2a1908f7e6d5c4b3a291807f6e5d4c3b2a1908f7e6d5c',
    items: [
      {
        id: 'item_uk_tax_01',
        recipientName: 'HM Revenue & Customs - Corporation Tax',
        recipientAccountOrIban: 'GB29-NWBK-6016-1331-9284-01',
        bankSwiftBic: 'NWBKGB2LXXX',
        amount: 950000.00,
        currency: 'GBP',
        purposeCode: 'TAX_CORP',
        invoiceRef: 'HMRC-CT-2026-Q2',
        departmentCode: 'DEP-TRS-01',
        riskScore: 1,
        status: 'cleared'
      },
      {
        id: 'item_uk_tax_02',
        recipientName: 'HM Revenue & Customs - PAYE & NI',
        recipientAccountOrIban: 'GB29-NWBK-6016-1331-9284-02',
        bankSwiftBic: 'NWBKGB2LXXX',
        amount: 500000.00,
        currency: 'GBP',
        purposeCode: 'TAX_PAYE',
        invoiceRef: 'HMRC-PAYE-2026-07',
        departmentCode: 'DEP-TRS-01',
        riskScore: 1,
        status: 'cleared'
      }
    ]
  }
];

export const SEED_ENTERPRISE_APPROVAL_REQUESTS: EnterpriseApprovalRequest[] = [
  {
    id: 'req_appr_89201',
    title: 'Supplier Batch Release: Tier-1 Infrastructure ($3,840,000.00 USD)',
    itemType: 'payment_batch',
    referenceId: 'batch_corp_001',
    amountUsd: 3840000.00,
    currency: 'USD',
    requestingEntityId: 'ent_parent_001',
    requestingEntityName: 'OMNI Sovereign Technologies Group Inc.',
    requestingUserId: 'usr_maker_hayes',
    requestingUserName: 'Alexander Hayes (Cash Ops)',
    department: 'Core Financial Engineering (DEP-ENG-02)',
    riskTier: 'moderate',
    workflowType: 'four_eyes',
    currentStep: 1,
    totalSteps: 2,
    steps: [
      {
        stepNumber: 1,
        roleRequired: 'Treasury Operations Director',
        userAssigned: 'usr_victoria_sterling',
        assignedUserName: 'Victoria Sterling, CFA',
        status: 'pending'
      },
      {
        stepNumber: 2,
        roleRequired: 'Group Chief Financial Officer (CFO)',
        userAssigned: 'usr_cfo_reid',
        assignedUserName: 'Harrison Reid, CPA',
        status: 'pending'
      }
    ],
    status: 'pending',
    autoEscalateAt: '2026-08-18T16:00:00Z',
    auditProofHash: '0x9482019482019482019482019482019482019482019482019482019482019482',
    createdAt: '2026-08-18T07:15:00Z'
  },
  {
    id: 'req_appr_89202',
    title: 'Intercompany Capital Facility: EU TIPS Pre-Funding ($5,000,000.00 USD)',
    itemType: 'intercompany_loan',
    referenceId: 'itr_849201',
    amountUsd: 5000000.00,
    currency: 'USD',
    requestingEntityId: 'ent_sub_de_004',
    requestingEntityName: 'OMNI European Banking Infrastructure GmbH',
    requestingUserId: 'usr_de_cfo',
    requestingUserName: 'Hans-Peter Richter',
    department: 'European Clearing Operations',
    riskTier: 'low',
    workflowType: 'sequential',
    currentStep: 2,
    totalSteps: 2,
    steps: [
      {
        stepNumber: 1,
        roleRequired: 'Group Tax & Transfer Pricing Lead',
        userAssigned: 'usr_tax_lead',
        assignedUserName: 'David S. Chen, JD/LLM',
        status: 'approved',
        actionTimestamp: '2026-08-18T07:30:00Z',
        comment: 'Arms-length SOFR + 45bps benchmarked. Fully compliant with OECD TP rules.'
      },
      {
        stepNumber: 2,
        roleRequired: 'Group Treasurer',
        userAssigned: 'usr_victoria_sterling',
        assignedUserName: 'Victoria Sterling, CFA',
        status: 'approved',
        actionTimestamp: '2026-08-18T08:05:00Z',
        comment: 'Approved. Liquidity buffer allocated from US parent clearing reserve.'
      }
    ],
    status: 'approved',
    autoEscalateAt: '2026-08-18T18:00:00Z',
    auditProofHash: '0x1029482019482019482019482019482019482019482019482019482019482019',
    createdAt: '2026-08-18T06:30:00Z'
  },
  {
    id: 'req_appr_89203',
    title: 'FX Hedging Forward Contract: €12,500,000.00 EUR at 1.0885',
    itemType: 'fx_hedging_contract',
    referenceId: 'fx_fwd_2026_0915',
    amountUsd: 13606250.00,
    currency: 'EUR',
    requestingEntityId: 'ent_parent_001',
    requestingEntityName: 'OMNI Sovereign Technologies Group Inc.',
    requestingUserId: 'usr_fx_trader',
    requestingUserName: 'Marcus Holloway (FX Desk)',
    department: 'Global Treasury & FX Hedging',
    riskTier: 'elevated',
    workflowType: 'six_eyes',
    currentStep: 2,
    totalSteps: 3,
    steps: [
      {
        stepNumber: 1,
        roleRequired: 'Head of Market Risk',
        userAssigned: 'usr_risk_head',
        assignedUserName: 'Dr. Aris Thorne',
        status: 'approved',
        actionTimestamp: '2026-08-18T08:10:00Z',
        comment: 'VaR exposure reduced from $1.42M to $180k with this 75% forward coverage.'
      },
      {
        stepNumber: 2,
        roleRequired: 'Group Treasurer',
        userAssigned: 'usr_victoria_sterling',
        assignedUserName: 'Victoria Sterling, CFA',
        status: 'pending'
      },
      {
        stepNumber: 3,
        roleRequired: 'Chief Financial Officer (CFO)',
        userAssigned: 'usr_cfo_reid',
        assignedUserName: 'Harrison Reid, CPA',
        status: 'pending'
      }
    ],
    status: 'pending',
    autoEscalateAt: '2026-08-18T14:00:00Z',
    auditProofHash: '0x7e6d5c4b3a291807f6e5d4c3b2a1908f7e6d5c4b3a291807f6e5d4c3b2a1908f',
    createdAt: '2026-08-18T08:00:00Z'
  }
];

export const SEED_ENTERPRISE_BUDGETS: EnterpriseBudget[] = [
  {
    id: 'bgt_eng_q3_2026',
    entityId: 'ent_parent_001',
    entityName: 'OMNI US Parent',
    fiscalYear: 2026,
    quarter: 'Q3',
    department: 'Core Financial Engineering',
    costCentreCode: 'CC-7010-INFRA',
    category: 'opex',
    allocatedBudgetUsd: 5200000,
    committedPoUsd: 1200000,
    actualSpendUsd: 3400000,
    forecastSpendUsd: 4950000,
    varianceUsd: 600000,
    variancePercent: 11.54,
    status: 'on_track'
  },
  {
    id: 'bgt_hsm_capex_2026',
    entityId: 'ent_parent_001',
    entityName: 'OMNI US Parent',
    fiscalYear: 2026,
    quarter: 'FY_TOTAL',
    department: 'Core Financial Engineering',
    costCentreCode: 'CC-7010-INFRA',
    category: 'capex',
    allocatedBudgetUsd: 4500000,
    committedPoUsd: 900000,
    actualSpendUsd: 3120000,
    forecastSpendUsd: 4380000,
    varianceUsd: 480000,
    variancePercent: 10.67,
    status: 'on_track'
  },
  {
    id: 'bgt_ops_q3_2026',
    entityId: 'ent_sub_uk_002',
    entityName: 'OMNI UK Ltd',
    fiscalYear: 2026,
    quarter: 'Q3',
    department: 'Global Clearing Operations',
    costCentreCode: 'CC-7030-RAILS',
    category: 'opex',
    allocatedBudgetUsd: 1800000,
    committedPoUsd: 450000,
    actualSpendUsd: 1250000,
    forecastSpendUsd: 1780000,
    varianceUsd: 100000,
    variancePercent: 5.56,
    status: 'on_track'
  },
  {
    id: 'bgt_legal_q3_2026',
    entityId: 'ent_sub_sg_003',
    entityName: 'OMNI Singapore Pte Ltd',
    fiscalYear: 2026,
    quarter: 'Q3',
    department: 'Institutional Compliance',
    costCentreCode: 'CC-7020-FXMM',
    category: 'opex',
    allocatedBudgetUsd: 1400000,
    committedPoUsd: 200000,
    actualSpendUsd: 1180000,
    forecastSpendUsd: 1420000,
    varianceUsd: 20000,
    variancePercent: 1.43,
    status: 'warning_approaching'
  }
];

export const SEED_CURRENCY_EXPOSURES: CurrencyExposureItem[] = [
  {
    currency: 'USD',
    flagEmoji: '🇺🇸',
    totalAssetsLocal: 165250000,
    totalLiabilitiesLocal: 22400000,
    netExposureLocal: 142850000,
    netExposureUsd: 142850000,
    currentSpotRate: 1.0000,
    hedgedAmountUsd: 0,
    hedgeRatioPercent: 0,
    unhedgedUsd: 142850000,
    var95Usd: 0, // Base Currency
    riskLevel: 'low',
    recommendedHedgeAction: 'Functional reporting currency. Natural cash buffer maintained.'
  },
  {
    currency: 'EUR',
    flagEmoji: '🇪🇺',
    totalAssetsLocal: 31200000,
    totalLiabilitiesLocal: 18500000,
    netExposureLocal: 12700000,
    netExposureUsd: 13822780,
    currentSpotRate: 1.0884,
    hedgedAmountUsd: 10367085,
    hedgeRatioPercent: 75.0,
    unhedgedUsd: 3455695,
    var95Usd: 184500,
    riskLevel: 'moderate',
    recommendedHedgeAction: 'Execute 75% forward hedge on €12.7M net surplus prior to ECB rate decision.'
  },
  {
    currency: 'GBP',
    flagEmoji: '🇬🇧',
    totalAssetsLocal: 36200000,
    totalLiabilitiesLocal: 14800000,
    netExposureLocal: 21400000,
    netExposureUsd: 27285000,
    currentSpotRate: 1.2750,
    hedgedAmountUsd: 21828000,
    hedgeRatioPercent: 80.0,
    unhedgedUsd: 5457000,
    var95Usd: 265000,
    riskLevel: 'moderate',
    recommendedHedgeAction: 'GBP/USD collar structure (Put 1.2650 / Call 1.2900) active through Q3.'
  },
  {
    currency: 'SGD',
    flagEmoji: '🇸🇬',
    totalAssetsLocal: 79200000,
    totalLiabilitiesLocal: 12400000,
    netExposureLocal: 66800000,
    netExposureUsd: 49432000,
    currentSpotRate: 0.7400,
    hedgedAmountUsd: 39545600,
    hedgeRatioPercent: 80.0,
    unhedgedUsd: 9886400,
    var95Usd: 195000,
    riskLevel: 'low',
    recommendedHedgeAction: 'MAS monetary policy stable. Notional pooling eliminates friction.'
  },
  {
    currency: 'NGN',
    flagEmoji: '🇳🇬',
    totalAssetsLocal: 18840000000,
    totalLiabilitiesLocal: 2100000000,
    netExposureLocal: 16740000000,
    netExposureUsd: 10462500,
    currentSpotRate: 0.000625, // 1 USD = ~1600 NGN
    hedgedAmountUsd: 8893125,
    hedgeRatioPercent: 85.0,
    unhedgedUsd: 1569375,
    var95Usd: 495000,
    riskLevel: 'high',
    recommendedHedgeAction: 'High volatility regime. Automated daily FX conversion into USDC stablecoins.'
  },
  {
    currency: 'USDC',
    flagEmoji: '🌐',
    totalAssetsLocal: 42500000,
    totalLiabilitiesLocal: 0,
    netExposureLocal: 42500000,
    netExposureUsd: 42500000,
    currentSpotRate: 1.0000,
    hedgedAmountUsd: 42500000,
    hedgeRatioPercent: 100.0,
    unhedgedUsd: 0,
    var95Usd: 25000,
    riskLevel: 'low',
    recommendedHedgeAction: 'Fully collateralized Circle 1:1 cash/Treasury backing. T+0 liquidity rail.'
  }
];

export const SEED_TREASURY_RISK_ALERTS: TreasuryRiskAlert[] = [
  {
    id: 'alert_001',
    severity: 'warning',
    category: 'fx_exposure',
    entityId: 'ent_sub_de_004',
    entityName: 'OMNI European Banking Infrastructure GmbH',
    title: 'Unhedged EUR Net Exposure Exceeds Policy Limit ($3.45M USD)',
    description: 'Corporate treasury policy TP-401 requires 80% hedge coverage for foreign exposures above $10M. Current coverage is 75.0%.',
    metricValue: '75.0% Hedged',
    thresholdLimit: '80.0% Minimum Required',
    suggestedRemediation: 'Execute FX Forward for €1.2M EUR maturing on Sept 15, 2026.',
    timestamp: '2026-08-18T07:45:00Z',
    resolved: false
  },
  {
    id: 'alert_002',
    severity: 'critical',
    category: 'payment_concentration',
    entityId: 'ent_parent_001',
    entityName: 'OMNI Sovereign Technologies Group Inc.',
    title: 'Single-Vendor Concentration Warning: Amazon Web Services (48.1% of Outflows)',
    description: 'Upcoming supplier batch of $3.84M USD allocates $1.85M to AWS, exceeding the 35% single-counterparty monthly threshold.',
    metricValue: '48.1% of Batch Outflows',
    thresholdLimit: '35.0% Policy Cap',
    suggestedRemediation: 'Dual-executive board sign-off required (Workflow Step 2 activated).',
    timestamp: '2026-08-18T07:20:00Z',
    resolved: false
  },
  {
    id: 'alert_003',
    severity: 'info',
    category: 'liquidity_buffer',
    entityId: 'ent_sub_sg_003',
    entityName: 'OMNI Asia-Pacific Treasury Pte. Ltd.',
    title: 'Surplus Operating Liquidity Available for Yield Vault Sweep ($12.0M SGD)',
    description: 'Singapore operating cash balance is 185% of 30-day projected operational requirements.',
    metricValue: '$16.8M USD Cash',
    thresholdLimit: '$9.0M USD Target',
    suggestedRemediation: 'Sweep $6.0M USD equivalent to APAC Treasury Vault for 5.15% APY.',
    timestamp: '2026-08-18T06:15:00Z',
    resolved: false
  }
];

export const SEED_TREASURY_AI_ADVISORIES: TreasuryAiAdvisory[] = [
  {
    id: 'ai_adv_01',
    title: 'Intercompany Bilateral Netting Yield Optimization',
    category: 'intercompany_netting',
    impactSummaryUsd: 142000.00,
    confidenceScore: 96,
    rationale: 'Cross-entity obligations between US Parent, UK Ltd, and Germany GmbH total $5.25M in gross volume. Netting down to $2.40M saves $23.6k in cross-border rail fees and reduces FX spread slippage.',
    actionPlan: [
      'Trigger multilateral netting settlement cycle on August 31, 2026.',
      'Generate automatic elimination journal entries in OMNI Double-Entry Ledger.',
      'Settle residual $1.40M GBP balance via UK Faster Payments zero-fee rail.'
    ],
    isAdvisoryOnly: true,
    generatedTimestamp: '2026-08-18T08:00:00Z'
  },
  {
    id: 'ai_adv_02',
    title: 'Dynamic Overnight Liquidity Sweeping Automation',
    category: 'liquidity_optimization',
    impactSummaryUsd: 285400.00,
    confidenceScore: 94,
    rationale: 'Idle checking cash across 6 international operating branches currently averages $88.1M overnight. Activating automated 18:00 UTC zero-balance sweeps into overnight Fed Reverse Repo and SOFR-linked institutional vaults will capture 5.48% blended yield.',
    actionPlan: [
      'Enable automated EOD sweeping on USD Global Master Pool.',
      'Configure minimum operational cushion ($15.0M) in primary clearing account.',
      'Retain instant FedNow withdrawal liquidity for real-time customer settlements.'
    ],
    isAdvisoryOnly: true,
    generatedTimestamp: '2026-08-18T07:30:00Z'
  },
  {
    id: 'ai_adv_03',
    title: 'Strategic FX Forward Hedging for EUR/USD Q3 Settlement',
    category: 'fx_hedging',
    impactSummaryUsd: 89000.00,
    confidenceScore: 91,
    rationale: 'ECB macroeconomic projections forecast interest rate cuts, creating downside risk on EUR holdings. Locking 75% forward hedge at 1.0885 protects $13.8M in enterprise receivables.',
    actionPlan: [
      'Review pending approval request REQ-APPR-89203 for €12.5M forward contract.',
      'Execute via OMNI Institutional FX Engine with zero intermediary spread markup.'
    ],
    isAdvisoryOnly: true,
    generatedTimestamp: '2026-08-18T08:15:00Z'
  }
];

export const SEED_ENTERPRISE_AUDIT_TRAIL: EnterpriseAuditTrailRecord[] = [
  {
    id: 'audit_rec_901',
    timestamp: '2026-08-18T08:05:00Z',
    actorId: 'usr_victoria_sterling',
    actorName: 'Victoria Sterling, CFA',
    actorRole: 'Global Group Treasurer',
    entityId: 'ent_parent_001',
    entityName: 'OMNI Sovereign Technologies Group Inc.',
    action: 'APPROVAL_SIGN_OFF',
    targetType: 'IntercompanyLoanRequest',
    targetId: 'itr_849201',
    ipAddress: '192.88.99.14 (HSM Authenticated)',
    mfaVerified: true,
    previousStateDigest: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    newStateDigest: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d',
    merkleProofHash: '0x7f48b9c02d1a3e8f6e5b4a3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e'
  },
  {
    id: 'audit_rec_902',
    timestamp: '2026-08-18T07:30:00Z',
    actorId: 'usr_tax_lead',
    actorName: 'David S. Chen, JD/LLM',
    actorRole: 'Group Tax & Transfer Pricing Lead',
    entityId: 'ent_sub_de_004',
    entityName: 'OMNI European Banking Infrastructure GmbH',
    action: 'TRANSFER_PRICING_COMPLIANCE_SIGN',
    targetType: 'IntercompanyAgreement',
    targetId: 'ICA-2026-DE-004-LOAN',
    ipAddress: '192.88.99.22 (Hardware Key FIDO2)',
    mfaVerified: true,
    previousStateDigest: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    newStateDigest: '0x9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    merkleProofHash: '0x8f7e6d5c4b3a291807f6e5d4c3b2a1908f7e6d5c4b3a291807f6e5d4c3b2a190'
  },
  {
    id: 'audit_rec_903',
    timestamp: '2026-08-18T07:15:00Z',
    actorId: 'usr_maker_hayes',
    actorName: 'Alexander Hayes (Cash Ops)',
    actorRole: 'Treasury Analyst / Payment Maker',
    entityId: 'ent_parent_001',
    entityName: 'OMNI Sovereign Technologies Group Inc.',
    action: 'CREATE_PAYMENT_BATCH',
    targetType: 'CorporatePaymentBatch',
    targetId: 'batch_corp_001',
    ipAddress: '192.88.99.45 (OMNI SSO)',
    mfaVerified: true,
    previousStateDigest: '0x0000000000000000000000000000000000000000',
    newStateDigest: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    merkleProofHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b'
  }
];
