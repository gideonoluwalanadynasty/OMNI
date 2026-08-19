export type FinanceTenantType =
  | 'personal'
  | 'family'
  | 'freelancer'
  | 'creator'
  | 'business'
  | 'merchant'
  | 'sme'
  | 'enterprise'
  | 'developer'
  | 'whitelabel_institution'
  | 'whitelabel_fintech'
  | 'government_ngo'
  | 'government'
  | 'ngo'
  | 'cooperative'
  | 'institution';

export type OmniAccountType =
  | 'personal'
  | 'family'
  | 'freelancer'
  | 'business'
  | 'sme'
  | 'enterprise'
  | 'merchant'
  | 'creator'
  | 'developer'
  | 'whitelabel_institution'
  | 'whitelabel_fintech'
  | 'government_ngo'
  | 'government'
  | 'ngo'
  | 'cooperative'
  | 'institution';

export type OmniWalletType =
  | 'personal'
  | 'family'
  | 'freelancer'
  | 'business'
  | 'merchant'
  | 'affiliate'
  | 'creator'
  | 'developer'
  | 'enterprise'
  | 'government_ngo'
  | 'government'
  | 'ngo'
  | 'cooperative'
  | 'institution';

export type AccountCategory = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type AccountType = 'checking' | 'savings' | 'treasury' | 'escrow' | 'settlement' | 'card_prepaid' | 'credit_line' | 'crypto_vault' | 'investment_portfolio' | 'tax_reserve';
export type PaymentRail = 'ach' | 'sepa' | 'swift' | 'fednow' | 'pix' | 'upi' | 'mpesa' | 'wire' | 'card_network' | 'omni_internal' | 'stablecoin_usdc' | 'crypto_l1';
export type PaymentDirection = 'inbound' | 'outbound' | 'internal_transfer';
export type TransactionStatus = 'completed' | 'pending' | 'processing' | 'posted' | 'settled' | 'failed' | 'cancelled' | 'reversed' | 'under_review' | 'disputed' | 'refunded' | 'held_for_approval';
export type ComplianceTier = 'tier_0_unverified' | 'tier_1_basic_kyc' | 'tier_2_verified_individual' | 'tier_3_enhanced_due_diligence' | 'tier_4_corporate_kyb' | 'tier_5_institutional_sovereign';
export type RiskLevel = 'very_low' | 'low' | 'moderate' | 'elevated' | 'high' | 'critical_block';
export type FeatureAvailabilityStatus = 'installed_active' | 'installed_disabled' | 'requires_kyb' | 'requires_licence' | 'provider_unavailable' | 'geo_restricted';

export interface FinanceTenant {
  id: string; // UUID
  name: string;
  slug: string;
  type: FinanceTenantType;
  accountType?: OmniAccountType;
  country: string;
  currency: string;
  jurisdiction: string;
  organizationId: string;
  ownerUserId: string;
  complianceTier: ComplianceTier;
  riskLevel: RiskLevel;
  parentTenantId?: string; // For subsidiaries & multi-entity structures
  isWhiteLabelTenant: boolean;
  whiteLabelConfig?: {
    brandName: string;
    logoUrl: string;
    customDomain: string;
    primaryColor: string;
    feeMarkupBps: number; // basis points e.g. 25 = 0.25%
    binRangePrefix: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FinancialProfile {
  id: string; // UUID
  tenantId: string;
  userId: string;
  omniPassportId: string;
  legalName: string;
  tradeName?: string;
  taxIdNumber?: string; // Masked e.g. ***-**-8492
  industryCategory?: string;
  verificationStatus: ComplianceTier;
  kycStatus: 'pending' | 'verified' | 'action_required' | 'rejected';
  kybStatus: 'not_applicable' | 'pending' | 'verified' | 'action_required' | 'rejected';
  preferredCurrencies: string[];
  financialPreferences: {
    autoSweepIdleYield: boolean;
    defaultSettlementRail: PaymentRail;
    roundingSavingsVault: boolean;
    automatedTaxWithholding: boolean;
    privacyMaskBalances: boolean;
    realtimeNotifications: boolean;
  };
  transactionPermissions: string[];
  riskProfile: {
    overallScore: number; // 0-100 (higher = riskier)
    level: RiskLevel;
    amlSanctionsPass: boolean;
    pepScreeningPass: boolean;
    fatcaCrsCompliant: boolean;
    creditScoreIndex: number;
    velocityTier: 'standard' | 'accelerated' | 'institutional';
  };
  accountRelationships: {
    accountId: string;
    accountName: string;
    relationshipRole: 'primary_owner' | 'joint_holder' | 'beneficiary' | 'authorized_signatory' | 'delegate';
    legalEntityName: string;
  }[];
  businessRelationships: {
    organizationId: string;
    organizationName: string;
    relationshipRole: 'director' | 'ubo_beneficial_owner' | 'cfo_treasurer' | 'authorized_signatory';
    ownershipPercentage: number;
  }[];
  financialActivitySummary: {
    total30dVolumeUsd: number;
    allTimeThroughputUsd: number;
    disputeRatePercent: number;
    activeWalletsCount: number;
    averageTxSizeUsd: number;
    totalTransactionsCount: number;
  };
  annualVolumeEstimateUsd: number;
  twoFactorEnforced: boolean;
  lastRiskAssessmentDate: string;
}

export interface FinanceCurrencyRegistryItem {
  code: string; // USD, EUR, GBP, NGN, GHS, KES, ZAR, CAD, AUD, INR, JPY, CHF, SGD, BRL, AED, USDC, BTC, ETH
  country: string;
  countryCode: string;
  name: string;
  symbol: string;
  decimalRules: number;
  isFiat: boolean;
  isStablecoin: boolean;
  isActive: boolean;
  provider: string;
  settlementRailDefault: PaymentRail;
  settlementRules: {
    standardLatency: string;
    cutOffTimeUtc: string;
    instantEligible: boolean;
    clearingRailName: string;
  };
  exchangeAvailability: {
    canBuy: boolean;
    canSell: boolean;
    canHold: boolean;
    minSwapUsd: number;
    maxSwapUsd: number;
  };
  icon: string;
}

export type FinanceCurrency = FinanceCurrencyRegistryItem;

export interface FinanceCurrencyRate {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  spotRate: number;
  bid: number;
  ask: number;
  spreadBps: number;
  change24hPercent: number;
  updatedAt: string;
}

export interface FinancialAccount {
  id: string; // UUID
  tenantId: string;
  accountNumber: string; // e.g. OMNI-US-892147102
  accountName: string;
  accountType: AccountType;
  category: AccountCategory;
  currency: string;
  balance: number;
  availableBalance: number;
  reservedBalance: number;
  creditLimit?: number;
  routingDetails: {
    routingNumber?: string;
    swiftBic?: string;
    iban?: string;
    sortCode?: string;
    pixKey?: string;
    upiVpa?: string;
    walletAddress?: string;
  };
  status: 'active' | 'frozen' | 'restricted' | 'closed';
  isVirtual: boolean;
  glAccountCode: string; // General Ledger Code e.g. "1010-CASH-OPERATING"
  createdAt: string;
}

export interface MultiCurrencyWalletBalance {
  currency: string;
  available: number;
  pending: number;
  reserved: number;
  blocked: number;
  usdEquivalent: number;
}

export interface FinanceWallet {
  id: string; // UUID
  tenantId: string;
  name: string;
  walletType: OmniWalletType;
  primaryCurrency: string;
  availableBalance: number;
  pendingBalance: number;
  reservedBalance: number;
  blockedBalance: number;
  totalUsdEquivalent: number;
  balances?: {
    currency: string;
    amount: number;
    usdValue: number;
  }[];
  multiCurrencyBalances: MultiCurrencyWalletBalance[];
  owner: {
    userId: string;
    name: string;
    email: string;
    passportId: string;
    role: string;
  };
  permissions: string[]; // e.g. ['wallet.view', 'wallet.transfer', 'wallet.withdraw', 'wallet.manage', 'wallet.freeze']
  transactionLimits: {
    perTxLimit: number;
    dailyLimit: number;
    monthlyLimit: number;
    spentToday: number;
    remainingToday: number;
  };
  securityStatus: {
    isFrozen: boolean;
    debitRestricted: boolean;
    creditRestricted: boolean;
    approvalRequiredAboveUsd: number;
    suspiciousFlagged: boolean;
    freezeReason?: string;
    lastSecurityEvent?: string;
  };
  vaultSavingsLocked: number;
  yieldEarnedTotal: number;
  autoRebalanceEnabled: boolean;
  isDefault: boolean;
  createdAt: string;
}

export interface ExternalAccountAdapter {
  id: string;
  tenantId: string;
  adapterType: 'plaid' | 'open_banking_uk_eu' | 'african_open_banking' | 'direct_fednow_ach' | 'payment_gateway_stripe' | 'crypto_custody_circle';
  institutionName: string;
  accountName: string;
  accountNumberMasked: string;
  routingNumberMasked?: string;
  currency: string;
  balance: number;
  status: 'connected' | 'action_required' | 'disconnected' | 'syncing';
  supportedOperations: ('instant_deposit' | 'ach_debit' | 'payout' | 'balance_sync' | 'statement_fetch')[];
  lastSyncTimestamp: string;
  logoUrl?: string;
}

export interface FinancialRbacRole {
  roleKey: string;
  roleName: string;
  category: 'personal' | 'business' | 'enterprise';
  description: string;
  permissions: string[];
}

export interface FinanceSecurityTestResult {
  testId: string;
  name: string;
  category: 'tenancy_isolation' | 'authorization_rbac' | 'balance_integrity' | 'precision_currency' | 'concurrency_idempotency';
  status: 'passed' | 'failed' | 'running';
  executionMs: number;
  logOutput: string[];
  assertionDetails: string;
  timestamp: string;
}

export type LedgerAccountRole =
  | 'general'
  | 'clearing'
  | 'settlement'
  | 'suspense'
  | 'fee'
  | 'tax'
  | 'revenue'
  | 'refund'
  | 'expense'
  | 'equity'
  | 'asset'
  | 'liability';

export interface FinanceLedgerAccount {
  id: string; // UUID
  tenantId: string;
  glCode: string; // e.g., 1010, 2010, 4010
  name: string;
  category: AccountCategory;
  accountRole?: LedgerAccountRole;
  normalBalance: 'debit' | 'credit';
  currentBalance: number;
  currency: string;
  parentGlCode?: string;
  isActive: boolean;
  isSystemProtected?: boolean; // System clearing/suspense accounts cannot be deleted
  description?: string;
}

export interface FinanceLedgerPosting {
  id: string;
  journalEntryId: string;
  ledgerAccountId: string;
  glCode: string;
  accountName: string;
  entryType: 'debit' | 'credit';
  amount: number;
  currency: string;
  minorUnits?: number; // Integer precision minor units (e.g. cents)
  fxRateToBase: number;
  baseAmountUsd: number;
  memo?: string;
}

export interface FinanceJournalEntry {
  id: string; // UUID
  tenantId: string;
  entryNumber: string; // JE-2026-08-0041
  timestamp: string;
  description: string;
  sourceModule: 'payments' | 'invoicing' | 'payroll' | 'fx' | 'treasury' | 'manual_adjustment' | 'reconciliation' | 'fee_collection' | 'reversal' | 'refund';
  sourceReferenceId: string;
  postings: FinanceLedgerPosting[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
  verificationMerkleHash: string; // Cryptographic integrity proof
  previousMerkleHash?: string; // Blockchain-style chained integrity
  postedByUserId: string;
  status: 'posted' | 'reversed' | 'voided';
  reversedByJournalEntryId?: string; // Pointer to reversal JE
  reversesJournalEntryId?: string; // Pointer to original JE if this is a reversal
  reversalReason?: string;
}

export interface FinanceTransaction {
  id: string; // UUID
  tenantId: string;
  accountId: string;
  type: 'payment' | 'transfer' | 'fx_swap' | 'invoice_settle' | 'payroll_disbursement' | 'card_swipe' | 'fee' | 'interest_yield' | 'escrow_lock' | 'tax_withhold';
  direction: PaymentDirection;
  amount: number;
  currency: string;
  usdEquivalent: number;
  feeAmount: number;
  feeCurrency: string;
  exchangeRate?: number;
  sourceInstrument: string; // e.g. "US Checking (...4810)", "Virtual Card #9021"
  counterpartyName: string;
  counterpartyAccountOrHandle: string;
  rail: PaymentRail;
  status: TransactionStatus;
  category: 'operational' | 'vendor_payout' | 'saas_subscription' | 'payroll' | 'marketing' | 'tax' | 'treasury_rebalance' | 'personal_lifestyle';
  memo?: string;
  tags: string[];
  referenceNumber: string;
  journalEntryId?: string;
  riskScore: number; // 0 - 100
  createdAt: string;
  settledAt?: string;
}

export interface FinancePayment {
  id: string; // UUID
  tenantId: string;
  amount: number;
  currency: string;
  senderAccountId: string;
  recipientBeneficiaryId: string;
  recipientName: string;
  recipientIdentifier: string;
  rail: PaymentRail;
  status: TransactionStatus;
  estimatedSettlementTime: string;
  idempotencyKey: string;
  complianceChecked: boolean;
  purposeCode: string; // e.g. "COMMERCIAL_TRADE", "SALARY", "CONSULTING_SERVICES"
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface FinanceTransfer {
  id: string;
  tenantId: string;
  fromAccountId: string;
  toAccountId: string;
  fromCurrency: string;
  toCurrency: string;
  sourceAmount: number;
  destinationAmount: number;
  appliedFxRate: number;
  fee: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface FinanceBeneficiary {
  id: string;
  tenantId: string;
  name: string;
  nickname?: string;
  email?: string;
  beneficiaryType: 'individual' | 'business' | 'contractor' | 'government_agency';
  country: string;
  currency: string;
  preferredRail: PaymentRail;
  routingDetails: {
    accountNumber?: string;
    routingNumber?: string;
    iban?: string;
    swiftBic?: string;
    walletAddress?: string;
    pixKey?: string;
    upiVpa?: string;
  };
  isVerified: boolean;
  kycPassed: boolean;
  createdAt: string;
}

export interface FinanceProvider {
  id: string;
  name: string;
  type: 'banking_as_a_service' | 'card_issuing' | 'fx_liquidity' | 'crypto_custody' | 'payment_gateway' | 'identity_kyc' | 'tax_engine';
  supportedRails: PaymentRail[];
  status: 'operational' | 'degraded' | 'maintenance' | 'offline';
  uptime90d: number;
  avgLatencyMs: number;
  region: string;
  apiUrl: string;
  activeTenantsCount: number;
  settlementSpeed: string; // e.g. "Real-Time (<2s)", "T+0", "T+1"
}

export interface FinanceProviderEvent {
  id: string;
  providerId: string;
  eventType: string; // e.g. "payment.captured", "charge.dispute.created", "kyc.cleared"
  status: 'processed' | 'queued' | 'failed';
  payloadSummary: string;
  timestamp: string;
}

export interface FinanceSettlement {
  id: string;
  tenantId: string;
  providerId: string;
  batchNumber: string;
  grossAmount: number;
  netAmount: number;
  totalFees: number;
  currency: string;
  transactionsCount: number;
  rail: PaymentRail;
  status: 'settled' | 'in_transit' | 'scheduled';
  settlementDate: string;
}

export interface FinanceFee {
  id: string;
  tenantId?: string; // If empty, platform standard
  feeCode: string;
  name: string;
  calculationType: 'flat' | 'percentage' | 'hybrid';
  flatAmount?: number;
  percentageBps?: number; // e.g. 150 = 1.50%
  currency: string;
  applicableRail: PaymentRail | 'all';
  isActive: boolean;
}

export interface FinanceTaxRecord {
  id: string;
  tenantId: string;
  jurisdictionCode: string; // US_NY, EU_DE, GB_ENG, JP_TYO, etc.
  taxType: 'vat' | 'sales_tax' | 'corporate_income' | 'payroll_withholding' | 'cross_border_withholding';
  ratePercentage: number;
  taxableBaseAmount: number;
  calculatedTaxAmount: number;
  currency: string;
  referenceTransactionId: string;
  filingPeriod: string; // "2026-Q3"
  isRemitted: boolean;
  remittedAt?: string;
}

export interface FinanceLimit {
  id: string;
  tenantId: string;
  scope: 'per_transaction' | 'daily_velocity' | 'monthly_aggregate' | 'cross_border_single' | 'crypto_withdrawal';
  currency: string;
  limitAmount: number;
  currentConsumedAmount: number;
  resetInterval: 'instant' | 'daily' | 'monthly';
  enforcementAction: 'hard_block' | 'require_mfa_approval' | 'require_dual_signoff' | 'flag_for_compliance';
  overrideAllowed: boolean;
}

export interface FinanceApprovalRule {
  id: string;
  tenantId: string;
  name: string;
  triggerCondition: {
    minAmountUsd: number;
    destinationType?: 'any' | 'new_beneficiary' | 'foreign_country' | 'crypto_address';
    rail?: PaymentRail | 'all';
  };
  requiredApproversCount: number;
  eligibleRoles: ('owner' | 'admin' | 'treasurer' | 'cfo' | 'compliance_officer')[];
  autoEscalationHours: number;
  isActive: boolean;
}

export interface FinanceApprovalRequest {
  id: string;
  tenantId: string;
  ruleId: string;
  transactionId?: string;
  requestType: 'outbound_payment' | 'fx_hedging_order' | 'payroll_release' | 'limit_increase' | 'beneficiary_whitelist';
  title: string;
  amount: number;
  currency: string;
  requestedByUserId: string;
  requestedByUserName: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  approvedBy: { userId: string; userName: string; timestamp: string; ipHash: string }[];
  comments?: string;
}

export interface FinanceComplianceProfile {
  id: string;
  tenantId: string;
  kycLevel: ComplianceTier;
  amlSanctionsStatus: 'clear' | 'potential_hit' | 'confirmed_match' | 'false_positive_cleared';
  sarReportCount: number;
  travelRuleThresholdUsd: number;
  lastAmlAuditTimestamp: string;
  jurisdictionRules: {
    country: string;
    requiresInvoiceAttachment: boolean;
    taxWithholdingRate: number;
    cryptoReportingThresholdUsd: number;
  };
  kybDocumentsAttached: string[];
}

export interface FinanceRiskProfile {
  id: string;
  tenantId: string;
  overallScore: number; // 0-100 (higher = riskier)
  velocityRisk: 'low' | 'medium' | 'high';
  geoRisk: 'low' | 'medium' | 'high';
  chargebackRatePercent: number;
  fraudAlertsTriggered30d: number;
  remedialActions: string[];
  automatedHoldTriggers: string[];
}

export interface FinanceAuditRecord {
  id: string;
  tenantId: string;
  timestamp: string;
  actorUserId: string;
  actorRole: string;
  action: string;
  resourceType: 'ledger_entry' | 'payment' | 'account' | 'feature_flag' | 'approval' | 'compliance_override' | 'tax_filing';
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  integritySignature: string; // SHA-256 / Dilithium signature
  details: Record<string, any>;
}

export interface FinanceFeatureFlag {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'core' | 'payments' | 'treasury' | 'lending' | 'compliance' | 'developer' | 'whitelabel';
  isInstalled: boolean;
  isOperational: boolean; // Depends on licenses & provider active status
  operationalReason?: string;
  supportedCountries: string[]; // ['*'] for all, or specific ['US', 'EU', 'GB']
  allowedTenantTypes: FinanceTenantType[];
  minComplianceTierRequired: ComplianceTier;
  regulatedActivity: boolean;
  requiredProviderType?: string;
}

export interface VirtualCard {
  id: string;
  tenantId: string;
  cardholderName: string;
  lastFour: string;
  expiry: string;
  cardType: 'virtual_single_use' | 'virtual_subscription' | 'physical_corporate';
  network: 'visa' | 'mastercard';
  spendingLimitMonthly: number;
  spentCurrentMonth: number;
  currency: string;
  status: 'active' | 'paused' | 'terminated';
  allowedMerchantCategories: string[];
  linkedAccountId: string;
}

export interface PayrollRun {
  id: string;
  tenantId: string;
  payPeriod: string; // "Aug 1 - Aug 15, 2026"
  totalGrossPay: number;
  totalTaxesWithheld: number;
  totalNetDisbursement: number;
  currency: string;
  employeesCount: number;
  status: 'draft' | 'pending_approval' | 'funding_locked' | 'disbursed';
  scheduledDisbursementDate: string;
  directDepositRail: PaymentRail;
}

export interface ExpenseItem {
  id: string;
  tenantId: string;
  submitterName: string;
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  receiptUrl?: string;
  ocrConfidence: number; // 0 - 100
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  submittedAt: string;
  cardId?: string;
}

export interface SmartInvoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  lineItems: { description: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'issued' | 'viewed' | 'partially_paid' | 'paid' | 'overdue' | 'factored';
  isFactored: boolean; // Instant liquidity factoring advance
  advanceOfferedAmount?: number;
  paymentLink: string;
}

export interface TreasuryPool {
  id: string;
  tenantId: string;
  poolName: string;
  totalDepositedUsd: number;
  currentYieldApyPercent: number;
  riskStrategy: 'conservative_tbills' | 'sovereign_bonds' | 'overnight_repo' | 'defi_prime_lending';
  rebalanceFrequency: 'daily_auto' | 'weekly' | 'manual';
  liquidityTierBufferUsd: number;
  allocatedEntities: { entityName: string; sharePercent: number }[];
}

export interface FinanceAiInsight {
  id: string;
  type: 'cashflow_forecast' | 'fraud_warning' | 'fx_optimization' | 'tax_deduction' | 'treasury_rebalance' | 'dunning_alert';
  severity: 'info' | 'positive' | 'warning' | 'critical';
  headline: string;
  detail: string;
  suggestedActionTitle: string;
  potentialBenefitUsd?: number;
  confidenceScore: number;
  createdAt: string;
}

export interface PostingRule {
  id: string;
  ruleCode: string;
  name: string;
  triggerEventType: string;
  description: string;
  debitGl: string;
  creditGl: string;
  feeDebitGl?: string;
  feeCreditGl?: string;
  taxDebitGl?: string;
  taxCreditGl?: string;
  isActive: boolean;
}

export interface LedgerReconciliationDiscrepancy {
  id: string;
  type: 'missing_entry' | 'duplicate_entry' | 'balance_mismatch' | 'settlement_diff';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  sourceReference: string;
  glAccountCode: string;
  discrepancyAmountUsd: number;
  detectedAt: string;
  resolved: boolean;
  resolutionAction?: string;
}

export interface LedgerReconciliationSession {
  id: string;
  tenantId: string;
  timestamp: string;
  status: 'balanced' | 'discrepancies_detected' | 'investigating';
  totalEntriesChecked: number;
  totalDebitsUsd: number;
  totalCreditsUsd: number;
  imbalanceUsd: number;
  merkleChainIntegrity: 'valid' | 'corrupted';
  discrepancies: LedgerReconciliationDiscrepancy[];
}

export interface BankReconciliationItem {
  id: string;
  bankTxId: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  direction: 'inbound' | 'outbound';
  status: 'matched' | 'unmatched' | 'adjusted';
  matchedJournalEntryId?: string;
  matchedGlCode?: string;
  confidenceScore: number;
}

export interface BankReconciliationSession {
  id: string;
  tenantId: string;
  glAccountCode: string;
  statementPeriod: string;
  bankName: string;
  bankClosingBalance: number;
  ledgerClosingBalance: number;
  unreconciledDifference: number;
  status: 'fully_reconciled' | 'pending_review' | 'action_required';
  items: BankReconciliationItem[];
}

export interface LedgerAdjustmentRequest {
  id: string;
  tenantId: string;
  journalEntryId?: string;
  entryNumber?: string;
  reason: string;
  category: 'correction' | 'accrual' | 'reclassification' | 'write_off' | 'suspense_allocation';
  debitGl: string;
  creditGl: string;
  amount: number;
  currency: string;
  requestedByUserId: string;
  requestedByName: string;
  requestedAt: string;
  status: 'pending_approval' | 'approved' | 'rejected';
  approverUserId?: string;
  approverName?: string;
  approvedAt?: string;
  rejectionReason?: string;
  auditMerkleProof: string;
}

export interface IdempotencyRecord {
  key: string;
  tenantId: string;
  operationType: string;
  requestFingerprint: string;
  responseStatus: number;
  responsePayload: any;
  createdAt: string;
  expiresAt: string;
}

export interface TrialBalanceRow {
  glCode: string;
  name: string;
  category: AccountCategory;
  accountRole: LedgerAccountRole;
  normalBalance: 'debit' | 'credit';
  currency: string;
  debitBalance: number;
  creditBalance: number;
  netBalance: number;
  isBalanced: boolean;
}

export interface GeneralLedgerReportRow {
  postingId: string;
  entryNumber: string;
  timestamp: string;
  description: string;
  sourceModule: string;
  sourceReferenceId: string;
  glCode: string;
  accountName: string;
  debit: number;
  credit: number;
  runningBalance: number;
  currency: string;
  merkleHash: string;
}

export interface IncomeStatementReport {
  reportingPeriod: string;
  currency: string;
  revenueItems: { glCode: string; name: string; amount: number }[];
  totalRevenue: number;
  directRailFeeItems: { glCode: string; name: string; amount: number }[];
  totalDirectCosts: number;
  grossProfit: number;
  operatingExpenseItems: { glCode: string; name: string; amount: number }[];
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  grossMarginPercent: number;
  netMarginPercent: number;
}

export interface FeeReportSummary {
  period: string;
  totalPlatformFeesUsd: number;
  totalRailNetworkFeesUsd: number;
  totalFxSpreadRevenueUsd: number;
  totalFactoringFeesUsd: number;
  totalGasAndCryptoFeesUsd: number;
  netFeeMarginUsd: number;
  feeCount: number;
  railFeeBreakdown: { rail: PaymentRail; totalVolumeUsd: number; feeIncurredUsd: number; effectiveBps: number }[];
}

export interface SettlementBatchReport {
  batchId: string;
  tenantId: string;
  rail: PaymentRail;
  provider: string;
  grossVolumeUsd: number;
  totalFeesDeductedUsd: number;
  netDisbursedUsd: number;
  currency: string;
  transactionCount: number;
  clearingAccountId: string;
  settlementAccountId: string;
  status: 'settled' | 'in_transit' | 'scheduled';
  settledAt: string;
}

// ============================================================================
// OMNI ENTERPRISE TREASURY & FINANCIAL OPERATIONS PLATFORM TYPES
// ============================================================================

export type EnterpriseEntityType =
  | 'parent_holding'
  | 'subsidiary'
  | 'regional_branch'
  | 'special_purpose_vehicle'
  | 'joint_venture'
  | 'treasury_center'
  | 'shared_services';

export interface EnterpriseLegalEntity {
  id: string;
  code: string; // e.g. ENT-HQ-001
  name: string;
  legalRegistrationName: string;
  entityType: EnterpriseEntityType;
  jurisdiction: string; // e.g. 'United States - Delaware'
  countryCode: string; // 'US', 'GB', 'SG', 'DE', 'AE', 'NG'
  taxIdentifier: string; // Masked Tax ID
  functionalCurrency: string; // USD, EUR, GBP, SGD, etc.
  reportingCurrency: string;
  ownershipPercent: number; // 100% for wholly-owned, 51%+ for majority
  parentEntityId?: string;
  treasuryPoolId?: string;
  status: 'active' | 'under_audit' | 'dormant';
  totalLiquidityUsd: number;
  totalOperatingCashUsd: number;
  totalPayablesUsd: number;
  totalReceivablesUsd: number;
  activeAccountsCount: number;
  intercompanyCreditRating: 'AAA' | 'AA+' | 'A' | 'BBB';
  kybStatus: 'verified' | 'pending' | 'review_required';
  createdAt: string;
}

export interface EnterpriseDepartment {
  id: string;
  entityId: string;
  code: string; // e.g. DEP-FIN-01
  name: string;
  leadName: string;
  leadEmail: string;
  headcount: number;
  annualBudgetUsd: number;
  spentToDateUsd: number;
}

export interface EnterpriseCostCentre {
  id: string;
  entityId: string;
  departmentId: string;
  code: string; // e.g. CC-7020-ENG
  name: string;
  managerName: string;
  annualBudgetUsd: number;
  spentToDateUsd: number;
  committedPoUsd: number;
  status: 'active' | 'frozen' | 'closed';
}

export interface EnterpriseProject {
  id: string;
  entityId: string;
  costCentreId: string;
  code: string; // e.g. PRJ-2026-CLOUD
  name: string;
  projectType: 'capex' | 'opex' | 'rd_initiative' | 'strategic_m_and_a';
  budgetUsd: number;
  spentUsd: number;
  forecastUsd: number;
  variancePercent: number;
  startDate: string;
  endDate: string;
  projectLead: string;
  status: 'planning' | 'active' | 'review' | 'completed' | 'on_hold';
}

export interface EnterpriseCashPosition {
  entityId: string;
  entityName: string;
  currency: string;
  operatingBalance: number;
  yieldVaultBalance: number;
  clearingBalance: number;
  escrowBalance: number;
  taxReserveBalance: number;
  totalUsdEquivalent: number;
  effectiveApy: number;
  lastReconciledAt: string;
}

export interface EnterpriseCashForecast {
  period: '30d' | '60d' | '90d' | '180d' | '365d';
  generatedAt: string;
  baselineInflowsUsd: number;
  baselineOutflowsUsd: number;
  netCashflowUsd: number;
  projectedClosingCashUsd: number;
  optimisticCashUsd: number;
  stressTestCashUsd: number;
  dailyTimeline: {
    date: string;
    projectedInflowUsd: number;
    projectedOutflowUsd: number;
    closingLiquidityUsd: number;
    status: 'safe' | 'tight' | 'buffer_warning';
  }[];
  aiAdvisoryNotes: string[];
  riskAlerts: string[];
}

export interface EnterpriseLiquidityPool {
  id: string;
  name: string;
  leadEntityId: string;
  leadEntityName: string;
  participatingEntityIds: string[];
  poolType: 'physical_sweep' | 'notional_pooling' | 'zero_balance_account';
  targetBalanceUsd: number;
  currentBalanceUsd: number;
  currency: string;
  interestOptimizationRate: number; // e.g. 5.12%
  autoSweepFrequency: 'real_time_eod' | 'twice_daily' | 'weekly';
  autoSweepEnabled: boolean;
  minSweepThresholdUsd: number;
  lastSweepAt: string;
}

export interface InternalTransferRequest {
  id: string;
  referenceNumber: string;
  fromEntityId: string;
  fromEntityName: string;
  fromAccountId: string;
  toEntityId: string;
  toEntityName: string;
  toAccountId: string;
  amount: number;
  currency: string;
  usdEquivalent: number;
  transferType: 'intercompany_loan' | 'management_chargeback' | 'capital_injection' | 'dividend' | 'zero_balance_sweep';
  interestRatePa?: number; // e.g. 4.25% SOFR-linked
  agreementReference: string;
  justification: string;
  status: 'pending_approval' | 'approved' | 'executed' | 'settled';
  createdAt: string;
  executedAt?: string;
  merkleAuditHash: string;
}

export interface IntercompanyTransaction {
  id: string;
  referenceNumber: string;
  originEntityId: string;
  originEntityName: string;
  counterpartyEntityId: string;
  counterpartyEntityName: string;
  transactionType: 'trade_service' | 'loan_advance' | 'interest_payment' | 'ip_royalty' | 'cost_sharing';
  amount: number;
  currency: string;
  usdEquivalent: number;
  transferPriceMarginBps: number; // e.g. 35 bps
  armLengthBasis: string; // e.g. 'OECD Transfer Pricing Guidelines - Cost Plus 5%'
  agreementDocHash: string;
  status: 'pending' | 'netted' | 'settled' | 'eliminated';
  originGlDebit: string;
  originGlCredit: string;
  counterGlDebit: string;
  counterGlCredit: string;
  doubleEntryJournalId?: string;
  eliminationJournalId?: string;
  createdAt: string;
  settledAt?: string;
}

export interface IntercompanyNettingMatrix {
  settlementCycleId: string;
  cycleDate: string;
  entities: {
    entityId: string;
    entityName: string;
    grossPayablesUsd: number;
    grossReceivablesUsd: number;
    netPositionUsd: number; // positive = net receiver, negative = net payer
    settlementCurrency: string;
  }[];
  totalGrossVolumeUsd: number;
  netSettlementRequiredUsd: number;
  fxSavingsBps: number;
  totalSavedUsd: number;
  status: 'calculated' | 'settled' | 'eliminated_in_ledger';
}

export interface CorporatePaymentItem {
  id: string;
  recipientName: string;
  recipientAccountOrIban: string;
  bankSwiftBic: string;
  amount: number;
  currency: string;
  purposeCode: string;
  invoiceRef?: string;
  departmentCode: string;
  riskScore: number;
  status: 'queued' | 'cleared' | 'flagged' | 'failed';
}

export interface CorporatePaymentBatch {
  id: string;
  batchReference: string;
  entityId: string;
  entityName: string;
  batchType: 'supplier' | 'bulk_disbursement' | 'payroll' | 'tax_statutory' | 'cross_border_fx';
  description: string;
  totalAmountUsd: number;
  itemCount: number;
  paymentRail: PaymentRail;
  targetCurrency: string;
  makerUserId: string;
  makerName: string;
  approverUserIds: string[];
  status: 'draft' | 'pending_approval' | 'processing' | 'settled' | 'flagged_risk';
  items: CorporatePaymentItem[];
  createdAt: string;
  scheduledExecutionTime?: string;
  settledAt?: string;
  merkleAuditHash: string;
}

export interface EnterpriseApprovalWorkflowStep {
  stepNumber: number;
  roleRequired: string;
  userAssigned?: string;
  assignedUserName?: string;
  status: 'pending' | 'approved' | 'rejected' | 'delegated';
  actionTimestamp?: string;
  comment?: string;
  isEscalated?: boolean;
}

export interface EnterpriseApprovalRequest {
  id: string;
  title: string;
  itemType: 'payment_batch' | 'intercompany_loan' | 'budget_amendment' | 'fx_hedging_contract' | 'policy_change';
  referenceId: string;
  amountUsd: number;
  currency: string;
  requestingEntityId: string;
  requestingEntityName: string;
  requestingUserId: string;
  requestingUserName: string;
  department: string;
  riskTier: RiskLevel;
  workflowType: 'sequential' | 'parallel' | 'four_eyes' | 'six_eyes';
  currentStep: number;
  totalSteps: number;
  steps: EnterpriseApprovalWorkflowStep[];
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  autoEscalateAt: string;
  delegationNote?: string;
  auditProofHash: string;
  createdAt: string;
}

export interface EnterpriseBudget {
  id: string;
  entityId: string;
  entityName: string;
  fiscalYear: number;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY_TOTAL';
  department: string;
  costCentreCode: string;
  category: 'opex' | 'capex';
  allocatedBudgetUsd: number;
  committedPoUsd: number;
  actualSpendUsd: number;
  forecastSpendUsd: number;
  varianceUsd: number; // allocated - (actual + committed)
  variancePercent: number;
  status: 'on_track' | 'warning_approaching' | 'over_budget';
}

export interface CurrencyExposureItem {
  currency: string;
  flagEmoji: string;
  totalAssetsLocal: number;
  totalLiabilitiesLocal: number;
  netExposureLocal: number;
  netExposureUsd: number;
  currentSpotRate: number;
  hedgedAmountUsd: number;
  hedgeRatioPercent: number;
  unhedgedUsd: number;
  var95Usd: number; // Value-at-Risk 95% 1-day
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  recommendedHedgeAction: string;
}

export interface TreasuryRiskAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  category: 'fx_exposure' | 'liquidity_buffer' | 'payment_concentration' | 'unusual_anomaly' | 'counterparty_limit';
  entityId: string;
  entityName: string;
  title: string;
  description: string;
  metricValue: string;
  thresholdLimit: string;
  suggestedRemediation: string;
  timestamp: string;
  resolved: boolean;
}

export interface TreasuryAiAdvisory {
  id: string;
  title: string;
  category: 'liquidity_optimization' | 'fx_hedging' | 'working_capital' | 'yield_harvesting' | 'intercompany_netting';
  impactSummaryUsd: number;
  confidenceScore: number; // e.g. 94%
  rationale: string;
  actionPlan: string[];
  isAdvisoryOnly: true;
  generatedTimestamp: string;
}

export interface EnterpriseAuditTrailRecord {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  entityId: string;
  entityName: string;
  action: string;
  targetType: string;
  targetId: string;
  ipAddress: string;
  mfaVerified: boolean;
  previousStateDigest: string;
  newStateDigest: string;
  merkleProofHash: string;
}

// ============================================================================
// OMNI FINANCE AI INTELLIGENCE LAYER TYPES (PROMPT 9)
// ============================================================================

export type FinanceAiAgentType =
  | 'personal_finance'
  | 'cfo'
  | 'treasury'
  | 'compliance'
  | 'reconciliation'
  | 'fraud_intelligence'
  | 'financial_research';

export interface FinanceAiAgent {
  id: string;
  name: string;
  code: FinanceAiAgentType;
  title: string;
  description: string;
  targetAudience: string;
  status: 'active' | 'inactive' | 'rate_limited' | 'disabled';
  model: string; // e.g. 'gemini-3.7-flash', 'gemini-3.1-pro-preview'
  capabilities: string[];
  forbiddenActions: string[];
  supportedContexts: string[];
  totalRequestsHandled: number;
  avgLatencyMs: number;
  accuracyRating: number; // e.g. 99.4%
  isAutonomousExecutionBlocked: true; // Hard security policy
  lastActive: string;
  version: string;
}

export interface PersonalFinanceMemoryItem {
  id: string;
  userId: string;
  category: 'financial_goal' | 'spending_preference' | 'budget_style' | 'savings_target' | 'preferred_currency' | 'life_event' | 'custom_note';
  key: string;
  value: string;
  confidence: number;
  lastUpdated: string;
  isUserEditable: boolean;
  isAutoLearned: boolean;
  isArchived: boolean;
}

export interface PersonalFinanceMemorySettings {
  userId: string;
  isMemoryEnabled: boolean;
  allowAutoLearning: boolean;
  retentionDays: number;
  shareAcrossFamilyGroup: boolean;
  redactPiiOnStorage: boolean;
}

export interface CfoAiReport {
  id: string;
  reportType: 'executive_summary' | 'management_pnl' | 'cash_flow_forecast' | 'margin_analysis' | 'board_commentary' | 'receivables_aging_breakdown';
  title: string;
  period: string;
  targetAudience: 'ceo' | 'board' | 'dept_manager' | 'auditor';
  scopeLevel: 'group_wide' | 'department_only' | 'project_only';
  departmentName?: string;
  kpis: {
    name: string;
    value: string;
    delta: string;
    status: 'positive' | 'neutral' | 'negative';
  }[];
  aiExecutiveCommentary: string;
  strategicRecommendations: string[];
  citedDataSources: string[];
  generatedAt: string;
}

export interface ComplianceAiCaseSummary {
  id: string;
  caseNumber: string;
  entityName: string;
  jurisdiction: string;
  riskTier: 'low' | 'medium' | 'high' | 'prohibited';
  caseType: 'kyc_review' | 'kyb_onboarding' | 'sanctions_screening' | 'pep_match' | 'adverse_media' | 'sar_investigation';
  executiveSummary: string;
  missingDocuments: string[];
  suspiciousIndicators: string[];
  suggestedQuestions: string[];
  regulatoryCitations: string[];
  status: 'under_review' | 'escalated_to_mlro' | 'pending_user_docs' | 'recommended_closure';
  isAdvisoryOnly: true;
  reviewedTimestamp: string;
}

export interface ReconciliationMatchItem {
  id: string;
  batchId: string;
  bankRecord: {
    date: string;
    amount: number;
    currency: string;
    description: string;
    reference: string;
    bankAccount: string;
  };
  ledgerRecord?: {
    journalId: string;
    accountCode: string;
    accountName: string;
    amount: number;
    description: string;
    date: string;
  };
  matchConfidence: number; // 0-100%
  matchStatus: 'exact_match' | 'probable_match' | 'unmatched_bank' | 'unmatched_ledger' | 'potential_duplicate' | 'timing_difference';
  aiRationale: string;
  suggestedAdjustment: string;
  requiresHumanApproval: true;
  approvedBy?: string;
  appliedAt?: string;
}

export interface FraudIntelligenceAlert {
  id: string;
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  riskScore: number; // 0-100
  riskLevel: 'low' | 'elevated' | 'high' | 'severe';
  anomalyFactors: {
    factor: string;
    riskWeight: number;
    description: string;
  }[];
  deviceSignals: {
    ipLocation: string;
    isVpnOrProxy: boolean;
    deviceFingerprintMatch: boolean;
    velocityAlert: boolean;
  };
  behavioralPattern: string;
  investigationSummary: string;
  recommendedMitigation: string;
  humanDecision: 'pending' | 'cleared' | 'flagged_for_review' | 'blocked_by_rule';
  ruleEnforced?: string;
  detectedAt: string;
}

export interface FinancialResearchBrief {
  id: string;
  title: string;
  category: 'macro_rates' | 'central_bank_policy' | 'fx_outlook' | 'regulatory_framework' | 'liquidity_benchmarks';
  summary: string;
  implicationsForOmni: string;
  keyForecasts: {
    horizon: string;
    projection: string;
    confidence: string;
  }[];
  sourceCitations: string[];
  publishedAt: string;
}

export interface FinanceKnowledgeDocument {
  id: string;
  title: string;
  docType: 'invoice' | 'bank_statement' | 'tax_policy' | 'board_resolution' | 'treasury_charter' | 'audit_report' | 'compliance_manual';
  entityId: string;
  entityName: string;
  departmentScope: string[];
  confidentiality: 'public' | 'internal' | 'confidential' | 'restricted';
  indexedChunks: number;
  lastIndexedAt: string;
  extractedSummary: string;
  fileSizeBytes: number;
}

export interface FinanceAiUsageMetric {
  id: string;
  timestamp: string;
  agentType: FinanceAiAgentType;
  agentName: string;
  tenantId: string;
  actorRole: string;
  promptTokens: number;
  completionTokens: number;
  estimatedCostUsd: number;
  latencyMs: number;
  dataSourcesQueried: string[];
  guardrailsTriggered: string[];
  safetyStatus: 'passed' | 'redacted_pii' | 'blocked_prompt_injection' | 'advisory_warning_attached';
}

export interface FinanceAiSuperAdminSettings {
  globalAiEnabled: boolean;
  defaultModel: string;
  strictGuardrailEnforcement: boolean;
  piiRedaction: boolean;
  prohibitAutonomousFundMovement: true; // Hardcoded immutable
  monthlyTokenBudget: number;
  currentMonthSpendUsd: number;
  agentsConfig: Record<FinanceAiAgentType, {
    enabled: boolean;
    maxTokens: number;
    model: string;
    rateLimitPerMin: number;
  }>;
}

export interface FinanceAiChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  agentType: FinanceAiAgentType;
  agentName: string;
  text: string;
  timestamp: string;
  dataSources?: string[];
  confidenceScore?: number;
  suggestedFollowUps?: string[];
  actionProposal?: {
    title: string;
    category: string;
    impact: string;
    isExecutable: boolean;
    requiresApproval: boolean;
  };
  guardrailNotes?: string;
}

// ============================================================================
// OMNI COMPLIANCE, AML, FRAUD, RISK & SECURITY INTELLIGENCE (PROMPT 10)
// ============================================================================

export type KycVerificationStatus =
  | 'not_started'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'review_required';

export interface KycVerificationRecord {
  id: string;
  userId: string;
  userName: string;
  email: string;
  nationality: string;
  idType: 'passport' | 'drivers_license' | 'national_id';
  idNumber: string;
  status: KycVerificationStatus;
  riskTier: 'low' | 'medium' | 'high';
  biometricMatchScore: number; // e.g. 98.6%
  livenessPassed: boolean;
  sanctionsHit: boolean;
  pepHit: boolean;
  addressProofStatus: 'verified' | 'unverified' | 'rejected';
  provider: string; // e.g. "OmniBiometrics v3" | "Sumsub Adapter"
  submittedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface KybVerificationRecord {
  id: string;
  tenantId: string;
  legalBusinessName: string;
  tradeName: string;
  jurisdiction: string;
  registrationNumber: string;
  taxId: string;
  businessAddress: string;
  directors: {
    name: string;
    role: string;
    kycStatus: KycVerificationStatus;
  }[];
  shareholders: {
    name: string;
    ownershipPct: number;
    isUbo: boolean;
  }[];
  uboVerified: boolean;
  status: KycVerificationStatus;
  riskClassification: 'low' | 'medium' | 'high' | 'prohibited';
  industryCategory: string;
  documents: {
    docType: string;
    docName: string;
    verified: boolean;
  }[];
  submittedAt: string;
  verifiedAt?: string;
}

export interface AmlMonitoringRule {
  id: string;
  ruleCode: string;
  name: string;
  category: 'unusual_size' | 'rapid_movement' | 'structuring' | 'unexpected_geography' | 'high_velocity' | 'suspicious_behavior';
  threshold: number;
  thresholdUnit: 'USD' | 'EUR' | 'count_per_hour' | 'ratio' | 'seconds';
  timeWindowMinutes: number;
  severity: 'info' | 'warning' | 'critical';
  jurisdictionScope: string[];
  isEnabled: boolean;
  actionOnTrigger: 'flag_alert' | 'delay_settlement' | 'require_step_up' | 'block_transaction';
}

export interface AmlAlertRecord {
  id: string;
  alertNumber: string;
  ruleCode: string;
  ruleName: string;
  transactionId: string;
  userId: string;
  customerName: string;
  amount: number;
  currency: string;
  triggeredAt: string;
  severity: 'info' | 'warning' | 'critical';
  status: 'open' | 'under_investigation' | 'cleared_false_positive' | 'escalated_to_sar' | 'blocked';
  aiNarrativeSummary: string;
  assignedAnalyst: string;
}

export interface FraudDetectionRule {
  id: string;
  ruleName: string;
  signalType: 'account_takeover' | 'new_device' | 'impossible_travel' | 'suspicious_login' | 'payment_anomaly' | 'velocity_burst' | 'multiple_failed_attempts' | 'unusual_behavior';
  condition: string;
  action: 'allow' | 'challenge' | 'delay' | 'review' | 'restrict' | 'block';
  riskScoreImpact: number;
  isEnabled: boolean;
}

export interface ComplianceCaseRecord {
  id: string;
  reference: string;
  caseType: 'kyc_review' | 'kyb_onboarding' | 'aml_alert' | 'sanctions_hit' | 'fraud_investigation' | 'sar_filing';
  customerName: string;
  customerId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'pending_documentation' | 'escalated_to_mlro' | 'resolved_approved' | 'resolved_rejected';
  assignedOfficer: string;
  openedAt: string;
  updatedAt: string;
  evidenceFiles: {
    name: string;
    fileSize: string;
    uploadedAt: string;
  }[];
  notes: {
    author: string;
    role: string;
    text: string;
    timestamp: string;
  }[];
  associatedTransactionIds: string[];
  decisionReason?: string;
  decisionTimestamp?: string;
}

export interface CountryRulePack {
  id: string;
  countryCode: string;
  countryName: string;
  regulatoryBody: string;
  mandatoryKycThresholdUsd: number;
  ctrReportingThresholdUsd: number;
  travelRuleThresholdUsd: number;
  pepLookbackYears: number;
  restrictedCorridors: string[];
  isActive: boolean;
}

export interface ComplianceProviderAdapter {
  id: string;
  name: string;
  adapterType: 'sanctions' | 'pep' | 'adverse_media' | 'biometric_kyc' | 'kyb_registry';
  providerName: string;
  apiStatus: 'connected' | 'degraded' | 'offline';
  avgLatencyMs: number;
  dailyMatchCount: number;
  isDefault: boolean;
}

export interface SecurityIntelligenceEvent {
  id: string;
  eventType: 'login_anomaly' | 'api_abuse' | 'suspicious_session' | 'privilege_escalation_attempt' | 'data_access_anomaly';
  sourceIp: string;
  actorEmail: string;
  tenantId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  actionTaken: 'logged' | 'session_terminated' | 'ip_rate_limited' | 'account_locked';
  timestamp: string;
}

export interface ImmutableComplianceAuditLog {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  timestamp: string;
  tenantId: string;
  resource: string;
  reason: string;
  previousState: string;
  newState: string;
  merkleHash: string;
  isLocked: true;
}

// ============================================================================
// OMNI EMBEDDED FINANCE + DEVELOPER PLATFORM (PROMPT 11)
// ============================================================================

export type EmbeddedApiEnvironment = 'sandbox' | 'production';

export interface DeveloperApplication {
  id: string;
  name: string;
  appCode: string;
  tenantId: string;
  organizationName: string;
  environment: EmbeddedApiEnvironment;
  clientId: string;
  clientSecret: string;
  webhookUrl?: string;
  webhookSecret?: string;
  scopes: string[];
  ipAllowlist: string[];
  rateLimitPerMinute: number;
  monthlyTransactedVolumeUsd: number;
  status: 'active' | 'pending_verification' | 'rate_limited' | 'suspended';
  createdAt: string;
}

export interface DeveloperApiKey {
  id: string;
  appId: string;
  name: string;
  keyPrefix: 'omni_live_sec' | 'omni_test_sec' | 'omni_pub';
  tokenMasked: string;
  environment: EmbeddedApiEnvironment;
  scopes: string[];
  rateLimitPerMin: number;
  lastUsedAt?: string;
  createdAt: string;
  status: 'active' | 'revoked';
}

export interface WebhookSubscription {
  id: string;
  appId: string;
  url: string;
  signingSecret: string;
  subscribedEvents: (
    | 'payment.completed'
    | 'payment.failed'
    | 'transfer.completed'
    | 'invoice.paid'
    | 'wallet.updated'
    | 'transaction.created'
    | 'settlement.completed'
    | 'kyc.verified'
  )[];
  status: 'active' | 'degraded' | 'disabled';
  deliverySuccessRate: number;
  totalDeliveries: number;
  retryStrategy: 'exponential_backoff_4x';
}

export interface WebhookDeliveryLog {
  id: string;
  subscriptionId: string;
  eventType: string;
  endpointUrl: string;
  httpStatus: number;
  status: 'delivered' | 'retrying' | 'failed_terminal';
  attemptNumber: number;
  payloadSummary: string;
  signatureHeader: string;
  durationMs: number;
  timestamp: string;
  responseBody?: string;
}

export interface EmbeddedBaaSBlueprint {
  id: string;
  title: string;
  category:
    | 'marketplace_escrow'
    | 'employee_corporate'
    | 'education_tuition'
    | 'creator_gig'
    | 'logistics_freight'
    | 'saas_recurring';
  description: string;
  businessModel: string;
  walletArchitecture: string;
  flowSteps: string[];
  recommendedApis: string[];
  samplePayloadJson: string;
  sampleResponseJson: string;
}

export interface DeveloperApiRouteSpec {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  resourceCategory: 'customers' | 'wallets' | 'payments' | 'transfers' | 'invoices' | 'subscriptions' | 'fx' | 'reports';
  summary: string;
  description: string;
  requiredScopes: string[];
  requestBodySample?: string;
  responseSample: string;
}

// ============================================================================
// PROMPT 12: WHITE LABEL FINANCIAL INSTITUTION PLATFORM TYPES
// ============================================================================

export type WhiteLabelInstitutionCategory =
  | 'digital_bank'
  | 'fintech'
  | 'cooperative'
  | 'credit_union'
  | 'enterprise_wallet'
  | 'corporate_finance'
  | 'government_payment';

export interface WhiteLabelThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Outfit' | 'SF Pro' | 'Fira Code' | 'Playfair Display';
  borderRadius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
  colorMode: 'dark' | 'light' | 'auto';
}

export interface WhiteLabelBrandingConfig {
  brandName: string;
  tagline: string;
  companyLegalName: string;
  supportEmail: string;
  supportPhone: string;
  copyrightText: string;
  logoUrl: string;
  faviconUrl: string;
  mobileConfig: {
    appTitle: string;
    splashColor: string;
    appIconShape: 'squircle' | 'rounded_square' | 'circle';
    appStoreId: string;
    playStoreId: string;
  };
  emailConfig: {
    headerLogoUrl: string;
    footerSignature: string;
    senderName: string;
    senderEmail: string;
    accentColor: string;
  };
  notificationConfig: {
    pushTitlePrefix: string;
    smsSenderId: string;
    enablePush: boolean;
    enableSms: boolean;
  };
  cardConfig: {
    cardArtStyle: 'minimal_dark' | 'gradient_lux' | 'metallic_gold' | 'neon_cyber' | 'emerald_sovereign';
    customBinPrefix: string;
    cardProgramName: string;
    embossedNameDefault: string;
  };
}

export interface WhiteLabelProductToggles {
  wallet: boolean;
  payments: boolean;
  fx: boolean;
  cards: boolean;
  invoices: boolean;
  payroll: boolean;
  businessFinance: boolean;
  treasury: boolean;
  aiFinance: boolean;
  marketplacePayments: boolean;
  developerApis: boolean;
}

export interface WhiteLabelFinancialRules {
  transactionFeePercent: number;
  fixedFeePerTxUsd: number;
  interchangeMarkupBps: number;
  fxSpreadMarkupBps: number;
  singleTxLimitUsd: number;
  dailyVelocityLimitUsd: number;
  monthlyThroughputLimitUsd: number;
  supportedCurrencies: string[];
  operatingCountries: string[];
  approvalRules: {
    minAmountUsd: number;
    requiredSigners: number;
    roleRequired: string;
  }[];
  complianceTierRequired: ComplianceTier;
  transactionPolicies: {
    allowInternationalWires: boolean;
    allowCryptoRail: boolean;
    instantSettlementEnabled: boolean;
    weekendProcessing: boolean;
  };
}

export interface WhiteLabelDomainConfig {
  subdomain: string;
  customDomain: string;
  sslStatus: 'provisioned' | 'pending_dns' | 'validating' | 'expired';
  dnsRecords: {
    type: 'CNAME' | 'A' | 'TXT';
    host: string;
    value: string;
    status: 'verified' | 'unverified';
  }[];
}

export interface WhiteLabelResellerConfig {
  resellerId: string;
  parentPartnerName: string;
  tier: 'master_reseller' | 'direct_institution' | 'sub_partner';
  revenueSharePercent: number; // e.g. 75 = 75% to partner, 25% to OMNI
  subscriptionTier: 'starter' | 'growth' | 'enterprise_scale' | 'sovereign_custom';
  monthlyPlatformFeeUsd: number;
  usageBillingRates: {
    perActiveWalletUsd: number;
    perCardIssuedUsd: number;
    perApiCallUsd: number;
    bpsOnGmv: number;
  };
  monthlyThroughputUsd: number;
  accruedPartnerRevenueUsd: number;
  accruedOmniPlatformShareUsd: number;
}

export interface WhiteLabelAffiliateCampaign {
  id: string;
  name: string;
  referralCode: string;
  commissionType: 'fixed_per_customer' | 'bps_on_volume';
  commissionValue: number;
  totalReferrals: number;
  totalAcquisitionGmvUsd: number;
  totalPayoutUsd: number;
  status: 'active' | 'paused';
}

export interface WhiteLabelAiConfig {
  assistantName: string;
  assistantAvatarUrl: string;
  welcomePrompt: string;
  enabledForRetail: boolean;
  enabledForBusiness: boolean;
  maxAutonomousRecommendationLimitUsd: number;
  disclaimerText: string;
  customKnowledgeDocs: {
    id: string;
    title: string;
    category: string;
    wordCount: number;
    status: 'indexed' | 'syncing';
  }[];
  financialEducationModules: {
    id: string;
    title: string;
    topic: string;
    durationMin: number;
    targetAudience: string;
  }[];
}

export interface WhiteLabelConnectedProvider {
  id: string;
  category: 'payment_gateway' | 'banking_rail' | 'kyc_screening' | 'fx_liquidity';
  providerName: string;
  adapterType: string;
  status: 'connected' | 'testing' | 'disabled';
  isDefault: boolean;
  monthlyVolumeProcessedUsd: number;
}

export interface WhiteLabelTenantUser {
  id: string;
  userType: 'customer' | 'business' | 'employee' | 'agent';
  name: string;
  email: string;
  role: string;
  walletBalanceUsd: number;
  kycStatus: 'verified' | 'pending' | 'action_required';
  status: 'active' | 'suspended' | 'invited';
  joinedDate: string;
}

export interface WhiteLabelInstitutionTenant {
  id: string;
  name: string;
  slug: string;
  category: WhiteLabelInstitutionCategory;
  status: 'active' | 'pending_approval' | 'suspended';
  country: string;
  jurisdiction: string;
  branding: WhiteLabelBrandingConfig;
  theme: WhiteLabelThemeConfig;
  products: WhiteLabelProductToggles;
  financialRules: WhiteLabelFinancialRules;
  domain: WhiteLabelDomainConfig;
  reseller: WhiteLabelResellerConfig;
  affiliateCampaigns: WhiteLabelAffiliateCampaign[];
  aiConfig: WhiteLabelAiConfig;
  providers: WhiteLabelConnectedProvider[];
  usersCount: {
    customers: number;
    businesses: number;
    employees: number;
    agents: number;
  };
  totalAssetsUnderManagementUsd: number;
  monthlyThroughputUsd: number;
  auditLogsCount: number;
  createdAt: string;
  updatedAt: string;
}





