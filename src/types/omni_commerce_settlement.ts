// ============================================================================
// OMNI COMMERCE FINANCIAL SETTLEMENT ENGINE - TYPES & INTERFACES
// Powering Marketplace, Ads, Creator Economy, Affiliate, Subscriptions, Payouts
// ============================================================================

import { PaymentRail } from './finance_os';

export type CommerceModuleSource =
  | 'omni_marketplace'
  | 'omni_ads'
  | 'omni_creator'
  | 'omni_affiliate'
  | 'omni_learn'
  | 'omni_capital';

export type CommerceAccountRole =
  | 'creator'
  | 'seller'
  | 'advertiser'
  | 'affiliate'
  | 'course_provider'
  | 'publisher'
  | 'developer'
  | 'partner'
  | 'platform_treasury';

export type CommerceProductType =
  | 'physical_product'
  | 'digital_product'
  | 'subscription'
  | 'course'
  | 'service'
  | 'download'
  | 'license'
  | 'ad_campaign_cpc_cpm'
  | 'creator_tip'
  | 'creator_membership'
  | 'micro_grant_capital';

export type SettlementFrequency = 'instant' | 'daily' | 'weekly' | 'monthly' | 'manual';

export type SettlementStatus =
  | 'pending_payment'
  | 'payment_verified'
  | 'split_calculated'
  | 'funds_in_escrow'
  | 'cleared_for_payout'
  | 'settled_to_wallet'
  | 'disbursed_external'
  | 'partially_refunded'
  | 'fully_refunded'
  | 'disputed_frozen'
  | 'chargeback_reversed';

export type PayoutRailType =
  | 'omni_internal_wallet'
  | 'bank_ach'
  | 'bank_sepa'
  | 'bank_fednow'
  | 'bank_swift_wire'
  | 'mobile_money_mpesa'
  | 'mobile_money_pix'
  | 'mobile_money_upi'
  | 'stablecoin_usdc';

export type PayoutStatus =
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'reversed_to_balance';

export type AffiliateCommissionStatus =
  | 'pending'
  | 'approved'
  | 'paid'
  | 'reversed';

export type SubscriptionStatus =
  | 'active'
  | 'in_grace_period'
  | 'past_due'
  | 'cancelled'
  | 'paused'
  | 'renewed';

// ----------------------------------------------------------------------------
// Commerce Financial Account
// ----------------------------------------------------------------------------
export interface CommerceFinancialAccount {
  id: string;
  tenantId: string;
  ownerUserId: string;
  ownerName: string;
  role: CommerceAccountRole;
  displayName: string;
  avatarUrl?: string;
  country: string;
  currency: string;
  totalGrossRevenue: number;
  totalFeesPaid: number;
  totalCommissionsEarned: number;
  totalTaxWithheld: number;
  totalPaidOut: number;
  availableBalance: number;
  pendingBalance: number;
  escrowBalance: number;
  settlementFrequency: SettlementFrequency;
  defaultPayoutRail: PayoutRailType;
  payoutDestination: {
    bankIbanOrAccount?: string;
    routingOrBic?: string;
    walletAddress?: string;
    mobileNumber?: string;
    accountHolderName: string;
  };
  taxIdNumber: string;
  taxFormStatus: 'w9_verified' | 'w8ben_verified' | 'vat_exempt' | 'pending';
  kybKycVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Revenue Splitting Rule
// ----------------------------------------------------------------------------
export interface RevenueSplitRule {
  id: string;
  name: string;
  productType: CommerceProductType;
  moduleSource: CommerceModuleSource;
  description: string;
  isActive: boolean;
  // Percentage allocations (must sum to <= 100%, remainder to seller or platform)
  platformFeePercent: number; // e.g. 15%
  primarySellerPercent: number; // e.g. 70%
  affiliatePercent: number; // e.g. 10%
  publisherPercent: number; // e.g. for ads: 55%
  secondaryCreatorPercent: number; // e.g. for ads: 20%
  taxReservePercent: number; // e.g. 5%
  fixedPlatformFeeCents: number; // e.g. $0.30 fixed
  isConfigurableByAdmin: boolean;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Commerce Order & Settlement Transaction
// ----------------------------------------------------------------------------
export interface CommerceSettlementTransaction {
  id: string;
  tenantId: string;
  orderNumber: string;
  moduleSource: CommerceModuleSource;
  productType: CommerceProductType;
  productTitle: string;
  buyerUserId: string;
  buyerName: string;
  buyerEmail: string;
  currency: string;
  
  // Financial breakdown
  grossAmount: number;
  platformFeeAmount: number;
  sellerGrossShare: number;
  sellerNetShare: number;
  affiliateCommissionAmount: number;
  publisherRevenueAmount?: number;
  creatorAdCutAmount?: number;
  taxAmount: number;
  taxJurisdiction: string;
  
  // Stakeholder accounts
  sellerAccountId: string;
  sellerName: string;
  affiliateAccountId?: string;
  affiliateCode?: string;
  affiliateName?: string;
  publisherAccountId?: string;
  publisherName?: string;
  
  // Status & Tracking
  status: SettlementStatus;
  paymentMethod: string;
  paymentRail: PaymentRail;
  paymentTransactionRef: string;
  isEscrowReleased: boolean;
  escrowReleaseDate?: string;
  
  // Double-Entry Ledger Linkage
  journalEntryId?: string;
  verificationMerkleHash: string;
  
  // Timestamps
  createdAt: string;
  settledAt?: string;
  refundedAt?: string;
}

// ----------------------------------------------------------------------------
// OMNI Ads Financial Entities
// ----------------------------------------------------------------------------
export interface AdsCampaignBudget {
  id: string;
  tenantId: string;
  advertiserAccountId: string;
  advertiserName: string;
  campaignTitle: string;
  budgetTotal: number;
  budgetSpent: number;
  budgetRemaining: number;
  currency: string;
  bidModel: 'cpc' | 'cpm' | 'cpa';
  targetAudience: string;
  status: 'active' | 'paused' | 'exhausted' | 'completed';
  totalImpressions: number;
  totalClicks: number;
  averageCpc: number;
  publisherEarningsTotal: number;
  creatorAdShareTotal: number;
  platformAdRevenueTotal: number;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Affiliate Link & Commission Record
// ----------------------------------------------------------------------------
export interface AffiliateLinkRecord {
  id: string;
  affiliateAccountId: string;
  affiliateName: string;
  affiliateCode: string;
  targetProductType: CommerceProductType;
  targetProductTitle: string;
  destinationUrl: string;
  commissionType: 'percentage' | 'flat_fee' | 'recurring';
  commissionRate: number; // e.g. 10 (%) or $15 (flat)
  totalClicks: number;
  totalConversions: number;
  totalGrossVolumeGenerated: number;
  totalCommissionEarned: number;
  status: 'active' | 'paused' | 'banned';
  createdAt: string;
}

export interface AffiliateCommissionItem {
  id: string;
  affiliateAccountId: string;
  affiliateName: string;
  affiliateCode: string;
  transactionId: string;
  orderNumber: string;
  productTitle: string;
  grossOrderAmount: number;
  commissionAmount: number;
  currency: string;
  status: AffiliateCommissionStatus;
  reversalReason?: string;
  approvedAt?: string;
  paidAt?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Subscription Financial Record
// ----------------------------------------------------------------------------
export interface CommerceSubscriptionRecord {
  id: string;
  tenantId: string;
  subscriberUserId: string;
  subscriberName: string;
  subscriberEmail: string;
  providerAccountId: string;
  providerName: string;
  planName: string;
  planType: 'creator_membership' | 'saas_tier' | 'course_cohort' | 'digital_pass';
  billingInterval: 'monthly' | 'quarterly' | 'annually';
  amountPerPeriod: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
  status: SubscriptionStatus;
  gracePeriodDays: number;
  gracePeriodEndsAt?: string;
  failedPaymentCount: number;
  totalCyclesBilled: number;
  totalLifetimeRevenue: number;
  autoRenew: boolean;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Payout Disbursement Request & Batch
// ----------------------------------------------------------------------------
export interface PayoutDisbursementItem {
  id: string;
  tenantId: string;
  recipientAccountId: string;
  recipientName: string;
  recipientRole: CommerceAccountRole;
  requestedAmount: number;
  payoutFee: number;
  netDisbursedAmount: number;
  currency: string;
  payoutRail: PayoutRailType;
  destinationDetails: string;
  status: PayoutStatus;
  batchReference?: string;
  externalProviderTxId?: string;
  errorMessage?: string;
  failureRetryCount: number;
  journalEntryId?: string;
  initiatedAt: string;
  processedAt?: string;
}

// ----------------------------------------------------------------------------
// Refund, Chargeback & Dispute Record
// ----------------------------------------------------------------------------
export interface CommerceRefundOrDispute {
  id: string;
  tenantId: string;
  originalTransactionId: string;
  orderNumber: string;
  buyerName: string;
  sellerAccountId: string;
  sellerName: string;
  type: 'partial_refund' | 'full_refund' | 'chargeback' | 'dispute_inquiry';
  originalAmount: number;
  refundAmount: number;
  sellerClawbackAmount: number;
  platformFeeRefundAmount: number;
  affiliateClawbackAmount: number;
  currency: string;
  status: 'pending_review' | 'approved_refunded' | 'dispute_won' | 'dispute_lost_charged_back' | 'rejected';
  reason: string;
  evidenceNotes?: string;
  journalEntryId?: string;
  createdAt: string;
  resolvedAt?: string;
}

// ----------------------------------------------------------------------------
// Super Admin Commerce Configuration
// ----------------------------------------------------------------------------
export interface SuperAdminCommerceConfig {
  isCommerceSettlementActive: boolean; // ACTIVE BY DEFAULT
  defaultPlatformMarketplaceFeeBps: number; // e.g. 1500 = 15.0%
  defaultPlatformAdsTakeRateBps: number; // e.g. 2500 = 25.0%
  defaultAffiliateCommissionBps: number; // e.g. 1000 = 10.0%
  defaultTaxReserveBps: number; // e.g. 500 = 5.0%
  standardEscrowHoldPeriodHours: number; // e.g. 72 hours (3 days)
  instantPayoutFeeBps: number; // e.g. 150 = 1.5%
  standardPayoutFeeFixedUsd: number; // $0.50
  gracePeriodMaxDays: number; // 7 days
  supportedCurrencies: string[];
  supportedCountries: string[];
  supportedPayoutRails: PayoutRailType[];
  autoSettlementCronSchedule: 'every_midnight_utc' | 'every_6_hours' | 'manual_only';
  riskAutoFreezeScoreThreshold: number; // 85+
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// AI Revenue & Sales Intelligence Insight (Read-Only)
// ----------------------------------------------------------------------------
export interface CommerceAiInsight {
  id: string;
  category: 'revenue_forecast' | 'cohort_performance' | 'tax_summary' | 'sales_optimization' | 'anomaly_detection';
  title: string;
  summary: string;
  projectedGrowthPercent: number;
  keyMetric: string;
  recommendedAction: string;
  confidenceScore: number;
  governanceGuardrailEnforced: boolean; // True: AI CANNOT alter rules or disburse funds
  generatedAt: string;
}

// ----------------------------------------------------------------------------
// Mission-Critical Commerce Settlement Test Scenario
// ----------------------------------------------------------------------------
export interface CommerceTestScenarioResult {
  id: string;
  name: string;
  category: string;
  description: string;
  passed: boolean;
  executionTimeMs: number;
  details: string;
  auditTrail: string[];
  createdJournalId?: string;
}
