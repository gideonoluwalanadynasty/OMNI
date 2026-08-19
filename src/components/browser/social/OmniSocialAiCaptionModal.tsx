import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Check,
  Copy,
  TrendingUp,
  Clock,
  Send,
  RefreshCw,
  Sliders,
  Wand2,
  Share2,
  ArrowRight
} from 'lucide-react';
import { SocialPlatform, GeneratedCaptionVariation, SocialCaptionGenerateParams } from '../../../types/social_hub';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';

interface OmniSocialAiCaptionModalProps {
  isOpen: boolean;
  initialPlatform?: SocialPlatform;
  initialTopic?: string;
  onClose: () => void;
  onSelectVariation: (variation: GeneratedCaptionVariation, platform: SocialPlatform) => void;
}

export const OmniSocialAiCaptionModal: React.FC<OmniSocialAiCaptionModalProps> = ({
  isOpen,
  initialPlatform = 'x',
  initialTopic = '',
  onClose,
  onSelectVariation
}) => {
  const [platform, setPlatform] = useState<SocialPlatform>(initialPlatform);
  const [topic, setTopic] = useState(initialTopic || 'Announcing OMNI Sovereign OS zero-knowledge browser and AI copilot');
  const [tone, setTone] = useState<SocialCaptionGenerateParams['tone']>('viral_punchy');
  const [targetAudience, setTargetAudience] = useState('Tech Founders, Developers & Privacy Advocates');
  const [callToAction, setCallToAction] = useState<SocialCaptionGenerateParams['callToAction']>('link_in_bio');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [brandVoice, setBrandVoice] = useState('Authoritative, Visionary, Modern, Developer-Centric');

  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<GeneratedCaptionVariation[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const results = await omniSocialService.generateAiCaptions({
        topic: topic.trim(),
        platform,
        tone,
        targetAudience,
        callToAction,
        includeHashtags,
        includeEmojis,
        brandVoice
      });
      setVariations(results);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (v: GeneratedCaptionVariation) => {
    navigator.clipboard.writeText(v.fullCaption);
    setCopiedId(v.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
      <div className="w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-100">OMNI AI Social Caption & Hook Crafter</h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-[10px] font-semibold border border-indigo-800 font-mono">
                  Autonomous Multi-Engine
                </span>
              </div>
              <p className="text-xs text-stone-400">Generate high-converting, platform-tailored social copy with viral retention prediction.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (2 Columns) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {/* Controls Panel (5 cols) */}
          <div className="md:col-span-5 p-5 space-y-4 bg-stone-950/40">
            {/* Target Platform Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Target Social Platform</label>
              <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(plat => {
                  const isSelected = platform === plat;
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setPlatform(plat)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/50'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                      }`}
                    >
                      <OmniSocialPlatformBadge platform={plat} showName={false} size="sm" />
                      <span className="truncate">{PLATFORM_METADATA[plat].name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Post Topic / Core Message</label>
              <textarea
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="What is this post about? (e.g. New feature launch, engineering breakdown, industry commentary)..."
                className="w-full h-20 p-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Tone Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Voice & Tone</label>
              <select
                value={tone}
                onChange={e => setTone(e.target.value as any)}
                className="w-full p-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="viral_punchy">⚡ Viral & Punchy (High Retention Hook)</option>
                <option value="professional">👔 Professional & Thought Leadership</option>
                <option value="storytelling">📖 Behind-the-Scenes Storytelling</option>
                <option value="educational">🎓 Step-by-Step Educational Breakdown</option>
                <option value="provocative">🔥 Provocative & Contrarian Debate</option>
                <option value="casual">☕ Casual, Friendly & Community-First</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                className="w-full p-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-4 pt-1 text-xs text-stone-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHashtags}
                  onChange={e => setIncludeHashtags(e.target.checked)}
                  className="rounded border-stone-700 bg-stone-900 text-indigo-600 focus:ring-0"
                />
                <span>Include Hashtags</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEmojis}
                  onChange={e => setIncludeEmojis(e.target.checked)}
                  className="rounded border-stone-700 bg-stone-900 text-indigo-600 focus:ring-0"
                />
                <span>Include Emojis</span>
              </label>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Multi-Hook Variations...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate 3 High-Impact Variations</span>
                </>
              )}
            </button>
          </div>

          {/* Results Panel (7 cols) */}
          <div className="md:col-span-7 p-5 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <OmniSocialPlatformBadge platform={platform} size="md" />
                <span className="text-xs text-stone-400 font-mono">Max {PLATFORM_METADATA[platform].maxChars} chars</span>
              </div>
              <span className="text-xs text-stone-400">
                {variations.length > 0 ? `${variations.length} Variations Generated` : 'Ready to synthesize'}
              </span>
            </div>

            {isGenerating ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-800 flex items-center justify-center mx-auto text-indigo-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-sm font-bold text-stone-200">OMNI AI is crafting high-conversion copy...</div>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Analyzing platform algorithms, formatting line breaks, and calculating viral retention hooks.
                </p>
              </div>
            ) : variations.length === 0 ? (
              <div className="py-14 text-center space-y-3 bg-stone-950/30 border border-dashed border-stone-800 rounded-2xl p-6">
                <Wand2 className="w-8 h-8 text-stone-600 mx-auto" />
                <div className="text-xs font-semibold text-stone-300">No Captions Generated Yet</div>
                <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                  Select your platform, adjust your tone preferences, and click &ldquo;Generate 3 High-Impact Variations&rdquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {variations.map((v, idx) => (
                  <div
                    key={v.id}
                    className="p-4 bg-stone-950/90 border border-stone-800 hover:border-indigo-700/80 rounded-2xl space-y-3 transition-all group"
                  >
                    {/* Variation Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] font-bold">
                          Option {idx + 1}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{v.viralPredictionScore}/100 Viral Score</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(v)}
                          className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                          title="Copy Full Caption"
                        >
                          {copiedId === v.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            onSelectVariation(v, platform);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          <span>Use in Composer</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Hook Callout */}
                    <div className="p-2.5 bg-stone-900/90 rounded-xl border border-indigo-950 text-xs">
                      <span className="font-bold text-indigo-300">Hook: </span>
                      <span className="text-stone-200">{v.hook}</span>
                    </div>

                    {/* Caption Preview */}
                    <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-xs text-stone-200 whitespace-pre-wrap leading-relaxed font-sans">
                      {v.fullCaption}
                    </div>

                    {/* Metadata Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Clock className="w-3 h-3" />
                        <span>Optimal: {v.suggestedOptimalTime}</span>
                      </div>
                      <div className="font-mono text-stone-500">
                        {v.characterCount} / {v.platformMaxChars} chars
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
