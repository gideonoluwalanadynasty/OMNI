import React from 'react';
import {
  FinanceTenant,
  FinancialAccount,
  TreasuryPool,
  FinanceCurrencyRate,
  FinanceJournalEntry,
  FinanceApprovalRule
} from '../../types/finance_os';
import OmniEnterpriseTreasurySuite from './OmniEnterpriseTreasurySuite';

export interface EnterpriseFinanceDashboardProps {
  tenants: FinanceTenant[];
  activeTenant: FinanceTenant;
  accounts: FinancialAccount[];
  treasuryPools: TreasuryPool[];
  fxRates: FinanceCurrencyRate[];
  journalEntries: FinanceJournalEntry[];
  approvalRules: FinanceApprovalRule[];
  onExecuteFxSwap: (fromCurr: string, toCurr: string, amount: number) => void;
  onRebalancePool: (poolId: string) => void;
  onOpenLedgerEntry?: (journalEntryId: string) => void;
}

export default function EnterpriseFinanceDashboard(props: EnterpriseFinanceDashboardProps) {
  return <OmniEnterpriseTreasurySuite {...props} />;
}
