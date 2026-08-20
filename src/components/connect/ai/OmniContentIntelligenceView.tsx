import React, { useState } from 'react';
import {
  Compass,
  TrendingUp,
  Flame,
  Hash,
  Sparkles,
  BarChart3,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniContentTrendItem } from '../../../types/omni_social_ai';

export const OmniContentIntelligenceView: React.FC = () => {
  const [trends, setTrends] = useState<OmniContentTrendItem[]>(omniSocialAiEngine.getContentTrends());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTrends = trends.filter(trend => {
    const matchesCat = activeCategory === 'all' || trend.category === activeCategory;
    const matchesSearch = trend.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.topHashtags.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Content Intelligence Engine</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full">
                  Semantic Trend Detector
                </span>
              </div>
              <p className="text-sm text-slate-400">Real-time viral velocity scoring, topic clustering, and unbiased recommendation weights</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Trending Topics Tracked</div>
              <div className="text-lg font-bold text-violet-400">1,480 Topics</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Velocity Refresh Rate</div>
              <div className="text-lg font-bold text-white">Sub-Minute</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search trending topics, hashtags, or sentiment keywords..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'technology', 'creator_economy', 'lifestyle', 'finance'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTrends.map(trend => (
          <div key={trend.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded border border-violet-500/30">
                  {trend.category.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> {trend.velocityScore}/100 Velocity
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{trend.topic}</h3>
              <div className="text-xs font-semibold text-emerald-400 mb-3 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +{trend.volumeGrowthPercent}% Volume (Last 24h)
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 mb-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sentiment & Discussion Vector</div>
                <p className="text-xs text-slate-300">{trend.sentimentSummary}</p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-lg border border-violet-500/30 mb-3">
                <div className="text-[10px] font-bold text-violet-300 uppercase mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommended Creator Angle
                </div>
                <p className="text-xs text-slate-200 italic">"{trend.recommendedAngleForCreators}"</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
              {trend.topHashtags.map((ht, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  {ht}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
