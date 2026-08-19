import React from 'react';
import { FinanceAiInsight, FinanceTenant } from '../../types/finance_os';
import OmniFinanceAiIntelligenceSuite from './OmniFinanceAiIntelligenceSuite';

export interface FinanceAiCopilotProps {
  insights?: FinanceAiInsight[];
  onApplyInsightAction?: (insightId: string) => void;
  activeTenant?: FinanceTenant;
  userRole?: string;
  onOpenLedgerEntry?: (journalId: string) => void;
}

export default function FinanceAiCopilot(props: FinanceAiCopilotProps) {
  return <OmniFinanceAiIntelligenceSuite {...props} />;
}
