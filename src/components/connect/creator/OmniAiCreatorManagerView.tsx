import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  AlertCircle,
  Brain,
  Calendar,
  DollarSign,
  Clock,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { AiCreatorManagerRecommendation } from '../../../types/omni_creator';

interface Props {
  recommendations: AiCreatorManagerRecommendation[];
  onApplyRecommendation: (recId: string) => void;
  onDismissRecommendation: (recId: string) => void;
}

export const OmniAiCreatorManagerView: React.FC<Props> = ({
  recommendations,
  onApplyRecommendation,
  onDismissRecommendation
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState('');

  const handleApply = (rec: AiCreatorManagerRecommendation) => {
    onApplyRecommendation(rec.id);
    setAppliedNotice(`Applied strategy: "${rec.title}"! Automated schedule & workflow updated.`);
    setTimeout(() => setAppliedNotice(''), 5000);
  };

  const handleRunAiAudit = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setAppliedNotice('OMNI AI Creator Manager refreshed audience retention diagnostics and identified 2 new revenue expansion avenues.');
      setTimeout(() => setAppliedNotice(''), 5000);
    }, 1500);
  };

  const filteredRecs = recommendations.filter(r => {
    if (activeFilter === 'all') return true;
    return r.category === activeFilter;
  });

  return (
    <div id="omni-ai-creator-manager-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              PERSONAL AI CREATOR MANAGER (GEMINI 2.5)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ACTIVE REVENUE ADVISORY
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Strategic Growth, Audience Diagnostics & Revenue Scaling
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Your 24/7 dedicated AI business partner continuously analyzes watch times, community comment semantics, and monetization conversion funnels to recommend high-ROI actions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAiAudit}
            disabled={isSynthesizing}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            {isSynthesizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing Audience Semantics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Strategy Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {appliedNotice && (
        <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-indigo-300 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Recommendations' },
          { id: 'monetization', label: 'Monetization Scaling' },
          { id: 'viral_hook', label: 'Viral Hook Optimization' },
          { id: 'pricing_optimization', label: 'Pricing Strategy' },
          { id: 'content_strategy', label: 'Content Calendar' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeFilter === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Recommendations Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecs.map(rec => (
          <div
            key={rec.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    rec.impactLevel === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : rec.impactLevel === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  ⚡ {rec.impactLevel} IMPACT
                </span>

                {rec.estimatedRevenueLiftUsd && (
                  <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +${rec.estimatedRevenueLiftUsd.toLocaleString()} Est. Lift
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{rec.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                💡 <span className="font-bold text-slate-200">Rationale: </span>
                {rec.rationale}
              </p>

              <div className="text-xs text-indigo-300 font-semibold flex items-start gap-1.5">
                <Target className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Action: {rec.actionableStep}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {rec.appliedStatus === 'applied' ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Strategy Applied & Active
                </span>
              ) : (
                <>
                  <button
                    onClick={() => onDismissRecommendation(rec.id)}
                    className="px-3.5 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleApply(rec)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Apply Recommendation (1-Click)</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
