import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  CheckCircle,
  FileText,
  Plus,
  ArrowRight,
  Lock
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniCommunityIntelligence } from '../../../types/omni_social_ai';

export const OmniCommunityAiView: React.FC = () => {
  const [intel, setIntel] = useState<OmniCommunityIntelligence>(omniSocialAiEngine.getCommunityIntelligence());
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleToggleAutoWelcome = () => {
    const newState = !intel.onboardingAssistant.autoWelcomeEnabled;
    omniSocialAiEngine.toggleAutoWelcome(newState);
    setIntel({ ...omniSocialAiEngine.getCommunityIntelligence() });
    setActionSuccess(`Automated Onboarding Welcome Bot is now ${newState ? 'ENABLED' : 'DISABLED'}.`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleResolveAlert = (alertId: string) => {
    omniSocialAiEngine.resolveModeratorAlert(alertId);
    setIntel({ ...omniSocialAiEngine.getCommunityIntelligence() });
    setActionSuccess('Moderator alert resolved and logged to trust audit.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    omniSocialAiEngine.addAutomatedFaq(newFaqQ, newFaqA);
    setIntel({ ...omniSocialAiEngine.getCommunityIntelligence() });
    setNewFaqQ('');
    setNewFaqA('');
    setShowFaqModal(false);
    setActionSuccess('New Automated Community FAQ added to vector memory.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {actionSuccess && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          {actionSuccess}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Community AI</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Space & Hub Intelligence
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Automated member onboarding, community Q&A vector retrieval, trending topic synthesis & moderator co-pilot
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Active in Space:</span>
            <span className="px-3 py-1.5 bg-slate-800 text-white font-bold text-xs rounded-lg border border-slate-700">
              {intel.spaceName} ({intel.memberCount.toLocaleString()} members)
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Onboarding Assistant & Moderator Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automated Member Onboarding */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Member Onboarding Assistant</h3>
            </div>
            <button
              onClick={handleToggleAutoWelcome}
              className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
                intel.onboardingAssistant.autoWelcomeEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {intel.onboardingAssistant.autoWelcomeEnabled ? 'Auto-Welcome: ON' : 'Auto-Welcome: OFF'}
            </button>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Welcome Message Template</div>
            <p className="text-xs text-slate-300 italic">"{intel.onboardingAssistant.welcomeMessageTemplate}"</p>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Recommended Space Resources
            </div>
            <div className="space-y-2">
              {intel.onboardingAssistant.recommendedResources.map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-800/70 border border-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-white">{res.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-900 text-emerald-300 font-bold rounded">
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Moderator Copilot & Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Space Moderator Alerts</h3>
            </div>
            <span className="text-xs text-amber-300 font-bold">
              {intel.moderatorAlerts.filter(a => a.status === 'pending').length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {intel.moderatorAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-lg border ${
                  alert.status === 'resolved'
                    ? 'bg-slate-950/40 border-slate-800 opacity-60'
                    : 'bg-slate-950 border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{alert.threadTitle}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 font-bold uppercase rounded">
                    {alert.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">Author: {alert.authorName}</div>
                <div className="p-2 bg-slate-900 rounded text-xs text-slate-300 mb-2 border border-slate-800">
                  <span className="text-emerald-400 font-semibold">AI Recommendation:</span> {alert.aiRecommendation}
                </div>

                {alert.status === 'pending' && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Execute & Resolve
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Topics & Community FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Discussion Topics */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Trending Community Discussions</h3>
          </div>

          <div className="space-y-3">
            {intel.trendingTopics.map((topic, idx) => (
              <div key={idx} className="p-3 bg-slate-800/70 border border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-teal-300">{topic.tag}</span>
                  <span className="text-xs font-bold text-slate-300">{topic.mentionCount} mentions</span>
                </div>
                <p className="text-xs text-slate-300">{topic.sampleDiscussion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Automated FAQs & Vector Answers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Automated Space FAQs (Vector RAG)</h3>
            </div>
            <button
              onClick={() => setShowFaqModal(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {intel.automatedFaqs.map((faq, idx) => (
              <div key={idx} className="p-3 bg-slate-800/70 border border-slate-700 rounded-lg">
                <div className="text-xs font-bold text-white mb-1">Q: {faq.question}</div>
                <div className="text-xs text-indigo-200 bg-slate-950/70 p-2 rounded border border-slate-800">
                  <span className="font-semibold text-indigo-400">AI Answer:</span> {faq.aiAnswer}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Answered autonomously {faq.timesAsked} times</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Add Automated Space FAQ</h3>
            <form onSubmit={handleAddFaq} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Question</label>
                <input
                  type="text"
                  value={newFaqQ}
                  onChange={e => setNewFaqQ(e.target.value)}
                  placeholder="e.g. How do I upgrade my space tier?"
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">AI Verified Answer</label>
                <textarea
                  value={newFaqA}
                  onChange={e => setNewFaqA(e.target.value)}
                  placeholder="The precise answer for vector retrieval..."
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-xs text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 text-xs text-white font-bold rounded"
                >
                  Save to Vector Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
