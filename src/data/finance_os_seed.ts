import {
  FinanceTenant,
  FinancialProfile,
  FinanceCurrencyRegistryItem,
  FinanceCurrencyRate,
  FinancialAccount,
  FinanceWallet,
  FinanceLedgerAccount,
  FinanceJournalEntry,
  FinanceTransaction,
  FinancePayment,
  FinanceBeneficiary,
  FinanceProvider,
  FinanceProviderEvent,
  FinanceSettlement,
  FinanceFee,
  FinanceTaxRecord,
  FinanceLimit,
  FinanceApprovalRule,
  FinanceApprovalRequest,
  FinanceComplianceProfile,
  FinanceRiskProfile,
  FinanceAuditRecord,
  FinanceFeatureFlag,
  VirtualCard,
  PayrollRun,
  ExpenseItem,
  SmartInvoice,
  TreasuryPool,
  FinanceAiInsight,
  ExternalAccountAdapter,
  FinancialRbacRole,
  FinanceSecurityTestResult
} from '../types/finance_os';

export const SEED_FINANCE_CURRENCIES: FinanceCurrencyRegistryItem[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    country: 'United States',
    countryCode: 'US',
    symbol: '$',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Federal Reserve FedNow / Clearing House RTP',
    settlementRailDefault: 'fednow',
    settlementRules: {
      standardLatency: 'Instant (< 2.5s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'FedNow / ACH Direct'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 10000000.00
    },
    icon: '💵'
  },
  {
    code: 'EUR',
    name: 'Euro',
    country: 'European Union',
    countryCode: 'EU',
    symbol: '€',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'European Central Bank SEPA Instant TIPS',
    settlementRailDefault: 'sepa',
    settlementRules: {
      standardLatency: 'Instant (< 5s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'SEPA Instant Credit Transfer'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 10000000.00
    },
    icon: '💶'
  },
  {
    code: 'GBP',
    name: 'British Pound',
    country: 'United Kingdom',
    countryCode: 'GB',
    symbol: '£',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Bank of England Faster Payments Service (FPS)',
    settlementRailDefault: 'swift',
    settlementRules: {
      standardLatency: 'Real-time (< 10s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'UK Faster Payments'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 5000000.00
    },
    icon: '💷'
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    countryCode: 'NG',
    symbol: '₦',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'NIBSS Central Instant Payment (NIP)',
    settlementRailDefault: 'omni_internal',
    settlementRules: {
      standardLatency: 'Instant (< 3s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'NIP / OMNI Direct Rail'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 5.00,
      maxSwapUsd: 2000000.00
    },
    icon: '🦅'
  },
  {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    country: 'Ghana',
    countryCode: 'GH',
    symbol: 'GH₵',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'GhIPSS Instant Pay / Bank of Ghana',
    settlementRailDefault: 'omni_internal',
    settlementRules: {
      standardLatency: 'Real-Time (< 5s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'GhIPSS Mobile & Bank Rail'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 5.00,
      maxSwapUsd: 500000.00
    },
    icon: '⭐'
  },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    country: 'Kenya',
    countryCode: 'KE',
    symbol: 'KSh',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Central Bank of Kenya / M-Pesa Super Rail',
    settlementRailDefault: 'mpesa',
    settlementRules: {
      standardLatency: 'Instant (< 2s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'M-PESA / Pesalink'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 5.00,
      maxSwapUsd: 1000000.00
    },
    icon: '🦒'
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    country: 'South Africa',
    countryCode: 'ZA',
    symbol: 'R',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'South African Reserve Bank PayShap RTC',
    settlementRailDefault: 'omni_internal',
    settlementRules: {
      standardLatency: 'Instant (< 4s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'PayShap Real-Time Clearing'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 10.00,
      maxSwapUsd: 1500000.00
    },
    icon: '🇿🇦'
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    country: 'Canada',
    countryCode: 'CA',
    symbol: 'CA$',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Lynx / Payments Canada Real-Time Rail',
    settlementRailDefault: 'wire',
    settlementRules: {
      standardLatency: 'Same-day (< 1 hr)',
      cutOffTimeUtc: '21:00 UTC',
      instantEligible: true,
      clearingRailName: 'Interac / Lynx Direct'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 5000000.00
    },
    icon: '🍁'
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    country: 'Australia',
    countryCode: 'AU',
    symbol: 'AU$',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'NPP Australia Real-Time New Payments Platform',
    settlementRailDefault: 'swift',
    settlementRules: {
      standardLatency: 'Instant (< 15s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'NPP PayID Rail'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 5000000.00
    },
    icon: '🦘'
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    country: 'Switzerland',
    countryCode: 'CH',
    symbol: 'CHF',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Swiss National Bank SIC Instant Clearing',
    settlementRailDefault: 'sepa',
    settlementRules: {
      standardLatency: 'Instant (< 3s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'SIC Real-Time Settlement'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 10000000.00
    },
    icon: '🏔️'
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    country: 'Singapore',
    countryCode: 'SG',
    symbol: 'S$',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'MAS Fast and Secure Transfers (FAST)',
    settlementRailDefault: 'swift',
    settlementRules: {
      standardLatency: 'Instant (< 2s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'PayNow / FAST Rail'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 1.00,
      maxSwapUsd: 8000000.00
    },
    icon: '🦁'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    country: 'Japan',
    countryCode: 'JP',
    symbol: '¥',
    decimalRules: 0,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Bank of Japan Zengin System Net Settlement',
    settlementRailDefault: 'swift',
    settlementRules: {
      standardLatency: 'Real-Time (< 30s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'Zengin Core Network'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 10.00,
      maxSwapUsd: 10000000.00
    },
    icon: '💴'
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    country: 'India',
    countryCode: 'IN',
    symbol: '₹',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'NPCI Unified Payments Interface (UPI)',
    settlementRailDefault: 'upi',
    settlementRules: {
      standardLatency: 'Instant (< 1s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'NPCI UPI Instant'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 5.00,
      maxSwapUsd: 2000000.00
    },
    icon: '🇮🇳'
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    symbol: 'AED',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'CBUAE Instant Payment Platform (Aani)',
    settlementRailDefault: 'swift',
    settlementRules: {
      standardLatency: 'Instant (< 2s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'Aani IPP Gateway'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 5.00,
      maxSwapUsd: 5000000.00
    },
    icon: '🇦🇪'
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    country: 'Brazil',
    countryCode: 'BR',
    symbol: 'R$',
    decimalRules: 2,
    isFiat: true,
    isStablecoin: false,
    isActive: true,
    provider: 'Banco Central do Brasil PIX Direct SPI',
    settlementRailDefault: 'pix',
    settlementRules: {
      standardLatency: 'Instant (< 1.5s)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'PIX Instant Rail'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 2.00,
      maxSwapUsd: 3000000.00
    },
    icon: '🇧🇷'
  },
  {
    code: 'USDC',
    name: 'USD Coin (Reserve Backed)',
    country: 'Regulated Stablecoin',
    countryCode: 'GLOBAL',
    symbol: 'USDC',
    decimalRules: 6,
    isFiat: false,
    isStablecoin: true,
    isActive: true,
    provider: 'Circle Treasury Prime / BlackRock Reserve',
    settlementRailDefault: 'stablecoin_usdc',
    settlementRules: {
      standardLatency: 'Sub-second (< 400ms)',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'Circle CCTP & Cross-Chain L2'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 0.10,
      maxSwapUsd: 50000000.00
    },
    icon: '🪙'
  },
  {
    code: 'BTC',
    name: 'Bitcoin (Sovereign Reserve)',
    country: 'Decentralized L1',
    countryCode: 'GLOBAL',
    symbol: '₿',
    decimalRules: 8,
    isFiat: false,
    isStablecoin: false,
    isActive: true,
    provider: 'Bitcoin L1 / Lightning State Network',
    settlementRailDefault: 'crypto_l1',
    settlementRules: {
      standardLatency: 'Lightning: < 1s | L1: 10 mins',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'OMNI Lightning Bridge'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 10.00,
      maxSwapUsd: 25000000.00
    },
    icon: '⚡'
  },
  {
    code: 'ETH',
    name: 'Ethereum (Smart Liquidity)',
    country: 'Decentralized L1',
    countryCode: 'GLOBAL',
    symbol: 'Ξ',
    decimalRules: 18,
    isFiat: false,
    isStablecoin: false,
    isActive: true,
    provider: 'Ethereum Proof-of-Stake Network',
    settlementRailDefault: 'crypto_l1',
    settlementRules: {
      standardLatency: 'L2 Rollup: < 1s | L1: 12s',
      cutOffTimeUtc: '24/7/365 Non-Stop',
      instantEligible: true,
      clearingRailName: 'OMNI Rollup Bridge'
    },
    exchangeAvailability: {
      canBuy: true,
      canSell: true,
      canHold: true,
      minSwapUsd: 10.00,
      maxSwapUsd: 15000000.00
    },
    icon: '🔷'
  }
];

export const SEED_FINANCE_CURRENCY_REGISTRY: FinanceCurrencyRegistryItem[] = SEED_FINANCE_CURRENCIES;

export const SEED_FINANCE_RATES: FinanceCurrencyRate[] = [
  { id: 'rate_eur_usd', baseCurrency: 'EUR', quoteCurrency: 'USD', spotRate: 1.0875, bid: 1.0872, ask: 1.0878, spreadBps: 5.5, change24hPercent: 0.32, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_gbp_usd', baseCurrency: 'GBP', quoteCurrency: 'USD', spotRate: 1.2940, bid: 1.2936, ask: 1.2944, spreadBps: 6.2, change24hPercent: -0.18, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_jpy_usd', baseCurrency: 'USD', quoteCurrency: 'JPY', spotRate: 154.20, bid: 154.16, ask: 154.24, spreadBps: 4.8, change24hPercent: 0.45, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_chf_usd', baseCurrency: 'USD', quoteCurrency: 'CHF', spotRate: 0.8845, bid: 0.8842, ask: 0.8848, spreadBps: 6.0, change24hPercent: -0.05, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_cad_usd', baseCurrency: 'USD', quoteCurrency: 'CAD', spotRate: 1.3650, bid: 1.3646, ask: 1.3654, spreadBps: 5.8, change24hPercent: 0.12, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_aud_usd', baseCurrency: 'AUD', quoteCurrency: 'USD', spotRate: 0.6580, bid: 0.6576, ask: 0.6584, spreadBps: 7.0, change24hPercent: 0.22, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_sgd_usd', baseCurrency: 'USD', quoteCurrency: 'SGD', spotRate: 1.3410, bid: 1.3406, ask: 1.3414, spreadBps: 5.2, change24hPercent: -0.08, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_brl_usd', baseCurrency: 'USD', quoteCurrency: 'BRL', spotRate: 5.4820, bid: 5.4790, ask: 5.4850, spreadBps: 11.0, change24hPercent: -0.62, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_ngn_usd', baseCurrency: 'USD', quoteCurrency: 'NGN', spotRate: 1595.00, bid: 1590.00, ask: 1600.00, spreadBps: 30.0, change24hPercent: -0.15, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_ghs_usd', baseCurrency: 'USD', quoteCurrency: 'GHS', spotRate: 15.60, bid: 15.55, ask: 15.65, spreadBps: 25.0, change24hPercent: 0.10, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_kes_usd', baseCurrency: 'USD', quoteCurrency: 'KES', spotRate: 129.50, bid: 129.20, ask: 129.80, spreadBps: 22.0, change24hPercent: -0.08, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_zar_usd', baseCurrency: 'USD', quoteCurrency: 'ZAR', spotRate: 18.25, bid: 18.20, ask: 18.30, spreadBps: 18.0, change24hPercent: 0.15, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_inr_usd', baseCurrency: 'USD', quoteCurrency: 'INR', spotRate: 83.95, bid: 83.92, ask: 83.98, spreadBps: 7.5, change24hPercent: -0.04, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_aed_usd', baseCurrency: 'USD', quoteCurrency: 'AED', spotRate: 3.6725, bid: 3.6720, ask: 3.6730, spreadBps: 2.0, change24hPercent: 0.00, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_btc_usd', baseCurrency: 'BTC', quoteCurrency: 'USD', spotRate: 98450.00, bid: 98420.00, ask: 98480.00, spreadBps: 6.1, change24hPercent: 2.85, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_eth_usd', baseCurrency: 'ETH', quoteCurrency: 'USD', spotRate: 3420.50, bid: 3418.00, ask: 3423.00, spreadBps: 7.3, change24hPercent: 1.94, updatedAt: '2026-08-17T01:45:00Z' },
  { id: 'rate_usdc_usd', baseCurrency: 'USDC', quoteCurrency: 'USD', spotRate: 1.0000, bid: 0.9999, ask: 1.0001, spreadBps: 1.0, change24hPercent: 0.00, updatedAt: '2026-08-17T01:45:00Z' }
];

export const SEED_FINANCE_TENANTS: FinanceTenant[] = [
  {
    id: 'ft_tenant_dynasty_ent',
    name: 'Dynasty Global Holdings (HQ Enterprise)',
    slug: 'dynasty-enterprise',
    type: 'enterprise',
    accountType: 'enterprise',
    country: 'US',
    currency: 'USD',
    jurisdiction: 'Delaware, USA (C-Corp)',
    organizationId: 'org_dynasty',
    ownerUserId: 'usr_gideon_dynasty',
    complianceTier: 'tier_5_institutional_sovereign',
    riskLevel: 'very_low',
    isWhiteLabelTenant: false,
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_sme_merchant',
    name: 'Apex Robotics & Merchant Labs',
    slug: 'apex-merchant',
    type: 'merchant',
    accountType: 'merchant',
    country: 'GB',
    currency: 'GBP',
    jurisdiction: 'London, United Kingdom',
    organizationId: 'org_apex_rob',
    ownerUserId: 'usr_apex_cfo',
    complianceTier: 'tier_4_corporate_kyb',
    riskLevel: 'low',
    isWhiteLabelTenant: false,
    createdAt: '2026-03-10T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_business_corp',
    name: 'Vanguard Cyber Systems (SME Business)',
    slug: 'vanguard-corp',
    type: 'business',
    accountType: 'business',
    country: 'US',
    currency: 'USD',
    jurisdiction: 'California, USA',
    organizationId: 'org_vanguard',
    ownerUserId: 'usr_vanguard_cfo',
    complianceTier: 'tier_4_corporate_kyb',
    riskLevel: 'low',
    isWhiteLabelTenant: false,
    createdAt: '2026-02-18T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_personal_gideon',
    name: 'Gideon Oluwalana (Personal Sovereign)',
    slug: 'gideon-personal',
    type: 'personal',
    accountType: 'personal',
    country: 'US',
    currency: 'USD',
    jurisdiction: 'New York, USA',
    organizationId: 'org_dynasty',
    ownerUserId: 'usr_gideon_dynasty',
    complianceTier: 'tier_3_enhanced_due_diligence',
    riskLevel: 'very_low',
    isWhiteLabelTenant: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_creator_studio',
    name: 'Aura Media Studio (Creator Account)',
    slug: 'aura-creators',
    type: 'creator',
    accountType: 'creator',
    country: 'CA',
    currency: 'CAD',
    jurisdiction: 'Toronto, Canada',
    organizationId: 'org_aura_creator',
    ownerUserId: 'usr_elena_creator',
    complianceTier: 'tier_3_enhanced_due_diligence',
    riskLevel: 'very_low',
    isWhiteLabelTenant: false,
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_developer_api',
    name: 'Synapse Core Dev (Developer Account)',
    slug: 'synapse-dev',
    type: 'developer',
    accountType: 'developer',
    country: 'DE',
    currency: 'EUR',
    jurisdiction: 'Berlin, Germany',
    organizationId: 'org_synapse_dev',
    ownerUserId: 'usr_dev_klaus',
    complianceTier: 'tier_3_enhanced_due_diligence',
    riskLevel: 'low',
    isWhiteLabelTenant: false,
    createdAt: '2026-04-10T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_whitelabel_fintech',
    name: 'NovaPay Global BaaS (White-Label Institution)',
    slug: 'novapay-baas',
    type: 'whitelabel_institution',
    accountType: 'whitelabel_institution',
    country: 'SG',
    currency: 'SGD',
    jurisdiction: 'Singapore (MAS Standard Payment License)',
    organizationId: 'org_novapay',
    ownerUserId: 'usr_novapay_admin',
    complianceTier: 'tier_5_institutional_sovereign',
    riskLevel: 'very_low',
    isWhiteLabelTenant: true,
    whiteLabelConfig: {
      brandName: 'NovaPay Business OS',
      logoUrl: 'https://novapay.global/assets/logo.svg',
      customDomain: 'finance.novapay.global',
      primaryColor: '#06b6d4',
      feeMarkupBps: 20,
      binRangePrefix: '482910'
    },
    createdAt: '2026-04-15T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'ft_tenant_gov_ngo',
    name: 'Global Climate & Energy Foundation (Government/NGO)',
    slug: 'global-climate-ngo',
    type: 'government_ngo',
    accountType: 'government_ngo',
    country: 'CH',
    currency: 'CHF',
    jurisdiction: 'Geneva, Switzerland',
    organizationId: 'org_climate_ngo',
    ownerUserId: 'usr_dr_amelia_ngo',
    complianceTier: 'tier_5_institutional_sovereign',
    riskLevel: 'very_low',
    isWhiteLabelTenant: false,
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  }
];

export const SEED_FINANCIAL_PROFILES: FinancialProfile[] = [
  {
    id: 'fp_prof_001',
    tenantId: 'ft_tenant_dynasty_ent',
    userId: 'usr_gideon_dynasty',
    omniPassportId: 'PASSPORT-OMNI-SOV-00192841',
    taxIdNumber: 'XX-XXX8921',
    legalName: 'Dynasty Global Holdings Inc.',
    tradeName: 'Dynasty OMNI Group',
    industryCategory: 'Sovereign Computing & Global Financial Infrastructure',
    verificationStatus: 'tier_5_institutional_sovereign',
    kycStatus: 'verified',
    kybStatus: 'verified',
    preferredCurrencies: ['USD', 'EUR', 'GBP', 'NGN', 'USDC', 'BTC', 'ETH'],
    financialPreferences: {
      autoSweepIdleYield: true,
      defaultSettlementRail: 'fednow',
      roundingSavingsVault: false,
      automatedTaxWithholding: true,
      privacyMaskBalances: false,
      realtimeNotifications: true
    },
    transactionPermissions: [
      'wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage', 'wallet.freeze',
      'payments.create', 'payments.approve', 'reports.view', 'expenses.manage',
      'treasury.manage', 'approval.manage', 'finance.admin'
    ],
    riskProfile: {
      overallScore: 6,
      level: 'very_low',
      amlSanctionsPass: true,
      pepScreeningPass: true,
      fatcaCrsCompliant: true,
      creditScoreIndex: 840,
      velocityTier: 'institutional'
    },
    accountRelationships: [
      { accountId: 'fa_acc_op_001', accountName: 'Main Operating Treasury Reserve', relationshipRole: 'primary_owner', legalEntityName: 'Dynasty Global Holdings Inc.' },
      { accountId: 'fa_acc_settle_002', accountName: 'Merchant Escrow Pool', relationshipRole: 'authorized_signatory', legalEntityName: 'Dynasty Global Holdings Inc.' },
      { accountId: 'fa_acc_crypto_004', accountName: 'USDC Sovereign Vault', relationshipRole: 'primary_owner', legalEntityName: 'Dynasty Global Holdings Inc.' }
    ],
    businessRelationships: [
      { organizationId: 'org_dynasty', organizationName: 'Dynasty Global Holdings Inc.', relationshipRole: 'director', ownershipPercentage: 68.5 },
      { organizationId: 'org_dynasty_eu', organizationName: 'Dynasty Europe B.V.', relationshipRole: 'ubo_beneficial_owner', ownershipPercentage: 100.0 },
      { organizationId: 'org_apex_rob', organizationName: 'Apex Robotics Labs', relationshipRole: 'director', ownershipPercentage: 24.0 }
    ],
    financialActivitySummary: {
      total30dVolumeUsd: 14850200.00,
      allTimeThroughputUsd: 184500000.00,
      disputeRatePercent: 0.01,
      activeWalletsCount: 7,
      averageTxSizeUsd: 12540.00,
      totalTransactionsCount: 1428
    },
    annualVolumeEstimateUsd: 180000000.00,
    twoFactorEnforced: true,
    lastRiskAssessmentDate: '2026-08-01T00:00:00Z'
  },
  {
    id: 'fp_prof_002',
    tenantId: 'ft_tenant_personal_gideon',
    userId: 'usr_gideon_dynasty',
    omniPassportId: 'PASSPORT-OMNI-SOV-00192841',
    taxIdNumber: 'XXX-XX-4901',
    legalName: 'Gideon Oluwalana',
    industryCategory: 'Executive & Private Investor',
    verificationStatus: 'tier_3_enhanced_due_diligence',
    kycStatus: 'verified',
    kybStatus: 'not_applicable',
    preferredCurrencies: ['USD', 'EUR', 'GBP', 'NGN', 'BTC', 'ETH'],
    financialPreferences: {
      autoSweepIdleYield: true,
      defaultSettlementRail: 'fednow',
      roundingSavingsVault: true,
      automatedTaxWithholding: true,
      privacyMaskBalances: false,
      realtimeNotifications: true
    },
    transactionPermissions: [
      'wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage',
      'payments.create', 'reports.view'
    ],
    riskProfile: {
      overallScore: 8,
      level: 'very_low',
      amlSanctionsPass: true,
      pepScreeningPass: true,
      fatcaCrsCompliant: true,
      creditScoreIndex: 825,
      velocityTier: 'accelerated'
    },
    accountRelationships: [
      { accountId: 'fa_acc_pers_005', accountName: 'Personal Primary Checking', relationshipRole: 'primary_owner', legalEntityName: 'Gideon Oluwalana' },
      { accountId: 'fa_acc_op_001', accountName: 'Main Operating Treasury Reserve', relationshipRole: 'authorized_signatory', legalEntityName: 'Dynasty Global Holdings Inc.' }
    ],
    businessRelationships: [
      { organizationId: 'org_dynasty', organizationName: 'Dynasty Global Holdings Inc.', relationshipRole: 'ubo_beneficial_owner', ownershipPercentage: 68.5 }
    ],
    financialActivitySummary: {
      total30dVolumeUsd: 384500.00,
      allTimeThroughputUsd: 4890000.00,
      disputeRatePercent: 0.00,
      activeWalletsCount: 3,
      averageTxSizeUsd: 1420.00,
      totalTransactionsCount: 280
    },
    annualVolumeEstimateUsd: 5000000.00,
    twoFactorEnforced: true,
    lastRiskAssessmentDate: '2026-08-05T00:00:00Z'
  }
];

export const SEED_FINANCIAL_ACCOUNTS: FinancialAccount[] = [
  {
    id: 'fa_acc_op_001',
    tenantId: 'ft_tenant_dynasty_ent',
    accountNumber: 'OMNI-US-9912048',
    accountName: 'Main Operating Treasury Reserve',
    accountType: 'treasury',
    category: 'asset',
    currency: 'USD',
    balance: 8450200.00,
    availableBalance: 8250200.00,
    reservedBalance: 200000.00,
    routingDetails: {
      routingNumber: '021000021',
      swiftBic: 'OMNIUS33XXX',
      iban: 'US89OMNI0210000219912048'
    },
    status: 'active',
    isVirtual: false,
    glAccountCode: '1010-CASH-OPERATING',
    createdAt: '2026-01-05T00:00:00Z'
  },
  {
    id: 'fa_acc_settle_002',
    tenantId: 'ft_tenant_dynasty_ent',
    accountNumber: 'OMNI-US-4820199',
    accountName: 'Merchant & Marketplace Escrow Pool',
    accountType: 'escrow',
    category: 'liability',
    currency: 'USD',
    balance: 3120000.00,
    availableBalance: 3120000.00,
    reservedBalance: 0,
    routingDetails: {
      routingNumber: '021000021',
      swiftBic: 'OMNIUS33XXX'
    },
    status: 'active',
    isVirtual: true,
    glAccountCode: '2050-ESCROW-DEPOSITS',
    createdAt: '2026-01-08T00:00:00Z'
  },
  {
    id: 'fa_acc_eur_003',
    tenantId: 'ft_tenant_dynasty_ent',
    accountNumber: 'NL91OMNI0482910481',
    accountName: 'Amsterdam Euro Working Capital',
    accountType: 'checking',
    category: 'asset',
    currency: 'EUR',
    balance: 2450000.00,
    availableBalance: 2400000.00,
    reservedBalance: 50000.00,
    routingDetails: {
      iban: 'NL91OMNI0482910481',
      swiftBic: 'OMNINL2AXXX'
    },
    status: 'active',
    isVirtual: false,
    glAccountCode: '1020-CASH-EUR-SUB',
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'fa_acc_crypto_004',
    tenantId: 'ft_tenant_dynasty_ent',
    accountNumber: 'OMNI-VAULT-USDC-0x89F',
    accountName: 'Institutional USDC Sovereign Vault',
    accountType: 'crypto_vault',
    category: 'asset',
    currency: 'USDC',
    balance: 5000000.00,
    availableBalance: 5000000.00,
    reservedBalance: 0,
    routingDetails: {
      walletAddress: '0x71C8394bA12B89ef194729104CaC3091B8721F89'
    },
    status: 'active',
    isVirtual: true,
    glAccountCode: '1080-CRYPTO-STABLECOIN',
    createdAt: '2026-02-15T00:00:00Z'
  },
  {
    id: 'fa_acc_pers_005',
    tenantId: 'ft_tenant_personal_gideon',
    accountNumber: 'OMNI-P-8840192',
    accountName: 'Personal Primary Checking',
    accountType: 'checking',
    category: 'asset',
    currency: 'USD',
    balance: 485200.00,
    availableBalance: 485200.00,
    reservedBalance: 0,
    routingDetails: {
      routingNumber: '021000021',
      iban: 'US89OMNI0210000218840192'
    },
    status: 'active',
    isVirtual: false,
    glAccountCode: '1001-PERS-CHECKING',
    createdAt: '2026-01-01T00:00:00Z'
  }
];

export const SEED_FINANCE_WALLETS: FinanceWallet[] = [
  {
    id: 'fw_wallet_ent_001',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'Enterprise Master Treasury Wallet',
    walletType: 'enterprise',
    primaryCurrency: 'USD',
    availableBalance: 8250200.00,
    pendingBalance: 150000.00,
    reservedBalance: 200000.00,
    blockedBalance: 0,
    totalUsdEquivalent: 21693950.00,
    balances: [
      { currency: 'USD', amount: 8450200.00, usdValue: 8450200.00 },
      { currency: 'EUR', amount: 2450000.00, usdValue: 2664375.00 },
      { currency: 'GBP', amount: 850000.00, usdValue: 1099900.00 },
      { currency: 'USDC', amount: 5000000.00, usdValue: 5000000.00 },
      { currency: 'BTC', amount: 45.5, usdValue: 4479475.00 }
    ],
    multiCurrencyBalances: [
      { currency: 'USD', available: 8250200.00, pending: 150000.00, reserved: 200000.00, blocked: 0, usdEquivalent: 8450200.00 },
      { currency: 'EUR', available: 2400000.00, pending: 50000.00, reserved: 50000.00, blocked: 0, usdEquivalent: 2664375.00 },
      { currency: 'GBP', available: 850000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 1099900.00 },
      { currency: 'USDC', available: 5000000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 5000000.00 },
      { currency: 'BTC', available: 45.5, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 4479475.00 }
    ],
    owner: {
      userId: 'usr_gideon_dynasty',
      name: 'Gideon Oluwalana',
      email: 'gideon@dynasty.omni.io',
      passportId: 'PASSPORT-OMNI-SOV-00192841',
      role: 'Enterprise Sovereign Admin & CFO'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage', 'wallet.freeze',
      'payments.create', 'payments.approve', 'reports.view', 'expenses.manage',
      'treasury.manage', 'approval.manage', 'finance.admin'
    ],
    transactionLimits: {
      perTxLimit: 2500000.00,
      dailyLimit: 10000000.00,
      monthlyLimit: 50000000.00,
      spentToday: 485000.00,
      remainingToday: 9515000.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 100000.00,
      suspiciousFlagged: false,
      lastSecurityEvent: '2026-08-16T12:00:00Z - MFA Verified Signature'
    },
    vaultSavingsLocked: 5000000.00,
    yieldEarnedTotal: 184500.00,
    autoRebalanceEnabled: true,
    isDefault: true,
    createdAt: '2026-01-05T00:00:00Z'
  },
  {
    id: 'fw_wallet_pers_002',
    tenantId: 'ft_tenant_personal_gideon',
    name: 'Personal Sovereign Multi-Asset Vault',
    walletType: 'personal',
    primaryCurrency: 'USD',
    availableBalance: 485200.00,
    pendingBalance: 1250.00,
    reservedBalance: 0,
    blockedBalance: 0,
    totalUsdEquivalent: 1568682.50,
    balances: [
      { currency: 'USD', amount: 485200.00, usdValue: 485200.00 },
      { currency: 'EUR', amount: 45000.00, usdValue: 48937.50 },
      { currency: 'NGN', amount: 15000000.00, usdValue: 9404.38 },
      { currency: 'BTC', amount: 8.25, usdValue: 812212.50 },
      { currency: 'ETH', amount: 65.0, usdValue: 222332.50 }
    ],
    multiCurrencyBalances: [
      { currency: 'USD', available: 485200.00, pending: 1250.00, reserved: 0, blocked: 0, usdEquivalent: 485200.00 },
      { currency: 'EUR', available: 45000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 48937.50 },
      { currency: 'NGN', available: 15000000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 9404.38 },
      { currency: 'BTC', available: 8.25, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 812212.50 },
      { currency: 'ETH', available: 65.0, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 222332.50 }
    ],
    owner: {
      userId: 'usr_gideon_dynasty',
      name: 'Gideon Oluwalana',
      email: 'gideon.private@omni.me',
      passportId: 'PASSPORT-OMNI-SOV-00192841',
      role: 'Sovereign Account Holder'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage',
      'payments.create', 'reports.view'
    ],
    transactionLimits: {
      perTxLimit: 100000.00,
      dailyLimit: 250000.00,
      monthlyLimit: 1000000.00,
      spentToday: 4200.00,
      remainingToday: 245800.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 25000.00,
      suspiciousFlagged: false,
      lastSecurityEvent: '2026-08-17T01:00:00Z - Biometric Passport Auth'
    },
    vaultSavingsLocked: 200000.00,
    yieldEarnedTotal: 14200.00,
    autoRebalanceEnabled: false,
    isDefault: true,
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'fw_wallet_business_003',
    tenantId: 'ft_tenant_business_corp',
    name: 'Vanguard Cyber Operating Wallet',
    walletType: 'business',
    primaryCurrency: 'USD',
    availableBalance: 940000.00,
    pendingBalance: 42000.00,
    reservedBalance: 50000.00,
    blockedBalance: 0,
    totalUsdEquivalent: 1420000.00,
    balances: [
      { currency: 'USD', amount: 940000.00, usdValue: 940000.00 },
      { currency: 'EUR', amount: 350000.00, usdValue: 380625.00 },
      { currency: 'GBP', amount: 76500.00, usdValue: 98991.00 }
    ],
    multiCurrencyBalances: [
      { currency: 'USD', available: 940000.00, pending: 42000.00, reserved: 50000.00, blocked: 0, usdEquivalent: 940000.00 },
      { currency: 'EUR', available: 350000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 380625.00 },
      { currency: 'GBP', available: 76500.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 98991.00 }
    ],
    owner: {
      userId: 'usr_vanguard_cfo',
      name: 'Sarah Chen, VP Finance',
      email: 'finance@vanguard.io',
      passportId: 'PASSPORT-OMNI-BUS-84920194',
      role: 'Business CFO'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'payments.create', 'reports.view', 'expenses.manage'
    ],
    transactionLimits: {
      perTxLimit: 500000.00,
      dailyLimit: 2000000.00,
      monthlyLimit: 10000000.00,
      spentToday: 65400.00,
      remainingToday: 1934600.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 50000.00,
      suspiciousFlagged: false
    },
    vaultSavingsLocked: 150000.00,
    yieldEarnedTotal: 18200.00,
    autoRebalanceEnabled: true,
    isDefault: true,
    createdAt: '2026-02-18T00:00:00Z'
  },
  {
    id: 'fw_wallet_merchant_004',
    tenantId: 'ft_tenant_sme_merchant',
    name: 'Apex Merchant Settlement & Escrow Wallet',
    walletType: 'merchant',
    primaryCurrency: 'GBP',
    availableBalance: 420000.00,
    pendingBalance: 98000.00,
    reservedBalance: 35000.00,
    blockedBalance: 0,
    totalUsdEquivalent: 715600.00,
    balances: [
      { currency: 'GBP', amount: 420000.00, usdValue: 543480.00 },
      { currency: 'EUR', amount: 120000.00, usdValue: 130500.00 },
      { currency: 'USD', amount: 41620.00, usdValue: 41620.00 }
    ],
    multiCurrencyBalances: [
      { currency: 'GBP', available: 420000.00, pending: 98000.00, reserved: 35000.00, blocked: 0, usdEquivalent: 543480.00 },
      { currency: 'EUR', available: 120000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 130500.00 },
      { currency: 'USD', available: 41620.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 41620.00 }
    ],
    owner: {
      userId: 'usr_apex_cfo',
      name: 'Oliver Thorne',
      email: 'payments@apexrobotics.co.uk',
      passportId: 'PASSPORT-OMNI-MERCH-33829104',
      role: 'Head of Commercial Payouts'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'payments.create', 'reports.view'
    ],
    transactionLimits: {
      perTxLimit: 250000.00,
      dailyLimit: 1000000.00,
      monthlyLimit: 5000000.00,
      spentToday: 18900.00,
      remainingToday: 981100.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 30000.00,
      suspiciousFlagged: false
    },
    vaultSavingsLocked: 50000.00,
    yieldEarnedTotal: 8400.00,
    autoRebalanceEnabled: true,
    isDefault: true,
    createdAt: '2026-03-10T00:00:00Z'
  },
  {
    id: 'fw_wallet_creator_005',
    tenantId: 'ft_tenant_creator_studio',
    name: 'Aura Creator Royalties & Payout Wallet',
    walletType: 'creator',
    primaryCurrency: 'CAD',
    availableBalance: 88500.00,
    pendingBalance: 14200.00,
    reservedBalance: 0,
    blockedBalance: 0,
    totalUsdEquivalent: 112400.00,
    balances: [
      { currency: 'CAD', amount: 88500.00, usdValue: 64835.16 },
      { currency: 'USD', amount: 35000.00, usdValue: 35000.00 },
      { currency: 'ETH', amount: 3.65, usdValue: 12484.82 }
    ],
    multiCurrencyBalances: [
      { currency: 'CAD', available: 88500.00, pending: 14200.00, reserved: 0, blocked: 0, usdEquivalent: 64835.16 },
      { currency: 'USD', available: 35000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 35000.00 },
      { currency: 'ETH', available: 3.65, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 12484.82 }
    ],
    owner: {
      userId: 'usr_elena_creator',
      name: 'Elena Vance',
      email: 'elena@auramedia.studio',
      passportId: 'PASSPORT-OMNI-CRTR-77291048',
      role: 'Creator Lead'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'wallet.withdraw', 'reports.view'
    ],
    transactionLimits: {
      perTxLimit: 50000.00,
      dailyLimit: 150000.00,
      monthlyLimit: 500000.00,
      spentToday: 2100.00,
      remainingToday: 147900.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 15000.00,
      suspiciousFlagged: false
    },
    vaultSavingsLocked: 20000.00,
    yieldEarnedTotal: 3100.00,
    autoRebalanceEnabled: false,
    isDefault: true,
    createdAt: '2026-04-01T00:00:00Z'
  },
  {
    id: 'fw_wallet_developer_006',
    tenantId: 'ft_tenant_developer_api',
    name: 'Synapse Developer API Billing & Gas Wallet',
    walletType: 'developer',
    primaryCurrency: 'EUR',
    availableBalance: 65400.00,
    pendingBalance: 3200.00,
    reservedBalance: 5000.00,
    blockedBalance: 0,
    totalUsdEquivalent: 92800.00,
    balances: [
      { currency: 'EUR', amount: 65400.00, usdValue: 71122.50 },
      { currency: 'USDC', amount: 15000.00, usdValue: 15000.00 },
      { currency: 'ETH', amount: 1.95, usdValue: 6669.97 }
    ],
    multiCurrencyBalances: [
      { currency: 'EUR', available: 65400.00, pending: 3200.00, reserved: 5000.00, blocked: 0, usdEquivalent: 71122.50 },
      { currency: 'USDC', available: 15000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 15000.00 },
      { currency: 'ETH', available: 1.95, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 6669.97 }
    ],
    owner: {
      userId: 'usr_dev_klaus',
      name: 'Klaus Lindqvist',
      email: 'klaus@synapse-dev.io',
      passportId: 'PASSPORT-OMNI-DEV-99201948',
      role: 'Lead Architect'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'payments.create', 'reports.view'
    ],
    transactionLimits: {
      perTxLimit: 25000.00,
      dailyLimit: 100000.00,
      monthlyLimit: 300000.00,
      spentToday: 1450.00,
      remainingToday: 98550.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 10000.00,
      suspiciousFlagged: false
    },
    vaultSavingsLocked: 10000.00,
    yieldEarnedTotal: 1950.00,
    autoRebalanceEnabled: false,
    isDefault: true,
    createdAt: '2026-04-10T00:00:00Z'
  },
  {
    id: 'fw_wallet_affiliate_007',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'Global Affiliate & Partner Payout Pool',
    walletType: 'affiliate',
    primaryCurrency: 'USD',
    availableBalance: 320000.00,
    pendingBalance: 45000.00,
    reservedBalance: 25000.00,
    blockedBalance: 0,
    totalUsdEquivalent: 390000.00,
    balances: [
      { currency: 'USD', amount: 320000.00, usdValue: 320000.00 },
      { currency: 'USDC', amount: 70000.00, usdValue: 70000.00 }
    ],
    multiCurrencyBalances: [
      { currency: 'USD', available: 320000.00, pending: 45000.00, reserved: 25000.00, blocked: 0, usdEquivalent: 320000.00 },
      { currency: 'USDC', available: 70000.00, pending: 0, reserved: 0, blocked: 0, usdEquivalent: 70000.00 }
    ],
    owner: {
      userId: 'usr_gideon_dynasty',
      name: 'Gideon Oluwalana',
      email: 'affiliates@omni.com',
      passportId: 'PASSPORT-OMNI-SOV-00192841',
      role: 'Ecosystem Growth Manager'
    },
    permissions: [
      'wallet.view', 'wallet.transfer', 'payments.create', 'reports.view'
    ],
    transactionLimits: {
      perTxLimit: 100000.00,
      dailyLimit: 500000.00,
      monthlyLimit: 2000000.00,
      spentToday: 12400.00,
      remainingToday: 487600.00
    },
    securityStatus: {
      isFrozen: false,
      debitRestricted: false,
      creditRestricted: false,
      approvalRequiredAboveUsd: 20000.00,
      suspiciousFlagged: false
    },
    vaultSavingsLocked: 0,
    yieldEarnedTotal: 4200.00,
    autoRebalanceEnabled: false,
    isDefault: false,
    createdAt: '2026-03-01T00:00:00Z'
  }
];

export const SEED_EXTERNAL_ACCOUNT_ADAPTERS: ExternalAccountAdapter[] = [
  {
    id: 'ea_adapter_plaid_001',
    tenantId: 'ft_tenant_dynasty_ent',
    adapterType: 'plaid',
    institutionName: 'JPMorgan Chase Bank (US)',
    accountName: 'Corporate Treasury Sweep (...4810)',
    accountNumberMasked: '•••• •••• •••• 4810',
    routingNumberMasked: '0210•••••',
    currency: 'USD',
    balance: 4120800.00,
    status: 'connected',
    supportedOperations: ['instant_deposit', 'ach_debit', 'payout', 'balance_sync', 'statement_fetch'],
    lastSyncTimestamp: '2026-08-17T01:40:00Z',
    logoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=64&h=64&fit=crop'
  },
  {
    id: 'ea_adapter_open_banking_002',
    tenantId: 'ft_tenant_dynasty_ent',
    adapterType: 'open_banking_uk_eu',
    institutionName: 'Barclays Commercial Bank (UK)',
    accountName: 'UK Operations Sterling Account (...9021)',
    accountNumberMasked: '•••• •••• •••• 9021',
    routingNumberMasked: '20-00-••',
    currency: 'GBP',
    balance: 1450000.00,
    status: 'connected',
    supportedOperations: ['instant_deposit', 'payout', 'balance_sync', 'statement_fetch'],
    lastSyncTimestamp: '2026-08-17T01:35:00Z',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=64&h=64&fit=crop'
  },
  {
    id: 'ea_adapter_african_ob_003',
    tenantId: 'ft_tenant_dynasty_ent',
    adapterType: 'african_open_banking',
    institutionName: 'Access Bank / NIBSS Direct (Nigeria)',
    accountName: 'West Africa Settlement Reserve (...3319)',
    accountNumberMasked: '•••• •••• •••• 3319',
    currency: 'NGN',
    balance: 384000000.00,
    status: 'connected',
    supportedOperations: ['instant_deposit', 'payout', 'balance_sync'],
    lastSyncTimestamp: '2026-08-17T01:20:00Z',
    logoUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=64&h=64&fit=crop'
  },
  {
    id: 'ea_adapter_fednow_004',
    tenantId: 'ft_tenant_dynasty_ent',
    adapterType: 'direct_fednow_ach',
    institutionName: 'Federal Reserve Bank Direct FedNow Node',
    accountName: 'OMNI Real-Time Settlement Transit Hub',
    accountNumberMasked: 'OMNI-FEDNOW-009182',
    currency: 'USD',
    balance: 12500000.00,
    status: 'connected',
    supportedOperations: ['instant_deposit', 'payout', 'balance_sync'],
    lastSyncTimestamp: '2026-08-17T01:50:00Z'
  },
  {
    id: 'ea_adapter_stripe_005',
    tenantId: 'ft_tenant_dynasty_ent',
    adapterType: 'payment_gateway_stripe',
    institutionName: 'Stripe Global Card Issuing & Gateway',
    accountName: 'Global Checkout Interchange Vault',
    accountNumberMasked: 'acct_1OMNI982104921',
    currency: 'USD',
    balance: 684200.00,
    status: 'connected',
    supportedOperations: ['payout', 'balance_sync', 'statement_fetch'],
    lastSyncTimestamp: '2026-08-17T01:45:00Z'
  },
  {
    id: 'ea_adapter_circle_006',
    tenantId: 'ft_tenant_dynasty_ent',
    adapterType: 'crypto_custody_circle',
    institutionName: 'Circle Institutional Mint & Redemption',
    accountName: 'BlackRock Reverse Repo USDC Reserve',
    accountNumberMasked: '0x71C8•••1F89',
    currency: 'USDC',
    balance: 5000000.00,
    status: 'connected',
    supportedOperations: ['instant_deposit', 'payout', 'balance_sync'],
    lastSyncTimestamp: '2026-08-17T01:50:00Z'
  }
];

export const SEED_FINANCIAL_RBAC_ROLES: FinancialRbacRole[] = [
  {
    roleKey: 'owner_sovereign',
    roleName: 'Sovereign Account Owner',
    category: 'personal',
    description: 'Ultimate owner with sovereign control over all personal wallets, vault locks, and transfers.',
    permissions: ['wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage', 'reports.view']
  },
  {
    roleKey: 'business_cfo',
    roleName: 'Corporate CFO & Treasurer',
    category: 'business',
    description: 'Chief financial officer with full payout creation, limit setting, and expense approval authority.',
    permissions: ['wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage', 'payments.create', 'payments.approve', 'reports.view', 'expenses.manage']
  },
  {
    roleKey: 'enterprise_treasurer',
    roleName: 'Enterprise Master Treasurer',
    category: 'enterprise',
    description: 'Full institutional treasury powers including multi-entity liquidity sweep, FX rebalancing, and wallet freezes.',
    permissions: [
      'wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage', 'wallet.freeze',
      'payments.create', 'payments.approve', 'reports.view', 'expenses.manage',
      'treasury.manage', 'approval.manage', 'finance.admin'
    ]
  },
  {
    roleKey: 'compliance_officer',
    roleName: 'Compliance & AML Auditor',
    category: 'enterprise',
    description: 'Read-only financial auditor with emergency velocity freeze and SAR reporting capabilities.',
    permissions: ['wallet.view', 'reports.view', 'wallet.freeze', 'audit.view', 'compliance.review']
  },
  {
    roleKey: 'merchant_operator',
    roleName: 'Merchant Payout Manager',
    category: 'business',
    description: 'Specialized role for managing point-of-sale settlements, batch refunds, and invoice payouts.',
    permissions: ['wallet.view', 'wallet.transfer', 'payments.create', 'reports.view']
  },
  {
    roleKey: 'creator_lead',
    roleName: 'Creator & Royalty Beneficiary',
    category: 'personal',
    description: 'Creator wallet manager for monitoring subscriber stream yields and executing creator withdrawals.',
    permissions: ['wallet.view', 'wallet.transfer', 'wallet.withdraw', 'reports.view']
  }
];

export const SEED_FINANCE_SECURITY_TESTS: FinanceSecurityTestResult[] = [
  {
    testId: 'sec_test_001',
    name: 'Cross-Tenant Wallet Access Rejection Test',
    category: 'tenancy_isolation',
    status: 'passed',
    executionMs: 14,
    logOutput: [
      '[INIT] Simulating Actor (Tenant: ft_tenant_sme_merchant) requesting Wallet (fw_wallet_ent_001)',
      '[RLS ENGINE] Evaluating PostgreSQL current_setting("app.current_tenant_id", true) != "ft_tenant_dynasty_ent"',
      '[SECURITY ENCLAVE] Intercepted unauthorized cross-tenant read attempt on fw_wallet_ent_001',
      '[RESULT] Access Denied: 403 Forbidden - Tenancy Boundary Enforced'
    ],
    assertionDetails: 'Cross-tenant query returned 0 rows and raised TenancyViolationException.',
    timestamp: '2026-08-17T02:00:00Z'
  },
  {
    testId: 'sec_test_002',
    name: 'Unauthorized Transfer & RBAC Permission Check Test',
    category: 'authorization_rbac',
    status: 'passed',
    executionMs: 9,
    logOutput: [
      '[INIT] Actor with role "compliance_officer" attempting outbound debit transfer of $50,000 USD',
      '[RBAC CHECK] Evaluating required permission "wallet.transfer" against active permissions ["wallet.view", "reports.view", "wallet.freeze"]',
      '[ASSERTION] "wallet.transfer" missing in granted role privileges',
      '[RESULT] Transaction Blocked: InsufficientPermissionsException (Required: wallet.transfer)'
    ],
    assertionDetails: 'Outbound payment halted before ledger staging; no state changes incurred.',
    timestamp: '2026-08-17T02:00:00Z'
  },
  {
    testId: 'sec_test_003',
    name: 'Permission Escalation Prevention Test',
    category: 'authorization_rbac',
    status: 'passed',
    executionMs: 12,
    logOutput: [
      '[INIT] Non-admin user attempting to self-grant "finance.admin" role via session modification',
      '[OMNI PASSPORT] Cryptographic token verification failed for escalated claim signature',
      '[AUTH SERVER] Detected privilege escalation payload; session invalidated immediately',
      '[AUDIT LOG] Logged critical security event SEC-ESC-4091 to tamper-proof audit trail'
    ],
    assertionDetails: 'Role escalation was rejected and token signature verification failed.',
    timestamp: '2026-08-17T02:00:00Z'
  },
  {
    testId: 'sec_test_004',
    name: 'Balance Manipulation & Ledger Invariant Test',
    category: 'balance_integrity',
    status: 'passed',
    executionMs: 18,
    logOutput: [
      '[INIT] Attempting direct un-journaled balance modification of +$1,000,000 to fw_wallet_ent_001',
      '[LEDGER ENGINE] Invariant Check: Sum(Debits) must equal Sum(Credits) across all posted journals',
      '[MERKLE AUDIT] Merkle tree root mismatch detected: Expected 0x9a8f... Got 0x0000...',
      '[ROLLBACK] Database trigger rolled back unbacked balance update; ledger remains immutable'
    ],
    assertionDetails: 'Double-entry cryptographic Merkle proof prevented unbacked balance mutation.',
    timestamp: '2026-08-17T02:00:00Z'
  },
  {
    testId: 'sec_test_005',
    name: 'Currency Conversion Decimal Precision & Rounding Test',
    category: 'precision_currency',
    status: 'passed',
    executionMs: 8,
    logOutput: [
      '[INIT] Converting 12345.678901 USDC (6 decimals) -> JPY (0 decimals) -> EUR (2 decimals)',
      '[FX CALCULATOR] Applying spot rate 154.20 JPY/USD and 1.0875 EUR/USD with banker’s rounding (half-even)',
      '[PRECISION CHECK] Fractional Satoshi & Cent conservation verified with zero leakage (Delta = 0.00000000)',
      '[RESULT] Precision invariant passed across fiat, stablecoin, and crypto decimal boundaries'
    ],
    assertionDetails: 'Decimal calculations verified against IEEE 754 BigNumber precision specs.',
    timestamp: '2026-08-17T02:00:00Z'
  },
  {
    testId: 'sec_test_006',
    name: 'Concurrent Wallet Actions & Race Condition Idempotency Test',
    category: 'concurrency_idempotency',
    status: 'passed',
    executionMs: 24,
    logOutput: [
      '[INIT] Firing 10 concurrent debit requests of $1,000 USD using the exact same Idempotency-Key "IDEMP-TEST-9921"',
      '[LOCK MANAGER] Redis/PostgreSQL advisory lock acquired on wallet fw_wallet_ent_001',
      '[EXECUTION] 1st request processed successfully; 9 duplicate requests returned cached result without second debit',
      '[BALANCE CHECK] Wallet debited exactly once ($1,000.00), preventing double-spend'
    ],
    assertionDetails: 'Advisory locks and idempotency key prevented double-spend across 10 concurrent threads.',
    timestamp: '2026-08-17T02:00:00Z'
  }
];

export const SEED_FINANCE_LEDGER_ACCOUNTS: FinanceLedgerAccount[] = [
  // 1000 - ASSETS
  { id: 'gla_1010', tenantId: 'ft_tenant_dynasty_ent', glCode: '1010', name: 'Cash & Cash Equivalents (USD)', category: 'asset', accountRole: 'asset', normalBalance: 'debit', currentBalance: 8450200.00, currency: 'USD', isActive: true, isSystemProtected: true, description: 'Primary central operating checking & Treasury liquidity' },
  { id: 'gla_1020', tenantId: 'ft_tenant_dynasty_ent', glCode: '1020', name: 'Euro Multi-Corridor Reserve (EUR)', category: 'asset', accountRole: 'asset', normalBalance: 'debit', currentBalance: 2450000.00, currency: 'EUR', isActive: true, description: 'European foreign exchange liquidity reserve' },
  { id: 'gla_1030', tenantId: 'ft_tenant_dynasty_ent', glCode: '1030', name: 'FedNow / ACH Clearing Account', category: 'asset', accountRole: 'clearing', normalBalance: 'debit', currentBalance: 0.00, currency: 'USD', isActive: true, isSystemProtected: true, description: 'Zero-balance clearing transit for in-flight payment rail batches' },
  { id: 'gla_1035', tenantId: 'ft_tenant_dynasty_ent', glCode: '1035', name: 'Card & Merchant Settlement Clearing', category: 'asset', accountRole: 'settlement', normalBalance: 'debit', currentBalance: 125400.00, currency: 'USD', isActive: true, isSystemProtected: true, description: 'Payment processor settlement transit pending net payout disbursement' },
  { id: 'gla_1040', tenantId: 'ft_tenant_dynasty_ent', glCode: '1040', name: 'Accounts Receivable (Trade A/R)', category: 'asset', accountRole: 'asset', normalBalance: 'debit', currentBalance: 684500.00, currency: 'USD', isActive: true, description: 'Invoiced customer receivables pending collection' },
  { id: 'gla_1080', tenantId: 'ft_tenant_dynasty_ent', glCode: '1080', name: 'Digital Asset Reserves (USDC/BTC)', category: 'asset', accountRole: 'asset', normalBalance: 'debit', currentBalance: 9479475.00, currency: 'USD', isActive: true, description: 'Cryptographic stablecoin & digital sovereign treasury' },

  // 2000 - LIABILITIES
  { id: 'gla_2010', tenantId: 'ft_tenant_dynasty_ent', glCode: '2010', name: 'Accounts Payable (Trade A/P)', category: 'liability', accountRole: 'liability', normalBalance: 'credit', currentBalance: 342000.00, currency: 'USD', isActive: true, description: 'Vendor invoices & supplier payment obligations' },
  { id: 'gla_2030', tenantId: 'ft_tenant_dynasty_ent', glCode: '2030', name: 'Payroll & Tax Withholding Accrual', category: 'liability', accountRole: 'tax', normalBalance: 'credit', currentBalance: 128400.00, currency: 'USD', isActive: true, isSystemProtected: true, description: 'Government federal, state & jurisdictional tax withholdings' },
  { id: 'gla_2040', tenantId: 'ft_tenant_dynasty_ent', glCode: '2040', name: 'Suspense & Unallocated Inflows', category: 'liability', accountRole: 'suspense', normalBalance: 'credit', currentBalance: 0.00, currency: 'USD', isActive: true, isSystemProtected: true, description: 'Holding pool for unmatched bank wires awaiting KYC/AML attribution' },
  { id: 'gla_2050', tenantId: 'ft_tenant_dynasty_ent', glCode: '2050', name: 'Merchant Escrow & Customer Deposits', category: 'liability', accountRole: 'liability', normalBalance: 'credit', currentBalance: 3120000.00, currency: 'USD', isActive: true, description: 'Client funds held in segregated fiduciary trust' },

  // 3000 - EQUITY
  { id: 'gla_3010', tenantId: 'ft_tenant_dynasty_ent', glCode: '3010', name: 'Contributed Founders Capital', category: 'equity', accountRole: 'equity', normalBalance: 'credit', currentBalance: 12000000.00, currency: 'USD', isActive: true, description: 'Paid-in sovereign capital & treasury equity' },
  { id: 'gla_3050', tenantId: 'ft_tenant_dynasty_ent', glCode: '3050', name: 'Retained Earnings', category: 'equity', accountRole: 'equity', normalBalance: 'credit', currentBalance: 4892400.00, currency: 'USD', isActive: true, description: 'Cumulative historical net operating profit' },

  // 4000 - REVENUE
  { id: 'gla_4010', tenantId: 'ft_tenant_dynasty_ent', glCode: '4010', name: 'Enterprise SaaS Subscription Revenue', category: 'revenue', accountRole: 'revenue', normalBalance: 'credit', currentBalance: 1845000.00, currency: 'USD', isActive: true, description: 'Recurring enterprise and API subscription billings' },
  { id: 'gla_4020', tenantId: 'ft_tenant_dynasty_ent', glCode: '4020', name: 'Payment Gateway & Interchange Platform Fees', category: 'revenue', accountRole: 'fee', normalBalance: 'credit', currentBalance: 420800.00, currency: 'USD', isActive: true, description: 'Platform processing markup & checkout interchange revenue' },
  { id: 'gla_4030', tenantId: 'ft_tenant_dynasty_ent', glCode: '4030', name: 'FX Spread Markup & Swap Revenue', category: 'revenue', accountRole: 'revenue', normalBalance: 'credit', currentBalance: 98450.00, currency: 'USD', isActive: true, description: 'Cross-border foreign exchange conversion bid-ask spread' },
  { id: 'gla_4040', tenantId: 'ft_tenant_dynasty_ent', glCode: '4040', name: 'Invoice Factoring & Liquidity Fees', category: 'revenue', accountRole: 'fee', normalBalance: 'credit', currentBalance: 45200.00, currency: 'USD', isActive: true, description: 'Instant invoice advance discount fee charges' },
  { id: 'gla_4080', tenantId: 'ft_tenant_dynasty_ent', glCode: '4080', name: 'Treasury Yield & Staking Rewards', category: 'revenue', accountRole: 'revenue', normalBalance: 'credit', currentBalance: 184500.00, currency: 'USD', isActive: true, description: 'Overnight repo, T-bill yield and sovereign validator staking' },

  // 5000 - EXPENSES
  { id: 'gla_5010', tenantId: 'ft_tenant_dynasty_ent', glCode: '5010', name: 'Payment Rail & Network Interchange Costs', category: 'expense', accountRole: 'fee', normalBalance: 'debit', currentBalance: 24500.00, currency: 'USD', isActive: true, description: 'Direct network processing charges (FedNow, SWIFT, SEPA, Visa/MC)' },
  { id: 'gla_5020', tenantId: 'ft_tenant_dynasty_ent', glCode: '5020', name: 'Engineering & Global Contractor Payroll', category: 'expense', accountRole: 'expense', normalBalance: 'debit', currentBalance: 612000.00, currency: 'USD', isActive: true, description: 'Direct labor compensation and contractor disbursements' },
  { id: 'gla_5030', tenantId: 'ft_tenant_dynasty_ent', glCode: '5030', name: 'Infrastructure & Compute Costs', category: 'expense', accountRole: 'expense', normalBalance: 'debit', currentBalance: 245000.00, currency: 'USD', isActive: true, description: 'Cloud servers, sovereign HSMs, and cluster hosting' },
  { id: 'gla_5040', tenantId: 'ft_tenant_dynasty_ent', glCode: '5040', name: 'Refund, Dispute & Chargeback Contra', category: 'expense', accountRole: 'refund', normalBalance: 'debit', currentBalance: 8200.00, currency: 'USD', isActive: true, description: 'Contra-revenue dispute losses and processed customer refunds' }
];

export const SEED_FINANCE_JOURNALS: FinanceJournalEntry[] = [
  {
    id: 'je_entry_001',
    tenantId: 'ft_tenant_dynasty_ent',
    entryNumber: 'JE-2026-08-0101',
    timestamp: '2026-08-16T14:30:00Z',
    description: 'Enterprise Annual License Settlement - Horizon AI Labs',
    sourceModule: 'invoicing',
    sourceReferenceId: 'inv_849201',
    postings: [
      { id: 'post_1', journalEntryId: 'je_entry_001', ledgerAccountId: 'gla_1010', glCode: '1010', accountName: 'Cash (USD)', entryType: 'debit', amount: 240000.00, currency: 'USD', fxRateToBase: 1.0, baseAmountUsd: 240000.00, memo: 'Wire received FedNow' },
      { id: 'post_2', journalEntryId: 'je_entry_001', ledgerAccountId: 'gla_4010', glCode: '4010', accountName: 'SaaS Subscription Revenue', entryType: 'credit', amount: 240000.00, currency: 'USD', fxRateToBase: 1.0, baseAmountUsd: 240000.00, memo: 'Horizon AI Annual' }
    ],
    totalDebit: 240000.00,
    totalCredit: 240000.00,
    isBalanced: true,
    verificationMerkleHash: 'sha256_merkle_9a8f21bc08412ee49b019da',
    postedByUserId: 'usr_gideon_dynasty',
    status: 'posted'
  },
  {
    id: 'je_entry_002',
    tenantId: 'ft_tenant_dynasty_ent',
    entryNumber: 'JE-2026-08-0102',
    timestamp: '2026-08-16T16:00:00Z',
    description: 'Autonomous FX Hedging Rebalance (USD to EUR)',
    sourceModule: 'fx',
    sourceReferenceId: 'fx_swap_98214',
    postings: [
      { id: 'post_3', journalEntryId: 'je_entry_002', ledgerAccountId: 'gla_1020', glCode: '1020', accountName: 'Euro Reserve (EUR)', entryType: 'debit', amount: 500000.00, currency: 'EUR', fxRateToBase: 1.0875, baseAmountUsd: 543750.00, memo: 'Purchased EUR 500k' },
      { id: 'post_4', journalEntryId: 'je_entry_002', ledgerAccountId: 'gla_1010', glCode: '1010', accountName: 'Cash (USD)', entryType: 'credit', amount: 543750.00, currency: 'USD', fxRateToBase: 1.0, baseAmountUsd: 543750.00, memo: 'Sold USD' }
    ],
    totalDebit: 543750.00,
    totalCredit: 543750.00,
    isBalanced: true,
    verificationMerkleHash: 'sha256_merkle_8b31ca92e40091bbff43801',
    postedByUserId: 'usr_sys_ai_hedging_bot',
    status: 'posted'
  },
  {
    id: 'je_entry_003',
    tenantId: 'ft_tenant_dynasty_ent',
    entryNumber: 'JE-2026-08-0103',
    timestamp: '2026-08-17T00:15:00Z',
    description: 'Bi-Monthly Global Engineering Payroll Batch Disbursement',
    sourceModule: 'payroll',
    sourceReferenceId: 'payrun_2026_08_a',
    postings: [
      { id: 'post_5', journalEntryId: 'je_entry_003', ledgerAccountId: 'gla_5020', glCode: '5020', accountName: 'Payroll Expense', entryType: 'debit', amount: 306000.00, currency: 'USD', fxRateToBase: 1.0, baseAmountUsd: 306000.00, memo: 'Gross Payroll' },
      { id: 'post_6', journalEntryId: 'je_entry_003', ledgerAccountId: 'gla_2030', glCode: '2030', accountName: 'Tax Withholding Accrual', entryType: 'credit', amount: 64200.00, currency: 'USD', fxRateToBase: 1.0, baseAmountUsd: 64200.00, memo: 'Federal & State Tax' },
      { id: 'post_7', journalEntryId: 'je_entry_003', ledgerAccountId: 'gla_1010', glCode: '1010', accountName: 'Cash (USD)', entryType: 'credit', amount: 241800.00, currency: 'USD', fxRateToBase: 1.0, baseAmountUsd: 241800.00, memo: 'Direct Deposits via FedNow' }
    ],
    totalDebit: 306000.00,
    totalCredit: 306000.00,
    isBalanced: true,
    verificationMerkleHash: 'sha256_merkle_4c09d812ab77413009fe129',
    postedByUserId: 'usr_gideon_dynasty',
    status: 'posted'
  }
];

export const SEED_FINANCE_TRANSACTIONS: FinanceTransaction[] = [
  {
    id: 'ftx_001',
    tenantId: 'ft_tenant_dynasty_ent',
    accountId: 'fa_acc_op_001',
    type: 'payment',
    direction: 'inbound',
    amount: 240000.00,
    currency: 'USD',
    usdEquivalent: 240000.00,
    feeAmount: 4.50,
    feeCurrency: 'USD',
    sourceInstrument: 'Horizon AI Enterprise Checking (...9012)',
    counterpartyName: 'Horizon AI Labs Inc.',
    counterpartyAccountOrHandle: 'horizon.omni.io',
    rail: 'fednow',
    status: 'settled',
    category: 'operational',
    memo: 'Annual Sovereign Enterprise License (2026)',
    tags: ['revenue', 'saas', 'enterprise'],
    referenceNumber: 'REF-FEDNOW-8920194',
    journalEntryId: 'je_entry_001',
    riskScore: 4,
    createdAt: '2026-08-16T14:30:00Z',
    settledAt: '2026-08-16T14:30:02Z'
  },
  {
    id: 'ftx_002',
    tenantId: 'ft_tenant_dynasty_ent',
    accountId: 'fa_acc_op_001',
    type: 'payroll_disbursement',
    direction: 'outbound',
    amount: 241800.00,
    currency: 'USD',
    usdEquivalent: 241800.00,
    feeAmount: 12.00,
    feeCurrency: 'USD',
    sourceInstrument: 'Main Treasury Account',
    counterpartyName: '48 Direct Employee Accounts (Global)',
    counterpartyAccountOrHandle: 'payroll.dispatch.batch_08',
    rail: 'fednow',
    status: 'settled',
    category: 'payroll',
    memo: 'Aug 1 - Aug 15 Net Payroll Payout',
    tags: ['payroll', 'employees', 'cleared'],
    referenceNumber: 'REF-PAY-2026-08A',
    journalEntryId: 'je_entry_003',
    riskScore: 2,
    createdAt: '2026-08-17T00:15:00Z',
    settledAt: '2026-08-17T00:15:04Z'
  },
  {
    id: 'ftx_003',
    tenantId: 'ft_tenant_dynasty_ent',
    accountId: 'fa_acc_op_001',
    type: 'fx_swap',
    direction: 'outbound',
    amount: 543750.00,
    currency: 'USD',
    usdEquivalent: 543750.00,
    feeAmount: 0.00,
    feeCurrency: 'USD',
    exchangeRate: 1.0875,
    sourceInstrument: 'US Treasury Pool',
    counterpartyName: 'Dynasty Europe B.V. (Internal)',
    counterpartyAccountOrHandle: 'NL91OMNI0482910481',
    rail: 'omni_internal',
    status: 'settled',
    category: 'treasury_rebalance',
    memo: 'Cross-Corridor Liquidity Injection EUR 500,000',
    tags: ['fx', 'hedging', 'intercompany'],
    referenceNumber: 'REF-FX-SWAP-98214',
    journalEntryId: 'je_entry_002',
    riskScore: 1,
    createdAt: '2026-08-16T16:00:00Z',
    settledAt: '2026-08-16T16:00:01Z'
  },
  {
    id: 'ftx_004',
    tenantId: 'ft_tenant_dynasty_ent',
    accountId: 'fa_acc_crypto_004',
    type: 'interest_yield',
    direction: 'inbound',
    amount: 21450.00,
    currency: 'USDC',
    usdEquivalent: 21450.00,
    feeAmount: 0.00,
    feeCurrency: 'USDC',
    sourceInstrument: 'Sovereign Treasury Staking Node #04',
    counterpartyName: 'OMNI Prime Liquidity Engine',
    counterpartyAccountOrHandle: '0xOMNI_TREASURY_RESERVE',
    rail: 'stablecoin_usdc',
    status: 'settled',
    category: 'treasury_rebalance',
    memo: 'Weekly Institutional Staking Yield (5.14% APY)',
    tags: ['yield', 'usdc', 'treasury'],
    referenceNumber: 'REF-YIELD-USDC-7712',
    riskScore: 0,
    createdAt: '2026-08-16T22:00:00Z',
    settledAt: '2026-08-16T22:00:15Z'
  },
  {
    id: 'ftx_005',
    tenantId: 'ft_tenant_dynasty_ent',
    accountId: 'fa_acc_op_001',
    type: 'card_swipe',
    direction: 'outbound',
    amount: 14500.00,
    currency: 'USD',
    usdEquivalent: 14500.00,
    feeAmount: 0.00,
    feeCurrency: 'USD',
    sourceInstrument: 'Virtual Corporate Card #4910',
    counterpartyName: 'Cloudflare Inc.',
    counterpartyAccountOrHandle: 'merch_cloudflare_ent',
    rail: 'card_network',
    status: 'settled',
    category: 'saas_subscription',
    memo: 'Global Edge Security & DDoS Protection',
    tags: ['devops', 'expenses'],
    referenceNumber: 'REF-CARD-4910-8812',
    riskScore: 3,
    createdAt: '2026-08-15T11:20:00Z',
    settledAt: '2026-08-15T11:20:01Z'
  }
];

export const SEED_FINANCE_BENEFICIARIES: FinanceBeneficiary[] = [
  {
    id: 'ben_001',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'Acme Cloud Compute Ltd',
    nickname: 'Primary GPU Cluster Provider',
    email: 'billing@acmecloud.io',
    beneficiaryType: 'business',
    country: 'US',
    currency: 'USD',
    preferredRail: 'fednow',
    routingDetails: {
      routingNumber: '121000358',
      accountNumber: '8940182910'
    },
    isVerified: true,
    kycPassed: true,
    createdAt: '2026-01-10T00:00:00Z'
  },
  {
    id: 'ben_002',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'Sovereign Quantum AI Labs',
    nickname: 'R&D Research Partner',
    email: 'treasury@quantumlabs.ch',
    beneficiaryType: 'business',
    country: 'CH',
    currency: 'CHF',
    preferredRail: 'sepa',
    routingDetails: {
      iban: 'CH9300000000000000000',
      swiftBic: 'UBSWCHZH80A'
    },
    isVerified: true,
    kycPassed: true,
    createdAt: '2026-02-14T00:00:00Z'
  },
  {
    id: 'ben_003',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'Dr. Elena Rostova',
    nickname: 'Principal Cryptography Fellow',
    email: 'elena.rostova@pqc-fellow.org',
    beneficiaryType: 'contractor',
    country: 'DE',
    currency: 'EUR',
    preferredRail: 'sepa',
    routingDetails: {
      iban: 'DE89370400440532013000',
      swiftBic: 'DBEUMM2KXXX'
    },
    isVerified: true,
    kycPassed: true,
    createdAt: '2026-03-01T00:00:00Z'
  }
];

export const SEED_FINANCE_PROVIDERS: FinanceProvider[] = [
  {
    id: 'prov_fednow_us',
    name: 'Federal Reserve FedNow Service',
    type: 'banking_as_a_service',
    supportedRails: ['fednow', 'ach', 'wire'],
    status: 'operational',
    uptime90d: 99.998,
    avgLatencyMs: 42,
    region: 'US-East (Direct Gateway)',
    apiUrl: 'https://gateway.fednow.gov/api/v1',
    activeTenantsCount: 1420,
    settlementSpeed: 'Instant (<200ms)'
  },
  {
    id: 'prov_sepa_inst',
    name: 'TIPS / SEPA Instant Euro Clearing',
    type: 'payment_gateway',
    supportedRails: ['sepa'],
    status: 'operational',
    uptime90d: 99.995,
    avgLatencyMs: 65,
    region: 'EU-Central (Frankfurt)',
    apiUrl: 'https://api.sepa-instant.ecb.europa.eu',
    activeTenantsCount: 980,
    settlementSpeed: 'Instant (<2s)'
  },
  {
    id: 'prov_circle_usdc',
    name: 'Circle Treasury Prime (USDC)',
    type: 'crypto_custody',
    supportedRails: ['stablecoin_usdc'],
    status: 'operational',
    uptime90d: 100.0,
    avgLatencyMs: 18,
    region: 'Global Multi-Cloud',
    apiUrl: 'https://api.circle.com/v1',
    activeTenantsCount: 2840,
    settlementSpeed: 'Instant (1 Block)'
  },
  {
    id: 'prov_marqeta_cards',
    name: 'Marqeta Open Issuance Network',
    type: 'card_issuing',
    supportedRails: ['card_network'],
    status: 'operational',
    uptime90d: 99.991,
    avgLatencyMs: 82,
    region: 'Global Visa/Mastercard',
    apiUrl: 'https://api.marqeta.com/v3',
    activeTenantsCount: 820,
    settlementSpeed: 'Real-Time Auth'
  },
  {
    id: 'prov_wise_fx',
    name: 'Wise Wholesale FX Engine',
    type: 'fx_liquidity',
    supportedRails: ['swift', 'wire', 'omni_internal'],
    status: 'operational',
    uptime90d: 99.992,
    avgLatencyMs: 110,
    region: 'London / Global Corridors',
    apiUrl: 'https://api.wise.com/v1',
    activeTenantsCount: 1650,
    settlementSpeed: 'T+0 / Same Day'
  }
];

export const SEED_FINANCE_FEATURE_FLAGS: FinanceFeatureFlag[] = [
  {
    id: 'ff_wallet',
    code: 'FEATURE_WALLET',
    name: 'Multi-Currency Sovereign Wallet',
    description: 'Sub-second multi-asset wallet balances across 15+ fiat and cryptographic assets with yield locking.',
    category: 'core',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Active across all jurisdictions and currency corridors.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['personal', 'family', 'freelancer', 'creator', 'business', 'sme', 'enterprise', 'government', 'ngo', 'institution', 'cooperative', 'developer', 'whitelabel_fintech'],
    minComplianceTierRequired: 'tier_1_basic_kyc',
    regulatedActivity: false
  },
  {
    id: 'ff_payments',
    code: 'FEATURE_PAYMENTS',
    name: 'Global Instant Payment Rails',
    description: 'Orchestration engine for FedNow, SEPA Instant, Pix, UPI, Swift, ACH, and USDC settlement.',
    category: 'payments',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Direct connection to FedNow, SEPA TIPS, and Circle gateways active.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['personal', 'family', 'freelancer', 'creator', 'business', 'sme', 'enterprise', 'government', 'ngo', 'institution', 'cooperative', 'developer', 'whitelabel_fintech'],
    minComplianceTierRequired: 'tier_2_verified_individual',
    regulatedActivity: true,
    requiredProviderType: 'banking_as_a_service'
  },
  {
    id: 'ff_fx',
    code: 'FEATURE_FX_EXCHANGE',
    name: 'Automated Multi-Currency FX Engine',
    description: 'Institutional mid-market currency conversion with sub-5bps spreads and autonomous AI hedging.',
    category: 'treasury',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Wise and institutional wholesale liquidity pools connected.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['business', 'sme', 'enterprise', 'government', 'institution', 'whitelabel_fintech'],
    minComplianceTierRequired: 'tier_3_enhanced_due_diligence',
    regulatedActivity: true,
    requiredProviderType: 'fx_liquidity'
  },
  {
    id: 'ff_cards',
    code: 'FEATURE_VIRTUAL_PHYSICAL_CARDS',
    name: 'Programmable Corporate & Virtual Cards',
    description: 'Instant card issuance with real-time dynamic MCC categorization, zero-overdraft spend limits, and Apple/Google Pay.',
    category: 'payments',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Marqeta Visa/Mastercard BIN sponsorship live in US, EU, and UK.',
    supportedCountries: ['US', 'EU', 'GB', 'SG', 'CA', 'AU'],
    allowedTenantTypes: ['business', 'sme', 'enterprise', 'whitelabel_fintech'],
    minComplianceTierRequired: 'tier_4_corporate_kyb',
    regulatedActivity: true,
    requiredProviderType: 'card_issuing'
  },
  {
    id: 'ff_payroll',
    code: 'FEATURE_GLOBAL_PAYROLL',
    name: 'Autonomous Global Payroll & Tax Withholding',
    description: 'Multi-jurisdiction salary calculations, local tax remittance, and sub-second batch disbursements.',
    category: 'core',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Tax computation tables current for 2026-Q3 across 45 countries.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['business', 'sme', 'enterprise', 'government', 'ngo'],
    minComplianceTierRequired: 'tier_4_corporate_kyb',
    regulatedActivity: true
  },
  {
    id: 'ff_treasury',
    code: 'FEATURE_ENTERPRISE_TREASURY',
    name: 'Cash Pooling & Liquidity Management',
    description: 'Multi-entity sweep accounts, overnight interest yield optimization, and liquidity ladders.',
    category: 'treasury',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Treasury prime vault connected.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['enterprise', 'government', 'institution', 'whitelabel_fintech'],
    minComplianceTierRequired: 'tier_5_institutional_sovereign',
    regulatedActivity: true
  },
  {
    id: 'ff_lending',
    code: 'FEATURE_REVENUE_BASED_LENDING',
    name: 'Invoice Factoring & Working Capital Line',
    description: 'Instant AI-underwritten advances against verified receivables and SaaS monthly recurring revenue.',
    category: 'lending',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Capital liquidity facility backed by OMNI Capital syndicate.',
    supportedCountries: ['US', 'EU', 'GB', 'SG', 'CA'],
    allowedTenantTypes: ['business', 'sme', 'enterprise'],
    minComplianceTierRequired: 'tier_4_corporate_kyb',
    regulatedActivity: true
  },
  {
    id: 'ff_crypto',
    code: 'FEATURE_CRYPTO_VAULTS',
    name: 'Institutional MPC Crypto Custody',
    description: 'Multi-party computation (MPC) cold/warm vaults for Bitcoin, Ethereum, and regulated stablecoins.',
    category: 'core',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Fireblocks MPC hardware node online.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['personal', 'business', 'enterprise', 'institution', 'developer'],
    minComplianceTierRequired: 'tier_3_enhanced_due_diligence',
    regulatedActivity: true,
    requiredProviderType: 'crypto_custody'
  },
  {
    id: 'ff_embedded',
    code: 'FEATURE_EMBEDDED_FINANCE_API',
    name: 'Embedded Finance & BaaS Developer Platform',
    description: 'Virtual accounts API, webhooks, sandbox simulation, and React UI SDK components for third parties.',
    category: 'developer',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'API gateway and sandbox environment operational.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['developer', 'sme', 'enterprise', 'whitelabel_fintech'],
    minComplianceTierRequired: 'tier_2_verified_individual',
    regulatedActivity: false
  },
  {
    id: 'ff_whitelabel',
    code: 'FEATURE_WHITE_LABEL_FINTECH',
    name: 'White-Label NeoBank & Fintech Platform',
    description: 'Launch complete branded banking and financial operating systems with custom margins and domains.',
    category: 'whitelabel',
    isInstalled: true,
    isOperational: true,
    operationalReason: 'Multi-tenant BaaS provisioning engine live.',
    supportedCountries: ['*'],
    allowedTenantTypes: ['whitelabel_fintech', 'enterprise', 'institution'],
    minComplianceTierRequired: 'tier_5_institutional_sovereign',
    regulatedActivity: true
  }
];

export const SEED_VIRTUAL_CARDS: VirtualCard[] = [
  {
    id: 'vc_card_001',
    tenantId: 'ft_tenant_dynasty_ent',
    cardholderName: 'Gideon Oluwalana (CEO)',
    lastFour: '4910',
    expiry: '08/29',
    cardType: 'physical_corporate',
    network: 'visa',
    spendingLimitMonthly: 50000.00,
    spentCurrentMonth: 14500.00,
    currency: 'USD',
    status: 'active',
    allowedMerchantCategories: ['cloud_computing', 'travel', 'software', 'advertising'],
    linkedAccountId: 'fa_acc_op_001'
  },
  {
    id: 'vc_card_002',
    tenantId: 'ft_tenant_dynasty_ent',
    cardholderName: 'DevOps Automated Server Node',
    lastFour: '8102',
    expiry: '12/28',
    cardType: 'virtual_subscription',
    network: 'mastercard',
    spendingLimitMonthly: 25000.00,
    spentCurrentMonth: 9800.00,
    currency: 'USD',
    status: 'active',
    allowedMerchantCategories: ['cloud_computing', 'domain_registrars'],
    linkedAccountId: 'fa_acc_op_001'
  },
  {
    id: 'vc_card_003',
    tenantId: 'ft_tenant_personal_gideon',
    cardholderName: 'Gideon Oluwalana',
    lastFour: '3391',
    expiry: '05/30',
    cardType: 'virtual_single_use',
    network: 'visa',
    spendingLimitMonthly: 5000.00,
    spentCurrentMonth: 420.00,
    currency: 'USD',
    status: 'active',
    allowedMerchantCategories: ['all'],
    linkedAccountId: 'fa_acc_pers_005'
  }
];

export const SEED_PAYROLL_RUNS: PayrollRun[] = [
  {
    id: 'payrun_2026_08_a',
    tenantId: 'ft_tenant_dynasty_ent',
    payPeriod: 'Aug 1 - Aug 15, 2026',
    totalGrossPay: 306000.00,
    totalTaxesWithheld: 64200.00,
    totalNetDisbursement: 241800.00,
    currency: 'USD',
    employeesCount: 48,
    status: 'disbursed',
    scheduledDisbursementDate: '2026-08-15T00:00:00Z',
    directDepositRail: 'fednow'
  },
  {
    id: 'payrun_2026_08_b',
    tenantId: 'ft_tenant_dynasty_ent',
    payPeriod: 'Aug 16 - Aug 31, 2026',
    totalGrossPay: 312000.00,
    totalTaxesWithheld: 65500.00,
    totalNetDisbursement: 246500.00,
    currency: 'USD',
    employeesCount: 49,
    status: 'draft',
    scheduledDisbursementDate: '2026-08-31T00:00:00Z',
    directDepositRail: 'fednow'
  }
];

export const SEED_SMART_INVOICES: SmartInvoice[] = [
  {
    id: 'inv_849201',
    tenantId: 'ft_tenant_dynasty_ent',
    invoiceNumber: 'INV-2026-0841',
    customerName: 'Horizon AI Labs Inc.',
    customerEmail: 'ap@horizonailabs.com',
    lineItems: [
      { description: 'OMNI Enterprise Dedicated Sovereign Node License', quantity: 1, unitPrice: 200000.00, total: 200000.00 },
      { description: 'Post-Quantum TLS 1.3 & Dedicated SIEM Pipeline', quantity: 1, unitPrice: 40000.00, total: 40000.00 }
    ],
    subtotal: 240000.00,
    taxAmount: 0.00,
    totalAmount: 240000.00,
    currency: 'USD',
    issueDate: '2026-08-01',
    dueDate: '2026-08-16',
    status: 'paid',
    isFactored: false,
    paymentLink: 'https://pay.omni.com/inv/849201'
  },
  {
    id: 'inv_849202',
    tenantId: 'ft_tenant_dynasty_ent',
    invoiceNumber: 'INV-2026-0842',
    customerName: 'Aegis Defence Technologies',
    customerEmail: 'treasury@aegisdef.com',
    lineItems: [
      { description: 'Air-Gapped Sovereign Military Grid Integration', quantity: 1, unitPrice: 450000.00, total: 450000.00 }
    ],
    subtotal: 450000.00,
    taxAmount: 0.00,
    totalAmount: 450000.00,
    currency: 'USD',
    issueDate: '2026-08-10',
    dueDate: '2026-08-25',
    status: 'issued',
    isFactored: true,
    advanceOfferedAmount: 405000.00, // 90% instant advance
    paymentLink: 'https://pay.omni.com/inv/849202'
  }
];

export const SEED_EXPENSE_ITEMS: ExpenseItem[] = [
  {
    id: 'exp_001',
    tenantId: 'ft_tenant_dynasty_ent',
    submitterName: 'Marcus Vance',
    merchant: 'NVIDIA Developer Cloud',
    amount: 8400.00,
    currency: 'USD',
    category: 'compute_hardware',
    receiptUrl: 'https://receipts.omni.com/2026/nv_8410.pdf',
    ocrConfidence: 99.4,
    status: 'approved',
    submittedAt: '2026-08-15T10:00:00Z',
    cardId: 'vc_card_001'
  },
  {
    id: 'exp_002',
    tenantId: 'ft_tenant_dynasty_ent',
    submitterName: 'Sarah Lin',
    merchant: 'Delta Air Lines',
    amount: 1250.00,
    currency: 'USD',
    category: 'travel',
    receiptUrl: 'https://receipts.omni.com/2026/delta_4812.pdf',
    ocrConfidence: 98.1,
    status: 'approved',
    submittedAt: '2026-08-14T18:30:00Z'
  }
];

export const SEED_TREASURY_POOLS: TreasuryPool[] = [
  {
    id: 'tp_pool_001',
    tenantId: 'ft_tenant_dynasty_ent',
    poolName: 'Global High-Yield Sovereign Cash Pool',
    totalDepositedUsd: 12500000.00,
    currentYieldApyPercent: 5.24,
    riskStrategy: 'conservative_tbills',
    rebalanceFrequency: 'daily_auto',
    liquidityTierBufferUsd: 2000000.00,
    allocatedEntities: [
      { entityName: 'Dynasty Global Holdings (HQ)', sharePercent: 65 },
      { entityName: 'Dynasty Europe B.V.', sharePercent: 25 },
      { entityName: 'Dynasty APAC Pte Ltd', sharePercent: 10 }
    ]
  },
  {
    id: 'tp_pool_002',
    tenantId: 'ft_tenant_dynasty_ent',
    poolName: 'On-Chain Prime Liquidity Buffer',
    totalDepositedUsd: 5000000.00,
    currentYieldApyPercent: 6.85,
    riskStrategy: 'defi_prime_lending',
    rebalanceFrequency: 'daily_auto',
    liquidityTierBufferUsd: 1000000.00,
    allocatedEntities: [
      { entityName: 'Dynasty Global Holdings (HQ)', sharePercent: 100 }
    ]
  }
];

export const SEED_APPROVAL_RULES: FinanceApprovalRule[] = [
  {
    id: 'ar_rule_001',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'High-Value Outbound Wire Approval ($100k+)',
    triggerCondition: {
      minAmountUsd: 100000.00,
      destinationType: 'any',
      rail: 'all'
    },
    requiredApproversCount: 2,
    eligibleRoles: ['owner', 'admin', 'cfo'],
    autoEscalationHours: 4,
    isActive: true
  },
  {
    id: 'ar_rule_002',
    tenantId: 'ft_tenant_dynasty_ent',
    name: 'New Foreign Beneficiary First Transfer',
    triggerCondition: {
      minAmountUsd: 10000.00,
      destinationType: 'foreign_country',
      rail: 'swift'
    },
    requiredApproversCount: 1,
    eligibleRoles: ['owner', 'cfo', 'compliance_officer'],
    autoEscalationHours: 8,
    isActive: true
  }
];

export const SEED_APPROVAL_REQUESTS: FinanceApprovalRequest[] = [
  {
    id: 'apr_req_001',
    tenantId: 'ft_tenant_dynasty_ent',
    ruleId: 'ar_rule_001',
    requestType: 'outbound_payment',
    title: 'Acme Cloud Compute GPU Cluster Quarterly Advance',
    amount: 185000.00,
    currency: 'USD',
    requestedByUserId: 'usr_sarah_finance_lead',
    requestedByUserName: 'Sarah Lin (Treasury Analyst)',
    requestedAt: '2026-08-16T18:00:00Z',
    status: 'pending',
    approvedBy: [
      { userId: 'usr_gideon_dynasty', userName: 'Gideon Oluwalana (CEO)', timestamp: '2026-08-16T18:45:00Z', ipHash: 'sha256_99a8b12' }
    ],
    comments: 'Awaiting second signoff from CFO before FedNow execution.'
  }
];

export const SEED_FINANCE_AI_INSIGHTS: FinanceAiInsight[] = [
  {
    id: 'fai_001',
    type: 'cashflow_forecast',
    severity: 'positive',
    headline: 'Runway Extended to 44 Months at Current Net Margin',
    detail: 'Net operating cash flow increased by +$412,000 this month due to early collection on enterprise annual contracts. Projected cash buffer covers 44 months of uninterrupted R&D.',
    suggestedActionTitle: 'Sweep $500k into High-Yield Treasury Pool',
    potentialBenefitUsd: 26200.00,
    confidenceScore: 97.4,
    createdAt: '2026-08-17T00:30:00Z'
  },
  {
    id: 'fai_002',
    type: 'fx_optimization',
    severity: 'info',
    headline: 'Optimal FX Hedging Opportunity (EUR/USD Spike)',
    detail: 'EUR/USD touched 1.0875 (+0.32%). Converting USD into EUR for Amsterdam subsidiary vendor obligations now will save approximately $8,400 compared to 30-day moving average.',
    suggestedActionTitle: 'Execute Auto-Hedge Order for EUR 400,000',
    potentialBenefitUsd: 8400.00,
    confidenceScore: 92.1,
    createdAt: '2026-08-16T15:00:00Z'
  },
  {
    id: 'fai_003',
    type: 'dunning_alert',
    severity: 'warning',
    headline: '1 Invoice Approaching Due Date with Instant Factoring Available',
    detail: 'Aegis Defence invoice #INV-2026-0842 ($450,000) is eligible for 90% instant liquidity advance ($405,000) with 0.75% factoring fee.',
    suggestedActionTitle: 'Review Instant Factoring Terms',
    potentialBenefitUsd: 405000.00,
    confidenceScore: 99.0,
    createdAt: '2026-08-16T09:15:00Z'
  }
];

export const SEED_EXTERNAL_ADAPTERS: ExternalAccountAdapter[] = SEED_EXTERNAL_ACCOUNT_ADAPTERS;
export const SEED_RBAC_ROLES: FinancialRbacRole[] = SEED_FINANCIAL_RBAC_ROLES;
export const SEED_SECURITY_TEST_RESULTS: FinanceSecurityTestResult[] = SEED_FINANCE_SECURITY_TESTS;
