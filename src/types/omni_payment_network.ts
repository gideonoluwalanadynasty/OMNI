import { PaymentRail } from './finance_os';

export type PaymentState =
  | 'Created'
  | 'Awaiting Approval'
  | 'Authorized'
  | 'Processing'
  | 'Pending Provider'
  | 'Completed'
  | 'Failed'
  | 'Cancelled'
  | 'Reversed'
  | 'Refunded'
  | 'Under Review';

export type PaymentMethodType =
  | 'cards'
  | 'bank_transfer'
  | 'wallet_transfer'
  | 'qr_payments'
  | 'payment_links'
  | 'virtual_accounts'
  | 'mobile_money'
  | 'bills'
  | 'subscriptions'
  | 'international_payments';

export type PaymentProviderType =
  | 'bank_transfer'
  | 'card'
  | 'mobile_money'
  | 'wallet'
  | 'virtual_account'
  | 'direct_debit'
  | 'bill_payment';

export type TransferType =
  | 'user_transfer'
  | 'business_transfer'
  | 'international_transfer'
  | 'scheduled_transfer'
  | 'recurring_transfer'
  | 'bulk_transfer'
  | 'supplier_payment'
  | 'payroll_payment';

export type ApprovalPolicyType =
  | 'single_approval'
  | 'multiple_approval'
  | 'amount_based'
  | 'department_based'
  | 'role_based';

export interface FeeBreakdown {
  railNetworkFee: number;
  providerInterchangeFee: number;
  platformMarkupFee: number;
  fxSpreadFee: number;
  taxWithholding: number;
  totalFee: number;
  currency: string;
}

export interface PaymentIntent {
  id: string;
  tenantId: string;
  referenceNumber: string;
  amount: number;
  currency: string;
  status: PaymentState;
  paymentMethod: PaymentMethodType;
  providerId: string;
  providerName: string;
  providerReference?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  description: string;
  idempotencyKey: string;
  clientSecret: string;
  authorizedAmount?: number;
  capturedAmount?: number;
  refundedAmount?: number;
  feeDetails: FeeBreakdown;
  metadata: Record<string, any>;
  qrPayload?: string;
  paymentLinkUrl?: string;
  settlementBatchId?: string;
  journalEntryId?: string;
  requiresApproval?: boolean;
  approvalTicketId?: string;
  createdAt: string;
  authorizedAt?: string;
  completedAt?: string;
  failedAt?: string;
  failureReason?: string;
  lastWebhookTimestamp?: string;
}

export interface PaymentProviderInterface {
  id: string;
  name: string;
  providerType: PaymentProviderType;
  supportedMethods: PaymentMethodType[];
  supportedCurrencies: string[];
  latencyMs: number;
  uptimePercent: number;
  healthStatus: 'operational' | 'degraded' | 'maintenance' | 'offline';
  isFallback: boolean;
  priority: number; // 1 = Primary, 2 = Secondary, 3 = Fallback
  apiEndpoint: string;
  webhookSecret: string;
  requiresSignatureVerification: boolean;
  supports3DS2?: boolean;
  supportsInstantSettlement?: boolean;
  config: {
    sandboxMode: boolean;
    timeoutMs: number;
    maxRetries: number;
    feeFlat: number;
    feeBps: number;
  };
}

export interface ProviderExecutionLog {
  timestamp: string;
  providerId: string;
  providerName: string;
  endpoint: string;
  httpStatus: number;
  requestPayload: any;
  responsePayload: any;
  latencyMs: number;
  success: boolean;
  errorMessage?: string;
  merkleProof: string;
}

export interface WebhookEventRecord {
  id: string;
  eventId: string; // Provider event unique ID
  providerId: string;
  providerName: string;
  eventType: string; // e.g., 'payment.captured', 'transfer.completed', 'charge.failed'
  signatureHeader: string;
  timestampHeader: string;
  rawPayload: string;
  parsedPayload: any;
  receivedAt: string;
  signatureVerified: boolean;
  replayAttackDetected: boolean;
  status: 'processed' | 'duplicate_ignored' | 'rejected_invalid_signature' | 'failed_retry';
  processingDurationMs: number;
  journalEntryId?: string;
  auditMerkleHash: string;
}

export interface BulkTransferLineItem {
  id: string;
  recipientName: string;
  recipientAccount: string;
  recipientBankOrRail: string;
  amount: number;
  currency: string;
  memo: string;
  department?: string;
  taxDeduction?: number;
  status: 'pending' | 'processed' | 'failed';
  referenceNumber?: string;
}

export interface TransferRequest {
  id: string;
  tenantId: string;
  referenceNumber: string;
  transferType: TransferType;
  senderName: string;
  senderAccountOrWalletId: string;
  senderCurrency: string;
  recipientName: string;
  recipientAccountOrHandle: string;
  recipientBankOrRail: string;
  recipientCurrency: string;
  amount: number;
  currency: string;
  fxRate?: number;
  fxLockExpiration?: string;
  convertedAmount?: number;
  feeDetails: FeeBreakdown;
  narration: string;
  status: PaymentState;
  idempotencyKey: string;
  makerUserId: string;
  makerName: string;
  scheduleDate?: string;
  recurringFrequency?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  recurringEndDate?: string;
  bulkItems?: BulkTransferLineItem[];
  invoiceReference?: string;
  poNumber?: string;
  approvalTicketId?: string;
  journalEntryId?: string;
  receiptId?: string;
  createdAt: string;
  executedAt?: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  policyType: ApprovalPolicyType;
  minAmount: number;
  maxAmount: number;
  requiredApprovals: number;
  allowedRoles: string[];
  targetDepartment?: string;
}

export interface ApprovalSignature {
  userId: string;
  userName: string;
  role: string;
  department?: string;
  action: 'approved' | 'rejected';
  timestamp: string;
  comment?: string;
  ipAddress: string;
  cryptographicSignature: string;
}

export interface ApprovalTicket {
  id: string;
  tenantId: string;
  targetType: 'payment_intent' | 'transfer' | 'bulk_batch' | 'payroll';
  targetId: string;
  referenceNumber: string;
  amount: number;
  currency: string;
  initiatorUserId: string;
  initiatorName: string;
  department: string;
  narration: string;
  ruleApplied: ApprovalRule;
  requiredSignatures: number;
  collectedSignatures: ApprovalSignature[];
  status: 'pending_approval' | 'approved' | 'rejected' | 'escalated';
  createdAt: string;
  resolvedAt?: string;
}

export interface PaymentReceipt {
  id: string;
  referenceNumber: string;
  transactionDate: string;
  sender: {
    name: string;
    accountMask: string;
    institution: string;
    taxId?: string;
  };
  recipient: {
    name: string;
    accountMask: string;
    institution: string;
    emailOrHandle?: string;
  };
  principalAmount: number;
  currency: string;
  fees: FeeBreakdown;
  netSettledAmount: number;
  status: 'SETTLED_SUCCESS' | 'PROCESSING' | 'REFUNDED' | 'FAILED';
  paymentMethod: PaymentMethodType;
  rail: PaymentRail;
  narration: string;
  merkleAuditHash: string;
  qrVerificationCode: string;
  supportContact: string;
}

export interface EcosystemPaymentSplit {
  id: string;
  ecosystemModule:
    | 'omni_marketplace'
    | 'omni_ads'
    | 'omni_creator'
    | 'omni_learn'
    | 'omni_capital'
    | 'omni_affiliate'
    | 'omni_wallet';
  eventDescription: string;
  grossAmount: number;
  currency: string;
  splits: {
    recipientRole: 'seller' | 'creator' | 'affiliate' | 'lender' | 'platform_treasury' | 'tax_reserve';
    recipientName: string;
    walletId: string;
    glAccountCode: string;
    amount: number;
    percentage: number;
  }[];
  journalEntryId: string;
  timestamp: string;
  status: 'settled_distributed';
}

export interface PaymentAiAnalysis {
  paymentId: string;
  riskScore: number; // 0 to 100
  riskLevel: 'very_low' | 'low' | 'moderate' | 'elevated' | 'high' | 'critical';
  naturalLanguageSummary: string;
  flowExplanation: string;
  feeOptimizationNote: string;
  anomaliesDetected: {
    type: 'velocity_spike' | 'geo_anomaly' | 'corridor_high_risk' | 'off_hour_execution' | 'none';
    severity: 'info' | 'warning' | 'critical';
    details: string;
  }[];
  readOnlyDisclaimer: string;
}

export interface PaymentTestSuiteResult {
  id: string;
  name: string;
  category: string;
  expectedOutcome: string;
  actualOutcome: string;
  status: 'PASS' | 'FAIL';
  executionTimeMs: number;
  details: string;
  auditProof: string;
}
