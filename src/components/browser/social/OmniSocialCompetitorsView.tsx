import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Plus,
  ShieldAlert,
  ArrowUpRight,
  Eye,
  Zap,
  Target,
  Wand2,
  Lightbulb,
  X
} from 'lucide-react';
import { SocialCompetitor, SocialPlatform } from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';

interface OmniSocialCompetitorsViewProps {
  competitors: SocialCompetitor[];
  onRefreshCompetitors: () => void;
  onUseHookInComposer?: (hook: string) => void;
}

export const OmniSocialCompetitorsView: React.FC<OmniSocialCompetitorsViewProps> = ({
  competitors,
  onRefreshCompetitors,
  onUseHookInComposer
}) => {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Competitor Form
  const [compName, setCompName] = useState('');
  const [compHandle, setCompHandle] = useState('');
  const [compPlatform, setCompPlatform] = useState<SocialPlatform>('x');

  const handleGenerateTeardown = async (comp: SocialCompetitor) => {
    setAnalyzingId(comp.id);
    try {
      const teardown = await omniSocialService.generateCompetitorTeardown(comp.name, comp.platform);
      comp.aiTeardownAnalysis = teardown;
      onRefreshCompetitors();
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim() || !compHandle.trim()) return;

    omniSocialService.addCompetitor({
      name: compName.trim(),
      handle: compHandle.startsWith('@') ? compHandle.trim() : `@${compHandle.trim()}`,
      platform: compPlatform,
      avatarUrl: '',
      followerCount: Math.floor(Math.random() * 500000) + 50000,
      followerGrowthRate30d: parseFloat((Math.random() * 15 + 2).toFixed(1)),
      postingFrequencyWeekly: Math.floor(Math.random() * 20) + 5,
      avgEngagementRate: parseFloat((Math.random() * 2 + 1.5).toFixed(1)),
      topHashtags: ['#SovereignTech', '#AI', '#Security'],
      recentViralPost: {
        content: `Latest announcement and platform roadmap updates on ${compPlatform.toUpperCase()}.`,
        publishedAt: new Date().toISOString(),
        likes: 1420,
        comments: 94,
        shares: 320,
        estimatedReach: 48000,
        contentType: 'post'
      },
      aiTeardownAnalysis: {
        contentStrategySummary: `Focuses on high-frequency announcement snippets on ${compPlatform.toUpperCase()}.`,
        identifiedWeakness: 'Minimal enterprise cryptographic sovereignty or local AI model capabilities.',
        counterStrategyOpportunity: 'Demonstrate zero-telemetry verifiable browser engine superior performance.',
        suggestedHookIdeas: [
          `Why ${compName}'s cloud model puts your data at risk`,
          `How OMNI solves what ${compName} couldn't in 2026`
        ]
      }
    });

    setShowAddModal(false);
    setCompName('');
    setCompHandle('');
    onRefreshCompetitors();
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Competitor Recon Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-100">Competitor Intelligence & Share of Voice</h2>
            <p className="text-xs text-stone-400">
              Benchmark OMNI against industry peers and synthesize automated AI counter-strategies.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Competitor</span>
        </button>
      </div>

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitors.map(comp => {
          const isAnalyzing = analyzingId === comp.id;

          return (
            <div
              key={comp.id}
              className="p-6 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl space-y-5 shadow-xl transition-all"
            >
              {/* Top Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-stone-100">{comp.name}</h3>
                    <OmniSocialPlatformBadge platform={comp.platform} size="sm" />
                  </div>
                  <div className="text-xs text-stone-400 font-mono">{comp.handle}</div>
                </div>

                <button
                  onClick={() => handleGenerateTeardown(comp)}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Wand2 className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : 'text-indigo-400'}`} />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Re-Run AI Teardown'}</span>
                </button>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-4 gap-2 p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                <div>
                  <div className="text-xs font-bold text-stone-100">{(comp.followerCount / 1000).toFixed(0)}k</div>
                  <div className="text-[10px] text-stone-500">Audience</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400">{comp.avgEngagementRate}%</div>
                  <div className="text-[10px] text-stone-500">Avg Eng.</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-200">{comp.postingFrequencyWeekly}/wk</div>
                  <div className="text-[10px] text-stone-500">Cadence</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400">+{comp.followerGrowthRate30d}%</div>
                  <div className="text-[10px] text-stone-500">30d Growth</div>
                </div>
              </div>

              {/* AI Teardown Section */}
              {comp.aiTeardownAnalysis && (
                <div className="p-4 bg-stone-950/80 rounded-xl border border-indigo-950 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>OMNI AI Strategy Teardown & Counter-Offensive</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-rose-400">Identified Vulnerability: </span>
                      <span className="text-stone-300">{comp.aiTeardownAnalysis.identifiedWeakness}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-400">OMNI Counter-Strategy: </span>
                      <span className="text-stone-300">{comp.aiTeardownAnalysis.counterStrategyOpportunity}</span>
                    </div>
                  </div>

                  {/* Viral Hook Ideas */}
                  <div className="pt-2 border-t border-stone-800 space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Suggested Viral Hooks:</span>
                    </span>
                    <div className="space-y-1">
                      {comp.aiTeardownAnalysis.suggestedHookIdeas.map((hook, hIdx) => (
                        <div
                          key={hIdx}
                          className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-200 flex items-center justify-between gap-2"
                        >
                          <span className="italic truncate">&ldquo;{hook}&rdquo;</span>
                          {onUseHookInComposer && (
                            <button
                              onClick={() => onUseHookInComposer(hook)}
                              className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10px] shrink-0"
                            >
                              Use in Post
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Competitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-sm font-bold text-stone-100">Track Competitor on Social</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCompetitor} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-stone-300 font-semibold">Competitor Name</label>
                <input
                  type="text"
                  value={compName}
                  onChange={e => setCompName(e.target.value)}
                  placeholder="e.g. OpenAI / Arc / Brave"
                  required
                  className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-300 font-semibold">Platform</label>
                <select
                  value={compPlatform}
                  onChange={e => setCompPlatform(e.target.value as any)}
                  className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none"
                >
                  {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(p => (
                    <option key={p} value={p}>
                      {PLATFORM_METADATA[p].name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-300 font-semibold">Handle / Profile URL</label>
                <input
                  type="text"
                  value={compHandle}
                  onChange={e => setCompHandle(e.target.value)}
                  placeholder="@competitorhandle"
                  required
                  className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-600/30"
                >
                  Start Tracking & Teardown
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
