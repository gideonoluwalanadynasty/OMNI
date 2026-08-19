import { ShareholderProfile, CapTableConfig, ValuationRecord, InvestmentOffering, ExchangeCredential } from './types';

export const SEED_SHAREHOLDERS: ShareholderProfile[] = [
  {
    id: 'sh_gideon_founder',
    userId: 'usr_gideon',
    name: 'Gideon Oluwalana',
    email: 'gideonoluwalanadynasty@gmail.com',
    shareClass: 'Class A Voting',
    unitCount: 6500000,
    costBasisUsd: 0.01,
    ownershipPercent: 65.0,
    acquiredAt: '2026-01-10T08:00:00Z',
    kycStatus: 'verified',
    corporateDocuments: ['Incorporation Certificate', 'Founder Stock Purchase Agreement', 'IP Assignment Deed']
  },
  {
    id: 'sh_reseller_pool',
    userId: 'usr_artisan_2',
    name: 'Adebayo Garments Guild',
    email: 'guild@adebayotextiles.com',
    shareClass: 'Class B Non-Voting',
    unitCount: 1500000,
    costBasisUsd: 1.50,
    ownershipPercent: 15.0,
    acquiredAt: '2026-03-01T10:00:00Z',
    kycStatus: 'verified',
    corporateDocuments: ['Reseller Stock Pool Agreement', 'W-8BEN-E Tax Declaration']
  },
  {
    id: 'sh_option_pool',
    userId: 'usr_student_1',
    name: 'Core Staff Option Allocator',
    email: 'options@omni.io',
    shareClass: 'Class B Non-Voting',
    unitCount: 1000000,
    costBasisUsd: 1.00,
    ownershipPercent: 10.0,
    acquiredAt: '2026-04-15T12:00:00Z',
    kycStatus: 'verified',
    corporateDocuments: ['2026 Equity Incentive Plan Rules', 'Board Consent Resolutions']
  },
  {
    id: 'sh_seed_angel',
    userId: 'usr_unverified_investor',
    name: 'Akinwumi Venture Partners',
    email: 'akinwumi@aventures.com',
    shareClass: 'Preferred',
    unitCount: 1000000,
    costBasisUsd: 3.50,
    ownershipPercent: 10.0,
    acquiredAt: '2026-05-10T14:30:00Z',
    kycStatus: 'verified',
    corporateDocuments: ['Series Seed Preferred Stock Purchase Agreement', 'Investor Rights Agreement']
  }
];

export const SEED_CAP_TABLE: CapTableConfig = {
  authorizedShares: 15000000,
  issuedShares: 10000000,
  outstandingShares: 10000000,
  optionPoolShares: 1500000,
  shareClasses: [
    {
      name: 'Class A Voting',
      description: 'Super-voting shares held by founders and general partners. 10 votes per unit.',
      issuedUnits: 6500000,
      votingPowerMultiplier: 10
    },
    {
      name: 'Class B Non-Voting',
      description: 'Common equity allocated for staff incentive pools, reseller growth rewards, and secondary affiliates. 0 votes per unit.',
      issuedUnits: 2500000,
      votingPowerMultiplier: 0
    },
    {
      name: 'Preferred',
      description: 'Liquidation preference stock issued during early institutional funding rounds. 1 vote per unit.',
      issuedUnits: 1000000,
      votingPowerMultiplier: 1
    }
  ]
};

export const SEED_VALUATION_RECORDS: ValuationRecord[] = [
  {
    id: 'val_2026_jan_founder_round',
    date: '2026-01-10T09:00:00Z',
    methodology: '409A Asset Approach',
    supportingDocument: 'Board_Resolution_Founding_Asset_Transfer.pdf',
    approvingAuthority: 'OMNI Board of Directors',
    valuationAmount: 1000000.00,
    notes: 'Initial founding valuation based on intellectual property assignment and master software codebase valuation assets.'
  },
  {
    id: 'val_2026_may_series_seed',
    date: '2026-05-10T11:00:00Z',
    methodology: 'Comparable Market Multiples',
    supportingDocument: 'Akinwumi_Seed_Sovereign_Valuation_Report.pdf',
    approvingAuthority: 'Audit Committee & Lead Investor Akinwumi',
    valuationAmount: 35000000.00,
    notes: 'Calculated using SaaS comparable multiples in localized emerging markets combined with white-label reseller contract backlogs.'
  }
];

export const SEED_INVESTMENT_OFFERINGS: InvestmentOffering[] = [
  {
    id: 'off_series_a_sovereign_growth',
    title: 'Series A Sovereign Ledger Funding',
    targetAmount: 5000000.00,
    pricePerShare: 5.50,
    shareClass: 'Preferred',
    minInvestment: 50000.00,
    status: 'draft', // Draft state is disabled by default!
    jurisdictionConfigured: false, // Disabled compliance gate!
    licensedProviderName: 'Sovereign Securities Brokerage Corp',
    legalApprovalReceived: false, // Security block!
    kycAmlRulesRequired: true,
    investorDisclosuresCount: 4,
    eligibilityRules: 'Accredited Investors under SEC Rule 506(c) or equivalent regional sovereign capital license rules.'
  },
  {
    id: 'off_growth_reseller_bonus',
    title: 'Reseller Stock Loyalty Grant',
    targetAmount: 1000000.00,
    pricePerShare: 2.00,
    shareClass: 'Class B Non-Voting',
    minInvestment: 5000.00,
    status: 'compliance_review', // Currently locked in compliance check!
    jurisdictionConfigured: true,
    licensedProviderName: 'OMNI Capital Services LLC',
    legalApprovalReceived: false, // Still awaiting board signature!
    kycAmlRulesRequired: true,
    investorDisclosuresCount: 2,
    eligibilityRules: 'Verified active high-tier OMNI resellers with active merchant escrow accounts exceeding $10k volume.'
  }
];

export const SEED_EXCHANGE_CREDENTIALS: ExchangeCredential[] = [
  {
    id: 'exch_nyse_sovereign_bridge',
    providerName: 'NYSE Sovereign Equity Gateway',
    apiVersion: 'v4.1',
    endpoint: 'https://api.nyse-sovereign.exchange/v4',
    status: 'unlicensed', // Fully locked in default unlicensed mode
    apiKeysGenerated: false
  },
  {
    id: 'exch_nasdaq_digital_assets',
    providerName: 'Nasdaq Digital Listing API',
    apiVersion: 'v2.0',
    endpoint: 'https://listing.nasdaq.com/api/digital',
    status: 'disconnected', // Disconnected
    apiKeysGenerated: false
  }
];
