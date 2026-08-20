import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Send,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Award,
  AlertCircle,
  ArrowRight,
  BarChart3,
  PieChart,
  HelpCircle,
  Zap,
  Users,
  Briefcase
} from 'lucide-react';
import { OmniAiAnalyticsQuery } from '../../../types/omni_discovery';
import { SEED_AI_ANALYTICS_QUERIES } from './discoveryData';

export const OmniAiAnalyticsAssistant: React.FC = () => {
  const [queries, setQueries] = useState<OmniAiAnalyticsQuery[]>(SEED_AI_ANALYTICS_QUERIES);
  const [inputText, setInputText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [executedActionMsg, setExecutedActionMsg] = useState<string | null>(null);

  const samplePrompts = [
    'Why did engagement drop on Tuesday?',
    'What content performed best this month?',
    'Which customers need follow-up right now?',
    'How do I scale 30-day community retention past 70%?',
    'What is our projected ROAS for Q4 ad campaigns?'
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    // Check if query exists in seed
    const existing = SEED_AI_ANALYTICS_QUERIES.find(
      q => q.question.toLowerCase().includes(promptText.toLowerCase()) || promptText.toLowerCase().includes(q.question.toLowerCase())
    );

    setIsGenerating(true);
    setInputText('');

    setTimeout(() => {
      if (existing) {
        setQueries(prev => [existing, ...prev.filter(q => q.id !== existing.id)]);
      } else {
        const newQuery: OmniAiAnalyticsQuery = {
          id: `query_${Date.now()}`,
          question: promptText,
          timestamp: new Date().toISOString(),
          answerMarkdown: `### 🤖 Gemini 2.5 Analytics Synthesis\n\nBased on real-time ecosystem telemetry across your profiles, storefronts, and spaces:\n\n1. **Core Diagnostic**: Evaluated 14,280 data points across the selected timeframe. Performance metrics reflect strong health with a **+18.4% WoW lift**.\n2. **Optimization Vector**: Prioritize short-form interactive tutorials with embedded call-to-actions, as they yield **3.4x higher conversion**.\n3. **Network Effect**: Cross-posting to OMNI Spaces generates 42% of first-hour viral distribution.`,
          keyInsights: [
            'Optimal publishing cadence is 3x weekly between 14:00 - 16:00 UTC',
            'Sovereign escrow storefronts convert 2.1x faster than external redirect links',
            'Community member onboarding automations decrease D7 churn by 22%'
          ],
          recommendedActions: [
            {
              title: 'Apply Automated Publishing Cadence',
              description: 'Sync your content queue to recommended high-velocity subscriber time windows.',
              impactLevel: 'high',
              actionPayload: 'apply_cadence'
            },
            {
              title: 'Enable 1-Click Escrow Direct Checkout',
              description: 'Attach native OMNI Finance escrow payment blocks to high-performing product posts.',
              impactLevel: 'medium',
              actionPayload: 'enable_escrow_blocks'
            }
          ],
          chartType: 'bar',
          chartData: [
            { period: 'Mon', metric: 78 },
            { period: 'Tue', metric: 84 },
            { period: 'Wed', metric: 95 },
            { period: 'Thu', metric: 91 }
          ]
        };
        setQueries(prev => [newQuery, ...prev]);
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleExecuteAction = (action: { title: string; description: string }) => {
    setExecutedActionMsg(`Executed: "${action.title}". Strategy parameters updated.`);
    setTimeout(() => setExecutedActionMsg(null), 3500);
  };

  return (
    <div className="space-y-6" id="omni-ai-analytics-assistant-container">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/60 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Gemini 2.5 Analytics Copilot
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                Real-Time Telemetry Grounding
              </span>
            </div>
            <h2 className="text-xl font-black text-white">AI Analytics Assistant & Root-Cause Engine</h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Ask natural language diagnostic questions to isolate engagement anomalies, identify top-performing viral formats, and surface high-value customers needing follow-up.
            </p>
          </div>

          <div className="text-right text-[11px] text-slate-400 font-mono bg-slate-950/60 p-3 rounded-2xl border border-slate-800 self-start md:self-auto">
            <span className="text-indigo-400 font-bold block">Latency: &lt;18ms</span>
            <span>Zero Foundation Retraining</span>
          </div>
        </div>

        {/* Query Input Bar */}
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendPrompt(inputText);
            }}
            placeholder="Ask AI Copilot: 'Why did engagement drop?', 'What content performed best?', 'Which customers need follow-up?'..."
            className="w-full pl-4 pr-24 py-3.5 bg-slate-950/90 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
          />
          <button
            onClick={() => handleSendPrompt(inputText)}
            disabled={isGenerating || !inputText.trim()}
            className="absolute inset-y-2 right-2 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
          >
            {isGenerating ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Suggested Quick Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-slate-400 text-[11px] font-semibold">Suggested Questions:</span>
          {samplePrompts.map(p => (
            <button
              key={p}
              onClick={() => handleSendPrompt(p)}
              className="px-3 py-1 rounded-xl bg-slate-950/80 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-200 text-xs transition-all"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Action Notification Toast */}
      {executedActionMsg && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {executedActionMsg}
        </div>
      )}

      {/* Query Responses List */}
      <div className="space-y-6">
        {queries.map(q => (
          <div
            key={q.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* User Question Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{q.question}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(q.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Gemini 2.5 Diagnostic Engine
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Verified Grounding
              </span>
            </div>

            {/* AI Answer Content */}
            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {q.answerMarkdown}
            </div>

            {/* Key Insights & Highlights */}
            {q.keyInsights && q.keyInsights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Intelligence Insights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {q.keyInsights.map((ins, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Chart Snapshot if present */}
            {q.chartData && q.chartData.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Telemetry Data Snapshot</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {q.chartData.map((d: any, idx: number) => (
                    <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">{d.day || d.name || d.stage || d.period}</span>
                      <span className="text-sm font-bold text-emerald-400">{d.engagement || d.value || d.count || d.metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended 1-Click Action Items */}
            {q.recommendedActions && q.recommendedActions.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Actionable Strategy & 1-Click Execution
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.recommendedActions.map((act, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-white">{act.title}</h5>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            act.impactLevel === 'high' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                          }`}>
                            {act.impactLevel} Impact
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{act.description}</p>
                      </div>

                      <button
                        onClick={() => handleExecuteAction(act)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all self-start"
                      >
                        <span>Apply Recommendation</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
