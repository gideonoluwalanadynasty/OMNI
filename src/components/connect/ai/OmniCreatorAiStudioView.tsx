import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  FileText,
  Mail,
  DollarSign,
  Globe,
  Scissors,
  CheckCircle,
  TrendingUp,
  Share2,
  Copy,
  Plus,
  Play
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniCreatorRepurposingJob } from '../../../types/omni_social_ai';

export const OmniCreatorAiStudioView: React.FC = () => {
  const [jobs, setJobs] = useState<OmniCreatorRepurposingJob[]>(omniSocialAiEngine.getCreatorJobs());
  const [selectedJob, setSelectedJob] = useState<OmniCreatorRepurposingJob>(jobs[0]);
  const [activeOutputTab, setActiveOutputTab] = useState<'clips' | 'article' | 'newsletter' | 'ads' | 'translations'>('clips');

  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const created = omniSocialAiEngine.createRepurposingJob(newTitle, newSummary || 'Key takeaways on scaling audience and monetization.');
      const allJobs = omniSocialAiEngine.getCreatorJobs();
      setJobs([...allJobs]);
      setSelectedJob(created);
      setIsProcessing(false);
      setNewTitle('');
      setNewSummary('');
      setToastMsg('1-to-N Content Repurposing complete! 5 Multichannel Assets generated.');
      setTimeout(() => setToastMsg(null), 3500);
    }, 900);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(`Copied ${label} to clipboard!`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/20">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Creator AI & Repurposing Engine</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 rounded-full">
                  1-to-N Viral Studio
                </span>
              </div>
              <p className="text-sm text-slate-400">
                1 Video input → 5 Multichannel outputs: Viral 9:16 clips, Long Article, Newsletter, Ads & 3 Translations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Repurposed Assets Ready</div>
              <div className="text-lg font-bold text-fuchsia-400">12 Deliverables</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Est. Time Saved</div>
              <div className="text-lg font-bold text-white">18.5 Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1-to-N Generator Input Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-fuchsia-400" /> Repurpose New Source Content (Video / Audio / Article)
        </h3>
        <form onSubmit={handleCreateJob} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Source Video / Topic Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. How We Built a $100k Community on OMNI Spaces"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Summary / Transcript Excerpt (Optional)</label>
              <input
                type="text"
                value={newSummary}
                onChange={e => setNewSummary(e.target.value)}
                placeholder="Paste key notes, timestamps or topics covered..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2.5 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-fuchsia-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Generating 5 Multichannel Assets...' : 'Run 1-to-N AI Repurposer'}
            </button>
          </div>
        </form>
      </div>

      {/* Outputs Viewer Studio */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-fuchsia-400">Current Job</span>
            <h3 className="text-base font-bold text-white">{selectedJob.sourceTitle}</h3>
          </div>

          {/* Asset Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'clips', label: '3 Viral Clips (9:16)', icon: Scissors },
              { id: 'article', label: 'SEO Article', icon: FileText },
              { id: 'newsletter', label: 'Email Newsletter', icon: Mail },
              { id: 'ads', label: 'Social Ad Copies', icon: DollarSign },
              { id: 'translations', label: 'Multilingual (ES/FR/JA)', icon: Globe }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveOutputTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                    activeOutputTab === tab.id
                      ? 'bg-fuchsia-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Viral Short Clips (9:16) */}
        {activeOutputTab === 'clips' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedJob.outputs.shortClips.map((clip, idx) => (
              <div key={idx} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 bg-fuchsia-500/20 text-fuchsia-300 font-bold rounded">
                      {clip.aspectRatio} Vertical Reel
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {clip.viralScore}% Viral Potential
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">{clip.title}</h4>

                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 mb-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Generated Hook</div>
                    <p className="text-xs text-slate-300 italic">"{clip.hook}"</p>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-3">
                    Timestamp: <span className="text-white font-mono">{clip.timestampRange}</span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(clip.hook, 'Clip Hook')}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded flex items-center justify-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy Script Hook
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Long-Form SEO Article */}
        {activeOutputTab === 'article' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-base font-bold text-white">{selectedJob.outputs.longFormArticle.title}</h4>
                <span className="text-xs text-slate-400">{selectedJob.outputs.longFormArticle.readingTime}</span>
              </div>
              <button
                onClick={() => copyToClipboard(selectedJob.outputs.longFormArticle.markdownContent, 'Article Markdown')}
                className="px-3 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold rounded flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Markdown
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-xs text-slate-300 whitespace-pre-line">
              {selectedJob.outputs.longFormArticle.markdownContent}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase mr-2">SEO Keywords:</span>
              {selectedJob.outputs.longFormArticle.seoKeywords.map((kw, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-900 text-fuchsia-300 rounded border border-slate-800">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Newsletter Draft */}
        {activeOutputTab === 'newsletter' && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Subject Line</span>
                <h4 className="text-sm font-bold text-white">{selectedJob.outputs.newsletterDraft.subjectLine}</h4>
                <p className="text-xs text-slate-400 mt-1">Preview: {selectedJob.outputs.newsletterDraft.previewText}</p>
              </div>
              <button
                onClick={() => copyToClipboard(selectedJob.outputs.newsletterDraft.bodyContent, 'Newsletter Draft')}
                className="px-3 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold rounded flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Newsletter
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg text-xs text-slate-200 whitespace-pre-line border border-slate-800 font-sans">
              {selectedJob.outputs.newsletterDraft.bodyContent}
            </div>
          </div>
        )}

        {/* Tab 4: Social Ad Copies */}
        {activeOutputTab === 'ads' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedJob.outputs.socialAdCopies.map((ad, idx) => (
              <div key={idx} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-900 text-amber-300 rounded">
                    Placement: {ad.platform}
                  </span>
                  <p className="text-xs text-slate-200 my-3">{ad.copyText}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                  <span className="text-xs font-bold text-indigo-400">CTA: {ad.ctaText}</span>
                  <button
                    onClick={() => copyToClipboard(ad.copyText, 'Ad Copy')}
                    className="px-2.5 py-1 bg-slate-900 text-slate-300 text-xs rounded hover:bg-slate-800"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Multilingual Translations */}
        {activeOutputTab === 'translations' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedJob.outputs.multilingualTranslations.map((trans, idx) => (
              <div key={idx} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-fuchsia-400" /> {trans.language} ({trans.languageCode})
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Localized</span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Translated Title</div>
                  <p className="text-xs font-semibold text-white">{trans.translatedTitle}</p>
                </div>

                <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Translated Hook</div>
                  <p className="text-xs text-slate-300 italic">"{trans.translatedHook}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
