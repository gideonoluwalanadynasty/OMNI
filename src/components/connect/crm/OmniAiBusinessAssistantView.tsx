import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  Send,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Briefcase,
  FileText,
  HelpCircle,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Customer360Profile, CrmDeal } from '../../../types/omni_crm';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  profiles: Customer360Profile[];
  deals: CrmDeal[];
  activeProfile: ConnectProfile;
  onOpenCustomer360: (customerId: string) => void;
}

export const OmniAiBusinessAssistantView: React.FC<Props> = ({
  profiles,
  deals,
  activeProfile,
  onOpenCustomer360
}) => {
  const [nlQuery, setNlQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState<{
    answer: string;
    suggestedActions: string[];
    relevantContacts: string[];
  } | null>({
    answer: `Found 3 high-priority institutional opportunities in the UK & European tech sector with an aggregate pipeline value of $295,000. Oxford Quantum Computing Lab is progressing at 85% probability with scheduled proposal sign-off this quarter.`,
    suggestedActions: [
      'Schedule follow-up call with Dr. Vivienne Vance regarding 25-seat server license',
      'Send custom pricing tier to Zurich BioTech Consortium',
      'Trigger Day-3 Automated Masterclass Nurture for 12 new applicants'
    ],
    relevantContacts: [profiles[0]?.id || 'cust-1', profiles[1]?.id || 'cust-2']
  });

  const [simulatedDraft, setSimulatedDraft] = useState<string>(
    `Dear Dr. Vance,\n\nFollowing our review of Oxford Quantum's deployment specifications, we have prepared the sovereign encryption key modules and customized institutional terms. You can review the attached hardware benchmark and confirm deployment timing at your convenience.\n\nBest regards,\n${activeProfile.displayName}\nOMNI Enterprise Solutions`
  );
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;

    setQueryResponse({
      answer: `Analysis complete for: "${nlQuery}". Synthesized 5 customer records, 4 pipeline deals, and 12 recent communications. Projected conversion velocity has increased by +18.4% this month.`,
      suggestedActions: [
        'Review qualified proposals for enterprise software tier',
        'Assign pending SLA ticket #SR-8842 to lead specialist',
        'Generate executive summary report for Q3 commercial pipeline'
      ],
      relevantContacts: [profiles[0]?.id || 'cust-1']
    });
    setNlQuery('');
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(simulatedDraft);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div id="omni-ai-business-assistant-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5 text-indigo-400" />
                OMNI AI BUSINESS INTELLIGENCE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                HUMAN-IN-THE-LOOP ASSISTANT
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              AI Sales Copilot, Deal Probability & Query Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Execute conversational natural language CRM queries, generate high-converting personalized email & chat drafts, calculate win probability vectors, and detect customer churn signals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-right">
              <span className="text-[10px] text-indigo-300 font-semibold block">AI Recommendations</span>
              <span className="text-lg font-bold text-white font-mono">14 Active Signals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Natural Language Query Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <form onSubmit={handleQuerySubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Sparkles className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ask OMNI AI anything (e.g., 'Summarize enterprise leads closing this month', 'Find high churn risks')..."
              value={nlQuery}
              onChange={e => setNlQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Query CRM</span>
          </button>
        </form>

        {queryResponse && (
          <div className="mt-4 p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl space-y-3 animate-fade-in">
            <div className="text-xs font-semibold text-indigo-200 leading-relaxed">
              {queryResponse.answer}
            </div>

            <div className="pt-2 border-t border-indigo-500/20 space-y-1.5">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                Suggested Actions:
              </span>
              <div className="space-y-1">
                {queryResponse.suggestedActions.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid: Left AI Drafts Generator, Right Predictive Win Vectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Response Drafter (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <Bot className="w-4 h-4 text-indigo-400" />
              AI Drafted Communications & Pitch Deck
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Model: OMNI-Intelligence v4</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Generated Outbound Proposal Draft:</label>
            <textarea
              rows={8}
              value={simulatedDraft}
              onChange={e => setSimulatedDraft(e.target.value)}
              className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-slate-500 italic">
              * Human review and sign-off required prior to dispatch.
            </span>
            <button
              onClick={handleCopyDraft}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              {copiedNotification ? <CheckCircle2 className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedNotification ? 'Copied to Clipboard!' : 'Copy Draft'}</span>
            </button>
          </div>
        </div>

        {/* Right: AI Opportunity Ranking & Win Probabilities (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Predictive Opportunity Ranking & Velocity
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Top 3 Closing Deals</span>
          </div>

          <div className="space-y-3">
            {deals.slice(0, 3).map(deal => (
              <div
                key={deal.id}
                className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{deal.title}</h4>
                    <span className="text-[11px] text-slate-400">{deal.companyName || deal.contactName}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    ${deal.valueUsd.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">AI Win Probability</span>
                    <span className="text-indigo-400 font-bold font-mono">{deal.probabilityPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${deal.probabilityPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Target Close: <strong className="text-slate-300">{deal.expectedCloseDate}</strong></span>
                  <button
                    onClick={() => onOpenCustomer360(deal.contactId)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <span>View Customer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 flex items-start gap-2 text-[10px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>OMNI AI Boundary Guarantee:</strong> AI models generate probability vectors and contextual drafts. Final transaction settlement, credit limit assignment, and binding contract execution strictly require human verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
