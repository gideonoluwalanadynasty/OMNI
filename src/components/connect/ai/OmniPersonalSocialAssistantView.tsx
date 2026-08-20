import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Filter,
  UserPlus,
  Compass,
  AlertCircle
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniDailyActivitySummary, OmniSuggestedConnection } from '../../../types/omni_social_ai';

export const OmniPersonalSocialAssistantView: React.FC = () => {
  const [summary, setSummary] = useState<OmniDailyActivitySummary>(omniSocialAiEngine.getDailySummary());
  const [suggestions, setSuggestions] = useState<OmniSuggestedConnection[]>(omniSocialAiEngine.getSuggestedConnections());
  const [activeTimeframe, setActiveTimeframe] = useState<'today' | 'this_week' | 'yesterday'>('today');
  const [customPrompt, setCustomPrompt] = useState('');
  const [customResponse, setCustomResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTimeframeChange = (tf: 'today' | 'this_week' | 'yesterday') => {
    setActiveTimeframe(tf);
    const updated = omniSocialAiEngine.refreshDailyRecap(tf);
    setSummary(updated);
  };

  const handleConnect = (id: string) => {
    omniSocialAiEngine.connectUser(id);
    setSuggestions([...omniSocialAiEngine.getSuggestedConnections()]);
  };

  const handleDismiss = (id: string) => {
    omniSocialAiEngine.dismissConnection(id);
    setSuggestions([...omniSocialAiEngine.getSuggestedConnections()]);
  };

  const handleAskAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setCustomResponse(
        `AI Social Assistant: Based on your recent graph interactions and 3 active Spaces, here is the answer regarding "${customPrompt}": You have 2 unread messages from enterprise partners, 1 upcoming townhall at 4 PM EST, and your engagement in the AI Research Syndicate has grown by 34% this week.`
      );
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Daily Recap Master Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Personal Social Assistant</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Active by Default
                </span>
              </div>
              <p className="text-sm text-slate-400">Contextual daily recap, unread prioritization, and interest-graph discovery</p>
            </div>
          </div>

          {/* Timeframe Toggle Buttons */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            {(['today', 'yesterday', 'this_week'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTimeframe === tf
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf === 'today' ? 'Today' : tf === 'yesterday' ? 'Yesterday' : 'This Week'}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Headline Summary Banner */}
        <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                Executive Social Synthesis ({activeTimeframe.replace('_', ' ').toUpperCase()})
              </div>
              <p className="text-base font-semibold text-white">{summary.headline}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-indigo-300/80">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Updated just now
                </span>
                <span>•</span>
                <span>AI Confidence: {summary.aiConfidenceScore}%</span>
                <span>•</span>
                <span className="text-amber-300 font-semibold">{summary.unreadMessagesCount} Unread Priority Items</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Recap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Priority Messages */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> High-Priority DMs
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded-full font-bold">
                {summary.highPriorityMessages.length} Urgent
              </span>
            </div>
            <div className="space-y-3">
              {summary.highPriorityMessages.map((msg, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img src={msg.senderAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs font-semibold text-white">{msg.senderName}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{msg.snippet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community & Space Updates */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Space Highlights
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">
                {summary.communityUpdates.length} Active
              </span>
            </div>
            <div className="space-y-3">
              {summary.communityUpdates.map((sp, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white truncate">{sp.spaceName}</span>
                    <span className="text-[10px] text-slate-400">{sp.memberCount} members</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{sp.updateSummary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Upcoming Events
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-bold">
                {summary.upcomingEvents.length} Scheduled
              </span>
            </div>
            <div className="space-y-3">
              {summary.upcomingEvents.map((evt, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-md">
                  <span className="text-xs font-semibold text-white block truncate mb-1">{evt.title}</span>
                  <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {evt.startTime}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 truncate">{evt.locationOrLink}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Natural Language Prompt Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <form onSubmit={handleAskAssistant} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder='Ask your assistant: "What did I miss today?" or "Summarize recent space conversations..."'
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-all shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? 'Synthesizing...' : 'Ask AI'}
            </button>
          </form>

          {customResponse && (
            <div className="mt-3 p-3.5 bg-slate-950/80 border border-indigo-500/30 rounded-lg text-sm text-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Instant AI Response
              </div>
              <p>{customResponse}</p>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Connections via Neural Interest Graph */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">AI-Recommended Connections</h3>
              <p className="text-xs text-slate-400">Grounded in verified shared interests, mutual circles, and collaborative space interactions</p>
            </div>
          </div>
          <span className="text-xs text-slate-400">Match score threshold: &gt; 85%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map(sug => (
            <div key={sug.id} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img src={sug.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{sug.name}</h4>
                    <p className="text-xs text-slate-400">{sug.handle}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-md">
                      {sug.matchScore}% Match
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mb-2">{sug.roleOrBio}</p>

                <div className="p-2 bg-slate-900/80 rounded border border-slate-800 mb-3">
                  <div className="text-[10px] font-bold text-indigo-300 uppercase mb-0.5">Why Recommended</div>
                  <p className="text-[11px] text-slate-400">{sug.reason}</p>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {sug.commonInterests.map((interest, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-slate-900 text-[10px] text-slate-300 rounded border border-slate-800">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                {sug.connectionStatus === 'connected' ? (
                  <span className="w-full py-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Request Sent
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleConnect(sug.id)}
                      className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Connect
                    </button>
                    <button
                      onClick={() => handleDismiss(sug.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Dismiss
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
