import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Users,
  Flame,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniBusinessAiInsight, OmniLeadScoreCard } from '../../../types/omni_social_ai';

export const OmniBusinessAiView: React.FC = () => {
  const [insights, setInsights] = useState<OmniBusinessAiInsight[]>(omniSocialAiEngine.getBusinessInsights());
  const [leadScores, setLeadScores] = useState<OmniLeadScoreCard[]>(omniSocialAiEngine.getLeadScoreCards());
  const [coachingAlert, setCoachingAlert] = useState<string | null>(null);

  const handleTriggerCoaching = (dealId: string) => {
    const response = omniSocialAiEngine.triggerDealCoaching(dealId);
    setCoachingAlert(response);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Business AI & Sales Copilot</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  CRM + Finance OS Integrated
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Predictive sales forecasting, automated lead qualification, and real-time ledger revenue attribution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Pipeline Revenue Influenced</div>
              <div className="text-lg font-bold text-emerald-400">$95,000 ARR</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Win Rate Optimization</div>
              <div className="text-lg font-bold text-white">+38.4%</div>
            </div>
          </div>
        </div>
      </div>

      {coachingAlert && (
        <div className="p-4 bg-indigo-950/90 border border-indigo-500 text-indigo-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          {coachingAlert}
        </div>
      )}

      {/* AI Business Insights & Upsell Opportunities */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">Revenue Expansion & Churn Prevention Insights</h3>
            <p className="text-xs text-slate-400">Synthesized from customer communication frequency, product usage spikes, and ledger invoices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map(ins => (
            <div
              key={ins.id}
              className={`p-5 rounded-xl border ${
                ins.insightCategory === 'upsell_opportunity'
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" /> {ins.companyName}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    ins.insightCategory === 'upsell_opportunity'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {ins.insightCategory.replace('_', ' ')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2">{ins.headline}</h4>
              <p className="text-xs text-slate-300 mb-3">{ins.summary}</p>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 mb-3">
                <div className="text-[10px] font-bold text-indigo-300 uppercase mb-0.5">Recommended AI Action</div>
                <p className="text-xs text-slate-300">{ins.recommendedAction}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-emerald-400 font-bold">
                  Potential Impact: +${ins.potentialRevenueImpact.toLocaleString()}
                </span>
                <button
                  onClick={() => handleTriggerCoaching(ins.associatedDeals[0]?.dealId || 'deal_01')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Trigger AI Deal Coach
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Lead Scoring & Conversation Summaries */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-400" />
          <div>
            <h3 className="text-base font-bold text-white">AI Lead Scoring & Intent Analysis</h3>
            <p className="text-xs text-slate-400">Autonomous qualification scorecards derived from messaging intent and interaction depth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {leadScores.map((lead, idx) => (
            <div key={idx} className="p-5 bg-slate-800/70 border border-slate-700 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{lead.leadName}</h4>
                  <p className="text-xs text-slate-400">{lead.leadCompany} • {lead.leadEmail}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-rose-400">{lead.aiScore}/100 Score</div>
                  <span className="text-[10px] px-2 py-0.5 bg-rose-500/20 text-rose-300 font-bold uppercase rounded">
                    {lead.qualificationLevel.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Conversation Intent Summary</div>
                <p className="text-xs text-slate-300">{lead.conversationSummary}</p>
              </div>

              <div>
                <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">AI-Tailored Sales Pitch</div>
                <p className="text-xs text-slate-300 italic">"{lead.suggestedPitch}"</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700">
                {lead.buyingIntentSignals.map((sig, sIdx) => (
                  <span key={sIdx} className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                    ✓ {sig}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
