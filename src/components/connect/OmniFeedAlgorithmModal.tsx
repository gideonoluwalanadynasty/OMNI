import React, { useState } from 'react';
import {
  Sliders,
  X,
  Sparkles,
  Users,
  Heart,
  Clock,
  Briefcase,
  Shield,
  EyeOff,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Tag,
  AtSign
} from 'lucide-react';
import { FeedAlgorithmConfig } from '../../types/omni_social_engine';

interface Props {
  config: FeedAlgorithmConfig;
  onUpdateConfig: (updates: Partial<FeedAlgorithmConfig>) => void;
  onMuteTopic: (topic: string) => void;
  onUnmuteTopic: (topic: string) => void;
  onMuteUser: (handle: string) => void;
  onUnmuteUser: (handle: string) => void;
  onClose: () => void;
}

export const OmniFeedAlgorithmModal: React.FC<Props> = ({
  config,
  onUpdateConfig,
  onMuteTopic,
  onUnmuteTopic,
  onMuteUser,
  onUnmuteUser,
  onClose
}) => {
  const [localConfig, setLocalConfig] = useState<FeedAlgorithmConfig>({ ...config });
  const [newTopicInput, setNewTopicInput] = useState('');
  const [newUserHandleInput, setNewUserHandleInput] = useState('');

  const handleSliderChange = (key: keyof FeedAlgorithmConfig, value: number) => {
    const updated = { ...localConfig, [key]: value };
    setLocalConfig(updated);
    onUpdateConfig({ [key]: value });
  };

  const handleModeChange = (mode: FeedAlgorithmConfig['currentMode']) => {
    const updated = { ...localConfig, currentMode: mode };
    setLocalConfig(updated);
    onUpdateConfig({ currentMode: mode });
  };

  const handleResetDefaults = () => {
    const defaults: FeedAlgorithmConfig = {
      relationshipWeight: 35,
      interestWeight: 25,
      engagementVelocityWeight: 20,
      freshnessDecayWeight: 10,
      communityBoostWeight: 5,
      businessRelevanceWeight: 5,
      currentMode: 'algorithmic',
      mutedTopics: [],
      mutedUsers: [],
      hiddenPostIds: []
    };
    setLocalConfig(defaults);
    onUpdateConfig(defaults);
  };

  const handleAddMutedTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicInput.trim()) return;
    onMuteTopic(newTopicInput.trim());
    setNewTopicInput('');
  };

  const handleAddMutedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserHandleInput.trim()) return;
    onMuteUser(newUserHandleInput.trim());
    setNewUserHandleInput('');
  };

  return (
    <div
      id="omni-feed-algorithm-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                OMNI Feed Recommendation Engine Architecture
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                  User Sovereign
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Configure mathematical signal weights, privacy filters, and content preferences in real-time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* Feed Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              1. Feed Stream Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'algorithmic', label: 'Algorithmic (Personalized)', desc: 'Weighted multi-signal recommendation' },
                { id: 'following', label: 'Following Only', desc: 'Direct accounts you follow' },
                { id: 'relationships_circles', label: 'Circles & Relationships', desc: 'Direct trust graph and circles' },
                { id: 'media_only', label: 'Media Stream', desc: 'Photos, videos, and galleries only' },
                { id: 'chronological', label: 'Pure Chronological', desc: 'Newest to oldest zero algorithm' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    localConfig.currentMode === m.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs text-white mb-0.5">{m.label}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Signal Weight Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                2. Algorithmic Signal Weights
              </label>
              <button
                onClick={handleResetDefaults}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset Defaults
              </button>
            </div>

            {/* Slider 1: Relationship Strength */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" /> Relationship Strength & Graph Proximity
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px]">
                  {localConfig.relationshipWeight}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Boosts posts authored by first-degree connections, mutual circle members, and frequent collaborators.
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={localConfig.relationshipWeight}
                onChange={e => handleSliderChange('relationshipWeight', parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Slider 2: Interest & Topic Affinity */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-400" /> Interest & Sovereign Topic Affinity
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[11px]">
                  {localConfig.interestWeight}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Matches your historical interactions with topics like #SovereignTech, #Fintech, #Web5, and AI rails.
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={localConfig.interestWeight}
                onChange={e => handleSliderChange('interestWeight', parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Slider 3: Engagement Velocity */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" /> Engagement Velocity & Discussion Depth
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px]">
                  {localConfig.engagementVelocityWeight}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Surfaces viral threads with rapid comment velocity, high share ratios, and meaningful conversation trees.
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={localConfig.engagementVelocityWeight}
                onChange={e => handleSliderChange('engagementVelocityWeight', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Slider 4: Freshness Decay */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" /> Freshness & Time Decay Penalty
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px]">
                  {localConfig.freshnessDecayWeight}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Applies exponential time decay to older posts, ensuring breaking developments appear immediately at the top.
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={localConfig.freshnessDecayWeight}
                onChange={e => handleSliderChange('freshnessDecayWeight', parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Slider 5: Community Boost */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" /> Community Membership & Guild Announcements
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[11px]">
                  {localConfig.communityBoostWeight}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Boosts announcements from registered church hubs, developer DAOs, and creator channels you belong to.
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={localConfig.communityBoostWeight}
                onChange={e => handleSliderChange('communityBoostWeight', parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Slider 6: Business Relevance */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-400" /> Business Deals & Verified Badging Multiplier
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-[11px]">
                  {localConfig.businessRelevanceWeight}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Prioritizes high-trust verified sovereign accounts, enterprise release briefs, and CRM deals.
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={localConfig.businessRelevanceWeight}
                onChange={e => handleSliderChange('businessRelevanceWeight', parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Muted Topics & Muted Users Management */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              3. User Content Controls (Mute & Hide)
            </label>

            {/* Muted Topics */}
            <div className="space-y-2">
              <span className="font-semibold text-slate-300">Muted Hashtags & Topics</span>
              <form onSubmit={handleAddMutedTopic} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. politics, drama"
                  value={newTopicInput}
                  onChange={e => setNewTopicInput(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white transition-colors"
                >
                  Mute Topic
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {config.mutedTopics.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">No topics currently muted.</span>
                ) : (
                  config.mutedTopics.map(topic => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950/40 text-rose-300 border border-rose-800/40 flex items-center gap-1"
                    >
                      #{topic}
                      <button
                        onClick={() => onUnmuteTopic(topic)}
                        className="hover:text-white p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Muted Users */}
            <div className="space-y-2 pt-2">
              <span className="font-semibold text-slate-300">Muted Handles</span>
              <form onSubmit={handleAddMutedUser} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. @spammer_user"
                  value={newUserHandleInput}
                  onChange={e => setNewUserHandleInput(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white transition-colors"
                >
                  Mute User
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {config.mutedUsers.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">No user handles currently muted.</span>
                ) : (
                  config.mutedUsers.map(user => (
                    <span
                      key={user}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/40 text-amber-300 border border-amber-800/40 flex items-center gap-1"
                    >
                      {user}
                      <button
                        onClick={() => onUnmuteUser(user)}
                        className="hover:text-white p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Real-time signal recalculation active
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
