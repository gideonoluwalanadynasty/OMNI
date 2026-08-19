/**
 * OMNI Business Finance Suite - Type Definitions
 * Complete Business Financial Operating System for Freelancers, SMEs, Corporations & Enterprises.
 */

import { PaymentRail, FinanceJournalEntry, FinanceLedgerPosting } from './finance_os';

// ============================================================================
// 1. BUSINESS PROFILE, ORG STRUCTURE & POLICIES
// ============================================================================

export type BusinessTier = 'freelancer' | 'small_business' | 'sme' | 'corporation' | 'enterprise';

export interface BusinessDepartment {
  id: string;
  name: string;
  code: string; // e.g. "ENG", "MKT", "FIN", "OPS", "SALES"
  headOfDepartment: string;
  budgetAnnualUsd: number;
  spentYtdUsd: number;
  employeesCount: number;
}

export interface BusinessBranch {
  id: string;
  name: string;
  country: string;
  city: string;
  currency: string;
  taxJurisdiction: string;
  address: string;
  isHeadquarters: boolean;
}

export interface BusinessCostCentre {
  id: string;
  name: string;
  code: string; // e.g. "CC-101-CORE-INFRA"
  departmentId: string;
  allocatedBudgetUsd: number;
  currentExpenseUsd: number;
  ownerName: string;
}

export interface BusinessProject {
  id: string;
  name: string;
  projectCode: string;
  costCentreId: string;
  clientName?: string;
  budgetUsd: number;
  spentUsd: number;
  status: 'active' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
}

export interface BusinessEmployee {
  id: string;
  employeeNumber: string; // e.g. "EMP-0841"
  name: string;
  email: string;
  jobTitle: string;
  departmentId: string;
  departmentName: string;
  branchId: string;
  branchName: string;
  employmentType: 'full_time' | 'part_time' | 'contractor' | 'executive';
  baseSalaryAnnual: number;
  currency: string;
  monthlyBase: number;
  allowances: {
    housing: number;
    transport: number;
    healthWellness: number;
    meal: number;
    custom?: { name: string; amount: number }[];
  };
  deductions: {
    pensionPercent: number; // e.g. 8%
    healthInsuranceFlat: number;
    voluntarySavings: number;
  };
  taxInfo: {
    taxId: string;
    taxBracketPercent: number;
    withholdingStateOrProvince?: string;
  };
  payoutDetails: {
    bankName: string;
    accountNumberMasked: string;
    routingOrIban: string;
    preferredRail: PaymentRail;
    walletAddress?: string;
  };
  status: 'active' | 'on_leave' | 'terminated';
  joinedDate: string;
}

export interface BusinessFinancialPolicy {
  id: string;
  name: string;
  category: 'expense' | 'travel' | 'procurement' | 'payroll' | 'disbursement';
  maxAutoApprovalAmountUsd: number;
  receiptRequiredAboveUsd: number;
  requiresDualSignoffAboveUsd: number;
  mileageRatePerKmUsd: number;
  dailyPerDiemMealsUsd: number;
  enforceOcrMatch: boolean;
  blockDuplicateReceipts: boolean;
  isActive: boolean;
}

export interface BusinessProfile {
  id: string;
  tenantId: string;
  legalEntityName: string;
  tradeName: string;
  tier: BusinessTier;
  taxIdentificationNumber: string;
  vatOrGstNumber?: string;
  registrationNumber: string;
  industryCategory: string;
  fiscalYearEndMonth: number; // 12 for December
  baseCurrency: string;
  headquarters: {
    address: string;
    city: string;
    stateOrProvince: string;
    country: string;
    postalCode: string;
  };
  departments: BusinessDepartment[];
  branches: BusinessBranch[];
  costCentres: BusinessCostCentre[];
  projects: BusinessProject[];
  policies: BusinessFinancialPolicy[];
  bankAccountsCount: number;
  totalTeamCount: number;
}

// ============================================================================
// 2. INVOICING & SMART BILLING
// ============================================================================

export type InvoiceStatus =
  | 'draft'
  | 'issued'
  | 'viewed'
  | 'partially_paid'
  | 'paid_in_full'
  | 'overpaid'
  | 'past_due'
  | 'factored'
  | 'cancelled'
  | 'refunded'
  | 'disputed';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePercent: number;
  taxAmount: number;
  discountPercent?: number;
  discountAmount?: number;
  totalAmount: number;
  projectId?: string;
}

export interface InvoicePaymentRecord {
  id: string;
  paymentDate: string;
  amount: number;
  currency: string;
  paymentRail: PaymentRail;
  transactionReference: string;
  notes?: string;
  journalEntryId?: string;
}

export interface CreditNoteRecord {
  id: string;
  creditNoteNumber: string; // e.g. "CN-2026-0041"
  originalInvoiceId: string;
  issueDate: string;
  reason: string;
  amount: number;
  currency: string;
  journalEntryId: string;
  status: 'issued' | 'applied_to_invoice' | 'refunded_cash';
}

export interface BusinessInvoice {
  id: string;
  tenantId: string;
  invoiceNumber: string; // e.g. "INV-2026-8821"
  customer: {
    id: string;
    name: string;
    email: string;
    companyName?: string;
    taxId?: string;
    billingAddress: string;
    country: string;
  };
  lineItems: InvoiceLineItem[];
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: 'due_on_receipt' | 'net_15' | 'net_30' | 'net_60';
  status: InvoiceStatus;
  isRecurring: boolean;
  recurringSchedule?: {
    frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually';
    nextIssueDate: string;
    autoDebitEnabled: boolean;
  };
  isFactored: boolean;
  factoringAdvanceAmount?: number;
  paymentLinkUrl?: string;
  payments: InvoicePaymentRecord[];
  creditNotes?: CreditNoteRecord[];
  notes?: string;
  memoForCustomer?: string;
  journalEntryId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 3. HOSTED PAYMENT LINKS
// ============================================================================

export interface BusinessPaymentLink {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  productType: 'fixed_price' | 'custom_amount' | 'subscription' | 'donation';
  amount: number;
  currency: string;
  slug: string;
  hostedUrl: string;
  allowedRails: PaymentRail[];
  allowCustomAmount: boolean;
  minAmount?: number;
  maxAmount?: number;
  collectShippingAddress: boolean;
  collectPhoneNumber: boolean;
  collectTaxId: boolean;
  successRedirectUrl?: string;
  expiryDate?: string;
  totalPaymentsCollected: number;
  totalVolumeUsd: number;
  status: 'active' | 'paused' | 'expired';
  createdAt: string;
}

// ============================================================================
// 4. EXPENSE MANAGEMENT & AI OCR ASSISTANT
// ============================================================================

export type ExpenseCategoryType =
  | 'travel_lodging'
  | 'meals_entertainment'
  | 'software_saas'
  | 'office_supplies'
  | 'hardware_equipment'
  | 'marketing_ads'
  | 'legal_professional'
  | 'utilities_telecom'
  | 'training_education'
  | 'miscellaneous';

export type ExpenseApprovalStatus =
  | 'draft'
  | 'submitted'
  | 'pending_manager_approval'
  | 'pending_finance_director'
  | 'approved_ready_for_payment'
  | 'reimbursed'
  | 'rejected'
  | 'flagged_for_audit';

export interface ExpenseReceiptOcrData {
  rawTextExtracted: string;
  merchantNameExtracted: string;
  merchantAddressExtracted?: string;
  dateExtracted: string;
  totalAmountExtracted: number;
  taxAmountExtracted: number;
  currencyExtracted: string;
  confidenceScorePercent: number;
  lineItemsDetected: { desc: string; amount: number }[];
  isDuplicateDetected: boolean;
  duplicateMatchedExpenseId?: string;
  suggestedGlAccountCode: string;
  suggestedGlAccountName: string;
  auditNotes: string[];
}

export interface BusinessExpenseItem {
  id: string;
  tenantId: string;
  expenseNumber: string; // e.g. "EXP-2026-0922"
  submitterUserId: string;
  submitterName: string;
  submitterEmail: string;
  departmentId: string;
  departmentName: string;
  costCentreId: string;
  projectId?: string;
  merchantName: string;
  category: ExpenseCategoryType;
  glAccountCode: string;
  description: string;
  amount: number;
  currency: string;
  usdEquivalent: number;
  expenseDate: string;
  receiptUrl?: string;
  receiptFileName?: string;
  ocrAnalysis?: ExpenseReceiptOcrData;
  isPolicyViolated: boolean;
  policyViolationReasons?: string[];
  approvalStatus: ExpenseApprovalStatus;
  approversFlow: {
    level: number;
    approverRole: string;
    approverName?: string;
    approvedAt?: string;
    comments?: string;
  }[];
  reimbursementDetails?: {
    reimbursementDate: string;
    payoutRail: PaymentRail;
    destinationBankOrWallet: string;
    disbursedAmount: number;
    journalEntryId: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 5. PAYROLL SYSTEM & SECURITY
// ============================================================================

export type PayrollRunStatus =
  | 'draft_calculated'
  | 'pending_dual_approval'
  | 'approved'
  | 'processing_disbursement'
  | 'disbursed_completed'
  | 'failed_audit_block';

export interface EmployeePayslipItem {
  employeeId: string;
  employeeName: string;
  employeeNumber: string;
  jobTitle: string;
  departmentName: string;
  branchName: string;
  currency: string;
  // Earnings
  baseSalaryMonthly: number;
  allowancesTotal: number;
  allowancesBreakdown: { name: string; amount: number }[];
  grossPay: number;
  // Taxes & Withholdings
  incomeTaxWithheld: number;
  socialSecurityWithheld: number;
  // Deductions
  pensionContribution: number;
  healthInsuranceDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  // Net Pay
  netPay: number;
  // Employer contributions (not deducted from employee)
  employerPensionMatch: number;
  employerHealthContribution: number;
  employerPayrollTax: number;
  totalEmployerCost: number;
  // Payment info
  payoutStatus: 'pending' | 'settled' | 'failed';
  payoutRail: PaymentRail;
  bankAccountMasked: string;
  payslipPdfHash: string;
}

export interface BusinessPayrollRun {
  id: string;
  tenantId: string;
  payrollRunNumber: string; // e.g. "PR-2026-08-B2"
  payPeriodTitle: string; // e.g. "August 2026 - Monthly Sovereign Run"
  periodStartDate: string;
  periodEndDate: string;
  payDate: string;
  currency: string;
  totalEmployeesCount: number;
  totalGrossPay: number;
  totalTaxWithheld: number;
  totalEmployeeDeductions: number;
  totalNetDisbursed: number;
  totalEmployerContributions: number;
  totalCompanyCost: number;
  status: PayrollRunStatus;
  auditSecurityLog: {
    action: string;
    performedBy: string;
    timestamp: string;
    ipAddress: string;
    mfaVerified: boolean;
    digitalSignature: string;
  }[];
  approvalsRequired: number;
  approvalsCurrent: {
    approverRole: string;
    approverName: string;
    approvedAt: string;
  }[];
  payslips: EmployeePayslipItem[];
  journalEntryId?: string;
  createdAt: string;
  disbursedAt?: string;
}

// ============================================================================
// 6. BUSINESS ACCOUNTING & FINANCIAL STATEMENTS
// ============================================================================

export interface IncomeStatementItem {
  category: string;
  glCodeRange: string;
  currentPeriodUsd: number;
  priorPeriodUsd: number;
  variancePercent: number;
}

export interface BusinessIncomeStatement {
  periodTitle: string;
  currency: string;
  revenueItems: IncomeStatementItem[];
  totalRevenue: number;
  costOfGoodsSoldItems: IncomeStatementItem[];
  totalCogs: number;
  grossProfit: number;
  grossMarginPercent: number;
  operatingExpenseItems: IncomeStatementItem[];
  totalOperatingExpenses: number;
  ebitda: number;
  ebitdaMarginPercent: number;
  taxExpense: number;
  netIncome: number;
  netMarginPercent: number;
}

export interface CashFlowStatementSection {
  title: string;
  items: { description: string; amountUsd: number }[];
  subtotalUsd: number;
}

export interface BusinessCashFlowStatement {
  periodTitle: string;
  currency: string;
  operatingActivities: CashFlowStatementSection;
  investingActivities: CashFlowStatementSection;
  financingActivities: CashFlowStatementSection;
  netCashFlowUsd: number;
  beginningCashUsd: number;
  endingCashUsd: number;
}

export interface AccountsReceivableAgingBucket {
  bucketName: 'current_0_30' | 'past_due_31_60' | 'past_due_61_90' | 'past_due_90_plus';
  label: string;
  invoicesCount: number;
  totalAmountUsd: number;
  percentOfTotal: number;
}

// ============================================================================
// 7. APPROVAL WORKFLOW RULES
// ============================================================================

export type ApprovalModuleType = 'expense' | 'payment_outbound' | 'payroll' | 'invoice_credit_note';

export interface BusinessApprovalRuleConfig {
  id: string;
  tenantId: string;
  name: string;
  module: ApprovalModuleType;
  minAmountUsd: number;
  maxAmountUsd?: number;
  departmentScope?: string; // "ALL" or department ID
  branchScope?: string; // "ALL" or branch ID
  requiredApprovers: {
    roleName: 'Department Manager' | 'Finance Director' | 'Chief Financial Officer' | 'CEO';
    stepOrder: number;
  }[];
  autoEscalationHours: number;
  isActive: boolean;
}

// ============================================================================
// 8. AI CFO ASSISTANT & GOVERNANCE
// ============================================================================

export interface BusinessAiCfoReport {
  id: string;
  title: string;
  category: 'burn_rate_runway' | 'working_capital' | 'tax_optimization' | 'expense_anomaly' | 'revenue_forecast';
  summary: string;
  keyMetrics: { label: string; value: string; trend: 'up' | 'down' | 'neutral' }[];
  recommendations: string[];
  anomaliesDetected: { description: string; severity: 'low' | 'medium' | 'high'; impactAmountUsd: number }[];
  cashRunwayMonths: number;
  projectedYearEndCashUsd: number;
  generatedAt: string;
}

// ============================================================================
// 9. SUPER ADMIN BUSINESS CONFIG
// ============================================================================

export interface SuperAdminBusinessSuiteConfig {
  invoicingEnabled: boolean;
  paymentLinksEnabled: boolean;
  expenseOcrEnabled: boolean;
  payrollEngineEnabled: boolean;
  instantFactoringEnabled: boolean;
  aiCfoAgentEnabled: boolean;
  supportedCountries: {
    code: string;
    name: string;
    currency: string;
    vatRatePercent: number;
    corporateTaxRatePercent: number;
    statutoryPensionEmployerPercent: number;
    statutoryPensionEmployeePercent: number;
    payrollScheduleStandard: 'monthly' | 'biweekly' | 'weekly';
  }[];
  ocrConfidenceThresholdPercent: number;
  maxFactoringAdvancePercent: number;
}

// ============================================================================
// 10. TEST HARNESS TYPES
// ============================================================================

export interface BusinessTestSuiteResult {
  testId: string;
  name: string;
  category: 'invoicing' | 'expenses_ocr' | 'payroll' | 'accounting_ledger' | 'approvals' | 'ai_governance';
  status: 'passed' | 'failed';
  executionMs: number;
  details: string;
  assertions: { check: string; passed: boolean }[];
  ledgerJournalHash?: string;
}
