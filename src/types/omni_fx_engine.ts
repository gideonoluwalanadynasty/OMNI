// ============================================================================
// OMNI GLOBAL FX & MULTI-CURRENCY ENGINE — TYPE DEFINITIONS
// ============================================================================

export type CurrencyRiskClassification = 'low' | 'moderate' | 'elevated' | 'high' | 'sanctioned';
export type CurrencyStatus = 'active' | 'maintenance' | 'restricted' | 'deprecated';
export type CurrencyRegion = 'North America' | 'Europe' | 'Africa' | 'Asia Pacific' | 'Latin America' | 'Middle East';

export interface CurrencyRecord {
  code: string; // ISO 4217, e.g., 'USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'ZAR', 'INR', 'CAD', 'AUD'
  name: string; // e.g. 'United States Dollar'
  symbol: string; // e.g. '$'
  country: string; // e.g. 'United States'
  countryCode: string; // e.g. 'US'
  flagEmoji: string; // e.g. '🇺🇸'
  region: CurrencyRegion;
  decimalPrecision: number; // e.g. 2 for USD, 0 for JPY, 3 for BHD
  minorUnit: number; // e.g. 100
  settlementAvailability: boolean;
  providerAvailability: boolean;
  exchangeAvailability: boolean;
  riskClassification: CurrencyRiskClassification;
  restrictions: string[]; // e.g. ['Central Bank repatriation rules apply']
  status: CurrencyStatus;
  isDefaultBase: boolean;
  dailyConversionLimitUsd: number;
  addedAt: string;
  customMetadata?: Record<string, any>;
}

export type FxProviderType =
  | 'central_bank'
  | 'commercial_fx'
  | 'payment_provider'
  | 'banking_partner'
  | 'market_data';

export type FxProviderStatus = 'active' | 'degraded' | 'maintenance' | 'offline';

export interface FxProvider {
  id: string;
  name: string;
  code: string;
  type: FxProviderType;
  status: FxProviderStatus;
  baseCurrency: string;
  supportedPairs: string[];
  refreshIntervalSec: number;
  latencyMs: number;
  reliabilityScore: number; // 0 - 100
  lastSyncAt: string;
  apiEndpointMock: string;
  credentialsConfigured: boolean;
  spreadMarkupBps: number;
}

export type RateSourceType = 'realtime_feed' | 'delayed_feed' | 'historical_eod' | 'manual_admin';
export type VolatilityStatus = 'calm' | 'normal' | 'volatile' | 'extreme';

export interface ExchangeRateRecord {
  id: string;
  pair: string; // e.g. 'USD/EUR', 'USD/NGN'
  baseCurrency: string;
  quoteCurrency: string;
  providerId: string;
  providerName: string;
  providerRate: number;
  omniReferenceRate: number; // Mid-market rate
  buyRate: number; // Customer buy rate (includes spread)
  sellRate: number; // Customer sell rate
  spreadBps: number; // Basis points (e.g. 35 bps = 0.35%)
  spreadPercentage: number;
  inverseRate: number;
  change24hPct: number;
  high24h: number;
  low24h: number;
  timestamp: string;
  expiry: string; // Guaranteed rate quote TTL
  source: RateSourceType;
  volatilityStatus: VolatilityStatus;
  isGuaranteedQuote?: boolean;
}

export type FxFeeTier = 'standard_retail' | 'business_preferred' | 'enterprise_wholesale' | 'promotional_zero';
export type FxFeeStructure = 'percentage' | 'fixed' | 'tiered' | 'business_negotiated' | 'enterprise_pricing' | 'promotional';

export interface FxQuote {
  quoteId: string;
  tenantId: string;
  userId: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  appliedRate: number;
  midMarketRate: number;
  spreadBps: number;
  spreadAmount: number;
  feeTier: FxFeeTier;
  feeStructure: FxFeeStructure;
  fixedFee: number;
  percentageFeeRate: number;
  percentageFeeAmount: number;
  totalFeeCharged: number;
  feeCurrency: string;
  effectiveRate: number;
  rateLockDurationSec: number;
  rateLockExpiresAt: string;
  providerUsed: string;
  createdAt: string;
  isExpired: boolean;
}

export type FxTransactionStatus = 'initiated' | 'quoted' | 'executing' | 'completed' | 'failed' | 'reversed';
export type FxPurposeCode =
  | 'treasury_rebalance'
  | 'supplier_settlement'
  | 'invoice_payment'
  | 'travel_p2p'
  | 'hedging'
  | 'payroll_disbursement'
  | 'merchant_payout';

export interface FxTransaction {
  id: string;
  tenantId: string;
  referenceNumber: string; // e.g. 'FX-2026-98124'
  userId: string;
  userName: string;
  userEmail: string;
  entityType: 'personal' | 'business' | 'enterprise';
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  appliedRate: number;
  midMarketRate: number;
  spreadBps: number;
  totalFeeCharged: number;
  feeCurrency: string;
  feeStructure: FxFeeStructure;
  providerId: string;
  providerName: string;
  status: FxTransactionStatus;
  purposeCode: FxPurposeCode;
  journalEntryId?: string;
  merkleReceiptHash: string;
  fromWalletId: string;
  toWalletId: string;
  counterpartyName?: string;
  executionLatencyMs: number;
  createdAt: string;
  settledAt: string;
  aiAdvisoryNote?: string;
  failureReason?: string;
}

export interface MultiCurrencyBalance {
  currency: string;
  symbol: string;
  available: number;
  pending: number;
  reserved: number;
  total: number;
  usdEquivalent: number;
  baseSharePct: number;
  lastMovementAt: string;
}

export interface MultiCurrencyWallet {
  id: string;
  tenantId: string;
  ownerId: string;
  ownerName: string;
  ownerType: 'individual' | 'business' | 'enterprise_entity';
  preferredSettlementCurrency: string;
  balances: Record<string, MultiCurrencyBalance>; // Keyed by Currency Code
  totalValueUsd: number;
  autoSweepEnabled: boolean;
  autoSweepTargetCurrency?: string;
  autoSweepThresholdUsd?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForeignCurrencyHolding {
  currency: string;
  amount: number;
  usdValue: number;
  weightPct: number;
  unhedgedAmount: number;
  hedgedAmount: number;
  fxGainLossUnrealizedUsd: number;
  volatility30d: number;
}

export interface UpcomingForeignObligation {
  id: string;
  supplierName: string;
  invoiceNumber: string;
  dueDays: number;
  currency: string;
  foreignAmount: number;
  currentUsdValue: number;
  bookedUsdValue: number;
  fxVarianceUsd: number;
  hedgedStatus: 'unhedged' | 'partially_hedged' | 'fully_locked';
}

export interface BusinessFxExposure {
  tenantId: string;
  entityName: string;
  baseCurrency: string;
  totalAssetsUsd: number;
  currencyHoldings: ForeignCurrencyHolding[];
  upcomingForeignObligations: UpcomingForeignObligation[];
  valueAtRisk95_1DayUsd: number;
  hedgingRatioPct: number;
  recommendedActions: string[];
}

export interface EnterpriseSettlementItem {
  id: string;
  subsidiaryName: string;
  sourceCurrency: string;
  targetCurrency: string;
  volume: number;
  targetDate: string;
  corridor: string;
  strategy: 'spot_immediate' | 'forward_contract' | 'internal_netting' | 'limit_order';
  status: 'scheduled' | 'optimizing' | 'locked' | 'executed';
  projectedSavingsUsd: number;
}

export interface EnterpriseTreasurySettlementPlan {
  planId: string;
  tenantId: string;
  period: string;
  plannedSettlements: EnterpriseSettlementItem[];
  netCrossBorderSavingsUsd: number;
  totalVolumeUsd: number;
}

export interface FxFeeTierConfig {
  tierId: FxFeeTier;
  name: string;
  minVolumeUsd: number;
  percentageFee: number; // e.g. 0.0035 = 0.35%
  fixedFeeUsd: number; // e.g. 0.50
  spreadMarkupBps: number; // e.g. 25 bps
}

export interface FxAdminConfig {
  isEngineActive: boolean;
  baseOperatingCurrency: string;
  defaultSpreadBps: number;
  maxDailyConversionPerUserUsd: number;
  requireKycForFxAboveUsd: number;
  makerCheckerThresholdUsd: number;
  rateLockValiditySeconds: number;
  autoFallbackEnabled: boolean;
  feeTiers: FxFeeTierConfig[];
  restrictedCountryCodes: string[];
  blacklistedCurrencies: string[];
  emergencyCircuitBreakerActive: boolean;
}

export interface FxAiInsight {
  id: string;
  currencyPair: string;
  analysisTitle: string;
  movementSummary: string;
  macroDrivers: string[];
  volatilityForecast: 'low' | 'moderate' | 'high';
  hedgingRecommendation: string;
  feeOptimizationTip: string;
  confidenceScore: number;
  generatedAt: string;
  readOnlyDisclaimer: "AI CANNOT EXECUTE FX TRADES, OVERRIDE RATES, OR MUTATE LEDGER STATE";
}

export interface FxTestResult {
  testId: string;
  name: string;
  scenario: string;
  passed: boolean;
  durationMs: number;
  details: string;
  timestamp: string;
}
