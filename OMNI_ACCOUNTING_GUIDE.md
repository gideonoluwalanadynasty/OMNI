# OMNI Accounting Engine & GAAP/IFRS Reporting Guide

## 1. Standard Posting Rules Catalog

OMNI translates business operations into standard double-entry journal postings through configured **Posting Rules**:

### Outbound Payment Settlement (`RULE_OUTBOUND_PAYMENT`)
- **Debit**: GL 5010 (Payment Rail Network Cost / Direct Expense) or GL 2010 (Accounts Payable)
- **Credit**: GL 1010 (Operating Cash USD) or GL 1030 (Clearing Account)

### Inbound Customer Deposit (`RULE_INBOUND_PAYMENT`)
- **Debit**: GL 1010 (Operating Cash USD)
- **Credit**: GL 4010 (SaaS Subscription Revenue) or GL 2050 (Customer Escrow Deposit)
- **Fee Split**: Credit GL 4020 (Payment Gateway Fee Revenue)

### FX Currency Wholesale Swap (`RULE_FX_SWAP`)
- **Debit**: GL 1020 (Foreign Currency Reserve - EUR)
- **Credit**: GL 1010 (Operating Cash - USD)
- **Credit**: GL 4030 (FX Spread Markup Revenue)

### Global Payroll Batch Run (`RULE_PAYROLL_RUN`)
- **Debit**: GL 5020 (Gross Engineering Payroll Expense)
- **Credit**: GL 2030 (Tax Withholding Accrual Liability)
- **Credit**: GL 1010 (Net Direct Deposit Cash Outflow)

### Instant Liquidity Invoice Factoring (`RULE_INVOICE_FACTORING`)
- **Debit**: GL 1010 (Cash Disbursed to Supplier)
- **Debit**: GL 4040 (Factoring Discount Fee Revenue)
- **Credit**: GL 1040 (Accounts Receivable Asset)

### Suspense Wire Holding & Clearing (`RULE_SUSPENSE_HOLD` & `RULE_SUSPENSE_CLEAR`)
- **Intake**:
  - **Debit**: GL 1010 (Cash Received)
  - **Credit**: GL 2040 (Suspense & Unallocated Inflows Liability)
- **Resolution**:
  - **Debit**: GL 2040 (Suspense Liability)
  - **Credit**: GL 4010 (Recognized SaaS Revenue / Customer Deposit)

---

## 2. Immutable Reversals and Adjustments

OMNI strictly adheres to the GAAP/IFRS accounting principle that **posted books cannot be rewritten or erased**.

### Reversal Entry Workflow
When an adjustment is required:
1. The original Journal Entry (`JE-2026-08-0101`) status is updated to `reversed`.
2. A new Reversal Entry (`REV-JE-2026-08-0101`) is generated:
   - All original debits become credits.
   - All original credits become debits.
   - Exact integer minor units are conserved.
   - Links via `reversesJournalEntryId` and `reversedByJournalEntryId`.
3. If replacing the transaction with corrected GL codes or amounts, a third **Replacement Entry** is posted referencing the reversal.

---

## 3. Financial Statements & Reporting

### 1. Trial Balance
Verifies that total debits across the entire ledger equal total credits.
- Columns: `GL Code`, `Account Title`, `Category`, `Normal Balance`, `Debit Balance`, `Credit Balance`, `Net Balance`.

### 2. General Ledger (GL) Detail
Provides a granular running ledger statement for any selected account code with chronologically sorted postings and balance tracking.

### 3. Income Statement (Profit & Loss)
$$\text{Gross Profit} = \text{Total Revenues} - \text{Direct Payment Rail Costs}$$
$$\text{Net Operating Income} = \text{Gross Profit} - \text{Operating Expenses}$$

### 4. Fee & Interchange Analysis
Analyzes fee margin economics across FedNow, SWIFT, SEPA, Visa/Mastercard, and USDC stablecoin rails with effective basis points (bps) calculation.

---

## 4. Fixed-Precision Math & Banker's Rounding

To prevent cumulative roundoff errors in multi-currency transactions and fractional tax splits, OMNI utilizes **Banker's Rounding (Round Half to Even)**:
- $2.5 \rightarrow 2$
- $3.5 \rightarrow 4$
- All intermediate calculations remain in minor unit `bigint` until UI presentation formatting.
