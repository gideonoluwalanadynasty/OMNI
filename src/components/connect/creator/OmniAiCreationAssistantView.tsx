import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  Globe,
  Video,
  FileText,
  Mail,
  Share2,
  TrendingUp,
  Flame,
  Wand2,
  Layers,
  ArrowRight,
  MessageSquare,
  Hash,
  Search,
  Eye,
  Sliders,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { CreatorContentItem, AiRepurposeOutput } from '../../../types/omni_creator';
import { SEED_AI_REPURPOSE_PREVIEW } from '../../../data/omni_creator_seed';

interface Props {
  contentItems: CreatorContentItem[];
  selectedItemForRepurpose?: CreatorContentItem;
}

export const OmniAiCreationAssistantView: React.FC<Props> = ({
  contentItems,
  selectedItemForRepurpose
}) => {
  const [selectedContentId, setSelectedContentId] = useState<string>(
    selectedItemForRepurpose?.id || contentItems[0]?.id || 'cnt-001'
  );
  const [activeOutputTab, setActiveOutputTab] = useState<
    'titles_captions' | 'video_script' | 'article_newsletter' | 'short_clips' | 'translations' | 'seo_hashtags'
  >('titles_captions');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [repurposeData, setRepurposeData] = useState<AiRepurposeOutput>(SEED_AI_REPURPOSE_PREVIEW);

  const activeContent = contentItems.find(c => c.id === selectedContentId) || contentItems[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTriggerAiRepurpose = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setRepurposeData(prev => ({
        ...prev,
        viralScore: Math.min(99, Math.floor(Math.random() * 10 + 90)),
        seoScore: Math.min(98, Math.floor(Math.random() * 8 + 92))
      }));
    }, 1200);
  };

  return (
    <div id="omni-ai-creation-assistant-view" className="space-y-6">
      {/* Top AI Suite Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              OMNI AI CREATION ENGINE (GEMINI 2.5)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              1 SOURCE ➔ 6 FORMATS
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Universal Content Multiplier & AI Copilot
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Input a single video or podcast, and OMNI AI autonomously synthesizes high-CTR titles, viral shorts scripts, full articles, newsletters, social copy, and 100+ language translations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerAiRepurpose}
            disabled={isGenerating}
            className="px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-lg shadow-purple-600/30 transition flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Repurpose Plan...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Repurpose Content with AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">Select Source Content:</span>
          <select
            value={selectedContentId}
            onChange={e => setSelectedContentId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-purple-500 max-w-md"
          >
            {contentItems.map(item => (
              <option key={item.id} value={item.id}>
                [{item.type.toUpperCase()}] {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* AI Scores */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400">Viral Hook Score:</span>
            <span className="text-xs font-bold text-amber-400 font-mono">{repurposeData.viralScore}/100</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">SEO Score:</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">{repurposeData.seoScore}/100</span>
          </div>
        </div>
      </div>

      {/* Repurposing Output Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'titles_captions' as const, label: 'Titles & Social Captions', icon: Share2 },
            { id: 'video_script' as const, label: 'Viral Video Scripts', icon: Video },
            { id: 'article_newsletter' as const, label: 'Article & Newsletter', icon: FileText },
            { id: 'short_clips' as const, label: 'Repurposed Short Clips', icon: Zap },
            { id: 'translations' as const, label: 'Multilingual Translation', icon: Globe },
            { id: 'seo_hashtags' as const, label: 'SEO & Hashtags', icon: Hash }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeOutputTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveOutputTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Titles & Social Captions */}
        {activeOutputTab === 'titles_captions' && (
          <div className="space-y-6">
            {/* Suggested High-CTR Titles */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Predicted High-CTR Titles
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {repurposeData.suggestedTitles.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between hover:border-purple-500/50 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 mb-1">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                          {t.tone}
                        </span>
                        <span className="text-emerald-400 font-bold">Predicted CTR: {t.predictedCtr}</span>
                      </div>
                      <p className="text-xs font-bold text-white leading-relaxed">{t.title}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(t.title, `title-${idx}`)}
                      className="mt-3 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      {copiedKey === `title-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Title</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Platform Captions */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-400" />
                Platform-Optimized Captions
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* X / Twitter Thread */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      X (Twitter) Thread Starter
                    </span>
                    <button
                      onClick={() => handleCopy(repurposeData.captions.xTwitter, 'cap-x')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === 'cap-x' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'cap-x' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line font-sans bg-slate-900 p-3 rounded-xl">
                    {repurposeData.captions.xTwitter}
                  </p>
                </div>

                {/* LinkedIn Post */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      LinkedIn Long-form Insight
                    </span>
                    <button
                      onClick={() => handleCopy(repurposeData.captions.linkedIn, 'cap-li')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === 'cap-li' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'cap-li' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line font-sans bg-slate-900 p-3 rounded-xl">
                    {repurposeData.captions.linkedIn}
                  </p>
                </div>

                {/* Instagram Reels / TikTok */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      Reels & Short Video Caption
                    </span>
                    <button
                      onClick={() => handleCopy(repurposeData.captions.instagramReels, 'cap-reels')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === 'cap-reels' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'cap-reels' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line font-sans bg-slate-900 p-3 rounded-xl">
                    {repurposeData.captions.instagramReels}
                  </p>
                </div>

                {/* OMNI Feed Native Post */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      OMNI Feed Broadcast
                    </span>
                    <button
                      onClick={() => handleCopy(repurposeData.captions.omniFeed, 'cap-omni')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === 'cap-omni' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'cap-omni' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line font-sans bg-slate-900 p-3 rounded-xl">
                    {repurposeData.captions.omniFeed}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Viral Video Script */}
        {activeOutputTab === 'video_script' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Hook (First 3 Seconds)
                </h4>
                <button
                  onClick={() => handleCopy(repurposeData.videoScript.hook, 'script-hook')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedKey === 'script-hook' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Hook</span>
                </button>
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs font-semibold text-purple-200">
                "{repurposeData.videoScript.hook}"
              </div>
            </div>

            {/* Scene-by-Scene Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Scene-by-Scene Timeline & Cues</h4>
              <div className="space-y-3">
                {repurposeData.videoScript.scenes.map((sc, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start"
                  >
                    <div className="text-xs font-mono text-indigo-400 font-bold">{sc.timestamp}</div>
                    <div className="text-xs text-slate-400">
                      <span className="font-bold text-slate-300 block mb-1">Visual Cue:</span>
                      {sc.visualCue}
                    </div>
                    <div className="md:col-span-2 text-xs text-white bg-slate-900 p-3 rounded-xl">
                      <span className="font-bold text-purple-300 block mb-1">Voiceover Script:</span>
                      "{sc.voiceover}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400">Closing Call To Action:</span>
                <p className="text-xs text-white font-semibold mt-0.5">{repurposeData.videoScript.callToAction}</p>
              </div>
              <button
                onClick={() => handleCopy(repurposeData.videoScript.callToAction, 'script-cta')}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-900 rounded-lg"
              >
                Copy CTA
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Article & Newsletter */}
        {activeOutputTab === 'article_newsletter' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Form Article */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400" />
                    Repurposed Long-Form Article
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {repurposeData.repurposedArticle.readingTime}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white">{repurposeData.repurposedArticle.headline}</h5>
                <div className="bg-slate-900 p-4 rounded-xl text-xs text-slate-300 font-mono whitespace-pre-line max-h-64 overflow-y-auto">
                  {repurposeData.repurposedArticle.markdownBody}
                </div>
              </div>

              <button
                onClick={() => handleCopy(repurposeData.repurposedArticle.markdownBody, 'article-md')}
                className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey === 'article-md' ? 'Article Copied!' : 'Copy Full Markdown Article'}</span>
              </button>
            </div>

            {/* Newsletter Blast */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    Subscriber Newsletter Issue
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Email Ready
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400">Subject Line:</span>
                  <p className="text-xs font-bold text-white">{repurposeData.repurposedNewsletter.subjectLine}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl text-xs text-slate-300 font-sans whitespace-pre-line max-h-64 overflow-y-auto">
                  {repurposeData.repurposedNewsletter.emailBody}
                </div>
              </div>

              <button
                onClick={() => handleCopy(repurposeData.repurposedNewsletter.emailBody, 'newsletter-body')}
                className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey === 'newsletter-body' ? 'Newsletter Copied!' : 'Copy Newsletter Issue'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Repurposed Short Clips */}
        {activeOutputTab === 'short_clips' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              AI Extracted High-Retention Short Clips
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {repurposeData.repurposedShortClips.map((clip, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-indigo-400 font-bold">{clip.timestampRange}</span>
                      <span className="text-slate-400">{clip.aspectRatio}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">{clip.title}</h5>
                    <div className="text-[11px] text-slate-400">
                      🎵 Music: <span className="text-slate-300">{clip.suggestedMusic}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(clip.title, `clip-${idx}`)}
                    className="w-full py-2 bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Export Clip Cue</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Multilingual Translations */}
        {activeOutputTab === 'translations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                Autonomous Multilingual Localization (Supports 100+ Languages)
              </h4>
              <span className="text-xs text-indigo-300 font-mono">Zero Translation Fee</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repurposeData.translations.map((tr, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      {tr.language}
                    </span>
                    <h5 className="text-xs font-bold text-white mt-1 leading-snug">{tr.translatedTitle}</h5>
                    <p className="text-xs text-slate-300 mt-1">{tr.translatedSummary}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(tr.translatedTitle + '\n' + tr.translatedSummary, `tr-${idx}`)}
                    className="mt-3 text-xs text-slate-400 hover:text-white flex items-center justify-end gap-1"
                  >
                    {copiedKey === `tr-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === `tr-${idx}` ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: SEO & Hashtags */}
        {activeOutputTab === 'seo_hashtags' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-400" />
                Recommended High-Reach Viral Hashtags
              </h4>
              <div className="flex flex-wrap gap-2">
                {repurposeData.recommendedHashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleCopy(repurposeData.recommendedHashtags.join(' '), 'tags-all')}
                className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey === 'tags-all' ? 'All Hashtags Copied!' : 'Copy All Hashtags'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
